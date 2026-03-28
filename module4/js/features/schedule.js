/**
 * schedule.js — Gestion des horaires et régimes de travail
 *
 * Stockage :
 *   DTE_SETTINGS                    → profil global
 *   DTE_SCHEDULE_OVERRIDES_{year}   → overrides par jour
 *
 * Références légales :
 *   Art. L3131-1  — 11h repos obligatoire entre deux journées
 *   Art. L3122-2  — travailleur de nuit : ≥3h entre 21h-6h, ≥2×/sem
 *   Art. L3121-34 — durée max journalière : 10h (dérogatoire 12h)
 *
 * Références scientifiques :
 *   IARC 2019 Groupe 2A — travail de nuit cancérogène probable
 *   Kivimäki 2015 (Lancet) — nuit : RR ×1.4-1.7 cardio
 *   INRS — sommeil diurne = 70% efficacité du nocturne
 *   Thompson 2022 — dette de sommeil → cortisol +14%/nuit
 */
(function(global) {
'use strict';

const STORAGE_KEY  = 'DTE_SETTINGS';
const OVERRIDE_KEY = (year) => 'DTE_SCHEDULE_OVERRIDES_' + year;

const DEFAULTS = {
  startH:     9,
  endH:       17,
  commuteH:   0,
  regimeType: 'standard',
  posteType:  'standard',
};

// Types de poste et leurs multiplicateurs scientifiques
// Sources : INRS 2022 (risques professionnels), Kivimäki 2015 (cardio), ANACT (charge psychique)
const POSTE_TYPES = {
  standard:        { label: 'Bureau / Standard',      icon: '💼', fatF:1.00, strF:1.00, cvF:1.00, cogF:1.00, desc:'Référence OMS' },
  poste_3x8:       { label: 'Posté 3×8',              icon: '🔄', fatF:1.30, strF:1.20, cvF:1.35, cogF:1.15, desc:'INRS 2022 : +30% fatigue, RR cardio ×1.35' },
  poste_2x8:       { label: 'Posté 2×8 / 2×12',      icon: '↔️', fatF:1.15, strF:1.10, cvF:1.15, cogF:1.10, desc:'INRS 2022 : perturbation circadienne modérée' },
  travail_physique: { label: 'Travail physique',       icon: '🏗️', fatF:1.25, strF:1.05, cvF:1.10, cogF:1.00, desc:'INRS : charge physique élevée → fatigue accrue' },
  astreinte:       { label: 'Astreinte / On-call',    icon: '📟', fatF:1.10, strF:1.30, cvF:1.10, cogF:1.20, desc:'ANACT : charge psychique + fragmentation du sommeil' },
  cadre_dirigeant: { label: 'Cadre dirigeant',        icon: '👔', fatF:1.05, strF:1.20, cvF:1.10, cogF:1.30, desc:'ANACT : charge décisionnelle + responsabilité' },
};

const REGIME_LABELS = {
  standard:       { label: 'Horaires standards',    desc: '8h-20h — baseline OMS',            icon: '☀️' },
  decale:         { label: 'Horaires décalés',       desc: 'Fin >21h ou début <6h',             icon: '🌆' },
  nuit_partielle: { label: 'Nuit partielle',          desc: '1-2h entre 21h-6h',                icon: '🌙' },
  nuit_complete:  { label: 'Nuit complète',           desc: '≥3h entre 21h-6h (Art. L3122-2)',  icon: '🌑' },
};

/* ── LECTURE / ÉCRITURE ─────────────────────────────────────────── */

function loadSettings() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? Object.assign({}, DEFAULTS, JSON.parse(s)) : { ...DEFAULTS };
  } catch(_) { return { ...DEFAULTS }; }
}

function saveSettings(settings) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch(_) {}
}

function loadOverrides(year) {
  try {
    return JSON.parse(localStorage.getItem(OVERRIDE_KEY(year)) || '{}');
  } catch(_) { return {}; }
}

function saveOverride(dateKey, data) {
  const year = dateKey.slice(0, 4);
  const ov   = loadOverrides(year);
  if (data === null) {
    delete ov[dateKey];
  } else {
    ov[dateKey] = data;
  }
  try { localStorage.setItem(OVERRIDE_KEY(year), JSON.stringify(ov)); } catch(_) {}
}

/* ── HORAIRES PAR JOUR DE SEMAINE ─────────────────────────────── */

const WEEK_SCHEDULE_KEY = 'DTE_WEEK_SCHEDULE';
const WEEK_SCHEDULE_ENABLED_KEY = 'DTE_WEEK_SCHEDULE_ENABLED';

function loadWeekSchedule() {
  try {
    return JSON.parse(localStorage.getItem(WEEK_SCHEDULE_KEY) || '{}');
  } catch(_) { return {}; }
}

function saveWeekSchedule(schedule) {
  try { localStorage.setItem(WEEK_SCHEDULE_KEY, JSON.stringify(schedule)); } catch(_) {}
}

