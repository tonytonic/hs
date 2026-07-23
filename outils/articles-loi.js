/* ============================================================================
   ARTICLES-LOI.JS — Référentiel juridique commun aux 54 modules
   ----------------------------------------------------------------------------
   POURQUOI CE FICHIER ?
   Toutes les valeurs chiffrées (SMIC, plafonds…), les références d'articles
   de loi et leurs textes explicatifs sont centralisés ICI. Pour la maintenance
   annuelle (revalorisation SMIC, plafonds SS au 1er janvier, etc.), tu modifies
   UNIQUEMENT ce fichier et tous les modules sont à jour.

   COMMENT L'UTILISER DANS UN MODULE ?
   1. Ajouter dans le <head> du module :  <script src="../articles-loi.js"></script>
      (chemin relatif : les modules sont dans outils/module-xxx/, ce fichier
       est dans outils/, donc "../articles-loi.js")
   2. Dans le code du module, utiliser les helpers :
        SH.val('smic_h')           → 12.31
        SH.eur('pmss')             → "4 005 €"
        SH.art('L1234-1')          → "Art. L1234-1 CT"
        SH.texte('L1234-1')        → texte explicatif complet
        SH.maj('ijss_max')         → "1er juillet 2026"

   PAS de fetch / pas de JSON → fonctionne en file://, http(s):// et dans le TWA.
   Aucune dépendance externe.

   DERNIÈRE MISE À JOUR DES VALEURS : 30 juin 2026
   CONTRÔLE DE CONFORMITÉ (déploiement échelonné, été→septembre 2026) :
     Valeurs chiffrées re-vérifiées contre sources officielles (Légifrance,
     URSSAF/BOSS, info.gouv.fr, service-public.fr, instructions DSS).
     SMIC, PMSS/PASS, titre-restaurant, pension d'invalidité (plancher + MTP)
     et forfait hospitalier CONFIRMÉS pour septembre 2026 — aucune valeur
     modifiée. Prochaine échéance connue : revalorisation SMIC au 1er janvier
     2027 (sauf nouveau dépassement du seuil +2 % d'inflation déclenchant une
     revalorisation automatique en cours d'année).

   PASSAGE D'AUDIT DU 15/07/2026 (lot 1 — voir tracking-audit-outils.csv) :
     - ARE (are_min/are_degressif_*) CONFIRMÉS : pas de revalorisation au
       1er juillet 2026 (Unédic CA du 30/06/2026, communiqué + service-public.fr
       + unedic.org). Montants du 1er juillet 2025 toujours en vigueur.
     - Bug corrigé : module-chomage.html utilisait un plancher ARE local
       (31,97 €) désynchronisé de la valeur confirmée (32,13 €) — corrigé.
     - Nouveau à surveiller pour la conformité septembre 2026 : loi n° 2026-470
       du 11/06/2026 (Légifrance : legifrance.gouv.fr/eli/loi/2026/6/11/
       TRSD2606801L) réduit la durée max. d'indemnisation ARE pour les
       ruptures conventionnelles homologuées à compter du 1er sept. 2026
       (18→15 mois si -55 ans, 22,5/27→20,5 mois si 55 ans+). Textes
       d'application encore attendus à cette date. Note ajoutée dans
       module-chomage.html et module-rupture.html ; pas encore reflété dans
       un calcul dédié (le simulateur ne demande pas le motif de rupture).
     - Chômage BIT : 8,1 % au T1 2026 (Insee, 13/05/2026) — reste sous le
       seuil de 9 % : le coefficient de contracyclicité 0,75 reste donc
       d'actualité, mais la tendance est haussière (+0,7 pt sur un an) :
       à re-vérifier au prochain trimestre Insee.
     - FMD (forfait mobilités durables) CORRIGÉ : 700€/800€ (limite temporaire
       2022-2024) remplacés par 600€/900€, en vigueur depuis le 01/01/2025
       (Art. D3261-15-2 CT ; urssaf.fr ; ecologie.gouv.fr). Bug identique
       trouvé et corrigé dans module-lexique.html (glossaire, texte figé
       affichait encore 700/800). Aucun module n'appelait SH.val() pour ces
       clés — impact live limité à articles-loi.js + module-lexique.html.
     - avantage_repas (5,50 €) CONFIRMÉ pour 2026 (urssaf.fr).
     - VALEURS/ARTICLES restant à re-vérifier pour le lot 2 : C2P, saisie sur
       salaire, PEE/PERCO, AJPA, PreParE — voir tracking-audit-outils.csv
       pour le détail et le statut des 105 outils (inclusion articles-loi.js,
       sources vérifiées).

   PASSAGE D'AUDIT DU 16/07/2026 (lot 2) :
     - c2p_reserve_formation CORRIGÉ : 10 → 20 points. Confirmé par 2 fiches
       service-public.gouv.fr (F15504, F36326) : "les 20 premiers points du
       C2P sont obligatoirement affectés à la formation". L'ancienne valeur
       de 10 semble avoir été une confusion avec un autre seuil du dispositif
       (plusieurs mécanismes du C2P utilisent aussi le nombre 10). Corrigé
       aussi dans module-c2p.html (même texte affiché à l'écran).
     - saisie sur salaire (module-saisie.html) VÉRIFIÉ OK : barème 7 tranches
       et majoration 145€/mois confirmés identiques à Légifrance (décret
       n°2025-1299 du 24/12/2025) + service-public.gouv.fr + Éditions Tissot.
     - jours fériés (module-feries.html) VÉRIFIÉ OK : algorithme de calcul de
       Pâques (Meeus/Jones/Butcher) contrôlé manuellement pour 2026 (5 avril,
       donc Ascension 14 mai, Pentecôte 24/25 mai) — correct. Le module
       s'auto-vérifie déjà en live contre calendrier.api.gouv.fr (officiel),
       donc risque de dérive très faible pour les années suivantes aussi.
     - retraite (module-retraite.html) VÉRIFIÉ OK — et bonne nouvelle : la
       suspension LFSS 2026 de l'âge légal (gel à 62 ans 9 mois pour les
       générations 1964-1968, dès le 1er septembre 2026, jusqu'en janvier
       2028 — loi n°2025-1403) y est déjà intégrée avec bascule à la bonne
       date, y compris le cas particulier des nés au T1 1965. Rien à changer.
     - Prochain lot : PEE/PERCO, AJPA, PreParE restent à vérifier ; puis
       attaquer le reste du lot 1 (46 fichiers) — voir tracking-audit-outils.csv.
   PASSAGE D'AUDIT DU 19/07/2026 (lot 3 — vérification systématique contre droit repo) :
     - 131 clés d'articles comparées au texte officiel (117 trouvées directement, 6 fichiers
       vides côté source, 8 à re-vérifier par le web). 4 erreurs de NUMÉRO D'ARTICLE trouvées
       (le texte affiché était juste, mais rattaché au mauvais article) :
       · L1237-9 → contenu préavis déplacé vers L1237-10 (article correct) ; L1237-9 redéfini
         avec son vrai contenu (indemnité de départ retraite). module-preavis.html corrigé.
       · L3121-47 → contenu modulation 4/9 semaines déplacé vers L3121-45 (article correct) ;
         L3121-47 redéfini avec son vrai contenu (délai de prévenance 7 jours).
       · L3142-27 → contenu congé sabbatique 6-11 mois déplacé vers L3142-28 (article correct) ;
         L3142-27 redéfini (congé proche aidant/présence parentale, 3 mois renouvelables).
       · L1225-65 → contenu garantie d'emploi au retour éclaté en 2 entrées correctes :
         L1225-55 (retour congé parental) et L1225-25 (retour congé maternité) ; L1225-65
         redéfini avec son vrai contenu (congé présence parentale, ancienneté).
     - D3243-8 (conservation bulletins) VÉRIFIÉ OK : "50 ans ou jusqu'au 75e anniversaire" sont
       bien 2 seuils alternatifs officiels, pas une erreur — aucune correction nécessaire.
     - Prochaine étape : vérifier les 8 clés encore sans source croisée (R351-12, L341-1,
       L431-1, L441-1, L331-3, L161-22, L225-102-1, L341-16, L411-1, L452-5, L461-7, D242-2,
       L243-16, R441-3) + reprendre la vérification des 111 articles comparés pour les écarts
       de contenu au-delà des numéros (formulations, seuils secondaires non encore comparés).
   ========================================================================== */

