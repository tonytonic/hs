/* ============================================================================
 *  Migration CCN — réaligne l'IDCC stocké des utilisateurs existants
 *  ----------------------------------------------------------------------------
 *  Contexte : certaines conventions ont été recodées au bon IDCC officiel
 *  (ex. coiffure 1040 -> 2596, officine 2104 -> 1996, pharma 216 -> 176...).
 *  Un utilisateur ayant déjà choisi sa CCN a un `CCN_IDCC` périmé en
 *  localStorage. Sans migration, getGroupeForCCN() ne le trouve plus et
 *  retombe en droit commun (220 h) silencieusement.
 *
 *  Stratégie : on réaligne par le NOM (CCN_NOM), qui lui n'a pas changé.
 *  On va chercher l'entrée correspondante dans la table corrigée et on
 *  remet le bon IDCC. Filet de sécurité : table de correspondance pour les
 *  quelques anciens codes qui ont disparu, au cas où le nom ne matche pas.
 *
 *  À charger UNE fois, après conventions-collectives.js (donc après que
 *  window.CCN_API existe). Idempotent : ne fait rien si déjà à jour.
 * ========================================================================== */
(function migrateCCNStorage() {
  'use strict';
  try {
    if (typeof window === 'undefined' || !window.CCN_API) return;

    var FLAG = 'CCN_MIGR_2026_09';            // évite de re-tourner inutilement
    if (localStorage.getItem(FLAG) === '1') return;

    var idccStr = localStorage.getItem('CCN_IDCC');
    var nom     = localStorage.getItem('CCN_NOM');

    // Rien de stocké (nouvel utilisateur) : on marque et on sort.
    if (!idccStr && !nom) { localStorage.setItem(FLAG, '1'); return; }

    var aliases = (window.CCN_API.CCN_ALIASES) || [];
    var current = idccStr ? Number(idccStr) : null;

    // L'IDCC stocké existe-t-il encore dans la table ?
    var stillValid = current != null && aliases.some(function (c) { return c.i === current; });

    var resolved = null;

    // 1) Réalignement prioritaire par le NOM (le plus fiable)
    if (nom) {
      var byName = aliases.filter(function (c) { return c.n === nom; });
      if (byName.length === 1) resolved = byName[0];
    }

    // 2) Filet de sécurité : anciens codes disparus -> nouveau code officiel
    if (!resolved && !stillValid && current != null) {
      var REMAP = {
        669: 1388,  216: 176,   2104: 1996, 1040: 2596, 3186: 3043,
        86: 2728,   1044: 1987, 1311: 1947, 1383: 468,  1624: 1431,
        1659: 2198, 1686: 7018, 1780: 1922, 1966: 1512, 2075: 7005,
        2128: 1619, 2372: 1921, 2378: 2257, 2609: 2332, 3090: 2121,
        3205: 2543
      };
      if (REMAP.hasOwnProperty(current)) {
        var tgt = REMAP[current];
        var hit = aliases.filter(function (c) { return c.i === tgt; });
        if (hit.length) resolved = hit[0];
      }
    }

    // Applique si on a trouvé un meilleur IDCC
    if (resolved && resolved.i !== current) {
      localStorage.setItem('CCN_IDCC', String(resolved.i));
      if (resolved.n) localStorage.setItem('CCN_NOM', resolved.n);
      if (window.console) console.info('[CCN] IDCC migré', current, '->', resolved.i, '(' + resolved.n + ')');
    }

    localStorage.setItem(FLAG, '1');
  } catch (e) {
    // jamais bloquer le chargement de l'app pour une migration
    if (window.console) console.warn('[CCN] migration ignorée:', e);
  }
})();
