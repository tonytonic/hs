/**
 * CALC-ENGINE — Moteur de calcul heures complémentaires (temps partiel)
 * Modes : HEBDO / MENSUEL / ANNUEL
 * Jours fériés : neutralisation du seuil (Art. L3133-3 + jurisprudence) ou assiette normale
 */
(function(global) {
'use strict';

const LEGAL_FULL_TIME = 35;

// ── JOURS FÉRIÉS FRANÇAIS ─────────────────────────────────────────
function calcPaques(year) {
  const a=year%19, b=Math.floor(year/100), cc=year%100;
  const d=Math.floor(b/4), e=b%4, f=Math.floor((b+8)/25);
  const g=Math.floor((b-f+1)/3), h=(19*a+b-d-g+15)%30;
  const i=Math.floor(cc/4), k=cc%4;
  const l=(32+2*e+2*i-h-k)%7;
  const m=Math.floor((a+11*h+22*l)/451);
  const month=Math.floor((h+l-7*m+114)/31);
  const day=((h+l-7*m+114)%31)+1;
  return new Date(year,month-1,day);
}
function addDays(date,n){ const d=new Date(date); d.setDate(d.getDate()+n); return d; }
function dk(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }

function getFeriesLocal(year) {
  const p=calcPaques(year);
  const list={};
  [
    dk(new Date(year,0,1)),
    dk(addDays(p,1)),
    dk(new Date(year,4,1)),
    dk(new Date(year,4,8)),
    dk(addDays(p,39)),
    dk(addDays(p,50)),
    dk(new Date(year,6,14)),
    dk(new Date(year,7,15)),
    dk(new Date(year,10,1)),
    dk(new Date(year,10,11)),
    dk(new Date(year,11,25)),
  ].forEach(k=>{ list[k]=true; });
  return list;
}

function getFeriesYear(year) {
  // Priorité : données API gouvernement si disponibles
  try {
    const stored=localStorage.getItem('M5_FERIES_API_'+year);
    if(stored) {
      const apiData=JSON.parse(stored);
      // apiData = { "2026-01-01": "1er janvier", ... }
      const list={};
      Object.keys(apiData).forEach(d=>{ list[d]=true; });
      return list;
    }
  } catch(_) {}
  // Fallback : calcul local
  return getFeriesLocal(year);
}

function countFeriesInWeek(mondayStr, feriesMap, joursOuvresContrat) {
  // Compte les fériés tombant sur les jours normalement travaillés.
  // joursOuvresContrat : nombre de jours/semaine (défaut 5). On compte à partir
  // du début de semaine (mondayStr représente le 1er jour de la semaine du salarié,
  // pas forcément lundi — peut être samedi pour HCR, mardi, etc.)
  let count=0;
  const nbJours = Math.max(1, Math.min(7, Math.round(joursOuvresContrat||5)));
  for(let d=0;d<nbJours;d++){
    const dt=new Date(mondayStr+'T12:00:00'); dt.setDate(dt.getDate()+d);
    const key=dk(dt);
    if(feriesMap&&feriesMap[key]) count++;
  }
  return count;
}

// ── MOTEUR ────────────────────────────────────────────────────────
const CalcEngine = {

  getFeriesYear,
  countFeriesInWeek,

  /**
   * Calcul hebdomadaire heures complémentaires
   * @param {number} contractH        - heures contractuelles hebdo
   * @param {number} workedH          - heures réellement travaillées
   * @param {object} ccnRules         - { cap, rate1, rate2, threshold }
   * @param {number} hourlyRate       - taux horaire brut
   * @param {object} options          - { feriesMap, neutraliseFeries, joursOuvresContrat }
   */
  calcWeek(contractH, workedH, ccnRules, hourlyRate=0, options={}) {
    const cap       = ccnRules.cap       || 0.10;
    const rate1     = ccnRules.rate1     || 0.10;
    const rate2     = ccnRules.rate2     || 0.25;
    const threshold = ccnRules.threshold || 0.10;
    const joursOuvres = options.joursOuvresContrat || 5;
    const neutralise  = options.neutraliseFeries !== false; // true par défaut

    // Calculer seuil ajusté selon les fériés
    let contractAjuste = contractH;
    let feriesCount = 0;
    let feriesNote = null;
    if(options.feriesMap && neutralise) {
      // ✅ Art. L3133-3 + jurisprudence : le chômage d'un jour férié ne peut entraîner
      // de perte, donc le seuil est abaissé proportionnellement aux fériés tombant
      // sur des jours normalement travaillés.
      const mondayStr = options.mondayStr;
      if(mondayStr) {
        feriesCount = countFeriesInWeek(mondayStr, options.feriesMap, joursOuvres);
        if(feriesCount > 0) {
          const valJour = contractH / joursOuvres;
          contractAjuste = Math.max(0, contractH - feriesCount * valJour);
          feriesNote = `Seuil abaissé de ${(feriesCount * valJour).toFixed(1)}h pour ${feriesCount} jour(s) férié(s) chômé(s)`;
        }
      }
    }
    // ⬜ Mode alternatif (jurisprudence) : seuil normal, fériés intégrés dans l'assiette

    const maxAllowed  = contractAjuste * (1 + cap);
    const threshold1H = contractAjuste * threshold;
    const alerts = [];

    let baseH  = Math.min(workedH, contractAjuste);
    let compH1 = 0;
    let compH2 = 0;
    let isLegal = true;

    if(workedH > contractAjuste) {
      let diff = workedH - contractAjuste;

      if(workedH >= LEGAL_FULL_TIME) {
        alerts.push({ level:'critique', code:'REQUALIFICATION',
          msg:`Tu as atteint ${workedH}h cette semaine — le seuil légal du temps plein. La loi prévoit des droits dans ce cas. Conserve cet historique.` });
        isLegal = false;
      }
      if(workedH > maxAllowed && workedH < LEGAL_FULL_TIME) {
        alerts.push({ level:'alerte', code:'PLAFOND_CCN',
          msg:`Tes heures dépassent le plafond conventionnel (${Math.round(cap*100)}% du contrat = max ${maxAllowed.toFixed(1)}h). Garde une trace de ces semaines.` });
        isLegal = false;
      }
      if(workedH >= LEGAL_FULL_TIME - 1 && workedH < LEGAL_FULL_TIME) {
        alerts.push({ level:'vigilance', code:'PROCHE_TEMPS_PLEIN',
          msg:`Tu es à ${(LEGAL_FULL_TIME - workedH).toFixed(1)}h du temps plein. Sois vigilante.` });
      }
      if(diff <= threshold1H) {
        compH1 = diff;
      } else {
        compH1 = threshold1H;
        compH2 = diff - threshold1H;
      }
    }

    const baseAmount  = baseH   * hourlyRate;
    const comp1Amount = compH1  * hourlyRate * (1 + rate1);
    const comp2Amount = compH2  * hourlyRate * (1 + rate2);
    const totalAmount = baseAmount + comp1Amount + comp2Amount;

    return {
      contractH, contractAjuste, workedH, baseH,
      compH1: Math.round(compH1*100)/100,
      compH2: Math.round(compH2*100)/100,
      totalCompH: Math.round((compH1+compH2)*100)/100,
      baseAmount: Math.round(baseAmount*100)/100,
      comp1Amount: Math.round(comp1Amount*100)/100,
      comp2Amount: Math.round(comp2Amount*100)/100,
      totalAmount: Math.round(totalAmount*100)/100,
      rate1, rate2, cap, maxAllowed: Math.round(maxAllowed*100)/100,
      feriesCount, feriesNote, alerts, isLegal,
    };
  },

  /**
   * Calcul mensuel
   * Période : [clotureJour+1 du mois précédent] → [clotureJour du mois courant]
   */
  calcMonth(contractH, weeks, ccnRules, hourlyRate=0, nbJours=null) {
    // Seuil proratisé si la période est non-standard (nbJours fourni) : contractH * N / 7
    // Sinon formule légale standard : contractH * 52 / 12
    const seuilMensuel = nbJours
      ? Math.round(contractH * nbJours / 7 * 100) / 100
      : Math.round(contractH * 52 / 12 * 100) / 100;
    const totalWorked  = weeks.reduce((s,w) => s + (w.worked||0), 0);
    const diff         = totalWorked - seuilMensuel;
    const cap          = ccnRules.cap || 0.10;
    const rate1        = ccnRules.rate1 || 0.10;
    const rate2        = ccnRules.rate2 || 0.25;
    const threshold    = ccnRules.threshold || 0.10;
    const maxAllowed   = Math.round(seuilMensuel * (1 + cap) * 100) / 100;

    // ⚠️ La limite 35h est HEBDOMADAIRE — elle s'applique même en mode mensuel
    const semainesRequalif = weeks.filter(w => (w.worked||0) >= LEGAL_FULL_TIME);
    const alerts = semainesRequalif.length > 0 ? [{
      level:'critique', code:'REQUALIFICATION',
      msg:`${semainesRequalif.length} semaine(s) à 35h ou plus détectée(s) (${semainesRequalif.map(w=>w.monday).join(', ')}). La durée légale ne peut jamais être atteinte sur un contrat temps partiel — risque de requalification (Art. L3123-28). Conserve cet historique.`
    }] : [];

    let compH1 = 0, compH2 = 0;
    if(diff > 0) {
      const th1 = seuilMensuel * threshold;
      compH1 = Math.min(diff, th1);
      compH2 = Math.max(0, diff - th1);
      // Alerte si dépassement du plafond conventionnel
      if(totalWorked > maxAllowed) {
        alerts.push({ level:'alerte', code:'PLAFOND_CCN',
          msg:`Tes heures ce mois (${totalWorked}h) dépassent le plafond conventionnel de ${Math.round(cap*100)}% du seuil mensuel (max ${maxAllowed}h). Conserve ces relevés — Art. L3123-28.`
        });
      }
    }

    const comp1Amount = compH1 * hourlyRate * (1 + rate1);
    const comp2Amount = compH2 * hourlyRate * (1 + rate2);

    return {
      mode: 'mensuel',
      seuilMensuel: Math.round(seuilMensuel*100)/100,
      totalWorked:  Math.round(totalWorked*100)/100,
      delta:        Math.round(diff*100)/100,
      compH1: Math.round(compH1*100)/100,
      compH2: Math.round(compH2*100)/100,
      totalCompH: Math.round((compH1+compH2)*100)/100,
      comp1Amount: Math.round(comp1Amount*100)/100,
      comp2Amount: Math.round(comp2Amount*100)/100,
      totalCompAmount: Math.round((comp1Amount+comp2Amount)*100)/100,
      maxAllowed,
      depassePlafond: totalWorked > maxAllowed,
      semainesRequalif: semainesRequalif.length,
      alerts,
      isLegal: semainesRequalif.length === 0,
    };
  },

  /**
   * Calcul annuel — compteur glissant Avance/Retard
   * Proratisation au jour depuis le début de l'exercice
   */
  calcAnnuel(contractH, exerciceStart, allWeeks, today) {
    // exerciceStart = date ISO "2026-01-01" ou ancienne forme "01/01"
    const todayDate = today || new Date();

    let debutEx;
    if(exerciceStart && exerciceStart.includes('-')) {
      // Format ISO date input type="date"
      debutEx = new Date(exerciceStart+'T12:00:00');
    } else if(exerciceStart && exerciceStart.includes('/')) {
      // Ancien format "01/06"
      const [j,m] = exerciceStart.split('/').map(Number);
      const year = todayDate.getFullYear();
      debutEx = new Date(year, m-1, j);
      if(debutEx > todayDate) debutEx = new Date(year-1, m-1, j);
    } else {
      debutEx = new Date(todayDate.getFullYear(), 0, 1);
    }
    const year = debutEx.getFullYear();

    // Bissextile ?
    const finEx = new Date(debutEx); finEx.setFullYear(finEx.getFullYear()+1);
    const nbJoursEx = Math.round((finEx - debutEx) / 86400000);

    // Jours écoulés depuis début exercice
    const joursEcoules = Math.round((todayDate - debutEx) / 86400000);

    // Objectif annuel et théorique cumulé
    const objectifAnnuel = Math.round(contractH * 52 * 100) / 100;
    const tauxJournalier = objectifAnnuel / nbJoursEx;
    const theoriqueCumule = Math.round(tauxJournalier * joursEcoules * 100) / 100;

    // Heures réelles dans l'exercice
    const debutExStr = dk(debutEx);
    const todayStr   = dk(todayDate);
    const weeksInEx  = allWeeks.filter(w => w.monday >= debutExStr && w.monday <= todayStr);
    const reelCumule = Math.round(weeksInEx.reduce((s,w) => s+(w.worked||0), 0) * 100) / 100;

    const solde = Math.round((reelCumule - theoriqueCumule) * 100) / 100;
    const pctAvancement = joursEcoules > 0 ? Math.round(joursEcoules / nbJoursEx * 100) : 0;

    // ⚠️ Détecter les semaines > 35h même en mode annuel (Art. L3123-28)
    const semainesRequalif = weeksInEx.filter(w => (w.worked||0) >= LEGAL_FULL_TIME);

    return {
      mode: 'annuel',
      debutEx: debutExStr,
      finEx: dk(finEx),
      joursEcoules,
      nbJoursEx,
      pctAvancement,
      objectifAnnuel,
      theoriqueCumule,
      reelCumule,
      solde,
      enAvance: solde > 0,
      semaines: weeksInEx.length,
      semainesRequalif: semainesRequalif.length,
      isLegal: semainesRequalif.length === 0,
    };
  },

  /**
   * Complément d'heures par avenant (Art. L3123-22)
   */
  calcAvenant(contractH, avenatH, workedH, hourlyRate=0) {
    if(avenatH <= contractH) return null;
    const alerts=[];
    let baseH=Math.min(workedH,contractH), avenatPaidH=0, compH25=0;
    if(workedH > contractH) {
      if(workedH >= LEGAL_FULL_TIME) {
        alerts.push({ level:'critique', code:'REQUALIFICATION',
          msg:`Tu as atteint ${workedH}h — le seuil légal du temps plein. Les heures complémentaires ne peuvent pas atteindre 35h.` });
      }
      if(workedH <= avenatH) {
        avenatPaidH = workedH - contractH;
      } else {
        avenatPaidH = avenatH - contractH;
        compH25 = workedH - avenatH;
        alerts.push({ level:'info', code:'AVENANT_DEPASSE',
          msg:`Tu dépasses les heures prévues par l'avenant. Les ${compH25.toFixed(1)}h au-delà sont majorées à +25%.` });
      }
    }
    const baseAmount   = baseH       * hourlyRate;
    const avenatAmount = avenatPaidH * hourlyRate;
    const comp25Amount = compH25     * hourlyRate * 1.25;
    const totalAmount  = baseAmount + avenatAmount + comp25Amount;
    return {
      mode:'avenant', contractH, avenatH, workedH,
      baseH: Math.round(baseH*100)/100,
      avenatPaidH: Math.round(avenatPaidH*100)/100,
      compH25: Math.round(compH25*100)/100,
      baseAmount: Math.round(baseAmount*100)/100,
      avenatAmount: Math.round(avenatAmount*100)/100,
      comp25Amount: Math.round(comp25Amount*100)/100,
      totalAmount: Math.round(totalAmount*100)/100,
      alerts, isLegal: !alerts.some(a=>a.code==='REQUALIFICATION'),
    };
  },

  /**
   * Règle des 12 semaines consécutives (Art. L3123-13)
   */
  check12WeeksRule(weeklyData, contractH) {
    if(!weeklyData.length) return { triggered:false, maxConsec:0 };
    let consecCount=0, maxConsec=0, triggerStart=null;
    for(let i=0;i<weeklyData.length;i++) {
      if((weeklyData[i].worked||0) >= contractH+2) {
        consecCount++;
        if(consecCount>maxConsec) maxConsec=consecCount;
        if(consecCount>=12&&!triggerStart) triggerStart=i-11;
      } else { consecCount=0; }
    }
    // Art. L3123-13 al.2 : variante "12 sem. parmi 15 sem. consécutives"
    let triggered15=false;
    if(maxConsec<12 && weeklyData.length>=15) {
      for(let i=0;i<=weeklyData.length-15;i++) {
        const w15=weeklyData.slice(i,i+15);
        const cnt=w15.filter(w=>(w.worked||0)>=contractH+2).length;
        if(cnt>=12){ triggered15=true; break; }
      }
    }
    const triggered=maxConsec>=12||triggered15;
    return {
      triggered, maxConsec, triggerStart, triggered15,
      msg: triggered
        ? (triggered15&&maxConsec<12)
          ? `12 semaines sur une période de 15 ont dépassé ton contrat de +2h/sem. L'Art. L3123-13 s'applique — tu peux demander par écrit la modification de ton contrat à la hausse (préavis 7j, sauf opposition de ta part).`
          : `Depuis ${maxConsec} semaines consécutives, tes heures dépassent le contrat de +2h/sem. L'Art. L3123-13 prévoit la modification du contrat — tu peux en faire la demande écrite, ou t'y opposer pour conserver ton horaire actuel.`
        : maxConsec>=8
          ? `${maxConsec} semaines consécutives au-dessus du contrat. Encore ${12-maxConsec} semaines avant que la règle des 12 semaines s'applique.`
          : null
    };
  },

  calcAnnualCap(contractH, ccnRules) {
    const cap=ccnRules.cap||0.10;
    return {
      weekly:  Math.round(contractH*cap*10)/10,
      monthly: Math.round(contractH*52/12*cap*10)/10,
      annual:  Math.round(contractH*52*cap*10)/10,
    };
  },

  estimateNet(grossComp) {
    // Estimation heures complémentaires nettes après exonération TEPA/Avenir Pro (2019).
    // Cotisations résiduelles estimées ~11.31% (CSG/CRDS + cotisations résiduelles après exo).
    // ⚠️ Ce chiffre ne tient PAS compte de la mutuelle/prévoyance ni des cotisations CCN.
    // Pour un net "en poche" réel, compter plutôt -18 à -22%.
    return Math.round(grossComp*(1-0.1131)*100)/100;
  },

  /**
   * Estimation plus réaliste du net réellement perçu (approximation).
   * Inclut CSG/CRDS + cotisations résiduelles + mutuelle/prévoyance moyenne.
   */
  estimateNetReel(grossComp) {
    return Math.round(grossComp*(1-0.22)*100)/100;
  }
};

global.CalcEngine = CalcEngine;
global.M5_getFeriesYear = getFeriesYear;
if(typeof module!=='undefined'&&module.exports) module.exports={CalcEngine};

}(typeof window!=='undefined'?window:global));
