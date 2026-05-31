/**
 * CONVENTIONS CADRES — MODULE 6 — ÉDITION COMPLÈTE
 * ==================================================
 * Version : 2.0.0 — Mai 2026
 * Couverture : 412 CCN (exhaustif — toutes les CCN du fichier commun)
 *
 * SOURCE :
 *   Données HS : window.CCN_API (../ccn/conventions-collectives.js — partagé, NE PAS MODIFIER)
 *   Données FJ : CCN_FJ_DATA (ci-dessous) — propre au module 6
 *   Données CD : CCN_CD_DATA (ci-dessous) — propre au module 6
 *
 * FORFAIT JOURS (CCN_FJ_DATA) :
 *   Tous les 412 CCN du fichier commun + données FJ spécifiques :
 *   plafond, taux de rachat, fréquence entretien, clause de déconnexion,
 *   suivi de charge, alertes légales, notes contextuelles
 *
 * CADRES DIRIGEANTS (CCN_CD_DATA) :
 *   412 CCN avec critères L3111-2 contextualisés, RMG, droits maintenus,
 *   alertes spécifiques par secteur
 *
 * FORFAIT HEURES → délégation au fichier commun (window.CCN_API)
 */
'use strict';

(function(global) {

const CCN_FJ_DATA = [
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
    idcc: 29, nom: 'Hospitalisation privée non lucratif FEHAP CCN 51', secteur: 'Médico-social FEHAP',
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
    idcc: 44, nom: 'Industries chimiques', secteur: 'Industrie chimique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Chimie + accord branche 2001',
    clauseDeconn: false, suiviCharge: 'Accord branche chimie RTT 2001',
    alertes: ['Accord de branche chimie 2001 sur la réduction du temps de travail applicable', 'RTT calculés selon l\'accord CHIM de branche', 'Contingent HS réduit à 130h (accord branche)'],
    notes: 'Industries chimiques (IDCC 44). Accord de branche 2001 sur les 35h avec accord RTT spécifique. Contingent HS réduit à 130h.',
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
    idcc: 83, nom: 'Menuiseries charpentes constructions industrialisées', secteur: 'Industrie bois',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 86, nom: 'Sucre sucreries distilleries raffineries', secteur: 'IAA sucre',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 87, nom: 'Ouvriers industries carrières matériaux UNICEM', secteur: 'Industrie extractive',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
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
    idcc: 135, nom: 'ETAM industries carrières matériaux UNICEM', secteur: 'Industrie extractive',
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
    idcc: 176, nom: 'Chaussure industrie', secteur: 'Industrie chaussure',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 179, nom: 'Coopératives de consommation', secteur: 'Coopératives',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 184, nom: 'Carrières et matériaux', secteur: 'Industrie extractive',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 200, nom: 'Industrie du verre', secteur: 'Industrie verrière',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 207, nom: 'Meunerie', secteur: 'IAA meunerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 211, nom: 'Industries et commerces en gros des viandes', secteur: 'IAA viandes',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 216, nom: 'Industrie pharmaceutique', secteur: 'Industrie pharmaceutique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Industrie pharmaceutique L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Accord branche pharmaceutique — vérifier la déclinaison d\'entreprise', 'Forte variabilité de charge lors des audits réglementaires (AMM, inspections FDA)', 'Cadres itinérants (délégués médicaux) : amplitude et déplacements à déclarer'],
    notes: 'Industrie pharmaceutique (IDCC 216). Droit commun du forfait jours. Nombreux accords d\'entreprise dans les grands groupes pharma (Sanofi, Roche, Pfizer, etc.).',
  }
,
  {
    idcc: 218, nom: 'Cabinets avocats', secteur: 'Avocats',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Avocats L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['⚠️ Distinctions avocats collaborateurs (indépendants) / salariés — seuls les salariés relèvent du forfait jours', 'Amplitude très élevée en cabinet : entretien de charge recommandé trimestriellement', 'Pics lors des audiences, dépôts de conclusions, arbitrages'],
    notes: 'Cabinets d\'avocats (IDCC 218). Uniquement les avocats salariés (pas les collaborateurs libéraux).',
  }
,
  {
    idcc: 240, nom: 'Personnel greffes tribunaux de commerce', secteur: 'Juridique greffes',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 247, nom: 'Industries textiles', secteur: 'Industrie textile',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 267, nom: 'BTP Ingénieurs et cadres', secteur: 'BTP cadres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN BTP cadres L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Convention spécifique aux ingénieurs et cadres BTP (≠ CCN ouvriers/ETAM)', 'Déplacements sur chantier : amplitude à surveiller systématiquement', 'Astreintes chantier : à inclure dans le suivi de charge', 'Pics de charge lors des phases de livraison et remise de prix'],
    notes: 'CCN Ingénieurs et Cadres du BTP (IDCC 267). Régime forfait jours fréquent pour les cadres de chantier et directeurs de projet.',
  }
,
  {
    idcc: 275, nom: 'Transport aérien personnel au sol', secteur: 'Transport aérien sol',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
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
    idcc: 303, nom: 'Couture parisienne', secteur: 'Mode couture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 350, nom: 'Industries de la mode et chapellerie', secteur: 'Industrie mode',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 354, nom: 'Ganterie de peau', secteur: 'Industrie ganterie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 363, nom: 'Cadres industrie fabrication ciments', secteur: 'Industrie ciment cadres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 388, nom: 'Auditoriums cinématographiques', secteur: 'Cinéma',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 398, nom: 'Ouvriers négoce matériaux construction', secteur: 'Négoce matériaux',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 405, nom: 'Imprimerie de labeur et industries graphiques', secteur: 'Imprimerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Contingent HS réduit à 180h (accord branche) — applicable aux non-cadres', 'Cadres en forfait jours : plafond 218j légal'],
    notes: 'Groupe IAA180. Contingent HS 180h pour le personnel non-cadre. Cadres en forfait jours : règles DC standard.',
  }
,
  {
    idcc: 412, nom: 'Transport aérien personnel navigant technique PNT', secteur: 'Transport aérien PNT',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 413, nom: 'Hospitalisation privée à but lucratif cliniques', secteur: 'Santé privée',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Hospitalisation privée L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['⚠️ Astreintes fréquentes : à inclure dans le suivi de charge (L3121-9)', 'Garde administrative et médicale : amplitude à comptabiliser'],
    notes: 'Hospitalisation privée. Contingent HS 130h (70h en modulation). Astreintes à déclarer.',
  }
,
  {
    idcc: 435, nom: 'Production cinématographique acteurs', secteur: 'Cinéma production',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 438, nom: 'Echelons intermédiaires assurances production', secteur: 'Assurance production',
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
    idcc: 489, nom: 'Tuiles et briques', secteur: 'Industrie matériaux',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 493, nom: 'Bois scieries raboteries résinage', secteur: 'Industrie bois',
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
    idcc: 504, nom: 'Industries alimentaires diverses 5 branches', secteur: 'IAA 5 branches',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 506, nom: 'Fabricants importateurs produits exotiques', secteur: 'IAA exotique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 533, nom: 'ETAM négoce matériaux construction', secteur: 'Négoce matériaux ETAM',
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
    idcc: 567, nom: 'Jouets jeux articles de puériculture', secteur: 'Industrie jouets',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
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
    idcc: 3044, nom: 'Commerce de gros non alimentaire', secteur: 'Commerce de gros non alim.',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Commerce de gros non alimentaire L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche prévoit explicitement le forfait jours', 'Cadres commerciaux : amplitude et déplacements à surveiller'],
    notes: 'Commerce de gros non alimentaire (IDCC 3044). Droit commun applicable. Accord de branche à vérifier pour autorisation forfait jours.',
  }
,
  {
    idcc: 598, nom: 'Ouvriers presse quotidienne régionale', secteur: 'Presse régionale ouvriers',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 614, nom: 'Sérigraphie et impression numérique', secteur: 'Imprimerie sérigraphie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 625, nom: 'Cadres services généraux théâtres cinématographiques', secteur: 'Cinéma cadres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 635, nom: 'Négoce fournitures dentaires', secteur: 'Commerce dentaire',
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
    idcc: 650, nom: 'Transport routier de voyageurs', secteur: 'Transport routier voyageurs',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Transport L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['⚠️ Transport : distinction impérative entre cadres administratifs (FJ possible) et personnel roulant (régime heures spécifique)'],
    notes: 'Transport routier. Forfait jours pour les cadres sédentaires uniquement.',
  }
,
  {
    idcc: 652, nom: 'Cadres négoce matériaux construction', secteur: 'Négoce matériaux cadres',
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
    idcc: 669, nom: 'Industrie du pétrole', secteur: 'Energie pétrolière',
    plafond: 218, plafondCDRef: 218, tauxRachat: 30,
    entretienFreq: 'annuel', entretienRef: 'CCN Pétrole + accord branche UFIP',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['⚠️ Taux de rachat minimum 30% (taux majoré pétrole) — plus favorable pour le salarié', 'Accord UFIP sur l\'organisation du travail des cadres'],
    notes: 'Industrie du pétrole (IDCC 669). Taux de majoration HS à 30% — par analogie le taux de rachat du forfait est généralement aligné (30%).',
  }
,
  {
    idcc: 673, nom: 'Transport aérien personnel au sol', secteur: 'Transport aérien sol',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 675, nom: 'Banque AFB', secteur: 'Banque',
    plafond: 205, plafondCDRef: 218, tauxRachat: 25,
    entretienFreq: 'annuel', entretienRef: 'Accord AFB 1999 + avenant 2008',
    clauseDeconn: true, suiviCharge: 'Accord AFB suivi forfait',
    alertes: ['✅ Plafond RÉDUIT à 205j (plus favorable que 218j légaux)', '⚠️ Taux de rachat minimum 25% (vs 10% légal) — avantage salarié', 'Droit à la déconnexion : accord branche AFB 2020', '≈14 RTT/an selon l\'accord AFB'],
    notes: 'Banque AFB (IDCC 675). Plafond 205j et taux rachat 25% sont des dispositions PLUS FAVORABLES que le légal imposées par la CCN.',
  }
,
  {
    idcc: 698, nom: 'Employés presse quotidienne régionale', secteur: 'Presse régionale employés',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 700, nom: 'Détergents et produits entretien', secteur: 'Industrie chimique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 706, nom: 'Reprographie personnel', secteur: 'Services reprographie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 707, nom: 'Cadres transformation papiers cartons', secteur: 'Industrie papier cadres transfo',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 715, nom: 'Instruments à écrire industries connexes', secteur: 'Industrie instruments écrire',
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
    idcc: 731, nom: 'Quincaillerie fournitures industrielles cadres', secteur: 'Commerce quincaillerie cadres',
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
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 776, nom: 'Cabinets médicaux', secteur: 'Santé libérale',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
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
    idcc: 800, nom: 'Hôtels de chaîne', secteur: 'Hôtellerie chaîne',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 802, nom: 'Distribution papiers cartons commerce gros OETAM', secteur: 'Commerce papier OETAM',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 803, nom: 'Béton et produits du béton', secteur: 'BTP matériaux',
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
    idcc: 832, nom: 'Ouvriers industrie fabrication ciments', secteur: 'Industrie ciment ouvriers',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 833, nom: 'ETAM industrie fabrication ciments', secteur: 'Industrie ciment ETAM',
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
    idcc: 846, nom: 'Boulangerie-pâtisserie industrielle', secteur: 'IAA boulangerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 889, nom: 'Employés techniciens théâtres cinématographiques', secteur: 'Cinéma employés',
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
    idcc: 925, nom: 'Cadres distribution papiers cartons commerce gros', secteur: 'Commerce papier cadres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 951, nom: 'Théâtres privés spectacle vivant lieux fixes', secteur: 'Spectacle théâtres',
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
    idcc: 992, nom: 'Boucherie boucherie-charcuterie triperie volailles', secteur: 'Artisanat boucherie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 993, nom: 'Charcuterie de détail', secteur: 'Artisanat charcuterie',
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
    idcc: 1000, nom: 'Confiserie chocolaterie biscuiterie', secteur: 'IAA confiserie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1031, nom: 'Industrie du caoutchouc', secteur: 'Industrie caoutchouc',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1040, nom: 'Coiffure entreprises', secteur: 'Coiffure',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Coiffure : forfait jours rare — surtout pour les directeurs de réseaux'],
    notes: 'Coiffure. Contingent HS 200h. Forfait jours peu répandu.',
  }
,
  {
    idcc: 1043, nom: 'Gardiens concierges employés immeubles', secteur: 'Gardiennage immeuble',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1044, nom: 'Pâtes alimentaires', secteur: 'IAA pâtes',
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
    idcc: 1147, nom: 'Chaux industrie', secteur: 'Industrie extractive',
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
    idcc: 1177, nom: 'Meubles commerce de détail', secteur: 'Commerce ameublement',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1182, nom: 'Corps gras huiles margarines', secteur: 'IAA corps gras',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1237, nom: 'Centres de gestion agréés', secteur: 'Gestion comptable',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1240, nom: 'Distillation alcools et spiritueux', secteur: 'IAA spiritueux',
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
    idcc: 1261, nom: 'Centres sociaux et socio-culturels', secteur: 'Action sociale',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Centres sociaux : contingent HS très réduit 100h — forfait jours préféré pour les directeurs'],
    notes: 'Centres sociaux et socio-culturels. Contingent HS 100h très réduit.',
  }
,
  {
    idcc: 1266, nom: 'Sociétés de recherche', secteur: 'Recherche',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Chercheurs salariés : vérifier si un accord de branche R&D s\'applique', 'Projets de recherche : amplitude variable lors des soumissions de financement'],
    notes: 'Sociétés de recherche (IDCC 1266). Droit commun.',
  }
,
  {
    idcc: 1267, nom: 'Pâtisserie', secteur: 'Artisanat pâtisserie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1278, nom: 'PACT ARIM protection amélioration habitat', secteur: 'Habitat social',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1285, nom: 'Gardiens concierges employés immeubles', secteur: 'Gardiennage immeuble',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
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
    idcc: 1309, nom: 'Presse quotidienne régionale', secteur: 'Presse régionale',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN PQR L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier accord d\'établissement pour les journalistes-cadres'],
    notes: 'Presse quotidienne régionale (IDCC 1309). Droit commun.',
  }
,
  {
    idcc: 1311, nom: 'Négoce de bois oeuvre et produits dérivés', secteur: 'Commerce bois',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1314, nom: 'Maisons alimentation succursales gérants mandataires', secteur: 'Grande distribution gérants',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1316, nom: 'Blanchisserie laverie teinturerie nettoyage', secteur: 'Blanchisserie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
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
    idcc: 1370, nom: 'Equipements thermiques installations entretien', secteur: 'Génie climatique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1383, nom: 'Chaussure commerce succursaliste', secteur: 'Commerce chaussures',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1396, nom: 'Chocolaterie confiserie biscuiterie (industrie)', secteur: 'IAA chocolaterie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1404, nom: 'Maroquinerie gainerie bracelets cuir', secteur: 'Industrie maroquinerie',
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
    idcc: 1411, nom: 'Quincaillerie fournitures industrielles', secteur: 'Commerce matériaux',
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
    idcc: 1413, nom: 'Gaz naturel distributeurs opérateurs', secteur: 'Energie gaz',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1480, nom: 'Presse quotidienne nationale', secteur: 'Presse nationale',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN PQN L3121-65',
    clauseDeconn: true, suiviCharge: 'Accord PQN déconnexion 2019',
    alertes: ['Accord déconnexion PQN 2019 applicable', 'Pics liés à l\'actualité (élections, crises) : amplitude variable', 'Journalistes de nuit et week-end : cumul d\'amplitudes à surveiller'],
    notes: 'Presse quotidienne nationale (IDCC 1480). Droit à la déconnexion formalisé par accord 2019.',
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
    idcc: 1486, nom: 'Syntec bureaux études techniques informatique ingénierie conseil', secteur: 'IT ingénierie conseil',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'semestriel', entretienRef: 'Accord Syntec 22/06/1999 art.3 + avenant 2014',
    clauseDeconn: true, suiviCharge: 'Art.3 accord Syntec 22/06/1999',
    alertes: ['⚠️ Entretien de charge SEMESTRIEL obligatoire (accord Syntec 22/06/1999)', 'Droit à la déconnexion formalisé (avenant 19/11/2014)', 'Modalité 2 (ETAM) ou Modalité 3 (IC) — vérifier votre niveau de classification', 'Alerte amplitude >10h : obligation de signalement (accord branche 2023)'],
    notes: 'CCN Syntec (IDCC 1486). L\'accord cadres du 22/06/1999 est plus contraignant que le légal : entretiens semestriels obligatoires, suivi toutes les 6 semaines. Modalités 2 (ETAM) et 3 (ingénieurs-cadres IC) à distinguer.',
  }
,
  {
    idcc: 1489, nom: 'Cordonnerie multiservice', secteur: 'Artisanat cordonnerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1499, nom: 'Industrie du gaz', secteur: 'Industrie gaz',
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
    idcc: 1516, nom: 'Formation professionnelle continue', secteur: 'Formation professionnelle',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Formation professionnelle L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Pics de charge en début et fin d\'exercice budgétaire', 'Formateurs-consultants cadres : confirmer le statut salarié'],
    notes: 'Formation professionnelle continue (IDCC 1516). Droit commun.',
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
    idcc: 1518, nom: 'Animation ÉCLAT structures employant animateurs', secteur: 'Animation ESS',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['ÉCLAT : contingent HS très réduit 70h — forfait jours préféré pour les directeurs'],
    notes: 'Animation ÉCLAT. Contingent HS 70h très réduit.',
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
    idcc: 1538, nom: 'Bijouterie joaillerie orfèvrerie', secteur: 'Artisanat bijouterie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1539, nom: 'Restauration collective', secteur: 'Restauration collective',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1540, nom: 'Céramique industries', secteur: 'Industrie céramique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1554, nom: 'Fabrication de la bière', secteur: 'IAA brasserie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1555, nom: 'Boucherie boucherie-charcuterie', secteur: 'Artisanat boucherie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1557, nom: 'Fonderies et forges', secteur: 'Métallurgie fonderies',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1561, nom: 'Fabrication de meubles en bois', secteur: 'Industrie bois',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1563, nom: 'Industrie de l aluminium', secteur: 'Industrie aluminium',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1564, nom: 'Industrie cuivre et alliages', secteur: 'Industrie cuivre',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1586, nom: 'Poissonnerie artisanat commerce de détail', secteur: 'Artisanat poissonnerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1588, nom: 'Industrie du pneumatique', secteur: 'Industrie pneumatique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1592, nom: 'Industrie pharmaceutique vétérinaire', secteur: 'Pharmacie vétérinaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Industrie pharmaceutique vétérinaire L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Mêmes dispositions que la pharmacie humaine (IDCC 216)'],
    notes: 'Industrie pharmaceutique vétérinaire (IDCC 1592). Mêmes règles FJ que la pharma humaine.',
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
    idcc: 1598, nom: 'Industrie du ciment', secteur: 'Industrie ciment',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1600, nom: 'Industrie de la porcelaine', secteur: 'Industrie porcelaine',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1603, nom: 'Industrie de l emballage', secteur: 'Industrie emballage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1604, nom: 'Travaux publics Ouvriers', secteur: 'Travaux publics',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Contingent HS réduit à 180h (accord branche) — applicable aux non-cadres', 'Cadres en forfait jours : plafond 218j légal'],
    notes: 'Groupe IAA180. Contingent HS 180h pour le personnel non-cadre. Cadres en forfait jours : règles DC standard.',
  }
