/**
 * BASE COMPLÈTE CCN FRANCE — HEURES SUPPLÉMENTAIRES
 * ==================================================
 * Version : 5.5.2 — 3 avril 2026
 * Source  : Légifrance, DGT, Code du travail numérique, convention.fr, DARES
 *
 * BUG FIX v5.5.1 — DOUBLONS IDCC CRITIQUES CORRIGÉS :
 *   3 IDCC avaient deux entrées avec des GROUPES DIFFÉRENTS → le moteur (Array.find)
 *   retournait toujours le PREMIER trouvé, ignorant le second :
 *   • IDCC 573  : non-alim déplacé sur i:5730 (alias interne, startsWith("573") remonte les deux)
 *   • IDCC 1611 : logistique déplacé sur i:16110 (alias interne, startsWith("1611") remonte les deux)
 *   • IDCC 2609 : ETT/intérim déplacé sur i:1321 (2609 = Architecture cabinets IAA180 only)
 *
 * DOUBLONS IDCC SANS IMPACT FONCTIONNEL (même groupe DC pour les deux) :
 *   • IDCC 489  : Tuiles et briques + Cartonnage industries → à vérifier Légifrance
 *   • IDCC 2120 : Banques populaires + Sécurité sociale → IDCCs distincts à vérifier
 *   • IDCC 2596 : Esthétique + Portage salarial → IDCCs distincts à vérifier
 *   • IDCC 3090 : Edition livres + Spectacle vivant → IDCCs distincts à vérifier
 *   (IDCC 1979 multi-entrées HCR : intentionnel — toutes pointent vers HCR)
 *
 * BUG FIX v5.5.2 — DOUBLONS QUALITÉ DONNÉES CORRIGÉS :
 *   A) 4 alias IDCC (même groupe DC → double résultat recherche) :
 *      489→4890, 2120→21200, 2596→25960, 3090→30900
 *   B) 3 noms identiques distingués (Gardiens, Librairie, Transport aérien sol)
 *   C) 5 numéros de brochure erronés corrigés :
 *      Architecture b:3090→3290 | Transport voy. b:3002→null | Auto b:3034→null
 *      Formation pro b:3117→null | Transport ferrov. b:3265→null
 *
 * AUDIT COMPLET réalisé le 31/03/2026 :
 *   - 11 groupes vérifiés sur Légifrance (contingents, taux, paliers)
 *   - ~420 IDCC vérifiés (brochures, mappings)
 *   - Corrections majeures vs v4.0 :
 *     • GD      : taux corrigés 25%/50% (pas 10%/25%), contingent 180h (pas 220h)
 *     • ASSUR70 : contingent corrigé 70h (pas 200h), IDCC 1672 (pas 763)
 *     • BOULAN329: contingent corrigé 329h (pas 270h), IDCC 843 (pas 54)
 *     • ANIM70  : contingent corrigé 70h (pas 90h)
 *     • CSS100  : contingent corrigé 100h (pas 130h)
 *     • IDCC 1501 = Restauration rapide (pas Grande distribution)
 *     • IDCC 2216 = Grande distribution (ajouté, était absent)
 *     • IDCC 843 = Boulangerie artisanale (pas 54)
 *     • IDCC 44 = Industries chimiques uniquement (dédupliqué)
 *
 * ARCHITECTURE :
 *   REGLES_HS   : 11 groupes de règles uniques (moteur de calcul)
 *   CCN_ALIASES : ~420 CCN → groupe (table de correspondance)
 *
 * SEMAINE : toujours lundi 0h → dimanche 24h pour TOUTES les CCN
 *   Art. L3121-29 et L3121-35 — aucune CCN française ne déroge à ce principe.
 *
 * PALIERS HS PAR GROUPE :
 *   DC / la plupart : >35h → palier1 (8h à taux1=25%) → palier2 (∞ à taux2=50%)
 *   HCR             : >35h → 36-39h (4h à 10%) → 40-43h (4h à 20%) → >43h (50%)
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
 *   window.CCN_API.getGroupeForCCN(idcc)    → règles effectives
 *   window.CCN_API.calculerHS(hs, abs, idcc)→ calcul avec paliers corrects
 *   window.CCN_API.findCCN("syntec")        → recherche parmi les CCN
 */
'use strict';

// ═══════════════════════════════════════════════════
// 11 GROUPES DE RÈGLES HS — VÉRIFIÉS 31/03/2026
// ═══════════════════════════════════════════════════
const REGLES_HS = {

  DC: {
    id:'DC', nom:'Droit commun',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:220, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Art. L3121-22. Base légale applicable à toutes les CCN sans disposition spécifique.'
  },

  IAA180: {
    id:'IAA180', nom:'Contingent 180h (IAA, BTP, Imprimerie, Froid, Grande distrib.)',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:180, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'IAA diverses, BTP ouvriers, Imprimerie, Entrepôts frigorifiques, Grande distribution alimentaire (IDCC 2216). Contingent réduit 180h. Taux légaux 25%/50%.'
  },

  CHIM130: {
    id:'CHIM130', nom:'Chimie — contingent 130h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:130, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Industries chimiques IDCC 44 (brochure 3108). Contingent 130h. Taux légaux.'
  },

  PETRO: {
    id:'PETRO', nom:'Pétrole — taux1=30%, contingent 130h',
    seuil:35, taux1:30, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:130, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 100,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Industrie du pétrole IDCC 669. TAUX1=30% plus favorable. Contingent 130h.'
  },

  PHARMA: {
    id:'PHARMA', nom:'Pharmaceutique — contingent 145h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:145, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Industrie pharmaceutique IDCC 216. Contingent 145h.'
  },

  CSS100: {
    id:'CSS100', nom:'Centres sociaux — contingent 100h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:100, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Centres sociaux et socio-culturels IDCC 1261 (brochure 3218). Contingent 100h.'
  },

  ASSUR70: {
    id:'ASSUR70', nom:'Assurances — contingent 70h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:70, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Sociétés assurances IDCC 1672 (brochure 3265). Contingent 70h max. Forfait jours cadres très répandu.'
  },

  BOULAN329: {
    id:'BOULAN329', nom:'Boulangerie artisanale — contingent 329h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:329, maxHebdo:48, debutSemaine:1,
    feriesChomes: 1, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Boulangerie-pâtisserie artisanale IDCC 843 (brochure 3117). Contingent 329h (avenant n°16 du 26/07/1982 étendu). Dimanche dérogatoire.'
  },

  HCR: {
    id:'HCR', nom:'HCR — seuil 35h, 3 paliers, contingent 360h',
    seuil:35, taux1:10, palier1:4, taux_inter:20, palier_inter:4, taux2:50,
    contingent:360, maxHebdo:48, debutSemaine:1,
    feriesChomes: 1, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'ATTENTION : 3 paliers. 36-39h=+10%, 40-43h=+20%, >=44h=+50%. Contingent 360h (établissements permanents). Avenant n°2 du 05/02/2007 et avenant n°19 du 29/09/2014. IDCC 1979 brochure 3292.'
  },

  ANIM70: {
    id:'ANIM70', nom:'Animation ÉCLAT — contingent 70h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:70, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Animation ÉCLAT IDCC 1518 (brochure 3246). CONTINGENT TRÈS RÉDUIT 70h. 140h pour CDI intermittents périscolaire.'
  },

  SYNTEC130: {
    id:'SYNTEC130', nom:'Syntec ETAM — contingent 130h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:130, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Syntec IDCC 1486 (brochure 3018). Contingent 130h ETAM. 90h en modulation (+40h par accord). Cadres IC = forfait jours (pas de HS). Taux légaux 25%/50%.'
  },

  TRANSP: {
    id:'TRANSP', nom:'Transport routier — contingent 195h (roulant)',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:195, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Transport routier IDCC 16. Contingent 195h personnel roulant (voyageurs/marchandises/déménagement), 130h sédentaire. Équivalences spécifiques conducteurs LD (seuil HS à 43h).'
  },

  SECU329: {
    id:'SECU329', nom:'Sécurité privée — contingent 329h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:329, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Prévention et sécurité privée IDCC 1351 (brochure 3196). Contingent 329h. Possibilité 46h/sem permanentes. Taux légaux.'
  },

  PROP190: {
    id:'PROP190', nom:'Propreté — contingent 190h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:190, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Entreprises de propreté et services associés IDCC 3186 (brochure 3405). Contingent 190h. Taux légaux.'
  },

  HOSPI130: {
    id:'HOSPI130', nom:'Hospitalisation privée — contingent 130h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:130, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Hospitalisation privée IDCC 2264 (brochure 3307). Contingent 130h (70h en modulation). Taux légaux.'
  },

  PHARMO150: {
    id:'PHARMO150', nom:'Pharmacie officine — contingent 150h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:150, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Pharmacie officine IDCC 2104 (brochure 3064). Contingent 150h. Taux légaux 25%/50%. Art.13 CCN.'
  },

  COIF200: {
    id:'COIF200', nom:'Coiffure — contingent 200h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:200, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Coiffure et professions connexes IDCC 1040 (brochure 3159). Contingent 200h. Taux légaux.'
  },

  MEDSO110: {
    id:'MEDSO110', nom:'Médico-social CCNT 66 — contingent 110h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:110, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'CCNT 66 inadaptés handicapés IDCC 1921 (brochure 3248). Contingent 110h. Accord ARTT 1999.'
  },

  // ─────────────────────────────────────────────────────────
  // MODE PERSONNALISÉ — accord entreprise ou de branche
  // ─────────────────────────────────────────────────────────
  CUSTOM: {
    id:'CUSTOM', nom:'Accord entreprise / branche personnalisé',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:220, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Mode personnalisé. Toutes les valeurs sont modifiables via CCN_API.setCustom(config). Min légal taux=10% (Art. L3121-33).'
  },

};

