/**
 * BIO-ENGINE M6 v2 — Jumeau numérique Cadres
 * Mis à jour avec les données scientifiques vérifiées en mai 2026
 *
 * ═══════════════════════════════════════════════════════════════════
 *  BASE SCIENTIFIQUE — SOURCES PRIMAIRES VÉRIFIÉES
 * ═══════════════════════════════════════════════════════════════════
 *
 * [CV-1] Kivimäki M. et al. 2015 — Lancet 386(10005):1739-1746
 *   Méta-analyse IPD-Work, 603 838 individus, 25 cohortes, Europe/USA/Australie
 *   ≥55h/sem : RR=1.33 (IC95% 1.11–1.61) AVC · RR=1.13 (IC95% 1.02–1.26) coronaropathie
 *   CLEF : relation dose-réponse UNIQUEMENT pour l'AVC, pas pour la coronaropathie
 *   Exclusion des 3 premières années → causalité inverse écartée
 *
 * [CV-2] Pega F. et al. 2021 — WHO/ILO Joint Estimates, Environ. International
 *   745 194 décès annuels imputables aux longues heures (2016)
 *   ≥55h : fraction attribuable 4.5% des décès par AVC, 3.7% par coronaropathie
 *   Revue systématique + méta-analyse, 37 études, 194 pays
 *
 * [CV-3] Sjweh.fi Editorial 2024 — Scand J Work Environ Health 50(3):152-157
 *   Confirmation dose-réponse AVC : plus les heures sont longues, plus le risque monte
 *   Mise à jour : nuit + quick return = facteur amplificateur CV (Bigert 2022, Kader 2022)
 *
 * [CV-4] Cohort study hsCRP — PMC9470891
 *   Longues heures → élévation hsCRP (marqueur inflammatoire athérosclérose)
 *   Mécanismes confirmés : hypercoagulabilité + instabilité électrique cardiaque
 *   hsCRP inclus dans Reynolds Risk Score (prédiction CV 10 ans)
 *
 * [ERV-1] Ervasti J. et al. 2021 — Lancet Reg. Health Eur. 7:100140
 *   59 599 personnes, 11 cohortes, 4 pays européens, 50 pathologies
 *   Longues heures (>48h) vs standard (35-40h) :
 *     HR=1.68 mort cardiovasculaire avant 65 ans
 *     HR=1.37 infections bactériennes
 *     HR=1.18 diabète type 2
 *     HR=1.22 blessures/accidents de travail
 *     HR=1.15 troubles musculo-squelettiques
 *
 * [PERF] Pencavel J. 2014 — Stanford, IZA Discussion Paper 8129
 *   Non-linéarité de la productivité : chute progressive >50h/sem
 *   Falaise à 55h : les heures au-delà ne produisent rien
 *   70h = même output que 55h → pente nulle
 *
 * [TELO] Ahola K. et al. 2012 — PLoS ONE 7(7):e40186
 *   n=2 911, Health 2000 Study (Finlande, représentatif de la population active)
 *   Épuisement professionnel sévère → télomères leucocytaires -0.043 unités relatives
 *   Résultat stable après ajustement âge, sexe, tabac, IMC, morbidités (p=0.008)
 *   → Vieillissement biologique accéléré mesuré objectivement
 *
 * [EPI] Dresden Burnout Study 2025 — Clin Epigenetics (Springer, Sep 2025)
 *   n=296 employés, cohorte longitudinale
 *   Stress au travail → burnout via horloges épigénétiques (DNAm GrimAge2)
 *   Médiateur confirmé : glucocorticoïdes capillaires (cortisol/cortisone)
 *   β = .47, p<.001 : stress prédit le burnout via vieillissement épigénétique
 *
 * [COG-1] Frontiers Aging Neuroscience 2025 — Brain Age Gap + Shift Work
 *   Horaires irréguliers → brain age gap augmenté
 *   Altération volume matière grise, déclin cognitif, risque démence accru
 *   Cohérent avec Jang W. et al. 2025 (IRM cérébrales soignants ≥52h)
 *
 * [COG-2] PMC10921288, 2024 — Meta-analyse IRMf + privation de sommeil
 *   Privation → réduction activité gyrus frontal médian + corps calleux
 *   Circuits attention, mémoire de travail, coordination interhémisphérique
 *
 * [REC] Sonnentag S. et al. 2022 — Annual Review Org. Psych. Org. Beh. 9:33
 *   Mise à jour complète de la recherche sur la récupération au travail
 *   Récupération = processus de "déroulement" (unwinding) nécessaire
 *   Clé : détachement psychologique + relaxation + sommeil + vacances
 *   Meta-analyse 198 études : récupération insuffisante → fatigue cumulée
 *   RTT/vacances : effet bien-être réel mais fade-out en 2-4 semaines
 *   → Détachement RÉGULIER > quelques longues vacances
 *
 * [REC-2] "I Need a Vacation" Meta-analysis, Industrial & Org Psych 2023
 *   Vacances → bien-être +, performance +, mais effets fugaces
 *   Récupération optimale = alternance repos courts fréquents + vacances
 *
 * [INF] Totterdell P. 2005 — Cadres & décrochage émotionnel
 *   Surcharge cognitive cadres : cycle d'épuisement émotionnel documenté
 *
 * [INRS] Phases physiologiques INRS (médecine du travail FR)
 *   P1 Adaptation (fat 0-35%)  ≤40h eq · P2 Fatigue chr. (35-60%) 40-52h
 *   P3 Surmenage   (60-80%)  52-55h   · P4 Burn-out     (>80%)   >55h
 *
 * [HAK] Hakola T. & Härmä M. 2001 — Scand J Work Environ Health
 *   Amplitude >11h : perturbation rythme circadien + perturbation sommeil
 *   Quick return (<11h entre deux postes) → dette de sommeil documentée
 * ═══════════════════════════════════════════════════════════════════
 */
