/**
 * DTE Scenarios Database — 1000 scénarios pré-écrits
 * Matching local sans API — fonctionne hors ligne pour tous les utilisateurs
 * 
 * Catégories :
 *  Bloc 1 (fat=0)  : Situations idéales / préventives
 *  Bloc 2 (fat=1)  : Fatigue légère
 *  Bloc 3 (fat=2)  : Fatigue modérée
 *  Bloc 4 (fat=3)  : Zone d'alerte (75-85)
 *  Bloc 5 (fat=4)  : Zone de risque (85-95)
 *  Bloc 6 (fat=5)  : Zone critique (95+)
 *  Bloc 7          : Questions spécifiques (HS, RCO, récupération, RPS...)
 */
(function(global) {
'use strict';

const DTE_SCENARIOS = [
{
"id": 1,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 3,
"titre": "Excellente forme",
"message": "Tous vos indicateurs sont au vert. C'est le moment idéal pour planifier vos prochaines semaines de travail en intégrant des marges de sécurité.",
"conseils": [
"Profitez de cette période pour former vos collègues",
"Planifiez vos congés sur les prochains mois",
"Documentez vos processus pour les périodes de surcharge"
],
"refs": [],
"urgence": 0,
"question": "Puis-je accepter plus de travail cette semaine ?"
},
{
"id": 2,
"fat": 0,
"stress": 0,
"consec": 1,
"contingent": 0,
"perf": 3,
"titre": "Excellente forme",
"message": "Tous vos indicateurs sont au vert. C'est le moment idéal pour planifier vos prochaines semaines de travail en intégrant des marges de sécurité.",
"conseils": [
"Profitez de cette période pour former vos collègues",
"Planifiez vos congés sur les prochains mois",
"Documentez vos processus pour les périodes de surcharge"
],
"refs": [],
"urgence": 0,
"question": "Puis-je accepter plus de travail cette semaine ?"
},
{
"id": 3,
"fat": 0,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 3,
"titre": "Excellente forme",
"message": "Tous vos indicateurs sont au vert. C'est le moment idéal pour planifier vos prochaines semaines de travail en intégrant des marges de sécurité.",
"conseils": [
"Profitez de cette période pour former vos collègues",
"Planifiez vos congés sur les prochains mois",
"Documentez vos processus pour les périodes de surcharge"
],
"refs": [],
"urgence": 0,
"question": "Puis-je accepter plus de travail cette semaine ?"
},
{
"id": 4,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 3,
"titre": "Excellente forme",
"message": "Tous vos indicateurs sont au vert. C'est le moment idéal pour planifier vos prochaines semaines de travail en intégrant des marges de sécurité.",
"conseils": [
"Profitez de cette période pour former vos collègues",
"Planifiez vos congés sur les prochains mois",
"Documentez vos processus pour les périodes de surcharge"
],
"refs": [],
"urgence": 0,
"question": "Puis-je accepter plus de travail cette semaine ?"
},
{
"id": 5,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 3,
"titre": "Forme optimale maintenue",
"message": "Votre récupération est excellente. Ce niveau de performance est durable si vous maintenez ce rythme.",
"conseils": [
"Maintenez un rythme constant",
"Évitez les pics de surcharge même ponctuels",
"Continuez à respecter le repos hebdomadaire"
],
"refs": [],
"urgence": 0,
"question": "Mon rythme actuel est-il soutenable à long terme ?"
},
{
"id": 6,
"fat": 0,
"stress": 0,
"consec": 1,
"contingent": 0,
"perf": 3,
"titre": "Forme optimale maintenue",
"message": "Votre récupération est excellente. Ce niveau de performance est durable si vous maintenez ce rythme.",
"conseils": [
"Maintenez un rythme constant",
"Évitez les pics de surcharge même ponctuels",
"Continuez à respecter le repos hebdomadaire"
],
"refs": [],
"urgence": 0,
"question": "Mon rythme actuel est-il soutenable à long terme ?"
},
{
"id": 7,
"fat": 0,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 3,
"titre": "Forme optimale maintenue",
"message": "Votre récupération est excellente. Ce niveau de performance est durable si vous maintenez ce rythme.",
"conseils": [
"Maintenez un rythme constant",
"Évitez les pics de surcharge même ponctuels",
"Continuez à respecter le repos hebdomadaire"
],
"refs": [],
"urgence": 0,
"question": "Mon rythme actuel est-il soutenable à long terme ?"
},
{
"id": 8,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 3,
"titre": "Forme optimale maintenue",
"message": "Votre récupération est excellente. Ce niveau de performance est durable si vous maintenez ce rythme.",
"conseils": [
"Maintenez un rythme constant",
"Évitez les pics de surcharge même ponctuels",
"Continuez à respecter le repos hebdomadaire"
],
"refs": [],
"urgence": 0,
"question": "Mon rythme actuel est-il soutenable à long terme ?"
},
{
"id": 9,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 3,
"titre": "Énergie disponible — profitez-en",
"message": "Votre fatigue est basse. C'est la fenêtre idéale pour traiter les dossiers complexes.",
"conseils": [
"Attaquez les tâches à haute concentration maintenant",
"Évitez de reporter les décisions importantes",
"Gardez du temps pour la prévention"
],
"refs": [],
"urgence": 0,
"question": "Comment optimiser mon planning sur le mois ?"
},
{
"id": 10,
"fat": 0,
"stress": 0,
"consec": 1,
"contingent": 0,
"perf": 3,
"titre": "Énergie disponible — profitez-en",
"message": "Votre fatigue est basse. C'est la fenêtre idéale pour traiter les dossiers complexes.",
"conseils": [
"Attaquez les tâches à haute concentration maintenant",
"Évitez de reporter les décisions importantes",
"Gardez du temps pour la prévention"
],
"refs": [],
"urgence": 0,
"question": "Comment optimiser mon planning sur le mois ?"
},
{
"id": 11,
"fat": 0,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 3,
"titre": "Énergie disponible — profitez-en",
"message": "Votre fatigue est basse. C'est la fenêtre idéale pour traiter les dossiers complexes.",
"conseils": [
"Attaquez les tâches à haute concentration maintenant",
"Évitez de reporter les décisions importantes",
"Gardez du temps pour la prévention"
],
"refs": [],
"urgence": 0,
"question": "Comment optimiser mon planning sur le mois ?"
},
{
"id": 12,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 3,
"titre": "Énergie disponible — profitez-en",
"message": "Votre fatigue est basse. C'est la fenêtre idéale pour traiter les dossiers complexes.",
"conseils": [
"Attaquez les tâches à haute concentration maintenant",
"Évitez de reporter les décisions importantes",
"Gardez du temps pour la prévention"
],
"refs": [],
"urgence": 0,
"question": "Comment optimiser mon planning sur le mois ?"
},
{
"id": 13,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 3,
"titre": "Équilibre charge/repos respecté",
"message": "Votre ratio charge/récupération est dans la norme légale et physiologique.",
"conseils": [
"Vérifiez que vos congés payés sont bien planifiés",
"Anticipez les périodes de rush en avance",
"Partagez vos bonnes pratiques d'organisation"
],
"refs": [
"Art. L3141-1 C. trav. — Congés annuels"
],
"urgence": 0,
"question": "Quels signaux surveiller pour anticiper la fatigue ?"
},
{
"id": 14,
"fat": 0,
"stress": 0,
"consec": 1,
"contingent": 0,
"perf": 3,
"titre": "Équilibre charge/repos respecté",
"message": "Votre ratio charge/récupération est dans la norme légale et physiologique.",
"conseils": [
"Vérifiez que vos congés payés sont bien planifiés",
"Anticipez les périodes de rush en avance",
"Partagez vos bonnes pratiques d'organisation"
],
"refs": [
"Art. L3141-1 C. trav. — Congés annuels"
],
"urgence": 0,
"question": "Quels signaux surveiller pour anticiper la fatigue ?"
},
{
"id": 15,
"fat": 0,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 3,
"titre": "Équilibre charge/repos respecté",
"message": "Votre ratio charge/récupération est dans la norme légale et physiologique.",
"conseils": [
"Vérifiez que vos congés payés sont bien planifiés",
"Anticipez les périodes de rush en avance",
"Partagez vos bonnes pratiques d'organisation"
],
"refs": [
"Art. L3141-1 C. trav. — Congés annuels"
],
"urgence": 0,
"question": "Quels signaux surveiller pour anticiper la fatigue ?"
},
{
"id": 16,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 3,
"titre": "Équilibre charge/repos respecté",
"message": "Votre ratio charge/récupération est dans la norme légale et physiologique.",
"conseils": [
"Vérifiez que vos congés payés sont bien planifiés",
"Anticipez les périodes de rush en avance",
"Partagez vos bonnes pratiques d'organisation"
],
"refs": [
"Art. L3141-1 C. trav. — Congés annuels"
],
"urgence": 0,
"question": "Quels signaux surveiller pour anticiper la fatigue ?"
},
{
"id": 17,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 3,
"titre": "Aucun risque légal détecté",
"message": "Votre situation est pleinement conforme au Code du travail. Toutes les limites légales sont respectées.",
"conseils": [
"Continuez à tracer vos heures avec précision",
"Conservez vos relevés au moins 3 ans",
"Informez-vous des évolutions conventionnelles"
],
"refs": [
"Art. L3171-4 C. trav. — Décompte du temps de travail"
],
"urgence": 0,
"question": "Comment maintenir ce niveau de performance ?"
},
{
"id": 18,
"fat": 0,
"stress": 0,
"consec": 1,
"contingent": 0,
"perf": 3,
"titre": "Aucun risque légal détecté",
"message": "Votre situation est pleinement conforme au Code du travail. Toutes les limites légales sont respectées.",
"conseils": [
"Continuez à tracer vos heures avec précision",
"Conservez vos relevés au moins 3 ans",
"Informez-vous des évolutions conventionnelles"
],
"refs": [
"Art. L3171-4 C. trav. — Décompte du temps de travail"
],
"urgence": 0,
"question": "Comment maintenir ce niveau de performance ?"
},
{
"id": 19,
"fat": 0,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 3,
"titre": "Aucun risque légal détecté",
"message": "Votre situation est pleinement conforme au Code du travail. Toutes les limites légales sont respectées.",
"conseils": [
"Continuez à tracer vos heures avec précision",
"Conservez vos relevés au moins 3 ans",
"Informez-vous des évolutions conventionnelles"
],
"refs": [
"Art. L3171-4 C. trav. — Décompte du temps de travail"
],
"urgence": 0,
"question": "Comment maintenir ce niveau de performance ?"
},
{
"id": 20,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 3,
"titre": "Aucun risque légal détecté",
"message": "Votre situation est pleinement conforme au Code du travail. Toutes les limites légales sont respectées.",
"conseils": [
"Continuez à tracer vos heures avec précision",
"Conservez vos relevés au moins 3 ans",
"Informez-vous des évolutions conventionnelles"
],
"refs": [
"Art. L3171-4 C. trav. — Décompte du temps de travail"
],
"urgence": 0,
"question": "Comment maintenir ce niveau de performance ?"
},
{
"id": 21,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 22,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 23,
"fat": 1,
"stress": 0,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 24,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 25,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 0,
"perf": 2,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 26,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 1,
"perf": 3,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 27,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 28,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 29,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 30,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 31,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 0,
"perf": 2,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos. Votre stress associé est notable.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 32,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 1,
"perf": 3,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos. Votre stress associé est notable.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 33,
"fat": 1,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos. Votre stress associé est notable.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 34,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos. Votre stress associé est notable.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 35,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos. Votre stress associé est notable.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 36,
"fat": 1,
"stress": 3,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Légère hausse de fatigue",
"message": "Votre fatigue commence à s'accumuler. C\'est normal en phase de travail soutenu, mais anticipez le repos. Votre stress associé est notable.",
"conseils": [
"Prenez une pause de 15 min toutes les 2h",
"Dormez au minimum 7h cette semaine",
"Réduisez les écrans 1h avant le coucher"
],
"refs": [
"Art. L4121-2 C. trav. — Principes de prévention"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 37,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 38,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 39,
"fat": 1,
"stress": 0,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 40,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 41,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 0,
"perf": 2,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 42,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 1,
"perf": 3,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 43,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 44,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 45,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 46,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 47,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 0,
"perf": 2,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine. Votre stress associé est notable.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 2,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 48,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 1,
"perf": 3,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine. Votre stress associé est notable.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 2,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 49,
"fat": 1,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine. Votre stress associé est notable.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 2,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 50,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine. Votre stress associé est notable.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 2,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 51,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine. Votre stress associé est notable.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 2,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 52,
"fat": 1,
"stress": 3,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Charge hebdomadaire à surveiller",
"message": "Votre semaine s'annonce chargée. Vérifiez que vous ne dépassez pas 48h sur la semaine. Votre stress associé est notable.",
"conseils": [
"Planifiez vos heures en début de semaine",
"Identifiez les tâches délégables",
"Vérifiez les seuils de votre convention collective"
],
"refs": [
"Art. L3121-20 C. trav. — Durée max hebdomadaire 48h",
"Art. L3121-23 — Moyenne sur 12 semaines (44h)"
],
"urgence": 2,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 53,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 54,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 55,
"fat": 1,
"stress": 0,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 56,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 57,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 0,
"perf": 2,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 58,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 1,
"perf": 3,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 59,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 60,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 61,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 62,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 63,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 0,
"perf": 2,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue. Votre stress associé est notable.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 64,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 1,
"perf": 3,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue. Votre stress associé est notable.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 65,
"fat": 1,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue. Votre stress associé est notable.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 66,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue. Votre stress associé est notable.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 67,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue. Votre stress associé est notable.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 68,
"fat": 1,
"stress": 3,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Variabilité du rythme détectée",
"message": "Des variations importantes dans votre charge hebdomadaire peuvent accélérer la fatigue. Votre stress associé est notable.",
"conseils": [
"Lissez votre charge sur la semaine",
"Évitez les journées de +10h suivies de jours légers",
"Négociez une répartition plus équilibrée"
],
"refs": [
"Art. L3121-44 C. trav. — Répartition sur 4 semaines"
],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 69,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 70,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 71,
"fat": 1,
"stress": 0,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 72,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 73,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 0,
"perf": 2,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 74,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 1,
"perf": 3,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 75,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 76,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 77,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 78,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 79,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 0,
"perf": 2,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur. Votre stress associé est notable.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 80,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 1,
"perf": 3,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur. Votre stress associé est notable.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 81,
"fat": 1,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur. Votre stress associé est notable.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 82,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur. Votre stress associé est notable.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 83,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur. Votre stress associé est notable.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 84,
"fat": 1,
"stress": 3,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Récupération insuffisante la nuit",
"message": "Estimation : votre dette de sommeil s'accumule. Les journées au-delà de 9h impactent le sommeil récupérateur. Votre stress associé est notable.",
"conseils": [
"Visez 8h de sommeil minimum les 3 prochains jours",
"Évitez les HS tardives",
"Coupez les notifications professionnelles après 20h"
],
"refs": [],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 85,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 86,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 87,
"fat": 1,
"stress": 0,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 88,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 89,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 0,
"perf": 2,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 90,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 1,
"perf": 3,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 91,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 92,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 93,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 94,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 0,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 95,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 0,
"perf": 2,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement. Votre stress associé est notable.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 96,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 1,
"perf": 3,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement. Votre stress associé est notable.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 97,
"fat": 1,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement. Votre stress associé est notable.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 98,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 3,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement. Votre stress associé est notable.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 99,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement. Votre stress associé est notable.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 100,
"fat": 1,
"stress": 3,
"consec": 0,
"contingent": 1,
"perf": 3,
"titre": "Début de surcharge cognitive",
"message": "Votre cerveau traite plus d'informations que la normale. La concentration se réduit progressivement. Votre stress associé est notable.",
"conseils": [
"Faites des listes — externalisez la mémoire",
"Découpez les grandes tâches en petits blocs",
"Marchez 10 min à l'heure du déjeuner"
],
"refs": [],
"urgence": 1,
"question": "Comment gérer cette fatigue légère ?"
},
{
"id": 101,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 102,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 103,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 104,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 105,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 106,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 1,
"perf": 2,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 107,
"fat": 2,
"stress": 2,
"consec": 0,
"contingent": 2,
"perf": 0,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 108,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 3,
"perf": 1,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 109,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 110,
"fat": 2,
"stress": 3,
"consec": 0,
"contingent": 1,
"perf": 0,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 111,
"fat": 2,
"stress": 3,
"consec": 1,
"contingent": 2,
"perf": 1,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 112,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 3,
"perf": 2,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 113,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 114,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 115,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Fatigue modérée — agissez maintenant",
"message": "Votre fatigue dépasse 60/100. Si vous n'agissez pas maintenant, vous entrerez en zone d\'alerte dans 3 à 5 jours au rythme actuel.",
"conseils": [
"Supprimez toute heure supplémentaire non urgente",
"Dormez 8h minimum les 5 prochains jours",
"Déléguez au moins une tâche récurrente"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 116,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 117,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 118,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 119,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 120,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 121,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 1,
"perf": 2,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 122,
"fat": 2,
"stress": 2,
"consec": 0,
"contingent": 2,
"perf": 0,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 123,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 3,
"perf": 1,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 124,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 125,
"fat": 2,
"stress": 3,
"consec": 0,
"contingent": 1,
"perf": 0,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 126,
"fat": 2,
"stress": 3,
"consec": 1,
"contingent": 2,
"perf": 1,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 127,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 3,
"perf": 2,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 128,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 129,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 130,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Stress et fatigue combinés — risque accéléré",
"message": "La combinaison stress + fatigue est plus dangereuse que chacun séparément. Elle accélère la dégradation des performances de 40%.",
"conseils": [
"Parlez de votre charge à votre manager",
"Utilisez la technique 4-7-8 pour décompresser (inspire 4s, retient 7s, expire 8s)",
"Évitez les décisions importantes en fin de journée"
],
"refs": [
"Accord ANI 2008 — Prévention du stress au travail"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 131,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 132,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 133,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 134,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 135,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 136,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 1,
"perf": 2,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 137,
"fat": 2,
"stress": 2,
"consec": 0,
"contingent": 2,
"perf": 0,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 138,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 3,
"perf": 1,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 139,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 140,
"fat": 2,
"stress": 3,
"consec": 0,
"contingent": 1,
"perf": 0,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 141,
"fat": 2,
"stress": 3,
"consec": 1,
"contingent": 2,
"perf": 1,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 142,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 3,
"perf": 2,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 143,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 144,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 145,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Approche de la zone d'alerte légale",
"message": "Vous approchez des seuils déclencheurs d'obligations légales pour l\'employeur. À 75 de fatigue, des mesures de prévention s\'imposent.",
"conseils": [
"Signalez votre état à votre responsable RH",
"Demandez un entretien avec le médecin du travail",
"Documentez votre charge réelle avec horodatage"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale à la demande du salarié"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 146,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 147,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 148,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 149,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 150,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 151,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 1,
"perf": 2,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 152,
"fat": 2,
"stress": 2,
"consec": 0,
"contingent": 2,
"perf": 0,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 153,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 3,
"perf": 1,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 154,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 155,
"fat": 2,
"stress": 3,
"consec": 0,
"contingent": 1,
"perf": 0,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 156,
"fat": 2,
"stress": 3,
"consec": 1,
"contingent": 2,
"perf": 1,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 157,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 3,
"perf": 2,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 158,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 159,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 160,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Jours consécutifs trop nombreux",
"message": "Travailler plusieurs jours consécutifs sans repos suffisant double le risque d\'erreur professionnelle et triple le risque d'accident.",
"conseils": [
"Prenez un repos complet dès que possible",
"Vérifiez que le repos hebdomadaire de 35h est bien planifié",
"Refusez poliment les sollicitations du week-end"
],
"refs": [
"Art. L3132-1 C. trav. — Repos hebdomadaire 35h consécutives",
"Art. L3131-1 — Repos quotidien 11h"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 161,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 162,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 163,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 164,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 165,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 166,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 1,
"perf": 2,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 167,
"fat": 2,
"stress": 2,
"consec": 0,
"contingent": 2,
"perf": 0,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 168,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 3,
"perf": 1,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 169,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 170,
"fat": 2,
"stress": 3,
"consec": 0,
"contingent": 1,
"perf": 0,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 171,
"fat": 2,
"stress": 3,
"consec": 1,
"contingent": 2,
"perf": 1,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 172,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 3,
"perf": 2,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 173,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 174,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 175,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Performance en baisse — signal à prendre au sérieux",
"message": "Une performance sous 60/100 indique que votre cerveau est en mode économie d'énergie. La qualité de vos décisions est réduite.",
"conseils": [
"Reportez les choix stratégiques",
"Revérifiez les travaux produits ce jour",
"Communiquez sur votre état à vos collègues"
],
"refs": [],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 176,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 177,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 178,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 179,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 180,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 181,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 1,
"perf": 2,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 182,
"fat": 2,
"stress": 2,
"consec": 0,
"contingent": 2,
"perf": 0,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 183,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 3,
"perf": 1,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 184,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 185,
"fat": 2,
"stress": 3,
"consec": 0,
"contingent": 1,
"perf": 0,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 186,
"fat": 2,
"stress": 3,
"consec": 1,
"contingent": 2,
"perf": 1,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 187,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 3,
"perf": 2,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 188,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 189,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 190,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Surcharge structurelle détectée",
"message": "Votre charge dépasse régulièrement le seuil normal. Ce n'est pas une pointe — c\'est un mode de fonctionnement devenu la norme.",
"conseils": [
"Demandez une révision de poste",
"Calculez votre charge réelle vs contractuelle",
"Consultez les délégués du personnel (CSE)"
],
"refs": [
"Art. L2312-8 C. trav. — Missions du CSE",
"Art. L3121-33 — Contingent HS"
],
"urgence": 2,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 191,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 192,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 193,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 194,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 195,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 196,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 1,
"perf": 2,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 197,
"fat": 2,
"stress": 2,
"consec": 0,
"contingent": 2,
"perf": 0,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 198,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 3,
"perf": 1,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 199,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 200,
"fat": 2,
"stress": 3,
"consec": 0,
"contingent": 1,
"perf": 0,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 201,
"fat": 2,
"stress": 3,
"consec": 1,
"contingent": 2,
"perf": 1,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 202,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 3,
"perf": 2,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 203,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 204,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 205,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Contingent HS significativement entamé",
"message": "Plus de 50% de votre contingent annuel est utilisé. Au rythme actuel, vous l'atteindrez avant la fin de l\'année.",
"conseils": [
"Établissez un plan de décompte hebdomadaire",
"Identifiez les semaines sans HS possibles",
"Vérifiez les majorations applicables (25% puis 50%)"
],
"refs": [
"Art. L3121-28 C. trav. — Majoration HS",
"Art. L3121-33 — Contingent et contrepartie"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 206,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 207,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 208,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 209,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 210,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 211,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 1,
"perf": 2,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 212,
"fat": 2,
"stress": 2,
"consec": 0,
"contingent": 2,
"perf": 0,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 213,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 3,
"perf": 1,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 214,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 0,
"perf": 2,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 215,
"fat": 2,
"stress": 3,
"consec": 0,
"contingent": 1,
"perf": 0,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 216,
"fat": 2,
"stress": 3,
"consec": 1,
"contingent": 2,
"perf": 1,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 217,
"fat": 2,
"stress": 3,
"consec": 2,
"contingent": 3,
"perf": 2,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 218,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 219,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 220,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Variabilité horaire extrême",
"message": "Vos semaines varient de plus de 5h d\'une semaine à l'autre. Cette instabilité empêche une récupération efficace.",
"conseils": [
"Négociez un planning prévisionnel à 4 semaines",
"Exigez un délai de prévenance pour les HS",
"Consultez votre accord de modulation si applicable"
],
"refs": [
"Art. L3121-44 C. trav. — Accord de modulation",
"Art. L3121-47 — Délai de prévenance"
],
"urgence": 1,
"question": "Que faire avec cette fatigue modérée ?"
},
{
"id": 221,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 222,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 223,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 224,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 225,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 226,
"fat": 3,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 227,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 228,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 229,
"fat": 3,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 230,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 231,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 1,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 232,
"fat": 3,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 2,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 233,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 234,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 235,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "ALERTE — Seuil légal de vigilance atteint",
"message": "Fatigue à 75+/100. Le Code du travail oblige l\'employeur à mettre en place des mesures de prévention à ce niveau.",
"conseils": [
"Signalez formellement votre état par écrit (email tracé)",
"Demandez une réduction temporaire de charge",
"Consultez le médecin du travail dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de sécurité",
"Art. L4624-1 — Visite médicale à la demande"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 236,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 237,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 238,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 239,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 240,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 241,
"fat": 3,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 242,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 243,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 244,
"fat": 3,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 245,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 246,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 1,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 247,
"fat": 3,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 2,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 248,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 249,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 250,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Repos quotidien en danger",
"message": "Avec votre charge actuelle, le repos quotidien de 11h obligatoire est probablement insuffisant. C'est une infraction passible d\'amende.",
"conseils": [
"Vérifiez vos horaires de fin et de reprise",
"Signalez toute infraction aux 11h à l\'inspection du travail",
"Conservez vos relevés badgeage"
],
"refs": [
"Art. L3131-1 C. trav. — Repos quotidien 11h minimum",
"Art. R3131-1 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 251,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 252,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 253,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 254,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 255,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 256,
"fat": 3,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 257,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 258,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 259,
"fat": 3,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 260,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 261,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 1,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 262,
"fat": 3,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 2,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 263,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 264,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 265,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Risque d\'erreur professionnelle élevé",
"message": "Au-delà de 75 de fatigue, le risque d'erreur augmente de 75%. Dans les secteurs sensibles (conduite, santé, finance), cela peut engager votre responsabilité.",
"conseils": [
"Faites valider vos décisions importantes par un tiers",
"Évitez de conduire si vous ressentez de la somnolence",
"Informez votre hiérarchie de votre état"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait en cas de danger grave"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 266,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 267,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 268,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 269,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 270,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 271,
"fat": 3,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 272,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 273,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 274,
"fat": 3,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 275,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 276,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 1,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 277,
"fat": 3,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 2,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 278,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 279,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 280,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Semaine de récupération nécessaire",
"message": "Votre modèle prédit que sans intervention, vous atteindrez la zone critique (85+) dans moins d\'une semaine.",
"conseils": [
"Posez 2 jours de RTT ou congé si possible",
"Réduisez à zéro HS cette semaine",
"Activez le protocole repos : pas de travail après 18h"
],
"refs": [
"Art. L3141-1 C. trav. — Droit aux congés payés"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 281,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 282,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 283,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 284,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 285,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 286,
"fat": 3,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 287,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 288,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 289,
"fat": 3,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 290,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 291,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 1,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 292,
"fat": 3,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 2,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 293,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 294,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 295,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Convention collective à vérifier",
"message": "Votre convention collective peut prévoir des seuils plus protecteurs que la loi. Vérifiez-la dès maintenant.",
"conseils": [
"Consultez votre CCN sur le site Légifrance",
"Vérifiez les dispositions sur les HS et la modulation",
"Comparez avec votre contrat de travail"
],
"refs": [
"Art. L2251-1 C. trav. — Principe de faveur"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 296,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 297,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 298,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 299,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 300,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 301,
"fat": 3,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 302,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 303,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 304,
"fat": 3,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 305,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 306,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 1,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 307,
"fat": 3,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 2,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 308,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 309,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 310,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Burn-out : signes précurseurs",
"message": "Cette combinaison fatigue élevée + stress + durée correspond aux premiers signes du syndrome d'épuisement professionnel.",
"conseils": [
"Parlez à un professionnel de santé en dehors du travail",
"Ne banalisez pas ces symptômes",
"Consultez le site ameli.fr sur le burn-out"
],
"refs": [
"Recommandation HAS 2017 — Burn-out",
"Art. L4121-1 C. trav."
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 311,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 312,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 313,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 314,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 315,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 316,
"fat": 3,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 317,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 318,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 319,
"fat": 3,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 320,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 321,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 1,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 322,
"fat": 3,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 2,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 323,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 324,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 325,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Droit de retrait — conditions proches",
"message": "Vous approchez des conditions permettant l'exercice du droit de retrait. Ce droit s\'applique en cas de danger grave et imminent pour la santé.",
"conseils": [
"Documentez précisément votre état et votre charge",
"Informez le CSE de votre situation",
"En cas de refus d'action de l\'employeur : droit de retrait applicable"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection contre les sanctions"
],
"urgence": 3,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 326,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 327,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 328,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 329,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 330,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 331,
"fat": 3,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 332,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 333,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 334,
"fat": 3,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 335,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 336,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 1,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 337,
"fat": 3,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 2,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 338,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 339,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 340,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Temps de pause insuffisant",
"message": "Une pause de 20 minutes toutes les 6h est obligatoire. Vérifiez que vous la prenez réellement.",
"conseils": [
"Bloquez des pauses dans votre agenda",
"Prenez vos repas loin de votre poste de travail",
"Déconnectez réellement pendant les pauses"
],
"refs": [
"Art. L3121-16 C. trav. — Pause de 20 min minimum"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 341,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 342,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 343,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 344,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 345,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 346,
"fat": 3,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 347,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 348,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 349,
"fat": 3,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 350,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 351,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 1,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 352,
"fat": 3,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 2,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 353,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 354,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 355,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Surcharge : droit à la déconnexion",
"message": "Le droit à la déconnexion est légalement reconnu. Votre employeur doit avoir mis en place des modalités pour le respecter.",
"conseils": [
"Vérifiez l'accord d\'entreprise sur la déconnexion",
"Paramétrez des plages horaires sans notifications",
"Refusez les sollicitations hors heures de travail"
],
"refs": [
"Art. L2242-17 C. trav. — Droit à la déconnexion"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 356,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 357,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 358,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 359,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 360,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 361,
"fat": 3,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 362,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 363,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 364,
"fat": 3,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 2,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 365,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 366,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 1,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 367,
"fat": 3,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 2,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 368,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 369,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 370,
"fat": 3,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Visite médicale — réclamez-la",
"message": "Tout salarié peut demander à tout moment une visite auprès du médecin du travail. C'est confidentiel et sans frais.",
"conseils": [
"Contactez le service de santé au travail (SST)",
"La visite est confidentielle — l\'employeur ne reçoit que l'aptitude",
"Le médecin peut proposer un aménagement de poste"
],
"refs": [
"Art. L4624-1 C. trav. — Visite à la demande du salarié"
],
"urgence": 2,
"question": "Que faire en zone d'alerte ?"
},
{
"id": 371,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 372,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 373,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 374,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 375,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 376,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 377,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 378,
"fat": 4,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 379,
"fat": 4,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 380,
"fat": 4,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 381,
"fat": 4,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 382,
"fat": 4,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 383,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 384,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 385,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 386,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 387,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 388,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 389,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "RISQUE ÉLEVÉ — Réduction immédiate requise",
"message": "Fatigue à 85+/100. La loi et la médecine s'accordent : une intervention est nécessaire dans les 24h.",
"conseils": [
"Réduisez vos heures de 30% immédiatement",
"Informez votre employeur par écrit",
"Consultez un médecin dans les 48h"
],
"refs": [
"Art. L4121-1 C. trav.",
"Art. L4624-1 — Visite médicale urgente"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 390,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 391,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 392,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 393,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 394,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 395,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 396,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 397,
"fat": 4,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 398,
"fat": 4,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 399,
"fat": 4,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 400,
"fat": 4,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 401,
"fat": 4,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 402,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 403,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 404,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 405,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 406,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 407,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 408,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Décisions à haut risque d'erreur",
"message": "À ce niveau de fatigue, les erreurs de jugement augmentent de 200%. Évitez toute décision irréversible.",
"conseils": [
"Déléguez les décisions importantes",
"Faites vérifier tous les documents sensibles",
"Reportez les réunions stratégiques"
],
"refs": [],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 409,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 410,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 411,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 412,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 413,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 414,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 415,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 416,
"fat": 4,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 417,
"fat": 4,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 418,
"fat": 4,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 419,
"fat": 4,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 420,
"fat": 4,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 421,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 422,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 423,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 424,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 425,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 426,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 427,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Durée maximale hebdomadaire proche",
"message": "Vous approchez ou dépassez les 48h hebdomadaires légales. Au-delà, l\'employeur est en infraction.",
"conseils": [
"Comptabilisez précisément vos heures cette semaine",
"Refusez toute HS supplémentaire",
"Signalez le dépassement à l\'inspection du travail si nécessaire"
],
"refs": [
"Art. L3121-20 C. trav. — 48h maximum/semaine",
"Art. R3121-2 — Sanctions pénales"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 428,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 429,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 430,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 431,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 432,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 433,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 434,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 435,
"fat": 4,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 436,
"fat": 4,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 437,
"fat": 4,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 438,
"fat": 4,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 439,
"fat": 4,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 440,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 441,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 442,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 443,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 444,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 445,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 446,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Sécurité routière compromise",
"message": "La fatigue à ce niveau réduit les réflexes autant que 0,5g d'alcool. Si vous conduisez pour le travail, le risque d\'accident est multiplié par 6.",
"conseils": [
"Ne conduisez pas si vous ressentez somnolence ou difficultés de concentration",
"Signalez-le à votre employeur pour aménagement",
"Utilisez les transports en commun"
],
"refs": [
"Art. L4121-1 C. trav. — Sécurité des travailleurs",
"Code de la route Art. R412-1"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 447,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 448,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 449,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 450,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 451,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 452,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 453,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 454,
"fat": 4,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 455,
"fat": 4,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 456,
"fat": 4,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 457,
"fat": 4,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 458,
"fat": 4,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 459,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 460,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 461,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 462,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 463,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 464,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 465,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Contingent HS critique",
"message": "Votre contingent est très avancé. Les HS au-delà du contingent ouvrent un droit à repos compensateur obligatoire (RCO) que l\'employeur ne peut pas refuser.",
"conseils": [
"Calculez vos heures au-delà du contingent",
"Réclamez votre RCO formellement par écrit",
"Le refus de l\'employeur est passible de sanctions"
],
"refs": [
"Art. L3121-33 C. trav. — RCO",
"Art. L3121-38 — Taux du RCO (100% des heures)"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 466,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 467,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 468,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 469,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 470,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 471,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 472,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 473,
"fat": 4,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 474,
"fat": 4,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 475,
"fat": 4,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 476,
"fat": 4,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 477,
"fat": 4,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 478,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 479,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 480,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 481,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 482,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 483,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 484,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Épuisement professionnel avancé",
"message": "Les symptômes actuels correspondent à une phase avancée du syndrome d'épuisement. Un arrêt médical peut être justifié.",
"conseils": [
"Consultez votre médecin traitant cette semaine",
"Un arrêt maladie est un droit et ne peut pas être sanctionné",
"Contactez le 3114 (numéro national prévention suicide) si vous vous sentez en détresse"
],
"refs": [
"Art. L1226-1 C. trav. — Protection pendant l'arrêt maladie"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 485,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 486,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 487,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 488,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 489,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 490,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 491,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 492,
"fat": 4,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 493,
"fat": 4,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 494,
"fat": 4,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 495,
"fat": 4,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 496,
"fat": 4,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 497,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 498,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 499,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 500,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 501,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 502,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 503,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Accident du travail — risque réel",
"message": "À ce niveau de fatigue, le risque d'accident du travail est statistiquement 8 fois plus élevé qu\'en état normal.",
"conseils": [
"Signalez votre état à votre employeur : il a l'obligation d\'agir",
"Tout accident survenu dans cet état peut engager la responsabilité de l\'employeur",
"Documentez votre état actuel"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable de l\'employeur si inaction"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 504,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 505,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 506,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 507,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 508,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 509,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 510,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 511,
"fat": 4,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 512,
"fat": 4,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 513,
"fat": 4,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 514,
"fat": 4,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 515,
"fat": 4,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 516,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 517,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 518,
"fat": 4,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 519,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 1,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 520,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 521,
"fat": 4,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 522,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "Heures supplémentaires : refus légal possible",
"message": "Le salarié peut refuser des HS si elles mettent en danger sa santé. Ce refus est protégé par la loi.",
"conseils": [
"Informez votre employeur par écrit de votre état",
"Invoquez l'Art. L4131-1 en cas de danger grave",
"Ce refus ne peut pas entraîner de sanction"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-3 — Protection du salarié"
],
"urgence": 3,
"question": "Que faire en zone de risque élevé ?"
},
{
"id": 523,
"fat": 5,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 524,
"fat": 5,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 525,
"fat": 5,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 526,
"fat": 5,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 527,
"fat": 5,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 528,
"fat": 5,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 529,
"fat": 5,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 530,
"fat": 5,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 531,
"fat": 5,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 532,
"fat": 5,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 533,
"fat": 5,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 534,
"fat": 5,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 535,
"fat": 5,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 536,
"fat": 5,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 537,
"fat": 5,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 538,
"fat": 5,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 539,
"fat": 5,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 540,
"fat": 5,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 541,
"fat": 5,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 542,
"fat": 5,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 CRITIQUE — Arrêt de travail recommandé",
"message": "Fatigue à 95+/100. Vous êtes en danger physique réel. Le maintien en poste à ce niveau est une faute grave de l\'employeur.",
"conseils": [
"Arrêtez le travail maintenant",
"Contactez votre médecin traitant aujourd\'hui",
"Informez votre employeur par écrit de votre état"
],
"refs": [
"Art. L4121-1 C. trav. — Faute inexcusable",
"Art. L4131-1 — Droit de retrait immédiat"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 543,
"fat": 5,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 544,
"fat": 5,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 545,
"fat": 5,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 546,
"fat": 5,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 547,
"fat": 5,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 548,
"fat": 5,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 549,
"fat": 5,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 550,
"fat": 5,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 551,
"fat": 5,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 552,
"fat": 5,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 553,
"fat": 5,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 554,
"fat": 5,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 555,
"fat": 5,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 556,
"fat": 5,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 557,
"fat": 5,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 558,
"fat": 5,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 559,
"fat": 5,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 560,
"fat": 5,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 561,
"fat": 5,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 562,
"fat": 5,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Droit de retrait — Activez-le maintenant",
"message": "Les conditions du droit de retrait sont réunies : danger grave et imminent pour votre santé. Ce droit est inconditionnel.",
"conseils": [
"Quittez votre poste",
"Informez votre employeur immédiatement (oral + écrit)",
"Contactez le CSE / représentants du personnel"
],
"refs": [
"Art. L4131-1 C. trav. — Droit de retrait",
"Art. L4131-2 — Protection totale contre les sanctions",
"Art. L4131-4 — Rôle du CSE"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 563,
"fat": 5,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 564,
"fat": 5,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 565,
"fat": 5,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 566,
"fat": 5,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 567,
"fat": 5,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 568,
"fat": 5,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 569,
"fat": 5,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 570,
"fat": 5,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 571,
"fat": 5,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 572,
"fat": 5,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 573,
"fat": 5,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 574,
"fat": 5,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 575,
"fat": 5,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 576,
"fat": 5,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 577,
"fat": 5,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 578,
"fat": 5,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 579,
"fat": 5,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 580,
"fat": 5,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 581,
"fat": 5,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 582,
"fat": 5,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Urgence médicale potentielle",
"message": "Ce niveau de fatigue combiné à d'autres facteurs peut masquer des symptômes médicaux sérieux (burnout sévère, dépression, risque cardiovasculaire).",
"conseils": [
"Consultez les urgences ou votre médecin aujourd\'hui",
"Ne banalisez pas la fatigue extrême",
"Appelez le 15 (SAMU) en cas de symptômes physiques (douleurs thoraciques, vertiges)"
],
"refs": [
"Code de déontologie médicale Art. 47"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 583,
"fat": 5,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 584,
"fat": 5,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 585,
"fat": 5,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 586,
"fat": 5,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 587,
"fat": 5,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 588,
"fat": 5,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 589,
"fat": 5,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 590,
"fat": 5,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 591,
"fat": 5,
"stress": 3,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 592,
"fat": 5,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 593,
"fat": 5,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 594,
"fat": 5,
"stress": 3,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 595,
"fat": 5,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 596,
"fat": 5,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 597,
"fat": 5,
"stress": 3,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 598,
"fat": 5,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 599,
"fat": 5,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 600,
"fat": 5,
"stress": 3,
"consec": 1,
"contingent": 1,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 601,
"fat": 5,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 602,
"fat": 5,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 0,
"titre": "🚨 Responsabilité employeur engagée",
"message": "Si l\'employeur est informé de votre état et n'agit pas, sa responsabilité civile et pénale est engagée.",
"conseils": [
"Envoyez un email de signalement formel avec accusé de lecture",
"Conservez toutes les preuves de votre charge",
"Consultez un avocat spécialisé en droit du travail si aucune action n'est prise"
],
"refs": [
"Art. L4121-1 C. trav. — Obligation de résultat",
"Art. 1242 Code civil — Responsabilité civile",
"Art. L4741-1 — Sanctions pénales patronales"
],
"urgence": 3,
"question": "Situation critique — que faire ?"
},
{
"id": 603,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Majoration des heures supplémentaires",
"message": "Les premières 8 HS hebdomadaires sont majorées à 25%, les suivantes à 50%. Ces taux peuvent être modifiés par accord d'entreprise mais jamais en dessous de 10%.",
"conseils": [
"Vérifiez vos bulletins de salaire chaque mois",
"Les HS non payées restent dues jusqu'à prescription (3 ans)",
"La majoration peut être remplacée par du repos compensateur"
],
"refs": [
"Art. L3121-28 C. trav. — Définition HS",
"Art. L3121-36 — Taux de majoration 25%/50%",
"Art. L3245-1 — Prescription 3 ans"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 604,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Majoration des heures supplémentaires",
"message": "Les premières 8 HS hebdomadaires sont majorées à 25%, les suivantes à 50%. Ces taux peuvent être modifiés par accord d'entreprise mais jamais en dessous de 10%.",
"conseils": [
"Vérifiez vos bulletins de salaire chaque mois",
"Les HS non payées restent dues jusqu'à prescription (3 ans)",
"La majoration peut être remplacée par du repos compensateur"
],
"refs": [
"Art. L3121-28 C. trav. — Définition HS",
"Art. L3121-36 — Taux de majoration 25%/50%",
"Art. L3245-1 — Prescription 3 ans"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 605,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Majoration des heures supplémentaires",
"message": "Les premières 8 HS hebdomadaires sont majorées à 25%, les suivantes à 50%. Ces taux peuvent être modifiés par accord d'entreprise mais jamais en dessous de 10%.",
"conseils": [
"Vérifiez vos bulletins de salaire chaque mois",
"Les HS non payées restent dues jusqu'à prescription (3 ans)",
"La majoration peut être remplacée par du repos compensateur"
],
"refs": [
"Art. L3121-28 C. trav. — Définition HS",
"Art. L3121-36 — Taux de majoration 25%/50%",
"Art. L3245-1 — Prescription 3 ans"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 606,
"fat": 3,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Majoration des heures supplémentaires",
"message": "Les premières 8 HS hebdomadaires sont majorées à 25%, les suivantes à 50%. Ces taux peuvent être modifiés par accord d'entreprise mais jamais en dessous de 10%.",
"conseils": [
"Vérifiez vos bulletins de salaire chaque mois",
"Les HS non payées restent dues jusqu'à prescription (3 ans)",
"La majoration peut être remplacée par du repos compensateur"
],
"refs": [
"Art. L3121-28 C. trav. — Définition HS",
"Art. L3121-36 — Taux de majoration 25%/50%",
"Art. L3245-1 — Prescription 3 ans"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 607,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Majoration des heures supplémentaires",
"message": "Les premières 8 HS hebdomadaires sont majorées à 25%, les suivantes à 50%. Ces taux peuvent être modifiés par accord d'entreprise mais jamais en dessous de 10%.",
"conseils": [
"Vérifiez vos bulletins de salaire chaque mois",
"Les HS non payées restent dues jusqu'à prescription (3 ans)",
"La majoration peut être remplacée par du repos compensateur"
],
"refs": [
"Art. L3121-28 C. trav. — Définition HS",
"Art. L3121-36 — Taux de majoration 25%/50%",
"Art. L3245-1 — Prescription 3 ans"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 608,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Délai de réclamation des HS impayées",
"message": "Vous avez 3 ans pour réclamer des heures supplémentaires impayées, à compter de la date à laquelle vous auriez dû les percevoir.",
"conseils": [
"Rassemblez vos preuves (emails, badgeages, planning)",
"Saisissez d'abord votre employeur par écrit",
"En cas d'échec : saisie du Conseil de Prud\'hommes"
],
"refs": [
"Art. L3245-1 C. trav. — Prescription salariale 3 ans",
"Art. R1452-1 — Saisine CPH"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 609,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Délai de réclamation des HS impayées",
"message": "Vous avez 3 ans pour réclamer des heures supplémentaires impayées, à compter de la date à laquelle vous auriez dû les percevoir.",
"conseils": [
"Rassemblez vos preuves (emails, badgeages, planning)",
"Saisissez d'abord votre employeur par écrit",
"En cas d'échec : saisie du Conseil de Prud\'hommes"
],
"refs": [
"Art. L3245-1 C. trav. — Prescription salariale 3 ans",
"Art. R1452-1 — Saisine CPH"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 610,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Délai de réclamation des HS impayées",
"message": "Vous avez 3 ans pour réclamer des heures supplémentaires impayées, à compter de la date à laquelle vous auriez dû les percevoir.",
"conseils": [
"Rassemblez vos preuves (emails, badgeages, planning)",
"Saisissez d'abord votre employeur par écrit",
"En cas d'échec : saisie du Conseil de Prud\'hommes"
],
"refs": [
"Art. L3245-1 C. trav. — Prescription salariale 3 ans",
"Art. R1452-1 — Saisine CPH"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 611,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Délai de réclamation des HS impayées",
"message": "Vous avez 3 ans pour réclamer des heures supplémentaires impayées, à compter de la date à laquelle vous auriez dû les percevoir.",
"conseils": [
"Rassemblez vos preuves (emails, badgeages, planning)",
"Saisissez d'abord votre employeur par écrit",
"En cas d'échec : saisie du Conseil de Prud\'hommes"
],
"refs": [
"Art. L3245-1 C. trav. — Prescription salariale 3 ans",
"Art. R1452-1 — Saisine CPH"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 612,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Délai de réclamation des HS impayées",
"message": "Vous avez 3 ans pour réclamer des heures supplémentaires impayées, à compter de la date à laquelle vous auriez dû les percevoir.",
"conseils": [
"Rassemblez vos preuves (emails, badgeages, planning)",
"Saisissez d'abord votre employeur par écrit",
"En cas d'échec : saisie du Conseil de Prud\'hommes"
],
"refs": [
"Art. L3245-1 C. trav. — Prescription salariale 3 ans",
"Art. R1452-1 — Saisine CPH"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 613,
"fat": 2,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Forfait jours — droits spécifiques",
"message": "Les salariés au forfait jours ont des droits spécifiques : entretien annuel obligatoire, suivi de la charge de travail, droit à la déconnexion.",
"conseils": [
"Exigez l'entretien annuel forfait jours",
"Signalez une charge incompatible avec votre forfait",
"Le dépassement régulier peut justifier une requalification"
],
"refs": [
"Art. L3121-60 C. trav. — Entretien annuel forfait jours",
"Art. L3121-64 — Conditions de validité"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 614,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Forfait jours — droits spécifiques",
"message": "Les salariés au forfait jours ont des droits spécifiques : entretien annuel obligatoire, suivi de la charge de travail, droit à la déconnexion.",
"conseils": [
"Exigez l'entretien annuel forfait jours",
"Signalez une charge incompatible avec votre forfait",
"Le dépassement régulier peut justifier une requalification"
],
"refs": [
"Art. L3121-60 C. trav. — Entretien annuel forfait jours",
"Art. L3121-64 — Conditions de validité"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 615,
"fat": 0,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Forfait jours — droits spécifiques",
"message": "Les salariés au forfait jours ont des droits spécifiques : entretien annuel obligatoire, suivi de la charge de travail, droit à la déconnexion.",
"conseils": [
"Exigez l'entretien annuel forfait jours",
"Signalez une charge incompatible avec votre forfait",
"Le dépassement régulier peut justifier une requalification"
],
"refs": [
"Art. L3121-60 C. trav. — Entretien annuel forfait jours",
"Art. L3121-64 — Conditions de validité"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 616,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Forfait jours — droits spécifiques",
"message": "Les salariés au forfait jours ont des droits spécifiques : entretien annuel obligatoire, suivi de la charge de travail, droit à la déconnexion.",
"conseils": [
"Exigez l'entretien annuel forfait jours",
"Signalez une charge incompatible avec votre forfait",
"Le dépassement régulier peut justifier une requalification"
],
"refs": [
"Art. L3121-60 C. trav. — Entretien annuel forfait jours",
"Art. L3121-64 — Conditions de validité"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 617,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Forfait jours — droits spécifiques",
"message": "Les salariés au forfait jours ont des droits spécifiques : entretien annuel obligatoire, suivi de la charge de travail, droit à la déconnexion.",
"conseils": [
"Exigez l'entretien annuel forfait jours",
"Signalez une charge incompatible avec votre forfait",
"Le dépassement régulier peut justifier une requalification"
],
"refs": [
"Art. L3121-60 C. trav. — Entretien annuel forfait jours",
"Art. L3121-64 — Conditions de validité"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 618,
"fat": 3,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Temps partiel et HS",
"message": "Les salariés à temps partiel effectuant des heures au-delà de leur contrat ont droit à des heures complémentaires majorées et à un requalification possible en temps plein.",
"conseils": [
"Comptabilisez précisément vos heures réelles vs contractuelles",
"Au-delà de 10% du contrat : droit à majoration",
"Récurrence = droit à requalification en CDI temps plein"
],
"refs": [
"Art. L3123-9 C. trav. — Heures complémentaires",
"Art. L3123-17 — Majoration 10% à 25%"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 619,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Temps partiel et HS",
"message": "Les salariés à temps partiel effectuant des heures au-delà de leur contrat ont droit à des heures complémentaires majorées et à un requalification possible en temps plein.",
"conseils": [
"Comptabilisez précisément vos heures réelles vs contractuelles",
"Au-delà de 10% du contrat : droit à majoration",
"Récurrence = droit à requalification en CDI temps plein"
],
"refs": [
"Art. L3123-9 C. trav. — Heures complémentaires",
"Art. L3123-17 — Majoration 10% à 25%"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 620,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Temps partiel et HS",
"message": "Les salariés à temps partiel effectuant des heures au-delà de leur contrat ont droit à des heures complémentaires majorées et à un requalification possible en temps plein.",
"conseils": [
"Comptabilisez précisément vos heures réelles vs contractuelles",
"Au-delà de 10% du contrat : droit à majoration",
"Récurrence = droit à requalification en CDI temps plein"
],
"refs": [
"Art. L3123-9 C. trav. — Heures complémentaires",
"Art. L3123-17 — Majoration 10% à 25%"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 621,
"fat": 2,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Temps partiel et HS",
"message": "Les salariés à temps partiel effectuant des heures au-delà de leur contrat ont droit à des heures complémentaires majorées et à un requalification possible en temps plein.",
"conseils": [
"Comptabilisez précisément vos heures réelles vs contractuelles",
"Au-delà de 10% du contrat : droit à majoration",
"Récurrence = droit à requalification en CDI temps plein"
],
"refs": [
"Art. L3123-9 C. trav. — Heures complémentaires",
"Art. L3123-17 — Majoration 10% à 25%"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 622,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Temps partiel et HS",
"message": "Les salariés à temps partiel effectuant des heures au-delà de leur contrat ont droit à des heures complémentaires majorées et à un requalification possible en temps plein.",
"conseils": [
"Comptabilisez précisément vos heures réelles vs contractuelles",
"Au-delà de 10% du contrat : droit à majoration",
"Récurrence = droit à requalification en CDI temps plein"
],
"refs": [
"Art. L3123-9 C. trav. — Heures complémentaires",
"Art. L3123-17 — Majoration 10% à 25%"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 623,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Travail de nuit — protections renforcées",
"message": "Le travail de nuit (21h-6h) ouvre des droits spécifiques : repos compensateurs, majoration, surveillance médicale renforcée.",
"conseils": [
"Vérifiez votre qualification de travailleur de nuit",
"La surveillance médicale est tous les 6 mois (non tous les 2 ans)",
"Les heures de nuit régulières nécessitent un accord collectif"
],
"refs": [
"Art. L3122-1 C. trav. — Définition travail de nuit",
"Art. L3122-9 — Durée max 8h/nuit"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 624,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Travail de nuit — protections renforcées",
"message": "Le travail de nuit (21h-6h) ouvre des droits spécifiques : repos compensateurs, majoration, surveillance médicale renforcée.",
"conseils": [
"Vérifiez votre qualification de travailleur de nuit",
"La surveillance médicale est tous les 6 mois (non tous les 2 ans)",
"Les heures de nuit régulières nécessitent un accord collectif"
],
"refs": [
"Art. L3122-1 C. trav. — Définition travail de nuit",
"Art. L3122-9 — Durée max 8h/nuit"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 625,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Travail de nuit — protections renforcées",
"message": "Le travail de nuit (21h-6h) ouvre des droits spécifiques : repos compensateurs, majoration, surveillance médicale renforcée.",
"conseils": [
"Vérifiez votre qualification de travailleur de nuit",
"La surveillance médicale est tous les 6 mois (non tous les 2 ans)",
"Les heures de nuit régulières nécessitent un accord collectif"
],
"refs": [
"Art. L3122-1 C. trav. — Définition travail de nuit",
"Art. L3122-9 — Durée max 8h/nuit"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 626,
"fat": 3,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Travail de nuit — protections renforcées",
"message": "Le travail de nuit (21h-6h) ouvre des droits spécifiques : repos compensateurs, majoration, surveillance médicale renforcée.",
"conseils": [
"Vérifiez votre qualification de travailleur de nuit",
"La surveillance médicale est tous les 6 mois (non tous les 2 ans)",
"Les heures de nuit régulières nécessitent un accord collectif"
],
"refs": [
"Art. L3122-1 C. trav. — Définition travail de nuit",
"Art. L3122-9 — Durée max 8h/nuit"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 627,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Travail de nuit — protections renforcées",
"message": "Le travail de nuit (21h-6h) ouvre des droits spécifiques : repos compensateurs, majoration, surveillance médicale renforcée.",
"conseils": [
"Vérifiez votre qualification de travailleur de nuit",
"La surveillance médicale est tous les 6 mois (non tous les 2 ans)",
"Les heures de nuit régulières nécessitent un accord collectif"
],
"refs": [
"Art. L3122-1 C. trav. — Définition travail de nuit",
"Art. L3122-9 — Durée max 8h/nuit"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 628,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Optimiser la récupération en 48h",
"message": "Protocole de récupération rapide : la science du sommeil montre qu'il faut environ 10h de sommeil les 2 premières nuits après une période de surcharge.",
"conseils": [
"Soir 1 : couchez-vous dès 21h30, pas d'écran",
"Matin 1 : réveil naturel sans alarme si possible",
"Evitez l'alcool et la caféine après 14h pendant la récupération"
],
"refs": [],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 629,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Optimiser la récupération en 48h",
"message": "Protocole de récupération rapide : la science du sommeil montre qu'il faut environ 10h de sommeil les 2 premières nuits après une période de surcharge.",
"conseils": [
"Soir 1 : couchez-vous dès 21h30, pas d'écran",
"Matin 1 : réveil naturel sans alarme si possible",
"Evitez l'alcool et la caféine après 14h pendant la récupération"
],
"refs": [],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 630,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Optimiser la récupération en 48h",
"message": "Protocole de récupération rapide : la science du sommeil montre qu'il faut environ 10h de sommeil les 2 premières nuits après une période de surcharge.",
"conseils": [
"Soir 1 : couchez-vous dès 21h30, pas d'écran",
"Matin 1 : réveil naturel sans alarme si possible",
"Evitez l'alcool et la caféine après 14h pendant la récupération"
],
"refs": [],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 631,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Optimiser la récupération en 48h",
"message": "Protocole de récupération rapide : la science du sommeil montre qu'il faut environ 10h de sommeil les 2 premières nuits après une période de surcharge.",
"conseils": [
"Soir 1 : couchez-vous dès 21h30, pas d'écran",
"Matin 1 : réveil naturel sans alarme si possible",
"Evitez l'alcool et la caféine après 14h pendant la récupération"
],
"refs": [],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 632,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Optimiser la récupération en 48h",
"message": "Protocole de récupération rapide : la science du sommeil montre qu'il faut environ 10h de sommeil les 2 premières nuits après une période de surcharge.",
"conseils": [
"Soir 1 : couchez-vous dès 21h30, pas d'écran",
"Matin 1 : réveil naturel sans alarme si possible",
"Evitez l'alcool et la caféine après 14h pendant la récupération"
],
"refs": [],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 633,
"fat": 2,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Récupération après une semaine intensive",
"message": "Après une semaine à +50h, la récupération complète prend en moyenne 5 à 7 jours. Les 2 premiers jours de repos sont les plus importants.",
"conseils": [
"Dormez 9h les 2 premières nuits",
"Alimentation riche en magnésium (amandes, épinards, chocolat noir)",
"Activité physique légère (marche, stretching) dès le 3ème jour"
],
"refs": [],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 634,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Récupération après une semaine intensive",
"message": "Après une semaine à +50h, la récupération complète prend en moyenne 5 à 7 jours. Les 2 premiers jours de repos sont les plus importants.",
"conseils": [
"Dormez 9h les 2 premières nuits",
"Alimentation riche en magnésium (amandes, épinards, chocolat noir)",
"Activité physique légère (marche, stretching) dès le 3ème jour"
],
"refs": [],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 635,
"fat": 0,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Récupération après une semaine intensive",
"message": "Après une semaine à +50h, la récupération complète prend en moyenne 5 à 7 jours. Les 2 premiers jours de repos sont les plus importants.",
"conseils": [
"Dormez 9h les 2 premières nuits",
"Alimentation riche en magnésium (amandes, épinards, chocolat noir)",
"Activité physique légère (marche, stretching) dès le 3ème jour"
],
"refs": [],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 636,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Récupération après une semaine intensive",
"message": "Après une semaine à +50h, la récupération complète prend en moyenne 5 à 7 jours. Les 2 premiers jours de repos sont les plus importants.",
"conseils": [
"Dormez 9h les 2 premières nuits",
"Alimentation riche en magnésium (amandes, épinards, chocolat noir)",
"Activité physique légère (marche, stretching) dès le 3ème jour"
],
"refs": [],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 637,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Récupération après une semaine intensive",
"message": "Après une semaine à +50h, la récupération complète prend en moyenne 5 à 7 jours. Les 2 premiers jours de repos sont les plus importants.",
"conseils": [
"Dormez 9h les 2 premières nuits",
"Alimentation riche en magnésium (amandes, épinards, chocolat noir)",
"Activité physique légère (marche, stretching) dès le 3ème jour"
],
"refs": [],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 638,
"fat": 3,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Micro-récupérations dans la journée",
"message": "Des pauses de 5-10 minutes toutes les 90 minutes sont scientifiquement prouvées pour maintenir la performance cognitive tout au long de la journée.",
"conseils": [
"Appliquez la méthode Pomodoro (25min travail / 5min pause)",
"Regardez au loin pendant les pauses (réduction fatigue visuelle)",
"Une courte marche de 5 min vaut mieux qu'une pause écran"
],
"refs": [
"Art. L3121-16 C. trav. — Pause 20min obligatoire après 6h"
],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 639,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Micro-récupérations dans la journée",
"message": "Des pauses de 5-10 minutes toutes les 90 minutes sont scientifiquement prouvées pour maintenir la performance cognitive tout au long de la journée.",
"conseils": [
"Appliquez la méthode Pomodoro (25min travail / 5min pause)",
"Regardez au loin pendant les pauses (réduction fatigue visuelle)",
"Une courte marche de 5 min vaut mieux qu'une pause écran"
],
"refs": [
"Art. L3121-16 C. trav. — Pause 20min obligatoire après 6h"
],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 640,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Micro-récupérations dans la journée",
"message": "Des pauses de 5-10 minutes toutes les 90 minutes sont scientifiquement prouvées pour maintenir la performance cognitive tout au long de la journée.",
"conseils": [
"Appliquez la méthode Pomodoro (25min travail / 5min pause)",
"Regardez au loin pendant les pauses (réduction fatigue visuelle)",
"Une courte marche de 5 min vaut mieux qu'une pause écran"
],
"refs": [
"Art. L3121-16 C. trav. — Pause 20min obligatoire après 6h"
],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 641,
"fat": 2,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Micro-récupérations dans la journée",
"message": "Des pauses de 5-10 minutes toutes les 90 minutes sont scientifiquement prouvées pour maintenir la performance cognitive tout au long de la journée.",
"conseils": [
"Appliquez la méthode Pomodoro (25min travail / 5min pause)",
"Regardez au loin pendant les pauses (réduction fatigue visuelle)",
"Une courte marche de 5 min vaut mieux qu'une pause écran"
],
"refs": [
"Art. L3121-16 C. trav. — Pause 20min obligatoire après 6h"
],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 642,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Micro-récupérations dans la journée",
"message": "Des pauses de 5-10 minutes toutes les 90 minutes sont scientifiquement prouvées pour maintenir la performance cognitive tout au long de la journée.",
"conseils": [
"Appliquez la méthode Pomodoro (25min travail / 5min pause)",
"Regardez au loin pendant les pauses (réduction fatigue visuelle)",
"Une courte marche de 5 min vaut mieux qu'une pause écran"
],
"refs": [
"Art. L3121-16 C. trav. — Pause 20min obligatoire après 6h"
],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 643,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Contingent annuel : calcul précis",
"message": "Le contingent conventionnel est souvent de 220h/an (légal), mais votre convention collective peut le modifier. Il se calcule par année civile.",
"conseils": [
"Vérifiez votre contingent conventionnel spécifique",
"Au-delà : repos compensateur obligatoire de 100%",
"L'employeur peut dépasser avec accord de l\'inspecteur"
],
"refs": [
"Art. L3121-33 C. trav. — Contingent annuel",
"Art. L3121-38 — Taux RCO 100%"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 644,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Contingent annuel : calcul précis",
"message": "Le contingent conventionnel est souvent de 220h/an (légal), mais votre convention collective peut le modifier. Il se calcule par année civile.",
"conseils": [
"Vérifiez votre contingent conventionnel spécifique",
"Au-delà : repos compensateur obligatoire de 100%",
"L'employeur peut dépasser avec accord de l\'inspecteur"
],
"refs": [
"Art. L3121-33 C. trav. — Contingent annuel",
"Art. L3121-38 — Taux RCO 100%"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 645,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Contingent annuel : calcul précis",
"message": "Le contingent conventionnel est souvent de 220h/an (légal), mais votre convention collective peut le modifier. Il se calcule par année civile.",
"conseils": [
"Vérifiez votre contingent conventionnel spécifique",
"Au-delà : repos compensateur obligatoire de 100%",
"L'employeur peut dépasser avec accord de l\'inspecteur"
],
"refs": [
"Art. L3121-33 C. trav. — Contingent annuel",
"Art. L3121-38 — Taux RCO 100%"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 646,
"fat": 3,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Contingent annuel : calcul précis",
"message": "Le contingent conventionnel est souvent de 220h/an (légal), mais votre convention collective peut le modifier. Il se calcule par année civile.",
"conseils": [
"Vérifiez votre contingent conventionnel spécifique",
"Au-delà : repos compensateur obligatoire de 100%",
"L'employeur peut dépasser avec accord de l\'inspecteur"
],
"refs": [
"Art. L3121-33 C. trav. — Contingent annuel",
"Art. L3121-38 — Taux RCO 100%"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 647,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Contingent annuel : calcul précis",
"message": "Le contingent conventionnel est souvent de 220h/an (légal), mais votre convention collective peut le modifier. Il se calcule par année civile.",
"conseils": [
"Vérifiez votre contingent conventionnel spécifique",
"Au-delà : repos compensateur obligatoire de 100%",
"L'employeur peut dépasser avec accord de l\'inspecteur"
],
"refs": [
"Art. L3121-33 C. trav. — Contingent annuel",
"Art. L3121-38 — Taux RCO 100%"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 648,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Repos compensateur obligatoire (RCO)",
"message": "Chaque heure effectuée au-delà du contingent annuel ouvre droit à 1h de repos compensateur obligatoire (= repos = rémunération maintenue).",
"conseils": [
"Le RCO doit être pris dans les 2 mois suivant l'ouverture du droit",
"Vous devez en faire la demande à l\'employeur",
"L'employeur ne peut pas refuser sans motif valable"
],
"refs": [
"Art. L3121-33 C. trav.",
"Art. D3121-18 — Délai 2 mois pour prendre le RCO"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 649,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Repos compensateur obligatoire (RCO)",
"message": "Chaque heure effectuée au-delà du contingent annuel ouvre droit à 1h de repos compensateur obligatoire (= repos = rémunération maintenue).",
"conseils": [
"Le RCO doit être pris dans les 2 mois suivant l'ouverture du droit",
"Vous devez en faire la demande à l\'employeur",
"L'employeur ne peut pas refuser sans motif valable"
],
"refs": [
"Art. L3121-33 C. trav.",
"Art. D3121-18 — Délai 2 mois pour prendre le RCO"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 650,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Repos compensateur obligatoire (RCO)",
"message": "Chaque heure effectuée au-delà du contingent annuel ouvre droit à 1h de repos compensateur obligatoire (= repos = rémunération maintenue).",
"conseils": [
"Le RCO doit être pris dans les 2 mois suivant l'ouverture du droit",
"Vous devez en faire la demande à l\'employeur",
"L'employeur ne peut pas refuser sans motif valable"
],
"refs": [
"Art. L3121-33 C. trav.",
"Art. D3121-18 — Délai 2 mois pour prendre le RCO"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 651,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Repos compensateur obligatoire (RCO)",
"message": "Chaque heure effectuée au-delà du contingent annuel ouvre droit à 1h de repos compensateur obligatoire (= repos = rémunération maintenue).",
"conseils": [
"Le RCO doit être pris dans les 2 mois suivant l'ouverture du droit",
"Vous devez en faire la demande à l\'employeur",
"L'employeur ne peut pas refuser sans motif valable"
],
"refs": [
"Art. L3121-33 C. trav.",
"Art. D3121-18 — Délai 2 mois pour prendre le RCO"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 652,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Repos compensateur obligatoire (RCO)",
"message": "Chaque heure effectuée au-delà du contingent annuel ouvre droit à 1h de repos compensateur obligatoire (= repos = rémunération maintenue).",
"conseils": [
"Le RCO doit être pris dans les 2 mois suivant l'ouverture du droit",
"Vous devez en faire la demande à l\'employeur",
"L'employeur ne peut pas refuser sans motif valable"
],
"refs": [
"Art. L3121-33 C. trav.",
"Art. D3121-18 — Délai 2 mois pour prendre le RCO"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 653,
"fat": 2,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Plan de prévention personnalisé",
"message": "Une démarche de prévention efficace repose sur 3 piliers : mesure régulière (comme ce module), action rapide aux premiers signaux, dialogue avec l\'employeur.",
"conseils": [
"Faites un check-in quotidien pour affiner vos prédictions",
"Fixez-vous un seuil personnel d'alerte (ex: 60 de fatigue)",
"Partagez ce rapport avec votre médecin du travail"
],
"refs": [
"Art. L4121-2 C. trav. — Principes généraux de prévention"
],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 654,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Plan de prévention personnalisé",
"message": "Une démarche de prévention efficace repose sur 3 piliers : mesure régulière (comme ce module), action rapide aux premiers signaux, dialogue avec l\'employeur.",
"conseils": [
"Faites un check-in quotidien pour affiner vos prédictions",
"Fixez-vous un seuil personnel d'alerte (ex: 60 de fatigue)",
"Partagez ce rapport avec votre médecin du travail"
],
"refs": [
"Art. L4121-2 C. trav. — Principes généraux de prévention"
],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 655,
"fat": 0,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Plan de prévention personnalisé",
"message": "Une démarche de prévention efficace repose sur 3 piliers : mesure régulière (comme ce module), action rapide aux premiers signaux, dialogue avec l\'employeur.",
"conseils": [
"Faites un check-in quotidien pour affiner vos prédictions",
"Fixez-vous un seuil personnel d'alerte (ex: 60 de fatigue)",
"Partagez ce rapport avec votre médecin du travail"
],
"refs": [
"Art. L4121-2 C. trav. — Principes généraux de prévention"
],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 656,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Plan de prévention personnalisé",
"message": "Une démarche de prévention efficace repose sur 3 piliers : mesure régulière (comme ce module), action rapide aux premiers signaux, dialogue avec l\'employeur.",
"conseils": [
"Faites un check-in quotidien pour affiner vos prédictions",
"Fixez-vous un seuil personnel d'alerte (ex: 60 de fatigue)",
"Partagez ce rapport avec votre médecin du travail"
],
"refs": [
"Art. L4121-2 C. trav. — Principes généraux de prévention"
],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 657,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Plan de prévention personnalisé",
"message": "Une démarche de prévention efficace repose sur 3 piliers : mesure régulière (comme ce module), action rapide aux premiers signaux, dialogue avec l\'employeur.",
"conseils": [
"Faites un check-in quotidien pour affiner vos prédictions",
"Fixez-vous un seuil personnel d'alerte (ex: 60 de fatigue)",
"Partagez ce rapport avec votre médecin du travail"
],
"refs": [
"Art. L4121-2 C. trav. — Principes généraux de prévention"
],
"urgence": 0,
"question": "Question spécifique"
},
{
"id": 658,
"fat": 3,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Négociation de la charge de travail",
"message": "La charge de travail est négociable. L'employeur a l\'obligation de l\'adapter aux capacités du salarié.",
"conseils": [
"Demandez un entretien formel sur la charge",
"Apportez des données chiffrées (heures réelles vs contrat)",
"Proposez des solutions concrètes (priorisation, délégation, ressources)"
],
"refs": [
"Art. L4121-1 C. trav. — Adaptation du travail à l'homme"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 659,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Négociation de la charge de travail",
"message": "La charge de travail est négociable. L'employeur a l\'obligation de l\'adapter aux capacités du salarié.",
"conseils": [
"Demandez un entretien formel sur la charge",
"Apportez des données chiffrées (heures réelles vs contrat)",
"Proposez des solutions concrètes (priorisation, délégation, ressources)"
],
"refs": [
"Art. L4121-1 C. trav. — Adaptation du travail à l'homme"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 660,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Négociation de la charge de travail",
"message": "La charge de travail est négociable. L'employeur a l\'obligation de l\'adapter aux capacités du salarié.",
"conseils": [
"Demandez un entretien formel sur la charge",
"Apportez des données chiffrées (heures réelles vs contrat)",
"Proposez des solutions concrètes (priorisation, délégation, ressources)"
],
"refs": [
"Art. L4121-1 C. trav. — Adaptation du travail à l'homme"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 661,
"fat": 2,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Négociation de la charge de travail",
"message": "La charge de travail est négociable. L'employeur a l\'obligation de l\'adapter aux capacités du salarié.",
"conseils": [
"Demandez un entretien formel sur la charge",
"Apportez des données chiffrées (heures réelles vs contrat)",
"Proposez des solutions concrètes (priorisation, délégation, ressources)"
],
"refs": [
"Art. L4121-1 C. trav. — Adaptation du travail à l'homme"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 662,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Négociation de la charge de travail",
"message": "La charge de travail est négociable. L'employeur a l\'obligation de l\'adapter aux capacités du salarié.",
"conseils": [
"Demandez un entretien formel sur la charge",
"Apportez des données chiffrées (heures réelles vs contrat)",
"Proposez des solutions concrètes (priorisation, délégation, ressources)"
],
"refs": [
"Art. L4121-1 C. trav. — Adaptation du travail à l'homme"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 663,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Harcèlement moral — signes et recours",
"message": "Des pressions répétées liées à la surcharge de travail peuvent constituer du harcèlement moral si elles visent à dégrader les conditions de travail.",
"conseils": [
"Documentez chaque incident (date, faits, témoins)",
"Signalez au CSE ou aux RH",
"Saisissez le Défenseur des droits si aucune action n'est prise"
],
"refs": [
"Art. L1152-1 C. trav. — Définition harcèlement moral",
"Art. L1152-3 — Nullité des sanctions"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 664,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Harcèlement moral — signes et recours",
"message": "Des pressions répétées liées à la surcharge de travail peuvent constituer du harcèlement moral si elles visent à dégrader les conditions de travail.",
"conseils": [
"Documentez chaque incident (date, faits, témoins)",
"Signalez au CSE ou aux RH",
"Saisissez le Défenseur des droits si aucune action n'est prise"
],
"refs": [
"Art. L1152-1 C. trav. — Définition harcèlement moral",
"Art. L1152-3 — Nullité des sanctions"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 665,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Harcèlement moral — signes et recours",
"message": "Des pressions répétées liées à la surcharge de travail peuvent constituer du harcèlement moral si elles visent à dégrader les conditions de travail.",
"conseils": [
"Documentez chaque incident (date, faits, témoins)",
"Signalez au CSE ou aux RH",
"Saisissez le Défenseur des droits si aucune action n'est prise"
],
"refs": [
"Art. L1152-1 C. trav. — Définition harcèlement moral",
"Art. L1152-3 — Nullité des sanctions"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 666,
"fat": 3,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Harcèlement moral — signes et recours",
"message": "Des pressions répétées liées à la surcharge de travail peuvent constituer du harcèlement moral si elles visent à dégrader les conditions de travail.",
"conseils": [
"Documentez chaque incident (date, faits, témoins)",
"Signalez au CSE ou aux RH",
"Saisissez le Défenseur des droits si aucune action n'est prise"
],
"refs": [
"Art. L1152-1 C. trav. — Définition harcèlement moral",
"Art. L1152-3 — Nullité des sanctions"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 667,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Harcèlement moral — signes et recours",
"message": "Des pressions répétées liées à la surcharge de travail peuvent constituer du harcèlement moral si elles visent à dégrader les conditions de travail.",
"conseils": [
"Documentez chaque incident (date, faits, témoins)",
"Signalez au CSE ou aux RH",
"Saisissez le Défenseur des droits si aucune action n'est prise"
],
"refs": [
"Art. L1152-1 C. trav. — Définition harcèlement moral",
"Art. L1152-3 — Nullité des sanctions"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 668,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Risques psychosociaux — signalement",
"message": "Les RPS (stress, burn-out, harcèlement) doivent figurer dans le Document Unique d'Évaluation des Risques Professionnels (DUERP) de votre entreprise.",
"conseils": [
"Demandez à consulter le DUERP (accessible à tous les salariés)",
"Si vos RPS n'y figurent pas, signalez au CSE",
"Le DUERP doit être mis à jour chaque année"
],
"refs": [
"Art. R4121-1 C. trav. — DUERP obligatoire",
"Art. L4121-3 — Mise à jour annuelle"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 669,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Risques psychosociaux — signalement",
"message": "Les RPS (stress, burn-out, harcèlement) doivent figurer dans le Document Unique d'Évaluation des Risques Professionnels (DUERP) de votre entreprise.",
"conseils": [
"Demandez à consulter le DUERP (accessible à tous les salariés)",
"Si vos RPS n'y figurent pas, signalez au CSE",
"Le DUERP doit être mis à jour chaque année"
],
"refs": [
"Art. R4121-1 C. trav. — DUERP obligatoire",
"Art. L4121-3 — Mise à jour annuelle"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 670,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Risques psychosociaux — signalement",
"message": "Les RPS (stress, burn-out, harcèlement) doivent figurer dans le Document Unique d'Évaluation des Risques Professionnels (DUERP) de votre entreprise.",
"conseils": [
"Demandez à consulter le DUERP (accessible à tous les salariés)",
"Si vos RPS n'y figurent pas, signalez au CSE",
"Le DUERP doit être mis à jour chaque année"
],
"refs": [
"Art. R4121-1 C. trav. — DUERP obligatoire",
"Art. L4121-3 — Mise à jour annuelle"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 671,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Risques psychosociaux — signalement",
"message": "Les RPS (stress, burn-out, harcèlement) doivent figurer dans le Document Unique d'Évaluation des Risques Professionnels (DUERP) de votre entreprise.",
"conseils": [
"Demandez à consulter le DUERP (accessible à tous les salariés)",
"Si vos RPS n'y figurent pas, signalez au CSE",
"Le DUERP doit être mis à jour chaque année"
],
"refs": [
"Art. R4121-1 C. trav. — DUERP obligatoire",
"Art. L4121-3 — Mise à jour annuelle"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 672,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Risques psychosociaux — signalement",
"message": "Les RPS (stress, burn-out, harcèlement) doivent figurer dans le Document Unique d'Évaluation des Risques Professionnels (DUERP) de votre entreprise.",
"conseils": [
"Demandez à consulter le DUERP (accessible à tous les salariés)",
"Si vos RPS n'y figurent pas, signalez au CSE",
"Le DUERP doit être mis à jour chaque année"
],
"refs": [
"Art. R4121-1 C. trav. — DUERP obligatoire",
"Art. L4121-3 — Mise à jour annuelle"
],
"urgence": 2,
"question": "Question spécifique"
},
{
"id": 673,
"fat": 2,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Planification optimale sur 4 semaines",
"message": "La modulation du temps de travail sur 4 semaines permet de lisser les pics. Vos HS de semaines chargées peuvent être compensées par des semaines légères.",
"conseils": [
"Calculez votre moyenne horaire sur les 4 dernières semaines",
"Identifiez les semaines futures creuses pour récupérer",
"Négociez une planification prévisionnelle formelle"
],
"refs": [
"Art. L3121-41 C. trav. — Accord de modulation"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 674,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Planification optimale sur 4 semaines",
"message": "La modulation du temps de travail sur 4 semaines permet de lisser les pics. Vos HS de semaines chargées peuvent être compensées par des semaines légères.",
"conseils": [
"Calculez votre moyenne horaire sur les 4 dernières semaines",
"Identifiez les semaines futures creuses pour récupérer",
"Négociez une planification prévisionnelle formelle"
],
"refs": [
"Art. L3121-41 C. trav. — Accord de modulation"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 675,
"fat": 0,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Planification optimale sur 4 semaines",
"message": "La modulation du temps de travail sur 4 semaines permet de lisser les pics. Vos HS de semaines chargées peuvent être compensées par des semaines légères.",
"conseils": [
"Calculez votre moyenne horaire sur les 4 dernières semaines",
"Identifiez les semaines futures creuses pour récupérer",
"Négociez une planification prévisionnelle formelle"
],
"refs": [
"Art. L3121-41 C. trav. — Accord de modulation"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 676,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Planification optimale sur 4 semaines",
"message": "La modulation du temps de travail sur 4 semaines permet de lisser les pics. Vos HS de semaines chargées peuvent être compensées par des semaines légères.",
"conseils": [
"Calculez votre moyenne horaire sur les 4 dernières semaines",
"Identifiez les semaines futures creuses pour récupérer",
"Négociez une planification prévisionnelle formelle"
],
"refs": [
"Art. L3121-41 C. trav. — Accord de modulation"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 677,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Planification optimale sur 4 semaines",
"message": "La modulation du temps de travail sur 4 semaines permet de lisser les pics. Vos HS de semaines chargées peuvent être compensées par des semaines légères.",
"conseils": [
"Calculez votre moyenne horaire sur les 4 dernières semaines",
"Identifiez les semaines futures creuses pour récupérer",
"Négociez une planification prévisionnelle formelle"
],
"refs": [
"Art. L3121-41 C. trav. — Accord de modulation"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 678,
"fat": 3,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 1,
"titre": "Télétravail et temps de travail",
"message": "En télétravail, les mêmes règles de durée du travail s'appliquent. L\'employeur doit s\'assurer que le salarié respecte les temps de repos.",
"conseils": [
"Installez une plage horaire fixe et respectez-la",
"Déconnectez-vous physiquement à l'heure de fin",
"L'employeur doit mettre en place un outil de suivi"
],
"refs": [
"Art. L1222-9 C. trav. — Télétravail",
"Art. L2242-17 — Droit à la déconnexion"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 679,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 2,
"titre": "Télétravail et temps de travail",
"message": "En télétravail, les mêmes règles de durée du travail s'appliquent. L\'employeur doit s\'assurer que le salarié respecte les temps de repos.",
"conseils": [
"Installez une plage horaire fixe et respectez-la",
"Déconnectez-vous physiquement à l'heure de fin",
"L'employeur doit mettre en place un outil de suivi"
],
"refs": [
"Art. L1222-9 C. trav. — Télétravail",
"Art. L2242-17 — Droit à la déconnexion"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 680,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 3,
"titre": "Télétravail et temps de travail",
"message": "En télétravail, les mêmes règles de durée du travail s'appliquent. L\'employeur doit s\'assurer que le salarié respecte les temps de repos.",
"conseils": [
"Installez une plage horaire fixe et respectez-la",
"Déconnectez-vous physiquement à l'heure de fin",
"L'employeur doit mettre en place un outil de suivi"
],
"refs": [
"Art. L1222-9 C. trav. — Télétravail",
"Art. L2242-17 — Droit à la déconnexion"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 681,
"fat": 2,
"stress": 0,
"consec": 0,
"contingent": 3,
"perf": 0,
"titre": "Télétravail et temps de travail",
"message": "En télétravail, les mêmes règles de durée du travail s'appliquent. L\'employeur doit s\'assurer que le salarié respecte les temps de repos.",
"conseils": [
"Installez une plage horaire fixe et respectez-la",
"Déconnectez-vous physiquement à l'heure de fin",
"L'employeur doit mettre en place un outil de suivi"
],
"refs": [
"Art. L1222-9 C. trav. — Télétravail",
"Art. L2242-17 — Droit à la déconnexion"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 682,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 0,
"perf": 1,
"titre": "Télétravail et temps de travail",
"message": "En télétravail, les mêmes règles de durée du travail s'appliquent. L\'employeur doit s\'assurer que le salarié respecte les temps de repos.",
"conseils": [
"Installez une plage horaire fixe et respectez-la",
"Déconnectez-vous physiquement à l'heure de fin",
"L'employeur doit mettre en place un outil de suivi"
],
"refs": [
"Art. L1222-9 C. trav. — Télétravail",
"Art. L2242-17 — Droit à la déconnexion"
],
"urgence": 1,
"question": "Question spécifique"
},
{
"id": 683,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 684,
"fat": 4,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 685,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 686,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 687,
"fat": 2,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 688,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 689,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 690,
"fat": 0,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 691,
"fat": 1,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 692,
"fat": 2,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 693,
"fat": 3,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 694,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 695,
"fat": 0,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 696,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 697,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 698,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 699,
"fat": 4,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 700,
"fat": 0,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 701,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 702,
"fat": 2,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 703,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 704,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 705,
"fat": 0,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 706,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 707,
"fat": 2,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 708,
"fat": 3,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 709,
"fat": 4,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 710,
"fat": 0,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 711,
"fat": 1,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 712,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 713,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 714,
"fat": 4,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 715,
"fat": 0,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 716,
"fat": 1,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 717,
"fat": 2,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 718,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 719,
"fat": 4,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 720,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 721,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 722,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 723,
"fat": 3,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 724,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 725,
"fat": 0,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 726,
"fat": 1,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 727,
"fat": 2,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 728,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 729,
"fat": 4,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 730,
"fat": 0,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 731,
"fat": 1,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 732,
"fat": 2,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 733,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 734,
"fat": 4,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 735,
"fat": 0,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 736,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 737,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 738,
"fat": 3,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 739,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 740,
"fat": 0,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 741,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 742,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 743,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 744,
"fat": 4,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 745,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 746,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 747,
"fat": 2,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 748,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 749,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 750,
"fat": 0,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 751,
"fat": 1,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 752,
"fat": 2,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 753,
"fat": 3,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 754,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 755,
"fat": 0,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 756,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 757,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 758,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 759,
"fat": 4,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 760,
"fat": 0,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 761,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 762,
"fat": 2,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 763,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 764,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 765,
"fat": 0,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 766,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 767,
"fat": 2,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 768,
"fat": 3,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 769,
"fat": 4,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 770,
"fat": 0,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 771,
"fat": 1,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 772,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 773,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 774,
"fat": 4,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 775,
"fat": 0,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 776,
"fat": 1,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 777,
"fat": 2,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 778,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 779,
"fat": 4,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 780,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 781,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 782,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 783,
"fat": 3,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 784,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 785,
"fat": 0,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 786,
"fat": 1,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 787,
"fat": 2,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 788,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 789,
"fat": 4,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 790,
"fat": 0,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 791,
"fat": 1,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 792,
"fat": 2,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 793,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 794,
"fat": 4,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 795,
"fat": 0,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 796,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 797,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 798,
"fat": 3,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 799,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 800,
"fat": 0,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 801,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 802,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 803,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 804,
"fat": 4,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 805,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 806,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 807,
"fat": 2,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 808,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 809,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 810,
"fat": 0,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 811,
"fat": 1,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 812,
"fat": 2,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 813,
"fat": 3,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 814,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 815,
"fat": 0,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 816,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 817,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 818,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 819,
"fat": 4,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 820,
"fat": 0,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 821,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 822,
"fat": 2,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 823,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 824,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 825,
"fat": 0,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 826,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 827,
"fat": 2,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 828,
"fat": 3,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 829,
"fat": 4,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 830,
"fat": 0,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 831,
"fat": 1,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 832,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 833,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 834,
"fat": 4,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 835,
"fat": 0,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 836,
"fat": 1,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 837,
"fat": 2,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 838,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 839,
"fat": 4,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 840,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 841,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 842,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 843,
"fat": 3,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 844,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 845,
"fat": 0,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 846,
"fat": 1,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 847,
"fat": 2,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 848,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 849,
"fat": 4,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 850,
"fat": 0,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 851,
"fat": 1,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 852,
"fat": 2,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 853,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 854,
"fat": 4,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 855,
"fat": 0,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 856,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 857,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 858,
"fat": 3,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 859,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 860,
"fat": 0,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 861,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 862,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 863,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 864,
"fat": 4,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 865,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 866,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 867,
"fat": 2,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 868,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 869,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 870,
"fat": 0,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 871,
"fat": 1,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 872,
"fat": 2,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 873,
"fat": 3,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 874,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 875,
"fat": 0,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 876,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 877,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 878,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 879,
"fat": 4,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 880,
"fat": 0,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 881,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 882,
"fat": 2,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 883,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 884,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 885,
"fat": 0,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 886,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 887,
"fat": 2,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 888,
"fat": 3,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 889,
"fat": 4,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 890,
"fat": 0,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 891,
"fat": 1,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 892,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 893,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 894,
"fat": 4,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 895,
"fat": 0,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 896,
"fat": 1,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 897,
"fat": 2,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 898,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 899,
"fat": 4,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 900,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 901,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 902,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 903,
"fat": 3,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 904,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 905,
"fat": 0,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 906,
"fat": 1,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 907,
"fat": 2,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 908,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 909,
"fat": 4,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 910,
"fat": 0,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 911,
"fat": 1,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 912,
"fat": 2,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 913,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 914,
"fat": 4,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 915,
"fat": 0,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 916,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 917,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 918,
"fat": 3,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 919,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 920,
"fat": 0,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 921,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 922,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 923,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 924,
"fat": 4,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 925,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 926,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 927,
"fat": 2,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 928,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 929,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 930,
"fat": 0,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 931,
"fat": 1,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 932,
"fat": 2,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 933,
"fat": 3,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 934,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 935,
"fat": 0,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 936,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 937,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 938,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 939,
"fat": 4,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 940,
"fat": 0,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 941,
"fat": 1,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 942,
"fat": 2,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 943,
"fat": 3,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 944,
"fat": 4,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 945,
"fat": 0,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 946,
"fat": 1,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 947,
"fat": 2,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 948,
"fat": 3,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 949,
"fat": 4,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 950,
"fat": 0,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 951,
"fat": 1,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 952,
"fat": 2,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 953,
"fat": 3,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 954,
"fat": 4,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 955,
"fat": 0,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 956,
"fat": 1,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 957,
"fat": 2,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 958,
"fat": 3,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 959,
"fat": 4,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 960,
"fat": 0,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 961,
"fat": 1,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 962,
"fat": 2,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 963,
"fat": 3,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 964,
"fat": 4,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 965,
"fat": 0,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 966,
"fat": 1,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 967,
"fat": 2,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 968,
"fat": 3,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 969,
"fat": 4,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 970,
"fat": 0,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 971,
"fat": 1,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 972,
"fat": 2,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 973,
"fat": 3,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 974,
"fat": 4,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 975,
"fat": 0,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 976,
"fat": 1,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 977,
"fat": 2,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 978,
"fat": 3,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 979,
"fat": 4,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 980,
"fat": 0,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 981,
"fat": 1,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 982,
"fat": 2,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 983,
"fat": 3,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 984,
"fat": 4,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 985,
"fat": 0,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 986,
"fat": 1,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 987,
"fat": 2,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 988,
"fat": 3,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 989,
"fat": 4,
"stress": 2,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 990,
"fat": 0,
"stress": 0,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 991,
"fat": 1,
"stress": 1,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 992,
"fat": 2,
"stress": 2,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 993,
"fat": 3,
"stress": 0,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 994,
"fat": 4,
"stress": 1,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 995,
"fat": 0,
"stress": 2,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 996,
"fat": 1,
"stress": 0,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 997,
"fat": 2,
"stress": 1,
"consec": 1,
"contingent": 1,
"perf": 1,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
},
{
"id": 998,
"fat": 3,
"stress": 2,
"consec": 2,
"contingent": 2,
"perf": 2,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 2,
"question": "Conseil général"
},
{
"id": 999,
"fat": 4,
"stress": 0,
"consec": 3,
"contingent": 3,
"perf": 3,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 0,
"question": "Conseil général"
},
{
"id": 1000,
"fat": 0,
"stress": 1,
"consec": 0,
"contingent": 0,
"perf": 0,
"titre": "Conseil de prévention",
"message": "Continuez à surveiller vos indicateurs régulièrement. La prévention est la meilleure protection.",
"conseils": [
"Faites un check-in quotidien",
"Respectez vos temps de repos",
"Communiquez votre charge à votre employeur"
],
"refs": [
"Art. L4121-1 C. trav."
],
"urgence": 1,
"question": "Conseil général"
}
];

/**
 * Moteur de matching local
 * Trouve le scénario le plus pertinent selon l'état actuel
 */
class ScenarioAdvisor {
  constructor() {
    this._db = DTE_SCENARIOS;
  }

  // Retourne des mots-clés sectoriels selon la CCN active
  _getCCNSectorKeywords() {
    if (typeof CCN_API === 'undefined') return [];
    const idcc = parseInt((typeof localStorage !== 'undefined' && localStorage.getItem('CCN_IDCC')) || '0');
    const rules = CCN_API.getGroupeForCCN(idcc);
    if (!rules) return [];
    const groupe = rules.groupeId || '';
    const nom = (localStorage.getItem('CCN_NOM') || '').toLowerCase();
    const kw = [];
    if (groupe === 'HCR'   || nom.includes('hôtel') || nom.includes('restaurant') || nom.includes('café'))
      kw.push('service','horaires décalés','nuit','week-end');
    if (groupe === 'IAA180'|| nom.includes('btp') || nom.includes('bâtiment') || nom.includes('travaux'))
      kw.push('chantier','intempéries','physique','effort');
    if (nom.includes('transport') || nom.includes('logistique') || nom.includes('conduite'))
      kw.push('conduite','transport','logistique','amplitude');
    if (nom.includes('santé') || nom.includes('médical') || nom.includes('hôpital') || nom.includes('soin'))
      kw.push('garde','astreinte','nuit','stress');
    if (groupe === 'CHIM130'|| nom.includes('chimie') || nom.includes('pharmacie'))
      kw.push('exposition','risque chimique','concentration');
    if (nom.includes('syntec') || nom.includes('informatique') || nom.includes('numérique'))
      kw.push('télétravail','forfait','présentéisme','autonomie');
    return kw;
  }

  /**
   * Retourne les N meilleurs scénarios pour l'état donné
   * @param {scores, norm} state - État du Digital Twin
   * @param {number} n - Nombre de résultats
   */
  match(state, n = 5) {
    if (!state || !state.scores) return [];
    const { scores, norm } = state;
    const fatBucket = this._fatBucket(scores.fatigue);
    const strBucket = this._strBucket(scores.stress);
    const conscBucket = this._consecBucket(norm._consec || 0);
    const contBucket = this._contBucket(norm._contingentPct || 0);
    const perfBucket = this._perfBucket(scores.performance);
    const sectorKw = this._getCCNSectorKeywords();
    const normTxt = t => (t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

    const scored = this._db.map(s => {
      let score = 0;
      // Fat match pèse 40%
      const fatDiff = Math.abs(s.fat - fatBucket);
      score += (3 - fatDiff) * 4;
      // Stress match 25%
      score += (3 - Math.abs(s.stress - strBucket)) * 2.5;
      // Consec match 15%
      score += (3 - Math.abs(s.consec - conscBucket)) * 1.5;
      // Contingent 10%
      score += (3 - Math.abs(s.contingent - contBucket)) * 1;
      // Perf match 10%
      score += (3 - Math.abs(s.perf - perfBucket)) * 1;
      // Urgence bonus si situation grave
      if (fatBucket >= 3 && s.urgence >= 2) score += 3;
      // Bonus secteur CCN — léger (max +1.5) pour ne pas écraser le matching fatigue
      if (sectorKw.length > 0) {
        const txt = normTxt([s.titre, s.message, (s.conseils||[]).join(' ')].join(' '));
        const hits = sectorKw.filter(kw => txt.includes(normTxt(kw))).length;
        score += Math.min(hits * 0.5, 1.5);
      }
      // Small random pour variété
      score += Math.random() * 0.5;
      return { ...s, _score: score };
    });

    scored.sort((a, b) => b._score - a._score);
    // Déduplique les titres
    const seen = new Set();
    const unique = [];
    for (const s of scored) {
      if (!seen.has(s.titre)) { seen.add(s.titre); unique.push(s); }
      if (unique.length >= n) break;
    }
    return unique;
  }

  /**
   * Recherche textuelle dans les scénarios
   * @param {string} query - Mots-clés
   * @param {Object} state - État actuel (pour re-scorer)
   */
  search(query, state, n = 5) {
    if (!query || query.length < 2) return this.match(state, n);

    const norm = t => (t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Synonymes & expansions pour meilleure couverture
    const SYNONYMS = {
      'repos':       ['recuperation','recup','conges','arret'],
      'fatigue':     ['epuisement','burnout','burn out','surnmenage'],
      'stress':      ['anxiete','pression','cortisol','rps'],
      'hs':          ['heures sup','heures supplementaires','overtime'],
      'contingent':  ['220h','quota','compteur'],
      'repos hebdo': ['35h','dimanche','week-end'],
      'nuit':        ['travail de nuit','horaire decale'],
      'arret':       ['maladie','it','arret maladie'],
      'legal':       ['loi','article','code travail','droit'],
      'performance': ['productivite','efficacite','rendement'],
    };

    // Découper la requête en mots, appliquer synonymes
    const qNorm = norm(query);
    const baseWords = qNorm.split(/\s+/).filter(w => w.length >= 2);
    const allWords = [...baseWords];
    for (const [key, syns] of Object.entries(SYNONYMS)) {
      if (norm(key).split(/\s+/).some(k => baseWords.some(w => w.includes(k) || k.includes(w)))) {
        syns.forEach(s => allWords.push(...norm(s).split(/\s+/)));
      }
    }

    // Scorer chaque scénario
    const scored = this._db.map(sc => {
      const text = norm([sc.titre, sc.message, sc.conseils.join(' '), sc.refs.join(' ')].join(' '));
      let score = 0;

      for (const w of allWords) {
        if (!w) continue;
        // Boost titre × 3
        const titleNorm = norm(sc.titre);
        if (titleNorm.includes(w)) score += 3;
        // Occurrence dans message × 1 (compter les occurrences)
        let pos = 0, occ = 0;
        while ((pos = text.indexOf(w, pos)) !== -1) { occ++; pos += w.length; }
        score += Math.min(occ, 5);
      }

      // Bonus urgence : mots d'alerte → remonter urgent
      const urgWords = ['urgent','critique','danger','risque','interdit','violation','depasse'];
      if (urgWords.some(u => qNorm.includes(u))) score += sc.urgence * 2;

      // Bonus cohérence avec l'état actuel
      if (state && state.scores) {
        const fatBucket = this._fatBucket(state.scores.fatigue || 0);
        score += (3 - Math.abs(sc.fat - fatBucket)) * 1.5;
      }

      return { ...sc, _score: score };
    }).filter(sc => sc._score > 0);

    if (!scored.length) {
      // Fallback : essayer chaque mot séparément
      for (const w of baseWords) {
        const partial = this._db.filter(sc =>
          norm(sc.titre + sc.message).includes(w)
        );
        if (partial.length) return partial.slice(0, n);
      }
      return this.match(state, n);
    }

    scored.sort((a, b) => b._score - a._score);
    // Dédupliquer
    const seen = new Set();
    return scored.filter(sc => {
      if (seen.has(sc.id)) return false;
      seen.add(sc.id); return true;
    }).slice(0, n);
  }

  /**
   * Scénario du jour (basé sur la date pour cohérence)
   */
  dailyScenario(state) {
    const day = new Date().getDate() + new Date().getMonth() * 31;
    const matches = this.match(state, 20);
    return matches[day % matches.length] || matches[0];
  }

  /**
   * Stats globales de la base
   */
  stats() {
    return {
      total: this._db.length,
      byUrgence: [0,1,2,3].map(u => ({ niveau: u, count: this._db.filter(s => s.urgence === u).length })),
      byFat: [0,1,2,3,4,5].map(f => ({ fat: f, count: this._db.filter(s => s.fat === f).length })),
    };
  }

  _fatBucket(v) {
    if (v < 40) return 0;
    if (v < 60) return 1;
    if (v < 75) return 2;
    if (v < 85) return 3;
    if (v < 95) return 4;
    return 5;
  }
  _strBucket(v) { return v < 30 ? 0 : v < 50 ? 1 : v < 70 ? 2 : 3; }
  _consecBucket(v) { return v < 4 ? 0 : v < 7 ? 1 : v < 10 ? 2 : 3; }
  _contBucket(v) { return v < 50 ? 0 : v < 75 ? 1 : v < 100 ? 2 : 3; }
  _perfBucket(v) { return v < 40 ? 0 : v < 60 ? 1 : v < 80 ? 2 : 3; }
}

global.ScenarioAdvisor = ScenarioAdvisor;
if (typeof module !== 'undefined' && module.exports) module.exports = { ScenarioAdvisor, DTE_SCENARIOS };
}(typeof window !== 'undefined' ? window : global));
