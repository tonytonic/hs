// ===== LEGAL ENGINE =====
// FOX_SCENARIOS est chargé par ../../js/scenarios-fox-data.js
// Ce fichier fournit les fonctions d'analyse juridique

console.log(`✅ FOX Legal Engine : ${typeof FOX_SCENARIOS !== 'undefined' ? FOX_SCENARIOS.length : 0} scénarios disponibles`);

function foxFindScenario(id) {
  return FOX_SCENARIOS.find(s => s.id === id) || null;
}

function foxFilterByCategory(category) {
  return FOX_SCENARIOS.filter(s => s.category === category);
}

function foxFilterByRisk(risk) {
  return FOX_SCENARIOS.filter(s => s.risk === risk);
}

function foxFilterByTag(tag) {
  return FOX_SCENARIOS.filter(s => s.tags && s.tags.includes(tag));
}

function foxSearchByName(query) {
  const q = query.toLowerCase();
  return FOX_SCENARIOS.filter(s => s.name.toLowerCase().includes(q));
}

function foxScenarioEngine(gameState) {
  if (!gameState) return { gameState, triggered: [] };

  const triggered = [];
  const totalHours  = gameState.totalWeeklyHours  || 0;
  const hasNight    = gameState.hasNightWork       || false;
  const hasSunday   = gameState.hasSundayWork      || false;
  const hasSaturday = gameState.hasSaturdayWork    || false;

  if (totalHours <= 35)                 triggered.push(foxFindScenario(1));
  else if (totalHours <= 40)            triggered.push(foxFindScenario(2));
  else if (totalHours <= 45)            triggered.push(foxFindScenario(3));
  else if (totalHours >= 48)            triggered.push(foxFindScenario(4));

  if (hasNight && totalHours <= 35)     triggered.push(foxFindScenario(11));
  if (hasSunday)                        triggered.push(foxFindScenario(22));
  if (hasSaturday && !hasSunday)        triggered.push(foxFindScenario(21));
  if (hasSaturday && hasSunday)         triggered.push(foxFindScenario(23));

  const unique = [...new Map(
    triggered.filter(Boolean).map(s => [s.id, s])
  ).values()];

  return { gameState, triggered: unique };
}

// ═══════════════════════════════════════════════════════════════
//  FOX SCENARIO ENGINE — VERSION EXPERTE
//  Analyse multi-dimensionnelle, 12 semaines glissantes,
//  détection de violations combinées, score de risque global
// ═══════════════════════════════════════════════════════════════

const FOX_LEGAL_LIMITS = {
  HEBDO_MAX_ABSOLU      : 48,    // Art. L3121-20 : jamais dépassable
  HEBDO_MAX_MOYENNE_12  : 44,    // Moyenne sur 12 semaines consécutives
  HEBDO_MAX_INTENSE     : 60,    // Secteur dérogation exceptionnelle
  DAILY_MAX             : 10,    // Art. L3121-19 : max journalier standard
  DAILY_MAX_DERO        : 12,    // Dérogation accord collectif
  REST_DAILY_MIN        : 11,    // Art. L3131-1 : repos quotidien
  REST_WEEKLY_MIN       : 35,    // Art. L3132-2 : repos hebdomadaire
  CONTINGENT_ANNUEL     : 220,   // Art. D3121-24 : seuil légal
  NIGHT_THRESHOLD_START : 21,    // Début travail de nuit (heure)
  NIGHT_THRESHOLD_END   : 6,     // Fin travail de nuit (heure)
  NIGHT_ANNUAL_THRESHOLD: 270,   // Heures nuit/an → statut travailleur nuit
  OVERTIME_RATE_25      : 1.25,
  OVERTIME_RATE_50      : 1.50,
};

