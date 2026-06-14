/**
 * Dashboard — Rendu principal du tableau de bord
 */
(function(global){
'use strict';

class Dashboard {
  constructor(){}

  render(state, risks, advice){
    this._lastRisks = risks || []; // mémorisé pour _renderHero (score global stable)
    // Pas de données M1/M2 → bandeau info
    const noData = state && state.scores && !state.scores._hasData;
    const noDataBanner = document.getElementById('no-data-banner');
    if(noDataBanner) noDataBanner.remove();
    if(noData) {
      const banner = document.createElement('div');
      banner.id = 'no-data-banner';
      banner.style.cssText = 'margin:16px;padding:14px 16px;background:rgba(0,200,255,0.07);border:1px solid rgba(0,200,255,0.2);border-left:3px solid rgba(0,200,255,0.6);border-radius:10px;font-size:13px;color:rgba(255,255,255,0.75);line-height:1.6;';
      banner.innerHTML = '<b style="color:#00c8ff;">👆 Pour voir ton analyse</b><br>Commence par saisir des heures dans le <b>Compteur annuel (M1)</b> ou le <b>Simulateur mensuel (M2)</b>. Ce module lit automatiquement tes données.';
      const main = document.querySelector('.dashboard-main') || document.querySelector('.view.active') || document.body;
      main.prepend(banner);
    }
        if(!state||!state.scores) return;
    const {scores, norm, raw}=state;
    this._renderHero(scores, norm, raw, risks||[]);
    this._renderScores(scores);
    this._renderCommuteActivation(scores);
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
    // CORRECTIF : formule unique identique à app.js (avec pénalités risques).
    // Avant : DTE.app.scoreGlobal (défini après sync) vs _calcGlobal (sans pénalités)
    // → score sautait de 41 à l'ouverture à 35 après sync.
    // Maintenant : risks est passé depuis render(), même formule dès le premier affichage.
    const _risks = this._lastRisks || [];
    const sg = hasData ? (() => {
      const worst = Math.max(scores.fatigue||0, scores.stress||0, scores.cogRisk||0);
      const base  = Math.max(0, 100 - worst);
      const dangers = _risks.filter(x => x.level === 'CRITIQUE').length;
      const alertes = _risks.filter(x => x.level !== 'CRITIQUE').length;
      return Math.max(0, Math.min(99, Math.round(base - dangers*5 - alertes*2)));
    })() : null;
    el.textContent = sg !== null ? sg : '--';
    const levelMap={EXCELLENT:'excellent',BON:'bon',MOYEN:'moyen',FAIBLE:'faible',CRITIQUE:'critique'};
    const level = sg === null ? 'En attente de données' : sg>=80?'EXCELLENT':sg>=60?'BON':sg>=40?'MOYEN':sg>=20?'FAIBLE':'CRITIQUE';
    const lel=document.getElementById('hero-level');
    if(lel){
      lel.textContent=level;
      lel.className='hero-level '+(levelMap[level]||'bon');
      if(sg===null){ lel.style.color='var(--text-muted)'; lel.style.borderColor='var(--text-muted)'; lel.style.background='transparent'; }
    }
    // Indicateur "mise à jour ce soir" avec décompte — inséré dans le panel hero
    const _now = new Date();
    const _h = _now.getHours(), _m = _now.getMinutes();
    const _isBeforeCutoff = _h < 22 || (_h === 22 && _m < 30);
    // Retirer l'ancien hint s'il existe
    const _todayEl = document.getElementById('dte-today-hint');
    if (_todayEl) _todayEl.remove();
    if (hasData && _isBeforeCutoff) {
      // Calcul décompte
      const _totalMins = (22 - _h) * 60 + (30 - _m);
      const _hLeft = Math.floor(_totalMins / 60);
      const _mLeft = _totalMins % 60;
      const _countdown = _hLeft > 0 ? _hLeft + 'h' + String(_mLeft).padStart(2,'0') : _mLeft + ' min';
      const _hint = document.createElement('div');
      _hint.id = 'dte-today-hint';
      _hint.style.cssText = 'font-size:11px;color:rgba(255,255,255,0.35);text-align:center;margin-top:10px;margin-bottom:2px;display:block;width:100%;clear:both;';
      _hint.textContent = '⏱ Mise à jour dans ' + _countdown + ' (22h30)';
      // Insérer à la fin du panel hero — après tous les éléments existants
      const _heroPanel = document.querySelector('.panel--hero');
      if (_heroPanel) _heroPanel.appendChild(_hint);
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
            ['🧠 Fatigue accumulée',     'fatigue',     v=>v>=80?'red':v>=60?'orange':v>=35?'amber':'sync', fatV,  fatLbl],
            ['⚡ Forme & énergie', 'performance', v=>v>=80?'sync':v>=60?'sync':v>=40?'amber':'red',   perfV, perfLbl],
            ['💊 Niveau de stress',      'stress',      v=>v>=80?'red':v>=60?'orange':v>=35?'amber':'sync', strV,  strLbl],
          ].map(([l,k,colFn3,v,desc])=>{ const col=colFn3(v); return `
            <div style="margin-top:10px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                <span style="font-size:11px;color:#fff;">${l}</span>
                <span style="font-size:12px;font-weight:700;color:var(--${col});">${v}%</span>
              </div>
              <div class="hero-bar"><div class="hero-bar-fill" style="width:${v}%;background:var(--${col});box-shadow:0 0 6px var(--${col})40;"></div></div>
              <div style="font-size:10px;color:rgba(255,255,255,0.55);margin-top:2px;">${desc}</div>
            </div>`; }).join('')
          }
      </div>`;
      container.insertAdjacentHTML('beforeend',barHtml);
    }
  }

  _calcGlobal(scores){
    // Cohérence avec app.js : 100 - MAX(fatigue, stress, cogRisk)
    const worst = Math.max(scores.fatigue||0, scores.stress||0, scores.cogRisk||0);
    return Math.max(0, Math.min(100, Math.round(100 - worst)));
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
        { label:'Heures supp. cette semaine', key:'_currentWeekExtra', fmt: (v, get) => {
            const hasData = get && get('_hasCurrentWeekData');
            if (!hasData) return 'Aucune saisie cette semaine';
            if (!v || v <= 0) return '0h sup. cette semaine';
            return '+'+v.toFixed(1)+'h sup. cette semaine';
        }},
        { label:'Moyenne quotidienne (28j)', key:'_avgExtraDay28', fmt: (v, get) => {
            if (v <= 0) return '0h/j — rythme légal';
            const isProj = get && get('_isProjection');
            const impact = v < 1 ? 'impact léger' : v < 2 ? 'impact modéré' : 'impact élevé';
            const suffix = isProj ? ' — projection historique' : '';
            return '+'+v.toFixed(1)+'h/jour ('+impact+')'+suffix;
        }},
        // _consecOT : calculé en arrière-plan (bio) mais non affiché — évite confusion utilisateur
        { label:'Surcharge chronique (12 sem.)', key:'_cumulWeeksLong', fmt: v => {
            const vR = Math.round(v * 10) / 10;
            if (vR <= 0) return 'Aucune surcharge chronique';
            // Phases alignées sur le panneau Stress (même fenêtre 12 sem, mêmes seuils)
            let phase;
            if (vR < 4)        phase = 'phase P1 — vigilance';
            else if (vR < 8)   phase = 'phase P2 — fatigue chronique';
            else if (vR < 16)  phase = 'phase P3 — surmenage';
            else               phase = 'phase P4 — risque burn-out';
            return vR.toFixed(1)+' sem. en surcharge — '+phase;
        }},
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
        { label:'Heures hebdo vs optimal', key:'_recentWeeklyH', fmt: (v, n) => {
            const src = n('_weeklyHSource');
            const badge = src === 'live' ? ' <span style="font-size:8px;color:#00ccaa;">● LIVE</span>'
                        : src === 'avg'  ? ' <span style="font-size:8px;color:#c89a18;">◐ MOY. 28J</span>'
                        :                  ' <span style="font-size:8px;color:rgba(255,255,255,0.3);">— SEUIL</span>';
            return v.toFixed(0)+'h/sem (optimal : 35h)'+badge;
          } },
        { label:'Variabilité des horaires', key:'_sigma',         fmt: v => v===0?'Faible — rythme régulier':v>6?'Élevée ('+v.toFixed(1)+'h écart-type — ANACT)':v>3?'Modérée ('+v.toFixed(1)+'h écart-type)':'Faible ('+v.toFixed(1)+'h écart-type)' },
        { label:'Durée exposition (12 sem.)', key:'_cumulWeeksLong',   fmt: v => {
            const vR = Math.round(v * 10) / 10;
            if (vR <= 0) return 'Sous le seuil (12 sem.)';
            if (vR < 1) return 'Effet partiel d\'1 semaine légère';
            if (vR < 4) return vR.toFixed(1)+' sem. — vigilance';
            if (vR < 4) return vR.toFixed(1)+' sem. — phase P1 vigilance';
            if (vR < 8) return vR.toFixed(1)+' sem. — phase P2 fatigue chronique';
            if (vR < 16) return vR.toFixed(1)+' sem. — phase P3 surmenage';
            return vR.toFixed(1)+' sem. — phase P4 risque burn-out';
        }},
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
        { label:'Heures hebdo (courbe Pencavel)', key:'_recentWeeklyH', fmt: (v, n) => {
            const src = n('_weeklyHSource');
            const isRest = (window.DTE&&window.DTE._state&&window.DTE._state.norm&&window.DTE._state.norm._isVacationWeek);
            // FIX : ne jamais afficher "0h" si on a des données réelles cette semaine (src=live/avg)
            // "0h travaillées" était affiché samedi quand le moteur basculait en mode repos
            // alors que lun-ven avaient des HS saisies dans M2
            if (isRest && src !== 'live' && src !== 'avg') return '0h travaillées — potentiel de récupération actif';
            const badge = src==='live'?' <span style="font-size:8px;color:#00ccaa;">● LIVE</span>':src==='avg'?' <span style="font-size:8px;color:#c89a18;">◐ MOY. 28J</span>':' <span style="font-size:8px;color:rgba(255,255,255,0.3);">— SEUIL</span>';
            // Afficher la base CCN (35h) si semaine repos sans données
            const h = (isRest && v < 10) ? 35 : v;
            return h.toFixed(0)+'h/sem — perf. Pencavel '+(h<=35?'100%':h<=40?'~99%':h<=48?'~82%':h<=50?'~80%':h<=55?'~60%':'~52%')+badge;
        }},
        { label:'Risque cognitif (≥52h)', key:'_recentWeeklyH', fmt: (v, n) => {
            const src = n('_weeklyHSource');
            const badge = src==='live'?' <span style="font-size:8px;color:#00ccaa;">● LIVE</span>':src==='avg'?' <span style="font-size:8px;color:#c89a18;">◐ MOY. 28J</span>':' <span style="font-size:8px;color:rgba(255,255,255,0.3);">— SEUIL</span>';
            return (v>=52?'Actif : +19% gyrus frontal (OEM 2025)':'Non actif (<52h)')+badge;
          } },
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
        { label:'Durée d\'exposition (12 sem.)', key:'_cumulMonthsLong', fmt: v => {
            const vR = Math.round(v * 100) / 100; // 2 décimales pour voir le decay
            const norm3 = window.DTE&&window.DTE._state&&window.DTE._state.norm;
            const isRest = norm3&&norm3._isVacationWeek;
            const consecRest = (norm3&&norm3._consecRestDays)||0;
            // Décroissance lente (demi-vie 180j — Kivimäki 2015 : risque structurel)
            // 2 décimales permettent de voir le mouvement même à court terme
            const vDisplay = isRest && consecRest > 0
              ? Math.round(Math.max(0, vR * Math.exp(-Math.LN2 * consecRest / 180)) * 100) / 100
              : vR;
            const suffix = isRest ? ' ↓ (récup. lente — risque structurel)' : '';
            return vDisplay > 0
              ? vDisplay.toFixed(2)+' mois cumulés (risque ×'+Math.round(Math.min(1.8,(1+vDisplay*0.08))*100)/100+')'+suffix
              : 'Court terme (<1 mois)';
        }},
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
        { label:'Seuil ≥52h/sem', key:'_recentWeeklyH', fmt: (v, n) => {
            const src = n('_weeklyHSource');
            // CORRECTIF : si source='seuil' (semaine non saisie), afficher la moyenne
            // 28j réelle plutôt que 35h (base) qui induit en erreur "35h < 52h" alors
            // que l'historique récent est à 45h.
            const dispH = (src === 'seuil' && (n('_avgExtraDay28')||0) > 0)
              ? (35 + (n('_avgExtraDay28')||0) * 5) : v;
            const badge = src==='live'?' <span style="font-size:8px;color:#00ccaa;">● LIVE</span>'
              : src==='avg' ?' <span style="font-size:8px;color:#c89a18;">◐ MOY. 28J</span>'
              : (n('_avgExtraDay28')||0) > 0
                ? ' <span style="font-size:8px;color:#c89a18;">◐ MOY. 28J</span>'
                : ' <span style="font-size:8px;color:rgba(255,255,255,0.3);">— SEUIL</span>';
            return (dispH>=52?'Actif : '+dispH.toFixed(0)+'h/sem':'Sous le seuil ('+dispH.toFixed(0)+'h < 52h)')+badge;
          } },
        { label:'Durée exposition (12 sem.)', key:'_cumulWeeksLong', fmt: v => {
            const vR = Math.round(v * 10) / 10;
            return vR > 0 ? vR+' sem. → risque ×'+Math.round(Math.min(2.0,(1+vR*0.05))*100)/100 : 'Sous le seuil';
        }},
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
        { label:'Fatigue accumulée (12 sem.)', key:'_cumulWeeksLong', fmt: v => {
            const isRest = (window.DTE&&window.DTE._state&&window.DTE._state.norm&&window.DTE._state.norm._isVacationWeek);
            const vR = Math.round(v * 10) / 10;
            if (isRest && vR > 0) {
              // Seuil P2 (phase vigilance) = 4 semaines cumulées — INRS phases RPS
              // Objectif : sortir de la zone surcharge (vR → <4 sem), pas atteindre 0
              // Vacances : -0.25/sem = -0.25/7j. Semaines normales : -0.10/sem.
              const surplusVersP2 = Math.max(0, vR - 4);
              const joursVac   = Math.round(surplusVersP2 * 7 / 0.25);  // jours de vacances
              const semNorm    = Math.round(surplusVersP2 / 0.10);       // semaines normales
              if (surplusVersP2 <= 0) {
                return '✓ Sous le seuil P2 — restauration en bonne voie (' + vR + ' sem.)';
              }
              return '↓ Restauration active — ~' + joursVac + 'j de repos' +
                     (semNorm > 0 ? ' ou ' + semNorm + ' sem. normales' : '') +
                     ' pour sortir de surcharge (' + vR + ' sem. cumulées)';
            }
            return vR > 0 ? 'Réduite : '+vR+' sem. de surcharge' : 'Normale : pas de surcharge';
        }},
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
      {key:'performance',label:'PERFORMANCE',   sub:'Efficacité au travail', inv:true, subFn: (s,n) => (n&&n._isVacationWeek) ? 'Potentiel de récupération' : 'Efficacité au travail'},
      {key:'cvRisk',     label:'CŒUR',          sub:'Risque cœur (OMS)',    inv:false},
      {key:'cogRisk',    label:'CERVEAU',        sub:'Risque cerveau (études)',  inv:false},
      {key:'recovery',   label:'RÉCUPÉRATION',  sub:'Capacité de récup.',   inv:true, subFn: (s,n) => (n&&n._isVacationWeek) ? 'Phase de restauration active' : 'Capacité de récup.'},
    ];
    el.innerHTML=defs.map(d=>{
      const v=Math.round(scores[d.key])||0;
      const c=colFn(d.inv)(v);
      const norm2 = window.DTE && window.DTE._state && window.DTE._state.norm;
      const subLabel = d.subFn ? d.subFn(scores, norm2) : d.sub;
      return `<div class="score-card" style="cursor:pointer;transition:border-color .15s;"
        onclick="window._showScoreDetail('${d.key}')"
        onmouseover="this.style.borderColor='rgba(0,200,255,0.4)'"
        onmouseout="this.style.borderColor=''">
        <div class="score-card-label">${d.label}</div>
        <div class="score-card-val" style="color:${c};">${v}</div>
        <div class="score-card-bar"><div class="score-card-bar-fill" style="width:${v}%;background:${c};"></div></div>
        <div class="score-card-sub">${subLabel}</div>
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
        if(k==='_cumulMonthsLong') return norm ? (norm._cumulWeeksLong||0)/4.33 : 0;
        if(k==='_consecOT')   return norm ? (norm._consecOT || 0) : 0;
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
                  <div style="font-size:12px;color:#fff;font-weight:600;margin-top:1px;">${f.fmt(normVal(f.key), normVal)}</div>
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

          <!-- DÉTAIL COMPLET DU CALCUL (transparence — depuis scores._detail) -->
          ${(() => {
            const det = scores2 && scores2._detail && scores2._detail[key];
            const cmt = scores2 && scores2._commute;
            const badScore = !['performance','recovery'].includes(key);
            let html = '';
            if (det && det.components) {
              const rows = det.components.filter(c => c.points !== 0 || c.reconcile).map(c => {
                const sign = c.points > 0 ? '+' : '';
                const colr = c.points === 0 ? 'rgba(255,255,255,0.5)'
                  : (c.points > 0) === badScore ? '#ff8888' : '#88ddaa';
                return `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;margin-bottom:5px;">
                  <div style="flex:1;font-size:11px;color:rgba(255,255,255,0.78);line-height:1.35;">${c.label}
                    <span style="display:block;font-size:8px;color:rgba(255,255,255,0.32);font-family:var(--font-mono);">${c.study||''}</span></div>
                  <div style="font-size:12px;font-weight:700;color:${colr};font-family:var(--font-mono);white-space:nowrap;">${sign}${c.points} pts</div>
                </div>`;
              }).join('');
              html += `<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);padding:10px;margin-bottom:8px;">
                <div style="font-size:10px;font-family:var(--font-mono);color:rgba(255,255,255,0.65);letter-spacing:.1em;margin-bottom:8px;display:flex;justify-content:space-between;">
                  <span>🧮 DÉTAIL DU CALCUL</span><span style="color:${col};font-weight:700;">= ${det.total}</span></div>
                ${rows}
                ${det.note ? `<div style="font-size:9px;color:rgba(255,255,255,0.42);margin-top:6px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.08);line-height:1.5;">ℹ️ ${det.note}</div>` : ''}
              </div>`;
            }
            // Section Trajet — feature active + score concerné
            if (cmt && cmt.enabled && ['fatigue','stress','recovery','cvRisk'].includes(key)) {
              const t = cmt.today;
              const imp = cmt.impact[key];
              html += `<div style="background:rgba(155,109,255,0.06);border:1px solid rgba(155,109,255,0.25);padding:10px;margin-bottom:8px;">
                <div style="font-size:10px;font-family:var(--font-mono);color:#b18bff;letter-spacing:.1em;margin-bottom:8px;">🚦 TRAJET DOMICILE-TRAVAIL</div>
                ${t ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11px;">
                  <div><span style="color:rgba(255,255,255,0.4);">Mode</span><br><b style="color:#fff;">${t.modeLabel}</b></div>
                  <div><span style="color:rgba(255,255,255,0.4);">Durée A/R</span><br><b style="color:#fff;">${t.timeMin} min</b></div>
                  <div><span style="color:rgba(255,255,255,0.4);">Conditions</span><br><b style="color:#fff;">${t.qualLabel}</b></div>
                  <div><span style="color:rgba(255,255,255,0.4);">Impact</span><br><b style="color:#b18bff;">${imp>0?'+':''}${imp} pts</b></div>
                </div>` : `<div style="font-size:11px;color:rgba(255,255,255,0.5);">Pas de saisie aujourd'hui — charge moyenne calculée sur ${cmt.nbDays28} jour(s).</div>`}
                <div style="font-size:9px;color:rgba(255,255,255,0.45);margin-top:7px;padding-top:6px;border-top:1px solid rgba(155,109,255,0.15);line-height:1.5;">
                  Charge trajet 28j : <b style="color:#b18bff;">${cmt.level}</b>${key==='cvRisk'?'<br>⚠️ '+cmt.cvRiskNote:''}</div>
              </div>`;
            }
            return html;
          })()}

          <!-- Note explicative (optionnelle) -->
          ${meta.note ? `<div style="font-size:10px;color:rgba(255,255,255,0.45);padding:7px 8px;margin-bottom:6px;background:rgba(255,255,255,0.04);border-left:2px solid rgba(0,200,255,0.3);">ℹ️ ${meta.note}</div>` : ''}

          <!-- Source -->
          <div style="font-size:10px;color:rgba(255,255,255,0.35);padding:6px 0;font-style:italic;">
            📚 ${meta.source}
          </div>
        </div>`;
      modal.querySelector('.modal-overlay').addEventListener('click',()=>modal.classList.add('hidden'));
      modal.classList.remove('hidden');
    };
  }

  // ── CARTE D'ACTIVATION DU SUIVI TRANSPORT (module optionnel) ───────────────
  // Le suivi transport est ajouté par-dessus l'original. OFF par défaut : sans
  // activation, l'utilisateur reste sur les scores de base (études d'origine).
  // Cette carte est le point d'activation depuis le Dashboard.
  _renderCommuteActivation(scores){
    const grid = document.getElementById('scores-grid');
    const anchor = grid ? (grid.closest('.panel') || grid.parentElement) : document.querySelector('.dashboard-main');
    const old = document.getElementById('commute-activation-card');
    if(old) old.remove();
    if(!anchor || !scores || !scores._hasData) return; // rien à enrichir sans données

    let enabled = false, commuteH = 0;
    try { enabled = localStorage.getItem('M4_COMMUTE_ENABLED') === 'true'; } catch(_){}
    try { commuteH = parseFloat((JSON.parse(localStorage.getItem('DTE_SETTINGS')||'{}')).commuteH)||0; } catch(_){}
    const pickerOpen = !!window._dashCommutePickerOpen;

    const card = document.createElement('div');
    card.id = 'commute-activation-card';
    card.style.cssText = 'margin:12px 16px;padding:14px 16px;border-radius:10px;border:1px solid rgba(155,109,255,'
      + (enabled?'0.35':'0.2') + ');background:rgba(155,109,255,' + (enabled?'0.06':'0.03') + ');';

    const btn = (onclick,label,solid)=>`<button onclick="${onclick}" style="white-space:nowrap;padding:8px 14px;border-radius:6px;cursor:pointer;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.08em;border:1px solid rgba(155,109,255,0.5);`
      + (solid?'background:linear-gradient(135deg,#9b6dff,#6d3fcc);color:#fff;':'background:rgba(255,255,255,0.05);color:#b18bff;') + '">' + label + '</button>';

    if(enabled){
      const cmt = scores._commute || {};
      const lvl = (cmt.level && cmt.level !== 'off') ? cmt.level : null;
      card.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:700;color:#fff;">🚦 Suivi transport activé</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.55);margin-top:3px;line-height:1.5;">
              Vos trajets domicile-travail influent sur fatigue, stress, récupération et risque cardio.${lvl?' Charge actuelle : <b style="color:#b18bff;">'+lvl+'</b>.':''}
            </div>
          </div>
          ${btn('window._dashDeactivateCommute()','Désactiver',false)}
        </div>`;
    } else if(pickerOpen){
      // Activer nécessite une durée de trajet → mini-sélecteur (aller, comme les réglages)
      const opts = [15,30,45,60,90].map(m =>
        `<button onclick="window._dashCommutePick(${m})" style="flex:1;padding:8px 2px;border-radius:5px;cursor:pointer;font-family:var(--font-mono);font-size:11px;font-weight:700;border:1px solid rgba(155,109,255,0.3);background:rgba(0,10,25,0.6);color:#fff;">${m}</button>`
      ).join('');
      card.innerHTML = `
        <div style="font-size:13px;font-weight:700;color:#fff;margin-bottom:4px;">🚦 Durée de votre trajet ?</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.55);margin-bottom:10px;line-height:1.5;">Minutes par trajet (aller). Vous pourrez l'ajuster chaque jour au check-in.</div>
        <div style="display:flex;gap:6px;">${opts}</div>
        <div style="text-align:right;margin-top:8px;"><button onclick="window._dashCommuteCancel()" style="background:none;border:none;color:rgba(255,255,255,0.4);font-size:11px;cursor:pointer;">Annuler</button></div>`;
    } else {
      card.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:700;color:#fff;">🚦 Suivi transport <span style="font-size:9px;color:#b18bff;font-family:var(--font-mono);border:1px solid rgba(155,109,255,0.4);border-radius:3px;padding:1px 5px;margin-left:4px;">OPTIONNEL</span></div>
            <div style="font-size:11px;color:rgba(255,255,255,0.55);margin-top:3px;line-height:1.5;">
              Intégrez l'impact de vos trajets domicile-travail à vos scores santé. Sinon, votre analyse reste sur les études de base.
            </div>
          </div>
          ${btn('window._dashActivateCommute()','Activer',true)}
        </div>`;
    }
    anchor.insertAdjacentElement('afterend', card);

    // Handlers (réattachés à chaque rendu — idempotent)
    window._dashActivateCommute = () => {
      let cH = 0; try { cH = parseFloat((JSON.parse(localStorage.getItem('DTE_SETTINGS')||'{}')).commuteH)||0; } catch(_){}
      if(cH > 0){
        try { localStorage.setItem('M4_COMMUTE_ENABLED','true'); } catch(_){}
        window._dashCommutePickerOpen = false;
        if(window._fullSync) window._fullSync();
      } else {
        window._dashCommutePickerOpen = true; // pas de durée → demander
        if(window.DTE && window.DTE._state) this._renderCommuteActivation(window.DTE._state.scores);
      }
    };
    window._dashCommutePick = (min) => {
      try {
        const s = JSON.parse(localStorage.getItem('DTE_SETTINGS')||'{}');
        s.commuteH = min/60; localStorage.setItem('DTE_SETTINGS', JSON.stringify(s));
        localStorage.setItem('M4_COMMUTE_ENABLED','true');
      } catch(_){}
      window._dashCommutePickerOpen = false;
      if(window._fullSync) window._fullSync();
    };
    window._dashCommuteCancel = () => {
      window._dashCommutePickerOpen = false;
      if(window.DTE && window.DTE._state) this._renderCommuteActivation(window.DTE._state.scores);
    };
    window._dashDeactivateCommute = () => {
      try { localStorage.setItem('M4_COMMUTE_ENABLED','false'); } catch(_){}
      window._dashCommutePickerOpen = false;
      if(window._fullSync) window._fullSync();
    };
  }

  _renderRisks(risks){
    const el=document.getElementById('risks-list');
    if(!el) return;
    // FIX FLASH : ne réécrire que si contenu changé
    const _rHash = risks.map(r=>r.titre+r.level).join('|');
    if(el.dataset.riskHash === _rHash) return;
    el.dataset.riskHash = _rHash;
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
    // FIX FLASH : ne réécrire que si le contenu a changé
    const _newHash = advice.map(a=>(a.titre||a.title||'')+(a.message||a.msg||'')).join('|');
    if(el.dataset.adviceHash === _newHash) return;
    el.dataset.adviceHash = _newHash;
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
    const cont=document.getElementById('footer-contingent'); 
    if(cont) {
      const ccnRules = (typeof CCN_API !== 'undefined') 
        ? CCN_API.getGroupeForCCN(parseInt((()=>{try{return localStorage.getItem('CCN_IDCC')}catch(_){return '0'}})() || '0'))
        : {contingent: 220};
      const _limit = (ccnRules && ccnRules.contingent) ? ccnRules.contingent : 220;
      cont.textContent=`Contingent : ${raw&&raw.m1?Math.round(raw.m1.netOvertime||raw.m1.totalExtra||0):0}/${_limit}h`;
    }
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