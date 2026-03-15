/**
 * Radar Chart — Conformité légale (6 axes)
 */
(function(global){
'use strict';

class RadarChart {
  constructor(canvas){ this._canvas=canvas; this._ctx=canvas?canvas.getContext('2d'):null; }

  render(axes){
    const cv=this._canvas, ctx=this._ctx;
    if(!cv||!ctx) return;
    const W=cv.width||cv.offsetWidth||200, H=cv.height||cv.offsetHeight||200;
    const cx=W/2, cy=H/2;
    const r=Math.min(W,H)/2-36;
    const N=axes.length;
    ctx.clearRect(0,0,W,H);

    // Pas de données : afficher un point central neutre + labels
    const hasData = axes.some(a => (a.value||0) > 0);
    if(!hasData) {
      // Grille fantôme
      for(let i=1;i<=4;i++){
        ctx.beginPath(); ctx.arc(cx,cy,r*(i/4),0,Math.PI*2);
        ctx.strokeStyle=`rgba(0,215,240,${.04+.02*i})`; ctx.lineWidth=1; ctx.stroke();
      }
      // Labels axes
      for(let i=0;i<N;i++){
        const angle=-Math.PI/2+(2*Math.PI/N)*i;
        const lx=cx+(r+20)*Math.cos(angle), ly=cy+(r+20)*Math.sin(angle);
        ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font='9px Share Tech Mono,monospace';
        ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText((axes[i].label||'').substring(0,8), lx, ly);
      }
      // Sans données → hexagone vert au centre (conformité parfaite par défaut)
      // On dessine un petit polygone central vert = "pas de violation connue"
      const pts0=[];
      for(let i=0;i<N;i++){
        const angle=-Math.PI/2+(2*Math.PI/N)*i;
        const radius=r*0.12; // petit hexagone central
        pts0.push({x:cx+radius*Math.cos(angle),y:cy+radius*Math.sin(angle)});
      }
      ctx.beginPath();
      pts0.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
      ctx.closePath();
      ctx.fillStyle='rgba(0,255,204,0.15)';
      ctx.fill();
      ctx.strokeStyle='rgba(0,255,204,0.6)';
      ctx.lineWidth=1.5;
      ctx.stroke();
      // Point central
      ctx.beginPath(); ctx.arc(cx,cy,4,0,Math.PI*2);
      ctx.fillStyle='rgba(0,255,204,0.7)'; ctx.fill();
      // Texte explicatif
      ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font='9px Share Tech Mono,monospace';
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('Aucune heure saisie', cx, cy+r*0.42);
      ctx.font='8px Share Tech Mono,monospace';
      ctx.fillStyle='rgba(0,255,204,0.5)';
      ctx.fillText('= Conformité optimale', cx, cy+r*0.57);
      return;
    }

    // Grid circles
    for(let i=1;i<=4;i++){
      ctx.beginPath();
      ctx.arc(cx,cy,r*(i/4),0,Math.PI*2);
      ctx.strokeStyle=`rgba(0,215,240,${.06+.04*i})`;
      ctx.lineWidth=1;
      ctx.stroke();
      // Label 25%,50%,75%,100%
      ctx.fillStyle='rgba(255,255,255,0.4)';
      ctx.font='8px JetBrains Mono,monospace';
      ctx.textAlign='center';
      ctx.fillText((i*25)+'%',cx+r*(i/4)+6,cy-3);
    }

    // Axes
    for(let i=0;i<N;i++){
      const angle=-Math.PI/2+(2*Math.PI/N)*i;
      const ex=cx+r*Math.cos(angle), ey=cy+r*Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(cx,cy);
      ctx.lineTo(ex,ey);
      ctx.strokeStyle='rgba(0,215,240,0.12)';
      ctx.lineWidth=1;
      ctx.stroke();
      // Labels
      const lx=cx+(r+20)*Math.cos(angle), ly=cy+(r+20)*Math.sin(angle);
      ctx.fillStyle='rgba(255,255,255,0.85)';
      ctx.font='9px JetBrains Mono,monospace';
      ctx.textAlign='center';
      ctx.textBaseline='middle';
      const short=axes[i].label.length>10?axes[i].label.substring(0,10)+'..':axes[i].label;
      ctx.fillText(short,lx,ly);
    }

    // Data polygon
    const points=[];
    for(let i=0;i<N;i++){
      const angle=-Math.PI/2+(2*Math.PI/N)*i;
      const pct=Math.max(0,Math.min(1,axes[i].value/axes[i].max));
      points.push({x:cx+r*pct*Math.cos(angle), y:cy+r*pct*Math.sin(angle)});
    }

    // Couleur globale selon score moyen de conformité
    const avgConf = axes.reduce((s,a)=>s+(a.value/a.max),0)/axes.length;
    const polyColor = avgConf >= 0.8 ? 'rgba(0,255,204,' : avgConf >= 0.6 ? 'rgba(255,179,0,' : 'rgba(255,102,0,';

    // Fill
    ctx.beginPath();
    points.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
    ctx.closePath();
    ctx.fillStyle=polyColor+'0.08)';
    ctx.fill();
    ctx.strokeStyle=polyColor+'0.7)';
    ctx.lineWidth=1.5;
    ctx.stroke();

    // Warning overlay (red for exceeded axes)
    const exceeded=axes.filter(a=>a.value>a.warn);
    if(exceeded.length){
      const redPts=[];
      for(let i=0;i<N;i++){
        const angle=-Math.PI/2+(2*Math.PI/N)*i;
        const pct=Math.max(0,Math.min(1,axes[i].value/axes[i].max));
        if(axes[i].value>axes[i].warn){
          redPts.push({x:cx+r*pct*Math.cos(angle),y:cy+r*pct*Math.sin(angle),i});
        }
      }
    }

    // Dots — pour axes de conformité (conforme=vert, violation=rouge)
    points.forEach((p,i)=>{
      const pct=axes[i].value/axes[i].max;
      // Axe de conformité : haute valeur = bon (vert), basse = mauvais (rouge)
      // Axe normal : basse valeur = bon, haute = mauvais
      const isConf = axes[i].conformity !== false; // par défaut les axes légaux sont conformité
      let color;
      if(isConf){
        // vert si conforme (pct élevé), rouge si violation (pct faible)
        color = pct >= 0.8 ? '#00ffcc' : pct >= 0.6 ? '#ffb300' : pct >= 0.4 ? '#ff6600' : '#f5355d';
      } else {
        color = pct > (axes[i].warn||70)/axes[i].max
          ? (pct > .9 ? '#f5355d' : '#f5a623')
          : '#00d7f0';
      }
      ctx.beginPath();
      ctx.arc(p.x,p.y,4,0,Math.PI*2);
      ctx.fillStyle=color;
      ctx.fill();
      ctx.strokeStyle=color;
      ctx.lineWidth=1;
      ctx.stroke();
    });

    // Center dot
    ctx.beginPath();
    ctx.arc(cx,cy,3,0,Math.PI*2);
    ctx.fillStyle='rgba(0,215,240,0.5)';
    ctx.fill();
  }
}

global.RadarChart=RadarChart;
}(typeof window!=='undefined'?window:global));