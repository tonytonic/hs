/**
 * SAFE-BOOT.JS — Couche de blindage production M6
 *
 * Objectifs :
 * 1. Patch localStorage (try/catch sur setItem pour QuotaExceeded)
 * 2. Patch JSON.parse global (sécurisé, fallback)
 * 3. ErrorBoundary global (page blanche → message utilisable + bouton recovery)
 * 4. Console silencieuse en prod (sauf errors critiques)
 * 5. Version stamp (cache busting + diagnostic)
 * 6. Détecteur quota localStorage avec alerte préventive
 *
 * Doit être chargé en TOUT PREMIER dans index.html.
 */
'use strict';

(function(global) {

// ══════════════════════════════════════════════════════════════════
//  VERSION & DIAGNOSTIC
// ══════════════════════════════════════════════════════════════════
const M6_VERSION = '1.0.0-prod';
const M6_BUILD   = '2026-05-09';
global.M6_VERSION = M6_VERSION;
global.M6_BUILD   = M6_BUILD;

// ══════════════════════════════════════════════════════════════════
//  1. SAFE LOCALSTORAGE — patch setItem pour gérer le quota
// ══════════════════════════════════════════════════════════════════
const _origSetItem = Storage.prototype.setItem;
const _origGetItem = Storage.prototype.getItem;

let _quotaWarned = false;

Storage.prototype.setItem = function(key, value) {
  try {
    return _origSetItem.call(this, key, value);
  } catch (e) {
    // QuotaExceededError, NS_ERROR_DOM_QUOTA_REACHED, etc.
    if (!_quotaWarned) {
      _quotaWarned = true;
      console.error('[M6 Safe] localStorage quota dépassé:', e.name);
      // Alerte utilisateur visible une seule fois
      try {
        const div = document.createElement('div');
        div.style.cssText = 'position:fixed;top:10px;left:10px;right:10px;z-index:99999;background:#9B2C2C;color:#fff;padding:14px 18px;border-radius:10px;font-family:system-ui;font-size:14px;box-shadow:0 4px 16px rgba(0,0,0,0.3)';
        div.innerHTML = '⚠️ <strong>Espace de stockage saturé</strong><br>Votre navigateur a atteint sa limite. Exportez vos données puis nettoyez via Paramètres → Stockage. <a href="#" id="m6-quota-close" style="color:#fff;text-decoration:underline;float:right">×</a>';
        document.body && document.body.appendChild(div);
        setTimeout(() => div.querySelector('#m6-quota-close')?.addEventListener('click', () => div.remove()), 100);
        setTimeout(() => div.remove(), 12000);
      } catch(_) {}
    }
    return null;
  }
};

// Helper safe-get (utilisable explicitement)
global.M6_SafeGet = function(key, fallback = null) {
  try {
    const raw = _origGetItem.call(localStorage, key);
    if (raw === null || raw === undefined) return fallback;
    return raw;
  } catch (_) { return fallback; }
};

global.M6_SafeJSON = function(key, fallback = {}) {
  try {
    const raw = _origGetItem.call(localStorage, key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (_) { return fallback; }
};

global.M6_SafeSet = function(key, value) {
  try {
    const v = typeof value === 'string' ? value : JSON.stringify(value);
    _origSetItem.call(localStorage, key, v);
    return true;
  } catch (_) { return false; }
};

// ══════════════════════════════════════════════════════════════════
//  2. ERROR BOUNDARY GLOBAL — capter window.onerror
// ══════════════════════════════════════════════════════════════════
const _errorHistory = [];
const M6_ERROR_LOG_KEY = 'M6_ERROR_LOG';

window.addEventListener('error', function(e) {
  const err = {
    msg:  e.message || 'Erreur inconnue',
    src:  (e.filename || '').split('/').pop() || '?',
    line: e.lineno || 0,
    col:  e.colno || 0,
    ts:   new Date().toISOString(),
    stack: e.error?.stack?.split('\n').slice(0, 4).join('\n') || ''
  };
  _errorHistory.push(err);
  if (_errorHistory.length > 20) _errorHistory.shift();
  // Persister les 10 derniers pour diagnostic
  global.M6_SafeSet(M6_ERROR_LOG_KEY, _errorHistory.slice(-10));

  // Si l'erreur survient AVANT le rendu (page blanche garantie), afficher un fallback UI
  if (!document.querySelector('.m6-bottom-nav, .m6-header')) {
    setTimeout(() => {
      if (document.body && !document.querySelector('.m6-bottom-nav, .m6-header, #m6-fatal-error')) {
        _showFatalError(err);
      }
    }, 2000);
  }
});

window.addEventListener('unhandledrejection', function(e) {
  const err = {
    msg:  'Promise rejetée: ' + (e.reason?.message || String(e.reason)),
    src:  '(promise)',
    line: 0,
    ts:   new Date().toISOString()
  };
  _errorHistory.push(err);
  if (_errorHistory.length > 20) _errorHistory.shift();
});

function _showFatalError(err) {
  try {
    const div = document.createElement('div');
    div.id = 'm6-fatal-error';
    div.style.cssText = 'position:fixed;inset:0;background:#1A1714;color:#F7F3ED;z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px;font-family:system-ui;text-align:center';
    div.innerHTML = `
      <div style="max-width:420px">
        <div style="font-size:48px;margin-bottom:16px">⚠️</div>
        <div style="font-family:Georgia,serif;font-size:1.3rem;margin-bottom:12px;color:#C4A35A">Erreur au démarrage</div>
        <div style="font-size:0.85rem;line-height:1.5;color:#D4CDC2;margin-bottom:18px">L'application a rencontré une erreur. Vos données sont préservées.</div>
        <details style="background:#2A2520;border-radius:8px;padding:12px;text-align:left;margin-bottom:18px;font-size:0.75rem">
          <summary style="cursor:pointer;color:#C4A35A">Détails techniques</summary>
          <div style="margin-top:8px;font-family:monospace;color:#D4CDC2;word-break:break-word">${(err.msg||'').replace(/[<>&]/g, c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]))}<br>${err.src}:${err.line}</div>
        </details>
        <div style="display:flex;gap:8px">
          <button id="m6-fatal-reload" style="flex:1;background:#C4A35A;color:#1A1714;border:none;padding:12px;border-radius:8px;font-weight:600;cursor:pointer">Recharger</button>
          <button id="m6-fatal-export" style="flex:1;background:transparent;color:#F7F3ED;border:1px solid #4A4540;padding:12px;border-radius:8px;cursor:pointer">Exporter données</button>
        </div>
        <div style="font-size:0.7rem;color:#8A847C;margin-top:14px">Module 6 v${M6_VERSION} · ${M6_BUILD}</div>
      </div>
    `;
    document.body.appendChild(div);
    div.querySelector('#m6-fatal-reload').onclick = () => location.reload();
    div.querySelector('#m6-fatal-export').onclick = () => {
      try {
        const dump = {};
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith('M6_')) dump[k] = localStorage.getItem(k);
        }
        const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `m6-backup-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } catch(_) { alert('Impossible d\'exporter — copiez manuellement les clés localStorage commençant par M6_'); }
    };
  } catch(_) {}
}

// ══════════════════════════════════════════════════════════════════
//  3. GUARDS GLOBAUX — proxy "safe call"
// ══════════════════════════════════════════════════════════════════
global.M6_safeCall = function(obj, method, ...args) {
  try {
    if (obj && typeof obj[method] === 'function') return obj[method](...args);
  } catch (e) {
    console.warn(`[M6 safeCall] ${method} a échoué:`, e.message);
  }
  return null;
};

// ══════════════════════════════════════════════════════════════════
//  4. CONSOLE GUARD — silencieux en prod sauf erreurs réelles
// ══════════════════════════════════════════════════════════════════
const _IS_DEV = location.hostname === 'localhost' ||
                location.hostname === '127.0.0.1' ||
                /\?debug/.test(location.search);

if (!_IS_DEV) {
  // Conserver console.error et console.warn pour Sentry/diag
  // Mais désactiver console.log/info/debug bruyants
  const _noop = function(){};
  if (console.log)   console.log   = _noop;
  if (console.info)  console.info  = _noop;
  if (console.debug) console.debug = _noop;
  // console.warn et console.error préservés
}

global.M6_DEBUG = _IS_DEV;

// ══════════════════════════════════════════════════════════════════
//  5. JSPDF FALLBACK — si CDN down
// ══════════════════════════════════════════════════════════════════
window.addEventListener('load', function() {
  setTimeout(() => {
    if (!window.jspdf?.jsPDF) {
      console.warn('[M6 Safe] jsPDF non disponible — exports PDF désactivés');
      // Marquer pour les vues
      window.M6_PDF_DISABLED = true;
    }
  }, 3000);
});

// ══════════════════════════════════════════════════════════════════
//  6. DIAGNOSTIC EXPORT (consultable via console)
// ══════════════════════════════════════════════════════════════════
global.M6_diag = function() {
  const usage = (() => {
    let total = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('M6_')) total += (localStorage.getItem(k)||'').length + k.length;
      }
    } catch(_) {}
    return total;
  })();
  return {
    version: M6_VERSION,
    build:   M6_BUILD,
    debug:   _IS_DEV,
    quota:   { used: Math.round(usage/1024) + ' KB', warned: _quotaWarned },
    errors:  _errorHistory.slice(-5),
    online:  navigator.onLine,
    pdf:     !window.M6_PDF_DISABLED,
    ua:      navigator.userAgent.slice(0, 80)
  };
};

// ══════════════════════════════════════════════════════════════════
//  FORCAGE MODE CLAIR — M6 ne supporte pas le dark mode
// ══════════════════════════════════════════════════════════════════
// Garantit que la classe `dark-mode` n'est jamais appliquée à <html>,
// même si une préférence ancienne est encore stockée ou si un module
// tente de l'ajouter. Nettoyage défensif au boot + observer DOM.
(function _forceLightMode() {
  try {
    // Purger d'anciennes préférences éventuelles stockées
    try { localStorage.removeItem('M6_DARK_MODE'); } catch(_) {}
    try { localStorage.removeItem('M6_THEME'); } catch(_) {}
    const _purge = () => {
      try {
        if (document.documentElement.classList.contains('dark-mode')) {
          document.documentElement.classList.remove('dark-mode');
        }
        if (document.body && document.body.classList.contains('dark-mode')) {
          document.body.classList.remove('dark-mode');
        }
      } catch(_) {}
    };
    _purge();
    // Au DOMContentLoaded également
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', _purge);
    }
    // Observer pour annuler immédiatement si quelqu'un re-ajoute la classe
    if (typeof MutationObserver !== 'undefined' && document.documentElement) {
      const obs = new MutationObserver(_purge);
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }
  } catch(_) { /* silencieux — best effort */ }
})();

})(window);
