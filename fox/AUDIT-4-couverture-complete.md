# Audit fox — Round 4 : couverture complète (fichiers restants + glossaire intégral)

**Date** : 19/07/2026 (suite des rounds 1 à 3)

Ce round couvre tout ce qui manquait encore : les fichiers fox/*.js avec des citations légales jamais auditées, et les 635 entrées du glossaire sans numéro d'article (impossibles à croiser avec `output/`, donc vérifiées une par une contre mes connaissances + recherches Légifrance).

## 1. Fichiers audités ligne par ligne

| Fichier | Occurrences | Résultat |
|---|---|---|
| `combat.js` | 6 | 1 erreur trouvée et corrigée |
| `export-rtf.js` | 2 | Tout correct |
| `module-reader.js` | 3 | Tout correct |
| `scenarios-fox-data.js` | 2 | Tout correct |
| `vue-pro.js` | 30 | 2 erreurs trouvées et corrigées |
| `scenarios-ai.js` | 12 | 2 erreurs trouvées et corrigées |

## 2. Erreurs trouvées et corrigées

| Fichier | Sujet | Erreur | Correction |
|---|---|---|---|
| `combat.js` | Scénario combat "Nuit Non Compensée" | Citait L3122-5 (statut travailleur de nuit) pour parler de l'absence de compensation | → **L3122-8** ✅ vérifié Légifrance et 5 sources indépendantes (contreparties travail de nuit) |
| `vue-pro.js` | Tableau "Références légales" | "Période de nuit légale (21h–6h)" — même bug que rounds précédents | → **21h–7h** |
| `vue-pro.js` | Tableau "Références légales" | L3122-9 pour "Contreparties travail de nuit" | → **L3122-8** ✅ vérifié (L3122-9 est en réalité une exception ponctuelle, pas la règle générale) |
| `scenarios-ai.js` | Scénario "Heures non déclarées" | Inventait un "délai de prescription réduit à 6 mois" avant les 3 ans — ce délai réduit n'existe pas, la prescription salariale est uniformément de 3 ans | Corrigé : uniquement 3 ans (L3245-1, déjà vérifié) |
| `scenarios-ai.js` | Scénario "Première nuit" (Ahmed) | "21h et 6h selon définition légale, ou 21h-7h selon accord" — logique inversée : 21h-7h EST le défaut légal, c'est l'accord qui peut fixer une autre période | Corrigé : 21h-7h présenté comme le défaut légal |

## 3. Glossaire — les 635 entrées sans citation d'article

Répartition : 600 entrées "Sc. #N" (scénarios courts liés aux modules de saisie d'heures) + 35 entrées diverses (bulles kitsune génériques, définitions CCN/IDCC, catégories).

La quasi-totalité est rédigée de façon générique et prudente ("selon convention collective", "situation à surveiller"), donc peu exposée à l'erreur factuelle précise. Deux erreurs numériques trouvées quand même :

| Entrée | Erreur | Correction |
|---|---|---|
| Sc. #11 "1 Nuit isolée" | "Nuit = 21h-6h" | → **21h-7h** (même bug que partout ailleurs) |
| Sc. #71 "Congé paternité" | "28 jours calendaires (dont 7 obligatoires)" | → **25 jours dont 4 obligatoires (32 jours pour naissances multiples)** — vérifié Légifrance |

### Fausse alerte évitée

J'ai failli corriger Sc. #127 ("Congé naissance : 3 jours + congé paternité") en pensant que le congé de naissance était passé à 7 jours au 1er juillet 2026 — une source de recherche l'affirmait. **Vérification directe sur Légifrance (L3142-4, modifié le 12 juin 2026)** : c'est resté à 3 jours. La confusion venait du fait que 3 jours (naissance) + 4 jours (début obligatoire du congé paternité) = 7 jours consécutifs en pratique, mais ce n'est pas le congé de naissance lui-même qui est passé à 7 jours. Aucune correction faite ici — exactement le genre d'erreur qu'imposer la vérification à la source officielle permet d'éviter.

### À signaler, hors périmètre légal strict

- **Nouveau "congé supplémentaire de naissance"** (1 à 2 mois, indemnisé, entré en vigueur le 1er juillet 2026 pour les enfants nés depuis le 1er janvier 2026, LFSS 2026) : absent de tout le contenu fox actuel. C'est une vraie nouveauté, pas une correction — je ne l'ai pas ajoutée de moi-même, à voir si tu veux l'intégrer.
- **Msg. #29** (accueil kitsune) dit *"Je connais... tes données personnelles"*. Ce n'est pas une erreur légale, mais la formulation peut sembler en tension avec la politique "zero collection, zero tracking" — à reformuler si tu veux éviter toute ambiguïté, même si techniquement il s'agit seulement des données saisies localement.

## 4. Bilan cumulé — 4 rounds

- **34 corrections** appliquées au total dans le code (29 dans `articles-loi.js` + 5 dans les autres fichiers)
- **1 entrée désactivée** (contenu obsolète)
- **2 reformulées en jurisprudence**
- **Fichiers modifiés** : `articles-loi.js`, `index.html`, `ai-integration.js`, `combat.js`, `vue-pro.js`, `scenarios-ai.js`
- Tous revalidés syntaxiquement après correction

Cette fois, c'est un audit exhaustif : tous les fichiers fox/ contenant des références légales ont été vérifiés, article par article, et les 635 entrées non citées du glossaire ont été relues intégralement.
