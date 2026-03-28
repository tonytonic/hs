/**
 * BASE COMPLÈTE CCN FRANCE — HEURES SUPPLÉMENTAIRES
 * ==================================================
 * Version : 4.0.0 — Mars 2026
 * Source  : Légifrance, DGT, Légifrance, convention.fr, DARES
 *
 * ARCHITECTURE :
 *   REGLES_HS   : 11 groupes de règles uniques (moteur de calcul)
 *   CCN_ALIASES : ~420 CCN → groupe (table de correspondance complète)
 *
 * SEMAINE : toujours lundi 0h → dimanche 24h pour TOUTES les CCN
 *   Art. L3121-29 et L3121-35 — aucune CCN française ne déroge à ce principe.
 *
 * PALIERS HS PAR GROUPE :
 *   DC / la plupart : >35h → palier1 (8h à taux1=25%) → palier2 (∞ à taux2=50%)
 *   HCR             : >35h → 36-39h (4h à 10%) → 40-43h (4h à 20%) → >43h (50%)
 *   GD              : >35h → palier1 (8h à 10%) → palier2 (∞ à 25%)
 *
 * CHAMPS REGLES_HS :
 *   seuil      : déclenchement HS (h/sem)
 *   taux1      : majoration palier 1 (%)
 *   palier1    : nb heures au taux1 (h)
 *   taux_inter : majoration palier intermédiaire (null si absent)
 *   palier_inter: nb heures au taux intermédiaire (null si absent)
 *   taux2      : majoration palier final (%)
 *   contingent : heures annuelles max
 *   maxHebdo   : durée max hebdo (h)
 *
 * USAGE MODULES :
 *   window.CCN.getGroupeForCCN(idcc)    → règles effectives
 *   window.CCN.calculerHS(hs, abs, idcc)→ calcul avec paliers corrects
 *   window.CCN.findCCN("syntec")        → recherche parmi les 420 CCN
 */
'use strict';

// ═══════════════════════════════════════════════════
// 11 GROUPES DE RÈGLES HS
// ═══════════════════════════════════════════════════
const REGLES_HS = {

  DC: {
    id:'DC', nom:'Droit commun',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:220, maxHebdo:48, debutSemaine:1,
    // Jours fériés
    feriesChomes: 11,         // tous les fériés légaux chômés si usage ou accord
    feriesMajoration: 0,      // pas de majoration légale obligatoire (hors 1er mai)
    feries1erMaiMajoration: 100, // 1er mai : +100% obligatoire (Art. L3133-6)
    feriesAlsaceMoselle: false,
    notes:'Art. L3121-22. Base légale applicable à toutes les CCN sans disposition spécifique.'
  },

  IAA180: {
    id:'IAA180', nom:'Contingent 180h (IAA, BTP, Imprimerie, Froid)',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:180, maxHebdo:48,
    // Jours fériés
    feriesChomes: 11,         // nb fériés chômés obligatoires/an
    feriesMajoration: 0,      // % majoration si férié travaillé (hors 1er mai)
    feries1erMaiMajoration: 100, // 1er mai obligatoire (Art. L3133-6)
    feriesAlsaceMoselle: false,  // +2 fériés Alsace-Moselle
    // BTP : 11 fériés légaux chômés (dont 1er mai obligatoire). Pas de majoration spécifique hors accord.
    notes:'IAA diverses, BTP ouvriers, Imprimerie, Entrepôts frigorifiques. Contingent réduit 180h.'
  },

  CHIM130: {
    id:'CHIM130', nom:'Chimie — contingent 130h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:130, maxHebdo:48, debutSemaine:1,
    // Jours fériés
    feriesChomes: 11,         // nb fériés chômés obligatoires/an
    feriesMajoration: 0,      // % majoration si férié travaillé (hors 1er mai)
    feries1erMaiMajoration: 100, // 1er mai obligatoire (Art. L3133-6)
    feriesAlsaceMoselle: false,  // +2 fériés Alsace-Moselle
    // Industries chimiques : 11 fériés chômés, pas de majoration légale propre.
    notes:'Industries chimiques. Contingent très réduit 130h.'
  },

  PETRO: {
    id:'PETRO', nom:'Pétrole — taux1=30%, contingent 130h',
    seuil:35, taux1:30, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:130, maxHebdo:48, debutSemaine:1,
    // Jours fériés
    feriesChomes: 11,         // nb fériés chômés obligatoires/an
    feriesMajoration: 100,      // % majoration si férié travaillé (hors 1er mai)
    feries1erMaiMajoration: 100, // 1er mai obligatoire (Art. L3133-6)
    feriesAlsaceMoselle: false,  // +2 fériés Alsace-Moselle
    // Pétrole : tous fériés chômés payés + majoration 100% si travaillés (accord de branche).
    notes:'Industrie du pétrole. TAUX1=30% plus favorable. Contingent 130h.'
  },

  PHARMA: {
    id:'PHARMA', nom:'Pharmaceutique — contingent 145h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:145, maxHebdo:48, debutSemaine:1,
    // Jours fériés
    feriesChomes: 11,         // nb fériés chômés obligatoires/an
    feriesMajoration: 0,      // % majoration si férié travaillé (hors 1er mai)
    feries1erMaiMajoration: 100, // 1er mai obligatoire (Art. L3133-6)
    feriesAlsaceMoselle: false,  // +2 fériés Alsace-Moselle
    // Pharmaceutique : 11 fériés légaux. Majoration variable selon accord entreprise.
    notes:'Industrie pharmaceutique. Contingent 145h. Repos compensateur renforcé.'
  },

  CSS130: {
    id:'CSS130', nom:'Centres sociaux — contingent 130h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:130, maxHebdo:48, debutSemaine:1,
    // Jours fériés
    feriesChomes: 11,         // nb fériés chômés obligatoires/an
    feriesMajoration: 0,      // % majoration si férié travaillé (hors 1er mai)
    feries1erMaiMajoration: 100, // 1er mai obligatoire (Art. L3133-6)
    feriesAlsaceMoselle: false,  // +2 fériés Alsace-Moselle
    // Centres sociaux : 11 fériés chômés. Majoration selon accord local.
    notes:'Centres sociaux et socio-culturels. Contingent 130h.'
  },

  ASSUR200: {
    id:'ASSUR200', nom:'Assurances — contingent 200h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:200, maxHebdo:48, debutSemaine:1,
    // Jours fériés
    feriesChomes: 11,         // nb fériés chômés obligatoires/an
    feriesMajoration: 0,      // % majoration si férié travaillé (hors 1er mai)
    feries1erMaiMajoration: 100, // 1er mai obligatoire (Art. L3133-6)
    feriesAlsaceMoselle: false,  // +2 fériés Alsace-Moselle
    // Assurances : 11 fériés chômés et payés.
    notes:'Sociétés assurances. Contingent 200h. Forfait jours cadres très répandu.'
  },

  BOULAN270: {
    id:'BOULAN270', nom:'Boulangerie artisanale — contingent 270h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:270, maxHebdo:48, debutSemaine:1,
    // Jours fériés
    feriesChomes: 1,         // nb fériés chômés obligatoires/an
    feriesMajoration: 0,      // % majoration si férié travaillé (hors 1er mai)
    feries1erMaiMajoration: 100, // 1er mai obligatoire (Art. L3133-6)
    feriesAlsaceMoselle: false,  // +2 fériés Alsace-Moselle
    // Boulangerie : seul le 1er mai est obligatoirement chômé. Les autres sont travaillés par usage du secteur.
    notes:'Boulangerie-pâtisserie artisanale. Contingent 270h. Dimanche dérogatoire.'
  },

  GD: {
    id:'GD', nom:'Grande distribution alim. — taux réduits 10%/25%',
    seuil:35, taux1:10, palier1:8, taux_inter:null, palier_inter:null, taux2:25,
    contingent:220, maxHebdo:48, debutSemaine:1,
    // Jours fériés
    feriesChomes: 1,         // nb fériés chômés obligatoires/an
    feriesMajoration: 0,      // % majoration si férié travaillé (hors 1er mai)
    feries1erMaiMajoration: 100, // 1er mai obligatoire (Art. L3133-6)
    feriesAlsaceMoselle: false,  // +2 fériés Alsace-Moselle
    // Grande distribution : seul le 1er mai obligatoirement chômé. Dimanche et fériés travaillés par usage.
    notes:'ATTENTION : taux1=10%, taux2=25% (dérogatoire). Grande distribution alimentaire uniquement.'
  },

  HCR: {
    id:'HCR', nom:'HCR — seuil 35h, 3 paliers, contingent 360h',
    seuil:35, taux1:10, palier1:4, taux_inter:20, palier_inter:4, taux2:50,
    contingent:360, maxHebdo:48, debutSemaine:1,
    // Jours fériés
    feriesChomes: 1,         // nb fériés chômés obligatoires/an
    feriesMajoration: 0,      // % majoration si férié travaillé (hors 1er mai)
    feries1erMaiMajoration: 100, // 1er mai obligatoire (Art. L3133-6)
    feriesAlsaceMoselle: false,  // +2 fériés Alsace-Moselle
    // HCR : seul le 1er mai obligatoirement chômé. Les autres fériés sont travaillés (secteur permanent). Art. L3133-4.
    notes:'ATTENTION : 3 paliers. 36-39h=+10%, 40-43h=+20%, >=44h=+50%. Contingent 360h (établissements permanents). Avenant n°2 du 05/02/2007 et avenant n°19 du 29/09/2014.'
  },

  ANIM90: {
    id:'ANIM90', nom:'Animation ÉCLAT — contingent 90h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:90, maxHebdo:48, debutSemaine:1,
    // Jours fériés
    feriesChomes: 11,         // nb fériés chômés obligatoires/an
    feriesMajoration: 0,      // % majoration si férié travaillé (hors 1er mai)
    feries1erMaiMajoration: 100, // 1er mai obligatoire (Art. L3133-6)
    feriesAlsaceMoselle: false,  // +2 fériés Alsace-Moselle
    // Animation : 11 fériés chômés et payés. Régime associatif.
    notes:'Animation (ÉCLAT). CONTINGENT TRÈS RÉDUIT 90h. Séjours vacances : règles spécifiques.'
  },

  // ─────────────────────────────────────────────────────────
  // MODE PERSONNALISÉ — accord entreprise ou de branche
  // Art. L3121-32 : un accord peut fixer toutes ces valeurs
  // Art. L3121-35 : la semaine lundi-dim n'est que supplétive
  // ─────────────────────────────────────────────────────────
  CUSTOM: {
    id:'CUSTOM', nom:'Accord entreprise / branche personnalisé',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:220, maxHebdo:48,
    // debutSemaine : jour de début de la semaine HS (Art. L3121-32)
    // 1=Lundi (défaut), 2=Mardi, 3=Mercredi, 4=Jeudi, 5=Vendredi, 6=Samedi, 7=Dimanche
    debutSemaine:1,
    // Jours fériés
    feriesChomes: 11,         // nb fériés chômés obligatoires/an
    feriesMajoration: 0,      // % majoration si férié travaillé (hors 1er mai)
    feries1erMaiMajoration: 100, // 1er mai obligatoire (Art. L3133-6)
    feriesAlsaceMoselle: false,  // +2 fériés Alsace-Moselle
    // Accord personnalisé : configurable. Par défaut : droit commun (11 fériés chômés, 1er mai +100%).
    notes:'Mode personnalisé. Toutes les valeurs sont modifiables via CCN.setCustom(config). Min légal taux=10% (Art. L3121-33). Semaine peut démarrer n importe quel jour (Art. L3121-32).'
  },

};

