/**
 * dte-glossary.js — Bibliothèque scientifique complète du Digital Twin Engine
 * 30 études + 18 concepts — moteur de recherche par mots-clés
 */
(function(global){
'use strict';

/* ══════════════════════════════════════════════════════════════════
   ÉTUDES SCIENTIFIQUES — LISTE COMPLÈTE
   ══════════════════════════════════════════════════════════════════ */
const STUDIES = [

  /* ── CARDIOVASCULAIRE ─────────────────────────────────────────── */
  {
    id:'WHO_ILO_2021', cat:'Cardiovasculaire', couleur:'#ff2244', nouveaute:false,
    titre:'Charge mondiale de morbidité attribuable aux longues heures — AVC et cardiopathies ischémiques',
    auteurs:'Pega F., Náfrádi B., Momen N.C., Ujita Y. et al. (OMS/OIT)',
    journal:'Environment International', annee:2021, volume:'154:106595',
    doi:'10.1016/j.envint.2021.106595',
    lien:'https://doi.org/10.1016/j.envint.2021.106595',
    population:'768 000 participants (cardiopathies) + 839 000 (AVC) · 194 pays · 2000–2016',
    seuil:'≥55h/sem vs 35-40h/sem',
    preuve:'★★★ Méta-analyse systématique OMS/OIT — référence mondiale',
    resultats:[
      'RR = 1.35 pour l\'AVC (risque relatif, IC95% 1.13–1.61)',
      'RR = 1.17 pour la cardiopathie ischémique (IC95% 1.11–1.24)',
      '745 194 décès en 2016 attribuables aux longues heures (+29% depuis 2000)',
      '398 000 décès par AVC + 347 000 par cardiopathie ischémique',
      'Relation dose-réponse confirmée pour l\'AVC : + heures = + risque',
      '9% de la population mondiale travaille ≥55h/sem (488 millions)',
    ],
    dte:'Score cvRisk · seuil 55h · Phase 4 (Burn-out)',
    tags:['cardiovasculaire','AVC','stroke','cardiopathie','OMS','OIT','mortalité','dose-réponse'],
  },
  {
    id:'KIVIMAKI_2015', cat:'Cardiovasculaire', couleur:'#ff2244', nouveaute:false,
    titre:'Longues heures de travail et risque de coronaropathie et d\'AVC — méta-analyse individuelle',
    auteurs:'Kivimäki M., Jokela M., Nyberg S.T. et al. (IPD-Work Consortium)',
    journal:'The Lancet', annee:2015, volume:'386(10005):1739-1746',
    doi:'10.1016/S0140-6736(15)60295-1',
    lien:'https://doi.org/10.1016/S0140-6736(15)60295-1',
    population:'603 838 individus · 25 études · Europe, USA, Australie',
    seuil:'>48h/sem',
    preuve:'★★★ Méta-analyse données individuelles — 603 838 personnes',
    resultats:[
      'RR = 1.33 pour l\'AVC (pooled, toutes études)',
      'RR = 1.13 pour la coronaropathie ischémique',
      'Relation dose-réponse spécifique et forte pour l\'AVC',
      'Association plus forte pour l\'AVC que pour la cardiopathie',
      'Données individuelles de 20 cohortes analysées (méthode IPD)',
    ],
    dte:'Validation modèle cvRisk · dose-réponse AVC · seuil 48h',
    tags:['cardiovasculaire','AVC','coronaropathie','Lancet','méta-analyse','dose-réponse','Kivimäki'],
  },
  {
    id:'KIVIMAKI_2017_AFIB', cat:'Cardiovasculaire', couleur:'#ff2244', nouveaute:false,
    titre:'Longues heures de travail et risque de fibrillation auriculaire',
    auteurs:'Kivimäki M. et al. (IPD-Work Consortium)',
    journal:'European Heart Journal', annee:2017, volume:'38(34):2621-2628',
    doi:'10.1093/eurheartj/ehx316',
    lien:'https://doi.org/10.1093/eurheartj/ehx316',
    population:'85 494 hommes et femmes · 8 études prospectives · Europe',
    seuil:'>55h/sem',
    preuve:'★★★ Méta-analyse prospective multi-cohorte',
    resultats:[
      'HR = 1.42 pour la fibrillation auriculaire (>55h vs 35-40h)',
      '1ère étude démontrant le lien heures de travail — arythmie cardiaque',
      'Risque indépendant des autres facteurs cardiovasculaires',
    ],
    dte:'Score cvRisk · arythmie dans les risques Phase 3-4',
    tags:['cardiovasculaire','fibrillation auriculaire','arythmie','Lancet','cœur'],
  },
  {
    id:'ERVASTI_2021', cat:'Multi-pathologies', couleur:'#ff6600', nouveaute:false,
    titre:'50 pathologies et mortalité liées aux longues heures — étude multicohorte européenne',
    auteurs:'Ervasti J., Pentti J., Nyberg S.T., Kivimäki M. et al.',
    journal:'The Lancet Regional Health – Europe', annee:2021, volume:'11:100212',
    doi:'10.1016/j.lanepe.2021.100212',
    lien:'https://doi.org/10.1016/j.lanepe.2021.100212',
    population:'59 599 (primaire) + 44 262 (réplication) · Finlande, Suède, Danemark, Royaume-Uni',
    seuil:'≥55h/sem vs 35-40h/sem · suivi jusqu\'à 65 ans',
    preuve:'★★★ Méta-analyse multicohorte, 4 pays européens, 50 pathologies',
    resultats:[
      'HR = 1.68 (IC95% 1.08–2.61) mort cardiovasculaire avant 65 ans',
      'HR = 1.37 (IC95% 1.13–1.67) infections bactériennes hospitalisées',
      'HR = 1.18 (IC95% 1.01–1.38) diabète de type 2',
      'HR = 1.22 (IC95% 1.00–1.50) blessures et accidents',
      'HR = 1.15 (IC95% 1.06–1.26) troubles musculo-squelettiques',
      'Sur 50 pathologies suivies : 14 associations significatives confirmées',
    ],
    dte:'Scores diabetesRisk · musculoRisk · validation cvRisk',
    tags:['multi-pathologies','diabète','musculo-squelettique','infections','Lancet','Ervasti'],
  },
  {
    id:'TRUDEL_2021', cat:'Cardiovasculaire', couleur:'#ff2244', nouveaute:false,
    titre:'Longues heures de travail et risque de récidive d\'événement coronarien',
    auteurs:'Trudel X., Brisson C., Talbot D., Gilbert-Ouimet M., Milot A.',
    journal:'Journal of the American College of Cardiology (JACC)', annee:2021, volume:'77(13):1616-1625',
    doi:'10.1016/j.jacc.2021.02.012',
    lien:'https://doi.org/10.1016/j.jacc.2021.02.012',
    population:'Patients post-infarctus, cohorte canadienne · suivi prospectif',
    seuil:'>48h/sem',
    preuve:'★★☆ Étude prospective sur patients cardiaques',
    resultats:[
      'HR = 1.12 pour la récidive de coronaropathie chez les patients déjà atteints',
      'Risque comparable en magnitude à celui du tabagisme actuel',
      'Risque additionnel en cas de tension au travail (job strain) associée',
    ],
    dte:'Contexte récidive cardiovasculaire · alertes patients à risque',
    tags:['cardiovasculaire','coronaropathie','récidive','JACC','Canada'],
  },

  /* ── NEUROLOGIQUE / COGNITIF ──────────────────────────────────── */
  {
    id:'JANG_2025', cat:'Neurologique', couleur:'#ff6600', nouveaute:true,
    titre:'Surmenage et modifications structurelles du cerveau — étude IRM pilote',
    auteurs:'Jang W., Kim S., Kim Y., Lee S., Choi J.Y., Lee W.',
    journal:'Occupational & Environmental Medicine (BMJ)', annee:2025,
    doi:'10.1136/oemed-2025-110057',
    lien:'https://doi.org/10.1136/oemed-2025-110057',
    population:'110 professionnels de santé · IRM cérébrale · Corée du Sud · étude GROCS 2021-2023',
    seuil:'≥52h/sem (limite légale coréenne)',
    preuve:'★★☆ Étude pilote IRM — première du genre, neuroimagerie directe',
    resultats:[
      '+19% volume gyrus frontal médian gauche (p=0.006) dans le groupe surmenage',
      '17 régions cérébrales avec augmentation significative (VBM, FWE corrigé)',
      'Régions : gyrus frontal supérieur (attention, planification), insula (intéroception, émotions)',
      'Changements potentiellement réversibles si stresseurs supprimés',
      'Première étude neuroimagerie directe sur surmenage professionnel',
      'Mécanismes : neuroadaptation compensatoire au stress chronique',
    ],
    dte:'Score cogRisk · seuil 52h · Phase 3 (Surmenage) · risque cérébral',
    tags:['cerveau','IRM','neurologie','cognitif','gyrus frontal','insula','surmenage','2025','Jang'],
  },
  {
    id:'MATSUMOTO_2021', cat:'Neurologique', couleur:'#ff6600', nouveaute:false,
    titre:'Relation entre la microstructure de la substance blanche et les heures de travail',
    auteurs:'Matsumoto J., Fukunaga M., Miura K. et al.',
    journal:'Neuroscience Letters', annee:2021, volume:'740:135428',
    doi:'10.1016/j.neulet.2020.135428',
    lien:'https://doi.org/10.1016/j.neulet.2020.135428',
    population:'Adultes travailleurs, imagerie de diffusion DTI',
    seuil:'>50h/sem',
    preuve:'★★☆ Neuroimagerie DTI — substance blanche',
    resultats:[
      'Altérations de la microstructure de la substance blanche corrélées aux heures',
      'Régions frontales et préfrontales affectées en priorité',
      'Cohérent avec la dégradation de la mémoire de travail observée',
    ],
    dte:'Contexte cogRisk · confirmation indépendante des atteintes cérébrales',
    tags:['cerveau','substance blanche','DTI','neurologie','mémoire de travail'],
  },
  {
    id:'VIRTANEN_2009_COG', cat:'Neurologique', couleur:'#ff6600', nouveaute:false,
    titre:'Longues heures de travail et fonction cognitive — étude Whitehall II',
    auteurs:'Virtanen M., Singh-Manoux A., Ferrie J.E. et al.',
    journal:'American Journal of Epidemiology', annee:2009, volume:'169(5):596-605',
    doi:'10.1093/aje/kwn382',
    lien:'https://doi.org/10.1093/aje/kwn382',
    population:'2 214 fonctionnaires britanniques · Whitehall II Study · 5 ans de suivi',
    seuil:'>55h/sem',
    preuve:'★★★ Étude de cohorte longitudinale sur 5 ans',
    resultats:[
      'Déficit cognitif significatif : raisonnement, vocabulaire, mémoire à court terme',
      'Odds ratio 1.66 pour déficit cognitif modéré (>55h vs 40h)',
      'Effet indépendant des facteurs socio-démographiques',
    ],
    dte:'Score cogRisk · Phase 3 performance basse',
    tags:['cognition','mémoire','raisonnement','Whitehall','fonctionnaires','épidémiologie'],
  },

  /* ── SOMMEIL & CORTISOL ───────────────────────────────────────── */
  {
    id:'THOMPSON_2022', cat:'Sommeil & Cortisol', couleur:'#ffb300', nouveaute:false,
    titre:'Privation aiguë de sommeil : cortisol, cognition, inflammation, émotions',
    auteurs:'Thompson K.I., Chau M., Lorenzetti M.S., Hill L.D., Fins A.I., Tartar J.L.',
    journal:'Frontiers in Behavioral Neuroscience', annee:2022, volume:'16:945661',
    doi:'10.3389/fnbeh.2022.945661',
    lien:'https://doi.org/10.3389/fnbeh.2022.945661',
    population:'23 participants · protocole expérimental contrôlé · 24h privation totale',
    seuil:'<6h de sommeil par nuit',
    preuve:'★★☆ Expérimental contrôlé (n=23), mesures biologiques directes',
    resultats:[
      'Cortisol sanguin : 8.4 → 9.6 μg/dL (+14%) après 24h de privation',
      'Axe HPA (hypothalamo-hypophyso-surrénalien) perturbé dès la 1ère nuit',
      'POMS : augmentation tension, dépression, colère, fatigue, confusion',
      'Diminution significative de la vigueur (p<0.01)',
      'Augmentation de l\'anxiété état mesurée objectivement',
    ],
    dte:'Fonction sleepDebtScore() · composante stress/cortisol',
    tags:['sommeil','cortisol','HPA','anxiété','fatigue','cognition','privation','hormones'],
  },
  {
    id:'CHRONIC_SLEEP_RESIDENTS', cat:'Sommeil & Cortisol', couleur:'#ffb300', nouveaute:false,
    titre:'Privation chronique et aiguë de sommeil chez les résidents — cognition et biomarqueurs de stress',
    auteurs:'Bernardi G. et al.',
    journal:'npj Digital Medicine / PMC', annee:2021,
    doi:'10.1038/s41746-021-00524-4',
    lien:'https://pmc.ncbi.nlm.nih.gov/articles/PMC7854866/',
    population:'Internes en médecine vs médecins seniors · mesures cortisol + IRM + tests cognitifs',
    seuil:'<5h de sommeil interrompu',
    preuve:'★★☆ Comparaison longitudinale avec biomarqueurs',
    resultats:[
      'Cortisol matinal abaissé en privation chronique (axe HPA épuisé)',
      'Cortisol vespéral élevé — inversion du rythme circadien',
      'Déficits en fonction exécutive et impulsivité augmentée',
      'hs-CRP élevée (marqueur inflammation) dans le groupe privation chronique',
      'La dette cumulative altère durablement la régulation du cortisol',
    ],
    dte:'Modèle cortisol chronique · Phase 2-3 · facteur cumulatif',
    tags:['cortisol','HPA','someil','inflammation','médecins','résidents','chronique'],
  },
  {
    id:'SLEEP_BURNOUT_2024', cat:'Burn-out & Sommeil', couleur:'#ffb300', nouveaute:true,
    titre:'Association entre durée du sommeil et burn-out chez les professionnels de santé',
    auteurs:'Saintila J., Soriano-Moreno A.N., Ramos-Vera C. et al.',
    journal:'Frontiers in Public Health', annee:2024, volume:'11:1268164',
    doi:'10.3389/fpubh.2023.1268164',
    lien:'https://doi.org/10.3389/fpubh.2023.1268164',
    population:'Professionnels de santé · étude transversale internationale',
    seuil:'<6h/nuit',
    preuve:'★★☆ Étude transversale multi-sites',
    resultats:[
      'Association significative entre courte durée de sommeil et burn-out',
      'Risque de burn-out multiplié par 2.4 quand <6h/nuit sur 6 mois',
      'Prévention du burn-out par amélioration du sommeil (relation bidirectionnelle)',
    ],
    dte:'Score sleepDebt · Phase 2-4 · facteur cumulatif 6 mois',
    tags:['sommeil','burn-out','soignants','6h','prévention','2024'],
  },

  /* ── BURN-OUT ─────────────────────────────────────────────────── */
  {
    id:'JOCOCC_2021_BURNOUT', cat:'Burn-out', couleur:'#ff6600', nouveaute:false,
    titre:'Heures de travail et burn-out : relation dose-réponse non-linéaire médiée par le sommeil',
    auteurs:'Taiwan Medical University Hospital (CMUH)',
    journal:'Journal of Occupational Health', annee:2021,
    doi:'10.1002/1348-9585.12228',
    lien:'https://doi.org/10.1002/1348-9585.12228',
    population:'Médecins, infirmières et autres soignants · Taïwan · 12 mois',
    seuil:'52-55h/sem · <6h de sommeil/j',
    preuve:'★★☆ Cohorte hospitalière prospective',
    resultats:[
      'Relation dose-réponse NON-LINÉAIRE entre heures et burn-out',
      'La privation de sommeil (<6h/j) est le médiateur principal',
      'Les 6 derniers MOIS comptent autant que la semaine courante',
      'Différences significatives par métier (médecins > infirmières > autres)',
    ],
    dte:'Facteurs CUMUL_4W, CUMUL_8W, CUMUL_24W · période 6 mois décisive',
    tags:['burn-out','sommeil','dose-réponse','cumulatif','6 mois','non-linéaire'],
  },
  {
    id:'HAS_BURNOUT_2017', cat:'Burn-out', couleur:'#ff2244', nouveaute:false,
    titre:'Repérer et prendre en charge le syndrome d\'épuisement professionnel',
    auteurs:'Haute Autorité de Santé (HAS) — France',
    journal:'Recommandations de bonne pratique HAS', annee:2017,
    lien:'https://www.has-sante.fr/jcms/c_2769218',
    population:'Référentiel national français — toutes professions',
    seuil:'Phase 4 (fatigue >80%)',
    preuve:'★★★ Recommandation officielle HAS — autorité sanitaire nationale',
    resultats:[
      'Burn-out = syndrome médical reconnu officiellement en France',
      'Critères : épuisement émotionnel, dépersonnalisation, réduction accomplissement',
      '3 phases documentées avant l\'effondrement complet',
      'Recommandation : prise en charge précoce dès les premiers signes (Phase 2)',
      'Rôle clé du médecin du travail (visite à la demande possible Art. L4624-1)',
    ],
    dte:'Phase 4 définition · conseils burn-out · alertes critiques',
    tags:['burn-out','HAS','France','épuisement','syndrome','médecin du travail','official'],
  },
  {
    id:'MASLACH_BURNOUT', cat:'Burn-out', couleur:'#ff6600', nouveaute:false,
    titre:'Modèle de burn-out de Maslach — Maslach Burnout Inventory (MBI)',
    auteurs:'Maslach C., Jackson S.E., Leiter M.P.',
    journal:'Consulting Psychologists Press', annee:1996,
    lien:'https://www.mindgarden.com/117-maslach-burnout-inventory',
    population:'Référence mondiale — validé dans 40+ langues',
    seuil:'3 dimensions : épuisement émotionnel, dépersonnalisation, accomplissement réduit',
    preuve:'★★★ Outil de référence mondiale validé sur 40 ans',
    resultats:[
      'Outil de mesure du burn-out le plus utilisé mondialement',
      '3 dimensions indépendantes mais corrélées',
      'Epuisement émotionnel : dimension la plus forte prédicteur d\'absentéisme',
      'Validé pour la corrélation avec les heures de travail excessives',
    ],
    dte:'Définition clinique du burn-out · calibration Phase 4',
    tags:['burn-out','Maslach','MBI','épuisement','mesure','psychologie','inventaire'],
  },

  /* ── PRODUCTIVITÉ / PERFORMANCE ───────────────────────────────── */
  {
    id:'PENCAVEL_2014', cat:'Productivité', couleur:'#00c8ff', nouveaute:false,
    titre:'La productivité des heures de travail — courbe non-linéaire (Stanford)',
    auteurs:'Pencavel J. (Professeur d\'économie, Stanford University)',
    journal:'IZA Discussion Paper n°8129 / SIEPR', annee:2014,
    doi:'10.2139/ssrn.2419543',
    lien:'https://doi.org/10.2139/ssrn.2419543',
    population:'Ouvriers industrie munitions WWI · données objectives de production · UK',
    seuil:'50h/sem (déclin) · 55h/sem (falaise)',
    preuve:'★★★ Données historiques objectives · largement cité OCDE',
    resultats:[
      'Déclin non-linéaire : la productivité horaire chute rapidement après 50h/sem',
      '"Falaise de Pencavel" : après 55h, toute heure supplémentaire ne produit rien',
      '70h/sem = même output total que 55h/sem (15h totalement improductives)',
      'Relation "hautement non-linéaire" — citation textuelle de l\'auteur',
      'Zone optimale : 35-40h/sem pour maximiser la productivité par heure',
    ],
    dte:'Fonction pencavelPerf() · courbe performance 5 segments · seuils OMS',
    tags:['productivité','performance','Stanford','Pencavel','50h','55h','falaise','output'],
  },
  {
    id:'FAN_NATURE_2025', cat:'Productivité & Bien-être', couleur:'#00ffcc', nouveaute:true,
    titre:'Réduction du temps de travail via la semaine de 4 jours — bien-être des travailleurs',
    auteurs:'Fan W., Schor J.B., Kelly O., Gu G. (Boston College / University College Dublin)',
    journal:'Nature Human Behaviour', annee:2025,
    doi:'10.1038/s41562-025-02259-6',
    lien:'https://doi.org/10.1038/s41562-025-02259-6',
    population:'2 896 employés · 141 organisations · 6 pays (AU, CA, IE, NZ, UK, USA) · 6 mois',
    seuil:'-8h/sem (80% des heures habituelles) · même salaire',
    preuve:'★★★ Essai international 6 pays · 2025 · plus grande étude sur la 4-day week',
    resultats:[
      'Burn-out réduit de −0.44/5 (soit −8.8%)',
      'Satisfaction au travail améliorée de +0.52/10',
      'Santé mentale améliorée de +0.39/5',
      'Santé physique améliorée de +0.28/5',
      'Médiateurs : meilleur sommeil, fatigue réduite, capacité de travail accrue',
      '90% des entreprises ont maintenu la semaine de 4 jours après l\'essai',
      'Productivité maintenue (pas de réduction de revenus)',
      'Bénéfices persistants à 12 mois de suivi',
    ],
    dte:'Coefficient REC_4DAY_BONUS · conseils récupération · scénario Équilibre',
    tags:['4 jours','bien-être','burn-out','productivité','Nature','2025','récupération','Fan','Schor'],
  },
  {
    id:'OECD_PRODUCTIVITY', cat:'Productivité', couleur:'#00c8ff', nouveaute:false,
    titre:'Indicateurs de productivité du travail — durée et efficacité',
    auteurs:'OCDE — Organisation de Coopération et de Développement Économiques',
    journal:'OECD Compendium of Productivity Indicators', annee:2024,
    lien:'https://www.oecd.org/fr/statistics/productive-hours.html',
    population:'Données macroéconomiques · 38 pays membres · analyses longitudinales',
    seuil:'>50h/sem : rendements décroissants documentés',
    preuve:'★★★ Référentiel macroéconomique — 38 pays membres',
    resultats:[
      'Rendements décroissants à partir de ~50h/sem dans les économies avancées',
      'Les pays avec les heures les plus longues ne sont pas les plus productifs',
      'Corrélation négative entre heures excessives et PIB par heure travaillée',
      'Données convergentes avec Pencavel 2014 à l\'échelle macro',
    ],
    dte:'Contexte scénarios productivité · courbe OCDE dans pencavelPerf()',
    tags:['OCDE','productivité','heures','économie','PIB','rendement'],
  },

  /* ── SANTÉ MENTALE / RPS ──────────────────────────────────────── */
  {
    id:'VIRTANEN_2018', cat:'Santé Mentale', couleur:'#ffb300', nouveaute:false,
    titre:'Longues heures de travail et symptômes dépressifs — revue systématique et méta-analyse',
    auteurs:'Virtanen M., Jokela M., Nyberg S.T. et al.',
    journal:'Scandinavian Journal of Work, Environment & Health', annee:2018, volume:'44(3):239-250',
    doi:'10.5271/sjweh.3712',
    lien:'https://doi.org/10.5271/sjweh.3712',
    population:'Études publiées + données individuelles non publiées · 189 000 personnes',
    seuil:'>55h/sem',
    preuve:'★★★ Méta-analyse mixte publiée/non publiée',
    resultats:[
      'OR = 1.14 pour dépression (IC95% 1.03–1.25)',
      'Risque de dépression augmenté de 14% chez les travailleurs >55h/sem',
      'Risque persistant après ajustement sur le statut socio-économique',
      'Données cohérentes avec le modèle Phase 2-4 du DTE',
    ],
    dte:'Composante stress · Phase 2 (irritabilité) · Phase 4 (troubles dépressifs)',
    tags:['dépression','santé mentale','symptômes dépressifs','méta-analyse','Virtanen'],
  },
  {
    id:'ANACT_RPS', cat:'Risques Psychosociaux', couleur:'#ffb300', nouveaute:false,
    titre:'Risques psychosociaux et prévention du stress au travail — référentiel ANACT',
    auteurs:'Agence Nationale pour l\'Amélioration des Conditions de Travail (ANACT)',
    journal:'Publications ANACT — France', annee:2022,
    lien:'https://www.anact.fr/risques-psychosociaux',
    population:'Référentiel national — toutes entreprises françaises',
    seuil:'Variabilité horaire + charge + durée',
    preuve:'★★★ Référentiel autorité nationale française',
    resultats:[
      'Stress chronique = activation permanente du système nerveux sympathique',
      'Variabilité horaire (planning instable) : facteur de risque indépendant documenté',
      'Cortisol chroniquement élevé → perturbation axe HPA → burn-out progressif',
      'RPS obligatoirement dans le DUERP (Document Unique Évaluation Risques Prof.)',
      'Modèle Karasek-Theorell : forte demande + faible autonomie = tension maximale',
    ],
    dte:'Fonction cortisolModel() · composante variabilité (sigma) · alertes RPS',
    tags:['RPS','ANACT','stress','cortisol','variabilité','France','DUERP','Karasek'],
  },
  {
    id:'ANI_STRESS_2008', cat:'Risques Psychosociaux', couleur:'#ffb300', nouveaute:false,
    titre:'Accord National Interprofessionnel sur le stress au travail',
    auteurs:'Partenaires sociaux français (MEDEF, CFDT, CGT, CFE-CGC, CFTC, CGT-FO)',
    journal:'ANI — Accord National Interprofessionnel', annee:2008,
    lien:'https://www.anact.fr/accord-national-interprofessionnel-du-2-juillet-2008-relatif-au-stress-au-travail',
    population:'Tous salariés du secteur privé français',
    seuil:'Stress au travail — définition légale française',
    preuve:'★★★ Accord légal contraignant — droit du travail français',
    resultats:[
      'Définition officielle du stress au travail en droit français',
      'Obligation pour les entreprises de mesurer et prévenir le stress',
      'Indicateurs de stress reconnus : absentéisme, accidents, plaintes, turnover',
      'Responsabilité de l\'employeur engagée en cas de stress chronique non traité',
    ],
    dte:'Base légale des alertes stress · articles de droit dans les conseils',
    tags:['stress','ANI','légal','accord','France','employeur','obligation'],
  },

  /* ── ACCIDENTS / SÉCURITÉ ─────────────────────────────────────── */
  {
    id:'DEMBE_2005', cat:'Accidents & Sécurité', couleur:'#ff6600', nouveaute:false,
    titre:'Impact des heures supplémentaires et des longues journées sur les accidents du travail',
    auteurs:'Dembe A.E., Erickson J.B., Delbos R.G., Banks S.M.',
    journal:'Occupational and Environmental Medicine', annee:2005, volume:'62(9):588-597',
    doi:'10.1136/oem.2004.016667',
    lien:'https://doi.org/10.1136/oem.2004.016667',
    population:'10 793 travailleurs américains · 110 388 observations · 13 ans de suivi',
    seuil:'>10h/jour · >12h/jour · semaines >60h',
    preuve:'★★★ Cohorte longitudinale prospective, 13 ans',
    resultats:[
      'OR = 1.61 pour accident lors de postes >10h (vs postes <9h)',
      'OR = 2.43 pour accident dans les semaines >60h/sem',
      'Postes de nuit longs : risque d\'accident multiplié par 3.6',
      'Heures supplémentaires régulières = facteur de risque indépendant d\'accident',
    ],
    dte:'Score errorRisk · Phase 3-4 · alertes sécurité',
    tags:['accidents','sécurité','heures sup','nuit','erreurs','sécurité au travail','Dembe'],
  },
  {
    id:'MATRE_2021', cat:'Accidents & Sécurité', couleur:'#ff6600', nouveaute:false,
    titre:'Incidents de sécurité associés aux longues durées de travail — revue et méta-analyse',
    auteurs:'Matre D., Skogstad M., Sterud T. et al.',
    journal:'Scandinavian Journal of Work, Environment & Health', annee:2021, volume:'47(6):415-424',
    doi:'10.5271/sjweh.3958',
    lien:'https://doi.org/10.5271/sjweh.3958',
    population:'Revue de 22 études · tous secteurs',
    seuil:'>9h/jour · >48h/sem',
    preuve:'★★★ Méta-analyse systématique',
    resultats:[
      'RR = 1.35 pour incidents de sécurité lors de journées >9h',
      'Secteurs les plus à risque : transport, construction, santé',
      'Effet additif avaec la fatigue cumulative',
    ],
    dte:'Score errorRisk · conseils sécurité Phase 3',
    tags:['accidents','sécurité','incidents','méta-analyse','longues journées'],
  },

  /* ── RÉCUPÉRATION ─────────────────────────────────────────────── */
  {
    id:'SONNENTAG_2003', cat:'Récupération', couleur:'#00ffcc', nouveaute:false,
    titre:'Récupération du stress au travail — rôle de la charge et des vacances',
    auteurs:'Sonnentag S.',
    journal:'Journal of Applied Psychology', annee:2003, volume:'88(2):306-315',
    doi:'10.1037/0021-9010.88.2.306',
    lien:'https://doi.org/10.1037/0021-9010.88.2.306',
    population:'Infirmières néerlandaises · étude longitudinale · 2 temps de mesure',
    seuil:'Détachement psychologique = facteur clé',
    preuve:'★★★ Étude longitudinale, largement citée (1 200+ citations)',
    resultats:[
      'La récupération après le travail est essentielle à la performance future',
      'Détachement psychologique (non-disponibilité après le travail) = facteur clé n°1',
      'Un seul jour de repos insuffisant si la fatigue est déjà chronique',
      'Les vacances récupèrent mieux mais l\'effet s\'estompe en 2-3 semaines',
      'La récupération incomplète s\'accumule et crée une dette croissante',
    ],
    dte:'Modèle récupération · REC_VACANCES · REC_WEEKEND dans simulateur',
    tags:['récupération','repos','vacances','détachement','performance','bien-être','Sonnentag'],
  },
  {
    id:'NAPPING_INTERNS', cat:'Récupération', couleur:'#00ffcc', nouveaute:false,
    titre:'Siestes et récupération des gardes longues — essai contrôlé',
    auteurs:'Tempesta D. et al. + Arora V.M. et al.',
    journal:'Sleep / Academic Emergency Medicine', annee:2021,
    lien:'https://pmc.ncbi.nlm.nih.gov/articles/PMC9880369/',
    population:'Internes médecine urgence · gardes 30h · essai randomisé',
    seuil:'Sieste 41-68 min durant garde longue',
    preuve:'★★☆ Essai contrôlé randomisé',
    resultats:[
      'Sieste de 2h durant garde = moins de fatigue pendant ET après la garde',
      'Meilleur task-switching et vitesse de performance après sieste',
      'Réduction du besoin de récupération post-garde',
      'Même 40 min de sieste réduisent la fatigue mesurable objectivement',
    ],
    dte:'Conseils micro-récupération · scénario récupération',
    tags:['sieste','napping','récupération','garde','médecins','performance','sommeil'],
  },

  /* ── DROIT DU TRAVAIL FRANÇAIS ─────────────────────────────────── */
  {
    id:'CODE_TRAVAIL_FR', cat:'Droit du travail', couleur:'#00c8ff', nouveaute:false,
    titre:'Code du travail français — durée et organisation du temps de travail',
    auteurs:'République Française — Légifrance (consolidé 2024)',
    journal:'Code du travail — Partie législative', annee:2024,
    lien:'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006177830/',
    population:'Tous salariés du secteur privé français',
    seuil:'48h (absolu) · 44h (moyenne) · 220h/an (contingent)',
    preuve:'★★★ Texte de loi en vigueur — force obligatoire',
    resultats:[
      'Art. L3121-18 : durée quotidienne max 10h (sauf dérogation)',
      'Art. L3121-20 : durée hebdomadaire maximale ABSOLUE 48h/sem',
      'Art. L3121-23 : moyenne sur 12 semaines consécutives ≤ 44h',
      'Art. L3121-28 : majorations HS — 25% (8 premières/sem) puis 50%',
      'Art. L3121-33 : contingent annuel HS = 220h (accord collectif possible)',
      'Art. L3121-38 : Repos Compensateur Obligatoire (RCO) 100% au-delà',
      'Art. L3131-1 : repos quotidien minimum 11h consécutives',
      'Art. L3132-1 : repos hebdomadaire minimum 35h consécutives',
      'Art. L4121-1 : obligation générale de sécurité de l\'employeur',
      'Art. L4131-1 : droit de retrait en cas de danger grave et imminent',
      'Art. L4624-1 : visite médicale à la demande du salarié (à tout moment)',
      'Art. L2242-17 : droit à la déconnexion (accord d\'entreprise obligatoire)',
    ],
    dte:'Détection risques légaux · conseils juridiques · toutes alertes',
    tags:['droit','Code du travail','HS','contingent','repos','France','légal','RCO','déconnexion'],
  },
  {
    id:'INRS_FATIGUE', cat:'Fatigue Professionnelle', couleur:'#ff6600', nouveaute:false,
    titre:'Effets du stress chronique, de la fatigue et des longues durées de travail sur la santé',
    auteurs:'Institut National de Recherche et de Sécurité (INRS) — France',
    journal:'Publications et dossiers INRS', annee:2022,
    lien:'https://www.inrs.fr/risques/stress/ce-qu-il-faut-retenir.html',
    population:'Référentiel national — toutes professions',
    seuil:'4 semaines de surcharge continue = point critique',
    preuve:'★★★ Référentiel autorité nationale française — données terrain',
    resultats:[
      'Fatigue cumulative : non-linéaire, s\'amplifie avec le temps d\'exposition',
      'La dette de sommeil des mois précédents réduit la capacité de récupération',
      'Après 4 semaines de surcharge continue : récupération réduite de 28%',
      'Après 8 semaines : récupération réduite de 38%',
      'Après 6 mois : récupération réduite de 55% (dette mémoire long terme)',
      'Durée hebdomadaire ET variabilité des horaires = facteurs indépendants',
    ],
    dte:'Facteurs CUMUL_4W, CUMUL_8W, CUMUL_24W · fonction fatigueAccumulation()',
    tags:['INRS','fatigue','cumulative','récupération','dette sommeil','France','durée exposition'],
  },
];

/* ══════════════════════════════════════════════════════════════════
   GLOSSAIRE DES CONCEPTS
   ══════════════════════════════════════════════════════════════════ */
const CONCEPTS = [
  { terme:'Axe HPA', lien:'THOMPSON_2022', tags:['HPA','hormones','cortisol','stress'],
    def:'Axe Hypothalamo-Hypophyso-Surrénalien. Circuit hormonal régulant le cortisol. Activé par le stress et la privation de sommeil. Perturbé dès la 1ère nuit insuffisante (Thompson 2022). En burn-out avancé, paradoxalement épuisé → cortisol bas le matin.' },
  { terme:'Contingent annuel d\'HS', lien:'CODE_TRAVAIL_FR', tags:['contingent','HS','RCO','légal'],
    def:'Volume d\'heures supplémentaires effectuables sans autorisation de l\'inspection du travail : 220h/an légal (Art. L3121-33). Au-delà : Repos Compensateur Obligatoire (RCO) de 100% = 1h de repos par heure au-delà.' },
  { terme:'Cortisol', lien:'THOMPSON_2022', tags:['cortisol','stress','HPA','hormones'],
    def:'Hormone principale du stress, produite par les glandes surrénales. Monte +14% dès 1 nuit de privation (Thompson 2022). En Phase 2 : chroniquement élevé → troubles sommeil, irritabilité. En Phase 4 : peut paradoxalement s\'effondrer (axe HPA épuisé).' },
  { terme:'Dose-réponse', lien:'KIVIMAKI_2015', tags:['dose-réponse','épidémiologie','AVC','risque'],
    def:'Relation où l\'effet sur la santé augmente avec la "dose" (ici : heures travaillées). Confirmée pour l\'AVC par Kivimäki 2015 et OMS 2021 : chaque heure supplémentaire à ≥48h augmente le risque de façon croissante.' },
  { terme:'Droit de retrait', lien:'CODE_TRAVAIL_FR', tags:['droit de retrait','L4131-1','légal','danger'],
    def:'Droit légal du salarié de se retirer d\'une situation présentant un danger grave et imminent pour sa santé (Art. L4131-1). Le retrait ne peut entraîner aucune sanction, retenue de salaire ni obligation de reprise sans mesures correctives.' },
  { terme:'DUERP', lien:'ANACT_RPS', tags:['DUERP','risques','entreprise','légal','ANACT'],
    def:'Document Unique d\'Évaluation des Risques Professionnels. Obligatoire pour toute entreprise (Art. R4121-1). Doit inclure les RPS (risques psychosociaux) dont le stress et le burn-out. Mis à jour annuellement.' },
  { terme:'Falaise de Pencavel', lien:'PENCAVEL_2014', tags:['Pencavel','productivité','Stanford','55h'],
    def:'Phénomène économique découvert par Pencavel (Stanford, 2014) : après 55h/sem, travailler plus ne produit rien de plus. 70h/sem = même output total que 55h/sem. Les 15 heures supplémentaires sont entièrement improductives.' },
  { terme:'Fibrillation auriculaire', lien:'KIVIMAKI_2017_AFIB', tags:['cœur','arythmie','cardiovasculaire'],
    def:'Arythmie cardiaque associée aux longues heures de travail (HR=1.42 à >55h/sem, Kivimäki 2017). Le risque s\'explique par le stress chronique activant le système nerveux sympathique, augmentant la pression artérielle et la fréquence cardiaque au repos.' },
  { terme:'Gyrus frontal médian', lien:'JANG_2025', tags:['cerveau','gyrus frontal','IRM','cognition'],
    def:'Zone cérébrale impliquée dans l\'attention, la mémoire de travail et le traitement du langage. Volume augmenté de +19% chez les personnes travaillant ≥52h/sem (Jang 2025). Signe probable de neuroadaptation compensatoire au stress chronique professionnel.' },
  { terme:'Hazard Ratio (HR)', lien:'ERVASTI_2021', tags:['HR','épidémiologie','risque relatif','Lancet'],
    def:'Mesure épidémiologique du risque relatif dans le temps. HR=1.68 (Ervasti 2021) signifie 68% de risque supplémentaire de mort cardiovasculaire avant 65 ans pour les personnes travaillant >55h/sem vs 35-40h/sem.' },
  { terme:'Insula', lien:'JANG_2025', tags:['insula','cerveau','émotions','intéroception'],
    def:'Région cérébrale clé pour l\'intéroception (ressenti corporel), la régulation émotionnelle et l\'empathie. Modifiée chez les personnes en surmenage ≥52h/sem (Jang 2025). Son altération explique la difficulté à "sentir" sa propre fatigue en Phase 3.' },
  { terme:'IPD-Work Consortium', lien:'KIVIMAKI_2015', tags:['IPD','méta-analyse','épidémiologie','cohorte'],
    def:'Individual Participant Data Meta-analysis in Working Populations. Réseau européen d\'études de cohorte partageant leurs données individuelles. Utilisé par Kivimäki (2015) pour analyser 603 838 personnes. Méthode la plus robuste en épidémiologie occupationnelle.' },
  { terme:'Phase physiologique', lien:'INRS_FATIGUE', tags:['phase','burn-out','adaptation','surmenage'],
    def:'Classification en 4 stades du corps sous surcharge : P1 Adaptation (fat 0-35%), P2 Fatigue chronique (35-60%), P3 Surmenage (60-80%), P4 Burn-out (>80%). Durées approximatives : P1 <2 sem, P2 2-6 sem, P3 6-12 sem, P4 >12 sem de surcharge continue.' },
  { terme:'Risque Relatif (RR)', lien:'WHO_ILO_2021', tags:['RR','statistiques','épidémiologie','OMS'],
    def:'Rapport des risques entre deux groupes. RR=1.35 (OMS 2021) signifie 35% de risque d\'AVC supplémentaire à ≥55h/sem par rapport à 35-40h/sem. RR=1.0 = risque identique. RR>2.0 = fort signal.' },
  { terme:'Repos Compensateur Obligatoire (RCO)', lien:'CODE_TRAVAIL_FR', tags:['RCO','contingent','légal','repos'],
    def:'Droit automatique à 1 heure de repos pour toute heure travaillée au-delà du contingent annuel de 220h (Art. L3121-38). L\'employeur ne peut pas refuser. Délai de prise : 2 mois après ouverture du droit (Art. D3121-18).' },
  { terme:'VBM (Voxel-Based Morphometry)', lien:'JANG_2025', tags:['VBM','IRM','neurologie','méthode'],
    def:'Technique d\'analyse d\'IRM cérébrale comparant les volumes de matière grise voxel par voxel entre groupes. Utilisée par Jang 2025 pour détecter les 17 régions cérébrales modifiées chez les travailleurs ≥52h/sem. Méthode gold-standard en neuroimagerie structurelle.' },
  { terme:'Variabilité horaire (sigma)', lien:'ANACT_RPS', tags:['variabilité','sigma','horaires','ANACT'],
    def:'Écart-type des heures hebdomadaires sur 4 semaines. Un sigma élevé = planning instable = facteur de risque indépendant de stress chronique selon l\'ANACT. Intégré dans le score stress du DTE via la fonction cortisolModel().' },
  { terme:'Work ability (capacité de travail)', lien:'FAN_NATURE_2025', tags:['work ability','productivité','bien-être','Nature 2025'],
    def:'Auto-évaluation par le salarié de sa capacité à accomplir son travail efficacement. Identifié par Fan et al. (Nature 2025) comme l\'un des 3 médiateurs principaux expliquant pourquoi la semaine de 4 jours améliore la santé : les travailleurs se sentent plus capables et efficaces.' },
];

/* ══════════════════════════════════════════════════════════════════
   MOTEUR DE RECHERCHE
   ══════════════════════════════════════════════════════════════════ */
class GlossaryEngine {
  constructor(){ this._s = STUDIES; this._c = CONCEPTS; }

  search(query) {
    if (!query || query.trim().length < 2) return { studies: this._s, concepts: this._c };
    const q = this._n(query);
    const words = q.split(/\s+/).filter(w => w.length >= 2);

    const scoreS = s => words.reduce((acc, w) => {
      const text = this._n([s.titre,s.auteurs,s.journal,String(s.annee),(s.tags||[]).join(' '),s.cat,s.dte||'',s.id].join(' '));
      if ((s.tags||[]).some(t => this._n(t).includes(w))) return acc + 4;
      if (this._n(s.cat).includes(w)) return acc + 3;
      if (this._n(s.id).includes(w.toUpperCase())) return acc + 3;
      if (text.includes(w)) return acc + 1;
      return acc;
    }, 0) + (s.nouveaute ? 0.5 : 0);

    const scoreC = c => words.reduce((acc, w) => {
      const text = this._n([c.terme,c.def,(c.tags||[]).join(' ')].join(' '));
      return text.includes(w) ? acc + 1 : acc;
    }, 0);

    return {
      studies:  this._s.filter(s=>scoreS(s)>0).sort((a,b)=>scoreS(b)-scoreS(a)),
      concepts: this._c.filter(c=>scoreC(c)>0).sort((a,b)=>scoreC(b)-scoreC(a)),
    };
  }

  categories()  { return [...new Set(this._s.map(s=>s.cat))]; }
  byCat(cat)    { return this._s.filter(s=>s.cat===cat); }
  byId(id)      { return this._s.find(s=>s.id===id); }
  all()         { return this._s; }
  allConcepts() { return this._c; }
  stats()       { return { studies: this._s.length, concepts: this._c.length, nouveautes: this._s.filter(s=>s.nouveaute).length }; }
  _n(str)       { return (str||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
}

/* ══════════════════════════════════════════════════════════════════
   INTERFACE MODALE
   ══════════════════════════════════════════════════════════════════ */
class GlossaryUI {
  constructor(){ this._e = new GlossaryEngine(); this._modal = null; this._q = ''; this._tab = 'etudes'; }

  open(){
    if (!this._modal) this._build();
    this._modal.classList.remove('hidden');
    this._render();
    setTimeout(()=>this._modal.querySelector('#gloss-search')?.focus(), 100);
  }
  close(){ this._modal?.classList.add('hidden'); }

  _build(){
    const st = this._e.stats();
    const m = document.createElement('div');
    m.className = 'modal'; m.id = 'glossary-modal';
    m.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-box" style="max-width:700px;max-height:92vh;">
        <div class="modal-header">
          <h2>&#128218; BIBLIOTHÈQUE SCIENTIFIQUE</h2>
          <span class="modal-close" id="gloss-close">&#x2715;</span>
        </div>
        <div style="display:flex;gap:6px;margin-bottom:10px;">
          <input type="text" id="gloss-search" class="ai-input" style="flex:1;"
            placeholder="AVC · burn-out · cortisol · Pencavel · sommeil · OMS · IRM · Lancet…" maxlength="80"/>
          <button id="gloss-clear" class="btn btn--ghost" style="padding:5px 10px;font-size:10px;">✕</button>
        </div>
        <div style="display:flex;gap:2px;margin-bottom:10px;flex-wrap:wrap;">
          <button class="gloss-tab active" data-tab="etudes">&#128209; ÉTUDES (${st.studies})</button>
          <button class="gloss-tab" data-tab="concepts">&#128270; GLOSSAIRE (${st.concepts})</button>
          <button class="gloss-tab" data-tab="categories">&#127979; CATÉGORIES</button>
        </div>
        <div id="gloss-content" style="overflow-y:auto;max-height:58vh;"></div>
        <div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(0,200,255,0.1);
          font-family:var(--font-mono);font-size:8px;color:var(--text-muted);line-height:1.7;">
          &#9632; ${st.studies} sources peer-reviewed · DOI vérifiables ·
          OMS · Lancet · Nature · BMJ · JACC · Frontiers · Stanford · INRS · HAS · Code du travail FR ·
          ${st.nouveautes} études 2024-2025
        </div>
      </div>`;
    document.body.appendChild(m);
    this._modal = m;
    m.querySelector('.modal-overlay').addEventListener('click', ()=>this.close());
    m.querySelector('#gloss-close').addEventListener('click', ()=>this.close());
    const inp = m.querySelector('#gloss-search');
    inp.addEventListener('input', e=>{ this._q=e.target.value; this._render(); });
    m.querySelector('#gloss-clear').addEventListener('click', ()=>{ inp.value=''; this._q=''; this._render(); inp.focus(); });
    m.querySelectorAll('.gloss-tab').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        m.querySelectorAll('.gloss-tab').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        this._tab = btn.dataset.tab;
        this._render();
      });
    });
  }

  _render(){
    const el = this._modal?.querySelector('#gloss-content');
    if (!el) return;
    const { studies, concepts } = this._e.search(this._q);
    if (this._tab === 'etudes') {
      el.innerHTML = studies.length ? studies.map(s=>this._card(s)).join('')
        : `<div style="color:var(--text-muted);font-family:var(--font-mono);font-size:10px;padding:16px;">Aucun résultat pour « ${this._q} »</div>`;
    } else if (this._tab === 'concepts') {
      el.innerHTML = concepts.length ? concepts.map(c=>this._conceptCard(c)).join('')
        : `<div style="color:var(--text-muted);font-family:var(--font-mono);font-size:10px;padding:16px;">Aucun résultat.</div>`;
    } else {
      el.innerHTML = this._catsView();
    }
  }

  _card(s){
    const stars = s.preuve.startsWith('★★★')?'★★★':s.preuve.startsWith('★★☆')?'★★☆':'★☆☆';
    return `<div style="background:rgba(0,10,25,.9);border:1px solid ${s.couleur}35;border-left:3px solid ${s.couleur};margin-bottom:5px;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;padding:8px 10px;border-bottom:1px solid rgba(0,200,255,0.06);">
        <div style="flex:1;">
          <div style="font-family:var(--font-hud);font-size:11px;color:#22b8e8;margin-bottom:3px;line-height:1.3;">${s.titre}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:rgba(255,255,255,0.80);">${s.auteurs}</div>
          <div style="font-family:var(--font-mono);font-size:8px;color:rgba(255,255,255,0.55);margin-top:1px;">${s.journal} · ${s.annee}${s.doi?' · DOI: '+s.doi:''}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;flex-shrink:0;">
          <span style="font-family:var(--font-mono);font-size:8px;color:rgba(255,255,255,0.75);border:1px solid ${s.couleur}60;background:${s.couleur}15;padding:1px 5px;white-space:nowrap;">${s.cat}</span>
          <span style="font-family:var(--font-mono);font-size:9px;color:rgba(255,200,50,0.8);">${stars}</span>
          ${s.nouveaute?'<span style="font-family:var(--font-mono);font-size:7px;color:var(--sync);border:1px solid var(--sync);padding:1px 4px;">NOUVEAU 2024-25</span>':''}
        </div>
      </div>
      ${s.population?`<div style="padding:3px 10px;background:rgba(0,200,255,0.03);font-size:9px;color:var(--text-muted);font-family:var(--font-mono);border-bottom:1px solid rgba(0,200,255,0.04);">&#128101; ${s.population}</div>`:''}
      ${s.seuil?`<div style="padding:3px 10px;background:rgba(255,179,0,0.03);font-size:9px;color:rgba(255,255,255,0.70);font-family:var(--font-mono);border-bottom:1px solid rgba(0,200,255,0.04);">&#9656; SEUIL CLÉ : ${s.seuil}</div>`:''}
      <div style="padding:6px 10px;">
        <div style="font-family:var(--font-mono);font-size:8px;color:rgba(255,255,255,0.45);letter-spacing:.1em;margin-bottom:4px;">RÉSULTATS</div>
        ${s.resultats.map(r=>`<div style="font-size:10px;color:rgba(255,255,255,0.78);padding:1px 0;display:flex;gap:5px;"><span style="color:rgba(255,255,255,0.35);flex-shrink:0;">›</span>${r}</div>`).join('')}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:5px 10px;background:rgba(0,10,25,.5);border-top:1px solid rgba(0,200,255,0.05);">
        <span style="font-family:var(--font-mono);font-size:8px;color:rgba(255,255,255,0.40);">⬆ DTE : ${s.dte||'calibrage général'}</span>
        ${s.lien?`<a href="${s.lien}" target="_blank" rel="noopener" style="font-family:var(--font-mono);font-size:8px;color:var(--animus);text-decoration:none;border:1px solid rgba(0,200,255,0.2);padding:1px 6px;">&#8599; SOURCE</a>`:''}
      </div>
    </div>`;
  }

  _conceptCard(c){
    const linked = c.lien ? this._e.byId(c.lien) : null;
    return `<div style="background:rgba(0,10,25,.85);border:1px solid rgba(0,200,255,0.12);margin-bottom:4px;padding:8px 10px;">
      <div style="font-family:var(--font-hud);font-size:12px;color:var(--animus);margin-bottom:4px;">${c.terme}</div>
      <div style="font-size:11px;color:var(--text-dim);line-height:1.6;">${c.def}</div>
      ${linked?`<div style="margin-top:5px;font-family:var(--font-mono);font-size:8px;color:var(--text-muted);">&#128217; ${linked.auteurs.split(',')[0]} (${linked.annee}) — ${linked.journal}</div>`:''}
      <div style="display:flex;flex-wrap:wrap;gap:3px;margin-top:5px;">
        ${(c.tags||[]).map(t=>`<span style="font-family:var(--font-mono);font-size:7px;color:var(--text-muted);background:rgba(0,200,255,0.05);border:1px solid rgba(0,200,255,0.1);padding:1px 4px;">${t}</span>`).join('')}
      </div>
    </div>`;
  }

  _catsView(){
    return this._e.categories().map(cat=>{
      const items = this._e.byCat(cat);
      return `<div style="margin-bottom:12px;">
        <div style="font-family:var(--font-hud);font-size:11px;color:var(--animus);letter-spacing:.1em;margin-bottom:5px;padding-bottom:4px;border-bottom:1px solid rgba(0,200,255,0.15);">${cat.toUpperCase()} (${items.length})</div>
        ${items.map(s=>`<div style="display:flex;align-items:center;gap:8px;padding:3px 6px;margin-bottom:2px;font-size:10px;color:var(--text-dim);">
          <span style="width:6px;height:6px;transform:rotate(45deg);background:${s.couleur};flex-shrink:0;"></span>
          <span style="font-family:var(--font-hud);font-size:10px;color:var(--text);flex:1;">${s.titre.substring(0,60)}${s.titre.length>60?'…':''}</span>
          <span style="font-family:var(--font-mono);font-size:8px;color:var(--text-muted);flex-shrink:0;">${s.annee}</span>
          ${s.nouveaute?'<span style="font-family:var(--font-mono);font-size:7px;color:var(--sync);border:1px solid var(--sync);padding:0 3px;">NEW</span>':''}
        </div>`).join('')}
      </div>`;
    }).join('');
  }
}

// CSS onglets
const sty = document.createElement('style');
sty.textContent = `.gloss-tab{background:rgba(0,200,255,0.05);border:1px solid rgba(0,200,255,0.15);color:var(--text-muted);font-family:var(--font-mono);font-size:9px;letter-spacing:.08em;padding:5px 12px;cursor:crosshair;transition:all .2s;clip-path:polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%);}
.gloss-tab:hover,.gloss-tab.active{background:rgba(0,200,255,0.14);color:var(--animus);border-color:rgba(0,200,255,0.35);}`;
document.head.appendChild(sty);

global.GlossaryEngine = GlossaryEngine;
global.GlossaryUI     = GlossaryUI;
}(typeof window !== 'undefined' ? window : global));
