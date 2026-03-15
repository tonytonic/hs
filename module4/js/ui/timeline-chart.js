/**
 * Timeline Chart — Courbe prédictive interactive
 */
(function(global){
'use strict';

class TimelineChart {
  constructor(canvas){
    // canvas peut être null ou un <div> (affichage narratif désormais)
    this._canvas = (canvas && canvas.tagName === 'CANVAS') ? canvas : null;
    this._ctx    = this._canvas ? this._canvas.getContext('2d') : null;
    this._tooltip= null;
    this._data   = null;
    if(this._canvas) { this._resize(); window.addEventListener('resize',()=>this._resize()); }
  }

  _resize(){
    const cv=this._canvas;
    if(!cv) return;
    const rect=cv.parentElement.getBoundingClientRect();
    cv.width=rect.width||600;
    cv.height=parseInt(cv.style.height)||220;
    if(this._data) this.render(this._data);
  }

  render(timeline){
    this._data=timeline;
    if(!this._canvas || !this._ctx) return;
    const cv=this._canvas, ctx=this._ctx;
    const W=cv.width, H=cv.height;
    const pad={t:20,r:20,b:40,l:45};
    const iW=W-pad.l-pad.r, iH=H-pad.t-pad.b;
    ctx.clearRect(0,0,W,H);

    // Background
    ctx.fillStyle='rgba(9,14,26,0.6)';
    ctx.fillRect(0,0,W,H);

    if(!timeline||!timeline.length) return;
    const n=timeline.length;

    // Alert zones background
    const zones=[
      {y:0.75,color:'rgba(245,166,35,0.06)'},
      {y:0.85,color:'rgba(255,124,0,0.06)'},
      {y:0.95,color:'rgba(245,53,93,0.06)'},
    ];
    zones.forEach((z,i)=>{
      const y0=pad.t+iH*(1-z.y);
      const y1=pad.t+iH*(1-(zones[i-1]?.y||0));
      ctx.fillStyle=z.color;
      ctx.fillRect(pad.l,y0,iW,i===0?iH*z.y:y1-y0);
    });

    // Threshold lines
    [[75,'rgba(245,166,35,0.4)'],[85,'rgba(255,124,0,0.5)'],[95,'rgba(245,53,93,0.5)']].forEach(([v,c])=>{
      const y=pad.t+iH*(1-v/100);
      ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(pad.l+iW,y);
      ctx.strokeStyle=c; ctx.lineWidth=1; ctx.setLineDash([4,4]); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle=c; ctx.font='9px JetBrains Mono,monospace';
      ctx.textAlign='right'; ctx.fillText(v+'%',pad.l-4,y+3);
    });

    // Grid Y
    for(let v=0;v<=100;v+=25){
      const y=pad.t+iH*(1-v/100);
      ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(pad.l+iW,y);
      ctx.strokeStyle='rgba(0,215,240,0.06)'; ctx.lineWidth=1; ctx.stroke();
      ctx.fillStyle='rgba(0,215,240,0.3)'; ctx.font='8px JetBrains Mono,monospace';
      ctx.textAlign='right'; ctx.fillText(v,pad.l-4,y+3);
    }

    // X labels
    const step=Math.max(1,Math.floor(n/8));
    ctx.fillStyle='rgba(110,155,185,0.7)'; ctx.font='8px JetBrains Mono,monospace'; ctx.textAlign='center';
    for(let i=0;i<n;i+=step){
      const x=pad.l+(i/(n-1))*iW;
      ctx.fillText(timeline[i].date.slice(5),x,H-8);
    }

    // Lines: fatigue, stress, performance
    const series=[
      {key:'fatigue',   color:'#f5355d', label:'Fatigue'},
      {key:'stress',    color:'#f5a623', label:'Stress'},
      {key:'performance',color:'#00d7f0',label:'Performance'},
    ];

    series.forEach(s=>{
      ctx.beginPath();
      timeline.forEach((d,i)=>{
        const x=pad.l+(i/(n-1))*iW;
        const y=pad.t+iH*(1-d[s.key]/100);
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      });
      ctx.strokeStyle=s.color; ctx.lineWidth=2; ctx.setLineDash([]); ctx.stroke();

      // Gradient fill under fatigue
      if(s.key==='fatigue'){
        const grad=ctx.createLinearGradient(0,pad.t,0,pad.t+iH);
        grad.addColorStop(0,'rgba(245,53,93,0.25)');
        grad.addColorStop(1,'rgba(245,53,93,0)');
        ctx.beginPath();
        timeline.forEach((d,i)=>{
          const x=pad.l+(i/(n-1))*iW;
          const y=pad.t+iH*(1-d[s.key]/100);
          i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
        });
        ctx.lineTo(pad.l+iW,pad.t+iH); ctx.lineTo(pad.l,pad.t+iH);
        ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
      }
    });

    // Today marker
    const todayX=pad.l;
    ctx.beginPath(); ctx.moveTo(todayX,pad.t); ctx.lineTo(todayX,pad.t+iH);
    ctx.strokeStyle='rgba(0,215,240,0.5)'; ctx.lineWidth=1.5; ctx.setLineDash([3,3]); ctx.stroke();
    ctx.setLineDash([]);

    // Axis borders
    ctx.strokeStyle='rgba(0,215,240,0.2)'; ctx.lineWidth=1;
    ctx.strokeRect(pad.l,pad.t,iW,iH);

    // Legend
    series.forEach((s,i)=>{
      const lx=pad.l+i*90+10, ly=pad.t+4;
      ctx.fillStyle=s.color; ctx.fillRect(lx,ly,14,2);
      ctx.fillStyle=s.color; ctx.font='9px JetBrains Mono,monospace';
      ctx.textAlign='left'; ctx.fillText(s.label,lx+18,ly+5);
    });

    this._bindHover(timeline, pad, iW, iH, W, H);
  }

  _bindHover(timeline, pad, iW, iH, W, H){
    this._canvas.onmousemove=e=>{
      const rect=this._canvas.getBoundingClientRect();
      const mx=e.clientX-rect.left, my=e.clientY-rect.top;
      const n=timeline.length;
      const idx=Math.round((mx-pad.l)/iW*(n-1));
      if(idx<0||idx>=n) return;
      const d=timeline[idx];
      const tt=document.getElementById('chart-tooltip')||(()=>{
        const t=document.createElement('div');
        t.id='chart-tooltip'; t.className='chart-tooltip';
        document.body.appendChild(t); return t;
      })();
      const alertColor={OK:'#00e87a',ALERTE:'#f5a623',RISQUE:'#ff7c00',CRITIQUE:'#f5355d'}[d.alert]||'#00e87a';
      tt.innerHTML=`<b style="color:${alertColor}">${d.date} — ${d.jour}</b><br>
        Fatigue : <span style="color:#f5355d">${d.fatigue}%</span><br>
        Stress : <span style="color:#f5a623">${d.stress}%</span><br>
        Performance : <span style="color:#00d7f0">${d.performance}%</span><br>
        Alerte : <span style="color:${alertColor}">${d.alert}</span>`;
      tt.style.display='block';
      tt.style.left=(e.clientX+12)+'px';
      tt.style.top=(e.clientY-40)+'px';
    };
    this._canvas.onmouseleave=()=>{
      const t=document.getElementById('chart-tooltip');
      if(t) t.style.display='none';
    };
  }
}

global.TimelineChart=TimelineChart;
}(typeof window!=='undefined'?window:global));