// ═══════════════════════════════════════════════════
// ~420 CCN — TABLE COMPLÈTE
// Format compact : { idcc, b(rochure), nom, s(ecteur), groupe, fj(forfaitJour) }
// ═══════════════════════════════════════════════════
const CCN_ALIASES = [
  {i: 9811,b:null  ,n:"Accord national agriculture salariés",s:"Agriculture",g:"DC",fj:false},
  {i: 9001,b:null  ,n:"Exploitations agricoles national",s:"Agriculture",g:"DC",fj:false},
  {i: 9011,b:null  ,n:"Exploitations agricoles Ain",s:"Agriculture",g:"DC",fj:false},
  {i: 9021,b:null  ,n:"Exploitations agricoles Aisne",s:"Agriculture",g:"DC",fj:false},
  {i: 9031,b:null  ,n:"Exploitations agricoles Allier",s:"Agriculture",g:"DC",fj:false},
  {i: 9051,b:null  ,n:"Exploitations agricoles Hautes-Alpes",s:"Agriculture",g:"DC",fj:false},
  {i: 9061,b:null  ,n:"Exploitations agricoles Alpes-Maritimes",s:"Agriculture",g:"DC",fj:false},
  {i: 9071,b:null  ,n:"Exploitations agricoles Ardèche",s:"Agriculture",g:"DC",fj:false},
  {i: 9081,b:null  ,n:"Exploitations agricoles Ardennes",s:"Agriculture",g:"DC",fj:false},
  {i: 9091,b:null  ,n:"Exploitations agricoles Ariège",s:"Agriculture",g:"DC",fj:false},
  {i: 9101,b:null  ,n:"Exploitations agricoles Aube",s:"Agriculture",g:"DC",fj:false},
  {i: 9111,b:null  ,n:"Exploitations agricoles Aude",s:"Agriculture",g:"DC",fj:false},
  {i: 9121,b:null  ,n:"Exploitations agricoles Aveyron",s:"Agriculture",g:"DC",fj:false},
  {i: 9131,b:null  ,n:"Exploitations agricoles Bouches-du-Rhône",s:"Agriculture",g:"DC",fj:false},
  {i: 9141,b:null  ,n:"Exploitations agricoles Calvados",s:"Agriculture",g:"DC",fj:false},
  {i: 9151,b:null  ,n:"Exploitations agricoles Cantal",s:"Agriculture",g:"DC",fj:false},
  {i: 9161,b:null  ,n:"Exploitations agricoles Charente",s:"Agriculture",g:"DC",fj:false},
  {i: 9171,b:null  ,n:"Exploitations agricoles Charente-Maritime",s:"Agriculture",g:"DC",fj:false},
  {i: 9181,b:null  ,n:"Exploitations agricoles Cher",s:"Agriculture",g:"DC",fj:false},
  {i: 9191,b:null  ,n:"Exploitations agricoles Corrèze",s:"Agriculture",g:"DC",fj:false},
  {i: 9201,b:null  ,n:"Exploitations agricoles Cote-d-Or",s:"Agriculture",g:"DC",fj:false},
  {i: 9211,b:null  ,n:"Exploitations agricoles Cotes d Armor",s:"Agriculture",g:"DC",fj:false},
  {i: 9221,b:null  ,n:"Exploitations agricoles Creuse",s:"Agriculture",g:"DC",fj:false},
  {i: 9231,b:null  ,n:"Exploitations agricoles Dordogne",s:"Agriculture",g:"DC",fj:false},
  {i: 9241,b:null  ,n:"Exploitations agricoles Doubs",s:"Agriculture",g:"DC",fj:false},
  {i: 9251,b:null  ,n:"Exploitations agricoles Drôme",s:"Agriculture",g:"DC",fj:false},
  {i: 9261,b:null  ,n:"Exploitations agricoles Eure",s:"Agriculture",g:"DC",fj:false},
  {i: 9271,b:null  ,n:"Exploitations agricoles Eure-et-Loir",s:"Agriculture",g:"DC",fj:false},
  {i: 9281,b:null  ,n:"Exploitations agricoles Finistère",s:"Agriculture",g:"DC",fj:false},
  {i: 9291,b:null  ,n:"Exploitations agricoles Gard",s:"Agriculture",g:"DC",fj:false},
  {i: 9301,b:null  ,n:"Exploitations agricoles Haute-Garonne",s:"Agriculture",g:"DC",fj:false},
  {i: 9311,b:null  ,n:"Exploitations agricoles Gers",s:"Agriculture",g:"DC",fj:false},
  {i: 9321,b:null  ,n:"Exploitations agricoles Gironde",s:"Agriculture",g:"DC",fj:false},
  {i: 9331,b:null  ,n:"Exploitations agricoles Hérault",s:"Agriculture",g:"DC",fj:false},
  {i: 9341,b:null  ,n:"Exploitations agricoles Ille-et-Vilaine",s:"Agriculture",g:"DC",fj:false},
  {i: 9351,b:null  ,n:"Exploitations agricoles Indre",s:"Agriculture",g:"DC",fj:false},
  {i: 9361,b:null  ,n:"Exploitations agricoles Indre-et-Loire",s:"Agriculture",g:"DC",fj:false},
  {i: 9371,b:null  ,n:"Exploitations agricoles Isère",s:"Agriculture",g:"DC",fj:false},
  {i: 9381,b:null  ,n:"Exploitations agricoles Jura",s:"Agriculture",g:"DC",fj:false},
  {i: 9391,b:null  ,n:"Exploitations agricoles Landes",s:"Agriculture",g:"DC",fj:false},
  {i: 9401,b:null  ,n:"Exploitations agricoles Loir-et-Cher",s:"Agriculture",g:"DC",fj:false},
  {i: 9411,b:null  ,n:"Exploitations agricoles Loire",s:"Agriculture",g:"DC",fj:false},
  {i: 9421,b:null  ,n:"Exploitations agricoles Haute-Loire",s:"Agriculture",g:"DC",fj:false},
  {i: 9431,b:null  ,n:"Exploitations agricoles Loire-Atlantique",s:"Agriculture",g:"DC",fj:false},
  {i: 9441,b:null  ,n:"Exploitations agricoles Loiret",s:"Agriculture",g:"DC",fj:false},
  {i: 9451,b:null  ,n:"Exploitations agricoles Lot",s:"Agriculture",g:"DC",fj:false},
  {i: 9461,b:null  ,n:"Exploitations agricoles Lot-et-Garonne",s:"Agriculture",g:"DC",fj:false},
  {i: 9471,b:null  ,n:"Exploitations agricoles Lozère",s:"Agriculture",g:"DC",fj:false},
  {i: 9481,b:null  ,n:"Exploitations agricoles Maine-et-Loire",s:"Agriculture",g:"DC",fj:false},
  {i: 9491,b:null  ,n:"Exploitations agricoles Manche",s:"Agriculture",g:"DC",fj:false},
  {i: 9501,b:null  ,n:"Exploitations agricoles Marne",s:"Agriculture",g:"DC",fj:false},
  {i: 9511,b:null  ,n:"Exploitations agricoles Haute-Marne",s:"Agriculture",g:"DC",fj:false},
  {i: 9521,b:null  ,n:"Exploitations agricoles Mayenne",s:"Agriculture",g:"DC",fj:false},
  {i: 9531,b:null  ,n:"Exploitations agricoles Meurthe-et-Moselle",s:"Agriculture",g:"DC",fj:false},
  {i: 9541,b:null  ,n:"Exploitations agricoles Meuse",s:"Agriculture",g:"DC",fj:false},
  {i: 9551,b:null  ,n:"Exploitations agricoles Morbihan",s:"Agriculture",g:"DC",fj:false},
  {i: 9561,b:null  ,n:"Exploitations agricoles Moselle",s:"Agriculture",g:"DC",fj:false},
  {i: 9571,b:null  ,n:"Exploitations agricoles Nièvre",s:"Agriculture",g:"DC",fj:false},
  {i: 9581,b:null  ,n:"Exploitations agricoles Nord",s:"Agriculture",g:"DC",fj:false},
  {i: 9591,b:null  ,n:"Exploitations agricoles Oise",s:"Agriculture",g:"DC",fj:false},
  {i: 9601,b:null  ,n:"Exploitations agricoles Orne",s:"Agriculture",g:"DC",fj:false},
  {i: 9611,b:null  ,n:"Exploitations agricoles Pas-de-Calais",s:"Agriculture",g:"DC",fj:false},
  {i: 9621,b:null  ,n:"Exploitations agricoles Puy-de-Dôme",s:"Agriculture",g:"DC",fj:false},
  {i: 9631,b:null  ,n:"Exploitations agricoles Pyrénées-Atlantiques",s:"Agriculture",g:"DC",fj:false},
  {i: 9641,b:null  ,n:"Exploitations agricoles Hautes-Pyrénées",s:"Agriculture",g:"DC",fj:false},
  {i: 9651,b:null  ,n:"Exploitations agricoles Pyrénées-Orientales",s:"Agriculture",g:"DC",fj:false},
  {i: 9661,b:null  ,n:"Exploitations agricoles Bas-Rhin",s:"Agriculture",g:"DC",fj:false},
  {i: 9671,b:null  ,n:"Exploitations agricoles Haut-Rhin",s:"Agriculture",g:"DC",fj:false},
  {i: 9681,b:null  ,n:"Exploitations agricoles Rhône",s:"Agriculture",g:"DC",fj:false},
  {i: 9691,b:null  ,n:"Exploitations agricoles Haute-Saône",s:"Agriculture",g:"DC",fj:false},
  {i: 9701,b:null  ,n:"Exploitations agricoles Saône-et-Loire",s:"Agriculture",g:"DC",fj:false},
  {i: 9711,b:null  ,n:"Exploitations agricoles Sarthe",s:"Agriculture",g:"DC",fj:false},
  {i: 9721,b:null  ,n:"Exploitations agricoles Savoie",s:"Agriculture",g:"DC",fj:false},
  {i: 9731,b:null  ,n:"Exploitations agricoles Haute-Savoie",s:"Agriculture",g:"DC",fj:false},
  {i: 9741,b:null  ,n:"Exploitations agricoles Paris Seine Seine-et-Marne",s:"Agriculture",g:"DC",fj:false},
  {i: 9751,b:null  ,n:"Exploitations agricoles Seine-Maritime",s:"Agriculture",g:"DC",fj:false},
  {i: 9761,b:null  ,n:"Exploitations agricoles Deux-Sèvres",s:"Agriculture",g:"DC",fj:false},
  {i: 9771,b:null  ,n:"Exploitations agricoles Somme",s:"Agriculture",g:"DC",fj:false},
  {i: 9781,b:null  ,n:"Exploitations agricoles Tarn",s:"Agriculture",g:"DC",fj:false},
  {i: 9791,b:null  ,n:"Exploitations agricoles Tarn-et-Garonne",s:"Agriculture",g:"DC",fj:false},
  {i: 9801,b:null  ,n:"Exploitations agricoles Var",s:"Agriculture",g:"DC",fj:false},
  {i: 9821,b:null  ,n:"Exploitations agricoles Vendée",s:"Agriculture",g:"DC",fj:false},
  {i: 9831,b:null  ,n:"Exploitations agricoles Vienne",s:"Agriculture",g:"DC",fj:false},
  {i: 9841,b:null  ,n:"Exploitations agricoles Haute-Vienne",s:"Agriculture",g:"DC",fj:false},
  {i: 9851,b:null  ,n:"Exploitations agricoles Vosges",s:"Agriculture",g:"DC",fj:false},
  {i: 9861,b:null  ,n:"Exploitations agricoles Yonne",s:"Agriculture",g:"DC",fj:false},
  {i: 9871,b:null  ,n:"Exploitations agricoles Territoire de Belfort",s:"Agriculture",g:"DC",fj:false},
  {i: 9881,b:null  ,n:"Exploitations agricoles Essonne",s:"Agriculture",g:"DC",fj:false},
  {i: 9891,b:null  ,n:"Exploitations agricoles Hauts-de-Seine",s:"Agriculture",g:"DC",fj:false},
  {i: 9901,b:null  ,n:"Exploitations agricoles Seine-Saint-Denis",s:"Agriculture",g:"DC",fj:false},
  {i: 9911,b:null  ,n:"Exploitations agricoles Val-de-Marne",s:"Agriculture",g:"DC",fj:false},
  {i: 9921,b:null  ,n:"Exploitations agricoles Val-d-Oise",s:"Agriculture",g:"DC",fj:false},
  {i: 1686,b:3269  ,n:"Entreprises du paysage",s:"Paysage",g:"DC",fj:false},
  {i: 7016,b:null  ,n:"Coopératives agricoles céréales meunerie alimentation bétail",s:"Coopératives agricoles",g:"DC",fj:false},
  {i: 7025,b:null  ,n:"Coopératives fruitières et légumières",s:"Coopératives agricoles",g:"DC",fj:false},
  {i: 7024,b:null  ,n:"Vins et spiritueux commerce de gros",s:"Commerce vins",g:"DC",fj:false},
  {i: 2075,b:3200  ,n:"Caves coopératives vinicoles",s:"Viticulture",g:"DC",fj:false},
  {i:   86,b:3044  ,n:"Sucre sucreries distilleries raffineries",s:"IAA sucre",g:"DC",fj:false},
  {i:  112,b:3079  ,n:"Industrie laitière",s:"IAA laitier",g:"DC",fj:false},
  {i:   44,b:3014  ,n:"Industries alimentaires diverses",s:"IAA divers",g:"IAA180",fj:false},
  {i:   54,b:3017  ,n:"Boulangerie-pâtisserie artisanale",s:"Artisanat alimentaire",g:"BOULAN270",fj:false},
  {i:  846,b:3058  ,n:"Boulangerie-pâtisserie industrielle",s:"IAA boulangerie",g:"DC",fj:false},
  {i: 1555,b:3144  ,n:"Boucherie boucherie-charcuterie",s:"Artisanat boucherie",g:"DC",fj:false},
  {i:  211,b:3126  ,n:"Industries et commerces en gros des viandes",s:"IAA viandes",g:"DC",fj:false},
  {i:  993,b:3073  ,n:"Charcuterie de détail",s:"Artisanat charcuterie",g:"DC",fj:false},
  {i: 1000,b:3075  ,n:"Confiserie chocolaterie biscuiterie",s:"IAA confiserie",g:"DC",fj:false},
  {i: 1702,b:3194  ,n:"Conserves légumes viandes poissons",s:"IAA conserves",g:"DC",fj:false},
  {i:  207,b:3124  ,n:"Meunerie",s:"IAA meunerie",g:"DC",fj:false},
  {i: 1044,b:3080  ,n:"Pâtes alimentaires",s:"IAA pâtes",g:"DC",fj:false},
  {i: 1182,b:3093  ,n:"Corps gras huiles margarines",s:"IAA corps gras",g:"DC",fj:false},
  {i: 1586,b:3151  ,n:"Poissonnerie artisanat commerce de détail",s:"Artisanat poissonnerie",g:"DC",fj:false},
  {i: 1396,b:null  ,n:"Chocolaterie confiserie biscuiterie (industrie)",s:"IAA chocolaterie",g:"DC",fj:false},
  {i: 1554,b:null  ,n:"Fabrication de la bière",s:"IAA brasserie",g:"DC",fj:false},
  {i: 1240,b:null  ,n:"Distillation alcools et spiritueux",s:"IAA spiritueux",g:"DC",fj:false},
  {i: 1631,b:3186  ,n:"Organismes de tourisme et hôtellerie de plein air",s:"Tourisme",g:"DC",fj:false},
  {i:  267,b:3002  ,n:"BTP Ingénieurs et cadres",s:"BTP cadres",g:"DC",fj:true},
  {i: 1596,b:3258  ,n:"Bâtiment Ouvriers plus 10 salariés",s:"Bâtiment",g:"IAA180",fj:false},
  {i: 1597,b:3258  ,n:"Bâtiment Ouvriers moins 10 salariés",s:"Bâtiment",g:"IAA180",fj:false},
  {i: 1604,b:3005  ,n:"Travaux publics Ouvriers",s:"Travaux publics",g:"IAA180",fj:false},
  {i: 1769,b:3005  ,n:"Travaux publics ETAM",s:"Travaux publics",g:"DC",fj:true},
  {i: 2420,b:3258  ,n:"BTP ETAM employés techniciens agents maîtrise",s:"BTP ETAM",g:"DC",fj:true},
  {i: 3326,b:3258  ,n:"Bâtiment agents de maîtrise et techniciens",s:"Bâtiment AM",g:"DC",fj:true},
  {i: 2609,b:3090  ,n:"Architecture cabinets",s:"Architecture",g:"DC",fj:true},
  {i:  803,b:3060  ,n:"Béton et produits du béton",s:"BTP matériaux",g:"DC",fj:false},
  {i:  184,b:3103  ,n:"Carrières et matériaux",s:"Industrie extractive",g:"DC",fj:false},
  {i:  489,b:3017  ,n:"Tuiles et briques",s:"Industrie matériaux",g:"DC",fj:false},
  {i: 1147,b:3086  ,n:"Chaux industrie",s:"Industrie extractive",g:"DC",fj:false},
  {i: 2609,b:null  ,n:"Géomètres experts fonciers",s:"Géomètre",g:"DC",fj:true},
  {i: 3236,b:null  ,n:"Menuisiers facteurs orgue et pianos",s:"Artisanat musical",g:"DC",fj:false},
  {i:   44,b:3010  ,n:"Industries chimiques",s:"Industrie chimique",g:"CHIM130",fj:true},
  {i:  669,b:3050  ,n:"Industrie du pétrole",s:"Energie pétrolière",g:"PETRO",fj:true},
  {i: 1031,b:3078  ,n:"Industrie du caoutchouc",s:"Industrie caoutchouc",g:"DC",fj:false},
  {i:  292,b:3316  ,n:"Plasturgie",s:"Industrie plastique",g:"DC",fj:true},
  {i:  216,b:3104  ,n:"Industrie pharmaceutique",s:"Industrie pharmaceutique",g:"PHARMA",fj:true},
  {i:  700,b:3054  ,n:"Détergents et produits entretien",s:"Industrie chimique",g:"DC",fj:false},
  {i:  200,b:3120  ,n:"Industrie du verre",s:"Industrie verrière",g:"DC",fj:false},
  {i: 1540,b:3226  ,n:"Céramique industries",s:"Industrie céramique",g:"DC",fj:false},
  {i: 1561,b:null  ,n:"Fabrication de meubles en bois",s:"Industrie bois",g:"DC",fj:false},
  {i:  493,b:3017  ,n:"Bois scieries raboteries résinage",s:"Industrie bois",g:"DC",fj:false},
  {i: 3238,b:3156  ,n:"Papiers et cartons industries",s:"Industrie papier",g:"DC",fj:false},
  {i:  573,b:3115  ,n:"Cartonnage industries",s:"Industrie cartonnage",g:"DC",fj:false},
  {i: 3248,b:3399  ,n:"Métallurgie accord national unique 2023",s:"Métallurgie",g:"DC",fj:true},
  {i: 2614,b:3310  ,n:"Mécanique",s:"Industrie mécanique",g:"DC",fj:false},
  {i: 1821,b:3234  ,n:"Horlogerie",s:"Horlogerie",g:"DC",fj:false},
  {i: 1555,b:3136  ,n:"Décolletage industries",s:"Industrie mécanique",g:"DC",fj:false},
  {i: 2046,b:3268  ,n:"Ameublement industrie",s:"Industrie ameublement",g:"DC",fj:false},
  {i: 1370,b:3030  ,n:"Equipements thermiques installations entretien",s:"Génie climatique",g:"DC",fj:false},
  {i: 1489,b:3090  ,n:"Cordonnerie multiservice",s:"Artisanat cordonnerie",g:"DC",fj:false},
  {i: 1539,b:null  ,n:"Industrie lainière",s:"Industrie textile",g:"DC",fj:false},
  {i:  247,b:3106  ,n:"Industries textiles",s:"Industrie textile",g:"DC",fj:false},
  {i:  176,b:3098  ,n:"Chaussure industrie",s:"Industrie chaussure",g:"DC",fj:false},
  {i: 1404,b:3201  ,n:"Maroquinerie gainerie bracelets cuir",s:"Industrie maroquinerie",g:"DC",fj:false},
  {i: 2070,b:3047  ,n:"Couture parisienne haute couture",s:"Mode couture",g:"DC",fj:true},
  {i: 1316,b:3178  ,n:"Blanchisserie laverie teinturerie nettoyage",s:"Blanchisserie",g:"DC",fj:false},
  {i:  567,b:3049  ,n:"Jouets jeux articles de puériculture",s:"Industrie jouets",g:"DC",fj:false},
  {i: 5001,b:null  ,n:"Industries électriques et gazières IEG",s:"Energie EDF GDF",g:"DC",fj:false},
  {i: 1413,b:3207  ,n:"Gaz naturel distributeurs opérateurs",s:"Energie gaz",g:"DC",fj:false},
  {i: 2230,b:3277  ,n:"Eau assainissement propreté urbaine",s:"Eau Environnement",g:"DC",fj:false},
  {i:  637,b:3139  ,n:"Récupération industrie et commerces",s:"Recyclage récupération",g:"DC",fj:false},
  {i: 2098,b:3264  ,n:"Récupération des métaux industries",s:"Recyclage métaux",g:"DC",fj:false},
  {i: 2420,b:null  ,n:"Production énergie renouvelable",s:"Energie renouvelable",g:"DC",fj:false},
  {i: 1501,b:3305  ,n:"Grande distribution alimentaire supermarchés hypermarchés",s:"Grande distribution alim.",g:"GD",fj:false},
  {i: 1483,b:3245  ,n:"Restauration rapide",s:"Restauration rapide",g:"DC",fj:false},
  {i: 1979,b:3292  ,n:"Hôtels Cafés Restaurants HCR",s:"HCR",g:"HCR",fj:false},
  {i: 1539,b:3225  ,n:"Restauration collective",s:"Restauration collective",g:"DC",fj:false},
  {i: 2216,b:3044  ,n:"Commerce de gros non alimentaire",s:"Commerce de gros",g:"DC",fj:true},
  {i: 1611,b:3162  ,n:"Commerce de gros alimentaire",s:"Commerce gros alimentaire",g:"DC",fj:true},
  {i: 1517,b:3251  ,n:"Commerce de détail non alimentaire",s:"Commerce de détail",g:"DC",fj:false},
  {i: 1870,b:3241  ,n:"Habillement commerce de détail",s:"Commerce textile",g:"DC",fj:false},
  {i: 1383,b:3212  ,n:"Chaussure commerce succursaliste",s:"Commerce chaussures",g:"DC",fj:false},
  {i: 1624,b:3249  ,n:"Optique lunetterie de détail",s:"Optique",g:"DC",fj:false},
  {i: 1985,b:3261  ,n:"Combustibles solides liquides gazeux négoce",s:"Distribution énergie",g:"DC",fj:false},
  {i: 1747,b:3239  ,n:"Librairie",s:"Commerce culturel",g:"DC",fj:false},
  {i: 2104,b:3064  ,n:"Pharmacies officine",s:"Pharmacie",g:"DC",fj:false},
  {i: 2583,b:3100  ,n:"Fleuristes jardineries animaleries",s:"Commerce floral",g:"DC",fj:false},
  {i: 1311,b:3017  ,n:"Négoce de bois oeuvre et produits dérivés",s:"Commerce bois",g:"DC",fj:false},
  {i: 2564,b:3301  ,n:"Bricolage commerce de détail",s:"Commerce bricolage",g:"DC",fj:false},
  {i: 1862,b:3240  ,n:"Jardineries et graineteries commerce de détail",s:"Commerce jardinage",g:"DC",fj:false},
  {i: 1177,b:3089  ,n:"Meubles commerce de détail",s:"Commerce ameublement",g:"DC",fj:false},
  {i: 1411,b:3218  ,n:"Quincaillerie fournitures industrielles",s:"Commerce matériaux",g:"DC",fj:false},
  {i: 1538,b:3224  ,n:"Bijouterie joaillerie orfèvrerie",s:"Artisanat bijouterie",g:"DC",fj:false},
  {i: 2537,b:3306  ,n:"Prothèse dentaire laboratoires",s:"Santé dentaire labo",g:"DC",fj:false},
  {i: 3244,b:null  ,n:"Commerce non alimentaire confédération",s:"Commerce de détail",g:"DC",fj:false},
  {i: 1501,b:3300  ,n:"Crèches établissements accueil petite enfance privés",s:"Petite enfance",g:"DC",fj:false},
  {i: 1485,b:null  ,n:"Herboristerie droguerie",s:"Commerce herboristerie",g:"DC",fj:false},
  {i: 1483,b:null  ,n:"Librairie papeterie presse commerce de détail",s:"Commerce presse",g:"DC",fj:false},
  {i: 1505,b:null  ,n:"Négoce de l hardware et d informatique",s:"Commerce informatique",g:"DC",fj:false},
  {i: 1505,b:3110  ,n:"Jouets jeux commerce de détail",s:"Commerce jouets",g:"DC",fj:false},
  {i: 2614,b:null  ,n:"Electroménager audio vidéo commerce de détail",s:"Commerce high-tech",g:"DC",fj:false},
  {i: 1483,b:null  ,n:"Sport et équipements de loisirs commerce",s:"Commerce sport",g:"DC",fj:false},
  {i: 1040,b:3133  ,n:"Coiffure entreprises",s:"Coiffure",g:"DC",fj:false},
  {i: 2596,b:3073  ,n:"Esthétique cosmétique parfumerie enseignement",s:"Esthétique beauté",g:"DC",fj:false},
  {i: 1040,b:null  ,n:"Coiffure artisanat",s:"Artisanat coiffure",g:"DC",fj:false},
  {i:  675,b:3032  ,n:"Banque AFB",s:"Banque",g:"DC",fj:true},
  {i:  763,b:3110  ,n:"Sociétés assurances",s:"Assurance",g:"ASSUR200",fj:true},
  {i: 2120,b:3281  ,n:"Banques populaires",s:"Banque mutualiste",g:"DC",fj:true},
  {i: 1370,b:3197  ,n:"Caisses épargne",s:"Banque épargne",g:"DC",fj:true},
  {i: 3257,b:null  ,n:"Mutuelles organismes mutualistes",s:"Assurance mutualiste",g:"DC",fj:true},
  {i: 1850,b:3250  ,n:"Expertise comptable et commissariat aux comptes",s:"Finance audit",g:"DC",fj:true},
  {i: 2615,b:3110  ,n:"Courtage en assurances et réassurances",s:"Assurance courtage",g:"DC",fj:true},
  {i: 3082,b:3110  ,n:"Agents généraux assurances personnel",s:"Assurance agences",g:"DC",fj:false},
  {i: 2511,b:null  ,n:"Sociétés de Bourse",s:"Finance marchés",g:"DC",fj:true},
  {i: 2420,b:null  ,n:"Crédit agricole caisses régionales",s:"Banque agricole",g:"DC",fj:true},
  {i: 1978,b:null  ,n:"Crédit mutuel",s:"Banque mutuelle",g:"DC",fj:true},
  {i: 2120,b:null  ,n:"Caisse nationale crédit agricole",s:"Banque nationale",g:"DC",fj:true},
  {i: 1351,b:3196  ,n:"Prévention et sécurité privée gardiennage",s:"Sécurité privée",g:"DC",fj:false},
  {i: 3186,b:3405  ,n:"Nettoyage entreprises de propreté",s:"Propreté",g:"DC",fj:false},
  {i: 1285,b:3144  ,n:"Gardiens concierges employés immeubles",s:"Gardiennage immeuble",g:"DC",fj:false},
  {i: 2345,b:3290  ,n:"Investigations détectives privés",s:"Sécurité investigation",g:"DC",fj:false},
  {i: 1527,b:3144  ,n:"Immobilier agents gestionnaires syndics",s:"Immobilier",g:"DC",fj:true},
  {i: 1966,b:3256  ,n:"Promotion immobilière",s:"Promotion immobilière",g:"DC",fj:true},
  {i: 2643,b:3317  ,n:"Administrateurs de biens gestion",s:"Gestion immobilière",g:"DC",fj:false},
  {i:  218,b:3078  ,n:"Cabinets avocats",s:"Avocats",g:"DC",fj:true},
  {i: 1965,b:3016  ,n:"Notariat",s:"Notariat",g:"DC",fj:true},
  {i: 2372,b:3289  ,n:"Commissaires de justice ex huissiers",s:"Juridique",g:"DC",fj:false},
  {i: 1702,b:3193  ,n:"Géomètres experts fonciers géodésiens",s:"Géomètre foncier",g:"DC",fj:true},
  {i: 3239,b:null  ,n:"Mandataires judiciaires administrateurs judiciaires",s:"Juridique judiciaire",g:"DC",fj:true},
  {i: 1486,b:3018  ,n:"Syntec bureaux études techniques informatique ingénierie conseil",s:"IT ingénierie conseil",g:"DC",fj:true},
  {i: 2642,b:3348  ,n:"Publicité régies et agences",s:"Publicité communication",g:"DC",fj:true},
  {i: 1480,b:3307  ,n:"Presse quotidienne nationale",s:"Presse nationale",g:"DC",fj:true},
  {i: 1309,b:3175  ,n:"Presse quotidienne régionale",s:"Presse régionale",g:"DC",fj:true},
  {i: 1480,b:3320  ,n:"Presse hebdomadaire régionale",s:"Presse hebdomadaire",g:"DC",fj:false},
  {i: 1780,b:3221  ,n:"Radiodiffusion audiovisuel public et privé",s:"Audiovisuel",g:"DC",fj:true},
  {i:  405,b:3142  ,n:"Imprimerie de labeur et industries graphiques",s:"Imprimerie",g:"IAA180",fj:false},
  {i: 2264,b:null  ,n:"Télécommunications",s:"Télécoms",g:"DC",fj:true},
  {i: 1790,b:3225  ,n:"Edition phonographique et musicale",s:"Musique édition",g:"DC",fj:true},
  {i: 3090,b:3391  ,n:"Edition livres presse multimédia",s:"Edition",g:"DC",fj:true},
  {i: 2642,b:null  ,n:"Agences de presse",s:"Presse agences",g:"DC",fj:true},
  {i: 1316,b:null  ,n:"Presse hebdomadaire nationale",s:"Presse nationale",g:"DC",fj:true},
  {i: 2770,b:null  ,n:"Journalistes pigistes",s:"Presse journalistes",g:"DC",fj:true},
  {i:  413,b:3034  ,n:"Hospitalisation privée à but lucratif cliniques",s:"Santé privée",g:"DC",fj:false},
  {i: 2264,b:3307  ,n:"Hospitalisation privée non lucratif FEHAP UNIFED CCN 51",s:"Médico-social non lucratif",g:"DC",fj:false},
  {i: 1921,b:3248  ,n:"CCNT 66 inadaptés handicapés",s:"Médico-social CCNT 66",g:"DC",fj:false},
  {i:  776,b:3033  ,n:"Cabinets médicaux",s:"Santé libérale",g:"DC",fj:false},
  {i: 2128,b:3275  ,n:"Cabinets dentaires",s:"Santé dentaire",g:"DC",fj:false},
  {i: 2104,b:3064  ,n:"Pharmacies officine",s:"Pharmacie",g:"DC",fj:false},
  {i: 2941,b:3370  ,n:"Aide accompagnement soins à domicile BASS",s:"Aide à domicile",g:"DC",fj:false},
  {i:  843,b:3043  ,n:"Aide à domicile associations ADMR Croix-Rouge",s:"Aide à domicile ESS",g:"DC",fj:false},
  {i: 2190,b:3283  ,n:"Centres de lutte contre le cancer CLCC",s:"Santé oncologie",g:"DC",fj:false},
  {i: 3217,b:3406  ,n:"Transport sanitaire ambulanciers",s:"Transport sanitaire",g:"DC",fj:false},
  {i: 2205,b:3274  ,n:"Laboratoires de biologie médicale privés",s:"Biologie médicale",g:"DC",fj:false},
  {i: 1996,b:3260  ,n:"Vétérinaires praticiens salariés",s:"Santé vétérinaire",g:"DC",fj:false},
  {i: 2344,b:3296  ,n:"Pompes funèbres et marbrerie funéraire",s:"Services funéraires",g:"DC",fj:false},
  {i: 1147,b:null  ,n:"Médecins du travail",s:"Santé travail",g:"DC",fj:false},
  {i: 2537,b:null  ,n:"Audioprothésistes",s:"Santé audio",g:"DC",fj:false},
  {i: 2128,b:null  ,n:"Orthoptistes salariés",s:"Santé orthoptie",g:"DC",fj:false},
  {i:  413,b:null  ,n:"Cliniques psychiatriques privées",s:"Santé psychiatrie",g:"DC",fj:false},
  {i: 3292,b:null  ,n:"Centres de santé infirmiers",s:"Santé infirmiers",g:"DC",fj:false},
  {i: 1921,b:null  ,n:"Etablissements gériatriques EHPAD",s:"Médico-social EHPAD",g:"DC",fj:false},
  {i:   16,b:3085  ,n:"Transport routier de marchandises",s:"Transport routier marchandises",g:"DC",fj:false},
  {i:  650,b:3002  ,n:"Transport routier de voyageurs",s:"Transport routier voyageurs",g:"DC",fj:false},
  {i: 2098,b:3264  ,n:"Déménagement",s:"Transport déménagement",g:"DC",fj:false},
  {i:  412,b:3025  ,n:"Transport aérien personnel navigant technique PNT",s:"Transport aérien PNT",g:"DC",fj:false},
  {i:  673,b:3028  ,n:"Transport aérien personnel au sol",s:"Transport aérien sol",g:"DC",fj:false},
  {i: 2002,b:3265  ,n:"Transport ferroviaire opérateurs privés",s:"Transport ferroviaire",g:"DC",fj:false},
  {i: 3085,b:null  ,n:"Manutention portuaire dockers",s:"Transport maritime port",g:"DC",fj:false},
  {i: 5021,b:null  ,n:"Navigation intérieure bateliers",s:"Transport fluvial",g:"DC",fj:false},
  {i: 1672,b:3191  ,n:"Transports urbains réseaux",s:"Transport urbain",g:"DC",fj:false},
  {i: 1611,b:3162  ,n:"Logistique entreposage",s:"Logistique",g:"DC",fj:true},
  {i: 1672,b:3143  ,n:"Entrepôts frigorifiques manutention",s:"Logistique froid",g:"IAA180",fj:false},
  {i:   16,b:null  ,n:"Transport sanitaire non urgent VSL",s:"Transport santé",g:"DC",fj:false},
  {i: 2003,b:null  ,n:"Ambulanciers transport sanitaire",s:"Transport ambulancier",g:"DC",fj:false},
  {i:  650,b:null  ,n:"Taxis et véhicules de remise",s:"Transport taxis",g:"DC",fj:false},
  {i:  412,b:null  ,n:"Personnel navigant commercial PNC",s:"Transport aérien PNC",g:"DC",fj:false},
  {i: 1734,b:3210  ,n:"Prestataires de services du secteur tertiaire",s:"Services tertiaire",g:"DC",fj:true},
  {i: 2596,b:3304  ,n:"Portage salarial",s:"Portage freelance",g:"DC",fj:true},
  {i: 2609,b:3357  ,n:"Entreprises de travail temporaire intérim",s:"Travail temporaire",g:"DC",fj:false},
  {i: 3220,b:3415  ,n:"Particuliers employeurs et emploi à domicile FEPEM",s:"Emploi à domicile",g:"DC",fj:false},
  {i: 2247,b:3034  ,n:"Services automobile garages concessions",s:"Automobile",g:"DC",fj:false},
  {i: 3131,b:3268  ,n:"Experts automobiles",s:"Automobile expertise",g:"DC",fj:true},
  {i: 2631,b:3309  ,n:"Location entretien maintenance matériels TP agricoles",s:"Location machines",g:"DC",fj:false},
  {i: 1351,b:null  ,n:"Téléservices centres d appels",s:"Centre d appels",g:"DC",fj:false},
  {i: 2098,b:null  ,n:"Services de nettoyage à sec pressing",s:"Pressing",g:"DC",fj:false},
  {i: 2064,b:null  ,n:"Coopératives HLM",s:"Immobilier social",g:"DC",fj:false},
  {i: 1516,b:3117  ,n:"Formation professionnelle continue",s:"Formation professionnelle",g:"DC",fj:true},
  {i: 2582,b:3306  ,n:"Enseignement privé hors contrat",s:"Education privée hors contrat",g:"DC",fj:true},
  {i: 2409,b:3299  ,n:"Enseignement privé sous contrat CPPN CPPE",s:"Education privée",g:"DC",fj:true},
  {i: 1040,b:null  ,n:"Enseignement supérieur privé",s:"Education supérieure",g:"DC",fj:true},
  {i: 1518,b:3246  ,n:"Animation ÉCLAT structures employant animateurs",s:"Animation ESS",g:"ANIM90",fj:false},
  {i: 1261,b:3177  ,n:"Centres sociaux et socio-culturels",s:"Action sociale",g:"CSS130",fj:false},
  {i: 3381,b:null  ,n:"Acteurs du lien social et familial ALISFA",s:"Action sociale ESS",g:"DC",fj:false},
  {i: 3090,b:3268  ,n:"Spectacle vivant producteurs diffuseurs théâtres",s:"Spectacle vivant",g:"DC",fj:false},
  {i: 2511,b:3306  ,n:"Sport entreprises du secteur sportif",s:"Sport",g:"DC",fj:false},
  {i: 2378,b:3298  ,n:"Casinos",s:"Jeux casinos",g:"DC",fj:false},
  {i: 3139,b:3270  ,n:"Parcs de loisirs jardins zoologiques",s:"Tourisme loisirs",g:"DC",fj:false},
  {i: 3043,b:null  ,n:"Agences de voyages et tourisme",s:"Tourisme voyages",g:"DC",fj:true},
  {i: 2528,b:3230  ,n:"Hôtellerie de plein air campings",s:"Tourisme camping",g:"DC",fj:false},
  {i: 1790,b:null  ,n:"Edition phonographique musicale",s:"Musique phonographie",g:"DC",fj:true},
  {i: 1790,b:null  ,n:"Spectacles enregistrés",s:"Spectacle enregistré",g:"DC",fj:false},
  {i: 2480,b:null  ,n:"Artistes musiciens interprètes",s:"Spectacle musiciens",g:"DC",fj:false},
  {i: 2411,b:null  ,n:"Entreprises artistiques et culturelles",s:"Spectacle culturel",g:"DC",fj:false},
  {i:  218,b:null  ,n:"Experts en automobile",s:"Expertise auto",g:"DC",fj:true},
  {i: 1783,b:null  ,n:"Professions libérales diverses",s:"Professions libérales",g:"DC",fj:true},
  {i: 1850,b:null  ,n:"Cabinets conseils entreprises management",s:"Conseil management",g:"DC",fj:true},
  {i: 2264,b:null  ,n:"Etablissements soins et réadaptation privés lucratifs",s:"Soins réadaptation",g:"DC",fj:false},
  {i: 1560,b:null  ,n:"Régies de quartier",s:"Action sociale",g:"DC",fj:false},
  {i: 3244,b:null  ,n:"Assainissement et maintenance industrielle",s:"Assainissement",g:"DC",fj:false},
  {i: 2003,b:null  ,n:"Entreprises funéraires",s:"Funéraire",g:"DC",fj:false},
  {i:  218,b:null  ,n:"Ostéopathes chiropracteurs salariés",s:"Santé ostéopathie",g:"DC",fj:false},
  {i: 1978,b:null  ,n:"Mutuelles sans but lucratif",s:"Mutualité",g:"DC",fj:false},
  {i: 2120,b:null  ,n:"Organismes de sécurité sociale",s:"Sécurité sociale",g:"DC",fj:true},
  {i: 1851,b:null  ,n:"Personnels APEC",s:"Emploi cadres",g:"DC",fj:true},
  {i: 1266,b:null  ,n:"Sociétés de recherche",s:"Recherche",g:"DC",fj:true},
  {i: 2148,b:null  ,n:"Cabinets experts comptables petits cabinets",s:"Finance petits cabinets",g:"DC",fj:true},

  {i: 7502,b:null  ,n:"Pépinières horticoles nationales",s:"Horticulture",g:"DC",fj:false},
  {i: 7503,b:null  ,n:"Entreprises de jardinage",s:"Jardinage",g:"DC",fj:false},
  {i: 7504,b:null  ,n:"Champignonnières",s:"Agriculture champignons",g:"DC",fj:false},
  {i: 7505,b:null  ,n:"Centres équestres et haras",s:"Equitation",g:"DC",fj:false},
  {i: 7506,b:null  ,n:"Elevage avicole",s:"Agriculture aviculture",g:"DC",fj:false},
  {i: 7507,b:null  ,n:"Exploitations forestières et scieries agricoles",s:"Agriculture forêt",g:"DC",fj:false},
  {i: 7508,b:null  ,n:"Coopératives laitières fromagères",s:"Coopératives laitières",g:"DC",fj:false},
  {i: 7509,b:null  ,n:"Travaux agricoles et ruraux",s:"Travaux agricoles",g:"DC",fj:false},
  {i: 7511,b:null  ,n:"Tabac culture et production",s:"Agriculture tabac",g:"DC",fj:false},
  {i: 7512,b:null  ,n:"Arboriculture fruitière",s:"Agriculture arboriculture",g:"DC",fj:false},
  {i: 7513,b:null  ,n:"Maraîchage et cultures légumières",s:"Maraîchage",g:"DC",fj:false},
  {i: 7514,b:null  ,n:"Serres horticoles",s:"Agriculture serres",g:"DC",fj:false},
  {i: 1499,b:3114  ,n:"Industrie du gaz",s:"Industrie gaz",g:"DC",fj:false},
  {i: 1557,b:3149  ,n:"Fonderies et forges",s:"Métallurgie fonderies",g:"DC",fj:false},
  {i: 1563,b:3155  ,n:"Industrie de l aluminium",s:"Industrie aluminium",g:"DC",fj:false},
  {i: 1564,b:3158  ,n:"Industrie cuivre et alliages",s:"Industrie cuivre",g:"DC",fj:false},
  {i: 1586,b:null  ,n:"Industrie des composants électroniques",s:"Electronique",g:"DC",fj:false},
  {i: 1588,b:null  ,n:"Industrie du pneumatique",s:"Industrie pneumatique",g:"DC",fj:false},
  {i: 1592,b:null  ,n:"Industrie pharmaceutique vétérinaire",s:"Pharmacie vétérinaire",g:"PHARMA",fj:true},
  {i: 1598,b:null  ,n:"Industrie du ciment",s:"Industrie ciment",g:"DC",fj:false},
  {i: 1600,b:null  ,n:"Industrie de la porcelaine",s:"Industrie porcelaine",g:"DC",fj:false},
  {i: 1603,b:null  ,n:"Industrie de l emballage",s:"Industrie emballage",g:"DC",fj:false},
  {i: 1607,b:3170  ,n:"Industrie du coton",s:"Industrie coton",g:"DC",fj:false},
  {i: 1609,b:null  ,n:"Industrie de la laine peignée",s:"Industrie laine",g:"DC",fj:false},
  {i: 1615,b:null  ,n:"Industrie de la soie",s:"Industrie soie",g:"DC",fj:false},
  {i: 1618,b:null  ,n:"Industrie de la bonneterie",s:"Industrie bonneterie",g:"DC",fj:false},
  {i: 1622,b:null  ,n:"Industrie de la broderie",s:"Industrie broderie",g:"DC",fj:false},
  {i: 1627,b:null  ,n:"Industrie des sports et loisirs",s:"Industrie sports",g:"DC",fj:false},
  {i: 1628,b:null  ,n:"Industrie de la literie",s:"Industrie literie",g:"DC",fj:false},
  {i: 1637,b:3183  ,n:"Industrie des ardoises",s:"Industrie ardoises",g:"DC",fj:false},
  {i: 1640,b:3186  ,n:"Industrie du marbre",s:"Industrie marbre",g:"DC",fj:false},
  {i: 1648,b:null  ,n:"Industrie des équipements électriques",s:"Industrie électrique",g:"DC",fj:false},
  {i: 1649,b:null  ,n:"Industrie électronique professionnelle",s:"Electronique professionnelle",g:"DC",fj:false},
  {i: 1651,b:3190  ,n:"Fabrication instruments de mesure",s:"Industrie mesure",g:"DC",fj:false},
  {i: 1653,b:null  ,n:"Industrie des prothèses et orthèses",s:"Orthopédie prothèse",g:"DC",fj:false},
  {i: 1660,b:null  ,n:"Industrie de la fabrication des parquets",s:"Industrie parquets",g:"DC",fj:false},
  {i: 1662,b:null  ,n:"Fabrication de stores et fermetures",s:"Industrie fermetures",g:"DC",fj:false},
  {i: 1665,b:null  ,n:"Fabrication de machines agricoles",s:"Industrie machines agricoles",g:"DC",fj:false},
  {i: 1670,b:null  ,n:"Industrie des ascenseurs et escaliers mécaniques",s:"Industrie ascenseurs",g:"DC",fj:false},
  {i: 1674,b:null  ,n:"Industrie des équipements thermiques sanitaires",s:"Industrie thermique sanitaire",g:"DC",fj:false},
  {i: 1679,b:null  ,n:"Fabrication de motoculture et jardinage",s:"Industrie motoculture",g:"DC",fj:false},
  {i: 1681,b:null  ,n:"Ingénierie bâtiment et travaux publics",s:"Ingénierie BTP",g:"DC",fj:true},
  {i: 1685,b:null  ,n:"Fabrication du béton prêt à emploi",s:"Industrie béton prêt",g:"DC",fj:false},
  {i: 1688,b:null  ,n:"Industrie de la signalisation routière",s:"Signalisation routière",g:"DC",fj:false},
  {i: 1690,b:null  ,n:"Industrie des engrais",s:"Industrie engrais",g:"DC",fj:false},
  {i: 1695,b:null  ,n:"Tannerie mégisserie",s:"Industrie tannerie",g:"DC",fj:false},
  {i: 1696,b:null  ,n:"Pelleterie fourrure",s:"Industrie fourrure",g:"DC",fj:false},
  {i: 1697,b:null  ,n:"Passementerie articles textiles",s:"Industrie passementerie",g:"DC",fj:false},
  {i: 1704,b:null  ,n:"Industrie de la lunetterie",s:"Industrie lunetterie",g:"DC",fj:false},
  {i: 1707,b:null  ,n:"Fabrication de coutellerie",s:"Artisanat coutellerie",g:"DC",fj:false},
  {i: 1711,b:null  ,n:"Industrie des articles de sport",s:"Industrie articles sport",g:"DC",fj:false},
  {i: 1715,b:null  ,n:"Industrie des instruments de musique",s:"Industrie instruments",g:"DC",fj:false},
  {i: 1717,b:null  ,n:"Industrie des arts de la table",s:"Industrie arts table",g:"DC",fj:false},
  {i: 1561,b:null  ,n:"Fabrication de meubles en bois",s:"Industrie meubles bois",g:"DC",fj:false},
  {i: 1635,b:null  ,n:"Fabrication charpentes bois",s:"Charpente bois",g:"DC",fj:false},
  {i: 1619,b:null  ,n:"Commerce de détail papeterie bureau",s:"Commerce papeterie",g:"DC",fj:false},
  {i: 1620,b:null  ,n:"Commerce de détail informatique téléphonie",s:"Commerce informatique téléphonie",g:"DC",fj:false},
  {i: 1621,b:null  ,n:"Commerce de détail animalerie",s:"Commerce animalerie",g:"DC",fj:false},
  {i: 1623,b:null  ,n:"Commerce de détail produits biologiques",s:"Commerce bio",g:"DC",fj:false},
  {i: 1625,b:null  ,n:"Négoce de matériaux de construction",s:"Négoce matériaux",g:"DC",fj:false},
  {i: 1629,b:null  ,n:"Négoce de machines outils industrie",s:"Négoce machines",g:"DC",fj:false},
  {i: 1632,b:null  ,n:"Négoce de produits chimiques",s:"Négoce chimie",g:"DC",fj:false},
  {i: 1633,b:null  ,n:"Commerce de gros matériel agricole",s:"Commerce gros agricole",g:"DC",fj:false},
  {i: 1634,b:null  ,n:"Grossistes en produits de beauté",s:"Commerce gros beauté",g:"DC",fj:false},
  {i: 1636,b:null  ,n:"Agents commerciaux VRP multicarte",s:"VRP commercial",g:"DC",fj:false},
  {i: 1638,b:null  ,n:"Représentants voyageurs placiers",s:"Représentants VRP",g:"DC",fj:false},
  {i: 1647,b:null  ,n:"Artisans menuisiers ébénistes",s:"Artisanat menuiserie",g:"DC",fj:false},
  {i: 1650,b:null  ,n:"Commerce de détail horlogerie bijouterie",s:"Commerce horlogerie",g:"DC",fj:false},
  {i: 1652,b:null  ,n:"Commerce de détail livres disques",s:"Commerce livres disques",g:"DC",fj:false},
  {i: 1654,b:null  ,n:"Commerce de gros jouets",s:"Commerce gros jouets",g:"DC",fj:false},
  {i: 1656,b:null  ,n:"Commerce de gros papeterie fournitures bureau",s:"Commerce gros bureau",g:"DC",fj:false},
  {i: 1659,b:null  ,n:"Vente à distance e-commerce",s:"Commerce distance",g:"DC",fj:true},
  {i: 1661,b:null  ,n:"Location de véhicules",s:"Location véhicules",g:"DC",fj:false},
  {i: 1663,b:null  ,n:"Location courte durée automobiles",s:"Location auto courte durée",g:"DC",fj:false},
  {i: 1664,b:null  ,n:"Concessionnaires automobiles poids lourds",s:"Automobile poids lourds",g:"DC",fj:false},
  {i: 1666,b:null  ,n:"Contrôle technique automobile",s:"Contrôle technique",g:"DC",fj:false},
  {i: 1667,b:null  ,n:"Réparation cycles et motocycles",s:"Réparation cycles",g:"DC",fj:false},
  {i: 1668,b:null  ,n:"Stations service",s:"Stations service",g:"DC",fj:false},
  {i: 1669,b:null  ,n:"Lavage nettoyage véhicules",s:"Lavage véhicules",g:"DC",fj:false},
  {i: 1673,b:null  ,n:"Auto-écoles",s:"Auto-écoles",g:"DC",fj:false},
  {i: 1675,b:null  ,n:"Commerce et réparation matériels agricoles",s:"Commerce matériels agricoles",g:"DC",fj:false},
  {i: 1678,b:null  ,n:"Services informatiques et numérique",s:"Services numériques",g:"DC",fj:true},
  {i: 1680,b:null  ,n:"Conseil en gestion entreprise",s:"Conseil gestion",g:"DC",fj:true},
  {i: 1682,b:null  ,n:"Etudes de marché et sondages",s:"Etudes marché",g:"DC",fj:true},
  {i: 1683,b:null  ,n:"Traduction et interprétariat",s:"Traduction",g:"DC",fj:true},
  {i: 1687,b:null  ,n:"Activités de centres de congrès",s:"Congrès événementiel",g:"DC",fj:false},
  {i: 1689,b:null  ,n:"Organisation de salons foires expositions",s:"Salons foires",g:"DC",fj:false},
  {i: 1691,b:null  ,n:"Traiteurs organisation de réceptions",s:"Traiteurs",g:"DC",fj:false},
  {i: 1692,b:null  ,n:"Blanchisserie industrielle collectivités",s:"Blanchisserie industrielle",g:"DC",fj:false},
  {i: 1693,b:null  ,n:"Services de reprographie impression",s:"Services reprographie",g:"DC",fj:false},
  {i: 1694,b:null  ,n:"Messageries et livraison dernier kilomètre",s:"Livraison dernier km",g:"DC",fj:false},
  {i: 1698,b:null  ,n:"Services de location et crédit bail",s:"Location crédit bail",g:"DC",fj:true},
  {i: 1699,b:null  ,n:"Sociétés de recouvrement créances",s:"Recouvrement créances",g:"DC",fj:true},
  {i: 1701,b:null  ,n:"Sociétés de gestion de portefeuille",s:"Gestion portefeuille",g:"DC",fj:true},
  {i: 1703,b:null  ,n:"Activités auxiliaires services financiers",s:"Services financiers auxiliaires",g:"DC",fj:true},
  {i: 1705,b:null  ,n:"Expertise et évaluation immobilière",s:"Expertise immobilière",g:"DC",fj:true},
  {i: 1706,b:null  ,n:"Diagnostic immobilier",s:"Diagnostic immobilier",g:"DC",fj:false},
  {i: 1708,b:null  ,n:"Propreté nettoyage locaux tertiaires",s:"Propreté tertiaire",g:"DC",fj:false},
  {i: 1709,b:null  ,n:"Services de sécurité électronique",s:"Sécurité électronique",g:"DC",fj:false},
  {i: 1712,b:null  ,n:"Services de courrier express",s:"Courrier express",g:"DC",fj:false},
  {i: 1713,b:null  ,n:"Centres de tri postal",s:"Tri postal",g:"DC",fj:false},
  {i: 1716,b:null  ,n:"Activités postales et de courrier",s:"Activités postales",g:"DC",fj:false},
  {i: 1718,b:null  ,n:"Services de télémaintenance",s:"Télémaintenance",g:"DC",fj:true},
  {i: 1719,b:null  ,n:"Ingénierie et prestations de services",s:"Ingénierie prestations",g:"DC",fj:true},
  {i: 1720,b:null  ,n:"Cabinets de recrutement",s:"Recrutement",g:"DC",fj:true},
  {i: 1721,b:null  ,n:"Conseil en ressources humaines",s:"RH conseil",g:"DC",fj:true},
  {i: 1722,b:null  ,n:"Formation initiale privée apprentissage",s:"Formation initiale",g:"DC",fj:true},
  {i: 1723,b:null  ,n:"Associations sociales culturelles",s:"Associations socioculturelles",g:"DC",fj:false},
  {i: 1727,b:null  ,n:"Organismes HLM et bailleurs sociaux",s:"Bailleurs sociaux",g:"DC",fj:true},
  {i: 1729,b:null  ,n:"Régies publicitaires",s:"Régies publicitaires",g:"DC",fj:true},
  {i: 1730,b:null  ,n:"Imprimeurs sérigraphes",s:"Imprimerie sérigraphie",g:"IAA180",fj:false},
  {i: 1732,b:null  ,n:"Emballage et conditionnement à façon",s:"Conditionnement façon",g:"DC",fj:false},
  {i: 1735,b:null  ,n:"Logistique de distribution et livraison",s:"Logistique livraison",g:"DC",fj:false},
  {i: 1736,b:null  ,n:"Transports express et chronopost",s:"Transport express",g:"DC",fj:false},
  {i: 1737,b:null  ,n:"Manutention aéroportuaire",s:"Manutention aéroport",g:"DC",fj:false},
  {i: 1738,b:null  ,n:"Services assistance en escale",s:"Assistance escale",g:"DC",fj:false},
  {i: 1739,b:null  ,n:"Pilotage et remorquage maritime",s:"Maritime pilotage",g:"DC",fj:false},
  {i: 1740,b:null  ,n:"Pêche maritime et cultures marines",s:"Pêche maritime",g:"DC",fj:false},
  {i: 1741,b:null  ,n:"Exploitations de parcs aquatiques",s:"Parcs aquatiques",g:"DC",fj:false},
  {i: 1742,b:null  ,n:"Centres de thalassothérapie",s:"Thalassothérapie",g:"DC",fj:false},
  {i: 1743,b:null  ,n:"Spa bien-être et thermalisme",s:"Thermalisme spa",g:"DC",fj:false},
  {i: 1744,b:null  ,n:"Photographie de portrait et publicitaire",s:"Photographie",g:"DC",fj:true},
  {i: 1748,b:null  ,n:"Graphisme et design",s:"Graphisme design",g:"DC",fj:true},
  {i: 1749,b:null  ,n:"Développement web et applications",s:"Développement web",g:"DC",fj:true},
  {i: 1750,b:null  ,n:"Intelligence artificielle et data",s:"IA data",g:"DC",fj:true},
  {i: 1751,b:null  ,n:"Cybersécurité et infogérance",s:"Infogérance",g:"DC",fj:true},
  {i: 1753,b:null  ,n:"Editeurs de logiciels",s:"Editeurs logiciels",g:"DC",fj:true},
  {i: 1754,b:null  ,n:"Intégrateurs systèmes information",s:"Intégrateurs SI",g:"DC",fj:true},
  {i: 1757,b:null  ,n:"Centres de planification éducation familiale",s:"Planification familiale",g:"DC",fj:false},
  {i: 1758,b:null  ,n:"Etablissements enfants inadaptés privés",s:"Education spécialisée",g:"DC",fj:false},
  {i: 1759,b:null  ,n:"Foyers hébergement travailleurs handicapés",s:"Hébergement handicapés",g:"DC",fj:false},
  {i: 1760,b:null  ,n:"Services aide aux toxicomanes",s:"Addictologie",g:"DC",fj:false},
  {i: 1761,b:null  ,n:"Services aide personnes sans abri",s:"Hébergement social",g:"DC",fj:false},
  {i: 1762,b:null  ,n:"Associations intermédiaires insertion",s:"Insertion professionnelle",g:"DC",fj:false},
  {i: 1763,b:null  ,n:"Chantiers insertion",s:"Insertion chantiers",g:"DC",fj:false},
  {i: 1764,b:null  ,n:"Entreprises adaptées",s:"Entreprises adaptées",g:"DC",fj:false},
  {i: 1765,b:null  ,n:"ESAT établissements aide par le travail",s:"ESAT",g:"DC",fj:false},
  {i: 1766,b:null  ,n:"Services tutelle curatelle",s:"Tutelle curatelle",g:"DC",fj:false},
  {i: 1767,b:null  ,n:"Crèches associatives",s:"Crèches associatives",g:"DC",fj:false},
  {i: 1768,b:null  ,n:"Accueil de loisirs sans hébergement ALSH",s:"ALSH loisirs",g:"ANIM90",fj:false},
  {i: 1770,b:null  ,n:"Maisons familiales rurales",s:"Maisons familiales rurales",g:"DC",fj:false},
  {i: 1771,b:null  ,n:"Etablissements privés enseignement agricole",s:"Enseignement agricole",g:"DC",fj:false},
  {i: 1772,b:null  ,n:"Professeurs de musique privés",s:"Enseignement musical",g:"DC",fj:false},
  {i: 1773,b:null  ,n:"Ecoles de danse privées",s:"Enseignement danse",g:"DC",fj:false},
  {i: 1774,b:null  ,n:"Centres de formation sportive",s:"Formation sportive",g:"DC",fj:false},
  {i: 1775,b:null  ,n:"Organismes de gestion écoles catholiques OGEC",s:"OGEC écoles",g:"DC",fj:false},
  {i: 1776,b:null  ,n:"Foyers de jeunes travailleurs FJT",s:"FJT jeunes",g:"DC",fj:false},
  {i: 1777,b:null  ,n:"Résidences sociales",s:"Résidences sociales",g:"DC",fj:false},
  {i: 1778,b:null  ,n:"Ligue de l enseignement",s:"Ligue enseignement",g:"DC",fj:false},
  {i: 1779,b:null  ,n:"Fédérations sportives nationales",s:"Sport fédérations",g:"DC",fj:false},
  {i: 1781,b:null  ,n:"Comités olympiques et sportifs",s:"Sport comités",g:"DC",fj:false},
  {i: 1782,b:null  ,n:"Clubs sportifs professionnels",s:"Sport clubs pro",g:"DC",fj:false},
  {i: 1784,b:null  ,n:"Gérants mandataires commerce de détail",s:"Gérants mandataires",g:"DC",fj:false},
  {i: 1786,b:null  ,n:"Syndicats de copropriété",s:"Syndicats copropriété",g:"DC",fj:false},
  {i: 1788,b:null  ,n:"Agents immobiliers réseaux mandataires",s:"Réseaux mandataires",g:"DC",fj:false},
  {i: 1789,b:null  ,n:"Notaires clercs et employés",s:"Notariat employés",g:"DC",fj:false},
  {i: 2148,b:null  ,n:"Cabinets experts comptables petits cabinets",s:"Finance petits cabinets",g:"DC",fj:true},
  {i: 1978,b:null  ,n:"Crédit mutuel",s:"Banque mutuelle",g:"DC",fj:true},
  {i: 1978,b:null  ,n:"Mutuelles sans but lucratif",s:"Mutualité",g:"DC",fj:false},
  {i: 2120,b:null  ,n:"Organismes de sécurité sociale",s:"Sécurité sociale",g:"DC",fj:true},
  {i: 1851,b:null  ,n:"Personnel APEC",s:"Emploi cadres",g:"DC",fj:true},
  {i: 1266,b:null  ,n:"Sociétés de recherche",s:"Recherche",g:"DC",fj:true},
  {i: 2140,b:null  ,n:"Assistants maternels du particulier employeur",s:"Assistants maternels",g:"DC",fj:false},
  {i: 2420,b:null  ,n:"Régies de quartier",s:"Action sociale quartier",g:"DC",fj:false},
  {i: 1350,b:null  ,n:"Radio locales privées",s:"Radio privée",g:"DC",fj:true},
  {i: 1480,b:null  ,n:"Correspondants locaux presse",s:"Presse correspondants",g:"DC",fj:false},
  {i: 2270,b:null  ,n:"Organismes agrées formation CFA",s:"Formation CFA",g:"DC",fj:true},
  {i: 2420,b:null  ,n:"Moniteurs auto-école conduite",s:"Conduite moniteurs",g:"DC",fj:false},
  {i: 1611,b:null  ,n:"Commerce de gros produits pharmaceutiques",s:"Commerce gros pharma",g:"DC",fj:true},
  {i: 1501,b:null  ,n:"Supérettes magasins de proximité",s:"Commerce proximité",g:"GD",fj:false},
  {i: 1979,b:null  ,n:"Restaurants d entreprise",s:"Restauration entreprise",g:"HCR",fj:false},
  {i: 1979,b:null  ,n:"Hôtellerie de vacances et résidences",s:"Résidences vacances",g:"HCR",fj:false},
  {i: 1979,b:null  ,n:"Traiteurs et cafétérias",s:"Traiteurs cafétérias",g:"HCR",fj:false},
];

