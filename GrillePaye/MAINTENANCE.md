# GrillePaye — Guide de maintenance (pour Dede/Sodise)

## Architecture des fichiers

```
GrillePaye/
├── index.html        Module standalone (données embarquées en base64)
├── ccn-data.json     Source des données CCN (350 KB)
└── MAINTENANCE.md    Ce guide
```

---

## 1. Mettre à jour le SMIC

### Via l'interface (sans toucher au code)
→ Ouvrir `index.html` → onglet **⚙️ Admin** → **SMIC de référence**
→ Cliquer **⚡ SMIC 2026** ou saisir manuellement
→ **💾 Enregistrer** → stocké dans localStorage du navigateur

### Dans le JSON source (`ccn-data.json`)
Chercher en haut du fichier :
```json
{
  "_smic": 1823.03,
  "_smic_date": "01/01/2026",
  "_smic_src": "Décret n°2025-1228 du 17 décembre 2025",
```
Modifier ces 3 valeurs. Le prochain rebuild embarquera le nouveau SMIC.

### Dans le code source (`index.html`)
Chercher `const SMIC_DEF=` → modifier la valeur :
```js
const SMIC_DEF=1823.03,SDATE_DEF="01/01/2026",SSRC_DEF="Décret n°2025-1228";
```

---

## 2. Mettre à jour une CCN (grille salariale)

### Structure d'une grille dans `ccn-data.json`

```json
"1486": {
  "st": "real",
  "d": "01/01/2025",
  "s": "Source officielle — avenant du JJ/MM/AAAA",
  "g": [
    {
      "n": "1.1",        ← Code du niveau (affiché dans l'UI)
      "c": 240,          ← Coefficient numérique (null si pas de coef)
      "l": "ETAM position 1.1 — Employé(e) débutant(e)",  ← Libellé
      "b": 1823,         ← Montant brut mensuel en €
      "t": "fixed",      ← "fixed" (€ fixe) ou "pct" (% SMIC)
      "cat": "ETAM"      ← Catégorie (Ouvrier/Employé/Technicien/AM/Cadre)
    },
    ...
  ]
}
```

### Champs `st` (statut)
| Valeur | Signification | Badge UI |
|--------|--------------|----------|
| `"real"` | Données vérifiées source branche | 🟢 |
| `"national"` | CCN agri. dép. → redirige IDCC 9811 | 🔵 |
| `"estimated"` | Estimé % SMIC (à compléter) | 🟠 |

### Champ `t` (type de montant)
- `"fixed"` → montant en € brut mensuel (ex: `"b": 1823`)
- `"pct"` → pourcentage du SMIC (ex: `"b": 100.5` = 100.5% du SMIC)

---

## 3. Ajouter une nouvelle CCN

1. Trouver l'IDCC sur [Légifrance → Conventions collectives](https://www.legifrance.gouv.fr/conv-coll/liste)
2. Vérifier qu'elle est dans la liste `CCN_ALIASES` du fichier `conventions-collectives.js`
3. Ajouter dans `ccn-data.json` :

```json
"IDCC": {
  "st": "real",
  "d": "01/MM/AAAA",
  "s": "Avenant n°XX du JJ/MM/AAAA — source",
  "g": [
    { "n": "N1", "c": null, "l": "Libellé niveau 1", "b": 1823, "t": "fixed", "cat": "Employé" },
    { "n": "N2", "c": null, "l": "Libellé niveau 2", "b": 2000, "t": "fixed", "cat": "Technicien" }
  ]
}
```

4. Reconstruire `index.html` (voir §6)

---

## 4. Sources officielles à consulter

| Source | URL | Fréquence |
|--------|-----|-----------|
| **Légifrance** | https://www.legifrance.gouv.fr/conv-coll/liste | Dès avenant signé |
| **BOCC** (Bulletin Officiel Conventions Collectives) | https://bocc.travail.gouv.fr | Hebdomadaire |
| **Service-public.fr** | https://www.service-public.fr/professionnels-entreprises/vosdroits/F2265 | SMIC uniquement |
| **Ministère du Travail** | https://travail-emploi.gouv.fr/dialogue-social/la-negociation-collective | Textes étendus |

**Mots-clés de recherche Légifrance** : `IDCC XXXX avenant salaires 2025`  
**Filtre** : Textes de base → Avenants → Salaires minimaux

---

## 5. Calendrier habituel des revalorisations

