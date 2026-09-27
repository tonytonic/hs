/* SimulHeures — journal des erreurs techniques (01/10/2026)
   Garde sur l'appareil les 10 dernières erreurs JavaScript (message, fichier, ligne, page, date)
   pour le rapport technique de « Nous contacter ». Rien n'est envoyé : l'utilisateur choisit
   de joindre le rapport à son mail. Aucune donnée saisie n'y figure. */
(function(){
  var K='SH_ERR_LOG',MAX=10;
  function court(s,n){s=String(s==null?'':s).replace(/\s+/g,' ');return s.length>n?s.slice(0,n)+'…':s;}
  /* 27/09/2026 : chemin relatif à la racine de l'appli (déduite de l'adresse de ce script) : jamais le
     dossier ni l'adresse d'hébergement. Erreurs de transition entre pages ignorées (sans effet pour l'utilisateur). */
  var BASE='';try{BASE=String((document.currentScript&&document.currentScript.src)||'').replace(/js\/journal-erreurs\.js.*$/,'');}catch(e){}
  var BRUIT=/ViewTransition|Transition was (aborted|skipped)/i;
  function fichier(u){try{u=String(u||'').split('?')[0].split('#')[0];if(BASE&&u.indexOf(BASE)===0)return u.slice(BASE.length)||'index.html';return u.split('/').pop();}catch(e){return '';}}
  function noter(msg,src,ligne){
    try{
      var l=JSON.parse(localStorage.getItem(K)||'[]');if(!Array.isArray(l))l=[];
      if(BRUIT.test(String(msg)))return;
      var page=fichier(location.href)||'?',n=new Date(),z=function(x){return ('0'+x).slice(-2);},e={d:n.getFullYear()+'-'+z(n.getMonth()+1)+'-'+z(n.getDate())+' '+z(n.getHours())+':'+z(n.getMinutes()),p:page,m:court(msg,140),f:fichier(src),l:ligne||0};
      var der=l[l.length-1];if(der&&der.m===e.m&&der.p===e.p)return;   // pas de doublon en rafale
      l.push(e);while(l.length>MAX)l.shift();localStorage.setItem(K,JSON.stringify(l));
    }catch(x){}
  }
  // ménage : erreurs de transition déjà notées, chemins avec le dossier d'hébergement
  try{var l0=JSON.parse(localStorage.getItem(K)||'[]');if(Array.isArray(l0)){var l1=l0.filter(function(x){return !(x&&BRUIT.test(x.m||''));}).map(function(x){if(x&&x.p&&x.p.indexOf('/')>=0&&!/^(module\d|heures|paye|fox|outils|GrillePaye)\//.test(x.p))x.p=x.p.split('/').pop();return x;});
    if(JSON.stringify(l1)!==JSON.stringify(l0)){if(l1.length)localStorage.setItem(K,JSON.stringify(l1));else localStorage.removeItem(K);}}}catch(e){}
  window.addEventListener('error',function(ev){noter(ev.message||(ev.error&&ev.error.message)||'Erreur',ev.filename,ev.lineno);});
  window.addEventListener('unhandledrejection',function(ev){var r=ev.reason;noter('Promesse : '+((r&&r.message)||r),'',0);});
})();