function isWeekScheduleEnabled() {
  return localStorage.getItem(WEEK_SCHEDULE_ENABLED_KEY) === 'true';
}

function setWeekScheduleEnabled(enabled) {
  try { localStorage.setItem(WEEK_SCHEDULE_ENABLED_KEY, enabled); } catch(_) {}
}

function getDayOfWeek(dateKey) {
  // dateKey format: "2026-03-22"
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.getDay(); // 0=dimanche, 1=lundi, ... 6=samedi
}

/* ── CALCULS LÉGAUX ─────────────────────────────────────────────── */

/**
 * Vérifie la règle des 11h (Art. L3131-1)
 * endH = heure fin journée J, startH = heure début journée J+1
 * Retourne { ok, reposH, violation }
 */
function checkRepos11h(endHPrev, startHNext) {
  const endHNorm = endHPrev > startHNext ? endHPrev - 24 : endHPrev; // passage minuit
  const reposH   = startHNext - endHNorm;
  return {
    ok:        reposH >= 11,
    reposH:    Math.round(reposH * 10) / 10,
    violation: reposH < 11,
    deficit:   Math.max(0, 11 - reposH),
  };
}

/**
 * Classifie le régime automatiquement depuis startH/endH
 */
function autoClassify(startH, endH) {
  const passeMinuit = endH < startH;
  let nightH = 0;
  if (passeMinuit) {
    nightH = (24 - Math.max(21, startH)) + Math.min(6, endH);
  } else {
    if (startH < 6)  nightH += Math.min(endH, 6) - startH;
    if (endH   > 21) nightH += endH - Math.max(startH, 21);
  }
  nightH = Math.max(0, nightH);
  if (nightH >= 3)  return 'nuit_complete';
  if (nightH > 0)   return 'nuit_partielle';
  if (endH > 21 || startH < 6) return 'decale';
  return 'standard';
}

/* ── RENDU UI ───────────────────────────────────────────────────── */

