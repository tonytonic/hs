/**
 * Vacances & Fériés — Module 4
 * Stockage : DTE_VACANCES_{year} = { "2026-02-17": true, ... }
 */
(function(global){
'use strict';

const STORAGE_KEY = y => 'DTE_VACANCES_' + y;

function getVacances(year) {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY(year)) || '{}'); } catch(_) { return {}; }
}
function saveVacances(year, data) {
  localStorage.setItem(STORAGE_KEY(year), JSON.stringify(data));
}

function getFeries(year) {
  const feries = {};
  for (const y of [year-1, year, year+1]) {
    try {
      const sd = JSON.parse(localStorage.getItem('SPECIAL_DAYS_'+y) || '{}');
      Object.entries(sd).forEach(([d,t]) => { if(t==='ferie') feries[d] = true; });
    } catch(_) {}
    try {
      const fd = JSON.parse(localStorage.getItem('DTE_FERIES_'+y) || '{}');
      Object.keys(fd).forEach(d => { feries[d] = true; });
    } catch(_) {}
  }
  return feries;
}

async function importFeriesM4() {
  const year = new Date().getFullYear();
  const btn = document.getElementById('btn-import-feries');
  if (btn) { btn.textContent = '⏳ Import...'; btn.disabled = true; }
  try {
    for (const y of [year-1, year, year+1]) {
      const res = await fetch('https://calendrier.api.gouv.fr/jours-feries/metropole/'+y+'.json');
      const data = await res.json();
      const stored = {};
      Object.keys(data).forEach(d => { stored[d] = true; });
      localStorage.setItem('DTE_FERIES_'+y, JSON.stringify(stored));
    }
    refresh();
    if (typeof window._fullSync === 'function') window._fullSync();
  } catch(e) {
    alert('Import impossible — vérifiez votre connexion.');
  } finally {
    if (btn) { btn.textContent = '🇫🇷 Importer les fériés'; btn.disabled = false; }
  }
}

function localDK(dt) {
  return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');
}

// Récupère le 1er jour de la semaine selon la CCN active (1=lundi, 0=dimanche, etc.)
// Par défaut : 1 (lundi ISO) si CCN_API absente
function _getCCNWeekStart() {
  try {
    if (typeof window.CCN_API !== 'undefined') {
      const idcc = parseInt(localStorage.getItem('CCN_IDCC') || '0');
      const grp = window.CCN_API.getGroupeForCCN(idcc);
      if (grp && typeof grp.debutSemaine === 'number') return grp.debutSemaine;
    }
  } catch(_){}
  return 1; // défaut lundi
}

// Renvoie la date "début de semaine" pour une date donnée selon CCN
// dateStr = 'YYYY-MM-DD' ou Date
function getMondayOfWeek(dateStr) {
  const d = new Date(dateStr+'T12:00:00');
  const ws = _getCCNWeekStart(); // 0=dim, 1=lun, ..., 6=sam
  const dow = d.getDay(); // 0=dim, 1=lun, ..., 6=sam
  // Calculer le décalage négatif vers le 1er jour de la semaine CCN
  const offset = (dow - ws + 7) % 7;
  d.setDate(d.getDate() - offset);
  return localDK(d);
}

function addWeek(weekStartStr) {
  const year = parseInt(weekStartStr.slice(0,4));
  const data = getVacances(year);
  const start = new Date(weekStartStr+'T12:00:00');
  for (let i = 0; i < 7; i++) {
    const dt = new Date(start); dt.setDate(start.getDate()+i);
    data[localDK(dt)] = true;
  }
  saveVacances(year, data);
}

function addDay(dateStr) {
  const year = parseInt(dateStr.slice(0,4));
  const data = getVacances(year);
  data[dateStr] = true;
  saveVacances(year, data);
}

function removeWeek(mondayStr) {
  const year = parseInt(mondayStr.slice(0,4));
  const data = getVacances(year);
  const monday = new Date(mondayStr+'T12:00:00');
  for (let i = 0; i < 7; i++) {
    const dt = new Date(monday); dt.setDate(monday.getDate()+i);
    delete data[localDK(dt)];
  }
  saveVacances(year, data);
}

function removeDay(dateStr) {
  const year = parseInt(dateStr.slice(0,4));
  const data = getVacances(year);
  delete data[dateStr];
  saveVacances(year, data);
}

