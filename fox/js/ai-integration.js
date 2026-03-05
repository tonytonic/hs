// ═══════════════════════════════════════════════════════════════
//  KITSUNE — Renard sage 100% LOCAL v2
//  Narrations enrichies via FOX_SCENARIOS (scenarios-fox-data.js)
// ═══════════════════════════════════════════════════════════════

class KitsuneLocal {

  constructor() {
    this.history      = [];
    this.isProcessing = false;
    this.playerName   = localStorage.getItem('FOX_PLAYER_NAME') || 'Joueur';

    this.intentMap = {
      heures:      ['durée','heure','temps','semaine','journée','quotidien','hebdo','sup'],
      nuit:        ['nuit','nocturne','minuit','22h','23h','noctambule'],
      dimanche:    ['dimanche','jour de repos','repos dominical'],
      weekend:     ['weekend','week-end','samedi','dimanche'],
      conges:      ['congé','vacances','cp','rtt','récupération','maternité','paternité'],
      salaire:     ['salaire','paie','rémunération','majoration','prime','indemnité','25%','50%'],
      licenciement:['licenciement','rupture','licencié','démission','préavis'],
      harcelement: ['harcèlement','moral','sexuel','violence','intimidation'],
      burnout:     ['burn-out','burnout','épuisement','surmenage','stress','fatigue','énergie'],
      contingent:  ['contingent','220','quota','dépassement','accord'],
      repos:       ['repos compensateur','récupération','compensation','pause','11h','35h repos'],
      syndicat:    ['syndicat','délégué','représentant','cse','irp'],
      sante:       ['santé','médecin','arrêt','accident','maladie','invalidité'],
      amplitude:   ['amplitude','coupure','13h','décalé'],
      astreinte:   ['astreinte','permanence','garde','intervention'],
      formation:   ['formation','cpf','certification'],
      transport:   ['transport','routier','chronotachygraphe'],
      teletravail: ['télétravail','remote','domicile','hybride'],
    };
  }

  async chat(userMessage) {
    if (this.isProcessing) return;
    this.isProcessing = true;
    this.history.push({ role: 'user', text: userMessage });
    const response = this._generateResponse(userMessage);
    await new Promise(r => setTimeout(r, 300 + Math.random() * 400));
    this.history.push({ role: 'kitsune', text: response.text });
    this.isProcessing = false;
    return response;
  }

  _generateResponse(msg) {
    const lower = msg.toLowerCase();

    if (this._match(lower, ['bonjour','salut','coucou','hello','bonsoir','slt']))
      return this._greet();

    if (this._match(lower, ['qui es-tu','c\'est quoi','tu es quoi','qui êtes','présente']))
      return this._intro();

    if (this._match(lower, ['mes heures','mon solde','combien j\'ai','mon compteur','mon cumul','mon total','bilan']))
      return this._playerStats();

    if (this._match(lower, ['burn-out','burnout','épuisement','fatigue','score','comment je vais','mon état']))
      return this._burnoutAdvice();

    if (this._match(lower, ['badge','niveau','ligue','xp','progression','mes points']))
      return this._playerProgress();

    if (this._match(lower, ['limite','légal','loi','code du travail','droit','article','règle']))
      return this._legalLimits(lower);

    if (this._match(lower, ['conseil','aide','quoi faire','que faire','recommande','que dois-je']))
      return this._advice();

    // Recherche enrichie dans FOX_SCENARIOS
    const intent = this._detectIntent(lower);
    const scenario = this._findScenario(lower, intent);
    if (scenario) return this._scenarioResponse(scenario, lower);

    return this._defaultResponse();
  }

  _greet() {
    const h = new Date().getHours();
    const c = h < 12 ? 'Bonjour' : h < 18 ? 'Bon après-midi' : 'Bonsoir';
    const opts = [
      `${c} ! 🦊 Je suis Kitsune, ton guide en droit du travail. Pose-moi n'importe quelle question sur tes heures sup ou tes droits.`,
      `${c} ${this.playerName} ! 🦊 Je connais plus de 100 situations juridiques et tes données personnelles. Qu'est-ce qui te préoccupe ?`,
      `${c} ! ✨ Le renard sage est là. Parle-moi de tes heures, de tes droits, ou de comment tu te sens au travail.`,
    ];
    return { text: opts[Math.floor(Math.random() * opts.length)], type: 'greet' };
  }

