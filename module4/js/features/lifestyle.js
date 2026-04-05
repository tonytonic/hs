/**
 * Lifestyle — Questionnaire rythme de vie + profil santé personnel
 * Stockage : DTE_LIFESTYLE = { sport, nutrition, sleep_quality, social, sens,
 *   stress_extra, pauses, ecrans_soir, age, poids, fumeur, handicap, enfants }
 * Sources : INRS, ANACT, Thompson 2022, Nature 2025, OMS, HAS, Inserm
 */
(function(global){ 'use strict';

const QUESTIONS = [
  // ── SECTION 1 : PROFIL PERSONNEL ──────────────────────────────
  {
    id: 'age',
    emoji: '🎂',
    titre: 'Âge',
    question: 'Dans quelle tranche d\'âge vous situez-vous ?',
    opts: [
      { v:0, e:'🌱', l:'Moins de 30 ans',    impact:'Récupération rapide, faible risque chronique (OMS)' },
      { v:1, e:'⚡', l:'30-44 ans',           impact:'Récupération normale, surveillance préventive' },
      { v:2, e:'🎯', l:'45-54 ans',           impact:'Récupération +20% plus lente (INRS) · risque cardio ↑' },
      { v:3, e:'🛡️', l:'55 ans et plus',      impact:'Fatigue accumulation ×1.3 · protection renforcée conseillée' },
    ],
    source: 'INRS — Vieillissement et travail · OMS — santé des travailleurs vieillissants',
  },
  {
    id: 'poids',
    emoji: '⚖️',
    titre: 'Indice de masse corporelle',
    question: 'Quel est votre IMC approximatif ?',
    opts: [
      { v:0, e:'🔵', l:'Insuffisant (<18.5)',    impact:'Réserves énergétiques réduites · récupération plus lente' },
      { v:1, e:'🟢', l:'Normal (18.5-24.9)',      impact:'Aucun impact supplémentaire (OMS)' },
      { v:2, e:'🟡', l:'Surpoids (25-29.9)',      impact:'Fatigue physique +8% · risque cardio légèrement ↑' },
      { v:3, e:'🔴', l:'Obésité (≥30)',           impact:'Fatigue +15% · risque cardio ×1.4 (Lancet 2021)' },
    ],
    source: 'Lancet 2021 · OMS — IMC et santé au travail · INRS',
  },
  {
    id: 'fumeur',
    emoji: '🚭',
    titre: 'Tabagisme',
    question: 'Quel est votre rapport au tabac ?',
    opts: [
      { v:0, e:'✅', l:'Non-fumeur',              impact:'Pas d\'impact supplémentaire' },
      { v:1, e:'🚫', l:'Ex-fumeur (>1 an)',       impact:'Légère protection cardiovasculaire restaurée' },
      { v:2, e:'🚬', l:'Fumeur occasionnel',      impact:'Stress oxydatif +10% · récupération -8% (HAS)' },
      { v:3, e:'⚠️', l:'Fumeur régulier',         impact:'Risque cardio ×1.5 · récupération -15% (HAS 2023)' },
    ],
    source: 'HAS 2023 — Tabac et santé · OMS · Inserm — tabagisme et fatigue',
  },
  {
    id: 'handicap',
    emoji: '🏥',
    titre: 'Santé chronique',
    question: 'Avez-vous une maladie chronique, un handicap ou un traitement médical ?',
    opts: [
      { v:0, e:'✅', l:'Aucun',                   impact:'Pas d\'impact' },
      { v:1, e:'💊', l:'Traitement léger',        impact:'Légère majoration de la fatigue' },
      { v:2, e:'🏥', l:'Maladie chronique',       impact:'Fatigue +20% · récupération -15% (HAS)' },
      { v:3, e:'♿', l:'Handicap/pathologie lourde', impact:'Fatigue +30% · suivi médical du travail recommandé' },
    ],
    source: 'HAS — Maladies chroniques et travail · Art. L4121-1 Code du travail · Inserm',
  },
  {
    id: 'enfants',
    emoji: '👨‍👩‍👧',
    titre: 'Vie familiale',
    question: 'Avez-vous des enfants à charge ou des responsabilités familiales importantes ?',
    opts: [
      { v:0, e:'👤', l:'Non',                     impact:'Pas d\'impact' },
      { v:1, e:'👶', l:'1-2 enfants',             impact:'Sommeil -12% qualité · récupération nocturne réduite (ANACT)' },
      { v:2, e:'👨‍👩‍👧‍👦', l:'3 enfants ou plus',  impact:'Sommeil -20% · double charge : stress +15% (ANACT RPS)' },
      { v:3, e:'🤱', l:'Aidant familial',          impact:'Charge mentale ×1.4 · burnout ×2 (HAS 2017)' },
    ],
    source: 'ANACT RPS 2022 · HAS 2017 — charge aidants · Inserm — double journée',
  },
  // ── SECTION 2 : HYGIÈNE DE VIE ────────────────────────────────
  {
    id: 'sport',
    emoji: '🏃',
    titre: 'Activité physique',
    question: 'À quelle fréquence faites-vous de l\'activité physique ?',
    opts: [
      { v:0, e:'😴', l:'Jamais',                  impact:'Récupération réduite de 25% (INRS)' },
      { v:1, e:'🚶', l:'1× par semaine',          impact:'Bénéfice limité' },
      { v:2, e:'🏃', l:'2-3× par semaine',        impact:'Optimal : cortisol -15%, récup +20%' },
      { v:3, e:'⚡', l:'4×+ par semaine',         impact:'Très actif : attention à la fatigue physique' },
    ],
    source: 'INRS · OMS : 150min/sem recommandées · Sonnentag 2003',
  },
  {
    id: 'nutrition',
    emoji: '🥗',
    titre: 'Alimentation',
    question: 'Comment qualifieriez-vous votre alimentation ?',
    opts: [
      { v:0, e:'🍕', l:'Mal équilibrée',          impact:'+12% fatigue chronique (INRS)' },
      { v:1, e:'🥙', l:'Passable',                impact:'Léger impact sur récupération' },
      { v:2, e:'🥗', l:'Équilibrée',              impact:'Neutre — base saine' },
      { v:3, e:'🥦', l:'Très soignée',            impact:'Récupération +10%, cortisol -8%' },
    ],
    source: 'INRS — alimentation et fatigue · ANACT 2022',
  },
  {
    id: 'sleep_quality',
    emoji: '😴',
    titre: 'Qualité du sommeil',
    question: 'Comment dormez-vous en général (hors ce matin) ?',
    opts: [
      { v:0, e:'😵', l:'Très mal (troubles)',     impact:'+14% cortisol, -15% perf (Thompson 2022)' },
      { v:1, e:'😞', l:'Mal (6h ou moins)',       impact:'+10% fatigue, -10% perf' },
      { v:2, e:'😐', l:'Correctement (7h)',       impact:'Base normale' },
      { v:3, e:'😊', l:'Très bien (8h+)',         impact:'Récupération optimale' },
    ],
    source: 'Thompson 2022 (Frontiers) · OMS : 7-9h adultes',
  },
  {
    id: 'sens',
    emoji: '🎯',
    titre: 'Sens au travail',
    question: 'Trouvez-vous du sens dans votre travail ?',
    opts: [
      { v:0, e:'😶', l:'Non, aucun sens',         impact:'Fatigue perçue ×1.4 (Nature 2025)' },
      { v:1, e:'😕', l:'Peu de sens',             impact:'Fatigue perçue légèrement amplifiée' },
      { v:2, e:'😐', l:'Moyennement',             impact:'Neutre' },
      { v:3, e:'🚀', l:'Oui, très motivant',      impact:'Fatigue perçue -40%, résilience ↑ (Nature 2025)' },
    ],
    source: 'Fan et al. Nature Hum.Behav. 2025 · Maslach Burnout Inventory',
  },
  {
    id: 'social',
    emoji: '👥',
    titre: 'Soutien social',
    question: 'Avez-vous un bon soutien (famille, amis, collègues) ?',
    opts: [
      { v:0, e:'😔', l:'Non, isolé(e)',            impact:'Stress ×1.3 (ANACT)' },
      { v:1, e:'🙁', l:'Peu de soutien',           impact:'Légère vulnérabilité' },
      { v:2, e:'🙂', l:'Soutien correct',          impact:'Neutre' },
      { v:3, e:'🤝', l:'Très bien entouré(e)',     impact:'Stress -20%, burnout -15% (ANACT RPS)' },
    ],
    source: 'ANACT RPS 2022 · ANI Stress 2008',
  },
  {
    id: 'stress_extra',
    emoji: '⚡',
    titre: 'Stress extérieur',
    question: 'Avez-vous des sources de stress hors travail ?',
    opts: [
      { v:0, e:'😌', l:'Non, vie calme',           impact:'Pas d\'amplification' },
      { v:1, e:'🙂', l:'Peu de stress',            impact:'Impact faible' },
      { v:2, e:'😟', l:'Stress modéré',            impact:'Cortisol +10% (ANACT)' },
      { v:3, e:'😱', l:'Stress intense',           impact:'Cortisol +25%, récup -20% (ANACT)' },
    ],
    source: 'ANACT RPS · Thompson 2022',
  },
  {
    id: 'pauses',
    emoji: '☕',
    titre: 'Pauses au travail',
    question: 'Faites-vous de vraies pauses pendant la journée ?',
    opts: [
      { v:0, e:'💻', l:'Non, sans pause',           impact:'Fatigue +15%, erreurs ×2 (INRS)' },
      { v:1, e:'🕐', l:'1 pause courte',            impact:'Insuffisant si >8h/j' },
      { v:2, e:'☕', l:'Pauses régulières',         impact:'Récupération normale' },
      { v:3, e:'🧘', l:'Pauses + déconnexion',      impact:'Récupération +18% (Sonnentag 2003)' },
    ],
    source: 'Sonnentag 2003 · INRS 2021',
  },
  {
    id: 'ecrans_soir',
    emoji: '📱',
    titre: 'Écrans le soir',
    question: 'Utilisez-vous des écrans moins d\'1h avant de dormir ?',
    opts: [
      { v:0, e:'📱', l:'Oui, jusqu\'au coucher',   impact:'Mélatonine -50%, sommeil dégradé (OMS)' },
      { v:1, e:'💡', l:'Parfois',                  impact:'Impact modéré' },
      { v:2, e:'🌙', l:'Rarement',                 impact:'Peu d\'impact' },
      { v:3, e:'✨', l:'Non, arrêt 1h avant',      impact:'Sommeil +15% qualité (OMS)' },
    ],
    source: 'OMS — hygiène du sommeil · INRS 2021',
  },
  {
    id: 'alcool',
    emoji: '🍷',
    titre: "Consommation d'alcool",
    question: "Quelle est votre consommation d'alcool habituelle ?",
    opts: [
      { v:0, e:'💧', l:'Aucune ou très rare',       impact:"Pas d'impact" },
      { v:1, e:'🍷', l:'Modérée (≤2 verres/j)',     impact:'Sommeil fragmenté +10%, récup réduite (INSERM)' },
      { v:2, e:'🍺', l:'Régulière (3-4 verres/j)',  impact:'Sommeil -25%, fatigue +15%, cortisol ↑ (INSERM)' },
      { v:3, e:'⚠️', l:'Importante (>4 verres/j)',  impact:'Fatigue +30%, risque cardio ×1.4 (OMS/INSERM)' },
    ],
    source: 'INSERM — Alcool et santé 2021 · OMS · HAS 2023',
  },
  {
    id: 'drogues',
    emoji: '💊',
    titre: 'Substances psychoactives',
    question: 'Consommez-vous des substances psychoactives (cannabis, stimulants, somnifères hors prescription) ?',
    opts: [
      { v:0, e:'✅', l:'Non',                        impact:"Pas d'impact" },
      { v:1, e:'💊', l:'Somnifères/anxiolytiques',   impact:'Sommeil artificiel : récupération -15% (HAS)' },
      { v:2, e:'🌿', l:'Cannabis occasionnel',       impact:'Mémoire -10%, motivation réduite (INSERM 2022)' },
      { v:3, e:'⚡', l:'Stimulants/autres',           impact:'Cycle veille/sommeil perturbé, fatigue chronique ↑ (INSERM)' },
    ],
    source: 'INSERM — Addictions 2022 · HAS · OFDT 2023',
  },
];

class LifestylePanel {
  constructor() {
    this._modal = null;
    this._step  = 0;
    this._data  = this._load();
  }

  _load() {
    try { return JSON.parse(localStorage.getItem('DTE_LIFESTYLE') || '{}'); }
    catch(_) { return {}; }
  }

  _save(data) {
    localStorage.setItem('DTE_LIFESTYLE', JSON.stringify(data));
    this._data = data;
  }

  static getBoosts() {
    let d = {};
    try { d = JSON.parse(localStorage.getItem('DTE_LIFESTYLE') || '{}'); }
    catch(_) {}
    if (!Object.keys(d).length) {
      return { fatigueMult:1.0, stress:0, performance:0, recovery:0, cvRisk:0 };
    }

    // ── ARCHITECTURE : MOYENNE PONDÉRÉE DES DELTAS (Framingham-style) ────────
    // Ancienne approche : produit des multiplicateurs → explosion exponentielle
    //   Ex: âge×poids×tabac×enfants = 1.28×1.15×1.15×1.22 = 2.06 → cap forcé à 1.80
    // Nouvelle approche : Σ(weight_i × delta_i) / Σweight_i_présents
    //   Les facteurs se moyennent (comme Framingham Heart Score, OMS SCORE-2)
    //   Les facteurs corrélés (âge + sédentarité + obésité) ne se multiplient plus.
    //
    // Amplitude calibrée pour rester dans [0.65, 1.45] naturellement sans cap forcé :
    //   Profil tout-neutre    → ×1.00
    //   Profil idéal          → ×0.85 (lifestyle parfait ≠ immunité biologique)
    //   Profil tout-défavorable → ×1.42 (significatif, mais plus ×1.80 cap artificiel)
    //   Cadre 45ans/enfants/stress → ×1.10 (vs ×1.52 ancien — bien plus réaliste)

    const FACTORS = [
      // [id, poids_scientifique, [mult_v0, mult_v1, mult_v2, mult_v3]]
      // Poids calibrés sur l'importance relative dans les études INRS/HAS/ANACT/OMS
      // Profil santé
      ['age',          0.12, [0.95, 1.00, 1.18, 1.28]],  // INRS — vieillissement et récup
      ['poids',        0.08, [1.05, 1.00, 1.08, 1.15]],  // Lancet 2021 — IMC et fatigue
      ['fumeur',       0.08, [1.00, 0.98, 1.08, 1.15]],  // HAS 2023 — tabac et cortisol
      ['handicap',     0.10, [1.00, 1.06, 1.20, 1.30]],  // HAS — charge physique/cognitive
      ['enfants',      0.08, [1.00, 1.08, 1.15, 1.22]],  // ANACT — charge parentale
      // Rythme de vie
      ['sport',        0.13, [1.08, 1.02, 0.90, 0.85]],  // OMS — activité physique protectrice
      ['nutrition',    0.08, [1.08, 1.02, 0.97, 0.93]],  // ANSES — nutrition et récupération
      ['sleep_quality',0.12, [1.12, 1.06, 1.00, 0.92]],  // INSERM — qualité sommeil habituel
      ['sens',         0.10, [1.12, 1.04, 1.00, 0.80]],  // Nature 2025 (Fan) — sens au travail
      ['pauses',       0.05, [1.08, 1.02, 0.97, 0.92]],  // INRS — micropausses et récup
      ['ecrans_soir',  0.03, [1.08, 1.03, 1.00, 0.97]],  // INSERM — mélatonine et sommeil
      ['alcool',       0.08, [1.00, 1.04, 1.10, 1.20]],  // INSERM 2021 — alcool et fatigue
      ['drogues',      0.05, [1.00, 1.10, 1.12, 1.25]],  // INSERM 2022 — substances psycho
    ];
    // Σ poids = 1.10 (intentionnel : pondération relative, normalisée aux facteurs présents)

    let weightedDelta = 0;
    let totalWeight   = 0;

    for (const [id, w, mults] of FACTORS) {
      if (d[id] !== undefined) {
        const delta = (mults[d[id]] ?? 1.0) - 1.0; // delta relatif au neutre (×1.0)
        weightedDelta += w * delta;
        totalWeight   += w;
      }
    }

    // Normaliser par les poids des facteurs réellement renseignés
    // Amplifier ×2.5 pour conserver une gamme significative [~0.85, ~1.42]
    const normalizedDelta = totalWeight > 0 ? weightedDelta / totalWeight : 0;
    const fatigueMult = Math.max(0.65, Math.min(1.45, 1.0 + normalizedDelta * 2.5));

    // ── CVRISKADD — conservé tel quel (additif, déjà borné) ─────────────────
    let cvRiskAdd = 0;
    if (d.poids  === 2) cvRiskAdd += 0.02;
    if (d.poids  === 3) cvRiskAdd += 0.06;
    if (d.fumeur === 2) cvRiskAdd += 0.03;
    if (d.fumeur === 3) cvRiskAdd += 0.08;
    if (d.alcool >= 2)  cvRiskAdd += (d.alcool - 1) * 0.03;
    if (d.sport  !== undefined) cvRiskAdd -= (d.sport / 3) * 0.04;
    cvRiskAdd = Math.max(-0.05, Math.min(0.15, cvRiskAdd));

    // ── ADDITIFS stress/perf/récup — conservés (déjà additifs et bornés) ────
    let stress = 0, perf = 0, rec = 0;
    if (d.social       !== undefined) { stress -= (d.social / 3) * 0.06;       rec += (d.social / 3) * 0.04; }
    if (d.stress_extra !== undefined) { stress += (d.stress_extra / 3) * 0.10; rec -= (d.stress_extra / 3) * 0.05; }
    if (d.enfants      !== undefined) { stress += (d.enfants / 3) * 0.06;      rec -= (d.enfants / 3) * 0.05; }
    if (d.fumeur       !== undefined) { rec    -= (d.fumeur / 3) * 0.05; }
    if (d.alcool       !== undefined) { rec    -= (d.alcool / 3) * 0.06; }
    if (d.drogues      !== undefined) { rec    -= (d.drogues / 3) * 0.05; perf -= (d.drogues / 3) * 0.04; }
    if (d.sens         !== undefined) { perf   += ((d.sens - 1) / 3) * 0.08;   stress -= ((d.sens - 1) / 3) * 0.04; }
    if (d.sport        !== undefined) { rec    += (d.sport / 3) * 0.06; }
    if (d.sleep_quality!== undefined) { perf   += ((d.sleep_quality - 1.5) / 1.5) * 0.07; rec += ((d.sleep_quality - 1.5) / 1.5) * 0.05; }
    if (d.age          !== undefined && d.age >= 2) { perf -= (d.age - 1) * 0.03; }

    stress = Math.max(-0.10, Math.min(0.15, stress));
    perf   = Math.max(-0.12, Math.min(0.10, perf));
    rec    = Math.max(-0.12, Math.min(0.10, rec));

    return { fatigueMult, stress, performance: perf, recovery: rec, cvRisk: cvRiskAdd };
  }

  static hasData() {
    try {
      const d = JSON.parse(localStorage.getItem('DTE_LIFESTYLE') || '{}');
      return Object.keys(d).length >= 6;
    } catch(_) { return false; }
  }

  open() {
    if (!this._modal) {
      this._modal = document.createElement('div');
      this._modal.id = 'lifestyle-modal';
      this._modal.className = 'modal hidden';
      document.body.appendChild(this._modal);
    }
    this._step = 0;
    this._render();
    this._modal.classList.remove('hidden');
  }

  close() {
    // BUG 2 FIX : si le profil a des données, toujours resync en fermant
    // (couvre le cas fermeture via overlay ✕ sans cliquer "FERMER ET METTRE À JOUR")
    this._modal?.classList.add('hidden');
    if (LifestylePanel.hasData()) {
      setTimeout(() => {
        if (window._fullSync) window._fullSync();
        else if (window._forcSync) window._forcSync();
      }, 80);
    }
  }

  _render() {
    const q   = QUESTIONS[this._step];
    const n   = QUESTIONS.length;
    const pct = Math.round((this._step / n) * 100);
    const val = this._data[q.id];
    const isPersonal = this._step < 5;  // section profil personnel

    this._modal.innerHTML = '<div class="modal-overlay"></div>'
      + '<div class="modal-box" style="max-width:480px;">'
      + '<div class="modal-header">'
      + '<h2 style="font-size:12px;letter-spacing:.04em;">'
      + (isPersonal ? '👤 PROFIL SANTÉ' : '🌿 RYTHME DE VIE')
      + ' — ' + (this._step+1) + ' / ' + n + '</h2>'
      + '<span class="modal-close" id="ls-close">✕</span>'
      + '</div>'
      + '<div style="height:3px;background:rgba(255,255,255,0.08);margin:0 -16px 16px;">'
      + '<div style="height:100%;width:' + pct + '%;background:' + (isPersonal?'#22b8e8':'var(--sync)') + ';transition:width .3s;"></div>'
      + '</div>'
      + '<div style="text-align:center;font-size:32px;margin-bottom:10px;">' + q.emoji + '</div>'
      + '<div style="font-size:15px;font-weight:600;color:#fff;text-align:center;margin-bottom:6px;">' + q.question + '</div>'
      + '<div style="font-size:10px;color:rgba(255,255,255,0.4);text-align:center;margin-bottom:14px;font-style:italic;">📚 ' + q.source + '</div>'
      + '<div style="display:flex;flex-direction:column;gap:8px;">'
      + q.opts.map(o => {
          const selected = val === o.v;
          return '<button data-val="' + o.v + '" style="display:flex;align-items:center;gap:12px;padding:11px 14px;'
            + 'background:rgba(0,10,25,' + (selected?'.95':'.75') + ');cursor:pointer;text-align:left;'
            + 'border:' + (selected?'2px solid rgba(0,255,204,0.7)':'1px solid rgba(255,255,255,0.1)') + ';">'
            + '<span style="font-size:22px;flex-shrink:0;">' + o.e + '</span>'
            + '<div style="flex:1;">'
            + '<div style="font-size:13px;color:#fff;">' + o.l + '</div>'
            + '<div style="font-size:10px;color:rgba(255,255,255,0.5);margin-top:2px;">' + o.impact + '</div>'
            + '</div>'
            + (selected ? '<span style="color:var(--sync);font-size:16px;">✓</span>' : '')
            + '</button>';
        }).join('')
      + '</div>'
      + (this._step > 0 ? '<button id="ls-prev" style="margin-top:12px;font-size:11px;color:rgba(255,255,255,0.4);background:none;border:none;cursor:pointer;">← Précédent</button>' : '')
      + '</div>';

    this._modal.querySelectorAll('button[data-val]').forEach(btn => {
      btn.addEventListener('click', () => {
        this._data[q.id] = parseInt(btn.dataset.val);
        setTimeout(() => {
          if (this._step < n - 1) { this._step++; this._render(); }
          else { this._submit(); }
        }, 200);
      });
    });

    this._modal.querySelector('.modal-overlay')?.addEventListener('click', () => this.close());
    document.getElementById('ls-close')?.addEventListener('click', () => this.close());
    document.getElementById('ls-prev')?.addEventListener('click', () => { this._step--; this._render(); });
  }

  _submit() {
    this._save(this._data);

    const b = LifestylePanel.getBoosts();
    const fatImpact  = Math.round((b.fatigueMult - 1) * 100);
    const perfImpact = Math.round((b.performance || 0) * 100);
    const strImpact  = Math.round((b.stress || 0) * 100);
    const recImpact  = Math.round((b.recovery || 0) * 100);

    const fmt = (v, inv) => {
      if (Math.abs(v) < 1) return '<span style="color:rgba(255,255,255,0.4)">= stable</span>';
      const good = inv ? v < 0 : v > 0;
      const col  = good ? '#00aa88' : '#c82838';
      const sign = v > 0 ? '+' : '';
      return '<span style="color:' + col + '">' + sign + v + '%</span>';
    };

    // Labels profil santé pour le résumé
    const profileLabels = [];
    const AGE_L = ['<30 ans','30-44 ans','45-54 ans','55+ ans'];
    const POI_L = ['IMC insuffisant','IMC normal','Surpoids','Obésité'];
    const FUM_L = ['Non-fumeur','Ex-fumeur','Fumeur occ.','Fumeur régulier'];
    const HAN_L = ['Aucun','Traitement léger','Maladie chronique','Handicap/pathologie'];
    const ENF_L = ['Sans charge','1-2 enfants','3 enfants+','Aidant familial'];
    if (this._data.age !== undefined)      profileLabels.push(AGE_L[this._data.age]);
    if (this._data.poids !== undefined)    profileLabels.push(POI_L[this._data.poids]);
    if (this._data.fumeur !== undefined && this._data.fumeur > 0) profileLabels.push(FUM_L[this._data.fumeur]);
    if (this._data.handicap !== undefined && this._data.handicap > 0) profileLabels.push(HAN_L[this._data.handicap]);
    if (this._data.enfants !== undefined && this._data.enfants > 0) profileLabels.push(ENF_L[this._data.enfants]);

    this._modal.innerHTML = '<div class="modal-overlay"></div>'
      + '<div class="modal-box" style="max-width:480px;">'
      + '<div class="modal-header">'
      + '<h2 style="font-size:13px;">🌿 Profil enregistré</h2>'
      + '<span class="modal-close" id="ls-close2">✕</span>'
      + '</div>'
      + '<div style="text-align:center;font-size:40px;margin:16px 0 12px;">✅</div>'
      + '<div style="font-size:14px;font-weight:600;color:#fff;text-align:center;margin-bottom:4px;">Profil complet enregistré</div>'
      + '<div style="font-size:12px;color:rgba(255,255,255,0.6);text-align:center;margin-bottom:12px;">Vos scores ont été personnalisés.</div>'
      + (profileLabels.length ? '<div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;margin-bottom:14px;">'
          + profileLabels.map(l=>'<span style="font-size:10px;background:rgba(0,200,255,0.1);border:1px solid rgba(0,200,255,0.2);padding:2px 8px;color:#22b8e8;">'+l+'</span>').join('')
          + '</div>' : '')
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:14px;">'
      + [['Fatigue', fatImpact, false], ['Stress', strImpact, true], ['Performance', perfImpact, false], ['Récupération', recImpact, false]].map(([l, v, inv]) =>
          '<div style="padding:10px;background:rgba(0,10,25,.8);border:1px solid rgba(255,255,255,0.08);text-align:center;">'
          + '<div style="font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:4px;">' + l + '</div>'
          + '<div style="font-size:18px;font-weight:700;">' + fmt(v, inv) + '</div>'
          + '</div>'
        ).join('')
      + '</div>'
      + '<div style="font-size:10px;color:rgba(255,255,255,0.35);padding-top:10px;border-top:1px solid rgba(255,255,255,0.08);">'
      + '📚 INRS · HAS · ANACT RPS · Nature 2025 (Fan et al.) · Thompson 2022 · Inserm · OMS'
      + '</div>'
      + '<button id="ls-done" style="width:100%;margin-top:14px;padding:10px;background:rgba(0,255,204,0.1);border:1px solid rgba(0,255,204,0.3);color:var(--sync);font-family:var(--font-mono);font-size:12px;cursor:pointer;">FERMER ET METTRE À JOUR</button>'
      + '</div>';

    document.getElementById('ls-done')?.addEventListener('click', () => {
      this.close();
      const sub = document.getElementById('lifestyle-sub');
      if (sub) sub.textContent = '✓ Profil enregistré — cliquer pour modifier';
      setTimeout(() => {
        if (window._fullSync) window._fullSync();
        else if (window._forcSync) window._forcSync();
      }, 100);
    });
    document.getElementById('ls-close2')?.addEventListener('click', () => this.close());
    this._modal.querySelector('.modal-overlay')?.addEventListener('click', () => this.close());
  }
}

global.LifestylePanel = LifestylePanel;
}(typeof window !== 'undefined' ? window : global));
