/**
 * VIEW-CADRE-DIRIGEANT — Module complet L3111-2
 * 6 onglets : Bilan · Calendrier · Projets · Santé · Entretien · Export
 *
 * Sources : L3111-2, L3121-65, L4121-1 — Dirigeants non soumis durée légale
 * mais conservent : CP, protection santé, entretien charge de travail si >218j engagement contractuel
 */
'use strict';

(function(global) {

const REGIME = 'cadre_dirigeant';
const MOIS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

const VCD = {
  _c: null, _year: new Date().getFullYear(), _section: 'bilan',
  _contract: null, _data: {}, _moods: {}, _projets: [],

  init(container) {
    this._c = container;
    this._year = M6_Storage.getActiveYear(REGIME);
    this._load(); this.render();
  },

  _load() {
    this._contract = M6_Storage.getContract(REGIME);
    this._data     = M6_Storage.getData(REGIME, this._year);
    this._moods    = M6_Storage.getMoods(REGIME, this._year);
    try {
      const raw = JSON.parse(localStorage.getItem('M6_CD_PROJETS') || '[]');
      // Migration : anciens projets sans id/heuresPrevu → on enrichit
      this._projets = raw.map(p => ({
        id:         p.id         || 'proj_' + Math.random().toString(36).slice(2,9),
        nom:        p.nom        || 'Projet sans nom',
        categorie:  p.categorie  || 'Strategie',
        heuresPrevu:p.heuresPrevu|| p.heures || 0,
        statut:     p.statut     || 'en_cours',
        priorite:   p.priorite   || 'moyenne',
        dateDebut:  p.dateDebut  || null,
        dateFin:    p.dateFin    || null,
        couleur:    p.couleur    || '#C4853A',
        note:       p.note       || '',
        jalons:     p.jalons     || [],
      }));
    } catch { this._projets = []; }
  },
  _saveData()     { M6_Storage.setData(REGIME, this._year, this._data); },
  _saveProjets()  { localStorage.setItem('M6_CD_PROJETS', JSON.stringify(this._projets)); },
  _saveContract() { M6_Storage.setContract(REGIME, this._contract); },

  // ── Stats de base ──────────────────────────────────────────────
  _calcStats() {
    const feries = M6_Feries.getSet(this._year);
    const cpTotal = this._contract?.joursCPContrat || 25;
    let jTravailles=0, cpPris=0, rttPris=0, jAbsence=0, deplacements=0, demis=0;
    const amplitudesLong = [];

    for(const [dk, v] of Object.entries(this._data)) {
      if(!dk.startsWith(String(this._year))) continue;
      const t = v.type || 'travail';
      const dow = new Date(dk+'T12:00:00').getDay();
      if(t==='cp') { if(dow!==0&&dow!==6&&!feries.has(dk)) cpPris++; continue; }
      if(t==='rtt')    { rttPris++; continue; }
      if(t==='repos')  continue;
      if(t==='demi')   { jTravailles+=0.5; demis++; }
      else if(t==='travail') jTravailles++;
      if(v.deplacement) deplacements++;
      if(v.debut&&v.fin) {
        const amp=(new Date(`${dk}T${v.fin}:00`)-new Date(`${dk}T${v.debut}:00`))/3600000;
        if(amp>=11) amplitudesLong.push({dk,amp});
      }
    }

    // Projets : total heures déclarées
    const hProjets = this._projets.reduce((s,p) => s + (p.heures||0), 0);
    const cpSolde  = cpTotal - cpPris;

    return { jTravailles, cpPris, cpTotal, cpSolde, rttPris, deplacements, demis,
             amplitudesLong, hProjets };
  },

  // ── RENDER ─────────────────────────────────────────────────────
  render() {
    if (!this._contract) { this._c.innerHTML = this._tplSetup(); this._bindSetup(); return; }
    const stats = this._calcStats();
    const bio   = M6_BioEngine.analyzeForfaitJours(
      { plafond:218, joursCPContrat:this._contract.joursCPContrat||25,
        entretienDate:this._contract.entretienDate },
      this._data, this._year, REGIME
    );
    if (bio?.hasData && window.M6_PhaseAlert) M6_PhaseAlert.showIfNeeded(REGIME, this._year, bio.phase?.code, bio.fatigue);

    const yrsCD = M6_Storage.getAllYears(REGIME);
    const yrPickerCD = yrsCD.length > 1
      ? `<select id="cd-yr-hdr" style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:var(--champagne);font-size:0.7rem;border-radius:6px;padding:2px 6px;-webkit-appearance:none">${yrsCD.map(y=>`<option value="${y}" ${y==this._year?'selected':''}>${y}</option>`).join('')}</select>`
      : '';
    window.M6_Header?.set({
      title: `${this._contract.fonction||'Cadre Dirigeant'} ${this._year}`,
      sub: `${this._contract.entreprise||'L3111-2'} · CP: ${stats.cpSolde}j restants`,
      showReset: true,
      showSwitch: true,
      onReset: () => {
        // NE PAS effacer le contrat — ouvrir le wizard pré-rempli pour modification
        this._c.innerHTML = this._tplSetup();
        this._bindSetup();
      },
      yearPicker: yrPickerCD,
    });

    // Zenji
    const zenjiMsg = window.M6_Zenji
      ? M6_Zenji.getContextMessage('bilan',
          {joursEffectifs:stats.jTravailles,plafond:218,rttPris:stats.rttPris,rttSolde:0,rachetes:0,cpPris:stats.cpPris,alertes:[]},
          bio, this._contract)
      : '';

    this._c.innerHTML = `${this._tplNav()}<div class="m6-main m6-fade-in" id="cd-ct" style="padding-top:8px"></div>`;
    const ct = this._c.querySelector('#cd-ct');
    const zenjiHtml = zenjiMsg ? M6_Zenji.renderCard(zenjiMsg, bio?.phase?.code||'P1', true) : '';

    try {
    switch(this._section) {
      case 'bilan':     ct.innerHTML = zenjiHtml + this._tplBilan(stats,bio); this._bindBilan(); break;
      case 'calendrier':this._renderCal(ct); break;
      case 'projets':   ct.innerHTML = zenjiHtml + this._tplProjets(); this._bindProjets(); break;
      case 'sante':     ct.innerHTML = zenjiHtml + this._tplSante(bio,stats); break;
      case 'entretien': ct.innerHTML = zenjiHtml;
        if (window.M6_Entretien) {
          M6_Entretien.renderForm(ct, REGIME, this._year, this._contract,
            {joursEffectifs:stats.jTravailles,plafond:218,rttPris:stats.rttPris,alertes:[]},
            ()=>{this._load();this.render();});
        } else {
          ct.innerHTML += '<div class="m6-alert info" style="margin:16px"><span>ℹ️</span><div>Module entretien non chargé.</div></div>';
        }
        break;
      case 'export':    ct.innerHTML = zenjiHtml + this._tplExport(stats,bio); this._bindExport(stats,bio); break;
      case 'tendances':
        ct.innerHTML = '<div style="padding:4px 0"></div>';
        if (window.M6_Charts) {
          ct.innerHTML += M6_Charts.renderSection({ plafond:218, plafondProrata:218 }, bio, this._data, this._contract, this._year);
          requestAnimationFrame(() => M6_Charts.drawForfaitEvolution('m6-forfait-chart', this._data, { plafond:218 }, this._year));
        } else {
          ct.innerHTML += '<div class="m6-alert info" style="margin:16px"><span>ℹ️</span><div>Module graphiques non chargé.</div></div>';
        }
        break;
      case 'validite':
        ct.innerHTML = zenjiHtml + '<div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">⚖ Validité du statut Cadre Dirigeant</div><div class="m6-ornement-line"></div></div><div id="cd-validite-ct"></div>';
        if (window.M6_ValiditeCD) {
          window.M6_ValiditeCD.render(ct.querySelector('#cd-validite-ct'), this._contract, this._year);
        } else {
          ct.innerHTML += '<div class="m6-alert info" style="margin:16px"><span>ℹ️</span><div>Module Validité non chargé.</div></div>';
        }
        break;
      case 'glossaire':
        ct.innerHTML = zenjiHtml;
        if (window.M6_GlossaireUI) {
          M6_GlossaireUI.render(ct, 'cadre_dirigeant');
        } else {
          ct.innerHTML += '<div class="m6-alert info" style="margin:16px"><span>ℹ️</span><div>Module glossaire non chargé.</div></div>';
        }
        break;
    }
    } catch(e) {
      console.error('[VCD render]', e);
    }
    this._bindNav();
    // Coach contextuel — nettoyer l'ancien popup avant d'en injecter un nouveau
    if (window.M6_ZenjiPopup) M6_ZenjiPopup.destroy();
    // Popup Zenji flottant
    if (window.M6_ZenjiPopup) {
      M6_ZenjiPopup.init(
        { joursEffectifs:stats.jTravailles, plafond:218,
          rttPris:stats.rttPris||0, rttSolde:0, rachetes:0,
          cpPris:stats.cpPris, tauxRemplissage:0, alertes:[],
          rttTheoriques:0, joursRestants:0 },
        bio, this._contract,
        (action) => {
          if(action.includes('Santé')||action.includes('santé')) { this._section='sante'; this.render(); }
          else if(action.includes('Entretien')||action.includes('entretien')) { this._section='entretien'; this.render(); }
          else if(action.includes('Export')||action.includes('PDF')) { this._section='export'; this.render(); }
          else if(action.includes('Agenda')||action.includes('calendrier')) { this._section='calendrier'; this.render(); }
        },
        'cadre_dirigeant'
      );
    }
    if(window.M6_AlertePhase && bio?.hasData) M6_AlertePhase.check(bio, 'cadre_dirigeant');
  },

  // ── HEADER ─────────────────────────────────────────────────────
  _tplHeader(s) {
    const pct = Math.min(100, Math.round(s.cpPris/Math.max(1,s.cpTotal)*100));
    return `<div style="background:var(--charbon);padding:10px 16px;padding-top:calc(10px + env(safe-area-inset-top,0));position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(196,163,90,0.25)">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <img src="../module6/images/Cadre.png" alt="Zenji" style="width:32px;height:32px;object-fit:cover;object-position:top center;border-radius:50%;border:2px solid var(--champagne);flex-shrink:0">
        <div style="flex:1">
          <div style="font-family:var(--font-display);font-size:1rem;font-weight:600;color:var(--ivoire)">Cadre Dirigeant ${this._year}</div>
          <div style="font-size:0.62rem;color:var(--champagne);letter-spacing:0.06em;text-transform:uppercase">${this._contract.fonction||'L3111-2'} · ${this._contract.entreprise||''}</div>
        </div>
        ${this._tplYrPicker()}
        <a href="../menu.html" style="color:var(--pierre);font-size:0.7rem;text-decoration:none;border:1px solid rgba(255,255,255,0.12);padding:4px 8px;border-radius:6px">← Menu</a>
      </div>
      <div style="display:flex;gap:12px;font-size:0.68rem;color:var(--pierre)">
        <span>📅 <strong style="color:var(--ivoire)">${s.jTravailles}</strong>j travaillés</span>
        <span>✈️ <strong style="color:${s.cpSolde<=5?'var(--alerte)':'var(--champagne)'}">${s.cpSolde}</strong>j CP restants</span>
        <span>💼 <strong style="color:var(--ivoire)">${s.deplacements}</strong> déplacements</span>
      </div>
    </div>`;
  },

  _tplYrPicker() {
    const yrs = M6_Storage.getAllYears(REGIME);
    const opts = yrs.map(y=>`<option value="${y}" ${y==this._year?'selected':''}>${y}</option>`).join('');
    // Toujours afficher ‹ année › pour naviguer/créer N-1 et N+1 facilement
    return `<span style="display:inline-flex;align-items:center;gap:3px">
      <button id="cd-yr-prev" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:var(--champagne);font-size:0.85rem;border-radius:6px;padding:1px 7px;cursor:pointer;line-height:1.2">‹</button>
      ${yrs.length>1
        ? `<select id="cd-yr" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:var(--ivoire);font-size:0.72rem;border-radius:6px;padding:3px 6px;-webkit-appearance:none">${opts}</select>`
        : `<span style="font-size:0.72rem;color:var(--champagne);min-width:34px;text-align:center;display:inline-block">${this._year}</span>`}
      <button id="cd-yr-next" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:var(--champagne);font-size:0.85rem;border-radius:6px;padding:1px 7px;cursor:pointer;line-height:1.2">›</button>
    </span>`;
  },

  _tplNav() {
    const mk = (id, icon, label) =>
      `<button class="m6-nav-item ${this._section===id?'active':''}" data-sec="${id}">
        <span class="nav-icon">${icon}</span>${label}
      </button>`;
    return `<nav class="m6-bottom-nav">
      ${mk('bilan',     '◈', 'Bilan')}
      ${mk('calendrier','◻', 'Agenda')}
      ${mk('projets',   '◐', 'Projets')}
      ${mk('sante',     '♡', 'Santé')}
      <div class="m6-nav-row-sep"></div>
      ${mk('tendances', '◗', 'Tendances')}
      ${mk('validite',  '⚖', 'Validité')}
      ${mk('entretien', '◉', 'Entretien')}
      ${mk('export',    '◆', 'Export')}
    </nav>`;
  },

  _bindNav() {
    this._c.querySelectorAll('[data-sec]').forEach(b => { b.onclick = () => { this._section = b.dataset.sec; this.render(); }; });
    const yp=this._c.querySelector('#cd-yr');
    if(yp) yp.addEventListener('change',()=>{this._year=parseInt(yp.value);M6_Storage.setActiveYear(REGIME, this._year);this._load();this.render();});
    const _goYear = (yr) => {
      const exist = M6_Storage.getAllYears(REGIME);
      if (!exist.includes(yr)) M6_Storage.createYear(REGIME, yr);
      this._year = yr; M6_Storage.setActiveYear(REGIME, yr); this._load(); this.render();
    };
    this._c.querySelector('#cd-yr-prev')?.addEventListener('click',()=>_goYear(this._year-1));
    this._c.querySelector('#cd-yr-next')?.addEventListener('click',()=>_goYear(this._year+1));
  },

  // ── BILAN ──────────────────────────────────────────────────────
  _tplBilan(s, bio) {
    return `
    <!-- QUICK ACTIONS -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">
      <button class="m6-quick-action" data-quick="calendrier" style="background:#1A1714;color:#F7F3ED;border:none;border-radius:10px;padding:14px 6px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center">
        <span style="font-size:1.4rem">📅</span>
        <span style="font-size:0.7rem;font-weight:500;line-height:1.2">Saisir<br>aujourd'hui</span>
      </button>
      <button class="m6-quick-action" data-quick="projets" style="background:#C4A35A;color:#1A1714;border:none;border-radius:10px;padding:14px 6px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center">
        <span style="font-size:1.4rem">◐</span>
        <span style="font-size:0.7rem;font-weight:600;line-height:1.2">Mes<br>projets</span>
      </button>
      <button class="m6-quick-action" data-quick="export" style="background:#F7F3ED;color:#1A1714;border:1px solid #E2DAD0;border-radius:10px;padding:14px 6px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center">
        <span style="font-size:1.4rem">◆</span>
        <span style="font-size:0.7rem;font-weight:500;line-height:1.2">Exporter<br>PDF</span>
      </button>
    </div>

    <div class="m6-alert info" style="margin-bottom:14px;font-size:0.78rem">
      <span>⚖️</span><div><strong>Régime Cadre Dirigeant (L3111-2)</strong> — Pas de compteur d'heures légal. Autonomie totale sur l'organisation du temps. Obligations : CP, protection santé, entretien de charge si engagement contractuel.</div>
    </div>

    ${s.jTravailles > 218 ? `<div class="m6-alert warning" style="margin-bottom:14px"><span class="m6-alert-icon">🚨</span><div><strong>${s.jTravailles} jours dépassent le plafond de référence de 218j</strong><br><span style="font-size:0.77rem">Même en régime Cadre Dirigeant, dépasser 218 jours de présence annuelle peut indiquer un déséquilibre vie pro/perso et signale un risque sur le plan de la santé au travail (Art. L4121-1). L'entretien de charge de travail est recommandé.</span></div></div>` : ''}

    <!-- Analytics projets -->
    ${this._projets.length ? (() => {
      const hTotal = this._projets.reduce((s,p)=>s+(p.heures||0),0);
      return `<div class="m6-card" style="margin-bottom:14px"><div class="m6-card-header"><div class="m6-card-icon">📊</div><div><div class="m6-card-label">Analytics</div><div class="m6-card-title">Ventilation du temps par projet</div></div></div><div class="m6-card-body">${this._projets.map(p=>{const pct=hTotal>0?Math.round((p.heures||0)/hTotal*100):0;return `<div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:3px"><span>${p.nom}</span><span style="color:var(--champagne-2);font-weight:500">${pct}% · ${p.heures||0}h</span></div><div style="height:6px;background:var(--ivoire-2);border-radius:99px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${p.couleur||'var(--champagne)'};border-radius:99px"></div></div></div>`;}).join('')}<div style="font-size:0.68rem;color:var(--pierre);margin-top:6px">Total : ${hTotal}h sur ${this._projets.length} projet(s)</div></div></div>`;
    })() : ''}
    <div class="m6-card" style="margin-bottom:14px">
      <div class="m6-card-header"><div class="m6-card-icon">✈️</div>
        <div><div class="m6-card-label">Congés Payés ${this._year}</div><div class="m6-card-title">Solde CP</div></div>
        <span class="m6-badge ${s.cpSolde<=5?'m6-badge-danger':'m6-badge-ok'}" style="margin-left:auto">${s.cpSolde}j restants</span>
      </div>
      <div class="m6-card-body">
        <div class="m6-progress-wrap" style="margin-bottom:8px">
          <div class="m6-progress-bar ${s.cpPris>=s.cpTotal?'ok':''}" style="width:${Math.min(100,s.cpPris/s.cpTotal*100)}%"></div>
        </div>
        <div class="m6-stats-grid">
          <div class="m6-stat-box"><div class="m6-stat-val">${s.cpTotal}</div><div class="m6-stat-label">CP contractuels</div></div>
          <div class="m6-stat-box"><div class="m6-stat-val">${s.cpPris}</div><div class="m6-stat-label">CP pris</div></div>
          <div class="m6-stat-box" style="border-color:${s.cpSolde<=5?'var(--alerte)':'rgba(196,163,90,0.35)'}">
            <div class="m6-stat-val" style="color:${s.cpSolde<=5?'var(--alerte)':'var(--champagne-2)'}">${s.cpSolde}</div>
            <div class="m6-stat-label">Solde CP</div>
          </div>
          <div class="m6-stat-box"><div class="m6-stat-val">${s.deplacements}</div><div class="m6-stat-label">Déplacements</div></div>
        </div>
      </div>
    </div>

    <!-- Activité -->
    <div class="m6-card" style="margin-bottom:14px">
      <div class="m6-card-header"><div class="m6-card-icon">📊</div>
        <div><div class="m6-card-label">Activité</div><div class="m6-card-title">Bilan de présence ${this._year}</div></div>
      </div>
      <div class="m6-card-body">
        ${[['Jours de présence',s.jTravailles,''],['dont demi-journées',s.demis,'× 0.5j'],['Déplacements professionnels',s.deplacements,''],['Amplitudes >11h',s.amplitudesLong.length,'(Hakola 2001)']].map(([l,v,h])=>`<div class="m6-row"><span class="m6-row-label">${l}</span><span class="m6-row-val">${v} <small style="color:var(--pierre)">${h}</small></span></div>`).join('')}
      </div>
    </div>

    <!-- Mini-bio -->
    ${bio.hasData?`<div class="m6-card" style="margin-bottom:14px;cursor:pointer" id="cd-bio-card">
      <div class="m6-card-body" style="padding:12px 14px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div class="m6-card-label">Santé — Phase ${bio.phase?.code}</div>
          <span class="m6-badge" style="background:${bio.phase?.color}20;color:${bio.phase?.color};border-radius:99px;font-size:0.65rem;padding:2px 8px">${bio.phase?.label}</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;text-align:center">
          ${[['Fatigue',bio.fatigue,true],['Stress',bio.stress,true],['Récup.',bio.recovery,false],['Perf.',bio.performance,false]].map(([l,v,inv])=>{const c=inv?(v>60?'#B85C50':v>35?'#C4853A':'#4A7C6F'):(v<40?'#B85C50':v<65?'#C4853A':'#4A7C6F');return `<div style="background:var(--ivoire);border-radius:8px;padding:8px 4px"><div style="font-family:var(--font-display);font-size:1.3rem;font-weight:700;color:${c}">${v}</div><div style="font-size:0.6rem;color:var(--pierre)">${l}</div></div>`;}).join('')}
        </div>
      </div>
    </div>`:''}

    <!-- Droits maintenus -->
    <div class="m6-card" style="margin-bottom:14px">
      <div class="m6-card-header"><div class="m6-card-icon">📋</div>
        <div><div class="m6-card-label">Protections légales</div><div class="m6-card-title">Droits maintenus (L3111-2)</div></div>
      </div>
      <div class="m6-card-body">
        ${[['Congés payés','25j ouvrables min (L3141-1)','✅'],['Protection licenciement','Régime commun','✅'],['Maternité / Paternité','Protection complète','✅'],['Médecine du travail','VIP obligatoire','✅'],['Entretien de charge','Si engagement contractuel','✅'],['Durée légale 35h','Non applicable','—'],['Heures supplémentaires','Non applicable','—'],['Repos légaux','Recommandés, non imposés','—']].map(([l,d,ico])=>`<div class="m6-row" style="align-items:flex-start;padding:7px 0"><div><div style="font-size:0.8rem;font-weight:500">${l}</div><div style="font-size:0.7rem;color:var(--pierre)">${d}</div></div><span style="font-size:0.9rem;margin-left:auto;flex-shrink:0">${ico}</span></div>`).join('')}
      </div>
    </div>

    <!-- Alertes amplitude -->
    ${s.amplitudesLong.length>5?`<div class="m6-alert warning" style="margin-bottom:14px"><span>⏰</span><div><strong>${s.amplitudesLong.length} journées longues (>11h)</strong><br><span style="font-size:0.77rem">Même sans obligation légale, Hakola & Härmä 2001 documentent la perturbation circadienne. Préservez votre performance sur la durée.</span></div></div>`:''}

    <button class="m6-btn m6-btn-primary" id="cd-saisir" style="margin-bottom:8px">+ Saisir une journée</button>
    <div style="display:flex;gap:8px">
      <button class="m6-btn m6-btn-ghost" id="cd-newyr" style="flex:1;font-size:0.78rem">📅 Nouvel exercice</button>
      <button class="m6-btn m6-btn-ghost" id="cd-reset" style="flex:1;font-size:0.78rem">⚙️ Reconfigurer</button>
    </div><div class="m6-alert info" style="margin-top:16px;font-size:0.72rem"><span>&#9878;&#65039;</span><div><strong>Information juridique.</strong> Outil indicatif et pedagogique &mdash; ni avis juridique ni valeur legale. Le statut de cadre dirigeant est strictement encadre : il suppose de larges responsabilites, une grande autonomie de decision et l une des remunerations les plus elevees de l entreprise (Art. L3111-2). Une qualification abusive peut etre requalifiee par les tribunaux, ouvrant droit au paiement des heures supplementaires. En cas de doute, rapproche-toi des representants du personnel, de l inspection du travail ou d un conseil juridique. Sources : Art. L3111-2 du Code du travail &middot; Legifrance.</div></div>`;
  },

  _bindBilan() {
    // Quick Actions
    this._c.querySelectorAll('[data-quick]').forEach(btn => {
      btn.addEventListener('click', () => {
        this._section = btn.dataset.quick;
        this.render();
      });
    });
    this._c.querySelector('#cd-saisir')?.addEventListener('click',()=>{this._section='calendrier';this.render();});
    this._c.querySelector('#cd-bio-card')?.addEventListener('click',()=>{this._section='sante';this.render();});
    this._c.querySelector('#cd-newyr')?.addEventListener('click',()=>{const y=prompt(`Exercice (ex: ${this._year+1})`,this._year+1);if(!y||isNaN(y))return;const yr=parseInt(y);M6_Storage.createYear(REGIME,yr);this._year=yr;M6_Storage.setActiveYear(REGIME, yr);this._load();this.render();M6_toast(`Exercice ${yr} créé`);});
    this._c.querySelector('#cd-reset')?.addEventListener('click',()=>{
      // Ouvre le wizard pré-rempli — l'utilisateur modifie ce qu'il veut et enregistre, ou annule.
      this._c.innerHTML=this._tplSetup();
      this._bindSetup();
    });
  },

  // ── CALENDRIER ─────────────────────────────────────────────────
  _renderCal(ct) {
    ct.innerHTML = '<div id="cd-cal-root"></div>';
    if(window.M6_Calendar) {
      M6_Calendar.init(ct.querySelector('#cd-cal-root'), REGIME, this._year, this._data, this._moods,
        (dk,v,mood) => {
          if(v===null){delete this._data[dk];this._saveData();}
          else{M6_Storage.setDay(REGIME,this._year,dk,v);if(mood)M6_Storage.setMood(REGIME,this._year,dk,mood);}
          this._load();
          M6_Calendar.refresh?.(this._data,this._moods);
          M6_toast('Enregistré');
        }, this._contract);
    } else {
      ct.innerHTML = '<div class="m6-alert info" style="margin:16px"><span>⚠️</span><div>Module calendrier non chargé.</div></div>';
    }
  },

  // ── PROJETS / MISSIONS ─────────────────────────────────────────
  // Calcule les heures réelles par projet depuis les données calendrier (multi-années)
  _computeProjetStats() {
    const stats = {}; // { projetId: { heuresReelles, jours: [{dk, h}] } }
    const allYears = M6_Storage.getAllYears('cadre_dirigeant');
    for (const yr of allYears) {
      const data = M6_Storage.getData('cadre_dirigeant', yr);
      for (const [dk, v] of Object.entries(data)) {
        if (!v.projetId) continue;
        if (!stats[v.projetId]) stats[v.projetId] = { heuresReelles: 0, jours: [] };
        const h = parseFloat(v.hProjet) || (v.type === 'demi' ? 3.5 : 7);
        stats[v.projetId].heuresReelles += h;
        stats[v.projetId].jours.push({ dk, h });
      }
    }
    return stats;
  },

// PATCH _tplProjets + _bindProjets — injecté directement
// Remplace le bloc entier dans view-cadre-dirigeant.js

  _computeProjetStats() {
    const stats = {};
    const allYears = M6_Storage.getAllYears('cadre_dirigeant');
    for (const yr of allYears) {
      const data = M6_Storage.getData('cadre_dirigeant', yr);
      for (const [dk, v] of Object.entries(data)) {
        if (!v.projetId) continue;
        if (!stats[v.projetId]) stats[v.projetId] = { heuresReelles:0, jours:[] };
        const h = parseFloat(v.hProjet) || (v.type==='demi' ? 3.5 : 7);
        stats[v.projetId].heuresReelles += h;
        stats[v.projetId].jours.push({ dk, h });
      }
    }
    return stats;
  },

  _tplProjets() {
    const stats  = this._computeProjetStats();
    const CATS   = ['Strategie','Innovation','Operationnel','RH Management','Finance','Externe','Transformation'];
    const STATUTS= { a_faire:'A faire', en_cours:'En cours', en_pause:'En pause', termine:'Termine' };
    const SC     = { a_faire:'#6B7280', en_cours:'#1E3A5F', en_pause:'#C4853A', termine:'#2D6A4F' };
    const PC     = { haute:'#B85C50', moyenne:'#C4853A', basse:'#4A7C6F' };

    const actifs  = this._projets.filter(p=>p.statut!=='termine')
                      .sort((a,b)=>(['haute','moyenne','basse'].indexOf(a.priorite)||0)-(['haute','moyenne','basse'].indexOf(b.priorite)||0));
    const termines = this._projets.filter(p=>p.statut==='termine');
    const totalPrev= this._projets.reduce((s,p)=>s+(p.heuresPrevu||0),0);
    const totalReel= Object.values(stats).reduce((s,v)=>s+(v.heuresReelles||0),0);
    const pctGlob  = totalPrev>0 ? Math.min(100,Math.round(totalReel/totalPrev*100)) : 0;
    const MOIS     = ['Jan','Fev','Mar','Avr','Mai','Juin','Juil','Aou','Sep','Oct','Nov','Dec'];

    const fmtDate = (ds) => {
      if (!ds) return '';
      const d = new Date(ds+'T12:00:00');
      return d.getDate()+'/'+(d.getMonth()+1);
    };

    const cardProjet = (p, idx) => {
      const s   = stats[p.id] || { heuresReelles:0, jours:[] };
      const hr  = Math.round(s.heuresReelles*10)/10;
      const hp  = p.heuresPrevu || 0;
      const pct = hp>0 ? Math.min(100,Math.round(hr/hp*100)) : 0;
      const dep = hp>0 && hr>hp;
      const jRest= (p.jalons||[]).filter(j=>!j.fait).length;
      const jTot = (p.jalons||[]).length;
      const sc   = SC[p.statut]||'#6B7280';
      const pc   = PC[p.priorite]||'#C4853A';
      const barColor = dep
        ? 'linear-gradient(90deg,#9B2C2C,#E53E3E)'
        : pct>=80
          ? 'linear-gradient(90deg,var(--champagne-2),var(--champagne))'
          : 'linear-gradient(90deg,'+p.couleur+','+p.couleur+'cc)';

      return `<div class="m6-card" style="margin-bottom:12px;border-left:4px solid ${p.couleur||'var(--champagne)'}">
        <div class="m6-card-body" style="padding:12px 14px">
          <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:8px">
            <div style="flex:1">
              <div style="font-family:var(--font-display);font-size:0.97rem;font-weight:600;color:var(--charbon)">${p.nom}</div>
              <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:3px">
                <span style="font-size:0.6rem;background:${sc}20;color:${sc};border-radius:99px;padding:1px 7px;font-weight:600">${STATUTS[p.statut]||p.statut}</span>
                <span style="font-size:0.6rem;background:${pc}20;color:${pc};border-radius:99px;padding:1px 7px">Prio ${p.priorite}</span>
                <span style="font-size:0.6rem;color:var(--pierre)">${p.categorie||''}</span>
              </div>
            </div>
            <button data-edit-proj="${idx}" style="background:none;border:1px solid var(--ivoire-3);color:var(--pierre);border-radius:6px;padding:3px 7px;cursor:pointer;font-size:0.68rem">✎</button>
            <button data-del-proj="${idx}"  style="background:none;border:none;color:var(--pierre);cursor:pointer;font-size:0.85rem;padding:2px 4px">✕</button>
          </div>
          <div style="margin-bottom:6px">
            <div style="display:flex;justify-content:space-between;font-size:0.72rem;margin-bottom:3px">
              <span style="color:${dep?'var(--alerte)':'var(--pierre)'}">
                ${hr}h${hp>0?' / '+hp+'h budget':''}
              </span>
              <span style="font-weight:600;color:${pct>=100?'var(--succes)':'var(--charbon)'}">${pct}%</span>
            </div>
            <div style="height:8px;background:var(--ivoire-2);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${pct}%;border-radius:99px;background:${barColor};transition:width 0.5s"></div>
            </div>
            ${dep?`<div style="font-size:0.65rem;color:var(--alerte);margin-top:2px">Depassement : +${Math.round((hr-hp)*10)/10}h</div>`:''}
          </div>
          <div style="display:flex;gap:10px;font-size:0.68rem;color:var(--pierre);flex-wrap:wrap;margin-bottom:6px">
            ${p.dateDebut?`<span>📅 ${fmtDate(p.dateDebut)}</span>`:''}
            ${p.dateFin?`<span>🏁 ${fmtDate(p.dateFin)}</span>`:''}
            ${jTot>0?`<span>◉ ${jRest}/${jTot} jalons</span>`:''}
            ${s.jours.length>0?`<span>⏱ Dernier : ${fmtDate(s.jours[s.jours.length-1].dk)}</span>`:'<span style="color:var(--alerte)">Aucune imputation</span>'}
          </div>
          ${(p.jalons||[]).length>0?`<div style="padding-top:6px;border-top:var(--grey-line)">${p.jalons.map((j,ji)=>`<div style="display:flex;align-items:center;gap:7px;font-size:0.71rem;padding:2px 0"><span style="color:${j.fait?'var(--succes)':'var(--pierre)'}">${j.fait?'✓':'○'}</span><span style="color:${j.fait?'var(--succes)':'var(--charbon)'};text-decoration:${j.fait?'line-through':'none'}">${j.titre}</span><span style="color:var(--pierre);margin-left:auto">${fmtDate(j.date)}</span><button data-toggle-jalon="${idx}-${ji}" style="background:none;border:none;cursor:pointer;color:var(--pierre);font-size:0.68rem">${j.fait?'↩':'✓'}</button></div>`).join('')}</div>`:''}
          ${p.note?`<div style="font-size:0.68rem;color:var(--pierre);margin-top:6px;font-style:italic;padding-top:4px;border-top:var(--grey-line)">${p.note}</div>`:''}
          <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:8px;padding-top:6px;border-top:var(--grey-line)">
            ${Object.entries(STATUTS).map(([k,v])=>`<button data-statut-proj="${idx}" data-statut="${k}"
              style="font-size:0.62rem;padding:2px 7px;border-radius:99px;border:1px solid ${p.statut===k?SC[k]:'var(--ivoire-3)'};
                     background:${p.statut===k?SC[k]+'20':'transparent'};color:${p.statut===k?SC[k]:'var(--pierre)'};cursor:pointer">${v}</button>`).join('')}
            <button data-pdf-proj="${idx}" style="font-size:0.62rem;padding:2px 9px;border-radius:99px;border:1px solid var(--champagne);background:transparent;color:var(--champagne-2);cursor:pointer;margin-left:auto">📄 PDF</button>
          </div>
        </div>
      </div>`;
    };

    return `
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Feuille de route</div><div class="m6-ornement-line"></div></div>

    ${this._projets.length>0?`<div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body" style="padding:12px 14px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px">
        <div style="font-size:0.78rem;color:var(--charbon);font-weight:500">Avancement global — ${this._projets.length} projet(s)</div>
        <span class="m6-badge m6-badge-champagne">${pctGlob}%</span>
      </div>
      <div class="m6-progress-wrap"><div class="m6-progress-bar ${pctGlob>=100?'ok':''}" style="width:${pctGlob}%"></div></div>
      <div style="font-size:0.68rem;color:var(--pierre);margin-top:4px">Budget : ${totalPrev}h</div>
    </div>
    <div style="margin-top:8px;padding-top:8px;border-top:var(--grey-line);display:flex;gap:6px">
      <button id="p-export-pdf" class="m6-btn m6-btn-ghost" style="font-size:0.74rem;flex:1">📄 PDF Feuille de route</button>
    </div>
  </div></div>`:''}

    ${actifs.map((p,i) => cardProjet(p, this._projets.indexOf(p))).join('')}

    ${termines.length>0?`<div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Termines (${termines.length})</div><div class="m6-ornement-line"></div></div>
    ${termines.map(p=>{const idx=this._projets.indexOf(p);const s=stats[p.id]||{heuresReelles:0};return `<div class="m6-card" style="margin-bottom:8px;opacity:0.7"><div class="m6-card-body" style="padding:10px 14px"><div style="display:flex;align-items:center;gap:8px"><span>✅</span><div style="flex:1"><div style="font-size:0.82rem;font-weight:500;text-decoration:line-through">${p.nom}</div><div style="font-size:0.68rem;color:var(--pierre)">${Math.round(s.heuresReelles*10)/10}h / ${p.heuresPrevu||0}h</div></div><button data-statut-proj="${idx}" data-statut="en_cours" style="font-size:0.65rem;padding:2px 8px;border:1px solid var(--grey-line);border-radius:6px;background:none;cursor:pointer">Rouvrir</button></div></div></div>`;}).join('')}`:''}

    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Nouveau projet</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body">
      <div class="m6-field"><label>Nom du projet</label><input type="text" id="p-nom" placeholder="ex : Transformation digitale 2026" style="font-size:16px"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div class="m6-field"><label>Domaine</label><select id="p-cat" style="font-size:14px">${CATS.map(c=>`<option>${c}</option>`).join('')}</select></div>
        <div class="m6-field"><label>Priorite</label><select id="p-prio" style="font-size:14px"><option value="haute">Haute</option><option value="moyenne" selected>Moyenne</option><option value="basse">Basse</option></select></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div class="m6-field"><label>Budget (heures)</label><input type="number" id="p-prev" min="0" step="0.5" placeholder="ex : 80" style="font-size:16px"></div>
        <div class="m6-field"><label>Couleur</label><input type="color" id="p-col" value="#C4853A" style="height:42px;width:100%;padding:4px;border:1px solid var(--ivoire-3);border-radius:8px"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div class="m6-field"><label>Date debut</label><input type="date" id="p-d1" style="font-size:14px"></div>
        <div class="m6-field"><label>Date fin</label><input type="date" id="p-d2" style="font-size:14px"></div>
      </div>
      <div class="m6-field"><label>Note / Objectif</label><input type="text" id="p-note" placeholder="KPIs, contexte…" style="font-size:14px"></div>
      <div class="m6-field">
        <label>Ajouter un jalon (optionnel)</label>
        <div style="display:flex;gap:6px">
          <input type="text" id="p-jal-nom" placeholder="ex : Kick-off" style="font-size:14px;flex:1">
          <input type="date" id="p-jal-date" style="font-size:14px;width:130px">
          <button id="p-jal-add" style="background:var(--champagne);border:none;border-radius:8px;padding:0 12px;cursor:pointer;color:var(--charbon);font-weight:600;font-size:0.9rem">+</button>
        </div>
        <div id="p-jalons-list" style="margin-top:6px"></div>
      </div>
      <button class="m6-btn m6-btn-gold" id="p-add">Ajouter ce projet</button>
    </div></div>`;
  },

  _bindProjets() {
    let tmpJalons = [];
    const jalList = this._c.querySelector('#p-jalons-list');

    // PDF feuille de route complète
    this._c.querySelector('#p-export-pdf')?.addEventListener('click', () => {
      if (!window.M6_PDF?.exportProjets) { M6_toast?.('Module PDF non chargé'); return; }
      M6_PDF.exportProjets({ year:this._year, contract:this._contract, projets:this._projets, stats:this._computeProjetStats() });
    });

    // PDF par projet (bouton 📄 PDF sur chaque carte)
    this._c.querySelectorAll('[data-pdf-proj]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.pdfProj);
        const p = this._projets[idx];
        if (!p) return;
        if (!window.M6_PDF?.exportProjets) { M6_toast?.('Module PDF non chargé'); return; }
        M6_PDF.exportProjets({ year:this._year, contract:this._contract, projets:[p], stats:this._computeProjetStats() });
      });
    });

    const renderJalList = () => {
      if (!jalList) return;
      jalList.innerHTML = tmpJalons.map((j,i)=>`<div style="display:flex;align-items:center;gap:6px;font-size:0.72rem;padding:2px 0">
        <span style="color:var(--pierre)">○</span><span>${j.titre}</span>
        <span style="color:var(--pierre)">${new Date(j.date+'T12:00:00').toLocaleDateString('fr-FR',{day:'2-digit',month:'short'})}</span>
        <button data-del-jal="${i}" style="background:none;border:none;cursor:pointer;color:var(--alerte);font-size:0.8rem">✕</button>
      </div>`).join('');
      jalList.querySelectorAll('[data-del-jal]').forEach(b=>b.addEventListener('click',()=>{
        tmpJalons.splice(parseInt(b.dataset.delJal),1); renderJalList();
      }));
    };

    this._c.querySelector('#p-jal-add')?.addEventListener('click',()=>{
      const nom  = this._c.querySelector('#p-jal-nom')?.value.trim();
      const date = this._c.querySelector('#p-jal-date')?.value;
      if(!nom||!date){M6_toast('Nom et date requis');return;}
      tmpJalons.push({titre:nom,date,fait:false});
      this._c.querySelector('#p-jal-nom').value='';
      renderJalList();
    });

    this._c.querySelector('#p-add')?.addEventListener('click',()=>{
      const nom = this._c.querySelector('#p-nom')?.value.trim();
      if(!nom){M6_toast('Nom requis');return;}
      this._projets.push({
        id:         'proj_'+Date.now().toString(36),
        nom,
        categorie:  this._c.querySelector('#p-cat')?.value,
        heuresPrevu:parseFloat(this._c.querySelector('#p-prev')?.value)||0,
        statut:     'en_cours',
        priorite:   this._c.querySelector('#p-prio')?.value||'moyenne',
        dateDebut:  this._c.querySelector('#p-d1')?.value||null,
        dateFin:    this._c.querySelector('#p-d2')?.value||null,
        couleur:    this._c.querySelector('#p-col')?.value||'#C4853A',
        note:       this._c.querySelector('#p-note')?.value.trim(),
        jalons:     [...tmpJalons],
      });
      tmpJalons=[];
      this._saveProjets();this._load();this.render();
      M6_toast('Projet ajoute — visible dans le popup du calendrier');
    });

    this._c.querySelectorAll('[data-del-proj]').forEach(b=>b.addEventListener('click',()=>{
      const i=parseInt(b.dataset.delProj);
      if(!confirm('Supprimer ? Les imputations calendrier restent.'))return;
      this._projets.splice(i,1);this._saveProjets();this._load();this.render();
    }));

    this._c.querySelectorAll('[data-statut-proj]').forEach(b=>b.addEventListener('click',()=>{
      const i=parseInt(b.dataset.statutProj);
      if(this._projets[i]) this._projets[i].statut=b.dataset.statut;
      this._saveProjets();this._load();this.render();M6_toast('Statut mis a jour');
    }));

    this._c.querySelectorAll('[data-toggle-jalon]').forEach(b=>b.addEventListener('click',()=>{
      const [pi,ji]=b.dataset.toggleJalon.split('-').map(Number);
      if(this._projets[pi]?.jalons?.[ji]) this._projets[pi].jalons[ji].fait=!this._projets[pi].jalons[ji].fait;
      this._saveProjets();this._load();this.render();
    }));

    this._c.querySelectorAll('[data-edit-proj]').forEach(b=>b.addEventListener('click',()=>{
      const i=parseInt(b.dataset.editProj);const p=this._projets[i];if(!p)return;
      const nom  = prompt('Nom du projet :',p.nom);if(!nom)return;
      const prev = parseFloat(prompt('Budget heures :',p.heuresPrevu))||p.heuresPrevu;
      const note = prompt('Note :',p.note||'');
      const fin  = prompt('Date fin (YYYY-MM-DD) :',p.dateFin||'');
      p.nom=nom.trim();p.heuresPrevu=prev;p.note=(note||'').trim();if(fin)p.dateFin=fin;
      this._saveProjets();this._load();this.render();
    }));
  },

    // ── SANTÉ ──────────────────────────────────────────────────────
  _tplSante(bio, s) {
    const bar=(l,v,inv)=>{const c=inv?(v>60?'#B85C50':v>35?'#C4853A':'#4A7C6F'):(v<40?'#B85C50':v<65?'#C4853A':'#4A7C6F');return `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:4px"><span>${l}</span><span style="font-family:var(--font-display);font-size:1rem;font-weight:700;color:${c}">${v}</span></div><div style="height:8px;background:var(--ivoire-2);border-radius:99px;overflow:hidden"><div style="height:100%;width:${v}%;border-radius:99px;background:${c}"></div></div></div>`;};

    if(!bio.hasData) return `
      <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Santé & Bien-être Dirigeant</div><div class="m6-ornement-line"></div></div>
      <div class="m6-alert info"><span>ℹ️</span><div>Saisissez des journées dans l'Agenda pour voir votre analyse biologique. Renseignez les amplitudes pour affiner.</div></div>
      <div class="m6-card" style="margin-top:14px"><div class="m6-card-body">
        <div style="font-size:0.8rem;color:var(--charbon-3);line-height:1.6">
          <strong>Pour un cadre dirigeant, la santé est un actif stratégique.</strong><br>
          Même sans obligation légale de compteur d'heures, les longues durées exposent aux mêmes risques biologiques :<br>
          • Risque cardiovasculaire (Kivimäki 2015 — RR AVC 1.33 à ≥55h/sem)<br>
          • Vieillissement épigénétique (Dresden Burnout Study 2025)<br>
          • Déclin cognitif mesuré par IRM (Frontiers 2025)
        </div>
      </div></div>`;

    return `
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Santé & Bien-être</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px">
      <div class="m6-card-header"><div class="m6-card-icon" style="background:${bio.phase?.color}20">🩺</div><div><div class="m6-card-label">Phase physiologique (INRS)</div><div class="m6-card-title" style="color:${bio.phase?.color}">${bio.phase?.code} — ${bio.phase?.label}</div></div></div>
      <div class="m6-card-body">${bar('Fatigue accumulée',bio.fatigue,true)}${bar('Stress chronique',bio.stress,true)}${bar('Capacité de récupération',bio.recovery,false)}${bar('Performance estimée (Pencavel)',bio.performance,false)}</div>
    </div>
    <div class="m6-card" style="margin-bottom:14px">
      <div class="m6-card-header"><div class="m6-card-icon">❤️</div><div><div class="m6-card-label">Risques long terme</div><div class="m6-card-title">CV · Cognitif · Vieillissement</div></div></div>
      <div class="m6-card-body">${bar('Risque CV (Kivimäki 2015 / Lancet)',bio.cvRisk,true)}${bar('Risque cognitif (Jang 2025 / Frontiers)',bio.cogRisk,true)}${bar('Vieillissement biologique (Ahola 2012)',bio.agingRisk,true)}<div style="font-size:0.7rem;color:var(--pierre);margin-top:8px">Même sans obligation légale, un dirigeant exposé à >55h/sem éq. supporte un RR AVC = 1.33 (IC95% 1.11–1.61). Pega et al. WHO/ILO 2021.</div></div>
    </div>

    <!-- Amplitudes longues -->
    ${s.amplitudesLong.length?`<div class="m6-card" style="margin-bottom:14px"><div class="m6-card-header"><div class="m6-card-icon">⏱️</div><div><div class="m6-card-label">Journées longues</div><div class="m6-card-title">${s.amplitudesLong.length} journées >11h</div></div></div>
      <div class="m6-card-body">${s.amplitudesLong.slice(-5).reverse().map(a=>`<div class="m6-row"><span class="m6-row-label">${new Date(a.dk+'T12:00:00').toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'})}</span><span class="m6-row-val ${a.amp>13?'alert':''}">${Math.round(a.amp*10)/10}h</span></div>`).join('')}
      <div style="font-size:0.7rem;color:var(--pierre);margin-top:8px">Hakola & Härmä 2001 : amplitude >11h → perturbation circadienne et dette de sommeil cumulée.</div></div></div>`:''}

    <!-- Alertes bio -->
    ${bio.alertesBio.length?`<div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Alertes santé</div><div class="m6-ornement-line"></div></div>${bio.alertesBio.map(al=>`<div class="m6-alert ${al.niv}" style="margin-bottom:10px"><span class="m6-alert-icon">⚕️</span><div><strong>${al.titre}</strong><br><span style="font-size:0.77rem">${al.texte}</span></div></div>`).join('')}`:''}

    <div class="m6-alert info" style="font-size:0.75rem;margin-top:8px">
      <span>⚕️</span><div>Cette analyse ne remplace pas un avis médical. Consultez votre médecin du travail (R4624-10) pour un suivi personnalisé.</div>
    </div>`;
  },

  // ── EXPORT ─────────────────────────────────────────────────────
  _tplExport(s, bio) {
    const as=M6_Storage.getAutoSaveDate(REGIME,this._year);
    const fs=M6_Storage.getFileSaveDate(REGIME,this._year);
    const valid=M6_Storage.getValidations(REGIME,this._year);
    const log=M6_Storage.getLog(REGIME,this._year).slice(-6).reverse();
    const yrs=M6_Storage.getAllYears(REGIME);
    return `
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Sauvegarde</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body" style="padding:10px 14px">
      <div class="m6-row"><span class="m6-row-label">Application</span><span style="font-size:0.72rem;color:${as?'var(--succes)':'var(--alerte)'}">${as?new Date(as).toLocaleString('fr-FR'):'—'}</span></div>
      <div class="m6-row"><span class="m6-row-label">Fichier JSON</span><span style="font-size:0.72rem;color:${fs?'var(--succes)':'var(--alerte)'}">${fs?new Date(fs).toLocaleString('fr-FR'):'Jamais exporté ⚠️'}</span></div>
    </div></div>

    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">PDF Dirigeant</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body">
      <div class="m6-field"><label>Mois (PDF mensuel)</label><select id="pdf-mois" style="font-size:14px">${MOIS_FR.map((m,i)=>`<option value="${i}">${m}</option>`).join('')}</select></div>
      <div class="m6-field"><label>Votre nom</label><input type="text" id="pdf-nom" value="${this._contract.nom||''}" placeholder="Prénom NOM" style="font-size:16px"></div>
      <div class="m6-field"><label>Fonction</label><input type="text" id="pdf-fnc" value="${this._contract.fonction||''}" placeholder="Directeur Général…" style="font-size:16px"></div>
      <div style="margin-bottom:12px">
        
      </div>
      <div class="m6-field"><label>PDF Periode — date debut</label><input type="date" id="cd-per-d1" value="${this._year}-01-01" style="font-size:16px"></div>
      <div class="m6-field"><label>PDF Periode — date fin</label><input type="date" id="cd-per-d2" value="${new Date().toISOString().slice(0,10)}" style="font-size:16px"></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="m6-btn m6-btn-ghost" id="cd-pdf-per" style="flex:1;font-size:0.78rem">📄 Periode</button>
        <button class="m6-btn m6-btn-ghost" id="pdf-m" style="flex:1;font-size:0.78rem">📄 PDF Mensuel</button>
        <button class="m6-btn m6-btn-ghost" id="pdf-a" style="flex:1;font-size:0.78rem">📋 PDF Annuel</button>
      </div>
    </div></div>

    <!-- Validation mensuelle -->
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Validation mensuelle</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body">
      <div class="m6-field"><label>Mois</label><select id="v-mois" style="font-size:14px">${MOIS_FR.map((m,i)=>`<option value="${i}">${m}${valid[i]?' ✓':''}</option>`).join('')}</select></div>
      <div class="m6-field"><label>Votre nom</label><input type="text" id="v-nom" value="${this._contract.nom||''}" style="font-size:16px"></div>
      <button class="m6-btn m6-btn-gold" id="v-btn" style="font-size:0.8rem">Valider ce mois</button>
      ${Object.entries(valid).length?`<div style="margin-top:10px">${Object.entries(valid).sort(([a],[b])=>a-b).map(([m,v])=>`<div class="m6-row"><span class="m6-row-label">${['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc'][m]}</span><span style="font-size:0.65rem;color:var(--pierre)">${new Date(v.ts).toLocaleString('fr-FR',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'})} · #${v.hash}</span></div>`).join('')}</div>`:''}
    </div></div>

    <!-- JSON -->
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Rupture conventionnelle</div><div class="m6-ornement-line"></div></div>
    <div id="rupture-container-cd"></div>
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">JSON — Exercices : ${yrs.join(', ')}</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body">
      <div style="display:flex;gap:8px">
        <button class="m6-btn m6-btn-primary" id="exp-j" style="flex:1;font-size:0.78rem">Exporter JSON</button>
        <button class="m6-btn m6-btn-primary" id="exp-csv-cd" style="flex:1;font-size:0.78rem">📊 CSV SIRH</button>
        <button class="m6-btn m6-btn-ghost" id="imp-j" style="flex:1;font-size:0.78rem">Importer JSON</button>
      </div>
    </div></div>

    <!-- Historique -->
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Historique des modifications</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card"><div class="m6-card-body">${!log.length?'<div style="font-size:0.78rem;color:var(--pierre)">Aucune modification.</div>':log.map(l=>`<div class="m6-row" style="padding:5px 0;align-items:flex-start"><div><div style="font-size:0.72rem;font-weight:500">${l.action}</div><div style="font-size:0.65rem;color:var(--pierre)">${l.detail}</div></div><span style="font-size:0.6rem;color:var(--pierre);flex-shrink:0;margin-left:8px">${new Date(l.ts).toLocaleString('fr-FR',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'})}</span></div>`).join('')}</div></div>`;
  },

  _bindExport(stats, bio) {
    const saveMeta = () => {
      const nom = this._c.querySelector('#pdf-nom')?.value.trim();
      const fnc = this._c.querySelector('#pdf-fnc')?.value.trim();
      if(nom){ this._contract.nom=nom; } if(fnc){ this._contract.fonction=fnc; }
      this._saveContract();
    };
    const checkAttest = () => {
      
      return true;
    };

    const makeAnalysis = () => ({
      joursEffectifs:stats.jTravailles, cpPris:stats.cpPris, plafond:218,
      rttPris:stats.rttPris, deplacements:stats.deplacements, demis:stats.demis,
      rachetes:0, feriesOuvres:0, rttTheoriques:0, rttSolde:0,
      alertes:[], tauxRemplissage:0
    });

    this._c.querySelector('#cd-pdf-per')?.addEventListener('click', () => {
      const d1 = this._c.querySelector('#cd-per-d1')?.value;
      const d2 = this._c.querySelector('#cd-per-d2')?.value;
      if(!d1||!d2||d1>d2){M6_toast('Verifiez les dates');return;}
      M6_PDF.exportPeriode({regime:REGIME,year:this._year,contract:this._contract,data:this._data,dateDebut:d1,dateFin:d2});
    });
    this._c.querySelector('#pdf-m')?.addEventListener('click',()=>{
      if(!checkAttest()) return; saveMeta();
      M6_PDF.exportMensuel({regime:REGIME,year:this._year,mois:parseInt(this._c.querySelector('#pdf-mois')?.value),contract:this._contract,data:this._data,moods:this._moods,analysis:makeAnalysis(),validations:M6_Storage.getValidations(REGIME,this._year)});
    });
    this._c.querySelector('#pdf-a')?.addEventListener('click',()=>{
      if(!checkAttest()) return; saveMeta();
      M6_PDF.exportAnnuel({regime:REGIME,year:this._year,contract:this._contract,data:this._data,moods:this._moods,analysis:makeAnalysis()});
    });
    this._c.querySelector('#v-btn')?.addEventListener('click',()=>{
      const m=parseInt(this._c.querySelector('#v-mois')?.value),nom=this._c.querySelector('#v-nom')?.value.trim();
      if(!nom){M6_toast('Saisissez votre nom');return;}
      M6_Storage.addValidation(REGIME,this._year,m,nom);M6_toast('Validé');this.render();
    });
    const rccd = this._c.querySelector('#rupture-container-cd');
    if (rccd && window.M6_RuptureCalculateur) M6_RuptureCalculateur.renderUI(rccd, this._contract);
    this._c.querySelector('#exp-j')?.addEventListener('click',()=>M6_ImportExport.export(REGIME));
    this._c.querySelector('#exp-csv-cd')?.addEventListener('click', () => M6_ImportExport.exportCSV(REGIME, this._year));
    this._c.querySelector('#imp-j')?.addEventListener('click',()=>M6_ImportExport.import(REGIME,()=>{this._load();this.render();}));
  },

  // ── SETUP ──────────────────────────────────────────────────────
  _tplSetup() {
    const c = this._contract || {};
    const isEdit = !!(c.nom || c.fonction);
    return `<div style="padding:32px 16px;padding-top:calc(40px + env(safe-area-inset-top,0));min-height:100dvh;background:var(--ivoire)">
      <!-- Portrait Zenji -->
      <div style="text-align:center;margin-bottom:24px">
        <img src="../module6/images/Cadre.png" alt="Zenji" style="width:100px;height:100px;object-fit:cover;object-position:top center;border-radius:50%;border:3px solid var(--champagne);margin:0 auto 10px">
        <div style="font-family:var(--font-display);font-size:1.4rem;font-weight:600;color:var(--charbon)">Cadre Dirigeant</div>
        <div style="font-size:0.7rem;color:var(--pierre);margin-top:4px">Art. L3111-2 — ${isEdit?'Modifier la configuration':'Configuration initiale'}</div>
      </div>
      ${isEdit?`<div class="m6-alert info" style="margin-bottom:12px;font-size:0.78rem"><span>✏️</span><div>Vos paramètres actuels sont pré-remplis. Modifiez ce qui change — vos données saisies (jours, CP, projets, entretiens) sont conservées.</div></div>`:''}
      <div class="m6-card"><div class="m6-card-body">
        <div class="m6-field"><label>Votre nom complet</label><input type="text" id="s-nom" value="${(c.nom||'').replace(/"/g,'&quot;')}" placeholder="Prénom NOM" style="font-size:16px"></div>
        <div class="m6-field"><label>Fonction</label><input type="text" id="s-fnc" value="${(c.fonction||'').replace(/"/g,'&quot;')}" placeholder="Directeur Général, DAF, DRH…" style="font-size:16px"></div>
        <div class="m6-field"><label>Entreprise</label><input type="text" id="s-ent" value="${(c.entreprise||'').replace(/"/g,'&quot;')}" placeholder="Nom de l'entreprise" style="font-size:16px"></div>
        <div class="m6-field" style="position:relative">
          <label>CCN applicable — tapez pour chercher</label>
          <input type="text" id="s-ccn" value="${(c.ccnLabel||'').replace(/"/g,'&quot;')}" placeholder="ex : Syntec, 675, Banque AFB…" style="font-size:16px" autocomplete="off">
          <div id="s-ccn-drop-cd" style="display:none;position:absolute;left:0;right:0;top:100%;background:#fff;border:1px solid var(--ivoire-3);border-radius:var(--radius);z-index:100;box-shadow:var(--shadow);max-height:180px;overflow-y:auto"></div>
          <div id="s-ccn-cd-info" style="display:none;margin-top:4px"></div>
          <div style="font-size:0.68rem;color:var(--pierre);margin-top:4px">Affiche les critères L3111-2 et droits maintenus selon votre CCN.</div>
        </div>
        <div class="m6-field" style="display:none"><label>_old_ccn</label><input type="text" id="_s-ccn-hidden" placeholder="ex : Syntec, Banque AFB, Hôtellerie…" style="font-size:16px"></div>
        <div class="m6-field"><label>Congés payés contractuels (jours ouvrables)</label><input type="number" id="s-cp" value="${c.joursCPContrat||25}" min="25" max="50" style="font-size:16px"></div>
        <div class="m6-field">
          <label>RTT par an <small style="color:var(--pierre);font-weight:400">— laissez vide si non concerné</small></label>
          <input type="number" id="s-rtt" value="${c.rttManuel||''}" min="0" max="40" step="0.5" placeholder="auto / non concerné" style="font-size:16px">
          <div style="font-size:0.68rem;color:var(--pierre);margin-top:4px">Beaucoup de cadres dirigeants n'ont pas de RTT. Saisissez le nombre uniquement si votre contrat ou accord en prévoit.</div>
        </div>
        <div class="m6-field"><label>Début de l'exercice <small style="color:var(--pierre);font-weight:400">(laisser vide = 1er janvier)</small></label><input type="date" id="s-ex-debut" value="${c.dateDebutExercice||''}" placeholder="${this._year}-01-01" style="font-size:16px"></div>
        <div class="m6-field"><label>Fin de l'exercice <small style="color:var(--pierre);font-weight:400">(laisser vide = 31 décembre)</small></label><input type="date" id="s-ex-fin" value="${c.dateFinExercice||''}" placeholder="${this._year}-12-31" style="font-size:16px"></div>
        <div class="m6-field"><label>Date d'arrivée si en cours d'année <small style="color:var(--pierre);font-weight:400">(prorata uniquement si renseignée)</small></label><input type="date" id="s-debut" value="${c.dateArrivee||''}" style="font-size:16px"></div>
        <div class="m6-field"><label>Nom du manager / Président du CA</label><input type="text" id="s-mgr" value="${(c.nomManager||'').replace(/"/g,'&quot;')}" placeholder="Pour les PDF" style="font-size:16px"></div>
        <button class="m6-btn m6-btn-gold" id="s-save">${isEdit?'💾 Enregistrer les modifications':'Commencer le suivi →'}</button>
        ${isEdit?`<button class="m6-btn m6-btn-ghost" id="s-cancel" style="margin-top:8px;width:100%;font-size:0.8rem">Annuler</button>`:''}
      </div></div>
      <div class="m6-alert info" style="margin-top:12px;font-size:0.78rem">
        <span>⚖️</span><div>En tant que cadre dirigeant (L3111-2), vous n'êtes pas soumis à la durée légale. Ce module suit vos CP, vos journées de présence, vos missions et votre santé.</div>
      </div>
      <a href="../menu.html" style="display:block;text-align:center;margin-top:20px;font-size:0.8rem;color:var(--pierre)">← Menu</a>
    </div>`;
  },

  _bindSetup() {
    // Cadres Dirigeants → CCN depuis conventions-cadres.js avec critères L3111-2
    if (window.M6_CCN_Adapter) {
      M6_CCN_Adapter.bindAutocomplete(
        this._c.querySelector('#s-ccn'),
        this._c.querySelector('#s-ccn-drop-cd'),
        (ccn) => {
          const d = M6_CCN_Adapter.buildContractDefaults(ccn, 'cadre_dirigeant');
          const cpEl = this._c.querySelector('#s-cp');
          if (cpEl) cpEl.value = 25; // CD : toujours 25j min
          // Afficher critères CD
          const infoZone = this._c.querySelector('#s-ccn-cd-info');
          if (infoZone) {
            infoZone.style.display = 'block';
            infoZone.innerHTML = M6_CCN_Adapter.renderCCNCard(ccn, 'cadre_dirigeant') +
              (d.alertesCD && d.alertesCD.length ? `<div style="margin-top:8px">${d.alertesCD.slice(0,3).map(a=>
                `<div class="m6-alert info" style="margin-bottom:4px;font-size:0.7rem"><span>ℹ️</span><div>${a}</div></div>`
              ).join('')}</div>` : '');
          }
          M6_toast('CCN ' + ccn.nom + ' sélectionnée');
        },
        'cadre_dirigeant' // ← source : conventions-cadres.js CCN_CD_DATA
      );
    }
    this._c.querySelector('#s-save')?.addEventListener('click',()=>{
      // Préserver les champs non touchés (projets snapshot, autres metadonnées)
      const existing = this._contract || {};
      const _rttInput = this._c.querySelector('#s-rtt')?.value;
      const _rttManuel = (_rttInput === undefined || _rttInput === '' || isNaN(parseFloat(_rttInput)))
        ? null
        : parseFloat(_rttInput);
      const c = {
        ...existing,
        nom:                this._c.querySelector('#s-nom')?.value.trim() || existing.nom || '',
        fonction:           this._c.querySelector('#s-fnc')?.value.trim() || existing.fonction || '',
        entreprise:         this._c.querySelector('#s-ent')?.value.trim() || existing.entreprise || '',
        ccnLabel:           this._c.querySelector('#s-ccn')?.value.trim() || existing.ccnLabel || '',
        joursCPContrat:     parseInt(this._c.querySelector('#s-cp')?.value)||25,
        rttManuel:          _rttManuel,
        dateDebutExercice:  this._c.querySelector('#s-ex-debut')?.value || null,
        dateFinExercice:    this._c.querySelector('#s-ex-fin')?.value || null,
        dateArrivee:        this._c.querySelector('#s-debut')?.value || null,
        nomManager:         this._c.querySelector('#s-mgr')?.value.trim() || existing.nomManager || '',
      };
      M6_Storage.setContract(REGIME, c);
      M6_Storage.createYear(REGIME, this._year);
      this._load(); this.render();
      M6_toast?.('💾 Configuration enregistrée');
    });
    // Bouton Annuler (mode édition uniquement)
    this._c.querySelector('#s-cancel')?.addEventListener('click', () => {
      this._load(); this.render();
    });
  }
};

global.VCD = VCD;
global.VCD_editContract = () => { VCD._c.innerHTML=VCD._tplSetup(); VCD._bindSetup(); };

})(window);