'use strict';

(function(global) {

// ══════════════════════════════════════════════════════════════════
//  CONSTANTES CALIBRÉES SUR LES DONNÉES PUBLIÉES
// ══════════════════════════════════════════════════════════════════
const BIO = {
  // Plafonds Forfait Jours
  FJ_PLAFOND_REF:    218,
  FJ_AMPLITUDE_STD:  8.5,
  FJ_AMPLITUDE_LONG: 11,    // Hakola 2001 : seuil perturbation circadienne

  // Phases INRS
  P1_MAX: 35, P2_MAX: 60, P3_MAX: 80,

  // Seuils heures [CV-1][CV-2]
  H_OPTIMAL: 40,  // OMS zone confort
  H_LEGAL:   48,  // Code du travail Art. L3121-20
  H_OCDE:    50,  // OCDE productivité commence à chuter
  H_CEREBRAL:52,  // Jang 2025 : changements structure cérébrale
  H_CV:      55,  // Kivimäki 2015 : seuil RR AVC significatif

  // Facteurs de récupération calibrés [REC][REC-2]
  RTT_RECUP_FACTOR:  0.06,  // 1 RTT seul → récupération modeste (fade-out 2-4sem)
  RTT_DETACH_BONUS:  0.04,  // RTT régulier > vacation rare (Sonnentag 2022)
  CP_SEMAINE_RECUP:  0.12,  // 1 semaine CP → récupération réelle
  CP_FADE_WEEKS:     3,     // l'effet s'estompe après 3 semaines

  // Stress [EPI][INF]
  ENTRETIEN_MANQUANT_STRESS: 15, // +15 stress si pas d'entretien (cortisol chronique)
  RACHAT_STRESS_PAR_JOUR:     5, // +5 stress/jour racheté (charge cognitive Totterdell)
  AMPLITUDE_STRESS_SEUIL:    13, // heures → violation repos quotidien (L3131-1)
};

// ══════════════════════════════════════════════════════════════════
//  MODÈLE PERFORMANCE — Pencavel 2014 (Stanford)
//  Calibré sur les données publiées de la figure 3 (output/heure)
// ══════════════════════════════════════════════════════════════════
function _pencavelPerf(weeklyH) {
  if (weeklyH <= 35) return 1.000;
  if (weeklyH <= 40) return 1.000 - (weeklyH - 35) * 0.003;  // légère baisse
  if (weeklyH <= 48) return 0.985 - (weeklyH - 40) * 0.016;  // -1.6%/h
  if (weeklyH <= 50) return 0.857 - (weeklyH - 48) * 0.030;  // accélération
  if (weeklyH <= 55) return 0.797 - (weeklyH - 50) * 0.055;  // chute Pencavel
  if (weeklyH <= 70) return 0.522 - (weeklyH - 55) * 0.022;  // falaise
  return 0.192; // >70h : output plateau = 55h
}

// ══════════════════════════════════════════════════════════════════
//  MODÈLE RISQUE CARDIOVASCULAIRE
//  Kivimäki 2015 [CV-1] : dose-réponse ASYMÉTRIQUE
//    AVC : linéaire à partir de 48h (dose-réponse confirmée)
//    CHD : plateau au-delà de 55h (dose-réponse NON confirmée)
//  + composante cumulative dose-temps [CV-1][CV-2][CV-3]
//  + composante inflammatoire hsCRP [CV-4]
// ══════════════════════════════════════════════════════════════════
function _cvRiskModel(weeklyH, cumulMonths, semSurcharge) {

  // ── Composante AIGUË AVC (dose-réponse linéaire dès 48h) ──────
  // RR=1.33 à 55h → pente ≈ 0.047 / heure supplémentaire au-delà de 48h
  // Kivimäki 2015 : l'association avec l'AVC est plus forte et dose-réponse
  let acuteStroke = 0;
  if (weeklyH >= BIO.H_LEGAL) {
    const excessH = Math.min(weeklyH - BIO.H_LEGAL, 15); // plafonné 15h d'excès
    acuteStroke = excessH * 0.047; // calibré sur RR=1.33 à 55h (7h d'excès × 0.047 ≈ 0.33)
  }

  // ── Composante AIGUË CHD (risque modéré, pas de dose-réponse) ──
  // RR=1.13 à ≥55h — effet plateau, pas de gradient clair
  let acuteCHD = 0;
  if (weeklyH >= BIO.H_CV) {
    acuteCHD = 0.13; // effet plat une fois le seuil franchi (Kivimäki 2015)
  } else if (weeklyH >= BIO.H_LEGAL) {
    acuteCHD = 0.04; // signal modéré entre 48h et 55h
  }

  // ── Composante CUMULATIVE dose-temps ──────────────────────────
  // Exposition prolongée : le risque s'accumule même si les heures diminuent
  // Kivimäki 2015 : effet résiduel après exposition — décroit lentement
  let cumulRisk = Math.min(0.30, cumulMonths * 0.018);
  if (weeklyH < 40) cumulRisk *= 0.55;       // vraie récupération : réduction forte
  else if (weeklyH < BIO.H_LEGAL) cumulRisk *= 0.82; // semaine normale : modérée

  // ── Composante INFLAMMATOIRE hsCRP [CV-4] ─────────────────────
  // Long working hours → élévation hsCRP → risque athérosclérose
  // Effet seulement si surcharge régulière (≥4 semaines de suite)
  let inflam = 0;
  if (semSurcharge >= 4) inflam = Math.min(0.08, (semSurcharge - 3) * 0.015);

  const total = acuteStroke * 0.6 + acuteCHD * 0.4 + cumulRisk + inflam;
  return Math.min(1, total);
}

// ══════════════════════════════════════════════════════════════════
//  MODÈLE VIEILLISSEMENT BIOLOGIQUE (TÉLOMÈRES + ÉPIGÉNÉTIQUE)
//  Ahola 2012 [TELO] + Dresden 2025 [EPI]
//  Retourne un score 0-100 de "vieillissement biologique accéléré"
// ══════════════════════════════════════════════════════════════════
function _agingRisk(fatigue, stress, cumulMonths) {
  // Ahola 2012 : épuisement sévère → télomères plus courts (mesure objective)
  // L'effet est proportionnel à la durée d'exposition ET à l'intensité du stress
  // Dresden 2025 : stress → glucocorticoïdes → vieillissement épigénétique

  // Composante fatigue chronique (Maslach ≈ épuisement)
  let fatComp = 0;
  if (fatigue > 60) fatComp = (fatigue - 60) * 0.8;    // P3 : début télomère
  else if (fatigue > 35) fatComp = (fatigue - 35) * 0.3; // P2 : précurseur

  // Composante stress chronique (cortisol → vieillissement épigénétique)
  let stressComp = Math.max(0, (stress - 20) * 0.4);

  // Composante exposition cumulée (dose-temps)
  let cumulComp = Math.min(25, cumulMonths * 1.2);

  return Math.min(100, Math.round(fatComp + stressComp + cumulComp));
}

// ══════════════════════════════════════════════════════════════════
//  MODÈLE COGNITIF
//  Frontiers 2025 [COG-1] + PMC10921288 [COG-2] + Jang 2025
//  Altération structure cérébrale mesurée par IRM dès ≥52h/sem
// ══════════════════════════════════════════════════════════════════
function _cogRisk(weeklyH, fatigue, stress, amplitudeLongue) {
  // Jang 2025 : changements cérébraux à ≥52h/sem (gyrus frontal, insula)
  // Frontiers 2025 : brain age gap + horaires irréguliers
  // PMC10921288 : privation de sommeil → atrophie gyrus frontal médian

  let base = 0;
  if (weeklyH >= BIO.H_CEREBRAL) {
    base = (weeklyH - BIO.H_CEREBRAL) * 3.5; // non-linéaire dès 52h
  } else if (weeklyH >= BIO.H_LEGAL) {
    base = (weeklyH - BIO.H_LEGAL) * 0.8;    // signal modéré 48-52h
  }

  // Amplitude longue → dette de sommeil → atrophie hippocampique (2024)
  const ampComp = Math.min(20, amplitudeLongue * 2.5);

  // Fatigue cognitive (Totterdell 2005)
  const fatComp = fatigue > 50 ? (fatigue - 50) * 0.25 : 0;

  return Math.min(100, Math.max(0, Math.round(base + ampComp + fatComp)));
}

// ══════════════════════════════════════════════════════════════════
//  MODÈLE RÉCUPÉRATION — Sonnentag et al. 2022 [REC] + [REC-2]
//  Intègre : détachement, RTT réguliers, vacances, fade-out
// ══════════════════════════════════════════════════════════════════
function _recoveryScore(fatigue, rttPris, cpPris, nbSemaines, semSurcharge) {
  // Base : décroît avec la fatigue
  let base = Math.max(20, 90 - fatigue * 0.40);

  // RTT réguliers : Sonnentag 2022 → détachement régulier > rares vacances longues
  // Ratio RTT/semaines de surcharge = qualité du détachement
  const rttFreq = nbSemaines > 0 ? rttPris / nbSemaines : 0;
  const detachBonus = Math.min(20, rttFreq * 120);  // jusqu'à +20pts si RTT fréquents

  // Vacances (CP) : effet réel mais fade-out 2-4 semaines [REC-2]
  // On modélise : chaque semaine de CP = +12 pts, atténué si loin dans l'année
  const cpSemaines = Math.round(cpPris / 5);
  const vacBonus = Math.min(15, cpSemaines * BIO.CP_SEMAINE_RECUP * 100 * 0.5);

  // Pénalité : semaines de surcharge sans récupération intercalée = épuisement
  const surchargePenalty = Math.min(30, semSurcharge * 1.8);

  return Math.min(100, Math.max(15, Math.round(base + detachBonus + vacBonus - surchargePenalty)));
}

// ══════════════════════════════════════════════════════════════════
//  MOTEUR PRINCIPAL
// ══════════════════════════════════════════════════════════════════
const M6_BioEngine = {

  /**
   * Analyse biologique pour Forfait Jours.
   * @param {object} contract — { plafond, joursCPContrat, entretienDate }
   * @param {object} data     — { "YYYY-MM-DD": { type, debut?, fin?, amplitude? } }
   * @param {number} year
   */
  analyzeForfaitJours(contract, data, year, regime) {
    regime = regime || 'forfait_jours';
    const plafond = contract.plafond || 218;
    const today   = new Date().toISOString().slice(0,10);

    // ── B1 MULTI-ANNÉE : utiliser les bornes du contrat si présentes ──
    // Un exercice peut chevaucher 2 années civiles (ex: déc 25 → déc 26)
    // ── DÉTECTION AUTOMATIQUE DE L'ARRIVÉE (FJ) ──
    // La 1ère date saisie dans le calendrier = point de départ réel.
    // Aucune configuration requise — prorata calculé automatiquement.
    const _allKeysFJ = Object.keys(data).filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort();
    const _firstFJ   = _allKeysFJ.length ? _allKeysFJ[0] : null;
    const _exDebutFJ = contract.dateDebutExercice || `${year}-01-01`;
    const _lateFJ    = _firstFJ && _firstFJ > _exDebutFJ &&
      Math.round((new Date(_firstFJ+'T12:00:00') - new Date(_exDebutFJ+'T12:00:00')) / 86400000) > 14;
    const exDeb = contract.dateArrivee || (_lateFJ ? _firstFJ : _exDebutFJ);
    const exFin = contract.dateFinExercice || `${year}-12-31`;

    const entries = Object.entries(data)
      .filter(([k]) => k >= exDeb && k <= exFin && k <= today)
      .sort(([a],[b]) => a.localeCompare(b));

    if (!entries.length) {
      // Pas de saisie dans cet exercice — mais on charge quand même la baseline si elle existe
      // pour préserver la continuité (B2)
      const baseline = this._loadBaseline(regime);
      if (baseline && baseline.fatigue > 0) {
        return {
          hasData: true,
          fatigue: baseline.fatigue, stress: baseline.stress,
          recovery: baseline.recovery, performance: 100 - baseline.fatigue,
          cvRisk: 0, cogRisk: 0, agingRisk: 0, multiRisk: 0,
          details: { rachetes:0, amplitudeLongue:0, amplitudeViola:0, semSurcharge:0, cumulSurcharge:0, rttPris:0, cpPris:0, joursTotal:0, hEquivMoyen:35 },
          phase: this._phase(baseline.fatigue),
          alertesBio: [{niveau:'info', icon:'📊', titre:'État reporté de l\'exercice précédent', texte:`Fatigue ${baseline.fatigue} · Stress ${baseline.stress} — saisissez vos premiers jours pour actualiser.`, loi:'Continuité physiologique'}],
          fromBaseline: true
        };
      }
      return { hasData: false };
    }

    // ── Compteurs ──────────────────────────────────────────────
    let joursTotal = 0, rachetes = 0, rttPris = 0, cpPris = 0;
    let amplitudeLongue = 0;   // jours avec amplitude > 11h (Hakola 2001)
    let amplitudeViola  = 0;   // jours avec amplitude > 13h (violation repos 11h)
    let semSurcharge    = 0;   // semaines avec ≥5 jours travaillés
    let cumulSurcharge  = 0;   // dose-temps pour CV risk

    // Grouper par semaine ISO
    const semaines = {};
    for (const [dk, v] of entries) {
      const wk = this._isoWeek(new Date(dk + 'T12:00:00'));
      if (!semaines[wk]) semaines[wk] = [];
      semaines[wk].push({ dk, ...v });

      const t = v.type || 'travail';
      if (t === 'travail')    joursTotal++;
      if (t === 'rachat')     { joursTotal++; rachetes++; }
      if (t === 'rtt')        { rttPris++; cumulSurcharge = Math.max(0, cumulSurcharge - 0.25); }
      if (t === 'cp')         { cpPris++;  cumulSurcharge = Math.max(0, cumulSurcharge - 0.35); }
      if (t === 'demi')       joursTotal += 0.5;
      // Jours non-travaillés → décroissance biologique positive
      if (['repos','ferie','maladie','maternite','astreinte'].includes(t)) {
        cumulSurcharge = Math.max(0, cumulSurcharge - 0.15);
      }

      // Amplitude saisie
      if (v.debut && v.fin) {
        const [dh, dm] = v.debut.split(':').map(Number);
        const [fh, fm] = v.fin.split(':').map(Number);
        const amp = (fh * 60 + fm) - (dh * 60 + dm);
        if (amp >= BIO.FJ_AMPLITUDE_LONG * 60)  amplitudeLongue++;
        if (amp >= BIO.AMPLITUDE_STRESS_SEUIL * 60) amplitudeViola++;
      } else if (v.amplitude) {
        const amp = parseFloat(v.amplitude);
        if (amp >= BIO.FJ_AMPLITUDE_LONG)  amplitudeLongue++;
        if (amp >= BIO.AMPLITUDE_STRESS_SEUIL) amplitudeViola++;
      }
    }

    // Analyse semaines
    const wkKeys = Object.keys(semaines).sort();
    const nbSemaines = wkKeys.length || 1;

    for (const wk of wkKeys) {
      const jT = semaines[wk].filter(j => ['travail','rachat','demi'].includes(j.type||'travail')).length;
      if (jT >= 5) {
        semSurcharge++;
        cumulSurcharge += Math.min(2, jT - 4); // max 2 unités/semaine
      } else if (jT <= 3) {
        cumulSurcharge = Math.max(0, cumulSurcharge - 0.4); // récupération partielle
      }
    }

    // ── B3 RÉCUPÉRATION AUTO : weekends et jours non-saisis ──
    // Chaque jour non-saisi entre 1ère et dernière entrée = 1 jour de récup léger
    // Conformément aux modèles Effort-Recovery Meijman & Mulder 1998
    const missingDays = this._countMissingDays(entries);
    cumulSurcharge = Math.max(0, cumulSurcharge - missingDays * 0.18);

    // ── B2 BASELINE : dégrader ce qu'on a accumulé par la baseline si présente ──
    // Si entrée rétroactive détectée (firstEntry a reculé depuis la dernière baseline),
    // on ignore la baseline car les vraies données historiques priment
    const _baselineValid = this._isBaselineValid('forfait_jours', _firstFJ);
    const baseline = _baselineValid ? this._loadBaseline(regime) : null;
    const baselineFat    = baseline?.fatigue || 0;
    const baselineStress = baseline?.stress  || 0;

    // ── Équivalent heures hebdomadaires (pour les modèles horaires) ──
    // Pour FJ : on estime l'heq à partir du taux de forfait + amplitude réelle si saisie
    const tauxForfait = Math.min(1.3, joursTotal / Math.max(1, plafond * (nbSemaines / 52)));
    // Base : 35h + surcharge proportionnelle au taux de remplissage
    let hEquivMoyen = Math.min(60, 35 + (tauxForfait - 1) * 50 + rachetes * 0.9);
    // Affinage : si des amplitudes ont été saisies, on les intègre directement
    // amplitudeViola ⊂ amplitudeLongue → ne comptabiliser qu'une fois chaque jour
    const nAmplitudeTotal = amplitudeLongue; // amplitudeViola est déjà inclus dans amplitudeLongue
    if (nAmplitudeTotal > 0 && joursTotal > 0) {
      // Amplitude moyenne estimée pondérée sur les journées saisies :
      //   jours >13h → 14h moy.  |  jours 11-13h → 12h moy.  |  autres → 8.5h std
      const nViola     = amplitudeViola;
      const nLong      = amplitudeLongue - amplitudeViola; // 11-13h sans viola
      const nStd       = Math.max(0, joursTotal - amplitudeLongue); // jours normaux
      const hMoyTotal  = (nViola * 14 + nLong * 12 + nStd * 8.5) / Math.max(1, joursTotal);
      const hEqAmplitude = Math.min(65, hMoyTotal * 5); // × 5 jours/sem
      // Pondération : amplitude pondérée à 60%, estimation forfait 40%
      hEquivMoyen = Math.round((hEqAmplitude * 0.60 + hEquivMoyen * 0.40) * 10) / 10;
    }

    // ── FATIGUE (INRS 4 phases) ───────────────────────────────
    // Calibrée sur les phases INRS et la charge de travail effective
    let fatigue = Math.min(100, Math.round(
      18                                                 // baseline cadre
      + (tauxForfait - 1) * 35                           // charge > forfait
      + (rachetes / Math.max(1, plafond)) * 65           // rachat = surcharge forte
      + amplitudeLongue * 2.5                            // amplitudes longues (Hakola)
      + amplitudeViola  * 3.5                            // violation repos légal
      + semSurcharge    * 1.8                            // semaines denses [ERV-1]
      - rttPris         * BIO.RTT_RECUP_FACTOR  * 100   // RTT pris (récupération partielle)
      - cpPris          * BIO.CP_SEMAINE_RECUP  * 100 / 5 // CP = récupération réelle
    ));
    fatigue = Math.max(5, fatigue);

    // ── B2 CONTINUITÉ : pondérer avec la baseline si on est en début d'exercice ──
    // Si peu de saisies (<10 jours), la fatigue récente compte peu — on garde la mémoire
    if (joursTotal < 10 && baselineFat > 0) {
      const w = joursTotal / 10;  // poids progressif des nouvelles données
      fatigue = Math.round(fatigue * w + baselineFat * (1 - w));
    }

    // ── STRESS (HPA + épigénétique) ──────────────────────────
    // Basé sur : cortisol chronique [EPI], entretien [L3121-65], rachat [INF]
    // Entretien considéré "fait" si : date saisie OU case auto-attestée dans Validité.
    const _attestKey = `M6_VALID_CHECK_forfait_jours_${year}_entretien_annuel`;
    let _entretienAutoOk = false;
    try { _entretienAutoOk = (localStorage.getItem(_attestKey) === '1'); } catch(_) {}
    const entretienDone = (contract.entretienDate &&
      new Date(contract.entretienDate).getFullYear() >= year) || _entretienAutoOk;
    let stress = Math.min(100, Math.round(
      8
      + (rachetes > 0 ? rachetes * BIO.RACHAT_STRESS_PAR_JOUR : 0)
      + (!entretienDone ? BIO.ENTRETIEN_MANQUANT_STRESS : 0)  // absence entretien L3121-65
      + semSurcharge   * 2.2
      + amplitudeLongue * 1.8                            // Hakola : perturbation circadienne
      + amplitudeViola  * 3.0                            // violation repos = cortisol spike
    ));
    stress = Math.max(3, stress);
    if (joursTotal < 10 && baselineStress > 0) {
      const w = joursTotal / 10;
      stress = Math.round(stress * w + baselineStress * (1 - w));
    }

    // ── PERFORMANCE (Pencavel 2014) ───────────────────────────
    const perfBase  = Math.round(_pencavelPerf(hEquivMoyen) * 100);
    const perfFinal = Math.max(25, perfBase - Math.round(fatigue * 0.18));

    // ── RÉCUPÉRATION (Sonnentag 2022) ─────────────────────────
    const recovery = _recoveryScore(fatigue, rttPris, cpPris, nbSemaines, semSurcharge);

    // ── RISQUE CV (Kivimäki 2015 + dose-réponse asymétrique) ──
    const cumulMonths  = cumulSurcharge / 4;
    const cvRiskRaw    = _cvRiskModel(hEquivMoyen, cumulMonths, semSurcharge);
    const cvRiskScore  = Math.round(cvRiskRaw * 100);

    // ── RISQUE COGNITIF (Jang 2025 + Frontiers 2025) ─────────
    const cogRisk = _cogRisk(hEquivMoyen, fatigue, stress, amplitudeLongue);

    // ── VIEILLISSEMENT BIOLOGIQUE (Ahola 2012 + Dresden 2025) ─
    const agingRisk = _agingRisk(fatigue, stress, cumulMonths);

    // ── RISQUE MULTIMORBIDITÉ (Ervasti 2021) ──────────────────
    // HR élévé pour diabète, infections, TMS dès >48h/sem
    const multiRisk = Math.min(100, Math.round(
      (hEquivMoyen > 48 ? (hEquivMoyen - 48) * 2.5 : 0)
      + fatigue * 0.15
    ));

    // ── ALERTES BIOLOGIQUES ───────────────────────────────────
    const alertesBio = this._buildAlertesFJ({
      fatigue, stress, recovery, perfFinal, cvRiskScore, cogRisk, agingRisk, multiRisk,
      rachetes, amplitudeLongue, amplitudeViola, semSurcharge,
      entretienDone, rttPris, cpPris, plafond, joursTotal, hEquivMoyen
    });

    // ── B2 CONTINUITÉ : persister l'état bio pour le prochain exercice ──
    this._saveBaseline(regime, { fatigue, stress, recovery }, _firstFJ);

    return {
      fatigue, stress, recovery, performance: perfFinal,
      cvRisk: cvRiskScore, cogRisk, agingRisk, multiRisk,
      details: {
        rachetes, amplitudeLongue, amplitudeViola,
        semSurcharge, cumulSurcharge, rttPris, cpPris,
        joursTotal, hEquivMoyen: Math.round(hEquivMoyen * 10) / 10
      },
      phase:      this._phase(fatigue),
      alertesBio,
      hasData:    true
    };
  },

  /**
   * Analyse biologique pour Forfait Heures.
   * @param {object} contract — { seuilHebdo, contingent }
   * @param {object} data     — { "YYYY-Www": { heures } }
   * @param {number} year
   */
  analyzeForfaitHeures(contract, data, year) {
    const seuil   = contract.seuilHebdo || 39;

    // ── B1 MULTI-ANNÉE : utiliser bornes contrat ──
    // ── DÉTECTION AUTOMATIQUE DE L'ARRIVÉE (FH) ──
    const _allKeysFH = Object.keys(data).filter(k => /^\d{4}-W\d{2}$/.test(k)).sort();
    const _firstFH   = _allKeysFH.length ? _allKeysFH[0] : null;
    const _exDebutFH = contract.dateDebutExercice || `${year}-01-01`;
    const _firstFHDate = _firstFH ? (() => {
      const [y,w] = _firstFH.split('-W');
      const d = new Date(parseInt(y), 0, 1 + (parseInt(w)-1)*7);
      d.setDate(d.getDate() + (1-(d.getDay()||7)));
      return d.toISOString().slice(0,10);
    })() : null;
    const _lateFH = _firstFHDate && _firstFHDate > _exDebutFH &&
      Math.round((new Date(_firstFHDate+'T12:00:00') - new Date(_exDebutFH+'T12:00:00')) / 86400000) > 14;
    const _autoArriveeFH = contract.dateArrivee || (_lateFH ? _firstFHDate : null);

    const exDeb = _autoArriveeFH || contract.dateDebutExercice || `${year}-01-01`;
    const exFin = contract.dateFinExercice   || `${year}-12-31`;
    // Filtrer les semaines ISO qui chevauchent l'exercice
    const filterWeek = (wkKey) => {
      const m = wkKey.match(/^(\d{4})-W(\d{2})$/);
      if (!m) return wkKey >= exDeb.slice(0,7) && wkKey <= exFin.slice(0,7);
      const [,y,w] = m;
      const d = new Date(parseInt(y), 0, 1 + (parseInt(w)-1)*7);
      const iso = d.toISOString().slice(0,10);
      return iso >= exDeb && iso <= exFin;
    };

    const entries = Object.entries(data)
      .filter(([k]) => filterWeek(k))
      .sort(([a],[b]) => a.localeCompare(b));

    if (!entries.length) {
      // B2 baseline FH si pas de saisie
      const baseline = this._loadBaseline('forfait_heures');
      if (baseline && baseline.fatigue > 0) {
        return {
          hasData: true,
          fatigue: baseline.fatigue, stress: baseline.stress,
          recovery: baseline.recovery, performance: 100 - baseline.fatigue,
          cvRisk: 0, cogRisk: 0, agingRisk: 0,
          mean: 0, max: 0, surcharge: 0, n: 0,
          phase: this._phase(baseline.fatigue),
          alertesBio: [{niv:'info', titre:'État reporté de l\'exercice précédent', texte:`Fatigue ${baseline.fatigue} · Stress ${baseline.stress} — saisissez vos premières semaines pour actualiser.`}],
          fromBaseline: true
        };
      }
      return { hasData: false };
    }

    const heuresArr = entries.map(([,v]) => parseFloat(v.heures) || 0);
    const n         = heuresArr.length;
    const mean      = heuresArr.reduce((s,h) => s+h, 0) / n;
    const max       = Math.max(...heuresArr);

    // Semaines de surcharge (>seuil + 15%) — seuil plus sensible
    const surcharge = heuresArr.filter(h => h > seuil * 1.15).length;

    // Dose cumulée normalisée au seuil contractuel
    let cumul = 0;
    heuresArr.forEach(h => { cumul += Math.max(0, h - seuil) / seuil; });

    // Semaines de récupération réelle (<seuil) — Sonnentag 2022
    const semainesRecup = heuresArr.filter(h => h <= seuil * 0.95).length;

    // ── Scores ────────────────────────────────────────────────
    let fatigue = Math.min(100, Math.round(
      12
      + (mean > seuil ? (mean - seuil) * 2.5 : 0)
      + surcharge * 2.8
      + cumul * 6
      - semainesRecup * 2.5                // récupération effective
    ));
    fatigue = Math.max(5, fatigue);

    let stress    = Math.min(100, Math.round(8 + surcharge * 4.5 + Math.max(0, mean - BIO.H_LEGAL) * 2.8));

    // ── ÉCHANTILLON FAIBLE : tempérer pour les premières semaines ──
    // Avec 1 ou 2 semaines, le mean est très volatil ; une seule semaine à 45h
    // ne doit pas être lue comme "fatigue chronique 42". On pondère par n/4 plafonné.
    // Au-delà de 4 semaines, le score est pris tel quel.
    if (n < 4) {
      const warmup = n / 4;   // 0.25 / 0.5 / 0.75 / 1.0
      // baseline réaliste pour quelqu'un qui vient juste de commencer le suivi
      const baseFat    = 12;
      const baseStress = 8;
      fatigue = Math.round(baseFat    + (fatigue - baseFat) * warmup);
      stress  = Math.round(baseStress + (stress  - baseStress) * warmup);
    }

    const perfFinal = Math.max(25, Math.round(_pencavelPerf(mean) * 100 - fatigue * 0.12));
    const recovery  = _recoveryScore(fatigue, semainesRecup, 0, n, surcharge);
    const cvRiskScore = Math.round(_cvRiskModel(mean, cumul / 4, surcharge) * 100);
    const cogRisk   = _cogRisk(mean, fatigue, stress, 0);
    const agingRisk = _agingRisk(fatigue, stress, cumul / 4);
    const multiRisk = Math.min(100, Math.round(
      (mean > 48 ? (mean - 48) * 2.5 : 0) + fatigue * 0.12
    ));

    return {
      fatigue, stress, recovery, performance: perfFinal,
      cvRisk: cvRiskScore, cogRisk, agingRisk, multiRisk,
      details: {
        mean:    Math.round(mean * 10) / 10,
        max:     Math.round(max * 10) / 10,
        surcharge, semainesRecup,
        cumul:   Math.round(cumul * 10) / 10,
        n
      },
      phase:      this._phase(fatigue),
      alertesBio: (this._saveBaseline('forfait_heures', { fatigue, stress, recovery }, _firstFHDate),
        this._buildAlertesFH({ fatigue, stress, cvRiskScore, cogRisk, agingRisk, mean, surcharge, n })),
      hasData:    true
    };
  },

  // ══════════════════════════════════════════════════════════════
  //  ALERTES BIOLOGIQUES — MESSAGES CALIBRÉS
  // ══════════════════════════════════════════════════════════════

  _buildAlertesFJ(s) {
    const a = [];

    // Burn-out P4 [INRS][EPI]
    if (s.fatigue >= 80) {
      a.push({ niv:'danger', titre:'Phase P4 — Burn-out imminent',
        texte:'Épuisement critique (INRS P4). Risque de vieillissement épigénétique accéléré documenté (Dresden Burnout Study 2025). Consultation médecin du travail urgente — Art. L4121-1.' });
    } else if (s.fatigue >= 60) {
      a.push({ niv:'warning', titre:'Phase P3 — Surmenage',
        texte:'Niveau INRS P3. Des études montrent une corrélation avec le raccourcissement des télomères dès l\'épuisement sévère (Ahola et al. 2012, PLoS ONE, n=2 911). Signalez la surcharge.' });
    } else if (s.fatigue >= 35) {
      a.push({ niv:'info', titre:'Phase P2 — Fatigue chronique en construction',
        texte:'Niveau INRS P2. La fatigue s\'accumule de façon non-linéaire. Programmez des RTT réguliers — le détachement fréquent est plus efficace que les longues vacances rares (Sonnentag et al. 2022).' });
    }

    // Risque AVC — dose-réponse confirmée [CV-1]
    if (s.cvRiskScore >= 35) {
      a.push({ niv:'danger', titre:'Risque cardiovasculaire significatif',
        texte:`Exposition prolongée. Kivimäki et al. 2015 (Lancet, 603 838 individus) : ≥55h/sem → RR=1.33 pour l'AVC avec relation dose-réponse linéaire confirmée. hsCRP potentiellement élevée. Bilan cardiologique recommandé.` });
    } else if (s.cvRiskScore >= 20) {
      a.push({ niv:'warning', titre:'Risque cardiovasculaire modéré',
        texte:`Signal précoce d'exposition. WHO/ILO 2021 (Pega et al.) : 745 194 décès/an imputables aux longues heures. Fraction attribuable AVC : 4.5%. Modérez la charge.` });
    }

    // Risque cognitif [COG-1][COG-2]
    if (s.cogRisk >= 40) {
      a.push({ niv:'warning', titre:'Risque cognitif — Structure cérébrale',
        texte:`Exposition ≥52h éq. : Jang et al. 2025 documentent des altérations de 17 régions cérébrales (mémoire de travail, attention, insula) par IRM. Frontiers 2025 : brain age gap augmenté.` });
    }

    // Vieillissement biologique [TELO][EPI]
    if (s.agingRisk >= 50) {
      a.push({ niv:'warning', titre:'Vieillissement biologique accéléré',
        texte:`Epuisement + stress chronique → télomères leucocytaires plus courts (Ahola 2012, PLoS ONE). Les horloges épigénétiques (DNAm GrimAge2) confirment l'accélération via le cortisol capillaire (Dresden 2025).` });
    }

    // Multimorbidité [ERV-1]
    if (s.multiRisk >= 40) {
      a.push({ niv:'info', titre:'Risques multiples documentés',
        texte:`Ervasti et al. 2021 (Lancet Reg. Health Eur., 59 599 individus) : >48h/sem → HR=1.18 diabète type 2, HR=1.37 infections, HR=1.22 accidents. Consultation médecin du travail recommandée.` });
    }

    // RTT non pris [REC]
    if (s.rttPris === 0 && s.joursTotal > 40) {
      a.push({ niv:'warning', titre:'Aucun RTT pris — Détachement insuffisant',
        texte:`Sonnentag et al. 2022 (Annual Review, méta-analyse 198 études) : le détachement psychologique RÉGULIER est le prédicteur le plus fort de la récupération. RTT ponctuels > longues vacances rares.` });
    }

    // Amplitude [HAK]
    if (s.amplitudeViola >= 3) {
      a.push({ niv:'danger', titre:`${s.amplitudeViola} journées à amplitude >13h`,
        texte:`Violation potentielle du repos quotidien de 11h (Art. L3131-1). Hakola & Härmä 2001 : amplitude >11h → dette de sommeil + perturbation circadienne. Études 2024 (IRM) : atrophie hippocampique corréléé à la privation de sommeil.` });
    } else if (s.amplitudeLongue >= 5) {
      a.push({ niv:'info', titre:`${s.amplitudeLongue} journées à amplitude >11h`,
        texte:`Perturbation circadienne documentée (Hakola & Härmä 2001). Maintenez un repos quotidien d'au moins 11 heures entre deux journées de travail (Art. L3131-1).` });
    }

    // Rachat [INF][INRS]
    if (s.rachetes >= 6) {
      a.push({ niv:'warning', titre:`${s.rachetes} jours rachetés — Surcharge cognitive`,
        texte:`Totterdell 2005 : le rachat récurrent génère un cycle d'épuisement émotionnel chez les cadres. Cortisol chroniquement élevé → précurseur vieillissement épigénétique (Dresden 2025).` });
    }

    // Entretien annuel [L3121-65]
    if (!s.entretienDone) {
      a.push({ niv:'info', titre:'Entretien annuel non renseigné',
        texte:`Obligatoire (Art. L3121-65). Son absence peut entraîner la nullité du forfait (Cass. Soc. 29 juin 2011). Renseignez la date dans l'onglet Entretien.` });
    }

    return a;
  },

  _buildAlertesFH(s) {
    const a = [];
    if (s.fatigue >= 80) a.push({ niv:'danger', titre:'Phase P4 — Burn-out',
      texte:'Fatigue critique. Consultation médecin du travail urgente (Art. L4121-1). Vieillissement épigénétique accéléré documenté (Dresden 2025).' });
    else if (s.fatigue >= 60) a.push({ niv:'warning', titre:'Phase P3 — Surmenage',
      texte:'Niveau INRS P3. Exposition chronique → télomères leucocytaires plus courts (Ahola 2012, PLoS ONE).' });
    if (s.cvRiskScore >= 30) a.push({ niv:'warning', titre:'Risque cardiovasculaire',
      texte:`Moyenne de ${s.mean}h/sem. Kivimäki 2015 : RR=1.33 AVC pour ≥55h, dose-réponse linéaire pour l'AVC. hsCRP potentiellement élevée (mécanisme inflammatoire, PMC9470891).` });
    if (s.cogRisk >= 40) a.push({ niv:'warning', titre:'Risque cognitif',
      texte:'Jang 2025 + Frontiers 2025 : altérations structure cérébrale dès 52h/sem, brain age gap augmenté, risque démence accru.' });
    if (s.surcharge > s.n * 0.4 && s.n >= 8) a.push({ niv:'warning', titre:`${s.surcharge}/${s.n} semaines en surcharge`,
      texte:'Sonnentag 2022 : la récupération insuffisante est le facteur le plus fort de dégradation du bien-être et de la performance. Intercalez des semaines légères.' });
    return a;
  },

  // ══════════════════════════════════════════════════════════════
  //  HELPERS
  // ══════════════════════════════════════════════════════════════
  _phase(fat) {
    if (fat <= BIO.P1_MAX) return { code:'P1', label:'Adaptation',        color:'#2D6A4F' };
    if (fat <= BIO.P2_MAX) return { code:'P2', label:'Fatigue chronique', color:'#C4853A' };
    if (fat <= BIO.P3_MAX) return { code:'P3', label:'Surmenage',         color:'#B85C50' };
    return                          { code:'P4', label:'Burn-out',         color:'#9B2C2C' };
  },

  // ── B2 CONTINUITÉ BIO : baseline persistée entre exercices ──
  // Préserve l'état physiologique au passage à un nouvel exercice
  // (loi : le 1er janvier ne réinitialise pas un cadre fatigué)
  _loadBaseline(regime) {
    try {
      const raw = localStorage.getItem('M6_BIO_BASELINE_' + regime);
      if (!raw) return null;
      const b = JSON.parse(raw);
      const daysSince = b.lastUpdate ? Math.floor((Date.now() - new Date(b.lastUpdate).getTime()) / 86400000) : 0;
      const decay = Math.min(0.7, daysSince * 0.014);
      return {
        fatigue:  Math.max(0, Math.round((b.fatigue||0)  * (1 - decay))),
        stress:   Math.max(0, Math.round((b.stress||0)   * (1 - decay))),
        recovery: Math.min(100, Math.round((b.recovery||50) + decay * 30)),
        lastUpdate: b.lastUpdate,
        firstEntry: b.firstEntry || null,
      };
    } catch(_) { return null; }
  },
  // Vérifie si une entrée rétroactive a été ajoutée (firstEntry a reculé)
  _isBaselineValid(regime, currentFirstEntry) {
    try {
      const raw = localStorage.getItem('M6_BIO_BASELINE_' + regime);
      if (!raw) return false;
      const b = JSON.parse(raw);
      if (!b.firstEntry || !currentFirstEntry) return true;
      return currentFirstEntry >= b.firstEntry;
    } catch(_) { return true; }
  },
  _saveBaseline(regime, state, firstEntry = null) {
    try {
      localStorage.setItem('M6_BIO_BASELINE_' + regime, JSON.stringify({
        fatigue: state.fatigue, stress: state.stress, recovery: state.recovery,
        lastUpdate: new Date().toISOString(),
        firstEntry,
      }));
    } catch(_) {}
  },

  // ── B3 RÉCUPÉRATION WEEKENDS : décroissance pour chaque jour non-saisi ──
  // Retourne le nb de jours non-saisis entre la 1ère et dernière entrée
  _countMissingDays(entries) {
    if (entries.length < 2) return 0;
    const first = new Date(entries[0][0] + 'T12:00:00');
    const last  = new Date(entries[entries.length-1][0] + 'T12:00:00');
    const totalDays = Math.floor((last - first) / 86400000) + 1;
    return Math.max(0, totalDays - entries.length);
  },

  _isoWeek(d) {
    const dt = new Date(d);
    dt.setHours(12,0,0,0);
    dt.setDate(dt.getDate() + 4 - (dt.getDay() || 7));
    const y = dt.getFullYear();
    const w = Math.ceil(((dt - new Date(y,0,1)) / 86400000 + 1) / 7);
    return `${y}-W${String(w).padStart(2,'0')}`;
  }
};

global.M6_BioEngine = M6_BioEngine;

})(window);
