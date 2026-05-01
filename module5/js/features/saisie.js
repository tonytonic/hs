/**
 * SAISIE — Gestion du stockage et lecture des heures complémentaires M5
 * Support double mode : saisie journalière (type:"day") ou hebdomadaire (type:"week")
 */
(function(global) {
'use strict';

const K = {
  DATA:        y => 'M5_DATA_' + y,
  VACANCES:    y => 'M5_VACANCES_' + y,
  AVENANT:     y => 'M5_AVENANT_' + y,
  CONTRACT:    'M5_CONTRACT',
  USER_NAME:   'M5_USER_NAME',
  WELCOMED:    'M5_WELCOMED',
  ACTIVE_YEAR: 'M5_ACTIVE_YEAR',
};

function _get(k, def='') { try{return localStorage.getItem(k)??def;}catch(_){return def;} }
function _set(k,v)       { try{localStorage.setItem(k,String(v));}catch(_){} }
function _json(k,def={}) { try{return JSON.parse(localStorage.getItem(k))??def;}catch(_){return def;} }
function _save(k,v)      { try{localStorage.setItem(k,JSON.stringify(v));}catch(_){} }

function localDK(d) {
  const dt=d||new Date();
  return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');
}
function weekStartOf(dateStr, startDow) {
  // startDow : 0=Lun, 1=Mar, 2=Mer, 3=Jeu, 4=Ven, 5=Sam, 6=Dim
  const d = new Date(dateStr + 'T12:00:00');
  const dayOfWeek = (d.getDay() + 6) % 7; // Mon=0 … Sun=6
  const sd = (startDow !== undefined ? startDow : 0);
  let diff = dayOfWeek - sd;
  if (diff < 0) diff += 7;
  d.setDate(d.getDate() - diff);
  return localDK(d);
}
// Alias rétrocompat
function mondayOf(dateStr) { return weekStartOf(dateStr, Contract.get().weekStartDay || 0); }

const Contract = {
  get() {
    const raw = _json(K.CONTRACT,{hoursBase:0,hourlyRate:0,idcc:0,ccnNom:'',cap:0.10,rate1:0.10,rate2:0.25,threshold:0.10,weekStartDay:0,exerciceStart:'01/01',clotureJour:0,modeCalcul:'HEBDO',neutraliseFeries:true});
    // Rétrocompat : si accordCollectifPrevenance absent, défaut = false (7 jours, L3123-31)
    if(raw.accordCollectifPrevenance === undefined) raw.accordCollectifPrevenance = false;
    // noticeDays : 7 par défaut (L3123-31) ; 3 si accord d'entreprise/branche (L3123-24)
    raw.noticeDays = raw.accordCollectifPrevenance ? 3 : 7;
    // joursOuvresContrat : nombre de jours travaillés/semaine (défaut 5)
    if(raw.joursOuvresContrat === undefined) raw.joursOuvresContrat = 5;
    return raw;
  },
  save(data) { _save(K.CONTRACT,data); },
  isSet() { return this.get().hoursBase>0; }
};

const DataStore = {
  getYear()  { return _get(K.ACTIVE_YEAR,String(new Date().getFullYear())); },
  setYear(y) { _set(K.ACTIVE_YEAR,String(y)); },
  getAll(year) { return _json(K.DATA(year||this.getYear()),{}); },

  // Saisie journalière
  saveDay(dateStr, workedH, year) {
    const yr=year||this.getYear();
    const data=this.getAll(yr);
    const mon=mondayOf(dateStr);
    // Si saisie hebdo existante : la supprimer explicitement (appelé après confirmation UI)
    if(data[mon]&&data[mon].type==='week') delete data[mon];
    if(workedH===null||workedH===undefined||workedH===0) {
      delete data[dateStr]; // 0h = on efface juste ce jour
    } else {
      data[dateStr]={worked:Math.round(workedH*100)/100,type:'day',savedAt:new Date().toISOString()};
    }
    _save(K.DATA(yr),data);
  },

  // Vérifier si une saisie hebdo existe déjà pour la semaine d'une date
  hasWeekTotal(dateStr, year) {
    const data=this.getAll(year||this.getYear());
    const mon=mondayOf(dateStr);
    return !!(data[mon]&&data[mon].type==='week'&&data[mon].worked>0);
  },

  deleteDay(dateStr, year) {
    const yr=year||this.getYear();
    const data=this.getAll(yr);
    delete data[dateStr];
    _save(K.DATA(yr),data);
  },

  // Saisie hebdomadaire (total semaine d'un coup)
  saveWeekTotal(mondayStr, workedH, year) {
    const yr=year||this.getYear();
    const data=this.getAll(yr);
    // Retire les saisies journalières de la semaine
    for(let d=0;d<7;d++){
      const dt=new Date(mondayStr+'T12:00:00'); dt.setDate(dt.getDate()+d);
      const dk=localDK(dt);
      if(data[dk]&&data[dk].type==='day') delete data[dk];
    }
    if(workedH===null||workedH===undefined) { delete data[mondayStr]; }
    else { data[mondayStr]={worked:Math.round(workedH*100)/100,type:'week',savedAt:new Date().toISOString()}; }
    _save(K.DATA(yr),data);
  },

  deleteWeek(mondayStr, year) {
    const yr=year||this.getYear();
    const data=this.getAll(yr);
    delete data[mondayStr];
    for(let d=0;d<7;d++){
      const dt=new Date(mondayStr+'T12:00:00'); dt.setDate(dt.getDate()+d);
      delete data[localDK(dt)];
    }
    _save(K.DATA(yr),data);
  },

  // Total semaine (journalier ou hebdo)
  getWeekTotal(mondayStr, year) {
    const data=this.getAll(year);
    // Mode hebdo : la clé stockée correspond directement au total
    if(data[mondayStr]&&data[mondayStr].type==='week') {
      return {total:data[mondayStr].worked,mode:'week',days:[]};
    }
    // Mode journalier : sommer les jours de la semaine
    const days=[]; let total=0;
    for(let d=0;d<7;d++){
      const dt=new Date(mondayStr+'T12:00:00'); dt.setDate(dt.getDate()+d);
      const dk=localDK(dt);
      const e=data[dk];
      days.push({dk,worked:e&&e.type==='day'?e.worked:null,dow:d});
      if(e&&e.type==='day'&&e.worked>0) total+=e.worked;
    }
    const hasAny=days.some(d=>d.worked!==null&&d.worked>0);
    return {total:hasAny?Math.round(total*100)/100:null,mode:'day',days};
  },

  // Détail jours d'une semaine
  getWeekDays(mondayStr, year) {
    const data=this.getAll(year);
    const today=localDK(new Date());
    const days=[];
    const hasWeekly=data[mondayStr]&&data[mondayStr].type==='week';
    const startDow=Contract.get().weekStartDay||0; // jour de début de semaine
    for(let d=0;d<7;d++){
      const dt=new Date(mondayStr+'T12:00:00'); dt.setDate(dt.getDate()+d);
      const dk=localDK(dt);
      const e=data[dk];
      // dow réel = (startDow + d) % 7 en convention Mon=0
      const realDow = (startDow + d) % 7;
      days.push({
        dk, dow:d, realDow,
        worked: e&&e.type==='day'?e.worked:null,
        isPast: dk<=today,
        isToday: dk===today,
        isFuture: dk>today,
      });
    }
    days.weeklyTotal = hasWeekly?data[mondayStr].worked:null;
    days.mode = hasWeekly?'week':'day';
    return days;
  },

  // Semaines avec données
  getWeeksSorted(year) {
    const data=this.getAll(year);
    const mondays=new Set();
    Object.keys(data).forEach(dk=>{
      if(!/^\d{4}-\d{2}-\d{2}$/.test(dk)) return;
      const entry=data[dk];
      if(entry.type==='week') {
        // Saisie hebdo : la clé EST le début de semaine, on l'utilise directement
        mondays.add(dk);
      } else if(entry.type==='day') {
        // Saisie journalière : on calcule le début de semaine selon le paramètre actuel
        mondays.add(mondayOf(dk));
      }
    });
    return [...mondays].sort().map(mon=>{
      const wk=this.getWeekTotal(mon,year);
      return {monday:mon,worked:wk.total,mode:wk.mode};
    }).filter(w=>w.worked!==null);
  },

  getLast12Weeks(year) { return this.getWeeksSorted(year).slice(-12); },

  getAnnualStats(year, contractH, ccnRules) {
    const weeks=this.getWeeksSorted(year);
    if(!weeks.length) return null;
    let totalWorked=0,totalComp=0,totalComp1=0,totalComp2=0,weeksWithComp=0,maxWorked=0;
    weeks.forEach(w=>{
      const wh=w.worked||0; totalWorked+=wh;
      if(wh>maxWorked) maxWorked=wh;
      if(wh>contractH){
        const diff=wh-contractH, th1=contractH*(ccnRules.threshold||0.10);
        totalComp+=diff; totalComp1+=Math.min(diff,th1); totalComp2+=Math.max(0,diff-th1);
        weeksWithComp++;
      }
    });
    return {
      totalWeeks:weeks.length,weeksWithComp,
      totalWorked:Math.round(totalWorked*100)/100,
      totalComp:Math.round(totalComp*100)/100,
      totalComp1:Math.round(totalComp1*100)/100,
      totalComp2:Math.round(totalComp2*100)/100,
      avgWorked:Math.round(totalWorked/weeks.length*100)/100,
      maxWorked:Math.round(maxWorked*100)/100,
      pctOverContract:weeks.length>0?Math.round(weeksWithComp/weeks.length*100):0,
    };
  },

  // ── Complément d'heures par avenant (Art. L3123-22) ──────────────
  getAvenants(year) {
    try { return JSON.parse(localStorage.getItem(K.AVENANT(year||this.getYear()))||'{}'); } catch(_){ return {}; }
  },

  saveAvenant(mondayStr, avenatH, year) {
    const yr=year||this.getYear();
    const data=this.getAvenants(yr);
    if(avenatH===null||avenatH===undefined||avenatH<=0) {
      delete data[mondayStr];
    } else {
      // Art. L3123-22 : max 8 avenants par an et par salarié (hors remplacement)
      const alreadyHas = !!data[mondayStr];
      const currentCount = Object.keys(data).length;
      if(!alreadyHas && currentCount >= 8) {
        if(typeof window!=='undefined' && window.M5_toast) {
          window.M5_toast("Limite légale atteinte : 8 avenants / an / salarié (Art. L3123-22)", 'error');
        }
        return false;
      }
      data[mondayStr]={ avenatH: Math.round(avenatH*100)/100, savedAt: new Date().toISOString() };
    }
    try { localStorage.setItem(K.AVENANT(yr), JSON.stringify(data)); } catch(_){}
    return true;
  },

  // Vérifie si la CCN du contrat autorise les compléments d'heures par avenant
  isAvenantAllowed() {
    const c = Contract.get();
    if(!c.idcc || c.idcc <= 0) return false; // Droit commun → accord de branche obligatoire
    if(typeof window==='undefined' || !window.CCN_PARTIEL_API) return false;
    try {
      const rules = window.CCN_PARTIEL_API.getRules(c.idcc);
      // Liste des groupes CCN ayant un accord de branche étendu prévoyant L3123-22
      // (seuls ceux-ci peuvent utiliser les avenants compléments d'heures)
      const groupesAvecAvenant = ['HCR','BOULAN329','COIF200','SECU329','PROP190','HOSPI130','ANIM70'];
      return groupesAvecAvenant.includes(rules.groupe);
    } catch(_) { return false; }
  },

  getAvenant(mondayStr, year) {
    const data=this.getAvenants(year||this.getYear());
    return data[mondayStr]||null;
  },

  // Compter les avenants de l'année (max 8 légalement)
  countAvenants(year) {
    return Object.keys(this.getAvenants(year||this.getYear())).length;
  },

  // ── Congés / vacances M5 (indépendant de M4) ─────────────────────
  getVacances(year) {
    try { return JSON.parse(localStorage.getItem(K.VACANCES(year||this.getYear()))||'{}'); } catch(_){ return {}; }
  },

  saveVacances(data, year) {
    try { localStorage.setItem(K.VACANCES(year||this.getYear()), JSON.stringify(data)); } catch(_){}
  },

  isVacWeek(mondayStr, year) {
    const yr=year||this.getYear();
    const vac=this.getVacances(yr);
    const today=localDK(new Date());
    for(let d=0;d<7;d++){
      const dt=new Date(mondayStr+'T12:00:00'); dt.setDate(dt.getDate()+d);
      const dk=localDK(dt);
      if(dk>today) continue;
      if(vac[dk]) return true;
    }
    return false;
  },

  addVacWeek(mondayStr, year) {
    const yr=year||this.getYear();
    const vac=this.getVacances(yr);
    // Supprimer les saisies heures de la semaine si elles existent
    const data=this.getAll(yr);
    let changed=false;
    for(let d=0;d<7;d++){
      const dt=new Date(mondayStr+'T12:00:00'); dt.setDate(dt.getDate()+d);
      const dk=localDK(dt);
      vac[dk]=true;
      if(data[dk]){delete data[dk];changed=true;}
    }
    if(data[mondayStr]&&data[mondayStr].type==='week'){delete data[mondayStr];changed=true;}
    if(changed) _save(K.DATA(yr),data);
    this.saveVacances(vac,yr);
  },

  removeVacWeek(mondayStr, year) {
    const yr=year||this.getYear();
    const vac=this.getVacances(yr);
    for(let d=0;d<7;d++){
      const dt=new Date(mondayStr+'T12:00:00'); dt.setDate(dt.getDate()+d);
      delete vac[localDK(dt)];
    }
    this.saveVacances(vac,yr);
  },

  getVacWeeksSorted(year) {
    const yr=year||this.getYear();
    const vac=this.getVacances(yr);
    const mondays=new Set();
    Object.keys(vac).forEach(dk=>{ if(vac[dk]) mondays.add(mondayOf(dk)); });
    return [...mondays].sort();
  },
};

function getCurrentMonday() {
  const sd = Contract.get().weekStartDay || 0;
  return weekStartOf(localDK(new Date()), sd);
}
function formatMonday(mondayStr) {
  // Début = mondayStr, fin = début + 6 jours (toujours 7 jours)
  const sd = Contract.get().weekStartDay || 0; // 0=Lun, 1=Mar, ...
  const JOURS_ABR = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
  const d  = new Date(mondayStr+'T12:00:00');
  const fn = new Date(mondayStr+'T12:00:00');
  fn.setDate(fn.getDate()+6);
  // Noms du premier et dernier jour
  const nomDebut = JOURS_ABR[sd];                    // ex: "Mar"
  const nomFin   = JOURS_ABR[(sd+6)%7];              // ex: "Lun"
  const mn    = d.toLocaleDateString('fr-FR',{month:'long'});
  const mnFin = fn.toLocaleDateString('fr-FR',{month:'long'});
  // Si même mois : "Mar 24 → Lun 30 mars 2026"
  if(mn===mnFin) return `${nomDebut} ${d.getDate()} → ${nomFin} ${fn.getDate()} ${mn} ${fn.getFullYear()}`;
  // Mois différents : "Mar 31 mars → Lun 6 avr. 2026"
  const mnFinCourt = fn.toLocaleDateString('fr-FR',{month:'short'}).replace('.','');
  return `${nomDebut} ${d.getDate()} ${mn.slice(0,3)} → ${nomFin} ${fn.getDate()} ${mnFinCourt} ${fn.getFullYear()}`;
}
function getExistingYears() {
  const years=new Set();
  try{ for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('M5_DATA_')){const y=k.replace('M5_DATA_','');if(/^\d{4}$/.test(y))years.add(y);}} }catch(_){}
  if(!years.size) years.add(String(new Date().getFullYear()));
  return [...years].sort();
}

const JOURS_COURTS=['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
const JOURS_LONGS=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];

global.M5_Contract=Contract;
global.M5_DataStore=DataStore;
global.M5_getCurrentMonday=getCurrentMonday;
global.M5_formatMonday=formatMonday;
global.M5_getExistingYears=getExistingYears;
global.M5_localDK=localDK;
global.M5_mondayOf=mondayOf;
global.M5_weekStartOf=weekStartOf;
global.M5_JOURS_COURTS=JOURS_COURTS;
global.M5_JOURS_LONGS=JOURS_LONGS;

}(typeof window!=='undefined'?window:global));