function renderSchedulePanel(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const settings = loadSettings();
  const today    = new Date();
  const todayKey = today.getFullYear() + '-'
    + String(today.getMonth()+1).padStart(2,'0') + '-'
    + String(today.getDate()).padStart(2,'0');
  const overrides = loadOverrides(today.getFullYear());
  const todayOv   = overrides[todayKey] || null;

  const autoR = autoClassify(settings.startH, settings.endH);
  const regime = REGIME_LABELS[autoR] || REGIME_LABELS.standard;
  
  // Charger l'état du toggle
  const scheduleEnabled = localStorage.getItem('M4_SCHEDULE_ENABLED') !== 'false'; // true par défaut

  // Contrôle de violation 11h si override du jour
  let reposAlert = '';
  if (todayOv && overrides[_prevDayKey(todayKey)]) {
    const prev = overrides[_prevDayKey(todayKey)];
    const r11  = checkRepos11h(prev.endH || settings.endH, todayOv.startH || settings.startH);
    if (r11.violation) {
      reposAlert = `<div style="background:rgba(200,40,56,.12);border:1px solid #c82838;
        padding:6px 10px;font-size:10px;color:#c82838;margin-bottom:8px;font-family:var(--font-mono);">
        ⚠ VIOLATION L3131-1 — Repos entre journées : ${r11.reposH}h / 11h obligatoires
        (déficit : ${r11.deficit.toFixed(1)}h)
      </div>`;
    }
  }

  el.innerHTML = `
    <div style="padding:var(--gap);">
      
      <!-- TOGGLE ACTIVATION HORAIRES -->
      <div style="background:rgba(0,200,255,0.05);border:1px solid rgba(0,200,255,0.15);
                  border-radius:8px;padding:12px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <div style="flex:1;">
            <div style="font-family:var(--font-mono);font-size:11px;color:#00c8ff;
                        font-weight:700;margin-bottom:4px;letter-spacing:.1em;">
              ⏰ SUIVI DES HORAIRES DE TRAVAIL
            </div>
            <div style="font-size:10px;color:var(--text-dim);line-height:1.5;">
              ${scheduleEnabled 
                ? 'Analyse activée : vos horaires impactent les scores biométriques (fatigue, stress).'
                : 'Analyse désactivée : seules les heures supplémentaires sont prises en compte.'}
            </div>
          </div>
          <button onclick="window._schToggleSchedule()" id="toggle-schedule-btn"
                  style="min-width:80px;padding:8px 12px;
                         background:${scheduleEnabled ? 'linear-gradient(135deg,#00c8ff,#0095cc)' : 'rgba(255,255,255,0.05)'};
                         border:1px solid ${scheduleEnabled ? 'rgba(0,200,255,0.6)' : 'rgba(255,255,255,0.1)'};
                         color:${scheduleEnabled ? '#fff' : '#888'};
                         font-family:var(--font-mono);font-size:11px;font-weight:700;
                         cursor:pointer;border-radius:4px;letter-spacing:.1em;
                         transition:all 0.3s;">
            ${scheduleEnabled ? '✓ ACTIVÉ' : '✕ DÉSACTIVÉ'}
          </button>
        </div>
      </div>
      
      ${!scheduleEnabled ? `
        <div style="text-align:center;padding:40px 20px;color:var(--text-dim);font-size:12px;">
          <div style="font-size:48px;margin-bottom:16px;opacity:0.3;">⏰</div>
          <div style="margin-bottom:8px;font-weight:700;">Suivi des horaires désactivé</div>
          <div style="line-height:1.6;">
            Cliquez sur "✕ DÉSACTIVÉ" ci-dessus pour activer le suivi de vos horaires de travail
            et obtenir une analyse biométrique complète (impact du régime de travail sur votre santé).
          </div>
        </div>
      ` : `
      
      ${reposAlert}

      <!-- PROFIL GLOBAL -->
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--animus);
        letter-spacing:.12em;margin-bottom:10px;">PROFIL HORAIRE GLOBAL</div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
        <div>
          <div style="font-size:9px;color:var(--text-dim);font-family:var(--font-mono);
            margin-bottom:4px;">HEURE DÉBUT</div>
          <input type="time" id="sch-start" value="${_toTimeStr(settings.startH)}"
            style="width:100%;background:rgba(0,10,25,.9);color:var(--text);
            border:1px solid rgba(0,200,255,0.2);padding:5px 8px;
            font-family:var(--font-mono);font-size:12px;box-sizing:border-box;">
        </div>
        <div>
          <div style="font-size:9px;color:var(--text-dim);font-family:var(--font-mono);
            margin-bottom:4px;">HEURE FIN</div>
          <input type="time" id="sch-end" value="${_toTimeStr(settings.endH)}"
            style="width:100%;background:rgba(0,10,25,.9);color:var(--text);
            border:1px solid rgba(0,200,255,0.2);padding:5px 8px;
            font-family:var(--font-mono);font-size:12px;box-sizing:border-box;">
        </div>
      </div>

      <div style="margin-bottom:12px;">
        <div style="font-size:9px;color:var(--text-dim);font-family:var(--font-mono);
          margin-bottom:4px;">TRAJET ALLER (minutes)</div>
        <div style="display:flex;gap:6px;">
          ${[0, 15, 30, 45, 60, 90].map(m =>
            `<button onclick="window._schCommute(${m})"
              style="flex:1;padding:5px 2px;font-family:var(--font-mono);font-size:10px;
              background:rgba(0,10,25,${settings.commuteH*60===m?'.95':'.7'});
              border:1px solid rgba(0,200,255,${settings.commuteH*60===m?'0.6':'0.15'});
              color:${settings.commuteH*60===m?'var(--animus)':'var(--text-dim)'};
              cursor:pointer;" id="sch-c-${m}">${m===0?'0':''+m}</button>`
          ).join('')}
        </div>
        <div style="font-size:9px;color:var(--text-dim);margin-top:3px;
          font-family:var(--font-mono);">minutes · aller uniquement (×2 = total)</div>
      </div>

      <!-- TYPE DE POSTE -->
      <div style="margin-bottom:12px;">
        <div style="font-size:9px;color:var(--text-dim);font-family:var(--font-mono);
          margin-bottom:6px;letter-spacing:.08em;">TYPE DE POSTE</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          ${Object.entries(POSTE_TYPES).map(([key, pt]) => `
            <button onclick="window._schSetPoste('${key}')"
              style="padding:7px 6px;text-align:left;border-radius:5px;cursor:pointer;
              background:${settings.posteType===key?'rgba(0,200,255,0.15)':'rgba(255,255,255,0.03)'};
              border:1px solid ${settings.posteType===key?'rgba(0,200,255,0.5)':'rgba(255,255,255,0.08)'};
              color:${settings.posteType===key?'var(--animus)':'var(--text-dim)'};
              font-family:var(--font-mono);font-size:9px;line-height:1.4;width:auto;margin:0;">
              <div>${pt.icon} ${pt.label}</div>
              ${pt.fatF > 1 ? `<div style="font-size:8px;color:#ffb300;margin-top:2px;">fat ×${pt.fatF} str ×${pt.strF}</div>` : ''}
            </button>`).join('')}
        </div>
        ${settings.posteType !== 'standard' ? `
          <div style="margin-top:6px;font-size:9px;color:rgba(255,179,0,0.8);
            font-family:var(--font-mono);padding:5px 8px;
            background:rgba(255,179,0,0.06);border-radius:4px;">
            ⚠ ${POSTE_TYPES[settings.posteType]?.desc || ''}
          </div>` : ''}
      </div>

      <!-- CLASSIFICATION AUTO -->
      <div style="padding:8px 10px;background:rgba(0,10,25,.7);
        border-left:3px solid var(--animus);margin-bottom:12px;" id="sch-regime-info">
        <div style="font-size:11px;color:#fff;font-weight:600;">${regime.icon} ${regime.label}</div>
        <div style="font-size:10px;color:var(--text-dim);margin-top:2px;">${regime.desc}</div>
        ${autoR !== 'standard' ? `<div style="font-size:9px;color:#ffb300;margin-top:4px;
          font-family:var(--font-mono);">→ Facteur biologique ×${
            autoR==='nuit_complete'?'1.40':autoR==='nuit_partielle'?'1.20':'1.10'
          } appliqué (cortisol + cvRisk)</div>` : ''}
      </div>

      <button onclick="window._schSaveGlobal()"
        style="width:100%;padding:8px;background:rgba(0,200,170,0.12);
        border:1px solid var(--sync);color:var(--sync);font-family:var(--font-mono);
        font-size:10px;letter-spacing:.1em;cursor:pointer;margin-bottom:16px;">
        ENREGISTRER LE PROFIL
      </button>

      <!-- HORAIRES VARIABLES PAR JOUR -->
      <div style="margin-bottom:16px;">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--animus);
          letter-spacing:.12em;margin-bottom:8px;display:flex;align-items:center;justify-content:space-between;">
          <span>📅 HORAIRES PAR JOUR DE SEMAINE</span>
          <button onclick="window._schToggleWeekSchedule()" id="toggle-week-schedule"
                  style="padding:4px 10px;font-size:9px;font-family:var(--font-mono);
                         background:${_weekScheduleEnabled() ? 'rgba(0,200,255,0.15)' : 'rgba(255,255,255,0.05)'};
                         border:1px solid ${_weekScheduleEnabled() ? 'rgba(0,200,255,0.4)' : 'rgba(255,255,255,0.1)'};
                         color:${_weekScheduleEnabled() ? '#00c8ff' : '#888'};
                         cursor:pointer;letter-spacing:.1em;">
            ${_weekScheduleEnabled() ? '✓ ACTIVÉ' : '✕ DÉSACTIVÉ'}
          </button>
        </div>
        
        ${_weekScheduleEnabled() ? `
          <div style="background:rgba(0,10,25,0.5);border:1px solid rgba(0,200,255,0.1);
                      border-radius:4px;padding:10px;font-size:10px;color:var(--text-dim);margin-bottom:8px;">
            💡 Définissez des horaires spécifiques pour chaque jour de la semaine. 
            Priorité : Override du jour > Jour semaine > Profil global.
          </div>
          <div id="week-schedule-container">
            ${_renderWeekSchedule()}
          </div>
        ` : `
          <div style="text-align:center;padding:20px;color:var(--text-dim);font-size:10px;">
            Activez pour définir des horaires différents selon les jours de la semaine<br>
            (ex: 6h-13h le lundi-mardi, 13h-20h le mercredi-vendredi)
          </div>
        `}
      </div>

      <!-- PRESETS HORAIRES -->
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--animus);
        letter-spacing:.12em;margin-bottom:8px;">PRESETS HORAIRES</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">
        ${[
          { label:'Journée',   icon:'☀️', start:'06:00', end:'14:00' },
          { label:'Après-midi', icon:'🌆', start:'14:00', end:'22:00' },
          { label:'Nuit',       icon:'🌙', start:'22:00', end:'06:00' },
          { label:'5×8 Matin',  icon:'🔄', start:'05:00', end:'13:00' },
          { label:'5×8 Soir',   icon:'🔄', start:'13:00', end:'21:00' },
          { label:'5×8 Nuit',   icon:'🔄', start:'21:00', end:'05:00' },
        ].map(p =>
          `<button onclick="window._schApplyPreset('${p.start}','${p.end}')"
            style="flex:1;min-width:80px;padding:6px 4px;font-family:var(--font-mono);font-size:9px;
            background:rgba(0,10,25,.7);border:1px solid rgba(0,200,255,0.15);
            color:var(--text-dim);cursor:pointer;text-align:center;line-height:1.3;"
            title="Début ${p.start} → Fin ${p.end}">
            ${p.icon} ${p.label}<br><span style="font-size:8px;opacity:.6">${p.start}–${p.end}</span>
          </button>`
        ).join('')}
      </div>

      <!-- OVERRIDE DU JOUR -->
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--animus);
        letter-spacing:.12em;margin-bottom:8px;">
        OVERRIDE AUJOURD'HUI
        <span style="color:var(--text-dim);font-size:8px;margin-left:6px;">
          ${todayKey}${todayOv ? ' · <span style="color:var(--sync)">✓ défini</span>' : ''}
        </span>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
        <div>
          <div style="font-size:9px;color:var(--text-dim);font-family:var(--font-mono);
            margin-bottom:4px;">DÉBUT (aujourd'hui)</div>
          <input type="time" id="ov-start" value="${_toTimeStr((todayOv||settings).startH)}"
            style="width:100%;background:rgba(0,10,25,.9);color:var(--text);
            border:1px solid rgba(255,179,0,0.3);padding:5px 8px;
            font-family:var(--font-mono);font-size:12px;box-sizing:border-box;">
        </div>
        <div>
          <div style="font-size:9px;color:var(--text-dim);font-family:var(--font-mono);
            margin-bottom:4px;">FIN (aujourd'hui)</div>
          <input type="time" id="ov-end" value="${_toTimeStr((todayOv||settings).endH)}"
            style="width:100%;background:rgba(0,10,25,.9);color:var(--text);
            border:1px solid rgba(255,179,0,0.3);padding:5px 8px;
            font-family:var(--font-mono);font-size:12px;box-sizing:border-box;">
        </div>
      </div>

      <div style="display:flex;gap:6px;">
        <button onclick="window._schSaveOverride()"
          style="flex:1;padding:7px;background:rgba(255,179,0,0.10);
          border:1px solid rgba(255,179,0,0.4);color:#ffb300;font-family:var(--font-mono);
          font-size:10px;letter-spacing:.1em;cursor:pointer;">
          APPLIQUER CE JOUR
        </button>
        ${todayOv ? `<button onclick="window._schClearOverride()"
          style="padding:7px 12px;background:rgba(200,40,56,.10);
          border:1px solid rgba(200,40,56,.3);color:#c82838;font-family:var(--font-mono);
          font-size:10px;cursor:pointer;">✕</button>` : ''}
      </div>

      <!-- LÉGENDE LÉGALE -->
      <div style="margin-top:14px;padding:8px;background:rgba(255,255,255,0.03);
        font-size:9px;color:var(--text-dim);font-family:var(--font-mono);line-height:1.7;">
        L3131-1 · 11h repos entre journées<br>
        L3122-2 · Nuit = ≥3h entre 21h-6h, ≥2×/sem<br>
        L3121-34 · Max journalier : 10h (dérogatoire 12h)<br>
        IARC 2019 · Travail nuit = cancérogène probable (Groupe 2A)
      </div>
      <!-- ROULEMENT -->
      <div id="rotation-panel-container"></div>
      `}
    </div>`;

  // Render rotation panel after main panel
  setTimeout(() => {
    if (document.getElementById('rotation-panel-container') && typeof renderRotationPanel === 'function') {
      renderRotationPanel('rotation-panel-container');
    }
  }, 50);

  // ── Handlers ──
  window._schSetPoste = (posteType) => {
    const s = loadSettings();
    s.posteType = posteType;
    saveSettings(s);
    renderSchedulePanel(containerId);
    if (typeof window._fullSync === 'function') window._fullSync();
  };

  window._schToggleSchedule = () => {
    const currentState = localStorage.getItem('M4_SCHEDULE_ENABLED') !== 'false';
    const newState = !currentState;
    localStorage.setItem('M4_SCHEDULE_ENABLED', newState);
    
    // Notification
    if (typeof DTE !== 'undefined' && DTE.UI && DTE.UI.notify) {
      DTE.UI.notify(
        newState 
          ? '✓ Suivi des horaires activé : vos horaires impacteront les scores biométriques'
          : '✕ Suivi des horaires désactivé : seules les heures sup seront prises en compte',
        newState ? 'success' : 'info'
      );
    }
    
    // Recharger l'interface
    renderSchedulePanel(containerId);
    
    // Déclencher une réanalyse
    _triggerReanalysis();
  };
  
  window._schSaveGlobal = () => {
    const s = loadSettings();
    s.startH    = _parseTime(document.getElementById('sch-start').value);
    s.endH      = _parseTime(document.getElementById('sch-end').value);
    s.regimeType = autoClassify(s.startH, s.endH);
    saveSettings(s);
    renderSchedulePanel(containerId);
    _triggerReanalysis();
  };

  window._schCommute = (minutes) => {
    const s = loadSettings();
    s.commuteH = minutes / 60;
    saveSettings(s);
    renderSchedulePanel(containerId);
    _triggerReanalysis();
  };

  window._schSaveOverride = () => {
    const startH = _parseTime(document.getElementById('ov-start').value);
    const endH   = _parseTime(document.getElementById('ov-end').value);
    saveOverride(todayKey, {
      startH, endH,
      regimeType: autoClassify(startH, endH),
    });
    renderSchedulePanel(containerId);
    _triggerReanalysis();
  };

  window._schClearOverride = () => {
    saveOverride(todayKey, null);
    renderSchedulePanel(containerId);
    _triggerReanalysis();
  };

  window._schApplyPreset = (startStr, endStr) => {
    document.getElementById('sch-start').value = startStr;
    document.getElementById('sch-end').value = endStr;
    // trigger regime update
    document.getElementById('sch-start').dispatchEvent(new Event('change'));
  };

  // ── HANDLERS HORAIRES PAR JOUR ──────────────────────────────────

  window._schToggleWeekSchedule = () => {
    const current = isWeekScheduleEnabled();
    setWeekScheduleEnabled(!current);
    renderSchedulePanel(containerId);
    _triggerReanalysis();
  };

  window._schSaveWeekSchedule = () => {
    const schedule = {};
    [0, 1, 2, 3, 4, 5, 6].forEach(dow => {
      const startEl = document.getElementById(`week-${dow}-start`);
      const endEl = document.getElementById(`week-${dow}-end`);
      if (startEl && endEl) {
        schedule[dow] = {
          startH: _parseTime(startEl.value),
          endH: _parseTime(endEl.value)
        };
      }
    });
    saveWeekSchedule(schedule);
    renderSchedulePanel(containerId);
    _triggerReanalysis();
    
    if (typeof DTE !== 'undefined' && DTE.UI && DTE.UI.notify) {
      DTE.UI.notify('✓ Horaires par jour enregistrés', 'success');
    }
  };

  window._schCopyDay = (dow) => {
    const startEl = document.getElementById(`week-${dow}-start`);
    const endEl = document.getElementById(`week-${dow}-end`);
    if (!startEl || !endEl) return;
    
    const startVal = startEl.value;
    const endVal = endEl.value;
    
    // Copier vers tous les autres jours
    [0, 1, 2, 3, 4, 5, 6].forEach(d => {
      if (d !== dow) {
        const s = document.getElementById(`week-${d}-start`);
        const e = document.getElementById(`week-${d}-end`);
        if (s && e) {
          s.value = startVal;
          e.value = endVal;
        }
      }
    });
    
    if (typeof DTE !== 'undefined' && DTE.UI && DTE.UI.notify) {
      DTE.UI.notify('📋 Horaires copiés à tous les jours', 'info');
    }
  };

  // Mise à jour temps réel du régime affiché
  ['sch-start','sch-end'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', () => {
      const sh = _parseTime(document.getElementById('sch-start').value);
      const eh = _parseTime(document.getElementById('sch-end').value);
      const ar = autoClassify(sh, eh);
      const rg = REGIME_LABELS[ar] || REGIME_LABELS.standard;
      const ri = document.getElementById('sch-regime-info');
      if (ri) ri.innerHTML = `
        <div style="font-size:11px;color:#fff;font-weight:600;">${rg.icon} ${rg.label}</div>
        <div style="font-size:10px;color:var(--text-dim);margin-top:2px;">${rg.desc}</div>
        ${ar !== 'standard' ? `<div style="font-size:9px;color:#ffb300;margin-top:4px;
          font-family:var(--font-mono);">→ Facteur ×${
            ar==='nuit_complete'?'1.40':ar==='nuit_partielle'?'1.20':'1.10'
          } appliqué</div>` : ''}`;
    });
  });
}