function getWeeksFromDays(data) {
  const mondays = new Set();
  Object.keys(data).forEach(d => mondays.add(getMondayOfWeek(d)));
  return [...mondays].sort();
}

function getDaysOfWeek(mondayStr, data) {
  const monday = new Date(mondayStr+'T12:00:00');
  const days = [];
  for (let i = 0; i < 7; i++) {
    const dt = new Date(monday); dt.setDate(monday.getDate()+i);
    const dk = localDK(dt);
    days.push({ dk, present: !!data[dk], dow: dt.getDay() });
  }
  return days;
}

// Tab courant : 'semaine' ou 'jour'
let _tab = 'semaine';

function render() {
  const year = new Date().getFullYear();
  const vacData = getVacances(year);
  const feries  = getFeries(year);
  const weeks   = getWeeksFromDays(vacData);
  const feriesCount = Object.keys(feries).length;
  const JOURS = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
  const MOIS  = ['jan','fév','mar','avr','mai','jun','jul','aoû','sep','oct','nov','déc'];

  const tabStyle = (t) => `background:${_tab===t?'rgba(255,179,0,0.18)':'rgba(255,255,255,0.04)'};
    border:1px solid ${_tab===t?'rgba(255,179,0,0.5)':'rgba(255,255,255,0.1)'};
    border-radius:6px;padding:6px 14px;font-size:11px;
    color:${_tab===t?'#ffb300':'rgba(255,255,255,0.5)'};
    cursor:pointer;width:auto;margin:0;font-family:var(--font-mono);letter-spacing:.05em;`;

  return `
<div style="font-family:var(--font-mono);padding:4px 0;">

  <!-- Fériés -->
  <div style="margin-bottom:12px;">
    <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">
      Jours fériés chargés : <b style="color:var(--sync)">${feriesCount} jours</b>
    </div>
    <button id="btn-import-feries" onclick="window._importFeriesM4()"
      style="background:rgba(0,200,255,0.08);border:1px solid rgba(0,200,255,0.25);
      border-radius:6px;padding:8px 12px;font-size:11px;color:var(--sync);
      cursor:pointer;width:100%;text-align:left;margin:0;">
      &#x1F1EB;&#x1F1F7; Importer les f&eacute;ri&eacute;s officiels (API gouv.)
    </button>
  </div>

  <!-- Tabs -->
  <div style="display:flex;gap:6px;margin-bottom:12px;">
    <button onclick="window._vacancesSetTab('semaine')" style="${tabStyle('semaine')}">PAR SEMAINE</button>
    <button onclick="window._vacancesSetTab('jour')" style="${tabStyle('jour')}">PAR JOUR</button>
  </div>

  ${_tab === 'semaine' ? renderSemaine(year, vacData, weeks, JOURS, MOIS) : renderJour(year, vacData, feries, JOURS, MOIS)}
</div>`;
}

