# Audit fox — Round 2 : vérifications Légifrance + Glossaire + Kitsune + corrections appliquées

**Date** : 19/07/2026 (suite du rapport `AUDIT-fox-articles-loi-rapport.md`)

## 1. Ce qui a changé par rapport au round 1

Le round 1 comparait `articles-loi.js` contre `output/` (votre export PISTE). Ce round 2 :
- vérifie en direct sur Légifrance les citations que `output/` ne couvrait pas (demande explicite)
- étend l'audit au **glossaire** (`GLOSSAIRE_BASE`, intégré dans `index.html`) et aux **messages/bulles du kitsune** (`_kitsuneMessages` dans `index.html` + le module de chat `ai-integration.js`)
- applique les corrections confirmées directement dans les fichiers

## 2. Glossaire et kitsune — ce qui a été trouvé

`GLOSSAIRE_BASE` fait 648 entrées, mais la quasi-totalité sont des définitions thématiques sans numéro d'article précis (donc rien à croiser). Seules **13 entrées** citent un article identifiable — dont les messages "Info droit" du glossaire (Msg. #31 à #39), qui sont en fait le **même contenu que les réponses du chat Kitsune** dans `ai-integration.js` (`_legalLimits`) : les deux sont synchronisés, donc un bug dans l'un est un bug dans l'autre.

