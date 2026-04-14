/**
 * dte-engine.js — Moteur du Digital Twin
 * LECTURE SEULE — M1 (heures), M2 (paie), RPG (gamification)
 *
 * ═══ BASE SCIENTIFIQUE COMPLÈTE ══════════════════════════════════
 *
 * [1] WHO/ILO 2021 — Pega F. et al., Environment International
 *     745 194 décès en 2016 liés aux longues heures de travail
 *     ≥55h/sem : RR=1.35 AVC, RR=1.17 cardiopathie ischémique
 *     Relation dose-réponse : + longtemps = + risque AVC
 *
 * [2] Lancet Reg. Health Eur. 2021 — Ervasti J. et al.
 *     59 599 personnes, 4 pays européens, 50 pathologies suivies
 *     Longues heures (>48h) vs heures standards (35-40h) :
 *       HR=1.68 mort cardiovasculaire avant 65 ans
 *       HR=1.37 infections bactériennes
 *       HR=1.18 diabète type 2
 *       HR=1.22 blessures/accidents
 *       HR=1.15 troubles musculo-squelettiques
 *
 * [3] Occup. Environ. Med. 2025 — Jang W. et al. (Yonsei/Chung-Ang)
 *     110 soignants, IRM cérébrales
 *     ≥52h/sem : +19% volume gyrus frontal médian gauche (p=0.006)
 *     17 régions affectées : attention, mémoire de travail, planification,
 *     insula (intéroception, régulation émotionnelle)
 *     Changements potentiellement réversibles mais récupération longue
 *
 * [4] Stanford / Pencavel J. (2014) — The Productivity of Working Hours
 *     Déclin non-linéaire : chute progressive >50h/sem
 *     Falaise à 55h : les heures supplémentaires sont contre-productives
 *     70h = même output que 55h (les 15h supplémentaires = 0)
 *
 * [5] Frontiers Behav. Neurosci. 2022 — Thompson K.I. et al.
 *     24h de privation de sommeil : cortisol 8.4 → 9.6 μg/dL (+14%)
 *     Augmentation tension, dépression, colère, fatigue, confusion
 *     Axe HPA perturbé dès la 1ère nuit de dette de sommeil
 *
 * [6] J. Occup. Health 2021 — étude soignants Taïwan
 *     Relation dose-réponse non-linéaire heures → burn-out
 *     Médiatisée par la privation de sommeil (<6h/jour)
 *     Les 6 derniers MOIS comptent autant que la semaine courante
 *
 * [7] Kivimäki M. et al. 2015 (Lancet) — 603 838 individus
 *     RR=1.33 AVC (pooled), RR=1.13 coronarien
 *     Relation dose-réponse spécifique pour l'AVC
 *
 * [8] ANACT/INRS France
 *     Stress chronique = cortisol élevé + variabilité horaire + durée
 *     Fatigue cumulative non-linéaire (dette de sommeil longue)
 *
 * PHASES PHYSIOLOGIQUES (médecine du travail) :
 *   P1 Adaptation      (fat 0-35%)  ≤40h/sem
 *   P2 Fatigue chr.    (fat 35-60%) 40-52h/sem
 *   P3 Surmenage       (fat 60-80%) 52-55h/sem
 *   P4 Burn-out        (fat >80%)   >55h/sem
 * ═════════════════════════════════════════════════════════════════
 */
