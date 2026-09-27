/**
 * CALC-ENGINE M6 v2 — Moteur de calcul complet Cadres
 * Forfait Jours (218j) + Forfait Heures (seuil variable)
 * Prorata arrivée/départ · Fractionnement · Amplitude 11h/35h · Prédictif
 * Sources : Code du travail L3121-41→L3121-65, ANI 2001, Cass.Soc.
 */
'use strict';

(function(global) {

// ══════════════════════════════════════════════════════════════════
//  JOURS FÉRIÉS FRANCE
// ══════════════════════════════════════════════════════════════════
const M6_Feries = {
  paques(y) {
    const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4;
    const f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3);
    const h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4;
    const l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451);
    const month=Math.floor((h+l-7*m+114)/31),day=((h+l-7*m+114)%31)+1;
    return new Date(y,month-1,day);
  },
  _fmt(d) { const dt=new Date(d); return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`; },
  _add(d,n) { const dt=new Date(d); dt.setDate(dt.getDate()+n); return dt; },
  getSet(year) {
    const p=this.paques(year),fmt=this._fmt.bind(this),add=this._add.bind(this);
    return new Set([
      `${year}-01-01`,fmt(add(p,1)),`${year}-05-01`,`${year}-05-08`,
      fmt(add(p,39)),fmt(add(add(p,49),1)),
      `${year}-07-14`,`${year}-08-15`,`${year}-11-01`,
      `${year}-11-11`,`${year}-12-25`,
    ]);
  },
  getLabels() {
    return {'01-01':'Jour de l\'an','05-01':'Fête du Travail','05-08':'Victoire 1945',
            '07-14':'Fête nationale','08-15':'Assomption','11-01':'Toussaint',
            '11-11':'Armistice 1918','12-25':'Noël'};
  }
};

// ══════════════════════════════════════════════════════════════════
//  BORNES DE L'EXERCICE (26/09/2026)
//  Un exercice à cheval (ex. juin → mai) est rangé sous l'année de son début :
//  ses jours de janvier à mai portent l'année suivante. Avant, tout filtrait sur
//  « la date commence par l'année » et ces jours étaient ignorés.
//  Exercice du 1er janvier au 31 décembre : filtre strictement identique à avant.
// ══════════════════════════════════════════════════════════════════
/* 27/09/2026 : nom (année) d'un exercice = l'année où il a le plus de jours ; égalité →
   année de début. 29/12/2025 → 27/12/2026 : 2026 ; 01/06/2025 → 31/05/2026 : 2025.
   Même règle que le compteur annuel. */
function M6_exoAnnee(deb, fin) {
  const re = /^\d{4}-\d{2}-\d{2}$/;
  if (!re.test(deb || '')) return null;
  const y1 = parseInt(deb, 10);
  if (!re.test(fin || '') || fin < deb) return y1;
  const y2 = parseInt(fin, 10);
  let best = y1, bj = -1;
  for (let y = y1; y <= y2; y++) {
    const a = new Date(Math.max(Date.parse(deb + 'T12:00:00'), Date.parse(y + '-01-01T12:00:00')));
    const b = new Date(Math.min(Date.parse(fin + 'T12:00:00'), Date.parse(y + '-12-31T12:00:00')));
    const j = Math.round((b - a) / 864e5) + 1;
    if (j > bj) { bj = j; best = y; }
  }
  return best;
}
global.M6_exoAnnee = M6_exoAnnee;

const M6_Periode = {
  _iso(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); },
  bornes(contract, year, regime) {
    year = parseInt(year, 10);
    let c = contract;
    const RG = regime || localStorage.getItem('M6_REGIME') || '';
    if (!c) { try { c = global.M6_Storage && M6_Storage.getContract(RG); } catch (_) {} }
    c = c || {};
    // Réglages propres à cet exercice (27/09/2026) : leurs dates priment
    try {
      const rg = RG;
      const sn = JSON.parse(localStorage.getItem('M6_' + rg + '_' + year + '_CONTRACT') || 'null');
      const re0 = /^\d{4}-\d{2}-\d{2}$/;
      if (sn) {
        if (re0.test(sn.dateDebutExercice || '') && re0.test(sn.dateFinExercice || '') && sn.dateFinExercice >= sn.dateDebutExercice && M6_exoAnnee(sn.dateDebutExercice, sn.dateFinExercice) === year)
          return { year, deb: sn.dateDebutExercice, fin: sn.dateFinExercice, calendaire: sn.dateDebutExercice === year + '-01-01' && sn.dateFinExercice === year + '-12-31' };
        if (!sn.dateDebutExercice && !sn.dateFinExercice) return { year, deb: year + '-01-01', fin: year + '-12-31', calendaire: true };
      }
    } catch (_) {}
    // Exercices déjà clos : leurs vraies dates, gardées à l'ouverture du suivant (26/09/2026)
    try {
      const h = JSON.parse(localStorage.getItem('M6_EXERCICES_' + RG) || '{}') || {};
      const e = h[String(year)];
      if (e && e.deb && e.fin && e.fin >= e.deb) return { year, deb: e.deb, fin: e.fin, calendaire: e.deb === year + '-01-01' && e.fin === year + '-12-31' };
    } catch (_) {}
    const deb = c.dateDebutExercice, fin = c.dateFinExercice, re = /^\d{4}-\d{2}-\d{2}$/;
    if (deb && re.test(deb) && !(deb.slice(5) === '01-01' && (!fin || fin.slice(5) === '12-31'))) {
      // L'exercice nommé « year » commence l'année (year - décalage) : 17/11 → 16/11 est nommé
      // d'après l'année de sa fin, 01/06 → 31/05 d'après celle de son début
      const off = (fin && re.test(fin)) ? (M6_exoAnnee(deb, fin) - parseInt(deb, 10)) : 0;
      const d = (year - off) + '-' + deb.slice(5);
      let f;
      if (fin && re.test(fin)) f = (year - off + parseInt(fin.slice(0, 4), 10) - parseInt(deb.slice(0, 4), 10)) + '-' + fin.slice(5);
      else { const x = new Date(d + 'T12:00:00'); x.setFullYear(x.getFullYear() + 1); x.setDate(x.getDate() - 1); f = this._iso(x); }
      if (f >= d) return { year, deb: d, fin: f, calendaire: false };
    }
    return { year, deb: year + '-01-01', fin: year + '-12-31', calendaire: true };
  },
  inclut(k, b) {
    k = String(k);
    if (b.calendaire) return k.startsWith(String(b.year));
    if (/^\d{4}-\d{2}-\d{2}$/.test(k)) return k >= b.deb && k <= b.fin;
    const w = /^(\d{4})-W(\d{2})$/.exec(k);
    if (w) { const j4 = new Date(+w[1], 0, 4, 12), lun = new Date(j4); lun.setDate(j4.getDate() - ((j4.getDay() + 6) % 7) + (+w[2] - 1) * 7); const m = this._iso(lun); return m >= b.deb && m <= b.fin; }
    return false;
  },
  feries(b) {
    const s = new Set();
    for (let y = +b.deb.slice(0, 4); y <= +b.fin.slice(0, 4); y++) M6_Feries.getSet(y).forEach(x => s.add(x));
    return s;
  },
  // Jour compris dans l'exercice et au plus tard à la fin du mois m (0-11) de cet exercice
  jusquAuMois(dk, b, m) {
    if (!this.inclut(dk, b)) return false;
    if (b.calendaire) return parseInt(dk.slice(5, 7), 10) - 1 <= m;
    const dm = parseInt(b.deb.slice(5, 7), 10) - 1, y = parseInt(b.deb.slice(0, 4), 10) + (m < dm ? 1 : 0);
    return dk <= this._iso(new Date(y, m + 1, 0));
  }
};

// ══════════════════════════════════════════════════════════════════
//  MOTEUR FORFAIT JOURS
// ══════════════════════════════════════════════════════════════════
const M6_ForfaitJours = {

  calcRTT(year, plafond=218, cpContrat=25, dateArrivee=null, dateDepart=null, exDebut=null, exFin=null) {
    const isLeap = y => (y%4===0&&y%100!==0)||y%400===0;
    // Fériés de toutes les années couvertes (exercice à cheval, 26/09/2026)
    const feries = (function(){ const s=new Set(),a=dateArrivee?parseInt(dateArrivee,10):year,z=dateDepart?parseInt(dateDepart,10):year;
      for(let y=Math.min(a,z);y<=Math.max(a,z);y++) M6_Feries.getSet(y).forEach(x=>s.add(x)); return s; })();
    // 27/09/2026 : midi heure locale + date locale. Avant, minuit + toISOString décalait
    // chaque jour d'un cran en France (UTC+1/+2) : fériés mal repérés, RTT faussés en année civile.
    const debut  = dateArrivee ? new Date(dateArrivee+'T12:00:00') : new Date(year,0,1,12);
    const fin    = dateDepart  ? new Date(dateDepart+'T12:00:00')  : new Date(year,11,31,12);
    const joursCalendaires = isLeap(year)?366:365;
    let WE=0,feriesOuvres=0,joursEffPeriode=0;
    const cur=new Date(debut);
    while(cur<=fin){
      const dk=cur.getFullYear()+'-'+String(cur.getMonth()+1).padStart(2,'0')+'-'+String(cur.getDate()).padStart(2,'0'),dow=cur.getDay();
      joursEffPeriode++;
      if(dow===0||dow===6) WE++;
      else if(feries.has(dk)) feriesOuvres++;
      cur.setDate(cur.getDate()+1);
    }
    const ratio=joursCalendaires>0?joursEffPeriode/joursCalendaires:1;
    // Période comptable custom → le plafond saisi couvre déjà toute la période
    const hasPeriodeCustom = exDebut && exFin &&
      (exDebut.slice(5) !== '01-01' || exFin.slice(5) !== '12-31');
    const plafondProrata = hasPeriodeCustom ? plafond : Math.round(plafond*ratio);
    const cpProrata=Math.round(cpContrat*ratio);
    const rttTheoriques=Math.max(0,(joursEffPeriode-WE)-cpProrata-feriesOuvres-plafondProrata);
    return { rttTheoriques,feriesOuvres,joursTravailMax:plafondProrata,
             joursCalendaires,WE,joursCPContrat:cpProrata,
             joursEffPeriode,ratio:Math.round(ratio*100)/100,
             isProrata:ratio<0.99 };
  },

  analyze(contract, data, year) {
    const plafond=contract.plafond||218;
    const cpContrat=contract.joursCPContrat||25;

    // ── DÉTECTION AUTOMATIQUE DE L'ARRIVÉE ──
    // Si aucune dateArrivee n'est configurée, on prend la 1ère saisie du calendrier
    // comme point de départ du prorata. Aucune configuration requise.
    const allKeys = Object.keys(data).filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort();
    const firstEntry = allKeys.length ? allKeys[0] : null;
    // Prorata uniquement si une date d'arrivée est explicitement saisie
    const autoArrivee = contract.dateArrivee || null;

    // N'appliquer le prorata que si l'arrivée est significativement après le début d'exercice (>14j)
    const exDebutStr = contract.dateDebutExercice || `${year}-01-01`;
    const autoArriveeIsLate = autoArrivee && autoArrivee > exDebutStr &&
      Math.round((new Date(autoArrivee+'T12:00:00') - new Date(exDebutStr+'T12:00:00')) / 86400000) > 14;
    const effectiveArrivee = autoArriveeIsLate ? autoArrivee : null;

    // ── B1 MULTI-ANNÉE : bornes d'exercice ──
    const exDeb = effectiveArrivee || contract.dateDebutExercice || null;
    const exFin = contract.dateFinExercice || contract.dateDepart || null;
    const recap=this.calcRTT(year,plafond,cpContrat,exDeb,exFin,contract.dateDebutExercice||null,contract.dateFinExercice||null);
    // ── OVERRIDE MANUEL DES RTT ──
    // Si l'utilisateur a saisi un nombre de RTT spécifique (contract.rttManuel),
    // on remplace le calcul théorique. Utile pour les cas particuliers :
    // CCN avec RTT fixés par accord, salariés à temps partiel, accord d'entreprise
    // qui prévoit un nombre forfaitaire différent du calcul standard.
    // Le prorata s'applique si l'utilisateur arrive en cours d'année.
    if (contract.rttManuel !== undefined && contract.rttManuel !== null && contract.rttManuel !== '') {
      const rttM = parseFloat(contract.rttManuel);
      if (!isNaN(rttM) && rttM >= 0) {
        // Appliquer le ratio de prorata si la période est partielle
        recap.rttTheoriques = recap.isProrata
          ? Math.round(rttM * (recap.ratio || 1))
          : Math.round(rttM);
        recap.rttManuel = true;
      }
    }
    const _b=M6_Periode.bornes(contract,year);
    const feries=M6_Periode.feries(_b);
    let travailles=0,rachetes=0,rttPris=0,cpPris=0,reposPris=0,demis=0,deplacements=0,demis_matin=0,demis_am=0;
    const alertes=[],entrees=[];
    const entries=Object.entries(data).filter(([k])=>M6_Periode.inclut(k,_b)).sort(([a],[b])=>a.localeCompare(b));
    for(const [dk,v] of entries){
      const t=v.type||'travail';
      const dow=new Date(dk+'T12:00:00').getDay();
      const isWE=dow===0||dow===6;
      // CP uniquement sur jours ouvrables
      if(t==='cp'&&(isWE||feries.has(dk))) continue;
      // Demi-journees = 0.5 (avec suivi matin/apresmidi)
      if(t==='demi'){
        travailles+=0.5;
        if(v.demiPeriode==='matin') demis_matin++;
        else demis_am++;
        demis++;
      }
      else if(t==='travail'||t==='teletravail') travailles++; // 27/09/2026 : le télétravail est un jour travaillé
      else if(t==='rachat'){travailles++;rachetes++;}
      else if(t==='rtt')   rttPris++;
      else if(t==='cp')    cpPris++;
      else if(t==='repos') reposPris++;
      // Deplacement = toggle sur travail
      if(v.deplacement===true) deplacements++;
      entrees.push({dk,...v});
    }
    // Amplitude + repos quotidien
    const joursTrack=entrees.filter(e=>['travail','rachat','teletravail'].includes(e.type||'travail'));
    const amplitudeViolations=[];
    for(let i=1;i<joursTrack.length;i++){
      const prev=joursTrack[i-1],curr=joursTrack[i];
      if(prev.fin&&curr.debut){
        const reposH=(new Date(`${curr.dk}T${curr.debut}:00`)-new Date(`${prev.dk}T${prev.fin}:00`))/3600000;
        if(reposH<11&&reposH>0){
          alertes.push({niveau:'danger',icon:'🔴',titre:`Repos quotidien insuffisant`,
            texte:`${Math.round(reposH*10)/10}h entre ${prev.dk} et ${curr.dk}. Minimum légal : 11h (L3131-1).`,loi:'L3131-1'});
          amplitudeViolations.push({prev:prev.dk,curr:curr.dk,reposH});
        }
      }
      if(joursTrack[i].debut&&joursTrack[i].fin){
        const amp=(new Date(`${joursTrack[i].dk}T${joursTrack[i].fin}:00`)-new Date(`${joursTrack[i].dk}T${joursTrack[i].debut}:00`))/3600000;
        if(amp>13) alertes.push({niveau:'warning',icon:'⏰',titre:`Amplitude > 13h (${joursTrack[i].dk})`,
          texte:`${Math.round(amp*10)/10}h de travail. Incompatible avec le repos de 11h (L3131-1).`,loi:'L3131-1'});
      }
    }
    // Repos hebdomadaire
    const parSemaine={};
    for(const e of joursTrack){ const wk=this._isoWeek(new Date(e.dk+'T12:00:00')); parSemaine[wk]=(parSemaine[wk]||0)+1; }
    for(const [wk,nb] of Object.entries(parSemaine))
      if(nb>=6) alertes.push({niveau:'danger',icon:'🔴',titre:`Repos hebdo insuffisant (${wk})`,
        texte:`${nb} jours travaillés. Repos 35h consécutives requis (L3132-2).`,loi:'L3132-2'});
    // Dépassement plafond
    if(travailles>recap.joursTravailMax) alertes.push({niveau:'danger',icon:'⚠️',
      titre:`Dépassement forfait — ${travailles-recap.joursTravailMax}j`,
      texte:`Avenant rachat ≥10% obligatoire (L3121-59).`,loi:'L3121-59'});
    else if(travailles>=Math.floor(recap.joursTravailMax*0.9)) alertes.push({niveau:'warning',icon:'📅',
      titre:`Approche du plafond — ${recap.joursTravailMax-travailles}j restants`,
      texte:'Planifiez vos RTT avant la fin de l\'exercice.',loi:'L3121-41'});
    // Entretien — considéré "fait" si date OU case auto-attestée dans Validité
    let _entretienAutoOk = false;
    try { _entretienAutoOk = (localStorage.getItem(`M6_VALID_CHECK_forfait_jours_${year}_entretien_annuel`) === '1'); } catch(_) {}
    const _entretienOk = contract.entretienDate || _entretienAutoOk;
    if(!_entretienOk) alertes.push({niveau:'info',icon:'🗓️',
      titre:'Entretien annuel non enregistré',
      texte:'Obligatoire — risque de nullité du forfait (L3121-65).',loi:'L3121-65'});
    const fractionnement=this._calcFractionnement(data,year,contract);
    const simulRachat=this._simuleRachat(contract,travailles,recap.joursTravailMax);
    const prediction=this._predictFinAnnee(travailles,recap.joursTravailMax,year);
    return {
      joursEffectifs:travailles,rachetes,rttPris,cpPris,reposPris,demis,deplacements,demis_matin,demis_am,
      rttTheoriques:recap.rttTheoriques,rttSolde:recap.rttTheoriques-rttPris,
      rttManuel: !!recap.rttManuel,
      plafond:recap.joursTravailMax,feriesOuvres:recap.feriesOuvres,
      isProrata:recap.isProrata,ratio:recap.ratio,
      plafondProrata:recap.joursTravailMax,
      tauxRemplissage:Math.min(100,Math.round(travailles/recap.joursTravailMax*100)),
      joursRestants:Math.max(0,recap.joursTravailMax-travailles),
      alertes,amplitudeViolations,simulRachat,fractionnement,prediction,
      // entretienDate publie la date OU un marqueur si la case est auto-attestée
      entretienDate: contract.entretienDate || (_entretienAutoOk ? '__attested__' : null),
      entretienAutoOk: _entretienAutoOk,
      parSemaine,
      firstEntry, effectiveArrivee,
    };
  },

  _calcFractionnement(data,year,contract) {
    const _b=M6_Periode.bornes(contract,year);
    let cpHorsPeriode=0,totalCP=0;
    for(const [dk,v] of Object.entries(data)){
      if(!M6_Periode.inclut(dk,_b)||v.type!=='cp') continue;
      totalCP++;
      const mois=parseInt(dk.slice(5,7));
      if(mois<5||mois>10) cpHorsPeriode++;
    }
    return {droitFractionnement:cpHorsPeriode>=6?2:cpHorsPeriode>=3?1:0,cpHorsPeriode,totalCP};
  },

  _predictFinAnnee(joursActuels,plafond,year) {
    const today=new Date(),debut=new Date(year,0,1),fin=new Date(year,11,31);
    const eco=Math.max(1,Math.round((today-debut)/86400000));
    const reste=Math.max(0,Math.round((fin-today)/86400000));
    const rythme=joursActuels/eco;
    const predit=Math.round(joursActuels+rythme*reste);
    const ecart=predit-plafond;
    return {joursPredit:predit,ecart,rythme:Math.round(rythme*260)/10,
            joursRestantsAnnee:reste,statut:ecart>5?'risque':ecart<-10?'sous':'ok'};
  },

  _simuleRachat(contract,joursEffectifs,plafond) {
    const tauxJ=contract.tauxJournalier||0,maj=contract.tauxMajorationRachat||10;
    const jr=Math.max(0,joursEffectifs-plafond);
    if(!jr||!tauxJ) return null;
    const base=jr*tauxJ,majoré=base*(1+maj/100);
    return {joursRachetes:jr,montantBase:Math.round(base*100)/100,
            montantMajoré:Math.round(majoré*100)/100,majoration:maj,
            gainBrut:Math.round((majoré-base)*100)/100};
  },

  _isoWeek(d) {
    const dt=new Date(d); dt.setHours(12,0,0,0);
    dt.setDate(dt.getDate()+4-(dt.getDay()||7));
    const y=dt.getFullYear(),w=Math.ceil(((dt-new Date(y,0,1))/86400000+1)/7);
    return `${y}-W${String(w).padStart(2,'0')}`;
  }
};

// ══════════════════════════════════════════════════════════════════
//  MOTEUR FORFAIT HEURES
// ══════════════════════════════════════════════════════════════════
const M6_ForfaitHeures = {
  analyze(contract,data,year) {
    // ── Récupérer les règles CCN depuis le fichier commun (CCN_API) ──
    // Si l'utilisateur a renseigné un IDCC, on prend les règles de sa CCN
    // Sinon on utilise les valeurs saisies dans le contrat (ou les défauts légaux)
    let ccnRules = null;
    if (window.CCN_API && contract.ccnIdcc && contract.ccnIdcc > 0) {
      try { ccnRules = CCN_API.getGroupeForCCN(contract.ccnIdcc); } catch(_) {}
    }
    // PRIORITÉ : saisie manuelle (contract.*) > CCN > droit commun
    // L'utilisateur peut sélectionner une CCN puis ajuster manuellement → sa saisie gagne.
    const seuil     = contract.seuilHebdo || (ccnRules?.seuil)    || 35;
    const taux1     = contract.taux1      || (ccnRules?.taux1)    || 25;
    const palier1   = contract.palier1    || (ccnRules?.palier1)  || 8;
    // Taux intermédiaire (HCR a 3 paliers : 10%/4h, 20%/4h, 50%+)
    const taux_inter  = ccnRules?.taux_inter  || null;
    const palier_inter= ccnRules?.palier_inter|| null;
    const taux2     = contract.taux2      || (ccnRules?.taux2)    || 50;
    const contingentBase = contract.contingent || (ccnRules?.contingent) || 220;
    const maxHebdo  = (ccnRules?.maxHebdo) || 48;
    const ccnNom    = ccnRules?.nom || contract.ccnLabel || 'Droit commun';

    // ── PRORATA CONTINGENT ──
    // Appliqué UNIQUEMENT si :
    // 1. L'utilisateur a saisi explicitement une dateArrivee dans la config
    // 2. ET il a coché l'option "prorataContingent" dans le wizard
    // Sinon : pas de prorata, contingent plein utilisé.
    const _exDebutFH = contract.dateDebutExercice || `${year}-01-01`;
    let contingent = contingentBase;
    let contingentProrata = false;
    if (contract.dateArrivee && contract.prorataContingent) {
      const arrDate   = new Date(contract.dateArrivee + 'T12:00:00');
      const exDebDate = new Date(_exDebutFH + 'T12:00:00');
      const exFinDate = contract.dateFinExercice
        ? new Date(contract.dateFinExercice + 'T12:00:00')
        : new Date(year, 11, 31);
      const totalJours = Math.round((exFinDate - exDebDate) / 86400000) + 1;
      const restants   = Math.round((exFinDate - arrDate)  / 86400000) + 1;
      const ratio = Math.min(1, Math.max(0, restants / totalJours));
      if (ratio < 0.99) {
        contingent = Math.round(contingentBase * ratio);
        contingentProrata = true;
      }
    }

    const tauxH=contract.tauxHoraire||0;
    let totalHSTaux1=0,totalHSTaux_inter=0,totalHSTaux2=0,totalHeures=0,semaines=0;
    const detailSemaines=[],alertes=[];
    const _b=M6_Periode.bornes(contract,year);
    const entries=Object.entries(data).filter(([k])=>M6_Periode.inclut(k,_b)).sort(([a],[b])=>a.localeCompare(b));

    for(const [wk,v] of entries){
      const h=parseFloat(v.heures)||0; totalHeures+=h; semaines++;
      const extra=Math.max(0,h-seuil);

      let hs1=0, hs_inter=0, hs2=0;
      if (taux_inter !== null) {
        // 3 paliers (ex: HCR — 36-39h=+10%, 40-43h=+20%, >=44h=+50%)
        hs1      = Math.min(extra, palier1);
        hs_inter = Math.min(Math.max(0, extra - palier1), palier_inter || 0);
        hs2      = Math.max(0, extra - palier1 - (palier_inter || 0));
      } else {
        hs1 = Math.min(extra, palier1);
        hs2 = Math.max(0, extra - palier1);
      }
      totalHSTaux1     += hs1;
      totalHSTaux_inter+= hs_inter;
      totalHSTaux2     += hs2;

      if(h>60) alertes.push({niveau:'danger',icon:'⛔',titre:`${wk} — ${h}h > 60h absolu`,
        texte:'Dépassement absolu interdit (L3121-20).',loi:'L3121-20'});
      else if(h>maxHebdo) alertes.push({niveau:'danger',icon:'⚠️',titre:`${wk} — ${h}h > ${maxHebdo}h CCN`,
        texte:`Maximum CCN "${ccnNom}" dépassé.`,loi:'L3121-20'});
      detailSemaines.push({semaine:wk,heures:h,hs1,hs_inter,hs2,
        paliers:taux_inter!==null?`+${taux1}%(${hs1}h)+${taux_inter}%(${hs_inter}h)+${taux2}%(${hs2}h)`:`+${taux1}%(${hs1}h)+${taux2}%(${hs2}h)`});
    }

    const totalHS = Math.round((totalHSTaux1 + totalHSTaux_inter + totalHSTaux2)*60)/60;
    const pct=Math.min(100,Math.round(totalHS/contingent*100));
    if(totalHS>contingent) alertes.push({niveau:'danger',icon:'⚠️',titre:`Contingent dépassé (${ccnNom})`,
      texte:`${Math.round(totalHS-contingent)}h au-delà du plafond ${contingent}h. CSE + accord requis (L3121-33).`,loi:'L3121-38'});
    else if(pct>=90) alertes.push({niveau:'warning',icon:'📊',titre:`Contingent à ${pct}% (${ccnNom})`,
      texte:`${Math.round(contingent-totalHS)}h restantes sur ${contingent}h.`,loi:'L3121-33'});

    let montantHS1=0,montantHS_inter=0,montantHS2=0;
    if(tauxH>0){
      montantHS1     = totalHSTaux1      * tauxH * (1+taux1/100);
      montantHS_inter= totalHSTaux_inter * tauxH * (1+(taux_inter||0)/100);
      montantHS2     = totalHSTaux2      * tauxH * (1+taux2/100);
    }
    const montantTotal=montantHS1+montantHS_inter+montantHS2;
    const exoFiscale=Math.min(montantTotal,7500);
    const semRestantes=Math.max(0,52-semaines),rythmeSem=semaines>0?totalHS/semaines:0;
    const prediction={hsPredit:Math.round(totalHS+rythmeSem*semRestantes),ecart:0,semRestantes,statut:'ok'};
    prediction.ecart=prediction.hsPredit-contingent;
    prediction.statut=prediction.ecart>20?'risque':prediction.ecart<-30?'sous':'ok';

    return {totalHeures,semaines,totalHS,
            totalHSTaux1:Math.round(totalHSTaux1*60)/60,
            totalHSTaux_inter:Math.round(totalHSTaux_inter*60)/60,
            totalHSTaux2:Math.round(totalHSTaux2*60)/60,
            montantHS1:Math.round(montantHS1*100)/100,
            montantHS_inter:Math.round(montantHS_inter*100)/100,
            montantHS2:Math.round(montantHS2*100)/100,
            montantTotal:Math.round(montantTotal*100)/100,
            exoFiscale:Math.round(exoFiscale*100)/100,
            tauxRemplissage:pct,detailSemaines,alertes,
            seuil,taux1,taux_inter,palier_inter,taux2,palier:palier1,contingent,
            contingentBase, contingentProrata,
            ccnNom,prediction,
            a3Paliers: taux_inter !== null};
  },
  isoWeek(date) {
    const d=new Date(date); d.setHours(12,0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    const y=d.getFullYear(),w=Math.ceil(((d-new Date(y,0,1))/86400000+1)/7);
    return `${y}-W${String(w).padStart(2,'0')}`;
  }
};

global.M6_Feries=M6_Feries;
global.M6_Periode=M6_Periode;
global.M6_ForfaitJours=M6_ForfaitJours;
global.M6_ForfaitHeures=M6_ForfaitHeures;

})(window);
