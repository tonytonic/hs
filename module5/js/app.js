/**
 * APP.JS — Orchestrateur M5 Temps Partiel
 * Calendrier semaine + popup saisie journalière + saisie hebdo
 */
(function() {
'use strict';

let currentSection  = 'accueil';
let currentAnalysis = null;
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
        { feriesMap, neutraliseFeries: contract.neutraliseFeries===true || contract.neutraliseFeries===undefined, mondayStr:monday, joursOuvresContrat: contract.joursOuvresContrat||5 }
      );
    }
  }

  const allWeeks=M5_DataStore.getWeeksSorted(year);
  const last12=M5_DataStore.getLast12Weeks(year);
  const rule12=CalcEngine.check12WeeksRule(last12,contract.hoursBase);
  const stats=M5_DataStore.getAnnualStats(year,contract.hoursBase,contract);

  // Mode ANNUEL
  let annuelResult=null;
  if(contract.modeCalcul==='ANNUEL') {
    annuelResult=CalcEngine.calcAnnuel(contract.hoursBase,contract.exerciceStart||'01/01',allWeeks);
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
    const weeksMois=allWeeks.filter(w=>{
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
  let wellbeing=null;
  if(typeof M5_Wellbeing!=='undefined' && allWeeks.length>=2) {
    // Bien-être = fenêtre glissante des 12 dernières semaines réelles
    // (le corps ne se souvient pas de janvier — Sonnentag, Karasek mesurent sur cycles courts)
    const todayStr=M5_localDK(new Date());
    const weeksPassees=allWeeks.filter(w=>w.monday<=todayStr);
    const weeksWellbeing=weeksPassees.slice(-12); // 12 dernières semaines MAX
    if(weeksWellbeing.length>=2) {
      wellbeing=M5_Wellbeing.compute(weeksWellbeing, contract.hoursBase, contract);
    }
  }

  currentAnalysis={weekResult,rule12,isVacWeek:isVac,annualStats:stats,contract,
    weeks:last12,weekMode:wk.mode,feriesMap,annuelResult,mensuelResult,wellbeing};
  return currentAnalysis;
}

// ── Refresh UI ────────────────────────────────────────────────────
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
    badge.textContent=contract.hoursBase+'h/sem';
    badge.className='m5-contract-badge ok';
    badge.style.display='inline-flex';
  }
  updateYearBadge();
  const analysis=runAnalysis();
  if(!analysis) return;
  // Bulle Mizuki — wellbeing en priorité si signal fort
  let bubbleText=Mizuki.getBubbleText(analysis);
  if(analysis.wellbeing&&analysis.wellbeing.available&&analysis.wellbeing.niveau==='critique') {
    const name=localStorage.getItem('M5_USER_NAME')||'';
    bubbleText=M5_Wellbeing.getMizukiText(analysis.wellbeing,name)||bubbleText;
  }
  const bubbleEl=document.getElementById('mizuki-bubble-text');
  if(bubbleEl) bubbleEl.textContent=bubbleText;
  renderCalendar();
  renderPeriodeNav();
  renderWeekSummary(analysis);
  renderQuickStats(analysis);
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
        {h:base,lbl:`${base}h ✓`},
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
    el.innerHTML=`
      <div class="m5-cal-weekly-badge">Mode hebdomadaire</div>
      <div class="m5-cal-week-total-cell" onclick="openWeeklySaisie()">
        <div class="m5-cal-week-total-val">${wk.total}h</div>
        <div class="m5-cal-week-total-sub">total semaine — tap pour modifier</div>
      </div>
      <div style="display:flex;gap:8px;margin-top:10px;">
        <button class="m5-btn m5-btn-outline m5-btn-sm" style="flex:1" onclick="openWeeklySaisie()">📊 Total semaine</button>
        <button class="m5-btn m5-btn-sm ${isVacH?'m5-btn-primary':'m5-btn-outline'}" onclick="toggleVacSemaine()">🌴 ${isVacH?'Congés ✓':'Congés'}</button>
      </div>
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
      hoursHtml=worked!==null?`<span class="m5-cal-day-hours">${worked}h</span><span class="m5-cal-day-ferie">🎌</span>`:'<span class="m5-cal-day-ferie">🎌</span>';
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
      hoursHtml=`<span class="m5-cal-day-hours">${worked}h</span>`;
      if(diff>0) hoursHtml+=`<span class="m5-cal-day-diff">+${diff.toFixed(1)}</span>`;
    }

    if(isToday) cellClass+=' today';

    const clickable=!isFuture&&!isVac;
    html+=`<div class="${cellClass}" ${clickable?`onclick="openDaySaisie('${d.dk}','${JOURS_SEMAINE[dow]}')"`:''}>`
      +`<div class="m5-cal-day-name">${JOURS_SEMAINE[dow]}</div>`
      +`<div class="m5-cal-day-num">${dayNum}</div>`
      +`${hoursHtml}`
      +`</div>`;
  });
  html+='</div>';

  // Total semaine
  const total=wk.total;
  if(total!==null) {
    const diff=total-contract.hoursBase;
    const pct35=Math.round(total/35*100);
    html+=`<div class="m5-cal-total">
      <span>Total semaine</span>
      <span style="font-weight:700;color:${diff>0?'var(--miz-warning)':'var(--miz-success)'}">
        ${total}h ${diff>0?'(+'+diff.toFixed(1)+'h comp.)':''}
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
  const d=new Date(calendarMonday+'T12:00:00');
  d.setDate(d.getDate()-7);
  calendarMonday=M5_localDK(d);
  // Différer refreshUI au prochain frame → INP nettement réduit (le tap répond instantanément)
  requestAnimationFrame(refreshUI);
}
function calNext() {
  const today=M5_getCurrentMonday();
  const d=new Date(calendarMonday+'T12:00:00');
  d.setDate(d.getDate()+7);
  const next=M5_localDK(d);
  if(next>today) return; // pas dans le futur
  calendarMonday=next;
  requestAnimationFrame(refreshUI);
}
function calToday() {
  calendarMonday=M5_getCurrentMonday();
  requestAnimationFrame(refreshUI);
}

