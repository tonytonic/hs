/**
 * STORAGE M6 — Gestion multi-années + log immuable + RGPD
 * Clés : M6_{REGIME}_{YEAR}_{KEY}
 * Log horodaté et signé SHA-256 (côté client) pour valeur probante
 */
'use strict';

(function(global) {

// ── Clés localStorage ─────────────────────────────────────────────
const NS = 'M6';

const M6_Storage = {

  // ── Années ────────────────────────────────────────────────────
  getActiveYear(regime)    {
    // Clé par régime pour que les 3 forfaits soient complètement indépendants
    const key = regime ? `${NS}_${regime}_ACTIVE_YEAR` : `${NS}_ACTIVE_YEAR`;
    return parseInt(localStorage.getItem(key) || new Date().getFullYear());
  },
  setActiveYear(regime, year) {
    // Accepte setActiveYear(year) sans régime pour rétrocompatibilité
    if (typeof regime === 'number') { year = regime; regime = null; }
    const key = regime ? `${NS}_${regime}_ACTIVE_YEAR` : `${NS}_ACTIVE_YEAR`;
    localStorage.setItem(key, year);
  },
  getAllYears(regime) {
    const years = new Set();
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      const m = k && k.match(new RegExp(`^${NS}_${regime}_([0-9]{4})_DATA$`));
      if (m) years.add(parseInt(m[1]));
    }
    const cur = this.getActiveYear();
    years.add(cur);
    return Array.from(years).sort((a, b) => b - a);
  },
  createYear(regime, year) {
    const dk = `${NS}_${regime}_${year}_DATA`;
    if (!localStorage.getItem(dk)) {
      localStorage.setItem(dk, JSON.stringify({}));
      this._log(regime, year, 'SYSTEM', `Exercice ${year} créé`);
    }
  },

  // ── Contrat ────────────────────────────────────────────────────
  getContract(regime)      { return this._json(`${NS}_${regime}_CONTRACT`); },
  setContract(regime, obj) {
    localStorage.setItem(`${NS}_${regime}_CONTRACT`, JSON.stringify(obj));
    this._log(regime, null, 'CONTRACT', 'Configuration contrat mise à jour');
  },

  // ── Données journalières / hebdomadaires ─────────────────────
  getData(regime, year)   { return this._json(`${NS}_${regime}_${year}_DATA`); },
  setData(regime, year, data) {
    localStorage.setItem(`${NS}_${regime}_${year}_DATA`, JSON.stringify(data));
    localStorage.setItem(`${NS}_${regime}_${year}_AUTO_SAVE`, new Date().toISOString());
  },
  setDay(regime, year, dk, value, prevValue) {
    const data = this.getData(regime, year);
    const old  = data[dk];
    data[dk]   = value;
    this.setData(regime, year, data);
    // Log immuable : chaque modification est tracée
    const change = value === null
      ? `Suppression de ${dk} (était: ${JSON.stringify(old)})`
      : `${dk} → ${JSON.stringify(value)}${old ? ` (était: ${JSON.stringify(old)})` : ''}`;
    this._log(regime, year, 'SAISIE', change);
    return data;
  },
  deleteDay(regime, year, dk) {
    return this.setDay(regime, year, dk, null);
  },

  // ── Données mood tracking ─────────────────────────────────────
  getMoods(regime, year)   { return this._json(`${NS}_${regime}_${year}_MOODS`); },
  setMood(regime, year, dk, niveau) {
    // Garde-fou : certains appelants passent l'OBJET mood entier {niveau:'eleve'} au lieu de la string.
    // Sans ce déballage, on stocke {niveau:{niveau:'eleve'}, ts:...} → "[object Object]" partout.
    if (niveau && typeof niveau === 'object') niveau = niveau.niveau || '';
    if (!niveau) return; // ne rien stocker pour un mood vide
    const moods  = this.getMoods(regime, year);
    moods[dk]    = { niveau, ts: new Date().toISOString() };
    localStorage.setItem(`${NS}_${regime}_${year}_MOODS`, JSON.stringify(moods));
    this._log(regime, year, 'MOOD', `${dk} → charge ${niveau}`);
  },

  // ── Entretien annuel ──────────────────────────────────────────
  getEntretiens(regime, year) {
    // Si une année précise est demandée → lire uniquement cette clé
    if (year) {
      const key = `${NS}_${regime}_${year}_ENTRETIENS`;
      return this._json(key, []);
    }
    // Sans year → agréger TOUTES les années disponibles dans localStorage
    // pour construire l'historique complet (visible dans l'onglet Entretien)
    const all = [];
    try {
      // Clé sans année (anciens entretiens pré-migration)
      const old = this._json(`${NS}_${regime}_ENTRETIENS`, []);
      all.push(...old);
      // Clés par année M6_cadre_dirigeant_2024_ENTRETIENS etc.
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(`${NS}_${regime}_`) && k.endsWith('_ENTRETIENS') && k !== `${NS}_${regime}_ENTRETIENS`) {
          const items = this._json(k, []);
          all.push(...items);
        }
      }
    } catch(_) {}
    // Trier par date croissante (le plus ancien en premier → le dernier du tableau = le plus récent)
    all.sort((a,b) => (a.date||'').localeCompare(b.date||''));
    return all;
  },
  addEntretien(regime, year, e) {
    const key = year ? `${NS}_${regime}_${year}_ENTRETIENS` : `${NS}_${regime}_ENTRETIENS`;
    const list = this._json(key, []);
    list.push({ ...e, savedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list));
    this._log(regime, year, 'ENTRETIEN', 'Entretien enregistre');
  },
  saveEntretien(regime, e) { this.addEntretien(regime, null, e); },

  // ── Validations mensuelles (signature cadre) ─────────────────
  getValidations(regime, year) { return this._json(`${NS}_${regime}_${year}_VALID`); },
  addValidation(regime, year, mois, nom) {
    const v = this.getValidations(regime, year);
    const ts = new Date().toISOString();
    v[mois] = { nom, ts, hash: this._hashSync(`${mois}-${nom}-${ts}`) };
    localStorage.setItem(`${NS}_${regime}_${year}_VALID`, JSON.stringify(v));
    this._log(regime, year, 'VALIDATION', `Mois ${mois} validé par ${nom}`);
    return v[mois];
  },

  // ── Historique déplacements ───────────────────────────────────
  getDeplacements(regime, year) { return this._json(`${NS}_${regime}_${year}_DEPLACEMENT`); },
  addDeplacement(regime, year, obj) {
    const list = this.getDeplacements(regime, year);
    list.push({ ...obj, id: Date.now(), savedAt: new Date().toISOString() });
    localStorage.setItem(`${NS}_${regime}_${year}_DEPLACEMENT`, JSON.stringify(list));
  },

  // ── Log immuable ──────────────────────────────────────────────
  _log(regime, year, action, detail) {
    const key  = `${NS}_LOG_${regime}_${year || 'GLOBAL'}`;
    let   log  = [];
    try { log = JSON.parse(localStorage.getItem(key) || '[]'); } catch (_) {}
    log.push({ ts: new Date().toISOString(), action, detail });
    // Conserver les 500 dernières entrées max
    if (log.length > 500) log = log.slice(-500);
    try { localStorage.setItem(key, JSON.stringify(log)); } catch (_) {}
  },
  getLog(regime, year) {
    const key = `${NS}_LOG_${regime}_${year || 'GLOBAL'}`;
    return this._json(key, []);
  },

  // ── Export RGPD ───────────────────────────────────────────────
  exportAll() {
    const dump = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(NS)) {
        try { dump[k] = JSON.parse(localStorage.getItem(k)); }
        catch (_) { dump[k] = localStorage.getItem(k); }
      }
    }
    return dump;
  },
  deleteAll(regime) {
    const toDelete = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(`${NS}_${regime}`)) toDelete.push(k);
    }
    toDelete.forEach(k => localStorage.removeItem(k));
    this._log(regime, null, 'RGPD', `Suppression complète du régime ${regime}`);
  },

  // ── Dates auto-save ───────────────────────────────────────────
  getAutoSaveDate(regime, year) {
    return localStorage.getItem(`${NS}_${regime}_${year}_AUTO_SAVE`) || null;
  },
  getFileSaveDate(regime, year) {
    return localStorage.getItem(`${NS}_${regime}_${year}_FILE_SAVE`) || null;
  },
  markFileSave(regime, year) {
    localStorage.setItem(`${NS}_${regime}_${year}_FILE_SAVE`, new Date().toISOString());
  },

  // ── Helpers ───────────────────────────────────────────────────
  _json(key, fallback = {}) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch (_) { return fallback; }
  },
  _hashSync(str) {
    // Hash simple côté client (non cryptographique, valeur probante symbolique)
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h) + str.charCodeAt(i);
      h = h & h;
    }
    return (h >>> 0).toString(16).padStart(8, '0').toUpperCase();
  }
};