function renderSemaine(year, vacData, weeks, JOURS, MOIS) {
  return `
  <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;letter-spacing:.05em;">SEMAINES DE VACANCES ${year}</div>

  ${weeks.length === 0
    ? '<div style="font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:12px;">Aucune semaine enregistrée</div>'
    : weeks.map(monday => {
        const fri = new Date(monday+'T12:00:00'); fri.setDate(fri.getDate()+4);
        const d0  = new Date(monday+'T12:00:00');
        const label = d0.getDate()+' '+['jan','fév','mar','avr','mai','jun','jul','aoû','sep','oct','nov','déc'][d0.getMonth()]
          + ' → ' + fri.getDate()+' '+['jan','fév','mar','avr','mai','jun','jul','aoû','sep','oct','nov','déc'][fri.getMonth()];
        // Compter les jours réellement cochés dans cette semaine
        const days = getDaysOfWeek(monday, vacData);
        const checked = days.filter(d=>d.present).length;
        // Détection semaine complète (tous les jours ouvrés = lun-ven cochés)
        const ouvrés = days.filter(d=>d.dow!==0&&d.dow!==6);
        const isFullWeek = ouvrés.every(d=>d.present);
        return `<div style="background:rgba(255,179,0,0.06);border:1px solid rgba(255,179,0,${isFullWeek?'0.45':'0.2'});
          border-radius:8px;padding:8px 10px;margin-bottom:6px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
            <span style="font-size:12px;color:#ffb300;">🏖 ${label}${isFullWeek?' <span style="font-size:9px;background:rgba(255,179,0,0.2);border:1px solid rgba(255,179,0,0.4);padding:1px 5px;border-radius:3px;color:#ffb300;">✅ semaine complète</span>':''}</span>
            <button onclick="window._vacancesRemoveWeek('${monday}')"
              style="background:none;border:none;color:rgba(255,100,100,0.7);
              font-size:16px;cursor:pointer;padding:0 4px;line-height:1;width:auto;margin:0;">✕</button>
          </div>
          <div style="display:flex;gap:4px;">
            ${days.map(({dk,present,dow}) => {
              const d = new Date(dk+'T12:00:00');
              const isWE = dow===0||dow===6;
              const label = ['D','L','M','M','J','V','S'][dow]+d.getDate();
              return `<button onclick="window._vacancesToggleDay('${dk}')"
                style="flex:1;padding:4px 2px;border-radius:4px;font-size:10px;cursor:pointer;width:auto;margin:0;
                background:${present?(isWE?'rgba(255,179,0,0.15)':'rgba(255,179,0,0.3)'):'rgba(255,255,255,0.04)'};
                border:1px solid ${present?'rgba(255,179,0,0.5)':'rgba(255,255,255,0.1)'};
                color:${present?'#ffb300':(isWE?'rgba(255,255,255,0.25)':'rgba(255,255,255,0.5)')};
                ">${label}</button>`;
            }).join('')}
          </div>
        </div>`;
      }).join('')
  }

  <div style="display:flex;gap:8px;align-items:center;margin-top:8px;">
    <input type="date" id="vacances-week-picker"
      style="flex:1;background:#1a1f2b;color:#fff;border:1px solid rgba(255,179,0,0.3);
      border-radius:6px;padding:7px;font-size:16px;min-width:0;"
      title="Choisis n'importe quelle date — la semaine entière sera ajoutée">
    <button onclick="window._vacancesAddWeek()"
      style="background:rgba(255,179,0,0.15);border:1px solid rgba(255,179,0,0.4);
      border-radius:6px;padding:8px 12px;color:#ffb300;font-size:12px;
      cursor:pointer;white-space:nowrap;width:auto;margin:0;">+ Semaine</button>
  </div>
  <div style="font-size:10px;color:rgba(255,179,0,0.6);margin-top:4px;">📅 Choisis une date dans la semaine à ajouter (semaine alignée sur ta CCN)</div>
  <button onclick="window._vacancesAddCurrentWeek()"
    style="background:rgba(255,179,0,0.08);border:1px solid rgba(255,179,0,0.25);
    border-radius:6px;padding:7px 12px;color:rgba(255,179,0,0.8);font-size:11px;
    cursor:pointer;width:100%;margin-top:6px;text-align:left;">
    📅 Ajouter la semaine en cours (selon CCN)
  </button>`;
}

function renderJour(year, vacData, feries, JOURS, MOIS) {
  return `
  <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;letter-spacing:.05em;">JOURS DE VACANCES ${year}</div>

  <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;">
    <input type="date" id="vacances-day-picker"
      style="flex:1;background:#1a1f2b;color:#fff;border:1px solid rgba(255,179,0,0.3);
      border-radius:6px;padding:7px;font-size:16px;min-width:0;">
    <button onclick="window._vacancesAddDay()"
      style="background:rgba(255,179,0,0.15);border:1px solid rgba(255,179,0,0.4);
      border-radius:6px;padding:8px 12px;color:#ffb300;font-size:12px;
      cursor:pointer;white-space:nowrap;width:auto;margin:0;">+ Jour</button>
  </div>

  ${Object.keys(vacData).length === 0
    ? '<div style="font-size:11px;color:rgba(255,255,255,0.35);">Aucun jour enregistré</div>'
    : Object.keys(vacData).sort().map(dk => {
        const d = new Date(dk+'T12:00:00');
        const dow = d.getDay();
        const isWE = dow===0||dow===6;
        const label = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][dow]+' '
          +d.getDate()+' '+['jan','fév','mar','avr','mai','jun','jul','aoû','sep','oct','nov','déc'][d.getMonth()];
        return `<div style="display:flex;align-items:center;justify-content:space-between;
          background:rgba(255,179,0,0.06);border:1px solid rgba(255,179,0,${isWE?'0.1':'0.2'});
          border-radius:6px;padding:6px 10px;margin-bottom:4px;">
          <span style="font-size:12px;color:${isWE?'rgba(255,179,0,0.5)':'#ffb300'};">${isWE?'☀️':'🌴'} ${label}</span>
          <button onclick="window._vacancesRemoveDay('${dk}')"
            style="background:none;border:none;color:rgba(255,100,100,0.7);
            font-size:16px;cursor:pointer;padding:0 4px;line-height:1;width:auto;margin:0;">✕</button>
        </div>`;
      }).join('')
  }`;
}