| Période | Événement |
|---------|-----------|
| **1er janvier** | SMIC légal (décret décembre N-1) |
| **1er mai** | Rattrapage SMIC si inflation > 2% |
| **Janvier–Mars** | NAO transport routier, sécurité, propreté |
| **Avril–Juin** | NAO HCR, commerce, bâtiment |
| **Octobre–Décembre** | NAO chimie, métallurgie, Syntec |

---

## 6. Reconstruire index.html après mise à jour JSON

### Prérequis : Node.js ≥ 18

```bash
# Cloner le repo (si sur GitHub)
git clone https://github.com/SODISE/GrillePaye
cd GrillePaye

# Modifier ccn-data.json (voir §2 et §3)
# Puis rebuild :
node gen_clean.js

# Résultat : index.html mis à jour avec les nouvelles données embarquées
```

### Sans rebuild (via Admin UI)
Pour des corrections ponctuelles **sans toucher au code** :
1. Ouvrir `index.html`
2. Aller dans **⚙️ Admin → Grilles CCN**
3. Rechercher la CCN, modifier les niveaux
4. **💾 Enregistrer** → stocké localement
5. **Export JSON** → sauvegarder les modifs pour le prochain rebuild

---

## 7. Variables clés dans `index.html`

```js
// === Chercher dans le source === //

const SMIC_DEF=1823.03           // ← SMIC par défaut embarqué
const SDATE_DEF="01/01/2026"     // ← Date du SMIC
const SSRC_DEF="Décret n°2025-1228" // ← Source décret

const _B64="..."                 // ← Données CCN encodées base64 (NE PAS MODIFIER MANUELLEMENT)
                                 //   Générées automatiquement par gen_clean.js

const HS_DEF={                   // ← Règles heures supplémentaires par groupe CCN
  DC:{n:"Droit commun",cg:220,mh:48,t1:25,p1:8,t2:50,...},
  SECU329:{n:"Sécurité privée",cg:329,...},
  // etc.
}
```

---

## 8. Groupes HS — correspondance

| Code | CCN concernées | Contingent/an | Taux HS1 | Taux HS2 |
|------|---------------|--------------|---------|---------|
| `DC` | Droit commun (défaut) | 220h | +25% | +50% |
| `HCR` | Hôtels, cafés, restaurants | 360h | +10% puis +20% | +50% |
| `SECU329` | Sécurité privée | 329h | +25% | +50% |
| `PROP190` | Propreté/nettoyage | 190h | +25% | +50% |
| `SYNTEC130` | Syntec/IT | 130h | +25% | +50% |
| `TRANSP` | Transport routier | 195h | +25% | +50% |
| `BOULAN329` | Boulangerie artisanale | 329h | +25% | +50% |
| `IAA180` | IAA, BTP, Imprimerie | 180h | +25% | +50% |
| `CHIM130` | Chimie, plasturgie | 130h | +25% | +50% |
| `COIF200` | Coiffure | 200h | +25% | +50% |
| `ASSUR70` | Assurances | 70h | +25% | +50% |
| `ANIM70` | Animation (ÉCLAT) | 70h | +25% | +50% |

---

## 9. Checklist mise à jour annuelle (janvier)

- [ ] Nouveau SMIC ? → Décret paru en décembre → mettre à jour `_smic` dans JSON + rebuild
- [ ] CCN transport routier (IDCC 16) → NAO octobre/novembre → montants M (marchandises) et V (voyageurs)
- [ ] CCN sécurité privée (IDCC 1351) → accord triennal → taux HS à vérifier
- [ ] CCN propreté (IDCC 3043/3186) → avenant mars/avril
- [ ] CCN HCR (IDCC 1979) → avenant annuel janvier/février
- [ ] CCN métallurgie ANU (IDCC 3248) → avenant janvier/février
- [ ] CCN Syntec (IDCC 1486) → avenant décembre/janvier
- [ ] CCN bâtiment ouvriers (IDCC 1596/1597) → avenant régional IDF
- [ ] CCN pharmacie officine (IDCC 2104) → avenant mai/juin
- [ ] Mise à jour `_version` et `_date` dans JSON
- [ ] Rebuild index.html → `node gen_clean.js`
- [ ] Commit + push GitHub → déploiement automatique Vercel/GitHub Pages

---

*GrillePaye v2026-05-22 — Sodise — Développé par Dede*  
*Sources : Légifrance, BOCC, avenants de branche — Données indicatives*