/* ── UTILITAIRES ────────────────────────────────────────────────── */

function _toTimeStr(h) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return String(hh).padStart(2,'0') + ':' + String(mm).padStart(2,'0');
}

function _parseTime(str) {
  if (!str) return 9;
  const [h, m] = str.split(':');
  return parseInt(h||0) + parseInt(m||0)/60;
}

function _prevDayKey(dateKey) {
  const d = new Date(dateKey + 'T12:00:00');
  d.setDate(d.getDate() - 1);
  return d.getFullYear() + '-'
    + String(d.getMonth()+1).padStart(2,'0') + '-'
    + String(d.getDate()).padStart(2,'0');
}

/* ── HELPERS HORAIRES PAR JOUR ─────────────────────────────────── */

function _weekScheduleEnabled() {
  return isWeekScheduleEnabled();
}

function _renderWeekSchedule() {
  const schedule = loadWeekSchedule();
  const days = [
    { dow: 1, label: 'Lundi', short: 'Lun' },
    { dow: 2, label: 'Mardi', short: 'Mar' },
    { dow: 3, label: 'Mercredi', short: 'Mer' },
    { dow: 4, label: 'Jeudi', short: 'Jeu' },
    { dow: 5, label: 'Vendredi', short: 'Ven' },
    { dow: 6, label: 'Samedi', short: 'Sam' },
    { dow: 0, label: 'Dimanche', short: 'Dim' }
  ];

  return days.map(day => {
    const daySchedule = schedule[day.dow] || { startH: 9, endH: 17 };
    return `
      <div style="display:grid;grid-template-columns:80px 1fr 1fr 40px;gap:6px;align-items:center;
                  margin-bottom:6px;padding:6px;background:rgba(0,10,25,0.5);border-radius:3px;">
        <div style="font-size:10px;color:var(--text-dim);font-family:var(--font-mono);font-weight:600;">
          ${day.short}
        </div>
        <input type="time" id="week-${day.dow}-start" value="${_toTimeStr(daySchedule.startH)}"
               style="width:100%;background:rgba(0,10,25,.9);color:var(--text);
                      border:1px solid rgba(0,200,255,0.15);padding:4px 6px;
                      font-family:var(--font-mono);font-size:11px;box-sizing:border-box;">
        <input type="time" id="week-${day.dow}-end" value="${_toTimeStr(daySchedule.endH)}"
               style="width:100%;background:rgba(0,10,25,.9);color:var(--text);
                      border:1px solid rgba(0,200,255,0.15);padding:4px 6px;
                      font-family:var(--font-mono);font-size:11px;box-sizing:border-box;">
        <button onclick="window._schCopyDay(${day.dow})" title="Copier ces horaires à tous les jours"
                style="padding:4px;background:rgba(0,200,255,0.08);border:1px solid rgba(0,200,255,0.15);
                       color:#00c8ff;font-size:10px;cursor:pointer;border-radius:2px;">
          📋
        </button>
      </div>
    `;
  }).join('') + `
    <button onclick="window._schSaveWeekSchedule()"
            style="width:100%;padding:8px;margin-top:8px;background:rgba(0,200,255,0.12);
                   border:1px solid rgba(0,200,255,0.3);color:#00c8ff;font-family:var(--font-mono);
                   font-size:10px;letter-spacing:.1em;cursor:pointer;">
      ✓ ENREGISTRER LES HORAIRES PAR JOUR
    </button>
  `;
}

