/**
 * CONTRATS — plusieurs contrats en parallèle dans Mizuki (C6)
 * Contrat 1 = clés historiques (M5_CONTRACT, M5_DATA_2026…), sans migration.
 * Contrats 2 et 3 = mêmes clés préfixées : M5_C2_CONTRACT, M5_C2_DATA_2026…
 * Le contrat actif est fixé au chargement de la page ; changer de contrat recharge la page.
 * Clés communes à tous les contrats : prénom, réglages d'affichage, jours fériés.
 */
(function(global){
'use strict';
var MAX=3, K_ACTIVE='M5_ACTIVE_CONTRACT', K_NOMS='M5_CONTRATS_NOMS';
function get(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function set(k,v){try{localStorage.setItem(k,v);}catch(e){}}
function active(){var n=parseInt(get(K_ACTIVE),10);return (n>=1&&n<=MAX)?n:1;}
var ACTIVE=active();
function keyFor(n,name){return n===1?name:name.replace(/^M5_/,'M5_C'+n+'_');}
function key(name){return keyFor(ACTIVE,name);}
function exists(n){try{var c=JSON.parse(get(keyFor(n,'M5_CONTRACT'))||'null');return !!(c&&c.hoursBase>0);}catch(e){return false;}}
function noms(){try{return JSON.parse(get(K_NOMS)||'{}')||{};}catch(e){return {};}}
function nom(n){var m=noms();if(m[n])return m[n];
  try{var c=JSON.parse(get(keyFor(n,'M5_CONTRACT'))||'null');if(c&&c.ccnNom)return c.ccnNom;}catch(e){}
  return 'Contrat '+n;}
function list(){var r=[];for(var n=1;n<=MAX;n++)if(exists(n)||n===ACTIVE)r.push(n);return r;}
function existing(){var r=[];for(var n=1;n<=MAX;n++)if(exists(n))r.push(n);return r;}
/* 27/09/2026 : iPhone, plus de flash au changement de contrat. location.reload() efface l'écran
   avant d'afficher la page suivante ; une navigation « replace » vers la même page profite de la
   transition entre pages (@view-transition, main.css) : l'ancien écran reste affiché jusqu'au nouveau. */
function recharger(){try{location.replace(location.pathname+location.search);}catch(e){location.reload();}}
function switchTo(n){set(K_ACTIVE,String(n));recharger();}
function add(){
  var free=0;for(var n=2;n<=MAX;n++)if(!exists(n)&&n!==ACTIVE){free=n;break;}
  if(!free){alert('Tu peux suivre jusqu\u2019à '+MAX+' contrats.');return;}
  var t=prompt('Nom de ce nouveau contrat (ex : Ménage, Restaurant)','Contrat '+free);
  if(t===null)return;
  var m=noms();m[free]=(t.trim()||('Contrat '+free)).slice(0,30);set(K_NOMS,JSON.stringify(m));
  switchTo(free);
}
function rename(n){var t=prompt('Nom du contrat',nom(n));if(t===null)return;
  var m=noms();m[n]=(t.trim()||('Contrat '+n)).slice(0,30);set(K_NOMS,JSON.stringify(m));recharger();}
function remove(n){
  if(n===1)return;
  if(!confirm('Supprimer « '+nom(n)+' » et toutes ses saisies ?\n\nPense à faire une copie de sauvegarde avant (menu → 💾).'))return;
  var pre='M5_C'+n+'_',ks=[];
  for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf(pre)===0)ks.push(k);}
  ks.forEach(function(k){try{localStorage.removeItem(k);}catch(e){}});
  var m=noms();delete m[n];set(K_NOMS,JSON.stringify(m));
  switchTo(1);
}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}

