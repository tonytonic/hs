// ================================================================
//  ARTICLES-LOI.JS — Références du Code du travail français
//  Ce fichier est chargé AVANT index.html
//  Pour mettre à jour un article : modifier ce fichier uniquement
//  Format de chaque entrée :
//    art   : numéro d'article (ex: "Art. L3121-18")
//    titre : intitulé court
//    def   : définition complète
//    ex    : exemple concret
//    mots  : tableau de mots-clés pour la recherche
// ================================================================

// Tableau fusionné avec GLOSSAIRE au chargement (voir index.html)
const ARTICLES_LOI = [
  {
    art: 'Art. L3121-1',
    titre: 'Temps de travail effectif',
    def: 'Temps pendant lequel le salarié est à la disposition de l\'employeur, se conformant à ses directives, sans pouvoir vaquer librement à des occupations personnelles.',
    ex: 'Le temps de trajet domicile-travail n\'est généralement pas du temps de travail effectif.',
    mots: ['travail effectif', 'disposition', 'directives'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: 'Art. L3121-10',
    titre: 'Durée légale hebdomadaire — 35h',
    def: 'La durée légale du travail est fixée à 35 heures par semaine civile. Toute heure travaillée au-delà est une heure supplémentaire.',
    ex: 'Si tu travailles 38h dans la semaine, tu as 3h supplémentaires.',
    mots: ['35h', 'durée légale', 'semaine', 'temps plein'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: 'Art. L3121-18',
    titre: 'Durée maximale journalière — 10h',
    def: 'La durée quotidienne ne peut excéder 10 heures de travail effectif. Des dérogations peuvent porter ce maximum à 12h (accord collectif ou autorisation inspection du travail).',
    ex: 'Travailler 13h dans une journée est illégal sauf dérogation spécifique.',
    mots: ['10h', '12h', 'journée', 'amplitude', 'durée max'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: 'Art. L3121-20',
    titre: 'Durée maximale hebdomadaire absolue — 48h',
    def: 'La durée hebdomadaire ne peut dépasser 48 heures sur une même semaine. C\'est le plafond absolu, même avec accord collectif.',
    ex: 'Même si ton employeur te le demande, dépasser 48h dans une semaine est interdit.',
    mots: ['48h', 'plafond', 'maximum hebdo', 'semaine'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: 'Art. L3121-22',
    titre: 'Moyenne hebdomadaire sur 12 semaines — 44h',
    def: 'La durée hebdomadaire calculée sur une période quelconque de 12 semaines consécutives ne peut dépasser 44 heures.',
    ex: 'Tu peux faire 50h une semaine, mais la moyenne sur 12 semaines ne doit pas dépasser 44h.',
    mots: ['44h', 'moyenne', '12 semaines', 'roulement'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: 'Art. L3121-30',
    titre: 'Heures supplémentaires — définition et majorations',
    def: 'Heures accomplies au-delà de la durée légale de 35h. Elles ouvrent droit à une majoration de salaire (25% pour les 8 premières, 50% au-delà) ou à un repos compensateur.',
    ex: 'De la 36e à la 43e heure : +25%. De la 44e heure et au-delà : +50%.',
    mots: ['heures sup', 'majoration', '25%', '50%', 'compensation', 'HS'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: 'Art. L3121-33',
    titre: 'Contingent annuel d\'heures supplémentaires — 220h',
    def: 'Volume annuel d\'heures supplémentaires qu\'un salarié peut effectuer sans autorisation de l\'inspecteur du travail. Fixé par accord collectif ou à défaut à 220h par an.',
    ex: 'Si tu dépasses 220h sup dans l\'année, l\'employeur doit obtenir une autorisation spéciale.',
    mots: ['contingent', '220h', 'annuel', 'autorisation'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: 'Art. L3121-38',
    titre: 'Repos compensateur de remplacement (RCR)',
    def: 'Alternative à la majoration financière des heures supplémentaires. L\'employeur peut, avec accord collectif, remplacer le paiement majoré par un repos de durée équivalente.',
    ex: '1h sup à 25% = 1h15 de repos compensateur.',
    mots: ['RCR', 'récup', 'repos compensateur', 'remplacement', 'récupération'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: 'Art. L3131-1',
    titre: 'Repos quotidien — 11h minimum',
    def: 'Tout salarié bénéficie d\'un repos quotidien d\'une durée minimale de 11 heures consécutives.',
    ex: 'Si tu finis à 23h, tu ne peux pas reprendre avant 10h le lendemain.',
    mots: ['repos quotidien', '11h', 'consécutif', 'nuit'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: 'Art. L3132-1',
    titre: 'Repos hebdomadaire — 24h + 11h = 35h',
    def: 'Tout salarié a droit à un repos hebdomadaire d\'une durée minimale de 24h consécutives, auxquelles s\'ajoutent les 11h de repos quotidien, soit 35h au total.',
    ex: 'En pratique : pas de travail le dimanche + au moins 11h de repos après le samedi.',
    mots: ['repos hebdomadaire', '24h', '35h', 'dimanche', 'week-end'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: 'Art. L3132-3',
    titre: 'Repos dominical',
    def: 'Le repos hebdomadaire est donné le dimanche. Des dérogations existent pour certaines activités (commerces, hôtellerie, etc.) mais nécessitent un cadre légal précis.',
    ex: 'Travailler le dimanche sans accord collectif ou autorisation préfectorale est illégal.',
    mots: ['dimanche', 'repos dominical', 'dérogation', 'week-end'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: 'Art. L4121-1',
    titre: 'Obligation de sécurité de l\'employeur',
    def: 'L\'employeur est tenu de prendre les mesures nécessaires pour assurer la sécurité et protéger la santé physique et mentale des travailleurs.',
    ex: 'Un employeur qui laisse un salarié s\'épuiser sans agir peut être tenu responsable.',
    mots: ['sécurité', 'santé', 'burn-out', 'risque psychosocial', 'obligation employeur'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: 'Art. L3121-27',
    titre: 'Heures supplémentaires — Paiement ou repos compensateur',
    def: 'Les heures supplémentaires donnent lieu soit à un paiement majoré, soit à un repos compensateur équivalent majoré. Le choix appartient à l\'employeur, sauf disposition conventionnelle contraire.',
    ex: '10h supplémentaires → soit 12.5h en paiement (majoration 25%), soit 12.5h de repos compensateur.',
    mots: ['paiement', 'repos compensateur', 'équivalent', 'choix employeur'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: 'Art. L3121-34',
    titre: 'Contingent annuel d\'heures supplémentaires',
    def: 'Volume d\'heures supplémentaires qu\'un salarié peut effectuer au-delà de la durée légale sans autorisation de l\'inspecteur du travail. Au-delà du contingent, une contrepartie obligatoire en repos (COR) est due.',
    ex: 'Contingent 220h : au-delà, chaque heure donne droit à 50% de repos (1h travaillée = 0.5h repos).',
    mots: ['contingent', 'autorisation', 'COR', 'contrepartie obligatoire'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: 'Art. L3121-41',
    titre: 'Astreinte',
    def: 'Période pendant laquelle le salarié, sans être sur son lieu de travail et sans être à la disposition permanente de l\'employeur, doit être en mesure d\'intervenir pour accomplir un travail. Seul le temps d\'intervention est du temps de travail effectif.',
    ex: 'Astreinte le week-end : si intervention de 2h, seules ces 2h comptent comme temps de travail.',
    mots: ['astreinte', 'disponibilité', 'intervention', 'temps effectif'],
    liens: [
      { label: 'Code du travail - Légifrance', url: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178009' },
      { label: 'Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail/' }
    ]
  },
  {
    art: "Art. L1221-1", titre: "Contrat de travail",
    def: "Le contrat de travail est soumis aux règles du droit commun. Il peut être établi selon les formes convenues entre les parties. L'absence de contrat écrit n'empêche pas la qualification de contrat de travail si les éléments constitutifs sont réunis.",
    ex: "Un salarié qui travaille régulièrement pour un employeur sans contrat écrit peut faire reconnaître l'existence d'un CDI par le conseil de prud'hommes.",
    mots: ["contrat", "CDI", "embauche", "qualification", "écrit"]
  },
  {
    art: "Art. L1222-1", titre: "Exécution de bonne foi",
    def: "Le contrat de travail est exécuté de bonne foi par les deux parties. L'employeur ne peut pas imposer des conditions d'exécution qui rendraient le travail impossible ou dégraderaient les conditions de travail.",
    ex: "Un employeur qui fixe des objectifs irréalisables ou modifie unilatéralement les conditions de travail manque à son obligation de bonne foi.",
    mots: ["bonne foi", "loyauté", "obligation", "contrat", "conditions"]
  },
  {
    art: "Art. L1222-6", titre: "Modification du contrat",
    def: "Lorsque l'employeur envisage de modifier un élément essentiel du contrat (salaire, horaires, qualification), il doit le notifier par écrit. Le salarié dispose d'un délai de réflexion et peut refuser sans que ce refus constitue une faute.",
    ex: "Un passage de 35h à 39h hebdomadaires est une modification du contrat qui nécessite l'accord écrit du salarié.",
    mots: ["modification", "contrat", "refus", "horaires", "salaire", "notification"]
  },
  {
    art: "Art. L1222-9", titre: "Télétravail — définition",
    def: "Le télétravail désigne toute forme d'organisation du travail dans laquelle un travail qui aurait pu être exécuté dans les locaux de l'employeur est effectué hors de ces locaux de façon volontaire, en utilisant les technologies de l'information et de la communication.",
    ex: "Le refus de télétravailler n'est pas un motif de licenciement sauf si le poste est exclusivement prévu en télétravail dès l'embauche.",
    mots: ["télétravail", "domicile", "remote", "distanciel", "TIC"]
  },
  {
    art: "Art. L1222-10", titre: "Télétravail — obligations employeur",
    def: "L'employeur qui recourt au télétravail prend en charge tous les coûts découlant directement de l'exercice du télétravail : matériels, logiciels, abonnements, communications, frais de maintenance.",
    ex: "Si l'employeur impose le télétravail sans fournir le matériel, le salarié peut exiger un remboursement des frais engagés.",
    mots: ["télétravail", "frais", "remboursement", "matériel", "connexion", "coûts"]
  },
  {
    art: "Art. L1225-1", titre: "Protection maternité",
    def: "Il est interdit à l'employeur de rompre le contrat de travail d'une salariée en état de grossesse médicalement constaté, pendant l'intégralité des congés maternité, ainsi que pendant les dix semaines suivant l'expiration de ces périodes.",
    ex: "Un licenciement notifié pendant la grossesse est nul de plein droit, sauf faute grave non liée à la grossesse ou impossibilité de maintenir le contrat.",
    mots: ["maternité", "grossesse", "protection", "licenciement nul", "congé maternité"]
  },
  {
    art: "Art. L1226-1", titre: "Maladie — indemnisation complémentaire",
    def: "Tout salarié ayant un an d'ancienneté bénéficie, en cas d'arrêt de travail justifié, d'une indemnisation complémentaire aux indemnités journalières de la Sécurité sociale. Taux : 90% du salaire brut les 30 premiers jours, puis 66,67% les 30 suivants.",
    ex: "Un salarié de 3 ans d'ancienneté en arrêt maladie percevra les IJSS de la CPAM plus un complément de l'employeur pour maintenir son salaire à 90% pendant un mois.",
    mots: ["maladie", "arrêt", "indemnisation", "IJSS", "ancienneté", "maintien salaire"]
  },
  {
    art: "Art. L1237-1", titre: "Démission",
    def: "La démission est la rupture du contrat à l'initiative du salarié. Elle doit résulter d'une volonté claire et non équivoque. Elle n'ouvre en principe pas droit à l'allocation chômage, sauf démission légitime reconnue par France Travail.",
    ex: "La démission verbale peut être valable mais il est conseillé de la formaliser par écrit pour éviter tout litige sur la date et la volonté.",
    mots: ["démission", "rupture", "préavis", "volontaire", "chômage", "légitime"]
  },
  {
    art: "Art. L1237-19", titre: "Rupture conventionnelle",
    def: "La rupture conventionnelle permet à l'employeur et au salarié de convenir en commun des conditions de la rupture du CDI. Elle donne droit à l'allocation chômage et à une indemnité spécifique au moins égale à l'indemnité légale de licenciement.",
    ex: "La rupture conventionnelle nécessite un entretien, un formulaire homologué par la DREETS et un délai de rétractation de 15 jours calendaires.",
    mots: ["rupture conventionnelle", "commun accord", "chômage", "indemnité", "homologation"]
  },
  {
    art: "Art. L1243-1", titre: "CDD — terme et renouvellement",
    def: "Sauf accord des parties, le terme du CDD ne peut être modifié. Le renouvellement est possible dans les limites fixées par la loi : 2 fois pour les CDD avec terme précis, durée totale ne pouvant excéder la durée maximale légale selon le motif de recours.",
    ex: "Un CDD non rompu à son terme se transforme automatiquement en CDI si le salarié continue à travailler sans nouveau contrat.",
    mots: ["CDD", "terme", "renouvellement", "transformation CDI", "durée maximale"]
  },
  {
    art: "Art. L1251-1", titre: "Travail temporaire — intérim",
    def: "L'entreprise de travail temporaire met à disposition d'une entreprise utilisatrice un salarié qu'elle rémunère. Ce salarié bénéficie des mêmes conditions de travail que les salariés permanents de l'entreprise utilisatrice (durée, HS, repos, sécurité).",
    ex: "Un intérimaire qui effectue des heures supplémentaires a droit aux mêmes majorations qu'un salarié permanent de l'entreprise utilisatrice.",
    mots: ["intérim", "temporaire", "mission", "agence", "ETT", "entreprise utilisatrice"]
  },
  {
    art: "Art. L2121-1", titre: "Représentativité syndicale",
    def: "La représentativité syndicale est déterminée selon plusieurs critères cumulatifs : respect des valeurs républicaines, indépendance, ancienneté, audience électorale (10% au niveau entreprise, 8% aux niveaux branche et interprofessionnel).",
    ex: "Seuls les syndicats représentatifs peuvent signer des accords collectifs valables dans l'entreprise. Un accord signé par un syndicat non représentatif est nul.",
    mots: ["syndicat", "représentativité", "délégués", "négociation", "accord collectif"]
  },
  {
    art: "Art. L2242-17", titre: "Droit à la déconnexion",
    def: "Dans les entreprises de plus de 50 salariés, l'employeur doit ouvrir une négociation annuelle sur les modalités d'exercice du droit à la déconnexion. À défaut d'accord, il élabore une charte après avis du CSE.",
    ex: "Un salarié ne peut pas être sanctionné pour ne pas avoir répondu à des emails en dehors de ses horaires si le droit à la déconnexion est effectif dans l'entreprise.",
    mots: ["déconnexion", "mails", "hors horaires", "soirée", "week-end", "disponibilité"]
  },
  {
    art: "Art. L2312-8", titre: "CSE — attributions santé et sécurité",
    def: "Le Comité Social et Économique exerce ses attributions en matière de santé, sécurité et conditions de travail. Il procède à l'analyse des risques professionnels, contribue à la prévention et peut proposer des actions correctives. Il est informé et consulté sur les décisions importantes.",
    ex: "Le CSE peut diligenter une enquête en cas d'accident grave, de situation de harcèlement ou de risque grave pour la santé des salariés.",
    mots: ["CSE", "comité social économique", "santé", "sécurité", "CHSCT", "représentants"]
  },
  {
    art: "Art. L3121-2", titre: "Temps de restauration et pause",
    def: "Les temps de pause et de restauration sont du temps de travail effectif lorsque le salarié reste à la disposition de l'employeur sans pouvoir vaquer librement à des occupations personnelles.",
    ex: "Une pause déjeuner où le salarié doit rester joignable et disponible pour des urgences peut être requalifiée en temps de travail effectif.",
    mots: ["pause", "restauration", "déjeuner", "coupure", "temps de travail", "disposition"]
  },
  {
    art: "Art. L3121-4", titre: "Temps de déplacement professionnel",
    def: "Le temps de déplacement pour se rendre sur le lieu d'exécution du contrat n'est pas du temps de travail effectif. Mais s'il dépasse le temps normal de trajet domicile-travail, il donne lieu à une contrepartie en repos ou financière.",
    ex: "Un commercial partant de chez lui pour rejoindre un client à 3h de route perçoit une contrepartie pour les heures dépassant son trajet habituel.",
    mots: ["déplacement", "trajet", "domicile", "mission", "contrepartie", "professionnel"]
  },
  {
    art: "Art. L3121-11", titre: "Heures supplémentaires — refus",
    def: "Dans la limite du contingent annuel, l'accomplissement d'heures supplémentaires est à l'initiative de l'employeur. Le salarié ne peut en principe pas les refuser, sauf en cas de délai de prévenance insuffisant ou de disposition conventionnelle contraire.",
    ex: "Un salarié peut légitimement refuser des HS imposées 5 minutes avant la fin du poste si aucun accord collectif ne l'impose.",
    mots: ["heures supplémentaires", "refus", "obligation", "initiative employeur", "contingent"]
  },
  {
    art: "Art. L3121-16", titre: "Droit à la pause",
    def: "Dès que le temps de travail quotidien atteint six heures, le salarié bénéficie d'un temps de pause d'une durée minimale de vingt minutes consécutives. Un accord collectif peut fixer un temps de pause supérieur.",
    ex: "Travailler 8 heures d'affilée sans aucune pause est illégal. L'employeur doit organiser cette coupure obligatoire.",
    mots: ["pause", "20 minutes", "six heures", "repos", "obligatoire", "coupure"]
  },
  {
    art: "Art. L3121-27", titre: "Durée légale hebdomadaire",
    def: "La durée légale de travail effectif des salariés à temps complet est fixée à trente-cinq heures par semaine. C'est le seuil à partir duquel les heures supplémentaires se déclenchent.",
    ex: "Un contrat à 39h par semaine inclut 4h de HS hebdomadaires qui doivent être compensées par une majoration salariale ou des RTT, selon l'accord applicable.",
    mots: ["35 heures", "durée légale", "temps complet", "hebdomadaire", "base"]
  },
  {
    art: "Art. L3121-28", titre: "Heures supplémentaires — définition",
    def: "Toute heure accomplie au-delà de la durée légale hebdomadaire de 35h (ou de la durée considérée comme équivalente par accord) est une heure supplémentaire.",
    ex: "Si le contrat est à 35h et que le salarié travaille 38h dans la semaine civile, les 3h excédentaires sont des heures supplémentaires obligatoirement majorées.",
    mots: ["heures supplémentaires", "HS", "définition", "au-delà", "35h", "déclenchement"]
  },
  {
    art: "Art. L3121-36", titre: "Majoration des heures supplémentaires",
    def: "Les 8 premières heures supplémentaires (36e à 43e heure) sont majorées de 25%. Les heures suivantes (44e heure et au-delà) sont majorées de 50%. Un accord de branche ou d'entreprise peut fixer un taux différent, avec un plancher minimum de 10%.",
    ex: "2h sup à 25% sur un salaire horaire de 15€ : 15 × 1,25 × 2 = 37,50€. 3h à 50% : 15 × 1,50 × 3 = 67,50€.",
    mots: ["majoration", "25%", "50%", "taux", "heures supplémentaires", "rémunération"]
  },
  {
    art: "Art. L3121-44", titre: "Forfait annuel en heures",
    def: "Un accord collectif peut prévoir des conventions individuelles de forfait en heures sur l'année. Ces conventions fixent un nombre d'heures supérieur à la durée légale, avec paiement des HS intégrées au salaire à un taux majoré.",
    ex: "Un forfait à 1820h/an correspond à 35h × 52 semaines. Un forfait à 1960h inclut 140h de HS déjà intégrées dans la rémunération forfaitaire.",
    mots: ["forfait heures", "forfait annuel", "convention individuelle", "1820h", "1960h"]
  },
  {
    art: "Art. L3121-58", titre: "Forfait annuel en jours",
    def: "Le forfait jours est réservé aux cadres autonomes et aux salariés dont la durée ne peut être prédéterminée. Il se substitue au décompte en heures. Le plafond légal est de 218 jours travaillés par an.",
    ex: "Un cadre en forfait jours ne cumule pas d'HS au sens strict, mais ne peut pas dépasser 218 jours par an ni voir son amplitude journalière devenir excessive.",
    mots: ["forfait jours", "cadre autonome", "218 jours", "amplitude", "décompte"]
  },
  {
    art: "Art. L3121-64", titre: "Forfait jours — accord collectif obligatoire",
    def: "Le recours au forfait jours nécessite un accord collectif qui détermine les catégories concernées, le nombre maximum de jours, les modalités de suivi de la charge de travail et du droit à la déconnexion.",
    ex: "Sans accord collectif valide, le forfait jours est nul et le salarié peut revendiquer le paiement de toutes ses heures supplémentaires sur 3 ans.",
    mots: ["forfait jours", "accord collectif", "validité", "suivi charge", "entretien annuel"]
  },
  {
    art: "Art. L3122-1", titre: "Travail de nuit — justification",
    def: "Le recours au travail de nuit doit être exceptionnel. Il doit être justifié par la nécessité d'assurer la continuité de l'activité économique ou des services d'utilité sociale, en tenant compte des impératifs de santé et de sécurité.",
    ex: "Un employeur ne peut pas imposer le travail de nuit pour de simples raisons de rentabilité si la continuité d'activité n'est pas indispensable.",
    mots: ["travail de nuit", "nuit", "justification", "exceptionnel", "continuité"]
  },
  {
    art: "Art. L3122-2", titre: "Période de nuit légale",
    def: "La période de nuit comprend obligatoirement l'intervalle entre minuit et 5h. Elle est définie par accord collectif sur au moins 9 heures consécutives entre 21h et 7h. En l'absence d'accord, la période retenue est 21h-6h.",
    ex: "Si votre convention collective ne définit pas la période de nuit, la période légale par défaut de 21h à 6h s'applique.",
    mots: ["nuit", "période de nuit", "21h", "6h", "minuit", "5h", "horaires nocturnes"]
  },
  {
    art: "Art. L3122-5", titre: "Travailleur de nuit — statut",
    def: "Est travailleur de nuit tout salarié qui accomplit au moins 3h de nuit au moins 2 fois par semaine selon son horaire habituel, ou au moins 270h de nuit par an. Ce statut ouvre des droits spécifiques en termes de surveillance médicale et de contreparties.",
    ex: "Un préparateur de commandes travaillant de 22h à 6h trois fois par semaine acquiert le statut de travailleur de nuit dès le début.",
    mots: ["travailleur de nuit", "statut", "270h", "deux fois par semaine", "trois heures"]
  },
  {
    art: "Art. L3122-7", titre: "Durée maximale du travail de nuit",
    def: "La durée quotidienne du travail de nuit ne peut excéder 8 heures. La durée hebdomadaire, calculée sur une période de 12 semaines consécutives, ne peut dépasser 40 heures.",
    ex: "Un poste de nuit de 10h contrevient à la durée maximale légale de 8h — une dérogation accordée par l'inspection du travail est nécessaire.",
    mots: ["nuit", "8 heures", "durée maximale", "40 heures", "12 semaines", "plafond"]
  },
  {
    art: "Art. L3122-9", titre: "Contreparties travail de nuit",
    def: "Les travailleurs de nuit bénéficient de contreparties fixées par accord collectif, sous forme de repos compensateur et, le cas échéant, de compensation salariale. En l'absence d'accord, des contreparties minimales doivent quand même être accordées.",
    ex: "Sans accord collectif précisant les contreparties nuit, l'employeur doit verser a minima une compensation financière pour les heures de nuit effectuées.",
    mots: ["contreparties", "nuit", "repos compensateur", "compensation salariale", "accord"]
  },
  {
    art: "Art. L3131-2", titre: "Repos quotidien — dérogations",
    def: "Le repos quotidien de 11h peut être réduit à 9h pour certaines activités ou en cas de surcroît exceptionnel d'activité, par accord collectif ou autorisation de l'inspection du travail. Toute réduction doit donner lieu à récupération équivalente.",
    ex: "En logistique lors d'un pic d'activité exceptionnel, un repos réduit à 9h peut être autorisé — mais la récupération est obligatoire et immédiate.",
    mots: ["repos quotidien", "dérogation", "9 heures", "récupération", "surcroît"]
  },
  {
    art: "Art. L3132-2", titre: "Repos hebdomadaire — 35 heures",
    def: "La durée du repos hebdomadaire doit être au minimum de 35 heures consécutives, correspondant au repos quotidien de 11h accolé à la journée de repos hebdomadaire.",
    ex: "Si un salarié finit son poste le vendredi à 23h, il ne peut reprendre que le dimanche à 10h minimum (23h + 35h = 10h dimanche).",
    mots: ["repos hebdomadaire", "35 heures", "consécutif", "dimanche", "semaine"]
  },
  {
    art: "Art. L3132-3", titre: "Repos dominical — principe",
    def: "Dans l'intérêt des salariés, le repos hebdomadaire est donné le dimanche. Ce principe est d'ordre public. Les dérogations doivent être prévues par la loi et sont strictement encadrées.",
    ex: "Un employeur qui impose le travail le dimanche sans dérogation légale commet une infraction passible de sanctions pénales et civiles.",
    mots: ["dimanche", "repos dominical", "ordre public", "dérogation", "travail dominical"]
  },
  {
    art: "Art. L3132-12", titre: "Secteurs autorisés le dimanche",
    def: "Des dérogations permanentes au repos dominical sont accordées dans certains secteurs : hôtellerie, restauration, transports, santé, commerce alimentaire jusqu'à 13h, musées, cinémas, etc.",
    ex: "Un salarié d'une boulangerie peut légalement travailler le dimanche matin — c'est une dérogation permanente reconnue par la loi.",
    mots: ["dimanche", "dérogation permanente", "secteur", "commerce", "restauration", "santé"]
  },
  {
    art: "Art. L3133-1", titre: "Jours fériés légaux — liste",
    def: "Les 11 jours fériés légaux en France : 1er janvier, Lundi de Pâques, 1er mai, 8 mai, Ascension, Lundi de Pentecôte, 14 juillet, 15 août, 1er novembre, 11 novembre, 25 décembre. En Alsace-Moselle, 2 jours fériés supplémentaires s'ajoutent.",
    ex: "La convention collective peut prévoir le chômage de jours fériés supplémentaires. Ces dispositions sont toujours plus favorables que la loi.",
    mots: ["jours fériés", "11 jours", "légaux", "chômés", "Alsace-Moselle"]
  },
  {
    art: "Art. L3133-6", titre: "1er mai — doublement de salaire",
    def: "Le 1er mai est jour férié et chômé. Tout travail ce jour donne droit, en plus du salaire correspondant au travail effectué, à une indemnité égale au montant de ce salaire. Ce doublement est d'ordre public.",
    ex: "Travailler le 1er mai = salaire normal × 2. C'est le seul jour férié à bénéficier automatiquement de ce doublement légal obligatoire.",
    mots: ["1er mai", "fête du travail", "double salaire", "jour chômé", "indemnité"]
  },
  {
    art: "Art. L3141-1", titre: "Droit aux congés payés",
    def: "Tout salarié a droit à un congé payé à la charge de l'employeur, dès lors qu'il justifie d'un mois de travail effectif chez le même employeur.",
    ex: "Un CDD d'un mois donne droit à des congés payés. En cas de rupture avant la prise des CP, une indemnité compensatrice est obligatoirement versée.",
    mots: ["congés payés", "CP", "vacances", "droit", "mois de travail"]
  },
  {
    art: "Art. L3141-3", titre: "Acquisition des congés payés",
    def: "Le salarié a droit à un congé de 2,5 jours ouvrables par mois de travail effectif, soit 30 jours ouvrables (5 semaines) pour 12 mois travaillés.",
    ex: "12 mois travaillés = 30 jours ouvrables = 25 jours ouvrés (lundi-vendredi). Les dimanches et jours fériés ne comptent pas dans les jours ouvrables.",
    mots: ["congés payés", "acquisition", "2,5 jours", "30 jours", "5 semaines", "ouvrables"]
  },
  {
    art: "Art. L3141-12", titre: "Prise des congés — droit",
    def: "L'employeur ne peut pas refuser à un salarié la prise des congés légalement acquis. Les dates sont fixées par l'employeur en concertation. Un report peut être accordé mais ne peut pas conduire à la perte des congés.",
    ex: "L'employeur peut organiser les départs en congés, mais ne peut pas empêcher un salarié de prendre ses 5 semaines légales sur l'exercice.",
    mots: ["congés payés", "prise", "refus", "dates", "période de prise", "report"]
  },
  {
    art: "Art. L3141-26", titre: "Indemnité compensatrice de congés",
    def: "Lors de la rupture du contrat, si le salarié n'a pas pris tout ou partie de ses congés acquis, il perçoit une indemnité compensatrice de congés payés. Elle est due quelle que soit la cause de la rupture, y compris la faute grave.",
    ex: "Même licencié pour faute grave, le salarié conserve le droit à l'indemnité compensatrice pour ses jours de congés non pris.",
    mots: ["indemnité compensatrice", "congés", "rupture", "faute grave", "solde congés"]
  },
  {
    art: "Art. L3245-1", titre: "Prescription — salaires et HS",
    def: "L'action en paiement du salaire se prescrit par trois ans à compter du jour où le salarié a connu ou aurait dû connaître les faits permettant de l'exercer. La demande peut porter sur les 3 dernières années.",
    ex: "Des heures supplémentaires impayées en 2022 sont réclamables jusqu'en 2025. Au-delà, elles sont prescrites et ne peuvent plus faire l'objet d'une action en justice.",
    mots: ["prescription", "3 ans", "salaire", "heures supplémentaires", "réclamation", "délai"]
  },
  {
    art: "Art. L4121-1", titre: "Obligation de sécurité de l'employeur",
    def: "L'employeur prend les mesures nécessaires pour assurer la sécurité et protéger la santé physique et mentale des travailleurs. Ces mesures comprennent la prévention des risques, l'information, la formation et l'organisation adaptée.",
    ex: "Un employeur qui ignore des signalements répétés de surcharge de travail manque à son obligation de sécurité — même si aucun accident n'est encore survenu.",
    mots: ["sécurité", "santé", "obligation", "prévention", "risques", "physique", "mentale"]
  },
  {
    art: "Art. L4121-2", titre: "Neuf principes généraux de prévention",
    def: "L'employeur applique 9 principes de prévention : éviter les risques, évaluer ceux qui ne peuvent l'être, combattre à la source, adapter le travail à l'homme, tenir compte de l'évolution technique, remplacer le dangereux, planifier la prévention, prioriser les mesures collectives, donner des instructions appropriées.",
    ex: "Adapter les postes de travail pour réduire le port de charges lourdes applique le principe d'adaptation du travail à l'homme.",
    mots: ["prévention", "9 principes", "risques", "adapter", "source", "collectif"]
  },
  {
    art: "Art. L4121-3", titre: "Document unique d'évaluation des risques (DUER)",
    def: "L'employeur transcrit dans un document unique les résultats de l'évaluation des risques pour la santé et la sécurité dans chaque unité de travail de l'entreprise. Ce document est mis à jour au moins une fois par an.",
    ex: "Le DUER doit mentionner les risques de TMS, chutes, RPS, expositions chimiques. Il est accessible à tous les salariés, au médecin du travail et à l'inspection du travail.",
    mots: ["DUER", "document unique", "évaluation des risques", "inventaire", "unité de travail"]
  },
  {
    art: "Art. L4154-3", titre: "Formation renforcée à la sécurité",
    def: "Les salariés en CDD, les intérimaires et les salariés nouvellement recrutés affectés à des postes à risques particuliers bénéficient d'une formation renforcée à la sécurité avant leur prise de poste.",
    ex: "Un intérimaire affecté à un poste avec risques chimiques ou mécaniques doit recevoir une formation sécurité renforcée avant de commencer à travailler.",
    mots: ["formation sécurité", "CDD", "intérim", "risque particulier", "renforcée"]
  },
  {
    art: "Art. R4121-1", titre: "DUER — mise à jour réglementaire",
    def: "Le DUER est mis à jour au moins chaque année, lors de toute décision d'aménagement important modifiant les conditions de santé et sécurité, et à la suite de tout accident ayant entraîné des conséquences pour un salarié.",
    ex: "L'installation d'une nouvelle machine, un changement d'organisation ou un accident du travail imposent une mise à jour immédiate du DUER.",
    mots: ["DUER", "mise à jour", "annuelle", "accident", "aménagement", "R4121-1"]
  },
  {
    art: "Art. L4624-4", titre: "Inaptitude — avis médecin du travail",
    def: "Le médecin du travail peut déclarer un salarié inapte à son poste. Avant cet avis, il réalise un ou deux examens médicaux et échange avec l'employeur sur les possibilités de reclassement ou d'aménagement.",
    ex: "Une déclaration d'inaptitude suite à un burn-out oblige l'employeur à rechercher un reclassement ou à licencier pour inaptitude avec versement des indemnités.",
    mots: ["inaptitude", "médecin du travail", "reclassement", "avis", "santé", "burn-out"]
  },
  {
    art: "Art. L4131-1", titre: "Droit de retrait",
    def: "Le travailleur peut se retirer d'une situation de travail dont il a un motif raisonnable de penser qu'elle présente un danger grave et imminent pour sa vie ou sa santé. L'employeur ne peut pas lui imposer de reprendre le travail tant que le danger subsiste.",
    ex: "Un salarié peut exercer son droit de retrait face à une machine défectueuse, une violence imminente ou une exposition à un danger chimique non maîtrisé.",
    mots: ["droit de retrait", "danger grave", "imminent", "sécurité", "vie", "santé"]
  },
  {
    art: "Art. L3241-1", titre: "Paiement mensuel du salaire",
    def: "Le salaire est payé une fois par mois. Un retard répété dans le paiement constitue un manquement grave de l'employeur, pouvant justifier une prise d'acte de rupture ou une résiliation judiciaire aux torts de l'employeur.",
    ex: "Le salaire doit être versé au plus tard le dernier jour du mois. Un virement daté mais arrivé en compte le mois suivant peut constituer un retard.",
    mots: ["salaire", "paiement", "mensuel", "virement", "retard", "manquement"]
  },
  {
    art: "Art. L3243-1", titre: "Bulletin de paie — mentions obligatoires",
    def: "Lors du paiement du salaire, l'employeur remet un bulletin de paie mentionnant : identité des parties, convention collective, durée du travail, éléments du salaire, cotisations sociales, net à payer. L'omission des HS effectuées est une irrégularité.",
    ex: "Un bulletin qui ne mentionne pas les heures supplémentaires pourtant effectuées est incomplet et peut être contesté devant le conseil de prud'hommes.",
    mots: ["bulletin de paie", "fiche de paie", "mentions obligatoires", "cotisations", "net"]
  },
  {
    art: "Art. L1232-1", titre: "Cause réelle et sérieuse",
    def: "Tout licenciement pour motif personnel doit être justifié par une cause réelle et sérieuse. Réelle : exacte, objective, vérifiable. Sérieuse : suffisamment grave pour justifier la rupture. À défaut, le licenciement est sans cause réelle et sérieuse.",
    ex: "Un licenciement fondé sur une faute non prouvée ou une insuffisance professionnelle non étayée par des éléments objectifs est sans cause réelle et sérieuse.",
    mots: ["licenciement", "cause réelle et sérieuse", "motif personnel", "faute", "rupture"]
  },
  {
    art: "Art. L1234-1", titre: "Préavis — durée",
    def: "Sauf faute grave ou lourde, le contrat est rompu à l'issue d'un préavis dont la durée est fixée par convention collective ou usage, sans pouvoir être inférieure aux minimums légaux : 1 mois entre 6 mois et 2 ans d'ancienneté, 2 mois au-delà.",
    ex: "La convention collective peut prévoir un préavis plus long que le minimum légal. C'est la disposition la plus favorable au salarié qui s'applique toujours.",
    mots: ["préavis", "durée", "licenciement", "démission", "ancienneté", "faute grave"]
  },
  {
    art: "Art. L1235-3", titre: "Indemnité licenciement sans cause réelle",
    def: "En cas de licenciement sans cause réelle et sérieuse, le juge octroie une indemnité comprise entre des planchers et plafonds exprimés en mois de salaire brut, selon l'ancienneté. Ces barèmes sont fixés par décret (barème Macron).",
    ex: "Pour 5 ans d'ancienneté : entre 3 et 7 mois de salaire brut. Pour 10 ans : entre 3 et 10 mois. Le juge apprécie dans la fourchette légale.",
    mots: ["indemnité", "licenciement", "barème Macron", "mois", "sans cause réelle", "prud'hommes"]
  },
  {
    art: "Art. L1152-1", titre: "Harcèlement moral — définition",
    def: "Aucun salarié ne doit subir les agissements répétés de harcèlement moral qui ont pour objet ou pour effet une dégradation de ses conditions de travail susceptible de porter atteinte à ses droits et à sa dignité, d'altérer sa santé physique ou mentale ou de compromettre son avenir professionnel.",
    ex: "Des critiques injustifiées répétées, une mise à l'écart progressive ou des objectifs systématiquement irréalisables peuvent constituer du harcèlement moral.",
    mots: ["harcèlement moral", "agissements répétés", "dégradation", "dignité", "santé mentale"]
  },
  {
    art: "Art. L1153-1", titre: "Harcèlement sexuel",
    def: "Aucun salarié ne doit subir des faits de harcèlement sexuel : propos ou comportements à connotation sexuelle répétés portant atteinte à la dignité ou créant une situation intimidante, hostile ou offensante.",
    ex: "Le harcèlement sexuel peut constituer une faute grave du salarié auteur, justifiant son licenciement immédiat sans indemnité.",
    mots: ["harcèlement sexuel", "propos", "comportements", "dignité", "intimidant", "offensant"]
  },
  {
    art: "Art. L1221-2", titre: "Contrat de travail — liberté des formes",
    def: "Le contrat de travail à durée indéterminée peut être conclu oralement ou par écrit. Cependant, certains contrats exigent un écrit : CDD, temps partiel, apprentissage, travail temporaire.",
    ex: "Un CDI peut être valide sans contrat écrit si la relation de travail est établie. Mais l'absence d'écrit joue en défaveur de l'employeur en cas de litige.",
    mots: ["contrat oral", "CDI", "écrit", "preuve", "formalisme"]
  },
  {
    art: "Art. L1221-23", titre: "Période d'essai — durée CDI",
    def: "La période d'essai pour un CDI ne peut pas dépasser : 2 mois pour les ouvriers et employés, 3 mois pour les agents de maîtrise et techniciens, 4 mois pour les cadres. La convention collective peut prévoir des durées inférieures.",
    ex: "Un cadre recruté en CDI peut avoir au maximum 4 mois d'essai, renouvelables une fois si un accord de branche le prévoit, soit 8 mois au total.",
    mots: ["période d'essai", "CDI", "durée", "essai", "cadre", "ouvrier", "employé"]
  },
  {
    art: "Art. L1221-25", titre: "Période d'essai — renouvellement",
    def: "La période d'essai ne peut être renouvelée qu'une seule fois et uniquement si un accord de branche étendu le prévoit expressément. Le renouvellement doit être accepté par le salarié et formalisé avant l'expiration de la période initiale.",
    ex: "Un employeur ne peut pas proposer le renouvellement de l'essai le dernier jour de la période initiale — le salarié doit disposer d'un temps de réflexion suffisant.",
    mots: ["période d'essai", "renouvellement", "accord de branche", "formalisme"]
  },
  {
    art: "Art. L1226-6", titre: "Maladie — protection contre licenciement",
    def: "L'employeur ne peut pas rompre le contrat de travail d'un salarié en arrêt maladie, sauf si l'absence prolongée désorganise gravement l'entreprise et nécessite un remplacement définitif, ou en cas de faute grave étrangère à la maladie.",
    ex: "Un licenciement motivé uniquement par l'absence pour maladie est nul. L'employeur doit justifier d'une perturbation objective et d'un remplacement effectif.",
    mots: ["maladie", "arrêt", "licenciement", "protection", "absence prolongée"]
  },
  {
    art: "Art. L1226-9", titre: "Accident du travail — protection renforcée",
    def: "Au cours des périodes de suspension du contrat consécutives à un accident du travail ou une maladie professionnelle, l'employeur ne peut pas rompre le contrat. En cas de licenciement, celui-ci est nul de plein droit.",
    ex: "Un salarié victime d'un accident du travail bénéficie d'une protection absolue pendant son arrêt — aucun licenciement ne peut intervenir, sauf faute grave.",
    mots: ["accident du travail", "maladie professionnelle", "protection", "licenciement nul", "arrêt"]
  },
  {
    art: "Art. L1231-1", titre: "Rupture du CDI",
    def: "Le contrat à durée indéterminée peut être rompu à l'initiative de l'employeur (licenciement), à l'initiative du salarié (démission) ou d'un commun accord (rupture conventionnelle). Chaque mode de rupture obéit à des règles distinctes.",
    ex: "Un salarié qui souhaite quitter l'entreprise a trois options principales : démissionner (pas de chômage en général), négocier une rupture conventionnelle (chômage), ou attendre un licenciement.",
    mots: ["rupture CDI", "licenciement", "démission", "rupture conventionnelle", "modes de rupture"]
  },
  {
    art: "Art. L1232-2", titre: "Convocation à l'entretien préalable",
    def: "L'employeur qui envisage de licencier un salarié pour motif personnel doit le convoquer par lettre recommandée ou remise en main propre à un entretien préalable. La lettre indique l'objet, la date, l'heure, le lieu et la possibilité d'être assisté.",
    ex: "Un licenciement sans convocation préalable à l'entretien est irrégulier. Le salarié peut obtenir une indemnité pour ce vice de procédure, même si le motif est réel et sérieux.",
    mots: ["entretien préalable", "convocation", "licenciement", "procédure", "lettre recommandée"]
  },
  {
    art: "Art. L1232-3", titre: "Entretien préalable — déroulement",
    def: "Lors de l'entretien préalable, l'employeur indique les motifs de la décision envisagée et recueille les explications du salarié. Le salarié peut se faire assister par une personne de l'entreprise ou, s'il n'y a pas de représentants du personnel, par un conseiller extérieur.",
    ex: "Le salarié a le droit d'être accompagné à l'entretien préalable. Il doit en informer l'employeur avant l'entretien si l'assistant est extérieur à l'entreprise.",
    mots: ["entretien préalable", "assistance", "conseiller", "motifs", "dialogue"]
  },
  {
    art: "Art. L1232-6", titre: "Lettre de licenciement",
    def: "La lettre de licenciement doit être motivée. Elle énonce les motifs de la rupture. L'absence de motif ou un motif insuffisant rend le licenciement sans cause réelle et sérieuse. La lettre ne peut être envoyée qu'après l'entretien préalable, avec un délai de 2 jours ouvrables minimum.",
    ex: "Un licenciement pour une raison vague comme un manque d'investissement sans fait précis est sans cause réelle et sérieuse.",
    mots: ["lettre licenciement", "motifs", "cause réelle", "délai", "notification"]
  },
  {
    art: "Art. L1234-9", titre: "Indemnité légale de licenciement",
    def: "Tout salarié licencié ayant au moins 8 mois d'ancienneté a droit à une indemnité légale de licenciement. Son montant est au minimum de 1/4 de mois de salaire par année pour les 10 premières années, et 1/3 de mois par année au-delà.",
    ex: "Pour 5 ans d'ancienneté avec un salaire moyen de 2000 euros : 5 x 0,25 x 2000 = 2500 euros d'indemnité minimale. La convention peut prévoir plus.",
    mots: ["indemnité licenciement", "calcul", "ancienneté", "1/4 de mois", "1/3 de mois"]
  },
  {
    art: "Art. L1235-1", titre: "Contestation du licenciement",
    def: "En cas de litige, le juge apprécie le caractère réel et sérieux des motifs invoqués par l'employeur et forme sa conviction au vu des éléments fournis par les parties. Si un doute subsiste, il profite au salarié.",
    ex: "Le principe du doute en faveur du salarié est fondamental : si l'employeur ne peut pas clairement prouver la faute ou la cause, le licenciement est requalifié en licenciement sans cause réelle et sérieuse.",
    mots: ["contestation", "licenciement", "juge", "doute", "preuve", "prud'hommes"]
  },
  {
    art: "Art. L1237-14", titre: "Rupture conventionnelle — procédure",
    def: "La rupture conventionnelle est conclue après un ou plusieurs entretiens entre l'employeur et le salarié. Chaque partie dispose de 15 jours calendaires pour se rétracter après signature. Elle est ensuite soumise à homologation.",
    ex: "Le salarié peut se rétracter dans les 15 jours suivant la signature, sans avoir à se justifier. L'employeur dispose du même droit.",
    mots: ["rupture conventionnelle", "procédure", "rétractation", "15 jours", "homologation", "entretien"]
  },
  {
    art: "Art. L1237-17", titre: "Rupture conventionnelle — indemnité",
    def: "L'indemnité spécifique de rupture conventionnelle ne peut pas être inférieure à l'indemnité légale de licenciement (ou conventionnelle si plus favorable). Elle est soumise aux cotisations sociales dans la limite d'un plafond.",
    ex: "Si l'indemnité légale de licenciement serait de 5000 euros pour un salarié donné, l'indemnité de rupture conventionnelle ne peut pas être inférieure à ce montant.",
    mots: ["rupture conventionnelle", "indemnité", "calcul", "minimum légal", "cotisations"]
  },
  {
    art: "Art. L1241-1", titre: "CDD — définition et principe",
    def: "Le contrat de travail à durée déterminée est l'exception. Il ne peut être conclu que pour l'exécution d'une tâche précise et temporaire. Son recours est strictement limité aux cas énumérés par la loi (remplacement, accroissement temporaire d'activité, emplois saisonniers, etc.).",
    ex: "Embaucher quelqu'un en CDD pour occuper un poste permanent constitue une irrégularité. Le salarié peut demander la requalification en CDI.",
    mots: ["CDD", "contrat durée déterminée", "définition", "exception", "temporaire", "requalification"]
  },
  {
    art: "Art. L1244-1", titre: "CDD — indemnité de fin de contrat",
    def: "À l'issue d'un CDD, le salarié a droit à une indemnité de fin de contrat (prime de précarité) de 10% de la rémunération brute totale perçue, sauf dans certains cas (emploi saisonnier, CDD conclu avec un jeune en formation, CDD transformé en CDI).",
    ex: "Un CDD de 6 mois avec un salaire mensuel de 1800 euros bruts donne droit à 6 x 1800 x 10% = 1080 euros d'indemnité de précarité à la fin.",
    mots: ["CDD", "indemnité fin de contrat", "prime de précarité", "10%", "fin de mission"]
  },
  {
    art: "Art. L1245-1", titre: "Requalification CDD en CDI",
    def: "Est réputé à durée indéterminée tout contrat conclu en méconnaissance des dispositions légales : absence de contrat écrit, défaut de transmission dans les 2 jours, motif de recours absent ou irrégulier, terme dépassé sans rupture.",
    ex: "Un salarié dont le CDD n'a pas été transmis dans les 2 jours ouvrables suivant l'embauche peut saisir le conseil de prud'hommes pour obtenir la requalification en CDI.",
    mots: ["requalification", "CDD", "CDI", "irrégularité", "contrat écrit", "délai de transmission"]
  },
  {
    art: "Art. L1121-1", titre: "Restrictions aux libertés individuelles",
    def: "Nul ne peut apporter aux droits des personnes et aux libertés individuelles et collectives des restrictions qui ne seraient pas justifiées par la nature de la tâche à accomplir ni proportionnées au but recherché.",
    ex: "Une clause de non-concurrence trop large, une clause de mobilité abusive ou une interdiction de s'habiller de façon religieuse sans justification professionnelle objective peuvent être contestées.",
    mots: ["libertés individuelles", "restrictions", "proportionnalité", "droits", "clause"]
  },
  {
    art: "Art. L1132-1", titre: "Discrimination — liste des critères prohibés",
    def: "Aucune personne ne peut être écartée d'une procédure de recrutement ou de l'accès à un stage, licenciée ou faire l'objet d'une mesure discriminatoire en raison de son origine, sexe, moeurs, orientation sexuelle, identité de genre, âge, situation de famille, grossesse, appartenance ethnique, opinions politiques, activité syndicale, religion, apparence physique, patronyme, état de santé, handicap, lieu de résidence, domiciliation bancaire.",
    ex: "Un refus d'embauche motivé par la religion ou le handicap du candidat est une discrimination directe, passible de sanctions pénales et civiles.",
    mots: ["discrimination", "critères prohibés", "origine", "sexe", "handicap", "religion", "âge", "grossesse"]
  },
  {
    art: "Art. L1134-1", titre: "Discrimination — charge de la preuve",
    def: "En matière de discrimination, le salarié présente des éléments de fait laissant supposer l'existence d'une discrimination directe ou indirecte. Au vu de ces éléments, il incombe à l'employeur de prouver que sa décision est justifiée par des éléments objectifs étrangers à toute discrimination.",
    ex: "Si un salarié montre qu'il est moins bien payé que des collègues de même niveau, l'employeur doit justifier cet écart par des éléments objectifs (ancienneté, compétences).",
    mots: ["discrimination", "charge de la preuve", "éléments de fait", "justification", "objectif"]
  },
  {
    art: "Art. L1132-3-3", titre: "Protection des lanceurs d'alerte",
    def: "Aucun salarié ne peut être sanctionné, licencié ou faire l'objet d'une mesure discriminatoire pour avoir relaté ou témoigné de bonne foi de faits constitutifs d'un délit ou d'un crime, ou pour avoir signalé une alerte éthique.",
    ex: "Un salarié qui signale des pratiques frauduleuses à son employeur ou aux autorités est protégé contre tout représailles, y compris le licenciement.",
    mots: ["lanceur d'alerte", "protection", "signalement", "alerte éthique", "représailles"]
  },
  {
    art: "Art. L1152-2", titre: "Harcèlement moral — protection des témoins",
    def: "Aucun salarié ne peut être sanctionné, licencié ou faire l'objet d'une mesure discriminatoire pour avoir subi ou refusé de subir des agissements de harcèlement moral, ou pour avoir témoigné ou relaté de tels agissements.",
    ex: "Un salarié témoin de harcèlement moral qui témoigne pour une collègue est protégé au même titre que la victime directe.",
    mots: ["harcèlement moral", "témoin", "protection", "signalement", "représailles"]
  },
  {
    art: "Art. L1152-3", titre: "Harcèlement moral — nullité",
    def: "Toute rupture du contrat de travail intervenue en méconnaissance des dispositions relatives au harcèlement moral, toute disposition ou tout acte contraire est nul.",
    ex: "Le licenciement d'un salarié en raison de plaintes pour harcèlement moral est nul de plein droit. Le salarié peut demander sa réintégration ou des dommages et intérêts.",
    mots: ["harcèlement moral", "nullité", "licenciement nul", "réintégration"]
  },
  {
    art: "Art. L1153-5", titre: "Harcèlement sexuel — sanctions",
    def: "L'employeur prend toutes dispositions nécessaires en vue de prévenir les faits de harcèlement sexuel, d'y mettre un terme et de les sanctionner. L'auteur de harcèlement sexuel peut être licencié pour faute grave.",
    ex: "L'employeur qui ne prend aucune mesure après une plainte pour harcèlement sexuel manque à son obligation de sécurité et engage sa responsabilité.",
    mots: ["harcèlement sexuel", "prévention", "sanctions", "faute grave", "obligation employeur"]
  },
  {
    art: "Art. L2141-1", titre: "Liberté syndicale",
    def: "Tout salarié peut librement adhérer au syndicat professionnel de son choix. Aucun employeur ne peut prendre en considération l'appartenance ou non à un syndicat pour arrêter ses décisions concernant notamment le recrutement, la conduite et la répartition du travail, la formation professionnelle, les salaires et les mesures disciplinaires.",
    ex: "Un employeur qui refuse une promotion à un délégué syndical en raison de son activité syndicale commet une discrimination syndicale.",
    mots: ["liberté syndicale", "syndicat", "discrimination syndicale", "adhésion", "représentation"]
  },
  {
    art: "Art. L2143-1", titre: "Délégué syndical",
    def: "Chaque syndicat représentatif dans l'entreprise ou l'établissement d'au moins 50 salariés peut désigner un ou plusieurs délégués syndicaux pour le représenter auprès de l'employeur. Le délégué bénéficie d'heures de délégation et d'une protection contre le licenciement.",
    ex: "Un délégué syndical dispose de 12h de délégation par mois dans une entreprise de 50 à 150 salariés, et jusqu'à 18h dans une entreprise de plus de 500 salariés.",
    mots: ["délégué syndical", "heures de délégation", "protection", "représentation", "syndicat"]
  },
  {
    art: "Art. L2231-1", titre: "Négociation collective",
    def: "Les conventions et accords collectifs de travail déterminent leurs conditions de validité et leurs effets. Ils sont conclus entre d'une part des organisations syndicales représentatives et d'autre part des organisations d'employeurs représentatives ou des employeurs.",
    ex: "La négociation collective permet d'adapter les règles légales aux spécificités d'une branche ou d'une entreprise, dans la limite du respect des droits fondamentaux des salariés.",
    mots: ["négociation collective", "convention collective", "accord collectif", "syndicat", "branche"]
  },
  {
    art: "Art. L2232-12", titre: "Accord d'entreprise — validité",
    def: "La validité d'un accord d'entreprise est subordonnée à sa signature par des syndicats ayant recueilli au moins 50% des suffrages exprimés aux dernières élections professionnelles, ou par des syndicats majoritaires approuvés par référendum.",
    ex: "Un accord d'entreprise signé uniquement par un syndicat minoritaire (moins de 50% des voix) n'est valable que si les autres syndicats approuvent ou si un référendum est organisé.",
    mots: ["accord d'entreprise", "validité", "50%", "syndicats majoritaires", "référendum"]
  },
  {
    art: "Art. L2262-1", titre: "Force obligatoire des conventions collectives",
    def: "Les groupements liés par une convention ou un accord collectif de travail sont tenus de ne pas faire obstacle à son exécution. Les membres de ces groupements sont tenus de respecter les dispositions de la convention ou de l'accord.",
    ex: "Un employeur couvert par une convention collective doit appliquer toutes ses dispositions même s'il n'est pas membre de l'organisation patronale signataire.",
    mots: ["convention collective", "force obligatoire", "application", "extension", "branche"]
  },
  {
    art: "Art. L2281-1", titre: "Expression des salariés",
    def: "Les salariés bénéficient d'un droit à l'expression directe et collective sur le contenu, les conditions d'exercice et l'organisation de leur travail. Ce droit ne peut pas donner lieu à des sanctions disciplinaires.",
    ex: "Un salarié peut s'exprimer librement lors d'une réunion d'expression sur les dysfonctionnements de l'organisation sans risquer de sanctions.",
    mots: ["expression des salariés", "droit d'expression", "contenu du travail", "organisation", "liberté"]
  },
  {
    art: "Art. L2311-1", titre: "Comité Social et Economique — seuils",
    def: "Le comité social et économique est mis en place dans les entreprises d'au moins 11 salariés. Ses attributions varient selon l'effectif : elles sont plus étendues au-dessus de 50 salariés.",
    ex: "En dessous de 11 salariés, il n'y a pas de CSE obligatoire. Entre 11 et 49, le CSE a des attributions réduites (pas de CSSCT, pas de consultation obligatoire sur la stratégie).",
    mots: ["CSE", "seuils", "11 salariés", "50 salariés", "comité social économique"]
  },
  {
    art: "Art. L2315-1", titre: "Heures de délégation CSE",
    def: "Les membres de la délégation du personnel du CSE disposent du temps nécessaire à l'exercice de leurs fonctions. Ce temps est fixé par décret selon l'effectif. Il est de plein droit considéré comme temps de travail et rémunéré comme tel.",
    ex: "Un élu CSE dans une entreprise de 300 salariés dispose de 22h de délégation par mois. Ces heures sont payées même si l'employeur conteste leur utilisation — la régularisation se fait a posteriori.",
    mots: ["délégation", "heures CSE", "élu", "temps de travail", "rémunération"]
  },
  {
    art: "Art. L2323-1", titre: "Information et consultation du CSE",
    def: "L'employeur informe et consulte le CSE sur les questions intéressant l'organisation, la gestion et la marche générale de l'entreprise, notamment sur les conditions de travail. La consultation doit être préalable à toute décision importante.",
    ex: "Une restructuration, un plan social, une modification importante des conditions de travail nécessitent la consultation préalable du CSE. Ne pas le consulter peut entraîner la suspension de la décision.",
    mots: ["CSE", "consultation", "information", "organisation", "décision", "préalable"]
  },
  {
    art: "Art. L2411-1", titre: "Protection des représentants du personnel",
    def: "Le licenciement d'un salarié protégé (élu CSE, délégué syndical, conseiller prud'homal, etc.) nécessite l'autorisation préalable de l'inspecteur du travail. Sans cette autorisation, le licenciement est nul.",
    ex: "Un employeur qui licencie un élu CSE sans demander l'autorisation de l'inspection du travail commet une faute grave. Le licenciement est nul et le salarié a droit à réintégration.",
    mots: ["salarié protégé", "autorisation inspection du travail", "licenciement nul", "élu", "délégué"]
  },
  {
    art: "Art. L3111-1", titre: "Champ d'application durée du travail",
    def: "Les dispositions du Code du travail relatives à la durée du travail s'appliquent à tous les employeurs de droit privé ainsi qu'à leurs salariés. Certaines catégories disposent de règles spécifiques (cadres dirigeants, VRP, apprentis, etc.).",
    ex: "Les cadres dirigeants, qui disposent d'une très large autonomie et participent à la direction, ne sont pas soumis aux durées légales et maximales du travail.",
    mots: ["durée du travail", "champ application", "cadres dirigeants", "exceptions", "autonomie"]
  },
  {
    art: "Art. L3121-8", titre: "Durée maximale quotidienne",
    def: "La durée quotidienne du travail effectif par salarié ne peut excéder dix heures, sauf en cas de dérogation accordée par convention ou accord collectif ou autorisation de l'inspecteur du travail.",
    ex: "Travailler 11h dans une journée est irrégulier sauf si un accord collectif le permet explicitement et dans les limites autorisées.",
    mots: ["durée maximale", "10 heures", "quotidien", "dérogation", "accord collectif"]
  },
  {
    art: "Art. L3121-9", titre: "Durée maximale hebdomadaire absolue",
    def: "Au cours d'une même semaine, la durée maximale hebdomadaire du travail est de quarante-huit heures. Aucune dérogation individuelle n'est possible, même avec l'accord du salarié.",
    ex: "Même si un salarié accepte de travailler 50h dans une semaine, c'est illégal. L'employeur engage sa responsabilité et peut être sanctionné par l'inspection du travail.",
    mots: ["48 heures", "durée maximale", "hebdomadaire", "absolu", "dérogation impossible"]
  },
  {
    art: "Art. L3121-29", titre: "Contingent d'heures supplémentaires",
    def: "Un accord collectif d'entreprise ou de branche peut fixer le contingent d'heures supplémentaires. A défaut d'accord, le contingent est fixé par décret à 220 heures par an et par salarié.",
    ex: "Si l'entreprise dispose d'un accord collectif, le contingent peut être inférieur ou supérieur à 220h. En l'absence d'accord, la limite légale de 220h s'applique.",
    mots: ["contingent", "220 heures", "accord collectif", "dérogation", "annuel"]
  },
  {
    art: "Art. L3121-31", titre: "Dépassement du contingent",
    def: "Les heures supplémentaires accomplies au-delà du contingent annuel ouvrent droit, en plus de la majoration salariale, à une contrepartie obligatoire sous forme de repos. Les modalités de ce repos sont définies par accord collectif ou, à défaut, par décret.",
    ex: "Au-delà de 220h de HS dans l'année, chaque heure supplémentaire génère automatiquement un droit à repos compensateur, en plus de la majoration de salaire.",
    mots: ["dépassement contingent", "contrepartie repos", "220h", "repos compensateur obligatoire"]
  },
  {
    art: "Art. L3121-37", titre: "Remplacement du paiement par du repos",
    def: "Une convention ou un accord collectif d'entreprise ou d'établissement peut prévoir le remplacement de tout ou partie du paiement des heures supplémentaires et des majorations par un repos compensateur équivalent.",
    ex: "Si un accord d'entreprise le prévoit, les HS peuvent être compensées par des RTT plutôt que payées avec majoration. Le total du repos accordé doit correspondre au montant des heures majorées.",
    mots: ["repos compensateur de remplacement", "RCR", "RTT", "accord", "remplacement paiement"]
  },
  {
    art: "Art. L3121-39", titre: "Aménagement du temps de travail",
    def: "Un accord collectif d'entreprise ou, à défaut, un accord de branche peut mettre en place un aménagement du temps de travail sur une période supérieure à la semaine. La durée de la période de référence ne peut dépasser 3 ans si un accord de branche étendu le prévoit.",
    ex: "L'annualisation du temps de travail permet de faire varier les horaires selon les saisons (ex : plus en été, moins en hiver) sans que chaque semaine soit prise isolément.",
    mots: ["aménagement temps de travail", "annualisation", "accord collectif", "période de référence", "modulation"]
  },
  {
    art: "Art. L3122-3", titre: "Travail de nuit — accord préalable",
    def: "Le travail de nuit est mis en place par une convention ou un accord collectif de branche étendu ou un accord d'entreprise ou d'établissement. Cet accord doit comporter les justifications du recours au travail de nuit et les mesures de protection des travailleurs.",
    ex: "L'employeur ne peut pas décider seul de faire travailler ses salariés la nuit. Un accord collectif est nécessaire, sauf urgence absolue et temporaire.",
    mots: ["travail de nuit", "accord collectif", "obligation", "justification", "mise en place"]
  },
  {
    art: "Art. L3122-13", titre: "Travail de nuit — repos quotidien",
    def: "Le repos quotidien des travailleurs de nuit est de 11 heures. Il doit être pris dans les conditions prévues aux articles L3131-1 et suivants. Aucune dérogation n'est possible pour les travailleurs de nuit.",
    ex: "Un travailleur de nuit finissant à 6h du matin ne peut pas reprendre son poste avant 17h. Le repos de 11h est incompressible, y compris pour le travail de nuit.",
    mots: ["travail de nuit", "repos quotidien", "11 heures", "incompressible"]
  },
  {
    art: "Art. L3133-3", titre: "Jours fériés — chômage",
    def: "Dans les établissements et professions qui relèvent de l'article L3133-1, les jours fériés légaux ne peuvent être accordés aux salariés qu'à la condition que l'employeur ne leur fasse pas perdre de rémunération.",
    ex: "Un jour férié chômé ne peut pas être déduit du salaire du salarié. L'employeur ne peut pas non plus imposer sa récupération sur d'autres jours.",
    mots: ["jours fériés", "chômage", "rémunération", "perte", "récupération"]
  },
  {
    art: "Art. L3133-4", titre: "Jours fériés — enfants",
    def: "Dans les établissements industriels, les enfants de moins de 18 ans et les femmes ne peuvent être employés les jours de fêtes légales que dans les établissements dont le personnel bénéficie d'un repos compensateur.",
    ex: "Les mineurs de moins de 18 ans ne peuvent en principe pas travailler les jours fériés légaux.",
    mots: ["jours fériés", "mineurs", "moins de 18 ans", "repos compensateur"]
  },
  {
    art: "Art. L3141-5", titre: "Congés payés — assimilation à temps de travail",
    def: "Sont notamment assimilés à un mois de travail effectif pour la détermination des droits à congé : les périodes de congé payé précédentes, les périodes de congé maternité, paternité, adoption, les périodes d'arrêt pour accident du travail ou maladie professionnelle.",
    ex: "Un salarié en congé maternité ou en arrêt suite à un accident du travail continue d'acquérir des congés payés normalement.",
    mots: ["congés payés", "assimilation", "accident du travail", "maternité", "acquisition"]
  },
  {
    art: "Art. L3141-13", titre: "Ordre des départs en congés",
    def: "A l'intérieur de la période des congés, l'ordre et les dates de départ sont fixés par l'employeur après avis du CSE, en tenant compte de la situation de famille des bénéficiaires et de leur ancienneté.",
    ex: "L'employeur peut imposer les dates de départ en congés mais doit tenir compte des enfants scolarisés et de la situation familiale (conjoint travaillant dans la même entreprise, etc.).",
    mots: ["congés payés", "ordre de départ", "dates", "famille", "ancienneté", "CSE"]
  },
  {
    art: "Art. L3141-16", titre: "Congés — modification des dates",
    def: "L'employeur ne peut pas, sauf circonstances exceptionnelles, modifier les dates de départ en congé dans le délai d'un mois avant la date prévue.",
    ex: "Un employeur qui modifie les dates de congés d'un salarié moins d'un mois avant le départ prévu doit rembourser les frais engagés non remboursables (billets non remboursables, locations, etc.).",
    mots: ["congés payés", "modification dates", "délai", "frais", "circonstances exceptionnelles"]
  },
  {
    art: "Art. L3151-1", titre: "Compte épargne-temps — CET",
    def: "Une convention ou un accord collectif d'entreprise ou de branche peut instituer un compte épargne-temps permettant au salarié d'accumuler des droits à congé rémunéré ou de se constituer une épargne.",
    ex: "Le CET peut accueillir des jours de RTT non pris, des heures supplémentaires non payées, des jours de congés payés au-delà de 4 semaines, etc. Il permet de financer des congés futurs.",
    mots: ["compte épargne-temps", "CET", "épargne", "congé", "RTT", "heures supplémentaires"]
  },
  {
    art: "Art. L3171-2", titre: "Décompte de la durée du travail",
    def: "L'employeur établit les documents nécessaires au décompte de la durée de travail, des repos compensateurs acquis et de leur prise effective, pour chaque salarié. Ces documents sont tenus à la disposition des agents de contrôle.",
    ex: "L'employeur doit tenir un registre ou système de décompte des heures effectuées. En l'absence de décompte, la preuve des horaires réels incombe à l'employeur.",
    mots: ["décompte", "durée du travail", "registre", "preuve", "inspection du travail"]
  },
  {
    art: "Art. L3171-4", titre: "Preuve des heures supplémentaires",
    def: "En cas de litige relatif à l'existence ou au nombre des heures de travail accomplies, l'employeur fournit au juge les éléments de nature à justifier les horaires effectivement réalisés par le salarié. Le juge forme sa conviction en tenant compte de l'ensemble des éléments produits.",
    ex: "Si un salarié produit des agendas, des mails tardifs, des témoignages attestant d'heures non payées, l'employeur doit fournir ses propres preuves. En cas de doute, le juge tranche en faveur du salarié.",
    mots: ["preuve heures supplémentaires", "litige", "juge", "éléments de preuve", "doute"]
  },
  {
    art: "Art. L3211-1", titre: "Salaire minimum interprofessionnel de croissance — SMIC",
    def: "Tout salarié perçoit une rémunération au moins égale au salaire minimum interprofessionnel de croissance (SMIC). Aucune dérogation n'est possible. Le SMIC est revalorisé au moins une fois par an.",
    ex: "En 2024, le SMIC horaire brut est de 11,65 euros. Aucun salarié ne peut légalement percevoir moins, même à temps partiel. La convention collective peut prévoir plus.",
    mots: ["SMIC", "salaire minimum", "rémunération", "revalorisation", "plancher"]
  },
  {
    art: "Art. L3231-1", titre: "Principe d'égalité de rémunération",
    def: "Tout employeur assure, pour un même travail ou pour un travail de valeur égale, l'égalité de rémunération entre les femmes et les hommes. Sont considérés comme ayant une valeur égale les travaux qui exigent des salariés un ensemble comparable de connaissances et de capacités.",
    ex: "Si deux salariés (homme et femme) occupent le même poste avec la même expérience et les mêmes résultats, leur salaire doit être identique. Tout écart doit être justifié par des éléments objectifs.",
    mots: ["égalité salariale", "homme femme", "même travail", "valeur égale", "discrimination salariale"]
  },
  {
    art: "Art. L3232-1", titre: "Garantie de rémunération mensuelle",
    def: "Les salariés dont l'horaire de travail est réduit en dessous de 35 heures sans accord collectif perçoivent une allocation complémentaire pour maintenir leur rémunération.",
    ex: "Si un employeur réduit les horaires de ses salariés sans accord de réduction du temps de travail, il doit verser une allocation complémentaire pour éviter toute perte de salaire.",
    mots: ["garantie de rémunération", "réduction horaires", "allocation complémentaire", "35h"]
  },
  {
    art: "Art. L3242-1", titre: "Bulletins de paie — conservation",
    def: "L'employeur est tenu de remettre au salarié, lors du paiement du salaire, un bulletin de paie. L'employeur conserve les bulletins de paie pendant 5 ans. Le salarié n'est soumis à aucune obligation de conservation vis-à-vis de l'employeur.",
    ex: "Le salarié a intérêt à conserver ses bulletins de paie sans limitation de durée car ils peuvent servir de preuve dans des litiges sur les retraites, les HS, ou les rappels de salaire.",
    mots: ["bulletin de paie", "conservation", "5 ans", "employeur", "preuve"]
  },
  {
    art: "Art. L3261-1", titre: "Remboursement frais de transport",
    def: "L'employeur prend en charge 50% du prix des titres d'abonnement souscrits par ses salariés pour leurs déplacements accomplis au moyen de transports publics entre leur résidence habituelle et leur lieu de travail.",
    ex: "Un salarié qui prend les transports en commun pour se rendre au travail a droit au remboursement de 50% de son abonnement mensuel, exonéré de cotisations sociales.",
    mots: ["frais de transport", "remboursement", "50%", "abonnement", "transports en commun"]
  },
  {
    art: "Art. L4111-1", titre: "Champ application santé sécurité",
    def: "Les dispositions relatives à la santé et à la sécurité au travail s'appliquent aux employeurs de droit privé ainsi qu'à leurs salariés. Des règles spécifiques s'appliquent à certains secteurs (mines, transports, nucléaire, etc.).",
    ex: "Tous les employeurs, quelle que soit la taille de l'entreprise, sont soumis aux obligations de santé et sécurité. Même une TPE de 2 salariés doit évaluer les risques.",
    mots: ["santé sécurité", "champ d'application", "employeur", "obligation", "TPE"]
  },
  {
    art: "Art. L4131-3", titre: "Droit de retrait — abus",
    def: "Aucune sanction, aucune retenue de salaire ne peut être prise à l'encontre d'un salarié ou d'un groupe de salariés qui se sont retirés d'une situation de travail dont ils avaient un motif raisonnable de penser qu'elle présentait un danger grave et imminent. Toutefois, en cas d'abus, des sanctions peuvent être envisagées.",
    ex: "Si un salarié exerce son droit de retrait sans motif raisonnable, l'employeur peut retenir les heures non travaillées mais ne peut pas sanctionner disciplinairement le seul exercice du droit.",
    mots: ["droit de retrait", "abus", "retenue de salaire", "motif raisonnable", "protection"]
  },
  {
    art: "Art. L4141-1", titre: "Formation à la sécurité — obligation",
    def: "L'employeur organise une formation pratique et appropriée en matière de sécurité, au bénéfice des salariés nouvellement embauchés, de ceux qui changent de poste ou de technique, et des travailleurs temporaires.",
    ex: "Un nouvel employé doit recevoir une formation sécurité à l'embauche. Cette formation doit être renouvelée lors de tout changement de poste ou d'équipement présentant de nouveaux risques.",
    mots: ["formation sécurité", "obligation", "embauche", "changement de poste", "intérimaire"]
  },
  {
    art: "Art. L4142-1", titre: "Formation sécurité — temps et rémunération",
    def: "Le temps consacré à la formation à la sécurité ainsi que les frais engagés pour la suivre sont à la charge de l'employeur. Ce temps est considéré comme du temps de travail effectif et rémunéré comme tel.",
    ex: "Si un employeur organise une formation sécurité, le salarié est rémunéré pour ce temps, même si la formation se déroule en dehors de ses horaires habituels.",
    mots: ["formation sécurité", "temps travail", "rémunération", "frais", "charge employeur"]
  },
  {
    art: "Art. L4161-1", titre: "Pénibilité — facteurs de risques",
    def: "Certains facteurs de risques professionnels liés à des contraintes physiques marquées, à un environnement physique agressif ou à certains rythmes de travail sont pris en compte pour la prévention de la pénibilité. Les salariés exposés cumulent des points sur leur compte professionnel de prévention.",
    ex: "Les facteurs de pénibilité incluent : travail de nuit, travail en équipes successives, activité en hyperbarie, températures extrêmes, bruit, vibrations mécaniques, agents chimiques dangereux, postures pénibles, port de charges lourdes.",
    mots: ["pénibilité", "facteurs de risques", "C2P", "compte professionnel", "nuit", "charges"]
  },
  {
    art: "Art. L4162-1", titre: "Compte professionnel de prévention — C2P",
    def: "Le compte professionnel de prévention permet aux salariés exposés à des facteurs de pénibilité de cumuler des points utilisables pour : financer une formation, réduire leur temps de travail, valider des trimestres de retraite.",
    ex: "Un salarié qui travaille de nuit peut cumuler des points C2P et les utiliser pour partir à la retraite plus tôt ou pour financer une reconversion professionnelle.",
    mots: ["C2P", "compte professionnel de prévention", "pénibilité", "points", "retraite anticipée", "formation"]
  },
  {
    art: "Art. L4221-1", titre: "Règlement intérieur — obligation",
    def: "Le règlement intérieur est obligatoire dans les entreprises d'au moins 50 salariés. Il fixe les mesures d'application de la réglementation en matière de santé et de sécurité dans l'entreprise ainsi que les règles générales et permanentes relatives à la discipline.",
    ex: "Le règlement intérieur doit être soumis au CSE, affiché dans l'entreprise et communiqué à l'inspection du travail avant d'entrer en vigueur. Les clauses illégales peuvent être annulées.",
    mots: ["règlement intérieur", "50 salariés", "discipline", "santé sécurité", "CSE", "affichage"]
  },
  {
    art: "Art. L4321-1", titre: "Machines et équipements de travail",
    def: "Les équipements de travail et les moyens de protection mis en service ou utilisés dans les établissements doivent être équipés, installés, utilisés, réglés et maintenus de manière à préserver la santé et la sécurité des travailleurs.",
    ex: "Un employeur qui laisse utiliser une machine défectueuse engage sa responsabilité en cas d'accident. La maintenance préventive est une obligation légale.",
    mots: ["machines", "équipements", "maintenance", "sécurité", "obligation employeur"]
  },
  {
    art: "Art. L4351-1", titre: "Agents chimiques dangereux",
    def: "L'employeur évalue les risques que peuvent présenter les agents chimiques dangereux pour la santé et la sécurité des travailleurs lors du travail, y compris les risques liés aux agents chimiques cancérogènes, mutagènes ou toxiques pour la reproduction.",
    ex: "Toute exposition à des produits chimiques (peintures, solvants, pesticides, amiante) doit être évaluée et minimisée. L'employeur doit tenir un registre des expositions.",
    mots: ["agents chimiques", "dangereux", "cancérogènes", "exposition", "évaluation des risques"]
  },
  {
    art: "Art. L4411-1", titre: "Médecin du travail — indépendance",
    def: "Le médecin du travail est le conseiller de l'employeur, des travailleurs, des représentants du personnel et des services sociaux, notamment sur les dispositions et mesures nécessaires afin d'éviter ou de diminuer les risques professionnels.",
    ex: "Le médecin du travail est lié par le secret médical et est indépendant de l'employeur pour ses décisions médicales. Ses recommandations s'imposent à l'employeur.",
    mots: ["médecin du travail", "indépendance", "conseiller", "secret médical", "visite médicale"]
  },
  {
    art: "Art. L4624-1", titre: "Suivi individuel de l'état de santé",
    def: "Tout travailleur bénéficie d'un suivi individuel de son état de santé. Les conditions et la périodicité de ce suivi sont définies par décret. Certains salariés exposés à des risques particuliers bénéficient d'un suivi renforcé.",
    ex: "Les salariés exposés à des risques particuliers (nuit, pénibilité, produits dangereux, etc.) bénéficient d'une visite médicale d'aptitude à l'embauche et d'un suivi renforcé par le médecin du travail.",
    mots: ["suivi médical", "visite médicale", "médecin du travail", "aptitude", "suivi renforcé"]
  },
  {
    art: "Art. L5121-1", titre: "Aide à l'embauche et à la formation",
    def: "L'État peut instituer des aides financières pour favoriser l'accès ou le retour à l'emploi des personnes rencontrant des difficultés particulières. Ces aides peuvent prendre la forme de subventions à l'employeur ou au travailleur.",
    ex: "Les contrats aidés (CUI, PEC, etc.) permettent à des personnes éloignées de l'emploi d'être recrutées avec une prise en charge partielle du salaire par l'État.",
    mots: ["aide à l'embauche", "contrats aidés", "État", "emploi", "subvention"]
  },
  {
    art: "Art. L5211-1", titre: "Service public de l'emploi",
    def: "Le service public de l'emploi comprend notamment France Travail (ex-Pôle emploi), l'APEC, les missions locales et Cap emploi. Leur mission est de placer les demandeurs d'emploi et d'accompagner les employeurs dans le recrutement.",
    ex: "France Travail accompagne les demandeurs d'emploi dans leur recherche, verse les allocations chômage et propose des formations. Son accompagnement est obligatoire pour percevoir les allocations.",
    mots: ["service public emploi", "France Travail", "Pôle emploi", "chômage", "APEC", "missions locales"]
  },
  {
    art: "Art. L5421-1", titre: "Assurance chômage — principe",
    def: "Les travailleurs involontairement privés d'emploi aptes au travail et recherchant un emploi ont droit à un revenu de remplacement dans les conditions prévues par la règlementation de l'assurance chômage.",
    ex: "L'assurance chômage couvre la perte involontaire d'emploi (licenciement, fin de CDD, rupture conventionnelle). La démission est en principe exclue, sauf démissions légitimes définies par France Travail.",
    mots: ["assurance chômage", "allocation", "revenu de remplacement", "licenciement", "ARE"]
  },
  {
    art: "Art. L5422-1", titre: "Allocation de retour à l'emploi — ARE",
    def: "L'allocation d'assurance est attribuée aux travailleurs involontairement privés d'emploi qui remplissent des conditions d'activité antérieure et s'inscrivent auprès de France Travail. Elle est calculée en fonction des salaires antérieurs.",
    ex: "Pour percevoir l'ARE, il faut avoir travaillé au moins 6 mois (130 jours ou 910 heures) dans les 24 derniers mois (36 mois pour les plus de 53 ans). Le montant est de 57% du salaire journalier de référence.",
    mots: ["ARE", "allocation chômage", "conditions", "6 mois", "calcul", "France Travail"]
  },
  {
    art: "Art. L5213-1", titre: "Travailleurs handicapés — emploi obligatoire",
    def: "Tout employeur occupant au moins 20 salariés est assujetti à l'obligation d'emploi de travailleurs handicapés dans la proportion de 6% de l'effectif total de ses salariés. En cas de non-respect, une contribution est versée à l'OETH (ex-Agefiph).",
    ex: "Une entreprise de 100 salariés doit employer l'équivalent de 6 travailleurs handicapés (en ETP). A défaut, elle verse une contribution financière à l'OETH.",
    mots: ["travailleurs handicapés", "OETH", "Agefiph", "6%", "obligation d'emploi", "contribution"]
  },
  {
    art: "Art. L5331-1", titre: "Travail illégal — définition",
    def: "Est qualifié de travail illégal : le travail dissimulé, le marchandage, le prêt illicite de main-d'oeuvre, l'emploi d'étrangers sans titre de travail, les fraudes aux revenus de remplacement et la fausse déclaration.",
    ex: "Un employeur qui embauche un salarié sans le déclarer à l'URSSAF commet du travail dissimulé, passible de 3 ans d'emprisonnement et 45 000 euros d'amende.",
    mots: ["travail illégal", "travail dissimulé", "marchandage", "sanction", "URSSAF"]
  },
  {
    art: "Art. L6111-1", titre: "Formation professionnelle — droit",
    def: "La formation professionnelle tout au long de la vie constitue une obligation nationale. Elle vise à permettre à chaque personne, indépendamment de son statut, d'acquérir et d'actualiser des connaissances et des compétences favorisant son évolution professionnelle.",
    ex: "Tout salarié a droit à se former tout au long de sa carrière, que ce soit via le CPF, le plan de développement des compétences de l'entreprise, ou d'autres dispositifs.",
    mots: ["formation professionnelle", "droit à la formation", "tout au long de la vie", "compétences"]
  },
  {
    art: "Art. L6111-5", titre: "Compte personnel de formation — CPF",
    def: "Toute personne dispose, dès son entrée sur le marché du travail et jusqu'à son départ à la retraite, d'un compte personnel de formation. Ce compte est alimenté en euros chaque année selon la durée du travail accomplie.",
    ex: "Le CPF est alimenté à hauteur de 500 euros par an pour un salarié à temps plein (800 euros pour les non-qualifiés), dans la limite d'un plafond de 5000 euros (8000 euros pour les non-qualifiés).",
    mots: ["CPF", "compte personnel de formation", "euros", "formation", "financement"]
  },
  {
    art: "Art. L6321-1", titre: "Plan de développement des compétences",
    def: "L'employeur assure l'adaptation des salariés à leur poste de travail. Il veille au maintien de leur capacité à occuper un emploi, au regard notamment de l'évolution des emplois, des technologies et des organisations. Il peut proposer des formations allant au-delà de cette obligation.",
    ex: "Un employeur qui néglige la formation de ses salariés face à l'évolution technologique manque à son obligation d'employabilité. En cas de licenciement économique, cette carence peut lui être reprochée.",
    mots: ["plan de développement", "compétences", "adaptation", "employabilité", "formation obligatoire"]
  },
  {
    art: "Art. L6323-1", titre: "CPF — utilisation",
    def: "Le compte personnel de formation peut être utilisé par son titulaire pour financer des formations certifiantes, notamment pour obtenir une qualification ou acquérir des compétences favorisant son évolution professionnelle.",
    ex: "Un salarié peut utiliser son CPF pour passer le permis B (dans certains cas), obtenir un titre professionnel, ou se reconvertir vers un nouveau métier.",
    mots: ["CPF", "utilisation", "formation certifiante", "qualification", "reconversion"]
  },
  {
    art: "Art. L6341-1", titre: "Plan de formation — hors temps de travail",
    def: "Lorsque les formations sont dispensées hors du temps de travail, elles font l'objet d'un accord entre le salarié et l'employeur, et donnent lieu au versement d'une allocation de formation égale à 50% de la rémunération nette de référence.",
    ex: "Si un employeur demande à un salarié de se former le soir ou le week-end, il doit lui verser 50% de son salaire net pour ces heures de formation hors temps de travail.",
    mots: ["formation hors temps de travail", "accord", "allocation formation", "50%"]
  },
  {
    art: "Art. L8112-1", titre: "Inspection du travail — missions",
    def: "Les agents de l'inspection du travail sont chargés de veiller à l'application des dispositions du code du travail et des lois et règlements non codifiés relatifs au régime du travail. Ils sont également chargés, concurremment avec les officiers de police judiciaire, de constater les infractions.",
    ex: "L'inspecteur du travail peut visiter n'importe quel établissement à n'importe quelle heure du jour ou de nuit. Il peut dresser des procès-verbaux, mettre en demeure l'employeur ou saisir le parquet.",
    mots: ["inspection du travail", "missions", "contrôle", "procès-verbal", "mise en demeure"]
  },
  {
    art: "Art. L8112-2", titre: "Inspection du travail — pouvoirs",
    def: "Les agents de contrôle peuvent pénétrer librement dans tout établissement assujetti à leur contrôle, se faire communiquer tous documents, effectuer des enquêtes et prélèvements, et être assistés d'experts.",
    ex: "L'inspecteur du travail peut demander les registres de présence, les bulletins de paie, les plannings, les contrats de travail et tout document utile à son contrôle. L'employeur ne peut pas s'y opposer.",
    mots: ["inspection du travail", "pouvoirs", "accès", "documents", "enquête"]
  },
  {
    art: "Art. L8113-1", titre: "Signalement à l'inspection du travail",
    def: "Tout salarié peut saisir l'inspection du travail pour signaler des infractions au droit du travail. L'inspecteur peut décider de garder confidentielle l'identité du salarié qui a signalé. Le salarié est protégé contre toute représaille.",
    ex: "Un salarié qui signale à l'inspecteur du travail des heures supplémentaires non payées, des conditions de travail dangereuses ou un harcèlement est protégé contre tout licenciement lié à ce signalement.",
    mots: ["signalement", "inspection du travail", "confidentialité", "protection", "représailles"]
  },
  {
    art: "Art. L8222-1", titre: "Travail dissimulé — sanctions",
    def: "Le travail dissimulé est puni de 3 ans d'emprisonnement et de 45 000 euros d'amende. Ces peines sont portées à 5 ans et 75 000 euros en cas de recours à la vulnérabilité ou à l'état de dépendance de la victime.",
    ex: "Un employeur qui rémunère des heures supplémentaires en espèces sans les déclarer commet du travail dissimulé, passible de sanctions pénales et de redressements URSSAF.",
    mots: ["travail dissimulé", "sanctions pénales", "3 ans", "45 000 euros", "URSSAF", "redressement"]
  },
  {
    art: "Art. L8241-1", titre: "Prêt de main-d'oeuvre — conditions",
    def: "Toute opération à but lucratif ayant pour objet exclusif le prêt de main-d'oeuvre est interdite (marchandage). Le prêt de main-d'oeuvre entre entreprises est autorisé à but non lucratif, dans le cadre strict de l'article L8241-1.",
    ex: "Une entreprise peut prêter un salarié à une autre entreprise pendant une période de sous-activité, à condition que le prix du prêt ne couvre que les salaires et charges sociales, sans bénéfice.",
    mots: ["prêt de main-d'oeuvre", "marchandage", "interdit", "but non lucratif", "conditions"]
  },
  {
    art: "Art. L1225-35", titre: "Congé paternité",
    def: "Le salarié père bénéficie d'un congé de paternité et d'accueil de l'enfant. Sa durée est de 25 jours calendaires (32 pour des naissances multiples), dont 4 jours obligatoires immédiatement après la naissance.",
    ex: "Le congé paternité de 25 jours peut être pris en deux périodes : 4 jours obligatoires juste après la naissance, puis 21 jours dans les 6 mois suivants. Il est indemnisé par la CPAM comme la maternité.",
    mots: ["congé paternité", "25 jours", "père", "naissance", "CPAM", "obligatoire"]
  },
  {
    art: "Art. L1225-17", titre: "Congé maternité — durée",
    def: "La salariée en état de grossesse médicalement constaté a droit à un congé de maternité dont la durée est fixée par la loi. Pour un premier enfant : 6 semaines avant et 10 semaines après l'accouchement (16 semaines au total). La durée augmente avec le rang de naissance.",
    ex: "Pour une troisième naissance, la durée du congé maternité est de 26 semaines (8 avant + 18 après). Le congé postnatal peut être allongé en cas de complications.",
    mots: ["congé maternité", "durée", "16 semaines", "avant naissance", "après accouchement"]
  },
  {
    art: "Art. L1225-37", titre: "Congé d'adoption",
    def: "Le salarié adoptant bénéficie d'un congé d'adoption dont la durée varie selon le nombre d'enfants adoptés et la situation familiale. Ce congé est indemnisé par la CPAM sous conditions.",
    ex: "Un salarié qui adopte un premier enfant bénéficie de 16 semaines de congé d'adoption. Si les deux parents adoptifs souhaitent bénéficier d'un congé, la durée totale est allongée.",
    mots: ["congé adoption", "durée", "CPAM", "adoptant", "enfant"]
  },
  {
    art: "Art. L1225-65", titre: "Congé parental d'éducation",
    def: "A l'issue du congé de maternité ou d'adoption, le salarié peut bénéficier d'un congé parental d'éducation. Ce congé est d'une durée initiale d'un an, renouvelable deux fois, soit trois ans maximum.",
    ex: "Un père ou une mère peut prendre jusqu'à 3 ans de congé parental non rémunéré par l'employeur, mais partiellement indemnisé par la CAF via la PreParE.",
    mots: ["congé parental", "éducation", "3 ans", "CAF", "PreParE", "renouvellement"]
  },
  {
    art: "Art. L3142-1", titre: "Congés pour événements familiaux",
    def: "Le salarié a le droit de s'absenter de l'entreprise pour des événements familiaux : mariage ou PACS (4 jours), naissance (3 jours), décès du conjoint (3 jours), décès d'un enfant (5 jours ou 7 jours si l'enfant était mineur ou âgé de moins de 25 ans et à la charge du salarié), décès d'un parent (3 jours).",
    ex: "Ces absences sont rémunérées comme du temps de travail. L'employeur ne peut pas les refuser ni les conditionner à l'ancienneté. La convention collective peut prévoir des durées supérieures.",
    mots: ["congés familiaux", "événements", "mariage", "naissance", "décès", "PACS", "jours"]
  },
  {
    art: "Art. L3142-16", titre: "Congé pour proche aidant",
    def: "Le salarié peut bénéficier d'un congé de proche aidant lorsqu'un de ses proches présente un handicap ou une perte d'autonomie d'une particulière gravité. Ce congé peut être pris à temps plein ou partiel.",
    ex: "Un salarié qui doit s'occuper d'un parent dépendant peut prendre un congé de proche aidant. Sa durée maximale est de 3 mois, renouvelable jusqu'à 1 an sur l'ensemble de la carrière.",
    mots: ["proche aidant", "congé", "handicap", "dépendance", "aidant familial", "3 mois"]
  },
  {
    art: "Art. L3142-24-1", titre: "Don de jours de repos",
    def: "Un salarié peut, sur sa demande et en accord avec l'employeur, renoncer anonymement et sans contrepartie à tout ou partie de ses jours de repos non pris au bénéfice d'un autre salarié de l'entreprise qui assume la charge d'un enfant gravement malade.",
    ex: "Un collègue dont l'enfant est gravement malade peut recevoir des jours de congés donnés par d'autres salariés de l'entreprise pour pouvoir rester auprès de lui.",
    mots: ["don de jours", "repos", "enfant malade", "solidarité", "accord", "anonyme"]
  },
  {
    art: "Art. L2261-22", titre: "Dénonciation d'une convention collective",
    def: "La convention collective ou l'accord collectif à durée indéterminée peut être dénoncé par l'une ou l'autre des parties signataires. La dénonciation est notifiée et doit respecter un préavis de 3 mois minimum.",
    ex: "Si une convention collective est dénoncée, ses dispositions restent applicables pendant 12 mois (délai de survie) puis jusqu'à la conclusion d'un nouvel accord.",
    mots: ["dénonciation", "convention collective", "préavis 3 mois", "survie", "12 mois"]
  },
  {
    art: "Art. L1237-18", titre: "Rupture conventionnelle collective",
    def: "Un accord collectif peut définir les conditions et modalités de ruptures conventionnelles collectives, excluant tout licenciement pour atteindre les objectifs qui lui sont assignés en termes de suppression d'emplois.",
    ex: "La rupture conventionnelle collective (RCC) permet à l'employeur de supprimer des postes avec le consentement des salariés, sans recourir à un plan de sauvegarde de l'emploi (PSE).",
    mots: ["rupture conventionnelle collective", "RCC", "accord collectif", "suppression emplois", "PSE"]
  },
  {
    art: "Art. L1233-1", titre: "Licenciement économique — définition",
    def: "Constitue un licenciement pour motif économique le licenciement effectué par un employeur pour un ou plusieurs motifs non inhérents à la personne du salarié, résultant d'une suppression ou transformation d'emploi ou d'une modification du contrat de travail refusée par le salarié.",
    ex: "Un licenciement économique peut être justifié par des difficultés économiques, des mutations technologiques, une réorganisation nécessaire à la sauvegarde de la compétitivité, ou la cessation d'activité.",
    mots: ["licenciement économique", "motif économique", "suppression emploi", "difficultés économiques"]
  },
  {
    art: "Art. L1233-4", titre: "Reclassement avant licenciement économique",
    def: "L'employeur est tenu de rechercher toutes les possibilités de reclassement du salarié avant de procéder à son licenciement pour motif économique. Cette obligation s'étend à l'ensemble du groupe auquel appartient l'entreprise.",
    ex: "Avant de licencier économiquement un salarié, l'employeur doit lui proposer les postes disponibles dans l'entreprise et dans toutes les entreprises du groupe, même à l'étranger.",
    mots: ["reclassement", "licenciement économique", "obligation", "groupe", "poste disponible"]
  },
  {
    art: "Art. L1233-61", titre: "Plan de sauvegarde de l'emploi — PSE",
    def: "Dans les entreprises d'au moins 50 salariés, lorsque le projet de licenciement concerne au moins 10 salariés sur 30 jours, l'employeur établit un plan de sauvegarde de l'emploi pour éviter les licenciements ou en limiter le nombre et pour faciliter le reclassement des salariés dont le licenciement ne peut être évité.",
    ex: "Un PSE doit prévoir des mesures de reclassement interne, de formation, de soutien à la création d'entreprise, et des mesures d'accompagnement. Il est soumis à l'accord du CSE.",
    mots: ["PSE", "plan de sauvegarde de l'emploi", "50 salariés", "10 salariés", "licenciement collectif"]
  },
  {
    art: "Art. L1226-2", titre: "Maladie — obligation de reclassement",
    def: "A l'issue d'un arrêt maladie de longue durée ayant entraîné une déclaration d'inaptitude par le médecin du travail, l'employeur est tenu de proposer un autre emploi approprié aux capacités du salarié.",
    ex: "Si un salarié est déclaré inapte à son poste après une maladie, l'employeur doit rechercher un reclassement dans l'entreprise ou le groupe. Sans reclassement possible, le licenciement pour inaptitude est possible.",
    mots: ["inaptitude", "reclassement", "maladie", "médecin du travail", "obligation"]
  }
];