---

## 10. Comment mener une évaluation conjointe avec GrillePaye

*(Directive EU 2023/970 — Art. 10 — obligatoire si écart H/F > 5% persistant)*

### Qui est concerné ?
| Effectif | Obligation |
|----------|-----------|
| Toutes tailles | Rapport H/F si demandé · Droit info individuel art. 7 |
| ≥ 50 sal. | Rapport annuel écart H/F → juin 2027 |
| ≥ 100 sal. | Rapport détaillé (déciles, médiane) → juin 2027 |
| ≥ 250 sal. | Audit conjoint si écart > 5% → dans les 6 mois |

### Les 6 étapes avec GrillePaye

**Étape 1 — Import des données anonymisées**
```
Préparer le CSV : remplacer les noms par des codes (S001, S002…)
Colonnes minimum : id, poste, idcc, coef, salaire_brut, groupe, sexe
Colonnes enrichies : certifications, management, experience_extra, penibilite, mobilite, justification
→ 🔍 Conformité → 📂 Import → glisser le CSV
```

**Étape 2 — Définir les groupes de valeur égale**
```
En concertation avec le CSE/syndicats, définir quels postes sont comparables
→ 📊 Transparence → 🏛️ Politique RH → "Groupes de postes comparables"
Documenter : nom du groupe, justification, décidé par qui
L'outil applique ces groupes — il ne les décide pas
```

**Étape 3 — Analyser les écarts**
```
→ 🔍 Conformité → 📊 Analyse : bandeau KPIs 5%, alertes, écarts H/F
→ 🔍 Conformité → ⚖️ Valeur égale : comparaison peer-to-peer par groupe+coef
Partager l'écran avec le CSE ou exporter le CSV des alertes
```

**Étape 4 — Documenter les justifications (décision RH)**
```
Pour chaque écart > 5% discuté en réunion :
  → Ajouter la justification dans le CSV colonne "justification"
  → Réimporter → l'écart passe de rouge (non justifié) à orange (justifié)
Ou via 📊 Transparence → 👤 Profils → champ Justification
Cette décision appartient au management — pas à l'outil
```

**Étape 5 — Fiches individuelles si demande salarié (art. 7)**
```
Délai de réponse : 2 mois après la demande
→ 🔍 Conformité → 🪪 Fiches → sélectionner le salarié
→ Choisir le mode (complet / sans salaires collègues / minimal art.7)
→ Imprimer en PDF (Ctrl+P / ⌘+P)
La fiche contient : position grille CCN, critères objectifs, justification, position vs groupe
```

**Étape 6 — Archivage**
```
→ 🔍 Conformité → 📋 Rapport → Export CSV complet
Archiver avec : PV réunion CSE, justifications validées, fiches remises
En cas de contrôle DREETS/inspection : traçabilité complète disponible
```

### Délais réglementaires à respecter

```
7 juin 2026  → Transposition directive FR (décrets attendus)
Juin 2027    → 1er rapport H/F annuel (≥ 50 sal.)
Juin 2027    → 1er rapport détaillé (≥ 100 sal.)
J+6 mois     → Évaluation conjointe si écart > 5% persistant (≥ 250 sal.)
À tout moment → Droit d'information individuel art. 7 (délai réponse 2 mois)
```

### Ce que GrillePaye fait dans ce processus

| Action | GrillePaye | Entreprise (humain) |
|--------|-----------|---------------------|
| Calculer les écarts vs CCN | ✅ | |
| Détecter les anomalies > 5% | ✅ | |
| Générer les fiches individuelles | ✅ | |
| Exporter les données pour le CSE | ✅ | |
| Décider des groupes de valeur égale | | ✅ Direction + CSE |
| Justifier les écarts | | ✅ Management / RH |
| Décider d'une augmentation | | ✅ Direction |
| Mener le dialogue avec les syndicats | | ✅ Relations sociales |
| Valider la politique salariale | | ✅ DRH / Direction |

> **Rappel légal** : GrillePaye est un outil d'aide à la décision. Il constate, 
> mesure et alerte. Il ne décide pas, ne valide pas et ne remplace pas 
> le pouvoir de direction ni la négociation collective.

---

*GrillePaye v2026-05-22 · Sodise · Développé par Dede*  
*Sources : Légifrance · BOCC · Directive EU 2023/970 · Données indicatives*