function _triggerReanalysis() {
  // Déclencher une nouvelle analyse engine si disponible
  try {
    if (window.DTE && window.DTE.engine) {
      window.DTE.engine.analyze();
      document.dispatchEvent(new CustomEvent('dte:schedule:changed'));
    }
  } catch(_) {}
}

/* ── EXPORT ─────────────────────────────────────────────────────── */
global.DTESchedule = {
  loadSettings,
  saveSettings,
  loadOverrides,
  saveOverride,
  checkRepos11h,
  autoClassify,
  renderSchedulePanel,
  REGIME_LABELS,
};

}(typeof window !== 'undefined' ? window : global));

// ═══════════════════════════════════════════════════════
// ROULEMENT DE SEMAINES (cycles d'horaires en boucle)
// Permet de définir N semaines-types qui se répètent
// Exemple 3x8 : S1=6h-13h, S2=13h-20h, S3=20h-3h → boucle
// ═══════════════════════════════════════════════════════
const ROTATION_KEY = 'DTE_WEEK_ROTATION';
const ROTATION_ENABLED_KEY = 'DTE_WEEK_ROTATION_ENABLED';
const ROTATION_ANCHOR_KEY = 'DTE_WEEK_ROTATION_ANCHOR'; // date ISO du début du cycle

function loadRotation() {
  try { return JSON.parse(localStorage.getItem(ROTATION_KEY) || '[]'); } catch(_) { return []; }
}
function saveRotation(r) {
  try { localStorage.setItem(ROTATION_KEY, JSON.stringify(r)); } catch(_) {}
}
function isRotationEnabled() {
  return localStorage.getItem(ROTATION_ENABLED_KEY) === 'true';
}
function setRotationEnabled(v) {
  localStorage.setItem(ROTATION_ENABLED_KEY, v ? 'true' : 'false');
}
function getRotationAnchor() {
  return localStorage.getItem(ROTATION_ANCHOR_KEY) || new Date().toISOString().slice(0,10);
}
function setRotationAnchor(dateStr) {
  localStorage.setItem(ROTATION_ANCHOR_KEY, dateStr);
}

