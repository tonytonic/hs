/**
 * GLOSSAIRE — Articles de loi sur les heures complémentaires
 * Langage simple + exemples concrets + articles officiels
 *
 * v2.1 — Audit avril 2026 : schéma unifié {terme, art, def, exemple, tags},
 * articles juridiques revérifiés sur Légifrance.
 */
(function(global) {
'use strict';

const GLOSSAIRE = [
  // ── DÉFINITIONS ESSENTIELLES ──────────────────────────────────
  {
    terme: 'Heures complémentaires',
    art: 'Art. L3123-1 et L3123-28',
    def: "Ce sont les heures que tu travailles en plus de ce qui est prévu dans ton contrat à temps partiel, sans jamais atteindre 35h. Elles sont différentes des heures supplémentaires, qui concernent les temps pleins.",
    exemple: "Tu as un contrat de 25h/sem et tu travailles 28h cette semaine → 3h sont des heures complémentaires.",
    tags: ['heures','complémentaires','définition']
  },
  {
    terme: 'Plafond 10% (droit commun)',
    art: 'Art. L3123-28',
    def: "Sans accord de branche spécifique, ton employeur ne peut te demander que 10% d'heures en plus de ton contrat. Au-delà, il dépasse ses droits.",
    exemple: "Contrat 25h/sem → max 2,5h complémentaires → tu ne peux pas aller au-delà de 27,5h sans accord de branche.",
    tags: ['plafond','10%','limite']
  },
  {
    terme: 'Plafond 1/3 (accord de branche)',
    art: 'Art. L3123-28',
    def: "Certains secteurs (HCR, aide à domicile, commerce alimentaire…) ont un accord de branche étendu qui permet à ton employeur de te demander jusqu'à un tiers d'heures en plus. Vérifie ta convention collective.",
    exemple: "Contrat 25h/sem en HCR → max 8,3h complémentaires → total 33,3h/sem possible (mais jamais 35h).",
    tags: ['plafond','tiers','accord de branche']
  },
  {
    terme: 'Majoration +10%',
    art: 'Art. L3123-29',
    def: "Les premières heures complémentaires (dans la limite du 1/10e de ton contrat) sont payées avec 10% de plus que ton taux horaire normal. C'est le minimum légal supplétif — ta CCN peut prévoir un taux plus élevé.",
    exemple: "Taux horaire 11,88€ × 1,10 = 13,07€/h pour les premières heures complémentaires.",
    tags: ['majoration','10%','rémunération']
  },
  {
    terme: 'Majoration +25%',
    art: 'Art. L3123-29',
    def: "Au-delà du 1/10e de ton contrat et jusqu'au plafond autorisé, chaque heure complémentaire est payée avec 25% de plus. C'est le taux légal minimum — vérifie si ta CCN prévoit mieux.",
    exemple: "Contrat 25h, taux 11,88€ → 2,5 premières HC à 13,07€, puis les suivantes à 14,85€.",
    tags: ['majoration','25%','rémunération']
  },
  {
    terme: 'Jamais 35h',
    art: 'Art. L3123-28',
    def: "Les heures complémentaires ne peuvent jamais porter la durée de travail au niveau de la durée légale (35h) ou à la durée conventionnelle si elle est inférieure. Une seule semaine à 35h+ peut justifier une requalification en contrat temps plein devant les prud'hommes.",
    exemple: "Contrat 30h, on te demande 6h comp → total 36h → illégal. Tu peux refuser sans faute.",
    tags: ['35h','temps plein','requalification']
  },
  // ── PRÉVENANCE / DÉLAIS ──────────────────────────────────────
  {
    terme: 'Délai de prévenance (par défaut)',
    art: 'Art. L3123-31',
    def: "À défaut d'accord collectif, l'employeur doit te prévenir au moins 7 jours ouvrés avant toute modification de la répartition de tes horaires ou toute demande d'heures complémentaires. C'est le minimum légal par défaut.",
    exemple: "Sans accord d'entreprise/branche, si on te prévient jeudi pour mardi prochain → seulement 3 jours ouvrés → tu peux refuser légalement.",
    tags: ['délai','prévenance','7 jours','défaut']
  },
  {
    terme: 'Délai de prévenance réduit (par accord)',
    art: 'Art. L3123-24',
    def: "Un accord d'entreprise, d'établissement ou de branche étendu peut réduire ce délai — mais jamais en dessous de 3 jours ouvrés. L'accord doit aussi prévoir des contreparties au salarié. Vérifie ta CCN.",
    exemple: "La CCN HCR prévoit 48h de prévenance avec contreparties. La CCN Aide à domicile prévoit des délais réduits pour cas d'urgence.",
    tags: ['délai','accord','3 jours','dérogation']
  },
  {
    terme: 'Contrepartie si délai < 7 jours',
    art: 'Art. L3123-24',
    def: "Si un accord réduit le délai de prévenance en dessous de 7 jours ouvrés, il doit obligatoirement prévoir des contreparties pour le salarié (compensation, repos, majoration supplémentaire). Sans contrepartie, la réduction n'est pas valable.",
    exemple: "Ta CCN réduit la prévenance à 3 jours → elle doit aussi prévoir une prime, un repos compensateur ou une majoration accrue.",
    tags: ['contrepartie','accord','prévenance']
  },
  {
    terme: "Refus d'heures complémentaires",
    art: 'Art. L3123-10',
    def: "Tu peux refuser des heures complémentaires sans risque de sanction dans trois cas : (1) si elles dépassent les limites fixées par ton contrat, (2) si le délai de prévenance n'a pas été respecté, (3) si ton contrat ne mentionne pas la possibilité d'en faire. Ce refus ne constitue ni faute ni motif de licenciement.",
    exemple: "Contrat 25h avec plafond 10% → si on te demande 5h de plus (20%), tu peux refuser les 2,5h excédentaires.",
    tags: ['refus','droit','sanction','L3123-10']
  },
  {
    terme: 'Modification des horaires',
    art: 'Art. L3123-31',
    def: "Toute modification de la répartition de la durée du travail entre les jours de la semaine ou les semaines du mois doit t'être notifiée au moins 7 jours ouvrés à l'avance (défaut légal). Ce délai peut être réduit à 3 jours par accord collectif prévoyant des contreparties.",
    exemple: "Ton employeur veut changer tes jours de mardi à mercredi — il doit te prévenir 7 jours ouvrés à l'avance, sauf accord collectif.",
    tags: ['horaires','modification','planning','prévenance']
  },
  // ── DURÉE ET ÉGALITÉ ──────────────────────────────────────────
  {
    terme: 'Durée minimale 24h',
    art: 'Art. L3123-7',
    def: "En principe, un contrat à temps partiel ne peut pas être inférieur à 24h/sem. Des dérogations existent : demande écrite et motivée du salarié (contraintes personnelles, cumul d'emplois), étudiant de moins de 26 ans, CDD court (≤ 7 jours), remplacement, retraite progressive, accord de branche étendu.",
    exemple: "Ton employeur te propose 15h/sem sans ta demande expresse et sans accord de branche → c'est illégal.",
    tags: ['durée minimale','24h','contrat','L3123-7']
  },
  {
    terme: 'Égalité de traitement',
    art: 'Art. L3123-4',
    def: "Un salarié à temps partiel a les mêmes droits qu'un temps plein : accès à la formation, à la promotion, aux avantages d'entreprise. Sa rémunération est proportionnelle mais son taux horaire doit être identique à qualification égale.",
    exemple: "Ton collègue à temps plein gagne 12€/h → tu dois toi aussi gagner 12€/h (pas moins sous prétexte que tu es à temps partiel).",
    tags: ['égalité','discrimination','temps plein','droits']
  },
  {
    terme: 'Priorité temps plein',
    art: 'Art. L3123-3',
    def: "Tout salarié à temps partiel a priorité pour occuper un emploi à temps plein de même qualification qui se libère dans l'entreprise. L'employeur doit t'informer des postes disponibles.",
    exemple: "Un poste à temps plein s'ouvre dans ton établissement → tu dois être informée avant toute candidature externe.",
    tags: ['priorité','temps plein','poste','accès']
  },
  // ── CONTRAT, 12 SEMAINES, REQUALIFICATION ─────────────────────
  {
    terme: 'Règle des 12 semaines',
    art: 'Art. L3123-13',
    def: "Si ton horaire moyen réellement effectué dépasse de 2h au moins par semaine ton contrat pendant 12 semaines consécutives (ou 12 semaines sur une période de 15), ton horaire contractuel est modifié à la hausse — sous réserve d'un préavis de 7 jours et sauf opposition de ta part.",
    exemple: "Contrat 25h, tu travailles 27h+ pendant 12 semaines → ton contrat doit être porté à l'horaire moyen réel. Tu peux refuser cette modification pour conserver ton horaire actuel.",
    tags: ['12 semaines','requalification','avenant','modification','L3123-13']
  },
  {
    terme: 'Contrat écrit — mentions obligatoires',
    art: 'Art. L3123-6',
    def: "Le contrat de travail à temps partiel est obligatoirement écrit et mentionne : qualification, rémunération, durée hebdo/mensuelle, répartition entre jours ou semaines, cas de modification, modalités de communication des horaires, limites des heures complémentaires.",
    exemple: "Si ton contrat ne mentionne PAS la possibilité de faire des heures complémentaires, ton employeur ne peut pas t'en imposer.",
    tags: ['contrat','écrit','mentions']
  },
  {
    terme: 'Requalification en temps plein',
    art: 'Art. L3123-28 + jurisprudence',
    def: "Si tes heures complémentaires t'amènent à atteindre ou dépasser 35h/sem (ou la durée conventionnelle), si ton contrat n'est pas écrit, ou si tes horaires varient sans prévenance permettant de connaître ton rythme, ton contrat peut être requalifié en CDI temps plein par le juge — avec rappel de salaire sur 3 ans.",
    exemple: "Tu travailles 34h sur un contrat 25h de manière systématique pendant plusieurs mois → le Conseil de prud'hommes peut requalifier ton contrat.",
    tags: ['requalification','35h','temps plein','prud\'hommes']
  },
  // ── COMPLÉMENT D'HEURES PAR AVENANT ─────────────────────────
  {
    terme: "Complément d'heures (avenant)",
    art: 'Art. L3123-22',
    def: "Mécanisme différent des heures complémentaires : un accord de branche étendu peut autoriser des avenants temporaires augmentant ta durée de travail. Les heures dans l'avenant sont payées au taux normal (sauf si l'accord prévoit une majoration). Les heures au-delà de l'avenant sont à +25% minimum. Maximum 8 avenants par an et par salarié (hors remplacement).",
    exemple: "Contrat 25h, avenant à 30h pour 1 mois → les 5h entre contrat et avenant = taux normal. Si tu fais 32h, les 2h au-delà = +25%.",
    tags: ['avenant','complément','temporaire','L3123-22','8 avenants']
  },
  {
    terme: "Limite de l'avenant",
    art: 'Art. L3123-22 + Cass. Soc. 2022',
    def: "Un avenant de complément d'heures ne peut pas porter la durée du travail au niveau de la durée légale (35h) ou de la durée conventionnelle, même temporairement. Le cas échéant, le juge peut requalifier en temps plein.",
    exemple: "Contrat 20h, avenant proposé à 35h → refuser, car cela transformerait de fait le contrat en temps plein.",
    tags: ['avenant','limite','35h','Cass. Soc.']
  },
  // ── ORGANISATION JOURNALIÈRE ─────────────────────────────────
  {
    terme: 'Interruption journalière (coupure)',
    art: 'Art. L3123-30 (défaut) / L3123-23 (accord)',
    def: "À défaut d'accord, la journée de travail d'un salarié à temps partiel ne peut comporter qu'une seule interruption, de 2 heures maximum. Un accord de branche étendu peut autoriser des amplitudes plus larges (ex: HCR jusqu'à 5h) mais doit prévoir des contreparties spécifiques.",
    exemple: "Tu travailles de 8h à 11h puis de 17h à 21h = 6h de coupure → illégal sans accord de branche avec contreparties.",
    tags: ['coupure','interruption','journée','L3123-30','amplitude']
  },
  // ── DÉFISCALISATION / PAIE ──────────────────────────────────
  {
    terme: 'Défiscalisation des heures complémentaires',
    art: 'Loi Avenir pro 2019 / Art. 81 quater CGI',
    def: "Depuis la loi Avenir professionnel 2019, les heures complémentaires bénéficient d'une exonération d'impôt sur le revenu (plafond 7 500 €/an) et d'une réduction de cotisations salariales. La mutuelle, la prévoyance et certaines cotisations CCN restent dues.",
    exemple: "Tu fais 3h comp à 13€ = 39€ brut → cet argent bénéficie de l'exo IR dans la limite du plafond annuel.",
    tags: ['cotisations','avantage','fiche de paie','exonération','TEPA']
  },
  {
    terme: 'Bulletin de paie : heures complémentaires',
    art: 'Art. R3243-1',
    def: "Les heures complémentaires et leurs majorations doivent apparaître séparément sur ton bulletin de paie, avec le nombre d'heures et le taux appliqué. Si elles sont noyées dans d'autres lignes ou absentes, c'est une irrégularité qui peut être contestée.",
    exemple: "Cherche sur ta fiche de paie une ligne 'Heures complémentaires' avec le nombre d'heures et le taux de majoration (+10% / +25%).",
    tags: ['bulletin','fiche de paie','vérification']
  },
  {
    terme: 'Heures complémentaires et ancienneté',
    art: 'Jurisprudence sociale',
    def: "Les heures complémentaires sont prises en compte pour le calcul de ton ancienneté, de tes droits à congés payés (au prorata) et entrent dans la base de calcul des indemnités de licenciement.",
    exemple: "Si tu fais régulièrement 28h sur un contrat de 25h, ton ancienneté et tes congés sont calculés sur la moyenne réelle.",
    tags: ['ancienneté','congés','indemnités','licenciement']
  },
  {
    terme: 'Sécurité sociale et heures complémentaires',
    art: 'Art. L323-4 CSS',
    def: "Les heures complémentaires soumises à cotisations entrent dans le calcul de tes indemnités journalières en cas d'arrêt maladie ou maternité.",
    exemple: "Si tu es en arrêt maladie, tes IJ sont calculées sur la moyenne des 3 derniers mois incluant tes HC.",
    tags: ['sécurité sociale','arrêt maladie','IJ','maternité']
  },
  // ── PROCÉDURE ─────────────────────────────────────────────────
  {
    terme: "Conseil de prud'hommes",
    art: 'Art. L1411-1',
    def: "Juridiction compétente pour tous les litiges entre salariés et employeurs. Tu peux saisir les prud'hommes si des HC ne sont pas payées, si le plafond est dépassé, si le délai de prévenance n'est pas respecté, ou pour demander la requalification. Délai de prescription : 3 ans pour les salaires.",
    exemple: "Ton employeur refuse de payer 6 mois d'heures complémentaires → tu peux réclamer les 3 dernières années.",
    tags: ['prud\'hommes','litige','procédure','prescription']
  },
  {
    terme: 'Convention collective (CCN)',
    art: 'Art. L2251-1',
    def: "Accord négocié entre syndicats d'employeurs et de salariés dans un secteur. Elle peut améliorer les droits légaux (plafond 1/3, meilleures majorations) mais jamais les réduire en dessous du minimum légal.",
    exemple: "La CCN HCR prévoit un plafond de 1/3 — plus favorable que le 1/10e légal pour les salariées à temps partiel.",
    tags: ['CCN','convention collective','branche','IDCC']
  },
  // ── ÉTUDES SCIENTIFIQUES BIEN-ÊTRE ─────────────────────────────
  {
    terme: 'Higgins et al. 2010 — Imprévisibilité horaire',
    art: 'Étude scientifique',
    def: "Higgins et ses collègues ont mesuré le cortisol (hormone du stress) chez des salariés à temps partiel selon la variabilité de leurs horaires. Résultat : un écart-type supérieur à 4h d'une semaine à l'autre produit un pic de cortisol comparable à celui observé chez des salariés en surmenage à temps plein. L'imprévisibilité horaire est donc biologiquement aussi stressante que la surcharge, même sur un temps partiel.",
    exemple: "Tu travailles 20h une semaine, 26h la suivante, 19h après — cette variation crée un stress aigu mesurable, indépendamment du nombre d'heures total.",
    tags: ['stress','cortisol','imprévisibilité','horaires','biologie']
  },
  {
    terme: 'Karasek 1979 — Modèle Demande-Contrôle',
    art: 'Étude scientifique',
    def: "Robert Karasek a développé le modèle 'Job Demand-Control' qui prédit le niveau de tension au travail selon deux axes : la demande (charge de travail) et le contrôle (autonomie). Les salariés à temps partiel avec peu de contrôle sur leurs horaires et une demande élevée se retrouvent dans la zone de 'tension chronique' — le quadrant le plus à risque pour la santé cardiovasculaire.",
    exemple: "Une caissière à 20h qui se voit régulièrement imposer 6h complémentaires sans préavis cumule forte demande + faible contrôle = zone rouge Karasek.",
    tags: ['stress','tension','autonomie','contrôle','cardiovasculaire','Karasek']
  },
  {
    terme: 'Sonnentag 2003 — Récupération psychologique',
    art: 'Étude scientifique',
    def: "Sabine Sonnentag a montré que la récupération psychologique après le travail nécessite des périodes de 'détachement' — des jours ou semaines où la charge mentale liée au travail est réellement absente. Pour un temps partiel, les semaines travaillées sous le contrat sont des périodes de récupération réelle.",
    exemple: "Si sur 12 semaines, seulement 2 sont sous tes heures contractuelles, tu n'as pas assez de vraies périodes légères pour récupérer.",
    tags: ['récupération','repos','santé mentale','détachement','Sonnentag']
  },
  {
    terme: 'Voydanoff 2005 — Temps partiel choisi vs subi',
    art: 'Étude scientifique',
    def: "Patricia Voydanoff a étudié l'impact du temps partiel sur l'équilibre travail-famille. Le temps partiel choisi est protecteur pour la santé mentale. Le temps partiel subi produit les mêmes effets négatifs sur la santé que le temps plein chargé, sans les avantages économiques.",
    exemple: "Si tu approches systématiquement le plafond légal d'heures complémentaires, ton temps partiel est de facto subi — Mizuki le détecte avec le score 'Choix'.",
    tags: ['choix','subi','équilibre','famille','santé mentale','Voydanoff']
  },
  {
    terme: 'Bambra et al. 2008 — Temps partiel et santé mentale',
    art: 'Étude scientifique',
    def: "Méta-analyse de 23 études : le temps partiel subi chronique (travail régulièrement proche du plafond légal sur 6 mois ou plus) est associé à un risque de dépression 1,5 fois plus élevé que le temps plein. Le temps partiel clairement choisi réduit l'anxiété.",
    exemple: "Si sur 20 semaines, 13 ou plus approchent ton plafond légal d'heures complémentaires → zone critique Bambra. Mizuki t'en alerte dans le score 'Santé mentale'.",
    tags: ['dépression','santé mentale','subi','choisi','méta-analyse','Bambra']
  },
  {
    terme: 'Pencavel 2014 — Productivité décroissante',
    art: 'Étude scientifique',
    def: "John Pencavel (Stanford 2014) a démontré qu'au-delà d'un certain seuil d'heures, chaque heure supplémentaire produit moins. Pour un temps partiel, le cumul régulier d'heures complémentaires crée une fatigue comparable au temps plein, sans les bénéfices (stabilité, protection sociale).",
    exemple: "Un salarié à 20h avec 8h comp (28h) produit proportionnellement moins que s'il travaillait 20h — la surcharge du temps partiel subi.",
    tags: ['productivité','Pencavel','surcharge','efficacité']
  },
];

const GLOSSAIRE_API = {
  getAll() { return GLOSSAIRE; },
  search(term) {
    if(!term || term.length < 2) return GLOSSAIRE;
    const t = term.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    return GLOSSAIRE.filter(g => {
      const txt = (g.terme + ' ' + (g.def||'') + ' ' + (g.art||'') + ' ' + (g.tags||[]).join(' '))
        .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      return txt.includes(t);
    });
  }
};

global.GLOSSAIRE_API = GLOSSAIRE_API;
}(typeof window !== 'undefined' ? window : global));
