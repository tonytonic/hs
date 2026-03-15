/**
 * dte-simulator.js — Simulation biomécanique jour par jour
 *
 * ═══ SOURCES SCIENTIFIQUES ═══════════════════════════════════════
 * [1] OMS/OIT 2021 (Pega)           ≥55h/sem : RR=1.35 AVC, RR=1.17 cardio
 * [2] Lancet 2021 (Ervasti)         HR=1.68 mort cardio, HR=1.37 infections
 *                                   HR=1.18 diabète, HR=1.15 musculo
 * [3] OEM 2025 (Jang/Yonsei)       ≥52h/sem : +19% gyrus frontal, 17 régions
 * [4] Pencavel 2014 (Stanford)      Déclin non-linéaire >50h, falaise >55h
 * [5] Thompson 2022 (Frontiers)     Cortisol +14% dès 1 nuit privation
 * [6] J.Occup.Health 2021           Dose-réponse heures→burnout, 6 mois décisifs
 * [7] Kivimäki 2015 (Lancet)        603 838 individus, RR=1.33 AVC
 * [8] ANACT/INRS France             RPS, cortisol chronique, fatigue cumulative
 * [9] Nature Hum.Behav. 2025        ★ NOUVEAU — Fan, Schor et al.
 *     (Fan W., Schor J.B., Kelly O., Gu G., Boston College/UCD)
 *     2 896 employés, 141 organisations, 6 pays, 6 mois de suivi
 *     4 jours/sem = burnout -0.44/5, satisfaction +0.52/10,
 *     santé mentale +0.39/5, santé physique +0.28/5
 *     Médiateurs : sommeil, fatigue, capacité de travail (work ability)
 *     90% des entreprises ont continué après l'essai
 *     → Calibre les coefficients de récupération (repos hebdomadaire)
 *     → Quantifie le gain santé d'une réduction d'heures
 * ═════════════════════════════════════════════════════════════════
 */