// Retourne les horaires à appliquer pour une date donnée selon le cycle actif
function getRotationScheduleForDate(dateStr) {
  if (!isRotationEnabled()) return null;
  const rotation = loadRotation();
  if (!rotation.length) return null;
  const anchor = getRotationAnchor();
  const anchorDate = new Date(anchor + 'T00:00:00');
  const targetDate = new Date(dateStr + 'T00:00:00');
  const diffDays = Math.round((targetDate - anchorDate) / 86400000);
  const diffWeeks = Math.floor(diffDays / 7);
  const weekIndex = ((diffWeeks % rotation.length) + rotation.length) % rotation.length;
  return rotation[weekIndex] || null;
}

// Expose pour schedule panel
window.DTERotation = {
  load: loadRotation,
  save: saveRotation,
  isEnabled: isRotationEnabled,
  setEnabled: setRotationEnabled,
  getAnchor: getRotationAnchor,
  setAnchor: setRotationAnchor,
  getForDate: getRotationScheduleForDate,
  addWeek(startH, endH, label) {
    const r = loadRotation();
    r.push({ startH, endH, label: label || `Semaine ${r.length+1}` });
    saveRotation(r);
    return r;
  },
  removeWeek(index) {
    const r = loadRotation();
    r.splice(index, 1);
    saveRotation(r);
    return r;
  },
  clear() { saveRotation([]); }
};

