/**
 * CCN-ADAPTER M6 — Pont intelligent entre les deux sources CCN
 * =============================================================
 * Version : 2.0.0 — Mai 2026
 *
 * ARCHITECTURE À DEUX NIVEAUX :
 *
 *   SOURCE A — window.CCN_CADRES_API
 *     Fichier : module6/ccn/conventions-cadres.js (propre à M6)
 *     Usage   : Forfait Jours + Cadres Dirigeants
 *     Données : plafonds, entretien, suivi de charge, taux rachat, alertes CCN
 *
 *   SOURCE B — window.CCN_API
 *     Fichier : ../ccn/conventions-collectives.js (PARTAGÉ modules 1-5)
 *     Usage   : Forfait Heures UNIQUEMENT
 *     Données : règles HS, contingents, taux majorations HS
 *     ⚠️  NE PAS MODIFIER ce fichier — partagé avec les autres modules
 */
'use strict';

(function(global) {

const FALLBACK_FJ = [
  { idcc: 1486, nom: 'Syntec (IT / Ingénierie / Conseil)', secteur: 'IT',
    plafond: 218, tauxRachat: 10, entretienFreq: 'semestriel',
    clauseDeconn: true, alertes: ['⚠️ Entretien semestriel obligatoire (accord Syntec 1999)'],
    notes: 'CCN Syntec — accord cadres du 22/06/1999.' },
  { idcc: 2120, nom: 'Banque AFB', secteur: 'Banque',
    plafond: 205, tauxRachat: 25, entretienFreq: 'annuel',
    clauseDeconn: true, alertes: ['Plafond 205j', 'Taux rachat min 25%'],
    notes: 'CCN Banque AFB — dispositions plus favorables.' },
  { idcc: 3248, nom: 'Métallurgie ANU 2023', secteur: 'Industrie',
    plafond: 218, tauxRachat: 10, entretienFreq: 'annuel',
    clauseDeconn: true, alertes: ['Accord National Unique Métallurgie 2023'],
    notes: 'ANU Métallurgie 2023 — transition jusqu\'en 2025.' },
  { idcc: 0, nom: 'Droit commun (L3121-64)', secteur: 'Tous secteurs',
    plafond: 218, tauxRachat: 10, entretienFreq: 'annuel',
    clauseDeconn: false, alertes: ['Valeurs légales minimales'],
    notes: 'Base légale applicable sans convention spécifique.' },
];

const FALLBACK_HS = [
  // Contingents réels 2024 — sources : Légifrance + avenants de branche
  { idcc: 1486, nom: 'Syntec / Bureaux études',      contingent: 130, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc: 3248, nom: 'Métallurgie (ANI 2024)',        contingent: 220, taux1: 25, taux2: 50, seuil: 35, palier1: 8 }, // art.99.4 : 220h (175h si annualisé) + 80h complémentaire 1 an/2
  { idcc: 1979, nom: 'HCR',                           contingent: 360, seuil: 35, taux1: 10, palier1: 4, taux_inter: 20, palier_inter: 4, taux2: 50 },
  { idcc: 2120, nom: 'Banque AFB',                    contingent: 202, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc: 1672, nom: 'Sociétés assurances',           contingent:  70, taux1: 25, taux2: 50, seuil: 35, palier1: 8 }, // art.46 CCN 1672 : contingent individuel 70h
  { idcc: 1996, nom: 'Pharmacie officine',            contingent: 180, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc:   16, nom: 'Transport routier',             contingent: 195, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc: 2511, nom: 'Sport',                         contingent: 220, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc: 1501, nom: 'Restauration rapide',           contingent: 220, seuil: 35, taux1: 10, palier1: 8, taux_inter: 20, palier_inter: 8, taux2: 50 },
  { idcc: 1597, nom: 'Bâtiment ETAM',                contingent: 130, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc: 1090, nom: 'Réparation automobile',        contingent: 250, taux1: 25, taux2: 50, seuil: 35, palier1: 8 }, // 03/10/2026 : seuil 35 h (la table de secours ne sert que si ccn/conventions-collectives.js ne charge pas)
  { idcc: 1413, nom: 'Travail temporaire',            contingent: 220, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc: 2264, nom: 'Hospitalisation privée',        contingent: 220, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc: 2941, nom: 'Aide à domicile (BASS)',        contingent:  90, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc: 1351, nom: 'Gardiennage sécurité',         contingent: 120, taux1: 10, taux2: 50, seuil: 35, palier1: 8 },
  { idcc:  650, nom: 'Métallurgie OETAM (pré-2024)', contingent: 220, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc: 1619, nom: 'Cabinets dentaires',            contingent: 220, taux1: 25, taux2: 50, seuil: 35, palier1: 7 },
  { idcc: 3127, nom: 'Services à la personne',        contingent: 220, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc: 5730, nom: 'Commerce gros non alim.',       contingent: 220, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc:  573, nom: 'Commerce gros alim.',           contingent: 220, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc: 1517, nom: 'Commerce détail non alim.',     contingent: 220, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc: 5005, nom: 'Banque (Caisse Épargne)',       contingent: 202, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
  { idcc:    0, nom: 'Droit commun',                  contingent: 220, taux1: 25, taux2: 50, seuil: 35, palier1: 8 },
];

function _norm(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
}
function _hasCadresAPI() { return !!(global.CCN_CADRES_API); }
function _hasCommonAPI() { return !!(global.CCN_API); }

const M6_CCN_Adapter = {

  search(query, regime) {
    if (!query || String(query).trim().length < 1) return [];
    regime = regime || 'forfait_jours';

    if (regime === 'forfait_heures') {
      if (_hasCommonAPI()) return (global.CCN_API.search(query, 8)||[]).map(r => this._normalizeHS(r));
      return this._searchFallbackHS(query);
    }

    if (_hasCadresAPI()) {
      const fn = regime === 'cadre_dirigeant'
        ? global.CCN_CADRES_API.searchCadreDirigeant
        : global.CCN_CADRES_API.searchForfaitJours;
      return ((fn && fn(query, 8)) || []).map(r => this._normalizeFJ(r, regime));
    }
    return this._searchFallbackFJ(query);
  },

  get(labelOrIdcc, regime) {
    if (!labelOrIdcc) return this._getDroitCommun(regime);
    regime = regime || 'forfait_jours';
    const q = String(labelOrIdcc).trim();
    const num = parseInt(q);
    const hasNum = !isNaN(num) && num > 0;

    if (regime === 'forfait_heures') {
      if (_hasCommonAPI()) {
        const r = hasNum ? global.CCN_API.getGroupeForCCN(num) : (global.CCN_API.search(q,1)||[])[0];
        if (r) return this._normalizeHS(r);
      }
      return FALLBACK_HS.find(c => _norm(c.nom).includes(_norm(q))) || FALLBACK_HS[2];
    }

    if (_hasCadresAPI()) {
      const fn = regime === 'cadre_dirigeant'
        ? global.CCN_CADRES_API.getCadreDirigeant
        : global.CCN_CADRES_API.getForfaitJours;
      const r = fn ? (hasNum ? fn(num) : (this.search(q, regime)[0]?._raw || fn(0))) : null;
      if (r) return this._normalizeFJ(r, regime);
    }
    return this._searchFallbackFJ(q)[0] || FALLBACK_FJ[3];
  },

  buildContractDefaults(ccn, regime) {
    if (!ccn) return {};
    regime = regime || 'forfait_jours';
    // 04/10/2026 : forfait heures → règles de l'entrée choisie (ccn déjà normalisé par
    // _normalizeHS). Avant, on repassait par l'IDCC seul : en 3239, l'assistant maternel
    // recevait les règles du salarié du particulier employeur selon la convention du menu.
    if (regime === 'forfait_heures' && ccn.seuil !== undefined) {
      return { ccnLabel: ccn.nom||'Droit commun', ccnIdcc: ccn.idcc||0,
        seuilHebdo: ccn.seuil||35, taux1: ccn.taux1||25, taux2: ccn.taux2||50,
        palier1: ccn.palier1||8, contingent: ccn.contingent||220,
        sansContingent: !!ccn.sansContingent,
        taux_inter: ccn.taux_inter || null,
        palier_inter: ccn.palier_inter || null,
        ccnNotes: ccn.notes||'', ccnGroupe: ccn.groupe||'DC' };
    }
    if (_hasCadresAPI() && global.CCN_CADRES_API.buildContractDefaults) {
      return global.CCN_CADRES_API.buildContractDefaults(ccn._raw || ccn, regime);
    }
    if (regime === 'forfait_heures') {
      return { ccnLabel: ccn.nom||'Droit commun', ccnIdcc: ccn.idcc||0,
        seuilHebdo: ccn.seuil||35, taux1: ccn.taux1||25, taux2: ccn.taux2||50,
        palier1: ccn.palier1||8, contingent: ccn.contingent||220,
        taux_inter: ccn.taux_inter || null,
        palier_inter: ccn.palier_inter || null,
        ccnNotes: ccn.notes||'' };
    }
    return { ccnLabel: ccn.nom||'Droit commun', ccnIdcc: ccn.idcc||0,
      plafond: ccn.plafond||218, tauxMajorationRachat: ccn.tauxRachat||10,
      ccnNotes: ccn.notes||'', alertes: ccn.alertes||[] };
  },

  getAlertes(ccnLabelOrIdcc, regime, joursEffectifs, plafond) {
    regime = regime || 'forfait_jours';
    const ccn = this.get(ccnLabelOrIdcc, regime);
    const alertes = [];
    if (regime === 'forfait_jours' && ccn.plafond && ccn.plafond < 218) {
      alertes.push({ niveau:'warning',
        titre: `CCN ${ccn.nom} — plafond réduit ${ccn.plafond}j`,
        texte: `Votre CCN prévoit un plafond de ${ccn.plafond}j (plus favorable que les 218j légaux).`,
        loi: 'Art. L3121-64' });
    }
    if (ccn.entretienFreq === 'semestriel') {
      alertes.push({ niveau:'info',
        titre: `${ccn.nom} — entretien SEMESTRIEL obligatoire`,
        texte: `Convention impose entretiens semestriels de suivi de charge (${ccn.entretienRef||'accord branche'}).`,
        loi: ccn.entretienRef||'Accord branche' });
    }
    if (regime === 'forfait_jours' && ccn.tauxRachat > 10) {
      alertes.push({ niveau:'info',
        titre: `${ccn.nom} — taux rachat minimum ${ccn.tauxRachat}%`,
        texte: `CCN prévoit ${ccn.tauxRachat}% minimum (vs 10% légal).`,
        loi: 'Art. L3121-59' });
    }
    (ccn.alertes||[]).forEach(al => {
      alertes.push({ niveau:'info', titre:'CCN Info', texte: al, loi:`IDCC ${ccn.idcc||0}` });
    });
    return alertes;
  },

  renderCCNCard(ccn, regime) {
    if (!ccn || !ccn.nom) return '';
    regime = regime || 'forfait_jours';
    const rows = [];
    if (ccn.idcc) rows.push(['IDCC', ccn.idcc]);
    if (regime === 'forfait_heures') {
      rows.push(['Seuil HS', (ccn.seuil||35)+'h']);
      rows.push(['Contingent', ccn.sansContingent ? 'Aucun (convention)' : (ccn.contingent||220)+'h']);
      if (!ccn.taux_inter && Number(ccn.taux1||25) === Number(ccn.taux2||50)) {
        // 04/10/2026 : un seul taux (ex. assistant maternel 10 %) → une seule valeur
        rows.push(['Majoration', `+${ccn.taux1||25}% sur toutes les heures sup`]);
      } else if (ccn.taux_inter) {
        // 3 paliers (ex: HCR — 10%/4h + 20%/4h + 50%)
        rows.push(['Majoration', `+${ccn.taux1||10}%(${ccn.palier1||4}h) / +${ccn.taux_inter}%(${ccn.palier_inter||4}h) / +${ccn.taux2||50}%`]);
      } else {
        rows.push(['Majoration', `+${ccn.taux1||25}%(${ccn.palier1||8}h) / +${ccn.taux2||50}%`]);
      }
    } else if (regime === 'cadre_dirigeant') {
      rows.push(['CP maintenus', ccn.droitsCP||'25j ouvrables']);
      if (ccn.critereCD) rows.push(['Critères CD', ccn.critereCD.slice(0,70)+'…']);
    } else {
      rows.push(['Plafond', (ccn.plafond||218)+'j']);
      rows.push(['Entretien', ccn.entretienFreq==='semestriel'?'⚠️ Semestriel':'Annuel']);
      rows.push(['Rachat min', (ccn.tauxRachat||10)+'%']);
      rows.push(['Déconnexion', ccn.clauseDeconn?'✅ Formalisée':'—']);
    }
    const alertesHtml = (ccn.alertes||[]).slice(0,3).map(a =>
      `<div style="font-size:0.7rem;color:${a.startsWith('⚠️')?'var(--warning)':'var(--pierre)'};margin-top:3px">${a}</div>`
    ).join('');
    return `<div style="background:var(--ivoire-2);border:1px solid rgba(196,163,90,0.3);border-radius:var(--radius-lg);padding:12px 14px;margin-top:8px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="font-size:0.6rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--champagne);background:rgba(196,163,90,0.15);border-radius:99px;padding:2px 8px">IDCC ${ccn.idcc||0}</div>
        <div style="font-size:0.75rem;font-weight:600;color:var(--charbon);flex:1">${ccn.nom}</div>
      </div>
      ${rows.map(([l,v])=>`<div style="display:flex;justify-content:space-between;font-size:0.72rem;padding:3px 0;border-bottom:1px solid rgba(26,23,20,0.06)"><span style="color:var(--pierre)">${l}</span><span style="font-weight:500">${v}</span></div>`).join('')}
      ${alertesHtml?`<div style="margin-top:8px">${alertesHtml}</div>`:''}
      ${ccn.notes?`<div style="font-size:0.68rem;color:var(--pierre);margin-top:8px;line-height:1.4">${ccn.notes.slice(0,180)}${ccn.notes.length>180?'…':''}</div>`:''}
    </div>`;
  },

  bindAutocomplete(inputEl, dropEl, onSelect, regime) {
    if (!inputEl || !dropEl) return;
    regime = regime || 'forfait_jours';
    let timer;
    inputEl.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const q = inputEl.value.trim();
        if (q.length < 1) { dropEl.style.display='none'; return; }
        const results = this.search(q, regime);
        if (!results.length) { dropEl.style.display='none'; return; }
        dropEl.innerHTML = results.map((r,i) => {
          const badge = this._getRegimeBadge(r, regime);
          const sub   = this._getSubtitle(r, regime);
          return `<div data-idx="${i}" style="padding:10px 12px;cursor:pointer;border-bottom:1px solid var(--ivoire-2);font-size:0.82rem">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">
              <span style="font-weight:500;flex:1">${r.nom}</span>${badge}
            </div>
            <div style="font-size:0.68rem;color:var(--pierre)">${sub}</div>
          </div>`;
        }).join('');
        dropEl.style.display = 'block';
        dropEl.querySelectorAll('[data-idx]').forEach(el => {
          el.addEventListener('click', () => {
            const ccn = results[parseInt(el.dataset.idx)];
            inputEl.value = ccn.nom;
            dropEl.style.display = 'none';
            onSelect(ccn);
            // Afficher carte info CCN
            const parent = inputEl.closest('.m6-field') || inputEl.parentElement;
            // 04/10/2026 : l'assistant affiche déjà la carte dans sa zone « …-info » :
            // on n'en ajoute pas une seconde (la carte apparaissait en double).
            if (parent && !parent.querySelector('[id$="-info"]')) {
              parent.querySelector('.m6-ccn-info-card')?.remove();
              const card = document.createElement('div');
              card.className = 'm6-ccn-info-card';
              card.innerHTML = M6_CCN_Adapter.renderCCNCard(ccn, regime);
              parent.appendChild(card);
            }
          });
          el.addEventListener('mouseover', () => el.style.background='var(--ivoire)');
          el.addEventListener('mouseout',  () => el.style.background='');
        });
      }, 180);
    });
    document.addEventListener('click', e => {
      if (!dropEl.contains(e.target) && e.target !== inputEl) dropEl.style.display='none';
    });
  },

  _normalizeFJ(r, regime) {
    if (!r) return null;
    if (regime === 'cadre_dirigeant') {
      return { idcc: r.idcc||0, nom: (r.nom||'').replace(' — Cadres Dirigeants',''),
        secteur: r.secteur||'', plafond: 218, tauxRachat: 10, entretienFreq:'annuel',
        critereCD: r.critereCD||'', rmgCD: r.rmgCD||'', entretienCD: r.entretienCD||'',
        droitsCP: r.droitsCP||'25j ouvrables', alertes: r.alertesCD||[],
        notes: r.notesCD||'', _raw: r };
    }
    return { idcc: r.idcc||0, nom: r.nom||'Droit commun', secteur: r.secteur||'',
      plafond: r.plafond||218, tauxRachat: r.tauxRachat||10,
      entretienFreq: r.entretienFreq||'annuel', entretienRef: r.entretienRef||'Art. L3121-65',
      clauseDeconn: r.clauseDeconn||false, suiviCharge: r.suiviCharge||'',
      alertes: r.alertes||[], notes: r.notes||'', _raw: r };
  },

  _normalizeHS(r) {
    if (!r) return null;
    if (r.i !== undefined) {
      // 04/10/2026 : règles de CETTE entrée (3239 a deux entrées), pas de celle du menu
      const rules = _hasCommonAPI()
        ? (global.CCN_API.reglesEntree ? global.CCN_API.reglesEntree(r) : global.CCN_API.getGroupeForCCN(r.i))
        : {seuil:35,taux1:25,palier1:8,taux2:50,contingent:220};
      return { idcc: r.i, nom: r.n||'Convention collective', secteur: r.s||'',
        seuil: rules.seuil||35, taux1: rules.taux1||25, palier1: rules.palier1||8,
        taux2: rules.taux2||50, contingent: rules.contingent||220,
        sansContingent: !!rules.sansContingent,
        renvoi: r.renvoi || null, // ancienne convention fusionnée (2111, 2395)
        // 3 paliers (ex: HCR 10/20/50) — préserver si la source en a
        taux_inter:   rules.taux_inter   || null,
        palier_inter: rules.palier_inter || null,
        groupe: rules.id||'DC', groupeNom: rules.nom||'Droit commun',
        forfaitJour: r.fj||false, alertes:[], notes: rules.notes||'', _raw: r };
    }
    return { idcc:0, nom: r.nom||'Droit commun', secteur:'',
      seuil: r.seuil||35, taux1: r.taux1||25, palier1: r.palier1||8,
      taux2: r.taux2||50, contingent: r.contingent||220,
      sansContingent: !!r.sansContingent,
      taux_inter:   r.taux_inter   || null,
      palier_inter: r.palier_inter || null,
      groupe: r.id||'DC', groupeNom: r.nom||'Droit commun',
      alertes:[], notes: r.notes||'', _raw: r };
  },

  _searchFallbackFJ(query) {
    const q = _norm(query);
    return FALLBACK_FJ.filter(c => _norm(c.nom).includes(q)||String(c.idcc).includes(q)).slice(0,6);
  },
  _searchFallbackHS(query) {
    const q = _norm(query);
    return FALLBACK_HS.filter(c => _norm(c.nom).includes(q)||String(c.idcc).includes(q));
  },
  _getDroitCommun(regime) {
    if (regime === 'forfait_heures') return FALLBACK_HS[2];
    return this._normalizeFJ(FALLBACK_FJ[3], regime);
  },
  _getRegimeBadge(r, regime) {
    if (regime === 'forfait_heures') {
      if (r.sansContingent) return `<span style="font-size:0.6rem;color:var(--pierre);background:rgba(0,0,0,0.05);border-radius:99px;padding:1px 6px">sans contingent</span>`;
      const c = (r.contingent||220)<=100?'var(--alerte)':(r.contingent||220)<=150?'var(--warning)':'var(--succes)';
      return `<span style="font-size:0.6rem;color:${c};background:${c}18;border-radius:99px;padding:1px 6px">${r.contingent||220}h</span>`;
    }
    if (regime === 'forfait_jours') {
      const pl = r.plafond||218;
      const c  = pl<218?'var(--champagne-2)':'var(--pierre)';
      return `<span style="font-size:0.6rem;color:${c};background:${c}18;border-radius:99px;padding:1px 6px">${pl}j</span>`;
    }
    return '';
  },
  _getSubtitle(r, regime) {
    if (regime === 'forfait_heures') return `IDCC ${r.idcc||'—'}${r.renvoi?' (ex-'+r.renvoi+')':''} · ${r.secteur||''} · ${r.sansContingent?'pas de contingent':(r.contingent||220)+'h'} · ${(!r.taux_inter && Number(r.taux1||25)===Number(r.taux2||50)) ? '+'+(r.taux1||25)+'%' : '+'+(r.taux1||25)+'%/'+(r.taux2||50)+'%'}`;
    if (regime === 'cadre_dirigeant') return `IDCC ${r.idcc||'—'} · ${r.secteur||''} · L3111-2`;
    const e = r.entretienFreq==='semestriel'?'⚠️ Semestriel':'Annuel';
    return `IDCC ${r.idcc||'—'} · ${r.secteur||''} · ${r.plafond||218}j · ${e} · Rachat ${r.tauxRachat||10}%`;
  },
};

