# Mode sobre pour la page outils

Un seul fichier : `outils.html`.

---

## Portée volontairement réduite

Uniquement ce qui a été demandé : retirer l'illustration de fond, garder le bleu nuit.
Les modules/outils listés dans les catégories n'ont pas été touchés — ils utilisent déjà
des icônes SVG neutres, pas de mascotte.

## Où c'était caché

Le tableau de bord illustré n'est pas une simple couleur : `atelier-bg.jpg` est une image
plein écran fixe (le terrier du renard), avec un dégradé calculé pour rester lisible
par-dessus, et un en-tête devenu transparent/flottant pour laisser voir le haut du décor —
le titre « Le Terrier » n'existe même plus en texte à l'écran, il est peint sur l'enseigne
de l'illustration (`.hdr-title{display:none}`, avec le commentaire « le titre vit sur
l'enseigne »).

## Ce qui change en mode sobre

- L'image de fond disparaît, avec son dégradé de lisibilité.
- Le bleu nuit reste : aucune des couleurs (`--ink`, `--gold`, dorures, cartes en verre)
  n'a été touchée. Sans photo, un fond translucide sur un aplat marine donne simplement une
  carte marine unie — l'effet visuel tient tout seul, sans rien à recalculer.
- Le bandeau du haut redevient un bloc normal (il flottait pour laisser voir la photo).
- Le titre « Le Terrier » redevient visible **en texte**, puisqu'il n'y a plus d'enseigne
  pour le porter. Le texte lui-même n'a pas été changé.

## Un bug évité avant livraison

Les onglets Favoris/Récents/Plus avaient une compensation de 86px de marge, ajoutée pour
qu'ils ne passent pas sous l'en-tête fixe. Une fois l'en-tête repassé en flux normal, cette
compensation s'ajoutait à l'espace que l'en-tête prend déjà — un grand vide au-dessus de ces
trois onglets. Neutralisée en mode sobre uniquement ; l'onglet Accueil, qui n'avait pas
cette règle, n'était pas concerné.

## Où se trouve le bouton

Onglet **···  Plus**, avec les autres réglages (Retour au menu, Mentions légales, Revoir le
guide) : *« Passer en mode sobre »* / *« Revenir à l'illustration »* selon l'état. Choix
mémorisé.

Aucun flash au chargement : un petit script s'exécute avant même que la balise de l'image
soit lue par le navigateur, donc la photo ne s'affiche jamais une fraction de seconde avant
de disparaître.

## Vérifications

| Contrôle | Résultat |
|---|---|
| Image de fond masquée en mode sobre | oui |
| Titre visible et texte inchangé | oui |
| Espace réservé par le décor (hero 42vh) supprimé | oui |
| Double espacement Favoris/Récents/Plus | corrigé |
| Bascule + libellé mis à jour | oui |
| Choix persisté et restauré | oui |
| Navigation par onglets (non-régression) | oui |
| Catégories/outils toujours rendus (non-régression) | 13 catégories, inchangé |
