/**
 * Service Worker — Simulateur Heures Sup & RPG Fox
 * Version : 10.9.19 — Cloudflare Pages (Google Play compliance : disclaimers non-gouv + sources)
 */

const CACHE_NAME = "heuressup-cache-v10.11.38"; // v10.11.35 : hs-officiel - M1 a 0 h ne masque plus les heures de M2 (fox affichait 0 h). // v10.11.34 : nouveautes v10.11 (regle CP) ; fox lit CP_JURIS selon l exercice M1 (cle DATA_REPORT_) et non l annee de la date. // v10.11.33 : PDF M1 et M6 - colonne CP et mention de la regle des conges payes (Cass. soc. 10/09/2025) ; fox vue-pro applique la regle CP. // v10.11.27 : sw.js de production remis (le 01/10 a 10 h 07, celui du bac a sable l avait remplace : polices, journal des erreurs, Etat de l appli, jsPDF hors ligne, rappels .ics et manifest reseau d abord avaient disparu). // v10.10.128 : Etat de l appli, adresse differente de l appli installee signalee en information (plus en probleme). // v10.10.127 : Mizuki, transition limitee au changement de contrat (plus d erreur « Transition was aborted » au retour au menu) ; journal des erreurs sans dossier d hebergement dans les chemins. // v10.10.126 : Android, retour au menu et changement de contrat Mizuki sans flash (premier rendu quand la page est complete) ; PDF hors ligne (jsPDF integre a l appli, plus de cdnjs). // v10.10.125 : mode avion, un module jamais ouvert trouve ses scripts (repli sans ?v=) ; Mizuki, changement de contrat sans flash sur iPhone (transition entre pages, polices prechargees). // v10.10.124 : Nouveautes, Etat de l appli ajoute, rapport de plantage. // v10.10.123 : Etat de l appli complete (appareil, installation, pages, hors ligne detaille, donnees par module sans nom ni prenom, erreurs detaillees, test d ouverture des modules). // v10.10.122 : page Etat de l appli (version, mise a jour forcee, hors ligne, donnees, erreurs) accessible depuis le menu, sans adresse de depot. // v10.10.121 : politique de confidentialite, paragraphe contact (mails recus, rapport de plantage, conservation 12 mois). // v10.10.120 : Nous contacter, rapport limite au plantage (version, appareil, stockage, erreurs ; rien sur les saisies). // v10.10.119 : Nous contacter, rapport technique facultatif (sans donnees personnelles) et journal des erreurs ; ligne Version du menu retiree ; Nouveautes du 1er octobre ; migration Zenji sans exercice vide fantome. // v10.10.118 : polices de Mizuki et Zenji embarquees dans l appli (hors ligne, plus de telechargement Google), plus de flash au premier changement de contrat. // v10.10.117 : compteur annuel, jours ranges dans l exercice qui contient leur date (et saisie redirigee) ; Mizuki et Zenji sans ecran blanc au rechargement (fond immediat, police non bloquante) ; M7 prime sans montant unitaire = montant en euros. // v10.10.116 : Mizuki PDF, bilan et detail par semaine avec le meme moteur que le paiement (feries chomes neutralises, semaines marquees *), premiere ligne du tableau decalee sous l en-tete. // v10.10.115 : Mizuki sante, bareme recuperation aligne sur le message (moins de 30 pour cent de semaines legeres = a surveiller). // v10.10.114 : Mizuki sante multi-contrats, dernieres semaines pas encore saisies pour tous les contrats ecartees ; baremes stabilite et previsibilite alignes sur les messages ; heatmap et PDF communs sur l exercice. // v10.10.113 : ligne Version du menu et check.html, version du service worker reellement en service (avant : tri texte des caches, v10.10.99 passait apres v10.10.112, et nouvelle version affichee avant d etre active). // v10.10.112 : Mizuki, saisies rangees dans le mauvais exercice remises dans le bon (ex. semaine de novembre 2026 enregistree dans 2027), la navigation semaine passe dans l exercice de la semaine affichee. // v10.10.111 : Mizuki vue mois, jours hors de l exercice affiche grises (un appui ouvre le bon exercice). // v10.10.110 : mise a jour fiable, le service worker telecharge toujours les fichiers depuis le serveur (plus d anciens fichiers du cache du telephone dans la nouvelle version). // v10.10.109 : Zenji, teletravail compte comme jour travaille (bilan, jours restants, sante, cadre dirigeant) ; tableau sante renomme Etat en fin de mois. // v10.10.108 : Zenji sante, fatigue et stress sur les 8 dernieres semaines (RTT et CP recuperent avec un effet qui s estompe en 3 semaines) au lieu du cumul de l exercice ; performance coherente (forfait jours et forfait heures). // v10.10.107 : M2 premier mois de l exercice reglable (octobre a septembre, etc.), exercice nomme d apres l annee majoritaire, stockage inchange ; M1 nouvel exercice nomme de meme ; Zenji tendances dans l ordre de l exercice sans mois futurs. // v10.10.106 : restes d heures non payees sur 3 ans (art. L3245-1) dans Mizuki et M2, reproposes a chaque ouverture d exercice tant qu ils ne sont ni reportes ni prescrits, choix exercice par exercice ; apercu sur l exercice a venir (Mizuki) ; statut du reste dans le bilan. // v10.10.105 : Zenji, exercice passe disparu recree et ses jours remis dedans (2025 decale apres renommage), tous les exercices recales de proche en proche. // v10.10.104 : Mizuki, vue d ensemble des contrats avec les heures complementaires par contrat (semaine et periode). // v10.10.103 : Zenji, jours ranges dans l exercice qui les contient (exercice a cheval compte decembre + janvier), exercices voisins recales (pas de chevauchement), RTT theoriques justes en annee civile (feries decales d un jour en France). // v10.10.102 : Mizuki, report des heures non payees remis a zero a chaque exercice (reste de l exercice precedent ajoute seulement si on choisit de le reporter, choix garde par exercice) ; vue d ensemble des contrats sur la semaine et la periode affichees. // v10.10.101 : Zenji, exercice nommé d apres l annee ou il a le plus de jours (migration), bouton Effacer les dates dans les reglages. // v10.10.100 : Mizuki, totaux du bilan = carte Solde, annee suivante projetee, bandeaux selon l exercice affiche, PDF par contrat au choix. // v10.10.99 : M2 autre annee sur la bonne periode + fin decembre dans janvier ; Mizuki passage d exercice (bandeau, report du reste, exercice prepare), PDF par contrat complet, PDF commun, heatmap commune ; Zenji reglages par exercice, nouvel exercice, dates reinitialisables. // v10.10.98 : encart Taiko du menu sans debordement ; _reference-loi.html publie sur GitHub Pages. // v10.10.97 : module de verification cache check.html (5 appuis sur la ligne Version du menu), exclu des sauvegardes. // v10.10.96 : iPhone iOS 26, viewport-fit=cover retire (en-tetes sous l heure comme Heures, Fox, Mizuki) ; barre d etat remise comme en prod. // v10.10.95 : iPhone iOS 26, barre d etat opaque (default) au lieu de black-translucent : plus de contenu floute sous l heure. // v10.10.94 : manifest toujours lu sur le reseau (iOS le lit a l installation). // v10.10.93 : outil Preavis, reference affichee en lien (plus de code brut). // v10.10.92 : manifest en adresses relatives (identique en prod, correct sur toute autre adresse comme le bac a sable). // v10.10.91 : version chargee et mode (appli ou navigateur) affiches en bas du menu. // v10.10.90 : iPhone, en-tetes de nouveau sous l encoche (le script anti-zoom qui modifiait le viewport est remplace par une regle CSS). // v10.10.89 : Mizuki, sante sur le cumul des contrats (48 h / 44 h tous employeurs) et conges sur tous les contrats en 1 clic. // v10.10.88 : bilan de fin d exercice, encadre reste du et delai de 3 ans (L3245-1) dans les 4 modules ; heures mensualisees, report du reste dans le nouvel exercice. // v10.10.87 : prenom et CCN dans Parametres du menu, repris par Kitsune, Mizuki et Zenji ; GrillePaye ouvre la CCN choisie. // v10.10.86 : Zenji, migration unique des utilisateurs existants (jours re-ranges par exercice, exercice perime recale sans bandeau tardif). // v10.10.85 : Taiko, un long texte n elargit plus les cases du calendrier. // v10.10.84 : Fox affiche le total officiel du contingent de M1 ou M2 (donnees, vue pro, rapport, comparaison). // v10.10.83 : heures mensualisees, Mizuki et Zenji rouvrent toujours sur l exercice et la periode en cours. // v10.10.82 : annee memorisee du compteur annuel remise sur l exercice en cours (Fox, jumeau numerique) ; Fox, rapport (contingent, evolution) et contingent annuel de l annee en cours. // v10.10.81 : heatmap du jumeau numerique, compteurs limites a l exercice affiche. // v10.10.80 : bilan annuel du compteur, intitules explicites (saisies, comptees, solde a payer) et explication de l ecart. // v10.10.79 : saisie rapide du menu, toujours sur l exercice et la periode d aujourd hui (M1, M2, Mizuki, Zenji). // v10.10.78 : heures mensualisees (contingent par periodes, creation manuelle avec choix des clotures, annee passee ouverte sur decembre) ; Mizuki (changement d annee place le calendrier dans l annee, stats par exercice, nouvel exercice avec choix des clotures) ; Zenji (calendrier ouvert et borne sur l exercice, feries des deux annees). // v10.10.77 : compteur annuel, swipe borne a l exercice et liste des periodes synchronisee, calendrier place sur la periode au chargement d une annee, contingent limite a l exercice, creation manuelle de l annee suivante avec choix des clotures. // v10.10.76 : nouvel exercice le lendemain de la fin (M1, M2, Mizuki, Zenji) avec choix clotures automatiques ou manuelles ; M2 clotures manuelles selon le jour de fin de semaine CCN. // v10.10.75 : heures mensualisees, jours de fin decembre dans la periode de janvier (ecran + reliquat) ; Mizuki, regle des 12 semaines sans remise a zero au 1er janvier, modes annuel et mensuel sur deux annees civiles. // v10.10.74 : compteur annuel, PDF alignes sur l ecran (clotures en milieu de semaine) ; Zenji, exercice a cheval sur deux annees compte en entier. // v10.10.73 : bilan de fin d annee (compteur annuel, heures mensualisees, Mizuki, Zenji) + Mizuki 10 h/jour tous employeurs et repere retraite progressive. // v10.10.72 : Mizuki, Mon contrat en semaine/mois/an comme l assistant (+ PDF, seuil mensuel). // v10.10.71 : Mizuki, duree du contrat saisie par semaine, par mois ou par an. // v10.10.70 : rappel de sauvegarde une fois par mois pour toute l appli ; Mizuki : accueil temps partiel/retraite progressive/multi-contrat + question autre contrat dans l assistant. // v10.10.69 : sans flash (GrillePaye, Mizuki, Fox, compteur annuel), pas de zoom des champs sur iPhone, fond Fox en JPEG. // v10.10.68 : passage d'exercice (compteur annuel, heures mensualisees, Mizuki), annee active et message de saison (Zenji). // v10.10.67 : IDCC 1600 retire (numero inexistant). // v10.10.66 : CCI 5018/5025 (statut public, remuneration indiciaire). // v10.10.65 : grilles 1487, 715 (historique) + 1761/412/1734/1640 fusionnees. // v10.10.64 : grilles 3251 (accord 9/06/2026), 3253 et 1850 (avenants 136 et 29). // v10.10.63 : IDCC 1316 niveau A (avenant 78, 1 823,10 EUR). // v10.10.62 : sauvegarde sans cles techniques + resume par module. // v10.10.61 : popups Sauvegarde et Rappels cadrees (zones sures iPhone). // v10.10.60 : import de sauvegarde plus simple sur iOS (sans filtre, aide Récents). // v10.10.59 : grilles IDCC 1316 (avenants 77 et 78) et 3017 (avenant 21, autres salaries). // v10.10.58 : menu sans chevrons, titre complet. // v10.10.57 : menu reflets colores seulement a gauche. // v10.10.56 : menu carte Mes outils du quotidien (maquette). // v10.10.55 : P5 plancher SMIC calcule a l affichage (GrillePaye). // v10.10.54 : P3 IDCC 1558 1605 1679 1938 selectionnables dans GrillePaye. // v10.10.53 : C6 bloc multi-contrat sous Enregistrer. // v10.10.52 : C6 etape 2 vue d ensemble + repere 48 h. // v10.10.51 : C2 Chrome/Firefox iOS -> partage + conseil Safari. // v10.10.50 : C2 retour ouverture directe + bouton Retour au menu en pied de popup. // v10.10.48 : C6 plusieurs contrats Mizuki (etape 1 : cles + choix). // v10.10.47 : C4 saisie rapide en pill noire sous Personnaliser / to-do. // v10.10.46 : C4 barre de saisie rapide affinee (1 ligne). // v10.10.45 : C4 noms des modules + barre masquee sans module configure. // v10.10.44 : C4 saisie rapide (menu + #saisie-aujourdhui M1 M2 M5 M6). // v10.10.43 : C2 textes des rappels (Coucou...). // v10.10.42 : C2 rappels.ics fabrique par le SW (iOS Calendrier). // v10.10.41 : C2 frequence une fois/semaine/mois + ouverture directe iOS. // v10.10.40 : C2 rappels calendrier (.ics) dans le menu. // v10.10.39 : libelles copie de sauvegarde + mode ?test-sauvegarde. // v10.10.38 : C1 rappel sauvegarde commun (js/rappel-sauvegarde.js). v10.10.37 : C1 sauvegarde (date, empreinte, controle import). v10.10.36 : M6 totalHS arrondi a la minute (Bilan=carte, fini 6h16 vs 6h18)
const OFFLINE_URL = "./menu.html";