(function(global){
'use strict';

/* ── CCN : règles actives ── */
function _dteGetCCNRules() {
  if (typeof CCN_API !== 'undefined') {
    const idcc = parseInt((typeof localStorage !== 'undefined' && localStorage.getItem('CCN_IDCC')) || '0');
    return CCN_API.getGroupeForCCN(idcc) || CCN_API.getGroupeForCCN(0);
  }
  return { seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50, contingent:220, debutSemaine:1 };
}

/* ── Jours de repos configurés (HCR : lun/mar, BTP : sam/dim, etc.) ── */
let _restDaysCache = null;
function _getRestDaysSet() {
  if (_restDaysCache) return _restDaysCache;
  try {
    const raw = JSON.parse(localStorage.getItem('DTE_REST_DAYS') || 'null');
    if (Array.isArray(raw) && raw.length > 0) {
      _restDaysCache = new Set(raw);
      return _restDaysCache;
    }
  } catch(_) {}
  _restDaysCache = new Set([0, 6]); // défaut : dim + sam
  return _restDaysCache;
}
function _isRestDow(dow) { return _getRestDaysSet().has(dow); }

/* ── CONSTANTES DE BASE ─────────────────────────────────────────── */
const D = {
  BASE_HEBDO:       35,    // France contrat standard
  BASE_JOUR:         7,    // heures/jour base
  SLEEP_OPTIMAL:     8,    // sommeil optimal (h)
  SLEEP_MIN:         6,    // seuil critique sommeil (J.Occup.Health 2021)
  get CONTINGENT_MAX() { return _dteGetCCNRules().contingent; }, // dynamique CCN
  RECOVERY:       0.011,   // récupération journalière de base
  RECOVERY_WE:    0.045,   // récupération week-end
  LR:             0.05,    // learning rate adaptatif
  // Seuils alertes (concordance phases + légal)
  SEUIL_P2:         35,    // entrée phase 2 (fatigue chronique)
  SEUIL_P3:         60,    // entrée phase 3 (surmenage) — Art. L3121-20
  SEUIL_P4:         80,    // entrée phase 4 (burn-out) — Art. L4121-1
  SEUIL_URGENCE:    95,    // droit de retrait — Art. L4131-1
  // Seuils hebdomadaires OMS/OCDE (h/sem)
  H_OPTIMAL:        40,    // OMS zone optimale
  H_LEGAL:          48,    // Code du travail FR max (Art. L3121-20)
  H_OCDE:           50,    // OCDE : productivité commence à chuter
  H_CEREBRAL:       52,    // OEM 2025 : changements cérébraux
  H_CV:             55,    // OMS 2021 : RR=1.35 AVC
  MAX_SIM:         180,
  VARIAB_WINDOW:     4,    // semaines pour sigma
};

/* ── MODÈLES SCIENTIFIQUES ──────────────────────────────────────── */

/**
 * COURBE PRODUCTIVITÉ — Pencavel (2014), Stanford
 * Non-linéaire : chute progressive >50h, effondrement >55h
 * 70h = même output que 55h → pente nulle au-delà
 */
function pencavelPerf(weeklyH) {
  if (weeklyH <= 35) return 1.000;
  if (weeklyH <= 40) return 1.000 - (weeklyH - 35) * 0.003; // légère baisse
  if (weeklyH <= 48) return 0.985 - (weeklyH - 40) * 0.016; // -1.6%/h
  if (weeklyH <= 50) return 0.857 - (weeklyH - 48) * 0.030; // accélération
  if (weeklyH <= 55) return 0.797 - (weeklyH - 50) * 0.055; // chute
  if (weeklyH <= 70) return 0.522 - (weeklyH - 55) * 0.022; // falaise Pencavel
  return 0.192; // >70h : output plateau (=55h)
}

/**
 * RISQUE CARDIOVASCULAIRE — OMS/OIT 2021 (Pega) + Lancet 2021 (Ervasti)
 * Dose-réponse linéarisé depuis les RR publiés
 * Tient compte de la durée d'exposition (effet cumulatif)
 * FIX BUG 2 : le risque ne tombe PAS à 0 quand heures < 48h.
 * Le cumul dose-temps persiste et décroît lentement (Kivimäki 2015).
 * Semaine < 40h → risque *= 0.85 | Semaine OFF → risque *= 0.6
 */
function cvRisk(weeklyH, cumulMonths) {
  // Composante AIGUË : seulement si >48h actuellement
  let acuteRisk = 0;
  if (weeklyH >= D.H_LEGAL) {
    const excessH    = Math.min(weeklyH - D.H_LEGAL, 20);
    acuteRisk = excessH * 0.028;
  }
  // Composante CUMULATIVE : persiste même si heures actuelles sont basses
  // Kivimäki 2015 : le risque CV est dose-temps, il ne s'efface pas immédiatement
  let cumulRisk = 0;
  if (cumulMonths > 0) {
    cumulRisk = Math.min(0.25, cumulMonths * 0.02);
    // Décroissance si heures actuelles sous le seuil de risque
    if (weeklyH < 40) {
      cumulRisk *= 0.60; // semaine OFF ou légère → réduction forte (OMS/OIT 2021)
    } else if (weeklyH < D.H_LEGAL) {
      cumulRisk *= 0.85; // semaine normale → réduction modérée
    }
  }
  const durationF = Math.min(1.8, 1 + cumulMonths * 0.08);
  return Math.min(0.65, (acuteRisk * durationF) + cumulRisk);
}

/**
 * RISQUE COGNITIF — OEM 2025 (Jang et al.)
 * +19% volume gyrus frontal médian à ≥52h → impact sur attention,
 * mémoire de travail, planification, régulation émotionnelle
 * Seuil : 52h/sem, augmente avec durée d'exposition
 * FIX BUG 3 : accumulation uniquement ≥52h (pas à 45h).
 * Le cerveau récupère PLUS VITE que le cardio (neuroplasticité).
 * Semaine < 52h → risque résiduel *= 0.50 (reset quasi complet après 5j repos)
 */
function cogRisk(weeklyH, cumulWeeks) {
  // Composante AIGUË : uniquement ≥52h (seuil réel des études OEM 2025)
  let acuteRisk = 0;
  if (weeklyH >= D.H_CEREBRAL) {
    const excessH  = weeklyH - D.H_CEREBRAL;
    acuteRisk = excessH * 0.022;
  }
  // Composante CUMULATIVE : trace résiduelle, mais le cerveau récupère vite
  // Draganski 2004 (Nature) : neuroplasticité = semaines, pas mois
  let cumulRisk = 0;
  if (cumulWeeks > 0 && weeklyH < D.H_CEREBRAL) {
    // Résidu cumulatif faible — le cerveau récupère beaucoup plus vite que le cardio
    cumulRisk = Math.min(0.10, cumulWeeks * 0.008);
    if (weeklyH < 40) {
      cumulRisk *= 0.30; // semaine OFF → reset quasi complet
    } else {
      cumulRisk *= 0.50; // semaine normale → forte réduction
    }
  }
  const durationF = Math.min(2.0, 1 + cumulWeeks * 0.05);
  return Math.min(0.70, (acuteRisk * durationF) + cumulRisk);
}

/**
 * RISQUE DIABÈTE — Lancet 2021 (Ervasti), HR=1.18
 * RISQUE MUSCULO-SQUELETTIQUE — HR=1.15
 * RISQUE INFECTIONS — HR=1.37
 * Apparaissent progressivement avec l'accumulation
 */
function metabolicRisk(weeklyH, cumulMonths) {
  if (weeklyH < D.H_LEGAL) return 0;
  const excess = (weeklyH - D.H_LEGAL) / (D.H_CV - D.H_LEGAL);
  const timeF  = Math.min(1, cumulMonths / 12);
  // HR=1.18 diabète → risque relatif excédentaire 0.18 à 1 an ≥55h
  return Math.min(0.40, excess * 0.18 * timeF);
}

function musculoRisk(weeklyH, cumulMonths, consec) {
  const overload = Math.max(0, weeklyH - D.H_LEGAL) / 10;
  const timeF    = Math.min(1, cumulMonths / 6);
  const consecF  = consec >= 7 ? 1.4 : consec >= 5 ? 1.2 : 1.0;
  return Math.min(0.50, overload * 0.15 * timeF * consecF);
}

/**
 * CORTISOL / STRESS — Thompson 2022 (Frontiers Behav.Neurosci.) + ANACT/INRS
 *
 * Dérivation des coefficients depuis Thompson 2022 :
 *   - Cortisol +14% dès la 1ère nuit courte → dérèglement immédiat
 *   - Axe HPA (hypothalamo-hypophyso-surrénalien) se dérègle progressivement
 *   - Exposition chronique : cortisol ne redescend plus à son niveau basal
 *     même le week-end → allostatic load (McEwen 1998, cité par Thompson)
 *   - Saturation de l'axe HPA observée expérimentalement à ~8-10 semaines
 *     d'exposition continue → chronicF max atteint à 10 semaines
 *
 * Dérivation de chronicF :
 *   - À 1 sem  : +15% cortisol baseline (Thompson 2022 Fig.3) → factor 1.15
 *   - À 10 sem : saturation HPA → factor 2.50 (cortisol fixe même WE)
 *   - Pente : (2.50-1) / 10 = 0.15/semaine → min(2.5, 1 + cumW×0.15)
 */
function cortisolModel(weeklyH, variabSigma, cumulWeeks, consecRestDays, consecNonOTDays) {
  const loadF    = Math.max(0, (weeklyH - D.H_OPTIMAL) / (D.H_CV - D.H_OPTIMAL));
  // FIX SIGMA BUG : variabF réduit pour éviter explosion stress à mi-semaine
  // Avant : sigma/8 × 0.45 → sigma=7.8h → variabF=0.97 → stress=80 (irréaliste pour 42h/sem)
  // Après : sigma/12 × 0.25 → sigma=7.8h → variabF=0.65 → contribution 0.16 max
  // La variabilité reste un signal mais ne domine plus loadF (heures réelles)
  const variabF  = Math.min(1, variabSigma / 12);
  // Saturation HPA à ~10 semaines — Thompson 2022 + ANACT
  const chronicF = Math.min(2.5, 1 + cumulWeeks * 0.15);

  // ── DÉCROISSANCE BIOLOGIQUE EN REPOS (Sonnentag 2003 + INRS) ─────────────
  // Le cortisol décroit exponentiellement pendant le repos actif.
  // Sonnentag 2003 : "psychological detachment" = mécanisme clé de récupération.
  // IMPORTANT : le repos ne ramène pas le biologique à 0 immédiatement —
  //   il réduit la charge active mais les traces épigénétiques restent (Thompson 2022).
  let restDecay = 1.0;
  if (consecRestDays >= 1) {
    // Demi-vie HPA CHRONIQUE : 9 jours — Sluiter et al. 2001 (J Occup Environ Med)
    // IMPORTANT : ne pas confondre avec la demi-vie PLASMATIQUE aiguë du cortisol
    // (~60-90 min, Pruessner 1997) qui concerne un pic isolé, pas une dérégulation chronique.
    // Sluiter 2001 : "neuroendocrine recovery from sustained work demands = several weeks"
    // 9j = borne basse pour surcharge chronique modérée (P2/P3 phases INRS)
    // 1j=0.93, 3j=0.79, 7j=0.58, 14j=0.34, 21j=0.20 (presque récupéré)
    const halfLife = 9.0; // jours — Sluiter 2001 (J Occup Environ Med)
    restDecay = Math.exp(-Math.log(2) * consecRestDays / halfLife);
    // Plancher : trace épigénétique / allostatic load résiduelle (McEwen 1998)
    restDecay = Math.max(0.08, restDecay);
  } else if ((consecNonOTDays || 0) >= 1) {
    // ── RÉCUPÉRATION PARTIELLE sur semaines normales sans HS ─────────────────
    // Meijman & Mulder 1998 (Effort-Recovery model) :
    //   "Recovery begins as soon as load returns to baseline" — y compris sans repos complet.
    // Sans détachement psychologique (Sonnentag), la récupération est plus lente :
    //   demi-vie 20j (vs 9j en repos complet). Plancher 0.30 (récupération incomplète sans vrai repos).
    // 5j=0.84, 10j=0.71, 20j=0.50, 30j=0.35 → plancher 0.30
    const halfLifePartial = 20.0;
    restDecay = Math.exp(-Math.log(2) * consecNonOTDays / halfLifePartial);
    restDecay = Math.max(0.30, restDecay); // plancher : sans détachement, récupération incomplète
  }

  return Math.min(1, (loadF * 0.75 + variabF * 0.25) * chronicF * restDecay);
}

/**
 * LECTURE DU PROFIL HORAIRE — DTE_SETTINGS + DTE_SCHEDULE_OVERRIDES_{year}
 *
 * Profil global (DTE_SETTINGS) :
 *   { startH, endH, regimeType, commuteH }
 *   regimeType : 'standard' | 'decale' | 'nuit_partielle' | 'nuit_complete'
 *
 * Override par jour (DTE_SCHEDULE_OVERRIDES_{year}) :
 *   { "2026-03-18": { startH:22, endH:6 }, ... }
 *
 * Priorité : override du jour > profil global > défauts
 */
function readSchedule(dateKey) {
  const defaults = { startH: 9, endH: 17, commuteH: 0, regimeType: 'standard' };
  
  // Vérifier si le suivi des horaires est activé
  const scheduleEnabled = localStorage.getItem('M4_SCHEDULE_ENABLED') !== 'false';
  if (!scheduleEnabled) {
    // Si désactivé, renvoyer des valeurs neutres qui n'impactent pas les scores
    return { startH: 9, endH: 17, commuteH: 0, regimeType: 'standard' };
  }
  
  let profile = { ...defaults };
  
  // 1. Charger le profil global
  try {
    const s = localStorage.getItem('DTE_SETTINGS');
    if (s) {
      const p = JSON.parse(s);
      if (p.startH   !== undefined) profile.startH    = parseFloat(p.startH);
      if (p.endH     !== undefined) profile.endH      = parseFloat(p.endH);
      if (p.commuteH !== undefined) profile.commuteH  = parseFloat(p.commuteH);
      if (p.regimeType)             profile.regimeType = p.regimeType;
    }
  } catch(_) {}
  
  // 2. Appliquer les horaires du jour de semaine si activés
  if (dateKey) {
    const weekScheduleEnabled = localStorage.getItem('DTE_WEEK_SCHEDULE_ENABLED') === 'true';
    if (weekScheduleEnabled) {
      try {
        const weekSchedule = JSON.parse(localStorage.getItem('DTE_WEEK_SCHEDULE') || '{}');
        const [y, m, d] = dateKey.split('-').map(Number);
        const date = new Date(y, m - 1, d);
        const dow = date.getDay(); // 0=dimanche, 1=lundi, etc.
        
        if (weekSchedule[dow]) {
          const daySchedule = weekSchedule[dow];
          if (daySchedule.startH !== undefined) profile.startH = parseFloat(daySchedule.startH);
          if (daySchedule.endH !== undefined) profile.endH = parseFloat(daySchedule.endH);
          // Recalculer le régime
          const passeMinuit = profile.endH < profile.startH;
          let nightH = 0;
          if (passeMinuit) {
            nightH = (24 - Math.max(21, profile.startH)) + Math.min(6, profile.endH);
          } else {
            if (profile.startH < 6)  nightH += Math.min(profile.endH, 6) - profile.startH;
            if (profile.endH   > 21) nightH += profile.endH - Math.max(profile.startH, 21);
          }
          nightH = Math.max(0, nightH);
          if (nightH >= 3)  profile.regimeType = 'nuit_complete';
          else if (nightH >= 1) profile.regimeType = 'nuit_partielle';
          else if (profile.endH > 21 || profile.startH < 6) profile.regimeType = 'decale';
          else profile.regimeType = 'standard';
        }
      } catch(_) {}
    }
  }
  
  // 2b. Roulement de semaines (rotation) — priorité après horaire par jour, avant override
  if (dateKey) {
    try {
      const rotEnabled = localStorage.getItem('DTE_WEEK_ROTATION_ENABLED') === 'true';
      if (rotEnabled) {
        const rotation = JSON.parse(localStorage.getItem('DTE_WEEK_ROTATION') || '[]');
        if (rotation.length > 0) {
          const anchor = localStorage.getItem('DTE_WEEK_ROTATION_ANCHOR') || dateKey;
          const anchorD = new Date(anchor + 'T00:00:00');
          const targetD = new Date(dateKey + 'T00:00:00');
          const diffWeeks = Math.floor(Math.round((targetD - anchorD) / 86400000) / 7);
          const weekIdx = ((diffWeeks % rotation.length) + rotation.length) % rotation.length;
          const rotWeek = rotation[weekIdx];
          if (rotWeek) {
            profile.startH = parseFloat(rotWeek.startH);
            profile.endH   = parseFloat(rotWeek.endH);
          }
        }
      }
    } catch(_) {}
  }

  // 3. Override par jour spécifique (priorité maximale)
  if (dateKey) {
    try {
      const year = dateKey.slice(0, 4);
      const ov   = JSON.parse(localStorage.getItem('DTE_SCHEDULE_OVERRIDES_' + year) || '{}');
      if (ov[dateKey]) {
        const o = ov[dateKey];
        if (o.startH   !== undefined) profile.startH    = parseFloat(o.startH);
        if (o.endH     !== undefined) profile.endH      = parseFloat(o.endH);
        if (o.commuteH !== undefined) profile.commuteH  = parseFloat(o.commuteH);
        if (o.regimeType)             profile.regimeType = o.regimeType;
      }
    } catch(_) {}
  }
  
  return profile;
}

/**
 * CLASSIFICATION LÉGALE DU RÉGIME — Art. L3122-2 Code du travail
 *
 * Travailleur de nuit : ≥3h de travail entre 21h et 6h, ≥2 fois/semaine
 * Horaire décalé      : fin > 21h OU début < 6h (sans atteindre le seuil nuit)
 *
 * Retourne :
 *   { isNight, isNightComplete, nightHours, factor }
 *   factor : multiplicateur biologique sur cortisol + cvRisk
 *     - Nuit complète : 1.40 (IARC 2019 Groupe 2A, Kivimäki 2015 RR×1.4-1.7)
 *     - Nuit partielle : 1.20 (mélatonine partiellement supprimée, INRS)
 *     - Décalé tard    : 1.10 (dette sommeil mécanique, ANACT)
 *     - Standard       : 1.00 (baseline)
 */
function classifySchedule(startH, endH) {
  // Calcul des heures en zone nocturne (21h-6h)
  // endH peut être < startH si passage minuit (ex: 22h-6h)
  const passeMinuit = endH < startH;
  let nightH = 0;
  if (passeMinuit) {
    // Ex: 22h-6h → nuit = (24-22) + 6 = 8h
    nightH = (24 - Math.max(21, startH)) + Math.min(6, endH);
  } else {
    // Ex: 6h-14h → min(endH,6)-max(startH,21) seulement si chevauchement
    if (startH < 6)  nightH += Math.min(endH, 6) - startH;
    if (endH   > 21) nightH += endH - Math.max(startH, 21);
  }
  nightH = Math.max(0, nightH);

  const isNightComplete = nightH >= 3;    // L3122-2 : ≥3h entre 21h-6h
  const isNightPartial  = nightH > 0 && nightH < 3;
  const isDecale        = !isNightComplete && !isNightPartial &&
                          (endH > 21 || startH < 6);

  const factor = isNightComplete ? 1.40
               : isNightPartial  ? 1.20
               : isDecale        ? 1.10
               : 1.00;

  return { isNightComplete, isNightPartial, isDecale, nightH, factor };
}

/**
 * SOMMEIL DISPONIBLE RÉEL — depuis horaires + trajet (Thompson 2022)
 *
 * Calcul :
 *   fenêtre = 24h - durée_travail - (commuteH × 2) - 0.75h (préparation)
 *   sommeil = min(fenêtre, 10.5) → plafonné (on ne dort pas plus de 10.5h)
 *
 * Nuit complète : qualité dégradée — mélatonine supprimée
 *   → sommeil × 0.70 (INRS : sommeil diurne = 70% efficacité du nocturne)
 *
 * Retourne le score de dette de sommeil [0-1] avec la même échelle que
 * l'ancienne sleepDebtScore() pour compatibilité avec le reste du moteur.
 */
function sleepFromSchedule(startH, endH, commuteH, hsExtra, isNightComplete) {
  const totalWorkH  = (endH < startH ? (24 - startH + endH) : (endH - startH)) + (hsExtra || 0);
  const fenetre     = Math.max(0, 24 - totalWorkH - (commuteH * 2) - 0.75);
  let   sommeil     = Math.min(fenetre, 10.5);
  // Nuit : qualité dégradée (INRS — sommeil diurne = 70% efficacité)
  if (isNightComplete) sommeil *= 0.70;
  // Même barème que l'ancien sleepDebtScore()
  if (sommeil >= 8) return 0;
  if (sommeil >= 7) return (8 - sommeil) * 0.10;
  if (sommeil >= 6) return 0.10 + (7 - sommeil) * 0.18;
  return 0.28 + (6 - sommeil) * 0.25; // critique <6h — Thompson 2022
}

/**
 * DETTE DE SOMMEIL — fallback si pas de profil horaire configuré
 * Conservé pour compatibilité
 */
function sleepDebtScore(avgDailyH) {
  const estimatedSleep = Math.max(3, D.SLEEP_OPTIMAL - Math.max(0, avgDailyH - D.BASE_JOUR) * 0.45);
  if (estimatedSleep >= D.SLEEP_OPTIMAL) return 0;
  if (estimatedSleep >= 7) return (D.SLEEP_OPTIMAL - estimatedSleep) * 0.10;
  if (estimatedSleep >= D.SLEEP_MIN) return 0.15 + (7 - estimatedSleep) * 0.18;
  return 0.51 + (D.SLEEP_MIN - estimatedSleep) * 0.25;
}

/* ── MOTEUR ─────────────────────────────────────────────────────── */
// Convertit n'importe quel format d'heures en décimal
// "8:15" → 8.25 | "8.25" → 8.25 | 8.25 → 8.25 | "8,25" → 8.25
function parseHours(v) {
  if (v === null || v === undefined) return 0;
  const s = String(v).trim();
  if (s.includes(':')) {
    const p = s.split(':');
    return (parseFloat(p[0]) || 0) + (parseFloat(p[1]) || 0) / 60;
  }
  return parseFloat(s.replace(',', '.')) || 0;
}

class DTEEngine {
  constructor() {
    this._coefs    = this._loadCoefs();
    this._cache    = null;
    this._lastNorm = null;
  }

  analyze() {
    _restDaysCache = null; // re-lire les jours de repos à chaque analyse
    const raw    = this._readAll();
    const norm   = this._normalize(raw);
    const scores = this._scores(norm, raw);
    this._lastNorm = norm;
    this._cache    = { raw, norm, scores };
    return { raw, norm, scores };
  }

  getState()    { return this._cache; }
  getCoefs()    { return { ...this._coefs }; }
  getDefaults() { return D; }

  /* ── Sources de données (READ ONLY) ─────────────────────────── */
  _readAll() {
    const year = this._year();
    return { year, m1: this._m1(year), m2: this._m2(year), rpg: this._rpg() };
  }

  _year() {
    try {
      const s1 = localStorage.getItem('ACTIVE_YEAR_SUFFIX');
      if (s1) return s1;
      const s2 = localStorage.getItem('CA_HS_TRACKER_V1_ACTIVE_YEAR');
      if (s2) return s2;
    } catch(_) {}
    return String(new Date().getFullYear());
  }

  _m1(year) {
    const r = { days: {}, totalExtra: 0, totalRecup: 0, violations: [], totalWorkedDays: 0, specialDays: {}, vacances: {} };
    try {
      // Essayer plusieurs formats de clé utilisés par M1
      const keys = [
        'DATA_REPORT_' + year,
        'DATA_REPORT_' + new Date().getFullYear(),
        'DATA_REPORT_' + (new Date().getFullYear() - 1),
      ];
      // Aussi scanner toutes les clés localStorage qui ressemblent à DATA_REPORT_
      try {
        for(let i=0; i<localStorage.length; i++){
          const k=localStorage.key(i);
          if(k && k.startsWith('DATA_REPORT_') && !keys.includes(k)) keys.push(k);
        }
      } catch(_) {}
      // Lire les fériés et vacances M4 EN PREMIER — indépendants des données M1
      // (BUG : si M1 vide → return prématuré → vacances jamais lues)
      try {
        const yr = new Date().getFullYear();
        for (const y of [yr-1, yr, yr+1]) {
          const sd = JSON.parse(localStorage.getItem('SPECIAL_DAYS_'+y) || '{}');
          Object.entries(sd).forEach(([date, type]) => { if(type==='ferie') r.specialDays[date] = 'ferie'; });
          const fd = JSON.parse(localStorage.getItem('DTE_FERIES_'+y) || '{}');
          Object.keys(fd).forEach(date => { r.specialDays[date] = 'ferie'; });
          const vac = JSON.parse(localStorage.getItem('DTE_VACANCES_'+y) || '{}');
          Object.keys(vac).forEach(date => { r.vacances[date] = true; });
        }
      } catch(_) {}

      let raw = null;
      for(const k of keys){ raw = localStorage.getItem(k); if(raw && raw !== '{}' && raw !== 'null') break; }
      if (!raw || raw === '{}') return r; // pas de données M1 → on retourne avec vacances/fériés déjà chargés
      const d = JSON.parse(raw);
      // M1 stocke data['2026-03-14']={extra,recup,absent} à la racine
      let days = d.days || d.jours || {};
      if (!Object.keys(days).length && typeof d === 'object') {
        const fk = Object.keys(d)[0] || '';
        if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(fk)) days = d;
      }
      // Fusionner N-1 + N pour la continuité biologique inter-années
      const allDays = {};
      const yearN = parseInt(year) || new Date().getFullYear();
      for (const yn of [yearN - 1, yearN]) {
        try {
          const rawPrev = localStorage.getItem('DATA_REPORT_' + yn);
          if (!rawPrev || rawPrev === '{}') continue;
          const dPrev = JSON.parse(rawPrev);
          let daysPrev = dPrev.days || dPrev.jours || {};
          if (!Object.keys(daysPrev).length && typeof dPrev === 'object') {
            const fk = Object.keys(dPrev)[0] || '';
            if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(fk)) daysPrev = dPrev;
          }
          Object.assign(allDays, daysPrev); // N-1 d'abord, N écrase si doublon
        } catch(_) {}
      }
      // Compléter avec la variable `days` déjà parsée (année active)
      Object.assign(allDays, days);

      for (const [date, e] of Object.entries(allDays)) {
        if (!e || typeof e !== 'object') continue;
        const extra  = parseHours(e.extra ?? e.hs ?? 0);
        const recup  = parseHours(e.recup ?? e.repos ?? 0);
        const absent = parseFloat(e.absent || 0);
        r.days[date] = { extra, recup, absent };
        // totalExtra/totalWorkedDays sur l'année active seulement
        if (date.startsWith(year)) {
          r.totalExtra += extra;
          r.totalRecup += recup;
          if (!absent) r.totalWorkedDays++;
        }
      }
      r.violations = d.violations || [];
    } catch(e) { console.warn('[DTE-E] m1:', e); }
    return r;
  }

  _m2(year) {
    const r = { months: {}, contract: D.BASE_HEBDO, totalWorked: 0, totalDaysOff: 0 };
    try {
      // M2 stocke CA_HS_TRACKER_V1_DATA_{year}
      // Structure : { "2026-03": { days:{"14":2.5,"15":1}, paid:0, carry:0, closing:28 }, ... }
      const yearN2 = parseInt(year) || new Date().getFullYear();
      // Inclure N-1 pour la continuité biologique inter-années
      const keys = [
        'CA_HS_TRACKER_V1_DATA_' + (yearN2 - 1),
        'CA_HS_TRACKER_V1_DATA_' + yearN2
      ];
      try {
        for(let i=0; i<localStorage.length; i++){
          const k=localStorage.key(i);
          if(k && k.startsWith('CA_HS_TRACKER_V1_DATA_') && !keys.includes(k)) keys.push(k);
        }
      } catch(_) {}
      let raw = null;
      for(const k of keys){ raw = localStorage.getItem(k); if(raw && raw !== '{}') break; }
      if (!raw || raw === '{}') return r;
      const d = JSON.parse(raw);
      // M2 n'a pas contractHours dans le stockage, utiliser SETTINGS
      try {
        const sets = JSON.parse(localStorage.getItem('CA_HS_TRACKER_V1_SETTINGS') || '{}');
        if (sets.contractHours) r.contract = parseFloat(sets.contractHours);
      } catch(_) {}
      // d = { "2026-03": { days:{"14":2.5}, paid:0, carry:0, closing:28 }, ... }
      for (const [mk, monthData] of Object.entries(d)) {
        if (!/^\d{4}-\d{2}$/.test(mk)) continue; // ignorer les clés non-mois
        const days = monthData.days || {};
        // Calculer total heures travaillées dans ce mois
        const totalHours = Object.values(days).reduce((s, h) => s + parseHours(h), 0);
        const worked = totalHours + (r.contract / 4.33); // heures base + HS
        const daysCount = Object.keys(days).length;
        r.months[mk] = {
          worked:  Math.round(totalHours * 100) / 100,
          daysOff: 0,
          paid:    monthData.paid || 0,
          carry:   monthData.carry || 0,
          rawDays: days,
        };
        r.totalWorked += totalHours;
      }
    } catch(e) { console.warn('[DTE-E] m2:', e); }
    return r;
  }

  _rpg() {
    const r = { xp: 0, level: 1, badges: [], burnout: 0, violations: [], motivation: 0.5, stress: 0 };
    try {
      // M3 (fox) stocke tout dans FOX_GAME_STATE
      // { xp, level, burnout, badges:["id1",...], player:{xp,level}, hours:{total} }
      const gs = localStorage.getItem('FOX_GAME_STATE');
      if (gs) {
        const g = JSON.parse(gs);
        r.xp      = parseInt(g.xp || (g.player && g.player.xp) || 0);
        r.level   = parseInt(g.level || (g.player && g.player.level) || 1);
        r.burnout = parseFloat(g.burnout || 0);
        if (Array.isArray(g.badges)) r.badges = g.badges;
      }
      // Fallback : anciennes clés séparées (rpg_xp etc.)
      if (r.xp === 0) {
        const x = localStorage.getItem('rpg_xp');
        if (x) r.xp = parseInt(x);
      }
      if (r.level === 1) {
        const l = localStorage.getItem('rpg_level');
        if (l) r.level = parseInt(l);
      }
      if (r.badges.length === 0) {
        const b = localStorage.getItem('rpg_badges');
        if (b) r.badges = JSON.parse(b);
      }
      if (r.burnout === 0) {
        const bu = localStorage.getItem('rpg_burnout');
        if (bu) {
          try { const bv = JSON.parse(bu); r.burnout = parseFloat(bv.score || bv.value || bv || 0); }
          catch(_) { r.burnout = parseFloat(bu) || 0; }
        }
      }

      // M3 violations : FOX_VIOLATIONS_HISTORY = [{date, rule, hours, ...}]
      const vkey = localStorage.getItem('FOX_VIOLATIONS_HISTORY')
                || localStorage.getItem('rpg_violations');
      if (vkey) {
        try { r.violations = JSON.parse(vkey); } catch(_) {}
      }

      // Calcul motivation et stress
      const lf = Math.min(r.level / 50, 1);
      const bf = Math.min(r.badges.length / 20, 1);
      r.motivation = lf * 0.6 + bf * 0.4;
      const now = Date.now();
      const recent = r.violations.filter(vv => {
        const ts = new Date(vv.date || vv.timestamp || vv.ts || 0).getTime();
        return (now - ts) < 30 * 864e5;
      });
      r.stress = Math.min(recent.length / 10, 1);
      // Burn-out de M3 directement en motivation inverse
      if (r.burnout > 50) r.motivation = Math.max(0, r.motivation - (r.burnout - 50) / 100);
    } catch(e) { console.warn('[DTE-E] rpg:', e); }
    return r;
  }

  /* ── Normalisation ───────────────────────────────────────────── */
  _normalize(raw) {
    const { m1, m2, rpg } = raw;
    const specialDays = m1.specialDays || {};
    const vacances    = m1.vacances    || {};
    const clamp = (v, min, max) => max === min ? 0 : Math.max(0, Math.min(1, (v - min) / (max - min)));
    const today = new Date();

    // Fusionner M1 + M2 : M1 prioritaire par jour, M2 complète les jours manquants
    // Cas : début d'année en M1, suite en M2 → les deux sont utilisés
    const days = Object.assign({}, m1.days); // copie M1
    if (m2 && m2.months && Object.keys(m2.months).length) {
      for (const [mk, monthData] of Object.entries(m2.months)) {
        if (!/^\d{4}-\d{2}$/.test(mk)) continue;
        const rawDays = monthData.rawDays || {};
        for (const [day, hs] of Object.entries(rawDays)) {
          const dateKey = mk + '-' + String(day).padStart(2, '0');
          if (!days[dateKey]) { // M1 prioritaire : ne pas écraser
            const h = parseHours(hs);
            if (h > 0) days[dateKey] = { extra: h, recup: 0, absent: 0 };
          }
        }
      }
    }

    // Fonction date locale (évite le bug toISOString/UTC+1)
    const localDK = (dt) => {
      const y = dt.getFullYear();
      const m = String(dt.getMonth()+1).padStart(2,'0');
      const d2= String(dt.getDate()).padStart(2,'0');
      return y+'-'+m+'-'+d2;
    };

    // ── VOLUME HEBDOMADAIRE — fenêtre glissante 4 semaines (INRS)
    // Approche rolling window sur 28 jours ouvrés calendaires :
    // moyenne des HS/jour sur 4 semaines → weeklyH projetée sur 5j ouvrés.
    // Fondement INRS : la charge physiologique s'évalue sur le rythme réel,
    // pas sur la semaine civile en cours (qui peut être tronquée en milieu de semaine).
    const _ccnWeek   = _dteGetCCNRules();
    const weekMondayA = (typeof CCN_API !== 'undefined')
      ? CCN_API.getDebutSemaineHS(today, _ccnWeek.debutSemaine)
      : (() => { const d=new Date(today); d.setDate(today.getDate()-((today.getDay()||7)-1)); return d; })();
    // FIX CCN : workDaysPerWeek déclaré ICI — utilisé par todayDowA et toutes les boucles
    const workDaysPerWeek = 7 - _getRestDaysSet().size; // dynamique selon jours repos (ex: 5 si dim+sam)
    // FIX CCN : todayDowA = jours écoulés depuis le début de semaine CCN (pas le lundi civil)
    // Supporte semaine débutant lundi, mercredi, samedi, dimanche, etc.
    // Ex: semaine CCN débutant mercredi, aujourd'hui vendredi → todayDowA = 3 (mer, jeu, ven)
    const _msDiffA   = today.getTime() - weekMondayA.getTime();
    const todayDowA  = Math.min(workDaysPerWeek, Math.max(1, Math.floor(_msDiffA / 86400000) + 1));
    let sumExtra = 0, countWorkDays28 = 0;
    // Fenêtre 28j glissante — ne compte que les jours ouvrés (lun-ven) non absents
    for (let i = 0; i < 28; i++) {
      const d = new Date(today); d.setDate(today.getDate() - i);
      const dow = d.getDay();
      if (_isRestDow(dow)) continue; // ignorer jours de repos configurés
      const k = localDK(d);
      if (specialDays[k] === 'ferie') continue;
      const e = days[k];
      if (e && e.absent > 0) continue;
      // M1→M4 : recup ≥ 7h dans M1 = jour de repos complet → exclu des heures (comme absent)
      if (e && (e.recup >= 7)) continue;
      // FIX : les jours de vacances comptent comme jours ouvrés à 0h HS
      // (pas exclus du dénominateur — sinon la moyenne/jour gonfle artificiellement)
      const isVacDay = !!vacances[k];
      sumExtra += isVacDay ? 0 : (e ? (e.extra || 0) : 0);
      countWorkDays28++;
    }
    // avgExtraPerDay28 = HS/jour moyen sur 4 semaines → weeklyExtra = HS/sem = avg × jours ouvrés/sem
    const avgExtraPerDay28 = countWorkDays28 > 0 ? sumExtra / countWorkDays28 : 0;
    const weeklyExtra28 = avgExtraPerDay28 * workDaysPerWeek;

    // Semaine civile courante (lun → aujourd'hui)
    // CORRECTION : on ne compte un jour que s'il a une ENTRÉE RÉELLE dans M1/M2
    // (e !== undefined ET e.extra >= 0). Un jour sans entrée = pas de donnée = pas comptabilisé.
    // Avant : !e → count7++ (jour vide compté comme jour travaillé → faux pour les vacances)
    let sumExtra7 = 0, count7 = 0;
    let hasAnyEntryThisWeek = false; // au moins 1 entrée M1/M2 cette semaine
    for (let dd = 0; dd < todayDowA && dd < workDaysPerWeek; dd++) {
      const d = new Date(weekMondayA); d.setDate(weekMondayA.getDate() + dd);
      if (d > today) break;
      const k = localDK(d);
      const e = days[k];
      // Ignorer jours fériés et vacances déclarées dans le compteur
      if (specialDays[k] === 'ferie' || vacances[k]) continue;
      // Ignorer jours absents
      if (e && e.absent > 0) continue;
      // M1→M4 : recup ≥ 7h dans M1 = jour de repos → exclu du compteur heures semaine
      if (e && (e.recup >= 7)) continue;
      // Ne compter QUE les jours avec une entrée réelle (e existe)
      if (e) {
        sumExtra7 += (e.extra || 0);
        count7++;
        hasAnyEntryThisWeek = true;
      }
      // Un jour sans entrée (e=undefined) = vacances non déclarées ou repos → PAS compté
    }

    // weeklyExtra : priorité à la semaine courante pour la progression jour par jour
    //
    // ARCHITECTURE : deux usages distincts
    //   weeklyExtra  → charge COURANTE (fatigue/stress du jour, affichage "Xh/sem")
    //   weeklyExtra28 → contexte HISTORIQUE (cumulWeeks, tendance longue)
    //
    // RÈGLE : si la semaine courante a des données (count7 >= 1), on utilise les HS réelles.
    //   La fenêtre 28j ne prend le relais QUE si aucune donnée cette semaine.
    //   Avant : countWorkDays28 >= 5 → 28j écrasait la semaine courante →
    //   progression lun→ven invisible (weeklyExtra constant = moyenne historique).
    let weeklyExtra;
    // Calculer la semaine précédente complète — prioritaire le lundi matin
    let prevExtra = 0, prevCount = 0;
    for (let dd = 0; dd < workDaysPerWeek; dd++) {
      const dt = new Date(weekMondayA); dt.setDate(weekMondayA.getDate() - 7 + dd);
      const k = localDK(dt);
      const e = days[k];
      if (e && !e.absent) { prevExtra += e.extra || 0; prevCount++; }
    }
    const prevWeekFull = prevCount >= 3 ? prevExtra : null; // semaine précédente si au moins 3j saisis

    if (count7 >= 1) {
      // Semaine en cours avec données → HS réelles faites (progression jour par jour visible)
      weeklyExtra = sumExtra7;
    } else if (todayDowA === 1 && prevWeekFull !== null) {
      // Lundi matin sans saisie → semaine précédente complète (mémoire biologique)
      // Sonnentag 2003 : l'effet d'une semaine chargée persiste le lundi suivant
      weeklyExtra = prevWeekFull;
    } else if (countWorkDays28 >= 5) {
      // Milieu de semaine sans saisie → moyenne 28j
      weeklyExtra = weeklyExtra28;
    } else {
      // Fallback démarrage
      weeklyExtra = prevWeekFull !== null ? prevWeekFull : 0;
    }
    const avgExtra7    = weeklyExtra / workDaysPerWeek; // FIX CCN : workDaysPerWeek au lieu de 5 fixe
    const _ccnR        = _dteGetCCNRules();
    const _baseJourCCN = _ccnR.seuil / workDaysPerWeek; // 35/5=7h ou 39/5=7.8h selon accord
    const avgH7        = _baseJourCCN + avgExtra7;
    const weeklyH7     = _ccnR.seuil + weeklyExtra;

    // Signal "semaine sans travail" : aucune entrée M1/M2 cette semaine
    // FIX LUNDI : le 1er jour de semaine CCN sans saisie ≠ vacances (c'est juste le début de semaine)
    // noWorkThisWeek ne se déclenche qu'à partir du 2e jour sans aucune saisie
    // Lundi matin (todayDowA=1) → noWorkThisWeek=false → historique 28j utilisé, cumul persiste
    const noWorkThisWeek = !hasAnyEntryThisWeek && todayDowA > 1;

    // Si semaine de repos détectée : forcer weeklyExtra à 0 immédiatement
    // pour que les calculs aval (variabilité, sigma) reflètent la réalité
    const weeklyExtraEffective = noWorkThisWeek ? 0 : weeklyExtra;
    const weeklyH7Effective    = noWorkThisWeek ? _ccnR.seuil : weeklyH7;

    // ── JOURS CONSÉCUTIFS — deux compteurs distincts ─────────────────────────
    // [1] consec (légal) : jours ouverts SANS weekend (L3132-1)
    //     → le weekend casse le compteur = repos hebdomadaire légal
    let consec = 0;
    for (let i = 0; i < 60; i++) {
      const d = new Date(today); d.setDate(today.getDate() - i);
      const dow = d.getDay();
      if (_isRestDow(dow)) break; // weekend = repos légal
      const k = localDK(d);
      const e = days[k];
      if (e && (e.absent > 0 || e.recup > 0)) break;
      if (specialDays[k] === 'ferie') break;
      if (vacances[k]) break;
      consec++;
    }
    // [2] consecOT (médical chronique) : jours ouvrés AVEC heures sup
    //     LOGIQUE DE RÉCUPÉRATION (Sonnentag 2003 / Meijman & Mulder 1998) :
    //     - Weekend         → continue (traversé sans casser ni soustraire)
    //     - Férié           → continue (pause neutre)
    //     - 1 récup/absent  → continue (1j seul insuffisant pour reset — symétrique weekend)
    //     - 2 récups consécutifs → break (reset complet : 2j récup + 2j WE = 4j repos total)
    //     - Vacances déclarées   → break (reset complet)
    //     - 2 semaines sans HS   → break (reset complet)
    let consecOT = 0;
    let blankWeeks = 0;
    let consecRest = 0; // compteur récup/absent consécutifs (hors weekend)
    let lastBlankWeekMon = null; // FIX : évite de compter la même semaine plusieurs fois
    outer_loop: for (let i = 0; i < 90; i++) {
      const d = new Date(today); d.setDate(today.getDate() - i);
      const dow = d.getDay();
      const k = localDK(d);
      const e = days[k];

      // Jour de repos configuré (sam/dim ou autre) = toujours traversé en priorité
      // FIX : doit être AVANT vacances[k] sinon check-in "congé" le weekend = break erroné
      if (_isRestDow(dow)) { continue; }

      // Vacances déclarées = reset complet (jours ouvrés uniquement)
      if (vacances[k]) break;

      // Férié = pause neutre
      if (specialDays[k] === 'ferie') { consecRest = 0; continue; }

      // Récup / absent : 1j seul = continue, 2j consécutifs = reset
      if (e && (e.absent > 0 || e.recup > 0)) {
        consecRest++;
        if (consecRest >= 2) break; // 2j consécutifs = reset complet
        continue; // 1 seul jour = traversé (comme un jour de weekend supplémentaire)
      }
      consecRest = 0;

      // Semaine sans HS — FIX blankWeeks : compter par semaine, pas par jour
      // Bug : chaque jour d'une semaine sans HS incrémentait blankWeeks → break prématuré
      const wMon = new Date(d); wMon.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1));
      const wMonKey = localDK(wMon);
      let weekHasOT = false;
      for (let dd = 0; dd < 5; dd++) {
        const wd = new Date(wMon); wd.setDate(wMon.getDate() + dd);
        const ek = localDK(wd);
        if (days[ek] && days[ek].extra > 0) { weekHasOT = true; break; }
      }
      if (!weekHasOT) {
        // N'incrémenter blankWeeks qu'une fois par semaine
        if (wMonKey !== lastBlankWeekMon) {
          lastBlankWeekMon = wMonKey;
          blankWeeks++;
        }
        if (blankWeeks >= 2) break;
        continue;
      }
      blankWeeks = 0;
      lastBlankWeekMon = null;
      if (e && e.extra > 0) consecOT++;
    }

    // ── CUMUL SEMAINES DE SURCHARGE — 2 passes pour éviter le bug d'ordre ────
    //
    // BUG CORRIGÉ : l'ancienne boucle unique allait de w=0 (aujourd'hui) → w=51 (il y a 1 an).
    // Les réductions (vacances, sem normales) s'appliquaient sur cumulWeeks=0 AVANT
    // d'avoir accumulé les semaines de surcharge passées → résultat faussé.
    //
    // NOUVELLE APPROCHE : 2 passes chronologiques séparées.
    // Passe 1 (chronologique, du passé vers aujourd'hui) : accumuler les semaines de surcharge.
    // Passe 2 (même ordre) : soustraire les semaines de récupération.
    // Séparation garantit que les +1 sont TOUJOURS calculés avant les −0.10/−0.25.
    //
    // BUG FLOAT CORRIGÉ : 10 − 0.10 × 40 = 6.0000000000000014 en JS (IEEE 754)
    // Fix : arrondi à 9 décimales après chaque opération (préserve la précision utile).

    const _ccnSeuilW = _dteGetCCNRules().seuil;

    // Passe 1 : accumulation des semaines de surcharge (plus ancienne → plus récente)
    let cumulWeeks = 0;
    const todayMonday = weekMondayA; // FIX CCN : début de semaine CCN (pas forcément lundi civil)
    const baseJourCCN = _baseJourCCN; // réutilise le calcul déjà fait plus haut

    for (let w = 51; w >= 0; w--) { // chronologique : w=51 (passé) → w=0 (maintenant)
      let weekH = 0, hasAnyDay = false, daysLogged = 0;
      for (let dd = 0; dd < workDaysPerWeek; dd++) { // FIX CCN : workDaysPerWeek au lieu de 5
        const dt = new Date(todayMonday);
        dt.setDate(todayMonday.getDate() - w * 7 + dd);
        if (dt > today) continue;
        const k = localDK(dt);
        const e = days[k];
        if (e && e.absent) continue;
        // M1→M4 : recup ≥ 7h = jour de repos → ne compte pas dans les heures de surcharge
        if (e && (e.recup >= 7)) continue;
        // FIX VACANCES : jour vacances = 0h HS (même si M1/M2 a des entrées)
        const isVacDay = !!vacances[k];
        weekH += baseJourCCN + (isVacDay ? 0 : (e ? (e.extra || 0) : 0)); // FIX CCN : baseJourCCN
        hasAnyDay = true;
        if (e && e.extra > 0 && !isVacDay) daysLogged++;
      }
      // FIX EXTRAPOLATION : semaine courante → weekH réel (HS faites + base jours restants)
      // Cohérent avec weeklyExtra conservative → weekH = seuil + HS réelles
      if (w === 0 && count7 >= 1 && count7 < workDaysPerWeek) {
        weekH = _ccnSeuilW + weeklyExtraEffective; // weeklyExtraEffective = sumExtra7 (HS réelles)
      }
      // FIX PROPORTIONNEL (Meijman & Mulder 1998 / INRS) :
      // Avant : isM1RestWeekP1 avec .some() → 1 jour absent = toute la semaine = vacances (faux)
      // Avant : contribution binaire +1 → semaine avec férié+3j HS = même que semaine normale
      // Après : isM1RestWeekP1 requiert majorité des jours absents (≥ ceil(workDays/2))
      // Après : contribution proportionnelle aux HS réelles → semaine courte avec HS ≠ semaine normale
      const isM1RestWeekP1 = (() => {
        let restDays = 0;
        for (let dd2 = 0; dd2 < workDaysPerWeek; dd2++) {
          const dt2 = new Date(todayMonday); dt2.setDate(todayMonday.getDate() - w*7 + dd2);
          const ek = localDK(dt2); const ev = days[ek];
          if (ev && ((ev.absent >= 7) || (ev.recup >= 7))) restDays++;
        }
        return restDays >= Math.ceil(workDaysPerWeek / 2); // majorité = repos réel
      })();
      const isVacWeekP1 = isM1RestWeekP1 || Array.from({length: workDaysPerWeek}, (_,dd) => dd).some(dd => {
        const dt2 = new Date(todayMonday); dt2.setDate(todayMonday.getDate() - w*7 + dd);
        return vacances[localDK(dt2)];
      });
      if (hasAnyDay && !isVacWeekP1) {
        // Contribution proportionnelle aux HS réelles de la semaine
        // hsReelles = heures au-delà du contrat sur les jours effectivement travaillés
        // Normalisé sur 7h HS/sem = contribution max (forte surcharge : 5j × 1.4h)
        // Exemples : 3j × 2h HS = 6h → 0.86 | 5j × 2h = 10h → 1.0 | 0 HS = 0
        const hsReelles = Math.max(0, weekH - (daysLogged > 0 ? daysLogged * baseJourCCN : _ccnSeuilW));
        const contribution = Math.min(1, hsReelles / (_ccnSeuilW * 0.20)); // 35×0.20=7h = surcharge max normalisée
        if (contribution > 0) {
          cumulWeeks = Math.round((cumulWeeks + contribution) * 1e9) / 1e9;
        }
      }
    }

    // Passe 2 : réductions de récupération (même ordre chronologique)
    for (let w = 51; w >= 0; w--) {
      let weekH = 0, hasAnyDay = false;
      for (let dd = 0; dd < workDaysPerWeek; dd++) { // FIX CCN
        const dt = new Date(todayMonday);
        dt.setDate(todayMonday.getDate() - w * 7 + dd);
        if (dt > today) continue;
        const k = localDK(dt);
        const e = days[k];
        if (e && e.absent) continue;
        // M1→M4 : recup ≥ 7h = jour de repos → ne compte pas dans les heures de surcharge
        if (e && (e.recup >= 7)) continue;
        // FIX VACANCES : jour vacances = 0h HS
        const isVacDay = !!vacances[k];
        weekH += baseJourCCN + (isVacDay ? 0 : (e ? (e.extra || 0) : 0)); // FIX CCN : baseJourCCN
        hasAnyDay = true;
      }
      // FIX : isM1RestWeekP2 requiert majorité des jours absents (même logique que Passe 1)
      // 1 jour absent seul (ex: lundi férié marqué absent) ne = pas semaine de vacances
      const isM1RestWeekP2 = (() => {
        let restDays = 0;
        for (let dd2 = 0; dd2 < workDaysPerWeek; dd2++) {
          const dt2 = new Date(todayMonday); dt2.setDate(todayMonday.getDate() - w*7 + dd2);
          const ek = localDK(dt2); const ev = days[ek];
          if (ev && ((ev.absent >= 7) || (ev.recup >= 7))) restDays++;
        }
        return restDays >= Math.ceil(workDaysPerWeek / 2);
      })();
      const isVacWeekP2 = isM1RestWeekP2 || Array.from({length: workDaysPerWeek}, (_,dd) => dd).some(dd => {
        const dt2 = new Date(todayMonday); dt2.setDate(todayMonday.getDate() - w*7 + dd);
        return vacances[localDK(dt2)];
      });
      if (!hasAnyDay) continue;
      if (isVacWeekP2 && cumulWeeks > 0) {
        // Vacances déclarées M4 — PATCH calibration anti-reset (de Bloom 2010 + INRS)
        // Avant : -0.75/sem (trop fort → quasi reset après 1-2 sem, irréaliste)
        // Après : -0.45/sem → récupération forte mais PARTIELLE, dette résiduelle conservée
        // 1 sem OFF = -0.45 | 2 sem = -0.90 | 3 sem = -1.35 (mémoire physiologique réaliste)
        cumulWeeks = Math.round(Math.max(0, cumulWeeks - 0.45) * 1e9) / 1e9;
      } else if (!isVacWeekP2 && weekH <= _ccnSeuilW && cumulWeeks > 0) {
        // Semaine normale (0 HS) — PATCH : -0.12/sem (vs -0.10) — différenciation vacances/repos claire
        // Meijman & Mulder 1998 : récupération partielle active dès retour à charge normale
        cumulWeeks = Math.round(Math.max(0, cumulWeeks - 0.12) * 1e9) / 1e9;
      }
    }

    // Fallback robuste : si cumulWeeks = 0 mais qu'il existe des logs,
    // estimer la durée d'exposition via la plage de dates réelle du log.
    // Corrige le cas où des semaines partielles tombent toutes sous H_OPTIMAL.
    if (cumulWeeks === 0 && Object.keys(days).length > 0) {
      const allDateKeys = Object.keys(days).filter(k => days[k] && days[k].extra > 0).sort();
      if (allDateKeys.length >= 5) { // au moins 1 semaine de données
        const firstDate = new Date(allDateKeys[0] + 'T12:00:00');
        const diffDays  = Math.ceil((today - firstDate) / 864e5);
        cumulWeeks = Math.max(1, Math.round(diffDays / 7));
      }
    }

    // Arrondi final pour éviter 6.0000000000000014 dans l'affichage
    // PATCH : let (vs const) — cumulWeeksR sera réajusté après calcul recentVacDays28
    let cumulWeeksR  = Math.round(cumulWeeks * 10) / 10;  // 1 décimale
    let cumulMonths  = Math.round((cumulWeeksR / 4.33) * 10) / 10; // même précision

    // ── COMPTEURS DE RÉCUPÉRATION — deux niveaux distincts ───────────────────
    //
    // [A] consecRestDays : jours de REPOS COMPLET (vacances, WE, fériés, absent)
    //     → utilisé pour : cortisol HPA (Sonnentag 2003 : détachement psychologique REQUIS)
    //       et risques structurels cvRisk/cogRisk (Kivimäki 2015, OEM 2025)
    //     Raison : le détachement psychologique nécessite une vraie coupure du travail.
    //
    // [B] consecNonOTDays : jours sans heures SUPPLÉMENTAIRES (inclut jours normaux ≤ seuil)
    //     → utilisé pour : fatigue chronique + stressExt (Meijman & Mulder 1998)
    //     Raison : l'Effort-Recovery model dit que la récupération commence DÈS que
    //     la charge revient au niveau de base, même sans vrai repos.
    //     Sonnentag 2003 confirme : la récupération partielle est possible sans détachement
    //     si la charge est "mastery" (maîtrisée) — i.e. ≤ seuil contractuel.

    let consecRestDays = 0;
    for (let i = 0; i < 60; i++) {
      const d = new Date(today); d.setDate(today.getDate() - i);
      const k = localDK(d);
      const e = days[k];
      const isVac   = vacances[k];
      const isFerie = specialDays[k] === 'ferie';
      const dow     = d.getDay();
      const isWE    = _isRestDow(dow);

      // M1→M4 : absent ≥ 7h OU recup ≥ 7h dans M1 = jour de repos complet pour M4
      // Le salarié n'a pas travaillé ce jour → traité comme vacances/WE pour la récupération
      const isM1FullRest = !!(e && ((e.absent >= 7) || (e.recup >= 7)));

      // Sonnentag 2003 : détachement psychologique = vraie coupure.
      // Un jour ouvré est repos uniquement si : WE, férié, vacances M4, absence M1, ou recup M1
      // noWorkThisWeek ne s'applique QU'à la semaine courante (i=0..6)
      const isCurrentWeek  = i < 7;
      // FIX BUG VACANCES : un jour marqué vacances dans M4 EST un jour de repos,
      // même si M1/M2 a des entrées pour ce jour (déclaration vacances = prioritaire)
      const hasOverload    = e && (e.extra > 0) && !isWE && !isVac && !isM1FullRest;
      const isRestDay = isWE || isVac || isFerie || isM1FullRest
                     || (isCurrentWeek && !isWE && !hasOverload && noWorkThisWeek);

      if (hasOverload) break; // HS réelles (hors vacances/repos) → stop définitif
      // Jour ouvré sans aucun signal de repos → stop
      if (!isWE && !isVac && !isFerie && !isM1FullRest
          && !(isCurrentWeek && noWorkThisWeek)) break;

      if (isRestDay) consecRestDays++;
    }

    // [B] consecNonOTDays : jours SANS heures supplémentaires
    // Reset uniquement sur un jour avec HS réelles — les jours normaux ET les WE/vacances
    // maintiennent le compteur (Meijman & Mulder 1998 : tout jour sans surcharge = récupération)
    let consecNonOTDays = 0;
    for (let i = 0; i < 90; i++) {
      const d = new Date(today); d.setDate(today.getDate() - i);
      const k = localDK(d);
      const e = days[k];
      const dow = d.getDay();
      const isWE = _isRestDow(dow);
      const isVac = !!vacances[k];
      // M1→M4 : recup ≥ 7h = repos → ne casse pas le compteur consecNonOT (Meijman & Mulder 1998)
      const isM1Rest = !!(e && ((e.absent >= 7) || (e.recup >= 7)));
      // FIX BUG VACANCES : un jour vacances ne casse pas le compteur même avec entrées M1/M2
      if (e && e.extra > 0 && !isWE && !isVac && !isM1Rest) break;
      consecNonOTDays++;
    }

    // [C] recentVacDays28 : total de jours de VACANCES dans les 28 derniers jours
    // PAS consécutif — capte l'effet d'une semaine OFF même si l'utilisateur a retravaillé après.
    // Sonnentag 2003 : les effets du repos persistent ~2-4 semaines après la reprise.
    // Bug corrigé : consecRestDays=0 dès le 1er jour travaillé → vacances passées invisibles.
    let recentVacDays28 = 0;
    for (let i = 0; i < 28; i++) {
      const d = new Date(today); d.setDate(today.getDate() - i);
      const k = localDK(d);
      const e = days[k];
      // M1→M4 : absent ≥ 7h ou recup ≥ 7h = jour de repos → compte dans le buffer vacances récentes
      if (vacances[k] || (e && ((e.absent >= 7) || (e.recup >= 7)))) recentVacDays28++;
    }

    // ── MÉMOIRE BIOLOGIQUE POST-VACANCES (Sonnentag 2003 + de Bloom 2010) ───
    // Sonnentag 2003 : les effets du repos persistent 2-4 semaines après la reprise.
    // de Bloom 2010 : "vacation effects are short-lived but remain measurable" (2 semaines).
    // 5+ jours de vacances dans les 28j → réduction supplémentaire du cumul (-0.20)
    // → différencie clairement "a travaillé 28j sans pause" vs "a eu une semaine OFF récente"
    if (recentVacDays28 >= 5) {
      cumulWeeks  = Math.max(0, cumulWeeks - 0.20);
      cumulWeeksR = Math.round(cumulWeeks * 10) / 10;
      cumulMonths = Math.round((cumulWeeksR / 4.33) * 10) / 10;
    }

    // Variabilité horaire (ANACT) — fenêtre VARIAB_WINDOW semaines COMPLÈTES passées
    // FIX BUG 7 : ANACT recommande d'exclure congés, absences longues, arrêts
    // Sinon semaine 0h vs 45h → sigma artificiellement gonflé (12.5h au lieu de 3h)
    // On exclut les semaines sans AUCUNE entrée réelle M1/M2 (= vacances non déclarées)
    const weekTotals = [];
    const todayMondayV = weekMondayA; // FIX CCN : début de semaine CCN (pas lundi civil)
    for (let w = 0; w < D.VARIAB_WINDOW + 3; w++) { // +3 pour compenser les semaines exclues
      let wt = 0, daysInWeek = 0, hasRealEntry = false;
      for (let dd = 0; dd < workDaysPerWeek; dd++) { // FIX CCN : workDaysPerWeek au lieu de 5
        const dt = new Date(todayMondayV);
        dt.setDate(todayMondayV.getDate() - w * 7 + dd);
        if (dt > today) continue;
        const k = localDK(dt);
        const e = days[k];
        if (e && e.absent) continue;
        if (specialDays[k] === 'ferie' || vacances[k]) continue;
        // FIX BUG 7 : ne compter que les jours avec une vraie entrée M1/M2
        // Un jour sans entrée (e=undefined) = pas de donnée = possible vacances non déclarées
        if (e) {
          wt += baseJourCCN + (e.extra || 0); // FIX CCN : baseJourCCN (7h ou 7.8h selon accord)
          daysInWeek++;
          hasRealEntry = true;
        }
      }
      // FIX SIGMA : toute semaine incomplète → seuil + HS réelles faites
      // FIX BUG VARIAB : le correctif était limité à w=0 (semaine en cours)
      // → les semaines passées avec 3-4 jours de données donnaient wt = baseJourCCN × daysInWeek
      //   ex : 3 × 7.8h = 23.4h au lieu de ~41h → sigma artificiellement gonflé (7.8h → irréaliste)
      // Principe ANACT : jours sans entrée = heures contractuelles sans HS (pas d'absence connue)
      // → pour toute semaine partielle : wtFinal = seuil CCN + HS réelles cumulées
      let wtFinal = wt;
      if (daysInWeek > 0 && daysInWeek < workDaysPerWeek && hasRealEntry) {
        // wt contient baseJourCCN × daysInWeek + HS réelles
        // On recalcule : seuil CCN + HS réelles uniquement (jours sans entrée → 0 HS assumé)
        const hsReelles = wt - (baseJourCCN * daysInWeek);
        wtFinal = _ccnSeuilW + hsReelles;
      }
      // Inclure uniquement les semaines avec ≥ 3 jours ouvrés ET au moins 1 entrée réelle
      // ANACT : exclure(absences_longues) — une semaine sans données n'est pas représentative
      if (daysInWeek >= 3 && hasRealEntry) weekTotals.push(wtFinal);
      if (weekTotals.length >= D.VARIAB_WINDOW) break;
    }
    // mean : calculé seulement sur les semaines avec des données (évite dilution)
    const nonZeroWeeks = weekTotals.filter(w => w > 0);
    const mean  = nonZeroWeeks.length > 0
      ? nonZeroWeeks.reduce((a, b) => a + b, 0) / nonZeroWeeks.length
      : 0;
    // Sigma calculé sur semaines non-nulles uniquement (évite l'inflation par semaines vides)
    const sigma = nonZeroWeeks.length > 1
      ? Math.sqrt(nonZeroWeeks.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / nonZeroWeeks.length)
      : 0;

    // ── PROFIL HORAIRE — DTE_SETTINGS + override du jour ──────────
    // Lire le profil du jour courant (ou global si pas d'override)
    const todayDK   = localDK(today);
    const schedule  = readSchedule(todayDK);
    const nightInfo = classifySchedule(schedule.startH, schedule.endH);

    // ── TYPE DE POSTE — multiplicateurs biométriques (INRS 2022, ANACT) ──────
    // Lire le type de poste depuis DTE_SETTINGS
    const _posteFactors = (() => {
      try {
        const s = JSON.parse(localStorage.getItem('DTE_SETTINGS') || '{}');
        const t = s.posteType || 'standard';
        const MAP = {
          standard:        { fatF:1.00, strF:1.00, cvF:1.00, cogF:1.00 },
          poste_3x8:       { fatF:1.30, strF:1.20, cvF:1.35, cogF:1.15 },
          poste_2x8:       { fatF:1.15, strF:1.10, cvF:1.15, cogF:1.10 },
          travail_physique:{ fatF:1.25, strF:1.05, cvF:1.10, cogF:1.00 },
          astreinte:       { fatF:1.10, strF:1.30, cvF:1.10, cogF:1.20 },
          cadre_dirigeant: { fatF:1.05, strF:1.20, cvF:1.10, cogF:1.30 },
        };
        return MAP[t] || MAP.standard;
      } catch(_) { return { fatF:1.00, strF:1.00, cvF:1.00, cogF:1.00 }; }
    })();
    // sleepDebt : calcul depuis horaires réels si profil configuré,
    // sinon fallback sur l'estimation par heures travaillées
    const hasSchedule = schedule.startH !== 9 || schedule.endH !== 17
                      || schedule.commuteH > 0
                      || nightInfo.factor > 1.0;
    const sleepDebtVal = hasSchedule
      ? sleepFromSchedule(schedule.startH, schedule.endH, schedule.commuteH,
                          avgExtra7, nightInfo.isNightComplete)
      : sleepDebtScore(avgH7);

    // Taux de surcharge (jours >BASE+2h)
    const allDays   = Object.values(days);
    const overCount = allDays.filter(d => (D.BASE_JOUR + d.extra) > D.BASE_JOUR + 2).length;
    const overRatio = allDays.length ? overCount / allDays.length : 0;

    // Contingent
    const contingentPct = (m1.netOvertime / D.CONTINGENT_MAX) * 100;
    // RCO — Art. L3121-38
    const rcoDepassement = Math.max(0, m1.netOvertime - D.CONTINGENT_MAX);
    const rcoH50  = rcoDepassement * 0.5;
    const rcoH100 = rcoDepassement;

    // Moyenne pondérée semaines (poids plus fort sur les récentes)
    // recentWeeklyH : semaine courante si elle a des données, sinon moyenne historique
    const _seuil     = _dteGetCCNRules().seuil;

    // ── DÉTECTION MODE VACANCES — multi-signal ────────────────────────────────
    // BUG CORRIGÉ : la détection précédente reposait UNIQUEMENT sur DTE_VACANCES.
    // Si l'utilisateur n'a pas déclaré ses vacances dans M4 (case fréquente : il utilise
    // seulement M1/M2), vacances[] est vide → isCurrentWeekVacation = false
    // → performance calculée sur moyenne historique 47h → bug "Performance 75% / 43h".
    //
    // NOUVEAU : 3 signaux complémentaires pour détecter une semaine sans travail :
    // [A] DTE_VACANCES déclaré (M4) — signal explicite
    // [B] 0 HS saisies cette semaine ET count7=0 (aucun jour logué) — signal calendrier
    // [C] weeklyH7 ≤ seuil ET aucune entrée M1/M2 dans la fenêtre 7j — signal combiné
    //
    // Meijman & Mulder 1998 : l'absence de surcharge = début de récupération,
    // qu'elle soit déclarée "vacances" ou non.

    const isVacFromDTE = [0,1,2,3,4].some(dd => {
      const dt = new Date(weekMondayA); dt.setDate(weekMondayA.getDate() + dd);
      if (dt > today) return false;
      return !!vacances[localDK(dt)];
    });

    // Signal calendrier : aucune heure saisie cette semaine dans M1/M2
    // (noWorkThisWeek déclaré plus haut, avant les boucles de compteurs)

    // Signal combiné : weeklyH7 effective ≤ seuil ET peu de données historiques
    const belowBaseThisWeek = weeklyH7Effective <= _seuil && countWorkDays28 < 3;

    // FIX BUG 4 : détection vacances multi-signal
    // Meijman & Mulder 1998 : l'absence de surcharge = début de récupération,
    // qu'elle soit déclarée "vacances" ou non.
    // Signal 1 : DTE_VACANCES déclaré (M4)
    // Signal 2 : noWorkThisWeek (aucune entrée M1/M2 cette semaine)
    // Signal 3 : weeklyH7 ≤ seuil ET aucune donnée récente
    const isCurrentWeekVacation = isVacFromDTE || noWorkThisWeek || belowBaseThisWeek;

    // avgH7 déjà déclaré plus haut — fatHS forcé à 0 en vacances dans _scores()

    // ── FIX BUG 1+5 : recentWeeklyH = charge ACTUELLE, pas la moyenne ──────────
    // Pencavel 2014 : la performance dépend de la charge COURANTE, pas de l'historique.
    // INTERDIT : useGlobalAverage() — règle d'or de l'architecture de référence.
    // Avant : si weeklyH7 ≤ seuil, fallback sur mean → 39h fantôme après 10 sem à 45h.
    // Après : toujours la semaine en cours. En vacances → seuil CCN (35h = perf 100%).
    const recentWeeklyH = isCurrentWeekVacation
      ? _seuil
      : weeklyH7Effective;

    return {
      heures:         clamp(avgH7, 0, 14),
      consec:         clamp(consec, 0, 14),
      surcharge:      clamp(overRatio, 0, 1),
      variab:         clamp(sigma, 0, 12),
      burnout:        Math.max(0, Math.min(1, rpg.burnout / 100)),
      motiv:          Math.max(0, Math.min(1, rpg.motivation)),
      extStress:      Math.max(0, Math.min(1, rpg.stress)),
      sleepDebt:      sleepDebtVal,
      // Valeurs brutes pour les calculs
      _avgExtra7:     avgExtra7,
      _avgH7:         avgH7,
      _weeklyH7:      weeklyH7Effective,
      _recentWeeklyH: recentWeeklyH,
      _isVacationWeek: isCurrentWeekVacation,
      _consec:        consec,
      _consecOT:      consecOT,
      _cumulWeeks:    cumulWeeksR,
      _cumulMonths:   cumulMonths,
      _consecRestDays: consecRestDays,
      _consecNonOTDays: consecNonOTDays,
      _recentVacDays28: recentVacDays28,
      _sigma:         sigma,
      _contingentPct: contingentPct,
      _rcoDepassement: rcoDepassement,
      _rcoH50:        rcoH50,
      _rcoH100:       rcoH100,
      _contract:      m2.contract || D.BASE_HEBDO,
      // Horaires
      _nightFactor:   nightInfo.factor,
      _posteFactors:  _posteFactors,
      _isNight:       nightInfo.isNightComplete,
      _isNightPartial:nightInfo.isNightPartial,
      _isDecale:      nightInfo.isDecale,
      _nightH:        nightInfo.nightH,
      _schedule:      schedule,
    };
  }

  /* ── Scores basés sur les études ────────────────────────────── */
  _scores(norm, raw) {
    const c       = this._coefs;
    const weeklyH = norm._recentWeeklyH || (D.BASE_JOUR * 5);

    // ── CHECK-IN du jour — intégré directement dans les scores ──
    let checkinBoost = { fatigue:0, stress:0, performance:0, recovery:0 };
    try {
      const today    = (() => { const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); })();
      const history  = JSON.parse(localStorage.getItem('DTE_CHECKIN_HISTORY')||'[]');
      const ci       = history.find(h=>h.date===today); // check-in du jour uniquement — pas de fallback (hier≠aujourd'hui)
      if (ci) {
        // Sommeil court → fatigue +, performance −
        if (ci.sleep !== undefined) {
          const sleepDef = (4 - ci.sleep) / 4;  // 0=bien, 1=très mal
          checkinBoost.fatigue    += sleepDef * 0.09;  // Thompson 2022 — atténué : signal parmi d'autres
          checkinBoost.performance -= sleepDef * 0.10;  // Thomson 2022 + OMS — atténué
          checkinBoost.recovery   -= sleepDef * 0.10;
        }
        // Énergie basse → fatigue +
        if (ci.energy !== undefined) {
          const energyDef = (4 - ci.energy) / 4;
          checkinBoost.fatigue    += energyDef * 0.10;
          checkinBoost.performance -= energyDef * 0.08;
        }
        // Stress ressenti → stress +
        if (ci.stress !== undefined) {
          // FIX : centré sur 2 ("Modéré" = baseline neutre)
          // Avant : (ci.stress/4)*0.15 → toujours ≥ 0 → "Aucun"=0 (aucun effet), "Léger"=+0.04 (monte le stress !)
          // Après : ((ci.stress-2)/4)*0.15 → "Aucun"=-0.075, "Léger"=-0.04, "Modéré"=0, "Élevé"=+0.04, "Critique"=+0.075
          // Active aussi checkinStressFactor=0.75 pour "Aucun" et "Léger" (réduction multiplicative en cascade)
          checkinBoost.stress += ((ci.stress - 2) / 4) * 0.15;  // ANACT — bidirectionnel, centré sur Modéré
        }
        // Douleurs → fatigue musculo +
        if (ci.pain !== undefined && ci.pain > 0) {
          checkinBoost.fatigue += (ci.pain / 4) * 0.07;
        }
        // Motivation → performance +
        if (ci.motiv !== undefined) {
          checkinBoost.performance += ((ci.motiv - 2) / 4) * 0.12;  // Nature 2025: sens au travail atténue fatigue perçue
        }
      }
    } catch(_) {}
    const cumW    = norm._cumulWeeks    || 0;
    const cumM    = norm._cumulMonths   || 0;
    // Deux compteurs de récupération — voir _normalize() pour la justification scientifique
    const consecRest    = norm._consecRestDays   || 0; // repos COMPLET (Sonnentag 2003 / HPA)
    const consecNonOT   = norm._consecNonOTDays  || 0; // sans HS (Meijman & Mulder 1998)
    const recentVac28   = norm._recentVacDays28  || 0; // vacances récentes (28j) — effet persistant

    // ── LIFESTYLE BOOSTS (profil rythme de vie) ────────────────
    let lifestyleBoost = { fatigue:0, stress:0, performance:0, recovery:0, cvRisk:0 };
    try {
      if (typeof LifestylePanel !== 'undefined') {
        lifestyleBoost = LifestylePanel.getBoosts();
      }
    } catch(_) {}
    const hasM1   = raw.m1 && (raw.m1.totalExtra > 0 || Object.keys(raw.m1.days || {}).length > 0);
    const hasM2   = raw.m2 && raw.m2.months && Object.keys(raw.m2.months).length > 0;
    const hasData = hasM1 || hasM2;

    if (!hasData) {
      return {
        fatigue:0, stress:0, performance:0, recovery:0,
        errorRisk:0, overloadRisk:0, cvRisk:0, cogRisk:0,
        diabetesRisk:0, musculoRisk:0,
        _f:0, _s:0, _p:0, _r:0,
        _hasData:false, _hasM1:false, _hasM2:false,
        _weeklyH:weeklyH, _cumulWeeks:cumW,
      };
    }

    // ── FATIGUE (INRS phases + J.Occup.Health 2021) ───────────────────────────
    //
    // COEFFICIENT fatHS = 0.130 — dérivé des phases INRS (guide prévention RPS) :
    //   Phase P1 → P2 (entrée fatigue chronique, 35%) : ~5 semaines à 45h/sem
    //   Équation : fatHS × cumulAmp(4w) = 0.35
    //   Avec cumulAmp(4w) = 1.25 → fatHS = 0.35/1.25 = 0.280 → /2h HS/j = 0.140
    //   Ajusté à 0.130 pour intégrer la contribution de sleepDebt (~0.03 à 45h)
    //
    // FACTEUR cumulAmp — dérivé de J.Occup.Health 2021 (Taiwan, 6 mois) :
    //   - Relation dose-temps NON LINÉAIRE : les 6 derniers mois comptent autant
    //     que la semaine courante → amplification croissante avec l'exposition
    //   - Calibration sur les phases INRS :
    //     P2 entry (35%) à 5 semaines → cumulAmp(4w) = 1.25
    //     P2/P3 border (60%) à ~12-14 semaines → cumulAmp(12w) = 1.75
    //     P4 burnout (>80%) à ~24 semaines → cumulAmp(24w) = 2.20
    //
    // FACTEUR sonnentagMult — Sonnentag 2003 (J.Applied Psychology) :
    //   - Le détachement psychologique (psychological detachment) est la clé de
    //     la récupération ; il est COMPROMIS par la surcharge chronique
    //   - Sonnentag mesure que les travailleurs en high-demand reportent moins
    //     de relaxation et maîtrise pendant le week-end
    //   - Effets observés dès 5j consécutifs de charge élevée, progressivement
    //     saturés autour de 15-20j → le week-end ne "remet plus à zéro"
    //   - Quantification : récupération réduite de ~35% à 12j, ~50% à 20j
    //     → multiplicateur 1.10 et 1.15 sur cumulAmp
    //
    const consecOT      = norm._consecOT || 0;
    // En vacances M4 : pas de HS actives → fatHS = 0 (la moyenne historique ne compte pas)
    const isVacWeekNow = norm._isVacationWeek || false;
    const fatHS         = isVacWeekNow ? 0 : norm._avgExtra7 * 0.130 * c.fh; // INRS phases
    const fatSommeil    = norm.sleepDebt * 0.35;           // Thompson 2022 : +14% cortisol/nuit courte
    const fatSurchar    = norm.surcharge * 0.12;
    const fatBurnout    = norm.burnout * 0.22;
    // FIX BUG 6 : composante cumulative — la fatigue accumulée persiste même sans HS cette semaine
    // J.Occup.Health 2021 : "les 6 derniers mois comptent autant que la semaine courante"
    // Sans cette composante, fatigue tombe à ~15% dès la 1ère semaine sans HS (irréaliste)
    // Calibration : 10 sem surcharge → fatCumul ≈ 0.15, décroît avec consecNonOT (Meijman 1998)
    const fatCumulBase = Math.min(0.25, cumW * 0.018);
    // Décroissance : demi-vie 14j (repos complet) / 25j (semaines normales)
    const _consecForCumulDecay = Math.max(consecNonOT, consecRest);
    const fatCumulDecay = _consecForCumulDecay > 0
      ? Math.max(0.15, Math.exp(-Math.log(2) * _consecForCumulDecay / 14))
      : 1.0;
    const fatCumulative = fatCumulBase * fatCumulDecay;

    // J.Occup.Health 2021 — amplification dose-temps non-linéaire
    let cumulAmp = cumW >= 24 ? 2.20   // 6 mois — seuil décisif étude Taiwan
                   : cumW >= 16 ? 1.95   // 4 mois
                   : cumW >= 12 ? 1.75   // 3 mois — risque OMS biologique établi
                   : cumW >= 10 ? 1.65   // 2.5 mois
                   : cumW >= 8  ? 1.55   // 2 mois
                   : cumW >= 4  ? 1.25   // 1 mois
                   : 1.0;

    // FIX BUG 4 : en vacances, réduire cumulAmp (de Bloom 2010 : détachement actif)
    // 1 semaine vacances : cumulAmp × 0.70 | 2 semaines : × 0.55 | 3+ : × 0.40
    if (isVacWeekNow && consecRest >= 1) {
      const vacWeeks = Math.min(3, Math.floor(consecRest / 5));
      const vacReduction = vacWeeks >= 3 ? 0.40 : vacWeeks >= 2 ? 0.55 : 0.70;
      cumulAmp *= vacReduction;
    }

    // Sonnentag 2003 — dégradation du détachement psychologique
    // FIX BUG 4 : en vacances, sonnentagMult = 1.0 (pas d'amplification — détachement actif)
    const sonnentagMult = isVacWeekNow ? 1.0
                        : consecOT >= 20 ? 1.15   // >4 sem HS : détachement sévèrement compromis
                        : consecOT >= 12 ? 1.10   // >2.4 sem HS : détachement partiellement compromis
                        : consecOT >= 5  ? 1.05   // >1 sem HS : premier signal Sonnentag
                        : 1.0;                    // <5j : récupération weekend normale (baseline)

    const _pf      = norm._posteFactors || { fatF:1, strF:1, cvF:1, cogF:1 };
    // FIX BUG 4 : en vacances, atténuer fatSurchar et fatBurnout (repos actif)
    const vacFatReduction = isVacWeekNow ? 0.40 : 1.0;
    // FIX BUG 8 : le stress amplifie la fatigue (INRS + OMS + Sonnentag)
    // Référence architecture : facteur_stress = 1 + stress * 0.5
    // On utilise cortisolModel (indépendant de fatigue, pas de dépendance circulaire)
    const prelimStress = cortisolModel(weeklyH, norm._sigma || 0, cumW, consecRest, consecNonOT);
    const stressFatigueMult = 1 + prelimStress * 0.15; // INRS: stress amplifie fatigue (modéré — 0.15 évite surréaction)
    const fat_raw = (fatHS + fatSommeil + (fatSurchar * vacFatReduction) + (fatBurnout * vacFatReduction) + (fatHS > 0 ? 0 : fatCumulative)) * cumulAmp * sonnentagMult * stressFatigueMult * _pf.fatF;
    const fatigue = Math.max(0, Math.min(1, fat_raw));

    // ── STRESS/CORTISOL (Thompson 2022 + ANACT/INRS + IARC 2019) ─────────────
    // nightFactor : multiplicateur biologique selon régime horaire
    //   Nuit complète : ×1.40 (IARC 2019 Groupe 2A, Kivimäki 2015 RR×1.4-1.7)
    //   Nuit partielle : ×1.20 (mélatonine partiellement supprimée, INRS)
    //   Décalé tard    : ×1.10 (dette sommeil mécanique, ANACT)
    const nightFactor = norm._nightFactor || 1.0;
    const cortisolS   = cortisolModel(weeklyH, norm._sigma || 0, cumW, consecRest, consecNonOT);

    // stressExt : composante chronique (fatigue × variabilité) — décroit avec TOUTE absence de HS
    // Meijman & Mulder 1998 : récupération commence dès que charge ≤ baseline, WE ou pas.
    // → on utilise consecNonOT (jours sans HS, inclut semaines normales)
    // PATCH : couplage fatigue→stress renforcé (0.40 vs 0.30) — cohérence physiologique
    const stressExtBase = fatigue * 0.40 + norm.extStress * 0.20 + norm.variab * 0.12;
    // stressExtDecay : demi-vie 10j (McEwen 1998) — PATCH : vacances ×1.1 (vs ×1.5 trop rapide)
    // Cortisol basal reste élevé plusieurs semaines après surcharge (Sluiter 2001)
    const _consecForStress = Math.max(consecNonOT, isVacWeekNow ? Math.round(consecRest * 1.1) : consecRest);
    const stressExtDecay = _consecForStress > 0
      // Demi-vie 10j — McEwen 1998 (allostatic load chronique) + Sluiter 2001
      ? Math.max(0.08, Math.exp(-Math.log(2) * _consecForStress / 10))
      : 1.0;
    const stressExt = isVacWeekNow
      ? stressExtBase * stressExtDecay
      : (consecNonOT > 7 ? stressExtBase * stressExtDecay : stressExtBase);

    // Pondération check-in subjectif : si l'utilisateur déclare "stress léger" en vacances,
    // c'est un signal biologique réel (Sonnentag 2003 : le détachement vécu atténue le cortisol)
    const checkinStressFactor = checkinBoost.stress < 0 ? 0.75 : 1.0;
    const stress      = Math.max(0, Math.min(1, (cortisolS * 0.65 * nightFactor + stressExt) * _pf.strF * checkinStressFactor + checkinBoost.stress));

    // ── PERFORMANCE (Pencavel 2014, Stanford) ────────────────────
    // En semaine de vacances : la performance "travail" n'a pas de sens.
    // On retourne la capacité de base (Pencavel à 35h) sans dégradation cumulative.
    const perfPencavel = pencavelPerf(weeklyH);
    // Dégradation cognitive OEM 2025 (>52h)
    const cogDeg       = cogRisk(weeklyH, cumW);
    const perfMotiv    = norm.motiv * 0.12;
    const perfFat      = fatigue * 0.65; // PATCH ×0.65 (vs 0.58) — lien fatigue→perf renforcé
    const perfStr      = stress  * 0.10;
    // En vacances : perf = capacité de repos (Pencavel 35h = 100%) sans drag cumulatif.
    // Hors vacances : formule normale avec fatigue/stress/cognitif.
    const perf = isVacWeekNow
      ? Math.max(0.05, Math.min(1, pencavelPerf(_dteGetCCNRules().seuil) + perfMotiv * 0.5))
      : Math.max(0.05, Math.min(1, perfPencavel * (1 - cogDeg * 0.3) * (1 - perfFat) - perfStr + perfMotiv));

    // ── RÉCUPÉRATION (Sonnentag 2003 + INRS + Thompson 2022) ─────────────────
    // La récupération est un processus ACTIF, pas une simple absence de fatigue.
    // Sonnentag 2003 : le "detachment" psychologique pendant le repos = facteur clé.
    // Pendant les vacances avec bon sommeil → recharge accélérée (×2 vs weekend normal).
    // Base de récupération : D.RECOVERY_WE = 0.045/jour
    const recNightPenalty = norm._isNight ? 0.15 : norm._isNightPartial ? 0.08 : 0;
    const isVacWeekScore = norm._isVacationWeek || false;

    // Sonnentag 2003 (J.Applied Psychology) : le détachement psychologique nécessite
    // une vraie coupure du travail — le bonus Sonnentag n'est actif qu'en repos COMPLET.
    // → utilise consecRest (vacances + WE + fériés), PAS consecNonOT.
    const sonnentagRestBonus = Math.min(0.35, consecRest * 0.032 * Math.pow(0.88, consecRest / 3));

    // Sonnentag 2003 distingue 4 mécanismes de récupération :
    //   1. Détachement psychologique (detachment) → vacances, repos complet → bonus ci-dessus
    //   2. Maîtrise (mastery) → activités engageantes hors travail → partiel même en sem. normale
    //   3. Relaxation → partiel hors travail mais présent même les soirs de semaine
    //   4. Contrôle → flexible en sem. normale
    // Sonnentag 2003 Fig.3 : "mastery" active même sans vacances → bonus partiel ~30% du max.
    // En semaines normales (consecNonOT > 0, consecRest = 0) : mastery bonus actif.
    const masteryBonus = consecRest === 0 && consecNonOT > 0
      ? Math.min(0.10, consecNonOT * 0.007) // 30% du sonnentagMax = 0.35×0.30 ≈ 0.10 max
      : 0.0; // vacances = bonus Sonnentag plein utilisé, pas de double comptage

    // ── DÉCROISSANCE DE LA FATIGUE — Meijman & Mulder 1998 (Effort-Recovery model) ──
    // "Recovery starts as soon as load returns to baseline" — y compris les semaines normales.
    // INRS phase P2/P3 : récupération complète = 2-6 semaines (demi-vie 10j = milieu fourchette).
    // → utilise consecNonOT (jours sans HS) : inclut les semaines normales ET les vacances.
    // consecNonOT=5j → 0.71 | 10j → 0.50 | 14j → 0.38 | 21j → 0.23
    // fatigueDecayRest : décroissance de la fatigue pendant le repos
    // En vacances : consecRest × 1.2 (vs ×1.5 avant — trop agressif : effaçait la dette en 1 sem)
    // de Bloom 2010 : détachement = récup 20-30% plus rapide, pas 50%
    const consecRestEff  = isVacWeekScore ? Math.round(consecRest * 1.2) : consecRest;
    const _consecForDecay = Math.max(consecNonOT, consecRestEff);
    const fatigueDecayRest = _consecForDecay > 0
      ? Math.max(0.12, Math.exp(-Math.log(2) * _consecForDecay / 10)) // INRS + Meijman & Mulder 1998
      : 1.0;

    // Plancher récupération : Sonnentag 2003 — détachement réel → recharge progressive.
    // FIX BUG 6 : le plancher vacation était trop bas (max 0.30 → jamais >30% en vacances).
    // Sonnentag 2003 : après 5j+ de repos complet, récupération physique très forte,
    // récupération mentale quasi complète. Cible : 85-90 après 1 semaine OFF.
    const vacationFloor = isVacWeekScore
      ? Math.min(0.92, 0.50 + consecRest * 0.06) // 5j→0.80, 7j→0.92
      : 0.04;

    // CORRECTION : la récupération part de 1.0 (100%) et descend avec fatigue/cumul
    const recBase = 1.0
      - (fatigue * fatigueDecayRest) * 0.85     // fatigue (Meijman & Mulder 1998) — calibré pour rec 70-80 à fat 30%
      - (cumW / 25) * 0.35 * fatigueDecayRest  // cumul surcharge (J.Occup.Health 2021)
      - recNightPenalty;
    // FIX BUG 6 + BUG 3 : bonus vacances direct — différencié semaine 1 vs 2+
    // Avant : max 0.10 quelle que soit la durée → plafond perçu dès la 2e semaine
    // Après : cap relevé à 0.18 → 2 sem = +0.09, 3 sem = +0.15 (de Bloom 2010)
    const vacationDirectBonus = isVacWeekScore && consecRest >= 5
      ? Math.min(0.18, (consecRest - 4) * 0.030) // 5j→+0.03, 7j→+0.09, 10j→+0.18
      : 0;
    const recovery = Math.max(vacationFloor, Math.min(1,
      recBase
      + sonnentagRestBonus * 0.20   // détachement psychologique (Sonnentag 2003)
      + masteryBonus * 0.20         // maîtrise partielle (Sonnentag 2003 Fig.3)
      + vacationDirectBonus         // FIX BUG 6 : bonus repos prolongé
    ));

    // ── RISQUE ERREUR (Pencavel + fatigue + INRS) ────────────────
    const errRisk = Math.max(0, Math.min(1, (1 - perf) * 0.35 + fatigue * 0.50 + stress * 0.15));

    // ── SURCHARGE STRUCTURELLE ────────────────────────────────────
    const overRisk = Math.max(0, Math.min(1, norm.surcharge * 0.40 + norm.heures * 0.35 + norm.consec * 0.25));

    // ── RISQUES SPÉCIFIQUES ÉTUDES ───────────────────────────────
    // cvRisk majoré en travail de nuit : Kivimäki 2015 RR×1.4 (nuit) → appliqué via nightFactor
    //
    // ── DÉCROISSANCE DES RISQUES BIOLOGIQUES EN VACANCES ─────────────────────
    // Ces risques sont STRUCTURELS (dose-temps cumulés) — ils ne s'effacent PAS en quelques jours.
    //
    // cvRisk (cardiovasculaire) — Kivimäki 2015 + WHO/ILO 2021 :
    //   Risque cumulatif structurel. Aucune étude ne donne un taux de récupération rapide.
    //   Demi-vie conservative : 180 jours (6 mois).
    //   À J+7 vacances : decay = exp(-ln2 × 7/180) = 0.974 → -2.6% seulement.
    //   Plancher : 93% (risque résiduel irréductible à court terme — Kivimäki 2015)
    //
    // cogRisk (cérébral) — OEM 2025 (Jang et al., Yonsei) :
    //   "Potentially reversible but recovery is long." Pas de timeline précise.
    //   Neuroplasticité corticale (Draganski et al. 2004, Nature) : mois pour modifier volumes.
    //   Demi-vie : 120 jours (4 mois). À J+7 : 0.960 → -4% seulement.
    //   Plancher : 88%
    // FIX BUG 2 : décroissance des risques aussi en semaines normales (pas seulement vacances)
    // Kivimäki 2015 : le risque décroît dès que l'exposition diminue (pas instantanément)
    const _consecForRiskDecay = Math.max(consecRest, consecNonOT * 0.5); // semaines normales = 50% aussi efficace
    const cvRiskRestDecay = _consecForRiskDecay > 0
      ? Math.max(0.93, Math.exp(-Math.log(2) * _consecForRiskDecay / 180))
      : 1.0;
    const cogRiskRestDecay = _consecForRiskDecay > 0
      ? Math.max(0.88, Math.exp(-Math.log(2) * _consecForRiskDecay / 120))
      : 1.0;

    const cvR_base  = Math.min(0.65, cvRisk(weeklyH, cumM) * nightFactor * _pf.cvF);
    const cvR       = cvR_base * cvRiskRestDecay; // FIX: decay toujours appliqué (pas seulement vacances)
    const cogR_base = Math.min(0.5, cogRisk(weeklyH, cumW) * _pf.cogF);
    const cogR      = cogR_base * cogRiskRestDecay; // FIX: idem
    const diabR     = metabolicRisk(weeklyH, cumM); // Lancet 2021 HR=1.18
    const muscR     = musculoRisk(weeklyH, cumM, norm._consec || 0); // Lancet 2021 HR=1.15

    // Appliquer lifestyle (multiplicateur sur fatigue) + check-in (additif modéré)
    const lsMult    = lifestyleBoost.fatigueMult || 1.0;
    const fatWithLS = fatigue * lsMult;
    let fatFinal  = Math.max(0, Math.min(1, fatWithLS + checkinBoost.fatigue));
    let strFinal  = Math.max(0, Math.min(1, stress + (lifestyleBoost.stress||0))); // PATCH : let (vs const) — réassignable par plafond long terme
    let perfFinal = Math.max(0.05, Math.min(1, perf  + checkinBoost.performance + (lifestyleBoost.performance||0)));
    // Récupération : check-in subjectif a plus de poids en repos actif (Sonnentag 2003)
    const recBoostFactor = (consecRest >= 2) ? 1.8 : 1.0;
    let recFinal  = Math.max(0.04, Math.min(1, recovery + (checkinBoost.recovery * recBoostFactor) + (lifestyleBoost.recovery||0)));

    // ── FINE-TUNING — calibrage charge modérée continue (38-45h, ≥5 sem) ─────
    // Sans vacances, le système doit être stable, progressif, cohérent.
    //
    // Ajust. 1 — Performance : boost si stress + fatigue bas, plafond si fatigue > 20%
    //   Pencavel 2014 + Nature 2025 (Fan) : motivation + faible stress = meilleure perf réelle
    if (strFinal < 0.20 && fatFinal < 0.30 && !isVacWeekNow) {
      perfFinal = Math.min(1, perfFinal * 1.05);
    }
    // Plafond doux : perf ne dépasse pas 90 si fatigue résiduelle > 20%
    if (perfFinal > 0.90 && fatFinal > 0.20 && !isVacWeekNow) {
      perfFinal = 0.90;
    }
    // Ajust. 2 — Récupération : moins punitive si fatigue modérée, pénalité si stress > 20%
    //   INRS : récupération corrèle inversement avec fatigue ET stress résiduel
    if (fatFinal < 0.40 && !isVacWeekNow) {
      recFinal = Math.min(1, recFinal + 0.08);
    }
    if (strFinal > 0.20 && !isVacWeekNow) {
      recFinal = Math.max(0.04, recFinal - 0.05);
    }
    // Ajust. 3 — Fatigue : accumulation longue progressive
    //   J.Occup.Health 2021 : surcharge prolongée → fatigue résiduelle croissante
    //   cumW * 0.003 : léger renfort linéaire (6 sem → +1.8%, 10 sem → +3%)
    if (cumW >= 4 && !isVacWeekNow) {
      fatFinal = Math.min(1, fatFinal + cumW * 0.003);
    }
    // Sécurité : si fatigue > 60% mais heures < 45h → amortir (pas de surréaction)
    if (fatFinal > 0.60 && weeklyH < 45 && !isVacWeekNow) {
      fatFinal *= 0.95;
    }
    // Ajust. 4 — Stabilité sous charge modérée (38-45h) : inertie réaliste
    //   ANACT : charge modérée stable ≠ surcharge aiguë, pas de reset fort
    // (déjà intégré via cumulAmp progressif)

    // ── BÉNÉFICE VACANCES RÉCENTES (persistant après reprise) ─────────────────
    // Sonnentag 2003 : les effets du repos persistent 2-4 semaines après la reprise.
    // de Bloom 2010 : "vacation effects fade within 2 weeks but remain measurable".
    if (recentVac28 >= 5 && !isVacWeekNow) {
      // PATCH : vacBenefit réduit (0.08 vs 0.15) — évite double réduction post-vacances
      // Sonnentag 2003 : effet persistant réel mais modéré (inertia block gère la mémoire)
      const vacBenefit = Math.min(0.08, recentVac28 * 0.012);
      fatFinal = Math.max(0, fatFinal - vacBenefit);
      recFinal = Math.min(1, recFinal + vacBenefit * 1.0); // multiplier réduit aussi (1.5→1.0)
    }

    // ── INERTIE POST-REPOS — mémoire biologique (CRITIQUE) ──────────────────
    // Plus la surcharge passée est longue, moins 1 semaine de repos efface.
    // de Bloom 2010 : "vacation effects are short-lived, fading within 2 weeks"
    // INRS phases : P2→P1 recovery = 2-6 semaines, pas 1.
    // BUG 3 FIX : inertia réduite (÷12 au lieu de ÷8) pour permettre à 2+ sem
    // de vacances de produire un effet visible sur recCeiling.
    // Avant : recCeiling max 85% après 8 sem cumul → perçu comme "plafond"
    // Après : recCeiling max 88% après 8 sem cumul, 91% après 12 sem
    // ── INERTIE POST-REPOS v2 — mémoire biologique renforcée ─────────────────
    // PATCH calibration : diviseur ÷8 (÷12 trop permissif → récup trop rapide)
    // fatFloor ×0.40 : à 8 sem → plancher 40% (cible vacances : 40-45%)
    // recCeiling ×0.32 : à 8 sem → plafond 68% (cible vacances : 60-70%)
    // Note : recCeiling s'applique APRÈS vacationFloor → l'écrase si nécessaire.
    // Combiné avec USURE (−12% à cumW=8) → récupération hors vacances ≈ 56% ✓
    if (cumW >= 3) {
      const inertia = Math.min(1, cumW / 8); // PATCH ÷8 : INRS P2/P3 réaliste
      const fatFloor = inertia * 0.40; // PATCH ×0.40 : plancher dette (8 sem → 40%)
      if (fatFinal < fatFloor) fatFinal = fatFloor;
      const recCeiling = 1.0 - inertia * 0.32; // PATCH ×0.32 : plafond récup (8 sem → 68%)
      if (recFinal > recCeiling) recFinal = recCeiling;
    }

    // ── PLANCHER STRESS — allostatic load résiduel (McEwen 1998 + Sluiter 2001) ──────
    // Le cortisol basal reste chroniquement élevé après surcharge prolongée.
    // McEwen 1998 : allostatic load → seuil de stress physiologique durablement rehaussé.
    // Sluiter 2001 : "neuroendocrine recovery from sustained work demands = several weeks"
    // → stress ne peut pas tomber à 0 dès la 1ère semaine de repos après P2/P3.
    // Plancher : 28% à 8 sem (cible post-surcharge : 25–40%).
    // Même logique que fatFloor dans l'inertia block — appliquer même pendant vacances.
    if (cumW >= 3) {
      const stressInertia = Math.min(1, cumW / 8);
      const stressFloor = stressInertia * 0.28; // 8 sem → 28%, 4 sem → 14%, 3 sem → 10%
      strFinal = Math.max(strFinal, stressFloor);
    }

    // ── USURE LONG TERME — weekend insuffisant à recharger après surcharge chronique ──
    // de Bloom 2010 : après 6+ semaines de surcharge, 2j de repos ne suffisent plus.
    // Sans ce correctif : recovery = 96 le lundi matin après 8 semaines à 45h (irréaliste).
    // Avec : recovery ≈ 80-85 (cohérent avec INRS phase P2/P3).
    // Seuil : > 6 semaines (P2 bien installée). Amplitude : 6%/sem au-delà de 6 sem.
    // Plancher : 50 (même en surcharge chronique, il reste de la capacité de récup).
    // En vacances : pas d'usure supplémentaire (le repos prolongé brise le cycle).
    if (cumW > 6 && !isVacWeekNow) {
      const usure = Math.min(0.45, (cumW - 6) * 0.06); // 6%/sem au-delà du seuil
      recFinal = Math.max(0.50, recFinal - usure);
    }

    // ── DÉGRADATION RÉCUPÉRATION — usure progressive INRS phases P2/P3 ───────────
    // En surcharge active : recovery structurellement plafonnée par la dette accumulée.
    // Seuil 3 sem : entrée P1→P2 (INRS). Seuil 6 sem : P2→P3 établi (dégradation amplifiée).
    if (cumW >= 3 && !isVacWeekNow) recFinal = Math.max(0, recFinal - 0.02); // −2% dès 3 sem
    if (cumW >= 6 && !isVacWeekNow) recFinal = Math.max(0, recFinal - 0.03); // −3% de plus ≥6 sem

    // ── PLAFOND LONG TERME — dette physiologique irréductible (OMS/INRS/McEwen) ──
    // Après 6+ sem. de surcharge, la récupération parfaite est biologiquement impossible.
    // INRS phase P2/P3 : retour à P1 = 2-6 semaines minimum (pas 1 weekend).
    // McEwen 1998 (allostatic load) : charge chronique → seuil de stress basal élevé.
    // Guard !isVacWeekNow : évite conflit avec vacationFloor (0.80-0.92 en vacances).
    if (cumW >= 6 && !isVacWeekNow) {
      recFinal  = Math.min(recFinal,  0.45); // rec  ≤ 45% — cible surcharge chronique INRS P2/P3
      perfFinal = Math.min(perfFinal, 0.75); // perf ≤ 75% — Pencavel 2014 (abaissé vs 0.85)
      strFinal  = Math.max(strFinal,  0.20); // stress ≥ 20% — McEwen 1998 allostatic load
    }

    // ── PLAFOND DYNAMIQUE PERFORMANCE — inertie post-surcharge (Pencavel 2014) ───
    // La performance ne peut pas excéder une valeur liée à la fatigue résiduelle.
    // Pencavel 2014 : "output quality degrades before quantity — restoration is non-linear"
    // OEM 2025 (Jang) : "cognitive performance recovery takes weeks after chronic overload"
    // Formule : perf ≤ 1 − fatFinal × 0.50
    // fat=40% → perf ≤ 80% | fat=60% → perf ≤ 70% | fat=20% → perf ≤ 90%
    if (fatFinal > 0.20) {
      // Pénalité cumulative : -2% par semaine au-delà de 4 sem (max -25%)
      // → perf met plusieurs semaines à remonter après surcharge prolongée
      const cumWPerfPenalty = cumW >= 4 ? Math.min(0.25, (cumW - 4) * 0.02) : 0;
      const perfCap = Math.max(0.05, 1 - fatFinal * 0.50 - cumWPerfPenalty);
      if (perfFinal > perfCap) perfFinal = perfCap;
    }

    // ── INERTIE PERFORMANCE POST-RÉCUPÉRATION ────────────────────────────────────
    // La récupération physique est rapide ; la performance cognitive/professionnelle non.
    // Règle 1 — recovery < 90% → perf ≤ 95% (latence de reprise universelle)
    //   Logique : tant que la récupération n'est pas quasi-complète, la performance
    //   ne peut pas être optimale. S'applique même hors surcharge prolongée.
    if (recFinal < 0.90) {
      perfFinal = Math.min(perfFinal, 0.95);
    }
    // Règle 2 — vacances récentes && reprise du travail → perf ≤ 92% pendant 1 semaine
    //   Sonnentag 2003 : "re-entry effect" — les 1ers jours de reprise sont moins efficaces.
    //   recentVac28 >= 5j && !isVacWeekNow = semaine de reprise après au moins 1 sem OFF.
    if (recentVac28 >= 5 && !isVacWeekNow) {
      perfFinal = Math.min(perfFinal, 0.92);
    }

    // ── FATIGUE CHRONIQUE — effet boule de neige progressif (J.Occup.Health 2021 + INRS) ──
    // 3 paliers cumulatifs : chaque étape s'additionne aux précédentes.
    // Palier 1 (≥4 sem) : début accumulation chronique → +2% fixe
    if (cumW >= 4) fatFinal = Math.min(1, fatFinal + 0.02);
    // Palier 2 (≥6 sem) : mécanismes adaptatifs épuisés → +5% relatif (non-linéaire)
    if (cumW >= 6) fatFinal = Math.min(1, fatFinal + fatFinal * 0.05);
    // Palier 3 (≥8 sem) : surmenage chronique installé → +3% supplémentaire
    if (cumW >= 8) fatFinal = Math.min(1, fatFinal + 0.03);

    // ── COUPLAGE RÉCUPÉRATION ↔ FATIGUE (Meijman & Mulder 1998) ─────────────
    // Récupération insuffisante → fatigue s'aggrave ; récupération forte → atténue.
    if (recFinal < 0.50) {
      fatFinal = Math.min(1, fatFinal + 0.01);
    }
    if (recFinal > 0.70) {
      fatFinal = Math.max(0, fatFinal - 0.01);
    }

    // ── CORRÉLATION INTER-SCORES (cohérence biologique) ──────────────────────
    // Si stress chronique élevé → cvRisk et cogRisk doivent augmenter (OMS/OIT 2021)
    // Kivimäki 2015 : chaque +10 pts stress → +4% cvRisk
    // OEM 2025 (Jang) : stress chronique amplifie le risque cérébral si exposé >52h
    const stressBoostCV  = strFinal * 0.15;   // stress 100% → +15 pts cvRisk
    const stressBoostCog = (strFinal > 0.6 && cumW > 4) ? (strFinal - 0.6) * 0.10 : 0;

    return {
      fatigue:      Math.round(fatFinal * 100),
      stress:       Math.round(strFinal * 100),
      performance:  Math.round(perfFinal * 100),
      recovery:     Math.round(recFinal * 100),
      errorRisk:    Math.round(errRisk * 100),
      overloadRisk: Math.round(overRisk * 100),
      cvRisk:       Math.round(Math.min(Math.max(0, cvR + fatFinal * 0.10 + strFinal * 0.12 + stressBoostCV + (lifestyleBoost.cvRisk||0)), 1) * 100),
      cogRisk:      Math.round(Math.min(cogR + fatFinal * 0.15 + stressBoostCog, 1) * 100),
      diabetesRisk: Math.round(diabR * 100),
      musculoRisk:  Math.round(muscR * 100),
      _f: fatFinal, _s: strFinal, _p: perfFinal, _r: recFinal,
      _hasData: true, _hasM1: hasM1, _hasM2: hasM2,
      _weeklyH: weeklyH, _cumulWeeks: cumW,
    };
  }

  /* ── Adaptatif ──────────────────────────────────────────────── */
  _loadCoefs() {
    const def = { fh: 1, fc: 1 };
    try { const r = localStorage.getItem('DTE_COEFS'); if (r) return Object.assign(def, JSON.parse(r)); } catch(_) {}
    return def;
  }
  saveCoefs() { try { localStorage.setItem('DTE_COEFS', JSON.stringify(this._coefs)); } catch(_) {} }
  adapt(real, predicted, key) {
    const err = real - predicted;
    this._coefs[key] = Math.max(0.5, Math.min(2, this._coefs[key] - D.LR * err));
    this.saveCoefs();
  }
  resetCoefs() { this._coefs = { fh: 1, fc: 1 }; this.saveCoefs(); }
  autoAdapt() {
    const state = this._cache;
    if (!state || !state.raw.rpg.burnout) return;
    const real = state.raw.rpg.burnout / 100;
    const pred = state.scores._f || 0;
    this.adapt(real, pred, 'fh');
    this.adapt(real, pred, 'fc');
  }

  /* Expose les fonctions scientifiques */

  /** Debug : affiche les clés localStorage trouvées */
  debugStorage() {
    const report = { keys: [], m1Keys: [], m2Keys: [], rpgKeys: [] };
    try {
      for(let i=0; i<localStorage.length; i++){
        const k = localStorage.key(i);
        if(!k) continue;
        report.keys.push(k);
        if(k.startsWith('DATA_REPORT_')) report.m1Keys.push({ key:k, size: localStorage.getItem(k)?.length });
        if(k.startsWith('CA_HS_TRACKER')) report.m2Keys.push({ key:k, size: localStorage.getItem(k)?.length });
        if(k.startsWith('rpg_')) report.rpgKeys.push({ key:k, val: localStorage.getItem(k)?.substring(0,50) });
      }
    } catch(e) { report.error = e.message; }
    console.table(report.m1Keys);
    console.table(report.m2Keys);
    console.log('[DTE Debug] Toutes les clés:', report.keys);
    return report;
  }

  static pencavelPerf(h) { return pencavelPerf(h); }
  static cvRisk(h, m)    { return cvRisk(h, m); }
  static cogRisk(h, w)   { return cogRisk(h, w); }
}

global.DTEEngine = DTEEngine;
if (typeof module !== 'undefined' && module.exports) module.exports = { DTEEngine };
}(typeof window !== 'undefined' ? window : global));
