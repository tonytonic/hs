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
    // Lundi : réinitialiser la confirmation N-1 pour permettre la re-modification
    const dow = new Date().getDay();
    if(dow === 1) _safeLS.del('DTE_N1_CONFIRMED');
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
    // Injecter la question de confirmation N-1 si lundi matin et pas encore confirmé
    const mondayQ = this._mondayN1Question();
    const mondayArr = mondayQ ? [mondayQ] : [];
    if(!s) this._questions = [...mondayArr, Q_STATUS, ...QUESTIONS_WELLBEING];
    else if(s === 'work') this._questions = [...mondayArr, Q_STATUS, Q_SLOT, ...QUESTIONS_WELLBEING];
    else this._questions = [...mondayArr, Q_STATUS, ...QUESTIONS_WELLBEING];
  }

  _mondayN1Question(){
    // Afficher uniquement le lundi, une fois par semaine, si N-1 non encore confirmé
    const today = new Date();
    const dow = today.getDay(); // 0=dim, 1=lun
    if(dow !== 1) return null; // pas lundi
    const todayKey = today.toISOString().slice(0,10);
    if(_safeLS.get('DTE_N1_CONFIRMED') === todayKey) return null; // déjà confirmé aujourd'hui

    // Lire la semaine précédente depuis M1 (DATA_REPORT)
    try {
      const yr = today.getFullYear();
      const prevMonday = new Date(today); prevMonday.setDate(today.getDate() - 7);
      const prevMondayKey = prevMonday.toISOString().slice(0,10);

      // Chercher dans DATA_REPORT_yr et DATA_REPORT_(yr-1)
      let prevExtra = null;
      for(const y of [yr, yr-1]) {
        const raw = localStorage.getItem('DATA_REPORT_'+y);
        if(!raw || raw === '{}') continue;
        const d = JSON.parse(raw);
        const days = d.days || d.jours || (Object.keys(d)[0]?.match(/^\d{4}-\d{2}-\d{2}$/) ? d : {});
        // Mode hebdomadaire : entrée sur le lundi de la semaine précédente
        if(days[prevMondayKey]) {
          prevExtra = days[prevMondayKey].extra || days[prevMondayKey].hs || 0;
          break;
        }
        // Mode journalier : sommer les 5 jours
        let sum = 0, found = false;
        for(let dd = 0; dd < 5; dd++) {
          const dt = new Date(prevMonday); dt.setDate(prevMonday.getDate() + dd);
          const k = dt.toISOString().slice(0,10);
          if(days[k]) { sum += days[k].extra || 0; found = true; }
        }
        if(found) { prevExtra = sum; break; }
      }

      if(prevExtra === null) return null; // pas de données → on ne demande rien

      const seuil = (() => {
        try {
          const s = JSON.parse(localStorage.getItem('DTE_SETTINGS') || '{}');
          return s.seuil || 35;
        } catch(_){ return 35; }
      })();
      const totalH = seuil + prevExtra;
      const heuresLabel = prevExtra === 0
        ? `${totalH}h (aucune heure sup)`
        : `${totalH}h (+${prevExtra}h sup)`;

      return {
        id: 'n1confirm',
        text: `Semaine passée : ${heuresLabel}. C'est exact ?`,
        emoji: '📋',
        _prevExtra: prevExtra,
        _prevMondayKey: prevMondayKey,
        _seuil: seuil,
        opts: [
          {v: 'ok',    e: '✅', l: `Oui, ${heuresLabel}`},
          {v: 'moins', e: '⬇️', l: "Moins — j'ai travaillé moins"},
          {v: 'plus',  e: '⬆️', l: "Plus — j'ai travaillé plus"},
          {v: 'skip',  e: '⏭️', l: 'Passer'},
        ]
      };
    } catch(_) { return null; }
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

        // Traitement spécial pour la confirmation N-1
        if(q.id === 'n1confirm') {
          const today = new Date().toISOString().slice(0,10);
          _safeLS.set('DTE_N1_CONFIRMED', today);
          if(val === 'ok') {
            // Valider N-1 tel quel → écrire dans DATA_REPORT si absent
            this._saveN1Confirmed(q._prevMondayKey, q._prevExtra, q._seuil);
          } else if(val === 'moins' || val === 'plus') {
            // Afficher un input numérique pour corriger
            this._renderN1Edit(q._prevMondayKey, q._prevExtra, q._seuil, val);
            return;
          }
          // skip ou ok → continuer normalement
          this._buildSequence();
        }

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
    // Si correction vers "work" : supprimer la date des vacances si elle y était
    const status = this._answers.dayStatus;
    const yr = today.slice(0,4);
    try {
      const vac = JSON.parse(localStorage.getItem('DTE_VACANCES_'+yr)||'{}');
      if(status === 'holiday' || status === 'sick' || status === 'rest'){
        vac[today] = true;
      } else {
        // Statut travail → retirer du registre vacances si erreur précédente
        delete vac[today];
      }
      localStorage.setItem('DTE_VACANCES_'+yr, JSON.stringify(vac));
    } catch(_){}

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

  _saveN1Confirmed(mondayKey, extraH, seuil){
    // Écrire la semaine confirmée dans DATA_REPORT si elle n'y est pas déjà
    // ou si on veut consolider une saisie hebdomadaire
    try {
      const yr = parseInt(mondayKey.slice(0,4));
      const raw = localStorage.getItem('DATA_REPORT_'+yr);
      const d = raw && raw !== '{}' ? JSON.parse(raw) : {};
      const days = d.days || d.jours || {};
      // Écrire uniquement si l'entrée n'existe pas déjà (ne pas écraser une saisie manuelle)
      if(!days[mondayKey]) {
        days[mondayKey] = { extra: extraH, recup: 0, absent: 0 };
        d.days = days;
        localStorage.setItem('DATA_REPORT_'+yr, JSON.stringify(d));
      }
    } catch(_) {}
  }

  _renderN1Edit(mondayKey, prevExtra, seuil, direction){
    // Interface de correction rapide du total semaine précédente
    const totalH = seuil + prevExtra;
    const hint = direction === 'moins'
      ? `Entre ${Math.max(seuil-10,0)} et ${totalH-0.5}h`
      : `Entre ${totalH+0.5} et ${seuil+20}h`;

    this._content.innerHTML = `
      <div style="padding:0 4px;">
        <div style="text-align:center;font-size:36px;margin-bottom:10px;">✏️</div>
        <div style="font-size:15px;font-weight:600;color:#fff;text-align:center;margin-bottom:6px;line-height:1.4;">
          Combien d'heures avez-vous travaillé la semaine passée ?
        </div>
        <div style="font-size:12px;color:rgba(255,255,255,0.45);text-align:center;margin-bottom:18px;">${hint}</div>
        <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:20px;">
          <button id="n1-minus" style="width:44px;height:44px;font-size:22px;background:rgba(0,255,204,0.1);border:1px solid rgba(0,255,204,0.3);color:#fff;cursor:pointer;">−</button>
          <div style="text-align:center;">
            <div id="n1-val" style="font-size:42px;font-weight:700;color:var(--sync,#00ffcc);">${totalH}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.4);">heures / semaine</div>
          </div>
          <button id="n1-plus" style="width:44px;height:44px;font-size:22px;background:rgba(0,255,204,0.1);border:1px solid rgba(0,255,204,0.3);color:#fff;cursor:pointer;">+</button>
        </div>
        <button id="n1-confirm" style="width:100%;padding:14px;background:rgba(0,255,204,0.15);border:1px solid rgba(0,255,204,0.4);color:#fff;font-size:14px;font-weight:600;cursor:pointer;">
          ✅ Confirmer
        </button>
        <button id="n1-skip" style="width:100%;margin-top:8px;padding:10px;background:transparent;border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.4);font-size:12px;cursor:pointer;">
          Passer sans modifier
        </button>
      </div>`;

    let current = totalH;
    const valEl = document.getElementById('n1-val');
    document.getElementById('n1-minus').addEventListener('click', () => {
      current = Math.max(0, Math.round((current - 0.5) * 2) / 2);
      valEl.textContent = current;
    });
    document.getElementById('n1-plus').addEventListener('click', () => {
      current = Math.min(80, Math.round((current + 0.5) * 2) / 2);
      valEl.textContent = current;
    });
    document.getElementById('n1-confirm').addEventListener('click', () => {
      const newExtra = Math.max(0, current - seuil);
      this._saveN1Confirmed(mondayKey, newExtra, seuil);
      // Écraser avec la valeur corrigée
      try {
        const yr = parseInt(mondayKey.slice(0,4));
        const raw = localStorage.getItem('DATA_REPORT_'+yr);
        const d = raw && raw !== '{}' ? JSON.parse(raw) : {};
        const days = d.days || {};
        days[mondayKey] = { extra: newExtra, recup: 0, absent: 0 };
        d.days = days;
        localStorage.setItem('DATA_REPORT_'+yr, JSON.stringify(d));
      } catch(_) {}
      this._step++;
      this._render();
    });
    document.getElementById('n1-skip').addEventListener('click', () => {
      _safeLS.set('DTE_N1_CONFIRMED', new Date().toISOString().slice(0,10));
      this._step++;
      this._render();
    });
  }

  getLatest(){
    const h = _safeLS.json('DTE_CHECKIN_HISTORY', []);
    return h.length ? h[h.length-1] : null;
  }
}

global.Checkin = Checkin;
}(typeof window!=='undefined'?window:global));
