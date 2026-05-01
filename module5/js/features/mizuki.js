/**
 * MIZUKI — Compagne de Kitsune, guide des salariées à temps partiel
 * 100+ messages dynamiques — ton doux, bienveillant, féminin
 */
(function(global) {
'use strict';

const K = {
  MSG_IDX:     'M5_MIZUKI_MSG_IDX',
  POPUP_CACHE: 'M5_POPUP_DAILY',
  USER_NAME:   'M5_USER_NAME',
};
function _get(k,def=''){try{return localStorage.getItem(k)??def;}catch(_){return def;}}
function _set(k,v){try{localStorage.setItem(k,String(v));}catch(_){}}
function _json(k,def={}){try{return JSON.parse(localStorage.getItem(k))??def;}catch(_){return def;}}

// ── POOLS DE MESSAGES ────────────────────────────────────────────

const MSGS_NORMAL = [
  n=>`🦊 ${n}Aucune heure complémentaire cette semaine — ton contrat est respecté. Exactement comme il devrait l'être !`,
  n=>`🦊 ${n}Semaine parfaite ! Tu restes dans les limites de ton contrat. Continue à noter chaque semaine.`,
  n=>`🦊 ${n}Tout est en ordre cette semaine. Garde une trace régulière, même quand tout va bien — c'est utile en cas de litige.`,
  n=>`🦊 ${n}Aucun dépassement détecté. Mizuki est là si ça change !`,
  n=>`🦊 ${n}Contrat respecté cette semaine. Profite de ton temps libre — il t'appartient.`,
  n=>`🦊 ${n}Zéro heure comp. cette semaine. C'est ton droit de ne travailler que ce qui est prévu au contrat.`,
  n=>`🦊 ${n}Bonne semaine ! Pas d'heure complémentaire à signaler. Continue comme ça.`,
  n=>`🦊 ${n}Tout va bien cette semaine — aucun dépassement. Mizuki est là si ça change !`,
  n=>`🦊 ${n}Semaine conforme. Si tu as une semaine chargée à venir, saisis-la dès maintenant.`,
  n=>`🦊 ${n}Dans les clous ! Chaque semaine saisie renforce ton dossier si tu en as besoin un jour.`,
  n=>`🦊 ${n}Aucune anomalie détectée. Mizuki surveille pour toi en permanence.`,
  n=>`🦊 ${n}Semaine dans les clous ! Rappel : sans accord collectif, le délai de prévenance est de 7 jours ouvrés (Art. L3123-31).`,
  n=>`🦊 ${n}Aucun dépassement cette semaine. Bon à savoir : tu peux refuser des HC demandées moins de 3 jours avant (Art. L3123-10).`,
];

const MSGS_COMP_LOW = [
  (n,h,r1)=>`🦊 ${n}${h}h complémentaires cette semaine, majorées à +${Math.round(r1*100)}%. Vérifie bien qu'elles apparaissent sur ta fiche de paie !`,
  (n,h,r1)=>`🦊 ${n}Tu as dépassé ton contrat de ${h}h — elles doivent être payées avec +${Math.round(r1*100)}% de majoration. Mizuki a tout noté.`,
  (n,h)=>`🦊 ${n}${h}h en plus du contrat cette semaine. Mizuki a tout noté — vérifie bien ces heures sur ta prochaine fiche de paie.`,
  (n,h)=>`🦊 ${n}Quelques heures complémentaires (${h}h). Garde cet historique — si ça dure 12 semaines de suite, ton contrat devra être modifié.`,
  (n,h,r1)=>`🦊 ${n}${h}h au-delà de ton contrat, à +${Math.round(r1*100)}%. Tu as bien fait de les noter — c'est ta preuve en cas de problème.`,
  (n,h)=>`🦊 ${n}${h}h complémentaires relevées. Pense à vérifier ta prochaine fiche de paie — ces heures doivent y figurer séparément.`,
  (n,h)=>`🦊 ${n}Tu travailles un peu plus que prévu (${h}h extra). C'est normal de temps en temps, l'important c'est que ce soit bien payé.`,
  (n,h,r1)=>`🦊 ${n}${h}h complémentaires à +${Math.round(r1*100)}% cette semaine. Si tu ne vois pas la majoration sur ta fiche, c'est une erreur de paie.`,
];

const MSGS_COMP_HIGH = [
  (n,h)=>`🦊 ${n}${h}h complémentaires cette semaine — les premières à +10%, les suivantes à +25%. Mizuki a calculé les majorations pour toi.`,
  (n,h)=>`🦊 ${n}Semaine bien chargée avec ${h}h au-delà du contrat. Vérifie ta fiche de paie avec les deux taux de majoration.`,
  (n,h)=>`🦊 ${n}${h}h extra cette semaine. Au-delà du 1/10e de ton contrat, le taux monte à +25%. Tu mérites d'être bien payée !`,
  (n,h)=>`🦊 ${n}${h}h complémentaires — et toutes doivent être rémunérées. Conserve cet historique précieusement.`,
];

const MSGS_PROCHE_35 = [
  (n,h)=>`🦊 ${n}Attention : tu as travaillé ${h}h cette semaine. C'est très proche des 35h légales — encore quelques heures et ton contrat pourrait être requalifié !`,
  (n,h)=>`🦊 ${n}${h}h cette semaine — tu es proche du seuil légal de 35h. Les heures complémentaires ne peuvent jamais atteindre le temps plein.`,
  (n,h)=>`🦊 ${n}Vigilance ! À ${h}h cette semaine, il ne reste que ${(35-h).toFixed(1)}h avant le seuil du temps plein. La loi protège ton statut de temps partiel.`,
];

const MSGS_REQUALIF = [
  (n,h)=>`🦊 ${n}${h}h cette semaine — le seuil légal du temps plein est atteint. La loi prévoit des droits dans ce cas. Conserve cet historique.`,
  (n,h)=>`🦊 ${n}${h}h cette semaine — c'est le seuil légal. Un contrat à temps partiel ne peut pas atteindre 35h. Garde une trace de cette semaine.`,
  (n,h)=>`🦊 ${n}${h}h travaillées — ton contrat devrait déjà être à temps plein selon la loi. Conserve cet historique, c'est important.`,
];

const MSGS_12SEM = [
  (n,c)=>`🦊 ${n}Depuis ${c} semaines, tes heures dépassent régulièrement le contrat. L'Art. L3123-13 prévoit une révision du contrat — tu peux en faire la demande.`,
  (n,c)=>`🦊 ${n}${c} semaines consécutives au-dessus du contrat. Si tu le souhaites, tu peux demander une révision de ta durée contractuelle (Art. L3123-13).`,
  (n,c)=>`🦊 ${n}La règle des 12 semaines s'applique (${c} semaines). Tu peux demander une révision de ton contrat ou garder ton horaire actuel — c'est ton choix.`,
];

const MSGS_VACANCES = [
  n=>`🦊 ${n}Semaine de congés — profite vraiment du repos ! Mizuki surveille ton historique pendant ton absence.`,
  n=>`🦊 ${n}Tu es en vacances cette semaine. Tes données restent intactes. Déconnecte vraiment — c'est bon pour toi.`,
  n=>`🦊 ${n}Semaine de congés détectée. Rappel : les congés payés ne peuvent pas compenser des heures complémentaires non payées.`,
  n=>`🦊 ${n}Repos bien mérité ! Pendant les vacances, ton compteur d'heures complémentaires ne s'accumule pas.`,
];

const MSGS_PLAFOND = [
  (n,cap)=>`🦊 ${n}Tes heures dépassent le plafond maximum de ta convention (${Math.round(cap*100)}% du contrat). Ces heures peuvent ouvrir des droits supplémentaires.`,
  (n,cap)=>`🦊 ${n}Tes heures dépassent ton contrat de travail (${Math.round(cap*100)}%). Garde une trace de ces semaines — elles peuvent ouvrir des droits.`,
];

// ── Rotation intelligente ─────────────────────────────────────────
function _nextMsg(pool) {
  let idx = parseInt(_get(K.MSG_IDX,'0'));
  const today = new Date();
  const seed = (today.getDate()*31 + today.getMonth()*7 + idx*3) % pool.length;
  _set(K.MSG_IDX, String((idx+1)%9999));
  return pool[seed];
}

// ── API Mizuki ────────────────────────────────────────────────────
const Mizuki = {

  getBubbleText(analysis) {
    const name = _get(K.USER_NAME,'');
    const n = name ? name + ' ! ' : '';
    const {weekResult, rule12, isVacWeek} = analysis || {};

    if (isVacWeek) return _nextMsg(MSGS_VACANCES)(n);

    if (!weekResult || weekResult.workedH <= weekResult.contractH) {
      return _nextMsg(MSGS_NORMAL)(n);
    }

    const alerts = weekResult.alerts || [];
    if (alerts.some(a=>a.code==='REQUALIFICATION')) return _nextMsg(MSGS_REQUALIF)(n, weekResult.workedH);
    if (rule12 && rule12.triggered) return _nextMsg(MSGS_12SEM)(n, rule12.maxConsec);
    if (alerts.some(a=>a.code==='PROCHE_TEMPS_PLEIN')) return _nextMsg(MSGS_PROCHE_35)(n, weekResult.workedH);
    if (alerts.some(a=>a.code==='PLAFOND_CCN')) return _nextMsg(MSGS_PLAFOND)(n, weekResult.cap);

    const total = weekResult.totalCompH || 0;
    if (weekResult.compH2 > 0) return _nextMsg(MSGS_COMP_HIGH)(n, total);
    if (total > 0) return _nextMsg(MSGS_COMP_LOW)(n, total, weekResult.rate1);
    return _nextMsg(MSGS_NORMAL)(n);
  },

  getPopupContent(analysis) {
    const {weekResult, rule12, isVacWeek} = analysis || {};
    const name = _get(K.USER_NAME,'');
    const pr = name || 'toi';

    const today = new Date().toISOString().slice(0,10);
    const workedKey = weekResult ? Math.round((weekResult.workedH||0)*10) : 0;
    const cacheKey = `${today}_${workedKey}`;
    const cached = _json(K.POPUP_CACHE,{});
    if (cached.key === cacheKey && cached.msg) return cached.msg;

    let msg;

    // Mode avenant
    const isAvenant = analysis && analysis.weekMode === 'avenant';
    if (isAvenant && weekResult) {
      if (weekResult.compH25 > 0) {
        return `🦊 ${name ? name + ' ! ' : ''}Avenant cette semaine — ${weekResult.avenatPaidH?.toFixed(1) || 0}h au taux normal + ${weekResult.compH25.toFixed(1)}h à +25%. Vérifie ton bulletin.`;
      }
      return `🦊 ${name ? name + ' ! ' : ''}Semaine avec avenant — ${weekResult.avenatPaidH?.toFixed(1) || 0}h au taux normal. Tout est dans les clous.`;
    }

    if (isVacWeek) {
      msg = {
        titre: '🌴 Semaine de congés',
        icon: '🌴', level: 'ok',
        message: `Mizuki détecte que ${pr} est en congé cette semaine. Les heures complémentaires ne s'accumulent pas pendant les vacances. Profite du repos — tes données restent intactes.`,
        actions: ['Déconnecte vraiment', 'Reviens reposée !'],
      };
    } else if (!weekResult || weekResult.workedH <= weekResult.contractH) {
      msg = {
        titre: '✅ Semaine conforme',
        icon: '✅', level: 'ok',
        message: `Cette semaine, ${pr} respecte les heures prévues au contrat. Aucune heure complémentaire détectée. Continue à saisir chaque semaine — 12 semaines de données permettent à Mizuki de détecter la règle des 12 semaines automatiquement.`,
        actions: ['Saisir la semaine prochaine', 'Voir le glossaire juridique'],
      };
    } else {
      const alerts = weekResult.alerts || [];
      const hasRequalif = alerts.some(a=>a.code==='REQUALIFICATION');
      const has12sem = rule12 && rule12.triggered;
      const hasCap = alerts.some(a=>a.code==='PLAFOND_CCN');
      const hasProche = alerts.some(a=>a.code==='PROCHE_TEMPS_PLEIN');

      if (hasRequalif) {
        msg = {
          titre: '🚨 Risque de requalification',
          icon: '🚨', level: 'critique',
          message: `Cette semaine tu as atteint ${weekResult.workedH}h — le seuil légal du temps plein. Un contrat à temps partiel ne peut jamais atteindre 35h (Art. L3123-9). Garde une trace de cette semaine, elle peut être utile.`,
          actions: ['Garder une trace écrite', 'Comparer avec la fiche de paie', 'Consulter un délégué du personnel', 'Voir l\'Art. L3123-9'],
        };
      } else if (has12sem) {
        msg = {
          titre: '⚖️ Règle des 12 semaines',
          icon: '⚖️', level: 'alerte',
          message: `Depuis ${rule12.maxConsec} semaines consécutives, tes heures dépassent le contrat de plus de 2h/sem. L'Art. L3123-13 prévoit que le contrat peut être modifié à la hausse (préavis 7j, sauf opposition). Tu peux en faire la demande écrite, ou conserver ton horaire actuel — c'est ton choix.`,
          actions: ['Demander une modification de contrat', 'Garder l\'historique', 'Voir l\'Art. L3123-13'],
        };
      } else if (hasProche) {
        msg = {
          titre: '👀 Proche du temps plein',
          icon: '👀', level: 'vigilance',
          message: `Tu as travaillé ${weekResult.workedH}h cette semaine, soit ${Math.round(weekResult.workedH/35*100)}% du temps plein légal. Il reste seulement ${(35-weekResult.workedH).toFixed(1)}h avant le seuil de requalification. Sois attentive la semaine prochaine.`,
          actions: ['Surveiller les prochaines semaines', 'Voir les règles de requalification'],
        };
      } else if (hasCap) {
        msg = {
          titre: '⚠️ Plafond conventionnel dépassé',
          icon: '⚠️', level: 'vigilance',
          message: `Le nombre d'heures complémentaires dépasse le plafond de ta convention collective (${Math.round((weekResult.cap||0.10)*100)}% du contrat). Ces heures au-delà du plafond peuvent créer des droits supplémentaires pour toi.`,
          actions: ['Vérifier ta fiche de paie', 'Consulter ta CCN', 'Voir le glossaire'],
        };
      } else {
        const total = weekResult.totalCompH || 0;
        msg = {
          titre: `🟡 ${total}h complémentaires`,
          icon: '🟡', level: 'info',
          message: `Tu as effectué ${total}h au-delà de ton contrat cette semaine.${weekResult.compH1>0?` ${weekResult.compH1.toFixed(1)}h à +${Math.round((weekResult.rate1||0.10)*100)}%`:''}${weekResult.compH2>0?` et ${weekResult.compH2.toFixed(1)}h à +${Math.round((weekResult.rate2||0.25)*100)}%`:''}. ${weekResult.totalAmount>0?`Estimé : ${weekResult.totalAmount.toFixed(2)} € brut.`:''} Vérifie bien que ces heures apparaissent sur ta prochaine fiche de paie.`,
          actions: ['Vérifier ta fiche de paie', 'Comprendre les majorations', 'Voir le glossaire'],
        };
      }
    }

    try { localStorage.setItem(K.POPUP_CACHE, JSON.stringify({key:cacheKey, msg})); } catch(_) {}
    return msg;
  },

  clearCache() {
    try { localStorage.removeItem(K.POPUP_CACHE); } catch(_) {}
  }
};

const LEGAL_FULL_TIME = 35;
global.Mizuki = Mizuki;

}(typeof window !== 'undefined' ? window : global));