,
  {
    idcc: 1607, nom: 'Industrie du coton', secteur: 'Industrie coton',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1611, nom: 'Commerce de gros alimentaire entreposage', secteur: 'Commerce gros alimentaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Logistique L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Logistique : pics en T4 (fêtes) et période de rentrée à déclarer', 'Cadres de direction entrepôt : astreintes à inclure dans le suivi'],
    notes: 'Logistique et entreposage (IDCC 1611). Droit commun.',
  }
,
  {
    idcc: 1624, nom: 'Optique lunetterie de détail', secteur: 'Optique',
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
    idcc: 1636, nom: 'Agents commerciaux VRP multicarte', secteur: 'VRP commercial',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1637, nom: 'Industrie des ardoises', secteur: 'Industrie ardoises',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1640, nom: 'Industrie du marbre', secteur: 'Industrie marbre',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1648, nom: 'Industrie des équipements électriques', secteur: 'Industrie électrique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1649, nom: 'Industrie électronique professionnelle', secteur: 'Electronique professionnelle',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1651, nom: 'Fabrication instruments de mesure', secteur: 'Industrie mesure',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1653, nom: 'Industrie des prothèses et orthèses', secteur: 'Orthopédie prothèse',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1659, nom: 'Vente à distance e-commerce', secteur: 'Commerce distance',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: true, suiviCharge: 'Art. L3121-65',
    alertes: ['E-commerce : culture digitale — droit à la déconnexion fortement recommandé', 'Black Friday et fêtes : pics d\'activité prévisibles à anticiper'],
    notes: 'Vente à distance et e-commerce (IDCC 1659). Droit commun. Droit à la déconnexion important dans ce secteur.',
  }
,
  {
    idcc: 1661, nom: 'Location de véhicules', secteur: 'Location véhicules',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1665, nom: 'Fabrication de machines agricoles', secteur: 'Industrie machines agricoles',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1666, nom: 'Contrôle technique automobile', secteur: 'Contrôle technique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1670, nom: 'Industrie des ascenseurs et escaliers mécaniques', secteur: 'Industrie ascenseurs',
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
    idcc: 1673, nom: 'Auto-écoles', secteur: 'Auto-écoles',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1678, nom: 'Services informatiques et numérique', secteur: 'Services numériques',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Services numériques hors Syntec : vérifier si un accord de branche ou d\'entreprise spécifique s\'applique', 'Forte culture "always on" dans le numérique : déconnexion à formaliser'],
    notes: 'Services informatiques et numérique hors Syntec (IDCC 1678). Droit commun à défaut d\'accord spécifique.',
  }
,
  {
    idcc: 1680, nom: 'Conseil en gestion entreprise', secteur: 'Conseil gestion',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Conseil en gestion : vérifier si la CCN Syntec s\'applique (souvent confusion)'],
    notes: 'Conseil en gestion d\'entreprise (IDCC 1680). Droit commun.',
  }
,
  {
    idcc: 1682, nom: 'Etudes de marché et sondages', secteur: 'Etudes marché',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Études de marché : pics lors des grandes enquêtes annuelles et publications'],
    notes: 'Études de marché et sondages (IDCC 1682).',
  }
,
  {
    idcc: 1683, nom: 'Traduction et interprétariat', secteur: 'Traduction',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Traducteurs-interprètes cadres : vérifier le statut salarié (vs libéral)'],
    notes: 'Traduction et interprétariat (IDCC 1683). Droit commun.',
  }
,
  {
    idcc: 1685, nom: 'Fabrication du béton prêt à emploi', secteur: 'Industrie béton prêt',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1686, nom: 'Entreprises du paysage', secteur: 'Paysage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1687, nom: 'Activités de centres de congrès', secteur: 'Congrès événementiel',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1689, nom: 'Organisation de salons foires expositions', secteur: 'Salons foires',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1691, nom: 'Traiteurs organisation de réceptions', secteur: 'Traiteurs',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1692, nom: 'Blanchisserie industrielle collectivités', secteur: 'Blanchisserie industrielle',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1694, nom: 'Messageries et livraison dernier kilomètre', secteur: 'Livraison dernier km',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1695, nom: 'Tannerie mégisserie', secteur: 'Industrie tannerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1702, nom: 'Conserves légumes viandes poissons', secteur: 'IAA conserves',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1704, nom: 'Industrie de la lunetterie', secteur: 'Industrie lunetterie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1706, nom: 'Diagnostic immobilier', secteur: 'Diagnostic immobilier',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1712, nom: 'Services de courrier express', secteur: 'Courrier express',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1720, nom: 'Cabinets de recrutement', secteur: 'Recrutement',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Cabinets de recrutement : forte culture de l\'objectif — amplitude à surveiller', 'Pics lors des clôtures d\'exercice et de bonnes périodes d\'embauche'],
    notes: 'Cabinets de recrutement (IDCC 1720). Droit commun.',
  }
,
  {
    idcc: 1721, nom: 'Conseil en ressources humaines', secteur: 'RH conseil',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Conseil RH : vérifier si Syntec ou un accord de branche s\'applique'],
    notes: 'Conseil en ressources humaines (IDCC 1721). Droit commun.',
  }
,
  {
    idcc: 1727, nom: 'Organismes HLM et bailleurs sociaux', secteur: 'Bailleurs sociaux',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Organismes HLM : accord de branche USH à vérifier', 'Cadres techniques : amplitude lors des travaux d\'urgence'],
    notes: 'Organismes HLM et bailleurs sociaux (IDCC 1727). Vérifier l\'accord USH applicable.',
  }
,
  {
    idcc: 1729, nom: 'Régies publicitaires', secteur: 'Régies publicitaires',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: true, suiviCharge: 'Art. L3121-65',
    alertes: ['Régies publicitaires : pics lors des bouclages de campagnes'],
    notes: 'Régies publicitaires (IDCC 1729). Droit commun.',
  }
,
  {
    idcc: 1730, nom: 'Imprimeurs sérigraphes', secteur: 'Imprimerie sérigraphie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Contingent HS réduit à 180h (accord branche) — applicable aux non-cadres', 'Cadres en forfait jours : plafond 218j légal'],
    notes: 'Groupe IAA180. Contingent HS 180h pour le personnel non-cadre. Cadres en forfait jours : règles DC standard.',
  }
,
  {
    idcc: 1734, nom: 'Prestataires de services du secteur tertiaire', secteur: 'Services tertiaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Prestataires services tertiaires L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier si l\'accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Prestataires de services du secteur tertiaire (IDCC 1734). Droit commun.',
  }
,
  {
    idcc: 1735, nom: 'Logistique de distribution et livraison', secteur: 'Logistique livraison',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1740, nom: 'Pêche maritime et cultures marines', secteur: 'Pêche maritime',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1742, nom: 'Centres de thalassothérapie', secteur: 'Thalassothérapie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1744, nom: 'Photographie de portrait et publicitaire', secteur: 'Photographie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Photographie : directeurs de studio en forfait jours — amplitude lors des productions longues'],
    notes: 'Photographie de portrait et publicitaire (IDCC 1744). Droit commun.',
  }
,
  {
    idcc: 1747, nom: 'Librairie', secteur: 'Commerce culturel',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1748, nom: 'Graphisme et design', secteur: 'Graphisme design',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: true, suiviCharge: 'Art. L3121-65',
    alertes: ['Graphisme/design : forfait jours pour les DA et chefs de studio', 'Pics lors des remises d\'appels d\'offres et de BAT'],
    notes: 'Graphisme et design (IDCC 1748). Droit commun. Droit à la déconnexion recommandé.',
  }
,
  {
    idcc: 1749, nom: 'Développement web et applications', secteur: 'Développement web',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: true, suiviCharge: 'Art. L3121-65',
    alertes: ['Développement web : culture "agilité" et sprints — amplitude à surveiller', 'Astreintes de production à comptabiliser dans le suivi de charge'],
    notes: 'Développement web et applications (IDCC 1749). Droit commun. Vérifier si Syntec ou un accord d\'entreprise s\'applique.',
  }
,
  {
    idcc: 1750, nom: 'Intelligence artificielle et data', secteur: 'IA data',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: true, suiviCharge: 'Art. L3121-65',
    alertes: ['IA & data : secteur en forte croissance — vérifier les accords d\'entreprise naissants', 'Télétravail dominant : formaliser le droit à la déconnexion'],
    notes: 'Intelligence artificielle et data (IDCC 1750). Droit commun. Secteur très récent sans accord de branche consolidé.',
  }
,
  {
    idcc: 1751, nom: 'Cybersécurité et infogérance', secteur: 'Infogérance',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: true, suiviCharge: 'Art. L3121-65',
    alertes: ['Cybersécurité : astreintes et incidents de nuit — amplitude à déclarer impérativement', 'SOC 24/7 : vérifier le régime applicable aux équipes de garde'],
    notes: 'Cybersécurité et infogérance (IDCC 1751). Droit commun. Astreintes fréquentes à inclure dans le suivi de charge.',
  }
,
  {
    idcc: 1753, nom: 'Editeurs de logiciels', secteur: 'Editeurs logiciels',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: true, suiviCharge: 'Art. L3121-65',
    alertes: ['Éditeurs de logiciels : souvent couverts par Syntec — vérifier la CCN applicable'],
    notes: 'Éditeurs de logiciels (IDCC 1753). Vérifier si la CCN Syntec (IDCC 1486) s\'applique — souvent le cas.',
  }
,
  {
    idcc: 1757, nom: 'Centres de planification éducation familiale', secteur: 'Planification familiale',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1758, nom: 'Etablissements enfants inadaptés privés', secteur: 'Education spécialisée',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1759, nom: 'Foyers hébergement travailleurs handicapés', secteur: 'Hébergement handicapés',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1760, nom: 'Services aide aux toxicomanes', secteur: 'Addictologie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1761, nom: 'Services aide personnes sans abri', secteur: 'Hébergement social',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1762, nom: 'Associations intermédiaires insertion', secteur: 'Insertion professionnelle',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1763, nom: 'Chantiers insertion', secteur: 'Insertion chantiers',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1764, nom: 'Entreprises adaptées', secteur: 'Entreprises adaptées',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1765, nom: 'ESAT établissements aide par le travail', secteur: 'ESAT',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1767, nom: 'Crèches associatives', secteur: 'Crèches associatives',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1768, nom: 'Accueil de loisirs sans hébergement ALSH', secteur: 'ALSH loisirs',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['ÉCLAT : contingent HS très réduit 70h — forfait jours préféré pour les directeurs'],
    notes: 'Animation ÉCLAT. Contingent HS 70h très réduit.',
  }
,
  {
    idcc: 1769, nom: 'Travaux publics ETAM', secteur: 'Travaux publics',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Travaux Publics ETAM L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['ETAM Travaux Publics : vérifier si votre classification permet le forfait jours', 'Forfait jours réservé aux cadres autonomes (position P3 et supérieure)'],
    notes: 'Travaux Publics ETAM (IDCC 1769). Droit commun du forfait jours pour les cadres TP.',
  }
,
  {
    idcc: 1770, nom: 'Maisons familiales rurales', secteur: 'Maisons familiales rurales',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1771, nom: 'Etablissements privés enseignement agricole', secteur: 'Enseignement agricole',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1775, nom: 'Organismes de gestion écoles catholiques OGEC', secteur: 'OGEC écoles',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1776, nom: 'Foyers de jeunes travailleurs FJT', secteur: 'FJT jeunes',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1779, nom: 'Fédérations sportives nationales', secteur: 'Sport fédérations',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1780, nom: 'Radiodiffusion audiovisuel public et privé', secteur: 'Audiovisuel',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Audiovisuel L3121-65',
    clauseDeconn: true, suiviCharge: 'Accord déconnexion audiovisuel',
    alertes: ['Droit à la déconnexion formalisé dans la branche audiovisuel', 'Tournages et directs : amplitude à surveiller impérativement'],
    notes: 'Radiodiffusion / audiovisuel public et privé (IDCC 1780).',
  }
,
  {
    idcc: 1782, nom: 'Clubs sportifs professionnels', secteur: 'Sport clubs pro',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1783, nom: 'Professions libérales diverses', secteur: 'Professions libérales',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Professions libérales L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Professions libérales : vérifier la convention spécifique de la profession (avocats, notaires, architectes ont leur propre CCN)'],
    notes: 'Professions libérales diverses (IDCC 1783). Vérifier si une CCN plus spécifique s\'applique à votre profession.',
  }
,
  {
    idcc: 1790, nom: 'Edition phonographique et musicale', secteur: 'Musique édition',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Edition phonographique L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Pics de charge en période de sorties d\'albums et de festivals'],
    notes: 'Edition phonographique et musicale (IDCC 1790). Droit commun.',
  }
,
  {
    idcc: 1821, nom: 'Horlogerie', secteur: 'Horlogerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1850, nom: 'Expertise comptable et commissariat aux comptes', secteur: 'Finance audit',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Expertise comptable L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Forte variabilité de charge en période de clôture (nov–avr) à déclarer systématiquement', 'Attention aux amplitudes lors des audits et clôtures statutaires'],
    notes: 'CCN Expertise comptable (IDCC 1850). Droit commun du forfait jours. Périodes de surcharge prévisibles (tax season) à anticiper dans l\'entretien annuel.',
  }
,
  {
    idcc: 1851, nom: 'Personnels APEC', secteur: 'Emploi cadres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Personnels APEC : vérifier l\'accord d\'établissement APEC'],
    notes: 'Personnels APEC (IDCC 1851). Association pour l\'emploi des cadres. Droit commun.',
  }
,
  {
    idcc: 1862, nom: 'Jardineries et graineteries commerce de détail', secteur: 'Commerce jardinage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1870, nom: 'Habillement textiles commerce de détail', secteur: 'Commerce textile',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1891, nom: 'Entrepôts frigorifiques manutention', secteur: 'Logistique froid',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Contingent HS réduit à 180h (accord branche) — applicable aux non-cadres', 'Cadres en forfait jours : plafond 218j légal'],
    notes: 'Groupe IAA180. Contingent HS 180h pour le personnel non-cadre. Cadres en forfait jours : règles DC standard.',
  }
,
  {
    idcc: 1921, nom: 'CCNT 66 inadaptés handicapés', secteur: 'Médico-social CCNT 66',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1965, nom: 'Notariat', secteur: 'Notariat',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Notariat L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Pics en période de fin d\'exercice fiscal, successions complexes et mutations immobilières'],
    notes: 'Notariat (IDCC 1965). Droit commun du forfait jours pour les cadres notariaux.',
  }
,
  {
    idcc: 1966, nom: 'Promotion immobilière', secteur: 'Promotion immobilière',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Promotion immobilière L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Surcharge en phase de livraison de programme immobilier'],
    notes: 'Promotion immobilière (IDCC 1966). Droit commun.',
  }
,
  {
    idcc: 1978, nom: 'Crédit mutuel', secteur: 'Banque mutuelle',
    plafond: 210, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Accord groupe Crédit Mutuel',
    clauseDeconn: true, suiviCharge: 'Accord groupe CM',
    alertes: ['Plafond 210j (accord groupe Crédit Mutuel)', 'Vérifier accord fédéral CM applicable à votre caisse'],
    notes: 'Crédit Mutuel (IDCC 1978). Plafond conventionnel 210j. Accord fédéral variable selon la caisse.',
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
    idcc: 1985, nom: 'Combustibles solides liquides gazeux négoce', secteur: 'Distribution énergie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 1996, nom: 'Vétérinaires praticiens salariés', secteur: 'Santé vétérinaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2002, nom: 'Transport ferroviaire opérateurs privés', secteur: 'Transport ferroviaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2046, nom: 'Ameublement industrie', secteur: 'Industrie ameublement',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2070, nom: 'Couture parisienne haute couture', secteur: 'Mode couture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Couture parisienne L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Couture haute couture : pics lors des défilés (janvier, juillet) — amplitude à déclarer'],
    notes: 'Couture parisienne haute couture (IDCC 2070). Droit commun.',
  }
,
  {
    idcc: 2075, nom: 'Caves coopératives vinicoles', secteur: 'Viticulture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2098, nom: 'Récupération des métaux industries', secteur: 'Recyclage métaux',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2104, nom: 'Pharmacies officine', secteur: 'Pharmacie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Pharmacie officine L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Pharmacie officine : forfait jours pour les directeurs et cadres administratifs'],
    notes: 'Pharmacies officine. Contingent HS 150h.',
  }
,
  {
    idcc: 2120, nom: 'Banques populaires', secteur: 'Banque mutualiste',
    plafond: 208, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Accord groupe BPCE',
    clauseDeconn: true, suiviCharge: 'Accord groupe',
    alertes: ['Plafond réduit 208j (accord groupe BPCE)', 'Vérifier l\'accord d\'établissement de votre caisse régionale'],
    notes: 'BPCE / Banques Populaires (IDCC 2120). Plafond 208j. Chaque caisse régionale peut avoir un accord d\'établissement spécifique.',
  }
,
  {
    idcc: 2128, nom: 'Cabinets dentaires', secteur: 'Santé dentaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2140, nom: 'Assistants maternels du particulier employeur', secteur: 'Assistants maternels',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2148, nom: 'Cabinets experts comptables petits cabinets', secteur: 'Finance petits cabinets',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Cabinets experts-comptables L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Petits cabinets : forte surcharge en mars–avril (campagne fiscale) à déclarer'],
    notes: 'Petits cabinets d\'expertise comptable (IDCC 2148). Droit commun.',
  }
,
  {
    idcc: 2190, nom: 'Centres de lutte contre le cancer CLCC', secteur: 'Santé oncologie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2205, nom: 'Laboratoires de biologie médicale privés', secteur: 'Biologie médicale',
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
    idcc: 2230, nom: 'Eau assainissement propreté urbaine', secteur: 'Eau Environnement',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2247, nom: 'Services automobile garages concessions', secteur: 'Automobile',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2264, nom: 'Télécommunications', secteur: 'Télécoms',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Télécommunications L3121-65',
    clauseDeconn: true, suiviCharge: 'Art. L3121-65',
    alertes: ['Télécoms : astreintes réseau et incidents — amplitude à déclarer', 'Droit à la déconnexion recommandé pour les cadres itinérants'],
    notes: 'Télécommunications (IDCC 2264). Droit commun. Astreintes fréquentes à inclure.',
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
    idcc: 2344, nom: 'Pompes funèbres et marbrerie funéraire', secteur: 'Services funéraires',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2372, nom: 'Commissaires de justice ex huissiers', secteur: 'Juridique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2378, nom: 'Casinos', secteur: 'Jeux casinos',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2395, nom: 'Assistants maternels particulier employeur', secteur: 'Assistants maternels',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2409, nom: 'Enseignement privé sous contrat CPPN CPPE', secteur: 'Education privée',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Enseignement privé sous contrat L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Pics lors des corrections d\'examens et des conseils de classe'],
    notes: 'Enseignement privé sous contrat (IDCC 2409). Droit commun.',
  }
