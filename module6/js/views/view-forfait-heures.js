/**
 * VIEW-FORFAIT-HEURES — Orchestrateur complet M6 Forfait Heures
 * 5 onglets : Bilan · Semaines · Santé · Export · Glossaire
 */
'use strict';

(function(global) {

const VFH = {
  _c: null, _regime: 'forfait_heures',
  _year: new Date().getFullYear(),
  _section: 'bilan',
  _contract: null, _data: {},

  init(container) {
    this._c = container;
    this._year = M6_Storage.getActiveYear(this._regime);
    this._load(); this.render();
  },

  _load() {
    this._contract = M6_Storage.getContract(this._regime);
    this._data     = M6_Storage.getData(this._regime, this._year);
  },

  _save(wk, value) {
    if (value === null) {
      const d = M6_Storage.getData(this._regime, this._year);
      delete d[wk]; M6_Storage.setData(this._regime, this._year, d);
    } else {
      M6_Storage.setDay(this._regime, this._year, wk, value);
    }
    this._load(); this.render(); M6_toast('✓ Enregistré');
  },

  render() {
    if (!this._contract) { this._c.innerHTML = this._tplSetup(); this._bindSetup(); return; }
    const analysis = M6_ForfaitHeures.analyze(this._contract, this._data, this._year);
    const bio      = M6_BioEngine.analyzeForfaitHeures(this._contract, this._data, this._year);
    if (bio?.hasData && window.M6_PhaseAlert) M6_PhaseAlert.showIfNeeded(this._regime, this._year, bio.phase?.code, bio.fatigue);

    const yrs2 = M6_Storage.getAllYears(this._regime);
    const yrOpts2 = yrs2.map(y=>`<option value="${y}" ${y==this._year?'selected':''}>${y}</option>`).join('');
    const yrPickerHtml2 = `<span style="display:inline-flex;align-items:center;gap:3px">
      <button id="vfh-yr-prev" style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:var(--champagne);font-size:0.82rem;border-radius:6px;padding:1px 7px;cursor:pointer;line-height:1.2">‹</button>
      ${yrs2.length>1
        ? `<select id="vfh-yr-hdr" style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:var(--champagne);font-size:0.7rem;border-radius:6px;padding:2px 6px;-webkit-appearance:none">${yrOpts2}</select>`
        : `<span style="font-size:0.7rem;color:var(--champagne);min-width:32px;text-align:center;display:inline-block">${this._year}</span>`}
      <button id="vfh-yr-next" style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:var(--champagne);font-size:0.82rem;border-radius:6px;padding:1px 7px;cursor:pointer;line-height:1.2">›</button>
    </span>`;
    window.M6_Header?.set({
      title: `Forfait Heures ${this._year}`,
      sub: `Seuil ${this._formatH(this._contract.seuilHebdo)} · Contingent ${this._contract.contingent||220}h · ${analysis.totalHS}h HS`,
      showReset: true,
      showSwitch: true,
      onReset: () => {
        // NE PAS effacer le contrat — relancer le wizard pré-rempli pour modification
        if (window.M6_Router?._showWizard) M6_Router._showWizard(this._regime);
        else location.reload();
      },
      yearPicker: yrPickerHtml2,
    });
    this._c.innerHTML = `${this._tplNav()}<div class="m6-main m6-fade-in" id="vfh-ct" style="padding-top:8px"></div>`;
    const ct = this._c.querySelector('#vfh-ct');

    const zenjiMsg = window.M6_Zenji
      ? M6_Zenji.getContextMessage(this._section,
          this._section==='bilan'||this._section==='bio' ? {joursEffectifs:analysis.semaines,plafond:this._contract.contingent,rttPris:0,rttSolde:0,rachetes:0,alertes:analysis.alertes} : {},
          bio, this._contract)
      : '';
    const zenjiHtml = (zenjiMsg && this._section !== 'semaines')
      ? M6_Zenji.renderCard(zenjiMsg, bio?.phase?.code || 'P1', true)
      : '';

    try {
      switch(this._section) {
        case 'bilan':     ct.innerHTML = zenjiHtml + this._tplBilan(analysis,bio); this._bindBilan(analysis); this._bindFHTooltips(); break;
        case 'semaines':  ct.innerHTML = this._tplSemaines(analysis); this._bindSemaines(); break;
        case 'bio':       ct.innerHTML = zenjiHtml + this._tplBio(bio); break;
        case 'export':    ct.innerHTML = zenjiHtml + this._tplExport(analysis); this._bindExport(analysis); break;
        case 'validite':
          ct.innerHTML = zenjiHtml + '<div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">⚖ Validité juridique</div><div class="m6-ornement-line"></div></div><div id="vfh-validite-ct"></div>';
          if (window.M6_ValiditeFH) {
            window.M6_ValiditeFH.render(ct.querySelector('#vfh-validite-ct'), this._contract, analysis, this._year);
          } else {
            ct.innerHTML += '<div class="m6-alert info" style="margin:16px"><span>ℹ️</span><div>Module Validité non chargé.</div></div>';
          }
          break;
        case 'entretien':
          ct.innerHTML = zenjiHtml;
          if (window.M6_Entretien) M6_Entretien.renderForm(ct, this._regime, this._year, this._contract, analysis, ()=>{this._load();this.render();});
          else ct.innerHTML += '<div class="m6-alert info" style="margin:16px"><span>ℹ️</span><div>Module entretien non chargé.</div></div>';
          break;
        case 'tendances':
          ct.innerHTML = '<div style="padding:4px 0"></div>';
          if (window.M6_Charts) {
            // Pour FH on adapte les données hebdo → contrat proxy pour le graphique
            const fhContract = { ...this._contract, plafond: this._contract.seuilHebdo * 47 || 1833 };
            ct.innerHTML += M6_Charts.renderSection(analysis, bio, this._data, fhContract, this._year);
            requestAnimationFrame(() => M6_Charts.drawForfaitEvolution('m6-forfait-chart', this._data, analysis, this._year));
          } else {
            ct.innerHTML += '<div class="m6-alert info" style="margin:16px"><span>ℹ️</span><div>Module graphiques non chargé.</div></div>';
          }
          break;
        case 'glossaire':
          ct.innerHTML = zenjiHtml;
          if (window.M6_GlossaireUI) M6_GlossaireUI.render(ct, 'forfait_heures');
          else ct.innerHTML += '<div class="m6-alert info" style="margin:16px"><span>ℹ️</span><div>Module glossaire non chargé.</div></div>';
          break;
      }
    } catch(e) {
      ct.innerHTML = `<div class="m6-alert warning" style="margin:16px"><span>⚠️</span><div><strong>Erreur section ${this._section}</strong><br>${e.message}</div></div>`;
      console.error('[VFH render]', e);
    } finally {
      this._bindNav();
    }
    // Détruire l'ancienne bulle Zenji avant réinitialisation
    if (window.M6_ZenjiPopup) M6_ZenjiPopup.destroy();
    // Popup Zenji flottant
    if (window.M6_ZenjiPopup) {
      M6_ZenjiPopup.init(
        { joursEffectifs: analysis.semaines, plafond: analysis.contingent,
          // CRITIQUE : _selectPopup FH lit `a.semaines` pour détecter une saisie existante.
          // Sans ce champ, Zenji affichait "Saisissez vos premières semaines" même avec données.
          semaines:       analysis.semaines,
          totalHS:        analysis.totalHS,
          contingent:     analysis.contingent,
          tauxRemplissage:analysis.tauxRemplissage,
          rttPris:0, rttSolde:0, rachetes:0, cpPris:0,
          alertes: analysis.alertes,
          rttTheoriques:0, joursRestants: analysis.contingent - analysis.totalHS },
        bio, this._contract,
        (action) => {
          if(action.includes('Santé')||action.includes('santé')) { this._section='bio'; this.render(); }
          else if(action.includes('Export')||action.includes('PDF')) { this._section='export'; this.render(); }
          else if(action.includes('Glossaire')||action.includes('glossaire')) { this._section='glossaire'; this.render(); }
        },
        'forfait_heures'
      );
    }
    if(window.M6_AlertePhase && bio?.hasData) M6_AlertePhase.check(bio, 'forfait_heures');
    // M6 n'envoie AUCUNE notification (conformité Play Store / RGPD).
    // L'alerte phase P4 reste visible in-app via M6_AlertePhase ci-dessus.
  },

  _tplBilan(a, bio) {
    return `
    <div class="m6-stats-grid" style="margin-bottom:14px">
      <div class="m6-stat-box"><div class="m6-stat-val">${a.totalHS}h</div><div class="m6-stat-label">Total HS</div></div>
      <div class="m6-stat-box"><div class="m6-stat-val">${a.semaines}</div><div class="m6-stat-label">Semaines saisies</div></div>
      <div class="m6-stat-box"><div class="m6-stat-val">${a.totalHSTaux1}h</div><div class="m6-stat-label">HS à +${a.taux1}%</div></div>
      ${a.a3Paliers && a.taux_inter ? `<div class="m6-stat-box"><div class="m6-stat-val">${a.totalHSTaux_inter}h</div><div class="m6-stat-label">HS à +${a.taux_inter}%</div></div>` : ''}
      <div class="m6-stat-box"><div class="m6-stat-val">${a.totalHSTaux2}h</div><div class="m6-stat-label">HS à +${a.taux2}%</div></div>
      <div class="m6-stat-box" style="border-color:rgba(196,163,90,0.35)">
        <div class="m6-stat-val" style="color:var(--champagne-2)">${a.tauxHoraire>0?a.montantTotal.toFixed(0)+'€':'—'}</div>
        <div class="m6-stat-label">Montant brut HS</div>
      </div>
    </div>

    <!-- Barre de progression forfait heures -->
    <div class="m6-progress-bar-wrap">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px">
        <span style="font-size:0.72rem;font-weight:600;color:var(--charbon)">Consommation du contingent <span class="m6-tooltip-wrap" id="fh-cont-tip" style="cursor:pointer;font-size:0.65rem;color:var(--pierre)">ⓘ<span class="m6-tooltip-bubble">Contingent annuel de ${a.contingent||220}h fixé par votre CCN ou accord d'entreprise. Au-delà, une autorisation de l'inspection du travail peut être requise (Art. L3121-30).</span></span></span>
        <span style="font-size:0.72rem;color:${a.tauxRemplissage>=90?'var(--alerte)':'var(--pierre)'}"><strong>${a.totalHS}h</strong> / ${a.contingent||220}h</span>
      </div>
      <div class="m6-progress-track">
        <div class="m6-progress-fill" style="width:${Math.min(100,a.tauxRemplissage)}%;background:${a.tauxRemplissage>=100?'linear-gradient(90deg,#9B2C2C,#E53E3E)':a.tauxRemplissage>=90?'linear-gradient(90deg,var(--champagne-2),var(--champagne))':'linear-gradient(90deg,#2D6A4F,#4A7C6F)'}"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--pierre);margin-top:3px">
        <span>${a.tauxRemplissage}% utilisé</span>
        <span style="color:${(a.contingent||220)-a.totalHS <= 20?'var(--alerte)':'inherit'}">Reste : <strong>${Math.max(0,(a.contingent||220)-a.totalHS)}h</strong></span>
      </div>
    </div>

    ${a.tauxHoraire>0||this._contract.tauxHoraire>0?`<div class="m6-card" style="margin-bottom:14px"><div class="m6-card-header"><div class="m6-card-icon">💶</div><div><div class="m6-card-label">Loi TEPA 2007 ${a.ccnNom?'· '+a.ccnNom:''}</div><div class="m6-card-title">Réduction de cotisations salariales et exonération fiscale</div></div></div><div class="m6-card-body">
      <div class="m6-row"><span class="m6-row-label">HS à +${a.taux1||25}% (${a.palier||8}h/sem)</span><span class="m6-row-val">${(a.montantHS1||0).toFixed(2)} €</span></div>
      ${a.a3Paliers&&a.taux_inter?`<div class="m6-row"><span class="m6-row-label">HS à +${a.taux_inter}% (${a.palier_inter}h/sem)</span><span class="m6-row-val">${(a.montantHS_inter||0).toFixed(2)} €</span></div>`:''}
      <div class="m6-row"><span class="m6-row-label">HS à +${a.taux2||50}%</span><span class="m6-row-val">${(a.montantHS2||0).toFixed(2)} €</span></div>
      <div class="m6-row"><span style="font-weight:600">Total brut</span><span class="m6-row-val gold" style="font-family:var(--font-display);font-size:1.2rem">${(a.montantTotal||0).toFixed(2)} €</span></div>
      <div class="m6-row"><span class="m6-row-label">Exo IR (plaf. 7 500€/an)</span><span class="m6-row-val ok">${(a.exoFiscale||0).toFixed(2)} €</span></div>
      <div style="font-size:0.7rem;color:var(--pierre);margin-top:6px">Art. L241-17 CSS · Loi TEPA 2007 · Loi 2022-1158</div>
    </div></div>`:''}

    ${bio.hasData?`<div class="m6-card" style="margin-bottom:14px;cursor:pointer" id="fh-bio-card"><div class="m6-card-body" style="padding:12px 14px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><div class="m6-card-label">Santé — Phase ${bio.phase?.code}</div><span class="m6-badge" style="background:${bio.phase?.color}20;color:${bio.phase?.color};border-radius:99px;font-size:0.65rem;padding:2px 8px">${bio.phase?.label}</span></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;text-align:center">${[['Fatigue',bio.fatigue,true],['Stress',bio.stress,true],['Récup.',bio.recovery,false],['Perf.',bio.performance,false]].map(([l,v,inv])=>{const c=inv?(v>60?'#B85C50':v>35?'#C4853A':'#4A7C6F'):(v<40?'#B85C50':v<65?'#C4853A':'#4A7C6F');return `<div style="background:var(--ivoire);border-radius:8px;padding:8px 4px"><div style="font-family:var(--font-display);font-size:1.4rem;font-weight:700;color:${c}">${v}</div><div style="font-size:0.6rem;color:var(--pierre);text-transform:uppercase">${l}</div></div>`;}).join('')}</div><div style="font-size:0.68rem;color:var(--pierre);margin-top:6px;text-align:right">→ onglet Santé</div></div></div>`:''}

    ${a.alertes.length?a.alertes.map(al=>`<div class="m6-alert ${al.niveau}" style="margin-bottom:10px"><span class="m6-alert-icon">${al.icon}</span><div><strong>${al.titre}</strong><br><span style="font-size:0.77rem">${al.texte}</span><br><span style="font-size:0.65rem;color:var(--pierre)">Art. ${al.loi}</span></div></div>`).join('') : `<div class="m6-alert success" style="margin-bottom:14px"><span class="m6-alert-icon">✅</span><div><strong>Contingent conforme</strong> — Aucune alerte pour ${this._year}.</div></div>`}

    <button class="m6-btn m6-btn-primary" id="fh-saisir" style="margin-bottom:8px">＋ Saisir une semaine</button>
    <div style="display:flex;gap:8px">
      <button class="m6-btn m6-btn-ghost" id="fh-newyr" style="flex:1;font-size:0.78rem">📅 Nouvel exercice</button>
      <button class="m6-btn m6-btn-ghost" id="fh-edit-contract" style="flex:1;font-size:0.78rem">⚙️ Contrat</button>
    </div><div class="m6-alert info" style="margin-top:16px;font-size:0.72rem"><span>&#9878;&#65039;</span><div><strong>Information juridique.</strong> Outil indicatif et pedagogique &mdash; ni avis juridique ni valeur legale. Le forfait heures (hebdomadaire ou mensuel) doit etre prevu par une convention individuelle ecrite et respecter les durees maximales de travail et les repos obligatoires. Au-dela du forfait, les heures supplementaires restent dues. En cas de doute, rapproche-toi des representants du personnel, de l inspection du travail ou d un conseil juridique. Sources : Art. L3121-56 et s. du Code du travail &middot; Legifrance.</div></div>`;
  },

  _bindBilan(analysis) {
    this._c.querySelector('#fh-saisir')?.addEventListener('click', () => { this._section='semaines'; this.render(); setTimeout(()=>this._c.querySelector('#fh-add')?.click(),200); });
    this._c.querySelector('#fh-bio-card')?.addEventListener('click', () => { this._section='bio'; this.render(); });
    this._c.querySelector('#fh-newyr')?.addEventListener('click', () => { const y=prompt(`Exercice (ex: ${this._year+1})`,this._year+1); if(!y||isNaN(y))return; const yr=parseInt(y); M6_Storage.createYear(this._regime,yr); this._year=yr; M6_Storage.setActiveYear(this._regime, yr); this._load(); this.render(); M6_toast(`✓ Exercice ${yr} créé`); });
  },

  // ── SEMAINES ───────────────────────────────────────────────,
  _tplSemaines(a) {
    const entries = Object.entries(this._data).filter(([k])=>k.startsWith(String(this._year))).sort(([a],[b])=>b.localeCompare(a));
    const curWk   = M6_ForfaitHeures.isoWeek(new Date());
    return `
    <button class="m6-btn m6-btn-primary" id="fh-add" style="margin-bottom:14px">＋ Saisir une semaine</button>

    ${!entries.length?`<div class="m6-alert info"><span>📋</span><div>Aucune semaine saisie pour ${this._year}.</div></div>`:''}

    ${entries.map(([wk,v])=>{
      const h=parseFloat(v.heures)||0, extra=Math.max(0,h-a.seuil);
      // 3 paliers si CCN HCR/Restauration : palier1 + palier_inter + reste
      let hs1, hs_inter, hs2;
      if (a.taux_inter && a.palier_inter) {
        hs1      = Math.min(extra, a.palier);
        hs_inter = Math.min(Math.max(0, extra - a.palier), a.palier_inter);
        hs2      = Math.max(0, extra - a.palier - a.palier_inter);
      } else {
        hs1      = Math.min(extra, a.palier);
        hs_inter = 0;
        hs2      = Math.max(0, extra - a.palier);
      }
      const isCur=wk===curWk;
      const [,wn]=wk.split('-W');
      return `<div class="m6-card" style="margin-bottom:10px${isCur?';border-color:var(--champagne)':''}">
        <div class="m6-card-body" style="padding:12px 14px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--pierre)">S${wn}${isCur?' · <span class="m6-badge m6-badge-champagne">En cours</span>':''}</div>
              <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:600">${this._formatH(h)}</div>
            </div>
            <div style="text-align:right">
              ${extra>0?`<div style="font-size:0.78rem;color:var(--champagne-2);font-weight:500">+${this._formatH(extra)} HS</div><div style="font-size:0.68rem;color:var(--pierre)">${hs1>0?this._formatH(hs1)+' à +'+a.taux1+'%':''}${hs_inter>0?' · '+this._formatH(hs_inter)+' à +'+a.taux_inter+'%':''}${hs2>0?' · '+this._formatH(hs2)+' à +'+a.taux2+'%':''}</div>`:`<div style="font-size:0.78rem;color:var(--succes)">Conforme</div>`}
            </div>
            <button data-del="${wk}" style="background:none;border:none;color:var(--pierre);font-size:1rem;cursor:pointer;padding:4px 8px;margin-left:4px">✕</button>
          </div>
          ${v.note?`<div style="font-size:0.72rem;color:var(--pierre);margin-top:6px;font-style:italic">${v.note}</div>`:''}
        </div>
      </div>`;
    }).join('')}

    <!-- Overlay saisie -->
    <div class="m6-overlay" id="fh-overlay">
      <div class="m6-sheet" id="fh-sheet"></div>
    </div>`;
  },

  _bindSemaines() {
    const openForm = (prefill) => {
      const ov = this._c.querySelector('#fh-overlay');
      const sh = this._c.querySelector('#fh-sheet');
      if (!ov||!sh) return;
      let wk = prefill || M6_ForfaitHeures.isoWeek(new Date());
      let entry = this._data[wk]||{};
      // Mode saisie : 'global' (heures totales) ou 'jours' (par jour)
      let saisieMode = 'global';
      const jours = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
      const joursWE = [false,false,false,false,false,true,true]; // WE = Samedi + Dimanche
      const seuil = this._contract.seuilHebdo || 39;
      const hParJour = (seuil / 5).toFixed(2);

      const renderSheet = () => {
        const isDuplicate = !!this._data[wk] && !prefill;
        sh.innerHTML = `
          <div class="m6-sheet-title">Saisir une semaine</div>

          ${isDuplicate ? '<div class="m6-alert warning" style="margin-bottom:10px;font-size:0.78rem"><span>⚠️</span><div>Cette semaine est déjà saisie. Les données seront remplacées.</div></div>' : ''}

          <!-- Sélecteur de semaine RÉTROACTIF — n'importe quelle semaine -->
          <div class="m6-field">
            <label>Semaine à saisir (passée, actuelle ou future)</label>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
              <button type="button" id="fh-wk-prev" class="m6-btn m6-btn-ghost" style="padding:8px 12px;font-size:1rem;flex-shrink:0">‹</button>
              <input type="date" id="fh-date-nav" style="font-size:16px;flex:1"
                value="${(()=>{try{const yr=parseInt(wk);const wn=parseInt(wk.split('W')[1]);const d=new Date(yr,0,1+(wn-1)*7-(new Date(yr,0,1).getDay()||7)+1);return d.toISOString().slice(0,10);}catch(e){return new Date().toISOString().slice(0,10);}})()}">
              <button type="button" id="fh-wk-next" class="m6-btn m6-btn-ghost" style="padding:8px 12px;font-size:1rem;flex-shrink:0">›</button>
            </div>
            <div style="font-size:0.7rem;color:var(--pierre)">
              Semaine : <strong id="fh-wk-display">${wk}</strong>
              <span id="fh-wk-status" style="font-size:0.65rem;margin-left:4px;color:var(--champagne-2)">${this._data[wk]?'⚠️ déjà saisie — sera mise à jour':'✅ nouvelle saisie'}</span>
            </div>
          </div>

          <!-- Mode de saisie -->
          <div class="m6-tabs" style="margin-bottom:12px">
            <button class="m6-tab ${saisieMode==='global'?'active':''}" id="fh-mode-global">Total semaine</button>
            <button class="m6-tab ${saisieMode==='jours'?'active':''}" id="fh-mode-jours">Par jour</button>
          </div>

          <!-- Mode global -->
          <div id="fh-zone-global" style="${saisieMode==='jours'?'display:none':''}">
            <div class="m6-field">
              <label>Heures travaillées cette semaine (ex: 41.5)</label>
              <input type="number" id="fh-h" min="0" max="80" step="0.25"
                value="${entry.heures||''}" placeholder="${seuil}" style="font-size:16px">
              <div style="font-size:0.7rem;color:var(--pierre);margin-top:3px">
                Seuil contractuel : ${seuil}h · Au-delà = heures supplémentaires
              </div>
              <div id="fh-realtime-calcul" style="margin-top:8px;padding:8px 10px;background:var(--ivoire-2);border-radius:var(--radius);font-size:0.78rem;display:none">
                <span id="fh-rt-hs">0h</span> HS cette semaine · Contingent restant : <span id="fh-rt-reste">—</span>
              </div>
            </div>
          </div>

          <!-- Mode jours -->
          <div id="fh-zone-jours" style="${saisieMode==='global'?'display:none':''}">
            <div style="font-size:0.72rem;color:var(--pierre);margin-bottom:8px">
              Saisissez les heures par jour — le total est calculé automatiquement.
            </div>
            ${jours.map((j,i) => {
              const isWE = joursWE[i];
              const stored = entry.jours ? (entry.jours[i] ?? (isWE ? 0 : hParJour)) : (isWE ? 0 : hParJour);
              return `<div class="m6-field" style="margin-bottom:8px;${isWE?'opacity:0.7':''}">
                <label style="display:flex;justify-content:space-between">
                  <span>${j}${isWE?' <span style="font-size:0.65rem;color:var(--pierre)">(WE)</span>':''}</span>
                  <span id="fh-j${i}-val" style="color:var(--champagne-2)">${stored}h</span>
                </label>
                <input type="range" id="fh-j${i}" min="0" max="14" step="0.5" value="${stored}"
                  oninput="document.getElementById('fh-j${i}-val').textContent=this.value+'h';
                           const t=[0,1,2,3,4,5,6].reduce((s,x)=>s+(parseFloat(document.getElementById('fh-j'+x)?.value)||0),0);
                           document.getElementById('fh-total-jours').textContent=t.toFixed(1)+'h';">
              </div>`;
            }).join('')}
            <div style="display:flex;justify-content:space-between;font-size:0.82rem;font-weight:600;margin-top:4px;padding:8px;background:var(--ivoire-2);border-radius:var(--radius)">
              <span>Total semaine</span>
              <span id="fh-total-jours" style="color:var(--champagne-2)">
                ${entry.jours ? entry.jours.reduce((s,v)=>s+(v||0),0).toFixed(1) : (seuil).toFixed(1)}h
              </span>
            </div>
          </div>

          <div class="m6-field" style="margin-top:12px">
            <label>Note (déplacement, astreinte, télétravail…)</label>
            <input type="text" id="fh-note" value="${(entry.note||'').substring(0,200)}"
              placeholder="ex : 2j déplacement Lyon" style="font-size:16px" maxlength="200">
          </div>

          <!-- Attestation repos -->
          

          <button class="m6-btn m6-btn-primary" id="fh-sv">Enregistrer</button>
          <div style="height:8px"></div>
          <button class="m6-btn m6-btn-ghost" id="fh-cl" style="width:100%">Annuler</button>`;

        // Navigation par date → recharge l'entrée de CETTE semaine et re-render
        const navigateToWeek = (newWk) => {
          wk = newWk;
          entry = this._data[wk] || {};   // ← recharge les données de la semaine ciblée
          renderSheet();                   // re-render complet avec les bonnes valeurs
          bindRealtime();
        };
        sh.querySelector('#fh-date-nav')?.addEventListener('change', e => {
          const d = new Date(e.target.value + 'T12:00:00');
          navigateToWeek(M6_ForfaitHeures.isoWeek(d));
        });
        sh.querySelector('#fh-wk-prev')?.addEventListener('click', () => {
          const cur = sh.querySelector('#fh-date-nav');
          const d = new Date((cur?.value || new Date().toISOString().slice(0,10)) + 'T12:00:00');
          d.setDate(d.getDate() - 7);
          if (cur) cur.value = d.toISOString().slice(0,10);
          navigateToWeek(M6_ForfaitHeures.isoWeek(d));
        });
        sh.querySelector('#fh-wk-next')?.addEventListener('click', () => {
          const cur = sh.querySelector('#fh-date-nav');
          const d = new Date((cur?.value || new Date().toISOString().slice(0,10)) + 'T12:00:00');
          d.setDate(d.getDate() + 7);
          if (cur) cur.value = d.toISOString().slice(0,10);
          navigateToWeek(M6_ForfaitHeures.isoWeek(d));
        });

        // Bind mode toggle
        sh.querySelector('#fh-mode-global')?.addEventListener('click', () => {
          saisieMode = 'global';
          sh.querySelector('#fh-zone-global').style.display = '';
          sh.querySelector('#fh-zone-jours').style.display = 'none';
          sh.querySelector('#fh-mode-global').classList.add('active');
          sh.querySelector('#fh-mode-jours').classList.remove('active');
        });
        sh.querySelector('#fh-mode-jours')?.addEventListener('click', () => {
          saisieMode = 'jours';
          sh.querySelector('#fh-zone-global').style.display = 'none';
          sh.querySelector('#fh-zone-jours').style.display = '';
          sh.querySelector('#fh-mode-global').classList.remove('active');
          sh.querySelector('#fh-mode-jours').classList.add('active');
        });

        sh.querySelector('#fh-sv')?.addEventListener('click', () => {
          
          let heures, joursArr = null;
          if (saisieMode === 'jours') {
            joursArr = [0,1,2,3,4,5,6].map(i => parseFloat(sh.querySelector('#fh-j'+i)?.value) || 0);
            heures = Math.round(joursArr.reduce((s,v)=>s+v,0) * 100) / 100;
          } else {
            heures = parseFloat(sh.querySelector('#fh-h')?.value);
            if (isNaN(heures)) { M6_toast('Saisissez les heures'); return; }
          }
          const note = sh.querySelector('#fh-note')?.value.trim().replace(/['"]/g, '') || null;
          const payload = { heures, note };
          if (joursArr) payload.jours = joursArr;
          this._save(wk, payload);
          ov.classList.remove('open');
        });
      };

      renderSheet();
      // Calcul temps réel — affiche les HS et le reste du contingent
      const bindRealtime = () => {
        const hInput = sh.querySelector('#fh-h');
        const rtPanel = sh.querySelector('#fh-realtime-calcul');
        const rtHS = sh.querySelector('#fh-rt-hs');
        const rtReste = sh.querySelector('#fh-rt-reste');
        // PRIORITÉ : saisie manuelle (contract) > CCN > droit commun
        let ccnRules = null;
        if (window.CCN_API && this._contract?.ccnIdcc && this._contract.ccnIdcc > 0) {
          try { ccnRules = CCN_API.getGroupeForCCN(this._contract.ccnIdcc); } catch(_) {}
        }
        const seuilC     = this._contract?.seuilHebdo || ccnRules?.seuil || 35;
        const contingent = this._contract?.contingent || ccnRules?.contingent || 220;
        const totalHSActuel = Object.values(this._data).reduce((acc, v) => acc + Math.max(0, (v.heures||0) - seuilC), 0);
        const updateRT = () => {
          const h = parseFloat(hInput?.value) || 0;
          const hs = Math.max(0, h - seuilC);
          if (rtPanel && h > 0) { rtPanel.style.display = ''; }
          if (rtHS) rtHS.textContent = hs > 0 ? `+${hs.toFixed(1)}h HS` : '0h HS';
          const reste = Math.max(0, contingent - totalHSActuel - hs);
          if (rtReste) { rtReste.textContent = `${reste.toFixed(0)}h / ${contingent}h`; rtReste.style.color = reste < 20 ? 'var(--alerte)' : 'var(--succes)'; }
        };
        hInput?.addEventListener('input', updateRT);
        updateRT(); // initial render
      };
      bindRealtime();
      sh.querySelector('#fh-cl').addEventListener('click',()=>ov.classList.remove('open'));
      ov.addEventListener('click',e=>{if(e.target===ov)ov.classList.remove('open');});
      requestAnimationFrame(()=>ov.classList.add('open'));
    };
    this._c.querySelector('#fh-add')?.addEventListener('click', () => openForm());
    this._c.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click',()=>{this._save(b.dataset.del,null);}));
  },

  // ── BIO ─────────────────────────────────────────────────────,
  _tplBio(bio) {
    if (!bio.hasData) return `<div class="m6-alert info" style="margin-top:16px"><span>ℹ️</span><div>Saisissez des semaines pour voir l'analyse biologique.</div></div>`;
    const bar = (l,v,inv)=>{const c=inv?(v>60?'#B85C50':v>35?'#C4853A':'#4A7C6F'):(v<40?'#B85C50':v<65?'#C4853A':'#4A7C6F');return `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:4px"><span>${l}</span><span style="font-family:var(--font-display);font-size:1rem;font-weight:700;color:${c}">${v}</span></div><div style="height:8px;background:var(--ivoire-2);border-radius:99px;overflow:hidden"><div style="height:100%;width:${v}%;border-radius:99px;background:${c}"></div></div></div>`;};
    return `
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Santé & Bien-être</div><div class="m6-ornement-line"></div></div>
    <div class="m6-alert info" style="margin-bottom:12px;font-size:0.72rem"><span>⚠️</span><div>Le score de Risque CV est un <strong>indicateur épidémiologique</strong>, pas un diagnostic médical. Il ne remplace pas un avis médical. En cas de doute, consultez votre médecin du travail.</div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-header"><div class="m6-card-icon">🩺</div><div><div class="m6-card-label">Phase INRS</div><div class="m6-card-title" style="color:${bio.phase?.color}">${bio.phase?.code} — ${bio.phase?.label}</div></div></div><div class="m6-card-body">${bar('Fatigue',bio.fatigue,true)}${bar('Stress',bio.stress,true)}${bar('Récupération',bio.recovery,false)}${bar('Performance (Pencavel)',bio.performance,false)}</div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-header"><div class="m6-card-icon">❤️</div><div><div class="m6-card-label">Long terme</div><div class="m6-card-title">Risques</div></div></div><div class="m6-card-body">${bar('Risque CV (OMS/OIT 2021)',bio.cvRisk,true)}${bar('Charge cognitive',bio.cogRisk,true)}<div style="font-size:0.7rem;color:var(--pierre);margin-top:6px">Pega et al. WHO/ILO 2021 · Kivimäki 2015 · Jang 2025<br>⚠️ Ces indicateurs ne remplacent pas un avis médical.</div></div></div>
    <div class="m6-card"><div class="m6-card-body"><div class="m6-row"><span class="m6-row-label">Semaines saisies</span><span class="m6-row-val">${bio.details.n}</span></div><div class="m6-row"><span class="m6-row-label">Moyenne hebdo</span><span class="m6-row-val">${bio.details.mean}h</span></div><div class="m6-row"><span class="m6-row-label">Semaines surcharge (>120% seuil)</span><span class="m6-row-val">${bio.details.surcharge}</span></div></div></div>`;
  },

  // ── EXPORT ─────────────────────────────────────────────────,
  _tplExport(a) {
    const as=M6_Storage.getAutoSaveDate(this._regime,this._year), fs=M6_Storage.getFileSaveDate(this._regime,this._year);
    const log=M6_Storage.getLog(this._regime,this._year).slice(-6).reverse();
    const yrs=M6_Storage.getAllYears(this._regime);
    return `
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Sauvegarde</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body" style="padding:10px 14px"><div class="m6-row"><span class="m6-row-label">🟢 Application</span><span class="m6-row-val" style="font-size:0.73rem">${as?new Date(as).toLocaleString('fr-FR'):'—'}</span></div><div class="m6-row"><span class="m6-row-label">💾 Fichier</span><span class="m6-row-val" style="font-size:0.73rem;color:${fs?'var(--succes)':'var(--alerte)'}">${fs?new Date(fs).toLocaleString('fr-FR'):'Jamais exporté ⚠️'}</span></div></div></div>

    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Taux & PDF</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body">
      <div class="m6-field"><label>Taux horaire brut (€)</label><input type="number" id="fh-taux" value="${this._contract.tauxHoraire||''}" step="0.01" placeholder="25.50" style="font-size:16px"></div>
      <div class="m6-field"><label>Taux +1 (%)</label><input type="number" id="fh-t1" value="${this._contract.taux1||25}" min="10" style="font-size:16px"></div>
      <div class="m6-field"><label>Taux +2 (%)</label><input type="number" id="fh-t2" value="${this._contract.taux2||50}" min="25" style="font-size:16px"></div>
      <button class="m6-btn m6-btn-gold" id="fh-sv-taux" style="margin-bottom:10px;font-size:0.8rem">Mettre à jour les taux</button>
      <div class="m6-field"><label>Mois à exporter</label>
        <select id="fh-pdf-mois" style="font-size:14px">${['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'].map((m,i)=>`<option value="${i}" ${i===new Date().getMonth()?'selected':''}>${m}</option>`).join('')}</select>
      </div>
      <div class="m6-field"><label>Email manager (copie PDF)</label><input type="email" id="fh-mgr-email" value="${this._contract.emailManager||''}" placeholder="manager@entreprise.fr" style="font-size:16px"></div>
      
      <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap">
        <button class="m6-btn m6-btn-ghost" id="fh-pdf-m" style="flex:1;min-width:120px;font-size:0.78rem">📄 PDF Mensuel</button>
        <button class="m6-btn m6-btn-ghost" id="fh-pdf-a" style="flex:1;min-width:120px;font-size:0.78rem">📋 PDF Annuel</button>
        
      </div>
      <div class="m6-field"><label>PDF Periode — date debut</label><input type="date" id="fh-per-d1" value="${this._year}-01-01" style="font-size:16px"></div>
      <div class="m6-field"><label>PDF Periode — date fin</label><input type="date" id="fh-per-d2" value="${new Date().toISOString().slice(0,10)}" style="font-size:16px"></div>
      <button class="m6-btn m6-btn-ghost" id="fh-pdf-per" style="width:100%;font-size:0.78rem">📅 PDF Période</button>
    </div></div>

    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Rupture conventionnelle</div><div class="m6-ornement-line"></div></div>
    <div id="rupture-container-fh"></div>
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">JSON — Exercices : ${yrs.join(', ')}</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body">
      <div style="display:flex;gap:8px"><button class="m6-btn m6-btn-primary" id="exp-j" style="flex:1;font-size:0.78rem">💾 Exporter</button><button class="m6-btn m6-btn-primary" id="exp-csv-fh" style="flex:1;font-size:0.78rem">📊 CSV SIRH</button>
        <button class="m6-btn m6-btn-ghost" id="imp-j" style="flex:1;font-size:0.78rem">📂 Importer</button></div>
    </div></div>

    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Historique</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card"><div class="m6-card-body">${!log.length?'<div style="font-size:0.78rem;color:var(--pierre)">Aucune modification.</div>':log.map(l=>`<div class="m6-row" style="padding:5px 0;align-items:flex-start"><div><div style="font-size:0.72rem;font-weight:500">${l.action}</div><div style="font-size:0.65rem;color:var(--pierre)">${l.detail}</div></div><span style="font-size:0.6rem;color:var(--pierre);flex-shrink:0;margin-left:8px">${new Date(l.ts).toLocaleString('fr-FR',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'})}</span></div>`).join('')}</div></div>`;
  },

  _bindExport(analysis) {
    const checkCertifFH = () => {
      return true;
    };
    const saveEmailFH = () => {
      const em = this._c.querySelector('#fh-mgr-email')?.value.trim();
      if (em) { this._contract.emailManager = em; M6_Storage.setContract(this._regime, this._contract); }
    };
    const emailCopyFH = (type) => {
      const email = this._contract.emailManager;
      if (!email) return;
      const nom = this._contract.nomCadre||'Cadre';
      const sub = encodeURIComponent(`[M6] Rapport Forfait Heures ${type} — ${nom} — ${this._year}`);
      const bod = encodeURIComponent(`Bonjour,\n\nVeuillez trouver ci-joint le rapport de suivi d'heures supplémentaires ${type} de ${nom}.\n\nCordialement,\n${nom}`);
      setTimeout(() => { const a=document.createElement('a'); a.href=`mailto:${email}?subject=${sub}&body=${bod}`; a.click(); }, 1500);
      M6_toast(`📧 Email préparé pour ${email}`);
    };

    this._c.querySelector('#fh-sv-taux')?.addEventListener('click',()=>{
      this._contract.tauxHoraire=parseFloat(this._c.querySelector('#fh-taux')?.value)||0;
      this._contract.taux1=parseInt(this._c.querySelector('#fh-t1')?.value)||25;
      this._contract.taux2=parseInt(this._c.querySelector('#fh-t2')?.value)||50;
      M6_Storage.setContract(this._regime,this._contract); M6_toast('✓ Taux mis à jour'); this.render();
    });
    this._c.querySelector('#fh-pdf-m')?.addEventListener('click',()=>{
      if (!checkCertifFH()) return; saveEmailFH();
      const mois = parseInt(this._c.querySelector('#fh-pdf-mois')?.value)||0;
      const a2 = M6_ForfaitHeures.analyze(this._contract, this._data, this._year);
      M6_PDF.exportMensuelFH({regime:this._regime,year:this._year,mois,contract:this._contract,data:this._data,analysis:a2});
      emailCopyFH('mensuel');
    });
    this._c.querySelector('#fh-pdf-a')?.addEventListener('click',()=>{
      if (!checkCertifFH()) return; saveEmailFH();
      const a2=M6_ForfaitHeures.analyze(this._contract,this._data,this._year);
      M6_PDF.exportAnnuel({regime:this._regime,year:this._year,contract:this._contract,data:this._data,moods:{},analysis:a2});
      emailCopyFH('annuel');
    });
    this._c.querySelector('#fh-pdf-preuve')?.addEventListener('click',()=>{
      const a2=M6_ForfaitHeures.analyze(this._contract,this._data,this._year);
      M6_PDF.exportPreuve({regime:this._regime,year:this._year,contract:this._contract,data:this._data,analysis:a2});
    });
    // Rupture conventionnelle
    const rc = this._c.querySelector('#rupture-container-fh');
    if (rc && window.M6_RuptureCalculateur) M6_RuptureCalculateur.renderUI(rc, this._contract);
    this._c.querySelector('#exp-j')?.addEventListener('click',()=>M6_ImportExport.export(this._regime));
    this._c.querySelector('#exp-csv-fh')?.addEventListener('click', () => M6_ImportExport.exportCSV(this._regime, this._year));
    this._c.querySelector('#imp-j')?.addEventListener('click',()=>M6_ImportExport.import(this._regime,()=>{this._load();this.render();}));
  },

  _bindFHTooltips() {
    const tipWrap = this._c.querySelector('#fh-cont-tip');
    if (tipWrap) {
      tipWrap.addEventListener('click', e => { e.stopPropagation(); tipWrap.classList.toggle('open'); });
      document.addEventListener('click', () => tipWrap.classList.remove('open'), { once: false });
    }
  },

  _tplHeader(a) {
    const pct = a.tauxRemplissage;
    const barColor = pct>=100?'linear-gradient(90deg,#9B2C2C,#E53E3E)':pct>=90?'linear-gradient(90deg,var(--champagne-2),var(--champagne))':'linear-gradient(90deg,#2D6A4F,#4A7C6F)';
    return `<div style="background:var(--charbon);padding:10px 16px;padding-top:calc(10px + env(safe-area-inset-top,0));position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(196,163,90,0.25)">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <div style="flex:1">
          <div style="font-family:var(--font-display);font-size:1.1rem;font-weight:600;color:var(--ivoire)">Forfait Heures ${this._year}</div>
          <div style="font-size:0.65rem;color:var(--champagne);letter-spacing:0.06em;text-transform:uppercase">Seuil ${this._formatH(this._contract.seuilHebdo)} · Contingent ${a.contingent}h</div>
        </div>
        ${this._tplYrPicker()}
        <a href="../menu.html" style="color:var(--pierre);font-size:0.7rem;text-decoration:none;border:1px solid rgba(255,255,255,0.12);padding:4px 8px;border-radius:6px">← Menu</a>
      </div>
      <div>
        <div style="display:flex;justify-content:space-between;font-size:0.68rem;color:var(--pierre);margin-bottom:3px">
          <span><strong style="color:var(--ivoire)">${a.totalHS}h</strong> HS cumulées</span>
          <span><strong style="color:${pct>=90?'var(--alerte)':'var(--champagne)'}">${pct}%</strong> du contingent</span>
        </div>
        <div style="height:5px;background:rgba(255,255,255,0.1);border-radius:99px;overflow:hidden">
          <div style="height:100%;border-radius:99px;width:${Math.min(100,pct)}%;background:${barColor}"></div>
        </div>
      </div>
    </div>`;
  },

  _tplYrPicker() {
    const yrs = M6_Storage.getAllYears(this._regime);
    if (yrs.length <= 1) return `<span style="font-size:0.72rem;color:var(--pierre)">${this._year}</span>`;
    return `<select id="vfh-yr" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:var(--ivoire);font-size:0.72rem;border-radius:6px;padding:3px 6px;-webkit-appearance:none">${M6_Storage.getAllYears(this._regime).map(y=>`<option value="${y}" ${y==this._year?'selected':''}>${y}</option>`).join('')}</select>`;
  },

  _tplNav() {
    const mk = (id, icon, label) =>
      `<button class="m6-nav-item ${this._section===id?'active':''}" data-sec="${id}">
        <span class="nav-icon">${icon}</span>${label}
      </button>`;
    return `<nav class="m6-bottom-nav">
      ${mk('bilan',     '◈', 'Bilan')}
      ${mk('semaines',  '◻', 'Semaines')}
      ${mk('bio',       '♡', 'Santé')}
      ${mk('tendances', '◗', 'Tendances')}
      <div class="m6-nav-row-sep"></div>
      ${mk('validite',  '⚖', 'Validité')}
      ${mk('entretien', '◉', 'Entretien')}
      ${mk('export',    '◆', 'Export')}
      ${mk('glossaire', '≡', 'Glossaire')}
    </nav>`;
  },

  _bindNav() {
    this._c.querySelectorAll('[data-sec]').forEach(b => {
      b.onclick = () => { this._section = b.dataset.sec; this.render(); };
    });
    const editBtn = this._c.querySelector('#fh-edit-contract');
    if (editBtn) editBtn.onclick = () => {
      // _editContract n'efface plus le contrat — pas besoin de confirmation
      this._editContract();
    };
    const yp = this._c.querySelector('#vfh-yr');
    if (yp) yp.onchange = () => { this._year=parseInt(yp.value); M6_Storage.setActiveYear(this._regime, this._year); this._load(); this.render(); };
    const ypHdr2 = document.querySelector('#vfh-yr-hdr');
    if (ypHdr2) ypHdr2.onchange = () => { this._year=parseInt(ypHdr2.value); M6_Storage.setActiveYear(this._regime, this._year); this._load(); this.render(); };
    const _goYearFH = (yr) => {
      const exist = M6_Storage.getAllYears(this._regime);
      if (!exist.includes(yr)) M6_Storage.createYear(this._regime, yr);
      this._year = yr; M6_Storage.setActiveYear(this._regime, yr); this._load(); this.render();
    };
    const ypPrev = document.querySelector('#vfh-yr-prev');
    if (ypPrev) ypPrev.onclick = () => _goYearFH(this._year-1);
    const ypNext = document.querySelector('#vfh-yr-next');
    if (ypNext) ypNext.onclick = () => _goYearFH(this._year+1);
  },

  _formatH(h) {
    if(!h||isNaN(h)) return '0h';
    const e=Math.floor(h), m=Math.round((h-e)*60);
    return m>0?`${e}h${String(m).padStart(2,'0')}`:`${e}h`;
  },
  _editContract() {
    // NE PAS effacer le contrat — le wizard est pré-rempli depuis le contrat existant
    this._section = 'bilan';
    if (window.M6_Router?._showWizard) {
      M6_Router._showWizard(this._regime);
    } else if (window.M6_Router) {
      M6_Router.init();
    } else {
      location.reload();
    }
  }
};

global.VFH = VFH;
global.VFH_editContract = () => VFH._editContract();

})(window);
