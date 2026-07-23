/**
 * CONVENTIONS CADRES — MODULE 6 — ÉDITION COMPLÈTE
 * ==================================================
 * Version : 2.1.0 — 18 juillet 2026
 * Couverture : 316 CCN (aligné sur conventions-collectives.js v5.6.12,
 * l'audit complet mené le 17-18/07/2026 croisant 6 sources officielles)
 *
 * AUDIT DE RECONCILIATION v2.1.0 — 18/07/2026 :
 *   Le backbone idcc/nom/secteur de CCN_FJ_DATA et CCN_CD_DATA a dérivé
 *   du fichier commun au fil du temps (généré contre une version
 *   antérieure, non auditée, à 517 entrées). Recroisement contre
 *   conventions-collectives.js v5.6.12 (déjà vérifié via repo droit,
 *   DARES x2, Predictice, Juristique, fichier DARES officiel juin 2026) :
 *     • 302 IDCC "orphelins" retirés (ne correspondent plus à aucune CCN
 *       active confirmée, ex: 176 étiqueté "Chaussure industrie" alors
 *       que 176 = Industrie pharmaceutique)
 *     • 116 IDCC manquants ajoutés (droit commun forfait jours par défaut,
 *       à enrichir)
 *     • 101 cas où l'IDCC existait des deux côtés mais avec un nom
 *       différent — nom/secteur réalignés sur le fichier commun ;
 *       quand le nom d'origine ne correspondait PAS au bon sujet, les
 *       valeurs plafond/rachat/entretien spécifiques ont été
 *       réinitialisées au droit commun (218j/10%/annuel) plutôt que
 *       conservées à tort sous le mauvais intitulé
 *     • BUG DÉCOUVERT : 14 IDCC étaient dupliqués dans CCN_FJ_DATA (deux
 *       entrées avec le même idcc, ex: 176 apparaissait 2 fois). Toutes
 *       les valeurs numériques des doublons étaient identiques
 *       (218j/10%/annuel) donc aucune perte de donnée, mais la
 *       recherche pouvait retourner l'une ou l'autre selon l'ordre —
 *       corrigé (1 seule entrée par IDCC désormais)
 *   36 CCN avaient déjà des données forfait-jours spécifiques
 *   (non-boilerplate) et sourcées avant cet audit — CONSERVÉES telles
 *   quelles (Syntec, Métallurgie, HCR, Banque, Assurances, Pétrole,
 *   etc.) mais PAS encore revérifiées individuellement contre
 *   Légifrance cette session — à faire en prochaine passe.
 *
 * SOURCE :
 *   Données HS : window.CCN_API (../ccn/conventions-collectives.js — partagé, NE PAS MODIFIER)
 *   Données FJ : CCN_FJ_DATA (ci-dessous) — propre au module 6
 *   Données CD : CCN_CD_DATA (ci-dessous) — propre au module 6
 *
 * FORFAIT JOURS (CCN_FJ_DATA) :
 *   316 CCN + données FJ spécifiques : plafond, taux de rachat,
 *   fréquence entretien, clause de déconnexion, suivi de charge,
 *   alertes légales, notes contextuelles
 *
 * CADRES DIRIGEANTS (CCN_CD_DATA) :
 *   316 CCN avec critères L3111-2 contextualisés (contenu largement
 *   statutaire/identique par CCN, la qualification cadre dirigeant
 *   dépendant des fonctions réelles plus que de la convention)
 *
 * FORFAIT HEURES → délégation au fichier commun (window.CCN_API)
 */
'use strict';

(function(global) {

const CCN_FJ_DATA = [

  {
    idcc: 7018, nom: 'Entreprises du paysage', secteur: 'Paysage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7024, nom: 'Production agricole et CUMA', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7005, nom: 'Caves coopératives vinicoles', secteur: 'Viticulture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2728, nom: 'Sucre sucreries distilleries raffineries', secteur: 'IAA sucre',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2728 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industrie sucrière (IDCC 2728). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 112, nom: 'Industrie laitière', secteur: 'IAA laitier',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 843, nom: 'Boulangerie-pâtisserie artisanale', secteur: 'Artisanat alimentaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Boulangerie artisanale : forfait jours rare — surtout pour les directeurs de réseau ou gérants de chaînes'],
    notes: 'Boulangerie artisanale. Contingent HS très élevé 329h. Forfait jours peu répandu.',
  }
,
  {
    idcc: 953, nom: 'Charcuterie de détail', secteur: 'Artisanat charcuterie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3253, nom: 'Cabinets d\'avocats (personnel salarié)', secteur: 'Avocats',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1987, nom: 'Pâtes alimentaires', secteur: 'IAA pâtes',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1596, nom: 'Bâtiment Ouvriers plus 10 salariés', secteur: 'Bâtiment',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Contingent HS réduit à 180h (accord branche) — applicable aux non-cadres', 'Cadres en forfait jours : plafond 218j légal'],
    notes: 'Groupe IAA180. Contingent HS 180h pour le personnel non-cadre. Cadres en forfait jours : règles DC standard.',
  }
,
  {
    idcc: 1597, nom: 'Bâtiment Ouvriers moins 10 salariés', secteur: 'Bâtiment',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Contingent HS réduit à 180h (accord branche) — applicable aux non-cadres', 'Cadres en forfait jours : plafond 218j légal'],
    notes: 'Groupe IAA180. Contingent HS 180h pour le personnel non-cadre. Cadres en forfait jours : règles DC standard.',
  }
,
  {
    idcc: 2332, nom: 'Architecture cabinets', secteur: 'Architecture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Architecture L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Surcharge fréquente lors des phases de dépôt de permis et rendu', 'Amplitude à surveiller en période de concours d\'architecture'],
    notes: 'Cabinets d\'architecture (IDCC 2609). Droit commun. Contingent HS réduit à 180h (groupe IAA180).',
  }
,
  {
    idcc: 44, nom: 'Industries chimiques', secteur: 'Industrie chimique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Chimie + accord branche 2001',
    clauseDeconn: false, suiviCharge: 'Accord branche chimie RTT 2001',
    alertes: ['Accord de branche chimie 2001 sur la réduction du temps de travail applicable', 'RTT calculés selon l\'accord CHIM de branche', 'Contingent HS réduit à 130h (accord branche)'],
    notes: 'Industries chimiques (IDCC 44). Accord de branche 2001 sur les 35h avec accord RTT spécifique. Contingent HS réduit à 130h.',
  }
,
  {
    idcc: 1388, nom: 'Industrie du pétrole', secteur: 'Energie pétrolière',
    plafond: 218, plafondCDRef: 218, tauxRachat: 30,
    entretienFreq: 'annuel', entretienRef: 'CCN Pétrole + accord branche UFIP',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['⚠️ Taux de rachat minimum 30% (taux majoré pétrole) — plus favorable pour le salarié', 'Accord UFIP sur l\'organisation du travail des cadres'],
    notes: 'Industrie du pétrole (IDCC 669). Taux de majoration HS à 30% — par analogie le taux de rachat du forfait est généralement aligné (30%).',
  }
,
  {
    idcc: 292, nom: 'Plasturgie', secteur: 'Industrie plastique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 176, nom: 'Industrie pharmaceutique', secteur: 'Industrie pharmaceutique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Industrie pharmaceutique L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Accord branche pharmaceutique — vérifier la déclinaison d\'entreprise', 'Forte variabilité de charge lors des audits réglementaires (AMM, inspections FDA)', 'Cadres itinérants (délégués médicaux) : amplitude et déplacements à déclarer'],
    notes: 'Industrie pharmaceutique (IDCC 216). Droit commun du forfait jours. Nombreux accords d\'entreprise dans les grands groupes pharma (Sanofi, Roche, Pfizer, etc.).',
  }
,
  {
    idcc: 1555, nom: 'Fabrication commerce produits pharma para-pharma vétérinaire', secteur: 'Pharmacie vétérinaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 493, nom: 'Vins, cidres, jus de fruits, sirops, spiritueux et liqueurs de France', secteur: 'Vins spiritueux',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3238, nom: 'Papiers et cartons industries', secteur: 'Industrie papier',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 489, nom: 'Cartonnage industries', secteur: 'Industrie cartonnage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3248, nom: 'Métallurgie accord national unique 2023', secteur: 'Métallurgie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'ANU Métallurgie 2023 — Titre VI',
    clauseDeconn: true, suiviCharge: 'ANU Métallurgie Titre VI suivi charge',
    alertes: ['⚠️ Nouvel ANU Métallurgie 2023 : régime transitoire jusqu\'au 31/12/2025', 'Intégration des anciens accords de branche UIMM dans l\'ANU', 'Droit à la déconnexion formalisé dans l\'ANU Titre VIII', 'Entretien annuel renforcé par l\'ANU — vérifier la convention d\'entreprise'],
    notes: 'Accord National Unique de la Métallurgie (IDCC 3248 depuis 2023). Regroupe +200 anciennes CCN UIMM. Transition complète au 31/12/2025.',
  }
,
  {
    idcc: 2046, nom: 'Centres de lutte contre le cancer (CLCC)', secteur: 'Santé oncologie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 247, nom: 'Industries de l\'habillement', secteur: 'Habillement',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1580, nom: 'Chaussure industrie', secteur: 'Industrie chaussure',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2528, nom: 'Maroquinerie gainerie bracelets cuir', secteur: 'Industrie maroquinerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 5001, nom: 'Industries électriques et gazières IEG', secteur: 'Energie EDF GDF',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1413, nom: 'Salariés permanents des entreprises de travail temporaire', secteur: 'Travail temporaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 637, nom: 'Récupération industrie et commerces', secteur: 'Recyclage récupération',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2216, nom: 'Grande distribution alimentaire supermarchés hypermarchés', secteur: 'Grande distribution alim.',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Contingent HS réduit à 180h (accord branche) — applicable aux non-cadres', 'Cadres en forfait jours : plafond 218j légal'],
    notes: 'Groupe IAA180. Contingent HS 180h pour le personnel non-cadre. Cadres en forfait jours : règles DC standard.',
  }
,
  {
    idcc: 573, nom: 'Commerce de gros alimentaire', secteur: 'Commerce de gros alim.',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Commerce de gros L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Commerce de gros : cadres itinérants — amplitude et déplacements à surveiller', 'Vérifier si l\'accord d\'entreprise prévoit un contingent HS spécifique'],
    notes: 'Commerce de gros (IDCC 573). Droit commun. Cadres commerciaux souvent en forfait jours.',
  }
,
  {
    idcc: 5730, nom: 'Commerce de gros non alimentaire', secteur: 'Commerce de gros non alim.',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1501, nom: 'Restauration rapide', secteur: 'Restauration rapide',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1979, nom: 'Hôtels Cafés Restaurants HCR', secteur: 'HCR',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN HCR L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['⚠️ HCR : forfait jours principalement pour les directeurs d\'établissement', 'Employés et techniciens HCR : régime 3 paliers HS — PAS de forfait jours', 'Amplitude très variable (soirées, week-ends) : déclarer systématiquement'],
    notes: 'CCN HCR. Forfait jours réservé aux cadres autonomes (directeurs, DA). Personnel non-cadre : régime HCR spécifique.',
  }
,
  {
    idcc: 1517, nom: 'Commerce de détail non alimentaire', secteur: 'Commerce de détail',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Contingent HS réduit à 180h (accord branche) — applicable aux non-cadres', 'Cadres en forfait jours : plafond 218j légal'],
    notes: 'Groupe IAA180. Contingent HS 180h pour le personnel non-cadre. Cadres en forfait jours : règles DC standard.',
  }
,
  {
    idcc: 1483, nom: 'Habillement commerce de détail', secteur: 'Commerce textile',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 468, nom: 'Chaussure commerce succursaliste', secteur: 'Commerce chaussures',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1431, nom: 'Optique lunetterie de détail', secteur: 'Optique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3255, nom: 'Activités industrielles de boulangerie et pâtisserie', secteur: 'Boulangerie industrielle',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1996, nom: 'Pharmacies officine', secteur: 'Pharmacie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Pharmacie officine L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Pharmacie officine : forfait jours pour les directeurs et cadres administratifs'],
    notes: 'Pharmacies officine. Contingent HS 150h.',
  }
,
  {
    idcc: 1606, nom: 'Bricolage commerce de détail', secteur: 'Commerce bricolage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 993, nom: 'Prothèse dentaire laboratoires', secteur: 'Santé dentaire labo',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3237, nom: 'Commerce de détail alimentaire spécialisé', secteur: 'Commerce alim spécialisé',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2596, nom: 'Coiffure entreprises', secteur: 'Coiffure',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1672, nom: 'Sociétés assurances', secteur: 'Assurance',
    plafond: 215, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Accord branche assurances + avenant 2017',
    clauseDeconn: true, suiviCharge: 'Accord branche assurances suivi charge',
    alertes: ['Plafond réduit 215j (accord branche assurances)', 'Contingent HS très réduit 70h — forfait jours privilégié pour les cadres'],
    notes: 'Assurances (IDCC 1672). Plafond 215j — disposition plus favorable. Très forte proportion de cadres en forfait jours dans ce secteur.',
  }
,
  {
    idcc: 2120, nom: 'Banque (AFB)', secteur: 'Banque mutualiste',
    plafond: 208, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Accord groupe BPCE',
    clauseDeconn: true, suiviCharge: 'Accord groupe',
    alertes: ['Plafond réduit 208j (accord groupe BPCE)', 'Vérifier l\'accord d\'établissement de votre caisse régionale'],
    notes: 'BPCE / Banques Populaires (IDCC 2120). Plafond 208j. Chaque caisse régionale peut avoir un accord d\'établissement spécifique.',
  }
,
  {
    idcc: 1351, nom: 'Prévention et sécurité privée gardiennage', secteur: 'Sécurité privée',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Sécurité privée : forfait jours rare — concerne principalement les cadres de direction des groupes'],
    notes: 'Sécurité privée. Forfait jours principalement pour les directeurs de groupes.',
  }
,
  {
    idcc: 3043, nom: 'Nettoyage entreprises de propreté', secteur: 'Propreté',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Propreté : forfait jours pour les directeurs régionaux et directeurs de sites'],
    notes: 'Entreprises de propreté. Forfait jours pour les cadres de direction.',
  }
,
  {
    idcc: 1527, nom: 'Immobilier agents gestionnaires syndics', secteur: 'Immobilier',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Immobilier L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Pics liés aux saisons immobilières (printemps/automne) à déclarer', 'Cadres commerciaux itinérants : amplitude et déplacements à surveiller'],
    notes: 'Immobilier (IDCC 1527). Droit commun. Nombreux accords d\'entreprise dans les grands réseaux (Nexity, Orpi, etc.).',
  }
,
  {
    idcc: 1512, nom: 'Promotion immobilière', secteur: 'Promotion immobilière',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Promotion immobilière L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Surcharge en phase de livraison de programme immobilier'],
    notes: 'Promotion immobilière (IDCC 1966). Droit commun.',
  }
,
  {
    idcc: 218, nom: 'Organismes de Sécurité sociale (UCANSS)', secteur: 'Sécurité sociale',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Avocats L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['⚠️ Distinctions avocats collaborateurs (indépendants) / salariés — seuls les salariés relèvent du forfait jours', 'Amplitude très élevée en cabinet : entretien de charge recommandé trimestriellement', 'Pics lors des audiences, dépôts de conclusions, arbitrages'],
    notes: 'Cabinets d\'avocats (IDCC 218). Uniquement les avocats salariés (pas les collaborateurs libéraux).',
  }