,
  {
    idcc: 2420, nom: 'BTP ETAM employés techniciens agents maîtrise', secteur: 'BTP ETAM',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN BTP ETAM L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['BTP ETAM : forfait jours pour les agents de maîtrise et techniciens autonomes'],
    notes: 'BTP ETAM (IDCC 2420). Convention propre aux employés techniciens agents de maîtrise du bâtiment.',
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
    idcc: 2528, nom: 'Hôtellerie de plein air campings', secteur: 'Tourisme camping',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2537, nom: 'Prothèse dentaire laboratoires', secteur: 'Santé dentaire labo',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2564, nom: 'Bricolage commerce de détail', secteur: 'Commerce bricolage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2582, nom: 'Enseignement privé hors contrat', secteur: 'Education privée hors contrat',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Enseignement privé L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Enseignement privé hors contrat : vérifier l\'accord d\'établissement'],
    notes: 'Enseignement privé hors contrat (IDCC 2582). Droit commun.',
  }
,
  {
    idcc: 2583, nom: 'Fleuristes jardineries animaleries', secteur: 'Commerce floral',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2596, nom: 'Esthétique cosmétique parfumerie enseignement', secteur: 'Esthétique beauté',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Portage salarial L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['⚠️ En portage salarial, le cadre porté gère son temps de façon autonome', 'Vérifier que l\'accord de portage prévoit bien le forfait jours', 'L\'entreprise cliente n\'est pas l\'employeur — le suivi de charge incombe à la société de portage'],
    notes: 'Portage salarial (IDCC 2596). Spécificité : le salarié porté est autonome. L\'accord de portage doit prévoir le forfait jours.',
  }
,
  {
    idcc: 2609, nom: 'Architecture cabinets', secteur: 'Architecture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Architecture L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Surcharge fréquente lors des phases de dépôt de permis et rendu', 'Amplitude à surveiller en période de concours d\'architecture'],
    notes: 'Cabinets d\'architecture (IDCC 2609). Droit commun. Contingent HS réduit à 180h (groupe IAA180).',
  }
,
  {
    idcc: 2614, nom: 'Mécanique', secteur: 'Industrie mécanique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 2615, nom: 'Courtage en assurances et réassurances', secteur: 'Assurance courtage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Courtage assurances L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Courtage : vérifier si la CCN Assurances (1672) ou le courtage (2615) est applicable'],
    notes: 'Courtage en assurance et réassurance (IDCC 2615). Droit commun.',
  }
,
  {
    idcc: 2642, nom: 'Publicité régies et agences', secteur: 'Publicité communication',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Publicité + accord branche 2018',
    clauseDeconn: true, suiviCharge: 'Accord branche publicité déconnexion 2018',
    alertes: ['Accord branche publicité 2018 : droit à la déconnexion renforcé', 'Forfait jours fréquent pour les cadres créatifs, commerciaux et directeurs de clientèle', 'Pics lors des remises de campagnes et périodes de pitch'],
    notes: 'Publicité / Communication (IDCC 2642). Droit à la déconnexion formalisé par accord de branche 2018.',
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
    idcc: 2770, nom: 'Edition de jeux électroniques', secteur: 'Edition jeux vidéo',
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
    idcc: 2941, nom: 'Aide accompagnement soins à domicile BASS', secteur: 'Aide à domicile',
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
    idcc: 3013, nom: 'Librairie', secteur: 'Commerce librairie',
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
    idcc: 3043, nom: 'Entreprises propreté services associés', secteur: 'Propreté services',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3082, nom: 'Agents généraux assurances personnel', secteur: 'Assurance agences',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3090, nom: 'Edition livres presse multimédia', secteur: 'Edition',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Edition L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Pics de charge en période de rentrée littéraire (août–septembre)'],
    notes: 'Edition livres, presse, multimédia (IDCC 3090). Droit commun.',
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
    idcc: 3139, nom: 'Parcs de loisirs jardins zoologiques', secteur: 'Tourisme loisirs',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3160, nom: 'Associations gestion comptabilité', secteur: 'Gestion comptable asso',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3186, nom: 'Nettoyage entreprises de propreté', secteur: 'Propreté',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Propreté : forfait jours pour les directeurs régionaux et directeurs de sites'],
    notes: 'Entreprises de propreté. Forfait jours pour les cadres de direction.',
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
    idcc: 3205, nom: 'Cabinets géomètres-experts topographes', secteur: 'Géomètre expert',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3217, nom: 'Transport sanitaire ambulanciers', secteur: 'Transport sanitaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3218, nom: 'Sociétés course par course', secteur: 'Transport course',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3219, nom: 'Doublage postsynchronisation oeuvres audiovisuelles', secteur: 'Audiovisuel doublage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3220, nom: 'Particuliers employeurs et emploi à domicile FEPEM', secteur: 'Emploi à domicile',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3227, nom: 'FNSEA exploitations entreprises agricoles', secteur: 'Agriculture FNSEA',
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
    idcc: 3233, nom: 'Organismes formation professionnelle', secteur: 'Formation pro',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 3236, nom: 'Menuisiers facteurs orgue et pianos', secteur: 'Artisanat musical',
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
    idcc: 3238, nom: 'Papiers et cartons industries', secteur: 'Industrie papier',
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
    idcc: 3248, nom: 'Métallurgie accord national unique 2023', secteur: 'Métallurgie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'ANU Métallurgie 2023 — Titre VI',
    clauseDeconn: true, suiviCharge: 'ANU Métallurgie Titre VI suivi charge',
    alertes: ['⚠️ Nouvel ANU Métallurgie 2023 : régime transitoire jusqu\'au 31/12/2025', 'Intégration des anciens accords de branche UIMM dans l\'ANU', 'Droit à la déconnexion formalisé dans l\'ANU Titre VIII', 'Entretien annuel renforcé par l\'ANU — vérifier la convention d\'entreprise'],
    notes: 'Accord National Unique de la Métallurgie (IDCC 3248 depuis 2023). Regroupe +200 anciennes CCN UIMM. Transition complète au 31/12/2025.',
  }
,
  {
    idcc: 3257, nom: 'Mutuelles organismes mutualistes', secteur: 'Assurance mutualiste',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Accord branche mutualiste',
    clauseDeconn: true, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier accord de branche mutualiste spécifique', 'Forfait jours très répandu pour les cadres du secteur mutualiste'],
    notes: 'Mutuelles organismes mutualistes (IDCC 3257). Droit commun + accord de branche mutualiste.',
  }
,
  {
    idcc: 3326, nom: 'Bâtiment agents de maîtrise et techniciens', secteur: 'Bâtiment AM',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN Bâtiment AM L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Agents de maîtrise Bâtiment : vérifier l\'accord d\'entreprise spécifique'],
    notes: 'Bâtiment agents de maîtrise et techniciens (IDCC 3326).',
  }
,
  {
    idcc: 3381, nom: 'Acteurs du lien social et familial ALISFA', secteur: 'Action sociale ESS',
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
    idcc: 5021, nom: 'Navigation intérieure bateliers', secteur: 'Transport fluvial',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7016, nom: 'Coopératives agricoles céréales meunerie alimentation bétail', secteur: 'Coopératives agricoles',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7024, nom: 'Vins et spiritueux commerce de gros', secteur: 'Commerce vins',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7025, nom: 'Coopératives fruitières et légumières', secteur: 'Coopératives agricoles',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7502, nom: 'Pépinières horticoles nationales', secteur: 'Horticulture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7503, nom: 'Entreprises de jardinage', secteur: 'Jardinage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7504, nom: 'Champignonnières', secteur: 'Agriculture champignons',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7505, nom: 'Centres équestres et haras', secteur: 'Equitation',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7506, nom: 'Elevage avicole', secteur: 'Agriculture aviculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7507, nom: 'Exploitations forestières et scieries agricoles', secteur: 'Agriculture forêt',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7508, nom: 'Coopératives laitières fromagères', secteur: 'Coopératives laitières',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7509, nom: 'Travaux agricoles et ruraux', secteur: 'Travaux agricoles',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7511, nom: 'Tabac culture et production', secteur: 'Agriculture tabac',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7512, nom: 'Arboriculture fruitière', secteur: 'Agriculture arboriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7513, nom: 'Maraîchage et cultures légumières', secteur: 'Maraîchage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 7514, nom: 'Serres horticoles', secteur: 'Agriculture serres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9001, nom: 'Exploitations agricoles national', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9011, nom: 'Exploitations agricoles Ain', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9021, nom: 'Exploitations agricoles Aisne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9031, nom: 'Exploitations agricoles Allier', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9051, nom: 'Exploitations agricoles Hautes-Alpes', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9061, nom: 'Exploitations agricoles Alpes-Maritimes', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9071, nom: 'Exploitations agricoles Ardèche', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9081, nom: 'Exploitations agricoles Ardennes', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9091, nom: 'Exploitations agricoles Ariège', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9101, nom: 'Exploitations agricoles Aube', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9111, nom: 'Exploitations agricoles Aude', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9121, nom: 'Exploitations agricoles Aveyron', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9131, nom: 'Exploitations agricoles Bouches-du-Rhône', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9141, nom: 'Exploitations agricoles Calvados', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9151, nom: 'Exploitations agricoles Cantal', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9161, nom: 'Exploitations agricoles Charente', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9171, nom: 'Exploitations agricoles Charente-Maritime', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9181, nom: 'Exploitations agricoles Cher', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9191, nom: 'Exploitations agricoles Corrèze', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9201, nom: 'Exploitations agricoles Cote-d-Or', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9211, nom: 'Exploitations agricoles Cotes d Armor', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9221, nom: 'Exploitations agricoles Creuse', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9231, nom: 'Exploitations agricoles Dordogne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9241, nom: 'Exploitations agricoles Doubs', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9251, nom: 'Exploitations agricoles Drôme', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9261, nom: 'Exploitations agricoles Eure', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9271, nom: 'Exploitations agricoles Eure-et-Loir', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9281, nom: 'Exploitations agricoles Finistère', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9291, nom: 'Exploitations agricoles Gard', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9301, nom: 'Exploitations agricoles Haute-Garonne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9311, nom: 'Exploitations agricoles Gers', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9321, nom: 'Exploitations agricoles Gironde', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9331, nom: 'Exploitations agricoles Hérault', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9341, nom: 'Exploitations agricoles Ille-et-Vilaine', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9351, nom: 'Exploitations agricoles Indre', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9361, nom: 'Exploitations agricoles Indre-et-Loire', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9371, nom: 'Exploitations agricoles Isère', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9381, nom: 'Exploitations agricoles Jura', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9391, nom: 'Exploitations agricoles Landes', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9401, nom: 'Exploitations agricoles Loir-et-Cher', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9411, nom: 'Exploitations agricoles Loire', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9421, nom: 'Exploitations agricoles Haute-Loire', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9431, nom: 'Exploitations agricoles Loire-Atlantique', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9441, nom: 'Exploitations agricoles Loiret', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9451, nom: 'Exploitations agricoles Lot', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9461, nom: 'Exploitations agricoles Lot-et-Garonne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9471, nom: 'Exploitations agricoles Lozère', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9481, nom: 'Exploitations agricoles Maine-et-Loire', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9491, nom: 'Exploitations agricoles Manche', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9501, nom: 'Exploitations agricoles Marne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9511, nom: 'Exploitations agricoles Haute-Marne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9521, nom: 'Exploitations agricoles Mayenne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9531, nom: 'Exploitations agricoles Meurthe-et-Moselle', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9541, nom: 'Exploitations agricoles Meuse', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9551, nom: 'Exploitations agricoles Morbihan', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9561, nom: 'Exploitations agricoles Moselle', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9571, nom: 'Exploitations agricoles Nièvre', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9581, nom: 'Exploitations agricoles Nord', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9591, nom: 'Exploitations agricoles Oise', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9601, nom: 'Exploitations agricoles Orne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9611, nom: 'Exploitations agricoles Pas-de-Calais', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9621, nom: 'Exploitations agricoles Puy-de-Dôme', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9631, nom: 'Exploitations agricoles Pyrénées-Atlantiques', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9641, nom: 'Exploitations agricoles Hautes-Pyrénées', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9651, nom: 'Exploitations agricoles Pyrénées-Orientales', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9661, nom: 'Exploitations agricoles Bas-Rhin', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9671, nom: 'Exploitations agricoles Haut-Rhin', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9681, nom: 'Exploitations agricoles Rhône', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9691, nom: 'Exploitations agricoles Haute-Saône', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9701, nom: 'Exploitations agricoles Saône-et-Loire', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9711, nom: 'Exploitations agricoles Sarthe', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9721, nom: 'Exploitations agricoles Savoie', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9731, nom: 'Exploitations agricoles Haute-Savoie', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9741, nom: 'Exploitations agricoles Paris Seine Seine-et-Marne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9751, nom: 'Exploitations agricoles Seine-Maritime', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9761, nom: 'Exploitations agricoles Deux-Sèvres', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9771, nom: 'Exploitations agricoles Somme', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9781, nom: 'Exploitations agricoles Tarn', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9791, nom: 'Exploitations agricoles Tarn-et-Garonne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9801, nom: 'Exploitations agricoles Var', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9811, nom: 'Accord national agriculture salariés', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9821, nom: 'Exploitations agricoles Vendée', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9831, nom: 'Exploitations agricoles Vienne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9841, nom: 'Exploitations agricoles Haute-Vienne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9851, nom: 'Exploitations agricoles Vosges', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9861, nom: 'Exploitations agricoles Yonne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9871, nom: 'Exploitations agricoles Territoire de Belfort', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9881, nom: 'Exploitations agricoles Essonne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9891, nom: 'Exploitations agricoles Hauts-de-Seine', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9901, nom: 'Exploitations agricoles Seine-Saint-Denis', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9911, nom: 'Exploitations agricoles Val-de-Marne', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 9921, nom: 'Exploitations agricoles Val-d-Oise', secteur: 'Agriculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'Art. L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Droit commun applicable — vérifier si un accord d\'entreprise prévoit des dispositions plus favorables'],
    notes: 'Régime de droit commun (Art. L3121-64). Plafond légal 218j. Vérifiez si votre entreprise a signé un accord collectif dérogatoire.',
  }