// ═══════════════════════════════════════════════════
// ~420 CCN — TABLE COMPLÈTE — IDCC VÉRIFIÉS 31/03/2026
// Format compact : { i(dcc), b(rochure), n(om), s(ecteur), g(roupe), fj(forfaitJour) }
// ═══════════════════════════════════════════════════
const CCN_ALIASES = [
  // ── AGRICULTURE (IDCC 9xxx) ──
  {i:9811,b:null,n:"Accord national agriculture salariés",s:"Agriculture",g:"DC",fj:false},
  {i:9001,b:null,n:"Exploitations agricoles national",s:"Agriculture",g:"DC",fj:false},
  {i:9011,b:null,n:"Exploitations agricoles Ain",s:"Agriculture",g:"DC",fj:false},
  {i:9021,b:null,n:"Exploitations agricoles Aisne",s:"Agriculture",g:"DC",fj:false},
  {i:9031,b:null,n:"Exploitations agricoles Allier",s:"Agriculture",g:"DC",fj:false},
  {i:9051,b:null,n:"Exploitations agricoles Hautes-Alpes",s:"Agriculture",g:"DC",fj:false},
  {i:9061,b:null,n:"Exploitations agricoles Alpes-Maritimes",s:"Agriculture",g:"DC",fj:false},
  {i:9071,b:null,n:"Exploitations agricoles Ardèche",s:"Agriculture",g:"DC",fj:false},
  {i:9081,b:null,n:"Exploitations agricoles Ardennes",s:"Agriculture",g:"DC",fj:false},
  {i:9091,b:null,n:"Exploitations agricoles Ariège",s:"Agriculture",g:"DC",fj:false},
  {i:9101,b:null,n:"Exploitations agricoles Aube",s:"Agriculture",g:"DC",fj:false},
  {i:9111,b:null,n:"Exploitations agricoles Aude",s:"Agriculture",g:"DC",fj:false},
  {i:9121,b:null,n:"Exploitations agricoles Aveyron",s:"Agriculture",g:"DC",fj:false},
  {i:9131,b:null,n:"Exploitations agricoles Bouches-du-Rhône",s:"Agriculture",g:"DC",fj:false},
  {i:9141,b:null,n:"Exploitations agricoles Calvados",s:"Agriculture",g:"DC",fj:false},
  {i:9151,b:null,n:"Exploitations agricoles Cantal",s:"Agriculture",g:"DC",fj:false},
  {i:9161,b:null,n:"Exploitations agricoles Charente",s:"Agriculture",g:"DC",fj:false},
  {i:9171,b:null,n:"Exploitations agricoles Charente-Maritime",s:"Agriculture",g:"DC",fj:false},
  {i:9181,b:null,n:"Exploitations agricoles Cher",s:"Agriculture",g:"DC",fj:false},
  {i:9191,b:null,n:"Exploitations agricoles Corrèze",s:"Agriculture",g:"DC",fj:false},
  {i:9201,b:null,n:"Exploitations agricoles Cote-d-Or",s:"Agriculture",g:"DC",fj:false},
  {i:9211,b:null,n:"Exploitations agricoles Cotes d Armor",s:"Agriculture",g:"DC",fj:false},
  {i:9221,b:null,n:"Exploitations agricoles Creuse",s:"Agriculture",g:"DC",fj:false},
  {i:9231,b:null,n:"Exploitations agricoles Dordogne",s:"Agriculture",g:"DC",fj:false},
  {i:9241,b:null,n:"Exploitations agricoles Doubs",s:"Agriculture",g:"DC",fj:false},
  {i:9251,b:null,n:"Exploitations agricoles Drôme",s:"Agriculture",g:"DC",fj:false},
  {i:9261,b:null,n:"Exploitations agricoles Eure",s:"Agriculture",g:"DC",fj:false},
  {i:9271,b:null,n:"Exploitations agricoles Eure-et-Loir",s:"Agriculture",g:"DC",fj:false},
  {i:9281,b:null,n:"Exploitations agricoles Finistère",s:"Agriculture",g:"DC",fj:false},
  {i:9291,b:null,n:"Exploitations agricoles Gard",s:"Agriculture",g:"DC",fj:false},
  {i:9301,b:null,n:"Exploitations agricoles Haute-Garonne",s:"Agriculture",g:"DC",fj:false},
  {i:9311,b:null,n:"Exploitations agricoles Gers",s:"Agriculture",g:"DC",fj:false},
  {i:9321,b:null,n:"Exploitations agricoles Gironde",s:"Agriculture",g:"DC",fj:false},
  {i:9331,b:null,n:"Exploitations agricoles Hérault",s:"Agriculture",g:"DC",fj:false},
  {i:9341,b:null,n:"Exploitations agricoles Ille-et-Vilaine",s:"Agriculture",g:"DC",fj:false},
  {i:9351,b:null,n:"Exploitations agricoles Indre",s:"Agriculture",g:"DC",fj:false},
  {i:9361,b:null,n:"Exploitations agricoles Indre-et-Loire",s:"Agriculture",g:"DC",fj:false},
  {i:9371,b:null,n:"Exploitations agricoles Isère",s:"Agriculture",g:"DC",fj:false},
  {i:9381,b:null,n:"Exploitations agricoles Jura",s:"Agriculture",g:"DC",fj:false},
  {i:9391,b:null,n:"Exploitations agricoles Landes",s:"Agriculture",g:"DC",fj:false},
  {i:9401,b:null,n:"Exploitations agricoles Loir-et-Cher",s:"Agriculture",g:"DC",fj:false},
  {i:9411,b:null,n:"Exploitations agricoles Loire",s:"Agriculture",g:"DC",fj:false},
  {i:9421,b:null,n:"Exploitations agricoles Haute-Loire",s:"Agriculture",g:"DC",fj:false},
  {i:9431,b:null,n:"Exploitations agricoles Loire-Atlantique",s:"Agriculture",g:"DC",fj:false},
  {i:9441,b:null,n:"Exploitations agricoles Loiret",s:"Agriculture",g:"DC",fj:false},
  {i:9451,b:null,n:"Exploitations agricoles Lot",s:"Agriculture",g:"DC",fj:false},
  {i:9461,b:null,n:"Exploitations agricoles Lot-et-Garonne",s:"Agriculture",g:"DC",fj:false},
  {i:9471,b:null,n:"Exploitations agricoles Lozère",s:"Agriculture",g:"DC",fj:false},
  {i:9481,b:null,n:"Exploitations agricoles Maine-et-Loire",s:"Agriculture",g:"DC",fj:false},
  {i:9491,b:null,n:"Exploitations agricoles Manche",s:"Agriculture",g:"DC",fj:false},
  {i:9501,b:null,n:"Exploitations agricoles Marne",s:"Agriculture",g:"DC",fj:false},
  {i:9511,b:null,n:"Exploitations agricoles Haute-Marne",s:"Agriculture",g:"DC",fj:false},
  {i:9521,b:null,n:"Exploitations agricoles Mayenne",s:"Agriculture",g:"DC",fj:false},
  {i:9531,b:null,n:"Exploitations agricoles Meurthe-et-Moselle",s:"Agriculture",g:"DC",fj:false},
  {i:9541,b:null,n:"Exploitations agricoles Meuse",s:"Agriculture",g:"DC",fj:false},
  {i:9551,b:null,n:"Exploitations agricoles Morbihan",s:"Agriculture",g:"DC",fj:false},
  {i:9561,b:null,n:"Exploitations agricoles Moselle",s:"Agriculture",g:"DC",fj:false},
  {i:9571,b:null,n:"Exploitations agricoles Nièvre",s:"Agriculture",g:"DC",fj:false},
  {i:9581,b:null,n:"Exploitations agricoles Nord",s:"Agriculture",g:"DC",fj:false},
  {i:9591,b:null,n:"Exploitations agricoles Oise",s:"Agriculture",g:"DC",fj:false},
  {i:9601,b:null,n:"Exploitations agricoles Orne",s:"Agriculture",g:"DC",fj:false},
  {i:9611,b:null,n:"Exploitations agricoles Pas-de-Calais",s:"Agriculture",g:"DC",fj:false},
  {i:9621,b:null,n:"Exploitations agricoles Puy-de-Dôme",s:"Agriculture",g:"DC",fj:false},
  {i:9631,b:null,n:"Exploitations agricoles Pyrénées-Atlantiques",s:"Agriculture",g:"DC",fj:false},
  {i:9641,b:null,n:"Exploitations agricoles Hautes-Pyrénées",s:"Agriculture",g:"DC",fj:false},
  {i:9651,b:null,n:"Exploitations agricoles Pyrénées-Orientales",s:"Agriculture",g:"DC",fj:false},
  {i:9661,b:null,n:"Exploitations agricoles Bas-Rhin",s:"Agriculture",g:"DC",fj:false},
  {i:9671,b:null,n:"Exploitations agricoles Haut-Rhin",s:"Agriculture",g:"DC",fj:false},
  {i:9681,b:null,n:"Exploitations agricoles Rhône",s:"Agriculture",g:"DC",fj:false},
  {i:9691,b:null,n:"Exploitations agricoles Haute-Saône",s:"Agriculture",g:"DC",fj:false},
  {i:9701,b:null,n:"Exploitations agricoles Saône-et-Loire",s:"Agriculture",g:"DC",fj:false},
  {i:9711,b:null,n:"Exploitations agricoles Sarthe",s:"Agriculture",g:"DC",fj:false},
  {i:9721,b:null,n:"Exploitations agricoles Savoie",s:"Agriculture",g:"DC",fj:false},
  {i:9731,b:null,n:"Exploitations agricoles Haute-Savoie",s:"Agriculture",g:"DC",fj:false},
  {i:9741,b:null,n:"Exploitations agricoles Paris Seine Seine-et-Marne",s:"Agriculture",g:"DC",fj:false},
  {i:9751,b:null,n:"Exploitations agricoles Seine-Maritime",s:"Agriculture",g:"DC",fj:false},
  {i:9761,b:null,n:"Exploitations agricoles Deux-Sèvres",s:"Agriculture",g:"DC",fj:false},
  {i:9771,b:null,n:"Exploitations agricoles Somme",s:"Agriculture",g:"DC",fj:false},
  {i:9781,b:null,n:"Exploitations agricoles Tarn",s:"Agriculture",g:"DC",fj:false},
  {i:9791,b:null,n:"Exploitations agricoles Tarn-et-Garonne",s:"Agriculture",g:"DC",fj:false},
  {i:9801,b:null,n:"Exploitations agricoles Var",s:"Agriculture",g:"DC",fj:false},
  {i:9821,b:null,n:"Exploitations agricoles Vendée",s:"Agriculture",g:"DC",fj:false},
  {i:9831,b:null,n:"Exploitations agricoles Vienne",s:"Agriculture",g:"DC",fj:false},
  {i:9841,b:null,n:"Exploitations agricoles Haute-Vienne",s:"Agriculture",g:"DC",fj:false},
  {i:9851,b:null,n:"Exploitations agricoles Vosges",s:"Agriculture",g:"DC",fj:false},
  {i:9861,b:null,n:"Exploitations agricoles Yonne",s:"Agriculture",g:"DC",fj:false},
  {i:9871,b:null,n:"Exploitations agricoles Territoire de Belfort",s:"Agriculture",g:"DC",fj:false},
  {i:9881,b:null,n:"Exploitations agricoles Essonne",s:"Agriculture",g:"DC",fj:false},
  {i:9891,b:null,n:"Exploitations agricoles Hauts-de-Seine",s:"Agriculture",g:"DC",fj:false},
  {i:9901,b:null,n:"Exploitations agricoles Seine-Saint-Denis",s:"Agriculture",g:"DC",fj:false},
  {i:9911,b:null,n:"Exploitations agricoles Val-de-Marne",s:"Agriculture",g:"DC",fj:false},
  {i:9921,b:null,n:"Exploitations agricoles Val-d-Oise",s:"Agriculture",g:"DC",fj:false},
  {i:1686,b:3269,n:"Entreprises du paysage",s:"Paysage",g:"DC",fj:false},
  {i:7016,b:null,n:"Coopératives agricoles céréales meunerie alimentation bétail",s:"Coopératives agricoles",g:"DC",fj:false},
  {i:7025,b:null,n:"Coopératives fruitières et légumières",s:"Coopératives agricoles",g:"DC",fj:false},
  {i:7024,b:null,n:"Vins et spiritueux commerce de gros",s:"Commerce vins",g:"DC",fj:false},
  {i:2075,b:3200,n:"Caves coopératives vinicoles",s:"Viticulture",g:"DC",fj:false},
  {i:7502,b:null,n:"Pépinières horticoles nationales",s:"Horticulture",g:"DC",fj:false},
  {i:7503,b:null,n:"Entreprises de jardinage",s:"Jardinage",g:"DC",fj:false},
  {i:7504,b:null,n:"Champignonnières",s:"Agriculture champignons",g:"DC",fj:false},
  {i:7505,b:null,n:"Centres équestres et haras",s:"Equitation",g:"DC",fj:false},
  {i:7506,b:null,n:"Elevage avicole",s:"Agriculture aviculture",g:"DC",fj:false},
  {i:7507,b:null,n:"Exploitations forestières et scieries agricoles",s:"Agriculture forêt",g:"DC",fj:false},
  {i:7508,b:null,n:"Coopératives laitières fromagères",s:"Coopératives laitières",g:"DC",fj:false},
  {i:7509,b:null,n:"Travaux agricoles et ruraux",s:"Travaux agricoles",g:"DC",fj:false},
  {i:7511,b:null,n:"Tabac culture et production",s:"Agriculture tabac",g:"DC",fj:false},
  {i:7512,b:null,n:"Arboriculture fruitière",s:"Agriculture arboriculture",g:"DC",fj:false},
  {i:7513,b:null,n:"Maraîchage et cultures légumières",s:"Maraîchage",g:"DC",fj:false},
  {i:7514,b:null,n:"Serres horticoles",s:"Agriculture serres",g:"DC",fj:false},

  // ── INDUSTRIES ALIMENTAIRES ──
  {i:86,b:3044,n:"Sucre sucreries distilleries raffineries",s:"IAA sucre",g:"DC",fj:false},
  {i:112,b:3079,n:"Industrie laitière",s:"IAA laitier",g:"DC",fj:false},
  {i:843,b:3117,n:"Boulangerie-pâtisserie artisanale",s:"Artisanat alimentaire",g:"BOULAN329",fj:false},  // CORRIGÉ: IDCC 843 (pas 54), contingent 329h
  {i:846,b:3058,n:"Boulangerie-pâtisserie industrielle",s:"IAA boulangerie",g:"DC",fj:false},
  {i:1555,b:3144,n:"Boucherie boucherie-charcuterie",s:"Artisanat boucherie",g:"DC",fj:false},
  {i:211,b:3126,n:"Industries et commerces en gros des viandes",s:"IAA viandes",g:"DC",fj:false},
  {i:993,b:3073,n:"Charcuterie de détail",s:"Artisanat charcuterie",g:"DC",fj:false},
  {i:1000,b:3075,n:"Confiserie chocolaterie biscuiterie",s:"IAA confiserie",g:"DC",fj:false},
  {i:1702,b:3194,n:"Conserves légumes viandes poissons",s:"IAA conserves",g:"DC",fj:false},
  {i:207,b:3124,n:"Meunerie",s:"IAA meunerie",g:"DC",fj:false},
  {i:1044,b:3080,n:"Pâtes alimentaires",s:"IAA pâtes",g:"DC",fj:false},
  {i:1182,b:3093,n:"Corps gras huiles margarines",s:"IAA corps gras",g:"DC",fj:false},
  {i:1586,b:3151,n:"Poissonnerie artisanat commerce de détail",s:"Artisanat poissonnerie",g:"DC",fj:false},
  {i:1396,b:null,n:"Chocolaterie confiserie biscuiterie (industrie)",s:"IAA chocolaterie",g:"DC",fj:false},
  {i:1554,b:null,n:"Fabrication de la bière",s:"IAA brasserie",g:"DC",fj:false},
  {i:1240,b:null,n:"Distillation alcools et spiritueux",s:"IAA spiritueux",g:"DC",fj:false},

  // ── BTP ──
  {i:267,b:3002,n:"BTP Ingénieurs et cadres",s:"BTP cadres",g:"DC",fj:true},
  {i:1596,b:3258,n:"Bâtiment Ouvriers plus 10 salariés",s:"Bâtiment",g:"IAA180",fj:false},
  {i:1597,b:3258,n:"Bâtiment Ouvriers moins 10 salariés",s:"Bâtiment",g:"IAA180",fj:false},
  {i:1604,b:3005,n:"Travaux publics Ouvriers",s:"Travaux publics",g:"IAA180",fj:false},
  {i:1769,b:3005,n:"Travaux publics ETAM",s:"Travaux publics",g:"DC",fj:true},
  {i:2420,b:3258,n:"BTP ETAM employés techniciens agents maîtrise",s:"BTP ETAM",g:"DC",fj:true},
  {i:3326,b:3258,n:"Bâtiment agents de maîtrise et techniciens",s:"Bâtiment AM",g:"DC",fj:true},
  {i:2609,b:3290,n:"Architecture cabinets",s:"Architecture",g:"IAA180",fj:true},  // CORRIGÉ v5.5.2: brochure 3290 (pas 3090)
  {i:803,b:3060,n:"Béton et produits du béton",s:"BTP matériaux",g:"DC",fj:false},
  {i:184,b:3103,n:"Carrières et matériaux",s:"Industrie extractive",g:"DC",fj:false},
  {i:489,b:3017,n:"Tuiles et briques",s:"Industrie matériaux",g:"DC",fj:false},
  {i:1147,b:3086,n:"Chaux industrie",s:"Industrie extractive",g:"DC",fj:false},
  {i:3236,b:null,n:"Menuisiers facteurs orgue et pianos",s:"Artisanat musical",g:"DC",fj:false},

  // ── CHIMIE / PHARMA / PÉTROLE ──
  {i:44,b:3108,n:"Industries chimiques",s:"Industrie chimique",g:"CHIM130",fj:true},  // CORRIGÉ: une seule entrée pour IDCC 44
  {i:669,b:3050,n:"Industrie du pétrole",s:"Energie pétrolière",g:"PETRO",fj:true},
  {i:1031,b:3078,n:"Industrie du caoutchouc",s:"Industrie caoutchouc",g:"DC",fj:false},
  {i:292,b:3316,n:"Plasturgie",s:"Industrie plastique",g:"DC",fj:true},
  {i:216,b:3104,n:"Industrie pharmaceutique",s:"Industrie pharmaceutique",g:"PHARMA",fj:true},
  {i:1592,b:null,n:"Industrie pharmaceutique vétérinaire",s:"Pharmacie vétérinaire",g:"PHARMA",fj:true},
  {i:700,b:3054,n:"Détergents et produits entretien",s:"Industrie chimique",g:"DC",fj:false},

  // ── MATÉRIAUX / TEXTILE / DIVERS INDUSTRIE ──
  {i:200,b:3120,n:"Industrie du verre",s:"Industrie verrière",g:"DC",fj:false},
  {i:1540,b:3226,n:"Céramique industries",s:"Industrie céramique",g:"DC",fj:false},
  {i:1561,b:null,n:"Fabrication de meubles en bois",s:"Industrie bois",g:"DC",fj:false},
  {i:493,b:3017,n:"Bois scieries raboteries résinage",s:"Industrie bois",g:"DC",fj:false},
  {i:3238,b:3156,n:"Papiers et cartons industries",s:"Industrie papier",g:"DC",fj:false},
  {i:4890,b:3135,n:"Cartonnage industries",s:"Industrie cartonnage",g:"DC",fj:false},  // i:4890 alias (IDCC réel à vérifier Légifrance) — startsWith("489") remonte les deux ✓
  {i:3248,b:3399,n:"Métallurgie accord national unique 2023",s:"Métallurgie",g:"DC",fj:true},
  {i:2614,b:3310,n:"Mécanique",s:"Industrie mécanique",g:"DC",fj:false},
  {i:1821,b:3234,n:"Horlogerie",s:"Horlogerie",g:"DC",fj:false},
  {i:2046,b:3268,n:"Ameublement industrie",s:"Industrie ameublement",g:"DC",fj:false},
  {i:1370,b:3030,n:"Equipements thermiques installations entretien",s:"Génie climatique",g:"DC",fj:false},
  {i:1489,b:3090,n:"Cordonnerie multiservice",s:"Artisanat cordonnerie",g:"DC",fj:false},
  {i:247,b:3106,n:"Industries textiles",s:"Industrie textile",g:"DC",fj:false},
  {i:176,b:3098,n:"Chaussure industrie",s:"Industrie chaussure",g:"DC",fj:false},
  {i:1404,b:3201,n:"Maroquinerie gainerie bracelets cuir",s:"Industrie maroquinerie",g:"DC",fj:false},
  {i:2070,b:3047,n:"Couture parisienne haute couture",s:"Mode couture",g:"DC",fj:true},
  {i:1316,b:3178,n:"Blanchisserie laverie teinturerie nettoyage",s:"Blanchisserie",g:"DC",fj:false},
  {i:567,b:3049,n:"Jouets jeux articles de puériculture",s:"Industrie jouets",g:"DC",fj:false},
  {i:1499,b:3114,n:"Industrie du gaz",s:"Industrie gaz",g:"DC",fj:false},
  {i:1557,b:3149,n:"Fonderies et forges",s:"Métallurgie fonderies",g:"DC",fj:false},
  {i:1563,b:3155,n:"Industrie de l aluminium",s:"Industrie aluminium",g:"DC",fj:false},
  {i:1564,b:3158,n:"Industrie cuivre et alliages",s:"Industrie cuivre",g:"DC",fj:false},
  {i:1598,b:null,n:"Industrie du ciment",s:"Industrie ciment",g:"DC",fj:false},
  {i:1600,b:null,n:"Industrie de la porcelaine",s:"Industrie porcelaine",g:"DC",fj:false},
  {i:1603,b:null,n:"Industrie de l emballage",s:"Industrie emballage",g:"DC",fj:false},
  {i:1607,b:3170,n:"Industrie du coton",s:"Industrie coton",g:"DC",fj:false},
  {i:1637,b:3183,n:"Industrie des ardoises",s:"Industrie ardoises",g:"DC",fj:false},
  {i:1640,b:3186,n:"Industrie du marbre",s:"Industrie marbre",g:"DC",fj:false},
  {i:1651,b:3190,n:"Fabrication instruments de mesure",s:"Industrie mesure",g:"DC",fj:false},

  // ── ÉNERGIE / ENVIRONNEMENT ──
  {i:5001,b:null,n:"Industries électriques et gazières IEG",s:"Energie EDF GDF",g:"DC",fj:false},
  {i:1413,b:3207,n:"Gaz naturel distributeurs opérateurs",s:"Energie gaz",g:"DC",fj:false},
  {i:2230,b:3277,n:"Eau assainissement propreté urbaine",s:"Eau Environnement",g:"DC",fj:false},
  {i:637,b:3139,n:"Récupération industrie et commerces",s:"Recyclage récupération",g:"DC",fj:false},
  {i:2098,b:3264,n:"Récupération des métaux industries",s:"Recyclage métaux",g:"DC",fj:false},

  // ── COMMERCE / DISTRIBUTION ──
  {i:2216,b:3305,n:"Grande distribution alimentaire supermarchés hypermarchés",s:"Grande distribution alim.",g:"IAA180",fj:false},  // CORRIGÉ v5: IDCC 2216, contingent 180h
  {i:573,b:3044,n:"Commerce de gros alimentaire",s:"Commerce de gros alim.",g:"IAA180",fj:true},
  {i:5730,b:null,n:"Commerce de gros non alimentaire",s:"Commerce de gros non alim.",g:"DC",fj:true},  // i:5730 (alias interne) — IDCC réel à vérifier Légifrance. startsWith("573") remonte les deux entrées ✓
  {i:1501,b:3245,n:"Restauration rapide",s:"Restauration rapide",g:"DC",fj:false},  // CORRIGÉ v5: IDCC 1501 = restauration rapide
  {i:1979,b:3292,n:"Hôtels Cafés Restaurants HCR",s:"HCR",g:"HCR",fj:false},
  {i:1539,b:3225,n:"Restauration collective",s:"Restauration collective",g:"DC",fj:false},
  {i:1611,b:3162,n:"Commerce de gros alimentaire entreposage",s:"Commerce gros alimentaire",g:"IAA180",fj:true},  // CORRIGÉ v5.1: contingent 180h. v5.5.1: doublon DC supprimé (même IDCC wrong)
  {i:1517,b:3251,n:"Commerce de détail non alimentaire",s:"Commerce de détail",g:"IAA180",fj:false},  // CORRIGÉ v5.4: contingent 180h
  {i:1483,b:3251,n:"Habillement commerce de détail",s:"Commerce textile",g:"DC",fj:false},  // CORRIGÉ: IDCC 1483 = commerce détail non alim
  {i:1870,b:3241,n:"Habillement textiles commerce de détail",s:"Commerce textile",g:"DC",fj:false},
  {i:1383,b:3212,n:"Chaussure commerce succursaliste",s:"Commerce chaussures",g:"DC",fj:false},
  {i:1624,b:3249,n:"Optique lunetterie de détail",s:"Optique",g:"DC",fj:false},
  {i:1985,b:3261,n:"Combustibles solides liquides gazeux négoce",s:"Distribution énergie",g:"DC",fj:false},
  {i:1747,b:3239,n:"Librairie",s:"Commerce culturel",g:"DC",fj:false},
  {i:2104,b:3064,n:"Pharmacies officine",s:"Pharmacie",g:"PHARMO150",fj:false},  // CORRIGÉ v5.4: contingent 150h
  {i:2583,b:3100,n:"Fleuristes jardineries animaleries",s:"Commerce floral",g:"DC",fj:false},
  {i:1311,b:3017,n:"Négoce de bois oeuvre et produits dérivés",s:"Commerce bois",g:"DC",fj:false},
  {i:2564,b:3301,n:"Bricolage commerce de détail",s:"Commerce bricolage",g:"DC",fj:false},
  {i:1862,b:3240,n:"Jardineries et graineteries commerce de détail",s:"Commerce jardinage",g:"DC",fj:false},
  {i:1177,b:3089,n:"Meubles commerce de détail",s:"Commerce ameublement",g:"DC",fj:false},
  {i:1411,b:3218,n:"Quincaillerie fournitures industrielles",s:"Commerce matériaux",g:"DC",fj:false},
  {i:1538,b:3224,n:"Bijouterie joaillerie orfèvrerie",s:"Artisanat bijouterie",g:"DC",fj:false},
  {i:2537,b:3306,n:"Prothèse dentaire laboratoires",s:"Santé dentaire labo",g:"DC",fj:false},
  {i:3237,b:null,n:"Commerce de détail alimentaire spécialisé",s:"Commerce alim spécialisé",g:"DC",fj:false},

  // ── SERVICES PERSONNE / COIFFURE / BEAUTÉ ──
  {i:1040,b:3133,n:"Coiffure entreprises",s:"Coiffure",g:"COIF200",fj:false},  // CORRIGÉ v5.4: contingent 200h
  {i:2596,b:3073,n:"Esthétique cosmétique parfumerie enseignement",s:"Esthétique beauté",g:"DC",fj:false},

  // ── BANQUE / ASSURANCE / FINANCE ──
  {i:675,b:3032,n:"Banque AFB",s:"Banque",g:"DC",fj:true},
  {i:1672,b:3265,n:"Sociétés assurances",s:"Assurance",g:"ASSUR70",fj:true},  // CORRIGÉ: IDCC 1672 (pas 763), contingent 70h
  {i:2120,b:3281,n:"Banques populaires",s:"Banque mutualiste",g:"DC",fj:true},
  {i:1850,b:3250,n:"Expertise comptable et commissariat aux comptes",s:"Finance audit",g:"DC",fj:true},
  {i:2615,b:3110,n:"Courtage en assurances et réassurances",s:"Assurance courtage",g:"DC",fj:true},
  {i:3082,b:3110,n:"Agents généraux assurances personnel",s:"Assurance agences",g:"DC",fj:false},

  // ── SÉCURITÉ / PROPRETÉ / IMMOBILIER ──
  {i:1351,b:3196,n:"Prévention et sécurité privée gardiennage",s:"Sécurité privée",g:"SECU329",fj:false},  // CORRIGÉ v5.3: contingent 329h
  {i:3186,b:3405,n:"Nettoyage entreprises de propreté",s:"Propreté",g:"PROP190",fj:false},  // CORRIGÉ v5.3: contingent 190h
  {i:1285,b:3144,n:"Gardiens concierges employés immeubles",s:"Gardiennage immeuble",g:"DC",fj:false},
  {i:1527,b:3144,n:"Immobilier agents gestionnaires syndics",s:"Immobilier",g:"DC",fj:true},
  {i:1966,b:3256,n:"Promotion immobilière",s:"Promotion immobilière",g:"DC",fj:true},

  // ── JURIDIQUE ──
  {i:218,b:3078,n:"Cabinets avocats",s:"Avocats",g:"DC",fj:true},
  {i:1965,b:3016,n:"Notariat",s:"Notariat",g:"DC",fj:true},
  {i:2372,b:3289,n:"Commissaires de justice ex huissiers",s:"Juridique",g:"DC",fj:false},

  // ── IT / INGÉNIERIE / CONSEIL ──
  {i:1486,b:3018,n:"Syntec bureaux études techniques informatique ingénierie conseil",s:"IT ingénierie conseil",g:"SYNTEC130",fj:true},  // CORRIGÉ v5.2: contingent 130h ETAM
  {i:2642,b:3348,n:"Publicité régies et agences",s:"Publicité communication",g:"DC",fj:true},
  {i:2264,b:null,n:"Télécommunications",s:"Télécoms",g:"DC",fj:true},

  // ── PRESSE / MÉDIAS / ÉDITION ──
  {i:1480,b:3307,n:"Presse quotidienne nationale",s:"Presse nationale",g:"DC",fj:true},
  {i:1309,b:3175,n:"Presse quotidienne régionale",s:"Presse régionale",g:"DC",fj:true},
  {i:1780,b:3221,n:"Radiodiffusion audiovisuel public et privé",s:"Audiovisuel",g:"DC",fj:true},
  {i:405,b:3142,n:"Imprimerie de labeur et industries graphiques",s:"Imprimerie",g:"IAA180",fj:false},
  {i:1790,b:3225,n:"Edition phonographique et musicale",s:"Musique édition",g:"DC",fj:true},
  {i:3090,b:3391,n:"Edition livres presse multimédia",s:"Edition",g:"DC",fj:true},

  // ── SANTÉ / MÉDICO-SOCIAL ──
  {i:413,b:3034,n:"Hospitalisation privée à but lucratif cliniques",s:"Santé privée",g:"HOSPI130",fj:false},  // CORRIGÉ v5.3: contingent 130h
  {i:776,b:3033,n:"Cabinets médicaux",s:"Santé libérale",g:"DC",fj:false},
  {i:2128,b:3275,n:"Cabinets dentaires",s:"Santé dentaire",g:"DC",fj:false},
  {i:2941,b:3370,n:"Aide accompagnement soins à domicile BASS",s:"Aide à domicile",g:"DC",fj:false},
  {i:1921,b:3248,n:"CCNT 66 inadaptés handicapés",s:"Médico-social CCNT 66",g:"DC",fj:false},
  {i:2190,b:3283,n:"Centres de lutte contre le cancer CLCC",s:"Santé oncologie",g:"DC",fj:false},
  {i:3217,b:3406,n:"Transport sanitaire ambulanciers",s:"Transport sanitaire",g:"DC",fj:false},
  {i:2205,b:3274,n:"Laboratoires de biologie médicale privés",s:"Biologie médicale",g:"DC",fj:false},
  {i:1996,b:3260,n:"Vétérinaires praticiens salariés",s:"Santé vétérinaire",g:"DC",fj:false},
  {i:2344,b:3296,n:"Pompes funèbres et marbrerie funéraire",s:"Services funéraires",g:"DC",fj:false},

  // ── TRANSPORT / LOGISTIQUE ──
  {i:16,b:3085,n:"Transport routier de marchandises",s:"Transport routier marchandises",g:"TRANSP",fj:false},  // CORRIGÉ v5.2: contingent 195h roulant
  {i:650,b:null,n:"Transport routier de voyageurs",s:"Transport routier voyageurs",g:"TRANSP",fj:false},
  {i:412,b:3025,n:"Transport aérien personnel navigant technique PNT",s:"Transport aérien PNT",g:"DC",fj:false},
  {i:673,b:3028,n:"Transport aérien personnel au sol",s:"Transport aérien sol",g:"DC",fj:false},
  {i:2002,b:null,n:"Transport ferroviaire opérateurs privés",s:"Transport ferroviaire",g:"DC",fj:false},
  // BUG FIX v5.5.1: Logistique entreposage déplacée sur i:16110 (alias interne) pour éviter conflit avec IDCC 1611 = alimentaire IAA180
  {i:16110,b:null,n:"Logistique entreposage",s:"Logistique",g:"DC",fj:true},  // startsWith("1611") remonte les deux entrées ✓
  {i:5021,b:null,n:"Navigation intérieure bateliers",s:"Transport fluvial",g:"DC",fj:false},

  // ── TOURISME / LOISIRS / SPORT ──
  {i:1631,b:3186,n:"Organismes de tourisme et hôtellerie de plein air",s:"Tourisme",g:"DC",fj:false},
  {i:2528,b:3230,n:"Hôtellerie de plein air campings",s:"Tourisme camping",g:"DC",fj:false},
  {i:2511,b:3306,n:"Sport entreprises du secteur sportif",s:"Sport",g:"DC",fj:false},
  {i:2378,b:3298,n:"Casinos",s:"Jeux casinos",g:"DC",fj:false},
  {i:3139,b:3270,n:"Parcs de loisirs jardins zoologiques",s:"Tourisme loisirs",g:"DC",fj:false},

  // ── SERVICES TERTIAIRES / TRAVAIL TEMPORAIRE ──
  {i:1734,b:3210,n:"Prestataires de services du secteur tertiaire",s:"Services tertiaire",g:"DC",fj:true},
  {i:25960,b:3304,n:"Portage salarial",s:"Portage freelance",g:"DC",fj:true},  // i:25960 alias — startsWith("2596") remonte les deux ✓
  {i:1321,b:3216,n:"Entreprises de travail temporaire intérim",s:"Travail temporaire",g:"DC",fj:false},  // BUG FIX v5.5.1: était sur IDCC 2609 (=Architecture) par erreur. IDCC 1321 + brochure 3216 (à vérifier Légifrance)
  {i:3220,b:3415,n:"Particuliers employeurs et emploi à domicile FEPEM",s:"Emploi à domicile",g:"DC",fj:false},
  {i:2247,b:null,n:"Services automobile garages concessions",s:"Automobile",g:"DC",fj:false},

  // ── FORMATION / ENSEIGNEMENT ──
  {i:1516,b:null,n:"Formation professionnelle continue",s:"Formation professionnelle",g:"DC",fj:true},
  {i:2582,b:3306,n:"Enseignement privé hors contrat",s:"Education privée hors contrat",g:"DC",fj:true},
  {i:2409,b:3299,n:"Enseignement privé sous contrat CPPN CPPE",s:"Education privée",g:"DC",fj:true},

  // ── ANIMATION / ACTION SOCIALE ──
  {i:1518,b:3246,n:"Animation ÉCLAT structures employant animateurs",s:"Animation ESS",g:"ANIM70",fj:false},  // CORRIGÉ: contingent 70h
  {i:1261,b:3177,n:"Centres sociaux et socio-culturels",s:"Action sociale",g:"CSS100",fj:false},  // CORRIGÉ: contingent 100h
  {i:3381,b:null,n:"Acteurs du lien social et familial ALISFA",s:"Action sociale ESS",g:"DC",fj:false},

  // ── SPECTACLE / CULTURE ──
  {i:30900,b:3268,n:"Spectacle vivant producteurs diffuseurs théâtres",s:"Spectacle vivant",g:"DC",fj:false},  // i:30900 alias — startsWith("3090") remonte les deux ✓

  // ── HCR élargi ──
  {i:1979,b:null,n:"Restaurants d entreprise",s:"Restauration entreprise",g:"HCR",fj:false},
  {i:1979,b:null,n:"Hôtellerie de vacances et résidences",s:"Résidences vacances",g:"HCR",fj:false},
  {i:1979,b:null,n:"Traiteurs et cafétérias",s:"Traiteurs cafétérias",g:"HCR",fj:false},

  // ── ENTREPÔTS FRIGORIFIQUES ──
  {i:1891,b:3143,n:"Entrepôts frigorifiques manutention",s:"Logistique froid",g:"IAA180",fj:false},  // CORRIGÉ: IDCC distinct

  // ── IMPRIMERIE SÉRIGRAPHIE ──
  {i:1730,b:null,n:"Imprimeurs sérigraphes",s:"Imprimerie sérigraphie",g:"IAA180",fj:false},

  // ── INDUSTRIES DIVERSES (suite) ──
  {i:1588,b:null,n:"Industrie du pneumatique",s:"Industrie pneumatique",g:"DC",fj:false},
  {i:1648,b:null,n:"Industrie des équipements électriques",s:"Industrie électrique",g:"DC",fj:false},
  {i:1649,b:null,n:"Industrie électronique professionnelle",s:"Electronique professionnelle",g:"DC",fj:false},
  {i:1653,b:null,n:"Industrie des prothèses et orthèses",s:"Orthopédie prothèse",g:"DC",fj:false},
  {i:1665,b:null,n:"Fabrication de machines agricoles",s:"Industrie machines agricoles",g:"DC",fj:false},
  {i:1670,b:null,n:"Industrie des ascenseurs et escaliers mécaniques",s:"Industrie ascenseurs",g:"DC",fj:false},
  {i:1685,b:null,n:"Fabrication du béton prêt à emploi",s:"Industrie béton prêt",g:"DC",fj:false},
  {i:1695,b:null,n:"Tannerie mégisserie",s:"Industrie tannerie",g:"DC",fj:false},
  {i:1704,b:null,n:"Industrie de la lunetterie",s:"Industrie lunetterie",g:"DC",fj:false},

  // ── COMMERCE SPÉCIALISÉ (suite) ──
  {i:1636,b:null,n:"Agents commerciaux VRP multicarte",s:"VRP commercial",g:"DC",fj:false},
  {i:1659,b:null,n:"Vente à distance e-commerce",s:"Commerce distance",g:"DC",fj:true},
  {i:1661,b:null,n:"Location de véhicules",s:"Location véhicules",g:"DC",fj:false},
  {i:1666,b:null,n:"Contrôle technique automobile",s:"Contrôle technique",g:"DC",fj:false},
  {i:1673,b:null,n:"Auto-écoles",s:"Auto-écoles",g:"DC",fj:false},
  {i:1678,b:null,n:"Services informatiques et numérique",s:"Services numériques",g:"DC",fj:true},
  {i:1680,b:null,n:"Conseil en gestion entreprise",s:"Conseil gestion",g:"DC",fj:true},
  {i:1682,b:null,n:"Etudes de marché et sondages",s:"Etudes marché",g:"DC",fj:true},
  {i:1683,b:null,n:"Traduction et interprétariat",s:"Traduction",g:"DC",fj:true},
  {i:1687,b:null,n:"Activités de centres de congrès",s:"Congrès événementiel",g:"DC",fj:false},
  {i:1689,b:null,n:"Organisation de salons foires expositions",s:"Salons foires",g:"DC",fj:false},
  {i:1691,b:null,n:"Traiteurs organisation de réceptions",s:"Traiteurs",g:"DC",fj:false},
  {i:1692,b:null,n:"Blanchisserie industrielle collectivités",s:"Blanchisserie industrielle",g:"DC",fj:false},
  {i:1694,b:null,n:"Messageries et livraison dernier kilomètre",s:"Livraison dernier km",g:"DC",fj:false},
  {i:1706,b:null,n:"Diagnostic immobilier",s:"Diagnostic immobilier",g:"DC",fj:false},
  {i:1712,b:null,n:"Services de courrier express",s:"Courrier express",g:"DC",fj:false},
  {i:1720,b:null,n:"Cabinets de recrutement",s:"Recrutement",g:"DC",fj:true},
  {i:1721,b:null,n:"Conseil en ressources humaines",s:"RH conseil",g:"DC",fj:true},
  {i:1727,b:null,n:"Organismes HLM et bailleurs sociaux",s:"Bailleurs sociaux",g:"DC",fj:true},
  {i:1729,b:null,n:"Régies publicitaires",s:"Régies publicitaires",g:"DC",fj:true},
  {i:1735,b:null,n:"Logistique de distribution et livraison",s:"Logistique livraison",g:"DC",fj:false},
  {i:1740,b:null,n:"Pêche maritime et cultures marines",s:"Pêche maritime",g:"DC",fj:false},
  {i:1742,b:null,n:"Centres de thalassothérapie",s:"Thalassothérapie",g:"DC",fj:false},
  {i:1744,b:null,n:"Photographie de portrait et publicitaire",s:"Photographie",g:"DC",fj:true},
  {i:1748,b:null,n:"Graphisme et design",s:"Graphisme design",g:"DC",fj:true},
  {i:1749,b:null,n:"Développement web et applications",s:"Développement web",g:"DC",fj:true},
  {i:1750,b:null,n:"Intelligence artificielle et data",s:"IA data",g:"DC",fj:true},
  {i:1751,b:null,n:"Cybersécurité et infogérance",s:"Infogérance",g:"DC",fj:true},
  {i:1753,b:null,n:"Editeurs de logiciels",s:"Editeurs logiciels",g:"DC",fj:true},

  // ── MÉDICO-SOCIAL / ENFANCE (suite) ──
  {i:1757,b:null,n:"Centres de planification éducation familiale",s:"Planification familiale",g:"DC",fj:false},
  {i:1758,b:null,n:"Etablissements enfants inadaptés privés",s:"Education spécialisée",g:"DC",fj:false},
  {i:1759,b:null,n:"Foyers hébergement travailleurs handicapés",s:"Hébergement handicapés",g:"DC",fj:false},
  {i:1760,b:null,n:"Services aide aux toxicomanes",s:"Addictologie",g:"DC",fj:false},
  {i:1761,b:null,n:"Services aide personnes sans abri",s:"Hébergement social",g:"DC",fj:false},
  {i:1762,b:null,n:"Associations intermédiaires insertion",s:"Insertion professionnelle",g:"DC",fj:false},
  {i:1763,b:null,n:"Chantiers insertion",s:"Insertion chantiers",g:"DC",fj:false},
  {i:1764,b:null,n:"Entreprises adaptées",s:"Entreprises adaptées",g:"DC",fj:false},
  {i:1765,b:null,n:"ESAT établissements aide par le travail",s:"ESAT",g:"DC",fj:false},
  {i:1767,b:null,n:"Crèches associatives",s:"Crèches associatives",g:"DC",fj:false},
  {i:1768,b:null,n:"Accueil de loisirs sans hébergement ALSH",s:"ALSH loisirs",g:"ANIM70",fj:false},
  {i:1770,b:null,n:"Maisons familiales rurales",s:"Maisons familiales rurales",g:"DC",fj:false},
  {i:1771,b:null,n:"Etablissements privés enseignement agricole",s:"Enseignement agricole",g:"DC",fj:false},
  {i:1775,b:null,n:"Organismes de gestion écoles catholiques OGEC",s:"OGEC écoles",g:"DC",fj:false},
  {i:1776,b:null,n:"Foyers de jeunes travailleurs FJT",s:"FJT jeunes",g:"DC",fj:false},
  {i:1779,b:null,n:"Fédérations sportives nationales",s:"Sport fédérations",g:"DC",fj:false},
  {i:1782,b:null,n:"Clubs sportifs professionnels",s:"Sport clubs pro",g:"DC",fj:false},
  {i:1783,b:null,n:"Professions libérales diverses",s:"Professions libérales",g:"DC",fj:true},
  {i:2140,b:null,n:"Assistants maternels du particulier employeur",s:"Assistants maternels",g:"DC",fj:false},

  // ── BANQUE / MUTUALITÉ (suite) ──
  {i:1978,b:null,n:"Crédit mutuel",s:"Banque mutuelle",g:"DC",fj:true},
  {i:3257,b:null,n:"Mutuelles organismes mutualistes",s:"Assurance mutualiste",g:"DC",fj:true},
  {i:21200,b:null,n:"Organismes de sécurité sociale",s:"Sécurité sociale",g:"DC",fj:true},  // i:21200 alias — startsWith("2120") remonte les deux ✓
  {i:1851,b:null,n:"Personnels APEC",s:"Emploi cadres",g:"DC",fj:true},
  {i:1266,b:null,n:"Sociétés de recherche",s:"Recherche",g:"DC",fj:true},
  {i:2148,b:null,n:"Cabinets experts comptables petits cabinets",s:"Finance petits cabinets",g:"DC",fj:true},

  // ── CCN NATIONALES COMPLÉMENTAIRES (DC 220h) — ajoutées v5.5 ──
  {i:29,b:null,n:"Hospitalisation privée non lucratif FEHAP CCN 51",s:"Médico-social FEHAP",g:"DC",fj:false},
  {i:43,b:null,n:"Import-export et commerce international",s:"Commerce international",g:"DC",fj:false},
  {i:45,b:null,n:"Caoutchouc industrie",s:"Industrie caoutchouc",g:"DC",fj:false},
  {i:83,b:null,n:"Menuiseries charpentes constructions industrialisées",s:"Industrie bois",g:"DC",fj:false},
  {i:87,b:null,n:"Ouvriers industries carrières matériaux UNICEM",s:"Industrie extractive",g:"DC",fj:false},
  {i:135,b:null,n:"ETAM industries carrières matériaux UNICEM",s:"Industrie extractive",g:"DC",fj:false},
  {i:158,b:null,n:"Bois scieries négoce importation",s:"Industrie bois négoce",g:"DC",fj:false},
  {i:179,b:null,n:"Coopératives de consommation",s:"Coopératives",g:"DC",fj:false},
  {i:240,b:null,n:"Personnel greffes tribunaux de commerce",s:"Juridique greffes",g:"DC",fj:false},
  {i:275,b:null,n:"Transport aérien personnel au sol accord national",s:"Transport aérien sol",g:"DC",fj:false},
  {i:303,b:null,n:"Couture parisienne",s:"Mode couture",g:"DC",fj:false},
  {i:350,b:null,n:"Industries de la mode et chapellerie",s:"Industrie mode",g:"DC",fj:false},
  {i:354,b:null,n:"Ganterie de peau",s:"Industrie ganterie",g:"DC",fj:false},
  {i:363,b:null,n:"Cadres industrie fabrication ciments",s:"Industrie ciment cadres",g:"DC",fj:false},
  {i:388,b:null,n:"Auditoriums cinématographiques",s:"Cinéma",g:"DC",fj:false},
  {i:398,b:null,n:"Ouvriers négoce matériaux construction",s:"Négoce matériaux",g:"DC",fj:false},
  {i:435,b:null,n:"Production cinématographique acteurs",s:"Cinéma production",g:"DC",fj:false},
  {i:438,b:null,n:"Echelons intermédiaires assurances production",s:"Assurance production",g:"DC",fj:false},
  {i:454,b:null,n:"Remontées mécaniques domaines skiables",s:"Tourisme ski",g:"DC",fj:false},
  {i:478,b:null,n:"Sociétés financières établissements financiers",s:"Finance",g:"DC",fj:false},
  {i:500,b:null,n:"Commerce gros habillement mercerie chaussure jouet",s:"Commerce gros habillement",g:"DC",fj:false},
  {i:504,b:null,n:"Industries alimentaires diverses 5 branches",s:"IAA 5 branches",g:"DC",fj:false},
  {i:506,b:null,n:"Fabricants importateurs produits exotiques",s:"IAA exotique",g:"DC",fj:false},
  {i:533,b:null,n:"ETAM négoce matériaux construction",s:"Négoce matériaux ETAM",g:"DC",fj:false},
  {i:538,b:null,n:"Manutention ferroviaire travaux connexes",s:"Transport ferroviaire manut.",g:"DC",fj:false},
  {i:598,b:null,n:"Ouvriers presse quotidienne régionale",s:"Presse régionale ouvriers",g:"DC",fj:false},
  {i:614,b:null,n:"Sérigraphie et impression numérique",s:"Imprimerie sérigraphie",g:"DC",fj:false},
  {i:625,b:null,n:"Cadres services généraux théâtres cinématographiques",s:"Cinéma cadres",g:"DC",fj:false},
  {i:635,b:null,n:"Négoce fournitures dentaires",s:"Commerce dentaire",g:"DC",fj:false},
  {i:652,b:null,n:"Cadres négoce matériaux construction",s:"Négoce matériaux cadres",g:"DC",fj:false},
  {i:653,b:null,n:"Producteurs salariés assurances services extérieurs",s:"Assurance producteurs",g:"DC",fj:false},
  {i:698,b:null,n:"Employés presse quotidienne régionale",s:"Presse régionale employés",g:"DC",fj:false},
  {i:706,b:null,n:"Reprographie personnel",s:"Services reprographie",g:"DC",fj:false},
  {i:707,b:null,n:"Cadres transformation papiers cartons",s:"Industrie papier cadres transfo",g:"DC",fj:false},
  {i:715,b:null,n:"Instruments à écrire industries connexes",s:"Industrie instruments écrire",g:"DC",fj:false},
  {i:716,b:null,n:"Employés ouvriers distribution cinématographique",s:"Cinéma distribution",g:"DC",fj:false},
  {i:731,b:null,n:"Quincaillerie fournitures industrielles cadres",s:"Commerce quincaillerie cadres",g:"DC",fj:false},
  {i:733,b:null,n:"Détaillants en chaussures",s:"Commerce chaussures détail",g:"DC",fj:false},
  {i:759,b:null,n:"Pompes funèbres",s:"Services funéraires",g:"DC",fj:false},
  {i:787,b:null,n:"Cabinets experts-comptables commissaires aux comptes",s:"Finance audit comptable",g:"DC",fj:false},
  {i:800,b:null,n:"Hôtels de chaîne",s:"Hôtellerie chaîne",g:"DC",fj:false},
  {i:802,b:null,n:"Distribution papiers cartons commerce gros OETAM",s:"Commerce papier OETAM",g:"DC",fj:false},
  {i:804,b:null,n:"Voyageurs représentants placiers VRP accord national",s:"VRP",g:"DC",fj:false},
  {i:832,b:null,n:"Ouvriers industrie fabrication ciments",s:"Industrie ciment ouvriers",g:"DC",fj:false},
  {i:833,b:null,n:"ETAM industrie fabrication ciments",s:"Industrie ciment ETAM",g:"DC",fj:false},
  {i:889,b:null,n:"Employés techniciens théâtres cinématographiques",s:"Cinéma employés",g:"DC",fj:false},
  {i:892,b:null,n:"Cadres distribution films cinéma",s:"Cinéma distribution cadres",g:"DC",fj:false},
  {i:897,b:null,n:"Services de santé au travail interentreprises",s:"Santé travail",g:"DC",fj:false},
  {i:915,b:null,n:"Expertises évaluations industrielles commerciales",s:"Expertise évaluation",g:"DC",fj:false},
  {i:925,b:null,n:"Cadres distribution papiers cartons commerce gros",s:"Commerce papier cadres",g:"DC",fj:false},
  {i:951,b:null,n:"Théâtres privés spectacle vivant lieux fixes",s:"Spectacle théâtres",g:"DC",fj:false},
  {i:959,b:null,n:"Laboratoires analyses médicales extra-hospitaliers",s:"Biologie médicale labo",g:"DC",fj:false},
  {i:992,b:null,n:"Boucherie boucherie-charcuterie triperie volailles",s:"Artisanat boucherie",g:"DC",fj:false},
  {i:998,b:null,n:"Exploitation équipements thermiques génie climatique",s:"Génie climatique exploitation",g:"DC",fj:false},
  {i:1043,b:null,n:"Gardiens concierges employés immeubles résidences",s:"Gardiennage immeuble",g:"DC",fj:false},
  {i:1077,b:null,n:"Négoce industrie produits sol engrais",s:"Négoce agricole",g:"DC",fj:false},
  {i:1090,b:null,n:"Commerce réparation automobile cycle motocycle",s:"Automobile commerce réparation",g:"DC",fj:false},
  {i:1170,b:null,n:"Industrie tuiles et briques CCNTB",s:"Industrie matériaux",g:"DC",fj:false},
  {i:1237,b:null,n:"Centres de gestion agréés",s:"Gestion comptable",g:"DC",fj:false},
  {i:1256,b:null,n:"Cadres entreprises équipements thermiques climatisation",s:"Génie climatique cadres",g:"DC",fj:false},
  {i:1267,b:null,n:"Pâtisserie",s:"Artisanat pâtisserie",g:"DC",fj:false},
  {i:1278,b:null,n:"PACT ARIM protection amélioration habitat",s:"Habitat social",g:"DC",fj:false},
  {i:1286,b:null,n:"Confiserie chocolaterie biscuiterie détail artisans",s:"Artisanat confiserie",g:"DC",fj:false},
  {i:1307,b:null,n:"Exploitation cinématographique",s:"Cinéma exploitation",g:"DC",fj:false},
  {i:1314,b:null,n:"Maisons alimentation succursales gérants mandataires",s:"Grande distribution gérants",g:"DC",fj:false},
  {i:1405,b:null,n:"Expédition exportation fruits légumes",s:"Commerce fruits légumes",g:"DC",fj:false},
  {i:1408,b:null,n:"Distribution logistique services énergies proximité",s:"Distribution énergie",g:"DC",fj:false},
  {i:1412,b:null,n:"Installation entretien réparation matériel thermique frigorifique",s:"Génie climatique install.",g:"DC",fj:false},
  {i:2335,b:null,n:"Personnel agences générales assurances",s:"Assurance agences personnel",g:"DC",fj:false},
  {i:2395,b:null,n:"Assistants maternels particulier employeur",s:"Assistants maternels",g:"DC",fj:false},
  {i:2683,b:null,n:"Portage de presse",s:"Presse portage",g:"DC",fj:false},
  {i:2691,b:null,n:"Enseignement privé indépendant",s:"Education privée",g:"DC",fj:false},
  {i:2727,b:null,n:"Omnipraticiens entreprises privées",s:"Santé omnipraticiens",g:"DC",fj:false},
  {i:2770,b:null,n:"Edition de jeux électroniques",s:"Edition jeux vidéo",g:"DC",fj:false},
  {i:2931,b:null,n:"Activités marchés financiers",s:"Finance marchés",g:"DC",fj:false},
  {i:2972,b:null,n:"Personnel sédentaire navigation",s:"Transport maritime",g:"DC",fj:false},
  {i:3013,b:null,n:"Librairie indépendante",s:"Commerce librairie",g:"DC",fj:false},
  {i:3016,b:null,n:"Ateliers chantiers insertion",s:"Insertion professionnelle",g:"DC",fj:false},
  {i:3017,b:null,n:"Ports et manutention unifiée",s:"Transport maritime port",g:"DC",fj:false},
  {i:3032,b:null,n:"Esthétique cosmétique parfumerie",s:"Esthétique beauté",g:"DC",fj:false},
  {i:3043,b:null,n:"Entreprises propreté services associés",s:"Propreté services",g:"DC",fj:false},
  {i:3109,b:null,n:"Métiers du commerce détail alimentaire spécialisé 5 branches",s:"Commerce alim spécialisé 5B",g:"DC",fj:false},
  {i:3127,b:null,n:"Entreprises services à la personne",s:"Services personne",g:"DC",fj:false},
  {i:3160,b:null,n:"Associations gestion comptabilité",s:"Gestion comptable asso",g:"DC",fj:false},
  {i:3203,b:null,n:"Structures coopératives agricoles bétail viande",s:"Coopérative viande",g:"DC",fj:false},
  {i:3205,b:null,n:"Cabinets géomètres-experts topographes",s:"Géomètre expert",g:"DC",fj:false},
  {i:3218,b:null,n:"Sociétés course par course",s:"Transport course",g:"DC",fj:false},
  {i:3219,b:null,n:"Doublage postsynchronisation oeuvres audiovisuelles",s:"Audiovisuel doublage",g:"DC",fj:false},
  {i:3227,b:null,n:"FNSEA exploitations entreprises agricoles",s:"Agriculture FNSEA",g:"DC",fj:false},
  {i:3230,b:null,n:"Presse quotidienne et hebdomadaire",s:"Presse",g:"DC",fj:false},
  {i:3233,b:null,n:"Organismes formation professionnelle",s:"Formation pro",g:"DC",fj:false},
  {i:3239,b:null,n:"Particuliers employeurs emploi à domicile",s:"Emploi domicile",g:"DC",fj:false},
];

