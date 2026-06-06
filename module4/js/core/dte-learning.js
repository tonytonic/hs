/**
 * DTE Learning — Apprentissage adaptatif + Check-in data integration
 */
(function(global){
'use strict';

class DTELearning {
  constructor(engine){ this._engine=engine; }

  /** Intègre les données check-in dans l'analyse */
  applyCheckin(checkinData, norm){
    if(!checkinData||!norm) return norm;
    const n={...norm};
    // Ajustements basés sur le ressenti subjectif
    if(checkinData.sleep!==undefined){
      const sleepScore=checkinData.sleep/4; // 0-1
      n.sommeil=Math.max(0,Math.min(1,n.sommeil*(1+(1-sleepScore)*.3)));
    }
    if(checkinData.energy!==undefined){
      const energyScore=checkinData.energy/4;
      n.heures=Math.max(0,Math.min(1,n.heures*(1+(1-energyScore)*.2)));
    }
    if(checkinData.stress!==undefined){
      const stressScore=checkinData.stress/4;
      n.extStress=Math.max(0,Math.min(1,n.extStress*.5+stressScore*.5));
    }
    if(checkinData.pain!==undefined&&checkinData.pain>2){
      n.surcharge=Math.max(0,Math.min(1,n.surcharge+.15));
    }
    return n;
  }

  /** Adapte les coefs depuis un rapport réel */
  // DÉSACTIVÉ : M3 (RPG/burnout) ne doit pas écrire dans les paramètres M4.
  // M3 est en lecture seule sur M4. Les coefs fh/fc sont figés à {fh:1, fc:1}.
  adaptFromCheckin(checkinData, predictedScores){ /* no-op */ }

  /** Auto-adapt depuis score burnout RPG */
  // DÉSACTIVÉ : même raison. autoAdapt() appelait engine.adapt() qui modifiait
  // DTE_COEFS dans localStorage, faussant la fatigue sur plusieurs semaines.
  autoAdapt(){ /* no-op */ }

  /** Score de précision du modèle (0-100) */
  accuracyScore(){
    const coefs=this._engine.getCoefs();
    const deviation=Math.abs(coefs.fh-1)+Math.abs(coefs.fc-1);
    return Math.max(0,Math.round(100-deviation*30));
  }

  /** Reset */
  reset(){ this._engine.resetCoefs(); }
}

global.DTELearning=DTELearning;
}(typeof window!=='undefined'?window:global));