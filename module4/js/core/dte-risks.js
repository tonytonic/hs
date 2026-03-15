/**
 * DTE Risks — Détection des risques légaux et médicaux
 */
(function(global){
'use strict';

const RISK_DEFS=[
  {
    id:'FATIGUE_CRITIQUE', level:'CRITIQUE', emoji:'🚨',
    titre:'Fatigue critique — Danger immédiat',
    condition:(sc,n)=>sc.fatigue>=95,
    message:(sc)=>`Score fatigue ${sc.fatigue}/100. Arrêt de travail fortement recommandé.`,
    article:'Art. L4121-1 C. trav. — Obligation de sécurité',
    actions:['Contacter le médecin du travail immédiatement','Activer la procédure de danger grave et imminent (Art. L4131-1)','Refus de travail légalement fondé'],
  },
  {
    id:'FATIGUE_RISQUE', level:'DANGER', emoji:'⚠️',
    titre:'Fatigue élevée — Risque d\'erreur',
    condition:(sc,n)=>sc.fatigue>=85&&sc.fatigue<95,
    message:(sc)=>`Fatigue ${sc.fatigue}/100. Risque d\'erreur professionnel important.`,
    article:'Art. L3121-18 C. trav. — Durée quotidienne max (10h)',
    actions:['Réduire les HS immédiatement','Prendre 2 jours de récupération consécutifs','Vérifier le repos quotidien de 11h'],
  },
  {
    id:'FATIGUE_ALERTE', level:'ALERTE', emoji:'🔶',
    titre:'Fatigue en hausse — Vigilance requise',
    condition:(sc,n)=>sc.fatigue>=75&&sc.fatigue<85,
    message:(sc)=>`Fatigue ${sc.fatigue}/100. Rythme à surveiller.`,
    article:'Art. L3121-20 C. trav. — Durée hebdomadaire (48h max)',
    actions:['Respecter les 11h de repos quotidien','Limiter les HS cette semaine'],
  },
  {
    id:'STRESS_ELEVE', level:'DANGER', emoji:'😰',
    titre:'Stress psychosocial élevé',
    condition:(sc,n)=>sc.stress>=70,
    message:(sc)=>`Stress ${sc.stress}/100. Risques psychosociaux détectés.`,
    article:'Art. L4121-1 + Accord ANI 2008 sur le stress au travail',
    actions:['Vérifier le DUERP (Document Unique)','Informer les représentants du personnel','Consulter le médecin du travail'],
  },
  {
    id:'SURCHARGE_STRUCT', level:'ALERTE', emoji:'📊',
    titre:'Surcharge structurelle',
    condition:(sc,n)=>sc.overloadRisk>=70,
    message:(sc)=>`Surcharge ${sc.overloadRisk}/100. Trop de jours au-delà du seuil.`,
    article:'Art. L3121-22 C. trav. — Contingent annuel HS',
    actions:['Planifier une période de récupération','Analyser la charge avec l\'employeur'],
  },
  {
    id:'PERF_DEGRADEE', level:'ALERTE', emoji:'📉',
    titre:'Performance dégradée',
    condition:(sc,n)=>sc.performance<45,
    message:(sc)=>`Performance estimée ${sc.performance}/100. Efficacité réduite.`,
    article:'Indicateur de santé au travail',
    actions:['Réduire la charge cognitive','Prendre des pauses régulières (méthode Pomodoro)'],
  },
  {
    id:'CONTINGENT_DEPASSE', level:'CRITIQUE', emoji:'🚫',
    titre:'Contingent annuel dépassé',
    condition:(sc,n)=>n._contingentPct>=100,
    message:(sc,n)=>`${Math.round(n._contingentPct)}% du contingent (220h) utilisé.`,
    article:'Art. L3121-33 C. trav. — Repos compensateur obligatoire',
    actions:['Les HS au-delà du contingent ouvrent droit au repos compensateur obligatoire','Accord de l\'inspecteur du travail requis pour continuer'],
  },
  {
    id:'CONTINGENT_ALERTE', level:'ALERTE', emoji:'📅',
    titre:'Contingent annuel proche de la limite',
    condition:(sc,n)=>n._contingentPct>=75&&n._contingentPct<100,
    message:(sc,n)=>`${Math.round(n._contingentPct)}% du contingent utilisé.`,
    article:'Art. L3121-33 C. trav.',
    actions:['Anticiper la gestion du solde','Vérifier les accords collectifs applicables'],
  },
  {
    id:'CONSEC_ELEVE', level:'ALERTE', emoji:'📆',
    titre:'Jours consécutifs élevés',
    condition:(sc,n)=>n._consec>=7,
    message:(sc,n)=>`${n._consec} jours consécutifs travaillés.`,
    article:'Art. L3132-1 C. trav. — Repos hebdomadaire (35h minimum)',
    actions:['Prendre au minimum 35h de repos consécutives','Vérifier les dérogations conventionnelles applicables'],
  },
];

class DTERisks {
  detect(scores, norm){
    if(!scores||!norm) return [];
    const order={CRITIQUE:0,DANGER:1,ALERTE:2};
    return RISK_DEFS
      .filter(r=>r.condition(scores,norm))
      .map(r=>({
        id:r.id, level:r.level, emoji:r.emoji,
        titre:r.titre,
        message:typeof r.message==='function'?r.message(scores,norm):r.message,
        article:r.article,
        actions:r.actions,
      }))
      .sort((a,b)=>(order[a.level]??3)-(order[b.level]??3));
  }
  getAll(){ return RISK_DEFS; }
}

global.DTERisks=DTERisks;
}(typeof window!=='undefined'?window:global));