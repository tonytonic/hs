# Audit croisé conventions-collectives.js — rapport complet

**Période** : 17–18 juillet 2026
**Fichier audité** : `conventions-collectives.js` (module CCN de Simulateur Heures Sup France)
**Résultat** : 404 → 319 entrées (v4.x → v5.6.11)

---

## 1. Objectif

Corriger les IDCC erronés du fichier de référence CCN de l'application, vérifier le
contingent et le taux de majoration associés à chaque groupe de règles, et compléter la
couverture avec les CCN actives manquantes — pour que l'utilisateur final obtienne le bon
calcul d'heures supplémentaires quel que soit sa convention collective réelle.

## 2. Sources utilisées, par ordre chronologique d'intervention

1. **Repo GitHub "Aspirateur Légifrance"** (`anthonychauvel/droit`) — données KALI brutes
   récupérées via l'API PISTE, plus un audit `audit-ccn-erreurs.csv` catégorisant 386 IDCC
   en échec de récupération (absorption agricole 2021, renumérotations DARES/web,
   doublons, non résolus).
2. **Titre officiel Légifrance** de chaque IDCC individuel, dans `output/ccn/_summary.json`
   du même repo (310 IDCC récupérés avec succès sur 696 tentés).
3. **Liste DARES/DGT des CCN actives au 1ᵉʳ janvier 2026** (via salaire-minimum.com,
   source ministère du Travail, ~727 CCN, transcrite pour les IDCC 16 à 3017).
4. **Base Predictice** (450 CCN avec statut explicite Vigueur/Remplacé/Abrogé/Périmé/
   Dénoncé/Modifié) — la seule source avec statut explicite avant le fichier DARES final.
5. **Registre Juristique** (~1000 CCN, incluant les codes régionaux/départementaux et la
   série agricole 08xxx/09xxx) — troisième recoupement indépendant.
6. **Fichier officiel DARES "Suivi Historique convention collective" (juin 2026)**, fourni
   directement par Anthony — 1665 CCN (feuille "Conventions de branche") + 181 accords et
   statuts (feuille "Accords et statuts"), avec flag actif/inactif explicite ET le
   successeur officiel (`NouvIDCC`) pour chaque CCN remplacée. **Source la plus fiable de
   tout l'audit** — utilisée pour la passe finale de recroisement.

## 3. Historique des versions

| Version | Delta | Ce qui a changé |
|---|---|---|
| v5.6.1 | 404 → 304 | 92 IDCC agricoles départementaux retirés (fusion nationale 2021, confirmés par les textes officiels 7024/7025/7004 qui les citent comme "ex-IDCC") + 8 doublons retirés (confirmés multi-sources) |
| v5.6.2 | 304 → 298 | 2ᵉ passe : titre officiel de la *cible* elle-même vérifié (pas juste le texte DARES tronqué) → 6 doublons retirés dont 800→1979 (impact calcul réel : groupe DC au lieu de HCR) + 1 renommage (83→3222) |
| v5.6.3 | 298 → 254 | Recoupement DARES jan2026 : 44 entrées confirmées fausses + 9 IDCC fictifs (noms "modernes" inventés, ex. "Intelligence artificielle et data") retirés |
| v5.6.4 | 254 → 240 | Recoupement Predictice (statuts explicites) : 14 entrées retirées (Remplacé/Abrogé/Périmé) |
| v5.6.5 | 240 → 200 | Recoupement Juristique (3ᵉ source) : confirme 31 numéros de la zone 1636-1791 comme totalement fictifs + 10 autres faux/inexistants |
| v5.6.6 | 200 → 183 | **Audit d'identité terminé** : les 24 derniers cas en doute tranchés (2 confirmés bons, 22 retirés, 5 reconstituées sous leur vrai numéro) |
| v5.6.7 | 183 → 274 | 91 CCN nationales actives ajoutées (couverture, pas juste correction) |
| v5.6.8–9 | 274 → 250 | Recroisement contre le fichier DARES officiel (juin 2026) : 18 renommées vers leur successeur actif, 44 retirées, 6 agricoles ré-étiquetées, 9 reconstituées, 19 CCN nationales actives supplémentaires |
| v5.6.10 | 250 → 307 | 57 CCN régionales/DOM-TOM actives ajoutées, après vérification légale que le contingent/majoration DOM-TOM suit le droit commun métropolitain (Livre IV Code du travail : adaptations sur jours fériés et journée de solidarité uniquement) |
| v5.6.11 | 307 → 319 | Dernier contrôle : 12 CCN agricoles nationales actives ajoutées |

