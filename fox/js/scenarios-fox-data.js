const FOX_SCENARIOS = [

      {id:1,name:"Semaine Standard 35h",category:"standard",tags:["temps plein","classique"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Semaine classique de travail à temps plein",legal:"✅ Conforme",risk:"aucun",conseil:{titre:"💚 Organisation Saine",message:"Cette répartition respecte la durée légale de 35h. Veillez à maintenir cet équilibre.",actions:["Repos quotidien : minimum 11h entre deux journées","Repos hebdomadaire : 35h consécutives obligatoires","Planifiez vos congés annuels à l'avance"],alerte:null}},
    {id:2,name:"Semaine 40h",category:"intense",tags:["heures sup","charge normale"],days:[{h:8,type:"normal"},{h:8,type:"normal"},{h:8,type:"normal"},{h:8,type:"normal"},{h:8,type:"normal"}],desc:"5h supplémentaires",legal:"⚠️ Heures sup à déclarer",risk:"faible",conseil:{titre:"💡 Heures Supplémentaires",message:"5h supplémentaires cette semaine. Vérifiez leur enregistrement.",actions:["Les 8 premières heures sup/semaine : majoration +25%","Au-delà de 8h : majoration +50%","Ou récupération équivalente selon accord"],alerte:{niveau:"info",texte:"📊 5h sup : vérifiez votre compteur"}}},
    {id:3,name:"Semaine 45h",category:"intense",tags:["surcharge"],days:[{h:9,type:"normal"},{h:9,type:"normal"},{h:9,type:"normal"},{h:9,type:"normal"},{h:9,type:"normal"}],desc:"10h supplémentaires",legal:"⚠️ Proche limite légale",risk:"moyen",conseil:{titre:"⚠️ Charge Élevée",message:"45h approche la limite de 48h/semaine. Situation à surveiller.",actions:["Maximum légal : 48h par semaine","Moyenne sur 12 semaines : 44h maximum","Repos compensateur obligatoire au-delà de 41h"],alerte:{niveau:"warning",texte:"⚠️ 45h/semaine - Surveillez votre moyenne"}}},
    {id:4,name:"Semaine 48h",category:"limite",tags:["maximum légal"],days:[{h:9.5,type:"normal"},{h:9.5,type:"normal"},{h:9.5,type:"normal"},{h:9.5,type:"normal"},{h:10.5,type:"normal"}],desc:"Maximum légal atteint",legal:"🚨 Limite absolue",risk:"élevé",conseil:{titre:"🚨 Plafond Légal",message:"48h est le maximum absolu. Ne peut être dépassé.",actions:["Cette limite ne peut être franchie","Documentez vos horaires","Moyenne 12 semaines : 44h max","Contact représentants du personnel si récurrent"],alerte:{niveau:"danger",texte:"🚨 48h : MAXIMUM LÉGAL atteint"}}},
    {id:5,name:"Semaine 4 jours 35h",category:"standard",tags:["semaine courte"],days:[{h:8.75,type:"normal"},{h:8.75,type:"normal"},{h:8.75,type:"normal"},{h:8.75,type:"normal"}],desc:"Temps plein sur 4 jours",legal:"✅ Conforme si accord",risk:"aucun",conseil:{titre:"💡 Semaine Compressée",message:"Organisation 4 jours nécessite un accord écrit.",actions:["Vérifiez votre contrat de travail","Limite journalière : 10h maximum","Profitez du jour off pour récupérer"],alerte:null}},
    {id:6,name:"Semaine 6 jours",category:"intense",tags:["6 jours consécutifs"],days:[{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"},{h:5,type:"saturday"}],desc:"6 jours travaillés",legal:"⚠️ Repos hebdomadaire à surveiller",risk:"moyen",conseil:{titre:"📅 Six Jours Consécutifs",message:"Attention au respect du repos hebdomadaire.",actions:["Maximum : 6 jours consécutifs travaillés","Repos hebdomadaire : 35h consécutives obligatoires","Samedi travaillé : compensation selon convention"],alerte:{niveau:"warning",texte:"⚠️ 6 jours : vérifiez votre repos hebdo"}}},
    {id:7,name:"Temps partiel 80%",category:"partiel",tags:["temps partiel"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"4 jours/semaine",legal:"✅ Conforme",risk:"aucun",conseil:{titre:"💚 Temps Partiel",message:"80% : vos droits sont calculés proportionnellement.",actions:["Heures complémentaires : maximum 10% (3,5h/semaine)","Droits aux congés proratisés","Refusez toute charge de travail excessive"],alerte:null}},
    {id:8,name:"Mi-temps",category:"partiel",tags:["mi-temps"],days:[{h:3.5,type:"normal"},{h:3.5,type:"normal"},{h:3.5,type:"normal"},{h:3.5,type:"normal"},{h:3.5,type:"normal"}],desc:"17,5h/semaine",legal:"✅ Conforme",risk:"aucun",conseil:{titre:"💚 Mi-Temps",message:"50% : équilibre vie pro/perso préservé.",actions:["Heures complémentaires max : 1h45/semaine (10%)","Salaire et droits calculés à 50%","Charge de travail adaptée obligatoire"],alerte:null}},
    {id:9,name:"Temps partiel 60%",category:"partiel",tags:["temps réduit"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"21h/semaine",legal:"✅ Conforme",risk:"aucun",conseil:{titre:"💚 60% du Temps Plein",message:"Organisation sur 3 jours travaillés.",actions:["Heures complémentaires max : 2h06/semaine","4 jours de repos hebdomadaire","Vérifiez votre couverture sociale"],alerte:null}},
    {id:10,name:"Semaine 30h",category:"reduit",tags:["temps réduit"],days:[{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"}],desc:"Semaine allégée",legal:"✅ Conforme",risk:"aucun",conseil:{titre:"💚 Temps Réduit",message:"30h offre un bon équilibre.",actions:["Vérifiez l'ajustement salarial (30/35)","Congés calculés proportionnellement","Ne pas accepter charge temps plein"],alerte:null}},
    
    // SCÉNARIOS 11-30 : NUIT & ASTREINTES
    {id:11,name:"1 Nuit isolée",category:"nuit",tags:["nuit"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:8,type:"nuit"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Une garde de nuit",legal:"⚠️ Majoration applicable",risk:"faible",conseil:{titre:"🌙 Travail de Nuit",message:"Nuit = 21h-6h. Compensations spécifiques.",actions:["Majoration minimale : +25%","Repos après nuit : 11h minimum","Surveillance médicale si régulier (50 nuits/an)"],alerte:{niveau:"info",texte:"🌙 Garde de nuit : vérifiez majorations"}}},
    {id:12,name:"2 Nuits consécutives",category:"nuit",tags:["nuits enchaînées"],days:[{h:7,type:"normal"},{h:8,type:"nuit"},{h:8,type:"nuit"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Deux nuits d'affilée",legal:"⚠️ Repos compensateur requis",risk:"moyen",conseil:{titre:"🌙 Nuits Consécutives",message:"2 nuits nécessitent récupération renforcée.",actions:["Repos après : minimum 24h","Double majoration à vérifier","Si fatigue excessive : médecine du travail"],alerte:{niveau:"warning",texte:"⚠️ 2 nuits : repos 24h obligatoire"}}},
    {id:13,name:"3 Nuits consécutives",category:"nuit",tags:["série nuits"],days:[{h:7,type:"normal"},{h:8,type:"nuit"},{h:8,type:"nuit"},{h:8,type:"nuit"},{h:7,type:"normal"}],desc:"Trois nuits enchaînées",legal:"🚨 Récupération impérative",risk:"élevé",conseil:{titre:"🚨 Trois Nuits",message:"Risque santé important. Compensations obligatoires.",actions:["Repos après : minimum 48h","Triple majoration exigible","Surveillance médicale obligatoire","Maximum 8h par période 24h en nuit régulière"],alerte:{niveau:"danger",texte:"🚨 3 nuits : REPOS 48h MINIMUM"}}},
    {id:14,name:"Garde 12h nuit",category:"nuit",tags:["garde longue"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:12,type:"nuit"},{h:7,type:"normal"}],desc:"Garde nocturne 12h",legal:"⚠️ Repos compensateur requis",risk:"moyen",conseil:{titre:"🌙 Garde Longue",message:"12h nuit = éprouvant. Compensations adaptées.",actions:["Repos après : 11h minimum","Majoration : +50% minimum pour 12h","Repos compensateur supplémentaire","12h = maximum garde, ne pas dépasser"],alerte:{niveau:"warning",texte:"⚠️ 12h nuit : double compensation"}}},
    {id:15,name:"Alternance jour/nuit",category:"mixte",tags:["rotation"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:8,type:"nuit"},{h:7,type:"normal"},{h:8,type:"nuit"}],desc:"Rotation jour-nuit",legal:"⚠️ Majorations multiples",risk:"moyen",conseil:{titre:"🔄 Alternance",message:"Alternance perturbe rythme circadien.",actions:["Vérifiez 11h repos entre postes","Cumul majorations de nuit","Surveillance fatigue recommandée","Planning stable préférable"],alerte:{niveau:"warning",texte:"⚠️ Alternance : vigilance fatigue"}}},
    {id:16,name:"Semaine nuit complète",category:"nuit",tags:["100% nuit"],days:[{h:7,type:"nuit"},{h:7,type:"nuit"},{h:7,type:"nuit"},{h:7,type:"nuit"},{h:7,type:"nuit"}],desc:"5 nuits d'affilée",legal:"⚠️ Statut travailleur nuit",risk:"élevé",conseil:{titre:"🌙 Semaine Nuit",message:"5 nuits = travailleur de nuit.",actions:["Statut officiel si 50 nuits/an","Surveillance médicale tous les 6 mois","Maximum 8h/jour en nuit régulière","Droit à passer en poste jour si santé"],alerte:{niveau:"danger",texte:"🌙 5 nuits : statut travailleur nuit"}}},
    {id:17,name:"Astreinte simple",category:"astreinte",tags:["disponibilité"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Astreinte sans intervention",legal:"⚠️ Indemnité due",risk:"faible",conseil:{titre:"📱 Astreinte",message:"Disponibilité = indemnisation même sans appel.",actions:["Indemnité d'astreinte obligatoire","Si intervention : heures travail effectif","Majorations si intervention nuit/weekend","Vérifiez montants convention collective"],alerte:{niveau:"info",texte:"📱 Astreinte : indemnité due"}}},
    {id:18,name:"Astreinte weekend",category:"astreinte",tags:["weekend","disponibilité"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Astreinte samedi-dimanche",legal:"⚠️ Indemnités weekend",risk:"faible",conseil:{titre:"📱 Astreinte Weekend",message:"Astreinte weekend = indemnités renforcées.",actions:["Indemnité weekend supérieure à semaine","Interventions : majorations samedi/dimanche","Temps intervention = travail effectif","Ne peut être permanente sans accord"],alerte:{niveau:"info",texte:"📱 Weekend : indemnités majorées"}}},
    {id:19,name:"Garde passive",category:"astreinte",tags:["garde"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Garde à domicile",legal:"⚠️ Distinction temps astreinte/travail",risk:"faible",conseil:{titre:"🏠 Garde Passive",message:"Distinction importante : astreinte ≠ travail effectif.",actions:["Période astreinte : indemnité forfaitaire","Intervention effective : heures comptées","Repos quotidien maintenu (11h)","Interventions multiples : temps cumulé"],alerte:null}},
    {id:20,name:"Permanence téléphonique",category:"astreinte",tags:["téléphone"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Permanence téléphonique",legal:"⚠️ Qualification à vérifier",risk:"faible",conseil:{titre:"☎️ Permanence Tel",message:"Nature de la permanence détermine qualification.",actions:["Si obligation répondre immédiatement : travail effectif","Si simple disponibilité : astreinte","Durée appels = temps travail","Vérifiez qualification dans contrat"],alerte:{niveau:"info",texte:"☎️ Vérifiez qualification permanence"}}},
    
    // SCÉNARIOS 21-40 : WEEKEND & JOURS FÉRIÉS
    {id:21,name:"Samedi travaillé",category:"weekend",tags:["samedi"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"saturday"}],desc:"Semaine + samedi",legal:"⚠️ Repos compensateur",risk:"faible",conseil:{titre:"📅 Samedi Travaillé",message:"Samedi = repos hebdomadaire entamé.",actions:["Repos compensateur équivalent obligatoire","Ou majoration selon convention collective","Vérifier 35h repos hebdo restantes","Ne peut devenir systématique sans accord"],alerte:{niveau:"info",texte:"📅 Samedi : repos compensateur dû"}}},
    {id:22,name:"Dimanche travaillé",category:"weekend",tags:["dimanche"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"sunday"}],desc:"Semaine + dimanche",legal:"⚠️ Majoration +100%",risk:"moyen",conseil:{titre:"📅 Dimanche Travaillé",message:"Dimanche = jour repos hebdomadaire. Protection renforcée.",actions:["Majoration minimale : +100%","Repos compensateur obligatoire","Accord écrit préalable nécessaire","Droit de refuser sauf secteurs dérogation"],alerte:{niveau:"warning",texte:"⚠️ Dimanche : +100% + repos compensateur"}}},
    {id:23,name:"Weekend complet",category:"weekend",tags:["samedi-dimanche"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"saturday"},{h:7,type:"sunday"}],desc:"Samedi + dimanche",legal:"⚠️ Compensations multiples",risk:"moyen",conseil:{titre:"📅 Weekend Complet",message:"Travail samedi ET dimanche = situation exceptionnelle.",actions:["Dimanche : +100% minimum + repos compensateur","Samedi : compensation selon convention","Total 49h : 14h supplémentaires","Repos hebdo 35h à préserver absolument"],alerte:{niveau:"warning",texte:"⚠️ Weekend complet : double compensation"}}},
    {id:24,name:"Férié travaillé",category:"ferie",tags:["jour férié"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Jour férié dans semaine",legal:"⚠️ Selon convention",risk:"faible",conseil:{titre:"🎊 Jour Férié",message:"11 jours fériés/an. Régime selon convention.",actions:["Vérifiez votre convention collective","Généralement : majoration ou jour repos","1er mai : chômé et payé pour tous","Autres fériés : selon secteur activité"],alerte:{niveau:"info",texte:"🎊 Férié : vérifiez convention"}}},
    {id:25,name:"1er mai travaillé",category:"ferie",tags:["1er mai"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Travail 1er mai",legal:"⚠️ Majoration +100% minimum",risk:"faible",conseil:{titre:"🎊 1er Mai",message:"1er mai = seul férié chômé obligatoire.",actions:["Majoration minimale : +100%","Dérogations très limitées (secteurs continus)","Refus possible hors dérogation","Repos compensateur en plus majoration"],alerte:{niveau:"warning",texte:"⚠️ 1er mai : +100% obligatoire"}}},
    {id:26,name:"Pont travaillé",category:"ferie",tags:["pont"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Travail jour de pont",legal:"⚠️ Selon accord entreprise",risk:"faible",conseil:{titre:"🌉 Jour de Pont",message:"Pont = usage, pas obligation légale.",actions:["Vérifiez accord d'entreprise","Si pont accordé : récupération obligatoire","Si travaillé : compensation possible","RTT parfois utilisées"],alerte:null}},
    {id:27,name:"Semaine fériée",category:"ferie",tags:["semaine courte"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Semaine avec férié chômé",legal:"✅ Conforme",risk:"aucun",conseil:{titre:"🎊 Semaine Fériée",message:"Férié chômé réduit semaine travaillée.",actions:["Maintien salaire si conditions ancienneté","4 jours travaillés = semaine complète","Heures sup calculées au-delà durée réduite","Profitez du repos supplémentaire"],alerte:null}},
    {id:28,name:"2 fériés semaine",category:"ferie",tags:["double férié"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Deux fériés dans semaine",legal:"✅ Conforme",risk:"aucun",conseil:{titre:"🎊 Double Férié",message:"Semaine courte avec 2 jours fériés.",actions:["Maintien salaire intégral","3 jours travaillés = semaine complète","Heures sup : au-delà de 21h cette semaine","Organisez votre charge de travail"],alerte:null}},
    {id:29,name:"Férié + weekend",category:"ferie",tags:["férié weekend"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Férié tombant weekend",legal:"⚠️ Pas de récupération légale",risk:"aucun",conseil:{titre:"🎊 Férié Weekend",message:"Férié un dimanche = pas récupération automatique.",actions:["Aucune obligation légale de report","Certaines conventions prévoient récupération","Vérifiez accord d'entreprise","1er mai weekend : idem"],alerte:null}},
    {id:30,name:"Ascension travaillée",category:"ferie",tags:["jeudi"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Jeudi Ascension travaillé",legal:"⚠️ Compensation selon convention",risk:"faible",conseil:{titre:"🎊 Ascension",message:"Jeudi férié travaillé.",actions:["Vérifiez majoration convention collective","Repos compensateur possible","Pont vendredi souvent accordé","Si travaillé : compensation appropriée"],alerte:{niveau:"info",texte:"🎊 Ascension : vérifiez compensation"}}},
    
    // SCÉNARIOS 31-50 : HEURES SUPPLÉMENTAIRES VARIÉES
    {id:31,name:"42h semaine",category:"intense",tags:["heures sup modérées"],days:[{h:8.5,type:"normal"},{h:8.5,type:"normal"},{h:8.5,type:"normal"},{h:8.5,type:"normal"},{h:8,type:"normal"}],desc:"7h supplémentaires",legal:"⚠️ Heures sup",risk:"faible",conseil:{titre:"💡 7h Supplémentaires",message:"7h sup = dans les 8 premières heures.",actions:["Majoration : +25%","Ou récupération 7h + 25% (8h45)","Décomptées dans contingent annuel","Vérifiez compteur heures sup"],alerte:{niveau:"info",texte:"📊 7h sup : majoration +25%"}}},
    {id:32,name:"43h semaine",category:"intense",tags:["heures sup"],days:[{h:8.5,type:"normal"},{h:8.5,type:"normal"},{h:8.5,type:"normal"},{h:8.5,type:"normal"},{h:9,type:"normal"}],desc:"8h supplémentaires",legal:"⚠️ Limite 8 premières heures",risk:"faible",conseil:{titre:"💡 8h Supplémentaires",message:"8 premières heures sup atteintes.",actions:["Toutes à +25%","Contingent annuel impacté","Prochaines heures : +50%","Planifiez récupération"],alerte:{niveau:"info",texte:"📊 8h sup : seuil +25% atteint"}}},
    {id:33,name:"44h semaine",category:"intense",tags:["heures sup élevées"],days:[{h:9,type:"normal"},{h:9,type:"normal"},{h:9,type:"normal"},{h:9,type:"normal"},{h:8,type:"normal"}],desc:"9h supplémentaires",legal:"⚠️ Au-delà 8 premières",risk:"moyen",conseil:{titre:"⚠️ 9h Supplémentaires",message:"Au-delà des 8 premières heures.",actions:["8 premières heures : +25%","9e heure : +50%","Repos compensateur obligatoire au-delà 41h","Moyenne 12 semaines : 44h max"],alerte:{niveau:"warning",texte:"⚠️ 9h sup : majoration +50% sur dernière heure"}}},
    {id:34,name:"46h semaine",category:"intense",tags:["charge importante"],days:[{h:9,type:"normal"},{h:9,type:"normal"},{h:9,type:"normal"},{h:9.5,type:"normal"},{h:9.5,type:"normal"}],desc:"11h supplémentaires",legal:"⚠️ Proche limite",risk:"moyen",conseil:{titre:"⚠️ 11h Supplémentaires",message:"46h proche de la limite légale.",actions:["8 premières : +25%, suivantes : +50%","Repos compensateur obligatoire","Limite légale : 48h/semaine","Vérifiez moyenne sur 12 semaines"],alerte:{niveau:"warning",texte:"⚠️ 46h : proche limite légale"}}},
    {id:35,name:"47h semaine",category:"intense",tags:["très haute charge"],days:[{h:9.5,type:"normal"},{h:9.5,type:"normal"},{h:9.5,type:"normal"},{h:9.5,type:"normal"},{h:9,type:"normal"}],desc:"12h supplémentaires",legal:"⚠️ Très proche limite",risk:"élevé",conseil:{titre:"⚠️ 12h Supplémentaires",message:"47h = 1h du maximum légal.",actions:["Situation exceptionnelle uniquement","Repos compensateur impératif","Documentez horaires","Alertez si devient récurrent"],alerte:{niveau:"warning",texte:"⚠️ 47h : 1h du maximum légal"}}},
    {id:36,name:"Heures sup réparties",category:"intense",tags:["répartition"],days:[{h:7.5,type:"normal"},{h:8,type:"normal"},{h:7.5,type:"normal"},{h:8.5,type:"normal"},{h:8.5,type:"normal"}],desc:"5h sup réparties",legal:"⚠️ Heures sup",risk:"faible",conseil:{titre:"💡 Heures Sup Réparties",message:"5h sup étalées sur la semaine.",actions:["Majoration : +25%","Flexibilité quotidienne appréciée","Vérifiez enregistrement chaque jour","Limite quotidienne : 10h"],alerte:{niveau:"info",texte:"📊 5h sup réparties : +25%"}}},
    {id:37,name:"Dépassement ponctuel",category:"intense",tags:["exceptionnel"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:11,type:"normal"}],desc:"Vendredi allongé",legal:"⚠️ Journée longue",risk:"faible",conseil:{titre:"💡 Journée Longue",message:"11h un jour, 7h les autres = 39h total.",actions:["4h supplémentaires à +25%","Limite quotidienne : 10h (dérogation 11h)","Repos 11h après cette journée","Récupération recommandée"],alerte:{niveau:"info",texte:"📊 Journée 11h : vérifiez repos"}}},
    {id:38,name:"Lundi rallongé",category:"intense",tags:["début semaine"],days:[{h:10,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Lundi chargé",legal:"⚠️ Journée 10h",risk:"faible",conseil:{titre:"💡 Lundi Rallongé",message:"10h lundi = 38h semaine.",actions:["3h supplémentaires à +25%","Limite quotidienne normale : 10h","Organisation possible si ponctuelle","Pas de dépassement quotidien"],alerte:null}},
    {id:39,name:"Fin semaine intensive",category:"intense",tags:["jeudi-vendredi"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:9,type:"normal"},{h:10,type:"normal"}],desc:"Jeudi-vendredi chargés",legal:"⚠️ Concentration fin semaine",risk:"faible",conseil:{titre:"💡 Fin Semaine Chargée",message:"40h avec concentration jeudi-vendredi.",actions:["5h supplémentaires à +25%","Surveillez fatigue en fin semaine","Repos weekend important","Organisation à revoir si répétitif"],alerte:{niveau:"info",texte:"📊 Concentration fin semaine : 5h sup"}}},
    {id:40,name:"Semaine irrégulière",category:"atypique",tags:["variabilité"],days:[{h:6,type:"normal"},{h:9,type:"normal"},{h:6,type:"normal"},{h:9,type:"normal"},{h:8,type:"normal"}],desc:"Horaires très variables",legal:"⚠️ Variabilité quotidienne",risk:"faible",conseil:{titre:"🔄 Horaires Variables",message:"Variabilité 6h à 9h selon les jours.",actions:["Total 38h = 3h supplémentaires","Planning prévisionnel souhaitable","Respectez 11h repos quotidien","Limite quotidienne : 10h maximum"],alerte:{niveau:"info",texte:"🔄 Horaires variables : 3h sup"}}},
    
    // SCÉNARIOS 41-60 : SITUATIONS ATYPIQUES
    {id:41,name:"Journée 12h",category:"extreme",tags:["journée longue"],days:[{h:7,type:"normal"},{h:12,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Une journée 12h",legal:"🚨 Dérogation requise",risk:"élevé",conseil:{titre:"🚨 Journée 12h",message:"12h dépasse limite quotidienne normale (10h).",actions:["Dérogation exceptionnelle écrite nécessaire","Repos 11h minimum après","Repos compensateur obligatoire","Ne peut être régulier"],alerte:{niveau:"danger",texte:"🚨 12h : dérogation + repos obligatoires"}}},
    {id:42,name:"Journée 14h",category:"extreme",tags:["très longue"],days:[{h:7,type:"normal"},{h:14,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Journée exceptionnelle 14h",legal:"🚨 Dérogation stricte",risk:"critique",conseil:{titre:"🚨 Journée 14h",message:"ATTENTION : 14h largement au-delà des limites.",actions:["Dérogation exceptionnelle obligatoire","Repos compensateur 24h minimum","11h repos quotidien impératif","Contact inspection travail si récurrent"],alerte:{niveau:"danger",texte:"🚨 14h : EXCEPTIONNEL - Dérogation stricte"}}},
    {id:43,name:"Coupure longue",category:"atypique",tags:["coupure"],days:[{h:4,type:"normal"},{h:4,type:"normal"},{h:4,type:"normal"},{h:4,type:"normal"},{h:4,type:"normal"}],desc:"Matinées uniquement avec longue coupure",legal:"⚠️ Coupure à encadrer",risk:"faible",conseil:{titre:"🔄 Coupure Journalière",message:"Travail matin uniquement = coupure longue.",actions:["Coupure > 2h doit être rémunérée ou limitée","Amplitude quotidienne à surveiller","Planning doit être stable","Vérifiez convention collective"],alerte:{niveau:"info",texte:"🔄 Coupures : vérifiez rémunération"}}},
    {id:44,name:"Horaires décalés",category:"atypique",tags:["décalage"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Début/fin décalés",legal:"✅ Conforme si accord",risk:"faible",conseil:{titre:"🕐 Horaires Décalés",message:"Ex : 6h-13h ou 11h-18h.",actions:["Accord écrit si modification horaires","Respecte durée légale 35h","Amplitude quotidienne : 13h max","Prévisibilité planning importante"],alerte:null}},
    {id:45,name:"Travail posté 3×8",category:"poste",tags:["équipe"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Équipe en rotation 3×8",legal:"✅ Organisation spécifique",risk:"faible",conseil:{titre:"🔄 Travail Posté",message:"Rotation équipes : matin/après-midi/nuit.",actions:["Planning rotation régulier","Repos compensateur entre changements","Majoration nuit si poste nuit","Surveillance médicale renforcée"],alerte:null}},
    {id:46,name:"2×12 semaine",category:"poste",tags:["12h"],days:[{h:12,type:"normal"},{h:12,type:"normal"},{h:12,type:"normal"}],desc:"3 jours de 12h",legal:"⚠️ Dérogation requise",risk:"moyen",conseil:{titre:"⚠️ Organisation 12h",message:"Postes 12h = dérogation nécessaire.",actions:["Accord collectif obligatoire","36h sur 3 jours","Limite : 12h par jour","Repos compensateur adapté"],alerte:{niveau:"warning",texte:"⚠️ 3×12h : accord collectif requis"}}},
    {id:47,name:"Cycle 2 semaines",category:"poste",tags:["cycle"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Cycle sur 2 semaines",legal:"✅ Cycle autorisé",risk:"aucun",conseil:{titre:"🔄 Cycle 2 Semaines",message:"Exemple : 40h puis 30h = moyenne 35h.",actions:["Moyenne doit respecter 35h","Cycle maximum : 9 semaines","Planning prévu à l'avance","Heures sup : au-delà moyenne"],alerte:null}},
    {id:48,name:"Forfait jours",category:"forfait",tags:["cadre"],days:[],desc:"Forfait jours cadre",legal:"✅ Forfait spécifique",risk:"moyen",conseil:{titre:"📋 Forfait Jours",message:"218 jours/an (ou autre selon accord).",actions:["Autonomie dans organisation","Pas décompte heures mais jours","Droit à déconnexion essentiel","Entretiens annuels charge travail obligatoires"],alerte:{niveau:"warning",texte:"⚠️ Forfait jours : surveillez charge"}}},
    {id:49,name:"Télétravail complet",category:"teletravail",tags:["remote"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"100% télétravail",legal:"✅ Accord télétravail",risk:"aucun",conseil:{titre:"🏠 Télétravail Complet",message:"5 jours/semaine à domicile.",actions:["Accord écrit obligatoire","Droit à déconnexion renforcé","Frais professionnels à négocier","Horaires à respecter malgré distance"],alerte:null}},
    {id:50,name:"Télétravail partiel",category:"teletravail",tags:["hybride"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Télétravail 2-3j/semaine",legal:"✅ Organisation hybride",risk:"aucun",conseil:{titre:"🏠 Télétravail Hybride",message:"Mix présentiel/distance.",actions:["Planning télétravail défini","Même durée travail qu'au bureau","Déconnexion hors horaires","Équilibre présentiel/distance"],alerte:null}},

    // SCÉNARIOS 51-70 : SITUATIONS LIMITES & REPOS
    {id:51,name:"Repos 10h seulement",category:"repos",tags:["repos court"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Repos quotidien réduit",legal:"🚨 Minimum non respecté",risk:"élevé",conseil:{titre:"🚨 Repos Insuffisant",message:"ALERTE : minimum légal 11h non respecté.",actions:["Repos quotidien minimum : 11h obligatoires","Seulement dérogations très limitées","Repos compensateur si dérogation","Signaler si récurrent"],alerte:{niveau:"danger",texte:"🚨 Repos < 11h : MINIMUM LÉGAL non respecté"}}},
    {id:52,name:"30h repos hebdo",category:"repos",tags:["repos hebdo court"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"saturday"},{h:4,type:"sunday"}],desc:"Repos hebdo insuffisant",legal:"🚨 Minimum non respecté",risk:"critique",conseil:{titre:"🚨 Repos Hebdo Insuffisant",message:"ALERTE : minimum 35h consécutives obligatoires.",actions:["Repos hebdomadaire minimum : 35h consécutives","Généralement dimanche","Dérogations très encadrées","Contact inspection travail si répété"],alerte:{niveau:"danger",texte:"🚨 Repos hebdo < 35h : MINIMUM LÉGAL"}}},
    {id:53,name:"7 jours consécutifs",category:"repos",tags:["sans repos"],days:[{h:5,type:"normal"},{h:5,type:"normal"},{h:5,type:"normal"},{h:5,type:"normal"},{h:5,type:"normal"},{h:5,type:"saturday"},{h:5,type:"sunday"}],desc:"Pas de repos hebdo",legal:"🚨 INTERDIT",risk:"critique",conseil:{titre:"🚨 SITUATION ILLÉGALE",message:"7 jours consécutifs = INTERDICTION ABSOLUE.",actions:["Maximum : 6 jours travaillés consécutifs","Repos hebdo 35h obligatoire","Situation illégale même avec accord employé","Saisir inspection travail immédiatement"],alerte:{niveau:"danger",texte:"🚨 7 jours : ILLÉGAL - Repos hebdo obligatoire"}}},
    {id:54,name:"Pause déjeuner supprimée",category:"pause",tags:["pause"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Travail sans pause",legal:"🚨 Pause obligatoire",risk:"élevé",conseil:{titre:"🚨 Pause Obligatoire",message:"ALERTE : pause déjeuner = droit, pas option.",actions:["Au-delà 6h travail : pause 20 min minimum","Pause non rémunérée sauf usage","Ne peut être supprimée","Refus possible si pas de pause"],alerte:{niveau:"danger",texte:"🚨 Pas de pause > 6h : OBLIGATION LÉGALE"}}},
    {id:55,name:"Amplitude 15h",category:"amplitude",tags:["amplitude"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Amplitude quotidienne 15h",legal:"🚨 Dépassement amplitude",risk:"élevé",conseil:{titre:"🚨 Amplitude Excessive",message:"15h amplitude (début → fin) dépasse maximum.",actions:["Amplitude maximum : 13h par jour","Inclut pauses et coupures","Dérogations très limitées","Repos quotidien 11h en danger"],alerte:{niveau:"danger",texte:"🚨 Amplitude 15h : dépassement maximum 13h"}}},
    {id:56,name:"Déplacement professionnel",category:"deplacement",tags:["trajet"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Semaine avec déplacements",legal:"⚠️ Temps trajet à qualifier",risk:"faible",conseil:{titre:"🚗 Temps de Déplacement",message:"Qualification temps trajet importante.",actions:["Trajet domicile-travail : temps personnel","Trajet professionnel en journée : temps travail","Amplitude à respecter malgré trajets","Frais kilométriques si véhicule perso"],alerte:{niveau:"info",texte:"🚗 Temps trajet : vérifiez qualification"}}},
    {id:57,name:"Formation obligatoire",category:"formation",tags:["formation"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Semaine avec formation",legal:"✅ Temps de travail effectif",risk:"aucun",conseil:{titre:"📚 Formation Obligatoire",message:"Formation imposée = temps travail effectif.",actions:["Rémunérée comme temps travail","Compte dans durée hebdomadaire","Frais pris en charge employeur","Maintien salaire intégral"],alerte:null}},
    {id:58,name:"Réunion hors horaires",category:"reunion",tags:["réunion"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Réunions le soir",legal:"⚠️ Heures sup",risk:"faible",conseil:{titre:"📊 Réunions Hors Horaires",message:"Réunion obligatoire = temps travail.",actions:["Compte comme heures supplémentaires","Ou récupération équivalente","Respecter repos quotidien 11h","Refus possible si repos menacé"],alerte:{niveau:"info",texte:"📊 Réunion soir : heures sup dues"}}},
    {id:59,name:"Astreinte avec interventions",category:"astreinte",tags:["interventions multiples"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Astreinte + 3 interventions",legal:"⚠️ Temps interventions = travail",risk:"moyen",conseil:{titre:"📱 Interventions Multiples",message:"Chaque intervention = temps travail effectif.",actions:["Durée interventions comptabilisée","Trajet si nécessaire inclus","Majorations si nuit/weekend","Repos quotidien peut être impacté"],alerte:{niveau:"warning",texte:"⚠️ Interventions multiples : vérifiez repos"}}},
    {id:60,name:"Garde 24h",category:"garde",tags:["garde continue"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Garde continue 24h",legal:"⚠️ Temps présence ≠ travail",risk:"moyen",conseil:{titre:"🏥 Garde 24h",message:"Distinction temps présence / travail effectif.",actions:["Seul temps intervention = travail effectif","Temps repos sur place non décompté","Indemnité garde forfaitaire","Secteur santé : régime spécifique"],alerte:{niveau:"warning",texte:"⚠️ Garde 24h : distinction présence/travail"}}},

    // SCÉNARIOS 61-80 : CAS SPÉCIFIQUES SECTEURS
    {id:61,name:"Secteur santé jour",category:"sante",tags:["hôpital"],days:[{h:10,type:"normal"},{h:10,type:"normal"},{h:10,type:"normal"},{h:10,type:"normal"}],desc:"Semaine hospitalière",legal:"⚠️ Dérogation santé",risk:"moyen",conseil:{titre:"🏥 Secteur Santé",message:"Dérogations spécifiques secteur santé.",actions:["Forfait spécifique possible","Garde et astreinte régime particulier","Accord temps travail santé","Repos compensateur renforcé"],alerte:{niveau:"warning",texte:"🏥 Santé : régime dérogatoire"}}},
    {id:62,name:"Transport routier",category:"transport",tags:["routier"],days:[{h:9,type:"normal"},{h:9,type:"normal"},{h:9,type:"normal"},{h:9,type:"normal"},{h:9,type:"normal"}],desc:"Semaine conducteur",legal:"⚠️ Règlement européen",risk:"moyen",conseil:{titre:"🚚 Transport Routier",message:"Temps conduite et repos spécifiques.",actions:["Amplitude quotidienne : 13h max","Conduite : 9h/jour, 56h/semaine","Repos quotidien : 11h minimum","Chronotachygraphe obligatoire"],alerte:{niveau:"warning",texte:"🚚 Transport : règles européennes"}}},
    {id:63,name:"Commerce dimanche",category:"commerce",tags:["dimanche commerce"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"sunday"}],desc:"Commerce ouvert dimanche",legal:"⚠️ Dérogation commerce",risk:"faible",conseil:{titre:"🛒 Commerce Dimanche",message:"Ouverture dimanche : dérogations encadrées.",actions:["Zone touristique ou dérogation maire","Volontariat obligatoire","Majoration minimale : +100%","Droit refuser sans sanction"],alerte:{niveau:"warning",texte:"🛒 Dimanche commerce : volontariat"}}},
    {id:64,name:"Sécurité surveillance",category:"securite",tags:["gardiennage"],days:[{h:12,type:"nuit"},{h:12,type:"nuit"},{h:12,type:"nuit"}],desc:"3 nuits surveillance 12h",legal:"⚠️ Conventions spécifiques",risk:"moyen",conseil:{titre:"🔐 Sécurité",message:"Métiers sécurité : conventions particulières.",actions:["Temps présence ≠ temps travail effectif","Accord branche à consulter","Équivalences possibles","Majorations nuit applicables"],alerte:{niveau:"warning",texte:"🔐 Sécurité : vérifiez convention"}}},
    {id:65,name:"Hôtellerie-restauration",category:"hotellerie",tags:["HCR"],days:[{h:9,type:"normal"},{h:9,type:"normal"},{h:4,type:"normal"},{h:9,type:"normal"},{h:9,type:"normal"}],desc:"Semaine HCR coupée",legal:"⚠️ Convention HCR",risk:"faible",conseil:{titre:"🏨 Hôtellerie-Restauration",message:"Secteur HCR : coupures fréquentes.",actions:["Convention collective HCR","Coupure quotidienne encadrée (2-3h)","Amplitude max : 13h","Repos compensateur majoré"],alerte:{niveau:"info",texte:"🏨 HCR : coupures convention"}}},
    {id:66,name:"Agriculture saisonnière",category:"agriculture",tags:["saisonnier"],days:[{h:10,type:"normal"},{h:10,type:"normal"},{h:10,type:"normal"},{h:10,type:"normal"},{h:10,type:"normal"}],desc:"Semaine agricole haute saison",legal:"⚠️ Dérogations agriculture",risk:"moyen",conseil:{titre:"🌾 Agriculture",message:"Saisonnalité : dérogations temporaires.",actions:["Dérogations périodes pointe","Maximum temporaire relevé","Récupération hors saison","Lissage annuel possible"],alerte:{niveau:"warning",texte:"🌾 Agriculture : dérogation saisonnière"}}},
    {id:67,name:"Spectacle vivant",category:"spectacle",tags:["intermittent"],days:[{h:12,type:"normal"},{h:12,type:"normal"}],desc:"2 jours spectacle",legal:"⚠️ Régime intermittent",risk:"faible",conseil:{titre:"🎭 Spectacle",message:"Intermittents : régime spécifique.",actions:["Cachets et contrats courts","Annexes 8 et 10 chômage","Temps répétition = temps travail","Convention collective spectacle"],alerte:null}},
    {id:68,name:"Enseignement",category:"enseignement",tags:["professeur"],days:[{h:18,type:"normal"}],desc:"18h face élèves",legal:"✅ Décompte spécifique",risk:"aucun",conseil:{titre:"📚 Enseignement",message:"Enseignants : temps face élèves ≠ temps total.",actions:["Heures cours = décompte officiel","Préparation non comptée mais réelle","Obligations service variables selon corps","Heures sup possibles"],alerte:null}},
    {id:69,name:"BTP chantier",category:"btp",tags:["bâtiment"],days:[{h:8,type:"normal"},{h:8,type:"normal"},{h:8,type:"normal"},{h:8,type:"normal"},{h:8,type:"saturday"}],desc:"Semaine BTP + samedi",legal:"⚠️ Intempéries",risk:"faible",conseil:{titre:"🏗️ BTP",message:"BTP : samedi fréquent, intempéries.",actions:["Samedi : usage secteur mais compensation","Intempéries : chômage partiel possible","Indemnités selon convention","Conditions climatiques à surveiller"],alerte:{niveau:"info",texte:"🏗️ BTP : samedi usage, compensation"}}},
    {id:70,name:"Services à personne",category:"services",tags:["aide domicile"],days:[{h:3,type:"normal"},{h:3,type:"normal"},{h:3,type:"normal"},{h:3,type:"normal"},{h:3,type:"normal"},{h:3,type:"saturday"},{h:3,type:"sunday"}],desc:"7 jours interventions courtes",legal:"⚠️ Multi-employeurs",risk:"moyen",conseil:{titre:"🏠 Services Personne",message:"Multi-employeurs : cumul à surveiller.",actions:["Chaque employeur = 35h max","Cumul total à vérifier","Repos hebdo à préserver","Trajets entre interventions = temps perso"],alerte:{niveau:"warning",texte:"🏠 Multi-employeurs : cumul à surveiller"}}},

    // SCÉNARIOS 71-90 : SITUATIONS FAMILIALES & PARENTALITÉ
    {id:71,name:"Congé paternité",category:"conge",tags:["paternité"],days:[],desc:"Congé naissance",legal:"✅ Droit congé paternité",risk:"aucun",conseil:{titre:"👶 Congé Paternité",message:"28 jours calendaires (dont 7 obligatoires).",actions:["Indemnisation CPAM : conditions remplies","Employeur informé 1 mois avant","Fractionnable en 2 périodes max","Maintien salaire si accord entreprise"],alerte:null}},
    {id:72,name:"Congé maternité",category:"conge",tags:["maternité"],days:[],desc:"Congé maternité",legal:"✅ Protection maternité",risk:"aucun",conseil:{titre:"👶 Congé Maternité",message:"16 semaines minimum (1er/2e enfant).",actions:["Protection licenciement renforcée","Indemnités journalières CPAM","Interdiction travail 8 semaines dont 6 après","Congés payés acquis normalement"],alerte:null}},
    {id:73,name:"Allaitement",category:"parentalite",tags:["allaitement"],days:[{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"}],desc:"Réduction pour allaitement",legal:"✅ Droit allaitement",risk:"aucun",conseil:{titre:"👶 Allaitement",message:"1h/jour (2×30min) pendant 1 an.",actions:["Pause allaitement : droit légal","Non rémunérée sauf convention","Local approprié obligatoire si demandé","Protection contre discrimination"],alerte:null}},
    {id:74,name:"Enfant malade",category:"parentalite",tags:["enfant malade"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Absence enfant malade",legal:"✅ Congé enfant malade",risk:"aucun",conseil:{titre:"👶 Enfant Malade",message:"3 à 5 jours selon âge enfant et nombre.",actions:["Justificatif médical obligatoire","Non rémunéré sauf convention","Augmenté si enfant handicapé","Protection emploi si conditions respectées"],alerte:null}},
    {id:75,name:"Rentrée scolaire",category:"parentalite",tags:["rentrée"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Absence rentrée scolaire",legal:"⚠️ Selon convention",risk:"aucun",conseil:{titre:"🎒 Rentrée Scolaire",message:"1 jour selon conventions collectives.",actions:["Vérifiez votre convention collective","Généralement rémunéré","Justificatif école nécessaire","Usage mais pas obligation légale"],alerte:null}},
    {id:76,name:"Télétravail parental",category:"parentalite",tags:["télétravail parent"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Télétravail avec enfants",legal:"⚠️ Organisation adaptée",risk:"faible",conseil:{titre:"🏠 Télétravail Parental",message:"Garde enfant et télétravail : organisation délicate.",actions:["Télétravail ≠ mode garde","Horaires adaptés à négocier","Droit déconnexion essentiel","Possible aménagement si jeunes enfants"],alerte:{niveau:"info",texte:"🏠 Télétravail ≠ garde enfants"}}},
    {id:77,name:"Temps partiel parental",category:"parentalite",tags:["80% parental"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"80% pour enfants",legal:"✅ Droit temps partiel",risk:"aucun",conseil:{titre:"👶 Temps Partiel Parental",message:"Réduction temps travail jusqu'aux 3 ans enfant.",actions:["Droit si ancienneté 1 an","Durée minimale : 16h/semaine","Protection contre licenciement","Retour temps plein garanti"],alerte:null}},
    {id:78,name:"Congé parental",category:"conge",tags:["parental complet"],days:[],desc:"Congé parental temps plein",legal:"✅ Congé parental",risk:"aucun",conseil:{titre:"👶 Congé Parental Complet",message:"Jusqu'aux 3 ans de l'enfant.",actions:["Ancienneté 1 an requise","Allocation CAF : PreParE","Protection emploi maintenue","Retour garanti poste équivalent"],alerte:null}},
    {id:79,name:"Garde alternée",category:"parentalite",tags:["garde alternée"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Organisation garde alternée",legal:"⚠️ Aménagements possibles",risk:"aucun",conseil:{titre:"👶 Garde Alternée",message:"Contraintes familiales légitimes.",actions:["Aménagements horaires négociables","Télétravail facilitant possible","Jours enfants malades partagés","Communication employeur recommandée"],alerte:null}},
    {id:80,name:"Proche aidant",category:"familial",tags:["aidant"],days:[{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"}],desc:"Réduction pour proche aidant",legal:"✅ Congé proche aidant",risk:"aucun",conseil:{titre:"❤️ Proche Aidant",message:"Congé ou réduction temps travail.",actions:["3 mois renouvelables (max 1 an)","Non rémunéré sauf convention","Protection emploi","Allocation journalière possible (conditions)"],alerte:null}},

    // SCÉNARIOS 81-100 : FORMATION, MOBILITÉ, ÉVOLUTION
    {id:81,name:"Formation certifiante",category:"formation",tags:["certification"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Semaine formation",legal:"✅ Temps travail effectif",risk:"aucun",conseil:{titre:"📚 Formation Certifiante",message:"Formation imposée = temps travail.",actions:["Rémunération maintenue intégralement","Frais formation pris en charge","Compte dans temps travail","Protection en cas échec examen"],alerte:null}},
    {id:82,name:"CPF hors temps travail",category:"formation",tags:["CPF perso"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Formation CPF soir/weekend",legal:"✅ Temps personnel",risk:"aucun",conseil:{titre:"📚 CPF Personnel",message:"Formation hors temps travail : choix personnel.",actions:["CPF : droits personnels","Employeur ne peut imposer","Pas rémunérée si hors temps travail","Certifications éligibles nombreuses"],alerte:null}},
    {id:83,name:"Bilan compétences",category:"formation",tags:["bilan"],days:[{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"}],desc:"Semaine allégée bilan",legal:"✅ Dispositif bilan",risk:"aucun",conseil:{titre:"📊 Bilan Compétences",message:"24h sur temps travail ou hors temps.",actions:["Financement CPF possible","Accord employeur si temps travail","Confidentialité résultats garantie","Accompagnement projet professionnel"],alerte:null}},
    {id:84,name:"VAE",category:"formation",tags:["validation acquis"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Congé VAE",legal:"✅ Droit VAE",risk:"aucun",conseil:{titre:"🎓 VAE",message:"Validation Acquis Expérience.",actions:["Droit à congé pour jury (24h max)","Accompagnement finançable CPF","Expérience 1 an minimum requise","Diplôme sans retour formation"],alerte:null}},
    {id:85,name:"Mobilité géographique",category:"mobilite",tags:["mutation"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Semaine + temps déménagement",legal:"⚠️ Clause mobilité",risk:"faible",conseil:{titre:"🚚 Mobilité Géo",message:"Mutation : clause mobilité ou accord.",actions:["Clause mobilité : vérifiez contrat","Aide déménagement à négocier","Délai raisonnable refus possible","Frais pris charge selon accord"],alerte:{niveau:"info",texte:"🚚 Mutation : vérifiez conditions"}}},
    {id:86,name:"Détachement étranger",category:"mobilite",tags:["expatriation"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Mission à l'étranger",legal:"⚠️ Statut expatrié",risk:"faible",conseil:{titre:"✈️ Détachement",message:"Mission étrangère : statut à définir.",actions:["Détachement : < 2 ans, cotisations France","Expatriation : > 2 ans, régime local","Prime expatriation à négocier","Couverture sociale à vérifier"],alerte:{niveau:"info",texte:"✈️ Étranger : statut détaché/expatrié"}}},
    {id:87,name:"Télétravail étranger",category:"mobilite",tags:["remote étranger"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Télétravail depuis étranger",legal:"⚠️ Complexité juridique",risk:"moyen",conseil:{titre:"🌍 Télétravail Étranger",message:"Travail depuis étranger = complexe.",actions:["Accord employeur obligatoire","Implications fiscales importantes","Sécurité sociale à clarifier","Durée limitée recommandée"],alerte:{niveau:"warning",texte:"🌍 Étranger : implications juridiques"}}},
    {id:88,name:"Changement poste",category:"evolution",tags:["mobilité interne"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Période adaptation nouveau poste",legal:"✅ Période essai/adaptation",risk:"aucun",conseil:{titre:"🔄 Nouveau Poste",message:"Changement interne : période adaptation.",actions:["Période essai si mobilité importante","Formation accompagnement usuelle","Maintien salaire garanti","Retour poste précédent si échec"],alerte:null}},
    {id:89,name:"Promotion",category:"evolution",tags:["évolution"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Semaine avec nouvelles responsabilités",legal:"✅ Avenant contrat",risk:"aucun",conseil:{titre:"📈 Promotion",message:"Promotion = modification contrat.",actions:["Avenant écrit obligatoire si changement majeur","Augmentation salariale à négocier","Formation si nécessaire","Période adaptation prévue"],alerte:null}},
    {id:90,name:"Reconversion",category:"evolution",tags:["reconversion"],days:[{h:4,type:"normal"},{h:4,type:"normal"},{h:4,type:"normal"},{h:4,type:"normal"},{h:4,type:"normal"}],desc:"Mi-temps pour formation",legal:"✅ Projet transition pro",risk:"aucun",conseil:{titre:"🔄 Reconversion",message:"Projet Transition Professionnelle (PTP).",actions:["Financement formation longue (max 1 an)","Rémunération maintenue (conditions)","Ancienneté requise (24 mois)","Retour emploi ou démission protégée"],alerte:null}},

    // SCÉNARIOS 91-110 : SITUATIONS SANTÉ & HANDICAP
    {id:91,name:"Arrêt maladie court",category:"sante",tags:["arrêt"],days:[{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Arrêt 3 jours",legal:"✅ Arrêt maladie",risk:"aucun",conseil:{titre:"🏥 Arrêt Maladie",message:"Arrêt < 6 mois : maintien salaire partiel.",actions:["Certificat médical dans 48h","Indemnités CPAM dès J4","Maintien employeur selon ancienneté","Contre-visite patronale possible"],alerte:null}},
    {id:92,name:"Mi-temps thérapeutique",category:"sante",tags:["temps partiel thérapeutique"],days:[{h:3.5,type:"normal"},{h:3.5,type:"normal"},{h:3.5,type:"normal"},{h:3.5,type:"normal"},{h:3.5,type:"normal"}],desc:"Reprise progressive",legal:"✅ Temps partiel thérapeutique",risk:"aucun",conseil:{titre:"🏥 Mi-Temps Thérapeutique",message:"Reprise progressive après arrêt.",actions:["Prescription médicale obligatoire","Accord CPAM nécessaire","Indemnités complémentaires possibles","Durée limitée (renouvelable)"],alerte:null}},
    {id:93,name:"Aménagement handicap",category:"handicap",tags:["RQTH"],days:[{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"},{h:6,type:"normal"}],desc:"Horaires aménagés RQTH",legal:"✅ Obligation aménagement",risk:"aucun",conseil:{titre:"♿ Aménagement Handicap",message:"RQTH : employeur doit aménager.",actions:["Aménagements raisonnables obligatoires","Temps travail adapté possible","Poste adapté si nécessaire","Maintien salaire selon modalités"],alerte:null}},
    {id:94,name:"Télétravail médical",category:"sante",tags:["télétravail santé"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Télétravail prescription",legal:"⚠️ Recommandation médicale",risk:"aucun",conseil:{titre:"🏥 Télétravail Médical",message:"Recommandation médecin travail = poids important.",actions:["Employeur doit examiner sérieusement","Refus doit être motivé","Peut être temporaire","Alternative aménagement possible"],alerte:{niveau:"info",texte:"🏥 Recommandation médicale : à considérer"}}},
    {id:95,name:"Accident travail",category:"sante",tags:["AT"],days:[],desc:"Arrêt suite accident",legal:"✅ Protection AT",risk:"aucun",conseil:{titre:"🏥 Accident Travail",message:"Accident travail = protection renforcée.",actions:["Déclaration employeur 48h obligatoire","Indemnisation majorée CPAM","Maintien salaire intégral (conditions)","Protection licenciement pendant arrêt"],alerte:null}},
    {id:96,name:"Maladie professionnelle",category:"sante",tags:["MP"],days:[],desc:"Reconnaissance MP",legal:"✅ Protection MP",risk:"aucun",conseil:{titre:"🏥 Maladie Professionnelle",message:"MP reconnue = droits spécifiques.",actions:["Déclaration CPAM dans 2 ans","Indemnisation majorée","Reclassement obligatoire si possible","Inaptitude : recherche reclassement"],alerte:null}},
    {id:97,name:"Inaptitude partielle",category:"sante",tags:["restriction"],days:[{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Restrictions médicales",legal:"⚠️ Recherche reclassement",risk:"faible",conseil:{titre:"🏥 Inaptitude Partielle",message:"Restrictions : employeur cherche reclassement.",actions:["Médecin travail définit restrictions","Employeur recherche poste adapté (1 mois)","Maintien salaire pendant recherche","Licenciement si reclassement impossible"],alerte:{niveau:"warning",texte:"🏥 Restrictions : reclassement obligatoire"}}},
    {id:98,name:"Burn-out",category:"sante",tags:["épuisement"],days:[],desc:"Arrêt épuisement pro",legal:"⚠️ Arrêt maladie classique",risk:"moyen",conseil:{titre:"🏥 Épuisement Pro",message:"Burn-out = arrêt maladie standard actuellement.",actions:["Certificat médecin traitant","Pas reconnaissance MP automatique","Employeur doit évaluer risques psycho","Retour : entretien préalable recommandé"],alerte:{niveau:"warning",texte:"🏥 Burn-out : arrêt + évaluation risques"}}},
    {id:99,name:"Longue maladie",category:"sante",tags:["ALD"],days:[],desc:"Arrêt > 6 mois",legal:"⚠️ Affection longue durée",risk:"moyen",conseil:{titre:"🏥 Longue Maladie",message:"Arrêt > 6 mois : maintien emploi fragilisé.",actions:["Remplacement possible au-delà 1 an","Maintien salaire limité dans temps","ALD : prise charge 100% CPAM","Contact RH régulier conseillé"],alerte:{niveau:"warning",texte:"🏥 > 6 mois : risque remplacement"}}},
    {id:100,name:"Reprise après inaptitude",category:"sante",tags:["reprise"],days:[{h:4,type:"normal"},{h:5,type:"normal"},{h:6,type:"normal"},{h:7,type:"normal"},{h:7,type:"normal"}],desc:"Reprise progressive",legal:"✅ Reprise adaptée",risk:"aucun",conseil:{titre:"🏥 Reprise Après Inaptitude",message:"Reprise = visite médicale obligatoire.",actions:["Visite reprise médecin travail obligatoire","Aménagement poste selon avis","Période adaptation possible","Suivi médical renforcé"],alerte:null}},
{
  id: 101,
  name: "Visite médicale embauche",
  category: "sante",
  tags: ["médecine travail"],
  days: [
    { h: 7, type: "normal" },
    { h: 7, type: "normal" },
    { h: 7, type: "normal" },
    { h: 7, type: "normal" },
    { h: 7, type: "normal" }
  ],
  desc: "Visite d'information et de prévention",
  legal: "✅ Visite obligatoire",
  risk: "aucun",
  conseil: {
    titre: "🏥 Médecine du Travail",
    message: "Visite d'information dans les 3 mois suivant l'embauche.",
    actions: [
      "Organisée par l'employeur",
      "Gratuite pour le salarié",
      "Temps de travail effectif",
      "Permet l'adaptation du poste si besoin"
    ],
    alerte: null
  }
},
{
  id: 102,
  name: "Visite périodique",
  category: "sante",
  tags: ["suivi médical"],
  days: [
    { h: 7, type: "normal" },
    { h: 7, type: "normal" },
    { h: 7, type: "normal" },
    { h: 7, type: "normal" },
    { h: 7, type: "normal" }
  ],
  desc: "Suivi médical régulier",
  legal: "✅ Périodicité définie",
  risk: "aucun",
  conseil: {
    titre: "🏥 Suivi Médical",
    message: "Visite tous les 5 ans (3 ans si risques).",
    actions: [
      "Périodicité selon exposition aux risques",
      "Organisée par l'employeur",
      "Peut déboucher sur aménagements",
      "Confidentialité médicale garantie"
    ],
    alerte: null
  }
},
{
  id: 103,
  name: "Visite reprise maladie",
  category: "sante",
  tags: ["reprise"],
  days: [
    { h: 7, type: "normal" },
    { h: 7, type: "normal" },
    { h: 7, type: "normal" },
    { h: 7, type: "normal" },
    { h: 7, type: "normal" }
  ],
  desc: "Examen après arrêt >30j",
  legal: "✅ Visite reprise obligatoire",
  risk: "aucun",
  conseil: {
    titre: "🏥 Visite Reprise",
    message: "Obligatoire après arrêt >30 jours ou AT/MP.",
    actions: [
      "Organisée dans les 8 jours du retour",
      "Évalue aptitude au poste",
      "Peut proposer aménagements",
      "Préalable à la reprise effective"
    ],
    alerte: null
  }
},
  {
    "id": 104,
    "name": "Aménagement poste santé",
    "category": "sante",
    "tags": ["adaptation"],
    "days": [{"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}],
    "desc": "Poste adapté temporairement",
    "legal": "✅ Avis médecin travail",
    "risk": "aucun",
    "conseil": {
      "titre": "🏥 Poste Adapté",
      "message": "Aménagement suite avis médecin du travail.",
      "actions": ["Prescription temporaire ou permanente", "Maintien rémunération selon modalités", "Réévaluation périodique", "Recherche reclassement si permanent"],
      "alerte": null
    }
  },
  {
    "id": 105,
    "name": "Grossesse déclarée",
    "category": "sante",
    "tags": ["maternité", "protection"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Travail pendant grossesse",
    "legal": "✅ Protection renforcée",
    "risk": "aucun",
    "conseil": {
      "titre": "👶 Grossesse",
      "message": "Protection spécifique dès déclaration.",
      "actions": ["Autorisations absences examens médicaux", "Interdiction licenciement (sauf faute grave)", "Aménagements poste possibles", "Congé maternité : 16 semaines minimum"],
      "alerte": null
    }
  },
  {
    "id": 106,
    "name": "Don de sang",
    "category": "sante",
    "tags": ["don", "autorisation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Absence pour don du sang",
    "legal": "✅ Autorisation légale",
    "risk": "aucun",
    "conseil": {
      "titre": "💉 Don du Sang",
      "message": "Absence autorisée pour don.",
      "actions": ["Durée : temps nécessaire au don", "Non rémunéré sauf convention collective", "Justificatif EFS à fournir", "Ne peut être refusé"],
      "alerte": null
    }
  },
  {
    "id": 107,
    "name": "Vaccination obligatoire",
    "category": "sante",
    "tags": ["obligation sanitaire"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Vaccination secteur santé",
    "legal": "✅ Obligation secteur",
    "risk": "aucun",
    "conseil": {
      "titre": "💉 Vaccination Obligatoire",
      "message": "Certains secteurs imposent des vaccinations.",
      "actions": ["Santé, petite enfance : vaccinations définies", "Prise en charge employeur", "Temps vaccination = temps travail", "Suspension possible si refus"],
      "alerte": null
    }
  },
  {
    "id": 108,
    "name": "Évaluation risques pro",
    "category": "sante",
    "tags": ["DUERP", "prévention"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Participation Document Unique",
    "legal": "✅ DUERP obligatoire",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Document Unique",
      "message": "Évaluation des risques professionnels.",
      "actions": ["Document Unique obligatoire toutes entreprises", "Mise à jour annuelle minimum", "Consultation salariés prévue", "Actions prévention définies"],
      "alerte": null
    }
  },
  {
    "id": 109,
    "name": "Formation sécurité",
    "category": "sante",
    "tags": ["SST", "formation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Formation SST suivie",
    "legal": "✅ Formation sécurité",
    "risk": "aucun",
    "conseil": {
      "titre": "🚑 Formation SST",
      "message": "Sauveteur Secouriste du Travail.",
      "actions": ["Durée : 14h (2 jours)", "Recyclage tous les 2 ans", "Temps de travail effectif", "Certificat délivré"],
      "alerte": null
    }
  },
  {
    "id": 110,
    "name": "Incendie évacuation",
    "category": "sante",
    "tags": ["exercice", "sécurité"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Exercice évacuation annuel",
    "legal": "✅ Exercice obligatoire",
    "risk": "aucun",
    "conseil": {
      "titre": "🔥 Exercice Évacuation",
      "message": "2 exercices annuels minimum.",
      "actions": ["Fréquence : semestrielle minimum", "Participation obligatoire", "Temps travail effectif", "Formation évacuateurs"],
      "alerte": null
    }
  },
  {
    "id": 111,
    "name": "Équipement EPI",
    "category": "sante",
    "tags": ["protection", "équipement"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Port EPI obligatoire",
    "legal": "✅ Fourniture employeur",
    "risk": "aucun",
    "conseil": {
      "titre": "🦺 EPI",
      "message": "Équipements Protection Individuelle fournis.",
      "actions": ["Fourniture gratuite par employeur", "Port obligatoire si risque", "Vérification périodique", "Remplacement si défectueux"],
      "alerte": null
    }
  },
  {
    "id": 112,
    "name": "Exposition amiante",
    "category": "sante",
    "tags": ["amiante", "traçabilité"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Travaux zone amiantée",
    "legal": "⚠️ Suivi spécifique",
    "risk": "moyen",
    "conseil": {
      "titre": "⚠️ Exposition Amiante",
      "message": "Suivi médical renforcé obligatoire.",
      "actions": ["Attestation exposition délivrée", "Surveillance médicale post-exposition 50 ans", "Formation risques amiante", "Certification SS3 ou SS4 selon travaux"],
      "alerte": {
        "niveau": "warning",
        "texte": "⚠️ Amiante : traçabilité exposition 50 ans"
      }
      }
  },
  {
    "id": 113,
    "name": "Travail isolé forêt",
    "category": "sante",
    "tags": ["isolement", "risque"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Travailleur isolé terrain",
    "legal": "⚠️ Dispositif protection",
    "risk": "moyen",
    "conseil": {
      "titre": "👤 Travail Isolé",
      "message": "Dispositifs de protection requis.",
      "actions": ["DATI (Dispositif Alarme Travailleur Isolé)", "Vérifications régulières", "Moyens communication garantis", "Procédure alerte définie"],
      "alerte": {
        "niveau": "info",
        "texte": "👤 Isolement : dispositif protection obligatoire"
      }
    }
  },
  {
    "id": 114,
    "name": "Canicule organisation",
    "category": "sante",
    "tags": ["chaleur", "adaptation"],
    "days": [{"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}],
    "desc": "Fortes chaleurs",
    "legal": "⚠️ Mesures adaptation",
    "risk": "moyen",
    "conseil": {
      "titre": "🌡️ Fortes Chaleurs",
      "message": "Adaptation organisation nécessaire.",
      "actions": ["Mise à disposition eau fraîche", "Aménagement horaires si possible", "Pauses régulières", "Local climatisé ou ventilé"],
      "alerte": {
        "niveau": "warning",
        "texte": "🌡️ Canicule : mesures adaptation obligatoires"
      }
    }
  },
  {
    "id": 115,
    "name": "Grand froid",
    "category": "sante",
    "tags": ["températures", "protection"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Travail températures négatives",
    "legal": "⚠️ Protection spécifique",
    "risk": "moyen",
    "conseil": {
      "titre": "❄️ Grand Froid",
      "message": "Travail par températures extrêmes.",
      "actions": ["Vêtements adaptés fournis", "Pauses réchauffement régulières", "Boissons chaudes à disposition", "Surveillance santé renforcée"],
      "alerte": {
        "niveau": "info",
        "texte": "❄️ Froid : équipements protection fournis"
      }
    }
  },
  {
    "id": 116,
    "name": "Risque chimique",
    "category": "sante",
    "tags": ["produits", "exposition"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Manipulation produits chimiques",
    "legal": "⚠️ Traçabilité expositions",
    "risk": "moyen",
    "conseil": {
      "titre": "☣️ Risque Chimique",
      "message": "Exposition produits dangereux tracée.",
      "actions": ["Fiche exposition individuelle", "Suivi médical renforcé", "Formation manipulation obligatoire", "EPI adaptés fournis"],
      "alerte": {
        "niveau": "warning",
        "texte": "☣️ Chimique : traçabilité exposition"
      }
    }
  },
  {
    "id": 117,
    "name": "Bruit excessif",
    "category": "sante",
    "tags": ["nuisance", "audition"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Exposition >85dB",
    "legal": "⚠️ Protection auditive",
    "risk": "moyen",
    "conseil": {
      "titre": "🔊 Exposition Bruit",
      "message": "Protection auditive au-delà 80dB.",
      "actions": ["Protections auditives obligatoires >85dB", "Audiogramme régulier", "Aménagements acoustiques", "Formation risques auditifs"],
      "alerte": {
        "niveau": "info",
        "texte": "🔊 >85dB : protections auditives obligatoires"
      }
    }
  },
  {
    "id": 118,
    "name": "Vibrations machines",
    "category": "sante",
    "tags": ["TMS", "prévention"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Utilisation outils vibrants",
    "legal": "⚠️ Valeurs limites",
    "risk": "moyen",
    "conseil": {
      "titre": "📳 Vibrations",
      "message": "Exposition vibrations réglementée.",
      "actions": ["Valeurs limites définies", "Surveillance médicale si dépassement", "Gants anti-vibrations", "Limitation temps exposition"],
      "alerte": {
        "niveau": "info",
        "texte": "📳 Vibrations : surveillance exposition"
      }
    }
  },
  {
    "id": 119,
    "name": "Écran quotidien",
    "category": "sante",
    "tags": ["informatique", "fatigue"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Travail écran >4h/jour",
    "legal": "✅ Pause écran",
    "risk": "faible",
    "conseil": {
      "titre": "💻 Travail Écran",
      "message": "Pauses recommandées toutes les 2h.",
      "actions": ["Pause 5-10min toutes les 2h conseillée", "Ergonomie poste vérifiée", "Visite ophtalmologique possible", "Règle 20-20-20 : pause visuelle"],
      "alerte": null
    }
  },
  {
    "id": 120,
    "name": "Port charges lourdes",
    "category": "sante",
    "tags": ["manutention", "TMS"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Manutention manuelle",
    "legal": "⚠️ Limites poids",
    "risk": "moyen",
    "conseil": {
      "titre": "📦 Port Charges",
      "message": "Limites poids selon sexe et âge.",
      "actions": ["Hommes adultes : 55kg max occasionnel", "Femmes adultes : 25kg max occasionnel", "Formation gestes et postures", "Aide mécanique si dépassement"],
      "alerte": {
        "niveau": "info",
        "texte": "📦 Charges lourdes : formation gestes obligatoire"
      }
    }
  },
  {
    "id": 121,
    "name": "Congés payés annuels",
    "category": "conge",
    "tags": ["CP", "acquisition"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Prise congés annuels",
    "legal": "✅ Droit acquis",
    "risk": "aucun",
    "conseil": {
      "titre": "🏖️ Congés Payés",
      "message": "2,5 jours ouvrables par mois travaillé.",
      "actions": ["30 jours ouvrables = 5 semaines par an", "Période de référence : juin-mai", "Prise selon accord employeur", "Fractionnement possible"],
      "alerte": null
    }
  },
  {
    "id": 122,
    "name": "Congés fractionnés",
    "category": "conge",
    "tags": ["fractionnement"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Congés pris en plusieurs fois",
    "legal": "✅ Jours fractionnement",
    "risk": "aucun",
    "conseil": {
      "titre": "🏖️ Fractionnement",
      "message": "Congés en plusieurs périodes.",
      "actions": ["Congé principal : minimum 12 jours continus", "Jours fractionnement si <12j en été", "Accord employeur sur dates", "Planification anticipée"],
      "alerte": null
    }
  },
  {
    "id": 123,
    "name": "Congé ancienneté",
    "category": "conge",
    "tags": ["ancienneté"],
    "days": [],
    "desc": "Jours supplémentaires ancienneté",
    "legal": "⚠️ Selon convention",
    "risk": "aucun",
    "conseil": {
      "titre": "📅 Ancienneté",
      "message": "Jours supplémentaires selon convention.",
      "actions": ["Vérifiez convention collective", "Généralement : +1j après 10-15 ans", "Cumul avec congés légaux", "Prise selon calendrier"],
      "alerte": null
    }
  },
  {
    "id": 124,
    "name": "Congé sans solde",
    "category": "conge",
    "tags": ["non payé"],
    "days": [],
    "desc": "Absence non rémunérée",
    "legal": "⚠️ Accord employeur",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Congé Sans Solde",
      "message": "Suspension contrat sans rémunération.",
      "actions": ["Accord employeur nécessaire", "Durée définie à l’avance", "Pas d’acquisition droits pendant période", "Réintégration garantie"],
      "alerte": null
    }
  },
  {
    "id": 125,
    "name": "Congé décès",
    "category": "conge",
    "tags": ["deuil"],
    "days": [],
    "desc": "Décès proche",
    "legal": "✅ Congés pour événements",
    "risk": "aucun",
    "conseil": {
      "titre": "🕊️ Congé Décès",
      "message": "Jours selon lien familial.",
      "actions": ["Conjoint/enfant/parent : 5 jours", "Frère/sœur : 3 jours", "Justificatif acte décès", "Rémunération maintenue"],
      "alerte": null
    }
  },
  {
    "id": 126,
    "name": "Congé mariage",
    "category": "conge",
    "tags": ["mariage"],
    "days": [],
    "desc": "Mariage du salarié",
    "legal": "✅ Congé événement",
    "risk": "aucun",
    "conseil": {
      "titre": "💍 Mariage",
      "message": "4 jours pour mariage salarié.",
      "actions": ["Mariage salarié : 4 jours", "Mariage enfant : 1 jour (selon convention)", "PACS : selon convention collective", "Délai prévenance raisonnable"],
      "alerte": null
    }
  },
  {
    "id": 127,
    "name": "Congé naissance",
    "category": "conge",
    "tags": ["naissance"],
    "days": [],
    "desc": "Naissance enfant",
    "legal": "✅ Congé naissance",
    "risk": "aucun",
    "conseil": {
      "titre": "👶 Naissance",
      "message": "3 jours naissance + congé paternité.",
      "actions": ["Naissance : 3 jours dans 15 jours suivants", "+ Congé paternité : 28 jours calendaires", "Rémunération maintenue (3j)", "Justificatif acte naissance"],
      "alerte": null
    }
  },
  {
    "id": 128,
    "name": "Congé déménagement",
    "category": "conge",
    "tags": ["déménagement"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Jour déménagement",
    "legal": "⚠️ Selon convention",
    "risk": "aucun",
    "conseil": {
      "titre": "🚚 Déménagement",
      "message": "1-2 jours selon conventions collectives.",
      "actions": ["Vérifiez convention collective", "Généralement 1-2 jours rémunérés", "Justificatif à fournir", "Délai prévenance"],
      "alerte": null
    }
  },
  {
    "id": 129,
    "name": "Congé jury assises",
    "category": "conge",
    "tags": ["jury", "citoyen"],
    "days": [],
    "desc": "Convocation jury citoyen",
    "legal": "✅ Autorisation légale",
    "risk": "aucun",
    "conseil": {
      "titre": "⚖️ Jury Assises",
      "message": "Autorisation absence obligatoire.",
      "actions": ["Convocation = obligation civique", "Indemnisation justice", "Employeur ne peut refuser", "Maintien emploi garanti"],
      "alerte": null
    }
  },
  {
    "id": 130,
    "name": "Congé formation syndicale",
    "category": "conge",
    "tags": ["syndical", "formation"],
    "days": [],
    "desc": "Formation syndicale",
    "legal": "✅ Droit syndical",
    "risk": "aucun",
    "conseil": {
      "titre": "📚 Formation Syndicale",
      "message": "Congés formation syndicale.",
      "actions": ["12 jours maximum par an", "Non rémunéré (pris en charge syndicat)", "Autorisation préalable nécessaire", "Protection statut"],
      "alerte": null
    }
  },
  {
    "id": 131,
    "name": "Absence maladie ordinaire",
    "category": "absence",
    "tags": ["arrêt"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Maladie courte",
    "legal": "✅ Indemnisation CPAM",
    "risk": "aucun",
    "conseil": {
      "titre": "🏥 Maladie",
      "message": "Indemnisation dès 4e jour.",
      "actions": ["Certificat médical sous 48h", "IJSS à partir du 4e jour", "Maintien partiel employeur selon ancienneté", "Contre-visite patronale possible"],
      "alerte": null
    }
  },
  {
    "id": 132,
    "name": "Absence consultation médicale",
    "category": "absence",
    "tags": ["médecin"],
    "days": [{"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}],
    "desc": "RDV médical ponctuel",
    "legal": "⚠️ Tolérance usuelle",
    "risk": "aucun",
    "conseil": {
      "titre": "🏥 RDV Médical",
      "message": "Autorisations selon usage entreprise.",
      "actions": ["Privilégier hors horaires travail", "Justificatif médical", "Selon usage : rémunéré ou non", "Prévenir à l’avance"],
      "alerte": null
    }
  },
  {
    "id": 133,
    "name": "Absence examen permis",
    "category": "absence",
    "tags": ["permis conduire"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Passage permis de conduire",
    "legal": "⚠️ Selon convention",
    "risk": "aucun",
    "conseil": {
      "titre": "🚗 Permis Conduire",
      "message": "Autorisation selon convention collective.",
      "actions": ["Vérifiez convention collective", "Généralement : 1 jour autorisé", "Non rémunéré sauf disposition", "Convocation à présenter"],
      "alerte": null
    }
  },
  {
    "id": 134,
    "name": "Absence convocation préfecture",
    "category": "absence",
    "tags": ["administratif"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Convocation administrative",
    "legal": "✅ Selon nature convocation",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Convocation Admin",
      "message": "Autorisation selon nature.",
      "actions": ["Convocation obligatoire : autorisation due", "Justificatif convocation à présenter", "Rémunération : selon nature", "Prévenir employeur"],
      "alerte": null
    }
  },
  {
    "id": 135,
    "name": "Grève participation",
    "category": "absence",
    "tags": ["grève", "droit"],
    "days": [],
    "desc": "Journée de grève",
    "legal": "✅ Droit de grève",
    "risk": "aucun",
    "conseil": {
      "titre": "✊ Droit de Grève",
      "message": "Droit constitutionnel, non rémunéré.",
      "actions": ["Exercice libre sans autorisation", "Non rémunération (retenue 1/30e)", "Protection contre sanctions", "Préavis dans services publics"],
      "alerte": null
    }
  },
  {
    "id": 136,
    "name": "Lock-out",
    "category": "absence",
    "tags": ["fermeture", "conflit"],
    "days": [],
    "desc": "Fermeture exceptionnelle",
    "legal": "⚠️ Maintien salaire",
    "risk": "aucun",
    "conseil": {
      "titre": "🔒 Lock-Out",
      "message": "Fermeture temporaire entreprise.",
      "actions": ["Maintien rémunération si décision employeur", "Chômage partiel possible", "Situation exceptionnelle", "Information instances représentatives"],
      "alerte": null
    }
  },
  {
    "id": 137,
    "name": "Intempéries BTP",
    "category": "absence",
    "tags": ["météo", "chômage"],
    "days": [],
    "desc": "Arrêt travail intempéries",
    "legal": "✅ Chômage intempéries",
    "risk": "aucun",
    "conseil": {
      "titre": "🌧️ Intempéries",
      "message": "Indemnisation chômage intempéries.",
      "actions": ["Spécifique secteur BTP", "Indemnisation caisse congés", "Conditions météo définies", "Reprise dès conditions permettent"],
      "alerte": null
    }
  },
  {
    "id": 138,
    "name": "Panne transport public",
    "category": "absence",
    "tags": ["transport", "retard"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Grève transports",
    "legal": "⚠️ Pas force majeure automatique",
    "risk": "faible",
    "conseil": {
      "titre": "🚇 Grève Transports",
      "message": "Grève transports : justification absence.",
      "actions": ["Recherche solutions alternatives", "Télétravail si possible", "Justificatifs perturbations", "Retenue salaire possible selon circonstances"],
      "alerte": {
        "niveau": "info",
        "texte": "🚇 Grève transports : solutions alternatives"
      }
    }
  },
  {
    "id": 139,
    "name": "Garde enfant imprévue",
    "category": "absence",
    "tags": ["enfant", "urgence"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Absence garde enfant",
    "legal": "⚠️ Congé enfant malade",
    "risk": "aucun",
    "conseil": {
      "titre": "👶 Garde Enfant",
      "message": "Congé enfant malade selon conditions.",
      "actions": ["3-5 jours selon âge et nombre enfants", "Certificat médical obligatoire", "Non rémunéré sauf convention", "Protection emploi si conditions"],
      "alerte": null
    }
  },
  {
    "id": 140,
    "name": "Examens médicaux obligatoires",
    "category": "absence",
    "tags": ["prévention", "grossesse"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Examens médicaux légaux",
    "legal": "✅ Autorisation légale",
    "risk": "aucun",
    "conseil": {
      "titre": "🏥 Examens Obligatoires",
      "message": "Examens prévus par la loi.",
      "actions": ["Grossesse : 7 examens obligatoires", "Médecine du travail : visites réglementaires", "Temps travail effectif", "Rémunération maintenue"],
      "alerte": null
    }
  },
  {
    "id": 141,
    "name": "Période essai standard",
    "category": "contrat",
    "tags": ["essai", "évaluation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "En période d’essai",
    "legal": "✅ Période probatoire",
    "risk": "aucun",
    "conseil": {
      "titre": "📝 Période Essai",
      "message": "Évaluation réciproque des parties.",
      "actions": ["Durée selon qualification (2-4 mois)", "Rupture libre avec préavis réduit", "Renouvellement possible si prévu au contrat", "Évaluation régulière"],
      "alerte": null
    }
  },
  {
    "id": 142,
    "name": "Fin période essai",
    "category": "contrat",
    "tags": ["rupture", "essai"],
    "days": [],
    "desc": "Rupture période essai",
    "legal": "✅ Rupture simplifiée",
    "risk": "aucun",
    "conseil": {
      "titre": "📝 Fin Essai",
      "message": "Rupture possible pendant période essai.",
      "actions": ["Préavis : 24h à 2 semaines selon durée", "Pas indemnité rupture", "Chômage : droits maintenus", "Pas obligation motivation"],
      "alerte": null
    }
  },
  {
    "id": 143,
    "name": "CDD saisonnier",
    "category": "contrat",
    "tags": ["saison", "temporaire"],
    "days": [{"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}],
    "desc": "Contrat emploi saisonnier",
    "legal": "✅ CDD spécifique",
    "risk": "aucun",
    "conseil": {
      "titre": "🌞 CDD Saisonnier",
      "message": "Contrat lié activité saisonnière.",
      "actions": ["Pas délai carence entre contrats", "Pas indemnité précarité", "Reconduction possible année suivante", "Durée selon saison"],
      "alerte": null
    }
  },
  {
    "id": 144,
    "name": "CDD remplacement",
    "category": "contrat",
    "tags": ["remplacement", "absent"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "CDD remplacement salarié",
    "legal": "✅ Motif précis",
    "risk": "aucun",
    "conseil": {
      "titre": "🔄 CDD Remplacement",
      "message": "Remplacement salarié absent.",
      "actions": ["Nom remplacé mentionné au contrat", "Durée : pendant absence", "Pas indemnité fin contrat", "Renouvellement si absence prolongée"],
      "alerte": null
    }
  },
  {
    "id": 145,
    "name": "CDD accroissement activité",
    "category": "contrat",
    "tags": ["surcroît", "temporaire"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "CDD surcroît activité",
    "legal": "✅ CDD classique",
    "risk": "aucun",
    "conseil": {
      "titre": "📈 CDD Accroissement",
      "message": "Activité temporairement accrue.",
      "actions": ["Durée maximum : 18 mois", "Indemnité précarité : 10%", "Délai carence : 1/3 durée contrat", "Renouvellement possible 2 fois"],
      "alerte": null
    }
  },
  {
    "id": 146,
    "name": "Intérim mission",
    "category": "contrat",
    "tags": ["intérim", "mission"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Mission intérimaire",
    "legal": "✅ Travail temporaire",
    "risk": "aucun",
    "conseil": {
      "titre": "🔄 Intérim",
      "message": "Emploi via agence travail temporaire.",
      "actions": ["Contrat mission précis", "Indemnité fin mission : 10%", "Congés payés inclus (10%)", "Égalité traitement avec permanents"],
      "alerte": null
    }
  },
  {
    "id": 147,
    "name": "Stage convention",
    "category": "contrat",
    "tags": ["stage", "étudiant"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Stagiaire avec convention",
    "legal": "✅ Gratification obligatoire",
    "risk": "aucun",
    "conseil": {
      "titre": "🎓 Stage",
      "message": "Gratification si >2 mois.",
      "actions": [">2 mois consécutifs : gratification minimum", "Montant : 15% plafond SS (~600€/mois)", "Pas contrat travail = pas salaire", "Maximum : 6 mois par année d’enseignement"],
      "alerte": null
    }
  },
  {
    "id": 148,
    "name": "Apprentissage",
    "category": "contrat",
    "tags": ["alternance", "apprenti"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Contrat apprentissage",
    "legal": "✅ Formation en alternance",
    "risk": "aucun",
    "conseil": {
      "titre": "🎓 Apprentissage",
      "message": "Contrat alternance jusqu’à 29 ans.",
      "actions": ["Salaire selon âge et année (25-100% SMIC)", "1 jour/semaine minimum en CFA", "Durée : 6 mois à 3 ans", "Aide au permis : 500€ possible"],
      "alerte": null
    }
  },
  {
    "id": 149,
    "name": "Professionnalisation",
    "category": "contrat",
    "tags": ["alternance", "qualification"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Contrat professionnalisation",
    "legal": "✅ Contrat qualification",
    "risk": "aucun",
    "conseil": {
      "titre": "🎓 Professionnalisation",
      "message": "Alternance tous âges.",
      "actions": ["CDD 6-24 mois ou CDI avec action pro", "Salaire selon âge et qualification (55-100%)", "15-25% temps en formation", "Tutorat en entreprise"],
      "alerte": null
    }
  },
  {
    "id": 150,
    "name": "Contrat aidé",
    "category": "contrat",
    "tags": ["insertion", "PEC"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Parcours Emploi Compétences",
    "legal": "✅ Aide insertion",
    "risk": "aucun",
    "conseil": {
      "titre": "🤝 Contrat Aidé",
      "message": "PEC : aide publique insertion.",
      "actions": ["Secteur non-marchand principalement", "Accompagnement formation prévu", "CDD ou CDI", "Aide État pour employeur"],
      "alerte": null
    }
  },
  {
    "id": 151,
    "name": "CDI intérimaire",
    "category": "contrat",
    "tags": ["intérim", "CDI"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "CDI Intérimaire (CDII)",
    "legal": "✅ Statut particulier",
    "risk": "aucun",
    "conseil": {
      "titre": "🔄 CDI Intérimaire",
      "message": "CDI avec missions successives.",
      "actions": ["Rémunération maintenue entre missions", "Période adaptation entre missions", "Même protection CDI classique", "Formation régulière"],
      "alerte": null
    }
  },
  {
    "id": 152,
    "name": "Clause objectifs",
    "category": "contrat",
    "tags": ["performance", "objectifs"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Rémunération variable",
    "legal": "⚠️ Objectifs atteignables",
    "risk": "aucun",
    "conseil": {
      "titre": "🎯 Objectifs",
      "message": "Part variable selon résultats.",
      "actions": ["Objectifs doivent être réalisables", "Critères précis et mesurables", "Révision périodique", "Partie fixe garantie"],
      "alerte": null
    }
  },
  {
    "id": 153,
    "name": "Astreinte contractuelle",
    "category": "contrat",
    "tags": ["astreinte", "disponibilité"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Astreintes prévues contrat",
    "legal": "⚠️ Compensation définie",
    "risk": "aucun",
    "conseil": {
      "titre": "📱 Astreintes",
      "message": "Périodes astreinte régulières.",
      "actions": ["Fréquence et indemnisation au contrat", "Planning prévisionnel", "Intervention = heures travail", "Droit refus si non contractuel"],
      "alerte": null
    }
  },
  {
    "id": 154,
    "name": "Clause dédit formation",
    "category": "contrat",
    "tags": ["formation", "engagement"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Formation coûteuse suivie",
    "legal": "⚠️ Engagement durée",
    "risk": "aucun",
    "conseil": {
      "titre": "📚 Clause Dédit",
      "message": "Remboursement si départ anticipé.",
      "actions": ["Durée engagement proportionnelle", "Montant dégressif dans temps", "Formation qualifiante longue/coûteuse", "Accord écrit obligatoire"],
      "alerte": null
    }
  },
  {
    "id": 155,
    "name": "Clause confidentialité",
    "category": "contrat",
    "tags": ["secret", "discrétion"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Obligation confidentialité",
    "legal": "✅ Loyauté contractuelle",
    "risk": "aucun",
    "conseil": {
      "titre": "🤐 Confidentialité",
      "message": "Discrétion informations sensibles.",
      "actions": ["Périmètre défini au contrat", "Sanctions si violation", "Persiste après rupture contrat", "Secrets fabrication protégés"],
      "alerte": null
    }
  },
  {
    "id": 156,
    "name": "Temps partiel choisi",
    "category": "contrat",
    "tags": ["80%", "choix"],
    "days": [{"h": 5.6, "type": "normal"}, {"h": 5.6, "type": "normal"}, {"h": 5.6, "type": "normal"}, {"h": 5.6, "type": "normal"}, {"h": 5.6, "type": "normal"}],
    "desc": "Temps partiel 80%",
    "legal": "✅ Avenant écrit",
    "risk": "aucun",
    "conseil": {
      "titre": "⏱️ 80%",
      "message": "Temps partiel 28h/semaine.",
      "actions": ["Avenant précisant durée et répartition", "Heures complémentaires : max 10%", "Retour temps plein facilité", "Droits proratisés"],
      "alerte": null
    }
  },
  {
    "id": 157,
    "name": "Compte épargne temps",
    "category": "contrat",
    "tags": ["CET", "épargne"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Alimentation CET",
    "legal": "✅ Dispositif épargne",
    "risk": "aucun",
    "conseil": {
      "titre": "💰 CET",
      "message": "Épargne congés et heures.",
      "actions": ["Alimentation : CP, RTT, heures sup", "Utilisation : congé, formation, retraite", "Transfert possible entre employeurs", "Plafond selon accord"],
      "alerte": null
    }
  },
  {
    "id": 158,
    "name": "Jours RTT annuels",
    "category": "organisation",
    "tags": ["RTT", "repos"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Attribution RTT",
    "legal": "✅ Réduction temps travail",
    "risk": "aucun",
    "conseil": {
      "titre": "📅 RTT",
      "message": "Jours repos compensant >35h.",
      "actions": ["Nombre selon durée hebdomadaire", "Moitié à l’initiative employeur", "Moitié au choix salarié", "Délai prévenance respecté"],
      "alerte": null
    }
  },
  {
    "id": 159,
    "name": "Semaine 4,5 jours",
    "category": "organisation",
    "tags": ["mercredi", "temps partiel"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 3.5, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Mi-temps mercredi",
    "legal": "✅ Organisation particulière",
    "risk": "aucun",
    "conseil": {
      "titre": "📅 Organisation Spéciale",
      "message": "Semaine 4,5 jours travaillés.",
      "actions": ["Avenant écrit précisant organisation", "31,5h/semaine", "Heures complémentaires encadrées", "Adaptation familiale"],
      "alerte": null
    }
  },
  {
    "id": 160,
    "name": "Convention forfait heures",
    "category": "forfait",
    "tags": ["forfait", "heures"],
    "days": [{"h": 9, "type": "normal"}, {"h": 9, "type": "normal"}, {"h": 9, "type": "normal"}, {"h": 9, "type": "normal"}, {"h": 8, "type": "normal"}],
    "desc": "Forfait 39h/semaine",
    "legal": "✅ Forfait défini",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Forfait Heures",
      "message": "Nombre heures fixé au contrat.",
      "actions": ["Exemple : 39h avec 4h sup intégrées", "Rémunération lissée", "Limites quotidiennes maintenues", "Au-delà forfait : heures sup additionnelles"],
      "alerte": null
    }
  },
  {
    "id": 161,
    "name": "Boulangerie nuit",
    "category": "commerce",
    "tags": ["boulangerie", "nuit"],
    "days": [{"h": 8, "type": "nuit"}, {"h": 8, "type": "nuit"}, {"h": 8, "type": "nuit"}, {"h": 8, "type": "nuit"}, {"h": 8, "type": "nuit"}],
    "desc": "Cuisson de nuit",
    "legal": "⚠️ Dérogation permanente",
    "risk": "moyen",
    "conseil": {
      "titre": "🥖 Boulangerie",
      "message": "Dérogation travail nuit boulangerie.",
      "actions": ["Dérogation permanente autorisée", "Repos compensateur adapté", "Surveillance médicale renforcée", "Majorations nuit applicables"],
      "alerte": {
        "niveau": "info",
        "texte": "🥖 Boulangerie : dérogation nuit"
      }
    }
  },
  {
    "id": 162,
    "name": "Presse distribution",
    "category": "presse",
    "tags": ["journaux", "matinale"],
    "days": [{"h": 5, "type": "nuit"}, {"h": 5, "type": "nuit"}, {"h": 5, "type": "nuit"}, {"h": 5, "type": "nuit"}, {"h": 5, "type": "nuit"}],
    "desc": "Distribution journaux tôt",
    "legal": "⚠️ Horaires spécifiques",
    "risk": "faible",
    "conseil": {
      "titre": "📰 Presse",
      "message": "Distribution matinale journaux.",
      "actions": ["Début très matinal autorisé", "Durée réduite compensatoire", "Convention collective presse", "Repos quotidien respecté"],
      "alerte": null
    }
  },
  {
    "id": 163,
    "name": "Spectacle représentation",
    "category": "spectacle",
    "tags": ["soirée", "culture"],
    "days": [{"h": 10, "type": "normal"}, {"h": 10, "type": "normal"}],
    "desc": "Représentations théâtre",
    "legal": "⚠️ Régime dérogatoire",
    "risk": "faible",
    "conseil": {
      "titre": "🎭 Spectacle",
      "message": "Horaires atypiques spectacle.",
      "actions": ["Amplitude adaptée représentations", "Repos compensateur", "Convention collective spectacle", "Intermittence possible"],
      "alerte": null
    }
  },
  {
    "id": 164,
    "name": "Discothèque nuit",
    "category": "hotellerie",
    "tags": ["nuit", "soirée"],
    "days": [{"h": 8, "type": "nuit"}, {"h": 8, "type": "nuit"}, {"h": 8, "type": "saturday"}],
    "desc": "Travail nuit discothèque",
    "legal": "⚠️ HCR dérogations",
    "risk": "moyen",
    "conseil": {
      "titre": "🎵 Discothèque",
      "message": "Nuits régulières secteur festif.",
      "actions": ["Convention HCR applicable", "Majorations nuit cumul weekend", "Repos compensateur renforcé", "Surveillance santé"],
      "alerte": {
        "niveau": "warning",
        "texte": "🎵 Nuits répétées : surveillance santé"
      }
    }
  },
  {
    "id": 165,
    "name": "Station ski saison",
    "category": "tourisme",
    "tags": ["saisonnier", "montagne"],
    "days": [{"h": 9, "type": "normal"}, {"h": 9, "type": "normal"}, {"h": 9, "type": "normal"}, {"h": 9, "type": "normal"}, {"h": 9, "type": "normal"}, {"h": 9, "type": "saturday"}, {"h": 9, "type": "sunday"}],
    "desc": "Haute saison ski",
    "legal": "⚠️ Saisonnier intensif",
    "risk": "moyen",
    "conseil": {
      "titre": "⛷️ Station Ski",
      "message": "Saison hivernale intensive.",
      "actions": ["CDD saisonnier usage", "7j/7 période haute saison", "Repos hebdo par roulement", "Fin saison : récupération"],
      "alerte": {
        "niveau": "warning",
        "texte": "⛷️ Saison : 7j/7 temporaire"
      }
    }
  },
  {
    "id": 166,
    "name": "Camping été",
    "category": "tourisme",
    "tags": ["été", "hébergement"],
    "days": [{"h": 10, "type": "normal"}, {"h": 10, "type": "normal"}, {"h": 10, "type": "normal"}, {"h": 10, "type": "normal"}, {"h": 10, "type": "normal"}, {"h": 10, "type": "saturday"}],
    "desc": "Saison estivale camping",
    "legal": "⚠️ HPA dérogations",
    "risk": "moyen",
    "conseil": {
      "titre": "⛺ Camping",
      "message": "Saison estivale intensive.",
      "actions": ["Convention HPA (Hôtellerie Plein Air)", "Amplitude étendue été", "Récupération hors saison", "Logement souvent fourni"],
      "alerte": {
        "niveau": "info",
        "texte": "⛺ Été : amplitude étendue"
      }
    }
  },
  {
    "id": 167,
    "name": "Agriculture récolte",
    "category": "agriculture",
    "tags": ["vendanges", "récolte"],
    "days": [{"h": 10, "type": "normal"}, {"h": 10, "type": "normal"}, {"h": 10, "type": "normal"}, {"h": 10, "type": "normal"}, {"h": 10, "type": "normal"}, {"h": 10, "type": "saturday"}],
    "desc": "Période vendanges",
    "legal": "⚠️ Saisonnier agricole",
    "risk": "moyen",
    "conseil": {
      "titre": "🍇 Vendanges",
      "message": "Récolte intensive temporaire.",
      "actions": ["CDD vendanges spécifique", "Durée max : 1 mois", "Amplitude adaptée météo", "Déclaration simplifiée"],
      "alerte": {
        "niveau": "info",
        "texte": "🍇 Vendanges : CDD spécifique"
      }
    }
  },
  {
    "id": 168,
    "name": "Mareyeur nuit",
    "category": "commerce",
    "tags": ["poisson", "criée"],
    "days": [{"h": 8, "type": "nuit"}, {"h": 8, "type": "nuit"}, {"h": 8, "type": "nuit"}, {"h": 8, "type": "nuit"}, {"h": 8, "type": "nuit"}],
    "desc": "Criée poissons matinale",
    "legal": "⚠️ Dérogation marée",
    "risk": "moyen",
    "conseil": {
      "titre": "🐟 Mareyage",
      "message": "Travail nuit produits mer.",
      "actions": ["Dérogation fraîcheur produits", "Horaires liés marées", "Repos compensateur", "Surveillance médicale"],
      "alerte": {
        "niveau": "info",
        "texte": "🐟 Criée : horaires marées"
      }
    }
  },
  {
    "id": 169,
    "name": "Taxi/VTC nuit",
    "category": "transport",
    "tags": ["nuit", "conduite"],
    "days": [{"h": 10, "type": "nuit"}, {"h": 10, "type": "nuit"}, {"h": 10, "type": "nuit"}],
    "desc": "Courses nocturnes",
    "legal": "⚠️ Amplitude conduite",
    "risk": "moyen",
    "conseil": {
      "titre": "🚕 Taxi Nuit",
      "message": "Conduite nocturne régulière.",
      "actions": ["Amplitude quotidienne : 12h max", "Temps conduite : 9h/jour max", "Repos quotidien 11h impératif", "Pause 20min toutes les 4h30"],
      "alerte": {
        "niveau": "warning",
        "texte": "🚕 Conduite nuit : amplitude stricte"
      }
    }
  },
  {
    "id": 170,
    "name": "Animateur colo",
    "category": "animation",
    "tags": ["séjour", "surveillance"],
    "days": [{"h": 12, "type": "normal"}, {"h": 12, "type": "normal"}, {"h": 12, "type": "normal"}, {"h": 12, "type": "normal"}, {"h": 12, "type": "normal"}, {"h": 12, "type": "saturday"}, {"h": 12, "type": "sunday"}],
    "desc": "Séjour vacances enfants",
    "legal": "⚠️ Régime particulier",
    "risk": "moyen",
    "conseil": {
      "titre": "🏕️ Animateur",
      "message": "Présence continue séjours.",
      "actions": ["Convention collective animation", "Récupération après séjour", "12h = amplitude, pas travail continu", "Diplôme requis (BAFA/BAFD)"],
      "alerte": {
        "niveau": "warning",
        "texte": "🏕️ Colo : récupération post-séjour"
      }
    }
  },
  {
    "id": 171,
    "name": "Surveillant internat",
    "category": "enseignement",
    "tags": ["nuit", "surveillance"],
    "days": [{"h": 10, "type": "nuit"}, {"h": 10, "type": "nuit"}, {"h": 10, "type": "nuit"}, {"h": 10, "type": "nuit"}],
    "desc": "Surveillance nuit internat",
    "legal": "⚠️ Éducation nationale",
    "risk": "moyen",
    "conseil": {
      "titre": "🏫 Internat",
      "message": "Surveillance nocturne élèves.",
      "actions": ["Statut fonction publique si public", "Temps présence ≠ travail effectif", "Logement fourni", "Récupération prévue"],
      "alerte": null
    }
  },
  {
    "id": 172,
    "name": "Pompier professionnel",
    "category": "securite",
    "tags": ["garde", "24h"],
    "days": [{"h": 24, "type": "normal"}],
    "desc": "Garde caserne 24h",
    "legal": "⚠️ Statut spécifique",
    "risk": "moyen",
    "conseil": {
      "titre": "🚒 Pompier",
      "message": "Garde 24h caserne.",
      "actions": ["Fonction publique territoriale", "Temps présence avec astreinte", "Interventions = travail effectif", "Repos compensateur adapté"],
      "alerte": null
    }
  },
  {
    "id": 173,
    "name": "Marin pêche",
    "category": "maritime",
    "tags": ["mer", "marée"],
    "days": [],
    "desc": "Campagne pêche",
    "legal": "⚠️ Droit maritime",
    "risk": "moyen",
    "conseil": {
      "titre": "⚓ Pêche Maritime",
      "message": "Embarquement campagne pêche.",
      "actions": ["Droit maritime spécifique", "Rémunération souvent à la part", "Durée selon type pêche", "Repos terre entre campagnes"],
      "alerte": null
    }
  },
  {
    "id": 174,
    "name": "Personnel navigant",
    "category": "transport",
    "tags": ["avion", "équipage"],
    "days": [{"h": 12, "type": "normal"}, {"h": 12, "type": "normal"}],
    "desc": "Vols long-courriers",
    "legal": "⚠️ Aviation civile",
    "risk": "moyen",
    "conseil": {
      "titre": "✈️ Personnel Navigant",
      "message": "Équipage aérien commercial.",
      "actions": ["Réglementation EASA (européenne)", "Temps vol limité (900h/an)", "Repos adapté décalages horaires", "Surveillance médicale renforcée"],
      "alerte": null
    }
  },
  {
    "id": 175,
    "name": "Travailleur plateforme",
    "category": "digital",
    "tags": ["indépendant", "plateforme"],
    "days": [{"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}],
    "desc": "Livraison plateforme",
    "legal": "⚠️ Statut débattu",
    "risk": "moyen",
    "conseil": {
      "titre": "📦 Plateforme",
      "message": "Travail via plateforme numérique.",
      "actions": ["Statut : souvent indépendant", "Loi d’Avenir (2024) : protections renforcées", "Accident : couverture prévue", "Revenus déclarés charges sociales"],
      "alerte": {
        "niveau": "warning",
        "texte": "📦 Plateforme : vérifiez statut et protections"
      }
    }
  },
  {
    "id": 176,
    "name": "Influenceur rémunéré",
    "category": "digital",
    "tags": ["contenu", "création"],
    "days": [{"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}],
    "desc": "Création contenu marques",
    "legal": "⚠️ Statut à définir",
    "risk": "faible",
    "conseil": {
      "titre": "📱 Création Contenu",
      "message": "Rémunération création contenu.",
      "actions": ["Statut : auto-entrepreneur ou société", "Contrats partenariats formalisés", "Déclaration revenus obligatoire", "Droits auteur selon cas"],
      "alerte": null
    }
  },
  {
    "id": 177,
    "name": "Testeur jeux vidéo",
    "category": "digital",
    "tags": ["gaming", "QA"],
    "days": [{"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}],
    "desc": "Test qualité jeux",
    "legal": "✅ Salarié ou prestataire",
    "risk": "aucun",
    "conseil": {
      "titre": "🎮 Testeur Gaming",
      "message": "Emploi classique secteur jeu vidéo.",
      "actions": ["CDD ou CDI selon structures", "Convention Syntec souvent applicable", "Heures sup selon convention", "Crunch time : surveiller heures"],
      "alerte": null
    }
  },
  {
    "id": 178,
    "name": "Streamer professionnel",
    "category": "digital",
    "tags": ["streaming", "live"],
    "days": [{"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}, {"h": 8, "type": "normal"}],
    "desc": "Live streaming régulier",
    "legal": "⚠️ Indépendant",
    "risk": "aucun",
    "conseil": {
      "titre": "📹 Streaming",
      "message": "Activité streaming professionnalisée.",
      "actions": ["Statut indépendant généralement", "Déclaration revenus obligatoire", "Partenariats = BNC", "Charges sociales à anticiper"],
      "alerte": null
    }
  },
  {
    "id": 179,
    "name": "Garde corps humain",
    "category": "securite",
    "tags": ["protection", "VIP"],
    "days": [{"h": 12, "type": "normal"}, {"h": 12, "type": "normal"}, {"h": 12, "type": "normal"}],
    "desc": "Protection rapprochée",
    "legal": "⚠️ Carte professionnelle",
    "risk": "moyen",
    "conseil": {
      "titre": "🛡️ Protection Rapprochée",
      "message": "Garde du corps professionnel.",
      "actions": ["Carte professionnelle obligatoire", "Amplitude horaire étendue", "Majorations selon convention sécurité", "Temps présence selon mission"],
      "alerte": null
    }
  },
  {
    "id": 180,
    "name": "Détective privé",
    "category": "service",
    "tags": ["enquête", "surveillance"],
    "days": [{"h": 10, "type": "normal"}, {"h": 10, "type": "normal"}, {"h": 10, "type": "normal"}, {"h": 10, "type": "normal"}],
    "desc": "Missions enquête",
    "legal": "⚠️ Agrément requis",
    "risk": "faible",
    "conseil": {
      "titre": "🔍 Détective",
      "message": "Enquêtes privées réglementées.",
      "actions": ["Agrément CNAPS obligatoire", "Horaires variables selon missions", "Indépendant ou salarié agence", "Respect vie privée strict"],
      "alerte": null
    }
  },
  {
    "id": 181,
    "name": "Cumul emplois privés",
    "category": "cumul",
    "tags": ["deux emplois"],
    "days": [{"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}],
    "desc": "Deux employeurs simultanés",
    "legal": "⚠️ Durées cumulées",
    "risk": "moyen",
    "conseil": {
      "titre": "👔 Double Emploi",
      "message": "Cumul emplois autorisé sous conditions.",
      "actions": ["Durée maximale : 48h/semaine cumulées", "Repos quotidien 11h à respecter", "Clause exclusivité : vérifier contrats", "Pas concurrence entre employeurs"],
      "alerte": {
        "niveau": "warning",
        "texte": "👔 Cumul : surveiller durées totales"
      }
    }
  },
  {
    "id": 182,
    "name": "Salarié + auto-entrepreneur",
    "category": "cumul",
    "tags": ["indépendant", "complément"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Salariat + activité indépendante",
    "legal": "⚠️ Loyauté envers employeur",
    "risk": "faible",
    "conseil": {
      "titre": "💼 Salarié + AE",
      "message": "Cumul possible avec précautions.",
      "actions": ["Clause exclusivité : vérifier contrat", "Pas concurrence avec employeur", "Double affiliation sociale", "Activité sur temps libre uniquement"],
      "alerte": {
        "niveau": "info",
        "texte": "💼 Cumul : loyauté envers employeur"
      }
    }
  },
  {
    "id": 183,
    "name": "Enseignant + vacations",
    "category": "cumul",
    "tags": ["enseignement", "complément"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Cours + vacations autres établissements",
    "legal": "✅ Heures complémentaires",
    "risk": "aucun",
    "conseil": {
      "titre": "🎓 Enseignant + Vacations",
      "message": "Heures complémentaires autorisées.",
      "actions": ["Limite heures complémentaires", "Cumul rémunérations autorisé", "Repos hebdomadaire à préserver", "Déclaration vacations"],
      "alerte": null
    }
  },
  {
    "id": 184,
    "name": "Retraité + emploi",
    "category": "cumul",
    "tags": ["retraite", "activité"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Cumul emploi-retraite",
    "legal": "✅ Cumul encadré",
    "risk": "aucun",
    "conseil": {
      "titre": "👴 Cumul Emploi-Retraite",
      "message": "Activité après pension possible.",
      "actions": ["Cumul intégral si taux plein + âge légal", "Sinon : plafonds revenus", "Pas nouveaux droits retraite", "Déclarations séparées"],
      "alerte": null
    }
  },
  {
    "id": 185,
    "name": "Étudiant + job",
    "category": "cumul",
    "tags": ["étudiant", "emploi"],
    "days": [{"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}],
    "desc": "Études + travail mi-temps",
    "legal": "✅ Compatible",
    "risk": "aucun",
    "conseil": {
      "titre": "🎓 Étudiant Salarié",
      "message": "Cumul études-emploi courant.",
      "actions": ["Mi-temps recommandé pour études", "Statut étudiant maintenu si <60% temps plein", "Cotisations retraite validées", "Jobs étudiants exonérés (limites)"],
      "alerte": null
    }
  },
  {
    "id": 186,
    "name": "Mandat syndical + emploi",
    "category": "cumul",
    "tags": ["syndical", "heures"],
    "days": [{"h": 5, "type": "normal"}, {"h": 5, "type": "normal"}, {"h": 5, "type": "normal"}, {"h": 5, "type": "normal"}, {"h": 5, "type": "normal"}],
    "desc": "Délégué syndical",
    "legal": "✅ Crédit heures",
    "risk": "aucun",
    "conseil": {
      "titre": "✊ Mandat Syndical",
      "message": "Heures délégation rémunérées.",
      "actions": ["Crédit heures selon effectif entreprise", "Temps de travail effectif", "Protection statut représentant", "Formation syndicale possible"],
      "alerte": null
    }
  },
  {
    "id": 187,
    "name": "CSE + emploi temps partiel",
    "category": "cumul",
    "tags": ["élu", "représentant"],
    "days": [{"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}],
    "desc": "Élu CSE temps partiel",
    "legal": "✅ Heures proratisées",
    "risk": "aucun",
    "conseil": {
      "titre": "🗳️ Élu Temps Partiel",
      "message": "Crédit heures adapté au temps partiel.",
      "actions": ["Heures délégation non proratisées", "Même protection qu’à temps plein", "Réunions CSE = temps travail", "Dépassement heures possible si nécessaire"],
      "alerte": null
    }
  },
  {
    "id": 188,
    "name": "Accident trajet + télétravail",
    "category": "sante",
    "tags": ["accident", "hybride"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Accident trajet domicile-bureau",
    "legal": "⚠️ Trajet protégé",
    "risk": "aucun",
    "conseil": {
      "titre": "🚗 Accident Trajet",
      "message": "Protection accident travail applicable.",
      "actions": ["Trajet domicile-lieu habituel protégé", "Détour personnel : perd protection", "Télétravail : trajet non protégé (déjà sur lieu)", "Déclaration 24h"],
      "alerte": null
    }
  },
  {
    "id": 189,
    "name": "Grossesse + télétravail",
    "category": "familial",
    "tags": ["maternité", "remote"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Télétravail enceinte",
    "legal": "✅ Aménagements possibles",
    "risk": "aucun",
    "conseil": {
      "titre": "👶 Grossesse Télétravail",
      "message": "Aménagements facilitant possible.",
      "actions": ["Télétravail facilitant souvent accepté", "Autorisations absences examens maintenues", "Réduction temps si avis médical", "Protection licenciement identique"],
      "alerte": null
    }
  },
  {
    "id": 190,
    "name": "Handicap + télétravail",
    "category": "handicap",
    "tags": ["RQTH", "remote"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Télétravail aménagement handicap",
    "legal": "✅ Aménagement raisonnable",
    "risk": "aucun",
    "conseil": {
      "titre": "♿ Handicap Télétravail",
      "message": "Télétravail comme aménagement.",
      "actions": ["Recommandation médecin travail = poids", "Aménagements matériels fournis", "Maintien lien équipe", "Pas discrimination"],
      "alerte": null
    }
  },
  {
    "id": 191,
    "name": "Formation + chômage partiel",
    "category": "formation",
    "tags": ["activité partielle", "FNE"],
    "days": [{"h": 3, "type": "normal"}, {"h": 3, "type": "normal"}, {"h": 3, "type": "normal"}],
    "desc": "Formation pendant chômage partiel",
    "legal": "✅ FNE Formation",
    "risk": "aucun",
    "conseil": {
      "titre": "📚 Formation Activité Partielle",
      "message": "Formation pendant baisse activité.",
      "actions": ["FNE-Formation : 100% pris en charge", "Temps formation = temps travail", "Maintien rémunération", "Développement compétences"],
      "alerte": null
    }
  },
  {
    "id": 192,
    "name": "Expatriation + retour",
    "category": "mobilite",
    "tags": ["international", "réintégration"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Retour après mission étranger",
    "legal": "✅ Réintégration",
    "risk": "aucun",
    "conseil": {
      "titre": "🏠 Retour Expatriation",
      "message": "Retour après mission internationale.",
      "actions": ["Poste équivalent garanti", "Accompagnement réadaptation", "Valorisation expérience internationale", "Régularisation sociale France"],
      "alerte": null
    }
  },
  {
    "id": 193,
    "name": "Licenciement économique + FNE",
    "category": "rupture",
    "tags": ["économique", "formation"],
    "days": [],
    "desc": "Formation avant licenciement",
    "legal": "✅ Sécurisation parcours",
    "risk": "aucun",
    "conseil": {
      "titre": "📚 Formation Reclassement",
      "message": "Formation avant départ entreprise.",
      "actions": ["Bilan compétences proposé", "Formation reclassement financée", "Maintien rémunération", "Accompagnement recherche emploi"],
      "alerte": null
    }
  },
  {
    "id": 194,
    "name": "Rupture conventionnelle + formation",
    "category": "rupture",
    "tags": ["projet", "transition"],
    "days": [],
    "desc": "Rupture pour projet formation",
    "legal": "✅ CPF transition",
    "risk": "aucun",
    "conseil": {
      "titre": "🎓 Rupture Formation",
      "message": "Départ pour projet professionnel.",
      "actions": ["CPF Transition : financement formation longue", "Rupture conventionnelle permet chômage", "Formation pendant chômage possible", "Projet validé commission paritaire"],
      "alerte": null
    }
  },
  {
    "id": 195,
    "name": "Démission + CPF",
    "category": "rupture",
    "tags": ["démission", "reconversion"],
    "days": [],
    "desc": "Démission projet certifiant",
    "legal": "✅ Démission légitime",
    "risk": "aucun",
    "conseil": {
      "titre": "📚 Démission Reconversion",
      "message": "Projet formation = chômage possible.",
      "actions": ["Projet reconversion validé : droits chômage", "Formation certifiante ou création entreprise", "Validation commission paritaire", "CPF mobilisable"],
      "alerte": null
    }
  },
  {
    "id": 196,
    "name": "Inaptitude + reclassement",
    "category": "sante",
    "tags": ["inaptitude", "recherche"],
    "days": [],
    "desc": "Recherche poste adapté",
    "legal": "⚠️ Obligation reclassement",
    "risk": "moyen",
    "conseil": {
      "titre": "🏥 Reclassement",
      "message": "Recherche poste compatible santé.",
      "actions": ["Employeur recherche 1 mois", "Consultation CSE obligatoire", "Maintien salaire pendant recherche", "Licenciement si impossible (indemnités doublées)"],
      "alerte": {
        "niveau": "warning",
        "texte": "🏥 Reclassement : délai 1 mois"
      }
    }
  },
  {
    "id": 197,
    "name": "Maladie longue durée + maintien",
    "category": "sante",
    "tags": ["ALD", "maintien"],
    "days": [],
    "desc": "Arrêt prolongé >6 mois",
    "legal": "⚠️ Maintien emploi fragilisé",
    "risk": "moyen",
    "conseil": {
      "titre": "🏥 Longue Maladie",
      "message": "Arrêt prolongé fragilise emploi.",
      "actions": ["Remplacement possible au-delà 1 an", "ALD : prise charge 100% CPAM", "Maintien salaire limité", "Contact RH régulier conseillé"],
      "alerte": {
        "niveau": "warning",
        "texte": "🏥 >6 mois : risque remplacement"
      }
    }
  },
  {
    "id": 198,
    "name": "Burn-out reconnu + adaptation",
    "category": "sante",
    "tags": ["RPS", "prévention"],
    "days": [{"h": 5, "type": "normal"}, {"h": 5, "type": "normal"}, {"h": 5, "type": "normal"}, {"h": 5, "type": "normal"}, {"h": 5, "type": "normal"}],
    "desc": "Retour après épuisement",
    "legal": "✅ Prévention RPS",
    "risk": "moyen",
    "conseil": {
      "titre": "🏥 Retour Burn-Out",
      "message": "Reprise après épuisement professionnel.",
      "actions": ["Visite reprise médecin travail", "Aménagements poste selon avis", "Évaluation risques psychosociaux", "Charge travail allégée progressivement"],
      "alerte": {
        "niveau": "info",
        "texte": "🏥 Burn-out : aménagements reprise"
      }
    }
  },
  {
    "id": 199,
    "name": "Harcèlement signalé + protection",
    "category": "conflit",
    "tags": ["harcèlement", "procédure"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Procédure interne harcèlement",
    "legal": "✅ Protection lanceur alerte",
    "risk": "moyen",
    "conseil": {
      "titre": "📢 Signalement Harcèlement",
      "message": "Protection contre représailles.",
      "actions": ["Référent harcèlement disponible", "Enquête interne obligatoire", "Protection contre sanctions", "Médiation possible"],
      "alerte": {
        "niveau": "info",
        "texte": "📢 Harcèlement : protection signalement"
      }
    }
  },
  {
    "id": 200,
    "name": "Transaction signée + fin",
    "category": "juridique",
    "tags": ["accord", "transaction"],
    "days": [],
    "desc": "Accord transactionnel conclu",
    "legal": "✅ Fin différend",
    "risk": "aucun",
    "conseil": {
      "titre": "🤝 Transaction",
      "message": "Accord mettant fin au litige.",
      "actions": ["Concessions réciproques", "Irrévocable après signature", "Délai rétractation écoulé", "Exécution des engagements"],
      "alerte": null
    }
  }
,

  {
    "id": 201,
    "name": "Succession CDD",
    "category": "contrat",
    "tags": ["CDD", "enchaînement"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Enchaînement contrats durée déterminée",
    "legal": "✅ Règles encadrement",
    "risk": "aucun",
    "conseil": {
      "titre": "📄 CDD Successifs",
      "message": "L'enchaînement de CDD obéit à des règles précises.",
      "actions": ["Délai de carence : 1/3 de la durée du contrat précédent", "Exceptions : remplacement absent, emploi saisonnier, usage", "Durée maximale : 18 mois sur 36 mois (hors exceptions)", "Motif de recours doit être conforme à la législation"],
      "alerte": null
    }
  },
  {
    "id": 202,
    "name": "Renouvellement période essai",
    "category": "contrat",
    "tags": ["essai", "prolongation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Prolongation période d'essai",
    "legal": "✅ Modalités définies",
    "risk": "aucun",
    "conseil": {
      "titre": "📝 Période Essai",
      "message": "Le renouvellement suit une procédure établie.",
      "actions": ["Clause de renouvellement prévue au contrat initial", "Proposition faite avant la fin de la période en cours", "Accord écrit du salarié nécessaire", "Durées maximales selon statut : 2 à 4 mois + renouvellement"],
      "alerte": null
    }
  },
  {
    "id": 203,
    "name": "Avenant contractuel",
    "category": "contrat",
    "tags": ["modification", "accord"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Modification éléments contrat",
    "legal": "✅ Procédure d'accord",
    "risk": "aucun",
    "conseil": {
      "titre": "📝 Modification Contrat",
      "message": "Les modifications substantielles nécessitent un accord.",
      "actions": ["Rémunération, temps de travail, lieu : éléments substantiels", "Avenant écrit formalise l'accord bilatéral", "Délai de réflexion pour examen proposition", "Le refus est un droit, sans qualification de faute"],
      "alerte": null
    }
  },
  {
    "id": 204,
    "name": "Application clause mobilité",
    "category": "contrat",
    "tags": ["mobilité", "géographie"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Mise en œuvre mobilité géographique",
    "legal": "✅ Cadre contractuel",
    "risk": "aucun",
    "conseil": {
      "titre": "🗺️ Mobilité Géographique",
      "message": "La clause de mobilité définit une zone d'application.",
      "actions": ["Zone géographique précisée au contrat", "Délai de prévenance adapté (usage : 3 mois)", "Application dans le respect des termes contractuels", "Négociation conditions matérielles possible"],
      "alerte": null
    }
  },
  {
    "id": 205,
    "name": "Clause de non-concurrence",
    "category": "contrat",
    "tags": ["post-emploi", "concurrence"],
    "days": [],
    "desc": "Clause limitant activité future",
    "legal": "✅ Contrepartie financière",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Non-Concurrence",
      "message": "Cette clause s'accompagne d'une compensation.",
      "actions": ["Contrepartie financière obligatoire (usage : 30% salaire)", "Limitation temporelle définie (fréquent : 1-2 ans)", "Périmètre géographique délimité", "Possibilité de levée par l'employeur"],
      "alerte": null
    }
  },
  {
    "id": 206,
    "name": "Clause d'exclusivité",
    "category": "contrat",
    "tags": ["activité unique"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Interdiction cumul activités",
    "legal": "✅ Justification requise",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Clause Exclusivité",
      "message": "Cette clause encadre les activités parallèles.",
      "actions": ["Justification par intérêts légitimes de l'entreprise", "Portée limitée aux activités concurrentes généralement", "Congé création entreprise reste possible", "Activités accessoires peuvent être tolérées"],
      "alerte": null
    }
  },
  {
    "id": 207,
    "name": "Mise à pied conservatoire",
    "category": "disciplinaire",
    "tags": ["suspension", "procédure"],
    "days": [],
    "desc": "Suspension temporaire du contrat",
    "legal": "✅ Étape procédurale",
    "risk": "aucun",
    "conseil": {
      "titre": "⏸️ Mise à Pied Conservatoire",
      "message": "Il s'agit d'une mesure provisoire.",
      "actions": ["Suspension en attente de décision définitive", "Non rémunérée pendant la durée", "Entretien préalable organisé ensuite", "Décision finale intervient après examen situation"],
      "alerte": null
    }
  },
  {
    "id": 208,
    "name": "Sanction disciplinaire",
    "category": "disciplinaire",
    "tags": ["avertissement"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Mesure disciplinaire appliquée",
    "legal": "✅ Procédure encadrée",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Sanction Disciplinaire",
      "message": "Les sanctions suivent un cadre procédural.",
      "actions": ["Droit à l'explication et à la défense", "Proportionnalité entre faits et sanction", "Conservation au dossier limitée (3 ans)", "Voie de contestation ouverte"],
      "alerte": null
    }
  },
  {
    "id": 209,
    "name": "Modification poste disciplinaire",
    "category": "disciplinaire",
    "tags": ["changement", "affectation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Changement affectation",
    "legal": "✅ Accord si modification substantielle",
    "risk": "aucun",
    "conseil": {
      "titre": "🔄 Changement Poste",
      "message": "Certains changements requièrent un accord.",
      "actions": ["Modification substantielle : accord du salarié", "Simple changement conditions : pouvoir direction", "Distinction selon impact sur éléments essentiels", "Information et échange préalables"],
      "alerte": null
    }
  },
  {
    "id": 210,
    "name": "Accord transactionnel",
    "category": "juridique",
    "tags": ["transaction", "règlement"],
    "days": [],
    "desc": "Règlement amiable différend",
    "legal": "✅ Concessions réciproques",
    "risk": "aucun",
    "conseil": {
      "titre": "🤝 Transaction",
      "message": "Accord mettant fin à un désaccord.",
      "actions": ["Concessions réciproques entre les parties", "Caractère définitif une fois signé", "Délai de rétractation en cas de rupture (15j)", "Examen attentif avant signature recommandé"],
      "alerte": null
    }
  },
  {
    "id": 211,
    "name": "Rupture conventionnelle",
    "category": "rupture",
    "tags": ["accord", "séparation"],
    "days": [],
    "desc": "Séparation négociée",
    "legal": "✅ Procédure volontaire",
    "risk": "aucun",
    "conseil": {
      "titre": "🤝 Rupture Conventionnelle",
      "message": "Mode de séparation d'un commun accord.",
      "actions": ["Entretien(s) de négociation", "Délai de rétractation : 15 jours calendaires", "Indemnité au moins égale à l'indemnité légale", "Validation administrative après délais"],
      "alerte": null
    }
  },
  {
    "id": 212,
    "name": "Prise d'acte rupture",
    "category": "rupture",
    "tags": ["initiative salarié"],
    "days": [],
    "desc": "Rupture initiative salarié",
    "legal": "✅ Procédure contentieuse",
    "risk": "aucun",
    "conseil": {
      "titre": "⚖️ Prise d'Acte",
      "message": "Rupture unilatérale avec effet immédiat.",
      "actions": ["Manquements graves invoqués", "Appréciation judiciaire des motifs", "Qualification juridique déterminée par juge", "Effets selon gravité manquements retenus"],
      "alerte": null
    }
  },
  {
    "id": 213,
    "name": "Résiliation judiciaire",
    "category": "rupture",
    "tags": ["tribunal", "demande"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Demande rupture au tribunal",
    "legal": "✅ Procédure judiciaire",
    "risk": "aucun",
    "conseil": {
      "titre": "⚖️ Résiliation Judiciaire",
      "message": "Demande de rupture par voie judiciaire.",
      "actions": ["Maintien contrat pendant procédure", "Manquements invoqués examinés par tribunal", "Délai judiciaire habituel (12-24 mois)", "Assistance juridique appropriée"],
      "alerte": null
    }
  },
  {
    "id": 214,
    "name": "Absence prolongée non justifiée",
    "category": "rupture",
    "tags": ["abandon", "absence"],
    "days": [],
    "desc": "Absence sans justification",
    "legal": "✅ Présomption démission (15j)",
    "risk": "aucun",
    "conseil": {
      "titre": "📭 Absence Prolongée",
      "message": "Réforme 2023 : nouvelle procédure.",
      "actions": ["Mise en demeure après 15 jours absence", "Présomption démission si pas justification", "Délai réponse avant qualification", "Droits chômage selon qualification finale"],
      "alerte": null
    }
  },
  {
    "id": 215,
    "name": "Démission volontaire",
    "category": "rupture",
    "tags": ["départ", "initiative"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Départ à l'initiative du salarié",
    "legal": "✅ Procédure simple",
    "risk": "aucun",
    "conseil": {
      "titre": "👋 Démission",
      "message": "Rupture à l'initiative du salarié.",
      "actions": ["Préavis selon ancienneté et convention (1-3 mois)", "Manifestation claire et non équivoque", "Formalisme écrit recommandé", "Solde tout compte en fin de contrat"],
      "alerte": null
    }
  },
  {
    "id": 216,
    "name": "Départ volontaire retraite",
    "category": "rupture",
    "tags": ["retraite", "volontaire"],
    "days": [],
    "desc": "Départ à la retraite choisi",
    "legal": "✅ Droit personnel",
    "risk": "aucun",
    "conseil": {
      "titre": "👴 Départ Retraite",
      "message": "Départ volontaire dès conditions remplies.",
      "actions": ["Âge légal : 64 ans (réforme 2023)", "Préavis selon dispositions applicables", "Indemnité départ retraite si 10 ans ancienneté", "Liquidation droits à pension"],
      "alerte": null
    }
  },
  {
    "id": 217,
    "name": "Mise à la retraite",
    "category": "rupture",
    "tags": ["retraite", "employeur"],
    "days": [],
    "desc": "Départ retraite initiative employeur",
    "legal": "✅ Conditions d'âge strictes",
    "risk": "aucun",
    "conseil": {
      "titre": "👴 Mise à Retraite",
      "message": "Initiative employeur sous conditions.",
      "actions": ["Âge minimum : 70 ans", "Indemnité au moins égale à indemnité licenciement", "Accord salarié nécessaire entre 67-70 ans", "Procédure 3 mois avant date anniversaire"],
      "alerte": null
    }
  },
  {
    "id": 218,
    "name": "Licenciement motif économique",
    "category": "licenciement",
    "tags": ["économique", "suppression"],
    "days": [],
    "desc": "Rupture pour raison économique",
    "legal": "✅ Procédure spécifique",
    "risk": "aucun",
    "conseil": {
      "titre": "📉 Licenciement Économique",
      "message": "Rupture pour raison non liée à la personne.",
      "actions": ["Recherche reclassement préalable obligatoire", "Information-consultation instances représentatives", "Priorité réembauche pendant 1 an", "PSE si licenciements collectifs (10+/30j)"],
      "alerte": null
    }
  },
  {
    "id": 219,
    "name": "Licenciement personnel",
    "category": "licenciement",
    "tags": ["disciplinaire", "comportement"],
    "days": [],
    "desc": "Rupture motif lié à la personne",
    "legal": "✅ Cause réelle et sérieuse",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Licenciement Personnel",
      "message": "Rupture justifiée par motif personnel.",
      "actions": ["Entretien préalable obligatoire", "Notification écrite et motivée", "Préavis selon durée contrat", "Indemnités selon cause licenciement"],
      "alerte": null
    }
  },
  {
    "id": 220,
    "name": "Licenciement faute grave",
    "category": "licenciement",
    "tags": ["faute", "gravité"],
    "days": [],
    "desc": "Rupture immédiate pour faute",
    "legal": "✅ Gravité particulière",
    "risk": "aucun",
    "conseil": {
      "titre": "⚡ Faute Grave",
      "message": "Rupture immédiate du contrat de travail.",
      "actions": ["Impossibilité maintien dans entreprise", "Dispense préavis", "Indemnité licenciement non due", "Droits assurance chômage maintenus"],
      "alerte": null
    }
  },
  {
    "id": 221,
    "name": "Signalement difficulté relationnelle",
    "category": "conflit",
    "tags": ["climat", "relations"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Situation relationnelle tendue",
    "legal": "✅ Canaux d'alerte",
    "risk": "aucun",
    "conseil": {
      "titre": "💬 Difficultés Relationnelles",
      "message": "Plusieurs interlocuteurs disponibles.",
      "actions": ["Service RH : premier interlocuteur", "Médecin du travail : écoute et orientation", "Représentants du personnel : relais possible", "Traçabilité des situations par écrit utile"],
      "alerte": null
    }
  },
  {
    "id": 222,
    "name": "Traitement différencié",
    "category": "conflit",
    "tags": ["égalité", "traitement"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Différences de traitement constatées",
    "legal": "✅ Principe égalité",
    "risk": "aucun",
    "conseil": {
      "titre": "⚖️ Égalité de Traitement",
      "message": "Le principe d'égalité s'applique en entreprise.",
      "actions": ["Situations comparables traitées de manière égale", "Justification objective si différence", "Interlocuteurs : RH, représentants personnel", "Documentation situations facilitant échange"],
      "alerte": null
    }
  },
  {
    "id": 223,
    "name": "Comportements inappropriés",
    "category": "conflit",
    "tags": ["comportement", "signalement"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Comportements déplacés constatés",
    "legal": "✅ Procédures signalement",
    "risk": "aucun",
    "conseil": {
      "titre": "📢 Signalement",
      "message": "Des canaux de signalement existent.",
      "actions": ["Référent en matière de lutte contre harcèlement", "Ligne d'alerte si mise en place", "Protection contre représailles prévue", "Examen des signalements par l'employeur"],
      "alerte": null
    }
  },
  {
    "id": 224,
    "name": "Tension professionnelle",
    "category": "conflit",
    "tags": ["désaccord", "travail"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Désaccord sur méthodes travail",
    "legal": "✅ Dialogue social",
    "risk": "aucun",
    "conseil": {
      "titre": "💬 Désaccords Professionnels",
      "message": "Le dialogue permet de résoudre les différends.",
      "actions": ["Expression sur conditions de travail possible", "Médiation RH ou hiérarchie disponible", "Représentants personnel : soutien et conseil", "Écrit pour tracer position si nécessaire"],
      "alerte": null
    }
  },
  {
    "id": 225,
    "name": "Conflit avec management",
    "category": "conflit",
    "tags": ["hiérarchie", "relation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Difficulté relation hiérarchique",
    "legal": "✅ Médiation possible",
    "risk": "aucun",
    "conseil": {
      "titre": "👔 Relation Hiérarchique",
      "message": "Plusieurs solutions de médiation existent.",
      "actions": ["Entretien avec niveau hiérarchique supérieur", "Médiation par service RH", "Accompagnement représentants personnel", "Formalisation points de désaccord"],
      "alerte": null
    }
  },
  {
    "id": 226,
    "name": "Alerte interne",
    "category": "conflit",
    "tags": ["signalement", "procédure"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Utilisation procédure alerte",
    "legal": "✅ Protection lanceur",
    "risk": "aucun",
    "conseil": {
      "titre": "📢 Procédure Alerte",
      "message": "Cadre protecteur pour signalements.",
      "actions": ["Canal interne en premier lieu", "Bonne foi présumée", "Protection contre mesures défavorables", "Procédure définie (loi Sapin 2)"],
      "alerte": null
    }
  },
  {
    "id": 227,
    "name": "Situation danger potentiel",
    "category": "sante",
    "tags": ["sécurité", "retrait"],
    "days": [],
    "desc": "Risque identifié pour sécurité",
    "legal": "✅ Droit de retrait",
    "risk": "aucun",
    "conseil": {
      "titre": "🛑 Droit de Retrait",
      "message": "Possibilité de se retirer si danger.",
      "actions": ["Motif raisonnable de danger grave et imminent", "Alerte immédiate de l'employeur", "Maintien rémunération si motif légitime", "Enquête employeur obligatoire"],
      "alerte": null
    }
  },
  {
    "id": 228,
    "name": "Instruction contestée",
    "category": "conflit",
    "tags": ["ordre", "désaccord"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Désaccord sur instruction donnée",
    "legal": "✅ Hiérarchie et légalité",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Instructions",
      "message": "Pouvoir de direction et limites.",
      "actions": ["Lien hiérarchique implique instructions", "Ordre manifestement illégal peut être refusé", "Traçabilité refus et motifs recommandée", "Dialogue hiérarchique à privilégier"],
      "alerte": null
    }
  },
  {
    "id": 229,
    "name": "Réputation professionnelle",
    "category": "conflit",
    "tags": ["image", "réputation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Atteinte réputation au travail",
    "legal": "✅ Protection dignité",
    "risk": "aucun",
    "conseil": {
      "titre": "🛡️ Réputation",
      "message": "Respect de la dignité au travail.",
      "actions": ["Signalement RH des situations", "Documentation des faits", "Droit à rectification informations erronées", "Médiation possible"],
      "alerte": null
    }
  },
  {
    "id": 230,
    "name": "Médiation professionnelle",
    "category": "conflit",
    "tags": ["résolution", "dialogue"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Processus médiation engagé",
    "legal": "✅ Démarche volontaire",
    "risk": "aucun",
    "conseil": {
      "titre": "🤝 Médiation",
      "message": "Résolution amiable par tiers neutre.",
      "actions": ["Participation volontaire des parties", "Confidentialité des échanges garantie", "Médiateur externe ou interne", "Recherche solution acceptable mutuellement"],
      "alerte": null
    }
  },
  {
    "id": 231,
    "name": "Contact inspection travail",
    "category": "juridique",
    "tags": ["administration", "information"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Information administration travail",
    "legal": "✅ Possibilité contact",
    "risk": "aucun",
    "conseil": {
      "titre": "📞 Inspection Travail",
      "message": "Information sur application droit du travail.",
      "actions": ["Rôle conseil et contrôle", "Saisine possible pour information", "Compétence : durée travail, hygiène, sécurité", "Intervention selon appréciation service"],
      "alerte": null
    }
  },
  {
    "id": 232,
    "name": "Saisine autorité indépendante",
    "category": "juridique",
    "tags": ["médiation", "droits"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Recours Défenseur des Droits",
    "legal": "✅ Service gratuit",
    "risk": "aucun",
    "conseil": {
      "titre": "⚖️ Défenseur Droits",
      "message": "Autorité indépendante accessible gratuitement.",
      "actions": ["Compétence : discriminations, service public", "Médiation et recommandations", "Confidentialité assurée", "Recommandations non contraignantes"],
      "alerte": null
    }
  },
  {
    "id": 233,
    "name": "Recours juridictionnel",
    "category": "juridique",
    "tags": ["tribunal", "contentieux"],
    "days": [],
    "desc": "Saisine conseil prud'homal",
    "legal": "✅ Juridiction compétente",
    "risk": "aucun",
    "conseil": {
      "titre": "⚖️ Conseil Prud'hommes",
      "message": "Tribunal paritaire litiges individuels.",
      "actions": ["Gratuit (pas d'honoraires tribunal)", "Délai saisine : 12 mois connaissance faits", "Conciliation puis jugement", "Assistance possible (avocat, syndicat)"],
      "alerte": null
    }
  },
  {
    "id": 234,
    "name": "Expertise par CSE",
    "category": "instance",
    "tags": ["analyse", "expertise"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Expertise comité social",
    "legal": "✅ Outil d'analyse CSE",
    "risk": "aucun",
    "conseil": {
      "titre": "🔍 Expertise CSE",
      "message": "Analyse approfondie situations entreprise.",
      "actions": ["Financement employeur", "Domaines : risques, projets, restructurations", "Expert choisi par CSE", "Rapport remis CSE et employeur"],
      "alerte": null
    }
  },
  {
    "id": 235,
    "name": "Alerte CSE",
    "category": "instance",
    "tags": ["comité", "signalement"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Procédure d'alerte déclenchée",
    "legal": "✅ Droit d'alerte",
    "risk": "aucun",
    "conseil": {
      "titre": "🔔 Droit Alerte CSE",
      "message": "Procédure signalement situations.",
      "actions": ["Danger grave : enquête conjointe", "Atteinte droits : constatation employeur-CSE", "Protection salarié alerteur", "Mesures correctives si nécessaire"],
      "alerte": null
    }
  },
  {
    "id": 236,
    "name": "Procédure référé",
    "category": "juridique",
    "tags": ["urgence", "mesures"],
    "days": [],
    "desc": "Procédure urgence tribunal",
    "legal": "✅ Mesures provisoires",
    "risk": "aucun",
    "conseil": {
      "titre": "⚡ Référé",
      "message": "Procédure accélérée mesures provisoires.",
      "actions": ["Si urgence et contestation non sérieuse", "Décision rapide", "Mesures conservatoires ou provisoires", "Fond affaire reste à juger"],
      "alerte": null
    }
  },
  {
    "id": 237,
    "name": "Procédure interne",
    "category": "disciplinaire",
    "tags": ["instruction", "enquête"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Investigation interne en cours",
    "legal": "✅ Garanties procédurales",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Procédure",
      "message": "Respect droits de la défense.",
      "actions": ["Entretien avec possibilité explications", "Assistance possible (délégué, collègue)", "Délai entre entretien et décision", "Notification écrite décision motivée"],
      "alerte": null
    }
  },
  {
    "id": 238,
    "name": "Contestation décision",
    "category": "disciplinaire",
    "tags": ["recours", "voies"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Voie de recours ouverte",
    "legal": "✅ Droit contestation",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Recours",
      "message": "Contestation des décisions possible.",
      "actions": ["Médiation interne envisageable", "Saisine prud'homale (délai 12 mois)", "Appréciation proportionnalité par juge", "Prescription sanctions après 3 ans"],
      "alerte": null
    }
  },
  {
    "id": 239,
    "name": "Mandat représentatif",
    "category": "instance",
    "tags": ["protection", "élu"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Exercice mandat représentant",
    "legal": "✅ Statut protecteur",
    "risk": "aucun",
    "conseil": {
      "titre": "🛡️ Mandat Représentatif",
      "message": "Protection spécifique pendant mandat.",
      "actions": ["Protection contre mesures défavorables", "Heures de délégation rémunérées", "Formation spécifique au mandat", "Protection après mandat (6-12 mois)"],
      "alerte": null
    }
  },
  {
    "id": 240,
    "name": "Processus électoral",
    "category": "instance",
    "tags": ["élections", "représentation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Élections représentants personnel",
    "legal": "✅ Expression démocratique",
    "risk": "aucun",
    "conseil": {
      "titre": "🗳️ Élections CSE",
      "message": "Renouvellement représentation périodique.",
      "actions": ["Mandat 4 ans renouvelable", "Éligibilité : tous salariés (hors direction)", "Scrutin secret", "Organisations syndicales présentent listes"],
      "alerte": null
    }
  },
  {
    "id": 241,
    "name": "Organisation télétravail",
    "category": "teletravail",
    "tags": ["mise en place", "accord"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Formalisation télétravail",
    "legal": "✅ Accord ou charte",
    "risk": "aucun",
    "conseil": {
      "titre": "🏠 Télétravail",
      "message": "Organisation travail à distance formalisée.",
      "actions": ["Accord individuel ou charte collective", "Fréquence et modalités définies", "Réversibilité prévue", "Fourniture matériel par employeur"],
      "alerte": null
    }
  },
  {
    "id": 242,
    "name": "Télétravail exceptionnel",
    "category": "teletravail",
    "tags": ["circonstances", "adaptation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Télétravail situation particulière",
    "legal": "✅ Adaptation circonstances",
    "risk": "aucun",
    "conseil": {
      "titre": "🏠 Télétravail Circonstanciel",
      "message": "Organisation adaptée aux circonstances.",
      "actions": ["Situations exceptionnelles : pandémie, force majeure", "Maintien rémunération", "Équipement fourni", "Organisation temporaire ajustable"],
      "alerte": null
    }
  },
  {
    "id": 243,
    "name": "Demande télétravail",
    "category": "teletravail",
    "tags": ["demande", "examen"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Examen demande télétravail",
    "legal": "✅ Motivation réponse",
    "risk": "aucun",
    "conseil": {
      "titre": "📝 Demande Télétravail",
      "message": "Examen et réponse motivée.",
      "actions": ["Réponse motivée de l'employeur", "Critères objectifs d'appréciation", "Dialogue sur modalités possibles", "Pas de droit automatique sauf accord collectif"],
      "alerte": null
    }
  },
  {
    "id": 244,
    "name": "Incident télétravail",
    "category": "teletravail",
    "tags": ["accident", "domicile"],
    "days": [],
    "desc": "Accident pendant télétravail",
    "legal": "✅ Présomption pendant horaires",
    "risk": "aucun",
    "conseil": {
      "titre": "🏥 Accident Télétravail",
      "message": "Régime accident travail applicable.",
      "actions": ["Présomption accident travail si horaires travail", "Déclaration dans délais habituels (48h)", "Protection identique travail sur site", "Lien avec travail : éléments probants utiles"],
      "alerte": null
    }
  },
  {
    "id": 245,
    "name": "Outils contrôle activité",
    "category": "teletravail",
    "tags": ["suivi", "temps"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Dispositifs suivi activité",
    "legal": "✅ Encadrement RGPD",
    "risk": "aucun",
    "conseil": {
      "titre": "👁️ Suivi Activité",
      "message": "Contrôle encadré par réglementation.",
      "actions": ["Information préalable obligatoire", "Proportionnalité et justification", "Consultation instances représentatives", "Respect vie privée"],
      "alerte": null
    }
  },
  {
    "id": 246,
    "name": "Horaires joignabilité",
    "category": "teletravail",
    "tags": ["déconnexion", "disponibilité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Plages disponibilité définies",
    "legal": "✅ Droit déconnexion",
    "risk": "aucun",
    "conseil": {
      "titre": "📵 Déconnexion",
      "message": "Droit de ne pas être joignable hors horaires.",
      "actions": ["Charte entreprise (>50 salariés)", "Plages non-joignabilité respectées", "Messagerie hors horaires : pas d'obligation réponse", "Respect équilibre vie professionnelle/personnelle"],
      "alerte": null
    }
  },
  {
    "id": 247,
    "name": "Moyens fournis télétravail",
    "category": "teletravail",
    "tags": ["équipement", "fourniture"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Équipement travail à distance",
    "legal": "✅ Fourniture outils",
    "risk": "aucun",
    "conseil": {
      "titre": "💻 Équipement",
      "message": "Outils de travail fournis par employeur.",
      "actions": ["Matériel informatique mis à disposition", "Logiciels et accès fournis", "Participation frais possible (internet, etc.)", "Allocation télétravail selon accord"],
      "alerte": null
    }
  },
  {
    "id": 248,
    "name": "Mobilité géographique digitale",
    "category": "teletravail",
    "tags": ["travail nomade"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Travail depuis lieux variables",
    "legal": "✅ Accord préalable",
    "risk": "aucun",
    "conseil": {
      "titre": "🌍 Travail Nomade",
      "message": "Travail depuis différents lieux.",
      "actions": ["Accord employeur nécessaire", "Durée et modalités définies", "Implications administratives à vérifier", "Organisation compatible avec activité"],
      "alerte": null
    }
  },
  {
    "id": 249,
    "name": "Réunions distancielles",
    "category": "teletravail",
    "tags": ["visio", "écrans"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Multiplication visioconférences",
    "legal": "✅ Organisation adaptée",
    "risk": "aucun",
    "conseil": {
      "titre": "📹 Visioconférences",
      "message": "Organisation meetings à distance.",
      "actions": ["Pauses recommandées entre réunions", "Alternance formats (audio/vidéo)", "Règle 20-20-20 pour repos visuel", "Organisation réunions optimisée"],
      "alerte": null
    }
  },
  {
    "id": 250,
    "name": "Matériel personnel usage pro",
    "category": "digital",
    "tags": ["BYOD", "équipement"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Utilisation équipement personnel",
    "legal": "✅ Charte BYOD",
    "risk": "aucun",
    "conseil": {
      "titre": "📱 BYOD",
      "message": "Bring Your Own Device si autorisé.",
      "actions": ["Charte d'utilisation si pratique autorisée", "Séparation usage professionnel/personnel", "Sécurité données entreprise", "Compensation possible selon accord"],
      "alerte": null
    }
  },
  {
    "id": 251,
    "name": "Formation sécurité numérique",
    "category": "digital",
    "tags": ["cybersécurité", "sensibilisation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Sensibilisation cybersécurité",
    "legal": "✅ Formation obligatoire",
    "risk": "aucun",
    "conseil": {
      "titre": "🔐 Cybersécurité",
      "message": "Formation protection données.",
      "actions": ["Formation employeur obligatoire", "Bonnes pratiques : mots de passe, authentification", "Signalement incidents recommandé", "Responsabilité partagée sécurité"],
      "alerte": null
    }
  },
  {
    "id": 252,
    "name": "Incident données",
    "category": "digital",
    "tags": ["RGPD", "sécurité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Violation données constatée",
    "legal": "✅ Procédure notification",
    "risk": "aucun",
    "conseil": {
      "titre": "🔒 Violation Données",
      "message": "Procédure RGPD à suivre.",
      "actions": ["Notification CNIL sous 72h si risque élevé", "Information personnes concernées", "Responsabilité sécurité : employeur", "Mesures correctives à déployer"],
      "alerte": null
    }
  },
  {
    "id": 253,
    "name": "Accès données personnelles",
    "category": "digital",
    "tags": ["RGPD", "droits"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Demande accès informations",
    "legal": "✅ Droit accès RGPD",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Droit Accès",
      "message": "Consultation données personnelles.",
      "actions": ["Demande au responsable traitement ou DPO", "Réponse sous 1 mois", "Copie données gratuitement", "Droit rectification si inexactitudes"],
      "alerte": null
    }
  },
  {
    "id": 254,
    "name": "Consultation messagerie",
    "category": "digital",
    "tags": ["vie privée", "email"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Messagerie professionnelle",
    "legal": "✅ Présomption professionnelle",
    "risk": "aucun",
    "conseil": {
      "titre": "📧 Messagerie Pro",
      "message": "Usage messagerie professionnelle.",
      "actions": ["Présomption caractère professionnel", "Mention 'personnel' protège message", "Information préalable sur règles usage", "Consultation instances représentatives"],
      "alerte": null
    }
  },
  {
    "id": 255,
    "name": "Système géolocalisation",
    "category": "digital",
    "tags": ["traçabilité", "véhicule"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Dispositif suivi véhicule",
    "legal": "✅ Justification nécessaire",
    "risk": "aucun",
    "conseil": {
      "titre": "📍 Géolocalisation",
      "message": "Traçabilité encadrée.",
      "actions": ["Justification par objectif légitime", "Information préalable salariés", "Consultation instances représentatives", "Limitation surveillance hors horaires"],
      "alerte": null
    }
  },
  {
    "id": 256,
    "name": "Système badgeage",
    "category": "digital",
    "tags": ["pointage", "horaires"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Enregistrement temps travail",
    "legal": "✅ Décompte légitime",
    "risk": "aucun",
    "conseil": {
      "titre": "🎫 Pointage",
      "message": "Suivi temps de travail.",
      "actions": ["Obligation décompte si heures supplémentaires", "Information salariés sur traitement", "Accès données personnelles", "Conservation limitée"],
      "alerte": null
    }
  },
  {
    "id": 257,
    "name": "Intelligence artificielle",
    "category": "digital",
    "tags": ["IA", "outils"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Utilisation outils IA",
    "legal": "✅ Cadre en construction",
    "risk": "aucun",
    "conseil": {
      "titre": "🤖 IA Travail",
      "message": "Outils IA en environnement professionnel.",
      "actions": ["Charte utilisation recommandée", "Propriété intellectuelle : clarification", "Vérification humaine productions", "Confidentialité données à respecter"],
      "alerte": null
    }
  },
  {
    "id": 258,
    "name": "Réseaux sociaux usage",
    "category": "digital",
    "tags": ["image", "expression"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Réseaux sociaux professionnels",
    "legal": "✅ Liberté encadrée",
    "risk": "aucun",
    "conseil": {
      "titre": "📱 Réseaux Sociaux",
      "message": "Expression publique et obligation loyauté.",
      "actions": ["Liberté d'expression garantie", "Limite : dénigrement entreprise", "Profil personnel distinct profil pro", "Prudence publications concernant employeur"],
      "alerte": null
    }
  },
  {
    "id": 259,
    "name": "Compétences numériques",
    "category": "formation",
    "tags": ["digital", "adaptation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Formation outils digitaux",
    "legal": "✅ Adaptation poste",
    "risk": "aucun",
    "conseil": {
      "titre": "💻 Formation Numérique",
      "message": "Adaptation aux outils professionnels.",
      "actions": ["Formation si nouveaux outils", "Temps formation = temps travail", "Nécessité formation à exprimer", "Plan développement compétences"],
      "alerte": null
    }
  },
  {
    "id": 260,
    "name": "Évolution compétences requises",
    "category": "evolution",
    "tags": ["adaptation", "formation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Adaptation compétences métier",
    "legal": "✅ Obligation adaptation",
    "risk": "aucun",
    "conseil": {
      "titre": "📚 Adaptation Emploi",
      "message": "Maintien employabilité.",
      "actions": ["Adaptation au poste : obligation employeur", "Formation régulière", "Entretien professionnel bisannuel", "Bilan 6 ans avec actions formation"],
      "alerte": null
    }
  },
  {
    "id": 261,
    "name": "Horaires flexibles",
    "category": "organisation",
    "tags": ["souplesse", "plages"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Horaires variables",
    "legal": "✅ Accord collectif",
    "risk": "aucun",
    "conseil": {
      "titre": "🕐 Horaires Variables",
      "message": "Flexibilité dans cadre défini.",
      "actions": ["Plages fixes et plages variables", "Accord collectif ou charte", "Décompte sur période déterminée", "Limites quotidiennes/hebdomadaires maintenues"],
      "alerte": null
    }
  },
  {
    "id": 262,
    "name": "Modulation annuelle",
    "category": "organisation",
    "tags": ["annualisation", "variation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Temps travail sur l'année",
    "legal": "✅ Accord collectif",
    "risk": "aucun",
    "conseil": {
      "titre": "📅 Annualisation",
      "message": "Répartition heures annuelle.",
      "actions": ["Moyenne 35h/semaine calculée sur année", "Variations selon activité", "Planning prévisionnel communiqué", "Limite hebdomadaire définie"],
      "alerte": null
    }
  },
  {
    "id": 263,
    "name": "Repos compensateur",
    "category": "organisation",
    "tags": ["récupération", "heures"],
    "days": [{ "h": 6, "type": "normal" }, { "h": 6, "type": "normal" }, { "h": 6, "type": "normal" }, { "h": 6, "type": "normal" }, { "h": 6, "type": "normal" }],
    "desc": "Récupération par repos",
    "legal": "✅ Compensation temps",
    "risk": "aucun",
    "conseil": {
      "titre": "♻️ Repos Compensateur",
      "message": "Alternative paiement heures supplémentaires.",
      "actions": ["Repos = compensation heures sup", "Délai prise dans période raisonnable", "Pris par journée ou demi-journée", "Accord dates avec employeur"],
      "alerte": null
    }
  },
  {
    "id": 264,
    "name": "CET alimentation",
    "category": "organisation",
    "tags": ["épargne", "temps"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Compte épargne temps",
    "legal": "✅ Dispositif épargne",
    "risk": "aucun",
    "conseil": {
      "titre": "💰 CET",
      "message": "Épargne temps pour projets.",
      "actions": ["Congés, RTT, heures sup épargnables", "Utilisation : congés, formation, retraite", "Droits transférables", "Plafond selon accord"],
      "alerte": null
    }
  },
  {
    "id": 265,
    "name": "Réduction temps choisie",
    "category": "organisation",
    "tags": ["temps partiel", "choix"],
    "days": [{ "h": 6, "type": "normal" }, { "h": 6, "type": "normal" }, { "h": 6, "type": "normal" }, { "h": 6, "type": "normal" }, { "h": 6, "type": "normal" }],
    "desc": "Passage temps partiel volontaire",
    "legal": "✅ Avenant",
    "risk": "aucun",
    "conseil": {
      "titre": "⏱️ Temps Partiel Choisi",
      "message": "Réduction durée travail.",
      "actions": ["Avenant contrat formalise accord", "Durée minimale : 24h/semaine (sauf dérogations)", "Proratisation salaire et droits", "Heures complémentaires encadrées (10%)"],
      "alerte": null
    }
  },
  {
    "id": 266,
    "name": "Augmentation temps",
    "category": "organisation",
    "tags": ["temps plein", "passage"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Passage temps plein",
    "legal": "✅ Avenant",
    "risk": "aucun",
    "conseil": {
      "titre": "📈 Temps Plein",
      "message": "Augmentation durée travail.",
      "actions": ["Avenant écrit nécessaire", "Priorité temps partiel si poste disponible", "Adaptation rémunération", "Période adaptation si besoin"],
      "alerte": null
    }
  },
  {
    "id": 267,
    "name": "Dépassement temps partiel",
    "category": "organisation",
    "tags": ["heures complémentaires"],
    "days": [{ "h": 8, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Heures au-delà durée prévue",
    "legal": "✅ Limites définies",
    "risk": "aucun",
    "conseil": {
      "titre": "➕ Heures Complémentaires",
      "message": "Dépassement encadré temps partiel.",
      "actions": ["Maximum : 1/3 durée (10% selon accord)", "Majoration : +10% puis +25%", "Refus possible si dépassement limites", "Comptabilisation dans contingent"],
      "alerte": null
    }
  },
  {
    "id": 268,
    "name": "Contribution solidarité",
    "category": "organisation",
    "tags": ["journée solidarité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Journée solidarité travaillée",
    "legal": "✅ Contribution légale",
    "risk": "aucun",
    "conseil": {
      "titre": "🤝 Solidarité",
      "message": "Contribution autonomie personnes âgées.",
      "actions": ["7h travail (ou autre modalité selon accord)", "Généralement lundi Pentecôte", "Modalités selon accord entreprise", "Fractionnement possible"],
      "alerte": null
    }
  },
  {
    "id": 269,
    "name": "Jours RTT fixés",
    "category": "organisation",
    "tags": ["RTT", "organisation"],
    "days": [],
    "desc": "Dates RTT définies",
    "legal": "✅ Partage décision",
    "risk": "aucun",
    "conseil": {
      "titre": "📅 RTT",
      "message": "Répartition jours RTT.",
      "actions": ["Employeur peut fixer 50% des jours", "Délai prévenance adapté", "Autre moitié au choix salarié", "Modalités accord temps travail"],
      "alerte": null
    }
  },
  {
    "id": 270,
    "name": "Report heures intempéries",
    "category": "organisation",
    "tags": ["BTP", "météo"],
    "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }],
    "desc": "Récupération heures perdues",
    "legal": "✅ Procédure BTP",
    "risk": "aucun",
    "conseil": {
      "titre": "🌧️ Intempéries",
      "message": "Heures perdues récupérables (BTP).",
      "actions": ["Procédure spécifique secteur BTP", "Récupération dans limites légales", "Indemnisation chômage partiel possible", "Respect plafonds hebdomadaires"],
      "alerte": null
    }
  },
  {
    "id": 271,
    "name": "Convention jours réduite",
    "category": "forfait",
    "tags": ["cadre", "forfait"],
    "days": [],
    "desc": "Forfait moins de 218 jours",
    "legal": "✅ Forfait adapté",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Forfait Réduit",
      "message": "Convention jours allégée.",
      "actions": ["Accord individuel", "Rémunération proratisée", "Suivi charge travail maintenu", "Repos quotidien/hebdo respectés"],
      "alerte": null
    }
  },
  {
    "id": 272,
    "name": "Forfait jours suivi",
    "category": "forfait",
    "tags": ["contrôle", "charge"],
    "days": [],
    "desc": "Suivi forfait jours",
    "legal": "✅ Entretiens annuels",
    "risk": "aucun",
    "conseil": {
      "titre": "📊 Suivi Forfait",
      "message": "Contrôle charge et amplitude.",
      "actions": ["Entretiens annuels charge travail", "Maximum 218 jours par an", "Décompte jours travaillés", "Repos quotidien/hebdo garantis"],
      "alerte": null
    }
  },
  {
    "id": 273,
    "name": "Astreinte régulière",
    "category": "astreinte",
    "tags": ["disponibilité", "indemnisation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Astreintes planifiées",
    "legal": "✅ Compensation",
    "risk": "aucun",
    "conseil": {
      "titre": "📱 Astreintes",
      "message": "Périodes disponibilité indemnisées.",
      "actions": ["Indemnisation selon accord/usage", "Temps intervention = travail effectif", "Repos quotidien/hebdo préservés", "Rotation si plusieurs salariés"],
      "alerte": null
    }
  },
  {
    "id": 274,
    "name": "Journée fractionnée",
    "category": "organisation",
    "tags": ["coupure", "amplitude"],
    "days": [{ "h": 4, "type": "normal" }, { "h": 4, "type": "normal" }, { "h": 4, "type": "normal" }, { "h": 4, "type": "normal" }, { "h": 4, "type": "normal" }],
    "desc": "Travail avec coupure longue",
    "legal": "✅ Amplitude limitée",
    "risk": "aucun",
    "conseil": {
      "titre": "⏸️ Coupure",
      "message": "Pause longue dans journée.",
      "actions": ["Amplitude maximum : 13h (début-fin)", "Coupure longue souvent non rémunérée", "Convention collective à vérifier", "Secteur HCR : dispositions spécifiques"],
      "alerte": null
    }
  },
  {
    "id": 275,
    "name": "Interventions multiples",
    "category": "organisation",
    "tags": ["fractionnement", "déplacements"],
    "days": [{ "h": 3, "type": "normal" }, { "h": 3, "type": "normal" }, { "h": 3, "type": "normal" }, { "h": 3, "type": "normal" }, { "h": 3, "type": "normal" }],
    "desc": "Multiples interventions journée",
    "legal": "✅ Amplitude contrôlée",
    "risk": "aucun",
    "conseil": {
      "titre": "⏱️ Interventions",
      "message": "Fractionnement activité.",
      "actions": ["Amplitude 13h maintenue", "Temps déplacement : qualification variable", "Conventions collectives : majorations possibles", "Suivi temps travail précis"],
      "alerte": null
    }
  },
  {
    "id": 276,
    "name": "Travail équipes",
    "category": "organisation",
    "tags": ["rotation", "alternance"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Organisation par équipes",
    "legal": "✅ Planning rotation",
    "risk": "aucun",
    "conseil": {
      "titre": "🔄 Équipes",
      "message": "Rotation équipes organisée.",
      "actions": ["Planning prévisible communiqué", "Repos entre changements équipes", "Majorations nuit si applicable", "Suivi médical selon exposition"],
      "alerte": null
    }
  },
  {
    "id": 277,
    "name": "Concentration hebdomadaire",
    "category": "organisation",
    "tags": ["4 jours", "compression"],
    "days": [{ "h": 10, "type": "normal" }, { "h": 10, "type": "normal" }, { "h": 10, "type": "normal" }, { "h": 10, "type": "normal" }],
    "desc": "Semaine concentrée 4 jours",
    "legal": "✅ Accord requis",
    "risk": "aucun",
    "conseil": {
      "titre": "📅 Semaine Concentrée",
      "message": "4 jours travaillés au lieu de 5.",
      "actions": ["Accord collectif/entreprise nécessaire", "Limite quotidienne 10h respectée", "Durée hebdomadaire maintenue", "Jour repos fixe"],
      "alerte": null
    }
  },
  {
    "id": 278,
    "name": "Convention forfait heures",
    "category": "forfait",
    "tags": ["heures", "forfait"],
    "days": [{ "h": 8.5, "type": "normal" }, { "h": 8.5, "type": "normal" }, { "h": 8.5, "type": "normal" }, { "h": 8.5, "type": "normal" }, { "h": 8.5, "type": "normal" }],
    "desc": "Forfait hebdomadaire heures",
    "legal": "✅ Durée définie",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Forfait Heures",
      "message": "Nombre heures fixé au contrat.",
      "actions": ["Heures sup intégrées dans forfait défini", "Rémunération globale", "Limites quotidiennes/hebdo maintenues", "Au-delà forfait : heures sup supplémentaires"],
      "alerte": null
    }
  },
  {
    "id": 279,
    "name": "Heures représentation",
    "category": "instance",
    "tags": ["délégation", "crédit"],
    "days": [{ "h": 5, "type": "normal" }, { "h": 5, "type": "normal" }, { "h": 5, "type": "normal" }, { "h": 5, "type": "normal" }, { "h": 5, "type": "normal" }],
    "desc": "Utilisation crédit heures",
    "legal": "✅ Temps rémunéré",
    "risk": "aucun",
    "conseil": {
      "titre": "🎫 Heures Délégation",
      "message": "Crédit heures représentation.",
      "actions": ["Crédit selon taille entreprise", "Rémunération maintenue", "Information employeur planification", "Dépassement si nécessité mandat"],
      "alerte": null
    }
  },
  {
    "id": 280,
    "name": "Absences intermittentes",
    "category": "organisation",
    "tags": ["présence", "régularité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Absences courtes répétées",
    "legal": "✅ Justification nécessaire",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Absences",
      "message": "Absences nécessitent justification.",
      "actions": ["Justificatifs selon nature absence", "Certificat médical si maladie", "Désorganisation service : point attention", "Échanges RH si situation particulière"],
      "alerte": null
    }
  },
  {
    "id": 281,
    "name": "Pandémie organisation",
    "category": "crise",
    "tags": ["santé", "adaptation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Organisation période pandémique",
    "legal": "✅ Mesures adaptées",
    "risk": "aucun",
    "conseil": {
      "titre": "🦠 Contexte Sanitaire",
      "message": "Organisation adaptée aux circonstances.",
      "actions": ["Télétravail privilégié si possible", "Mesures sanitaires renforcées", "Chômage partiel si nécessaire", "Information régulière salariés"],
      "alerte": null
    }
  },
  {
    "id": 282,
    "name": "Activité réduite temporaire",
    "category": "crise",
    "tags": ["chômage partiel", "baisse"],
    "days": [{ "h": 3, "type": "normal" }, { "h": 3, "type": "normal" }, { "h": 3, "type": "normal" }],
    "desc": "Réduction activité temporaire",
    "legal": "✅ Dispositif État",
    "risk": "aucun",
    "conseil": {
      "titre": "📉 Activité Partielle",
      "message": "Dispositif soutien activité.",
      "actions": ["Indemnisation État : 60% brut (70% net environ)", "Autorisation administrative préalable", "Durée limitée", "Formation possible pendant période"],
      "alerte": null
    }
  },
  {
    "id": 283,
    "name": "Conditions climatiques extrêmes",
    "category": "crise",
    "tags": ["chaleur", "températures"],
    "days": [{ "h": 5, "type": "normal" }, { "h": 5, "type": "normal" }, { "h": 5, "type": "normal" }, { "h": 5, "type": "normal" }],
    "desc": "Travail fortes chaleurs",
    "legal": "✅ Mesures protection",
    "risk": "aucun",
    "conseil": {
      "titre": "🌡️ Températures Élevées",
      "message": "Mesures adaptation nécessaires.",
      "actions": ["Eau fraîche mise à disposition", "Aménagement horaires si possible", "Locaux adaptés (ventilation/climatisation)", "Pauses régulières"],
      "alerte": null
    }
  },
  {
    "id": 284,
    "name": "Perturbation transports",
    "category": "crise",
    "tags": ["grève", "déplacement"],
    "days": [],
    "desc": "Difficultés accès site",
    "legal": "✅ Solutions alternatives",
    "risk": "aucun",
    "conseil": {
      "titre": "🚇 Transports",
      "message": "Recherche solutions déplacement.",
      "actions": ["Télétravail si activité compatible", "Solutions alternatives à rechercher", "Échange avec employeur situation", "Absence : examen au cas par cas"],
      "alerte": null
    }
  },
  {
    "id": 285,
    "name": "Conditions météo difficiles",
    "category": "crise",
    "tags": ["intempéries", "force majeure"],
    "days": [],
    "desc": "Météo exceptionnellement défavorable",
    "legal": "✅ Appréciation situation",
    "risk": "aucun",
    "conseil": {
      "titre": "🌨️ Conditions Météo",
      "message": "Évaluation selon circonstances.",
      "actions": ["Alerte météo : prise en compte", "Télétravail si envisageable", "Sécurité prioritaire", "Chômage partiel si activité impossible"],
      "alerte": null
    }
  },
  {
    "id": 286,
    "name": "Coupure énergie",
    "category": "crise",
    "tags": ["électricité", "délestage"],
    "days": [],
    "desc": "Interruption fourniture énergie",
    "legal": "✅ Impact activité",
    "risk": "aucun",
    "conseil": {
      "titre": "⚡ Énergie",
      "message": "Impossibilité activité temporaire.",
      "actions": ["Chômage partiel si outils indisponibles", "Télétravail selon possibilités", "Information préalable si programmé", "Reprise dès rétablissement"],
      "alerte": null
    }
  },
  {
    "id": 287,
    "name": "Incident système informatique",
    "category": "crise",
    "tags": ["IT", "panne"],
    "days": [],
    "desc": "Indisponibilité systèmes",
    "legal": "✅ Continuité étudiée",
    "risk": "aucun",
    "conseil": {
      "titre": "💻 Système Informatique",
      "message": "Dysfonctionnement outils.",
      "actions": ["Chômage partiel si outils essentiels indisponibles", "Tâches alternatives si possibles", "Information salariés situation", "Plan reprise activité"],
      "alerte": null
    }
  },
  {
    "id": 288,
    "name": "Sinistre locaux",
    "category": "crise",
    "tags": ["incendie", "dégâts"],
    "days": [],
    "desc": "Locaux rendus inutilisables",
    "legal": "✅ Force majeure",
    "risk": "aucun",
    "conseil": {
      "titre": "🔥 Sinistre",
      "message": "Impossibilité temporaire activité.",
      "actions": ["Chômage partiel durant indisponibilité", "Réaffectation site alternatif si possible", "Maintien contrat", "Solutions selon durée indisponibilité"],
      "alerte": null
    }
  },
  {
    "id": 289,
    "name": "Accès site entravé",
    "category": "crise",
    "tags": ["blocage", "manifestation"],
    "days": [],
    "desc": "Impossibilité accéder locaux",
    "legal": "✅ Examen cas par cas",
    "risk": "aucun",
    "conseil": {
      "titre": "🚧 Accès Entravé",
      "message": "Impossibilité accès temporaire.",
      "actions": ["Télétravail si réalisable", "Tentative accès raisonnable", "Échange employeur sur situation", "Documentation circonstances"],
      "alerte": null
    }
  },
  {
    "id": 290,
    "name": "Réquisition secteur essentiel",
    "category": "crise",
    "tags": ["urgence", "mobilisation"],
    "days": [{ "h": 12, "type": "normal" }, { "h": 12, "type": "normal" }, { "h": 12, "type": "normal" }],
    "desc": "Mobilisation activité essentielle",
    "legal": "✅ Cadre légal",
    "risk": "aucun",
    "conseil": {
      "titre": "🚨 Réquisition",
      "message": "Mobilisation exceptionnelle.",
      "actions": ["Ordre administratif formalisé", "Compensation financière prévue", "Durée strictement limitée", "Application secteurs critiques"],
      "alerte": null
    }
  },
  {
    "id": 291,
    "name": "Plan continuation",
    "category": "crise",
    "tags": ["PCA", "mode dégradé"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Mode organisation dégradé",
    "legal": "✅ Adaptation",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 PCA",
      "message": "Organisation adaptée temporairement.",
      "actions": ["Activités prioritaires définies", "Flexibilité organisation", "Information régulière équipes", "Retour normal dès situation permet"],
      "alerte": null
    }
  },
  {
    "id": 292,
    "name": "Isolement préventif",
    "category": "crise",
    "tags": ["quarantaine", "prevention"],
    "days": [],
    "desc": "Isolement sanitaire préventif",
    "legal": "✅ Dispositifs prévus",
    "risk": "aucun",
    "conseil": {
      "titre": "🏥 Isolement Préventif",
      "message": "Mesure sanitaire préventive.",
      "actions": ["Arrêt si symptômes", "Télétravail si asymptomatique et possible", "Indemnisation selon dispositif", "Durée selon recommandations"],
      "alerte": null
    }
  },
  {
    "id": 293,
    "name": "Obligation sanitaire sectorielle",
    "category": "crise",
    "tags": ["vaccination", "secteur"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Obligation sanitaire métier",
    "legal": "✅ Secteurs réglementés",
    "risk": "aucun",
    "conseil": {
      "titre": "💉 Obligation Sanitaire",
      "message": "Certains secteurs ont obligations spécifiques.",
      "actions": ["Santé, secours : obligations légales définies", "Suspension possible selon situations", "Information préalable obligations", "Modalités régularisation prévues"],
      "alerte": null
    }
  },
  {
    "id": 294,
    "name": "Mesures exceptionnelles",
    "category": "crise",
    "tags": ["état urgence", "restrictions"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Restrictions temporaires",
    "legal": "✅ Cadre temporaire",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Mesures Exceptionnelles",
      "message": "Restrictions temporaires appliquées.",
      "actions": ["Adaptation organisation travail", "Impact horaires selon mesures", "Justificatifs déplacements si requis", "Durée limitée et contrôlée"],
      "alerte": null
    }
  },
  {
    "id": 295,
    "name": "Rupture approvisionnement",
    "category": "crise",
    "tags": ["pénurie", "production"],
    "days": [{ "h": 4, "type": "normal" }, { "h": 4, "type": "normal" }, { "h": 4, "type": "normal" }],
    "desc": "Difficultés approvisionnement",
    "legal": "✅ Activité partielle possible",
    "risk": "aucun",
    "conseil": {
      "titre": "📦 Approvisionnement",
      "message": "Difficultés chaîne production.",
      "actions": ["Chômage partiel selon impact", "Recherche solutions alternatives", "Information salariés évolution", "Période généralement temporaire"],
      "alerte": null
    }
  },
  {
    "id": 296,
    "name": "Difficulté économique entreprise",
    "category": "crise",
    "tags": ["conjoncture", "activité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Baisse activité économique",
    "legal": "✅ Procédures encadrées",
    "risk": "aucun",
    "conseil": {
      "titre": "📉 Conjoncture",
      "message": "Difficultés économiques.",
      "actions": ["Information instances représentatives", "Mesures selon ampleur difficultés", "Accompagnement si nécessaire", "Procédures légales respectées"],
      "alerte": null
    }
  },
  {
    "id": 297,
    "name": "Procédure collective",
    "category": "crise",
    "tags": ["redressement", "tribunal"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Entreprise en redressement",
    "legal": "✅ Contrats maintenus",
    "risk": "aucun",
    "conseil": {
      "titre": "⚖️ Redressement",
      "message": "Procédure de sauvegarde entreprise.",
      "actions": ["Contrats maintenus durant procédure", "Salaires garantis (AGS si besoin)", "Information instances représentatives", "Issue : continuation, cession ou liquidation"],
      "alerte": null
    }
  },
  {
    "id": 298,
    "name": "Cessation activité",
    "category": "crise",
    "tags": ["liquidation", "fermeture"],
    "days": [],
    "desc": "Arrêt définitif activité",
    "legal": "✅ Procédure encadrée",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Liquidation",
      "message": "Fin activité entreprise.",
      "actions": ["Procédure licenciement économique", "AGS : garantie salaires et indemnités", "Accompagnement reclassement", "Priorité réembauche si reprise activité"],
      "alerte": null
    }
  },
  {
    "id": 299,
    "name": "Changement contrôle entreprise",
    "category": "crise",
    "tags": ["cession", "reprise"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Cession entreprise",
    "legal": "✅ Transfert contrats",
    "risk": "aucun",
    "conseil": {
      "titre": "🔄 Cession",
      "message": "Changement propriétaire entreprise.",
      "actions": ["Transfert automatique contrats", "Maintien ancienneté", "Conditions travail préservées", "Information instances obligatoire"],
      "alerte": null
    }
  },
  {
    "id": 300,
    "name": "Restructuration groupe",
    "category": "crise",
    "tags": ["fusion", "réorganisation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Fusion entités",
    "legal": "✅ Transfert encadré",
    "risk": "aucun",
    "conseil": {
      "titre": "🔀 Restructuration",
      "message": "Réorganisation structure groupe.",
      "actions": ["Transfert contrats automatique", "Maintien ancienneté", "Consultation instances représentatives", "Harmonisation progressive conditions"],
      "alerte": null
    }
  }
,

  {
    "id": 301,
    "name": "Révision salariale",
    "category": "remuneration",
    "tags": ["augmentation", "négociation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Négociation augmentation",
    "legal": "✅ Entretien annuel",
    "risk": "aucun",
    "conseil": {
      "titre": "💰 Révision Salariale",
      "message": "Discussion rémunération périodique.",
      "actions": ["Entretien annuel : moment opportun", "Préparation arguments (résultats, marché)", "Avenant si modification substantielle", "Pas d'obligation automatique augmentation"],
      "alerte": null
    }
  },
  {
    "id": 302,
    "name": "Prime exceptionnelle",
    "category": "remuneration",
    "tags": ["bonus", "gratification"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Versement prime ponctuelle",
    "legal": "✅ Décision employeur",
    "risk": "aucun",
    "conseil": {
      "titre": "🎁 Prime Exceptionnelle",
      "message": "Gratification ponctuelle.",
      "actions": ["Versement discrétionnaire employeur", "Devient usage si récurrence 3 ans", "Soumise charges sociales", "Mention bulletin paie"],
      "alerte": null
    }
  },
  {
    "id": 303,
    "name": "Prime ancienneté",
    "category": "remuneration",
    "tags": ["ancienneté", "progression"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Prime liée à l'ancienneté",
    "legal": "✅ Convention collective",
    "risk": "aucun",
    "conseil": {
      "titre": "📅 Prime Ancienneté",
      "message": "Rémunération selon années service.",
      "actions": ["Modalités selon convention collective", "Calcul sur ancienneté entreprise", "Versement mensuel généralement", "Mention bulletin paie"],
      "alerte": null
    }
  },
  {
    "id": 304,
    "name": "Intéressement versement",
    "category": "remuneration",
    "tags": ["participation", "résultats"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Prime intéressement annuelle",
    "legal": "✅ Accord intéressement",
    "risk": "aucun",
    "conseil": {
      "titre": "📊 Intéressement",
      "message": "Dispositif lié performance entreprise.",
      "actions": ["Accord d'intéressement formalisé", "Calcul selon critères définis", "Versement ou placement (PEE/PERCO)", "Fiscalité avantageuse si placement"],
      "alerte": null
    }
  },
  {
    "id": 305,
    "name": "Participation bénéfices",
    "category": "remuneration",
    "tags": ["participation", "obligatoire"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Participation aux bénéfices",
    "legal": "✅ Obligatoire >50 salariés",
    "risk": "aucun",
    "conseil": {
      "titre": "💼 Participation",
      "message": "Dispositif redistribution bénéfices.",
      "actions": ["Obligatoire entreprises 50+ salariés", "Formule réglementaire calcul", "Placement PEE/PERCO (blocage 5 ans)", "Déblocage anticipé : cas prévus loi"],
      "alerte": null
    }
  },
  {
    "id": 306,
    "name": "Épargne salariale placement",
    "category": "remuneration",
    "tags": ["PEE", "épargne"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Versement PEE/PERCO",
    "legal": "✅ Plans épargne",
    "risk": "aucun",
    "conseil": {
      "titre": "💰 Épargne Salariale",
      "message": "Plans épargne entreprise.",
      "actions": ["PEE : blocage 5 ans (sauf cas déblocage)", "PERCO/PER collectif : retraite", "Abondement employeur possible", "Fiscalité avantageuse"],
      "alerte": null
    }
  },
  {
    "id": 307,
    "name": "Tickets restaurant",
    "category": "avantages",
    "tags": ["titre restaurant", "repas"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Attribution titres restaurant",
    "legal": "✅ Avantage exonéré",
    "risk": "aucun",
    "conseil": {
      "titre": "🍽️ Titres Restaurant",
      "message": "Aide restauration.",
      "actions": ["Participation employeur 50-60%", "Exonération charges dans limites", "Utilisation jours travaillés", "Valeur faciale plafonnée"],
      "alerte": null
    }
  },
  {
    "id": 308,
    "name": "Véhicule fonction",
    "category": "avantages",
    "tags": ["voiture", "fonction"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Mise à disposition véhicule",
    "legal": "✅ Avantage nature",
    "risk": "aucun",
    "conseil": {
      "titre": "🚗 Véhicule Fonction",
      "message": "Mise à disposition véhicule.",
      "actions": ["Usage professionnel principalement", "Avantage nature si usage personnel", "Évaluation forfaitaire ou réelle", "Déclaration fiscale et sociale"],
      "alerte": null
    }
  },
  {
    "id": 309,
    "name": "Logement fonction",
    "category": "avantages",
    "tags": ["logement", "avantage"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Logement mis à disposition",
    "legal": "✅ Avantage nature",
    "risk": "aucun",
    "conseil": {
      "titre": "🏠 Logement Fonction",
      "message": "Logement fourni par employeur.",
      "actions": ["Nécessité pour fonction ou avantage", "Évaluation selon barèmes URSSAF", "Déclaration fiscale obligatoire", "Restitution fin contrat"],
      "alerte": null
    }
  },
  {
    "id": 310,
    "name": "Téléphone portable professionnel",
    "category": "avantages",
    "tags": ["mobile", "équipement"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Fourniture téléphone",
    "legal": "✅ Outil travail",
    "risk": "aucun",
    "conseil": {
      "titre": "📱 Téléphone Pro",
      "message": "Équipement professionnel.",
      "actions": ["Usage professionnel : pas avantage nature", "Usage mixte : évaluation forfaitaire possible", "Restitution fin contrat", "Séparation usage pro/perso recommandée"],
      "alerte": null
    }
  },
  {
    "id": 311,
    "name": "Mutuelle entreprise",
    "category": "avantages",
    "tags": ["santé", "complémentaire"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Complémentaire santé collective",
    "legal": "✅ Obligatoire",
    "risk": "aucun",
    "conseil": {
      "titre": "🏥 Mutuelle",
      "message": "Complémentaire santé obligatoire.",
      "actions": ["Obligatoire depuis 2016", "Participation employeur minimum 50%", "Garanties minimales définies", "Dispense possible (autres couvertures)"],
      "alerte": null
    }
  },
  {
    "id": 312,
    "name": "Prévoyance entreprise",
    "category": "avantages",
    "tags": ["prévoyance", "protection"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Garanties prévoyance collectives",
    "legal": "✅ Couverture complémentaire",
    "risk": "aucun",
    "conseil": {
      "titre": "🛡️ Prévoyance",
      "message": "Protection incapacité, invalidité, décès.",
      "actions": ["Selon convention collective ou accord", "Complète prestations Sécurité Sociale", "Maintien revenu selon garanties", "Déclaration bénéficiaires recommandée"],
      "alerte": null
    }
  },
  {
    "id": 313,
    "name": "Chèques cadeaux",
    "category": "avantages",
    "tags": ["cadeaux", "événements"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Attribution chèques cadeaux",
    "legal": "✅ Exonération limitée",
    "risk": "aucun",
    "conseil": {
      "titre": "🎁 Chèques Cadeaux",
      "message": "Bons d'achat occasions spéciales.",
      "actions": ["Événements : Noël, rentrée, naissance...", "Exonération dans limites URSSAF", "Montants plafonnés par événement", "Pas de substitution salaire"],
      "alerte": null
    }
  },
  {
    "id": 314,
    "name": "Œuvres sociales CSE",
    "category": "avantages",
    "tags": ["CSE", "activités"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Prestations comité social",
    "legal": "✅ Budget ASC",
    "risk": "aucun",
    "conseil": {
      "titre": "🎉 CSE Activités",
      "message": "Activités sociales et culturelles.",
      "actions": ["Budget : selon effectif et usage", "Billetterie, vacances, loisirs", "Accès selon conditions définies CSE", "Avantages exonérés dans limites"],
      "alerte": null
    }
  },
  {
    "id": 315,
    "name": "Formation externe diplômante",
    "category": "formation",
    "tags": ["qualification", "diplôme"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Formation qualifiante financée",
    "legal": "✅ Plan développement",
    "risk": "aucun",
    "conseil": {
      "titre": "🎓 Formation Qualifiante",
      "message": "Formation diplômante ou certifiante.",
      "actions": ["Plan développement compétences employeur", "Temps formation = temps travail", "Maintien rémunération", "Certification acquisition compétences"],
      "alerte": null
    }
  },
  {
    "id": 316,
    "name": "Indemnité déplacement",
    "category": "remuneration",
    "tags": ["frais", "déplacement"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Remboursement frais déplacement",
    "legal": "✅ Barèmes fiscaux",
    "risk": "aucun",
    "conseil": {
      "titre": "🚗 Frais Déplacement",
      "message": "Remboursement déplacements professionnels.",
      "actions": ["Barème kilométrique fiscal", "Justificatifs nécessaires", "Exonération charges dans limites", "Titres transport collectif : prise charge"],
      "alerte": null
    }
  },
  {
    "id": 317,
    "name": "Indemnité télétravail",
    "category": "remuneration",
    "tags": ["télétravail", "allocation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Allocation forfaitaire télétravail",
    "legal": "✅ Exonération possible",
    "risk": "aucun",
    "conseil": {
      "titre": "💻 Allocation Télétravail",
      "message": "Compensation frais télétravail.",
      "actions": ["Allocation forfaitaire exonérée (limites URSSAF)", "Couvre frais : internet, chauffage, etc.", "Selon accord entreprise", "Montant défini par accord"],
      "alerte": null
    }
  },
  {
    "id": 318,
    "name": "Prime panier",
    "category": "remuneration",
    "tags": ["repas", "indemnité"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Indemnité repas chantier",
    "legal": "✅ Conditions travail",
    "risk": "aucun",
    "conseil": {
      "titre": "🍱 Prime Panier",
      "message": "Indemnité repas selon conditions.",
      "actions": ["Conditions : impossibilité regagner domicile ou cantine", "Montant selon convention collective", "Exonération dans limites URSSAF", "Mention bulletin paie"],
      "alerte": null
    }
  },
  {
    "id": 319,
    "name": "Prime salissure",
    "category": "remuneration",
    "tags": ["conditions", "vêtements"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Indemnité conditions pénibles",
    "legal": "✅ Compensation conditions",
    "risk": "aucun",
    "conseil": {
      "titre": "👔 Prime Salissure",
      "message": "Compensation travail salissant.",
      "actions": ["Selon convention collective", "Conditions travail particulières", "Exonération limitée", "Alternative : fourniture vêtements"],
      "alerte": null
    }
  },
  {
    "id": 320,
    "name": "Treizième mois",
    "category": "remuneration",
    "tags": ["gratification", "usage"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Prime annuelle supplémentaire",
    "legal": "✅ Usage ou accord",
    "risk": "aucun",
    "conseil": {
      "titre": "💰 13ème Mois",
      "message": "Mois supplémentaire de salaire.",
      "actions": ["Prévu convention collective ou usage", "Proratisation si année incomplète", "Versement généralement fin année", "Soumis charges sociales"],
      "alerte": null
    }
  },
  {
    "id": 321,
    "name": "Mobilité interne",
    "category": "evolution",
    "tags": ["changement", "poste"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Changement poste en interne",
    "legal": "✅ Mobilité encouragée",
    "risk": "aucun",
    "conseil": {
      "titre": "🔄 Mobilité Interne",
      "message": "Évolution au sein de l'entreprise.",
      "actions": ["Opportunités communiquées en interne", "Priorité salariés sur recrutement externe", "Accompagnement transition poste", "Formation adaptation si nécessaire"],
      "alerte": null
    }
  },
  {
    "id": 322,
    "name": "Évolution professionnelle",
    "category": "evolution",
    "tags": ["carrière", "progression"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Progression de carrière",
    "legal": "✅ Entretien professionnel",
    "risk": "aucun",
    "conseil": {
      "titre": "📈 Évolution Carrière",
      "message": "Développement professionnel.",
      "actions": ["Entretien professionnel bisannuel", "Bilan 6 ans : parcours et perspectives", "Formation accompagnement évolution", "VAE possible validation expérience"],
      "alerte": null
    }
  },
  {
    "id": 323,
    "name": "Tutorat junior",
    "category": "relations",
    "tags": ["accompagnement", "intégration"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Accompagnement nouveau salarié",
    "legal": "✅ Intégration facilitée",
    "risk": "aucun",
    "conseil": {
      "titre": "🤝 Tutorat",
      "message": "Accompagnement nouveaux arrivants.",
      "actions": ["Désignation tuteur possible", "Temps dédié accompagnement", "Valorisation mission tutorat", "Formation tuteurs recommandée"],
      "alerte": null
    }
  },
  {
    "id": 324,
    "name": "Mentorat senior",
    "category": "relations",
    "tags": ["transmission", "expérience"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Transmission compétences",
    "legal": "✅ Partage savoir",
    "risk": "aucun",
    "conseil": {
      "titre": "👴 Mentorat",
      "message": "Transmission expertise.",
      "actions": ["Partage expérience et compétences", "Relation mentor/mentoré formalisée", "Temps dédié échanges", "Valorisation expertise senior"],
      "alerte": null
    }
  },
  {
    "id": 325,
    "name": "Projet transversal",
    "category": "relations",
    "tags": ["collaboration", "équipes"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Participation projet multi-services",
    "legal": "✅ Organisation matricielle",
    "risk": "aucun",
    "conseil": {
      "titre": "🔀 Projet Transversal",
      "message": "Collaboration inter-services.",
      "actions": ["Organisation projet définie", "Temps alloué projet identifié", "Reporting double possible", "Développement compétences transverses"],
      "alerte": null
    }
  },
  {
    "id": 326,
    "name": "Management matriciel",
    "category": "relations",
    "tags": ["hiérarchie", "organisation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Double rattachement hiérarchique",
    "legal": "✅ Organisation complexe",
    "risk": "aucun",
    "conseil": {
      "titre": "📊 Management Matriciel",
      "message": "Multiples lignes hiérarchiques.",
      "actions": ["Clarification rôles et reporting", "Priorisation si arbitrages nécessaires", "Communication entre managers", "Évaluation concertée"],
      "alerte": null
    }
  },
  {
    "id": 327,
    "name": "Équipe internationale",
    "category": "relations",
    "tags": ["multiculturel", "langues"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Collaboration équipes multiculturelles",
    "legal": "✅ Environnement international",
    "risk": "aucun",
    "conseil": {
      "titre": "🌍 Équipe Internationale",
      "message": "Travail contexte multiculturel.",
      "actions": ["Formation langues possible", "Sensibilisation interculturalité", "Décalages horaires : organisation adaptée", "Communication facilitée outils"],
      "alerte": null
    }
  },
  {
    "id": 328,
    "name": "Équipe distribuée",
    "category": "relations",
    "tags": ["distance", "collaboration"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Équipe géographiquement dispersée",
    "legal": "✅ Travail distance",
    "risk": "aucun",
    "conseil": {
      "titre": "🗺️ Équipe Distribuée",
      "message": "Collaboration à distance.",
      "actions": ["Outils collaboration partagés", "Réunions régulières synchronisation", "Cohésion équipe : moments communs", "Communication claire et formalisée"],
      "alerte": null
    }
  },
  {
    "id": 329,
    "name": "Relation client-fournisseur interne",
    "category": "relations",
    "tags": ["processus", "organisation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Logique service interne",
    "legal": "✅ Organisation processus",
    "risk": "aucun",
    "conseil": {
      "titre": "🔄 Client Interne",
      "message": "Relations inter-services.",
      "actions": ["SLA (accords niveau service) possibles", "Clarification attentes réciproques", "Processus formalisés", "Amélioration continue"],
      "alerte": null
    }
  },
  {
    "id": 330,
    "name": "Innovation participative",
    "category": "relations",
    "tags": ["idées", "amélioration"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Démarche innovation collaborative",
    "legal": "✅ Participation salariés",
    "risk": "aucun",
    "conseil": {
      "titre": "💡 Innovation",
      "message": "Contribution amélioration continue.",
      "actions": ["Boîte à idées ou plateforme dédiée", "Reconnaissance contributions", "Mise en œuvre idées retenues", "Propriété intellectuelle : accord préalable"],
      "alerte": null
    }
  },
  {
    "id": 331,
    "name": "Groupe de travail thématique",
    "category": "relations",
    "tags": ["participation", "projet"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Participation groupes projet",
    "legal": "✅ Implication salariés",
    "risk": "aucun",
    "conseil": {
      "titre": "👥 Groupe Travail",
      "message": "Contribution projets transverses.",
      "actions": ["Temps alloué participation", "Objectifs et périmètre définis", "Restitution travaux formalisée", "Valorisation implication"],
      "alerte": null
    }
  },
  {
    "id": 332,
    "name": "Communauté de pratique",
    "category": "relations",
    "tags": ["expertise", "partage"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Réseau expertise métier",
    "legal": "✅ Partage connaissances",
    "risk": "aucun",
    "conseil": {
      "titre": "🎓 Communauté Pratique",
      "message": "Réseau professionnels même métier.",
      "actions": ["Échanges bonnes pratiques", "Veille technique métier", "Capitalisation connaissances", "Animation communauté"],
      "alerte": null
    }
  },
  {
    "id": 333,
    "name": "Ambassadeur marque employeur",
    "category": "relations",
    "tags": ["image", "représentation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Représentation externe entreprise",
    "legal": "✅ Mission représentation",
    "risk": "aucun",
    "conseil": {
      "titre": "🌟 Ambassadeur",
      "message": "Représentation entreprise externe.",
      "actions": ["Participation salons, forums", "Formation prise de parole si besoin", "Temps dédié mission", "Valorisation engagement"],
      "alerte": null
    }
  },
  {
    "id": 334,
    "name": "Parrainage interne",
    "category": "relations",
    "tags": ["intégration", "accompagnement"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Accompagnement intégration",
    "legal": "✅ Facilitation intégration",
    "risk": "aucun",
    "conseil": {
      "titre": "🤝 Parrainage",
      "message": "Accompagnement nouveaux salariés.",
      "actions": ["Désignation parrain/marraine", "Aide intégration culture entreprise", "Réponses questions pratiques", "Durée définie (ex: 6 mois)"],
      "alerte": null
    }
  },
  {
    "id": 335,
    "name": "Évaluation 360°",
    "category": "evolution",
    "tags": ["feedback", "développement"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Évaluation multi-sources",
    "legal": "✅ Développement compétences",
    "risk": "aucun",
    "conseil": {
      "titre": "🔄 Évaluation 360°",
      "message": "Feedback hiérarchie, pairs, collaborateurs.",
      "actions": ["Démarche développement (pas sanction)", "Anonymat feedbacks garantis", "Accompagnement exploitation résultats", "Plan actions développement"],
      "alerte": null
    }
  },
  {
    "id": 336,
    "name": "Codéveloppement professionnel",
    "category": "relations",
    "tags": ["entraide", "groupe"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Groupe entraide professionnelle",
    "legal": "✅ Intelligence collective",
    "risk": "aucun",
    "conseil": {
      "titre": "🔗 Codéveloppement",
      "message": "Entraide entre pairs.",
      "actions": ["Groupes petite taille (6-8)", "Méthode structurée partage", "Confidentialité échanges", "Animateur formé méthode"],
      "alerte": null
    }
  },
  {
    "id": 337,
    "name": "Réseau alumni interne",
    "category": "relations",
    "tags": ["anciens", "réseau"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Réseau anciens collaborateurs",
    "legal": "✅ Maintien liens",
    "risk": "aucun",
    "conseil": {
      "titre": "🎓 Réseau Alumni",
      "message": "Liens avec anciens salariés.",
      "actions": ["Maintien relations professionnelles", "Opportunités business ou recrutement", "Événements périodiques", "Plateforme échanges"],
      "alerte": null
    }
  },
  {
    "id": 338,
    "name": "Mécénat compétences",
    "category": "relations",
    "tags": ["engagement", "société"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Mise disposition compétences",
    "legal": "✅ Engagement sociétal",
    "risk": "aucun",
    "conseil": {
      "titre": "🤲 Mécénat Compétences",
      "message": "Mise à disposition associations.",
      "actions": ["Accord employeur nécessaire", "Temps dédié mission", "Maintien rémunération", "Développement compétences transverses"],
      "alerte": null
    }
  },
  {
    "id": 339,
    "name": "Bénévolat soutenu entreprise",
    "category": "relations",
    "tags": ["associatif", "engagement"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Journées solidarité autorisées",
    "legal": "✅ Politique RSE",
    "risk": "aucun",
    "conseil": {
      "titre": "💚 Bénévolat",
      "message": "Engagement associatif encouragé.",
      "actions": ["Jours solidarité selon politique entreprise", "Congés spécifiques possibles", "Valorisation engagement", "Développement compétences"],
      "alerte": null
    }
  },
  {
    "id": 340,
    "name": "Participation instances paritaires",
    "category": "instance",
    "tags": ["représentation", "dialogue"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Membre instance représentative",
    "legal": "✅ Mandat électif",
    "risk": "aucun",
    "conseil": {
      "titre": "🗳️ Instance Paritaire",
      "message": "Participation dialogue social.",
      "actions": ["Élection par pairs", "Heures délégation rémunérées", "Formation spécifique mandat", "Protection juridique statut"],
      "alerte": null
    }
  },
  {
    "id": 341,
    "name": "Bilan compétences approfondi",
    "category": "formation",
    "tags": ["bilan", "orientation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Bilan compétences",
    "legal": "✅ Droit formation",
    "risk": "aucun",
    "conseil": {
      "titre": "📊 Bilan Compétences",
      "message": "Analyse compétences et projet.",
      "actions": ["24h réparties sur temps travail ou personnel", "Financement CPF possible", "Confidentialité résultats garantie", "Accompagnement projet professionnel"],
      "alerte": null
    }
  },
  {
    "id": 342,
    "name": "Validation acquis expérience",
    "category": "formation",
    "tags": ["VAE", "diplôme"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Démarche VAE",
    "legal": "✅ Droit individuel",
    "risk": "aucun",
    "conseil": {
      "titre": "🎓 VAE",
      "message": "Obtention diplôme par expérience.",
      "actions": ["Expérience 1 an minimum requise", "Accompagnement finançable CPF", "Congé VAE possible (24h)", "Diplôme sans retour formation"],
      "alerte": null
    }
  },
  {
    "id": 343,
    "name": "Formation longue qualifiante",
    "category": "formation",
    "tags": ["qualification", "reconversion"],
    "days": [{"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}],
    "desc": "Formation plusieurs mois",
    "legal": "✅ Projet transition",
    "risk": "aucun",
    "conseil": {
      "titre": "📚 Formation Longue",
      "message": "Formation qualifiante longue durée.",
      "actions": ["Projet Transition Professionnelle (PTP)", "Financement et rémunération sous conditions", "Ancienneté requise (24 mois)", "Retour emploi ou démission protégée"],
      "alerte": null
    }
  },
  {
    "id": 344,
    "name": "Congé sabbatique",
    "category": "conge",
    "tags": ["pause", "projet personnel"],
    "days": [],
    "desc": "Interruption temporaire activité",
    "legal": "✅ Droit sous conditions",
    "risk": "aucun",
    "conseil": {
      "titre": "🌴 Congé Sabbatique",
      "message": "Pause professionnelle 6-11 mois.",
      "actions": ["Ancienneté : 36 mois dont 6 dans entreprise", "Suspension contrat (pas rupture)", "Pas de rémunération", "Réintégration poste équivalent"],
      "alerte": null
    }
  },
  {
    "id": 345,
    "name": "Congé création entreprise",
    "category": "conge",
    "tags": ["entrepreneuriat", "création"],
    "days": [],
    "desc": "Projet création activité",
    "legal": "✅ Soutien entrepreneuriat",
    "risk": "aucun",
    "conseil": {
      "titre": "💼 Création Entreprise",
      "message": "Congé création/reprise entreprise.",
      "actions": ["Durée : 1 an renouvelable 1 fois", "Suspension contrat", "Réintégration garantie", "Formation création entreprise possible"],
      "alerte": null
    }
  },
  {
    "id": 346,
    "name": "Temps partiel senior",
    "category": "organisation",
    "tags": ["fin carrière", "transition"],
    "days": [{"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}],
    "desc": "Réduction temps fin carrière",
    "legal": "✅ Transition retraite",
    "risk": "aucun",
    "conseil": {
      "titre": "👴 Temps Partiel Senior",
      "message": "Réduction progressive activité.",
      "actions": ["Aménagement fin carrière", "Accord employeur nécessaire", "Maintien droits retraite selon cas", "Préparation transition"],
      "alerte": null
    }
  },
  {
    "id": 347,
    "name": "Retraite progressive",
    "category": "organisation",
    "tags": ["retraite", "progressif"],
    "days": [{"h": 3.5, "type": "normal"}, {"h": 3.5, "type": "normal"}, {"h": 3.5, "type": "normal"}, {"h": 3.5, "type": "normal"}, {"h": 3.5, "type": "normal"}],
    "desc": "Cumul retraite et activité",
    "legal": "✅ Dispositif transition",
    "risk": "aucun",
    "conseil": {
      "titre": "👴 Retraite Progressive",
      "message": "Temps partiel + pension partielle.",
      "actions": ["Conditions âge et trimestres", "Temps partiel 40-80%", "Pension partielle versée", "Poursuite cotisations retraite"],
      "alerte": null
    }
  },
  {
    "id": 348,
    "name": "Cumul emploi-retraite",
    "category": "organisation",
    "tags": ["retraite", "activité"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Activité après liquidation retraite",
    "legal": "✅ Cumul possible",
    "risk": "aucun",
    "conseil": {
      "titre": "👴 Cumul Emploi-Retraite",
      "message": "Activité après pension.",
      "actions": ["Liquidation complète retraite préalable", "Cumul intégral si taux plein + âge légal", "Sinon plafond revenus", "Pas nouveaux droits retraite généralement"],
      "alerte": null
    }
  },
  {
    "id": 349,
    "name": "Essaimage accompagné",
    "category": "evolution",
    "tags": ["création", "soutien"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Création entreprise soutenue",
    "legal": "✅ Accompagnement employeur",
    "risk": "aucun",
    "conseil": {
      "titre": "🚀 Essaimage",
      "message": "Création activité avec soutien employeur.",
      "actions": ["Accompagnement personnalisé", "Moyens mis à disposition possibles", "Relation commerciale éventuelle", "Sécurisation transition"],
      "alerte": null
    }
  },
  {
    "id": 350,
    "name": "Reclassement externe",
    "category": "evolution",
    "tags": ["mobilité", "reclassement"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Recherche poste autre entreprise",
    "legal": "✅ Accompagnement",
    "risk": "aucun",
    "conseil": {
      "titre": "🔍 Reclassement",
      "message": "Accompagnement recherche emploi externe.",
      "actions": ["Cellule reclassement si PSE", "Bilan compétences", "Formation si nécessaire", "Maintien rémunération période"],
      "alerte": null
    }
  },
  {
    "id": 351,
    "name": "Outplacement",
    "category": "evolution",
    "tags": ["accompagnement", "transition"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Accompagnement transition emploi",
    "legal": "✅ Prestation conseil",
    "risk": "aucun",
    "conseil": {
      "titre": "🎯 Outplacement",
      "message": "Accompagnement professionnel transition.",
      "actions": ["Bilan compétences approfondi", "Stratégie recherche emploi", "Réseau professionnel", "Coaching personnalisé"],
      "alerte": null
    }
  },
  {
    "id": 352,
    "name": "Portage salarial",
    "category": "statut",
    "tags": ["indépendant", "sécurité"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Activité indépendante sécurisée",
    "legal": "✅ Statut hybride",
    "risk": "aucun",
    "conseil": {
      "titre": "💼 Portage Salarial",
      "message": "Indépendance avec statut salarié.",
      "actions": ["Contrat travail avec société portage", "Protection sociale maintenue", "Gestion administrative déléguée", "Commission prélevée"],
      "alerte": null
    }
  },
  {
    "id": 353,
    "name": "Détachement temporaire",
    "category": "mobilite",
    "tags": ["mission", "autre site"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Mission temporaire autre site",
    "legal": "✅ Mobilité temporaire",
    "risk": "aucun",
    "conseil": {
      "titre": "📍 Détachement",
      "message": "Mission temporaire autre établissement.",
      "actions": ["Durée définie mission", "Indemnités déplacement/logement", "Retour site origine prévu", "Conditions mission formalisées"],
      "alerte": null
    }
  },
  {
    "id": 354,
    "name": "Expatriation courte durée",
    "category": "mobilite",
    "tags": ["étranger", "mission"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Mission étrangère < 2 ans",
    "legal": "✅ Détachement international",
    "risk": "aucun",
    "conseil": {
      "titre": "✈️ Détachement International",
      "message": "Mission étrangère temporaire.",
      "actions": ["Détachement : maintien affiliation France", "Prime expatriation négociée", "Couverture santé adaptée", "Accompagnement famille possible"],
      "alerte": null
    }
  },
  {
    "id": 355,
    "name": "Expatriation longue",
    "category": "mobilite",
    "tags": ["étranger", "installation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Installation étrangère durable",
    "legal": "✅ Expatriation",
    "risk": "aucun",
    "conseil": {
      "titre": "🌍 Expatriation",
      "message": "Mission étrangère longue durée.",
      "actions": ["Affiliation système social local", "Package expatriation négocié", "Assistance installation", "Contrat local ou international"],
      "alerte": null
    }
  },
  {
    "id": 356,
    "name": "Retour expatriation",
    "category": "mobilite",
    "tags": ["retour", "réintégration"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Réintégration après mission",
    "legal": "✅ Retour organisé",
    "risk": "aucun",
    "conseil": {
      "titre": "🏠 Retour Expatriation",
      "message": "Réintégration après mission étrangère.",
      "actions": ["Poste équivalent garanti", "Accompagnement retour famille", "Valorisation expérience internationale", "Réadaptation système français"],
      "alerte": null
    }
  },
  {
    "id": 357,
    "name": "Mobilité volontaire sécurisée",
    "category": "mobilite",
    "tags": ["changement", "sécurité"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Changement employeur sécurisé",
    "legal": "✅ Période essai réciproque",
    "risk": "aucun",
    "conseil": {
      "titre": "🔒 Mobilité Sécurisée",
      "message": "Changement employeur avec filet.",
      "actions": ["Convention tripartite", "Période essai nouvel emploi", "Retour possible si échec", "Sécurisation transition"],
      "alerte": null
    }
  },
  {
    "id": 358,
    "name": "Congé solidaire international",
    "category": "conge",
    "tags": ["humanitaire", "mission"],
    "days": [],
    "desc": "Mission humanitaire",
    "legal": "✅ Congé spécifique",
    "risk": "aucun",
    "conseil": {
      "titre": "🌍 Congé Solidaire",
      "message": "Mission humanitaire internationale.",
      "actions": ["Durée maximum : 6 mois", "Auprès d'organisation reconnue", "Suspension contrat", "Réintégration garantie"],
      "alerte": null
    }
  },
  {
    "id": 359,
    "name": "Essai professionnel",
    "category": "recrutement",
    "tags": ["évaluation", "compétences"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Évaluation pratique candidat",
    "legal": "✅ Mise en situation",
    "risk": "aucun",
    "conseil": {
      "titre": "🧪 Essai Professionnel",
      "message": "Évaluation compétences pratiques.",
      "actions": ["Durée limitée (quelques heures)", "Rémunération obligatoire", "Conditions réelles travail", "Évaluation objective"],
      "alerte": null
    }
  },
  {
    "id": 360,
    "name": "Immersion professionnelle",
    "category": "formation",
    "tags": ["découverte", "orientation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Découverte métier/entreprise",
    "legal": "✅ PMSMP",
    "risk": "aucun",
    "conseil": {
      "titre": "🔍 Immersion",
      "message": "Période mise en situation milieu professionnel.",
      "actions": ["Durée : 1 mois maximum", "Convention tripartite", "Pas de contrat travail", "Découverte métier/validation projet"],
      "alerte": null
    }
  },
  {
    "id": 361,
    "name": "Multi-salariat déclaré",
    "category": "cumul",
    "tags": ["plusieurs employeurs"],
    "days": [{"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}, {"h": 4, "type": "normal"}],
    "desc": "Plusieurs employeurs simultanés",
    "legal": "✅ Cumul autorisé",
    "risk": "aucun",
    "conseil": {
      "titre": "👔 Multi-Salariat",
      "message": "Plusieurs contrats simultanés.",
      "actions": ["Cumul autorisé sauf clause exclusivité", "Durées maximales cumulées à respecter", "Repos quotidien/hebdo global", "Déclarations distinctes employeurs"],
      "alerte": null
    }
  },
  {
    "id": 362,
    "name": "Activité complémentaire",
    "category": "cumul",
    "tags": ["complément", "revenus"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Activité secondaire",
    "legal": "✅ Sous conditions",
    "risk": "aucun",
    "conseil": {
      "titre": "➕ Activité Complémentaire",
      "message": "Activité addition emploi principal.",
      "actions": ["Vérifier clause exclusivité contrat", "Pas concurrence avec employeur principal", "Temps repos à respecter globalement", "Déclaration selon statut"],
      "alerte": null
    }
  },
  {
    "id": 363,
    "name": "Micro-entreprise parallèle",
    "category": "cumul",
    "tags": ["auto-entrepreneur", "cumul"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Auto-entrepreneuriat en parallèle",
    "legal": "✅ Cumul possible",
    "risk": "aucun",
    "conseil": {
      "titre": "💼 Micro-Entreprise",
      "message": "Statut auto-entrepreneur + salarié.",
      "actions": ["Cumul autorisé sauf clause contraire", "Activité non concurrente recommandée", "Double affiliation sociale", "Déclarations fiscales séparées"],
      "alerte": null
    }
  },
  {
    "id": 364,
    "name": "Enseignement vacataire",
    "category": "cumul",
    "tags": ["enseignement", "vacation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Cours vacations parallèles",
    "legal": "✅ Activité accessoire",
    "risk": "aucun",
    "conseil": {
      "titre": "🎓 Vacation Enseignement",
      "message": "Cours donnés en parallèle.",
      "actions": ["Heures complémentaires limitées", "Cumul rémunérations autorisé", "Repos hebdomadaire à préserver", "Déclaration vacations"],
      "alerte": null
    }
  },
  {
    "id": 365,
    "name": "Mandat électif",
    "category": "cumul",
    "tags": ["élu", "mandat"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Mandat élu local",
    "legal": "✅ Autorisations absences",
    "risk": "aucun",
    "conseil": {
      "titre": "🗳️ Mandat Électif",
      "message": "Élu local + salarié.",
      "actions": ["Autorisations d'absence pour mandats", "Crédits heures selon mandat", "Protection statut élu", "Cumul rémunérations plafonné"],
      "alerte": null
    }
  },
  {
    "id": 366,
    "name": "Activité artistique",
    "category": "cumul",
    "tags": ["intermittent", "artiste"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Activité artistique parallèle",
    "legal": "✅ Régimes cumulables",
    "risk": "aucun",
    "conseil": {
      "titre": "🎭 Activité Artistique",
      "message": "Artiste + salarié.",
      "actions": ["Cumul régimes sociaux possible", "Cachet + salariat", "Déclarations séparées", "Pas concurrence sauf clause"],
      "alerte": null
    }
  },
  {
    "id": 367,
    "name": "Réserve militaire",
    "category": "cumul",
    "tags": ["réserve", "défense"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Engagement réserve",
    "legal": "✅ Autorisations légales",
    "risk": "aucun",
    "conseil": {
      "titre": "🎖️ Réserve Militaire",
      "message": "Réserviste + salarié.",
      "actions": ["Autorisations absence pour missions", "Durée : 30 jours/an maximum", "Maintien protection sociale", "Cumul rémunérations autorisé"],
      "alerte": null
    }
  },
  {
    "id": 368,
    "name": "Pompier volontaire",
    "category": "cumul",
    "tags": ["pompier", "volontariat"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Sapeur-pompier volontaire",
    "legal": "✅ Activité civique",
    "risk": "aucun",
    "conseil": {
      "titre": "🚒 Pompier Volontaire",
      "message": "SPV + salarié.",
      "actions": ["Autorisations absence pour interventions", "Protection juridique activité", "Cumul indemnités autorisé", "Valorisation engagement"],
      "alerte": null
    }
  },
  {
    "id": 369,
    "name": "Activité associative rémunérée",
    "category": "cumul",
    "tags": ["association", "complément"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Rémunération association",
    "legal": "✅ Cumul encadré",
    "risk": "aucun",
    "conseil": {
      "titre": "🤝 Association",
      "message": "Activité associative rémunérée.",
      "actions": ["Cumul possible dans limites", "Déclaration selon montants", "Cotisations sociales si seuils", "Pas concurrence employeur"],
      "alerte": null
    }
  },
  {
    "id": 370,
    "name": "Travail saisonnier complémentaire",
    "category": "cumul",
    "tags": ["saisonnier", "période"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Saison complément activité",
    "legal": "✅ Cumul temporaire",
    "risk": "aucun",
    "conseil": {
      "titre": "🌞 Saisonnier",
      "message": "Activité saisonnière en complément.",
      "actions": ["Cumul contrats possible", "Repos global à respecter", "Déclarations distinctes", "Période définie"],
      "alerte": null
    }
  },
  {
    "id": 371,
    "name": "Formateur occasionnel",
    "category": "cumul",
    "tags": ["formation", "vacation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Prestations formation ponctuelles",
    "legal": "✅ Activité accessoire",
    "risk": "aucun",
    "conseil": {
      "titre": "🎓 Formation",
      "message": "Formateur occasionnel.",
      "actions": ["Limite 30 jours/an/organisme", "Exonération charges dans limites", "Cumul rémunérations", "Déclaration activité"],
      "alerte": null
    }
  },
  {
    "id": 372,
    "name": "Expertise judiciaire",
    "category": "cumul",
    "tags": ["expertise", "justice"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Missions expertise judiciaire",
    "legal": "✅ Activité civique",
    "risk": "aucun",
    "conseil": {
      "titre": "⚖️ Expert Judiciaire",
      "message": "Expertise pour tribunaux.",
      "actions": ["Inscription liste experts nécessaire", "Missions ponctuelles", "Honoraires distincts salaire", "Autorisations absence possible"],
      "alerte": null
    }
  },
  {
    "id": 373,
    "name": "Arbitrage sportif",
    "category": "cumul",
    "tags": ["sport", "arbitre"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Arbitre sportif",
    "legal": "✅ Activité sportive",
    "risk": "aucun",
    "conseil": {
      "titre": "⚽ Arbitrage",
      "message": "Arbitre + salarié.",
      "actions": ["Indemnités arbitrage cumulables", "Licence fédération requise", "Disponibilité week-ends généralement", "Activité non concurrente"],
      "alerte": null
    }
  },
  {
    "id": 374,
    "name": "Conseil syndical copropriété",
    "category": "cumul",
    "tags": ["copropriété", "bénévolat"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Membre conseil syndical",
    "legal": "✅ Activité bénévole",
    "risk": "aucun",
    "conseil": {
      "titre": "🏢 Conseil Syndical",
      "message": "Membre conseil syndical.",
      "actions": ["Activité bénévole généralement", "Pas rémunération (sauf cas)", "Temps personnel", "Pas conflit avec emploi"],
      "alerte": null
    }
  },
  {
    "id": 375,
    "name": "Jury d'examen",
    "category": "cumul",
    "tags": ["jury", "vacation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Participation jurys examens",
    "legal": "✅ Mission ponctuelle",
    "risk": "aucun",
    "conseil": {
      "titre": "📋 Jury Examen",
      "message": "Évaluateur examens/concours.",
      "actions": ["Vacations ponctuelles", "Indemnisation selon grilles", "Autorisations absence possibles", "Valorisation expertise"],
      "alerte": null
    }
  },
  {
    "id": 376,
    "name": "Traduction freelance",
    "category": "cumul",
    "tags": ["traduction", "indépendant"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Traductions ponctuelles",
    "legal": "✅ Activité indépendante",
    "risk": "aucun",
    "conseil": {
      "titre": "🌐 Traduction",
      "message": "Traducteur indépendant + salarié.",
      "actions": ["Statut indépendant adapté", "Activité non concurrente", "Temps compatible emploi principal", "Déclarations fiscales séparées"],
      "alerte": null
    }
  },
  {
    "id": 377,
    "name": "Développeur freelance",
    "category": "cumul",
    "tags": ["développement", "projets"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Projets développement parallèles",
    "legal": "✅ Vigilance concurrence",
    "risk": "aucun",
    "conseil": {
      "titre": "💻 Dev Freelance",
      "message": "Développement + salariat.",
      "actions": ["Vérifier clause non-concurrence", "Projets hors horaires travail", "Propriété intellectuelle : attention", "Statut adapté (micro, portage...)"],
      "alerte": null
    }
  },
  {
    "id": 378,
    "name": "Consultant indépendant ponctuel",
    "category": "cumul",
    "tags": ["conseil", "missions"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Missions conseil ponctuelles",
    "legal": "✅ Cumul statuts",
    "risk": "aucun",
    "conseil": {
      "titre": "💼 Conseil",
      "message": "Consultant + salarié.",
      "actions": ["Statut indépendant complémentaire", "Missions non concurrentes", "Organisation temps compatible", "Double affiliation sociale"],
      "alerte": null
    }
  },
  {
    "id": 379,
    "name": "Location meublée courte durée",
    "category": "cumul",
    "tags": ["immobilier", "revenus"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Revenus locatifs parallèles",
    "legal": "✅ Revenus patrimoniaux",
    "risk": "aucun",
    "conseil": {
      "titre": "🏠 Location Meublée",
      "message": "Revenus fonciers + salaire.",
      "actions": ["Régime micro-BIC ou réel", "Déclaration fiscale séparée", "Pas conflit avec emploi", "Pas affiliation sociale si patrimoniaux"],
      "alerte": null
    }
  },
  {
    "id": 380,
    "name": "Droits d'auteur",
    "category": "cumul",
    "tags": ["création", "propriété intellectuelle"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Revenus propriété intellectuelle",
    "legal": "✅ Régime spécifique",
    "risk": "aucun",
    "conseil": {
      "titre": "©️ Droits Auteur",
      "message": "Créations protégées + salariat.",
      "actions": ["Régime fiscal spécifique (TS, BNC)", "Affiliation Sécurité Sociale Artistes", "Cumul rémunérations autorisé", "Déclaration Agessa/Maison Artistes"],
      "alerte": null
    }
  },
  {
    "id": 381,
    "name": "Travail handicap aménagé",
    "category": "handicap",
    "tags": ["RQTH", "aménagement"],
    "days": [{"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}],
    "desc": "Aménagements RQTH",
    "legal": "✅ Obligation aménagement",
    "risk": "aucun",
    "conseil": {
      "titre": "♿ RQTH",
      "message": "Reconnaissance Qualité Travailleur Handicapé.",
      "actions": ["Aménagements raisonnables obligatoires", "Temps travail adapté si nécessaire", "Poste adapté recherché", "Maintien emploi prioritaire"],
      "alerte": null
    }
  },
  {
    "id": 382,
    "name": "Temps partiel thérapeutique évolutif",
    "category": "sante",
    "tags": ["reprise", "progression"],
    "days": [{"h": 4, "type": "normal"}, {"h": 5, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Reprise progressive santé",
    "legal": "✅ Prescription médicale",
    "risk": "aucun",
    "conseil": {
      "titre": "🏥 Temps Partiel Thérapeutique",
      "message": "Reprise progressive après arrêt.",
      "actions": ["Prescription médecin traitant + accord médecin conseil", "Accord employeur sur modalités", "Indemnités journalières complémentaires", "Durée généralement limitée (renouvelable)"],
      "alerte": null
    }
  },
  {
    "id": 383,
    "name": "Inaptitude avec reclassement",
    "category": "sante",
    "tags": ["restriction", "adaptation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Restrictions médicales poste",
    "legal": "✅ Recherche reclassement",
    "risk": "aucun",
    "conseil": {
      "titre": "🏥 Inaptitude Partielle",
      "message": "Inaptitude à poste actuel.",
      "actions": ["Médecin travail émet restrictions", "Employeur recherche reclassement (1 mois)", "Consultation CSE obligatoire", "Licenciement si impossible (indemnités doublées)"],
      "alerte": null
    }
  },
  {
    "id": 384,
    "name": "Accident trajet domicile-travail",
    "category": "sante",
    "tags": ["accident", "trajet"],
    "days": [],
    "desc": "Accident pendant trajet",
    "legal": "✅ Accident travail",
    "risk": "aucun",
    "conseil": {
      "titre": "🚗 Accident Trajet",
      "message": "Protection accident travail applicable.",
      "actions": ["Trajet habituel domicile-travail protégé", "Déclaration dans 24h", "Même protection qu'accident travail", "Détour : qualification selon circonstances"],
      "alerte": null
    }
  },
  {
    "id": 385,
    "name": "Maladie professionnelle reconnue",
    "category": "sante",
    "tags": ["MP", "tableau"],
    "days": [],
    "desc": "Pathologie liée au travail",
    "legal": "✅ Protection renforcée",
    "risk": "aucun",
    "conseil": {
      "titre": "🏥 Maladie Professionnelle",
      "message": "Maladie reconnue d'origine professionnelle.",
      "actions": ["Déclaration CPAM dans 2 ans", "Tableaux maladies professionnelles", "Indemnisation majorée", "Obligation reclassement employeur"],
      "alerte": null
    }
  },
  {
    "id": 386,
    "name": "Prévention désinsertion professionnelle",
    "category": "sante",
    "tags": ["maintien", "emploi"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Risque perte emploi santé",
    "legal": "✅ Dispositif maintien",
    "risk": "aucun",
    "conseil": {
      "titre": "🏥 Désinsertion",
      "message": "Prévention perte emploi pour santé.",
      "actions": ["Cellule PDP (Prévention Désinsertion)", "Médecin travail coordonne", "Aménagements poste étudiés", "Financement adaptations possibles"],
      "alerte": null
    }
  },
  {
    "id": 387,
    "name": "Travailleur isolé",
    "category": "securite",
    "tags": ["isolement", "protection"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Travail sans collègue proche",
    "legal": "✅ Mesures protection",
    "risk": "aucun",
    "conseil": {
      "titre": "👤 Travailleur Isolé",
      "message": "Travail sans possibilité secours rapide.",
      "actions": ["Dispositif PTI (Protection Travailleur Isolé)", "Moyens communication garantis", "Vérifications régulières", "Procédures alerte définies"],
      "alerte": null
    }
  },
  {
    "id": 388,
    "name": "Risque psychosocial identifié",
    "category": "sante",
    "tags": ["RPS", "prévention"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Situation stress/charge",
    "legal": "✅ Prévention RPS",
    "risk": "aucun",
    "conseil": {
      "titre": "🧠 Risques Psychosociaux",
      "message": "Prévention santé mentale travail.",
      "actions": ["Document Unique évalue RPS", "Prévention collective prioritaire", "Médecin travail : orientation", "Cellule d'écoute si mise en place"],
      "alerte": null
    }
  },
  {
    "id": 389,
    "name": "Environnement hostile climat",
    "category": "securite",
    "tags": ["conditions", "extrêmes"],
    "days": [{"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}, {"h": 6, "type": "normal"}],
    "desc": "Conditions climatiques difficiles",
    "legal": "✅ Protection renforcée",
    "risk": "aucun",
    "conseil": {
      "titre": "🌡️ Conditions Extrêmes",
      "message": "Travail conditions climatiques difficiles.",
      "actions": ["EPI (Équipements Protection Individuelle) adaptés", "Pauses régulières selon température", "Organisation horaires adaptée", "Surveillance santé renforcée"],
      "alerte": null
    }
  },
  {
    "id": 390,
    "name": "Manipulation produits dangereux",
    "category": "securite",
    "tags": ["chimique", "CMR"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Exposition substances chimiques",
    "legal": "✅ Traçabilité expositions",
    "risk": "aucun",
    "conseil": {
      "titre": "☣️ Produits Dangereux",
      "message": "Manipulation substances à risque.",
      "actions": ["Formation spécifique obligatoire", "EPI fournis et portés", "Suivi médical renforcé (SMR)", "Traçabilité expositions (attestation)"],
      "alerte": null
    }
  },
  {
    "id": 391,
    "name": "Travail hauteur",
    "category": "securite",
    "tags": ["hauteur", "chute"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Interventions en hauteur",
    "legal": "✅ Formation + EPI",
    "risk": "aucun",
    "conseil": {
      "titre": "⬆️ Travail Hauteur",
      "message": "Interventions > 3 mètres.",
      "actions": ["Formation travail hauteur obligatoire", "EPI antichute certifiés", "Vérifications périodiques équipements", "Plan prévention si intervention"],
      "alerte": null
    }
  },
  {
    "id": 392,
    "name": "Conduite engins",
    "category": "securite",
    "tags": ["CACES", "autorisation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Utilisation engins de levage",
    "legal": "✅ CACES requis",
    "risk": "aucun",
    "conseil": {
      "titre": "🚜 Conduite Engins",
      "message": "Autorisation conduite obligatoire.",
      "actions": ["CACES (Certificat Aptitude) selon engin", "Autorisation conduite employeur", "Visite médicale aptitude", "Recyclage périodique"],
      "alerte": null
    }
  },
  {
    "id": 393,
    "name": "Habilitation électrique",
    "category": "securite",
    "tags": ["électricité", "habilitation"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Travaux électriques",
    "legal": "✅ Habilitation obligatoire",
    "risk": "aucun",
    "conseil": {
      "titre": "⚡ Habilitation Électrique",
      "message": "Travaux sur installations électriques.",
      "actions": ["Formation habilitation selon niveau", "Recyclage tous les 3 ans", "Autorisation employeur écrite", "EPI spécifiques fournis"],
      "alerte": null
    }
  },
  {
    "id": 394,
    "name": "Travail espaces confinés",
    "category": "securite",
    "tags": ["confiné", "atmosphère"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Intervention espace clos",
    "legal": "✅ Procédure stricte",
    "risk": "aucun",
    "conseil": {
      "titre": "🚪 Espace Confiné",
      "message": "Intervention milieu dangereux.",
      "actions": ["Permis de pénétrer obligatoire", "Analyse atmosphère préalable", "Surveillance permanente extérieure", "Formation spécifique + EPI"],
      "alerte": null
    }
  },
  {
    "id": 395,
    "name": "Exposition bruit",
    "category": "securite",
    "tags": ["bruit", "audition"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Environnement sonore élevé",
    "legal": "✅ Protection auditive",
    "risk": "aucun",
    "conseil": {
      "titre": "🔊 Exposition Bruit",
      "message": "Niveau sonore > 80 dB.",
      "actions": ["Protections auditives fournies", "Suivi audiométrique régulier", "Aménagements techniques si possible", "Formation risques auditifs"],
      "alerte": null
    }
  },
  {
    "id": 396,
    "name": "Rayonnements ionisants",
    "category": "securite",
    "tags": ["radioactivité", "dosimétrie"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Exposition sources radioactives",
    "legal": "✅ Surveillance dosimétrique",
    "risk": "aucun",
    "conseil": {
      "titre": "☢️ Rayonnements",
      "message": "Travail sources ionisantes.",
      "actions": ["Dosimètre individuel obligatoire", "Suivi médical spécialisé", "Zones contrôlées balisées", "Formation radioprotection"],
      "alerte": null
    }
  },
  {
    "id": 397,
    "name": "Amiante intervention",
    "category": "securite",
    "tags": ["amiante", "sous-section"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Travaux présence amiante",
    "legal": "✅ Certification obligatoire",
    "risk": "aucun",
    "conseil": {
      "titre": "⚠️ Amiante",
      "message": "Interventions matériaux amiantés.",
      "actions": ["Certification SS3 ou SS4 selon travaux", "EPI respiratoires spécifiques", "Suivi post-exposition (FCAATA)", "Plan retrait/confinement si désamiantage"],
      "alerte": null
    }
  },
  {
    "id": 398,
    "name": "Travail isolé nuit",
    "category": "securite",
    "tags": ["nuit", "isolement"],
    "days": [{"h": 8, "type": "nuit"}, {"h": 8, "type": "nuit"}, {"h": 8, "type": "nuit"}],
    "desc": "Nuits seul sur site",
    "legal": "✅ Protection renforcée",
    "risk": "aucun",
    "conseil": {
      "titre": "🌙 Nuit Isolé",
      "message": "Travail nuit en isolement.",
      "actions": ["PTI obligatoire", "Rondes vérification", "Moyens communication multiples", "Procédures urgence définies"],
      "alerte": null
    }
  },
  {
    "id": 399,
    "name": "Télétravail permanent étranger",
    "category": "international",
    "tags": ["remote", "étranger"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Télétravail depuis l'étranger",
    "legal": "⚠️ Implications multiples",
    "risk": "aucun",
    "conseil": {
      "titre": "🌍 Remote International",
      "message": "Télétravail permanent depuis l'étranger.",
      "actions": ["Implications fiscales majeures", "Sécurité sociale : détachement ou local", "Droit travail applicable : complexe", "Accord employeur formalisé nécessaire"],
      "alerte": null
    }
  },
  {
    "id": 400,
    "name": "Proche aidant aménagements",
    "category": "familial",
    "tags": ["aidant", "accompagnement"],
    "days": [{"h": 5, "type": "normal"}, {"h": 5, "type": "normal"}, {"h": 5, "type": "normal"}, {"h": 5, "type": "normal"}, {"h": 5, "type": "normal"}],
    "desc": "Accompagnement proche dépendant",
    "legal": "✅ Droits spécifiques",
    "risk": "aucun",
    "conseil": {
      "titre": "❤️ Proche Aidant",
      "message": "Accompagnement proche en situation dépendance.",
      "actions": ["Don jours repos entre collègues", "Congé proche aidant (3 mois renouvelable)", "Temps partiel facilité", "Allocation journalière possible (AJPA)"],
      "alerte": null
    }
  },
  {
    "id": 401,
    "name": "Fatigue chronique matinale",
    "category": "bien-etre",
    "tags": ["fatigue", "signal"],
    "days": [{"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}, {"h": 7, "type": "normal"}],
    "desc": "Épuisement dès le réveil",
    "legal": "⚠️ Signal d’alerte",
    "risk": "moyen",
    "conseil": {
      "titre": "😴 Fatigue Persistante",
      "message": "La fatigue matinale persistante est un signal d’alerte précoce.",
      "actions": ["Observer la durée : plus de 2 semaines = consulter", "Vérifier la qualité du sommeil (réveils nocturnes, apnées)", "Noter si les week-ends ne suffisent plus à récupérer", "Échanger avec le médecin traitant ou le médecin du travail"],
      "alerte": {"niveau": "warning", "texte": "⚠️ Fatigue chronique : signal précoce d'épuisement"}
    }
  },
  { "id": 402, "name": "Démotivation progressive", "category": "bien-etre", "tags": ["motivation", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Perte d’intérêt pour le travail", "legal": "⚠️ Signal engagement", "risk": "moyen", "conseil": { "titre": "📉 Démotivation", "message": "La perte d’intérêt progressive mérite attention.", "actions": ["Identifier ce qui a changé récemment (charge, reconnaissance, autonomie)", "Distinguer lassitude temporaire et démotivation profonde", "Échanger avec le manager sur les ressentis", "Explorer les possibilités d'évolution ou de formation"], "alerte": { "niveau": "info", "texte": "📉 Démotivation : identifier les causes" } } },
  { "id": 403, "name": "Cynisme croissant", "category": "bien-etre", "tags": ["attitude", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Distance émotionnelle au travail", "legal": "⚠️ Signal désengagement", "risk": "moyen", "conseil": { "titre": "🎭 Cynisme", "message": "Le cynisme est un mécanisme de défense face à l’épuisement.", "actions": ["Reconnaître ce mécanisme protecteur", "Identifier les sources de frustration ou de déception", "Rechercher des espaces d’expression sains", "Consulter si le cynisme envahit la vie personnelle"], "alerte": { "niveau": "warning", "texte": "🎭 Cynisme : mécanisme de défense contre l'épuisement" } } },
  { "id": 404, "name": "Irritabilité inhabituelle", "category": "bien-etre", "tags": ["humeur", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Réactions disproportionnées", "legal": "⚠️ Signal émotionnel", "risk": "moyen", "conseil": { "titre": "😤 Irritabilité", "message": "L’irritabilité accrue signale souvent une surcharge.", "actions": ["Observer la fréquence et l’intensité", "Identifier les déclencheurs (surcharge, manque de reconnaissance, interruptions)", "Prendre du recul avant les réactions impulsives", "Partager ses observations avec un proche de confiance"], "alerte": { "niveau": "info", "texte": "😤 Irritabilité : signal de surcharge émotionnelle" } } },
  { "id": 405, "name": "Difficultés de concentration", "category": "bien-etre", "tags": ["cognition", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Attention dispersée", "legal": "⚠️ Signal cognitif", "risk": "moyen", "conseil": { "titre": "🧠 Concentration", "message": "Les difficulties de concentration témoignent d’une fatigue cognitive.", "actions": ["Limiter le multitâche et les interruptions", "Bloquer des plages de travail concentré (2h max)", "Faire des pauses régulières (5-10 min toutes les 2h)", "Consulter si les troubles persistent hors travail"], "alerte": { "niveau": "warning", "texte": "🧠 Concentration : fatigue cognitive" } } },
  { "id": 406, "name": "Troubles du sommeil liés au travail", "category": "bien-etre", "tags": ["sommeil", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Insomnies liées au travail", "legal": "⚠️ Signal stress", "risk": "moyen", "conseil": { "titre": "😴 Troubles du Sommeil", "message": "Les insomnies liées au travail signalent un stress important.", "actions": ["Noter la fréquence (3+ fois/semaine = consulter)", "Pratiquer une routine de déconnexion le soir (1h avant le coucher)", "Éviter les écrans et les réflexions professionnelles au lit", "Consulter un médecin si cela dure plus de 3 semaines"], "alerte": { "niveau": "warning", "texte": "😴 Insomnie persistante : consulter" } } },
  { "id": 407, "name": "Ruminations professionnelles", "category": "bien-etre", "tags": ["pensées", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Pensées obsédantes sur le travail", "legal": "⚠️ Signal mental", "risk": "moyen", "conseil": { "titre": "🌀 Ruminations", "message": "Les ruminations envahissantes indiquent une charge mentale excessive.", "actions": ["Pratiquer des techniques d’arrêt de pensées (respiration, activité)", "Définir un moment unique de réflexion pro (30 min max)", "Noter les pensées pour les libérer", "Consulter si les ruminations sont constantes le week-end"], "alerte": { "niveau": "warning", "texte": "🌀 Ruminations : charge mentale excessive" } } },
  { "id": 408, "name": "Perte d’efficacité ressentie", "category": "bien-etre", "tags": ["performance", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Sentiment d'inefficacité", "legal": "⚠️ Signal accomplissement", "risk": "moyen", "conseil": { "titre": "📊 Efficacité", "message": "Le sentiment d’inefficacité peut être subjectif mais significatif.", "actions": ["Distinguer baisse réelle vs perception", "Lister les accomplissements récents (même petits)", "Identifier les obstacles objectifs (moyens, temps, clarté)", "Échanger avec le manager sur les ressources nécessaires"], "alerte": { "niveau": "info", "texte": "📊 Inefficacité : vérifier l'objectivité" } } },
  { "id": 409, "name": "Isolement social au travail", "category": "bien-etre", "tags": ["social", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Retrait des relations avec les collègues", "legal": "⚠️ Signal social", "risk": "moyen", "conseil": { "titre": "🚶 Isolement", "message": "Le retrait social progressif est un signal d’alerte important.", "actions": ["Observer si le retrait est choisi ou subi", "Maintenir au moins 1 à 2 interactions sociales par jour", "Participer occasionnellement aux moments informels", "Consulter si l’isolement s’étend à la vie personnelle"], "alerte": { "niveau": "warning", "texte": "🚶 Isolement : signal de protection contre l'épuisement" } } },
  { "id": 410, "name": "Maux physiques répétés", "category": "bien-etre", "tags": ["somatisation", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Douleurs sans cause médicale apparente", "legal": "⚠️ Signal somatique", "risk": "moyen", "conseil": { "titre": "🤕 Somatisation", "message": "Les maux physiques récurrents peuvent traduire un stress.", "actions": ["Consulter un médecin pour écarter les causes organiques", "Noter la corrélation avec les périodes ou projets stressants", "Techniques de relaxation (respiration, yoga, méditation)", "Envisager un accompagnement psychologique si le lien est confirmé"], "alerte": { "niveau": "info", "texte": "🤕 Maux répétés : vérifier le lien avec le stress" } } },
  { "id": 411, "name": "Appétit perturbé", "category": "bien-etre", "tags": ["alimentation", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Changement des habitudes alimentaires", "legal": "⚠️ Signal physiologique", "risk": "faible", "conseil": { "titre": "🍽️ Appétit", "message": "Les changements d’appétit peuvent refléter un stress.", "actions": ["Observer s'il y a perte ou augmentation de l'appétit", "Noter si l’alimentation devient une source de réconfort ou d'oubli", "Maintenir des pauses repas régulières", "Consulter si une variation de poids significative survient (>5%)"], "alerte": null } },
  { "id": 412, "name": "Émotions à fleur de peau", "category": "bien-etre", "tags": ["émotions", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Sensibilité émotionnelle accrue", "legal": "⚠️ Signal émotionnel", "risk": "moyen", "conseil": { "titre": "😢 Émotivité", "message": "L’hypersensibilité émotionnelle signale une vulnérabilité.", "actions": ["Accueillir les émotions sans jugement", "Identifier les déclencheurs émotionnels", "Prendre du recul avant les situations émotionnelles", "Consulter si les émotions deviennent ingérables au quotidien"], "alerte": { "niveau": "info", "texte": "😢 Émotivité : signal de vulnérabilité" } } },
  { "id": 413, "name": "Procrastination croissante", "category": "bien-etre", "tags": ["évitement", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Report systématique des tâches", "legal": "⚠️ Signal évitement", "risk": "moyen", "conseil": { "titre": "⏰ Procrastination", "message": "La procrastination excessive peut traduire un évitement ou une surcharge.", "actions": ["Distinguer les tâches ennuyeuses vs anxiogènes", "Technique des 5 min : commencer juste 5 min", "Découper les tâches en micro-actions", "Identifier si une peur de l'échec ou un perfectionnisme bloque"], "alerte": { "niveau": "info", "texte": "⏰ Procrastination : identifier la cause" } } },
  { "id": 414, "name": "Besoin de contrôle excessif", "category": "bien-etre", "tags": ["contrôle", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Hypercontrôle des activités", "legal": "⚠️ Signal anxiété", "risk": "moyen", "conseil": { "titre": "🎯 Hypercontrôle", "message": "Le besoin de tout contrôler peut traduire une anxiété.", "actions": ["Observer si le besoin de contrôle augmente avec le stress", "Pratiquer la délégation progressive", "Accepter les imperfections non critiques", "Identifier les peurs sous-jacentes (jugement, échec)"], "alerte": { "niveau": "info", "texte": "🎯 Hypercontrôle : mécanisme d'anxiété" } } },
  { "id": 415, "name": "Perte de sens au travail", "category": "bien-etre", "tags": ["sens", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Questionnement sur l'utilité", "legal": "⚠️ Signal existentiel", "risk": "moyen", "conseil": { "titre": "❓ Perte de Sens", "message": "Le questionnement sur le sens mérite une attention particulière.", "actions": ["Identifier ses valeurs personnelles importantes", "Reconnecter les tâches à l'impact final", "Échanger avec des pairs sur la vision du métier", "Explorer des possibilités de contributions différentes"], "alerte": { "niveau": "warning", "texte": "❓ Perte de sens : signal important pour le bien-être" } } },
  { "id": 416, "name": "Sentiment de dévalorisation", "category": "bien-etre", "tags": ["estime", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Doute sur ses compétences", "legal": "⚠️ Signal estime", "risk": "moyen", "conseil": { "titre": "💔 Dévalorisation", "message": "Le sentiment de dévalorisation peut être induit par l’environnement.", "actions": ["Lister les compétences et réussites objectives", "Distinguer les critiques constructives vs destructives", "Solliciter un feedback positif explicite", "Consulter si ce sentiment envahit la vie personnelle"], "alerte": { "niveau": "info", "texte": "💔 Dévalorisation : vérifier l'environnement" } } },
  { "id": 417, "name": "Augmentation des addictions", "category": "bien-etre", "tags": ["addiction", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Consommation de substances augmentée", "legal": "⚠️ Signal compensation", "risk": "élevé", "conseil": { "titre": "⚠️ Addictions", "message": "L’augmentation des consommations peut compenser un stress.", "actions": ["Observer la corrélation stress/consommation", "Noter la fréquence et les quantités", "Identifier les besoins sous-jacents (détente, évasion, énergie)", "Consulter un addictologue si la consommation est quotidienne"], "alerte": { "niveau": "danger", "texte": "⚠️ Addictions : consulter rapidement" } } },
  { "id": 418, "name": "Sentiment d’être débordé", "category": "bien-etre", "tags": ["surcharge", "signal"], "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }], "desc": "Impression permanente de retard", "legal": "⚠️ Signal charge", "risk": "moyen", "conseil": { "titre": "🌊 Débordement", "message": "Le sentiment permanent de débordement signale une surcharge.", "actions": ["Lister objectivement la charge vs le temps disponible", "Identifier les tâches critiques vs accessoires", "Communiquer les impossibilités à la hiérarchie", "Demander une priorisation si tout semble urgent"], "alerte": { "niveau": "warning", "texte": "🌊 Débordé : réévaluer la charge réelle" } } },
  { "id": 419, "name": "Difficultés décisionnelles", "category": "bien-etre", "tags": ["décision", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Paralysie devant la décision", "legal": "⚠️ Signal cognitif", "risk": "moyen", "conseil": { "titre": "🤔 Indécision", "message": "La difficulté à décider peut traduire une saturation cognitive.", "actions": ["Limiter les décisions importantes en période de fatigue", "Utiliser des techniques de décision (pour/contre, matrice)", "Accepter des décisions imparfaites si elles sont réversibles", "Déléguer les décisions non critiques"], "alerte": { "niveau": "info", "texte": "🤔 Indécision : saturation cognitive" } } },
  { "id": 420, "name": "Oublis fréquents professionnels", "category": "bien-etre", "tags": ["mémoire", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Trous de mémoire répétés", "legal": "⚠️ Signal mémoire", "risk": "moyen", "conseil": { "titre": "🧠 Oublis", "message": "Les oublis fréquents peuvent indiquer une surcharge mentale.", "actions": ["Externaliser la mémoire (notes, rappels, to-do)", "Limiter la charge cognitive simultanée", "Vérifier la qualité du sommeil (essentiel pour la mémoire)", "Consulter si les oublis s’aggravent ou s’étendent"], "alerte": { "niveau": "info", "texte": "🧠 Oublis : surcharge mentale" } } },
  { "id": 421, "name": "Baisse de libido liée au stress", "category": "bien-etre", "tags": ["intimité", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Désintérêt sexuel", "legal": "⚠️ Signal bien-être", "risk": "faible", "conseil": { "titre": "💑 Libido", "message": "La baisse de libido peut refléter un stress chronique.", "actions": ["Observer la corrélation avec les périodes stressantes", "Écarter les causes médicales avec un médecin", "Communiquer avec son partenaire sans culpabilité", "Prioriser le sommeil et la récupération"], "alerte": null } },
  { "id": 422, "name": "Désintérêt pour les loisirs", "category": "bien-etre", "tags": ["loisirs", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Abandon des activités de plaisir", "legal": "⚠️ Signal anhédonie", "risk": "moyen", "conseil": { "titre": "🎨 Loisirs", "message": "L’abandon des loisirs est un signal d’alerte significatif.", "actions": ["Observer si c'est par manque de temps ou manque d'envie", "Maintenir au moins 1 activité plaisir par semaine", "Distinguer fatigue légitime vs anhédonie", "Consulter si le désintérêt est général depuis plus de 2 semaines"], "alerte": { "niveau": "warning", "texte": "🎨 Désintérêt loisirs : signal d'anhédonie" } } },
  { "id": 423, "name": "Anxiété anticipatoire du travail", "category": "bien-etre", "tags": ["anxiété", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Angoisse du dimanche soir", "legal": "⚠️ Signal anxiété", "risk": "moyen", "conseil": { "titre": "😰 Anxiété Anticipatoire", "message": "L’angoisse du dimanche soir révèle souvent un mal-être professionnel.", "actions": ["Identifier les sources précises d’anxiété (personne, tâche, ambiance)", "Préparer le lundi soir dès le vendredi (soulage l'anticipation)", "Pratiquer des techniques d’apaisement (respiration, relaxation)", "Consulter si l’anxiété paralyse les week-ends"], "alerte": { "niveau": "warning", "texte": "😰 Dimanche soir : identifier les sources de stress" } } },
  { "id": 424, "name": "Pleurs au travail", "category": "bien-etre", "tags": ["émotions", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Larmes répétées au bureau", "legal": "⚠️ Signal détresse", "risk": "élevé", "conseil": { "titre": "😭 Pleurs", "message": "Les pleurs au travail signalent une détresse importante.", "actions": ["Ne pas minimiser : c'est un signal d'alarme sérieux", "S’isoler pour reprendre le contrôle si besoin", "Identifier les déclencheurs et la fréquence", "Consulter un médecin du travail ou un psychologue rapidement"], "alerte": { "niveau": "danger", "texte": "😭 Pleurs répétés : détresse - consulter" } } },
  { "id": 425, "name": "Pensées de fuite/démission", "category": "bien-etre", "tags": ["fuite", "signal"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Envie permanente de partir", "legal": "⚠️ Signal évitement", "risk": "élevé", "conseil": { "titre": "🏃 Envie de Fuir", "message": "Les pensées de fuite fréquentes indiquent un mal-être profond.", "actions": ["Distinguer les pensées occasionnelles vs obsédantes", "Identifier ce dont on veut fuir (environnement, charge, personnes)", "Envisager des solutions intermédiaires avant la démission", "Consulter avant toute décision importante si l’état émotionnel est fragile"], "alerte": { "niveau": "warning", "texte": "🏃 Envie de fuir constante : signal de mal-être" } } },
  { "id": 426, "name": "Charge de travail réaliste", "category": "organisation", "tags": ["charge", "équilibre"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Charge équilibrée par rapport au temps", "legal": "✅ Situation saine", "risk": "aucun", "conseil": { "titre": "✅ Charge Équilibrée", "message": "Une charge alignée avec le temps disponible favorise le bien-être.", "actions": ["Maintenir l'équilibre charge/ressources", "Anticiper les pics d'activité avec des moyens adaptés", "Communiquer proactivement si un déséquilibre est prévu", "Reconnaître qu'une charge soutenable est un acquis fragile"], "alerte": null } },
  { "id": 427, "name": "Heures sup occasionnelles", "category": "organisation", "tags": ["heures", "ponctuel"], "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Dépassement ponctuel justifié", "legal": "✅ Acceptable si exceptionnel", "risk": "faible", "conseil": { "titre": "⏱️ Heures Sup Ponctuelles", "message": "Les dépassements exceptionnels sont normaux s'ils sont compensés.", "actions": ["Vérifier le caractère vraiment exceptionnel", "S’assurer d'une récupération équivalente après le pic", "Communiquer avec le manager sur la temporalité", "Alerter si l’exceptionnel devient régulier"], "alerte": null } },
  { "id": 428, "name": "Pic d'activité prévu", "category": "organisation", "tags": ["temporaire", "gestion"], "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Période intense anticipée", "legal": "✅ Gérable si borné", "risk": "faible", "conseil": { "titre": "📈 Pic d'Activité", "message": "Les pics prévus sont gérables avec une préparation et une fin claire.", "actions": ["Confirmer une date de fin explicite du pic", "Prioriser impitoyablement pendant le pic", "Prévoir une récupération post-pic (congés, rythme allégé)", "Reporter tout ce qui est non urgent hors de cette période"], "alerte": null } },
  { "id": 429, "name": "Charge chronique élevée", "category": "organisation", "tags": ["surcharge", "chronique"], "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }], "desc": "Surcharge permanente", "legal": "⚠️ Situation insoutenable", "risk": "élevé", "conseil": { "titre": "⚠️ Surcharge Chronique", "message": "Une charge chroniquement élevée conduit à l’épuisement.", "actions": ["Documenter la charge réelle vs attendue", "Communiquer sur l'impossibilité de maintien du rythme", "Demander un arbitrage des priorités ou des moyens supplémentaires", "Soliciter le médecin du travail si impact sur la santé"], "alerte": { "niveau": "danger", "texte": "⚠️ Surcharge chronique : risque de burn-out" } } },
  { "id": 430, "name": "Objectifs contradictoires", "category": "organisation", "tags": ["conflits", "priorités"], "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }], "desc": "Demandes incompatibles", "legal": "⚠️ Charge mentale", "risk": "moyen", "conseil": { "titre": "🎯 Objectifs Conflictuels", "message": "Les objectifs contradictoires génèrent stress et inefficacité.", "actions": ["Formaliser par écrit les demandes contradictoires", "Solliciter un arbitrage explicite de la hiérarchie", "Communiquer sur l'impossibilité de satisfaire tout en même temps", "Documenter les décisions pour la traçabilité"], "alerte": { "niveau": "info", "texte": "🎯 Conflits : demander un arbitrage" } } },
  { "id": 431, "name": "Délais irréalistes récurrents", "category": "organisation", "tags": ["délais", "pression"], "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }], "desc": "Échéances systématiquement serrées", "legal": "⚠️ Pression chronique", "risk": "moyen", "conseil": { "titre": "⏰ Délais Irréalistes", "message": "Les délais constants trop courts créent du stress et des erreurs.", "actions": ["Documenter le temps réel vs les délais imposés", "Proposer des planifications alternatives réalistes", "Communiquer sur l'impact qualité si les délais sont maintenus", "Signaler le pattern récurrent à la hiérarchie"], "alerte": { "niveau": "warning", "texte": "⏰ Délais constants courts : pression insoutenable" } } },
  { "id": 432, "name": "Multiplicité de projets simultanés", "category": "organisation", "tags": ["multitâche", "dispersion"], "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }], "desc": "Trop de projets en parallèle", "legal": "⚠️ Dispersion cognitive", "risk": "moyen", "conseil": { "titre": "🎪 Multi-Projets", "message": "La multiplication des projets disperse l’attention et réduit l’efficacité.", "actions": ["Lister tous les projets en cours (souvent sous-estimés)", "Demander une priorisation : top 3 projets", "Communiquer le coût des changements de contexte fréquents", "Négocier une réduction du parallélisme si >5 projets"], "alerte": { "niveau": "info", "texte": "🎪 >5 projets simultanés : dispersion" } } },
  { "id": 433, "name": "Interruptions constantes", "category": "organisation", "tags": ["interruption", "concentration"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Sollicitations permanentes", "legal": "⚠️ Fragmentation de l'attention", "risk": "moyen", "conseil": { "titre": "🔔 Interruptions", "message": "Les interruptions constantes épuisent et réduisent la productivité.", "actions": ["Quantifier les interruptions réelles", "Bloquer des créneaux sans interruption (ex: 2h le matin)", "Signaler sa disponibilité (calendrier, statut)", "Échanger avec l'équipe sur la culture des urgences"], "alerte": { "niveau": "info", "texte": "🔔 Interruptions : bloquer du temps focus" } } },
  { "id": 434, "name": "Urgences permanentes", "category": "organisation", "tags": ["urgence", "pression"], "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }], "desc": "Tout est prioritaire", "legal": "⚠️ Culture dysfonctionnelle", "risk": "moyen", "conseil": { "titre": "🚨 Tout Urgent", "message": "Si tout est urgent, rien n’est vraiment urgent.", "actions": ["Questionner les urgences : vraie vs ressentie", "Demander des critères de priorisation explicites", "Proposer une matrice urgence/importance", "Identifier les causes organisationnelles des urgences"], "alerte": { "niveau": "warning", "texte": "🚨 Urgences permanentes : dysfonctionnement" } } },
  { "id": 435, "name": "Tâches hors périmètre", "category": "organisation", "tags": ["périmètre", "débordement"], "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }], "desc": "Missions non prévues au poste", "legal": "⚠️ Dérive du périmètre", "risk": "moyen", "conseil": { "titre": "📋 Hors Périmètre", "message": "L’accumulation de tâches hors périmètre surcharge et démotive.", "actions": ["Clarifier le périmètre théorique vs réel", "Quantifier le temps passé hors périmètre (%)", "Discuter de la priorisation avec le manager", "Formaliser l'évolution de la fiche de poste si c'est permanent"], "alerte": { "niveau": "info", "texte": "📋 >30% hors périmètre : clarifier" } } },
  { "id": 436, "name": "Travail invisible non reconnu", "category": "organisation", "tags": ["reconnaissance", "invisible"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Tâches support non valorisées", "legal": "⚠️ Charge ignorée", "risk": "moyen", "conseil": { "titre": "👻 Travail Invisible", "message": "Le travail invisible (coordination, support) est une charge réelle.", "actions": ["Lister les tâches invisibles (emails, coordination, formation)", "Quantifier le temps réel consacré", "Communiquer cette charge à la hiérarchie", "Demander reconnaissance ou réduction"], "alerte": { "niveau": "info", "texte": "👻 Travail invisible : charge réelle" } } },
  { "id": 437, "name": "Meetings envahissants", "category": "organisation", "tags": ["réunions", "temps"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": ">50% du temps en réunion", "legal": "⚠️ Réunionite", "risk": "moyen", "conseil": { "titre": "📅 Trop de Réunions", "message": "L’excès de réunions réduit le temps de travail réel.", "actions": ["Quantifier le temps de réunion hebdomadaire", "Décliner les réunions sans valeur ajoutée claire", "Proposer des alternatives (async, compte-rendu)", "Bloquer des créneaux de production protégés"], "alerte": { "niveau": "info", "texte": "📅 >50% réunions : revoir la participation" } } },
  { "id": 438, "name": "Préparation de réunions chronophage", "category": "organisation", "tags": ["préparation", "charge"], "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }], "desc": "Temps de préparation excessif", "legal": "⚠️ Charge cachée", "risk": "faible", "conseil": { "titre": "📊 Préparation Réunions", "message": "Le temps de préparation est souvent sous-estimé.", "actions": ["Intégrer le temps de préparation dans la charge globale", "Questionner le niveau de détail vraiment utile", "Mutualiser les préparations si possible", "Refuser les réunions improvisées sans temps de préparation"], "alerte": null } },
  { "id": 439, "name": "Reporting excessif", "category": "organisation", "tags": ["reporting", "bureaucratie"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Trop de temps consacré au reporting", "legal": "⚠️ Bureaucratie", "risk": "moyen", "conseil": { "titre": "📈 Reporting Excessif", "message": "Le reporting excessif réduit le temps de travail productif.", "actions": ["Quantifier le temps de reporting réel", "Identifier les redondances entre reportings", "Proposer des simplifications ou automatisations", "Questionner l'utilité réelle de chaque reporting"], "alerte": { "niveau": "info", "texte": "📈 Reporting : vérifier l'utilité réelle" } } },
  { "id": 440, "name": "Emails envahissants", "category": "organisation", "tags": ["emails", "surcharge"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": ">100 emails par jour", "legal": "⚠️ Infobésité", "risk": "moyen", "conseil": { "titre": "📧 Infobésité", "message": "Le volume élevé d’emails génère stress et dispersion.", "actions": ["Filtrer les emails : important vs bruit", "Dédier des créneaux au traitement (2-3/jour)", "Se désabonner des listes inutiles", "Promouvoir les alternatives (chat, documentation)"], "alerte": { "niveau": "info", "texte": "📧 >100 emails/jour : filtrer" } } },
  { "id": 441, "name": "Disponibilité attendue constante", "category": "organisation", "tags": ["disponibilité", "pression"], "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }], "desc": "Réactivité immédiate exigée", "legal": "⚠️ Pression réactivité", "risk": "moyen", "conseil": { "titre": "⚡ Réactivité Immédiate", "message": "L’attente de réactivité constante empêche le travail profond.", "actions": ["Clarifier les SLA réels (délais de réponse raisonnables)", "Communiquer ses créneaux de disponibilité vs focus", "Éduquer les collègues sur les délais raisonnables", "Questionner la culture de l'immédiateté avec l'équipe"], "alerte": { "niveau": "warning", "texte": "⚡ Réactivité constante : empêche la concentration" } } },
  { "id": 442, "name": "Perfectionnisme attendu", "category": "organisation", "tags": ["perfectionnisme", "pression"], "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }], "desc": "Zéro erreur toléré", "legal": "⚠️ Pression qualité", "risk": "moyen", "conseil": { "titre": "💎 Perfectionnisme", "message": "Le perfectionnisme excessif épuise et ralentit.", "actions": ["Identifier le niveau de qualité vraiment requis par tâche", "Appliquer le principe 80/20 (80% résultats pour 20% effort)", "Accepter le 'assez bien' pour les tâches non critiques", "Distinguer perfectionnisme sain vs pathologique"], "alerte": { "niveau": "info", "texte": "💎 Perfectionnisme : doser selon les enjeux" } } },
  { "id": 443, "name": "Manque d'autonomie de décision", "category": "organisation", "tags": ["autonomie", "validation"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Validations multiples requises", "legal": "⚠️ Autonomie limitée", "risk": "moyen", "conseil": { "titre": "🔒 Manque d'Autonomie", "message": "Le manque d’autonomie ralentit et démotive.", "actions": ["Identifier les décisions nécessitant vraiment une validation", "Proposer un cadre d'autonomie claire (montants, sujets)", "Documenter les délais causés par les validations", "Échanger sur le degré d'autonomie souhaité/possible"], "alerte": { "niveau": "info", "texte": "🔒 Validation systématique : frein à l'efficacité" } } },
  { "id": 444, "name": "Changements fréquents de priorités", "category": "organisation", "tags": ["stabilité", "changement"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Priorités mouvantes", "legal": "⚠️ Instabilité", "risk": "moyen", "conseil": { "titre": "🎲 Priorités Mouvantes", "message": "Les changements fréquents de cap épuisent et frustrent.", "actions": ["Quantifier la fréquence des changements (hebdomadaire?)", "Demander une visibilité à moyen terme (mois)", "Solliciter des explications lors des changements", "Documenter l'impact des changements sur les projets"], "alerte": { "niveau": "warning", "texte": "🎲 Changements constants : frustration" } } },
  { "id": 445, "name": "Outils inadaptés", "category": "organisation", "tags": ["outils", "productivité"], "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }], "desc": "Logiciels limitants", "legal": "⚠️ Moyens insuffisants", "risk": "moyen", "conseil": { "titre": "🔧 Outils Inadaptés", "message": "Des outils inadaptés génèrent frustration et perte de temps.", "actions": ["Quantifier le temps perdu (bugs, lenteur, contournements)","Remonter les dysfonctionnements précisément", "Proposer des alternatives documentées", "Demander une formation si l'outil est complexe"], "alerte": { "niveau": "info", "texte": "🔧 Outils limitants : perte de temps" } } },
  { "id": 446, "name": "Formation insuffisante pour les nouvelles tâches", "category": "organisation", "tags": ["formation", "compétences"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Missions sans préparation", "legal": "⚠️ Accompagnement manquant", "risk": "moyen", "conseil": { "titre": "📚 Formation Manquante", "message": "L’absence de formation génère stress et sentiment d’incompétence.", "actions": ["Formaliser des besoins de formation spécifiques", "Demander un temps de formation adéquat", "Solliciter un mentorat si la formation formelle est impossible", "Communiquer sur les difficultés liées au manque de formation"], "alerte": { "niveau": "info", "texte": "📚 Nouvelles missions : formation nécessaire" } } },
  { "id": 447, "name": "Polyvalence excessive", "category": "organisation", "tags": ["polyvalence", "dispersion"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Trop de domaines différents à gérer", "legal": "⚠️ Dispersion des compétences", "risk": "moyen", "conseil": { "titre": "🎭 Polyvalence Excessive", "message": "La polyvalence extrême empêche l’expertise et génère de la fatigue.", "actions": ["Lister les domaines de compétence sollicités", "Identifier le cœur de métier vs le périphérique", "Discuter spécialisation vs polyvalence", "Négocier une réduction de l’éventail si trop large"], "alerte": { "niveau": "info", "texte": "🎭 Trop de polyvalence : dispersion" } } },
  { "id": 448, "name": "Ressources insuffisantes dans l'équipe", "category": "organisation", "tags": ["équipe", "moyens"], "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }], "desc": "Sous-effectif chronique", "legal": "⚠️ Moyens humains", "risk": "moyen", "conseil": { "titre": "👥 Sous-Effectif", "message": "Le sous-effectif reporté constamment pèse sur chacun.", "actions": ["Documenter la charge par personne vs standard", "Identifier les tâches non faites par manque de temps", "Communiquer sur l'impact du sous-effectif sur les objectifs", "Solliciter un renfort ou une révision du périmètre"], "alerte": { "niveau": "warning", "texte": "👥 Sous-effectif : charge excessive" } } },
  { "id": 449, "name": "Turn-over élevé dans l'équipe", "category": "organisation", "tags": ["instabilité", "équipe"], "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }], "desc": "Départs fréquents de collègues", "legal": "⚠️ Signal organisationnel", "risk": "moyen", "conseil": { "titre": "🚪 Turn-Over", "message": "Un turn-over élevé est un signal d’alerte organisationnel.", "actions": ["Observer le pattern des départs (raisons communes?)", "Gérer la charge supplémentaire des transitions", "Demander un renfort pendant les périodes d’apprentissage", "Questionner les causes structurelles des départs"], "alerte": { "niveau": "warning", "texte": "🚪 Turn-over : signal de dysfonctionnement" } } },
  { "id": 450, "name": "Charge mentale invisible", "category": "organisation", "tags": ["mental", "invisible"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Gestion non visible", "legal": "⚠️ Charge cognitive", "risk": "moyen", "conseil": { "titre": "🧠 Charge Mentale", "message": "La charge mentale (anticiper, coordonner) est épuisante quoique invisible.", "actions": ["Lister toutes les micro-tâches mentales (rappels, coordination)", "Externaliser la mémoire (outils, listes)", "Communiquer cette charge à la hiérarchie", "Déléguer ce qui peut l’être"], "alerte": { "niveau": "info", "texte": "🧠 Charge mentale : épuisante quoique invisible" } } },
  { "id": 451, "name": "Équilibre pro-perso maintenu", "category": "equilibre", "tags": ["équilibre", "bien-être"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Frontières saines", "legal": "✅ Situation idéale", "risk": "aucun", "conseil": { "titre": "✅ Équilibre Sain", "message": "L’équilibre pro-perso est essentiel au bien-être durable.", "actions": ["Protéger cet équilibre comme un acquis fragile", "Rester vigilant face aux dérives progressives", "Communiquer ses limites dès les sollicitations excessives", "Cultiver des activités ressourçantes régulières"], "alerte": null } },
  { "id": 452, "name": "Déconnexion effective le soir", "category": "deconnexion", "tags": ["soir", "repos"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Arrêt du travail à 19h", "legal": "✅ Droit à la déconnexion", "risk": "aucun", "conseil": { "titre": "🌙 Déconnexion Soir", "message": "La déconnexion effective le soir permet la récupération.", "actions": ["Rituel de fermeture de journée (to-do lendemain, fermer apps)", "Pas d'emails/messages pro après une heure définie", "Activité de transition pro-perso (sport, lecture, famille)", "Respecter son propre droit à la déconnexion"], "alerte": null } },
  { "id": 453, "name": "Week-ends préservés", "category": "equilibre", "tags": ["weekend", "repos"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Samedi-dimanche sans travail pro", "legal": "✅ Repos hebdo", "risk": "aucun", "conseil": { "titre": "🏖️ Week-Ends Libres", "message": "Les week-ends sans travail permettent une récupération profonde.", "actions": ["Couper les notifications pro le vendredi soir", "Planifier des activités ressourçantes le week-end", "Refuser les sollicitations sauf vraie urgence", "Communiquer son indisponibilité le week-end si besoin"], "alerte": null } },
  { "id": 454, "name": "Congés vraiment déconnectés", "category": "deconnexion", "tags": ["congés", "coupure"], "days": [], "desc": "Vacances sans travail", "legal": "✅ Coupure essentielle", "risk": "aucun", "conseil": { "titre": "✈️ Vraies Vacances", "message": "Les congés déconnectés sont essentiels à la régénération.", "actions": ["Désactiver les emails pro pendant les congés", "Déléguer les urgences à un collègue désigné", "Résister à la tentation de 'juste vérifier'", "Revenir progressivement post-congés (pas de surcharge à J+1)"], "alerte": null } },
  { "id": 455, "name": "Emails hors horaires réguliers", "category": "deconnexion", "tags": ["emails", "débordement"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Sollicitations soirées/week-end", "legal": "⚠️ Non-respect déconnexion", "risk": "moyen", "conseil": { "titre": "📧 Emails Hors Horaires", "message": "Les emails hors horaires perturbent la récupération.", "actions": ["Ne pas répondre (répondre valide la pratique)", "Rappeler le droit à la déconnexion si c'est récurrent", "Utiliser l'envoi différé si l'on rédige hors horaires", "Discuter collectivement sur la culture des emails"], "alerte": { "niveau": "info", "texte": "📧 Emails soir/week-end : droit à la déconnexion" } } },
  { "id": 456, "name": "Appels pro hors horaires", "category": "deconnexion", "tags": ["appels", "intrusion"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Téléphone pro en soirée", "legal": "⚠️ Intrusion vie privée", "risk": "moyen", "conseil": { "titre": "📞 Appels Hors Horaires", "message": "Les appels hors horaires sont intrusifs sauf vraie urgence.", "actions": ["Définir des critères d'urgence légitime", "Laisser sonner si l'urgence n'est pas apparente", "Rappeler le droit à la déconnexion si abus", "Mode avion après une heure définie si besoin"], "alerte": { "niveau": "warning", "texte": "📞 Appels récurrents hors horaires : poser des limites" } } },
  { "id": 457, "name": "Travail régulier le soir", "category": "equilibre", "tags": ["soir", "débordement"], "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }], "desc": "Finir tard habituellement", "legal": "⚠️ Débordement chronique", "risk": "moyen", "conseil": { "titre": "🌙 Travail Soir Régulier", "message": "Le travail en soirée régulier signale une charge excessive.", "actions": ["Quantifier les heures réelles (journal de la semaine)", "Identifier s'il s'agit d'une nécessité ou d'une habitude", "Communiquer la charge si elle est structurelle", "Protéger au moins 2 soirs par semaine"], "alerte": { "niveau": "warning", "texte": "🌙 Soirs réguliers : surcharge chronique" } } },
  { "id": 458, "name": "Travail le week-end fréquent", "category": "equilibre", "tags": ["weekend", "surcharge"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 4, "type": "saturday" }], "desc": "Samedi ou dimanche travaillés", "legal": "⚠️ Récupération insuffisante", "risk": "moyen", "conseil": { "titre": "📅 Week-Ends Travaillés", "message": "Les week-ends régulièrement travaillés empêchent la récupération.", "actions": ["Limiter strictement : max 1 WE/mois", "Documenter la fréquence et les raisons", "Communiquer sur l'insoutenabilité si c'est récurrent", "Négocier une récupération équivalente"], "alerte": { "niveau": "warning", "texte": "📅 >2 WE/mois travaillés : insoutenable" } } },
  { "id": 459, "name": "Télétravail aux frontières floues", "category": "equilibre", "tags": ["télétravail", "limites"], "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }], "desc": "Débordements en télétravail", "legal": "⚠️ Limites absentes", "risk": "moyen", "conseil": { "titre": "🏠 Télétravail Sans Limites", "message": "Le télétravail sans frontières mène au sur-engagement.", "actions": ["Créer des rituels de début/fin de journée", "Avoir un espace de travail dédié si possible", "Rendre les horaires visibles par la famille/colocataires", "Fermer l'ordinateur à heure fixe"], "alerte": { "niveau": "info", "texte": "🏠 Télétravail : créer des frontières explicites" } } },
  { "id": 460, "name": "Culpabilité à la déconnexion", "category": "deconnexion", "tags": ["culpabilité", "pression"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Malaise à l'idée de s'arrêter", "legal": "⚠️ Pression internalisée", "risk": "moyen", "conseil": { "titre": "😔 Culpabilité", "message": "La culpabilité à déconnecter révèle une pression excessive.", "actions": ["Reconnaître la légitimité du repos", "Identifier la source de la pression (interne/externe)", "Se rappeler : la productivité nécessite une récupération", "Discuter de la culture avec l'équipe si elle est collective"], "alerte": { "niveau": "info", "texte": "😔 Culpabilité au repos : pression excessive" } } },
  { "id": 461, "name": "Impossibilité de vraie pause déjeuner", "category": "equilibre", "tags": ["pause", "récupération"], "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }], "desc": "Manger devant l'écran", "legal": "⚠️ Récupération absente", "risk": "moyen", "conseil": { "titre": "🍽️ Pause Absente", "message": "L’absence de vraie pause déjeuner empêche la récupération.", "actions": ["Bloquer 30 min minimum au calendrier", "Quitter son poste même si l'on est seul", "Manger loin de l'écran si possible", "Communiquer si la charge empêche la pause"], "alerte": { "niveau": "warning", "texte": "🍽️ Pas de pause déj : récupération impossible" } } },
  { "id": 462, "name": "Congés non pris", "category": "equilibre", "tags": ["congés", "récupération"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Congés payés accumulés", "legal": "⚠️ Récupération reportée", "risk": "moyen", "conseil": { "titre": "🏖️ Congés Non Pris", "message": "L’accumulation de congés non pris signale une surcharge.", "actions": ["Planifier les congés dès le début d'année", "Poser au moins 3 semaines par an", "Identifier les obstacles à la prise de congés", "Communiquer si la pression empêche les congés"], "alerte": { "niveau": "warning", "texte": "🏖️ CP non pris : signal de surcharge" } } },
  { "id": 463, "name": "Congés interrompus par le travail", "category": "deconnexion", "tags": ["congés", "intrusion"], "days": [], "desc": "Sollicitations pendant les vacances", "legal": "⚠️ Droit à la déconnexion bafoué", "risk": "moyen", "conseil": { "titre": "📞 Congés Perturbés", "message": "Les intrusions pendant les congés empêchent la récupération.", "actions": ["Rappeler son indisponibilité avant le départ", "Déléguer les responsabilités clairement", "Ne répondre qu'aux vraies urgences", "Signaler si c'est récurrent (médecin du travail/RH)"], "alerte": { "niveau": "warning", "texte": "📞 Congés perturbés : droit à la déconnexion" } } },
  { "id": 464, "name": "Présentéisme attendu", "category": "organisation", "tags": ["présentéisme", "culture"], "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }], "desc": "Partir tard est valorisé", "legal": "⚠️ Culture toxique", "risk": "moyen", "conseil": { "titre": "👀 Présentéisme", "message": "La culture du présentéisme est contre-productive.", "actions": ["S'évaluer sur les résultats, pas sur les heures de présence", "Partir à l'heure sans culpabilité", "Questionner la culture collectivement", "Valoriser l'efficacité plutôt que le volume horaire"], "alerte": { "niveau": "warning", "texte": "👀 Présentéisme : culture contre-productive" } } },
  { "id": 465, "name": "Pressions implicites de disponibilité", "category": "organisation", "tags": ["disponibilité", "pression"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Attentes non dites", "legal": "⚠️ Pression tacite", "risk": "moyen", "conseil": { "titre": "🤫 Pressions Implicites", "message": "Les attentes non formulées créent de l'anxiété.", "actions": ["Expliciter les attentes réelles avec le manager", "Clarifier les limites acceptables", "Nommer les pressions tacites ressenties", "Proposer des règles explicites à l'équipe"], "alerte": { "niveau": "info", "texte": "🤫 Attentes floues : clarifier" } } },
  { "id": 466, "name": "Exemplarité du manager négative", "category": "organisation", "tags": ["management", "modèle"], "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }], "desc": "Manager toujours connecté", "legal": "⚠️ Modèle problématique", "risk": "moyen", "conseil": { "titre": "👔 Manager Sans Limite", "message": "Un manager sans limites crée une pression sur l'équipe.", "actions": ["Ne pas imiter un comportement malsain", "Protéger ses propres limites", "Échanger avec le manager sur l'impact de son modèle", "Valoriser l'équilibre avec ses pairs"], "alerte": { "niveau": "info", "texte": "👔 Manager sans limite : ne pas imiter" } } },
  { "id": 467, "name": "Demandes clients hors horaires", "category": "deconnexion", "tags": ["clients", "limites"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Sollicitations clients le soir", "legal": "⚠️ Limites à poser", "risk": "faible", "conseil": { "titre": "🤝 Clients Hors Horaires", "message": "Les clients peuvent solliciter hors horaires si les limites sont floues.", "actions": ["Communiquer clairement ses horaires de disponibilité", "Mettre un auto-répondeur hors horaires", "Former les clients aux délais raisonnables", "Utiliser l'envoi différé pour les réponses rédigées hors horaires"], "alerte": null } },
  { "id": 468, "name": "Obligation de portable personnel", "category": "deconnexion", "tags": ["téléphone", "intrusion"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Joignabilité sur téléphone perso", "legal": "⚠️ Frontière vie privée", "risk": "moyen", "conseil": { "titre": "📱 Portable Personnel", "message": "L’utilisation du téléphone personnel brouille les frontières.", "actions": ["Demander un téléphone professionnel si c'est attendu", "Limiter les communications perso aux horaires de bureau", "Éteindre le pro hors horaires si double SIM", "Refuser la joignabilité perso si ce n'est pas prévu au contrat"], "alerte": { "niveau": "info", "texte": "📱 Portable perso pro : frontière floue" } } },
  { "id": 469, "name": "Absence de micro-coupures dans la journée", "category": "equilibre", "tags": ["pauses", "récupération"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Journée sans aucune pause", "legal": "⚠️ Récupération insuffisante", "risk": "moyen", "conseil": { "titre": "⏸️ Pas de Pauses", "message": "Les micro-pauses sont essentielles à la concentration.", "actions": ["Pause de 5 min toutes les 90 min minimum", "Se lever, marcher, regarder au loin", "Pas de pause = pas plus productif", "Bloquer les pauses au calendrier si on les oublie"], "alerte": { "niveau": "info", "texte": "⏸️ Pauses : essentielles à la concentration" } } },
  { "id": 470, "name": "Activités ressourçantes préservées", "category": "equilibre", "tags": ["loisirs", "ressources"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Sport/loisirs maintenus", "legal": "✅ Équilibre sain", "risk": "aucun", "conseil": { "titre": "🎨 Activités Ressourçantes", "message": "Les activités hors travail sont essentielles au bien-être.", "actions": ["Protéger les créneaux d'activités comme des RDV importants", "Varier les activités (physique, créative, sociale)", "Même 30 min par semaine valent mieux que rien", "Reconnaître la légitimité du temps pour soi"], "alerte": null } },
  { "id": 471, "name": "Vie sociale appauvrie", "category": "equilibre", "tags": ["social", "isolement"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "On voit moins ses proches", "legal": "⚠️ Isolement progressif", "risk": "moyen", "conseil": { "titre": "👥 Vie Sociale", "message": "L’appauvrissement social est un signal d’alerte important.", "actions": ["Observer l'évolution de la fréquence des contacts", "Planifier des moments sociaux réguliers", "Identifier si c'est un manque de temps ou d'envie", "Consulter si l'isolement choisi devient subi"], "alerte": { "niveau": "warning", "texte": "👥 Isolement social : signal d'alerte" } } },
  { "id": 472, "name": "Relations familiales tendues", "category": "equilibre", "tags": ["famille", "tensions"], "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }], "desc": "Conflits en famille augmentés", "legal": "⚠️ Impact sur la vie privée", "risk": "moyen", "conseil": { "titre": "❤️ Tensions Familiales", "message": "Les tensions familiales peuvent refléter un déséquilibre pro-perso.", "actions": ["Observer la corrélation entre stress pro et tensions perso", "Communiquer sur la situation pro avec ses proches", "Préserver du temps de qualité en famille", "Consulter si les tensions persistent malgré les efforts"], "alerte": { "niveau": "info", "texte": "❤️ Tensions famille : vérifier le lien pro" } } },
  { "id": 473, "name": "Sommeil sacrifié pour la charge", "category": "equilibre", "tags": ["sommeil", "santé"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Dormir moins pour finir le travail", "legal": "⚠️ Dette de sommeil", "risk": "élevé", "conseil": { "titre": "😴 Sommeil Sacrifié", "message": "Sacrifier le sommeil a des impacts sur la santé et la performance.", "actions": ["Sommeil non négociable : 7-8h minimum", "Identifier la cause de la réduction (charge, anxiété)", "Communiquer si la charge impose une réduction du sommeil", "Consulter si la dette de sommeil est chronique"], "alerte": { "niveau": "danger", "texte": "😴 Sommeil sacrifié : risque pour la santé" } } },
  { "id": 474, "name": "Sport arrêté par manque de temps", "category": "equilibre", "tags": ["sport", "abandon"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Activité physique supprimée", "legal": "⚠️ Signal de déséquilibre", "risk": "moyen", "conseil": { "titre": "🏃 Sport Arrêté", "message": "L’abandon du sport signale souvent un manque de temps ou d’énergie.", "actions": ["Observer la raison : temps ou épuisement ?", "Reprendre même par micro-doses (15 min de marche)", "Le sport est un investissement pour la productivité", "Planifier comme un RDV non annulable"], "alerte": { "niveau": "info", "texte": "🏃 Sport arrêté : signal de déséquilibre" } } },
  { "id": 475, "name": "Projets personnels abandonnés", "category": "equilibre", "tags": ["projets", "démotivation"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Plus de temps pour les projets perso", "legal": "⚠️ Envahissement pro", "risk": "moyen", "conseil": { "titre": "💡 Projets Perso", "message": "L’abandon des projets personnels révèle un envahissement pro.", "actions": ["Lister les projets perso en suspens", "Identifier les obstacles (temps, énergie)", "Reprendre un projet même de façon réduite", "Protéger le temps projet comme un engagement envers soi"], "alerte": { "niveau": "warning", "texte": "💡 Projets abandonnés : envahissement pro" } } },
  { "id": 476, "name": "Relations collègues positives", "category": "relationnel", "tags": ["collègues", "soutien"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Bonne entente dans l'équipe", "legal": "✅ Facteur protecteur", "risk": "aucun", "conseil": { "titre": "😊 Relations Positives", "message": "Les bonnes relations sont un facteur protecteur majeur.", "actions": ["Cultiver des relations de qualité", "Participer aux moments informels", "Offrir son soutien aux collègues", "Reconnaître la valeur des relations de travail"], "alerte": null } },
  { "id": 477, "name": "Soutien des collègues présent", "category": "relationnel", "tags": ["soutien", "entraide"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Entraide au sein de l'équipe", "legal": "✅ Ressource importante", "risk": "aucun", "conseil": { "titre": "🤝 Entraide", "message": "Le soutien mutuel réduit le stress et améliore le bien-être.", "actions": ["Demander de l'aide si besoin (ce n'est pas une faiblesse)", "Offrir son aide proactivement", "Valoriser la culture de collaboration", "Remercier les collègues pour leur soutien"], "alerte": null } },
  { "id": 478, "name": "Conflit collègue ponctuel", "category": "relationnel", "tags": ["conflit", "résolution"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Désaccord occasionnel", "legal": "✅ Normal si géré", "risk": "faible", "conseil": { "titre": "⚡ Conflit Ponctuel", "message": "Les désaccords occasionnels sont normaux.", "actions": ["Aborder le sujet directement avec bienveillance", "Distinguer le conflit d'idées vs de personnes", "Chercher une solution gagnant-gagnant", "Solliciter une médiation RH si blocage"], "alerte": null } },
  { "id": 479, "name": "Tension chronique avec un collègue", "category": "relationnel", "tags": ["conflit", "chronique"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Conflit récurrent", "legal": "⚠️ Impact bien-être", "risk": "moyen", "conseil": { "titre": "⚡ Tension Chronique", "message": "Les tensions durables affectent le bien-être.", "actions": ["Identifier la racine du conflit", "Solliciter une médiation du manager ou des RH", "Limiter les interactions si elles sont toxiques", "Protéger son bien-être en priorité"], "alerte": { "niveau": "info", "texte": "⚡ Conflit durable : solliciter une médiation" } } },
  { "id": 480, "name": "Isolement dans l'équipe", "category": "relationnel", "tags": ["isolement", "exclusion"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Sentiment d'exclusion", "legal": "⚠️ Signal relationnel", "risk": "moyen", "conseil": { "titre": "🚶 Isolement Équipe", "message": "L’isolement professionnel affecte le bien-être.", "actions": ["Observer si l'isolement est choisi ou subi", "Initier des interactions même brèves", "Participer aux événements d'équipe", "Signaler s'il y a une exclusion active (médiation)"], "alerte": { "niveau": "warning", "texte": "🚶 Isolement subi : signal d’alerte" } } },
  { "id": 481, "name": "Manager soutenant", "category": "relationnel", "tags": ["management", "soutien"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Accompagnement manager positif", "legal": "✅ Facteur protecteur", "risk": "aucun", "conseil": { "titre": "👔 Manager Soutenant", "message": "Un manager à l’écoute est un facteur protecteur majeur.", "actions": ["Valoriser la qualité de la relation", "Communiquer proactivement", "Solliciter du soutien si besoin", "Reconnaître la valeur de l'accompagnement"], "alerte": null } },
  { "id": 482, "name": "Manager adepte du micro-management", "category": "relationnel", "tags": ["management", "contrôle"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Contrôle excessif", "legal": "⚠️ Autonomie limitée", "risk": "moyen", "conseil": { "titre": "🔍 Micro-Management", "message": "Le contrôle excessif réduit la motivation et l'autonomie.", "actions": ["Échanger sur son besoin d'autonomie", "Proposer un reporting adapté et rassurant", "Démontrer sa fiabilité progressivement", "Solliciter les RH si le comportement est extrême"], "alerte": { "niveau": "info", "texte": "🔍 Micro-management : échanger sur le besoin d'autonomie" } } },
  { "id": 483, "name": "Manager absent", "category": "relationnel", "tags": ["management", "abandon"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Manque de disponibilité du manager", "legal": "⚠️ Soutien manquant", "risk": "moyen", "conseil": { "titre": "👻 Manager Absent", "message": "L’absence managériale prive de soutien et d’orientation.", "actions": ["Solliciter des RDV réguliers formels", "Formaliser ses besoins par écrit si l'oral est impossible", "Solliciter ses pairs pour les questions courantes", "Remonter au N+2 en cas de préjudice"], "alerte": { "niveau": "info", "texte": "👻 Manager absent : formaliser les besoins" } } },
  { "id": 484, "name": "Feedback régulier constructif", "category": "reconnaissance", "tags": ["feedback", "développement"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Retours réguliers positifs", "legal": "✅ Développement sain", "risk": "aucun", "conseil": { "titre": "💬 Feedback Constructif", "message": "Le feedback régulier favorise la progression.", "actions": ["Accueillir le feedback ouvertement", "Solliciter des retours s'ils sont absents", "Remercier pour le feedback constructif", "Appliquer les suggestions pertinentes"], "alerte": null } },
  { "id": 485, "name": "Reconnaissance absente", "category": "reconnaissance", "tags": ["reconnaissance", "motivation"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Le travail n'est pas valorisé", "legal": "⚠️ Démotivation", "risk": "moyen", "conseil": { "titre": "👻 Pas de Reconnaissance", "message": "L’absence de reconnaissance démotive profondément.", "actions": ["Pratiquer l'auto-reconnaissance : lister ses accomplissements", "Solliciter un feedback explicite", "Échanger sur son besoin de reconnaissance", "Valoriser ses collègues pour insuffler un modèle"], "alerte": { "niveau": "warning", "texte": "👻 Reconnaissance absente : impact sur la motivation" } } },
  { "id": 486, "name": "Critiques destructrices", "category": "relationnel", "tags": ["critiques", "toxicité"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Remarques blessantes répétées", "legal": "⚠️ Toxicité", "risk": "élevé", "conseil": { "titre": "💔 Critiques Destructrices", "message": "Les critiques personnelles sont inacceptables.", "actions": ["Distinguer critique du travail vs de la person", "Nommer le comportement inacceptable", "Documenter les occurrences", "Signaler aux RH/médecin du travail si harcèlement suspecté"], "alerte": { "niveau": "danger", "texte": "💔 Critiques personnelles : harcèlement possible" } } },
  { "id": 487, "name": "Humiliations publiques", "category": "relationnel", "tags": ["humiliation", "harcèlement"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Mises en cause devant les autres", "legal": "⚠️ Harcèlement potentiel", "risk": "élevé", "conseil": { "titre": "😔 Humiliation Publique", "message": "Les humiliations publiques peuvent constituer un harcèlement.", "actions": ["Nommer le comportement inacceptable immédiatement", "Documenter les dates, contextes et témoins", "Signaler aux RH et au médecin du travail", "S'informer sur la protection juridique contre le harcèlement"], "alerte": { "niveau": "danger", "texte": "😔 Humiliations : harcèlement - signaler" } } },
  { "id": 488, "name": "Ambiance d'équipe dégradée", "category": "relationnel", "tags": ["ambiance", "collectif"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Climat tendu généralisé", "legal": "⚠️ RPS collectifs", "risk": "moyen", "conseil": { "titre": "⛈️ Ambiance Dégradée", "message": "Une ambiance toxique impacte tout le monde.", "actions": ["Observer les causes organisationnelles", "Échanger collectivement sur le climat", "Solliciter une intervention RH/management", "Protéger son bien-être individuel malgré le contexte"], "alerte": { "niveau": "warning", "texte": "⛈️ Ambiance toxique : RPS collectifs" } } },
  { "id": 489, "name": "Compétition malsaine dans l'équipe", "category": "relationnel", "tags": ["compétition", "toxicité"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Rivalités destructrices", "legal": "⚠️ Culture toxique", "risk": "moyen", "conseil": { "titre": "🏆 Compétition Toxique", "message": "La compétition excessive détruit la cohésion.", "actions": ["Refuser de participer aux jeux malsains", "Promouvoir la collaboration vs la compétition", "Échanger avec le management sur la culture", "Protéger les collègues ciblés"], "alerte": { "niveau": "info", "texte": "🏆 Compétition malsaine : culture toxique" } } },
  { "id": 490, "name": "Communication transparente", "category": "organisation", "tags": ["communication", "confiance"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Information claire et partagée", "legal": "✅ Climat sain", "risk": "aucun", "conseil": { "titre": "💬 Communication Claire", "message": "La transparence crée la confiance et l'engagement.", "actions": ["Valoriser la qualité de la communication", "Poser des questions en cas de zones d’ombre", "Partager l'information pertinente", "Faire un feedback positif sur la transparence"], "alerte": null } },
  { "id": 491, "name": "Décisions arbitraires", "category": "organisation", "tags": ["décisions", "arbitraire"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Choix faits sans explication", "legal": "⚠️ Perte de confiance", "risk": "moyen", "conseil": { "titre": "❓ Décisions Opaques", "message": "Les décisions non expliquées génèrent de la méfiance.", "actions": ["Solliciter des explications rationnelles", "Distinguer le désaccord de l'opacité", "Échanger sur l'impact de l'incompréhension", "Signaler le pattern si c'est récurrent"], "alerte": { "niveau": "info", "texte": "❓ Décisions opaques : demander des explications" } } },
  { "id": 492, "name": "Rumeurs anxiogènes", "category": "relationnel", "tags": ["rumeurs", "anxiété"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Informations non officielles stressantes", "legal": "⚠️ Climat anxiogène", "risk": "moyen", "conseil": { "titre": "🗣️ Rumeurs", "message": "Les rumeurs créent de l'anxiété et de la méfiance.", "actions": ["Vérifier les sources avant de croire", "Solliciter une information officielle", "Ne pas relayer les rumeurs non vérifiées", "Demander une communication claire en cas de flou"], "alerte": { "niveau": "info", "texte": "🗣️ Rumeurs : vérifier les sources officielles" } } },
  { "id": 493, "name": "Valeurs personnelles alignées", "category": "reconnaissance", "tags": ["valeurs", "sens"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Cohérence des valeurs avec le travail", "legal": "✅ Engagement fort", "risk": "aucun", "conseil": { "titre": "⭐ Valeurs Alignées", "message": "L’alignement des valeurs favorise un engagement durable.", "actions": ["Identifier ses valeurs personnelles clés", "Reconnaître cet alignement comme une ressource", "Protéger cet alignement dans ses choix", "Valoriser sa contribution significative"], "alerte": null } },
  { "id": 494, "name": "Conflits avec les valeurs de l'organisation", "category": "reconnaissance", "tags": ["valeurs", "dissonance"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Dissonance éthique", "legal": "⚠️ Souffrance éthique", "risk": "moyen", "conseil": { "titre": "⚠️ Conflit de Valeurs", "message": "La dissonance de valeurs génère une souffrance profonde.", "actions": ["Identifier la nature du conflit précisément", "Échanger sur les possibilités d'alignement", "Explorer des alternatives (missions, équipe)", "Envisager le départ en cas de conflit majeur"], "alerte": { "niveau": "warning", "texte": "⚠️ Conflit de valeurs : souffrance éthique" } } },
  { "id": 495, "name": "Utilité du travail perçue", "category": "reconnaissance", "tags": ["sens", "utilité"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Impact positif ressenti", "legal": "✅ Sens au travail", "risk": "aucun", "conseil": { "titre": "💫 Sens au Travail", "message": "Le sentiment d’utilité nourrit l'engagement.", "actions": ["Reconnecter ses tâches à l'impact final", "Chercher des témoignages de bénéficiaires si possible", "Valoriser ses contributions même petites", "Partager les succès collectifs"], "alerte": null } },
  { "id": 496, "name": "Tâches perçues comme inutiles", "category": "reconnaissance", "tags": ["sens", "inutilité"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Sentiment de 'bullshit job'", "legal": "⚠️ Perte de sens", "risk": "moyen", "conseil": { "titre": "🤷 Tâches Inutiles", "message": "Le sentiment d’inutilité mine la motivation.", "actions": ["Identifier les tâches vécues comme vaines", "Questionner l'utilité réelle vs perçue", "Échanger avec le manager sur le sens des missions", "Explorer des possibilités de missions plus utiles"], "alerte": { "niveau": "warning", "texte": "🤷 Sentiment d'inutilité : perte de sens profonde" } } },
  { "id": 497, "name": "Équité de traitement perçue", "category": "reconnaissance", "tags": ["équité", "justice"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Le traitement est ressenti comme juste", "legal": "✅ Justice organisationnelle", "risk": "aucun", "conseil": { "titre": "⚖️ Équité", "message": "Le sentiment de justice favorise l'engagement.", "actions": ["Reconnaître l'équité comme un acquis précieux", "Valoriser les traitements justes", "Signaler les inéquités si elles sont observées", "Promouvoir une culture de l'équité"], "alerte": null } },
  { "id": 498, "name": "Injustices répétées", "category": "reconnaissance", "tags": ["injustice", "frustration"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Traitements inéquitables", "legal": "⚠️ Sentiment d'injustice", "risk": "moyen", "conseil": { "titre": "⚖️ Injustices", "message": "Les injustices répétées démotivent profondément.", "actions": ["Documenter les situations précises", "Échanger avec les RH sur l'équité", "Solliciter des explications rationnelles", "Envisager des recours en cas de discrimination"], "alerte": { "niveau": "warning", "texte": "⚖️ Injustices : impact sur la motivation" } } },
  { "id": 499, "name": "Développement des compétences soutenu", "category": "reconnaissance", "tags": ["développement", "formation"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "La formation est encouragée", "legal": "✅ Investissement personnel", "risk": "aucun", "conseil": { "titre": "📚 Développement Soutenu", "message": "L’investissement dans la formation montre une valorisation.", "actions": ["Saisir les opportunités de formation", "Partager ses apprentissages avec l'équipe", "Solliciter des formations pertinentes", "Reconnaître l'investissement de l'employeur"], "alerte": null } },
  { "id": 500, "name": "Stagnation professionnelle", "category": "reconnaissance", "tags": ["évolution", "stagnation"], "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }], "desc": "Absence de perspectives d'évolution", "legal": "⚠️ Plafond de verre", "risk": "moyen", "conseil": { "titre": "🚧 Stagnation", "message": "L’absence de perspectives démotive.", "actions": ["Clarifier ses aspirations professionnelles", "Échanger sur les perspectives avec le manager", "Explorer la mobilité interne", "Envisager une évolution externe en cas de blocage"], "alerte": { "niveau": "info", "texte": "🚧 Stagnation : explorer les perspectives" } } },
  {
    "id": 501,
    "name": "Espace travail confortable",
    "category": "environnement",
    "tags": ["confort", "ergonomie"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Poste bien aménagé",
    "legal": "✅ Conditions favorables",
    "risk": "aucun",
    "conseil": { "titre": "🪑 Poste Confortable", "message": "Un poste ergonomique prévient douleurs et fatigue.", "actions": ["Maintenir réglages ergonomiques", "Signaler inconfort rapidement", "Varier postures régulièrement", "Apprécier conditions favorables"], "alerte": null }
  },
  {
    "id": 502,
    "name": "Poste non ergonomique",
    "category": "environnement",
    "tags": ["ergonomie", "TMS"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Inconfort position",
    "legal": "⚠️ Risque TMS",
    "risk": "moyen",
    "conseil": { 
      "titre": "🪑 Ergonomie Insuffisante", 
      "message": "Un poste mal réglé cause douleurs à long terme.", 
      "actions": ["Demander audit ergonomique", "Réglages : écran hauteur yeux, pieds au sol", "Solliciter matériel adapté (siège, repose-pieds)", "Médecin travail si douleurs"], 
      "alerte": { "niveau": "warning", "texte": "🪑 Ergonomie : prévenir TMS" } 
    }
  },
  {
    "id": 503,
    "name": "Bruit ambiant excessif",
    "category": "environnement",
    "tags": ["bruit", "concentration"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Open-space bruyant",
    "legal": "⚠️ Concentration perturbée",
    "risk": "moyen",
    "conseil": {
      "titre": "🔊 Bruit Excessif",
      "message": "Le bruit constant fatigue et réduit concentration.",
      "actions": ["Casque anti-bruit si autorisé", "Négocier espaces calmes ou bulles", "Signaler niveau bruit à RH", "Alterner lieux si télétravail possible"],
      "alerte": { "niveau": "info", "texte": "🔊 Bruit : impact concentration et fatigue" }
    }
  },
  {
    "id": 504,
    "name": "Luminosité inadaptée",
    "category": "environnement",
    "tags": ["lumière", "fatigue"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Éclairage insuffisant ou éblouissant",
    "legal": "⚠️ Fatigue visuelle",
    "risk": "faible",
    "conseil": {
      "titre": "💡 Luminosité",
      "message": "Un éclairage inadapté fatigue yeux et cerveau.",
      "actions": ["Lampe d’appoint si sous-éclairage", "Stores/filtres si éblouissement", "Signaler problème éclairage", "Pauses visuelles régulières"],
      "alerte": null
    }
  },
  {
    "id": 505,
    "name": "Température inconfortable",
    "category": "environnement",
    "tags": ["température", "confort"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Trop chaud ou trop froid",
    "legal": "⚠️ Confort thermique",
    "risk": "faible",
    "conseil": {
      "titre": "🌡️ Température",
      "message": "L’inconfort thermique réduit concentration.",
      "actions": ["Recommandation : 19-26°C", "Adapter vêtements (couches)", "Signaler dysfonctionnement climatisation", "Solutions individuelles si impossible collectif"],
      "alerte": null
    }
  },
  {
    "id": 506,
    "name": "Qualité air médiocre",
    "category": "environnement",
    "tags": ["air", "santé"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Air confiné",
    "legal": "⚠️ Ventilation insuffisante",
    "risk": "moyen",
    "conseil": {
      "titre": "💨 Qualité Air",
      "message": "Un air confiné cause maux de tête et fatigue.",
      "actions": ["Aérer régulièrement si possible", "Signaler problème ventilation", "Pauses extérieur si possible", "Plantes dépolluantes si autorisées"],
      "alerte": { "niveau": "info", "texte": "💨 Air confiné : ventilation importante" }
    }
  },
  {
    "id": 507,
    "name": "Espace personnel suffisant",
    "category": "environnement",
    "tags": ["espace", "intimité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Bureau individuel ou cloisonné",
    "legal": "✅ Intimité préservée",
    "risk": "aucun",
    "conseil": {
      "titre": "🏢 Espace Personnel",
      "message": "Un espace personnel favorise concentration et bien-être.",
      "actions": ["Personnaliser espace raisonnablement", "Respecter espaces collègues", "Valoriser espace comme ressource", "Négocier aménagements si besoin"],
      "alerte": null
    }
  },
  {
    "id": 508,
    "name": "Promiscuité excessive",
    "category": "environnement",
    "tags": ["densité", "stress"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Open-space surchargé",
    "legal": "⚠️ Manque intimité",
    "risk": "moyen",
    "conseil": {
      "titre": "👥 Surpopulation",
      "message": "La promiscuité excessive génère stress.",
      "actions": ["Négocier rotations télétravail", "Utiliser espaces calmes si disponibles", "Casque signalant concentration", "Remonter problème densité"],
      "alerte": { "niveau": "info", "texte": "👥 Surpopulation : négocier alternatives" }
    }
  },
  {
    "id": 509,
    "name": "Espaces détente accessibles",
    "category": "environnement",
    "tags": ["détente", "ressources"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Lieux repos disponibles",
    "legal": "✅ Ressource bien-être",
    "risk": "aucun",
    "conseil": {
      "titre": "☕ Espaces Détente",
      "message": "Les espaces détente favorisent récupération.",
      "actions": ["Utiliser espaces sans culpabilité", "Vraies pauses loin poste", "Respecter usages collectifs", "Proposer aménagements si absents"],
      "alerte": null
    }
  },
  {
    "id": 510,
    "name": "Restauration qualité site",
    "category": "environnement",
    "tags": ["alimentation", "bien-être"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Cantine ou options saines",
    "legal": "✅ Santé favorisée",
    "risk": "aucun",
    "conseil": {
      "titre": "🍽️ Restauration",
      "message": "Une alimentation de qualité soutient énergie.",
      "actions": ["Privilégier options équilibrées", "Prendre temps repas suffisant", "Limiter fast-food quotidien", "Participer amélioration offre si possible"],
      "alerte": null
    }
  },
  {
    "id": 511,
    "name": "Accès difficile site",
    "category": "environnement",
    "tags": ["trajet", "fatigue"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Longs trajets pénibles",
    "legal": "⚠️ Fatigue accrue",
    "risk": "moyen",
    "conseil": {
      "titre": "🚗 Trajets Longs",
      "message": "Les longs trajets amplifient fatigue.",
      "actions": ["Explorer télétravail partiel", "Horaires décalés si trafic évitable", "Optimiser trajets (covoiturage, lecture)", "Quantifier temps perdu (négociation remote)"],
      "alerte": { "niveau": "info", "texte": "🚗 >90min/jour trajet : fatigue cumulative" }
    }
  },
  {
    "id": 512,
    "name": "Matériel informatique performant",
    "category": "environnement",
    "tags": ["outils", "efficacité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Équipement adapté",
    "legal": "✅ Productivité facilitée",
    "risk": "aucun",
    "conseil": {
      "titre": "💻 Matériel Performant",
      "message": "De bons outils réduisent frustrations.",
      "actions": ["Signaler besoins spécifiques métier", "Maintenir matériel (mises à jour, nettoyage)", "Valoriser investissement si présent", "Solliciter renouvellement si obsolète"],
      "alerte": null
    }
  },
  {
    "id": 513,
    "name": "Outils vétustes",
    "category": "environnement",
    "tags": ["outils", "frustration"],
    "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }],
    "desc": "Matériel lent ou défaillant",
    "legal": "⚠️ Perte temps",
    "risk": "moyen",
    "conseil": {
      "titre": "🐌 Outils Lents",
      "message": "Du matériel inadapté génère frustration quotidienne.",
      "actions": ["Quantifier temps perdu (lenteurs, bugs)", "Documenter dysfonctionnements précis", "Justifier ROI renouvellement", "Solliciter IT et manager"],
      "alerte": { "niveau": "warning", "texte": "🐌 Outils vétustes : perte productivité" }
    }
  },
  {
    "id": 514,
    "name": "Sécurité site assurée",
    "category": "environnement",
    "tags": ["sécurité", "sérénité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Environnement sécurisé",
    "legal": "✅ Sérénité garantie",
    "risk": "aucun",
    "conseil": {
      "titre": "🛡️ Sécurité",
      "message": "Un environnement sûr favorise sérénité.",
      "actions": ["Respecter consignes sécurité", "Signaler risques observés", "Participer formations sécurité", "Apprécier sécurité comme acquis"],
      "alerte": null
    }
  },
  {
    "id": 515,
    "name": "Risques sécurité présents",
    "category": "environnement",
    "tags": ["sécurité", "danger"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Dangers non traités",
    "legal": "⚠️ Obligation sécurité",
    "risk": "élevé",
    "conseil": {
      "titre": "⚠️ Risques Sécurité",
      "message": "Les risques non traités sont inacceptables.",
      "actions": ["Documenter risques précisément", "Signaler immédiatement responsable/CSSCT", "Droit retrait si danger grave imminent", "Inspection travail si inaction"],
      "alerte": { "niveau": "danger", "texte": "⚠️ Danger : droit de retrait possible" }
    }
  },
  {
    "id": 516,
    "name": "Flexibilité horaires présente",
    "category": "organisation",
    "tags": ["flexibilité", "autonomie"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Aménagements horaires possibles",
    "legal": "✅ Conciliation facilitée",
    "risk": "aucun",
    "conseil": {
      "titre": "⏰ Flexibilité",
      "message": "La flexibilité horaires facilite équilibre vie.",
      "actions": ["Utiliser flexibilité offerte", "Respecter plages présence communes", "Communiquer planning équipe", "Valoriser confiance accordée"],
      "alerte": null
    }
  },
  {
    "id": 517,
    "name": "Rigidité horaires contraignante",
    "category": "organisation",
    "tags": ["rigidité", "contrainte"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Aucune souplesse",
    "legal": "⚠️ Conciliation difficile",
    "risk": "faible",
    "conseil": {
      "titre": "🔒 Rigidité Horaires",
      "message": "L’absence flexibilité complique équilibre vie.",
      "actions": ["Identifier contraintes réelles vs organisationnelles", "Proposer aménagements limités", "Négocier occasions exceptionnelles", "Explorer alternatives (télétravail partiel)"],
      "alerte": null
    }
  },
  {
    "id": 518,
    "name": "Télétravail équilibré",
    "category": "organisation",
    "tags": ["télétravail", "équilibre"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Mix présentiel/remote sain",
    "legal": "✅ Meilleur des deux",
    "risk": "aucun",
    "conseil": {
      "titre": "🏠 Télétravail Équilibré",
      "message": "L’hybridation bien dosée optimise bien-être.",
      "actions": ["Trouver rythme personnel optimal", "Maintenir lien équipe jours présentiels", "Profiter concentration jours remote", "Adapter selon tâches et besoins"],
      "alerte": null
    }
  },
  {
    "id": 519,
    "name": "Télétravail mal organisé",
    "category": "organisation",
    "tags": ["télétravail", "isolement"],
    "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }],
    "desc": "Remote sans cadre",
    "legal": "⚠️ Dérives possibles",
    "risk": "moyen",
    "conseil": {
      "titre": "🏠 Télétravail Déstructuré",
      "message": "Le télétravail sans cadre peut dériver.",
      "actions": ["Créer routine structurante", "Espaces et horaires définis", "Maintien lien social intentionnel", "Demander cadrage si organisation floue"],
      "alerte": { "niveau": "info", "texte": "🏠 Remote : créer structure intentionnelle" }
    }
  },
  {
    "id": 520,
    "name": "Politique télétravail absente",
    "category": "organisation",
    "tags": ["télétravail", "refus"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Remote impossible",
    "legal": "⚠️ Flexibilité limitée",
    "risk": "faible",
    "conseil": {
      "titre": "🏢 Pas Télétravail",
      "message": "L’absence télétravail limite options équilibre.",
      "actions": ["Vérifier faisabilité réelle métier", "Proposer test périodes limitées", "Explorer jours exceptionnels (grève transport)", "Négocier autres flexibilités (horaires)"],
      "alerte": null
    }
  },
  {
    "id": 521,
    "name": "Parking disponible site",
    "category": "environnement",
    "tags": ["parking", "praticité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Stationnement facile",
    "legal": "✅ Facilité accès",
    "risk": "aucun",
    "conseil": {
      "titre": "🅿️ Parking",
      "message": "Un parking facilite quotidien.",
      "actions": ["Respecter règles stationnement", "Covoiturage si places limitées", "Valoriser facilité comme avantage", "Proposer alternatives (vélo) si intérêt"],
      "alerte": null
    }
  },
  {
    "id": 522,
    "name": "Accès transports publics",
    "category": "environnement",
    "tags": ["transport", "écologie"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Site bien desservi",
    "legal": "✅ Mobilité durable",
    "risk": "aucun",
    "conseil": {
      "titre": "🚇 Transports",
      "message": "De bons transports réduisent stress trajets.",
      "actions": ["Optimiser itinéraires et horaires", "Profiter temps transport (lecture, repos)", "Prise en charge abonnement si prévue", "Alternatives si grèves fréquentes"],
      "alerte": null
    }
  },
  {
    "id": 523,
    "name": "Services proximité site",
    "category": "environnement",
    "tags": ["commodités", "qualité vie"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Commerces, crèche accessibles",
    "legal": "✅ Facilitations vie",
    "risk": "aucun",
    "conseil": {
      "titre": "🏪 Services Proximité",
      "message": "Les services proches facilitent quotidien.",
      "actions": ["Utiliser services disponibles", "Mutualiser déplacements", "Proposer partenariats si manques", "Valoriser atouts localisation"],
      "alerte": null
    }
  },
  {
    "id": 524,
    "name": "Espaces verts accessibles",
    "category": "environnement",
    "tags": ["nature", "récupération"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Accès extérieur/nature",
    "legal": "✅ Ressource bien-être",
    "risk": "aucun",
    "conseil": {
      "titre": "🌳 Espaces Verts",
      "message": "Le contact nature favorise récupération.",
      "actions": ["Pauses extérieur si possible", "Déjeuner dehors beau temps", "Marche pause midi", "Valoriser accès nature"],
      "alerte": null
    }
  },
  {
    "id": 525,
    "name": "Environnement esthétique agréable",
    "category": "environnement",
    "tags": ["esthétique", "bien-être"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Locaux plaisants",
    "legal": "✅ Cadre valorisant",
    "risk": "aucun",
    "conseil": {
      "titre": "🎨 Cadre Agréable",
      "message": "Un environnement plaisant favorise bien-être.",
      "actions": ["Personnaliser espace modestement", "Participer embellissement si possible", "Maintenir propreté collective", "Reconnaître chance si présent"],
      "alerte": null
    }
  },
  {
    "id": 526,
    "name": "Priorisation claire quotidienne",
    "category": "organisation",
    "tags": ["priorisation", "efficacité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Top 3 tâches identifiées",
    "legal": "✅ Organisation saine",
    "risk": "aucun",
    "conseil": {
      "titre": "🎯 Priorisation",
      "message": "Prioriser clairement réduit stress et améliore résultats.",
      "actions": ["Méthode 1-3-5 : 1 grosse + 3 moyennes + 5 petites", "Distinguer urgent vs important (Eisenhower)", "Réévaluer priorités si changements", "Accepter tout ne sera pas fait"],
      "alerte": null
    }
  },
  {
    "id": 527,
    "name": "To-do lists paralysantes",
    "category": "organisation",
    "tags": ["listes", "anxiété"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Listes infinies stressantes",
    "legal": "⚠️ Anxiété productivité",
    "risk": "faible",
    "conseil": {
      "titre": "📝 Listes Anxiogènes",
      "message": "Les listes infinies génèrent anxiété sans productivité.",
      "actions": ["Limiter liste quotidienne (5-7 items max)", "Parking lot pour idées futures", "Célébrer fait pas juste ajouté", "Abandonner items obsolètes sans culpabilité"],
      "alerte": null
    }
  },
  {
    "id": 528,
    "name": "Planning réaliste journée",
    "category": "organisation",
    "tags": ["planning", "réalisme"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Objectifs atteignables",
    "legal": "✅ Gestion saine",
    "risk": "aucun",
    "conseil": {
      "titre": "📅 Planning Réaliste",
      "message": "Un planning réaliste réduit stress et frustration.",
      "actions": ["Règle 50% : planifier seulement moitié temps", "Prévoir imprévus et interruptions", "Buffer entre tâches longues", "Ajuster selon réalité pas idéal"],
      "alerte": null
    }
  },
  {
    "id": 529,
    "name": "Surbooking chronique calendrier",
    "category": "organisation",
    "tags": ["surcharge", "calendrier"],
    "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }],
    "desc": "Calendrier saturé sans marges",
    "legal": "⚠️ Surcharge planifiée",
    "risk": "moyen",
    "conseil": {
      "titre": "📅 Surbooking",
      "message": "Un agenda sans marges mène à l’épuisement.",
      "actions": ["Audit calendrier : temps production vs réunions", "Bloquer créneaux production (non négociables)", "Décliner réunions non essentielles", "Buffers 15min entre RDV"],
      "alerte": { "niveau": "warning", "texte": "📅 Calendrier saturé : surcharge programmée" }
    }
  },
  {
    "id": 530,
    "name": "Technique Pomodoro utilisée",
    "category": "organisation",
    "tags": ["focus", "productivité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "25min focus + 5min pause",
    "legal": "✅ Méthode efficace",
    "risk": "aucun",
    "conseil": {
      "titre": "🍅 Pomodoro",
      "message": "La technique Pomodoro maintient concentration et énergie.",
      "actions": ["25min concentration sans interruption", "5min pause vraie (pas email)", "4 pomodoros → pause longue 15-20min", "Adapter durées selon tâches"],
      "alerte": null
    }
  },
  {
    "id": 531,
    "name": "Time-blocking pratiqué",
    "category": "organisation",
    "tags": ["calendrier", "discipline"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Créneaux thématiques dédiés",
    "legal": "✅ Organisation structurée",
    "risk": "aucun",
    "conseil": {
      "titre": "📊 Time-Blocking",
      "message": "Bloquer temps par thème réduit dispersion.",
      "actions": ["Blocs thématiques (emails, production, réunions)", "Respecter blocs comme RDV externes", "Couleurs calendrier par type activité", "Protéger blocs production de sollicitations"],
      "alerte": null
    }
  },
  {
    "id": 532,
    "name": "Batching tâches similaires",
    "category": "organisation",
    "tags": ["efficacité", "groupement"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Regroupement tâches types",
    "legal": "✅ Optimisation cognitive",
    "risk": "aucun",
    "conseil": {
      "titre": "📦 Batching",
      "message": "Regrouper tâches similaires réduit coût changement contexte.",
      "actions": ["Emails en 2-3 créneaux fixes/jour", "Appels regroupés si possible", "Tâches administratives en bloc", "Limiter changements contexte"],
      "alerte": null
    }
  },
  {
    "id": 533,
    "name": "Matinées protégées travail profond",
    "category": "organisation",
    "tags": ["deep work", "productivité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Créneaux concentration garantis",
    "legal": "✅ Productivité maximale",
    "risk": "aucun",
    "conseil": {
      "titre": "🧠 Deep Work",
      "message": "Les matinées focus produisent résultats de qualité.",
      "actions": ["Bloquer 2-4h matinées pour tâches complexes", "Zéro interruption pendant créneaux", "Communiquer indisponibilité équipe", "Réserver après-midis tâches moins exigeantes"],
      "alerte": null
    }
  },
  {
    "id": 534,
    "name": "Multitâche constant",
    "category": "organisation",
    "tags": ["multitâche", "inefficacité"],
    "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }],
    "desc": "Jonglage permanent tâches",
    "legal": "⚠️ Dispersion cognitive",
    "risk": "moyen",
    "conseil": {
      "titre": "🎪 Multitâche",
      "message": "Le multitâche réduit qualité et augmente fatigue.",
      "actions": ["Monotâche intentionnel : une chose à la fois", "Fermer onglets/apps non utilisés", "Terminer avant passer à suivant", "Accepter ralentissement apparent (efficacité réelle +)"],
      "alerte": { "niveau": "info", "texte": "🎪 Multitâche : illusion productivité" }
    }
  },
  {
    "id": 535,
    "name": "Délégation saine pratiquée",
    "category": "organisation",
    "tags": ["délégation", "confiance"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Répartition charge équipe",
    "legal": "✅ Management efficace",
    "risk": "aucun",
    "conseil": {
      "titre": "🤝 Délégation",
      "message": "Déléguer libère temps et développe équipe.",
      "actions": ["Identifier tâches délégables", "Former si compétence manquante", "Lâcher contrôle sur modalités", "Reconnaître apport délégation"],
      "alerte": null
    }
  },
  {
    "id": 536,
    "name": "Tout faire soi-même",
    "category": "organisation",
    "tags": ["contrôle", "surcharge"],
    "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }],
    "desc": "Refus déléguer",
    "legal": "⚠️ Surcharge évitable",
    "risk": "moyen",
    "conseil": {
      "titre": "🦸 Tout Seul",
      "message": "Tout faire soi-même mène à l’épuisement.",
      "actions": ["Identifier raisons refus (confiance, perfectionnisme)", "Commencer petit : déléguer tâche non critique", "Accepter façons faire différentes", "Calculer coût opportunité temps"],
      "alerte": { "niveau": "warning", "texte": "🦸 Tout faire : surcharge inévitable" }
    }
  },
  {
    "id": 537,
    "name": "Dire non approprié",
    "category": "organisation",
    "tags": ["limites", "assertivité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Refus polis mais fermes",
    "legal": "✅ Protection charge",
    "risk": "aucun",
    "conseil": {
      "titre": "🚫 Non Sain",
      "message": "Savoir dire non protège temps et énergie.",
      "actions": ["Non = oui à priorités actuelles", "Proposer alternatives si possible", "Expliquer brièvement sans sur-justifier", "Valoriser assertivité comme compétence"],
      "alerte": null
    }
  },
  {
    "id": 538,
    "name": "Difficulté refuser sollicitations",
    "category": "organisation",
    "tags": ["limites", "surcharge"],
    "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }],
    "desc": "Oui automatiques",
    "legal": "⚠️ Manque limites",
    "risk": "moyen",
    "conseil": {
      "titre": "✅ Oui Automatiques",
      "message": "Dire oui à tout surcharge et frustre.",
      "actions": ["Identifier raisons oui (peur décevoir, plaire)", "Demander temps réflexion avant engagement", "Évaluer coût réel avant accepter", "Pratiquer non progressivement"],
      "alerte": { "niveau": "info", "texte": "✅ Toujours oui : protéger limites" }
    }
  },
  {
    "id": 539,
    "name": "Revue hebdomadaire pratiquée",
    "category": "organisation",
    "tags": ["réflexion", "ajustement"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Point semaine régulier",
    "legal": "✅ Recul bénéfique",
    "risk": "aucun",
    "conseil": {
      "titre": "🔄 Revue Hebdo",
      "message": "La revue hebdomadaire permet ajustements proactifs.",
      "actions": ["Vendredi après-midi ou dimanche soir", "Bilan semaine : réussites + apprentissages", "Planification semaine suivante", "Ajustements méthodes si besoin"],
      "alerte": null
    }
  },
  {
    "id": 540,
    "name": "Mode réactif permanent",
    "category": "organisation",
    "tags": ["réactivité", "urgences"],
    "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }],
    "desc": "Seulement réponse urgences",
    "legal": "⚠️ Absence stratégie",
    "risk": "moyen",
    "conseil": {
      "titre": "🚨 Mode Pompier",
      "message": "La réactivité constante empêche travail de fond.",
      "actions": ["Identifier si urgences évitables (anticipation)", "Bloquer temps proactif (planification)", "Distinguer urgent vs important", "Travailler causes racines urgences"],
      "alerte": { "niveau": "warning", "texte": "🚨 Mode réactif : cercle vicieux" }
    }
  },
  {
    "id": 541,
    "name": "Perfectionnisme sain",
    "category": "organisation",
    "tags": ["qualité", "équilibre"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Excellence sans obsession",
    "legal": "✅ Standards élevés",
    "risk": "aucun",
    "conseil": {
      "titre": "⭐ Excellence",
      "message": "L’excellence saine vise qualité sans sacrifice bien-être.",
      "actions": ["Standards élevés mais flexibles", "Accepter 'excellent' sans être 'parfait'", "Adapter niveau selon enjeux réels", "Célébrer résultats même imparfaits"],
      "alerte": null
    }
  },
  {
    "id": 542,
    "name": "Perfectionnisme pathologique",
    "category": "organisation",
    "tags": ["perfectionnisme", "paralysie"],
    "days": [{ "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }, { "h": 9, "type": "normal" }],
    "desc": "Jamais assez bien",
    "legal": "⚠️ Épuisement garanti",
    "risk": "moyen",
    "conseil": {
      "titre": "💎 Perfectionnisme Toxique",
      "message": "Le perfectionnisme excessif paralyse et épuise.",
      "actions": ["Identifier peurs sous-jacentes (jugement, rejet)", "Principe fait > parfait", "Temps limité par tâche (deadline auto-imposée)", "Accompagnement psy si envahissant"],
      "alerte": { "niveau": "warning", "texte": "💎 Perfectionnisme : risque burn-out" }
    }
  },
  {
    "id": 543,
    "name": "Automatisation tâches répétitives",
    "category": "organisation",
    "tags": ["efficacité", "automatisation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Processus optimisés",
    "legal": "✅ Gain temps",
    "risk": "aucun",
    "conseil": {
      "titre": "🤖 Automatisation",
      "message": "Automatiser tâches répétitives libère temps et énergie.",
      "actions": ["Identifier tâches répétitives chronophages", "Modèles emails/documents standards", "Macros ou scripts simples", "Formation outils si complexe"],
      "alerte": null
    }
  },
  {
    "id": 544,
    "name": "Documentation personnelle maintenue",
    "category": "organisation",
    "tags": ["mémoire", "efficacité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Notes procédures accessibles",
    "legal": "✅ Capitalisation savoir",
    "risk": "aucun",
    "conseil": {
      "titre": "📚 Documentation",
      "message": "Documenter réduit charge mentale et facilite partage.",
      "actions": ["Notes procédures récurrentes", "Base connaissance personnelle", "Modèles situations fréquentes", "Partage équipe si pertinent"],
      "alerte": null
    }
  },
  {
    "id": 545,
    "name": "Rituels début/fin journée",
    "category": "organisation",
    "tags": ["rituels", "transitions"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Routines entrée/sortie travail",
    "legal": "✅ Transitions saines",
    "risk": "aucun",
    "conseil": {
      "titre": "🎭 Rituels",
      "message": "Les rituels facilitent transitions pro-perso.",
      "actions": ["Matin : routine activation (café, to-do, lecture actu)", "Soir : routine clôture (to-do demain, ranger, fermer apps)", "Symboles transition (trajet, vêtements)", "Cohérence rituels = signal cerveau"],
      "alerte": null
    }
  },
  {
    "id": 546,
    "name": "Gestion email structurée",
    "category": "organisation",
    "tags": ["emails", "productivité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Méthode inbox zero",
    "legal": "✅ Maîtrise communication",
    "risk": "aucun",
    "conseil": {
      "titre": "📧 Emails Maîtrisés",
      "message": "Une gestion structurée emails réduit anxiété.",
      "actions": ["Créneaux dédiés (pas tout le temps)", "Méthode 2min : traiter immédiat si <2min", "Dossiers/labels thématiques", "Archiver pas laisser en boîte"],
      "alerte": null
    }
  },
  {
    "id": 547,
    "name": "Procrastination productive reconnue",
    "category": "organisation",
    "tags": ["procrastination", "créativité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Temps incubation utile",
    "legal": "✅ Processus créatif",
    "risk": "aucun",
    "conseil": {
      "titre": "💡 Incubation",
      "message": "Certains délais permettent maturation idées.",
      "actions": ["Distinguer incubation vs évitement", "Temps réflexion légitime décisions complexes", "Tolérer inconfort incertitude temporaire", "Deadline finale claire malgré incubation"],
      "alerte": null
    }
  },
  {
    "id": 548,
    "name": "Objectifs SMART définis",
    "category": "organisation",
    "tags": ["objectifs", "clarté"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Buts spécifiques mesurables",
    "legal": "✅ Direction claire",
    "risk": "aucun",
    "conseil": {
      "titre": "🎯 Objectifs SMART",
      "message": "Des objectifs clairs focalisent énergie efficacement.",
      "actions": ["Spécifique, Mesurable, Atteignable, Réaliste, Temporel", "Découper gros objectifs en jalons", "Célébrer jalons atteints", "Réviser si contexte change"],
      "alerte": null
    }
  },
  {
    "id": 549,
    "name": "Objectifs flous paralysants",
    "category": "organisation",
    "tags": ["clarté", "direction"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Attentes imprécises",
    "legal": "⚠️ Direction manquante",
    "risk": "moyen",
    "conseil": {
      "titre": "❓ Objectifs Flous",
      "message": "Des objectifs vagues génèrent anxiété et inefficacité.",
      "actions": ["Clarifier avec manager si flou descendant", "Définir propres critères succès si impossible", "Communiquer besoin précision", "Itérations OK si évolution contexte"],
      "alerte": { "niveau": "info", "texte": "❓ Flou : demander précisions" }
    }
  },
  {
    "id": 550,
    "name": "Célébration petites victoires",
    "category": "reconnaissance",
    "tags": ["célébration", "motivation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Reconnaissance progrès",
    "legal": "✅ Motivation maintenue",
    "risk": "aucun",
    "conseil": {
      "titre": "🎉 Victoires",
      "message": "Célébrer progrès maintient motivation long terme.",
      "actions": ["Reconnaître accomplissements quotidiens", "Pause micro-célébration après tâche difficile", "Journal succès hebdomaire", "Partager victoires équipe"],
      "alerte": null
    }
  },
  {
    "id": 551,
    "name": "Sport régulier pratiqué",
    "category": "prevention",
    "tags": ["sport", "énergie"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Activité physique maintenue",
    "legal": "✅ Protection santé",
    "risk": "aucun",
    "conseil": {
      "titre": "🏃 Sport Régulier",
      "message": "L’activity physique protège stress et burn-out.",
      "actions": ["Minimum 30min 3x/semaine", "Activité plaisir pas contrainte", "Varier intensités selon énergie", "Sport = investissement santé"],
      "alerte": null
    }
  },
  {
    "id": 552,
    "name": "Alimentation équilibrée",
    "category": "prevention",
    "tags": ["nutrition", "énergie"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Repas sains réguliers",
    "legal": "✅ Énergie stable",
    "risk": "aucun",
    "conseil": {
      "titre": "🥗 Nutrition",
      "message": "Une alimentation équilibrée soutient énergie et concentration.",
      "actions": ["3 repas réguliers sans sauter", "Limiter sucres rapides et excitants", "Hydratation suffisante (1,5-2L/jour)", "Collations saines si fringales"],
      "alerte": null
    }
  },
  {
    "id": 553,
    "name": "Sommeil qualité prioritaire",
    "category": "prevention",
    "tags": ["sommeil", "récupération"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "7-8h nuit régulières",
    "legal": "✅ Récupération essentielle",
    "risk": "aucun",
    "conseil": {
      "titre": "😴 Sommeil Qualité",
      "message": "Le sommeil est le pilier prévention burn-out.",
      "actions": ["7-8h minimum non négociables", "Horaires réguliers même week-end", "Routine coucher apaisante", "Chambre fraîche, sombre, silencieuse"],
      "alerte": null
    }
  },
  {
    "id": 554,
    "name": "Pratiques relaxation régulières",
    "category": "prevention",
    "tags": ["relaxation", "stress"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Méditation, yoga, cohérence cardiaque",
    "legal": "✅ Gestion stress",
    "risk": "aucun",
    "conseil": {
      "titre": "🧘 Relaxation",
      "message": "Les techniques relaxation réduisent stress durablement.",
      "actions": ["Trouver pratique adaptée (méditation, yoga, respiration)", "Régularité > durée (5min/jour > 1h/semaine)", "Apps guidage si débutant", "Intégrer routine quotidienne"],
      "alerte": null
    }
  },
  {
    "id": 555,
    "name": "Réseau soutien social",
    "category": "prevention",
    "tags": ["social", "soutien"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Proches soutenants présents",
    "legal": "✅ Facteur protecteur",
    "risk": "aucun",
    "conseil": {
      "titre": "❤️ Soutien Social",
      "message": "Le soutien social est facteur protecteur majeur.",
      "actions": ["Cultiver relations qualité", "Parler difficultés avec confidents", "Demander aide si besoin", "Réciprocité : offrir soutien aussi"],
      "alerte": null
    }
  },
  {
    "id": 556,
    "name": "Psychothérapie préventive",
    "category": "prevention",
    "tags": ["psy", "accompagnement"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Suivi psy régulier",
    "legal": "✅ Accompagnement proactif",
    "risk": "aucun",
    "conseil": {
      "titre": "🧠 Thérapie Préventive",
      "message": "Consulter psy n’exige pas crise : prévention légitime.",
      "actions": ["Thérapie = hygiène mentale pas pathologie", "TCC efficace prévention burn-out", "Régularité (mensuelle) même si ça va", "Investissement santé mentale"],
      "alerte": null
    }
  },
  {
    "id": 557,
    "name": "Formation gestion stress",
    "category": "prevention",
    "tags": ["formation", "compétences"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Apprentissage outils",
    "legal": "✅ Développement compétences",
    "risk": "aucun",
    "conseil": {
      "titre": "📚 Formation Stress",
      "message": "Apprendre gérer stress est compétence précieuse.",
      "actions": ["Solliciter formations entreprise si disponibles", "MOOC gestion stress gratuits", "Livres références (Christophe André, etc.)", "Pratiquer régulièrement outils appris"],
      "alerte": null
    }
  },
  {
    "id": 558,
    "name": "Coaching professionnel",
    "category": "prevention",
    "tags": ["coaching", "développement"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Accompagnement coach",
    "legal": "✅ Soutien développement",
    "risk": "aucun",
    "conseil": {
      "titre": "💼 Coaching",
      "message": "Le coaching facilite transitions et développement.",
      "actions": ["Coaching = accélérateur pas béquille", "Objectifs clairs dès départ", "Engagement régulier séances", "Application apprentissages entre séances"],
      "alerte": null
    }
  },
  {
    "id": 559,
    "name": "Bilan compétences anticipé",
    "category": "prevention",
    "tags": ["bilan", "orientation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Réflexion projet pro",
    "legal": "✅ Anticipation évolution",
    "risk": "aucun",
    "conseil": {
      "titre": "🔍 Bilan Compétences",
      "message": "Le bilan compétences clarifie aspirations.",
      "actions": ["Financement CPF possible", "Accompagnement neutre extérieur", "Exploration sans obligation changement", "Timing : avant crise pas pendant"],
      "alerte": null
    }
  },
  {
    "id": 560,
    "name": "Veille évolution métier",
    "category": "prevention",
    "tags": ["veille", "adaptation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Actualisation compétences",
    "legal": "✅ Employabilité maintenue",
    "risk": "aucun",
    "conseil": {
      "titre": "📡 Veille Métier",
      "message": "Se maintenir à jour réduit anxiété obsolescence.",
      "actions": ["Temps veille régulier (1-2h/semaine)", "Conférences, webinaires métier", "Réseaux professionnels actifs", "Certifications si pertinent"],
      "alerte": null
    }
  },
  {
    "id": 561,
    "name": "Mentorat bénéficié",
    "category": "prevention",
    "tags": ["mentorat", "apprentissage"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Mentor expérimenté accessible",
    "legal": "✅ Apprentissage accéléré",
    "risk": "aucun",
    "conseil": {
      "titre": "🎓 Mentorat",
      "message": "Un mentor facilite navigation carrière.",
      "actions": ["Solliciter mentor formel ou informel", "Régularité échanges", "Questions préparées en amont", "Réciprocité : mentorat inversé junior"],
      "alerte": null
    }
  },
  {
    "id": 562,
    "name": "Groupes parole pairs",
    "category": "prevention",
    "tags": ["pairs", "partage"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Échanges collègues similaires",
    "legal": "✅ Soutien mutuel",
    "risk": "aucun",
    "conseil": {
      "titre": "💬 Groupes Pairs",
      "message": "Les groupes pairs normalisent difficultés.",
      "actions": ["Groupes informels déjeuners", "Communautés métier/secteur", "Partage expériences sans jugement", "Ressources collectives solutions"],
      "alerte": null
    }
  },
  {
    "id": 563,
    "name": "Formation premiers secours PSY",
    "category": "prevention",
    "tags": ["PSSM", "secourisme"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "PSSM (Premiers Secours Santé Mentale)",
    "legal": "✅ Compétence utile",
    "risk": "aucun",
    "conseil": {
      "titre": "🚑 PSSM",
      "message": "Les premiers secours santé mentale sauvent.",
      "actions": ["Formation PSSM 14h disponible", "Reconnaître signaux détresse", "Orienter vers ressources appropriées", "Déstigmatiser santé mentale"],
      "alerte": null
    }
  },
  {
    "id": 564,
    "name": "Cellule écoute entreprise",
    "category": "prevention",
    "tags": ["écoute", "ressource"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Service soutien psy accessible",
    "legal": "✅ Ressource interne",
    "risk": "aucun",
    "conseil": {
      "titre": "☎️ Cellule Écoute",
      "message": "Les cellules écoute offrent soutien confidentiel.",
      "actions": ["Utiliser sans crainte confidentialité garantie", "Premier contact téléphonique souvent", "Orientation ressources adaptées", "Complément pas remplacement suivi externe"],
      "alerte": null
    }
  },
  {
    "id": 565,
    "name": "Programme QVT entreprise",
    "category": "prevention",
    "tags": ["QVT", "initiative"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Actions qualité vie travail",
    "legal": "✅ Engagement employeur",
    "risk": "aucun",
    "conseil": {
      "titre": "🌟 Programme QVT",
      "message": "Les programmes QVT améliorent conditions travail.",
      "actions": ["Participer initiatives proposées", "Feedback constructif améliorations", "Proposer idées nouvelles actions", "Reconnaissance efforts entreprise"],
      "alerte": null
    }
  },
  {
    "id": 566,
    "name": "Droit déconnexion formalisé",
    "category": "prevention",
    "tags": ["déconnexion", "droit"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Charte déconnexion respectée",
    "legal": "✅ Protection repos",
    "risk": "aucun",
    "conseil": {
      "titre": "📵 Droit Déconnexion",
      "message": "Le droit déconnexion protège récupération.",
      "actions": ["Connaître règles entreprise", "Respecter droit collègues", "Envoi différé emails hors horaires", "Culture collective respectueuse"],
      "alerte": null
    }
  },
  {
    "id": 567,
    "name": "Référent harcèlement connu",
    "category": "prevention",
    "tags": ["harcèlement", "ressource"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Point contact identifié",
    "legal": "✅ Ressource accessible",
    "risk": "aucun",
    "conseil": {
      "titre": "🛡️ Référent Harcèlement",
      "message": "Le référent harcèlement est ressource confidentielle.",
      "actions": ["Connaître identité référent", "Contacter si situation ambiguë (pas que certitude)", "Confidentialité garantie", "Orientation démarches appropriées"],
      "alerte": null
    }
  },
  {
    "id": 568,
    "name": "CSSCT actif",
    "category": "prevention",
    "tags": ["CSSCT", "prévention"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Commission santé travail dynamique",
    "legal": "✅ Prévention collective",
    "risk": "aucun",
    "conseil": {
      "titre": "👥 CSSCT",
      "message": "Le CSSCT œuvre pour conditions travail.",
      "actions": ["Connaître membres CSSCT", "Remonter préoccupations santé/sécurité", "Participer enquêtes si sollicité", "Soutenir actions prévention"],
      "alerte": null
    }
  },
  {
    "id": 569,
    "name": "Médecin travail accessible",
    "category": "prevention",
    "tags": ["médecine travail", "santé"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Service santé travail présent",
    "legal": "✅ Ressource santé",
    "risk": "aucun",
    "conseil": {
      "titre": "🏥 Médecin Travail",
      "message": "Le médecin travail est allié santé pro.",
      "actions": ["Solliciter visite sans attendre visite périodique", "Aborder santé mentale sans tabou", "Préconisations aménagements possibles", "Confidentialité vis-à-vis employeur"],
      "alerte": null
    }
  },
  {
    "id": 570,
    "name": "Ergonome intervenu",
    "category": "prevention",
    "tags": ["ergonomie", "prévention"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Audit poste réalisé",
    "legal": "✅ Prévention TMS",
    "risk": "aucun",
    "conseil": {
      "titre": "🪑 Ergonome",
      "message": "L’ergonome optimise poste et prévient douleurs.",
      "actions": ["Demander audit si inconfort", "Appliquer recommandations", "Réglages réguliers (posture évolue)", "Signaler nouveaux équipements"],
      "alerte": null
    }
  },
  {
    "id": 571,
    "name": "Formation RPS managers",
    "category": "prevention",
    "tags": ["management", "formation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Sensibilisation risques psychosociaux",
    "legal": "✅ Prévention managériale",
    "risk": "aucun",
    "conseil": {
      "titre": "👔 Managers Formés RPS",
      "message": "Des managers formés détectent signaux précocement.",
      "actions": ["Si manager : solliciter formation RPS", "Dialogue ouvert santé mentale équipe", "Détection signaux faibles", "Orientation ressources appropriées"],
      "alerte": null
    }
  },
  {
    "id": 572,
    "name": "Baromètre social régulier",
    "category": "prevention",
    "tags": ["enquête", "climat"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Enquêtes climat social",
    "legal": "✅ Écoute organisée",
    "risk": "aucun",
    "conseil": {
      "titre": "📊 Baromètre",
      "message": "Les enquêtes régulières mesurent climat.",
      "actions": ["Répondre honnêtement enquêtes", "Anonymat respecté", "Suivi actions post-enquête", "Feedback si pas actions"],
      "alerte": null
    }
  },
  {
    "id": 573,
    "name": "Entretiens annuels qualitatifs",
    "category": "prevention",
    "tags": ["entretien", "écoute"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Moments écoute formalisés",
    "legal": "✅ Dialogue régulier",
    "risk": "aucun",
    "conseil": {
      "titre": "💬 Entretiens Annuels",
      "message": "Les entretiens sont moments légitimes évocation difficultés.",
      "actions": ["Préparer entretien (bilan, besoins)", "Aborder charge travail honnêtement", "Solliciter soutiens nécessaires", "Formalisation écrite engagements"],
      "alerte": null
    }
  },
  {
    "id": 574,
    "name": "Congés sabbatiques possibles",
    "category": "prevention",
    "tags": ["sabbatique", "ressourcement"],
    "days": [],
    "desc": "Dispositif pause longue",
    "legal": "✅ Ressourcement profond",
    "risk": "aucun",
    "conseil": {
      "titre": "🌴 Sabbatique",
      "message": "Le congé sabbatique permet ressourcement profond.",
      "actions": ["6-11 mois suspension contrat", "Ancienneté requise (vérifier accord)", "Réflexion projet pendant sabbatique", "Retour garanti poste équivalent"],
      "alerte": null
    }
  },
  {
    "id": 575,
    "name": "Temps partiel choisi facilité",
    "category": "prevention",
    "tags": ["temps partiel", "équilibre"],
    "days": [{ "h": 5.6, "type": "normal" }, { "h": 5.6, "type": "normal" }, { "h": 5.6, "type": "normal" }, { "h": 5.6, "type": "normal" }, { "h": 5.6, "type": "normal" }],
    "desc": "Réduction temps possible",
    "legal": "✅ Flexibilité offerte",
    "risk": "aucun",
    "conseil": {
      "titre": "⏱️ Temps Partiel",
      "message": "Le temps partiel choisi améliore équilibre vie.",
      "actions": ["Explorer si envisagé (80% populaire)", "Impacts financiers à anticiper", "Négocier jours ou horaires adaptés", "Retour temps plein facilité"],
      "alerte": null
    }
  },
  {
    "id": 576,
    "name": "Retour après arrêt burn-out",
    "category": "prevention",
    "tags": ["retour", "reprise"],
    "days": [{ "h": 4, "type": "normal" }, { "h": 4, "type": "normal" }, { "h": 4, "type": "normal" }, { "h": 4, "type": "normal" }, { "h": 4, "type": "normal" }],
    "desc": "Reprise progressive travail",
    "legal": "✅ Retour aménagé",
    "risk": "moyen",
    "conseil": {
      "titre": "🔄 Retour Burn-Out",
      "message": "Le retour après burn-out nécessite accompagnement.",
      "actions": ["Mi-temps thérapeutique si prescrit", "Aménagements charge discutés", "Suivi psy maintenu", "Vigilance rechute premiers mois"],
      "alerte": { "niveau": "info", "texte": "🔄 Retour : vigilance rechute" }
    }
  },
  {
    "id": 577,
    "name": "Proche en burn-out",
    "category": "prevention",
    "tags": ["entourage", "soutien"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Soutenir collègue en difficulté",
    "legal": "✅ Soutien approprié",
    "risk": "aucun",
    "conseil": {
      "titre": "🤝 Soutenir Proche",
      "message": "Soutenir sans se substituer aux professionnels.",
      "actions": ["Écoute bienveillante sans jugement", "Encourager consultation professionnelle", "Ne pas minimiser ('Ça va passer')", "Respecter rythme et choix personne"],
      "alerte": null
    }
  },
  {
    "id": 578,
    "name": "Manager détecte signaux équipe",
    "category": "prevention",
    "tags": ["management", "détection"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Vigilance santé collaborateurs",
    "legal": "✅ Responsabilité managériale",
    "risk": "aucun",
    "conseil": {
      "titre": "👔 Manager Vigilant",
      "message": "Le manager a rôle clé détection précoce.",
      "actions": ["Formation reconnaissance signaux", "Entretiens réguliers individuels", "Réagir rapidement changements comportement", "Mobiliser ressources (RH, médecin travail)"],
      "alerte": null
    }
  },
  {
    "id": 579,
    "name": "Changement organisation stressant",
    "category": "organisation",
    "tags": ["changement", "adaptation"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Restructuration en cours",
    "legal": "⚠️ Période incertitude",
    "risk": "moyen",
    "conseil": {
      "titre": "🔄 Changement Orga",
      "message": "Les changements organisationnels génèrent stress.",
      "actions": ["Chercher informations fiables", "Exprimer préoccupations légitimes", "Se concentrer sur contrôlable", "Soutien mutuel entre collègues"],
      "alerte": { "niveau": "info", "texte": "🔄 Changement : normal stresser" }
    }
  },
  {
    "id": 580,
    "name": "Fusion acquisition vécue",
    "category": "organisation",
    "tags": ["fusion", "incertitude"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Rachat entreprise",
    "legal": "⚠️ Incertitude majeure",
    "risk": "moyen",
    "conseil": {
      "titre": "🔀 Fusion",
      "message": "Les fusions créent incertitude importante.",
      "actions": ["Informations officielles privilégiées", "Préparer CV par précaution", "Opportunités possibles nouvelles structure", "Soutien externe (réseau, psy) si anxiété"],
      "alerte": { "niveau": "warning", "texte": "🔀 Fusion : anticiper scénarios" }
    }
  },
  {
    "id": 581,
    "name": "Plan social annoncé",
    "category": "organisation",
    "tags": ["licenciement", "crise"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Restructuration emplois",
    "legal": "⚠️ Stress majeur",
    "risk": "élevé",
    "conseil": {
      "titre": "⚠️ Plan Social",
      "message": "L’annonce plan social est traumatisante.",
      "actions": ["Informations précises sur process", "Accompagnement reclassement si concerné", "Soutien psy cellule entreprise ou externe", "Droits syndicaux et légaux"],
      "alerte": { "niveau": "danger", "texte": "⚠️ Plan social : soutien essentiel" }
    }
  },
  {
    "id": 582,
    "name": "Conflit équipes chronique",
    "category": "relationnel",
    "tags": ["conflit", "collectif"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Tensions inter-services",
    "legal": "⚠️ RPS collectifs",
    "risk": "moyen",
    "conseil": {
      "titre": "⚔️ Conflits Équipes",
      "message": "Les conflits chroniques dégradent climat.",
      "actions": ["Médiation professionnelle externe", "Clarification rôles et responsabilités", "Team-building si relations détériorées", "Protection individuelle malgré contexte"],
      "alerte": { "niveau": "warning", "texte": "⚔️ Conflits durables : médiation nécessaire" }
    }
  },
  {
    "id": 583,
    "name": "Leadership toxique subi",
    "category": "relationnel",
    "tags": ["leadership", "toxicité"],
    "days": [{ "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }, { "h": 8, "type": "normal" }],
    "desc": "Direction dysfonctionnelle",
    "legal": "⚠️ Culture toxique",
    "risk": "élevé",
    "conseil": {
      "titre": "☠️ Leadership Toxique",
      "message": "Un leadership toxique impacte tous.",
      "actions": ["Documenter comportements problématiques", "Soutien collectif entre pairs", "Signalement RH ou instances", "Envisager départ si aucune évolution"],
      "alerte": { "niveau": "danger", "texte": "☠️ Leadership toxique : protéger santé" }
    }
  },
  {
    "id": 584,
    "name": "Valeurs entreprise inspirantes",
    "category": "reconnaissance",
    "tags": ["valeurs", "engagement"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Culture alignée aspirations",
    "legal": "✅ Engagement fort",
    "risk": "aucun",
    "conseil": {
      "titre": "⭐ Culture Inspirante",
      "message": "L’alignement culturel nourrit engagement.",
      "actions": ["Incarner valeurs au quotidien", "Valoriser culture comme atout", "Participer initiatives culturelles", "Reconnaître chance alignement"],
      "alerte": null
    }
  },
  {
    "id": 585,
    "name": "Mission entreprise questionnée",
    "category": "reconnaissance",
    "tags": ["mission", "dissonance"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Doutes impact organisation",
    "legal": "⚠️ Conflit éthique",
    "risk": "moyen",
    "conseil": {
      "titre": "❓ Mission Questionnée",
      "message": "Les doutes sur mission génèrent mal-être.",
      "actions": ["Identifier nature questionnement", "Discussion pairs confiance", "Engagement actions alignées si possible", "Envisager transition si conflit profond"],
      "alerte": { "niveau": "info", "texte": "❓ Doutes mission : légitime questionner" }
    }
  },
  {
    "id": 586,
    "name": "Innovation encouragée",
    "category": "organisation",
    "tags": ["innovation", "créativité"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Droit erreur reconnu",
    "legal": "✅ Culture apprenante",
    "risk": "aucun",
    "conseil": {
      "titre": "💡 Innovation",
      "message": "Le droit à l’erreur favorise créativité.",
      "actions": ["Proposer idées sans crainte", "Apprentissage des échecs valorisé", "Expérimentations encouragées", "Célébration tentatives autant que réussites"],
      "alerte": null
    }
  },
  {
    "id": 587,
    "name": "Erreur sanctionnée sévèrement",
    "category": "organisation",
    "tags": ["erreur", "punition"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Climat peur erreur",
    "legal": "⚠️ Culture punitive",
    "risk": "moyen",
    "conseil": {
      "titre": "⚠️ Peur Erreur",
      "message": "La peur de l’erreur inhibe et stresse.",
      "actions": ["Documenter réactions disproportionnées", "Distinguer erreur vs faute intentionnelle", "Soutien mutuel équipe", "Questionner culture apprentissage"],
      "alerte": { "niveau": "warning", "texte": "⚠️ Climat peur : culture toxique" }
    }
  },
  {
    "id": 588,
    "name": "Transparence décisions",
    "category": "organisation",
    "tags": ["transparence", "confiance"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Communication ouverte",
    "legal": "✅ Confiance établie",
    "risk": "aucun",
    "conseil": {
      "titre": "💎 Transparence",
      "message": "La transparence crée confiance et engagement.",
      "actions": ["Valoriser ouverture communication", "Partager informations pertinentes", "Questions bienvenues", "Feedback positif sur transparence"],
      "alerte": null
    }
  },
  {
    "id": 589,
    "name": "Secrets et non-dits",
    "category": "organisation",
    "tags": ["opacité", "méfiance"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Communication opaque",
    "legal": "⚠️ Climat méfiance",
    "risk": "moyen",
    "conseil": {
      "titre": "🤐 Opacité",
      "message": "L’opacité génère rumeurs et méfiance.",
      "actions": ["Solliciter informations factuelles", "Distinguer rumeur vs fait", "Demander clarifications formelles", "Documenter incohérences si pattern"],
      "alerte": { "niveau": "info", "texte": "🤐 Opacité : demander transparence" }
    }
  },
  {
    "id": 590,
    "name": "Participation décisions encouragée",
    "category": "organisation",
    "tags": ["participation", "empowerment"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Voix collaborateurs entendue",
    "legal": "✅ Empowerment",
    "risk": "aucun",
    "conseil": {
      "titre": "🗣️ Participation",
      "message": "La participation aux décisions motive.",
      "actions": ["Contribuer activement consultations", "Propositions argumentées", "Accepter décisions finales même si divergentes", "Reconnaître écoute comme valeur"],
      "alerte": null
    }
  },
  {
    "id": 591,
    "name": "Décisions imposées sans consultation",
    "category": "organisation",
    "tags": ["autoritarisme", "frustration"],
    "days": [{ "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }, { "h": 7, "type": "normal" }],
    "desc": "Style management directif",
    "legal": "⚠️ Démotivation",
    "risk": "moyen",
    "conseil": {
      "titre": "📢 Impositions",
      "message": "Les décisions imposées démotivent.",
      "actions": ["Exprimer impact sur motivation", "Proposer modalités consultation", "Distinguer urgence vs habitude", "Valoriser participation quand présente"],
      "alerte": { "niveau": "info", "texte": "📢 Pas consultation : impact engagement" }
    }
  },
  {
    "id": 592,
    "name": "Équilibre vie réussi long terme",
    "category": "equilibre",
    "tags": ["équilibre", "réussite"],
    "days": [
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" }
    ],
    "desc": "Harmonie pro-perso durable",
    "legal": "✅ Réussite holistique",
    "risk": "aucun",
    "conseil": {
      "titre": "🌈 Équilibre Réussi",
      "message": "L’équilibre durable est accomplissement majeur.",
      "actions": [
        "Protéger équilibre comme acquis précieux",
        "Rester vigilant dérives progressives",
        "Partager pratiques gagnantes",
        "Reconnaître équilibre comme réussite"
      ],
      "alerte": null
    }
  },
  {
    "id": 593,
    "name": "Reconversion réfléchie",
    "category": "prevention",
    "tags": ["reconversion", "projet"],
    "days": [
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" }
    ],
    "desc": "Projet changement professionnel",
    "legal": "✅ Évolution choisie",
    "risk": "aucun",
    "conseil": {
      "titre": "🔄 Reconversion",
      "message": "La reconversion mûrie ouvre nouvelles perspectives.",
      "actions": [
        "Bilan compétences préalable",
        "Test activité (stage, bénévolat)",
        "Sécurisation financière transition",
        "Accompagnement (coach, formation)"
      ],
      "alerte": null
    }
  },
  {
    "id": 594,
    "name": "Démission précipitée évitée",
    "category": "prevention",
    "tags": ["démission", "réflexion"],
    "days": [
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" }
    ],
    "desc": "Décision reportée à tête froide",
    "legal": "✅ Décision éclairée",
    "risk": "aucun",
    "conseil": {
      "titre": "⏸️ Pause Décision",
      "message": "Reporter décisions importantes en période fragilité.",
      "actions": [
        "Règle 30 jours : attendre avant démissionner",
        "Consulter avant décision irréversible",
        "Solutions intermédiaires (mobilité, aménagements)",
        "Sécurisation avant saut (emploi, finances)"
      ],
      "alerte": null
    }
  },
  {
    "id": 595,
    "name": "Mobilité interne réussie",
    "category": "prevention",
    "tags": ["mobilité", "évolution"],
    "days": [
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" }
    ],
    "desc": "Changement poste/service",
    "legal": "✅ Nouvelle dynamique",
    "risk": "aucun",
    "conseil": {
      "titre": "🔄 Mobilité Interne",
      "message": "La mobilité interne peut relancer dynamique.",
      "actions": [
        "Explorer opportunités internes",
        "Accompagnement transition (formation)",
        "Conservation ancienneté et avantages",
        "Réseau préservé"
      ],
      "alerte": null
    }
  },
  {
    "id": 596,
    "name": "Transition carrière préparée",
    "category": "prevention",
    "tags": ["transition", "anticipation"],
    "days": [
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" }
    ],
    "desc": "Évolution anticipée",
    "legal": "✅ Anticipation sereine",
    "risk": "aucun",
    "conseil": {
      "titre": "🎯 Transition Préparée",
      "message": "Anticiper transitions réduit stress.",
      "actions": [
        "Développement compétences transférables",
        "Réseau professionnel entretenu",
        "Formation continue régulière",
        "Employabilité maintenue"
      ],
      "alerte": null
    }
  },
  {
    "id": 597,
    "name": "Résilience développée",
    "category": "prevention",
    "tags": ["résilience", "adaptation"],
    "days": [
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" }
    ],
    "desc": "Capacité rebond renforcée",
    "legal": "✅ Compétence vie",
    "risk": "aucun",
    "conseil": {
      "titre": "💪 Résilience",
      "message": "La résilience se construit et se renforce.",
      "actions": [
        "Apprentissage de chaque épreuve",
        "Réseau soutien solide",
        "Pratiques ressourcement régulières",
        "Aide professionnelle si besoin"
      ],
      "alerte": null
    }
  },
  {
    "id": 598,
    "name": "Gratitude pratiquée",
    "category": "prevention",
    "tags": ["gratitude", "bien-être"],
    "days": [
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" }
    ],
    "desc": "Reconnaissance quotidienne positif",
    "legal": "✅ Mindset positif",
    "risk": "aucun",
    "conseil": {
      "titre": "🙏 Gratitude",
      "message": "La gratitude améliore bien-être durablement.",
      "actions": [
        "Journal gratitude (3 éléments/jour)",
        "Reconnaissance verbale aux autres",
        "Focus sur présent vs rumination",
        "Pratique régulière = impact cumulatif"
      ],
      "alerte": null
    }
  },
  {
    "id": 599,
    "name": "Auto-compassion cultivée",
    "category": "prevention",
    "tags": ["bienveillance", "soi"],
    "days": [
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" },
      { "h": 7, "type": "normal" }
    ],
    "desc": "Bienveillance envers soi",
    "legal": "✅ Pilier bien-être",
    "risk": "aucun",
    "conseil": {
      "titre": "❤️ Auto-Compassion",
      "message": "L’auto-compassion réduit stress et burn-out.",
      "actions": [
        "Parler à soi comme à ami",
        "Accepter imperfections sans jugement",
        "Reconnaître humanité commune difficultés",
        "Mindfulness et acceptation"
      ],
      "alerte": null
    }
  },
{
  "id": 600,
  "name": "Vigilance continue bien-être",
  "category": "prevention",
  "tags": ["vigilance", "équilibre"],
  "days": [
    { "h": 7, "type": "normal" },
    { "h": 7, "type": "normal" },
    { "h": 7, "type": "normal" },
    { "h": 7, "type": "normal" },
    { "h": 7, "type": "normal" }
  ],
  "desc": "Attention quotidienne signaux",
  "legal": "✅ Prévention active",
  "risk": "aucun",
  "conseil": {
    "titre": "🎯 Vigilance Continue",
    "message": "Le bien-être nécessite attention régulière.",
    "actions": [
      "Check-in quotidien : comment je vais vraiment?",
      "Ajustements proactifs si dérive",
      "Aide précoce plus efficace que tardive",
      "Bien-être = marathon pas sprint"
    ],
    "alerte": null
  }
}
];
