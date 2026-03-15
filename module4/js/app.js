/**
 * APP.JS — Digital Twin Engine — Orchestrateur principal
 */
window.DTE = window.DTE || {};

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ── 1. Instanciation ────────────────────────────────────────── */
  DTE.engine      = new DTEEngine();
  DTE.simulator   = new DTESimulator(DTE.engine);
  DTE.risks       = new DTERisks();
  DTE.learning    = new DTELearning(DTE.engine);
  DTE.dashboard   = new Dashboard();
  const _rc = document.getElementById('radar-canvas');
  DTE.radar = _rc ? new RadarChart(_rc) : null;
  DTE.twin        = new TwinBody(
    document.getElementById('twin-body-container'),
    document.getElementById('twin-body-tooltip')
  );
  DTE.timeline    = new TimelineChart(document.getElementById('timeline-canvas'));
  DTE.heatmap     = new Heatmap(document.getElementById('heatmap-container'));
  DTE.checkin     = new Checkin();
  DTE.ai          = new AIAdvisor();
  DTE.pdf         = new PDFReport();
  DTE.notifs      = new Notifications();
  DTE.notifications = DTE.notifs;
  if (typeof ScenarioAdvisor !== 'undefined') DTE.scenarioAdvisor = new ScenarioAdvisor();
  if (typeof GlossaryUI !== 'undefined') DTE.glossary = new GlossaryUI();
  if (typeof LifestylePanel !== 'undefined') DTE.lifestyle = new LifestylePanel();

  /* ── 2. Analyse ──────────────────────────────────────────────── */
  function runAnalysis() {
    try {
      const state  = DTE.engine.analyze();
      DTE.learning.autoAdapt();
      const risks  = DTE.risks.detect(state.scores, state.norm);
      let advice = [];
      try { advice = buildAdvice(state.scores, risks, state.norm); } catch(e) { console.warn('[DTE] buildAdvice error:', e); }
      DTE.lastRisks  = risks;
      DTE.lastAdvice = advice;
      DTE._state     = state;

      DTE.dashboard.render(state, risks, advice);
      DTE.twin.update(state.scores);

      if (DTE.radar && DTE.radar._ctx) {
        const raw  = state.raw;
        const norm = state.norm;
        const m1   = raw && raw.m1;
        const D    = DTE.engine.getDefaults ? DTE.engine.getDefaults() : {};

        // Axes de CONFORMITÉ LÉGALE réels (Code du travail FR)
        // Chaque axe = % de conformité (100 = parfait, 0 = violation)

        // 1. Heures hebdo vs max 48h (Art. L3121-20)
        const weeklyH = (norm && norm._recentWeeklyH) || 35;
        const confHebdo = Math.max(0, Math.min(100, Math.round((1 - Math.max(0, weeklyH - 35) / 13) * 100)));

        // 2. Repos quotidien 11h (Art. L3131-1) — si >10h/j → risque
        const dailyH = (norm && norm._avgH7) || 7;
        const confRepos = Math.max(0, Math.min(100, dailyH <= 9 ? 100 : dailyH <= 10 ? 70 : 30));

        // 3. Contingent HS 220h/an (Art. L3121-33)
        const contingPct = (norm && norm._contingentPct) || 0;
        const confCont = Math.max(0, Math.min(100, Math.round((1 - contingPct / 100) * 100)));

        // 4. Jours consécutifs (repos hebdo 35h Art. L3132-1) — max 6j
        const consec = (norm && norm._consec) || 0;
        const confConsec = Math.max(0, Math.min(100, consec <= 5 ? 100 : consec <= 6 ? 60 : 20));

        // 5. HS journalière — limite 3h/j recommandée INRS
        const extraDay = (norm && norm._avgExtra7) || 0;
        const confHS = Math.max(0, Math.min(100, extraDay <= 1 ? 100 : extraDay <= 2 ? 75 : extraDay <= 3 ? 50 : 20));

        // 6. Récupération — capacité à récupérer (base santé)
        const s = state.scores;
        const confRecup = Math.max(0, Math.min(100, s.recovery || (state.scores._hasData ? 70 : 100)));

        DTE.radar.render([
          { label:'Hebdo',   value: confHebdo,  max:100, warn:70, legal:'≤48h/sem' },
          { label:'Repos/j', value: confRepos,  max:100, warn:70, legal:'11h min' },
          { label:'Contingent', value: confCont, max:100, warn:50, legal:'220h/an' },
          { label:'Jours cons.', value: confConsec, max:100, warn:60, legal:'≤6j' },
          { label:'HS/jour', value: confHS,     max:100, warn:70, legal:'≤3h/j' },
          { label:'Récup.',  value: confRecup,  max:100, warn:40, legal:'INRS' },
        ]);
      }

      // Footer
      const yr = DTE.engine._year ? DTE.engine._year() : new Date().getFullYear();
      const el = id => document.getElementById(id);
      if (el('footer-year'))       el('footer-year').textContent       = 'ANNÉE ' + yr;
      if (el('footer-timestamp'))  el('footer-timestamp').textContent  = 'ANALYSE : ' + new Date().toLocaleTimeString('fr-FR');
      if (el('footer-contingent')) el('footer-contingent').textContent = 'CONTINGENT : ' + Math.round(state.norm._contingentPct || 0) + '/220H';
      const statusEl = el('footer-status');
      if (statusEl) {
        const f = state.scores.fatigue;
        statusEl.className = f >= 85 ? 'status-danger' : f >= 60 ? 'status-warn' : 'status-ok';
        statusEl.textContent = f >= 85 ? '■ CRITIQUE' : f >= 60 ? '■ ALERTE' : '■ SYNCHRONISÉ';
      }

      // Score global dans DTE.app
      if(!state.scores._hasData) {
        DTE.app = { scoreGlobal: null };
      } else {
        const dangers = risks.filter(r => r.level === 'CRITIQUE').length;
        const alertes = risks.filter(r => r.level !== 'CRITIQUE').length;
        const base = state.scores.performance || 50;
        DTE.app = { scoreGlobal: Math.max(0, Math.min(100, base - dangers * 15 - alertes * 5)) };
      }

      DTE.notifs.checkAndNotify(state, risks);
      document.dispatchEvent(new CustomEvent('dte:analyzed', { detail: state }));
    } catch (err) {
      console.error('[DTE App] Analysis error:', err);
    }
  }

  /* ── 3. Conseils ─────────────────────────────────────────────── */
  function buildAdvice(scores, risks, norm) {
    const advice = [];
    // norm passé directement pour éviter la dépendance à DTE._state non encore défini
    const _norm  = norm || (DTE._state && DTE._state.norm);
    const weekH  = (_norm && _norm._recentWeeklyH) || 35;
    const cumW   = (_norm && _norm._cumulWeeks) || 0;

    // ─ FATIGUE ─────────────────────────────────────────────────────
    if (!scores._hasData) {
      // Pas d'avertissement — attendre que l'utilisateur saisisse des heures
      return advice; // vide
    } else if (scores.fatigue >= 85) {
      advice.push({ type:'danger', emoji:'🔴',
        titre:'Épuisement critique — Phase 4',
        message:'Votre corps envoie des signaux d\'alarme. ' +
          (cumW >= 4 ? 'Après ' + cumW + ' semaines de surcharge, la récupération sera longue.' : 'Réduisez vos heures immédiatement.') +
          ' Le sens que vous donnez à votre travail peut atténuer la perception, mais pas les risques biologiques réels.',
        source:'OMS/OIT 2021 · INRS · HAS 2017 · Art. L4121-1 Code du travail' });
    } else if (scores.fatigue >= 60) {
      advice.push({ type:'warning', emoji:'🟠',
        titre:'Fatigue chronique — Phase 3',
        message:'À ' + weekH.toFixed(0) + 'h/sem sur ' + (cumW||1) + ' semaine(s), la fatigue s\'accumule. ' +
          'Votre hygiène de vie (sport, alimentation, sommeil) peut réduire l\'impact de 20 à 30% selon les études INRS.',
        source:'J.Occup.Health 2021 · INRS · Sonnentag 2003' });
    } else if (scores.fatigue >= 35) {
      advice.push({ type:'warning', emoji:'🟡',
        titre:'Fatigue modérée — Phase 2',
        message:'Niveau gérable si vous récupérez bien le week-end. Si vous aimez votre travail et dormez ≥7h, ' +
          'vous pouvez maintenir ce rythme à court terme. Surveillez la durée.',
        source:'Thompson 2022 · Nature Hum.Behav. 2025 (Fan et al.)' });
    } else {
      const p1weekMsg = weekH > 48 ? 'Fatigue faible MAIS vous dépassez le maximum légal ('+weekH.toFixed(0)+'h/sem > 48h). Attention à la durée.'
        : weekH > 40 ? 'Fatigue faible pour l\'instant. À '+weekH.toFixed(0)+'h/sem, surveillez l\'accumulation sur plusieurs semaines.'
        : 'Votre niveau de fatigue est faible. Continuez à vous hydrater, dormir 7-8h et prendre vos pauses.';
      const p1src = weekH > 48 ? 'Art. L3121-20 Code du travail · OMS — seuil AVC 55h'
        : weekH > 40 ? 'INRS — vigilance dès 40h/sem · J.Occup.Health 2021'
        : 'OMS — Zone optimale ≤40h/sem · INRS';
      advice.push({ type: weekH > 48 ? 'warning' : 'success', emoji: weekH > 40 ? '⚠️' : '🟢',
        titre: weekH > 48 ? 'Attention : dépassement légal ('+weekH.toFixed(0)+'h/sem)' : 'Bonne forme — Phase 1',
        message: p1weekMsg + ' La prévention est le meilleur investissement.',
        source: p1src });
    }

    // ─ HEURES HEBDO vs LÉGAL ────────────────────────────────────────
    if (weekH > 55) {
      advice.push({ type:'danger', emoji:'⚖️',
        titre:'Au-delà du seuil OMS (+35% risque AVC)',
        message: weekH.toFixed(0) + 'h/sem dépasse le seuil OMS 2021. ' +
          'Le risque cardiovasculaire augmente avec la durée d\'exposition. ' +
          'Parlez-en à votre médecin du travail.',
        source:'OMS/OIT 2021 — Pega F. et al., Env. International · Art. L4131-1' });
    } else if (weekH > 48) {
      advice.push({ type:'warning', emoji:'⚖️',
        titre:'Dépassement du maximum légal (48h)',
        message: weekH.toFixed(0) + 'h/sem dépasse la limite absolue (Art. L3121-20). ' +
          'Vérifiez votre accord collectif ou demandez un repos compensateur.',
        source:'Art. L3121-20 Code du travail · Art. L3121-33 (RCO)' });
    }

    // ─ RÉSILIENCE : facteurs humains ────────────────────────────────
    if (scores.fatigue >= 50 && scores.fatigue < 85) {
      advice.push({ type:'info', emoji:'💡',
        titre:'Note : vous n\'êtes pas une batterie',
        message:'Ces données sont des signaux statistiques basés sur des populations. ' +
          'Le sens que vous donnez à votre travail, votre activité physique et votre alimentation ' +
          'peuvent modifier significativement votre vécu. Mais la répétition sur plusieurs semaines finit par impacter tout le monde.',
        source:'Nature Hum.Behav. 2025 (Fan et al.) · ANACT — facteurs de protection' });
    }

    // ─ PERFORMANCE ──────────────────────────────────────────────────
    if (scores.performance < 50) {
      advice.push({ type:'info', emoji:'📉',
        titre:'Efficacité réduite',
        message:'Au-delà de 50h/sem, la productivité par heure chute (Stanford/Pencavel 2014). ' +
          'Les heures supplémentaires au-delà de 55h ne produisent rien de plus.',
        source:'Pencavel J. 2014 — Stanford University' });
    }

    // ─ RÉCUPÉRATION ─────────────────────────────────────────────────
    if (cumW >= 6) {
      advice.push({ type:'warning', emoji:'🛡️',
        titre:'Récupération longue après ' + cumW + ' semaines',
        message:'Plus la surcharge dure, plus le retour à la normale est lent. ' +
          '6 mois de surcharge réduisent la capacité de récupération de 45% (INRS).',
        source:'J.Occup.Health 2021 · INRS — fatigue cumulative' });
    }

    return advice;
  }
  // Exposer buildAdvice globalement pour checkin.js et lifestyle.js
  window._buildAdvice = buildAdvice;

  // Helper sync complet réutilisable par toutes les features
  window._fullSync = () => {
    try {
      const s  = DTE.engine.analyze();
      DTE._state = s;
      const r2 = DTE.risks.detect(s.scores, s.norm);
      const a2 = buildAdvice(s.scores, r2, s.norm);
      DTE.lastRisks = r2; DTE.lastAdvice = a2;
      // Recalculer le scoreGlobal
      if (!s.scores._hasData) {
        DTE.app = { scoreGlobal: null };
      } else {
        const d2 = r2.filter(r => r.level === 'CRITIQUE').length;
        const al = r2.filter(r => r.level !== 'CRITIQUE').length;
        DTE.app = { scoreGlobal: Math.max(0, Math.min(100, (s.scores.performance||50) - d2*15 - al*5)) };
      }
      DTE.dashboard.render(s, r2, a2);
      if (DTE.twin) DTE.twin.update(s.scores);
      const av = document.querySelector('.view:not(.hidden)');
      if (av) {
        if (av.id === 'view-predictions') renderPredictions(s);
        if (av.id === 'view-whatif' && DTE.whatif) DTE.whatif.render();
      }
    } catch(e) { console.warn('[DTE] fullSync:', e); }
  };

  /* ── 4. Navigation ───────────────────────────────────────────── */
  let _predictionsInited = false;
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const view = this.dataset.view;
      document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
        v.classList.add('hidden');
      });
      const target = document.getElementById('view-' + view);
      if (target) { target.classList.remove('hidden'); target.classList.add('active'); }
      if (view === 'predictions') { _predictionsInited = false; initPredictions(); }
      if (view === 'whatif')      initWhatIf();
      if (view === 'heatmap' && DTE.heatmap) DTE.heatmap.render(DTE._state);
    });
  });

  /* ── 5. Vue Prévisions ───────────────────────────────────────── */
  function initPredictions() {
    if (!DTE._state || !DTE._state.norm) {
      // Forcer une analyse si pas encore de state
      try { runAnalysis(); } catch(_) {}
      setTimeout(initPredictions, 400);
      return;
    }
    const state = DTE._state;
    const hsEl   = document.getElementById('timeline-hs');
    const daysEl = document.getElementById('timeline-days');
    if (hsEl)   { hsEl.oninput   = e => { document.getElementById('timeline-hs-val').textContent = parseFloat(e.target.value)+'H'; renderPredictions(state); }; }
    if (daysEl) { daysEl.onchange = () => renderPredictions(state); }
    renderPredictions(state);
  }

  function renderPredictions(state) {
    const sliderAdj = parseFloat(document.getElementById('timeline-hs')?.value || 0);
    const days      = parseInt(document.getElementById('timeline-days')?.value || 30);
    // Toujours utiliser le state le plus frais (pas le state figé de initPredictions)
    const freshState = DTE._state || state;
    const norm      = freshState && freshState.norm;
    // hs = heures HS par jour TRAVAILLÉ (lun-ven) + ajustement slider
    // On utilise _recentWeeklyH pour avoir les HS réelles de la semaine courante
    const weeklyH   = (norm && norm._recentWeeklyH) || 35;
    const currentHs = Math.max(0, (weeklyH - 35) / 5);  // HS/jour travaillé
    const hs        = Math.max(0, currentHs + sliderAdj);

    // Mettre à jour le label pour montrer ce que ça représente
    const hsVal = document.getElementById('timeline-hs-val');
    if (hsVal) {
      const sign = sliderAdj > 0 ? '+' : '';
      hsVal.textContent = sliderAdj === 0
        ? 'Rythme actuel'
        : sign + sliderAdj + 'h/j vs actuel';
    }

    let sim = null, fut = null, scen = null;
    const _rdNow = window._getRestDays ? window._getRestDays() : [0,6];
    try { fut  = DTE.simulator.futurState(days, freshState.norm, freshState.scores); } catch(e) {}
    try { scen = DTE.simulator.scenarios(days, freshState.norm, freshState.scores); } catch(e) {}
    // Timeline : utilise le scénario "actuel" depuis scen si dispo (garanti cohérent)
    // Sinon recalcule directement avec les HS réelles
    if (sliderAdj === 0 && scen) {
      const actuelSc = scen.scenarios.find(s => s.key === 'actuel');
      if (actuelSc && actuelSc._sim) { sim = actuelSc._sim; }
    }
    if (!sim) {
      // Passer les scores engine pour un état initial correct (comme WhatIf)
      // freshState.scores inclut lifestyle + checkin
      try { sim = DTE.simulator.run({ days, hoursPerDay: hs, restDays: _rdNow }, freshState.scores); } catch(e) {}
    }
    renderScenarios(days, freshState, scen);
    renderFutur(days, freshState, fut);
  }


  function renderScenarios(days, state, scen) {
    const el = document.getElementById('scenarios-container');
    if (!el) return;
    if (!scen) {
      el.innerHTML = '<div style="padding:16px;font-size:12px;color:rgba(255,255,255,0.5);text-align:center;">📋 Saisissez vos heures dans M1 pour comparer les scénarios</div>';
      return;
    }

    const c = v => v>=80?'#c82838':v>=60?'#c8601a':v>=35?'#c89a18':'#00aa88';

    const meta = {
      urgence:      { emoji:'🔥', titre:'Si j\'accélère (+4h/j)',    why:'Que se passe-t-il si je pousse encore plus ?' },
      actuel:       { emoji:'▶️', titre:'Si je continue comme ça',   why:'Projection exacte de votre rythme cette semaine.' },
      reduit:       { emoji:'⬇️', titre:'Si je réduis légèrement',   why:'Et si je faisais 1h de moins par jour ?' },
      optimise:     { emoji:'⚡', titre:'Si j\'optimise (-2h/j)',     why:'Zone productive OCDE. Moins de fatigue, même rendement.' },
      equilibre:    { emoji:'⚖️', titre:'Si je passe à 35h/sem',     why:'Zone OMS optimale. Productivité maximale selon Pencavel.' },
      recuperation: { emoji:'🛡️', titre:'Si je prends du recul',     why:'Récupération physiologique recommandée INRS.' },
    };

    function arrow(diff, invertGood) {
      if (Math.abs(diff) < 2) return '<span style="color:rgba(255,255,255,0.4)">= stable</span>';
      const good = invertGood ? diff < 0 : diff > 0;
      const col  = good ? '#00aa88' : '#c82838';
      const sign = diff > 0 ? '+' : '';
      const lbl  = good ? '▼ mieux' : '▲ moins bien';
      return '<span style="color:' + col + '">' + sign + diff + '% ' + lbl + '</span>';
    }

    const orderedKeys = ['urgence','actuel','reduit','optimise','equilibre','recuperation'];
    const ordered = orderedKeys.map(k => scen.scenarios.find(s=>s.key===k)).filter(Boolean);
    scen.scenarios.filter(s=>!orderedKeys.includes(s.key)).forEach(s=>ordered.push(s));

    let _sel = scen.best ? scen.best.key : 'actuel';

    const render = () => {
      const sel    = ordered.find(s=>s.key===_sel) || ordered[0];
      const actuel = ordered.find(s=>s.key==='actuel');
      const act    = actuel ? actuel.summary : null;

      // 6 boutons
      const btns = ordered.map(sc => {
        const m      = meta[sc.key] || { emoji:'▶', titre:sc.label, why:'' };
        const isSel  = sc.key === _sel;
        const isBest = scen.best && sc.key === scen.best.key;
        const fat    = sc.summary.avgFatigue || 0;
        const isAct  = sc.key === 'actuel';
        return '<button onclick="window._scen_select(\'' + sc.key + '\')" style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:10px 5px;cursor:pointer;text-align:center;background:rgba(0,10,25,' + (isSel?'.95':'.65') + ');border:' + (isSel?'2px':'1px') + ' solid ' + (isSel?'rgba(0,200,255,0.6)':c(fat)+'40') + ';">'
          + '<span style="font-size:20px;">' + m.emoji + '</span>'
          + '<span style="font-size:10px;color:' + (isSel?'#fff':'rgba(255,255,255,0.7)') + ';line-height:1.3;font-weight:' + (isSel?700:400) + ';">' + m.titre + '</span>'
          + '<span style="font-size:14px;font-weight:700;color:' + c(fat) + ';">' + fat + '%</span>'
          + (isBest ? '<span style="font-size:8px;color:#00aa88;border:1px solid #00aa88;padding:0 4px;">✓ optimal</span>' : '')
          + (isAct  ? '<span style="font-size:8px;color:rgba(255,255,255,0.4);">← maintenant</span>' : '')
          + '</button>';
      }).join('');

      // Détail scénario sélectionné
      let detail = '';
      if (sel) {
        const m   = meta[sel.key] || { emoji:'▶', titre:sel.label, why:'' };
        const ph  = sel.summary.finalPhase || { color:'#00ccaa', label:'EN FORME', id:1 };
        const isBest = scen.best && sel.key === scen.best.key;

        const diffFat   = act ? sel.summary.avgFatigue    - act.avgFatigue    : 0;
        const diffPerf  = act ? sel.summary.avgPerformance- act.avgPerformance: 0;
        const diffAlert = act ? sel.summary.daysAlert     - act.daysAlert     : 0;

        const cmpHtml = (act && sel.key !== 'actuel') ?
          '<div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:8px;">Par rapport à votre rythme actuel (' + (act.avgFatigue||0) + '% fatigue moy.) :</div>'
          + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:12px;">'
          + [['Fatigue moy.',sel.summary.avgFatigue,diffFat,true],['Performance',sel.summary.avgPerformance,diffPerf,false],['Jours alerte',sel.summary.daysAlert,diffAlert,true]].map(function(x) {
              const l=x[0],v=x[1],d=x[2],inv=x[3];
              return '<div style="text-align:center;padding:8px 4px;background:rgba(255,255,255,0.04);">'
                + '<div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:3px;">' + l + '</div>'
                + '<div style="font-size:18px;font-weight:700;color:' + c(inv?v:100-v) + ';">' + v + '%</div>'
                + '<div style="font-size:10px;margin-top:2px;">' + arrow(d, inv) + '</div>'
                + '</div>';
            }).join('')
          + '</div>'
          : '<div style="padding:8px;background:rgba(255,255,255,0.04);margin-bottom:10px;font-size:12px;color:rgba(255,255,255,0.7);">'
          + 'Fatigue moy. : <b style="color:' + c(sel.summary.avgFatigue) + '">' + sel.summary.avgFatigue + '%</b> &nbsp;|&nbsp; '
          + 'Performance : <b style="color:' + c(100-sel.summary.avgPerformance) + '">' + sel.summary.avgPerformance + '%</b> &nbsp;|&nbsp; '
          + 'Alertes : <b>' + sel.summary.daysAlert + 'j</b></div>';

        detail = '<div style="background:rgba(0,10,25,.92);border:1px solid rgba(0,200,255,0.2);padding:14px;">'
          + '<div style="margin-bottom:10px;">'
          + '<div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:3px;">' + m.emoji + ' ' + m.titre
          + (isBest ? ' <span style="font-size:10px;color:#00aa88;border:1px solid #00aa88;padding:1px 6px;margin-left:6px;">✓ MEILLEUR CHOIX</span>' : '')
          + '</div>'
          + '<div style="font-size:12px;color:rgba(255,255,255,0.6);">' + m.why + '</div>'
          + '</div>'
          + cmpHtml
          + '<div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:rgba(255,255,255,0.04);border-left:3px solid ' + ph.color + ';margin-bottom:8px;">'
          + '<div><div style="font-size:12px;font-weight:600;color:#fff;">Dans ' + days + ' jours : Phase ' + ph.label + '</div>'
          + '<div style="font-size:11px;color:rgba(255,255,255,0.65);margin-top:2px;">' + (ph.desc||'') + '</div></div></div>'
          + '<div style="font-size:10px;color:rgba(255,255,255,0.35);">' + (sel.oms||'') + '</div>'
          + '</div>';
      }

      el.innerHTML = '<div style="font-size:12px;color:rgba(255,255,255,0.65);margin-bottom:10px;line-height:1.5;">💡 Sélectionnez un scénario pour voir <b style="color:#fff">ce qui changerait</b> par rapport à votre rythme actuel.</div>'
        + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-bottom:12px;">' + btns + '</div>'
        + detail;
    };

    window._scen_select = key => { _sel = key; render(); };
    render();
  }


  function renderFutur(days, state, fut) {
    const el = document.getElementById('futur-state-container');
    if (!el) return;
    if (!fut || fut.fatigue === undefined || fut.fatigue === null) {
      el.innerHTML = `<div style="padding:16px;font-size:12px;color:rgba(255,255,255,0.5);text-align:center;">
        📋 Complétez M1 pour voir votre état prédit dans ${days} jours
      </div>`; return;
    }
    const c  = v => v >= 80 ? '#ff2244' : v >= 60 ? '#ff6600' : v >= 35 ? '#ffb300' : '#00ffcc';
    const ph = fut.finalPhase || { id:1, label:'ADAPTATION', color:'#00ffcc', desc:'' };

    // Message humain selon la phase
    const msgs = {
      1: '😊 Bonne nouvelle : vous restez en forme sur cette période.',
      2: '⚠️ Attention : la fatigue s\'accumule. Pensez à récupérer.',
      3: '🔶 Surmenage probable. Vos performances vont baisser.',
      4: '🔴 Risque élevé de burn-out. Consultez votre médecin du travail.'
    };
    const advice = {
      1: 'Maintenez ce rythme. Profitez des week-ends.',
      2: 'Réduisez de 1h par jour. Dormez 8h minimum.',
      3: 'Prenez du repos compensateur. Parlez-en à votre employeur.',
      4: 'Activez votre droit au repos. Art. L4121-1 Code du travail.'
    };

    el.innerHTML = `
      <!-- MESSAGE PRINCIPAL -->
      <div style="padding:14px;background:rgba(0,10,25,.9);border-left:3px solid ${ph.color};margin-bottom:10px;">
        <div style="font-size:14px;font-weight:600;color:#fff;margin-bottom:6px;">${msgs[ph.id]||msgs[1]}</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.7);line-height:1.6;">${ph.desc}</div>
        <div style="margin-top:8px;padding:6px 10px;background:rgba(255,255,255,0.06);font-size:11px;color:rgba(255,255,255,0.8);">
          💡 ${advice[ph.id]||advice[1]}
        </div>
      </div>

      <!-- 4 CHIFFRES CLÉS EXPLIQUÉS -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;">
        ${[
          ['Fatigue', fut.fatigue, 'Votre niveau d\'épuisement prévu', true, 'fatigue'],
          ['Performance', fut.performance, 'Votre efficacité au travail', false, 'performance'],
          ['Stress', fut.stress, 'Niveau de cortisol (tension)', true, 'stress'],
          ['Risque cardio', fut.cvRisk, 'Basé sur OMS 2021', true, 'cvRisk'],
        ].map(([l,v,desc,bad,key])=>`
          <div style="padding:10px 12px;background:rgba(0,10,25,.8);border:1px solid ${c(bad?v:100-v)}30;
            cursor:pointer;" onclick="window._showScoreDetail&&window._showScoreDetail('${key}')">
            <div style="font-size:20px;font-weight:700;color:${c(bad?v:100-v)};margin-bottom:2px;">${v}%</div>
            <div style="font-size:11px;font-weight:600;color:#fff;">${l}</div>
            <div style="font-size:10px;color:rgba(255,255,255,0.55);margin-top:2px;">${desc}</div>
          </div>`).join('')}
      </div>

      <!-- RISQUE OMS SI ÉLEVÉ -->
      ${fut.omsRisk && fut.omsRisk.level !== 'NOMINAL' ? `
      <div style="padding:8px 12px;background:rgba(${fut.omsRisk.level==='ÉLEVÉ'?'255,34,68':'255,102,0'},.1);
        border:1px solid rgba(${fut.omsRisk.level==='ÉLEVÉ'?'255,34,68':'255,102,0'},.3);
        font-size:11px;color:rgba(255,255,255,0.8);margin-bottom:6px;">
        📊 ${fut.omsRisk.txt}
      </div>` : ''}

      <div style="font-size:10px;color:rgba(255,255,255,0.35);padding-top:6px;border-top:1px solid rgba(255,255,255,0.08);">
        Sources : OMS/OIT 2021 · Lancet 2021 · OEM 2025 · Stanford 2014 · INRS/ANACT
      </div>`;
  }


  function initWhatIf() {
    const container = document.getElementById('whatif-container');
    if (!container || DTE.whatif) return;
    const chartInstance = new TimelineChart(null);
    DTE.whatif = new WhatIfPanel(container, DTE.simulator, chartInstance);
    DTE.whatif.render();
  }

  /* ── 7. Header — boutons ─────────────────────────────────────── */
  function wireButtons() {
    // RETOUR
    document.getElementById('btn-back')?.addEventListener('click', () => {
      if (window.parent && window.parent !== window) {
        try {
          const ov = window.parent.document.getElementById('dte-overlay');
          if (ov) { ov.classList.remove('open'); window.parent.document.body.style.overflow = ''; return; }
        } catch(e) {}
      }
      if (window.history.length > 1) window.history.back();
      else window.close();
    });

    // SOURCES / GLOSSAIRE
    document.getElementById('btn-glossary')?.addEventListener('click', () => DTE.glossary?.open());

    // AIDE
    const helpModal = document.getElementById('help-modal');
    document.getElementById('btn-help')?.addEventListener('click', () => helpModal?.classList.remove('hidden'));
    document.getElementById('help-close')?.addEventListener('click', () => helpModal?.classList.add('hidden'));
    document.getElementById('help-ok')?.addEventListener('click',    () => helpModal?.classList.add('hidden'));
    helpModal?.querySelector('.modal-overlay')?.addEventListener('click', () => helpModal.classList.add('hidden'));

    // CHECK-IN
    document.getElementById('btn-checkin')?.addEventListener('click', () => DTE.checkin.open());

    // RYTHME DE VIE
    document.getElementById('btn-lifestyle')?.addEventListener('click', () => {
      DTE.lifestyle ? DTE.lifestyle.open() : console.warn('Lifestyle not loaded');
    });
    // Mettre à jour le sous-titre si profil existe
    if (LifestylePanel && LifestylePanel.hasData()) {
      const sub = document.getElementById('lifestyle-sub');
      if (sub) sub.textContent = '✓ Profil enregistré — cliquer pour modifier';
    }

    // CONSEILLER
    document.getElementById('btn-ai')?.addEventListener('click', () => DTE.ai.open());

    // REFRESH (ancien bouton header)
    document.getElementById('btn-refresh')?.addEventListener('click', () => {
      runAnalysis();
      DTE.notifs.show('Analyse actualisée', 'info', '↺');
    });

    // SYNC (bouton dans le panel actions) — mêmes fonctions exactes que btn-refresh
    document.getElementById('btn-sync-visible')?.addEventListener('click', () => {
      runAnalysis();
      DTE.notifs.show('Analyse actualisée', 'info', '↺');
    });

    // Jours de repos — charger l'état sauvegardé
    const _savedRest = JSON.parse(localStorage.getItem('DTE_REST_DAYS') || '{"sat":true,"sun":true}');
    const satCb = document.getElementById('dte-rest-sat');
    const sunCb = document.getElementById('dte-rest-sun');
    if (satCb) satCb.checked = _savedRest.sat !== false;
    if (sunCb) sunCb.checked = _savedRest.sun !== false;

    // PDF désactivé
  }

  /* ── 8. Écran bienvenue (1ère visite) ────────────────────────── */
  function showWelcomeIfNeeded() {
    if (localStorage.getItem('DTE_WELCOMED')) return;
    const ov = document.createElement('div');
    ov.id = 'welcome-overlay';
    ov.innerHTML = `
      <div class="welcome-box">
        <div class="welcome-logo">DIGITAL TWIN</div>
        <div class="welcome-sub">MODULE 4 — ANALYSE PRÉDICTIVE</div>
        <div class="welcome-desc">
          Votre jumeau numérique analyse vos heures travaillées pour calculer votre état de santé et anticiper la fatigue, le stress et les risques biologiques.
        </div>
        <div class="welcome-steps">
          <div class="welcome-step"><span class="welcome-step-num">1</span><span>Ce module lit automatiquement vos données de M1 (heures) et M2 (paie). Aucune saisie supplémentaire.</span></div>
          <div class="welcome-step"><span class="welcome-step-num">2</span><span>Il calcule votre fatigue, stress et performance, et prédit votre état dans 30 jours.</span></div>
          <div class="welcome-step"><span class="welcome-step-num">3</span><span>Simulez des scénarios, consultez 1000 conseils juridiques et de prévention.</span></div>
        </div>
        <div style="margin:14px 0 12px;padding:10px 12px;background:rgba(255,179,0,0.06);
          border:1px solid rgba(255,179,0,0.25);border-left:3px solid rgba(255,179,0,0.6);
          font-size:10px;color:rgba(255,255,255,0.6);line-height:1.6;">
          <b style="color:rgba(255,179,0,0.9);">⚠ Outil d'aide à la prévention</b><br>
          Les calculs sont des <b>estimations statistiques</b> basées sur des études scientifiques.
          Ils peuvent ne pas refléter exactement votre situation personnelle.<br>
          <b style="color:rgba(0,255,204,0.8);">🔒 Confidentialité :</b> toutes vos données restent sur votre appareil.
          Rien n'est envoyé à un serveur.
        </div>
        <button class="btn btn--animus" id="welcome-start" style="width:100%;justify-content:center;padding:12px;">
          &#9654;&nbsp; VOIR MON ANALYSE
        </button>
      </div>`;
    document.body.appendChild(ov);
    document.getElementById('welcome-start')?.addEventListener('click', () => {
      localStorage.setItem('DTE_WELCOMED', '1');
      ov.classList.add('hide');
      setTimeout(() => {
        ov.remove();
        // Ouvrir l'aide en premier, puis check-in ensuite
        const helpM = document.getElementById('help-modal');
        if (helpM) {
          helpM.classList.remove('hidden');
          // Quand l'aide est fermée, proposer le check-in
          const onHelpClose = () => {
            helpM.removeEventListener('click', onHelpClose);
            setTimeout(() => { if (DTE.checkin) DTE.checkin.checkIfNeeded(); }, 400);
          };
          helpM.querySelector('#help-ok')?.addEventListener('click', onHelpClose, { once:true });
          helpM.querySelector('#help-close')?.addEventListener('click', onHelpClose, { once:true });
          helpM.querySelector('.modal-overlay')?.addEventListener('click', onHelpClose, { once:true });
        } else {
          if (DTE.checkin) DTE.checkin.checkIfNeeded();
        }
      }, 600);
    });
  }

  /* ── 9. Events ───────────────────────────────────────────────── */
  document.addEventListener('dte:checkin', () => {
    DTE.notifs.show('Check-in enregistré', 'info', '📋');
    runAnalysis();
  });

  /* ── Init ────────────────────────────────────────────────────── */
  wireButtons();
  runAnalysis();
  showWelcomeIfNeeded();

  // ── LIVE SYNC — re-analyse toutes les 3s
  let _syncHash = '';
  setInterval(() => {
    try {
      // Hash rapide des données M1 pour détecter un vrai changement
      const yr   = localStorage.getItem('ACTIVE_YEAR_SUFFIX') || '';
      const m1raw = localStorage.getItem('DATA_REPORT_' + yr) || '';
      const m2raw = localStorage.getItem('CA_HS_TRACKER_V1_DATA_' + yr) || '';
      const hash  = m1raw.length + '|' + m2raw.length + '|' + yr;
      if (hash === _syncHash) return; // rien changé → pas de re-analyse
      _syncHash = hash;

      const s = DTE.engine.analyze();
      DTE._state = s;
      const _risks  = DTE.risks.detect(s.scores, s.norm);
      const _advice = buildAdvice(s.scores, _risks, s.norm);
      DTE.lastRisks  = _risks;
      DTE.lastAdvice = _advice;

      // Mettre à jour TOUT : dashboard + twin + footer
      DTE.dashboard.render(s, _risks, _advice);
      if (DTE.twin) DTE.twin.update(s.scores);

      // Mettre à jour la vue active si prédictions/simulation
      const activeView = document.querySelector('.view:not(.hidden)');
      if (activeView) {
        const vid = activeView.id;
        if (vid === 'view-predictions') renderPredictions(s);
        if (vid === 'view-whatif' && DTE.whatif) DTE.whatif.render();
        if (vid === 'view-heatmap' && DTE.heatmap) DTE.heatmap.render(s);
      }

      // Mettre à jour le footer
      const el = id => document.getElementById(id);
      if(el('footer-year'))    el('footer-year').textContent    = 'ANNÉE ' + (s.raw && s.raw.year || '');
      if(el('footer-time'))    el('footer-time').textContent    = 'ANALYSE : ' + new Date().toTimeString().slice(0,5);
      if(el('footer-status'))  el('footer-status').textContent  = s.scores._hasData ? '■ SYNCHRONISÉ' : '○ EN ATTENTE';
    } catch(_) {}
  }, 3000);

  // Exposer le forçage de sync (bouton visible)
  // Helper : retourner les jours de repos selon les checkboxes
  window._getRestDays = () => {
    const sat = document.getElementById('dte-rest-sat')?.checked !== false;
    const sun = document.getElementById('dte-rest-sun')?.checked !== false;
    const days = [];
    if (sun) days.push(0);   // 0 = dimanche en JS
    if (sat) days.push(6);   // 6 = samedi en JS
    return days.length ? days : [0]; // au minimum dimanche
  };

  window._updateRestDays = () => {
    const sat = document.getElementById('dte-rest-sat')?.checked;
    const sun = document.getElementById('dte-rest-sun')?.checked;
    localStorage.setItem('DTE_REST_DAYS', JSON.stringify({sat:!!sat, sun:!!sun}));
    // Re-lancer les prédictions avec les nouveaux jours de repos
    if (DTE._state) renderPredictions(DTE._state);
    DTE.notifs.show('Jours de repos mis à jour', 'info', '📅');
  };

  window._forcSync = () => {
    try {
      _syncHash = ''; // forcer la re-analyse
      const s = DTE.engine.analyze();
      DTE._state = s;
      const _r2 = DTE.risks.detect(s.scores, s.norm);
      const _a2 = buildAdvice(s.scores, _r2, s.norm);
      DTE.lastRisks  = _r2;
      DTE.lastAdvice = _a2;
      DTE.dashboard.render(s, _r2, _a2);
      if (DTE.twin) DTE.twin.update(s.scores);
      const activeView = document.querySelector('.view:not(.hidden)');
      if (activeView) {
        const vid = activeView.id;
        if (vid === 'view-predictions') renderPredictions(s);
      }
      // Feedback visuel
      const btn = document.getElementById('btn-sync-visible');
      if (btn) {
        btn.style.background = 'rgba(0,255,204,0.3)';
        btn.innerHTML = '<span style="font-size:14px;">✓</span> SYNCHRONISÉ';
        setTimeout(() => {
          btn.style.background = 'rgba(0,255,204,0.12)';
          btn.innerHTML = '<span style="font-size:14px;">↻</span> SYNC';
        }, 1500);
      }
    } catch(e) { console.warn('sync error', e); }
  };

  // Aussi câbler btn-refresh
  document.getElementById('btn-refresh')?.addEventListener('click', window._forcSync);
});
