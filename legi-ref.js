/* ============================================================================
   LEGI-REF.JS — numéros d'articles cliquables dans les glossaires
   ----------------------------------------------------------------------------
   POURQUOI ?
   Les glossaires (fox, module5, module6) affichent un libellé d'article :
   "Art. L3121-27", "Art. L3121-58 à L3121-65", "Art. L323-4 CSS"…
   Ce helper transforme le NUMÉRO lui-même en lien vers le texte intégral sur
   MonLegiTexte. On rend cliquable ce qui est déjà écrit : aucun bloc "voir le
   texte" ajouté, la mise en page ne bouge pas.

   UTILISATION
     <script src="../legi-ref.js"></script>     (avant le script du glossaire)

     LegiRef.html(g.art)                        -> libellé avec numéros cliquables
     LegiRef.html(g.art, function(t){...})      -> idem, en passant une fonction
                                                   de surlignage appliquée au texte

   POURQUOI LA FONCTION DE SURLIGNAGE EN PARAMÈTRE ?
   fox surligne les termes recherchés avec _highlight(), qui insère des <mark>.
   Si on surlignait AVANT de lier, un <mark> pourrait couper un numéro en deux
   et le motif ne serait plus reconnu ; si on surlignait APRÈS, l'expression
   pourrait aller réécrire l'intérieur d'un href. On fait donc les deux ensemble
   ici : le découpage se fait sur le libellé brut, et le surlignage n'est
   appliqué qu'aux fragments de texte, jamais aux attributs.

   POURQUOI UNE TABLE EN DUR ?
   1442 numéros existent à la fois dans le code du travail et dans celui de la
   sécurité sociale (L411-1, L461-1…). Le numéro seul ne dit donc pas où
   pointer, et les glossaires n'ont pas de champ "code" (contrairement à
   outils/articles-loi.js). La table ci-dessous tranche pour chaque numéro
   réellement cité par les trois glossaires. Elle a été construite par
   recoupement avec les corpus officiels, en tenant compte des libellés qui
   précisent déjà le code ("Art. L323-4 CSS").

   Un numéro absent de la table reste en texte brut. C'est le cas de L3141-47,
   borne finale de la plage "Art. L3141-1 à L3141-47" de module6, qui n'existe
   pas au corpus : mieux vaut pas de lien qu'un lien mort.

   MAINTENANCE
   Nouvel article cité dans un glossaire : l'ajouter dans ARTICLES_TRAVAIL ou
   ARTICLES_SECU. Sans ça il s'affiche normalement, simplement non cliquable.
   ========================================================================== */

(function (global) {
  "use strict";

  var BASE = 'https://monlegitexte.heuressupfrance.workers.dev/';

  /* Articles du code de la sécurité sociale cités par les glossaires. */
  var ARTICLES_SECU = [
    'L241-17', 'L323-4'
  ];

  /* Articles du code du travail cités par les glossaires. */
  var ARTICLES_TRAVAIL = [
    'L1222-10', 'L1222-11', 'L1222-9', 'L1237-11', 'L1237-18', 'L1237-19', 'L1411-1', 'L2242-17',
    'L2251-1', 'L3111-1', 'L3111-2', 'L3121-1', 'L3121-12', 'L3121-18', 'L3121-20', 'L3121-22',
    'L3121-27', 'L3121-28', 'L3121-30', 'L3121-33', 'L3121-36', 'L3121-37', 'L3121-55', 'L3121-57',
    'L3121-58', 'L3121-59', 'L3121-64', 'L3121-65', 'L3121-66', 'L3121-9', 'L3123-1', 'L3123-10',
    'L3123-13', 'L3123-20', 'L3123-22', 'L3123-23', 'L3123-24', 'L3123-28', 'L3123-29', 'L3123-3',
    'L3123-30', 'L3123-31', 'L3123-4', 'L3123-6', 'L3123-7', 'L3123-9', 'L3131-1', 'L3132-2',
    'L3132-3', 'L3133-1', 'L3133-12', 'L3141-1', 'L3141-33', 'L3141-23', 'L3141-5', 'L3151-1', 'L3151-4',
    'L3211-1', 'L3242-1', 'L4121-1', 'L4131-1', 'R3243-1', 'R4121-1', 'R4624-10'
  ];

  var CORPUS = {};
  ARTICLES_TRAVAIL.forEach(function (a) { CORPUS[a] = 'travail'; });
  ARTICLES_SECU.forEach(function (a) { CORPUS[a] = 'secu'; });

  /* "L. 3121-27" / "L3121-27" -> clé normalisée "L3121-27" */
  function normalise(txt) {
    return txt.replace(/[.\s]/g, '').toUpperCase();
  }

  function url(cle) {
    var corpus = CORPUS[cle];
    if (!corpus) return null;
    return BASE + '?art=' + encodeURIComponent(cle) + (corpus === 'secu' ? '&code=secu' : '');
  }

  function echapper(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Motif d'un numéro d'article. Les plages ("L3121-58 à L3121-65") et les
     listes ("L3123-1 et L3123-28") sont gérées naturellement : chaque numéro
     rencontré est traité indépendamment, donc les deux bornes deviennent
     cliquables. */
  var MOTIF = /\b([LRD])\.?\s?(\d{3,4}-\d+)\b/g;

  /* Transforme un libellé en HTML, numéros cliquables.
     `surligne` est optionnelle : appliquée aux fragments de TEXTE uniquement. */
  function html(libelle, surligne) {
    if (!libelle) return '';
    var brut = String(libelle);
    var texte = function (s) {
      return surligne ? surligne(s) : echapper(s);
    };

    var out = '', pos = 0, m;
    MOTIF.lastIndex = 0;
    while ((m = MOTIF.exec(brut))) {
      var lien = url(normalise(m[0]));
      if (!lien) continue;                       /* inconnu : laissé en texte */
      if (m.index > pos) out += texte(brut.slice(pos, m.index));
      /* nofollow : l'application est indexée, MonLegiTexte ne doit pas l'être. */
      out += '<a class="legi-ref" href="' + echapper(lien) + '" target="_blank"' +
             ' rel="noopener nofollow" title="Lire le texte officiel de cet article">' +
             texte(m[0]) + '</a>';
      pos = m.index + m[0].length;
    }
    if (!pos) return texte(brut);                /* aucun numéro : libellé inchangé */
    if (pos < brut.length) out += texte(brut.slice(pos));
    return out;
  }

  function style() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('legi-ref-style')) return;
    var s = document.createElement('style');
    s.id = 'legi-ref-style';
    /* Discret : souligné pointillé, couleur héritée — on signale que c'est
       cliquable sans dénaturer la charte de chaque module. */
    s.textContent =
      '.legi-ref{color:inherit;text-decoration:underline;' +
      'text-decoration-style:dotted;text-underline-offset:2px;' +
      'text-decoration-thickness:1px;cursor:pointer}' +
      '.legi-ref:hover{text-decoration-style:solid}';
    (document.head || document.documentElement).appendChild(s);
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', style);
    } else {
      style();
    }
  }

  global.LegiRef = { html: html, url: url, style: style };

})(typeof window !== 'undefined' ? window : this);