,
  {
    idcc: 18, nom: 'Industries textiles', secteur: 'Textile',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 18 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industrie textile (IDCC 18). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 461, nom: 'Industries du bois et importations bois', secteur: 'Bois et dérivés',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 461 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Filière bois (IDCC 461). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 463, nom: 'Manutention nettoyage aéroports région parisienne', secteur: 'Manutention aéroportuaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 463 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Aéroports IDF (IDCC 463). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 468, nom: 'Commerces et services audiovisuel électronique équipement ménager', secteur: 'Commerce électronique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 468 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Distribution électronique (IDCC 468). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 487, nom: 'Cabinets d\'experts comptables et commissaires aux comptes', secteur: 'Comptabilité',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 487 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Cabinets EC/CAC — secteur exposé au forfait jours (IDCC 487). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 710, nom: 'Articles de sport et équipements de loisirs', secteur: 'Sport et loisirs distribution',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 710 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Distribution sport (IDCC 710). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 723, nom: 'Personnel sédentaire navigation intérieure', secteur: 'Navigation fluviale',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 723 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Personnel sédentaire (IDCC 723). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 779, nom: 'Banque française commerciale étrangère France métropolitaine', secteur: 'Banque internationale',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 779 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Banque internationale (IDCC 779). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 829, nom: 'Distribution films cinématographiques', secteur: 'Cinéma distribution',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 829 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Distribution films (IDCC 829). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 836, nom: 'Personnel cliniques vétérinaires', secteur: 'Vétérinaire personnel',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 836 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Personnel auxiliaire vétérinaire (IDCC 836). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 893, nom: 'Boyauderie', secteur: 'Boyauderie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 893 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Filière boyauderie (IDCC 893). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 953, nom: 'Fleuristes vente plantes graines animaux', secteur: 'Fleuriste animalerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 953 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Commerce floral (IDCC 953). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1247, nom: 'Galeries d\'art commerce art', secteur: 'Galeries d\'art',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1247 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Marché de l\'art (IDCC 1247). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1257, nom: 'Industries panneaux à base de bois', secteur: 'Panneaux bois',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1257 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industrie panneaux bois (IDCC 1257). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1281, nom: 'Distribution conseil pharmaceutique vétérinaire', secteur: 'Pharmacie vétérinaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1281 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Distribution vétérinaire (IDCC 1281). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1304, nom: 'Personnel ouvrier travaux publics', secteur: 'TP ouvriers',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1304 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Travaux publics ouvriers (IDCC 1304). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1420, nom: 'Personnel auxiliaire familial éducatif employeurs particuliers', secteur: 'Personnel familial',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1420 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Particuliers employeurs (IDCC 1420). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1424, nom: 'Reprographie', secteur: 'Reprographie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1424 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Reprographie services (IDCC 1424). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1495, nom: 'Vins cidres jus fruits sirops spiritueux', secteur: 'Boissons commerce',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1495 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Distribution boissons (IDCC 1495). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1504, nom: 'Pâtisserie artisanale', secteur: 'Pâtisserie artisanale',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1504 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Boulangerie-pâtisserie artisans (IDCC 1504). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1505, nom: 'Commerce détail fruits et légumes alimentation générale', secteur: 'Commerce détail alimentation',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1505 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Commerce alimentation proximité (IDCC 1505). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1572, nom: 'Industries céramiques de France', secteur: 'Céramique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1572 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industrie céramique (IDCC 1572). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1580, nom: 'Pompes funèbres', secteur: 'Pompes funèbres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1580 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Services funéraires (IDCC 1580). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1605, nom: 'Entreprises de désinfection désinsectisation dératisation 3D', secteur: '3D désinfection',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1605 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Hygiène environnementale (IDCC 1605). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1612, nom: 'Logistique communication écrite directe', secteur: 'Logistique routage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1612 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Routage publicitaire (IDCC 1612). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1635, nom: 'Cabinets ou entreprises géomètres experts', secteur: 'Géomètres experts',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1635 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Géomètres (IDCC 1635). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1671, nom: 'Cabinets dentaires d\'orthopédie dento-faciale ouvriers techniciens', secteur: 'Cabinets dentaires',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1671 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Cabinets dentaires personnel (IDCC 1671). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1701, nom: 'Carrefour bleu Carrefour proximité', secteur: 'Distribution alimentation',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1701 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Carrefour proximité (IDCC 1701). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1710, nom: 'Casinos', secteur: 'Casinos',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1710 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Casinos jeux (IDCC 1710). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1794, nom: 'Industrie matériaux construction céramiques pour bâtiment', secteur: 'Matériaux construction céramique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1794 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Céramique bâtiment (IDCC 1794). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1801, nom: 'Sociétés financières', secteur: 'Sociétés financières',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1801 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Établissements de crédit non bancaires — secteur cadres (IDCC 1801). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1812, nom: 'Industries pharmaceutiques fabrication', secteur: 'Pharmacie industrielle',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1812 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industrie pharma (IDCC 1812). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1820, nom: 'Jardineries graineteries', secteur: 'Jardinerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1820 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Distribution horticole (IDCC 1820). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1828, nom: 'Marchés alimentaires détaillants vente alimentation générale', secteur: 'Marchés alimentation',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1828 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Commerce sur marchés (IDCC 1828). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1843, nom: 'Cabinets et cliniques vétérinaires personnel salarié', secteur: 'Cliniques vétérinaires',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1843 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Personnel salarié vétérinaire (IDCC 1843). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1880, nom: 'Distributeurs conseils hors domicile', secteur: 'Distribution boissons CHD',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1880 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Distribution boissons CHD (IDCC 1880). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1909, nom: 'Organismes de tourisme', secteur: 'Tourisme organismes',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1909 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Offices de tourisme (IDCC 1909). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1922, nom: 'Personnels radiodiffusion radios privées', secteur: 'Radios privées',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1922 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Radiodiffusion personnel (IDCC 1922). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1930, nom: 'Métiers transformation grains', secteur: 'Meunerie biscuiterie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1930 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Transformation grains (IDCC 1930). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1938, nom: 'Industries chocolaterie confiserie biscuiterie', secteur: 'Chocolaterie biscuiterie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1938 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industrie sucrée (IDCC 1938). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1941, nom: 'Mareyeurs expéditeurs', secteur: 'Mareyage',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1941 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Mareyeurs (IDCC 1941). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1944, nom: 'Marchés financiers ouvriers employés techniciens cadres', secteur: 'Marchés financiers',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1944 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Marchés financiers — forfait jours fréquent (IDCC 1944). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1947, nom: 'Habillement industrie', secteur: 'Habillement industrie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1947 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industrie habillement (IDCC 1947). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1951, nom: 'Cabinets immobiliers administrateurs biens', secteur: 'Immobilier cabinets',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1951 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Administrateurs de biens — cadres souvent en forfait jours (IDCC 1951). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1960, nom: 'Conchyliculture', secteur: 'Conchyliculture',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1960 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Élevage coquillages (IDCC 1960). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1961, nom: 'Personnel petits magasins équipement foyer non alimentaires', secteur: 'Équipement foyer',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1961 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Petits magasins équipement (IDCC 1961). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1967, nom: 'Importation distribution films cinématographiques', secteur: 'Cinéma importation',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1967 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Importation films (IDCC 1967). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 1987, nom: 'Pâtisserie', secteur: 'Pâtisserie industrielle',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 1987 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Pâtisserie artisans patrons (IDCC 1987). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2017, nom: 'Industries graphiques cadres', secteur: 'Graphisme cadres',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2017 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industries graphiques cadres — forfait jours fréquent (IDCC 2017). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2089, nom: 'Industries carrières et matériaux ouvriers', secteur: 'Carrières matériaux',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2089 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industries carrières ouvriers (IDCC 2089). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2111, nom: 'Salariés du particulier employeur', secteur: 'Particulier employeur salarié',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2111 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Salariés particuliers employeurs (IDCC 2111). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2147, nom: 'Entreprises eaux-de-vie eaux mises', secteur: 'Eaux-de-vie spiritueux',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2147 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Production spiritueux (IDCC 2147). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2150, nom: 'Personnels organismes Sécurité Sociale agricole MSA', secteur: 'Sécurité Sociale agricole',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2150 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'MSA personnel (IDCC 2150). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
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
    idcc: 2174, nom: 'Crédit Agricole', secteur: 'Crédit Agricole',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2174 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Banque Crédit Agricole — cadres souvent en forfait jours (IDCC 2174). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2206, nom: 'CRPCEN clercs et employés notaires', secteur: 'Notariat clercs',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2206 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Notariat clercs employés (IDCC 2206). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2257, nom: 'Casinos employés', secteur: 'Casinos employés',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2257 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Casinos personnel (IDCC 2257). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2272, nom: 'Personnel sédentaire transports maritimes', secteur: 'Maritime sédentaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2272 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Transport maritime sédentaire (IDCC 2272). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2326, nom: 'Production audiovisuelle techniciens', secteur: 'Audiovisuel techniciens',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2326 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Production audiovisuelle (IDCC 2326). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2336, nom: 'Entreprises sociales pour l\'habitat ESH', secteur: 'Logement social ESH',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2336 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Bailleurs sociaux (IDCC 2336). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2389, nom: 'Industries fabrication ciment', secteur: 'Cimenterie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2389 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industrie ciment (IDCC 2389). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2405, nom: 'Centres immatriculation véhicules', secteur: 'Immatriculation véhicules',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2405 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Service immatriculation (IDCC 2405). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2408, nom: 'Personnel coopératives consommateurs', secteur: 'Coopératives consommation',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2408 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Coopératives consommateurs (IDCC 2408). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2411, nom: 'Chaînes thématiques', secteur: 'Télévision thématique',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2411 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Chaînes télé thématiques (IDCC 2411). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2542, nom: 'Entreprises gardiennage sécurité conducteurs cynophiles', secteur: 'Cynophile sécurité',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2542 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Maîtres-chiens sécurité (IDCC 2542). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2603, nom: 'Branche ferroviaire personnel sédentaire', secteur: 'Ferroviaire sédentaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2603 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Personnel ferroviaire (IDCC 2603). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2622, nom: 'Crédit Maritime Mutuel', secteur: 'Crédit Maritime',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2622 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Banque crédit maritime (IDCC 2622). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2666, nom: 'Pâtes alimentaires sèches couscous non préparé', secteur: 'Pâtes couscous',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2666 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industrie pâtes (IDCC 2666). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2706, nom: 'Personnel sédentaire transports maritimes ETA', secteur: 'Maritime sédentaire ETA',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2706 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Transport maritime ETA (IDCC 2706). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2728, nom: 'Sucreries distilleries raffineries', secteur: 'Sucre raffinerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2728 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industrie sucrière (IDCC 2728). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2754, nom: 'Vins Champagne ouvriers employés', secteur: 'Champagne',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2754 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Champagne ouvriers (IDCC 2754). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2768, nom: 'Télécommunications', secteur: 'Télécoms',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2768 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Opérateurs télécoms — cadres souvent en forfait jours (IDCC 2768). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2785, nom: 'Industrie pétrolière', secteur: 'Pétrole industrie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2785 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industries pétrolières (IDCC 2785). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2796, nom: 'Personnel sociétés coopératives HLM', secteur: 'Coopératives HLM',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2796 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Sociétés HLM coopératives (IDCC 2796). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2847, nom: 'Activités directe d\'autoroute', secteur: 'Autoroutes',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2847 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Sociétés autoroutières (IDCC 2847). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2964, nom: 'Personnel sociétés assistance', secteur: 'Sociétés assistance',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2964 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Assistance dépannage (IDCC 2964). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2978, nom: 'Golf', secteur: 'Golf',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2978 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Activités golf (IDCC 2978). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2980, nom: 'Branche ferroviaire', secteur: 'Ferroviaire branche',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2980 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Branche ferroviaire générale (IDCC 2980). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 2998, nom: 'Personnels organismes mutualité', secteur: 'Mutualité personnel',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 2998 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Mutuelles santé (IDCC 2998). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3028, nom: 'Médecine du travail interentreprises SSTI', secteur: 'SST interentreprises',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3028 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'SSTI médecine travail (IDCC 3028). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3105, nom: 'Conseils architecture urbanisme environnement CAUE', secteur: 'CAUE',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3105 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'CAUE conseils architecture (IDCC 3105). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3128, nom: 'Cabinets ophtalmologistes', secteur: 'Ophtalmologie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3128 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Cabinets ophtalmologie (IDCC 3128). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3144, nom: 'Producteurs de films français', secteur: 'Cinéma production',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3144 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Production cinéma (IDCC 3144). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3168, nom: 'Avocats salariés', secteur: 'Avocats salariés',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3168 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Cabinets d\'avocats salariés — forfait jours fréquent (IDCC 3168). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3204, nom: 'Chemin de fer secondaire local industriel', secteur: 'Ferroviaire secondaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3204 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Chemin fer secondaire (IDCC 3204). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3206, nom: 'Acteurs commerce restauration livraison rapide', secteur: 'Livraison rapide',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3206 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Livraison restauration (IDCC 3206). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3213, nom: 'Sucres et raffineries', secteur: 'Sucre raffinerie',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3213 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industrie sucrière (IDCC 3213). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3216, nom: 'Activités industrielles boulangerie pâtisserie', secteur: 'Boulangerie industrielle',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3216 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Industries boulangerie (IDCC 3216). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3221, nom: 'Salariés cabinets dentaires', secteur: 'Cabinets dentaires salariés',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3221 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Cabinets dentaires personnel (IDCC 3221). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3251, nom: 'Officines pharmaceutiques personnel', secteur: 'Officines personnel',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3251 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Pharmacie officine personnel (IDCC 3251). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3275, nom: 'Activités sport et équipements loisirs', secteur: 'Sport équipements',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3275 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Sport et loisirs distribution (IDCC 3275). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3284, nom: 'Régies du contrat publicité', secteur: 'Régies publicitaires',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3284 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Publicité régies (IDCC 3284). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3292, nom: 'Personnel sociétés interbancaires', secteur: 'Sociétés interbancaires',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3292 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Sociétés financières spécialisées (IDCC 3292). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3301, nom: 'Personnel cabinets entreprises économiste construction métreurs vérificateurs', secteur: 'Économistes construction',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3301 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Métreurs vérificateurs (IDCC 3301). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3303, nom: 'Personnel salarié OPCO', secteur: 'OPCO',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3303 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Opérateurs compétences (IDCC 3303). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3305, nom: 'Personnel France Domaine immobilier État', secteur: 'Domaine État',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3305 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Personnel France Domaine (IDCC 3305). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3309, nom: 'Boulangerie pâtisserie de France', secteur: 'Boulangerie pâtisserie France',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3309 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Boulangerie pâtisserie nationale (IDCC 3309). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3311, nom: 'Branche transports voyageurs', secteur: 'Transports voyageurs',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3311 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Voyageurs interurbain (IDCC 3311). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3320, nom: 'Filière bois construction commerce', secteur: 'Bois construction',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3320 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Filière bois (IDCC 3320). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3322, nom: 'Métiers commerce détail alimentation spécialisée', secteur: 'Commerce alimentation spé',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3322 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Détaillants alimentation (IDCC 3322). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3340, nom: 'Filière distribution domaine matériaux construction', secteur: 'Matériaux distribution',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3340 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Distribution matériaux construction (IDCC 3340). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3346, nom: 'Personnel sociétés gestion plein air', secteur: 'Plein air gestion',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3346 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Camping plein air (IDCC 3346). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3364, nom: 'Personnel salarié Caisse Épargne', secteur: 'Caisse Épargne',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3364 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Banque Caisse d\'Épargne — cadres en forfait jours (IDCC 3364). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
,
  {
    idcc: 3373, nom: 'Personnel salarié Banque Populaire', secteur: 'Banque Populaire',
    plafond: 218, plafondCDRef: 218, tauxRachat: 10,
    entretienFreq: 'annuel', entretienRef: 'CCN 3373 L3121-65',
    clauseDeconn: false, suiviCharge: 'Art. L3121-65',
    alertes: ['Vérifier que l\'accord d\'entreprise ou de branche autorise explicitement le forfait jours pour les cadres concernés', 'Mention obligatoire dans le contrat de travail (Cass. Soc. 16/06/2010)'],
    notes: 'Banque Populaire — cadres en forfait jours (IDCC 3373). Régime droit commun applicable. Vérifier accord de branche pour spécificités forfait jours cadres.',
  }
];

const CCN_CD_DATA = [
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
    idcc: 29, nom: 'Hospitalisation privée non lucratif FEHAP CCN 51 — Cadres Dirigeants', secteur: 'Médico-social FEHAP',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Hospitalisation privée non lucratif FEHAP CCN 51 — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Médico-social FEHAP.',
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
    idcc: 44, nom: 'Industries chimiques — Cadres Dirigeants', secteur: 'Industrie chimique',
    critereCD: 'Directeurs de site chimique, directeurs R&D, directeurs de division. Grille chimie hors classe.',
    rmgCD: 'Hors grille CCN Chimie — aucun minimum conventionnel CD',
    entretienCD: 'Non obligatoire légalement pour les CD',
    droitsCP: '25j ouvrables (L3141-1)',
    alertesCD: ['Industries chimiques : habilitations Seveso à maintenir même pour les CD (obligations réglementaires)', 'CHSCT/CSE : obligations spécifiques en établissements Seveso'],
    notesCD: 'Industries chimiques (IDCC 44). Application L3111-2 standard. Points réglementaires spécifiques aux sites classés.',
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
    idcc: 83, nom: 'Menuiseries charpentes constructions industrialisées — Cadres Dirigeants', secteur: 'Industrie bois',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Menuiseries charpentes constructions industrialisées — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie bois.',
  }
,
  {
    idcc: 86, nom: 'Sucre sucreries distilleries raffineries — Cadres Dirigeants', secteur: 'IAA sucre',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sucre sucreries distilleries raffineries — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA sucre.',
  }
,
  {
    idcc: 87, nom: 'Ouvriers industries carrières matériaux UNICEM — Cadres Dirigeants', secteur: 'Industrie extractive',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Ouvriers industries carrières matériaux UNICEM — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie extractive.',
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
    idcc: 135, nom: 'ETAM industries carrières matériaux UNICEM — Cadres Dirigeants', secteur: 'Industrie extractive',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'ETAM industries carrières matériaux UNICEM — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie extractive.',
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
    idcc: 176, nom: 'Chaussure industrie — Cadres Dirigeants', secteur: 'Industrie chaussure',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Chaussure industrie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie chaussure.',
  }
,
  {
    idcc: 179, nom: 'Coopératives de consommation — Cadres Dirigeants', secteur: 'Coopératives',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Coopératives de consommation — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Coopératives.',
  }
,
  {
    idcc: 184, nom: 'Carrières et matériaux — Cadres Dirigeants', secteur: 'Industrie extractive',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Carrières et matériaux — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie extractive.',
  }
,
  {
    idcc: 200, nom: 'Industrie du verre — Cadres Dirigeants', secteur: 'Industrie verrière',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie du verre — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie verrière.',
  }
,
  {
    idcc: 207, nom: 'Meunerie — Cadres Dirigeants', secteur: 'IAA meunerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Meunerie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA meunerie.',
  }
,
  {
    idcc: 211, nom: 'Industries et commerces en gros des viandes — Cadres Dirigeants', secteur: 'IAA viandes',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries et commerces en gros des viandes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA viandes.',
  }
,
  {
    idcc: 216, nom: 'Industrie pharmaceutique — Cadres Dirigeants', secteur: 'Industrie pharmaceutique',
    critereCD: 'Directeurs médicaux, directeurs d\'établissement pharmaceutique, VP R&D. Hors grille CCN pharma.',
    rmgCD: 'Hors grille — rémunération parmi les plus élevées (souvent +300K€ brut dans les grands groupes)',
    entretienCD: 'Non obligatoire légalement pour les CD',
    droitsCP: '25j ouvrables (L3141-1)',
    alertesCD: ['Industrie pharmaceutique : obligations réglementaires ANSM/FDA maintenues pour les CD', 'Conflits d\'intérêts à déclarer (transparence Sunshine Act)'],
    notesCD: 'Industrie pharmaceutique (IDCC 216). Nombreux accords d\'entreprise dans les grands groupes (Sanofi, Roche, Pfizer). Application L3111-2 standard.',
  }
,
  {
    idcc: 218, nom: 'Cabinets avocats — Cadres Dirigeants', secteur: 'Avocats',
    critereCD: 'Gérant de SELARL d\'avocats, managing partner. Attention : les associés libéraux ne sont pas salariés.',
    rmgCD: 'Pas de minimum conventionnel pour les CD — hors barème CBM/CNB',
    entretienCD: 'Non obligatoire légalement pour les CD',
    droitsCP: '25j ouvrables (L3141-1)',
    alertesCD: ['⚠️ Avocats : distinction IMPÉRATIVE entre associé libéral (non salarié) et avocat salarié', 'Le managing partner libéral n\'est PAS soumis au Code du travail', 'Seul l\'avocat salarié peut être qualifié CD au sens L3111-2'],
    notesCD: 'Cabinets d\'avocats (IDCC 218). Le statut CD ne concerne que les avocats salariés (directeurs des services juridiques, directeurs administratifs des cabinets).',
  }
,
  {
    idcc: 240, nom: 'Personnel greffes tribunaux de commerce — Cadres Dirigeants', secteur: 'Juridique greffes',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel greffes tribunaux de commerce — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Juridique greffes.',
  }
,
  {
    idcc: 247, nom: 'Industries textiles — Cadres Dirigeants', secteur: 'Industrie textile',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries textiles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie textile.',
  }
,
  {
    idcc: 267, nom: 'BTP Ingénieurs et cadres — Cadres Dirigeants', secteur: 'BTP cadres',
    critereCD: 'Directeurs de filiale BTP, directeurs régionaux à pouvoir autonome sur leur entité.',
    rmgCD: 'Hors grille CCN BTP cadres — aucun minimum conventionnel',
    entretienCD: 'Non obligatoire légalement pour les CD',
    droitsCP: '25j ouvrables (L3141-1)',
    alertesCD: ['BTP : obligations chantier (PPSPS, PGC) maintenues pour les CD', 'Déplacements fréquents : amplitude à surveiller même en régime CD'],
    notesCD: 'BTP Ingénieurs et Cadres (IDCC 267). Application L3111-2 standard.',
  }
,
  {
    idcc: 275, nom: 'Transport aérien personnel au sol — Cadres Dirigeants', secteur: 'Transport aérien sol',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transport aérien personnel au sol — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport aérien sol.',
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
    idcc: 350, nom: 'Industries de la mode et chapellerie — Cadres Dirigeants', secteur: 'Industrie mode',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries de la mode et chapellerie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie mode.',
  }
,
  {
    idcc: 354, nom: 'Ganterie de peau — Cadres Dirigeants', secteur: 'Industrie ganterie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Ganterie de peau — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie ganterie.',
  }
,
  {
    idcc: 363, nom: 'Cadres industrie fabrication ciments — Cadres Dirigeants', secteur: 'Industrie ciment cadres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cadres industrie fabrication ciments — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie ciment cadres.',
  }
,
  {
    idcc: 388, nom: 'Auditoriums cinématographiques — Cadres Dirigeants', secteur: 'Cinéma',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Auditoriums cinématographiques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Cinéma.',
  }
,
  {
    idcc: 398, nom: 'Ouvriers négoce matériaux construction — Cadres Dirigeants', secteur: 'Négoce matériaux',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Ouvriers négoce matériaux construction — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Négoce matériaux.',
  }
,
  {
    idcc: 405, nom: 'Imprimerie de labeur et industries graphiques — Cadres Dirigeants', secteur: 'Imprimerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Imprimerie de labeur et industries graphiques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Imprimerie.',
  }
,
  {
    idcc: 412, nom: 'Transport aérien personnel navigant technique PNT — Cadres Dirigeants', secteur: 'Transport aérien PNT',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transport aérien personnel navigant technique PNT — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport aérien PNT.',
  }
,
  {
    idcc: 413, nom: 'Hospitalisation privée à but lucratif cliniques — Cadres Dirigeants', secteur: 'Santé privée',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Hospitalisation privée à but lucratif cliniques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Santé privée.',
  }
,
  {
    idcc: 435, nom: 'Production cinématographique acteurs — Cadres Dirigeants', secteur: 'Cinéma production',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Production cinématographique acteurs — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Cinéma production.',
  }
,
  {
    idcc: 438, nom: 'Echelons intermédiaires assurances production — Cadres Dirigeants', secteur: 'Assurance production',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Echelons intermédiaires assurances production — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Assurance production.',
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
    idcc: 489, nom: 'Tuiles et briques — Cadres Dirigeants', secteur: 'Industrie matériaux',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Tuiles et briques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie matériaux.',
  }
,
  {
    idcc: 493, nom: 'Bois scieries raboteries résinage — Cadres Dirigeants', secteur: 'Industrie bois',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bois scieries raboteries résinage — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie bois.',
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
    idcc: 504, nom: 'Industries alimentaires diverses 5 branches — Cadres Dirigeants', secteur: 'IAA 5 branches',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries alimentaires diverses 5 branches — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA 5 branches.',
  }