,
  {
    idcc: 3250, nom: 'Commissaires de justice et sociétés de ventes volontaires', secteur: 'Commissaires justice ventes volontaires',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1486, nom: 'Syntec bureaux études techniques informatique ingénierie conseil', secteur: 'IT ingénierie conseil',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'semestriel', entretienRef: 'Accord Syntec 22/06/1999 art.3 + avenant 2014',
    clauseDeconn: true, suiviCharge: 'Art.3 accord Syntec 22/06/1999',
    alertes: ['⚠️ Entretien de charge SEMESTRIEL obligatoire (accord Syntec 22/06/1999)', 'Droit à la déconnexion formalisé (avenant 19/11/2014)', 'Modalité 2 (ETAM) ou Modalité 3 (IC) — vérifier votre niveau de classification', 'Alerte amplitude >10h : obligation de signalement (accord branche 2023)'],
    notes: 'CCN Syntec (IDCC 1486). L\'accord cadres du 22/06/1999 est plus contraignant que le légal : entretiens semestriels obligatoires, suivi toutes les 6 semaines. Modalités 2 (ETAM) et 3 (ingénieurs-cadres IC) à distinguer.',
  }
,
  {
    idcc: 2264, nom: 'Hospitalisation privée', secteur: 'Santé privée',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Télécommunications L3121-65',
    clauseDeconn: true, suiviCharge: 'Art. L3121-65',
    alertes: ['Télécoms : astreintes réseau et incidents — amplitude à déclarer', 'Droit à la déconnexion recommandé pour les cadres itinérants'],
    notes: 'Télécommunications (IDCC 2264). Droit commun. Astreintes fréquentes à inclure.',
  }
,
  {
    idcc: 1922, nom: 'Radiodiffusion audiovisuel public et privé', secteur: 'Audiovisuel',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 184, nom: 'Imprimerie de labeur industries graphiques', secteur: 'Imprimerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2121, nom: 'Edition livres presse multimédia', secteur: 'Edition',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Edition L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Pics de charge en période de rentrée littéraire (août–septembre)'],
    notes: 'Edition livres, presse, multimédia (IDCC 3090). Droit commun.',
  }
,
  {
    idcc: 1619, nom: 'Cabinets dentaires', secteur: 'Santé dentaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2941, nom: 'Aide accompagnement soins à domicile BASS', secteur: 'Aide à domicile',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 413, nom: 'CCN 66 inadaptés handicapés', secteur: 'Médico-social CCN 66',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3217, nom: 'Branche ferroviaire (CCN du 31 mai 2016)', secteur: 'Transport ferroviaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2205, nom: 'Notariat', secteur: 'Notariat',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 16, nom: 'Transport routier de marchandises', secteur: 'Transport routier marchandises',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Transport L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['⚠️ Transport : distinction impérative entre cadres administratifs (FJ possible) et personnel roulant (régime heures spécifique)'],
    notes: 'Transport routier. Forfait jours pour les cadres sédentaires uniquement.',
  }
,
  {
    idcc: 2002, nom: 'Blanchisserie, teinturerie et nettoyage (pressing)', secteur: 'Blanchisserie pressing',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 5021, nom: 'Statut de la Fonction publique territoriale', secteur: 'Transport fluvial',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1631, nom: 'Organismes de tourisme et hôtellerie de plein air', secteur: 'Tourisme',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2511, nom: 'Sport entreprises du secteur sportif', secteur: 'Sport',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2257, nom: 'Casinos', secteur: 'Jeux casinos',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2257 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Casinos personnel (IDCC 2257). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1516, nom: 'Formation professionnelle continue', secteur: 'Formation professionnelle',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Formation professionnelle L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Pics de charge en début et fin d\'exercice budgétaire', 'Formateurs-consultants cadres : confirmer le statut salarié'],
    notes: 'Formation professionnelle continue (IDCC 1516). Droit commun.',
  }
,
  {
    idcc: 1518, nom: 'Animation ÉCLAT structures employant animateurs', secteur: 'Animation ESS',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['ÉCLAT : contingent HS très réduit 70h — forfait jours préféré pour les directeurs'],
    notes: 'Animation ÉCLAT. Contingent HS 70h très réduit.',
  }
,
  {
    idcc: 1261, nom: 'Centres sociaux et socio-culturels', secteur: 'Action sociale',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Centres sociaux : contingent HS très réduit 100h — forfait jours préféré pour les directeurs'],
    notes: 'Centres sociaux et socio-culturels. Contingent HS 100h très réduit.',
  }
,
  {
    idcc: 2198, nom: 'Vente à distance e-commerce', secteur: 'Commerce distance',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: true, suiviCharge: 'Art. L3121-65',
    alertes: ['E-commerce : culture digitale — droit à la déconnexion fortement recommandé', 'Black Friday et fêtes : pics d\'activité prévisibles à anticiper'],
    notes: 'Vente à distance et e-commerce (IDCC 1659). Droit commun. Droit à la déconnexion important dans ce secteur.',
  }