`_kitsuneMessages` (50 messages déclenchés selon le nombre d'heures sup détectées) : 11 messages citent un article, **tous corrects** — aucune correction nécessaire ici.

### 2 bugs trouvés, présents en double (glossaire + ai-integration.js)

| Sujet | Citait | Erreur | Corrigé en |
|---|---|---|---|
| Travail de nuit, période horaire | Art. L3122-1 | L3122-1 = obligation de justifier le recours au travail de nuit (déjà correctement utilisé ailleurs dans `articles-loi.js`), pas la période horaire. Et "6h" était faux : le texte de L3122-2 dit "21h-7h" (9h consécutives min. incluant minuit-5h) | **Art. L3122-2**, "21h-7h" |
| Repos dominical | Art. L3132-1 | Même bug que celui trouvé au round 1 dans `articles-loi.js` : L3132-1 = interdiction de travailler plus de 6 jours consécutifs, pas le repos dominical | **Art. L3132-3** (+ suppression du "minimum +100%", non généralisable — la majoration dépend du régime de dérogation et de la CCN) |

Les deux corrections ont été appliquées dans `index.html` (glossaire) et `js/ai-integration.js` (chat). Le reste du glossaire et des bulles est correct.

## 3. Vérifications Légifrance en direct (round 2)

En plus des 4 vérifications du round 1, 8 nouvelles confirmations obtenues cette fois-ci :

| Citait (faux) | Contenu réel de fox | Confirmé être | Statut |
|---|---|---|---|
| L1243-1 | Renouvellement CDD (2 fois max) | **L1243-13** | ✅ vérifié Légifrance |
| L1221-23 | Durée période d'essai (2/3/4 mois) | **L1221-19** | ✅ vérifié Légifrance |
| L1221-25 | Renouvellement période d'essai | **L1221-21** | ✅ vérifié Légifrance |
| L1241-1 | CDD = exception, jamais un emploi permanent | **L1242-1** | ✅ vérifié Légifrance |
| L4411-1 | "Médecin du travail conseiller de l'employeur..." | **R4623-1** (texte identique mot pour mot — pas L4622-3 comme envisagé au round 1) | ✅ vérifié Légifrance |
| L5213-1 | Obligation d'emploi 6%, ≥20 salariés | **L5212-2** | ✅ vérifié Légifrance |
| L1225-65 | Congé parental d'éducation (1 an renouvelable x2) | **L1225-47** (L1225-65 parle en fait du congé de *présence* parentale, un dispositif différent) | ✅ vérifié Légifrance |
| L2261-22 | Dénonciation CCN, préavis 3 mois | **L2261-9** (texte quasi identique mot pour mot) | ✅ vérifié Légifrance |
| L1233-1 | Définition licenciement économique | **L1233-3** (texte identique mot pour mot) | ✅ vérifié Légifrance |
| L1237-18 | Définition RCC | **L1237-19** (texte identique mot pour mot) | ✅ vérifié Légifrance |
| L3241-1 | Paiement mensuel du salaire | **L3242-1** | ✅ vérifié Légifrance |

**L3231-2 (SMIC)** a aussi été recherché : pas de correction fiable à proposer — le contenu de fox mélange en réalité 3 dispositions différentes (L3231-1 = champ d'application, L3231-2 = finalités, L3231-4/5 = mécanisme de revalorisation). Laissé **tel quel** dans le fichier corrigé plutôt que d'appliquer une hypothèse non confirmée — à traiter séparément si besoin.

## 4. Toutes les corrections appliquées dans `articles-loi.js`

18 citations corrigées au total (7 du round 1 confirmées en interne + 11 vérifiées Légifrance ce round) :

L3132-1→L3132-2 · L3121-8→L3121-18 · L3121-9→L3121-20 (2ᵉ occurrence uniquement) · L3121-29→D3121-24 · L3121-39→L3121-44 · L3121-37 (2ᵉ occurrence, précision "sans délégué syndical" ajoutée) · L1243-1→L1243-13 · L3241-1→L3242-1 · L1221-23→L1221-19 · L1221-25→L1221-21 · L1241-1→L1242-1 · L4221-1→L1311-2 + L1321-1 · L4411-1→R4623-1 · L5213-1→L5212-2 (+ correction terminologie OETH/Agefiph) · L1225-65→L1225-47 · L2261-22→L2261-9 · L1237-18→L1237-19 · L1233-1→L1233-3

**L3133-4** (contenu obsolète sur "enfants/femmes en établissements industriels") : désactivée (commentée) plutôt que renumérotée — pas de source de remplacement confirmée, et le contenu lui-même n'a plus sa place dans le Code du travail actuel.

Fichier revérifié après coup : la syntaxe est valide (164 entrées actives + 1 désactivée, contre 165 actives avant).

## 5. Encore ouvert (non corrigé, laissé tel quel dans le fichier)

Ces citations restent fausses dans le fichier livré — je n'ai pas de source fiable pour les corriger sans deviner :

| Art. cité | Sujet | Piste non confirmée |
|---|---|---|
| L1237-1 | Démission | Pas d'article codifié pour "volonté claire et non équivoque" — c'est de la jurisprudence constante, pas un article. À reformuler plutôt qu'à re-citer. |
| L2315-1 | Heures de délégation CSE | Probablement L2315-7, non vérifié |
| L3231-2 | SMIC | Voir section 3 — mélange de 3 articles |
| L3232-1 | Allocation si horaire réduit | Contresens ; pas de piste identifiée |
| L1226-6 | Protection licenciement en arrêt maladie | Pas de piste identifiée |
| L3141-12 | Prise des congés / report | Piste incertaine |
| L3141-26 | Indemnité compensatrice due même en faute grave | Probablement L3141-28, non vérifié |
| L6323-1 (x2) | CPF création + utilisation | Pas de piste identifiée pour les deux occurrences |
| L5211-1 | Service public de l'emploi | Piste incertaine |
| L3221-2 | Égalité rémunération F/H | Échec technique PISTE (401), pas re-testé |
| L3142-24-1 | Don de jours de repos | Introuvable dans l'API, numérotation probablement décalée |

Je peux continuer sur ceux-là dans un round 3 si tu veux — dis-moi juste si tu préfères que je cherche sur Légifrance comme cette fois, ou que tu relances l'Aspirateur Légifrance dessus.

## 6. Fichiers livrés dans le zip

- `articles-loi.js` — corrigé (18 citations + 1 désactivation)
- `index.html` — corrigé (2 bugs glossaire/kitsune)
- `ai-integration.js` — corrigé (mêmes 2 bugs, côté chat)
- les deux rapports d'audit (round 1 + round 2)

Aucun autre fichier de `fox/` n'a été touché.