  _intro() {
    return { text: `🦊 Je suis Kitsune, le moteur d'intelligence du FOX Engine.\n\nJe connais :\n• **100+ scénarios** du droit du travail français (nuit, weekend, amplitude, astreinte…)\n• Tes heures saisies dans les Modules 1 et 2\n• Les articles du Code du travail (L3121-1 et suivants)\n• Ton score burn-out, ta ligue et ta progression\n\nJe fonctionne entièrement en local — sans internet, 0 API.\nPose-moi une question concrète !`, type: 'intro' };
  }

  _playerStats() {
    try {
      const cum = moduleReader.getCumulatedSummary();
      const net = (cum.totalNetOvertime || 0).toFixed(1);
      const src = cum.source === 'fusion' ? 'M1+M2 fusionnés' : `Module ${cum.source.replace('M','')}`;
      const contingent = (cum.totalPlus25 || 0) + (cum.totalPlus50 || 0);
      let msg = `📊 Ton bilan, ${this.playerName} :\n\n• **${net}h** d'heures sup nettes cumulées\n• Données sur **${cum.years.length} année(s)** (${src})\n• **${cum.monthCount || 0}** mois analysés\n`;
      if (cum.totalPlus25 > 0) msg += `• ${cum.totalPlus25.toFixed(1)}h à +25%\n`;
      if (cum.totalPlus50 > 0) msg += `• ${cum.totalPlus50.toFixed(1)}h à +50%\n`;
      if (contingent > 220) msg += `\n🚨 **Contingent dépassé** (${contingent.toFixed(0)}/220h) — repos compensateurs obligatoires (Art. L3121-30).`;
      else if (contingent > 180) msg += `\n⚠️ Tu approches du contingent (${contingent.toFixed(0)}/220h).`;
      else msg += `\n✅ Dans les limites du contingent (${contingent.toFixed(0)}/220h).`;
      return { text: msg, type: 'stats' };
    } catch(e) {
      return { text: `🦊 Ouvre d'abord le Module 1 ou 2 et saisis quelques heures, puis reviens me voir !`, type: 'nodata' };
    }
  }

  _burnoutAdvice() {
    // Utilise gameState.burnout (score en temps réel) si dispo
    let boScore = 0;
    let boLevel = 'sain';
    try {
      if (typeof gameState !== 'undefined' && gameState.burnout !== undefined) {
        boScore = gameState.burnout;
      } else if (moduleReader && moduleReader.getBurnoutScore) {
        const bo = moduleReader.getBurnoutScore();
        boScore = bo.score || 0;
      }
      if (boScore >= 80) boLevel = 'critique';
      else if (boScore >= 60) boLevel = 'danger';
      else if (boScore >= 40) boLevel = 'risque';
      else if (boScore >= 20) boLevel = 'vigilance';
      else boLevel = 'sain';
    } catch(e) {}

    const msgs = {
      sain:      `🟢 **Score burn-out : ${boScore}/100** — Tu vas bien ! Continue à surveiller ta charge.`,
      vigilance: `🟡 **Score burn-out : ${boScore}/100** — Vigilance. Vérifie tes droits à repos compensateur et parle à ton médecin du travail (Art. L4624-1).`,
      risque:    `🟠 **Score burn-out : ${boScore}/100** — Zone de risque. Visite médicale prioritaire. Ton employeur a une obligation de prévention (Art. L4121-1).`,
      danger:    `🔴 **Score burn-out : ${boScore}/100** — Danger. Trop d'heures sur trop de semaines. Sollicite les RH et le médecin du travail rapidement.`,
      critique:  `⛔ **Score burn-out : ${boScore}/100** — Critique. Ta santé passe avant tout. Contacte ton médecin, ton syndicat et le CSE.`,
    };
    return { text: msgs[boLevel] || msgs.sain, type: 'burnout' };
  }

  _playerProgress() {
    try {
      const cum = moduleReader.getCumulatedSummary();
      const xp = typeof xpSystem !== 'undefined' ? xpSystem.currentXP : 0;
      const lvl = typeof xpSystem !== 'undefined' ? xpSystem.level : 1;
      let league = 'Bronze';
      if (typeof leagueSystem !== 'undefined') league = leagueSystem.getCurrentLeague(xp)?.name || 'Bronze';
      return { text: `🎮 Ta progression :\n\n• Niveau **${lvl}** — Ligue **${league}**\n• **${xp.toLocaleString()} XP** cumulés\n• ${cum.years.length} an(s) de données, ${cum.monthCount} mois analysés\n\nContinue à remplir tes modules pour débloquer plus de badges ! 🏆`, type: 'progress' };
    } catch(e) {
      return { text: `🦊 Commence à saisir tes heures pour voir ta progression !`, type: 'nodata' };
    }
  }