(function(global){
'use strict';

/* ── PARAMÈTRES BIOMÉDICAUX ─────────────────────────────────────── */
const BIO = {
  // Seuils semaine (heures)
  H_OPTIMAL:   35,   // OMS optimal
  H_LEGAL:     48,   // Art. L3121-20 France
  H_OCDE:      50,   // Pencavel : chute productivité
  H_CEREBRAL:  52,   // OEM 2025 : +19% gyrus frontal
  H_CV:        55,   // OMS 2021 : +35% AVC, +17% cardio

  // Fatigue — INRS + J.Occup.Health 2021 + OMS/OIT
  // Calibration validée : 35h→0%, 45h→8%/J+30 44%/J+90 (Phase 2), 55h→alerte rapide
  // Coefficient dynamique selon charge : fatPerHS(hs) = 0.013/0.017/0.019
  FAT_PER_HS_BASE:  0.013,  // ≤40h/sem : quasi stable
  FAT_PER_HS_MID:   0.020,  // 40-48h/sem : 45h→15%/J+30, 48h→50%/J+30 (INRS)
  FAT_PER_HS_HIGH:  0.017,  // >48h/sem : nonlinear + cumul font le reste
  FAT_NONLINEAR:    0.08,   // amplification légère si déjà fatigué (réduit de 0.65)
  FAT_BASE:         0.000,  // supprimé — inclus dans RECOVERY
  FAT_CONSEC:       0.000,  // supprimé — muscle recovery déjà dans REC_WEEKEND

  // Récupération (INRS + Nature Hum.Behav. 2025 Fan et al.)
  REC_REST:         0.075,  // jour de repos complet
  REC_WEEKEND:      0.055,  // par jour week-end (2j = 0.110/sem)
  REC_VACANCES:     0.130,  // jour de vacances
  REC_4DAY_BONUS:   0.018,  // bonus 4j/sem (Nature 2025)
  // Facteurs cumulatifs (J.Occup.Health : 6 mois décisifs) — réduits vs ancien
  CUMUL_4W:         1.10,   // 4 semaines
  CUMUL_8W:         1.20,   // 2 mois
  CUMUL_16W:        1.35,   // 4 mois
  CUMUL_24W:        1.52,   // 6 mois — seuil J.Occup.Health 2021

  // Stress/Cortisol — Thompson 2022 + ANACT (recalibré)
  STR_PER_HS:     0.010,  // cortisol par heure HS (réduit)
  STR_FAT_AMP:    0.009,  // fatigue amplifie le stress (réduit)
  STR_REC_REST:   0.055,  // décroissance repos
  STR_REC_DAY:    0.008,  // décroissance quotidienne en travaillant

  // Performance — Pencavel 2014 (non-linéaire)
  // Implémenté via la fonction pencavelPerf() de l'engine

  // Risque CV (OMS 2021 + Lancet 2021 HR=1.68 mort cardio)
  CV_PER_H:       0.010,  // par heure au-delà de 48h/sem par semaine
  CV_MAX:         0.60,

  // Risque cognitif (OEM 2025 — réversible mais lent)
  COG_PER_H:      0.016,  // par heure au-delà de 52h/sem
  COG_MAX:        0.70,

  // Seuils phases
  P1_MAX: 0.35,  // adaptation
  P2_MAX: 0.60,  // fatigue chronique
  P3_MAX: 0.80,  // surmenage
  // > P3_MAX = burn-out (P4)

  ALERTE:   60,
  RISQUE:   75,
  CRITIQUE: 85,
  URGENCE:  95,
};

/* ── PHASES PHYSIOLOGIQUES ──────────────────────────────────────── */
const PHASES = [
  {
    id:1, label:'EN FORME',          color:'#00ccaa',
    fatMin:0,    fatMax:0.35, weekH:[0, 40],
    fatMin:0,    fatMax:0.35, weekH:[0, 40],
    desc:'Vous gérez bien votre charge. Récupération efficace.',
    symptoms:['Légère fatigue en fin de journée','Sommeil réparateur','Bonne concentration','Récupération rapide le week-end'],
    legal:null,
    refs:['OMS : zone optimale ≤40h/sem', 'Pencavel 2014 : productivité maximale'],
  },
  {
    id:2, label:'VIGILANCE',         color:'#c89a18',
    fatMin:0.35, fatMax:0.60, weekH:[40, 52],
    fatMin:0.35, fatMax:0.60, weekH:[40, 52],
    desc:'La fatigue s\'accumule. Surveillez les signaux. Hygiène de vie importante.',
    symptoms:['Difficultés d\'endormissement','Fatigue persistante au réveil','Irritabilité','Tensions musculaires','Baisse de concentration progressive'],
    legal:'Art. L4121-1 C. trav. — Obligation de prévention employeur',
    refs:['Thompson 2022 : cortisol +14% après 1 nuit de privation','ANACT : stress chronique','J.Occup.Health 2021 : dose-réponse heures → burnout'],
  },
  {
    id:3, label:'SURMENAGE',         color:'#c8601a',
    fatMin:0.60, fatMax:0.80, weekH:[52, 55],
    desc:'+19% volume gyrus frontal (OEM 2025). Douleurs physiques. Productivité négative.',
    context:'Au-delà de 52h/sem, l\'IRM montre des changements dans 17 régions cérébrales (attention, planification, régulation émotionnelle). Selon Pencavel (Stanford), chaque heure supplémentaire >55h n\'apporte aucun gain de productivité. Risque cardiovasculaire croissant (Lancet 2021 : HR=1.68).',
    symptoms:['Maux de tête fréquents','Douleurs dos et nuque','Anxiété chronique','Décisions moins fiables','Risque d\'erreurs multiplié','Risque cardiovasculaire élevé'],
    legal:'Art. L4131-1 C. trav. — Conditions de droit de retrait',
    refs:['OEM 2025 (Jang) : +19% gyrus frontal à ≥52h/sem','Pencavel 2014 : productivité nulle >55h','Lancet 2021 : HR=1.68 mort cardio'],
  },
  {
    id:4, label:'ÉPUISEMENT',        color:'#c82838',
    fatMin:0.80, fatMax:1.00, weekH:[55, 999],
    fatMin:0.80, fatMax:1.00, weekH:[55, 999],
    desc:'Signaux d\'alarme biologiques. Risque cardiovasculaire établi (OMS 2021). Récupération longue.',
    symptoms:['Épuisement total non récupérable','Troubles anxieux ou dépressifs','Risque AVC +35% (OMS)','Risque cardio +17% (OMS)','Modifications cérébrales (OEM 2025)','Arrêt médical très probable'],
    legal:'Art. L4121-1 C. trav. + Recommandation HAS 2017 — Syndrome épuisement professionnel',
    refs:['OMS/OIT 2021 : 745 194 décès, RR=1.35 AVC','Lancet 2021 (Ervasti) : HR=1.68 mort cardio','OEM 2025 (Jang) : 17 régions cérébrales','HAS 2017 : burn-out professionnel reconnu'],
  },
];

function getPhase(fat) {
  const f = Math.max(0, fat);
  return PHASES.find(p => f >= p.fatMin && f < p.fatMax) || PHASES[0];
}

/* ── COURBE PENCAVEL (réutilisée depuis engine si disponible) ─── */
function pencavelPerf(weeklyH) {
  if (typeof DTEEngine !== 'undefined' && DTEEngine.pencavelPerf) return DTEEngine.pencavelPerf(weeklyH);
  if (weeklyH <= 35) return 1.000;
  if (weeklyH <= 40) return 1.000 - (weeklyH - 35) * 0.003;
  if (weeklyH <= 48) return 0.985 - (weeklyH - 40) * 0.016;
  if (weeklyH <= 50) return 0.857 - (weeklyH - 48) * 0.030;
  if (weeklyH <= 55) return 0.797 - (weeklyH - 50) * 0.055;
  if (weeklyH <= 70) return 0.522 - (weeklyH - 55) * 0.022;
  return 0.192;
}

/* ── SIMULATEUR ─────────────────────────────────────────────────── */
class DTESimulator {
  constructor(engine) { this._engine = engine; }

  /**
   * Simulation jour par jour
   * @param {Object} plan {days, hoursPerDay, restDays, vacanceDays}
   * @param {Object} initialScores scores actuels du moteur
   */
  run(plan = {}, initialScores = null) {
    const D   = this._engine.getDefaults();
    const { days = 30, hoursPerDay = 0, restDays = [0], vacanceDays = [] } = plan;
    const nb  = Math.min(days, D.MAX_SIM || 180);
    const s   = initialScores || (this._engine.getState() && this._engine.getState().scores) || {};
    const motiv = this._engine._lastNorm ? this._engine._lastNorm.motiv : 0.5;

    let fat  = s._f || 0;
    let str  = s._s || 0;
    let perf = s._p || 0.70;
    let cvAcc = 0;

    const weeklyH = (D.BASE_JOUR + hoursPerDay) * 5;
    const today   = new Date();
    const timeline = [];
    let totFat = 0, totStr = 0, totPerf = 0;
    let maxFat = fat, daysAlert = 0, daysCrit = 0, daysBurnout = 0;
    let cumulWeeks   = s._cumulWeeks || 0;
    let consecDays   = 0;

    for (let i = 0; i < nb; i++) {
      const dt  = new Date(today); dt.setDate(dt.getDate() + i + 1);
      const dow = dt.getDay();
      const isRest    = restDays.includes(dow);
      const isVacance = vacanceDays && vacanceDays.includes(i);
      const hsH       = (isRest || isVacance) ? 0 : hoursPerDay;
      const totalH    = (isRest || isVacance) ? 0 : D.BASE_JOUR + hsH;

      // Mise à jour semaines cumulées (J.Occup.Health : 6 mois)
      if (i > 0 && i % 7 === 0) {
        if (weeklyH > BIO.H_OPTIMAL) cumulWeeks++;
        else cumulWeeks = Math.max(0, cumulWeeks - 0.3); // décroissance lente
      }

      // Facteur cumulatif INRS (6 mois décisifs)
      const cumulF = cumulWeeks >= 24 ? BIO.CUMUL_24W
                   : cumulWeeks >= 16 ? BIO.CUMUL_16W
                   : cumulWeeks >= 8  ? BIO.CUMUL_8W
                   : cumulWeeks >= 4  ? BIO.CUMUL_4W
                   : 1.0;

      // ── FATIGUE (INRS — dose-réponse non-linéaire) ──────────────
      if (isRest || isVacance) {
        // Nature Hum.Behav. 2025 : repos supplémentaire amplifie la récupération
        const rec4day = (restDays.includes(5) || restDays.includes(6)) ? BIO.REC_4DAY_BONUS : 0;
        const rec     = isVacance ? BIO.REC_VACANCES : BIO.REC_WEEKEND + rec4day;
        fat           = Math.max(0, fat - rec / Math.max(1, cumulF * 0.92));
        consecDays    = 0;
      } else {
        consecDays++;
        // Coefficient dynamique selon charge (3 paliers calibrés OMS/INRS/J.Occup.Health)
        const fatCoef   = hsH <= 1 ? BIO.FAT_PER_HS_BASE
                        : hsH <= 3 ? BIO.FAT_PER_HS_MID
                        :            BIO.FAT_PER_HS_HIGH;
        const nonLinear = 1 + fat * BIO.FAT_NONLINEAR;
        const fatLoad   = hsH * fatCoef * nonLinear * cumulF;
        fat = Math.min(1, fat + fatLoad - D.RECOVERY);
      }

      // ── STRESS/CORTISOL (Thompson 2022 + ANACT) ─────────────────
      if (isRest || isVacance) {
        str = Math.max(0, str - BIO.STR_REC_REST);
      } else {
        const strLoad = hsH * BIO.STR_PER_HS + fat * BIO.STR_FAT_AMP * cumulF;
        str = Math.min(1, str + strLoad - BIO.STR_REC_DAY);
      }

      // ── PERFORMANCE (Pencavel 2014) ──────────────────────────────
      const perfBase = pencavelPerf(weeklyH) * (1 + motiv * 0.10);
      const perfDeg  = fat * 0.60 + str * 0.12;
      // Dégradation cognitive OEM 2025 (>52h/sem)
      const cogDeg   = weeklyH >= BIO.H_CEREBRAL
        ? Math.min(0.30, (weeklyH - BIO.H_CEREBRAL) * 0.015 * (1 + cumulWeeks / 12))
        : 0;
      perf = Math.max(0.05, Math.min(1, perfBase * (1 - cogDeg) - perfDeg));

      // ── RISQUES SPÉCIFIQUES ──────────────────────────────────────
      // CV OMS 2021 (accumulation dose-temps)
      if (weeklyH >= BIO.H_LEGAL) cvAcc += (weeklyH - BIO.H_LEGAL) * BIO.CV_PER_H / 7;
      const cvRiskDay  = Math.min(BIO.CV_MAX, cvAcc + fat * 0.12 + str * 0.08);
      const cogRiskDay = weeklyH >= BIO.H_CEREBRAL
        ? Math.min(BIO.COG_MAX, (weeklyH - BIO.H_CEREBRAL) * BIO.COG_PER_H * (1 + cumulWeeks / 15))
        : 0;

      // Phase + alertes
      const phase  = getPhase(fat);
      const fScore = Math.round(Math.max(0, fat) * 100);
      let alert    = 'OK';
      if      (fScore >= BIO.URGENCE)  { alert = 'URGENCE';  daysBurnout++; daysCrit++; }
      else if (fScore >= BIO.CRITIQUE) { alert = 'CRITIQUE'; daysCrit++; }
      else if (fScore >= BIO.RISQUE)   { alert = 'RISQUE';   daysAlert++; }
      else if (fScore >= BIO.ALERTE)   { alert = 'ALERTE';   daysAlert++; }

      if (fat > maxFat) maxFat = fat;
      totFat += Math.max(0,fat); totStr += Math.max(0,str); totPerf += perf;

      timeline.push({
        date:        dt.toISOString().slice(0, 10),
        jour:        ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][dow],
        isRest:      isRest || isVacance,
        hoursExtra:  hsH,
        totalHours:  totalH,
        weeklyHours: weeklyH,
        fatigue:     fScore,
        stress:      Math.round(str * 100),
        performance: Math.round(perf * 100),
        cvRisk:      Math.round(cvRiskDay * 100),
        cogRisk:     Math.round(cogRiskDay * 100),
        phase:       phase.id,
        phaseLabel:  phase.label,
        phaseColor:  phase.color,
        alert,
        cumulWeeks:  Math.round(cumulWeeks),
      });
    }

    const avg        = v => Math.round(v / nb * 100);
    const avgFatVal  = Math.max(0, avg(totFat)) / 100;  // phase basée sur la moyenne
    const finalPhase = getPhase(avgFatVal);  // plus cohérent que fat du dernier jour
    return {
      timeline,
      summary: {
        avgFatigue:    Math.max(0, avg(totFat)),
        maxFatigue:    Math.round(maxFat * 100),
        avgStress:     Math.max(0, avg(totStr)),
        avgPerformance:avg(totPerf),
        finalFatigue:  Math.round(Math.max(0, fat) * 100),
        finalStress:   Math.round(Math.max(0, str) * 100),
        finalPerf:     Math.round(perf * 100),
        finalCvRisk:   Math.round(Math.min(BIO.CV_MAX, cvAcc + fat * 0.12) * 100),
        daysAlert, daysCrit, daysBurnout,
        finalPhase,
        cumulWeeks:    Math.round(cumulWeeks),
        weeklyHours:   weeklyH,
        score: Math.max(0, avg(totPerf) - daysCrit * 12 - daysAlert * 4 - daysBurnout * 20),
      }
    };
  }

  /**
   * 6 scénarios comparatifs — seuils OMS/OCDE/Pencavel
   */
  scenarios(days = 30, norm = null, initialScores = null) {
    const n      = norm || (this._engine.getState() && this._engine.getState().norm);
    const scores = initialScores || (this._engine.getState() && this._engine.getState().scores);
    if (!n || !scores) return null;
    const D   = this._engine.getDefaults();
    // hs = HS par jour TRAVAILLÉ (lun-ven) basé sur la semaine courante
    const weeklyHcur = n._recentWeeklyH || 35;
    const avg  = Math.max(0, (weeklyHcur - 35) / 5);  // HS/jour travaillé
    const base = D.BASE_JOUR;

    const _rdSc = (typeof window !== 'undefined' && window._getRestDays) ? window._getRestDays() : [0,6];
    const plans = [
      {
        key:'urgence',    emoji:'🔥', label:'Rush extrême +4h/j',
        desc:`${(base+avg+4).toFixed(1)}h/j — Territoire Pencavel : 0% de productivité supplémentaire`,
        hs: avg+4, rest:_rdSc, oms: this._omsLabel((base+avg+4)*5),
      },
      {
        key:'actuel',     emoji:'▶', label:'Rythme actuel',
        desc:`${(base+avg).toFixed(1)}h/j — Continuation exacte de la semaine écoulée`,
        hs: avg, rest:_rdSc, oms: this._omsLabel((base+avg)*5),
      },
      {
        key:'reduit',     emoji:'⬇', label:'Réduction légère -1h/j',
        desc:`${(base+Math.max(0,avg-1)).toFixed(1)}h/j — Amélioration progressive`,
        hs: Math.max(0,avg-1), rest:_rdSc, oms: this._omsLabel((base+Math.max(0,avg-1))*5),
      },
      {
        key:'optimise',   emoji:'⚡', label:'Optimisé -2h/j (OCDE)',
        desc:`${(base+Math.max(0,avg-2)).toFixed(1)}h/j — Zone productive selon OCDE`,
        hs: Math.max(0,avg-2), rest:_rdSc, oms: this._omsLabel((base+Math.max(0,avg-2))*5),
      },
      {
        key:'equilibre',  emoji:'⚖', label:'Équilibre 35h/sem (OMS)',
        desc:'7h/j + week-ends — Zone optimale OMS et Pencavel',
        hs: 0, rest:[0,6], oms:'✓ OMS optimal — productivité maximale (Pencavel)',
      },
      {
        key:'recuperation',emoji:'🛡', label:'Récupération active',
        desc:'35h + week-ends — Récupération physiologique INRS',
        hs: 0, rest:[0,6], oms:'✓ Zone récupération — INRS recommandé',
      },
    ];

    const results = plans.map(p => {
      const sim = this.run({ days, hoursPerDay: p.hs, restDays: p.rest }, scores);
      const q   = sim.summary.avgPerformance * 0.40
                - sim.summary.avgFatigue    * 0.30
                - sim.summary.avgStress     * 0.18
                - sim.summary.finalCvRisk   * 0.12;
      return { ...p, summary: sim.summary, _sim: sim, quality: Math.round(q) };
    });

    results.sort((a, b) => b.quality - a.quality);
    return { scenarios: results, best: results[0] };
  }

  /**
   * Prédiction état futur avec phases, risques OMS, changements cérébraux
   */
  futurState(days = 30, norm = null, initialScores = null) {
    const n      = norm || (this._engine.getState() && this._engine.getState().norm);
    const scores = initialScores || (this._engine.getState() && this._engine.getState().scores);
    if (!n || !scores) return null;
    const D   = this._engine.getDefaults();
    // Lire les jours de repos configurés par l'utilisateur
    const _rd = (typeof window !== 'undefined' && window._getRestDays) ? window._getRestDays() : [0,6];
    const sim = this.run({ days, hoursPerDay: Math.max(0, ((n._recentWeeklyH||35)-35)/5), restDays: _rd }, scores);
    const future = new Date(); future.setDate(future.getDate() + days);

    // Transitions de phase
    const phaseChanges = [];
    let lastP = sim.timeline[0]?.phase;
    sim.timeline.forEach((d, i) => {
      if (d.phase !== lastP) {
        phaseChanges.push({ day: i+1, date: d.date, from: lastP, to: d.phase, label: d.phaseLabel, color: d.phaseColor });
        lastP = d.phase;
      }
    });

    const weeklyH = n._recentWeeklyH || (D.BASE_JOUR * 5);
    return {
      days, date: future.toISOString().slice(0, 10),
      fatigue:     sim.summary.finalFatigue,
      stress:      sim.summary.finalStress,
      performance: sim.summary.finalPerf,
      cvRisk:      sim.summary.finalCvRisk,
      alertDays:   sim.timeline.filter(d => d.alert !== 'OK'),
      phaseChanges,
      finalPhase:  sim.summary.finalPhase,
      omsRisk:     this._omsRisk(weeklyH, sim.summary.cumulWeeks),
      brainRisk:   this._brainRisk(weeklyH, sim.summary.cumulWeeks),
      weeklyH,
      summary:     sim.summary,
    };
  }

  _omsLabel(h) {
    if (h >= BIO.H_CV)       return `⚠ ${h.toFixed(0)}h/sem — RR=1.35 AVC, RR=1.17 cardio (OMS 2021)`;
    if (h >= BIO.H_CEREBRAL) return `⚠ ${h.toFixed(0)}h/sem — +19% gyrus frontal (OEM 2025)`;
    if (h >= BIO.H_OCDE)     return `⚠ ${h.toFixed(0)}h/sem — productivité nulle (Pencavel 2014)`;
    if (h >= BIO.H_LEGAL)    return `→ ${h.toFixed(0)}h/sem — dépasse le légal 48h (Art. L3121-20)`;
    if (h > 40)              return `⚠ ${h.toFixed(0)}h/sem — vigilance OCDE (>40h)`;
    return `✓ ${h.toFixed(0)}h/sem — zone OMS optimale (≤40h)`;
  }

  _omsRisk(h, cumulW) {
    if (h >= BIO.H_CV)
      return { level:'ÉLEVÉ', color:'#ff2244',
        txt:`${h.toFixed(0)}h/sem — OMS/OIT 2021 : RR=1.35 AVC, RR=1.17 cardiopathies. Lancet 2021 : HR=1.68 mort cardiovasculaire.` };
    if (h >= BIO.H_CEREBRAL)
      return { level:'MODÉRÉ', color:'#ff6600',
        txt:`${h.toFixed(0)}h/sem — OEM 2025 (Jang/Yonsei) : +19% gyrus frontal, 17 régions cérébrales affectées.` };
    if (h >= BIO.H_OCDE)
      return { level:'VIGILANCE', color:'#ffb300',
        txt:`${h.toFixed(0)}h/sem — Pencavel/Stanford 2014 : productivité per heure en chute. OCDE : rendements décroissants.` };
    if (h >= BIO.H_LEGAL)
      return { level:'SURVEILLANCE', color:'#00c8ff',
        txt:`${h.toFixed(0)}h/sem — Légal (Art. L3121-20 FR). Fatigue progresse selon J.Occup.Health 2021.` };
    return { level:'NOMINAL', color:'#00ffcc',
      txt:`${h.toFixed(0)}h/sem — Zone OMS optimale 35-40h. Pencavel : productivité maximale.` };
  }

  _brainRisk(h, cumulW) {
    if (h < BIO.H_CEREBRAL) return null;
    const months = (cumulW / 4.33).toFixed(1);
    return {
      txt: `≥52h/sem depuis ~${months} mois — OEM 2025 : modifications potentielles dans 17 régions cérébrales (attention, planification, insula). Potentiellement réversible.`,
      color: h >= BIO.H_CV ? '#ff2244' : '#ff6600',
    };
  }

  getPhases() { return PHASES; }
  getBIO()    { return BIO; }
}

global.DTESimulator = DTESimulator;
if (typeof module !== 'undefined' && module.exports) module.exports = { DTESimulator };
}(typeof window !== 'undefined' ? window : global));
