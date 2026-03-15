# Intégrer le bouton Digital Twin dans M1/M2/M3

## Installation en 2 étapes

### 1. Copiez launcher.js dans votre repo

Placez `launcher.js` à la racine (même niveau que module4/).

### 2. Ajoutez dans chaque module

Dans le fichier HTML de **M1 (heures/index.html)** :
```html
<script src="../launcher.js"></script>
```

Dans **M2 (paye/index.html)** :
```html
<script src="../launcher.js"></script>
```

Dans **M3 (index.html)** :
```html
<script src="launcher.js"></script>
```

> Adaptez le chemin `MODULE4_PATH` en tête de launcher.js si votre structure est différente.

## Ce que ça fait

- Un bouton **DIGITAL TWIN** apparaît en bas à droite de chaque module
- Badge rouge `!` si des risques critiques sont détectés dans les données
- Clic → overlay plein écran avec le Module 4 chargé en iframe
- Touche Echap ou clic en dehors pour fermer
- Le module 4 lit les données localStorage des autres modules automatiquement