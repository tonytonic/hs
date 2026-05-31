/**
 * COEFFICIENTS-GRILLES.JS — Grilles hiérarchiques par CCN
 *
 * Source : Légifrance + accords de branche en vigueur 2025
 * Périmètre : TOP CCN françaises (couvrent ~70% des cadres en France)
 *
 * Format d'une grille :
 * {
 *   idcc:    1486,
 *   nom:     'Syntec',
 *   miseAjour: '2024-01',
 *   categories: {
 *     ETAM: [
 *       { position: '1.1', coef: 240, salaireMini: 1801.84, description: '...' },
 *       ...
 *     ],
 *     IC: [
 *       { position: '1.1', coef: 95,  salaireMini: 26050,    description: '...' },
 *       ...
 *     ]
 *   },
 *   notes: '...',
 *   refLegifrance: 'KALI...'
 * }
 *
 * NB : les salaires minimums sont mis à jour par avenants — l'app affiche
 *      le coefficient mais doit indiquer "à confirmer sur Légifrance".
 */
'use strict';

(function(global) {

const CCN_COEFFICIENTS = [

  // ── 1486 SYNTEC / Bureaux d'études ────────────────────────────
  {
    idcc: 1486, nom: 'Syntec — Bureaux d\'études techniques',
    miseAjour: '2024-04',
    categories: {
      ETAM: [
        { position: '1.1', coef: 240, description: 'Exécution simple' },
        { position: '1.2', coef: 250, description: 'Exécution' },
        { position: '1.3.1', coef: 275, description: 'Exécution qualifiée' },
        { position: '1.4.1', coef: 310, description: 'Exécution supérieure' },
        { position: '1.4.2', coef: 355, description: 'Exécution autonomie' },
        { position: '2.1', coef: 220, description: 'Études simples' },
        { position: '2.2', coef: 240, description: 'Études' },
        { position: '2.3', coef: 275, description: 'Études qualifiées' },
        { position: '3.1', coef: 310, description: 'Études supérieures' },
        { position: '3.2', coef: 355, description: 'Conception' },
        { position: '3.3', coef: 400, description: 'Conception confirmée' },
        { position: '3.4', coef: 450, description: 'Encadrement / conception' },
        { position: '3.5', coef: 500, description: 'Position passerelle vers IC' },
      ],
      IC: [
        { position: '1.1', coef: 95,  description: 'Débutant' },
        { position: '1.2', coef: 100, description: 'Confirmé' },
        { position: '2.1', coef: 105, description: 'Confirmé autonomie' },
        { position: '2.2', coef: 115, description: 'Encadrement' },
        { position: '2.3', coef: 130, description: 'Coordination' },
        { position: '3.1', coef: 170, description: 'Direction d\'études' },
        { position: '3.2', coef: 210, description: 'Direction département' },
        { position: '3.3', coef: 270, description: 'Cadre dirigeant L3111-2' },
      ],
    },
    notes: 'IC = Ingénieurs et Cadres. ETAM = Employés Techniciens Agents de Maîtrise. Position 3.3 IC = critère cadre dirigeant L3111-2.',
    refLegifrance: 'KALICONT000005635173',
  },

  // ── 3248 MÉTALLURGIE (accord unique 2023, en vigueur 2024) ─────
  {
    idcc: 3248, nom: 'Métallurgie — Accord national unique',
    miseAjour: '2024-01',
    categories: {
      // Nouvelle classification 2024 : 18 niveaux (groupes A à I × 2 sous-groupes)
      // Remplace les anciennes grilles OETAM (650) et Cadres (653)
      Niveau: [
        { position: 'A1', coef: 215, description: 'Postes simples — exécution stricte' },
        { position: 'A2', coef: 220, description: 'Exécution simple — autonomie ponctuelle' },
        { position: 'B1', coef: 230, description: 'Exécution variée' },
        { position: 'B2', coef: 240, description: 'Exécution variée + autonomie' },
        { position: 'C1', coef: 255, description: 'Exécution complexe' },
        { position: 'C2', coef: 270, description: 'Exécution complexe + suivi' },
        { position: 'D1', coef: 285, description: 'Technique — autonomie ' },
        { position: 'D2', coef: 305, description: 'Technique confirmée' },
        { position: 'E1', coef: 325, description: 'Maîtrise — coordination' },
        { position: 'E2', coef: 355, description: 'Maîtrise confirmée' },
        { position: 'F1', coef: 395, description: 'Cadre débutant' },
        { position: 'F2', coef: 440, description: 'Cadre confirmé' },
        { position: 'G',  coef: 510, description: 'Cadre — encadrement' },
        { position: 'H1', coef: 580, description: 'Cadre direction service' },
        { position: 'H2', coef: 660, description: 'Cadre direction département' },
        { position: 'I1', coef: 770, description: 'Cadre direction confirmée' },
        { position: 'I2', coef: 880, description: 'Cadre dirigeant L3111-2' },
      ],
    },
    notes: 'Nouvelle classification fusionnée OETAM + Cadres en vigueur depuis le 1er janvier 2024. Niveaux F à I = cadres. I2 = critère L3111-2 cadre dirigeant.',
    refLegifrance: 'KALICONT000044388197',
  },

  // ── 1979 HCR / Hôtels Cafés Restaurants ───────────────────────
  {
    idcc: 1979, nom: 'Hôtels Cafés Restaurants',
    miseAjour: '2024-02',
    categories: {
      Niveau: [
        { position: 'I-1',   coef: 240, description: 'Niveau I échelon 1 — Employé débutant' },
        { position: 'I-2',   coef: 245, description: 'Niveau I échelon 2' },
        { position: 'I-3',   coef: 250, description: 'Niveau I échelon 3' },
        { position: 'II-1',  coef: 255, description: 'Niveau II — Employé qualifié débutant' },
        { position: 'II-2',  coef: 265, description: 'Niveau II échelon 2' },
        { position: 'II-3',  coef: 280, description: 'Niveau II échelon 3' },
        { position: 'III-1', coef: 295, description: 'Niveau III — Employé très qualifié' },
        { position: 'III-2', coef: 320, description: 'Niveau III échelon 2' },
        { position: 'III-3', coef: 345, description: 'Niveau III échelon 3' },
        { position: 'IV-1',  coef: 370, description: 'Niveau IV — Maîtrise' },
        { position: 'IV-2',  coef: 400, description: 'Niveau IV échelon 2' },
        { position: 'IV-3',  coef: 430, description: 'Niveau IV échelon 3' },
        { position: 'V-1',   coef: 460, description: 'Niveau V — Cadre' },
        { position: 'V-2',   coef: 500, description: 'Niveau V échelon 2 — Cadre confirmé' },
        { position: 'V-3',   coef: 540, description: 'Niveau V échelon 3 — Cadre dirigeant L3111-2' },
      ],
    },
    notes: 'Avenant 30 + grille salaires en vigueur. Niveau V = encadrement. V-3 souvent associé au cadre dirigeant L3111-2.',
    refLegifrance: 'KALICONT000005635624',
  },

  // ── 2120 BANQUE (AFB) ─────────────────────────────────────────
  {
    idcc: 2120, nom: 'Banque (AFB)',
    miseAjour: '2024-01',
    categories: {
      Technicien: [
        { position: 'A',  coef: 200, description: 'Technicien des métiers de la banque débutant' },
        { position: 'B',  coef: 230, description: 'Technicien autonomie limitée' },
        { position: 'C',  coef: 270, description: 'Technicien confirmé' },
        { position: 'D',  coef: 305, description: 'Technicien expert' },
        { position: 'E',  coef: 340, description: 'Technicien hautement qualifié' },
        { position: 'F',  coef: 385, description: 'Maîtrise — passerelle cadre' },
      ],
      Cadre: [
        { position: 'G',  coef: 430, description: 'Cadre débutant' },
        { position: 'H',  coef: 480, description: 'Cadre' },
        { position: 'I',  coef: 540, description: 'Cadre confirmé' },
        { position: 'J',  coef: 600, description: 'Cadre Hors Classe (CHC) — passerelle dirigeant' },
        { position: 'K',  coef: 700, description: 'Cadre dirigeant L3111-2' },
      ],
    },
    notes: 'Coefficient ≥ 600 = Cadre Hors Classe (CHC), souvent associé au statut Cadre Dirigeant L3111-2 selon accord AFB.',
    refLegifrance: 'KALICONT000005635161',
  },

  // ── 1996 PHARMACIE D'OFFICINE ─────────────────────────────────
  {
    idcc: 1996, nom: 'Pharmacie d\'officine',
    miseAjour: '2024-03',
    categories: {
      Coefficient: [
        { position: '100', coef: 100, description: 'Étudiant en pharmacie 1ère année' },
        { position: '120', coef: 120, description: 'Étudiant 2e année' },
        { position: '140', coef: 140, description: 'Étudiant 3e année' },
        { position: '160', coef: 160, description: 'Étudiant 4e année' },
        { position: '200', coef: 200, description: 'Auxiliaire de préparation' },
        { position: '230', coef: 230, description: 'Préparateur débutant' },
        { position: '260', coef: 260, description: 'Préparateur confirmé' },
        { position: '300', coef: 300, description: 'Préparateur en chef' },
        { position: '330', coef: 330, description: 'Pharmacien adjoint débutant' },
        { position: '400', coef: 400, description: 'Pharmacien adjoint confirmé' },
        { position: '500', coef: 500, description: 'Pharmacien titulaire / dirigeant' },
      ],
    },
    notes: 'Coef 330+ = pharmacien diplômé. Coef 500 = titulaire d\'officine, généralement cadre dirigeant L3111-2.',
    refLegifrance: 'KALICONT000005635585',
  },

  // ── 1597 BÂTIMENT ETAM > 10 salariés ──────────────────────────
  {
    idcc: 1597, nom: 'Bâtiment ETAM > 10 salariés',
    miseAjour: '2024-01',
    categories: {
      Niveau: [
        { position: 'A',  coef: 215, description: 'ETAM A — Exécution simple' },
        { position: 'B',  coef: 240, description: 'ETAM B — Exécution autonomie' },
        { position: 'C',  coef: 270, description: 'ETAM C — Études simples' },
        { position: 'D',  coef: 310, description: 'ETAM D — Études techniques' },
        { position: 'E',  coef: 360, description: 'ETAM E — Études confirmées' },
        { position: 'F',  coef: 410, description: 'ETAM F — Maîtrise' },
        { position: 'G',  coef: 460, description: 'ETAM G — Maîtrise confirmée — passerelle cadre' },
        { position: 'H',  coef: 525, description: 'ETAM H — Position cadre' },
      ],
    },
    notes: 'Grille ETAM Bâtiment. Pour les cadres BTP, voir CCN 2420 (Cadres) ou IDCC dédié.',
    refLegifrance: 'KALICONT000018596160',
  },

  // ── 16 TRANSPORT ROUTIER MARCHANDISES ────────────────────────
  {
    idcc: 16, nom: 'Transport routier de marchandises',
    miseAjour: '2024-02',
    categories: {
      Coefficient: [
        { position: '110M', coef: 110, description: 'Manutentionnaire' },
        { position: '120M', coef: 120, description: 'Conducteur livreur' },
        { position: '128M', coef: 128, description: 'Conducteur véhicule léger' },
        { position: '138M', coef: 138, description: 'Conducteur PL' },
        { position: '150M', coef: 150, description: 'Conducteur SPL' },
        { position: '200M', coef: 200, description: 'Personnel administratif' },
        { position: '230M', coef: 230, description: 'Agent maîtrise' },
        { position: 'Cadre1', coef: 100, description: 'Cadre débutant' },
        { position: 'Cadre2', coef: 132, description: 'Cadre confirmé' },
        { position: 'Cadre3', coef: 165, description: 'Cadre supérieur' },
        { position: 'Cadre4', coef: 215, description: 'Cadre dirigeant L3111-2' },
      ],
    },
    notes: 'Distinction nette entre personnel roulant (régime heures spécifique avec contingent particulier) et cadres administratifs (forfait jours possible).',
    refLegifrance: 'KALICONT000005635624',
  },

  // ── 2511 SPORT ─────────────────────────────────────────────────
  {
    idcc: 2511, nom: 'Sport — Entreprises du secteur sportif',
    miseAjour: '2024-01',
    categories: {
      Groupe: [
        { position: '1', coef: 220, description: 'Groupe 1 — Personnel exécution' },
        { position: '2', coef: 240, description: 'Groupe 2 — Personnel qualifié' },
        { position: '3', coef: 270, description: 'Groupe 3 — Personnel hautement qualifié' },
        { position: '4', coef: 310, description: 'Groupe 4 — Maîtrise / animateur expert' },
        { position: '5', coef: 360, description: 'Groupe 5 — Cadre / éducateur référent' },
        { position: '6', coef: 420, description: 'Groupe 6 — Cadre confirmé / direction' },
        { position: '7', coef: 500, description: 'Groupe 7 — Cadre dirigeant L3111-2' },
      ],
    },
    notes: 'Groupe 5 et + = statut cadre. Groupe 7 typiquement cadre dirigeant.',
    refLegifrance: 'KALICONT000005635192',
  },

  // ── 1672 ASSURANCE (Sociétés d\'assurances) ───────────────────
  {
    idcc: 1672, nom: 'Sociétés d\'assurances',
    miseAjour: '2024-04',
    categories: {
      Classe: [
        { position: '1', coef: 200, description: 'Classe 1 — Employé débutant' },
        { position: '2', coef: 230, description: 'Classe 2 — Employé qualifié' },
        { position: '3', coef: 270, description: 'Classe 3 — Employé hautement qualifié' },
        { position: '4', coef: 320, description: 'Classe 4 — Technicien expérimenté' },
        { position: '5', coef: 380, description: 'Classe 5 — Cadre débutant' },
        { position: '6', coef: 450, description: 'Classe 6 — Cadre' },
        { position: '7', coef: 540, description: 'Classe 7 — Cadre supérieur / dirigeant' },
      ],
    },
    notes: 'Classe 5 et + = statut cadre. Classe 7 souvent associée au cadre dirigeant L3111-2.',
    refLegifrance: 'KALICONT000005635623',
  },

  // ── 2596 RESTAURATION RAPIDE — Cadres ──────────────────────────
  {
    idcc: 2596, nom: 'Restauration rapide',
    miseAjour: '2024-01',
    categories: {
      Niveau: [
        { position: 'I',   coef: 200, description: 'Employé polyvalent' },
        { position: 'II',  coef: 220, description: 'Employé qualifié' },
        { position: 'III', coef: 240, description: 'Maîtrise' },
        { position: 'IV',  coef: 280, description: 'Adjoint manager' },
        { position: 'V',   coef: 330, description: 'Manager / responsable établissement' },
        { position: 'VI',  coef: 400, description: 'Cadre / responsable de zone' },
        { position: 'VII', coef: 480, description: 'Cadre dirigeant L3111-2' },
      ],
    },
    notes: 'Niveau VI et + = cadre. Niveau VII typiquement cadre dirigeant.',
    refLegifrance: 'KALICONT000005635833',
  },
];

// ══════════════════════════════════════════════════════════════════
//  API publique
// ══════════════════════════════════════════════════════════════════
const CCN_Coefficients = {
  /**
   * Retourne la grille de coefficients pour un IDCC donné.
   * @param {number} idcc
   * @returns {object|null}
   */
  getGrille(idcc) {
    return CCN_COEFFICIENTS.find(g => g.idcc === idcc) || null;
  },

  /**
   * Liste toutes les CCN disposant d'une grille de coefficients.
   * @returns {Array<{idcc, nom}>}
   */
  listAll() {
    return CCN_COEFFICIENTS.map(g => ({ idcc: g.idcc, nom: g.nom, miseAjour: g.miseAjour }));
  },

  /**
   * Vérifie si une CCN dispose d'une grille (pour afficher un bouton "Voir la grille").
   */
  hasGrille(idcc) {
    return !!this.getGrille(idcc);
  },

  /**
   * Retourne le coefficient cadre dirigeant le plus élevé d'une CCN si défini.
   * Utile pour valider/comparer un coef saisi par l'utilisateur.
   */
  getCoefCadreDirigeant(idcc) {
    const g = this.getGrille(idcc);
    if (!g) return null;
    let max = null;
    for (const cat of Object.values(g.categories)) {
      for (const niv of cat) {
        if (/L3111-2|dirigeant/i.test(niv.description)) {
          if (max === null || niv.coef > max.coef) max = niv;
        }
      }
    }
    return max;
  },
};

global.CCN_Coefficients = CCN_Coefficients;

})(window);