/* 26/09/2026 : CCN choisie dans le menu général (CCN_IDCC). Accord personnalisé du menu :
   non repris (il décrit des heures sup de salarié, pas un forfait cadre). */
M6_CCN_Adapter.duMenu = function(regime) {
  try {
    if (localStorage.getItem('CCN_CUSTOM')) return null;
    const idcc = parseInt(localStorage.getItem('CCN_IDCC') || '0', 10); if (!idcc) return null;
    let ccn = null;
    if (regime === 'forfait_heures') {
      if (_hasCommonAPI()) {
        // 04/10/2026 : même IDCC, plusieurs entrées (3239) → celle choisie dans le menu (CCN_NOM)
        const lst = (global.CCN_API.search(String(idcc), 20) || []).filter(x => x.i === idcc);
        const nomMenu = localStorage.getItem('CCN_NOM') || '';
        const e = lst.find(x => x.n === nomMenu) || lst[0];
        if (e) ccn = this._normalizeHS(e);
      }
      if (!ccn) ccn = FALLBACK_HS.find(c => c.idcc === idcc) || null;
    } else {
      const r = this.get(idcc, regime); if (r && +r.idcc === idcc) ccn = r;
    }
    return ccn && ccn.nom ? ccn : null;
  } catch (_) { return null; }
};
/* Contrat Zenji déjà enregistré sans CCN : reprise une fois (M6_CCN_MENU_<régime> garde
   l'IDCC déjà proposé). Seules les valeurs restées au défaut légal sont remplacées ;
   une valeur saisie à la main n'est jamais écrasée. Renvoie le nom repris, sinon ''. */