/* Bandeau de choix du contrat : visible dès qu'il y a 2 contrats (ou un nouveau en cours de création) */
function renderStrip(){
  var l=list();if(l.length<2)return;
  var h=document.querySelector('header.m5-header');if(!h)return;
  var d=document.createElement('div');d.id='m5-contrats';
  d.style.cssText='display:flex;gap:6px;overflow-x:auto;padding:8px 12px;background:rgba(108,63,197,0.08);border-bottom:1px solid rgba(108,63,197,0.18);-webkit-overflow-scrolling:touch';
  var html='';
  l.forEach(function(n){var on=n===ACTIVE;
    html+='<button type="button" data-n="'+n+'" style="flex-shrink:0;border-radius:999px;padding:7px 12px;font:inherit;font-size:12.5px;font-weight:700;cursor:pointer;white-space:nowrap;'
      +(on?'background:#6C3FC5;color:#fff;border:1px solid #6C3FC5;':'background:#fff;color:#6C3FC5;border:1px solid rgba(108,63,197,0.45);')+'">'
      +esc(nom(n))+(on&&!exists(n)?' (à configurer)':'')+(on?' <span data-r="'+n+'" aria-label="Renommer" style="opacity:.8;margin-left:4px">✎</span>':'')+'</button>';});
  if(existing().length<MAX&&exists(ACTIVE))html+='<button type="button" data-add="1" style="flex-shrink:0;border-radius:999px;padding:7px 12px;font:inherit;font-size:12.5px;font-weight:700;cursor:pointer;background:transparent;color:#6C3FC5;border:1px dashed rgba(108,63,197,0.55)">+ Contrat</button>';
  d.innerHTML=html;
  d.addEventListener('click',function(e){
    var r=e.target.closest('[data-r]');if(r){e.stopPropagation();rename(+r.getAttribute('data-r'));return;}
    if(e.target.closest('[data-add]')){add();return;}
    var b=e.target.closest('[data-n]');if(b&&+b.getAttribute('data-n')!==ACTIVE)switchTo(+b.getAttribute('data-n'));
  });
  h.parentNode.insertBefore(d,h.nextSibling);
}
/* Dans « Mon contrat » : ajouter / supprimer un contrat */
function renderModal(){
  var m=document.querySelector('#modal-contract .m5-modal');if(!m)return;
  var d=document.createElement('div');
  d.id='m5-multi-contrat';
  d.style.cssText='margin-top:16px;padding:14px 12px;border-radius:12px;background:rgba(108,63,197,0.06);border:1.5px solid rgba(108,63,197,0.25);font-size:13px';
  var h='<div style="font-weight:700;margin-bottom:4px">👥 Plusieurs employeurs ?</div>'
    +'<div style="opacity:.75;font-size:12px;margin-bottom:10px">Chaque contrat a ses heures, sa convention et ses heures complémentaires, calculées séparément.</div>';
  if(existing().length<MAX&&exists(ACTIVE))h+='<button type="button" class="m5-btn m5-btn-full" data-add="1" style="margin-bottom:8px">+ Ajouter un contrat</button>';
  if(ACTIVE!==1)h+='<button type="button" class="m5-btn m5-btn-full" data-del="1" style="color:#c0392b">Supprimer « '+esc(nom(ACTIVE))+' »</button>';
  d.innerHTML=h;
  d.addEventListener('click',function(e){if(e.target.closest('[data-add]'))add();if(e.target.closest('[data-del]'))remove(ACTIVE);});
  /* Juste sous « Enregistrer », avant la zone danger : visible sans tout faire défiler */
  var save=m.querySelector('button[onclick*="saveContract"]');
  if(save&&save.parentNode)save.parentNode.insertBefore(d,save.nextSibling);else m.appendChild(d);
}

/* ── Vue d'ensemble (dès 2 contrats) : heures saisies par contrat + total + repère 48 h ── */
function pad(n){return ('0'+n).slice(-2);}
function dk(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
function allData(n){ /* toutes les années du contrat n, fusionnées */
  var pre=keyFor(n,'M5_DATA_'),out={};
  for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);
    if(k&&k.indexOf(pre)===0&&/^\d{4}$/.test(k.slice(pre.length))){
      try{var o=JSON.parse(localStorage.getItem(k))||{};for(var d in o)out[d]=o[d];}catch(e){}}}
  return out;}
