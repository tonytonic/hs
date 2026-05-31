/**
 * RUPTURE-CALCULATEUR.JS — M6 Cadres
 * 1. Calculateur d'indemnités de rupture conventionnelle
 * 2. Intégration CCN_API (conventions-collectives.js)
 * 3. Alerte P3/P4 automatique (detection changement de phase)
 *
 * Sources : Art. L1237-19, L1234-9, R1234-1 à R1234-4, Légifrance
 */
'use strict';

(function(global) {

// ══════════════════════════════════════════════════════════════════
//  1. CALCULATEUR RUPTURE CONVENTIONNELLE
//  Indemnité légale (L1237-19) vs conventionnelle (CCN)
// ══════════════════════════════════════════════════════════════════

const M6_RuptureCalculateur = {

  /**
   * Calcule les indemnités de rupture conventionnelle.
   * @param {object} params
   *   dateEntree      — "YYYY-MM-DD" (date d'entrée dans l'entreprise)
   *   salaireRefBrut  — salaire de référence brut mensuel (€)
   *   ccnIdcc         — IDCC de la CCN (optionnel, pour indemnité conventionnelle)
   *   ccnLabel        — Libellé CCN
   * @returns {object} résultat complet
   */
  calculer({ dateEntree, salaireRefBrut, ccnIdcc, ccnLabel }) {
    const aujourd = new Date();
    const entree  = new Date(dateEntree + 'T00:00:00');
    if (isNaN(entree.getTime())) return null;

    // Ancienneté précise
    const diffMs   = aujourd - entree;
    const diffJours = Math.floor(diffMs / 86400000);
    const annees   = diffJours / 365.25;
    const moisTotal = Math.floor(annees * 12);

    // ── Indemnité légale (L1237-19 + R1234-2) ─────────────────
    // = 1/4 de mois par année jusqu'à 10 ans + 1/3 de mois au-delà
    // Base de calcul : 1/12e de la rémunération brute des 12 derniers mois
    // OU 1/3 des 3 derniers mois si plus favorable
    // NB : la loi impose la formule la plus favorable au salarié
    const salRef = parseFloat(salaireRefBrut) || 0;

    let indemLegale = 0;
    if (annees >= 8/12) { // seuil 8 mois minimum L1237-19
      const annees10 = Math.min(annees, 10);
      const au_dela  = Math.max(0, annees - 10);
      indemLegale = salRef * (0.25 * annees10 + (1/3) * au_dela);
    }

    // ── Indemnité conventionnelle (si CCN connue) ─────────────
    let indemConventionnelle = null;
    let ccnRegles = null;

    // Tentative de récupération via CCN_API
    if (ccnIdcc && window.CCN_API) {
      try {
        const ccnObj = window.CCN_API.getGroupeForCCN(String(ccnIdcc));
        if (ccnObj) {
          ccnRegles = ccnObj;
          // Règles courantes des CCN cadres (approximatives — toujours vérifier la CCN)
          const groupe = ccnObj.groupe || '';
          if (groupe.includes('Syntec') || groupe.includes('SYNTEC')) {
            // Syntec : 3/10e de mois par an jusqu'à 10 ans, 4/10e au-delà
            const a10 = Math.min(annees, 10);
            const ad  = Math.max(0, annees - 10);
            indemConventionnelle = salRef * (0.30 * a10 + 0.40 * ad);
          } else if (groupe.includes('Banque') || groupe.includes('AFB')) {
            // Banque AFB : 1 mois par an jusqu'à 15 ans
            indemConventionnelle = salRef * Math.min(annees, 15);
          } else if (groupe.includes('Assurance')) {
            // Assurance : 1/4 mois/an jusqu'à 10 ans + 1/3 au-delà (=légal)
            indemConventionnelle = indemLegale;
          }
          // Si pas de règle spécifique trouvée → afficher légal uniquement
        }
      } catch(_) {}
    }

    // Indemnité applicable = max(légale, conventionnelle)
    const indemApplicable = indemConventionnelle
      ? Math.max(indemLegale, indemConventionnelle)
      : indemLegale;

    const isConventionnelleMoreFav = indemConventionnelle && indemConventionnelle > indemLegale;

    // ── Régime fiscal et social ────────────────────────────────
    // Exonération IR : min(2 × rém annuelle brute, 50% indemnité)
    // Plafond SS 2026 : 3 925 €/mois, plafond annuel 47 100 €
    const plafondSSAnnuel = 47100;
    const exoIRPlafond = Math.min(2 * salRef * 12, indemApplicable * 0.5, plafondSSAnnuel * 2);
    const partImposable = Math.max(0, indemApplicable - exoIRPlafond);

    // Cotisations sociales : exonérée si < 2 plafonds SS annuels
    const exoSociale = indemApplicable <= 2 * plafondSSAnnuel;

    // ── Estimation nette ───────────────────────────────────────
    // Approximative — le taux marginal varie selon le foyer
    const indemNette = exoSociale
      ? indemApplicable - partImposable * 0.11 // approximation TMI 11%
      : indemApplicable * 0.68; // approximation avec cotisations

    // ── Calcul préavis ─────────────────────────────────────────
    // Pour les cadres : conventionnellement souvent 3 mois
    // Légalement : 1 mois (0-2 ans), 2 mois (2-10 ans), à vérifier CCN
    let preaMois;
    if (annees < 2)       preaMois = 1;
    else if (annees < 10) preaMois = 2;
    else                  preaMois = 3; // usuel cadre
    const preaBrut = salRef * preaMois;

    return {
      // Ancienneté
      dateEntree, diffJours, moisTotal,
      annees:     Math.round(annees * 10) / 10,
      anneesStr:  `${Math.floor(annees)} an${Math.floor(annees)>1?'s':''} et ${Math.round((annees % 1) * 12)} mois`,

      // Indemnités
      salRef, indemLegale: Math.round(indemLegale),
      indemConventionnelle: indemConventionnelle ? Math.round(indemConventionnelle) : null,
      indemApplicable: Math.round(indemApplicable),
      isConventionnelleMoreFav,
      ccnLabel, ccnIdcc, ccnRegles: ccnRegles?.groupe || null,

      // Fiscal
      exoIRPlafond: Math.round(exoIRPlafond),
      partImposable: Math.round(partImposable),
      exoSociale,
      indemNette: Math.round(indemNette),

      // Préavis
      preaMois, preaBrut: Math.round(preaBrut),

      // Total à négocier
      totalBrut: Math.round(indemApplicable + preaBrut),
    };
  },

  /**
   * Rend l'interface du calculateur dans un container.
   */
  renderUI(container, contract) {
    container.innerHTML = `
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Calculateur — Rupture conventionnelle</div><div class="m6-ornement-line"></div></div>

    <div class="m6-alert info" style="margin-bottom:14px;font-size:0.78rem">
      <span>⚖️</span>
      <div>Ce calculateur est une estimation indicative. L'indemnité légale minimale est fixée par L1237-19 et R1234-2. Votre CCN peut prévoir des conditions plus favorables — toujours vérifiées sur Légifrance.</div>
    </div>

    <div class="m6-card" style="margin-bottom:14px"><div class="m6-card-body">
      <div class="m6-field">
        <label>Date d'entrée dans l'entreprise</label>
        <input type="date" id="rc-date" value="${contract?.dateArrivee||contract?.dateEntree||''}" style="font-size:16px">
      </div>
      <div class="m6-field">
        <label>Salaire de référence brut mensuel (€)</label>
        <input type="number" id="rc-sal" min="0" step="100"
          value="${contract?.tauxJournalier ? Math.round(contract.tauxJournalier*21.67) : ''}"
          placeholder="ex : 5000" style="font-size:16px">
        <div style="font-size:0.7rem;color:var(--pierre);margin-top:3px">
          Utilisez le 1/12e de la rémunération brute des 12 derniers mois (formule légale).
        </div>
      </div>
      <div class="m6-field">
        <label>CCN applicable (IDCC ou libellé)</label>
        <input type="text" id="rc-ccn" value="${contract?.ccnLabel||''}" placeholder="ex : Syntec, Banque AFB…" style="font-size:16px">
      </div>
      <button class="m6-btn m6-btn-gold" id="rc-calc">Calculer mes indemnités →</button>
    </div></div>

    <div id="rc-result" style="display:none"></div>

    <div class="m6-alert warning" style="font-size:0.72rem;margin-top:10px">
      <span>⚠️</span>
      <div>Ce calcul est purement indicatif. Les indemnités réelles dépendent de votre contrat, de votre CCN, et des négociations. Consultez un avocat ou un conseiller du salarié avant de signer. (Art. L1237-19-3)</div>
    </div>`;

    container.querySelector('#rc-calc')?.addEventListener('click', () => {
      const dateEntree   = container.querySelector('#rc-date')?.value;
      const salaireRef   = parseFloat(container.querySelector('#rc-sal')?.value);
      const ccnLabel     = container.querySelector('#rc-ccn')?.value.trim();
      if (!dateEntree || isNaN(salaireRef)) { M6_toast('Remplissez la date et le salaire'); return; }

      const res = this.calculer({ dateEntree, salaireRefBrut: salaireRef, ccnLabel });
      if (!res) { M6_toast('Date invalide'); return; }

      const result = container.querySelector('#rc-result');
      result.style.display = 'block';
      result.innerHTML = `
      <div class="m6-card" style="margin-bottom:14px;border-top:3px solid var(--champagne)">
        <div class="m6-card-header">
          <div class="m6-card-icon">💰</div>
          <div><div class="m6-card-label">Résultat</div><div class="m6-card-title">Indemnité de rupture conventionnelle</div></div>
        </div>
        <div class="m6-card-body">
          <div class="m6-row"><span class="m6-row-label">Ancienneté</span><span class="m6-row-val">${res.anneesStr}</span></div>
          <div class="m6-row"><span class="m6-row-label">Salaire de référence</span><span class="m6-row-val">${res.salRef.toLocaleString('fr-FR')} €/mois</span></div>

          <div class="m6-divider"></div>

          <div class="m6-row"><span class="m6-row-label">Indemnité légale minimale</span><span class="m6-row-val">${res.indemLegale.toLocaleString('fr-FR')} €</span></div>
          ${res.indemConventionnelle ? `
          <div class="m6-row">
            <span class="m6-row-label">Indemnité conventionnelle (${res.ccnLabel})</span>
            <span class="m6-row-val ${res.isConventionnelleMoreFav?'ok':''}">${res.indemConventionnelle.toLocaleString('fr-FR')} € ${res.isConventionnelleMoreFav?'✅':''}</span>
          </div>` : `
          <div class="m6-row" style="font-style:italic"><span class="m6-row-label" style="color:var(--pierre)">CCN non reconnue — base légale uniquement</span></div>`}

          <div class="m6-row" style="background:var(--ivoire);border-radius:6px;padding:10px 8px;margin:6px 0">
            <span style="font-weight:700;font-size:0.9rem">Indemnité applicable (max légal/CCN)</span>
            <span style="font-family:var(--font-display);font-size:1.5rem;font-weight:700;color:var(--champagne-2)">${res.indemApplicable.toLocaleString('fr-FR')} €</span>
          </div>

          <div class="m6-divider"></div>

          <div class="m6-row"><span class="m6-row-label">Exonération IR estimée</span><span class="m6-row-val ok">${res.exoIRPlafond.toLocaleString('fr-FR')} €</span></div>
          <div class="m6-row"><span class="m6-row-label">Part potentiellement imposable</span><span class="m6-row-val">${res.partImposable.toLocaleString('fr-FR')} €</span></div>
          <div class="m6-row"><span class="m6-row-label">Cotisations sociales</span><span class="m6-row-val ${res.exoSociale?'ok':''}">
            ${res.exoSociale ? 'Exonérées (< 2 plafonds SS)' : 'Partiellement dues'}
          </span></div>
          <div class="m6-row"><span class="m6-row-label">Estimation nette approximative</span><span class="m6-row-val gold">${res.indemNette.toLocaleString('fr-FR')} €</span></div>

          <div class="m6-divider"></div>

          <div class="m6-card-label" style="margin-bottom:6px">Préavis (à titre indicatif)</div>
          <div class="m6-row"><span class="m6-row-label">Durée usuelle cadre</span><span class="m6-row-val">${res.preaMois} mois</span></div>
          <div class="m6-row"><span class="m6-row-label">Valeur brute préavis</span><span class="m6-row-val">${res.preaBrut.toLocaleString('fr-FR')} €</span></div>
          <div class="m6-row" style="background:var(--ivoire);border-radius:6px;padding:8px;margin-top:6px">
            <span style="font-weight:600">Total brut à négocier (indemnité + préavis)</span>
            <span style="font-family:var(--font-display);font-size:1.2rem;font-weight:700;color:var(--charbon-2)">${res.totalBrut.toLocaleString('fr-FR')} €</span>
          </div>

          <div style="font-size:0.68rem;color:var(--pierre);margin-top:10px;line-height:1.5">
            * Estimation basée sur la formule légale (R1234-2). Votre CCN et situation réelle peuvent modifier ces montants.
            Plafond SS 2026 utilisé : 47 100 €/an. Consultez un professionnel avant signature.
          </div>
        </div>
      </div>`;
    });
  }
};

// ══════════════════════════════════════════════════════════════════
//  2. CCN_API ADAPTER pour M6
//  Pont entre conventions-collectives.js (projet parent) et M6
// ══════════════════════════════════════════════════════════════════

const M6_CCNAdapter = {

  /**
   * Récupère les règles CCN pertinentes pour M6 selon l'IDCC saisi.
   * Retourne null si CCN_API n'est pas disponible.
   */
  getRules(idcc) {
    if (!window.CCN_API || !idcc) return null;
    try {
      const ccn = window.CCN_API.getGroupeForCCN(String(idcc));
      if (!ccn) return null;
      return {
        groupe:     ccn.groupe || '',
        idcc:       idcc,
        plafondFJ:  this._getPlafondFJ(ccn),
        contingent: this._getContingent(ccn),
        taux1:      ccn.taux1 || 25,
        taux2:      ccn.taux2 || 50,
        mention:    ccn.mention || '',
      };
    } catch(_) { return null; }
  },

  _getPlafondFJ(ccn) {
    const g = (ccn.groupe || '').toLowerCase();
    if (g.includes('banque') || g.includes('afb')) return 205;
    if (g.includes('syntec'))                       return 218;
    return ccn.plafondFJ || 218;
  },

  _getContingent(ccn) {
    const g = (ccn.groupe || '').toLowerCase();
    if (g.includes('banque'))  return 200;
    if (g.includes('syntec'))  return 220;
    if (g.includes('hotel'))   return 360;
    return ccn.contingent || 220;
  },

  /**
   * Enrichit un contrat M6 avec les données CCN.
   * Ne modifie pas si la CCN est inconnue.
   */
  enrichContract(contract) {
    if (!contract?.ccnLabel) return contract;

    // Chercher par libellé si pas d'IDCC
    if (!contract.ccnIdcc && window.CCN_API) {
      try {
        const lq = contract.ccnLabel.toLowerCase();
        // Mapping rapide des CCN les plus fréquentes
        const mappings = [
          { k:'syntec',  idcc:'787'  },
          { k:'banque',  idcc:'675'  },
          { k:'afb',     idcc:'675'  },
          { k:'hotel',   idcc:'1979' },
          { k:'hcr',     idcc:'1979' },
          { k:'assur',   idcc:'1351' },
          { k:'pharma',  idcc:'176'  },
          { k:'chimie',  idcc:'44'   },
          { k:'metal',   idcc:'1612' },
          { k:'bureau',  idcc:'43'   },
        ];
        for (const { k, idcc } of mappings) {
          if (lq.includes(k)) { contract.ccnIdcc = idcc; break; }
        }
      } catch(_) {}
    }

    const rules = this.getRules(contract.ccnIdcc);
    if (!rules) return contract;

    // Appliquer les règles CCN si non surchargées manuellement
    if (!contract._ccnOverride) {
      if (rules.plafondFJ && !contract.plafondManuel) contract.plafond = rules.plafondFJ;
      if (rules.contingent)                           contract.contingentCCN = rules.contingent;
      if (rules.taux1 && !contract.taux1Manuel)       contract.taux1 = rules.taux1;
      contract._ccnRules = rules;
    }
    return contract;
  }
};

// ══════════════════════════════════════════════════════════════════
//  3. ALERTE P3/P4 AUTOMATIQUE
//  Détecte un changement de phase entre 2 analyses consécutives
//  et déclenche un toast + badge si P3 ou P4
// ══════════════════════════════════════════════════════════════════

const M6_AlertePhase = {

  _KEY: 'M6_LAST_PHASE',

  /**
   * Vérifie si la phase a changé depuis la dernière visite.
   * Déclenche une alerte si montée vers P3 ou P4.
   * @param {object} bio — résultat M6_BioEngine
   * @param {string} regime
   */
  check(bio, regime) {
    if (!bio?.phase?.code) return;
    const key      = `${this._KEY}_${regime}`;
    const lastPhase = localStorage.getItem(key) || 'P1';
    const currPhase = bio.phase.code;

    // Sauvegarder la phase courante
    localStorage.setItem(key, currPhase);

    // Changement vers le haut (P1→P2, P2→P3, P3→P4)
    const phases = ['P1','P2','P3','P4'];
    const prev = phases.indexOf(lastPhase);
    const curr = phases.indexOf(currPhase);

    if (curr > prev) {
      this._triggerAlerte(currPhase, lastPhase, bio);
    }
  },

  _triggerAlerte(curr, prev, bio) {
    const msgs = {
      P2: `Phase P2 atteinte (était ${prev}) — Fatigue chronique en construction. Planifiez des RTT. (INRS)`,
      P3: `⚠️ Phase P3 — Surmenage détecté (était ${prev}). Kivimäki 2015 : risque CV accru. Signalez la charge à votre manager.`,
      P4: `🔴 Phase P4 — Burn-out critique (était ${prev}). Consultez votre médecin du travail (Art. L4121-1).`,
    };
    const msg = msgs[curr];
    if (!msg) return;

    // Toast immédiat
    const dur = curr === 'P4' ? 8000 : curr === 'P3' ? 6000 : 4000;
    setTimeout(() => M6_toast?.(msg, dur), 500);

    // Badge dans le titre de l'onglet
    if (curr === 'P3' || curr === 'P4') {
      const icon = curr === 'P4' ? '🔴' : '⚠️';
      document.title = `${icon} M6 Cadres — ${curr}`;
    }

    // Log dans storage
    try {
      const today = new Date().toISOString().slice(0,10);
      M6_Storage?.addLog?.('forfait_jours', new Date().getFullYear(), 
        'Alerte phase', `Passage ${prev} → ${curr} — Fatigue:${bio.fatigue} Stress:${bio.stress}`);
    } catch(_) {}
  },

  /**
   * Réinitialise le tracking de phase (après un nouvel exercice).
   */
  reset(regime) {
    localStorage.removeItem(`${this._KEY}_${regime}`);
  }
};

// ── Exposition globale ────────────────────────────────────────────
global.M6_RuptureCalculateur = M6_RuptureCalculateur;
global.M6_CCNAdapter         = M6_CCNAdapter;
global.M6_AlertePhase        = M6_AlertePhase;

})(window);
