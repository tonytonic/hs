# Audit — `fox/js/articles-loi.js` vs `output/` (source officielle Légifrance/PISTE)

**Date** : 19/07/2026
**Méthode** : extraction programmatique des 165 entrées de `ARTICLES_LOI` (via Node/vm, pour éviter les erreurs de parsing manuel), indexation des 501 fichiers JSON de `output/code-travail/` + `output/code-secu/` par numéro d'article, puis comparaison une à une du champ `def` de fox contre le champ `texte` officiel. Les corrections proposées les plus incertaines ont été recoupées sur Légifrance en direct (4 vérifications faites, toutes confirmées — détail en fin de rapport).

## Résumé chiffré

| | |
|---|---|
| Articles dans `articles-loi.js` | 165 (dont 11 codes cités 2 à 4 fois chacun → 154 codes uniques) |
| Résolus dans `output/` avec `etat: VIGUEUR` | 163 |
| Non résolus dans `output/` (à traiter à part) | 2 |
| **Citations où le texte officiel ne correspond pas au contenu décrit par fox** | **30** |
| Imprécisions/généralisations mineures (contenu globalement correct) | 7 |
| Entrées correctes, vérifiées conformes | ~126 |

Aucun article cité n'est **abrogé** (`etat` ≠ `VIGUEUR` partout où trouvé) — bonne nouvelle, ce n'est donc pas un problème de fraîcheur des données mais de **numéro d'article mal attribué au bon contenu**. Le taux d'erreur (~18-22% en comptant les deux catégories) est significativement plus élevé que le taux résiduel de ~3% mesuré lors de l'audit conventions-collectives.js — ce fichier n'avait probablement pas encore reçu de passe de vérification croisée à ce niveau de granularité.

---

## 1. Citations erronées confirmées (30)

Le texte officiel de l'article cité ne soutient pas ce que `def` affirme. Dans la majorité des cas, le contenu décrit par fox est **juridiquement correct** mais rattaché au **mauvais numéro** — souvent un article voisin qui traite d'un sujet proche mais distinct. Colonne « Confiance » : ✅ = confirmé indépendamment (soit par une autre entrée de fox elle-même déjà validée par `output/`, soit par recherche Légifrance directe) ; ⚠️ = hypothèse raisonnée, non recoupée à la source.

