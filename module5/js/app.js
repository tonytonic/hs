/**
 * APP.JS — Orchestrateur M5 Temps Partiel
 * Calendrier semaine + popup saisie journalière + saisie hebdo
 */
(function() {
'use strict';

let currentSection  = 'accueil';
let currentAnalysis = null;
// 26/09/2026 : à chaque ouverture, année et semaine d'aujourd'hui (avant : l'année consultée
// la dernière fois restait active alors que le calendrier montrait la semaine du jour —
// une saisie partait dans la mauvaise année)
try{ M5_DataStore.setYear(String(new Date().getFullYear())); }catch(_){}
let calendarMonday  = M5_getCurrentMonday(); // semaine affichée dans le calendrier

// ── Toast ─────────────────────────────────────────────────────────
function toast(msg, type='info', duration=2800) {
  const c=document.getElementById('m5-toast-container'); if(!c) return;
  const t=document.createElement('div'); t.className='m5-toast '+type; t.textContent=msg;
  c.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('show')));
  setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),300);},duration);
}

// ── Navigation ────────────────────────────────────────────────────
function showSection(id) {
  document.querySelectorAll('.m5-section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.m5-bottom-btn').forEach(b=>b.classList.remove('active'));
  const sec=document.getElementById('sec-'+id); if(sec) sec.classList.add('active');
  const btn=document.getElementById('nav-'+id);  if(btn) btn.classList.add('active');
  currentSection=id;
  if(id==='historique') renderHistorique();
  if(id==='stats')      renderStats();
  if(id==='glossaire')  renderGlossaire();
  if(id==='stats') {
    const a=currentAnalysis||runAnalysis();
    if(a) renderWellbeing(a);
  }
}

function openModal(id)  { const m=document.getElementById(id); if(m) m.classList.add('open'); }
function closeModal(id) { const m=document.getElementById(id); if(m) m.classList.remove('open'); }

// ── Analyse ───────────────────────────────────────────────────────
function runAnalysis() {
  const contract=M5_Contract.get(); if(!contract.hoursBase) return null;
  const year=M5_DataStore.getYear();
  const monday=calendarMonday;
  const wk=M5_DataStore.getWeekTotal(monday,year);
  const isVac=M5_DataStore.isVacWeek(monday,year);
  const av=M5_DataStore.getAvenant(monday,year);

  // Jours fériés
  const feriesMap=typeof M5_getFeriesYear!=='undefined'?M5_getFeriesYear(parseInt(year)):null;

  let weekResult=null;
  if(wk.total!==null&&!isVac) {
    if(av && av.avenatH > contract.hoursBase) {
      weekResult=CalcEngine.calcAvenant(contract.hoursBase,av.avenatH,wk.total,contract.hourlyRate||0);
    } else {
      weekResult=CalcEngine.calcWeek(
        contract.hoursBase, wk.total, contract, contract.hourlyRate||0,
        { feriesMap, neutraliseFeries: contract.neutraliseFeries===true || contract.neutraliseFeries===undefined, mondayStr:monday, joursOuvresContrat: contract.joursOuvresContrat||5, workedDaysMap:_workedDaysMap(monday,year) }
      );
    }
  }

  const allWeeks=M5_DataStore.getWeeksSorted(year);
  const last12=M5_DataStore.getLast12Weeks(year);
  // 04/10/2026 : règle des 12 semaines (L3123-13) non applicable aux employés de maison (L7221-2)
  const rule12=contract.sansMajoration?{triggered:false,maxConsec:0}:CalcEngine.check12WeeksRule(last12,contract.hoursBase);
  const stats=M5_DataStore.getAnnualStats(year,contract.hoursBase,contract);

  // Mode ANNUEL
  let annuelResult=null;
  if(contract.modeCalcul==='ANNUEL') {
    // Exercice à cheval sur deux années civiles : semaines des deux côtés (26/09/2026)
    annuelResult=CalcEngine.calcAnnuel(contract.hoursBase,contract.exerciceStart||'01/01',M5_DataStore.getWeeksAround(year));
  }
  // Mode MENSUEL
  let mensuelResult=null;
  if(contract.modeCalcul==='MENSUEL') {
    // Trouver la période courante depuis buildPeriodes (respecte clôtures + n-1)
    const periodesMensuel=buildPeriodes(year, contract);
    let pCourante=null;
    // 1. Période contenant calendarMonday (vue calendrier)
    for(const p of periodesMensuel) {
      if(calendarMonday>=p.debutStr && calendarMonday<=p.finStr){ pCourante=p; break; }
    }
    // 2. Sinon : période contenant aujourd'hui
    if(!pCourante) {
      const todayStr=M5_localDK(new Date());
      for(const p of periodesMensuel) {
        if(todayStr>=p.debutStr && todayStr<=p.finStr){ pCourante=p; break; }
      }
    }
    // 3. Sinon : fallback mois calendaire
    if(!pCourante) {
      const now=new Date();
      const lastDay=new Date(now.getFullYear(),now.getMonth()+1,0);
      pCourante={
        debutStr:`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-01`,
        finStr:`${lastDay.getFullYear()}-${String(lastDay.getMonth()+1).padStart(2,'0')}-${String(lastDay.getDate()).padStart(2,'0')}`
      };
    }
    // Inclure toute semaine qui chevauche la période (lundi<=fin ET fin_semaine>=debut)
    // Période à cheval sur deux années (ex. 29/12 → 25/01) : semaines des deux côtés (26/09/2026)
    const weeksMois=M5_DataStore.getWeeksAround(year).filter(w=>{
      const wEnd=new Date(w.monday+'T12:00:00'); wEnd.setDate(wEnd.getDate()+6);
      const wEndStr=wEnd.getFullYear()+'-'+String(wEnd.getMonth()+1).padStart(2,'0')+'-'+String(wEnd.getDate()).padStart(2,'0');
      return w.monday<=pCourante.finStr && wEndStr>=pCourante.debutStr;
    });
    // Nombre de jours réels dans la période pour proratiser le seuil
    const debutDate=new Date(pCourante.debutStr+'T12:00:00');
    const finDate=new Date(pCourante.finStr+'T12:00:00');
    const nbJoursPeriode=Math.round((finDate-debutDate)/86400000)+1;
    mensuelResult=CalcEngine.calcMonth(contract.hoursBase,weeksMois,contract,contract.hourlyRate||0,nbJoursPeriode);
  }

  // Score bien-être (Higgins, Karasek, Sonnentag, Voydanoff)
  // ── MULTI-ANNÉE : la fatigue biologique traverse les changements d'exercice ──
  // Sonnentag 2003 / Kivimäki 2015 : la charge se cumule sur plusieurs semaines
  // successives, sans remise à zéro au 1er janvier.
  // On utilise getWeeksMultiYear() qui puise dans les 3 dernières années.
  let wellbeing=null;
  if(typeof M5_Wellbeing!=='undefined') {
    const weeksWellbeing=typeof M5_DataStore.getWeeksMultiYear==='function'
      ? M5_DataStore.getWeeksMultiYear(year, 16)   // 16 sem max = ~4 mois de mémoire bio
      : (() => {
          // Fallback si méthode absente : année en cours uniquement
          const todayStr=M5_localDK(new Date());
          return allWeeks.filter(w=>w.monday<=todayStr).slice(-12);
        })();
    /* 26/09/2026 : plusieurs contrats → santé calculée sur le cumul de toutes les heures
       de la semaine, tous employeurs confondus (heures prévues et plafonds additionnés,
       repos = congé sur tous les contrats). Même résultat quel que soit le contrat affiché. */
    let wbWeeks=weeksWellbeing, wbContract=contract, cumul=null;
    try{
      if(window.M5_Contrats&&M5_Contrats.existing().length>1){
        const cc=M5_Contrats.contratCumul(), y0=parseInt(year,10), ans=[String(y0-2),String(y0-1),String(y0),String(y0+1)];
        const sd=contract.weekStartDay||0, todayStr=M5_localDK(new Date());
        let all=M5_Contrats.semainesCumul(ans,sd).filter(w=>w.monday<=todayStr);
        // Fenêtre où tous les contrats sont suivis (sinon un contrat pas encore saisi fausse la charge)
        const ex=M5_Contrats.existing(), premiers=ex.map(n=>{const w=all.find(x=>x.parContrat[n]>0);return w?w.monday:null;});
        /* 27/09/2026 : dernières semaines pas encore saisies pour tous les contrats (ex. seul le
           ménage saisi cette semaine) → écartées, au lieu de compter comme des semaines légères
           (elles faussaient stabilité, récupération et variations soudaines). */
        try{const vac={};ex.forEach(n=>{vac[n]=M5_Contrats.congesContrat(n,ans,sd);});
          while(all.length>2){const w=all[all.length-1];if(ex.every(n=>w.parContrat[n]>0||vac[n][w.monday]))break;all.pop();}}catch(e){}
        if(cc&&premiers.every(Boolean)){
          const depuis=premiers.sort().pop(), fen=all.filter(w=>w.monday>=depuis);
          if(fen.length>=2) all=fen;
          const conges=M5_Contrats.congesCommuns(ans,sd);
          wbWeeks=all.slice(-16); wbContract=Object.assign({},cc,{_vacLundis:conges});
          // Repères légaux, tous employeurs : 48 h sur une semaine (L3121-20),
          // 44 h en moyenne sur 12 semaines consécutives (L3121-22)
          // 04/10/2026 : heures des contrats IDCC 3239 hors repères du Code (L7221-2)
          const c39=ex.filter(n=>M5_Contrats.est3239&&M5_Contrats.est3239(n));
          const legal=w=>Math.round((w.worked-c39.reduce((a,n)=>a+(w.parContrat[n]||0),0))*100)/100;
          const d12=all.slice(-12), moy12=d12.length?d12.reduce((a,w)=>a+legal(w),0)/d12.length:0;
          const codeOk=c39.length<ex.length;
          cumul={n:ex.length, base:cc.hoursBase, sem48:codeOk?all.slice(-12).map(w=>({monday:w.monday,worked:legal(w)})).filter(w=>w.worked>48):[], moy12:codeOk?Math.round(moy12*100)/100:0, nb12:codeOk?d12.length:0, hors3239:c39.length};
        }
      }
    }catch(e){}
    if(wbWeeks.length>=2) {
      wellbeing=M5_Wellbeing.compute(wbWeeks, wbContract.hoursBase, wbContract);
      if(wellbeing&&cumul) wellbeing.cumul=cumul;
    }
  }

  currentAnalysis={weekResult,rule12,isVacWeek:isVac,annualStats:stats,contract,
    weeks:last12,weekMode:wk.mode,feriesMap,annuelResult,mensuelResult,wellbeing,dailyFlags:_dailyFlags(monday,year)};
  return currentAnalysis;
}

// ── Refresh UI ────────────────────────────────────────────────────
// Jours réellement travaillés d'une semaine (dk → heures) — sert à ne pas
// neutraliser un férié qui a été travaillé.
function _workedDaysMap(monday, year){
  var map={}; try{
    var wd=M5_DataStore.getWeekDays(monday, year);
    (wd||[]).forEach(function(d){ if(d && d.dk && d.worked!=null && d.worked>0) map[d.dk]=d.worked; });
  }catch(e){}
  return map;
}
window.M5_workedDaysMap=_workedDaysMap;

// Calcule le résultat hebdo pour un lundi donné (utilisé par Mizuki en vue mois)
function _weekResultFor(monday){
  try{
    const contract=M5_Contract.get(); if(!contract.hoursBase) return null;
    const year=M5_DataStore.getYear();
    const wk=M5_DataStore.getWeekTotal(monday,year);
    const isVac=M5_DataStore.isVacWeek(monday,year);
    const av=M5_DataStore.getAvenant(monday,year);
    if(wk.total===null||isVac) return null;
    const feriesMap=typeof M5_getFeriesYear!=='undefined'?M5_getFeriesYear(parseInt(year)):null;
    if(av && av.avenatH > contract.hoursBase){
      return CalcEngine.calcAvenant(contract.hoursBase,av.avenatH,wk.total,contract.hourlyRate||0);
    }
    return CalcEngine.calcWeek(contract.hoursBase, wk.total, contract, contract.hourlyRate||0,
      { feriesMap, neutraliseFeries: contract.neutraliseFeries===true || contract.neutraliseFeries===undefined, mondayStr:monday, joursOuvresContrat: contract.joursOuvresContrat||5, workedDaysMap:_workedDaysMap(monday,year) });
  }catch(e){ return null; }
}
/* 04/10/2026 : contrat chez un particulier employeur (IDCC 3239) : pas de repère 10 h/jour
   du Code (L7221-2) dans les calendriers. */
window.M5_est3239=function(){try{const c=M5_Contract.get();return !!(c&&(c.sansMajoration||parseInt(c.idcc,10)===3239));}catch(e){return false;}};
// Analyse par JOUR d'une semaine : repère les journées > 10h (Art. L3121-18)
function _dailyFlags(monday, year){
  var out={max:0, count:0, days:[]};
  if(window.M5_est3239&&window.M5_est3239()) return out; // 04/10/2026 : IDCC 3239, pas de repère 10 h/jour (L7221-2)
  try{
    var wd=M5_DataStore.getWeekDays(monday, year); var arr=(wd&&wd.length)?wd:[];
    for(var i=0;i<arr.length;i++){
      var h=(arr[i] && arr[i].worked!=null)?arr[i].worked:0;
      if(h>out.max) out.max=h;
      if(h>10){ out.count++; out.days.push(arr[i].dk); }
    }
  }catch(e){}
  return out;
}
// Libellé de la semaine EN COURS (celle que Mizuki analyse toujours)
function _currentWeekLabel(){
  try{
    var mon=M5_getCurrentMonday();
    var d=new Date(mon+'T12:00:00'), e=new Date(d.getTime()); e.setDate(e.getDate()+6);
    var M=['jan','fév','mar','avr','mai','jun','jul','aoû','sep','oct','nov','déc'];
    var s=d.getDate()+(d.getMonth()!==e.getMonth()?' '+M[d.getMonth()]:'');
    return 'Semaine du '+s+' → '+e.getDate()+' '+M[e.getMonth()];
  }catch(err){ return ''; }
}
// Mizuki parle TOUJOURS de la semaine EN COURS (aujourd'hui), quelle que soit
// la vue (semaine/mois) ou la navigation dans le calendrier.
function _analysisForMizuki(analysis){
  try{
    const tMon=M5_getCurrentMonday(), year=M5_DataStore.getYear();
    return Object.assign({},analysis,{ weekResult:_weekResultFor(tMon), isVacWeek:M5_DataStore.isVacWeek(tMon,year), dailyFlags:_dailyFlags(tMon,year) });
  }catch(e){}
  return analysis;
}

function refreshUI() {
  const contract=M5_Contract.get();
  const noContract=document.getElementById('view-no-contract');
  const main=document.getElementById('view-main');
  if(!contract.hoursBase) {
    if(noContract) noContract.style.display='block';
    if(main)       main.style.display='none';
    return;
  }
  if(noContract) noContract.style.display='none';
  if(main)       main.style.display='block';
  // Badge header
  const badge=document.getElementById('header-contract-badge');
  if(badge && contract.hoursBase) {
    const _dc=contract.dureeContrat, _uc={M:'mois',A:'an'}[_dc&&_dc.unite];
    badge.textContent=(_uc&&_dc.valeur>0)?(String(_dc.valeur).replace('.',',')+'h/'+_uc):(contract.hoursBase+'h/sem');
    badge.className='m5-contract-badge ok';
    badge.style.display='inline-flex';
  }
  updateYearBadge();
  const analysis=runAnalysis();
  if(!analysis) return;
  // Bulle Mizuki — wellbeing en priorité si signal fort
  let bubbleText=Mizuki.getBubbleText(_analysisForMizuki(analysis));
  if(analysis.wellbeing&&analysis.wellbeing.available&&analysis.wellbeing.niveau==='critique') {
    const name=(localStorage.getItem('M5_USER_NAME')||localStorage.getItem('SH_PRENOM')||'');
    bubbleText=M5_Wellbeing.getMizukiText(analysis.wellbeing,name)||bubbleText;
  }
  const bubbleEl=document.getElementById('mizuki-bubble-text');
  if(bubbleEl){
    bubbleEl.innerHTML='';
    var _wl=_currentWeekLabel();
    if(_wl){ var _dl=document.createElement('span'); _dl.style.cssText='display:block;font-size:11px;font-weight:700;color:#C4A8FF;opacity:0.9;margin-bottom:3px;'; _dl.textContent='📅 '+_wl; bubbleEl.appendChild(_dl); }
    var _tx=document.createElement('span'); _tx.textContent=bubbleText; bubbleEl.appendChild(_tx);
  }
  if(window._m5IsMonthView&&window._m5IsMonthView()){ if(window.renderMonthCalendar) window.renderMonthCalendar(); } else { renderCalendar(); }
  if(window._m5SyncCalViewSelect) window._m5SyncCalViewSelect();
  renderPeriodeNav();
  renderWeekSummary(analysis);
  renderQuickStats(analysis);
  try{ if(window.M5_renderOverview) window.M5_renderOverview(); }catch(e){}
}

// ── CALENDRIER SEMAINE ────────────────────────────────────────────
function renderCalendar() {
  try {
  const contract=M5_Contract.get();
  const year=M5_DataStore.getYear();
  const days=M5_DataStore.getWeekDays(calendarMonday,year);
  const wk=M5_DataStore.getWeekTotal(calendarMonday,year);
  const today=M5_localDK(new Date());
  const label=M5_formatMonday(calendarMonday);
  const isVac=M5_DataStore.isVacWeek(calendarMonday,year);

  // ── Saisie rapide : boutons heures prédéfinies ─────────────────
  const quickEl=document.getElementById('acc-quick-btns');
  if(quickEl&&contract.hoursBase) {
    try {
      const base=contract.hoursBase;
      const currentTotal=wk&&wk.total!==null&&wk.total!==undefined?wk.total:null;
      const presets=[
        {h:base,lbl:`${window._m5fmtH(base)} ✓`},
        {h:base+1,lbl:`${base+1}h`},
        {h:base+2,lbl:`${base+2}h`},
        {h:base+3,lbl:`${base+3}h`},
        {h:base+5,lbl:`${base+5}h`},
      ].filter(p=>p.h<35);
      quickEl.innerHTML=presets.map(p=>`
        <button class="acc-quick-btn ${currentTotal===p.h?'active':''}" onclick="quickSave(${p.h})">
          ${p.lbl}
        </button>`).join('')+
        `<button class="acc-quick-btn acc-quick-custom" onclick="openWeeklySaisie()" title="Saisir un autre total">✏️</button>`;
    } catch(e){ quickEl.innerHTML=''; }
  }

  const el=document.getElementById('calendar-grid'); if(!el) return;
  document.getElementById('cal-week-label').textContent=label;

  // Badge semaines sauvegardées
  const totalSaved=M5_DataStore.getWeeksSorted(year).length;
  // Badge semaines sauvegardées — élément déjà dans le DOM
  const badge=document.getElementById('cal-saved-badge');
  if(badge) badge.textContent=totalSaved>0?`${totalSaved} sem. sauvegardée${totalSaved>1?'s':''}`:''

  // Noms des jours dans l'ordre de la semaine configurée
  const sd=M5_Contract.get().weekStartDay||0;
  const JOURS_SEMAINE=M5_JOURS_COURTS.slice(sd).concat(M5_JOURS_COURTS.slice(0,sd));

  // Mode hebdo = une seule case "total semaine"
  if(days.mode==='week') {
    const isVacH=M5_DataStore.isVacWeek(calendarMonday,year);
    const _wkLocked=(window.M5_isDayLocked&&window.M5_isDayLocked(calendarMonday));
    el.innerHTML=`
      <div class="m5-cal-weekly-badge">Mode hebdomadaire${_wkLocked?' · 🔒 verrouillé':''}</div>
      <div class="m5-cal-week-total-cell${_wkLocked?' m5-locked':''}" onclick="openWeeklySaisie()">
        <div class="m5-cal-week-total-val">${window._m5fmtH(wk.total)}</div>
        <div class="m5-cal-week-total-sub">${_wkLocked?'période verrouillée 🔒':'total semaine — tap pour modifier'}</div>
      </div>
      <div style="display:flex;gap:8px;margin-top:10px;">
        <button class="m5-btn m5-btn-outline m5-btn-sm" style="flex:1" onclick="openWeeklySaisie()">📊 Total semaine</button>
        <button class="m5-btn m5-btn-sm ${isVacH?'m5-btn-primary':'m5-btn-outline'}" onclick="toggleVacSemaine()">🌴 ${isVacH?'Congés ✓':'Congés'}</button>
      </div>
      ${_congesTousBtn()}
      <div style="text-align:center;margin-top:8px;">
        <button onclick="switchToDayMode('${calendarMonday}')" style="background:none;border:none;font-size:11px;color:rgba(196,168,255,0.60);cursor:pointer;text-decoration:underline;">
          Passer en saisie journalière →
        </button>
      </div>`;
    return;
  }

  // Mode journalier
  // ── Calculer les périodes UNE SEULE FOIS hors boucle ──────────
  let _periodesCache=[];
  try {
    if(!_currentPeriode && typeof buildPeriodes==='function') {
      _periodesCache=buildPeriodes(year,contract)||[];
    }
  } catch(_e){ _periodesCache=[]; }

  let html='<div class="m5-cal-grid">';
  days.forEach(d=>{
    const dt=new Date(d.dk+'T12:00:00');
    const dayNum=dt.getDate();
    const dow=d.dow;
    const realDow=d.realDow!==undefined?d.realDow:dow;
    const isToday=d.dk===today;
    const isFuture=d.isFuture;
    const isWeekend=realDow>=5; // Sam=5, Dim=6 en Mon=0
    const _feriesMap=currentAnalysis&&currentAnalysis.feriesMap;
    const isFerie=!!(  _feriesMap&&_feriesMap[d.dk]&&!isWeekend);
    const worked=d.worked;
    const contract_daily=contract.hoursBase / Math.max(1, Math.min(7, contract.joursOuvresContrat || 5));
    // Coloration : si une période est sélectionnée, colorier ses jours
    let cellClass='m5-cal-day';
    if(_currentPeriode) {
      const inPeriode=d.dk>=_currentPeriode.debutStr && d.dk<=_currentPeriode.finStr;
      cellClass+= inPeriode?' m5-cal-period-active':' m5-cal-period-out';
    } else {
      // Séparation par période de paie — cache calculé hors boucle
      let _pIdx=-1;
      for(let _pi=0;_pi<_periodesCache.length;_pi++){
        if(d.dk>=_periodesCache[_pi].debutStr && d.dk<=_periodesCache[_pi].finStr){ _pIdx=_pi; break; }
      }
      if(_pIdx>=0) {
        cellClass+=' m5-cal-month-'+(_pIdx%2===0?'a':'b');
        if(d.dk===_periodesCache[_pIdx].debutStr) cellClass+=' m5-cal-period-start';
      } else {
        const _mIdx=new Date(d.dk+'T12:00:00').getMonth();
        cellClass+=' m5-cal-month-'+(_mIdx%2===0?'a':'b');
      }
    }
    let hoursHtml='<span class="m5-cal-day-empty">—</span>';
    if(isFerie&&!isVac) {
      cellClass+=' ferie';
      hoursHtml=worked!==null?`<span class="m5-cal-day-hours">${window._m5fmtH(worked)}</span><span class="m5-cal-day-ferie">🎌</span>`:'<span class="m5-cal-day-ferie">🎌</span>';
    }
    if(isVac) {
      cellClass+=' vac';
      hoursHtml='<span class="m5-cal-day-vac">🌴</span>';
    } else if(isFuture) {
      cellClass+=' future';
    } else if(isWeekend && worked===null) {
      cellClass+=' weekend';
    } else if(worked!==null) {
      const diff=worked-contract_daily;
      cellClass+= diff>0?' over': diff<-0.5?' under':' normal';
      const _o10=worked>10&&!window.M5_est3239();
      if(_o10) cellClass+=' m5-day-over10';
      hoursHtml=`<span class="m5-cal-day-hours">${window._m5fmtH(worked)}</span>`;
      if(_o10) hoursHtml+='<span class="m5-cal-day-warn" title="Plus de 10h — Art. L3121-18">⚠️</span>';
      if(diff>0) hoursHtml+=`<span class="m5-cal-day-diff">+${window._m5fmtH(diff)}</span>`;
    }

    if(isToday) cellClass+=' today';
    const _dayLocked=(window.M5_isDayLocked&&window.M5_isDayLocked(d.dk));
    if(_dayLocked) cellClass+=' m5-locked';

    const clickable=!isVac; // futur cliquable (anticipation)
    html+=`<div class="${cellClass}" ${clickable?`onclick="openDaySaisie('${d.dk}','${JOURS_SEMAINE[dow]}')"`:''}>`
      +`<div class="m5-cal-day-name">${JOURS_SEMAINE[dow]}</div>`
      +`<div class="m5-cal-day-num">${dayNum}</div>`
      +`${_dayLocked?'<span class="m5-cal-day-lock">🔒</span>':hoursHtml}`
      +`</div>`;
  });
  html+='</div>';

  // Total semaine
  const total=wk.total;
  if(total!==null) {
    const diff=total-contract.hoursBase;
    const pct35=Math.round(total/(contract.tempsPlein||35)*100);
    html+=`<div class="m5-cal-total">
      <span>Total semaine</span>
      <span style="font-weight:700;color:${diff>0?'var(--miz-warning)':'var(--miz-success)'}">
        ${window._m5fmtH(total)} ${diff>0?'(+'+window._m5fmtH(diff)+(contract.sansMajoration?' en plus du contrat)':' comp.)'):''}
      </span>
      <span style="font-size:11px;color:var(--miz-text3)">${pct35}% du temps plein</span>
    </div>`;
  } else if(!isVac) {
    html+=`<div class="m5-cal-total-empty">Saisir les jours pour voir le total</div>`;
  }

  // Boutons bas calendrier
  const isVacNow=M5_DataStore.isVacWeek(calendarMonday,year);
  html+=`<div style="display:flex;gap:8px;margin-top:10px;">
    <button class="m5-btn m5-btn-outline m5-btn-sm" style="flex:1" onclick="openWeeklySaisie()">📊 Total semaine</button>
    <button class="m5-btn m5-btn-sm ${isVacNow?'m5-btn-primary':'m5-btn-outline'}" onclick="toggleVacSemaine()" title="${isVacNow?'Retirer les congés':'Marquer en congés'}">
      🌴 ${isVacNow?'Congés ✓':'Congés'}
    </button>
  </div>`;
  html+=_congesTousBtn();

  el.innerHTML=html;
  } catch(renderErr) {
    console.error('renderCalendar crash:', renderErr);
    const elErr=document.getElementById('calendar-grid');
    if(elErr) elErr.innerHTML='<div class="m5-cal-total-empty" style="color:rgba(255,255,255,0.6);">Rafraîchissement en cours… tap sur Auj.</div>';
  }
}

// ── Navigation semaines ───────────────────────────────────────────
function calChangeYear(newYear) {
  // Changer l'année active et aller au début de l'année sélectionnée
  M5_DataStore.setYear(newYear);
  // Aller à la semaine courante de cette année (ou la 1ère semaine avec données)
  const weeks=M5_DataStore.getWeeksSorted(newYear);
  if(weeks.length) {
    calendarMonday=weeks[weeks.length-1].monday; // dernière semaine saisie
  } else {
    // Aller au 1er janvier de cette année
    calendarMonday=M5_getCurrentMonday();
    // Si l'année est différente, aller au début
    if(newYear!==String(new Date().getFullYear())) {
      const jan1=newYear+'-01-01';
      calendarMonday=M5_weekStartOf(jan1, M5_Contract.get().weekStartDay||0);
    }
  }
  Mizuki.clearCache();
  refreshUI();
}

function calPrev() {
  if(window._m5IsMonthView&&window._m5IsMonthView()){ window.M5monthPrev&&window.M5monthPrev(); return; }
  const d=new Date(calendarMonday+'T12:00:00');
  d.setDate(d.getDate()-7);
  calendarMonday=M5_localDK(d);
  _m5SuivreExercice();
  // Différer refreshUI au prochain frame → INP nettement réduit (le tap répond instantanément)
  requestAnimationFrame(refreshUI);
}
/* 27/09/2026 : la semaine affichée sort de l'exercice → on passe dans l'exercice qui la contient,
   pour que la saisie soit rangée au bon endroit (avant : rangée dans l'exercice affiché). */
function _m5SuivreExercice(){try{
  const y=String(M5_DataStore.getYear()),b=window.M5_exoBornes&&M5_exoBornes(y);
  if(!b||(calendarMonday>=b.deb&&calendarMonday<=b.fin))return;
  const a=window.M5_exoDeDate&&M5_exoDeDate(calendarMonday);if(!a||a===y)return;
  M5_DataStore.setYear(a);if(window.Mizuki&&Mizuki.clearCache)Mizuki.clearCache();
  if(typeof updateYearBadge==='function')updateYearBadge();
  toast('📅 Exercice '+a,'info');
  if(window.M5_verifierExercice)setTimeout(window.M5_verifierExercice,60);
}catch(e){}}
function calNext() {
  if(window._m5IsMonthView&&window._m5IsMonthView()){ window.M5monthNext&&window.M5monthNext(); return; }
  const today=M5_getCurrentMonday();
  const d=new Date(calendarMonday+'T12:00:00');
  d.setDate(d.getDate()+7);
  const next=M5_localDK(d);
  // Anticipation autorisée : saisie en avance jusqu'à ~1 an
  const _max=new Date(); _max.setDate(_max.getDate()+371); const _maxDK=M5_localDK(_max);
  if(next>_maxDK) return;
  calendarMonday=next;
  _m5SuivreExercice();
  requestAnimationFrame(refreshUI);
}
function calToday() {
  if(window._m5IsMonthView&&window._m5IsMonthView()){ window.M5monthToday&&window.M5monthToday(); return; }
  calendarMonday=M5_getCurrentMonday();
  requestAnimationFrame(refreshUI);
}

// ── Popup saisie journalière ───────────────────────────────────────
function openDaySaisie(dateStr, jourLabel) {
  if(window.M5_isDayLocked&&window.M5_isDayLocked(dateStr)){ toast('Période verrouillée 🔒 — déverrouille-la pour modifier ce jour','info'); return; }
  const contract=M5_Contract.get();
  const year=M5_DataStore.getYear();
  const existing=M5_DataStore.getAll(year)[dateStr];

  // Avertir si saisie hebdo existante pour cette semaine
  const _mon=M5_mondayOf(dateStr);
  if(M5_DataStore.hasWeekTotal(dateStr, year)) {
    const monday=_mon;
    const label=M5_formatMonday(monday);
    if(!confirm(`⚠️ Une saisie hebdomadaire de ${M5_DataStore.getWeekTotal(monday,year).total}h existe pour cette semaine (${label}).

Passer en mode journalier va la remplacer. Continuer ?`)) return;
  }

  document.getElementById('day-saisie-title').textContent=`${jourLabel} ${dateStr.slice(8)}/${dateStr.slice(5,7)}`;
  document.getElementById('day-saisie-date').value=dateStr;

  const inp=document.getElementById('day-saisie-hoursH');
  window._decToHM(existing?existing.worked:0,'day-saisie-hoursH','day-saisie-hoursM');

  // Propositions rapides basées sur le contrat
  // Utilise joursOuvresContrat (défini par l'utilisatrice) au lieu de 5 en dur
  const nbJours = Math.max(1, Math.min(7, contract.joursOuvresContrat || 5));
  const base = contract.hoursBase / nbJours; // base journalière selon vrai pattern
  const proposals=[];
  // Range adaptatif : si base < 4h, propose des paliers plus serrés
  const steps = base < 4
    ? [0, base-0.5, base, base+0.25, base+0.5, base+0.75, base+1, base+1.5, base+2, base+3]
    : [0, base-1, base-0.5, base, base+0.25, base+0.5, base+0.75, base+1, base+1.5, base+2, base+3];
  steps.forEach(h=>{
    if(h>=0&&h<=12) proposals.push(Math.round(h*4)/4); // pas de 15 min
  });
  const unique=[...new Set(proposals)].sort((a,b)=>a-b);

  let quickHtml='';
  unique.forEach(h=>{
    const isSelected=existing&&existing.worked===h;
    var _lbl=(window._m5fmtH?window._m5fmtH(h):h+'h');
    quickHtml+=`<button class="m5-quick-btn ${isSelected?'selected':''}" data-val="${h}" onclick="selectQuickHour(${h})">${_lbl}</button>`;
  });

  document.getElementById('day-quick-hours').innerHTML=quickHtml;
  // Préférence « je note seulement mes heures en plus » : mémorisée d'une saisie à l'autre
  var _hcc=document.getElementById('day-hc-only');
  var _hcPref=false; try{ _hcPref=localStorage.getItem('M5_DAY_HC_ONLY')==='1'; }catch(e){}
  if(_hcc) _hcc.checked=_hcPref;
  if(_hcPref && window.M5dayHCtoggle) window.M5dayHCtoggle(); // rebâtit les boutons + vide le champ (mode « en plus »)
  updateDayPreview();
  openModal('modal-day-saisie');
  setTimeout(()=>inp.focus(),200);
}

function selectQuickHour(h) {
  window._decToHM(h,'day-saisie-hoursH','day-saisie-hoursM');
  document.querySelectorAll('.m5-quick-btn').forEach(b=>{
    b.classList.toggle('selected', parseFloat(b.getAttribute('data-val'))===h);
  });
  updateDayPreview();
}

function updateDayPreview() {
  const contract=M5_Contract.get();
  const worked=window._hmToDec('day-saisie-hoursH','day-saisie-hoursM');
  const prev=document.getElementById('day-saisie-preview');
  if(!prev||!contract.hoursBase) return;
  const _nb=Math.max(1,Math.min(7,contract.joursOuvresContrat||5));
  const base=Math.round((contract.hoursBase/_nb)*100)/100;
  const _hc=document.getElementById('day-hc-only')&&document.getElementById('day-hc-only').checked;
  if(_hc){ const _t=Math.round((base+worked)*100)/100; prev.innerHTML='<span style="color:var(--miz-warning);font-size:13px;">+'+window._m5fmtH(worked)+' en plus → journée de <b>'+window._m5fmtH(_t)+'</b> (base '+window._m5fmtH(base)+')</span>'; return; }
  const diff=worked-base;
  prev.innerHTML=diff>0.09
    ?`<span style="color:var(--miz-warning);font-size:13px;">+${window._m5fmtH(diff)} au-delà de ta base journalière (${window._m5fmtH(base)})</span>`
    :diff<-0.1
      ?`<span style="color:var(--miz-text3);font-size:13px;">${window._m5fmtH(diff)} — en dessous de la base journalière</span>`
      :`<span style="color:var(--miz-success);font-size:13px;">✓ Dans ta base journalière</span>`;
}

