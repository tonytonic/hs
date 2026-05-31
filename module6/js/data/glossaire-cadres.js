/**
 * GLOSSAIRE M6 — Cadres, Forfait & Droit du travail
 * 60+ termes : Forfait Jours · Forfait Heures · Cadres Dirigeants
 *              RTT · Entretien annuel · Santé au travail · CCN
 */
'use strict';

(function(global) {

const M6_GLOSSAIRE = [

  // ══════════════════════════════════════════════════════════════
  //  FORFAIT JOURS
  // ══════════════════════════════════════════════════════════════
  {
    terme: 'Forfait en jours',
    art: 'Art. L3121-58 à L3121-65',
    def: 'Modalité de décompte du temps de travail applicable à certains cadres et salariés autonomes : la durée est mesurée en journées ou demi-journées (souvent 218/an), non en heures. Cela ne signifie pas une durée illimitée — des garde-fous légaux s\'appliquent.',
    exemple: '218 jours de travail/an. Le reste = samedis + dimanches + congés payés + RTT + jours fériés.',
    tags: ['forfait', 'jours', 'cadres', 'autonomie']
  },
  {
    terme: 'Plafond légal (218 jours)',
    art: 'Art. L3121-64',
    def: 'Le nombre maximum de jours travaillés par an dans le cadre d\'un forfait est de 218 jours (hors jours de congés payés légaux et jours fériés chômés). Votre CCN ou accord d\'entreprise peut prévoir un plafond inférieur.',
    exemple: 'Syntec : 218 jours. Banque AFB : 205 jours (accord de branche plus favorable).',
    tags: ['forfait', '218', 'plafond', 'légal']
  },
  {
    terme: 'RTT — Réduction du Temps de Travail',
    art: 'Art. L3121-64 + CCN applicable',
    def: 'Jours de repos supplémentaires générés par le mécanisme du forfait jours. Formule : 365/366 − WE − CP (25j) − fériés ouvrés − plafond = RTT annuels. Ces jours compensent l\'absence de compteur d\'heures.',
    exemple: '2026 : 365 − 105 WE − 25 CP − 8 fériés − 218 jours = 9 RTT.',
    tags: ['RTT', 'réduction', 'jours', 'repos']
  },
  {
    terme: 'JRTT — Jours de RTT',
    art: 'CCN applicable',
    def: 'Appellation alternative des RTT dans certaines conventions collectives. Synonyme exact. Le solde JRTT = RTT théoriques − RTT effectivement pris.',
    exemple: 'Fiche de paie : Solde JRTT = 6 (sur 9 théoriques, 3 déjà pris).',
    tags: ['JRTT', 'RTT', 'solde']
  },
  {
    terme: 'Demi-journée',
    art: 'Art. L3121-65',
    def: 'Le forfait jours peut être décompté en journées complètes ou demi-journées. Une demi-journée = 0.5 jour sur le forfait. Utile pour les rendez-vous médicaux, formations courtes ou départ anticipé.',
    exemple: 'Départ à 13h = demi-journée posée = 0.5 jour débité sur le forfait.',
    tags: ['demi-journée', 'forfait', 'décompte']
  },
  {
    terme: 'Rachat de jours (forfait)',
    art: 'Art. L3121-59',
    def: 'Possibilité de travailler au-delà du plafond annuel par avenant écrit, avec majoration de salaire minimum 10%. Le nombre de jours rachetables et le taux exact peuvent être fixés par accord d\'entreprise ou de branche.',
    exemple: 'Avenant : 5 jours supplémentaires à 120% du taux journalier. Obligatoirement formalisé par écrit.',
    tags: ['rachat', 'avenant', 'dépassement', '10%']
  },
  {
    terme: 'Entretien annuel de suivi',
    art: 'Art. L3121-65',
    def: 'Obligation annuelle pour l\'employeur d\'organiser un entretien individuel portant sur : la charge de travail, l\'articulation vie professionnelle/personnelle, la rémunération, et l\'organisation du travail. L\'absence de cet entretien peut entraîner la nullité de la convention de forfait.',
    exemple: 'Chaque année à la date anniversaire : bilan formel avec votre manager ou RRH, trace écrite obligatoire.',
    tags: ['entretien', 'annuel', 'L3121-65', 'charge', 'travail']
  },
  {
    terme: 'Nullité du forfait',
    art: 'Cass. Soc. 29 juin 2011 + art. L3121-65',
    def: 'La convention de forfait jours peut être frappée de nullité si : l\'accord collectif autorisant le forfait ne garantit pas le respect des durées maximales de repos et de travail, ou si l\'employeur n\'organise pas l\'entretien annuel obligatoire. En cas de nullité, le salarié bénéficie du régime des heures supplémentaires classiques.',
    exemple: 'Arrêt Cass. Soc. 2011 : forfait nul → toutes les heures au-delà de 35h = HS majorées rétroactivement.',
    tags: ['nullité', 'forfait', 'jurisprudence', 'Cass.Soc.']
  },
  {
    terme: 'Droit à la déconnexion',
    art: 'Art. L3121-62 + Accord collectif',
    def: 'Droit du salarié à ne pas être joignable et à ne pas se connecter aux outils numériques professionnels en dehors du temps de travail. Depuis la loi Travail 2017, l\'employeur doit prévoir des modalités concrètes dans l\'accord collectif ou la charte unilatérale.',
    exemple: 'Charte d\'entreprise : pas de mails après 20h ni le week-end, pas de réponse exigée avant 8h.',
    tags: ['déconnexion', 'numérique', 'repos', 'vie personnelle']
  },
  {
    terme: 'Cadre autonome',
    art: 'Art. L3121-58',
    def: 'Condition préalable au forfait jours : le cadre doit disposer d\'une réelle autonomie dans l\'organisation de son emploi du temps. S\'il a des horaires imposés ou un pointage obligatoire, il ne peut pas être en forfait jours — il relève du droit commun.',
    exemple: 'Cadre R&D qui gère son agenda = autonomie réelle ✓. Technicien avec planning imposé = forfait jours invalide.',
    tags: ['autonomie', 'cadre', 'condition', 'organisation']
  },

  // ══════════════════════════════════════════════════════════════
  //  FORFAIT HEURES
  // ══════════════════════════════════════════════════════════════
  {
    terme: 'Forfait en heures',
    art: 'Art. L3121-55 à L3121-57',
    def: 'Convention individuelle fixant une durée de travail hebdomadaire, mensuelle ou annuelle incluant des heures supplémentaires pré-intégrées dans la rémunération. Exemple classique : 39h/semaine avec 4h HS intégrées à 25% dans le salaire mensuel.',
    exemple: 'Cadre confirmé : salaire = base 35h + 4h HS intégrées à 25% = forfait 39h/semaine.',
    tags: ['forfait', 'heures', 'HS intégrées', 'mensuel']
  },
  {
    terme: 'Heures supplémentaires (cadres)',
    art: 'Art. L3121-28 à L3121-36',
    def: 'Heures effectuées au-delà de la durée prévue dans la convention de forfait heures, ou au-delà de 35h si le forfait est sur 35h. Soumises aux majorations légales : 25% pour les 8 premières heures, 50% au-delà.',
    exemple: 'Forfait 39h : HS = heures réelles − 39h. Une semaine à 42h = 3h HS à 25%.',
    tags: ['heures supplémentaires', 'forfait heures', 'majoration']
  },
  {
    terme: 'Contingent annuel d\'HS (cadres)',
    art: 'Art. L3121-33 + CCN',
    def: 'Volume maximal d\'heures supplémentaires autorisées sur l\'année sans accord du CSE. Au-delà, chaque heure requiert l\'avis du CSE et génère une contrepartie obligatoire en repos (COR). Pour les cadres, la CCN peut prévoir un contingent différent du droit commun (220h).',
    exemple: 'Syntec : contingent HS cadres non-forfait = 220h/an. Banque : 200h.',
    tags: ['contingent', 'HS', 'CSE', 'COR', 'annuel']
  },
  {
    terme: 'Exonération fiscale HS (TEPA)',
    art: 'Art. L241-17 CSS + Loi 2007-1223 + Loi 2022-1158',
    def: 'Depuis la loi TEPA 2007, les heures supplémentaires et complémentaires bénéficient d\'une exonération d\'impôt sur le revenu (plafond 7 500 €/an depuis 2019) et d\'une réduction de cotisations salariales. Applicable aux cadres en forfait heures.',
    exemple: '500h × 25€ × 25% = 3 125 € de HS → exonérées d\'IR dans la limite de 7 500 €.',
    tags: ['TEPA', 'exonération', 'impôt', 'HS', 'fiscalité']
  },
  {
    terme: 'Heures supplémentaires structurelles',
    art: 'Art. L3121-55 + Cass.Soc.',
    def: 'Heures supplémentaires régulièrement effectuées chaque semaine et intégrées dans la rémunération forfaitaire. Leur volume doit être mentionné explicitement dans le contrat. Si l\'employeur ne peut pas prouver que le forfait couvre les heures réellement faites, le salarié peut réclamer le paiement des heures supplémentaires non couvertes.',
    exemple: 'Contrat : "La rémunération intègre 4h HS hebdomadaires." → Les heures au-delà de 39h sont des HS supplémentaires payables.',
    tags: ['HS structurelles', 'forfait', 'rémunération', 'contrat']
  },

  // ══════════════════════════════════════════════════════════════
  //  CADRES DIRIGEANTS
  // ══════════════════════════════════════════════════════════════
  {
    terme: 'Cadre dirigeant',
    art: 'Art. L3111-2',
    def: 'Salarié ayant des responsabilités importantes impliquant une grande indépendance dans l\'organisation de son emploi du temps, habilité à prendre des décisions de façon largement autonome, et dont la rémunération se situe dans les niveaux les plus élevés des systèmes de rémunération pratiqués dans l\'entreprise.',
    exemple: 'DG, DAF, DRH de grande entreprise. Pas les simples chefs de service ou managers de proximité.',
    tags: ['cadre dirigeant', 'L3111-2', 'autonomie', 'dirigeant']
  },
  {
    terme: 'Droits maintenus (cadre dirigeant)',
    art: 'Art. L3111-2 + Code du travail',
    def: 'Le cadre dirigeant n\'est pas soumis aux dispositions sur la durée du travail (pas de 35h, pas d\'HS, pas de repos légaux imposés). Mais il conserve ses droits à congés payés, à la protection contre le licenciement, aux congés spéciaux (maternité, paternité), et à la médecine du travail.',
    exemple: 'DG : pas de compteur d\'heures, mais 25 jours de CP légaux + jours fériés + protection harcèlement.',
    tags: ['dirigeant', 'droits', 'congés', 'protection']
  },

  // ══════════════════════════════════════════════════════════════
  //  GARDE-FOUS LÉGAUX (applicables aux forfaits)
  // ══════════════════════════════════════════════════════════════
  {
    terme: 'Repos quotidien (11h)',
    art: 'Art. L3131-1',
    def: 'Tout salarié, y compris en forfait jours, doit bénéficier d\'un repos quotidien minimum de 11 heures consécutives. Ce repos s\'impose même si le salarié est autonome dans l\'organisation de son temps. La violation expose l\'employeur à des dommages-intérêts.',
    exemple: 'Fin de réunion à 22h → début de journée suivante impossible avant 9h. Email professionnel à 23h = violation potentielle si réponse exigée.',
    tags: ['repos quotidien', '11h', 'L3131-1', 'garde-fou']
  },
  {
    terme: 'Repos hebdomadaire (35h)',
    art: 'Art. L3132-2',
    def: 'Minimum de 35 heures consécutives de repos par semaine, généralement du samedi soir au lundi matin. Applicable aux cadres en forfait jours. Travailler le week-end sans ce repos minimal expose l\'employeur à une sanction.',
    exemple: 'Travail le samedi + le dimanche → violation du repos hebdomadaire sauf exception sectorielle.',
    tags: ['repos hebdomadaire', '35h', 'L3132-2', 'weekend']
  },
  {
    terme: 'Amplitude journalière (13h max)',
    art: 'Art. L3131-1 (a contrario) + jurisprudence',
    def: 'Conséquence du repos quotidien de 11h : l\'amplitude maximale d\'une journée de travail est de 13h (24h − 11h). Pour les cadres en forfait jours, il n\'y a pas de limite d\'heures quotidiennes mais le repos de 11h est obligatoire.',
    exemple: 'Début à 8h + réunion jusqu\'à 23h = amplitude 15h → violation du repos 11h si reprise à 8h le lendemain.',
    tags: ['amplitude', '13h', 'journée', 'repos quotidien']
  },
  {
    terme: 'Charge raisonnable de travail',
    art: 'Art. L3121-65 + L4121-1',
    def: 'L\'employeur est légalement tenu de veiller à ce que la charge de travail du cadre en forfait jours soit raisonnable, adaptée à ses compétences et compatible avec une bonne santé. Le suivi via l\'entretien annuel est l\'outil principal. En cas de charge excessive documentée, le salarié peut saisir les prud\'hommes.',
    exemple: 'Salarié démontrant un email reçu à 2h du matin tous les jours + 260 jours travaillés = charge déraisonnable → dommages-intérêts.',
    tags: ['charge', 'raisonnable', 'santé', 'employeur', 'obligation']
  },

  // ══════════════════════════════════════════════════════════════
  //  CCN CADRES PRINCIPALES
  // ══════════════════════════════════════════════════════════════
  {
    terme: 'Syntec (IDCC 787)',
    art: 'CCN Syntec — Avenant 1999 + Avenants successifs',
    def: 'Convention collective des ingénieurs et cadres du secteur informatique, ingénierie, conseil et études techniques. Prévoit 3 modalités de durée du travail : Modalité 1 (horaires normaux), Modalité 2 (réalisation de missions — 218j/an), Modalité 3 (autonomie totale). Forfait jours très répandu.',
    exemple: 'Ingénieur logiciel senior → Modalité 2 (forfait jours 218j). Chef de projet → souvent Modalité 3.',
    tags: ['Syntec', 'IDCC 787', 'informatique', 'ingénierie', 'forfait jours']
  },
  {
    terme: 'Banque (AFB — IDCC 675)',
    art: 'CCN AFB — Accord 2000 + Avenants',
    def: 'Convention collective de la Banque (Association Française des Banques). Forfait jours cadres prévu à 205 jours/an (plus favorable que le légal). Nombreux avantages spécifiques : jours enfant malade, prime d\'ancienneté, 13e mois.',
    exemple: 'Chargé de clientèle cadre : 205 jours forfait + 14 RTT environ + avantages bancaires.',
    tags: ['banque', 'AFB', 'IDCC 675', '205 jours', 'forfait jours']
  },
  {
    terme: 'SYNTEC — Modalités 1/2/3',
    art: 'Avenant SYNTEC 22 juin 1999',
    def: 'Modalité 1 : durée normale (35h, HS classiques). Modalité 2 : missions (forfait 218j/an, cadres avec autonomie partielle). Modalité 3 : autonomie complète (forfait sans référence horaire — validité jurisprudentielle fragile). La Cass. a plusieurs fois remis en question la Modalité 3.',
    exemple: 'SSII : la quasi-totalité des ingénieurs seniors sont en Modalité 2 (218j). Directeurs en Modalité 3.',
    tags: ['Syntec', 'modalité', '1', '2', '3', 'forfait']
  },

  // ══════════════════════════════════════════════════════════════
  //  SANTÉ AU TRAVAIL (cadres)
  // ══════════════════════════════════════════════════════════════
  {
    terme: 'Burn-out (épuisement professionnel)',
    art: 'Art. L4121-1 + INRS',
    def: 'Syndrome d\'épuisement professionnel caractérisé par : épuisement émotionnel, dépersonnalisation (cynisme), perte du sentiment d\'accomplissement. L\'employeur a une obligation légale de prévention. Le burn-out est reconnu comme maladie professionnelle depuis 2015 sous conditions.',
    exemple: 'Cadre travaillant 240j/an avec entretiens annuels manqués + charge excessive → burn-out documenté = faute inexcusable potentielle de l\'employeur.',
    tags: ['burn-out', 'épuisement', 'santé', 'prévention', 'maladie professionnelle']
  },
  {
    terme: 'Risque cardiovasculaire lié au travail',
    art: 'OMS/OIT 2021 — Pega F. + Kivimäki M. 2015',
    def: 'Travailler ≥ 55h/semaine augmente le risque d\'AVC de 35% (RR=1.35) et de cardiopathie ischémique de 17% (RR=1.17). Effet dose-temps : la durée d\'exposition compte autant que l\'intensité. Pour les cadres en forfait, l\'équivalent est évalué via l\'amplitude journalière et le nombre de jours/an.',
    exemple: '260 jours × 10h/jour → exposition élevée. Suivi cardiologique recommandé après 5+ ans.',
    tags: ['cardiovasculaire', 'AVC', 'OMS', 'risque', 'longues heures']
  },
  {
    terme: 'Médecine du travail (cadres)',
    art: 'Art. R4624-10 et suivants',
    def: 'Tout salarié, y compris cadre dirigeant, bénéficie d\'un suivi médical. Visite d\'information et de prévention (VIP) tous les 5 ans pour les cadres sans risques particuliers, ou plus fréquent si risques identifiés. Peut signaler une surcharge à l\'employeur (fiche d\'entreprise).',
    exemple: 'Médecin du travail peut recommander une réduction de charge → employeur obligé de prendre en compte ou d\'en justifier l\'impossibilité.',
    tags: ['médecine du travail', 'VIP', 'suivi', 'santé']
  },
  {
    terme: 'Droit de retrait',
    art: 'Art. L4131-1',
    def: 'Tout salarié peut se retirer d\'une situation de travail qu\'il estime présenter un danger grave et imminent pour sa vie ou sa santé, sans sanction possible de l\'employeur. Un burn-out avancé ou une surcharge médicalement documentée peut justifier ce droit.',
    exemple: 'Cadre hospitalisé pour crise cardiaque liée au surmenage → droit de retrait applicable à la reprise si conditions inchangées.',
    tags: ['droit de retrait', 'L4131-1', 'danger', 'santé']
  },
  {
    terme: 'Obligation de prévention (employeur)',
    art: 'Art. L4121-1',
    def: 'L\'employeur a une obligation générale de santé et sécurité : il doit prendre les mesures nécessaires pour assurer la sécurité et protéger la santé physique et mentale des travailleurs. Cette obligation est de résultat pour les risques graves et connus.',
    exemple: 'Employeur informé de la surcharge d\'un cadre via l\'entretien annuel sans prendre de mesures → responsabilité engagée en cas d\'accident ou maladie.',
    tags: ['prévention', 'employeur', 'L4121-1', 'obligation', 'sécurité']
  },
  {
    terme: 'Amplitude horaire',
    art: 'Hakola & Härmä 2001 + Art. L3131-1',
    def: 'Durée totale d\'une journée de travail, du début à la fin (incluant les pauses). Pour un cadre en forfait jours, il n\'y a pas de limite légale d\'heures/jour mais le repos de 11h s\'impose. Amplitude >11h documentée sur plusieurs semaines = risque de perturbation du rythme circadien et du sommeil.',
    exemple: 'Réunion client : 9h-22h = amplitude 13h. Sur 3 semaines consécutives = signal d\'alerte biologique.',
    tags: ['amplitude', 'horaire', 'circadien', 'sommeil', 'scientifique']
  },

  // ══════════════════════════════════════════════════════════════
  //  GESTION DES CONGÉS
  // ══════════════════════════════════════════════════════════════
  {
    terme: 'Congés payés (cadres)',
    art: 'Art. L3141-1 à L3141-47',
    def: '25 jours ouvrables légaux (= 5 semaines) pour tous les salariés. Certaines CCN prévoient des jours supplémentaires (ancienneté, congé de fractionnement, congés "cadres"). Ne pas confondre avec les RTT — les CP ne se perdent pas de la même façon.',
    exemple: 'Banque : 25j CP + 5j ancienneté (après 10 ans) + 2j fractionnement potentiels = jusqu\'à 32j.',
    tags: ['congés payés', '25j', 'CP', 'légal']
  },
  {
    terme: 'Jours de RTT — prise et report',
    art: 'Art. L3121-64 + accord collectif',
    def: 'Les RTT doivent être pris dans la période de référence (souvent l\'année civile). Non pris, ils peuvent être : monétisés (rachat volontaire), placés sur un CET (Compte Épargne Temps), ou perdus. Le régime dépend de votre accord collectif — vérifiez votre CCN.',
    exemple: 'CCN Syntec : RTT non pris au 31/12 = perdus (sauf accord CET). Banque : possible report sous conditions.',
    tags: ['RTT', 'prise', 'report', 'CET', 'monétisation']
  },
  {
    terme: 'Compte Épargne Temps (CET)',
    art: 'Art. L3151-1 à L3151-4',
    def: 'Dispositif permettant au salarié de capitaliser des droits à congés (RTT, CP excédentaires, heures supplémentaires rachetées) pour les utiliser ultérieurement ou les monétiser. Nécessite un accord collectif. Utile pour les cadres qui accumulent des RTT non pris.',
    exemple: 'Cadre Syntec : place 5 RTT/an sur CET → après 4 ans = 20j disponibles pour congé sabbatique.',
    tags: ['CET', 'épargne temps', 'RTT', 'congé', 'monétisation']
  },
  {
    terme: 'Congé de fractionnement',
    art: 'Art. L3141-23',
    def: 'Droit à des jours de CP supplémentaires (1 à 2 jours) si les congés payés ne sont pas entièrement pris entre le 1er mai et le 31 octobre. Applicable sauf renonciation individuelle expresse. Souvent oublié des cadres qui posent leurs congés en dehors de la période légale.',
    exemple: 'Pose 3 semaines en août + 1 semaine en décembre → droit potentiel à 1 jour de fractionnement.',
    tags: ['fractionnement', 'CP', 'congés', 'mai-octobre']
  },

  // ══════════════════════════════════════════════════════════════
  //  RÉMUNÉRATION CADRES
  // ══════════════════════════════════════════════════════════════
  {
    terme: 'Taux journalier (forfait jours)',
    art: 'Calcul conventionnel',
    def: 'Pour calculer la valeur d\'un jour racheté ou d\'une absence en forfait jours : Salaire mensuel brut × 12 ÷ nombre de jours forfait. Exemple : 5 000€/mois × 12 ÷ 218 = 275,22 € / jour.',
    exemple: '5 000€ × 12 = 60 000€ annuel ÷ 218 jours = 275,22€/jour. Rachat 5j × 275,22€ × 110% = 1 513,71€ brut.',
    tags: ['taux journalier', 'calcul', 'rachat', 'valeur jour']
  },
  {
    terme: 'Déduction pour absence (forfait)',
    art: 'Cass. Soc. 2010 — principes de déduction',
    def: 'En cas d\'absence non rémunérée (congé sans solde, absence injustifiée), la déduction se calcule : Salaire mensuel × (jours d\'absence ÷ nombre de jours ouvrés du mois), ou sur la base du taux journalier si le forfait est en jours. Vérifiez votre contrat et votre CCN.',
    exemple: '3 jours d\'absence × 275€ (taux journalier) = 825€ à déduire du salaire du mois.',
    tags: ['absence', 'déduction', 'salaire', 'forfait jours']
  },
  {
    terme: 'Garantie mensuelle de rémunération',
    art: 'Art. L3242-1 + Art. L3211-1',
    def: 'Toute rémunération doit être versée au moins une fois par mois. Pour les cadres en forfait jours, le salaire mensuel est fixe (indépendant du nombre de jours effectivement travaillés dans le mois) sauf en cas d\'absence.',
    exemple: 'Mois de 18 jours ouvrés vs 22 jours → même salaire. Sauf si 4 jours de RTT posés → déduction selon accord.',
    tags: ['rémunération', 'mensuelle', 'fixe', 'salaire']
  },

  // ══════════════════════════════════════════════════════════════
  //  TÉLÉTRAVAIL CADRES
  // ══════════════════════════════════════════════════════════════
  {
    terme: 'Télétravail (régime cadres)',
    art: 'Art. L1222-9 à L1222-11 + ANI 2020',
    def: 'Le télétravail est possible pour les cadres avec ou sans accord collectif (accord individuel possible). Il n\'affecte pas le forfait jours. Les gardes-fous (repos 11h, repos hebdomadaire) s\'appliquent. L\'employeur doit prendre en charge les frais professionnels liés au télétravail.',
    exemple: 'Avenant télétravail : 3j/semaine. Forfait jours reste à 218j. Indemnité forfaitaire 2,57€/j télétravail (barème URSSAF 2026).',
    tags: ['télétravail', 'remote', 'cadres', 'ANI', 'accord']
  },
  {
    terme: 'Frais professionnels télétravail',
    art: 'Art. L1222-10 + Barème URSSAF',
    def: 'L\'employeur peut rembourser les frais liés au télétravail (internet, téléphone, matériel) sous forme réelle ou forfaitaire. Le barème URSSAF (2024-2026) prévoit une allocation forfaitaire de 2,57€/jour exonérée de cotisations, plafonnée à 57,20€/mois.',
    exemple: '20 jours de télétravail/mois × 2,57€ = 51,40€ exonérés. Alternative : remboursement sur justificatifs.',
    tags: ['frais', 'télétravail', 'URSSAF', 'remboursement', 'forfait']
  },

  // ══════════════════════════════════════════════════════════════
  //  DIVERS CADRES
  // ══════════════════════════════════════════════════════════════
  {
    terme: 'Convention de forfait — contenu obligatoire',
    art: 'Art. L3121-55 + L3121-64',
    def: 'La convention de forfait (jours ou heures) doit figurer dans un accord collectif ET dans le contrat de travail individuel. Elle doit mentionner : le nombre de jours/heures prévu, le salaire en contrepartie, et les modalités de suivi. Sans ces éléments, la convention est inopposable au salarié.',
    exemple: 'Contrat doit mentionner : "Vous exercerez vos fonctions dans le cadre d\'une convention de forfait annuel en jours à hauteur de 218 jours par an."',
    tags: ['convention', 'forfait', 'contrat', 'accord collectif', 'mention']
  },
  {
    terme: 'Jours fériés (cadres)',
    art: 'Art. L3133-1 à L3133-12',
    def: '11 jours fériés légaux en France. Pour les cadres en forfait jours, les jours fériés tombant un jour normalement travaillé sont déduits du forfait (ils comptent comme jours de "présence"). Certaines CCN ajoutent des jours fériés spécifiques (ex: lundi de Pentecôte pour certains secteurs).',
    exemple: '2026 : 8 jours fériés ouvrés → décomptés du forfait (ni jours de travail ni RTT). Restent dans le calcul RTT.',
    tags: ['jours fériés', 'férié', 'légal', 'forfait', 'calcul']
  },
  {
    terme: 'Astreinte (cadres)',
    art: 'Art. L3121-9 à L3121-12',
    def: 'Période pendant laquelle le salarié est disponible à domicile ou à proximité pour répondre à d\'éventuels besoins, sans effectuer de travail. Les astreintes ne comptent pas comme temps de travail mais sont rémunérées. Pour les cadres en forfait jours, elles peuvent être limitées par accord collectif.',
    exemple: 'Cadre IT : astreinte 1 week-end sur 4. Compensation : 150€/week-end + majoration 50% si intervention réelle.',
    tags: ['astreinte', 'disponibilité', 'rémunération', 'nuit', 'weekend']
  },
  {
    terme: 'Licenciement cadre — indemnités',
    art: 'Art. L1237-19 + CCN applicable',
    def: 'Les cadres bénéficient de l\'indemnité légale de licenciement (1/4 de mois par an jusqu\'à 10 ans, 1/3 au-delà) et souvent d\'une indemnité conventionnelle plus favorable prévue par la CCN. La convention de forfait n\'affecte pas le calcul des indemnités.',
    exemple: 'Cadre Syntec licencié après 8 ans : indemnité conventionnelle = 3/10e de mois par an × 8 = 2,4 mois (plus favorable que légal).',
    tags: ['licenciement', 'indemnité', 'conventionnelle', 'CCN', 'cadre']
  },
  {
    terme: 'Ancienneté cadre',
    art: 'CCN applicable + Art. L3141-5',
    def: 'La durée d\'ancienneté est souvent prise en compte dans les CCN cadres pour : les congés supplémentaires, les indemnités de licenciement, la prime d\'ancienneté, l\'accès à certains avantages. Elle se calcule depuis la date d\'entrée dans l\'entreprise, intégrant les périodes de suspension (maladie, maternité, etc.).',
    exemple: 'Banque AFB : +2 jours de CP par tranche de 5 ans d\'ancienneté. 10 ans = +4 jours → 29 CP total.',
    tags: ['ancienneté', 'CP', 'avantages', 'CCN', 'calcul']
  },
  {
    terme: 'Mobilité professionnelle',
    art: 'Art. L1237-18 + CNV convention mobilité',
    def: 'Dispositif permettant à un employeur d\'inclure une clause de mobilité géographique dans le contrat. Pour les cadres, elle est fréquente. La modification doit être notifiée avec un délai de prévenance suffisant. Un refus peut constituer une cause réelle et sérieuse de licenciement si la clause est valide.',
    exemple: 'Clause mobilité zone UE → affectation Paris→Bruxelles avec 3 mois de préavis. Refus = risque licenciement pour motif personnel.',
    tags: ['mobilité', 'géographie', 'clause', 'mutation', 'cadre']
  },
  {
    terme: 'Forfait jours réduit',
    art: 'Art. L3121-66',
    def: 'Il est possible de convenir d\'un forfait jours inférieur au plafond (ex: 150j/an au lieu de 218j). Dans ce cas, le salarié est assimilé à un temps partiel, bénéficie d\'une rémunération proportionnelle, et ne peut pas se voir imposer des jours au-delà du plafond réduit sans son accord.',
    exemple: 'Cadre à 4/5e : forfait 174j/an (218 × 0,8). Salaire proportionnel. RTT recalculés sur 174j.',
    tags: ['forfait réduit', 'temps partiel cadre', 'prorata', '4/5e']
  },
  {
    terme: 'Prud\'hommes — cadres',
    art: 'Art. L1411-1 + Art. L3121-65',
    def: 'Le Conseil de Prud\'hommes est compétent pour tous les litiges individuels entre employeur et salarié, y compris cadres. Les litiges fréquents en forfait jours : nullité de la convention, heures supplémentaires non payées, rachat de jours imposé, entretien annuel non réalisé.',
    exemple: 'Cadre prouve via emails que la convention de forfait ne couvre pas ses heures réelles → prud\'hommes ordonnent le rappel de salaire pour HS.',
    tags: ['prud\'hommes', 'litige', 'cadre', 'forfait', 'recours']
  },

  // ══════════════════════════════════════════════════════════════
  //  CADRE DIRIGEANT — VOLET SPÉCIFIQUE (Art. L3111-2)
  // ══════════════════════════════════════════════════════════════
  {
    terme: 'Critères cumulatifs L3111-2',
    art: 'Art. L3111-2 + Cass. Soc. 31/01/2012',
    def: 'Le statut de cadre dirigeant exige TROIS critères CUMULATIFS : responsabilités importantes, grande indépendance dans l\'organisation du temps, et rémunération parmi les plus élevées. L\'absence d\'un seul critère permet au juge de requalifier le statut.',
    exemple: 'Un directeur de site avec un emploi du temps imposé par le siège : critère "indépendance" manquant → requalification possible avec rappel d\'HS sur 3 ans.',
    tags: ['cadre dirigeant', 'L3111-2', 'critères', 'cumulatif', 'dirigeant']
  },
  {
    terme: 'Requalification du cadre dirigeant',
    art: 'Cass. Soc. 02/07/2014 + 04/02/2015',
    def: 'Si un juge estime que les 3 critères L3111-2 ne sont pas remplis, le salarié bascule au régime normal (35h, HS) avec effet rétroactif. Conséquence : rappel des heures supplémentaires non payées sur 3 ans + repos compensateurs + dommages-intérêts.',
    exemple: 'DAF requalifié faute de preuve de "rémunération parmi les plus élevées" → 38 000€ de rappel HS + 12 000€ de dommages-intérêts.',
    tags: ['requalification', 'dirigeant', 'jurisprudence', 'recours', 'rétroactif']
  },
  {
    terme: 'Rémunération "parmi les plus élevées"',
    art: 'Art. L3111-2 alinéa 2 + Cass. Soc. 13/12/2017',
    def: 'Critère apprécié in concreto : la rémunération du cadre dirigeant doit se situer dans la tranche supérieure de l\'entreprise. La jurisprudence retient généralement le top 5-10% des rémunérations. Une simple "rémunération élevée" ne suffit pas — c\'est la position relative qui compte.',
    exemple: 'Cadre à 90k€/an dans une entreprise où le DG est payé 250k€ → "élevée" en absolu mais pas dans "les plus élevées" → critère non rempli.',
    tags: ['rémunération', 'dirigeant', 'L3111-2', 'critère', 'top 10%']
  },
  {
    terme: 'Indépendance dans l\'organisation du temps',
    art: 'Art. L3111-2 alinéa 3',
    def: 'Le cadre dirigeant doit organiser librement son emploi du temps : pas de pointage, pas de validation hiérarchique des absences courtes, pas d\'horaires imposés. Demander des autorisations de congés ou suivre des process imposés (réunions obligatoires hebdomadaires, reportings hebdo) peut suffire à faire tomber le statut.',
    exemple: 'Cadre devant valider ses absences > 1 jour auprès de son N+1 → indépendance fragile, statut CD contestable.',
    tags: ['indépendance', 'autonomie', 'dirigeant', 'L3111-2', 'organisation']
  },
  {
    terme: 'Décisions largement autonomes',
    art: 'Art. L3111-2 alinéa 1',
    def: 'Le cadre dirigeant doit prendre des décisions de manière largement autonome — signature de contrats, embauches, investissements significatifs, représentation de l\'entreprise. Un cadre exécutant des décisions prises par d\'autres ne remplit pas ce critère.',
    exemple: 'Le DRH qui signe seul les contrats de travail, valide les budgets RH et représente l\'entreprise auprès des syndicats remplit ce critère.',
    tags: ['décisions', 'autonomie', 'dirigeant', 'L3111-2', 'pouvoir']
  },
  {
    terme: 'Droits préservés du cadre dirigeant',
    art: 'Art. L3111-2 + Code du travail',
    def: 'Même en tant que CD, le salarié conserve : 25 jours ouvrables de CP minimum (L3141-3), tous les congés spéciaux (maternité, paternité, deuil, mariage), la protection contre le licenciement, la médecine du travail (R4624-10), la formation professionnelle, le DIF/CPF, et la sécurité au travail (L4121-1).',
    exemple: 'DG en burn-out → bénéficie pleinement de l\'arrêt maladie, de la médecine du travail et de l\'obligation de sécurité de l\'employeur.',
    tags: ['dirigeant', 'droits', 'protection', 'CP', 'maintenu']
  },
  {
    terme: 'Inapplicabilité de la durée du travail',
    art: 'Art. L3111-2 + L3111-1',
    def: 'Le cadre dirigeant échappe aux dispositions des titres II (durée du travail) et III (repos et jours fériés) du livre Ier du code du travail. Conséquences : pas de 35h, pas d\'heures supplémentaires, pas de durée maximale, pas de repos quotidien 11h imposé, pas de repos hebdo 35h imposé.',
    exemple: 'Un DG qui travaille 70h une semaine → aucune HS, aucune violation légale. Mais responsabilité civile de l\'employeur sur la santé reste engagée.',
    tags: ['durée', 'travail', 'inapplicable', 'dirigeant', 'L3111-2', '35h']
  },
  {
    terme: 'Convention collective et cadre dirigeant',
    art: 'Variable selon CCN',
    def: 'Certaines CCN (Syntec, Banque AFB, etc.) prévoient des avantages spécifiques pour les cadres dirigeants : CP supplémentaires, indemnité de fin de carrière majorée, clauses de non-concurrence. Toujours consulter sa convention collective pour les droits maintenus ou majorés.',
    exemple: 'CCN Syntec : cadres position 3.3 bénéficient de 25 jours de CP + 8 jours de RTT (selon accord d\'entreprise).',
    tags: ['CCN', 'dirigeant', 'convention', 'droits', 'syntec']
  },
  {
    terme: 'Mandat social vs cadre dirigeant',
    art: 'Code de commerce + L3111-2',
    def: 'À ne pas confondre : le mandataire social (gérant SARL, président SAS, DG SA) n\'est PAS un salarié sauf cumul mandat/contrat de travail validé. Le cadre dirigeant reste salarié soumis au code du travail (en partie). Beaucoup de DG cumulent les deux : ils ont un contrat de travail comme cadre dirigeant ET un mandat social.',
    exemple: 'Un DG-mandataire social rémunéré uniquement via son mandat n\'est pas couvert par le code du travail. S\'il a aussi un contrat de salarié, le statut CD s\'applique.',
    tags: ['mandat', 'social', 'dirigeant', 'salarié', 'gérant']
  },
  {
    terme: 'Charge de la preuve (cadre dirigeant)',
    art: 'Cass. Soc. 31/01/2012 + 13/04/2010',
    def: 'C\'est à l\'EMPLOYEUR de prouver que les 3 critères L3111-2 sont remplis. Si le salarié conteste son statut CD, l\'employeur doit produire : fiche de poste, organigramme, bulletins de paie comparatifs, contrats signés par le cadre, procurations. À défaut, le statut tombe.',
    exemple: 'Litige prud\'homal : l\'employeur ne produit qu\'un contrat mentionnant "cadre dirigeant" sans autre preuve → requalification automatique.',
    tags: ['preuve', 'dirigeant', 'employeur', 'jurisprudence', 'prudhommes']
  },
  {
    terme: 'Rupture conventionnelle du cadre dirigeant',
    art: 'Art. L1237-11 et s.',
    def: 'Le cadre dirigeant bénéficie pleinement du dispositif de rupture conventionnelle. L\'indemnité légale minimum est calculée comme pour tout salarié (1/4 mois par année jusqu\'à 10 ans, 1/3 ensuite). Les CCN peuvent prévoir des indemnités supérieures, fréquentes pour les CD.',
    exemple: 'CD à 200k€ brut/an avec 15 ans d\'ancienneté → indemnité légale minimum ≈ 95 000€. Les négociations aboutissent souvent à 1,5 à 3x ce minimum.',
    tags: ['rupture', 'conventionnelle', 'dirigeant', 'indemnité', 'L1237-11']
  },
  {
    terme: 'Délégation de pouvoir',
    art: 'Jurisprudence constante',
    def: 'Un cadre dirigeant détient souvent une délégation de pouvoir formelle (signature, embauche, engagement financier). La preuve écrite (procuration, délégation notariée) renforce son statut. À l\'inverse, l\'absence de toute délégation fragilise le statut CD.',
    exemple: 'DAF avec procuration bancaire signée par le DG + droit de signature jusqu\'à 50 000€ → statut CD solide.',
    tags: ['délégation', 'pouvoir', 'dirigeant', 'preuve', 'procuration']
  },
  {
    terme: 'Comité de direction (CODIR)',
    art: 'Jurisprudence',
    def: 'L\'appartenance au comité de direction est un indice fort (mais pas suffisant à lui seul) du statut de cadre dirigeant. Participer au CODIR signifie généralement détenir un pouvoir de décision sur la stratégie de l\'entreprise.',
    exemple: 'Cadre membre du CODIR participant aux décisions trimestrielles, votant sur les recrutements stratégiques → indice de pouvoir réel.',
    tags: ['codir', 'comité', 'direction', 'dirigeant', 'preuve']
  }
];

// ── API du glossaire ──────────────────────────────────────────────
const M6_GlossaireAPI = {
  getAll() { return M6_GLOSSAIRE; },
  search(q) {
    if (!q) return M6_GLOSSAIRE;
    const lq = q.toLowerCase().trim();
    const lqNoAccent = lq.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const terms = lqNoAccent.split(/\s+/).filter(t => t.length > 1);

    // ── Synonymes & reformulations courantes ───────────────────────
    // Map : mot tapé → mots à chercher en plus dans la définition
    const synonyms = {
      'depasser': 'rachat dépassement plafond',
      'depassement': 'rachat dépassement plafond',
      'trop': 'rachat dépassement plafond surcharge',
      'fatigue': 'santé burn-out P3 P4 charge déconnexion repos',
      'epuise': 'santé burn-out P3 P4 charge',
      'epuisement': 'burn-out P4 santé charge',
      'burn': 'burn-out P4 santé',
      'burnout': 'burn-out P4 santé',
      'stress': 'santé burn-out RPS charge',
      'maladie': 'arrêt absence sécurité sociale',
      'arret': 'maladie absence',
      'enceinte': 'maternité paternité',
      'grossesse': 'maternité paternité L1225',
      'patron': 'employeur manager',
      'chef': 'employeur manager',
      'augmentation': 'rémunération salaire entretien',
      'salaire': 'rémunération taux journalier',
      'paye': 'rémunération salaire taux',
      'paie': 'rémunération salaire taux',
      'mon droit': 'droit déconnexion repos congés',
      'mes droits': 'droit déconnexion repos congés',
      'que faire': 'recommandation entretien charge déconnexion',
      'litige': 'prud\'hommes nullité dépassement avenant',
      'prudhommes': 'prud\'hommes nullité avenant L3121-59',
      'inspecteur': 'inspection travail contingent contrôle',
      'inspection': 'contingent L3121-30 contrôle',
      'partir': 'rupture conventionnelle démission licenciement',
      'demission': 'rupture démission préavis',
      'licenciement': 'rupture licenciement préavis indemnité',
      'rupture': 'rupture conventionnelle indemnité préavis',
      'demi': 'demi-journée 0.5 forfait',
      'demi journee': 'demi-journée 0.5',
      'samedi': 'week-end repos hebdomadaire L3132-2',
      'dimanche': 'week-end repos hebdomadaire L3132-2',
      'soir': 'amplitude repos quotidien 11h L3131-1 déconnexion',
      'nuit': 'amplitude repos quotidien 11h L3131-1',
      'horaire': 'amplitude repos quotidien L3131-1',
      'horaires': 'amplitude repos quotidien L3131-1',
      'vacances': 'congés payés CP fractionnement',
      'conges': 'congés payés CP L3141 fractionnement',
      'rtt': 'RTT JRTT réduction temps travail',
      'jour': 'forfait jours 218 plafond',
      'jours': 'forfait jours 218 plafond rachat',
      'heure': 'forfait heures HS contingent TEPA',
      'heures': 'forfait heures HS contingent TEPA majoration',
      'hs': 'heures supplémentaires HS TEPA majoration contingent',
      'tepa': 'TEPA loi 2007 exonération heures supplémentaires',
      'ccn': 'convention collective IDCC branche',
      'idcc': 'convention collective IDCC branche',
      'syntec': 'CCN Syntec 1486 ingénieurs cadres',
      'banque': 'CCN Banque AFB 2120',
      'metallurgie': 'CCN Métallurgie ANU 3109',
      'cadre': 'forfait jours cadres dirigeants L3111-2',
      'dirigeant': 'cadre dirigeant L3111-2',
    };

    // Expansion du query avec les synonymes
    let expandedTerms = [...terms];
    for (const [key, expansion] of Object.entries(synonyms)) {
      if (lqNoAccent.includes(key)) {
        const expTerms = expansion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').split(/\s+/);
        expandedTerms.push(...expTerms);
      }
    }
    expandedTerms = [...new Set(expandedTerms)]; // dedupe

    return M6_GLOSSAIRE.map(e => {
      const txt = (e.terme + ' ' + e.def + ' ' + (e.exemple||'') + ' ' + (e.art||'') + ' ' + (e.tags||[]).join(' ')).toLowerCase();
      const txtNoAcc = txt.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      const termeNoAcc = e.terme.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

      let score = 0;

      // Correspondance exacte sur le terme (titre) — priorité max
      if (termeNoAcc.includes(lqNoAccent)) score += 100;
      if (termeNoAcc === lqNoAccent) score += 200;

      // Correspondance dans la def
      if (txtNoAcc.includes(lqNoAccent)) score += 50;

      // Article de loi (ex: "L3121" → tous les L3121-XX)
      if (/^l?\d{3,4}/i.test(lq)) {
        const artNum = lqNoAccent.replace(/^l/i,'');
        if (txtNoAcc.match(new RegExp('l?' + artNum.replace(/-/g,'[-.]?'), 'i'))) score += 40;
      }

      // Mots multiples : score additif par mot trouvé
      let matchedTerms = 0;
      for (const t of expandedTerms) {
        if (t.length > 1 && txtNoAcc.includes(t)) {
          matchedTerms++;
          score += 8;
        }
      }
      // Bonus si tous les mots de la requête originale sont présents
      if (terms.length > 0 && terms.every(t => txtNoAcc.includes(t))) score += 30;

      // Abréviations directes
      const abbrevMap = {
        'fj': 'forfait jours', 'fh': 'forfait heures', 'cd': 'cadre dirigeant',
        'hs': 'heures supplementaires', 'rtt': 'reduction du temps', 'cp': 'conges payes',
        'ccn': 'convention collective', 'tepa': 'loi tepa', 'rps': 'risques psychosociaux',
        'dtt': 'droit temps travail', 'kb': 'kivimaki', 'cse': 'comite social',
        'rc': 'rupture conventionnelle', 'idcc': 'convention collective',
      };
      if (abbrevMap[lqNoAccent] && txtNoAcc.includes(abbrevMap[lqNoAccent])) score += 30;

      return { e, score };
    })
    .filter(({score}) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({e}) => e);
  },
  getByTag(tag) {
    return M6_GLOSSAIRE.filter(e => e.tags.includes(tag));
  }
};

global.M6_GLOSSAIRE    = M6_GLOSSAIRE;
global.M6_GlossaireAPI = M6_GlossaireAPI;

})(window);
