# Lot 2 — onglet « Nos sources » + veille des grilles

```
GrillePaye/index.html               onglet + compteurs recadrés
GrillePaye/suivi-public.json        données publiques (20 Ko)
GrillePaye/generer-suivi-public.py  générateur
verifier-fraicheur.py               NOUVEAU — la veille, à la racine
workflow/.github/workflows/verification.yml   version mise à jour
```

Penser au bump du service worker.

---

## 1. Onglet « 🔎 Nos sources »

Présent dans les deux rôles. Quatre compteurs, une recherche, la liste des conventions —
les mieux documentées d'abord — avec pour chacune l'état, la date et **la référence
juridique** :

```
IDCC 16    🟢 Vérifiée   Transport routier · 01/02/2026   Source : avenant n°24
IDCC 1979  🟢 Vérifiée   HCR · 01/06/2026                 Source : avenant n°33 du 19/06
```

C'est la référence qui porte la crédibilité : l'utilisateur peut vérifier lui-même.

### Compteurs recadrés

Les libellés officiels (« En cours de sourçage ») étaient tronqués sur téléphone —
« VÉRI… », « NON … ». Une grille dédiée `.suivi-kpi` remplace `.kpi-grid` : libellés courts,
casse normale, passage à la ligne autorisé au lieu de la troncature.

---

## 2. `verifier-fraicheur.py` — la veille

Le fonds récupère les clauses de rémunération de chaque convention et connaît leur date
(« Avenant salaires du 15 mai 2026 »). GrillePaye connaît la date de la grille affichée.
Si le fonds a plus récent, la grille est à revoir.

C'est la veille qui manquait : au lieu de parcourir 292 grilles pour chercher ce qui a
bougé, tu obtiens la liste de ce qui a changé — et rien d'autre.

```
python3 verifier-fraicheur.py --fonds ../droit/output/ccn
python3 verifier-fraicheur.py --fonds ../droit/output/ccn --marge 60
```

Le rapport donne trois sections :

| Section | Sens |
|---|---|
| **Grilles dépassées** | le fonds a une clause plus récente — à revoir, avec l'écart en jours |
| **Sans grille mais clause au fonds** | une grille pourrait être créée à partir du texte |
| **Sans date exploitable** | impossible à comparer ; renseigner le champ `d` les ferait entrer dans la veille |

### Ce qu'il ne fait pas, volontairement

**Il ne touche à aucun montant.** Passer du texte d'un avenant à un barème structuré
demande une interprétation : chaque branche a sa logique — valeur de point, paliers
horaires, indice majoré, RAM annuelle. Une erreur d'interprétation produirait un faux
salaire minimum, ce qui est pire qu'une grille datée. Le script signale, tu décides.

### Deux précautions dans la détection

**Le sujet de la clause est filtré.** Le fonds contient aussi des avenants sur le temps de
travail ou la prévoyance, sans incidence sur une grille. Seuls les titres parlant de
salaire, rémunération, minima, barème ou grille sont retenus.

**Une marge de 30 jours** évite le bruit : un avenant signé peu après le relevé de la
grille est souvent déjà pris en compte. Réglable par `--marge`.

Testé sur des cas reproduisant le réel : avenant plus récent détecté avec l'écart exact,
avenant plus ancien ignoré, avenant prévoyance écarté, convention sans grille signalée à
part.

---

## 3. Workflow — veille automatique du mercredi

La veille tourne dans le workflow de vérification, **lançable depuis l'iPhone** et
désormais **planifiée chaque mercredi à 7h UTC**.

Le mercredi n'est pas arbitraire : l'aspirateur tourne lundi et jeudi, le mercredi tombe
donc après que le run du lundi a été commité, et avant celui du jeudi.

### Le point qui rend la veille utile : la notification

GitHub ne notifie que les échecs, jamais les succès. Un run planifié qui découvre une
grille périmée passerait donc totalement inaperçu — une veille qu'il faut penser à
consulter n'est pas une veille.

Quand la veille trouve au moins une grille dépassée, le workflow **ouvre un ticket** dans
le dépôt, avec le rapport complet en corps de message. Tu reçois la notification sur ton
téléphone, et le ticket sert d'aide-mémoire jusqu'à ce que tu le fermes.

**Un seul ticket est maintenu à la fois** : le suivant met à jour le précédent au lieu
d'en accumuler un par semaine. S'il n'y a rien à signaler, aucun ticket n'est créé.

Vérifié dans les deux sens : le marqueur se pose quand une grille est dépassée, et ne se
pose pas quand tout est à jour.

Cela suppose la permission `issues: write`, déjà déclarée dans le fichier. Aucun secret
supplémentaire : le jeton fourni par GitHub suffit.

Remplace `.github/workflows/verification.yml` dans le dépôt de l'application.

---

## Une fuite trouvée par le contrôle de non-fuite

Le test balaie les 468 lignes rendues à la recherche de huit marqueurs de note interne. Il
en a trouvé un — pas dans le fichier public, mais dans `CCN_ALL` : l'entrée 1776 s'appelait
**« À vérifier (FJT = IDCC 2336) »**. Une note de travail affichée comme nom de convention,
visible aussi dans l'onglet des grilles.

L'IDCC 1776 est inconnu de DARES et sans grille ; la vraie convention des foyers de jeunes
travailleurs est le **2336**, déjà présent sous « Habitat et logement accompagnés ». Le
libellé devient **« Foyers de jeunes travailleurs (identité non confirmée) »** : le métier
reste cherchable, le doute visible, et le lien vers le texte officiel s'éteint
automatiquement.

Après correction : **0 fuite sur 8 marqueurs**.

---

## Non-régression vérifiée

471 entrées dans `CCN_ALL`, 117 bandeaux de fusion intacts, 319 liens MonLegiTexte tous
couverts, aucune divergence entre les cinq fichiers CCN.
