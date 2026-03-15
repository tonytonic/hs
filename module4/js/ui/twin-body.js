/**
 * TwinBody — Image wireframe + zones SVG overlay
 * Utilise Body.png (fond transparent) + overlay SVG pour coloriser les zones
 */
(function(global){
'use strict';

// Zones : position en % par rapport à l'image 827x1397
// format : [x%, y%, width%, height%] — rectangle de la zone
const ZONE_DEFS = {
  brain:  { x:30, y:0,   w:40, h:14,  score:'stress',       label:'Cerveau',  desc:'Charge cognitive & stress',         shape:'ellipse' },
  chest:  { x:22, y:19,  w:56, h:18,  score:'overloadRisk', label:'Cœur',     desc:'Risque de surcharge',               shape:'rect' },
  core:   { x:25, y:37,  w:50, h:14,  score:'fatigue',      label:'Colonne',  desc:'Fatigue structurelle',              shape:'rect' },
  armL:   { x:0,  y:20,  w:22, h:40,  score:'performance',  label:'Bras G',   desc:'Performance motrice',  invert:true, shape:'rect' },
  armR:   { x:78, y:20,  w:22, h:40,  score:'performance',  label:'Bras D',   desc:'Performance motrice',  invert:true, shape:'rect' },
  legs:   { x:20, y:58,  w:60, h:42,  score:'fatigue',      label:'Jambes',   desc:'Endurance & mobilité', invert:false, shape:'rect' },
};

const COLORS = { ok:'#00ffcc', warn:'#ffb300', risk:'#ff6600', crit:'#ff2244' };
const LABELS = { ok:'NOMINAL', warn:'VIGILANCE', risk:'ALERTE', crit:'CRITIQUE' };

function level(v, invert){
  const val = invert ? 100-v : v;
  return val<40?'ok': val<60?'warn': val<80?'risk':'crit';
}
function col(v, invert){ return COLORS[level(v,invert)]; }

class TwinBody {
  constructor(container, tooltipEl){
    this._c   = container;
    this._tip = tooltipEl;
    this._sc  = {};
    this._build();
  }

  _build(){
    this._c.innerHTML = `
      <div id="twin-wrap" style="
        position:relative;width:100%;height:100%;
        display:flex;align-items:center;justify-content:center;
        overflow:hidden;">

        <!-- Image corpo -->
        <img id="twin-img" src="assets/body-transparent.png"
          style="height:100%;max-height:340px;width:auto;
                 object-fit:contain;position:relative;z-index:1;
                 filter:drop-shadow(0 0 12px rgba(0,200,255,0.4)) drop-shadow(0 0 30px rgba(0,200,255,0.15));
                 display:block;"
          draggable="false" alt="Digital Twin"/>

        <!-- SVG overlay zones (positionné sur l'image) -->
        <svg id="twin-overlay" viewBox="0 0 100 100" preserveAspectRatio="none"
          style="position:absolute;top:0;left:50%;transform:translateX(-50%);
                 height:100%;max-height:340px;width:auto;z-index:2;overflow:visible;pointer-events:none;">

          <defs>
            ${Object.keys(ZONE_DEFS).map(z=>`
              <radialGradient id="rg-${z}" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#00c8ff" stop-opacity="0.45" id="rg-${z}-s0"/>
                <stop offset="100%" stop-color="#00c8ff" stop-opacity="0" id="rg-${z}-s1"/>
              </radialGradient>`).join('')}
            <filter id="zone-glow">
              <feGaussianBlur stdDeviation="1.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <!-- Zones colorées -->
          ${Object.entries(ZONE_DEFS).map(([z,d])=>
            d.shape==='ellipse'
              ? `<ellipse id="zone-${z}" class="twin-zone" data-zone="${z}"
                   cx="${d.x+d.w/2}" cy="${d.y+d.h/2}"
                   rx="${d.w/2}" ry="${d.h/2}"
                   fill="url(#rg-${z})" style="pointer-events:all;cursor:crosshair;"/>`
              : `<rect id="zone-${z}" class="twin-zone" data-zone="${z}"
                   x="${d.x}" y="${d.y}" width="${d.w}" height="${d.h}" rx="3"
                   fill="url(#rg-${z})" style="pointer-events:all;cursor:crosshair;"/>`
          ).join('')}

          <!-- Scan line -->
          <line id="twin-scan" x1="0" y1="0" x2="100" y2="0"
            stroke="rgba(0,200,255,0.5)" stroke-width="0.4">
            <animate attributeName="y1" from="-2" to="102" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="y2" from="-2" to="102" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.05;0.95;1" dur="3s" repeatCount="indefinite"/>
          </line>
        </svg>
      </div>`;

    // Légende sous le corps
    const legend = document.createElement('div');
    legend.className = 'twin-legend';
    legend.id = 'twin-legend';
    legend.innerHTML = Object.entries(ZONE_DEFS).map(([z,d])=>
      `<span class="twin-legend-item" data-zone="${z}">
        <span class="twin-legend-dot" id="ldot-${z}" style="background:#00c8ff"></span>
        ${d.label}
      </span>`
    ).join('');
    this._c.appendChild(legend);

    this._bindEvents();
  }

  update(scores){
    this._sc      = scores || {};
    // _hasData vient du moteur : false = pas de données M1/M2
    this._hasData = scores && scores._hasData === true;
    this._apply();
  }

  _apply(){
    const s = this._sc;
    if(!s||!Object.keys(s).length) return;
    // Pas de données M1/M2 : corps en mode neutre (bleu)
    if(!this._hasData){
      Object.keys(ZONE_DEFS).forEach(z=>{
        const s0=document.getElementById(`rg-${z}-s0`);
        const s1=document.getElementById(`rg-${z}-s1`);
        const col='#00c8ff';
        if(s0){s0.setAttribute('stop-color',col);s0.setAttribute('stop-opacity','0.15');}
        if(s1){s1.setAttribute('stop-color',col);}
        const zone=document.getElementById(`zone-${z}`);
        if(zone){zone.setAttribute('stroke',col);zone.setAttribute('stroke-width','0.2');zone.style.animation='';}
        const dot=document.getElementById(`ldot-${z}`);
        if(dot)dot.style.background=col;
      });
      const img=document.getElementById('twin-img');
      if(img) img.style.filter='drop-shadow(0 0 12px rgba(0,200,255,0.4)) drop-shadow(0 0 30px rgba(0,200,255,0.15))';
      return;
    }
    Object.entries(ZONE_DEFS).forEach(([z,d])=>{
      // Si score = 0 et invert:true (ex: performance), on force neutre
      let v = s[d.score] || 0;
      if(d.invert && v === 0) v = 70; // valeur neutre pour éviter le faux rouge
      const c   = col(v, d.invert);
      const lvl = level(v, d.invert);

      // Gradient color
      const s0 = document.getElementById(`rg-${z}-s0`);
      const s1 = document.getElementById(`rg-${z}-s1`);
      if(s0){ s0.setAttribute('stop-color', c); s0.setAttribute('stop-opacity', lvl==='crit'?'0.6':'0.38'); }
      if(s1){ s1.setAttribute('stop-color', c); }

      // Zone border pulse on critical
      const zone = document.getElementById(`zone-${z}`);
      if(zone){
        zone.setAttribute('stroke', c);
        zone.setAttribute('stroke-width', lvl==='crit'?'0.8':'0.3');
        zone.setAttribute('stroke-opacity', lvl==='crit'?'0.9':'0.4');
        if(lvl==='crit'){
          zone.style.animation = 'zone-crit-pulse 1.2s ease-in-out infinite';
          zone.setAttribute('filter','url(#zone-glow)');
        } else {
          zone.style.animation = '';
          zone.removeAttribute('filter');
        }
      }

      // Légende dot
      const dot = document.getElementById(`ldot-${z}`);
      if(dot) dot.style.background = c;
    });

    // Filtre global sur l'image selon état général
    const img = document.getElementById('twin-img');
    if(img){
      const fat = s.fatigue||0;
      const hue = fat>85 ? 'hue-rotate(-30deg)' : fat>60 ? 'hue-rotate(-10deg)' : '';
      const glow = fat>85
        ? 'drop-shadow(0 0 12px rgba(255,34,68,0.5)) drop-shadow(0 0 30px rgba(255,34,68,0.2))'
        : fat>60
        ? 'drop-shadow(0 0 12px rgba(255,102,0,0.4)) drop-shadow(0 0 30px rgba(255,102,0,0.15))'
        : 'drop-shadow(0 0 12px rgba(0,200,255,0.4)) drop-shadow(0 0 30px rgba(0,200,255,0.15))';
      img.style.filter = `${glow} ${hue}`.trim();
    }
  }

  _bindEvents(){
    const svg = document.getElementById('twin-overlay');
    const tip = this._tip;
    if(!svg||!tip) return;

    svg.addEventListener('mousemove', e=>{
      const t = e.target.closest('.twin-zone');
      if(!t){ tip.classList.add('hidden'); return; }
      this._showTip(t.dataset.zone, e.clientX, e.clientY);
    });
    svg.addEventListener('mouseleave', ()=> tip.classList.add('hidden'));

    svg.addEventListener('touchstart', e=>{
      const t2 = e.changedTouches[0];
      const el  = document.elementFromPoint(t2.clientX, t2.clientY);
      const tz  = el && el.closest('.twin-zone');
      if(!tz) return;
      this._showTip(tz.dataset.zone, t2.clientX, t2.clientY);
      setTimeout(()=> tip.classList.add('hidden'), 2500);
    },{passive:true});
  }

  _showTip(zone, cx, cy){
    const d   = ZONE_DEFS[zone];
    if(!d) return;
    const v   = this._sc[d.score]||0;
    const c   = col(v, d.invert);
    const lvl = level(v, d.invert);
    const tip = this._tip;
    tip.innerHTML = `
      <div class="twin-tooltip-title" style="color:${c}">${d.label.toUpperCase()}</div>
      <div class="twin-tooltip-val" style="color:${c}">${v}<span style="font-size:11px;color:var(--text-muted)">/100</span></div>
      <div class="twin-tooltip-desc">${d.desc}</div>
      <div style="font-family:var(--font-mono);font-size:8px;color:${c};margin-top:4px;letter-spacing:.1em;">${LABELS[lvl]}</div>`;
    tip.classList.remove('hidden');
    const wrap = this._c.getBoundingClientRect();
    tip.style.left   = (cx - wrap.left < wrap.width/2 ? cx - wrap.left + 12 : cx - wrap.left - tip.offsetWidth - 12) + 'px';
    tip.style.top    = Math.max(4, cy - wrap.top - 40) + 'px';
    tip.style.transform = 'none';
  }
}

global.TwinBody = TwinBody;
}(typeof window !== 'undefined' ? window : global));
