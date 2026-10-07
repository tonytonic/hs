/* SimulHeures — rappel de sauvegarde (C1)
   Commun à heures, paye, fox, module5, module6.
   Propose une sauvegarde à la clôture d'une période ou au changement d'exercice,
   seulement si la dernière sauvegarde (SH_LAST_BACKUP, écrite par menu.html) a plus de 7 jours,
   et au plus UNE fois par mois pour toute l'appli (26/09/2026) : vue dans un module,
   elle ne revient dans aucun autre avant le mois suivant. Ne lit ni ne modifie aucune donnée des modules. */
(function(){
  var KEY_LAST='SH_LAST_BACKUP', KEY_SHOWN='SH_BACKUP_NUDGE', DELAI=7;
  var src=(document.currentScript&&document.currentScript.src)||'';
  var MENU=src?src.replace(/js\/rappel-sauvegarde\.js.*$/,'menu.html#sauvegarde'):'../menu.html#sauvegarde';
  function month(){return today().slice(0,7);}
  function today(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);}
  function lastISO(){try{return (localStorage.getItem(KEY_LAST)||'').slice(0,10);}catch(e){return '';}}
  function recent(){var l=lastISO();if(!l)return false;return (Date.now()-Date.parse(l))/86400000<DELAI;}
  function show(reason){
    if(document.getElementById('hs-bk-nudge'))return;
    var txt=reason==='year'?'Nouvel exercice : c\u2019est le bon moment pour faire une copie de sauvegarde.'
                          :'P\u00e9riode cl\u00f4tur\u00e9e : c\u2019est le bon moment pour faire une copie de sauvegarde.';
    var l=lastISO();
    var sub=l?'Derni\u00e8re copie de sauvegarde : '+l.split('-').reverse().join('/'):'Aucune copie de sauvegarde pour l\u2019instant.';
    var s=document.createElement('div');s.id='hs-bk-nudge';s.setAttribute('role','status');
    s.style.cssText='position:fixed;left:12px;right:12px;bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:99998;background:#122234;border:1px solid rgba(150,190,220,.45);border-radius:13px;padding:12px 14px;box-shadow:0 8px 28px rgba(0,0,0,.5);font-family:inherit;max-width:520px;margin:0 auto';
    s.innerHTML='<div style="color:#fff;font-size:13px;font-weight:700;line-height:1.35">\ud83d\udcbe '+txt+'</div>'
      +'<div style="color:#b8c7da;font-size:11.5px;margin:3px 0 10px">'+sub+'</div>'
      +'<div style="display:flex;gap:8px;justify-content:flex-end">'
      +'<button type="button" data-a="later" style="background:transparent;color:#b8c7da;border:1px solid rgba(150,190,220,.4);border-radius:9px;padding:8px 14px;font-size:13px;font-weight:600">Plus tard</button>'
      +'<button type="button" data-a="go" style="background:#2196a6;color:#fff;border:none;border-radius:9px;padding:8px 16px;font-size:13px;font-weight:800">Faire une copie</button></div>';
    s.addEventListener('click',function(e){var a=e.target&&e.target.getAttribute('data-a');if(!a)return;
      if(s.parentNode)s.remove(); if(a==='go')location.href=MENU;});
    document.body.appendChild(s);
    try{localStorage.setItem(KEY_SHOWN,month());}catch(e){}
  }
  /* reason : 'period' ou 'year' */
  var TEST=/test-sauvegarde/.test(location.search+location.hash);
  window.hsBackupNudge=function(reason){
    try{
      if(TEST){if(document.body)show(reason);else document.addEventListener('DOMContentLoaded',function(){show(reason);});return;}
      if(recent())return;
      if((localStorage.getItem(KEY_SHOWN)||'').slice(0,7)===month())return;
      if(document.body)show(reason);else document.addEventListener('DOMContentLoaded',function(){show(reason);});
    }catch(e){}
  };
  /* dates : liste de dates ISO (AAAA-MM-JJ) de clôture. Propose si une clôture
     est passée depuis la dernière sauvegarde. */
  window.hsBackupCheckDates=function(dates){
    try{
      var t=today(),l=lastISO(),hit=false;
      (dates||[]).forEach(function(d){d=String(d||'').slice(0,10);if(/^\d{4}-\d{2}-\d{2}$/.test(d)&&d<=t&&d>l)hit=true;});
      if(hit||TEST)window.hsBackupNudge('period');
    }catch(e){}
  };
})();