,
  {
    idcc: 506, nom: 'Fabricants importateurs produits exotiques — Cadres Dirigeants', secteur: 'IAA exotique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Fabricants importateurs produits exotiques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA exotique.',
  }
,
  {
    idcc: 533, nom: 'ETAM négoce matériaux construction — Cadres Dirigeants', secteur: 'Négoce matériaux ETAM',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'ETAM négoce matériaux construction — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Négoce matériaux ETAM.',
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
    idcc: 567, nom: 'Jouets jeux articles de puériculture — Cadres Dirigeants', secteur: 'Industrie jouets',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Jouets jeux articles de puériculture — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie jouets.',
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
    idcc: 598, nom: 'Ouvriers presse quotidienne régionale — Cadres Dirigeants', secteur: 'Presse régionale ouvriers',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Ouvriers presse quotidienne régionale — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Presse régionale ouvriers.',
  }
,
  {
    idcc: 614, nom: 'Sérigraphie et impression numérique — Cadres Dirigeants', secteur: 'Imprimerie sérigraphie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sérigraphie et impression numérique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Imprimerie sérigraphie.',
  }
,
  {
    idcc: 625, nom: 'Cadres services généraux théâtres cinématographiques — Cadres Dirigeants', secteur: 'Cinéma cadres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cadres services généraux théâtres cinématographiques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Cinéma cadres.',
  }
,
  {
    idcc: 635, nom: 'Négoce fournitures dentaires — Cadres Dirigeants', secteur: 'Commerce dentaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Négoce fournitures dentaires — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce dentaire.',
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
    idcc: 650, nom: 'Transport routier de voyageurs — Cadres Dirigeants', secteur: 'Transport routier voyageurs',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transport routier de voyageurs — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport routier voyageurs.',
  }
,
  {
    idcc: 652, nom: 'Cadres négoce matériaux construction — Cadres Dirigeants', secteur: 'Négoce matériaux cadres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cadres négoce matériaux construction — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Négoce matériaux cadres.',
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
    idcc: 669, nom: 'Industrie du pétrole — Cadres Dirigeants', secteur: 'Energie pétrolière',
    critereCD: 'Directeurs de raffinerie, directeurs généraux d\'entreprises pétrolières, directeurs régionaux à fort pouvoir.',
    rmgCD: 'Hors grille CCN Pétrole — rémunération parmi les plus élevées',
    entretienCD: 'Non obligatoire légalement pour les CD',
    droitsCP: '25j ouvrables (L3141-1)',
    alertesCD: ['Industrie pétrolière : astreintes de direction en cas d\'incident industriel — à déclarer', 'Obligations HSE (Health Safety Environment) maintenues pour les CD'],
    notesCD: 'Industrie du pétrole (IDCC 669). Application L3111-2 standard. Obligations réglementaires HSE spécifiques.',
  }
,
  {
    idcc: 673, nom: 'Transport aérien personnel au sol — Cadres Dirigeants', secteur: 'Transport aérien sol',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transport aérien personnel au sol — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport aérien sol.',
  }
,
  {
    idcc: 675, nom: 'Banque AFB — Cadres Dirigeants', secteur: 'Banque',
    critereCD: 'Direction générale, directeurs régionaux à pouvoir décisionnel autonome. Accord AFB : distinction Cadre Hors Classe (CHC ≥ coefficient 600) et Cadre Dirigeant L3111-2.',
    rmgCD: 'CHC : coefficient ≥ 600. Pas de RMG CD fixée conventionnellement.',
    entretienCD: 'Bilan de charge annuel recommandé par l\'accord AFB pour tous les cadres y compris CD',
    droitsCP: '25j ouvrables + congés bancaires supplémentaires (accord établissement)',
    alertesCD: ['Banque AFB : le CHC (Cadre Hors Classe) n\'est PAS automatiquement CD au sens L3111-2', 'Pouvoirs bancaires réglementaires (DSCR, RPCA) à vérifier', 'Plafond 205j applicable aux cadres AFB non CD — pas aux CD'],
    notesCD: 'Banque AFB (IDCC 675). Distinction importante : CHC = cadre le mieux classé en forfait jours / CD L3111-2 = hors durée du travail. Les deux régimes ne se confondent pas.',
  }
,
  {
    idcc: 698, nom: 'Employés presse quotidienne régionale — Cadres Dirigeants', secteur: 'Presse régionale employés',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Employés presse quotidienne régionale — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Presse régionale employés.',
  }
,
  {
    idcc: 700, nom: 'Détergents et produits entretien — Cadres Dirigeants', secteur: 'Industrie chimique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Détergents et produits entretien — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie chimique.',
  }
,
  {
    idcc: 706, nom: 'Reprographie personnel — Cadres Dirigeants', secteur: 'Services reprographie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Reprographie personnel — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Services reprographie.',
  }
,
  {
    idcc: 707, nom: 'Cadres transformation papiers cartons — Cadres Dirigeants', secteur: 'Industrie papier cadres transfo',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cadres transformation papiers cartons — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie papier cadres transfo.',
  }
,
  {
    idcc: 715, nom: 'Instruments à écrire industries connexes — Cadres Dirigeants', secteur: 'Industrie instruments écrire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Instruments à écrire industries connexes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie instruments écrire.',
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
    idcc: 731, nom: 'Quincaillerie fournitures industrielles cadres — Cadres Dirigeants', secteur: 'Commerce quincaillerie cadres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Quincaillerie fournitures industrielles cadres — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce quincaillerie cadres.',
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
    idcc: 776, nom: 'Cabinets médicaux — Cadres Dirigeants', secteur: 'Santé libérale',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets médicaux — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Santé libérale.',
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
    idcc: 800, nom: 'Hôtels de chaîne — Cadres Dirigeants', secteur: 'Hôtellerie chaîne',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Hôtels de chaîne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Hôtellerie chaîne.',
  }
,
  {
    idcc: 802, nom: 'Distribution papiers cartons commerce gros OETAM — Cadres Dirigeants', secteur: 'Commerce papier OETAM',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distribution papiers cartons commerce gros OETAM — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce papier OETAM.',
  }
,
  {
    idcc: 803, nom: 'Béton et produits du béton — Cadres Dirigeants', secteur: 'BTP matériaux',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Béton et produits du béton — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). BTP matériaux.',
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
    idcc: 832, nom: 'Ouvriers industrie fabrication ciments — Cadres Dirigeants', secteur: 'Industrie ciment ouvriers',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Ouvriers industrie fabrication ciments — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie ciment ouvriers.',
  }
,
  {
    idcc: 833, nom: 'ETAM industrie fabrication ciments — Cadres Dirigeants', secteur: 'Industrie ciment ETAM',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'ETAM industrie fabrication ciments — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie ciment ETAM.',
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
    idcc: 846, nom: 'Boulangerie-pâtisserie industrielle — Cadres Dirigeants', secteur: 'IAA boulangerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Boulangerie-pâtisserie industrielle — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA boulangerie.',
  }
,
  {
    idcc: 889, nom: 'Employés techniciens théâtres cinématographiques — Cadres Dirigeants', secteur: 'Cinéma employés',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Employés techniciens théâtres cinématographiques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Cinéma employés.',
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
    idcc: 925, nom: 'Cadres distribution papiers cartons commerce gros — Cadres Dirigeants', secteur: 'Commerce papier cadres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cadres distribution papiers cartons commerce gros — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce papier cadres.',
  }
,
  {
    idcc: 951, nom: 'Théâtres privés spectacle vivant lieux fixes — Cadres Dirigeants', secteur: 'Spectacle théâtres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Théâtres privés spectacle vivant lieux fixes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Spectacle théâtres.',
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
    idcc: 992, nom: 'Boucherie boucherie-charcuterie triperie volailles — Cadres Dirigeants', secteur: 'Artisanat boucherie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Boucherie boucherie-charcuterie triperie volailles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Artisanat boucherie.',
  }
,
  {
    idcc: 993, nom: 'Charcuterie de détail — Cadres Dirigeants', secteur: 'Artisanat charcuterie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Charcuterie de détail — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Artisanat charcuterie.',
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
    idcc: 1000, nom: 'Confiserie chocolaterie biscuiterie — Cadres Dirigeants', secteur: 'IAA confiserie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Confiserie chocolaterie biscuiterie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA confiserie.',
  }
,
  {
    idcc: 1031, nom: 'Industrie du caoutchouc — Cadres Dirigeants', secteur: 'Industrie caoutchouc',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie du caoutchouc — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie caoutchouc.',
  }
,
  {
    idcc: 1040, nom: 'Coiffure entreprises — Cadres Dirigeants', secteur: 'Coiffure',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Coiffure entreprises — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Coiffure.',
  }
,
  {
    idcc: 1043, nom: 'Gardiens concierges employés immeubles — Cadres Dirigeants', secteur: 'Gardiennage immeuble',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Gardiens concierges employés immeubles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Gardiennage immeuble.',
  }
,
  {
    idcc: 1044, nom: 'Pâtes alimentaires — Cadres Dirigeants', secteur: 'IAA pâtes',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pâtes alimentaires — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA pâtes.',
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
    idcc: 1147, nom: 'Chaux industrie — Cadres Dirigeants', secteur: 'Industrie extractive',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Chaux industrie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie extractive.',
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
    idcc: 1177, nom: 'Meubles commerce de détail — Cadres Dirigeants', secteur: 'Commerce ameublement',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Meubles commerce de détail — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce ameublement.',
  }
,
  {
    idcc: 1182, nom: 'Corps gras huiles margarines — Cadres Dirigeants', secteur: 'IAA corps gras',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Corps gras huiles margarines — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA corps gras.',
  }
,
  {
    idcc: 1237, nom: 'Centres de gestion agréés — Cadres Dirigeants', secteur: 'Gestion comptable',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Centres de gestion agréés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Gestion comptable.',
  }
,
  {
    idcc: 1240, nom: 'Distillation alcools et spiritueux — Cadres Dirigeants', secteur: 'IAA spiritueux',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distillation alcools et spiritueux — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA spiritueux.',
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
    idcc: 1266, nom: 'Sociétés de recherche — Cadres Dirigeants', secteur: 'Recherche',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sociétés de recherche — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Recherche.',
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
    idcc: 1278, nom: 'PACT ARIM protection amélioration habitat — Cadres Dirigeants', secteur: 'Habitat social',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'PACT ARIM protection amélioration habitat — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Habitat social.',
  }
,
  {
    idcc: 1285, nom: 'Gardiens concierges employés immeubles — Cadres Dirigeants', secteur: 'Gardiennage immeuble',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Gardiens concierges employés immeubles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Gardiennage immeuble.',
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
    idcc: 1309, nom: 'Presse quotidienne régionale — Cadres Dirigeants', secteur: 'Presse régionale',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Presse quotidienne régionale — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Presse régionale.',
  }
,
  {
    idcc: 1311, nom: 'Négoce de bois oeuvre et produits dérivés — Cadres Dirigeants', secteur: 'Commerce bois',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Négoce de bois oeuvre et produits dérivés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce bois.',
  }
,
  {
    idcc: 1314, nom: 'Maisons alimentation succursales gérants mandataires — Cadres Dirigeants', secteur: 'Grande distribution gérants',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Maisons alimentation succursales gérants mandataires — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Grande distribution gérants.',
  }
,
  {
    idcc: 1316, nom: 'Blanchisserie laverie teinturerie nettoyage — Cadres Dirigeants', secteur: 'Blanchisserie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Blanchisserie laverie teinturerie nettoyage — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Blanchisserie.',
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
    idcc: 1370, nom: 'Equipements thermiques installations entretien — Cadres Dirigeants', secteur: 'Génie climatique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Equipements thermiques installations entretien — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Génie climatique.',
  }
,
  {
    idcc: 1383, nom: 'Chaussure commerce succursaliste — Cadres Dirigeants', secteur: 'Commerce chaussures',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Chaussure commerce succursaliste — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce chaussures.',
  }
,
  {
    idcc: 1396, nom: 'Chocolaterie confiserie biscuiterie (industrie) — Cadres Dirigeants', secteur: 'IAA chocolaterie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Chocolaterie confiserie biscuiterie (industrie) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA chocolaterie.',
  }
,
  {
    idcc: 1404, nom: 'Maroquinerie gainerie bracelets cuir — Cadres Dirigeants', secteur: 'Industrie maroquinerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Maroquinerie gainerie bracelets cuir — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie maroquinerie.',
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
    idcc: 1411, nom: 'Quincaillerie fournitures industrielles — Cadres Dirigeants', secteur: 'Commerce matériaux',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Quincaillerie fournitures industrielles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce matériaux.',
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
    idcc: 1413, nom: 'Gaz naturel distributeurs opérateurs — Cadres Dirigeants', secteur: 'Energie gaz',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Gaz naturel distributeurs opérateurs — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Energie gaz.',
  }
,
  {
    idcc: 1480, nom: 'Presse quotidienne nationale — Cadres Dirigeants', secteur: 'Presse nationale',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Presse quotidienne nationale — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Presse nationale.',
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
    idcc: 1486, nom: 'Syntec bureaux études techniques informatique ingénierie conseil — Cadres Dirigeants', secteur: 'IT ingénierie conseil',
    critereCD: 'Application stricte L3111-2. En pratique : membres CODIR, DG, DAF, DRH. Rémunération niveau IC position 3.3 minimum (hors grille Syntec).',
    rmgCD: 'Position 3.3 Syntec ou hors grille — aucun minimum conventionnel fixé',
    entretienCD: 'Entretien semestriel recommandé (esprit accord Syntec 1999) même pour les CD',
    droitsCP: '25 jours ouvrables (L3141-1)',
    alertesCD: ['Syntec ne qualifie PAS automatiquement CD à partir de la position 3.3', '3 critères cumulatifs L3111-2 obligatoires (arrêt Cass.Soc. 31/01/2012)', 'Mission de direction effective exigée — pas seulement un titre', 'Risque de requalification HS si 1 critère manque'],
    notesCD: 'Chez Syntec, le statut CD est souvent confondu avec la position 3.3 (hors forfait jours). Ce n\'est pas automatique : les 3 critères L3111-2 doivent être réunis simultanément.',
  }
,
  {
    idcc: 1489, nom: 'Cordonnerie multiservice — Cadres Dirigeants', secteur: 'Artisanat cordonnerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cordonnerie multiservice — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Artisanat cordonnerie.',
  }
,
  {
    idcc: 1499, nom: 'Industrie du gaz — Cadres Dirigeants', secteur: 'Industrie gaz',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie du gaz — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie gaz.',
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
    idcc: 1538, nom: 'Bijouterie joaillerie orfèvrerie — Cadres Dirigeants', secteur: 'Artisanat bijouterie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bijouterie joaillerie orfèvrerie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Artisanat bijouterie.',
  }
,
  {
    idcc: 1539, nom: 'Restauration collective — Cadres Dirigeants', secteur: 'Restauration collective',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Restauration collective — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Restauration collective.',
  }
,
  {
    idcc: 1540, nom: 'Céramique industries — Cadres Dirigeants', secteur: 'Industrie céramique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Céramique industries — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie céramique.',
  }
,
  {
    idcc: 1554, nom: 'Fabrication de la bière — Cadres Dirigeants', secteur: 'IAA brasserie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Fabrication de la bière — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA brasserie.',
  }
,
  {
    idcc: 1555, nom: 'Boucherie boucherie-charcuterie — Cadres Dirigeants', secteur: 'Artisanat boucherie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Boucherie boucherie-charcuterie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Artisanat boucherie.',
  }
,
  {
    idcc: 1557, nom: 'Fonderies et forges — Cadres Dirigeants', secteur: 'Métallurgie fonderies',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Fonderies et forges — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Métallurgie fonderies.',
  }
,
  {
    idcc: 1561, nom: 'Fabrication de meubles en bois — Cadres Dirigeants', secteur: 'Industrie bois',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Fabrication de meubles en bois — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie bois.',
  }
,
  {
    idcc: 1563, nom: 'Industrie de l aluminium — Cadres Dirigeants', secteur: 'Industrie aluminium',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie de l aluminium — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie aluminium.',
  }
,
  {
    idcc: 1564, nom: 'Industrie cuivre et alliages — Cadres Dirigeants', secteur: 'Industrie cuivre',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie cuivre et alliages — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie cuivre.',
  }
,
  {
    idcc: 1586, nom: 'Poissonnerie artisanat commerce de détail — Cadres Dirigeants', secteur: 'Artisanat poissonnerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Poissonnerie artisanat commerce de détail — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Artisanat poissonnerie.',
  }
,
  {
    idcc: 1588, nom: 'Industrie du pneumatique — Cadres Dirigeants', secteur: 'Industrie pneumatique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie du pneumatique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie pneumatique.',
  }
,
  {
    idcc: 1592, nom: 'Industrie pharmaceutique vétérinaire — Cadres Dirigeants', secteur: 'Pharmacie vétérinaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie pharmaceutique vétérinaire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Pharmacie vétérinaire.',
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
    idcc: 1598, nom: 'Industrie du ciment — Cadres Dirigeants', secteur: 'Industrie ciment',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie du ciment — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie ciment.',
  }
,
  {
    idcc: 1600, nom: 'Industrie de la porcelaine — Cadres Dirigeants', secteur: 'Industrie porcelaine',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie de la porcelaine — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie porcelaine.',
  }
,
  {
    idcc: 1603, nom: 'Industrie de l emballage — Cadres Dirigeants', secteur: 'Industrie emballage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie de l emballage — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie emballage.',
  }
,
  {
    idcc: 1604, nom: 'Travaux publics Ouvriers — Cadres Dirigeants', secteur: 'Travaux publics',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Travaux publics Ouvriers — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Travaux publics.',
  }
,
  {
    idcc: 1607, nom: 'Industrie du coton — Cadres Dirigeants', secteur: 'Industrie coton',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie du coton — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie coton.',
  }
,
  {
    idcc: 1611, nom: 'Commerce de gros alimentaire entreposage — Cadres Dirigeants', secteur: 'Commerce gros alimentaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce de gros alimentaire entreposage — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce gros alimentaire.',
  }
,
  {
    idcc: 1624, nom: 'Optique lunetterie de détail — Cadres Dirigeants', secteur: 'Optique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Optique lunetterie de détail — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Optique.',
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
    idcc: 1636, nom: 'Agents commerciaux VRP multicarte — Cadres Dirigeants', secteur: 'VRP commercial',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Agents commerciaux VRP multicarte — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). VRP commercial.',
  }
,
  {
    idcc: 1637, nom: 'Industrie des ardoises — Cadres Dirigeants', secteur: 'Industrie ardoises',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie des ardoises — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie ardoises.',
  }
,
  {
    idcc: 1640, nom: 'Industrie du marbre — Cadres Dirigeants', secteur: 'Industrie marbre',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie du marbre — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie marbre.',
  }
,
  {
    idcc: 1648, nom: 'Industrie des équipements électriques — Cadres Dirigeants', secteur: 'Industrie électrique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie des équipements électriques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie électrique.',
  }
,
  {
    idcc: 1649, nom: 'Industrie électronique professionnelle — Cadres Dirigeants', secteur: 'Electronique professionnelle',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie électronique professionnelle — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Electronique professionnelle.',
  }
