# Lot 2 — onglet « Nos sources », veille hebdomadaire, correctifs

```
GrillePaye/index.html               onglet + compteurs recadrés
GrillePaye/ccn-data.json            statuts 675 et 993 corrigés
GrillePaye/suivi-public.json        données publiques régénérées
GrillePaye/generer-suivi-public.py  générateur
verifier-fraicheur.py               la veille, à la racine
workflow/.github/workflows/verification.yml
```

Bump du service worker après déploiement.

---

## ⚠️ Le workflow doit rester sur la branche par défaut

Les fichiers de production sont sur **`Android-cloudfare-production`**, pas sur `main`.
Deux conséquences, et la seconde est un piège :

**Le workflow va chercher les fichiers sur la bonne branche.** Sans le `ref:` ajouté, il
aurait vérifié ceux de `main` et annoncé des résultats ne correspondant à rien de déployé.
La branche et le commit vérifiés sont désormais rappelés en tête du rapport.

**Mais le fichier du workflow, lui, doit rester sur la branche par défaut.** GitHub ne
déclenche les exécutions planifiées que depuis celle-ci : un `schedule:` posé sur la
branche de production ne se lancerait **jamais**. Le workflow vit donc sur `main` et lit
la production.

La branche est réglable au lancement, si tu as besoin de vérifier autre chose.

---

## Veille automatique du mercredi

Planifiée le **mercredi à 7h UTC** — l'aspirateur tourne lundi et jeudi, le mercredi tombe
après le commit du lundi et avant celui du jeudi.

### La notification, sans quoi la veille ne sert à rien

GitHub ne notifie que les échecs. Un run hebdomadaire qui découvre une grille périmée
serait passé inaperçu.

Quand la veille trouve quelque chose, le workflow **ouvre un ticket** avec le rapport en
corps de message. Un seul ticket est maintenu : le suivant met à jour le précédent. S'il
n'y a rien, aucun ticket.

---

## La veille porte maintenant les montants

Le rapport ne se contente plus de signaler qu'un avenant est plus récent : il **recopie
les montants** relevés dans la clause.

```
### IDCC 16 — Transport routier de marchandises

Grille affichée : 01/02/2026 · Clause au fonds : 15/05/2026 · écart 103 jours

> Avenant salaires du 15 mai 2026

Montants relevés dans la clause :

- Le coefficient 120 est porté à 1 875,40 € mensuels bruts pour 151,67 heures.
- Le coefficient 130 est porté à 1 942,10 euros.
- Le coefficient 150 est fixé à 2 088,55 €.
```

Seules les phrases contenant un montant sont retenues : les considérants et les demandes
d'extension sont écartés. Tu ouvres la notification, tu as les chiffres, tu saisis — sans
rouvrir l'avenant.

**Le script ne modifie toujours aucun montant.** Il recopie ce qu'il lit ; l'interprétation
reste la tienne.

---

## Correctif : 675 et 993 n'étaient pas des estimations périmées

Je les avais classées « estimations non réancrées après la revalorisation du SMIC », et
j'allais les recalculer sur 1 867,02 €. **C'était une erreur qui aurait détruit des données
vérifiées.**

Tes notes du 18/07 sont formelles :

> **993** — « CONTRÔLE COMPLET 18/07 : montants **RÉELS trouvés** (remplace l'incertitude)
> — 1837 € (personnel service) / 1857 € (auxiliaire) / 1916-2224 € (TQ1-TQ3) »
>
> **675** — « montants **RÉELS trouvés** — plage 1824-3044 € (1er mai 2026, +3,2 % moyenne,
> accord du 16/04/2026 en attente extension) »

Les montants sont ceux des branches. C'est le champ `st` qui n'avait jamais été mis à jour
après ton contrôle — encore le même motif : diagnostic fait, propagation oubliée.

**Seules les métadonnées ont été corrigées**, jamais les montants :

| IDCC | `st` avant | `st` après | Date |
|---|---|---|---|
| 675 | placeholder | real | 01/05/2026 renseignée |
| 993 | estimated | real | inchangée |

### Conséquence sur le rapport

Il n'y a plus d'« estimations non réancrées ». À la place : **3 grilles réelles sous le
SMIC** — 675, 993 et 1286. Ce n'est plus notre erreur mais un fait juridique : ces branches
n'ont pas renégocié, l'employeur doit verser le SMIC.

### Une règle ajoutée aux scripts

Une note de contrôle peut **annuler** un doute exprimé plus tôt dans la même chaîne :
« Estimation SMIC-ancrée, À VÉRIFIER | … montants RÉELS trouvés ». Sans cette règle,
l'ancien doute l'emportait sur la conclusion et une grille vérifiée restait affichée
« Estimation ».

Nouveaux compteurs : **188 vérifiées** (au lieu de 185), 89 estimations, 12 en cours.

---

## Contrôles passés

| Vérification | Résultat |
|---|---|
| Compteurs de l'onglet | 188 / 89 / 12 / 176 |
| Non-fuite sur les 468 lignes rendues | 0 marqueur sur 8 |
| Extraction des montants | 3 phrases retenues, considérants écartés |
| Déclencheur du ticket | posé si anomalie, pas sinon |
| CCN_ALL | 471 entrées, 117 fusions |
| Cohérence des 5 fichiers CCN | aucune divergence |
