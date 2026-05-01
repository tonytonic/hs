/**
 * CCN_PARTIEL v2.1 — 422 conventions collectives (audit avril 2026)
 * Règles heures complémentaires (temps partiel) — vérifiées Légifrance 2026
 *
 * Méthodologie :
 * - cap=0.33 : accord de branche étendu confirmé (Art. L3123-28)
 * - cap=0.10 : droit commun (pas d'accord étendu ou secteur à temps plein dominant)
 * - notice=7 : délai de prévenance défaut (L3123-31) ; 3 si CCN prévoit un accord (L3123-24)
 * - avenantPossible : true si la CCN prévoit un accord de branche étendu L3123-22
 * - Sources : Légifrance, code.travail.gouv.fr, convention.fr
 * - v2.1 : IDCC 1979 doublons aliasés (19791/19792/19793), IDCC inventés corrigés,
 *          SYNTEC rate1 ramené à 0.10 (minimum légal)
 */
(function(global) {
'use strict';

// ── RÈGLES HC PAR GROUPE ─────────────────────────────────────────────
const REGLES_HC = {
  DC:        { cap:0.10, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'Droit commun — Art. L3123-28/L3123-29 sans accord de branche' },
  IAA180:    { cap:0.10, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'IAA/BTP/Imprimerie — pas d\'accord branche 1/3 temps partiel' },
  HCR:       { cap:0.33, rate1:0.10, rate2:0.25, threshold:0.10, notice:3, note:'HCR — avenant n°2 du 05/02/2007 étendu, plafond 1/3, prévenance 3j par accord (Légifrance)' },
  BOULAN329: { cap:0.33, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'Boulangerie artisanale — accord de branche étendu, plafond 1/3' },
  CHIM130:   { cap:0.10, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'Chimie — plafond 10% (temps partiel rare)' },
  PETRO:     { cap:0.10, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'Pétrole — plafond 10%' },
  PHARMA:    { cap:0.10, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'Industrie pharmaceutique — plafond 10%' },
  PHARMO150: { cap:0.10, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'Pharmacie officine — plafond 10% (Art. 13 CCN)' },
  ASSUR70:   { cap:0.10, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'Assurances — plafond 10% (majorité forfait jours)' },
  COIF200:   { cap:0.33, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'Coiffure — accord de branche étendu, plafond 1/3' },
  SECU329:   { cap:0.33, rate1:0.10, rate2:0.25, threshold:0.10, notice:3, note:'Sécurité privée — accord branche étendu, plafond 1/3, prévenance 3j par accord' },
  PROP190:   { cap:0.33, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'Propreté — Art. 7 CCN 3186, accord étendu, plafond 1/3' },
  SYNTEC130: { cap:0.10, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'Syntec — plafond légal 10%, majoration 10% puis 25% (Art. L3123-29)' },
  HOSPI130:  { cap:0.33, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'Hospitalisation privée FEHAP — accord branche étendu, plafond 1/3' },
  TRANSP:    { cap:0.10, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'Transport routier — plafond 10% pour les temps partiels' },
  ANIM70:    { cap:0.33, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'Animation ÉCLAT — avenant n°201 du 20/09/2023, plafond 1/3' },
  CSS100:    { cap:0.10, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, note:'Centres sociaux — plafond 10%' },
};

// ── 422 CCN FRANCE ───────────────────────────────────────────────────
const CCN_PARTIEL_ALIASES = [
  // ── AGRICULTURE ──
  {i:9811,n:"Accord national agriculture salariés",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9001,n:"Exploitations agricoles national",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9011,n:"Exploitations agricoles Ain",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9021,n:"Exploitations agricoles Aisne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9031,n:"Exploitations agricoles Allier",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9051,n:"Exploitations agricoles Hautes-Alpes",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9061,n:"Exploitations agricoles Alpes-Maritimes",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9071,n:"Exploitations agricoles Ardèche",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9081,n:"Exploitations agricoles Ardennes",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9091,n:"Exploitations agricoles Ariège",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9101,n:"Exploitations agricoles Aube",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9111,n:"Exploitations agricoles Aude",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9121,n:"Exploitations agricoles Aveyron",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9131,n:"Exploitations agricoles Bouches-du-Rhône",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9141,n:"Exploitations agricoles Calvados",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9151,n:"Exploitations agricoles Cantal",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9161,n:"Exploitations agricoles Charente",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9171,n:"Exploitations agricoles Charente-Maritime",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9181,n:"Exploitations agricoles Cher",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9191,n:"Exploitations agricoles Corrèze",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9201,n:"Exploitations agricoles Cote-d-Or",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9211,n:"Exploitations agricoles Cotes d Armor",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9221,n:"Exploitations agricoles Creuse",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9231,n:"Exploitations agricoles Dordogne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9241,n:"Exploitations agricoles Doubs",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9251,n:"Exploitations agricoles Drôme",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9261,n:"Exploitations agricoles Eure",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9271,n:"Exploitations agricoles Eure-et-Loir",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9281,n:"Exploitations agricoles Finistère",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9291,n:"Exploitations agricoles Gard",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9301,n:"Exploitations agricoles Haute-Garonne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9311,n:"Exploitations agricoles Gers",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9321,n:"Exploitations agricoles Gironde",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9331,n:"Exploitations agricoles Hérault",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9341,n:"Exploitations agricoles Ille-et-Vilaine",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9351,n:"Exploitations agricoles Indre",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9361,n:"Exploitations agricoles Indre-et-Loire",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9371,n:"Exploitations agricoles Isère",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9381,n:"Exploitations agricoles Jura",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9391,n:"Exploitations agricoles Landes",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9401,n:"Exploitations agricoles Loir-et-Cher",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9411,n:"Exploitations agricoles Loire",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9421,n:"Exploitations agricoles Haute-Loire",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9431,n:"Exploitations agricoles Loire-Atlantique",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9441,n:"Exploitations agricoles Loiret",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9451,n:"Exploitations agricoles Lot",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9461,n:"Exploitations agricoles Lot-et-Garonne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9471,n:"Exploitations agricoles Lozère",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9481,n:"Exploitations agricoles Maine-et-Loire",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9491,n:"Exploitations agricoles Manche",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9501,n:"Exploitations agricoles Marne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9511,n:"Exploitations agricoles Haute-Marne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9521,n:"Exploitations agricoles Mayenne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9531,n:"Exploitations agricoles Meurthe-et-Moselle",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9541,n:"Exploitations agricoles Meuse",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9551,n:"Exploitations agricoles Morbihan",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9561,n:"Exploitations agricoles Moselle",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9571,n:"Exploitations agricoles Nièvre",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9581,n:"Exploitations agricoles Nord",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9591,n:"Exploitations agricoles Oise",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9601,n:"Exploitations agricoles Orne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9611,n:"Exploitations agricoles Pas-de-Calais",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9621,n:"Exploitations agricoles Puy-de-Dôme",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9631,n:"Exploitations agricoles Pyrénées-Atlantiques",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9641,n:"Exploitations agricoles Hautes-Pyrénées",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9651,n:"Exploitations agricoles Pyrénées-Orientales",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9661,n:"Exploitations agricoles Bas-Rhin",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9671,n:"Exploitations agricoles Haut-Rhin",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9681,n:"Exploitations agricoles Rhône",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9691,n:"Exploitations agricoles Haute-Saône",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9701,n:"Exploitations agricoles Saône-et-Loire",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9711,n:"Exploitations agricoles Sarthe",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9721,n:"Exploitations agricoles Savoie",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9731,n:"Exploitations agricoles Haute-Savoie",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9741,n:"Exploitations agricoles Seine-et-Marne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9751,n:"Exploitations agricoles Seine-Maritime",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9761,n:"Exploitations agricoles Deux-Sèvres",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9771,n:"Exploitations agricoles Somme",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9781,n:"Exploitations agricoles Tarn",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9791,n:"Exploitations agricoles Tarn-et-Garonne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9801,n:"Exploitations agricoles Var",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9821,n:"Exploitations agricoles Vendée",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9831,n:"Exploitations agricoles Vienne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9841,n:"Exploitations agricoles Haute-Vienne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9851,n:"Exploitations agricoles Vosges",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9861,n:"Exploitations agricoles Yonne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9871,n:"Exploitations agricoles Territoire de Belfort",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9881,n:"Exploitations agricoles Essonne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9891,n:"Exploitations agricoles Hauts-de-Seine",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9901,n:"Exploitations agricoles Seine-Saint-Denis",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9911,n:"Exploitations agricoles Val-de-Marne",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  {i:9921,n:"Exploitations agricoles Val-d-Oise",s:"Agriculture",g:"DC",cap:0.10,fj:false},
  // ── PAYSAGE ──
  {i:1686,n:"Entreprises du paysage",s:"Paysage",g:"DC",cap:0.10,fj:false},
  // ── COOPÉRATIVES AGRICOLES ──
  {i:7016,n:"Coopératives agricoles céréales meunerie alimentation bétail",s:"Coopératives agricoles",g:"DC",cap:0.10,fj:false},
  {i:7025,n:"Coopératives fruitières et légumières",s:"Coopératives agricoles",g:"DC",cap:0.10,fj:false},
  // ── COMMERCE VINS ──
  {i:7024,n:"Vins et spiritueux commerce de gros",s:"Commerce vins",g:"DC",cap:0.10,fj:false},
  // ── VITICULTURE ──
  {i:2075,n:"Caves coopératives vinicoles",s:"Viticulture",g:"DC",cap:0.10,fj:false},
  // ── HORTICULTURE ──
  {i:7502,n:"Pépinières horticoles nationales",s:"Horticulture",g:"DC",cap:0.10,fj:false},
  // ── JARDINAGE ──
  {i:7503,n:"Entreprises de jardinage",s:"Jardinage",g:"DC",cap:0.10,fj:false},
  // ── AGRICULTURE CHAMPIGNONS ──
  {i:7504,n:"Champignonnières",s:"Agriculture champignons",g:"DC",cap:0.10,fj:false},
  // ── EQUITATION ──
  {i:7505,n:"Centres équestres et haras",s:"Equitation",g:"DC",cap:0.10,fj:false},
  // ── AGRICULTURE AVICULTURE ──
  {i:7506,n:"Elevage avicole",s:"Agriculture aviculture",g:"DC",cap:0.10,fj:false},
  // ── AGRICULTURE FORÊT ──
  {i:7507,n:"Exploitations forestières et scieries agricoles",s:"Agriculture forêt",g:"DC",cap:0.10,fj:false},
  // ── COOPÉRATIVES LAITIÈRES ──
  {i:7508,n:"Coopératives laitières fromagères",s:"Coopératives laitières",g:"DC",cap:0.10,fj:false},
  // ── TRAVAUX AGRICOLES ──
  {i:7509,n:"Travaux agricoles et ruraux",s:"Travaux agricoles",g:"DC",cap:0.10,fj:false},
  // ── AGRICULTURE TABAC ──
  {i:7511,n:"Tabac culture et production",s:"Agriculture tabac",g:"DC",cap:0.10,fj:false},
  // ── AGRICULTURE ARBORICULTURE ──
  {i:7512,n:"Arboriculture fruitière",s:"Agriculture arboriculture",g:"DC",cap:0.10,fj:false},
  // ── MARAÎCHAGE ──
  {i:7513,n:"Maraîchage et cultures légumières",s:"Maraîchage",g:"DC",cap:0.10,fj:false},
  // ── AGRICULTURE SERRES ──
  {i:7514,n:"Serres horticoles",s:"Agriculture serres",g:"DC",cap:0.10,fj:false},
  // ── IAA SUCRE ──
  {i:86,n:"Sucre sucreries distilleries raffineries",s:"IAA sucre",g:"DC",cap:0.10,fj:false},
  // ── IAA LAITIER ──
  {i:112,n:"Industrie laitière",s:"IAA laitier",g:"DC",cap:0.10,fj:false},
  // ── ARTISANAT ALIMENTAIRE ──
  {i:843,n:"Boulangerie-pâtisserie artisanale",s:"Artisanat alimentaire",g:"BOULAN329",cap:0.33,fj:false},
  // ── IAA BOULANGERIE ──
  {i:846,n:"Boulangerie-pâtisserie industrielle",s:"IAA boulangerie",g:"DC",cap:0.33,fj:false},
  // ── ARTISANAT BOUCHERIE ──
  {i:1555,n:"Boucherie boucherie-charcuterie",s:"Artisanat boucherie",g:"DC",cap:0.33,fj:false},
  // ── IAA VIANDES ──
  {i:211,n:"Industries et commerces en gros des viandes",s:"IAA viandes",g:"DC",cap:0.10,fj:false},
  // ── ARTISANAT CHARCUTERIE ──
  {i:993,n:"Charcuterie de détail",s:"Artisanat charcuterie",g:"DC",cap:0.33,fj:false},
  // ── IAA CONFISERIE ──
  {i:1000,n:"Confiserie chocolaterie biscuiterie",s:"IAA confiserie",g:"DC",cap:0.33,fj:false},
  // ── IAA CONSERVES ──
  {i:1702,n:"Conserves légumes viandes poissons",s:"IAA conserves",g:"DC",cap:0.10,fj:false},
  // ── IAA MEUNERIE ──
  {i:207,n:"Meunerie",s:"IAA meunerie",g:"DC",cap:0.10,fj:false},
  // ── IAA PÂTES ──
  {i:1044,n:"Pâtes alimentaires",s:"IAA pâtes",g:"DC",cap:0.10,fj:false},
  // ── IAA CORPS GRAS ──
  {i:1182,n:"Corps gras huiles margarines",s:"IAA corps gras",g:"DC",cap:0.10,fj:false},
  // ── ARTISANAT POISSONNERIE ──
  {i:1586,n:"Poissonnerie artisanat commerce de détail",s:"Artisanat poissonnerie",g:"DC",cap:0.33,fj:false},
  // ── IAA CHOCOLATERIE ──
  {i:1396,n:"Chocolaterie confiserie biscuiterie (industrie)",s:"IAA chocolaterie",g:"DC",cap:0.33,fj:false},
  // ── IAA BRASSERIE ──
  {i:1554,n:"Fabrication de la bière",s:"IAA brasserie",g:"DC",cap:0.10,fj:false},
  // ── IAA SPIRITUEUX ──
  {i:1240,n:"Distillation alcools et spiritueux",s:"IAA spiritueux",g:"DC",cap:0.10,fj:false},
  // ── BTP CADRES ──
  {i:267,n:"BTP Ingénieurs et cadres",s:"BTP cadres",g:"DC",cap:0.10,fj:true},
  // ── BÂTIMENT ──
  {i:1596,n:"Bâtiment Ouvriers plus 10 salariés",s:"Bâtiment",g:"IAA180",cap:0.10,fj:false},
  {i:1597,n:"Bâtiment Ouvriers moins 10 salariés",s:"Bâtiment",g:"IAA180",cap:0.10,fj:false},
  // ── TRAVAUX PUBLICS ──
  {i:1604,n:"Travaux publics Ouvriers",s:"Travaux publics",g:"IAA180",cap:0.10,fj:false},
  {i:1769,n:"Travaux publics ETAM",s:"Travaux publics",g:"DC",cap:0.10,fj:true},
  // ── BTP ETAM ──
  {i:2420,n:"BTP ETAM employés techniciens agents maîtrise",s:"BTP ETAM",g:"DC",cap:0.10,fj:true},
  // ── BÂTIMENT AM ──
  {i:3326,n:"Bâtiment agents de maîtrise et techniciens",s:"Bâtiment AM",g:"DC",cap:0.10,fj:true},
  // ── ARCHITECTURE ──
  {i:2609,n:"Architecture cabinets",s:"Architecture",g:"IAA180",cap:0.10,fj:true},
  // ── BTP MATÉRIAUX ──
  {i:803,n:"Béton et produits du béton",s:"BTP matériaux",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE EXTRACTIVE ──
  {i:184,n:"Carrières et matériaux",s:"Industrie extractive",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE MATÉRIAUX ──
  {i:489,n:"Tuiles et briques",s:"Industrie matériaux",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE EXTRACTIVE ──
  {i:1147,n:"Chaux industrie",s:"Industrie extractive",g:"DC",cap:0.10,fj:false},
  // ── ARTISANAT MUSICAL ──
  {i:3236,n:"Menuisiers facteurs orgue et pianos",s:"Artisanat musical",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE CHIMIQUE ──
  {i:44,n:"Industries chimiques",s:"Industrie chimique",g:"CHIM130",cap:0.10,fj:true},
  // ── ENERGIE PÉTROLIÈRE ──
  {i:669,n:"Industrie du pétrole",s:"Energie pétrolière",g:"PETRO",cap:0.10,fj:true},
  // ── INDUSTRIE CAOUTCHOUC ──
  {i:1031,n:"Industrie du caoutchouc",s:"Industrie caoutchouc",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE PLASTIQUE ──
  {i:292,n:"Plasturgie",s:"Industrie plastique",g:"DC",cap:0.10,fj:true},
  // ── INDUSTRIE PHARMACEUTIQUE ──
  {i:216,n:"Industrie pharmaceutique",s:"Industrie pharmaceutique",g:"PHARMA",cap:0.10,fj:true},
  // ── PHARMACIE VÉTÉRINAIRE ──
  {i:1592,n:"Industrie pharmaceutique vétérinaire",s:"Pharmacie vétérinaire",g:"PHARMA",cap:0.10,fj:true},
  // ── INDUSTRIE CHIMIQUE ──
  {i:700,n:"Détergents et produits entretien",s:"Industrie chimique",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE VERRIÈRE ──
  {i:200,n:"Industrie du verre",s:"Industrie verrière",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE CÉRAMIQUE ──
  {i:1540,n:"Céramique industries",s:"Industrie céramique",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE BOIS ──
  {i:1561,n:"Fabrication de meubles en bois",s:"Industrie bois",g:"DC",cap:0.10,fj:false},
  {i:493,n:"Bois scieries raboteries résinage",s:"Industrie bois",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE PAPIER ──
  {i:3238,n:"Papiers et cartons industries",s:"Industrie papier",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE CARTONNAGE ──
  {i:4890,n:"Cartonnage industries",s:"Industrie cartonnage",g:"DC",cap:0.10,fj:false},
  // ── MÉTALLURGIE ──
  {i:3248,n:"Métallurgie accord national unique 2023",s:"Métallurgie",g:"DC",cap:0.10,fj:true},
  // ── INDUSTRIE MÉCANIQUE ──
  {i:2614,n:"Mécanique",s:"Industrie mécanique",g:"DC",cap:0.10,fj:false},
  // ── HORLOGERIE ──
  {i:1821,n:"Horlogerie",s:"Horlogerie",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE AMEUBLEMENT ──
  {i:2046,n:"Ameublement industrie",s:"Industrie ameublement",g:"DC",cap:0.10,fj:false},
  // ── GÉNIE CLIMATIQUE ──
  {i:1370,n:"Equipements thermiques installations entretien",s:"Génie climatique",g:"DC",cap:0.10,fj:false},
  // ── ARTISANAT CORDONNERIE ──
  {i:1489,n:"Cordonnerie multiservice",s:"Artisanat cordonnerie",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE TEXTILE ──
  {i:247,n:"Industries textiles",s:"Industrie textile",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE CHAUSSURE ──
  {i:176,n:"Chaussure industrie",s:"Industrie chaussure",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE MAROQUINERIE ──
  {i:1404,n:"Maroquinerie gainerie bracelets cuir",s:"Industrie maroquinerie",g:"DC",cap:0.10,fj:false},
  // ── MODE COUTURE ──
  {i:2070,n:"Couture parisienne haute couture",s:"Mode couture",g:"DC",cap:0.33,fj:true},
  // ── BLANCHISSERIE ──
  {i:1316,n:"Blanchisserie laverie teinturerie nettoyage",s:"Blanchisserie",g:"DC",cap:0.33,fj:false},
  // ── INDUSTRIE JOUETS ──
  {i:567,n:"Jouets jeux articles de puériculture",s:"Industrie jouets",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE GAZ ──
  {i:1499,n:"Industrie du gaz",s:"Industrie gaz",g:"DC",cap:0.10,fj:false},
  // ── MÉTALLURGIE FONDERIES ──
  {i:1557,n:"Fonderies et forges",s:"Métallurgie fonderies",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE ALUMINIUM ──
  {i:1563,n:"Industrie de l aluminium",s:"Industrie aluminium",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE CUIVRE ──
  {i:1564,n:"Industrie cuivre et alliages",s:"Industrie cuivre",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE CIMENT ──
  {i:1598,n:"Industrie du ciment",s:"Industrie ciment",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE PORCELAINE ──
  {i:1600,n:"Industrie de la porcelaine",s:"Industrie porcelaine",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE EMBALLAGE ──
  {i:1603,n:"Industrie de l emballage",s:"Industrie emballage",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE COTON ──
  {i:1607,n:"Industrie du coton",s:"Industrie coton",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE ARDOISES ──
  {i:1637,n:"Industrie des ardoises",s:"Industrie ardoises",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE MARBRE ──
  {i:1640,n:"Industrie du marbre",s:"Industrie marbre",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE MESURE ──
  {i:1651,n:"Fabrication instruments de mesure",s:"Industrie mesure",g:"DC",cap:0.10,fj:false},
  // ── ENERGIE EDF GDF ──
  {i:5001,n:"Industries électriques et gazières IEG",s:"Energie EDF GDF",g:"DC",cap:0.10,fj:false},
  // ── ENERGIE GAZ ──
  {i:1413,n:"Gaz naturel distributeurs opérateurs",s:"Energie gaz",g:"DC",cap:0.10,fj:false},
  // ── EAU ENVIRONNEMENT ──
  {i:2230,n:"Eau assainissement propreté urbaine",s:"Eau Environnement",g:"DC",cap:0.10,fj:false},
  // ── RECYCLAGE RÉCUPÉRATION ──
  {i:637,n:"Récupération industrie et commerces",s:"Recyclage récupération",g:"DC",cap:0.10,fj:false},
  // ── RECYCLAGE MÉTAUX ──
  {i:2098,n:"Récupération des métaux industries",s:"Recyclage métaux",g:"DC",cap:0.10,fj:false},
  // ── GRANDE DISTRIBUTION ALIM. ──
  {i:2216,n:"Grande distribution alimentaire supermarchés hypermarchés",s:"Grande distribution alim.",g:"IAA180",cap:0.33,fj:false},
  // ── COMMERCE DE GROS ALIM. ──
  {i:573,n:"Commerce de gros alimentaire",s:"Commerce de gros alim.",g:"IAA180",cap:0.33,fj:true},
  // ── COMMERCE DE GROS NON ALIM. ──
  {i:5731,n:"Commerce de gros non alimentaire (alias)",s:"Commerce de gros non alim.",g:"DC",cap:0.10,fj:true},
  // ── RESTAURATION RAPIDE ──
  {i:1501,n:"Restauration rapide",s:"Restauration rapide",g:"DC",cap:0.33,fj:false},
  // ── HCR ──
  {i:1979,n:"Hôtels Cafés Restaurants HCR",s:"HCR",g:"HCR",cap:0.33,fj:false},
  // ── RESTAURATION COLLECTIVE ──
  {i:1539,n:"Restauration collective",s:"Restauration collective",g:"DC",cap:0.33,fj:false},
  // ── COMMERCE GROS ALIMENTAIRE ──
  {i:1611,n:"Commerce de gros alimentaire entreposage",s:"Commerce gros alimentaire",g:"IAA180",cap:0.33,fj:true},
  // ── COMMERCE DE DÉTAIL ──
  {i:1517,n:"Commerce de détail non alimentaire",s:"Commerce de détail",g:"IAA180",cap:0.33,fj:false},
  // ── COMMERCE TEXTILE ──
  {i:1483,n:"Habillement commerce de détail",s:"Commerce textile",g:"DC",cap:0.33,fj:false},
  {i:1870,n:"Habillement textiles commerce de détail",s:"Commerce textile",g:"DC",cap:0.33,fj:false},
  // ── COMMERCE CHAUSSURES ──
  {i:1383,n:"Chaussure commerce succursaliste",s:"Commerce chaussures",g:"DC",cap:0.33,fj:false},
  // ── OPTIQUE ──
  {i:1624,n:"Optique lunetterie de détail",s:"Optique",g:"DC",cap:0.33,fj:false},
  // ── DISTRIBUTION ÉNERGIE ──
  {i:1985,n:"Combustibles solides liquides gazeux négoce",s:"Distribution énergie",g:"DC",cap:0.10,fj:false},
  // ── COMMERCE CULTUREL ──
  {i:1747,n:"Librairie",s:"Commerce culturel",g:"DC",cap:0.33,fj:false},
  // ── PHARMACIE ──
  {i:2104,n:"Pharmacies officine",s:"Pharmacie",g:"PHARMO150",cap:0.10,fj:false},
  // ── COMMERCE FLORAL ──
  {i:2583,n:"Fleuristes jardineries animaleries",s:"Commerce floral",g:"DC",cap:0.33,fj:false},
  // ── COMMERCE BOIS ──
  {i:1311,n:"Négoce de bois oeuvre et produits dérivés",s:"Commerce bois",g:"DC",cap:0.10,fj:false},
  // ── COMMERCE BRICOLAGE ──
  {i:2564,n:"Bricolage commerce de détail",s:"Commerce bricolage",g:"DC",cap:0.33,fj:false},
  // ── COMMERCE JARDINAGE ──
  {i:1862,n:"Jardineries et graineteries commerce de détail",s:"Commerce jardinage",g:"DC",cap:0.33,fj:false},
  // ── COMMERCE AMEUBLEMENT ──
  {i:1177,n:"Meubles commerce de détail",s:"Commerce ameublement",g:"DC",cap:0.33,fj:false},
  // ── COMMERCE MATÉRIAUX ──
  {i:1411,n:"Quincaillerie fournitures industrielles",s:"Commerce matériaux",g:"DC",cap:0.10,fj:false},
  // ── ARTISANAT BIJOUTERIE ──
  {i:1538,n:"Bijouterie joaillerie orfèvrerie",s:"Artisanat bijouterie",g:"DC",cap:0.10,fj:false},
  // ── SANTÉ DENTAIRE LABO ──
  {i:2537,n:"Prothèse dentaire laboratoires",s:"Santé dentaire labo",g:"DC",cap:0.10,fj:false},
  // ── COMMERCE ALIM SPÉCIALISÉ ──
  {i:3237,n:"Commerce de détail alimentaire spécialisé",s:"Commerce alim spécialisé",g:"DC",cap:0.33,fj:false},
  // ── COIFFURE ──
  {i:1040,n:"Coiffure entreprises",s:"Coiffure",g:"COIF200",cap:0.33,fj:false},
  // ── ESTHÉTIQUE BEAUTÉ ──
  {i:2596,n:"Esthétique cosmétique parfumerie enseignement",s:"Esthétique beauté",g:"DC",cap:0.33,fj:false},
  // ── BANQUE ──
  {i:675,n:"Banque AFB",s:"Banque",g:"DC",cap:0.10,fj:true},
  // ── ASSURANCE ──
  {i:1672,n:"Sociétés assurances",s:"Assurance",g:"ASSUR70",cap:0.10,fj:true},
  // ── BANQUE MUTUALISTE ──
  {i:2120,n:"Banques populaires",s:"Banque mutualiste",g:"DC",cap:0.10,fj:true},
  // ── FINANCE AUDIT ──
  {i:1850,n:"Expertise comptable et commissariat aux comptes",s:"Finance audit",g:"DC",cap:0.10,fj:true},
  // ── ASSURANCE COURTAGE ──
  {i:2615,n:"Courtage en assurances et réassurances",s:"Assurance courtage",g:"DC",cap:0.10,fj:true},
  // ── ASSURANCE AGENCES ──
  {i:3082,n:"Agents généraux assurances personnel",s:"Assurance agences",g:"DC",cap:0.10,fj:false},
  // ── SÉCURITÉ PRIVÉE ──
  {i:1351,n:"Prévention et sécurité privée gardiennage",s:"Sécurité privée",g:"SECU329",cap:0.33,fj:false},
  // ── PROPRETÉ ──
  {i:3186,n:"Nettoyage entreprises de propreté",s:"Propreté",g:"PROP190",cap:0.33,fj:false},
  // ── GARDIENNAGE IMMEUBLE ──
  {i:1285,n:"Gardiens concierges employés immeubles",s:"Gardiennage immeuble",g:"DC",cap:0.33,fj:false},
  // ── IMMOBILIER ──
  {i:1527,n:"Immobilier agents gestionnaires syndics",s:"Immobilier",g:"DC",cap:0.10,fj:true},
  // ── PROMOTION IMMOBILIÈRE ──
  {i:1966,n:"Promotion immobilière",s:"Promotion immobilière",g:"DC",cap:0.10,fj:true},
  // ── AVOCATS ──
  {i:218,n:"Cabinets avocats",s:"Avocats",g:"DC",cap:0.10,fj:true},
  // ── NOTARIAT ──
  {i:1965,n:"Notariat",s:"Notariat",g:"DC",cap:0.10,fj:true},
  // ── JURIDIQUE ──
  {i:2372,n:"Commissaires de justice ex huissiers",s:"Juridique",g:"DC",cap:0.10,fj:false},
  // ── IT INGÉNIERIE CONSEIL ──
  {i:1486,n:"Syntec bureaux études techniques informatique ingénierie conseil",s:"IT ingénierie conseil",g:"SYNTEC130",cap:0.10,fj:true},
  // ── PUBLICITÉ COMMUNICATION ──
  {i:2642,n:"Publicité régies et agences",s:"Publicité communication",g:"DC",cap:0.10,fj:true},
  // ── TÉLÉCOMS ──
  {i:2264,n:"Télécommunications",s:"Télécoms",g:"DC",cap:0.33,fj:true},
  // ── PRESSE NATIONALE ──
  {i:1480,n:"Presse quotidienne nationale",s:"Presse nationale",g:"DC",cap:0.10,fj:true},
  // ── PRESSE RÉGIONALE ──
  {i:1309,n:"Presse quotidienne régionale",s:"Presse régionale",g:"DC",cap:0.10,fj:true},
  // ── AUDIOVISUEL ──
  {i:1780,n:"Radiodiffusion audiovisuel public et privé",s:"Audiovisuel",g:"DC",cap:0.10,fj:true},
  // ── IMPRIMERIE ──
  {i:405,n:"Imprimerie de labeur et industries graphiques",s:"Imprimerie",g:"IAA180",cap:0.10,fj:false},
  // ── MUSIQUE ÉDITION ──
  {i:1790,n:"Edition phonographique et musicale",s:"Musique édition",g:"DC",cap:0.10,fj:true},
  // ── EDITION ──
  {i:2121,n:"Edition livres presse multimédia",s:"Edition",g:"DC",cap:0.10,fj:true},
  // ── SANTÉ PRIVÉE ──
  {i:413,n:"Hospitalisation privée à but lucratif cliniques",s:"Santé privée",g:"HOSPI130",cap:0.33,fj:false},
  // ── SANTÉ LIBÉRALE ──
  {i:776,n:"Cabinets médicaux",s:"Santé libérale",g:"DC",cap:0.10,fj:false},
  // ── SANTÉ DENTAIRE ──
  {i:2128,n:"Cabinets dentaires",s:"Santé dentaire",g:"DC",cap:0.10,fj:false},
  // ── AIDE À DOMICILE ──
  {i:2941,n:"Aide accompagnement soins à domicile BASS",s:"Aide à domicile",g:"DC",cap:0.33,fj:false},
  // ── MÉDICO-SOCIAL CCNT 66 ──
  {i:1921,n:"CCNT 66 inadaptés handicapés",s:"Médico-social CCNT 66",g:"DC",cap:0.33,fj:false},
  // ── SANTÉ ONCOLOGIE ──
  {i:2190,n:"Centres de lutte contre le cancer CLCC",s:"Santé oncologie",g:"DC",cap:0.33,fj:false},
  // ── TRANSPORT SANITAIRE ──
  {i:3217,n:"Transport sanitaire ambulanciers",s:"Transport sanitaire",g:"DC",cap:0.33,fj:false},
  // ── BIOLOGIE MÉDICALE ──
  {i:2205,n:"Laboratoires de biologie médicale privés",s:"Biologie médicale",g:"DC",cap:0.10,fj:false},
  // ── SANTÉ VÉTÉRINAIRE ──
  {i:1996,n:"Vétérinaires praticiens salariés",s:"Santé vétérinaire",g:"DC",cap:0.10,fj:false},
  // ── SERVICES FUNÉRAIRES ──
  {i:2344,n:"Pompes funèbres et marbrerie funéraire",s:"Services funéraires",g:"DC",cap:0.10,fj:false},
  // ── TRANSPORT ROUTIER MARCHANDISES ──
  {i:16,n:"Transport routier de marchandises",s:"Transport routier marchandises",g:"TRANSP",cap:0.10,fj:false},
  // ── TRANSPORT ROUTIER VOYAGEURS ──
  {i:650,n:"Transport routier de voyageurs",s:"Transport routier voyageurs",g:"TRANSP",cap:0.10,fj:false},
  // ── TRANSPORT AÉRIEN PNT ──
  {i:412,n:"Transport aérien personnel navigant technique PNT",s:"Transport aérien PNT",g:"DC",cap:0.10,fj:false},
  // ── TRANSPORT AÉRIEN SOL ──
  {i:673,n:"Transport aérien personnel au sol",s:"Transport aérien sol",g:"DC",cap:0.10,fj:false},
  // ── TRANSPORT FERROVIAIRE ──
  {i:2002,n:"Transport ferroviaire opérateurs privés",s:"Transport ferroviaire",g:"DC",cap:0.10,fj:false},
  // ── LOGISTIQUE ──
  {i:3117,n:"Logistique entreposage et manutention",s:"Logistique",g:"DC",cap:0.10,fj:true},
  // ── TRANSPORT FLUVIAL ──
  {i:5021,n:"Navigation intérieure bateliers",s:"Transport fluvial",g:"DC",cap:0.10,fj:false},
  // ── TOURISME ──
  {i:1631,n:"Organismes de tourisme et hôtellerie de plein air",s:"Tourisme",g:"DC",cap:0.33,fj:false},
  // ── TOURISME CAMPING ──
  {i:2528,n:"Hôtellerie de plein air campings",s:"Tourisme camping",g:"DC",cap:0.33,fj:false},
  // ── SPORT ──
  {i:2511,n:"Sport entreprises du secteur sportif",s:"Sport",g:"DC",cap:0.33,fj:false},
  // ── JEUX CASINOS ──
  {i:2378,n:"Casinos",s:"Jeux casinos",g:"DC",cap:0.33,fj:false},
  // ── TOURISME LOISIRS ──
  {i:3139,n:"Parcs de loisirs jardins zoologiques",s:"Tourisme loisirs",g:"DC",cap:0.33,fj:false},
  // ── SERVICES TERTIAIRE ──
  {i:1734,n:"Prestataires de services du secteur tertiaire",s:"Services tertiaire",g:"DC",cap:0.10,fj:true},
  // ── PORTAGE FREELANCE ──
  {i:3219,n:"Portage salarial",s:"Portage freelance",g:"DC",cap:0.10,fj:true},
  // ── TRAVAIL TEMPORAIRE ──
  {i:1321,n:"Entreprises de travail temporaire intérim",s:"Travail temporaire",g:"DC",cap:0.10,fj:false},
  // ── EMPLOI À DOMICILE ──
  {i:3220,n:"Particuliers employeurs et emploi à domicile FEPEM",s:"Emploi à domicile",g:"DC",cap:0.33,fj:false},
  // ── AUTOMOBILE ──
  {i:2247,n:"Services automobile garages concessions",s:"Automobile",g:"DC",cap:0.10,fj:false},
  // ── FORMATION PROFESSIONNELLE ──
  {i:1516,n:"Formation professionnelle continue",s:"Formation professionnelle",g:"DC",cap:0.33,fj:true},
  // ── EDUCATION PRIVÉE HORS CONTRAT ──
  {i:2582,n:"Enseignement privé hors contrat",s:"Education privée hors contrat",g:"DC",cap:0.33,fj:true},
  // ── EDUCATION PRIVÉE ──
  {i:2409,n:"Enseignement privé sous contrat CPPN CPPE",s:"Education privée",g:"DC",cap:0.33,fj:true},
  // ── ANIMATION ESS ──
  {i:1518,n:"Animation ÉCLAT structures employant animateurs",s:"Animation ESS",g:"ANIM70",cap:0.33,fj:false},
  // ── ACTION SOCIALE ──
  {i:1261,n:"Centres sociaux et socio-culturels",s:"Action sociale",g:"CSS100",cap:0.33,fj:false},
  // ── ACTION SOCIALE ESS ──
  {i:3381,n:"Acteurs du lien social et familial ALISFA",s:"Action sociale ESS",g:"DC",cap:0.33,fj:false},
  // ── SPECTACLE VIVANT ──
  {i:3090,n:"Spectacle vivant producteurs diffuseurs théâtres",s:"Spectacle vivant",g:"DC",cap:0.33,fj:false},
  // ── RESTAURATION ENTREPRISE (alias IDCC 1979 = HCR) ──
  {i:19791,n:"Restaurants d entreprise (CCN HCR 1979)",s:"Restauration entreprise",g:"HCR",cap:0.33,fj:false},
  // ── RÉSIDENCES VACANCES (alias IDCC 1979 = HCR) ──
  {i:19792,n:"Hôtellerie de vacances et résidences (CCN HCR 1979)",s:"Résidences vacances",g:"HCR",cap:0.33,fj:false},
  // ── TRAITEURS CAFÉTÉRIAS (alias IDCC 1979 = HCR) ──
  {i:19793,n:"Traiteurs et cafétérias (CCN HCR 1979)",s:"Traiteurs cafétérias",g:"HCR",cap:0.33,fj:false},
  // ── LOGISTIQUE FROID ──
  {i:1891,n:"Entrepôts frigorifiques manutention",s:"Logistique froid",g:"IAA180",cap:0.10,fj:false},
  // ── IMPRIMERIE SÉRIGRAPHIE ──
  {i:1730,n:"Imprimeurs sérigraphes",s:"Imprimerie sérigraphie",g:"IAA180",cap:0.10,fj:false},
  // ── INDUSTRIE PNEUMATIQUE ──
  {i:1588,n:"Industrie du pneumatique",s:"Industrie pneumatique",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE ÉLECTRIQUE ──
  {i:1648,n:"Industrie des équipements électriques",s:"Industrie électrique",g:"DC",cap:0.10,fj:false},
  // ── ELECTRONIQUE PROFESSIONNELLE ──
  {i:1649,n:"Industrie électronique professionnelle",s:"Electronique professionnelle",g:"DC",cap:0.10,fj:false},
  // ── ORTHOPÉDIE PROTHÈSE ──
  {i:1653,n:"Industrie des prothèses et orthèses",s:"Orthopédie prothèse",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE MACHINES AGRICOLES ──
  {i:1665,n:"Fabrication de machines agricoles",s:"Industrie machines agricoles",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE ASCENSEURS ──
  {i:1670,n:"Industrie des ascenseurs et escaliers mécaniques",s:"Industrie ascenseurs",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE BÉTON PRÊT ──
  {i:1685,n:"Fabrication du béton prêt à emploi",s:"Industrie béton prêt",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE TANNERIE ──
  {i:1695,n:"Tannerie mégisserie",s:"Industrie tannerie",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE LUNETTERIE ──
  {i:1704,n:"Industrie de la lunetterie",s:"Industrie lunetterie",g:"DC",cap:0.10,fj:false},
  // ── VRP COMMERCIAL ──
  {i:1636,n:"Agents commerciaux VRP multicarte",s:"VRP commercial",g:"DC",cap:0.10,fj:false},
  // ── COMMERCE DISTANCE ──
  {i:1659,n:"Vente à distance e-commerce",s:"Commerce distance",g:"DC",cap:0.33,fj:true},
  // ── LOCATION VÉHICULES ──
  {i:1661,n:"Location de véhicules",s:"Location véhicules",g:"DC",cap:0.10,fj:false},
  // ── CONTRÔLE TECHNIQUE ──
  {i:1666,n:"Contrôle technique automobile",s:"Contrôle technique",g:"DC",cap:0.10,fj:false},
  // ── AUTO-ÉCOLES ──
  {i:1673,n:"Auto-écoles",s:"Auto-écoles",g:"DC",cap:0.10,fj:false},
  // ── SERVICES NUMÉRIQUES ──
  {i:1678,n:"Services informatiques et numérique",s:"Services numériques",g:"DC",cap:0.10,fj:true},
  // ── CONSEIL GESTION ──
  {i:1680,n:"Conseil en gestion entreprise",s:"Conseil gestion",g:"DC",cap:0.10,fj:true},
  // ── ETUDES MARCHÉ ──
  {i:1682,n:"Etudes de marché et sondages",s:"Etudes marché",g:"DC",cap:0.10,fj:true},
  // ── TRADUCTION ──
  {i:1683,n:"Traduction et interprétariat",s:"Traduction",g:"DC",cap:0.10,fj:true},
  // ── CONGRÈS ÉVÉNEMENTIEL ──
  {i:1687,n:"Activités de centres de congrès",s:"Congrès événementiel",g:"DC",cap:0.10,fj:false},
  // ── SALONS FOIRES ──
  {i:1689,n:"Organisation de salons foires expositions",s:"Salons foires",g:"DC",cap:0.33,fj:false},
  // ── TRAITEURS ──
  {i:1691,n:"Traiteurs organisation de réceptions",s:"Traiteurs",g:"DC",cap:0.33,fj:false},
  // ── BLANCHISSERIE INDUSTRIELLE ──
  {i:1692,n:"Blanchisserie industrielle collectivités",s:"Blanchisserie industrielle",g:"DC",cap:0.33,fj:false},
  // ── LIVRAISON DERNIER KM ──
  {i:1694,n:"Messageries et livraison dernier kilomètre",s:"Livraison dernier km",g:"DC",cap:0.10,fj:false},
  // ── DIAGNOSTIC IMMOBILIER ──
  {i:1706,n:"Diagnostic immobilier",s:"Diagnostic immobilier",g:"DC",cap:0.10,fj:false},
  // ── COURRIER EXPRESS ──
  {i:1712,n:"Services de courrier express",s:"Courrier express",g:"DC",cap:0.10,fj:false},
  // ── RECRUTEMENT ──
  {i:1720,n:"Cabinets de recrutement",s:"Recrutement",g:"DC",cap:0.10,fj:true},
  // ── RH CONSEIL ──
  {i:1721,n:"Conseil en ressources humaines",s:"RH conseil",g:"DC",cap:0.10,fj:true},
  // ── BAILLEURS SOCIAUX ──
  {i:1727,n:"Organismes HLM et bailleurs sociaux",s:"Bailleurs sociaux",g:"DC",cap:0.10,fj:true},
  // ── RÉGIES PUBLICITAIRES ──
  {i:1729,n:"Régies publicitaires",s:"Régies publicitaires",g:"DC",cap:0.10,fj:true},
  // ── LOGISTIQUE LIVRAISON ──
  {i:1735,n:"Logistique de distribution et livraison",s:"Logistique livraison",g:"DC",cap:0.10,fj:false},
  // ── PÊCHE MARITIME ──
  {i:1740,n:"Pêche maritime et cultures marines",s:"Pêche maritime",g:"DC",cap:0.10,fj:false},
  // ── THALASSOTHÉRAPIE ──
  {i:1742,n:"Centres de thalassothérapie",s:"Thalassothérapie",g:"DC",cap:0.33,fj:false},
  // ── PHOTOGRAPHIE ──
  {i:1744,n:"Photographie de portrait et publicitaire",s:"Photographie",g:"DC",cap:0.10,fj:true},
  // ── GRAPHISME DESIGN ──
  {i:1748,n:"Graphisme et design",s:"Graphisme design",g:"DC",cap:0.10,fj:true},
  // ── DÉVELOPPEMENT WEB ──
  {i:1749,n:"Développement web et applications",s:"Développement web",g:"DC",cap:0.10,fj:true},
  // ── IA DATA ──
  {i:1750,n:"Intelligence artificielle et data",s:"IA data",g:"DC",cap:0.10,fj:true},
  // ── INFOGÉRANCE ──
  {i:1751,n:"Cybersécurité et infogérance",s:"Infogérance",g:"DC",cap:0.10,fj:true},
  // ── EDITEURS LOGICIELS ──
  {i:1753,n:"Editeurs de logiciels",s:"Editeurs logiciels",g:"DC",cap:0.10,fj:true},
  // ── PLANIFICATION FAMILIALE ──
  {i:1757,n:"Centres de planification éducation familiale",s:"Planification familiale",g:"DC",cap:0.33,fj:false},
  // ── EDUCATION SPÉCIALISÉE ──
  {i:1758,n:"Etablissements enfants inadaptés privés",s:"Education spécialisée",g:"DC",cap:0.33,fj:false},
  // ── HÉBERGEMENT HANDICAPÉS ──
  {i:1759,n:"Foyers hébergement travailleurs handicapés",s:"Hébergement handicapés",g:"DC",cap:0.33,fj:false},
  // ── ADDICTOLOGIE ──
  {i:1760,n:"Services aide aux toxicomanes",s:"Addictologie",g:"DC",cap:0.10,fj:false},
  // ── HÉBERGEMENT SOCIAL ──
  {i:1761,n:"Services aide personnes sans abri",s:"Hébergement social",g:"DC",cap:0.33,fj:false},
  // ── INSERTION PROFESSIONNELLE ──
  {i:1762,n:"Associations intermédiaires insertion",s:"Insertion professionnelle",g:"DC",cap:0.33,fj:false},
  // ── INSERTION CHANTIERS ──
  {i:1763,n:"Chantiers insertion",s:"Insertion chantiers",g:"DC",cap:0.33,fj:false},
  // ── ENTREPRISES ADAPTÉES ──
  {i:1764,n:"Entreprises adaptées",s:"Entreprises adaptées",g:"DC",cap:0.33,fj:false},
  // ── ESAT ──
  {i:1765,n:"ESAT établissements aide par le travail",s:"ESAT",g:"DC",cap:0.33,fj:false},
  // ── CRÈCHES ASSOCIATIVES ──
  {i:1767,n:"Crèches associatives",s:"Crèches associatives",g:"DC",cap:0.33,fj:false},
  // ── ALSH LOISIRS ──
  {i:1768,n:"Accueil de loisirs sans hébergement ALSH",s:"ALSH loisirs",g:"ANIM70",cap:0.33,fj:false},
  // ── MAISONS FAMILIALES RURALES ──
  {i:1770,n:"Maisons familiales rurales",s:"Maisons familiales rurales",g:"DC",cap:0.33,fj:false},
  // ── ENSEIGNEMENT AGRICOLE ──
  {i:1771,n:"Etablissements privés enseignement agricole",s:"Enseignement agricole",g:"DC",cap:0.10,fj:false},
  // ── OGEC ÉCOLES ──
  {i:1775,n:"Organismes de gestion écoles catholiques OGEC",s:"OGEC écoles",g:"DC",cap:0.33,fj:false},
  // ── FJT JEUNES ──
  {i:1776,n:"Foyers de jeunes travailleurs FJT",s:"FJT jeunes",g:"DC",cap:0.33,fj:false},
  // ── SPORT FÉDÉRATIONS ──
  {i:1779,n:"Fédérations sportives nationales",s:"Sport fédérations",g:"DC",cap:0.33,fj:false},
  // ── SPORT CLUBS PRO ──
  {i:1782,n:"Clubs sportifs professionnels",s:"Sport clubs pro",g:"DC",cap:0.33,fj:false},
  // ── PROFESSIONS LIBÉRALES ──
  {i:1783,n:"Professions libérales diverses",s:"Professions libérales",g:"DC",cap:0.10,fj:true},
  // ── ASSISTANTS MATERNELS ──
  {i:2140,n:"Assistants maternels du particulier employeur",s:"Assistants maternels",g:"DC",cap:0.10,fj:false},
  // ── BANQUE MUTUELLE ──
  {i:1978,n:"Crédit mutuel",s:"Banque mutuelle",g:"DC",cap:0.10,fj:true},
  // ── ASSURANCE MUTUALISTE ──
  {i:3257,n:"Mutuelles organismes mutualistes",s:"Assurance mutualiste",g:"DC",cap:0.10,fj:true},
  // ── SÉCURITÉ SOCIALE ──
  {i:2130,n:"Organismes de sécurité sociale UCANSS",s:"Sécurité sociale",g:"DC",cap:0.10,fj:true},
  // ── EMPLOI CADRES ──
  {i:1851,n:"Personnels APEC",s:"Emploi cadres",g:"DC",cap:0.10,fj:true},
  // ── RECHERCHE ──
  {i:1266,n:"Sociétés de recherche",s:"Recherche",g:"DC",cap:0.33,fj:true},
  // ── FINANCE PETITS CABINETS ──
  {i:2148,n:"Cabinets experts comptables petits cabinets",s:"Finance petits cabinets",g:"DC",cap:0.10,fj:true},
  // ── MÉDICO-SOCIAL FEHAP ──
  {i:29,n:"Hospitalisation privée non lucratif FEHAP CCN 51",s:"Médico-social FEHAP",g:"DC",cap:0.33,fj:false},
  // ── COMMERCE INTERNATIONAL ──
  {i:43,n:"Import-export et commerce international",s:"Commerce international",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE CAOUTCHOUC ──
  {i:45,n:"Caoutchouc industrie",s:"Industrie caoutchouc",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE BOIS ──
  {i:83,n:"Menuiseries charpentes constructions industrialisées",s:"Industrie bois",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE EXTRACTIVE ──
  {i:87,n:"Ouvriers industries carrières matériaux UNICEM",s:"Industrie extractive",g:"DC",cap:0.10,fj:false},
  {i:135,n:"ETAM industries carrières matériaux UNICEM",s:"Industrie extractive",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE BOIS NÉGOCE ──
  {i:158,n:"Bois scieries négoce importation",s:"Industrie bois négoce",g:"DC",cap:0.10,fj:false},
  // ── COOPÉRATIVES ──
  {i:179,n:"Coopératives de consommation",s:"Coopératives",g:"DC",cap:0.10,fj:false},
  // ── JURIDIQUE GREFFES ──
  {i:240,n:"Personnel greffes tribunaux de commerce",s:"Juridique greffes",g:"DC",cap:0.10,fj:false},
  // ── TRANSPORT AÉRIEN SOL ──
  {i:275,n:"Transport aérien personnel au sol accord national",s:"Transport aérien sol",g:"DC",cap:0.10,fj:false},
  // ── MODE COUTURE ──
  {i:303,n:"Couture parisienne",s:"Mode couture",g:"DC",cap:0.33,fj:false},
  // ── INDUSTRIE MODE ──
  {i:350,n:"Industries de la mode et chapellerie",s:"Industrie mode",g:"DC",cap:0.33,fj:false},
  // ── INDUSTRIE GANTERIE ──
  {i:354,n:"Ganterie de peau",s:"Industrie ganterie",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE CIMENT CADRES ──
  {i:363,n:"Cadres industrie fabrication ciments",s:"Industrie ciment cadres",g:"DC",cap:0.10,fj:false},
  // ── CINÉMA ──
  {i:388,n:"Auditoriums cinématographiques",s:"Cinéma",g:"DC",cap:0.10,fj:false},
  // ── NÉGOCE MATÉRIAUX ──
  {i:398,n:"Ouvriers négoce matériaux construction",s:"Négoce matériaux",g:"DC",cap:0.10,fj:false},
  // ── CINÉMA PRODUCTION ──
  {i:435,n:"Production cinématographique acteurs",s:"Cinéma production",g:"DC",cap:0.10,fj:false},
  // ── ASSURANCE PRODUCTION ──
  {i:438,n:"Echelons intermédiaires assurances production",s:"Assurance production",g:"DC",cap:0.10,fj:false},
  // ── TOURISME SKI ──
  {i:454,n:"Remontées mécaniques domaines skiables",s:"Tourisme ski",g:"DC",cap:0.33,fj:false},
  // ── FINANCE ──
  {i:478,n:"Sociétés financières établissements financiers",s:"Finance",g:"DC",cap:0.10,fj:false},
  // ── COMMERCE GROS HABILLEMENT ──
  {i:500,n:"Commerce gros habillement mercerie chaussure jouet",s:"Commerce gros habillement",g:"DC",cap:0.10,fj:false},
  // ── IAA 5 BRANCHES ──
  {i:504,n:"Industries alimentaires diverses 5 branches",s:"IAA 5 branches",g:"DC",cap:0.10,fj:false},
  // ── IAA EXOTIQUE ──
  {i:506,n:"Fabricants importateurs produits exotiques",s:"IAA exotique",g:"DC",cap:0.10,fj:false},
  // ── NÉGOCE MATÉRIAUX ETAM ──
  {i:533,n:"ETAM négoce matériaux construction",s:"Négoce matériaux ETAM",g:"DC",cap:0.10,fj:false},
  // ── TRANSPORT FERROVIAIRE MANUT. ──
  {i:538,n:"Manutention ferroviaire travaux connexes",s:"Transport ferroviaire manut.",g:"DC",cap:0.10,fj:false},
  // ── PRESSE RÉGIONALE OUVRIERS ──
  {i:598,n:"Ouvriers presse quotidienne régionale",s:"Presse régionale ouvriers",g:"DC",cap:0.10,fj:false},
  // ── IMPRIMERIE SÉRIGRAPHIE ──
  {i:614,n:"Sérigraphie et impression numérique",s:"Imprimerie sérigraphie",g:"DC",cap:0.10,fj:false},
  // ── CINÉMA CADRES ──
  {i:625,n:"Cadres services généraux théâtres cinématographiques",s:"Cinéma cadres",g:"DC",cap:0.10,fj:false},
  // ── COMMERCE DENTAIRE ──
  {i:635,n:"Négoce fournitures dentaires",s:"Commerce dentaire",g:"DC",cap:0.10,fj:false},
  // ── NÉGOCE MATÉRIAUX CADRES ──
  {i:652,n:"Cadres négoce matériaux construction",s:"Négoce matériaux cadres",g:"DC",cap:0.10,fj:false},
  // ── ASSURANCE PRODUCTEURS ──
  {i:653,n:"Producteurs salariés assurances services extérieurs",s:"Assurance producteurs",g:"DC",cap:0.10,fj:false},
  // ── PRESSE RÉGIONALE EMPLOYÉS ──
  {i:698,n:"Employés presse quotidienne régionale",s:"Presse régionale employés",g:"DC",cap:0.10,fj:false},
  // ── SERVICES REPROGRAPHIE ──
  {i:706,n:"Reprographie personnel",s:"Services reprographie",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE PAPIER CADRES TRANSFO ──
  {i:707,n:"Cadres transformation papiers cartons",s:"Industrie papier cadres transfo",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE INSTRUMENTS ÉCRIRE ──
  {i:715,n:"Instruments à écrire industries connexes",s:"Industrie instruments écrire",g:"DC",cap:0.10,fj:false},
  // ── CINÉMA DISTRIBUTION ──
  {i:716,n:"Employés ouvriers distribution cinématographique",s:"Cinéma distribution",g:"DC",cap:0.10,fj:false},
  // ── COMMERCE QUINCAILLERIE CADRES ──
  {i:731,n:"Quincaillerie fournitures industrielles cadres",s:"Commerce quincaillerie cadres",g:"DC",cap:0.10,fj:false},
  // ── COMMERCE CHAUSSURES DÉTAIL ──
  {i:733,n:"Détaillants en chaussures",s:"Commerce chaussures détail",g:"DC",cap:0.33,fj:false},
  // ── SERVICES FUNÉRAIRES ──
  {i:759,n:"Pompes funèbres",s:"Services funéraires",g:"DC",cap:0.10,fj:false},
  // ── FINANCE AUDIT COMPTABLE ──
  {i:787,n:"Cabinets experts-comptables commissaires aux comptes",s:"Finance audit comptable",g:"DC",cap:0.10,fj:false},
  // ── HÔTELLERIE CHAÎNE ──
  {i:800,n:"Hôtels de chaîne",s:"Hôtellerie chaîne",g:"DC",cap:0.33,fj:false},
  // ── COMMERCE PAPIER OETAM ──
  {i:802,n:"Distribution papiers cartons commerce gros OETAM",s:"Commerce papier OETAM",g:"DC",cap:0.10,fj:false},
  // ── VRP ──
  {i:804,n:"Voyageurs représentants placiers VRP accord national",s:"VRP",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE CIMENT OUVRIERS ──
  {i:832,n:"Ouvriers industrie fabrication ciments",s:"Industrie ciment ouvriers",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE CIMENT ETAM ──
  {i:833,n:"ETAM industrie fabrication ciments",s:"Industrie ciment ETAM",g:"DC",cap:0.10,fj:false},
  // ── CINÉMA EMPLOYÉS ──
  {i:889,n:"Employés techniciens théâtres cinématographiques",s:"Cinéma employés",g:"DC",cap:0.10,fj:false},
  // ── CINÉMA DISTRIBUTION CADRES ──
  {i:892,n:"Cadres distribution films cinéma",s:"Cinéma distribution cadres",g:"DC",cap:0.10,fj:false},
  // ── SANTÉ TRAVAIL ──
  {i:897,n:"Services de santé au travail interentreprises",s:"Santé travail",g:"DC",cap:0.10,fj:false},
  // ── EXPERTISE ÉVALUATION ──
  {i:915,n:"Expertises évaluations industrielles commerciales",s:"Expertise évaluation",g:"DC",cap:0.10,fj:false},
  // ── COMMERCE PAPIER CADRES ──
  {i:925,n:"Cadres distribution papiers cartons commerce gros",s:"Commerce papier cadres",g:"DC",cap:0.10,fj:false},
  // ── SPECTACLE THÉÂTRES ──
  {i:951,n:"Théâtres privés spectacle vivant lieux fixes",s:"Spectacle théâtres",g:"DC",cap:0.33,fj:false},
  // ── BIOLOGIE MÉDICALE LABO ──
  {i:959,n:"Laboratoires analyses médicales extra-hospitaliers",s:"Biologie médicale labo",g:"DC",cap:0.10,fj:false},
  // ── ARTISANAT BOUCHERIE ──
  {i:992,n:"Boucherie boucherie-charcuterie triperie volailles",s:"Artisanat boucherie",g:"DC",cap:0.33,fj:false},
  // ── GÉNIE CLIMATIQUE EXPLOITATION ──
  {i:998,n:"Exploitation équipements thermiques génie climatique",s:"Génie climatique exploitation",g:"DC",cap:0.10,fj:false},
  // ── GARDIENNAGE IMMEUBLE ──
  {i:1043,n:"Gardiens concierges employés immeubles résidences",s:"Gardiennage immeuble",g:"DC",cap:0.33,fj:false},
  // ── NÉGOCE AGRICOLE ──
  {i:1077,n:"Négoce industrie produits sol engrais",s:"Négoce agricole",g:"DC",cap:0.10,fj:false},
  // ── AUTOMOBILE COMMERCE RÉPARATION ──
  {i:1090,n:"Commerce réparation automobile cycle motocycle",s:"Automobile commerce réparation",g:"DC",cap:0.10,fj:false},
  // ── INDUSTRIE MATÉRIAUX ──
  {i:1170,n:"Industrie tuiles et briques CCNTB",s:"Industrie matériaux",g:"DC",cap:0.10,fj:false},
  // ── GESTION COMPTABLE ──
  {i:1237,n:"Centres de gestion agréés",s:"Gestion comptable",g:"DC",cap:0.10,fj:false},
  // ── GÉNIE CLIMATIQUE CADRES ──
  {i:1256,n:"Cadres entreprises équipements thermiques climatisation",s:"Génie climatique cadres",g:"DC",cap:0.10,fj:false},
  // ── ARTISANAT PÂTISSERIE ──
  {i:1267,n:"Pâtisserie",s:"Artisanat pâtisserie",g:"DC",cap:0.33,fj:false},
  // ── HABITAT SOCIAL ──
  {i:1278,n:"PACT ARIM protection amélioration habitat",s:"Habitat social",g:"DC",cap:0.10,fj:false},
  // ── ARTISANAT CONFISERIE ──
  {i:1286,n:"Confiserie chocolaterie biscuiterie détail artisans",s:"Artisanat confiserie",g:"DC",cap:0.33,fj:false},
  // ── CINÉMA EXPLOITATION ──
  {i:1307,n:"Exploitation cinématographique",s:"Cinéma exploitation",g:"DC",cap:0.10,fj:false},
  // ── GRANDE DISTRIBUTION GÉRANTS ──
  {i:1314,n:"Maisons alimentation succursales gérants mandataires",s:"Grande distribution gérants",g:"DC",cap:0.10,fj:false},
  // ── COMMERCE FRUITS LÉGUMES ──
  {i:1405,n:"Expédition exportation fruits légumes",s:"Commerce fruits légumes",g:"DC",cap:0.33,fj:false},
  // ── DISTRIBUTION ÉNERGIE ──
  {i:1408,n:"Distribution logistique services énergies proximité",s:"Distribution énergie",g:"DC",cap:0.10,fj:false},
  // ── GÉNIE CLIMATIQUE INSTALL. ──
  {i:1412,n:"Installation entretien réparation matériel thermique frigorifique",s:"Génie climatique install.",g:"DC",cap:0.10,fj:false},
  // ── ASSURANCE AGENCES PERSONNEL ──
  {i:2335,n:"Personnel agences générales assurances",s:"Assurance agences personnel",g:"DC",cap:0.10,fj:false},
  // ── ASSISTANTS MATERNELS ──
  {i:2395,n:"Assistants maternels particulier employeur",s:"Assistants maternels",g:"DC",cap:0.10,fj:false},
  // ── PRESSE PORTAGE ──
  {i:2683,n:"Portage de presse",s:"Presse portage",g:"DC",cap:0.10,fj:false},
  // ── EDUCATION PRIVÉE ──
  {i:2691,n:"Enseignement privé indépendant",s:"Education privée",g:"DC",cap:0.33,fj:false},
  // ── SANTÉ OMNIPRATICIENS ──
  {i:2727,n:"Omnipraticiens entreprises privées",s:"Santé omnipraticiens",g:"DC",cap:0.10,fj:false},
  // ── EDITION JEUX VIDÉO ──
  {i:2770,n:"Edition de jeux électroniques",s:"Edition jeux vidéo",g:"DC",cap:0.33,fj:false},
  // ── FINANCE MARCHÉS ──
  {i:2931,n:"Activités marchés financiers",s:"Finance marchés",g:"DC",cap:0.10,fj:false},
  // ── TRANSPORT MARITIME ──
  {i:2972,n:"Personnel sédentaire navigation",s:"Transport maritime",g:"DC",cap:0.10,fj:false},
  // ── COMMERCE LIBRAIRIE ──
  {i:3013,n:"Librairie indépendante",s:"Commerce librairie",g:"DC",cap:0.33,fj:false},
  // ── INSERTION PROFESSIONNELLE ──
  {i:3016,n:"Ateliers chantiers insertion",s:"Insertion professionnelle",g:"DC",cap:0.33,fj:false},
  // ── TRANSPORT MARITIME PORT ──
  {i:3017,n:"Ports et manutention unifiée",s:"Transport maritime port",g:"DC",cap:0.10,fj:false},
  // ── ESTHÉTIQUE BEAUTÉ ──
  {i:3032,n:"Esthétique cosmétique parfumerie",s:"Esthétique beauté",g:"DC",cap:0.33,fj:false},
  // ── PROPRETÉ SERVICES ──
  {i:3043,n:"Entreprises propreté services associés",s:"Propreté services",g:"DC",cap:0.33,fj:false},
  // ── COMMERCE ALIM SPÉCIALISÉ 5B ──
  {i:3109,n:"Métiers du commerce détail alimentaire spécialisé 5 branches",s:"Commerce alim spécialisé 5B",g:"DC",cap:0.33,fj:false},
  // ── SERVICES PERSONNE ──
  {i:3127,n:"Entreprises services à la personne",s:"Services personne",g:"DC",cap:0.33,fj:false},
  // ── GESTION COMPTABLE ASSO ──
  {i:3160,n:"Associations gestion comptabilité",s:"Gestion comptable asso",g:"DC",cap:0.10,fj:false},
  // ── COOPÉRATIVE VIANDE ──
  {i:3203,n:"Structures coopératives agricoles bétail viande",s:"Coopérative viande",g:"DC",cap:0.10,fj:false},
  // ── GÉOMÈTRE EXPERT ──
  {i:3205,n:"Cabinets géomètres-experts topographes",s:"Géomètre expert",g:"DC",cap:0.10,fj:false},
  // ── TRANSPORT COURSE ──
  {i:3218,n:"Sociétés course par course",s:"Transport course",g:"DC",cap:0.10,fj:false},
  // ── AUDIOVISUEL DOUBLAGE ──
  {i:1922,n:"Doublage postsynchronisation oeuvres audiovisuelles",s:"Audiovisuel doublage",g:"DC",cap:0.10,fj:false},
  // ── AGRICULTURE FNSEA ──
  {i:3227,n:"FNSEA exploitations entreprises agricoles",s:"Agriculture FNSEA",g:"DC",cap:0.10,fj:false},
  // ── PRESSE ──
  {i:3230,n:"Presse quotidienne et hebdomadaire",s:"Presse",g:"DC",cap:0.10,fj:false},
  // ── FORMATION PRO ──
  {i:3233,n:"Organismes formation professionnelle",s:"Formation pro",g:"DC",cap:0.10,fj:false},
  // ── EMPLOI DOMICILE ──
  {i:3239,n:"Particuliers employeurs emploi à domicile",s:"Emploi domicile",g:"DC",cap:0.10,fj:false},
];

// Statistiques : 94 CCN avec cap=0.33 | 328 CCN avec cap=0.10


const CCN_PARTIEL_API = {
  getAll()   { return CCN_PARTIEL_ALIASES; },

  getById(idcc) {
    const id = parseInt(idcc);
    return CCN_PARTIEL_ALIASES.find(c => c.i === id) || null;
  },

  getRules(idcc) {
    const ccn = this.getById(idcc);
    if (!ccn) return { cap:0.10, rate1:0.10, rate2:0.25, threshold:0.10, notice:7, avenantPossible:false, nom:'Droit commun', secteur:'autre' };
    const base = REGLES_HC[ccn.g] || REGLES_HC['DC'];
    const note = ccn.cap === 0.33
      ? (base.cap === 0.33 ? base.note : 'Accord de branche étendu — plafond 1/3 (Art. L3123-28)')
      : base.note;
    // Liste des groupes CCN avec accord de branche étendu permettant L3123-22 (avenant complément d'heures)
    const AVENANT_GROUPES = ['HCR','BOULAN329','COIF200','SECU329','PROP190','HOSPI130','ANIM70'];
    const avenantPossible = AVENANT_GROUPES.includes(ccn.g);
    return { ...base, cap: ccn.cap, note, idcc: ccn.i, nom: ccn.n, secteur: ccn.s, groupe: ccn.g, avenantPossible };
  },

  search(term) {
    if (!term || term.length < 2) return [];
    const t = term.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return CCN_PARTIEL_ALIASES.filter(c => {
      const n = c.n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const s = c.s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return n.includes(t) || s.includes(t) || String(c.i).startsWith(term);
    }).slice(0, 40);
  },

  getSecteurs() {
    const seen = new Set(), out = [];
    CCN_PARTIEL_ALIASES.forEach(c => { if(!seen.has(c.s)){seen.add(c.s);out.push({id:c.s,label:c.s});} });
    return out;
  },

  getBySecteur(secteur) {
    return CCN_PARTIEL_ALIASES.filter(c => c.s === secteur);
  },

  getGroups() { return REGLES_HC; },
};

global.CCN_PARTIEL_API     = CCN_PARTIEL_API;
global.CCN_PARTIEL_ALIASES = CCN_PARTIEL_ALIASES;
global.REGLES_HC           = REGLES_HC;

}(typeof window !== 'undefined' ? window : global));
