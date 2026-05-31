/**
 * COACH.JS — Assistant guide pas-à-pas pour M6 Cadres
 *
 * Fournit :
 * 1. Bouton flottant ❓ Aide accessible partout
 * 2. Guide contextuel par section (Bilan, Calendrier, Santé, etc.)
 * 3. Tour d'introduction (1ère visite d'une section)
 * 4. Tooltips inline (icônes ⓘ)
 * 5. Quick Actions (raccourcis sur le Bilan)
 *
 * Storage :
 *   M6_COACH_VISITED_<regime>_<section> = '1' si déjà vu
 *   M6_COACH_DISABLED = '1' si user a désactivé l'aide
 */
'use strict';

(function(global) {

// ══════════════════════════════════════════════════════════════════
//  GUIDES PAR SECTION & RÉGIME
// ══════════════════════════════════════════════════════════════════
const GUIDES = {
  forfait_jours: {
    bilan: {
      titre: '◈ Bilan — votre vue d\'ensemble',
      etapes: [
        { icon: '📊', txt: 'Le Bilan résume votre exercice : jours travaillés, RTT, congés, et vos indicateurs santé.' },
        { icon: '⚠️', txt: 'Les <strong>alertes en haut</strong> indiquent les actions à mener (entretien manquant, dépassement, etc.).' },
        { icon: '🎯', txt: 'Cliquez sur une carte (Jours, Santé, RTT) pour aller direct à la section correspondante.' },
        { icon: '📐', txt: '<strong>Arrivée en cours d\'année ?</strong> Votre plafond, RTT et CP sont automatiquement calculés au prorata temporis depuis votre date d\'arrivée (Art. L3121-60).' },
        { icon: '⏭️', txt: 'Pour démarrer, allez dans <strong>Calendrier</strong> ou <strong>Saisir aujourd\'hui</strong> ci-dessous.' },
      ]
    },
    calendrier: {
      titre: '◻ Calendrier — saisie des jours',
      etapes: [
        { icon: '📅', txt: 'Tapez sur n\'importe quel jour pour saisir : <strong>Travail, RTT, CP, Maladie</strong>...' },
        { icon: '🕐', txt: 'Vous pouvez ajouter <strong>l\'amplitude horaire</strong> (début/fin) — important pour respecter le repos de 11h.' },
        { icon: '🔄', txt: 'Saisie rapide : maintenez longtemps un jour pour copier/coller.' },
        { icon: '✓', txt: 'Astuce : saisissez vos jours toutes les semaines pour ne rien oublier.' },
      ]
    },
    bio: {
      titre: '♡ Santé — vos indicateurs biologiques',
      etapes: [
        { icon: '🧠', txt: 'Quatre indicateurs : <strong>Fatigue</strong> (INRS), <strong>Stress</strong> (cortisol), <strong>Récupération</strong>, <strong>Performance</strong>.' },
        { icon: '⚕️', txt: 'Calibrés sur la littérature scientifique : Pencavel 2014 (perf), Kivimäki 2015 (cardio), Sonnentag 2003 (récup).' },
        { icon: '🚨', txt: 'Phase P3 (Surmenage) ou P4 (Burn-out) → <strong>parlez-en au médecin du travail</strong>.' },
        { icon: '💚', txt: 'Bonne nouvelle : RTT, CP et weekends font baisser les risques. Prenez vos jours !' },
      ]
    },
    tendances: {
      titre: '◗ Tendances — l\'évolution dans le temps',
      etapes: [
        { icon: '📈', txt: 'Visualise l\'évolution de votre forfait et de vos risques bio sur l\'année.' },
        { icon: '🔍', txt: 'Repérez les pics de surcharge (semaines à 5+ jours) et compensez par du repos.' },
      ]
    },
    nullite: {
      titre: '⚖ Validité — votre forfait est-il opposable ?',
      etapes: [
        { icon: '📜', txt: '6 conditions cumulatives pour qu\'un forfait jours soit valide juridiquement.' },
        { icon: '✅', txt: 'En vert : conditions remplies. En orange : à surveiller. En rouge : action requise.' },
        { icon: '🛡️', txt: 'Cette section vous protège : si tout est ❌, votre forfait est <strong>inopposable</strong> = vous pouvez réclamer des HS.' },
        { icon: '📑', txt: 'En cas de litige, exportez le <strong>PDF Mode Preuve</strong> (onglet Export).' },
      ]
    },
    entretien: {
      titre: '◉ Entretien annuel — obligation légale',
      etapes: [
        { icon: '⚖️', txt: 'L\'entretien annuel est <strong>obligatoire</strong> (Art. L3121-65). Sans lui, le forfait peut être annulé.' },
        { icon: '📝', txt: 'Documentez : charge de travail, articulation pro/perso, rémunération, organisation.' },
        { icon: '📅', txt: 'À programmer dans les <strong>3 mois précédant la fin de l\'exercice</strong>.' },
      ]
    },
    export: {
      titre: '◆ Export — vos PDF certifiés',
      etapes: [
        { icon: '📄', txt: '<strong>PDF Mensuel</strong> : récap d\'un mois, idéal pour le manager.' },
        { icon: '📊', txt: '<strong>PDF Annuel</strong> : bilan complet de l\'exercice.' },
        { icon: '🛡️', txt: '<strong>Mode Preuve</strong> : PDF horodaté avec hash, opposable en cas de prud\'hommes.' },
        { icon: '📨', txt: 'Sur mobile : partage natif iOS/Android. Sur PC : téléchargement direct.' },
      ]
    },
    glossaire: {
      titre: '≡ Glossaire — décrypter le jargon',
      etapes: [
        { icon: '📖', txt: 'Définitions : forfait jours, plafond, contingent, rachat, entretien, repos quotidien...' },
        { icon: '⚖️', txt: 'Toutes les références aux articles du Code du travail.' },
      ]
    },
    rupture: {
      titre: '◯ Rupture conventionnelle',
      etapes: [
        { icon: '💼', txt: 'Calculez votre indemnité de rupture (légale, conventionnelle, négociée).' },
        { icon: '⚖️', txt: 'Inclut le barème Macron 2017 et les majorations CCN connues (Syntec, Banque AFB).' },
      ]
    },
  },

  forfait_heures: {
    bilan: {
      titre: '◈ Bilan — votre vue d\'ensemble',
      etapes: [
        { icon: '📊', txt: 'Récap : heures travaillées, contingent HS, et vos indicateurs santé.' },
        { icon: '⏱️', txt: 'Le <strong>seuil hebdo</strong> est votre durée contractuelle (souvent 35 ou 39h). Au-delà = HS.' },
        { icon: '🎯', txt: 'Tapez une carte pour aller à la section liée.' },
      ]
    },
    semaines: {
      titre: '◻ Semaines — saisie hebdomadaire',
      etapes: [
        { icon: '📅', txt: 'Saisissez vos heures pour chaque semaine ISO.' },
        { icon: '➕', txt: 'Bouton <strong>+ Ajouter</strong> en haut à droite pour saisir une nouvelle semaine.' },
        { icon: '🔄', txt: 'Astuce : saisie hebdomadaire le vendredi soir = quelques secondes par semaine.' },
      ]
    },
    bio: {
      titre: '♡ Santé — indicateurs biologiques FH',
      etapes: [
        { icon: '🧠', txt: 'Identique au Forfait Jours : Fatigue, Stress, Récupération, Performance.' },
        { icon: '🚨', txt: 'Au-delà de 48h/semaine régulier, le risque AVC augmente (Kivimäki 2015).' },
      ]
    },
    tendances: {
      titre: '◗ Tendances — heures hebdo dans le temps',
      etapes: [
        { icon: '📈', txt: 'Visualisez vos heures par semaine sur l\'année.' },
        { icon: '🔍', txt: 'Repérez les périodes de surcharge et compensez.' },
      ]
    },
    entretien: {
      titre: '◉ Entretien annuel',
      etapes: [
        { icon: '📝', txt: 'Documentez votre entretien annuel pour respecter L4121-1 (obligation de sécurité).' },
      ]
    },
    validite: {
      titre: '⚖ Validité — votre forfait heures est-il opposable ?',
      etapes: [
        { icon: '📜', txt: '6 conditions cumulatives pour qu\'un forfait heures soit valide : convention écrite, accord collectif (si annuel), contingent respecté, majoration, repos, durée max 48h.' },
        { icon: '✅', txt: 'En vert : conditions remplies. En orange : à surveiller. En rouge : action requise.' },
        { icon: '🛡️', txt: 'Si plusieurs ❌ : votre forfait peut être inopposable → vous pouvez réclamer un rappel d\'heures supplémentaires.' },
        { icon: '📑', txt: 'Conservez vos saisies : elles sont la preuve clé en cas de contentieux.' },
      ]
    },
    export: {
      titre: '◆ Export PDF',
      etapes: [
        { icon: '📄', txt: 'PDF mensuel ou périodique avec récap heures et HS.' },
        { icon: '🛡️', txt: 'Documents probants pour preuves prud\'homales.' },
      ]
    },
    glossaire: {
      titre: '≡ Glossaire',
      etapes: [
        { icon: '📖', txt: 'Définitions : seuil hebdo, contingent, paliers de majoration (25%/50%), rachat...' },
      ]
    },
  },

  cadre_dirigeant: {
    bilan: {
      titre: '◈ Bilan Cadre Dirigeant',
      etapes: [
        { icon: '👔', txt: 'Le Cadre Dirigeant (L3111-2) est exclu des règles de durée du travail.' },
        { icon: '⚠️', txt: '<strong>Mais</strong> l\'obligation de sécurité (L4121-1) demeure : votre santé compte toujours.' },
        { icon: '📊', txt: 'Indicateurs informatifs (jours travaillés, charge perçue) — pas d\'obligation légale.' },
      ]
    },
    calendrier: {
      titre: '◻ Calendrier (informatif)',
      etapes: [
        { icon: '📅', txt: 'Suivi de vos jours travaillés à titre indicatif (utile en cas de litige sur le statut).' },
      ]
    },
    projets: {
      titre: '◐ Projets — suivi de votre charge stratégique',
      etapes: [
        { icon: '📊', txt: 'Créez et suivez vos projets/dossiers : impact, deadline, charge perçue.' },
        { icon: '🎯', txt: 'Permet de documenter votre <strong>autonomie réelle</strong> (critère L3111-2).' },
      ]
    },
    sante: {
      titre: '♡ Santé — votre bien-être',
      etapes: [
        { icon: '🧠', txt: 'Indicateurs adaptés : charge perçue, équilibre, récupération.' },
        { icon: '🚨', txt: 'Le statut CD ne protège pas du burn-out — soyez vigilant.' },
      ]
    },
    entretien: {
      titre: '◉ Entretien (recommandé)',
      etapes: [
        { icon: '📝', txt: 'Pas obligatoire pour les CD, mais fortement recommandé (Art. L4121-1).' },
        { icon: '🛡️', txt: 'En cas de requalification, l\'absence d\'entretien est un facteur aggravant.' },
      ]
    },
    tendances: {
      titre: '◗ Tendances — votre activité dans le temps',
      etapes: [
        { icon: '📈', txt: 'Visualisez vos jours travaillés et votre charge perçue sur l\'année.' },
        { icon: '🔍', txt: 'Identifiez les périodes intenses pour anticiper la récupération.' },
      ]
    },
    validite: {
      titre: '⚖ Validité — votre statut CD est-il défendable ?',
      etapes: [
        { icon: '📜', txt: 'Le statut Cadre Dirigeant L3111-2 exige <strong>3 critères CUMULATIFS</strong> (Cass. Soc. 31/01/2012).' },
        { icon: '⚠️', txt: 'Si <strong>UN SEUL</strong> manque, le juge peut requalifier en cadre soumis aux durées du travail.' },
        { icon: '💰', txt: 'Conséquence d\'une requalification : rappel d\'heures supplémentaires sur 3 ans + repos compensateur.' },
        { icon: '🛡️', txt: 'Cette section vous aide à documenter vos preuves : responsabilités, rémunération, autonomie.' },
      ]
    },
    glossaire: {
      titre: '≡ Glossaire',
      etapes: [
        { icon: '📖', txt: 'Définitions des concepts juridiques applicables aux cadres.' },
        { icon: '⚖️', txt: 'Références aux articles du Code du travail et jurisprudence.' },
      ]
    },
    export: {
      titre: '◆ Export',
      etapes: [
        { icon: '📄', txt: 'Récap annuel pour vos archives ou en cas de contestation du statut.' },
      ]
    },
  },
};

// Mappage section → ordre suggéré (workflow naturel)
const FLOWS = {
  forfait_jours:  ['bilan', 'calendrier', 'bio', 'nullite', 'entretien', 'export'],
  forfait_heures: ['bilan', 'semaines', 'bio', 'validite', 'entretien', 'export'],
  cadre_dirigeant:['bilan', 'calendrier', 'projets', 'sante', 'validite', 'entretien', 'export'],
};

// ══════════════════════════════════════════════════════════════════
//  STORAGE HELPERS
// ══════════════════════════════════════════════════════════════════
const _seenKey = (regime, section) => `M6_COACH_VISITED_${regime}_${section}`;
const isVisited = (regime, section) => global.M6_SafeGet(_seenKey(regime, section)) === '1';
const markVisited = (regime, section) => global.M6_SafeSet?.(_seenKey(regime, section), '1');
const isDisabled = () => global.M6_SafeGet?.('M6_COACH_DISABLED') === '1';

// ══════════════════════════════════════════════════════════════════
//  UI : MODAL DU GUIDE
// ══════════════════════════════════════════════════════════════════
function showGuide(regime, section, opts = {}) {
  const guide = GUIDES[regime]?.[section];
  if (!guide) return;

  // Supprimer un éventuel guide existant
  document.getElementById('m6-coach-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'm6-coach-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(26,23,20,0.78);z-index:99997;display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity 0.2s ease';

  const flow = FLOWS[regime] || [];
  const idx  = flow.indexOf(section);
  const next = idx >= 0 && idx < flow.length-1 ? flow[idx+1] : null;
  const prev = idx > 0 ? flow[idx-1] : null;

  const html = `
  <div style="background:#fff;border-radius:14px;max-width:440px;width:100%;max-height:90vh;overflow-y:auto;padding:22px;box-shadow:0 12px 40px rgba(0,0,0,0.4)">
    <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:14px;gap:12px">
      <div>
        <div style="font-family:Georgia,serif;font-size:1.15rem;font-weight:600;color:#1A1714;line-height:1.2">${guide.titre}</div>
        ${idx >= 0 ? `<div style="font-size:0.7rem;color:#8A847C;margin-top:4px">Étape ${idx+1} sur ${flow.length} du parcours</div>` : ''}
      </div>
      <button id="coach-close" style="background:#F7F3ED;border:none;width:32px;height:32px;border-radius:50%;font-size:1.1rem;cursor:pointer;color:#4A4540;flex-shrink:0">×</button>
    </div>

    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:18px">
      ${guide.etapes.map(e => `
        <div style="display:flex;gap:10px;padding:10px;background:#F7F3ED;border-radius:8px">
          <div style="font-size:1.3rem;flex-shrink:0;line-height:1">${e.icon}</div>
          <div style="font-size:0.84rem;line-height:1.5;color:#4A4540">${e.txt}</div>
        </div>
      `).join('')}
    </div>

    ${flow.length ? `
      <div style="display:flex;gap:6px;margin-bottom:14px;align-items:center;justify-content:center">
        ${flow.map((s,i) => `<div style="width:24px;height:4px;border-radius:2px;background:${i<=idx?'#C4A35A':'#E2DAD0'}"></div>`).join('')}
      </div>
    ` : ''}

    <div style="display:flex;gap:8px">
      ${prev ? `<button id="coach-prev" style="flex:1;background:transparent;border:1px solid #E2DAD0;border-radius:8px;padding:10px;font-size:0.82rem;cursor:pointer;color:#4A4540">← ${prev}</button>` : ''}
      ${next ? `<button id="coach-next" style="flex:2;background:#1A1714;color:#F7F3ED;border:none;border-radius:8px;padding:10px;font-size:0.86rem;font-weight:500;cursor:pointer">Continuer vers ${next} →</button>` : `<button id="coach-done" style="flex:1;background:#C4A35A;color:#1A1714;border:none;border-radius:8px;padding:10px;font-size:0.86rem;font-weight:600;cursor:pointer">J'ai compris ✓</button>`}
    </div>

    <div style="text-align:center;margin-top:12px;font-size:0.72rem;color:#8A847C">
      <a href="#" id="coach-skip-all" style="color:#8A847C;text-decoration:underline">Ne plus afficher l'aide automatiquement</a>
    </div>
  </div>
  `;
  overlay.innerHTML = html;

  const close = () => { markVisited(regime, section); overlay.remove(); };
  const goto = (sec) => {
    markVisited(regime, section);
    overlay.remove();
    // Naviguer vers la section
    const view = global.M6_VFJ || global.M6_VFH || global.M6_VCD;
    // Utiliser le router à la place : déclencher un click sur le bouton de section
    setTimeout(() => {
      const btn = document.querySelector(`[data-sec="${sec}"]`);
      if (btn) btn.click();
      // Puis afficher le guide de la nouvelle section
      setTimeout(() => showGuide(regime, sec), 350);
    }, 100);
  };

  overlay.querySelector('#coach-close').onclick = close;
  overlay.querySelector('#coach-done')?.addEventListener('click', close);
  overlay.querySelector('#coach-next')?.addEventListener('click', () => goto(next));
  overlay.querySelector('#coach-prev')?.addEventListener('click', () => goto(prev));
  overlay.querySelector('#coach-skip-all').onclick = (e) => {
    e.preventDefault();
    global.M6_SafeSet?.('M6_COACH_DISABLED', '1');
    overlay.remove();
    if (global.M6_toast) global.M6_toast('Aide automatique désactivée. Cliquez ❓ pour la rappeler.');
  };
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  document.body.appendChild(overlay);
}

// ══════════════════════════════════════════════════════════════════
//  BOUTON FLOTTANT ❓
// ══════════════════════════════════════════════════════════════════
function ensureHelpButton(regime) {
  // FAB Coach désactivé — le tutoriel est maintenant accessible via le bouton ? du header
  const existing = document.getElementById('m6-coach-fab');
  if (existing) existing.remove();
}

// ══════════════════════════════════════════════════════════════════
//  AUTO-TRIGGER : montrer le guide à la 1ère visite d'une section
// ══════════════════════════════════════════════════════════════════
function maybeAutoShow(regime, section) {
  if (isDisabled()) return;
  if (isVisited(regime, section)) return;
  setTimeout(() => showGuide(regime, section), 600);
}

// ══════════════════════════════════════════════════════════════════
//  TOOLTIP INLINE (icône ⓘ cliquable)
// ══════════════════════════════════════════════════════════════════
function attachTooltip(element, text) {
  element.style.cursor = 'pointer';
  element.title = text; // fallback natif
  element.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    showTooltipModal(element.dataset.tooltipTitle || 'Information', text);
  });
}

function showTooltipModal(title, text) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(26,23,20,0.6);z-index:99998;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity 0.18s ease';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:12px;max-width:380px;padding:18px;box-shadow:0 10px 32px rgba(0,0,0,0.35)">
      <div style="font-family:Georgia,serif;font-size:1.05rem;font-weight:600;color:#1A1714;margin-bottom:10px">${title}</div>
      <div style="font-size:0.85rem;line-height:1.55;color:#4A4540;margin-bottom:14px">${text}</div>
      <button id="ttm-close" style="width:100%;background:#1A1714;color:#F7F3ED;border:none;border-radius:8px;padding:10px;font-size:0.85rem;cursor:pointer">Compris</button>
    </div>
  `;
  const close = () => overlay.remove();
  overlay.querySelector('#ttm-close').onclick = close;
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.body.appendChild(overlay);
  requestAnimationFrame(() => { overlay.style.opacity = '1'; });
  // Déclencher la transition APRÈS l'insertion (évite le flash)
  requestAnimationFrame(() => { overlay.style.opacity = '1'; });
}

// Activer auto les ⓘ existants dans le DOM
function bindAllInfoIcons(root = document) {
  root.querySelectorAll('[data-tooltip]').forEach(el => {
    if (el.dataset.tooltipBound === '1') return;
    el.dataset.tooltipBound = '1';
    attachTooltip(el, el.dataset.tooltip);
  });
}

// ══════════════════════════════════════════════════════════════════
//  API PUBLIQUE
// ══════════════════════════════════════════════════════════════════
global.M6_Coach = {
  show:           showGuide,
  ensureButton:   ensureHelpButton,
  maybeAutoShow:  maybeAutoShow,
  bindTooltips:   bindAllInfoIcons,
  reset() {
    try {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith('M6_COACH_')) localStorage.removeItem(k);
      }
    } catch(_) {}
  },
  flowOf: (regime) => FLOWS[regime] || [],
  guideOf: (regime, section) => GUIDES[regime]?.[section] || null,
};

// Bind automatique des tooltips après chaque mutation DOM majeure
const _observer = new MutationObserver(() => {
  bindAllInfoIcons();
});
if (document.body) {
  _observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    _observer.observe(document.body, { childList: true, subtree: true });
  });
}

})(window);
