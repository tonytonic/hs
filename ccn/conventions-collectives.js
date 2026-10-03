/**
 * BASE COMPLÈTE CCN FRANCE — HEURES SUPPLÉMENTAIRES
 * ==================================================
 * Version : 5.6.12 — 18 juillet 2026
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
 * BUG FIX v5.6.0 — DOUBLONS QUALITÉ DONNÉES CORRIGÉS :
 *   A) 4 alias IDCC (même groupe DC → double résultat recherche) :
 *      489→4890, 2120→21200, 2596→25960, 3090→30900
 *   B) 3 noms identiques distingués (Gardiens, Librairie, Transport aérien sol)
 *   C) 5 numéros de brochure erronés corrigés :
 *      Architecture b:3090→3290 | Transport voy. b:3002→null | Auto b:3034→null
 *      Formation pro b:3117→null | Transport ferrov. b:3265→null
 *
 * AUDIT CROISÉ v5.6.1 — 17/07/2026, contre le repo "Aspirateur Légifrance"
 * (API PISTE/KALI + fichier DARES historique des CCN, cf. output/ccn/ et
 * audit-ccn-erreurs.csv) :
 *   A) 92 IDCC agricoles départementaux (série 9xxx) RETIRÉS : confirmés
 *      sans IDCC depuis la fusion nationale d'avril 2021 (les textes
 *      officiels 7024/7025/7004 les citent explicitement comme "ex-IDCC").
 *      Aucun impact sur le calcul (ils pointaient déjà vers le groupe DC,
 *      identique au fallback par défaut) — juste retirés de la recherche.
 *   B) 8 doublons RETIRÉS (contenu déjà couvert par une autre entrée,
 *      confirmé multi-sources) : 1685, 1704, 1748, 1749, 1753, 1767,
 *      1768, 1965
 *   C) 35 IDCC signalés par recoupement DARES automatique du repo droit
 *      MAIS NON MODIFIÉS ICI — ce recoupement s'est avéré peu fiable sur cet
 *      échantillon (ex: IDCC 776 "Cabinets médicaux" rapproché à tort d'un
 *      CCN de personnel navigant d'essais ; IDCC 1240 "Distillation
 *      alcools" rapproché à tort d'un commerce de détail à Bourg-en-Bresse).
 *      À revérifier au cas par cas avant toute correction (liste complète
 *      des 35 disponible sur demande).
 *   D) Taux de majoration/contingent du groupe DC (25%/50%, 8h, 220h)
 *      RECONFIRMÉS contre le Code du travail (art. L3121-36 et D3121-24).
 *      Les 18 autres groupes dérogatoires n'ont PAS pu être revérifiés
 *      cette session (texte intégral des clauses heures sup pas encore
 *      récupéré côté repo droit — script fetch_overtime_details.py à lancer).
 *   IDCC 5730 (commerce de gros non alimentaire) volontairement inchangé :
 *      alias interne pour distinguer alimentaire (573) / non alimentaire,
 *      pas une erreur.
 *
 * VERIFICATION TAUX COMPLETE v5.6.12 (suite) — 18/07/2026 : les 3 derniers
 * groupes verifies, tous confirmes sans changement necessaire :
 *   CSS60 (60h) : confirme texte Legifrance direct (SNAECSO, art. convention
 *   du 4 juin 1983)
 *   PETRO (130h) : confirme texte Legifrance direct (art. 413, convention
 *   industrie du petrole du 3 septembre 1985)
 *   MEDSO110 (110h) : confirme via Bulletin Officiel Ministere de la Sante
 *   n2002-10 + multiples sources CCN51/FEHAP. Nuance relevee : la
 *   majoration FEHAP est decrite par tranche bihebdomadaire (25% de la
 *   71e a la 86e heure par periode de 2 semaines, 50% au-dela) plutot
 *   qu hebdomadaire -- mathematiquement proche de la structure actuelle
 *   (25% les 8 premieres h, 50% au-dela, par semaine) mais pas verifie
 *   comme strictement identique. A garder en tete si un ecart de calcul
 *   est signale un jour sur ce groupe precis.
 * PHARMA (220h) VERIFIE a son tour -- confirme via code.travail.gouv.fr
 * (outil officiel Ministere du Travail) : "convention collective
 * Pharmacie: industrie... fixe le contingent a 220 heures". Exact match.
 * TOUS LES GROUPES SONT DESORMAIS VERIFIES SANS EXCEPTION : 17/17
 * derogatoires historiques + les 2 crees cette session + DC + PHARMA.
 * Audit definitivement complet cote taux/contingent.
 *
 * VERIFICATION TAUX v5.6.12 — 18/07/2026 : verification web (Legifrance,
 * code.travail.gouv.fr et sources professionnelles) de 13 des 17 groupes
 * derogatoires, en plus de DC deja verifie en v5.6.1 :
 *   CONFIRMES CORRECTS (contingent identique a ce qui etait deja dans le
 *   fichier) : HCR 360h/10-20-50%, TRANSP 195h, CHIM130 130h, COIF200
 *   200h, SYNTEC130 130h (ETAM), BOULAN329 329h, PROP190 190h, SECU329
 *   329h, PHARMO150 150h, HOSPI130 130h, ASSUR70 70h, ANIM70 70h,
 *   IAA180 180h (une source concurrente evoque 145h de base pour le
 *   batiment specifiquement, mais code.travail.gouv.fr confirme 180h).
 *   2 NOUVEAUX GROUPES CREES suite a une decouverte lors de cette
 *   verification : IDCC 2247 (courtage assurances) et IDCC 2335
 *   (agences generales assurances) avaient ete ajoutes en DC par defaut
 *   en v5.6.7/v5.6.8 faute de donnee -- ils ont en realite leur propre
 *   contingent (150h et 140h respectivement, textes Legifrance et
 *   sources pro), distinct des 70h des societes d'assurances.
 *   NON VERIFIES cette session : CSS60, MEDSO110, PETRO, PHARMA (ce
 *   dernier egale deja le defaut legal 220h, risque faible).
 *
 * DERNIER CHECK v5.6.11 — 18/07/2026 : 12 CCN agricoles nationales
 * actives ajoutees (lin, cooperatives laitieres/betail, aquaculture,
 * conchyliculture, activites hippiques, credit agricole, enseignement
 * agricole prive...). 187 variantes agricoles DEPARTEMENTALES actives
 * identifiees (polyculture/horticulture/forestier par departement) mais
 * NON ajoutees -- volume disproportionne pour la valeur (meme niveau de
 * detail que les 92 codes 9xxx retires en v5.6.1), toutes tombent sur DC
 * par defaut de toute facon. Disponibles sur demande.
 * Fin d audit : 0 entree active manquante en regime General, 0 entree
 * inactive residuelle, 5730 toujours protege comme demande initialement.
 *
 * DOM-TOM v5.6.10 — 18/07/2026 : recherche faite avant d ajouter -- le
 * Livre IV du Code du travail (art. L3411 a L3431) prevoit des adaptations
 * pour la Guadeloupe/Guyane/Martinique/Reunion/Saint-Barthelemy/
 * Saint-Martin/Saint-Pierre-et-Miquelon, mais elles portent sur les jours
 * feries (abolition esclavage) et la journee de solidarite -- PAS sur le
 * contingent ni la majoration heures sup, qui restent ceux du droit
 * commun. Les CCN nationales deja dans le fichier s y appliquent aussi
 * (art. L2222-1, delai 6 mois). Seule vraie exception : Mayotte, qui a
 * son propre code du travail distinct -- non concernee par cet ajout.
 * 57 CCN regionales actives ajoutees en consequence, groupees par
 * secteur comme leur equivalent metropolitain (3 en HCR pour les
 * conventions hotels/HCR de Saint-Pierre-et-Miquelon/Guadeloupe, 1 en
 * TRANSP pour les transports routiers Guadeloupe, le reste en DC).
 *
 * COMPLÉMENT v5.6.9 — 18/07/2026 : 19 dernières CCN nationales actives
 * (fichier DARES officiel) encore absentes, ajoutées : régies de quartier,
 * photographie, Banque Populaire, cadres TP, économistes construction,
 * enseignement privé non lucratif, offices publics habitat, agences de
 * presse, marine marchande (x3), presse magazine/régionale, télédiffusion,
 * securite sociale direction, ciment (remplace toute lancienne serie
 * 363/832/833 retiree plus tot), parfumerie selective, nautisme, voyages.
 * Restent identifiees mais NON ajoutees : ~57 variantes regionales et
 * DOM-TOM (Reunion, Martinique, Guadeloupe, Guyane, Saint-Pierre) dun
 * secteur deja couvert au national -- disponibles sur demande.
 *
 * RECROISEMENT v5.6.8 — 18/07/2026 : contre le fichier officiel DARES
 * "Suivi historique" de juin 2026 fourni par Anthony (1665 CCN + 181
 * accords/statuts, avec flag actif/inactif ET successeur officiel
 * NouvIDCC) -- source PRIMAIRE, plus fiable que mes recoupements web :
 *   • 18 renommées vers leur successeur actif officiel (ex: 240->3244,
 *     567->3251, 731/1383->3243, 992/1504->3254...)
 *   • 44 retirées : soit doublons du successeur déjà présent, soit
 *     numéros introuvables dans le fichier officiel (16110, 25960, 30900
 *     etc. -- probablement des typos, format à 5 chiffres inexistant en
 *     IDCC), soit sans successeur connu
 *   • 6 agricoles ré-étiquetées avec leur vrai intitulé (le numéro était
 *     actif mais désignait un tout autre sujet)
 *   • 3 reconstituées : 3090 (spectacle vivant privé), 3219 (portage
 *     salarial -- corrige le doublon malformé 25960), 7017 (parcs
 *     zoologiques)
 * IDCC 5730 : confirmé absent du fichier officiel, mais VOLONTAIREMENT
 * conservé -- alias interne documenté, pas une vraie CCN.
 *
 * COUVERTURE ÉLARGIE v5.6.7 — 18/07/2026 : ajout de 91 CCN nationales
 * actives (DARES jan2026) absentes du fichier, pour que l'app couvre plus
 * de salariés à temps plein. Sur 131 CCN actives manquantes identifiées :
 *   • 16 exclues (simples annexes d'une CCN déjà couverte)
 *   • 23 exclues (variantes régionales/DOM-TOM d'un secteur déjà couvert
 *     nationalement -- pas ajoutées cette passe, priorité plus basse)
 *   • 1 exclue (650 métallurgie ingénieurs/cadres -- la liste DARES la
 *     montre active mais Predictice la marque Abrogée, absorbée par 3248)
 *   • 91 AJOUTÉES, toutes vérifiées contre au moins 1 source
 * GROUPE : 90 des 91 sur DC (défaut légal, pas de dérogation confirmée).
 * 1 seule mise en HCR : 2060 "chaînes de cafétérias", cohérent avec les
 * entrées "traiteurs et cafétérias" déjà présentes dans ce groupe.
 * 5 candidates avaient un nom faisant penser à un groupe spécial mais
 * PAS assez de certitude pour l'assigner sans casser un vrai taux
 * différent -- laissées en DC par prudence, à vérifier en priorité :
 * 1424 (transports urbains voyageurs), 1621 (répartition pharmaceutique,
 * différent de l'industrie pharma), 1679 (inspection d'assurance),
 * 2603 (praticiens-conseils sécu), 2768 (pharmaciens régime minier).
 *
 * AUDIT CROISÉ v5.6.6 — 18/07/2026, dernière passe : les 24 CCN encore
 * en doute ont toutes été tranchées par recoupement des 3 bases (DARES
 * jan2026, Predictice, Juristique) :
 *   • 240, 438 : confirmées CORRECTES telles quelles (la cible DARES du
 *     repo droit était fausse, mais le numéro app lui-même est bon)
 *   • 22 RETIRÉES : 776, 1540, 1598, 1730, 1771, 1985, 7504, 7505, 7506,
 *     7507, 7509, 7512, 7016, 3236, 1370, 3220, 2409, 1740, 3218, 3219,
 *     3227, 1309 -- confirmées fausses ou inexistantes par au moins 2
 *     sources sur 3
 *   • 5 RECONSTITUÉES sous leur vrai numéro (contenu qui n'avait plus de
 *     domicile après les vagues précédentes) : 1607 (jeux/jouets/
 *     puériculture), 1266 (restauration de collectivités), 1978
 *     (fleuristes/animaux), 2247 (courtage assurances), 7002
 *     (coopératives agricoles céréales/meunerie/bétail)
 * Audit terminé : 404 → 183 entrées (221 corrigées : 216 retraits nets,
 * 5 reconstructions). Toutes les entrées retirées ou ajoutées sont sur
 * le groupe DC -- aucun groupe dérogatoire créé, perdu ni modifié.
 *
 * AUDIT CROISÉ v5.6.5 — 18/07/2026, 5e passe : 3e base indépendante
 * (Juristique, registre quasi-complet incluant les codes régionaux/
 * départementaux) -- confirme le cluster 1636-1791 : 31 numéros n'existent
 * tout simplement pas, retirés. 3 autres (1758, 1759, 1779) existent bien
 * mais désignent des CCN bâtiment RÉGIONALES (Tarn, PACA) sans rapport
 * avec le libellé de l'app -- retirés aussi. Plus 267, 803, 412, 1240,
 * 1554, 1600, 1603 confirmés faux/inexistants par recoupement.
 *   388 et 506 : vérifiés CORRECTS par cette même source (annulent un
 *   doute qui restait ouvert) -- non touchés.
 *   Question groupe/taux (contingent, majoration) : tous les IDCC retirés
 *   dans cet audit (v5.6.1 à v5.6.5) pointaient vers le groupe DC par
 *   défaut -- aucun n'appartenait à un groupe dérogatoire existant, donc
 *   aucune perte de règle spécifique. Pour un salarié dont la vraie CCN
 *   n'est dans aucune des bases croisées, le repli DC (25%/50%, 220h)
 *   est la valeur légale par défaut correcte en l'absence de convention
 *   identifiée -- c'est le comportement prévu par le Code du travail.
 *
 * AUDIT CROISÉ v5.6.4 — 18/07/2026, 4e passe : base Predictice (450 CCN,
 * statuts Vigueur/Remplacé/Abrogé/Périmé) -- 14 entrées retirées, confirmées
 * soit par un statut explicitement obsolète (363, 504, 533, 598, 652, 698,
 * 832, 833, 951, 1177, 1314, 1563 -- remplacées ou abrogées), soit doublons
 * d'un contenu déjà correctement présent ailleurs (1489, 1538).
 *   ATTENTION -- piste identifiée mais NON traitée cette session : une
 *   quarantaine d'entrées (grosso modo IDCC 1636-1791) ont des noms très
 *   "modernes" (conseil RH, traduction, livraison dernier kilomètre...)
 *   et n'apparaissent dans AUCUNE des bases officielles consultées
 *   (DARES jan2026, Predictice). 8 numéros de cette même zone déjà
 *   confirmés fictifs plus tôt (1678, 1692, 1750, 1751, 1761, 1765, 1775,
 *   1779). Fort soupçon que le reste de la zone soit du même acabit, mais
 *   pas vérifié un par un -- à traiter en priorité la prochaine fois.
 *
 * AUDIT CROISÉ v5.6.3 — 18/07/2026, 3e passe : liste officielle DARES/DGT
 * des conventions actives au 1er janvier 2026 (ministère du Travail, table
 * complète ~727 CCN, transcrite pour IDCC 16 à 3017) -- source indépendante
 * du repo droit, complémentaire au titre KALI déjà utilisé en v5.6.2 :
 *   • 254 entrées croisées avec cette liste (sur les IDCC 16-3017) :
 *     123 confirmées correctes, 44 confirmées fausses (nom app ne
 *     correspond pas au vrai contenu de ce numéro), 9 numéros absents de
 *     la liste active (probablement fictifs, ex: "Intelligence
 *     artificielle et data", "Cybersécurité et infogérance" -- même
 *     pattern que les doublons SYNTEC retirés en v5.6.1).
 *   • Les 44 + 9 = 53 confirmées fausses/absentes RETIRÉES. Autocontrôle :
 *     1 candidat (1261 Centres sociaux) initialement flaggé par erreur de
 *     transcription de ma part -- revérifié contre le texte officiel
 *     complet et exclu du retrait (il est correct).
 *   • Plusieurs de ces numéros semblent inversés deux à deux (ex: 567
 *     "Jouets/puériculture" et 1607 "Industrie du coton" portent
 *     visiblement le contenu l'un de l'autre). Retirés par prudence
 *     plutôt que ré-étiquetés à l'aveugle -- cf. liste-dares-officielle.csv
 *     pour les paires identifiées, à corriger manuellement si utile.
 *   • IDCC hors de la plage 16-3017 (dont la série 7500 agricole restante,
 *     267, 803, 1177, 1240, 1540, 1598, 3218, 3219, 3236) non couverts par
 *     cette liste -- statut inchangé, toujours dans les fichiers de revue.
 *
 * AUDIT CROISÉ v5.6.2 — 17/07/2026, 2e passe : titre officiel Légifrance
 * de la CIBLE elle-même (output/ccn/<cible>.json), pas juste le texte DARES
 * tronqué -- 6 RETIRÉS (doublons confirmés par le titre officiel de la
 * cible, déjà présente dans le fichier) :
 *   • 350 (mode/chapellerie) -> doublon de 247 (habillement)
 *   • 625, 889 (cadres/employés théâtres cinéma) -> doublon de 1307
 *     (exploitation cinématographique)
 *   • 800 (hôtels de chaîne) -> doublon de 1979/HCR -- IMPACT CALCUL réel,
 *     800 était sur le groupe DC (25/50/220h) au lieu de HCR (10/20/50/360h)
 *   • 650 (transport routier voyageurs) -> doublon de 16 (transports
 *     routiers, confirmé : le texte de 16 mentionne "voyageurs" 53 fois)
 *   • 1611 (commerce gros alim. entreposage) -> doublon de 2216 (commerce
 *     détail/gros alimentaire, confirmé : texte mentionne "entrepôt" 4439x)
 * 1 RENOMMÉ : 83 -> 3222 (menuiseries charpentes, titre officiel identique,
 * 3222 n'existait pas encore dans le fichier)
 * Les 25 autres renumérotations DARES proposées par le repo ont été
 * vérifiées ET INFIRMÉES par le titre officiel de leur cible respective
 * (ex: DARES proposait 776->1612, mais 1612 = "travail aérien/personnel
 * navigant des essais", rien à voir avec "Cabinets médicaux") -- non
 * appliquées, cf. a-revoir-dares.csv pour le détail avec sources.
 *
 * AUDIT COMPLET réalisé le 31/03/2026 :
 *   - 11 groupes vérifiés sur Légifrance (contingents, taux, paliers)
 *   - ~420 IDCC vérifiés (brochures, mappings)
 *   - Corrections majeures vs v4.0 :
 *     • GD      : taux corrigés 25%/50% (pas 10%/25%), contingent 180h (pas 220h)
 *     • ASSUR70 : contingent corrigé 70h (pas 200h), IDCC 1672 (pas 763)
 *     • BOULAN329: contingent corrigé 329h (pas 270h), IDCC 843 (pas 54)
 *     • ANIM70  : contingent corrigé 70h (pas 90h)
 *     • CSS60 : ALISFA contingent 60 h (100 h = CDI intermittents) — Légifrance art. 1.4
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
    id:'PETRO', nom:'Pétrole — 25%/50%, contingent 130h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:130, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 100,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Industrie du pétrole IDCC 1388 (brochure 3001), art. 413 : 25%/50%, contingent 130h. Le 33% = majoration d\'incommodité nuit/dimanche/férié, distincte des HS.'
  },

  PHARMA: {
    id:'PHARMA', nom:'Pharmaceutique — contingent 220h (droit commun)',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:220, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Industrie pharmaceutique IDCC 176 (brochure 3104). Contingent 220h droit commun (code.travail.gouv.fr/176), 25%/50%.'
  },

  CSS60: {
    id:'CSS60', nom:'Centres sociaux — contingent 60h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:60, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Centres sociaux et socio-culturels IDCC 1261 (brochure 3218). Contingent 60h (art.1.4 CCN, Légifrance).'
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
    id:'MEDSO110', nom:'Médico-social — contingent 110h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:110, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Médico-social FEHAP CCN 51 (IDCC 29, brochure 3198) et UNISSS (IDCC 405). Contingent 110h (Légifrance art.21 / CCN51).'
  },

  ASSURCOURT150: {
    id:'ASSURCOURT150', nom:'Courtage assurances — contingent 150h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:150, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Courtage assurances/réassurances (IDCC 2247). Contingent 150h, distinct des 70h des sociétés d\'assurances. Trouvé lors de la vérification finale du 18/07/2026 (texte Légifrance de la convention).'
  },

  ASSURAGE140: {
    id:'ASSURAGE140', nom:'Agences générales assurances — contingent 140h',
    seuil:35, taux1:25, palier1:8, taux_inter:null, palier_inter:null, taux2:50,
    contingent:140, maxHebdo:48, debutSemaine:1,
    feriesChomes: 11, feriesMajoration: 0,
    feries1erMaiMajoration: 100, feriesAlsaceMoselle: false,
    notes:'Personnel des agences générales d\'assurances (IDCC 2335, brochure 3115). Contingent 140h, distinct des 70h des sociétés d\'assurances et des 150h du courtage. Trouvé lors de la vérification finale du 18/07/2026.'
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
// ~274 CCN — TABLE COMPLÈTE — IDCC VÉRIFIÉS 31/03/2026, AUDIT CROISÉ 17-18/07/2026, COUVERTURE ÉLARGIE 18/07/2026
// Format compact : { i(dcc), b(rochure), n(om), s(ecteur), g(roupe), fj(forfaitJour) }
// ═══════════════════════════════════════════════════
const CCN_ALIASES = [
  // ── AGRICULTURE (IDCC 9xxx) ──
  {i:7018,b:3269,n:"Entreprises du paysage",s:"Paysage",g:"DC",fj:false},
  {i:7024,b:null,n:"Production agricole et CUMA",s:"Agriculture",g:"DC",fj:false},
  {i:7005,b:3200,n:"Caves coopératives vinicoles",s:"Viticulture",g:"DC",fj:false},

  // ── INDUSTRIES ALIMENTAIRES ──
  {i:2728,b:3044,n:"Sucre sucreries distilleries raffineries",s:"IAA sucre",g:"DC",fj:false},
  {i:112,b:3079,n:"Industrie laitière",s:"IAA laitier",g:"DC",fj:false},
  {i:843,b:3117,n:"Boulangerie-pâtisserie artisanale",s:"Artisanat alimentaire",g:"BOULAN329",fj:false},  // CORRIGÉ: IDCC 843 (pas 54), contingent 329h
  
  
  
  {i:953,b:3073,n:"Charcuterie de détail",s:"Artisanat charcuterie",g:"DC",fj:false},
  {i:3253,b:3078,n:"Cabinets d'avocats (personnel salarié)",s:"Avocats",g:"DC",fj:false},
  {i:1987,b:3080,n:"Pâtes alimentaires",s:"IAA pâtes",g:"DC",fj:false},

  // ── BTP ──
  {i:1596,b:3258,n:"Bâtiment Ouvriers plus 10 salariés",s:"Bâtiment",g:"IAA180",fj:false},
  {i:1597,b:3258,n:"Bâtiment Ouvriers moins 10 salariés",s:"Bâtiment",g:"IAA180",fj:false},
  {i:2332,b:3290,n:"Architecture cabinets",s:"Architecture",g:"DC",fj:true},  // CORRIGÉ v5.6.0: brochure 3290 (pas 3090)
  
  

  // ── CHIMIE / PHARMA / PÉTROLE ──
  {i:44,b:3108,n:"Industries chimiques",s:"Industrie chimique",g:"CHIM130",fj:true},  // CORRIGÉ: une seule entrée pour IDCC 44
  {i:1388,b:3001,n:"Industrie du pétrole",s:"Energie pétrolière",g:"PETRO",fj:true},
  
  {i:292,b:3316,n:"Plasturgie",s:"Industrie plastique",g:"DC",fj:true},
  {i:176,b:3104,n:"Industrie pharmaceutique",s:"Industrie pharmaceutique",g:"PHARMA",fj:true},
  {i:1555,b:null,n:"Fabrication commerce produits pharma para-pharma vétérinaire",s:"Pharmacie vétérinaire",g:"PHARMA",fj:true},

  // ── MATÉRIAUX / TEXTILE / DIVERS INDUSTRIE ──
  {i:493,b:3029,n:"Vins, cidres, jus de fruits, sirops, spiritueux et liqueurs de France",s:"Vins spiritueux",g:"DC",fj:false},
  {i:3238,b:3156,n:"Papiers et cartons industries",s:"Industrie papier",g:"DC",fj:false},
  {i:489,b:3135,n:"Cartonnage industries",s:"Industrie cartonnage",g:"DC",fj:false},  // i:4890 alias (IDCC réel à vérifier Légifrance) — startsWith("489") remonte les deux ✓
  {i:3248,b:3399,n:"Métallurgie accord national unique 2023",s:"Métallurgie",g:"DC",fj:true},
  {i:2046,b:3283,n:"Centres de lutte contre le cancer (CLCC)",s:"Santé oncologie",g:"DC",fj:false},
  {i:247,b:null,n:"Industries de l'habillement",s:"Habillement",g:"DC",fj:false},
  {i:1580,b:3163,n:"Chaussure industrie",s:"Industrie chaussure",g:"DC",fj:false},
  {i:2528,b:3201,n:"Maroquinerie gainerie bracelets cuir",s:"Industrie maroquinerie",g:"DC",fj:false},
  

  // ── ÉNERGIE / ENVIRONNEMENT ──
  {i:5001,b:null,n:"Industries électriques et gazières IEG",s:"Energie EDF GDF",g:"DC",fj:false},
  {i:1413,b:3212,n:"Salariés permanents des entreprises de travail temporaire",s:"Travail temporaire",g:"DC",fj:false},
  {i:637,b:3139,n:"Récupération industrie et commerces",s:"Recyclage récupération",g:"DC",fj:false},

  // ── COMMERCE / DISTRIBUTION ──
  {i:2216,b:3305,n:"Grande distribution alimentaire supermarchés hypermarchés",s:"Grande distribution alim.",g:"IAA180",fj:false},  // CORRIGÉ v5: IDCC 2216, contingent 180h
  {i:573,b:3044,n:"Commerce de gros alimentaire",s:"Commerce de gros alim.",g:"IAA180",fj:true},
  {i:5730,b:null,n:"Commerce de gros non alimentaire",s:"Commerce de gros non alim.",g:"DC",fj:true},  // i:5730 (alias interne) — IDCC réel à vérifier Légifrance. startsWith("573") remonte les deux entrées ✓
  {i:1501,b:3245,n:"Restauration rapide",s:"Restauration rapide",g:"DC",fj:false},  // CORRIGÉ v5: IDCC 1501 = restauration rapide
  {i:1979,b:3292,n:"Hôtels Cafés Restaurants HCR",s:"HCR",g:"HCR",fj:false},
  {i:1517,b:3251,n:"Commerce de détail non alimentaire",s:"Commerce de détail",g:"IAA180",fj:false},  // CORRIGÉ v5.4: contingent 180h
  {i:1483,b:3251,n:"Habillement commerce de détail",s:"Commerce textile",g:"DC",fj:false},  // CORRIGÉ: IDCC 1483 = commerce détail non alim
  
  {i:468,b:3212,n:"Chaussure commerce succursaliste",s:"Commerce chaussures",g:"DC",fj:false},
  {i:1431,b:3249,n:"Optique lunetterie de détail",s:"Optique",g:"DC",fj:false},
  {i:3255,b:null,n:"Activités industrielles de boulangerie et pâtisserie",s:"Boulangerie industrielle",g:"DC",fj:false},
  {i:1996,b:3052,n:"Pharmacies officine",s:"Pharmacie",g:"PHARMO150",fj:false},  // CORRIGÉ v5.4: contingent 150h
  {i:1606,b:3232,n:"Bricolage commerce de détail",s:"Commerce bricolage",g:"DC",fj:false},
  {i:993,b:3306,n:"Prothèse dentaire laboratoires",s:"Santé dentaire labo",g:"DC",fj:false},
  {i:3237,b:null,n:"Commerce de détail alimentaire spécialisé",s:"Commerce alim spécialisé",g:"DC",fj:false},

  // ── SERVICES PERSONNE / COIFFURE / BEAUTÉ ──
  {i:2596,b:3159,n:"Coiffure entreprises",s:"Coiffure",g:"COIF200",fj:false},  // CORRIGÉ v5.4: contingent 200h
  

  // ── BANQUE / ASSURANCE / FINANCE ──
  {i:1672,b:3265,n:"Sociétés assurances",s:"Assurance",g:"ASSUR70",fj:true},  // CORRIGÉ: IDCC 1672 (pas 763), contingent 70h
  {i:2120,b:3281,n:"Banque (AFB)",s:"Banque mutualiste",g:"DC",fj:true},

  // ── SÉCURITÉ / PROPRETÉ / IMMOBILIER ──
  {i:1351,b:3196,n:"Prévention et sécurité privée gardiennage",s:"Sécurité privée",g:"SECU329",fj:false},  // CORRIGÉ v5.3: contingent 329h
  {i:3043,b:3173,n:"Nettoyage entreprises de propreté",s:"Propreté",g:"PROP190",fj:false},  // CORRIGÉ v5.3: contingent 190h
  
  {i:1527,b:3144,n:"Immobilier agents gestionnaires syndics",s:"Immobilier",g:"DC",fj:true},
  {i:1512,b:3256,n:"Promotion immobilière",s:"Promotion immobilière",g:"DC",fj:true},

  // ── JURIDIQUE ──
  {i:218,b:null,n:"Organismes de Sécurité sociale (UCANSS)",s:"Sécurité sociale",g:"DC",fj:true},
  {i:3250,b:3289,n:"Commissaires de justice et sociétés de ventes volontaires",s:"Commissaires justice ventes volontaires",g:"DC",fj:false},

  // ── IT / INGÉNIERIE / CONSEIL ──
  {i:1486,b:3018,n:"Syntec bureaux études techniques informatique ingénierie conseil",s:"IT ingénierie conseil",g:"SYNTEC130",fj:true},  // CORRIGÉ v5.2: contingent 130h ETAM
  {i:2264,b:3307,n:"Hospitalisation privée",s:"Santé privée",g:"HOSPI130",fj:false},

  // ── PRESSE / MÉDIAS / ÉDITION ──
  {i:1922,b:3221,n:"Radiodiffusion audiovisuel public et privé",s:"Audiovisuel",g:"DC",fj:true},
  {i:184,b:3142,n:"Imprimerie de labeur industries graphiques",s:"Imprimerie",g:"IAA180",fj:false},
  {i:2121,b:3391,n:"Edition livres presse multimédia",s:"Edition",g:"DC",fj:true},

  // ── SANTÉ / MÉDICO-SOCIAL ──
    // CORRIGÉ v5.3: contingent 130h
  {i:1619,b:3275,n:"Cabinets dentaires",s:"Santé dentaire",g:"DC",fj:false},
  {i:2941,b:3370,n:"Aide accompagnement soins à domicile BASS",s:"Aide à domicile",g:"DC",fj:false},
  {i:413,b:3116,n:"CCN 66 inadaptés handicapés",s:"Médico-social CCN 66",g:"MEDSO110",fj:false},
  {i:3217,b:null,n:"Branche ferroviaire (CCN du 31 mai 2016)",s:"Transport ferroviaire",g:"DC",fj:false},
  {i:2205,b:null,n:"Notariat",s:"Notariat",g:"DC",fj:false},
  

  // ── TRANSPORT / LOGISTIQUE ──
  {i:16,b:3085,n:"Transport routier de marchandises",s:"Transport routier marchandises",g:"TRANSP",fj:false},  // CORRIGÉ v5.2: contingent 195h roulant
  
  {i:2002,b:null,n:"Blanchisserie, teinturerie et nettoyage (pressing)",s:"Blanchisserie pressing",g:"DC",fj:false},
  // BUG FIX v5.5.1: Logistique entreposage déplacée sur i:16110 (alias interne) pour éviter conflit avec IDCC 1611 = alimentaire IAA180
  {i:5021,b:null,n:"Statut de la Fonction publique territoriale",s:"Fonction publique",g:"DC",fj:false},

  // ── TOURISME / LOISIRS / SPORT ──
  {i:1631,b:3186,n:"Organismes de tourisme et hôtellerie de plein air",s:"Tourisme",g:"DC",fj:false},
  
  {i:2511,b:3306,n:"Sport entreprises du secteur sportif",s:"Sport",g:"DC",fj:false},
  {i:2257,b:3298,n:"Casinos",s:"Jeux casinos",g:"DC",fj:false},

  // ── SERVICES TERTIAIRES / TRAVAIL TEMPORAIRE ──

  // ── FORMATION / ENSEIGNEMENT ──
  {i:1516,b:null,n:"Formation professionnelle continue",s:"Formation professionnelle",g:"DC",fj:true},
  

  // ── ANIMATION / ACTION SOCIALE ──
  {i:1518,b:3246,n:"Animation ÉCLAT structures employant animateurs",s:"Animation ESS",g:"ANIM70",fj:false},  // CORRIGÉ: contingent 70h
  {i:1261,b:3177,n:"Centres sociaux et socio-culturels",s:"Action sociale",g:"CSS60",fj:false},  // CORRIGÉ: contingent 100h

  // ── SPECTACLE / CULTURE ──

  // ── HCR élargi ──
  {i:1979,b:null,n:"Restaurants d entreprise",s:"Restauration entreprise",g:"HCR",fj:false},
  {i:1979,b:null,n:"Hôtellerie de vacances et résidences",s:"Résidences vacances",g:"HCR",fj:false},
  {i:1979,b:null,n:"Traiteurs et cafétérias",s:"Traiteurs cafétérias",g:"HCR",fj:false},

  // ── ENTREPÔTS FRIGORIFIQUES ──

  // ── IMPRIMERIE SÉRIGRAPHIE ──

  // ── INDUSTRIES DIVERSES (suite) ──

  // ── COMMERCE SPÉCIALISÉ (suite) ──
  {i:2198,b:null,n:"Vente à distance e-commerce",s:"Commerce distance",g:"DC",fj:true},
  
  
  

  // ── MÉDICO-SOCIAL / ENFANCE (suite) ──
  

  // ── BANQUE / MUTUALITÉ (suite) ──

  // ── CCN NATIONALES COMPLÉMENTAIRES (DC 220h) — ajoutées v5.5 ──
  {i:29,b:3198,n:"Médico-social FEHAP CCN 51",s:"Médico-social FEHAP",g:"MEDSO110",fj:false},
  {i:43,b:null,n:"Import-export et commerce international",s:"Commerce international",g:"DC",fj:false},
  {i:45,b:null,n:"Caoutchouc industrie",s:"Industrie caoutchouc",g:"DC",fj:false},
  {i:3222,b:null,n:"Menuiseries charpentes constructions industrialisées",s:"Industrie bois",g:"DC",fj:false},
  {i:3249,b:null,n:"Industries de carrières et matériaux de construction",s:"Carrières matériaux construction",g:"DC",fj:false},
  {i:158,b:null,n:"Bois scieries négoce importation",s:"Industrie bois négoce",g:"DC",fj:false},
  {i:3205,b:null,n:"Coopératives de consommation",s:"Coopératives",g:"DC",fj:false},
  {i:3244,b:null,n:"Professions réglementées auprès des juridictions",s:"Juridictions professions réglementées",g:"DC",fj:false},
  {i:275,b:null,n:"Transport aérien personnel au sol accord national",s:"Transport aérien sol",g:"DC",fj:false},
  {i:303,b:null,n:"Couture parisienne",s:"Mode couture",g:"DC",fj:false},
  {i:3216,b:null,n:"Ouvriers négoce matériaux construction",s:"Négoce matériaux",g:"DC",fj:false},
  {i:3097,b:null,n:"Production cinématographique acteurs",s:"Cinéma production",g:"DC",fj:false},
  {i:454,b:null,n:"Remontées mécaniques domaines skiables",s:"Tourisme ski",g:"DC",fj:false},
  {i:478,b:null,n:"Sociétés financières établissements financiers",s:"Finance",g:"DC",fj:false},
  {i:500,b:null,n:"Commerce gros habillement mercerie chaussure jouet",s:"Commerce gros habillement",g:"DC",fj:false},
  {i:538,b:null,n:"Manutention ferroviaire travaux connexes",s:"Transport ferroviaire manut.",g:"DC",fj:false},
  {i:18,b:3106,n:"Industries textiles",s:"Industrie textile",g:"DC",fj:false},
  {i:669,b:3079,n:"Industries de fabrication mécanique du verre",s:"Industrie verrière",g:"DC",fj:false},
  {i:1930,b:3060,n:"Métiers de la transformation des grains (meunerie)",s:"Meunerie",g:"DC",fj:false},
  {i:2336,b:null,n:"Habitat et logement accompagnés (ex-foyers de jeunes travailleurs)",s:"FJT habitat jeunes",g:"DC",fj:true},
  {i:2378,b:null,n:"Salariés intérimaires des entreprises de travail temporaire",s:"Travail temporaire",g:"DC",fj:false},
  {i:3252,b:null,n:"Entreprises au service de la création et de l'événement",s:"Création événement entreprises",g:"DC",fj:false},
  {i:5619,b:null,n:"Pêche professionnelle maritime (CCN provisoire)",s:"Pêche maritime",g:"DC",fj:false},
  {i:653,b:null,n:"Producteurs salariés assurances services extérieurs",s:"Assurance producteurs",g:"DC",fj:false},
  {i:716,b:null,n:"Employés ouvriers distribution cinématographique",s:"Cinéma distribution",g:"DC",fj:false},
  {i:3243,b:null,n:"Commerces de quincaillerie, fournitures industrielles, fers, métaux et équipements de la maison",s:"Quincaillerie fournitures",g:"DC",fj:false},
  {i:733,b:null,n:"Détaillants en chaussures",s:"Commerce chaussures détail",g:"DC",fj:false},
  {i:759,b:null,n:"Pompes funèbres",s:"Services funéraires",g:"DC",fj:false},
  {i:787,b:null,n:"Cabinets experts-comptables commissaires aux comptes",s:"Finance audit comptable",g:"DC",fj:false},
  {i:3224,b:null,n:"Distribution et commerce de gros des papiers-cartons",s:"Distribution papiers cartons",g:"DC",fj:false},
  {i:804,b:null,n:"Voyageurs représentants placiers VRP accord national",s:"VRP",g:"DC",fj:false},
  {i:892,b:null,n:"Cadres distribution films cinéma",s:"Cinéma distribution cadres",g:"DC",fj:false},
  {i:897,b:null,n:"Services de santé au travail interentreprises",s:"Santé travail",g:"DC",fj:false},
  {i:915,b:null,n:"Expertises évaluations industrielles commerciales",s:"Expertise évaluation",g:"DC",fj:false},
  {i:959,b:null,n:"Laboratoires analyses médicales extra-hospitaliers",s:"Biologie médicale labo",g:"DC",fj:false},
  {i:3254,b:null,n:"Boucherie-Poissonnerie",s:"Boucherie poissonnerie",g:"DC",fj:false},
  {i:998,b:null,n:"Exploitation équipements thermiques génie climatique",s:"Génie climatique exploitation",g:"DC",fj:false},
  {i:1043,b:null,n:"Gardiens concierges employés immeubles résidences",s:"Gardiennage immeuble",g:"DC",fj:false},
  {i:1077,b:null,n:"Négoce industrie produits sol engrais",s:"Négoce agricole",g:"DC",fj:false},
  {i:1090,b:null,n:"Commerce réparation automobile cycle motocycle",s:"Automobile commerce réparation",g:"DC",fj:false},
  {i:1170,b:null,n:"Industrie tuiles et briques CCNTB",s:"Industrie matériaux",g:"DC",fj:false},
  {i:1256,b:null,n:"Cadres entreprises équipements thermiques climatisation",s:"Génie climatique cadres",g:"DC",fj:false},
  {i:1267,b:null,n:"Pâtisserie",s:"Artisanat pâtisserie",g:"DC",fj:false},
  {i:1286,b:null,n:"Confiserie chocolaterie biscuiterie détail artisans",s:"Artisanat confiserie",g:"DC",fj:false},
  {i:1307,b:null,n:"Exploitation cinématographique",s:"Cinéma exploitation",g:"DC",fj:false},
  {i:1405,b:null,n:"Expédition exportation fruits légumes",s:"Commerce fruits légumes",g:"DC",fj:false},
  {i:1408,b:null,n:"Distribution logistique services énergies proximité",s:"Distribution énergie",g:"DC",fj:false},
  {i:1412,b:null,n:"Installation entretien réparation matériel thermique frigorifique",s:"Génie climatique install.",g:"DC",fj:false},
  {i:2335,b:null,n:"Personnel agences générales assurances",s:"Assurance agences personnel",g:"ASSURAGE140",fj:false},
  {i:2683,b:null,n:"Portage de presse",s:"Presse portage",g:"DC",fj:false},
  {i:2691,b:null,n:"Enseignement privé indépendant",s:"Education privée",g:"DC",fj:false},
  {i:2727,b:null,n:"Omnipraticiens entreprises privées",s:"Santé omnipraticiens",g:"DC",fj:false},
  {i:2931,b:null,n:"Activités marchés financiers",s:"Finance marchés",g:"DC",fj:false},
  {i:2972,b:null,n:"Personnel sédentaire navigation",s:"Transport maritime",g:"DC",fj:false},
  {i:3013,b:null,n:"Librairie indépendante",s:"Commerce librairie",g:"DC",fj:false},
  {i:3016,b:null,n:"Ateliers chantiers insertion",s:"Insertion professionnelle",g:"DC",fj:false},
  {i:3017,b:null,n:"Ports et manutention unifiée",s:"Transport maritime port",g:"DC",fj:false},
  {i:3032,b:null,n:"Esthétique cosmétique parfumerie",s:"Esthétique beauté",g:"DC",fj:false},
  
  {i:3109,b:null,n:"Métiers du commerce détail alimentaire spécialisé 5 branches",s:"Commerce alim spécialisé 5B",g:"DC",fj:false},
  {i:3127,b:null,n:"Entreprises services à la personne",s:"Services personne",g:"DC",fj:false},
  {i:3203,b:null,n:"Structures coopératives agricoles bétail viande",s:"Coopérative viande",g:"DC",fj:false},
  {i:2543,b:null,n:"Cabinets géomètres-experts topographes",s:"Géomètre expert",g:"DC",fj:false},
  {i:3230,b:null,n:"Presse quotidienne et hebdomadaire",s:"Presse",g:"DC",fj:false},
  
  {i:3239,b:null,n:"Particuliers employeurs emploi à domicile",s:"Emploi domicile",g:"DC",fj:false},
  // --- v5.6.6 : contenus reconstitues sous leur VRAI numero IDCC (verifie DARES jan2026 + Predictice) ---
  // le mauvais numero qui portait ce contenu par erreur a ete retire en v5.6.3
  {i:1607,b:3130,n:"Jeux jouets articles de fêtes puériculture",s:"Industrie jouets puériculture",g:"DC",fj:false},
  {i:1266,b:3225,n:"Restauration de collectivités",s:"Restauration collective",g:"DC",fj:false},
  {i:1978,b:3010,n:"Fleuristes vente et services animaux familiers",s:"Fleuristes animalerie",g:"DC",fj:false},
  {i:2247,b:3110,n:"Courtage assurances et réassurances",s:"Assurance courtage",g:"ASSURCOURT150",fj:false},
  {i:7002,b:3616,n:"Coopératives agricoles céréales meunerie alimentation bétail oléagineux",s:"Coopératives agricoles",g:"DC",fj:false},
  // --- v5.6.7 : 91 CCN actives (DARES jan2026) absentes du fichier, ajoutees ---
  // pour couverture complete temps plein. Brochures confirmees quand connues.
  {i:86,b:3073,n:"Entreprises de publicité et assimilées",s:"Publicité",g:"DC",fj:false},
  {i:200,b:3178,n:"Exploitations frigorifiques",s:"Froid industriel",g:"DC",fj:false},
  {i:306,b:null,n:"Cadres techniques de la presse quotidienne parisienne",s:"Presse parisienne cadres",g:"DC",fj:false},
  {i:394,b:null,n:"Employés de la presse quotidienne parisienne",s:"Presse parisienne employés",g:"DC",fj:false},
  {i:405,b:null,n:"Établissements médico-sociaux UNISSS FFESCPE (enfants, adolescents)",s:"Médico-social enfants",g:"DC",fj:false},
  {i:509,b:null,n:"Cadres administratifs de la presse quotidienne parisienne",s:"Presse parisienne administratifs",g:"DC",fj:false},
  {i:3251,b:3051,n:"Bijouterie, joaillerie, orfèvrerie",s:"Bijouterie joaillerie",g:"DC",fj:false},
  {i:675,b:3065,n:"Maisons à succursales de vente au détail d'habillement",s:"Habillement succursales",g:"DC",fj:false},
  {i:783,b:null,n:"Centres d'hébergement et de réadaptation sociale (CHRS, SOP)",s:"Hébergement réadaptation sociale",g:"DC",fj:false},
  {i:1031,b:null,n:"Fédération nationale des associations familiales rurales (FNAFR)",s:"Associations familiales rurales",g:"DC",fj:false},
  {i:1147,b:3168,n:"Personnel des cabinets médicaux",s:"Cabinets médicaux",g:"DC",fj:false},
  {i:1182,b:3183,n:"Personnels des ports de plaisance",s:"Ports de plaisance",g:"DC",fj:false},
  {i:1285,b:null,n:"Entreprises artistiques et culturelles (SYNDEAC)",s:"Entreprises artistiques culturelles",g:"DC",fj:false},
  {i:1311,b:3227,n:"Restauration ferroviaire",s:"Restauration ferroviaire",g:"DC",fj:false},
  {i:1316,b:3151,n:"Organismes de tourisme social et familial",s:"Tourisme social familial",g:"DC",fj:false},
  {i:1396,b:3127,n:"Industries de produits alimentaires élaborés",s:"Produits alimentaires élaborés",g:"DC",fj:false},
  {i:1404,b:null,n:"Commerce, location, réparation de tracteurs et matériels agricoles, TP, bâtiment, motoculture (SEDIMA)",s:"Matériels agricoles TP SEDIMA",g:"DC",fj:false},
  {i:1411,b:3155,n:"Fabrication de l'ameublement",s:"Ameublement fabrication",g:"DC",fj:false},
  {i:1424,b:3099,n:"Réseaux de transports publics urbains de voyageurs",s:"Transports urbains voyageurs",g:"DC",fj:false},
  {i:1468,b:null,n:"Branche du Crédit mutuel",s:"Crédit mutuel",g:"DC",fj:false},
  {i:1480,b:3136,n:"Journalistes",s:"Journalisme",g:"DC",fj:false},
  {i:1487,b:3240,n:"Commerce de détail de l'horlogerie-bijouterie",s:"Horlogerie bijouterie détail",g:"DC",fj:false},
  {i:1499,b:3050,n:"Miroiterie, transformation et négoce du verre",s:"Miroiterie verre",g:"DC",fj:false},
  {i:1505,b:null,n:"Commerce de détail alimentaire non spécialisé",s:"Alimentaire détail non spécialisé",g:"DC",fj:false},
  {i:1513,b:3247,n:"Activités de production des eaux embouteillées, boissons rafraîchissantes sans alcool et bière",s:"Eaux embouteillées boissons",g:"DC",fj:false},
  {i:1534,b:3179,n:"Entreprises de l'industrie et des commerces en gros des viandes",s:"Commerce gros viandes",g:"DC",fj:false},
  {i:1536,b:null,n:"Distributeurs conseils hors domicile (CHD)",s:"Distributeurs boissons CHD",g:"DC",fj:false},
  {i:1539,b:null,n:"Commerces de détail de papeterie, fournitures de bureau, bureautique, informatique et librairie",s:"Papeterie fournitures bureau",g:"DC",fj:false},
  {i:1557,b:3049,n:"Commerce des articles de sports et d'équipements de loisirs",s:"Sports équipements loisirs",g:"DC",fj:false},
  {i:1558,b:3238,n:"Personnel des industries céramiques de France",s:"Industries céramiques",g:"DC",fj:false},
  {i:1586,b:3125,n:"Industrie de la salaison, charcuterie en gros et conserves de viandes",s:"Salaison charcuterie gros",g:"DC",fj:false},
  {i:1589,b:3256,n:"Mareyeurs-expéditeurs",s:"Mareyeurs expéditeurs",g:"DC",fj:false},
  {i:1605,b:3260,n:"Entreprises de désinfection, désinsectisation, dératisation (3D)",s:"Désinfection dératisation",g:"DC",fj:false},
  {i:1611,b:3261,n:"Entreprises de logistique de communication écrite directe",s:"Logistique publicité directe",g:"DC",fj:false},
  {i:1612,b:3259,n:"Personnel navigant des essais et réceptions",s:"Aviation essais réceptions",g:"DC",fj:false},
  {i:1621,b:3262,n:"Répartition pharmaceutique",s:"Répartition pharmaceutique",g:"DC",fj:false},
  {i:1671,b:3266,n:"Maisons d'étudiants",s:"Maisons d'étudiants",g:"DC",fj:false},
  {i:1679,b:3267,n:"Inspection d'assurance",s:"Inspection d'assurance",g:"DC",fj:false},
  {i:1686,b:3076,n:"Commerces et services de l'audiovisuel, de l'électronique et de l'équipement ménager",s:"Audiovisuel électroménager",g:"DC",fj:false},
  {i:1702,b:null,n:"Ouvriers de travaux publics",s:"Travaux publics ouvriers",g:"DC",fj:false},
  {i:1760,b:3272,n:"Jardineries et graineteries",s:"Jardineries graineteries",g:"DC",fj:false},
  {i:1790,b:3275,n:"Espaces de loisirs, d'attractions et culturels",s:"Loisirs attractions culturels",g:"DC",fj:false},
  {i:1794,b:3276,n:"Personnel des institutions de retraite complémentaire",s:"Retraite complémentaire",g:"DC",fj:false},
  {i:1801,b:3279,n:"Sociétés d'assistance",s:"Sociétés d'assistance",g:"DC",fj:false},
  {i:1821,b:3281,n:"Professions regroupées du cristal, du verre et du vitrail",s:"Cristal verre vitrail",g:"DC",fj:false},
  {i:1875,b:3282,n:"Cabinets et cliniques vétérinaires, personnel salarié",s:"Cliniques vétérinaires",g:"DC",fj:false},
  {i:1880,b:3056,n:"Négoce de l'ameublement",s:"Négoce ameublement",g:"DC",fj:false},
  {i:1909,b:3175,n:"Organismes de tourisme",s:"Organismes de tourisme",g:"DC",fj:false},
  {i:1938,b:3111,n:"Industries de la transformation des volailles",s:"Transformation volailles",g:"DC",fj:false},
  {i:1944,b:3288,n:"Personnel navigant technique des exploitants d'hélicoptères",s:"Hélicoptères personnel navigant",g:"DC",fj:false},
  {i:1951,b:3295,n:"Cabinets ou entreprises d'expertises en automobile",s:"Expertise automobile",g:"DC",fj:false},
  {i:1982,b:3286,n:"Négoce et prestations de services dans les domaines médico-techniques",s:"Médico-technique négoce",g:"DC",fj:false},
  {i:2021,b:3283,n:"Golf",s:"Golf",g:"DC",fj:false},
  {i:2060,b:3297,n:"Chaînes de cafétérias et assimilés",s:"Cafétérias chaînes",g:"HCR",fj:false},
  // --- v5.6.8 : croise contre le fichier officiel DARES Juin 2026 (uploade par Anthony) ---
  // 18 renommees vers leur successeur actif, 44 retirees (doublons/introuvables/malformees),
  // 6 agricoles reetiquetees, 3 reconstituees
  {i:7025,b:null,n:"ETARF entreprises travaux et services agricoles ruraux forestiers",s:"Agriculture ETARF",g:"DC",fj:false},
  {i:7502,b:null,n:"Mutualité sociale agricole",s:"MSA",g:"DC",fj:false},
  {i:7503,b:null,n:"Distilleries coopératives viticoles",s:"Viticulture distillerie",g:"DC",fj:false},
  {i:7508,b:null,n:"Maisons familiales rurales",s:"Enseignement rural",g:"DC",fj:false},
  {i:7513,b:null,n:"Centres initiatives en milieu rural",s:"Développement rural",g:"DC",fj:false},
  {i:7514,b:null,n:"Organismes de la Confédération paysanne",s:"Syndicat agricole",g:"DC",fj:false},
  {i:3090,b:3372,n:"Entreprises privées du spectacle vivant",s:"Spectacle vivant privé",g:"DC",fj:false},
  {i:3219,b:3383,n:"Branche des salariés en portage salarial",s:"Portage salarial",g:"DC",fj:false},
  {i:7017,b:3613,n:"Parcs et jardins zoologiques",s:"Zoos parcs animaliers",g:"DC",fj:false},
  {i:3105,b:null,n:"Régies de quartier",s:"Régies de quartier",g:"DC",fj:false},
  {i:3168,b:null,n:"Professions de la photographie",s:"Photographie",g:"DC",fj:false},
  {i:3210,b:null,n:"Banque Populaire",s:"Banque Populaire",g:"DC",fj:false},
  {i:3212,b:null,n:"Cadres des travaux publics",s:"Travaux publics cadres",g:"DC",fj:false},
  {i:3213,b:3169,n:"Économistes de la construction et métreurs-vérificateurs",s:"Économistes construction",g:"DC",fj:false},
  {i:3218,b:null,n:"Enseignement privé non lucratif",s:"Enseignement privé non lucratif",g:"DC",fj:false},
  {i:3220,b:3385,n:"Offices publics de l'habitat",s:"Offices publics habitat",g:"DC",fj:false},
  {i:3221,b:null,n:"Agences de presse (employés, techniciens, cadres)",s:"Agences de presse",g:"DC",fj:false},
  {i:3223,b:null,n:"Transports et services maritimes, personnels navigants officiers",s:"Transports maritimes officiers",g:"DC",fj:false},
  {i:3225,b:null,n:"Éditeurs de la presse magazine (employés et cadres)",s:"Presse magazine",g:"DC",fj:false},
  {i:3228,b:null,n:"Armateurs de services de passages d'eau, personnel navigant",s:"Passages d'eau navigants",g:"DC",fj:false},
  {i:3229,b:null,n:"Personnel sédentaire du transport de marchandises en navigation intérieure",s:"Navigation intérieure marchandises",g:"DC",fj:false},
  {i:3232,b:null,n:"Agents de direction des organismes du régime général de sécurité sociale",s:"Sécu agents de direction",g:"DC",fj:false},
  {i:3233,b:null,n:"Industrie de la fabrication des ciments",s:"Ciment fabrication",g:"DC",fj:false},
  {i:3235,b:null,n:"Parfumerie sélective",s:"Parfumerie sélective",g:"DC",fj:false},
  {i:3236,b:null,n:"Industrie et services nautiques",s:"Nautisme",g:"DC",fj:false},
  {i:3241,b:null,n:"Télédiffusion",s:"Télédiffusion",g:"DC",fj:false},
  {i:3242,b:null,n:"Presse quotidienne et hebdomadaire en régions",s:"Presse régionale",g:"DC",fj:false},
  {i:3245,b:3245,n:"Opérateurs de voyages et guides",s:"Voyages guides",g:"DC",fj:false},
  // --- v5.6.10 : 57 CCN regionales/DOM-TOM actives, ajoutees ---
  // meme regime HS que la metropole (Livre IV Code du travail : adaptations
  // sur jours feries/journee solidarite, pas sur contingent ni majoration)
  // sauf Mayotte (code du travail propre, non concernee ici)
  {i:214,b:null,n:"Presse Région parisienne ouvriers",s:"Presse Région parisienne ouvriers",g:"DC",fj:false},
  {i:379,b:null,n:"Commerces Martinique",s:"Commerces Martinique",g:"DC",fj:false},
  {i:440,b:null,n:"Sucrerie Réunion",s:"Sucrerie Réunion",g:"DC",fj:false},
  {i:627,b:null,n:"Bâtiment TP ETAM La Réunion",s:"Bâtiment TP ETAM La Réunion",g:"DC",fj:false},
  {i:749,b:null,n:"Bâtiment TP ouvriers Martinique",s:"Bâtiment TP ouvriers Martinique",g:"DC",fj:false},
  {i:771,b:null,n:"Bâtiment TP Cadres La Réunion",s:"Bâtiment TP Cadres La Réunion",g:"DC",fj:false},
  {i:901,b:null,n:"Boulangerie Martinique",s:"Boulangerie Martinique",g:"DC",fj:false},
  {i:919,b:null,n:"Personnel des garages de la Martinique",s:"Personnel des garages de la Martinique",g:"DC",fj:false},
  {i:1049,b:null,n:"Bâtiment TP ouvriers St Pierre Miquelon",s:"Bâtiment TP ouvriers St Pierre Miquelon",g:"DC",fj:false},
  {i:1050,b:null,n:"Commerces St Pierre Miquelon",s:"Commerces St Pierre Miquelon",g:"DC",fj:false},
  {i:1057,b:null,n:"Consignataire de navires Martinique",s:"Consignataire de navires Martinique",g:"DC",fj:false},
  {i:1060,b:null,n:"Métallurgie Martinique",s:"Métallurgie Martinique",g:"DC",fj:false},
  {i:1069,b:null,n:"Répartition pharmaceutique Martinique",s:"Répartition pharmaceutique Martinique",g:"DC",fj:false},
  {i:1072,b:null,n:"Manutention portuaire St Pierre",s:"Manutention portuaire St Pierre",g:"DC",fj:false},
  {i:1140,b:null,n:"Hôtels St Pierre Miquelon",s:"Hôtels St Pierre Miquelon",g:"HCR",fj:false},
  {i:1203,b:null,n:"Commerces services Guadeloupe",s:"Commerces services Guadeloupe",g:"DC",fj:false},
  {i:1225,b:null,n:"Commerces la Réunion",s:"Commerces la Réunion",g:"DC",fj:false},
  {i:1232,b:null,n:"Hôtellerie Guadeloupe",s:"Hôtellerie Guadeloupe",g:"HCR",fj:false},
  {i:1247,b:null,n:"Commerces de l'automobile la Réunion",s:"Commerces de l'automobile la Réunion",g:"DC",fj:false},
  {i:1257,b:null,n:"Pharmacie d'officine Réunion",s:"Pharmacie d'officine Réunion",g:"DC",fj:false},
  {i:1341,b:null,n:"Industrie agro alimentaires Réunion",s:"Industrie agro alimentaires Réunion",g:"DC",fj:false},
  {i:1565,b:null,n:"Soins infirmiers à domicile Guadeloupe",s:"Soins infirmiers à domicile Guadeloupe",g:"DC",fj:false},
  {i:1700,b:null,n:"Sucrerie distillerie Guadeloupe",s:"Sucrerie distillerie Guadeloupe",g:"DC",fj:false},
  {i:1843,b:null,n:"Bâtiment cadres Région parisienne",s:"Bâtiment cadres Région parisienne",g:"DC",fj:false},
  {i:1923,b:null,n:"Manutention portuaire Guadeloupe",s:"Manutention portuaire Guadeloupe",g:"DC",fj:false},
  {i:1961,b:null,n:"Stations Service Guadeloupe",s:"Stations Service Guadeloupe",g:"DC",fj:false},
  {i:1980,b:null,n:"Commissionnaires en douane Martinique",s:"Commissionnaires en douane Martinique",g:"DC",fj:false},
  {i:2025,b:null,n:"Mines Guyane",s:"Mines Guyane",g:"DC",fj:false},
  {i:2250,b:null,n:"Boulangerie pâtisserie de la Guyane",s:"Boulangerie pâtisserie de la Guyane",g:"DC",fj:false},
  {i:2328,b:null,n:"Bâtiment TP ouvriers Guadeloupe",s:"Bâtiment TP ouvriers Guadeloupe",g:"DC",fj:false},
  {i:2345,b:null,n:"Transport sanitaire en Martinique",s:"Transport sanitaire en Martinique",g:"DC",fj:false},
  {i:2360,b:null,n:"Services de l'automobile Guyane",s:"Services de l'automobile Guyane",g:"DC",fj:false},
  {i:2389,b:null,n:"Bâtiment TP ouvriers La Réunion",s:"Bâtiment TP ouvriers La Réunion",g:"DC",fj:false},
  {i:2405,b:null,n:"Hospitalisation Guadeloupe",s:"Hospitalisation Guadeloupe",g:"DC",fj:false},
  {i:2480,b:null,n:"Manutention portuaire Fort de France",s:"Manutention portuaire Fort de France",g:"DC",fj:false},
  {i:2534,b:null,n:"Industrie sucrière et rhumière Martinique",s:"Industrie sucrière et rhumière Martinique",g:"DC",fj:false},
  {i:2535,b:null,n:"Culture canne à sucre Martinique",s:"Culture canne à sucre Martinique",g:"DC",fj:false},
  {i:2631,b:null,n:"Télédiffusion (accords CDD)",s:"Télédiffusion (accords CDD)",g:"DC",fj:false},
  {i:2658,b:null,n:"Guides et accompagnateurs milieu amazonien",s:"Guides et accompagnateurs milieu amazonien",g:"DC",fj:false},
  {i:2701,b:null,n:"Banques Guyane",s:"Banques Guyane",g:"DC",fj:false},
  {i:2702,b:null,n:"Banques Martinique",s:"Banques Martinique",g:"DC",fj:false},
  {i:2704,b:null,n:"Banques Guadeloupe St Martin",s:"Banques Guadeloupe St Martin",g:"DC",fj:false},
  {i:2766,b:null,n:"Sécurité sociale des mines personnels non cadres",s:"Sécurité sociale des mines personnels non cadres",g:"DC",fj:false},
  {i:2870,b:null,n:"Bâtiment TP ouvriers Guyane",s:"Bâtiment TP ouvriers Guyane",g:"DC",fj:false},
  {i:2964,b:null,n:"Transport de proximité produits pétroliers Martinique",s:"Transport de proximité produits pétroliers Martinique",g:"DC",fj:false},
  {i:3028,b:null,n:"Transports routiers de la Guadeloupe",s:"Transports routiers de la Guadeloupe",g:"TRANSP",fj:false},
  {i:3107,b:null,n:"Bâtiment TP ETAM Martinique",s:"Bâtiment TP ETAM Martinique",g:"DC",fj:false},
  {i:3123,b:null,n:"Ambulances Guyane",s:"Ambulances Guyane",g:"DC",fj:false},
  {i:3128,b:null,n:"BTP Industrie activités connexes Guyane - ETAM",s:"BTP Industrie activités connexes Guyane - ETAM",g:"DC",fj:false},
  {i:3140,b:null,n:"Commerce Sces commerciaux HCR St Pierre et Miquelon",s:"Commerce Sces commerciaux HCR St Pierre et Miquelon",g:"HCR",fj:false},
  {i:3144,b:null,n:"Bâtiment TP ETAM Guadeloupe",s:"Bâtiment TP ETAM Guadeloupe",g:"DC",fj:false},
  {i:3204,b:null,n:"Bâtiment TP ingénieurs et cadres Guyane",s:"Bâtiment TP ingénieurs et cadres Guyane",g:"DC",fj:false},
  {i:3206,b:null,n:"Cabinets médicaux Martinique",s:"Cabinets médicaux Martinique",g:"DC",fj:false},
  {i:3207,b:null,n:"Transports sanitaires de Guadeloupe",s:"Transports sanitaires de Guadeloupe",g:"DC",fj:false},
  {i:5521,b:null,n:"Transports maritimes personnel navigant d'exécution",s:"Transports maritimes personnel navigant d'exécution",g:"DC",fj:false},
  {i:5554,b:null,n:"Remorquage maritime officiers",s:"Remorquage maritime officiers",g:"DC",fj:false},
  {i:5555,b:null,n:"Remorquage maritime navigant d'exécution",s:"Remorquage maritime navigant d'exécution",g:"DC",fj:false},
  // --- v5.6.11 : dernier check, 12 CCN agricoles nationales actives ajoutees ---
  // (187 variantes agricoles departementales identifiees mais non ajoutees, cf commentaire fin de fichier)
  {i:1659,b:null,n:"Rouissage teillage du lin",s:"Lin rouissage teillage",g:"DC",fj:false},
  {i:7001,b:null,n:"Coopératives et SICA bétail et viandes",s:"Coopératives agricoles bétail",g:"DC",fj:false},
  {i:7004,b:null,n:"Coopératives laitières et unions de coopératives",s:"Coopératives laitières",g:"DC",fj:false},
  {i:7009,b:null,n:"Entreprises d'accouvage et de sélection avicole",s:"Accouvage sélection avicole",g:"DC",fj:false},
  {i:7010,b:null,n:"Personnel des élevages aquacoles",s:"Aquaculture élevage",g:"DC",fj:false},
  {i:7019,b:null,n:"Conchyliculture",s:"Conchyliculture",g:"DC",fj:false},
  {i:7020,b:null,n:"Réseau des centres d'économie rurale",s:"Centres économie rurale",g:"DC",fj:false},
  {i:7026,b:null,n:"Activités hippiques",s:"Activités hippiques",g:"DC",fj:false},
  {i:7027,b:null,n:"Conseil et service en élevage",s:"Conseil service élevage",g:"DC",fj:false},
  {i:7028,b:null,n:"Coopératives agricoles et unions de coopératives",s:"Coopératives agricoles",g:"DC",fj:false},
  {i:7501,b:null,n:"Caisses régionales du Crédit agricole",s:"Crédit agricole",g:"DC",fj:false},
  {i:7520,b:null,n:"Salariés des établissements d'enseignement agricole privé",s:"Enseignement agricole privé",g:"DC",fj:false},
  {i:2089,b:3113,n:"Industrie des panneaux à base de bois",s:"Panneaux bois",g:"DC",fj:false},
  {i:2098,b:3301,n:"Personnel des prestataires de services du secteur tertiaire",s:"Prestataires services tertiaire",g:"DC",fj:false},
  {i:2128,b:3300,n:"Mutualité",s:"Mutualité",g:"DC",fj:false},
  {i:2147,b:3302,n:"Entreprises des services d'eau et d'assainissement",s:"Eau assainissement",g:"DC",fj:false},
  {i:2148,b:3303,n:"Télécommunications",s:"Télécommunications",g:"DC",fj:false},
  {i:2149,b:3156,n:"Activités du déchet",s:"Déchet activités",g:"DC",fj:false},
  {i:2150,b:3190,n:"Personnels des sociétés anonymes et fondations d'HLM",s:"HLM sociétés anonymes",g:"DC",fj:false},
  {i:2156,b:3082,n:"Grands magasins et magasins populaires",s:"Grands magasins",g:"DC",fj:false},
  {i:2190,b:null,n:"Missions locales et PAIO",s:"Missions locales PAIO",g:"DC",fj:false},
  {i:2219,b:null,n:"Taxis",s:"Taxis",g:"DC",fj:false},
  {i:2272,b:3309,n:"Assainissement et maintenance industrielle",s:"Assainissement industriel",g:"DC",fj:false},
  {i:2372,b:null,n:"Entreprises de la distribution directe",s:"Distribution directe",g:"DC",fj:false},
  {i:2412,b:3314,n:"Production de films d'animation",s:"Films d'animation production",g:"DC",fj:false},
  {i:2420,b:3322,n:"Cadres du bâtiment",s:"Bâtiment cadres",g:"DC",fj:false},
  {i:2494,b:null,n:"Coopération maritime",s:"Coopération maritime",g:"DC",fj:false},
  {i:2583,b:3336,n:"Sociétés concessionnaires ou exploitantes d'autoroutes",s:"Autoroutes concessionnaires",g:"DC",fj:false},
  {i:2603,b:null,n:"Praticiens-conseils du régime général de sécurité sociale",s:"Praticiens-conseils sécu",g:"DC",fj:false},
  {i:2609,b:3002,n:"Employés, techniciens et agents de maîtrise du bâtiment",s:"Bâtiment ETAM",g:"DC",fj:false},
  {i:2614,b:null,n:"Employés, techniciens et agents de maîtrise des travaux publics",s:"Travaux publics ETAM",g:"DC",fj:false},
  {i:2642,b:3346,n:"Production audiovisuelle",s:"Production audiovisuelle",g:"DC",fj:false},
  {i:2668,b:null,n:"Cadres supérieurs des sociétés de secours minières",s:"Secours minières cadres",g:"DC",fj:false},
  {i:2697,b:null,n:"Personnels des structures associatives cynégétiques",s:"Chasse associations",g:"DC",fj:false},
  {i:2768,b:null,n:"Pharmaciens du régime minier",s:"Pharmaciens régime minier",g:"DC",fj:false},
  {i:2847,b:3367,n:"Pôle Emploi",s:"Pôle Emploi",g:"DC",fj:false},
  {i:2978,b:null,n:"Personnel salarié des agences de recherches privées",s:"Agences recherches privées",g:"DC",fj:false},
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
  if (weeklyH > 44) w.push('Surveiller moyenne 12 semaines (max 44h L3121-22)');
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
  version: '5.6.12',
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