window.M5dayHCtoggle=function(){
  var hc=document.getElementById('day-hc-only')&&document.getElementById('day-hc-only').checked;
  try{ localStorage.setItem('M5_DAY_HC_ONLY', hc?'1':'0'); }catch(e){}
  var c=M5_Contract.get(), nb=Math.max(1,Math.min(7,c.joursOuvresContrat||5)), base=c.hoursBase/nb;
  var steps= hc ? [0,0.25,0.5,0.75,1,1.5,2,3,4]
    : (base<4?[0,base-0.5,base,base+0.25,base+0.5,base+0.75,base+1,base+1.5,base+2,base+3]
             :[0,base-1,base-0.5,base,base+0.25,base+0.5,base+0.75,base+1,base+1.5,base+2,base+3]);
  var props=[]; steps.forEach(function(h){ if(h>=0&&h<=12) props.push(Math.round(h*4)/4); });
  var html=''; [...new Set(props)].sort(function(a,b){return a-b;}).forEach(function(h){ html+='<button class="m5-quick-btn" data-val="'+h+'" onclick="selectQuickHour('+h+')">'+(window._m5fmtH?window._m5fmtH(h):h+'h')+'</button>'; });
  var el=document.getElementById('day-quick-hours'); if(el) el.innerHTML=html;
  var _ih=document.getElementById('day-saisie-hoursH'),_im=document.getElementById('day-saisie-hoursM'); if(_ih)_ih.value=''; if(_im)_im.value='';
  updateDayPreview();
};
function saveDaySaisie() {
  const dateStr=document.getElementById('day-saisie-date').value;
  let worked=window._hmVal('day-saisie-hoursH','day-saisie-hoursM');
  if(!dateStr||isNaN(worked)||worked<0||worked>24) {
    toast('Saisis un nombre d\'heures valide (0-24).','error'); return;
  }
  const year=M5_DataStore.getYear();
  const _hcOnly=document.getElementById('day-hc-only')&&document.getElementById('day-hc-only').checked;
  if(_hcOnly){ const _c=M5_Contract.get(); const _nb=Math.max(1,Math.min(7,_c.joursOuvresContrat||5)); worked=Math.round(((_c.hoursBase/_nb)+worked)*100)/100; }
  // 0h = effacer ce jour (uniquement en mode total)
  if(!_hcOnly && worked===0) {
    M5_DataStore.deleteDay(dateStr,year);
    Mizuki.clearCache();
    closeModal('modal-day-saisie');
    toast('Journée effacée','info');
    refreshUI();
    return;
  }
  M5_DataStore.saveDay(dateStr,worked,year);
  Mizuki.clearCache();
  closeModal('modal-day-saisie');
  toast('Journée enregistrée ✓','success');
  refreshUI();
  if(currentSection==='stats') renderStats();
}

function deleteDaySaisie() {
  const dateStr=document.getElementById('day-saisie-date').value;
  if(!dateStr) return;
  if(!confirm('Supprimer la saisie de ce jour ? Cette action est irréversible.')) return;
  M5_DataStore.deleteDay(dateStr,M5_DataStore.getYear());
  Mizuki.clearCache();
  closeModal('modal-day-saisie');
  toast('Journée supprimée','info');
  refreshUI();
}

// ── Popup saisie hebdomadaire ─────────────────────────────────────
function openWeeklySaisie() {
  if(window.M5_isDayLocked&&window.M5_isDayLocked(calendarMonday)){ toast('Période verrouillée 🔒 — déverrouille-la pour modifier cette semaine','info'); return; }
  const contract=M5_Contract.get();
  const year=M5_DataStore.getYear();
  const wk=M5_DataStore.getWeekTotal(calendarMonday,year);
  const av=M5_DataStore.getAvenant(calendarMonday,year);
  const label=M5_formatMonday(calendarMonday);

  document.getElementById('week-saisie-title').textContent=label;
  document.getElementById('week-saisie-monday').value=calendarMonday;

  window._decToHM(wk.total!==null?wk.total:contract.hoursBase,'week-saisie-hoursH','week-saisie-hoursM');

  // Avenant — affichage selon CCN (L3123-22) OU si un avenant existe déjà sauvegardé
  // (on ne peut pas masquer une coche déjà cochée et sauvegardée par l'utilisateur)
  const avenantBloc=document.getElementById('week-avenant-bloc');
  const avenantAllowed = typeof M5_DataStore.isAvenantAllowed==='function' && M5_DataStore.isAvenantAllowed();
  // Toujours afficher le bloc si : CCN autorise OU si un avenant existe déjà pour cette semaine
  const showAvenantBloc = avenantAllowed || (av && av.avenatH > 0);
  if(avenantBloc) avenantBloc.style.display = showAvenantBloc ? 'block' : 'none';

  const toggleAv=document.getElementById('week-avenant-toggle');
  const avSection=document.getElementById('week-avenant-section');
  const avInp=document.getElementById('week-avenant-hours');
  if(av && av.avenatH > 0 && showAvenantBloc) {
    // Avenant existant → restaurer la coche et la valeur
    if(toggleAv) { toggleAv.checked=true; }
    if(avSection) avSection.style.display='block';
    if(avInp) avInp.value=av.avenatH;
  } else {
    if(toggleAv) toggleAv.checked=false;
    if(avSection) avSection.style.display='none';
    if(avInp) avInp.value='';
  }

  // Compteur avenants
  const count=M5_DataStore.countAvenants(year);
  const counterEl=document.getElementById('avenant-counter');
  if(counterEl) counterEl.textContent=`${count}/8 avenants utilisés cette année (Art. L3123-22)`;

  // Propositions rapides semaine
  const base=contract.hoursBase;
  const props=[base-2,base-1,base,base+1,base+2,base+3,base+5,base+8].filter(h=>h>0&&h<35);
  let quickHtml='';
  [...new Set(props)].forEach(h=>{
    quickHtml+=`<button class="m5-quick-btn" onclick="selectWeekQuick(${h})">${h}h</button>`;
  });
  document.getElementById('week-quick-hours').innerHTML=quickHtml;
  openModal('modal-week-saisie');
  // Différer updateWeekPreview au frame suivant (modal déjà visible)
  // → évite le freeze Android sans bloquer l'input (readonly trop agressif sur iOS)
  requestAnimationFrame(updateWeekPreview);
}

function toggleAvenat() {
  const on=document.getElementById('week-avenant-toggle').checked;
  document.getElementById('week-avenant-section').style.display=on?'block':'none';
  updateWeekPreview();
}

function selectWeekQuick(h) {
  window._decToHM(h,'week-saisie-hoursH','week-saisie-hoursM');
  document.querySelectorAll('#week-quick-hours .m5-quick-btn').forEach(b=>{
    b.classList.toggle('selected',parseFloat(b.textContent)===h);
  });
  updateWeekPreview();
}

function updateWeekPreview() {
  const contract=M5_Contract.get();
  const worked=window._hmToDec('week-saisie-hoursH','week-saisie-hoursM');
  const prev=document.getElementById('week-saisie-preview');
  if(!prev||!contract.hoursBase) return;

  const useAvenant=document.getElementById('week-avenant-toggle')?.checked;
  const avenatH=parseFloat(document.getElementById('week-avenant-hours')?.value)||0;
  const pct35=Math.round(worked/(contract.tempsPlein||35)*100);

  let result, html='';

  if(useAvenant && avenatH>contract.hoursBase) {
    result=CalcEngine.calcAvenant(contract.hoursBase,avenatH,worked,contract.hourlyRate||0);
    if(result) {
      html+=`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px;">
        <span class="m5-preview-tag">${result.avenatPaidH>0?window._m5fmtH(result.avenatPaidH)+' avenant (taux normal)':'✓ Dans le contrat'}</span>
        ${result.compH25>0?`<span class="m5-preview-tag warn">+${window._m5fmtH(result.compH25)} à +25%</span>`:''}
        <span class="m5-preview-tag ${pct35>=95?'danger':''}">${pct35}% temps plein</span>
      </div>`;
      if(result.avenatPaidH>0&&!result.compH25) {
        html+=`<div class="m5-alert ok" style="font-size:12px;padding:6px 10px;margin-bottom:4px;"><span>📋</span> Heures dans l'avenant — taux normal, pas de majoration.</div>`;
      }
      result.alerts.forEach(a=>{
        html+=`<div class="m5-alert ${a.level}" style="font-size:12px;padding:6px 10px;margin-bottom:4px;"><span>${a.level==='critique'?'🚨':'ℹ️'}</span> ${a.msg}</div>`;
      });
      if(result.totalCompH>0&&contract.hourlyRate>0){const _c=result.comp1Amount+result.comp2Amount;html+=`<div class="m5-alert info" style="font-size:12px;padding:6px 10px;"><span>💰</span> Estimation semaine : <strong>${_c.toFixed(2)} € brut</strong> de majoration (sur ${window._m5fmtH(result.totalCompH)} comp. cette semaine).</div>`;}
    }
  } else {
    const _pfm=(typeof M5_getFeriesYear!=='undefined')?M5_getFeriesYear(parseInt(calendarMonday.slice(0,4))):null;
    result=CalcEngine.calcWeek(contract.hoursBase,worked,contract,contract.hourlyRate||0,
      { feriesMap:_pfm, neutraliseFeries: contract.neutraliseFeries===true||contract.neutraliseFeries===undefined, mondayStr:calendarMonday, joursOuvresContrat:contract.joursOuvresContrat||5, workedDaysMap:_workedDaysMap(calendarMonday,M5_DataStore.getYear()) });
    html+=`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px;">
      <span class="m5-preview-tag ${result.totalCompH>0?'warn':'ok'}">${result.totalCompH>0?'+'+window._m5fmtH(result.totalCompH)+' comp.':'✓ Dans le contrat'}</span>
      <span class="m5-preview-tag ${pct35>=95?'danger':''}">${pct35}% du temps plein</span>
    </div>`;
    result.alerts.forEach(a=>{
      html+=`<div class="m5-alert ${a.level}" style="font-size:12px;padding:6px 10px;margin-bottom:4px;"><span>${a.level==='critique'?'🚨':'⚠️'}</span> ${a.msg}</div>`;
    });
    if(result.totalCompH>0&&contract.hourlyRate>0){const _c=result.comp1Amount+result.comp2Amount;html+=`<div class="m5-alert info" style="font-size:12px;padding:6px 10px;"><span>💰</span> Estimation semaine : <strong>${_c.toFixed(2)} € brut</strong> de majoration (sur ${window._m5fmtH(result.totalCompH)} comp. cette semaine).</div>`;}
  }
  prev.innerHTML=html;
}

function saveWeeklySaisie() {
  const monday=document.getElementById('week-saisie-monday').value;
  const worked=window._hmVal('week-saisie-hoursH','week-saisie-hoursM');
  const _maxSem=(M5_Contract.get().tempsPlein>35)?60:35; // 03/10/2026 : IDCC 3239, heures au-delà de 35 h possibles
  if(!monday||isNaN(worked)||worked<0||worked>=_maxSem) {
    toast('Saisis un total entre 0 et '+(_maxSem-0.5).toString().replace('.',',')+'h.','error'); return;
  }
  const year=M5_DataStore.getYear();
  M5_DataStore.saveWeekTotal(monday,worked,year);
  // Sauvegarder l'avenant si activé
  const useAv=document.getElementById('week-avenant-toggle')?.checked;
  const avH=parseFloat(document.getElementById('week-avenant-hours')?.value)||0;
  M5_DataStore.saveAvenant(monday, useAv&&avH>0?avH:null, year);
  Mizuki.clearCache();
  closeModal('modal-week-saisie');
  toast('Semaine enregistrée ✓','success');
  // Différer le refresh lourd : laisse la modal se fermer + 60fps avant le re-render
  // → élimine le "freeze" ressenti après save total semaine
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      refreshUI();
      if(currentSection==='stats') renderStats();
    });
  });
}

function deleteWeeklySaisie() {
  const monday=document.getElementById('week-saisie-monday').value;
  if(!monday) return;
  if(!confirm('Supprimer cette semaine complète ? Cette action est irréversible.')) return;
  M5_DataStore.deleteWeek(monday,M5_DataStore.getYear());
  Mizuki.clearCache();
  closeModal('modal-week-saisie');
  toast('Semaine supprimée','info');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => refreshUI());
  });
}

// ── Résumé semaine sous le calendrier ────────────────────────────
// ── Prévenance auto : vérifie si la semaine affichée est dans les jours de préavis ──
function checkPrevenanceAuto(mondayStr, contract) {
  const today=M5_localDK(new Date());
  const monday=new Date(mondayStr+'T12:00:00');
  const todayDate=new Date(today+'T12:00:00');
  const diffDays=Math.round((monday-todayDate)/86400000);
  // Si on est déjà dans la semaine ou que c'est la semaine passée → pas d'alerte prévenance
  if(diffDays<=0) return null;
  // Calculer les jours ouvrés entre aujourd'hui et le lundi
  let joursOuvres=0;
  const d=new Date(todayDate);
  while(d<monday) {
    d.setDate(d.getDate()+1);
    const dow=d.getDay();
    if(dow!==0&&dow!==6) joursOuvres++; // pas sam/dim
  }
  // noticeDays calculé dans Contract.get() : 7 par défaut (L3123-31), 3 si accord (L3123-24)
  const prevenanceRequise=contract.noticeDays||7;
  const articleRef = contract.accordCollectifPrevenance ? 'L3123-24' : 'L3123-31';
  if(joursOuvres<prevenanceRequise) {
    return { joursOuvres, prevenanceRequise, articleRef };
  }
  return null;
}

function renderWeekSummary(analysis) {
  const {weekResult,isVacWeek,contract,weekMode}=analysis;
  const el=document.getElementById('week-summary'); if(!el) return;
  if(isVacWeek) { el.innerHTML=`<div class="m5-alert ok"><span>🌴</span><div>Semaine de congés — bon repos !</div></div>`; return; }
  let html='';

  // ── Alerte prévenance automatique ──────────────────────────────
  const prevenanceAlert=checkPrevenanceAuto(calendarMonday, contract);
  if(prevenanceAlert) {
    html+=`<div class="m5-alert alerte" style="margin-bottom:6px;">
      <span>⏰</span>
      <div>
        <strong>Délai de prévenance insuffisant</strong> — seulement <strong>${prevenanceAlert.joursOuvres} jour(s) ouvré(s)</strong> avant cette semaine (minimum requis : ${prevenanceAlert.prevenanceRequise} jours, Art. ${prevenanceAlert.articleRef}).<br>
        <span style="font-size:12px;">Si des HC t'ont été demandées pour cette semaine avec moins de 3 jours de préavis, tu peux les refuser sans faute (Art. L3123-10).</span>
      </div>
    </div>`;
  }

  if(!weekResult||weekResult.workedH<=0) { el.innerHTML=html||''; return; }
  // Note fériés
  if(weekResult.feriesNote) {
    html+=`<div class="m5-alert info" style="margin-bottom:6px;"><span>📅</span><div style="font-size:12px;">${weekResult.feriesNote}</div></div>`;
  }
  const alerts=weekResult.alerts||[];
  if(alerts.length) alerts.forEach(a=>{
    html+=`<div class="m5-alert ${a.level}"><span>${a.level==='critique'?'🚨':'⚠️'}</span><div>${a.msg}</div></div>`;
  });
  if(weekResult.totalCompH>0&&contract.hourlyRate>0&&!prevenanceAlert) {
    const _cw=(weekResult.comp1Amount||0)+(weekResult.comp2Amount||0);
    html+=`<div class="m5-alert info"><span>💰</span><div>${contract.sansMajoration?'Montant estimé de ces heures':'Majoration estimée cette semaine'} : <strong>${_cw.toFixed(2)} € brut</strong> (${window._m5fmtH(weekResult.totalCompH)} ${contract.sansMajoration?'en plus du contrat':'comp.'} × ${contract.sansMajoration?'taux normal, sans majoration (IDCC 3239)':'taux majoré'}). Estimation brute basée sur votre taux horaire contractuel.</div></div>`;
  }
  el.innerHTML=html;
  try{ window.M5_majDroitsCard && M5_majDroitsCard(contract); }catch(_){}
}

// ── Historique ────────────────────────────────────────────────────

// ── Stats rapides accueil ─────────────────────────────────────────
function renderQuickStats(analysis) {
  const el=document.getElementById('quick-stats');
  if(!el) return;
  const {annualStats,rule12,contract,annuelResult,mensuelResult,weeks}=analysis;
  const allWeeks=weeks||[];
  const mode=contract.modeCalcul||'HEBDO';
  const r12Cls=rule12.triggered?'danger':rule12.maxConsec>=8?'warn':'ok';
  let html='';

  // Titre dynamique selon le mode
  const titleEl=document.getElementById('quick-stats-title');
  if(titleEl) {
    titleEl.textContent = mode==='ANNUEL'?'📊 Compteur annuel' : mode==='MENSUEL'?'📊 Bilan mensuel' : '📊 Cette année';
  }

  if(mode==='ANNUEL'&&annuelResult) {
    const solde=annuelResult.solde;
    const cls=solde>1?'ok':solde<-2?'danger':'warn';
    html+=`<div class="m5-stat-grid" style="margin-bottom:10px;">
      <div class="m5-stat"><div class="m5-stat-val">${annuelResult.pctAvancement}%</div><div class="m5-stat-label">Exercice écoulé</div></div>
      <div class="m5-stat"><div class="m5-stat-val">${window._m5fmtH(annuelResult.reelCumule)}</div><div class="m5-stat-label">Heures réalisées</div></div>
      <div class="m5-stat"><div class="m5-stat-val ${cls}">${solde>=0?'+':''}${window._m5fmtH(solde)}</div><div class="m5-stat-label">Avance/Retard</div></div>
    </div>
    <div class="m5-alert ${solde>1?'ok':solde<-2?'warn':'info'}" style="margin-bottom:6px;">
      <span>${solde>1?'🚀':solde<-2?'⏳':'➡️'}</span>
      <div style="font-size:12px;">Objectif : <strong>${window._m5fmtH(annuelResult.objectifAnnuel)}/an</strong> — Théorique cumulé : ${window._m5fmtH(annuelResult.theoriqueCumule)}</div>
    </div>`;
    // Plafond HC annuel Art. L3123-28 = contractH × cap × 52
    const hcCapAnnuel=Math.round(contract.hoursBase*contract.cap*52*10)/10;
    const allWeeksForCap=M5_DataStore.getWeeksAround(M5_DataStore.getYear())||[];
    const weeksEx=allWeeksForCap.filter(w=>w.monday>=annuelResult.debutEx&&w.monday<=annuelResult.finEx);
    const totalHcAnnuel=Math.round(weeksEx.reduce((s,w)=>s+Math.max(0,(w.worked||0)-contract.hoursBase),0)*10)/10;
    const hcPct=hcCapAnnuel>0?Math.round(totalHcAnnuel/hcCapAnnuel*100):0;
    const hcCol=hcPct>=100?'var(--miz-danger)':hcPct>=80?'var(--miz-warning)':'var(--miz-primary)';
    html+=`<div style="margin-top:6px;padding:10px 12px;background:rgba(108,63,197,0.06);border:1px solid var(--miz-border);border-radius:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;margin-bottom:5px;">
        <span style="color:var(--miz-text2);">Plafond HC annuel</span>
        <span style="font-weight:700;color:${hcCol}">${window._m5fmtH(totalHcAnnuel)} / ${window._m5fmtH(hcCapAnnuel)} (${hcPct}%)</span>
      </div>
      <div style="height:6px;background:var(--miz-bg3);border-radius:3px;overflow:hidden;">
        <div style="height:100%;width:${Math.min(hcPct,100)}%;background:${hcCol};border-radius:3px;transition:width .4s;"></div>
      </div>
      <div style="font-size:10px;color:var(--miz-text3);margin-top:4px;">Art. L3123-28 — plafond ${Math.round(contract.cap*100)}% du contrat × 52 sem.</div>
      ${hcPct>=100?'<div style="font-size:11px;color:var(--miz-danger);margin-top:4px;font-weight:600;">⚠️ Plafond annuel dépassé — signale-le à ton employeur</div>':''}
    </div>`;
  } else if(mode==='MENSUEL'&&mensuelResult) {
    const delta=mensuelResult.delta;
    const deltaLabel=delta>0?`+${window._m5fmtH(delta)} HC`:delta===0?'✓ Équilibré':'Sous le seuil';
    const deltaCls=delta>0?'warn':'ok';
    // Barre de progression vers le seuil
    const pct=Math.min(100,Math.round(mensuelResult.totalWorked/mensuelResult.seuilMensuel*100));
    const reste=Math.max(0,Math.round((mensuelResult.seuilMensuel-mensuelResult.totalWorked)*10)/10);
    const barColor=pct>=100?'var(--miz-warning)':'var(--miz-primary)';
    html+=`<div class="m5-stat-grid" style="margin-bottom:10px;">
      <div class="m5-stat"><div class="m5-stat-val">${window._m5fmtH(mensuelResult.totalWorked)}</div><div class="m5-stat-label">Réalisées</div></div>
      <div class="m5-stat"><div class="m5-stat-val" style="color:var(--miz-text3);font-size:16px;">${window._m5fmtH(mensuelResult.seuilMensuel)}</div><div class="m5-stat-label">Seuil période</div></div>
      <div class="m5-stat"><div class="m5-stat-val ${mensuelResult.totalCompH>0?'warn':'ok'}">${window._m5fmtH(mensuelResult.totalCompH)}</div><div class="m5-stat-label">HC générées</div></div>
    </div>
    <div style="margin-bottom:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <span style="font-size:11px;color:var(--miz-text3);">Progression vers le seuil</span>
        <span style="font-size:11px;font-weight:700;color:${barColor};">${pct}%</span>
      </div>
      <div style="height:8px;background:var(--miz-bg2);border-radius:4px;overflow:hidden;">
        <div style="height:100%;width:${pct}%;background:${barColor};border-radius:4px;transition:width .3s;"></div>
      </div>
      <div style="font-size:11px;color:var(--miz-text3);margin-top:4px;text-align:right;">
        ${pct<100?`Il reste <strong>${window._m5fmtH(reste)}</strong> pour atteindre le seuil`:'<span style="color:var(--miz-warning)">⚠️ Seuil dépassé — heures comp. en cours</span>'}
      </div>
    </div>`;
    if(mensuelResult.alerts&&mensuelResult.alerts.length) {
      mensuelResult.alerts.forEach(a=>{
        const cls=a.level==='critique'?'critique':a.level==='alerte'?'alerte':'warn';
        html+=`<div class="m5-alert ${cls}" style="margin-top:6px;font-size:12px;"><span>${a.level==='critique'?'⚖️':'⚠️'}</span><div>${a.msg}</div></div>`;
      });
    }
  } else if(annualStats) {
    // Semaines avec au moins 1h de HC (toutes les semaines en dépassement)
    const weeksWithHC=annualStats.weeksWithComp||0;
    html+=`<div class="m5-stat-grid">
      <div class="m5-stat"><div class="m5-stat-val">${annualStats.totalWeeks}</div><div class="m5-stat-label">Semaines saisies</div></div>
      <div class="m5-stat"><div class="m5-stat-val ${weeksWithHC>0?'warn':'ok'}">${weeksWithHC}</div><div class="m5-stat-label">Sem. avec HC</div></div>
      ${contract.sansMajoration?'<div class="m5-stat"><div class="m5-stat-val ok" title="Règle des 12 semaines (L3123-13) non applicable aux employés de maison (L7221-2)">—</div><div class="m5-stat-label">Règle 12 sem. : sans objet</div></div>':`<div class="m5-stat"><div class="m5-stat-val ${r12Cls}" title="Semaines consécutives avec +2h ou plus (Art. L3123-13)">${rule12.maxConsec}</div><div class="m5-stat-label">Consécutives +2h</div></div>`}
    </div>
    ${weeksWithHC>0&&!contract.sansMajoration&&rule12.maxConsec<weeksWithHC?`<div style="font-size:11px;color:var(--miz-text3);padding:4px 2px;">
      ℹ️ ${weeksWithHC} sem. avec des HC — mais la règle des 12 sem. ne s'applique que si tu dépasses de <strong>+2h ou plus</strong> chaque semaine (Art. L3123-13).
    </div>`:''}`;
  } else {
    html='<div style="font-size:13px;color:var(--miz-text3);text-align:center;padding:8px;">Saisis des semaines pour voir les statistiques.</div>';
  }

  if(rule12.msg) {
    html+=`<div class="m5-alert ${rule12.triggered?'critique':'warn'}" style="margin-top:8px;"><span>${rule12.triggered?'⚖️':'👀'}</span><div style="font-size:12px;">${rule12.msg}</div></div>`;
    if(rule12.triggered) {
      html+=`<div class="m5-alert info" style="margin-top:6px;font-size:12px;">
        <span>📋</span><div><strong>Art. L3123-13</strong> — Tu peux demander par écrit à ton employeur la modification de ton contrat à la hausse (préavis 7 jours, sauf opposition de ta part). Garde ce relevé comme preuve.</div>
      </div>`;
    }
  }

  if(window._m5PeriodeSoldeBlock){ try{ html += window._m5PeriodeSoldeBlock(analysis); }catch(e){} }
  if(window._m5SoldeHCBlock){ try{ html += window._m5SoldeHCBlock(analysis); }catch(e){} }
  el.innerHTML=html;
}


// ── Bien-être M5 ─────────────────────────────────────────────────
function renderWellbeing(analysis) {
  const el=document.getElementById('wellbeing-content'); if(!el) return;
  const wb=analysis&&analysis.wellbeing;

  if(!wb||!wb.available) {
    el.innerHTML=`<div class="m5-empty">
      <div class="m5-empty-icon">🧬</div>
      <div class="m5-empty-text">${wb?wb.reason:'Saisis au moins 2 semaines pour voir ton analyse bien-être.'}</div>
    </div>`;
    return;
  }

  // Bannière données limitées — affichée seulement si pas de badge multi-année
  let html='';
  // Plusieurs contrats (26/09/2026) : cumul et repères légaux tous employeurs
  if(wb.cumul){
    const cu=wb.cumul, f=window._m5fmtH;
    html+=`<div style="background:rgba(108,63,197,0.08);border:1px solid rgba(108,63,197,0.25);border-radius:8px;padding:8px 12px;font-size:11.5px;color:#6c3fc5;margin-bottom:10px;">
      <strong>Cumul de tes ${cu.n} contrats · ${f(cu.base)} prévues par semaine</strong><br>
      Ta santé dépend de toutes tes heures, tous employeurs confondus. Les heures complémentaires restent calculées contrat par contrat.${cu.hors3239?' Les repères 48 h et 44 h du Code ne comptent pas les heures chez un particulier employeur (IDCC 3239, art. L7221-2).':''}</div>`;
    if(cu.sem48.length){
      html+=`<div style="background:#fdecea;border:1.5px solid #e57373;border-radius:8px;padding:8px 12px;font-size:11.5px;color:#b71c1c;margin-bottom:10px;">
        <strong>⚠️ Plus de 48 h sur ${cu.sem48.length>1?cu.sem48.length+' semaines':'une semaine'}</strong> (${cu.sem48.map(w=>f(w.worked)).join(', ')}), tous contrats réunis.
        La durée maximale est de 48 h par semaine, tous employeurs confondus (art. L3121-20) : préviens tes employeurs.</div>`;
    }
    if(cu.nb12>=12&&cu.moy12>44){
      html+=`<div style="background:#fdecea;border:1.5px solid #e57373;border-radius:8px;padding:8px 12px;font-size:11.5px;color:#b71c1c;margin-bottom:10px;">
        <strong>⚠️ ${f(cu.moy12)} par semaine en moyenne sur 12 semaines</strong>, tous contrats réunis. La moyenne ne doit pas dépasser 44 h sur 12 semaines consécutives (art. L3121-22).</div>`;
    }
  }
  if(wb.donneesLimitees && wb.noteMin && !wb.isMultiYear) {
    html+=`<div style="background:#fff3e0;border:2px solid #ff9800;border-radius:10px;padding:10px 12px;font-size:12px;color:#e65100;margin-bottom:12px;display:flex;gap:8px;align-items:flex-start;">
      <span style="font-size:16px;">📊</span>
      <div><strong>Analyse en cours de construction</strong><br>${wb.noteMin}<br>
      <span style="font-size:11px;opacity:0.8;">Les scores avec peu de semaines sont provisoires — ils s'améliorent au fil des semaines saisies.</span></div>
    </div>`;
  }

  // ⚠️ Bannière semaine en cours exclue (si elle a des HC significatifs)
  // → l'utilisateur comprend pourquoi le score ne reflète pas encore cette semaine
  if(wb.currentWeekExcluded && wb.currentWeekH > 0) {
    const contract = analysis && analysis.contract;
    const contractH = wb.cumul ? wb.cumul.base : (contract ? contract.hoursBase : 0);
    const hasHC = contractH > 0 && wb.currentWeekH > contractH;
    const diffH = contractH > 0 ? (wb.currentWeekH - contractH).toFixed(1) : 0;
    // Calculer combien de jours jusqu'à dimanche
    const todayDow = new Date().getDay(); // 0=dim, 1=lun ... 6=sam
    const daysLeft = todayDow === 0 ? 0 : 7 - todayDow;
    const joursRestants = daysLeft === 1 ? 'demain (samedi)' : daysLeft === 0 ? 'ce soir' : `dans ${daysLeft} jours (dimanche)`;
    html+=`<div style="background:rgba(245,158,11,0.08);border:1.5px solid rgba(245,158,11,0.40);border-radius:8px;padding:8px 12px;font-size:11px;color:#92400e;margin-bottom:10px;display:flex;gap:8px;align-items:flex-start;">
      <span style="font-size:14px;">⏳</span>
      <div>
        <strong>Semaine en cours : ${window._m5fmtH(wb.currentWeekH)}${hasHC ? ` (+${window._m5fmtH(diffH)} ${wb.cumul?'au-delà de tes contrats':'HC'})` : ''}</strong><br>
        ${hasHC
          ? `Ces ${window._m5fmtH(diffH)} ${wb.cumul?'au-delà de tes contrats':'d\'heures complémentaires'} seront intégrées au score bio <strong>${joursRestants}</strong> quand la semaine sera complète.`
          : `La semaine en cours est exclue des calculs jusqu'à dimanche — seules les semaines complètes alimentent l'analyse.`
        }
      </div>
    </div>`;
  }

  // Si score global disponible, afficher une aide à la lecture
  if(!wb.donneesLimitees) {
    html+=`<div style="font-size:11px;color:var(--miz-text3);padding:4px 2px 8px;text-align:center;">
      Basé sur ${wb.stats.n} semaines de données
    </div>`;
  }

  // Badge multi-année — affiché si les données traversent un changement d'exercice
  if(wb.isMultiYear && wb.yearsSpanned && wb.yearsSpanned.length > 1) {
    html+=`<div style="background:rgba(108,63,197,0.08);border:1px solid rgba(108,63,197,0.25);border-radius:8px;padding:8px 12px;font-size:11px;color:#6c3fc5;margin-bottom:10px;display:flex;gap:8px;align-items:flex-start;">
      <span style="font-size:14px;">🧬</span>
      <div><strong>Mémoire biologique multi-année active</strong><br>
      Données de ${wb.yearsSpanned.join(' + ')} — le changement d'exercice ne remet pas le corps à zéro.
      La fatigue et la récupération sont continues (Sonnentag 2003, Kivimäki 2015).
      </div>
    </div>`;
  }

  // Note si données limitées mais issues d'une année précédente (début d'exercice)
  if(!wb.isMultiYear && wb.noteMin) {
    html+=`<div style="background:#fff3e0;border:2px solid #ff9800;border-radius:10px;padding:10px 12px;font-size:12px;color:#e65100;margin-bottom:12px;display:flex;gap:8px;align-items:flex-start;">
      <span style="font-size:16px;">📊</span>
      <div><strong>Analyse en cours de construction</strong><br>${wb.noteMin}<br>
      <span style="font-size:11px;opacity:0.8;">Les scores avec peu de semaines sont provisoires — les données des semaines précédentes alimentent déjà l'analyse.</span></div>
    </div>`;
  }

  // Barre score global
  // Couleur globale : jamais rouge vif — orange foncé au minimum
  const col=wb.niveau==='bon'?'#4caf50':wb.niveau==='moyen'?'#ff9800':'#f57c00';
  const scoreAffiche = wb.donneesLimitees ? wb.scoreGlobalFiable : wb.scoreGlobal;
  // Label global humain
  const niveauLabel = wb.niveau==='bon'?'Bon équilibre':wb.niveau==='moyen'?'Quelques signaux':wb.niveau==='tendu'?'Rythme chargé':'Rythme chargé';
  html+=`
    <div style="text-align:center;padding:12px 0 8px;">
      <div style="font-size:42px;font-weight:900;color:${col};">${scoreAffiche}</div>
      <div style="font-size:13px;font-weight:600;color:${col};margin-bottom:2px;">${niveauLabel}</div>
      <div style="font-size:11px;color:var(--miz-text3);">${wb.donneesLimitees?`Provisoire — ${wb.nbSemaines} sem. saisies`:`Basé sur ${wb.nbSemaines} semaines`}</div>
      <div style="font-size:20px;margin-top:6px;">${wb.emoji}</div>
    </div>

    <!-- Barres 4 composantes -->
    <div style="display:flex;flex-direction:column;gap:8px;margin:12px 0;">`;

  // Labels humains pour chaque score selon sa valeur — jamais "0/100" seul
  const scoreLabel = (s) => {
    if(s.limited) return { txt:'En attente', color:'var(--miz-text3)', italic:true };
    if(s.val >= 80) return { txt:'Très bien',   color:'#4caf50' };
    if(s.val >= 60) return { txt:'Correct',      color:'#7cb342' };
    if(s.val >= 40) return { txt:'À surveiller', color:'#ff9800' };
    if(s.val >= 20) return { txt:'Fragile',      color:'#f57c00' };
    // val < 20 — label contextuel selon l'indicateur
    const contexte = {
      'Stabilité':     'Heures très variables',
      'Intensité':     'Charge élevée',
      'Récupération':  'Aucune semaine légère',
      'Choix':         'Plafond souvent atteint',
      'Prévisibilité': 'Variations soudaines',
      'Santé mentale': 'Signal à long terme',
    };
    return { txt: contexte[s.nom] || 'Signal détecté', color:'#f57c00' };
  };

  // Couleur de barre : uniquement orange/vert, jamais rouge pour un indicateur seul
  const barColor = (s) => {
    if(s.limited) return 'var(--miz-border2)';
    if(s.val >= 60) return '#4caf50';
    if(s.val >= 30) return '#ff9800';
    return '#f57c00'; // orange foncé — pas rouge
  };

  wb.scores.forEach(s=>{
    const lbl = scoreLabel(s);
    const bCol = barColor(s);
    const barW = s.limited ? 50 : Math.max(s.val, 3); // min 3% pour que la barre soit visible
    html+=`<div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;margin-bottom:4px;">
        <span style="font-weight:600;color:var(--miz-text);">${s.nom}</span>
        <span style="display:flex;gap:6px;align-items:center;">
          <span style="font-size:11px;font-weight:600;color:${lbl.color};${lbl.italic?'font-style:italic;':''}">${lbl.txt}</span>
          <span style="font-size:10px;color:var(--miz-text3);">${s.ref}</span>
        </span>
      </div>
      <div style="height:6px;background:var(--miz-border);border-radius:4px;overflow:hidden;">
        <div style="height:100%;width:${barW}%;background:${bCol};border-radius:4px;transition:width .4s;${s.limited?'opacity:0.35;':''}"></div>
      </div>
    </div>`;
  });

  html+=`</div>
    <!-- Messages -->
    <div style="display:flex;flex-direction:column;gap:8px;margin-top:4px;">`;

  wb.messages.forEach(m=>{
    const icon={ ok:'✅', info:'ℹ️', warn:'⚠️', alerte:'🔴', critique:'🔴' }[m.type]||'•';
    const bg={ ok:'var(--miz-bg2)', info:'var(--miz-accent)', warn:'#fff3e0', alerte:'#fce4ec', critique:'#ffebee' }[m.type]||'var(--miz-bg2)';
    html+=`<div style="background:${bg};border-radius:8px;padding:8px 10px;font-size:12px;line-height:1.5;display:flex;gap:8px;align-items:flex-start;">
      <span>${icon}</span>
      <div>${m.ref?`<span style="font-size:10px;color:var(--miz-text3);font-weight:600;">${m.ref}</span><br>`:''}${m.text}</div>
    </div>`;
  });

  html+=`</div>
    <div style="font-size:10px;color:var(--miz-text3);text-align:center;margin-top:12px;padding-top:8px;border-top:1px solid var(--miz-border);">
      Higgins 2010 · Karasek 1979 · Sonnentag 2003 · Voydanoff 2005 · Janssen 2004 · Bambra 2008
    </div>`;

  el.innerHTML=html;
}


