# Module 4 - Digital Twin Engine

Moteur de prediction comportementale pour Fox Kitsune Legal App.
Lecture seule sur M1/M2/RPG. Stockage propre : DTE_COEFS uniquement.

## Structure des fichiers

```
module4/
index.html                  Interface principale (4 vues)

css/
  main.css                  Variables, reset, layout, modaux
  dashboard.css             Grille dashboard, cartes scores
  twin-body.css             Corps humain SVG + animations
  charts.css                Canvas graphiques
  components.css            Check-in, IA, PDF, notifications

js/core/
  dte-engine.js             Lecture M1/M2/RPG + normalisation + 6 scores
  dte-simulator.js          Simulation jour par jour + scenarios + futur
  dte-risks.js              Detection 9 risques avec refs legales
  dte-learning.js           Apprentissage adaptatif des coefficients

js/ui/
  dashboard.js              Rendu tableau de bord principal
  twin-body.js              Corps humain SVG interactif
  radar-chart.js            Radar conformite legale (6 axes)
  timeline-chart.js         Courbe predictive Canvas interactive
  heatmap.js                Calendrier annuel des risques
  whatif-panel.js           Panneau simulation avancee

js/features/
  checkin.js                Check-in quotidien 5 questions
  ai-advisor.js             Conseiller IA via API Anthropic
  pdf-report.js             Export rapport legal PDF (jsPDF)
  notifications.js          Toasts + alertes proactives

js/app.js                   Orchestrateur principal
```

## Vues

1. **Tableau de bord** - Score global, corps humain, 6 scores, radar legal, risques, conseils
2. **Predictions** - Courbe fatigue/stress/perf draggable, 3 scenarios, etat dans 30j
3. **What If** - Simulation interactive (HS, jours, presets)
4. **Calendrier** - Heatmap annuelle des niveaux de risque

## Integration GitHub

Placer le dossier `module4/` a la racine du repo, au meme niveau que les autres modules.

## Fonctionnalites

- Corps humain SVG interactif (7 zones colorees selon l etat)
- Radar legal (Durée/jour, Hebdomadaire, Consecutifs, Contingent, Repos, Fatigue)
- Courbe predictive canvas avec tooltip interactif
- Simulation What If avec 4 presets (Recuperation/Optimise/Rush/Urgence)
- 9 risques detectes avec articles du Code du travail
- Check-in quotidien matinal (5 questions, raffine le modele)
- Conseiller IA conversationnel (cle API Anthropic a configurer)
- Export PDF rapport legal complet
- Notifications toast proactives
- Apprentissage adaptatif des coefficients

## Pas besoin d images

Tout est genere en SVG/Canvas directement dans le code.
Aucun fichier image externe requis.

## Dependances CDN

- Google Fonts : Rajdhani, JetBrains Mono, Nunito
- jsPDF 2.5.1 (export PDF)