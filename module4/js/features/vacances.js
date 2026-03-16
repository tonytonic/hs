/**
 * Vacances & Fériés — Module 4
 * Permet de marquer des semaines de vacances et de lire les fériés M1
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
    // D'abord M1 (SPECIAL_DAYS)
    try {
      const sd = JSON.parse(localStorage.getItem('SPECIAL_DAYS_'+y) || '{}');
      Object.entries(sd).forEach(([d,t]) => { if(t==='ferie') feries[d] = true; });
    } catch(_) {}
    // Ensuite M4 propre (DTE_FERIES)
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

function getMondayOfWeek(dateStr) {
  const d = new Date(dateStr+'T12:00:00');
  const dow = d.getDay() || 7;
  d.setDate(d.getDate() - (dow - 1));
  return localDK(d);
}

function addWeek(mondayStr) {
  const year = parseInt(mondayStr.slice(0,4));
  const data = getVacances(year);
  const monday = new Date(mondayStr+'T12:00:00');
  for (let i = 0; i < 7; i++) {
    const dt = new Date(monday); dt.setDate(monday.getDate()+i);
    data[localDK(dt)] = true;
  }
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

function getWeeksFromDays(data) {
  const mondays = new Set();
  Object.keys(data).forEach(d => mondays.add(getMondayOfWeek(d)));
  return [...mondays].sort();
}

function render() {
  const year = new Date().getFullYear();
  const vacData = getVacances(year);
  const feries  = getFeries(year);
  const weeks   = getWeeksFromDays(vacData);
  const feriesCount = Object.keys(feries).length;

  return `
<div style="font-family:var(--font-mono);padding:4px 0;">
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

  <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;letter-spacing:.05em;">SEMAINES DE VACANCES ${year}</div>

  ${weeks.length === 0
    ? '<div style="font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:12px;">Aucune semaine enregistrée</div>'
    : weeks.map(monday => {
        const fri = new Date(monday+'T12:00:00'); fri.setDate(fri.getDate()+4);
        const label = new Date(monday+'T12:00:00').toLocaleDateString('fr-FR',{day:'2-digit',month:'short'})
          + ' → ' + fri.toLocaleDateString('fr-FR',{day:'2-digit',month:'short'});
        return `<div style="display:flex;align-items:center;justify-content:space-between;
          background:rgba(255,179,0,0.06);border:1px solid rgba(255,179,0,0.2);
          border-radius:6px;padding:7px 10px;margin-bottom:6px;">
          <span style="font-size:12px;color:#ffb300;">🏖 ${label}</span>
          <button onclick="window._vacancesRemoveWeek('${monday}')"
            style="background:none;border:none;color:rgba(255,100,100,0.7);
            font-size:16px;cursor:pointer;padding:0 4px;line-height:1;width:auto;margin:0;">✕</button>
        </div>`;
      }).join('')
  }

  <div style="display:flex;gap:8px;align-items:center;margin-top:8px;">
    <input type="week" id="vacances-week-picker"
      style="flex:1;background:#1a1f2b;color:#fff;border:1px solid rgba(255,179,0,0.3);
      border-radius:6px;padding:7px;font-size:12px;min-width:0;">
    <button onclick="window._vacancesAddWeek()"
      style="background:rgba(255,179,0,0.15);border:1px solid rgba(255,179,0,0.4);
      border-radius:6px;padding:8px 12px;color:#ffb300;font-size:12px;
      cursor:pointer;white-space:nowrap;width:auto;margin:0;">+ Ajouter</button>
  </div>
  <div style="font-size:10px;color:rgba(255,255,255,0.35);margin-top:6px;">
    Sélectionne une semaine et clique Ajouter
  </div>
</div>`;
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
        <button onclick="document.getElementById('vacances-modal').remove()"
          style="background:none;border:none;color:rgba(255,255,255,0.5);font-size:20px;
          cursor:pointer;padding:0;width:auto;margin:0;line-height:1;">✕</button>
      </div>
      <div id="vacances-content">${render()}</div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if(e.target===modal) modal.remove(); });
}

function refresh() {
  const el = document.getElementById('vacances-content');
  if (el) el.innerHTML = render();
}

global._openVacances = open;
global._importFeriesM4 = importFeriesM4;

global._vacancesAddWeek = () => {
  const inp = document.getElementById('vacances-week-picker');
  if (!inp || !inp.value) { return; }
  // inp.value = "2026-W08" → calculer le lundi
  const [y, w] = inp.value.split('-W').map(Number);
  const jan4 = new Date(y, 0, 4);
  const monday = new Date(jan4);
  monday.setDate(jan4.getDate() - (jan4.getDay()||7) + 1 + (w-1)*7);
  addWeek(localDK(monday));
  refresh();
  if (typeof window._fullSync === 'function') window._fullSync();
};

global._vacancesRemoveWeek = (monday) => {
  removeWeek(monday);
  refresh();
  if (typeof window._fullSync === 'function') window._fullSync();
};

})(window);