,
  {
    idcc: 29, nom: 'Médico-social FEHAP CCN 51', secteur: 'Médico-social FEHAP',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 43, nom: 'Import-export et commerce international', secteur: 'Commerce international',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 45, nom: 'Caoutchouc industrie', secteur: 'Industrie caoutchouc',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3222, nom: 'Menuiseries charpentes constructions industrialisées', secteur: 'Industrie bois',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3249, nom: 'Industries de carrières et matériaux de construction', secteur: 'Carrières matériaux construction',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 158, nom: 'Bois scieries négoce importation', secteur: 'Industrie bois négoce',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3205, nom: 'Coopératives de consommation', secteur: 'Coopératives',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3244, nom: 'Professions réglementées auprès des juridictions', secteur: 'Juridictions professions réglementées',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 275, nom: 'Transport aérien personnel au sol accord national', secteur: 'Transport aérien sol',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 303, nom: 'Couture parisienne', secteur: 'Mode couture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3216, nom: 'Ouvriers négoce matériaux construction', secteur: 'Négoce matériaux',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3097, nom: 'Production cinématographique acteurs', secteur: 'Cinéma production',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 454, nom: 'Remontées mécaniques domaines skiables', secteur: 'Tourisme ski',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 478, nom: 'Sociétés financières établissements financiers', secteur: 'Finance',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 500, nom: 'Commerce gros habillement mercerie chaussure jouet', secteur: 'Commerce gros habillement',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 538, nom: 'Manutention ferroviaire travaux connexes', secteur: 'Transport ferroviaire manut.',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 18, nom: 'Industries textiles', secteur: 'Industrie textile',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 18 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industrie textile (IDCC 18). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 669, nom: 'Industries de fabrication mécanique du verre', secteur: 'Industrie verrière',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1930, nom: 'Métiers de la transformation des grains (meunerie)', secteur: 'Meunerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2336, nom: 'Habitat et logement accompagnés (ex-foyers de jeunes travailleurs)', secteur: 'FJT habitat jeunes',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2378, nom: 'Salariés intérimaires des entreprises de travail temporaire', secteur: 'Travail temporaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3252, nom: 'Entreprises au service de la création et de l\'événement', secteur: 'Création événement entreprises',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 5619, nom: 'Pêche professionnelle maritime (CCN provisoire)', secteur: 'Pêche maritime',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 653, nom: 'Producteurs salariés assurances services extérieurs', secteur: 'Assurance producteurs',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 716, nom: 'Employés ouvriers distribution cinématographique', secteur: 'Cinéma distribution',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3243, nom: 'Commerces de quincaillerie, fournitures industrielles, fers, métaux et équipements de la maison', secteur: 'Quincaillerie fournitures',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 733, nom: 'Détaillants en chaussures', secteur: 'Commerce chaussures détail',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 759, nom: 'Pompes funèbres', secteur: 'Services funéraires',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1580 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Services funéraires (IDCC 1580). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 787, nom: 'Cabinets experts-comptables commissaires aux comptes', secteur: 'Finance audit comptable',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3224, nom: 'Distribution et commerce de gros des papiers-cartons', secteur: 'Distribution papiers cartons',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 804, nom: 'Voyageurs représentants placiers VRP accord national', secteur: 'VRP',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 892, nom: 'Cadres distribution films cinéma', secteur: 'Cinéma distribution cadres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 897, nom: 'Services de santé au travail interentreprises', secteur: 'Santé travail',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 915, nom: 'Expertises évaluations industrielles commerciales', secteur: 'Expertise évaluation',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 959, nom: 'Laboratoires analyses médicales extra-hospitaliers', secteur: 'Biologie médicale labo',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3254, nom: 'Boucherie-Poissonnerie', secteur: 'Boucherie poissonnerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 998, nom: 'Exploitation équipements thermiques génie climatique', secteur: 'Génie climatique exploitation',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1043, nom: 'Gardiens concierges employés immeubles résidences', secteur: 'Gardiennage immeuble',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1077, nom: 'Négoce industrie produits sol engrais', secteur: 'Négoce agricole',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1090, nom: 'Commerce réparation automobile cycle motocycle', secteur: 'Automobile commerce réparation',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1170, nom: 'Industrie tuiles et briques CCNTB', secteur: 'Industrie matériaux',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1256, nom: 'Cadres entreprises équipements thermiques climatisation', secteur: 'Génie climatique cadres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1267, nom: 'Pâtisserie', secteur: 'Artisanat pâtisserie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1987 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Pâtisserie artisans patrons (IDCC 1987). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1286, nom: 'Confiserie chocolaterie biscuiterie détail artisans', secteur: 'Artisanat confiserie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1307, nom: 'Exploitation cinématographique', secteur: 'Cinéma exploitation',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1405, nom: 'Expédition exportation fruits légumes', secteur: 'Commerce fruits légumes',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1408, nom: 'Distribution logistique services énergies proximité', secteur: 'Distribution énergie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1412, nom: 'Installation entretien réparation matériel thermique frigorifique', secteur: 'Génie climatique install.',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2335, nom: 'Personnel agences générales assurances', secteur: 'Assurance agences personnel',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2683, nom: 'Portage de presse', secteur: 'Presse portage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2691, nom: 'Enseignement privé indépendant', secteur: 'Education privée',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2727, nom: 'Omnipraticiens entreprises privées', secteur: 'Santé omnipraticiens',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2931, nom: 'Activités marchés financiers', secteur: 'Finance marchés',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2972, nom: 'Personnel sédentaire navigation', secteur: 'Transport maritime',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3013, nom: 'Librairie indépendante', secteur: 'Commerce librairie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3016, nom: 'Ateliers chantiers insertion', secteur: 'Insertion professionnelle',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3017, nom: 'Ports et manutention unifiée', secteur: 'Transport maritime port',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3032, nom: 'Esthétique cosmétique parfumerie', secteur: 'Esthétique beauté',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3109, nom: 'Métiers du commerce détail alimentaire spécialisé 5 branches', secteur: 'Commerce alim spécialisé 5B',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3127, nom: 'Entreprises services à la personne', secteur: 'Services personne',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3203, nom: 'Structures coopératives agricoles bétail viande', secteur: 'Coopérative viande',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2543, nom: 'Cabinets géomètres-experts topographes', secteur: 'Géomètre expert',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3230, nom: 'Presse quotidienne et hebdomadaire', secteur: 'Presse',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3239, nom: 'Particuliers employeurs emploi à domicile', secteur: 'Emploi domicile',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1607, nom: 'Jeux jouets articles de fêtes puériculture', secteur: 'Industrie jouets puériculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1266, nom: 'Restauration de collectivités', secteur: 'Restauration collective',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1978, nom: 'Fleuristes vente et services animaux familiers', secteur: 'Fleuristes animalerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2247, nom: 'Courtage assurances et réassurances', secteur: 'Assurance courtage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7002, nom: 'Coopératives agricoles céréales meunerie alimentation bétail oléagineux', secteur: 'Coopératives agricoles',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 86, nom: 'Entreprises de publicité et assimilées', secteur: 'Publicité',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 200, nom: 'Exploitations frigorifiques', secteur: 'Froid industriel',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 306, nom: 'Cadres techniques de la presse quotidienne parisienne', secteur: 'Presse parisienne cadres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 394, nom: 'Employés de la presse quotidienne parisienne', secteur: 'Presse parisienne employés',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 405, nom: 'Établissements médico-sociaux UNISSS FFESCPE (enfants, adolescents)', secteur: 'Médico-social enfants',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 509, nom: 'Cadres administratifs de la presse quotidienne parisienne', secteur: 'Presse parisienne administratifs',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3251, nom: 'Bijouterie, joaillerie, orfèvrerie', secteur: 'Bijouterie joaillerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 675, nom: 'Maisons à succursales de vente au détail d\'habillement', secteur: 'Habillement succursales',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 783, nom: 'Centres d\'hébergement et de réadaptation sociale (CHRS, SOP)', secteur: 'Hébergement réadaptation sociale',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1031, nom: 'Fédération nationale des associations familiales rurales (FNAFR)', secteur: 'Associations familiales rurales',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1147, nom: 'Personnel des cabinets médicaux', secteur: 'Cabinets médicaux',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1182, nom: 'Personnels des ports de plaisance', secteur: 'Ports de plaisance',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1285, nom: 'Entreprises artistiques et culturelles (SYNDEAC)', secteur: 'Entreprises artistiques culturelles',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1311, nom: 'Restauration ferroviaire', secteur: 'Restauration ferroviaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1316, nom: 'Organismes de tourisme social et familial', secteur: 'Tourisme social familial',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1396, nom: 'Industries de produits alimentaires élaborés', secteur: 'Produits alimentaires élaborés',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1404, nom: 'Commerce, location, réparation de tracteurs et matériels agricoles, TP, bâtiment, motoculture (SEDIMA)', secteur: 'Matériels agricoles TP SEDIMA',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1411, nom: 'Fabrication de l\'ameublement', secteur: 'Ameublement fabrication',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1424, nom: 'Réseaux de transports publics urbains de voyageurs', secteur: 'Transports urbains voyageurs',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1468, nom: 'Branche du Crédit mutuel', secteur: 'Crédit mutuel',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1480, nom: 'Journalistes', secteur: 'Journalisme',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1487, nom: 'Commerce de détail de l\'horlogerie-bijouterie', secteur: 'Horlogerie bijouterie détail',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1499, nom: 'Miroiterie, transformation et négoce du verre', secteur: 'Miroiterie verre',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1505, nom: 'Commerce de détail alimentaire non spécialisé', secteur: 'Alimentaire détail non spécialisé',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1513, nom: 'Activités de production des eaux embouteillées, boissons rafraîchissantes sans alcool et bière', secteur: 'Eaux embouteillées boissons',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1534, nom: 'Entreprises de l\'industrie et des commerces en gros des viandes', secteur: 'Commerce gros viandes',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1536, nom: 'Distributeurs conseils hors domicile (CHD)', secteur: 'Distributeurs boissons CHD',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1539, nom: 'Commerces de détail de papeterie, fournitures de bureau, bureautique, informatique et librairie', secteur: 'Papeterie fournitures bureau',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1557, nom: 'Commerce des articles de sports et d\'équipements de loisirs', secteur: 'Sports équipements loisirs',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1558, nom: 'Personnel des industries céramiques de France', secteur: 'Industries céramiques',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1586, nom: 'Industrie de la salaison, charcuterie en gros et conserves de viandes', secteur: 'Salaison charcuterie gros',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1589, nom: 'Mareyeurs-expéditeurs', secteur: 'Mareyeurs expéditeurs',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1605, nom: 'Entreprises de désinfection, désinsectisation, dératisation (3D)', secteur: 'Désinfection dératisation',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1605 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Hygiène environnementale (IDCC 1605). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1611, nom: 'Entreprises de logistique de communication écrite directe', secteur: 'Logistique publicité directe',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1612, nom: 'Personnel navigant des essais et réceptions', secteur: 'Aviation essais réceptions',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1621, nom: 'Répartition pharmaceutique', secteur: 'Répartition pharmaceutique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1671, nom: 'Maisons d\'étudiants', secteur: 'Maisons d\'étudiants',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1679, nom: 'Inspection d\'assurance', secteur: 'Inspection d\'assurance',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1686, nom: 'Commerces et services de l\'audiovisuel, de l\'électronique et de l\'équipement ménager', secteur: 'Audiovisuel électroménager',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1702, nom: 'Ouvriers de travaux publics', secteur: 'Travaux publics ouvriers',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1760, nom: 'Jardineries et graineteries', secteur: 'Jardineries graineteries',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1790, nom: 'Espaces de loisirs, d\'attractions et culturels', secteur: 'Loisirs attractions culturels',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1794, nom: 'Personnel des institutions de retraite complémentaire', secteur: 'Retraite complémentaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1801, nom: 'Sociétés d\'assistance', secteur: 'Sociétés d\'assistance',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1821, nom: 'Professions regroupées du cristal, du verre et du vitrail', secteur: 'Cristal verre vitrail',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1875, nom: 'Cabinets et cliniques vétérinaires, personnel salarié', secteur: 'Cliniques vétérinaires',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1880, nom: 'Négoce de l\'ameublement', secteur: 'Négoce ameublement',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1909, nom: 'Organismes de tourisme', secteur: 'Organismes de tourisme',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1909 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Offices de tourisme (IDCC 1909). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1938, nom: 'Industries de la transformation des volailles', secteur: 'Transformation volailles',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1944, nom: 'Personnel navigant technique des exploitants d\'hélicoptères', secteur: 'Hélicoptères personnel navigant',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1951, nom: 'Cabinets ou entreprises d\'expertises en automobile', secteur: 'Expertise automobile',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1982, nom: 'Négoce et prestations de services dans les domaines médico-techniques', secteur: 'Médico-technique négoce',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2021, nom: 'Golf', secteur: 'Golf',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2060, nom: 'Chaînes de cafétérias et assimilés', secteur: 'Cafétérias chaînes',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7025, nom: 'ETARF entreprises travaux et services agricoles ruraux forestiers', secteur: 'Agriculture ETARF',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7502, nom: 'Mutualité sociale agricole', secteur: 'MSA',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7503, nom: 'Distilleries coopératives viticoles', secteur: 'Viticulture distillerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7508, nom: 'Maisons familiales rurales', secteur: 'Enseignement rural',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7513, nom: 'Centres initiatives en milieu rural', secteur: 'Développement rural',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7514, nom: 'Organismes de la Confédération paysanne', secteur: 'Syndicat agricole',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3090, nom: 'Entreprises privées du spectacle vivant', secteur: 'Spectacle vivant privé',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3219, nom: 'Branche des salariés en portage salarial', secteur: 'Portage salarial',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7017, nom: 'Parcs et jardins zoologiques', secteur: 'Zoos parcs animaliers',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3105, nom: 'Régies de quartier', secteur: 'Régies de quartier',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3168, nom: 'Professions de la photographie', secteur: 'Photographie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3210, nom: 'Banque Populaire', secteur: 'Banque Populaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3212, nom: 'Cadres des travaux publics', secteur: 'Travaux publics cadres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3213, nom: 'Économistes de la construction et métreurs-vérificateurs', secteur: 'Économistes construction',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3218, nom: 'Enseignement privé non lucratif', secteur: 'Enseignement privé non lucratif',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3220, nom: 'Offices publics de l\'habitat', secteur: 'Offices publics habitat',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3221, nom: 'Agences de presse (employés, techniciens, cadres)', secteur: 'Agences de presse',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3223, nom: 'Transports et services maritimes, personnels navigants officiers', secteur: 'Transports maritimes officiers',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3225, nom: 'Éditeurs de la presse magazine (employés et cadres)', secteur: 'Presse magazine',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3228, nom: 'Armateurs de services de passages d\'eau, personnel navigant', secteur: 'Passages d\'eau navigants',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3229, nom: 'Personnel sédentaire du transport de marchandises en navigation intérieure', secteur: 'Navigation intérieure marchandises',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3232, nom: 'Agents de direction des organismes du régime général de sécurité sociale', secteur: 'Sécu agents de direction',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3233, nom: 'Industrie de la fabrication des ciments', secteur: 'Ciment fabrication',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3235, nom: 'Parfumerie sélective', secteur: 'Parfumerie sélective',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3236, nom: 'Industrie et services nautiques', secteur: 'Nautisme',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3241, nom: 'Télédiffusion', secteur: 'Télédiffusion',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3242, nom: 'Presse quotidienne et hebdomadaire en régions', secteur: 'Presse régionale',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3245, nom: 'Opérateurs de voyages et guides', secteur: 'Voyages guides',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 214, nom: 'Presse Région parisienne ouvriers', secteur: 'Presse Région parisienne ouvriers',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 379, nom: 'Commerces Martinique', secteur: 'Commerces Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 440, nom: 'Sucrerie Réunion', secteur: 'Sucrerie Réunion',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 627, nom: 'Bâtiment TP ETAM La Réunion', secteur: 'Bâtiment TP ETAM La Réunion',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 749, nom: 'Bâtiment TP ouvriers Martinique', secteur: 'Bâtiment TP ouvriers Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 771, nom: 'Bâtiment TP Cadres La Réunion', secteur: 'Bâtiment TP Cadres La Réunion',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 901, nom: 'Boulangerie Martinique', secteur: 'Boulangerie Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 919, nom: 'Personnel des garages de la Martinique', secteur: 'Personnel des garages de la Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1049, nom: 'Bâtiment TP ouvriers St Pierre Miquelon', secteur: 'Bâtiment TP ouvriers St Pierre Miquelon',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1050, nom: 'Commerces St Pierre Miquelon', secteur: 'Commerces St Pierre Miquelon',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1057, nom: 'Consignataire de navires Martinique', secteur: 'Consignataire de navires Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1060, nom: 'Métallurgie Martinique', secteur: 'Métallurgie Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1069, nom: 'Répartition pharmaceutique Martinique', secteur: 'Répartition pharmaceutique Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1072, nom: 'Manutention portuaire St Pierre', secteur: 'Manutention portuaire St Pierre',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1140, nom: 'Hôtels St Pierre Miquelon', secteur: 'Hôtels St Pierre Miquelon',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1203, nom: 'Commerces services Guadeloupe', secteur: 'Commerces services Guadeloupe',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1225, nom: 'Commerces la Réunion', secteur: 'Commerces la Réunion',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1232, nom: 'Hôtellerie Guadeloupe', secteur: 'Hôtellerie Guadeloupe',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1247, nom: 'Commerces de l\'automobile la Réunion', secteur: 'Commerces de l\'automobile la Réunion',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1257, nom: 'Pharmacie d\'officine Réunion', secteur: 'Pharmacie d\'officine Réunion',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1341, nom: 'Industrie agro alimentaires Réunion', secteur: 'Industrie agro alimentaires Réunion',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1565, nom: 'Soins infirmiers à domicile Guadeloupe', secteur: 'Soins infirmiers à domicile Guadeloupe',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1700, nom: 'Sucrerie distillerie Guadeloupe', secteur: 'Sucrerie distillerie Guadeloupe',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1843, nom: 'Bâtiment cadres Région parisienne', secteur: 'Bâtiment cadres Région parisienne',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1923, nom: 'Manutention portuaire Guadeloupe', secteur: 'Manutention portuaire Guadeloupe',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1961, nom: 'Stations Service Guadeloupe', secteur: 'Stations Service Guadeloupe',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1980, nom: 'Commissionnaires en douane Martinique', secteur: 'Commissionnaires en douane Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2025, nom: 'Mines Guyane', secteur: 'Mines Guyane',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2250, nom: 'Boulangerie pâtisserie de la Guyane', secteur: 'Boulangerie pâtisserie de la Guyane',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2328, nom: 'Bâtiment TP ouvriers Guadeloupe', secteur: 'Bâtiment TP ouvriers Guadeloupe',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2345, nom: 'Transport sanitaire en Martinique', secteur: 'Transport sanitaire en Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2360, nom: 'Services de l\'automobile Guyane', secteur: 'Services de l\'automobile Guyane',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2389, nom: 'Bâtiment TP ouvriers La Réunion', secteur: 'Bâtiment TP ouvriers La Réunion',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2405, nom: 'Hospitalisation Guadeloupe', secteur: 'Hospitalisation Guadeloupe',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2480, nom: 'Manutention portuaire Fort de France', secteur: 'Manutention portuaire Fort de France',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2534, nom: 'Industrie sucrière et rhumière Martinique', secteur: 'Industrie sucrière et rhumière Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2535, nom: 'Culture canne à sucre Martinique', secteur: 'Culture canne à sucre Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2631, nom: 'Télédiffusion (accords CDD)', secteur: 'Télédiffusion (accords CDD)',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2658, nom: 'Guides et accompagnateurs milieu amazonien', secteur: 'Guides et accompagnateurs milieu amazonien',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2701, nom: 'Banques Guyane', secteur: 'Banques Guyane',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2702, nom: 'Banques Martinique', secteur: 'Banques Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2704, nom: 'Banques Guadeloupe St Martin', secteur: 'Banques Guadeloupe St Martin',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2766, nom: 'Sécurité sociale des mines personnels non cadres', secteur: 'Sécurité sociale des mines personnels non cadres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2870, nom: 'Bâtiment TP ouvriers Guyane', secteur: 'Bâtiment TP ouvriers Guyane',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2964, nom: 'Transport de proximité produits pétroliers Martinique', secteur: 'Transport de proximité produits pétroliers Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3028, nom: 'Transports routiers de la Guadeloupe', secteur: 'Transports routiers de la Guadeloupe',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3107, nom: 'Bâtiment TP ETAM Martinique', secteur: 'Bâtiment TP ETAM Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3123, nom: 'Ambulances Guyane', secteur: 'Ambulances Guyane',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3128, nom: 'BTP Industrie activités connexes Guyane - ETAM', secteur: 'BTP Industrie activités connexes Guyane - ETAM',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3140, nom: 'Commerce Sces commerciaux HCR St Pierre et Miquelon', secteur: 'Commerce Sces commerciaux HCR St Pierre et Miquelon',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3144, nom: 'Bâtiment TP ETAM Guadeloupe', secteur: 'Bâtiment TP ETAM Guadeloupe',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3204, nom: 'Bâtiment TP ingénieurs et cadres Guyane', secteur: 'Bâtiment TP ingénieurs et cadres Guyane',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3206, nom: 'Cabinets médicaux Martinique', secteur: 'Cabinets médicaux Martinique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3207, nom: 'Transports sanitaires de Guadeloupe', secteur: 'Transports sanitaires de Guadeloupe',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 5521, nom: 'Transports maritimes personnel navigant d\'exécution', secteur: 'Transports maritimes personnel navigant d\'exécution',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 5554, nom: 'Remorquage maritime officiers', secteur: 'Remorquage maritime officiers',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 5555, nom: 'Remorquage maritime navigant d\'exécution', secteur: 'Remorquage maritime navigant d\'exécution',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1659, nom: 'Rouissage teillage du lin', secteur: 'Lin rouissage teillage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7001, nom: 'Coopératives et SICA bétail et viandes', secteur: 'Coopératives agricoles bétail',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7004, nom: 'Coopératives laitières et unions de coopératives', secteur: 'Coopératives laitières',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7009, nom: 'Entreprises d\'accouvage et de sélection avicole', secteur: 'Accouvage sélection avicole',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7010, nom: 'Personnel des élevages aquacoles', secteur: 'Aquaculture élevage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7019, nom: 'Conchyliculture', secteur: 'Conchyliculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7020, nom: 'Réseau des centres d\'économie rurale', secteur: 'Centres économie rurale',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7026, nom: 'Activités hippiques', secteur: 'Activités hippiques',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7027, nom: 'Conseil et service en élevage', secteur: 'Conseil service élevage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7028, nom: 'Coopératives agricoles et unions de coopératives', secteur: 'Coopératives agricoles',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7501, nom: 'Caisses régionales du Crédit agricole', secteur: 'Crédit agricole',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7520, nom: 'Salariés des établissements d\'enseignement agricole privé', secteur: 'Enseignement agricole privé',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2089, nom: 'Industrie des panneaux à base de bois', secteur: 'Panneaux bois',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2098, nom: 'Personnel des prestataires de services du secteur tertiaire', secteur: 'Prestataires services tertiaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2128, nom: 'Mutualité', secteur: 'Mutualité',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2147, nom: 'Entreprises des services d\'eau et d\'assainissement', secteur: 'Eau assainissement',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2148, nom: 'Télécommunications', secteur: 'Télécommunications',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2149, nom: 'Activités du déchet', secteur: 'Déchet activités',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2150, nom: 'Personnels des sociétés anonymes et fondations d\'HLM', secteur: 'HLM sociétés anonymes',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2156, nom: 'Grands magasins et magasins populaires', secteur: 'Grands magasins',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2156 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Distribution grands magasins (IDCC 2156). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2190, nom: 'Missions locales et PAIO', secteur: 'Missions locales PAIO',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2219, nom: 'Taxis', secteur: 'Taxis',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2272, nom: 'Assainissement et maintenance industrielle', secteur: 'Assainissement industriel',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2372, nom: 'Entreprises de la distribution directe', secteur: 'Distribution directe',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2412, nom: 'Production de films d\'animation', secteur: 'Films d\'animation production',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2420, nom: 'Cadres du bâtiment', secteur: 'Bâtiment cadres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: [
      'Plafond dégressif avec l\'ancienneté : 218j (0-5 ans) → 216j (5-10 ans, ou 10-20 ans dans plusieurs entreprises du BTP) → 215j (10+ ans, ou 20+ ans dans plusieurs entreprises du BTP)',
      'Salaire minimum conventionnel majoré de 10% pour les cadres au forfait jours',
    ],
    notes: 'CCN des cadres du bâtiment du 1er juin 2004. Plafond dégressif selon ancienneté (218/216/215j), vérifié directement sur le texte Légifrance (KALITEXT000027448680). Contrairement aux ouvriers/ETAM du bâtiment, les minima cadres sont fixés au niveau national (sauf majoration Nord/Pas-de-Calais +2,78%).',
  }
,
  {
    idcc: 2494, nom: 'Coopération maritime', secteur: 'Coopération maritime',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2583, nom: 'Sociétés concessionnaires ou exploitantes d\'autoroutes', secteur: 'Autoroutes concessionnaires',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2603, nom: 'Praticiens-conseils du régime général de sécurité sociale', secteur: 'Praticiens-conseils sécu',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2609, nom: 'Employés, techniciens et agents de maîtrise du bâtiment', secteur: 'Bâtiment ETAM',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2614, nom: 'Employés, techniciens et agents de maîtrise des travaux publics', secteur: 'Travaux publics ETAM',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2642, nom: 'Production audiovisuelle', secteur: 'Production audiovisuelle',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2668, nom: 'Cadres supérieurs des sociétés de secours minières', secteur: 'Secours minières cadres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2697, nom: 'Personnels des structures associatives cynégétiques', secteur: 'Chasse associations',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2768, nom: 'Pharmaciens du régime minier', secteur: 'Pharmaciens régime minier',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2847, nom: 'Pôle Emploi', secteur: 'Pôle Emploi',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2978, nom: 'Personnel salarié des agences de recherches privées', secteur: 'Agences recherches privées',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }

];

