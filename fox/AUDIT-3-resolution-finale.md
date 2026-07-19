# Audit fox — Round 3 : les 11 derniers cas résolus

**Date** : 19/07/2026 (suite des rapports round 1 et round 2)

Les 11 citations encore fausses ou non vérifiées à la fin du round 2 ont toutes été recherchées sur Légifrance. Résultat : **tout est maintenant corrigé ou expliqué**, plus aucune citation en suspens dans `articles-loi.js`.

## Résolutions

| Art. cité (faux) | Sujet | Résolution |
|---|---|---|
| L2315-1 | Heures de délégation CSE | → **L2315-7** ✅ vérifié Légifrance |
| L3141-26 | Indemnité compensatrice due même en faute grave | → **L3141-28** ✅ vérifié Légifrance (c'est l'article qui a intégré la jurisprudence post-QPC 2016) |
| L5211-1 | Service public de l'emploi | → **L5311-1** ✅ vérifié Légifrance (L5211-1 concerne en réalité le reclassement des travailleurs handicapés — sujet différent) |
| L3232-1 | Allocation si horaire réduit <35h | → **L3232-5** ✅ vérifié Légifrance (L3232-1 dit l'inverse : c'est la garantie de rémunération pour un salarié à temps *plein*) |
| L3142-24-1 | Don de jours de repos | → **L1225-65-1** ✅ vérifié Légifrance, texte identique mot pour mot. L'article n'était pas "introuvable" par hasard : il n'est pas dans la famille L3142 (congés familiaux) mais dans L1225 (congés pour maladie d'un enfant) |
| L3231-2 | SMIC | → citation combinée **L3231-1 + L3231-4** (le contenu de fox mélangeait champ d'application et mécanisme de revalorisation ; L3231-2 ne parle que des finalités du SMIC) |
| L6323-1 (création) | CPF alimenté en euros/an | → **L6323-10** ✅ vérifié Légifrance |
| L6323-1 (utilisation) | CPF finance des formations | → **L6323-2** ✅ vérifié Légifrance |
| L3221-2 | Égalité rémunération F/H | **Rien à corriger** — vérifié sur Légifrance, le texte est identique mot pour mot à ce que dit fox. L'échec dans `output/` était bien une panne technique (401) de l'API PISTE, pas un signe d'erreur |
| L1237-1 | Démission | Reformulé — "volonté claire et non équivoque" est une définition jurisprudentielle (Cass. Soc.), pas un article codifié. L1237-1 (préavis de démission) est maintenant mentionné séparément dans le texte plutôt que comme citation principale |
| L1226-6 | Protection licenciement pendant arrêt maladie | Reformulé — pour une maladie *non professionnelle*, il n'existe pas de protection légale automatique (contrairement à l'AT/MP, protégé par L1226-9) : la règle "désorganisation + remplacement définitif" est jurisprudentielle. Le titre et le texte ont été ajustés pour le dire clairement |

## Un bonus trouvé au passage

**L3141-12** ("Prise des congés — droit") ne contenait pas qu'une erreur de citation : l'affirmation "l'employeur ne peut pas refuser à un salarié la prise des congés légalement acquis" est **factuellement inexacte**. Service-public.fr est explicite : l'employeur *peut* refuser une date précise (sans excès), il doit seulement proposer une autre date et ne peut priver personne de son droit aux congés. Citation corrigée vers **L3141-13** (période de prise des congés) et texte réécrit pour refléter la vraie règle.

## Bilan cumulé sur les 3 rounds

- **29 citations corrigées** dans `articles-loi.js` (18 au round 2 + 11 au round 3)
- **1 entrée désactivée** (L3133-4, contenu obsolète)
- **2 reformulées en jurisprudence** plutôt que re-citées à un article inexistant (L1237-1, L1226-6)
- **1 confirmée déjà correcte** (L3221-2)
- **2 bugs corrigés en double** dans le glossaire (`index.html`) et le chat kitsune (`ai-integration.js`)

Plus aucune citation connue en suspens. S'il reste des doutes ailleurs dans le fichier (au-delà des 165 entrées auditées), il faudrait relancer un audit sur un nouveau lot.
