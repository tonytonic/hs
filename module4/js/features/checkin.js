/**
 * Check-in quotidien — 5 questions, 2 minutes
 */
(function(global){
'use strict';

const QUESTIONS=[
  {id:'sleep',  text:'Comment avez-vous dormi cette nuit ?', emoji:'😴',
    opts:[{v:0,e:'😵',l:'Très mal (< 4h)'},{v:1,e:'😞',l:'Mal (4-5h)'},{v:2,e:'😐',l:'Moyen (6h)'},{v:3,e:'😊',l:'Bien (7h)'},{v:4,e:'😄',l:'Très bien (8h+)'}]},
  {id:'energy', text:'Quel est votre niveau d\'énergie ce matin ?', emoji:'⚡',
    opts:[{v:0,e:'💀',l:'Épuisé'},{v:1,e:'😴',l:'Fatigué'},{v:2,e:'😐',l:'Neutre'},{v:3,e:'😊',l:'Energique'},{v:4,e:'🔥',l:'Excellent'}]},
  {id:'stress', text:'Quel est votre niveau de stress aujourd\'hui ?', emoji:'😰',
    opts:[{v:0,e:'😌',l:'Aucun'},{v:1,e:'🙂',l:'Léger'},{v:2,e:'😐',l:'Modéré'},{v:3,e:'😟',l:'Élevé'},{v:4,e:'😱',l:'Critique'}]},
  {id:'pain',   text:'Ressentez-vous des douleurs physiques ?', emoji:'🩹',
    opts:[{v:0,e:'✅',l:'Aucune'},{v:1,e:'🟡',l:'Légère'},{v:2,e:'🟠',l:'Modérée'},{v:3,e:'🔴',l:'Forte'},{v:4,e:'🚨',l:'Intense'}]},
  {id:'motiv',  text:'Votre motivation pour travailler aujourd\'hui ?', emoji:'🎯',
    opts:[{v:0,e:'😶',l:'Inexistante'},{v:1,e:'😕',l:'Basse'},{v:2,e:'😐',l:'Normale'},{v:3,e:'😊',l:'Bonne'},{v:4,e:'🚀',l:'Maximale'}]},
];

class Checkin {
  constructor(){
    this._modal=document.getElementById('checkin-modal');
    this._content=document.getElementById('checkin-content');
    this._close=document.getElementById('checkin-close');
    this._step=0;
    this._answers={};
    if(this._close) this._close.addEventListener('click',()=>this.close());
    if(this._modal) this._modal.querySelector('.modal-overlay').addEventListener('click',()=>this.close());
  }

  checkIfNeeded(){
    const today=new Date().toISOString().slice(0,10);
    const last=localStorage.getItem('DTE_CHECKIN_DATE');
    // Ouvrir à l'ouverture du module si pas encore fait aujourd'hui (toute la journée)
    if(last!==today){
      setTimeout(()=>this.open(),800);
    }
  }

  open(){
    this._step=0;
    this._answers={};
    this._render();
    if(this._modal) this._modal.classList.remove('hidden');
  }

  close(){
    if(this._modal) this._modal.classList.add('hidden');
  }

  _render(){
    const q=QUESTIONS[this._step];
    const n=QUESTIONS.length;
    const pct=Math.round((this._step/n)*100);

    this._content.innerHTML=`
      <div style="padding:0 4px;">
        <!-- Barre de progression -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span style="font-size:10px;color:rgba(255,255,255,0.4);font-family:var(--font-mono);">
            ${this._step+1} / ${n}
          </span>
          <div style="flex:1;height:3px;background:rgba(255,255,255,0.1);margin:0 10px;">
            <div style="height:100%;width:${pct}%;background:var(--sync);transition:width .3s;"></div>
          </div>
          ${this._step>0?`<button id="ci-prev" style="font-size:11px;color:rgba(255,255,255,0.4);
            background:none;border:none;cursor:pointer;padding:2px 6px;">← Retour</button>`:'<span></span>'}
        </div>

        <!-- Emoji + Question -->
        <div style="text-align:center;font-size:36px;margin-bottom:10px;">${q.emoji}</div>
        <div style="font-size:15px;font-weight:600;color:#fff;text-align:center;
          margin-bottom:18px;line-height:1.4;">${q.text}</div>

        <!-- Options — 1 clic = réponse + avancer -->
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${q.opts.map(o=>`
            <button data-val="${o.v}" style="
              display:flex;align-items:center;gap:12px;
              padding:12px 16px;background:rgba(0,10,25,.85);
              border:1px solid ${this._answers[q.id]===o.v?'rgba(0,255,204,0.6)':'rgba(255,255,255,0.12)'};
              cursor:pointer;transition:all .15s;text-align:left;width:100%;
              ${this._answers[q.id]===o.v?'background:rgba(0,255,204,0.1);':''}"
              onmouseover="this.style.borderColor='rgba(0,255,204,0.4)'"
              onmouseout="this.style.borderColor='${this._answers[q.id]===o.v?'rgba(0,255,204,0.6)':'rgba(255,255,255,0.12)'}'">
              <span style="font-size:22px;flex-shrink:0;">${o.e}</span>
              <span style="font-size:13px;color:#fff;">${o.l}</span>
            </button>`).join('')}
        </div>
      </div>`;

    // Un clic → réponse enregistrée + question suivante automatique
    this._content.querySelectorAll('button[data-val]').forEach(el=>{
      el.addEventListener('click',()=>{
        this._answers[q.id]=parseInt(el.dataset.val);
        // Délai court pour voir la sélection
        setTimeout(()=>{
          if(this._step<n-1){ this._step++; this._render(); }
          else { this._submit(); }
        }, 220);
      });
    });

    const prev=document.getElementById('ci-prev');
    if(prev) prev.addEventListener('click',()=>{ this._step=Math.max(0,this._step-1); this._render(); });
  }

  _submit(){
    const today=new Date().toISOString().slice(0,10);
    localStorage.setItem('DTE_CHECKIN_DATE',today);
    const history=JSON.parse(localStorage.getItem('DTE_CHECKIN_HISTORY')||'[]');
    history.push({date:today,...this._answers});
    if(history.length>90) history.shift();
    localStorage.setItem('DTE_CHECKIN_HISTORY',JSON.stringify(history));
    // Apply to analysis
    if(window.DTE&&window.DTE.learning&&window.DTE.engine){
      const st=window.DTE.engine.getState();
      if(st){
        window.DTE.learning.adaptFromCheckin(this._answers,st.scores);
        const newNorm=window.DTE.learning.applyCheckin(this._answers,st.norm);
        document.dispatchEvent(new CustomEvent('dte:checkin',{detail:{data:this._answers,norm:newNorm}}));
      }
    }
    this._content.innerHTML=`
      <div style="text-align:center;padding:var(--gap-xl);">
        <div style="font-size:48px;">🦊</div>
        <div style="font-family:var(--font-h);font-size:20px;font-weight:700;margin:var(--gap) 0;">Check-in enregistré !</div>
        <div style="color:var(--text-dim);font-size:13px;">Vos données ont été intégrées dans l'analyse.<br>Précision du modèle améliorée.</div>
        <div style="display:flex;justify-content:center;gap:var(--gap);margin-top:var(--gap-l);flex-wrap:wrap;">
          ${Object.entries(this._answers).map(([k,v])=>{
            const q=QUESTIONS.find(q=>q.id===k);
            const o=q?q.opts.find(o=>o.v===v):null;
            return `<span style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:4px 10px;font-family:var(--font-mono);font-size:10px;">${q?q.emoji:''} ${o?o.e:''}</span>`;
          }).join('')}
        </div>
        <button class="btn btn--cyan" style="margin-top:var(--gap-l);" id="ci-done">Fermer</button>
      </div>`;
    document.getElementById('ci-done').addEventListener('click',()=>this.close());
    // Re-analyse complète
    if (window._fullSync) window._fullSync();
    else if (window._forcSync) window._forcSync();
    window.DTE&&window.DTE.notifications&&window.DTE.notifications.show(
      'Check-in enregistré','ok','🦊','Analyse mise à jour avec votre ressenti du jour.');
  }

  getLatest(){
    const h=JSON.parse(localStorage.getItem('DTE_CHECKIN_HISTORY')||'[]');
    return h.length?h[h.length-1]:null;
  }
}

global.Checkin=Checkin;
}(typeof window!=='undefined'?window:global));