const CCN_CD_DATA = [

  {
    idcc: 7018, nom: 'Entreprises du paysage — Cadres Dirigeants', secteur: 'Paysage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises du paysage — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Paysage.',
  }
,
  {
    idcc: 7024, nom: 'Production agricole et CUMA — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Production agricole et CUMA — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 7005, nom: 'Caves coopératives vinicoles — Cadres Dirigeants', secteur: 'Viticulture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Caves coopératives vinicoles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Viticulture.',
  }
,
  {
    idcc: 2728, nom: 'Sucre sucreries distilleries raffineries — Cadres Dirigeants', secteur: 'IAA sucre',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sucre sucreries distilleries raffineries — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA sucre.',
  }
,
  {
    idcc: 112, nom: 'Industrie laitière — Cadres Dirigeants', secteur: 'IAA laitier',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie laitière — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA laitier.',
  }
,
  {
    idcc: 843, nom: 'Boulangerie-pâtisserie artisanale — Cadres Dirigeants', secteur: 'Artisanat alimentaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Boulangerie-pâtisserie artisanale — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Artisanat alimentaire.',
  }
,
  {
    idcc: 953, nom: 'Charcuterie de détail — Cadres Dirigeants', secteur: 'Artisanat charcuterie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Charcuterie de détail — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Artisanat charcuterie.',
  }
,
  {
    idcc: 3253, nom: 'Cabinets d\'avocats (personnel salarié) — Cadres Dirigeants', secteur: 'Avocats',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets d\'avocats (personnel salarié) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Avocats.',
  }
,
  {
    idcc: 1987, nom: 'Pâtes alimentaires — Cadres Dirigeants', secteur: 'IAA pâtes',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pâtes alimentaires — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA pâtes.',
  }
,
  {
    idcc: 1596, nom: 'Bâtiment Ouvriers plus 10 salariés — Cadres Dirigeants', secteur: 'Bâtiment',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bâtiment Ouvriers plus 10 salariés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment.',
  }
,
  {
    idcc: 1597, nom: 'Bâtiment Ouvriers moins 10 salariés — Cadres Dirigeants', secteur: 'Bâtiment',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bâtiment Ouvriers moins 10 salariés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment.',
  }
,
  {
    idcc: 2332, nom: 'Architecture cabinets — Cadres Dirigeants', secteur: 'Architecture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Architecture cabinets — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Architecture.',
  }
,
  {
    idcc: 44, nom: 'Industries chimiques — Cadres Dirigeants', secteur: 'Industrie chimique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries chimiques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie chimique.',
  }
,
  {
    idcc: 1388, nom: 'Industrie du pétrole — Cadres Dirigeants', secteur: 'Energie pétrolière',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie du pétrole — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Energie pétrolière.',
  }
,
  {
    idcc: 292, nom: 'Plasturgie — Cadres Dirigeants', secteur: 'Industrie plastique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Plasturgie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie plastique.',
  }
,
  {
    idcc: 176, nom: 'Industrie pharmaceutique — Cadres Dirigeants', secteur: 'Industrie pharmaceutique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie pharmaceutique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie pharmaceutique.',
  }
,
  {
    idcc: 1555, nom: 'Fabrication commerce produits pharma para-pharma vétérinaire — Cadres Dirigeants', secteur: 'Pharmacie vétérinaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Fabrication commerce produits pharma para-pharma vétérinaire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Pharmacie vétérinaire.',
  }
,
  {
    idcc: 493, nom: 'Vins, cidres, jus de fruits, sirops, spiritueux et liqueurs de France — Cadres Dirigeants', secteur: 'Vins spiritueux',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Vins, cidres, jus de fruits, sirops, spiritueux et liqueurs de France — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Vins spiritueux.',
  }
,
  {
    idcc: 3238, nom: 'Papiers et cartons industries — Cadres Dirigeants', secteur: 'Industrie papier',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Papiers et cartons industries — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie papier.',
  }
,
  {
    idcc: 489, nom: 'Cartonnage industries — Cadres Dirigeants', secteur: 'Industrie cartonnage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cartonnage industries — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie cartonnage.',
  }
,
  {
    idcc: 3248, nom: 'Métallurgie accord national unique 2023 — Cadres Dirigeants', secteur: 'Métallurgie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Métallurgie accord national unique 2023 — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Métallurgie.',
  }
,
  {
    idcc: 2046, nom: 'Centres de lutte contre le cancer (CLCC) — Cadres Dirigeants', secteur: 'Santé oncologie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Centres de lutte contre le cancer (CLCC) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Santé oncologie.',
  }
,
  {
    idcc: 247, nom: 'Industries de l\'habillement — Cadres Dirigeants', secteur: 'Habillement',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries de l\'habillement — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Habillement.',
  }
,
  {
    idcc: 1580, nom: 'Chaussure industrie — Cadres Dirigeants', secteur: 'Industrie chaussure',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Chaussure industrie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie chaussure.',
  }
,
  {
    idcc: 2528, nom: 'Maroquinerie gainerie bracelets cuir — Cadres Dirigeants', secteur: 'Industrie maroquinerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Maroquinerie gainerie bracelets cuir — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie maroquinerie.',
  }
,
  {
    idcc: 5001, nom: 'Industries électriques et gazières IEG — Cadres Dirigeants', secteur: 'Energie EDF GDF',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries électriques et gazières IEG — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Energie EDF GDF.',
  }
,
  {
    idcc: 1413, nom: 'Salariés permanents des entreprises de travail temporaire — Cadres Dirigeants', secteur: 'Travail temporaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Salariés permanents des entreprises de travail temporaire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Travail temporaire.',
  }
,
  {
    idcc: 637, nom: 'Récupération industrie et commerces — Cadres Dirigeants', secteur: 'Recyclage récupération',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Récupération industrie et commerces — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Recyclage récupération.',
  }
,
  {
    idcc: 2216, nom: 'Grande distribution alimentaire supermarchés hypermarchés — Cadres Dirigeants', secteur: 'Grande distribution alim.',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Grande distribution alimentaire supermarchés hypermarchés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Grande distribution alim..',
  }
,
  {
    idcc: 573, nom: 'Commerce de gros alimentaire — Cadres Dirigeants', secteur: 'Commerce de gros alim.',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce de gros alimentaire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce de gros alim..',
  }
,
  {
    idcc: 5730, nom: 'Commerce de gros non alimentaire — Cadres Dirigeants', secteur: 'Commerce de gros non alim.',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce de gros non alimentaire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce de gros non alim..',
  }
,
  {
    idcc: 1501, nom: 'Restauration rapide — Cadres Dirigeants', secteur: 'Restauration rapide',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Restauration rapide — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Restauration rapide.',
  }
,
  {
    idcc: 1979, nom: 'Hôtels Cafés Restaurants HCR — Cadres Dirigeants', secteur: 'HCR',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Hôtels Cafés Restaurants HCR — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). HCR.',
  }
,
  {
    idcc: 1517, nom: 'Commerce de détail non alimentaire — Cadres Dirigeants', secteur: 'Commerce de détail',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce de détail non alimentaire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce de détail.',
  }
,
  {
    idcc: 1483, nom: 'Habillement commerce de détail — Cadres Dirigeants', secteur: 'Commerce textile',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Habillement commerce de détail — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce textile.',
  }
,
  {
    idcc: 468, nom: 'Chaussure commerce succursaliste — Cadres Dirigeants', secteur: 'Commerce chaussures',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Chaussure commerce succursaliste — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce chaussures.',
  }
,
  {
    idcc: 1431, nom: 'Optique lunetterie de détail — Cadres Dirigeants', secteur: 'Optique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Optique lunetterie de détail — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Optique.',
  }
,
  {
    idcc: 3255, nom: 'Activités industrielles de boulangerie et pâtisserie — Cadres Dirigeants', secteur: 'Boulangerie industrielle',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Activités industrielles de boulangerie et pâtisserie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Boulangerie industrielle.',
  }
,
  {
    idcc: 1996, nom: 'Pharmacies officine — Cadres Dirigeants', secteur: 'Pharmacie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pharmacies officine — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Pharmacie.',
  }
,
  {
    idcc: 1606, nom: 'Bricolage commerce de détail — Cadres Dirigeants', secteur: 'Commerce bricolage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bricolage commerce de détail — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce bricolage.',
  }
,
  {
    idcc: 993, nom: 'Prothèse dentaire laboratoires — Cadres Dirigeants', secteur: 'Santé dentaire labo',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Prothèse dentaire laboratoires — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Santé dentaire labo.',
  }
,
  {
    idcc: 3237, nom: 'Commerce de détail alimentaire spécialisé — Cadres Dirigeants', secteur: 'Commerce alim spécialisé',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce de détail alimentaire spécialisé — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce alim spécialisé.',
  }
,
  {
    idcc: 2596, nom: 'Coiffure entreprises — Cadres Dirigeants', secteur: 'Coiffure',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Coiffure entreprises — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Coiffure.',
  }
,
  {
    idcc: 1672, nom: 'Sociétés assurances — Cadres Dirigeants', secteur: 'Assurance',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sociétés assurances — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Assurance.',
  }
,
  {
    idcc: 2120, nom: 'Banques populaires — Cadres Dirigeants', secteur: 'Banque mutualiste',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Banques populaires — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Banque mutualiste.',
  }
,
  {
    idcc: 1351, nom: 'Prévention et sécurité privée gardiennage — Cadres Dirigeants', secteur: 'Sécurité privée',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Prévention et sécurité privée gardiennage — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Sécurité privée.',
  }
,
  {
    idcc: 3043, nom: 'Nettoyage entreprises de propreté — Cadres Dirigeants', secteur: 'Propreté',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Nettoyage entreprises de propreté — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Propreté.',
  }
,
  {
    idcc: 1527, nom: 'Immobilier agents gestionnaires syndics — Cadres Dirigeants', secteur: 'Immobilier',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Immobilier agents gestionnaires syndics — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Immobilier.',
  }
,
  {
    idcc: 1512, nom: 'Promotion immobilière — Cadres Dirigeants', secteur: 'Promotion immobilière',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Promotion immobilière — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Promotion immobilière.',
  }
,
  {
    idcc: 218, nom: 'Organismes de Sécurité sociale (UCANSS) — Cadres Dirigeants', secteur: 'Sécurité sociale',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Organismes de Sécurité sociale (UCANSS) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Sécurité sociale.',
  }
,
  {
    idcc: 3250, nom: 'Commissaires de justice et sociétés de ventes volontaires — Cadres Dirigeants', secteur: 'Commissaires justice ventes volontaires',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commissaires de justice et sociétés de ventes volontaires — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commissaires justice ventes volontaires.',
  }
,
  {
    idcc: 1486, nom: 'Syntec bureaux études techniques informatique ingénierie conseil — Cadres Dirigeants', secteur: 'IT ingénierie conseil',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Syntec bureaux études techniques informatique ingénierie conseil — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IT ingénierie conseil.',
  }
,
  {
    idcc: 2264, nom: 'Hospitalisation privée — Cadres Dirigeants', secteur: 'Santé privée',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Hospitalisation privée — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Santé privée.',
  }
,
  {
    idcc: 1922, nom: 'Radiodiffusion audiovisuel public et privé — Cadres Dirigeants', secteur: 'Audiovisuel',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Radiodiffusion audiovisuel public et privé — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Audiovisuel.',
  }
,
  {
    idcc: 184, nom: 'Imprimerie de labeur industries graphiques — Cadres Dirigeants', secteur: 'Imprimerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Imprimerie de labeur industries graphiques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Imprimerie.',
  }
,
  {
    idcc: 2121, nom: 'Edition livres presse multimédia — Cadres Dirigeants', secteur: 'Edition',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Edition livres presse multimédia — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Edition.',
  }
,
  {
    idcc: 1619, nom: 'Cabinets dentaires — Cadres Dirigeants', secteur: 'Santé dentaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets dentaires — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Santé dentaire.',
  }
,
  {
    idcc: 2941, nom: 'Aide accompagnement soins à domicile BASS — Cadres Dirigeants', secteur: 'Aide à domicile',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Aide accompagnement soins à domicile BASS — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Aide à domicile.',
  }
,
  {
    idcc: 413, nom: 'CCN 66 inadaptés handicapés — Cadres Dirigeants', secteur: 'Médico-social CCN 66',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'CCN 66 inadaptés handicapés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Médico-social CCN 66.',
  }
,
  {
    idcc: 3217, nom: 'Branche ferroviaire (CCN du 31 mai 2016) — Cadres Dirigeants', secteur: 'Transport ferroviaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Branche ferroviaire (CCN du 31 mai 2016) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport ferroviaire.',
  }
,
  {
    idcc: 2205, nom: 'Notariat — Cadres Dirigeants', secteur: 'Notariat',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Notariat — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Notariat.',
  }
,
  {
    idcc: 16, nom: 'Transport routier de marchandises — Cadres Dirigeants', secteur: 'Transport routier marchandises',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transport routier de marchandises — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport routier marchandises.',
  }
,
  {
    idcc: 2002, nom: 'Blanchisserie, teinturerie et nettoyage (pressing) — Cadres Dirigeants', secteur: 'Blanchisserie pressing',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Blanchisserie, teinturerie et nettoyage (pressing) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Blanchisserie pressing.',
  }
,
  {
    idcc: 5021, nom: 'Statut de la Fonction publique territoriale', secteur: 'Transport fluvial',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Navigation intérieure bateliers — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport fluvial.',
  }
,
  {
    idcc: 1631, nom: 'Organismes de tourisme et hôtellerie de plein air — Cadres Dirigeants', secteur: 'Tourisme',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Organismes de tourisme et hôtellerie de plein air — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Tourisme.',
  }
,
  {
    idcc: 2511, nom: 'Sport entreprises du secteur sportif — Cadres Dirigeants', secteur: 'Sport',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sport entreprises du secteur sportif — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Sport.',
  }
,
  {
    idcc: 2257, nom: 'Casinos — Cadres Dirigeants', secteur: 'Jeux casinos',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Casinos — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Jeux casinos.',
  }
,
  {
    idcc: 1516, nom: 'Formation professionnelle continue — Cadres Dirigeants', secteur: 'Formation professionnelle',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Formation professionnelle continue — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Formation professionnelle.',
  }
,
  {
    idcc: 1518, nom: 'Animation ÉCLAT structures employant animateurs — Cadres Dirigeants', secteur: 'Animation ESS',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Animation ÉCLAT structures employant animateurs — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Animation ESS.',
  }
,
  {
    idcc: 1261, nom: 'Centres sociaux et socio-culturels — Cadres Dirigeants', secteur: 'Action sociale',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Centres sociaux et socio-culturels — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Action sociale.',
  }
,
  {
    idcc: 2198, nom: 'Vente à distance e-commerce — Cadres Dirigeants', secteur: 'Commerce distance',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Vente à distance e-commerce — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce distance.',
  }
,
  {
    idcc: 29, nom: 'Médico-social FEHAP CCN 51 — Cadres Dirigeants', secteur: 'Médico-social FEHAP',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Médico-social FEHAP CCN 51 — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Médico-social FEHAP.',
  }
,
  {
    idcc: 43, nom: 'Import-export et commerce international — Cadres Dirigeants', secteur: 'Commerce international',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Import-export et commerce international — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce international.',
  }
,
  {
    idcc: 45, nom: 'Caoutchouc industrie — Cadres Dirigeants', secteur: 'Industrie caoutchouc',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Caoutchouc industrie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie caoutchouc.',
  }
,
  {
    idcc: 3222, nom: 'Menuiseries charpentes constructions industrialisées — Cadres Dirigeants', secteur: 'Industrie bois',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Menuiseries charpentes constructions industrialisées — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie bois.',
  }
