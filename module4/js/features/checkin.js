/* ── SAFE localStorage WRAPPER (iOS Private Mode) ─────────────── */
const _safeLS = {
  get: (k, def='') => { try { return localStorage.getItem(k) ?? def; } catch(_) { return def; } },
  set: (k, v)      => { try { localStorage.setItem(k, v); } catch(_) {} },
  del: (k)         => { try { localStorage.removeItem(k); } catch(_) {} },
  json:(k, def={}) => { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch(_) { return def; } },
};

/**
 * Check-in quotidien v2 — statut jour + créneau horaire + bien-être
 * Reset automatique à 00h00
 */
(function(global){
'use strict';

const QUESTIONS_WELLBEING = [
  {id:'sleep',  text:'Comment avez-vous dormi cette nuit ?', emoji:'😴',
    opts:[{v:0,e:'😵',l:'Très mal (< 4h)'},{v:1,e:'😞',l:'Mal (4-5h)'},{v:2,e:'😐',l:'Moyen (6h)'},{v:3,e:'😊',l:'Bien (7h)'},{v:4,e:'😄',l:'Très bien (8h+)'}]},
  {id:'energy', text:'Quel est votre niveau d\'énergie ?', emoji:'⚡',
    opts:[{v:0,e:'💀',l:'Épuisé'},{v:1,e:'😴',l:'Fatigué'},{v:2,e:'😐',l:'Neutre'},{v:3,e:'😊',l:'Énergique'},{v:4,e:'🔥',l:'Excellent'}]},
  {id:'stress', text:'Quel est votre niveau de stress ?', emoji:'😰',
    opts:[{v:0,e:'😌',l:'Aucun'},{v:1,e:'🙂',l:'Léger'},{v:2,e:'😐',l:'Modéré'},{v:3,e:'😟',l:'Élevé'},{v:4,e:'😱',l:'Critique'}]},
  {id:'pain',   text:'Ressentez-vous des douleurs physiques ?', emoji:'🩹',
    opts:[{v:0,e:'✅',l:'Aucune'},{v:1,e:'🟡',l:'Légère'},{v:2,e:'🟠',l:'Modérée'},{v:3,e:'🔴',l:'Forte'},{v:4,e:'🚨',l:'Intense'}]},
  {id:'motiv',  text:'Votre motivation aujourd\'hui ?', emoji:'🎯',
    opts:[{v:0,e:'😶',l:'Inexistante'},{v:1,e:'😕',l:'Basse'},{v:2,e:'😐',l:'Normale'},{v:3,e:'😊',l:'Bonne'},{v:4,e:'🚀',l:'Maximale'}]},
];

const Q_STATUS = {
  id:'dayStatus', text:'Comment se passe votre journée ?', emoji:'📅',
  opts:[
    {v:'work',    e:'💼', l:'Je travaille'},
    {v:'rest',    e:'🏠', l:'Repos / Day off'},
    {v:'holiday', e:'🌴', l:'Congé / Vacances'},
    {v:'sick',    e:'🤒', l:'Arrêt maladie'},
  ]
};

const Q_SLOT = {
  id:'timeSlot', text:'Quel est votre créneau de travail ?', emoji:'🕐',
  opts:[
    {v:'morning',   e:'🌅', l:'Matin (avant 12h)'},
    {v:'day',       e:'☀️', l:'Journée (9h-18h)'},
    {v:'afternoon', e:'🌆', l:'Après-midi / Soir (après 17h)'},
    {v:'night',     e:'🌙', l:'Nuit (après 22h)'},
    {v:'split',     e:'🔄', l:'Horaires coupés / Variable'},
  ]
};

const SLOT_REGIME = {
  morning:   {startH:6,  endH:14, regimeType:'matin'},
  day:       {startH:9,  endH:18, regimeType:'standard'},
  afternoon: {startH:13, endH:21, regimeType:'decale'},
  night:     {startH:22, endH:6,  regimeType:'nuit_partielle'},
  split:     {startH:9,  endH:19, regimeType:'standard'},
};

class Checkin {
  constructor(){
    this._modal   = document.getElementById('checkin-modal');
    this._content = document.getElementById('checkin-content');
    this._close   = document.getElementById('checkin-close');
    this._step    = 0;
    this._answers = {};
    this._questions = [];
    if(this._close) this._close.addEventListener('click', () => this.close());
    if(this._modal) this._modal.querySelector('.modal-overlay')?.addEventListener('click', () => this.close());
    this._scheduleMidnightReset();
  }

  _scheduleMidnightReset(){
    const now = new Date();
    const midnight = new Date(now); midnight.setHours(24,0,0,0);
    setTimeout(() => {
      _safeLS.del('DTE_CHECKIN_DATE');
      document.getElementById('checkin-edit-badge')?.remove();
      this._scheduleMidnightReset();
    }, midnight - now);
  }

  checkIfNeeded(){
    const today = new Date().toISOString().slice(0,10);
    if (_safeLS.get('DTE_CHECKIN_DATE') !== today) {
      setTimeout(() => this.open(), 800);
    } else {
      setTimeout(() => this._showEditBadge(), 1000);
    }
  }

  openForEdit(){
    const today = new Date().toISOString().slice(0,10);
    const history = _safeLS.json('DTE_CHECKIN_HISTORY', []);
    const existing = history.find(h => h.date === today);
    this._step = 0;
    this._answers = existing ? {...existing} : {};
    delete this._answers.date;
    this._editMode = true;
    this._buildSequence();
    this._render();
    if(this._modal) this._modal.classList.remove('hidden');
  }

  _showEditBadge(){
    if(document.getElementById('checkin-edit-badge')) return;
    const btn = document.getElementById('btn-checkin');
    if(!btn) return;
    const badge = document.createElement('span');
    badge.id = 'checkin-edit-badge';
    badge.style.cssText = 'font-size:10px;color:rgba(0,255,204,0.6);cursor:pointer;margin-left:6px;border:1px solid rgba(0,255,204,0.25);padding:1px 5px;border-radius:3px;';
    badge.textContent = '✅ fait · ✏️';
    badge.addEventListener('click', e => { e.stopPropagation(); this.openForEdit(); });
    btn.parentNode.insertBefore(badge, btn.nextSibling);
  }

  open(){
    this._step = 0; this._editMode = false;
    // Si check-in déjà fait aujourd'hui, pré-remplir les réponses
    const today = new Date().toISOString().slice(0,10);
    const history = _safeLS.json('DTE_CHECKIN_HISTORY', []);
    const existing = history.find(h => h.date === today);
    this._answers = existing ? {...existing} : {};
    delete this._answers.date;
    this._buildSequence(); this._render();
    if(this._modal) this._modal.classList.remove('hidden');
  }

  close(){ if(this._modal) this._modal.classList.add('hidden'); }

  _buildSequence(){
    const s = this._answers.dayStatus;
    if(!s) this._questions = [Q_STATUS, ...QUESTIONS_WELLBEING];
    else if(s === 'work') this._questions = [Q_STATUS, Q_SLOT, ...QUESTIONS_WELLBEING];
    else this._questions = [Q_STATUS, ...QUESTIONS_WELLBEING];
  }

  _render(){
    const q = this._questions[this._step];
    const n = this._questions.length;
    const pct = Math.round((this._step/n)*100);

    this._content.innerHTML = `
      <div style="padding:0 4px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span style="font-size:10px;color:rgba(255,255,255,0.4);font-family:var(--font-mono);">${this._step+1} / ${n}</span>
          <div style="flex:1;height:3px;background:rgba(255,255,255,0.1);margin:0 10px;">
            <div style="height:100%;width:${pct}%;background:var(--sync);transition:width .3s;"></div>
          </div>
          ${this._step>0?`<button id="ci-prev" style="font-size:11px;color:rgba(255,255,255,0.4);background:none;border:none;cursor:pointer;padding:2px 6px;">← Retour</button>`:'<span></span>'}
        </div>
        <div style="text-align:center;font-size:36px;margin-bottom:10px;">${q.emoji}</div>
        <div style="font-size:15px;font-weight:600;color:#fff;text-align:center;margin-bottom:18px;line-height:1.4;">${q.text}</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${q.opts.map(o=>`
            <button data-val="${o.v}" style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:rgba(0,10,25,.85);border:1px solid ${this._answers[q.id]===o.v?'rgba(0,255,204,0.6)':'rgba(255,255,255,0.12)'};cursor:pointer;transition:all .15s;text-align:left;width:100%;${this._answers[q.id]===o.v?'background:rgba(0,255,204,0.1);':''}">
              <span style="font-size:22px;flex-shrink:0;">${o.e}</span>
              <span style="font-size:13px;color:#fff;">${o.l}</span>
            </button>`).join('')}
        </div>
      </div>`;

    this._content.querySelectorAll('button[data-val]').forEach(el => {
      el.addEventListener('click', () => {
        const val = el.dataset.val;
        this._answers[q.id] = isNaN(val) ? val : parseInt(val);
        if(q.id === 'dayStatus') this._buildSequence();
        setTimeout(() => {
          if(this._step < this._questions.length-1){ this._step++; this._render(); }
          else { this._submit(); }
        }, 220);
      });
    });

    const prev = document.getElementById('ci-prev');
    if(prev) prev.addEventListener('click', () => { this._step = Math.max(0,this._step-1); this._render(); });
  }

  _submit(){
    const today = new Date().toISOString().slice(0,10);
    _safeLS.set('DTE_CHECKIN_DATE', today);

    // Écrire DTE_VACANCES_ si repos/congé/maladie
    const status = this._answers.dayStatus;
    if(status === 'holiday' || status === 'sick' || status === 'rest'){
      const yr = today.slice(0,4);
      try {
        const vac = JSON.parse(localStorage.getItem('DTE_VACANCES_'+yr)||'{}');
        vac[today] = true;
        localStorage.setItem('DTE_VACANCES_'+yr, JSON.stringify(vac));
      } catch(_){}
    }

    // Appliquer créneau horaire → DTE_SETTINGS (clé lue par dte-engine.js)
    const slot = this._answers.timeSlot;
    if(slot && SLOT_REGIME[slot]){
      const r = SLOT_REGIME[slot];
      try {
        const settings = JSON.parse(localStorage.getItem('DTE_SETTINGS')||'{}');
        settings.startH = r.startH; settings.endH = r.endH; settings.regimeType = r.regimeType;
        localStorage.setItem('DTE_SETTINGS', JSON.stringify(settings));
      } catch(_){}
    }

    // Historique
    const history = _safeLS.json('DTE_CHECKIN_HISTORY', []);
    const idx = history.findIndex(h => h.date === today);
    const entry = {date:today, ...this._answers};
    if(idx>=0) history[idx]=entry; else history.push(entry);
    if(history.length>90) history.shift();
    _safeLS.set('DTE_CHECKIN_HISTORY', JSON.stringify(history));

    document.getElementById('checkin-edit-badge')?.remove();

    if(window.DTE&&window.DTE.learning&&window.DTE.engine){
      const st = window.DTE.engine.getState();
      if(st){
        window.DTE.learning.adaptFromCheckin(this._answers, st.scores);
        const newNorm = window.DTE.learning.applyCheckin(this._answers, st.norm);
        document.dispatchEvent(new CustomEvent('dte:checkin', {detail:{data:this._answers,norm:newNorm}}));
      }
    }

    const statusMsg = {
      work:'💼 Journée de travail enregistrée.',
      rest:'🏠 Jour de repos enregistré.',
      holiday:'🌴 Congé enregistré — vos scores sont ajustés.',
      sick:'🤒 Arrêt maladie enregistré — prenez soin de vous.',
    }[status]||'Données intégrées dans l\'analyse.';

    this._content.innerHTML = `
      <div style="text-align:center;padding:var(--gap-xl);">
        <div style="font-size:48px;">🦊</div>
        <div style="font-family:var(--font-h);font-size:20px;font-weight:700;margin:var(--gap) 0;">Check-in enregistré !</div>
        <div style="color:var(--text-dim);font-size:13px;line-height:1.6;">${statusMsg}<br>Précision du modèle améliorée.</div>
        <div style="display:flex;justify-content:center;gap:var(--gap);margin-top:var(--gap-l);flex-wrap:wrap;">
          ${Object.entries(this._answers).filter(([k])=>k!=='dayStatus'&&k!=='timeSlot').map(([k,v])=>{
            const q=QUESTIONS_WELLBEING.find(q=>q.id===k); const o=q?q.opts.find(o=>o.v===v):null;
            return q?`<span style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:4px 10px;font-family:var(--font-mono);font-size:10px;">${q.emoji} ${o?o.e:''}</span>`:'';
          }).join('')}
        </div>
        <button class="btn btn--cyan" style="margin-top:var(--gap-l);" id="ci-done">Fermer</button>
      </div>`;

    document.getElementById('ci-done').addEventListener('click', ()=>this.close());
    if(window._fullSync) window._fullSync();
    else if(window._forcSync) window._forcSync();
    window.DTE?.notifications?.show('Check-in enregistré','ok','🦊',statusMsg);
  }

  getLatest(){
    const h = _safeLS.json('DTE_CHECKIN_HISTORY', []);
    return h.length ? h[h.length-1] : null;
  }
}

global.Checkin = Checkin;
}(typeof window!=='undefined'?window:global));