(function (global) {
  'use strict';

  /* ──────────────────────────────────────────────────────────────────────
     1) VALEURS CHIFFRÉES 2026  — LA PARTIE QUE TU METS À JOUR CHAQUE ANNÉE
     Chaque entrée : { v: valeur, u: unité affichée, maj: date d'effet, src: source }
     ────────────────────────────────────────────────────────────────────── */
  var VALEURS = {

    /* ----- SMIC (revalorisé au 1er janvier + ajustement inflation en cours d'année) ----- */
    smic_h:        { v: 12.31,    u: '€/h',    maj: '2026-06-01', src: 'Arrêté 22/05/2026 (JO 24/05/2026) — 2e revalorisation 2026 (+2,41 %, automatique, seuil +2 % franchi le 13/05/2026), après celle du 1er janvier. Confirmé en vigueur : aucune 3e revalorisation à ce jour ; prochaine au 1er janvier 2027 sauf nouveau dépassement du seuil +2 % (art. L3231-5)' },
    smic_h_net:    { v: 9.75,     u: '€/h net',maj: '2026-06-01', src: '≈ SMIC net mensuel 1 477,93 € ÷ 151,67 h — info.gouv.fr' },
    smic_mensuel:  { v: 1867.02,  u: '€/mois', maj: '2026-06-01', src: 'JO arrêté 22/05/2026 — base 151,67 h × 12,31 €' },
    smic_mensuel_net:{ v: 1477.93, u: '€/mois net', maj: '2026-06-01', src: 'SMIC net mensuel — info.gouv.fr (1er juin 2026)' },
    smic_annuel:   { v: 22404.24, u: '€/an',   maj: '2026-06-01', src: '12 × SMIC mensuel' },

    /* ----- Plafonds Sécurité sociale (arrêté du 22 décembre 2025) ----- */
    pmss:          { v: 4005,     u: '€/mois', maj: '2026-01-01', src: 'Arrêté 22/12/2025' },
    pass:          { v: 48060,    u: '€/an',   maj: '2026-01-01', src: '12 × PMSS' },
    pss_journalier:{ v: 222,      u: '€/jour', maj: '2026-01-01', src: 'PMSS / ~18 (plafond journalier)' },
    pss_horaire:   { v: 30,       u: '€/h',    maj: '2026-01-01', src: 'plafond horaire SS' },

    /* ----- IJSS maladie (plafond suit le SMIC avec 1 mois de décalage) ----- */
    ijss_taux:        { v: 0.50,   u: '',        maj: '—',          src: '50 % du SJB' },
    ijss_plafond_smic:{ v: 1.4,    u: '× SMIC',  maj: '2025-04-01', src: 'décret 2025-160 (était 1,8)' },
    ijss_max:         { v: 42.97,  u: '€/jour',  maj: '2026-07-01', src: '1,4 × SMIC 1867,02 — arrêts ≥ 1er juillet 2026' },
    ijss_max_sem1:    { v: 41.95,  u: '€/jour',  maj: '2026-02-01', src: 'plafond janv.-juin 2026 (SMIC 1823,03)' },
    ijss_plafond_mens:{ v: 2613.83,u: '€/mois',  maj: '2026-07-01', src: '1,4 × SMIC mensuel' },
    ijss_carence:     { v: 3,      u: 'jours',   maj: '—',          src: 'carence Sécu maladie ordinaire' },
    ijss_carence_emp: { v: 7,      u: 'jours',   maj: '—',          src: 'carence employeur légale (Art. D1226-3) — la CCN peut réduire' },
    ijss_max_paternite:{ v: 104.02, u: '€/jour',  maj: '2026-01-01', src: 'PMSS 4005 € × 100 % ÷ 28 × 0,7287 — Légisocial 2026' },

    /* ----- ARE / chômage ----- */
    are_min:          { v: 32.13,  u: '€/jour',  maj: '2025-07-01', src: 'ARE minimale' },
    are_degressif_seuil:{ v: 159.68,u: '€/jour', maj: '2025-07-01', src: 'SJR au-delà duquel dégressivité' },
    are_degressif_plancher:{ v: 92.57,u:'€/jour',maj: '2025-07-01', src: 'plancher après dégressivité' },
    are_degressif_age:{ v: 55,     u: 'ans',     maj: '2025-04-01', src: 'âge d\'exemption (était 57)' },
    are_degressif_delai:{ v: 182,  u: 'jours',   maj: '—',          src: '6 mois avant dégressivité de 30 %' },
    are_affiliation_min:{ v: 130,  u: 'jours',   maj: '—',          src: '6 mois / 910 h minimum' },

    /* ----- C2P pénibilité (réforme 1er septembre 2023) ----- */
    c2p_valeur_point: { v: 500,    u: '€',       maj: '2023-09-01', src: 'était 375 € (1 pt formation)' },
    c2p_reserve_formation:{ v: 20, u: 'points',  maj: '2023-09-01', src: 'Les 20 premiers points du C2P sont obligatoirement affectés à la formation (au-delà, usage libre : temps partiel, trimestres retraite, reconversion) — confirmé service-public.gouv.fr (fiches F15504 et F36326). Ancienne valeur de 10 corrigée le 16/07/2026 (source non identifiée à l\'origine).' },
    c2p_mitemps_points:{ v: 10,    u: 'points',  maj: '2023-09-01', src: '= 4 mois mi-temps payé plein' },
    c2p_mitemps_duree:{ v: 4,      u: 'mois',    maj: '2023-09-01', src: 'durée mi-temps (était 3 mois)' },
    c2p_seuil_nuit:   { v: 100,    u: 'nuits/an',maj: '2023-09-01', src: 'travail de nuit (était 120)' },
    c2p_seuil_alternance:{ v: 30,  u: 'nuits/an',maj: '2023-09-01', src: 'équipes alternantes (était 50)' },
    c2p_points_par_facteur:{ v: 4, u: 'points',  maj: '2023-09-01', src: 'par facteur/an' },

    /* ----- Transport / mobilités ----- */
    fmd_plafond_seul: { v: 600,    u: '€/an',    maj: '2025-01-01', src: 'Forfait mobilités durables seul, secteur privé — Art. D3261-15-2 code du travail. La limite temporaire de 700 € (2022-2024) n\'a pas été reconduite ; 600 € s\'applique depuis le 1er janvier 2025 (urssaf.fr/employeur/beneficier-exonerations/frais-professionnels ; ecologie.gouv.fr/politiques-publiques/soutien-employeurs-aux-mobilites-durables)' },
    fmd_plafond_cumul:{ v: 900,    u: '€/an',    maj: '2025-01-01', src: 'Cumul FMD + prise en charge transports en commun — 900 € (contre 800 € auparavant), confirmé urssaf.fr' },
    fmd_plafond_public:{ v: 300,   u: '€/an',    maj: '—',          src: 'Fonction publique — 300 € max (barème progressif 100/200/300 € selon jours d\'usage, inchangé)' },
    tc_prise_charge:  { v: 0.50,   u: '',        maj: '—',          src: '50 % abonnement TC obligatoire' },

    /* ----- Titres-restaurant ----- */
    tr_exo_max:       { v: 7.32,   u: '€/titre', maj: '2026-01-01', src: 'LFSS 2026 art. L131-4 — plafond exonération URSSAF' },

    /* ----- Saisie sur salaire ----- */
    saisie_majoration_charge:  { v: 145.00, u: '€/mois', maj: '2026-01-01', src: 'Décret n°2025-1299 du 24/12/2025 — art. R3252-3 CT (1 740 €/an ÷ 12)' },
    saisie_solde_insaisissable:{ v: 651.69, u: '€', maj: '2026-04-01', src: 'Décret n°2026-220 du 30/03/2026 — RSA socle 1 pers.' },

    /* ----- Avantages en nature ----- */
    avantage_repas:   { v: 5.50,   u: '€',       maj: '2026-01-01', src: 'forfait URSSAF avantage nature repas 2026 (était 5,45 € en 2025) — distinct du MG 4,35 € utilisé en HCR' },

    /* ----- Épargne salariale (PASS-indexé) ----- */
    pee_abondement_max:{ v: 3844.8,u: '€/an',    maj: '2026-01-01', src: '8 % PASS — PEE' },
    perco_abondement_max:{ v: 7689.6,u:'€/an',   maj: '2026-01-01', src: '16 % PASS — PERCO/PER collectif' },

    /* ----- Invalidité (revalorisées +0,8 % au 1er avril 2026 — confirmées) ----- */
    invalidite_plancher:{ v: 338.31, u: '€/mois',  maj: '2026-04-01', src: 'pension minimale cat. 1/2 : 335,62 € +0,8 % au 1er avr. 2026 = 338,31 € (instruction DSS/2A/2026/36 du 26/03/2026 ; service-public.fr / ameli.fr) — en vigueur jusqu\'au 31 mars 2027' },
    invalidite_mtp:   { v: 1298.44, u: '€/mois',  maj: '2026-04-01', src: 'majoration tierce personne (MTP) régime général — +0,8 % au 1er avr. 2026 (instruction DSS/2A/2026/36 ; service-public.fr F36489). NB : la MTP des fonctionnaires (CNRACL/SRE) est distincte (1 376 €/mois)' },

    /* ----- Proche aidant / AJPA ----- */
    forfait_hospitalier:  { v: 23,     u: '€/jour', maj: '2026-03-01', src: 'Arrêté du 27/02/2026 (17 € psychiatrie)' },
    ajpa_jour:        { v: 66.64,  u: '€/jour',  maj: '2026-01-01', src: 'pour-les-personnes-agees.gouv.fr — tarif journalier 2026' },
    ajpa_demi:        { v: 33.32,  u: '€/demi-journée', maj: '2026-01-01', src: 'pour-les-personnes-agees.gouv.fr — demi-journée 2026' },

    /* ----- Parentalité ----- */
    prepare_taux_plein:{ v: 459.69,u: '€/mois',  maj: '2026-04-01', src: 'Taux plein — barème officiel caf.fr (Barème Prestation partagée d\'éducation de l\'enfant), en vigueur au 1er avril 2026. Ancienne valeur 455 € corrigée le 16/07/2026. Autres montants du barème : PreParE majorée 751,39 € ; activité ≤ 50 % : 297,17 € ; activité > 50-80 % : 171,42 €' },
    affiliation_maternite:{ v: 6,  u: 'mois',    maj: '2023-12-23', src: 'décret 2023-1410 (était 10 mois)' },

    /* ----- Anciennetés & délais clés (Code du travail) ----- */
    ill_seuil:        { v: 8,      u: 'mois',    maj: '—',          src: 'ouverture droit indemnité légale licenciement' },
    participation_anciennete_max:{ v: 3, u: 'mois', maj: '—',       src: 'ancienneté max exigible (Art. L3342-1)' },
    csg_crds_chomage: { v: 6.7,    u: '%',       maj: '—',          src: 'CSG 6,2 % + CRDS 0,5 %' }
  };


  /* ──────────────────────────────────────────────────────────────────────
     2bis) FORMULES PARTAGÉES — textes répétés dans plusieurs modules
     Modifier ici met à jour TOUS les modules qui les utilisent.
     Usage : <span data-txt="disclaimer"></span> ou SH.txt('disclaimer')
     ────────────────────────────────────────────────────────────────────── */
  var TEXTES = {
    disclaimer:        "Outil indicatif et pédagogique — tous les résultats sont fournis à titre indicatif uniquement et ne constituent pas un avis juridique, fiscal ou comptable.",
    disclaimer_court:  "À titre indicatif — outil pédagogique, pas un avis juridique.",
    disclaimer_fiscal: "Estimations à titre indicatif uniquement — ni avis fiscal, ni avis juridique. Consultez un professionnel.",
    disclaimer_suivi:  "Outil pédagogique pour ton suivi personnel — résultats indicatifs, non opposables.",
    mention_calculs:   "À titre indicatif",
    mention_montant:   "montant indicatif",
    ccn_differente:    "Ta convention collective peut prévoir des règles différentes.",
    ccn_favorable:     "Ta convention collective peut prévoir des conditions plus favorables.",
    ccn_court:         "Ta convention peut être plus favorable.",
    vie_privee:        "🔄 Tout reste sur ton appareil — aucune donnée n'est envoyée.",
    vie_privee_court:  "Tout reste sur ton appareil.",
    saisir_situation:  "Saisis ta situation ci-dessous.",
    renseigne_situation:"Renseigne ta situation ci-dessous.",
    label_salaire_brut:"Salaire brut mensuel de référence",
    label_anciennete:  "Ancienneté dans l'entreprise",
    label_anciennete_a:"Ancienneté (années complètes)",
    label_categorie_tam:"Technicien / Agent de maîtrise",
    protection_licenciement:"Protection contre le licenciement"
  };

  /* ──────────────────────────────────────────────────────────────────────
     2) ARTICLES DE LOI  — référence officielle + texte explicatif
     Clé = numéro sans "Art." (ex: "L1234-1"). code: "CT" ou "CSS".
     ────────────────────────────────────────────────────────────────────── */
  var ARTICLES = {

    /* ----- Rupture du contrat / préavis / licenciement ----- */
    'L1234-1':  { code:'CT', titre:'Préavis de licenciement',
      texte:"Fixe les durées légales minimales de préavis de licenciement selon l'ancienneté : aucun préavis légal avant 6 mois, 1 mois entre 6 mois et 2 ans, 2 mois au-delà de 2 ans. La convention collective peut prévoir des durées plus favorables." },
    'L1234-9':  { code:'CT', titre:'Indemnité légale de licenciement',
      texte:"Ouvre le droit à l'indemnité légale de licenciement dès 8 mois d'ancienneté ininterrompue (sauf faute grave ou lourde)." },
    'L1237-1':  { code:'CT', titre:'Préavis de démission',
      texte:"Le préavis de démission n'est pas fixé par la loi de manière générale : il résulte de la convention collective, des usages ou du contrat de travail." },
    'L1237-10': { code:'CT', titre:'Départ volontaire à la retraite — préavis',
      texte:"Le salarié qui part volontairement à la retraite respecte un préavis équivalent à celui du licenciement (1 mois entre 6 mois et 2 ans d'ancienneté, 2 mois au-delà)." },
    'L1237-9':  { code:'CT', titre:'Départ volontaire à la retraite — indemnité',
      texte:"Ouvre droit à une indemnité de départ à la retraite dont le taux varie selon l'ancienneté (montant/modalités fixés par voie réglementaire) — distincte du préavis (voir L1237-10)." },
    'L1237-11': { code:'CT', titre:'Rupture conventionnelle — principe',
      texte:"Définit la rupture conventionnelle : rupture d'un commun accord du CDI, exclusive de la démission et du licenciement, soumise à homologation." },
    'L1237-13': { code:'CT', titre:'Rupture conventionnelle — indemnité et délais',
      texte:"Fixe l'indemnité spécifique de rupture conventionnelle (au moins égale à l'indemnité légale de licenciement) et le délai de rétractation de 15 jours calendaires." },
    'L1237-14': { code:'CT', titre:'Rupture conventionnelle — homologation',
      texte:"Organise la procédure d'homologation par la DREETS : délai d'instruction de 15 jours ouvrables, homologation tacite à défaut de réponse." },
    'L1237-6': { code:'CT', titre:'Mise à la retraite — préavis employeur',
      texte:"L'employeur qui décide une mise à la retraite respecte un préavis dont la durée est déterminée conformément à l'article L1234-1 (comme pour un licenciement)." },

    /* ----- Maladie / inaptitude / AT-MP ----- */
    'L1225-1':  { code:'CT', titre:'Protection de la grossesse',
      texte:"Interdit à l'employeur de prendre en compte l'état de grossesse pour refuser une embauche, rompre le contrat ou muter la salariée." },
    'L1225-54': { code:'CT', titre:'Congé parental — ancienneté',
      texte:"Pendant le congé parental d'éducation à temps plein, la durée du congé est prise en compte pour moitié dans la détermination des droits liés à l'ancienneté." },
    'L1226-1':  { code:'CT', titre:'Maintien de salaire en cas de maladie',
      texte:"Garantit, sous conditions d'ancienneté (1 an) et d'affiliation, un maintien partiel de salaire par l'employeur en complément des IJSS." },
    'L1226-14': { code:'CT', titre:'Inaptitude d\'origine professionnelle — indemnités',
      texte:"En cas d'inaptitude consécutive à un AT/MP et d'impossibilité de reclassement, prévoit une indemnité spéciale de licenciement (doublée) et l'indemnité compensatrice." },
    'D1226-1':  { code:'CT', titre:'Maintien de salaire — barème',
      texte:"Détaille le barème de maintien de salaire employeur (pourcentages et durées selon l'ancienneté)." },
    'D1226-3':  { code:'CT', titre:'Délai de carence employeur',
      texte:"Fixe le délai de carence de 7 jours avant le début du maintien de salaire par l'employeur. La convention collective peut le réduire ou le supprimer." },
    'R4624-31': { code:'CT', titre:'Visite de reprise',
      texte:"Organise la visite médicale de reprise après absence : obligatoire après plus de 60 jours (maladie/accident non pro), 30 jours (AT), ou sans condition de durée (MP) — décret 2022-372." },
    'R4624-46': { code:'CT', titre:'Dossier médical en santé au travail',
      texte:"Le DMST est constitué et conservé par le service de prévention et de santé au travail (SPST), pendant au moins 40 ans." },

    /* ----- Sécurité sociale (IJSS / invalidité / AT-MP) ----- */
    'R351-12':  { code:'CSS', titre:'Validation de trimestres — maladie',
      texte:"60 jours d'arrêt indemnisés (non nécessairement consécutifs) permettent de valider un trimestre d'assurance vieillesse." },
    'L341-1':   { code:'CSS', titre:'Pension d\'invalidité — ouverture',
      texte:"Ouvre droit à pension d'invalidité pour l'assuré présentant une réduction de capacité de travail ou de gain d'au moins deux tiers." },
    'L341-4':   { code:'CSS', titre:'Catégories d\'invalidité',
      texte:"Définit les 3 catégories d'invalidité : cat. 1 (capable d'exercer une activité rémunérée), cat. 2 (incapable), cat. 3 (incapable + besoin d'assistance d'une tierce personne)." },
    'R341-4':   { code:'CSS', titre:'Pension d\'invalidité — plafonds et salaire de comparaison',
      texte:"Définit le salaire annuel moyen (SAM) et les plafonds catégoriels de la pension d'invalidité (confirmé par l'instruction interministérielle DSS/2A/2026/36 du 26/03/2026)." },
    'R341-6':   { code:'CSS', titre:'Majoration pour tierce personne (MTP)',
      texte:"Fixe le montant de la majoration pour tierce personne (MTP), versée en catégorie 3, revalorisé chaque 1er avril (confirmé par l'instruction DSS/2A/2026/36)." },
    'L341-3':   { code:'CSS', titre:'Invalidité — moment d\'appréciation',
      texte:"Précise le moment où l'état d'invalidité est apprécié (consolidation, expiration des IJ, stabilisation, ou constatation médicale selon les cas), en tenant compte de la capacité de travail restante et de la situation de l'assuré." },
    'L431-1':   { code:'CSS', titre:'Prestations AT/MP',
      texte:"Énumère les prestations dues en cas d'accident du travail ou de maladie professionnelle (soins, indemnités journalières, rente)." },
    'L441-1':   { code:'CSS', titre:'Déclaration d\'accident du travail',
      texte:"La victime informe l'employeur (principe posé par L441-1 ; délai précis de 24 h fixé par l'article réglementaire R441-1). L'employeur déclare ensuite l'AT à la CPAM (principe posé par L441-2 ; délai précis de 48 h fixé par R441-3)." },
    'L461-1':   { code:'CSS', titre:'Maladies professionnelles',
      texte:"Définit la maladie professionnelle (présomption d'origine via les tableaux). Délai de déclaration : 2 ans à compter de la cessation d'activité ou du certificat médical." },

    /* ----- Durée du travail / repos / congés ----- */
    'L3121-16': { code:'CT', titre:'Pause obligatoire',
      texte:"Dès que le temps de travail quotidien atteint 6 heures, le salarié bénéficie d'une pause d'au moins 20 minutes consécutives." },
    'L3121-18': { code:'CT', titre:'Durée quotidienne maximale',
      texte:"La durée quotidienne de travail effectif ne peut excéder 10 heures (dérogations possibles)." },
    'L3121-20': { code:'CT', titre:'Durée hebdomadaire maximale absolue',
      texte:"La durée hebdomadaire de travail ne peut dépasser 48 heures sur une même semaine." },
    'L3121-22': { code:'CT', titre:'Durée hebdomadaire moyenne maximale',
      texte:"La durée hebdomadaire moyenne calculée sur 12 semaines consécutives ne peut dépasser 44 heures." },
    'L3121-27': { code:'CT', titre:'Durée légale du travail',
      texte:"La durée légale de travail effectif est fixée à 35 heures par semaine." },
    'L3121-50': { code:'CT', titre:'Heures perdues récupérables',
      texte:"Seules les heures perdues en deçà de la durée légale, à la suite d'une interruption collective du travail (cause accidentelle, intempéries, force majeure, inventaire ou pont entre un jour férié et un jour de repos), peuvent être récupérées dans les 12 mois." },
    'L3131-1':  { code:'CT', titre:'Repos quotidien',
      texte:"Tout salarié bénéficie d'un repos quotidien d'au moins 11 heures consécutives." },
    'L3132-1':  { code:'CT', titre:'Repos hebdomadaire — interdiction',
      texte:"Il est interdit de faire travailler un salarié plus de 6 jours par semaine." },
    'L3132-2':  { code:'CT', titre:'Repos hebdomadaire — durée',
      texte:"Le repos hebdomadaire a une durée minimale de 24 heures consécutives, s'ajoutant aux 11 heures de repos quotidien (soit 35 heures)." },
    'L3133-1':  { code:'CT', titre:'Liste des jours fériés',
      texte:"Énumère les 11 jours fériés légaux. La loi fixe la liste mais n'impose pas qu'ils soient chômés (sauf le 1er mai)." },
    'L3133-3':  { code:'CT', titre:'Maintien de salaire — jours fériés',
      texte:"Le chômage des jours fériés ne peut entraîner aucune perte de salaire pour les salariés totalisant au moins 3 mois d'ancienneté. Sans cette ancienneté, la convention collective peut prévoir des règles plus favorables." },
    'L3133-4':  { code:'CT', titre:'1er mai chômé et payé',
      texte:"Le 1er mai est le seul jour férié obligatoirement chômé et payé pour tous les salariés." },
    'L3133-7':  { code:'CT', titre:'Journée de solidarité',
      texte:"Institue la journée de solidarité destinée au financement de l'autonomie des personnes âgées et handicapées : une journée supplémentaire de travail, en principe non rémunérée, dans la limite de 7 heures (proratisée pour les temps partiels)." },

    /* ----- CSE / représentation / délégation ----- */
    'L2143-13': { code:'CT', titre:'Heures de délégation du délégué syndical',
      texte:"Fixe le crédit d'heures du délégué syndical : 12 h/mois (50 à 150 salariés), 18 h/mois (151 à 499), 24 h/mois (500 et plus)." },
    'L2315-7':  { code:'CT', titre:'Heures de délégation des membres du CSE',
      texte:"Détermine le crédit d'heures des élus titulaires du CSE selon l'effectif (à partir de 18 h/mois pour 50-74 salariés)." },
    'R2314-1':  { code:'CT', titre:'Barème des heures de délégation des titulaires du CSE',
      texte:"Fixe le crédit d'heures mensuel par titulaire selon l'effectif : 10 h (11-49), 18 h (50-74), 19 h (75-99), 21 h (100-199), 22 h (200-499), 24 h (500-1499), puis 26 h et plus au-delà." },
    'R2315-5':  { code:'CT', titre:'Report et mutualisation des heures',
      texte:"Autorise le report des heures de délégation non utilisées dans la limite de l'année civile (12 mois) et leur mutualisation entre élus, dans la limite de 1,5 fois le crédit mensuel." },
    'L2311-2':  { code:'CT', titre:'Seuil de mise en place du CSE',
      texte:"Le comité social et économique est obligatoire dans les entreprises d'au moins 11 salariés (sur 12 mois consécutifs)." },
    'L2314-1':  { code:'CT', titre:'Composition du CSE & référent harcèlement',
      texte:"Le CSE comprend l'employeur et une délégation du personnel élue. Parmi ses membres, le CSE désigne un référent en matière de lutte contre le harcèlement sexuel et les agissements sexistes." },
    'L2314-33': { code:'CT', titre:'Durée des mandats des élus',
      texte:"Fixe la durée des mandats des élus du CSE (4 ans, réductible à 2 ou 3 ans par accord). La loi n°2025-989 du 24 octobre 2025 a supprimé la limite de trois mandats successifs, dans toutes les entreprises." },

    /* ----- CDD / précarité ----- */
    'L1242-6':  { code:'CT', titre:'Cas de recours au CDD',
      texte:"Énumère limitativement les cas de recours au CDD (remplacement, accroissement temporaire, emploi saisonnier…)." },
    'L1243-8':  { code:'CT', titre:'Prime de précarité — principe',
      texte:"À la fin d'un CDD, une indemnité de fin de contrat égale à 10 % de la rémunération totale brute est versée (sauf exceptions)." },
    'L1243-10': { code:'CT', titre:'Prime de précarité — exclusions',
      texte:"Exclut le versement de la prime de précarité dans certains cas : CDD saisonnier, CDD senior, refus d'un CDI sur le même emploi, contrats aidés, jobs étudiants pendant les vacances scolaires." },

    /* ----- Disciplinaire / mise à pied ----- */
    'L1332-1':  { code:'CT', titre:'Procédure disciplinaire',
      texte:"Aucune sanction ne peut être prise sans procédure : convocation, entretien, notification motivée." },
    'L1332-2':  { code:'CT', titre:'Entretien préalable à sanction',
      texte:"Encadre l'entretien préalable et les délais de notification de la sanction (entre 2 jours ouvrables et 1 mois après l'entretien)." },
    'L1332-4':  { code:'CT', titre:'Prescription des faits fautifs',
      texte:"Aucun fait fautif ne peut donner lieu à sanction au-delà de 2 mois après que l'employeur en a eu connaissance." },

    /* ----- Congés familiaux / proche aidant ----- */
    'L3142-16': { code:'CT', titre:'Congé de proche aidant',
      texte:"Ouvre le congé de proche aidant, accessible sans condition d'ancienneté, pour s'occuper d'une personne en perte d'autonomie ou en situation de handicap." },
    'L3142-19': { code:'CT', titre:'Durée du congé de proche aidant',
      texte:"Le congé de proche aidant est de 3 mois renouvelables, dans la limite d'un an sur l'ensemble de la carrière." },

    /* ----- CET / épargne / participation ----- */
    'L3151-1':  { code:'CT', titre:'Compte épargne-temps',
      texte:"Le CET permet au salarié d'accumuler des droits à congé rémunéré ou de se constituer une épargne, alimenté par des jours de repos ou des sommes." },
    'L3322-1':  { code:'CT', titre:'Participation aux résultats',
      texte:"Rend la participation obligatoire dans les entreprises d'au moins 50 salariés." },
    'L3342-1':  { code:'CT', titre:'Ancienneté pour l\'épargne salariale',
      texte:"L'accord peut subordonner le bénéfice de la participation/intéressement à une ancienneté qui ne peut excéder 3 mois." },

    /* ----- Formation ----- */
    'L6315-1':  { code:'CT', titre:'Entretien professionnel',
      texte:"L'entretien professionnel a lieu tous les 2 ans ; un état des lieux récapitulatif est réalisé tous les 6 ans (soit 3 entretiens + le bilan)." },
    'L6323-1':  { code:'CT', titre:'Compte personnel de formation',
      texte:"Définit le CPF, alimenté en euros, mobilisable par le titulaire pour financer une formation certifiante (organisme Qualiopi)." },
    'L6211-1':  { code:'CT', titre:'Contrat d\'apprentissage',
      texte:"Définit le contrat d'apprentissage, alternant formation en CFA et travail en entreprise." },

    /* ----- Grève / mobilités / divers ----- */
    'L2511-1':  { code:'CT', titre:'Exercice du droit de grève',
      texte:"La grève ne rompt pas le contrat de travail (sauf faute lourde) et ne peut justifier ni sanction ni licenciement. Dans le privé, la retenue sur salaire doit être strictement proportionnelle au temps non travaillé." },
    'L3261-3-1':{ code:'CT', titre:'Forfait mobilités durables',
      texte:"Permet à l'employeur de prendre en charge les frais de trajet domicile-travail en modes durables (vélo, covoiturage…), exonéré dans la limite des plafonds réglementaires." },
    'L1222-9':  { code:'CT', titre:'Télétravail',
      texte:"Encadre le télétravail mis en place par accord collectif ou charte ; à défaut, par accord entre salarié et employeur." },
    'L1471-1':  { code:'CT', titre:'Prescription de l\'action sur le contrat',
      texte:"Fixe les délais de prescription des actions portant sur l'exécution ou la rupture du contrat de travail." },
    /* ===== Articles ajoutés (branchement complet des 54 modules) ===== */

    /* --- Durée du travail (compléments) --- */
    'L3121-9':  { code:'CT', titre:'Astreinte — définition',
      texte:"Définit l'astreinte : période pendant laquelle le salarié, sans être à disposition permanente, doit pouvoir intervenir pour l'entreprise. Seul le temps d'intervention est du travail effectif." },
    'L3121-11': { code:'CT', titre:'Astreinte — mise en place',
      texte:"L'astreinte est mise en place par accord collectif ou, à défaut, par l'employeur après avis du CSE et information de l'inspection du travail." },
    'L3121-12': { code:'CT', titre:'Astreinte — suivi',
      texte:"L'employeur remet au salarié un document récapitulant le nombre d'heures d'astreinte et la compensation correspondante. Conservé 1 an." },
    'L3121-30': { code:'CT', titre:'Contingent annuel d\'heures supplémentaires',
      texte:"Fixe le contingent annuel d'heures supplémentaires (220 h par défaut légal). Un accord peut prévoir un autre volume." },
    'L3121-33': { code:'CT', titre:'Repos compensateur de remplacement',
      texte:"Permet de remplacer le paiement des heures supplémentaires par un repos compensateur équivalent, par accord collectif." },
    'L3121-36': { code:'CT', titre:'Majoration des heures supplémentaires',
      texte:"Fixe les taux légaux de majoration : +25 % pour les 8 premières heures supplémentaires, +50 % au-delà (sauf accord prévoyant des taux différents, minimum 10 %)." },
    'L3121-41': { code:'CT', titre:'Aménagement du temps sur l\'année',
      texte:"Autorise l'aménagement du temps de travail sur une période supérieure à la semaine (annualisation) par accord collectif." },
    'L3121-45':{ code:'CT', titre:'Modulation — répartition sur plusieurs semaines à défaut d\'accord',
      texte:"En l'absence d'accord, l'employeur peut organiser la durée du travail sur plusieurs semaines dans la limite de 9 semaines (entreprises de moins de 50 salariés) ou 4 semaines (50 salariés et plus)." },
    'L3121-47': { code:'CT', titre:'Modulation — délai de prévenance à défaut d\'accord',
      texte:"À défaut de stipulations dans l'accord de modulation, le délai de prévenance des salariés en cas de changement de durée ou d'horaires de travail est fixé à 7 jours." },
    'L3122-2':  { code:'CT', titre:'Travail de nuit — définition',
      texte:"Définit le travail de nuit (tout travail entre 21 h et 6 h) et la plage horaire de référence." },
    'L3122-5':  { code:'CT', titre:'Travailleur de nuit — statut',
      texte:"Est travailleur de nuit le salarié accomplissant au moins 3 h de nuit 2 fois par semaine, ou un nombre minimal d'heures de nuit sur l'année. Ouvre des contreparties." },
    'L3122-6':  { code:'CT', titre:'Durée maximale du travail de nuit',
      texte:"La durée quotidienne du travail de nuit ne peut dépasser 8 h, et la durée hebdomadaire moyenne 40 h (dérogations possibles par accord)." },
    'L3122-20': { code:'CT', titre:'Période de travail de nuit',
      texte:"Fixe la période de travail de nuit (par défaut 21 h - 6 h), modifiable par accord collectif." },
    'L3132-3':  { code:'CT', titre:'Repos dominical',
      texte:"Pose le principe du repos hebdomadaire donné le dimanche, avec de nombreuses dérogations encadrées." },

    /* --- Période d'essai --- */
    'L1221-25': { code:'CT', titre:'Délai de prévenance — rupture période d\'essai',
      texte:"Fixe le délai de prévenance à respecter pour rompre la période d'essai (de 24 h à 1 mois selon la durée de présence)." },

    /* --- Télétravail --- */
    'L1222-11': { code:'CT', titre:'Télétravail en circonstances exceptionnelles',
      texte:"En cas de circonstances exceptionnelles (épidémie, force majeure), le télétravail peut être imposé comme aménagement du poste, sans accord préalable." },

    /* --- Maternité / parentalité --- */
    'L1225-55': { code:'CT', titre:'Garantie d\'emploi au retour — congé parental',
      texte:"À l'issue du congé parental d'éducation (ou du temps partiel associé), le salarié retrouve son précédent emploi ou un emploi similaire à rémunération au moins équivalente." },
    'L1225-25': { code:'CT', titre:'Garantie d\'emploi au retour — congé maternité',
      texte:"À l'issue du congé de maternité, la salariée retrouve son précédent emploi (en priorité) ou, à défaut, un emploi similaire à rémunération au moins équivalente." },
    'L1225-65': { code:'CT', titre:'Congé de présence parentale — ancienneté',
      texte:"Pendant le congé de présence parentale, la durée du congé est prise en compte en totalité pour les droits liés à l'ancienneté ; le salarié conserve le bénéfice des avantages acquis avant le congé." },
    'L331-3':   { code:'CSS', titre:'Conditions d\'indemnisation maternité',
      texte:"Fixe les conditions d'ouverture des IJ maternité : affiliation minimale (6 mois), seuil de cotisation ou d'heures travaillées." },

    /* --- Inaptitude --- */
    'L1226-22': { code:'CT', titre:'Reclassement et inaptitude',
      texte:"Encadre l'obligation de reclassement de l'employeur après déclaration d'inaptitude et les conditions de rupture si le reclassement est impossible." },

    /* --- Solde de tout compte / documents de fin --- */
    'L1234-19': { code:'CT', titre:'Certificat de travail',
      texte:"L'employeur remet obligatoirement un certificat de travail à l'expiration du contrat, quelle qu'en soit la cause." },
    'L1234-20': { code:'CT', titre:'Reçu pour solde de tout compte',
      texte:"Le reçu pour solde de tout compte fait l'inventaire des sommes versées. S'il est signé, il ne peut être dénoncé que dans les 6 mois ; non signé, il n'a aucun effet libératoire (3 ans pour réclamer)." },
    'L1237-18': { code:'CT', titre:'Attestation France Travail',
      texte:"L'employeur remet l'attestation destinée à France Travail (ex-Pôle emploi) permettant le calcul des droits au chômage." },

    /* --- Rupture conventionnelle (compléments) --- */
    'L1237-19': { code:'CT', titre:'Rupture conventionnelle collective — accord',
      texte:"Permet de définir, par accord collectif, le cadre d'une rupture conventionnelle collective (nombre de départs, critères, mesures d'accompagnement)." },
    'L1237-19-4':{ code:'CT', titre:'RCC — suivi et contrôle',
      texte:"Organise le suivi de la mise en œuvre de l'accord de rupture conventionnelle collective et le contrôle de la DREETS." },

    /* --- CDD / intérim / grève --- */
    'D1242-1':  { code:'CT', titre:'CDD d\'usage — secteurs',
      texte:"Liste les secteurs d'activité dans lesquels il est d'usage constant de ne pas recourir au CDI (CDD d'usage)." },
    'L1251-10': { code:'CT', titre:'Interdiction de remplacer un gréviste',
      texte:"Interdit le recours à l'intérim (et au CDD) pour remplacer un salarié dont le contrat est suspendu par une grève." },
    'L2512-5':  { code:'CT', titre:'Service minimum — service public',
      texte:"Encadre, dans les services publics, l'organisation d'un service minimum et les obligations de préavis." },

    /* --- Cumul emploi-retraite --- */
    'L161-22':  { code:'CSS', titre:'Cumul emploi-retraite',
      texte:"Pose le principe du cumul emploi-retraite et ses conditions (cumul intégral si retraite à taux plein et toutes pensions liquidées ; sinon plafonné)." },

    /* --- Représentation / CSE / délégation (compléments) --- */
    'L2141-5': { code:'CT', titre:'Non-discrimination syndicale',
      texte:"Interdit toute discrimination en raison de l'exercice d'un mandat ou d'une activité syndicale ; sanction pénale possible." },
    'L2242-1': { code:'CT', titre:'Négociation annuelle obligatoire',
      texte:"Impose dans les entreprises pourvues de délégués syndicaux une négociation annuelle (rémunérations, temps de travail, égalité professionnelle)." },
    'L2242-20':{ code:'CT', titre:'GEPP — gestion des emplois et parcours',
      texte:"Prévoit la négociation sur la gestion des emplois et des parcours professionnels (anticipation des évolutions, mobilités, formation)." },
    'L2312-8': { code:'CT', titre:'Attributions générales du CSE',
      texte:"Définit les attributions du CSE : expression collective des salariés, prise en compte des intérêts dans les décisions, santé-sécurité." },
    'L2312-24':{ code:'CT', titre:'Consultation sur les orientations stratégiques',
      texte:"Le CSE est consulté sur les orientations stratégiques de l'entreprise et leurs conséquences (emploi, formation)." },
    'L2312-28':{ code:'CT', titre:'Consultation sur la politique sociale',
      texte:"Le CSE est consulté chaque année sur la politique sociale, les conditions de travail et l'emploi." },
    'L2312-36':{ code:'CT', titre:'BDESE',
      texte:"Définit la base de données économiques, sociales et environnementales (BDESE) mise à disposition du CSE." },
    'L2313-7': { code:'CT', titre:'CSE central et d\'établissement',
      texte:"Organise, dans les entreprises à établissements multiples, la mise en place d'un CSE central et de CSE d'établissement." },
    'L2315-10':{ code:'CT', titre:'Heures de délégation — paiement',
      texte:"Les heures de délégation sont payées à l'échéance normale comme du temps de travail ; l'employeur ne peut pas les déduire du salaire." },
    'L2315-14':{ code:'CT', titre:'Liberté de déplacement des élus',
      texte:"Les représentants du personnel peuvent se déplacer dans et hors de l'entreprise et circuler librement, dans des limites ne perturbant pas le travail." },
    'L2315-36':{ code:'CT', titre:'CSSCT — commission santé-sécurité',
      texte:"Rend obligatoire la commission santé, sécurité et conditions de travail (CSSCT) dans les entreprises d'au moins 300 salariés." },
    'L2315-78':{ code:'CT', titre:'Expertise du CSE',
      texte:"Permet au CSE de recourir à une expertise (économique, sociale, risque grave), financée selon les cas par l'entreprise." },
    'L2411-1': { code:'CT', titre:'Salariés protégés',
      texte:"Liste les salariés protégés (représentants du personnel) dont le licenciement est soumis à autorisation de l'inspection du travail." },

    /* --- Effectifs / obligations entreprise --- */
    'L1153-5-1':{ code:'CT', titre:'Référent harcèlement sexuel',
      texte:"Impose la désignation d'un référent chargé de l'orientation, de l'information et de l'accompagnement en matière de lutte contre le harcèlement sexuel." },
    'L1214-8-2':{ code:'transports', titre:'Plan de mobilité employeur',
      texte:"Oblige certaines entreprises à intégrer un plan de mobilité pour optimiser les déplacements domicile-travail (covoiturage, TC, vélo)." },
    'L225-102-1':{ code:'com.', titre:'Déclaration de performance extra-financière',
      texte:"Impose à certaines sociétés une déclaration de performance extra-financière (impacts environnementaux, sociaux, gouvernance)." },
    'L4622-1': { code:'CT', titre:'Service de prévention et de santé au travail',
      texte:"Définit les missions du SPST : visites d'embauche, périodiques et à la demande, conseil en prévention." },
    'L5212-1': { code:'CT', titre:'Obligation d\'emploi des travailleurs handicapés',
      texte:"Impose aux entreprises d'au moins 20 salariés d'employer 6 % de travailleurs handicapés (déclaration DOETH, contribution si non atteint)." },
    'R4121-1': { code:'CT', titre:'Document unique (DUERP)',
      texte:"Rend obligatoire le document unique d'évaluation des risques professionnels, mis à jour après tout accident ou changement des conditions de travail." },
    'D4711-1': { code:'CT', titre:'Affichages obligatoires',
      texte:"Liste les informations obligatoirement portées à la connaissance des salariés (inspection du travail, médecine du travail, harcèlement…)." },

    /* --- Égalité professionnelle --- */
    'L1142-7': { code:'CT', titre:'Index égalité femmes-hommes',
      texte:"Impose aux entreprises d'au moins 50 salariés de mesurer et publier chaque année un index de l'égalité professionnelle (Loi Avenir 2018)." },
    'L1142-9': { code:'CT', titre:'Mesures de correction des écarts',
      texte:"Oblige, en cas d'index insuffisant, à mettre en œuvre des mesures de correction des écarts de rémunération dans un délai de 3 ans." },

    /* --- Activité partielle --- */
    'L5122-1': { code:'CT', titre:'Activité partielle',
      texte:"Définit l'activité partielle : réduction ou suspension d'activité indemnisée, l'employeur percevant une allocation de l'État. Taux dérogatoires possibles en cas de crise." },

    /* --- Sabbatique / congés longs --- */
    'L3142-28':{ code:'CT', titre:'Congé sabbatique — durée',
      texte:"Fixe la durée du congé sabbatique à défaut d'accord : entre 6 mois minimum et 11 mois maximum." },
    'L3142-27':{ code:'CT', titre:'Congé (proche aidant/présence parentale) — durée à défaut d\'accord',
      texte:"À défaut d'accord, fixe la durée maximale du congé à 3 mois, renouvelable dans la limite mentionnée à l'article L3142-19 (durée du congé de proche aidant)." },
    'L3142-28':{ code:'CT', titre:'Congé sabbatique — délai entre deux',
      texte:"Le salarié ne doit pas avoir bénéficié, dans les 6 années précédentes, d'un congé sabbatique, d'un congé pour création d'entreprise ou d'un CPF de transition d'au moins 6 mois." },
    'L3142-40':{ code:'CT', titre:'Congé création d\'entreprise',
      texte:"Encadre le congé pour création ou reprise d'entreprise ; l'obligation de loyauté envers l'employeur demeure pendant le congé." },

    /* --- CET (compléments) --- */
    'L3152-4':{ code:'CT', titre:'CET — financement retraite et garantie',
      texte:"Prévoit que les droits du CET peuvent être utilisés pour financer des prestations de retraite collectives, ou (au-delà d'un plafond) donnent lieu à un dispositif d'assurance/garantie ou à une indemnité de conversion monétaire. (Remplace l'ancien L3153-3, abrogé en 2016.)" },
    'L3152-2':{ code:'CT', titre:'CET — liquidation et transfert des droits',
      texte:"La convention ou l'accord collectif définit les modalités de gestion du CET et détermine les conditions d'utilisation, de liquidation et de transfert des droits d'un employeur à un autre. (Remplace l'ancien L3154-3, abrogé en 2016.)" },

    /* --- Épargne salariale (compléments) --- */
    'L3311-1': { code:'CT', titre:'Intéressement — principe',
      texte:"Définit l'intéressement, dispositif facultatif d'épargne salariale lié aux résultats ou performances, mis en place par accord." },
    'L3333-6': { code:'CT', titre:'PEI — plan d\'épargne interentreprises',
      texte:"Encadre le plan d'épargne interentreprises et les conditions d'abondement (Loi Pacte)." },
    /* Ajouté le 23/07/2026 : module-cet.html citait 'L3334-8-1', qui n'existe pas
       au corpus (la section s'arrête à L3334-8, sans sous-numérotation). Le
       libellé a été corrigé, cet article manquait au référentiel. Titre repris
       du libellé de la page ; le texte explicatif reste à compléter si tu veux
       l'exposer via data-loi. */
    'L3334-8': { code:'CT', titre:'Transfert de droits CET vers un plan d\'épargne retraite',
      texte:"" },

    /* --- Invalidité (compléments) --- */
    'L341-12':  { code:'CSS', titre:'Cumul pension d\'invalidité et revenus',
      texte:"Le service de la pension peut être suspendu en tout ou partie en cas de reprise du travail, au-delà d'un seuil fixé par décret (depuis le 1/04/2022 : cumul intégral jusqu'au salaire antérieur, puis pension réduite de moitié du dépassement au-delà)." },
    'L341-5':   { code:'CSS', titre:'Pension d\'invalidité — montant minimum',
      texte:"Le montant minimum de la pension d'invalidité, fixé par décret, ne peut être inférieur au montant de l'allocation aux vieux travailleurs salariés." },
    'L341-16': { code:'CSS', titre:'Pension d\'invalidité — révision',
      texte:"Permet la révision, suspension ou suppression de la pension d'invalidité selon l'évolution de l'état de santé ou des revenus." },

    /* --- AT/MP (compléments) --- */
    'L411-1':  { code:'CSS', titre:'Définition de l\'accident du travail',
      texte:"Définit l'accident du travail : accident survenu par le fait ou à l'occasion du travail, quelle qu'en soit la cause." },
    'L452-5':  { code:'CSS', titre:'Faute intentionnelle de l\'employeur',
      texte:"Si l'accident résulte d'une faute intentionnelle de l'employeur (distincte de la faute inexcusable, art. L452-1 à L452-4), la victime conserve le droit d'agir en réparation de droit commun contre l'auteur, pour la part du préjudice non couverte par les prestations. (La majoration de rente et l'indemnisation des préjudices complémentaires en cas de faute INEXCUSABLE relèvent des art. L452-2 et L452-3.)" },
    'L461-7':  { code:'CSS', titre:'Maladies professionnelles — déclaration',
      texte:"Précise les modalités et délais de déclaration et de reconnaissance des maladies professionnelles." },

    /* --- Alternance --- */
    'L6325-8':{ code:'CT', titre:'Contrat de professionnalisation — rémunération',
      texte:"Fixe la rémunération minimale du salarié en contrat de professionnalisation selon l'âge et le niveau de qualification (55 à 100% du SMIC selon les cas ; art. L6325-8 à L6325-10)." },

    /* --- Conservation des documents / paie --- */
    'D242-2':  { code:'CSS', titre:'Assiette des cotisations vieillesse',
      texte:"Précise l'assiette de la cotisation d'assurance vieillesse plafonnée (dans la limite du plafond de la Sécurité sociale)." },
    'D3243-8': { code:'CT', titre:'Conservation du double des bulletins',
      texte:"L'employeur conserve un double des bulletins de paie pendant 5 ans (ou sous forme électronique jusqu'aux 75 ans du salarié)." },
    'L3243-4': { code:'CT', titre:'Remise du bulletin de paie',
      texte:"Rend obligatoire la remise d'un bulletin de paie à chaque versement de la rémunération ; conservation conseillée sans limite par le salarié." },
    'L3171-3': { code:'CT', titre:'Décompte du temps de travail',
      texte:"Impose à l'employeur de tenir un décompte du temps de travail (notamment pour les forfaits jours) et de le tenir à disposition." },
    'D3171-16':{ code:'CT', titre:'Conservation des relevés d\'heures',
      texte:"Fixe à 1 an la durée de conservation des documents de décompte du temps de travail (relevés, pointages). Conseil : 3 ans (prescription salariale)." },
    'L243-16': { code:'CSS', titre:'Justificatifs de cotisations',
      texte:"Précise les obligations de justification et de conservation relatives au versement des cotisations sociales (3 ans)." },
    'R1221-26':{ code:'CT', titre:'Registre unique du personnel',
      texte:"Le registre unique du personnel mentionne les salariés ; les mentions sont conservées 5 ans à compter du départ du salarié." },
    'L441-4':  { code:'CSS', titre:'Registre des accidents bénins',
      texte:"Autorise, sous conditions, la tenue d'un registre des accidents du travail bénins, conservé 5 ans." },
    'R441-3':  { code:'CSS', titre:'Délai de déclaration employeur',
      texte:"La déclaration de l'employeur (art. L441-2) doit être faite dans les 48 heures qui suivent la survenance de l'accident, non compris les dimanches et jours fériés." },
  };

  /* ──────────────────────────────────────────────────────────────────────
     3) HELPERS — l'API que les modules utilisent
     ────────────────────────────────────────────────────────────────────── */

  function _fmtEur(n) {
    // 4005 -> "4 005 €" ; 12.31 -> "12,31 €"
    var s = (Math.round(n * 100) / 100).toString().replace('.', ',');
    // séparateur de milliers (espace insécable fine)
    var parts = s.split(',');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f');
    return parts.join(',') + '\u00a0€';
  }

  function _frDate(iso) {
    if (!iso || iso === '—') return '—';
    var p = iso.split('-');
    if (p.length !== 3) return iso;
    var mois = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
    var jour = parseInt(p[2], 10);
    return (jour === 1 ? '1er' : jour) + ' ' + (mois[parseInt(p[1], 10) - 1] || '') + ' ' + p[0];
  }

  var SH = {
    /* Valeur brute (nombre) : SH.val('smic_h') -> 12.31 */
    val: function (k) {
      var e = VALEURS[k];
      return e ? e.v : null;
    },
    /* Valeur formatée avec son unité : SH.show('smic_h') -> "12,31 €/h" */
    show: function (k) {
      var e = VALEURS[k];
      if (!e) return '?';
      var v = (Math.round(e.v * 100) / 100).toString().replace('.', ',');
      return v + (e.u ? '\u00a0' + e.u : '');
    },
    /* Valeur formatée en euros : SH.eur('pmss') -> "4 005 €" */
    eur: function (k) {
      var e = VALEURS[k];
      return e ? _fmtEur(e.v) : '?';
    },
    /* Date d'effet lisible : SH.maj('ijss_max') -> "1er juillet 2026" */
    maj: function (k) {
      var e = VALEURS[k];
      return e ? _frDate(e.maj) : '—';
    },
    /* Source / note : SH.src('fmd_plafond_seul') */
    src: function (k) {
      var e = VALEURS[k];
      return e ? (e.src || '') : '';
    },
    /* Référence d'article formatée : SH.art('L1234-1') -> "Art. L1234-1 CT" */
    art: function (k) {
      var key = k.replace(/^Art\.?\s*/i, '');
      var a = ARTICLES[key];
      return a ? ('Art. ' + key + ' ' + a.code) : ('Art. ' + key);
    },
    /* Même chose, mais cliquable : SH.artLien('L1234-1')
       -> '<a …>Art. L1234-1 CT</a>' pointant vers le texte officiel.

       À n'utiliser QUE là où le résultat est inséré en HTML (innerHTML,
       littéral de gabarit…). Pour un usage en textContent, garder SH.art(),
       sinon le balisage s'afficherait en clair.

       Si l'article est inconnu du référentiel, ou rattaché à un code que le
       fonds ne couvre pas (transports, commerce), on renvoie le libellé nu :
       mieux vaut pas de lien qu'un lien mort. */
    artLien: function (k) {
      var libelle = SH.art(k);
      var url = legiUrl(k.replace(/^Art\.?\s*/i, ''));
      if (!url) return libelle;
      legiStyle();
      return '<a class="legi-ref" href="' + url + '" target="_blank"' +
             ' rel="noopener nofollow" title="Lire le texte officiel de cet article">' +
             libelle + '</a>';
    },
    /* Référence sans code (pour les plages "X à Y CODE") : SH.artn('L1234-1') -> "Art. L1234-1" */
    artn: function (k) {
      var key = k.replace(/^Art\.?\s*/i, '');
      return 'Art. ' + key;
    },
    /* Titre court de l'article : SH.titre('L1234-1') -> "Préavis de licenciement" */
    titre: function (k) {
      var key = k.replace(/^Art\.?\s*/i, '');
      var a = ARTICLES[key];
      return a ? a.titre : '';
    },
    /* Texte explicatif complet : SH.texte('L1234-1') */
    texte: function (k) {
      var key = k.replace(/^Art\.?\s*/i, '');
      var a = ARTICLES[key];
      return a ? a.texte : '';
    },
    /* Formule partagée : SH.txt('disclaimer') */
    txt: function (k) {
      return TEXTES[k] || '';
    },
    /* Objet complet d'un article (pour usage avancé) */
    article: function (k) {
      var key = k.replace(/^Art\.?\s*/i, '');
      return ARTICLES[key] || null;
    },
    /* Accès direct aux tables (lecture seule conseillée) */
    VALEURS: VALEURS,
    ARTICLES: ARTICLES,
    TEXTES: TEXTES,

    /* Métadonnée : date de dernière révision du référentiel */
    _maj_referentiel: '2026-06-07'
  };


  /* ──────────────────────────────────────────────────────────────────────
     4) AUTO-HYDRATATION DU HTML
     Au chargement de la page, remplit automatiquement les éléments marqués :
       <span data-art="L1234-1"></span>      → "Art. L1234-1 CT"
       <span data-loi="L1234-1"></span>      → texte explicatif complet
       <span data-titre="L1234-1"></span>    → titre court de l'article
       <span data-val="smic_h"></span>       → valeur formatée avec unité (12,31 €/h)
       <span data-eur="pmss"></span>         → valeur en euros (4 005 €)
       <span data-maj="ijss_max"></span>     → date d'effet (1er juillet 2026)
     Ainsi, pour changer un chiffre ou un texte, on ne touche QUE ce fichier.
     ────────────────────────────────────────────────────────────────────── */
  /* ──────────────────────────────────────────────────────────────────────
     Lien vers le texte officiel (MonLegiTexte)
     Les <span data-art="L3121-27"> ne se contentent plus d'afficher
     "Art. L3121-27 CT" : le libellé devient cliquable et ouvre le texte
     intégral. On rend cliquable ce qui est DÉJÀ écrit, sans ajouter de bloc
     "voir le texte" à côté.

     Pourquoi le champ `code` est indispensable : 1442 numéros existent à la
     fois dans le code du travail et dans celui de la sécurité sociale
     (L411-1, L461-1, L441-1…). Le numéro seul ne dirait pas où pointer ;
     c'est `code` ('CT' ou 'CSS'), déjà renseigné article par article dans la
     table ci-dessus, qui tranche.

     Un article absent de la table, ou rattaché à un autre code (transports,
     commerce), reste en texte brut : mieux vaut pas de lien qu'un lien qui
     tombe sur le mauvais texte.
     ────────────────────────────────────────────────────────────────────── */
  var LEGI_BASE = 'https://monlegitexte.heuressupfrance.workers.dev/';
  var LEGI_CORPUS = { CT: '', CSS: '&code=secu' };

  function legiUrl(key) {
    var a = ARTICLES[key];
    if (!a) return null;
    var suffixe = LEGI_CORPUS[a.code];
    if (suffixe === undefined) return null;   /* code non couvert par le fonds */
    return LEGI_BASE + '?art=' + encodeURIComponent(key) + suffixe;
  }

  function legiStyle() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('legi-ref-style')) return;
    var s = document.createElement('style');
    s.id = 'legi-ref-style';
    /* Discret : souligné pointillé, couleur héritée. On signale que c'est
       cliquable sans transformer les pages en sapin de Noël. */
    s.textContent =
      '.legi-ref{color:inherit;text-decoration:underline;' +
      'text-decoration-style:dotted;text-underline-offset:2px;' +
      'text-decoration-thickness:1px;cursor:pointer}' +
      '.legi-ref:hover{text-decoration-style:solid}';
    (document.head || document.documentElement).appendChild(s);
  }

  /* Remplit un élément avec le libellé, sous forme de lien si l'article est
     connu du fonds. Idempotent : ré-hydrater ne produit pas de lien imbriqué,
     puisqu'on réécrit intégralement le contenu de l'élément. */
  function poserRefArticle(el, key, libelle) {
    var url = legiUrl((key || '').replace(/^Art\.?\s*/i, ''));
    if (!url) { el.textContent = libelle; return; }
    legiStyle();
    var a = document.createElement('a');
    a.className = 'legi-ref';
    a.href = url;
    a.target = '_blank';
    /* nofollow : l'application est indexée, MonLegiTexte ne doit pas l'être. */
    a.rel = 'noopener nofollow';
    a.title = 'Lire le texte officiel de cet article';
    a.textContent = libelle;
    el.textContent = '';
    el.appendChild(a);
  }

  function hydrate(root) {
    root = root || document;
    var map = [
      ['data-art',   function (k) { return SH.art(k); }],
      ['data-artn',  function (k) { return SH.artn(k); }],
      ['data-loi',   function (k) { return SH.texte(k); }],
      ['data-titre', function (k) { return SH.titre(k); }],
      ['data-val',   function (k) { return SH.show(k); }],
      ['data-eur',   function (k) { return SH.eur(k); }],
      ['data-maj',   function (k) { return SH.maj(k); }],
      ['data-src',   function (k) { return SH.src(k); }],
      ['data-txt',   function (k) { return SH.txt(k); }]
    ];
    map.forEach(function (pair) {
      var attr = pair[0], fn = pair[1];
      var els = root.querySelectorAll('[' + attr + ']');
      for (var i = 0; i < els.length; i++) {
        var key = els[i].getAttribute(attr);
        var out = fn(key);
        if (!out) continue;
        /* Seul data-art devient cliquable. data-artn sert aux plages
           ("Art. X à Y CODE") : un lien sur une borne serait trompeur. */
        if (attr === 'data-art') poserRefArticle(els[i], key, out);
        else els[i].textContent = out;
      }
    });
  }
  SH.hydrate = hydrate;

  // Lancer l'hydratation automatiquement quand le DOM est prêt
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { hydrate(document); });
    } else {
      hydrate(document);
    }
  }

  /* Expose en global pour les modules (et alias pratique) */
  global.SH = SH;
  global.LOIS = ARTICLES; // alias si tu préfères LOIS pour les articles

})(typeof window !== 'undefined' ? window : this);
