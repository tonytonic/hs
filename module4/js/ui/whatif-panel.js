/**
 * WhatIfPanel — Simulation "Et si..." redesignée
 * Affichage narratif par jalons, pas de canvas
 */
(function(global){
'use strict';

class WhatIfPanel {
  constructor(container, simulator, chart){
    this._container = container;
    this._simulator = simulator;
    this._plan = { days:14, hoursPerDay:0, restDays:[0] };
  }

  render(){
    this._container.innerHTML = `
      <!-- COLONNE GAUCHE : contrôles -->
      <div style="display:flex;flex-direction:column;gap:5px;">
        <div class="panel">
          <div class="panel-label">PARAMÈTRES</div>
          <div class="panel-corner-br"></div>

          <div style="margin-bottom:10px;">
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--animus);letter-spacing:.12em;margin-bottom:6px;">HEURES SUPP. / JOUR</div>
            <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:10px;color:var(--text-dim);margin-bottom:4px;">
              <span>0h</span><span id="wi-hs-val" style="color:var(--animus);font-size:14px;font-family:var(--font-hud);">0</span><span>5h</span>
            </div>
            <input type="range" id="wi-hs" min="0" max="5" step="0.5" value="0" style="width:100%;accent-color:var(--animus);">
          </div>

          <div style="margin-bottom:10px;">
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--animus);letter-spacing:.12em;margin-bottom:6px;">HORIZON</div>
            <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:10px;color:var(--text-dim);margin-bottom:4px;">
              <span>7j</span><span id="wi-days-val" style="color:var(--animus);font-size:14px;font-family:var(--font-hud);">14</span><span>90j</span>
            </div>
            <input type="range" id="wi-days" min="7" max="90" step="1" value="14" style="width:100%;accent-color:var(--animus);">
          </div>

          <div style="margin-bottom:10px;">
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--animus);letter-spacing:.12em;margin-bottom:6px;">JOURS DE REPOS</div>
            <div style="display:flex;gap:10px;">
              <label style="display:flex;align-items:center;gap:5px;font-size:10px;color:var(--text-dim);cursor:crosshair;">
                <input type="checkbox" id="wi-sun" checked style="accent-color:var(--animus);"> Dimanche
              </label>
              <label style="display:flex;align-items:center;gap:5px;font-size:10px;color:var(--text-dim);cursor:crosshair;">
                <input type="checkbox" id="wi-sat" style="accent-color:var(--animus);"> Samedi
              </label>
            </div>
          </div>
        </div>

        <!-- PRESETS -->
        <div class="panel">
          <div class="panel-label">SCÉNARIOS RAPIDES</div>
          <div class="panel-corner-br"></div>
          <div style="display:flex;flex-direction:column;gap:4px;">
            ${[
              {hs:0,   days:30, sun:1, sat:1, emoji:'🛡', label:'Récupération',  sub:'0 HS + WE complets'},
              {hs:0,   days:14, sun:1, sat:0, emoji:'⚖', label:'Équilibre',      sub:'35h/sem OMS optimal'},
              {hs:1,   days:14, sun:1, sat:0, emoji:'⚡', label:'Optimisé -1h',  sub:'OCDE productif'},
              {hs:2.5, days:14, sun:1, sat:0, emoji:'📦', label:'Rush projet',   sub:'+2.5h/j, dim off'},
              {hs:4,   days:7,  sun:0, sat:0, emoji:'🔥', label:'Urgence max',   sub:'+4h/j, 7j/7'},
            ].map(p => `
              <button class="wi-preset" data-hs="${p.hs}" data-days="${p.days}" data-sun="${p.sun}" data-sat="${p.sat}"
                style="display:flex;align-items:center;gap:8px;background:rgba(0,10,25,.8);
                border:1px solid rgba(0,200,255,0.1);padding:6px 9px;cursor:crosshair;
                text-align:left;transition:all .15s;width:100%;">
                <span style="font-size:16px;flex-shrink:0;">${p.emoji}</span>
                <div>
                  <div style="font-family:var(--font-hud);font-size:10px;color:var(--text);">${p.label}</div>
                  <div style="font-size:9px;color:var(--text-muted);">${p.sub}</div>
                </div>
              </button>`).join('')}
          </div>
        </div>
      </div>

      <!-- COLONNE DROITE : résultats -->
      <div style="display:flex;flex-direction:column;gap:5px;">
        <div class="panel" style="flex:1;">
          <div class="panel-label">RÉSULTAT DE LA SIMULATION</div>
          <div class="panel-corner-br"></div>
          <div id="wi-result" style="height:100%;"></div>
        </div>
      </div>`;

    this._bindEvents();
    this._simulate();
  }

  _bindEvents(){
    const run = () => this._simulate();
    document.getElementById('wi-hs')?.addEventListener('input', e => {
      this._plan.hoursPerDay = parseFloat(e.target.value);
      document.getElementById('wi-hs-val').textContent = e.target.value;
      run();
    });
    document.getElementById('wi-days')?.addEventListener('input', e => {
      this._plan.days = parseInt(e.target.value);
      document.getElementById('wi-days-val').textContent = e.target.value;
      run();
    });
    document.getElementById('wi-sun')?.addEventListener('change', () => { this._updateRest(); run(); });
    document.getElementById('wi-sat')?.addEventListener('change', () => { this._updateRest(); run(); });
    document.querySelectorAll('.wi-preset').forEach(btn => {
      btn.addEventListener('mouseenter', () => btn.style.borderColor='rgba(0,200,255,0.4)');
      btn.addEventListener('mouseleave', () => btn.style.borderColor='rgba(0,200,255,0.1)');
      btn.addEventListener('click', () => {
        const hs = parseFloat(btn.dataset.hs), days = parseInt(btn.dataset.days);
        document.getElementById('wi-hs').value    = hs;
        document.getElementById('wi-hs-val').textContent = hs;
        document.getElementById('wi-days').value  = days;
        document.getElementById('wi-days-val').textContent = days;
        document.getElementById('wi-sun').checked = btn.dataset.sun === '1';
        document.getElementById('wi-sat').checked = btn.dataset.sat === '1';
        this._plan = { days, hoursPerDay: hs, restDays:[] };
        this._updateRest(); run();
      });
    });
  }

  _updateRest(){
    const rest = [];
    if(document.getElementById('wi-sun')?.checked) rest.push(0);
    if(document.getElementById('wi-sat')?.checked) rest.push(6);
    this._plan.restDays = rest;
  }

  _simulate(){
    const el = document.getElementById('wi-result');
    if(!el) return;
    let result = null;
    try { result = this._simulator.run(this._plan); } catch(e){ console.warn('[WhatIf]',e); }
    if(!result){ el.innerHTML='<div style="color:var(--text-muted);font-size:10px;font-family:var(--font-mono);padding:var(--gap);">Saisissez vos heures dans M1 pour activer la simulation.</div>'; return; }

    const s = result.summary;
    const tl = result.timeline;
    const c  = v => v>=80?'#ff2244':v>=60?'#ff6600':v>=35?'#ffb300':'#00ffcc';
    const ph = s.finalPhase || {id:1,label:'ADAPTATION',color:'#00ffcc',desc:'',symptoms:[]};
    const weeklyH = this._plan.hoursPerDay * 5 + 35;
    const omsLabel = weeklyH>=55?`⚠ ${weeklyH}h/sem — RR=1.35 AVC (OMS 2021)`:
                     weeklyH>=52?`⚠ ${weeklyH}h/sem — modifications cérébrales (OEM 2025)`:
                     weeklyH>=50?`⚠ ${weeklyH}h/sem — productivité nulle (Pencavel)`:
                     weeklyH>=48?`→ ${weeklyH}h/sem — dépasse le légal 48h (Art. L3121-20)`:
                     weeklyH>40 ?`⚠ ${weeklyH}h/sem — vigilance OCDE (>40h)`:
                     `✓ ${weeklyH}h/sem — zone OMS optimale (≤40h)`;

    // Jalons clés
    const milestones = [7,14,21,30,60,90].filter(d=>d<=this._plan.days);
    if(!milestones.includes(this._plan.days)) milestones.push(this._plan.days);

    const trendMsg = s.finalFatigue < 30 ? '😊 Vous restez en bonne santé sur cette période.'
                   : s.finalFatigue < 50 ? '⚠️ Fatigue modérée qui s\'accumule progressivement.'
                   : s.finalFatigue < 70 ? '🔶 Surmenage probable. Réduire les HS recommandé.'
                   : '🔴 Risque élevé. Repos nécessaire d\'urgence.';

    el.innerHTML = `
      <div style="padding:14px;background:rgba(0,10,25,.9);border-left:3px solid ${c(s.finalFatigue)};margin-bottom:10px;">
        <div style="font-size:14px;font-weight:600;color:#fff;margin-bottom:5px;">${trendMsg}</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.7);">
          Après <b>${this._plan.days} jours</b> à <b>${weeklyH}h/sem</b> :
          fatigue estimée <b style="color:${c(s.finalFatigue)}">${s.finalFatigue}%</b>
          — Phase <b style="color:${ph.color}">P${ph.id} ${ph.label}</b>
        </div>
        <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:5px;">${omsLabel}</div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:10px;">
        <div style="padding:10px;background:rgba(0,10,25,.8);border:1px solid ${c(s.avgFatigue)}30;text-align:center;cursor:pointer;"
          onclick="window._showScoreDetail&&window._showScoreDetail('fatigue')">
          <div style="font-size:22px;font-weight:700;color:${c(s.avgFatigue)};">${s.avgFatigue}%</div>
          <div style="font-size:11px;color:#fff;margin-top:2px;">Fatigue moy.</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.5);">sur la période ›</div>
        </div>
        <div style="padding:10px;background:rgba(0,10,25,.8);border:1px solid ${c(100-s.avgPerformance)}30;text-align:center;cursor:pointer;"
          onclick="window._showScoreDetail&&window._showScoreDetail('performance')">
          <div style="font-size:22px;font-weight:700;color:${c(100-s.avgPerformance)};">${s.avgPerformance}%</div>
          <div style="font-size:11px;color:#fff;margin-top:2px;">Performance</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.5);">efficacité moy. ›</div>
        </div>
        <div style="padding:10px;background:rgba(0,10,25,.8);border:1px solid ${s.daysAlert>0?'#ffb300':'#00ffcc'}30;text-align:center;cursor:pointer;"
          onclick="window._showScoreDetail&&window._showScoreDetail('recovery')">
          <div style="font-size:22px;font-weight:700;color:${s.daysAlert>0?'#ffb300':'#00ffcc'};">${s.daysAlert}</div>
          <div style="font-size:11px;color:#fff;margin-top:2px;">Jours alerte</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.5);">sur ${this._plan.days}j ›</div>
        </div>
      </div>

            <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:6px;">Évolution de la fatigue semaine par semaine :</div>
      <div style="display:flex;gap:4px;align-items:flex-end;height:56px;margin-bottom:6px;">
        ${Array.from({length:Math.min(8,Math.ceil(tl.length/7))},(_,w)=>{
          const wd=tl.slice(w*7,(w+1)*7);
          const af=Math.round(wd.reduce((s,d)=>s+d.fatigue,0)/wd.length);
          const col2=c(af);
          return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:1px;">
            <div style="font-size:9px;color:${col2};font-weight:600;">${af}%</div>
            <div style="width:100%;background:${col2};height:${Math.max(4,af*.4)}px;border-radius:1px;"></div>
            <div style="font-size:9px;color:rgba(255,255,255,0.4);">S${w+1}</div>
          </div>`;
        }).join('')}
      </div>
      <div style="font-size:10px;color:rgba(255,255,255,0.35);">🟢 vert = OK &nbsp;·&nbsp; 🟡 orange = vigilance &nbsp;·&nbsp; 🔴 rouge = alerte</div>`;
  }
}

global.WhatIfPanel = WhatIfPanel;
}(typeof window !== 'undefined' ? window : global));