// ── Navigation période page principale ───────────────────────────
// Génère les périodes selon les clôtures configurées
function buildPeriodes(year, contract) {
  // Exercices précédents (24/09/2026) : pour une année passée, reprendre les
  // clôtures de l'exercice de cette année-là, pas celles du contrat actuel.
  if(window.M5_contratPourAnnee) contract=window.M5_contratPourAnnee(year, contract);
  const periodes=[];
  const clotures=contract.cloturesDates||{};
  const hasClotures=Object.keys(clotures).length>0;

  if(hasClotures) {
    // Périodes basées sur les dates de clôture réelles
    // On reconstruit les périodes : debut = clôture_mois_precedent + 1 jour, fin = clôture_mois
    const sortedMonths=Object.keys(clotures).map(Number).sort((a,b)=>a-b);
    const MOIS=['jan','fév','mar','avr','mai','jun','jul','aoû','sep','oct','nov','déc'];

    // Calculer le debut réel de la 1ère période depuis exerciceStart (peut être en n-1)
    let firstDebut=null;
    const exStart=contract.exerciceStart||'';
    if(exStart) {
      if(exStart.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // Format ISO stocké par input type="date" — contient déjà l'année
        firstDebut=new Date(exStart+'T12:00:00');
      } else if(exStart.includes('/')) {
        // Ancien format "DD/MM" — reconstituer avec l'année n-1
        const parts=exStart.split('/');
        const dd=parseInt(parts[0]||'1'), mm=parseInt(parts[1]||'1');
        const prevYear=parseInt(year)-1;
        firstDebut=new Date(prevYear, mm-1, dd);
      }
    }

    let prevEnd=null;
    sortedMonths.forEach((m,idx)=>{
      const finStr=clotures[m];
      const fin=new Date(finStr+'T12:00:00');
      let debut;
      if(prevEnd) {
        debut=new Date(prevEnd+'T12:00:00'); debut.setDate(debut.getDate()+1);
      } else if(firstDebut) {
        // 1ère période : débute à exerciceStart en n-1
        debut=firstDebut;
      } else {
        // Fallback intelligent : 1er jour du mois PRÉCÉDANT la première clôture
        // Ex : clôture Jan 31 → début Dec 1 (n-1) ; clôture Mar 31 → début Fév 1
        const mPrec = fin.getMonth() === 0 ? 11 : fin.getMonth() - 1;
        const yrPrec = fin.getMonth() === 0 ? fin.getFullYear() - 1 : fin.getFullYear();
        debut = new Date(yrPrec, mPrec, 1);
      }
      const debutStr=debut.getFullYear()+'-'+String(debut.getMonth()+1).padStart(2,'0')+'-'+String(debut.getDate()).padStart(2,'0');
      // Afficher l'année si le début est en n-1
      const showYear=debut.getFullYear()!==parseInt(year);
      const labelDebut=`${debut.getDate()} ${MOIS[debut.getMonth()]}${showYear?' '+debut.getFullYear():''}`;
      const labelFin=`${fin.getDate()} ${MOIS[fin.getMonth()]}`;
      const label=`${labelDebut} → ${labelFin}`;
      periodes.push({ label, debutStr, finStr, mois:m });
      prevEnd=finStr;
    });
  } else {
    // Fin de mois automatique
    const MOIS_L=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    for(let m=1;m<=12;m++){
      const fin=new Date(parseInt(year),m,0); // dernier jour du mois
      const debut=new Date(parseInt(year),m-1,1);
      const dStr=debut.getFullYear()+'-'+String(debut.getMonth()+1).padStart(2,'0')+'-01';
      const fStr=fin.getFullYear()+'-'+String(fin.getMonth()+1).padStart(2,'0')+'-'+String(fin.getDate()).padStart(2,'0');
      periodes.push({ label:MOIS_L[m-1]+' '+year, debutStr:dStr, finStr:fStr, mois:m });
    }
  }
  // ── Snap début/fin au weekStartDay ──────────────────────────────
  // Si weekStartDay=0 (lundi), le début de chaque période doit être un lundi
  // et la fin un dimanche — pour coller avec les semaines de travail
  const sd = (contract.weekStartDay !== undefined ? contract.weekStartDay : 0);
  if(sd >= 0 && typeof M5_weekStartOf === 'function') {
    periodes.forEach(p => {
      // Début → snap vers le DÉBUT de la semaine qui contient cette date
      p.debutStr = M5_weekStartOf(p.debutStr, sd);
      // Fin → DERNIER jour de semaine ≤ clôture (ne dépasse jamais le mois)
      // Ex: clôture 30 avr (jeudi) → dimanche 26 avr, PAS le 3 mai
      const finSnap = new Date(M5_weekStartOf(p.finStr, sd)+'T12:00:00');
      finSnap.setDate(finSnap.getDate() + 6); // fin de la semaine contenant p.finStr
      const finSnapStr = finSnap.getFullYear()+'-'+String(finSnap.getMonth()+1).padStart(2,'0')+'-'+String(finSnap.getDate()).padStart(2,'0');
      if(finSnapStr > p.finStr) finSnap.setDate(finSnap.getDate()-7); // reculer si dépasse
      p.finStr = finSnap.getFullYear()+'-'+String(finSnap.getMonth()+1).padStart(2,'0')+'-'+String(finSnap.getDate()).padStart(2,'0');
      // Recalculer le label avec les dates snappées
      const MOIS_S=['jan','fév','mar','avr','mai','jun','jul','aoû','sep','oct','nov','déc'];
      const deb = new Date(p.debutStr+'T12:00:00');
      const fin = new Date(p.finStr+'T12:00:00');
      const showYear = deb.getFullYear() !== parseInt(year);
      const lDebut = `${deb.getDate()} ${MOIS_S[deb.getMonth()]}${showYear?' '+deb.getFullYear():''}`;
      const lFin   = `${fin.getDate()} ${MOIS_S[fin.getMonth()]}`;
      p.label = `${lDebut} → ${lFin}`;
    });
  }

  return periodes;
}

let _currentPeriode=null; // { debutStr, finStr }

function renderPeriodeNav() {
  const contract=M5_Contract.get(); if(!contract.hoursBase) return;
  const year=M5_DataStore.getYear();

  // Sélecteur année
  const yearSel=document.getElementById('periode-year-sel');
  if(yearSel) {
    const years=M5_getExistingYears();
    const cur=String(new Date().getFullYear());
    if(!years.includes(cur)) years.push(cur);
    years.sort();
    yearSel.innerHTML=years.map(y=>`<option value="${y}"${y===year?'selected':''}>${y}</option>`).join('');
    yearSel.value=year;
  }

  // Select des périodes
  const sel=document.getElementById('periode-select'); if(!sel) return;
  const periodes=buildPeriodes(year, contract);

  // Trouver la période active (celle qui contient calendarMonday)
  let activeIdx=-1;
  periodes.forEach((p,i)=>{
    if(calendarMonday>=p.debutStr && calendarMonday<=p.finStr) activeIdx=i;
  });

  // Auto-sélection : si aucune période trouvée, trouver celle qui contient aujourd'hui
  if(activeIdx===-1) {
    const todayStr=M5_localDK(new Date());
    periodes.forEach((p,i)=>{
      if(todayStr>=p.debutStr && todayStr<=p.finStr) activeIdx=i;
    });
    // Si trouvée, mettre à jour _currentPeriode et calendarMonday
    if(activeIdx>=0) {
      const pAuto=periodes[activeIdx];
      _currentPeriode={debutStr:pAuto.debutStr, finStr:pAuto.finStr};
    }
  }

  // Ajouter option semaines sauvegardées en mode HEBDO
  const mode=contract.modeCalcul||'HEBDO';
  let options='<option value="">— Aller à une période —</option>';

  if(mode==='HEBDO') {
    // Semaines avec données
    const allWeeks=M5_DataStore.getWeeksSorted(year);
    if(allWeeks.length) {
      options+='<optgroup label="Semaines sauvegardées">';
      allWeeks.slice().reverse().slice(0,12).forEach(w=>{
        const d=new Date(w.monday+'T12:00:00');
        const fn=new Date(w.monday+'T12:00:00'); fn.setDate(fn.getDate()+6);
        const MOIS=['jan','fév','mar','avr','mai','jun','jul','aoû','sep','oct','nov','déc'];
        const lbl=`${d.getDate()} ${MOIS[d.getMonth()]} → ${fn.getDate()} ${MOIS[fn.getMonth()]}${w.worked?` (${w.worked}h)`:''}`;
        options+=`<option value="week:${w.monday}">${lbl}</option>`;
      });
      options+='</optgroup>';
    }
    options+='<optgroup label="Mois">';
    periodes.forEach((p,i)=>{
      options+=`<option value="periode:${p.debutStr}:${p.finStr}">${p.label}</option>`;
    });
    options+='</optgroup>';
  } else {
    // Mode mensuel ou annuel — toutes les périodes
    periodes.forEach((p,i)=>{
      options+=`<option value="periode:${p.debutStr}:${p.finStr}">${p.label}</option>`;
    });
  }

  sel.innerHTML=options;
  // Reflète l'état de verrouillage de la période affichée sur le bouton cadenas
  var _lb=document.getElementById('periode-lock-btn');
  if(_lb){ var _lk=(window.M5_isActivePeriodeLocked&&window.M5_isActivePeriodeLocked()); _lb.textContent=_lk?'🔒':'🔓'; _lb.classList.toggle('locked',!!_lk); _lb.setAttribute('aria-pressed',_lk?'true':'false'); }
  // Pré-positionner APRÈS innerHTML — évite le blocage onchange au 1er clic
  if(activeIdx>=0) {
    const pActive=periodes[activeIdx];
    sel.value=`periode:${pActive.debutStr}:${pActive.finStr}`;
  }
}

function goToPeriode(val) {
  if(!val) return;
  const contract=M5_Contract.get();
  const sd=contract.weekStartDay||0;

  if(val.startsWith('week:')) {
    const monday=val.replace('week:','');
    calendarMonday=monday;
    _currentPeriode=null;
    // Sync année si besoin
    const yr=monday.slice(0,4);
    if(yr!==M5_DataStore.getYear()) M5_DataStore.setYear(yr);
    refreshUI();

  } else if(val.startsWith('periode:')) {
    // Format: "periode:YYYY-MM-DD:YYYY-MM-DD"
    const rest=val.slice('periode:'.length); // "2026-04-01:2026-04-30"
    // Les dates ISO sont de longueur fixe 10 chars
    const debutStr=rest.slice(0,10);
    const finStr=rest.slice(11,21);
    _currentPeriode={debutStr, finStr};
    // Aller à la semaine qui CONTIENT le premier jour de la période
    calendarMonday=M5_weekStartOf(debutStr, sd);
    // Sync année
    const yr=debutStr.slice(0,4);
    if(yr!==M5_DataStore.getYear()) M5_DataStore.setYear(yr);
    refreshUI();
  }
}

function goToMonth(year, month) {
  const d=new Date(year, month-1, 1);
  const target=M5_weekStartOf(
    d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'),
    M5_Contract.get().weekStartDay||0
  );
  calendarMonday=target;
  if(String(year)!==M5_DataStore.getYear()) {
    M5_DataStore.setYear(String(year));
  }
  // Mettre à jour la chip active immédiatement
  document.querySelectorAll('.m5-period-chip').forEach(b=>b.classList.remove('active'));
  const chips=document.querySelectorAll('#periode-chips .m5-period-chip');
  // index = month - 1 pour le mode mensuel
  if(chips[month-1]) chips[month-1].classList.add('active');
  refreshUI();
}

function renderHistorique() {
  const el=document.getElementById('historique-list');
  const contract=M5_Contract.get();
  if(!el) return;
  const year=M5_DataStore.getYear();
  // Fusionner semaines saisies + semaines vacances
  const weeks=M5_DataStore.getWeeksSorted(year);
  M5_DataStore.getVacWeeksSorted(year).forEach(mon=>{
    if(!weeks.find(w=>w.monday===mon)) weeks.push({monday:mon,worked:null,mode:'vac'});
  });
  weeks.sort((a,b)=>b.monday.localeCompare(a.monday));
  if(!weeks.length) {
    el.innerHTML='<div class="m5-empty"><div class="m5-empty-icon">📋</div><div class="m5-empty-text">Aucune semaine saisie pour '+year+'.</div></div>';
    return;
  }
  el.innerHTML=weeks.map(w=>{
    const isVac=w.mode==='vac'||M5_DataStore.isVacWeek(w.monday,year);
    const worked=w.worked||0;
    const diff=Math.max(0,worked-contract.hoursBase);
    const pct35=Math.round(worked/(contract.tempsPlein||35)*100);
    const d=new Date(w.monday+'T12:00:00'),fn=new Date(w.monday+'T12:00:00');
    fn.setDate(fn.getDate()+6); // semaine complète 7 jours
    const label=`${d.getDate()}/${d.getMonth()+1} → ${fn.getDate()}/${fn.getMonth()+1}`;
    let cls='normal';
    if(isVac) cls='vacances'; else if(pct35>=95) cls='danger'; else if(diff>0) cls='warn';
    const compLabel=isVac?'🌴':diff>0?`+${window._m5fmtH(diff)}`:'✓';
    return `<div class="m5-week-item" onclick="goToWeek('${w.monday}')">
      <div class="m5-week-date">${label} <span style="font-size:10px;color:var(--miz-text3)">${w.mode==='week'?'hebdo':'journal.'}</span></div>
      <div class="m5-week-hours">${isVac?'—':window._m5fmtH(worked)}</div>
      <div class="m5-week-comp ${cls}">${compLabel}</div>
    </div>`;
  }).join('');
}

function goToWeek(monday) {
  calendarMonday=monday;
  showSection('accueil');
  refreshUI();
}

// ── Stats ─────────────────────────────────────────────────────────
function renderStats() {
  const el=document.getElementById('stats-content');
  const contract=M5_Contract.get();
  if(!el||!contract.hoursBase) return;
  const year=M5_DataStore.getYear();
  const analysis=currentAnalysis||runAnalysis();
  if(analysis) renderQuickStats(analysis);
  const mode=contract.modeCalcul||'HEBDO';
  const stats=M5_DataStore.getAnnualStats(year,contract.hoursBase,contract);
  const caps=CalcEngine.calcAnnualCap(contract.hoursBase,contract);
  const exStart=contract.exerciceStart||'';
  // Formater le label d'exercice selon le format stocké
  let exLabel=year;
  if(exStart && exStart.includes('-')) {
    // Format ISO "2025-12-16" → "16 déc 2025"
    const dEx=new Date(exStart+'T12:00:00');
    exLabel=dEx.toLocaleDateString('fr-FR',{day:'numeric',month:'short',year:'numeric'});
  } else if(exStart && exStart.includes('/')) {
    // Ancien format "01/01" → "01/01/year"
    exLabel=exStart+'/'+year;
  }
  let html='';

  if(mode==='ANNUEL'&&analysis&&analysis.annuelResult) {
    const ar=analysis.annuelResult;
    const solde=ar.solde;
    const cls=solde>1?'ok':solde<-2?'danger':'warn';
    html+=`<div class="m5-card" style="margin:12px 0;">
      <div class="m5-card-header"><span class="m5-card-title">📊 Compteur annuel ${exLabel}</span></div>
      <div class="m5-card-body">
        <div class="m5-stat-grid" style="margin-bottom:12px;">
          <div class="m5-stat"><div class="m5-stat-val">${ar.pctAvancement}%</div><div class="m5-stat-label">Exercice écoulé</div></div>
          <div class="m5-stat"><div class="m5-stat-val">${window._m5fmtH(ar.reelCumule)}</div><div class="m5-stat-label">Réalisées</div></div>
          <div class="m5-stat"><div class="m5-stat-val ${cls}">${solde>=0?'+':''}${window._m5fmtH(solde)}</div><div class="m5-stat-label">Avance/Retard</div></div>
        </div>
        <div class="m5-alert info" style="margin-bottom:8px;">
          <span>🎯</span><div>Objectif : <strong>${window._m5fmtH(ar.objectifAnnuel)}/an</strong><br>
          <small>Théorique cumulé : ${window._m5fmtH(ar.theoriqueCumule)} — ${ar.joursEcoules} jours écoulés</small></div>
        </div>
        <div class="m5-alert ${solde>1?'ok':solde<-2?'warn':'info'}">
          <span>${solde>1?'🚀':solde<-2?'⏳':'➡️'}</span>
          <div>${solde>1?`En avance de <strong>${window._m5fmtH(solde)}</strong>.`:solde<-2?`<strong>${window._m5fmtH(Math.abs(solde))}</strong> de retard.`:"Dans les clous sur l'objectif annuel."}</div>
        </div>
      </div></div>`;
  } else if(mode==='MENSUEL'&&analysis&&analysis.mensuelResult) {
    const mr=analysis.mensuelResult;
    const delta=mr.delta;
    html+=`<div class="m5-card" style="margin:12px 0;">
      <div class="m5-card-header"><span class="m5-card-title">📊 Bilan mensuel — ${new Date().toLocaleDateString('fr-FR',{month:'long',year:'numeric'})}</span></div>
      <div class="m5-card-body">
        <div class="m5-stat-grid" style="margin-bottom:12px;">
          <div class="m5-stat"><div class="m5-stat-val">${window._m5fmtH(mr.totalWorked)}</div><div class="m5-stat-label">Ce mois</div></div>
          <div class="m5-stat"><div class="m5-stat-val ${delta>0?'warn':'ok'}">${delta>=0?'+':''}${window._m5fmtH(delta)}</div><div class="m5-stat-label">vs seuil</div></div>
          <div class="m5-stat"><div class="m5-stat-val">${window._m5fmtH(mr.totalCompH)}</div><div class="m5-stat-label">Heures comp.</div></div>
        </div>
        <div class="m5-alert info" style="margin-bottom:8px;">
          <span>📊</span><div>Seuil mensuel : <strong>${window._m5fmtH(mr.seuilMensuel)}</strong> (${(contract.dureeContrat&&contract.dureeContrat.unite==='M'&&contract.dureeContrat.valeur>0)?'ton contrat : '+String(contract.dureeContrat.valeur).replace('.',',')+' h/mois':contract.hoursBase+'h × 52 / 12'})</div>
        </div>
        ${mr.totalCompH>0?`<div class="m5-alert ok"><span>💰</span><div>${window._m5fmtH(mr.compH1)} ${M5_tauxTxt(contract.rate1??0.10)}${mr.compH2>0?' | '+window._m5fmtH(mr.compH2)+' '+M5_tauxTxt(contract.rate2??0.25):''}</div></div>`:''}
      </div></div>`;
  } else if(stats) {
    html+=`<div class="m5-card" style="margin:12px 0;">
      <div class="m5-card-header"><span class="m5-card-title">📊 Bilan ${exLabel}</span></div>
      <div class="m5-card-body">
        <div class="m5-stat-grid" style="margin-bottom:14px;">
          <div class="m5-stat"><div class="m5-stat-val">${stats.totalWeeks}</div><div class="m5-stat-label">Semaines</div></div>
          <div class="m5-stat"><div class="m5-stat-val">${window._m5fmtH(stats.avgWorked)}</div><div class="m5-stat-label">Moy. hebdo</div></div>
          <div class="m5-stat"><div class="m5-stat-val">${stats.pctOverContract}%</div><div class="m5-stat-label">En dépassement</div></div>
        </div>
        <div class="m5-alert ${stats.totalComp>caps.annual?'warn':'info'}" style="margin-bottom:8px;">
          <span>⏱️</span><div><strong>${window._m5fmtH(stats.totalComp)}</strong> complémentaires<br>
          <small>Plafond annuel estimé : ${window._m5fmtH(caps.annual)}</small></div>
        </div>
        ${stats.totalComp1>0?`<div class="m5-alert ok"><span>💰</span><div>${window._m5fmtH(stats.totalComp1)} ${M5_tauxTxt(contract.rate1??0.10)}${stats.totalComp2>0?' | '+window._m5fmtH(stats.totalComp2)+' '+M5_tauxTxt(contract.rate2??0.25):(Math.abs((contract.rate1??0.10)-(contract.rate2??0.25))<1e-9?'':' | Aucune heure '+M5_tauxTxt(contract.rate2??0.25))}</div></div>`:''}
      </div></div>`;
  } else {
    html='<div class="m5-empty"><div class="m5-empty-icon">📊</div><div class="m5-empty-text">Aucune semaine saisie pour '+year+'.</div></div>';
  }

  // ── HEATMAP annuelle ─────────────────────────────────────────
  const allWeeksYear=M5_DataStore.getWeeksSorted(year)||[];
  if(allWeeksYear.length>0) {
    const hoursArr=allWeeksYear.map(w=>w.worked||0).filter(h=>h>0);
    const maxHours=hoursArr.length>0?Math.max(...hoursArr,contract.hoursBase*1.2):contract.hoursBase*1.2;
    html+=`<div class="m5-card" style="margin:0 0 12px;">
      <div class="m5-card-header"><span class="m5-card-title">🗓️ Heatmap ${year}</span></div>
      <div class="m5-card-body" style="padding:12px;">
        <div class="m5-heatmap-wrap">
          <div style="display:flex;flex-wrap:wrap;gap:3px;">`;
    allWeeksYear.forEach(w=>{
      const wh=w.worked||0;
      const ratio=maxHours>0?Math.min(wh/maxHours,1):0;
      let bg='rgba(108,63,197,0.08)', border='rgba(108,63,197,0.15)', txt='rgba(255,255,255,0.40)';
      if(wh>((typeof contract!=='undefined'&&contract&&contract.tempsPlein)||34.99)){ bg='rgba(220,38,38,0.92)'; border='rgba(185,28,28,1)'; txt='#fff'; }
      else if(wh>contract.hoursBase){ /* HC : jaune-orange clair, distinct du rouge */ const i=Math.min(Math.round(ratio*255),255); bg=`rgba(251,191,36,${0.55+ratio*0.30})`; border=`rgba(217,119,6,0.85)`; txt='#1f1f1f'; }
      else if(wh>0){ bg=`rgba(16,185,129,${0.25+ratio*0.5})`; border='rgba(16,185,129,0.5)'; txt='#fff'; }
      const d=new Date(w.monday+'T12:00:00');
      const lbl=`${d.getDate()}/${d.getMonth()+1}`;
      html+=`<div title="${lbl} : ${window._m5fmtH(wh)}" style="width:38px;height:38px;border-radius:6px;background:${bg};border:1px solid ${border};display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:default;transition:transform .1s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        <span style="font-size:9px;color:rgba(255,255,255,0.50);line-height:1;">${lbl}</span>
        <span style="font-size:12px;font-weight:700;color:${txt};line-height:1.2;">${wh>0?window._m5fmtH(wh):'—'}</span>
      </div>`;
    });
    html+=`</div></div>
        <div style="display:flex;gap:12px;margin-top:8px;font-size:11px;color:var(--miz-text3);">
          <span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:rgba(16,185,129,0.5);border-radius:3px;display:inline-block;"></span>Conforme</span>
          <span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:rgba(251,191,36,0.85);border:1px solid rgba(217,119,6,0.85);border-radius:3px;display:inline-block;"></span>HC (jaune)</span>
          <span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:rgba(220,38,38,0.92);border-radius:3px;display:inline-block;"></span>≥35h (rouge)</span>
        </div>
      </div>
    </div>`;
  }

  // ── HEATMAP COMMUNE (27/09/2026) : toutes les heures de la semaine, tous contrats ──
  try{ if(window.M5_Contrats&&M5_Contrats.existing().length>1){
    const ex=M5_Contrats.existing(), cc=M5_Contrats.contratCumul(), baseT=cc?cc.hoursBase:0;
    // 27/09/2026 : semaines de l'EXERCICE (la semaine du 29/12/2025 appartient à 2026), pas de l'année civile
    const _bx=window.M5_exoBornes&&M5_exoBornes(year),_y0=parseInt(year,10);
    const cw=M5_Contrats.semainesCumul([String(_y0-1),String(year),String(_y0+1)],contract.weekStartDay||0).filter(w=>(_bx?(w.monday>=_bx.deb&&w.monday<=_bx.fin):String(w.monday).slice(0,4)===String(year))&&w.worked>0);
    if(cw.length){
      html+=`<div class="m5-card" style="margin:0 0 12px;"><div class="m5-card-header"><span class="m5-card-title">🗓️ Heatmap ${year} · tous mes contrats</span></div><div class="m5-card-body" style="padding:12px;"><div class="m5-heatmap-wrap"><div style="display:flex;flex-wrap:wrap;gap:3px;">`;
      cw.forEach(w=>{const wh=w.worked;let bg,border,txt='#fff';
        if(wh>48){bg='rgba(220,38,38,0.92)';border='rgba(185,28,28,1)';}
        else if(wh>baseT){bg='rgba(251,191,36,0.8)';border='rgba(217,119,6,0.85)';txt='#1f1f1f';}
        else{bg='rgba(16,185,129,0.55)';border='rgba(16,185,129,0.6)';}
        const d=new Date(w.monday+'T12:00:00'),lbl=d.getDate()+'/'+(d.getMonth()+1);
        const det=ex.map(n=>M5_Contrats.nom(n)+' '+window._m5fmtH(w.parContrat[n]||0)).join(' · ');
        html+=`<div title="${lbl} : ${window._m5fmtH(wh)} (${det})" style="width:38px;height:38px;border-radius:6px;background:${bg};border:1px solid ${border};display:flex;flex-direction:column;align-items:center;justify-content:center"><span style="font-size:9px;color:rgba(255,255,255,0.6);line-height:1">${lbl}</span><span style="font-size:12px;font-weight:700;color:${txt};line-height:1.2">${window._m5fmtH(wh)}</span></div>`;});
      html+=`</div></div><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px;font-size:11px;color:var(--miz-text3);">
        <span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:rgba(16,185,129,0.55);border-radius:3px;display:inline-block;"></span>Dans tes contrats (${window._m5fmtH(baseT)})</span>
        <span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:rgba(251,191,36,0.8);border-radius:3px;display:inline-block;"></span>Au-delà</span>
        <span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:rgba(220,38,38,0.92);border-radius:3px;display:inline-block;"></span>Plus de 48 h</span></div></div></div>`;
    } } }catch(e){}

  html+=`<button class="m5-btn m5-btn-primary m5-btn-full" onclick="exportPDF()" style="margin:0 0 16px;">📄 Exporter en PDF</button>`;
  el.innerHTML=html;
}

// ── Popup Mizuki ──────────────────────────────────────────────────
function openMizukiPopup() {
  const analysis=currentAnalysis||runAnalysis(); if(!analysis) return;
  const popup=Mizuki.getPopupContent(_analysisForMizuki(analysis)); if(!popup) return;
  const lvlMap={ok:'✅ Tout va bien',info:'📋 Info',vigilance:'👀 Vigilance',alerte:'⚠️ Alerte',critique:'🚨 Critique'};
  document.getElementById('mizuki-popup-body').innerHTML=`
    <div class="mizuki-popup-icon">${popup.icon}</div>
    <div><span class="mizuki-popup-level ${popup.level}">${lvlMap[popup.level]||popup.level}</span></div>
    <div style="font-size:17px;font-weight:700;color:#E9D5FF;margin-bottom:10px;">${popup.titre}</div>
    <div class="mizuki-popup-msg">${popup.message}</div>
    ${popup.actions&&popup.actions.length?`<div style="font-size:12px;color:#A78BFA;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px;">À faire</div>
    <div class="mizuki-popup-actions">${popup.actions.map(a=>`<div class="mizuki-popup-action">${a}</div>`).join('')}</div>`:''}
    <div style="font-size:11px;color:rgba(196,168,255,0.50);text-align:center;margin-top:14px;">🦊 Mizuki est ton alliée — pas un avis juridique</div>`;
  openModal('modal-mizuki');
}

// ── Contrat ───────────────────────────────────────────────────────
function openContractModal() {
  const c=M5_Contract.get();
  // Durée affichée dans l'unité du contrat (semaine / mois / an)
  const _dc=c.dureeContrat, _u=(_dc&&_WIZ_UNITES[_dc.unite])?_dc.unite:'S';
  setContractUnite(_u, true);
  document.getElementById('contract-hours').value   =(_u!=='S'&&_dc.valeur>0)?_dc.valeur:(c.hoursBase||'');
  const _rp=document.getElementById('contract-retraite-prog'); if(_rp) _rp.checked=!!c.retraiteProgressive;
  updateContractHoursPreview();
  document.getElementById('contract-rate').value    =c.hourlyRate||'';
  document.getElementById('contract-ccn').value     =c.idcc||'0';
  // Cap : priorité à la CCN sélectionnée
  let capToShow = c.cap||0.10;
  if(c.idcc>0 && typeof CCN_PARTIEL_API!=='undefined') {
    const ccnR=CCN_PARTIEL_API.getRules(c.idcc,c.ccnNom);
    if(ccnR && ccnR.cap) capToShow=ccnR.cap;
  }
  document.getElementById('contract-cap').value = Number(capToShow).toFixed(2);
  document.getElementById('contract-name').value    =(localStorage.getItem('M5_USER_NAME')||localStorage.getItem('SH_PRENOM')||'');
  const startDayEl=document.getElementById('contract-start-day');
  if(startDayEl) startDayEl.value=String(c.weekStartDay||0);
  const exEl=document.getElementById('contract-exercice');
  if(exEl) exEl.value=c.exerciceStart||'';
  const modeEl=document.getElementById('contract-mode');
  if(modeEl) modeEl.value=c.modeCalcul||'HEBDO';
  const feriesEl=document.getElementById('contract-feries');
  if(feriesEl) feriesEl.checked=(c.neutraliseFeries!==false);
  toggleFeriesLabel(c.neutraliseFeries!==false);
  // Nouveaux champs : accord collectif prévenance + jours ouvrés
  const accordPrevEl=document.getElementById('contract-accord-prev');
  if(accordPrevEl) accordPrevEl.checked=!!c.accordCollectifPrevenance;
  const joursOuvresEl=document.getElementById('contract-jours-ouvres');
  if(joursOuvresEl) joursOuvresEl.value=String(c.joursOuvresContrat||5);
  // Générer la grille des 12 clôtures
  buildCloturesGrid(c.cloturesDates||{});
  // Afficher statut dernier import
  const feriesStatus=document.getElementById('feries-import-status');
  if(feriesStatus) {
    const lastImport=getFeriesImportStatus();
    feriesStatus.textContent=lastImport||'Données locales (calcul automatique)';
    feriesStatus.style.color='var(--miz-text3)';
  }
  // Restaurer la recherche CCN
  const ccnSearch=document.getElementById('contract-ccn-search');
  const ccnSel=document.getElementById('contract-ccn-selected');
  if(ccnSearch) ccnSearch.value=c.ccnNom||'';
  if(ccnSel)   ccnSel.textContent=c.idcc?'✓ IDCC '+c.idcc+' — '+c.ccnNom:'';
  openModal('modal-contract');
}


// ── Snap exerciceStart au début de semaine du contrat ────────────────
// Si l'utilisateur saisit un mercredi avec un contrat lun-dim,
// on recule au lundi précédent (ou au mardi si weekStartDay=1, etc.)
function snapExerciceStart(dateStr, weekStartDay) {
  if(!dateStr) return dateStr;
  try {
    return M5_weekStartOf(dateStr, weekStartDay||0);
  } catch(_) { return dateStr; }
}
window.snapExerciceStart=snapExerciceStart;