// ── Popup saisie journalière ───────────────────────────────────────
function openDaySaisie(dateStr, jourLabel) {
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

  const inp=document.getElementById('day-saisie-hours');
  inp.value=existing?existing.worked:'';

  // Propositions rapides basées sur le contrat
  // Utilise joursOuvresContrat (défini par l'utilisatrice) au lieu de 5 en dur
  const nbJours = Math.max(1, Math.min(7, contract.joursOuvresContrat || 5));
  const base = contract.hoursBase / nbJours; // base journalière selon vrai pattern
  const proposals=[];
  // Range adaptatif : si base < 4h, propose des paliers plus serrés
  const steps = base < 4
    ? [0, base-0.5, base, base+0.5, base+1, base+2, base+3, base+4]
    : [0, base-1, base-0.5, base, base+0.5, base+1, base+2, base+3];
  steps.forEach(h=>{
    if(h>=0&&h<=12) proposals.push(Math.round(h*2)/2);
  });
  const unique=[...new Set(proposals)].sort((a,b)=>a-b);

  let quickHtml='';
  unique.forEach(h=>{
    const isSelected=existing&&existing.worked===h;
    quickHtml+=`<button class="m5-quick-btn ${isSelected?'selected':''}" onclick="selectQuickHour(${h})">${h}h</button>`;
  });

  document.getElementById('day-quick-hours').innerHTML=quickHtml;
  updateDayPreview();
  openModal('modal-day-saisie');
  setTimeout(()=>inp.focus(),200);
}

function selectQuickHour(h) {
  document.getElementById('day-saisie-hours').value=h;
  document.querySelectorAll('.m5-quick-btn').forEach(b=>{
    b.classList.toggle('selected', parseFloat(b.textContent)===h);
  });
  updateDayPreview();
}

function updateDayPreview() {
  const contract=M5_Contract.get();
  const worked=parseFloat(document.getElementById('day-saisie-hours')?.value)||0;
  const prev=document.getElementById('day-saisie-preview');
  if(!prev||!contract.hoursBase) return;
  const base=contract.hoursBase/5;
  const diff=worked-base;
  prev.innerHTML=diff>0.09
    ?`<span style="color:var(--miz-warning);font-size:13px;">+${diff.toFixed(1)}h au-delà de ta base journalière (${base}h)</span>`
    :diff<-0.1
      ?`<span style="color:var(--miz-text3);font-size:13px;">${diff.toFixed(1)}h — en dessous de la base journalière</span>`
      :`<span style="color:var(--miz-success);font-size:13px;">✓ Dans ta base journalière</span>`;
}