const FILES_TO_CACHE = [
  "./", "./index.html", "./menu.html", "./js/rappel-sauvegarde.js", "./js/bilan-annee.js", "./js/nouvel-exercice.js", "./js/hs-officiel.js", "./manifest.json",
  "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png",
  "./glossaire.js", "./ccn/conventions-collectives.js",
  "./legi-ref.js", // requis par module5/6 + fox (chargé via ../legi-ref.js) — sinon 404 hors-ligne
  "./heures/index.html",
  "./paye/index.html",
  "./fox/index.html", "./fox/css/style.css",
  "./fox/js/config.js", "./fox/js/assets-config.js", "./fox/js/safety.js",
  "./fox/js/modes.js", "./fox/js/xp-system.js", "./fox/js/leagues.js",
  "./fox/js/badges.js", "./fox/js/milestones.js", "./fox/js/rpg-system.js",
  "./fox/js/quests.js", "./fox/js/combat.js", "./fox/js/skills.js",
  "./fox/js/inventory.js", "./fox/js/module-loader.js",
  "./fox/js/scenarios-fox-data.js", "./fox/js/scenarios-fox.js",
  "./fox/js/scenarios-ai.js",
  "./fox/js/legal-engine.js", "./fox/js/module-reader.js",
  "./fox/js/module3.js", "./fox/js/data-bridge.js", "./fox/js/storage.js",
  "./fox/js/snapshot-system.js", "./fox/js/export-rtf.js",
  "./fox/js/ai-integration.js", "./fox/js/main-rpg.js",
  "./fox/js/vue-pro.js", "./fox/js/articles-loi.js",
  "./module4/index.html", "./module4/js/app.js",
  "./module4/js/core/dte-engine.js", "./module4/js/core/dte-simulator.js",
  "./module4/js/core/dte-risks.js", "./module4/js/core/dte-learning.js",
  "./module4/js/features/ai-advisor.js", "./module4/js/features/checkin.js",
  "./module4/js/features/lifestyle.js", "./module4/js/features/notifications.js",
  "./module4/js/features/dte-glossary.js", "./module4/js/features/dte-scenarios.js",
  "./module4/js/features/schedule.js", "./module4/js/features/vacances.js",
  "./module4/js/features/pdf-report.js",
  "./module4/js/ui/dashboard.js", "./module4/js/ui/heatmap.js",
  "./module4/js/ui/whatif-panel.js", "./module4/js/ui/twin-body.js",
  "./module4/js/ui/animus-boot.js", "./module4/js/ui/radar-chart.js",
  "./module4/js/ui/timeline-chart.js",
  "./module4/css/main.css", "./module4/css/dashboard.css",
  "./module4/css/components.css", "./module4/css/charts.css",
  "./module4/css/twin-body.css",
  "./module4/assets/favicon.svg", "./module4/assets/icon-192.svg",
  "./module4/assets/logo-dte.svg",
  // === Module 5 — Temps partiel (Mizuki) ===
  "./module5/index.html",
  "./module5/css/main.css",
  "./module5/js/app.js",
  "./module5/js/core/calc-engine.js",
  "./module5/js/core/contrats.js",
  "./module5/js/data/ccn-partiel.js",
  "./module5/js/features/glossaire.js",
  "./module5/js/features/mizuki.js",
  "./module5/js/features/pdf-report.js",
  "./module5/js/features/saisie.js",
  "./module5/js/features/wellbeing.js",
  // === Module 6 — Cadres (Zenji) ===
  "./fonts/cormorant-garamond-latin-400-italic.woff2",
  "./fonts/cormorant-garamond-latin-400-normal.woff2",
  "./fonts/cormorant-garamond-latin-500-normal.woff2",
  "./fonts/cormorant-garamond-latin-600-italic.woff2",
  "./fonts/cormorant-garamond-latin-600-normal.woff2",
  "./fonts/cormorant-garamond-latin-700-normal.woff2",
  "./fonts/dm-sans-latin-300-normal.woff2",
  "./fonts/dm-sans-latin-400-italic.woff2",
  "./fonts/dm-sans-latin-400-normal.woff2",
  "./fonts/dm-sans-latin-500-normal.woff2",
  "./fonts/dm-sans-latin-600-normal.woff2",
  "./fonts/dm-sans-latin-700-normal.woff2",
  "./fonts/dm-sans-latin-800-normal.woff2",
  "./fonts/dm-sans-latin-900-normal.woff2",
  "./fonts/outfit-latin-300-normal.woff2",
  "./fonts/outfit-latin-400-normal.woff2",
  "./fonts/outfit-latin-500-normal.woff2",
  "./fonts/outfit-latin-600-normal.woff2",
  "./js/journal-erreurs.js",
  "./js/diagnostic.js",
  "./js/vendor/jspdf.umd.min.js",
  "./etat-appli.html",
  "./module6/index.html",
  "./module6/css/main.css",
  "./module6/images/Cadre.png",
  "./module6/js/app.js",
  "./module6/js/core/bio-engine.js",
  "./module6/js/core/calc-engine.js",
  "./module6/js/core/safe-boot.js",
  "./module6/js/core/storage.js",
  "./module6/js/data/ccn-adapter.js",
  "./module6/js/data/glossaire-cadres.js",
  "./module6/js/features/calendar.js",
  "./module6/js/features/charts.js",
  "./module6/js/features/coach.js",
  "./module6/js/features/entretien-glossaire.js",
  "./module6/js/features/import-export.js",
  "./module6/js/features/nullite-checker.js",
  "./module6/js/features/pdf-report.js",
  "./module6/js/features/rupture-calculateur.js",
  "./module6/js/features/simulateur-nullite.js",
  "./module6/js/features/validite-heures-cd.js",
  "./module6/js/features/zenji-popup.js",
  "./module6/js/features/zenji.js",
  "./module6/js/views/view-cadre-dirigeant.js",
  "./module6/js/views/view-forfait-heures.js",
  "./module6/js/views/view-forfait-jours.js",
  "./module6/ccn/coefficients-grilles.js",
  "./module6/ccn/conventions-cadres.js",
  // Images
  "./images/Mizuki.PNG",
  "./images/renard-annuel.png.jpg", "./images/renard-mensuel.png.jpg",
  "./images/renard-central.png.jpg",
  "./images/fox-bg.jpg",
  "./images/fox-bg-2.jpg",
  "./images/fox-bg-3.jpg",
  "./images/fox-bg-4.jpg",
  "./images/foxplayer.PNG",
  "./images/foxplayer-2.PNG",
  "./images/foxplayer-3.PNG",
  "./images/foxplayer-4.PNG",
  "./images/foxplayer-5.PNG",
  "./images/foxplayer-6.PNG",
  "./images/foxplayer-7.PNG",
  "./images/foxplayer-8.PNG",
  "./images/foxplayer-9.PNG",
  "./images/foxplayer-10.PNG",
  "./foxpredit.jpg",
  // === Lumina — Grilles Salariales CCN 2026 ===
  "./GrillePaye/index.html",
  "./GrillePaye/ccn-data.json",
  // === Module 7 — Nuit, Astreinte & Primes (Mimizuku) ===
  "./module7/index.html",
  "./module7/Mimizuku.png",
  "./module7/mimizuku-menu.jpg",
  // ── Trousse à outils (54 modules) + légal ──
  "./outils.html",
  "./atelier-bg.jpg",
  "./taiko.html",        // FIX 2026-08-05 : module Taiko oublié du précache => nav avalée par le repli menu (même cas que nouveautes.html)
  "./nouveautes.html",   // FIX 2026-07-04b : oubliée du précache => nav avalée par le repli menu
  "./mentions-legales.html",
  "./privacy.html",
  "./outils/articles-loi.js",
  // ── AJOUT : sommaire + images de tuiles (hors-ligne complet) ──
  "./sommaire.html",
  "./images/Temps partiel.PNG",
  "./module6/images/Cadremenu.PNG",
  "./site-vignette.jpg",
  "./icon-renard.png",
  // ── AJOUT : les 105 outils pré-cachés (hors-ligne complet) ──
  "./outils/_reference-loi.html",
  "./outils/module-abonnements.html",
  "./outils/module-activite-partielle.html",
  "./outils/module-allocations-familiales.html",
  "./outils/module-alternance.html",
  "./outils/module-anciennete.html",
  "./outils/module-archives.html",
  "./outils/module-arret.html",
  "./outils/module-astreintes.html",
  "./outils/module-atmp.html",
  "./outils/module-avantages-nature.html",
  "./outils/module-bonus-malus-eco.html",
  "./outils/module-budget.html",
  "./outils/module-bulletin.html",
  "./outils/module-c2p.html",
  "./outils/module-cash-vs-credit.html",
  "./outils/module-cet.html",
  "./outils/module-chomage.html",
  "./outils/module-comparateur-forfaits.html",
  "./outils/module-conge-ss.html",
  "./outils/module-conges.html",
  "./outils/module-conso-auto.html",
  "./outils/module-conso-electrique.html",
  "./outils/module-contrats.html",
  "./outils/module-convertisseur.html",
  "./outils/module-cout-voiture.html",
  "./outils/module-credit-cout.html",
  "./outils/module-cse.html",
  "./outils/module-cumul-retraite.html",
  "./outils/module-dates.html",
  "./outils/module-decodeur-sigles.html",
  "./outils/module-delegation.html",
  "./outils/module-demarche-arrivee-france.html",
  "./outils/module-demarche-deces.html",
  "./outils/module-demarche-demenagement.html",
  "./outils/module-demarche-depot-garantie.html",
  "./outils/module-demarche-eco-gestes.html",
  "./outils/module-demarche-logement-etudiant.html",
  "./outils/module-demarche-micro-entreprise.html",
  "./outils/module-demarche-naissance.html",
  "./outils/module-demarche-pacs-mariage.html",
  "./outils/module-demarche-papiers-perdus.html",
  "./outils/module-demarche-permis.html",
  "./outils/module-demarche-premier-emploi.html",
  "./outils/module-demarche-securite-numerique.html",
  "./outils/module-demarche-valise-voyage.html",
  "./outils/module-demarche-voiture-occasion.html",
  "./outils/module-demission-are.html",
  "./outils/module-devises.html",
  "./outils/module-dpe-decodeur.html",
  "./outils/module-droits-passagers.html",
  "./outils/module-effectifs.html",
  "./outils/module-egalite.html",
  "./outils/module-entretien.html",
  "./outils/module-epargne.html",
  "./outils/module-essai.html",
  "./outils/module-famille.html",
  "./outils/module-feries.html",
  "./outils/module-fincontrat.html",
  "./outils/module-fincontrat2.html",
  "./outils/module-formation.html",
  "./outils/module-francs-euros.html",
  "./outils/module-fuseaux.html",
  "./outils/module-greve.html",
  "./outils/module-imc.html",
  "./outils/module-impot-revenu.html",
  "./outils/module-inaptitude.html",
  "./outils/module-interets-composes.html",
  "./outils/module-invalidite.html",
  "./outils/module-journal.html",
  "./outils/module-lexique.html",
  "./outils/module-livrets-epargne.html",
  "./outils/module-loyer-prorata.html",
  "./outils/module-miseapied.html",
  "./outils/module-mobilites.html",
  "./outils/module-modulation.html",
  "./outils/module-mutuelle.html",
  "./outils/module-nonconcurrence.html",
  "./outils/module-numeros-urgence.html",
  "./outils/module-parentalite.html",
  "./outils/module-partage-addition.html",
  "./outils/module-partage-depenses.html",
  "./outils/module-pension-alimentaire.html",
  "./outils/module-pourcentages.html",
  "./outils/module-preavis-comp.html",
  "./outils/module-preavis.html",
  "./outils/module-precarite.html",
  "./outils/module-prix-unitaire.html",
  "./outils/module-proche-aidant.html",
  "./outils/module-remboursement-sante.html",
  "./outils/module-remise.html",
  "./outils/module-reperes-consommateur.html",
  "./outils/module-retraite.html",
  "./outils/module-rupture.html",
  "./outils/module-sabbatique.html",
  "./outils/module-saisie.html",
  "./outils/module-salaire-cout-employeur.html",
  "./outils/module-solde-points-permis.html",
  "./outils/module-surface.html",
  "./outils/module-teletravail.html",
  "./outils/module-temps.html",
  "./outils/module-tr.html",
  "./outils/module-transport.html",
  "./outils/module-tva.html",
  "./outils/module-unites.html",
  "./outils/module8.html",
];

