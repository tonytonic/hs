/**
 * CHARTS M6 — Graphiques évolution temporelle
 * Canvas natif (sans dépendance externe)
 * Courbes : Fatigue · Stress · Récupération · Performance · Consommation forfait
 */
'use strict';

(function(global) {

const PALETTE = {
  fatigue:     '#B85C50',
  stress:      '#C4853A',
  recovery:    '#2D6A4F',
  performance: '#3730A3',
  forfait:     '#C4A35A',
  grid:        'rgba(26,23,20,0.08)',
  text:        '#8A847C',
  bg:          '#FFFFFF',
};

const M6_Charts = {

  /**
   * Graphique d'évolution mensuelle des scores bio (12 mois ou depuis le début).
   * Calcule les scores mois par mois en rejouant le moteur bio sur les données cumulées.
   *
   * @param {HTMLCanvasElement|string} canvas  — canvas DOM ou id
   * @param {object}  contract
   * @param {object}  data       — { "YYYY-MM-DD": {...} }
   * @param {object}  moods
   * @param {number}  year
   * @param {string[]} metrics   — ['fatigue','stress','recovery','performance']
   */
  drawBioEvolution(canvas, contract, data, moods, year, metrics = ['fatigue', 'stress', 'recovery', 'performance']) {
    const cv = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2); // plafonner à 2x pour perf mobile
    // Lire la largeur CSS réelle (getBoundingClientRect > offsetWidth sur mobile)
    const rect = cv.getBoundingClientRect();
    const W = Math.floor(rect.width || cv.parentElement?.getBoundingClientRect()?.width || 320);
    const H = cv.offsetHeight || 180;
    // Forcer les attributs de taille (sans ça le canvas déborde)
    cv.style.width  = '100%';
    cv.style.maxWidth = '100%';
    cv.style.height = H + 'px';
    cv.width  = W * DPR;
    cv.height = H * DPR;
    ctx.scale(DPR, DPR);

    // ── Calculer les scores par mois ──────────────────────────
    const monthScores = []; // [{mois, fatigue, stress, recovery, performance}]
    const monthNames  = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc'];
    // Trouver tous les mois qui ont au moins une saisie
    // (pas de limite à aujourd'hui : les saisies rétroactives doivent s'afficher)
    const moisAvecData = new Set();
    for (const dk of Object.keys(data)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(dk)) {
        const mois = parseInt(dk.slice(5,7)) - 1;
        moisAvecData.add(mois);
      }
    }
    // Calculer aussi les mois intermédiaires (pour une courbe continue)
    const minMois = moisAvecData.size ? Math.min(...moisAvecData) : 0;
    const maxMois = moisAvecData.size ? Math.max(...moisAvecData) : 11;

    for (let m = minMois; m <= maxMois; m++) {
      // Données cumulées jusqu'à ce mois (inclut saisies rétroactives)
      const dataCumul = {};
      for (const [dk, v] of Object.entries(data)) {
        if (dk.startsWith(String(year))) {
          const mois = parseInt(dk.slice(5,7)) - 1;
          if (mois <= m) dataCumul[dk] = v;
        }
      }
      if (Object.keys(dataCumul).length === 0) continue;

      const bio = window.M6_BioEngine?.analyzeForfaitJours
        ? M6_BioEngine.analyzeForfaitJours(contract, dataCumul, year)
        : null;

      if (!bio?.hasData) continue;
      monthScores.push({
        mois: m, label: monthNames[m],
        fatigue:     bio.fatigue,
        stress:      bio.stress,
        recovery:    bio.recovery,
        performance: bio.performance,
        cvRisk:      bio.cvRisk,
        agingRisk:   bio.agingRisk,
      });
    }

    if (monthScores.length < 2) {
      this._drawNoData(ctx, W, H, 'Données insuffisantes\n(min. 2 mois)');
      return;
    }

    // ── Dessin ────────────────────────────────────────────────
    const PAD = { top: 16, right: 16, bottom: 32, left: 36 };
    const CW  = W - PAD.left - PAD.right;
    const CH  = H - PAD.top  - PAD.bottom;

    // Fond
    ctx.fillStyle = PALETTE.bg;
    ctx.fillRect(0, 0, W, H);

    // Grille horizontale (0, 25, 50, 75, 100)
    ctx.setLineDash([2, 4]);
    ctx.strokeStyle = PALETTE.grid;
    ctx.lineWidth = 1;
    [0, 25, 50, 75, 100].forEach(val => {
      const y = PAD.top + CH * (1 - val / 100);
      ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(PAD.left + CW, y); ctx.stroke();
      ctx.fillStyle = PALETTE.text;
      ctx.font = `${9 * DPR / DPR}px system-ui`;
      ctx.textAlign = 'right';
      ctx.fillText(val, PAD.left - 4, y + 3);
    });
    ctx.setLineDash([]);

    // Étiquettes mois
    ctx.fillStyle = PALETTE.text;
    ctx.font = `${9 * DPR / DPR}px system-ui`;
    ctx.textAlign = 'center';
    const step = CW / Math.max(1, monthScores.length - 1);
    monthScores.forEach((ms, i) => {
      const x = PAD.left + i * step;
      ctx.fillText(ms.label, x, H - 8);
    });

    // Courbes
    metrics.forEach(metric => {
      if (!PALETTE[metric]) return;
      ctx.strokeStyle = PALETTE[metric];
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();
      monthScores.forEach((ms, i) => {
        const x = PAD.left + i * step;
        const y = PAD.top + CH * (1 - (ms[metric] || 0) / 100);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Points
      monthScores.forEach((ms, i) => {
        const x = PAD.left + i * step;
        const y = PAD.top + CH * (1 - (ms[metric] || 0) / 100);
        ctx.fillStyle = PALETTE[metric];
        ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
      });
    });
  },

  /**
   * Graphique consommation du forfait jours (barre mensuelle vs courbe cumulative).
   */
  drawForfaitEvolution(canvas, data, analysis, year) {
    const cv = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const rect = cv.getBoundingClientRect();
    const W = Math.floor(rect.width || cv.parentElement?.getBoundingClientRect()?.width || 320);
    const H = cv.offsetHeight || 150;
    cv.style.width  = '100%';
    cv.style.maxWidth = '100%';
    cv.style.height = H + 'px';
    cv.width  = W * DPR;
    cv.height = H * DPR;
    ctx.scale(DPR, DPR);

    const monthNames = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc'];
    const plafond    = analysis?.plafond || 218;
    const today      = new Date();
    const maxMois    = today.getFullYear() === year ? today.getMonth() : 11;

    // Compter les jours par mois
    const parMois = Array(12).fill(0);
    for (const [dk, v] of Object.entries(data)) {
      if (!dk.startsWith(String(year))) continue;
      const m = parseInt(dk.slice(5,7)) - 1;
      const t = v.type || 'travail';
      if (t === 'travail') parMois[m]++;
      else if (t === 'rachat') parMois[m]++;
      else if (t === 'demi') parMois[m] += 0.5;
    }

    // Cumulatif
    const cumul = [];
    let runningTotal = 0;
    for (let m = 0; m <= maxMois; m++) {
      runningTotal += parMois[m];
      cumul.push(runningTotal);
    }

    if (cumul.every(v => v === 0)) {
      this._drawNoData(ctx, W, H, 'Aucune donnée saisie');
      return;
    }

    const PAD = { top: 12, right: 12, bottom: 28, left: 32 };
    const CW  = W - PAD.left - PAD.right;
    const CH  = H - PAD.top  - PAD.bottom;
    const barW = Math.max(4, CW / 12 * 0.55);

    ctx.fillStyle = PALETTE.bg; ctx.fillRect(0, 0, W, H);

    // Axe Y — max = plafond
    ctx.setLineDash([2, 4]); ctx.strokeStyle = PALETTE.grid; ctx.lineWidth = 1;
    [0, Math.round(plafond/4), Math.round(plafond/2), Math.round(plafond*3/4), plafond].forEach(val => {
      const y = PAD.top + CH * (1 - val / plafond);
      ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(PAD.left + CW, y); ctx.stroke();
      ctx.fillStyle = PALETTE.text; ctx.font = '9px system-ui'; ctx.textAlign = 'right';
      ctx.fillText(val, PAD.left - 3, y + 3);
    });
    ctx.setLineDash([]);

    // Barres mensuelles
    for (let m = 0; m <= maxMois; m++) {
      const x = PAD.left + (m / 11) * CW - barW / 2;
      const barH = CH * (parMois[m] / plafond);
      const y = PAD.top + CH - barH;
      const pct = cumul[m] / plafond;
      ctx.fillStyle = pct >= 1 ? '#9B2C2C' : pct >= 0.9 ? '#C4853A' : 'rgba(196,163,90,0.45)';
      ctx.beginPath();
      ctx.roundRect?.(x, y, barW, barH, [2, 2, 0, 0]) || ctx.rect(x, y, barW, barH);
      ctx.fill();

      ctx.fillStyle = PALETTE.text; ctx.font = '8px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(monthNames[m], PAD.left + (m / 11) * CW, H - 6);
    }

    // Ligne cumulative
    ctx.strokeStyle = PALETTE.forfait; ctx.lineWidth = 2;
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath();
    for (let m = 0; m <= maxMois; m++) {
      const x = PAD.left + (m / 11) * CW;
      const y = PAD.top + CH * (1 - cumul[m] / plafond);
      m === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Ligne plafond
    ctx.strokeStyle = '#9B2C2C'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    const yPlafond = PAD.top;
    ctx.beginPath(); ctx.moveTo(PAD.left, yPlafond); ctx.lineTo(PAD.left + CW, yPlafond); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#9B2C2C'; ctx.font = '8px system-ui'; ctx.textAlign = 'right';
    ctx.fillText(`${plafond}j`, PAD.left - 3, yPlafond + 3);
  },

  /**
   * Mini-graphique radar des 4 scores (Fatigue/Stress/Recovery/Performance).
   * Rendu dans un carré H×H.
   */
  drawRadar(canvas, bio) {
    const cv = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
    if (!cv || !bio?.hasData) return;
    const ctx = cv.getContext('2d');
    const DPR = window.devicePixelRatio || 1;
    const S   = Math.min(cv.offsetWidth, cv.offsetHeight) || 160;
    cv.width = S * DPR; cv.height = S * DPR;
    ctx.scale(DPR, DPR);

    const cx = S / 2, cy = S / 2;
    const R  = S / 2 - 20;

    const metrics = [
      { key: 'performance', label: 'Perf',    angle: -Math.PI/2,          val: bio.performance || 0 },
      { key: 'recovery',    label: 'Récup',   angle: -Math.PI/2 + Math.PI*2/4, val: bio.recovery || 0 },
      { key: 'stress',      label: 'Stress',  angle: -Math.PI/2 + Math.PI*4/4, invert: true, val: 100 - (bio.stress || 0) },
      { key: 'fatigue',     label: 'Fatigue', angle: -Math.PI/2 + Math.PI*6/4, invert: true, val: 100 - (bio.fatigue || 0) },
    ];

    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, S, S);

    // Toiles
    [25,50,75,100].forEach(ring => {
      ctx.beginPath();
      metrics.forEach((m, i) => {
        const r = R * ring / 100;
        const x = cx + r * Math.cos(m.angle);
        const y = cy + r * Math.sin(m.angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.strokeStyle = PALETTE.grid; ctx.lineWidth = 1; ctx.stroke();
    });

    // Axes
    ctx.strokeStyle = PALETTE.grid; ctx.lineWidth = 1;
    metrics.forEach(m => {
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(m.angle), cy + R * Math.sin(m.angle));
      ctx.stroke();
    });

    // Polygone données
    ctx.beginPath();
    metrics.forEach((m, i) => {
      const r = R * m.val / 100;
      const x = cx + r * Math.cos(m.angle);
      const y = cy + r * Math.sin(m.angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(196,163,90,0.18)'; ctx.fill();
    ctx.strokeStyle = PALETTE.forfait; ctx.lineWidth = 2; ctx.stroke();

    // Points + labels
    metrics.forEach(m => {
      const r = R * m.val / 100;
      ctx.fillStyle = PALETTE[m.key] || PALETTE.forfait;
      ctx.beginPath(); ctx.arc(cx + r * Math.cos(m.angle), cy + r * Math.sin(m.angle), 4, 0, Math.PI*2); ctx.fill();

      ctx.fillStyle = PALETTE.text; ctx.font = `${9*DPR/DPR}px system-ui`; ctx.textAlign = 'center';
      const lx = cx + (R + 13) * Math.cos(m.angle);
      const ly = cy + (R + 13) * Math.sin(m.angle) + 3;
      ctx.fillText(m.label, lx, ly);
    });
  },

  /** Message "pas de données" */
  _drawNoData(ctx, W, H, msg) {
    ctx.fillStyle = '#F7F3ED'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#BDB5A8'; ctx.font = '12px system-ui'; ctx.textAlign = 'center';
    const lines = msg.split('\n');
    lines.forEach((l, i) => ctx.fillText(l, W/2, H/2 - (lines.length-1)*8 + i*16));
  },

  /**
   * Génère la section HTML complète avec canvases.
   * À injecter dans la vue Santé ou Bilan.
   */
  renderSection(analysis, bio, data, contract, year) {
    // Construire le tableau des données bio par mois (chiffres, pas canvas)
    const MOIS = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc'];

    // Calculer les scores bio cumulés mois par mois
    const bioParMois = [];
    const moisAvecData = new Set();
    // Filtrer uniquement les clés de type YYYY-MM-DD (jours, pas semaines)
    const dayKeys = Object.keys(data).filter(dk => /^\d{4}-\d{2}-\d{2}$/.test(dk) && dk.startsWith(String(year)));
    for (const dk of dayKeys) {
      moisAvecData.add(parseInt(dk.slice(5,7)) - 1);
    }
    // Si aucune clé journalière (régime FH en semaines), on construit depuis les semaines
    if (!dayKeys.length) {
      // Fallback FH : agrégation par mois depuis les semaines
      const wkKeys = Object.keys(data).filter(k => /^\d{4}-W\d{2}$/.test(k) && k.startsWith(String(year)));
      if (!wkKeys.length) {
        return `<div style="padding:24px;text-align:center;color:var(--pierre)">
          <div style="font-size:2rem;margin-bottom:8px">📊</div>
          <div style="font-size:0.88rem">Aucune donnée saisie pour ${year}.</div>
        </div>`;
      }
      // Regrouper par mois (approximation : numéro semaine → mois moyen)
      const moisData = {};
      for (const wk of wkKeys) {
        const [, w] = wk.split('-W');
        const moisApprox = Math.min(11, Math.floor((parseInt(w)-1) / 4.33));
        if (!moisData[moisApprox]) moisData[moisApprox] = { heures:0, semaines:0 };
        moisData[moisApprox].heures += (data[wk].heures || 0);
        moisData[moisApprox].semaines++;
      }
      const seuil = contract?.seuilHebdo || 35;
      return `
      <div style="width:100%;box-sizing:border-box;overflow-x:hidden">
        <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Évolution mensuelle ${year}</div><div class="m6-ornement-line"></div></div>
        <div class="m6-card" style="margin-bottom:14px;overflow:hidden">
          <div class="m6-card-header"><div class="m6-card-icon">⏱️</div>
            <div><div class="m6-card-label">Heures supp.</div><div class="m6-card-title">Évolution mensuelle</div></div></div>
          <div class="m6-card-body" style="padding:8px 4px">
            <div style="overflow-x:auto">
              <table style="width:100%;border-collapse:collapse;font-size:0.78rem;text-align:center">
                <thead>
                  <tr style="color:var(--pierre);font-size:0.7rem;border-bottom:1px solid var(--ivoire-3)">
                    <th style="text-align:left;padding:6px">Mois</th>
                    <th style="padding:6px">Sem.</th>
                    <th style="padding:6px">Total h</th>
                    <th style="padding:6px">HS</th>
                    <th style="padding:6px">Moy/sem</th>
                  </tr>
                </thead>
                <tbody>
                  ${Object.entries(moisData).sort(([a],[b])=>a-b).map(([m,d]) => {
                    const totalHS = Math.max(0, d.heures - seuil * d.semaines);
                    const moy = d.semaines ? (d.heures/d.semaines).toFixed(1) : 0;
                    const hsColor = totalHS > 0 ? '#C4853A' : '#2D6A4F';
                    return `<tr style="border-top:1px solid var(--ivoire-3)">
                      <td style="text-align:left;padding:6px;font-weight:600;color:var(--charbon)">${MOIS[m]}</td>
                      <td style="padding:6px">${d.semaines}</td>
                      <td style="padding:6px;font-weight:600">${d.heures.toFixed(1)}</td>
                      <td style="padding:6px;font-weight:600;color:${hsColor}">${totalHS.toFixed(1)}</td>
                      <td style="padding:6px;color:var(--pierre)">${moy}h</td>
                    </tr>`;
                  }).join('')}
                </tbody>
              </table>
            </div>
            <div style="font-size:0.65rem;color:var(--pierre);margin-top:6px;text-align:center">Seuil HS : ${seuil}h/sem</div>
          </div>
        </div>
      </div>`;
    }
    const minM = moisAvecData.size ? Math.min(...moisAvecData) : 0;
    const maxM = moisAvecData.size ? Math.max(...moisAvecData) : new Date().getMonth();
    // Compteur cumulé jours travaillés par mois
    const joursParMois = {};
    for (const dk of dayKeys) {
      const m = parseInt(dk.slice(5,7)) - 1;
      const t = data[dk]?.type || 'travail';
      if (!joursParMois[m]) joursParMois[m] = { travail:0, rtt:0, cp:0, repos:0 };
      if (t === 'travail' || t === 'rachat' || t === 'teletravail') joursParMois[m].travail++;
      else if (t === 'demi') joursParMois[m].travail += 0.5;
      else if (t === 'rtt') joursParMois[m].rtt++;
      else if (t === 'cp') joursParMois[m].cp++;
      else if (t === 'repos' || t === 'ferie') joursParMois[m].repos++;
    }
    for (let m = minM; m <= maxM; m++) {
      const dataCumul = {};
      for (const [dk,v] of Object.entries(data)) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(dk) && dk.startsWith(String(year)) && parseInt(dk.slice(5,7))-1 <= m) dataCumul[dk] = v;
      }
      let bio_m = { fatigue:0, stress:0, recovery:50, performance:100 };
      if (window.M6_BioEngine && Object.keys(dataCumul).length) {
        const r = M6_BioEngine.analyzeForfaitJours(contract, dataCumul, year);
        if (r?.hasData) bio_m = { fatigue: r.fatigue, stress: r.stress, recovery: r.recovery, performance: r.performance ?? Math.max(0,100-r.fatigue) };
      }
      bioParMois.push({ m, bio: bio_m });
    }

    return `
    <div style="width:100%;box-sizing:border-box;overflow-x:hidden">
    <div class="m6-ornement"><div class="m6-ornement-line"></div><div class="m6-ornement-text">Évolution mensuelle ${year}</div><div class="m6-ornement-line"></div></div>

    <!-- Tableau consommation forfait jours/mois -->
    <div class="m6-card" style="margin-bottom:14px;overflow:hidden">
      <div class="m6-card-header"><div class="m6-card-icon">📊</div>
        <div><div class="m6-card-label">Consommation forfait</div><div class="m6-card-title">Jours par mois (${analysis?.plafond||218}j max)</div></div></div>
      <div class="m6-card-body" style="padding:8px 4px">
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:0.74rem;text-align:center">
            <thead>
              <tr style="color:var(--pierre);font-size:0.65rem;border-bottom:1px solid var(--ivoire-3)">
                <th style="text-align:left;padding:5px 6px;font-weight:600">Mois</th>
                <th style="padding:5px 4px">💼 Trav.</th>
                <th style="padding:5px 4px">🏖️ RTT</th>
                <th style="padding:5px 4px">🌴 CP</th>
                <th style="padding:5px 4px">Cumul</th>
              </tr>
            </thead>
            <tbody>
              ${(() => {
                let cumul = 0;
                return Object.entries(joursParMois).sort(([a],[b])=>a-b).map(([m,d]) => {
                  cumul += d.travail;
                  return `<tr style="border-top:1px solid var(--ivoire-3)">
                    <td style="text-align:left;padding:5px 6px;font-weight:600;color:var(--charbon)">${MOIS[m]}</td>
                    <td style="padding:5px 4px;font-weight:600;color:#1E3A5F">${d.travail}</td>
                    <td style="padding:5px 4px;color:#4A7C6F">${d.rtt}</td>
                    <td style="padding:5px 4px;color:#2D6A4F">${d.cp}</td>
                    <td style="padding:5px 4px;font-weight:600;color:${cumul>=(analysis?.plafond||218)*0.9?'#C4853A':'var(--pierre)'}">${cumul}</td>
                  </tr>`;
                }).join('');
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Tableau bio chiffres par mois -->
    <div class="m6-card" style="margin-bottom:14px;overflow:hidden">
      <div class="m6-card-header"><div class="m6-card-icon">🧬</div>
        <div><div class="m6-card-label">Indicateurs biologiques</div><div class="m6-card-title">Scores mensuels cumulés</div></div></div>
      <div class="m6-card-body" style="padding:8px 4px">
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:0.74rem;text-align:center">
            <thead>
              <tr style="color:var(--pierre);font-size:0.65rem;border-bottom:1px solid var(--ivoire-3)">
                <th style="text-align:left;padding:4px 6px;font-weight:600">Mois</th>
                <th style="padding:4px 4px">💤 Fatigue</th>
                <th style="padding:4px 4px">🧠 Stress</th>
                <th style="padding:4px 4px">✨ Récup.</th>
                <th style="padding:4px 4px">⚡ Perf.</th>
              </tr>
            </thead>
            <tbody>
              ${bioParMois.map(({m, bio}) => {
                const fatColor = bio.fatigue >= 70 ? '#9B2C2C' : bio.fatigue >= 50 ? '#C4853A' : '#2D6A4F';
                const stressColor = bio.stress >= 70 ? '#9B2C2C' : bio.stress >= 50 ? '#C4853A' : '#2D6A4F';
                const recColor = bio.recovery <= 30 ? '#9B2C2C' : bio.recovery <= 50 ? '#C4853A' : '#2D6A4F';
                const perfColor = bio.performance <= 30 ? '#9B2C2C' : bio.performance <= 60 ? '#C4853A' : '#2D6A4F';
                return `<tr style="border-top:1px solid var(--ivoire-3)">
                  <td style="text-align:left;padding:5px 6px;font-weight:600;color:var(--charbon)">${MOIS[m]}</td>
                  <td style="padding:5px 4px;font-weight:600;color:${fatColor}">${bio.fatigue}</td>
                  <td style="padding:5px 4px;font-weight:600;color:${stressColor}">${bio.stress}</td>
                  <td style="padding:5px 4px;font-weight:600;color:${recColor}">${bio.recovery}</td>
                  <td style="padding:5px 4px;font-weight:600;color:${perfColor}">${bio.performance}</td>
                </tr>`;
              }).join('')}
              ${bioParMois.length === 0 ? `<tr><td colspan="5" style="padding:14px;color:var(--pierre);font-style:italic">Aucune donnée saisie</td></tr>` : ''}
            </tbody>
          </table>
        </div>
        <div style="font-size:0.65rem;color:var(--pierre);margin-top:6px;text-align:center">Scores calculés cumulativement — 0=optimal · 100=critique</div>
      </div>
    </div>
    </div>`;
  },

  /**
   * renderPage — injection complète de la section Tendances dans un container.
   * Compatible mobile : canvas 100% width, overflow hidden, padding adapté.
   * @param {HTMLElement} container
   * @param {object}      contract
   * @param {object}      data
   * @param {number}      year
   */
  renderPage(container, contract, data, year) {
    if (!container) return;
    const analysis = window.M6_ForfaitJours?.analyze
      ? M6_ForfaitJours.analyze(contract, data, year)
      : (window.M6_ForfaitHeures?.analyze ? M6_ForfaitHeures.analyze(contract, data, year) : null);
    const bio = window.M6_BioEngine?.analyzeForfaitJours
      ? M6_BioEngine.analyzeForfaitJours(contract, data, year)
      : null;

    // HTML responsive — box-sizing + overflow:hidden sur chaque card
    container.style.cssText = (container.style.cssText||'') + ';box-sizing:border-box;overflow-x:hidden;width:100%';
    container.innerHTML = this.renderSection(analysis, bio, data, contract, year);

    // Forcer tous les canvases à prendre la largeur du container parent
    // en attendant que le RAF recalcule les dims
    container.querySelectorAll('canvas').forEach(cv => {
      cv.style.maxWidth = '100%';
      cv.style.boxSizing = 'border-box';
    });

    // Laisser le layout se stabiliser avant de dessiner
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.drawForfaitEvolution('m6-forfait-chart', data, analysis, year);
      });
    });
  },

  /** No-op : la section Tendances n'utilise plus de canvas (tableaux uniquement) */
  bindCharts(/* analysis, bio, data, contract, year */) {
    // Conservé pour compatibilité — plus rien à dessiner.
  }
};

global.M6_Charts = M6_Charts;

})(window);
