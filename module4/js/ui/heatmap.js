/**
 * Heatmap — Calendrier annuel redesigné
 * Affichage par mois avec couleurs de risque et légende claire
 */
(function(global){
'use strict';

class Heatmap {
  constructor(container){ this._container = container; }

  render(state){
    if(!this._container) return;
    // Convertit décimal → h:mm  ex: 8.25 → "8h15",  0.25 → "0h15"
    const fmtH = v => {
      if (!v) return '0h00';
      const h = Math.floor(v);
      const m = Math.round((v - h) * 60);
      return h + 'h' + String(m).padStart(2,'0');
    };
    const scores = state && state.scores;
    const norm   = state && state.norm;
    // Fusionner m1.days + données M2 (pour afficher les HS même si seulement M2 renseigné)
    const m1days = (state && state.raw && state.raw.m1 && state.raw.m1.days) || {};
    const m2raw  = (state && state.raw && state.raw.m2 && state.raw.m2.months) || {};
    const days   = Object.assign({}, ...Object.entries(m2raw).map(([mk, md]) => {
      const out = {};
      Object.entries(md.rawDays || {}).forEach(([d, hs]) => {
        const key = mk + '-' + String(d).padStart(2, '0');
        if (!m1days[key]) {  // M1 prioritaire
          const _s = String(hs).trim();
          const h = _s.includes(':')
            ? (parseFloat(_s.split(':')[0])||0) + (parseFloat(_s.split(':')[1])||0)/60
            : parseFloat(_s.replace(',','.')) || 0;
          if (h > 0) out[key] = { extra: h, recup: 0, absent: 0 };
        }
      });
      return out;
    }), m1days);
    const year   = (state && state.raw && state.raw.year) || new Date().getFullYear();

    const riskLevel = (extra, absent) => {
      if(absent) return 'absent';
      if(extra === undefined) return 'empty';
      if(extra >= 4) return 'crit';
      if(extra >= 2.5) return 'danger';
      if(extra >= 1) return 'warn';
      return 'ok';
    };

    const COLORS = {
      ok:     { bg:'rgba(0,255,204,0.25)',  label:'Journée normale' },
      warn:   { bg:'rgba(255,179,0,0.30)',  label:'+1 à 2.5h HS' },
      danger: { bg:'rgba(255,102,0,0.35)',  label:'+2.5 à 4h HS' },
      crit:   { bg:'rgba(255,34,68,0.45)',  label:'+4h HS et plus' },
      absent: { bg:'rgba(0,200,255,0.08)',  label:'Absence / repos' },
      empty:  { bg:'rgba(0,200,255,0.04)',  label:'Non renseigné' },
    };

    const MONTHS = ['Janv','Févr','Mars','Avr','Mai','Juin','Juil','Août','Sept','Oct','Nov','Déc'];

    // Stats globales
    const allEntries = Object.entries(days);
    const daysHS     = allEntries.filter(([,e]) => !e.absent && e.extra > 0).length;
    const totalHS    = allEntries.reduce((s,[,e]) => s + (e.extra||0), 0);
    const maxExtraDay = allEntries.reduce((m,[d,e]) => e.extra > m.v ? {d, v:e.extra} : m, {d:null,v:0});
    // Jours travaillés = tous les jours ouvrés depuis le 1er janvier jusqu'à aujourd'hui
    // Exclut : jours de repos configurés, absences, fériés M1, vacances module4
    const _restDays = JSON.parse(localStorage.getItem('DTE_REST_DAYS') || '{"sat":true,"sun":true}');
    const _restSet = new Set();
    if (_restDays.sat) _restSet.add(6);
    if (_restDays.sun) _restSet.add(0);
    // Charger fériés et vacances
    const _feries = {};
    const _vacances = {};
    for (const y of [year-1, year, year+1]) {
      try { const sd=JSON.parse(localStorage.getItem('SPECIAL_DAYS_'+y)||'{}'); Object.entries(sd).forEach(([d,t])=>{ if(t==='ferie') _feries[d]=true; }); } catch(_){}
      try { const fd=JSON.parse(localStorage.getItem('DTE_FERIES_'+y)||'{}'); Object.keys(fd).forEach(d=>{ _feries[d]=true; }); } catch(_){}
      try { const vac=JSON.parse(localStorage.getItem('DTE_VACANCES_'+y)||'{}'); Object.keys(vac).forEach(d=>{ _vacances[d]=true; }); } catch(_){}
    }
    const _startYear = new Date(year, 0, 1);
    const _today = new Date(); _today.setHours(0,0,0,0);
    let daysWorked = 0;
    for (let d = new Date(_startYear); d <= _today; d.setDate(d.getDate()+1)) {
      const dow = d.getDay();
      if (_restSet.has(dow)) continue;
      const dk = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
      if (_feries[dk] || _vacances[dk]) continue; // férié ou vacances
      const e = days[dk];
      if (e && e.absent) continue;
      daysWorked++;
    }
    // Calculer depuis totalHS local (inclut M1+M2 mergés) — plus fiable que norm
    const _heatCCN = (typeof CCN_API !== 'undefined')
      ? (CCN_API.getGroupeForCCN(parseInt(localStorage.getItem('CCN_IDCC')||'0')) || {contingent:220})
      : {contingent:220};
    const _heatLimit = _heatCCN.contingent;
    const contingentPct = totalHS > 0 ? (totalHS / _heatLimit) * 100 : (norm ? (norm._contingentPct || 0) : 0);

    // Génération des mois
    const monthsHTML = Array.from({length:12}, (_, m) => {
      const monthKey = `${year}-${String(m+1).padStart(2,'0')}`;
      const daysInMonth = new Date(year, m+1, 0).getDate();
      const firstDow = new Date(year, m, 1).getDay(); // 0=dim

      // Cellules
      let cells = '';
      // Cases vides avant le 1er
      for(let i=0; i<firstDow; i++) cells += `<div></div>`;
      for(let day=1; day<=daysInMonth; day++){
        const dateKey = `${year}-${String(m+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const entry   = days[dateKey];
        const dow     = new Date(year, m, day).getDay();
        const isWE    = dow === 0 || dow === 6;
        const dateObj  = new Date(year, m, day);
        const isPast   = dateObj <= new Date();
        const isFerie  = _feries[dateKey];
        const isVac    = _vacances[dateKey];
        let level, titleTxt;
        if (entry) {
          level    = riskLevel(entry.extra, entry.absent);
          titleTxt = entry.absent ? `J${day} : Absence` : `J${day} : +${entry.extra||0}h HS`;
        } else if (isWE) {
          level    = 'absent';
          titleTxt = `J${day} : Weekend`;
        } else if (isFerie) {
          level    = 'absent';
          titleTxt = `J${day} : Jour férié`;
        } else if (isVac) {
          level    = 'absent';
          titleTxt = `J${day} : Vacances`;
        } else if (isPast && !_restSet.has(dow)) {
          level    = 'ok';  // jour ouvré passé sans HS = journée normale
          titleTxt = `J${day} : Journée normale`;
        } else {
          level    = 'empty';
          titleTxt = `J${day}`;
        }
        const col  = COLORS[level];
        const title = titleTxt;
        cells += `<div title="${title}" style="
          aspect-ratio:1;background:${col.bg};
          border:1px solid ${level==='crit'?'rgba(255,34,68,0.4)':level==='danger'?'rgba(255,102,0,0.3)':'rgba(0,200,255,0.06)'};
          cursor:crosshair;transition:transform .1s;
          ${level==='crit'?'animation:cell-crit 1.5s ease-in-out infinite;':''}
        " onmouseover="this.style.transform='scale(1.6)';this.style.zIndex=10;this.style.position='relative'"
           onmouseout="this.style.transform='';this.style.zIndex=''"></div>`;
      }

      return `<div style="min-width:85px;">
        <div style="font-family:var(--font-mono);font-size:8px;color:var(--text-muted);
          text-align:center;margin-bottom:4px;letter-spacing:.1em;">${MONTHS[m]}</div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px;">
          ${['D','L','M','M','J','V','S'].map(d=>`<div style="font-family:var(--font-mono);font-size:6px;color:var(--text-muted);text-align:center;">${d}</div>`).join('')}
          ${cells}
        </div>
      </div>`;
    }).join('');

    this._container.innerHTML = `
      <!-- Stats rapides -->
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:10px;">
        ${[
          ['JOURS TRAVAILLÉS', daysWorked, 'var(--animus)'],
          ['JOURS AVEC HS',    daysHS,     daysHS>50?'var(--orange)':daysHS>20?'var(--amber)':'var(--sync)'],
          ['TOTAL HS',         fmtH(totalHS), totalHS>_heatLimit?'var(--red)':totalHS>(_heatLimit*0.68)?'var(--orange)':'var(--animus)'],
          ['CONTINGENT',       Math.round(contingentPct)+'%', contingentPct>100?'var(--red)':contingentPct>75?'var(--amber)':'var(--sync)'],
          ['PIC HS/JOUR',      maxExtraDay.v ? '+'+fmtH(maxExtraDay.v) : '—', maxExtraDay.v>=4?'var(--red)':maxExtraDay.v>=2?'var(--amber)':'var(--sync)'],
        ].map(([l,v,col]) => `<div style="background:rgba(0,10,25,.9);border:1px solid rgba(0,200,255,0.1);padding:6px;text-align:center;">
          <div style="font-family:var(--font-hud);font-size:16px;font-weight:700;color:${col};">${v}</div>
          <div style="font-family:var(--font-mono);font-size:7px;color:var(--text-muted);">${l}</div>
        </div>`).join('')}
      </div>

      <!-- Légende -->
      <div style="display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap;align-items:center;
        padding:5px 8px;background:rgba(0,10,25,.6);border:1px solid rgba(0,200,255,0.08);">
        <span style="font-family:var(--font-mono);font-size:7px;color:var(--text-muted);letter-spacing:.1em;">LÉGENDE :</span>
        ${Object.entries(COLORS).map(([k,v]) => `
          <span style="display:flex;align-items:center;gap:4px;font-family:var(--font-mono);font-size:8px;color:var(--text-muted);">
            <span style="width:10px;height:10px;background:${v.bg};border:1px solid rgba(0,200,255,0.2);display:inline-block;"></span>
            ${v.label}
          </span>`).join('')}
      </div>

      <!-- Grille calendrier -->
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
        <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8px;min-width:560px;">
          ${monthsHTML}
        </div>
      </div>`;
  }
}

global.Heatmap = Heatmap;
}(typeof window !== 'undefined' ? window : global));