// ── INSTALL ───────────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      let ok = 0, fail = 0;
      for (const url of FILES_TO_CACHE) {
        try {
          // 27/09/2026 : { cache: 'reload' } = toujours la version du serveur. Sans ça, le cache
          // HTTP du téléphone (GitHub Pages : 10 min) pouvait remettre d'anciens fichiers dans
          // le cache de la NOUVELLE version (numéro à jour, module inchangé).
          const res = await fetch(url, { cache: 'reload' });
          if (res.ok) {
            const body = await res.arrayBuffer();
            const headers = new Headers();
            res.headers.forEach((val, key) => {
              if (!['cf-cache-status','cf-ray','age','x-cache','nel','report-to'].includes(key.toLowerCase())) {
                headers.append(key, val);
              }
            });
            headers.set('content-length', body.byteLength.toString());
            headers.delete('content-encoding');
            headers.delete('transfer-encoding');
            const cleanRes = new Response(body, { status: res.status, statusText: res.statusText, headers });
            await cache.put(url, cleanRes);
            ok++;
          } else {
            fail++;
          }
        } catch(err) {
          fail++;
          console.error("  ❌ [CACHE FAIL]", url, "— erreur:", err.message);
        }
      }
      const keys = await cache.keys();
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE ──────────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(async (keys) => {
      for (const key of keys) {
        if (key !== CACHE_NAME) {
          await caches.delete(key);
        }
      }
    })
  );
  self.clients.claim();
});