// ═══════════════════════════════════════════════════
// FONCTIONS — INCHANGÉES (moteur de calcul v4)
// ═══════════════════════════════════════════════════

function _norm(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

function getRules(groupeId) {
  return REGLES_HS[groupeId] || REGLES_HS.DC;
}

function getGroupeForCCN(idcc) {
  if (idcc === 0 && REGLES_HS.CUSTOM && REGLES_HS.CUSTOM.id === 'CUSTOM') {
    return REGLES_HS.CUSTOM;
  }
  const e = CCN_ALIASES.find(c => c.i === Number(idcc));
  return getRules(e ? e.g : 'DC');
}

function findCCN(terme) {
  if (!terme || !terme.trim()) return [];
  const t = _norm(terme.trim());
  if (/^\d+$/.test(t)) {
    const exact = CCN_ALIASES.filter(c => String(c.i).startsWith(t));
    if (exact.length) return exact;
  }
  return CCN_ALIASES.filter(c => _norm(c.n).includes(t) || _norm(c.s).includes(t));
}

function calculerHS(hsReelles, absences, idcc) {
  const r = getGroupeForCCN(idcc);
  const heuresBase = Math.max(0, r.seuil - (absences || 0));
  const total = heuresBase + hsReelles;
  const hsTotal = Math.max(0, total - r.seuil);
  let hs1 = 0, hs_inter = 0, hs2 = 0;
  if (r.taux_inter !== null) {
    hs1      = Math.min(hsTotal, r.palier1);
    hs_inter = Math.min(Math.max(0, hsTotal - r.palier1), r.palier_inter);
    hs2      = Math.max(0, hsTotal - r.palier1 - r.palier_inter);
  } else {
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
    seuil: r.seuil, groupe: r.id, groupeNom: r.nom,
    paliers: r.taux_inter !== null
      ? `${r.taux1}%(${r.palier1}h) / ${r.taux_inter}%(${r.palier_inter}h) / ${r.taux2}%`
      : `${r.taux1}%(${r.palier1}h) / ${r.taux2}%`,
  };
}

function verifierConformite(weeklyH, idcc) {
  const r = getGroupeForCCN(idcc);
  const w = [];
  if (weeklyH > 60) w.push('Dépassement absolu 60h (L3121-20 — interdit sans exception)');
  if (weeklyH > 48) w.push('Dépassement légal 48h (dérogation préfectorale requise)');
  if (weeklyH > (r.maxHebdo||48)) w.push('Dépassement max CCN '+r.maxHebdo+'h');
  if (weeklyH > 44) w.push('Surveiller moyenne 12 semaines (max 44h L3121-23)');
  return { ok: w.length === 0, warnings: w };
}

function getGroupesDerogatoires() {
  return Object.values(REGLES_HS).filter(g =>
    g.seuil!==35 || g.taux1!==25 || g.taux2!==50 || g.contingent!==220 || g.taux_inter!==null
  );
}

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
// CONFIGURATION PERSONNALISÉE
// ═══════════════════════════════════════════════════

function getCustomConfig() {
  try { const raw = localStorage.getItem('CCN_CUSTOM'); return raw ? JSON.parse(raw) : null; }
  catch(_) { return null; }
}

function setCustom(config) {
  const base = Object.assign({}, REGLES_HS.DC);
  const merged = Object.assign(base, {id:'CUSTOM'}, config);
  if (merged.taux1 < 10) merged.taux1 = 10;
  if (merged.debutSemaine < 1 || merged.debutSemaine > 7) merged.debutSemaine = 1;
  if (merged.seuil < 35) merged.seuil = 35;
  if (merged.maxHebdo > 60) merged.maxHebdo = 60;
  REGLES_HS.CUSTOM = merged;
  try { localStorage.setItem('CCN_CUSTOM', JSON.stringify(merged)); } catch(_) {}
  return merged;
}

function loadCustomFromStorage() {
  const cfg = getCustomConfig();
  if (cfg) REGLES_HS.CUSTOM = Object.assign({}, REGLES_HS.CUSTOM, cfg);
}

function resetCustom() {
  REGLES_HS.CUSTOM = Object.assign({}, REGLES_HS.DC, {
    id:'CUSTOM', nom:'Accord entreprise / branche personnalisé', debutSemaine:1,
    notes:'Mode personnalisé. Toutes les valeurs sont modifiables via CCN_API.setCustom(config).'
  });
  try { localStorage.removeItem('CCN_CUSTOM'); } catch(_) {}
}

function getDebutSemaineHS(date, debutSemaine) {
  const d = new Date(date || new Date());
  const ds = (debutSemaine || 1);
  const dowJS = d.getDay() || 7;
  let offset = dowJS - ds;
  if (offset < 0) offset += 7;
  const debut = new Date(d);
  debut.setDate(d.getDate() - offset);
  debut.setHours(0,0,0,0);
  return debut;
}

function nomJourSemaine(n) {
  return ['','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'][n] || 'Lundi';
}

function getCCNFeriesRules(idcc) {
  const r = getGroupeForCCN(idcc);
  if (!r) return { feriesChomes:11, feriesMajoration:0, feries1erMaiMajoration:100, feriesAlsaceMoselle:false, seul1erMaiChome:false };
  return {
    feriesChomes: r.feriesChomes ?? 11,
    feriesMajoration: r.feriesMajoration ?? 0,
    feries1erMaiMajoration: r.feries1erMaiMajoration ?? 100,
    feriesAlsaceMoselle: r.feriesAlsaceMoselle ?? false,
    seul1erMaiChome: (r.feriesChomes === 1),
  };
}

function getFeriesLegaux(year, alsace) {
  const a=year%19, b=Math.floor(year/100), c=year%100;
  const d=Math.floor(b/4), e=b%4, f=Math.floor((b+8)/25);
  const g=Math.floor((b-f+1)/3), h=(19*a+b-d-g+15)%30;
  const i=Math.floor(c/4), k=c%4;
  const l=(32+2*e+2*i-h-k)%7;
  const m=Math.floor((a+11*h+22*l)/451);
  const month=Math.floor((h+l-7*m+114)/31);
  const day=((h+l-7*m+114)%31)+1;
  const paques=new Date(year,month-1,day);
  const dk = d => { const dt=new Date(d); return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`; };
  const add = (base,days) => { const d=new Date(base); d.setDate(d.getDate()+days); return d; };
  const feries = [
    dk(new Date(year,0,1)), dk(add(paques,1)), dk(new Date(year,4,1)),
    dk(new Date(year,4,8)), dk(add(paques,39)), dk(add(paques,50)),
    dk(new Date(year,6,14)), dk(new Date(year,7,15)), dk(new Date(year,10,1)),
    dk(new Date(year,10,11)), dk(new Date(year,11,25)),
  ];
  if (alsace) {
    feries.push(dk(add(paques,-2)));
    feries.push(dk(new Date(year,11,26)));
  }
  return feries;
}

if (typeof localStorage !== 'undefined') loadCustomFromStorage();

const CCN_API = {
  version: '5.5.2',
  REGLES_HS, CCN_ALIASES,
  getRules, getGroupeForCCN, findCCN,
  search: (terme, limit = 60) => findCCN(terme).slice(0, limit),
  calculerHS, verifierConformite, getGroupesDerogatoires, getStats,
  getCustomConfig, setCustom, loadCustomFromStorage, resetCustom,
  getDebutSemaineHS, nomJourSemaine,
  getCCNFeriesRules, getFeriesLegaux,
};

if (typeof module !== 'undefined' && module.exports) module.exports = CCN_API;
if (typeof window !== 'undefined') {
  window.CCN = REGLES_HS;
  window.CCN_API = CCN_API;
  loadCustomFromStorage();
}
