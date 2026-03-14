// ================================================================
//  VUE ANALYSE PRO — vue-pro.js  (v9z50)
//  Tableau de bord sobre, professionnel, sans RPG ni mascotte.
//  Public : +40 ans, orienté analyse et droits.
// ================================================================
(function () {
  'use strict';

  // ── Helpers ────────────────────────────────────────────────────
  function fmtH(h) {
    if (!h || isNaN(h)) return '0h';
    var val = Math.abs(parseFloat(h));
    var hh  = Math.floor(val);
    var mm  = Math.round((val - hh) * 60);
    if (mm === 60) { hh += 1; mm = 0; }
    return mm > 0 ? hh + 'h' + String(mm).padStart(2, '0') : hh + 'h';
  }
  function readM1(yr) { try { return JSON.parse(localStorage.getItem('DATA_REPORT_' + yr) || '{}'); } catch(e) { return {}; } }
  function readM2(yr) { try { return JSON.parse(localStorage.getItem('CA_HS_TRACKER_V1_DATA_' + yr) || '{}'); } catch(e) { return {}; } }
  function getYear() { return localStorage.getItem('ACTIVE_YEAR_SUFFIX') || String(new Date().getFullYear()); }
  function getAllYears() {
    var yrs = [];
    Object.keys(localStorage).forEach(function(k) {
      var m = k.match(/\d{4}$/);
      if ((k.indexOf('DATA_REPORT_') === 0 || k.indexOf('CA_HS_TRACKER_V1_DATA_') === 0) && m && yrs.indexOf(m[0]) < 0) yrs.push(m[0]);
    });
    return yrs.sort();
  }

  // ── Calculs ────────────────────────────────────────────────────
  function calcAnnual(yr) {
    // Accumulation en minutes entières pour éviter les erreurs flottantes
    var totalMin = 0; var src = 'aucune'; var hasM1 = false;
    var m1 = readM1(yr);
    Object.keys(m1).forEach(function(k) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(k) && (m1[k].extra||0) > 0) {
        totalMin += Math.round(parseFloat(m1[k].extra) * 60);
        hasM1 = true;
      }
    });
    if (hasM1) return { total: totalMin / 60, src: 'M1' };
    var m2 = readM2(yr);
    Object.keys(m2).forEach(function(mk) {
      var mv = m2[mk];
      if (mv && mv.days) Object.keys(mv.days).forEach(function(d) {
        var v = parseFloat(mv.days[d]) || 0;
        if (v > 0) { totalMin += Math.round(v * 60); src = 'M2'; }
      });
    });
    return { total: totalMin / 60, src: src };
  }

  function calcToday(yr) {
    var now = new Date();
    var dk = yr + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
    var m1 = readM1(yr);
    if (m1[dk] && (m1[dk].extra||0) > 0) {
      var ex = Math.round(parseFloat(m1[dk].extra) * 60) / 60;
      return { extra: ex, total: Math.round(parseFloat(m1[dk].total||0) * 60) / 60 };
    }
    var mk = yr + '-' + String(now.getMonth()+1).padStart(2,'0');
    var m2 = readM2(yr); var d = String(now.getDate());
    if (m2[mk] && m2[mk].days && m2[mk].days[d]) {
      var ex2 = Math.round(parseFloat(m2[mk].days[d]) * 60) / 60;
      return { extra: ex2, total: 0 };
    }
    return { extra: 0, total: 0 };
  }

  function getMonthly(yr) {
    var mo = Array(12).fill(0);
    var m1 = readM1(yr);
    Object.keys(m1).forEach(function(k) { if (/^\d{4}-\d{2}-\d{2}$/.test(k) && (m1[k].extra||0) > 0) mo[parseInt(k.split('-')[1])-1] += m1[k].extra; });
    var m2 = readM2(yr);
    Object.keys(m2).forEach(function(mk) { var mv = m2[mk]; if (!mv||!mv.days) return; var i = parseInt(mk.split('-')[1])-1; if (mo[i] > 0) return; Object.keys(mv.days).forEach(function(d){ mo[i]+=(mv.days[d]||0); }); });
    return mo.map(function(v){ return Math.round(v * 60) / 60; }); // arrondi minute
  }

  function getAnalysis() { if (typeof _analyzeLegalSituation === 'function') { try { return _analyzeLegalSituation(); } catch(e){} } return null; }

  function getBurnout() { try { return JSON.parse(localStorage.getItem('FOX_GAME_STATE')||'{}').burnout||0; } catch(e){ return 0; } }

  // ── Message Kitsune (texte seulement, sans image) ───────────────
  function getKitsuneText() {
    try {
      var n = JSON.parse(localStorage.getItem('FOX_LAST_NARRATION')||'null');
      if (n && (n.message||n.titre)) {
        var html = '';
        if (n.titre)   html += '<p style="color:#B0BEC5;font-weight:700;margin:0 0 6px;">' + n.titre + '</p>';
        if (n.message) html += '<p style="color:#607D8B;margin:0 0 8px;line-height:1.65;">' + n.message + '</p>';
        if (n.actions && n.actions.length) {
          html += '<ul style="margin:8px 0 0;padding-left:18px;color:#546E7A;line-height:1.8;">';
          n.actions.forEach(function(a){ html += '<li style="font-size:0.82rem;">' + a + '</li>'; });
          html += '</ul>';
        }
        if (n.alerte && n.alerte.texte) {
          var ac = { danger:'#EF5350', warning:'#FFA726', alert:'#FFCA28', info:'#42A5F5' }[n.alerte.niveau] || '#546E7A';
          html += '<div style="margin-top:10px;padding:8px 12px;border-left:3px solid '+ac+';background:rgba(255,255,255,0.03);border-radius:0 6px 6px 0;color:#90A4AE;font-size:0.82rem;line-height:1.6;">' + n.alerte.texte + '</div>';
        }
        return html || null;
      }
    } catch(e){}
    // Fallback : bulle courante
    var bbl = document.getElementById('kitsune-bubble-text');
    if (bbl && bbl.textContent.trim()) return '<p style="color:#607D8B;margin:0;line-height:1.65;">' + bbl.textContent.trim() + '</p>';
    return null;
  }

  // ── Journal Kitsune ─────────────────────────────────────────────
  function getJournal() { try { return JSON.parse(localStorage.getItem('FOX_KITSUNE_JOURNAL')||'[]').slice(-8).reverse(); } catch(e){ return []; } }

  // ── Patterns ────────────────────────────────────────────────────
  function getPatterns() { try { return JSON.parse(localStorage.getItem('FOX_PATTERNS')||'[]').slice(0,6); } catch(e){ return []; } }

  // ── Recommandations légales ─────────────────────────────────────
  function buildAdvice(a, annual, today, burnout) {
    var items = []; var pct = annual.total > 0 ? Math.round(annual.total/220*100) : 0;
    if (!a && annual.total === 0) {
      return [{ icon:'ℹ️', titre:'Aucune donnée enregistrée', texte:'Saisissez vos heures dans le module M1 (annuel) ou M2 (mensuel) pour obtenir une analyse personnalisée.', loi:null }];
    }
    if (a && a.daily && a.daily.hasDailyCrit) items.push({ icon:'🚨', urgent:true, titre:'Journée > 12h détectée (' + fmtH(a.daily.maxDayTotal) + ')', texte:'La durée maximale journalière est de 10h, extensible à 12h uniquement par accord collectif. Ce seuil a été dépassé.', loi:'Art. L3121-18' });
    if (a && a.weekly && a.weekly.hasWeekViol) items.push({ icon:'🚨', urgent:true, titre:'Semaine > 48h (' + fmtH(a.weekly.maxWeekTotal) + ')', texte:'Plafond absolu de 48h/semaine dépassé. Aucun accord individuel ne peut y déroger. Cette semaine peut être signalée à l\'inspection du travail.', loi:'Art. L3121-20' });
    if (a && a.annual && a.annual.hasContingentDanger) items.push({ icon:'🚨', urgent:true, titre:'Contingent annuel dépassé (' + fmtH(annual.total) + ')', texte:'Au-delà de 220h, des contreparties obligatoires en repos sont dues de plein droit. Si elles ne sont pas accordées, elles sont réclamables en justice.', loi:'Art. L3121-33' });
    if (a && a.daily && a.daily.hasDailyRisk && !a.daily.hasDailyCrit) items.push({ icon:'⚠️', titre:'Journée > 10h détectée (' + fmtH(a.daily.maxDayTotal) + ')', texte:'La durée de 10h est le seuil normal. L\'extension à 12h nécessite un accord collectif explicite. Vérifiez votre convention.', loi:'Art. L3121-18' });
    if (a && a.weekly && a.weekly.hasAvgViol) items.push({ icon:'⚠️', titre:'Moyenne > 44h sur 12 semaines (' + fmtH(a.weekly.maxAvg12) + ')', texte:'La limite est la moyenne sur toute période glissante de 12 semaines consécutives — pas seulement semaine par semaine.', loi:'Art. L3121-22' });
    if (pct >= 75 && pct < 100) items.push({ icon:'⚠️', titre:'Contingent à ' + pct + '% (' + fmtH(annual.total) + ')', texte:'À ce rythme, le contingent de 220h sera atteint avant la fin de l\'année. Anticipez les contreparties en repos obligatoires.', loi:'Art. L3121-30' });
    if (burnout >= 70) items.push({ icon:'🔴', titre:'Niveau de surmenage élevé (' + burnout + '/100)', texte:'L\'employeur a une obligation de résultat sur la santé des salariés. Une consultation du médecin du travail est recommandée — gratuite et confidentielle.', loi:'Art. L4121-1' });
    else if (burnout >= 40) items.push({ icon:'🟠', titre:'Surmenage modéré (' + burnout + '/100)', texte:'Veillez à respecter les 11h de repos entre deux prises de poste et les 35h de repos hebdomadaire consécutives.', loi:'Art. L3131-1' });
    if (today.extra > 2) items.push({ icon:'📋', titre:'Journée chargée aujourd\'hui (' + fmtH(today.extra) + ' sup.)', texte:'Ces heures constituent une créance sur votre employeur. Taux de majoration : ' + (today.extra <= 8 ? '25%' : '50%') + '. Réclamables jusqu\'à 3 ans après réalisation.', loi:'Art. L3245-1' });
    if (!items.length && annual.total > 0) items.push({ icon:'✅', titre:'Situation dans les limites légales', texte:fmtH(annual.total) + ' de HS enregistrées (' + pct + '% du contingent). Aucune violation détectée. Continuez à documenter régulièrement.', loi:null });
    if (annual.total > 0) items.push({ icon:'📌', titre:'Prescription 3 ans', texte:'Les heures supplémentaires impayées sont réclamables jusqu\'à 3 ans après leur réalisation. Exportez régulièrement vos données pour conserver un historique opposable.', loi:'Art. L3245-1' });
    return items;
  }

  // ── Graphique barres CSS (lisible, pas SVG) ─────────────────────
  function renderBarChart(months, yr) {
    var MOIS = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
    var max  = Math.max.apply(null, months.concat([10]));
    var nowMo = (String(new Date().getFullYear()) === yr) ? new Date().getMonth() : -1;
    var html = '<div style="display:flex;align-items:flex-end;gap:3px;height:90px;padding-bottom:22px;position:relative;">';
    // Ligne de référence 44h
    if (max > 44) {
      var pct44 = Math.round(44 / max * 90);
      html += '<div style="position:absolute;bottom:' + (22 + pct44) + 'px;left:0;right:0;border-top:1px dashed rgba(229,57,53,0.25);font-size:0;"></div>';
    }
    months.forEach(function(val, i) {
      var h = val > 0 ? Math.max(4, Math.round(val / max * 90)) : 2;
      var col = i === nowMo ? '#90A4AE' : val > 44 ? '#EF5350' : val > 0 ? '#455A64' : '#1C2B35';
      var isNow = i === nowMo;
      html += '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:0;position:relative;">';
      // Valeur au dessus
      if (val > 0) html += '<div style="position:absolute;top:' + (90 - h - 14) + 'px;font-size:6.5px;color:#546E7A;white-space:nowrap;">' + (val % 1 ? val.toFixed(1) : val) + 'h</div>';
      // Barre
      html += '<div style="width:100%;background:' + col + ';height:' + h + 'px;position:absolute;bottom:22px;border-radius:2px 2px 0 0;' + (isNow ? 'outline:1px solid rgba(255,255,255,0.15);' : '') + '"></div>';
      // Label mois
      html += '<div style="position:absolute;bottom:4px;font-size:7px;color:' + (isNow ? '#90A4AE' : '#37474F') + ';font-weight:' + (isNow ? '700' : '400') + ';">' + MOIS[i].slice(0,1) + '</div>';
      html += '</div>';
    });
    html += '</div>';
    // Légende
    html += '<div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:4px;">';
    html += '<div style="display:flex;align-items:center;gap:5px;font-size:0.66rem;color:#37474F;"><div style="width:10px;height:5px;background:#90A4AE;border-radius:2px;"></div>Mois actuel</div>';
    html += '<div style="display:flex;align-items:center;gap:5px;font-size:0.66rem;color:#37474F;"><div style="width:10px;height:5px;background:#455A64;border-radius:2px;"></div>Normal</div>';
    html += '<div style="display:flex;align-items:center;gap:5px;font-size:0.66rem;color:#37474F;"><div style="width:10px;height:5px;background:#EF5350;border-radius:2px;"></div>> 44h</div>';
    html += '</div>';
    return html;
  }

  // ── Historique multi-années ──────────────────────────────────────
  function renderHistory() {
    var yrs = getAllYears(); if (!yrs.length) return '<div style="color:#37474F;font-size:0.8rem;">Aucun historique disponible.</div>';
    return yrs.reverse().map(function(yr) {
      var a = calcAnnual(yr); var pct = Math.min(Math.round(a.total/220*100), 100);
      var col = pct >= 100 ? '#EF5350' : pct >= 75 ? '#FFA726' : pct > 0 ? '#546E7A' : '#1C2B35';
      return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">'
        + '<div style="font-size:0.8rem;color:#546E7A;font-weight:600;min-width:34px;">' + yr + '</div>'
        + '<div style="flex:1;background:rgba(255,255,255,0.05);border-radius:3px;height:5px;">'
        + '<div style="background:' + col + ';width:' + pct + '%;height:5px;border-radius:3px;"></div></div>'
        + '<div style="font-size:0.78rem;color:#546E7A;min-width:38px;text-align:right;">' + fmtH(a.total) + '</div>'
        + '<div style="font-size:0.65rem;color:' + col + ';min-width:30px;text-align:right;">' + pct + '%</div>'
        + '</div>';
    }).join('');
  }

  // ── Blocs UI ────────────────────────────────────────────────────
  function statBox(label, val, sub, col) {
    return '<div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:13px 12px;">'
      + '<div style="font-size:0.58rem;color:#2D3F4A;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:5px;">' + label + '</div>'
      + '<div style="font-size:1.5rem;font-weight:700;color:' + (col||'#78909C') + ';line-height:1.1;">' + val + '</div>'
      + (sub ? '<div style="font-size:0.67rem;color:#37474F;margin-top:3px;">' + sub + '</div>' : '')
      + '</div>';
  }

  function section(title, content) {
    return '<div style="margin-bottom:20px;">'
      + '<div style="font-size:0.58rem;color:#2D3F4A;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid rgba(255,255,255,0.04);">' + title + '</div>'
      + content
      + '</div>';
  }

  function adviceCard(item) {
    var bc = item.urgent ? '#EF5350' : item.icon === '✅' ? '#2E7D32' : item.icon === '📌' ? '#263238' : '#37474F';
    var bg = item.urgent ? 'rgba(239,83,80,0.04)' : 'rgba(255,255,255,0.015)';
    return '<div style="background:' + bg + ';border:1px solid rgba(255,255,255,0.05);border-left:3px solid ' + bc + ';border-radius:0 9px 9px 0;padding:12px 13px;margin-bottom:8px;">'
      + '<div style="display:flex;gap:9px;align-items:flex-start;">'
      + '<div style="font-size:1rem;flex-shrink:0;margin-top:1px;">' + item.icon + '</div>'
      + '<div>'
      + '<div style="font-weight:700;color:#78909C;font-size:0.82rem;margin-bottom:4px;">' + item.titre + '</div>'
      + '<div style="color:#546E7A;font-size:0.76rem;line-height:1.6;">' + item.texte + '</div>'
      + (item.loi ? (function(){
            var _art = item.loi.replace('Art. ','');
            var _oc = "openPopup(\'popup-glossaire\'); setTimeout(function(){ var inp=document.getElementById(\'glossaire-search\'); if(inp){inp.value=\'" + item.loi + "\'; if(typeof filterGlossaire===\'function\') filterGlossaire(\'" + item.loi + "\');} }, 120);";
            return '<div style="margin-top:5px;"><button onclick="' + _oc + '" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:4px;padding:2px 6px;font-size:0.6rem;color:#455A64;letter-spacing:0.5px;cursor:pointer;font-family:inherit;">' + item.loi + ' →</button></div>';
          })() : '')
      + '</div></div></div>';
  }

  // ── Rendu principal ──────────────────────────────────────────────
  function render() {
    var el = document.getElementById('vue-pro'); if (!el) return;
    var yr     = getYear();
    var annual = calcAnnual(yr);
    var today  = calcToday(yr);
    var months = getMonthly(yr);
    var analy  = getAnalysis();
    var burnout= getBurnout();
    var advice = buildAdvice(analy, annual, today, burnout);
    var pct    = Math.min(annual.total > 0 ? Math.round(annual.total/220*100) : 0, 100);
    var sc     = pct >= 100 ? '#EF5350' : pct >= 75 ? '#FFA726' : pct >= 50 ? '#FFCA28' : annual.total > 0 ? '#66BB6A' : '#263238';
    var bo     = getBurnout(); var boc = bo > 60 ? '#EF5350' : bo > 30 ? '#FFA726' : '#66BB6A';
    var hasUrgent = advice.some(function(a){ return a.urgent; });
    var nightC = parseInt(localStorage.getItem('FOX_NIGHT_COUNT')||'0') + parseInt(localStorage.getItem('FOX_NIGHT_WEEKEND_COUNT')||'0');
    var weekC  = parseInt(localStorage.getItem('FOX_WEEKEND_COUNT')||'0') + parseInt(localStorage.getItem('FOX_NIGHT_WEEKEND_COUNT')||'0');
    var kitMsg = getKitsuneText();
    var journal = getJournal();
    var patterns = getPatterns();
    var now = new Date();
    var ds = now.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

    var html = ''

      // ══ HEADER ════════════════════════════════════════════════
      + '<div style="position:sticky;top:0;z-index:5;background:rgba(6,8,15,0.97);backdrop-filter:blur(8px);border-bottom:1px solid rgba(255,255,255,0.05);">'
      +   '<div style="padding:12px 18px;display:flex;align-items:center;justify-content:space-between;">'
      +     '<div><div style="font-size:0.82rem;font-weight:700;color:#78909C;letter-spacing:0.8px;text-transform:uppercase;">Tableau de bord</div>'
      +     '<div style="font-size:0.63rem;color:#263238;margin-top:1px;">' + ds + '</div></div>'
      +     '<button onclick="VuePro.hide()" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#546E7A;border-radius:8px;padding:8px 16px;font-size:0.75rem;cursor:pointer;font-family:inherit;letter-spacing:0.5px;">← Retour</button>'
      +   '</div>'
      +   '<div style="display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,0.05);">'
      +     '<a href="../heures/index.html" style="text-decoration:none;text-align:center;padding:9px 4px;border-right:1px solid rgba(255,255,255,0.05);"><div style="font-size:1.05rem;">📅</div><div style="font-size:0.58rem;color:#455A64;margin-top:1px;">Annuel M1</div></a>'
      +     '<a href="../paye/index.html" style="text-decoration:none;text-align:center;padding:9px 4px;border-right:1px solid rgba(255,255,255,0.05);"><div style="font-size:1.05rem;">💰</div><div style="font-size:0.58rem;color:#455A64;margin-top:1px;">Mensuel M2</div></a>'
      +     '<button onclick="openPopup(\'popup-analyse\')" style="background:none;border:none;border-right:1px solid rgba(255,255,255,0.05);padding:9px 4px;cursor:pointer;width:100%;font-family:inherit;"><div style="font-size:1.05rem;">⚖️</div><div style="font-size:0.58rem;color:#455A64;margin-top:1px;">Simuler</div></button>'
      +     '<button onclick="openPopup(\'popup-glossaire\')" style="background:none;border:none;padding:9px 4px;cursor:pointer;width:100%;font-family:inherit;"><div style="font-size:1.05rem;">📚</div><div style="font-size:0.58rem;color:#455A64;margin-top:1px;">Glossaire</div></button>'
      +   '</div>'
      + '</div>'

      + '<div style="padding:16px 18px;max-width:500px;margin:0 auto;">'

      // ══ ALERTE URGENTE ════════════════════════════════════════
      + (hasUrgent ? '<div style="background:rgba(239,83,80,0.07);border:1px solid rgba(239,83,80,0.2);border-radius:9px;padding:10px 14px;margin-bottom:16px;display:flex;gap:10px;align-items:center;"><div style="font-size:1rem;">🚨</div><div style="font-size:0.78rem;color:#EF9A9A;line-height:1.5;">Violations légales détectées — voir les recommandations ci-dessous.</div></div>' : '')

      // ══ CHIFFRES CLÉS ══════════════════════════════════════════
      + section('Synthèse ' + yr,
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;">'
          + statBox('Heures sup.', fmtH(annual.total), 'Source ' + annual.src, sc)
          + statBox('Contingent', pct + '%', 'Plafond légal 220h', sc)
          + statBox("Aujourd'hui", today.extra > 0 ? fmtH(today.extra) : '—', today.extra > 0 ? 'Journée ' + fmtH(today.total || (7+today.extra)) : 'Aucune saisie', today.extra > 0 ? '#78909C' : '#263238')
          + statBox('Surmenage', bo + '/100', bo > 60 ? 'Niveau élevé' : bo > 30 ? 'Modéré' : 'Satisfaisant', boc)
          + '</div>'
      )

      // ══ BARRE CONTINGENT ══════════════════════════════════════
      + '<div style="margin-bottom:20px;">'
      +   '<div style="display:flex;justify-content:space-between;margin-bottom:5px;">'
      +   '<div style="font-size:0.58rem;color:#2D3F4A;text-transform:uppercase;letter-spacing:1.2px;">Contingent annuel 220h</div>'
      +   '<div style="font-size:0.7rem;color:' + sc + ';">' + fmtH(annual.total) + ' / 220h — ' + pct + '%</div>'
      +   '</div>'
      +   '<div style="background:rgba(255,255,255,0.05);border-radius:4px;height:7px;position:relative;">'
      +   '<div style="background:' + sc + ';width:' + pct + '%;height:7px;border-radius:4px;transition:width .5s;"></div>'
      +   (pct < 100 ? '<div style="position:absolute;top:0;left:50%;width:1px;height:7px;background:rgba(255,255,255,0.06);"></div>' : '')
      +   '</div>'
      +   '<div style="display:flex;justify-content:space-between;margin-top:3px;"><span style="font-size:0.58rem;color:#263238;">0h</span><span style="font-size:0.58rem;color:#263238;">110h</span><span style="font-size:0.58rem;color:#263238;">220h</span></div>'
      + '</div>'

      // ══ GRAPHIQUE MENSUEL ══════════════════════════════════════
      + section('Répartition mensuelle — ' + yr,
          '<div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:9px;padding:14px 12px;">'
          + renderBarChart(months, yr)
          + '</div>'
      )

      // ══ ANALYSE DE KITSUNE (texte seulement) ══════════════════
      + (kitMsg ? section('Dernière analyse',
          '<div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:9px;padding:14px;">'
          + '<div style="font-size:0.7rem;color:#263238;margin-bottom:10px;letter-spacing:0.5px;">Analyse automatique basée sur vos données M1/M2</div>'
          + kitMsg
          + '<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">'
          + '<button onclick="openPopup(\'popup-fox\')" style="flex:1;min-width:130px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#546E7A;border-radius:7px;padding:9px;font-size:0.74rem;cursor:pointer;font-family:inherit;">📖 Analyse détaillée</button>'
          + '<button onclick="openPopup(\'popup-analyse\')" style="flex:1;min-width:130px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#546E7A;border-radius:7px;padding:9px;font-size:0.74rem;cursor:pointer;font-family:inherit;">⚖️ Simuler une semaine</button>'
          + '</div></div>'
        ) : '')

      // ══ JOURNAL ════════════════════════════════════════════════
      + (journal.length ? section('Journal des analyses (' + journal.length + ')',
          '<div id="pro-journal-wrap">'
          + journal.slice(0,2).map(function(j,idx){
              return '<div style="background:rgba(255,255,255,0.02);border-radius:7px;padding:9px 11px;margin-bottom:6px;border-left:2px solid rgba(255,255,255,0.06);">'
                + (j.date ? '<div style="font-size:0.6rem;color:#37474F;margin-bottom:4px;">' + new Date(j.date).toLocaleDateString('fr-FR',{day:'numeric',month:'short',year:'numeric'}) + '</div>' : '')
                + '<div style="font-size:0.76rem;color:#546E7A;line-height:1.55;">' + (j.message||j.text||JSON.stringify(j)) + '</div>'
                + '</div>';
            }).join('')
          + (journal.length > 2
              ? '<div id="pro-journal-more" style="display:none;">'
                + journal.slice(2).map(function(j){
                    return '<div style="background:rgba(255,255,255,0.02);border-radius:7px;padding:9px 11px;margin-bottom:6px;border-left:2px solid rgba(255,255,255,0.06);">'
                      + (j.date ? '<div style="font-size:0.6rem;color:#37474F;margin-bottom:4px;">' + new Date(j.date).toLocaleDateString('fr-FR',{day:'numeric',month:'short',year:'numeric'}) + '</div>' : '')
                      + '<div style="font-size:0.76rem;color:#546E7A;line-height:1.55;">' + (j.message||j.text||JSON.stringify(j)) + '</div>'
                      + '</div>';
                  }).join('')
                + '</div>'
                + '<button onclick="(function(){var m=document.getElementById(\'pro-journal-more\');var b=document.getElementById(\'pro-journal-btn\');if(m.style.display===\'none\'){m.style.display=\'block\';b.textContent=\'Voir moins ↑\';}else{m.style.display=\'none\';b.textContent=\'Voir ' + (journal.length-2) + ' entrées de plus ↓\';};})()" id="pro-journal-btn" style="width:100%;background:none;border:1px solid rgba(255,255,255,0.06);border-radius:7px;padding:8px;font-size:0.73rem;color:#37474F;cursor:pointer;font-family:inherit;margin-top:2px;">Voir ' + (journal.length-2) + ' entrées de plus ↓</button>'
              : '')
          + '</div>'
        ) : '')

      // ══ PATTERNS ═══════════════════════════════════════════════
      + (patterns.length ? section('Tendances détectées',
          '<div style="display:flex;flex-direction:column;gap:7px;">'
          + patterns.map(function(p){
              var col = p.type === 'danger' ? '#EF5350' : p.type === 'warning' ? '#FFA726' : '#546E7A';
              return '<div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-left:3px solid ' + col + ';border-radius:0 8px 8px 0;padding:9px 12px;">'
                + '<div style="font-size:0.77rem;color:#607D8B;line-height:1.5;">' + (p.message||p.title||JSON.stringify(p)) + '</div>'
                + '</div>';
            }).join('')
          + '</div>'
        ) : '')

      // ══ POSTES ATYPIQUES ══════════════════════════════════════
      + ((nightC > 0 || weekC > 0) ? section('Postes atypiques',
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;">'
          + (nightC > 0 ? '<div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:9px;padding:12px;text-align:center;"><div style="font-size:1.3rem;font-weight:700;color:#78909C;">' + nightC + '</div><div style="font-size:0.68rem;color:#37474F;margin-top:2px;">Saisies de nuit</div><div style="font-size:0.6rem;color:#263238;margin-top:2px;">Majoration possible</div></div>' : '')
          + (weekC  > 0 ? '<div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:9px;padding:12px;text-align:center;"><div style="font-size:1.3rem;font-weight:700;color:#78909C;">' + weekC + '</div><div style="font-size:0.68rem;color:#37474F;margin-top:2px;">Week-ends travaillés</div><div style="font-size:0.6rem;color:#263238;margin-top:2px;">Vérifier contreparties</div></div>' : '')
          + '</div>'
        ) : '')

      // ══ RECOMMANDATIONS ════════════════════════════════════════
      + section('Recommandations', advice.map(adviceCard).join(''))

      // ══ HISTORIQUE ANNUEL ══════════════════════════════════════
      + section('Historique annuel',
          '<div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:9px;padding:13px;">'
          + renderHistory()
          + '<div style="font-size:0.6rem;color:#1C2B35;margin-top:8px;">Plafond légal 220h/an · Rouge = dépassement</div>'
          + '</div>'
      )

      // ══ RÉFÉRENCES LÉGALES ════════════════════════════════════
      + section('Références légales',
          '<div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:9px;padding:13px;">'
          + [
            ['L3121-18','Durée max journalière : 10h (12h par accord)'],
            ['L3121-20','Durée max hebdomadaire absolue : 48h'],
            ['L3121-22','Moyenne max sur 12 semaines glissantes : 44h'],
            ['L3121-30','Contingent annuel : 220h'],
            ['L3121-36','Majorations HS : 25% (8 prem.) puis 50%'],
            ['L3131-1', 'Repos quotidien minimum : 11h'],
            ['L3132-2', 'Repos hebdomadaire : 35h consécutives'],
            ['L3121-33','Contrepartie obligatoire au-delà du contingent'],
            ['L3245-1', 'Prescription pour réclamer des HS : 3 ans'],
            ['L4121-1', 'Obligation santé/sécurité de l\'employeur'],
            ['L3121-28','Heures supplémentaires — définition'],
            ['L3122-2', 'Période de nuit légale (21h–6h)'],
            ['L3122-5', 'Statut travailleur de nuit'],
            ['L3122-9', 'Contreparties travail de nuit'],
            ['L3133-6', '1er mai — doublement de salaire'],
            ['L1222-9', 'Télétravail — définition'],
            ['L2242-17','Droit à la déconnexion'],
            ['L1232-1', 'Cause réelle et sérieuse de licenciement'],
            ['L1152-1', 'Harcèlement moral'],
            ['L4131-1', 'Droit de retrait'],
          ].map(function(r){
            // Ouvre le glossaire filtré sur cet article
            var art = 'Art. ' + r[0];
            var onclick = "openPopup(\'popup-glossaire\'); setTimeout(function(){ var inp=document.getElementById(\'glossaire-search\'); if(inp){inp.value=\'Art. " + r[0] + "\'; if(typeof filterGlossaire===\'function\') filterGlossaire(\'Art. " + r[0] + "\');} }, 120);";
            return '<div style="display:flex;gap:10px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.03);align-items:center;">'
              + '<button onclick="' + onclick + '" style="font-size:0.63rem;color:#546E7A;min-width:78px;font-family:monospace;text-decoration:none;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:3px 6px;cursor:pointer;text-align:left;white-space:nowrap;">Art. ' + r[0] + ' →</button>'
              + '<div style="font-size:0.73rem;color:#455A64;line-height:1.4;flex:1;">' + r[1] + '</div>'
              + '</div>';
          }).join('')
          + '</div>'
      )

      // ══ DISCLAIMER ════════════════════════════════════════════
      + '<div style="padding:11px 13px;border-radius:8px;border:1px solid rgba(255,255,255,0.03);background:rgba(255,255,255,0.01);margin-top:4px;margin-bottom:24px;">'
      + '<div style="font-size:0.63rem;color:#1E2A35;line-height:1.7;">Informations indicatives basées sur le Code du travail français. Ne constituent pas un conseil juridique. En cas de litige, consultez un avocat en droit du travail ou un conseiller du salarié (liste disponible en mairie, gratuit).</div>'
      + '</div>'

      + '</div>'; // fin padding

    el.innerHTML = html;
  }

  // ── API publique ────────────────────────────────────────────────
  window.VuePro = {
    show: function() {
      var gaming = document.getElementById('gaming-main');
      var pro    = document.getElementById('vue-pro');
      var decor  = document.getElementById('bg-decor');
      if (gaming) gaming.style.display = 'none';
      if (decor)  decor.style.opacity  = '0.05';
      if (pro)  { pro.style.display = 'block'; render(); }
      localStorage.setItem('FOX_VUE', 'pro');
    },
    hide: function() {
      var gaming = document.getElementById('gaming-main');
      var pro    = document.getElementById('vue-pro');
      var decor  = document.getElementById('bg-decor');
      if (gaming) gaming.style.display = 'flex';
      if (decor)  decor.style.opacity  = '1';
      if (pro)    pro.style.display    = 'none';
      localStorage.setItem('FOX_VUE', 'fox');
    },
    refresh: function() { if (localStorage.getItem('FOX_VUE') === 'pro') render(); },
    init: function() { if (localStorage.getItem('FOX_VUE') === 'pro') setTimeout(function(){ window.VuePro.show(); }, 700); }
  };

})();