// ── FETCH — CACHE FIRST (stale-while-revalidate) ──────────────────────────────
// FIX 2026-07-04 : page de secours factorisée (utilisée par les 2 chemins offline)
// FIX 2026-07-04b : le repli menu.html est réservé au SHELL (menu/index/racine).
// Avant, TOUTE navigation échouée (404, timeout) était remplacée par le menu précaché
// => sur le TWA Play (pas de barre d'URL), le bouton semblait « sauter » sans rien ouvrir.
function _isShellUrl(url) {
  const p = new URL(url).pathname;
  return p.endsWith("/menu.html") || p.endsWith("/index.html") || p.endsWith("/");
}

function _fallbackReconnexion(pagePath) {
  return new Response(
    '<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta http-equiv="refresh" content="2">' +
    '<title>Reconnexion\u2026</title></head>' +
    '<body style="margin:0;font-family:system-ui,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0e1a26;color:#e6f2f5;text-align:center">' +
    '<div><div style="font-size:44px">\uD83D\uDCE1</div>' +
    '<h1 style="font-size:18px;margin:10px 0 6px">Reconnexion en cours\u2026</h1>' +
    '<p style="font-size:13px;color:#8fb3bd;margin:0 0 14px">Nouvelle tentative automatique dans 2\u00A0secondes.</p>' +
    (pagePath ? '<p style="font-size:11px;color:#5f8791;margin:0 0 12px">Page demand\u00E9e : ' + pagePath + '</p>' : '') +
    '<button onclick="location.reload()" style="background:#4FB3C2;border:0;color:#04222c;font-weight:700;padding:10px 22px;border-radius:10px;font-size:14px">R\u00E9essayer maintenant</button>' +
    '</div></body></html>',
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }
  );
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // Ne PAS intercepter les blobs, data-URI ni schemes spéciaux (PDF généré, téléchargements…)
  const scheme = event.request.url.split(':')[0];
  if (scheme === 'blob' || scheme === 'data' || scheme === 'chrome-native' || scheme === 'chrome-extension') return;

  // Ne PAS intercepter les requêtes cross-origin (Google Fonts, CDN…)
  // Sinon la réécriture des headers casse le CORS (erreur if-modified-since).
  const reqUrl = new URL(event.request.url);
  if (reqUrl.origin !== self.location.origin) return;

  // ═══ 27/09/2026 : le manifest passe TOUJOURS par le réseau d'abord ═══
  // iOS le lit au moment de « Sur l'écran d'accueil » : servi depuis le cache, un ancien
  // manifest pouvait être installé (identité, barre d'état). Cache seulement hors ligne.
  if (reqUrl.pathname.endsWith('/manifest.json')) {
    event.respondWith(fetch(event.request, { cache: 'no-store' }).catch(() => caches.match(event.request)));
    return;
  }

  // ═══ C2 : rappels calendrier. Le fichier .ics est fabriqué ICI, sur le téléphone,
  // à partir du paramètre c (base64url). Rien ne part sur internet. Une vraie adresse
  // https servie en text/calendar permet à iOS d'afficher « Ajouter tout ». ═══
  if (reqUrl.pathname.endsWith('/rappels.ics')) {
    event.respondWith((async () => {
      try {
        const b = (reqUrl.searchParams.get('c') || '').replace(/-/g, '+').replace(/_/g, '/');
        const bin = atob(b + '==='.slice((b.length + 3) % 4));
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return new Response(bytes, { headers: {
          'Content-Type': 'text/calendar; charset=utf-8',
          'Content-Disposition': 'inline; filename="simulheures-rappels.ics"',
          'Cache-Control': 'no-store' } });
      } catch (e) {
        return new Response('Fichier de rappels illisible.', { status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
      }
    })());
    return;
  }

  // ═══ FIX 2026-07-05 : le SHELL (navigations HTML) passe en CACHE D'ABORD ═══
  // Avant (FIX 2026-07-04) : réseau d'abord => sur Android/TWA cold start, l'utilisateur
  // voyait un flash "connexion au web" pendant l'attente réseau avant affichage.
  // Maintenant : le cache s'affiche INSTANTANÉMENT si présent, le réseau tourne en
  // parallèle uniquement pour rafraîchir le cache (silencieux, aucun impact visuel).
  // Le risque de "snapshot cassé pendant déploiement par lots" (raison du FIX précédent)
  // subsiste en théorie, mais seulement le temps d'un aller-retour réseau — la
  // revalidation en tâche de fond corrige le cache pour la navigation suivante.
  const isNavShell = event.request.mode === "navigate" ||
    (event.request.headers.get("accept") || "").includes("text/html");
  if (isNavShell) {
    event.respondWith((async () => {
      // 27/09/2026 : repli sans paramètre (?c=, ?v=…) : la page précachée sert aussi hors ligne
      const cached = (await caches.match(event.request)) || (await caches.match(event.request, { ignoreSearch: true }));

      // Revalidation réseau en arrière-plan (ne bloque jamais l'affichage)
      const revalidate = (async () => {
        try {
          const networkResponse = await Promise.race([
            fetch(event.request.url, { cache: 'no-cache', credentials: 'same-origin' }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("nav-timeout")), 4000))
          ]);
          if (networkResponse && networkResponse.status === 200) {
            try {
              const body = await networkResponse.clone().arrayBuffer();
              if (body.byteLength < 2000000) {
                const headers = new Headers();
                networkResponse.headers.forEach((val, key) => {
                  if (!['cf-cache-status','cf-ray','age','x-cache','nel','report-to'].includes(key.toLowerCase())) {
                    headers.append(key, val);
                  }
                });
                headers.set('content-length', body.byteLength.toString());
                headers.delete('content-encoding');
                headers.delete('transfer-encoding');
                const cleanCopy = new Response(body, {
                  status: networkResponse.status,
                  statusText: networkResponse.statusText,
                  headers
                });
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cleanCopy));
              }
            } catch (e) { /* mise en cache best-effort */ }
          }
          return networkResponse;
        } catch (e) {
          return null;
        }
      })();

      // Cache dispo → on l'affiche tout de suite, le réseau se contente de rafraîchir.
      if (cached) {
        revalidate; // tourne en fire-and-forget, pas de await ici
        return cached;
      }

      // Pas de cache (1ère visite / cache vidé) → on attend le réseau comme avant.
      try {
        const networkResponse = await revalidate;
        if (networkResponse && networkResponse.status === 200) return networkResponse;
        const fallback = _isShellUrl(event.request.url) ? await caches.match(OFFLINE_URL) : null;
        return fallback || networkResponse || _fallbackReconnexion(new URL(event.request.url).pathname);
      } catch (e) {
        const fallback = _isShellUrl(event.request.url) ? await caches.match(OFFLINE_URL) : null;
        return fallback || _fallbackReconnexion(new URL(event.request.url).pathname);
      }
    })());
    return;
  }

  // 27/09/2026 : les pages appellent leurs scripts avec un numéro (app.js?v=r16) alors que le
  // précache les enregistre sans (app.js). Sans repli, un module jamais ouvert avec du réseau
  // ne trouvait pas ses scripts en mode avion (Mizuki : moteur absent). Le fichier précaché est
  // celui de cette version (téléchargé avec cache:'reload' à l'installation) : on le sert
  // tout de suite, et le rafraîchissement en arrière-plan l'enregistre sous l'adresse exacte.
  event.respondWith(
    caches.match(event.request).then((r) => r || caches.match(event.request, { ignoreSearch: true })).then((cachedResponse) => {
      // Cache disponible → retourner immédiatement + rafraîchir en arrière-plan
      if (cachedResponse) {
        // Rafraîchissement en arrière-plan : revalidé auprès du serveur (pas le cache HTTP)
        fetch(event.request, { cache: 'no-cache' }).then(async (networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const body = await networkResponse.arrayBuffer();
            const headers = new Headers();
            networkResponse.headers.forEach((val, key) => {
              if (!['cf-cache-status','cf-ray','age','x-cache','nel','report-to'].includes(key.toLowerCase())) {
                headers.append(key, val);
              }
            });
            headers.set('content-length', body.byteLength.toString());
            headers.delete('content-encoding');
            headers.delete('transfer-encoding');
            const cleanResponse = new Response(body, {
              status: networkResponse.status,
              statusText: networkResponse.statusText,
              headers
            });
            // FIX 2026-07-03 : ne pas stocker les fichiers > 2 Mo (badges PNG) —
            // un Cache Storage obèse est évincé par Android => offline cassé.
            if (body.byteLength < 2000000) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cleanResponse));
            }
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // Pas en cache → réseau
      return fetch(event.request).then(async (networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const body = await networkResponse.arrayBuffer();
          const headers = new Headers();
          networkResponse.headers.forEach((val, key) => {
            if (!['cf-cache-status','cf-ray','age','x-cache','nel','report-to'].includes(key.toLowerCase())) {
              headers.append(key, val);
            }
          });
          headers.set('content-length', body.byteLength.toString());
          headers.delete('content-encoding');
          headers.delete('transfer-encoding');
          const cleanResponse = new Response(body, {
            status: networkResponse.status,
            statusText: networkResponse.statusText,
            headers
          });
          // FIX 2026-07-03 : renvoyer la version aux en-têtes nettoyés (l'ancienne
          // renvoyait le corps décodé avec content-encoding d'origine) + plafond 2 Mo.
          if (body.byteLength < 2000000) {
            const copy = cleanResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return cleanResponse;
        }
        return networkResponse;
      }).catch(() => {
        // Offline + pas en cache → fallback HTML
        const isNav = event.request.mode === "navigate" ||
          event.request.headers.get("accept")?.includes("text/html");
        if (isNav) {
          // FIX 2026-07-03 : caches.match() peut résoudre undefined si le cache a
          // été évincé par Android => respondWith(undefined) => page d'erreur
          // Chrome « Actualiser ». On chaîne un fallback HTML auto-retry.
          return caches.match(OFFLINE_URL).then((r) => r || _fallbackReconnexion());
        }
        return new Response('', { status: 503 });
      });
    })
  );
});