,
  {
    idcc: 3249, nom: 'Industries de carrières et matériaux de construction — Cadres Dirigeants', secteur: 'Carrières matériaux construction',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries de carrières et matériaux de construction — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Carrières matériaux construction.',
  }
,
  {
    idcc: 158, nom: 'Bois scieries négoce importation — Cadres Dirigeants', secteur: 'Industrie bois négoce',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bois scieries négoce importation — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie bois négoce.',
  }
,
  {
    idcc: 3205, nom: 'Coopératives de consommation — Cadres Dirigeants', secteur: 'Coopératives',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Coopératives de consommation — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Coopératives.',
  }
,
  {
    idcc: 3244, nom: 'Professions réglementées auprès des juridictions — Cadres Dirigeants', secteur: 'Juridictions professions réglementées',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Professions réglementées auprès des juridictions — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Juridictions professions réglementées.',
  }
,
  {
    idcc: 275, nom: 'Transport aérien personnel au sol accord national — Cadres Dirigeants', secteur: 'Transport aérien sol',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transport aérien personnel au sol accord national — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport aérien sol.',
  }
,
  {
    idcc: 303, nom: 'Couture parisienne — Cadres Dirigeants', secteur: 'Mode couture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Couture parisienne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Mode couture.',
  }
,
  {
    idcc: 3216, nom: 'Ouvriers négoce matériaux construction — Cadres Dirigeants', secteur: 'Négoce matériaux',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Ouvriers négoce matériaux construction — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Négoce matériaux.',
  }
,
  {
    idcc: 3097, nom: 'Production cinématographique acteurs — Cadres Dirigeants', secteur: 'Cinéma production',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Production cinématographique acteurs — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Cinéma production.',
  }
,
  {
    idcc: 454, nom: 'Remontées mécaniques domaines skiables — Cadres Dirigeants', secteur: 'Tourisme ski',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Remontées mécaniques domaines skiables — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Tourisme ski.',
  }
,
  {
    idcc: 478, nom: 'Sociétés financières établissements financiers — Cadres Dirigeants', secteur: 'Finance',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sociétés financières établissements financiers — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Finance.',
  }
,
  {
    idcc: 500, nom: 'Commerce gros habillement mercerie chaussure jouet — Cadres Dirigeants', secteur: 'Commerce gros habillement',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce gros habillement mercerie chaussure jouet — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce gros habillement.',
  }
,
  {
    idcc: 538, nom: 'Manutention ferroviaire travaux connexes — Cadres Dirigeants', secteur: 'Transport ferroviaire manut.',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Manutention ferroviaire travaux connexes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport ferroviaire manut..',
  }
,
  {
    idcc: 18, nom: 'Industries textiles — Cadres Dirigeants', secteur: 'Industrie textile',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries textiles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie textile.',
  }
,
  {
    idcc: 669, nom: 'Industries de fabrication mécanique du verre — Cadres Dirigeants', secteur: 'Industrie verrière',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries de fabrication mécanique du verre — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie verrière.',
  }
,
  {
    idcc: 1930, nom: 'Métiers de la transformation des grains (meunerie) — Cadres Dirigeants', secteur: 'Meunerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Métiers de la transformation des grains (meunerie) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Meunerie.',
  }
,
  {
    idcc: 2336, nom: 'Habitat et logement accompagnés (ex-foyers de jeunes travailleurs) — Cadres Dirigeants', secteur: 'FJT habitat jeunes',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Habitat et logement accompagnés (ex-foyers de jeunes travailleurs) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). FJT habitat jeunes.',
  }
,
  {
    idcc: 2378, nom: 'Salariés intérimaires des entreprises de travail temporaire — Cadres Dirigeants', secteur: 'Travail temporaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Salariés intérimaires des entreprises de travail temporaire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Travail temporaire.',
  }
,
  {
    idcc: 3252, nom: 'Entreprises au service de la création et de l\'événement — Cadres Dirigeants', secteur: 'Création événement entreprises',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises au service de la création et de l\'événement — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Création événement entreprises.',
  }
,
  {
    idcc: 5619, nom: 'Pêche professionnelle maritime (CCN provisoire) — Cadres Dirigeants', secteur: 'Pêche maritime',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pêche professionnelle maritime (CCN provisoire) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Pêche maritime.',
  }
,
  {
    idcc: 653, nom: 'Producteurs salariés assurances services extérieurs — Cadres Dirigeants', secteur: 'Assurance producteurs',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Producteurs salariés assurances services extérieurs — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Assurance producteurs.',
  }
,
  {
    idcc: 716, nom: 'Employés ouvriers distribution cinématographique — Cadres Dirigeants', secteur: 'Cinéma distribution',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Employés ouvriers distribution cinématographique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Cinéma distribution.',
  }
,
  {
    idcc: 3243, nom: 'Commerces de quincaillerie, fournitures industrielles, fers, métaux et équipements de la maison — Cadres Dirigeants', secteur: 'Quincaillerie fournitures',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerces de quincaillerie, fournitures industrielles, fers, métaux et équipements de la maison — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Quincaillerie fournitures.',
  }
,
  {
    idcc: 733, nom: 'Détaillants en chaussures — Cadres Dirigeants', secteur: 'Commerce chaussures détail',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Détaillants en chaussures — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce chaussures détail.',
  }
,
  {
    idcc: 759, nom: 'Pompes funèbres — Cadres Dirigeants', secteur: 'Services funéraires',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pompes funèbres — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Services funéraires.',
  }
,
  {
    idcc: 787, nom: 'Cabinets experts-comptables commissaires aux comptes — Cadres Dirigeants', secteur: 'Finance audit comptable',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets experts-comptables commissaires aux comptes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Finance audit comptable.',
  }
,
  {
    idcc: 3224, nom: 'Distribution et commerce de gros des papiers-cartons — Cadres Dirigeants', secteur: 'Distribution papiers cartons',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distribution et commerce de gros des papiers-cartons — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Distribution papiers cartons.',
  }
,
  {
    idcc: 804, nom: 'Voyageurs représentants placiers VRP accord national — Cadres Dirigeants', secteur: 'VRP',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Voyageurs représentants placiers VRP accord national — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). VRP.',
  }
,
  {
    idcc: 892, nom: 'Cadres distribution films cinéma — Cadres Dirigeants', secteur: 'Cinéma distribution cadres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cadres distribution films cinéma — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Cinéma distribution cadres.',
  }
,
  {
    idcc: 897, nom: 'Services de santé au travail interentreprises — Cadres Dirigeants', secteur: 'Santé travail',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Services de santé au travail interentreprises — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Santé travail.',
  }
,
  {
    idcc: 915, nom: 'Expertises évaluations industrielles commerciales — Cadres Dirigeants', secteur: 'Expertise évaluation',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Expertises évaluations industrielles commerciales — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Expertise évaluation.',
  }
,
  {
    idcc: 959, nom: 'Laboratoires analyses médicales extra-hospitaliers — Cadres Dirigeants', secteur: 'Biologie médicale labo',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Laboratoires analyses médicales extra-hospitaliers — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Biologie médicale labo.',
  }
,
  {
    idcc: 3254, nom: 'Boucherie-Poissonnerie — Cadres Dirigeants', secteur: 'Boucherie poissonnerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Boucherie-Poissonnerie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Boucherie poissonnerie.',
  }
,
  {
    idcc: 998, nom: 'Exploitation équipements thermiques génie climatique — Cadres Dirigeants', secteur: 'Génie climatique exploitation',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitation équipements thermiques génie climatique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Génie climatique exploitation.',
  }
,
  {
    idcc: 1043, nom: 'Gardiens concierges employés immeubles résidences — Cadres Dirigeants', secteur: 'Gardiennage immeuble',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Gardiens concierges employés immeubles résidences — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Gardiennage immeuble.',
  }
,
  {
    idcc: 1077, nom: 'Négoce industrie produits sol engrais — Cadres Dirigeants', secteur: 'Négoce agricole',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Négoce industrie produits sol engrais — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Négoce agricole.',
  }
,
  {
    idcc: 1090, nom: 'Commerce réparation automobile cycle motocycle — Cadres Dirigeants', secteur: 'Automobile commerce réparation',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce réparation automobile cycle motocycle — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Automobile commerce réparation.',
  }
,
  {
    idcc: 1170, nom: 'Industrie tuiles et briques CCNTB — Cadres Dirigeants', secteur: 'Industrie matériaux',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie tuiles et briques CCNTB — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie matériaux.',
  }
,
  {
    idcc: 1256, nom: 'Cadres entreprises équipements thermiques climatisation — Cadres Dirigeants', secteur: 'Génie climatique cadres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cadres entreprises équipements thermiques climatisation — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Génie climatique cadres.',
  }
,
  {
    idcc: 1267, nom: 'Pâtisserie — Cadres Dirigeants', secteur: 'Artisanat pâtisserie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pâtisserie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Artisanat pâtisserie.',
  }
,
  {
    idcc: 1286, nom: 'Confiserie chocolaterie biscuiterie détail artisans — Cadres Dirigeants', secteur: 'Artisanat confiserie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Confiserie chocolaterie biscuiterie détail artisans — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Artisanat confiserie.',
  }
,
  {
    idcc: 1307, nom: 'Exploitation cinématographique — Cadres Dirigeants', secteur: 'Cinéma exploitation',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitation cinématographique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Cinéma exploitation.',
  }
,
  {
    idcc: 1405, nom: 'Expédition exportation fruits légumes — Cadres Dirigeants', secteur: 'Commerce fruits légumes',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Expédition exportation fruits légumes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce fruits légumes.',
  }
,
  {
    idcc: 1408, nom: 'Distribution logistique services énergies proximité — Cadres Dirigeants', secteur: 'Distribution énergie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distribution logistique services énergies proximité — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Distribution énergie.',
  }
,
  {
    idcc: 1412, nom: 'Installation entretien réparation matériel thermique frigorifique — Cadres Dirigeants', secteur: 'Génie climatique install.',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Installation entretien réparation matériel thermique frigorifique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Génie climatique install..',
  }
,
  {
    idcc: 2335, nom: 'Personnel agences générales assurances — Cadres Dirigeants', secteur: 'Assurance agences personnel',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel agences générales assurances — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Assurance agences personnel.',
  }
,
  {
    idcc: 2683, nom: 'Portage de presse — Cadres Dirigeants', secteur: 'Presse portage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Portage de presse — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Presse portage.',
  }
,
  {
    idcc: 2691, nom: 'Enseignement privé indépendant — Cadres Dirigeants', secteur: 'Education privée',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Enseignement privé indépendant — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Education privée.',
  }
,
  {
    idcc: 2727, nom: 'Omnipraticiens entreprises privées — Cadres Dirigeants', secteur: 'Santé omnipraticiens',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Omnipraticiens entreprises privées — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Santé omnipraticiens.',
  }
,
  {
    idcc: 2931, nom: 'Activités marchés financiers — Cadres Dirigeants', secteur: 'Finance marchés',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Activités marchés financiers — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Finance marchés.',
  }
,
  {
    idcc: 2972, nom: 'Personnel sédentaire navigation — Cadres Dirigeants', secteur: 'Transport maritime',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel sédentaire navigation — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport maritime.',
  }
,
  {
    idcc: 3013, nom: 'Librairie indépendante — Cadres Dirigeants', secteur: 'Commerce librairie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Librairie indépendante — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce librairie.',
  }
,
  {
    idcc: 3016, nom: 'Ateliers chantiers insertion — Cadres Dirigeants', secteur: 'Insertion professionnelle',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Ateliers chantiers insertion — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Insertion professionnelle.',
  }
,
  {
    idcc: 3017, nom: 'Ports et manutention unifiée — Cadres Dirigeants', secteur: 'Transport maritime port',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Ports et manutention unifiée — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport maritime port.',
  }
,
  {
    idcc: 3032, nom: 'Esthétique cosmétique parfumerie — Cadres Dirigeants', secteur: 'Esthétique beauté',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Esthétique cosmétique parfumerie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Esthétique beauté.',
  }
,
  {
    idcc: 3109, nom: 'Métiers du commerce détail alimentaire spécialisé 5 branches — Cadres Dirigeants', secteur: 'Commerce alim spécialisé 5B',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Métiers du commerce détail alimentaire spécialisé 5 branches — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce alim spécialisé 5B.',
  }
,
  {
    idcc: 3127, nom: 'Entreprises services à la personne — Cadres Dirigeants', secteur: 'Services personne',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises services à la personne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Services personne.',
  }
,
  {
    idcc: 3203, nom: 'Structures coopératives agricoles bétail viande — Cadres Dirigeants', secteur: 'Coopérative viande',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Structures coopératives agricoles bétail viande — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Coopérative viande.',
  }
,
  {
    idcc: 2543, nom: 'Cabinets géomètres-experts topographes — Cadres Dirigeants', secteur: 'Géomètre expert',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets géomètres-experts topographes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Géomètre expert.',
  }
,
  {
    idcc: 3230, nom: 'Presse quotidienne et hebdomadaire — Cadres Dirigeants', secteur: 'Presse',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Presse quotidienne et hebdomadaire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Presse.',
  }
,
  {
    idcc: 3239, nom: 'Particuliers employeurs emploi à domicile — Cadres Dirigeants', secteur: 'Emploi domicile',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Particuliers employeurs emploi à domicile — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Emploi domicile.',
  }
,
  {
    idcc: 1607, nom: 'Jeux jouets articles de fêtes puériculture — Cadres Dirigeants', secteur: 'Industrie jouets puériculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Jeux jouets articles de fêtes puériculture — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie jouets puériculture.',
  }
,
  {
    idcc: 1266, nom: 'Restauration de collectivités — Cadres Dirigeants', secteur: 'Restauration collective',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Restauration de collectivités — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Restauration collective.',
  }
,
  {
    idcc: 1978, nom: 'Fleuristes vente et services animaux familiers — Cadres Dirigeants', secteur: 'Fleuristes animalerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Fleuristes vente et services animaux familiers — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Fleuristes animalerie.',
  }
,
  {
    idcc: 2247, nom: 'Courtage assurances et réassurances — Cadres Dirigeants', secteur: 'Assurance courtage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Courtage assurances et réassurances — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Assurance courtage.',
  }
,
  {
    idcc: 7002, nom: 'Coopératives agricoles céréales meunerie alimentation bétail oléagineux — Cadres Dirigeants', secteur: 'Coopératives agricoles',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Coopératives agricoles céréales meunerie alimentation bétail oléagineux — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Coopératives agricoles.',
  }
,
  {
    idcc: 86, nom: 'Entreprises de publicité et assimilées — Cadres Dirigeants', secteur: 'Publicité',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises de publicité et assimilées — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Publicité.',
  }
,
  {
    idcc: 200, nom: 'Exploitations frigorifiques — Cadres Dirigeants', secteur: 'Froid industriel',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations frigorifiques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Froid industriel.',
  }
,
  {
    idcc: 306, nom: 'Cadres techniques de la presse quotidienne parisienne — Cadres Dirigeants', secteur: 'Presse parisienne cadres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cadres techniques de la presse quotidienne parisienne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Presse parisienne cadres.',
  }
,
  {
    idcc: 394, nom: 'Employés de la presse quotidienne parisienne — Cadres Dirigeants', secteur: 'Presse parisienne employés',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Employés de la presse quotidienne parisienne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Presse parisienne employés.',
  }
,
  {
    idcc: 405, nom: 'Établissements médico-sociaux UNISSS FFESCPE (enfants, adolescents) — Cadres Dirigeants', secteur: 'Médico-social enfants',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Établissements médico-sociaux UNISSS FFESCPE (enfants, adolescents) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Médico-social enfants.',
  }
