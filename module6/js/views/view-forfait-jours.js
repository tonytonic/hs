/**
 * VIEW-FORFAIT-JOURS — Orchestrateur complet M6
 * 6 onglets : Bilan · Calendrier · Santé · Entretien · Export · Glossaire
 * Prorata arrivée en cours d'année · Fractionnement · Multi-années
 */
'use strict';

(function(global) {

const VFJ = {
  _c: null, _regime: 'forfait_jours',
  _year: new Date().getFullYear(),
  _section: 'bilan',
  _contract: null, _data: {}, _moods: {},

  init(container) {
    if (!container) { console.error('[VFJ] container null'); return; }
    this._c = container;
    this._year = M6_Storage.getActiveYear(this._regime);
    this._section = 'bilan'; // reset section à chaque init
    try { this._load(); } catch(e) { console.error('[VFJ._load]', e); }
    try { this.render(); } catch(e) {
      console.error('[VFJ.render]', e);
      container.innerHTML = `<div style="padding:24px;color:red"><strong>Erreur : ${e.message}</strong><br><small>${e.stack?.split('\n')[1]||''}</small></div>`;
    }
  },

  _load() {
    this._contract = M6_Storage.getContract(this._regime);
    this._data     = M6_Storage.getData(this._regime, this._year);
    this._moods    = M6_Storage.getMoods(this._regime, this._year);
  },

  _save(dk, value, mood) {
    if (value === null) {
      const d = M6_Storage.getData(this._regime, this._year);
      delete d[dk]; M6_Storage.setData(this._regime, this._year, d);
      const m = M6_Storage.getMoods(this._regime, this._year);
      delete m[dk]; localStorage.setItem(`M6_${this._regime}_${this._year}_MOODS`, JSON.stringify(m));
    } else {
      M6_Storage.setDay(this._regime, this._year, dk, value);
      if (mood) M6_Storage.setMood(this._regime, this._year, dk, mood);
    }
    this._load();
    if (this._section === 'calendrier' && window.M6_Calendar) {
      M6_Calendar.refresh(this._data, this._moods);
    } else { this.render(); }
    M6_toast('✓ Enregistré');
    this._alerteSurchauffe();
  },

  _alerteSurchauffe() {
    const today = new Date(); let n = 0;
    for (let i = 0; i < 3; i++) {
      const d = new Date(today); d.setDate(today.getDate()-i);
      const m = this._moods[d.toISOString().slice(0,10)];
      if (m?.niveau === 'critique') n++;
    }
    if (n >= 3) setTimeout(() => M6_toast('🔥 3j critique — signalez à votre manager (L4121-1)'), 600);
  },

  render() {
    if (!this._contract) { this._c.innerHTML = this._tplSetup(); this._bindSetup(); return; }
    const analysis = M6_ForfaitJours.analyze(this._contract, this._data, this._year);
    const bio      = M6_BioEngine.analyzeForfaitJours(this._contract, this._data, this._year);
    if (bio?.hasData && window.M6_PhaseAlert) M6_PhaseAlert.showIfNeeded(this._regime, this._year, bio.phase?.code, bio.fatigue);

    // ── Header global : titre + year picker + boutons ──────────
    const yrs = M6_Storage.getAllYears(this._regime);
    const yrOpts = yrs.map(y=>`<option value="${y}" ${y==this._year?'selected':''}>${y}</option>`).join('');
    const yrPickerHtml = `<span style="display:inline-flex;align-items:center;gap:3px">
      <button id="vfj-yr-prev" style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:var(--champagne);font-size:0.82rem;border-radius:6px;padding:1px 7px;cursor:pointer;line-height:1.2">‹</button>
      ${yrs.length>1
        ? `<select id="vfj-yr-hdr" style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:var(--champagne);font-size:0.7rem;border-radius:6px;padding:2px 6px;-webkit-appearance:none;cursor:pointer">${yrOpts}</select>`
        : `<span style="font-size:0.7rem;color:var(--champagne);min-width:32px;text-align:center;display:inline-block">${this._year}</span>`}
      <button id="vfj-yr-next" style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:var(--champagne);font-size:0.82rem;border-radius:6px;padding:1px 7px;cursor:pointer;line-height:1.2">›</button>
    </span>`;
    const plafond = this._contract.plafond || 218;
    const restants = Math.max(0, plafond - analysis.joursEffectifs);
    M6_Header.set({
      title: `Forfait Jours ${this._year}`,
      sub: `${this._contract.ccnLabel || 'Droit commun'} · ${plafond}j · ${restants}j restants`,
      showReset: true,
      showSwitch: true,
      onReset: () => {
        // NE PAS effacer le contrat — afficher le wizard pré-rempli avec les valeurs actuelles.
        // L'utilisateur modifie ce qu'il veut puis Enregistre, ou Annule.
        this._c.innerHTML = this._tplSetup();
        this._bindSetup();
      },
      yearPicker: yrPickerHtml,
    });
    this._c.innerHTML = `${this._tplNav()}<div class="m6-main m6-fade-in" id="vfj-content" style="padding-top:8px"></div>`;
    const ct = this._c.querySelector('#vfj-content');

    // ── Carte Zenji contextuelle (toutes sections sauf calendrier) ──
    const zenjiMsg = window.M6_Zenji
      ? M6_Zenji.getContextMessage(this._section, analysis, bio, this._contract)
      : '';
    const zenjiHtml = (zenjiMsg && this._section !== 'calendrier')
      ? M6_Zenji.renderCard(zenjiMsg, bio?.phase?.code || 'P1', this._section !== 'sante')
      : '';

    try {
    switch(this._section) {
      case 'bilan':
        ct.innerHTML = zenjiHtml + this._tplBilan(analysis,bio);
        this._bindBilan(analysis,bio);
        break;
      case 'calendrier':
        this._renderCal(ct);
        break;
      case 'bio':
        try {
          ct.innerHTML = zenjiHtml + this._tplBio(bio);
          if (window.M6_Charts) M6_Charts.bindCharts(analysis, bio, this._data, this._contract, this._year);
        } catch(e) {
          ct.innerHTML = `<div class="m6-alert warning" style="margin:16px"><span>⚠️</span><div><strong>Erreur module Santé</strong><br>${e.message}</div></div>`;
          console.error('[VFJ Santé]', e);
        }
        break;
      case 'entretien':
        ct.innerHTML = zenjiHtml;
        if (window.M6_Entretien) {
          M6_Entretien.renderForm(ct, this._regime, this._year, this._contract, analysis, ()=>{this._load();this.render();});
        } else {
          ct.innerHTML += '<div class="m6-alert info" style="margin:16px"><span>ℹ️</span><div>Module entretien non chargé.</div></div>';
        }
        break;
      case 'export':
        ct.innerHTML = zenjiHtml + this._tplExport(analysis);
        this._bindExport(analysis);
        break;
      case 'tendances':
        ct.innerHTML = '';
        if (window.M6_Charts) {
          ct.innerHTML = M6_Charts.renderSection(analysis, bio, this._data, this._contract, this._year);
          // Pas de canvas — tableau bio chiffres uniquement
        } else {
          ct.innerHTML = '<div class="m6-alert info" style="margin:16px"><span>ℹ️</span><div>Aucune donnée.</div></div>';
        }
        break;
      case 'nullite':
        ct.innerHTML = zenjiHtml;
        if(window.M6_SimulateurNullite) M6_SimulateurNullite.render(ct, this._contract, analysis, this._data, this._year, this._regime);
        else ct.innerHTML += '<div class="m6-alert info" style="margin:16px"><span>⚠️</span><div>Module non chargé.</div></div>';
        break;
      case 'rupture':
        ct.innerHTML = zenjiHtml + `<div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Rupture Conventionnelle</div><div class="m6-ornement-line"></div></div><div id="rupture-main-ct"></div>`;
        if (window.M6_RuptureCalculateur) M6_RuptureCalculateur.renderUI(ct.querySelector('#rupture-main-ct'), this._contract);
        else ct.innerHTML += '<div class="m6-alert info" style="margin:16px"><span>ℹ️</span><div>Module Rupture Conventionnelle non chargé.</div></div>';
        break;
      case 'glossaire':
        ct.innerHTML = zenjiHtml;
        M6_GlossaireUI.render(ct, 'forfait_jours');
        break;
    }
    } catch(e) {
      console.error('[VFJ render]', e);
      if(ct) ct.innerHTML = `<div class="m6-alert warning" style="margin:16px"><span>⚠️</span><div><strong>Erreur section ${this._section}</strong><br><code style="font-size:0.75rem">${e.message}</code></div></div>`;
    }
    this._bindNav();
    // Alerte automatique si changement de phase
    if(window.M6_AlertePhase && bio?.hasData) M6_AlertePhase.check(bio, this._regime);
    // Init popup Zenji (bulle flottante)
    if (window.M6_ZenjiPopup) {
      M6_ZenjiPopup.init(analysis, bio, this._contract, (action) => this._handleZenjiAction(action), 'forfait_jours');
    }
  },

  _handleZenjiAction(action) {
    if (action.includes('RTT') || action.includes('Poser un RTT')) { this._section='calendrier'; this.render(); }
    else if (action.includes('santé') || action.includes('biolog') || action.includes('Santé')) { this._section='bio'; this.render(); }
    else if (action.includes('entretien') || action.includes('Entretien')) { this._section='entretien'; this.render(); }
    else if (action.includes('export') || action.includes('PDF') || action.includes('Export')) { this._section='export'; this.render(); }
    else if (action.includes('glossaire') || action.includes('Glossaire')) { this._section='glossaire'; this.render(); }
    else if (action.includes('bilan') || action.includes('Bilan')) { this._section='bilan'; this.render(); }
  },

  _tplHeader(a) {
    const r = Math.max(0, a.plafond - a.joursEffectifs);
    const pct = a.tauxRemplissage;
    const barColor = pct>=100 ? 'linear-gradient(90deg,#9B2C2C,#E53E3E)' : pct>=90 ? 'linear-gradient(90deg,var(--champagne-2),var(--champagne))' : 'linear-gradient(90deg,#2D6A4F,#4A7C6F)';
    return `<div style="background:var(--charbon);padding:10px 16px;padding-top:calc(10px + env(safe-area-inset-top,0));position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(196,163,90,0.25)">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <div style="flex:1">
          <div style="font-family:var(--font-display);font-size:1.1rem;font-weight:600;color:var(--ivoire)">Forfait Jours ${this._year}</div>
          <div style="font-size:0.65rem;color:var(--champagne);letter-spacing:0.06em;text-transform:uppercase">${this._contract.ccnLabel||'Droit commun'} · ${a.plafond}j</div>
        </div>
        ${this._tplYearPicker()}
        <a href="../menu.html" style="color:var(--pierre);font-size:0.7rem;text-decoration:none;border:1px solid rgba(255,255,255,0.12);padding:4px 8px;border-radius:6px">← Menu</a>
      </div>
      <div>
        <div style="display:flex;justify-content:space-between;font-size:0.68rem;color:var(--pierre);margin-bottom:3px">
          <span><strong style="color:var(--ivoire)">${a.joursEffectifs}</strong> jours</span>
          <span style="color:${r<=10?'var(--alerte)':'var(--pierre)'}"><strong style="color:${r<=10?'var(--alerte)':'var(--champagne)'}">${r}</strong> restants / ${a.plafond}</span>
        </div>
        <div style="height:5px;background:rgba(255,255,255,0.1);border-radius:99px;overflow:hidden">
          <div style="height:100%;border-radius:99px;width:${Math.min(100,pct)}%;background:${barColor};transition:width 0.6s"></div>
        </div>
      </div>
    </div>`;
  },

  _tplYearPicker() {
    const yrs = M6_Storage.getAllYears(this._regime);
    if (yrs.length <= 1) return `<span style="font-size:0.72rem;color:var(--pierre)">${this._year}</span>`;
    return `<select id="vfj-yr" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:var(--ivoire);font-size:0.72rem;border-radius:6px;padding:3px 6px;-webkit-appearance:none">
      ${yrs.map(y=>`<option value="${y}" ${y==this._year?'selected':''}>${y}</option>`).join('')}
    </select>`;
  },

  _tplNav() {
    // Nav uniforme avec FH/CD : tous les onglets visibles (ergonomie identique à l'app)
    const mk = (id, icon, label) =>
      `<button class="m6-nav-item ${this._section===id?'active':''}" data-sec="${id}">
        <span class="nav-icon">${icon}</span>${label}
      </button>`;
    return `<nav class="m6-bottom-nav">
      ${mk('bilan',      '◈', 'Bilan')}
      ${mk('calendrier', '◻', 'Saisir')}
      ${mk('bio',        '♡', 'Santé')}
      ${mk('tendances',  '◗', 'Tendances')}
      <div class="m6-nav-row-sep"></div>
      ${mk('nullite',    '⚖', 'Validité')}
      ${mk('entretien',  '◉', 'Entretien')}
      ${mk('export',     '◆', 'Export')}
      ${mk('glossaire',  '≡', 'Glossaire')}
    </nav>`;
  },

  _bindNav() {
    this._c.querySelectorAll('[data-sec]').forEach(b => {
      b.onclick = () => {
        this._section = b.dataset.sec;
        this.render();
      };
    });
    const yp = this._c.querySelector('#vfj-yr') || document.querySelector('#vfj-yr-hdr');
    if (yp) yp.addEventListener('change', () => { this._year=parseInt(yp.value); M6_Storage.setActiveYear(this._regime, this._year); this._load(); this.render(); });
    const ypHdr = document.querySelector('#vfj-yr-hdr');
    if (ypHdr && ypHdr !== yp) ypHdr.addEventListener('change', () => { this._year=parseInt(ypHdr.value); M6_Storage.setActiveYear(this._regime, this._year); this._load(); this.render(); });
    const _goYearFJ = (yr) => {
      const exist = M6_Storage.getAllYears(this._regime);
      if (!exist.includes(yr)) M6_Storage.createYear(this._regime, yr);
      this._year = yr; M6_Storage.setActiveYear(this._regime, yr); this._load(); this.render();
    };
    const fjPrev = document.querySelector('#vfj-yr-prev');
    const fjNext = document.querySelector('#vfj-yr-next');
    if (fjPrev) fjPrev.onclick = () => _goYearFJ(this._year-1);
    if (fjNext) fjNext.onclick = () => _goYearFJ(this._year+1);
  },

  // ── BILAN ────────────────────────────────────────────────────
  _tplBilan(a, bio) {
    const frac = a.fractionnement;
    const restants = Math.max(0, (a.plafondProrata||a.plafond) - a.joursEffectifs);
    const couleurRestants = restants <= 10 ? 'var(--alerte)' : (restants <= 30 ? 'var(--champagne-2)' : 'var(--charbon)');
    return `
    ${a.isProrata ? `<div class="m6-alert info" style="margin-bottom:12px;font-size:0.78rem"><span>📐</span><div>Prorata appliqué (arrivée ${new Date(this._contract.dateArrivee+'T12:00:00').toLocaleDateString('fr-FR')}) → <strong>${a.plafondProrata}j</strong> (${Math.round(a.ratio*100)}%).</div></div>` : ''}

    <!-- HERO : chiffre dominant = jours restants -->
    <div class="m6-hero-kpi">
      <div class="m6-hero-kpi-label">Jours restants ${this._year}</div>
      <div class="m6-hero-kpi-value" style="color:${couleurRestants}">${restants}<span class="m6-hero-kpi-unit">/ ${a.plafondProrata||a.plafond}</span></div>
      <div class="m6-hero-kpi-sub">${a.joursEffectifs} jours travaillés · ${this._contract.ccnLabel || 'Droit commun'}</div>
    </div>

    <!-- 3 KPI mini -->
    <div class="m6-kpi-row">
      <div class="m6-kpi-mini">
        <div class="m6-kpi-mini-value" style="color:${a.rttSolde<0?'var(--alerte)':'var(--charbon)'}">${a.rttSolde>=0?'+':''}${a.rttSolde}</div>
        <div class="m6-kpi-mini-label">Solde RTT</div>
      </div>
      <div class="m6-kpi-mini">
        <div class="m6-kpi-mini-value">${a.rttPris}</div>
        <div class="m6-kpi-mini-label">RTT pris</div>
      </div>
      <div class="m6-kpi-mini">
        <div class="m6-kpi-mini-value">${bio?.fatigue ?? '–'}</div>
        <div class="m6-kpi-mini-label">Fatigue</div>
      </div>
    </div>

    ${frac?.droitFractionnement>0 ? `<details class="m6-collapsible"><summary class="m6-collapsible-header"><span class="m6-collapsible-icon">🗓️</span><span class="m6-collapsible-title"><strong>${frac.droitFractionnement}j de fractionnement</strong> acquis</span><span class="m6-collapsible-chevron">›</span></summary><div class="m6-collapsible-body">CP hors mai-oct : ${frac.cpHorsPeriode}j — Réf. Art. L3141-23.</div></details>` : ''}

    <div class="m6-stats-grid" style="margin-bottom:14px;display:none">
      <div class="m6-stat-box"><div class="m6-stat-val">${a.joursEffectifs}</div><div class="m6-stat-label">Jours travaillés</div></div>
      <div class="m6-stat-box" style="border-color:${a.rttSolde<0?'var(--alerte)':'rgba(196,163,90,0.35)'}">
        <div class="m6-stat-val" style="color:${a.rttSolde<0?'var(--alerte)':'var(--champagne-2)'}">${a.rttSolde>=0?'+':''}${a.rttSolde}</div>
        <div class="m6-stat-label">Solde RTT</div>
      </div>
      <div class="m6-stat-box"><div class="m6-stat-val">${a.rttTheoriques}</div><div class="m6-stat-label">RTT ${a.rttManuel?'<small style="color:var(--champagne-2);font-weight:500">saisis</small>':'théoriques'} <span class="m6-tooltip-wrap" id="rtt-tip-wrap" style="cursor:pointer;font-size:0.6rem;color:var(--pierre)">ⓘ<span class="m6-tooltip-bubble">${a.rttManuel?'Nombre de RTT saisi manuellement dans votre configuration. Modifiable dans la config.':'Ce nombre fluctue : absences sans solde, maladie ou arrivée en cours d\'année le réduisent proportionnellement. C\'est normal.'}</span></span></div></div>
      <div class="m6-stat-box"><div class="m6-stat-val">${a.rttPris}</div><div class="m6-stat-label">RTT pris</div></div>
    </div>

    <div class="m6-card" style="margin-bottom:14px">
      <div class="m6-card-header"><div class="m6-card-icon">📊</div><div><div class="m6-card-label">Répartition</div><div class="m6-card-title">Détail ${this._year}</div></div></div>
      <div class="m6-card-body">
        ${[['Jours travaillés',a.joursEffectifs,a.rachetes>0?`(dont <span style="color:var(--champagne-2);font-weight:600">${a.rachetes} rachetés</span>)`:''],[`RTT pris`,a.rttPris,`/${a.rttTheoriques} théoriques`],['CP pris',a.cpPris,`/${this._contract.joursCPContrat||25}j contractuels`],['Fériés ouvrés',a.feriesOuvres,''],['Repos',a.reposPris,'']].map(([l,v,h])=>`<div class="m6-row"><span class="m6-row-label">${l}</span><span class="m6-row-val">${v} <small style="color:var(--pierre);font-weight:400">${h||''}</small></span></div>`).join('')}
        ${(a.demis_matin||0)+(a.demis_am||0)>0?`<div class="m6-row"><span class="m6-row-label">Demi-journées</span><span class="m6-row-val" style="display:flex;gap:6px;align-items:center">${a.demis_matin>0?`<span style="background:#E8F0FB;border:1px solid #3B82F6;border-radius:6px;padding:2px 8px;font-size:0.72rem;color:#1D4ED8">🌅 ${a.demis_matin}×Matin</span>`:''} ${a.demis_am>0?`<span style="background:#FEF3C7;border:1px solid #D97706;border-radius:6px;padding:2px 8px;font-size:0.72rem;color:#92400E">🌇 ${a.demis_am}×AM</span>`:''}</span></div>`:''}
      </div>
    </div>

    ${bio.hasData ? `<div class="m6-card" style="margin-bottom:14px;cursor:pointer" id="bio-card">
      <div class="m6-card-body" style="padding:12px 14px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div class="m6-card-label">Santé — Phase ${bio.phase?.code}</div>
          <span class="m6-badge" style="background:${bio.phase?.color}20;color:${bio.phase?.color};border-radius:99px;font-size:0.65rem;padding:2px 8px">${bio.phase?.label}</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;text-align:center">
          ${[['Fatigue',bio.fatigue,true],['Stress',bio.stress,true],['Récup.',bio.recovery,false],['Perf.',bio.performance,false]].map(([l,v,inv])=>{
            const c=inv?(v>60?'#B85C50':v>35?'#C4853A':'#4A7C6F'):(v<40?'#B85C50':v<65?'#C4853A':'#4A7C6F');
            return `<div style="background:var(--ivoire);border-radius:8px;padding:8px 4px"><div style="font-family:var(--font-display);font-size:1.4rem;font-weight:700;color:${c}">${v}</div><div style="font-size:0.6rem;color:var(--pierre);text-transform:uppercase">${l}</div></div>`;
          }).join('')}
        </div>
        <div style="font-size:0.68rem;color:var(--pierre);margin-top:6px;text-align:right">→ onglet Santé</div>
      </div>
    </div>` : ''}

    ${a.alertes.length ? `<div class="m6-card" style="margin-bottom:14px"><div class="m6-card-header"><div class="m6-card-icon">⚠️</div><div><div class="m6-card-label">Vigilance</div><div class="m6-card-title">${a.alertes.length} point(s)</div></div></div><div class="m6-card-body" style="padding-bottom:8px">${a.alertes.map(al=>`<div class="m6-alert ${al.niveau}" style="margin-bottom:8px"><span class="m6-alert-icon">${al.icon}</span><div><strong>${al.titre}</strong><br><span style="font-size:0.77rem">${al.texte}</span><br><span style="font-size:0.65rem;color:var(--pierre)">Art. ${al.loi}</span></div></div>`).join('')}</div></div>` : `<div class="m6-alert success" style="margin-bottom:14px"><span class="m6-alert-icon">✅</span><div><strong>Situation conforme</strong> — Aucune alerte pour ${this._year}.</div></div>`}

    ${a.rachetes > 0 ? `<div class="m6-alert info" style="margin-bottom:14px;font-size:0.72rem"><span>💡</span><div><strong>Rachat : comment ça marche ?</strong><br>Saisir "Rachat" convertit un jour de RTT/repos en jour travaillé (+1 au compteur). Votre employeur vous verse le salaire journalier majoré de <strong>${this._contract.tauxMajorationRachat||10}%</strong>. Avenant écrit obligatoire AVANT le rachat (Art. L3121-59).</div></div>` : ""}
    ${a.simulRachat ? `<div class="m6-card" style="margin-bottom:14px"><div class="m6-card-header"><div class="m6-card-icon">💰</div><div><div class="m6-card-label">Rachat calculé automatiquement</div><div class="m6-card-title">+${a.simulRachat.majoration}% majoré</div></div></div><div class="m6-card-body"><div class="m6-row"><span class="m6-row-label">Jours rachetés</span><span class="m6-row-val">${a.simulRachat.joursRachetes}j</span></div><div class="m6-row"><span class="m6-row-label">Base brute</span><span class="m6-row-val">${a.simulRachat.montantBase}€</span></div><div class="m6-row"><span class="m6-row-label">Majoration ${a.simulRachat.majoration}%</span><span class="m6-row-val gold">+${a.simulRachat.gainBrut}€</span></div><div class="m6-row"><span style="font-weight:600">Total brut</span><span class="m6-row-val gold" style="font-family:var(--font-display);font-size:1.2rem">${a.simulRachat.montantMajoré}€</span></div></div></div>` : ""}

    ${(this._contract.ccnLabel||'').toLowerCase().includes('syntec') ? `<div class="m6-alert warning" style="margin-bottom:14px"><span class="m6-alert-icon">⚠️</span><div><strong>Vigilance CCN Syntec</strong><br><span style="font-size:0.77rem">La CCN Syntec impose un suivi de charge renforcé (art. 3 de l'accord du 22/06/1999). Entretiens semestriels obligatoires. Un mode manuel est disponible pour les accords de branche dérogatoires.</span></div></div>` : ''}

    <button class="m6-btn m6-btn-primary" id="vfj-saisir" style="margin-bottom:8px">＋ Saisir aujourd'hui</button>
    <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap">
      <button class="m6-btn m6-btn-ghost" id="pdf-a" style="flex:1;min-width:110px;font-size:0.78rem">📋 PDF Annuel</button>
      
    </div>
    <div style="font-size:0.7rem;color:var(--pierre);text-align:center;margin-top:6px">→ Onglet <strong>Exports</strong> pour PDF mensuel, période libre, validations et JSON</div>`;
  },

  _bindBilan(analysis, bio) {
    this._c.querySelector('#vfj-saisir')?.addEventListener('click', () => {
      if (window.M6_Calendar) {
        this._section = 'calendrier'; this.render();
        setTimeout(() => M6_Calendar._openPopup(new Date().toISOString().slice(0,10)), 300);
      }
    });
    this._c.querySelector('#bio-card')?.addEventListener('click', () => { this._section='bio'; this.render(); });
    // Tooltip RTT clickable
    const tipWrap = this._c.querySelector('#rtt-tip-wrap');
    if (tipWrap) tipWrap.addEventListener('click', e => { e.stopPropagation(); tipWrap.classList.toggle('open'); });
    document.addEventListener('click', () => tipWrap?.classList.remove('open'), { once: false });
    // ── PDF Annuel + Preuve (boutons présents dans le bilan) ─────
    this._c.querySelector('#pdf-a')?.addEventListener('click', () => {
      if (!window.M6_PDF) { M6_toast?.('Module PDF non chargé'); return; }
      M6_PDF.exportAnnuel({
        regime: this._regime, year: this._year, contract: this._contract,
        data: this._data, moods: this._moods, analysis
      });
    });
    this._c.querySelector('#pdf-preuve')?.addEventListener('click', () => {
      if (!window.M6_PDF?.exportPreuve) { M6_toast?.('Mode Preuve non disponible'); return; }
      M6_PDF.exportPreuve({
        regime: this._regime, year: this._year, contract: this._contract,
        data: this._data, analysis
      });
    });
  },

  _renderCal(ct) {
    ct.innerHTML = '<div id="cal-root"></div>';
    M6_Calendar.init(ct.querySelector('#cal-root'), this._regime, this._year, this._data, this._moods, (dk,v,m) => this._save(dk,v,m), this._contract);
  },

  // ── BIO ─────────────────────────────────────────────────────
  _tplBio(bio) {
    if (!bio.hasData) return `<div class="m6-alert info" style="margin-top:16px"><span>ℹ️</span><div>Saisissez des jours avec leur niveau de charge pour voir l'analyse.</div></div>`;
    const bar = (label, val, inv) => {
      const c = inv ? (val>60?'#B85C50':val>35?'#C4853A':'#4A7C6F') : (val<40?'#B85C50':val<65?'#C4853A':'#4A7C6F');
      return `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:4px"><span>${label}</span><span style="font-family:var(--font-display);font-size:1rem;font-weight:700;color:${c}">${val}</span></div><div style="height:8px;background:var(--ivoire-2);border-radius:99px;overflow:hidden"><div style="height:100%;width:${val}%;border-radius:99px;background:${c}"></div></div></div>`;
    };
    return `
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Santé & Bien-être</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px">
      <div class="m6-card-header"><div class="m6-card-icon" style="background:${bio.phase?.color}20">🩺</div><div><div class="m6-card-label">Phase INRS</div><div class="m6-card-title" style="color:${bio.phase?.color}">${bio.phase?.code} — ${bio.phase?.label}</div></div></div>
      <div class="m6-card-body">${bar('Fatigue accumulée',bio.fatigue,true)}${bar('Stress chronique',bio.stress,true)}${bar('Capacité de récupération',bio.recovery,false)}${bar('Performance estimée (Pencavel)',bio.performance,false)}</div>
    </div>
    <div class="m6-card" style="margin-bottom:14px">
      <div class="m6-card-header"><div class="m6-card-icon">❤️</div><div><div class="m6-card-label">Long terme</div><div class="m6-card-title">Risques CV & cognitif</div></div></div>
      <div class="m6-card-body">${bar('Risque CV (OMS/OIT 2021)',bio.cvRisk,true)}${bar('Charge cognitive (Jang 2025)',bio.cogRisk,true)}<div style="font-size:0.7rem;color:var(--pierre);margin-top:6px">Pega F. et al. WHO/ILO 2021 · Kivimäki 2015 (Lancet) · Jang W. et al. 2025</div></div>
    </div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body"><div class="m6-card-label" style="margin-bottom:8px">Répartition de la charge déclarée</div><div style="display:flex;gap:8px;flex-wrap:wrap">
      ${(()=>{
        // Mapping commun avec calendar.js (clé sans accent : 'eleve')
        // mais l'app utilise parfois 'elevé' historiquement → on tente les deux
        const DEFAULTS = {
          faible:   {bg:'#E8F5F0',border:'#2D6A4F',text:'#1A4035',icon:'🌿',label:'Légère'},
          ok:       {bg:'#EEF3FA',border:'#3B6098',text:'#1E3A5F',icon:'✓', label:'Normale'},
          eleve:    {bg:'#FFF7E6',border:'#C4853A',text:'#8B5A1A',icon:'⚡',label:'Soutenue'},
          critique: {bg:'#FFF0EE',border:'#B85C50',text:'#7A3028',icon:'🔥',label:'Critique'},
        };
        const MC = window.M6_MOOD_COLORS || window.MOOD_COLORS || DEFAULTS;
        const moods = this._moods || {};
        // Décapsuler récursivement si on tombe sur d'anciennes données mal stockées
        // {niveau:{niveau:'eleve'}} → 'eleve'
        const _flatNiv = (m) => {
          let n = m?.niveau;
          while (n && typeof n === 'object') n = n.niveau;
          return (typeof n === 'string') ? n : null;
        };
        // Compter sur les deux orthographes possibles (eleve / elevé)
        const countNiveau = (...niveaux) =>
          Object.values(moods).filter(m => niveaux.includes(_flatNiv(m))).length;
        return ['faible','ok','eleve','critique'].map(niv => {
          // Toujours utiliser le défaut si la palette source manque l'icône ou utilise la mauvaise clé
          const c = MC[niv] || (niv==='eleve' && MC['elevé']) || DEFAULTS[niv];
          const n = niv === 'eleve' ? countNiveau('eleve','elevé') : countNiveau(niv);
          return `<div style="background:${c.bg};border:1px solid ${c.border};border-radius:10px;padding:10px 14px;text-align:center;min-width:60px"><div style="font-size:1.4rem">${c.icon}</div><div style="font-family:var(--font-display);font-size:1.3rem;font-weight:700;color:${c.text}">${n}</div><div style="font-size:0.65rem;color:${c.text};opacity:0.8">${c.label}</div></div>`;
        }).join('');
      })()}
    </div></div></div>
    ${bio.alertesBio.length ? bio.alertesBio.map(al=>`<div class="m6-alert ${al.niv}" style="margin-bottom:10px"><span class="m6-alert-icon">!</span><div><strong>${al.titre}</strong><br><span style="font-size:0.77rem">${al.texte}</span></div></div>`).join('') : ''}`;
  },

  // ── EXPORT ───────────────────────────────────────────────────
  _tplExport(a) {
    const valid = M6_Storage.getValidations(this._regime, this._year);
    const log   = M6_Storage.getLog(this._regime, this._year).slice(-8).reverse();
    const as    = M6_Storage.getAutoSaveDate(this._regime, this._year);
    const fs    = M6_Storage.getFileSaveDate(this._regime, this._year);
    const yrs   = M6_Storage.getAllYears(this._regime);
    return `
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Sauvegarde</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body" style="padding:10px 14px">
      <div class="m6-row"><span class="m6-row-label">🟢 Application</span><span class="m6-row-val" style="font-size:0.73rem">${as?new Date(as).toLocaleString('fr-FR'):'—'}</span></div>
      <div class="m6-row"><span class="m6-row-label">💾 Fichier</span><span class="m6-row-val" style="font-size:0.73rem;color:${fs?'var(--succes)':'var(--alerte)'}">${fs?new Date(fs).toLocaleString('fr-FR'):'Jamais exporté ⚠️'}</span></div>
    </div></div>

    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Export PDF</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body">
      <div class="m6-field"><label>Mois à exporter</label>
        <select id="pdf-mois" style="font-size:14px">${['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'].map((m,i)=>`<option value="${i}" ${i===new Date().getMonth()?'selected':''}>${m}</option>`).join('')}</select></div>
      <div class="m6-field"><label>Votre nom</label><input type="text" id="pdf-nom" value="${this._contract.nomCadre||''}" placeholder="Prénom NOM" style="font-size:16px"></div>
      <div class="m6-field"><label>Nom manager</label><input type="text" id="pdf-mgr" value="${this._contract.nomManager||''}" placeholder="Prénom NOM" style="font-size:16px"></div>
      <div class="m6-field"><label>Email manager (copie PDF)</label><input type="email" id="pdf-mgr-email" value="${this._contract.emailManager||''}" placeholder="manager@entreprise.fr" style="font-size:16px"></div>
      
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="m6-btn m6-btn-ghost" id="pdf-m" style="flex:1;min-width:110px;font-size:0.78rem">📄 PDF Mensuel</button>
        <button class="m6-btn m6-btn-ghost" id="pdf-a" style="flex:1;min-width:110px;font-size:0.78rem">📋 PDF Annuel</button>
        
      </div>
    </div></div>

    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">PDF Période personnalisée</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body">
      <div class="m6-field">
        <label>Date de début</label>
        <input type="date" id="pdf-per-d1" value="${this._year}-01-01" style="font-size:16px">
      </div>
      <div class="m6-field">
        <label>Date de fin</label>
        <input type="date" id="pdf-per-d2" value="${new Date().toISOString().slice(0,10)}" style="font-size:16px">
      </div>
      <button class="m6-btn m6-btn-ghost" id="pdf-per" style="width:100%;font-size:0.78rem">📄 PDF Période</button>
    </div></div>

    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Validation mensuelle</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body">
      <div class="m6-field"><label>Mois à valider</label>
        <select id="v-mois" style="font-size:14px">${['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'].map((m,i)=>`<option value="${i}">${m}${valid[i]?' ✓':''}</option>`).join('')}</select></div>
      <div class="m6-field"><label>Votre nom</label><input type="text" id="v-nom" value="${this._contract.nomCadre||''}" style="font-size:16px"></div>
      <button class="m6-btn m6-btn-gold" id="v-btn" style="font-size:0.8rem">🔏 Valider</button>
      ${Object.entries(valid).length?`<div style="margin-top:10px">${Object.entries(valid).sort(([a],[b])=>a-b).map(([m,v])=>`<div class="m6-row"><span class="m6-row-label">${['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc'][m]}</span><span style="font-size:0.65rem;color:var(--pierre)">${new Date(v.ts).toLocaleString('fr-FR',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'})} · #${v.hash}</span></div>`).join('')}</div>`:''}
    </div></div>

    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">JSON — Exercices : ${yrs.join(', ')}</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body">
      <div style="display:flex;gap:8px;margin-bottom:8px">
        <button class="m6-btn m6-btn-primary" id="exp-j" style="flex:1;font-size:0.78rem">💾 Exporter JSON</button>
        <button class="m6-btn m6-btn-primary" id="exp-csv" style="flex:1;font-size:0.78rem">📊 CSV SIRH</button>
        <button class="m6-btn m6-btn-ghost" id="imp-j" style="flex:1;font-size:0.78rem">📂 Importer</button>
      </div>
      <button class="m6-btn m6-btn-ghost" id="rgpd" style="width:100%;font-size:0.75rem">📋 Export RGPD complet</button>
    </div></div>

    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Simulateur — Rupture conventionnelle</div><div class="m6-ornement-line"></div></div>
    <div id="rupture-container"></div>

    <div style="display:none"><!-- placeholder pour eviter la double fermeture --></div
    </div></div>

    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Historique des modifications</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card"><div class="m6-card-body">
      ${!log.length ? '<div style="font-size:0.78rem;color:var(--pierre)">Aucune modification.</div>' :
        log.map(l=>`<div class="m6-row" style="padding:5px 0;align-items:flex-start"><div><div style="font-size:0.72rem;font-weight:500">${l.action}</div><div style="font-size:0.65rem;color:var(--pierre)">${l.detail}</div></div><span style="font-size:0.6rem;color:var(--pierre);flex-shrink:0;margin-left:8px">${new Date(l.ts).toLocaleString('fr-FR',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'})}</span></div>`).join('')}
    </div></div>`;
  },

  _bindExport(analysis) {
    const saveMeta = () => {
      const nom = this._c.querySelector('#pdf-nom')?.value.trim();
      const mgr = this._c.querySelector('#pdf-mgr')?.value.trim();
      const emailMgr = this._c.querySelector('#pdf-mgr-email')?.value.trim();
      if (nom||mgr) { this._contract.nomCadre=nom||''; this._contract.nomManager=mgr||''; this._contract.emailManager=emailMgr||''; M6_Storage.setContract(this._regime,this._contract); }
    };
    const checkCertif = () => {
      return true;
    };
    this._c.querySelector('#pdf-per')?.addEventListener('click', () => {
      if(!checkCertif()) return;
      const d1 = this._c.querySelector('#pdf-per-d1')?.value;
      const d2 = this._c.querySelector('#pdf-per-d2')?.value;
      if(!d1||!d2||d1>d2){M6_toast('Vérifiez les dates');return;}
      saveMeta();
      M6_PDF.exportPeriode({regime:this._regime,year:this._year,contract:this._contract,data:this._data,moods:this._moods,dateDebut:d1,dateFin:d2});
    });
    this._c.querySelector('#pdf-m')?.addEventListener('click', () => {
      if(!checkCertif()) return; saveMeta();
      M6_PDF.exportMensuel({regime:this._regime,year:this._year,mois:parseInt(this._c.querySelector('#pdf-mois')?.value),contract:this._contract,data:this._data,moods:this._moods,analysis,validations:M6_Storage.getValidations(this._regime,this._year)});
      this._tryEmailManager('mensuel');
    });
    this._c.querySelector('#pdf-a')?.addEventListener('click', () => {
      if(!checkCertif()) return; saveMeta();
      M6_PDF.exportAnnuel({regime:this._regime,year:this._year,contract:this._contract,data:this._data,moods:this._moods,analysis});
      this._tryEmailManager('annuel');
    });
    this._c.querySelector('#pdf-preuve')?.addEventListener('click', () => {
      saveMeta();
      M6_PDF.exportPreuve({regime:this._regime,year:this._year,contract:this._contract,data:this._data,analysis});
    });
    this._c.querySelector('#v-btn')?.addEventListener('click', () => {
      const m=parseInt(this._c.querySelector('#v-mois')?.value),nom=this._c.querySelector('#v-nom')?.value.trim(); if(!nom){M6_toast('Saisissez votre nom');return;} M6_Storage.addValidation(this._regime,this._year,m,nom); M6_toast('🔏 Validé'); this.render();
    });
    // Mode Preuve
    const preuveContainer = this._c.querySelector('#preuve-container');
    if (preuveContainer && window.M6_ModePreuve) {
      M6_ModePreuve.renderUI(preuveContainer, this._regime, this._year, this._contract, this._data, analysis);
    }
    this._c.querySelector('#exp-j')?.addEventListener('click', () => M6_ImportExport.export(this._regime));
    this._c.querySelector('#exp-csv')?.addEventListener('click', () => M6_ImportExport.exportCSV(this._regime, this._year));
    this._c.querySelector('#imp-j')?.addEventListener('click', () => M6_ImportExport.import(this._regime,()=>{this._load();this.render();}));

    // Calculateur rupture
    const ruptureContainer = this._c.querySelector('#rupture-container');
    if (ruptureContainer && window.M6_RuptureCalculateur) {
      M6_RuptureCalculateur.renderUI(ruptureContainer, this._contract);
    }
    this._c.querySelector('#rgpd')?.addEventListener('click', () => M6_ImportExport.exportRGPD());
  },

  // Destroy popup à chaque navigation de section (recréé dans render())
  _tryEmailManager(type) {
    const email = this._contract.emailManager;
    if (!email) return;
    const nom = this._contract.nomCadre || 'Cadre';
    const mgr = this._contract.nomManager || 'Manager';
    const subject = encodeURIComponent(`[M6 Cadres] Rapport forfait jours ${type} — ${nom} — ${this._year}`);
    const body = encodeURIComponent(
      `Bonjour ${mgr},\n\nVeuillez trouver ci-joint le rapport de suivi de forfait jours ${type} de ${nom} pour l'année ${this._year}.\n\nCe document a été généré et certifié via l'application M6 Cadres (Art. L3121-65 du Code du travail).\n\nCordialement,\n${nom}`
    );
    // Ouvrir le client mail après un délai (pour laisser le PDF se télécharger)
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = `mailto:${email}?subject=${subject}&body=${body}`;
      a.click();
    }, 1500);
    M6_toast(`📧 Email de copie préparé pour ${email}`);
  },

  _destroyPopup() {
    if (window.M6_ZenjiPopup) M6_ZenjiPopup.destroy();
  },

  _openNewYear() {
    const y = prompt(`Créer un exercice (ex : ${this._year+1})`, this._year+1);
    if (!y||isNaN(y)) return;
    const yr = parseInt(y);
    M6_Storage.createYear(this._regime, yr);
    this._year = yr; M6_Storage.setActiveYear(this._regime, yr);
    this._load(); this.render(); M6_toast(`✓ Exercice ${yr} créé`);
  },

  _tplSetup() {
    const c = this._contract || {};
    const isEdit = !!c.plafond; // déjà configuré → mode édition
    return `<div style="padding:32px 16px;padding-top:calc(40px + env(safe-area-inset-top,0));min-height:100dvh;background:var(--ivoire)">
      <div class="m6-ornement" style="margin-top:0"><div class="m6-ornement-line"></div><div class="m6-ornement-text">${isEdit?'Modifier ma configuration':'Configuration Forfait Jours'}</div><div class="m6-ornement-line"></div></div>
      ${isEdit?`<div class="m6-alert info" style="margin-bottom:12px;font-size:0.78rem"><span>✏️</span><div>Vos paramètres actuels sont pré-remplis. Modifiez uniquement ce qui change — vos données saisies (jours, RTT, entretiens) sont conservées.</div></div>`:''}
      <div class="m6-card"><div class="m6-card-body">
        <div class="m6-field"><label>Plafond annuel (jours)</label><input type="number" id="s-p" value="${c.plafond||218}" min="100" max="366" style="font-size:16px"></div>
        <div class="m6-field"><label>Congés payés contractuels (ex: 25, 25.5, 27)</label><input type="number" id="s-cp" value="${c.joursCPContrat||25}" min="25" max="40" step="0.5" style="font-size:16px"></div>
        <div class="m6-field">
          <label>RTT par an <small style="color:var(--pierre);font-weight:400">— laissez vide pour calcul automatique</small></label>
          <input type="number" id="s-rtt" value="${c.rttManuel!==undefined&&c.rttManuel!==null?c.rttManuel:''}" min="0" max="40" step="0.5" placeholder="auto" style="font-size:16px">
          <div style="font-size:0.68rem;color:var(--pierre);margin-top:4px">Si votre accord prévoit un nombre fixe de RTT (ex: 12), saisissez-le. Sinon le calcul s'effectue automatiquement selon le plafond et les jours ouvrés.</div>
        </div>
        <div class="m6-field"><label>Début de l'exercice <small style="color:var(--pierre);font-weight:400">(laisser vide = 1er janvier)</small></label><input type="date" id="s-debut" value="${c.dateDebutExercice||''}" placeholder="${this._year}-01-01" style="font-size:16px"></div>
        <div class="m6-field"><label>Fin de l'exercice <small style="color:var(--pierre);font-weight:400">(laisser vide = 31 décembre)</small></label><input type="date" id="s-fin" value="${c.dateFinExercice||''}" placeholder="${this._year}-12-31" style="font-size:16px"></div>
        <div class="m6-field" style="position:relative">
          <label>CCN applicable — tapez pour chercher</label>
          <input type="text" id="s-ccn" value="${(c.ccnLabel||'').replace(/"/g,'&quot;')}" placeholder="ex : Syntec, 787, Banque AFB…" style="font-size:16px" autocomplete="off">
          <div id="s-ccn-drop" style="display:none;position:absolute;left:0;right:0;top:100%;background:#fff;border:1px solid var(--ivoire-3);border-radius:var(--radius);z-index:100;box-shadow:var(--shadow);max-height:200px;overflow-y:auto"></div>
          <div id="s-ccn-info" style="display:none;margin-top:6px"></div>
        </div>
        <!-- Mode manuel — accord de branche dérogatoire -->
        <details style="margin-bottom:12px" ${c.refAccordDerogatoire?'open':''}>
          <summary style="font-size:0.78rem;color:var(--pierre);cursor:pointer;padding:8px 0">⚙️ Mode manuel — accord de branche dérogatoire${c.refAccordDerogatoire?' <span style="color:var(--champagne-2);font-weight:600">· renseigné</span>':''}</summary>
          <div style="background:var(--ivoire-2);border-radius:var(--radius);padding:12px;margin-top:6px">
            <div style="font-size:0.72rem;color:var(--pierre);margin-bottom:10px">Si votre accord de branche ou d'entreprise déroge au droit commun, renseignez directement les valeurs applicables. Ces données écrasent celles de la CCN sélectionnée.</div>
            <div class="m6-field"><label>Plafond personnalisé (jours)</label><input type="number" id="s-plafond-manuel" value="${c.plafondManuel||''}" min="100" max="366" placeholder="ex: 205" style="font-size:16px"></div>
            <div class="m6-field"><label>Taux de rachat personnalisé (%)</label><input type="number" id="s-taux-rachat-manuel" value="${c.tauxRachatManuel||''}" min="10" max="100" placeholder="ex: 25" style="font-size:16px"></div>
            <div class="m6-field"><label>Référence de l'accord dérogatoire</label><input type="text" id="s-ref-accord" value="${(c.refAccordDerogatoire||'').replace(/"/g,'&quot;')}" placeholder="ex: Accord d'entreprise XYZ du 01/01/2024" style="font-size:16px"></div>
          </div>
        </details>
        <div class="m6-field"><label>Taux journalier brut (€)</label><input type="number" id="s-tj" min="0" step="10" value="${c.tauxJournalier||''}" placeholder="ex : 350" style="font-size:16px"></div>
        <div class="m6-field"><label>Votre nom (PDF)</label><input type="text" id="s-nom" value="${(c.nomCadre||'').replace(/"/g,'&quot;')}" placeholder="Prénom NOM" style="font-size:16px"></div>
        <div class="m6-field"><label>Date d'arrivée si en cours d'année <small style="color:var(--pierre);font-weight:400">(prorata uniquement si renseignée)</small></label><input type="date" id="s-arr" value="${c.dateArrivee||''}" style="font-size:16px"></div>
        <div class="m6-field"><label>Taux majoration rachat (%)</label><input type="number" id="s-maj" value="${c.tauxMajorationRachat||10}" min="10" max="100" style="font-size:16px"></div>
        <button class="m6-btn m6-btn-gold" id="s-save">${isEdit?'💾 Enregistrer les modifications':'Commencer →'}</button>
        ${isEdit?`<button class="m6-btn m6-btn-ghost" id="s-cancel" style="margin-top:8px;width:100%;font-size:0.8rem">Annuler</button>`:''}
      </div></div>
      <div class="m6-alert info" style="margin-top:12px"><span>ℹ️</span><div>Plafond légal : <strong>218 jours</strong> (L3121-64). Le prorata ne s'applique que si une date d'arrivée est saisie ci-dessus.</div></div>
      <a href="../menu.html" style="display:block;text-align:center;margin-top:20px;font-size:0.8rem;color:var(--pierre)">← Menu</a>
    </div>`;
  },

  _bindSetup() {
    // Bind autocomplete CCN immédiatement (source : conventions-cadres.js — forfait_jours)
    if (window.M6_CCN_Adapter) {
      const inp  = this._c.querySelector('#s-ccn');
      const drop = this._c.querySelector('#s-ccn-drop');
      const info = this._c.querySelector('#s-ccn-info');
      M6_CCN_Adapter.bindAutocomplete(inp, drop, (ccn) => {
        const defaults = M6_CCN_Adapter.buildContractDefaults(ccn, 'forfait_jours');
        // Pré-remplir les champs selon les données CCN cadres
        const pEl  = this._c.querySelector('#s-p');
        const majEl = this._c.querySelector('#s-maj');
        // Pré-remplir le plafond depuis la CCN UNIQUEMENT si l'utilisateur n'a pas saisi de valeur custom
        // (ne JAMAIS écraser une valeur saisie manuellement)
        if (pEl && defaults.plafond) {
          const current = parseInt(pEl.value);
          const isDefault = isNaN(current) || current === 218;
          if (isDefault && defaults.plafond !== 218) pEl.value = defaults.plafond;
        }
        if (majEl && defaults.tauxMajorationRachat > 10) majEl.value = defaults.tauxMajorationRachat;
        // Carte info CCN
        if (info) {
          info.style.display = 'block';
          info.innerHTML = M6_CCN_Adapter.renderCCNCard(ccn, 'forfait_jours');
        }
        // Alertes CCN
        const alertesCC = M6_CCN_Adapter.getAlertes(ccn.idcc, 'forfait_jours');
        if (alertesCC.length && info) {
          const existing = info.querySelector('.ccn-alertes');
          if (!existing) {
            const div = document.createElement('div');
            div.className = 'ccn-alertes';
            div.style.cssText = 'margin-top:8px';
            div.innerHTML = alertesCC.map(a =>
              `<div class="m6-alert ${a.niveau}" style="margin-bottom:6px;font-size:0.72rem">
                <span>${a.niveau==='warning'?'⚠️':'ℹ️'}</span>
                <div><strong>${a.titre}</strong><br>${a.texte}</div>
              </div>`
            ).join('');
            info.appendChild(div);
          }
        }
      }, 'forfait_jours');
    }
    this._c.querySelector('#s-save')?.addEventListener('click', () => {
      const $ = (id) => this._c.querySelector(id);
      const plafondManuel = parseInt($('#s-plafond-manuel')?.value) || null;
      const tauxRachatManuel = parseInt($('#s-taux-rachat-manuel')?.value) || null;
      // RTT manuel : null si vide (calcul auto), sinon la valeur saisie
      const _rttInput = $('#s-rtt')?.value;
      const rttManuel = (_rttInput===undefined||_rttInput===''||isNaN(parseFloat(_rttInput)))
        ? null : parseFloat(_rttInput);
      const existing = this._contract || {};
      const c = {
        ...existing,
        plafond: plafondManuel || parseInt($('#s-p')?.value) || 218,
        plafondManuel,
        tauxRachatManuel,
        joursCPContrat: parseFloat($('#s-cp')?.value) || 25,
        rttManuel,
        ccnLabel: $('#s-ccn')?.value.trim() || existing.ccnLabel || '',
        tauxJournalier: parseFloat($('#s-tj')?.value) || 0,
        nomCadre: $('#s-nom')?.value.trim() || existing.nomCadre || '',
        dateArrivee: $('#s-arr')?.value || null,
        tauxMajorationRachat: tauxRachatManuel || parseInt($('#s-maj')?.value) || 10,
        dateDebutExercice: $('#s-debut')?.value || null,
        dateFinExercice: $('#s-fin')?.value || null,
        refAccordDerogatoire: $('#s-ref-accord')?.value.trim() || null,
      };
      M6_Storage.setContract(this._regime, c);
      M6_Storage.createYear(this._regime, this._year);
      this._load(); this.render();
      M6_toast?.('💾 Configuration enregistrée');
    });
    // Bouton Annuler (mode édition uniquement)
    this._c.querySelector('#s-cancel')?.addEventListener('click', () => {
      this._load(); this.render();
    });
  },

  _editContract() {
    // NE PAS effacer le contrat — juste afficher le wizard pré-rempli
    this._c.innerHTML = this._tplSetup();
    this._bindSetup();
  }
};

global.VFJ = VFJ;
global.VFJ_editContract = () => VFJ._editContract();

})(window);