// Panel HTML de configuration du roulement
function renderRotationPanel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const rotation = loadRotation();
  const enabled = isRotationEnabled();
  const anchor = getRotationAnchor();

  container.innerHTML = `
    <div style="margin-top:16px;border-top:1px solid rgba(0,200,255,0.15);padding-top:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div style="font-family:var(--font-hud);font-size:11px;color:var(--animus);letter-spacing:.1em;">
          🔄 ROULEMENT DE SEMAINES
        </div>
        <button onclick="window._schToggleRotation()" style="
          padding:5px 12px;border-radius:4px;font-size:10px;cursor:pointer;
          background:${enabled?'rgba(0,200,255,0.15)':'rgba(255,255,255,0.05)'};
          border:1px solid ${enabled?'rgba(0,200,255,0.5)':'rgba(255,255,255,0.1)'};
          color:${enabled?'var(--animus)':'var(--text-muted)'};">
          ${enabled ? '✓ ACTIVÉ' : '✕ DÉSACTIVÉ'}
        </button>
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text-muted);margin-bottom:10px;">
        Définissez N semaines-types qui se répètent en boucle. Ex: 3×8h = S1 matin, S2 après-midi, S3 nuit → cycle de 3 semaines.
      </div>
      ${enabled ? `
      <div style="margin-bottom:8px;">
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text-muted);">Début du cycle (semaine de référence) :</label>
        <input type="date" id="rot-anchor" value="${anchor}"
          style="background:rgba(0,10,25,.9);border:1px solid rgba(0,200,255,0.2);color:var(--text);border-radius:4px;padding:4px 8px;font-size:11px;width:100%;margin-top:4px;"
          onchange="DTERotation.setAnchor(this.value)">
      </div>
      <div id="rotation-weeks" style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">
        ${rotation.map((w,i) => `
          <div style="display:flex;align-items:center;gap:6px;background:rgba(0,200,255,0.05);border:1px solid rgba(0,200,255,0.12);padding:8px;border-radius:4px;">
            <span style="font-family:var(--font-hud);font-size:10px;color:var(--animus);min-width:60px;">S${i+1}</span>
            <input type="time" value="${String(Math.floor(w.startH)).padStart(2,'0')}:${String(Math.round((w.startH%1)*60)).padStart(2,'0')}"
              id="rot-start-${i}" style="background:rgba(0,10,25,.9);border:1px solid rgba(0,200,255,0.2);color:var(--text);border-radius:4px;padding:3px 6px;font-size:11px;flex:1;">
            <span style="color:var(--text-muted);font-size:10px;">→</span>
            <input type="time" value="${String(Math.floor(w.endH)).padStart(2,'0')}:${String(Math.round((w.endH%1)*60)).padStart(2,'0')}"
              id="rot-end-${i}" style="background:rgba(0,10,25,.9);border:1px solid rgba(0,200,255,0.2);color:var(--text);border-radius:4px;padding:3px 6px;font-size:11px;flex:1;">
            <button onclick="window._schSaveRotationWeek(${i})" style="padding:3px 8px;border-radius:4px;font-size:9px;cursor:pointer;background:rgba(0,200,255,0.1);border:1px solid rgba(0,200,255,0.3);color:var(--animus);">💾</button>
            <button onclick="window._schRemoveRotationWeek(${i})" style="padding:3px 8px;border-radius:4px;font-size:9px;cursor:pointer;background:rgba(255,50,50,0.1);border:1px solid rgba(255,50,50,0.3);color:#f55;">✕</button>
          </div>`).join('')}
      </div>
      <div style="display:flex;gap:6px;">
        <button onclick="window._schAddRotationWeek()" style="flex:1;padding:7px;border-radius:4px;font-size:10px;cursor:pointer;background:rgba(0,200,255,0.08);border:1px solid rgba(0,200,255,0.2);color:var(--animus);">
          ＋ Ajouter une semaine
        </button>
        ${rotation.length>0?`<button onclick="window._schClearRotation()" style="padding:7px 12px;border-radius:4px;font-size:10px;cursor:pointer;background:rgba(255,50,50,0.08);border:1px solid rgba(255,50,50,0.2);color:#f55;">🗑</button>`:''}
      </div>` : ''}
    </div>`;

  // Handlers
  window._schToggleRotation = () => {
    setRotationEnabled(!isRotationEnabled());
    if (typeof _triggerReanalysis === 'function') _triggerReanalysis();
    renderRotationPanel(containerId);
  };
  window._schAddRotationWeek = () => {
    const r = loadRotation();
    const last = r[r.length-1] || { startH:9, endH:17 };
    // Cycle automatique : décale de 7h à chaque semaine
    const shift = 7;
    const nStart = (last.startH + shift) % 24;
    const nEnd = (last.endH + shift) % 24;
    DTERotation.addWeek(nStart, nEnd, `Semaine ${r.length+1}`);
    renderRotationPanel(containerId);
  };
  window._schSaveRotationWeek = (i) => {
    const r = loadRotation();
    const sEl = document.getElementById(`rot-start-${i}`);
    const eEl = document.getElementById(`rot-end-${i}`);
    if (sEl && eEl) {
      const [sh,sm] = sEl.value.split(':').map(Number);
      const [eh,em] = eEl.value.split(':').map(Number);
      r[i].startH = sh + sm/60;
      r[i].endH = eh + em/60;
      saveRotation(r);
      if (typeof _triggerReanalysis === 'function') _triggerReanalysis();
    }
  };
  window._schRemoveRotationWeek = (i) => {
    DTERotation.removeWeek(i);
    renderRotationPanel(containerId);
  };
  window._schClearRotation = () => {
    DTERotation.clear();
    renderRotationPanel(containerId);
  };
}

window.DTERotation.renderPanel = renderRotationPanel;