,
  {
    idcc: 509, nom: 'Cadres administratifs de la presse quotidienne parisienne — Cadres Dirigeants', secteur: 'Presse parisienne administratifs',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cadres administratifs de la presse quotidienne parisienne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Presse parisienne administratifs.',
  }
,
  {
    idcc: 3251, nom: 'Bijouterie, joaillerie, orfèvrerie — Cadres Dirigeants', secteur: 'Bijouterie joaillerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bijouterie, joaillerie, orfèvrerie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bijouterie joaillerie.',
  }
,
  {
    idcc: 675, nom: 'Maisons à succursales de vente au détail d\'habillement — Cadres Dirigeants', secteur: 'Habillement succursales',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Maisons à succursales de vente au détail d\'habillement — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Habillement succursales.',
  }
,
  {
    idcc: 783, nom: 'Centres d\'hébergement et de réadaptation sociale (CHRS, SOP) — Cadres Dirigeants', secteur: 'Hébergement réadaptation sociale',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Centres d\'hébergement et de réadaptation sociale (CHRS, SOP) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Hébergement réadaptation sociale.',
  }
,
  {
    idcc: 1031, nom: 'Fédération nationale des associations familiales rurales (FNAFR) — Cadres Dirigeants', secteur: 'Associations familiales rurales',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Fédération nationale des associations familiales rurales (FNAFR) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Associations familiales rurales.',
  }
,
  {
    idcc: 1147, nom: 'Personnel des cabinets médicaux — Cadres Dirigeants', secteur: 'Cabinets médicaux',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel des cabinets médicaux — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Cabinets médicaux.',
  }
,
  {
    idcc: 1182, nom: 'Personnels des ports de plaisance — Cadres Dirigeants', secteur: 'Ports de plaisance',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnels des ports de plaisance — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Ports de plaisance.',
  }
,
  {
    idcc: 1285, nom: 'Entreprises artistiques et culturelles (SYNDEAC) — Cadres Dirigeants', secteur: 'Entreprises artistiques culturelles',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises artistiques et culturelles (SYNDEAC) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Entreprises artistiques culturelles.',
  }
,
  {
    idcc: 1311, nom: 'Restauration ferroviaire — Cadres Dirigeants', secteur: 'Restauration ferroviaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Restauration ferroviaire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Restauration ferroviaire.',
  }
,
  {
    idcc: 1316, nom: 'Organismes de tourisme social et familial — Cadres Dirigeants', secteur: 'Tourisme social familial',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Organismes de tourisme social et familial — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Tourisme social familial.',
  }
,
  {
    idcc: 1396, nom: 'Industries de produits alimentaires élaborés — Cadres Dirigeants', secteur: 'Produits alimentaires élaborés',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries de produits alimentaires élaborés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Produits alimentaires élaborés.',
  }
,
  {
    idcc: 1404, nom: 'Commerce, location, réparation de tracteurs et matériels agricoles, TP, bâtiment, motoculture (SEDIMA) — Cadres Dirigeants', secteur: 'Matériels agricoles TP SEDIMA',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce, location, réparation de tracteurs et matériels agricoles, TP, bâtiment, motoculture (SEDIMA) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Matériels agricoles TP SEDIMA.',
  }
,
  {
    idcc: 1411, nom: 'Fabrication de l\'ameublement — Cadres Dirigeants', secteur: 'Ameublement fabrication',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Fabrication de l\'ameublement — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Ameublement fabrication.',
  }
,
  {
    idcc: 1424, nom: 'Réseaux de transports publics urbains de voyageurs — Cadres Dirigeants', secteur: 'Transports urbains voyageurs',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Réseaux de transports publics urbains de voyageurs — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transports urbains voyageurs.',
  }
,
  {
    idcc: 1468, nom: 'Branche du Crédit mutuel — Cadres Dirigeants', secteur: 'Crédit mutuel',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Branche du Crédit mutuel — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Crédit mutuel.',
  }
,
  {
    idcc: 1480, nom: 'Journalistes — Cadres Dirigeants', secteur: 'Journalisme',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Journalistes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Journalisme.',
  }
,
  {
    idcc: 1487, nom: 'Commerce de détail de l\'horlogerie-bijouterie — Cadres Dirigeants', secteur: 'Horlogerie bijouterie détail',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce de détail de l\'horlogerie-bijouterie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Horlogerie bijouterie détail.',
  }
,
  {
    idcc: 1499, nom: 'Miroiterie, transformation et négoce du verre — Cadres Dirigeants', secteur: 'Miroiterie verre',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Miroiterie, transformation et négoce du verre — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Miroiterie verre.',
  }
,
  {
    idcc: 1505, nom: 'Commerce de détail alimentaire non spécialisé — Cadres Dirigeants', secteur: 'Alimentaire détail non spécialisé',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce de détail alimentaire non spécialisé — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Alimentaire détail non spécialisé.',
  }
,
  {
    idcc: 1513, nom: 'Activités de production des eaux embouteillées, boissons rafraîchissantes sans alcool et bière — Cadres Dirigeants', secteur: 'Eaux embouteillées boissons',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Activités de production des eaux embouteillées, boissons rafraîchissantes sans alcool et bière — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Eaux embouteillées boissons.',
  }
,
  {
    idcc: 1534, nom: 'Entreprises de l\'industrie et des commerces en gros des viandes — Cadres Dirigeants', secteur: 'Commerce gros viandes',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises de l\'industrie et des commerces en gros des viandes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce gros viandes.',
  }
,
  {
    idcc: 1536, nom: 'Distributeurs conseils hors domicile (CHD) — Cadres Dirigeants', secteur: 'Distributeurs boissons CHD',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distributeurs conseils hors domicile (CHD) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Distributeurs boissons CHD.',
  }
,
  {
    idcc: 1539, nom: 'Commerces de détail de papeterie, fournitures de bureau, bureautique, informatique et librairie — Cadres Dirigeants', secteur: 'Papeterie fournitures bureau',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerces de détail de papeterie, fournitures de bureau, bureautique, informatique et librairie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Papeterie fournitures bureau.',
  }
,
  {
    idcc: 1557, nom: 'Commerce des articles de sports et d\'équipements de loisirs — Cadres Dirigeants', secteur: 'Sports équipements loisirs',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce des articles de sports et d\'équipements de loisirs — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Sports équipements loisirs.',
  }
,
  {
    idcc: 1558, nom: 'Personnel des industries céramiques de France — Cadres Dirigeants', secteur: 'Industries céramiques',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel des industries céramiques de France — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industries céramiques.',
  }
,
  {
    idcc: 1586, nom: 'Industrie de la salaison, charcuterie en gros et conserves de viandes — Cadres Dirigeants', secteur: 'Salaison charcuterie gros',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie de la salaison, charcuterie en gros et conserves de viandes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Salaison charcuterie gros.',
  }
,
  {
    idcc: 1589, nom: 'Mareyeurs-expéditeurs — Cadres Dirigeants', secteur: 'Mareyeurs expéditeurs',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Mareyeurs-expéditeurs — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Mareyeurs expéditeurs.',
  }
,
  {
    idcc: 1605, nom: 'Entreprises de désinfection, désinsectisation, dératisation (3D) — Cadres Dirigeants', secteur: 'Désinfection dératisation',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises de désinfection, désinsectisation, dératisation (3D) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Désinfection dératisation.',
  }
,
  {
    idcc: 1611, nom: 'Entreprises de logistique de communication écrite directe — Cadres Dirigeants', secteur: 'Logistique publicité directe',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises de logistique de communication écrite directe — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Logistique publicité directe.',
  }
,
  {
    idcc: 1612, nom: 'Personnel navigant des essais et réceptions — Cadres Dirigeants', secteur: 'Aviation essais réceptions',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel navigant des essais et réceptions — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Aviation essais réceptions.',
  }
,
  {
    idcc: 1621, nom: 'Répartition pharmaceutique — Cadres Dirigeants', secteur: 'Répartition pharmaceutique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Répartition pharmaceutique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Répartition pharmaceutique.',
  }
,
  {
    idcc: 1671, nom: 'Maisons d\'étudiants — Cadres Dirigeants', secteur: 'Maisons d\'étudiants',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Maisons d\'étudiants — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Maisons d\'étudiants.',
  }
,
  {
    idcc: 1679, nom: 'Inspection d\'assurance — Cadres Dirigeants', secteur: 'Inspection d\'assurance',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Inspection d\'assurance — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Inspection d\'assurance.',
  }
,
  {
    idcc: 1686, nom: 'Commerces et services de l\'audiovisuel, de l\'électronique et de l\'équipement ménager — Cadres Dirigeants', secteur: 'Audiovisuel électroménager',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerces et services de l\'audiovisuel, de l\'électronique et de l\'équipement ménager — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Audiovisuel électroménager.',
  }
,
  {
    idcc: 1702, nom: 'Ouvriers de travaux publics — Cadres Dirigeants', secteur: 'Travaux publics ouvriers',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Ouvriers de travaux publics — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Travaux publics ouvriers.',
  }
,
  {
    idcc: 1760, nom: 'Jardineries et graineteries — Cadres Dirigeants', secteur: 'Jardineries graineteries',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Jardineries et graineteries — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Jardineries graineteries.',
  }
,
  {
    idcc: 1790, nom: 'Espaces de loisirs, d\'attractions et culturels — Cadres Dirigeants', secteur: 'Loisirs attractions culturels',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Espaces de loisirs, d\'attractions et culturels — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Loisirs attractions culturels.',
  }
,
  {
    idcc: 1794, nom: 'Personnel des institutions de retraite complémentaire — Cadres Dirigeants', secteur: 'Retraite complémentaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel des institutions de retraite complémentaire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Retraite complémentaire.',
  }
,
  {
    idcc: 1801, nom: 'Sociétés d\'assistance — Cadres Dirigeants', secteur: 'Sociétés d\'assistance',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sociétés d\'assistance — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Sociétés d\'assistance.',
  }
,
  {
    idcc: 1821, nom: 'Professions regroupées du cristal, du verre et du vitrail — Cadres Dirigeants', secteur: 'Cristal verre vitrail',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Professions regroupées du cristal, du verre et du vitrail — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Cristal verre vitrail.',
  }
,
  {
    idcc: 1875, nom: 'Cabinets et cliniques vétérinaires, personnel salarié — Cadres Dirigeants', secteur: 'Cliniques vétérinaires',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets et cliniques vétérinaires, personnel salarié — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Cliniques vétérinaires.',
  }
,
  {
    idcc: 1880, nom: 'Négoce de l\'ameublement — Cadres Dirigeants', secteur: 'Négoce ameublement',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Négoce de l\'ameublement — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Négoce ameublement.',
  }
,
  {
    idcc: 1909, nom: 'Organismes de tourisme — Cadres Dirigeants', secteur: 'Organismes de tourisme',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Organismes de tourisme — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Organismes de tourisme.',
  }
,
  {
    idcc: 1938, nom: 'Industries de la transformation des volailles — Cadres Dirigeants', secteur: 'Transformation volailles',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries de la transformation des volailles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transformation volailles.',
  }
,
  {
    idcc: 1944, nom: 'Personnel navigant technique des exploitants d\'hélicoptères — Cadres Dirigeants', secteur: 'Hélicoptères personnel navigant',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel navigant technique des exploitants d\'hélicoptères — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Hélicoptères personnel navigant.',
  }
,
  {
    idcc: 1951, nom: 'Cabinets ou entreprises d\'expertises en automobile — Cadres Dirigeants', secteur: 'Expertise automobile',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets ou entreprises d\'expertises en automobile — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Expertise automobile.',
  }
,
  {
    idcc: 1982, nom: 'Négoce et prestations de services dans les domaines médico-techniques — Cadres Dirigeants', secteur: 'Médico-technique négoce',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Négoce et prestations de services dans les domaines médico-techniques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Médico-technique négoce.',
  }
,
  {
    idcc: 2021, nom: 'Golf — Cadres Dirigeants', secteur: 'Golf',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Golf — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Golf.',
  }
,
  {
    idcc: 2060, nom: 'Chaînes de cafétérias et assimilés — Cadres Dirigeants', secteur: 'Cafétérias chaînes',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Chaînes de cafétérias et assimilés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Cafétérias chaînes.',
  }
,
  {
    idcc: 7025, nom: 'ETARF entreprises travaux et services agricoles ruraux forestiers — Cadres Dirigeants', secteur: 'Agriculture ETARF',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'ETARF entreprises travaux et services agricoles ruraux forestiers — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture ETARF.',
  }
,
  {
    idcc: 7502, nom: 'Mutualité sociale agricole — Cadres Dirigeants', secteur: 'MSA',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Mutualité sociale agricole — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). MSA.',
  }
,
  {
    idcc: 7503, nom: 'Distilleries coopératives viticoles — Cadres Dirigeants', secteur: 'Viticulture distillerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distilleries coopératives viticoles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Viticulture distillerie.',
  }
,
  {
    idcc: 7508, nom: 'Maisons familiales rurales — Cadres Dirigeants', secteur: 'Enseignement rural',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Maisons familiales rurales — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Enseignement rural.',
  }
,
  {
    idcc: 7513, nom: 'Centres initiatives en milieu rural — Cadres Dirigeants', secteur: 'Développement rural',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Centres initiatives en milieu rural — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Développement rural.',
  }
,
  {
    idcc: 7514, nom: 'Organismes de la Confédération paysanne — Cadres Dirigeants', secteur: 'Syndicat agricole',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Organismes de la Confédération paysanne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Syndicat agricole.',
  }
,
  {
    idcc: 3090, nom: 'Entreprises privées du spectacle vivant — Cadres Dirigeants', secteur: 'Spectacle vivant privé',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises privées du spectacle vivant — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Spectacle vivant privé.',
  }
,
  {
    idcc: 3219, nom: 'Branche des salariés en portage salarial — Cadres Dirigeants', secteur: 'Portage salarial',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Branche des salariés en portage salarial — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Portage salarial.',
  }
,
  {
    idcc: 7017, nom: 'Parcs et jardins zoologiques — Cadres Dirigeants', secteur: 'Zoos parcs animaliers',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Parcs et jardins zoologiques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Zoos parcs animaliers.',
  }
,
  {
    idcc: 3105, nom: 'Régies de quartier — Cadres Dirigeants', secteur: 'Régies de quartier',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Régies de quartier — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Régies de quartier.',
  }
,
  {
    idcc: 3168, nom: 'Professions de la photographie — Cadres Dirigeants', secteur: 'Photographie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Professions de la photographie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Photographie.',
  }
,
  {
    idcc: 3210, nom: 'Banque Populaire — Cadres Dirigeants', secteur: 'Banque Populaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Banque Populaire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Banque Populaire.',
  }
,
  {
    idcc: 3212, nom: 'Cadres des travaux publics — Cadres Dirigeants', secteur: 'Travaux publics cadres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cadres des travaux publics — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Travaux publics cadres.',
  }
,
  {
    idcc: 3213, nom: 'Économistes de la construction et métreurs-vérificateurs — Cadres Dirigeants', secteur: 'Économistes construction',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Économistes de la construction et métreurs-vérificateurs — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Économistes construction.',
  }
,
  {
    idcc: 3218, nom: 'Enseignement privé non lucratif — Cadres Dirigeants', secteur: 'Enseignement privé non lucratif',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Enseignement privé non lucratif — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Enseignement privé non lucratif.',
  }