// ── Durée du contrat dans ⚙️ Mon contrat : même logique que l'assistant (26/09/2026) ──
let _contractUnite='S';
function _contractValeur(){ return parseFloat(String(document.getElementById('contract-hours')?.value||'0').replace(',','.'))||0; }
function _contractHebdo(){
  const v=_contractValeur(); if(v<=0) return 0;
  return Math.round((_contractUnite==='M'? v*12/52 : _contractUnite==='A'? v/52 : v)*100)/100;
}
function setContractUnite(u, silencieux){
  if(!_WIZ_UNITES[u]) return;
  const avant=_contractUnite, hebdo=_contractHebdo();
  _contractUnite=u;
  ['S','M','A'].forEach(k=>document.getElementById('contract-unite-'+k)?.classList.toggle('selected',k===u));
  const lb=document.getElementById('contract-hours-label');
  if(lb) lb.textContent='Durée contractuelle (h/'+_WIZ_UNITES[u].court+') *';
  const inp=document.getElementById('contract-hours');
  if(inp){
    inp.placeholder=_WIZ_UNITES[u].ph;
    // Changement d'unité à la main : on convertit la valeur déjà saisie
    if(!silencieux && avant!==u && hebdo>0){
      const v=u==='M'? hebdo*52/12 : u==='A'? hebdo*52 : hebdo;
      inp.value=String(Math.round(v*100)/100);
    }
  }
  if(!silencieux){
    // Le mode de calcul suit l'unité (reste modifiable juste en dessous)
    const modeEl=document.getElementById('contract-mode'); if(modeEl) modeEl.value=_WIZ_UNITES[u].mode;
    updateContractHoursPreview();
  }
}
function updateContractHoursPreview(){
  _rpMaj('contract',_contractUnite,_contractValeur());
  const el=document.getElementById('contract-hours-preview'); if(!el) return;
  const v=_contractValeur(), h=_contractHebdo(), f=window._m5fmtH;
  if(!v||v<=0||!f){ el.textContent=''; return; }
  el.textContent=_contractUnite==='S'?`soit environ ${f((h*52/12).toFixed(2))}/mois`:`soit en moyenne ${f(h)} par semaine`;
}
window.setContractUnite=setContractUnite; window.updateContractHoursPreview=updateContractHoursPreview;

function saveContract() {
  const _uC=_WIZ_UNITES[_contractUnite], _vC=_contractValeur();
  if(!_vC||_vC<=0) { toast('Saisis la durée de ton contrat ('+_uC.ph+').','error'); return; }
  const _tpCCN=(typeof CCN_PARTIEL_API!=='undefined'&&CCN_PARTIEL_API.getRules(parseInt(document.getElementById('contract-ccn').value)||0,document.getElementById('contract-ccn-search')?.value).tempsPlein)||35;
  if(_tpCCN===35&&_vC>=_uC.plein) { toast('À partir de '+_uC.pleinTxt+', c\u2019est un temps plein : Mizuki suit les temps partiels.','error'); return; }
  const hoursBase =_contractHebdo();
  const hourlyRate=parseFloat(document.getElementById('contract-rate').value)||0;
  const idcc      =parseInt(document.getElementById('contract-ccn').value)||0;
  const capManuel =parseFloat(document.getElementById('contract-cap').value)||0.10;
  const name      =document.getElementById('contract-name').value.trim();
  if(!hoursBase||hoursBase<=0||hoursBase>=_tpCCN) { toast('Saisis une durée entre 1 et '+(_tpCCN-0.5).toString().replace('.',',')+'h.','error'); return; }
  // Art. L3123-27 et L3123-7 : 24 h/sem minimum, ou l'équivalent mensuel (104 h) ou sur la période
  // d'aménagement (24/35 de 1 607 h ≈ 1 102 h/an), sauf dérogations (demande du salarié, accord, étudiant…)
  const _min24={S:24,M:104,A:1102}[_contractUnite];
  if(_vC < _min24) {
    toast("⚠️ Moins de 24 h/sem (ou l'équivalent "+(_contractUnite==='S'?'':'sur ton contrat')+") : vérifie qu'une dérogation légale s'applique (art. L3123-7)",'warn');
  }
  const ccnRules=typeof CCN_PARTIEL_API!=='undefined'?CCN_PARTIEL_API.getRules(idcc,document.getElementById('contract-ccn-search')?.value):{cap:capManuel,rate1:0.10,rate2:0.25,threshold:0.10};
  // Si une CCN est sélectionnée, son cap fait foi — sinon le sélecteur manuel
  const cap = (idcc>0 && ccnRules.cap) ? ccnRules.cap : capManuel;
  const weekStartDay=parseInt(document.getElementById('contract-start-day')?.value||'0');
  const exerciceStartRaw=document.getElementById('contract-exercice')?.value||'';
  const exerciceStart=snapExerciceStart(exerciceStartRaw, weekStartDay);
  if(exerciceStart && exerciceStart!==exerciceStartRaw) {
    toast('Date ajustée au début de semaine : '+exerciceStart,'info');
  }
  const modeCalcul=document.getElementById('contract-mode')?.value||'HEBDO';
  const neutraliseFeries=document.getElementById('contract-feries')?.checked!==false;
  // Nouveaux champs : accord collectif prévenance (réduit à 3j) et nb jours travaillés/sem
  const accordCollectifPrevenance=!!document.getElementById('contract-accord-prev')?.checked;
  const joursOuvresContrat=parseInt(document.getElementById('contract-jours-ouvres')?.value||'5')||5;
  // Récupérer les 12 clôtures
  const cloturesDates={};
  for(let m=1;m<=12;m++){
    const el=document.getElementById('cloture-m'+m);
    if(el&&el.value) cloturesDates[m]=el.value;
  }
  M5_Contract.save({hoursBase,hourlyRate,idcc,ccnNom:ccnRules.nom||'Droit commun',cap,
    rate1:ccnRules.rate1??0.10,rate2:ccnRules.rate2??0.25,threshold:ccnRules.threshold||0.10,
    weekStartDay,exerciceStart,cloturesDates,modeCalcul,neutraliseFeries,
    accordCollectifPrevenance,joursOuvresContrat,
    dureeContrat:{unite:_contractUnite,valeur:_vC},
    retraiteProgressive:!!document.getElementById('contract-retraite-prog')?.checked});
  if(name) localStorage.setItem('M5_USER_NAME',name);
  Mizuki.clearCache();
  // Recalibrer le calendrier avec le nouveau début de semaine
  calendarMonday=M5_getCurrentMonday();
  closeModal('modal-contract');
  toast('Contrat enregistré ✓','success');
  refreshUI();
}

function openPDFModal() {
  const year=M5_DataStore.getYear();
  // Préremplir mois courant
  const now=new Date();
  document.getElementById('pdf-mois').value=String(now.getMonth()+1);
  document.getElementById('pdf-date-debut').value=year+'-01-01';
  document.getElementById('pdf-date-fin').value=year+'-12-31';
  updatePDFPreview();
  openModal('modal-pdf');
}

function updatePDFPreview() {
  const periode=document.getElementById('pdf-periode')?.value;
  const mensuelOpts=document.getElementById('pdf-mensuel-opts');
  const customOpts=document.getElementById('pdf-custom-opts');
  const info=document.getElementById('pdf-preview-info');
  const paieOpts=document.getElementById('pdf-paie-opts');
  if(mensuelOpts) mensuelOpts.style.display=periode==='MENSUEL'?'block':'none';
  if(customOpts)  customOpts.style.display=periode==='CUSTOM'?'block':'none';
  if(paieOpts) paieOpts.style.display=periode==='PAIE'?'block':'none';
  const year=M5_DataStore.getYear();
  const allWeeks=M5_DataStore.getWeeksSorted(year);
  if(periode==='PAIE'){
    const _sel=document.getElementById('pdf-paie-select');
    if(_sel && !_sel.options.length && typeof buildPeriodes==='function'){
      const _dfr=(iso)=>{const q=String(iso).split('-');return q.length===3?q[2]+'/'+q[1]+'/'+q[0]:String(iso);};
      (buildPeriodes(year, M5_Contract.get())||[]).forEach(pp=>{ const o=document.createElement('option'); o.value=pp.debutStr+'|'+pp.finStr; o.textContent=_dfr(pp.debutStr)+' → '+_dfr(pp.finStr); _sel.appendChild(o); });
    }
  }
  const weeks=filterWeeksByPeriode(allWeeks, periode, year);
  if(info) info.textContent=`${weeks.length} semaine(s) dans la période sélectionnée`;
  { const multi=window.M5_Contrats&&M5_Contrats.existing().length>1, box=document.getElementById('pdf-contrat-box'), sel=document.getElementById('pdf-contrat-sel');
    const bc=document.getElementById('pdf-commun-btn'); if(bc) bc.style.display='none';
    if(box) box.style.display=multi?'block':'none';
    if(sel&&multi&&!sel.options.length){
      M5_Contrats.existing().forEach(n=>{const o=document.createElement('option');o.value=String(n);o.textContent='📄 '+M5_Contrats.nom(n)+(n===M5_Contrats.active?' (affiché)':'');sel.appendChild(o);});
      const o=document.createElement('option');o.value='tous';o.textContent='📑 Tous mes contrats (PDF commun)';sel.appendChild(o);
      sel.value=String(M5_Contrats.active);
    }
    const bp=document.getElementById('pdf-contrat-lbl'); if(bp) bp.textContent='📄 Générer le PDF'; }
}

function filterWeeksByPeriode(allWeeks, periode, year) {
  if(periode==='MENSUEL') {
    const mois=parseInt(document.getElementById('pdf-mois')?.value||'1');
    const prefix=year+'-'+String(mois).padStart(2,'0');
    return allWeeks.filter(w=>w.monday.startsWith(prefix)||
      (w.monday.slice(0,7)<prefix&&new Date(w.monday+'T12:00:00').getMonth()+1===mois));
  }
  if(periode==='CUSTOM') {
    const debut=document.getElementById('pdf-date-debut')?.value||'';
    const fin=document.getElementById('pdf-date-fin')?.value||'';
    return allWeeks.filter(w=>(!debut||w.monday>=debut)&&(!fin||w.monday<=fin));
  }
  if(periode==='PAIE') {
    const v=document.getElementById('pdf-paie-select')?.value||'';
    const parts=v.split('|'); const d=parts[0]||'', f=parts[1]||'';
    return allWeeks.filter(w=>{ const e=new Date(w.monday+'T12:00:00'); e.setDate(e.getDate()+6);
      const es=e.getFullYear()+'-'+String(e.getMonth()+1).padStart(2,'0')+'-'+String(e.getDate()).padStart(2,'0');
      return (!d||w.monday<=f) && (!f||es>=d); });
  }
  return allWeeks; // ANNUEL
}

/* 27/09/2026 : PDF d'un contrat choisi dans la fenêtre (sans changer de contrat affiché) */
function _m5StatsSemaines(c,weeks){
  const base=c.hoursBase||0,thr=base*(c.threshold||0.10);let t=0,tc=0,t1=0,t2=0,wc=0,mx=0;
  // 27/09/2026 : même moteur que la carte Solde et le paiement (fériés chômés neutralisés).
  // Chaque semaine reçoit hc10/hc25 : le tableau du PDF affiche exactement ces chiffres.
  weeks.forEach(w=>{const h=w.worked||0;t+=h;if(h>mx)mx=h;
    let a1,a2;const R=window.M5_hcSemaine?M5_hcSemaine(c,w.monday,h):null;
    if(R){a1=R.c1;a2=R.c2;w.hc10=a1;w.hc25=a2;w.hcFerie=R.ferie;}else{const d=Math.max(0,h-base);a1=Math.min(d,thr);a2=Math.max(0,d-thr);}
    const d=a1+a2;if(d>0.001){wc++;tc+=d;t1+=a1;t2+=a2;}});
  const n=weeks.length||1,r=x=>Math.round(x*100)/100;
  return {totalWeeks:weeks.length,weeksWithComp:wc,pctOverContract:Math.round(wc/n*100),totalComp:r(tc),totalComp1:r(t1),totalComp2:r(t2),avgWorked:r(t/n),maxWorked:r(mx),totalWorked:r(t)};
}
function launchPDFContrat(n){
  try{
    n=parseInt(n,10);
    if(!window.M5_Contrats||n===M5_Contrats.active){launchPDF();return;}
    let c={};try{c=JSON.parse(localStorage.getItem(M5_Contrats.keyFor(n,'M5_CONTRACT'))||'{}')||{};}catch(e){}
    if(!c.hoursBase){toast('Ce contrat n\'est pas configuré','error');return;}
    try{if(c.idcc>0&&window.CCN_PARTIEL_API)c.cap=CCN_PARTIEL_API.getRules(c.idcc,c.ccnNom).cap||c.cap;}catch(e){}
    const year=M5_DataStore.getYear(),y0=parseInt(year,10),periode=document.getElementById('pdf-periode')?.value||'ANNUEL';
    const cum=M5_Contrats.semainesCumul([String(y0-1),String(y0),String(y0+1)],M5_Contract.get().weekStartDay||0)
      .filter(w=>w.parContrat[n]>0).map(w=>({monday:w.monday,worked:w.parContrat[n]}));
    const _bx=window.M5_exoBornes&&M5_exoBornes(year),_inExo=w=>_bx?(w.monday>=_bx.deb&&w.monday<=_bx.fin):String(w.monday).slice(0,4)===String(year);
    const weeks=filterWeeksByPeriode(periode==='ANNUEL'?cum.filter(_inExo):cum,periode,year);
    const stats=_m5StatsSemaines(c,weeks);
    const periodeLabel=periode==='MENSUEL'?['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'][parseInt(document.getElementById('pdf-mois')?.value||'1')-1]+' '+year
      :periode==='CUSTOM'?(document.getElementById('pdf-date-debut')?.value||'')+' → '+(document.getElementById('pdf-date-fin')?.value||'')
      :periode==='PAIE'?'Période de paie : '+((()=>{const s2=document.getElementById('pdf-paie-select');return (s2&&s2.options[s2.selectedIndex]&&s2.options[s2.selectedIndex].textContent)||'';})()):String(year);
    const pay=_m5PayePeriode(c,weeks,M5_Contrats.keyFor(n,'M5_HC_PAID'));
    const userName=(localStorage.getItem('M5_USER_NAME')||localStorage.getItem('SH_PRENOM')||'');
    const cw={...c,userName,periodeLabel,periodeMode:periode,nomContrat:M5_Contrats.nom(n),pay};
    closeModal('modal-pdf');
    setTimeout(()=>M5_PdfReport.generate(cw,stats,weeks,null),200);
  }catch(e){toast('Erreur PDF : '+e.message,'error');console.error(e);}
}
window.launchPDFContrat=launchPDFContrat;
function launchPDFChoisi(){
  const v=document.getElementById('pdf-contrat-sel')?.value||'';
  if(v==='tous')return launchPDFCommun();
  if(v)return launchPDFContrat(v);
  launchPDF();
}
window.launchPDFChoisi=launchPDFChoisi;

function launchPDF() {
  try {
    const contract=M5_Contract.get();
    const year=M5_DataStore.getYear();
    const periode=document.getElementById('pdf-periode')?.value||'ANNUEL';
    const allWeeks=M5_DataStore.getWeeksSorted(year);
    const weeks=filterWeeksByPeriode(allWeeks, periode, year);
    const stats=Object.assign({},M5_DataStore.getAnnualStats(year,contract.hoursBase,contract),_m5StatsSemaines(contract,weeks));
    const analysis=currentAnalysis||runAnalysis();
    const userName=(localStorage.getItem('M5_USER_NAME')||localStorage.getItem('SH_PRENOM')||'');
    const periodeLabel=periode==='MENSUEL'
      ? ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'][parseInt(document.getElementById('pdf-mois')?.value||'1')-1]+' '+year
      : periode==='CUSTOM'
        ? (document.getElementById('pdf-date-debut')?.value||'')+' → '+(document.getElementById('pdf-date-fin')?.value||'')
        : periode==='PAIE'
        ? 'Période de paie : '+(()=>{const s2=document.getElementById('pdf-paie-select');return (s2&&s2.options[s2.selectedIndex]&&s2.options[s2.selectedIndex].textContent)||'';})()
        : String(year);
    const nomContrat=(window.M5_Contrats&&M5_Contrats.existing().length>1)?M5_Contrats.nom(M5_Contrats.active):'';
    let pay=_m5PayePeriode(contract, weeks.map(w=>({monday:w.monday,worked:w.worked||0})), M5_key('M5_HC_PAID'));
    // Contrat affiché : même moteur que la carte « Solde » (fériés, périodes de paie)
    if(weeks.length&&window.M5_hcExercice){const H=M5_hcExercice(contract,weeks[0].monday,weeks[weeks.length-1].monday);
      pay={du10:H.d10,du25:H.d25,paye10:H.p10,paye25:H.p25,reste10:H.r10,reste25:H.r25};}
    const contractWithName={...contract, userName, periodeLabel, periodeMode:periode, nomContrat, pay};
    closeModal('modal-pdf');
    setTimeout(()=>{
      M5_PdfReport.generate(contractWithName, stats, weeks, analysis);
    }, 200);
  } catch(e) { toast('Erreur PDF : '+e.message,'error'); console.error(e); }
}

function exportPDF() { openPDFModal(); }

/* 27/09/2026 : heures complémentaires dues / payées / reste sur un ensemble de semaines.
   Même découpage par taux que le détail du PDF ; paiements saisis (semaine, période ou
   date) comptés s'ils tombent dans ces semaines. */
function _m5PayePeriode(c, weeks, paidKey){
  const r=x=>Math.round(x*100)/100, base=c.hoursBase||0, thr=base*(c.threshold||0.10);
  let du10=0,du25=0;
  weeks.forEach(w=>{const d=Math.max(0,(w.worked||0)-base);du10+=Math.min(d,thr);du25+=Math.max(0,d-thr);});
  let p10=0,p25=0;
  if(weeks.length){
    const deb=weeks[0].monday,fx=new Date(weeks[weeks.length-1].monday+'T12:00:00');fx.setDate(fx.getDate()+6);const fin=M5_localDK(fx);
    let pm={};try{pm=JSON.parse(localStorage.getItem(paidKey)||'{}')||{};}catch(e){}
    Object.keys(pm).forEach(k=>{const d=k.replace(/^(week|per):/,'');if(/^\d{4}-\d{2}-\d{2}$/.test(d)&&d>=deb&&d<=fin){p10+=+((pm[k]||{}).h10)||0;p25+=+((pm[k]||{}).h25)||0;}});
  }
  return {du10:r(du10),du25:r(du25),paye10:r(p10),paye25:r(p25),reste10:r(Math.max(0,du10-p10)),reste25:r(Math.max(0,du25-p25))};
}
/* PDF commun : tous les contrats, même période que celle choisie dans la fenêtre PDF */
function launchPDFCommun(){
  try{
    if(!window.M5_Contrats||M5_Contrats.existing().length<2){toast('Un seul contrat : utilise le PDF habituel','info');return;}
    const year=M5_DataStore.getYear(),y0=parseInt(year,10),periode=document.getElementById('pdf-periode')?.value||'ANNUEL';
    const sd=M5_Contract.get().weekStartDay||0;
    const _bx=window.M5_exoBornes&&M5_exoBornes(year);
    const all=M5_Contrats.semainesCumul([String(y0-1),String(y0),String(y0+1)],sd).filter(w=>periode!=='ANNUEL'||(_bx?(w.monday>=_bx.deb&&w.monday<=_bx.fin):String(w.monday).slice(0,4)===String(year)));
    const sem=filterWeeksByPeriode(all,periode,year).filter(w=>w.worked>0);
    const contrats=M5_Contrats.existing().map(n=>{
      let c={};try{c=JSON.parse(localStorage.getItem(M5_Contrats.keyFor(n,'M5_CONTRACT'))||'{}')||{};}catch(e){}
      let cap=c.cap||0.10;try{if(c.idcc>0&&window.CCN_PARTIEL_API)cap=CCN_PARTIEL_API.getRules(c.idcc,c.ccnNom).cap||cap;}catch(e){}
      const ws=sem.filter(w=>w.parContrat[n]>0).map(w=>({monday:w.monday,worked:w.parContrat[n]}));
      const pay=_m5PayePeriode(c,ws,M5_Contrats.keyFor(n,'M5_HC_PAID'));
      return {n,nom:M5_Contrats.nom(n),c,cap,heures:ws.reduce((a,w)=>a+w.worked,0),du10:pay.du10,du25:pay.du25,paye10:pay.paye10,paye25:pay.paye25};
    });
    const periodeLabel=periode==='MENSUEL'?['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'][parseInt(document.getElementById('pdf-mois')?.value||'1')-1]+' '+year
      :periode==='CUSTOM'?(document.getElementById('pdf-date-debut')?.value||'')+' → '+(document.getElementById('pdf-date-fin')?.value||'')
      :periode==='PAIE'?((()=>{const s2=document.getElementById('pdf-paie-select');return (s2&&s2.options[s2.selectedIndex]&&s2.options[s2.selectedIndex].textContent)||'';})()):String(year);
    const userName=(localStorage.getItem('M5_USER_NAME')||localStorage.getItem('SH_PRENOM')||'');
    closeModal('modal-pdf');
    setTimeout(()=>M5_PdfReport.generateCommun({periodeLabel,userName,contrats,semaines:sem}),200);
  }catch(e){toast('Erreur PDF : '+e.message,'error');console.error(e);}
}
window.launchPDFCommun=launchPDFCommun;

function initCCNSelect() {
  // Recherche dynamique — pas de select statique avec 422 entrées
}

function searchCCN(term) {
  const res=document.getElementById('contract-ccn-results');
  if(!res) return;
  if(!term||term.length<2) { res.style.display='none'; return; }
  if(typeof CCN_PARTIEL_API==='undefined') return;
  const results=CCN_PARTIEL_API.search(term);
  if(!results.length) { res.style.display='none'; return; }
  res.style.display='block';
  res.innerHTML=results.map(ccn=>`
    <div onclick="selectCCN(${ccn.i},'${ccn.n.replace(/'/g,"\\'")}','${ccn.s}')"
      style="padding:10px 12px;font-size:13px;cursor:pointer;border-bottom:1px solid rgba(167,139,250,0.15);display:flex;flex-direction:column;gap:3px;"
      onmouseenter="this.style.background='rgba(109,40,217,0.20)'"
      onmouseleave="this.style.background=''">
      <span style="font-weight:600;color:#E9D5FF;">${ccn.n}</span>
      <span style="font-size:11px;color:#A78BFA;">${ccn.s} — IDCC ${ccn.i}${ccn.renvoi?' (remplace l\'ex-IDCC '+ccn.renvoi+')':''} — plafond <strong style="color:#DDD6FE;">${CCN_PARTIEL_API.capLabel(ccn.cap,true)}</strong></span>
    </div>`).join('');
}

/* 03/10/2026 : carte « Tes droits » de l'accueil selon la convention du contrat */
window.M5_majDroitsCard=function(c){
  const g=document.querySelector('.acc-droits-grid'); if(!g||!c) return;
  const it=g.querySelectorAll('.acc-droit-item span:last-child'); if(it.length<3) return;
  if(c.sansMajoration){
    const tp=c.tempsPlein||40;
    it[0].innerHTML='Pas de plafond : heures en plus jusqu\'à <strong>'+tp+'h</strong>';
    it[1].innerHTML='<strong>Taux normal</strong> (sauf contrat) · au-delà de '+tp+'h : '+(tp===45?'<strong>au moins +10%</strong>':'<strong>+25%</strong> puis <strong>+50%</strong>');
    it[2].innerHTML='Temps plein : <strong>'+tp+'h</strong> (IDCC 3239)';
  } else {
    const cap=Math.round((c.cap||0.10)*100), r1=Math.round((c.rate1??0.10)*100), r2=Math.round((c.rate2??0.25)*100);
    it[0].innerHTML='Plafond <strong>'+cap+'%</strong> du contrat'+(c.idcc>0?' (ta convention)':' (droit commun)');
    it[1].innerHTML=r1===r2?'Majoration <strong>+'+r1+'%</strong> pour chaque heure':'Majoration <strong>+'+r1+'%</strong> puis <strong>+'+r2+'%</strong>';
  }
};

try{ document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{ try{ M5_majDroitsCard(M5_Contract.get()); }catch(_){} },300)); }catch(_){}

/* 03/10/2026 : encart propre à une convention (IDCC 3239 : employés de maison) */
window.M5_encartCCN=function(idcc,nom){
  if(parseInt(idcc,10)!==3239) return '';
  if(/maternel/i.test(nom||'')) return `<div class="m5-alert warn" style="margin-top:8px;font-size:12px;line-height:1.45;text-align:left;"><span>🧸</span><div>
    <strong>Assistant(e) maternel(le) (IDCC 3239)</strong> — Les règles du Code du travail sur le temps partiel ne s'appliquent pas à ton emploi.
    Les heures en plus de ton contrat, jusqu'à <strong>45 h par semaine</strong>, sont des heures complémentaires : elles ne sont majorées que si ton contrat le prévoit (art. 110.2). Mizuki les compte donc sans majoration et sans plafond.
    Au-delà de 45 h, ce sont des heures majorées, au taux fixé dans ton contrat, <strong>au moins +10 %</strong> (art. 110.1).</div></div>`;
  return `<div class="m5-alert warn" style="margin-top:8px;font-size:12px;line-height:1.45;text-align:left;"><span>🏠</span><div>
    <strong>Particuliers employeurs (IDCC 3239)</strong> — Les règles du Code du travail sur le temps partiel ne s'appliquent pas à ton emploi (art. L7221-2).
    Les heures en plus de ton contrat, jusqu'à <strong>40 h par semaine</strong>, sont payées au <strong>taux normal</strong>, sauf si ton contrat prévoit une majoration : Mizuki les compte donc sans majoration et sans plafond.
    Au-delà de 40 h (en moyenne sur 8 semaines), ce sont des heures supplémentaires : +25 % jusqu'à 48 h, puis +50 % (art. 147). Si tu dépasses souvent 40 h, utilise plutôt le module heures mensualisées.
    <br><em>Assistant(e) maternel(le) : choisis l'entrée « Assistant(e) maternel(le) » de la convention 3239.</em></div></div>`;
};

function selectCCN(idcc, nom, secteur) {
  document.getElementById('contract-ccn').value=idcc;
  document.getElementById('contract-ccn-search').value=nom;
  const sel=document.getElementById('contract-ccn-selected');
  if(sel) {
    const rules=typeof CCN_PARTIEL_API!=='undefined'?CCN_PARTIEL_API.getRules(idcc,nom):null;
    const capTxt=rules?CCN_PARTIEL_API.capLabel(rules.cap):'10% (droit commun)';
    sel.innerHTML=`<strong style="color:#E9D5FF;">✓ ${nom}</strong><br>
      <span style="font-size:11px;color:#A78BFA;">IDCC ${idcc} · Plafond <strong style="color:#DDD6FE;">${capTxt}</strong></span>${window.M5_encartCCN?M5_encartCCN(idcc,nom):''}`;
  }
  const res=document.getElementById('contract-ccn-results');
  if(res) res.style.display='none';
  // Auto-appliquer le plafond si CCN a un accord étendu
  if(typeof CCN_PARTIEL_API!=='undefined') {
    const rules=CCN_PARTIEL_API.getRules(idcc,nom);
    const capEl=document.getElementById('contract-cap');
    if(capEl && rules.cap) capEl.value=Number(rules.cap).toFixed(2);
  }
}

// ── Exposition ────────────────────────────────────────────────────
// ── Glossaire ─────────────────────────────────────────────────────
function renderGlossaire(term) {
  const el=document.getElementById('glossaire-list'); if(!el) return;
  if(typeof GLOSSAIRE_API==='undefined') {
    el.innerHTML='<div class="m5-empty"><div class="m5-empty-text">Glossaire non disponible.</div></div>';
    return;
  }
  const items = term ? GLOSSAIRE_API.search(term) : GLOSSAIRE_API.getAll();
  if(!items.length) {
    el.innerHTML='<div class="m5-empty" style="padding:20px;"><div class="m5-empty-text">Aucun résultat pour "'+term+'"</div></div>';
    return;
  }
  el.innerHTML = items.map((g,i) => `
    <div class="m5-glos-item" id="glos-${i}">
      <button class="m5-glos-header" onclick="toggleGlos(${i})">
        <span class="m5-glos-term">${g.terme}</span>
        <span class="m5-glos-art">${(typeof LegiRef !== 'undefined') ? LegiRef.html(g.art) : g.art}</span>
        <span class="m5-glos-chevron">›</span>
      </button>
      <div class="m5-glos-body">
        ${g.def}
        <div class="m5-glos-example">${g.exemple}</div>
      </div>
    </div>`).join('');
}

function toggleGlos(i) {
  const el=document.getElementById('glos-'+i); if(!el) return;
  el.classList.toggle('open');
}

function filterGlossaire(term) {
  renderGlossaire(term);
}

// ── Auto-save sur fermeture modale ───────────────────────────────
function saveDaySaisieOrClose() {
  const worked=window._hmVal('day-saisie-hoursH','day-saisie-hoursM');
  if(!isNaN(worked)&&worked>=0&&worked<=24) {
    saveDaySaisie();  // sauvegarde si une valeur est saisie
  } else {
    closeModal('modal-day-saisie');  // ferme si rien de valide
  }
}

function saveWeeklySaisieOrClose() {
  const worked=window._hmVal('week-saisie-hoursH','week-saisie-hoursM');
  if(!isNaN(worked)&&worked>=0&&worked<35) {
    saveWeeklySaisie();  // sauvegarde si une valeur est saisie
  } else {
    closeModal('modal-week-saisie');  // ferme si rien de valide
  }
}

// ── Congés sur tous les contrats en 1 clic (26/09/2026) ──────────────
function _congesTousBtn(){
  try{
    if(!window.M5_Contrats||M5_Contrats.existing().length<2) return '';
    const on=M5_Contrats.congesTousActif(calendarMonday,M5_DataStore.getYear()), n=M5_Contrats.existing().length;
    return `<button class="m5-btn m5-btn-sm ${on?'m5-btn-primary':'m5-btn-outline'}" style="width:100%;margin-top:8px" onclick="toggleCongesTous()">🌴 ${on?`En congés sur mes ${n} contrats ✓ — retirer`:`Je suis en congés sur mes ${n} contrats`}</button>`;
  }catch(e){ return ''; }
}
function toggleCongesTous(){
  if(window.M5_isDayLocked&&window.M5_isDayLocked(calendarMonday)){ toast('Période verrouillée 🔒 — déverrouille-la pour modifier','info'); return; }
  const year=M5_DataStore.getYear(), n=M5_Contrats.existing().length;
  const on=M5_Contrats.congesTousActif(calendarMonday,year);
  M5_Contrats.congesTous(calendarMonday,year,on);
  toast(on?`Congés retirés sur tes ${n} contrats`:`Semaine en congés sur tes ${n} contrats 🌴`,on?'info':'success');
  Mizuki.clearCache(); refreshUI();
}
window.toggleCongesTous=toggleCongesTous;

// ── Gestion vacances M5 ──────────────────────────────────────────────
function toggleVacSemaine() {
  if(window.M5_isDayLocked&&window.M5_isDayLocked(calendarMonday)){ toast('Période verrouillée 🔒 — déverrouille-la pour modifier','info'); return; }
  const year=M5_DataStore.getYear();
  const isVac=M5_DataStore.isVacWeek(calendarMonday,year);
  if(isVac) {
    M5_DataStore.removeVacWeek(calendarMonday,year);
    toast('Congés supprimés pour cette semaine','info');
  } else {
    M5_DataStore.addVacWeek(calendarMonday,year);
    toast('Semaine marquée en congés 🌴','success');
  }
  Mizuki.clearCache();
  refreshUI();
}


// ── Import jours fériés (API publique calendrier.api.gouv.fr) ──────
// Source : https://calendrier.api.gouv.fr — Etalab (données ouvertes)

// ── Gestion des années ────────────────────────────────────────────

// ── Délai de prévenance (Art. L3123-31 défaut / L3123-24 accord) ──
function checkPrevenance() {
  const demande=document.getElementById('prev-date-demande')?.value;
  const travail=document.getElementById('prev-date-travail')?.value;
  const el=document.getElementById('prevenance-result');
  if(!el) return;
  if(!demande||!travail) { el.innerHTML='<div class="m5-alert warn"><span>⚠️</span><div>Remplis les deux dates.</div></div>'; return; }

  const d1=new Date(demande+'T12:00:00');
  const d2=new Date(travail+'T12:00:00');
  if(d2<=d1) { el.innerHTML='<div class="m5-alert warn"><span>⚠️</span><div>La date de travail doit être après la demande.</div></div>'; return; }

  // Compter les jours ouvrés entre d1 et d2 (Lun-Ven, hors fériés)
  const feriesMap=currentAnalysis&&currentAnalysis.feriesMap
    ?currentAnalysis.feriesMap
    :(typeof M5_getFeriesYear!=='undefined'?M5_getFeriesYear(d1.getFullYear()):{});

  let joursOuvres=0;
  const cur=new Date(d1); cur.setDate(cur.getDate()+1); // on commence le lendemain
  while(cur < d2) {
    const dow=cur.getDay(); // 0=dim, 6=sam
    const dk=cur.getFullYear()+'-'+String(cur.getMonth()+1).padStart(2,'0')+'-'+String(cur.getDate()).padStart(2,'0');
    if(dow>=1&&dow<=5&&!feriesMap[dk]) joursOuvres++;
    cur.setDate(cur.getDate()+1);
  }

  // Le délai requis dépend du contrat (accord collectif ou pas)
  const contract=M5_Contract.get();
  const seuil=contract.noticeDays||7;
  const article=contract.accordCollectifPrevenance?'L3123-24':'L3123-31';
  const sourceLabel=contract.accordCollectifPrevenance
    ?'accord collectif applicable (3 jours min.)'
    :'défaut légal sans accord (7 jours min.)';

  const ok=joursOuvres>=seuil;
  // Cas spécifique : refus sans faute L3123-10 possible si délai < seuil contractuel
  // Le refus est TOUJOURS possible si le délai contractuel n'est pas respecté
  const refusL3123_10=!ok;
  const demandeFmt=d1.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'});
  const travailFmt=d2.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'});

  el.innerHTML=`<div class="m5-alert ${ok?'ok':'critique'}">
    <span>${ok?'✅':'🚨'}</span>
    <div>
      <strong>${joursOuvres} jour${joursOuvres>1?'s':''} ouvré${joursOuvres>1?'s':''}</strong> entre la demande (${demandeFmt}) et le jour de travail (${travailFmt}).<br>
      <span style="font-size:12px;color:var(--miz-text3);">Ton contrat indique : <strong>${seuil} jours min.</strong> — ${sourceLabel}</span><br><br>
      ${ok
        ?`Le délai prévu par ton contrat (${seuil} jours, Art. ${article}) est respecté.`
        :`<strong>Délai insuffisant</strong> — il manque ${seuil-joursOuvres} jour(s) ouvré(s) selon ton contrat (Art. ${article}).${refusL3123_10?'<br><br>⚖️ <strong>Refus sans faute possible</strong> (Art. L3123-10) : tu peux refuser ces heures, ce refus ne constitue ni faute ni motif de licenciement. Conserve cette analyse comme preuve.':''}`}
    </div>
  </div>`;
}