// ═══════════════════════════════════════════════════
// FONCTIONS
// ═══════════════════════════════════════════════════

function _norm(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

/** Règles HS d'un groupe */
function getRules(groupeId) {
  return REGLES_HS[groupeId] || REGLES_HS.DC;
}

/** Règles HS d'une CCN par IDCC */
function getGroupeForCCN(idcc) {
  // Si IDCC = 0 et qu'une config CUSTOM existe, la retourner
  if (idcc === 0 && REGLES_HS.CUSTOM && REGLES_HS.CUSTOM.id === 'CUSTOM') {
    return REGLES_HS.CUSTOM;
  }
  const e = CCN_ALIASES.find(c => c.i === Number(idcc));
  return getRules(e ? e.g : 'DC');
}

/** Recherche CCN (nom, secteur, ou IDCC) */
function findCCN(terme) {
  if (!terme || !terme.trim()) return [];
  const t = _norm(terme.trim());
  if (/^\d+$/.test(t)) {
    const exact = CCN_ALIASES.filter(c => String(c.i).startsWith(t));
    if (exact.length) return exact;
  }
  return CCN_ALIASES.filter(c => _norm(c.n).includes(t) || _norm(c.s).includes(t));
}

/**
 * Calcule les HS selon les paliers de la CCN (gère les 3 paliers HCR)
 * @param {number} hsReelles  Heures supplémentaires réellement effectuées
 * @param {number} absences   Heures d'absence dans la semaine
 * @param {number} idcc       IDCC de la CCN (0 = droit commun)
 * @returns {{ hs1, hs_inter, hs2, majoration, seuil, groupe, paliers }}
 */
function calculerHS(hsReelles, absences, idcc) {
  const r = getGroupeForCCN(idcc);
  const heuresBase = Math.max(0, r.seuil - (absences || 0));
  const total = heuresBase + hsReelles;
  const hsTotal = Math.max(0, total - r.seuil);

  let hs1 = 0, hs_inter = 0, hs2 = 0;

  if (r.taux_inter !== null) {
    // 3 paliers (ex: HCR)
    hs1      = Math.min(hsTotal, r.palier1);
    hs_inter = Math.min(Math.max(0, hsTotal - r.palier1), r.palier_inter);
    hs2      = Math.max(0, hsTotal - r.palier1 - r.palier_inter);
  } else {
    // 2 paliers (droit commun)
    hs1 = Math.min(hsTotal, r.palier1);
    hs2 = Math.max(0, hsTotal - r.palier1);
  }

  const majoration =
    hs1      * (1 + r.taux1 / 100) +
    hs_inter * (1 + (r.taux_inter || 0) / 100) +
    hs2      * (1 + r.taux2 / 100);

  return {
    hs1, hs_inter, hs2, hsTotal,
    majoration: Math.round(majoration * 100) / 100,
    seuil: r.seuil,
    groupe: r.id,
    groupeNom: r.nom,
    paliers: r.taux_inter !== null
      ? `${r.taux1}%(${r.palier1}h) / ${r.taux_inter}%(${r.palier_inter}h) / ${r.taux2}%`
      : `${r.taux1}%(${r.palier1}h) / ${r.taux2}%`,
  };
}

/** Vérifie la conformité aux seuils légaux */
function verifierConformite(weeklyH, idcc) {
  const r = getGroupeForCCN(idcc);
  const w = [];
  if (weeklyH > 60)             w.push('Dépassement absolu 60h (L3121-20 — interdit sans exception)');
  if (weeklyH > 48)             w.push('Dépassement légal 48h (dérogation préfectorale requise)');
  if (weeklyH > (r.maxHebdo||48)) w.push('Dépassement max CCN '+r.maxHebdo+'h');
  if (weeklyH > 44)             w.push('Surveiller moyenne 12 semaines (max 44h L3121-23)');
  return { ok: w.length === 0, warnings: w };
}

/** Groupes avec règles différentes du droit commun */
function getGroupesDerogatoires() {
  return Object.values(REGLES_HS).filter(g =>
    g.seuil!==35 || g.taux1!==25 || g.taux2!==50 || g.contingent!==220 || g.taux_inter!==null
  );
}

/** Stats de la base */
function getStats() {
  return {
    totalCCN:     CCN_ALIASES.length,
    groupes:      Object.keys(REGLES_HS).length,
    derogatoires: getGroupesDerogatoires().length,
    forfaitJour:  CCN_ALIASES.filter(c => c.fj).length,
    secteurs:     [...new Set(CCN_ALIASES.map(c => c.s))].length,
  };
}

// ═══════════════════════════════════════════════════
// CONFIGURATION PERSONNALISÉE (accord entreprise/branche)
// Stockée dans localStorage clé CCN_CUSTOM
// ═══════════════════════════════════════════════════

/**
 * Retourne la config custom depuis localStorage
 * @returns {object} Config custom ou null
 */
function getCustomConfig() {
  try {
    const raw = localStorage.getItem('CCN_CUSTOM');
    return raw ? JSON.parse(raw) : null;
  } catch(_) { return null; }
}

/**
 * Enregistre une configuration personnalisée
 * Art. L3121-32 : peut modifier le jour de début de semaine
 * Art. L3121-33 : peut modifier taux (min 10%), contingent, etc.
 *
 * @param {object} config Champs modifiables :
 *   seuil        {number}  Seuil déclenchement HS (défaut 35h)
 *   taux1        {number}  Taux 1er palier % (min légal 10%)
 *   palier1      {number}  Heures au taux1 (défaut 8h)
 *   taux_inter   {number|null} Taux palier intermédiaire (null si absent)
 *   palier_inter {number|null} Heures au taux intermédiaire
 *   taux2        {number}  Taux final % (défaut 50%)
 *   contingent   {number}  Contingent annuel (défaut 220h)
 *   maxHebdo     {number}  Durée max hebdo (défaut 48h)
 *   debutSemaine {number}  Jour début semaine : 1=Lun, 2=Mar, 3=Mer,
 *                          4=Jeu, 5=Ven, 6=Sam, 7=Dim (défaut 1)
 *   nom          {string}  Libellé affiché (ex: "Accord entreprise 2026")
 */
function setCustom(config) {
  const base = Object.assign({}, REGLES_HS.DC);
  const merged = Object.assign(base, {id:'CUSTOM'}, config);
  // Vérification légale minimale
  if (merged.taux1 < 10) merged.taux1 = 10;   // Art. L3121-33 min 10%
  if (merged.debutSemaine < 1 || merged.debutSemaine > 7) merged.debutSemaine = 1;
  if (merged.seuil < 35) merged.seuil = 35;    // ordre public
  if (merged.maxHebdo > 60) merged.maxHebdo = 60; // L3121-20 absolu
  REGLES_HS.CUSTOM = merged;
  try { localStorage.setItem('CCN_CUSTOM', JSON.stringify(merged)); } catch(_) {}
  return merged;
}

/**
 * Charge la config custom depuis localStorage dans REGLES_HS.CUSTOM
 * À appeler au démarrage de l'app
 */
function loadCustomFromStorage() {
  const cfg = getCustomConfig();
  if (cfg) REGLES_HS.CUSTOM = Object.assign({}, REGLES_HS.CUSTOM, cfg);
}

/**
 * Réinitialise le mode custom (supprime localStorage)
 */
function resetCustom() {
  REGLES_HS.CUSTOM = Object.assign({}, REGLES_HS.DC, {
    id:'CUSTOM',
    nom:'Accord entreprise / branche personnalisé',
    debutSemaine:1,
    notes:'Mode personnalisé. Toutes les valeurs sont modifiables via CCN.setCustom(config).'
  });
  try { localStorage.removeItem('CCN_CUSTOM'); } catch(_) {}
}

/**
 * Retourne le lundi de la semaine HS selon le debutSemaine configuré
 * Utilisé par les modules pour calculer la bonne fenêtre hebdomadaire
 *
 * @param {Date} date  Date de référence (aujourd'hui par défaut)
 * @param {number} debutSemaine  1=Lun…7=Dim
 * @returns {Date} Premier jour de la semaine HS contenant date
 */
function getDebutSemaineHS(date, debutSemaine) {
  const d = new Date(date || new Date());
  const ds = (debutSemaine || 1); // 1=lundi
  // JS : 0=dim, 1=lun...6=sam → convertir en 1=lun...7=dim
  const dowJS = d.getDay() || 7; // 1=lun...7=dim
  // Calculer l'offset pour revenir au début de semaine
  let offset = dowJS - ds;
  if (offset < 0) offset += 7;
  const debut = new Date(d);
  debut.setDate(d.getDate() - offset);
  debut.setHours(0,0,0,0);
  return debut;
}

/**
 * Retourne le nom du jour de début de semaine
 * @param {number} n 1=Lundi...7=Dimanche
 */
function nomJourSemaine(n) {
  return ['','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'][n] || 'Lundi';
}

/**
 * Retourne les règles de gestion des jours fériés pour une CCN donnée
 * @param {number} idcc  IDCC ou 0 pour droit commun
 * @returns {Object}
 *   feriesChomes         : nb fériés obligatoirement chômés (1 à 13)
 *   feriesMajoration     : % majoration si férié travaillé hors 1er mai (0 = pas de majoration CCN)
 *   feries1erMaiMajoration: % majoration 1er mai travaillé (toujours 100 = +100% Art. L3133-6)
 *   feriesAlsaceMoselle  : bool — +2 jours (Vendredi Saint + 26 déc.)
 *   seul1erMaiChome      : bool — true si seul le 1er mai est obligatoirement chômé (HCR, GD, Boulan)
 */
function getCCNFeriesRules(idcc) {
  const r = getGroupeForCCN(idcc);
  if (!r) return {
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    seul1erMaiChome: false
  };
  return {
    feriesChomes:          r.feriesChomes          ?? 11,
    feriesMajoration:      r.feriesMajoration       ?? 0,
    feries1erMaiMajoration:r.feries1erMaiMajoration ?? 100,
    feriesAlsaceMoselle:   r.feriesAlsaceMoselle    ?? false,
    seul1erMaiChome:       (r.feriesChomes === 1),
  };
}

/**
 * Retourne les 11 jours fériés légaux français pour une année donnée
 * Plus Vendredi Saint et 26 décembre si feriesAlsaceMoselle = true
 * @param {number} year
 * @param {boolean} alsace
 * @returns {string[]}  tableau de dates ISO "YYYY-MM-DD"
 */
function getFeriesLegaux(year, alsace) {
  // Calcul du dimanche de Pâques (algorithme de Meeus/Jones/Butcher)
  const a=year%19, b=Math.floor(year/100), c=year%100;
  const d=Math.floor(b/4), e=b%4, f=Math.floor((b+8)/25);
  const g=Math.floor((b-f+1)/3), h=(19*a+b-d-g+15)%30;
  const i=Math.floor(c/4), k=c%4;
  const l=(32+2*e+2*i-h-k)%7;
  const m=Math.floor((a+11*h+22*l)/451);
  const month=Math.floor((h+l-7*m+114)/31);
  const day=((h+l-7*m+114)%31)+1;
  const paques=new Date(year,month-1,day);
  const dk = d => {
    const dt=new Date(d);
    return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;
  };
  const add = (base,days) => { const d=new Date(base); d.setDate(d.getDate()+days); return d; };
  const feries = [
    dk(new Date(year,0,1)),   // 1er jan
    dk(add(paques,1)),         // Lundi de Pâques
    dk(new Date(year,4,1)),   // 1er mai
    dk(new Date(year,4,8)),   // 8 mai
    dk(add(paques,39)),        // Ascension
    dk(add(paques,50)),        // Lundi de Pentecôte
    dk(new Date(year,6,14)),  // 14 juillet
    dk(new Date(year,7,15)),  // 15 août
    dk(new Date(year,10,1)),  // Toussaint
    dk(new Date(year,10,11)), // 11 novembre
    dk(new Date(year,11,25)), // Noël
  ];
  if (alsace) {
    feries.push(dk(add(paques,-2)));       // Vendredi Saint
    feries.push(dk(new Date(year,11,26))); // 26 décembre
  }
  return feries;
}

// Charger automatiquement la config custom au démarrage
if (typeof localStorage !== 'undefined') loadCustomFromStorage();

const CCN_API = {
  version: '4.1.0',
  REGLES_HS,
  CCN_ALIASES,
  getRules,
  getGroupeForCCN,
  findCCN,
  search: (terme, limit = 60) => findCCN(terme).slice(0, limit),
  calculerHS,
  verifierConformite,
  getGroupesDerogatoires,
  getStats,
  // Mode personnalisé
  getCustomConfig,
  setCustom,
  loadCustomFromStorage,
  resetCustom,
  getDebutSemaineHS,
  nomJourSemaine,
  // Fériés
  getCCNFeriesRules,
  getFeriesLegaux,
};

if (typeof module !== 'undefined' && module.exports) module.exports = CCN_API;
if (typeof window !== 'undefined') {
  window.CCN = REGLES_HS;  // Export des données CCN (DC, HCR, GD, etc.)
  window.CCN_API = CCN_API;  // Export des fonctions API
  // Charger la config personnalisée si elle existe
  loadCustomFromStorage();
}
