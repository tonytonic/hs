/**
 * Notifications — Toasts + alertes proactives
 */
(function(global){
'use strict';

class Notifications {
  constructor(){
    this._container=document.getElementById('notifications-container');
  }

  show(title, type='info', emoji='💡', message=''){
    if(!this._container) return;
    const el=document.createElement('div');
    el.className=`notif ${type}`;
    el.innerHTML=`
      <div class="notif-emoji">${emoji}</div>
      <div class="notif-body">
        <div class="notif-title">${title}</div>
        ${message?`<div class="notif-msg">${message}</div>`:''}
      </div>`;
    this._container.appendChild(el);
    el.addEventListener('click',()=>this._dismiss(el));
    const delay=type==='danger'?8000:type==='warning'?5000:3500;
    setTimeout(()=>this._dismiss(el),delay);
    return el;
  }

  _dismiss(el){
    el.classList.add('fade-out');
    setTimeout(()=>el.remove(),300);
  }

  checkAndNotify(state, risks){
    if(!state||!state.scores) return;
    const s=state.scores;
    // Critical fatigue
    if(s.fatigue>=95){
      setTimeout(()=>this.show('DANGER CRITIQUE','danger','🚨',`Fatigue ${s.fatigue}/100 — Arrêt recommandé`),500);
    } else if(s.fatigue>=85){
      setTimeout(()=>this.show('Fatigue élevée','warning','⚠️',`Score fatigue : ${s.fatigue}/100`),500);
    } else if(s.fatigue>=75){
      setTimeout(()=>this.show('Fatigue en hausse','warning','🔶',`Score fatigue : ${s.fatigue}/100`),500);
    }
    // Critical risks
    const critRisks=risks?risks.filter(r=>r.level==='CRITIQUE'):[];
    if(critRisks.length&&s.fatigue<95){
      setTimeout(()=>this.show('Risque critique détecté','danger','🚫',critRisks[0].titre),1500);
    }
    // Success
    if(s.fatigue<30&&s.stress<30){
      setTimeout(()=>this.show('Situation excellente','ok','✅','Tous les indicateurs sont au vert'),800);
    }
  }
}

global.Notifications=Notifications;
}(typeof window!=='undefined'?window:global));