,
  {
    idcc: 1651, nom: 'Fabrication instruments de mesure — Cadres Dirigeants', secteur: 'Industrie mesure',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Fabrication instruments de mesure — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie mesure.',
  }
,
  {
    idcc: 1653, nom: 'Industrie des prothèses et orthèses — Cadres Dirigeants', secteur: 'Orthopédie prothèse',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie des prothèses et orthèses — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Orthopédie prothèse.',
  }
,
  {
    idcc: 1659, nom: 'Vente à distance e-commerce — Cadres Dirigeants', secteur: 'Commerce distance',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Vente à distance e-commerce — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce distance.',
  }
,
  {
    idcc: 1661, nom: 'Location de véhicules — Cadres Dirigeants', secteur: 'Location véhicules',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Location de véhicules — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Location véhicules.',
  }
,
  {
    idcc: 1665, nom: 'Fabrication de machines agricoles — Cadres Dirigeants', secteur: 'Industrie machines agricoles',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Fabrication de machines agricoles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie machines agricoles.',
  }
,
  {
    idcc: 1666, nom: 'Contrôle technique automobile — Cadres Dirigeants', secteur: 'Contrôle technique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Contrôle technique automobile — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Contrôle technique.',
  }
,
  {
    idcc: 1670, nom: 'Industrie des ascenseurs et escaliers mécaniques — Cadres Dirigeants', secteur: 'Industrie ascenseurs',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie des ascenseurs et escaliers mécaniques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie ascenseurs.',
  }
,
  {
    idcc: 1672, nom: 'Sociétés assurances — Cadres Dirigeants', secteur: 'Assurance',
    critereCD: 'Directeurs généraux de sociétés d\'assurance, directeurs régionaux à fort pouvoir décisionnel autonome sur leurs unités.',
    rmgCD: 'Pas de minimum fixé — rémunération parmi les plus élevées de l\'entreprise',
    entretienCD: 'Accord de branche assurances recommande un bilan de charge',
    droitsCP: '25j ouvrables (L3141-1)',
    alertesCD: ['Assurances : très forte proportion de cadres en forfait jours (215j) — peu de CD au sens strict', '3 critères cumulatifs L3111-2 obligatoires'],
    notesCD: 'Assurances (IDCC 1672). Le statut CD est rare — la plupart des cadres de direction sont en forfait jours 215j.',
  }
,
  {
    idcc: 1673, nom: 'Auto-écoles — Cadres Dirigeants', secteur: 'Auto-écoles',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Auto-écoles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Auto-écoles.',
  }
,
  {
    idcc: 1678, nom: 'Services informatiques et numérique — Cadres Dirigeants', secteur: 'Services numériques',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Services informatiques et numérique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Services numériques.',
  }
,
  {
    idcc: 1680, nom: 'Conseil en gestion entreprise — Cadres Dirigeants', secteur: 'Conseil gestion',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Conseil en gestion entreprise — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Conseil gestion.',
  }
,
  {
    idcc: 1682, nom: 'Etudes de marché et sondages — Cadres Dirigeants', secteur: 'Etudes marché',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Etudes de marché et sondages — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Etudes marché.',
  }
,
  {
    idcc: 1683, nom: 'Traduction et interprétariat — Cadres Dirigeants', secteur: 'Traduction',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Traduction et interprétariat — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Traduction.',
  }
,
  {
    idcc: 1685, nom: 'Fabrication du béton prêt à emploi — Cadres Dirigeants', secteur: 'Industrie béton prêt',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Fabrication du béton prêt à emploi — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie béton prêt.',
  }
,
  {
    idcc: 1686, nom: 'Entreprises du paysage — Cadres Dirigeants', secteur: 'Paysage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises du paysage — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Paysage.',
  }
,
  {
    idcc: 1687, nom: 'Activités de centres de congrès — Cadres Dirigeants', secteur: 'Congrès événementiel',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Activités de centres de congrès — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Congrès événementiel.',
  }
,
  {
    idcc: 1689, nom: 'Organisation de salons foires expositions — Cadres Dirigeants', secteur: 'Salons foires',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Organisation de salons foires expositions — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Salons foires.',
  }
,
  {
    idcc: 1691, nom: 'Traiteurs organisation de réceptions — Cadres Dirigeants', secteur: 'Traiteurs',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Traiteurs organisation de réceptions — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Traiteurs.',
  }
,
  {
    idcc: 1692, nom: 'Blanchisserie industrielle collectivités — Cadres Dirigeants', secteur: 'Blanchisserie industrielle',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Blanchisserie industrielle collectivités — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Blanchisserie industrielle.',
  }
,
  {
    idcc: 1694, nom: 'Messageries et livraison dernier kilomètre — Cadres Dirigeants', secteur: 'Livraison dernier km',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Messageries et livraison dernier kilomètre — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Livraison dernier km.',
  }
,
  {
    idcc: 1695, nom: 'Tannerie mégisserie — Cadres Dirigeants', secteur: 'Industrie tannerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Tannerie mégisserie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie tannerie.',
  }
,
  {
    idcc: 1702, nom: 'Conserves légumes viandes poissons — Cadres Dirigeants', secteur: 'IAA conserves',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Conserves légumes viandes poissons — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IAA conserves.',
  }
,
  {
    idcc: 1704, nom: 'Industrie de la lunetterie — Cadres Dirigeants', secteur: 'Industrie lunetterie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie de la lunetterie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie lunetterie.',
  }
,
  {
    idcc: 1706, nom: 'Diagnostic immobilier — Cadres Dirigeants', secteur: 'Diagnostic immobilier',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Diagnostic immobilier — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Diagnostic immobilier.',
  }
,
  {
    idcc: 1712, nom: 'Services de courrier express — Cadres Dirigeants', secteur: 'Courrier express',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Services de courrier express — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Courrier express.',
  }
,
  {
    idcc: 1720, nom: 'Cabinets de recrutement — Cadres Dirigeants', secteur: 'Recrutement',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets de recrutement — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Recrutement.',
  }
,
  {
    idcc: 1721, nom: 'Conseil en ressources humaines — Cadres Dirigeants', secteur: 'RH conseil',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Conseil en ressources humaines — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). RH conseil.',
  }
,
  {
    idcc: 1727, nom: 'Organismes HLM et bailleurs sociaux — Cadres Dirigeants', secteur: 'Bailleurs sociaux',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Organismes HLM et bailleurs sociaux — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bailleurs sociaux.',
  }
,
  {
    idcc: 1729, nom: 'Régies publicitaires — Cadres Dirigeants', secteur: 'Régies publicitaires',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Régies publicitaires — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Régies publicitaires.',
  }
,
  {
    idcc: 1730, nom: 'Imprimeurs sérigraphes — Cadres Dirigeants', secteur: 'Imprimerie sérigraphie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Imprimeurs sérigraphes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Imprimerie sérigraphie.',
  }
,
  {
    idcc: 1734, nom: 'Prestataires de services du secteur tertiaire — Cadres Dirigeants', secteur: 'Services tertiaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Prestataires de services du secteur tertiaire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Services tertiaire.',
  }
,
  {
    idcc: 1735, nom: 'Logistique de distribution et livraison — Cadres Dirigeants', secteur: 'Logistique livraison',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Logistique de distribution et livraison — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Logistique livraison.',
  }
,
  {
    idcc: 1740, nom: 'Pêche maritime et cultures marines — Cadres Dirigeants', secteur: 'Pêche maritime',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pêche maritime et cultures marines — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Pêche maritime.',
  }
,
  {
    idcc: 1742, nom: 'Centres de thalassothérapie — Cadres Dirigeants', secteur: 'Thalassothérapie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Centres de thalassothérapie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Thalassothérapie.',
  }
,
  {
    idcc: 1744, nom: 'Photographie de portrait et publicitaire — Cadres Dirigeants', secteur: 'Photographie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Photographie de portrait et publicitaire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Photographie.',
  }
,
  {
    idcc: 1747, nom: 'Librairie — Cadres Dirigeants', secteur: 'Commerce culturel',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Librairie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce culturel.',
  }
,
  {
    idcc: 1748, nom: 'Graphisme et design — Cadres Dirigeants', secteur: 'Graphisme design',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Graphisme et design — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Graphisme design.',
  }
,
  {
    idcc: 1749, nom: 'Développement web et applications — Cadres Dirigeants', secteur: 'Développement web',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Développement web et applications — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Développement web.',
  }
,
  {
    idcc: 1750, nom: 'Intelligence artificielle et data — Cadres Dirigeants', secteur: 'IA data',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Intelligence artificielle et data — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). IA data.',
  }
,
  {
    idcc: 1751, nom: 'Cybersécurité et infogérance — Cadres Dirigeants', secteur: 'Infogérance',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cybersécurité et infogérance — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Infogérance.',
  }
,
  {
    idcc: 1753, nom: 'Editeurs de logiciels — Cadres Dirigeants', secteur: 'Editeurs logiciels',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Editeurs de logiciels — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Editeurs logiciels.',
  }
,
  {
    idcc: 1757, nom: 'Centres de planification éducation familiale — Cadres Dirigeants', secteur: 'Planification familiale',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Centres de planification éducation familiale — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Planification familiale.',
  }
,
  {
    idcc: 1758, nom: 'Etablissements enfants inadaptés privés — Cadres Dirigeants', secteur: 'Education spécialisée',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Etablissements enfants inadaptés privés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Education spécialisée.',
  }
,
  {
    idcc: 1759, nom: 'Foyers hébergement travailleurs handicapés — Cadres Dirigeants', secteur: 'Hébergement handicapés',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Foyers hébergement travailleurs handicapés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Hébergement handicapés.',
  }
,
  {
    idcc: 1760, nom: 'Services aide aux toxicomanes — Cadres Dirigeants', secteur: 'Addictologie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Services aide aux toxicomanes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Addictologie.',
  }
,
  {
    idcc: 1761, nom: 'Services aide personnes sans abri — Cadres Dirigeants', secteur: 'Hébergement social',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Services aide personnes sans abri — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Hébergement social.',
  }
,
  {
    idcc: 1762, nom: 'Associations intermédiaires insertion — Cadres Dirigeants', secteur: 'Insertion professionnelle',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Associations intermédiaires insertion — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Insertion professionnelle.',
  }
,
  {
    idcc: 1763, nom: 'Chantiers insertion — Cadres Dirigeants', secteur: 'Insertion chantiers',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Chantiers insertion — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Insertion chantiers.',
  }
,
  {
    idcc: 1764, nom: 'Entreprises adaptées — Cadres Dirigeants', secteur: 'Entreprises adaptées',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises adaptées — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Entreprises adaptées.',
  }
,
  {
    idcc: 1765, nom: 'ESAT établissements aide par le travail — Cadres Dirigeants', secteur: 'ESAT',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'ESAT établissements aide par le travail — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). ESAT.',
  }
,
  {
    idcc: 1767, nom: 'Crèches associatives — Cadres Dirigeants', secteur: 'Crèches associatives',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Crèches associatives — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Crèches associatives.',
  }
,
  {
    idcc: 1768, nom: 'Accueil de loisirs sans hébergement ALSH — Cadres Dirigeants', secteur: 'ALSH loisirs',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Accueil de loisirs sans hébergement ALSH — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). ALSH loisirs.',
  }
,
  {
    idcc: 1769, nom: 'Travaux publics ETAM — Cadres Dirigeants', secteur: 'Travaux publics',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Travaux publics ETAM — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Travaux publics.',
  }
,
  {
    idcc: 1770, nom: 'Maisons familiales rurales — Cadres Dirigeants', secteur: 'Maisons familiales rurales',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Maisons familiales rurales — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Maisons familiales rurales.',
  }
,
  {
    idcc: 1771, nom: 'Etablissements privés enseignement agricole — Cadres Dirigeants', secteur: 'Enseignement agricole',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Etablissements privés enseignement agricole — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Enseignement agricole.',
  }
,
  {
    idcc: 1775, nom: 'Organismes de gestion écoles catholiques OGEC — Cadres Dirigeants', secteur: 'OGEC écoles',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Organismes de gestion écoles catholiques OGEC — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). OGEC écoles.',
  }
,
  {
    idcc: 1776, nom: 'Foyers de jeunes travailleurs FJT — Cadres Dirigeants', secteur: 'FJT jeunes',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Foyers de jeunes travailleurs FJT — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). FJT jeunes.',
  }
,
  {
    idcc: 1779, nom: 'Fédérations sportives nationales — Cadres Dirigeants', secteur: 'Sport fédérations',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Fédérations sportives nationales — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Sport fédérations.',
  }
,
  {
    idcc: 1780, nom: 'Radiodiffusion audiovisuel public et privé — Cadres Dirigeants', secteur: 'Audiovisuel',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Radiodiffusion audiovisuel public et privé — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Audiovisuel.',
  }
,
  {
    idcc: 1782, nom: 'Clubs sportifs professionnels — Cadres Dirigeants', secteur: 'Sport clubs pro',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Clubs sportifs professionnels — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Sport clubs pro.',
  }
,
  {
    idcc: 1783, nom: 'Professions libérales diverses — Cadres Dirigeants', secteur: 'Professions libérales',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Professions libérales diverses — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Professions libérales.',
  }
,
  {
    idcc: 1790, nom: 'Edition phonographique et musicale — Cadres Dirigeants', secteur: 'Musique édition',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Edition phonographique et musicale — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Musique édition.',
  }
,
  {
    idcc: 1821, nom: 'Horlogerie — Cadres Dirigeants', secteur: 'Horlogerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Horlogerie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Horlogerie.',
  }
,
  {
    idcc: 1850, nom: 'Expertise comptable et commissariat aux comptes — Cadres Dirigeants', secteur: 'Finance audit',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Expertise comptable et commissariat aux comptes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Finance audit.',
  }
,
  {
    idcc: 1851, nom: 'Personnels APEC — Cadres Dirigeants', secteur: 'Emploi cadres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnels APEC — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Emploi cadres.',
  }
,
  {
    idcc: 1862, nom: 'Jardineries et graineteries commerce de détail — Cadres Dirigeants', secteur: 'Commerce jardinage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Jardineries et graineteries commerce de détail — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce jardinage.',
  }
,
  {
    idcc: 1870, nom: 'Habillement textiles commerce de détail — Cadres Dirigeants', secteur: 'Commerce textile',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Habillement textiles commerce de détail — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce textile.',
  }
,
  {
    idcc: 1891, nom: 'Entrepôts frigorifiques manutention — Cadres Dirigeants', secteur: 'Logistique froid',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entrepôts frigorifiques manutention — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Logistique froid.',
  }
,
  {
    idcc: 1921, nom: 'CCNT 66 inadaptés handicapés — Cadres Dirigeants', secteur: 'Médico-social CCNT 66',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'CCNT 66 inadaptés handicapés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Médico-social CCNT 66.',
  }
,
  {
    idcc: 1965, nom: 'Notariat — Cadres Dirigeants', secteur: 'Notariat',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Notariat — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Notariat.',
  }
,
  {
    idcc: 1966, nom: 'Promotion immobilière — Cadres Dirigeants', secteur: 'Promotion immobilière',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Promotion immobilière — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Promotion immobilière.',
  }
,
  {
    idcc: 1978, nom: 'Crédit mutuel — Cadres Dirigeants', secteur: 'Banque mutuelle',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Crédit mutuel — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Banque mutuelle.',
  }
,
  {
    idcc: 1979, nom: 'Hôtels Cafés Restaurants HCR — Cadres Dirigeants', secteur: 'HCR',
    critereCD: 'Directeurs généraux de groupes hôteliers, directeurs d\'établissement palace/luxe. Autonomie très forte exigée — les directeurs de restaurant d\'un groupe ne sont généralement pas CD.',
    rmgCD: 'Pas de minimum conventionnel — rémunération globale parmi les plus élevées du groupe',
    entretienCD: 'Non obligatoire légalement pour les CD mais recommandé pour l\'équilibre vie pro/perso',
    droitsCP: '25j ouvrables minimum (L3141-1)',
    alertesCD: ['HCR : forfait jours possible uniquement pour les cadres autonomes (directeurs, DA)', '⚠️ Employés et techniciens HCR : régime HCR spécifique 3 paliers — PAS de forfait jours', 'Amplitude très variable (soirées, week-ends) : déclarer systématiquement', 'Le statut CD est rare en HCR — vérifier les 3 critères cumulatifs'],
    notesCD: 'HCR (IDCC 1979). Le statut CD est réservé aux dirigeants de groupes hôteliers importants. La majorité des directeurs d\'établissement sont en forfait jours, pas en régime CD.',
  }
,
  {
    idcc: 1985, nom: 'Combustibles solides liquides gazeux négoce — Cadres Dirigeants', secteur: 'Distribution énergie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Combustibles solides liquides gazeux négoce — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Distribution énergie.',
  }
,
  {
    idcc: 1996, nom: 'Vétérinaires praticiens salariés — Cadres Dirigeants', secteur: 'Santé vétérinaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Vétérinaires praticiens salariés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Santé vétérinaire.',
  }
,
  {
    idcc: 2002, nom: 'Transport ferroviaire opérateurs privés — Cadres Dirigeants', secteur: 'Transport ferroviaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transport ferroviaire opérateurs privés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport ferroviaire.',
  }
,
  {
    idcc: 2046, nom: 'Ameublement industrie — Cadres Dirigeants', secteur: 'Industrie ameublement',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Ameublement industrie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie ameublement.',
  }
,
  {
    idcc: 2070, nom: 'Couture parisienne haute couture — Cadres Dirigeants', secteur: 'Mode couture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Couture parisienne haute couture — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Mode couture.',
  }
,
  {
    idcc: 2075, nom: 'Caves coopératives vinicoles — Cadres Dirigeants', secteur: 'Viticulture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Caves coopératives vinicoles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Viticulture.',
  }
,
  {
    idcc: 2098, nom: 'Récupération des métaux industries — Cadres Dirigeants', secteur: 'Recyclage métaux',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Récupération des métaux industries — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Recyclage métaux.',
  }
,
  {
    idcc: 2104, nom: 'Pharmacies officine — Cadres Dirigeants', secteur: 'Pharmacie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pharmacies officine — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Pharmacie.',
  }
,
  {
    idcc: 2120, nom: 'Banques populaires — Cadres Dirigeants', secteur: 'Banque mutualiste',
    critereCD: 'DG, DGA, directeur de pôle à fort pouvoir décisionnel. Critères L3111-2 applicables.',
    rmgCD: 'Pas de RMG CD fixée — rémunération parmi les plus élevées du groupe BPCE',
    entretienCD: 'Entretien annuel de gouvernance recommandé',
    droitsCP: '25j + jours liés à l\'ancienneté selon accord groupe BPCE',
    alertesCD: ['Vérifier l\'accord de groupe BPCE pour les dispositions CD spécifiques'],
    notesCD: 'BPCE / Banques Populaires (IDCC 2120). Application L3111-2 standard.',
  }
,
  {
    idcc: 2128, nom: 'Cabinets dentaires — Cadres Dirigeants', secteur: 'Santé dentaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets dentaires — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Santé dentaire.',
  }
,
  {
    idcc: 2140, nom: 'Assistants maternels du particulier employeur — Cadres Dirigeants', secteur: 'Assistants maternels',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Assistants maternels du particulier employeur — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Assistants maternels.',
  }
,
  {
    idcc: 2148, nom: 'Cabinets experts comptables petits cabinets — Cadres Dirigeants', secteur: 'Finance petits cabinets',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets experts comptables petits cabinets — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Finance petits cabinets.',
  }
