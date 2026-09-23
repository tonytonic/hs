# Revalorisation du SMIC — pense-bête

Relevé fait le 23/09/2026 sur la branche `Android-cloudfare-production`, SMIC en vigueur : **1 867,02 € brut/mois — 12,31 €/h** (01/06/2026).
Les numéros de ligne bougent avec les mises à jour : sur GitHub, ouvre le fichier et cherche la valeur (loupe ou « Rechercher dans la page »).

## Quand ?

Le tableau de bord affiche **« 📈 Le SMIC vient d'augmenter »** dès qu'un texte JORF de revalorisation arrive au fonds (souvent au 1er janvier, parfois en cours d'année).

## 1. Calculer les nouvelles valeurs

| Valeur | Calcul | Aujourd'hui |
|---|---|---|
| SMIC horaire brut | dans le texte officiel | 12,31 € |
| SMIC mensuel brut | horaire × 35 × 52 ÷ 12 (soit × 151,666…, arrondi au centime) — **pas** × 151,67 (ça donnerait 1 867,06 €) | 1 867,02 € |
| SMIC annuel brut | mensuel × 12 | 22 404,24 € |
| SMIC mensuel net | publié par service-public.fr / info.gouv.fr | 1 477,93 € |
| SMIC horaire net | publié par service-public.fr / info.gouv.fr (ne pas recalculer) | 9,75 € |
| Plafond IJSS mensuel | 1,4 × SMIC mensuel | 2 613,83 € (≈ 2 614 €) |
| IJSS maxi par jour | plafond mensuel × 3 ÷ 91,25 × 50 % | 42,97 € |

Attention pour les IJSS : le nouveau plafond ne vaut que pour les arrêts qui commencent **après** la date d'effet. Garde l'ancien dans une entrée « _sem1 » comme aujourd'hui (`ijss_max_sem1` dans `outils/articles-loi.js`).

## 2. Dans l'ordre

1. **`outils/articles-loi.js` — le registre (`var VALEURS`)** : `smic_h`, `smic_h_net`, `smic_mensuel`, `smic_mensuel_net`, `smic_annuel`, `ijss_max`, `ijss_plafond_mens` (valeur `v`, date `maj`, source `src`). Les outils qui lisent `SH.val(...)` suivent tout seuls : 11 ligne(s) ci-dessous sont marquées **auto** (ce ne sont que des valeurs de secours, à mettre à jour si tu as le temps).
2. **GrillePaye** : dans `GrillePaye/index.html`, `SMIC_DEF`, `SDATE_DEF`, `SSRC_DEF`. Dans `GrillePaye/ccn-data.json`, `_smic` et `_smic_date`, puis régénérer `_B64` (RUNBOOK.md). **Aucune ligne de grille à reprendre** : les lignes au plancher (`cv` / `sm`) suivent toutes seules.
3. **Les textes écrits en dur** : la liste ci-dessous, fichier par fichier.
4. **`sw.js`** : augmenter `CACHE_NAME`.
5. **Contrôle** : lancer « Régénérer les données de veille » ; l'alerte SMIC doit disparaître, et aucune alerte « SMIC : valeurs différentes dans l'appli » ne doit apparaître.

## 3. Où la valeur est écrite (46 endroits, 16 fichiers)

### `GrillePaye/ccn-data.json`

- **ligne 1** — SMIC mensuel brut, SMIC horaire brut  
  `ligne de données très longue (grilles) — ne rien changer à la main, voir étape 2`

### `GrillePaye/index.html`

- **ligne 1886** — SMIC mensuel brut  
  `… class="inp" id="adm-smic" step="0.01" min="0" placeholder="1867.02"></div>`
- **ligne 2230** — SMIC mensuel brut  
  `const SMIC_DEF=1867.02,SDATE_DEF="01/06/2026",SSRC_DEF="Arrêté du 16/05/2026 (JO) …`
- **ligne 4901** — SMIC mensuel brut  
  `const SMIC_DEF=1867.02,SDATE_DEF="01/06/2026",SSRC_DEF="Arrêté du 16/05/2026 (JO) …`

### `fox/js/articles-loi.js`

- **ligne 822** — SMIC horaire brut  
  `ex: "En 2026, le SMIC horaire brut est de 12,31 euros. Aucun salarié ne peut légalement percevoir moins, mê…`

### `glossaire.js`

- **ligne 463** — SMIC mensuel brut, SMIC horaire brut  
  `exemple: "SMIC 2026 = 12,31€/h brut (1867,02€/mois)"`

### `menu.html`

- **ligne 1133** — SMIC mensuel brut  
  `…e plus de <b>200 conventions collectives</b>. Le SMIC 2026 (1 867,02 € depuis le 01/06/2026 — Arrêté du 22/05/2026) est intégré …`
- **ligne 1138** — SMIC mensuel brut  
  `…dynamique</div><div style="color:#444;">Plancher SMIC 2026 (1 867,02 €) intégré · grilles en % SMIC recalculées auto</div></div>`

### `module5/index.html`

- **ligne 227** — SMIC horaire brut  
  `min="0" step="0.01" placeholder="ex : 12.31 (SMIC 2026)"`
- **ligne 819** — SMIC horaire brut  
  `…ut" id="contract-rate" min="0" step="0.01" placeholder="ex: 12.31">`

### `module5/js/features/glossaire.js`

- **ligne 38** — SMIC horaire brut  
  `exemple: "Taux horaire 12,31€ × 1,10 = 13,54€/h pour les premières heures complémentaire…`
- **ligne 45** — SMIC horaire brut  
  `exemple: "Contrat 25h, taux 12,31€ → 2,5 premières HC à 13,54€, puis les suivantes à 14,85€."…`

### `nouveautes.html`

- **ligne 298** — SMIC mensuel brut  
  `…udit légal juin 2026 — valeurs corrigées</b> : SMIC mensuel 1 867,02 €, titre-restaurant 7,32 €, RSA/saisie 651,69 €, majoration…`
- **ligne 521** — SMIC horaire brut, IJSS maxi par jour  
  `<div class="txt"><b>Valeurs 2026 à jour</b> : SMIC 12,31 €/h (revalorisation juin 2026), PMSS 4 005 €, PASS 48 060 €…`
- **ligne 577** — SMIC mensuel brut  
  `…conventions collectives avec grilles de salaires 2026. SMIC 1 867,02 € intégré.</div>`

### `outils/articles-loi.js`

- **ligne 15** — SMIC horaire brut — **auto** (suit le registre)  
  `SH.val('smic_h') → 12.31`
- **ligne 117** — SMIC horaire brut  
  `smic_h: { v: 12.31, u: '€/h', maj: '2026-06-01', src: 'Arrêté 22/05/2026 (JO 2…`
- **ligne 118** — SMIC mensuel net, SMIC horaire net  
  `…5, u: '€/h net',maj: '2026-06-01', src: '≈ SMIC net mensuel 1 477,93 € ÷ 151,67 h — info.gouv.fr' },`
- **ligne 119** — SMIC mensuel brut, SMIC horaire brut  
  `smic_mensuel: { v: 1867.02, u: '€/mois', maj: '2026-06-01', src: 'JO arrêté 22/05/2026…`
- **ligne 120** — SMIC mensuel net  
  `smic_mensuel_net:{ v: 1477.93, u: '€/mois net', maj: '2026-06-01', src: 'SMIC net mensuel…`
- **ligne 121** — SMIC annuel brut  
  `smic_annuel: { v: 22404.24, u: '€/an', maj: '2026-06-01', src: '12 × SMIC mensuel' },`
- **ligne 132** — SMIC mensuel brut, IJSS maxi par jour  
  `… v: 42.97, u: '€/jour', maj: '2026-07-01', src: '1,4 × SMIC 1867,02 — arrêts ≥ 1er juillet 2026' },`
- **ligne 595** — SMIC horaire brut  
  `// 4005 -> "4 005 €" ; 12.31 -> "12,31 €"`
- **ligne 613** — SMIC horaire brut — **auto** (suit le registre)  
  `/* Valeur brute (nombre) : SH.val('smic_h') -> 12.31 */`
- **ligne 618** — SMIC horaire brut  
  `/* Valeur formatée avec son unité : SH.show('smic_h') -> "12,31 €/h" */`
- **ligne 707** — SMIC horaire brut  
  `…pan data-val="smic_h"></span> → valeur formatée avec unité (12,31 €/h)`

### `outils/module-activite-partielle.html`

- **ligne 206** — SMIC horaire net  
  `…uit chaque revalorisation du SMIC sans décret séparé — soit 9,75 €/h depuis le 1ᵉʳ juin 2026 (à ne pas confondre avec le pla…`
- **ligne 282** — SMIC horaire brut, SMIC horaire net  
  `…(plancher = 9,75 €/h net depuis le 1ᵉʳ juin 2026, SMIC brut 12,31 €) pour les heures indemnisées. Si le calcul donne moins, l…`
- **ligne 318** — SMIC horaire brut — **auto** (suit le registre)  
  `var SMIC_H_BRUT = (window.SH && SH.val('smic_h')) || 12.31;`
- **ligne 319** — SMIC horaire net — **auto** (suit le registre)  
  `var SMIC_H_NET = (window.SH && SH.val('smic_h_net')) || 9.75; // plancher indemnité salarié = SMIC net horaire (suit cha…`

### `outils/module-alternance.html`

- **ligne 256** — SMIC mensuel brut  
  `…ded);margin-top:6px;line-height:1.4;">SMIC brut juin 2026 : 1 867,02 €/mois. La convention collective peut prévoir des minima pl…`
- **ligne 293** — SMIC mensuel brut  
  `…4"></span> CT · Barème apprentissage 2026 (SMIC juin 2026 : 1 867,02 €).<br>`
- **ligne 305** — SMIC mensuel brut  
  `…en alternance. Le barème est basé sur le SMIC de juin 2026 (1 867,02 €).`
- **ligne 313** — SMIC mensuel brut — **auto** (suit le registre)  
  `var SMIC = (window.SH && SH.val('smic_mensuel')) || 1867.02;`

### `outils/module-arret.html`

- **ligne 238** — IJSS maxi par jour  
  `…curité Sociale)</b>50 % du salaire journalier, plafonnées à 42,97 €/j (barème juillet 2026).</div></div>`
- **ligne 245** — IJSS maxi par jour  
  `…1,25, plafonné à 1,4 × SMIC mensuel. IJSS = SJB × 50 %, max 42,97 €/j (arrêts à compter du 1er juillet 2026). Maintien légal …`
- **ligne 264** — IJSS maxi par jour, plafond IJSS mensuel  
  `…iv class="legal">Plafond IJSS (arrêts ≥ 1er juillet 2026) : 42,97 €/j. Plafond du salaire pris en compte : 1,4 × SMIC (≈ 2 61…`
- **ligne 288** — plafond IJSS mensuel  
  `…es non récurrentes. Plafonné à 2 552 € pour le calcul IJSS (2 614 € à partir du 1ᵉʳ juillet 2026).</div></div>`
- **ligne 456** — SMIC mensuel brut — **auto** (suit le registre)  
  `var SMIC_MENS = (window.SH && SH.val('smic_mensuel')) || 1867.02;`
- **ligne 458** — IJSS maxi par jour — **auto** (suit le registre)  
  `var IJSS_MAX = (window.SH && SH.val('ijss_max')) || 42.97;`

### `outils/module-avantages-nature.html`

- **ligne 293** — SMIC mensuel brut, SMIC horaire brut  
  `// SMIC horaire brut (juin 2026) : 12,31 € → mensuel 35h = 1 867,02 €`
- **ligne 294** — SMIC horaire brut — **auto** (suit le registre)  
  `var SMIC_H = (window.SH && SH.val('smic_h')) || 12.31;`
- **ligne 295** — SMIC mensuel brut — **auto** (suit le registre)  
  `var SMIC_M = (window.SH && SH.val('smic_mensuel')) || 1867.02;`

### `outils/module-convertisseur.html`

- **ligne 272** — SMIC mensuel brut, SMIC horaire brut  
  `…ont-size:12.5px;color:#fff;">📊 SMIC juin 2026 : 12,31 €/h — 1 867,02 €/mois brut (JO arrêté 22/05/2026)</div>`

### `outils/module-cumul-retraite.html`

- **ligne 344** — SMIC mensuel brut — **auto** (suit le registre)  
  `var SMIC_MENS = (window.SH && SH.val('smic_mensuel')) || 1867.02;`

### `outils/module-rupture.html`

- **ligne 290** — SMIC mensuel brut — **auto** (suit le registre)  
  `var SMIC_MENS = (window.SH && SH.val('smic_mensuel')) || 1867.02; // SMIC brut 2026`

## Le nom du texte officiel

Recopie-le exactement, il est affiché aux utilisateurs dans GrillePaye (panneau Admin et mention SMIC) :
- **SMIC actuel** : *Arrêté du 22 mai 2026 relatif au relèvement du salaire minimum de croissance* (JO du 24/05/2026), en vigueur au 01/06/2026.
- ⚠️ Au 23/09/2026, GrillePaye écrit encore « Arrêté du **16/05/2026** » (dans `SSRC_DEF` de `GrillePaye/index.html` et `_smic_src` de `ccn-data.json`) : c'est une erreur de date, à corriger au plus tard à la prochaine revalorisation.
- Le tableau de bord reconnaît le prochain texte tout seul, qu'il s'intitule « portant relèvement » ou « relatif au relèvement du salaire minimum de croissance ».
- Le **minimum garanti** (4,35 € au 01/06/2026) est revalorisé en même temps que le SMIC : il n'est écrit nulle part dans l'appli aujourd'hui, rien à faire.

## À ne pas toucher

- `A-LIRE-lot2.md` : note d'historique d'une ancienne livraison.
- `GrillePaye/gen_clean.js` : ancien générateur, plus utilisé (ne pas le lancer).
- `outils/articles-loi.js`, entrée `ijss_max_sem1` : mentionne l'ancien SMIC (1 823,03 €) volontairement, c'est l'historique du 1er semestre 2026.
- `GrillePaye/suivi-public.json` et `tracking-ccn.csv` : régénérés tout seuls par la tâche du mercredi.