function openYearsPopup() {
  const year=M5_DataStore.getYear();
  const years=M5_getExistingYears();
  const now=String(new Date().getFullYear());

  // Ajouter l'année courante si absente
  if(!years.includes(now)) years.push(now);
  years.sort();

  const list=document.getElementById('years-list');
  if(!list) return;

  list.innerHTML=years.map(y=>{
    const isActive=y===year;
    const weeks=M5_DataStore.getWeeksSorted(y).length;
    return `<div style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid var(--miz-border);cursor:pointer;background:${isActive?'var(--miz-accent)':''}" onclick="switchYear('${y}')">
      <div style="flex:1;">
        <div style="font-size:15px;font-weight:700;color:${isActive?'var(--miz-primary)':'var(--miz-text)'}">
          ${y}${isActive?' ✓ (actif)':''}
        </div>
        <div style="font-size:12px;color:var(--miz-text3);">${weeks > 0 ? weeks+' semaine'+(weeks>1?'s':'')+' saisie'+(weeks>1?'s':'') : 'Aucune donnée'}</div>
      </div>
      ${isActive?'':'<span style="color:var(--miz-primary);font-size:18px;">›</span>'}
    </div>`;
  }).join('');

  // Bouton nouvelle année
  list.innerHTML+=`<div style="padding:12px 14px;">
    <button class="m5-btn m5-btn-outline m5-btn-sm m5-btn-full" onclick="createNewYear()">
      ➕ Créer un nouvel exercice
    </button>
  </div>`;

  openModal('modal-years');
}

function switchYear(y) {
  M5_DataStore.setYear(y);
  // 26/09/2026 : le calendrier se place dans l'année choisie (avant : semaine d'aujourd'hui,
  // hors de l'année — une saisie y aurait été rangée dans la mauvaise année)
  if(String(y)===String(new Date().getFullYear())) calendarMonday=M5_getCurrentMonday();
  else if(Number(y)>new Date().getFullYear()){
    // 27/09/2026 : année future → sa première semaine (celle du début d'exercice ou du 1er janvier)
    let deb=y+'-01-01';
    try{const c=window.M5_contratPourAnnee?M5_contratPourAnnee(String(y),M5_Contract.get()):M5_Contract.get();
      if(c&&/^\d{4}-\d{2}-\d{2}$/.test(c.exerciceStart||'')&&c.exerciceStart.slice(0,4)<=String(y))deb=c.exerciceStart;}catch(e){}
    calendarMonday=M5_weekStartOf(deb,M5_Contract.get().weekStartDay||0);
  }
  else {
    let ws=M5_DataStore.getWeeksSorted(String(y));
    // Dernière semaine de l'exercice de cette année (la semaine du 29/12 ouvre souvent le suivant)
    try{const c=window.M5_contratPourAnnee?M5_contratPourAnnee(String(y),M5_Contract.get()):null,cl=c?Object.values(c.cloturesDates||{}).filter(Boolean).sort():[],fin=cl[cl.length-1];
      if(fin&&fin.slice(0,4)===String(y)){const w2=ws.filter(w=>w.monday<=fin);if(w2.length)ws=w2;}}catch(e){}
    calendarMonday=ws.length?ws[ws.length-1].monday:M5_weekStartOf(y+'-01-01',M5_Contract.get().weekStartDay||0);
  }
  Mizuki.clearCache();
  closeModal('modal-years');
  toast('Exercice '+y+' activé','success');
  refreshUI();
  updateYearBadge();
  // 27/09/2026 : le bandeau d'exercice suit l'année affichée
  if(window.M5_verifierExercice) setTimeout(window.M5_verifierExercice,60);
}

function createNewYear() {
  // 26/09/2026 : exercice en cours terminé → même chemin que le bandeau (choix des clôtures)
  try{
    const c=M5_Contract.get(),cl=Object.values(c.cloturesDates||{}).filter(Boolean).sort(),last=cl[cl.length-1];
    const auj=M5_localDK(new Date());
    if(last&&auj>last&&typeof window.M5_choisirPuisSuivant==='function'){closeModal('modal-years');window.M5_choisirPuisSuivant();return;}
  }catch(e){}
  const y=prompt('Saisir l\'année (ex: 2027)');
  if(!y||!/^\d{4}$/.test(y)) return;
  const yr=parseInt(y);
  if(yr<2020||yr>2050) { toast('Année invalide','error'); return; }
  // 27/09/2026 : année qui suit l'exercice en cours, pas encore terminé → même question
  // que le bandeau (clôtures automatiques ou manuelles), appliquée le jour du passage
  try{const c=M5_Contract.get(),cl=Object.values(c.cloturesDates||{}).filter(Boolean).sort(),last=cl[cl.length-1];
    if(last&&yr===parseInt(last.slice(0,4),10)+1&&typeof window.M5_preparerSuivant==='function'){closeModal('modal-years');if(window.M5_preparerSuivant(y))return;}}catch(e){}
  // Créer un jeu de données vide
  const key=M5_key('M5_DATA_')+y;
  if(!localStorage.getItem(key)) localStorage.setItem(key,JSON.stringify({}));
  switchYear(y);
}

function updateYearBadge() {
  const yr=M5_DataStore.getYear();
  const badge=document.getElementById('year-badge');
  if(badge) badge.textContent=yr;
  const histBtn=document.getElementById('hist-year-btn');
  if(histBtn) histBtn.textContent=yr;
  // Mettre à jour le titre stats
  const statsTitle=document.getElementById('quick-stats-title');
  // (mis à jour dans renderQuickStats)
}