// Codes de violation
const FOX_VIOLATIONS = {
  V01: { code: 'V01', label: 'Dépassement 48h absolu',    severity: 'critique', article: 'L3121-20' },
  V02: { code: 'V02', label: 'Moyenne 44h/12 sem.',       severity: 'élevé',   article: 'L3121-22' },
  V03: { code: 'V03', label: 'Repos quotidien < 11h',     severity: 'critique', article: 'L3131-1'  },
  V04: { code: 'V04', label: 'Repos hebdo < 35h',         severity: 'élevé',   article: 'L3132-2'  },
  V05: { code: 'V05', label: 'Journée > 10h',             severity: 'moyen',   article: 'L3121-19' },
  V06: { code: 'V06', label: 'Contingent annuel > 220h',  severity: 'élevé',   article: 'D3121-24' },
  V07: { code: 'V07', label: 'Travail nuit non déclaré',  severity: 'moyen',   article: 'L3122-2'  },
  V08: { code: 'V08', label: 'Dimanche sans compensation', severity: 'élevé',  article: 'L3132-3'  },
  V09: { code: 'V09', label: '6 jours consécutifs+',      severity: 'moyen',   article: 'L3132-1'  },
  V10: { code: 'V10', label: 'Signal burn-out détecté',   severity: 'humain',  article: 'RSST R4121' },
};

function foxScenarioEngineExpert(gameState) {
  if (!gameState) return _emptyEngineResult();

  const violations = [];
  const matchedScenarios = [];
  const context = _buildContext(gameState);

  // ── 1. ANALYSE SEMAINE COURANTE ──────────────────────────────────
  _analyzeCurrentWeek(context, violations, matchedScenarios);

  // ── 2. ANALYSE 12 SEMAINES GLISSANTES (rolling) ─────────────────
  _analyzeRollingAverage(context, violations, matchedScenarios);

  // ── 3. ANALYSE NUIT ──────────────────────────────────────────────
  _analyzeNightWork(context, violations, matchedScenarios);

  // ── 4. ANALYSE WEEKEND / JOURS FÉRIÉS ───────────────────────────
  _analyzeWeekendHoliday(context, violations, matchedScenarios);

  // ── 5. ANALYSE ABSENCES / REPOS ──────────────────────────────────
  _analyzeRest(context, violations, matchedScenarios);

  // ── 6. SIGNAL BURN-OUT ───────────────────────────────────────────
  _analyzeBurnout(context, violations, matchedScenarios);

  // ── 7. CONTINGENT ANNUEL ─────────────────────────────────────────
  _analyzeContingent(context, violations, matchedScenarios);

  // ── Score global de risque (0-100) ───────────────────────────────
  const riskScore = _computeRiskScore(violations, context);

  // ── Dédoublonnage des scénarios ──────────────────────────────────
  const uniqueScenarios = [...new Map(
    matchedScenarios.filter(Boolean).map(s => [s.id, s])
  ).values()].slice(0, 10); // max 10 scénarios affichés

  return {
    context,
    violations,
    matchedScenarios: uniqueScenarios,
    riskScore,
    riskLevel: _riskLevel(riskScore),
    burnoutSignal: context.burnoutScore >= 60,
    summary: _buildSummary(violations, riskScore, context),
    timestamp: new Date().toISOString(),
  };
}

// ─── Contexte enrichi ────────────────────────────────────────────
function _buildContext(gs) {
  const rolling = (typeof moduleReader !== 'undefined' && moduleReader.getRollingAnalysis)
    ? moduleReader.getRollingAnalysis(12)
    : { avgTotal: gs.weeklyHours || 35, violations: { over48: 0 }, trend: 'stable', weeks: [] };

  const burnout = (typeof moduleReader !== 'undefined' && moduleReader.getBurnoutScore)
    ? moduleReader.getBurnoutScore()
    : { score: 0, level: 'sain' };

  const m2 = (typeof moduleReader !== 'undefined')
    ? moduleReader.getModule2Summary()
    : { annualHours: 0, contingentPercent: 0 };

  return {
    weeklyHours    : gs.weeklyHours      || gs.totalWeeklyHours || 0,
    dailyHours     : gs.dailyHours       || [],          // tableau [lun,mar,mer,jeu,ven,sam,dim]
    hasNight       : gs.hasNightWork     || false,
    hasSunday      : gs.hasSundayWork    || false,
    hasSaturday    : gs.hasSaturdayWork  || false,
    hasHoliday     : gs.hasHolidayWork   || false,
    consecutiveDays: gs.consecutiveDays  || 0,
    nightHoursYear : gs.nightHoursYear   || 0,
    annualHours    : m2.totalHours       || gs.annualHours || 0,
    contingentPct  : m2.contingentPercent || 0,
    rolling,
    burnoutScore   : burnout.score,
    burnoutLevel   : burnout.level,
    trend          : rolling.trend,
  };
}

