/**
 * APP.JS — Router M6 Cadres
 * - Toast global
 * - M6_Header : gestion centralisée du header unique
 * - Router : sélection régime → vue
 */
'use strict';
(function(global) {

// ══════════════════════════════════════════════════════════════════
//  TOAST GLOBAL
// ══════════════════════════════════════════════════════════════════
function M6_toast(msg, duration) {
  let el = document.getElementById('m6-toast-global');
  if (!el) {
    el = document.createElement('div');
    el.id = 'm6-toast-global';
    el.className = 'm6-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), duration || 2400);
}
window.M6_toast = M6_toast;

// ══════════════════════════════════════════════════════════════════
//  M6_HEADER — Gestionnaire centralisé du header unique
//  Les vues appellent M6_Header.set(...) au lieu d'injecter leur propre header
// ══════════════════════════════════════════════════════════════════
const M6_Header = {
  /**
   * Met à jour le header global.
   * @param {object} opts
   *   title      {string}   — titre principal
   *   sub        {string}   — sous-titre (CCN, régime…)
   *   showReset  {boolean}  — afficher bouton ⚙ reset/wizard
   *   onReset    {function} — callback du bouton ⚙
   *   showSwitch {boolean}  — afficher bouton ⇄ régime
   *   yearPicker {string}   — HTML d'un <select> d'année (optionnel)
   */
  set({ title, sub, showReset, onReset, showSwitch, yearPicker } = {}) {
    const t  = document.getElementById('m6-header-title');
    const s  = document.getElementById('m6-header-sub');
    const rb = document.getElementById('m6-reset-btn');
    const sw = document.getElementById('m6-regime-switch');
    // Bouton tutoriel
    const helpBtn = document.getElementById('m6-help-btn');
    if (helpBtn && !helpBtn.dataset.bound) {
      helpBtn.dataset.bound = '1';
      helpBtn.onclick = () => {
        const regime = localStorage.getItem('M6_REGIME') || 'forfait_jours';
        if (window.M6_openTutorial) M6_openTutorial(regime);
      };
    }

    if (t  && title) t.textContent = title;
    if (s  && sub  ) s.textContent = sub;

    if (rb) {
      rb.style.display = showReset ? 'flex' : 'none';
      // Utiliser onclick (pas addEventListener) pour éviter l'empilement de listeners
      // { once: true } + re-render causait la perte du handler au 2e clic
      rb.onclick = (showReset && onReset) ? onReset : null;
    }
    if (sw) {
      sw.style.display = showSwitch ? 'flex' : 'none';
    }

    // Year picker : injecté à côté du titre si fourni
    const brand = document.querySelector('.m6-header-brand');
    const existing = document.getElementById('m6-header-year-picker');
    if (existing) existing.remove();
    if (yearPicker && brand) {
      const wrap = document.createElement('div');
      wrap.id = 'm6-header-year-picker';
      wrap.style.cssText = 'margin-top:2px';
      wrap.innerHTML = yearPicker;
      brand.appendChild(wrap);
    }
  },

  /**
   * Réinitialise le header au state sélecteur (avant connexion d'une vue).
   */
  reset() {
    this.set({ title:'M6 — Cadres', sub:'Forfait Jours · Forfait Heures',
               showReset:false, showSwitch:false });
    const existing = document.getElementById('m6-header-year-picker');
    if (existing) existing.remove();
  }
};
window.M6_Header = M6_Header;

// ══════════════════════════════════════════════════════════════════
//  ROUTER
// ══════════════════════════════════════════════════════════════════
const M6_Router = {
  _regime: null,
  _root: null,

  init() {
    this._root   = document.getElementById('m6-app-root');
    this._regime = localStorage.getItem('M6_REGIME') || null;

    // Bouton ⇄ Régime
    const sw = document.getElementById('m6-regime-switch');
    if (sw) sw.addEventListener('click', () => {
      // Overlay inline — pas de confirm() qui peut boucler sur Android/iOS
      if (document.getElementById('m6-regime-confirm')) return; // anti-double
      const ov = document.createElement('div');
      ov.id = 'm6-regime-confirm';
      ov.style.cssText = 'position:fixed;inset:0;background:rgba(26,23,20,0.75);z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px';
      ov.innerHTML = `<div style="background:var(--ivoire);border-radius:16px;padding:24px 20px;max-width:320px;width:100%;box-shadow:0 8px 40px rgba(0,0,0,0.3)">
        <div style="font-family:var(--font-display);font-size:1.1rem;font-weight:600;margin-bottom:8px">Changer de régime ?</div>
        <div style="font-size:0.8rem;color:var(--pierre);margin-bottom:20px;line-height:1.5">Votre configuration et vos données sont conservées. Vous pourrez revenir à tout moment.</div>
        <div style="display:flex;gap:10px">
          <button id="m6rc-cancel" class="m6-btn m6-btn-ghost" style="flex:1">Annuler</button>
          <button id="m6rc-ok" class="m6-btn m6-btn-gold" style="flex:1">Changer</button>
        </div>
      </div>`;
      document.body.appendChild(ov);
      const cleanup = () => ov.remove();
      ov.querySelector('#m6rc-cancel').addEventListener('click', cleanup);
      ov.querySelector('#m6rc-ok').addEventListener('click', () => {
        cleanup();
        this._regime = null;
        localStorage.removeItem('M6_REGIME');
        M6_Header.reset();
        this._showSelector();
      });
    });

    if (!this._regime) { this._showSelector(); }
    else               { this._load(this._regime); }
  },

  _set(regime) {
    // Anti-boucle : ignorer si même régime déjà chargé avec vue active
    if (this._regime === regime && document.querySelector('.m6-bottom-nav')) return;
    this._regime = regime;
    localStorage.setItem('M6_REGIME', regime);
    this._load(regime);
  },

  _load(regime) {
    this._root.innerHTML = '';

    // ── PRIORITÉ ABSOLUE : si un contrat existe déjà pour ce régime, charger la vue
    // Évite d'écraser les données en relançant le wizard de bienvenue à chaque retour
    const existingContract = window.M6_Storage ? M6_Storage.getContract(regime) : null;
    if (existingContract && Object.keys(existingContract).length > 0) {
      // Marquer Zenji comme vu si pas encore fait (cohérence)
      if (window.M6_ZenjiOnboarding && M6_ZenjiOnboarding.isFirstVisit(regime)) {
        M6_ZenjiOnboarding.markSeen(regime);
      }
      this._loadView(regime);
      return;
    }

    // Premier lancement de ce régime → page de bienvenue Zenji, PUIS wizard de configuration
    if (window.M6_ZenjiOnboarding && M6_ZenjiOnboarding.isFirstVisit(regime)) {
      this._showWelcome(regime);
      return;
    }
    this._loadView(regime);
  },

  _showWelcome(regime) {
    M6_Header.set({ title: 'M6 — Cadres', sub: 'Bienvenue', showReset: false, showSwitch: false });
    this._root.innerHTML = `
    <div style="background:var(--ivoire);min-height:calc(100dvh - 52px);padding:0 0 calc(32px + env(safe-area-inset-bottom,0))">
      <div style="padding:16px 0">
        ${window.M6_Zenji?.renderIntro ? M6_Zenji.renderIntro() : ''}
      </div>
      <div style="padding:0 16px">
        <button id="zenji-start" class="m6-btn m6-btn-gold" style="width:100%;font-size:0.95rem;margin-bottom:10px">
          Configurer mon contrat →
        </button>
        <button id="zenji-skip" class="m6-btn m6-btn-ghost" style="width:100%;font-size:0.78rem">
          Passer — utiliser les valeurs par défaut
        </button>
      </div>
    </div>`;
    this._root.querySelector('#zenji-start')?.addEventListener('click', () => {
      this._showWizard(regime);
    });
    this._root.querySelector('#zenji-skip')?.addEventListener('click', () => {
      M6_ZenjiOnboarding.markSeen(regime);
      this._loadView(regime);
    });
  },

  _loadView(regime) {
    this._root.innerHTML = '';
    // Afficher le bouton switch régime
    M6_Header.set({ showSwitch: true });

    if      (regime === 'forfait_jours'   && window.VFJ) VFJ.init(this._root);
    else if (regime === 'forfait_heures'  && window.VFH) VFH.init(this._root);
    else if (regime === 'cadre_dirigeant' && window.VCD) VCD.init(this._root);
    else    this._showSelector();
  },

  _showSelector() {
    M6_Header.reset();
    this._root.innerHTML = `
    <div style="min-height:calc(100dvh - 52px);background:var(--charbon);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 20px;padding-bottom:calc(24px + env(safe-area-inset-bottom,0))">
      <div style="font-family:var(--font-display);font-size:2rem;font-weight:600;color:var(--ivoire);text-align:center;margin-bottom:4px">M6 — Cadres</div>
      <div style="font-size:0.7rem;color:var(--champagne);letter-spacing:0.12em;text-transform:uppercase;text-align:center;margin-bottom:32px">Quel est votre régime de temps de travail ?</div>
      ${[
        {r:'forfait_jours',  badge:'Le plus répandu', title:'Forfait Jours',   sub:'Décompte en journées (218/an) · RTT · Rachat · Entretien L3121-65'},
        {r:'forfait_heures', badge:'39h · 38h30…',   title:'Forfait Heures',  sub:'Durée hebdo fixe + HS · Contingent · Réduction cotisations & exonération fiscale (TEPA)'},
        {r:'cadre_dirigeant',badge:'L3111-2',         title:'Cadre Dirigeant', sub:'Pas de compteur d\'heures · CP + protections légales · Projets & missions'},
      ].map(c=>`
        <div onclick="M6_Router._set('${c.r}')"
          style="width:100%;max-width:360px;background:rgba(247,243,237,0.06);border:1px solid rgba(196,163,90,0.35);border-radius:14px;padding:18px 20px;cursor:pointer;margin-bottom:12px;transition:background 0.2s;-webkit-tap-highlight-color:transparent">
          <div style="font-size:0.6rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--champagne);border:1px solid rgba(196,163,90,0.35);border-radius:99px;padding:2px 8px;display:inline-block;margin-bottom:8px">${c.badge}</div>
          <div style="font-family:var(--font-display);font-size:1.2rem;font-weight:600;color:var(--ivoire);margin-bottom:4px">${c.title}</div>
          <div style="font-size:0.75rem;color:var(--pierre);line-height:1.4">${c.sub}</div>
        </div>`).join('')}
      <div style="margin-top:16px;font-size:0.7rem;color:var(--pierre);text-align:center">Changez de régime via le bouton ⇄ en haut à droite.</div>
    </div>`;
  },

  _showWizard(regime) {
    // Wizard de bienvenue : paramétrage du contrat avant affichage de la vue
    // Récupérer le contrat existant pour pré-remplir si reconfiguration
    const existing = (window.M6_Storage && M6_Storage.getContract(regime)) || {};
    M6_Header.set({ title: 'Bienvenue', sub: 'Configuration initiale', showReset: false, showSwitch: false });
    const steps = ['Régime', 'Exercice', 'Contrat'];
    let step = 0;
    const render = () => {
      this._root.innerHTML = `
      <div class="m6-wizard-step" style="padding:24px 16px;max-width:480px;margin:0 auto;padding-bottom:calc(40px + env(safe-area-inset-bottom,0))">
        <div class="m6-wizard-progress">${steps.map((_,i)=>`<div class="m6-wizard-dot ${i<=step?'active':''}"></div>`).join('')}</div>
        <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--champagne);margin-bottom:8px">Étape ${step+1}/${steps.length} — ${steps[step]}</div>
        ${step===0 ? `
          <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:600;color:var(--charbon);margin-bottom:8px">Votre régime</div>
          <p style="font-size:0.82rem;color:var(--pierre);margin-bottom:20px">Confirmez votre régime pour personnaliser l'application.</p>
          <div style="background:var(--ivoire-2);border-radius:var(--radius-lg);padding:14px 16px;margin-bottom:20px">
            <div style="font-family:var(--font-display);font-size:1.1rem;font-weight:600">${regime==='forfait_jours'?'Forfait Jours':regime==='forfait_heures'?'Forfait Heures':'Cadre Dirigeant'}</div>
            <div style="font-size:0.75rem;color:var(--pierre);margin-top:4px">${regime==='forfait_jours'?'Art. L3121-58 — Plafond 218 jours par an':regime==='forfait_heures'?'Durée hebdomadaire fixe + heures supplémentaires':'Art. L3111-2 — Hors durée légale du travail'}</div>
          </div>
          <button class="m6-btn m6-btn-gold" id="wiz-next" style="width:100%">Confirmer et continuer →</button>
          <button class="m6-btn m6-btn-ghost" id="wiz-back" style="width:100%;margin-top:8px;font-size:0.78rem">← Changer de régime</button>
        ` : step===1 ? `
          <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:600;color:var(--charbon);margin-bottom:8px">Votre exercice</div>
          <p style="font-size:0.82rem;color:var(--pierre);margin-bottom:20px">Définissez la période de suivi (peut chevaucher deux années civiles).</p>
          <div class="m6-card"><div class="m6-card-body">
            <div class="m6-field"><label>Début de l'exercice <small style="color:var(--pierre);font-weight:400">(laisser vide = 1er janvier)</small></label><input type="date" id="wiz-debut" value="${existing.dateDebutExercice||''}" placeholder="${new Date().getFullYear()}-01-01" style="font-size:16px"></div>
            <div class="m6-field"><label>Fin de l'exercice <small style="color:var(--pierre);font-weight:400">(laisser vide = 31 décembre)</small></label><input type="date" id="wiz-fin" value="${existing.dateFinExercice||''}" placeholder="${new Date().getFullYear()}-12-31" style="font-size:16px"></div>
            <div class="m6-field"><label>Votre nom (pour les exports PDF)</label><input type="text" id="wiz-nom" value="${((existing.nomCadre||existing.nom)||'').replace(/"/g,'&quot;')}" placeholder="Prénom NOM" style="font-size:16px"></div>
          </div></div>
          <button class="m6-btn m6-btn-gold" id="wiz-next" style="width:100%">Continuer →</button>
          <button class="m6-btn m6-btn-ghost" id="wiz-prev" style="width:100%;margin-top:8px;font-size:0.78rem">← Précédent</button>
        ` : `
          <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:600;color:var(--charbon);margin-bottom:8px">Votre contrat</div>
          <p style="font-size:0.82rem;color:var(--pierre);margin-bottom:20px">Ces données permettent les calculs réglementaires. Modifiables à tout moment.</p>
          <div class="m6-card"><div class="m6-card-body">
            ${regime==='forfait_jours'?`
              <div class="m6-field"><label>Plafond annuel (défaut : 218j)</label><input type="number" id="wiz-plafond" value="${existing.plafond||218}" min="100" max="366" style="font-size:16px"></div>
              <div class="m6-field"><label>Congés payés contractuels (ex: 25, 25.5)</label><input type="number" id="wiz-cp" value="${existing.joursCPContrat||25}" min="25" max="40" step="0.5" style="font-size:16px"></div>
              <div class="m6-field">
                <label>RTT par an <small style="color:var(--pierre);font-weight:400">— laissez vide pour calcul auto</small></label>
                <input type="number" id="wiz-rtt" value="${existing.rttManuel||''}" min="0" max="40" step="0.5" placeholder="auto" style="font-size:16px">
                <div style="font-size:0.68rem;color:var(--pierre);margin-top:4px">Si votre accord d'entreprise prévoit un nombre fixe de RTT (10, 12, 15…), saisissez-le ici. Sinon le calcul s'effectue automatiquement.</div>
              </div>
              <div class="m6-field"><label>Taux journalier brut (€)</label><input type="number" id="wiz-tj" step="10" value="${existing.tauxJournalier||''}" placeholder="ex : 350" style="font-size:16px"></div>
              <div class="m6-field" style="position:relative">
                <label>CCN applicable — tapez pour chercher</label>
                <input type="text" id="wiz-ccn" value="${(existing.ccnLabel||'').replace(/"/g,'&quot;')}" data-idcc="${existing.ccnIdcc||0}" placeholder="ex : Syntec, 1486, Banque AFB…" style="font-size:16px" autocomplete="off">
                <div id="wiz-ccn-drop" style="display:none;position:absolute;left:0;right:0;top:100%;background:#fff;border:1px solid var(--ivoire-3);border-radius:var(--radius);z-index:200;box-shadow:0 4px 16px rgba(0,0,0,0.15);max-height:220px;overflow-y:auto"></div>
                <div id="wiz-ccn-info" style="margin-top:6px"></div>
              </div>
            `:regime==='forfait_heures'?`
              <div class="m6-field" style="position:relative">
                <label>Votre CCN — tapez pour chercher</label>
                <input type="text" id="wiz-ccn-fh" value="${(existing.ccnLabel||'').replace(/"/g,'&quot;')}" data-idcc="${existing.ccnIdcc||0}" placeholder="ex : HCR, Syntec, Transport, Banque…" style="font-size:16px" autocomplete="off">
                <div id="wiz-ccn-fh-drop" style="display:none;position:absolute;left:0;right:0;top:100%;background:#fff;border:1px solid var(--ivoire-3);border-radius:var(--radius);z-index:200;box-shadow:0 4px 16px rgba(0,0,0,0.15);max-height:180px;overflow-y:auto"></div>
                <div id="wiz-ccn-fh-info" style="margin-top:4px;font-size:0.72rem;color:var(--pierre)">Pré-remplit automatiquement seuil, contingent et taux.</div>
              </div>
              <div class="m6-field"><label>Durée hebdo contractuelle (h)</label><input type="number" id="wiz-seuil" value="${existing.seuilHebdo||39}" min="35" max="48" step="0.5" style="font-size:16px"></div>
              <div class="m6-field">
                <label>Contingent annuel HS (h) <span style="font-weight:400;font-size:0.75rem;color:var(--pierre)">— légal : 220h, ou défini par votre CCN</span></label>
                <input type="number" id="wiz-cont" value="${existing.contingent||220}" min="100" max="500" style="font-size:16px">
                <div style="display:flex;align-items:center;gap:6px;margin-top:6px">
                  <input type="checkbox" id="wiz-prorata-cont" ${existing.prorataContingent?'checked':''} style="width:16px;height:16px">
                  <label for="wiz-prorata-cont" style="font-size:0.78rem;color:var(--pierre);cursor:pointer">Appliquer un prorata si j'arrive en cours d'année</label>
                </div>
              </div>
              <div class="m6-field"><label>Taux horaire brut (€, optionnel)</label><input type="number" id="wiz-tauxH" step="0.01" value="${existing.tauxHoraire||''}" placeholder="25.50" style="font-size:16px"></div>
            `:`
              <div class="m6-field"><label>Fonction</label><input type="text" id="wiz-cd-fnc" value="${(existing.fonction||'').replace(/"/g,'&quot;')}" placeholder="Directeur Général, DAF, DRH…" style="font-size:16px"></div>
              <div class="m6-field"><label>Entreprise</label><input type="text" id="wiz-cd-ent" value="${(existing.entreprise||'').replace(/"/g,'&quot;')}" placeholder="Nom de l'entreprise" style="font-size:16px"></div>
              <div class="m6-field" style="position:relative">
                <label>CCN applicable — tapez pour chercher</label>
                <input type="text" id="wiz-cd-ccn" value="${(existing.ccnLabel||'').replace(/"/g,'&quot;')}" data-idcc="${existing.ccnIdcc||0}" placeholder="ex : Syntec, 675, Banque AFB…" style="font-size:16px" autocomplete="off">
                <div id="wiz-cd-ccn-drop" style="display:none;position:absolute;left:0;right:0;top:100%;background:#fff;border:1px solid var(--ivoire-3);border-radius:var(--radius);z-index:200;box-shadow:0 4px 16px rgba(0,0,0,0.15);max-height:180px;overflow-y:auto"></div>
                <div id="wiz-cd-ccn-info" style="margin-top:4px;font-size:0.72rem;color:var(--pierre)">Affiche les critères L3111-2 et droits maintenus selon votre CCN.</div>
              </div>
              <div class="m6-field"><label>Congés payés contractuels (jours ouvrables)</label><input type="number" id="wiz-cd-cp" value="${existing.joursCPContrat||25}" min="25" max="50" style="font-size:16px"></div>
              <div class="m6-field">
                <label>RTT par an <small style="color:var(--pierre);font-weight:400">— laissez vide si non applicable</small></label>
                <input type="number" id="wiz-cd-rtt" value="${existing.rttManuel||''}" min="0" max="40" step="0.5" placeholder="auto / non concerné" style="font-size:16px">
                <div style="font-size:0.68rem;color:var(--pierre);margin-top:4px">Beaucoup de cadres dirigeants n'ont pas de RTT (forfait sans décompte). Saisissez le nombre uniquement si votre contrat en prévoit.</div>
              </div>
              <div class="m6-field"><label>Taux journalier brut (€, optionnel)</label><input type="number" id="wiz-cd-tj" step="10" value="${existing.tauxJournalier||''}" placeholder="ex : 500" style="font-size:16px"></div>
              <div class="m6-field"><label>Nom du manager / Président du CA</label><input type="text" id="wiz-cd-mgr" value="${(existing.nomManager||'').replace(/"/g,'&quot;')}" placeholder="Pour les PDF" style="font-size:16px"></div>
              <div class="m6-field"><label>Plafond jours à surveiller (défaut : 218)</label><input type="number" id="wiz-plafond-cd" value="${existing.plafond||218}" min="100" max="366" style="font-size:16px"></div>
              <div class="m6-alert info" style="margin-top:10px;font-size:0.76rem;line-height:1.45"><span>⚖️</span><div>En tant que cadre dirigeant (L3111-2), vous n'êtes pas soumis à la durée légale du travail. Les CP, jours travaillés et missions sont suivis ici.</div></div>
            `}
            <div class="m6-field"><label>Email manager (copie exports)</label><input type="email" id="wiz-email-mgr" value="${existing.emailManager||''}" placeholder="manager@entreprise.fr" style="font-size:16px"></div>
          </div></div>
          <button class="m6-btn m6-btn-gold" id="wiz-finish" style="width:100%">Commencer →</button>
          <button class="m6-btn m6-btn-ghost" id="wiz-prev" style="width:100%;margin-top:8px;font-size:0.78rem">← Précédent</button>
        `}
      </div>`;

      this._root.querySelector('#wiz-next')?.addEventListener('click', () => {
        if (step === 1) {
          const debut = this._root.querySelector('#wiz-debut')?.value;
          const fin   = this._root.querySelector('#wiz-fin')?.value;
          if (debut && fin && debut > fin) { M6_toast('La date de fin doit être après le début'); return; }
          this._wizData = {
            ...this._wizData,
            debut, fin,
            nom: this._root.querySelector('#wiz-nom')?.value.trim(),
            // dateArrivee absente du wizard → à configurer dans ⚙️ si arrivée en cours d'année
          };
        }
        step++; render();
      });
      // Bind autocomplete CCN dans le wizard si on est à l'étape contrat
      if (step === 2 && regime === 'forfait_jours' && window.M6_CCN_Adapter) {
        const wInp  = this._root.querySelector('#wiz-ccn');
        const wDrop = this._root.querySelector('#wiz-ccn-drop');
        const wInfo = this._root.querySelector('#wiz-ccn-info');
        if (wInp && wDrop) {
          M6_CCN_Adapter.bindAutocomplete(wInp, wDrop, (ccn) => {
            // Sauvegarder l'IDCC pour la validation
            wInp.dataset.idcc = ccn.idcc || '';
            const pEl = this._root.querySelector('#wiz-plafond');
            const defs = M6_CCN_Adapter.buildContractDefaults?.(ccn, 'forfait_jours');
            // Pré-remplir le plafond depuis la CCN seulement si le champ est vierge ou à la valeur par défaut
            // NE JAMAIS écraser une valeur saisie manuellement par l'utilisateur
            if (pEl && defs?.plafond) {
              const current = parseInt(pEl.value);
              const isDefault = isNaN(current) || current === 218;
              if (isDefault) pEl.value = defs.plafond;
              // Sinon : l'utilisateur a saisi une valeur personnalisée → on la respecte
            }
            // Afficher la carte CCN
            if (wInfo) wInfo.innerHTML = M6_CCN_Adapter.renderCCNCard(ccn, 'forfait_jours');
          }, 'forfait_jours');
        }
      }
      if (step === 2 && regime === 'forfait_heures' && window.M6_CCN_Adapter) {
        const wInpFH  = this._root.querySelector('#wiz-ccn-fh');
        const wDropFH = this._root.querySelector('#wiz-ccn-fh-drop');
        const wInfoFH = this._root.querySelector('#wiz-ccn-fh-info');
        if (wInpFH && wDropFH) {
          M6_CCN_Adapter.bindAutocomplete(wInpFH, wDropFH, (ccn) => {
            wInpFH.dataset.idcc = ccn.idcc || '';
            const defs = M6_CCN_Adapter.buildContractDefaults?.(ccn, 'forfait_heures');
            const contEl  = this._root.querySelector('#wiz-cont');
            const seuilEl = this._root.querySelector('#wiz-seuil');
            if (contEl  && defs?.contingent) contEl.value  = defs.contingent;
            if (seuilEl && defs?.seuilHebdo) seuilEl.value = defs.seuilHebdo;
            if (wInfoFH) wInfoFH.innerHTML = M6_CCN_Adapter.renderCCNCard(ccn, 'forfait_heures');
          }, 'forfait_heures');
        }
      }
      if (step === 2 && regime === 'cadre_dirigeant' && window.M6_CCN_Adapter) {
        const wInpCD  = this._root.querySelector('#wiz-cd-ccn');
        const wDropCD = this._root.querySelector('#wiz-cd-ccn-drop');
        const wInfoCD = this._root.querySelector('#wiz-cd-ccn-info');
        if (wInpCD && wDropCD) {
          M6_CCN_Adapter.bindAutocomplete(wInpCD, wDropCD, (ccn) => {
            wInpCD.dataset.idcc = ccn.idcc || '';
            if (wInfoCD) wInfoCD.innerHTML = M6_CCN_Adapter.renderCCNCard?.(ccn, 'cadre_dirigeant') || '';
          }, 'cadre_dirigeant');
        }
      }
      this._root.querySelector('#wiz-prev')?.addEventListener('click', () => { step--; render(); });
      this._root.querySelector('#wiz-back')?.addEventListener('click', () => { this._regime = null; localStorage.removeItem('M6_REGIME'); M6_Header.reset(); this._showSelector(); });
      this._root.querySelector('#wiz-finish')?.addEventListener('click', () => {
        // PRÉSERVATION : on garde tous les champs du contrat existant et on n'écrase
        // que ce que l'utilisateur a explicitement saisi/modifié dans le wizard.
        let contract = {
          ...existing,
          nomCadre:           this._wizData?.nom || existing.nomCadre || existing.nom || '',
          emailManager:       this._root.querySelector('#wiz-email-mgr')?.value.trim() || existing.emailManager || '',
          dateDebutExercice:  this._wizData?.debut || existing.dateDebutExercice || null,
          dateFinExercice:    this._wizData?.fin   || existing.dateFinExercice   || null,
          dateArrivee:        this._wizData?.arrivee || existing.dateArrivee || null,
        };
        if (regime === 'forfait_jours') {
          // RTT manuel : si le champ est vide → null (recalcul auto), sinon parseFloat
          const _rttInput = this._root.querySelector('#wiz-rtt')?.value;
          const _rttManuel = (_rttInput === undefined || _rttInput === '' || isNaN(parseFloat(_rttInput)))
            ? null
            : parseFloat(_rttInput);
          contract = { ...contract,
            plafond:               parseInt(this._root.querySelector('#wiz-plafond')?.value) || existing.plafond || 218,
            joursCPContrat:        parseFloat(this._root.querySelector('#wiz-cp')?.value) || existing.joursCPContrat || 25,
            rttManuel:             _rttManuel,
            tauxJournalier:        parseFloat(this._root.querySelector('#wiz-tj')?.value) || existing.tauxJournalier || 0,
            ccnLabel:              this._root.querySelector('#wiz-ccn')?.value.trim() || existing.ccnLabel || '',
            ccnIdcc:               parseInt(this._root.querySelector('#wiz-ccn')?.dataset.idcc || '0') || existing.ccnIdcc || 0,
            tauxMajorationRachat:  existing.tauxMajorationRachat || 10,
          };
        } else if (regime === 'forfait_heures') {
          // Récupérer les vraies règles de la CCN sélectionnée (3 paliers HCR, etc.)
          const idccFH = parseInt(this._root.querySelector('#wiz-ccn-fh')?.dataset.idcc || '0') || 0;
          let rules = null;
          if (idccFH && window.M6_CCN_Adapter) {
            try { rules = window.M6_CCN_Adapter.get(idccFH, 'forfait_heures'); } catch(_) {}
          }
          contract = { ...contract,
            seuilHebdo:        parseFloat(this._root.querySelector('#wiz-seuil')?.value) || existing.seuilHebdo || rules?.seuil || 39,
            contingent:        parseInt(this._root.querySelector('#wiz-cont')?.value) || existing.contingent || rules?.contingent || 220,
            prorataContingent: !!(this._root.querySelector('#wiz-prorata-cont')?.checked),
            tauxHoraire:       parseFloat(this._root.querySelector('#wiz-tauxH')?.value) || existing.tauxHoraire || 0,
            ccnLabel:          this._root.querySelector('#wiz-ccn-fh')?.value.trim() || existing.ccnLabel || '',
            ccnIdcc:           idccFH || existing.ccnIdcc || 0,
            // Priorité : valeurs CCN sélectionnée > saisie existante > droit commun
            // NE PAS écraser les taux corrects de la CCN par des hardcoded 25/50
            taux1:             rules?.taux1   || existing.taux1   || 25,
            taux2:             rules?.taux2   || existing.taux2   || 50,
            palier1:           rules?.palier1 || existing.palier1 || 8,
            // 3 paliers (HCR : 10%/4h + 20%/4h + 50%) — préserver si la CCN en a
            taux_inter:        rules?.taux_inter   || existing.taux_inter   || null,
            palier_inter:      rules?.palier_inter || existing.palier_inter || null,
          };
        } else {
          contract = { ...contract,
            // Nom : "nom" est utilisé par CD (vs "nomCadre" pour FJ/FH) → on duplique pour cohérence
            nom:             this._wizData?.nom || existing.nom || existing.nomCadre || '',
            fonction:        this._root.querySelector('#wiz-cd-fnc')?.value.trim() || existing.fonction || '',
            entreprise:      this._root.querySelector('#wiz-cd-ent')?.value.trim() || existing.entreprise || '',
            ccnLabel:        this._root.querySelector('#wiz-cd-ccn')?.value.trim() || existing.ccnLabel || '',
            ccnIdcc:         parseInt(this._root.querySelector('#wiz-cd-ccn')?.dataset.idcc || '0') || existing.ccnIdcc || 0,
            joursCPContrat:  parseInt(this._root.querySelector('#wiz-cd-cp')?.value) || existing.joursCPContrat || 25,
            rttManuel:       (() => {
              const v = this._root.querySelector('#wiz-cd-rtt')?.value;
              return (v === undefined || v === '' || isNaN(parseFloat(v))) ? null : parseFloat(v);
            })(),
            tauxJournalier:  parseFloat(this._root.querySelector('#wiz-cd-tj')?.value) || existing.tauxJournalier || 0,
            nomManager:      this._root.querySelector('#wiz-cd-mgr')?.value.trim() || existing.nomManager || '',
            plafond:         parseInt(this._root.querySelector('#wiz-plafond-cd')?.value) || existing.plafond || 218,
          };
        }
        if (window.M6_Storage) {
          M6_Storage.setContract(regime, contract);
          M6_Storage.createYear(regime, new Date().getFullYear());
        }
        M6_ZenjiOnboarding?.markSeen(regime);
        this._loadView(regime);
      });
    };
    this._wizData = {};
    render();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  M6_Router.init();
  // M6 ne demande PAS de notifications (conformité Play Store / RGPD).
  // Aucune permission de notification n'est sollicitée par ce module.
});
window.M6_Router = M6_Router;


// ═══════════════════════════════════════════════════════════
//  TUTORIEL POPUP — un par régime, accessible depuis le header
// ═══════════════════════════════════════════════════════════
const TUTO_CONTENT = {
  forfait_jours: {
    titre: '🗓️ Forfait Jours — Guide complet',
    sections: [
      { icon: '◈', titre: 'Bilan', texte: 'Vue d\'ensemble de votre exercice : jours travaillés, RTT disponibles, CP, indicateurs santé. Les <strong>Quick Actions</strong> vous mènent directement aux fonctions clés.' },
      { icon: '◻', titre: 'Calendrier', texte: 'Saisissez chaque jour : <strong>Travail, RTT, CP, Maladie, Déplacement</strong>... Appuyez sur un jour pour le modifier. L\'amplitude (heure début/fin) améliore l\'analyse bio.' },
      { icon: '♡', titre: 'Santé', texte: '4 indicateurs biologiques : <strong>Fatigue, Stress, Récupération, Performance</strong>. Calibrés sur la littérature scientifique (INRS, Kivimäki 2015). Phase P1→P4 selon votre charge cumulée.' },
      { icon: '◗', titre: 'Tendances', texte: 'Graphique de consommation mensuelle + tableau des scores bio par mois. Idéal pour repérer les périodes de surcharge.' },
      { icon: '⚖', titre: 'Validité', texte: '6 conditions cumulatives pour que votre forfait soit juridiquement opposable (L3121-58 à 65). Cochez manuellement celles que vous pouvez confirmer.' },
      { icon: '◉', titre: 'Entretien', texte: 'L\'entretien annuel est <strong>obligatoire</strong> (Art. L3121-65 + Cass. Soc. 2014). Documentez-le ici : charge de travail, vie pro/perso, organisation.' },
      { icon: '◆', titre: 'Export', texte: 'Générez vos PDF : mensuel, annuel, période libre, mode preuve. Le mode preuve inclut un hash horodaté opposable aux prud\'hommes.' },
      { icon: '≡', titre: 'Glossaire', texte: 'Définitions des termes juridiques : forfait, plafond, rachat, contingent, repos quotidien... avec références aux articles du Code du travail.' },
    ]
  },
  forfait_heures: {
    titre: '⏱️ Forfait Heures — Guide complet',
    sections: [
      { icon: '◈', titre: 'Bilan', texte: 'Total des heures supplémentaires, montant brut TEPA, pourcentage du contingent consommé. Le bouton ⚙️ Contrat permet de reconfigurer.' },
      { icon: '◻', titre: 'Semaines', texte: 'Saisissez vos heures par semaine ISO. Le formulaire calcule automatiquement les HS à +25% et +50% selon votre seuil contractuel.' },
      { icon: '♡', titre: 'Santé', texte: 'Indicateurs bio adaptés au régime horaire : au-delà de 48h/semaine régulier, le risque cardio augmente significativement (Kivimäki 2015).' },
      { icon: '◗', titre: 'Tendances', texte: 'Graphique hebdomadaire + tableau des scores bio par mois.' },
      { icon: '⚖', titre: 'Validité', texte: '6 conditions : convention écrite, accord collectif (si annuel), contingent respecté, majoration conforme, repos 11h, max 48h.' },
      { icon: '◉', titre: 'Entretien', texte: 'Documentez votre entretien annuel pour respecter L4121-1 (obligation de sécurité employeur).' },
      { icon: '◆', titre: 'Export', texte: 'PDF mensuel, périodique et rupture conventionnelle.' },
    ]
  },
  cadre_dirigeant: {
    titre: '👔 Cadre Dirigeant — Guide complet',
    sections: [
      { icon: '◈', titre: 'Bilan', texte: 'Statut L3111-2 : exclu des durées du travail mais soumis à L4121-1 (sécurité). Suivi informatif de vos jours et de votre charge.' },
      { icon: '◻', titre: 'Agenda', texte: 'Saisie indicative des jours travaillés. Utile en cas de contestation du statut CD par un juge.' },
      { icon: '◐', titre: 'Projets', texte: 'Documentez vos projets stratégiques : preuve de votre autonomie réelle (critère L3111-2).' },
      { icon: '♡', titre: 'Santé', texte: 'Le statut CD ne protège pas du burn-out. Indicateurs bio informatifs pour anticiper.' },
      { icon: '◗', titre: 'Tendances', texte: 'Évolution de votre activité et scores bio mensuels.' },
      { icon: '⚖', titre: 'Validité', texte: '3 critères CUMULATIFS L3111-2 (Cass. 31/01/2012) : pouvoir de direction, rémunération élevée, autonomie réelle. Un seul manquant → requalification possible.' },
      { icon: '◉', titre: 'Entretien', texte: 'Non obligatoire légalement mais fortement recommandé (Art. L4121-1). Utile en cas de requalification.' },
      { icon: '◆', titre: 'Export', texte: 'PDF annuel pour archivage et rupture conventionnelle calculée.' },
    ]
  }
};

function openTutorial(regime) {
  document.getElementById('m6-tuto-overlay')?.remove();
  const tuto = TUTO_CONTENT[regime] || TUTO_CONTENT.forfait_jours;
  const ov = document.createElement('div');
  ov.id = 'm6-tuto-overlay';
  ov.style.cssText = 'position:fixed;inset:0;background:rgba(26,23,20,0.82);z-index:99997;display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity 0.2s';
  ov.innerHTML = `
    <div style="background:#fff;border-radius:14px;max-width:460px;width:100%;max-height:88vh;overflow-y:auto;box-shadow:0 12px 40px rgba(0,0,0,0.4)">
      <div style="background:var(--charbon,#1A1714);color:var(--champagne,#C4A35A);padding:18px 20px 14px;border-radius:14px 14px 0 0;display:flex;justify-content:space-between;align-items:center">
        <div style="font-family:Georgia,serif;font-size:1.05rem;font-weight:600">${tuto.titre}</div>
        <button id="tuto-close" style="background:rgba(255,255,255,0.1);border:none;color:#fff;width:32px;height:32px;border-radius:50%;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center">×</button>
      </div>
      <div style="padding:16px 18px">
        ${tuto.sections.map(s=>`
          <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #F0EBE4">
            <div style="font-size:1.3rem;width:28px;text-align:center;flex-shrink:0;margin-top:2px">${s.icon}</div>
            <div>
              <div style="font-weight:600;font-size:0.9rem;color:#1A1714;margin-bottom:3px">${s.titre}</div>
              <div style="font-size:0.78rem;color:#4A4540;line-height:1.5">${s.texte}</div>
            </div>
          </div>`).join('')}
        <button id="tuto-ok" style="width:100%;margin-top:16px;background:#1A1714;color:#F7F3ED;border:none;border-radius:8px;padding:12px;font-size:0.88rem;font-weight:600;cursor:pointer">Compris ✓</button>
      </div>
    </div>`;
  document.body.appendChild(ov);
  requestAnimationFrame(() => { ov.style.opacity='1'; });
  ov.querySelector('#tuto-close').onclick = ov.querySelector('#tuto-ok').onclick = () => {
    ov.style.opacity='0';
    setTimeout(()=>ov.remove(),200);
  };
  ov.addEventListener('click',e=>{ if(e.target===ov){ ov.style.opacity='0'; setTimeout(()=>ov.remove(),200); } });
}
global.M6_openTutorial = openTutorial;

})(window);