**Total : 221 entrées retirées ou renommées, 185 ajoutées ou reconstituées, sur 11 versions.**

## 4. Méthodologie et garde-fous appliqués

- **IDCC 5730** (commerce de gros non alimentaire) volontairement exclu de toute
  correction du début à la fin — alias interne documenté pour distinguer alimentaire (573)
  / non alimentaire, pas une erreur.
- **Aucune correction appliquée sur la seule foi d'une source unique** quand un doute
  existait : le recoupement DARES automatique du repo droit s'est montré peu fiable (25
  suggestions sur 35 se sont révélées fausses après vérification du titre officiel de la
  cible) — leçon methodologique gardée pour la suite.
- **Validation systématique après chaque version** : rechargement du fichier dans Node,
  `calculerHS()` exécuté sur chaque entrée (0 erreur à chaque étape), vérification des
  clés dupliquées (seul doublon volontaire : IDCC 1979 × 4, alias HCR intentionnels),
  vérification que les 205+ entrées non concernées par une correction restent identiques
  au fichier d'origine.
- **Impact calcul distingué de l'impact label** : la grande majorité des corrections
  portaient sur des entrées du groupe DC (droit commun) — retirer ou renommer une entrée
  DC n'affecte jamais le calcul, seulement la recherche par nom. Un seul cas à impact
  calcul réel identifié : IDCC 800 (hôtels de chaîne), qui pointait vers DC au lieu de HCR.
- **DOM-TOM** : ajout conditionné à la vérification légale préalable que le régime heures
  sup (contingent, majoration) suit le droit commun métropolitain (confirmé — les
  adaptations du Livre IV du Code du travail portent sur les jours fériés et la journée de
  solidarité, pas sur les heures supplémentaires). Seule exception réelle : Mayotte, qui a
  son propre code du travail — non concernée par cet ajout.
- **Autocontrôle** : au moins deux erreurs de la session elle-même détectées et corrigées
  avant livraison — un faux positif de transcription (IDCC 1261, exclu à tort d'un retrait
  puis réintégré) et un bug d'échappement d'apostrophe sur l'entrée 3252.

## 5. Ce qui reste ouvert

| Sujet | Détail |
|---|---|
| 5 groupes à confirmer | IDCC 1424, 1621, 1679, 2603, 2768 — ajoutés en groupe DC par défaut, noms évoquant un taux potentiellement dérogatoire mais non confirmé. Voir `a-suivre.csv`. |
| 187 CCN agricoles départementales | Actives selon le fichier DARES officiel mais non ajoutées — même niveau de granularité que les 92 codes 9xxx retirés en v5.6.1 (une entrée par département et par sous-filière). Toutes tomberaient sur le groupe DC de toute façon. Disponibles sur demande. |
| 99 IDCC sans donnée officielle | Côté repo droit, l'API PISTE n'a pas pu récupérer ces IDCC (échec de fetch). Nécessite un accès réseau direct (relancer l'aspirateur `--only-missing`), hors de portée de cette session. |
| 18 groupes de taux non vérifiés | Seul le groupe DC (droit commun, 25 %/50 %, 220 h) a été revérifié directement contre le Code du travail (art. L3121-36, D3121-24). Les 18 autres groupes dérogatoires (HCR, transport, chimie, etc.) n'ont pas été revérifiés cette session — nécessite `fetch_overtime_details.py` côté repo droit, qui n'a pas encore tourné. |

## 6. Fichiers livrés

- `conventions-collectives.js` — fichier corrigé, v5.6.11, 319 entrées
- `a-suivre.csv` — liste des points encore ouverts (groupes à confirmer)
- `Dares_Suivi_Historique_convention_collective_Juin2026.xlsx` — fichier source officiel
  fourni par Anthony, inclus pour référence/traçabilité
- `AUDIT-CCN-rapport.md` — ce document
