// ===============================
//  FOX ENGINE \u2013 MODULE READER
//  Lecture READ-ONLY de M1 (heures/) et M2 (paye/)
//  via leurs vraies cl\u00E9s localStorage
// ===============================

class ModuleReader {
  constructor() {
    this.year = localStorage.getItem('ACTIVE_YEAR_SUFFIX') || new Date().getFullYear().toString();
    this.module1Data = this.loadModule1Data();
    this.module2Data = this.loadModule2Data();
  }

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  //  MODULE 1 \u2014 heures/
  //  Cl\u00E9s r\u00E9elles : DATA_REPORT_{year}, ANNUAL_RATE_{year}, etc.
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  loadModule1Data() {
    try {
      const rawData     = JSON.parse(localStorage.getItem('DATA_REPORT_'    + this.year) || '{}');
      const rawReports  = JSON.parse(localStorage.getItem('REPORTS_REPORT_' + this.year) || '{}');
      const annualRate  = Number(localStorage.getItem('ANNUAL_RATE_'  + this.year)) || 10;
      const baseHebdo   = Number(localStorage.getItem('BASE_HEBDO_'   + this.year)) || 35;
      const periodMeta  = JSON.parse(localStorage.getItem('PERIOD_META_REPORT_' + this.year) || '{}');
      const exerciseStart = localStorage.getItem('EXERCISE_START_' + this.year) || '';

      // Calculer le total des heures sup depuis data[]
      // Chaque cl\u00E9 = date "YYYY-MM-DD", valeur = { extra, recup, absent }
      let totalExtra  = 0;
      let totalRecup  = 0;
      let totalAbsent = 0;
      const monthlyBreakdown = {};

      // \u2500\u2500 Regrouper par semaine ISO pour calcul correct \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
      const weeklyAccum = {};

      Object.entries(rawData).forEach(([dateKey, val]) => {
        if (typeof val !== 'object' || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return;
        const extra  = Number(val.extra  || 0);
        const recup  = Number(val.recup  || 0);
        const absent = Number(val.absent || 0);
        totalAbsent += absent;

        // Semaine ISO
        const d    = new Date(dateKey);
        const thu  = new Date(d); thu.setDate(d.getDate() - ((d.getDay()+6)%7) + 3);
        const yStart = new Date(thu.getFullYear(), 0, 4);
        const wNum = 1 + Math.round(((thu - yStart) / 86400000 - 3 + ((yStart.getDay()+6)%7)) / 7);
        const wk   = thu.getFullYear() + '-W' + String(wNum).padStart(2,'0');

        if (!weeklyAccum[wk]) weeklyAccum[wk] = { extra:0, recup:0, absent:0, month: dateKey.substring(0,7) };
        weeklyAccum[wk].extra  += extra;
        weeklyAccum[wk].recup  += recup;
        weeklyAccum[wk].absent += absent;
      });

      // \u2500\u2500 Calcul HS par semaine : max(0, extra - recup - absent) \u2500\u2500\u2500
      let netOvertime = 0;
      Object.values(weeklyAccum).forEach(w => {
        const weekHS = Math.max(0, w.extra - w.recup - w.absent);
        netOvertime += weekHS;
        totalExtra  += w.extra;
        totalRecup  += w.recup;
        const m = w.month;
        if (m) {
          if (!monthlyBreakdown[m]) monthlyBreakdown[m] = { extra:0, recup:0, absent:0, overtime:0 };
          monthlyBreakdown[m].extra   += w.extra;
          monthlyBreakdown[m].recup   += w.recup;
          monthlyBreakdown[m].absent  += w.absent;
          monthlyBreakdown[m].overtime += weekHS;
        }
      });

      // Mois courant
      const currentMonth = new Date().toISOString().substring(0, 7);
      const currentMonthData = monthlyBreakdown[currentMonth] || { extra: 0, recup: 0, absent: 0 };
      const currentMonthHours = baseHebdo + currentMonthData.extra - currentMonthData.recup;

      return {
        year:          this.year,
        baseHebdo,
        annualRate,
        totalExtra,
        totalRecup,
        netOvertime,
        monthlyHours:  currentMonthHours,
        monthlyBreakdown,
        exerciseStart,
        rawReports,
        periodMeta,
        hasData:       Object.keys(rawData).length > 0,
      };
    } catch (e) {
      console.warn('\u26A0\uFE0F Module Reader M1 : erreur lecture', e);
      return this._emptyM1();
    }
  }

  _emptyM1() {
    return {
      year: this.year, baseHebdo: 35, annualRate: 10,
      totalExtra: 0, totalRecup: 0, netOvertime: 0,
      monthlyHours: 35, monthlyBreakdown: {}, hasData: false,
    };
  }

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  //  MODULE 2 \u2014 paye/
  //  Cl\u00E9s r\u00E9elles : CA_HS_TRACKER_V1_DATA_{year}, CA_HS_TRACKER_V1_SETTINGS
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  loadModule2Data() {
    // Delegue a loadModule2ForYear pour le format correct
    return this.loadModule2ForYear(this.year);
  }

  _emptyM2() {
    return {
      year: this.year, annualHours: 0, totalPlus25: 0, totalPlus50: 0,
      contingentMax: 220, contingentUsed: 0, contingentRemaining: 220,
      contingentPercent: 0, monthlyBreakdown: {}, hasData: false,
    };
  }

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  //  SYNC avec le gameState RPG
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  syncWithGameState() {
    this.year      = localStorage.getItem('ACTIVE_YEAR_SUFFIX') || new Date().getFullYear().toString();
    this.module1Data = this.loadModule1Data();
    this.module2Data = this.loadModule2Data();
  }

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  //  R\u00C9SUM\u00C9S (appel\u00E9s par main-rpg.js)
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  getModule1Summary() {
    const m1 = this.module1Data;
    const alerts = [];

    if (m1.netOvertime > 200) alerts.push({ type: 'danger', msg: `\uD83D\uDEA8 ${m1.netOvertime}h sup accumul\u00E9es` });
    else if (m1.netOvertime > 100) alerts.push({ type: 'warning', msg: `\u26A0\uFE0F ${m1.netOvertime}h sup \u2014 restez vigilant` });

    if (!m1.hasData) alerts.push({ type: 'info', msg: '\uD83D\uDCCA Aucune donn\u00E9e M1 \u2014 saisissez vos heures dans le Module 1' });

    return {
      label:        'Module 1 \u2014 Suivi hebdomadaire',
      year:          m1.year,
      baseHebdo:     m1.baseHebdo,
      totalHours:    m1.monthlyHours,
      weeklyAverage: m1.baseHebdo,
      overtimeHours: m1.netOvertime,
      isCompliant:   m1.netOvertime < m1.annualRate * 10,
      alerts,
      hasData:       m1.hasData,
    };
  }

  getModule2Summary() {
    const m2 = this.module2Data;
    const alerts = [];

    if (m2.contingentPercent >= 100)
      alerts.push({ type: 'danger',  msg: `\uD83D\uDEA8 Contingent annuel atteint (${m2.annualHours}h / ${m2.contingentMax}h)` });
    else if (m2.contingentPercent >= 80)
      alerts.push({ type: 'warning', msg: `\u26A0\uFE0F ${m2.contingentPercent}% du contingent consomm\u00E9` });

    if (!m2.hasData) alerts.push({ type: 'info', msg: '\uD83D\uDCCA Aucune donn\u00E9e M2 \u2014 consultez le Module 2 Paie' });

    return {
      label:              'Module 2 \u2014 Paie & contingent',
      year:                m2.year,
      totalHours:          m2.annualHours,
      contingentUsed:      m2.contingentUsed,
      contingentRemaining: m2.contingentRemaining,
      contingentPercent:   m2.contingentPercent,
      contingentMax:       m2.contingentMax,
      overtimeRate:        m2.contingentPercent,
      isCompliant:         m2.annualHours <= m2.contingentMax,
      alerts,
      hasData:             m2.hasData,
    };
  }

  exportModuleData(moduleNum) {
    const data = moduleNum === 1 ? this.module1Data : this.module2Data;
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `module${moduleNum}_export_${this.year}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Instance legacy (remplac\u00E9e par ModuleReaderPro ci-dessous)
// const _legacyReader = new ModuleReader();

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
//  EXTENSION MULTI-ANN\u00C9ES  (ajout \u2014 ne modifie pas ce qui pr\u00E9c\u00E8de)
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

class ModuleReaderPro extends ModuleReader {

  // \u2500\u2500 D\u00E9tection automatique de toutes les ann\u00E9es stock\u00E9es \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  detectAllYears() {
    const years = new Set();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      // M1 : DATA_REPORT_YYYY
      const m1Match = key && key.match(/^DATA_REPORT_(\d{4})$/);
      if (m1Match) years.add(m1Match[1]);
      // M2 : CA_HS_TRACKER_V1_DATA_YYYY
      const m2Match = key && key.match(/^CA_HS_TRACKER_V1_DATA_(\d{4})$/);
      if (m2Match) years.add(m2Match[1]);
    }
    return [...years].sort();
  }

  // \u2500\u2500 Chargement M1 pour une ann\u00E9e donn\u00E9e \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  loadModule1ForYear(year) {
    try {
      const rawData    = JSON.parse(localStorage.getItem(`DATA_REPORT_${year}`)    || '{}');
      const annualRate = Number(localStorage.getItem(`ANNUAL_RATE_${year}`))  || 10;
      const baseHebdo  = Number(localStorage.getItem(`BASE_HEBDO_${year}`))   || 35;

      let totalExtra = 0, totalRecup = 0, totalAbsent = 0;
      const monthlyBreakdown = {};
      const weeklyData = {}; // cl\u00E9 = "YYYY-Www"

      // \u2500\u2500 1re passe : regrouper par semaine ISO \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
      Object.entries(rawData).forEach(([dateKey, val]) => {
        if (typeof val !== 'object' || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return;
        const extra  = Number(val.extra  || 0);
        const recup  = Number(val.recup  || 0);
        const absent = Number(val.absent || 0);
        totalAbsent += absent;

        const weekKey = this._getISOWeek(dateKey);
        if (!weeklyData[weekKey]) weeklyData[weekKey] = {
          extra: 0, recup: 0, absent: 0, overtime: 0,
          totalHours: baseHebdo, month: dateKey.substring(0, 7)
        };
        weeklyData[weekKey].extra  += extra;
        weeklyData[weekKey].recup  += recup;
        weeklyData[weekKey].absent += absent;
      });

      // \u2500\u2500 2e passe : calculer les HS R\u00C9ELLES semaine par semaine \u2500\u2500\u2500
      // R\u00E8gle M1 : HS = max(0, 35 + extra - recup - absent - 35)
      //          = max(0, extra - recup - absent)
      // Si absences/r\u00E9cup effacent les extras \u2192 semaine \u00E0 0 HS
      let netOvertime = 0;

      Object.entries(weeklyData).forEach(([wk, w]) => {
        // Heures travaill\u00E9es effectives cette semaine
        const effectiveHours = baseHebdo + w.extra - w.recup - w.absent;
        // HS = d\u00E9passement au-dessus de 35h
        const weekOvertime = Math.max(0, effectiveHours - baseHebdo);
        w.overtime    = weekOvertime;
        w.totalHours  = Math.max(0, effectiveHours);
        netOvertime  += weekOvertime;

        // Ventiler les HS de cette semaine dans le mois correspondant
        // Loi FR : 8 premieres HS/sem = +25%, au-dela = +50%
        const weekHs25 = Math.min(8, weekOvertime);
        const weekHs50 = Math.max(0, weekOvertime - 8);
        const month = w.month;
        if (month) {
          if (!monthlyBreakdown[month]) monthlyBreakdown[month] = { extra: 0, recup: 0, absent: 0, overtime: 0, hs25: 0, hs50: 0 };
          monthlyBreakdown[month].extra   += w.extra;
          monthlyBreakdown[month].recup   += w.recup;
          monthlyBreakdown[month].absent  += w.absent;
          monthlyBreakdown[month].overtime += weekOvertime;
          monthlyBreakdown[month].hs25    += weekHs25;
          monthlyBreakdown[month].hs50    += weekHs50;
        }
      });

      // totalExtra / totalRecup = sommes brutes (pour infos seulement)
      Object.values(weeklyData).forEach(w => {
        totalExtra += w.extra;
        totalRecup += w.recup;
      });

      const hasDataM1 = Object.keys(rawData).length > 0;
      return {
        year, baseHebdo, annualRate,
        totalExtra, totalRecup,
        netOvertime,
        totalAbsent, monthlyBreakdown, weeklyData,
        hasData: hasDataM1,
      };
    } catch(e) {
      return { year, baseHebdo: 35, annualRate: 10, totalExtra: 0, totalRecup: 0,
               netOvertime: 0, monthlyBreakdown: {}, weeklyData: {}, hasData: false };
    }
  }

  // \u2500\u2500 Chargement M2 pour une ann\u00E9e donn\u00E9e \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  // \u2500\u2500 Helper : calcul hs25/hs50 depuis les jours bruts M2 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // M2 stocke { days: { "15": 2.5, "22": 1 }, paid, carry, closing }
  // Il faut regrouper par semaine ISO puis appliquer hs25 = min(8, weekTotal)
  _computeM2MonthTotals(month) {
    if (!month || !month.days || typeof month.days !== 'object') {
      return { hs25: 0, hs50: 0 };
    }
    // On a besoin de la date du mois pour calculer les semaines
    // Les keys de days sont des numeros de jour (ex: "15")
    // On les traite ensemble par semaine civile (lun-dim)
    // MAIS on n'a pas la date du mois ici -- on utilisera le contexte appelant
    // Fallback simple : sum direct, pas de ventilation semaine possible sans date
    let total = 0;
    Object.values(month.days).forEach(h => { total += parseFloat(h) || 0; });
    const hs25 = Math.min(8 * 4, total); // max ~8h/sem x 4 sem
    const hs50 = Math.max(0, total - hs25);
    return { hs25, hs50 };
  }

  // \u2500\u2500 Helper : calcul hs25/hs50 avec regroupement semaine ISO \u2500\u2500\u2500\u2500\u2500
  _computeM2YearTotals(yearData, year) {
    // Regroupe tous les jours de l'annee par semaine ISO lun-dim
    // puis calcule hs25/hs50 par semaine
    const weeks = {}; // weekKey -> totalOT
    const monthBreakdown = {}; // YYYY-MM -> { hs25, hs50 }

    Object.entries(yearData).forEach(([monthKey, month]) => {
      if (!/^\d{4}-\d{2}$/.test(monthKey) || !month || !month.days) return;
      const [y, m] = monthKey.split('-').map(Number);

      Object.entries(month.days).forEach(([dayStr, h]) => {
        const hours = parseFloat(h) || 0;
        if (hours <= 0) return;
        const d = parseInt(dayStr);
        if (!d || d < 1 || d > 31) return;

        // Trouver le lundi de la semaine de cette date
        const date = new Date(y, m - 1, d);
        const dow  = date.getDay() || 7; // 1=lun ... 7=dim
        const monday = new Date(date);
        monday.setDate(date.getDate() - dow + 1);
        const wk = monday.getFullYear() + '-'
                 + String(monday.getMonth() + 1).padStart(2, '0') + '-'
                 + String(monday.getDate()).padStart(2, '0');

        if (!weeks[wk]) weeks[wk] = { total: 0, months: [] };
        weeks[wk].total += hours;
        if (!weeks[wk].months.includes(monthKey)) weeks[wk].months.push(monthKey);
      });
    });

    // Calcul hs25/hs50 par semaine, ventilation par mois proportionnelle
    let totalHs25 = 0, totalHs50 = 0, totalAnnual = 0;

    Object.values(weeks).forEach(wk => {
      const t   = wk.total;
      const s25 = Math.min(8, t);   // premieres 8h HS = taux 25%
      const s50 = Math.max(0, t - 8); // au dela = taux 50%
      totalHs25    += s25;
      totalHs50    += s50;
      totalAnnual  += t;

      // Ventiler dans les mois touches (proportionnel)
      const nb = wk.months.length;
      wk.months.forEach(mk => {
        if (!monthBreakdown[mk]) monthBreakdown[mk] = { hs25: 0, hs50: 0 };
        monthBreakdown[mk].hs25 += s25 / nb;
        monthBreakdown[mk].hs50 += s50 / nb;
      });
    });

    return { totalHs25, totalHs50, totalAnnual, monthBreakdown };
  }

  loadModule2ForYear(year) {
    try {
      const prefix   = 'CA_HS_TRACKER_V1';
      const yearData = JSON.parse(localStorage.getItem(prefix + '_DATA_' + year) || '{}');
      const settings = JSON.parse(localStorage.getItem(prefix + '_SETTINGS') || '{}');
      const contingentMax = settings.contingentAnnuel || 220;

      // Detecter le format : format reel M2 avec days:{} ou ancien format pre-calcule
      const hasDays = Object.values(yearData).some(
        function(m) { return m && typeof m === 'object' && m.days && Object.keys(m.days).length > 0; }
      );
      const hasOldFormat = Object.values(yearData).some(
        function(m) { return m && typeof m === 'object' && (m.hsPlus25 != null || m.hs25 != null); }
      );

      var totalAnnual = 0, totalPlus25 = 0, totalPlus50 = 0;
      var monthlyBreakdown = {};

      if (hasDays) {
        // Format reel M2 : calculer hs25/hs50 par semaine ISO
        var res = this._computeM2YearTotals(yearData, year);
        totalAnnual = res.totalAnnual;
        totalPlus25 = res.totalHs25;
        totalPlus50 = res.totalHs50;
        Object.entries(res.monthBreakdown).forEach(function(entry) {
          var mk = entry[0], v = entry[1];
          monthlyBreakdown[mk] = { hs25: v.hs25, hs50: v.hs50, total: v.hs25 + v.hs50 };
        });
      } else if (hasOldFormat) {
        Object.entries(yearData).forEach(function(entry) {
          var key = entry[0], month = entry[1];
          if (typeof month !== 'object') return;
          var hs25 = Number(month.hsPlus25 || month.hs25 || month.extra25 || 0);
          var hs50 = Number(month.hsPlus50 || month.hs50 || month.extra50 || 0);
          totalPlus25 += hs25; totalPlus50 += hs50; totalAnnual += hs25 + hs50;
          monthlyBreakdown[key] = { hs25: hs25, hs50: hs50, total: hs25 + hs50 };
        });
      }

      var hasData = hasDays || hasOldFormat;
      return {
        year: year, totalAnnual: totalAnnual, totalPlus25: totalPlus25,
        totalPlus50: totalPlus50, contingentMax: contingentMax,
        contingentPercent: Math.min(100, Math.round((totalAnnual / contingentMax) * 100)),
        monthlyBreakdown: monthlyBreakdown, hasData: hasData,
      };
    } catch(e) {
      console.warn('M2 loadYear error:', e);
      return { year: year, totalAnnual: 0, contingentMax: 220, contingentPercent: 0,
               monthlyBreakdown: {}, hasData: false };
    }
  }

  // \u2500\u2500 Historique complet toutes ann\u00E9es \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  getFullHistory() {
    const years = this.detectAllYears();
    const history = {};
    years.forEach(y => {
      history[y] = {
        m1: this.loadModule1ForYear(y),
        m2: this.loadModule2ForYear(y),
      };
    });
    return { years, history };
  }

  // \u2500\u2500 Analyse tendance sur N semaines glissantes \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  getRollingAnalysis(weeksBack = 12) {
    const allYears  = this.detectAllYears();
    const allWeeks  = [];

    allYears.forEach(y => {
      const data = this.loadModule1ForYear(y);
      Object.entries(data.weeklyData).forEach(([wk, val]) => {
        allWeeks.push({ week: wk, year: y, ...val });
      });
    });

    allWeeks.sort((a, b) => a.week.localeCompare(b.week));
    const last = allWeeks.slice(-weeksBack);

    if (last.length === 0) return this._emptyRolling();

    // Normaliser sur 52 semaines : 1 semaine a 45h sur 52 semaines
    // ne doit pas donner une moyenne de 45h - on ramene au pro-rata annuel
    const totalHoursSurplus = last.reduce((s, w) => s + Math.max(0, w.totalHours - 35), 0);
    const weeksInYear = 52;
    const normDivisor = Math.max(last.length, weeksInYear); // toujours au moins 52
    const avgTotal  = 35 + (totalHoursSurplus / normDivisor);
    const avgExtra  = last.reduce((s, w) => s + w.extra, 0) / normDivisor;
    const maxTotal  = Math.max(...last.map(w => w.totalHours));
    const violations = {
      over48    : last.filter(w => w.totalHours >= 48).length,
      over44avg : avgTotal >= 44,
      over35    : last.filter(w => w.totalHours > 35).length,
    };

    // Tendance uniquement si on a au moins 4 semaines de donnees
    const half   = Math.floor(last.length / 2);
    const avgOld = half > 1 ? last.slice(0, half).reduce((s, w) => s + w.totalHours, 0) / half : 35;
    const avgNew = half > 1 ? last.slice(half).reduce((s, w) => s + w.totalHours, 0) / (last.length - half) : 35;
    const trend  = last.length < 4 ? 'stable'
                 : avgNew > avgOld + 2 ? 'hausse'
                 : avgNew < avgOld - 2 ? 'baisse' : 'stable';

    return { avgTotal, avgExtra, maxTotal, violations, trend,
             weeksAnalyzed: last.length, weeks: last };
  }

  _emptyRolling() {
    return { avgTotal: 35, avgExtra: 0, maxTotal: 35,
             violations: { over48: 0, over44avg: false, over35: 0 },
             trend: 'stable', weeksAnalyzed: 0, weeks: [] };
  }

  // \u2500\u2500 Score Burn-Out (0-100) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  getBurnoutScore() {
    const rolling  = this.getRollingAnalysis(12);
    const history  = this.getFullHistory();
    let score = 0;

    // Moyenne hebdo > 35 \u2192 +2 pts/h au-dessus
    const overshoot = Math.max(0, rolling.avgTotal - 35);
    score += Math.min(30, overshoot * 2);

    // Semaines \u00E0 48h (violations absolues) \u2192 +8 pts chacune (cap 24)
    score += Math.min(24, rolling.violations.over48 * 8);

    // Tendance \u00E0 la hausse \u2192 +10
    if (rolling.trend === 'hausse') score += 10;

    // Moyenne > 44h sur la p\u00E9riode \u2192 +15
    if (rolling.violations.over44avg) score += 15;

    // Pr\u00E9sence sur plusieurs ann\u00E9es de d\u00E9passements \u2192 +5
    const yearsWithOvertime = Object.values(history.history)
      .filter(y => y.m1.netOvertime > 50).length;
    score += Math.min(10, yearsWithOvertime * 5);

    // Absences \u00E9lev\u00E9es (signe de fatigue) \u2192 +6
    const totalAbsent = Object.values(history.history)
      .reduce((s, y) => s + (y.m1.totalAbsent || 0), 0);
    if (totalAbsent > 20) score += 6;

    return {
      score:       Math.min(100, Math.round(score)),
      level:       score < 20 ? 'sain' : score < 40 ? 'vigilance' :
                   score < 60 ? 'risque' : score < 80 ? 'danger' : 'critique',
      color:       score < 20 ? '#4CAF50' : score < 40 ? '#FF8C42' :
                   score < 60 ? '#FF6B35' : score < 80 ? '#E53935' : '#B71C1C',
      details: { overshoot, violations: rolling.violations, trend: rolling.trend, yearsWithOvertime },
    };
  }

  // \u2500\u2500 Utilitaire : num\u00E9ro de semaine ISO \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  _getISOWeek(dateStr) {
    const d    = new Date(dateStr);
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const day  = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
  }

  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
  //  CUMUL MULTI-ANN\u00C9ES \u2014 FUSION INTELLIGENTE P\u00C9RIODE PAR P\u00C9RIODE
  //  Pour chaque mois de chaque ann\u00E9e, on choisit la meilleure
  //  source disponible \u2192 pr\u00E9serve le cumul m\u00EAme si on change de
  //  module en cours d'ann\u00E9e ou entre les ann\u00E9es.
  //
  //  R\u00E8gle anti-doublon par mois :
  //  - M1 seul pr\u00E9sent    \u2192 on prend M1
  //  - M2 seul pr\u00E9sent    \u2192 on prend M2
  //  - Les deux pr\u00E9sents  \u2192 on prend celui du choix manuel,
  //                         sinon celui avec le plus d'entr\u00E9es
  //  - Aucun              \u2192 mois ignor\u00E9
  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

  getCumulatedHours() {
    const years  = this.detectAllYears();
    const manual = localStorage.getItem('FOX_SOURCE_OVERRIDE');
    const globalSource = manual || 'fusion';

    let totalExtra  = 0;
    let totalPlus25 = 0;
    let totalPlus50 = 0;
    let totalAbsent = 0;
    let weekCount   = 0;
    let monthCount  = 0;
    const perYear   = {};

    // Helper : date "YYYY-MM-DD" -> cle semaine "YYYY-MM-DD" du lundi
    function getMondayKey(dateStr) {
      const d   = new Date(dateStr);
      const dow = d.getDay() || 7;
      const mon = new Date(d);
      mon.setDate(d.getDate() - dow + 1);
      return mon.getFullYear() + '-'
           + String(mon.getMonth() + 1).padStart(2,'0') + '-'
           + String(mon.getDate()).padStart(2,'0');
    }

    years.forEach(y => {
      // \u2500\u2500 Construire les semaines M1 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
      // wk -> { ot, absent, months: Set }
      const m1Weeks = {};
      if (manual !== 'M2') {
        try {
          const m1Raw = JSON.parse(localStorage.getItem('DATA_REPORT_' + y) || '{}');
          const tmpWeeks = {};
          Object.entries(m1Raw).forEach(([dk, val]) => {
            if (typeof val !== 'object' || !/^\d{4}-\d{2}-\d{2}$/.test(dk)) return;
            const extra  = parseFloat(val.extra  || 0);
            const recup  = parseFloat(val.recup  || 0);
            const absent = parseFloat(val.absent || 0);
            const wk = getMondayKey(dk);
            if (!tmpWeeks[wk]) tmpWeeks[wk] = { extra:0, recup:0, absent:0, months: new Set() };
            tmpWeeks[wk].extra  += extra;
            tmpWeeks[wk].recup  += recup;
            tmpWeeks[wk].absent += absent;
            tmpWeeks[wk].months.add(dk.substring(0,7));
          });
          // Calculer OT net par semaine (M1 : base 35h, absences deduites)
          const base = Number(localStorage.getItem('BASE_HEBDO_' + y)) || 35;
          Object.entries(tmpWeeks).forEach(([wk, w]) => {
            const effective = base + w.extra - w.recup - w.absent;
            const ot = Math.max(0, effective - base); // = max(0, extra - recup - absent)
            m1Weeks[wk] = { ot, absent: w.absent, months: w.months };
          });
        } catch(e) {}
      }

      // \u2500\u2500 Construire les semaines M2 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
      // wk -> { ot, months: Set }  (M2 : 1h = 1h, pas de deduction absences)
      const m2Weeks = {};
      if (manual !== 'M1') {
        try {
          const m2Raw = JSON.parse(localStorage.getItem('CA_HS_TRACKER_V1_DATA_' + y) || '{}');
          Object.entries(m2Raw).forEach(([monthKey, month]) => {
            if (!/^\d{4}-\d{2}$/.test(monthKey) || !month || !month.days) return;
            const [my, mm] = monthKey.split('-').map(Number);
            Object.entries(month.days).forEach(([dayStr, h]) => {
              const hours = parseFloat(h) || 0;
              if (hours <= 0) return;
              const d = parseInt(dayStr);
              if (!d || d < 1 || d > 31) return;
              const testDate = new Date(my, mm - 1, d);
              if (testDate.getMonth() !== mm - 1) return;
              const dk = my + '-' + String(mm).padStart(2,'0') + '-' + String(d).padStart(2,'0');
              const wk = getMondayKey(dk);
              if (!m2Weeks[wk]) m2Weeks[wk] = { ot: 0, months: new Set() };
              m2Weeks[wk].ot += hours;
              m2Weeks[wk].months.add(monthKey);
            });
          });
        } catch(e) {}
      }

      // \u2500\u2500 Fusion \u00E0 la semaine \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
      // Regle :
      //   Manuel M1 \u2192 prend M1 si OT>0, sinon ignore (absences ont effac\u00E9 les HS)
      //   Manuel M2 \u2192 prend M2 toujours
      //   Auto :
      //     - Semaine dans M1 seulement            \u2192 M1
      //     - Semaine dans M2 seulement            \u2192 M2
      //     - Dans les deux, M1 OT > 0             \u2192 M1 (plus pr\u00E9cis : absences d\u00E9duites)
      //     - Dans les deux, M1 OT = 0, M2 OT > 0 \u2192 M2 (l'absence a effac\u00E9 M1 mais les
      //                                               heures ont quand m\u00EAme \u00E9t\u00E9 pay\u00E9es)
      const allWeeks = new Set([...Object.keys(m1Weeks), ...Object.keys(m2Weeks)]);
      const monthBreakdown = {};
      let yearHs25 = 0, yearHs50 = 0, yearOT = 0, yearAbsent = 0;

      allWeeks.forEach(wk => {
        const w1 = m1Weeks[wk];
        const w2 = m2Weeks[wk];
        let ot = 0, absent = 0, months;

        if (manual === 'M1') {
          if (!w1) return; // pas de donn\u00E9es M1 cette semaine
          ot = w1.ot; absent = w1.absent; months = w1.months;
        } else if (manual === 'M2') {
          if (!w2) return;
          ot = w2.ot; absent = 0; months = w2.months;
        } else {
          // Auto : M1 si OT>0, sinon M2 comme filet de s\u00E9curit\u00E9
          if (w1 && w1.ot > 0) {
            ot = w1.ot; absent = w1.absent; months = w1.months;
          } else if (w2 && w2.ot > 0) {
            // M1 = 0 (absence a effac\u00E9 les HS) mais M2 montre des heures r\u00E9elles
            ot = w2.ot; absent = 0; months = w2.months;
          } else if (w1) {
            ot = 0; absent = w1.absent; months = w1.months;
          } else {
            return; // aucune donn\u00E9e utile
          }
        }

        if (!months || months.size === 0) return;

        const s25 = Math.min(8, ot);
        const s50 = Math.max(0, ot - 8);
        yearHs25   += s25;
        yearHs50   += s50;
        yearOT     += ot;
        yearAbsent += absent;
        weekCount++;

        const mArr = Array.from(months);
        const nb   = mArr.length;
        mArr.forEach(mk => {
          if (!monthBreakdown[mk]) monthBreakdown[mk] = { ot:0, hs25:0, hs50:0 };
          monthBreakdown[mk].ot   += ot  / nb;
          monthBreakdown[mk].hs25 += s25 / nb;
          monthBreakdown[mk].hs50 += s50 / nb;
        });
      });

      if (Object.keys(monthBreakdown).length === 0) return;

      monthCount  += Object.keys(monthBreakdown).length;
      totalExtra  += yearOT;
      totalPlus25 += yearHs25;
      totalPlus50 += yearHs50;
      totalAbsent += yearAbsent;

      let m1cov = 0, m2cov = 0;
      try { m1cov = Object.keys(JSON.parse(localStorage.getItem('DATA_REPORT_' + y)||'{}')).filter(k=>/^\d{4}-\d{2}-\d{2}$/.test(k)).length > 0 ? 1 : 0; } catch(e){}
      try { m2cov = Object.keys(JSON.parse(localStorage.getItem('CA_HS_TRACKER_V1_DATA_' + y)||'{}')).filter(k=>/^\d{4}-\d{2}$/.test(k)).length; } catch(e){}

      perYear[y] = {
        source     : globalSource,
        net        : yearOT,
        extra      : yearOT,
        recup      : 0,
        hs25       : yearHs25,
        hs50       : yearHs50,
        months     : monthBreakdown,
        m1Coverage : m1cov,
        m2Coverage : m2cov,
      };
    });

    return {
      source      : globalSource,
      years,
      totalExtra,
      totalRecup  : 0,
      totalAbsent,
      totalPlus25,
      totalPlus50,
      netOvertime : totalExtra,
      weekCount,
      monthCount,
      contingentMax         : 220,
      contingentUsedCurrent : totalPlus25 + totalPlus50,
      perYear,
    };
  }

  // Utilitaire JSON s\u00E9curis\u00E9
  _safeJSON(key, def) {
    try { return JSON.parse(localStorage.getItem(key) || 'null') || def; }
    catch(e) { return def; }
  }

  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
  //  S\u00C9LECTION ANTI-TRICHE
  //  Compare la densit\u00E9 de donn\u00E9es M1 vs M2 sur TOUTES les ann\u00E9es.
  //  Retourne 'M1' ou 'M2' \u2014 celui qui a le plus d'entr\u00E9es.
  //  Si les deux sont vides \u2192 'M1' par d\u00E9faut (plus granulaire).
  //  Si les deux ont des donn\u00E9es \u2192 celui avec le plus d'entr\u00E9es.
  //  Impossible d'utiliser les deux \u00E0 la fois.
  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

  selectPrimaryModule() {
    // \u2500\u2500 Choix manuel (prioritaire sur l'auto) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    const manual = localStorage.getItem('FOX_SOURCE_OVERRIDE');
    if (manual === 'M1' || manual === 'M2') {
      if (!this._primaryLogged) {
        console.log(`\uD83E\uDD8A Source forc\u00E9e manuellement : ${manual}`);
        this._primaryLogged = true;
      }
      return manual;
    }

    // \u2500\u2500 S\u00E9lection automatique par densit\u00E9 de donn\u00E9es \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    const years = this.detectAllYears();
    let m1Entries = 0;
    let m2Entries = 0;

    years.forEach(y => {
      try {
        const raw = JSON.parse(localStorage.getItem('DATA_REPORT_' + y) || '{}');
        m1Entries += Object.keys(raw).length;
      } catch(e) {}
      try {
        const raw = JSON.parse(localStorage.getItem('CA_HS_TRACKER_V1_DATA_' + y) || '{}');
        m2Entries += Object.keys(raw).length * 20;
      } catch(e) {}
    });

    const winner = m2Entries > m1Entries ? 'M2' : 'M1';

    if (!this._primaryLogged) {
      console.log(`\uD83E\uDD8A Anti-triche auto \u2014 M1: ${m1Entries} \u00B7 M2: ${m2Entries} (\u00D720) \u2192 source: ${winner}`);
      this._primaryLogged = true;
    }

    return winner;
  }

  // \u2500\u2500 Forcer manuellement la source \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  setSourceOverride(source) {
    if (source === 'auto') {
      localStorage.removeItem('FOX_SOURCE_OVERRIDE');
      console.log('\uD83E\uDD8A Source repass\u00E9e en automatique');
    } else if (source === 'M1' || source === 'M2') {
      localStorage.setItem('FOX_SOURCE_OVERRIDE', source);
      console.log(`\uD83E\uDD8A Source forc\u00E9e : ${source}`);
    }
    this._primaryLogged = false;
  }

  getSourceMode() {
    const manual = localStorage.getItem('FOX_SOURCE_OVERRIDE');
    return manual ? 'manuel' : 'auto';
  }

  // \u2500\u2500 Alias pratique : r\u00E9sum\u00E9 cumul\u00E9 pour le HUD / RPG \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  getCumulatedSummary() {
    const cum    = this.getCumulatedHours();
    const bo     = this.getBurnoutScore();
    const rolling = this.getRollingAnalysis(12);

    return {
      source          : cum.source,
      years           : cum.years,
      totalNetOvertime: cum.netOvertime,
      totalPlus25     : cum.totalPlus25,
      totalPlus50     : cum.totalPlus50,
      weekCount       : cum.weekCount,
      monthCount      : cum.monthCount,
      burnoutScore    : bo.score,
      burnoutLevel    : bo.level,
      trend           : rolling.trend,
      avgWeekly       : rolling.avgTotal,
      perYear         : cum.perYear,
      // XP bonus multi-ann\u00E9es : +500 XP par ann\u00E9e de donn\u00E9es
      xpBonus         : cum.years.length * 500,
    };
  }

  // \u2500\u2500 Override getBurnoutScore pour utiliser le cumul \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // (remplace la version de la classe parente qui ne regardait qu'une ann\u00E9e)
  getBurnoutScore() {
    const cum    = this.getCumulatedHours();
    const rolling = this.getRollingAnalysis(12);
    let score = 0;

    // Depassement moyen hebdo - normalise sur 52 semaines
    // 1 semaine a 45h = overshoot 10/52 = 0.19h -> score +0.6 seulement
    const overshoot = Math.max(0, rolling.avgTotal - 35);
    score += Math.min(25, overshoot * 3);

    // Semaines a 48h+ (violations absolues)
    const v48 = rolling.violations.over48 || 0;
    score += Math.min(20, v48 * 6);

    // Tendance haussiere (seulement si 4+ semaines de donnees)
    if (rolling.trend === 'hausse' && rolling.weeksAnalyzed >= 4) score += 8;

    // Moyenne annualisee > 44h (charge structurelle)
    if (rolling.violations.over44avg) score += 12;

    // Annees avec overtime > 100h NET (exposition chronique longue)
    const yearsWithOvertime = Object.values(cum.perYear)
      .filter(y => (y.net || 0) > 100).length;
    score += Math.min(12, yearsWithOvertime * 6);

    // Absences elevees sur plusieurs annees
    if (cum.totalAbsent > 30) score += 5;

    // Exposition multi-annees
    if (cum.years.length >= 3) score += 3;
    if (cum.years.length >= 5) score += 4;

    const final = Math.min(100, Math.round(score));
    return {
      score  : final,
      level  : final < 20 ? 'sain'      : final < 40 ? 'vigilance' :
               final < 60 ? 'risque'    : final < 80 ? 'danger'    : 'critique',
      color  : final < 20 ? '#4CAF50'   : final < 40 ? '#FF8C42'   :
               final < 60 ? '#FF6B35'   : final < 80 ? '#E53935'   : '#B71C1C',
      details: {
        overshoot, yearsWithOvertime,
        violations : rolling.violations,
        trend      : rolling.trend,
        years      : cum.years.length,
        source     : cum.source,
      },
    };
  }

  // \u2500\u2500 Export historique complet toutes ann\u00E9es \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  exportFullHistory() {
    const data    = this.getFullHistory();
    const cumul   = this.getCumulatedHours();
    const burnout = this.getBurnoutScore();
    const rolling = this.getRollingAnalysis();
    const summary = this.getCumulatedSummary();
    const payload = {
      exportDate   : new Date().toISOString(),
      antiCheat    : { primaryModule: cumul.source, reason: 'module avec le plus d\'entr\u00E9es s\u00E9lectionn\u00E9 automatiquement' },
      cumulatedHours: cumul,
      summary,
      burnoutScore : burnout,
      rolling,
      ...data,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `fox_historique_complet_${new Date().getFullYear()}.json`;
    a.click(); URL.revokeObjectURL(url);
  }
}

// \u2500\u2500 Instance globale \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const moduleReader = new ModuleReaderPro();

// Log de d\u00E9marrage : ann\u00E9es, source anti-triche, score burn-out cumul\u00E9
const _foxInitYears   = moduleReader.detectAllYears();
const _foxInitPrimary = moduleReader.selectPrimaryModule();
const _foxInitBurnout = moduleReader.getBurnoutScore();
console.log(
  `\u2705 Module Reader PRO\n` +
  `   Ann\u00E9es d\u00E9tect\u00E9es : ${_foxInitYears.join(', ') || 'aucune'}\n` +
  `   Source anti-triche : ${_foxInitPrimary} (s\u00E9lection automatique)\n` +
  `   Score Burn-Out cumul\u00E9 : ${_foxInitBurnout.score}/100 (${_foxInitBurnout.level})`
);