/* 04/10/2026 : règles de la convention corrigées (fonds droit) : un contrat forfait heures
   déjà rattaché à une convention reprend les nouvelles valeurs (contingent, seuil, taux,
   paliers) une fois par version des règles, seulement là où la valeur est restée au défaut
   légal. Une valeur saisie à la main n'est jamais écrasée. Renvoie true si modifié. */
M6_CCN_Adapter.resyncRegles = function(regime) {
  try {
    if (regime !== 'forfait_heures' || !global.M6_Storage || !global.CCN_API) return false;
    const c = M6_Storage.getContract(regime); if (!c || !c.ccnIdcc) return false;
    const ver = String(global.CCN_API.version || '') + ':' + c.ccnIdcc;
    if (localStorage.getItem('M6_CCN_REGLES_VER') === ver) return false;
    localStorage.setItem('M6_CCN_REGLES_VER', ver);
    const r = M6_CCN_Adapter.reglesContrat(c); if (!r) return false;
    const def = (v, x) => v === undefined || v === null || v === '' || v === 0 || v === x;
    const n = Object.assign({}, c); let ch = false;
    const set = (k, v, d) => { if (v != null && def(c[k], d) && c[k] !== v) { n[k] = v; ch = true; } };
    set('contingent', r.contingent, 220); set('taux1', r.taux1, 25); set('taux2', r.taux2, 50); set('palier1', r.palier1, 8);
    set('seuilHebdo', r.seuil, 35);
    if (!c.taux_inter && !c.palier_inter && r.taux_inter) { n.taux_inter = r.taux_inter; n.palier_inter = r.palier_inter || null; ch = true; }
    if (ch) M6_Storage.setContract(regime, n);
    return ch;
  } catch (_) { return false; }
};
/* 04/10/2026 : règles HS de la convention d'un contrat M6, d'après l'IDCC ET le nom
   enregistrés dans le contrat (indépendant de la convention du menu). null sans IDCC. */