,
  {
    idcc: 3220, nom: 'Offices publics de l\'habitat — Cadres Dirigeants', secteur: 'Offices publics habitat',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Offices publics de l\'habitat — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Offices publics habitat.',
  }
,
  {
    idcc: 3221, nom: 'Agences de presse (employés, techniciens, cadres) — Cadres Dirigeants', secteur: 'Agences de presse',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Agences de presse (employés, techniciens, cadres) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agences de presse.',
  }
,
  {
    idcc: 3223, nom: 'Transports et services maritimes, personnels navigants officiers — Cadres Dirigeants', secteur: 'Transports maritimes officiers',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transports et services maritimes, personnels navigants officiers — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transports maritimes officiers.',
  }
,
  {
    idcc: 3225, nom: 'Éditeurs de la presse magazine (employés et cadres) — Cadres Dirigeants', secteur: 'Presse magazine',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Éditeurs de la presse magazine (employés et cadres) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Presse magazine.',
  }
,
  {
    idcc: 3228, nom: 'Armateurs de services de passages d\'eau, personnel navigant — Cadres Dirigeants', secteur: 'Passages d\'eau navigants',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Armateurs de services de passages d\'eau, personnel navigant — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Passages d\'eau navigants.',
  }
,
  {
    idcc: 3229, nom: 'Personnel sédentaire du transport de marchandises en navigation intérieure — Cadres Dirigeants', secteur: 'Navigation intérieure marchandises',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel sédentaire du transport de marchandises en navigation intérieure — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Navigation intérieure marchandises.',
  }
,
  {
    idcc: 3232, nom: 'Agents de direction des organismes du régime général de sécurité sociale — Cadres Dirigeants', secteur: 'Sécu agents de direction',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Agents de direction des organismes du régime général de sécurité sociale — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Sécu agents de direction.',
  }
,
  {
    idcc: 3233, nom: 'Industrie de la fabrication des ciments — Cadres Dirigeants', secteur: 'Ciment fabrication',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie de la fabrication des ciments — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Ciment fabrication.',
  }
,
  {
    idcc: 3235, nom: 'Parfumerie sélective — Cadres Dirigeants', secteur: 'Parfumerie sélective',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Parfumerie sélective — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Parfumerie sélective.',
  }
,
  {
    idcc: 3236, nom: 'Industrie et services nautiques — Cadres Dirigeants', secteur: 'Nautisme',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie et services nautiques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Nautisme.',
  }
,
  {
    idcc: 3241, nom: 'Télédiffusion — Cadres Dirigeants', secteur: 'Télédiffusion',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Télédiffusion — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Télédiffusion.',
  }
,
  {
    idcc: 3242, nom: 'Presse quotidienne et hebdomadaire en régions — Cadres Dirigeants', secteur: 'Presse régionale',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Presse quotidienne et hebdomadaire en régions — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Presse régionale.',
  }
,
  {
    idcc: 3245, nom: 'Opérateurs de voyages et guides — Cadres Dirigeants', secteur: 'Voyages guides',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Opérateurs de voyages et guides — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Voyages guides.',
  }
,
  {
    idcc: 214, nom: 'Presse Région parisienne ouvriers — Cadres Dirigeants', secteur: 'Presse Région parisienne ouvriers',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Presse Région parisienne ouvriers — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Presse Région parisienne ouvriers.',
  }
,
  {
    idcc: 379, nom: 'Commerces Martinique — Cadres Dirigeants', secteur: 'Commerces Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerces Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerces Martinique.',
  }
,
  {
    idcc: 440, nom: 'Sucrerie Réunion — Cadres Dirigeants', secteur: 'Sucrerie Réunion',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sucrerie Réunion — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Sucrerie Réunion.',
  }
,
  {
    idcc: 627, nom: 'Bâtiment TP ETAM La Réunion — Cadres Dirigeants', secteur: 'Bâtiment TP ETAM La Réunion',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bâtiment TP ETAM La Réunion — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment TP ETAM La Réunion.',
  }
,
  {
    idcc: 749, nom: 'Bâtiment TP ouvriers Martinique — Cadres Dirigeants', secteur: 'Bâtiment TP ouvriers Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bâtiment TP ouvriers Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment TP ouvriers Martinique.',
  }
,
  {
    idcc: 771, nom: 'Bâtiment TP Cadres La Réunion — Cadres Dirigeants', secteur: 'Bâtiment TP Cadres La Réunion',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bâtiment TP Cadres La Réunion — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment TP Cadres La Réunion.',
  }
,
  {
    idcc: 901, nom: 'Boulangerie Martinique — Cadres Dirigeants', secteur: 'Boulangerie Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Boulangerie Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Boulangerie Martinique.',
  }
,
  {
    idcc: 919, nom: 'Personnel des garages de la Martinique — Cadres Dirigeants', secteur: 'Personnel des garages de la Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel des garages de la Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Personnel des garages de la Martinique.',
  }
,
  {
    idcc: 1049, nom: 'Bâtiment TP ouvriers St Pierre Miquelon — Cadres Dirigeants', secteur: 'Bâtiment TP ouvriers St Pierre Miquelon',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bâtiment TP ouvriers St Pierre Miquelon — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment TP ouvriers St Pierre Miquelon.',
  }
,
  {
    idcc: 1050, nom: 'Commerces St Pierre Miquelon — Cadres Dirigeants', secteur: 'Commerces St Pierre Miquelon',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerces St Pierre Miquelon — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerces St Pierre Miquelon.',
  }
,
  {
    idcc: 1057, nom: 'Consignataire de navires Martinique — Cadres Dirigeants', secteur: 'Consignataire de navires Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Consignataire de navires Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Consignataire de navires Martinique.',
  }
,
  {
    idcc: 1060, nom: 'Métallurgie Martinique — Cadres Dirigeants', secteur: 'Métallurgie Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Métallurgie Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Métallurgie Martinique.',
  }
,
  {
    idcc: 1069, nom: 'Répartition pharmaceutique Martinique — Cadres Dirigeants', secteur: 'Répartition pharmaceutique Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Répartition pharmaceutique Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Répartition pharmaceutique Martinique.',
  }
,
  {
    idcc: 1072, nom: 'Manutention portuaire St Pierre — Cadres Dirigeants', secteur: 'Manutention portuaire St Pierre',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Manutention portuaire St Pierre — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Manutention portuaire St Pierre.',
  }
,
  {
    idcc: 1140, nom: 'Hôtels St Pierre Miquelon — Cadres Dirigeants', secteur: 'Hôtels St Pierre Miquelon',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Hôtels St Pierre Miquelon — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Hôtels St Pierre Miquelon.',
  }
,
  {
    idcc: 1203, nom: 'Commerces services Guadeloupe — Cadres Dirigeants', secteur: 'Commerces services Guadeloupe',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerces services Guadeloupe — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerces services Guadeloupe.',
  }
,
  {
    idcc: 1225, nom: 'Commerces la Réunion — Cadres Dirigeants', secteur: 'Commerces la Réunion',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerces la Réunion — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerces la Réunion.',
  }
,
  {
    idcc: 1232, nom: 'Hôtellerie Guadeloupe — Cadres Dirigeants', secteur: 'Hôtellerie Guadeloupe',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Hôtellerie Guadeloupe — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Hôtellerie Guadeloupe.',
  }
,
  {
    idcc: 1247, nom: 'Commerces de l\'automobile la Réunion — Cadres Dirigeants', secteur: 'Commerces de l\'automobile la Réunion',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerces de l\'automobile la Réunion — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerces de l\'automobile la Réunion.',
  }
,
  {
    idcc: 1257, nom: 'Pharmacie d\'officine Réunion — Cadres Dirigeants', secteur: 'Pharmacie d\'officine Réunion',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pharmacie d\'officine Réunion — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Pharmacie d\'officine Réunion.',
  }
,
  {
    idcc: 1341, nom: 'Industrie agro alimentaires Réunion — Cadres Dirigeants', secteur: 'Industrie agro alimentaires Réunion',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie agro alimentaires Réunion — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie agro alimentaires Réunion.',
  }
,
  {
    idcc: 1565, nom: 'Soins infirmiers à domicile Guadeloupe — Cadres Dirigeants', secteur: 'Soins infirmiers à domicile Guadeloupe',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Soins infirmiers à domicile Guadeloupe — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Soins infirmiers à domicile Guadeloupe.',
  }
,
  {
    idcc: 1700, nom: 'Sucrerie distillerie Guadeloupe — Cadres Dirigeants', secteur: 'Sucrerie distillerie Guadeloupe',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sucrerie distillerie Guadeloupe — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Sucrerie distillerie Guadeloupe.',
  }
,
  {
    idcc: 1843, nom: 'Bâtiment cadres Région parisienne — Cadres Dirigeants', secteur: 'Bâtiment cadres Région parisienne',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bâtiment cadres Région parisienne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment cadres Région parisienne.',
  }
,
  {
    idcc: 1923, nom: 'Manutention portuaire Guadeloupe — Cadres Dirigeants', secteur: 'Manutention portuaire Guadeloupe',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Manutention portuaire Guadeloupe — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Manutention portuaire Guadeloupe.',
  }
,
  {
    idcc: 1961, nom: 'Stations Service Guadeloupe — Cadres Dirigeants', secteur: 'Stations Service Guadeloupe',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Stations Service Guadeloupe — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Stations Service Guadeloupe.',
  }
,
  {
    idcc: 1980, nom: 'Commissionnaires en douane Martinique — Cadres Dirigeants', secteur: 'Commissionnaires en douane Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commissionnaires en douane Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commissionnaires en douane Martinique.',
  }
,
  {
    idcc: 2025, nom: 'Mines Guyane — Cadres Dirigeants', secteur: 'Mines Guyane',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Mines Guyane — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Mines Guyane.',
  }
,
  {
    idcc: 2250, nom: 'Boulangerie pâtisserie de la Guyane — Cadres Dirigeants', secteur: 'Boulangerie pâtisserie de la Guyane',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Boulangerie pâtisserie de la Guyane — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Boulangerie pâtisserie de la Guyane.',
  }
,
  {
    idcc: 2328, nom: 'Bâtiment TP ouvriers Guadeloupe — Cadres Dirigeants', secteur: 'Bâtiment TP ouvriers Guadeloupe',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bâtiment TP ouvriers Guadeloupe — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment TP ouvriers Guadeloupe.',
  }
,
  {
    idcc: 2345, nom: 'Transport sanitaire en Martinique — Cadres Dirigeants', secteur: 'Transport sanitaire en Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transport sanitaire en Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport sanitaire en Martinique.',
  }
,
  {
    idcc: 2360, nom: 'Services de l\'automobile Guyane — Cadres Dirigeants', secteur: 'Services de l\'automobile Guyane',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Services de l\'automobile Guyane — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Services de l\'automobile Guyane.',
  }
,
  {
    idcc: 2389, nom: 'Bâtiment TP ouvriers La Réunion — Cadres Dirigeants', secteur: 'Bâtiment TP ouvriers La Réunion',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bâtiment TP ouvriers La Réunion — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment TP ouvriers La Réunion.',
  }
,
  {
    idcc: 2405, nom: 'Hospitalisation Guadeloupe — Cadres Dirigeants', secteur: 'Hospitalisation Guadeloupe',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Hospitalisation Guadeloupe — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Hospitalisation Guadeloupe.',
  }
,
  {
    idcc: 2480, nom: 'Manutention portuaire Fort de France — Cadres Dirigeants', secteur: 'Manutention portuaire Fort de France',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Manutention portuaire Fort de France — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Manutention portuaire Fort de France.',
  }
,
  {
    idcc: 2534, nom: 'Industrie sucrière et rhumière Martinique — Cadres Dirigeants', secteur: 'Industrie sucrière et rhumière Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie sucrière et rhumière Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie sucrière et rhumière Martinique.',
  }
,
  {
    idcc: 2535, nom: 'Culture canne à sucre Martinique — Cadres Dirigeants', secteur: 'Culture canne à sucre Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Culture canne à sucre Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Culture canne à sucre Martinique.',
  }
,
  {
    idcc: 2631, nom: 'Télédiffusion (accords CDD) — Cadres Dirigeants', secteur: 'Télédiffusion (accords CDD)',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Télédiffusion (accords CDD) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Télédiffusion (accords CDD).',
  }
,
  {
    idcc: 2658, nom: 'Guides et accompagnateurs milieu amazonien — Cadres Dirigeants', secteur: 'Guides et accompagnateurs milieu amazonien',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Guides et accompagnateurs milieu amazonien — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Guides et accompagnateurs milieu amazonien.',
  }
,
  {
    idcc: 2701, nom: 'Banques Guyane — Cadres Dirigeants', secteur: 'Banques Guyane',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Banques Guyane — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Banques Guyane.',
  }
,
  {
    idcc: 2702, nom: 'Banques Martinique — Cadres Dirigeants', secteur: 'Banques Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Banques Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Banques Martinique.',
  }
,
  {
    idcc: 2704, nom: 'Banques Guadeloupe St Martin — Cadres Dirigeants', secteur: 'Banques Guadeloupe St Martin',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Banques Guadeloupe St Martin — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Banques Guadeloupe St Martin.',
  }
,
  {
    idcc: 2766, nom: 'Sécurité sociale des mines personnels non cadres — Cadres Dirigeants', secteur: 'Sécurité sociale des mines personnels non cadres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sécurité sociale des mines personnels non cadres — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Sécurité sociale des mines personnels non cadres.',
  }
,
  {
    idcc: 2870, nom: 'Bâtiment TP ouvriers Guyane — Cadres Dirigeants', secteur: 'Bâtiment TP ouvriers Guyane',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bâtiment TP ouvriers Guyane — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment TP ouvriers Guyane.',
  }
,
  {
    idcc: 2964, nom: 'Transport de proximité produits pétroliers Martinique — Cadres Dirigeants', secteur: 'Transport de proximité produits pétroliers Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transport de proximité produits pétroliers Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport de proximité produits pétroliers Martinique.',
  }
,
  {
    idcc: 3028, nom: 'Transports routiers de la Guadeloupe — Cadres Dirigeants', secteur: 'Transports routiers de la Guadeloupe',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transports routiers de la Guadeloupe — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transports routiers de la Guadeloupe.',
  }
,
  {
    idcc: 3107, nom: 'Bâtiment TP ETAM Martinique — Cadres Dirigeants', secteur: 'Bâtiment TP ETAM Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bâtiment TP ETAM Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment TP ETAM Martinique.',
  }
,
  {
    idcc: 3123, nom: 'Ambulances Guyane — Cadres Dirigeants', secteur: 'Ambulances Guyane',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Ambulances Guyane — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Ambulances Guyane.',
  }
,
  {
    idcc: 3128, nom: 'BTP Industrie activités connexes Guyane - ETAM — Cadres Dirigeants', secteur: 'BTP Industrie activités connexes Guyane - ETAM',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'BTP Industrie activités connexes Guyane - ETAM — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). BTP Industrie activités connexes Guyane - ETAM.',
  }
,
  {
    idcc: 3140, nom: 'Commerce Sces commerciaux HCR St Pierre et Miquelon — Cadres Dirigeants', secteur: 'Commerce Sces commerciaux HCR St Pierre et Miquelon',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce Sces commerciaux HCR St Pierre et Miquelon — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce Sces commerciaux HCR St Pierre et Miquelon.',
  }
,
  {
    idcc: 3144, nom: 'Bâtiment TP ETAM Guadeloupe — Cadres Dirigeants', secteur: 'Bâtiment TP ETAM Guadeloupe',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bâtiment TP ETAM Guadeloupe — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment TP ETAM Guadeloupe.',
  }
