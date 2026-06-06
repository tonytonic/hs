'use strict';
const fs = require('fs');

const GR_DATA = JSON.parse(fs.readFileSync('/mnt/user-data/outputs/ccn-data.json'));
const CCN_CODE = fs.readFileSync('/mnt/user-data/uploads/conventions-collectives.js','utf8');
const aliasMatch = CCN_CODE.match(/CCN_ALIASES\s*=\s*\[([\s\S]*?)\];/);
const CCN_ALL = [];
const re = /\{i:(\d+),b:[^,]+,n:"([^"]+)",s:"([^"]+)",g:"([^"]+)",fj:(true|false)\}/g;
let m;
while((m=re.exec(aliasMatch[1]))!==null) CCN_ALL.push([parseInt(m[1]),m[2],m[3],m[4]]);

const GR_B64 = Buffer.from(JSON.stringify(GR_DATA.grilles)).toString('base64');
console.log('CCN:', CCN_ALL.length, '| Grilles:', Object.keys(GR_DATA.grilles).length, '| B64:', Math.round(GR_B64.length/1024)+'KB');

// JS avec template literals — aucun conflit de guillemets
const js = `
// === DATA ===
const CCN_ALL=${JSON.stringify(CCN_ALL)};
const _B64="${GR_B64}";
const GR_REMOTE=(function(){try{return JSON.parse(atob(_B64));}catch(e){return{};}})();
const SMIC_DEF=1867.02,SDATE_DEF="01/06/2026",SSRC_DEF="Arr\u00eat\u00e9 du 16/05/2026 (JO) \u2014 revalorisation +2,41% (inflation)";
const HS_DEF={
  DC:{n:"Droit commun",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:220,mh:48},
  BOULAN329:{n:"Boulangerie",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:329,mh:48},
  IAA180:{n:"IAA/BTP 180h",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:180,mh:48},
  CHIM130:{n:"Chimie 130h",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:130,mh:48},
  PETRO:{n:"P\u00e9trole 130h",s:35,t1:30,p1:8,ti:null,pi:null,t2:50,cg:130,mh:48},
  PHARMA:{n:"Pharma 145h",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:145,mh:48},
  HCR:{n:"HCR 360h",s:35,t1:10,p1:4,ti:20,pi:4,t2:50,cg:360,mh:48},
  PHARMO150:{n:"Pharmacie 150h",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:150,mh:48},
  COIF200:{n:"Coiffure 200h",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:200,mh:48},
  ASSUR70:{n:"Assurances 70h",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:70,mh:48},
  SECU329:{n:"S\u00e9curit\u00e9 priv\u00e9e 329h",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:329,mh:48},
  PROP190:{n:"Propret\u00e9 190h",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:190,mh:48},
  SYNTEC130:{n:"Syntec 130h",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:130,mh:48},
  HOSPI130:{n:"Hospitalisation 130h",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:130,mh:48},
  TRANSP:{n:"Transport 195h",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:195,mh:48},
  ANIM70:{n:"Animation 70h",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:70,mh:48},
  CSS100:{n:"Centres sociaux 100h",s:35,t1:25,p1:8,ti:null,pi:null,t2:50,cg:100,mh:48},
};
const AGRI_DEP=new Set([9001,9011,9021,9031,9051,9061,9071,9081,9091,9101,9111,9121,9131,9141,9151,9161,9171,9181,9191,9201,9211,9221,9231,9241,9251,9261,9271,9281,9291,9301,9311,9321,9331,9341,9351,9361,9371,9381,9391,9401,9411,9421,9431,9441,9451,9461,9471,9481,9491,9501,9511,9521,9531,9541,9551,9561,9571,9581,9591,9601,9611,9621,9631,9641,9651,9661,9671,9681,9691,9701,9711,9721,9731,9741,9751,9761,9771,9781,9791,9801,9821,9831,9841,9851,9861,9871,9881,9891,9901,9911,9921]);
const TPL={
  agri:[{n:"SA",l:"Salari\u00e9(e) agricole d\u00e9butant(e)",b:100,cat:"Ouvrier"},{n:"OA1",l:"Ouvrier(ere) qualifi\u00e9(e)",b:104,cat:"Ouvrier"},{n:"OA2",l:"Ouvrier(ere) sp\u00e9cialis\u00e9(e)",b:109,cat:"Ouvrier"},{n:"TA",l:"Technicien(ne) agricole",b:130,cat:"Technicien"},{n:"C",l:"Cadre exploitation",b:172,cat:"Cadre"}],
  btp:[{n:"I",l:"Ouvrier(ere) d\u00e9butant(e)",b:100.5,cat:"Ouvrier"},{n:"II",l:"Ouvrier(ere) qualifi\u00e9(e)",b:107,cat:"Ouvrier"},{n:"III",l:"Technicien(ne)/AM",b:130,cat:"Technicien"},{n:"IV",l:"Cadre d\u00e9butant(e)",b:170,cat:"Cadre"},{n:"V",l:"Cadre confirm\u00e9(e)",b:220,cat:"Cadre"}],
  indus:[{n:"I",l:"Ouvrier(ere) d\u00e9butant(e)",b:101,cat:"Ouvrier"},{n:"II",l:"Ouvrier(ere) qualifi\u00e9(e)",b:108,cat:"Ouvrier"},{n:"III",l:"Technicien(ne)",b:125,cat:"Technicien"},{n:"IV",l:"AM",b:148,cat:"Technicien/AM"},{n:"V",l:"Cadre",b:185,cat:"Cadre"},{n:"VI",l:"Direction",b:240,cat:"Cadre"}],
  comm:[{n:"I",l:"Employ\u00e9(e) d\u00e9butant(e)",b:100,cat:"Employ\u00e9"},{n:"II",l:"Employ\u00e9(e) qualifi\u00e9(e)",b:106,cat:"Employ\u00e9"},{n:"III",l:"Employ\u00e9(e) confirm\u00e9(e)",b:114,cat:"Employ\u00e9"},{n:"IV",l:"Agent(e) de ma\u00eetrise",b:138,cat:"Ma\u00eetrise"},{n:"V",l:"Cadre",b:180,cat:"Cadre"},{n:"VI",l:"Direction",b:250,cat:"Cadre"}],
  transp:[{n:"I",l:"Conducteur(rice) d\u00e9butant(e)",b:103,cat:"Conducteur"},{n:"II",l:"Conducteur(rice) qualifi\u00e9(e)",b:110,cat:"Conducteur"},{n:"III",l:"SPL",b:122,cat:"Conducteur"},{n:"IV",l:"Chef \u00e9quipe",b:150,cat:"Ma\u00eetrise"},{n:"V",l:"Cadre",b:188,cat:"Cadre"}],
  sante:[{n:"I",l:"Agent(e) d\u00e9butant(e)",b:101,cat:"Employ\u00e9"},{n:"II",l:"Employ\u00e9(e) qualifi\u00e9(e)",b:108,cat:"Employ\u00e9"},{n:"III",l:"Technicien(ne)",b:130,cat:"Technicien"},{n:"IV",l:"Infirmier(ere)",b:160,cat:"Technicien"},{n:"V",l:"Cadre sant\u00e9",b:200,cat:"Cadre"},{n:"VI",l:"M\u00e9decin",b:280,cat:"Cadre"}],
  finance:[{n:"I",l:"Employ\u00e9(e)",b:103,cat:"Employ\u00e9"},{n:"II",l:"Charg\u00e9(e) client\u00e8le",b:122,cat:"Employ\u00e9"},{n:"III",l:"Technicien(ne)",b:150,cat:"Technicien"},{n:"IV",l:"Cadre",b:190,cat:"Cadre"},{n:"V",l:"Cadre sup\u00e9rieur(e)",b:250,cat:"Cadre"}],
  hcr:[{n:"I-1",l:"Employ\u00e9(e) d\u00e9butant(e)",b:100,cat:"Employ\u00e9"},{n:"I-2",l:"Employ\u00e9(e) qualifi\u00e9(e)",b:104,cat:"Employ\u00e9"},{n:"II",l:"Agent(e) ma\u00eetrise",b:118,cat:"Ma\u00eetrise"},{n:"III",l:"Cadre",b:190,cat:"Cadre"}],
  social:[{n:"I",l:"Employ\u00e9(e)",b:101,cat:"Employ\u00e9"},{n:"II",l:"Employ\u00e9(e) qualifi\u00e9(e)",b:109,cat:"Employ\u00e9"},{n:"III",l:"Animateur(rice)",b:125,cat:"Technicien"},{n:"IV",l:"Coordinateur(rice)",b:155,cat:"Ma\u00eetrise"},{n:"V",l:"Cadre",b:195,cat:"Cadre"}],
  default:[{n:"I",l:"Employ\u00e9(e)",b:100,cat:"Employ\u00e9"},{n:"II",l:"Qualifi\u00e9(e)",b:108,cat:"Employ\u00e9"},{n:"III",l:"Technicien(ne)",b:130,cat:"Technicien"},{n:"IV",l:"Cadre",b:172,cat:"Cadre"},{n:"V",l:"Direction",b:230,cat:"Cadre"}],
};
const BR={
  it:/syntec|informatique|logiciel|num\u00e9rique|web|data|t\u00e9l\u00e9coms|audiovisuel|cin\u00e9ma|presse|publicit\u00e9|recherche|jeux.vid\u00e9o/i,
  indus:/industrie|m\u00e9tallurgie|iaa|imprimerie|\u00e9nergie|chimie|plastique|caoutchouc|fonderie|b\u00e9ton|ciment|verre|c\u00e9ramique|papier|textile|aluminium/i,
  comm:/commerce|artisanat|distribution|n\u00e9goce|optique|vrp|librairie|bricolage|ameublement|chaussure|bijouterie|coiffure|esth\u00e9tique/i,
  transp:/transport|logistique|livraison|courrier|maritime|ferroviaire|a\u00e9rien|ambulancier/i,
  sante:/sant\u00e9|pharma|biologie|dentaire|v\u00e9t\u00e9rinaire|soins|h\u00f4pital|clinique|handicap/i,
  hcr:/hcr|restauration|h\u00f4tel|caf\u00e9|tourisme|traiteur|casino|camping/i,
  btp:/btp|b\u00e2timent|g\u00e9nie|travaux.publics|g\u00e9om\u00e8tre|architecture|mat\u00e9riaux/i,
  finance:/banque|assurance|finance|audit|comptable|notariat|immobilier|avocats|courtage/i,
  social:/animation|sport|spectacle|insertion|\u00e9ducation|enseignement|action.soc|service.pers/i,
  agri:/agricol|horticulture|paysage|viticult|coop\u00e9rative|jardinage|arboricult|champignon|\u00e9levage/i,
};
function mBroad(s,k){if(!k)return true;return BR[k]?BR[k].test(s):true;}
function getTpl(s){for(const k of["agri","btp","indus","transp","sante","finance","hcr","social"]){if(BR[k]&&BR[k].test(s))return k;}return"default";}

// === STATE ===
let SMIC=SMIC_DEF,SDATE=SDATE_DEF,SSRC=SSRC_DEF;
let HS=JSON.parse(JSON.stringify(HS_DEF));
const LS={S:"gp_smic_v1",G:"gp_grilles_v1",H:"gp_hs_v1",E:"gp_emp",J:"gp_journal"};
function loadState(){
  try{const s=JSON.parse(localStorage.getItem(LS.S));if(s&&s.val){SMIC=s.val;SDATE=s.date||SDATE_DEF;SSRC=s.src||SSRC_DEF;}}catch(e){}
  HS=JSON.parse(JSON.stringify(HS_DEF));
  try{const h=JSON.parse(localStorage.getItem(LS.H));if(h)Object.keys(h).forEach(k=>{if(HS[k])Object.assign(HS[k],h[k]);});}catch(e){}
}
function calcBase(row){return row.t==="pct"?Math.round(SMIC*row.b/100*100)/100:row.b;}
function resolveGrille(idcc,sect){
  const cg=JSON.parse(localStorage.getItem(LS.G)||"{}");
  if(cg[idcc])return Object.assign({},cg[idcc],{status:"custom"});
  const rem=GR_REMOTE[idcc];
  if(rem)return Object.assign({},rem,{status:rem.st||"verified"});
  if(AGRI_DEP.has(idcc)){const r=GR_REMOTE[9811];if(r)return Object.assign({},r,{status:"national",d:"grille nationale agri.",s:"IDCC 9811"});}
  return{d:"(\u00e0 v\u00e9rifier)",s:"Grille estim\u00e9e % SMIC",status:"estimated",g:TPL[getTpl(sect||"")].map(r=>({n:r.n,c:null,l:r.l,b:r.b,t:"pct",cat:r.cat}))};
}
function getStatus(idcc){
  const cg=JSON.parse(localStorage.getItem(LS.G)||"{}");
  if(cg[idcc])return"custom";
  const rem=GR_REMOTE[idcc];if(rem)return rem.st||"verified";
  if(AGRI_DEP.has(idcc))return"national";
  return"estimated";
}
function norm(s){return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();}
function fmt(n){return new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);}
function pct(n){return(n>=0?"+":"")+n.toFixed(1)+"%";}
function vsC(b){const p=(b-SMIC)/SMIC*100;return p<2?"var(--ro)":p<15?"var(--oa)":"var(--ve)";}
function toast(msg,d=2400){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),d);}
function updateSmicPill(){
  const el=document.getElementById("smic-pill");if(!el)return;
  el.textContent=\`SMIC \${fmt(SMIC)} \u00b7 \${SDATE}\`;
  el.className="smic-pill"+(SMIC<1823.03?" warn":"");
}
const ST_LBL={verified:"\ud83d\udfe2 V\u00e9rifi\u00e9e",national:"\ud83d\udd35 Nationale",estimated:"\ud83d\udfe0 Estim\u00e9e",custom:"\u270f\ufe0f Perso"};
const ST_DOT={verified:"sv",national:"sn",estimated:"se",custom:"sc"};
function sBadge(st){return \`<span class="sdot \${ST_DOT[st]||"se"}">\${ST_LBL[st]||st}</span>\`;}
function searchAll(q,broad){
  const qn=norm(q);
  return CCN_ALL.filter(c=>{
    const mq=!qn||norm(c[1]).includes(qn)||String(c[0]).includes(qn)||norm(c[2]).includes(qn);
    return mq&&mBroad(c[2],broad);
  });
}

// === TABS ===
document.querySelectorAll(".tab").forEach(t=>{
  t.addEventListener("click",()=>{
    document.querySelectorAll(".tab,.panel").forEach(x=>x.classList.remove("active"));
    t.classList.add("active");
    document.getElementById("panel-"+t.dataset.tab).classList.add("active");
    if(t.dataset.tab==="admin")renderAdmin();
  });
});
document.getElementById("smic-pill").addEventListener("click",()=>{
  document.querySelectorAll(".tab,.panel").forEach(x=>x.classList.remove("active"));
  document.querySelector("[data-tab=admin]").classList.add("active");
  document.getElementById("panel-admin").classList.add("active");
  renderAdmin();setTimeout(()=>document.getElementById("adm-smic").focus(),200);
});

// === GRILLES ===
const PAGE=60;let gBroad="",gQ="",gPage=0;
function renderGList(){
  const res=searchAll(gQ,gBroad);
  document.getElementById("g-count").textContent=\`\${res.length} CCN\`;
  const sl=res.slice(0,PAGE*(gPage+1));
  document.getElementById("g-list").innerHTML=sl.map(c=>{
    const st=getStatus(c[0]);
    const gd=resolveGrille(c[0],c[2]);
    const hs=HS[c[3]]||HS.DC;
    const bases=gd.g.map(r=>calcBase(r));
    const mn=Math.min(...bases),mx=Math.max(...bases);
    const hasPct=gd.g.some(r=>r.t==="pct");
    return \`<div class="ci" onclick="showGD(\${CCN_ALL.indexOf(c)})">
      <div style="flex:1;min-width:0">
        <div><span class="chip">IDCC \${c[0]>7000?"r\u00e9g.":c[0]}</span>\${sBadge(st)}\${hasPct?'<span class="pct-t">%SMIC</span>':""}</div>
        <div class="cn">\${c[1]}</div>
        <div class="cm">\${c[2]} \u00b7 \${hs.cg}h/an</div>
      </div>
      <div class="cr"><div class="crv">\${fmt(mn)}</div><div class="crl">\u2192 \${fmt(mx)}</div></div>
      <span class="arr">\u203a</span>
    </div>\`;
  }).join("");
  const mb=document.getElementById("g-more");
  if(sl.length<res.length){mb.style.display="flex";mb.textContent=\`Voir \${res.length-sl.length} de plus \u2192\`;}
  else mb.style.display="none";
}
document.getElementById("g-more").addEventListener("click",()=>{gPage++;renderGList();});

function showGD(idx){
  const c=CCN_ALL[idx];if(!c)return;
  ["g-list","sect-pills","g-count","g-more"].forEach(id=>{const e=document.getElementById(id);if(e)e.style.display="none";});
  document.querySelector("#panel-grilles .sw").style.display="none";
  document.getElementById("g-detail").style.display="block";
  const gd=resolveGrille(c[0],c[2]);
  const hs=HS[c[3]]||HS.DC;
  const st=gd.status;
  const hasPct=gd.g.some(r=>r.t==="pct");
  const hasCoef=gd.g.some(r=>r.c!==null&&r.c!==undefined);
  let h=\`<div class="ct"><span class="chip">IDCC \${c[0]>7000?"r\u00e9g.":c[0]}</span> \${sBadge(st)}\${hasPct?' <span class="pct-t">% SMIC auto</span>':""}</div>\`;
  h+=\`<div style="margin-bottom:10px"><div class="dnom">\${c[1]}</div><div class="dmeta">\${c[2]} \u00b7 \${gd.d}</div></div>\`;
  if(st==="estimated"){
    h+=\`<div class="al aw" style="margin-bottom:10px"><span class="aico">\ud83d\udfe0</span><div><div class="at">Grille estim\u00e9e \u2014 \u00e0 compl\u00e9ter</div>Montants calcul\u00e9s en % SMIC. V\u00e9rifiez sur <a href="https://www.legifrance.gouv.fr" target="_blank" style="color:inherit">L\u00e9gifrance.fr</a> puis \u2699\ufe0f Admin.</div></div>\`;
  } else if(st==="national"){
    h+=\`<div class="al ai" style="margin-bottom:10px"><span class="aico">\ud83d\udd35</span><div><div class="at">CCN agricole d\u00e9partementale</div>Grille nationale IDCC 9811. V\u00e9rifiez les avenants d\u00e9partementaux sur L\u00e9gifrance.</div></div>\`;
  } else {
    const ageMs=gd.d&&gd.d.length>5?Date.now()-new Date(gd.d.split("/").reverse().join("-")).getTime():0;
    if(ageMs>365*24*3600*1000){
      h+=\`<div class="al aw" style="margin-bottom:10px"><span class="aico">\u26a0\ufe0f</span><div><div class="at">Plus de 12 mois</div>V\u00e9rifiez si un avenant a \u00e9t\u00e9 publi\u00e9 depuis le \${gd.d}.</div></div>\`;
    } else {
      h+=\`<div class="al ao" style="margin-bottom:10px"><span class="aico">\u2705</span><div><div class="at">Donn\u00e9es v\u00e9rifi\u00e9es</div>\${gd.s}\${hasCoef?" \u00b7 Coefficients hi\u00e9rarchiques inclus":""}</div></div>\`;
    }
  }
  h+=\`<div style="overflow-x:auto"><table class="gt"><thead><tr><th>Niveau</th><th>Cat\u00e9gorie</th><th>Libell\u00e9</th><th>Min. brut/mois</th><th>vs SMIC</th></tr></thead><tbody>\`;
  gd.g.forEach(row=>{
    const base=calcBase(row);
    const vp=(base-SMIC)/SMIC*100;
    h+=\`<tr><td><span class="lvl">\${row.n}</span>\${row.c!=null?'<span class="coefbdg">c.'+row.c+'</span>':""}\${row.t==="pct"?'<span class="pct-t">'+row.b+'%</span>':""}</td><td><span class="cat">\${row.cat}</span></td><td style="font-size:.75rem">\${row.l}</td><td style="text-align:right"><span class="salv">\${fmt(base)}</span></td><td style="text-align:right"><span class="vsp" style="color:\${vsC(base)}">\${vp>0?"+":""}\${vp.toFixed(1)}%</span></td></tr>\`;
  });
  h+=\`</tbody></table></div>\`;
  h+=\`<div class="hsb"><div class="hst">\u23f1 HS \u2014 \${c[3]} : \${hs.n}</div><div class="hsg">
    <div class="hsc"><div class="hsv">\${hs.s}h</div><div class="hsl">Seuil</div></div>
    <div class="hsc"><div class="hsv">+\${hs.t1}%</div><div class="hsl">Pal.1 (\${hs.p1}h)</div></div>
    \${hs.ti?'<div class="hsc"><div class="hsv">+'+hs.ti+'%</div><div class="hsl">Inter.</div></div>':""}
    <div class="hsc"><div class="hsv">+\${hs.t2}%</div><div class="hsl">Pal.final</div></div>
    <div class="hsc"><div class="hsv">\${hs.cg}h</div><div class="hsl">Contingent/an</div></div>
    <div class="hsc"><div class="hsv">\${hs.mh}h</div><div class="hsl">Max hebdo</div></div>
  </div></div>\`;
  h+=\`<div class="disc">Source : \${gd.s} \u00b7 SMIC \${fmt(SMIC)} (\${SDATE}) \u00b7 V\u00e9rifier sur L\u00e9gifrance avant application.</div>\`;
  document.getElementById("g-detail-card").innerHTML=h;
}
document.getElementById("g-back").addEventListener("click",()=>{
  document.getElementById("g-detail").style.display="none";
  ["g-list","sect-pills","g-count"].forEach(id=>{const e=document.getElementById(id);if(e)e.style.display="";});
  document.querySelector("#panel-grilles .sw").style.display="block";
  renderGList();
});
const gSE=document.getElementById("g-search"),gDE=document.getElementById("g-drop");
gSE.addEventListener("input",()=>{
  gQ=gSE.value;gPage=0;renderGList();
  const q=gQ.trim();if(!q){gDE.style.display="none";return;}
  const r=searchAll(q,"").slice(0,6);if(!r.length){gDE.style.display="none";return;}
  gDE.innerHTML=r.map(c=>{
    const ico={verified:"\ud83d\udfe2",national:"\ud83d\udd35",custom:"\u270f\ufe0f",estimated:"\ud83d\udfe0"}[getStatus(c[0])]||"\ud83d\udfe0";
    return \`<div class="drop-i" onclick="showGD(\${CCN_ALL.indexOf(c)});document.getElementById('g-drop').style.display='none'"><div class="drop-n">\${c[1]} \${ico}</div><div class="drop-s">IDCC \${c[0]>7000?"r\u00e9g.":c[0]} \u00b7 \${c[2]}</div></div>\`;
  }).join("");
  gDE.style.display="block";
});
document.addEventListener("click",e=>{if(!gDE.contains(e.target)&&e.target!==gSE)gDE.style.display="none";});
document.querySelectorAll("#sect-pills .pill").forEach(p=>{
  p.addEventListener("click",()=>{
    document.querySelectorAll("#sect-pills .pill").forEach(x=>x.classList.remove("active"));
    p.classList.add("active");gBroad=p.dataset.s;gPage=0;renderGList();
  });
});

// === DIRECTIVE EU ===
const OBS=[
  {ico:"\ud83d\udccb",t:"Transparence avant embauche",d:"Communiquer fourchette salariale dans les offres ou avant le 1er entretien.",seuil:0,dl:"7 juin 2026",art:"Art. 5"},
  {ico:"\ud83d\udeab",t:"Interdiction historique salarial",d:"Interdire de demander le salaire pass\u00e9 aux candidats.",seuil:0,dl:"7 juin 2026",art:"Art. 5 \u00a72"},
  {ico:"\u2696\ufe0f",t:"Crit\u00e8res objectifs de r\u00e9mun\u00e9ration",d:"D\u00e9finir des crit\u00e8res neutres en mati\u00e8re de genre.",seuil:0,dl:"7 juin 2026",art:"Art. 6"},
  {ico:"\ud83d\udce9",t:"Droit d\u2019information salarial",d:"Permettre d\u2019obtenir les niveaux de r\u00e9mun\u00e9ration par cat\u00e9gorie et sexe.",seuil:0,dl:"7 juin 2026",art:"Art. 7"},
  {ico:"\u26a1",t:"Renforcement des voies de recours",d:"M\u00e9canismes de r\u00e9paration et inversion de la charge de la preuve.",seuil:0,dl:"7 juin 2026",art:"Art. 16-22"},
  {ico:"\ud83d\udcca",t:"Rapport \u00e9cart H/F annuel",d:"Publication annuelle de l\u2019\u00e9cart H/F par cat\u00e9gorie.",seuil:50,dl:"Juin 2027",art:"Art. 9"},
  {ico:"\ud83d\udcd1",t:"Rapport d\u00e9taill\u00e9 (d\u00e9ciles)",d:"Rapport triennal : d\u00e9ciles, m\u00e9diane, r\u00e9mun\u00e9rations variables.",seuil:100,dl:"Juin 2027",art:"Art. 9 \u00a72"},
  {ico:"\ud83d\udd0d",t:"Audit conjoint obligatoire",d:"Si \u00e9cart > 5\u00a0%, audit conjoint dans les 6 mois.",seuil:250,dl:"6 mois apr\u00e8s rapport",art:"Art. 10"},
];
document.getElementById("dir-btn").addEventListener("click",()=>{
  const eff=parseInt(document.getElementById("dir-eff").value);
  if(!eff||eff<1){alert("Saisissez un effectif valide.");return;}
  document.getElementById("dir-result").style.display="block";
  document.getElementById("dir-result").scrollIntoView({behavior:"smooth",block:"start"});
  const app=OBS.filter(o=>o.seuil<=eff);
  const lc=eff>=250?"ae":eff>=100?"aw":eff>=50?"aor":"ao";
  const li=eff>=250?"\ud83d\udd34":eff>=100?"\ud83d\udfe0":eff>=50?"\ud83d\udfe1":"\ud83d\udfe2";
  const lvl=eff>=250?"CRITIQUE":eff>=100?"\u00c9LEV\u00c9":eff>=50?"MOD\u00c9R\u00c9":"STANDARD";
  document.getElementById("dir-score").innerHTML=\`<div class="al \${lc}"><span class="aico">\${li}</span><div><div class="at">Niveau : \${lvl}</div>\${eff} salari\u00e9\${eff>1?"s":""} \u2014 \${app.length} obligation\${app.length>1?"s":""} applicable\${app.length>1?"s":""}.</div></div>\`;
  document.getElementById("dir-obs").innerHTML=OBS.map(o=>{
    const a=o.seuil<=eff;
    const dc=a?(o.seuil>=250?"odc":o.seuil>=100?"odw":"odok"):"odoff";
    return \`<div class="obi" style="\${a?"":"opacity:.35"}">
      <div class="obd \${dc}">\${a?(o.seuil>=250?"\u26a0\ufe0f":"\u2705"):"\u2014"}</div>
      <div style="flex:1"><div class="obt">\${o.ico} \${o.t}</div><div class="obd2">\${o.d}</div>
      <div class="obf"><span class="odl">\ud83d\udcc5 \${o.dl}</span><span class="oref">\${o.art}</span>
      \${a?"":"<em style='font-size:.57rem;color:var(--sa)'>D\u00e8s "+o.seuil+" salari\u00e9s</em>"}</div></div>
    </div>\`;
  }).join("");
  const cs=[
    {n:1,l:"D\u00e9finir les crit\u00e8res de r\u00e9mun\u00e9ration",d:"Maintenant",c:false},
    {n:2,l:"Mettre \u00e0 jour les offres avec fourchettes salariales",d:"Maintenant",c:false},
    {n:3,l:"Former RH et managers",d:"Avant juin 2026",c:false},
    {n:4,l:"Transposition droit fran\u00e7ais",d:"7 juin 2026",c:true},
    ...(eff>=50?[{n:5,l:"1\u00e8re publication rapport \u00e9cart H/F",d:"Juin 2027",c:false}]:[]),
    ...(eff>=100?[{n:6,l:"Rapport d\u00e9taill\u00e9 (d\u00e9ciles, m\u00e9diane)",d:"Juin 2027",c:false}]:[]),
    ...(eff>=250?[{n:"!",l:"Audit conjoint si \u00e9cart > 5\u00a0%",d:"6 mois apr\u00e8s rapport",c:true}]:[]),
  ];
  document.getElementById("dir-cal").innerHTML=cs.map(s=>\`<div class="cali"><div class="caln\${s.c?" crit":""}">\${s.n}</div><div><div class="calt">\${s.l}</div><div class="cald">\ud83d\udcc5 \${s.d}</div></div></div>\`).join("");
});

// === ECART H/F ===
let EMP=JSON.parse(localStorage.getItem(LS.E)||"[]");
function saveEmp(){localStorage.setItem(LS.E,JSON.stringify(EMP));}
function renderEmpList(){
  if(!EMP.length){document.getElementById("e-lcard").style.display="none";document.getElementById("e-results").style.display="none";return;}
  document.getElementById("e-lcard").style.display="block";
  document.getElementById("e-count").textContent=EMP.length;
  document.getElementById("e-list").innerHTML=EMP.map((e,i)=>\`<div class="er"><span class="en">\${e.nom}</span><span class="\${e.sex==="H"?"bh":"bf"}">\${e.sex==="H"?"\u2642 H":"\u2640 F"}</span><span class="em">\${e.cat}</span><span class="esv">\${fmt(e.sal)}</span><button class="bdl" onclick="delEmp(\${i})">\u2715</button></div>\`).join("");
  renderEcart();
}
function delEmp(i){EMP.splice(i,1);saveEmp();renderEmpList();}
function renderEcart(){
  if(EMP.length<2){document.getElementById("e-results").style.display="none";return;}
  document.getElementById("e-results").style.display="block";
  const H=EMP.filter(e=>e.sex==="H"),F=EMP.filter(e=>e.sex==="F");
  const aH=H.length?H.reduce((s,e)=>s+e.sal,0)/H.length:0;
  const aF=F.length?F.reduce((s,e)=>s+e.sal,0)/F.length:0;
  const ec=aH&&aF?(aH-aF)/aH*100:null;
  document.getElementById("e-stats").innerHTML=\`
    <div class="sb"><div class="sv2" style="color:var(--bl2)">\${H.length}</div><div class="sl2">Hommes</div></div>
    <div class="sb"><div class="sv2" style="color:var(--rs)">\${F.length}</div><div class="sl2">Femmes</div></div>
    <div class="sb"><div class="sv2" style="color:\${ec===null?"var(--sa)":Math.abs(ec)>10?"var(--ro)":Math.abs(ec)>5?"var(--oa)":"var(--ve)"}">\${ec===null?"\u2014":Math.abs(ec).toFixed(1)+"%"}</div><div class="sl2">\u00c9cart H/F</div></div>\`;
  const cats=[...new Set(EMP.map(e=>e.cat))];
  document.getElementById("e-chart").innerHTML=cats.map(cat=>{
    const ces=EMP.filter(e=>e.cat===cat),cH=ces.filter(e=>e.sex==="H"),cF=ces.filter(e=>e.sex==="F");
    const cAH=cH.length?cH.reduce((s,e)=>s+e.sal,0)/cH.length:null;
    const cAF=cF.length?cF.reduce((s,e)=>s+e.sal,0)/cF.length:null;
    const cE=cAH&&cAF?(cAH-cAF)/cAH*100:null;
    const mx=Math.max(cAH||0,cAF||0)||1;
    return \`<div style="margin-bottom:12px">
      <div style="font-size:.75rem;font-weight:700;margin-bottom:5px;display:flex;justify-content:space-between">
        <span>\${cat}</span>\${cE!==null?'<span style="font-size:.67rem;font-family:var(--fm);color:'+(Math.abs(cE)>10?"var(--ro)":Math.abs(cE)>5?"var(--oa)":"var(--ve)")+'">'+pct(cE)+"</span>":""}
      </div>
      \${cAH?'<div class="bw"><div class="blb"><span style="color:var(--bl2)">\u2642 ('+cH.length+")</span><span>"+fmt(cAH)+'</span></div><div class="btr"><div class="bfi" style="width:'+(cAH/mx*100).toFixed(1)+'%;background:var(--bl2)"></div></div></div>':""}
      \${cAF?'<div class="bw"><div class="blb"><span style="color:var(--rs)">\u2640 ('+cF.length+")</span><span>"+fmt(cAF)+'</span></div><div class="btr"><div class="bfi" style="width:'+(cAF/mx*100).toFixed(1)+'%;background:var(--rs)"></div></div></div>':""}
    </div>\`;
  }).join('<hr style="border:none;border-top:1px solid var(--iv2);margin:3px 0 10px">');
  const ob=EMP.length>=50;
  document.getElementById("e-index").innerHTML=\`<div class="al \${ob?(ec!==null&&Math.abs(ec)>5?"aw":"ao"):"ai"}">
    <span class="aico">\${ob?(ec!==null&&Math.abs(ec)<=5?"\u2705":"\u26a0\ufe0f"):"\u2139\ufe0f"}</span>
    <div><div class="at">\${ob?"Index \u00c9galit\u00e9 Pro \u2014 Publication obligatoire (\u226550 sal.)":"Index non obligatoire ("+EMP.length+" sal.)"}</div>
    \${ec!==null?"\u00c9cart global\u00a0: <strong>"+Math.abs(ec).toFixed(1)+"%</strong>. "+(ob?(Math.abs(ec)<=5?"\u2705 Conforme (\u22645%).":"\u26a0\ufe0f Plan correctif requis."):"")+\`<br><small style="color:var(--sa)">D\u00e9cret n\u00b02019-15 du 8 janvier 2019</small>\`:"Ajoutez des salari\u00e9s des deux genres."}</div></div>\`;
}
document.getElementById("e-add").addEventListener("click",()=>{
  const nom=document.getElementById("e-nom").value.trim(),sex=document.getElementById("e-sex").value;
  const cat=document.getElementById("e-cat").value,sal=parseFloat(document.getElementById("e-sal").value);
  if(!sal||sal<1){alert("Salaire requis.");return;}
  EMP.push({nom:nom||"Salari\u00e9\u00b7e "+(EMP.length+1),sex,cat,sal});
  saveEmp();document.getElementById("e-nom").value="";document.getElementById("e-sal").value="";renderEmpList();
});
document.getElementById("e-clear").addEventListener("click",()=>{if(!confirm("Vider ?"))return;EMP=[];saveEmp();renderEmpList();});
document.getElementById("e-export").addEventListener("click",()=>{
  if(!EMP.length)return;
  const csv=["Identifiant,Sexe,Cat\u00e9gorie,Salaire",...EMP.map(e=>'"'+e.nom+'",'+e.sex+',"'+e.cat+'",'+e.sal)].join("\\n");
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));
  a.download="ecart-hf.csv";a.click();
});

// === COMPARATEUR ===
let compCCN=null;
const cSE=document.getElementById("c-search"),cDE=document.getElementById("c-drop");
cSE.addEventListener("input",()=>{
  const q=norm(cSE.value);if(!q){cDE.style.display="none";return;}
  const r=CCN_ALL.filter(c=>norm(c[1]).includes(q)||String(c[0]).includes(q)).slice(0,7);
  if(!r.length){cDE.style.display="none";return;}
  cDE.innerHTML=r.map(c=>{
    const gd=resolveGrille(c[0],c[2]);
    return \`<div class="drop-i" onclick="selComp(\${c[0]})"><div class="drop-n">\${c[1]} \${sBadge(getStatus(c[0]))}</div><div class="drop-s">IDCC \${c[0]>7000?"r\u00e9g.":c[0]} \u00b7 \${gd.g.length} niveaux \u00b7 \${gd.d}</div></div>\`;
  }).join("");
  cDE.style.display="block";
});
document.addEventListener("click",e=>{if(!cDE.contains(e.target)&&e.target!==cSE)cDE.style.display="none";});
function selComp(idcc){
  const c=CCN_ALL.find(x=>x[0]===idcc);if(!c)return;
  const gd=resolveGrille(idcc,c[2]);
  compCCN={idcc,nom:c[1],gd};cSE.value=c[1];cDE.style.display="none";
  document.getElementById("c-tag").style.display="block";
  document.getElementById("c-tag").innerHTML=\`<div style="background:var(--iv);border-radius:var(--r8);padding:7px 10px;font-size:.75rem"><span class="chip">IDCC \${idcc}</span> <strong>\${c[1]}</strong> \u00b7 \${gd.d} \${sBadge(gd.status||"estimated")}</div>\`;
  document.getElementById("c-niv").innerHTML=gd.g.map(g=>{
    const base=calcBase(g);
    return \`<option value="\${base}">\${g.n}\${g.c!=null?" (c."+g.c+")":\""}\${g.t==="pct"?" ["+g.b+"% SMIC]":""} \u2014 \${g.l} \u00b7 \${fmt(base)}</option>\`;
  }).join("");
  document.getElementById("c-result").style.display="none";
}
document.getElementById("c-calc").addEventListener("click",()=>{
  if(!compCCN){alert("S\u00e9lectionnez une CCN.");return;}
  const mB=parseFloat(document.getElementById("c-niv").value);
  const sal=parseFloat(document.getElementById("c-sal").value);
  if(!sal||sal<1){alert("Salaire requis.");return;}
  const diff=sal-mB,dp=diff/mB*100,isOk=diff>=0,mx=Math.max(sal,mB)*1.15;
  const nL=document.getElementById("c-niv").options[document.getElementById("c-niv").selectedIndex].text.split(" \u2014")[0];
  document.getElementById("c-result").style.display="block";
  document.getElementById("c-result-card").innerHTML=\`
    <div class="ct">\ud83d\udcca R\u00e9sultat</div>
    <div class="al \${isOk?"ao":"ae"}" style="margin-bottom:12px"><span class="aico">\${isOk?"\u2705":"\ud83d\udea8"}</span>
      <div><div class="at">\${isOk?"Conforme \u00e0 la grille":"SOUS le minimum conventionnel !"}</div>
      \${isOk?fmt(sal)+" : +"+fmt(diff)+" au-dessus de "+nL+" ("+fmt(mB)+")"
              :"<strong>"+fmt(Math.abs(diff))+"</strong> en-dessous. R\u00e9gularisation obligatoire."}</div></div>
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;font-size:.71rem;margin-bottom:3px"><span><strong>\${fmt(sal)}</strong></span><span style="font-weight:700;font-family:var(--fm);color:\${isOk?"var(--ve)":"var(--ro)"};">\${pct(dp)}</span></div>
      <div class="gtr"><div class="gfi" style="width:\${Math.min(sal/mx*100,100).toFixed(1)}%;background:\${isOk?"var(--ve)":"var(--ro)"}"></div>
        <div class="gmk" style="left:\${(mB/mx*100).toFixed(1)}%" data-label="Min CCN"></div></div>
      <div class="gle"><span>0\u202f\u20ac</span><span>\${fmt(mx)}</span></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:10px">
      <div class="sb"><div class="sv2" style="font-size:.9rem">\${fmt(SMIC)}</div><div class="sl2">SMIC \${SDATE}</div></div>
      <div class="sb"><div class="sv2" style="font-size:.9rem">\${fmt(mB)}</div><div class="sl2">Min. CCN</div></div>
      <div class="sb"><div class="sv2" style="font-size:.9rem;color:\${isOk?"var(--ve)":"var(--ro)"}">\${fmt(sal)}</div><div class="sl2">Salaire saisi</div></div>
    </div>
    \${!isOk?'<div class="al ae"><span class="aico">\u2696\ufe0f</span><div><div class="at">Risque juridique \u2014 Art. L2254-1</div>Rappel estim\u00e9 : <strong>'+fmt(Math.abs(diff))+"/mois</strong>.</div></div>":""}
    <div class="disc">Source : \${compCCN.gd.s} \u00b7 SMIC \${fmt(SMIC)}</div>\`;
  document.getElementById("c-result").scrollIntoView({behavior:"smooth",block:"nearest"});
});

// === MODE MANUEL ===
let manJournal=JSON.parse(localStorage.getItem(LS.J)||"[]");
let manRows=[{n:"N1",c:"",l:"",b:"",cat:"Employ\u00e9(e)"}];
const CATS=["Ouvrier(\u00e8re)","Employ\u00e9(e)","Technicien(ne)/AM","Cadre"];
function renderManRows(){
  document.getElementById("man-rows").innerHTML=manRows.map((r,i)=>\`<div class="nr">
    <input class="inp inp-sm" placeholder="N1" value="\${r.n}" oninput="manRows[\${i}].n=this.value">
    <input class="inp inp-sm hm" placeholder="Coef" type="number" value="\${r.c}" oninput="manRows[\${i}].c=this.value">
    <input class="inp inp-sm" placeholder="Libell\u00e9" value="\${r.l}" oninput="manRows[\${i}].l=this.value">
    <input class="inp inp-sm" placeholder="\u20ac" type="number" step="10" value="\${r.b}" oninput="manRows[\${i}].b=parseFloat(this.value)||0">
    <select class="sel hm" style="padding:4px 6px;font-size:.73rem" onchange="manRows[\${i}].cat=this.value">
      \${CATS.map(cat=>\`<option\${r.cat===cat?" selected":""}>\${cat}</option>\`).join("")}
    </select>
    <button class="bico d" onclick="manRows.splice(\${i},1);renderManRows()">\u2715</button>
  </div>\`).join("");
}
document.getElementById("man-add").addEventListener("click",()=>{manRows.push({n:"N"+(manRows.length+1),c:"",l:"",b:"",cat:"Employ\u00e9(e)"});renderManRows();});
document.getElementById("man-calc").addEventListener("click",()=>{
  const ref=parseFloat(document.getElementById("man-ref").value);
  if(!ref||ref<1){alert("Saisissez un salaire de r\u00e9f\u00e9rence.");return;}
  const cat=document.getElementById("man-cat").value;
  const low=parseFloat(document.getElementById("man-low").value)||0;
  const high=parseFloat(document.getElementById("man-high").value)||0;
  const poste=document.getElementById("man-poste").value.trim()||"Poste non nomm\u00e9";
  const pctSmic=(ref-SMIC)/SMIC*100;
  const hasFourchette=low>0&&high>0;
  let h=\`<div class="ct">\ud83d\udcca \${poste}</div>\`;
  if(ref<SMIC){
    h+=\`<div class="al ae" style="margin-bottom:10px"><span class="aico">\ud83d\udea8</span><div><div class="at">Inf\u00e9rieur au SMIC l\u00e9gal</div>\${fmt(ref)} < SMIC \${fmt(SMIC)} \u2014 SMIC obligatoire (Art. L3232-1).</div></div>\`;
  } else {
    h+=\`<div class="al ao" style="margin-bottom:10px"><span class="aico">\u2705</span><div><div class="at">Au-dessus du SMIC l\u00e9gal</div>\${fmt(ref)} = SMIC \${pctSmic>0?"+":""}\${pctSmic.toFixed(1)}%. V\u00e9rifiez le minimum conventionnel applicable.</div></div>\`;
  }
  if(hasFourchette){
    const isIn=ref>=low&&ref<=high;
    h+=\`<div class="al \${isIn?"aor":"aw"}" style="margin-bottom:10px"><span class="aico">\${isIn?"\ud83d\udcca":"\u26a0\ufe0f"}</span><div><div class="at">Position dans la fourchette</div>
      \${fmt(ref)} \u2014 fourchette \${fmt(low)} \u2192 \${fmt(high)}\${ref<low?" \u2014 "+fmt(low-ref)+" sous le bas":ref>high?" \u2014 "+fmt(ref-high)+" au-dessus":" \u2014 position "+(((ref-low)/(high-low))*100).toFixed(0)+"%"}.
    </div></div>\`;
    h+=\`<div class="al ai" style="margin-bottom:10px"><span class="aico">\ud83c\uddea\ud83c\uddfa</span><div><div class="at">Directive EU 2023/970 \u2014 Art. 5</div>Fourchette \u00e0 communiquer : <strong>\${fmt(low)} \u2013 \${fmt(high)}</strong> (obligation juin 2026). Cat. : <strong>\${cat}</strong>.</div></div>\`;
  } else {
    h+=\`<div class="al aw" style="margin-bottom:10px"><span class="aico">\u26a0\ufe0f</span><div><div class="at">Fourchette non d\u00e9finie</div>Saisissez une fourchette basse/haute pour respecter la Directive EU 2023/970 art. 5 (juin 2026).</div></div>\`;
  }
  h+=\`<div class="disc">SMIC \${fmt(SMIC)} (\${SDATE}) \u00b7 Donn\u00e9es indicatives</div>\`;
  document.getElementById("man-result-card").innerHTML=h;
  document.getElementById("man-result").style.display="block";
  const entry={ts:new Date().toLocaleString("fr-FR"),poste,cat,ref,low,high};
  manJournal.unshift(entry);if(manJournal.length>50)manJournal.pop();
  localStorage.setItem(LS.J,JSON.stringify(manJournal));renderManJournal();renderManRows();
});
document.getElementById("man-export").addEventListener("click",()=>{
  const rows=manRows.filter(r=>r.b>0);
  if(!rows.length){alert("Ajoutez des niveaux avec un salaire.");return;}
  const csv=["Niveau,Coef,Libell\u00e9,Salaire,Cat\u00e9gorie",...rows.map(r=>r.n+","+r.c+',"'+r.l+'",'+r.b+","+r.cat)].join("\\n");
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));
  a.download="grille-manuelle.csv";a.click();toast("\ud83d\udce5 CSV export\u00e9");
});
document.getElementById("man-clear").addEventListener("click",()=>{
  if(!confirm("Vider la grille ?"))return;
  manRows=[{n:"N1",c:"",l:"",b:"",cat:"Employ\u00e9(e)"}];renderManRows();
  document.getElementById("man-result").style.display="none";toast("\u21ba Vid\u00e9");
});
function renderManJournal(){
  const el=document.getElementById("man-journal");
  if(!manJournal.length){el.innerHTML="Aucun poste enregistr\u00e9.";return;}
  el.innerHTML=manJournal.slice(0,8).map(e=>\`<div class="acr"><div style="flex:1"><div class="acn">\${e.poste} <span class="cat">\${e.cat}</span></div><div class="acm">\${e.ts} \u00b7 \${fmt(e.ref)}\${e.low&&e.high?" \u00b7 "+fmt(e.low)+"\u2013"+fmt(e.high):""}</div></div></div>\`).join("");
  if(manJournal.length>8)el.innerHTML+=\`<div style="font-size:.63rem;color:var(--sa)">+ \${manJournal.length-8} entr\u00e9es</div>\`;
}
document.getElementById("man-jexport").addEventListener("click",()=>{
  if(!manJournal.length){alert("Journal vide.");return;}
  const csv=["Date,Poste,Cat\u00e9gorie,R\u00e9f,Fourchette basse,Fourchette haute",...manJournal.map(e=>e.ts+',"'+e.poste+'",'+e.cat+","+e.ref+","+(e.low||"")+","+(e.high||""))].join("\\n");
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));
  a.download="journal-GrillePaye.csv";a.click();
});

// === ADMIN ===
let admIdcc=null;
function renderAdmin(){
  document.getElementById("adm-smic").value=SMIC;
  document.getElementById("adm-smic-date").value=SDATE;
  document.getElementById("adm-smic-src").value=SSRC;
  renderHsAdmin();renderCustomList();
}
document.getElementById("adm-smic-save").addEventListener("click",()=>{
  const v=parseFloat(document.getElementById("adm-smic").value);
  if(!v||v<1500){alert("SMIC invalide.");return;}
  SMIC=v;SDATE=document.getElementById("adm-smic-date").value||SDATE_DEF;SSRC=document.getElementById("adm-smic-src").value||SSRC_DEF;
  localStorage.setItem(LS.S,JSON.stringify({val:SMIC,date:SDATE,src:SSRC}));
  updateSmicPill();renderGList();toast("\u2705 SMIC mis \u00e0 jour : "+fmt(SMIC));
});
document.getElementById("adm-smic-2026").addEventListener("click",()=>{
  document.getElementById("adm-smic").value="1823.03";
  document.getElementById("adm-smic-date").value="01/01/2026";
  document.getElementById("adm-smic-src").value="D\u00e9cret n\u00b02025-1228 du 17 d\u00e9cembre 2025";
  toast("\u26a1 SMIC 2026 pr\u00e9-rempli \u2014 cliquez Enregistrer");
});
document.getElementById("adm-smic-reset").addEventListener("click",()=>{
  if(!confirm("R\u00e9initialiser le SMIC ?"))return;
  SMIC=SMIC_DEF;SDATE=SDATE_DEF;SSRC=SSRC_DEF;localStorage.removeItem(LS.S);
  renderAdmin();updateSmicPill();renderGList();toast("\u21ba SMIC r\u00e9initialis\u00e9");
});
const aCE=document.getElementById("adm-ccn-q"),aDE=document.getElementById("adm-ccn-drop");
aCE.addEventListener("input",()=>{
  const q=norm(aCE.value);if(!q){aDE.style.display="none";return;}
  const r=CCN_ALL.filter(c=>c[0]<=30000&&(norm(c[1]).includes(q)||String(c[0]).includes(q))).slice(0,8);
  if(!r.length){aDE.style.display="none";return;}
  aDE.innerHTML=r.map(c=>\`<div class="drop-i" onclick="admLoad(\${c[0]})"><div class="drop-n">\${c[1]} \${sBadge(getStatus(c[0]))}</div><div class="drop-s">IDCC \${c[0]} \u00b7 \${c[2]}</div></div>\`).join("");
  aDE.style.display="block";
});
document.addEventListener("click",e=>{if(!aDE.contains(e.target)&&e.target!==aCE)aDE.style.display="none";});
function admLoad(idcc){
  const c=CCN_ALL.find(x=>x[0]===idcc);if(!c)return;
  admIdcc=idcc;aCE.value=c[1];aDE.style.display="none";
  const gd=resolveGrille(idcc,c[2]);
  document.getElementById("adm-ccn-date").value=gd.status==="estimated"||gd.status==="national"?"":gd.d;
  document.getElementById("adm-ccn-src").value=gd.status==="estimated"||gd.status==="national"?"":gd.s;
  document.getElementById("adm-editor").style.display="block";
  document.getElementById("adm-hint").style.display="none";
  document.getElementById("adm-et").innerHTML=\`<span class="chip">IDCC \${idcc}</span> \${c[1]} \${sBadge(gd.status)}\`;
  renderAdmRows(gd.g);
  const cg=JSON.parse(localStorage.getItem(LS.G)||"{}");
  document.getElementById("adm-ccn-del").style.display=cg[idcc]?"flex":"none";
}
function renderAdmRows(rows){
  document.getElementById("adm-nr-rows").innerHTML=rows.map((r,i)=>\`<div class="nr" id="nr-\${i}">
    <input class="inp inp-sm" placeholder="Niv." value="\${r.n||""}" id="rn-\${i}">
    <input class="inp inp-sm hm" placeholder="Coef" type="number" value="\${r.c||""}" id="rc-\${i}">
    <input class="inp inp-sm" placeholder="Libell\u00e9" value="\${r.l||""}" id="rl-\${i}">
    <input class="inp inp-sm" placeholder="Val." type="number" step="0.01" value="\${r.b||""}" id="rb-\${i}">
    <div class="ttgl hm"><button class="\${r.t==="fixed"?"af":""}" onclick="setT(\${i},'fixed')" id="tf-\${i}">\u20ac</button><button class="\${r.t==="pct"?"ap":""}" onclick="setT(\${i},'pct')" id="tp-\${i}">%</button></div>
    <input class="inp inp-sm hm" placeholder="Cat." value="\${r.cat||"Employ\u00e9(e)"}" id="rcat-\${i}">
    <button class="bico d" onclick="rmRow(\${i})">\u2715</button>
  </div>\`).join("");
}
function setT(i,t){document.getElementById("tf-"+i).className=t==="fixed"?"af":"";document.getElementById("tp-"+i).className=t==="pct"?"ap":"";}
function getT(i){return document.getElementById("tp-"+i)&&document.getElementById("tp-"+i).className==="ap"?"pct":"fixed";}
function rmRow(i){const rows=readRows();rows.splice(i,1);renderAdmRows(rows.length?rows:[{n:"",c:null,l:"",b:"",t:"fixed",cat:"Employ\u00e9(e)"}]);}
function readRows(){
  const rows=[];let i=0;
  while(document.getElementById("rn-"+i)){
    rows.push({n:document.getElementById("rn-"+i).value.trim(),c:parseFloat(document.getElementById("rc-"+i).value)||null,l:document.getElementById("rl-"+i).value.trim(),b:parseFloat(document.getElementById("rb-"+i).value)||0,t:getT(i),cat:document.getElementById("rcat-"+i)?document.getElementById("rcat-"+i).value.trim():"Employ\u00e9(e)"});i++;
  }return rows;
}
document.getElementById("adm-add-row").addEventListener("click",()=>{const rows=readRows();rows.push({n:"",c:null,l:"",b:"",t:"fixed",cat:"Employ\u00e9(e)"});renderAdmRows(rows);});
document.getElementById("adm-ccn-save").addEventListener("click",()=>{
  if(admIdcc===null){alert("S\u00e9lectionnez une CCN.");return;}
  const rows=readRows().filter(r=>r.n&&r.b>0);if(!rows.length){alert("Au moins un niveau valide.");return;}
  const date=document.getElementById("adm-ccn-date").value||new Date().toLocaleDateString("fr-FR");
  const src=document.getElementById("adm-ccn-src").value||"Saisie manuelle";
  const cg=JSON.parse(localStorage.getItem(LS.G)||"{}");
  cg[admIdcc]={d:date,s:src,st:"custom",g:rows};
  localStorage.setItem(LS.G,JSON.stringify(cg));
  renderGList();renderCustomList();document.getElementById("adm-ccn-del").style.display="flex";
  toast("\u2705 Grille IDCC "+admIdcc+" enregistr\u00e9e");
});
document.getElementById("adm-ccn-del").addEventListener("click",()=>{
  if(!confirm("Supprimer la personnalisation ?"))return;
  const cg=JSON.parse(localStorage.getItem(LS.G)||"{}");delete cg[admIdcc];localStorage.setItem(LS.G,JSON.stringify(cg));
  renderGList();renderCustomList();document.getElementById("adm-editor").style.display="none";document.getElementById("adm-hint").style.display="flex";
  aCE.value="";admIdcc=null;toast("\u21ba R\u00e9initialis\u00e9");
});
function renderCustomList(){
  const cg=JSON.parse(localStorage.getItem(LS.G)||"{}"),keys=Object.keys(cg);
  const card=document.getElementById("adm-custom-card");
  if(!keys.length){card.style.display="none";return;}
  card.style.display="block";
  document.getElementById("adm-custom-list").innerHTML=keys.map(idcc=>{
    const c=CCN_ALL.find(x=>x[0]===parseInt(idcc)),gd=cg[idcc];
    return \`<div class="acr"><div style="flex:1"><div class="acn"><span class="chip">IDCC \${idcc}</span>\${c?c[1]:"CCN"} <span class="sdot sc">\u270f\ufe0f</span></div><div class="acm">\${gd.d} \u00b7 \${gd.g.length} niveaux</div></div><button class="btn bg btn-sm" onclick="admLoad(\${idcc})">\u00c9diter</button></div>\`;
  }).join("");
}
function renderHsAdmin(){
  document.getElementById("adm-hs-rows").innerHTML=Object.keys(HS).map(k=>{
    const r=HS[k];
    return \`<div class="hsr"><div style="font-size:.7rem;font-weight:600">\${k}<br><span style="font-size:.55rem;color:var(--sa)">\${r.n}</span></div>
      <input class="hri" type="number" id="ht1-\${k}" value="\${r.t1}">
      <input class="hri" type="number" id="hp1-\${k}" value="\${r.p1}">
      <input class="hri" type="number" id="ht2-\${k}" value="\${r.t2}">
      <input class="hri" type="number" id="hcg-\${k}" value="\${r.cg}">
      <input class="hri" type="number" id="hmh-\${k}" value="\${r.mh}">
      <span style="font-size:.57rem;color:var(--sa)">\${r.ti?"+"+r.ti+"%":""}</span>
    </div>\`;
  }).join("");
}
document.getElementById("adm-hs-save").addEventListener("click",()=>{
  Object.keys(HS).forEach(k=>{HS[k].t1=parseFloat(document.getElementById("ht1-"+k).value)||HS_DEF[k].t1;HS[k].p1=parseInt(document.getElementById("hp1-"+k).value)||HS_DEF[k].p1;HS[k].t2=parseFloat(document.getElementById("ht2-"+k).value)||HS_DEF[k].t2;HS[k].cg=parseInt(document.getElementById("hcg-"+k).value)||HS_DEF[k].cg;HS[k].mh=parseInt(document.getElementById("hmh-"+k).value)||HS_DEF[k].mh;});
  const diff={};Object.keys(HS).forEach(k=>{const r=HS[k],dv=HS_DEF[k];if(r.t1!==dv.t1||r.p1!==dv.p1||r.t2!==dv.t2||r.cg!==dv.cg||r.mh!==dv.mh)diff[k]=r;});
  localStorage.setItem(LS.H,JSON.stringify(diff));renderHsAdmin();renderGList();toast("\u2705 R\u00e8gles HS enregistr\u00e9es");
});
document.getElementById("adm-hs-reset").addEventListener("click",()=>{
  if(!confirm("R\u00e9initialiser les r\u00e8gles HS ?"))return;
  HS=JSON.parse(JSON.stringify(HS_DEF));localStorage.removeItem(LS.H);renderHsAdmin();renderGList();toast("\u21ba R\u00e8gles HS r\u00e9initialis\u00e9es");
});
function buildExport(){
  const cg=JSON.parse(localStorage.getItem(LS.G)||"{}"),ch=JSON.parse(localStorage.getItem(LS.H)||"{}");
  return{_v:"gp26",_date:new Date().toLocaleDateString("fr-FR"),smic:{val:SMIC,date:SDATE,src:SSRC},grilles:cg,hs:ch};
}
document.getElementById("adm-exp-copy").addEventListener("click",()=>navigator.clipboard.writeText(JSON.stringify(buildExport(),null,2)).then(()=>toast("\ud83d\udccb Copi\u00e9")));
document.getElementById("adm-exp-dl").addEventListener("click",()=>{
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(buildExport(),null,2)],{type:"application/json"}));
  a.download="grillePaye-"+new Date().toISOString().slice(0,10)+".json";a.click();toast("\u2b07\ufe0f T\u00e9l\u00e9charg\u00e9");
});
document.getElementById("adm-imp-btn").addEventListener("click",()=>{
  const raw=document.getElementById("adm-imp-json").value.trim();
  if(!raw){alert("Collez un JSON export\u00e9.");return;}
  let data;try{data=JSON.parse(raw);}catch(e){alert("JSON invalide : "+e.message);return;}
  if(data._v!=="gp26"){alert("Format non reconnu.");return;}
  if(!confirm("Importer ?"))return;
  if(data.smic&&data.smic.val){SMIC=data.smic.val;SDATE=data.smic.date||SDATE_DEF;SSRC=data.smic.src||SSRC_DEF;localStorage.setItem(LS.S,JSON.stringify({val:SMIC,date:SDATE,src:SSRC}));}
  if(data.grilles)localStorage.setItem(LS.G,JSON.stringify(data.grilles));
  if(data.hs){HS=JSON.parse(JSON.stringify(HS_DEF));Object.keys(data.hs).forEach(k=>{if(HS[k])Object.assign(HS[k],data.hs[k]);});localStorage.setItem(LS.H,JSON.stringify(data.hs));}
  updateSmicPill();renderGList();renderAdmin();document.getElementById("adm-imp-json").value="";toast("\u2705 Import r\u00e9ussi !",3000);
});
document.getElementById("adm-reset-all").addEventListener("click",()=>{
  if(!confirm("\u26a0\ufe0f Tout r\u00e9initialiser ?"))return;
  [LS.S,LS.G,LS.H,LS.E,LS.J].forEach(k=>localStorage.removeItem(k));
  SMIC=SMIC_DEF;SDATE=SDATE_DEF;SSRC=SSRC_DEF;HS=JSON.parse(JSON.stringify(HS_DEF));
  updateSmicPill();renderGList();renderAdmin();toast("\u21ba Tout r\u00e9initialis\u00e9",3000);
});

// === DISCLAIMER ===
(function(){
  const modal=document.getElementById("disc");
  if(!localStorage.getItem("gp_disc_ok"))modal.style.display="flex";
  document.getElementById("disc-ok").addEventListener("click",()=>{
    if(document.getElementById("disc-ns").checked)localStorage.setItem("gp_disc_ok","1");
    modal.style.display="none";
  });
})();

// === INIT ===
loadState();
updateSmicPill();
renderGList();
renderEmpList();
renderManRows();
renderManJournal();
document.getElementById("sync-dot").className="sync-dot ok";
document.getElementById("sync-dot").title=\`\${Object.keys(GR_REMOTE).length} grilles CCN charg\u00e9es automatiquement\`;
console.log("GrillePaye prêt \u2014 "+Object.keys(GR_REMOTE).length+" grilles CCN");
`;

// Vérifier la syntaxe JS
fs.writeFileSync('/tmp/gp_clean.js', js);
const {execSync} = require('child_process');
try {
  execSync('node --check /tmp/gp_clean.js', {stdio:'pipe'});
  console.log('✅ JS syntaxe OK');
} catch(e) {
  const err = e.stderr.toString();
  const m = err.match(/\.js:(\d+)/);
  if(m){
    const ln = parseInt(m[1]);
    console.log('❌ L'+ln+':', js.split('\n')[ln-1]?.slice(0,120));
  } else {
    console.log('❌', err.slice(0,300));
  }
  process.exit(1);
}

// Générer le HTML complet
const HTML_SHELL = fs.readFileSync('/home/claude/html_shell.html','utf8');
const FINAL = HTML_SHELL + '\n<script>\n' + js + '\n</script>\n</body>\n</html>';
fs.writeFileSync('/mnt/user-data/outputs/index.html', FINAL);
console.log('✅ index.html généré —', Math.round(FINAL.length/1024), 'KB');