| Art. cité | Titre fox | Contenu réel de l'article cité (`output/`) | Contenu probablement visé se trouve à | Confiance |
|---|---|---|---|---|
| L3132-**1** | Repos hebdo 24h+11h=35h | « Interdit de faire travailler plus de 6 jours/semaine » | **L3132-2** | ✅ confirmé 2x (entrée [47] de fox elle-même + constante `legal-engine.js` `REST_WEEKLY_MIN`) |
| L3121-**8** | Durée max quotidienne 10h | Rémunération temps de restauration/habillage | **L3121-18** | ✅ confirmé (entrée [3] de fox, identique) |
| L3121-**9** (2e occurrence) | Durée max hebdo absolue 48h | Définition de l'astreinte | **L3121-20** | ✅ confirmé (entrée [4] + [16] de fox) |
| L3121-**29** | Contingent HS 220h | « Les heures sup se décomptent par semaine » | **D3121-24 / L3121-33** | ✅ confirmé (entrées [8]/[15]/[108]) |
| L3121-**39** | Aménagement temps travail > semaine | Contingent supplétif fixé par décret | **L3121-44** | ✅ confirmé (entrée [38]) |
| L1233-**1** | Définition licenciement économique | Champ d'application du chapitre | **L1233-3** | ✅ **vérifié sur Légifrance** : texte identique mot pour mot |
| L2261-**22** | Dénonciation CCN (préavis 3 mois) | Liste des clauses obligatoires d'une convention étendue | **L2261-9** | ✅ **vérifié sur Légifrance** : texte quasi identique mot pour mot |
| L1221-**23** | Durée période d'essai (2/3/4 mois) | « La période d'essai ne se présume pas, doit être écrite » | **L1221-19** | ✅ **vérifié sur Légifrance** |
| L1237-**1** | Démission (volonté claire et non équivoque) | Préavis de démission | Pas d'article codifié équivalent — notion jurisprudentielle | ⚠️ |
| L1243-**1** | CDD terme et renouvellement (2 fois max) | Rupture anticipée du CDD (faute grave/force majeure) | probablement **L1243-13** | ⚠️ |
| L3141-**12** | Prise des congés — droit / report | Droit aux congés dès l'embauche | probablement **L3141-13** ou voisin | ⚠️ |
| L3141-**26** | Indemnité compensatrice due même en faute grave | Calcul de l'indemnité pour professions au pourboire | probablement **L3141-28** | ⚠️ |
| L3241-**1** | Salaire payé mensuellement | Formes de paiement (espèces/chèque/virement) | probablement **L3242-1** | ⚠️ |
| L3243-**1** | Mentions obligatoires du bulletin de paie | Champ d'application du chapitre | probablement **L3243-2** | ⚠️ |
| L1221-**25** | Renouvellement période d'essai | Délai de prévenance en fin de période d'essai | probablement **L1221-21** | ⚠️ |
| L1226-**6** | Protection licenciement pendant arrêt maladie | Exclusion de champ (AT/MP chez un autre employeur) | pas de correspondance directe identifiée | ⚠️ |
| L1241-**1** | CDD = exception, cas limités | Exclusion apprentissage/intérim du titre | probablement **L1242-1** ou **L1242-2** | ⚠️ |
| L2315-**1** | Heures de délégation CSE | Fonctionnement CSE salariés hors site | probablement **L2315-7** | ⚠️ |
| L3133-**4** | Enfants/femmes en établissements industriels | « Le 1er mai est jour férié et chômé » | contenu obsolète, sans rapport avec le texte en vigueur | ⚠️ à retirer ou reformuler entièrement |
| L3231-**2** | SMIC obligatoire + revalorisation annuelle | Finalités du SMIC (pouvoir d'achat, développement économique) | probablement **L3231-1** (+ art. distinct pour la revalorisation) | ⚠️ |
| L3232-**1** | Allocation si horaire réduit <35h | Garantie de rémunération pour salarié à temps plein | contresens : l'article dit l'inverse de ce que fox décrit | ⚠️ |
| L4221-**1** | Règlement intérieur obligatoire ≥50 salariés | Aménagement hygiène/sécurité des locaux | sans rapport. Le contenu de `def` mélange en fait deux articles distincts, tous deux réels : **L1311-2** (seuil des 50 salariés) + **L1321-1** (contenu : mesures santé/sécurité + règles disciplinaires) | ✅ **vérifié sur Légifrance**, les deux moitiés de la phrase correspondent chacune exactement à un article différent |
| L4411-**1** | Médecin du travail conseiller de l'employeur | Étiquetage substances chimiques dangereuses | probablement **L4622-3** | ⚠️ |
| L5211-**1** | Structure du service public de l'emploi | Reclassement des travailleurs handicapés | probablement **L5312-1** | ⚠️ |
| L5213-**1** | Obligation d'emploi 6% ≥20 salariés | Définition du travailleur handicapé | probablement **L5212-2** | ⚠️ |
| L6323-**1** (création) | CPF alimenté en euros/an | Renvoi ouverture/fermeture à L5151-2 | contenu sans rapport | ⚠️ |
| L6323-**1** (utilisation) | CPF finance formations certifiantes | Renvoi ouverture/fermeture à L5151-2 (texte identique au précédent, alors que le `def` diffère) | contenu sans rapport, + incohérent avec l'autre entrée L6323-1 | ⚠️ |
| L1225-**65** | Congé parental d'éducation (1 an renouvelable x2) | Ancienneté pendant le congé de *présence* parentale (dispositif différent) | probablement **L1225-47** ou **L1225-48** | ⚠️ |
| L1237-**18** | Rupture conventionnelle collective (définition) | Congé de mobilité proposé dans le cadre d'une RCC | probablement **L1237-19** | ⚠️ |
| L3121-**37** (2e occurrence, entrée « Remplacement du paiement par du repos ») | Reprend le libellé général de L3121-33-II | Cas spécifique : entreprise **sans délégué syndical** uniquement | l'entrée [9] de fox cite la même base correctement ; la 2e occurrence est une version imprécise du même article | ✅ incohérence interne |

---

## 2. Imprécisions mineures (contenu globalement exact, à surveiller)

- **L1222-1** (« bonne foi ») — `def` ajoute une phrase sur les « conditions d'exécution impossibles » absente du texte (art. laconique d'une seule phrase). Pas faux, mais c'est de la glose non sourcée.
- **L1222-6** — décrit une modification de contrat « générique » (salaire/horaires/qualification) alors que l'article ne couvre que les modifications pour **motif économique** ; omet aussi la règle du silence valant acceptation après 1 mois.
- **L2242-17** (« droit à la déconnexion ») — l'article couvre en réalité toute la négociation annuelle QVT/égalité pro (8 thèmes) ; fox n'en extrait qu'un point (le 7°). Fidèle sur ce point précis, mais le `titre` suggère à tort que l'article est dédié à la déconnexion.
- **L3111-1** — ajoute « cadres dirigeants, VRP, apprentis » non présents dans le texte (vrai en général, mais pas dans cet article).
- **L1234-9** (indemnité légale licenciement) — les taux « 1/4 puis 1/3 de mois » sont exacts dans la réalité mais relèvent de **R1234-2**, pas de L1234-9 qui renvoie « à la voie réglementaire ».
- **L3141-1** (droit aux congés payés) — fox ajoute une condition « d'un mois de travail effectif » absente du texte actuel (post-2016) — **et contredit sa propre entrée L3141-12** qui affirme que les congés sont pris « dès l'embauche ». Incohérence interne à corriger en priorité.
- **L3142-1** (congés événements familiaux) — les durées citées (4j/3j/5j/7j) sont correctes mais relèvent de **L3142-4**, pas de L3142-1 qui ne fait que lister les événements ouvrant droit à congé.