function saveDaySaisie() {
  const dateStr=document.getElementById('day-saisie-date').value;
  const worked=parseFloat(document.getElementById('day-saisie-hours').value);
  if(!dateStr||isNaN(worked)||worked<0||worked>24) {
    toast('Saisis un nombre d\'heures valide (0-24).','error'); return;
  }
  const year=M5_DataStore.getYear();
  // 0h = effacer ce jour uniquement, sans toucher à la semaine
  if(worked===0) {
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
  const contract=M5_Contract.get();
  const year=M5_DataStore.getYear();
  const wk=M5_DataStore.getWeekTotal(calendarMonday,year);
  const av=M5_DataStore.getAvenant(calendarMonday,year);
  const label=M5_formatMonday(calendarMonday);

  document.getElementById('week-saisie-title').textContent=label;
  document.getElementById('week-saisie-monday').value=calendarMonday;

  const inp=document.getElementById('week-saisie-hours');
  inp.value=wk.total!==null?wk.total:contract.hoursBase;

  // Avenant — ne s'affiche que si la CCN le permet (L3123-22 nécessite accord de branche étendu)
  const avenantBloc=document.getElementById('week-avenant-bloc');
  const avenantAllowed = typeof M5_DataStore.isAvenantAllowed==='function' && M5_DataStore.isAvenantAllowed();
  if(avenantBloc) avenantBloc.style.display = avenantAllowed ? 'block' : 'none';

  const toggleAv=document.getElementById('week-avenant-toggle');
  const avSection=document.getElementById('week-avenant-section');
  const avInp=document.getElementById('week-avenant-hours');
  if(av && avenantAllowed) {
    toggleAv.checked=true; avSection.style.display='block'; avInp.value=av.avenatH;
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
  updateWeekPreview();
  openModal('modal-week-saisie');
}

function toggleAvenat() {
  const on=document.getElementById('week-avenant-toggle').checked;
  document.getElementById('week-avenant-section').style.display=on?'block':'none';
  updateWeekPreview();
}

function selectWeekQuick(h) {
  document.getElementById('week-saisie-hours').value=h;
  document.querySelectorAll('#week-quick-hours .m5-quick-btn').forEach(b=>{
    b.classList.toggle('selected',parseFloat(b.textContent)===h);
  });
  updateWeekPreview();
}

function updateWeekPreview() {
  const contract=M5_Contract.get();
  const worked=parseFloat(document.getElementById('week-saisie-hours')?.value)||0;
  const prev=document.getElementById('week-saisie-preview');
  if(!prev||!contract.hoursBase) return;

  const useAvenant=document.getElementById('week-avenant-toggle')?.checked;
  const avenatH=parseFloat(document.getElementById('week-avenant-hours')?.value)||0;
  const pct35=Math.round(worked/35*100);

  let result, html='';

  if(useAvenant && avenatH>contract.hoursBase) {
    result=CalcEngine.calcAvenant(contract.hoursBase,avenatH,worked,contract.hourlyRate||0);
    if(result) {
      html+=`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px;">
        <span class="m5-preview-tag">${result.avenatPaidH>0?result.avenatPaidH.toFixed(1)+'h avenant (taux normal)':'✓ Dans le contrat'}</span>
        ${result.compH25>0?`<span class="m5-preview-tag warn">+${result.compH25.toFixed(1)}h à +25%</span>`:''}
        <span class="m5-preview-tag ${pct35>=95?'danger':''}">${pct35}% temps plein</span>
      </div>`;
      if(result.avenatPaidH>0&&!result.compH25) {
        html+=`<div class="m5-alert ok" style="font-size:12px;padding:6px 10px;margin-bottom:4px;"><span>📋</span> Heures dans l'avenant — taux normal, pas de majoration.</div>`;
      }
      result.alerts.forEach(a=>{
        html+=`<div class="m5-alert ${a.level}" style="font-size:12px;padding:6px 10px;margin-bottom:4px;"><span>${a.level==='critique'?'🚨':'ℹ️'}</span> ${a.msg}</div>`;
      });
      if(result.totalCompH>0&&contract.hourlyRate>0){const _c=result.comp1Amount+result.comp2Amount;html+=`<div class="m5-alert info" style="font-size:12px;padding:6px 10px;"><span>💰</span> Majoration : <strong>${_c.toFixed(2)} €</strong> brut sur les heures comp.</div>`;}
    }
  } else {
    result=CalcEngine.calcWeek(contract.hoursBase,worked,contract,contract.hourlyRate||0);
    html+=`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px;">
      <span class="m5-preview-tag ${result.totalCompH>0?'warn':'ok'}">${result.totalCompH>0?'+'+result.totalCompH.toFixed(1)+'h comp.':'✓ Dans le contrat'}</span>
      <span class="m5-preview-tag ${pct35>=95?'danger':''}">${pct35}% du temps plein</span>
    </div>`;
    result.alerts.forEach(a=>{
      html+=`<div class="m5-alert ${a.level}" style="font-size:12px;padding:6px 10px;margin-bottom:4px;"><span>${a.level==='critique'?'🚨':'⚠️'}</span> ${a.msg}</div>`;
    });
    if(result.totalCompH>0&&contract.hourlyRate>0){const _c=result.comp1Amount+result.comp2Amount;html+=`<div class="m5-alert info" style="font-size:12px;padding:6px 10px;"><span>💰</span> Majoration : <strong>${_c.toFixed(2)} €</strong> brut sur les heures comp.</div>`;}
  }
  prev.innerHTML=html;
}

function saveWeeklySaisie() {
  const monday=document.getElementById('week-saisie-monday').value;
  const worked=parseFloat(document.getElementById('week-saisie-hours').value);
  if(!monday||isNaN(worked)||worked<0||worked>=35) {
    toast('Saisis un total entre 0 et 34,5h.','error'); return;
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
    html+=`<div class="m5-alert info"><span>💰</span><div>Majoration estimée : <strong>${_cw.toFixed(2)} € brut</strong> sur ${weekResult.totalCompH}h comp.</div></div>`;
  }
  el.innerHTML=html;
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
      <div class="m5-stat"><div class="m5-stat-val">${annuelResult.reelCumule}h</div><div class="m5-stat-label">Heures réalisées</div></div>
      <div class="m5-stat"><div class="m5-stat-val ${cls}">${solde>=0?'+':''}${solde}h</div><div class="m5-stat-label">Avance/Retard</div></div>
    </div>
    <div class="m5-alert ${solde>1?'ok':solde<-2?'warn':'info'}" style="margin-bottom:6px;">
      <span>${solde>1?'🚀':solde<-2?'⏳':'➡️'}</span>
      <div style="font-size:12px;">Objectif : <strong>${annuelResult.objectifAnnuel}h/an</strong> — Théorique cumulé : ${annuelResult.theoriqueCumule}h</div>
    </div>`;
    // Plafond HC annuel Art. L3123-28 = contractH × cap × 52
    const hcCapAnnuel=Math.round(contract.hoursBase*contract.cap*52*10)/10;
    const allWeeksForCap=M5_DataStore.getWeeksSorted(M5_DataStore.getYear())||[];
    const weeksEx=allWeeksForCap.filter(w=>w.monday>=annuelResult.debutEx&&w.monday<=annuelResult.finEx);
    const totalHcAnnuel=Math.round(weeksEx.reduce((s,w)=>s+Math.max(0,(w.worked||0)-contract.hoursBase),0)*10)/10;
    const hcPct=hcCapAnnuel>0?Math.round(totalHcAnnuel/hcCapAnnuel*100):0;
    const hcCol=hcPct>=100?'var(--miz-danger)':hcPct>=80?'var(--miz-warning)':'var(--miz-primary)';
    html+=`<div style="margin-top:6px;padding:10px 12px;background:rgba(108,63,197,0.06);border:1px solid var(--miz-border);border-radius:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;margin-bottom:5px;">
        <span style="color:var(--miz-text2);">Plafond HC annuel</span>
        <span style="font-weight:700;color:${hcCol}">${totalHcAnnuel}h / ${hcCapAnnuel}h (${hcPct}%)</span>
      </div>
      <div style="height:6px;background:var(--miz-bg3);border-radius:3px;overflow:hidden;">
        <div style="height:100%;width:${Math.min(hcPct,100)}%;background:${hcCol};border-radius:3px;transition:width .4s;"></div>
      </div>
      <div style="font-size:10px;color:var(--miz-text3);margin-top:4px;">Art. L3123-28 — plafond ${Math.round(contract.cap*100)}% du contrat × 52 sem.</div>
      ${hcPct>=100?'<div style="font-size:11px;color:var(--miz-danger);margin-top:4px;font-weight:600;">⚠️ Plafond annuel dépassé — signale-le à ton employeur</div>':''}
    </div>`;
  } else if(mode==='MENSUEL'&&mensuelResult) {
    const delta=mensuelResult.delta;
    const deltaLabel=delta>0?`+${delta.toFixed(1)}h HC`:delta===0?'✓ Équilibré':'Sous le seuil';
    const deltaCls=delta>0?'warn':'ok';
    // Barre de progression vers le seuil
    const pct=Math.min(100,Math.round(mensuelResult.totalWorked/mensuelResult.seuilMensuel*100));
    const reste=Math.max(0,Math.round((mensuelResult.seuilMensuel-mensuelResult.totalWorked)*10)/10);
    const barColor=pct>=100?'var(--miz-warning)':'var(--miz-primary)';
    html+=`<div class="m5-stat-grid" style="margin-bottom:10px;">
      <div class="m5-stat"><div class="m5-stat-val">${mensuelResult.totalWorked}h</div><div class="m5-stat-label">Réalisées</div></div>
      <div class="m5-stat"><div class="m5-stat-val" style="color:var(--miz-text3);font-size:16px;">${mensuelResult.seuilMensuel}h</div><div class="m5-stat-label">Seuil période</div></div>
      <div class="m5-stat"><div class="m5-stat-val ${mensuelResult.totalCompH>0?'warn':'ok'}">${mensuelResult.totalCompH}h</div><div class="m5-stat-label">HC générées</div></div>
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
        ${pct<100?`Il reste <strong>${reste}h</strong> pour atteindre le seuil`:'<span style="color:var(--miz-warning)">⚠️ Seuil dépassé — heures comp. en cours</span>'}
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
      <div class="m5-stat"><div class="m5-stat-val ${r12Cls}" title="Semaines consécutives avec +2h ou plus (Art. L3123-13)">${rule12.maxConsec}</div><div class="m5-stat-label">Consécutives +2h</div></div>
    </div>
    ${weeksWithHC>0&&rule12.maxConsec<weeksWithHC?`<div style="font-size:11px;color:var(--miz-text3);padding:4px 2px;">
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

  // Note données limitées — bannière proéminente
  let html='';
  if(wb.donneesLimitees && wb.noteMin) {
    html+=`<div style="background:#fff3e0;border:2px solid #ff9800;border-radius:10px;padding:10px 12px;font-size:12px;color:#e65100;margin-bottom:12px;display:flex;gap:8px;align-items:flex-start;">
      <span style="font-size:16px;">📊</span>
      <div><strong>Analyse en cours de construction</strong><br>${wb.noteMin}<br>
      <span style="font-size:11px;opacity:0.8;">Les scores en 0/100 avec peu de semaines sont normaux — ils reflètent que tu n'as pas encore de semaines de récupération.</span></div>
    </div>`;
  }

  // Si score global disponible, afficher une aide à la lecture
  if(!wb.donneesLimitees) {
    html+=`<div style="font-size:11px;color:var(--miz-text3);padding:4px 2px 8px;text-align:center;">
      Basé sur ${wb.stats.n} semaines de données
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
    const pct35=Math.round(worked/35*100);
    const d=new Date(w.monday+'T12:00:00'),fn=new Date(w.monday+'T12:00:00');
    fn.setDate(fn.getDate()+6); // semaine complète 7 jours
    const label=`${d.getDate()}/${d.getMonth()+1} → ${fn.getDate()}/${fn.getMonth()+1}`;
    let cls='normal';
    if(isVac) cls='vacances'; else if(pct35>=95) cls='danger'; else if(diff>0) cls='warn';
    const compLabel=isVac?'🌴':diff>0?`+${diff.toFixed(1)}h`:'✓';
    return `<div class="m5-week-item" onclick="goToWeek('${w.monday}')">
      <div class="m5-week-date">${label} <span style="font-size:10px;color:var(--miz-text3)">${w.mode==='week'?'hebdo':'journal.'}</span></div>
      <div class="m5-week-hours">${isVac?'—':worked+'h'}</div>
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
          <div class="m5-stat"><div class="m5-stat-val">${ar.reelCumule}h</div><div class="m5-stat-label">Réalisées</div></div>
          <div class="m5-stat"><div class="m5-stat-val ${cls}">${solde>=0?'+':''}${solde}h</div><div class="m5-stat-label">Avance/Retard</div></div>
        </div>
        <div class="m5-alert info" style="margin-bottom:8px;">
          <span>🎯</span><div>Objectif : <strong>${ar.objectifAnnuel}h/an</strong><br>
          <small>Théorique cumulé : ${ar.theoriqueCumule}h — ${ar.joursEcoules} jours écoulés</small></div>
        </div>
        <div class="m5-alert ${solde>1?'ok':solde<-2?'warn':'info'}">
          <span>${solde>1?'🚀':solde<-2?'⏳':'➡️'}</span>
          <div>${solde>1?`En avance de <strong>${solde}h</strong>.`:solde<-2?`<strong>${Math.abs(solde)}h</strong> de retard.`:"Dans les clous sur l'objectif annuel."}</div>
        </div>
      </div></div>`;
  } else if(mode==='MENSUEL'&&analysis&&analysis.mensuelResult) {
    const mr=analysis.mensuelResult;
    const delta=mr.delta;
    html+=`<div class="m5-card" style="margin:12px 0;">
      <div class="m5-card-header"><span class="m5-card-title">📊 Bilan mensuel — ${new Date().toLocaleDateString('fr-FR',{month:'long',year:'numeric'})}</span></div>
      <div class="m5-card-body">
        <div class="m5-stat-grid" style="margin-bottom:12px;">
          <div class="m5-stat"><div class="m5-stat-val">${mr.totalWorked}h</div><div class="m5-stat-label">Ce mois</div></div>
          <div class="m5-stat"><div class="m5-stat-val ${delta>0?'warn':'ok'}">${delta>=0?'+':''}${delta.toFixed(1)}h</div><div class="m5-stat-label">vs seuil</div></div>
          <div class="m5-stat"><div class="m5-stat-val">${mr.totalCompH}h</div><div class="m5-stat-label">Heures comp.</div></div>
        </div>
        <div class="m5-alert info" style="margin-bottom:8px;">
          <span>📊</span><div>Seuil mensuel : <strong>${mr.seuilMensuel}h</strong> (${contract.hoursBase}h × 52 / 12)</div>
        </div>
        ${mr.totalCompH>0?`<div class="m5-alert ok"><span>💰</span><div>${mr.compH1.toFixed(1)}h à +${Math.round((contract.rate1||0.10)*100)}%${mr.compH2>0?' | '+mr.compH2.toFixed(1)+'h à +'+Math.round((contract.rate2||0.25)*100)+'%':''}</div></div>`:''}
      </div></div>`;
  } else if(stats) {
    html+=`<div class="m5-card" style="margin:12px 0;">
      <div class="m5-card-header"><span class="m5-card-title">📊 Bilan ${exLabel}</span></div>
      <div class="m5-card-body">
        <div class="m5-stat-grid" style="margin-bottom:14px;">
          <div class="m5-stat"><div class="m5-stat-val">${stats.totalWeeks}</div><div class="m5-stat-label">Semaines</div></div>
          <div class="m5-stat"><div class="m5-stat-val">${stats.avgWorked}h</div><div class="m5-stat-label">Moy. hebdo</div></div>
          <div class="m5-stat"><div class="m5-stat-val">${stats.pctOverContract}%</div><div class="m5-stat-label">En dépassement</div></div>
        </div>
        <div class="m5-alert ${stats.totalComp>caps.annual?'warn':'info'}" style="margin-bottom:8px;">
          <span>⏱️</span><div><strong>${stats.totalComp.toFixed(1)}h</strong> complémentaires<br>
          <small>Plafond annuel estimé : ${caps.annual.toFixed(1)}h</small></div>
        </div>
        ${stats.totalComp1>0?`<div class="m5-alert ok"><span>💰</span><div>${stats.totalComp1.toFixed(1)}h à +${Math.round((contract.rate1||0.10)*100)}%${stats.totalComp2>0?' | '+stats.totalComp2.toFixed(1)+'h à +'+Math.round((contract.rate2||0.25)*100)+'%':' | Aucune tranche à 25%'}</div></div>`:''}
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
      if(wh>=35){ bg='rgba(220,38,38,0.92)'; border='rgba(185,28,28,1)'; txt='#fff'; }
      else if(wh>contract.hoursBase){ /* HC : jaune-orange clair, distinct du rouge */ const i=Math.min(Math.round(ratio*255),255); bg=`rgba(251,191,36,${0.55+ratio*0.30})`; border=`rgba(217,119,6,0.85)`; txt='#1f1f1f'; }
      else if(wh>0){ bg=`rgba(16,185,129,${0.25+ratio*0.5})`; border='rgba(16,185,129,0.5)'; txt='#fff'; }
      const d=new Date(w.monday+'T12:00:00');
      const lbl=`${d.getDate()}/${d.getMonth()+1}`;
      html+=`<div title="${lbl} : ${wh}h" style="width:38px;height:38px;border-radius:6px;background:${bg};border:1px solid ${border};display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:default;transition:transform .1s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        <span style="font-size:9px;color:rgba(255,255,255,0.50);line-height:1;">${lbl}</span>
        <span style="font-size:12px;font-weight:700;color:${txt};line-height:1.2;">${wh>0?wh+'h':'—'}</span>
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

  html+=`<button class="m5-btn m5-btn-primary m5-btn-full" onclick="exportPDF()" style="margin:0 0 16px;">📄 Exporter en PDF</button>`;
  el.innerHTML=html;
}

// ── Popup Mizuki ──────────────────────────────────────────────────
function openMizukiPopup() {
  const analysis=currentAnalysis||runAnalysis(); if(!analysis) return;
  const popup=Mizuki.getPopupContent(analysis); if(!popup) return;
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
  document.getElementById('contract-hours').value   =c.hoursBase||'';
  document.getElementById('contract-rate').value    =c.hourlyRate||'';
  document.getElementById('contract-ccn').value     =c.idcc||'0';
  // Cap : priorité à la CCN sélectionnée
  let capToShow = c.cap||0.10;
  if(c.idcc>0 && typeof CCN_PARTIEL_API!=='undefined') {
    const ccnR=CCN_PARTIEL_API.getRules(c.idcc);
    if(ccnR && ccnR.cap) capToShow=ccnR.cap;
  }
  document.getElementById('contract-cap').value = capToShow===0.33?'0.33':'0.10';
  document.getElementById('contract-name').value    =localStorage.getItem('M5_USER_NAME')||'';
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

function saveContract() {
  const hoursBase =parseFloat(document.getElementById('contract-hours').value);
  const hourlyRate=parseFloat(document.getElementById('contract-rate').value)||0;
  const idcc      =parseInt(document.getElementById('contract-ccn').value)||0;
  const capManuel =parseFloat(document.getElementById('contract-cap').value)||0.10;
  const name      =document.getElementById('contract-name').value.trim();
  if(!hoursBase||hoursBase<=0||hoursBase>=35) { toast('Saisis une durée entre 1 et 34,5h.','error'); return; }
  // Art. L3123-7 : contrat <24h/sem = durée minimale légale (sauf dérogations : demande salarié, accord branche, étudiant, CDD court, remplacement)
  if(hoursBase < 24) {
    toast("⚠️ Contrat < 24h/sem : vérifie qu'une dérogation légale s'applique (Art. L3123-7)",'warn');
  }
  const ccnRules=typeof CCN_PARTIEL_API!=='undefined'?CCN_PARTIEL_API.getRules(idcc):{cap:capManuel,rate1:0.10,rate2:0.25,threshold:0.10};
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
    rate1:ccnRules.rate1||0.10,rate2:ccnRules.rate2||0.25,threshold:ccnRules.threshold||0.10,
    weekStartDay,exerciceStart,cloturesDates,modeCalcul,neutraliseFeries,
    accordCollectifPrevenance,joursOuvresContrat});
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
  if(mensuelOpts) mensuelOpts.style.display=periode==='MENSUEL'?'block':'none';
  if(customOpts)  customOpts.style.display=periode==='CUSTOM'?'block':'none';
  const year=M5_DataStore.getYear();
  const allWeeks=M5_DataStore.getWeeksSorted(year);
  const weeks=filterWeeksByPeriode(allWeeks, periode, year);
  if(info) info.textContent=`${weeks.length} semaine(s) dans la période sélectionnée`;
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
  return allWeeks; // ANNUEL
}

function launchPDF() {
  try {
    const contract=M5_Contract.get();
    const year=M5_DataStore.getYear();
    const periode=document.getElementById('pdf-periode')?.value||'ANNUEL';
    const allWeeks=M5_DataStore.getWeeksSorted(year);
    const weeks=filterWeeksByPeriode(allWeeks, periode, year);
    const stats=M5_DataStore.getAnnualStats(year,contract.hoursBase,contract);
    const analysis=currentAnalysis||runAnalysis();
    const userName=localStorage.getItem('M5_USER_NAME')||'';
    const periodeLabel=periode==='MENSUEL'
      ? ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'][parseInt(document.getElementById('pdf-mois')?.value||'1')-1]+' '+year
      : periode==='CUSTOM'
        ? (document.getElementById('pdf-date-debut')?.value||'')+' → '+(document.getElementById('pdf-date-fin')?.value||'')
        : String(year);
    const contractWithName={...contract, userName, periodeLabel, periodeMode:periode};
    closeModal('modal-pdf');
    setTimeout(()=>{
      M5_PdfReport.generate(contractWithName, stats, weeks, analysis);
    }, 200);
  } catch(e) { toast('Erreur PDF : '+e.message,'error'); console.error(e); }
}

function exportPDF() { openPDFModal(); }

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
      <span style="font-size:11px;color:#A78BFA;">${ccn.s} — IDCC ${ccn.i} — plafond <strong style="color:#DDD6FE;">${ccn.cap===0.33?'33%':'10%'}</strong></span>
    </div>`).join('');
}

function selectCCN(idcc, nom, secteur) {
  document.getElementById('contract-ccn').value=idcc;
  document.getElementById('contract-ccn-search').value=nom;
  const sel=document.getElementById('contract-ccn-selected');
  if(sel) {
    const rules=typeof CCN_PARTIEL_API!=='undefined'?CCN_PARTIEL_API.getRules(idcc):null;
    const capTxt=rules&&rules.cap===0.33?'33% (accord de branche)':'10% (droit commun)';
    sel.innerHTML=`<strong style="color:#E9D5FF;">✓ ${nom}</strong><br>
      <span style="font-size:11px;color:#A78BFA;">IDCC ${idcc} · Plafond <strong style="color:#DDD6FE;">${capTxt}</strong></span>`;
  }
  const res=document.getElementById('contract-ccn-results');
  if(res) res.style.display='none';
  // Auto-appliquer le plafond si CCN a un accord étendu
  if(typeof CCN_PARTIEL_API!=='undefined') {
    const rules=CCN_PARTIEL_API.getRules(idcc);
    const capEl=document.getElementById('contract-cap');
    if(capEl && rules.cap) capEl.value=String(rules.cap);
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
        <span class="m5-glos-art">${g.art}</span>
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
  const worked=parseFloat(document.getElementById('day-saisie-hours')?.value);
  if(!isNaN(worked)&&worked>=0&&worked<=24) {
    saveDaySaisie();  // sauvegarde si une valeur est saisie
  } else {
    closeModal('modal-day-saisie');  // ferme si rien de valide
  }
}

function saveWeeklySaisieOrClose() {
  const worked=parseFloat(document.getElementById('week-saisie-hours')?.value);
  if(!isNaN(worked)&&worked>=0&&worked<35) {
    saveWeeklySaisie();  // sauvegarde si une valeur est saisie
  } else {
    closeModal('modal-week-saisie');  // ferme si rien de valide
  }
}

// ── Gestion vacances M5 ──────────────────────────────────────────────
function toggleVacSemaine() {
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


// ── Import jours fériés API gouvernement ──────────────────────────
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
  // Recalibrer le calendrier sur la semaine courante de la nouvelle année
  calendarMonday=M5_getCurrentMonday();
  Mizuki.clearCache();
  closeModal('modal-years');
  toast('Exercice '+y+' activé','success');
  refreshUI();
  updateYearBadge();
}

function createNewYear() {
  const y=prompt('Saisir l\'année (ex: 2027)');
  if(!y||!/^\d{4}$/.test(y)) return;
  const yr=parseInt(y);
  if(yr<2020||yr>2050) { toast('Année invalide','error'); return; }
  // Créer un jeu de données vide
  const key='M5_DATA_'+y;
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

function wizNext(step) {
  // Validation avant de passer
  if(step===3) {
    const h=parseFloat(document.getElementById('wiz-hours')?.value||'0');
    if(!h||h<=0||h>=35) { toast('Saisis tes heures contractuelles (ex: 25)','error'); return; }
  }
  _wizGo(step);
}
function wizPrev(step) { _wizGo(step); }
function wizSkip() { wizFinish(); }

function _wizGo(step) {
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

function wizUpdateHoursPreview() {
  const h=parseFloat(document.getElementById('wiz-hours')?.value||'0');
  const el=document.getElementById('wiz-hours-preview'); if(!el) return;
  if(!h||h<=0) { el.textContent=''; return; }
  const mensuel=(h*52/12).toFixed(1);
  el.textContent=`soit environ ${mensuel}h/mois`;
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
      <div style="font-size:11px;color:#A78BFA;">${ccn.s} — plafond <strong style="color:#DDD6FE;">${ccn.cap===0.33?'33%':'10%'}</strong></div>
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
      <span style="font-size:11px;color:#A78BFA;">Plafond HC : <strong style="color:#DDD6FE;">${cap===0.33?'33% (accord de branche)':'10% (droit commun)'}</strong></span>`;
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
  const h=parseFloat(document.getElementById('wiz-hours')?.value||'0');
  const rate=parseFloat(document.getElementById('wiz-rate')?.value||'0');
  const exercice=document.getElementById('wiz-exercice')?.value||'';
  const modeLbls={HEBDO:'Par semaine',MENSUEL:'Par mois',ANNUEL:"Sur l'année"};
  _set('wiz-sum-hours', `⏱️ Contrat : <strong>${h}h/semaine</strong>${rate>0?' · '+rate.toFixed(2)+' €/h':''}`);
  _set('wiz-sum-ccn',   `🏢 CCN : <strong>${_wizCCN?_wizCCN.n+' ('+Math.round(_wizCCN.cap*100)+'%)':'Droit commun (10%)'}</strong>`);
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
  const h=parseFloat(document.getElementById('wiz-hours')?.value||'0');
  if(!h||h<=0||h>=35) { _wizGo(2); toast('Saisis tes heures contractuelles','error'); return; }
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
  const ccnRules=_wizCCN?CCN_PARTIEL_API.getRules(_wizCCN.i):{cap:0.10,rate1:0.10,rate2:0.25,threshold:0.10,nom:'Droit commun'};
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
    rate1:ccnRules.rate1||0.10,
    rate2:ccnRules.rate2||0.25,
    threshold:ccnRules.threshold||0.10,
    weekStartDay:startDay,
    exerciceStart:exercice,
    cloturesDates,
    modeCalcul:_wizMode,
    neutraliseFeries:_wizNeutraliseFeries,
  });
  if(name) localStorage.setItem('M5_USER_NAME', name);
  calendarMonday=M5_getCurrentMonday();
  Mizuki.clearCache();
  toast('Bienvenue '+(name?name+'! ':'')+'Mizuki est prête 🦊','success');
  // FIX : supprimer le style anti-flash qui bloquait le switch wizard → vue principale
  // (avec !important, il empêchait refreshUI() de modifier display)
  try {
    const _af = document.getElementById('m5-antiflash-style');
    if (_af && _af.parentNode) _af.parentNode.removeChild(_af);
  } catch(_) {}
  refreshUI();
}


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
    if(!hours||isNaN(hours)||hours<=0||hours>=35) return;
    const year=M5_DataStore.getYear();
    M5_DataStore.saveWeekTotal(calendarMonday, hours, year);
    Mizuki.clearCache();
    toast(`${hours}h sauvegardées ✓`,'success');
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
window.openYearsPopup=openYearsPopup;
window.switchYear=switchYear;
window.createNewYear=createNewYear;
window.checkPrevenance=checkPrevenance;
window.openContractModal=openContractModal; window.saveContract=saveContract;
window.exportPDF=exportPDF;
window.openPDFModal=openPDFModal;
window.launchPDF=launchPDF;
window.updatePDFPreview=updatePDFPreview;
window.M5_toast=toast;
window.filterGlossaire=filterGlossaire;
window.toggleGlos=toggleGlos;

document.addEventListener('DOMContentLoaded',()=>{
  initCCNSelect(); showSection('accueil'); updateYearBadge(); refreshUI();
  setInterval(()=>{ if(currentSection==='accueil') refreshUI(); },15000);
});

}());