  _legalLimits(lower) {
    const limits = [
      { keys: ['48h','quarante-huit'], text: `📖 **Limite de 48h/semaine** (Art. L3121-20)\nMaximum absolu. Sur 12 semaines, la moyenne ne peut dépasser 44h (Art. L3121-22).` },
      { keys: ['10h','quotidien','journée','journée de travail'], text: `📖 **Limite journalière de 10h** (Art. L3121-18)\nSauf dérogation conventionnelle ou autorisation de l'inspection du travail (max 12h).` },
      { keys: ['220','contingent'], text: `📖 **Contingent annuel** (Art. L3121-33)\n220h par an. Au-delà → repos compensateur obligatoire (100% pour >20 salariés, 50% sinon).` },
      { keys: ['repos','11h','quotidien'], text: `📖 **Repos quotidien minimal** (Art. L3131-1)\n11 heures consécutives minimum entre deux journées de travail.` },
      { keys: ['35h','durée légale'], text: `📖 **Durée légale : 35h/semaine** (Art. L3121-27)\nAu-delà : +25% de la 36e à la 43e heure, +50% à partir de la 44e.` },
      { keys: ['amplitude','13h'], text: `📖 **Amplitude quotidienne** (Conv. collective)\nMaximum 13h entre la première et la dernière heure de travail dans une journée.` },
      { keys: ['nuit','travailleur'], text: `📖 **Travail de nuit** (Art. L3122-1)\nPériode 21h-6h. 8h max/jour, surveillance médicale si 50+ nuits/an. Majorations obligatoires.` },
      { keys: ['dimanche','dominical'], text: `📖 **Repos dominical** (Art. L3132-1)\nPrincipe général : repos le dimanche. Dérogations encadrées. Majoration minimale +100%.` },
    ];
    for (const l of limits) {
      if (l.keys.some(k => lower.includes(k))) return { text: l.text, type: 'legal' };
    }
    return { text: `📖 **Limites légales principales** :\n\n• Durée légale : **35h/sem** (L3121-27)\n• Maximum journalier : **10h** (L3121-18)\n• Maximum hebdo : **48h** (L3121-20)\n• Moyenne 12 sem : **44h** (L3121-22)\n• Contingent annuel : **220h** (L3121-33)\n• Repos quotidien : **11h min** (L3131-1)\n• Repos hebdomadaire : **35h consécutives**\n\nTu veux en savoir plus sur l'une d'elles ?`, type: 'legal' };
  }

  _advice() {
    try {
      const boScore = typeof gameState !== 'undefined' ? (gameState.burnout || 0) : 0;
      const cum = moduleReader.getCumulatedSummary();
      const contingent = (cum.totalPlus25 || 0) + (cum.totalPlus50 || 0);
      const advices = [];
      if (boScore >= 60)   advices.push(`🔴 Consulte le médecin du travail — score burn-out à ${boScore}/100.`);
      if (contingent > 180) advices.push(`⚠️ ${contingent.toFixed(0)}h sur le contingent — surveille les prochaines semaines.`);
      if ((cum.totalNetOvertime||0) > 100) advices.push(`📊 ${cum.totalNetOvertime.toFixed(0)}h sup nettes — vérifie les majorations sur ta fiche de paie.`);
      if (advices.length === 0) advices.push(`✅ Ta situation semble équilibrée. Exporte tes données régulièrement.`);
      advices.push(`💡 Tu peux me demander : "j'ai travaillé un dimanche", "amplitude de 14h", "astreinte weekend"…`);
      return { text: `🦊 Mes conseils :\n\n` + advices.join('\n'), type: 'advice' };
    } catch(e) {
      return { text: `🦊 Saisis quelques semaines d'heures pour que je puisse te donner des conseils personnalisés.`, type: 'nodata' };
    }
  }