// ─── Semaine courante ─────────────────────────────────────────────
function _analyzeCurrentWeek(ctx, v, sc) {
  const h = ctx.weeklyHours;

  if (h >= FOX_LEGAL_LIMITS.HEBDO_MAX_ABSOLU) {
    v.push({ ...FOX_VIOLATIONS.V01, value: h });
    sc.push(foxFindScenario(4));
  } else if (h >= 45) {
    sc.push(foxFindScenario(3));
  } else if (h > 35) {
    sc.push(foxFindScenario(h <= 40 ? 2 : 3));
  } else {
    sc.push(foxFindScenario(1));
  }

  // Journées > 10h
  if (ctx.dailyHours && ctx.dailyHours.some(d => d > 10)) {
    v.push({ ...FOX_VIOLATIONS.V05, value: Math.max(...ctx.dailyHours) });
    sc.push(foxFindScenario(43)); // 12h journée
  }
}

// ─── Moyenne 12 semaines ──────────────────────────────────────────
function _analyzeRollingAverage(ctx, v, sc) {
  if (ctx.rolling.weeksAnalyzed < 2) return;
  const avg = ctx.rolling.avgTotal;

  if (avg >= FOX_LEGAL_LIMITS.HEBDO_MAX_MOYENNE_12) {
    v.push({ ...FOX_VIOLATIONS.V02, value: avg.toFixed(1) });
    sc.push(foxFindScenario(4));
  }

  if (ctx.rolling.violations.over48 >= 2) {
    v.push({ ...FOX_VIOLATIONS.V01, value: `${ctx.rolling.violations.over48} sem.` });
  }

  // Tendance haussière depuis > 6 semaines
  if (ctx.trend === 'hausse' && ctx.rolling.weeksAnalyzed >= 6) {
    sc.push(foxFindScenario(50)); // variable / irrégulier
  }
}

// ─── Travail de nuit ──────────────────────────────────────────────
function _analyzeNightWork(ctx, v, sc) {
  if (!ctx.hasNight) return;

  sc.push(foxFindScenario(11));

  if (ctx.nightHoursYear >= FOX_LEGAL_LIMITS.NIGHT_ANNUAL_THRESHOLD) {
    v.push({ ...FOX_VIOLATIONS.V07, value: `${ctx.nightHoursYear}h/an` });
    sc.push(foxFindScenario(16)); // semaine nuit complète → statut travailleur nuit
  }

  if (ctx.weeklyHours > 35 && ctx.hasNight) {
    sc.push(foxFindScenario(15)); // alternance jour/nuit
  }
}

// ─── Weekend / jours fériés ───────────────────────────────────────
function _analyzeWeekendHoliday(ctx, v, sc) {
  if (ctx.hasSunday) {
    v.push({ ...FOX_VIOLATIONS.V08, value: '1 dimanche' });
    sc.push(foxFindScenario(22));
    if (ctx.hasSaturday) sc.push(foxFindScenario(23));
  } else if (ctx.hasSaturday) {
    sc.push(foxFindScenario(21));
  }

  if (ctx.hasHoliday) sc.push(foxFindScenario(24));
  if (ctx.consecutiveDays >= 6) {
    v.push({ ...FOX_VIOLATIONS.V09, value: `${ctx.consecutiveDays}j` });
    sc.push(foxFindScenario(6));
  }
}

