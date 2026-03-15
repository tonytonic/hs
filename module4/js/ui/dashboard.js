/**
 * Dashboard — Rendu principal du tableau de bord
 */
(function(global){
'use strict';

class Dashboard {
  constructor(){}

  render(state, risks, advice){
    // Pas de données M1 → bandeau info
    const noData = state && state.scores && !state.scores._hasData;
    const noDataBanner = document.getElementById('no-data-banner');
    if(noDataBanner) noDataBanner.remove();
        if(!state||!state.scores) return;
    const {scores, norm, raw}=state;
    this._renderHero(scores, norm, raw);
    this._renderScores(scores);
    this._renderRisks(risks||[]);
    this._renderAdvice(advice||[]);
    this._renderRadar(scores, norm);
    this._updateFooter(scores, norm, raw);
  }

  _renderHero(scores, norm, raw){
    const D=window.DTE&&window.DTE.engine?window.DTE.engine.getDefaults():{CONTINGENT_MAX:220,SEUIL_ALERTE:75};
    const el=document.getElementById('score-global-value');
    if(!el) return;
    // Pas de données → afficher "--" et pas CRITIQUE
    const hasData = scores && scores._hasData;
    const sg = hasData ? (window.DTE&&window.DTE.app ? window.DTE.app.scoreGlobal : this._calcGlobal(scores)) : null;
    el.textContent = sg !== null ? sg : '--';
    const levelMap={EXCELLENT:'excellent',BON:'bon',MOYEN:'moyen',FAIBLE:'faible',CRITIQUE:'critique'};
    const level = sg === null ? 'EN ATTENTE' : sg>=80?'EXCELLENT':sg>=60?'BON':sg>=40?'MOYEN':sg>=20?'FAIBLE':'CRITIQUE';
    const lel=document.getElementById('hero-level');
    if(lel){
      lel.textContent=level;
      lel.className='hero-level '+(levelMap[level]||'bon');
      if(sg===null){ lel.style.color='var(--text-muted)'; lel.style.borderColor='var(--text-muted)'; lel.style.background='transparent'; }
    }
    const mel=document.getElementById('marge-securite');
    if(mel){
      if(!hasData){ mel.textContent='—'; mel.style.color='var(--text-muted)'; }
      else { const m=(D.SEUIL_ALERTE||75)-(scores.fatigue||0); mel.textContent=(m>0?'+':'')+m; mel.style.color=m>0?'var(--sync)':m>-10?'var(--amber)':'var(--red)'; }
    }
    // Bars
    const container=document.querySelector('.panel--hero');
    if(container){
      const old=container.querySelector('.hero-bars');
      if(old) old.remove();
      const hasDat = scores._hasData;
      const fatV   = scores.fatigue || 0;
      const perfV  = scores.performance || 0;
      const strV   = scores.stress || 0;
      const fatLbl = fatV<35?'Vous êtes en forme':fatV<60?'Fatigue modérée':fatV<80?'Surmenage':' Épuisement critique';
      const perfLbl= perfV>80?'Très efficace':perfV>60?'Efficacité correcte':perfV>40?'Baisse de performance':'Efficacité très réduite';
      const strLbl = strV<30?'Peu stressé':strV<60?'Stress modéré':strV<80?'Stress élevé':'Stress critique';
      const barHtml=`<div class="hero-bars" style="margin-top:auto;">
        ${!hasDat ? `<div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:12px;line-height:1.7;">
            📋 Saisissez des heures dans<br><b style="color:#fff">M1 (Suivi annuel)</b><br>pour activer l'analyse complète.
          </div>` :
          [
            ['🧠 Fatigue','fatigue','red', fatV, fatLbl],
            ['⚡ Performance','performance','cyan', perfV, perfLbl],
            ['💊 Stress','stress','amber', strV, strLbl],
          ].map(([l,k,col,v,desc])=>`
            <div style="margin-top:10px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                <span style="font-size:11px;color:#fff;">${l}</span>
                <span style="font-size:12px;font-weight:700;color:var(--${col});">${v}%</span>
              </div>
              <div class="hero-bar"><div class="hero-bar-fill" style="width:${v}%;background:var(--${col});box-shadow:0 0 6px var(--${col})40;"></div></div>
              <div style="font-size:10px;color:rgba(255,255,255,0.55);margin-top:2px;">${desc}</div>
            </div>`).join('')
          }
      </div>`;
      container.insertAdjacentHTML('beforeend',barHtml);
    }
  }

  _calcGlobal(scores){
    return Math.max(0,Math.min(100,scores.performance-Math.floor(scores.fatigue*.3)));
  }

  _renderScores(scores){
    const el=document.getElementById('scores-grid');
    if(!el) return;
    
  // Décomposition de chaque score : facteur heures vs rythme de vie
  const SCORE_META = {
    fatigue: {
      titre: 'FATIGUE',
      desc: 'Votre niveau d\'épuisement cumulé, calculé selon INRS et J.Occup.Health 2021.',
      source: 'INRS · J.Occup.Health 2021 (Taiwan, 6 mois) · Thompson 2022',
      facteurs_heures: [
        { label:'Heures supplémentaires/sem', key:'_avgExtra7', fmt: v => v>0 ? '+'+v.toFixed(1)+'h/j × 0.09' : '0h supp.' },
        { label:'Jours consécutifs',          key:'_consec',    fmt: v => v+'j consécutifs' },
        { label:'Semaines de surcharge',       key:'_cumulWeeks',fmt: v => v>0 ? v+' sem. cumulées (×'+( v>=24?'1.55':v>=16?'1.40':v>=8?'1.25':v>=4?'1.12':'1.00')+')' : 'Pas de cumul' },
      ],
      facteurs_vie: [
        { label:'Sommeil (check-in)',   key:'ci_sleep',  fmt: v => v!==undefined ? ['< 4h','4-5h','6h','7h','8h+'][v]||'—' : 'Non renseigné' },
        { label:'Énergie (check-in)',   key:'ci_energy', fmt: v => v!==undefined ? ['Épuisé','Fatigué','Neutre','Énergique','Excellent'][v]||'—' : 'Non renseigné' },
        { label:'Douleurs (check-in)',  key:'ci_pain',   fmt: v => v!==undefined ? ['Aucune','Légère','Modérée','Forte','Intense'][v]||'—' : 'Non renseigné' },
      ],
      seuils: [
        { pct:35, label:'Phase EN FORME',   color:'#00ccaa' },
        { pct:60, label:'Phase VIGILANCE',  color:'#c89a18' },
        { pct:80, label:'Phase SURMENAGE',  color:'#c8601a' },
        { pct:100,label:'Phase ÉPUISEMENT', color:'#c82838' },
      ],
    },
    stress: {
      titre: 'STRESS / CORTISOL',
      desc: 'Niveau de tension nerveuse et de cortisol estimé. Thompson 2022 : le cortisol monte +14% dès la 1ère nuit courte.',
      source: 'Thompson 2022 (Frontiers) · ANACT/INRS · ANI 2008',
      facteurs_heures: [
        { label:'Heures hebdo vs optimal', key:'_recentWeeklyH', fmt: v => v.toFixed(0)+'h/sem (optimal : 35h)' },
        { label:'Variabilité des horaires', key:'_sigma',         fmt: v => v>3?'Élevée ('+v.toFixed(1)+'h écart-type)':'Faible ('+v.toFixed(1)+'h)' },
        { label:'Durée d\'exposition',     key:'_cumulWeeks',   fmt: v => v>0 ? v+' semaines de surcharge' : 'Première semaine' },
      ],
      facteurs_vie: [
        { label:'Stress ressenti (check-in)',     key:'ci_stress', fmt: v => v!==undefined ? ['Aucun','Léger','Modéré','Élevé','Critique'][v]||'—' : 'Non renseigné' },
        { label:'Motivation (check-in)',          key:'ci_motiv',  fmt: v => v!==undefined ? ['Inexistante','Basse','Normale','Bonne','Maximale'][v]||'—' : 'Non renseigné' },
      ],
      seuils: [
        { pct:30, label:'Stress faible', color:'#00ccaa' },
        { pct:60, label:'Stress modéré', color:'#c89a18' },
        { pct:80, label:'Stress élevé',  color:'#c8601a' },
        { pct:100,label:'Critique',      color:'#c82838' },
      ],
    },
    performance: {
      titre: 'PERFORMANCE',
      desc: 'Votre efficacité estimée. Pencavel/Stanford 2014 : chute après 50h/sem, falaise à 55h.',
      source: 'Pencavel 2014 (Stanford) · OEM 2025 (Jang) · Nature 2025 (Fan)',
      facteurs_heures: [
        { label:'Heures hebdo (courbe Pencavel)', key:'_recentWeeklyH', fmt: v => v.toFixed(0)+'h/sem — perf. Pencavel '+( v<=35?'100%':v<=40?'~99%':v<=48?'~82%':v<=50?'~80%':v<=55?'~60%':'~52%' ) },
        { label:'Risque cognitif (≥52h)', key:'_recentWeeklyH', fmt: v => v>=52?'Actif : +19% gyrus frontal (OEM 2025)':'Non actif (<52h)' },
      ],
      facteurs_vie: [
        { label:'Énergie (check-in)',    key:'ci_energy', fmt: v => v!==undefined ? ['Épuisé','Fatigué','Neutre','Énergique','Excellent'][v]||'—' : 'Non renseigné' },
        { label:'Motivation (check-in)', key:'ci_motiv',  fmt: v => v!==undefined ? ['Inexistante','Basse','Normale','Bonne','Maximale'][v]||'—' : 'Non renseigné (impact +12%)' },
        { label:'Sommeil',               key:'ci_sleep',  fmt: v => v!==undefined ? ['< 4h → −18% perf.','4-5h → −10% perf.','6h → −5% perf.','7h → OK','8h+ → +2% perf.'][v]||'—' : 'Non renseigné' },
      ],
      seuils: [
        { pct:60, label:'Efficace',       color:'#00ccaa' },
        { pct:45, label:'Réduite',        color:'#c89a18' },
        { pct:25, label:'Très réduite',   color:'#c8601a' },
        { pct:0,  label:'Critique',       color:'#c82838' },
      ],
    },
    cvRisk: {
      titre: 'RISQUE CARDIOVASCULAIRE',
      desc: 'Risque relatif d\'AVC et cardiopathie basé sur OMS/OIT 2021. S\'accumule avec la durée d\'exposition.',
      source: 'OMS/OIT 2021 (Pega et al.) · Lancet 2021 (Ervasti) · Kivimäki 2015',
      facteurs_heures: [
        { label:'Heures hebdo vs seuil OMS (48h)', key:'_recentWeeklyH', fmt: v => v>=55?'≥55h : RR=1.35 AVC, RR=1.17 cardio':v>=48?v.toFixed(0)+'h : au-delà du légal (48h)':'Dans les normes (<48h)' },
        { label:'Durée d\'exposition (dose-temps)', key:'_cumulMonths', fmt: v => v>0 ? v.toFixed(1)+' mois cumulés (risque ×'+Math.min(1.8,(1+v*0.08)).toFixed(2)+')' : 'Court terme (<1 mois)' },
      ],
      facteurs_vie: [
        { label:'Sport régulier',    key:'ci_motiv', fmt: v => 'Non mesuré dans le check-in' },
        { label:'Note',              key:'_note',    fmt: v => 'Le risque cvRisk est biologique, pas atténuable par le ressenti' },
      ],
      seuils: [
        { pct:8,  label:'Faible',   color:'#00ccaa' },
        { pct:20, label:'Modéré',   color:'#c89a18' },
        { pct:40, label:'Élevé',    color:'#c8601a' },
        { pct:100,label:'Critique', color:'#c82838' },
      ],
    },
    cogRisk: {
      titre: 'RISQUE CÉRÉBRAL',
      desc: 'Modifications structurelles cérébrales détectées par IRM à ≥52h/sem (Jang/Yonsei 2025). 17 régions affectées.',
      source: 'OEM 2025 — Jang W. et al., Yonsei University',
      facteurs_heures: [
        { label:'Seuil ≥52h/sem', key:'_recentWeeklyH', fmt: v => v>=52?'Actif : '+v.toFixed(0)+'h/sem':'Sous le seuil ('+v.toFixed(0)+'h < 52h)' },
        { label:'Durée exposition', key:'_cumulWeeks',   fmt: v => v>0 ? v+' sem. → risque ×'+Math.min(2.0,(1+v*0.05)).toFixed(2) : 'Sous le seuil' },
      ],
      facteurs_vie: [
        { label:'Sommeil (protecteur)', key:'ci_sleep', fmt: v => v!==undefined && v>=3 ? 'Bon sommeil — facteur protecteur' : v!==undefined ? 'Sommeil insuffisant — facteur aggravant' : 'Non mesuré' },
      ],
      seuils: [
        { pct:10, label:'Sous le seuil',    color:'#00ccaa' },
        { pct:25, label:'Émergent',         color:'#c89a18' },
        { pct:50, label:'Significatif',     color:'#c8601a' },
        { pct:100,label:'Élevé',            color:'#c82838' },
      ],
    },
    recovery: {
      titre: 'RÉCUPÉRATION',
      desc: 'Capacité à récupérer. Diminue avec l\'accumulation. Sonnentag 2003 : le détachement psychologique est clé.',
      source: 'INRS · Sonnentag 2003 (J.Applied Psychology) · Nature 2025 (Fan)',
      facteurs_heures: [
        { label:'Fatigue accumulée',    key:'_cumulWeeks', fmt: v => v>0 ? 'Réduite : '+v+' sem. de surcharge' : 'Normale : pas de surcharge' },
        { label:'Base de récupération', key:'_recentWeeklyH', fmt: v => v>48?'Faible (>48h/sem)':v>40?'Moyenne (40-48h)':'Bonne (≤40h)' },
      ],
      facteurs_vie: [
        { label:'Sommeil (check-in)',  key:'ci_sleep',  fmt: v => v!==undefined ? ['Très perturbé','Perturbé','Moyen','Bon','Excellent'][v]||'—' : 'Non renseigné' },
        { label:'Énergie (check-in)', key:'ci_energy', fmt: v => v!==undefined ? ['Épuisé','Fatigué','Neutre','Énergique','Excellent'][v]||'—' : 'Non renseigné' },
      ],
      seuils: [
        { pct:60, label:'Bonne récup.',   color:'#00ccaa' },
        { pct:40, label:'Faible',         color:'#c89a18' },
        { pct:20, label:'Très faible',    color:'#c8601a' },
        { pct:0,  label:'Épuisée',        color:'#c82838' },
      ],
    },
  };

    const colFn=(inv)=>inv
      ? v=>v<40?'var(--red)':v<60?'var(--orange)':v<80?'var(--amber)':'var(--sync)'
      : v=>v>=80?'var(--red)':v>=60?'var(--orange)':v>=35?'var(--amber)':'var(--sync)';
    const defs=[
      {key:'fatigue',    label:'FATIGUE',       sub:'Niveau d\'épuisement', inv:false},
      {key:'stress',     label:'STRESS',        sub:'Cortisol & tension',   inv:false},
      {key:'performance',label:'PERFORMANCE',   sub:'Efficacité au travail', inv:true},
      {key:'cvRisk',     label:'CŒUR',          sub:'Risque cardio OMS',    inv:false},
      {key:'cogRisk',    label:'CERVEAU',        sub:'Risque cérébral OEM',  inv:false},
      {key:'recovery',   label:'RÉCUPÉRATION',  sub:'Capacité de récup.',   inv:true},
    ];
    el.innerHTML=defs.map(d=>{
      const v=Math.round(scores[d.key])||0;
      const c=colFn(d.inv)(v);
      return `<div class="score-card" style="cursor:pointer;transition:border-color .15s;"
        onclick="window._showScoreDetail('${d.key}')"
        onmouseover="this.style.borderColor='rgba(0,200,255,0.4)'"
        onmouseout="this.style.borderColor=''">
        <div class="score-card-label">${d.label}</div>
        <div class="score-card-val" style="color:${c};">${v}</div>
        <div class="score-card-bar"><div class="score-card-bar-fill" style="width:${v}%;background:${c};"></div></div>
        <div class="score-card-sub">${d.sub}</div>
        <div style="font-size:9px;color:rgba(255,255,255,0.3);margin-top:2px;">Toucher pour détails ›</div>
      </div>`;
    }).join('');

    // Exposer la fonction d'ouverture du détail
    window._showScoreDetail = (key) => {
      const meta = SCORE_META[key];
      if(!meta) return;
      const state = window.DTE && window.DTE._state;
      const norm  = state && state.norm;
      const scores2 = state && state.scores;
      // Lire le dernier check-in
      let ci = {};
      try {
        const hist = JSON.parse(localStorage.getItem('DTE_CHECKIN_HISTORY')||'[]');
        const today = new Date().toISOString().slice(0,10);
        ci = hist.find(h=>h.date===today) || hist[hist.length-1] || {};
      } catch(_) {}

      // Lire le profil rythme de vie
      let ls = {};
      try { ls = JSON.parse(localStorage.getItem('DTE_LIFESTYLE')||'{}'); } catch(_) {}
      const lsLabels = {
        sport:        ['Jamais','1×/sem','2-3×/sem','4×+'],
        nutrition:    ['Mal équilibrée','Passable','Équilibrée','Très soignée'],
        sleep_quality:['Très mal','Mal','Correct','Très bien'],
        sens:         ['Aucun sens','Peu','Moyennement','Très motivant'],
        social:       ['Isolé(e)','Peu de soutien','Correct','Très entouré(e)'],
        stress_extra: ['Calme','Peu','Modéré','Intense'],
        pauses:       ['Jamais','1 pause','Régulières','+ déconnexion'],
        ecrans_soir:  ['Jusqu\'au coucher','Parfois','Rarement','Arrêt 1h avant'],
      };
      // Boosts actuels
      const lsBoosts = (typeof LifestylePanel !== 'undefined') ? LifestylePanel.getBoosts() : {};
      const normVal = (k) => {
        if(k.startsWith('ci_')) return ci[k.replace('ci_','')];
        if(k==='_cumulMonths') return norm ? (norm._cumulWeeks||0)/4.33 : 0;
        return norm ? norm[k] : 0;
      };

      const v = (scores2 && scores2[key]) || 0;
      const colFn2 = (key==='performance'||key==='recovery')
        ? v=>v<40?'#c82838':v<60?'#c8601a':v<80?'#c89a18':'#00ccaa'
        : v=>v>=80?'#c82838':v>=60?'#c8601a':v>=35?'#c89a18':'#00ccaa';
      const col = colFn2(v);

      let modal = document.getElementById('score-detail-modal');
      if(!modal){
        modal = document.createElement('div');
        modal.id = 'score-detail-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
      }
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-box" style="max-width:520px;max-height:85vh;">
          <div class="modal-header">
            <h2 style="font-size:14px;">${meta.titre}</h2>
            <span class="modal-close" onclick="document.getElementById('score-detail-modal').classList.add('hidden')">✕</span>
          </div>

          <!-- Score central -->
          <div style="text-align:center;padding:16px 0 12px;">
            <div style="font-size:52px;font-weight:900;color:${col};font-family:var(--font-hud);">${v}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:4px;">${meta.desc}</div>
          </div>

          <!-- Deux colonnes -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
            <!-- Colonne gauche : Facteur HEURES -->
            <div style="background:rgba(0,200,255,0.06);border:1px solid rgba(0,200,255,0.2);padding:10px;">
              <div style="font-size:10px;font-family:var(--font-mono);color:var(--animus);
                letter-spacing:.1em;margin-bottom:8px;">⏱ FACTEUR HEURES</div>
              ${meta.facteurs_heures.map(f=>`
                <div style="margin-bottom:7px;">
                  <div style="font-size:10px;color:rgba(255,255,255,0.5);">${f.label}</div>
                  <div style="font-size:12px;color:#fff;font-weight:600;margin-top:1px;">${f.fmt(normVal(f.key))}</div>
                </div>`).join('')}
            </div>
            <!-- Colonne droite : Facteur RYTHME DE VIE -->
            <div style="background:rgba(0,255,204,0.05);border:1px solid rgba(0,255,204,0.2);padding:10px;">
              <div style="font-size:10px;font-family:var(--font-mono);color:var(--sync);
                letter-spacing:.1em;margin-bottom:8px;">🌿 RYTHME DE VIE</div>
              ${meta.facteurs_vie.map(f=>`
                <div style="margin-bottom:7px;">
                  <div style="font-size:10px;color:rgba(255,255,255,0.5);">${f.label}</div>
                  <div style="font-size:12px;color:#fff;font-weight:600;margin-top:1px;">${f.fmt(normVal(f.key))}</div>
                </div>`).join('')}
              <div style="font-size:9px;color:rgba(255,255,255,0.3);margin-top:8px;padding-top:6px;
                border-top:1px solid rgba(255,255,255,0.08);">
                Faire un check-in quotidien améliore la précision
              </div>

              ${(()=>{
                const lsNames = {sport:'Sport',nutrition:'Alimentation',sleep_quality:'Sommeil habituel',sens:'Sens au travail',stress_extra:'Stress extérieur'};
                if(Object.keys(ls).length >= 4){
                  const items = ['sport','nutrition','sleep_quality','sens','stress_extra']
                    .filter(k=>ls[k]!==undefined)
                    .map(k=>'<div style="margin-bottom:4px;"><div style="font-size:9px;color:rgba(255,255,255,0.4);">'+(lsNames[k]||k)+'</div><div style="font-size:11px;color:#fff;font-weight:600;">'+((lsLabels[k]||[])[ls[k]]||'—')+'</div></div>')
                    .join('');
                  return '<div style="margin-top:8px;padding-top:6px;border-top:1px solid rgba(0,255,204,0.15);"><div style="font-size:9px;color:#00ccaa;letter-spacing:.08em;margin-bottom:5px;">🌿 PROFIL VIE</div>'+items+'</div>';
                }
                return '<div style="margin-top:8px;padding-top:6px;border-top:1px solid rgba(0,255,204,0.15);font-size:9px;color:rgba(255,255,255,0.35);">Complétez <b style=\"color:#00ccaa\">🌿 Rythme de vie</b> pour voir l\'impact.</div>';
              })()}
            </div>
          </div>

          <!-- Source -->
          <div style="font-size:10px;color:rgba(255,255,255,0.35);padding:6px 0;font-style:italic;">
            📚 ${meta.source}
          </div>
        </div>`;
      modal.querySelector('.modal-overlay').addEventListener('click',()=>modal.classList.add('hidden'));
      modal.classList.remove('hidden');
    };
  }

  _renderRisks(risks){
    const el=document.getElementById('risks-list');
    if(!el) return;
    if(!risks.length){
      el.innerHTML=`<div class="risk-empty">✅ Aucun risque détecté</div>`; return;
    }
    el.innerHTML=risks.map(r=>`
      <div class="risk-item ${r.level} anim-fade">
        <div class="risk-emoji">${r.emoji}</div>
        <div class="risk-body">
          <div class="risk-title">${r.titre}</div>
          <div class="risk-msg">${r.message}</div>
          <div class="risk-article">${r.article}</div>
        </div>
      </div>`).join('');
  }

  _renderAdvice(advice){
    const el=document.getElementById('advice-list');
    if(!el) return;
    const borderCol = t => t==='danger'?'#c83040':t==='warning'?'#b88a18':t==='success'?'#00aa88':'#2090b8';
    el.innerHTML = advice.length ? advice.map(a=>`
      <div class="advice-item anim-fade" style="
        padding:10px 12px;margin-bottom:6px;
        border-left:3px solid ${borderCol(a.type||'info')};
        background:rgba(0,10,25,.88);cursor:pointer;"
        onclick="this.querySelector('.advice-detail').style.display=this.querySelector('.advice-detail').style.display==='none'?'block':'none'">
        <div style="display:flex;align-items:flex-start;gap:8px;">
          <span style="font-size:15px;flex-shrink:0;">${a.emoji||'💡'}</span>
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:600;color:#ffffff;margin-bottom:3px;">
              ${a.titre||a.title||'Conseil'}
            </div>
            <div style="font-size:12px;color:rgba(255,255,255,0.80);line-height:1.55;">
              ${a.message||a.msg||''}
            </div>
            <div class="advice-detail" style="display:none;margin-top:6px;padding-top:6px;
              border-top:1px solid rgba(255,255,255,0.08);">
              ${(a.source)?`<div style="font-size:10px;color:rgba(255,255,255,0.45);font-style:italic;">
                📚 Source : ${a.source}</div>`:''}
            </div>
            <div style="font-size:9px;color:rgba(255,255,255,0.30);margin-top:4px;">
              Toucher pour ${a.source?'voir la source':'plus d\'info'}
            </div>
          </div>
        </div>
      </div>`).join('') :
      '<div style="padding:14px;font-size:12px;color:rgba(255,255,255,0.6);text-align:center;">📋 Saisissez des heures dans <b style="color:#fff">M1</b> pour activer les recommandations personnalisées.</div>';
  }

  _renderRadar(scores, norm){
    const canvas=document.getElementById('radar-canvas');
    if(!canvas||!window.DTE||!window.DTE.radar) return;
    const D=window.DTE.engine?window.DTE.engine.getDefaults():{CONTINGENT_MAX:220};
    const axes=[
      {label:'Durée/jour',  value:7+(norm._avgExtra7||0), max:10, warn:8},
      {label:'Hebdoma.', value:35+(norm._avgExtra7||0)*5, max:48, warn:44},
      {label:'Consécutifs', value:norm._consec||0,        max:6,  warn:5},
      {label:'Contingent',  value:norm._contingentPct||0, max:100,warn:75},
      {label:'Repos quoti.',value:Math.max(0,11-((norm._avgExtra7||0)*.5)),max:11,warn:9,invert:true},
      {label:'Fatigue',     value:scores.fatigue,         max:100,warn:75},
    ];
    window.DTE.radar.render(axes);
    const leg=document.querySelector('.radar-legend');
    if(leg) leg.innerHTML=axes.map(a=>{
      const pct=a.value/a.max;
      const c=pct>a.warn/a.max?(pct>.9?'#f5355d':'#f5a623'):'#00d7f0';
      return `<span class="radar-legend-item"><span class="radar-legend-dot" style="background:${c};"></span>${a.label}</span>`;
    }).join('');
  }

  _updateFooter(scores, norm, raw){
    const year=raw&&raw.year?raw.year:new Date().getFullYear();
    const el=document.getElementById('footer-year'); if(el) el.textContent='Année '+year;
    const ts=document.getElementById('footer-timestamp'); if(ts) ts.textContent='Analyse : '+new Date().toLocaleTimeString('fr-FR');
    const cont=document.getElementById('footer-contingent'); if(cont) cont.textContent=`Contingent : ${raw&&raw.m1?Math.round(raw.m1.totalExtra):0}/220h`;
    const st=document.getElementById('footer-status');
    if(st){
      if(scores.fatigue>=95){st.textContent='● DANGER CRITIQUE';st.className='status-danger';}
      else if(scores.fatigue>=75){st.textContent='● VIGILANCE';st.className='status-warn';}
      else{st.textContent='● OPÉRATIONNEL';st.className='status-ok';}
    }
  }
}

global.Dashboard=Dashboard;
}(typeof window!=='undefined'?window:global));