function open() {
  const existing = document.getElementById('vacances-modal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'vacances-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:9000;display:flex;align-items:flex-end;justify-content:center;';
  modal.innerHTML = `
    <div style="background:#0d1117;border:1px solid rgba(255,179,0,0.2);border-radius:16px 16px 0 0;
      width:100%;max-width:500px;max-height:calc(88vh - env(safe-area-inset-top));
      overflow-y:auto;padding:16px;padding-bottom:calc(16px + env(safe-area-inset-bottom));">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:13px;color:#ffb300;letter-spacing:.1em;">
          🏖 VACANCES &amp; FÉRIÉS
        </span>
        <button onclick="window._closeVacancesModal()"
          style="background:none;border:none;color:rgba(255,255,255,0.5);font-size:20px;
          cursor:pointer;padding:0;width:auto;margin:0;line-height:1;">✕</button>
      </div>
      <div id="vacances-content">${render()}</div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if(e.target===modal) window._closeVacancesModal(); });
}

function refresh() {
  const el = document.getElementById('vacances-content');
  if (el) el.innerHTML = render();
}

function syncAndRefresh() {
  refresh();
  if (typeof window._fullSync === 'function') window._fullSync();
}

global._openVacances = open;
global._importFeriesM4 = importFeriesM4;

global._vacancesSetTab = (tab) => { _tab = tab; refresh(); };

global._vacancesAddCurrentWeek = () => {
  // Calcule le 1er jour de la semaine en cours selon la CCN active
  // Ex: CCN debutSemaine=1 (lun) → ajoute lun→dim
  //     CCN debutSemaine=3 (mer) → ajoute mer→mar (semaine décalée)
  const today = new Date();
  const ws = _getCCNWeekStart();
  const offset = (today.getDay() - ws + 7) % 7;
  const start = new Date(today);
  start.setDate(today.getDate() - offset);
  addWeek(localDK(start));
  syncAndRefresh();
};

global._vacancesAddWeek = () => {
  const inp = document.getElementById('vacances-week-picker');
  if (!inp || !inp.value) return;
  let weekStart;
  if (inp.value.includes('-W')) {
    // Ancien format type="week" → numéro de semaine ISO (lundi obligatoire)
    // On l'aligne ensuite sur la CCN si nécessaire via getMondayOfWeek
    const [y, w] = inp.value.split('-W').map(Number);
    const jan4 = new Date(y, 0, 4);
    const isoMonday = new Date(jan4);
    isoMonday.setDate(jan4.getDate() - (jan4.getDay()||7) + 1 + (w-1)*7);
    // Réaligner sur le début de semaine CCN si différent
    weekStart = getMondayOfWeek(localDK(isoMonday));
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(inp.value)) {
    // type="date" — convertir n'importe quelle date en début de semaine CCN
    weekStart = getMondayOfWeek(inp.value);
  } else {
    return;
  }
  addWeek(weekStart);
  syncAndRefresh();
};

global._vacancesAddDay = () => {
  const inp = document.getElementById('vacances-day-picker');
  if (!inp || !inp.value) return;
  addDay(inp.value);
  syncAndRefresh();
};

global._vacancesToggleDay = (dk) => {
  const year = parseInt(dk.slice(0,4));
  const data = getVacances(year);
  if (data[dk]) delete data[dk];
  else data[dk] = true;
  saveVacances(year, data);
  syncAndRefresh();
};

global._vacancesRemoveWeek = (monday) => {
  removeWeek(monday);
  syncAndRefresh();
};

global._vacancesRemoveDay = (dk) => {
  removeDay(dk);
  syncAndRefresh();
};

global._closeVacancesModal = () => {
  const modal = document.getElementById('vacances-modal');
  if (modal) modal.remove();
  if (typeof window._fullSync === 'function') window._fullSync();
};

})(window);
