/* SimulHeures — heures sup officielles d'une année (26/09/2026)
   Le compteur annuel (M1) et les heures mensualisées (M2) enregistrent leur total de
   contingent : SH_HS_OFFICIEL_M1_<année> et SH_HS_OFFICIEL_M2_<année>. Fox et le
   jumeau numérique affichent ce chiffre-là, identique à celui du module.
   Si les deux modules ont une valeur pour la même année, M1 est retenu.
   hsOfficiel(2026) → { total: 75.5, source: 'M1' } ou null (pas encore calculé). */
(function(){
  function lire(k){try{var o=JSON.parse(localStorage.getItem(k)||'null');return o&&typeof o.total==='number'?o:null;}catch(e){return null;}}
  window.hsOfficiel=function(annee){
    var y=String(annee),m1=lire('SH_HS_OFFICIEL_M1_'+y),m2=lire('SH_HS_OFFICIEL_M2_'+y);
    if(m1)return {total:m1.total,source:'M1'};
    if(m2)return {total:m2.total,source:'M2'};
    return null;
  };
})();
