/* SimulHeures — rapport de plantage pour « Nous contacter » (01/10/2026)
   hsDiagnostic() → Promise<string> : un texte court que l'utilisateur peut joindre à son mail.
   Limité au strict nécessaire pour comprendre une erreur : version, appareil et navigateur,
   état du stockage (taille, données illisibles), migrations faites, dernières erreurs techniques.
   Rien sur les saisies ni sur le travail de l'utilisateur (ni dates, ni heures, ni convention),
   ni prénom, e-mail, employeur, taux, montant, ni aucune adresse de dépôt de code. */
(function(){
  var re=/^\d{4}-\d{2}-\d{2}$/;
  function jget(k){try{var v=localStorage.getItem(k);return v===null?null:JSON.parse(v);}catch(e){return undefined;}}
  function cles(rx){var o=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i),m=rx.exec(k||'');if(m)o.push(m);}return o;}
  function fr(d){return d&&re.test(d)?d.split('-').reverse().join('/'):'?';}
  function nbDates(o){return o&&typeof o==='object'?Object.keys(o).filter(function(k){return re.test(k)||/^\d{4}-W\d{2}$/.test(k);}).length:0;}
  function systeme(){var u=navigator.userAgent||'',m;
    if((m=/iPhone OS (\d+)[_.](\d+)/.exec(u)))return 'iPhone · iOS '+m[1]+'.'+m[2];
    if((m=/iPad.*OS (\d+)[_.](\d+)/.exec(u)))return 'iPad · iPadOS '+m[1]+'.'+m[2];
    if((m=/Android (\d+(\.\d+)?)/.exec(u)))return 'Android '+m[1];
    if(/Macintosh/.test(u))return navigator.maxTouchPoints>1?'iPad (mode ordinateur)':'Mac';
    if(/Windows/.test(u))return 'Windows';return 'Autre';}
  function navig(){var u=navigator.userAgent||'',m;
    if((m=/(?:CriOS|Chrome)\/(\d+)/.exec(u))&&!/Edg\//.test(u))return 'Chrome '+m[1];
    if((m=/Edg\/(\d+)/.exec(u)))return 'Edge '+m[1];
    if((m=/(?:FxiOS|Firefox)\/(\d+)/.exec(u)))return 'Firefox '+m[1];
    if((m=/Version\/(\d+(\.\d+)?).*Safari/.exec(u)))return 'Safari '+m[1];
    return '?';}
  function versionSW(){return new Promise(function(res){var sw=navigator.serviceWorker;
    if(!sw||!sw.controller||!window.MessageChannel){res('');return;}
    var ch=new MessageChannel(),t=setTimeout(function(){res('');},1500);
    ch.port1.onmessage=function(ev){clearTimeout(t);res((ev.data&&ev.data.version)||'');};
    try{sw.controller.postMessage({type:'SH_VERSION'},[ch.port2]);}catch(e){clearTimeout(t);res('');}});}

  window.hsDiagnostic=async function(){
    var L=[],A=function(s){L.push(s);};
    var st=(navigator.standalone||(window.matchMedia&&matchMedia('(display-mode: standalone)').matches))?'appli installée':'navigateur';
    A('RAPPORT DE PLANTAGE — '+new Date().toLocaleString('fr-FR'));
    // ── Appli et appareil
    var v=await versionSW(),nbCache='?',attente=false;
    try{if(window.caches){var ks=await caches.keys(),c=ks.filter(function(k){return /^heuressup-cache-v/.test(k);}).sort().pop();
      if(!v&&c)v=c.replace('heuressup-cache-','')+' (cache)';if(c){nbCache=(await (await caches.open(c)).keys()).length;}}}catch(e){}
    try{var reg=navigator.serviceWorker&&await navigator.serviceWorker.getRegistration();attente=!!(reg&&(reg.waiting||reg.installing));}catch(e){}
    A('Version : '+(v||'inconnue')+(attente?' (mise à jour en attente)':'')+' · '+st);
    A('Appareil : '+systeme()+' · '+navig()+' · écran '+screen.width+'×'+screen.height+' · '+(navigator.onLine?'en ligne':'hors ligne'));
    var sz=0;try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);sz+=(k.length+(localStorage.getItem(k)||'').length)*2;}}catch(e){}
    var prot='?';try{if(navigator.storage&&navigator.storage.persisted)prot=(await navigator.storage.persisted())?'protégé':'non protégé';}catch(e){}
    A('Stockage : '+Math.round(sz/1024)+' Ko · '+localStorage.length+' clés · '+prot+' · fichiers hors ligne : '+nbCache);
    var bad=[];for(var j=0;j<localStorage.length;j++){var kk=localStorage.key(j),vv=localStorage.getItem(kk)||'';if(/^\s*[\[{]/.test(vv)){try{JSON.parse(vv);}catch(e){bad.push(kk);}}}
    A('Données illisibles : '+(bad.length?bad.join(', '):'aucune'));
    // ── Migrations et erreurs
    var mig=['M6_MIGR_EXO_V1','M6_EXO_CONTRATS_V1','M6_EXO_NOM_V2','M6_EXO_ALIGN_V4'].filter(function(k){return localStorage.getItem(k);});
    A('');A('Migrations faites : '+(mig.length?mig.join(', '):'aucune'));
    var er=jget('SH_ERR_LOG');
    if(Array.isArray(er)&&er.length){A('Dernières erreurs :');er.slice(-10).forEach(function(x){A('  '+x.d+' · '+x.p+' · '+x.m+(x.f?' ('+x.f+':'+x.l+')':''));});}
    else A('Dernières erreurs : aucune');
    return L.join('\n');
  };
})();