function sumRange(data,a,b){var t=0;
  for(var d in data){if(d<a||d>b)continue;var e=data[d];
    if(e&&(e.type==='day'||e.type==='week')&&e.worked>0)t+=e.worked;}
  return Math.round(t*100)/100;}
function fmtH(h){var hh=Math.floor(h),mm=Math.round((h-hh)*60);if(mm===60){hh++;mm=0;}return hh+' h'+(mm?' '+pad(mm):'');}
function base(n){try{var c=JSON.parse(get(keyFor(n,'M5_CONTRACT'))||'null');return c&&c.hoursBase>0?c.hoursBase:0;}catch(e){return 0;}}
/* 10 h par jour tous employeurs confondus (26/09/2026).
   Seules les journées saisies au jour près comptent. On ne liste que les journées
   où c'est l'addition des contrats qui dépasse 10 h : un dépassement dans un seul
   contrat est déjà signalé par Mizuki dans ce contrat. */
function jours10h(ex,fin){
  var t=fin?new Date(fin.getTime()):new Date();t.setHours(12,0,0,0);var a=new Date(t);a.setDate(t.getDate()-27);
  var da=dk(a),db=dk(t),parJour={};
  ex.forEach(function(n){var d=allData(n);for(var j in d){if(j<da||j>db)continue;var e=d[j];
    if(e&&e.type==='day'&&e.worked>0){(parJour[j]=parJour[j]||[]).push({n:n,h:e.worked});}}});
  var liste=[];
  Object.keys(parJour).sort().forEach(function(j){var l=parJour[j];if(l.length<2)return;
    var tot=0,max=0;l.forEach(function(x){tot+=x.h;if(x.h>max)max=x.h;});tot=Math.round(tot*100)/100;
    if(tot>10&&max<=10)liste.push({j:j,tot:tot,l:l});});
  var art=function(a){return global.LegiRef&&LegiRef.html?LegiRef.html(a):a;};
  var h='<div style="margin-top:8px;padding:9px 11px;border-radius:10px;font-size:12px;line-height:1.45;'
    +(liste.length?'background:#fff3e0;color:#b34700;border:1px solid #ffb74d':'background:rgba(108,63,197,0.06);color:#4a3f66')+'">';
  if(liste.length){
    h+='Journées de plus de 10 h tous employeurs confondus (4 semaines jusqu’au '+dk(t).slice(8)+'/'+dk(t).slice(5,7)+') :<br>';
    h+=liste.slice(-6).map(function(x){var p=x.j.split('-');
      return '<b>'+p[2]+'/'+p[1]+'</b> : '+fmtH(x.tot)+' ('+x.l.map(function(y){return esc(nom(y.n))+' '+fmtH(y.h);}).join(' + ')+')';}).join('<br>');
    if(liste.length>6)h+='<br>… et '+(liste.length-6)+' autre(s).';
    h+='<br>';
  }
  h+='La durée maximale est de 10 h par jour, tous employeurs confondus (art. '+art('L3121-18')+'). '
    +'Pense aussi à tes 11 h de repos entre la fin d’un travail et la reprise du suivant (art. '+art('L3131-1')+') : '
    +'l’appli ne connaît pas tes horaires, elle ne peut pas le vérifier pour toi.</div>';
  return h;
}
/* Retraite progressive (26/09/2026) : part d'un temps plein, dans l'unité du contrat.
   Référence : 35 h/sem, 151,67 h/mois, 1 607 h/an. Fourchette légale 40 % à 80 %
   (art. L351-15 du Code de la sécurité sociale). Repère indicatif uniquement. */
