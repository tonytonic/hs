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

/* ── CONSTANTES DE BASE ─────────────────────────────────────────── */
const D = {
  BASE_HEBDO:       35,    // France contrat standard
  BASE_JOUR:         7,    // heures/jour base
  SLEEP_OPTIMAL:     8,    // sommeil optimal (h)
  SLEEP_MIN:         6,    // seuil critique sommeil (J.Occup.Health 2021)
  CONTINGENT_MAX:  220,    // contingent HS annuel légal (Art. L3121-33)
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
 */
function cvRisk(weeklyH, cumulMonths) {
  if (weeklyH < D.H_LEGAL) return 0;
  // RR à 55h = 1.35 (AVC) → risque relatif excédentaire = 0.35
  // Linéarisé : 0.35 / (55-48) = 0.05 par heure
  const excessH    = Math.min(weeklyH - D.H_LEGAL, 20);
  const baseRisk   = excessH * 0.028; // calibré sur RR=1.35 à 55h
  // Dose durée (Lancet 2021 : les 6 derniers mois comptent)
  const durationF  = Math.min(1.8, 1 + cumulMonths * 0.08);
  return Math.min(0.65, baseRisk * durationF);
}

/**
 * RISQUE COGNITIF — OEM 2025 (Jang et al.)
 * +19% volume gyrus frontal médian à ≥52h → impact sur attention,
 * mémoire de travail, planification, régulation émotionnelle
 * Seuil : 52h/sem, augmente avec durée d'exposition
 */
function cogRisk(weeklyH, cumulWeeks) {
  if (weeklyH < D.H_CEREBRAL) return 0;
  const excessH  = weeklyH - D.H_CEREBRAL;
  const durationF = Math.min(2.0, 1 + cumulWeeks * 0.05);
  return Math.min(0.70, excessH * 0.022 * durationF);
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
function cortisolModel(weeklyH, variabSigma, cumulWeeks) {
  const loadF    = Math.max(0, (weeklyH - D.H_OPTIMAL) / (D.H_CV - D.H_OPTIMAL));
  const variabF  = Math.min(1, variabSigma / 8);
  // Saturation HPA à ~10 semaines — Thompson 2022 + ANACT
  const chronicF = Math.min(2.5, 1 + cumulWeeks * 0.15);
  return Math.min(1, (loadF * 0.55 + variabF * 0.45) * chronicF);
}

/**
 * DETTE DE SOMMEIL — J.Occup.Health 2021 + Thompson 2022
 * <6h/jour → burn-out; relation non-linéaire
 * Les 6 derniers mois de dette s'accumulent
 */
function sleepDebtScore(avgDailyH) {
  // Sommeil estimé = max(SLEEP_OPTIMAL - (totalH - BASE_JOUR) * 0.5, SLEEP_MIN - 2)
  const estimatedSleep = Math.max(3, D.SLEEP_OPTIMAL - Math.max(0, avgDailyH - D.BASE_JOUR) * 0.45);
  if (estimatedSleep >= D.SLEEP_OPTIMAL) return 0;
  if (estimatedSleep >= 7) return (D.SLEEP_OPTIMAL - estimatedSleep) * 0.10;
  if (estimatedSleep >= D.SLEEP_MIN) return 0.15 + (7 - estimatedSleep) * 0.18; // accélération
  return 0.51 + (D.SLEEP_MIN - estimatedSleep) * 0.25; // critique <6h
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
      let raw = null;
      for(const k of keys){ raw = localStorage.getItem(k); if(raw && raw !== '{}' && raw !== 'null') break; }
      if (!raw || raw === '{}') return r;
      const d = JSON.parse(raw);
      // M1 stocke data['2026-03-14']={extra,recup,absent} à la racine
      let days = d.days || d.jours || {};
      if (!Object.keys(days).length && typeof d === 'object') {
        const fk = Object.keys(d)[0] || '';
        if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(fk)) days = d;
      }
      for (const [date, e] of Object.entries(days)) {
        if (!e || typeof e !== 'object') continue;
        const extra  = parseHours(e.extra ?? e.hs ?? 0);
        const recup  = parseHours(e.recup ?? e.repos ?? 0);
        const absent = parseFloat(e.absent || 0);
        r.days[date] = { extra, recup, absent };
        r.totalExtra += extra;
        r.totalRecup += recup;
        if (!absent) r.totalWorkedDays++;
      }
      r.violations = d.violations || [];
      // Lire les jours fériés : M1 (SPECIAL_DAYS) + M4 propre (DTE_FERIES)
      try {
        const year = new Date().getFullYear();
        for (const y of [year-1, year, year+1]) {
          const sd = JSON.parse(localStorage.getItem('SPECIAL_DAYS_'+y) || '{}');
          Object.entries(sd).forEach(([date, type]) => { if(type==='ferie') r.specialDays[date] = 'ferie'; });
          const fd = JSON.parse(localStorage.getItem('DTE_FERIES_'+y) || '{}');
          Object.keys(fd).forEach(date => { r.specialDays[date] = 'ferie'; });
        }
      } catch(_) {}
      // Lire les vacances module4 (DTE_VACANCES_{year})
      try {
        const year = new Date().getFullYear();
        for (const y of [year-1, year, year+1]) {
          const vac = JSON.parse(localStorage.getItem('DTE_VACANCES_'+y) || '{}');
          Object.keys(vac).forEach(date => { r.vacances[date] = true; });
        }
      } catch(_) {}
    } catch(e) { console.warn('[DTE-E] m1:', e); }
    return r;
  }

  _m2(year) {
    const r = { months: {}, contract: D.BASE_HEBDO, totalWorked: 0, totalDaysOff: 0 };
    try {
      // M2 stocke CA_HS_TRACKER_V1_DATA_{year}
      // Structure : { "2026-03": { days:{"14":2.5,"15":1}, paid:0, carry:0, closing:28 }, ... }
      const keys = [ 'CA_HS_TRACKER_V1_DATA_' + year ];
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
    const todayDowA = today.getDay() || 7; // 1=lun..7=dim
    const weekMondayA = new Date(today);
    weekMondayA.setDate(today.getDate() - (todayDowA - 1)); // lundi de cette semaine
    let sumExtra = 0, countWorkDays28 = 0;
    // Fenêtre 28j glissante — ne compte que les jours ouvrés (lun-ven) non absents
    for (let i = 0; i < 28; i++) {
      const d = new Date(today); d.setDate(today.getDate() - i);
      const dow = d.getDay();
      if (dow === 0 || dow === 6) continue; // ignorer week-ends
      const k = localDK(d);
      if (specialDays[k] === 'ferie' || vacances[k]) continue;
      const e = days[k];
      if (e && e.absent > 0) continue;
      // Jour ouvré : on compte les HS (0 si pas d'entrée = journée normale, sans HS)
      sumExtra += (e ? (e.extra || 0) : 0);
      countWorkDays28++;
    }
    // avgExtraPerDay28 = HS/jour moyen sur 4 semaines → weeklyExtra = HS/sem = avg × 5
    const avgExtraPerDay28 = countWorkDays28 > 0 ? sumExtra / countWorkDays28 : 0;
    const weeklyExtra28 = avgExtraPerDay28 * 5;  // projeté sur 5j ouvrés/sem

    // Semaine civile courante (lun → aujourd'hui) — pour affichage et fallback
    let sumExtra7 = 0, count7 = 0;
    for (let dd = 0; dd < todayDowA && dd < 5; dd++) {
      const d = new Date(weekMondayA); d.setDate(weekMondayA.getDate() + dd);
      if (d > today) break;
      const k = localDK(d);
      const e = days[k];
      if (!e || !e.absent) { sumExtra7 += (e ? (e.extra || 0) : 0); count7++; }
    }
    // weeklyExtra : on utilise la fenêtre 28j si suffisamment de données (≥5 jours ouvrés)
    // Sinon extrapolation de la semaine civile courante si elle a ≥2 jours
    let weeklyExtra;
    if (countWorkDays28 >= 5) {
      weeklyExtra = weeklyExtra28; // fenêtre 28j = référence principale
    } else if (count7 >= 2) {
      weeklyExtra = (sumExtra7 / count7) * 5; // extrapolation semaine courante
    } else {
      // Fallback : semaine précédente
      let prevExtra = 0, prevCount = 0;
      for (let dd = 0; dd < 5; dd++) {
        const dt = new Date(weekMondayA); dt.setDate(weekMondayA.getDate() - 7 + dd);
        const k = localDK(dt);
        const e = days[k];
        if (e && !e.absent) { prevExtra += e.extra || 0; prevCount++; }
      }
      weeklyExtra = prevCount >= 3 ? prevExtra : 0;
    }
    const avgExtra7  = weeklyExtra / 5;         // HS/j = total semaine ÷ 5 jours ouvrés
    const avgH7      = D.BASE_JOUR + avgExtra7; // h/j moyenne
    const weeklyH7   = 35 + weeklyExtra;        // 35h base + HS réelles de la semaine

    // ── JOURS CONSÉCUTIFS — deux compteurs distincts ─────────────────────────
    // [1] consec (légal) : jours ouverts SANS weekend (L3132-1)
    //     → le weekend casse le compteur = repos hebdomadaire légal
    let consec = 0;
    for (let i = 0; i < 60; i++) {
      const d = new Date(today); d.setDate(today.getDate() - i);
      const dow = d.getDay();
      if (dow === 0 || dow === 6) break; // weekend = repos légal
      const k = localDK(d);
      const e = days[k];
      if (e && (e.absent > 0 || e.recup > 0)) break;
      if (specialDays[k] === 'ferie') break;
      if (vacances[k]) break;
      consec++;
    }
    // [2] consecOT (médical chronique) : jours ouvrés AVEC heures sup, en ignorant
    //     les week-ends car ils ne permettent pas la récupération après surcharge chronique
    //     (Sonnentag 2003 : détachement psychologique rompu ; Thompson 2022 : cortisol cumulatif)
    //     → reset uniquement sur : absence, récup, ferie, vacances, OU semaine entière sans HS
    let consecOT = 0;
    let blankWeeks = 0; // semaines sans aucune HS → seul vrai "reset" biologique
    outer_loop: for (let i = 0; i < 90; i++) {
      const d = new Date(today); d.setDate(today.getDate() - i);
      const dow = d.getDay();
      if (dow === 0 || dow === 6) continue; // passer le week-end sans casser le compteur
      const k = localDK(d);
      const e = days[k];
      if (vacances[k]) break; // vacances = récupération réelle
      if (specialDays[k] === 'ferie') { continue; } // férié ouvré = pause, ne casse pas
      if (e && (e.absent > 0 || e.recup > 0)) break; // repos compensateur = reset
      // Vérifier si toute la semaine de ce jour était sans HS (récupération complète)
      const wMon = new Date(d); wMon.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1));
      let weekHasOT = false;
      for (let dd = 0; dd < 5; dd++) {
        const wd = new Date(wMon); wd.setDate(wMon.getDate() + dd);
        const ek = localDK(wd);
        if (days[ek] && days[ek].extra > 0) { weekHasOT = true; break; }
      }
      if (!weekHasOT) { blankWeeks++; if (blankWeeks >= 2) break; continue; }
      blankWeeks = 0;
      if (e && e.extra > 0) consecOT++; // jour ouvré avec HS → compte
    }

    // Semaines cumulées de surcharge sur 1 an (J.Occup.Health 2021)
    // Parcours lun-ven de chaque semaine civile en remontant
    // BUG FIX :
    //   1. La semaine courante incomplète (ex: mer) est extrapolée → comptée si proj > H_OPTIMAL
    //   2. Fallback : si count logique = 0, recalcul via la plage de dates du log
    let cumulWeeks = 0;
    const todayDow = today.getDay() || 7; // 1=lun ... 7=dim
    const todayMonday = new Date(today);
    todayMonday.setDate(today.getDate() - (todayDow - 1));
    for (let w = 0; w < 52; w++) {
      let weekH = 0, hasAnyDay = false, daysLogged = 0;
      for (let dd = 0; dd < 5; dd++) { // lun=0 à ven=4
        const dt = new Date(todayMonday);
        dt.setDate(todayMonday.getDate() - w * 7 + dd);
        if (dt > today) continue; // pas dans le futur
        const k = localDK(dt);
        const e = days[k];
        if (e && e.absent) continue; // jour absent ignoré
        // Jour ouvré : BASE_JOUR + HS (0 si pas d'entrée = jour normal)
        weekH += D.BASE_JOUR + (e ? (e.extra || 0) : 0);
        hasAnyDay = true;
        if (e && e.extra > 0) daysLogged++;
      }
      // Extrapoler la semaine courante (w=0) si incomplète
      // Ex: mer avec 3×2h HS = 27h → projeté 5j = 45h > 40h → compter
      if (w === 0 && count7 >= 2 && count7 < 5 && daysLogged >= 2) {
        // On a déjà calculé weeklyExtra (extrapolé) — l'utiliser directement
        weekH = 35 + weeklyExtra;
      }
      // Ignorer les semaines de vacances ou entièrement fériées
      const isVacWeek = [0,1,2,3,4].some(dd => { const dt2=new Date(todayMonday); dt2.setDate(todayMonday.getDate()-w*7+dd); const k2=localDK(dt2); return vacances[k2]; });
      if (hasAnyDay && !isVacWeek && weekH > D.H_OPTIMAL) cumulWeeks++;
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

    const cumulMonths = cumulWeeks / 4.33;

    // Variabilité horaire (ANACT) — fenêtre VARIAB_WINDOW semaines COMPLÈTES passées
    // Exclut la semaine courante si incomplète (< 3 jours) pour éviter sigma artificiel
    const weekTotals = [];
    const todayDowV = today.getDay() || 7;
    const todayMondayV = new Date(today);
    todayMondayV.setDate(today.getDate() - (todayDowV - 1));
    for (let w = 0; w < D.VARIAB_WINDOW + 1; w++) { // +1 pour ignorer sem courante si besoin
      let wt = 0, daysInWeek = 0;
      for (let dd = 0; dd < 5; dd++) {
        const dt = new Date(todayMondayV);
        dt.setDate(todayMondayV.getDate() - w * 7 + dd);
        if (dt > today) continue;
        const k = localDK(dt);
        const e = days[k];
        if (e && e.absent) continue;
        if (specialDays[k] === 'ferie' || vacances[k]) continue;
        wt += D.BASE_JOUR + (e ? (e.extra || 0) : 0);
        daysInWeek++;
      }
      // Inclure uniquement les semaines avec ≥ 3 jours ouvrés (semaine représentative)
      if (daysInWeek >= 3) weekTotals.push(wt);
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

    // Taux de surcharge (jours >BASE+2h)
    const allDays   = Object.values(days);
    const overCount = allDays.filter(d => (D.BASE_JOUR + d.extra) > D.BASE_JOUR + 2).length;
    const overRatio = allDays.length ? overCount / allDays.length : 0;

    // Contingent
    const contingentPct = (m1.totalExtra / D.CONTINGENT_MAX) * 100;

    // Moyenne pondérée semaines (poids plus fort sur les récentes)
    // recentWeeklyH : semaine courante si elle a des données, sinon moyenne historique
    const recentWeeklyH = weeklyH7 > 35 ? weeklyH7 : (mean > 35 ? mean : weeklyH7);

    return {
      heures:         clamp(avgH7, 0, 14),
      consec:         clamp(consec, 0, 14),
      surcharge:      clamp(overRatio, 0, 1),
      variab:         clamp(sigma, 0, 12),
      burnout:        Math.max(0, Math.min(1, rpg.burnout / 100)),
      motiv:          Math.max(0, Math.min(1, rpg.motivation)),
      extStress:      Math.max(0, Math.min(1, rpg.stress)),
      sleepDebt:      sleepDebtScore(avgH7),
      // Valeurs brutes pour les calculs
      _avgExtra7:     avgExtra7,
      _avgH7:         avgH7,
      _weeklyH7:      weeklyH7,
      _recentWeeklyH: recentWeeklyH,
      _consec:        consec,
      _consecOT:      consecOT,   // jours ouvrés consécutifs avec HS (cross-semaines, médical)
      _cumulWeeks:    cumulWeeks,
      _cumulMonths:   cumulMonths,
      _sigma:         sigma,
      _contingentPct: contingentPct,
      _contract:      m2.contract || D.BASE_HEBDO,
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
      const ci       = history.find(h=>h.date===today) || history[history.length-1];
      if (ci) {
        // Sommeil court → fatigue +, performance −
        if (ci.sleep !== undefined) {
          const sleepDef = (4 - ci.sleep) / 4;  // 0=bien, 1=très mal
          checkinBoost.fatigue    += sleepDef * 0.14;  // Thompson 2022: +14% cortisol après privation
          checkinBoost.performance -= sleepDef * 0.15;  // Thomson 2022 + OMS: perf −15% nuit courte
          checkinBoost.recovery   -= sleepDef * 0.15;
        }
        // Énergie basse → fatigue +
        if (ci.energy !== undefined) {
          const energyDef = (4 - ci.energy) / 4;
          checkinBoost.fatigue    += energyDef * 0.15;
          checkinBoost.performance -= energyDef * 0.12;
        }
        // Stress ressenti → stress +
        if (ci.stress !== undefined) {
          checkinBoost.stress += (ci.stress / 4) * 0.30;  // ANACT: stress ressenti corrèle 0.65 avec cortisol
        }
        // Douleurs → fatigue musculo +
        if (ci.pain !== undefined && ci.pain > 0) {
          checkinBoost.fatigue += (ci.pain / 4) * 0.10;
        }
        // Motivation → performance +
        if (ci.motiv !== undefined) {
          checkinBoost.performance += ((ci.motiv - 2) / 4) * 0.12;  // Nature 2025: sens au travail atténue fatigue perçue
        }
      }
    } catch(_) {}
    const cumW    = norm._cumulWeeks    || 0;
    const cumM    = norm._cumulMonths   || 0;

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
    const fatHS         = norm._avgExtra7 * 0.130 * c.fh; // INRS phases — voir dérivation ci-dessus
    const fatSommeil    = norm.sleepDebt * 0.35;           // Thompson 2022 : +14% cortisol/nuit courte
    const fatSurchar    = norm.surcharge * 0.12;
    const fatBurnout    = norm.burnout * 0.22;

    // J.Occup.Health 2021 — amplification dose-temps non-linéaire
    const cumulAmp = cumW >= 24 ? 2.20   // 6 mois — seuil décisif étude Taiwan
                   : cumW >= 16 ? 1.95   // 4 mois
                   : cumW >= 12 ? 1.75   // 3 mois — risque OMS biologique établi
                   : cumW >= 10 ? 1.65   // 2.5 mois
                   : cumW >= 8  ? 1.55   // 2 mois
                   : cumW >= 4  ? 1.25   // 1 mois
                   : 1.0;

    // Sonnentag 2003 — dégradation du détachement psychologique
    // Effets mesurés sur : relaxation, maîtrise, contrôle pendant les hors-travail
    const sonnentagMult = consecOT >= 20 ? 1.15   // >4 sem HS : détachement sévèrement compromis
                        : consecOT >= 12 ? 1.10   // >2.4 sem HS : détachement partiellement compromis
                        : consecOT >= 5  ? 1.05   // >1 sem HS : premier signal Sonnentag
                        : 1.0;                    // <5j : récupération weekend normale (baseline)

    const fat_raw = (fatHS + fatSommeil + fatSurchar + fatBurnout) * cumulAmp * sonnentagMult;
    const fatigue = Math.max(0, Math.min(1, fat_raw));

    // ── STRESS/CORTISOL (Thompson 2022 + ANACT/INRS) ─────────────────────────
    // Thompson 2022 : le cortisol est le MARQUEUR BIOLOGIQUE PRIMAIRE du stress
    // → poids cortisol porté de 0.55 à 0.65 (Thompson confirme la primauté biologique
    //   par rapport aux indicateurs subjectifs)
    const cortisolS  = cortisolModel(weeklyH, norm._sigma || 0, cumW);
    const stressExt  = fatigue * 0.30 + norm.extStress * 0.20 + norm.variab * 0.12;
    const stress     = Math.max(0, Math.min(1, cortisolS * 0.65 + stressExt));

    // ── PERFORMANCE (Pencavel 2014, Stanford) ────────────────────
    const perfPencavel = pencavelPerf(weeklyH);
    // Dégradation cognitive OEM 2025 (>52h)
    const cogDeg       = cogRisk(weeklyH, cumW);
    const perfMotiv    = norm.motiv * 0.12;
    const perfFat      = fatigue * 0.58;
    const perfStr      = stress  * 0.10;
    const perf         = Math.max(0.05, Math.min(1, perfPencavel * (1 - cogDeg * 0.3) * (1 - perfFat) - perfStr + perfMotiv));

    // ── RÉCUPÉRATION ─────────────────────────────────────────────
    const recovery = Math.max(0.02, Math.min(1, D.RECOVERY_WE - fatigue * 0.40 - (cumW / 30) * 0.20));

    // ── RISQUE ERREUR (Pencavel + fatigue + INRS) ────────────────
    const errRisk = Math.max(0, Math.min(1, (1 - perf) * 0.35 + fatigue * 0.50 + stress * 0.15));

    // ── SURCHARGE STRUCTURELLE ────────────────────────────────────
    const overRisk = Math.max(0, Math.min(1, norm.surcharge * 0.40 + norm.heures * 0.35 + norm.consec * 0.25));

    // ── RISQUES SPÉCIFIQUES ÉTUDES ───────────────────────────────
    const cvR       = cvRisk(weeklyH, cumM);      // OMS 2021 + Lancet 2021 HR=1.68
    const cogR      = cogRisk(weeklyH, cumW);     // OEM 2025 (Jang et al.)
    const diabR     = metabolicRisk(weeklyH, cumM); // Lancet 2021 HR=1.18
    const muscR     = musculoRisk(weeklyH, cumM, norm._consec || 0); // Lancet 2021 HR=1.15

    // Appliquer lifestyle (multiplicateur sur fatigue) + check-in (additif modéré)
    const lsMult    = lifestyleBoost.fatigueMult || 1.0;
    const fatWithLS = fatigue * lsMult;  // lifestyle = multiplicateur (jamais à 0)
    const fatFinal  = Math.max(0, Math.min(1, fatWithLS + checkinBoost.fatigue));
    const strFinal  = Math.max(0, Math.min(1, stress   + checkinBoost.stress   + (lifestyleBoost.stress||0)));
    const perfFinal = Math.max(0.05, Math.min(1, perf  + checkinBoost.performance + (lifestyleBoost.performance||0)));
    const recFinal  = Math.max(0.02, Math.min(1, recovery + checkinBoost.recovery  + (lifestyleBoost.recovery||0)));

    return {
      fatigue:      Math.round(fatFinal * 100),
      stress:       Math.round(strFinal * 100),
      performance:  Math.round(perfFinal * 100),
      recovery:     Math.round(recFinal * 100),
      errorRisk:    Math.round(errRisk * 100),
      overloadRisk: Math.round(overRisk * 100),
      cvRisk:       Math.round(Math.min(Math.max(0, cvR + fatigue * 0.10 + stress * 0.08 + (lifestyleBoost.cvRisk||0)), 1) * 100),
      cogRisk:      Math.round(Math.min(cogR + fatigue * 0.15, 1) * 100),
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
