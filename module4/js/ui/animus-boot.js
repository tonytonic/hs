/**
 * Animus Boot Sequence — Séquence d'initialisation style AC Animus
 * Version raccourcie : 3 messages, typage rapide, transition courte
 */
(function(global){
'use strict';

const BOOT_MESSAGES = [
  'Chargement de tes données...',
  'Analyse de ta santé en cours...',
  'Prédiction prête.',
];

class AnimusBoot {
  constructor(){
    this._screen = document.getElementById('animus-boot');
    this._status = document.getElementById('boot-status');
    this._bar    = document.getElementById('boot-progress-bar');
    this._step   = 0;
    this._particles = [];
  }

  start(onComplete){
    this._spawnParticles();
    this._runSequence(onComplete);
  }

  _runSequence(onComplete){
    const total = BOOT_MESSAGES.length;
    const tick = () => {
      if(this._step >= total){
        setTimeout(()=>{
          if(this._screen) this._screen.classList.add('hide');
          setTimeout(()=>{
            if(this._screen) this._screen.style.display='none';
            this._killParticles();
            if(onComplete) onComplete();
          }, 400); // réduit de 800ms → 400ms
        }, 200); // réduit de 400ms → 200ms
        return;
      }
      const msg = BOOT_MESSAGES[this._step];
      this._typeMessage(msg, ()=>{
        this._step++;
        const pct = Math.round((this._step / total) * 100);
        if(this._bar) this._bar.style.width = pct + '%';
        const delay = this._step === total ? 200 : 60 + Math.random()*80;
        setTimeout(tick, delay);
      });
    };
    tick();
  }

  _typeMessage(msg, cb){
    if(!this._status){ cb(); return; }
    this._status.textContent = '';
    let i = 0;
    const speed = 12; // réduit de 18-30ms → 12ms par caractère
    const timer = setInterval(()=>{
      this._status.textContent += msg[i];
      i++;
      if(i >= msg.length){ clearInterval(timer); setTimeout(cb, 40); }
    }, speed);
  }

  _spawnParticles(){
    const container = document.getElementById('animus-boot');
    if(!container) return;
    for(let i = 0; i < 20; i++){
      const p = document.createElement('div');
      p.className = 'data-particle';
      const x = Math.random() * 100;
      const h = 40 + Math.random() * 120;
      const dur = 2 + Math.random() * 4;
      const delay = Math.random() * 3;
      p.style.cssText = `left:${x}%;height:${h}px;animation-duration:${dur}s;animation-delay:-${delay}s;`;
      container.appendChild(p);
      this._particles.push(p);
    }
  }

  _killParticles(){
    this._particles.forEach(p => p.remove());
    this._particles = [];
  }
}

global.AnimusBoot = AnimusBoot;
}(typeof window !== 'undefined' ? window : global));
