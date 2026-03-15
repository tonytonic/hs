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
  adaptFromCheckin(checkinData, predictedScores){
    if(!checkinData||!predictedScores) return;
    if(checkinData.energy!==undefined){
      const realPerf=checkinData.energy/4;
      const predPerf=predictedScores.performance/100;
      this._engine.adapt(realPerf,predPerf,'fh');
    }
    if(checkinData.stress!==undefined){
      const realStress=checkinData.stress/4;
      const predStress=predictedScores.stress/100;
      this._engine.adapt(realStress,predStress,'fc');
    }
  }

  /** Auto-adapt depuis score burnout RPG */
  autoAdapt(){
    const st=this._engine.getState();
    if(!st) return;
    this._engine.autoAdapt(st.raw.rpg.burnout, st.scores._f);
  }

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