---

## 3. Non vérifiables via `output/` (2)

| Art. | Titre fox | Statut `output/` | Remarque |
|---|---|---|---|
| L3221-2 | Égalité rémunération F/H | `_error: 401` (échec technique de la requête PISTE, pas une absence de l'article) | À re-tester ; le contenu décrit par fox est plausible pour ce numéro |
| L3142-24-1 | Don de jours de repos | `article: null` (requête réussie, mais rien à ce numéro exact) | Même famille de problème que L3252-13/L3300-1 déjà identifiés dans l'audit LEGI.pdf précédent — numérotation probablement légèrement décalée |

---

## 4. Doublons de code (11 articles cités 2 à 4 fois)

La plupart sont cohérents entre eux (paragraphes différents du même article, légitimement cités séparément) : L2312-8, L3121-27, L3121-33, L3121-36, L3132-3, L4121-1, L3131-1. **Trois posent problème** et sont déjà détaillés dans les sections 1 et 2 ci-dessus :
- **L3121-9** — une occurrence correcte (astreinte), une fausse (48h hebdo)
- **L3121-37** — une occurrence précise et correcte, une généralisée/imprécise
- **L6323-1** — les deux occurrences sont fausses et incohérentes entre elles

---

## 5. Vérifications Légifrance en direct

Pour les cas les plus surprenants (contenu totalement sans rapport), 4 hypothèses de correction ont été confirmées mot pour mot sur Légifrance : **L1233-3** (licenciement économique), **L2261-9** (dénonciation CCN, préavis 3 mois), **L1221-19** (durée période d'essai 2/3/4 mois), et **L1311-2 + L1321-1** (règlement intérieur — seuil et contenu, respectivement). Les autres corrections proposées (⚠️) restent des hypothèses raisonnées à confirmer avant application — je n'ai pas de données officielles pour ces numéros dans votre `output/` puisqu'ils n'y ont pas été interrogés à l'origine.

---

## Suggestion pour la suite

Deux options selon votre méthode habituelle :
1. Vous relancez l'Aspirateur Légifrance sur les ~23 numéros « probablement » identifiés ci-dessus (ceux marqués ⚠️) pour obtenir leur `output/` officiel et confirmer avant toute correction — comme pour l'audit CCN.
2. Je prépare directement un `articles-loi.js` corrigé pour les cas déjà confirmés (lignes ✅ du tableau) + je liste le reste en `a-verifier.csv` pour validation avant application — sans toucher au fichier tant que ce n'est pas confirmé.