M6_CCN_Adapter.reglesContrat = function(contract) {
  try {
    if (!contract || !global.CCN_API) return null;
    const idcc = parseInt(contract.ccnIdcc || 0, 10); if (!idcc) return null;
    return global.CCN_API.reglesPour
      ? global.CCN_API.reglesPour(idcc, contract.ccnLabel || '')
      : global.CCN_API.getGroupeForCCN(idcc);
  } catch (_) { return null; }
};
M6_CCN_Adapter.appliquerDuMenu = function(regime) {
  try {
    if (!regime || !global.M6_Storage) return '';
    const idcc = parseInt(localStorage.getItem('CCN_IDCC') || '0', 10); if (!idcc) return '';
    const fk = 'M6_CCN_MENU_' + regime;
    if (localStorage.getItem(fk) === String(idcc)) return '';
    const c = M6_Storage.getContract(regime);
    if (!c) return '';                                   // pas encore de contrat : l'assistant s'en charge
    localStorage.setItem(fk, String(idcc));
    if (c.ccnIdcc || (c.ccnLabel && c.ccnLabel.trim())) return '';
    const ccn = this.duMenu(regime); if (!ccn) return '';
    const n = Object.assign({}, c, { ccnLabel: ccn.nom, ccnIdcc: idcc });
    const d = this.buildContractDefaults(ccn, regime) || {};
    const def = (v, x) => v === undefined || v === null || v === '' || v === 0 || v === x;
    if (regime === 'forfait_jours') {
      if (d.plafond && def(c.plafond, 218)) n.plafond = d.plafond;
      if (d.tauxMajorationRachat && def(c.tauxMajorationRachat, 10)) n.tauxMajorationRachat = d.tauxMajorationRachat;
    } else if (regime === 'forfait_heures') {
      if (def(c.contingent, 220)) n.contingent = ccn.contingent || 220;
      if (def(c.taux1, 25)) n.taux1 = ccn.taux1 || 25;
      if (def(c.taux2, 50)) n.taux2 = ccn.taux2 || 50;
      if (def(c.palier1, 8)) n.palier1 = ccn.palier1 || 8;
      if (!c.taux_inter && !c.palier_inter && ccn.taux_inter) { n.taux_inter = ccn.taux_inter; n.palier_inter = ccn.palier_inter || null; }
    }
    M6_Storage.setContract(regime, n);
    return ccn.nom;
  } catch (_) { return ''; }
};
/* Assistant : champ CCN vide → prérempli avec la CCN du menu (toujours modifiable) */
global.M6_ccnDuMenuWizard = function(inp, regime, cb) {
  try {
    if (!inp || inp.value.trim() || parseInt(inp.dataset.idcc || '0', 10)) return;
    const ccn = M6_CCN_Adapter.duMenu(regime); if (!ccn) return;
    inp.value = ccn.nom; if (cb) cb(ccn);
  } catch (_) {}
};

global.M6_CCN_Adapter      = M6_CCN_Adapter;
global.M6_CCN_CADRES_TABLE = FALLBACK_FJ;

})(window);