// ─── Repos ────────────────────────────────────────────────────────
function _analyzeRest(ctx, v, sc) {
  if (ctx.dailyHours && ctx.dailyHours.length >= 2) {
    for (let i = 1; i < ctx.dailyHours.length; i++) {
      const restBetween = 24 - ctx.dailyHours[i - 1];
      if (restBetween < FOX_LEGAL_LIMITS.REST_DAILY_MIN) {
        v.push({ ...FOX_VIOLATIONS.V03, value: `${restBetween.toFixed(1)}h` });
        break;
      }
    }
  }

  const totalWeekHours = ctx.dailyHours
    ? ctx.dailyHours.reduce((s, h) => s + h, 0) : ctx.weeklyHours;
  const restWeekly = 168 - totalWeekHours;
  if (restWeekly < FOX_LEGAL_LIMITS.REST_WEEKLY_MIN) {
    v.push({ ...FOX_VIOLATIONS.V04, value: `${restWeekly.toFixed(1)}h` });
  }
}

// ─── Signal burn-out ──────────────────────────────────────────────
function _analyzeBurnout(ctx, v, sc) {
  if (ctx.burnoutScore >= 40) {
    v.push({ ...FOX_VIOLATIONS.V10, value: `score ${ctx.burnoutScore}/100` });

    // Scénarios bien-être selon intensité
    if (ctx.burnoutScore >= 80) {
      sc.push(foxFindScenario(556)); // retour après burn-out
      sc.push(foxFindScenario(401)); // fatigue chronique
    } else if (ctx.burnoutScore >= 60) {
      sc.push(foxFindScenario(406)); // épuisement professionnel
      sc.push(foxFindScenario(411)); // perte d'efficacité perçue
    } else {
      sc.push(foxFindScenario(402)); // démotivation progressive
      sc.push(foxFindScenario(416)); // sentiment d'être submergé
    }
  }
}

// ─── Contingent annuel ────────────────────────────────────────────
function _analyzeContingent(ctx, v, sc) {
  if (ctx.contingentPct >= 100) {
    v.push({ ...FOX_VIOLATIONS.V06, value: `${ctx.annualHours}h` });
    sc.push(foxFindScenario(4));
  } else if (ctx.contingentPct >= 80) {
    sc.push(foxFindScenario(3));
  }
}

// ─── Score de risque global ───────────────────────────────────────
function _computeRiskScore(violations, ctx) {
  const weights = { critique: 30, élevé: 20, moyen: 10, humain: 15 };
  let score = violations.reduce((s, viol) => s + (weights[viol.severity] || 5), 0);
  score += Math.min(20, ctx.burnoutScore * 0.2);
  if (ctx.trend === 'hausse') score += 10;
  return Math.min(100, Math.round(score));
}

function _riskLevel(score) {
  if (score < 10) return { label: 'Sain',     color: '#4CAF50', emoji: '💚' };
  if (score < 30) return { label: 'Vigilance',color: '#FF8C42', emoji: '💛' };
  if (score < 55) return { label: 'Risque',   color: '#FF6B35', emoji: '🧡' };
  if (score < 80) return { label: 'Danger',   color: '#E53935', emoji: '🔴' };
  return            { label: 'Critique',      color: '#B71C1C', emoji: '🚨' };
}

function _buildSummary(violations, score, ctx) {
  if (violations.length === 0) return '✅ Situation conforme — aucune violation détectée.';
  const top = violations.slice(0, 3).map(v => `${v.label} (art. ${v.article})`).join(' · ');
  const suffix = violations.length > 3 ? ` + ${violations.length - 3} autre(s)` : '';
  return `⚠️ ${violations.length} violation(s) — ${top}${suffix}`;
}

function _emptyEngineResult() {
  return { violations: [], matchedScenarios: [], riskScore: 0,
           riskLevel: _riskLevel(0), burnoutSignal: false,
           summary: 'Aucune donnée', timestamp: new Date().toISOString() };
}

// Garde l'ancienne fonction (compatibilité)
// foxScenarioEngine() existe encore pour les anciens appels
