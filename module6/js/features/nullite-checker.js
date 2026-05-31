/**
 * NULLITE-CHECKER M6 — Simulateur de validité du forfait jours
 * + Calculateur d'indemnités de rupture
 * + Types de journées étendus (maladie, CSS, formation, CET, astreinte, télétravail)
 *
 * Sources : L3121-58 à L3121-65, Cass. Soc. 29 juin 2011, Cass. Soc. 2 mars 2022
 */
'use strict';

(function(global) {

// ══════════════════════════════════════════════════════════════════
//  TYPES DE JOURNÉES ÉTENDUS
//  Complète les types de base (travail/rtt/cp/repos/rachat/demi)
// ══════════════════════════════════════════════════════════════════
const M6_TYPES_ETENDUS = {
  // Types de base
  travail:    { label: 'Travail',         icon: '💼', color: '#1A1714', countAs: 1,    categorie: 'presence' },
  demi:       { label: 'Demi-journée',    icon: '◑',  color: '#4A4540', countAs: 0.5,  categorie: 'presence' },
  rachat:     { label: 'Rachat',          icon: '💰', color: '#9B2C2C', countAs: 1,    categorie: 'presence' },
  rtt:        { label: 'RTT',             icon: '🌿', color: '#C4A35A', countAs: 0,    categorie: 'repos'    },
  cp:         { label: 'Congé payé',      icon: '✈️',  color: '#2D6A4F', countAs: 0,    categorie: 'repos'    },
  repos:      { label: 'Repos',           icon: '😴', color: '#BDB5A8', countAs: 0,    categorie: 'repos'    },
  ferie:      { label: 'Férié',           icon: '🎉', color: '#3730A3', countAs: 0,    categorie: 'repos'    },
  deplacement:{ label: 'Déplacement',     icon: '✈️',  color: '#1A1714', countAs: 1,    categorie: 'presence', isToggle: true },

  // Types étendus
  maladie:    { label: 'Arrêt maladie',   icon: '🏥', color: '#9B2C2C', countAs: 0,    categorie: 'absence',
    info: 'L\'arrêt maladie ne consomme pas votre forfait. L\'IJ CPAM + subrogation employeur selon CCN.' },
  css:        { label: 'Congé ss solde',  icon: '⏸️',  color: '#6B7280', countAs: 0,    categorie: 'absence',
    info: 'Le congé sans solde suspend le contrat. Les RTT théoriques sont réduits au prorata (Cass. Soc.).' },
  formation:  { label: 'Formation',       icon: '📚', color: '#7C3AED', countAs: 0,    categorie: 'absence',
    info: 'La formation dans le cadre du plan de formation ne consomme pas le forfait (L6321-1).' },
  cet:        { label: 'CET',             icon: '🏦', color: '#059669', countAs: 0,    categorie: 'repos',
    info: 'Congé pris depuis le Compte Épargne Temps. Équivalent à un CP mais financé par le CET (L3151-1).' },
  astreinte:  { label: 'Astreinte',       icon: '📲', color: '#D97706', countAs: 0,    categorie: 'presence', isToggle: true,
    info: 'L\'astreinte n\'est pas du temps de travail effectif mais est rémunérée (L3121-9).' },
  teletravail:{ label: 'Télétravail',     icon: '🏠', color: '#2563EB', countAs: 1,    categorie: 'presence', isToggle: true,
    info: 'Le télétravail n\'affecte pas le forfait jours. Indemnité URSSAF : 2,57€/j (2026).' },
  maternite:  { label: 'Congé maternité', icon: '👶', color: '#EC4899', countAs: 0,    categorie: 'absence',
    info: 'Le congé maternité/paternité est protégé (L1225-1). Les RTT sont réduits au prorata.' },
  patternite: { label: 'Congé paternité', icon: '👨‍👶', color: '#0EA5E9', countAs: 0,    categorie: 'absence',
    info: '25 jours calendaires depuis 2021 (L1225-35). Ne consomme pas le forfait.' },
};

// ══════════════════════════════════════════════════════════════════
//  CHECKLIST DE VALIDITÉ DU FORFAIT
// ══════════════════════════════════════════════════════════════════

const CONDITIONS_VALIDITE = [
  {
    id: 'accord_branche',
    titre: 'Accord de branche ou d\'entreprise',
    art: 'L3121-63',
    question: 'Votre CCN ou accord d\'entreprise prévoit-il expressément le forfait annuel en jours ?',
    risque_si_non: 'CRITIQUE — Sans accord collectif valide, le forfait est nul de plein droit. Toutes les heures >35h deviennent des HS rétroactives.',
    jurisprudence: 'Cass. Soc. 29 juin 2011 + Cass. Soc. 2 mars 2022 — Nullité si l\'accord ne garantit pas le respect des durées maximales.',
  },
  {
    id: 'mention_contrat',
    titre: 'Mention dans le contrat de travail',
    art: 'L3121-55',
    question: 'Votre contrat individuel mentionne-t-il expressément la convention de forfait et le nombre de jours ?',
    risque_si_non: 'FORT — La convention de forfait est inopposable au salarié sans mention dans le contrat (Cass. Soc. 19 mai 2021).',
    jurisprudence: 'La convention doit mentionner : nombre de jours, catégorie, rémunération en contrepartie.',
  },
  {
    id: 'autonomie_reelle',
    titre: 'Autonomie réelle dans l\'organisation',
    art: 'L3121-58',
    question: 'Disposez-vous d\'une réelle autonomie dans l\'organisation de votre emploi du temps (pas d\'horaires imposés, pas de pointage) ?',
    risque_si_non: 'FORT — Un cadre avec des horaires imposés ou un contrôle d\'assiduité ne peut pas être en forfait jours (Cass. Soc. 15 déc. 2010).',
    jurisprudence: 'Le critère d\'autonomie est apprécié in concreto — le juge regarde les conditions réelles de travail.',
  },
  {
    id: 'entretien_annuel',
    titre: 'Entretien annuel réalisé',
    art: 'L3121-65',
    question: 'Un entretien annuel sur la charge de travail et l\'équilibre vie pro/perso a-t-il été réalisé cette année ?',
    risque_si_non: 'CRITIQUE — L\'absence d\'entretien peut entraîner la nullité du forfait (Cass. Soc. 29 juin 2011). Le salarié peut réclamer le paiement rétroactif de toutes les heures supplémentaires.',
    jurisprudence: 'Cass. Soc. 2 mars 2022 : l\'entretien doit porter sur la charge, les amplitudes, le droit à la déconnexion.',
  },
  {
    id: 'suivi_charge',
    titre: 'Système de suivi de la charge de travail',
    art: 'L3121-65',
    question: 'L\'accord collectif ou l\'employeur a-t-il mis en place un dispositif de suivi de la charge de travail (outil, déclaration mensuelle, etc.) ?',
    risque_si_non: 'FORT — Sans dispositif de suivi, l\'employeur viole son obligation de surveillance (L4121-1). Risque de contentieux prud\'homal.',
    jurisprudence: 'M6 Cadres constitue un dispositif de suivi — exportez et conservez vos historiques mensuels.',
  },
  {
    id: 'repos_respectes',
    titre: 'Repos quotidien et hebdomadaire respectés',
    art: 'L3131-1 + L3132-2',
    question: 'Bénéficiez-vous d\'au moins 11h de repos quotidien et 35h de repos hebdomadaire ?',
    risque_si_non: 'CRITIQUE — Même en forfait jours, ces repos sont obligatoires. Leur violation expose l\'employeur à des dommages-intérêts et peut invalider le forfait (CJUE 17 mars 2021, CCOO).',
    jurisprudence: 'CJUE C-585/19 (17 mars 2021) : les États membres doivent garantir les repos minimaux pour les travailleurs autonomes.',
  },
  {
    id: 'droit_deconnexion',
    titre: 'Droit à la déconnexion prévu',
    art: 'L3121-62',
    question: 'Votre accord collectif ou charte d\'entreprise prévoit-il des modalités concrètes de droit à la déconnexion ?',
    risque_si_non: 'MODÉRÉ — Sans modalités de déconnexion, l\'accord peut être considéré insuffisant pour garantir le respect des temps de repos (Cass. Soc. 2 mars 2022).',
    jurisprudence: 'La charte de déconnexion ou l\'accord doit prévoir des règles concrètes (plages horaires, délais de réponse).',
  },
  {
    id: 'charge_raisonnable',
    titre: 'Charge de travail raisonnable',
    art: 'L4121-1',
    question: 'Votre charge de travail est-elle compatible avec le respect des temps de repos et une bonne santé (pas de dépassement systématique du plafond) ?',
    risque_si_non: 'MODÉRÉ à CRITIQUE — La surcharge chronique documentée engage la responsabilité de l\'employeur (art. L4121-1 — obligation de résultat).',
    jurisprudence: 'Si le salarié démontre une surcharge systématique via ses historiques, le juge peut condamner l\'employeur même sans violation formelle du forfait.',
  },
];

// ══════════════════════════════════════════════════════════════════
//  CALCULATEUR INDEMNITÉS DE RUPTURE
// ══════════════════════════════════════════════════════════════════
const M6_RuptureCalc = {

  /**
   * Calcule l'indemnité légale de licenciement.
   * @param {number} salaireRef    — salaire mensuel brut de référence
   * @param {number} ancienneteAns — ancienneté en années (peut être décimale)
   * @returns {object} { legal, baremeMax, baremeMin, methodeR, note }
   */
  calcLicenciement(salaireRef, ancienneteAns) {
    if (!salaireRef || ancienneteAns < 1) return null;

    // L1237-19 : 1/4 mois par an jusqu'à 10 ans, 1/3 mois au-delà
    const tranches = [
      Math.min(ancienneteAns, 10) * (salaireRef / 4),
      Math.max(0, ancienneteAns - 10) * (salaireRef / 3),
    ];
    const indemnite_legale = Math.round(tranches[0] + tranches[1]);

    // Barème Macron (2017) — montants approximatifs pour référence
    // Le barème est en mois de salaire brut, min et max
    const baremeBase = {
      1: [0, 1], 2: [0.5, 3.5], 3: [1, 4], 4: [1.5, 5], 5: [2, 6],
      6: [2.5, 7], 7: [3, 8], 8: [3, 8], 9: [3, 9], 10: [3, 10],
      15: [4, 13.5], 20: [5, 15.5], 25: [6, 17.5], 30: [7, 20],
    };

    const ans = Math.round(ancienneteAns);
    const keys = Object.keys(baremeBase).map(Number).sort((a,b) => a-b);
    let bk = keys[0];
    for (const k of keys) { if (ans >= k) bk = k; }
    const [min, max] = baremeBase[bk] || [0, 0];

    // Rupture conventionnelle homologuée = indemnité légale minimum
    const rupture_conv = indemnite_legale; // minimum = légal

    return {
      legale:        indemnite_legale,
      bareme_min:    Math.round(min * salaireRef),
      bareme_max:    Math.round(max * salaireRef),
      rupture_conv:  rupture_conv,
      anciennete:    ancienneteAns,
      salaireRef:    salaireRef,
      note: 'Indemnité légale brute, avant impôt. Votre CCN peut prévoir un calcul plus favorable.'
    };
  },

  /**
   * Calcule l'indemnité conventionnelle selon la CCN.
   * Gère Syntec et Banque AFB à titre d'exemples — pour les autres CCN,
   * retourne la méthode légale en indiquant de vérifier.
   */
  calcConventionnel(salaireRef, ancienneteAns, ccnLabel) {
    const ccn = (ccnLabel || '').toLowerCase();
    let methode = 'légale';
    let montant  = null;

    if (ccn.includes('syntec')) {
      // CCN Syntec : 3/10e de mois par an jusqu'à 5 ans, 5/10e au-delà
      const t1 = Math.min(ancienneteAns, 5) * salaireRef * 0.3;
      const t2 = Math.max(0, ancienneteAns - 5) * salaireRef * 0.5;
      montant = Math.round(t1 + t2);
      methode = 'Syntec (IDCC 787)';
    } else if (ccn.includes('banque') || ccn.includes('afb')) {
      // Banque AFB : 1/3 mois par an (plus favorable)
      montant = Math.round(ancienneteAns * salaireRef / 3);
      methode = 'Banque AFB (IDCC 675)';
    } else if (ccn.includes('hcr') || ccn.includes('hôtellerie') || ccn.includes('hotellerie')) {
      // HCR : 1/10 de mois + 1/15 au-delà 10 ans
      const t1 = Math.min(ancienneteAns, 10) * salaireRef * 0.1;
      const t2 = Math.max(0, ancienneteAns - 10) * salaireRef / 15;
      montant = Math.round(t1 + t2);
      methode = 'HCR (IDCC 1979)';
    }

    return montant ? { montant, methode } : null;
  },

  renderSection() {
    return `
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Simulateur de rupture du contrat</div><div class="m6-ornement-line"></div></div>

    <div class="m6-alert info" style="margin-bottom:14px;font-size:0.78rem">
      <span>⚖️</span><div>Cette simulation est indicative. Seul un avocat en droit du travail peut vous donner un avis précis sur votre situation. <strong>Claude n'est pas un avocat.</strong></div>
    </div>

    <div class="m6-card" style="margin-bottom:14px">
      <div class="m6-card-body">
        <div class="m6-field"><label>Salaire mensuel brut de référence (€)</label>
          <input type="number" id="r-sal" min="0" step="100" placeholder="ex : 6500" style="font-size:16px"></div>
        <div class="m6-field"><label>Ancienneté (années, peut être décimale)</label>
          <input type="number" id="r-anc" min="0" step="0.5" placeholder="ex : 7.5" style="font-size:16px"></div>
        <div class="m6-field"><label>CCN applicable (pour calcul conventionnel)</label>
          <input type="text" id="r-ccn" placeholder="ex : Syntec, Banque AFB, HCR…" style="font-size:16px"></div>
        <button class="m6-btn m6-btn-gold" id="r-calc">Calculer les indemnités</button>
        <div id="r-result" style="margin-top:14px"></div>
      </div>
    </div>`;
  },

  bindRuptureCalc() {
    document.getElementById('r-calc')?.addEventListener('click', () => {
      const sal = parseFloat(document.getElementById('r-sal')?.value) || 0;
      const anc = parseFloat(document.getElementById('r-anc')?.value) || 0;
      const ccn = document.getElementById('r-ccn')?.value.trim();
      if (!sal || anc < 0) { if(window.M6_toast) M6_toast('Remplissez salaire et ancienneté'); return; }

      const res  = this.calcLicenciement(sal, anc);
      const conv = this.calcConventionnel(sal, anc, ccn);
      const div  = document.getElementById('r-result');
      if (!div || !res) return;

      div.innerHTML = `
        <div class="m6-card">
          <div class="m6-card-body">
            <div class="m6-row"><span class="m6-row-label">Indemnité légale brute</span>
              <span class="m6-row-val" style="font-family:var(--font-display);font-size:1.2rem;color:var(--champagne-2)">${res.legale.toLocaleString('fr-FR')} €</span></div>
            <div class="m6-row"><span class="m6-row-label">Rupture conventionnelle (minimum)</span>
              <span class="m6-row-val">${res.rupture_conv.toLocaleString('fr-FR')} €</span></div>
            ${conv ? `<div class="m6-row"><span class="m6-row-label">Indemnité ${conv.methode}</span>
              <span class="m6-row-val" style="color:var(--champagne-2);font-weight:600">${conv.montant.toLocaleString('fr-FR')} €</span></div>` : ''}
            <div class="m6-row"><span class="m6-row-label">Barème Macron (fourchette)</span>
              <span class="m6-row-val">${res.bareme_min.toLocaleString('fr-FR')} – ${res.bareme_max.toLocaleString('fr-FR')} €</span></div>
            <div style="font-size:0.7rem;color:var(--pierre);margin-top:10px;line-height:1.5">${res.note}</div>
          </div>
        </div>`;
    });
  },
};

// ══════════════════════════════════════════════════════════════════
//  SIMULATEUR DE NULLITÉ DU FORFAIT
// ══════════════════════════════════════════════════════════════════
const M6_NulliteChecker = {

  renderSection() {
    return `
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Validité de votre forfait jours</div><div class="m6-ornement-line"></div></div>

    <div class="m6-alert info" style="margin-bottom:14px;font-size:0.78rem">
      <span>⚖️</span><div>Cette checklist évalue la solidité juridique de votre forfait. Un seul critère manquant peut suffire à le faire annuler aux prud'hommes (Cass. Soc. 29 juin 2011).</div>
    </div>

    <div class="m6-card" style="margin-bottom:14px">
      <div class="m6-card-body" id="nullite-form">
        ${CONDITIONS_VALIDITE.map(c => `
          <div style="margin-bottom:16px;padding-bottom:14px;border-bottom:var(--grey-line)">
            <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:6px">
              <input type="checkbox" id="nc-${c.id}" style="margin-top:3px;flex-shrink:0;width:16px;height:16px;accent-color:var(--champagne)">
              <label for="nc-${c.id}" style="font-size:0.83rem;font-weight:600;color:var(--charbon);line-height:1.4;cursor:pointer">${c.titre}</label>
              <span class="m6-badge m6-badge-neutral" style="margin-left:auto;flex-shrink:0">${c.art}</span>
            </div>
            <div style="font-size:0.75rem;color:var(--pierre);margin-left:26px;line-height:1.5">${c.question}</div>
          </div>`).join('')}
        <button class="m6-btn m6-btn-gold" id="nullite-check" style="margin-top:8px">Évaluer la solidité du forfait</button>
        <div id="nullite-result" style="margin-top:16px"></div>
      </div>
    </div>`;
  },

  bindNulliteChecker() {
    document.getElementById('nullite-check')?.addEventListener('click', () => {
      const critiques = [], forts = [], moderes = [];
      let score = 0;

      CONDITIONS_VALIDITE.forEach(c => {
        const checked = document.getElementById(`nc-${c.id}`)?.checked;
        if (checked) { score++; return; }
        const niveau = c.risque_si_non.startsWith('CRITIQUE') ? critiques
                     : c.risque_si_non.startsWith('FORT') ? forts : moderes;
        niveau.push(c);
      });

      const total  = CONDITIONS_VALIDITE.length;
      const pct    = Math.round(score / total * 100);
      const niveau = critiques.length > 0 ? 'danger' : forts.length > 1 ? 'warning' : 'success';
      const label  = pct === 100 ? 'Forfait solide' : pct >= 75 ? 'Quelques points à corriger' : 'Forfait fragilisé';

      const div = document.getElementById('nullite-result');
      if (!div) return;
      div.innerHTML = `
        <div class="m6-alert ${niveau}" style="margin-bottom:14px">
          <span class="m6-alert-icon">${niveau==='danger'?'🚨':niveau==='warning'?'⚠️':'✅'}</span>
          <div><strong>${label} — ${pct}% des conditions</strong><br>
          <span style="font-size:0.77rem">${score}/${total} critères validés${critiques.length?` · ${critiques.length} point(s) CRITIQUE(S)`:''}</span></div>
        </div>
        ${[...critiques, ...forts, ...moderes].map(c => `
          <div class="m6-card" style="margin-bottom:10px">
            <div class="m6-card-body">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:0.82rem;font-weight:600">${c.titre}</span>
                <span class="m6-badge ${c.risque_si_non.startsWith('CRITIQUE')?'m6-badge-danger':c.risque_si_non.startsWith('FORT')?'m6-badge-champagne':'m6-badge-neutral'}">
                  ${c.risque_si_non.split(' —')[0]}</span>
              </div>
              <div style="font-size:0.75rem;color:var(--pierre);line-height:1.5;margin-bottom:6px">${c.risque_si_non.split(' — ')[1]||''}</div>
              <div style="font-size:0.68rem;color:var(--info);font-style:italic">${c.jurisprudence}</div>
            </div>
          </div>`).join('')}
        ${pct===100?`<div class="m6-alert success"><span>✅</span><div><strong>Forfait juridiquement solide.</strong> Conservez vos historiques de saisie et comptes-rendus d'entretien — ils constituent votre preuve en cas de contrôle.</div></div>`:''}`;
    });
  },
};

// ══════════════════════════════════════════════════════════════════
//  MODE PREUVE — export ZIP certifié complet
// ══════════════════════════════════════════════════════════════════
const M6_ModePreuve = {

  /**
   * Génère un rapport JSON complet avec hash SHA-256 symbolique.
   * À terme, pourrait déclencher un export ZIP multi-PDF.
   */
  async genererPreuve(regime, year, contract, data, moods, analysis, bio) {
    const ts = new Date().toISOString();

    // Calcul d'un hash SHA-256 côté client (Web Crypto API)
    let hash = 'n/a';
    try {
      const payload = JSON.stringify({ regime, year, contract: { ...contract, tauxJournalier: undefined }, data, ts });
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload));
      hash = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('').slice(0,16);
    } catch {}

    const rapport = {
      version: 'M6_PREUVE_v1',
      genereLe: ts,
      hash_sha256: hash,
      exercice: year, regime,
      titulaire: contract?.nomCadre || contract?.nom || 'N/A',
      synthese: {
        joursEffectifs:  analysis?.joursEffectifs  || 0,
        plafond:         analysis?.plafond         || 218,
        rttPris:         analysis?.rttPris         || 0,
        rttTheoriques:   analysis?.rttTheoriques   || 0,
        rachetes:        analysis?.rachetes        || 0,
        cpPris:          analysis?.cpPris          || 0,
        tauxRemplissage: analysis?.tauxRemplissage || 0,
        alertes:         (analysis?.alertes||[]).length,
        phase_INRS:      bio?.phase?.code || 'N/A',
        score_CV_risque: bio?.cvRisk || 0,
      },
      entretien:    contract?.entretienDate || null,
      validations:  M6_Storage.getValidations(regime, year),
      log_count:    M6_Storage.getLog(regime, year).length,
      donnees_jours: Object.keys(data).length,
      certif: 'Le titulaire certifie l\'exactitude des données saisies et le respect recommandé des temps de repos légaux (11h quotidien, 35h hebdomadaire).',
    };

    // Télécharger le JSON preuve
    const blob = new Blob([JSON.stringify(rapport, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a'); a.href = url;
    a.download = `PREUVE_FORFAIT_${regime}_${year}_${hash}.json`;
    a.click(); URL.revokeObjectURL(url);

    if (window.M6_toast) M6_toast('Mode Preuve — rapport généré (#' + hash + ')');
    return hash;
  },

  renderButton(regime, year, contract, data, moods, analysis, bio) {
    return `
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Mode Preuve</div><div class="m6-ornement-line"></div></div>
    <div class="m6-card"><div class="m6-card-body">
      <div class="m6-alert info" style="margin-bottom:12px;font-size:0.78rem">
        <span>🔒</span><div>Le rapport de preuve contient un hash SHA-256 de vos données. En cas de contrôle ou de litige, il documente l\'état exact de votre forfait à un instant T.</div>
      </div>
      
      <button class="m6-btn m6-btn-primary" id="preuve-btn">Générer le rapport de preuve</button>
    </div></div>`;
  },

  bindPreuve(regime, year, contract, data, moods, analysis, bio) {
    document.getElementById('preuve-btn')?.addEventListener('click', async () => {
      await this.genererPreuve(regime, year, contract, data, moods, analysis, bio);
    });
  }
};

global.M6_TYPES_ETENDUS   = M6_TYPES_ETENDUS;
global.M6_NulliteChecker  = M6_NulliteChecker;
global.M6_RuptureCalc     = M6_RuptureCalc;
global.M6_ModePreuve      = Object.assign(global.M6_ModePreuve||{}, M6_ModePreuve);

})(window);
