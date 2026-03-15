/**
 * ============================================================
 * DIGITAL TWIN LAUNCHER — Module 4
 * 
 * INSTRUCTIONS : Copiez ce bloc dans index.html de M1, M2, M3
 * juste avant </body> en remplaçant MODULE4_PATH par le bon chemin
 * 
 * Ex M1 (heures/) : '../module4/index.html'
 * Ex M2 (paye/)   : '../module4/index.html'
 * Ex M3 (index)   : 'module4/index.html'
 * ============================================================
 */
(function(){
  'use strict';

  const MODULE4_PATH = '../module4/index.html'; // ← ADAPTEZ CE CHEMIN

  /* ── CSS du bouton injecté ── */
  const STYLE = `
    #dte-launcher-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9000;
      display: flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, #001428 0%, #000d1a 100%);
      border: 1px solid rgba(0,200,255,0.4);
      color: #00c8ff;
      font-family: 'Orbitron', 'Share Tech Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .15em;
      padding: 10px 18px;
      cursor: pointer;
      box-shadow: 0 0 20px rgba(0,200,255,0.25), 0 4px 20px rgba(0,0,0,.5);
      transition: all .25s;
      text-transform: uppercase;
      clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
      animation: dte-pulse 3s ease-in-out infinite;
    }
    #dte-launcher-btn:hover {
      background: rgba(0,200,255,0.15);
      box-shadow: 0 0 35px rgba(0,200,255,0.45), 0 4px 20px rgba(0,0,0,.5);
      transform: translateY(-2px);
    }
    #dte-launcher-btn .dte-icon {
      width: 22px; height: 22px;
      border: 1px solid rgba(0,200,255,0.6);
      clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
      display: flex; align-items: center; justify-content: center;
      font-size: 11px;
      animation: dte-icon-spin 4s linear infinite;
      background: rgba(0,200,255,0.1);
      flex-shrink: 0;
    }
    #dte-launcher-btn .dte-badge {
      position: absolute;
      top: -6px; right: -4px;
      background: #ff2244;
      color: white;
      font-size: 8px;
      padding: 1px 5px;
      clip-path: polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%);
      display: none;
    }
    #dte-launcher-btn .dte-badge.visible { display: block; }
    @keyframes dte-pulse {
      0%,100% { box-shadow: 0 0 20px rgba(0,200,255,0.25), 0 4px 20px rgba(0,0,0,.5); }
      50%      { box-shadow: 0 0 35px rgba(0,200,255,0.5),  0 4px 20px rgba(0,0,0,.5); }
    }
    @keyframes dte-icon-spin { to { transform: rotate(360deg); } }
    #dte-overlay {
      position: fixed; inset: 0; z-index: 9500;
      background: rgba(0,6,15,0.96);
      display: none; align-items: center; justify-content: center;
      animation: dte-overlay-in .3s ease;
    }
    #dte-overlay.open { display: flex; }
    @keyframes dte-overlay-in { from { opacity: 0; } }
    #dte-frame-wrap {
      position: relative;
      width: 96vw; height: 94vh;
      border: 1px solid rgba(0,200,255,0.35);
      box-shadow: 0 0 60px rgba(0,200,255,0.2);
      clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
      animation: dte-frame-in .35s ease;
    }
    @keyframes dte-frame-in { from { transform: scale(.96); opacity: 0; } }
    #dte-frame {
      width: 100%; height: 100%; border: none; display: block;
      background: #00060f;
    }
    #dte-close {
      position: absolute;
      top: -12px; right: -12px;
      width: 28px; height: 28px;
      background: #001428; border: 1px solid rgba(255,34,68,0.5);
      color: #ff2244; font-size: 13px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      clip-path: polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%);
      transition: all .2s; z-index: 10;
    }
    #dte-close:hover { background: rgba(255,34,68,0.15); box-shadow: 0 0 12px rgba(255,34,68,0.4); }
    #dte-scan-line {
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, rgba(0,200,255,0.8), transparent);
      animation: dte-scan 2s ease-in-out infinite;
      pointer-events: none; z-index: 5;
    }
    @keyframes dte-scan { 0%{top:-2px;opacity:0;} 10%{opacity:1;} 90%{opacity:1;} 100%{top:100%;opacity:0;} }
  `;

  /* ── Inject fonts + style ── */
  function inject(){
    if(document.getElementById('dte-launcher-style')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.id = 'dte-launcher-style';
    style.textContent = STYLE;
    document.head.appendChild(style);

    /* ── Button ── */
    const btn = document.createElement('button');
    btn.id = 'dte-launcher-btn';
    btn.title = 'Ouvrir le Digital Twin Engine — Module 4';
    btn.innerHTML = `
      <div class="dte-icon">&#9830;</div>
      <span>DIGITAL TWIN</span>
      <span class="dte-badge" id="dte-alert-badge">!</span>`;
    document.body.appendChild(btn);

    /* ── Overlay ── */
    const overlay = document.createElement('div');
    overlay.id = 'dte-overlay';
    overlay.innerHTML = `
      <div id="dte-frame-wrap">
        <div id="dte-scan-line"></div>
        <button id="dte-close" title="Fermer">&#x2715;</button>
        <iframe id="dte-frame" src="" allowfullscreen></iframe>
      </div>`;
    document.body.appendChild(overlay);

    /* ── Events ── */
    btn.addEventListener('click', open);
    document.getElementById('dte-close').addEventListener('click', close);
    overlay.addEventListener('click', e => { if(e.target === overlay) close(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });

    /* ── Check alert badge ── */
    checkAlertBadge();
  }

  function open(){
    const overlay = document.getElementById('dte-overlay');
    const frame   = document.getElementById('dte-frame');
    if(!overlay || !frame) return;
    if(!frame.src || frame.src === window.location.href) frame.src = MODULE4_PATH;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close(){
    const overlay = document.getElementById('dte-overlay');
    if(overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* Vérifie si des risques critiques existent en localStorage */
  function checkAlertBadge(){
    const badge = document.getElementById('dte-alert-badge');
    if(!badge) return;
    try{
      const year = localStorage.getItem('ACTIVE_YEAR_SUFFIX') || new Date().getFullYear();
      const raw  = localStorage.getItem('DATA_REPORT_' + year);
      const rpg  = localStorage.getItem('rpg_burnout');
      let hasCritical = false;
      if(rpg){
        const b = JSON.parse(rpg);
        const burnout = parseFloat(b.score || b.value || b || 0);
        if(burnout >= 75) hasCritical = true;
      }
      if(raw){
        const data  = JSON.parse(raw);
        const days  = data.days || data.jours || {};
        const today = new Date();
        let consec  = 0;
        for(let i = 0; i < 14; i++){
          const d = new Date(today); d.setDate(d.getDate()-i);
          const k = d.toISOString().slice(0,10);
          const e = days[k]; if(!e||e.absent>0) break; consec++;
        }
        if(consec >= 7) hasCritical = true;
      }
      if(hasCritical) badge.classList.add('visible');
    } catch(_){}
  }

  /* ── Auto-init ── */
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();