,
  {
    idcc: 2190, nom: 'Centres de lutte contre le cancer CLCC — Cadres Dirigeants', secteur: 'Santé oncologie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Centres de lutte contre le cancer CLCC — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Santé oncologie.',
  }
,
  {
    idcc: 2205, nom: 'Laboratoires de biologie médicale privés — Cadres Dirigeants', secteur: 'Biologie médicale',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Laboratoires de biologie médicale privés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Biologie médicale.',
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
    idcc: 2230, nom: 'Eau assainissement propreté urbaine — Cadres Dirigeants', secteur: 'Eau Environnement',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Eau assainissement propreté urbaine — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Eau Environnement.',
  }
,
  {
    idcc: 2247, nom: 'Services automobile garages concessions — Cadres Dirigeants', secteur: 'Automobile',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Services automobile garages concessions — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Automobile.',
  }
,
  {
    idcc: 2264, nom: 'Télécommunications — Cadres Dirigeants', secteur: 'Télécoms',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Télécommunications — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Télécoms.',
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
    idcc: 2344, nom: 'Pompes funèbres et marbrerie funéraire — Cadres Dirigeants', secteur: 'Services funéraires',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pompes funèbres et marbrerie funéraire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Services funéraires.',
  }
,
  {
    idcc: 2372, nom: 'Commissaires de justice ex huissiers — Cadres Dirigeants', secteur: 'Juridique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commissaires de justice ex huissiers — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Juridique.',
  }
,
  {
    idcc: 2378, nom: 'Casinos — Cadres Dirigeants', secteur: 'Jeux casinos',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Casinos — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Jeux casinos.',
  }
,
  {
    idcc: 2395, nom: 'Assistants maternels particulier employeur — Cadres Dirigeants', secteur: 'Assistants maternels',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Assistants maternels particulier employeur — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Assistants maternels.',
  }
,
  {
    idcc: 2409, nom: 'Enseignement privé sous contrat CPPN CPPE — Cadres Dirigeants', secteur: 'Education privée',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Enseignement privé sous contrat CPPN CPPE — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Education privée.',
  }
,
  {
    idcc: 2420, nom: 'BTP ETAM employés techniciens agents maîtrise — Cadres Dirigeants', secteur: 'BTP ETAM',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'BTP ETAM employés techniciens agents maîtrise — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). BTP ETAM.',
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
    idcc: 2528, nom: 'Hôtellerie de plein air campings — Cadres Dirigeants', secteur: 'Tourisme camping',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Hôtellerie de plein air campings — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Tourisme camping.',
  }
,
  {
    idcc: 2537, nom: 'Prothèse dentaire laboratoires — Cadres Dirigeants', secteur: 'Santé dentaire labo',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Prothèse dentaire laboratoires — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Santé dentaire labo.',
  }
,
  {
    idcc: 2564, nom: 'Bricolage commerce de détail — Cadres Dirigeants', secteur: 'Commerce bricolage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bricolage commerce de détail — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce bricolage.',
  }
,
  {
    idcc: 2582, nom: 'Enseignement privé hors contrat — Cadres Dirigeants', secteur: 'Education privée hors contrat',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Enseignement privé hors contrat — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Education privée hors contrat.',
  }
,
  {
    idcc: 2583, nom: 'Fleuristes jardineries animaleries — Cadres Dirigeants', secteur: 'Commerce floral',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Fleuristes jardineries animaleries — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce floral.',
  }
,
  {
    idcc: 2596, nom: 'Esthétique cosmétique parfumerie enseignement — Cadres Dirigeants', secteur: 'Esthétique beauté',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Esthétique cosmétique parfumerie enseignement — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Esthétique beauté.',
  }
,
  {
    idcc: 2609, nom: 'Architecture cabinets — Cadres Dirigeants', secteur: 'Architecture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Architecture cabinets — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Architecture.',
  }
,
  {
    idcc: 2614, nom: 'Mécanique — Cadres Dirigeants', secteur: 'Industrie mécanique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Mécanique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Industrie mécanique.',
  }
,
  {
    idcc: 2615, nom: 'Courtage en assurances et réassurances — Cadres Dirigeants', secteur: 'Assurance courtage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Courtage en assurances et réassurances — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Assurance courtage.',
  }
,
  {
    idcc: 2642, nom: 'Publicité régies et agences — Cadres Dirigeants', secteur: 'Publicité communication',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Publicité régies et agences — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Publicité communication.',
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
    idcc: 2770, nom: 'Edition de jeux électroniques — Cadres Dirigeants', secteur: 'Edition jeux vidéo',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Edition de jeux électroniques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Edition jeux vidéo.',
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
    idcc: 3013, nom: 'Librairie — Cadres Dirigeants', secteur: 'Commerce librairie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Librairie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce librairie.',
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
    idcc: 3043, nom: 'Entreprises propreté services associés — Cadres Dirigeants', secteur: 'Propreté services',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises propreté services associés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Propreté services.',
  }
,
  {
    idcc: 3082, nom: 'Agents généraux assurances personnel — Cadres Dirigeants', secteur: 'Assurance agences',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Agents généraux assurances personnel — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Assurance agences.',
  }
,
  {
    idcc: 3090, nom: 'Edition livres presse multimédia — Cadres Dirigeants', secteur: 'Edition',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Edition livres presse multimédia — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Edition.',
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
    idcc: 3139, nom: 'Parcs de loisirs jardins zoologiques — Cadres Dirigeants', secteur: 'Tourisme loisirs',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Parcs de loisirs jardins zoologiques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Tourisme loisirs.',
  }
,
  {
    idcc: 3160, nom: 'Associations gestion comptabilité — Cadres Dirigeants', secteur: 'Gestion comptable asso',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Associations gestion comptabilité — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Gestion comptable asso.',
  }
,
  {
    idcc: 3186, nom: 'Nettoyage entreprises de propreté — Cadres Dirigeants', secteur: 'Propreté',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Nettoyage entreprises de propreté — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Propreté.',
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
    idcc: 3205, nom: 'Cabinets géomètres-experts topographes — Cadres Dirigeants', secteur: 'Géomètre expert',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets géomètres-experts topographes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Géomètre expert.',
  }
,
  {
    idcc: 3217, nom: 'Transport sanitaire ambulanciers — Cadres Dirigeants', secteur: 'Transport sanitaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transport sanitaire ambulanciers — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport sanitaire.',
  }
,
  {
    idcc: 3218, nom: 'Sociétés course par course — Cadres Dirigeants', secteur: 'Transport course',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sociétés course par course — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport course.',
  }
,
  {
    idcc: 3219, nom: 'Doublage postsynchronisation oeuvres audiovisuelles — Cadres Dirigeants', secteur: 'Audiovisuel doublage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Doublage postsynchronisation oeuvres audiovisuelles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Audiovisuel doublage.',
  }
,
  {
    idcc: 3220, nom: 'Particuliers employeurs et emploi à domicile FEPEM — Cadres Dirigeants', secteur: 'Emploi à domicile',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Particuliers employeurs et emploi à domicile FEPEM — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Emploi à domicile.',
  }
,
  {
    idcc: 3227, nom: 'FNSEA exploitations entreprises agricoles — Cadres Dirigeants', secteur: 'Agriculture FNSEA',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'FNSEA exploitations entreprises agricoles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture FNSEA.',
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
    idcc: 3233, nom: 'Organismes formation professionnelle — Cadres Dirigeants', secteur: 'Formation pro',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Organismes formation professionnelle — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Formation pro.',
  }
,
  {
    idcc: 3236, nom: 'Menuisiers facteurs orgue et pianos — Cadres Dirigeants', secteur: 'Artisanat musical',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Menuisiers facteurs orgue et pianos — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Artisanat musical.',
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
    idcc: 3248, nom: 'Métallurgie accord national unique 2023 — Cadres Dirigeants', secteur: 'Métallurgie',
    critereCD: 'L\'ANU 2023 reprend strictement la définition légale L3111-2. Direction de filiale, d\'établissement important ou direction fonctionnelle clé (Production, R&D, Finance, RH).',
    rmgCD: 'ANU : niveau hors grille ou groupe 12+ — aucun minimum conventionnel CD',
    entretienCD: 'Entretien annuel de charge recommandé par l\'ANU Titre VI',
    droitsCP: '25j ouvrables (L3141-1) + éventuels jours issus de l\'ANU 2023',
    alertesCD: ['ANU 2023 : vérifier la transposition dans l\'accord d\'entreprise (transition jusqu\'en 2025)', 'Anciens accords UIMM : les CD étaient souvent définis par une grille de classification — peut ne plus s\'appliquer'],
    notesCD: 'Métallurgie ANU 2023 (IDCC 3248). Le nouvel accord harmonise les classifications. Période de transition jusqu\'au 31/12/2025.',
  }
,
  {
    idcc: 3257, nom: 'Mutuelles organismes mutualistes — Cadres Dirigeants', secteur: 'Assurance mutualiste',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Mutuelles organismes mutualistes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Assurance mutualiste.',
  }
,
  {
    idcc: 3326, nom: 'Bâtiment agents de maîtrise et techniciens — Cadres Dirigeants', secteur: 'Bâtiment AM',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bâtiment agents de maîtrise et techniciens — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Bâtiment AM.',
  }
,
  {
    idcc: 3381, nom: 'Acteurs du lien social et familial ALISFA — Cadres Dirigeants', secteur: 'Action sociale ESS',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Acteurs du lien social et familial ALISFA — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Action sociale ESS.',
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
    idcc: 5021, nom: 'Navigation intérieure bateliers — Cadres Dirigeants', secteur: 'Transport fluvial',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Navigation intérieure bateliers — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Transport fluvial.',
  }
,
  {
    idcc: 7016, nom: 'Coopératives agricoles céréales meunerie alimentation bétail — Cadres Dirigeants', secteur: 'Coopératives agricoles',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Coopératives agricoles céréales meunerie alimentation bétail — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Coopératives agricoles.',
  }
,
  {
    idcc: 7024, nom: 'Vins et spiritueux commerce de gros — Cadres Dirigeants', secteur: 'Commerce vins',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Vins et spiritueux commerce de gros — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Commerce vins.',
  }
,
  {
    idcc: 7025, nom: 'Coopératives fruitières et légumières — Cadres Dirigeants', secteur: 'Coopératives agricoles',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Coopératives fruitières et légumières — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Coopératives agricoles.',
  }
,
  {
    idcc: 7502, nom: 'Pépinières horticoles nationales — Cadres Dirigeants', secteur: 'Horticulture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pépinières horticoles nationales — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Horticulture.',
  }
,
  {
    idcc: 7503, nom: 'Entreprises de jardinage — Cadres Dirigeants', secteur: 'Jardinage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Entreprises de jardinage — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Jardinage.',
  }
,
  {
    idcc: 7504, nom: 'Champignonnières — Cadres Dirigeants', secteur: 'Agriculture champignons',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Champignonnières — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture champignons.',
  }
,
  {
    idcc: 7505, nom: 'Centres équestres et haras — Cadres Dirigeants', secteur: 'Equitation',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Centres équestres et haras — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Equitation.',
  }
,
  {
    idcc: 7506, nom: 'Elevage avicole — Cadres Dirigeants', secteur: 'Agriculture aviculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Elevage avicole — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture aviculture.',
  }
,
  {
    idcc: 7507, nom: 'Exploitations forestières et scieries agricoles — Cadres Dirigeants', secteur: 'Agriculture forêt',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations forestières et scieries agricoles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture forêt.',
  }
,
  {
    idcc: 7508, nom: 'Coopératives laitières fromagères — Cadres Dirigeants', secteur: 'Coopératives laitières',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Coopératives laitières fromagères — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Coopératives laitières.',
  }
,
  {
    idcc: 7509, nom: 'Travaux agricoles et ruraux — Cadres Dirigeants', secteur: 'Travaux agricoles',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Travaux agricoles et ruraux — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Travaux agricoles.',
  }
,
  {
    idcc: 7511, nom: 'Tabac culture et production — Cadres Dirigeants', secteur: 'Agriculture tabac',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Tabac culture et production — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture tabac.',
  }
,
  {
    idcc: 7512, nom: 'Arboriculture fruitière — Cadres Dirigeants', secteur: 'Agriculture arboriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Arboriculture fruitière — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture arboriculture.',
  }
,
  {
    idcc: 7513, nom: 'Maraîchage et cultures légumières — Cadres Dirigeants', secteur: 'Maraîchage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Maraîchage et cultures légumières — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Maraîchage.',
  }
,
  {
    idcc: 7514, nom: 'Serres horticoles — Cadres Dirigeants', secteur: 'Agriculture serres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Serres horticoles — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture serres.',
  }
,
  {
    idcc: 9001, nom: 'Exploitations agricoles national — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles national — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9011, nom: 'Exploitations agricoles Ain — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Ain — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9021, nom: 'Exploitations agricoles Aisne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Aisne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9031, nom: 'Exploitations agricoles Allier — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Allier — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9051, nom: 'Exploitations agricoles Hautes-Alpes — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Hautes-Alpes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9061, nom: 'Exploitations agricoles Alpes-Maritimes — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Alpes-Maritimes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9071, nom: 'Exploitations agricoles Ardèche — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Ardèche — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9081, nom: 'Exploitations agricoles Ardennes — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Ardennes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9091, nom: 'Exploitations agricoles Ariège — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Ariège — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9101, nom: 'Exploitations agricoles Aube — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Aube — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9111, nom: 'Exploitations agricoles Aude — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Aude — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9121, nom: 'Exploitations agricoles Aveyron — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Aveyron — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9131, nom: 'Exploitations agricoles Bouches-du-Rhône — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Bouches-du-Rhône — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9141, nom: 'Exploitations agricoles Calvados — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Calvados — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9151, nom: 'Exploitations agricoles Cantal — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Cantal — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9161, nom: 'Exploitations agricoles Charente — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Charente — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9171, nom: 'Exploitations agricoles Charente-Maritime — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Charente-Maritime — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9181, nom: 'Exploitations agricoles Cher — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Cher — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9191, nom: 'Exploitations agricoles Corrèze — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Corrèze — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9201, nom: 'Exploitations agricoles Cote-d-Or — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Cote-d-Or — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9211, nom: 'Exploitations agricoles Cotes d Armor — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Cotes d Armor — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9221, nom: 'Exploitations agricoles Creuse — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Creuse — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9231, nom: 'Exploitations agricoles Dordogne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Dordogne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9241, nom: 'Exploitations agricoles Doubs — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Doubs — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9251, nom: 'Exploitations agricoles Drôme — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Drôme — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9261, nom: 'Exploitations agricoles Eure — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Eure — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9271, nom: 'Exploitations agricoles Eure-et-Loir — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Eure-et-Loir — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9281, nom: 'Exploitations agricoles Finistère — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Finistère — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9291, nom: 'Exploitations agricoles Gard — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Gard — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9301, nom: 'Exploitations agricoles Haute-Garonne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Haute-Garonne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9311, nom: 'Exploitations agricoles Gers — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Gers — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9321, nom: 'Exploitations agricoles Gironde — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Gironde — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9331, nom: 'Exploitations agricoles Hérault — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Hérault — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9341, nom: 'Exploitations agricoles Ille-et-Vilaine — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Ille-et-Vilaine — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9351, nom: 'Exploitations agricoles Indre — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Indre — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9361, nom: 'Exploitations agricoles Indre-et-Loire — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Indre-et-Loire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9371, nom: 'Exploitations agricoles Isère — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Isère — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9381, nom: 'Exploitations agricoles Jura — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Jura — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9391, nom: 'Exploitations agricoles Landes — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Landes — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9401, nom: 'Exploitations agricoles Loir-et-Cher — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Loir-et-Cher — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9411, nom: 'Exploitations agricoles Loire — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Loire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9421, nom: 'Exploitations agricoles Haute-Loire — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Haute-Loire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9431, nom: 'Exploitations agricoles Loire-Atlantique — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Loire-Atlantique — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9441, nom: 'Exploitations agricoles Loiret — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Loiret — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9451, nom: 'Exploitations agricoles Lot — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Lot — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9461, nom: 'Exploitations agricoles Lot-et-Garonne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Lot-et-Garonne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9471, nom: 'Exploitations agricoles Lozère — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Lozère — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9481, nom: 'Exploitations agricoles Maine-et-Loire — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Maine-et-Loire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9491, nom: 'Exploitations agricoles Manche — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Manche — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9501, nom: 'Exploitations agricoles Marne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Marne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9511, nom: 'Exploitations agricoles Haute-Marne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Haute-Marne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9521, nom: 'Exploitations agricoles Mayenne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Mayenne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9531, nom: 'Exploitations agricoles Meurthe-et-Moselle — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Meurthe-et-Moselle — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9541, nom: 'Exploitations agricoles Meuse — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Meuse — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9551, nom: 'Exploitations agricoles Morbihan — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Morbihan — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9561, nom: 'Exploitations agricoles Moselle — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Moselle — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9571, nom: 'Exploitations agricoles Nièvre — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Nièvre — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9581, nom: 'Exploitations agricoles Nord — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Nord — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9591, nom: 'Exploitations agricoles Oise — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Oise — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9601, nom: 'Exploitations agricoles Orne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Orne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9611, nom: 'Exploitations agricoles Pas-de-Calais — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Pas-de-Calais — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9621, nom: 'Exploitations agricoles Puy-de-Dôme — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Puy-de-Dôme — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9631, nom: 'Exploitations agricoles Pyrénées-Atlantiques — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Pyrénées-Atlantiques — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9641, nom: 'Exploitations agricoles Hautes-Pyrénées — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Hautes-Pyrénées — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9651, nom: 'Exploitations agricoles Pyrénées-Orientales — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Pyrénées-Orientales — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9661, nom: 'Exploitations agricoles Bas-Rhin — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Bas-Rhin — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9671, nom: 'Exploitations agricoles Haut-Rhin — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Haut-Rhin — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9681, nom: 'Exploitations agricoles Rhône — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Rhône — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9691, nom: 'Exploitations agricoles Haute-Saône — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Haute-Saône — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9701, nom: 'Exploitations agricoles Saône-et-Loire — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Saône-et-Loire — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9711, nom: 'Exploitations agricoles Sarthe — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Sarthe — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9721, nom: 'Exploitations agricoles Savoie — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Savoie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9731, nom: 'Exploitations agricoles Haute-Savoie — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Haute-Savoie — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9741, nom: 'Exploitations agricoles Paris Seine Seine-et-Marne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Paris Seine Seine-et-Marne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9751, nom: 'Exploitations agricoles Seine-Maritime — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Seine-Maritime — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9761, nom: 'Exploitations agricoles Deux-Sèvres — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Deux-Sèvres — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9771, nom: 'Exploitations agricoles Somme — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Somme — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9781, nom: 'Exploitations agricoles Tarn — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Tarn — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9791, nom: 'Exploitations agricoles Tarn-et-Garonne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Tarn-et-Garonne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9801, nom: 'Exploitations agricoles Var — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Var — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9811, nom: 'Accord national agriculture salariés — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Accord national agriculture salariés — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9821, nom: 'Exploitations agricoles Vendée — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Vendée — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9831, nom: 'Exploitations agricoles Vienne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Vienne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9841, nom: 'Exploitations agricoles Haute-Vienne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Haute-Vienne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9851, nom: 'Exploitations agricoles Vosges — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Vosges — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9861, nom: 'Exploitations agricoles Yonne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Yonne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9871, nom: 'Exploitations agricoles Territoire de Belfort — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Territoire de Belfort — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9881, nom: 'Exploitations agricoles Essonne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Essonne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9891, nom: 'Exploitations agricoles Hauts-de-Seine — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Hauts-de-Seine — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9901, nom: 'Exploitations agricoles Seine-Saint-Denis — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Seine-Saint-Denis — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9911, nom: 'Exploitations agricoles Val-de-Marne — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Val-de-Marne — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 9921, nom: 'Exploitations agricoles Val-d-Oise — Cadres Dirigeants', secteur: 'Agriculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Exploitations agricoles Val-d-Oise — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation). Agriculture.',
  }
