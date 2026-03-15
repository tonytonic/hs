/**
 * AIAdvisor — Conseiller juridique & prévention
 * Interface identique au glossaire scientifique :
 * barre recherche + onglets + cartes scrollables
 */
(function(global){
'use strict';

class AIAdvisor {
  constructor(){
    this._modal   = null;
    this._q       = '';
    this._tab     = 'conseils';  // conseils | categories | recherche
  }

  open(){
    if (!this._modal) this._build();
    this._modal.classList.remove('hidden');
    this._render();
    setTimeout(() => this._modal.querySelector('#ai-search')?.focus(), 100);
  }

  close(){ this._modal?.classList.add('hidden'); }

  _build(){
    const advisor = window.DTE && window.DTE.scenarioAdvisor;
    const stats   = advisor ? advisor.stats() : { total: 0 };

    const m = document.createElement('div');
    m.className = 'modal'; m.id = 'ai-modal-new';
    m.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-box" style="max-width:700px;max-height:calc(88vh - env(safe-area-inset-top));margin-top:calc(env(safe-area-inset-top) + 8px);">
        <div class="modal-header">
          <h2>&#9670; CONSEILLER JURIDIQUE &amp; PRÉVENTION</h2>
          <span class="modal-close" id="ai-close-new">&#x2715;</span>
        </div>

        <!-- Barre recherche -->
        <div style="display:flex;gap:6px;margin-bottom:10px;">
          <input type="text" id="ai-search" class="ai-input" style="flex:1;"
            placeholder="repos compensateur · burn-out · 48h · contingent · droit de retrait…" maxlength="80"/>
          <button id="ai-clear" class="btn btn--ghost" style="padding:5px 10px;font-size:10px;">✕</button>
        </div>

        <!-- Onglets -->
        <div style="display:flex;gap:2px;margin-bottom:10px;flex-wrap:wrap;">
          <button class="gloss-tab active" data-tab="conseils">&#9830; CONSEILS (${stats.total})</button>
          <button class="gloss-tab" data-tab="categories">&#127979; CATÉGORIES</button>
          <button class="gloss-tab" data-tab="recherche">&#128270; RECHERCHE LIBRE</button>
        </div>

        <!-- Contenu scrollable -->
        <div id="ai-content-new" style="overflow-y:auto;max-height:50vh;"></div>

        <!-- Footer état -->
        <div id="ai-footer-state" style="margin-top:8px;padding-top:8px;
          border-top:1px solid rgba(0,200,255,0.1);
          font-family:var(--font-mono);font-size:8px;color:var(--text-muted);"></div>
      </div>`;

    document.body.appendChild(m);
    this._modal = m;

    // Overlay + close
    m.querySelector('.modal-overlay').addEventListener('click', () => this.close());
    m.querySelector('#ai-close-new').addEventListener('click', () => this.close());

    // Search
    const inp = m.querySelector('#ai-search');
    inp.addEventListener('input', e => { this._q = e.target.value; this._render(); });
    m.querySelector('#ai-clear').addEventListener('click', () => {
      inp.value = ''; this._q = ''; this._render(); inp.focus();
    });

    // Tabs
    m.querySelectorAll('.gloss-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        m.querySelectorAll('.gloss-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._tab = btn.dataset.tab;
        this._render();
      });
    });
  }

  _render(){
    const el = this._modal?.querySelector('#ai-content-new');
    if (!el) return;

    const advisor = window.DTE && window.DTE.scenarioAdvisor;
    const state   = window.DTE?._state;

    // Footer état
    const footer = this._modal.querySelector('#ai-footer-state');
    if (footer && state?.scores) {
      const sc = state.scores;
      const chip = (l, v, c) => `<span style="color:var(--${c});margin-right:10px;">${l} : <b>${v}</b></span>`;
      footer.innerHTML = chip('Fatigue', sc.fatigue + '%', 'red')
        + chip('Stress', sc.stress + '%', 'amber')
        + chip('Perf.', sc.performance + '%', 'animus')
        + `<span style="color:rgba(255,255,255,0.3);">· ${advisor ? advisor.stats().total : 0} scénarios locaux · hors ligne · personnalisé</span>`;
    }

    if (this._tab === 'conseils') {
      this._renderConseils(el, advisor, state);
    } else if (this._tab === 'categories') {
      this._renderCategories(el, advisor, state);
    } else {
      this._renderRecherche(el, advisor, state);
    }
  }

  _renderConseils(el, advisor, state){
    if (!advisor) { el.innerHTML = this._empty('Moteur de scénarios non chargé.'); return; }

    let scenarios = [];
    if (this._q.trim().length >= 2) {
      scenarios = advisor.search(this._q, state, 20);
    } else {
      // Sans recherche : top scénarios personnalisés selon état
      scenarios = state ? advisor.match(state, 20) : advisor._db.slice(0, 20);
    }

    if (!scenarios.length) {
      el.innerHTML = this._empty(`Aucun résultat pour « ${this._q} »`);
      return;
    }
    el.innerHTML = scenarios.map(s => this._card(s)).join('');
    this._bindCards(el, advisor);
  }

  _renderCategories(el, advisor, state){
    if (!advisor) { el.innerHTML = this._empty('Non disponible.'); return; }

    // Grouper les scénarios par catégorie
    const cats = {};
    const db = this._q.trim().length >= 2
      ? advisor.search(this._q, state, 200)
      : advisor._db;
    db.forEach(s => {
      const cat = s.categorie || s.cat || 'Général';
      if (!cats[cat]) cats[cat] = [];
      cats[cat].push(s);
    });

    const urgColor = ['#00aa88','#22b8e8','#ffb300','#ff2244'];

    el.innerHTML = Object.entries(cats).map(([cat, items]) => `
      <div style="margin-bottom:12px;">
        <div style="font-family:var(--font-hud);font-size:11px;color:var(--animus);letter-spacing:.1em;
          margin-bottom:5px;padding-bottom:4px;border-bottom:1px solid rgba(0,200,255,0.15);">
          ${cat.toUpperCase()} (${items.length})
        </div>
        ${items.map(s => `
          <div class="ai-cat-item" data-id="${s.id}" style="display:flex;align-items:center;gap:8px;
            padding:4px 6px;margin-bottom:2px;cursor:pointer;
            background:rgba(0,10,25,0);transition:background .15s;">
            <span style="width:6px;height:6px;transform:rotate(45deg);flex-shrink:0;
              background:${urgColor[s.urgence]||urgColor[0]};"></span>
            <span style="font-size:10px;color:var(--text);flex:1;line-height:1.4;">
              ${s.titre.substring(0, 65)}${s.titre.length > 65 ? '…' : ''}
            </span>
            <span style="font-family:var(--font-mono);font-size:8px;color:var(--text-muted);flex-shrink:0;">
              ${['PRÉV.','INFO','ATTN.','URG.'][s.urgence]||''}
            </span>
          </div>`).join('')}
      </div>`).join('');

    // Clic sur item catégorie → affiche la carte
    el.querySelectorAll('.ai-cat-item[data-id]').forEach(item => {
      item.addEventListener('mouseenter', () => item.style.background = 'rgba(0,200,255,0.06)');
      item.addEventListener('mouseleave', () => item.style.background = 'rgba(0,10,25,0)');
      item.addEventListener('click', () => {
        const s = advisor._db.find(sc => sc.id === parseInt(item.dataset.id));
        if (!s) return;
        // Basculer sur l'onglet conseils et afficher cette carte
        this._tab = 'conseils';
        this._modal.querySelectorAll('.gloss-tab').forEach(b => b.classList.remove('active'));
        this._modal.querySelector('[data-tab="conseils"]')?.classList.add('active');
        const mainEl = this._modal.querySelector('#ai-content-new');
        mainEl.innerHTML = this._card(s);
        this._bindCards(mainEl, advisor);
        mainEl.scrollTop = 0;
      });
    });
  }

  _renderRecherche(el, advisor, state){
    // Mots-clés rapides + barre dédiée
    const kws = ['repos compensateur','contingent annuel','burn-out','droit de retrait',
      'HS nuit','heures sup','pause','48h','arrêt maladie','harcèlement','RCO',
      'stress','urgence','semaine','faute inexcusable'];

    el.innerHTML = `
      <div style="margin-bottom:14px;">
        <div style="font-family:var(--font-mono);font-size:9px;color:rgba(255,255,255,0.4);
          letter-spacing:.1em;margin-bottom:8px;">THÈMES RAPIDES</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">
          ${kws.map(kw => `<span class="ai-kw-tag" data-kw="${kw}" style="font-family:var(--font-mono);
            font-size:9px;cursor:pointer;border:1px solid rgba(0,200,255,0.2);padding:3px 9px;
            color:rgba(200,232,255,0.85);background:rgba(0,200,255,0.05);transition:all .15s;">${kw}</span>`).join('')}
        </div>
      </div>
      <div id="ai-libre-results"></div>`;

    // Mots-clés cliquables
    el.querySelectorAll('.ai-kw-tag').forEach(tag => {
      tag.addEventListener('mouseenter', () => tag.style.background = 'rgba(0,200,255,0.14)');
      tag.addEventListener('mouseleave', () => tag.style.background = 'rgba(0,200,255,0.05)');
      tag.addEventListener('click', () => {
        const res = el.querySelector('#ai-libre-results');
        if (!advisor || !res) return;
        const results = advisor.search(tag.dataset.kw, state, 8);
        res.innerHTML = results.length
          ? results.map(s => this._card(s)).join('')
          : this._empty(`Aucun résultat pour « ${tag.dataset.kw} »`);
        this._bindCards(res, advisor);
        // Mettre à jour la barre de recherche principale
        const inp = this._modal.querySelector('#ai-search');
        if (inp) { inp.value = tag.dataset.kw; this._q = tag.dataset.kw; }
      });
    });

    // Si déjà une requête dans la barre principale
    if (this._q.trim().length >= 2 && advisor) {
      const res = el.querySelector('#ai-libre-results');
      if (res) {
        const results = advisor.search(this._q, state, 8);
        res.innerHTML = results.length
          ? results.map(s => this._card(s)).join('')
          : this._empty(`Aucun résultat pour « ${this._q} »`);
        this._bindCards(res, advisor);
      }
    }
  }

  _card(s){
    const urgColor  = ['#00aa88','#22b8e8','#ffb300','#ff2244'];
    const urgLabel  = ['PRÉVENTION','INFO','ATTENTION','URGENT'];
    const c   = urgColor[s.urgence]  || urgColor[0];
    const lbl = urgLabel[s.urgence]  || urgLabel[0];
    const cat = s.categorie || s.cat || '';

    return `<div class="ai-scenario-card" data-id="${s.id}" style="background:rgba(0,10,25,.9);
      border:1px solid ${c}35;border-left:3px solid ${c};margin-bottom:5px;cursor:pointer;">

      <!-- Titre + badge -->
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;
        padding:8px 10px;border-bottom:1px solid rgba(0,200,255,0.06);">
        <div style="flex:1;">
          <div style="font-family:var(--font-hud);font-size:11px;color:#22b8e8;
            margin-bottom:3px;line-height:1.3;">${s.titre}</div>
          ${cat ? `<div style="font-family:var(--font-mono);font-size:8px;
            color:rgba(255,255,255,0.45);">${cat}</div>` : ''}
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;flex-shrink:0;">
          <span style="font-family:var(--font-mono);font-size:8px;color:rgba(255,255,255,0.75);
            border:1px solid ${c}60;background:${c}15;padding:1px 5px;white-space:nowrap;">${lbl}</span>
        </div>
      </div>

      <!-- Message -->
      <div style="padding:6px 10px;font-size:11px;color:rgba(255,255,255,0.78);line-height:1.55;">
        ${s.message}
      </div>

      <!-- Actions / Conseils -->
      ${s.conseils && s.conseils.length ? `
      <div style="padding:4px 10px 8px;">
        <div style="font-family:var(--font-mono);font-size:8px;color:rgba(255,255,255,0.4);
          letter-spacing:.1em;margin-bottom:4px;">ACTIONS</div>
        ${s.conseils.map(c2 => `<div style="font-size:10px;color:rgba(255,255,255,0.75);
          padding:2px 0;display:flex;gap:6px;">
          <span style="color:#22b8e8;flex-shrink:0;">&#x27A4;</span>${c2}
        </div>`).join('')}
      </div>` : ''}

      <!-- Références légales -->
      ${s.refs && s.refs.length ? `
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding:5px 10px;
        background:rgba(0,10,25,.5);border-top:1px solid rgba(0,200,255,0.05);">
        <span style="font-family:var(--font-mono);font-size:8px;color:rgba(255,255,255,0.35);">
          &#9632; DTE :</span>
        ${s.refs.map(r => `<span style="font-family:var(--font-mono);font-size:8px;
          color:rgba(255,255,255,0.45);">${r}</span>`).join(' · ')}
      </div>` : ''}
    </div>`;
  }

  _bindCards(container, advisor){
    // Les cartes sont juste des éléments statiques — pas de clic nécessaire
    // (tout est déjà visible sur la carte)
  }

  _empty(msg){
    return `<div style="color:var(--text-muted);font-family:var(--font-mono);
      font-size:10px;padding:16px;">${msg}</div>`;
  }
}

global.AIAdvisor = AIAdvisor;
}(typeof window !== 'undefined' ? window : global));