async function importFeriesAPI() {
  const btn=document.getElementById('btn-import-feries');
  const status=document.getElementById('feries-import-status');
  if(btn) { btn.disabled=true; btn.textContent='⏳ Import...'; }
  if(status) { status.textContent=''; status.style.color=''; }

  const now=new Date();
  const years=[now.getFullYear()-1, now.getFullYear(), now.getFullYear()+1];
  let success=0, errors=0;
  const results=[];

  for(const year of years) {
    try {
      const url=`https://calendrier.api.gouv.fr/jours-feries/metropole/${year}.json`;
      const resp=await fetch(url);
      if(!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data=await resp.json();
      // Stocker en localStorage
      localStorage.setItem('M5_FERIES_API_'+year, JSON.stringify(data));
      const nbFeries=Object.keys(data).length;
      results.push(`${year} : ${nbFeries} jours ✓`);
      success++;
    } catch(err) {
      results.push(`${year} : erreur (${err.message})`);
      errors++;
    }
  }

  // Mémoriser la date d'import
  localStorage.setItem('M5_FERIES_LAST_IMPORT', new Date().toISOString());

  if(btn) { btn.disabled=false; btn.textContent='📅 Importer les jours fériés'; }
  if(status) {
    status.textContent = success>0
      ? `✅ ${success} année(s) importée(s) — ${results.join(' | ')}`
      : `❌ Echec import. Vérifiez la connexion.`;
    status.style.color = success>0 ? 'var(--miz-success)' : 'var(--miz-danger)';
  }

  // Rafraîchir le calendrier avec les nouvelles données
  if(success>0) {
    Mizuki.clearCache();
    refreshUI();
    toast(`${success} année(s) de jours fériés importée(s) ✓`, 'success');
  } else {
    toast('Erreur import. Calcul local utilisé.', 'error');
  }
}

function getFeriesImportStatus() {
  const last=localStorage.getItem('M5_FERIES_LAST_IMPORT');
  if(!last) return null;
  const d=new Date(last);
  return `Dernier import : ${d.toLocaleDateString('fr-FR')} à ${d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}`;
}


// ── Grille clôtures de paie 12 mois ──────────────────────────────
const MOIS_FR=['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];

function buildCloturesGrid(stored) {
  const grid=document.getElementById('clotures-grid'); if(!grid) return;
  const year=new Date().getFullYear();
  grid.innerHTML=MOIS_FR.map((m,i)=>{
    const num=i+1;
    const val=stored[num]||'';
    return `<div style="display:flex;flex-direction:column;gap:2px;">
      <label style="font-size:11px;color:var(--miz-text3);font-weight:600;">${m}</label>
      <input type="date" id="cloture-m${num}" class="m5-input"
        style="font-size:12px;padding:4px 6px;" value="${val}">
    </div>`;
  }).join('');
}

function autofillClotures() {
  const year=new Date().getFullYear();
  for(let m=1;m<=12;m++){
    const el=document.getElementById('cloture-m'+m); if(!el) continue;
    // Dernier jour du mois
    const last=new Date(year,m,0);
    const dk=last.getFullYear()+'-'+String(last.getMonth()+1).padStart(2,'0')+'-'+String(last.getDate()).padStart(2,'0');
    el.value=dk;
  }
}


// ── WIZARD BIENVENUE ─────────────────────────────────────────────
let _wizMode='HEBDO';
let _wizNeutraliseFeries=true;
let _wizCCN=null; // {i, n, s, cap, ...}

/* 26/09/2026 : prénom (SH_PRENOM) et CCN (CCN_IDCC) choisis dans les Paramètres du menu.
   L'assistant les préremplit ; la CCN seulement pour le contrat 1 (un 2e contrat peut
   relever d'une autre convention). Tout reste modifiable, « Droit commun » compris. */
let _wizMenuFait=false;
function _wizPrefillMenu(){
  if(_wizMenuFait) return; _wizMenuFait=true;
  try{ const n=document.getElementById('wiz-name'), p=localStorage.getItem('SH_PRENOM'); if(n&&!n.value&&p) n.value=p; }catch(e){}
  try{
    if(_wizCCN||localStorage.getItem('CCN_CUSTOM')) return;
    if(window.M5_Contrats&&M5_Contrats.active!==1) return;
    const idcc=parseInt(localStorage.getItem('CCN_IDCC')||'0',10);
    if(!idcc||typeof CCN_PARTIEL_API==='undefined') return;
    const x=CCN_PARTIEL_API.getById(idcc,localStorage.getItem('CCN_NOM')); if(!x) return;
    wizPickCCN(x.i,x.n,x.s,x.cap);
  }catch(e){}
}
/* Contrat 1 déjà enregistré en droit commun : la CCN choisie dans le menu y est reprise
   une fois (M5_CCN_MENU garde l'IDCC déjà proposé : un retour manuel au droit commun
   dans Mizuki est respecté). Un contrat qui a déjà sa CCN n'est jamais modifié. */
function M5_ccnDuMenu(){
  try{
    if(window.M5_Contrats&&M5_Contrats.active!==1) return;
    if(localStorage.getItem('CCN_CUSTOM')) return;
    const idcc=parseInt(localStorage.getItem('CCN_IDCC')||'0',10); if(!idcc) return;
    if(localStorage.getItem('M5_CCN_MENU')===String(idcc)) return;
    if(typeof CCN_PARTIEL_API==='undefined'||!CCN_PARTIEL_API.getById(idcc)) return;
    const c=M5_Contract.get();
    localStorage.setItem('M5_CCN_MENU',String(idcc));
    if(!c.hoursBase||(c.idcc&&c.idcc>0)) return;
    const r=CCN_PARTIEL_API.getRules(idcc,localStorage.getItem('CCN_NOM'));
    M5_Contract.save({...c,idcc,ccnNom:r.nom,cap:r.cap,rate1:r.rate1??0.10,rate2:r.rate2??0.25,threshold:r.threshold||0.10});
    setTimeout(()=>toast('Ta convention collective est reprise du menu : '+r.nom,'success',4000),900);
  }catch(e){}
}

function wizNext(step) {
  // Validation avant de passer
  if(step===3) {
    const err=_wizHeuresErreur();
    if(err) { toast(err,'error'); return; }
  }
  _wizGo(step);
}
function wizPrev(step) { _wizGo(step); }
function wizSkip() { wizFinish(); }

function _wizGo(step) {
  _wizPrefillMenu();
  document.querySelectorAll('.wiz-step').forEach(s=>s.classList.remove('active'));
  const target=document.getElementById('wStep'+step);
  if(target) target.classList.add('active');
  const total=6;
  const pct=Math.round((step/total)*100);
  const bar=document.getElementById('wiz-progress-bar');
  const lbl=document.getElementById('wiz-step-label');
  if(bar) bar.style.width=pct+'%';
  if(lbl) lbl.textContent=`Étape ${step} sur ${total}`;
  if(step===6) {
    _wizUpdateSummary();
    _wizShowClotures();
    _wizBuildCloturesGrid();
  }
  window.scrollTo(0,0);
}

// ── Durée du contrat : semaine, mois ou an (26/09/2026) ──────────
// L'utilisateur saisit la durée telle qu'écrite sur son contrat ; tout le calcul
// reste en base hebdomadaire (hoursBase) : mois → × 12 / 52, an → ÷ 52.
// Temps plein de référence : 35 h/sem, 151,67 h/mois, 1 607 h/an (L3121-27, L3123-1).
let _wizUnite='S';
const _WIZ_UNITES={
  S:{label:"Combien d'heures par semaine selon ton contrat ?",ph:'ex : 25',plein:35,  pleinTxt:'35 h par semaine',court:'semaine',mode:'HEBDO'},
  M:{label:"Combien d'heures par mois selon ton contrat ?",  ph:'ex : 86,67',plein:151.67,pleinTxt:'151,67 h par mois',court:'mois',mode:'MENSUEL'},
  A:{label:"Combien d'heures par an selon ton contrat ?",    ph:'ex : 1 000',plein:1607,pleinTxt:'1 607 h par an',court:'an',mode:'ANNUEL'}
};
function _wizValeurSaisie(){ return parseFloat(String(document.getElementById('wiz-hours')?.value||'0').replace(',','.'))||0; }
function _wizHeuresHebdo(){
  const v=_wizValeurSaisie(); if(v<=0) return 0;
  const h=_wizUnite==='M'? v*12/52 : _wizUnite==='A'? v/52 : v;
  return Math.round(h*100)/100;
}
function _wizHeuresErreur(){
  const v=_wizValeurSaisie(), u=_WIZ_UNITES[_wizUnite];
  if(!v||v<=0) return 'Saisis tes heures contractuelles ('+u.ph+')';
  let _tp=35; try{ if(_wizCCN&&typeof CCN_PARTIEL_API!=='undefined') _tp=CCN_PARTIEL_API.getRules(_wizCCN.i,_wizCCN.n).tempsPlein||35; }catch(_){}
  const _plein=_tp===35?u.plein:(_wizUnite==='M'?_tp*52/12:_wizUnite==='A'?_tp*52:_tp);
  if(v>=_plein) return 'À partir de '+(_tp===35?u.pleinTxt:(Math.round(_plein*100)/100).toString().replace('.',',')+' h'+(_wizUnite==='S'?' par semaine':_wizUnite==='M'?' par mois':' par an'))+', c\u2019est un temps plein : Mizuki suit les temps partiels.';
  return '';
}
function wizSetUnite(u){
  if(!_WIZ_UNITES[u]) return;
  _wizUnite=u;
  ['S','M','A'].forEach(k=>document.getElementById('wiz-unite-'+k)?.classList.toggle('selected',k===u));
  const lb=document.getElementById('wiz-hours-label'); if(lb) lb.textContent=_WIZ_UNITES[u].label;
  const inp=document.getElementById('wiz-hours'); if(inp){ inp.placeholder=_WIZ_UNITES[u].ph; inp.value=''; }
  // Le mode de calcul suit l'unité du contrat (modifiable à l'étape « Comment on compte ? »)
  wizSelectMode(_WIZ_UNITES[u].mode);
  wizUpdateHoursPreview();
}
window.wizSetUnite=wizSetUnite;

// Retraite progressive : repère « X % d'un temps plein » sous la durée (26/09/2026)
function _rpMaj(prefixe, unite, valeur){
  const cb=document.getElementById(prefixe+'-retraite-prog'), info=document.getElementById(prefixe+'-rp-info');
  if(!cb||!info) return;
  if(!cb.checked||!(valeur>0)||!window.M5_rpPct){ info.style.display='none'; return; }
  const c={dureeContrat:{unite:unite,valeur:valeur},hoursBase:unite==='S'?valeur:0};
  info.innerHTML=M5_rpTexte(M5_rpPct(c),false); info.style.display='block';
}
function wizUpdateHoursPreview() {
  _rpMaj('wiz',_wizUnite,_wizValeurSaisie());
  const el=document.getElementById('wiz-hours-preview'); if(!el) return;
  const v=_wizValeurSaisie(), h=_wizHeuresHebdo();
  if(!v||v<=0) { el.textContent=''; return; }
  const f=window._m5fmtH;
  if(_wizUnite==='S') el.textContent=`soit environ ${f((h*52/12).toFixed(2))}/mois`;
  else el.textContent=`soit en moyenne ${f(h)} par semaine`+(_wizUnite==='A'?` (${f((h*52/12).toFixed(2))}/mois)`:'');
}

function wizSearchCCN(term) {
  const res=document.getElementById('wiz-ccn-results'); if(!res) return;
  if(!term||term.length<2) { res.style.display='none'; return; }
  if(typeof CCN_PARTIEL_API==='undefined') return;
  const results=CCN_PARTIEL_API.search(term);
  if(!results.length) { res.style.display='none'; return; }
  res.style.display='block';
  res.innerHTML=results.slice(0,8).map(ccn=>`
    <div onclick="wizPickCCN(${ccn.i},'${ccn.n.replace(/'/g,"\'")}','${ccn.s}',${ccn.cap})"
      style="padding:10px 12px;font-size:13px;cursor:pointer;border-bottom:1px solid rgba(167,139,250,0.15);">
      <div style="font-weight:600;color:#E9D5FF;">${ccn.n}</div>
      <div style="font-size:11px;color:#A78BFA;">${ccn.s}${ccn.renvoi?' — IDCC 3239, remplace l\'ex-IDCC '+ccn.renvoi:''} — plafond <strong style="color:#DDD6FE;">${CCN_PARTIEL_API.capLabel(ccn.cap,true)}</strong></div>
    </div>`).join('');
}

function wizPickCCN(idcc, nom, secteur, cap) {
  _wizCCN={i:idcc, n:nom, s:secteur, cap};
  const res=document.getElementById('wiz-ccn-results');
  const sel=document.getElementById('wiz-ccn-selected');
  const inp=document.getElementById('wiz-ccn-search');
  if(res) res.style.display='none';
  if(inp) inp.value=nom;
  if(sel) {
    sel.style.display='block';
    sel.innerHTML=`<strong style="color:#E9D5FF;">${nom}</strong><br>
      <span style="font-size:11px;color:#A78BFA;">Plafond HC : <strong style="color:#DDD6FE;">${CCN_PARTIEL_API.capLabel(cap)}</strong></span>${window.M5_encartCCN?M5_encartCCN(idcc,nom):''}`;
  }
}

function wizSelectDC() {
  _wizCCN=null;
  const inp=document.getElementById('wiz-ccn-search');
  const sel=document.getElementById('wiz-ccn-selected');
  const res=document.getElementById('wiz-ccn-results');
  if(inp) inp.value='';
  if(res) res.style.display='none';
  if(sel) { sel.style.display='block'; sel.innerHTML='<strong style="color:#E9D5FF;">Droit commun</strong><br><span style="font-size:11px;color:#A78BFA;">Plafond HC : 10%</span>'; }
  wizNext(4);
}

function wizSelectMode(mode) {
  _wizMode=mode;
  ['hebdo','mensuel','annuel'].forEach(m=>{
    const el=document.getElementById('wiz-mode-'+m);
    if(el) el.classList.toggle('active', m.toUpperCase()===mode);
  });
}

function wizSelectFeries(val) {
  _wizNeutraliseFeries=val;
  document.getElementById('wiz-feries-oui')?.classList.toggle('active', val);
  document.getElementById('wiz-feries-non')?.classList.toggle('active', !val);
  _wizUpdateSummary();
}

function _wizUpdateSummary() {
  const h=_wizHeuresHebdo();
  const rate=parseFloat(document.getElementById('wiz-rate')?.value||'0');
  const exercice=document.getElementById('wiz-exercice')?.value||'';
  const modeLbls={HEBDO:'Par semaine',MENSUEL:'Par mois',ANNUEL:"Sur l'année"};
  const _u=_WIZ_UNITES[_wizUnite];
  const _dur=_wizUnite==='S'?`${window._m5fmtH(h)}/semaine`:`${window._m5fmtH(_wizValeurSaisie())}/${_u.court} (≈ ${window._m5fmtH(h)}/semaine)`;
  _set('wiz-sum-hours', `⏱️ Contrat : <strong>${_dur}</strong>${rate>0?' · '+rate.toFixed(2)+' €/h':''}`);
  _set('wiz-sum-ccn',   `🏢 CCN : <strong>${_wizCCN?_wizCCN.n+' ('+CCN_PARTIEL_API.capLabel(_wizCCN.cap,true)+')':'Droit commun (10%)'}</strong>`);
  _set('wiz-sum-mode',  `📅 Mode : <strong>${modeLbls[_wizMode]||_wizMode}</strong>`);
  _set('wiz-sum-feries',`🎌 Fériés : <strong>${_wizNeutraliseFeries?"Neutralisés (L3133-3 + jurisprudence)":"Dans l'assiette (accord spécifique)"}</strong>`);
  if(exercice) _set('wiz-sum-exercice',`📆 Début exercice : <strong>${new Date(exercice+'T12:00:00').toLocaleDateString('fr-FR')}</strong>`);
}
function _set(id, html) { const el=document.getElementById(id); if(el) el.innerHTML=html; }


let _wizClotureMode='auto';

function wizSetClotureMode(mode) {
  _wizClotureMode=mode;
  // Boutons m5-quick-btn : classe selected
  document.getElementById('wiz-cloture-auto-card')?.classList.toggle('selected', mode==='auto');
  document.getElementById('wiz-cloture-manual-card')?.classList.toggle('selected', mode==='manual');
  const grid=document.getElementById('wiz-clotures-grid-bloc');
  if(grid) grid.style.display=mode==='manual'?'block':'none';
  if(mode==='manual') _wizBuildCloturesGrid();
  _wizUpdateSummary();
}

function _wizShowClotures() {
  const bloc=document.getElementById('wiz-clotures-bloc');
  if(bloc) bloc.style.display='block'; // toujours visible à l'étape 6
}

function _wizBuildCloturesGrid() {
  const grid=document.getElementById('wiz-clotures-grid'); if(!grid) return;
  const MOIS=['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
  const year=new Date().getFullYear();
  grid.innerHTML=MOIS.map((m,i)=>{
    const num=i+1;
    return `<div style="display:flex;flex-direction:column;gap:2px;">
      <label style="font-size:11px;color:var(--miz-text3);font-weight:600;">${m}</label>
      <input type="date" id="wiz-cloture-m${num}" class="m5-input"
        style="font-size:12px;padding:4px 6px;">
    </div>`;
  }).join('');
}

function wizAutofillClotures() {
  const year=new Date().getFullYear();
  for(let m=1;m<=12;m++){
    const el=document.getElementById('wiz-cloture-m'+m); if(!el) continue;
    const last=new Date(year,m,0);
    el.value=last.getFullYear()+'-'+String(last.getMonth()+1).padStart(2,'0')+'-'+String(last.getDate()).padStart(2,'0');
  }
}

function wizFinish() {
  const _err=_wizHeuresErreur();
  if(_err) { _wizGo(2); toast(_err,'error'); return; }
  const h=_wizHeuresHebdo();
  const exerciceRaw=document.getElementById('wiz-exercice')?.value||'';
  if(!exerciceRaw) {
    toast("La date de début d'exercice est obligatoire",'error');
    document.getElementById('wiz-exercice')?.focus();
    return;
  }
  // Snap au début de semaine du contrat
  const _wizStartDay=parseInt(document.getElementById('wiz-start-day')?.value||'0')||0;
  const exercice=snapExerciceStart(exerciceRaw, _wizStartDay);
  if(exercice!==exerciceRaw) {
    toast('Date ajustée au début de semaine : '+exercice,'info');
  }
  const rate=parseFloat(document.getElementById('wiz-rate')?.value||'0');
  const name=(document.getElementById('wiz-name')?.value||'').trim();
  const startDay=parseInt(document.getElementById('wiz-start-day')?.value||'0');
  const joursOuvresContrat=Math.max(1,Math.min(7,parseInt(document.getElementById('wiz-jours-ouvres')?.value||'5')||5));
  const ccnRules=_wizCCN?CCN_PARTIEL_API.getRules(_wizCCN.i,_wizCCN.n):{cap:0.10,rate1:0.10,rate2:0.25,threshold:0.10,nom:'Droit commun'};
  // Récupérer les 12 clôtures
  const cloturesDates={};
  if(_wizClotureMode==='auto') {
    // Fin de mois — utiliser le jour de clôture configuré si différent du dernier jour
    const yr=new Date().getFullYear();
    const clotureJour=parseInt(document.getElementById('wiz-cloture-jour')?.value||'0')||0;
    for(let m=1;m<=12;m++){
      let jour;
      if(clotureJour>0&&clotureJour<=28) {
        // Jour fixe (ex: 25 de chaque mois)
        jour=new Date(yr,m-1,clotureJour);
      } else {
        // Dernier jour du mois
        jour=new Date(yr,m,0);
      }
      cloturesDates[m]=jour.getFullYear()+'-'+String(jour.getMonth()+1).padStart(2,'0')+'-'+String(jour.getDate()).padStart(2,'0');
    }
  } else {
    for(let m=1;m<=12;m++){
      const el=document.getElementById('wiz-cloture-m'+m);
      if(el&&el.value) cloturesDates[m]=el.value;
    }
  }
  M5_Contract.save({
    hoursBase:h, hourlyRate:rate||0,
    idcc:_wizCCN?_wizCCN.i:0,
    ccnNom:_wizCCN?_wizCCN.n:'Droit commun',
    cap:ccnRules.cap||0.10,
    rate1:ccnRules.rate1??0.10,
    rate2:ccnRules.rate2??0.25,
    threshold:ccnRules.threshold||0.10,
    weekStartDay:startDay,
    joursOuvresContrat:joursOuvresContrat,
    exerciceStart:exercice,
    cloturesDates,
    modeCalcul:_wizMode,
    neutraliseFeries:_wizNeutraliseFeries,
    dureeContrat:{unite:_wizUnite,valeur:_wizValeurSaisie()},
    retraiteProgressive:!!document.getElementById('wiz-retraite-prog')?.checked,
  });
  if(name) localStorage.setItem('M5_USER_NAME', name);
  calendarMonday=M5_getCurrentMonday();
  Mizuki.clearCache();
  toast('Bienvenue'+(name?' '+name+' !':'')+'! Mizuki est prête 🦊','success');
  // FIX : supprimer le style anti-flash qui bloquait le switch wizard → vue principale
  // (avec !important, il empêchait refreshUI() de modifier display)
  try {
    const _af = document.getElementById('m5-antiflash-style');
    if (_af && _af.parentNode) _af.parentNode.removeChild(_af);
  } catch(_) {}
  refreshUI();
  // Multi-contrat : « Oui » à la dernière étape → on crée tout de suite le contrat suivant
  if(_wizAutreContrat && window.M5_Contrats && M5_Contrats.existing().length<3){
    _wizAutreContrat=false;
    setTimeout(function(){ M5_Contrats.add(); }, 600);
  }
}

// Multi-contrat (26/09/2026) : question « un autre contrat ? » dans l'assistant
let _wizAutreContrat=false;
function wizSetAutreContrat(oui){
  _wizAutreContrat=!!oui;
  document.getElementById('wiz-autre-oui')?.classList.toggle('selected',!!oui);
  document.getElementById('wiz-autre-non')?.classList.toggle('selected',!oui);
  const info=document.getElementById('wiz-autre-info');
  if(info) info.textContent=oui
    ? 'Après « Commencer », tu donneras un nom à ton 2ᵉ contrat et je te poserai les mêmes questions pour lui.'
    : 'Tu pourras en ajouter un à tout moment : ⚙️ Mon contrat → tout en bas, « 👥 Plusieurs employeurs ? ».';
}
window.wizSetAutreContrat=wizSetAutreContrat;
// Question masquée si le maximum de 3 contrats serait déjà atteint
(function(){try{
  const b=document.getElementById('wiz-autre-contrat');
  if(b && window.M5_Contrats){
    const ex=M5_Contrats.existing(), act=M5_Contrats.active;
    const apres=ex.length+(ex.indexOf(act)<0?1:0);
    if(apres>=3) b.style.display='none';
    else if(ex.length>0 && ex.indexOf(act)<0){
      const t=b.querySelector('div[style*="font-weight:700"]'); if(t) t.textContent='👥 As-tu encore un autre contrat à suivre ?';
      const i=document.getElementById('wiz-autre-info'); if(i&&!_wizAutreContrat) i.textContent='Tu pourras en ajouter un à tout moment : ⚙️ Mon contrat → tout en bas, « 👥 Plusieurs employeurs ? ».';
    }
  }
}catch(_){}})();


// ── Export / Import JSON ──────────────────────────────────────────
function exportDataJSON() {
  try {
    const backup = { version:1, exportedAt:new Date().toISOString(), data:{} };
    // Récupérer toutes les clés M5_
    for(let i=0;i<localStorage.length;i++) {
      const k=localStorage.key(i);
      if(k&&k.startsWith('M5_')) backup.data[k]=localStorage.getItem(k);
    }
    const json=JSON.stringify(backup,null,2);
    const blob=new Blob([json],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.style.display='none';
    const d=new Date();
    a.download=`mizuki-backup-${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
    toast('Données exportées ✓','success');
  } catch(e) {
    toast('Erreur export : '+e.message,'error');
  }
}

function importDataJSON(input) {
  const file=input.files&&input.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=e=>{
    try {
      const backup=JSON.parse(e.target.result);
      if(!backup.data||typeof backup.data!=='object') throw new Error('Format invalide');
      const keys=Object.keys(backup.data);
      if(keys.length===0) throw new Error('Aucune donnée trouvée');
      // Restaurer toutes les clés M5_
      keys.forEach(k=>{ if(k.startsWith('M5_')) localStorage.setItem(k,backup.data[k]); });
      const status=document.getElementById('import-status');
      if(status) status.textContent=`✓ ${keys.length} clés restaurées depuis ${backup.exportedAt?new Date(backup.exportedAt).toLocaleDateString('fr-FR'):'fichier inconnu'}`;
      Mizuki.clearCache();
      calendarMonday=M5_getCurrentMonday();
      toast('Données importées avec succès ✓','success');
      setTimeout(()=>refreshUI(),300);
    } catch(err) {
      toast('Erreur import : '+err.message,'error');
    }
    input.value=''; // reset pour permettre un re-import du même fichier
  };
  reader.readAsText(file);
}

window.exportDataJSON=exportDataJSON; window.importDataJSON=importDataJSON;

// ── Saisie rapide depuis l'accueil ────────────────────────────────
function quickSave(hours) {
  try {
    if(window.M5_isDayLocked&&window.M5_isDayLocked(calendarMonday)){ toast('Période verrouillée 🔒 — déverrouille-la pour saisir','info'); return; }
    if(!hours||isNaN(hours)||hours<=0||hours>=((M5_Contract.get().tempsPlein>35)?60:35)) return;
    const year=M5_DataStore.getYear();
    M5_DataStore.saveWeekTotal(calendarMonday, hours, year);
    Mizuki.clearCache();
    toast(`${window._m5fmtH(hours)} sauvegardées ✓`,'success');
    refreshUI();
    if(currentSection==='stats') renderStats();
  } catch(e) { toast('Erreur sauvegarde: '+e.message,'error'); }
}
window.quickSave=quickSave;

function switchToDayMode(mondayStr) {
  if(!confirm('Passer en saisie journalière ? Le total hebdomadaire sera supprimé pour cette semaine.')) return;
  const year=M5_DataStore.getYear();
  // Supprimer la saisie hebdomadaire via deleteWeek
  M5_DataStore.deleteWeek(mondayStr, year);
  Mizuki.clearCache();
  refreshUI();
  toast('Mode journalier activé — tap sur chaque jour pour saisir','success');
}
window.switchToDayMode=switchToDayMode;
window.showSection=showSection;
window.searchCCN=searchCCN;
window.selectCCN=selectCCN; window.openModal=openModal; window.closeModal=closeModal;
window.openDaySaisie=openDaySaisie; window.selectQuickHour=selectQuickHour;
window.updateDayPreview=updateDayPreview; window.saveDaySaisie=saveDaySaisie;
window.deleteDaySaisie=deleteDaySaisie;
window.openWeeklySaisie=openWeeklySaisie; window.selectWeekQuick=selectWeekQuick;
window.updateWeekPreview=updateWeekPreview; window.saveWeeklySaisie=saveWeeklySaisie;
window.deleteWeeklySaisie=deleteWeeklySaisie;
window.calPrev=calPrev; window.calNext=calNext; window.calToday=calToday;
window.goToWeek=goToWeek; window.openMizukiPopup=openMizukiPopup;
window.toggleVacSemaine=toggleVacSemaine;
window.saveDaySaisieOrClose=saveDaySaisieOrClose;
window.saveWeeklySaisieOrClose=saveWeeklySaisieOrClose;
window.toggleAvenat=toggleAvenat;
window.importFeriesAPI=importFeriesAPI;
window.autofillClotures=autofillClotures;
window.calChangeYear=calChangeYear;
window.wizNext=wizNext; window.wizPrev=wizPrev; window.wizSkip=wizSkip;
window.wizSearchCCN=wizSearchCCN; window.wizPickCCN=wizPickCCN;
window.wizSelectDC=wizSelectDC; window.wizSelectMode=wizSelectMode;
window.wizSelectFeries=wizSelectFeries; window.wizFinish=wizFinish;
window.wizUpdateHoursPreview=wizUpdateHoursPreview;
window.wizAutofillClotures=wizAutofillClotures;
window.wizSetClotureMode=wizSetClotureMode;
window.goToMonth=goToMonth;
window.renderPeriodeNav=renderPeriodeNav;
window.goToPeriode=goToPeriode;
window.buildPeriodes=buildPeriodes;
// ── Ponts vers les IIFE "bac à sable" (carte HC + calendrier mensuel) ──
// calendarMonday / refreshUI / _currentPeriode sont privés à cette IIFE.
// On expose des accesseurs LIVE (closures) pour que le report HC, la clé de
// paiement par semaine/période et le rafraîchissement au changement de vue
// suivent réellement la semaine affichée.
window.M5_getCalMonday=function(){ return calendarMonday; };
window.M5_setCalMonday=function(v){ if(v) calendarMonday=v; };
window.M5_refreshUI=refreshUI;
window.M5_getCurrentPeriode=function(){ return _currentPeriode; };
// ── Verrouillage par période : gèle la SAISIE d'une période donnée ──
// (les autres périodes restent modifiables ; la navigation n'est jamais bloquée)
function _lockMap(){ try{ return JSON.parse(localStorage.getItem(M5_key('M5_PERIODE_LOCKS'))||'{}'); }catch(e){ return {}; } }
window.M5_isDayLocked=function(dk){ if(!dk) return false; var m=_lockMap(); for(var k in m){ if(dk>=k && dk<=m[k]) return true; } return false; };
// Période "active" = celle qui contient calendarMonday (= ce qu'affiche la barre)
function _activePeriode(){
  try{
    var c=M5_Contract.get();
    var yr=(calendarMonday||'').slice(0,4)||M5_DataStore.getYear();
    var pers=buildPeriodes(yr, c)||[];
    var i;
    for(i=0;i<pers.length;i++){ if(calendarMonday>=pers[i].debutStr && calendarMonday<=pers[i].finStr) return pers[i]; }
    // repli : période contenant aujourd'hui
    var tk=M5_localDK(new Date());
    for(i=0;i<pers.length;i++){ if(tk>=pers[i].debutStr && tk<=pers[i].finStr) return pers[i]; }
  }catch(e){}
  return null;
}
window.M5_periodeAffichee=function(){
  // Période contenant la semaine affichée, avec les clôtures de l'exercice affiché (y compris projeté)
  try{ var cm=calendarMonday, y=M5_DataStore.getYear(), c0=M5_Contract.get();
    var cp=window.M5_contratPourAnnee?M5_contratPourAnnee(String(y),c0):c0, ys=[String(y),String(parseInt(y,10)-1),String(parseInt(y,10)+1)];
    for(var k=0;k<ys.length;k++){ var pers=buildPeriodes(ys[k],cp)||[]; for(var i=0;i<pers.length;i++){ if(pers[i].debutStr&&cm>=pers[i].debutStr&&cm<=pers[i].finStr) return pers[i]; } }
  }catch(e){}
  return null; };
window.M5_isActivePeriodeLocked=function(){ var p=_activePeriode(); return !!(p && _lockMap()[p.debutStr]); };
window.M5togglePeriodeLock=function(){
  var p=_activePeriode();
  if(!p){ toast('Aucune période à verrouiller ici','info'); return; }
  var m=_lockMap(), on=!m[p.debutStr];
  if(on) m[p.debutStr]=p.finStr; else delete m[p.debutStr];
  try{ localStorage.setItem(M5_key('M5_PERIODE_LOCKS'), JSON.stringify(m)); }catch(e){}
  // Retour visuel IMMÉDIAT (le re-render lourd est différé → 1 seul tap suffit)
  var b=document.getElementById('periode-lock-btn');
  if(b){ b.textContent=on?'🔒':'🔓'; b.classList.toggle('locked', on); b.setAttribute('aria-pressed', on?'true':'false'); }
  toast(on?('Période verrouillée 🔒 — '+p.label):('Période déverrouillée 🔓 — '+p.label),'info');
  requestAnimationFrame(refreshUI);
};
window.openYearsPopup=openYearsPopup;
window.switchYear=switchYear;
window.createNewYear=createNewYear;
window.checkPrevenance=checkPrevenance;
window.openContractModal=openContractModal; window.saveContract=saveContract;
window.exportPDF=exportPDF;
// Snackbar Android après export PDF : confirme + bouton "Ouvrir"
window.M5_pdfSnackbar=function(blob, filename){
  try{
    var old=document.getElementById('m5-pdf-snack'); if(old) old.remove();
    var url=URL.createObjectURL(blob);
    var s=document.createElement('div'); s.id='m5-pdf-snack';
    s.style.cssText='position:fixed;left:12px;right:12px;bottom:calc(74px + env(safe-area-inset-bottom,0px));z-index:9999;background:#1a1040;border:1px solid rgba(196,168,255,0.45);border-radius:13px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px;box-shadow:0 8px 28px rgba(0,0,0,0.5);';
    var sp=document.createElement('span'); sp.textContent='📄 PDF enregistré dans tes fichiers'; sp.style.cssText='color:#fff;font-size:13px;font-weight:600;flex:1;';
    var b=document.createElement('button'); b.textContent='Ouvrir'; b.style.cssText='background:#9B5CF8;color:#fff;border:none;border-radius:9px;padding:9px 18px;font-size:13px;font-weight:800;white-space:nowrap;';
    b.onclick=function(){
      try{
        var file=new File([blob], filename||'document.pdf', {type:'application/pdf'});
        if(navigator.canShare && navigator.canShare({files:[file]})){ navigator.share({files:[file], title:'Heures complémentaires'}).catch(function(){ window.open(url,'_blank'); }); }
        else { window.open(url,'_blank'); }
      }catch(e){ try{ window.open(url,'_blank'); }catch(_){} }
      if(s.parentNode) s.remove();
    };
    s.appendChild(sp); s.appendChild(b);
    document.body.appendChild(s);
    setTimeout(function(){ if(s.parentNode) s.remove(); }, 12000);
  }catch(e){}
};
window.openPDFModal=openPDFModal;
window.launchPDF=launchPDF;
window.updatePDFPreview=updatePDFPreview;
window.M5_toast=toast;
window.filterGlossaire=filterGlossaire;
window.toggleGlos=toggleGlos;

document.addEventListener('DOMContentLoaded',()=>{
  M5_ccnDuMenu();
  initCCNSelect(); showSection('accueil'); updateYearBadge(); refreshUI();
  document.documentElement.classList.remove('m5-attente'); // premier affichage réel : on montre
  setInterval(()=>{ if(currentSection==='accueil') refreshUI(); },15000);
});

}());


/* ═══════════════════════════════════════════════════════════════
   AJOUT (bac à sable) — Compteur HC avec REPORT CONTINU, multi-mode.
   MENSUEL : report par période de paye. HEBDO : report semaine par semaine.
   ANNUEL : pas de carte HC (annualisation). Deux cases payé (+10%/+25%),
   montant € par tranche (flouté/toggle), affichage au quart d'heure.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  function _mode(){ try{ return (typeof M5_Contract!=='undefined'&&M5_Contract.get)?(M5_Contract.get().modeCalcul||'HEBDO'):'HEBDO'; }catch(e){ return 'HEBDO'; } }
  function _year(){ try{ return M5_DataStore.getYear(); }catch(e){ return ''; } }
  // Bornes de la période affichée, TOUJOURS résolues (jamais 'default') pour un suivi payé par période
  function _currentPeriodBounds(){
    // Dérive de calendarMonday EXACTEMENT comme le bilan (pCourante), pour que
    // la clé du paiement suive la période affichée (sinon le paiement persiste).
    try{
      var todayS=(new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,'0')+'-'+String(new Date().getDate()).padStart(2,'0'));
      if(typeof buildPeriodes==='function'){
        var c=M5_Contract.get(), pers=buildPeriodes(_year(), c)||[];
        var ref=(window.M5_getCalMonday&&window.M5_getCalMonday())||todayS;
        for(var i=0;i<pers.length;i++){ if(pers[i].debutStr && ref>=pers[i].debutStr && ref<=pers[i].finStr) return pers[i]; }
        for(var j=0;j<pers.length;j++){ if(pers[j].debutStr && todayS>=pers[j].debutStr && todayS<=pers[j].finStr) return pers[j]; }
      }
      var _cp=(window.M5_getCurrentPeriode&&window.M5_getCurrentPeriode()); if(_cp && _cp.debutStr) return _cp;
    }catch(e){}
    return null;
  }
  function _getPaidMap(){ try{ return JSON.parse(localStorage.getItem(M5_key('M5_HC_PAID'))||'{}'); }catch(e){ return {}; } }
  function _periodKey(){
    try{
      var m=_mode();
      if(m==='HEBDO') return 'week:'+((window.M5_getCalMonday&&window.M5_getCalMonday())||'');
      if(m==='ANNUEL') return 'annuel:'+_year();
      var b=_currentPeriodBounds(); return (b && b.debutStr) ? ('per:'+b.debutStr) : ('mois:'+_year());
    }catch(e){ return 'default'; }
  }
  function _getPaid(k){ var m=_getPaidMap()[k]||{}; return { h10:+m.h10||0, h25:+m.h25||0 }; }
  function _savePaid(tranche, v){
    var m=_getPaidMap(), k=_periodKey(); if(!m[k]||typeof m[k]!=='object') m[k]={};
    m[k][tranche]=Math.round(_parseHM(v)*100)/100;
    try{ localStorage.setItem(M5_key('M5_HC_PAID'), JSON.stringify(m)); }catch(e){}
  }
  function _fmtH(h){ var s=h<0?'-':''; h=Math.abs(h); var hh=Math.floor(h+1e-9), mm=Math.round((h-hh)*60); if(mm===60){hh++;mm=0;} return s+hh+'h'+(mm?String(mm).padStart(2,'0'):''); }
  window._m5fmtH=_fmtH;
  function _parseHM(v){
    v=String(v==null?'':v).trim().toLowerCase().replace(',','.');
    if(!v) return 0;
    var m=v.match(/^(\d+)\s*[h:]\s*(\d*)$/);
    if(m) return Math.max(0,(+m[1])+(m[2]?(+m[2])/60:0));
    return Math.max(0,parseFloat(v)||0);
  }

  // Début d'exercice en ISO (gère "YYYY-MM-DD" et ancien "DD/MM" rattaché à N-1)
  function _exStartISO(c){
    try{ var es=c.exerciceStart||'';
      if(/^\d{4}-\d{2}-\d{2}$/.test(es)) return es;
      if(es.indexOf('/')>=0){ var p=es.split('/'), dd=parseInt(p[0]||'1'), mm=parseInt(p[1]||'1'), y=parseInt(_year())-1;
        return y+'-'+String(mm).padStart(2,'0')+'-'+String(dd).padStart(2,'0'); }
    }catch(e){}
    return _year()+'-01-01';
  }
  // Toutes les semaines de l'exercice, même à cheval sur l'année civile (déc N-1 → …)
  function _allExerciseWeeks(c){
    var year=parseInt(_year()), start=_exStartISO(c);
    var endD=new Date(start+'T12:00:00'); endD.setFullYear(endD.getFullYear()+1);
    var end=endD.getFullYear()+'-'+String(endD.getMonth()+1).padStart(2,'0')+'-'+String(endD.getDate()).padStart(2,'0');
    var seen={}, all=[];
    [year-1, year, year+1].forEach(function(y){
      var ws=[]; try{ ws=M5_DataStore.getWeeksSorted(String(y))||[]; }catch(e){}
      ws.forEach(function(w){ if(!seen[w.monday] && w.monday>=start){ seen[w.monday]=1; all.push(w); } });
    });
    all.sort(function(a,b){ return a.monday<b.monday?-1:1; });
    return all;
  }

  function _allWeeksRaw(){
    var year=parseInt(_year()), seen={}, all=[];
    [year-1, year, year+1].forEach(function(y){
      var ws=[]; try{ ws=M5_DataStore.getWeeksSorted(String(y))||[]; }catch(e){}
      ws.forEach(function(w){ if(!seen[w.monday]){ seen[w.monday]=1; all.push(w); } });
    });
    all.sort(function(a,b){ return a.monday<b.monday?-1:1; });
    return all;
  }
  function _weeksInPeriode(allWeeks, per){
    return allWeeks.filter(function(w){ var e=new Date(w.monday+'T12:00:00'); e.setDate(e.getDate()+6);
      var es=e.getFullYear()+'-'+String(e.getMonth()+1).padStart(2,'0')+'-'+String(e.getDate()).padStart(2,'0');
      return w.monday<=per.finStr && es>=per.debutStr; });
  }
  // MENSUEL : report entrant = non payé cumulé sur les périodes précédentes
  function _computeReport(c){
    var out={h10:0,h25:0};
    try{
      if(typeof buildPeriodes!=='function'||typeof CalcEngine==='undefined'||typeof M5_DataStore==='undefined') return out;
      var bnds=_currentPeriodBounds(); if(!bnds||!bnds.debutStr) return out;
      var year=_year(), periodes=buildPeriodes(year,c)||[], allWeeks=_allWeeksRaw(), pm=_getPaidMap();
      var cur=bnds.debutStr, b10=0,b25=0, _dep=_exoDebut(); if(_dep&&cur<_dep) _dep=null; var _rp=_repExoPour(_dep);
      if(_dep&&_rp&&_rp.choix==='report'){ b10=+_rp.h10||0; b25=+_rp.h25||0; }
      for(var i=0;i<periodes.length;i++){ var per=periodes[i]; if(!per.debutStr||per.debutStr>=cur) break; if(_dep&&per.debutStr<_dep) continue;
        var wks=_weeksInPeriode(allWeeks,per);
        var nbJ=Math.round((new Date(per.finStr+'T12:00:00')-new Date(per.debutStr+'T12:00:00'))/86400000)+1;
        var r=CalcEngine.calcMonth(c.hoursBase,wks,c,(c.hourlyRate||c.rate||0),nbJ);
        var paid=pm['per:'+per.debutStr]||pm[per.debutStr]||{};
        b10=Math.max(0,b10+(r.compH1||0)-(+paid.h10||0)); b25=Math.max(0,b25+(r.compH2||0)-(+paid.h25||0)); }
      out.h10=Math.round(b10*100)/100; out.h25=Math.round(b25*100)/100;
    }catch(e){}
    return out;
  }
  // Options calcWeek IDENTIQUES à l'analyse principale (fériés → seuil abaissé,
  // Art. L3133-3). Sans ça, report/solde et carte semaine divergeaient.
  function _weekOpts(c, mondayStr){
    var fm=null; try{ if(typeof M5_getFeriesYear!=='undefined') fm=M5_getFeriesYear(parseInt((mondayStr||'').slice(0,4))); }catch(e){}
    var wdm={}; try{ if(window.M5_workedDaysMap) wdm=window.M5_workedDaysMap(mondayStr,(mondayStr||'').slice(0,4)); }catch(e){}
    return { feriesMap:fm, neutraliseFeries: c.neutraliseFeries===true || c.neutraliseFeries===undefined, mondayStr:mondayStr, joursOuvresContrat: c.joursOuvresContrat||5, workedDaysMap:wdm };
  }
  // HEBDO : report = solde non payé cumulé sur les semaines AVANT la semaine affichée
  /* 27/09/2026 : reste de l'exercice précédent — M5_REPORT_EXO {from, to, h10, h25, choix}.
     « report » : ces heures ouvrent le report du nouvel exercice ; « garder » : le nouvel
     exercice repart de zéro (elles restent dans le bilan de l'ancien). Sans choix, rien ne change. */
  function _repExo(){ try{ var r=JSON.parse(localStorage.getItem(M5_key('M5_REPORT_EXO'))||'null'); return (r&&r.to&&r.choix)?r:null; }catch(e){ return null; } }
  window.M5_repExo=_repExo;
  /* 27/09/2026 : choix gardé PAR exercice (M5_REPORT_EXOS {to: {...}}) ; l'ancien
     enregistrement unique M5_REPORT_EXO reste lu s'il concerne cet exercice. */
  function _repExoPour(to){ if(!to) return null;
    try{ var m=JSON.parse(localStorage.getItem(M5_key('M5_REPORT_EXOS'))||'{}')||{}; if(m[to]&&m[to].choix) return m[to]; }catch(e){}
    var r=_repExo(); return (r&&r.to===to)?r:null; }
  window.M5_repExoPour=_repExoPour;
  /* Début de l'exercice affiché : le report repart de zéro à chaque exercice
     (le reste de l'exercice précédent n'y entre que si l'utilisateur a choisi de le reporter). */
  function _exoDebut(){ try{ var c0=M5_Contract.get(), cp=window.M5_contratPourAnnee?M5_contratPourAnnee(String(_year()),c0):c0; return (cp&&cp.exerciceStart)||null; }catch(e){ return null; } }
  function _computeHebdoReport(c, curMonday){
    var out={h10:0,h25:0};
    try{ if(!curMonday) return out;
      var _dep=_exoDebut(); if(_dep&&curMonday<_dep) _dep=null; var _rp=_repExoPour(_dep);
      var wks=_allWeeksRaw(), pm=_getPaidMap();
      // Toutes les semaines à traiter AVANT curMonday : celles qui ont des heures
      // travaillées ET/OU un paiement saisi (sinon un paiement sur une semaine
      // sans heures n'était jamais soustrait → cascade cassée).
      var workedMap={}; wks.forEach(function(w){ workedMap[w.monday]=(w.worked!=null?w.worked:(w.hours||0)); });
      var set={};
      wks.forEach(function(w){ if(w.monday<curMonday) set[w.monday]=1; });
      Object.keys(pm).forEach(function(k){ if(k.indexOf('week:')===0){ var mday=k.slice(5); if(mday && mday<curMonday) set[mday]=1; } });
      var sorted=Object.keys(set).sort();
      var b10=0,b25=0;
      if(_dep){ sorted=sorted.filter(function(m){return m>=_dep;}); if(_rp&&_rp.choix==='report'){ b10=+_rp.h10||0; b25=+_rp.h25||0; } }
      for(var i=0;i<sorted.length;i++){
        var mday=sorted[i];
        var wk=(workedMap[mday]!=null?workedMap[mday]:0);
        var r=(wk>0)?CalcEngine.calcWeek(c.hoursBase,wk,c,(c.hourlyRate||c.rate||0),_weekOpts(c,mday)):{compH1:0,compH2:0};
        var paid=pm['week:'+mday]||{};
        b10=Math.max(0,b10+(r.compH1||0)-(+paid.h10||0));
        b25=Math.max(0,b25+(r.compH2||0)-(+paid.h25||0));
      }
      out.h10=Math.round(b10*100)/100; out.h25=Math.round(b25*100)/100;
    }catch(e){}
    return out;
  }

  /* 27/09/2026 : heures complémentaires d'un EXERCICE avec le moteur de la carte Solde
     (fériés, jours travaillés, périodes de paie en mode mensuel). Dues par taux, payées
     (cases cochées), reste en fin d'exercice (report semaine après semaine, ou période après
     période). Le bilan de fin d'exercice et le bandeau « reste dû » utilisent ces chiffres. */
  /* Semaines d'un exercice quelconque (pas seulement autour de l'année affichée) */
  function _weeksEntre(deb,fin){ var seen={},all=[];
    for(var y=parseInt(deb,10)-1;y<=parseInt(fin,10)+1;y++){ try{ (M5_DataStore.getWeeksSorted(String(y))||[]).forEach(function(w){ if(!seen[w.monday]){ seen[w.monday]=1; all.push(w); } }); }catch(e){} }
    all.sort(function(a,b){ return a.monday<b.monday?-1:1; }); return all; }
  /* 27/09/2026 : heures complémentaires d'UNE semaine, moteur de la carte Solde (fériés chômés
     neutralisés, jours travaillés). Utilisé par le PDF pour que bilan, tableau et paiement concordent. */
  window.M5_hcSemaine=function(c,monday,worked){
    try{ if(!(worked>0)||!c||!c.hoursBase) return {c1:0,c2:0,ferie:false};
      const r=CalcEngine.calcWeek(c.hoursBase,worked,c,0,_weekOpts(c,monday));
      const seuilBase=Math.max(0,worked-c.hoursBase);
      return {c1:r.compH1||0,c2:r.compH2||0,ferie:((r.compH1||0)+(r.compH2||0))>seuilBase+0.001};
    }catch(e){ return null; }
  };
  window.M5_hcExercice=function(c,deb,fin,paidKey){
    var o={d10:0,d25:0,p10:0,p25:0,r10:0,r25:0,sem:0};
    try{
      var pm={};try{pm=JSON.parse(localStorage.getItem(paidKey||M5_key('M5_HC_PAID'))||'{}')||{};}catch(e){}
      var rp=_repExoPour(deb),b10=0,b25=0;
      if(rp&&rp.choix==='report'){b10=+rp.h10||0;b25=+rp.h25||0;}
      var raw=_weeksEntre(deb,fin),all=raw.filter(function(w){return w.monday>=deb&&w.monday<=fin;}),rate=(c.hourlyRate||c.rate||0);
      if((c.modeCalcul||'HEBDO')==='MENSUEL'&&typeof buildPeriodes==='function'){
        var vu={},pers=[];
        for(var y=parseInt(deb,10);y<=parseInt(fin,10);y++)(buildPeriodes(String(y),c)||[]).forEach(function(p){if(p.debutStr&&p.debutStr>=deb&&p.finStr<=fin&&!vu[p.debutStr]){vu[p.debutStr]=1;pers.push(p);}});
        pers.sort(function(a,b){return a.debutStr<b.debutStr?-1:1;});
        pers.forEach(function(per){var wks=_weeksInPeriode(raw,per);if(!wks.length)return;o.sem+=wks.length;
          var nbJ=Math.round((new Date(per.finStr+'T12:00:00')-new Date(per.debutStr+'T12:00:00'))/86400000)+1;
          var r=CalcEngine.calcMonth(c.hoursBase,wks,c,rate,nbJ),pd=pm['per:'+per.debutStr]||pm[per.debutStr]||{};
          var pw={h10:0,h25:0};Object.keys(pm).forEach(function(k){if(k.indexOf('week:')===0){var m=k.slice(5);if(m>=per.debutStr&&m<=per.finStr){pw.h10+=+(pm[k].h10)||0;pw.h25+=+(pm[k].h25)||0;}}});
          var q10=(+pd.h10||0)+pw.h10,q25=(+pd.h25||0)+pw.h25;
          o.d10+=r.compH1||0;o.d25+=r.compH2||0;o.p10+=q10;o.p25+=q25;
          b10=Math.max(0,b10+(r.compH1||0)-q10);b25=Math.max(0,b25+(r.compH2||0)-q25);});
      }else{
        all.forEach(function(w){var wk=(w.worked!=null?w.worked:(w.hours||0));if(!(wk>0))return;o.sem++;
          var r=CalcEngine.calcWeek(c.hoursBase,wk,c,rate,_weekOpts(c,w.monday)),pd=pm['week:'+w.monday]||{};
          o.d10+=r.compH1||0;o.d25+=r.compH2||0;o.p10+=+pd.h10||0;o.p25+=+pd.h25||0;
          b10=Math.max(0,b10+(r.compH1||0)-(+pd.h10||0));b25=Math.max(0,b25+(r.compH2||0)-(+pd.h25||0));});
      }
      o.r10=b10;o.r25=b25;
      Object.keys(o).forEach(function(k){o[k]=Math.round(o[k]*100)/100;});
    }catch(e){}
    return o;
  };

  window._m5UpdateNet=function(){
    var card=document.getElementById('m5-solde-card'); if(!card) return;
    var due10=+card.getAttribute('data-due10')||0, due25=+card.getAttribute('data-due25')||0;
    var rate=+card.getAttribute('data-rate')||0, r1=(card.getAttribute('data-r1')!=null?+card.getAttribute('data-r1'):0.10), r2=(card.getAttribute('data-r2')!=null?+card.getAttribute('data-r2'):0.25);
    var p=_getPaid(_periodKey());
    var n10=Math.max(0,due10-p.h10), n25=Math.max(0,due25-p.h25), nT=Math.round((n10+n25)*100)/100;
    function set(id,t){ var e=document.getElementById(id); if(e) e.textContent=t; }
    if(card.getAttribute('data-uni')==='1') set('m5-rep-10',_fmtH(nT)); // 04/10/2026 : une seule tranche affichée
    else { set('m5-rep-10',_fmtH(n10)); set('m5-rep-25',_fmtH(n25)); }
    set('m5-net-h',_fmtH(nT)); set('m5-hdr-net',_fmtH(nT));
    var eEl=document.getElementById('m5-net-eur');
    if(eEl) eEl.textContent = rate>0 ? ((n10*rate*(1+r1)+n25*rate*(1+r2)).toFixed(2)+' €') : '—';
  };
  window.M5setHCPaid10=function(v){ _savePaid('h10',v); window._m5UpdateNet(); };
  window.M5setHCPaid25=function(v){ _savePaid('h25',v); window._m5UpdateNet(); };
  function _savePaidHM(tranche, part, v){
    var m=_getPaidMap(), k=_periodKey(); if(!m[k]||typeof m[k]!=='object') m[k]={};
    var cur=+m[k][tranche]||0, h=Math.floor(cur+1e-9), min=Math.round((cur-h)*60); if(min===60){h++;min=0;}
    if(part==='h') h=Math.max(0,parseInt(String(v),10)||0);
    else min=Math.max(0,Math.min(59,parseInt(String(v),10)||0));
    m[k][tranche]=Math.round((h+min/60)*100)/100;
    try{ localStorage.setItem(M5_key('M5_HC_PAID'), JSON.stringify(m)); }catch(e){}
  }
  /* 04/10/2026 : taux égaux (ex. 3239 : taux normal / taux normal) → un seul champ « payé ».
     Le total saisi est réparti d'abord sur la 1re tranche (jusqu'à son dû), le reste sur la 2e :
     les reports par tranche restent justes. */
  function _savePaidUni(part, v){
    var card=document.getElementById('m5-solde-card');
    var due10=card?(+card.getAttribute('data-due10')||0):0;
    var m=_getPaidMap(), k=_periodKey(); if(!m[k]||typeof m[k]!=='object') m[k]={};
    var cur=(+m[k].h10||0)+(+m[k].h25||0), h=Math.floor(cur+1e-9), min=Math.round((cur-h)*60); if(min===60){h++;min=0;}
    if(part==='h') h=Math.max(0,parseInt(String(v),10)||0);
    else min=Math.max(0,Math.min(59,parseInt(String(v),10)||0));
    var tot=Math.round((h+min/60)*100)/100, a10=Math.min(tot,due10);
    m[k].h10=Math.round(a10*100)/100; m[k].h25=Math.round((tot-a10)*100)/100;
    try{ localStorage.setItem(M5_key('M5_HC_PAID'), JSON.stringify(m)); }catch(e){}
  }
  window.M5setHCPaidUh=function(v){ _savePaidUni('h',v); window._m5UpdateNet(); };
  window.M5setHCPaidUm=function(v){ _savePaidUni('m',v); window._m5UpdateNet(); };
  window.M5setHCPaid10h=function(v){ _savePaidHM('h10','h',v); window._m5UpdateNet(); };
  window.M5setHCPaid10m=function(v){ _savePaidHM('h10','m',v); window._m5UpdateNet(); };
  window.M5setHCPaid25h=function(v){ _savePaidHM('h25','h',v); window._m5UpdateNet(); };
  window.M5setHCPaid25m=function(v){ _savePaidHM('h25','m',v); window._m5UpdateNet(); };
  // Paiement au niveau de la PÉRIODE (vue mois) : le champ représente le total payé
  // de la période ; on ajuste la semaine de début pour atteindre ce total (les
  // paiements déjà saisis par semaine en vue semaine sont conservés).
  window.M5setHCPaidPeriode=function(debutStr, finStr, tranche, part, v, due10){
    if(tranche==='u'){ // 04/10/2026 : taux égaux, un seul champ pour la période
      var pmU=_getPaidMap(), t={h10:0,h25:0}, dk={h10:0,h25:0};
      Object.keys(pmU).forEach(function(k){ if(k.indexOf('week:')===0){ var md=k.slice(5); if(md>=debutStr && md<=finStr){ ['h10','h25'].forEach(function(tr){ var val=+((pmU[k]||{})[tr])||0; t[tr]+=val; if(md===debutStr) dk[tr]=val; }); } } });
      var curU=t.h10+t.h25, hU=Math.floor(curU+1e-9), mU=Math.round((curU-hU)*60); if(mU===60){hU++;mU=0;}
      if(part==='h') hU=Math.max(0,parseInt(String(v),10)||0); else mU=Math.max(0,Math.min(59,parseInt(String(v),10)||0));
      var totU=Math.round((hU+mU/60)*100)/100, a10=Math.min(totU, Math.max(0,+due10||0)), alloc={h10:a10,h25:totU-a10};
      var kU='week:'+debutStr; if(!pmU[kU]||typeof pmU[kU]!=='object') pmU[kU]={};
      ['h10','h25'].forEach(function(tr){ var other=t[tr]-dk[tr]; pmU[kU][tr]=Math.max(0, Math.round((alloc[tr]-other)*100)/100); });
      try{ localStorage.setItem(M5_key('M5_HC_PAID'), JSON.stringify(pmU)); }catch(e){}
      if(window.M5_refreshUI) requestAnimationFrame(window.M5_refreshUI);
      return;
    }
    var pm=_getPaidMap(), total=0, dkPaid=0;
    Object.keys(pm).forEach(function(k){ if(k.indexOf('week:')===0){ var md=k.slice(5); if(md>=debutStr && md<=finStr){ var val=+((pm[k]||{})[tranche])||0; total+=val; if(md===debutStr) dkPaid=val; } } });
    var other=Math.round((total-dkPaid)*100)/100;
    var h=Math.floor(total+1e-9), min=Math.round((total-h)*60); if(min===60){h++;min=0;}
    if(part==='h') h=Math.max(0,parseInt(String(v),10)||0); else min=Math.max(0,Math.min(59,parseInt(String(v),10)||0));
    var newTotal=Math.round((h+min/60)*100)/100;
    var newDk=Math.max(0, Math.round((newTotal-other)*100)/100);
    var k='week:'+debutStr; if(!pm[k]||typeof pm[k]!=='object') pm[k]={};
    pm[k][tranche]=newDk;
    try{ localStorage.setItem(M5_key('M5_HC_PAID'), JSON.stringify(pm)); }catch(e){}
    if(window.M5_refreshUI) requestAnimationFrame(window.M5_refreshUI);
  };
  window.M5toggleEuro=function(){ var sh=localStorage.getItem('M5_EURO_SHOWN')==='1'; sh=!sh; try{localStorage.setItem('M5_EURO_SHOWN',sh?'1':'0');}catch(e){}
    var els=document.querySelectorAll('.m5-euro-val'); for(var i=0;i<els.length;i++) els[i].classList.toggle('m5-blur',!sh);
    var b=document.getElementById('m5-euro-btn'); if(b) b.textContent=sh?'🙈 Masquer €':'👁️ Afficher €'; };

  window.M5toggleSolde=function(){
    var open=localStorage.getItem('M5_SOLDE_OPEN')==='1'; open=!open;
    try{ localStorage.setItem('M5_SOLDE_OPEN', open?'1':'0'); }catch(e){}
    var b=document.getElementById('m5-solde-body'); if(b) b.style.display=open?'':'none';
    var ch=document.getElementById('m5-solde-chev'); if(ch) ch.style.transform=open?'rotate(180deg)':'';
  };

  // ── SOLDE DE LA PÉRIODE (intermédiaire, lecture seule) ──
  function _computePeriodeSolde(c, per){
    var wks=_allWeeksRaw(), pm=_getPaidMap(), comp10=0,comp25=0, paid10=0,paid25=0;
    wks.forEach(function(w){
      if(w.monday>=per.debutStr && w.monday<=per.finStr){
        var wk=(w.worked!=null?w.worked:0);
        if(wk>0){ var r=CalcEngine.calcWeek(c.hoursBase,wk,c,(c.hourlyRate||c.rate||0),_weekOpts(c,w.monday)); comp10+=r.compH1||0; comp25+=r.compH2||0; }
      }
    });
    Object.keys(pm).forEach(function(k){
      if(k.indexOf('week:')===0){ var mday=k.slice(5); if(mday>=per.debutStr && mday<=per.finStr){ paid10+=(+pm[k].h10||0); paid25+=(+pm[k].h25||0); } }
    });
    var rep=_computeHebdoReport(c, per.debutStr);
    var due10=rep.h10+comp10, due25=rep.h25+comp25;
    return { comp10:comp10, comp25:comp25, rep10:rep.h10, rep25:rep.h25, paid10:paid10, paid25:paid25,
             rest10:Math.max(0,due10-paid10), rest25:Math.max(0,due25-paid25) };
  }
  window.M5togglePeriodeSolde=function(){
    var open=localStorage.getItem('M5_PERSOLDE_OPEN')!=='0'; open=!open;
    try{ localStorage.setItem('M5_PERSOLDE_OPEN', open?'1':'0'); }catch(e){}
    var b=document.getElementById('m5-persolde-body'); if(b) b.style.display=open?'':'none';
    var ch=document.getElementById('m5-persolde-chev'); if(ch) ch.style.transform=open?'rotate(180deg)':'';
  };
  window._m5PeriodeSoldeBlock=function(analysis){
    try{
      if(_mode()!=='HEBDO') return ''; // le mode MENSUEL a déjà son report par période
      var c=(analysis.contract)||{}; if(!c.hoursBase) return '';
      var per=_currentPeriodBounds(); if(!per||!per.debutStr) return '';
      var s=_computePeriodeSolde(c, per);
      var rate=(c.hourlyRate||c.rate||0), r1=(c.rate1!=null?c.rate1:0.10), r2=(c.rate2!=null?c.rate2:0.25);
      var totP=Math.round((s.comp10+s.comp25)*100)/100;
      var rest10=Math.round(s.rest10*100)/100, rest25=Math.round(s.rest25*100)/100, rest=Math.round((rest10+rest25)*100)/100;
      var repP=Math.round((s.rep10+s.rep25)*100)/100;
      var shown=localStorage.getItem('M5_EURO_SHOWN')==='1', blur=shown?'':' m5-blur';
      var restEur=(s.rest10*rate*(1+r1)+s.rest25*rate*(1+r2));
      var open=localStorage.getItem('M5_PERSOLDE_OPEN')!=='0';
      function eur(v){ return rate>0?'<span class="m5-euro-val'+blur+'" style="color:#fff">'+v.toFixed(2)+' €</span>':'<span style="color:rgba(255,255,255,0.4)">—</span>'; }
      function tile(val,lbl,col){ return '<div style="flex:1;background:rgba(255,255,255,0.06);border-radius:10px;padding:10px 6px;text-align:center;">'
        +'<div style="font-size:20px;font-weight:800;color:'+col+';">'+_fmtH(val)+'</div>'
        +'<div style="font-size:10px;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:.04em;margin-top:2px;">'+lbl+'</div></div>'; }
      var lbl=per.label||(per.debutStr+' → '+per.finStr);
      var restColor=rest>0?'#FF9E6B':'#7CE0A0';
      var header='<div onclick="window.M5togglePeriodeSolde()" style="display:flex;justify-content:space-between;align-items:center;cursor:pointer;">'
        +'<div><div style="font-size:11px;font-weight:800;letter-spacing:.06em;color:#C4A8FF;text-transform:uppercase;">💠 Solde de la période</div>'
        +'<div style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:2px;">'+lbl+'</div></div>'
        +'<div style="display:flex;align-items:center;gap:9px;"><span style="font-size:15px;font-weight:800;color:#8FD3E0;">'+_fmtH(totP)+'</span>'
        +'<span id="m5-persolde-chev" style="color:#C4A8FF;font-size:13px;transition:transform .2s;transform:'+(open?'rotate(180deg)':'')+';">▾</span></div></div>';
      var body='<div id="m5-persolde-body" style="display:'+(open?'':'none')+';margin-top:11px;">'
        +'<div style="display:flex;gap:7px;">'+tile(totP,'Total période','#8FD3E0')+(Math.abs(r1-r2)<1e-9?tile(s.comp10+s.comp25,M5_tauxTxt(r1),'#FFC24B'):tile(s.comp10,M5_tauxTxt(r1),'#FFC24B')+tile(s.comp25,M5_tauxTxt(r2),'#FF7A59'))+'</div>'
        +'<div style="display:flex;justify-content:space-between;margin-top:11px;font-size:13px;color:rgba(255,255,255,0.82);"><span>Report précédent</span><b>'+_fmtH(repP)+'</b></div>'
        +'<div style="display:flex;justify-content:space-between;margin-top:5px;font-size:13px;color:rgba(255,255,255,0.82);"><span>Payées (période)</span><b>'+_fmtH(Math.round((s.paid10+s.paid25)*100)/100)+'</b></div>'
        +'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;padding-top:9px;border-top:1px solid rgba(196,168,255,0.18);">'
          +'<span style="font-size:14px;font-weight:800;color:'+restColor+';">⚠️ Restant dû</span>'
          +'<span style="font-size:14px;font-weight:800;color:'+restColor+';">'+_fmtH(rest)+' · '+eur(restEur)+'</span></div>'
        +'<div style="display:flex;justify-content:space-between;margin-top:8px;padding:8px 10px;background:rgba(79,179,194,0.12);border:1px solid rgba(79,179,194,0.3);border-radius:9px;font-size:13px;color:#8FD3E0;"><span>Reliquat reporté</span><b>'+_fmtH(rest)+'</b></div>'
        +'<div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:8px;">Synthèse de la période active — le détail modifiable est ci-dessous, semaine par semaine.</div>'
        +'</div>';
      return '<div style="background:linear-gradient(180deg,rgba(45,20,103,0.55),rgba(30,15,60,0.55));border:1px solid rgba(196,168,255,0.20);border-radius:14px;padding:13px;margin-top:14px;">'+header+body+'</div>';
    }catch(e){ return ''; }
  };

  // Vue MOIS (HEBDO) : détail SEMAINE PAR SEMAINE de la période active, en live,
  // chaque semaine avec ses propres cases de paiement (clé par semaine, sans ambiguïté).
  function _m5PeriodeWeeksCard(c, rate, r1, r2){
    var per=_currentPeriodBounds(); if(!per||!per.debutStr) return '';
    var uni=Math.abs(r1-r2)<1e-9, L1=M5_tauxTxt(r1), L2=M5_tauxTxt(r2); // 04/10/2026 : libellés réels (taux normal en 3239)
    var rep=_computeHebdoReport(c, per.debutStr);
    var pm=_getPaidMap();
    var wks=_allWeeksRaw().filter(function(w){ return w.monday>=per.debutStr && w.monday<=per.finStr; });
    var rows=[], sum10=0,sum25=0, paid10=0,paid25=0;
    wks.forEach(function(w){
      var wk=(w.worked!=null?w.worked:0);
      var r=(wk>0)?CalcEngine.calcWeek(c.hoursBase,wk,c,rate,_weekOpts(c,w.monday)):{compH1:0,compH2:0};
      var g10=r.compH1||0, g25=r.compH2||0;
      sum10+=g10; sum25+=g25;
      if(g10>0||g25>0) rows.push({monday:w.monday,g10:g10,g25:g25});
    });
    Object.keys(pm).forEach(function(k){ if(k.indexOf('week:')===0){ var md=k.slice(5); if(md>=per.debutStr && md<=per.finStr){ paid10+=+((pm[k]||{}).h10)||0; paid25+=+((pm[k]||{}).h25)||0; } } });
    sum10=Math.round(sum10*100)/100; sum25=Math.round(sum25*100)/100;
    paid10=Math.round(paid10*100)/100; paid25=Math.round(paid25*100)/100;
    var due10=Math.round((rep.h10+sum10)*100)/100, due25=Math.round((rep.h25+sum25)*100)/100;
    var net10=Math.max(0,due10-paid10), net25=Math.max(0,due25-paid25);
    var eT=net10*rate*(1+r1)+net25*rate*(1+r2);
    var shown=localStorage.getItem('M5_EURO_SHOWN')==='1', blur=shown?'':' m5-blur';
    var open=localStorage.getItem('M5_SOLDE_OPEN')==='1';
    var C_TXT='#fff', C_SUB='rgba(255,255,255,0.62)', C_REP='#CDB8FF';
    var MOISC=['jan','fév','mar','avr','mai','jun','jul','aoû','sep','oct','nov','déc'];
    var JC=['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
    function eur(v){ return rate>0?'<span class="m5-euro-val'+blur+'" style="color:#fff">'+v.toFixed(2)+' €</span>':'<span style="color:rgba(255,255,255,0.4)">—</span>'; }
    // Ligne semaine — LECTURE SEULE (génération uniquement)
    function weekBlock(w){
      var d=new Date(w.monday+'T12:00:00'), e=new Date(d.getTime()); e.setDate(e.getDate()+6);
      var dowD=(d.getDay()+6)%7, dowE=(e.getDay()+6)%7;
      var startTxt=JC[dowD]+' '+d.getDate()+(d.getMonth()!==e.getMonth()?' '+MOISC[d.getMonth()]:'');
      var lbl='Sem. '+startTxt+' → '+JC[dowE]+' '+e.getDate()+' '+MOISC[e.getMonth()];
      return '<div style="background:rgba(255,255,255,0.06);border-radius:9px;padding:8px 11px;margin-top:7px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">'
        +'<span style="font-weight:700;font-size:12px;color:'+C_TXT+';">'+lbl+'</span>'
        +'<span style="font-size:12px;">'+(uni?'<b style="color:#FFC24B;">'+_fmtH(w.g10+w.g25)+' '+L1+'</b>':'<b style="color:#FFC24B;">'+_fmtH(w.g10)+' '+L1+'</b> &nbsp; <b style="color:#FF9B8A;">'+_fmtH(w.g25)+' '+L2+'</b>')+'</span></div>';
    }
    // Champ de paiement AU NIVEAU DE LA PÉRIODE (toujours présent, toujours éditable)
    function periodPaid(tranche, paidVal, color, label, d10){
      var _ph=Math.floor((paidVal||0)+1e-9), _pm=Math.round(((paidVal||0)-_ph)*60); if(_pm===60){_ph++;_pm=0;}
      var st='width:38px;padding:4px;border:1px solid rgba(255,255,255,0.3);border-radius:7px;text-align:center;font-size:12.5px;background:#fff;color:#18102E;';
      return '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:7px;font-size:12.5px;color:'+C_SUB+';gap:8px;flex-wrap:wrap;">'
        +'<span>On m\'a payé <b style="color:'+color+';">'+label+'</b> :</span>'
        +'<span><input type="number" inputmode="numeric" min="0" value="'+(paidVal?_ph:'')+'" placeholder="0" onchange="window.M5setHCPaidPeriode(\''+per.debutStr+'\',\''+per.finStr+'\',\''+tranche+'\',\'h\',this.value,'+(+d10||0)+')" style="'+st+'">h '
        +'<input type="number" inputmode="numeric" min="0" max="59" value="'+(paidVal?String(_pm).padStart(2,"0"):'')+'" placeholder="00" onchange="window.M5setHCPaidPeriode(\''+per.debutStr+'\',\''+per.finStr+'\',\''+tranche+'\',\'m\',this.value,'+(+d10||0)+')" style="'+st+'">min</span></div>';
    }
    var euroBtn='<button id="m5-euro-btn" onclick="event.stopPropagation();window.M5toggleEuro()" style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:9px;border:1px solid rgba(255,255,255,0.28);background:rgba(255,255,255,0.15);color:#fff;cursor:pointer;white-space:nowrap;">'+(shown?'🙈 Masquer €':'👁️ Afficher €')+'</button>';
    var repLine=(rep.h10>0||rep.h25>0)
      ? '<div style="display:flex;justify-content:space-between;font-size:12px;color:'+C_REP+';margin-top:8px;"><span>Report précédent</span><b>'+(uni?_fmtH(rep.h10+rep.h25)+' ('+L1+')':_fmtH(rep.h10)+' ('+L1+') · '+_fmtH(rep.h25)+' ('+L2+')')+'</b></div>'
      : '';
    var rowsHtml=rows.length? rows.map(weekBlock).join('') : '<div style="font-size:12px;color:'+C_SUB+';margin-top:8px;">Aucune heure comp. saisie dans cette période. Tu peux quand même enregistrer un paiement du report ci-dessous.</div>';
    var body=''
      +'<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><span style="font-size:11px;color:'+C_SUB+';">Généré par semaine (lecture). Le paiement se saisit en bas.</span>'+euroBtn+'</div>'
      +(rate>0?'':'<div style="font-size:11.5px;color:'+C_SUB+';margin-top:4px;">💡 Renseigne ton <b>taux horaire</b> (⚙️) pour voir les montants.</div>')
      +repLine
      +rowsHtml
      +'<div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.18);font-size:12.5px;color:'+C_TXT+';font-weight:700;"><span>Total dû (brut) : '+_fmtH(due10+due25)+'</span><span>'+eur(due10*rate*(1+r1)+due25*rate*(1+r2))+'</span></div>'
      +(uni ? periodPaid('u',paid10+paid25,'#FFC24B',L1,due10)
            : periodPaid('h10',paid10,'#FFC24B',L1)+periodPaid('h25',paid25,'#FF9B8A',L2))
      +'<div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:9px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.18);font-size:14px;font-weight:800;color:'+C_TXT+';"><span>💰 Reste à payer (net) : '+_fmtH(net10+net25)+'</span><span class="m5-euro-val'+blur+'">'+(rate>0?(eT.toFixed(2)+' €'):'—')+'</span></div>';
    var head='<div onclick="window.M5toggleSolde()" style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:11px 13px;cursor:pointer;user-select:none;">'
      +'<span style="font-size:12.5px;font-weight:800;color:'+C_TXT+';">💠 Heures comp. — semaine par semaine <span style="font-weight:500;color:'+C_SUB+';">(reste '+_fmtH(net10+net25)+')</span></span>'
      +'<span id="m5-solde-chev" style="color:'+C_SUB+';font-size:13px;transition:transform .2s;'+(open?'transform:rotate(180deg);':'')+'">▾</span></div>';
    return '<div id="m5-solde-card" style="margin-top:12px;background:linear-gradient(160deg,rgba(23,16,46,0.72),rgba(44,24,76,0.72));border:1.5px solid rgba(180,150,255,0.55);border-radius:14px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.30);">'
      + head + '<div id="m5-solde-body" style="padding:0 13px 12px;'+(open?'':'display:none;')+'">'+body+'</div></div>';
  }

  window._m5SoldeHCBlock=function(analysis){
    var c=(analysis.contract)||{}, rate=(c.hourlyRate||c.rate||0), r1=(c.rate1!=null?c.rate1:0.10), r2=(c.rate2!=null?c.rate2:0.25);
    // Vue MOIS (HEBDO) → détail multi-semaines de la période, en live
    if(_mode()==='HEBDO' && window._m5IsMonthView && window._m5IsMonthView()) return _m5PeriodeWeeksCard(c, rate, r1, r2);
    var due10,due25,dtl10,dtl25,suffix;
    if(analysis.mensuelResult && typeof analysis.mensuelResult.compH1!=='undefined'){
      var res=analysis.mensuelResult, rep=_computeReport(c), hc10=res.compH1||0, hc25=res.compH2||0;
      due10=Math.round((rep.h10+hc10)*100)/100; due25=Math.round((rep.h25+hc25)*100)/100;
      dtl10='report '+_fmtH(rep.h10)+' + période '+_fmtH(hc10); dtl25='report '+_fmtH(rep.h25)+' + période '+_fmtH(hc25);
      suffix='report par période';
      var _dtlU='report '+_fmtH(rep.h10+rep.h25)+' + période '+_fmtH(hc10+hc25);
    } else if(_mode()==='HEBDO'){
      var wr=analysis.weekResult||{}, whc10=wr.compH1||0, whc25=wr.compH2||0;
      var cm=(window.M5_getCalMonday&&window.M5_getCalMonday())||'';
      var wrep=_computeHebdoReport(c, cm);
      due10=Math.round((wrep.h10+whc10)*100)/100; due25=Math.round((wrep.h25+whc25)*100)/100;
      dtl10='report '+_fmtH(wrep.h10)+' + semaine '+_fmtH(whc10); dtl25='report '+_fmtH(wrep.h25)+' + semaine '+_fmtH(whc25);
      suffix='semaine par semaine';
      var _dtlU='report '+_fmtH(wrep.h10+wrep.h25)+' + semaine '+_fmtH(whc10+whc25);
    } else if(_mode()==='ANNUEL' && analysis.annuelResult){
      var ar=analysis.annuelResult, obj=+ar.objectifAnnuel||0, reel=+ar.reelCumule||0;
      var over=Math.max(0, reel-obj), thr=(c.threshold!=null?c.threshold:0.10);
      due10=Math.min(over, obj*thr); due25=Math.max(0, over-due10);
      due10=Math.round(due10*100)/100; due25=Math.round(due25*100)/100;
      dtl10='dépassement objectif '+_fmtH(obj); dtl25='au-delà de 1/10 de l\'objectif';
      suffix='reste à payer en fin d\'exercice';
    } else { return ''; }
    var e10=due10*rate*(1+r1), e25=due25*rate*(1+r2), eT=e10+e25;
    var p=_getPaid(_periodKey()), out10=Math.max(0,due10-p.h10), out25=Math.max(0,due25-p.h25);
    // 04/10/2026 : libellés réels (« au taux normal » en 3239) et une seule ligne si les taux sont égaux
    var uni=Math.abs(r1-r2)<1e-9, L1=M5_tauxTxt(r1), L2=M5_tauxTxt(r2);
    var dtlU=(typeof _dtlU==='string')?_dtlU:dtl10;
    var shown=localStorage.getItem('M5_EURO_SHOWN')==='1', blur=shown?'':' m5-blur';
    var open=localStorage.getItem('M5_SOLDE_OPEN')==='1';
    var C_TXT='#ffffff', C_SUB='rgba(255,255,255,0.62)', C_REP='#CDB8FF';
    function eur(v){ return rate>0?'<span class="m5-euro-val'+blur+'" style="color:#fff">'+v.toFixed(2)+' €</span>':'<span style="color:rgba(255,255,255,0.4)">—</span>'; }
    function row(label,color,dtl,due,euro,paid,out,fn,rid){
      var _ph=Math.floor((paid||0)+1e-9), _pm=Math.round(((paid||0)-_ph)*60); if(_pm===60){_ph++;_pm=0;}
      return '<div style="background:rgba(255,255,255,0.07);border-radius:10px;padding:9px 11px;margin-top:8px;">'
       +'<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;"><span style="font-weight:800;color:'+color+';font-size:13px;">'+label+'</span><span style="font-weight:800;font-size:12.5px;color:'+C_TXT+';">'+_fmtH(due)+' &nbsp;·&nbsp; '+euro+'</span></div>'
       +'<div style="font-size:11px;color:'+C_SUB+';margin-top:3px;">'+dtl+'</div>'
       +'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;font-size:12px;color:'+C_SUB+';gap:8px;"><span>On m\'a payé : <input type="number" inputmode="numeric" min="0" value="'+(paid?_ph:'')+'" placeholder="0" onchange="'+fn+'h(this.value)" style="width:38px;padding:4px 4px;border:1px solid rgba(255,255,255,0.3);border-radius:7px;text-align:center;font-size:12.5px;background:#fff;color:#18102E;">h <input type="number" inputmode="numeric" min="0" max="59" value="'+(paid?String(_pm).padStart(2,"0"):'')+'" placeholder="00" onchange="'+fn+'m(this.value)" style="width:38px;padding:4px 4px;border:1px solid rgba(255,255,255,0.3);border-radius:7px;text-align:center;font-size:12.5px;background:#fff;color:#18102E;">min</span><span>Reporté : <strong id="'+rid+'" data-due="'+due+'" style="color:'+C_REP+';">'+_fmtH(out)+'</strong></span></div>'
       +'</div>';
    }
    var euroBtn='<button id="m5-euro-btn" onclick="event.stopPropagation();window.M5toggleEuro()" style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:9px;border:1px solid rgba(255,255,255,0.28);background:rgba(255,255,255,0.15);color:#fff;cursor:pointer;white-space:nowrap;">'+(shown?'🙈 Masquer €':'👁️ Afficher €')+'</button>';
    var body=''
      +'<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><span style="font-size:11px;color:'+C_SUB+';">Non payées → reportées, tranche conservée.</span>'+euroBtn+'</div>'
      +(rate>0?'':'<div style="font-size:11.5px;color:'+C_SUB+';margin-top:4px;">💡 Renseigne ton <b>taux horaire</b> (⚙️) pour voir les montants.</div>')
      +(uni ? row(L1,'#FFC24B',dtlU,due10+due25,eur(e10+e25),p.h10+p.h25,out10+out25,'window.M5setHCPaidU','m5-rep-10')
            : row(L1,'#FFC24B',dtl10,due10,eur(e10),p.h10,out10,'window.M5setHCPaid10','m5-rep-10')
             +row(L2,'#FF9B8A',dtl25,due25,eur(e25),p.h25,out25,'window.M5setHCPaid25','m5-rep-25'))
      +'<div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.18);font-size:12px;color:'+C_SUB+';"><span>Total généré (brut) : '+_fmtH(due10+due25)+'</span><span>'+eur(eT)+'</span></div>'+'<div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:6px;font-size:14px;font-weight:800;color:'+C_TXT+';"><span>💰 Reste à payer (net) : <span id="m5-net-h">'+_fmtH(out10+out25)+'</span></span><span id="m5-net-eur" class="m5-euro-val'+blur+'">'+(rate>0?((out10*rate*(1+r1)+out25*rate*(1+r2)).toFixed(2)+' €'):'—')+'</span></div>';
    var head='<div onclick="window.M5toggleSolde()" style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:11px 13px;cursor:pointer;user-select:none;">'
      +'<span style="font-size:12.5px;font-weight:800;color:'+C_TXT+';">💠 Heures comp. — '+suffix+' <span style="font-weight:500;color:'+C_SUB+';">(reste <span id="m5-hdr-net">'+_fmtH(out10+out25)+'</span>)</span></span>'
      +'<span id="m5-solde-chev" style="color:'+C_SUB+';font-size:13px;transition:transform .2s;'+(open?'transform:rotate(180deg);':'')+'">▾</span></div>';
    return '<div id="m5-solde-card" data-uni="'+(uni?'1':'0')+'" data-due10="'+due10+'" data-due25="'+due25+'" data-rate="'+rate+'" data-r1="'+r1+'" data-r2="'+r2+'" style="margin-top:12px;background:linear-gradient(160deg,rgba(23,16,46,0.72),rgba(44,24,76,0.72));border:1.5px solid rgba(180,150,255,0.55);border-radius:14px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.30);">'
      + head + '<div id="m5-solde-body" style="padding:0 13px 12px;'+(open?'':'display:none;')+'">'+body+'</div></div>';
  };

  /* indicateur '= Xh' retiré (parasite) */

})();


/* ═══════════════════════════════════════════════════════════════
   AJOUT (bac à sable) — Calendrier MENSUEL façon M2 (mode avancé).
   Grille du mois, jours cliquables (openDaySaisie), toggle Semaine/Mois.
   La nav ‹ › devient mensuelle en vue mois.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  var _mk=null;
  function _fmt(v){ return window._m5fmtH?window._m5fmtH(v):(v+'h'); }
  function _curMK(){
    if(_mk) return _mk;
    var cm=(window.M5_getCalMonday&&window.M5_getCalMonday())||'';
    if(cm) return cm.slice(0,7);
    var t=new Date(); return t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0');
  }
  window._m5IsMonthView=function(){ return localStorage.getItem('M5_CAL_VIEW')==='month'; };
  // Synchronise le menu déroulant Semaine/Mois avec l'état courant
  window._m5SyncCalViewSelect=function(){ var s=document.getElementById('cal-view-select'); if(s) s.value=window._m5IsMonthView()?'month':'week'; };
  function _refresh(){ if(window.M5_refreshUI) window.M5_refreshUI(); }
  // Sélection explicite depuis le menu déroulant (Semaine / Mois)
  window.M5setCalView=function(v){
    v=(v==='month')?'month':'week';
    try{ localStorage.setItem('M5_CAL_VIEW', v); }catch(e){}
    if(v==='month') _mk=null; // dérive le mois affiché depuis la semaine/période courante
    window._m5SyncCalViewSelect();
    _refresh();
  };
  // Bascule (rétrocompat)
  window.M5calView=function(){ window.M5setCalView(window._m5IsMonthView()?'week':'month'); };
  // ── Navigation par (mois × période) en vue mois ──────────────────
  // On construit la liste des "cases" (mois, période) où la période chevauche
  // le mois, triées par mois puis par période. Le balayage avance d'une case :
  //  P1M1 → P2M1 → P2M2 → P3M2 → P3M3 …  (on reste sur le même mois tant que
  //  deux périodes s'y trouvent, puis on passe au mois suivant).
  function _periodesSorted(centerY){
    var c; try{ c=M5_Contract.get(); }catch(e){ c={}; }
    var y=centerY||parseInt(_curMK().slice(0,4))||new Date().getFullYear();
    var seen={}, out=[];
    [y-2,y-1,y,y+1,y+2].forEach(function(yy){
      var ps=[]; try{ ps=(window.buildPeriodes?window.buildPeriodes(String(yy),c):[])||[]; }catch(e){}
      ps.forEach(function(p){ if(p&&p.debutStr&&!seen[p.debutStr]){ seen[p.debutStr]=1; out.push(p); } });
    });
    out.sort(function(a,b){ return a.debutStr<b.debutStr?-1:1; });
    return out;
  }
  // Toutes les cases (mk, période) : une période apparaît dans chaque mois qu'elle touche
  function _cells(centerY){
    var pers=_periodesSorted(centerY), cells=[];
    pers.forEach(function(p){
      var d=new Date(p.debutStr+'T12:00:00'), f=new Date(p.finStr+'T12:00:00');
      var ym0=d.getFullYear()*12+d.getMonth(), ym1=f.getFullYear()*12+f.getMonth();
      for(var ym=ym0; ym<=ym1; ym++){
        var yy=Math.floor(ym/12), mm=ym%12;
        cells.push({ mk: yy+'-'+String(mm+1).padStart(2,'0'), pStart: p.debutStr, pFin: p.finStr });
      }
    });
    cells.sort(function(a,b){ if(a.mk!==b.mk) return a.mk<b.mk?-1:1; return a.pStart<b.pStart?-1:1; });
    return cells;
  }
  function _activePStart(cells){
    // période active = celle contenant calendarMonday
    var cm=(window.M5_getCalMonday&&window.M5_getCalMonday())||'';
    for(var i=0;i<cells.length;i++){ if(cm>=cells[i].pStart && cm<=cells[i].pFin) return cells[i].pStart; }
    return '';
  }
  function _navPeriode(delta){
    var mk=_curMK(), cy=parseInt(mk.slice(0,4))||new Date().getFullYear();
    var cells=_cells(cy); if(!cells.length){ _refresh(); return; }
    var pStart=_activePStart(cells);
    // case courante = (mois affiché, période active)
    var idx=-1, i;
    for(i=0;i<cells.length;i++){ if(cells[i].mk===mk && cells[i].pStart===pStart){ idx=i; break; } }
    if(idx<0){ // repli : 1re case du mois affiché, sinon case contenant aujourd'hui
      for(i=0;i<cells.length;i++){ if(cells[i].mk===mk){ idx=i; break; } }
      if(idx<0){ var tk=(window.M5_getCurrentMonday?window.M5_getCurrentMonday():''); for(i=0;i<cells.length;i++){ if(tk>=cells[i].pStart && tk<=cells[i].pFin){ idx=i; break; } } }
      if(idx<0) idx=0;
    }
    var ni=idx+delta; if(ni<0) ni=0; if(ni>cells.length-1) ni=cells.length-1;
    var cell=cells[ni];
    if(window.M5_setCalMonday) window.M5_setCalMonday(cell.pStart);
    _mk=cell.mk;
    _refresh();
  }
  window.M5monthPrev=function(){ _navPeriode(-1); };
  window.M5monthNext=function(){ _navPeriode(1); };
  window.M5monthToday=function(){
    var tk=(window.M5_getCurrentMonday?window.M5_getCurrentMonday():'');
    var t=new Date(), cy=t.getFullYear();
    var cells=_cells(cy), found=null;
    for(var i=0;i<cells.length;i++){ if(tk>=cells[i].pStart && tk<=cells[i].pFin){ found=cells[i]; if(found.mk===t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')) break; } }
    if(found){ if(window.M5_setCalMonday) window.M5_setCalMonday(found.pStart); _mk=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0'); }
    else { _mk=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0'); }
    _refresh();
  };
  window.renderMonthCalendar=function(){
    var el=document.getElementById('calendar-grid'); if(!el) return;
    var key=_curMK(), pp=key.split('-').map(Number), y=pp[0], m=pp[1];
    var MOIS=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    var lbl=document.getElementById('cal-week-label'); if(lbl) lbl.textContent=MOIS[m-1]+' '+y;
    if(window._m5SyncCalViewSelect) window._m5SyncCalViewSelect();
    var cy; try{ cy=M5_DataStore.getYear(); }catch(e){ cy=y; }
    var dA={}, dB={};
    try{ dA=M5_DataStore.getAll(cy)||{}; }catch(e){}
    try{ dB=(String(y)!==String(cy))?(M5_DataStore.getAll(y)||{}):dA; }catch(e){ dB=dA; }
    function val(dk){ var e=dB[dk]||dA[dk]; return (e&&e.type==='day')?e.worked:null; }
    // Congés (vacances) : mêmes clés que la vue semaine, pour l'affichage 🌴 en vue mois
    var vacA={}, vacB={};
    try{ vacA=M5_DataStore.getVacances(cy)||{}; }catch(e){}
    try{ vacB=(String(y)!==String(cy))?(M5_DataStore.getVacances(y)||{}):vacA; }catch(e){ vacB=vacA; }
    function isVacDay(dk){ return !!(vacB[dk]||vacA[dk]); }
    // Semaine saisie en TOTAL (pas jour par jour) : on ne connaît pas la répartition,
    // mais on la signale et elle compte dans les totaux (via _allWeeksRaw).
    function weekTotalFor(dk){ try{ var mon=(window.M5_weekStartOf?window.M5_weekStartOf(dk,sd):null); if(!mon) return null; var e=dB[mon]||dA[mon]; if(e&&e.type==='week') return (e.worked!=null?e.worked:e.total); }catch(err){} return null; }
    var sd=0; try{ sd=(M5_Contract.get().weekStartDay||0); }catch(e){}
    var WD=['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'], JR=['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'];
    var wd=WD.slice(sd).concat(WD.slice(0,sd)), jr=JR.slice(sd).concat(JR.slice(0,sd));
    var daysIn=new Date(y,m,0).getDate();
    var firstMon=(new Date(y,m-1,1).getDay()+6)%7, offset=(firstMon-sd+7)%7;
    var t=new Date(), todayDK=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');
    // Périodes de paye du mois affiché → deux teintes alternées pour distinguer
    // visuellement les deux périodes qui peuvent cohabiter dans un même mois.
    var pers=[]; try{ pers=(window.buildPeriodes?window.buildPeriodes(String(y), M5_Contract.get()):[])||[]; }catch(e){}
    function _pIdx(dk){ for(var pi=0;pi<pers.length;pi++){ if(dk>=pers[pi].debutStr && dk<=pers[pi].finStr) return pi; } return -1; }
    // Période active = celle qui contient la semaine courante (barre + verrou + swipe)
    var _cmA=(window.M5_getCalMonday&&window.M5_getCalMonday())||'';
    var _actIdx=-1; for(var _ai=0;_ai<pers.length;_ai++){ if(_cmA>=pers[_ai].debutStr && _cmA<=pers[_ai].finStr){ _actIdx=_ai; break; } }
    /* 27/09/2026 : jours hors de l'exercice affiché (ex. début décembre 2026 dans l'exercice 2027
       qui commence le 28/12) : grisés, et un appui ouvre le bon exercice au lieu d'y saisir. */
    var _exD='',_exF='';try{var _cpx=window.M5_contratPourAnnee?M5_contratPourAnnee(String(cy),M5_Contract.get()):M5_Contract.get();_exD=_cpx.exerciceStart||'';var _cl=Object.values(_cpx.cloturesDates||{}).filter(Boolean).sort();_exF=_cl.length?_cl[_cl.length-1]:'';}catch(e){}
    var h='<div class="m5-cal-weekly-badge">Mode mensuel — tape un jour · ∑ = semaine saisie en total</div><div class="m5-month-grid">';
    wd.forEach(function(d){ h+='<div class="m5-month-wd">'+d+'</div>'; });
    for(var i=0;i<offset;i++) h+='<div class="m5-month-pad"></div>';
    var _prevPi=null;
    for(var d=1;d<=daysIn;d++){
      var dk=y+'-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0');
      var v=val(dk), lab=jr[(offset+d-1)%7];
      var _pi=_pIdx(dk);
      var _lk=(window.M5_isDayLocked&&window.M5_isDayLocked(dk));
      var _over10=(v!=null && v>10 && !window.M5_est3239());
      var _wt=(v==null)?weekTotalFor(dk):null;
      var _isWS=(_wt!=null && window.M5_weekStartOf && window.M5_weekStartOf(dk,sd)===dk);
      var _vac=isVacDay(dk);
      var cls='m5-month-day'+(dk===todayDK?' today':'')+(v!=null?' has':'')+(_wt!=null?' m5-wt-day':'')+(_lk?' locked':'')+(_over10?' m5-day-over10':'')+(_vac?' m5-month-vac':'');
      if(_pi>=0){ cls+=' m5-mp-'+(_pi%2===0?'a':'b'); if(_pi===_actIdx) cls+=' m5-mp-active'; if(_prevPi!==null && _pi!==_prevPi) cls+=' m5-mp-start'; }
      _prevPi=_pi;
      var _inner=_lk?'<span class="m5-mp-lock">🔒</span>'
        :(_vac?'<span class="m5-cal-day-vac">🌴</span>'
        :(v!=null?'<span>'+_fmt(v)+(_over10?' ⚠️':'')+'</span>'
        :(_wt!=null?'<span class="m5-wt-mark">'+(_isWS?('∑'+_fmt(_wt)):'∑')+'</span>':'')));
      var _click=_vac?'window.M5_toast&&M5_toast(\'Semaine en congés 🌴 — décoche les congés pour saisir\',\'info\')':'openDaySaisie(\''+dk+'\',\''+lab+'\')';
      var _hors=(_exD&&dk<_exD)||(_exF&&dk>_exF);
      if(_hors){ var _ya=String(parseInt(cy,10)+(dk<_exD?-1:1));
        _click='if(confirm(\'Ce jour appartient à l\\\'exercice '+_ya+'. L\\\'ouvrir ?\'))switchYear(\''+_ya+'\')';
        h+='<div class="'+cls+'" style="opacity:.35" title="Hors exercice '+cy+'" onclick="'+_click+'"><b>'+d+'</b>'+_inner+'</div>'; continue; }
      h+='<div class="'+cls+'" onclick="'+_click+'"><b>'+d+'</b>'+_inner+'</div>';
    }
    h+='</div>';
    el.innerHTML=h;
  };
  // Init du menu déroulant + gestes de balayage au chargement
  document.addEventListener('DOMContentLoaded', function(){
    if(window._m5SyncCalViewSelect) window._m5SyncCalViewSelect();
    // Cadenas : déclenche au 1er tap (touchend) — mais SEULEMENT si c'est un vrai
    // tap, pas un défilement qui a démarré sur le bouton (sinon verrouillage auto au scroll)
    var lb=document.getElementById('periode-lock-btn');
    if(lb){
      if(!lb.textContent) lb.textContent='🔓';
      var _lockFired=false, _lx=0, _ly=0, _lmoved=false;
      lb.addEventListener('touchstart', function(e){ if(e.touches&&e.touches[0]){ _lx=e.touches[0].clientX; _ly=e.touches[0].clientY; _lmoved=false; } }, {passive:true});
      lb.addEventListener('touchmove', function(e){ if(e.touches&&e.touches[0] && (Math.abs(e.touches[0].clientX-_lx)>8 || Math.abs(e.touches[0].clientY-_ly)>8)) _lmoved=true; }, {passive:true});
      lb.addEventListener('touchend', function(e){ if(_lmoved){ _lmoved=false; return; } e.preventDefault(); _lockFired=true; window.M5togglePeriodeLock(); }, {passive:false});
      lb.addEventListener('click', function(){ if(_lockFired){ _lockFired=false; return; } window.M5togglePeriodeLock(); });
    }
    var hero=document.querySelector('.acc-week-hero'); if(!hero) return;
    var x0=null, y0=null, t0=0;
    hero.addEventListener('touchstart', function(e){
      if(!e.touches||e.touches.length!==1){ x0=null; return; }
      x0=e.touches[0].clientX; y0=e.touches[0].clientY; t0=Date.now();
    }, {passive:true});
    hero.addEventListener('touchend', function(e){
      if(x0===null) return;
      var tch=(e.changedTouches&&e.changedTouches[0]); if(!tch){ x0=null; return; }
      var dx=tch.clientX-x0, dy=tch.clientY-y0, dt=Date.now()-t0;
      x0=null;
      // Balayage horizontal net (pas un scroll vertical, pas un tap)
      if(dt>700) return;
      if(Math.abs(dx)<45 || Math.abs(dx)<Math.abs(dy)*1.6) return;
      if(dx<0){ if(window.calNext) window.calNext(); } else { if(window.calPrev) window.calPrev(); }
    }, {passive:true});
  });
})();


/* ═══ Passage à l'exercice suivant — Mizuki (24/09/2026) ══════════════════
   Le contrat ne porte qu'UN exercice (début + 12 clôtures). Une fois la
   dernière clôture passée, les semaines suivantes ne tombaient dans aucune
   période. Un bandeau propose maintenant de préparer l'exercice suivant :
   même rythme de clôtures, un an plus tard. L'exercice terminé est gardé dans
   M5_EXERCICES pour que ses périodes restent justes quand on le consulte.
   Rien ne bascule sans l'accord de l'utilisateur. */
(function(){
  function jour(s){return new Date(s+'T12:00:00');}
  function iso(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
  function plus(s,n){var d=jour(s);d.setDate(d.getDate()+n);return iso(d);}
  function plusUnAn(s){var d=jour(s),m=d.getMonth();d.setFullYear(d.getFullYear()+1);if(d.getMonth()!==m)d.setDate(0);return iso(d);}
  function finDeMois(s){var d=jour(s);return new Date(d.getFullYear(),d.getMonth()+1,0).getDate()===d.getDate();}
  function fr(s){return jour(s).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});}
  function cle(){return (window.M5_key?M5_key('M5_EXERCICES'):'M5_EXERCICES');}
  function histo(){try{return JSON.parse(localStorage.getItem(cle())||'{}')||{};}catch(e){return {};}}
  // Décalage d'un an qui garde le rythme : même règle de jour de semaine
  // (« dernier dimanche », « 3e dimanche ») si toutes les clôtures tombent le
  // même jour ; fin de mois si ce sont des fins de mois ; sinon même date.
  function decaleur(dates){
    var j=dates.map(function(x){return jour(x).getDay();});
    // Même règle l'an prochain : « dernier dimanche du mois » reste le dernier
    // dimanche, « 3e dimanche » reste le 3e — aucune dérive (2028, 2029…).
    if(j.length>1&&j.every(function(v){return v===j[0];}))return function(x){var d=jour(x),wd=d.getDay(),m=d.getMonth(),y=d.getFullYear()+1,nb=new Date(y,m+1,0).getDate(),dernier=d.getDate()+7>new Date(d.getFullYear(),m+1,0).getDate(),r;if(dernier){r=new Date(y,m,nb);while(r.getDay()!==wd)r.setDate(r.getDate()-1);}else{var n=Math.ceil(d.getDate()/7);r=new Date(y,m,1);while(r.getDay()!==wd)r.setDate(r.getDate()+1);r.setDate(r.getDate()+7*(n-1));}return iso(r);};
    if(dates.length&&dates.every(finDeMois))return function(x){var d=jour(x);return iso(new Date(d.getFullYear()+1,d.getMonth()+1,0));};
    return plusUnAn;
  }
  window.M5_contratPourAnnee=function(year,c){
    try{
      var h=histo(),cand=[{exerciceStart:c.exerciceStart,cloturesDates:c.cloturesDates||{}}];
      Object.keys(h).forEach(function(k){cand.push(h[k]);});
      function score(x){return Object.values(x.cloturesDates||{}).filter(function(v){return String(v).slice(0,4)===String(year);}).length;}
      var best=cand[0],bs=score(best);
      cand.forEach(function(x){var sc=score(x);if(sc>bs){best=x;bs=sc;}});
      /* 27/09/2026 : année APRÈS l'exercice en cours, sans exercice propre → exercice suivant
         projeté (clôtures préparées, sinon automatiques), au lieu de l'exercice en cours */
      var lastC=derniere(c);
      if(bs===0&&lastC&&parseInt(year,10)>parseInt(lastC.slice(0,4),10)&&window.hsNouvelExercice){
        var pr=null;try{pr=JSON.parse(localStorage.getItem(window.M5_key?M5_key('M5_EXO_PREPA'):'M5_EXO_PREPA')||'null');}catch(e){}
        var fs=((c.weekStartDay||0)%7),ms=hsNouvelExercice.moisSuivant(lastC),auto=(pr&&Array.isArray(pr.auto)&&pr.auto.length)?pr.auto:hsNouvelExercice.clotures(ms.mois,ms.annee,fs);
        var cd={};auto.forEach(function(d){cd[String(parseInt(d.slice(5,7),10))]=d;});
        var st=plus(lastC,1);if(window.snapExerciceStart)st=snapExerciceStart(st,c.weekStartDay||0);
        return Object.assign({},c,{exerciceStart:st,cloturesDates:cd,_projete:true,_prepare:!!pr});
      }
      return best===cand[0]?c:Object.assign({},c,{exerciceStart:best.exerciceStart,cloturesDates:best.cloturesDates});
    }catch(e){return c;}
  };
  function derniere(c){var v=Object.values(c.cloturesDates||{}).filter(Boolean).sort();return v.length?v[v.length-1]:null;}
  /* 27/09/2026 — bornes de l'exercice « y » (null si inconnues). L'exercice porte le nom de
     l'année où il a le plus de jours : 29/12/2025 → 27/12/2026 = 2026. */
  function majo(d,f){var y1=parseInt(d,10),y2=parseInt(f,10),b=y1,bj=-1;for(var y=y1;y<=y2;y++){var a=Math.max(jour(d).getTime(),jour(y+'-01-01').getTime()),z=Math.min(jour(f).getTime(),jour(y+'-12-31').getTime()),j=Math.round((z-a)/864e5)+1;if(j>bj){bj=j;b=y;}}return b;}
  window.M5_exoBornes=function(y){try{var cp=window.M5_contratPourAnnee(String(y),M5_Contract.get()),f=derniere(cp),d=cp.exerciceStart;
    if(!d||!f||f<d||majo(d,f)!==parseInt(y,10))return null;return {deb:d,fin:f};}catch(e){return null;}};
  window.M5_exoDeDate=function(dk){var yk=parseInt(dk,10),l=[yk,yk+1,yk-1];for(var i=0;i<l.length;i++){var b=M5_exoBornes(l[i]);if(b&&dk>=b.deb&&dk<=b.fin)return String(l[i]);}return null;};
  /* Saisies rangées dans le mauvais exercice (ex. semaine du 30/11/2026 enregistrée dans 2027
     depuis la vue 2027) : remises dans l'exercice qui contient leur date. Jamais d'écrasement. */
  window.M5_rangerSaisies=function(){var n=0;try{
    ['M5_DATA_','M5_VACANCES_'].forEach(function(pf){
      var pre=window.M5_key?M5_key(pf):pf,re=new RegExp('^'+pre.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(\\d{4})$'),tabs={},mod={};
      for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i),m=re.exec(k||'');if(m){try{tabs[m[1]]=JSON.parse(localStorage.getItem(k)||'{}')||{};}catch(e){}}}
      Object.keys(tabs).forEach(function(y){var b=M5_exoBornes(y);if(!b)return;var t=tabs[y];
        Object.keys(t).forEach(function(dk){if(!/^\d{4}-\d{2}-\d{2}$/.test(dk)||(dk>=b.deb&&dk<=b.fin))return;
          var a=M5_exoDeDate(dk);if(!a||a===y)return;if(!tabs[a])tabs[a]={};if(Object.prototype.hasOwnProperty.call(tabs[a],dk))return;
          tabs[a][dk]=t[dk];delete t[dk];mod[a]=1;mod[y]=1;n++;});});
      Object.keys(mod).forEach(function(y){try{localStorage.setItem(pre+y,JSON.stringify(tabs[y]));}catch(e){}});
    });}catch(e){}return n;};
  // Après chargement complet (l'exercice suivant projeté a besoin de nouvel-exercice.js)
  window.addEventListener('load',function(){try{if(window.M5_rangerSaisies()>0&&typeof refreshUI==='function')refreshUI();}catch(e){}});
  window.M5_exerciceSuivant=function(forcees){
    var c=M5_Contract.get(),last=derniere(c);if(!last)return;
    var h=histo();h[c.exerciceStart||last]={exerciceStart:c.exerciceStart,cloturesDates:c.cloturesDates};
    var nc={};
    if(Array.isArray(forcees)&&forcees.length){
      // Clôtures choisies à l'ouverture (26/09/2026), rangées par numéro de mois
      forcees.forEach(function(d){nc[String(parseInt(d.slice(5,7),10))]=d;});
    }else{
      var dates=Object.values(c.cloturesDates),dec=decaleur(dates);
      Object.keys(c.cloturesDates).forEach(function(m){nc[m]=dec(c.cloturesDates[m]);});
    }
    var deb=plus(last,1);
    if(window.snapExerciceStart)deb=snapExerciceStart(deb,c.weekStartDay||0);
    c.exerciceStart=deb;c.cloturesDates=nc;
    try{localStorage.setItem(cle(),JSON.stringify(h));M5_Contract.save(c);}
    catch(e){if(typeof toast==='function')toast('❌ Espace de stockage insuffisant : rien n\'a été modifié.','error');return;}
    try{if(window.Mizuki&&Mizuki.clearCache)Mizuki.clearCache();}catch(e){}
    if(typeof refreshUI==='function')refreshUI();
    if(typeof toast==='function')toast('📅 Nouvel exercice à partir du '+fr(deb),'success');
    if(window.hsBackupNudge)hsBackupNudge('year');
    verifier();
  };
  /* Bilan de fin d'année (26/09/2026) : l'exercice qui se termine, contrat actif */
  function bilanLignes(c,last){
    var deb=c.exerciceStart,fin=last;if(!deb||!fin||!c.hoursBase)return null;
    var ans={},sem={},f=window._m5fmtH||function(h){return h+'h';};
    for(var a=parseInt(deb.slice(0,4),10);a<=parseInt(fin.slice(0,4),10)+1;a++)ans[a]=1;
    Object.keys(ans).forEach(function(a){try{M5_DataStore.getWeeksSorted(String(a)).forEach(function(w){if(w.monday>=deb&&w.monday<=fin&&w.worked>0)sem[w.monday]=w.worked;});}catch(e){}});
    var ws=Object.keys(sem);if(!ws.length)return null;
    var base=c.hoursBase,seuil=base*(c.threshold||0.10),tot=0,hc=0,h1=0,h2=0,n35=0;
    ws.forEach(function(k){var w=sem[k],d=Math.max(0,w-base);tot+=w;hc+=d;h1+=Math.min(d,seuil);h2+=Math.max(0,d-seuil);if(w>=35)n35++;});
    var r=function(x){return Math.round(x*100)/100;};
    var l=[['Heures travaillées',f(r(tot))],['Semaines saisies',String(ws.length)]];
    if(c.modeCalcul==='ANNUEL'){var obj=r(base*52),so=r(tot-obj);l.push(['Objectif annuel du contrat',f(obj)],['Écart avec l\'objectif',(so>0?'+':so<0?'−':'')+f(Math.abs(so))]);}
    else{var HX=window.M5_hcExercice?M5_hcExercice(c,deb,fin):null;if(HX){h1=HX.d10;h2=HX.d25;hc=h1+h2;}
      l.push(['Heures complémentaires',f(r(hc))],['Dont '+M5_tauxTxt(c.rate1??0.10),f(r(h1))],['Dont '+M5_tauxTxt(c.rate2??0.25),f(r(h2))]);}
    if(n35>0)l.push(['Semaines à 35 h ou plus',String(n35)]);
    /* 26/09/2026 : reste à payer en fin d'exercice. Heures complémentaires de l'exercice
       moins les paiements saisis sur l'exercice (cases « payé » par semaine ou période). */
    window.__m5Alerte=null;window.__m5Reste=null;
    if(c.modeCalcul==='ANNUEL'){
      var so2=r(tot-base*52);
      if(so2>0.01)window.__m5Alerte={titre:'⚠️ '+f(so2)+' au-delà de l\'objectif annuel du contrat',
        texte:'En fin de période annuelle, ces heures sont des heures complémentaires à payer (majorées). Si elles ne figurent pas sur ta paie, '+DELAI_MIN()};
    }else{
      var HY=window.M5_hcExercice?M5_hcExercice(c,deb,fin):null,p1,p2,n1,n2;
      if(HY){p1=HY.p10;p2=HY.p25;n1=HY.r10;n2=HY.r25;}
      else{var pm={};try{pm=JSON.parse(localStorage.getItem(M5_key('M5_HC_PAID'))||'{}')||{};}catch(e){}
        p1=0;p2=0;Object.keys(pm).forEach(function(k){var d=k.replace(/^(week|per):/,'');if(/^\d{4}-\d{2}-\d{2}$/.test(d)&&d>=deb&&d<=fin){p1+=+((pm[k]||{}).h10)||0;p2+=+((pm[k]||{}).h25)||0;}});
        n1=r(Math.max(0,h1-p1));n2=r(Math.max(0,h2-p2));}
      var nT=r(n1+n2);
      window.__m5Reste={h10:n1,h25:n2,deb:deb,fin:fin};
      if(p1+p2>0)l.push(['Heures complémentaires payées',f(r(p1+p2))]);
      if(nT>0.01){l.push(['Reste à payer en fin d\'exercice',f(nT)]);
        var det=[];if(n1>0.01)det.push(f(n1)+' '+M5_tauxTxt(c.rate1??0.10));if(n2>0.01)det.push(f(n2)+' '+M5_tauxTxt(c.rate2??0.25));
        window.__m5Alerte={titre:'⚠️ Exercice non soldé : '+f(nT)+' d\'heures complémentaires non payées',
          texte:(det.length>1?'Soit '+det.join(' + ')+'. ':'')+'Même calcul que la carte « Solde » à la fin de l\'exercice : les heures non payées sont reportées de semaine en semaine (un paiement en trop n\'efface pas les semaines suivantes). '+((window.hsBilanAnnee&&hsBilanAnnee.delai)||'')};
      }
    }
    return l.filter(function(x){return !/^Dont /.test(x[0])||/[1-9]/.test(String(x[1]));});
  }
  function DELAI_MIN(){return ((window.hsBilanAnnee&&hsBilanAnnee.delai)||'').replace(/^Elles restent/,'elles restent');}
  /* Question à l'ouverture (26/09/2026) : clôtures automatiques (dernier jour de fin
     de semaine du contrat, chaque mois) ou saisie manuelle dans ⚙️ Mon contrat */
  /* 27/09/2026 : reste dû de l'exercice qui se termine → reporter ou non dans le suivant */
  function kRep(){return window.M5_key?M5_key('M5_REPORT_EXO'):'M5_REPORT_EXO';}
  function kPrepa(){return window.M5_key?M5_key('M5_EXO_PREPA'):'M5_EXO_PREPA';}
  function fH(h){return (window._m5fmtH||function(x){return x+'h';})(Math.round(h*100)/100);}
  /* 27/09/2026 — RESTES DUS SUR 3 ANS (art. L3245-1).
     Chaque exercice terminé a un reste (heures complémentaires non payées, report entrant compris).
     • Reporté dans un exercice suivant : il fait partie du reste de celui-ci, on ne le repropose plus.
     • Gardé (non reporté) : il reste dû dans le bilan de son exercice et il est reproposé à chaque
       ouverture d'exercice tant que les 3 ans ne sont pas passés.
     Choix par exercice d'arrivée : M5_REPORT_EXOS { <début>: {to, choix, h10, h25, sources:[{from, fin, h10, h25, depuis, choix}]} }. */
  function kMap(){return window.M5_key?M5_key('M5_REPORT_EXOS'):'M5_REPORT_EXOS';}
  function lireMap(){var m={};try{m=JSON.parse(localStorage.getItem(kMap())||'{}')||{};}catch(e){}
    try{var old=JSON.parse(localStorage.getItem(kRep())||'null');if(old&&old.to&&old.choix&&!m[old.to])m[old.to]={to:old.to,choix:old.choix,h10:old.choix==='report'?(+old.h10||0):0,h25:old.choix==='report'?(+old.h25||0):0,sources:[{from:old.from,fin:old.fin,h10:+old.h10||0,h25:+old.h25||0,depuis:old.from,choix:old.choix}]};}catch(e){}
    return m;}
  function sourcesDe(r){return (r&&Array.isArray(r.sources))?r.sources:[];}
  function exercices(){var c=M5_Contract.get(),h=histo(),vu={},L=[];
    Object.keys(h).forEach(function(k){var x=h[k],f=derniere(x);if(x&&x.exerciceStart&&f&&!vu[x.exerciceStart]){vu[x.exerciceStart]=1;L.push({deb:x.exerciceStart,fin:f,cd:x.cloturesDates});}});
    var fc=derniere(c);if(c.exerciceStart&&fc&&!vu[c.exerciceStart])L.push({deb:c.exerciceStart,fin:fc,cd:c.cloturesDates,courant:true});
    L.sort(function(a,b){return a.deb<b.deb?-1:1;});return L;}
  function resteDe(x){var c=M5_Contract.get(),cx=Object.assign({},c,{exerciceStart:x.deb,cloturesDates:x.cd||{}});
    var r=window.M5_hcExercice?M5_hcExercice(cx,x.deb,x.fin):null;return r?{h10:r.r10,h25:r.r25}:{h10:0,h25:0};}
  function reporteDans(deb,m){m=m||lireMap();var t=null;Object.keys(m).forEach(function(to){sourcesDe(m[to]).forEach(function(s){if(s.from===deb&&s.choix==='report')t=to;});});return t;}
  function depuisDe(deb,m){m=m||lireMap();var d=deb;sourcesDe(m[deb]).forEach(function(s){if(s.choix==='report'){var x=s.depuis||s.from;if(x&&x<d)d=x;}});return d;}
  function limite(depuis){return plusUnAn(plusUnAn(plusUnAn(depuis)));}
  function anLbl(x){var y1=parseInt(x.deb,10),y2=parseInt(x.fin,10),best=y1,bj=-1;  // année où l'exercice a le plus de jours
    for(var y=y1;y<=y2;y++){var a=Math.max(jour(x.deb).getTime(),jour(y+'-01-01').getTime()),b=Math.min(jour(x.fin).getTime(),jour(y+'-12-31').getTime()),j=Math.round((b-a)/864e5)+1;if(j>bj){bj=j;best=y;}}
    return String(best);}
  /* Restes encore dus à la date « a » : exercices terminés avant « to », non reportés, pas prescrits.
     sansGarde : ignorer les « ne pas reporter » déjà répondus pour « to » (aperçu, passage). */
  function restesDus(to,a,sansGarde){var m=lireMap(),rec=m[to],out=[];
    exercices().forEach(function(x){if(!(x.fin<to))return;if(reporteDans(x.deb,m))return;
      if(!sansGarde&&sourcesDe(rec).some(function(s){return s.from===x.deb;}))return;
      var dep=depuisDe(x.deb,m),lim=limite(dep);if(lim<=a)return;
      var r=resteDe(x);if(r.h10+r.h25>0.01)out.push({deb:x.deb,fin:x.fin,h10:r.h10,h25:r.h25,depuis:dep,limite:lim,an:anLbl(x)});});
    return out.reverse();}
  window.M5_restesDus=restesDus;
  function enregistrer(to,items,coches){var m=lireMap(),rec=m[to]||{to:to,sources:[]},src=sourcesDe(rec).slice();
    items.forEach(function(it,i){src=src.filter(function(s){return s.from!==it.deb;});src.push({from:it.deb,fin:it.fin,h10:it.h10,h25:it.h25,depuis:it.depuis,choix:coches[i]?'report':'garder'});});
    var h10=0,h25=0;src.forEach(function(s){if(s.choix==='report'){h10+=+s.h10||0;h25+=+s.h25||0;}});
    m[to]={to:to,choix:(h10+h25>0.001)?'report':'garder',h10:Math.round(h10*100)/100,h25:Math.round(h25*100)/100,sources:src};
    try{localStorage.setItem(kMap(),JSON.stringify(m));}catch(e){}}
  /* Fenêtre de choix : une ligne par exercice, cochée par défaut */
  window.M5_demanderReports=function(items,to,apres){
    if(!items||!items.length){if(apres)apres();return;}
    var c=M5_Contract.get(),r1=Math.round((c.rate1??0.10)*100),r2=Math.round((c.rate2??0.25)*100),tot=0;
    items.forEach(function(it){tot+=it.h10+it.h25;});
    function fin(coches){enregistrer(to,items,coches);
      var n=0;coches.forEach(function(x,i){if(x)n+=items[i].h10+items[i].h25;});
      if(typeof toast==='function')toast(n>0.01?'↪ '+fH(n)+' reportées dans l\'exercice en cours':'Restes gardés dans le bilan de leur exercice','success');
      if(apres)apres();
      setTimeout(function(){var mc=document.getElementById('modal-contract');if(!mc||!mc.classList.contains('open'))location.reload();},apres?900:700);}
    if(!window.hsNouvelExercice||!hsNouvelExercice.restes){fin(items.map(function(){return false;}));return;}
    hsNouvelExercice.restes({total:fH(tot),vers:'l\'exercice qui commence le '+fr(to),couleur:'#e67e22',
      items:items.map(function(it){var det=[];if(it.h10>0.01)det.push(fH(it.h10)+' à +'+r1+' %');if(it.h25>0.01)det.push(fH(it.h25)+' à +'+r2+' %');
        return {titre:'Exercice '+it.an+' : '+fH(it.h10+it.h25),detail:det.join(' + '),limite:fr(it.limite)};}),
      valider:fin});
  };
  /* Compatibilité : ancien appel avec un seul reste */
  window.M5_demanderReport=function(reste,to,apres){
    var items=restesDus(to,iso(new Date()),true);
    if(!items.length&&reste&&reste.h10+reste.h25>0.01)items=[{deb:reste.deb,fin:reste.fin,h10:reste.h10,h25:reste.h25,depuis:reste.deb,limite:limite(reste.deb),an:anLbl({deb:reste.deb,fin:reste.fin})}];
    window.M5_demanderReports(items,to,apres);
  };
  /* Statut du reste d'un exercice terminé, pour son bilan */
  function statutReste(deb){var m=lireMap(),t=reporteDans(deb,m);
    if(t)return 'Ce reste a été reporté dans l\'exercice commencé le '+fr(t)+' : il y figure dans le report.';
    var lim=limite(depuisDe(deb,m));
    if(lim<=iso(new Date()))return 'Non reporté. Le délai de 3 ans est dépassé pour les plus anciennes heures depuis le '+fr(lim)+' environ.';
    return 'Non reporté : il reste dû. Les plus anciennes heures sont réclamables jusqu\'au '+fr(lim)+' environ ; il te sera reproposé à l\'ouverture de chaque exercice d\'ici là.';}
  /* Exercice suivant préparé à l'avance (créé à la main avant la fin) : ses clôtures
     choisies sont gardées et appliquées au moment du passage. */
  function suivantAvec(forcees,manuel){
    var c0=M5_Contract.get(),last0=derniere(c0),reste=null;
    try{bilanLignes(c0,last0);reste=window.__m5Reste;}catch(e){}
    window.M5_exerciceSuivant(forcees);
    var to=M5_Contract.get().exerciceStart;
    window.M5_demanderReport(reste,to,function(){if(manuel)setTimeout(function(){if(typeof window.openContractModal==='function')window.openContractModal();},400);});
  }
  window.M5_choisirPuisSuivant=function(){
    var c=M5_Contract.get(),last=derniere(c);if(!last)return;
    var pr=null;try{pr=JSON.parse(localStorage.getItem(kPrepa())||'null');}catch(e){}
    if(pr&&Array.isArray(pr.auto)&&pr.auto.length&&pr.auto[0]>last){try{localStorage.removeItem(kPrepa());}catch(e){}suivantAvec(pr.auto,!!pr.manuel);return;}
    if(!window.hsNouvelExercice){suivantAvec(null,false);return;}
    var fs=((c.weekStartDay||0)%7),ms=hsNouvelExercice.moisSuivant(last),auto=hsNouvelExercice.clotures(ms.mois,ms.annee,fs);
    var nomC='';try{if(window.M5_Contrats&&M5_Contrats.existing().length>1)nomC=' · '+M5_Contrats.nom(M5_Contrats.active);}catch(e){}
    hsNouvelExercice.demander({titre:'Exercice suivant'+nomC,couleur:'#6C3FC5',finSemaine:fs,
      texteManuel:'Tes 12 clôtures sont préremplies ; ⚙️ Mon contrat s\'ouvre pour les corriger.',
      auto:function(){suivantAvec(auto,false);},
      manuel:function(){suivantAvec(auto,true);}});
  };
  /* Création à la main de l'exercice suivant AVANT la fin de l'exercice en cours :
     même question que le bandeau ; le choix est gardé pour le jour du passage. */
  window.M5_preparerSuivant=function(y){
    var c=M5_Contract.get(),last=derniere(c);if(!last||!window.hsNouvelExercice)return false;
    var fs=((c.weekStartDay||0)%7),ms=hsNouvelExercice.moisSuivant(last),auto=hsNouvelExercice.clotures(ms.mois,ms.annee,fs);
    function garder(man){try{localStorage.setItem(kPrepa(),JSON.stringify({auto:auto,manuel:man}));var k=M5_key('M5_DATA_')+y;if(!localStorage.getItem(k))localStorage.setItem(k,'{}');}catch(e){}
      if(typeof toast==='function')toast('📅 Exercice '+y+' prêt : il s\'ouvrira le '+fr(plus(last,1)),'success');if(typeof window.switchYear==='function')window.switchYear(String(y));}
    hsNouvelExercice.demander({titre:'Exercice '+y,couleur:'#6C3FC5',finSemaine:fs,
      texteManuel:'Tes 12 clôtures sont préremplies ; ⚙️ Mon contrat s\'ouvrira pour les corriger le jour du passage.',
      auto:function(){garder(false);},manuel:function(){garder(true);}});
    return true;
  };
  window.M5_bilanPuisSuivant=function(){
    var c=M5_Contract.get(),last=derniere(c),l=null;try{l=bilanLignes(c,last);}catch(e){}
    var nomC='';try{if(window.M5_Contrats&&M5_Contrats.existing().length>1)nomC=' · '+M5_Contrats.nom(M5_Contrats.active);}catch(e){}
    var an=last?(c.exerciceStart.slice(0,4)===last.slice(0,4)?last.slice(0,4):c.exerciceStart.slice(0,4)+'-'+last.slice(2,4)):'';
    if(l&&window.hsBilanAnnee)hsBilanAnnee.ouvrir({annee:an,module:'Mizuki · temps partiel'+nomC,couleur:'#6C3FC5',image:'../images/Mizuki.PNG',lignes:l,alerte:window.__m5Alerte,
      continuer:{libelle:'Ouvrir l\'exercice suivant',action:window.M5_choisirPuisSuivant}});
    else window.M5_choisirPuisSuivant();
  };
  window.M5_voirBilan=function(y){
    var c=M5_Contract.get(),cp=window.M5_contratPourAnnee?M5_contratPourAnnee(String(y),c):c,lp=derniere(cp),l=null;try{l=bilanLignes(cp,lp);}catch(e){}
    var an=lp?(cp.exerciceStart.slice(0,4)===lp.slice(0,4)?lp.slice(0,4):cp.exerciceStart.slice(0,4)+'-'+lp.slice(2,4)):String(y);
    var al=window.__m5Alerte;
    if(al&&lp&&lp<(c.exerciceStart||'9999')&&window.__m5Reste&&window.__m5Reste.h10+window.__m5Reste.h25>0.01){
      var st=statutReste(cp.exerciceStart);al=Object.assign({},al,{texte:st+' '+al.texte});
      if(reporteDans(cp.exerciceStart))al.titre=al.titre.replace('⚠️ Exercice non soldé','↪ Reste reporté');}
    if(l&&window.hsBilanAnnee)hsBilanAnnee.ouvrir({annee:an,module:'Mizuki · temps partiel',couleur:'#6C3FC5',image:'../images/Mizuki.PNG',lignes:l,alerte:al});
    else if(typeof toast==='function')toast('Pas encore d\'heures sur cet exercice','info');
  };
  window.M5_exercicePlusTard=function(){try{localStorage.setItem('M5_EXO_PLUS_TARD',iso(new Date()));}catch(e){}verifier();};
  function verifier(){
    var main=document.getElementById('view-main');if(!main)return;
    var el=document.getElementById('m5ExoSuivant');
    if(!el){el=document.createElement('div');el.id='m5ExoSuivant';
      el.style.cssText='display:none;margin:10px 12px;padding:12px 14px;border-radius:14px;background:#fff8e6;border:1.5px solid #f0c040;font-size:13.5px;line-height:1.45;color:#5a4300';
      main.insertBefore(el,main.firstChild);}
    var c=M5_Contract.get(),last=derniere(c),auj=iso(new Date());
    /* 27/09/2026 : exercice passé consulté (comme le compteur annuel et M2) */
    try{var yv=String(M5_DataStore.getYear()),cp=window.M5_contratPourAnnee?M5_contratPourAnnee(yv,c):c,lp=derniere(cp);
      if(c.hoursBase&&cp&&cp._projete){
        var ap='';try{if(c.modeCalcul!=='ANNUEL'){var pv=restesDus(cp.exerciceStart,cp.exerciceStart,true);
          if(pv.length)ap='<br>À son ouverture, on te proposera de reporter les heures non payées : '+pv.map(function(x){return '<b>'+x.an+' : '+fH(x.h10+x.h25)+'</b>'+(x.deb===c.exerciceStart?' (à ce jour)':'');}).join(' · ')+'.';}}catch(e){}
        el.innerHTML='📅 <b>Exercice à venir : il commencera le '+fr(cp.exerciceStart)+'.</b><br>'+(cp._prepare?'Tes clôtures sont déjà choisies ; il s\'ouvrira le moment venu.':'Clôtures automatiques affichées pour l\'instant ; tu peux les choisir dès maintenant.')+ap+
          '<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">'+(cp._prepare?'':'<button onclick="M5_preparerSuivant(\''+yv+'\')" style="flex:1;padding:10px;border-radius:10px;border:1px solid #d8c48a;background:#fff;color:#5a4300;font-weight:800">Choisir mes clôtures</button>')+
          '<button onclick="switchYear(\''+String(new Date().getFullYear())+'\')" style="flex:1;padding:10px;border-radius:10px;border:none;background:#6C3FC5;color:#fff;font-weight:800">Aller à l\'exercice en cours</button></div>';
        el.style.display='block';return;}
      if(c.hoursBase&&cp!==c&&lp&&lp<(c.exerciceStart||'9999')){
        el.innerHTML='📅 <b>Tu consultes l\'exercice terminé le '+fr(lp)+'.</b><br>Ton exercice en cours a commencé le '+fr(c.exerciceStart)+'.'+
          '<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><button onclick="M5_voirBilan(\''+yv+'\')" style="flex:1;padding:10px;border-radius:10px;border:1px solid #d8c48a;background:#fff;color:#5a4300;font-weight:800">📊 Bilan de cet exercice</button>'+
          '<button onclick="switchYear(\''+String(new Date().getFullYear())+'\')" style="flex:1;padding:10px;border-radius:10px;border:none;background:#6C3FC5;color:#fff;font-weight:800">Aller à l\'exercice en cours</button></div>';
        el.style.display='block';return;}}catch(e){}
    /* Restes dus des exercices précédents (3 ans) pas encore traités — sur l'exercice en cours */
    try{if(cp!==c)throw 0;
      if(c.hoursBase&&c.modeCalcul!=='ANNUEL'&&localStorage.getItem('M5_REPORT_PLUS_TARD')!==auj){
        var dus=restesDus(c.exerciceStart,auj,false);
        if(dus.length){var tt=0;dus.forEach(function(x){tt+=x.h10+x.h25;});
          window.__m5RestesDus=dus;
          el.innerHTML='⚠️ <b>'+fH(tt)+' d\'heures complémentaires non payées sur '+(dus.length>1?'tes exercices précédents':'ton exercice précédent')+'</b> ('+dus.map(function(x){return x.an+' : '+fH(x.h10+x.h25);}).join(' · ')+'). Elles restent dues : 3 ans pour les réclamer (art. L3245-1). Tu peux les reporter dans l\'exercice en cours.'+
            '<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><button onclick="M5_demanderReports(window.__m5RestesDus,\''+c.exerciceStart+'\')" style="flex:1;padding:10px;border-radius:10px;border:none;background:#e67e22;color:#fff;font-weight:800">Choisir</button>'+
            '<button onclick="try{localStorage.setItem(\'M5_REPORT_PLUS_TARD\',\''+auj+'\')}catch(e){};M5_verifierExercice()" style="padding:10px 12px;border-radius:10px;border:1px solid #d8c48a;background:#fff;color:#5a4300;font-weight:700">Plus tard</button></div>';
          el.style.display='block';return;}}}catch(e){}
    if(!c.hoursBase||!last||auj<=last||localStorage.getItem('M5_EXO_PLUS_TARD')===auj){el.style.display='none';return;}
    var deb=plus(last,1);if(window.snapExerciceStart)deb=snapExerciceStart(deb,c.weekStartDay||0);
    el.innerHTML='📅 <b>Ton exercice s\'est terminé le '+fr(last)+'.</b><br>Le suivant commencera le '+fr(deb)+'. Tu choisiras tes dates de clôture à l\'ouverture.'+
      '<div style="display:flex;gap:8px;margin-top:10px"><button onclick="M5_bilanPuisSuivant()" style="flex:1;padding:10px;border-radius:10px;border:none;background:#c2185b;color:#fff;font-weight:800">Ouvrir l\'exercice suivant</button>'+
      '<button onclick="M5_exercicePlusTard()" style="padding:10px 12px;border-radius:10px;border:1px solid #d8c48a;background:#fff;color:#5a4300;font-weight:700">Plus tard</button></div>'+
      '<div style="font-size:11.5px;margin-top:6px;color:#7a6520">Tes semaines déjà saisies ne bougent pas, et l\'exercice terminé reste consultable.</div>';
    el.style.display='block';
  }
  window.M5_verifierExercice=verifier;
  if(document.readyState==='complete')setTimeout(verifier,600);else window.addEventListener('load',function(){setTimeout(verifier,600);});
})();