,
  {
    idcc: 3204, nom: 'Bâtiment TP ingénieurs et cadres Guyane — Cadres Dirigeants', secteur: 'Bâtiment TP ingénieurs et cadres Guyane',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bâtiment TP ingénieurs et cadres Guyane — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment TP ingénieurs et cadres Guyane.',
  }
,
  {
    idcc: 3206, nom: 'Cabinets médicaux Martinique — Cadres Dirigeants', secteur: 'Cabinets médicaux Martinique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets médicaux Martinique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Cabinets médicaux Martinique.',
  }
,
  {
    idcc: 3207, nom: 'Transports sanitaires de Guadeloupe — Cadres Dirigeants', secteur: 'Transports sanitaires de Guadeloupe',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transports sanitaires de Guadeloupe — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transports sanitaires de Guadeloupe.',
  }
,
  {
    idcc: 5521, nom: 'Transports maritimes personnel navigant d\'exécution — Cadres Dirigeants', secteur: 'Transports maritimes personnel navigant d\'exécution',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transports maritimes personnel navigant d\'exécution — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transports maritimes personnel navigant d\'exécution.',
  }
,
  {
    idcc: 5554, nom: 'Remorquage maritime officiers — Cadres Dirigeants', secteur: 'Remorquage maritime officiers',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Remorquage maritime officiers — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Remorquage maritime officiers.',
  }
,
  {
    idcc: 5555, nom: 'Remorquage maritime navigant d\'exécution — Cadres Dirigeants', secteur: 'Remorquage maritime navigant d\'exécution',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Remorquage maritime navigant d\'exécution — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Remorquage maritime navigant d\'exécution.',
  }
,
  {
    idcc: 1659, nom: 'Rouissage teillage du lin — Cadres Dirigeants', secteur: 'Lin rouissage teillage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Rouissage teillage du lin — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Lin rouissage teillage.',
  }
,
  {
    idcc: 7001, nom: 'Coopératives et SICA bétail et viandes — Cadres Dirigeants', secteur: 'Coopératives agricoles bétail',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Coopératives et SICA bétail et viandes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Coopératives agricoles bétail.',
  }
,
  {
    idcc: 7004, nom: 'Coopératives laitières et unions de coopératives — Cadres Dirigeants', secteur: 'Coopératives laitières',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Coopératives laitières et unions de coopératives — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Coopératives laitières.',
  }
,
  {
    idcc: 7009, nom: 'Entreprises d\'accouvage et de sélection avicole — Cadres Dirigeants', secteur: 'Accouvage sélection avicole',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises d\'accouvage et de sélection avicole — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Accouvage sélection avicole.',
  }
,
  {
    idcc: 7010, nom: 'Personnel des élevages aquacoles — Cadres Dirigeants', secteur: 'Aquaculture élevage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel des élevages aquacoles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Aquaculture élevage.',
  }
,
  {
    idcc: 7019, nom: 'Conchyliculture — Cadres Dirigeants', secteur: 'Conchyliculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Conchyliculture — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Conchyliculture.',
  }
,
  {
    idcc: 7020, nom: 'Réseau des centres d\'économie rurale — Cadres Dirigeants', secteur: 'Centres économie rurale',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Réseau des centres d\'économie rurale — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Centres économie rurale.',
  }
,
  {
    idcc: 7026, nom: 'Activités hippiques — Cadres Dirigeants', secteur: 'Activités hippiques',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Activités hippiques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Activités hippiques.',
  }
,
  {
    idcc: 7027, nom: 'Conseil et service en élevage — Cadres Dirigeants', secteur: 'Conseil service élevage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Conseil et service en élevage — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Conseil service élevage.',
  }
,
  {
    idcc: 7028, nom: 'Coopératives agricoles et unions de coopératives — Cadres Dirigeants', secteur: 'Coopératives agricoles',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Coopératives agricoles et unions de coopératives — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Coopératives agricoles.',
  }
,
  {
    idcc: 7501, nom: 'Caisses régionales du Crédit agricole — Cadres Dirigeants', secteur: 'Crédit agricole',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Caisses régionales du Crédit agricole — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Crédit agricole.',
  }
,
  {
    idcc: 7520, nom: 'Salariés des établissements d\'enseignement agricole privé — Cadres Dirigeants', secteur: 'Enseignement agricole privé',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Salariés des établissements d\'enseignement agricole privé — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Enseignement agricole privé.',
  }
,
  {
    idcc: 2089, nom: 'Industrie des panneaux à base de bois — Cadres Dirigeants', secteur: 'Panneaux bois',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie des panneaux à base de bois — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Panneaux bois.',
  }
,
  {
    idcc: 2098, nom: 'Personnel des prestataires de services du secteur tertiaire — Cadres Dirigeants', secteur: 'Prestataires services tertiaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel des prestataires de services du secteur tertiaire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Prestataires services tertiaire.',
  }
,
  {
    idcc: 2128, nom: 'Mutualité — Cadres Dirigeants', secteur: 'Mutualité',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Mutualité — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Mutualité.',
  }
,
  {
    idcc: 2147, nom: 'Entreprises des services d\'eau et d\'assainissement — Cadres Dirigeants', secteur: 'Eau assainissement',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises des services d\'eau et d\'assainissement — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Eau assainissement.',
  }
,
  {
    idcc: 2148, nom: 'Télécommunications — Cadres Dirigeants', secteur: 'Télécommunications',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Télécommunications — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Télécommunications.',
  }
,
  {
    idcc: 2149, nom: 'Activités du déchet — Cadres Dirigeants', secteur: 'Déchet activités',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Activités du déchet — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Déchet activités.',
  }
,
  {
    idcc: 2150, nom: 'Personnels des sociétés anonymes et fondations d\'HLM — Cadres Dirigeants', secteur: 'HLM sociétés anonymes',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnels des sociétés anonymes et fondations d\'HLM — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). HLM sociétés anonymes.',
  }
,
  {
    idcc: 2156, nom: 'Grands magasins et magasins populaires — Cadres Dirigeants', secteur: 'Grands magasins',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Grands magasins et magasins populaires — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Grands magasins.',
  }
,
  {
    idcc: 2190, nom: 'Missions locales et PAIO — Cadres Dirigeants', secteur: 'Missions locales PAIO',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Missions locales et PAIO — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Missions locales PAIO.',
  }
,
  {
    idcc: 2219, nom: 'Taxis — Cadres Dirigeants', secteur: 'Taxis',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Taxis — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Taxis.',
  }
,
  {
    idcc: 2272, nom: 'Assainissement et maintenance industrielle — Cadres Dirigeants', secteur: 'Assainissement industriel',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Assainissement et maintenance industrielle — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Assainissement industriel.',
  }
,
  {
    idcc: 2372, nom: 'Entreprises de la distribution directe — Cadres Dirigeants', secteur: 'Distribution directe',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises de la distribution directe — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Distribution directe.',
  }
,
  {
    idcc: 2412, nom: 'Production de films d\'animation — Cadres Dirigeants', secteur: 'Films d\'animation production',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Production de films d\'animation — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Films d\'animation production.',
  }
,
  {
    idcc: 2420, nom: 'Cadres du bâtiment — Cadres Dirigeants', secteur: 'Bâtiment cadres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cadres du bâtiment — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment cadres.',
  }
,
  {
    idcc: 2494, nom: 'Coopération maritime — Cadres Dirigeants', secteur: 'Coopération maritime',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Coopération maritime — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Coopération maritime.',
  }
,
  {
    idcc: 2583, nom: 'Sociétés concessionnaires ou exploitantes d\'autoroutes — Cadres Dirigeants', secteur: 'Autoroutes concessionnaires',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sociétés concessionnaires ou exploitantes d\'autoroutes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Autoroutes concessionnaires.',
  }
,
  {
    idcc: 2603, nom: 'Praticiens-conseils du régime général de sécurité sociale — Cadres Dirigeants', secteur: 'Praticiens-conseils sécu',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Praticiens-conseils du régime général de sécurité sociale — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Praticiens-conseils sécu.',
  }
,
  {
    idcc: 2609, nom: 'Employés, techniciens et agents de maîtrise du bâtiment — Cadres Dirigeants', secteur: 'Bâtiment ETAM',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Employés, techniciens et agents de maîtrise du bâtiment — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment ETAM.',
  }
,
  {
    idcc: 2614, nom: 'Employés, techniciens et agents de maîtrise des travaux publics — Cadres Dirigeants', secteur: 'Travaux publics ETAM',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Employés, techniciens et agents de maîtrise des travaux publics — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Travaux publics ETAM.',
  }
,
  {
    idcc: 2642, nom: 'Production audiovisuelle — Cadres Dirigeants', secteur: 'Production audiovisuelle',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Production audiovisuelle — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Production audiovisuelle.',
  }
,
  {
    idcc: 2668, nom: 'Cadres supérieurs des sociétés de secours minières — Cadres Dirigeants', secteur: 'Secours minières cadres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cadres supérieurs des sociétés de secours minières — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Secours minières cadres.',
  }
,
  {
    idcc: 2697, nom: 'Personnels des structures associatives cynégétiques — Cadres Dirigeants', secteur: 'Chasse associations',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnels des structures associatives cynégétiques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Chasse associations.',
  }
,
  {
    idcc: 2768, nom: 'Pharmaciens du régime minier — Cadres Dirigeants', secteur: 'Pharmaciens régime minier',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pharmaciens du régime minier — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Pharmaciens régime minier.',
  }
,
  {
    idcc: 2847, nom: 'Pôle Emploi — Cadres Dirigeants', secteur: 'Pôle Emploi',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pôle Emploi — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Pôle Emploi.',
  }
,
  {
    idcc: 2978, nom: 'Personnel salarié des agences de recherches privées — Cadres Dirigeants', secteur: 'Agences recherches privées',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel salarié des agences de recherches privées — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agences recherches privées.',
  }

];

// ═══════════════════════════════════════════════════════════════════
// FONCTIONS UTILITAIRES
// ═══════════════════════════════════════════════════════════════════

function _norm(s) {
  return String(s).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Recherche FJ — texte libre ou IDCC */
function searchForfaitJours(query, limit) {
  if (!query && query !== 0) return [];
  limit = limit || 10;
  const q = _norm(String(query));
  const isNum = /^\d+$/.test(q.trim());

  if (isNum) {
    const exact = CCN_FJ_DATA.filter(c => String(c.idcc).startsWith(q));
    if (exact.length) return exact.slice(0, limit);
  }

  const scored = CCN_FJ_DATA.map(c => {
    const nom = _norm(c.nom);
    const sec = _norm(c.secteur);
    const notes = _norm(c.notes || '');
    let score = 0;
    if (nom === q) score += 20;
    else if (nom.startsWith(q)) score += 15;
    else if (nom.includes(q)) score += 10;
    if (sec.includes(q)) score += 5;
    if (notes.includes(q)) score += 1;
    if (String(c.idcc).includes(q)) score += 8;
    return { c, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(x => x.c);
}

/** Retourne les données FJ d'une CCN par IDCC exact */
function getForfaitJours(idcc) {
  const n = parseInt(idcc);
  return CCN_FJ_DATA.find(c => c.idcc === n) || null;
}

/** Recherche CD — texte libre ou IDCC */
function searchCadreDirigeant(query, limit) {
  if (!query) return [];
  limit = limit || 10;
  const q = _norm(String(query));
  const isNum = /^\d+$/.test(q.trim());
  if (isNum) return CCN_CD_DATA.filter(c => String(c.idcc).startsWith(q)).slice(0, limit);
  const scored = CCN_CD_DATA.map(c => {
    const nom = _norm(c.nom);
    const sec = _norm(c.secteur);
    let score = 0;
    if (nom.includes(q)) score += 10;
    if (sec.includes(q)) score += 5;
    if (String(c.idcc).includes(q)) score += 8;
    return { c, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(x => x.c);
}

/** Retourne les données CD d'une CCN par IDCC */
function getCadreDirigeant(idcc) {
  const n = parseInt(idcc);
  return CCN_CD_DATA.find(c => c.idcc === n) || null;
}

/** Délègue les règles HS au fichier commun */
function getHSRules(idcc) {
  if (global.CCN_API) return global.CCN_API.getGroupeForCCN(idcc) || global.CCN_API.getRules('DC');
  return { seuil:35, taux1:25, palier1:8, taux2:50, contingent:220, id:'DC', nom:'Droit commun' };
}

function searchHS(query, limit) {
  if (global.CCN_API?.search) return global.CCN_API.search(query, limit || 10);
  return [];
}

function calculerHS(hsReelles, absences, idcc) {
  if (global.CCN_API?.calculerHS) return global.CCN_API.calculerHS(hsReelles, absences, idcc);
  return null;
}

function buildContractDefaults(ccn, regime) {
  if (!ccn) return {};
  regime = regime || 'forfait_jours';

  if (regime === 'forfait_heures') {
    const hs = ccn.g ? (global.CCN_API ? global.CCN_API.getRules(ccn.g) : null) : null;
    return {
      ccnLabel:   ccn.n || ccn.nom || 'Droit commun', ccnIdcc: ccn.i || ccn.idcc || 0,
      seuilHebdo: (hs?.seuil) || 35, taux1: (hs?.taux1) || 25, taux2: (hs?.taux2) || 50,
      palier1:    (hs?.palier1) || 8, contingent: (hs?.contingent) || 220,
      ccnNotes:   (hs?.notes) || ccn.notes || '', ccnGroupe: (hs?.id) || 'DC',
    };
  }

  if (regime === 'cadre_dirigeant') {
    const cd = getCadreDirigeant(ccn.idcc || 0) || {};
    return {
      ccnLabel: ccn.nom || 'Droit commun', ccnIdcc: ccn.idcc || 0,
      plafond: 218, joursCPContrat: 25,
      critereCD: cd.critereCD || '', entretienCD: cd.entretienCD || '',
      droitsCP: cd.droitsCP || '25j ouvrables (L3141-1)',
      ccnNotes: cd.notesCD || ccn.notes || '', alertesCD: cd.alertesCD || [],
    };
  }

  const fj = getForfaitJours(ccn.idcc || 0) || ccn;
  return {
    ccnLabel:             ccn.nom || fj.nom || 'Droit commun',
    ccnIdcc:              ccn.idcc || fj.idcc || 0,
    plafond:              fj.plafond || ccn.plafond || 218,
    tauxMajorationRachat: fj.tauxRachat || ccn.tauxRachat || 10,
    entretienFreq:        fj.entretienFreq || 'annuel',
    entretienRef:         fj.entretienRef || 'Art. L3121-65',
    clauseDeconn:         fj.clauseDeconn || false,
    suiviCharge:          fj.suiviCharge || 'Art. L3121-65',
    ccnNotes:             fj.notes || ccn.notes || '',
    alertes:              fj.alertes || [],
  };
}

function getStats() {
  return {
    totalForfaitJours:     CCN_FJ_DATA.length,
    totalCadresDirigeants: CCN_CD_DATA.length,
    fichierCommunCharge:   !!(global.CCN_API),
    versionFichierCommun:  global.CCN_API ? global.CCN_API.version : 'non chargé',
    totalCCNCommun:        global.CCN_API ? (global.CCN_API.getStats?.()?.totalCCN || 0) : 0,
  };
}

const CCN_CADRES_API = {
  version: '2.0.0',
  CCN_FJ_DATA, CCN_CD_DATA,
  searchForfaitJours, getForfaitJours,
  searchCadreDirigeant, getCadreDirigeant,
  getHSRules, searchHS, calculerHS,
  buildContractDefaults, getStats,
  isCommonCCNLoaded: () => !!(global.CCN_API),
};

global.CCN_CADRES_API = CCN_CADRES_API;

})(window);