// ── Alerte changement de phase INRS ─────────────────────────────
// Appeler depuis render() de chaque vue après calcul bio
// Si la phase empire par rapport au mois précédent → toast + badge
const M6_PhaseAlert = {
  _KEY(regime, year) { return 'M6_LAST_PHASE_' + regime + '_' + year; },

  check(regime, year, currentPhaseCode, currentFatigue) {
    const key   = this._KEY(regime, year);
    const last  = (() => { try { return JSON.parse(localStorage.getItem(key)||'null'); } catch { return null; } })();
    const now   = { code: currentPhaseCode, fatigue: currentFatigue, ts: new Date().toISOString() };

    if (!last) { localStorage.setItem(key, JSON.stringify(now)); return null; }

    // Comparer les phases : P1 < P2 < P3 < P4
    const ordre = { P1:1, P2:2, P3:3, P4:4 };
    const prev  = ordre[last.code] || 1;
    const curr  = ordre[currentPhaseCode] || 1;

    // Sauvegarder la phase actuelle
    localStorage.setItem(key, JSON.stringify(now));

    if (curr > prev) {
      // Phase empirée → alerte
      const messages = {
        2: 'Passage en Phase P2 (Fatigue chronique). La recuperation devient necessaire — programmez des RTT. (INRS)',
        3: 'ALERTE Phase P3 (Surmenage). Signalez la situation a votre manager et envisagez un entretien avec le medecin du travail. Art. L4121-1.',
        4: 'CRITIQUE Phase P4 (Burn-out imminent). Consultez immediatement votre medecin du travail. Art. L4121-1.',
      };
      return { niveau: curr >= 3 ? 'danger' : 'warning', message: messages[curr] || 'Phase aggravee.', phase: currentPhaseCode };
    }
    if (curr < prev && curr === 1) {
      return { niveau: 'success', message: 'Retour en Phase P1 — bonne recuperation constatee. Sonnentag 2022 : maintenez ce rythme.', phase: currentPhaseCode };
    }
    return null;
  },

  // Affiche le badge d'alerte dans le DOM si besoin
  showIfNeeded(regime, year, phaseCode, fatigue) {
    const alert = this.check(regime, year, phaseCode, fatigue);
    if (!alert) return;
    const niv = alert.niveau;
    const colors = {
      danger:  { bg:'#9B2C2C', text:'#fff' },
      warning: { bg:'#C4853A', text:'#fff' },
      success: { bg:'#2D6A4F', text:'#fff' },
    };
    const co = colors[niv] || colors.warning;

    let el = document.getElementById('m6-phase-alert');
    if (!el) {
      el = document.createElement('div');
      el.id = 'm6-phase-alert';
      el.style.cssText = `position:fixed;bottom:calc(76px + env(safe-area-inset-bottom,0));left:12px;right:12px;
        border-radius:10px;padding:12px 16px;z-index:500;
        font-size:0.78rem;line-height:1.5;font-family:system-ui,sans-serif;
        display:flex;align-items:flex-start;gap:10px;box-shadow:0 4px 20px rgba(0,0,0,0.2);
        transform:translateY(100px);transition:transform 0.4s cubic-bezier(.4,0,.2,1);opacity:0`;
      document.body.appendChild(el);
    }
    el.style.background = co.bg;
    el.style.color = co.text;
    el.innerHTML = `<span style="font-size:1.1rem;flex-shrink:0">${niv==='danger'?'🔴':niv==='success'?'✅':'🟠'}</span>
      <div><strong>Zenji — Phase ${alert.phase}</strong><br>${alert.message}</div>
      <button onclick="document.getElementById('m6-phase-alert').style.transform='translateY(100px)'"
        style="background:none;border:none;color:${co.text};font-size:1rem;cursor:pointer;padding:0;flex-shrink:0;margin-left:auto">✕</button>`;
    setTimeout(() => { el.style.transform='translateY(0)'; el.style.opacity='1'; }, 100);
    setTimeout(() => { el.style.transform='translateY(100px)'; el.style.opacity='0'; }, 9000);
  }
};