,
  {
    idcc: 18, nom: 'Industries textiles — Cadres Dirigeants', secteur: 'Textile',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie textile (IDCC 18) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 461, nom: 'Industries du bois et importations bois — Cadres Dirigeants', secteur: 'Bois et dérivés',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Filière bois (IDCC 461) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 463, nom: 'Manutention nettoyage aéroports région parisienne — Cadres Dirigeants', secteur: 'Manutention aéroportuaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Aéroports IDF (IDCC 463) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 468, nom: 'Commerces et services audiovisuel électronique équipement ménager — Cadres Dirigeants', secteur: 'Commerce électronique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distribution électronique (IDCC 468) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 487, nom: 'Cabinets d\'experts comptables et commissaires aux comptes — Cadres Dirigeants', secteur: 'Comptabilité',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets EC/CAC — secteur exposé au forfait jours (IDCC 487) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 710, nom: 'Articles de sport et équipements de loisirs — Cadres Dirigeants', secteur: 'Sport et loisirs distribution',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distribution sport (IDCC 710) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 723, nom: 'Personnel sédentaire navigation intérieure — Cadres Dirigeants', secteur: 'Navigation fluviale',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel sédentaire (IDCC 723) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 779, nom: 'Banque française commerciale étrangère France métropolitaine — Cadres Dirigeants', secteur: 'Banque internationale',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Banque internationale (IDCC 779) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 829, nom: 'Distribution films cinématographiques — Cadres Dirigeants', secteur: 'Cinéma distribution',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distribution films (IDCC 829) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 836, nom: 'Personnel cliniques vétérinaires — Cadres Dirigeants', secteur: 'Vétérinaire personnel',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel auxiliaire vétérinaire (IDCC 836) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 893, nom: 'Boyauderie — Cadres Dirigeants', secteur: 'Boyauderie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Filière boyauderie (IDCC 893) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 953, nom: 'Fleuristes vente plantes graines animaux — Cadres Dirigeants', secteur: 'Fleuriste animalerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce floral (IDCC 953) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1247, nom: 'Galeries d\'art commerce art — Cadres Dirigeants', secteur: 'Galeries d\'art',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Marché de l\'art (IDCC 1247) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1257, nom: 'Industries panneaux à base de bois — Cadres Dirigeants', secteur: 'Panneaux bois',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie panneaux bois (IDCC 1257) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1281, nom: 'Distribution conseil pharmaceutique vétérinaire — Cadres Dirigeants', secteur: 'Pharmacie vétérinaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distribution vétérinaire (IDCC 1281) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1304, nom: 'Personnel ouvrier travaux publics — Cadres Dirigeants', secteur: 'TP ouvriers',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Travaux publics ouvriers (IDCC 1304) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1420, nom: 'Personnel auxiliaire familial éducatif employeurs particuliers — Cadres Dirigeants', secteur: 'Personnel familial',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Particuliers employeurs (IDCC 1420) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1424, nom: 'Reprographie — Cadres Dirigeants', secteur: 'Reprographie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Reprographie services (IDCC 1424) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1495, nom: 'Vins cidres jus fruits sirops spiritueux — Cadres Dirigeants', secteur: 'Boissons commerce',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distribution boissons (IDCC 1495) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1504, nom: 'Pâtisserie artisanale — Cadres Dirigeants', secteur: 'Pâtisserie artisanale',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Boulangerie-pâtisserie artisans (IDCC 1504) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1505, nom: 'Commerce détail fruits et légumes alimentation générale — Cadres Dirigeants', secteur: 'Commerce détail alimentation',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce alimentation proximité (IDCC 1505) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1572, nom: 'Industries céramiques de France — Cadres Dirigeants', secteur: 'Céramique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie céramique (IDCC 1572) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1580, nom: 'Pompes funèbres — Cadres Dirigeants', secteur: 'Pompes funèbres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Services funéraires (IDCC 1580) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1605, nom: 'Entreprises de désinfection désinsectisation dératisation 3D — Cadres Dirigeants', secteur: '3D désinfection',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Hygiène environnementale (IDCC 1605) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1612, nom: 'Logistique communication écrite directe — Cadres Dirigeants', secteur: 'Logistique routage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Routage publicitaire (IDCC 1612) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1635, nom: 'Cabinets ou entreprises géomètres experts — Cadres Dirigeants', secteur: 'Géomètres experts',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Géomètres (IDCC 1635) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1671, nom: 'Cabinets dentaires d\'orthopédie dento-faciale ouvriers techniciens — Cadres Dirigeants', secteur: 'Cabinets dentaires',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets dentaires personnel (IDCC 1671) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1701, nom: 'Carrefour bleu Carrefour proximité — Cadres Dirigeants', secteur: 'Distribution alimentation',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Carrefour proximité (IDCC 1701) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1710, nom: 'Casinos — Cadres Dirigeants', secteur: 'Casinos',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Casinos jeux (IDCC 1710) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1794, nom: 'Industrie matériaux construction céramiques pour bâtiment — Cadres Dirigeants', secteur: 'Matériaux construction céramique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Céramique bâtiment (IDCC 1794) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1801, nom: 'Sociétés financières — Cadres Dirigeants', secteur: 'Sociétés financières',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Établissements de crédit non bancaires — secteur cadres (IDCC 1801) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1812, nom: 'Industries pharmaceutiques fabrication — Cadres Dirigeants', secteur: 'Pharmacie industrielle',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie pharma (IDCC 1812) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1820, nom: 'Jardineries graineteries — Cadres Dirigeants', secteur: 'Jardinerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distribution horticole (IDCC 1820) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1828, nom: 'Marchés alimentaires détaillants vente alimentation générale — Cadres Dirigeants', secteur: 'Marchés alimentation',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce sur marchés (IDCC 1828) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1843, nom: 'Cabinets et cliniques vétérinaires personnel salarié — Cadres Dirigeants', secteur: 'Cliniques vétérinaires',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel salarié vétérinaire (IDCC 1843) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1880, nom: 'Distributeurs conseils hors domicile — Cadres Dirigeants', secteur: 'Distribution boissons CHD',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distribution boissons CHD (IDCC 1880) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1909, nom: 'Organismes de tourisme — Cadres Dirigeants', secteur: 'Tourisme organismes',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Offices de tourisme (IDCC 1909) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1922, nom: 'Personnels radiodiffusion radios privées — Cadres Dirigeants', secteur: 'Radios privées',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Radiodiffusion personnel (IDCC 1922) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1930, nom: 'Métiers transformation grains — Cadres Dirigeants', secteur: 'Meunerie biscuiterie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transformation grains (IDCC 1930) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1938, nom: 'Industries chocolaterie confiserie biscuiterie — Cadres Dirigeants', secteur: 'Chocolaterie biscuiterie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie sucrée (IDCC 1938) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1941, nom: 'Mareyeurs expéditeurs — Cadres Dirigeants', secteur: 'Mareyage',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Mareyeurs (IDCC 1941) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1944, nom: 'Marchés financiers ouvriers employés techniciens cadres — Cadres Dirigeants', secteur: 'Marchés financiers',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Marchés financiers — forfait jours fréquent (IDCC 1944) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1947, nom: 'Habillement industrie — Cadres Dirigeants', secteur: 'Habillement industrie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie habillement (IDCC 1947) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1951, nom: 'Cabinets immobiliers administrateurs biens — Cadres Dirigeants', secteur: 'Immobilier cabinets',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Administrateurs de biens — cadres souvent en forfait jours (IDCC 1951) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1960, nom: 'Conchyliculture — Cadres Dirigeants', secteur: 'Conchyliculture',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Élevage coquillages (IDCC 1960) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1961, nom: 'Personnel petits magasins équipement foyer non alimentaires — Cadres Dirigeants', secteur: 'Équipement foyer',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Petits magasins équipement (IDCC 1961) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1967, nom: 'Importation distribution films cinématographiques — Cadres Dirigeants', secteur: 'Cinéma importation',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Importation films (IDCC 1967) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 1987, nom: 'Pâtisserie — Cadres Dirigeants', secteur: 'Pâtisserie industrielle',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pâtisserie artisans patrons (IDCC 1987) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2017, nom: 'Industries graphiques cadres — Cadres Dirigeants', secteur: 'Graphisme cadres',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries graphiques cadres — forfait jours fréquent (IDCC 2017) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2089, nom: 'Industries carrières et matériaux ouvriers — Cadres Dirigeants', secteur: 'Carrières matériaux',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries carrières ouvriers (IDCC 2089) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2111, nom: 'Salariés du particulier employeur — Cadres Dirigeants', secteur: 'Particulier employeur salarié',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Salariés particuliers employeurs (IDCC 2111) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2147, nom: 'Entreprises eaux-de-vie eaux mises — Cadres Dirigeants', secteur: 'Eaux-de-vie spiritueux',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Production spiritueux (IDCC 2147) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2150, nom: 'Personnels organismes Sécurité Sociale agricole MSA — Cadres Dirigeants', secteur: 'Sécurité Sociale agricole',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'MSA personnel (IDCC 2150) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2156, nom: 'Grands magasins et magasins populaires — Cadres Dirigeants', secteur: 'Grands magasins',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distribution grands magasins (IDCC 2156) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2174, nom: 'Crédit Agricole — Cadres Dirigeants', secteur: 'Crédit Agricole',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Banque Crédit Agricole — cadres souvent en forfait jours (IDCC 2174) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2206, nom: 'CRPCEN clercs et employés notaires — Cadres Dirigeants', secteur: 'Notariat clercs',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Notariat clercs employés (IDCC 2206) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2257, nom: 'Casinos employés — Cadres Dirigeants', secteur: 'Casinos employés',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Casinos personnel (IDCC 2257) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2272, nom: 'Personnel sédentaire transports maritimes — Cadres Dirigeants', secteur: 'Maritime sédentaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transport maritime sédentaire (IDCC 2272) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2326, nom: 'Production audiovisuelle techniciens — Cadres Dirigeants', secteur: 'Audiovisuel techniciens',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Production audiovisuelle (IDCC 2326) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2336, nom: 'Entreprises sociales pour l\'habitat ESH — Cadres Dirigeants', secteur: 'Logement social ESH',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Bailleurs sociaux (IDCC 2336) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2389, nom: 'Industries fabrication ciment — Cadres Dirigeants', secteur: 'Cimenterie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie ciment (IDCC 2389) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2405, nom: 'Centres immatriculation véhicules — Cadres Dirigeants', secteur: 'Immatriculation véhicules',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Service immatriculation (IDCC 2405) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2408, nom: 'Personnel coopératives consommateurs — Cadres Dirigeants', secteur: 'Coopératives consommation',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Coopératives consommateurs (IDCC 2408) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2411, nom: 'Chaînes thématiques — Cadres Dirigeants', secteur: 'Télévision thématique',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Chaînes télé thématiques (IDCC 2411) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2542, nom: 'Entreprises gardiennage sécurité conducteurs cynophiles — Cadres Dirigeants', secteur: 'Cynophile sécurité',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Maîtres-chiens sécurité (IDCC 2542) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2603, nom: 'Branche ferroviaire personnel sédentaire — Cadres Dirigeants', secteur: 'Ferroviaire sédentaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel ferroviaire (IDCC 2603) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2622, nom: 'Crédit Maritime Mutuel — Cadres Dirigeants', secteur: 'Crédit Maritime',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Banque crédit maritime (IDCC 2622) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2666, nom: 'Pâtes alimentaires sèches couscous non préparé — Cadres Dirigeants', secteur: 'Pâtes couscous',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie pâtes (IDCC 2666) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2706, nom: 'Personnel sédentaire transports maritimes ETA — Cadres Dirigeants', secteur: 'Maritime sédentaire ETA',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Transport maritime ETA (IDCC 2706) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2728, nom: 'Sucreries distilleries raffineries — Cadres Dirigeants', secteur: 'Sucre raffinerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie sucrière (IDCC 2728) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2754, nom: 'Vins Champagne ouvriers employés — Cadres Dirigeants', secteur: 'Champagne',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Champagne ouvriers (IDCC 2754) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2768, nom: 'Télécommunications — Cadres Dirigeants', secteur: 'Télécoms',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Opérateurs télécoms — cadres souvent en forfait jours (IDCC 2768) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2785, nom: 'Industrie pétrolière — Cadres Dirigeants', secteur: 'Pétrole industrie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries pétrolières (IDCC 2785) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2796, nom: 'Personnel sociétés coopératives HLM — Cadres Dirigeants', secteur: 'Coopératives HLM',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sociétés HLM coopératives (IDCC 2796) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2847, nom: 'Activités directe d\'autoroute — Cadres Dirigeants', secteur: 'Autoroutes',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sociétés autoroutières (IDCC 2847) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2964, nom: 'Personnel sociétés assistance — Cadres Dirigeants', secteur: 'Sociétés assistance',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Assistance dépannage (IDCC 2964) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2978, nom: 'Golf — Cadres Dirigeants', secteur: 'Golf',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Activités golf (IDCC 2978) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2980, nom: 'Branche ferroviaire — Cadres Dirigeants', secteur: 'Ferroviaire branche',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Branche ferroviaire générale (IDCC 2980) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 2998, nom: 'Personnels organismes mutualité — Cadres Dirigeants', secteur: 'Mutualité personnel',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Mutuelles santé (IDCC 2998) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3028, nom: 'Médecine du travail interentreprises SSTI — Cadres Dirigeants', secteur: 'SST interentreprises',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'SSTI médecine travail (IDCC 3028) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3105, nom: 'Conseils architecture urbanisme environnement CAUE — Cadres Dirigeants', secteur: 'CAUE',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'CAUE conseils architecture (IDCC 3105) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3128, nom: 'Cabinets ophtalmologistes — Cadres Dirigeants', secteur: 'Ophtalmologie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets ophtalmologie (IDCC 3128) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3144, nom: 'Producteurs de films français — Cadres Dirigeants', secteur: 'Cinéma production',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Production cinéma (IDCC 3144) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3168, nom: 'Avocats salariés — Cadres Dirigeants', secteur: 'Avocats salariés',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets d\'avocats salariés — forfait jours fréquent (IDCC 3168) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3204, nom: 'Chemin de fer secondaire local industriel — Cadres Dirigeants', secteur: 'Ferroviaire secondaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Chemin fer secondaire (IDCC 3204) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3206, nom: 'Acteurs commerce restauration livraison rapide — Cadres Dirigeants', secteur: 'Livraison rapide',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Livraison restauration (IDCC 3206) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3213, nom: 'Sucres et raffineries — Cadres Dirigeants', secteur: 'Sucre raffinerie',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industrie sucrière (IDCC 3213) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3216, nom: 'Activités industrielles boulangerie pâtisserie — Cadres Dirigeants', secteur: 'Boulangerie industrielle',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Industries boulangerie (IDCC 3216) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3221, nom: 'Salariés cabinets dentaires — Cadres Dirigeants', secteur: 'Cabinets dentaires salariés',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Cabinets dentaires personnel (IDCC 3221) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3251, nom: 'Officines pharmaceutiques personnel — Cadres Dirigeants', secteur: 'Officines personnel',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Pharmacie officine personnel (IDCC 3251) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3275, nom: 'Activités sport et équipements loisirs — Cadres Dirigeants', secteur: 'Sport équipements',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sport et loisirs distribution (IDCC 3275) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3284, nom: 'Régies du contrat publicité — Cadres Dirigeants', secteur: 'Régies publicitaires',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Publicité régies (IDCC 3284) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3292, nom: 'Personnel sociétés interbancaires — Cadres Dirigeants', secteur: 'Sociétés interbancaires',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Sociétés financières spécialisées (IDCC 3292) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3301, nom: 'Personnel cabinets entreprises économiste construction métreurs vérificateurs — Cadres Dirigeants', secteur: 'Économistes construction',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Métreurs vérificateurs (IDCC 3301) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3303, nom: 'Personnel salarié OPCO — Cadres Dirigeants', secteur: 'OPCO',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Opérateurs compétences (IDCC 3303) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3305, nom: 'Personnel France Domaine immobilier État — Cadres Dirigeants', secteur: 'Domaine État',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Personnel France Domaine (IDCC 3305) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3309, nom: 'Boulangerie pâtisserie de France — Cadres Dirigeants', secteur: 'Boulangerie pâtisserie France',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Boulangerie pâtisserie nationale (IDCC 3309) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3311, nom: 'Branche transports voyageurs — Cadres Dirigeants', secteur: 'Transports voyageurs',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Voyageurs interurbain (IDCC 3311) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3320, nom: 'Filière bois construction commerce — Cadres Dirigeants', secteur: 'Bois construction',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Filière bois (IDCC 3320) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3322, nom: 'Métiers commerce détail alimentation spécialisée — Cadres Dirigeants', secteur: 'Commerce alimentation spé',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Détaillants alimentation (IDCC 3322) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3340, nom: 'Filière distribution domaine matériaux construction — Cadres Dirigeants', secteur: 'Matériaux distribution',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Distribution matériaux construction (IDCC 3340) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3346, nom: 'Personnel sociétés gestion plein air — Cadres Dirigeants', secteur: 'Plein air gestion',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Camping plein air (IDCC 3346) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3364, nom: 'Personnel salarié Caisse Épargne — Cadres Dirigeants', secteur: 'Caisse Épargne',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Banque Caisse d\'Épargne — cadres en forfait jours (IDCC 3364) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3373, nom: 'Personnel salarié Banque Populaire — Cadres Dirigeants', secteur: 'Banque Populaire',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Banque Populaire — cadres en forfait jours (IDCC 3373) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
  }
,
  {
    idcc: 3044, nom: 'Commerce de gros non alimentaire — Cadres Dirigeants', secteur: 'Commerce de gros non alim.',
    critereCD: 'Application standard Art. L3111-2 : pouvoir de direction effectif, rémunération parmi les plus élevées de l\'entreprise, autonomie réelle dans l\'organisation du temps. Ces 3 critères sont CUMULATIFS (Cass. Soc. 31/01/2012).',
    rmgCD: 'Aucun minimum fixé conventionnellement — hors grille de classification',
    entretienCD: 'Pas d\'obligation légale formelle pour les CD — recommandé annuellement (Art. L4121-1)',
    droitsCP: '25 jours ouvrables minimum (Art. L3141-1)',
    alertesCD: ['3 critères cumulatifs L3111-2 obligatoires', 'En cas de requalification : rappel HS sur 3 ans (Cass. Soc. 2011)', 'Obligation de sécurité maintenue (Art. L4121-1)', '218 jours dépassés : recommander un entretien de charge'],
    notesCD: 'Commerce de gros non alimentaire (IDCC 3044) — Application standard L3111-2 (pouvoir de direction effectif, rémunération parmi les plus élevées, autonomie d\'organisation).',
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
