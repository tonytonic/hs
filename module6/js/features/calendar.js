/**
 * CALENDAR M6 v2 — Corrections audit complètes
 * - Mood OBLIGATOIRE avant enregistrement
 * - Déplacement = TOGGLE sur Travail (pas exclusif)
 * - Horaires défaut 09:00-18:30 pré-remplis
 * - Bandeau compteur global annuel fixe
 * - Demi-journee : visuel cellule coupée
 * - Alerte amplitude temps réel automatique
 * - Anti-doublon semaine validation rapide
 * - Demi-journee 0.5 bien comptée
 */
'use strict';

(function(global) {

const MOOD_COLORS = {
  faible:   { bg:'#E8F5F0', border:'#4A7C6F', text:'#2D5A4E', label:'Légère',  icon:'🌿' },
  ok:       { bg:'#EEF3FA', border:'#3B6098', text:'#1E3A5F', label:'Normale',  icon:'✓'  },
  eleve:    { bg:'#FFF7E6', border:'#C4853A', text:'#8B5A1A', label:'Soutenue', icon:'⚡' },
  critique: { bg:'#FFF0EE', border:'#B85C50', text:'#7A3028', label:'Critique', icon:'🔥' },
};

const TYPE_CONFIG = {
  // ── Types principaux ──────────────────────────────────────────
  travail:    { icon:'●', label:'Travail',        bg:'#1E3A5F', text:'#fff', val:1,   groupe:'travail' },
  rtt:        { icon:'○', label:'RTT',            bg:'#4A7C6F', text:'#fff', val:0,   groupe:'repos'   },
  cp:         { icon:'◆', label:'Conge paye',     bg:'#2D6A4F', text:'#fff', val:0,   groupe:'repos'   },
  ferie:      { icon:'★', label:'Férié',          bg:'#3B6098', text:'#fff', val:0,   groupe:'repos'   },
  repos:      { icon:'◯', label:'Repos',          bg:'#6B7280', text:'#fff', val:0,   groupe:'repos'   },
  rachat:     { icon:'◈', label:'Rachat',         bg:'#C4853A', text:'#fff', val:1,   groupe:'travail' },
  demi:       { icon:'◑', label:'Demi-journee',   bg:'#5C3F9B', text:'#fff', val:0.5, groupe:'travail' },
  // ── Types absences (n ouvrent pas droit aux RTT) ──────────────
  maladie:    { icon:'✚', label:'Maladie',        bg:'#9B2C2C', text:'#fff', val:0,   groupe:'absence',
                info:'Absence maladie — ne compte pas comme jour travaillé ni RTT. Interrompt le compteur de forfait.' },
  maternite:  { icon:'◇', label:'Maternite/Pat.', bg:'#BE185D', text:'#fff', val:0,   groupe:'absence',
                info:'Congé maternité ou paternité — protégé, ne peut pas etre recupere sur le forfait (L1225-1).' },
  css:        { icon:'◎', label:'Conge ss solde', bg:'#78350F', text:'#fff', val:0,   groupe:'absence',
                info:'Conge sans solde — le forfait jours est suspendu (ni travail ni RTT généré). Recalcule le prorata annuel.' },
  formation:  { icon:'▲', label:'Formation',      bg:'#1E40AF', text:'#fff', val:0,   groupe:'absence',
                info:'Formation professionnelle — ne compte generalement pas comme jour de travail dans le forfait (à vérifier CCN).' },
  cet:        { icon:'◉', label:'CET',            bg:'#065F46', text:'#fff', val:0,   groupe:'repos',
                info:'Compte Épargne Temps — journee consommee sur le CET. Distincte des RTT contractuels.' },
  astreinte:  { icon:'◐', label:'Astreinte',      bg:'#374151', text:'#fff', val:0.5, groupe:'travail',
                info:'Astreinte — periode de disponibilité sans travail effectif (L3121-9). Comptee 0.5j dans le suivi de charge.' },
  teletravail:{ icon:'⌂',  label:'Teletravail',   bg:'#1E3A5F', text:'#fff', val:1,   groupe:'travail',
                info:'Jour travaillé à distance — même valeur qu un jour de travail au bureau (L1222-9). Rémunération inchangée.' },
};

const M6_Calendar = {
  _container:null, _regime:null, _year:null, _data:{}, _moods:{},
  _feries:null, _onSave:null, _overlay:null,
  _currentMonth:null,  // conservé pour compatibilité
  _viewYear:null,      // année affichée (peut être year-1 pour exercice à cheval)
  _viewMonth:null,     // mois affiché (0-11)
  _swipeStartX:0, _contract:null,

  init(container, regime, year, data, moods, onSave, contract) {
    this._container    = container;
    this._regime       = regime;
    this._year         = year;
    this._data         = data || {};
    this._moods        = moods || {};
    this._feries       = M6_Feries.getSet(year);
    this._onSave       = onSave;
    this._contract     = contract || {};
    const now = new Date();
    this._viewYear     = now.getFullYear();
    this._viewMonth    = now.getMonth();
    this._currentMonth = this._viewMonth; // compatibilité
    this._render();
    this._bindSwipe();
  },

  refresh(data, moods) {
    this._data  = data || {};
    this._moods = moods || {};
    this._render();
  },

  // ── Compteur global ──────────────────────────────────────────
  _countTravail() {
    let n = 0;
    Object.values(this._data).forEach(v => {
      const t = v.type || 'travail';
      n += TYPE_CONFIG[t]?.val ?? (t === 'travail' ? 1 : 0);
    });
    return Math.round(n * 10) / 10;
  },

  // ── Render ────────────────────────────────────────────────────
  _render() {
    // PRIORITÉ plafond identique au bilan : saisie manuelle > CCN > droit commun 218
    const c = this._contract || {};
    let plafond = c.plafondManuel || c.plafond || 218;
    // Si le contrat n'a pas de plafond explicite mais une CCN reconnue, tenter la CCN
    if ((!c.plafond || c.plafond === 218) && c.ccnIdcc && window.CCN_CADRES_API?.getFJ) {
      try {
        const ccnFJ = window.CCN_CADRES_API.getFJ(c.ccnIdcc);
        if (ccnFJ?.plafond) plafond = c.plafondManuel || ccnFJ.plafond;
      } catch(_) {}
    }
    const travailles = this._countTravail();
    const pct = Math.min(100, Math.round(travailles / plafond * 100));
    const restants = Math.max(0, plafond - travailles);
    const barColor = pct >= 100 ? '#9B2C2C' : pct >= 90 ? '#C4853A' : '#2D6A4F';

    this._container.innerHTML = `
    <!-- Bandeau compteur global annuel fixe -->
    <div style="background:var(--charbon);border-radius:var(--radius);padding:10px 14px;margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">
        <div style="font-size:0.72rem;color:var(--pierre)">Total annuel</div>
        <div style="font-size:0.68rem;color:${pct>=90?'#E57C70':'var(--champagne)'}">
          <strong style="color:${pct>=90?'#E57C70':'var(--ivoire)'}">${restants}j</strong> restants
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <div style="flex:1;height:6px;background:rgba(255,255,255,0.1);border-radius:99px;overflow:hidden">
          <div style="height:100%;width:${pct}%;border-radius:99px;background:${barColor};transition:width 0.5s"></div>
        </div>
        <div style="font-family:var(--font-display);font-size:1rem;font-weight:700;color:var(--ivoire);white-space:nowrap">
          ${travailles} / ${plafond}j
        </div>
      </div>
    </div>

    <!-- Navigation mois -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <button id="cal-prev" style="background:none;border:1px solid var(--ivoire-3);border-radius:8px;padding:6px 14px;font-size:1.1rem;cursor:pointer;color:var(--charbon)">‹</button>
      <div style="font-family:var(--font-display);font-size:1.1rem;font-weight:600;color:var(--charbon)" id="cal-mlabel">
        ${this._mName(this._viewMonth)} ${this._viewYear}
      </div>
      <button id="cal-next" style="background:none;border:1px solid var(--ivoire-3);border-radius:8px;padding:6px 14px;font-size:1.1rem;cursor:pointer;color:var(--charbon)">›</button>
    </div>

    <!-- Légende compacte -->
    <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px">
      ${Object.entries(TYPE_CONFIG).map(([t,c])=>`
        <div style="display:flex;align-items:center;gap:3px;font-size:0.6rem;color:var(--charbon-3)">
          <div style="width:9px;height:9px;border-radius:2px;background:${c.bg};flex-shrink:0"></div>${c.label}
        </div>`).join('')}
      <div style="display:flex;align-items:center;gap:3px;font-size:0.6rem;color:var(--charbon-3)">
        <div style="width:9px;height:9px;border-radius:2px;background:linear-gradient(90deg,#1E3A5F 50%,#5C3F9B 50%)"></div>Demi-j.
      </div>
    </div>

    <!-- Calendrier courant -->
    <div id="cal-cur">${this._buildMonth(this._viewMonth, this._viewYear)}</div>

    <!-- Stats mood -->
    <div id="cal-stats">${this._buildStats()}</div>

    <!-- Actions rapides -->
    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
      <button class="m6-btn m6-btn-ghost" id="cal-btn-sem" style="flex:1;font-size:0.78rem">✓ Valider semaine</button>
      <button class="m6-btn m6-btn-ghost" id="cal-btn-yr"  style="flex:1;font-size:0.78rem">Voir l'année</button>
    </div>

    <!-- Overlay popup -->
    <div class="m6-overlay" id="cal-popup">
      <div class="m6-sheet" id="cal-sheet" style="max-height:88dvh;overflow-y:auto"></div>
    </div>

    <!-- Overlay année complète -->
    <div class="m6-overlay" id="cal-yr-overlay">
      <div class="m6-sheet" style="max-height:92dvh;overflow-y:auto;border-radius:16px 16px 0 0;padding:14px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="font-family:var(--font-display);font-size:1.1rem;font-weight:600">Calendrier ${this._year}</div>
          <button id="cal-yr-close" style="background:none;border:1px solid var(--ivoire-3);border-radius:8px;padding:5px 12px;font-size:0.8rem;cursor:pointer">✕</button>
        </div>
        <div>${Array.from({length:12},(_,m)=>this._buildMonth(m)).join('')}</div>
      </div>
    </div>
    `;

    this._overlay = this._container.querySelector('#cal-popup');
    this._bindEvents();
  },

  _buildMonth(mois, displayYear) {
    const yr   = (displayYear !== undefined && displayYear !== null) ? displayYear : this._year;
    const premier = new Date(yr, mois, 1);
    let dow = premier.getDay(); dow = dow===0?6:dow-1;
    const nbJ = new Date(yr, mois+1, 0).getDate();
    const today = new Date().toISOString().slice(0,10);
    let cells = '';
    for (let i=0; i<dow; i++) cells += `<div></div>`;

    for (let j=1; j<=nbJ; j++) {
      const dk  = `${yr}-${String(mois+1).padStart(2,'0')}-${String(j).padStart(2,'0')}`;
      const d   = new Date(yr, mois, j);
      const dw  = d.getDay(), isWE = dw===0||dw===6;
      const isFerie = this._feries.has(dk);
      const entry   = this._data[dk];
      let type = entry?.type;
      if (!type) { if(isFerie) type='ferie'; }
      const isDep    = entry?.deplacement === true;
      const isToday  = dk === today;
      const mood     = this._moods[dk];
      const cfg      = type ? TYPE_CONFIG[type] : null;
      const moodDot  = mood ? `<div style="position:absolute;bottom:1px;right:1px;width:5px;height:5px;border-radius:50%;background:${MOOD_COLORS[mood.niveau]?.border||'#aaa'}"></div>` : '';
      const depBadge = isDep ? `<div style="position:absolute;top:1px;left:1px;font-size:0.45rem;line-height:1">T</div>` : '';

      let cellBg = cfg ? cfg.bg : 'var(--ivoire-2)';
      if (type === 'demi') cellBg = 'linear-gradient(135deg,#1E3A5F 50%,#E2DAD0 50%)';

      cells += `<div onclick="M6_Calendar._openPopup('${dk}')"
        style="aspect-ratio:1;border-radius:4px;cursor:pointer;position:relative;
               display:flex;align-items:center;justify-content:center;
               font-size:0.58rem;font-weight:${isToday?'700':'400'};
               background:${cellBg};
               color:${cfg?cfg.text:'var(--pierre)'};
               box-shadow:${isToday?'inset 0 0 0 2px var(--champagne)':'none'};
               opacity:${isWE&&!entry?'0.6':'1'}"
        title="${this._tLabel(type)} — ${dk}">
        ${j}${moodDot}${depBadge}
      </div>`;
    }

    const mPfx = `${yr}-${String(mois+1).padStart(2,'0')}`;
    const jTrav = Object.entries(this._data)
      .filter(([k,v])=> k.startsWith(mPfx) && (v.type==='travail'||v.type==='rachat'))
      .length + Object.entries(this._data)
      .filter(([k,v])=> k.startsWith(mPfx) && v.type==='demi')
      .length * 0.5;

    const mN = this._mName(mois);

    return `<div class="m6-card" style="margin-bottom:10px">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-bottom:var(--grey-line)">
        <div style="font-family:var(--font-display);font-size:0.95rem;font-weight:600">${mN}</div>
        <span style="font-size:0.65rem;background:var(--ivoire-2);color:var(--pierre);border-radius:99px;padding:2px 8px">${jTrav}j</span>
      </div>
      <div style="padding:8px 8px 10px">
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;margin-bottom:3px">
          ${['L','M','M','J','V','S','D'].map(l=>`<div style="text-align:center;font-size:0.52rem;color:var(--pierre)">${l}</div>`).join('')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">${cells}</div>
      </div>
    </div>`;
  },

  _buildStats() {
    const moods = Object.values(this._moods);
    if (!moods.length) return '';
    const mc = {};
    moods.forEach(m => {
      // Décapsuler récursivement si on tombe sur d'anciennes données mal stockées
      let niv = m?.niveau;
      while (niv && typeof niv === 'object') niv = niv.niveau;
      if (!niv || typeof niv !== 'string') return; // ignorer les moods invalides
      mc[niv] = (mc[niv] || 0) + 1;
    });
    if (!Object.keys(mc).length) return '';
    return `<div class="m6-card" style="margin-top:8px"><div class="m6-card-body">
      <div class="m6-card-label" style="margin-bottom:6px">Charge déclarée</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${Object.entries(mc).map(([niv,n])=>{const c=MOOD_COLORS[niv]||{};return `<div style="background:${c.bg||'#eee'};border:1px solid ${c.border||'#aaa'};border-radius:8px;padding:5px 10px;font-size:0.7rem;color:${c.text||'#333'}">${c.icon||''} <strong>${n}</strong> ${c.label||niv}</div>`;}).join('')}
      </div>
    </div></div>`;
  },

  // ── POPUP JOUR ────────────────────────────────────────────────
  _openPopup(dk) {
    if (!this._overlay) return;
    const d      = new Date(dk+'T12:00:00');
    const label  = d.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
    const entry  = this._data[dk] || {};
    const mood   = this._moods[dk] || {};
    const isFerie = this._feries.has(dk);
    const isWE   = [0,6].includes(d.getDay());
    const sheet  = this._container.querySelector('#cal-sheet');

    // Horaires défaut pré-remplis 09:00 / 18:30
    const defaultDebut = entry.debut || '09:00';
    const defaultFin   = entry.fin   || '18:30';

    sheet.innerHTML = `
    <div style="font-family:var(--font-display);font-size:1.15rem;font-weight:600;margin-bottom:6px;color:var(--charbon);text-transform:capitalize">${label}</div>
    ${isFerie?`<div style="display:inline-block;font-size:0.65rem;background:var(--info-bg);color:var(--info);border-radius:99px;padding:2px 10px;margin-bottom:10px">Jour férié</div>`:''}
    ${isWE?`<div style="display:inline-block;font-size:0.65rem;background:var(--ivoire-2);color:var(--pierre);border-radius:99px;padding:2px 10px;margin-bottom:10px">Week-end</div>`:''}

    <!-- Type (sans déplacement — géré séparément) -->
    <div style="font-size:0.68rem;text-transform:uppercase;letter-spacing:0.07em;color:var(--pierre);margin-bottom:8px">Type de journée</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:12px">
      ${['travail','rtt','cp','ferie','repos','rachat','demi','maladie','maternite','astreinte'].map(t=>{
        const c = TYPE_CONFIG[t];
        if (!c) return '';
        const sel = entry.type===t;
        return `<div class="cal-type-pill" data-type="${t}"
          style="border:2px solid ${sel?c.bg:'var(--ivoire-3)'};
                 background:${sel?c.bg:'var(--ivoire)'};
                 color:${sel?c.text:'var(--charbon-3)'};
                 border-radius:10px;padding:10px 4px;text-align:center;cursor:pointer;
                 font-size:0.68rem;font-weight:500;transition:all 0.15s">
          <div style="font-size:0.9rem;margin-bottom:3px">${c.icon}</div>${c.label}
        </div>`;
      }).join('')}
    </div>

    <!-- Matin / Après-midi pour demi-journée -->
    <div id="demi-ampm-zone" style="${entry.type==='demi'?'':'display:none'}margin-bottom:12px">
      <div style="font-size:0.68rem;text-transform:uppercase;letter-spacing:0.07em;color:var(--pierre);margin-bottom:6px">Demi-journée — période</div>
      <div class="m6-am-pm">
        <label><input type="radio" name="demi-period" value="matin" ${(entry.demiPeriode||'matin')==='matin'?'checked':''}><span>🌅 Matin</span></label>
        <label><input type="radio" name="demi-period" value="apresmidi" ${entry.demiPeriode==='apresmidi'?'checked':''}><span>🌇 Après-midi</span></label>
      </div>
      <div style="font-size:0.68rem;text-transform:uppercase;letter-spacing:0.07em;color:var(--pierre);margin:8px 0 4px">Nature de la demi-journée</div>
      <div class="m6-am-pm" style="flex-wrap:wrap;gap:6px">
        <label><input type="radio" name="demi-nature" value="travail" ${(entry.demiNature||'travail')==='travail'?'checked':''}><span>💼 Travail</span></label>
        <label><input type="radio" name="demi-nature" value="rtt" ${entry.demiNature==='rtt'?'checked':''}><span>🏖️ RTT</span></label>
        <label><input type="radio" name="demi-nature" value="cp" ${entry.demiNature==='cp'?'checked':''}><span>🌴 CP</span></label>
        <label><input type="radio" name="demi-nature" value="repos" ${entry.demiNature==='repos'?'checked':''}><span>🛋️ Repos</span></label>
        <label><input type="radio" name="demi-nature" value="deplacement" ${entry.demiNature==='deplacement'?'checked':''}><span>✈️ Déplacement</span></label>
      </div>
    </div>

    <!-- Déplacement : toggle sur Travail -->
    <div style="margin-bottom:12px">
      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:10px 12px;background:var(--ivoire);border-radius:var(--radius);border:2px solid ${entry.deplacement?'#5C3F9B':'var(--ivoire-3)'}">
        <div id="dep-toggle" style="width:20px;height:20px;border-radius:50%;background:${entry.deplacement?'#5C3F9B':'var(--ivoire-3)'};display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.7rem;flex-shrink:0">T</div>
        <div>
          <div style="font-size:0.8rem;font-weight:500;color:var(--charbon)">En déplacement</div>
          <div style="font-size:0.65rem;color:var(--pierre)">S'ajoute à la journée (pas exclusif)</div>
        </div>
      </label>
    </div>

    <!-- Amplitude avec horaires défaut pré-remplis -->
    <div style="font-size:0.68rem;text-transform:uppercase;letter-spacing:0.07em;color:var(--pierre);margin-bottom:6px">
      Amplitude horaire <span style="text-transform:none;font-size:0.65rem;color:var(--pierre);opacity:0.7">(optionnel — alerte auto si > 13h)</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:6px">
      <div class="m6-field" style="margin:0"><label>Début</label>
        <input type="time" id="pop-deb" value="${defaultDebut}" style="font-size:14px"></div>
      <div class="m6-field" style="margin:0"><label>Fin</label>
        <input type="time" id="pop-fin" value="${defaultFin}" style="font-size:14px"></div>
    </div>
    <div id="pop-amp-warn" style="margin-bottom:10px"></div>

    <!-- Mood OBLIGATOIRE -->
    <div style="font-size:0.68rem;text-transform:uppercase;letter-spacing:0.07em;color:var(--pierre);margin-bottom:6px">
      Niveau de charge <span style="color:var(--alerte);font-size:0.6rem">* obligatoire</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px">
      ${Object.entries(MOOD_COLORS).map(([niv,c])=>`
        <div class="cal-mood-pill" data-mood="${niv}"
          style="border:2px solid ${mood.niveau===niv?c.border:'var(--ivoire-3)'};
                 background:${mood.niveau===niv?c.bg:'var(--ivoire)'};
                 color:${mood.niveau===niv?c.text:'var(--pierre)'};
                 border-radius:8px;padding:8px 4px;text-align:center;cursor:pointer;font-size:0.65rem">
          <div style="font-size:1.1rem">${c.icon}</div>${c.label}
        </div>`).join('')}
    </div>
    <div id="pop-mood-warn" style="display:none;margin-bottom:8px" class="m6-alert danger">
      <span>⚠️</span><div style="font-size:0.78rem">Renseignez le niveau de charge — requis pour l'entretien annuel (L3121-65).</div>
    </div>

    <!-- Certification repos -->
    

    <!-- Note -->
    <div class="m6-field" style="margin-bottom:14px">
      <label>Note (200 car. max)</label>
      <input type="text" id="pop-note" value="${entry.note||''}" maxlength="200" placeholder="ex: réunion critique, client…" style="font-size:14px">
    </div>

    <!-- Imputation projet (cadre dirigeant uniquement) -->
    ${this._regime === 'cadre_dirigeant' ? (() => {
      const projets = (() => { try { return JSON.parse(localStorage.getItem('M6_CD_PROJETS')||'[]'); } catch{return[];} })()
        .filter(p => p.statut !== 'termine');
      if (!projets.length) return '';
      const curProjId = entry.projetId || '';
      const curHProj  = entry.hProjet  || '';
      return `<div style="font-size:0.68rem;text-transform:uppercase;letter-spacing:0.07em;color:var(--pierre);margin-bottom:6px">Imputer sur un projet</div>
        <div class="m6-field" style="margin-bottom:8px">
          <select id="pop-projet" style="font-size:14px;width:100%">
            <option value="">— Aucun projet —</option>
            ${projets.map(p => '<option value="'+p.id+'" '+(curProjId===p.id?'selected':'')+' style="border-left:3px solid '+p.couleur+'">'+p.nom+'</option>').join('')}
          </select>
        </div>
        <div class="m6-field" id="pop-hproj-wrap" style="margin-bottom:12px;${!curProjId?'display:none':''}">
          <label style="font-size:0.68rem;text-transform:uppercase;letter-spacing:0.07em;color:var(--pierre)">Heures passees sur ce projet aujourd hui</label>
          <input type="number" id="pop-hproj" min="0" max="14" step="0.5" value="${curHProj||7}" style="font-size:16px">
        </div>`;
    })() : ''}

    <!-- Actions -->
    <button class="m6-btn m6-btn-primary" id="pop-save" style="margin-bottom:8px">Enregistrer</button>
    ${entry.type?`<button class="m6-btn m6-btn-ghost" id="pop-del" style="width:100%;font-size:0.8rem;margin-bottom:8px">Effacer ce jour</button>`:''}
    <button class="m6-btn m6-btn-ghost" id="pop-cancel" style="width:100%;font-size:0.8rem">Annuler</button>
    `;

    // État interne
    let selType = entry.type || null;
    let selMood = mood.niveau || null;
    let selDep  = entry.deplacement || false;

    // Pills type
    sheet.querySelectorAll('.cal-type-pill').forEach(p => {
      p.addEventListener('click', () => {
        sheet.querySelectorAll('.cal-type-pill').forEach(x => {
          x.style.background='var(--ivoire)'; x.style.borderColor='var(--ivoire-3)'; x.style.color='var(--charbon-3)';
        });
        selType = p.dataset.type;
        const c = TYPE_CONFIG[selType];
        if (c) { p.style.background = c.bg; p.style.borderColor = c.bg; p.style.color = c.text; }
        // Afficher zone Matin/Après-midi si demi-journée
        const demiZone = sheet.querySelector('#demi-ampm-zone');
        if (demiZone) demiZone.style.display = selType === 'demi' ? '' : 'none';
      });
    });

    // Toggle déplacement — clic sur toute la zone label (pas juste le petit rond)
    const depBtn = sheet.querySelector('#dep-toggle');
    const depWrap = depBtn?.closest('label');
    const toggleDep = () => {
      selDep = !selDep;
      if (depBtn) depBtn.style.background = selDep ? '#5C3F9B' : 'var(--ivoire-3)';
      if (depWrap) depWrap.style.borderColor = selDep ? '#5C3F9B' : 'var(--ivoire-3)';
    };
    depWrap?.addEventListener('click', (e) => {
      e.preventDefault(); // évite double-trigger du label
      toggleDep();
    });

    // Pills mood
    sheet.querySelectorAll('.cal-mood-pill').forEach(p => {
      p.addEventListener('click', () => {
        sheet.querySelectorAll('.cal-mood-pill').forEach(x => {
          x.style.borderColor='var(--ivoire-3)'; x.style.background='var(--ivoire)'; x.style.color='var(--pierre)';
        });
        selMood = p.dataset.mood;
        const c = MOOD_COLORS[selMood];
        p.style.borderColor=c.border; p.style.background=c.bg; p.style.color=c.text;
        sheet.querySelector('#pop-mood-warn')?.style.setProperty('display','none');
      });
    });

    // Alerte amplitude temps réel
    const checkAmp = () => {
      const deb = sheet.querySelector('#pop-deb')?.value;
      const fin = sheet.querySelector('#pop-fin')?.value;
      const warn = sheet.querySelector('#pop-amp-warn');
      if (!warn||!deb||!fin) return;
      const [dh,dm]=deb.split(':').map(Number), [fh,fm]=fin.split(':').map(Number);
      const amp = (fh*60+fm)-(dh*60+dm);
      if (amp > 780) {
        warn.innerHTML = `<div class="m6-alert danger" style="padding:8px 10px;font-size:0.75rem"><span>⏰</span><div>Amplitude ${Math.round(amp/60*10)/10}h > 13h — repos quotidien 11h non respecté (L3131-1)</div></div>`;
      } else if (amp > 660) {
        warn.innerHTML = `<div class="m6-alert warning" style="padding:8px 10px;font-size:0.75rem"><span>⏰</span><div>Amplitude ${Math.round(amp/60*10)/10}h > 11h — perturbation circadienne (Hakola 2001)</div></div>`;
      } else { warn.innerHTML = ''; }
    };
    sheet.querySelector('#pop-deb')?.addEventListener('change', checkAmp);
    sheet.querySelector('#pop-fin')?.addEventListener('change', checkAmp);

    // Afficher le champ heures quand un projet est sélectionné
    sheet.querySelector('#pop-projet')?.addEventListener('change', (e) => {
      const wrap = sheet.querySelector('#pop-hproj-wrap');
      if (wrap) wrap.style.display = e.target.value ? '' : 'none';
    });

    // Save
    sheet.querySelector('#pop-save')?.addEventListener('click', () => {
      // Mood obligatoire si journée travaillée
      if (!selMood && (selType === 'travail' || selType === 'rachat' || selType === 'demi')) {
        sheet.querySelector('#pop-mood-warn')?.style.setProperty('display','flex');
        return;
      }
      const debut   = sheet.querySelector('#pop-deb')?.value||null;
      const fin     = sheet.querySelector('#pop-fin')?.value||null;
      const note    = sheet.querySelector('#pop-note')?.value.trim()||null;
      const projetId = sheet.querySelector('#pop-projet')?.value || null;
      const hProjet  = projetId ? (parseFloat(sheet.querySelector('#pop-hproj')?.value)||7) : null;
      const demiPeriode = selType === 'demi' ? (sheet.querySelector('input[name="demi-period"]:checked')?.value || 'matin') : null;
      const demiNature  = selType === 'demi' ? (sheet.querySelector('input[name="demi-nature"]:checked')?.value || 'travail') : null;
      // Déplacement = toggle booléen (calc-engine teste === true)
      // Soit l'utilisateur a coché le bouton "En déplacement", soit la demi-journée est "déplacement"
      const deplacement = selDep === true || demiNature === 'deplacement';
      const value = selType ? { type:selType, debut, fin, note, deplacement, projetId, hProjet, demiPeriode, demiNature } : null;
      this._closePopup();
      if (this._onSave) this._onSave(dk, value, selMood?{niveau:selMood}:null);
    });

    sheet.querySelector('#pop-del')?.addEventListener('click', () => {
      this._closePopup();
      if (this._onSave) this._onSave(dk, null, null);
    });
    sheet.querySelector('#pop-cancel')?.addEventListener('click', () => this._closePopup());
    this._overlay?.addEventListener('click', e => { if(e.target===this._overlay) this._closePopup(); });
    requestAnimationFrame(() => this._overlay?.classList.add('open'));
  },

  _closePopup() {
    this._container.querySelector('#cal-popup')?.classList.remove('open');
    this._container.querySelector('#cal-yr-overlay')?.classList.remove('open');
  },

  // ── Validation rapide semaine (n'importe quelle semaine) ──────
  _openSemaineQuick(refDate) {
    // refDate : date de référence (défaut = aujourd'hui). Permet de valider
    // n'importe quelle semaine passée/future via les boutons ‹ ›.
    const today = refDate ? new Date(refDate + 'T12:00:00') : new Date();
    this._semaineRef = today.toISOString().slice(0,10);
    const lundi = new Date(today);
    lundi.setDate(today.getDate()-(today.getDay()===0?6:today.getDay()-1));

    // Tous les 7 jours de la semaine (Lundi → Dimanche)
    const tousjours = [];
    for (let i=0;i<7;i++) {
      const d = new Date(lundi); d.setDate(lundi.getDate()+i);
      const dk = d.toISOString().slice(0,10);
      const isWE = (i>=5); // Samedi=5, Dimanche=6
      const isFerie = this._feries.has(dk);
      tousjours.push({ dk, isWE, isFerie, label: d.toLocaleDateString('fr-FR',{weekday:'short',day:'numeric'}) });
    }
    // Par défaut : jours cochés = lundi→vendredi non fériés
    // L'utilisateur peut modifier individuellement
    const lundiStr = lundi.toLocaleDateString('fr-FR',{day:'numeric',month:'long'});
    const dimanche = new Date(lundi); dimanche.setDate(lundi.getDate()+6);
    const finStr   = dimanche.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
    const sheet    = this._container.querySelector('#cal-sheet');
    const overlay  = this._overlay;

    sheet.innerHTML = `
    <div style="font-family:var(--font-display);font-size:1.2rem;font-weight:600;margin-bottom:12px">Valider une semaine</div>

    <!-- Navigation semaine -->
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px">
      <button type="button" id="sem-prev" class="m6-btn m6-btn-ghost" style="padding:8px 12px;font-size:1rem;flex-shrink:0">‹</button>
      <div style="flex:1;text-align:center;font-size:0.82rem;font-weight:600;color:var(--charbon)">
        ${lundiStr} → ${finStr}
      </div>
      <button type="button" id="sem-next" class="m6-btn m6-btn-ghost" style="padding:8px 12px;font-size:1rem;flex-shrink:0">›</button>
    </div>
    <div class="m6-field" style="margin-bottom:12px">
      <label style="font-size:0.7rem">Ou choisir une date dans la semaine voulue</label>
      <input type="date" id="sem-date-nav" value="${this._semaineRef}" style="font-size:16px">
    </div>

    <!-- Sélection des jours — tous les 7, cochables/décochables -->
    <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.07em;color:var(--pierre);margin-bottom:8px">
      Jours à valider <small style="font-size:0.6rem;text-transform:none;font-weight:400">(décochez les jours non travaillés)</small>
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:14px" id="sem-jours-grid">
      ${tousjours.map(({dk,isWE,isFerie,label})=>{
        const defChecked = !isWE && !isFerie; // cochés par défaut : jours ouvrés
        const bg = isWE ? 'rgba(90,80,70,0.08)' : isFerie ? 'rgba(196,133,58,0.08)' : 'rgba(45,107,79,0.08)';
        const bdr = isWE ? '#B5AFA6' : isFerie ? '#C4853A' : '#2D6A4F';
        return `<label style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;
                              background:${bg};border:2px solid ${defChecked?bdr:'var(--ivoire-3)'};
                              border-radius:8px;padding:6px 2px;font-size:0.62rem;text-align:center;
                              color:${defChecked?'var(--charbon)':'var(--pierre)'};transition:all 0.15s"
                      data-dk="${dk}">
          <input type="checkbox" name="sem-jour" value="${dk}" ${defChecked?'checked':''} style="width:16px;height:16px;accent-color:#2D6A4F;margin:0">
          <span>${label}${isFerie?' 🎉':''}${isWE&&!isFerie?' 🏖':''}</span>
        </label>`;
      }).join('')}
    </div>

    <div class="m6-field"><label>Type pour les jours cochés</label>
      <select id="sem-type" style="font-size:14px">
        ${Object.entries(TYPE_CONFIG).map(([t,c])=>`<option value="${t}">${c.label}</option>`).join('')}
      </select></div>

    <div style="font-size:0.68rem;text-transform:uppercase;letter-spacing:0.07em;color:var(--pierre);margin-bottom:6px">
      Niveau de charge <span style="color:var(--alerte);font-size:0.6rem">* requis</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px">
      ${Object.entries(MOOD_COLORS).map(([niv,c])=>`
        <div class="sem-mood" data-mood="${niv}"
          style="border:2px solid var(--ivoire-3);background:var(--ivoire);color:var(--pierre);
                 border-radius:8px;padding:8px 4px;text-align:center;cursor:pointer;font-size:0.65rem">
          <div style="font-size:1.1rem">${c.icon}</div>${c.label}
        </div>`).join('')}
    </div>
    <div id="sem-mood-warn" style="display:none" class="m6-alert danger" style="margin-bottom:8px;font-size:0.78rem">
      <span>⚠️</span><div>Sélectionnez le niveau de charge.</div>
    </div>

    <!-- Modifier un jour spécifique -->
    <div style="margin-bottom:10px">
      <div style="font-size:0.7rem;color:var(--pierre);margin-bottom:6px">Modifier un jour individuellement :</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${tousjours.map(({dk,label})=>`<button onclick="M6_Calendar._closePopup();setTimeout(()=>M6_Calendar._openPopup('${dk}'),200)"
          style="font-size:0.7rem;background:var(--ivoire);border:1px solid var(--ivoire-3);border-radius:6px;padding:4px 10px;cursor:pointer">
          ${label}
        </button>`).join('')}
    </div>

    <button class="m6-btn m6-btn-primary" id="sem-save">Valider</button>
    <div style="height:8px"></div>
    <button class="m6-btn m6-btn-ghost" id="sem-cancel" style="width:100%;font-size:0.8rem">Annuler</button>
    `;

    let selMood = null;
    sheet.querySelectorAll('.sem-mood').forEach(p => {
      p.addEventListener('click', () => {
        sheet.querySelectorAll('.sem-mood').forEach(x => {
          x.style.borderColor='var(--ivoire-3)'; x.style.background='var(--ivoire)'; x.style.color='var(--pierre)';
        });
        selMood = p.dataset.mood;
        const c = MOOD_COLORS[selMood];
        p.style.borderColor=c.border; p.style.background=c.bg; p.style.color=c.text;
        sheet.querySelector('#sem-mood-warn')?.style.setProperty('display','none');
      });
    });

    sheet.querySelector('#sem-save')?.addEventListener('click', () => {
      if (!selMood) { sheet.querySelector('#sem-mood-warn')?.style.setProperty('display','flex'); return; }
      const type = sheet.querySelector('#sem-type')?.value || 'travail';
      // Lire les jours cochés depuis la grille des 7 jours
      const cochés = [...sheet.querySelectorAll('input[name="sem-jour"]:checked')].map(cb => cb.value);
      if (!cochés.length) { M6_toast('Cochez au moins un jour'); return; }
      let modifiés = 0;
      cochés.forEach(dk => {
        const existing = this._data[dk];
        if (existing && existing.type !== type) modifiés++;
        if (this._onSave) this._onSave(dk, { type }, { niveau: selMood });
      });
      this._closePopup();
      M6_toast(`✓ ${cochés.length} jour${cochés.length>1?'s':''} validé${cochés.length>1?'s':''}${modifiés?` (${modifiés} modifié${modifiés>1?'s':''})`:''}`);
    });

    sheet.querySelector('#sem-cancel')?.addEventListener('click', () => this._closePopup());

    // Navigation semaine — réouvre le panneau sur une autre semaine
    sheet.querySelector('#sem-prev')?.addEventListener('click', () => {
      const d = new Date(this._semaineRef + 'T12:00:00'); d.setDate(d.getDate()-7);
      this._openSemaineQuick(d.toISOString().slice(0,10));
    });
    sheet.querySelector('#sem-next')?.addEventListener('click', () => {
      const d = new Date(this._semaineRef + 'T12:00:00'); d.setDate(d.getDate()+7);
      this._openSemaineQuick(d.toISOString().slice(0,10));
    });
    sheet.querySelector('#sem-date-nav')?.addEventListener('change', e => {
      if (e.target.value) this._openSemaineQuick(e.target.value);
    });

    overlay?.addEventListener('click', e => { if(e.target===overlay) this._closePopup(); });
    requestAnimationFrame(() => overlay?.classList.add('open'));
  },

  // ── Navigation ────────────────────────────────────────────────
  _updateMonth() {
    const cur = this._container.querySelector('#cal-cur');
    const lb  = this._container.querySelector('#cal-mlabel');
    if (cur) cur.innerHTML = this._buildMonth(this._viewMonth, this._viewYear);
    if (lb)  lb.textContent = `${this._mName(this._viewMonth)} ${this._viewYear}`;
  },

  _prevMonth() {
    if (this._viewMonth > 0) { this._viewMonth--; }
    else { this._viewMonth = 11; this._viewYear--; }
    this._currentMonth = this._viewMonth;
    this._updateMonth();
  },

  _nextMonth() {
    if (this._viewMonth < 11) { this._viewMonth++; }
    else { this._viewMonth = 0; this._viewYear++; }
    this._currentMonth = this._viewMonth;
    this._updateMonth();
  },

  _bindSwipe() {
    const el = this._container.querySelector('#cal-cur');
    if (!el) return;
    el.addEventListener('touchstart', e => { this._swipeStartX = e.touches[0].clientX; }, {passive:true});
    el.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - this._swipeStartX;
      if (Math.abs(dx) < 50) return;
      if (dx < 0) this._nextMonth(); else this._prevMonth();
    }, {passive:true});
  },

  _bindEvents() {
    this._container.querySelector('#cal-prev')?.addEventListener('click', () => this._prevMonth());
    this._container.querySelector('#cal-next')?.addEventListener('click', () => this._nextMonth());
    this._container.querySelector('#cal-btn-sem')?.addEventListener('click', () => this._openSemaineQuick());
    this._container.querySelector('#cal-btn-yr')?.addEventListener('click', () => {
      this._container.querySelector('#cal-yr-overlay')?.classList.add('open');
    });
    this._container.querySelector('#cal-yr-close')?.addEventListener('click', () => {
      this._container.querySelector('#cal-yr-overlay')?.classList.remove('open');
    });
  },

  _mName(m) { return ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'][m]; },
  _tLabel(t) { return TYPE_CONFIG[t]?.label || '—'; }
};

global.M6_Calendar    = M6_Calendar;
global.M6_TYPE_CONFIG = TYPE_CONFIG;
global.M6_MOOD_COLORS = MOOD_COLORS;

})(window);