  // ── Narration enrichie via FOX_SCENARIOS ──────────────────────
  _scenarioResponse(scenario, lower) {
    let text = `🦊 `;
    const name = scenario.name || scenario.title || scenario.situation || 'Scénario';
    const desc = scenario.desc || scenario.description || '';
    const legal = scenario.legal || '';
    const risk = scenario.risk || scenario.riskLevel || '';

    text += `**${name}**\n\n`;
    if (desc) text += `${desc}\n\n`;
    if (legal) text += `⚖️ **Statut légal** : ${legal}\n\n`;

    // Extraire le conseil structuré (format scenarios-fox-data)
    if (scenario.conseil) {
      const c = scenario.conseil;
      if (c.titre) text += `**${c.titre}**\n`;
      if (c.message) text += `${c.message}\n\n`;
      if (c.actions && c.actions.length > 0) {
        text += `📋 **Actions** :\n`;
        c.actions.forEach(a => { text += `• ${a}\n`; });
        text += '\n';
      }
      if (c.alerte) text += `${c.alerte.texte}\n\n`;
    } else {
      // Format alternatif
      if (scenario.advice || scenario.conseil_texte) text += `💡 **Conseil** : ${scenario.advice || scenario.conseil_texte}\n\n`;
    }

    // Références légales
    const refs = scenario.legalRef || scenario.articles || scenario.references;
    if (refs) text += `📖 **Références** : ${Array.isArray(refs) ? refs.join(', ') : refs}\n\n`;

    // Niveau de risque textuel
    const riskMap = { critique: '🔴 Critique', élevé: '🟠 Élevé', moyen: '🟡 Moyen', faible: '🟢 Faible', aucun: '✅ Aucun' };
    if (risk) text += `${riskMap[risk] || '🔵 ' + risk} — niveau de risque\n\n`;

    text += `_Tu veux approfondir ? Pose-moi une question plus précise._`;
    return { text, type: 'scenario', scenario };
  }

  _defaultResponse() {
    return { text: `🦊 Je peux t'aider sur :\n\n• **Ton solde** — "quelles sont mes heures sup ?"\n• **Ton bien-être** — "comment je vais ?"\n• **Les limites légales** — "quelle est la limite hebdomadaire ?"\n• **Un droit précis** — ex: "j'ai travaillé un dimanche", "garde de nuit 12h"\n• **Tes conseils** — "qu'est-ce que tu me recommandes ?"\n• **Ta progression** — "mon niveau et ma ligue"`, type: 'default' };
  }

  _findScenario(lower, intent) {
    if (typeof FOX_SCENARIOS === 'undefined' || !FOX_SCENARIOS.length) return null;
    let pool = FOX_SCENARIOS;

    // Filtrer par intent si possible
    if (intent && intent !== 'general') {
      const kws = this.intentMap[intent] || [];
      const filtered = FOX_SCENARIOS.filter(s => {
        const t = ((s.name||'') + ' ' + (s.desc||'') + ' ' + (s.category||'') + ' ' + (s.tags||[]).join(' ')).toLowerCase();
        return kws.some(kw => t.includes(kw));
      });
      if (filtered.length > 0) pool = filtered;
    }

    // Score par mots-clés du message utilisateur
    const words = lower.split(/\s+/).filter(w => w.length > 3);
    if (words.length === 0) return null;

    const scored = pool.map(s => {
      const t = ((s.name||'') + ' ' + (s.desc||'') + ' ' + (s.category||'') + ' ' + (s.tags||[]).join(' ') +
                 ' ' + (s.legal||'') + ' ' + (s.conseil?.message||'') + ' ' + (s.conseil?.titre||'')).toLowerCase();
      const score = words.reduce((a, w) => a + (t.includes(w) ? 1 : 0), 0);
      return { s, score };
    }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);

    return scored.length > 0 ? scored[0].s : null;
  }

  _detectIntent(lower) {
    for (const [intent, kws] of Object.entries(this.intentMap)) {
      if (kws.some(kw => lower.includes(kw))) return intent;
    }
    return 'general';
  }

  _match(str, kws) { return kws.some(k => str.includes(k)); }

  reset() { this.history = []; }
}

// ═══════════════════════════════════════════════════════════════
//  INSTANCE GLOBALE
// ═══════════════════════════════════════════════════════════════

const kitsune = new KitsuneLocal();

async function askKitsune(message) {
  const response = await kitsune.chat(message);
  return response?.text || '🦊 ...';
}

function showAILoading(show) {
  const el = document.getElementById('ai-loading');
  if (el) el.style.display = show ? 'block' : 'none';
}

console.log('✅ Kitsune LOCAL chargé — 100% offline, 0 API');
