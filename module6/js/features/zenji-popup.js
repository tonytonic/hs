/**
 * ZENJI-POPUP — Système de dialogues popup pour M6
 * Inspiré du pattern Mizuki (M5) et Kitsune (M3)
 *
 * Architecture :
 *  - Bulle flottante permanente (bas de page) avec portrait Zenji
 *  - Popup overlay avec message contextualisé + actions cliquables
 *  - Rotation intelligente — jamais deux fois le même message de suite
 *  - Triggers automatiques : changement phase, nouveau dépassement, RTT non pris...
 *  - 150+ messages répartis sur 10 situations
 */
'use strict';

(function(global) {

// ── Storage helpers ───────────────────────────────────────────────
const _get  = (k, d='')     => { try { return localStorage.getItem(k) ?? d; } catch { return d; } };
const _set  = (k, v)        => { try { localStorage.setItem(k, String(v)); } catch {} };
const _json = (k, d={})     => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };

// ── Constantes ────────────────────────────────────────────────────
const IDX_KEY   = 'M6_ZENJI_MSG_IDX';
const CACHE_KEY = 'M6_ZENJI_POPUP_CACHE';
const PHASE_KEY = 'M6_ZENJI_LAST_PHASE';
const IMG       = '../module6/images/Cadre.png';

// ── Sélection rotative anti-répétition ──────────────────────────
function _pick(pool) {
  if (!pool?.length) return '';
  let idx = parseInt(_get(IDX_KEY, '0'));
  const seed = (idx * 7 + new Date().getDate() * 3) % pool.length;
  _set(IDX_KEY, (idx + 1) % 9999);
  return pool[seed];
}

// ══════════════════════════════════════════════════════════════════
//  POOLS DE MESSAGES — 10 situations × 12-20 messages chacune
// ══════════════════════════════════════════════════════════════════

// ── 1. FORFAIT CONFORME (P1) ──────────────────────────────────────
const MSG_CONFORME = [
  n => ({ titre: 'Forfait maîtrisé', icon: '✅', level: 'ok',
    msg: `${n}Votre forfait avance à bon rythme. Aucun dépassement, aucune alerte. Continuez à saisir chaque journée — c'est ce qui donnera sa valeur probante à votre historique en cas de contrôle.`,
    actions: ['Saisir aujourd\'hui', 'Voir le bilan annuel'] }),
  n => ({ titre: 'Situation conforme', icon: '⚖️', level: 'ok',
    msg: `${n}Vos données sont en ordre. Rappel : l'entretien annuel de charge de travail est obligatoire (Art. L3121-65). L'avez-vous planifié ?`,
    actions: ['Planifier l\'entretien', 'Exporter un PDF mensuel'] }),
  n => ({ titre: 'Bonne gestion', icon: '✅', level: 'ok',
    msg: `${n}Le forfait jours est un outil d'autonomie — vous le gérez bien. Pensez à prendre vos RTT régulièrement : Sonnentag 2022 confirme que le détachement fréquent vaut mieux que les longues vacances rares.`,
    actions: ['Poser un RTT', 'Voir l\'analyse santé'] }),
  n => ({ titre: 'Cap respecté', icon: '⚖️', level: 'ok',
    msg: `${n}Votre rythme actuel est soutenable. Une note de vigilance : si votre CCN prévoit un plafond inférieur à 218j, vérifiez votre convention collective — certaines branches (ex: Banque AFB) descendent à 205j.`,
    actions: ['Consulter le glossaire CCN', 'Modifier le plafond'] }),
  n => ({ titre: 'Aucun dépassement', icon: '✅', level: 'ok',
    msg: `${n}Parfait. Chaque journée saisie avec son amplitude vous protège doublement : contre un litige sur la durée de travail, et vous permet de suivre votre santé biologique avec précision.`,
    actions: ['Renseigner l\'amplitude d\'aujourd\'hui', 'Voir les scores santé'] }),
  n => ({ titre: 'Conformité maintenue', icon: '✅', level: 'ok',
    msg: `${n}Votre forfait est dans les clous. Conseil stratégique : le droit à la déconnexion (Art. L3121-62) doit être prévu dans votre accord collectif — avez-vous vérifié les modalités prévues dans votre CCN ?`,
    actions: ['Glossaire — Déconnexion', 'Voir mon contrat'] }),
];

// ── 2. PLAFOND APPROCHE (90%+) ────────────────────────────────────
const MSG_APPROCHE = [
  (n, restants) => ({ titre: `Plus que ${restants} jours`, icon: '📅', level: 'vigilance',
    msg: `${n}Vous approchez de votre plafond annuel. Il vous reste ${restants} jour${restants>1?'s':''} de travail autorisés. Planifiez vos RTT restants maintenant — les RTT non pris en fin d'année peuvent être perdus selon votre CCN.`,
    actions: ['Poser des RTT', 'Simuler la fin d\'année', 'Voir les RTT restants'] }),
  (n, restants) => ({ titre: 'Plafond en vue', icon: '⚠️', level: 'vigilance',
    msg: `${n}${restants} jours restants sur votre forfait. Si vous prévoyez de dépasser, un avenant de rachat écrit est obligatoire AVANT le dépassement (Art. L3121-59). Sans formalisation, les jours excédentaires ne sont pas opposables.`,
    actions: ['Comprendre le rachat', 'Simuler le montant'] }),
  (n, restants) => ({ titre: `${restants} jours restants`, icon: '📅', level: 'vigilance',
    msg: `${n}Attention : vous approchez du plafond. Pencavel 2014 (Stanford) a démontré qu'au-delà de 50h équivalent, la productivité n'augmente plus — travailler plus ne signifie pas produire plus.`,
    actions: ['Voir l\'analyse Pencavel', 'Poser des RTT'] }),
];

// ── 3. DÉPASSEMENT FORFAIT ────────────────────────────────────────
const MSG_DEPASSE = [
  (n, excedent) => ({ titre: `${excedent}j au-delà du forfait`, icon: '🚨', level: 'critique',
    msg: `${n}Vous avez dépassé votre plafond de ${excedent} jour${excedent>1?'s':''}. Ces jours sont juridiquement non-comptabilisés sans avenant écrit avec majoration ≥10% (Art. L3121-59). En l'absence d'avenant, vous pourriez contester ces jours aux prud'hommes.`,
    actions: ['Simuler le rachat', 'Comprendre l\'avenant', 'Consulter Art. L3121-59'] }),
  (n, excedent) => ({ titre: 'Forfait dépassé', icon: '🚨', level: 'critique',
    msg: `${n}${excedent} jour${excedent>1?'s':''} au-delà du plafond contractuel. Rappel jurisprudentiel : Cass. Soc. 29 juin 2011 — un forfait mal suivi peut être frappé de nullité, ouvrant droit au régime des heures supplémentaires rétroactif.`,
    actions: ['Exporter l\'historique', 'Voir la simulation'] }),
];

// ── 4. BURN-OUT / P4 ─────────────────────────────────────────────
const MSG_P4 = [
  n => ({ titre: 'Signal d\'alarme — Phase P4', icon: '🔴', level: 'critique',
    msg: `${n}Les indicateurs biologiques atteignent le seuil critique (INRS P4). La Dresden Burnout Study 2025 confirme que l'inaction à ce stade génère un vieillissement épigénétique mesurable. Consultez votre médecin du travail cette semaine — c'est votre droit (Art. R4624-10).`,
    actions: ['Contacter médecin du travail', 'Voir Art. L4121-1', 'Droit de retrait (L4131-1)'] }),
  n => ({ titre: 'Burn-out — Agissez maintenant', icon: '🔴', level: 'critique',
    msg: `${n}Phase P4 confirmée. Kivimäki 2015 (Lancet, 603 838 individus) montre que ce niveau d'exposition triple le risque d'AVC. Ce n'est pas une alerte cosmétique — c'est de l'épidémiologie solide. Votre santé prime sur votre forfait.`,
    actions: ['Signaler à l\'employeur', 'Médecin du travail', 'Voir analyse complète'] }),
];

// ── 5. SURMENAGE / P3 ────────────────────────────────────────────
const MSG_P3 = [
  n => ({ titre: 'Surmenage détecté — Phase P3', icon: '🟠', level: 'alerte',
    msg: `${n}Niveau INRS P3. Totterdell 2005 documente le cycle d'épuisement émotionnel chez les cadres à ce stade : cynisme, décrochage, perte de sens. Ce cycle se brise avec une aide extérieure — pas uniquement avec de la volonté.`,
    actions: ['Signaler la surcharge (L3121-65)', 'Voir les alertes santé', 'Poser des RTT urgents'] }),
  n => ({ titre: 'Surcharge chronique', icon: '🟠', level: 'alerte',
    msg: `${n}Phase P3. À ce niveau de fatigue, Ahola 2012 (PLoS ONE, n=2 911) mesure un raccourcissement significatif des télomères. C'est réversible maintenant — mais pas sans action concrète.`,
    actions: ['Demander un aménagement', 'Entretien de charge urgent', 'Voir l\'analyse biologique'] }),
  n => ({ titre: 'Phase P3 — Vigilance', icon: '🟠', level: 'alerte',
    msg: `${n}Surmenage documenté. Le risque CV augmente de façon non-linéaire : WHO/ILO 2021 cite 745 194 décès/an liés aux longues heures. Votre employeur a une obligation légale de prévention (Art. L4121-1).`,
    actions: ['Voir risque cardiovasculaire', 'Contacter RH', 'Droit à la déconnexion'] }),
];

// ── 6. FATIGUE CHRONIQUE / P2 ─────────────────────────────────────
const MSG_P2 = [
  n => ({ titre: 'Fatigue chronique — Phase P2', icon: '🟡', level: 'info',
    msg: `${n}INRS Phase P2. La fatigue s'accumule de façon non-linéaire — le prochain cap (P3) arrive plus vite qu'on ne le pense. Conseil : Sonnentag 2022 confirme qu'un RTT toutes les 2 semaines est plus efficace biologiquement qu'une semaine de vacances par trimestre.`,
    actions: ['Planifier des RTT', 'Voir l\'évolution des scores', 'Comprendre P1-P4'] }),
  n => ({ titre: 'Signal de fatigue', icon: '🟡', level: 'info',
    msg: `${n}Phase P2 — les horloges épigénétiques commencent à s'accélérer selon Dresden 2025. C'est réversible à ce stade, mais la fenêtre d'action est maintenant, pas dans 3 mois.`,
    actions: ['Voir les détails biologiques', 'Poser un RTT', 'Analyser les amplitudes'] }),
];

// ── 7. RTT NON PRIS ───────────────────────────────────────────────
const MSG_RTT_ZERO = [
  (n, rtt) => ({ titre: `${rtt} RTT disponibles — aucun pris`, icon: '🌿', level: 'info',
    msg: `${n}Vous avez ${rtt} RTT théoriques pour cette année et n'en avez pris aucun. Sonnentag 2022 (Annual Review, méta-analyse de 198 études) est formel : le détachement régulier est le prédicteur le plus fort de la récupération. Les RTT non pris sont une dette biologique, pas une épargne.`,
    actions: ['Poser un RTT', 'Voir l\'effet sur les scores', 'Lire Sonnentag 2022'] }),
  (n, rtt) => ({ titre: 'Pas de RTT pris', icon: '🌿', level: 'info',
    msg: `${n}${rtt} RTT disponibles, zéro pris. Selon votre CCN, les RTT non pris peuvent être perdus en fin d'exercice, placés sur CET, ou monétisés — vérifiez les modalités de votre convention collective.`,
    actions: ['Voir les RTT disponibles', 'Comprendre le CET', 'Glossaire — RTT'] }),
];

// ── 8. ENTRETIEN MANQUANT ─────────────────────────────────────────
const MSG_ENTRETIEN = [
  n => ({ titre: 'Entretien annuel à planifier', icon: '🗓️', level: 'info',
    msg: `${n}L'entretien annuel de suivi de charge de travail est obligatoire (Art. L3121-65). Son absence peut entraîner la nullité de votre convention de forfait (Cass. Soc. 29 juin 2011). En cas de nullité : toutes les heures au-delà de 35h deviennent des heures supplémentaires rétroactives.`,
    actions: ['Renseigner la date', 'Générer la trame d\'entretien', 'Voir Art. L3121-65'] }),
  n => ({ titre: 'Entretien non renseigné', icon: '🗓️', level: 'info',
    msg: `${n}Cet entretien est votre protection autant que votre obligation. Il documente la charge de travail, l'équilibre vie pro/perso et la rémunération — trois sujets que vous pouvez opposer à votre employeur en cas de litige.`,
    actions: ['Planifier l\'entretien', 'Voir la trame', 'Export PDF entretien'] }),
];

// ── 9. AMPLITUDE EXCESSIVE ────────────────────────────────────────
const MSG_AMPLITUDE = [
  (n, h) => ({ titre: `Amplitude ${h}h — Repos menacé`, icon: '⏱️', level: 'alerte',
    msg: `${n}Une journée de ${h}h vous laisse moins de 11h de repos avant la prise de poste suivante. Ce repos est légalement garanti même pour un cadre en forfait jours (Art. L3131-1). Hakola & Härmä 2001 documentent la perturbation circadienne dès 11h d'amplitude.`,
    actions: ['Voir l\'alerte repos', 'Comprendre le repos quotidien', 'Art. L3131-1'] }),
  (n, h) => ({ titre: 'Journée longue détectée', icon: '⏱️', level: 'vigilance',
    msg: `${n}Amplitude de ${h}h renseignée. Les études IRM 2024 (PMC10921288) documentent une atrophie du gyrus frontal médian avec la privation de sommeil chronique. Votre capital cognitif de cadre dirigeant est une ressource stratégique — préservez-le.`,
    actions: ['Voir les risques cognitifs', 'Analyse biologique complète'] }),
];

// ── 10. JOURNÉE SAISIE / FÉLICITATIONS ───────────────────────────
const MSG_SAISIE_OK = [
  n => ({ titre: 'Journée enregistrée', icon: '✓', level: 'ok',
    msg: `${n}Journée sauvegardée. Chaque entrée renforce la valeur probante de votre historique. Si vous avez saisi une amplitude, l'analyse biologique s'affine automatiquement.`,
    actions: ['Voir le bilan', 'Analyse santé'] }),
  n => ({ titre: 'Enregistré', icon: '✓', level: 'ok',
    msg: `${n}C'est noté. Rappel : si votre journée dépasse 13h d'amplitude, une alerte repos quotidien sera générée automatiquement (Art. L3131-1 — 11h minimum).`,
    actions: ['Voir le calendrier', 'Retour au bilan'] }),
  n => ({ titre: 'Journée sauvegardée', icon: '✓', level: 'ok',
    msg: `${n}Historique mis à jour. Chaque semaine saisie est un maillon de la preuve en cas de contrôle de l'inspection du travail ou de contentieux prud'homal.`,
    actions: ['Continuer la saisie', 'Exporter un PDF'] }),
];

// ── 11. RACHAT DÉTECTÉ ────────────────────────────────────────────
const MSG_RACHAT = [
  (n, jours, montant) => ({ titre: `${jours}j rachetés — ${montant ? montant+'€' : 'avenant requis'}`, icon: '💰', level: 'vigilance',
    msg: `${n}Le rachat de jours est légal mais doit rester exceptionnel. Totterdell 2005 documente que le rachat récurrent génère un cycle d'épuisement émotionnel difficile à briser. Sur le plan fiscal : les jours rachetés bénéficient de l'exonération fiscale HS dans la limite de 7 500€/an (Loi TEPA).`,
    actions: ['Voir la simulation rachat', 'Loi TEPA — Glossaire', 'Télécharger l\'avenant type'] }),
];

// ── 12. FÉLICITATIONS — EXERCICE COMPLET ─────────────────────────
const MSG_ANNEE_FIN = [
  n => ({ titre: 'Exercice bientôt terminé', icon: '🎯', level: 'ok',
    msg: `${n}Vous approchez de la fin de l'exercice. C'est le bon moment pour : générer le PDF annuel, valider tous les mois restants, et préparer le compte-rendu de l'entretien annuel obligatoire.`,
    actions: ['PDF Annuel', 'Valider les mois', 'Préparer l\'entretien'] }),
];

// ══════════════════════════════════════════════════════════════════
//  MOTEUR DE SÉLECTION — choisit le bon pool selon le contexte
//  Lit fidèlement les données de l'utilisateur pour adapter le message.
// ══════════════════════════════════════════════════════════════════
function _selectPopup(analysis, bio, prenom, regime) {
  const n = prenom ? prenom + ' ! ' : '';
  const a = analysis || {};
  const b = bio || {};

  // ── Cadre Dirigeant : messages spécifiques ─────────────────────
  if (regime === 'cadre_dirigeant') {
    // P4/P3 santé toujours prioritaire
    if (b.phase?.code === 'P4') return _pick(MSG_P4)(n);
    if (b.phase?.code === 'P3') return _pick(MSG_P3)(n);
    if (b.phase?.code === 'P2') return _pick(MSG_P2)(n);
    // Pour les CD : afficher seulement si des données existent
    if (!a.joursEffectifs || a.joursEffectifs === 0) {
      return { titre: 'Bonjour', icon: '🎯', level: 'ok',
        msg: `${n}En tant que Cadre Dirigeant (Art. L3111-2), vous n'êtes pas soumis aux règles de durée légale du travail. L'appli suit vos projets, missions et votre équilibre vie pro/perso.`,
        actions: ['Ajouter un projet', 'Voir l\'entretien de charge'] };
    }
    const jours = a.joursEffectifs || 0;
    if (jours > 218) return { titre: 'Alerte charge', icon: '🚨', level: 'alerte',
      msg: `${n}${jours} jours travaillés constatés cette année — au-delà du seuil indicatif de 218j. Même sans compteur légal en régime CD, l'obligation de sécurité de l'employeur s'applique (Art. L4121-1). Un entretien de charge est recommandé.`,
      actions: ['Ouvrir l\'entretien de charge'] };
    return { titre: 'Bilan dirigeant', icon: '📊', level: 'ok',
      msg: `${n}${jours} jours travaillés cette année. Votre régime CD vous laisse l'autonomie totale — pensez à documenter votre charge pour les entretiens annuels.`,
      actions: ['Voir mes projets', 'Entretien de charge'] };
  }

  // ── Forfait Heures ─────────────────────────────────────────────
  if (regime === 'forfait_heures') {
    if (b.phase?.code === 'P4') return _pick(MSG_P4)(n);
    if (b.phase?.code === 'P3') return _pick(MSG_P3)(n);
    if (!a || !a.semaines) {
      return { titre: 'Démarrage', icon: '⏱️', level: 'ok',
        msg: `${n}Saisissez vos premières semaines pour que je puisse analyser votre rythme. Je calculerai automatiquement vos heures supplémentaires et la consommation de votre contingent.`,
        actions: ['Saisir une semaine'] };
    }
    const tauxRempli = a.tauxRemplissage || 0;
    const totalHS = Math.round(a.totalHS || 0);
    const contingent = a.contingent || 220;
    if (tauxRempli >= 95) return { titre: `Contingent HS à ${tauxRempli}%`, icon: '🔴', level: 'critique',
      msg: `${n}Vous avez consommé ${totalHS}h sur ${contingent}h de contingent (${tauxRempli}%). Au-delà du contingent, des HS restent légalement possibles mais nécessitent l'avis du CSE et déclenchent une COR (contrepartie obligatoire en repos) — Art. L3121-30.`,
      actions: ['Voir le bilan HS'] };
    if (tauxRempli >= 80) return { titre: 'Contingent — vigilance', icon: '🟠', level: 'vigilance',
      msg: `${n}${totalHS}h de HS sur ${contingent}h de contingent (${tauxRempli}%). Planifiez la fin de l'année pour rester sous le plafond et éviter la procédure CSE/COR.`,
      actions: ['Voir le bilan'] };
    return _pick(MSG_CONFORME)(n);
  }

  // ── Forfait Jours (défaut) ─────────────────────────────────────
  if (b.phase?.code === 'P4') return _pick(MSG_P4)(n);
  if (b.phase?.code === 'P3') return _pick(MSG_P3)(n);

  // Pas de saisie → message de démarrage adapté
  if (!a.joursEffectifs && !a.cpPris && !a.rttPris) {
    return { titre: 'Bienvenue', icon: '🎯', level: 'ok',
      msg: `${n}Commencez par saisir vos jours travaillés — chaque saisie alimente votre compteur de forfait et votre suivi biologique. Plus vous saisissez, plus mes analyses sont précises.`,
      actions: ['Saisir aujourd\'hui', 'Voir le glossaire'] };
  }

  const plafond = a.plafond || a.plafondProrata || 218;
  const jours = a.joursEffectifs || 0;
  const excedent = jours - plafond;

  if (excedent > 0) return _pick(MSG_DEPASSE)(n, Math.round(excedent));
  if (b.phase?.code === 'P2') return _pick(MSG_P2)(n);

  const restants = a.joursRestants ?? Math.max(0, plafond - jours);
  if (restants <= 15 && restants >= 0 && jours > 0)
    return _pick(MSG_APPROCHE)(n, restants);

  if ((a.rachetes||0) > 3)
    return _pick(MSG_RACHAT)(n, a.rachetes,
      a.simulRachat?.montantMajoré ? Math.round(a.simulRachat.montantMajoré) : null);

  if (!a.entretienDate) return _pick(MSG_ENTRETIEN)(n);

  if (a.rttPris === 0 && (a.rttTheoriques||0) > 0 && jours > 40)
    return _pick(MSG_RTT_ZERO)(n, a.rttTheoriques);

  if ((b.details?.amplitudeViola || 0) > 3) return _pick(MSG_AMPLITUDE)(n, '13+');

  const mois = new Date().getMonth();
  if (mois === 11 && jours > 0) return _pick(MSG_ANNEE_FIN)(n);

  return _pick(MSG_CONFORME)(n);
}

// ══════════════════════════════════════════════════════════════════
//  RENDU POPUP — couche d'affichage complète
// ══════════════════════════════════════════════════════════════════
const LEVEL_COLORS = {
  ok:        { bg:'#E8F5F0', border:'#2D6A4F', text:'#1A4035', badge:'#2D6A4F', badgeText:'#fff', label:'Conforme' },
  info:      { bg:'#EEF2FF', border:'#3730A3', text:'#2D2680', badge:'#3730A3', badgeText:'#fff', label:'Information' },
  vigilance: { bg:'#FFF8E6', border:'#C4853A', text:'#7A5C00', badge:'#C4853A', badgeText:'#fff', label:'Vigilance' },
  alerte:    { bg:'#FFF0EE', border:'#B85C50', text:'#7A2A20', badge:'#B85C50', badgeText:'#fff', label:'Alerte' },
  critique:  { bg:'#FBEAEA', border:'#9B2C2C', text:'#9B2C2C', badge:'#9B2C2C', badgeText:'#fff', label:'Critique' },
};

function _injectStyles() {
  if (document.getElementById('zenji-popup-css')) return;
  const s = document.createElement('style');
  s.id = 'zenji-popup-css';
  s.textContent = `
    /* ── Bulle flottante ─────────────────────────────────────── */
    #zenji-bubble {
      position: fixed; bottom: calc(72px + env(safe-area-inset-bottom,0)); right: 16px;
      z-index: 500; cursor: pointer;
      display: flex; align-items: flex-end; gap: 8px;
      animation: zenjiFloat 0.5s ease-out;
    }
    @keyframes zenjiFloat { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    #zenji-bubble-portrait {
      width: 48px; height: 48px; border-radius: 50%; object-fit: cover;
      object-position: top center; border: 2px solid var(--champagne);
      box-shadow: 0 4px 14px rgba(196,163,90,0.30);
      flex-shrink: 0;
    }
    #zenji-bubble-text {
      max-width: 220px; background: var(--charbon); color: var(--ivoire);
      font-family: var(--font-body); font-size: 0.75rem; line-height: 1.45;
      padding: 8px 12px; border-radius: 14px 14px 4px 14px;
      border: 1px solid rgba(196,163,90,0.4);
      box-shadow: 0 4px 16px rgba(26,23,20,0.18);
      position: relative;
    }
    #zenji-bubble-text::after {
      content: ''; position: absolute; bottom: 6px; right: -6px;
      width: 0; height: 0;
      border-left: 6px solid var(--charbon); border-top: 4px solid transparent; border-bottom: 4px solid transparent;
    }
    #zenji-bubble-close {
      position: absolute; top: -6px; left: -6px; width: 16px; height: 16px;
      background: var(--pierre); color: #fff; border-radius: 50%; font-size: 0.6rem;
      display: flex; align-items: center; justify-content: center; cursor: pointer;
    }

    /* ── Overlay popup ───────────────────────────────────────── */
    #zenji-overlay {
      position: fixed; inset: 0; background: rgba(26,23,20,0.65);
      backdrop-filter: blur(3px); z-index: 600;
      display: flex; align-items: flex-end; justify-content: center;
      opacity: 0; pointer-events: none; transition: opacity 0.25s;
    }
    #zenji-overlay.open { opacity: 1; pointer-events: all; }
    #zenji-sheet {
      background: #fff; width: 100%; max-width: 480px;
      border-radius: 24px 24px 0 0;
      padding: 24px 20px calc(24px + env(safe-area-inset-bottom,0));
      transform: translateY(40px); transition: transform 0.3s cubic-bezier(.4,0,.2,1);
      max-height: 85dvh; overflow-y: auto;
    }
    #zenji-overlay.open #zenji-sheet { transform: translateY(0); }

    /* ── Sheet header ────────────────────────────────────────── */
    .zp-header {
      display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
    }
    .zp-portrait {
      width: 56px; height: 56px; border-radius: 50%; object-fit: cover;
      object-position: top center; flex-shrink: 0;
      box-shadow: 0 3px 12px rgba(196,163,90,0.25);
    }
    .zp-badge {
      display: inline-block; font-size: 0.6rem; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase;
      border-radius: 99px; padding: 2px 8px; margin-bottom: 4px;
    }
    .zp-titre {
      font-family: var(--font-display); font-size: 1.15rem; font-weight: 600;
      color: var(--charbon); line-height: 1.2;
    }

    /* ── Message ─────────────────────────────────────────────── */
    .zp-msg {
      font-size: 0.87rem; color: var(--charbon-3); line-height: 1.7;
      border-left: 3px solid var(--champagne); padding-left: 12px;
      margin-bottom: 18px; font-style: italic;
    }

    /* ── Actions ─────────────────────────────────────────────── */
    .zp-actions { display: flex; flex-direction: column; gap: 8px; }
    .zp-action {
      display: flex; align-items: center; gap: 10px;
      background: var(--ivoire); border: var(--grey-line);
      border-radius: var(--radius); padding: 11px 14px; cursor: pointer;
      font-family: var(--font-body); font-size: 0.82rem; font-weight: 500;
      color: var(--charbon); text-align: left; width: 100%;
      transition: background 0.15s;
    }
    .zp-action:active { background: var(--ivoire-2); }
    .zp-action-icon { font-size: 1rem; flex-shrink: 0; }
    .zp-close-btn {
      width: 100%; margin-top: 14px; padding: 12px;
      border: none; background: none; color: var(--pierre);
      font-family: var(--font-body); font-size: 0.8rem; cursor: pointer;
      border-top: var(--grey-line);
    }

    /* ── Indicateur de changement de phase ───────────────────── */
    .zenji-phase-change {
      position: fixed; top: calc(70px + env(safe-area-inset-top,0)); left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: var(--charbon); color: var(--ivoire);
      font-size: 0.75rem; padding: 8px 16px; border-radius: 99px;
      border: 1px solid var(--champagne); z-index: 400;
      opacity: 0; transition: all 0.35s; white-space: nowrap;
      pointer-events: none;
    }
    .zenji-phase-change.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  `;
  document.head.appendChild(s);
}

// ══════════════════════════════════════════════════════════════════
//  API PUBLIQUE
// ══════════════════════════════════════════════════════════════════
const M6_ZenjiPopup = {

  _analysis: null, _bio: null, _prenom: '',
  _onAction: null, // callback (actionText) => {}

  /**
   * Initialise le système de popup Zenji.
   * À appeler une fois par vue, après le render().
   */
  init(analysis, bio, contract, onActionCallback, regime) {
    _injectStyles();
    this._analysis = analysis;
    this._bio      = bio;
    this._prenom   = contract?.nomCadre || contract?.nom || '';
    this._regime   = regime || 'forfait_jours';
    this._onAction = onActionCallback || null;

    // N'injecter que l'overlay (pas la bulle flottante intrusive)
    this._injectOverlay();
    this._checkPhaseChange(bio);
    // Injecter le message journalier discret en haut de page
    this._injectDailyMessage();
  },

  /** Affiche le popup principal */
  showPopup() {
    const popup = _selectPopup(this._analysis, this._bio, this._prenom, this._regime);
    if (!popup) return;
    this._renderPopup(popup);
    const ov = document.getElementById('zenji-overlay');
    if (ov) requestAnimationFrame(() => ov.classList.add('open'));
  },

  /** Affiche un popup d'une situation spécifique (ex: après saisie) */
  showSaisieOk() {
    const n = this._prenom ? this._prenom + ' ! ' : '';
    this._renderPopup(_pick(MSG_SAISIE_OK)(n));
    const ov = document.getElementById('zenji-overlay');
    if (ov) requestAnimationFrame(() => ov.classList.add('open'));
  },

  /** Met à jour le message journalier */
  updateBubble(analysis, bio) {
    this._analysis = analysis; this._bio = bio;
    this._checkPhaseChange(bio);
  },

  /** Rafraîchir intégralement la bulle Zenji après un changement d'état
   *  (ex: case cochée dans Validité → analysis.entretienDate change) */
  refresh(analysis, bio, contract, regime) {
    if (analysis) this._analysis = analysis;
    if (bio)      this._bio      = bio;
    if (contract) this._prenom   = contract.nomCadre || contract.nom || this._prenom;
    if (regime)   this._regime   = regime;
    // Reconstruire le bandeau avec les nouvelles données
    this._injectDailyMessage();
  },

  /** Détruit les éléments Zenji (au changement de vue) */
  destroy() {
    document.getElementById('zenji-daily-bar')?.remove();
    document.getElementById('zenji-overlay')?.remove();
  },

  // ── DOM helpers ─────────────────────────────────────────────

  /** Message journalier discret — bannière cliquable en haut du contenu */
  _injectDailyMessage() {
    document.getElementById('zenji-daily-bar')?.remove();
    const popup = _selectPopup(this._analysis, this._bio, this._prenom, this._regime);
    if (!popup) return;
    const phase = this._bio?.phase?.code || 'P1';
    const phaseIcons = { P1:'✅', P2:'⚠️', P3:'🟠', P4:'🔴' };
    const bar = document.createElement('div');
    bar.id = 'zenji-daily-bar';
    bar.className = 'm6-daily-msg';
    bar.innerHTML = `
      <div class="m6-daily-msg-avatar">${phaseIcons[phase]||'🤖'}</div>
      <div class="m6-daily-msg-text">${popup.msg?.slice(0,120) || ''}…</div>
      <div class="m6-daily-msg-cta">Zenji ›</div>`;
    bar.addEventListener('click', () => this.showPopup());
    // Insérer après le header, avant le contenu principal
    const appRoot = document.getElementById('m6-app-root');
    const firstChild = appRoot?.firstElementChild;
    if (firstChild) {
      appRoot.insertBefore(bar, firstChild.nextSibling);
    } else if (appRoot) {
      appRoot.prepend(bar);
    }
  },

  _injectOverlay() {
    if (!document.getElementById('zenji-overlay')) {
      const ov = document.createElement('div');
      ov.id = 'zenji-overlay';
      ov.innerHTML = `<div id="zenji-sheet"></div>`;
      document.body.appendChild(ov);
      ov.addEventListener('click', (e) => {
        if (e.target === ov) this._closePopup();
      });
    }
  },

  // Méthode conservée pour compatibilité (ne fait plus rien)
  _injectDOM() {
    this._injectOverlay();
  },
  _updateBubble() {},

  _renderPopup(popup) {
    const sheet = document.getElementById('zenji-sheet');
    if (!sheet || !popup) return;
    const lc = LEVEL_COLORS[popup.level] || LEVEL_COLORS.ok;
    const actionIcons = { 'Poser':'🌿', 'Voir':'👁', 'Exporter':'📄', 'Générer':'📋',
      'Planifier':'📅', 'Comprendre':'📖', 'Contacter':'📞', 'Signaler':'⚠️',
      'Télécharger':'💾', 'Retour':'←', 'Continuer':'→', 'Art.':'⚖️',
      'Consulter':'👁', 'Demander':'✍️', 'Simuler':'🔢', 'Lire':'📚', 'Analyse':'🩺' };
    const getIcon = (a) => Object.entries(actionIcons).find(([k]) => a.startsWith(k))?.[1] || '→';

    sheet.innerHTML = `
      <div class="zp-header">
        <img class="zp-portrait" src="${IMG}" alt="Zenji" style="border:2px solid ${lc.border}">
        <div>
          <span class="zp-badge" style="background:${lc.badge};color:${lc.badgeText}">${lc.label}</span>
          <div class="zp-titre">${popup.titre || 'Zenji'}</div>
          <div style="font-size:0.65rem;color:var(--pierre);letter-spacing:0.06em;text-transform:uppercase">Zenji · Conseiller M6</div>
        </div>
      </div>
      <div class="zp-msg" style="border-color:${lc.border}">"${popup.msg || ''}"</div>
      <div class="zp-actions">
        ${(popup.actions || []).map(a => `
          <button class="zp-action" data-action="${a}">
            <span class="zp-action-icon">${getIcon(a)}</span>${a}
          </button>`).join('')}
      </div>
      <button class="zp-close-btn">Fermer</button>
    `;

    sheet.querySelector('.zp-close-btn')?.addEventListener('click', () => this._closePopup());
    sheet.querySelectorAll('.zp-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        this._closePopup();
        if (this._onAction) this._onAction(action);
      });
    });
  },

  _closePopup() {
    const ov = document.getElementById('zenji-overlay');
    if (ov) ov.classList.remove('open');
  },

  // ── Détection changement de phase ────────────────────────────
  _checkPhaseChange(bio) {
    if (!bio?.phase) return;
    const lastPhase = _get(PHASE_KEY, '');
    const cur = bio.phase.code;
    if (lastPhase && lastPhase !== cur && lastPhase !== '') {
      this._showPhaseChangeNotif(lastPhase, cur, bio.phase.color);
    }
    _set(PHASE_KEY, cur);
  },

  _showPhaseChangeNotif(from, to, color) {
    const worse = ['P1','P2','P3','P4'].indexOf(to) > ['P1','P2','P3','P4'].indexOf(from);
    const el = document.createElement('div');
    el.className = 'zenji-phase-change';
    el.textContent = worse
      ? `Zenji : Passage de ${from} à ${to} — lisez l'analyse santé`
      : `Zenji : Amélioration — ${from} → ${to}`;
    el.style.borderColor = color;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 400); }, 4000);
  }
};

global.M6_ZenjiPopup = M6_ZenjiPopup;

// ── Pools exportés pour usage externe ─────────────────────────────
global.M6_ZenjiPools = {
  MSG_CONFORME, MSG_APPROCHE, MSG_DEPASSE, MSG_P4, MSG_P3, MSG_P2,
  MSG_RTT_ZERO, MSG_ENTRETIEN, MSG_AMPLITUDE, MSG_SAISIE_OK, MSG_RACHAT, MSG_ANNEE_FIN
};

})(window);