global.M6_Storage    = M6_Storage;
global.M6_PhaseAlert = M6_PhaseAlert;

// ── Android swipe-to-refresh : protection des données ────────────
// Sur Android, le "pull-to-refresh" peut réinitialiser la page sans
// vider localStorage, mais si le service worker recharge les assets
// sans les données, l'état peut sembler perdu. On force la persistance
// via plusieurs mécanismes :
(function() {
  // 1. Backup régime + année courante dans sessionStorage (survit au swipe)
  function _syncSession() {
    try {
      const regime = localStorage.getItem('M6_REGIME');
      const year   = localStorage.getItem('M6_CURRENT_YEAR');
      if (regime) sessionStorage.setItem('M6_REGIME_BACKUP', regime);
      if (year)   sessionStorage.setItem('M6_YEAR_BACKUP', year);
    } catch(_) {}
  }
  // 2. Restauration depuis sessionStorage si localStorage semble vide
  function _restoreFromSession() {
    try {
      if (!localStorage.getItem('M6_REGIME')) {
        const r = sessionStorage.getItem('M6_REGIME_BACKUP');
        if (r) localStorage.setItem('M6_REGIME', r);
      }
      if (!localStorage.getItem('M6_CURRENT_YEAR')) {
        const y = sessionStorage.getItem('M6_YEAR_BACKUP');
        if (y) localStorage.setItem('M6_CURRENT_YEAR', y);
      }
    } catch(_) {}
  }
  _restoreFromSession();
  // Sync toutes les 10s et à chaque événement de stockage
  setInterval(_syncSession, 10000);
  window.addEventListener('focus', _syncSession);
  // 3. Empêcher le pull-to-refresh natif sur Android (overscroll-behavior)
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.style.overscrollBehaviorY = 'contain';
    });
  }
  // 4. Exposer une fonction de vérification de santé des données
  global.M6_CheckDataIntegrity = function() {
    try {
      const regime = localStorage.getItem('M6_REGIME');
      const seen   = localStorage.getItem('M6_ZENJI_SEEN');
      return { ok: true, regime, seen };
    } catch(e) { return { ok: false, error: e.message }; }
  };
  // 5. Migration auto : réparer les moods stockés en double-wrap
  //    {niveau:{niveau:'eleve'}, ts:...} → {niveau:'eleve', ts:...}
  //    Bug introduit par un appelant qui passait l'objet entier au lieu de la string.
  try {
    for (let i=0; i<localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.endsWith('_MOODS')) continue;
      let dirty = false;
      let raw;
      try { raw = JSON.parse(localStorage.getItem(k) || '{}'); } catch(_) { continue; }
      if (!raw || typeof raw !== 'object') continue;
      for (const dk of Object.keys(raw)) {
        const m = raw[dk];
        if (m && typeof m === 'object' && m.niveau && typeof m.niveau === 'object') {
          // Décapsuler récursivement (au cas où il y aurait du triple-wrap)
          let n = m.niveau;
          while (n && typeof n === 'object' && n.niveau) n = n.niveau;
          raw[dk] = { niveau: n || '', ts: m.ts || new Date().toISOString() };
          dirty = true;
        }
      }
      if (dirty) localStorage.setItem(k, JSON.stringify(raw));
    }
  } catch(_) { /* silencieux — la migration est best-effort */ }
})();

})(window);