function rpPct(c){
  if(!c)return 0;var dc=c.dureeContrat;
  if(dc&&dc.valeur>0&&(dc.unite==='M'||dc.unite==='A'))return Math.round(dc.valeur/(dc.unite==='M'?151.67:1607)*1000)/10;
  return c.hoursBase>0?Math.round(c.hoursBase/35*1000)/10:0;
}
function rpTexte(pct,total){
  if(!(pct>0))return '';
  var hors=pct<40||pct>80;
  return (total?'Au total, tes contrats représentent ':'Ta durée représente ')+'<b>'+String(pct).replace('.',',')+' %</b> d’un temps plein. '
    +'La retraite progressive demande une durée entre 40 % et 80 % d’un temps plein (art. L351-15 du Code de la sécurité sociale)'
    +(hors?' : '+(total?'ce total':'ta durée')+' est en dehors de cette fourchette.':'.');
}
function contrat(n){try{return JSON.parse(get(keyFor(n,'M5_CONTRACT'))||'null');}catch(e){return null;}}
/* 27/09/2026 : heures complémentaires de chaque contrat (même moteur que la carte Solde).
   Semaine : calcul hebdomadaire. Période : somme des semaines (hebdo) ou calcul mensuel. */
function hcContrat(c,d,wa,pa,pb){
  var o={w:null,p:null};var CE=global.CalcEngine;if(!c||!c.hoursBase||!CE)return o;
  var mode=c.modeCalcul||'HEBDO';if(mode==='ANNUEL')return o;
  function lundis(a,b){var x=new Date(a+'T12:00:00');x.setDate(x.getDate()-((x.getDay()+6)%7));var l=[];while(dk(x)<=b){l.push(dk(x));x.setDate(x.getDate()+7);}return l;}
  function fin(m){var x=new Date(m+'T12:00:00');x.setDate(x.getDate()+6);return dk(x);}
  function hw(m,t){if(!(t>0))return 0;var fm=null;try{fm=global.M5_getFeriesYear?M5_getFeriesYear(parseInt(m,10)):null;}catch(e){}
    var r=CE.calcWeek(c.hoursBase,t,c,0,{feriesMap:fm,neutraliseFeries:c.neutraliseFeries!==false,mondayStr:m,joursOuvresContrat:c.joursOuvresContrat||5});return (r.compH1||0)+(r.compH2||0);}
  try{
    if(mode==='MENSUEL'){
      var ws=lundis(pa,pb).map(function(m){return {worked:sumRange(d,m<pa?pa:m,fin(m)>pb?pb:fin(m))};});
      var nbJ=Math.round((new Date(pb+'T12:00:00')-new Date(pa+'T12:00:00'))/864e5)+1;
      var r=CE.calcMonth(c.hoursBase,ws,c,0,nbJ);o.p=(r.compH1||0)+(r.compH2||0);
    }else{
      o.w=hw(wa,sumRange(d,wa,fin(wa)));
      var t=0;lundis(pa,pb).forEach(function(m){if(m>=pa)t+=hw(m,sumRange(d,m,fin(m)));});o.p=t;
    }
  }catch(e){}
  if(o.w!=null)o.w=Math.round(o.w*100)/100;if(o.p!=null)o.p=Math.round(o.p*100)/100;
  return o;
}
function hcTxt(h){return h==null?'':'<div style="font-size:11px;font-weight:600;color:'+(h>0?'#d35400':'#9a8fb5')+'">'+(h>0?'dont '+fmtH(h)+' HC':'0 h HC')+'</div>';}
function renderOverview(){
  var old=document.getElementById('m5-ensemble');if(old&&old.parentNode)old.parentNode.removeChild(old);
  var ex=existing();if(ex.length<2)return;
  var strip=document.getElementById('m5-contrats');if(!strip)return;
  /* 27/09/2026 : suit la semaine et la période AFFICHÉES (plus seulement aujourd'hui) */
  var t=new Date(),cm=null;try{cm=global.M5_getCalMonday&&M5_getCalMonday();}catch(e){}
  if(cm&&/^\d{4}-\d{2}-\d{2}$/.test(cm))t=new Date(cm+'T12:00:00');t.setHours(12,0,0,0);
  var mon=new Date(t);mon.setDate(t.getDate()-((t.getDay()+6)%7));var sun=new Date(mon);sun.setDate(mon.getDate()+6);
  var auj=new Date();auj.setHours(12,0,0,0);var estAuj=dk(auj)>=dk(mon)&&dk(auj)<=dk(sun);
  var wa=dk(mon),wb=dk(sun),ma=dk(new Date(t.getFullYear(),t.getMonth(),1)),mb=dk(new Date(t.getFullYear(),t.getMonth()+1,0)),libM='Ce mois';
  try{var per=global.M5_periodeAffichee&&M5_periodeAffichee();if(per&&per.debutStr&&per.finStr){ma=per.debutStr;mb=per.finStr;libM='Période '+ma.slice(8)+'/'+ma.slice(5,7)+' → '+mb.slice(8)+'/'+mb.slice(5,7);}}catch(e){}
  var libS=estAuj?'Cette semaine':'Semaine du '+wa.slice(8)+'/'+wa.slice(5,7);
  var rows='',tw=0,tm=0,hw=0,hm=0,aHw=false,aHm=false;
  ex.forEach(function(n){var d=allData(n),w=sumRange(d,wa,wb),m=sumRange(d,ma,mb),b=base(n),hc=hcContrat(contrat(n),d,wa,ma,mb);tw+=w;tm+=m;
    if(hc.w!=null){hw+=hc.w;aHw=true;}if(hc.p!=null){hm+=hc.p;aHm=true;}
    rows+='<tr'+(n===ACTIVE?' style="font-weight:700"':'')+'><td style="padding:5px 4px;vertical-align:top">'+esc(nom(n))+'</td>'
      +'<td style="padding:5px 4px;text-align:right;white-space:nowrap;vertical-align:top">'+fmtH(w)+(b?' <span style="opacity:.55;font-weight:400">/ '+fmtH(b)+'</span>':'')+hcTxt(hc.w)+'</td>'
      +'<td style="padding:5px 4px;text-align:right;white-space:nowrap;vertical-align:top">'+fmtH(m)+hcTxt(hc.p)+'</td></tr>';});
  tw=Math.round(tw*100)/100;tm=Math.round(tm*100)/100;hw=Math.round(hw*100)/100;hm=Math.round(hm*100)/100;
  var over=tw>48;
  var c=document.createElement('div');c.id='m5-ensemble';
  c.style.cssText='margin:10px 12px 0;padding:12px 14px;border-radius:14px;background:#fff;border:1px solid rgba(108,63,197,0.22);font-size:13px;color:#2a2340';
  c.innerHTML='<div style="font-weight:800;margin-bottom:6px">Vue d\u2019ensemble de tes contrats</div>'
    +'<table style="width:100%;border-collapse:collapse"><thead><tr style="font-size:11.5px;opacity:.65">'
    +'<th style="text-align:left;padding:2px 4px;font-weight:600">Contrat</th>'
    +'<th style="text-align:right;padding:2px 4px;font-weight:600">'+libS+' / base</th>'
    +'<th style="text-align:right;padding:2px 4px;font-weight:600">'+libM+'</th></tr></thead><tbody>'+rows
    +'<tr style="border-top:1px solid rgba(108,63,197,0.25);font-weight:800"><td style="padding:6px 4px">Total</td>'
    +'<td style="padding:6px 4px;text-align:right;vertical-align:top">'+fmtH(tw)+(aHw?hcTxt(hw):'')+'</td><td style="padding:6px 4px;text-align:right;vertical-align:top">'+fmtH(tm)+(aHm?hcTxt(hm):'')+'</td></tr></tbody></table>'
    +'<div style="margin-top:4px;font-size:11px;opacity:.65">Heures travaillées ; en orange, les heures complémentaires (HC) calculées contrat par contrat.</div>'
    +'<div style="margin-top:10px;padding:9px 11px;border-radius:10px;font-size:12px;line-height:1.45;'
    +(over?'background:#fff3e0;color:#b34700;border:1px solid #ffb74d':'background:rgba(108,63,197,0.06);color:#4a3f66')+'">'
    +'Tous employeurs confondus, la durée maximale de travail est de 48 h par semaine '
    +'(art. '+(global.LegiRef&&LegiRef.html?LegiRef.html('L3121-20'):'L3121-20')+' et L8261-1 du Code du travail). '
    +'Total saisi '+(estAuj?'cette semaine':'la semaine du '+wa.slice(8)+'/'+wa.slice(5,7))+' : <b>'+fmtH(tw)+'</b>.'+(over?' Ce total dépasse 48 h.':'')+'</div>'
    +jours10h(ex,sun)
    +(function(){var rp=ex.some(function(n){var c=contrat(n);return c&&c.retraiteProgressive;});if(!rp)return '';
      var tot=0;ex.forEach(function(n){tot+=rpPct(contrat(n));});tot=Math.round(tot*10)/10;
      return '<div style="margin-top:8px;padding:9px 11px;border-radius:10px;font-size:12px;line-height:1.45;background:rgba(108,63,197,0.06);color:#4a3f66">🧓 '+rpTexte(tot,true)+'</div>';})()
    +'<div style="margin-top:6px;font-size:11px;opacity:.6">Semaine du lundi au dimanche. Les heures complémentaires se calculent contrat par contrat, dans chaque contrat. Données indicatives.</div>';
  strip.parentNode.insertBefore(c,strip.nextSibling);
}
global.M5_renderOverview=function(){try{renderOverview();}catch(e){}};
function boot(){try{renderStrip();renderModal();}catch(e){}try{renderOverview();}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();

/* ── Cumul de tous les contrats (26/09/2026) ───────────────────────────────
   La santé (fatigue, récupération) dépend de toutes les heures de la semaine, tous
   employeurs confondus. Les heures complémentaires restent calculées contrat par contrat. */
function isoD(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function debutSem(dk,sd){var d=new Date(dk+'T12:00:00'),diff=((d.getDay()+6)%7)-(sd||0);if(diff<0)diff+=7;d.setDate(d.getDate()-diff);return isoD(d);}
function jlist(k){try{return JSON.parse(get(k)||'{}')||{};}catch(e){return {};}}
/* Semaines cumulées : [{monday, worked, parContrat:{n:h}}], semaines calées sur le début
   de semaine du contrat affiché. Par contrat et par semaine : total hebdo s'il existe,
   sinon somme des jours (comme la saisie). */
function semainesCumul(annees,sd){
  var ex=existing(),b={};
  ex.forEach(function(n){
    var parSem={};
    annees.forEach(function(y){
      var data=jlist(keyFor(n,'M5_DATA_')+y);
      Object.keys(data).forEach(function(dk){
        if(!/^\d{4}-\d{2}-\d{2}$/.test(dk))return;var e=data[dk];if(!e||!(e.worked>0))return;
        var m=debutSem(dk,sd),o=parSem[m]||(parSem[m]={w:null,d:0});
        if(e.type==='week')o.w=(o.w||0)+e.worked;else if(e.type==='day')o.d+=e.worked;
      });
    });
    Object.keys(parSem).forEach(function(m){var o=parSem[m],h=o.w!==null?o.w:o.d,x=b[m]||(b[m]={monday:m,worked:0,parContrat:{}});x.worked+=h;x.parContrat[n]=(x.parContrat[n]||0)+h;});
  });
  return Object.keys(b).sort().map(function(m){var x=b[m];x.worked=Math.round(x.worked*100)/100;return x;});
}
/* Débuts de semaine en congé pour UN contrat (27/09/2026) */
function congesContrat(n,annees,sd){var vu={};annees.forEach(function(y){var v=jlist(keyFor(n,'M5_VACANCES_')+y);Object.keys(v).forEach(function(dk){if(v[dk]&&/^\d{4}-\d{2}-\d{2}$/.test(dk))vu[debutSem(dk,sd)]=1;});});return vu;}
/* Débuts de semaine où l'on est en congé sur TOUS les contrats (repos réel) */
function congesCommuns(annees,sd){
  var ex=existing(),cpt={};
  ex.forEach(function(n){var vu={};
    annees.forEach(function(y){var v=jlist(keyFor(n,'M5_VACANCES_')+y);Object.keys(v).forEach(function(dk){if(v[dk]&&/^\d{4}-\d{2}-\d{2}$/.test(dk))vu[debutSem(dk,sd)]=1;});});
    Object.keys(vu).forEach(function(m){cpt[m]=(cpt[m]||0)+1;});});
  return Object.keys(cpt).filter(function(m){return cpt[m]===ex.length;}).sort();
}
/* Plafond d'heures complémentaires de chaque contrat (CCN prioritaire, comme Mizuki) */
function capDe(c){var cap=c.cap||0.10;try{if(c.idcc>0&&global.CCN_PARTIEL_API)cap=CCN_PARTIEL_API.getRules(c.idcc).cap||cap;}catch(e){}return cap;}
/* Contrat « cumulé » pour le calcul santé : heures = somme, plafond = somme des plafonds */
function contratCumul(){
  var ex=existing(),base=0,capH=0,noms={},c1=contrat(ACTIVE)||{};
  ex.forEach(function(n){var c=contrat(n)||{},h=+c.hoursBase||0;base+=h;capH+=h*capDe(c);noms[c.ccnNom||'']=1;});
  if(!(base>0))return null;
  var r={};for(var k in c1)r[k]=c1[k];
  r.hoursBase=Math.round(base*100)/100;r.cap=capH/base;r.idcc=0;r.ccnNom=Object.keys(noms).length===1?Object.keys(noms)[0]:'';
  r._nbContrats=ex.length;
  return r;
}
/* « Je suis en congés » sur tous les contrats pour les 7 jours à partir de debut.
   Comme le bouton Congés de chaque contrat : les heures saisies ces jours-là sont retirées.
   Un total hebdo n'est retiré que s'il commence dans ces 7 jours et que le contrat a le
   même début de semaine (sinon il couvre aussi d'autres jours). */
function congesTous(debut,annee,retirer){
  var jours=[];for(var i=0;i<7;i++){var d=new Date(debut+'T12:00:00');d.setDate(d.getDate()+i);jours.push(isoD(d));}
  var sdA=((contrat(ACTIVE)||{}).weekStartDay)||0;
  existing().forEach(function(n){
    var kv=keyFor(n,'M5_VACANCES_')+annee,v=jlist(kv);
    if(retirer){jours.forEach(function(j){delete v[j];});set(kv,JSON.stringify(v));return;}
    var kd=keyFor(n,'M5_DATA_')+annee,data=jlist(kd),ch=false,sdN=((contrat(n)||{}).weekStartDay)||0;
    jours.forEach(function(j){v[j]=true;if(data[j]&&(data[j].type!=='week'||sdN===sdA)){delete data[j];ch=true;}});
    if(ch)set(kd,JSON.stringify(data));set(kv,JSON.stringify(v));
  });
}
function congesTousActif(debut,annee){
  var ex=existing();if(ex.length<2)return false;
  return ex.every(function(n){var v=jlist(keyFor(n,'M5_VACANCES_')+annee);for(var i=0;i<7;i++){var d=new Date(debut+'T12:00:00');d.setDate(d.getDate()+i);if(v[isoD(d)])return true;}return false;});
}

global.M5_key=key;
global.M5_rpPct=rpPct;global.M5_rpTexte=rpTexte;
global.M5_Contrats={active:ACTIVE,key:key,keyFor:keyFor,exists:exists,nom:nom,list:list,existing:existing,switchTo:switchTo,add:add,
  semainesCumul:semainesCumul,congesCommuns:congesCommuns,congesContrat:congesContrat,contratCumul:contratCumul,congesTous:congesTous,congesTousActif:congesTousActif};
})(window);