// ── SYNC ──────────────────────────────────────────────────────────────────────
self.addEventListener("sync", (e) => {});

self.addEventListener("periodicsync", (e) => {
  if (e.tag === "update-cache") {
    e.waitUntil(
      caches.open(CACHE_NAME).then((c) =>
        Promise.all(FILES_TO_CACHE.map((u) => c.add(u).catch(() => {})))
      )
    );
  }
});

self.addEventListener("push", (e) => {
  const d = e.data?.json() ?? { title: "Heures Sup", body: "Notification" };
  e.waitUntil(self.registration.showNotification(d.title, { body: d.body, icon: "./icon-192.png" }));
});

self.addEventListener("message", (e) => {
  // 27/09/2026 : version réellement en service (lue par la ligne Version du menu et check.html)
  if (e.data?.type === "SH_VERSION") {
    try { (e.ports && e.ports[0] ? e.ports[0] : e.source).postMessage({ type: "SH_VERSION", version: CACHE_NAME.replace("heuressup-cache-", "") }); } catch (_) {}
    return;
  }
  if (e.data?.type === "GEO_NOTIFY") {
    const { action, distance } = e.data;
    self.registration.showNotification(action === "in" ? "📍 Arrivée" : "🏁 Départ", {
      body: action === "in" ? `Zone à ${Math.round(distance)}m` : "Sortie de zone",
      icon: "./icon-192.png", tag: "geo-punch",
      actions: [{ action: "punch", title: "Pointer" }, { action: "dismiss", title: "Fermer" }],
      data: { action }
    });
  }
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  if (e.action === "dismiss") return;
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      const action = e.notification.data?.action || "in";
      for (const c of list) {
        if (c.url.includes("paye/index.html") && "focus" in c) {
          c.postMessage({ type: "DO_PUNCH", action }); return c.focus();
        }
      }
      return clients.openWindow("./paye/index.html").then((w) => {
        if (w) setTimeout(() => w.postMessage({ type: "DO_PUNCH", action }), 1500);
      });
    })
  );
});
