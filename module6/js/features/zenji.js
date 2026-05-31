/**
 * ZENJI — Kitsune à 9 queues, conseiller M6 Cadres
 * 100+ scénarios organisés en pools contextuels
 * Architecture identique à Mizuki (M5) : rotation intelligente + 2 niveaux de message
 *
 * Pools : NORMAL · FORFAIT_OK · APPROCHE_PLAFOND · DEPASSE · RACHAT · P2 · P3 · P4
 *         RTT_NON_PRIS · ENTRETIEN_MANQUANT · AMPLITUDE · WEEKFH_OK · WEEKFH_HS
 *         CV_RISQUE · COGNITIF · VIEILLISSEMENT · DECONNEXION · PROJETS · DIRIGEANT
 *         SAISONNIER · MOTIVATION · RECAP_MENSUEL · NULLITE_RISQUE
 */
'use strict';

(function(global) {

// ── Helpers localStorage ──────────────────────────────────────────
const K = {
  MSG_IDX:   'M6_ZENJI_IDX',
  POPUP_DAY: 'M6_ZENJI_POPUP_DAY',
  SEEN_KEYS: 'M6_ZENJI_SEEN',  // clé de base — suffixée par régime
};
const _get  = (k,d='')  => { try { return localStorage.getItem(k)??d; } catch(_) { return d; } };
const _set  = (k,v)     => { try { localStorage.setItem(k,String(v)); } catch(_) {} };
const _json = (k,d={})  => { try { return JSON.parse(localStorage.getItem(k))??d; } catch(_) { return d; } };

// ── Rotation intelligente (date-seed + index) ─────────────────────
function _next(pool) {
  let idx = parseInt(_get(K.MSG_IDX,'0'));
  const d   = new Date();
  const seed = (d.getDate()*31 + d.getMonth()*7 + idx*13) % pool.length;
  _set(K.MSG_IDX, String((idx+1) % 9999));
  return pool[seed];
}

// ══════════════════════════════════════════════════════════════════
//  POOLS DE MESSAGES — 100+ scénarios
//  n = nom du cadre (ou '')
//  Chaque fonction retourne une string (bubble) ou un objet (popup)
// ══════════════════════════════════════════════════════════════════

// ── Forfait Jours — situation normale ────────────────────────────
const POOL_NORMAL = [
  n=>`${n}Forfait conforme. Aucune alerte détectée. Continuez à saisir régulièrement — 3 mois de données suffisent pour déclencher les analyses prédictives.`,
  n=>`${n}Situation juridique et biologique au vert. Profitez de cet équilibre — la recherche confirme que les périodes stables sont décisives pour la performance long terme.`,
  n=>`${n}Votre forfait est bien géré. Rappel : même sans alerte, pensez à saisir votre amplitude horaire pour affiner l'analyse biologique.`,
  n=>`${n}Tout est en ordre. Conseil de Zenji : planifiez vos RTT maintenant plutôt qu'en fin d'année — le détachement régulier vaut mieux que les longues vacances rares. (Sonnentag 2022)`,
  n=>`${n}Forfait dans les clous. Savez-vous que l'entretien annuel peut être un levier de négociation ? Documentez-y vos réalisations et votre charge réelle.`,
  n=>`${n}Bonne gestion du forfait. La phase P1 (INRS) correspond à un niveau d'adaptation normal. Maintenant cette discipline.`,
  n=>`${n}Pas d'alerte cette semaine. Rappel utile : si votre employeur ne réalise pas l'entretien annuel (L3121-65), le forfait peut être contesté — même rétroactivement.`,
  n=>`${n}Situation conforme. Pour maintenir votre performance Pencavel, évitez les semaines à >50h équivalent : la productivité s'y effondre sans que l'on s'en aperçoive.`,
];

// ── Forfait Jours — approche du plafond ──────────────────────────
const POOL_APPROCHE_PLAFOND = [
  (n,j,p)=>`${n}${j} jours travaillés — il ne reste que ${p-j} jours avant votre plafond de ${p}. Planifiez vos RTT maintenant pour éviter le dépassement.`,
  (n,j,p)=>`${n}Attention : ${j}/${p} jours atteints. À ce rythme, vous dépasserez le plafond avant la fin de l'année. Bloquez des RTT dès cette semaine.`,
  (n,j,p)=>`${n}Plafond à ${Math.round(j/p*100)}%. Il reste ${p-j} jours disponibles. Si ce rythme continue, un avenant de rachat sera nécessaire (L3121-59, majoré ≥10%).`,
  (n,j,p)=>`${n}${p-j} jours restants sur votre forfait annuel. C'est le moment de discuter de votre charge avec votre manager — entretien L3121-65 si nécessaire.`,
];

// ── Forfait Jours — dépassement ───────────────────────────────────
const POOL_DEPASSE = [
  (n,excess)=>`${n}Dépassement du forfait : ${excess} jour${excess>1?'s':''} au-delà du plafond. Sans avenant écrit et majoré ≥10%, ces jours ne sont pas juridiquement opposables. Formalisez maintenant.`,
  (n,excess)=>`${n}${excess} jour${excess>1?'s':''} de dépassement détecté${excess>1?'s':''}. Art. L3121-59 : chaque jour au-delà du forfait nécessite un avenant écrit avec majoration. Votre RH doit être informé.`,
  (n,excess)=>`${n}Forfait dépassé de ${excess} jour${excess>1?'s':''}. La jurisprudence (Cass. Soc. 4/11/2015) sanctionne les dépassements réguliers comme charge déraisonnable. Agissez maintenant.`,
  (n,excess)=>`${n}Dépassement de ${excess} jour${excess>1?'s':''}. Stratégie : soit un avenant de rachat à ≥10% (L3121-59), soit des RTT compensatoires négociés. Évitez de laisser cette situation sans formalisation.`,
];

// ── Rachat de jours ───────────────────────────────────────────────
const POOL_RACHAT = [
  (n,r)=>`${n}${r} jour${r>1?'s':''} racheté${r>1?'s':''}. Le rachat est légal mais doit rester exceptionnel — des études montrent une corrélation avec le stress chronique et le cortisol élevé. (Dresden Burnout Study 2025)`,
  (n,r)=>`${n}${r} rachat${r>1?'s':''} cette année. Vérifiez que l'avenant est bien signé avec majoration ≥10%. Sans écrit, les jours supplémentaires pourraient être requalifiés en HS à taux normal.`,
  (n,r)=>`${n}${r} jour${r>1?'s':''} racheté${r>1?'s':''}. Astuce : le rachat est imposable mais bénéficie d'une exonération partielle (L241-17 CSS) dans certains cas — vérifiez avec votre service RH.`,
];

// ── Fatigue P2 ────────────────────────────────────────────────────
const POOL_P2 = [
  n=>`${n}Phase P2 — fatigue chronique en construction. La recherche montre que les télomères commencent à raccourcir significativement en phase d'épuisement. C'est réversible maintenant — planifiez des RTT. (Ahola 2012)`,
  n=>`${n}Signal P2 détecté. La fatigue s'accumule de façon non-linéaire : le cap P3 arrive plus vite qu'on ne le pense. Intercalez des jours de récupération réelle cette semaine.`,
  n=>`${n}Niveau INRS P2. Sonnentag 2022 est formel : le détachement régulier est le prédicteur le plus fort de la récupération. Un RTT pris cette semaine vaut plus que 3 jours de vacances dans 2 mois.`,
  n=>`${n}P2 confirmée. Votre performance estimée (modèle Pencavel) commence à chuter. Au-delà de 50h équivalent hebdomadaire, les heures supplémentaires ne produisent plus rien de valeur ajoutée.`,
  n=>`${n}Fatigue chronique détectée. Conseil pratique : signalez-la à votre manager lors du prochain point — l'Art. L3121-65 lui impose de veiller à votre charge. Cette déclaration vous protège.`,
];

// ── Fatigue P3 ────────────────────────────────────────────────────
const POOL_P3 = [
  n=>`${n}Phase P3 — Surmenage. Totterdell 2005 décrit exactement ce que vous vivez probablement : décrochage émotionnel, cynisme, fatigue irréductible. Ce cycle se brise avec de l'aide — pas de la volonté seule.`,
  n=>`${n}Niveau INRS P3. À ce niveau d'exposition, Kivimäki 2015 (603 838 individus) documente un RR=1.33 pour l'AVC. Ce n'est pas alarmiste — c'est de l'épidémiologie solide. Agissez cette semaine.`,
  n=>`${n}P3 détectée. L'Art. L4121-1 impose à votre employeur une obligation de prévention. Signalez la surcharge par écrit — cela vous protège et l'oblige à agir. Utillez l'onglet Entretien pour le documenter.`,
  n=>`${n}Surmenage documenté (P3). La prochaine étape est P4 — burn-out. Ce n'est pas une fatalité. Demandez un entretien de charge (L3121-65) cette semaine. Zenji vous aide à le préparer dans l'onglet Entretien.`,
];

// ── Burn-out P4 ───────────────────────────────────────────────────
const POOL_P4 = [
  n=>`${n}Phase P4 — Burn-out. Consultez votre médecin du travail cette semaine. L'Art. L4121-1 : obligation de résultat de votre employeur sur votre santé. Vous avez le droit d'agir — utilisez-le.`,
  n=>`${n}P4 critique. La Dresden Burnout Study 2025 confirme que l'inaction génère un vieillissement épigénétique mesurable (horloges DNAm GrimAge2). Ce n'est pas de la fatigue — c'est une urgence médicale.`,
];

// ── RTT non pris ──────────────────────────────────────────────────
const POOL_RTT_NON_PRIS = [
  (n,rtt)=>`${n}${rtt} RTT théoriques — aucun pris. Sonnentag et al. 2022 (méta-analyse 198 études) : le détachement psychologique régulier est le prédicteur le plus fort de la récupération. Ces RTT sont une dette biologique.`,
  (n,rtt)=>`${n}${rtt} RTT disponibles non consommés. La méta-analyse "I Need a Vacation" 2023 montre que les effets s'estompent en 2-4 semaines. Mieux vaut des RTT fréquents que des vacances rares.`,
  (n,rtt)=>`${n}Solde RTT élevé (${rtt}j non pris). Risque : si votre accord ne prévoit pas de CET, les RTT non pris au 31/12 peuvent être perdus selon votre CCN. Vérifiez votre convention.`,
  (n,rtt)=>`${n}${rtt} RTT non posés. Conseil stratégique : bloquez-en au moins 1 par mois dans votre agenda maintenant — les RTT posés à l'avance sont rarement annulés, ceux laissés libres le sont souvent.`,
];

// ── Entretien annuel manquant ─────────────────────────────────────
const POOL_ENTRETIEN_MANQUANT = [
  n=>`${n}Entretien annuel non renseigné. Art. L3121-65 : obligation annuelle. La Cour de cassation a annulé des forfaits uniquement sur ce motif (Cass. Soc. 02/07/2014). Planifiez-le dans l'onglet Entretien.`,
  n=>`${n}Aucun entretien annuel enregistré. Sans cette trace, votre forfait est vulnérable juridiquement. Demandez-en un à votre manager — il en a l'obligation, pas seulement le droit.`,
  n=>`${n}Entretien manquant. Rappel : cet entretien doit porter sur 4 points précis (L3121-65) : charge de travail, articulation vie pro/perso, rémunération, organisation. Préparez-le dans l'onglet dédié.`,
  n=>`${n}Pas d'entretien annuel tracé pour cet exercice. Conseil : envoyez un email de demande à votre manager — la trace écrite vous protège si l'entretien n'est pas organisé dans les délais.`,
];

// ── Amplitude horaire ─────────────────────────────────────────────
const POOL_AMPLITUDE = [
  (n,nb)=>`${n}${nb} journée${nb>1?'s':''} avec amplitude >11h détectée${nb>1?'s':''}. Art. L3131-1 : repos quotidien minimum de 11h consécutives — applicable aux cadres en forfait jours. Ce droit vous est opposable.`,
  (n,nb)=>`${n}${nb} amplitude${nb>1?'s':''} longue${nb>1?'s':''} enregistrée${nb>1?'s':''}. Hakola & Härmä 2001 : amplitude >11h perturbe le rythme circadien et génère une dette de sommeil cumulée. Vos scores cognitifs en pâtissent.`,
  (n,nb)=>`${n}Journées longues détectées (${nb}). Les études IRM 2024 documentent une atrophie hippocampique corrélée à la privation de sommeil chronique. Votre capital cognitif est votre actif principal.`,
  (n,nb)=>`${n}${nb} journée${nb>1?'s à':' à'} amplitude excessive. Rappel pratique : si vous finissez après 22h, la prochaine réunion ne devrait pas démarrer avant 9h. Bloquez ce créneau dans votre agenda.`,
];

// ── Forfait Heures — semaine OK ───────────────────────────────────
const POOL_FH_OK = [
  (n,h,s)=>`${n}${h}h cette semaine — dans votre forfait de ${s}h. Aucune HS détectée. Continuez à saisir chaque semaine pour activer les analyses de tendances.`,
  (n,h,s)=>`${n}Semaine conforme (${h}h/${s}h). Pour activer le suivi bio mensuel, saisissez au moins 2 mois consécutifs. Zenji fera le reste.`,
  (n,h)=>`${n}${h}h — bonne gestion du temps. Rappel : l'exonération fiscale TEPA s'applique uniquement aux heures véritablement supplémentaires, pas aux forfaitées. (L241-17 CSS)`,
  (n,h)=>`${n}Semaine dans les clous (${h}h). Astuce : utilisez le mode "Par jour" pour détailler les journées de déplacement — cela améliore la précision de l'analyse biologique.`,
];

// ── Forfait Heures — HS détectées ────────────────────────────────
const POOL_FH_HS = [
  (n,hs,t1,t2)=>`${n}${hs}h supplémentaires cette semaine — ${t1>0?t1+'h à +25%':''}${t2>0?' + '+t2+'h à +50%':''}. Vérifiez que ces heures apparaîtront bien sur votre prochaine fiche de paie avec les majorations correctes.`,
  (n,hs)=>`${n}${hs}h de HS détectées. Rappel : l'exonération fiscale plafonnée à 7 500€/an (Loi TEPA) peut réduire votre imposition. Vérifiez avec votre service paie si c'est bien appliqué.`,
  (n,hs)=>`${n}Semaine chargée — ${hs}h supplémentaires. Zenji a noté. Si ce rythme dure plusieurs semaines, votre bio commencera à refléter la surcharge (Phase P2). Surveillez l'onglet Santé.`,
  (n,hs,contingent,total)=>`${n}${hs}h de HS — total annuel : ${total}h sur ${contingent}h de contingent (${Math.round(total/contingent*100)}%). Au-delà du contingent, l'accord du CSE est requis (L3121-33).`,
];

// ── Forfait Heures — proche du contingent ────────────────────────
const POOL_FH_CONTINGENT = [
  (n,total,cap)=>`${n}Attention : ${total}h de HS sur ${cap}h de contingent annuel (${Math.round(total/cap*100)}%). Au-delà, chaque heure requiert l'accord du CSE et génère une COR (contrepartie obligatoire en repos). (L3121-33)`,
  (n,total,cap)=>`${n}Contingent à ${Math.round(total/cap*100)}%. Il reste ${cap-total}h disponibles. Si le rythme actuel continue, le dépassement est prévu avant la fin d'année. Anticipez avec votre manager.`,
];

// ── Risque CV ─────────────────────────────────────────────────────
const POOL_CV_RISQUE = [
  n=>`${n}Signal cardiovasculaire modéré. WHO/ILO 2021 (Pega et al.) : 745 194 décès/an imputables aux longues heures de travail. La fraction attribuable AVC : 4,5%. Ce n'est pas une statistique abstraite.`,
  n=>`${n}Risque CV détecté. Kivimäki 2015 (Lancet, 603 838 individus) : ≥55h/sem → RR=1,33 pour l'AVC, relation dose-réponse linéaire. Un bilan cardiologique préventif est une sage précaution.`,
  n=>`${n}hsCRP potentiellement élevée (marqueur inflammatoire athérosclérose). Les longues heures élèvent ce marqueur — prédicteur du risque CV à 10 ans. Un bilan sanguin de contrôle est conseillé.`,
  n=>`${n}Exposition CV cumulée. Ervasti 2021 (Lancet Reg. Health Eur., 59 599 individus) : >48h/sem → HR=1,68 pour la mortalité cardiovasculaire avant 65 ans. Agir maintenant réduit ce risque.`,
];

// ── Risque cognitif ───────────────────────────────────────────────
const POOL_COGNITIF = [
  n=>`${n}Risque cognitif détecté. Jang 2025 : 17 régions cérébrales altérées dès ≥52h/sem équivalent (mémoire de travail, attention, insula — la région de la régulation émotionnelle). Votre capital cognitif est votre actif principal.`,
  n=>`${n}Signal cognitif. Frontiers Aging Neuroscience 2025 : brain age gap augmenté chez les cadres à horaires irréguliers. Risque de démence accru à long terme. Ce n'est pas alarmiste — c'est de la prévention.`,
  n=>`${n}Charge cognitive élevée. PMC10921288 (2024) : privation de sommeil → réduction activité du gyrus frontal médian (planification, décision). Vos meetings matinaux après des soirées tardives sont moins efficaces que vous ne le pensez.`,
];

// ── Vieillissement biologique ─────────────────────────────────────
const POOL_VIEILLISSEMENT = [
  n=>`${n}Vieillissement biologique accéléré détecté. Ahola 2012 (PLoS ONE, n=2 911) : épuisement → télomères leucocytaires plus courts. Ce marqueur est réversible en P2, plus difficile en P3. Agissez maintenant.`,
  n=>`${n}Signal épigénétique. Dresden Burnout Study 2025 : le cortisol capillaire accélère les horloges biologiques (DNAm GrimAge2). La bonne nouvelle : la récupération active ralentit ce processus. Les RTT comptent vraiment.`,
  n=>`${n}Vieillissement cellulaire accéléré. La recherche confirme que ce processus est partiellement réversible avec une récupération adéquate (Sonnentag 2022). Planifiez dès maintenant des périodes de décrochage réel.`,
];

// ── Droit à la déconnexion ────────────────────────────────────────
const POOL_DECONNEXION = [
  n=>`${n}Amplitude nocturne détectée cette semaine. Rappel : Art. L3121-65 al.3 — votre accord d'entreprise doit prévoir des modalités de déconnexion numérique. Si elles n'existent pas, c'est une lacune juridique chez votre employeur.`,
  n=>`${n}Journées très longues. Le droit à la déconnexion n'est pas un luxe — c'est une obligation légale depuis la loi Travail 2016 (L3121-65). Bloquez vos soirées dans votre agenda comme des réunions non-négociables.`,
  n=>`${n}Conseil pratique de déconnexion : activez les "Ne pas déranger" automatiques sur votre téléphone entre 20h et 8h. Les études montrent que la seule présence du téléphone (même éteint) réduit les capacités cognitives.`,
];

// ── Projets / Cadre Dirigeant ─────────────────────────────────────
const POOL_PROJETS = [
  n=>`${n}Bonne ventilation du temps par domaine. Conseil stratégique : si la catégorie "Opérationnel" dépasse 60%, c'est un signal que la délégation est insuffisante — votre valeur ajoutée est ailleurs.`,
  n=>`${n}Vos missions sont documentées. Cette traçabilité est utile pour l'entretien de performance et les négociations salariales. Un dirigeant qui quantifie son impact est toujours mieux positionné.`,
  n=>`${n}Temps passé sur les projets enregistré. Rappel : même sans obligation légale de compteur d'heures (L3111-2), votre employeur a une obligation de prévention sur votre santé (L4121-1). Cette donnée vous protège.`,
];

// ── Cadre Dirigeant — CP ─────────────────────────────────────────
const POOL_DIRIGEANT_CP = [
  (n,solde)=>`${n}Solde CP : ${solde} jour${solde>1?'s':''}. Même les dirigeants ont des congés payés légaux (L3141-1 — 25j minimum). Si votre solde est faible en fin d'année, ils peuvent être perdus selon votre accord.`,
  (n,solde)=>`${n}${solde} jour${solde>1?'s':''} de CP restants. Conseil de gestion : bloquez vos congés dans votre agenda maintenant — un dirigeant qui ne prend pas ses congés donne un mauvais signal à ses équipes.`,
  (n,solde)=>`${n}Solde CP à ${solde}j. Pour les cadres dirigeants, les CP peuvent être placés sur un CET (L3151-1) si votre accord le prévoit. Alternative : fractionnement pour maximiser les droits bonus (L3141-23).`,
];

// ── Risque nullité forfait ────────────────────────────────────────
const POOL_NULLITE_RISQUE = [
  (n,nb)=>`${n}Simulateur de nullité : ${nb} condition${nb>1?'s':''} non satisfaite${nb>1?'s':''}. Un juge prud'homal peut annuler votre forfait sur ces bases et requalifier toutes vos heures en HS depuis l'origine. Corrigez les points rouges.`,
  (n,score)=>`${n}Score de conformité forfait : ${score}/100. En dessous de 70, le risque de contestation est réel. La Cour de cassation annule régulièrement des forfaits sur l'absence d'entretien seul (Cass. 02/07/2014).`,
  n=>`${n}Vérification juridique : votre accord de branche autorise-t-il explicitement le forfait jours ? La Cass. Soc. 29/06/2011 a invalidé des forfaits reposant sur des accords insuffisants. Vérifiez sur légifrance.fr.`,
];

// ── Calculateur rupture ───────────────────────────────────────────
const POOL_RUPTURE = [
  (n,mois)=>`${n}${mois} mois d'ancienneté. Pour une rupture conventionnelle, l'indemnité légale est de 1/4 de mois de salaire par an jusqu'à 10 ans, 1/3 au-delà. Votre CCN peut prévoir mieux — simulez dans l'onglet Export.`,
  (n,mois)=>`${n}Ancienneté : ${mois} mois. Rappel : le préavis du cadre (souvent 3 mois) et l'indemnité de licenciement sont deux choses distinctes. La rupture conventionnelle permet de négocier les deux simultanément.`,
];

// ── Validation mensuelle ──────────────────────────────────────────
const POOL_VALIDATION = [
  n=>`${n}Pensez à valider ce mois dans l'onglet Export — cette trace horodatée renforce la valeur probante de vos données en cas de contrôle ou de litige prud'homal.`,
  n=>`${n}Mois non validé. La validation mensuelle + signature manager transforme votre suivi en document opposable. Zenji vous recommande de le faire systématiquement chaque fin de mois.`,
  n=>`${n}Rappel de fin de mois : générez et faites signer le PDF mensuel. En cas de litige, c'est ce document qui fera la différence devant les prud'hommes.`,
];

// ── Messages saisonniers ──────────────────────────────────────────
const POOL_SAISONNIER = [
  n=>`${n}Début d'année — moment idéal pour configurer votre forfait, planifier vos RTT annuels et fixer l'entretien de charge avec votre manager avant que l'agenda ne se charge.`,
  n=>`${n}Mi-année. C'est le bon moment pour faire un point intermédiaire : êtes-vous sur la bonne trajectoire pour votre forfait annuel ? Vos RTT sont-ils planifiés ?`,
  n=>`${n}Fin d'année approche. Vérifiez votre solde RTT — selon votre CCN, les jours non pris au 31/12 peuvent être perdus. Planifiez maintenant plutôt que de les monétiser en urgence.`,
  n=>`${n}Rentrée de septembre. La période septembre-novembre est statistiquement la plus à risque pour les surcharges de travail. Surveillez votre phase INRS chaque mois.`,
  n=>`${n}Période estivale. Les études montrent que la récupération vacancière s'estompe en 2-4 semaines (Sonnentag 2022). Maintenez des RTT réguliers à la rentrée plutôt que de "rattraper" le temps libre.`,
];

// ── Messages de motivation ────────────────────────────────────────
const POOL_MOTIVATION = [
  n=>`${n}Chaque journée saisie est une donnée. Chaque donnée est une protection. Continuez — votre futur vous remerciera si un litige survient.`,
  n=>`${n}Vous utilisez M6 régulièrement — c'est déjà plus que 90% des cadres en forfait jours. La plupart n'ont aucune trace de leur charge de travail réelle.`,
  n=>`${n}Votre diligence dans la saisie fait de vous un cadre protégé. En cas de burn-out ou de litige, cet historique est votre meilleure défense.`,
  n=>`${n}Rappel de Zenji : un cadre bien informé est un cadre qui négocie mieux. Connaître ses droits (entretien, rachat, repos) est un avantage professionnel, pas seulement une protection.`,
  n=>`${n}La recherche montre que les cadres qui suivent activement leur charge de travail ont une meilleure récupération subjective — simplement parce qu'ils reprennent le contrôle. (ANACT 2022)`,
];

// ── Récap mensuel ─────────────────────────────────────────────────
const POOL_RECAP_MENSUEL = [
  (n,mois,j,rtt)=>`${n}${mois} : ${j} jours travaillés, ${rtt} RTT pris. Pensez à valider ce mois et à générer le PDF mensuel dans l'onglet Export.`,
  (n,mois,j)=>`${n}Bilan ${mois} : ${j} jours saisis. Profitez du début du mois suivant pour prendre du recul sur votre rythme et anticiper les semaines à venir.`,
];

// ══════════════════════════════════════════════════════════════════
//  MOTEUR DE SÉLECTION CONTEXTUEL
// ══════════════════════════════════════════════════════════════════

const M6_Zenji = {

  _name(contract) {
    const nom = contract?.nomCadre || contract?.nom || '';
    return nom ? nom + ' — ' : '';
  },

  // ── Bubble courte (bilan + sidebar) ──────────────────────────
  getBubbleText(section, analysis, bio, contract) {
    const n = this._name(contract);
    const a = analysis || {};
    const b = bio || {};

    // Priorité décroissante
    if (b.phase?.code === 'P4') return _next(POOL_P4)(n);
    if (b.phase?.code === 'P3') return _next(POOL_P3)(n);

    if (section === 'nullite') {
      const nullRes = window.M6_SimulateurNullite?.analyze(contract, a, {}, new Date().getFullYear());
      if (nullRes?.nbDanger >= 2) return _next(POOL_NULLITE_RISQUE)(n, nullRes.nbDanger);
      if (nullRes?.score < 70)   return _next(POOL_NULLITE_RISQUE)(n, nullRes.score);
    }

    if (section === 'sante' || section === 'bio') {
      if (b.cvRisk >= 35)    return _next(POOL_CV_RISQUE)(n);
      if (b.agingRisk >= 50) return _next(POOL_VIEILLISSEMENT)(n);
      if (b.cogRisk >= 40)   return _next(POOL_COGNITIF)(n);
      if (b.phase?.code === 'P2') return _next(POOL_P2)(n);
    }

    if (section === 'entretien') return _next(POOL_ENTRETIEN_MANQUANT)(n);
    if (section === 'projets')   return _next(POOL_PROJETS)(n);

    if (section === 'export') {
      const valMois = Object.keys(M6_Storage?.getValidations?.('forfait_jours', new Date().getFullYear()) || {}).length;
      if (valMois < new Date().getMonth()) return _next(POOL_VALIDATION)(n);
    }

    // Alertes bilan
    if (a.joursEffectifs > a.plafond) {
      const excess = a.joursEffectifs - a.plafond;
      return _next(POOL_DEPASSE)(n, excess);
    }
    if (a.tauxRemplissage >= 90) return _next(POOL_APPROCHE_PLAFOND)(n, a.joursEffectifs, a.plafond);
    if (a.rachetes >= 3) return _next(POOL_RACHAT)(n, a.rachetes);
    if (a.rttPris === 0 && a.joursEffectifs > 40) return _next(POOL_RTT_NON_PRIS)(n, a.rttTheoriques);
    if ((a.amplitudeViolations?.length || 0) > 3) return _next(POOL_AMPLITUDE)(n, a.amplitudeViolations.length);

    if (b.phase?.code === 'P2') return _next(POOL_P2)(n);

    // Saisonniers selon le mois
    const m = new Date().getMonth();
    if (m === 0 || m === 1) return _next(POOL_SAISONNIER)(n);
    if (m === 8 || m === 9) return _next(POOL_SAISONNIER)(n);

    return _next(POOL_NORMAL)(n);
  },

  // ── Popup riche (avec actions cliquables) ─────────────────────
  getPopupContent(section, analysis, bio, contract, regime) {
    const n = this._name(contract);
    const a = analysis || {};
    const b = bio || {};

    // Cache par jour + situation (évite le spam)
    const today = new Date().toISOString().slice(0,10);
    const cacheKey = `${today}_${section}_${b.phase?.code||'P1'}_${a.tauxRemplissage||0}`;
    const cached = _json(K.POPUP_DAY, {});
    if (cached.key === cacheKey && cached.msg) return cached.msg;

    let msg;

    // ── P4 : urgence maximale ─────────────────────────────────
    if (b.phase?.code === 'P4') {
      msg = {
        niveau: 'danger', titre: 'Phase P4 — Burn-out critique',
        portrait: true,
        corps: `${n}La situation biologique est critique. La Dresden Burnout Study 2025 confirme que l'inaction à ce stade accélère le vieillissement épigénétique de façon mesurable. Ce n'est pas de la fatigue passagère.

Art. L4121-1 : votre employeur a une obligation de résultat sur votre santé. Vous pouvez et devez agir.`,
        actions: [
          { label: 'Contacter la médecine du travail', sec: 'entretien' },
          { label: 'Documenter la charge dans l\'entretien', sec: 'entretien' },
          { label: 'Voir les alertes santé complètes', sec: 'sante' },
        ]
      };
    }

    // ── P3 : surmenage ────────────────────────────────────────
    else if (b.phase?.code === 'P3') {
      msg = {
        niveau: 'warning', titre: 'Phase P3 — Surmenage documenté',
        portrait: true,
        corps: `${n}Phase INRS P3 confirmée. Totterdell 2005 : les cadres en surcharge développent un cycle d'épuisement émotionnel difficile à briser sans action concrète.

Kivimäki 2015 (603 838 individus) : à ce niveau d'exposition, le RR AVC atteint 1,33. Ce n'est pas de l'alarmisme — c'est de l'épidémiologie publiée dans The Lancet.

Vous pouvez agir maintenant. Zenji vous aide à préparer l'entretien de charge.`,
        actions: [
          { label: 'Préparer l\'entretien de charge', sec: 'entretien' },
          { label: 'Voir les alertes santé', sec: 'sante' },
          { label: 'Planifier des RTT', sec: 'calendrier' },
        ]
      };
    }

    // ── Dépassement forfait ───────────────────────────────────
    else if (a.joursEffectifs > a.plafond) {
      const excess = a.joursEffectifs - a.plafond;
      msg = {
        niveau: 'danger', titre: `Forfait dépassé — ${excess} jour${excess>1?'s':''}`,
        portrait: true,
        corps: `${n}${excess} jour${excess>1?'s':''} au-delà de votre plafond de ${a.plafond}. Sans avenant écrit et majoré ≥10%, ces jours supplémentaires ne sont pas juridiquement opposables.

Art. L3121-59 : le rachat doit être formalisé par un avenant signé avant l'exécution — pas après.

La jurisprudence (Cass. Soc. 4/11/2015) a sanctionné les dépassements réguliers comme charge déraisonnable de travail, ouvrant droit à des dommages-intérêts.`,
        actions: [
          { label: 'Simuler le rachat', sec: 'bilan' },
          { label: 'Générer le PDF mensuel', sec: 'export' },
          { label: 'Voir la conformité juridique', sec: 'nullite' },
        ]
      };
    }

    // ── Approche plafond ──────────────────────────────────────
    else if (a.tauxRemplissage >= 90) {
      const r = Math.max(0, a.plafond - a.joursEffectifs);
      msg = {
        niveau: 'warning', titre: `Approche du plafond — ${r} jour${r>1?'s':''} restant${r>1?'s':''}`,
        portrait: true,
        corps: `${n}Vous avez travaillé ${a.joursEffectifs} jours sur ${a.plafond}. Il reste ${r} jours avant le plafond légal.

À ce rythme, le dépassement est probable avant la fin d'année. Options disponibles :
— Poser des RTT dès maintenant pour réduire le compteur
— Anticiper un avenant de rachat (L3121-59, ≥10%)
— Signaler la charge dans l'entretien annuel (L3121-65)`,
        actions: [
          { label: 'Planifier des RTT', sec: 'calendrier' },
          { label: 'Voir la conformité', sec: 'nullite' },
          { label: 'Préparer l\'entretien', sec: 'entretien' },
        ]
      };
    }

    // ── P2 ────────────────────────────────────────────────────
    else if (b.phase?.code === 'P2') {
      msg = {
        niveau: 'warning', titre: 'Phase P2 — Fatigue chronique',
        portrait: true,
        corps: `${n}Niveau INRS P2 confirmé. La fatigue s'accumule de façon non-linéaire — le prochain cap (P3) arrive plus vite qu'on ne le pense.

La bonne nouvelle : à ce stade, la récupération est pleinement efficace. Sonnentag 2022 (méta-analyse 198 études) : un RTT pris cette semaine vaut biologiquement plus que 3 jours de vacances dans 2 mois.

Ahola 2012 (PLoS ONE) : les marqueurs biologiques de vieillissement sont encore réversibles en P2.`,
        actions: [
          { label: 'Poser un RTT', sec: 'calendrier' },
          { label: 'Voir les tendances bio', sec: 'tendances' },
          { label: 'Préparer l\'entretien de charge', sec: 'entretien' },
        ]
      };
    }

    // ── RTT non pris ──────────────────────────────────────────
    else if (a.rttPris === 0 && a.joursEffectifs > 40) {
      msg = {
        niveau: 'info', titre: 'Aucun RTT pris — dette biologique',
        portrait: false,
        corps: `${n}Vous avez ${a.rttTheoriques} RTT théoriques disponibles et n'en avez pris aucun.

Sonnentag et al. 2022 (Annual Review Org. Psych., méta-analyse 198 études) : le détachement psychologique RÉGULIER est le prédicteur le plus fort de la récupération. Les RTT non pris sont une dette biologique, pas une épargne.

La méta-analyse "I Need a Vacation" 2023 confirme que les effets bénéfiques des vacances s'estompent en 2-4 semaines. Des RTT fréquents valent mieux que de rares grandes vacances.`,
        actions: [
          { label: 'Poser un RTT dès cette semaine', sec: 'calendrier' },
          { label: 'Voir les tendances', sec: 'tendances' },
        ]
      };
    }

    // ── Entretien manquant ────────────────────────────────────
    else if (!contract?.entretienDate || new Date(contract.entretienDate).getFullYear() < new Date().getFullYear()) {
      msg = {
        niveau: 'info', titre: 'Entretien annuel à planifier',
        portrait: false,
        corps: `${n}Aucun entretien annuel de charge de travail enregistré pour cet exercice.

Art. L3121-65 : obligation annuelle pour l'employeur. La Cour de cassation (Cass. Soc. 02/07/2014) a annulé des conventions de forfait uniquement sur ce motif — même si l'accord collectif était valide.

Zenji vous aide à préparer les 4 points obligatoires : charge de travail, articulation vie pro/perso, rémunération, organisation.`,
        actions: [
          { label: 'Préparer l\'entretien', sec: 'entretien' },
          { label: 'Vérifier la conformité', sec: 'nullite' },
        ]
      };
    }

    // ── Situation saine ───────────────────────────────────────
    else {
      const msgs_ok = [
        {
          niveau: 'ok', titre: 'Situation conforme',
          portrait: true,
          corps: `${n}Aucune alerte détectée. Votre forfait est conforme sur les plans juridique et biologique.

Conseil de Zenji : profitez de cette période stable pour planifier vos RTT du prochain trimestre — les RTT bloqués à l'avance sont rarement annulés.

Rappel : même en situation conforme, la validation mensuelle (onglet Export) renforce la valeur probante de votre suivi.`,
          actions: [
            { label: 'Voir les tendances bio', sec: 'tendances' },
            { label: 'Valider ce mois', sec: 'export' },
            { label: 'Vérifier la conformité', sec: 'nullite' },
          ]
        },
        {
          niveau: 'ok', titre: 'Bonne gestion du forfait',
          portrait: false,
          corps: `${n}Tout est en ordre. C'est le bon moment pour faire un point sur votre glossaire — connaître ses droits est un avantage professionnel concret.

Savez-vous que le "Droit à la déconnexion" (L3121-65 al.3) doit être formalisé dans un accord ou une charte chez votre employeur ? Son absence est une lacune juridique qu'il doit corriger.`,
          actions: [
            { label: 'Explorer le glossaire', sec: 'glossaire' },
            { label: 'Voir les tendances', sec: 'tendances' },
          ]
        },
      ];
      msg = msgs_ok[Math.floor(Math.random() * msgs_ok.length)];
    }

    _set(K.POPUP_DAY, JSON.stringify({ key: cacheKey, msg }));
    return msg;
  },

  clearCache() {
    try { localStorage.removeItem(K.POPUP_DAY); } catch(_) {}
  },

  // ── Rendu HTML carte ─────────────────────────────────────────
  renderCard(message, phase, compact = false) {
    if (!message) return '';
    const phaseColors = {
      P1: { border:'#4A7C6F', badge:'#E8F5F0', badgeText:'#2D5A4E' },
      P2: { border:'#C4853A', badge:'#FFF7E6', badgeText:'#8B5A1A' },
      P3: { border:'#B85C50', badge:'#FFF0EE', badgeText:'#7A3028' },
      P4: { border:'#9B2C2C', badge:'#FBEAEA', badgeText:'#9B2C2C' },
    };
    const pc = phaseColors[phase] || phaseColors.P1;
    if (compact) {
      return `<div style="display:flex;align-items:flex-start;gap:10px;background:var(--ivoire);border-radius:var(--radius);padding:10px 12px;margin-bottom:14px;border-left:3px solid ${pc.border}">
        <img src="../module6/images/Cadre.png" alt="Zenji" style="width:34px;height:34px;object-fit:cover;object-position:top center;border-radius:50%;flex-shrink:0;border:2px solid ${pc.border}">
        <div>
          <div style="font-size:0.62rem;text-transform:uppercase;letter-spacing:0.08em;color:${pc.border};font-weight:600;margin-bottom:2px">Zenji — Conseiller M6</div>
          <div style="font-size:0.8rem;color:var(--charbon-3);line-height:1.5;font-style:italic">"${message}"</div>
        </div>
      </div>`;
    }
    return `<div style="background:#fff;border-radius:var(--radius-lg);border:1px solid var(--grey-line);border-top:3px solid ${pc.border};margin-bottom:16px;overflow:hidden;box-shadow:var(--shadow-sm)">
      <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-bottom:var(--grey-line)">
        <div style="position:relative;width:52px;height:52px;flex-shrink:0">
          <img src="../module6/images/Cadre.png" alt="Zenji" style="width:52px;height:52px;object-fit:cover;object-position:top center;border-radius:50%;border:2px solid ${pc.border}">
          <div style="position:absolute;bottom:-2px;right:-2px;width:18px;height:18px;background:${pc.border};border-radius:50%;border:2px solid #fff;display:flex;align-items:center;justify-content:center;font-size:0.55rem;color:#fff;font-weight:700">${phase||'P1'}</div>
        </div>
        <div><div style="font-family:var(--font-display);font-size:1rem;font-weight:600;color:var(--charbon)">Zenji</div>
          <div style="font-size:0.62rem;text-transform:uppercase;letter-spacing:0.08em;color:${pc.border}">Conseiller · M6 Cadres</div>
        </div>
        <span style="margin-left:auto;font-size:0.6rem;background:${pc.badge};color:${pc.badgeText};border-radius:99px;padding:2px 8px;font-weight:600">Phase ${phase||'P1'}</span>
      </div>
      <div style="padding:12px 14px">
        <div style="font-size:0.82rem;color:var(--charbon-3);line-height:1.65;font-style:italic;border-left:3px solid ${pc.border};padding-left:10px">"${message}"</div>
      </div>
    </div>`;
  },

  // ── Intro onboarding ──────────────────────────────────────────
  renderIntro() {
    return `
    <div style="min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 16px;text-align:center">
      <div style="position:relative;margin-bottom:20px">
        <img src="../module6/images/Cadre.png" alt="Zenji" style="width:160px;height:160px;object-fit:cover;object-position:top 5% center;border-radius:50%;border:3px solid var(--champagne);box-shadow:0 8px 32px rgba(196,163,90,0.25)">
        <div style="position:absolute;bottom:0;right:0;background:var(--champagne);border-radius:99px;padding:3px 10px;font-size:0.62rem;font-weight:700;color:var(--charbon);border:2px solid #fff;letter-spacing:0.06em">M6 CADRES</div>
      </div>
      <div style="font-family:var(--font-display);font-size:1.8rem;font-weight:600;color:var(--charbon);margin-bottom:4px">Zenji</div>
      <div style="font-size:0.7rem;color:var(--champagne-2);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:20px">Conseiller · Forfait Cadres · 9 queues de sagesse</div>
      <div style="background:var(--ivoire);border-radius:var(--radius-lg);padding:16px;margin-bottom:18px;border-left:4px solid var(--champagne);text-align:left;max-width:340px">
        <div style="font-size:0.83rem;color:var(--charbon-3);line-height:1.7;font-style:italic">"Le forfait jours vous donne de l'autonomie. Mon rôle : m'assurer que cette autonomie ne se retourne pas contre vous — ni juridiquement, ni biologiquement. Stratégie, conformité, santé : je surveille les trois."</div>
        <div style="font-size:0.65rem;color:var(--pierre);margin-top:6px;text-align:right">— Zenji</div>
      </div>
      <div style="font-size:0.7rem;color:var(--pierre);margin-bottom:18px;line-height:1.6;max-width:300px">Kivimäki 2015 · Sonnentag 2022 · Pencavel 2014<br>Ahola 2012 · Dresden 2025 · INRS · Code du travail</div>
    </div>`;
  },

  getContextMessage(section, analysis, bio, contract) {
    return this.getBubbleText(section, analysis, bio, contract);
  }
};

// ── Onboarding state ─────────────────────────────────────────────
const M6_ZenjiOnboarding = {
  isFirstVisit(regime) { return !_get(regime ? 'M6_ZENJI_SEEN_'+regime : 'M6_ZENJI_SEEN'); },
  markSeen(regime) { _set(regime ? 'M6_ZENJI_SEEN_'+regime : 'M6_ZENJI_SEEN','1'); },
  reset()        { try{localStorage.removeItem('M6_ZENJI_SEEN');}catch(_){} }
};

global.M6_Zenji           = M6_Zenji;
global.M6_ZenjiOnboarding = M6_ZenjiOnboarding;
global.M6_POOL_MOTIVATION = POOL_MOTIVATION; // exporté pour zenji-popup

})(window);
