/**
 * STORAGE M6 — Gestion multi-années + log immuable + RGPD
 * Clés : M6_{REGIME}_{YEAR}_{KEY}
 * Log horodaté et signé SHA-256 (côté client) pour valeur probante
 */
'use strict';

(function(global) {

// ── Clés localStorage ─────────────────────────────────────────────
const NS = 'M6';

const M6_Storage = {

  // ── Années ────────────────────────────────────────────────────
  getActiveYear(regime)    {
    // Clé par régime pour que les 3 forfaits soient complètement indépendants
    const key = regime ? `${NS}_${regime}_ACTIVE_YEAR` : `${NS}_ACTIVE_YEAR`;
    const now = new Date(), annee = now.getFullYear();
    const raw = localStorage.getItem(key);
    // Changement d'année (24/09/2026). Avant : une année choisie une fois dans
    // le sélecteur restait active pour toujours — en janvier, on saisissait
    // dans l'année précédente et ses jours comptaient dans l'ancien forfait.
    // Désormais la valeur garde la date du choix (« 2026|2026-09-24 », lue
    // telle quelle par parseInt ailleurs) : un choix fait AVANT le 1er janvier
    // cède la place à la nouvelle année, un choix fait après (consulter une
    // année passée) est respecté.
    let exo = null;
    try { exo = regime ? this.getContractGlobal(regime) : null; } catch (_) {}
    const auj = now.toISOString().slice(0, 10);
    const enCours = exo && exo.dateDebutExercice && exo.dateFinExercice &&
      auj >= exo.dateDebutExercice && auj <= exo.dateFinExercice;
    if (!raw) {
      // Exercice à cheval sur deux années (ex. juin → mai) : il reste rangé
      // sous l'année de son début jusqu'à sa fin.
      return enCours ? global.M6_exoAnnee(exo.dateDebutExercice, exo.dateFinExercice) : annee;
    }
    const y = parseInt(raw);
    const choisiLe = String(raw).split('|')[1] || '';
    if (y < annee && !enCours && choisiLe.slice(0, 4) !== String(annee)) return annee;
    return y;
  },
  setActiveYear(regime, year) {
    // Accepte setActiveYear(year) sans régime pour rétrocompatibilité
    if (typeof regime === 'number') { year = regime; regime = null; }
    const key = regime ? `${NS}_${regime}_ACTIVE_YEAR` : `${NS}_ACTIVE_YEAR`;
    localStorage.setItem(key, parseInt(year) + '|' + new Date().toISOString().slice(0, 10));
    // 27/09/2026 : le bandeau d'exercice suit l'exercice affiché
    try { if (window.M6_rafraichirBandeau) setTimeout(window.M6_rafraichirBandeau, 50); } catch (_) {}
  },
  getAllYears(regime) {
    const years = new Set();
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      const m = k && k.match(new RegExp(`^${NS}_${regime}_([0-9]{4})_DATA$`));
      if (m) years.add(parseInt(m[1]));
    }
    const cur = this.getActiveYear();
    years.add(cur);
    return Array.from(years).sort((a, b) => b - a);
  },
  createYear(regime, year) {
    const dk = `${NS}_${regime}_${year}_DATA`;
    if (!localStorage.getItem(dk)) {
      localStorage.setItem(dk, JSON.stringify({}));
      this._log(regime, year, 'SYSTEM', `Exercice ${year} créé`);
      if (window.hsBackupNudge) window.hsBackupNudge('year');
    }
  },

  // ── Contrat ────────────────────────────────────────────────────
  /* 27/09/2026 — RÉGLAGES PAR EXERCICE. Chaque exercice garde ses propres réglages
     (dates, plafond, taux, CCN…) dans M6_<régime>_<année>_CONTRACT. Modifier un exercice
     ne touche plus les autres. M6_<régime>_CONTRACT reste la copie de l'exercice EN COURS
     (lue par les anciennes versions et par le passage d'exercice).
     getContract(régime)         → réglages de l'exercice affiché (année active)
     getContract(régime, année)  → réglages de cet exercice
     getContractGlobal(régime)   → réglages de l'exercice en cours */
  getContractGlobal(regime) { return this._json(`${NS}_${regime}_CONTRACT`); },
  hasYearContract(regime, year) { return !!localStorage.getItem(`${NS}_${regime}_${parseInt(year)}_CONTRACT`); },
  getContract(regime, year) {
    if (!regime) return this._json(`${NS}_${regime}_CONTRACT`);
    const y = (year === undefined || year === null) ? this.getActiveYear(regime) : parseInt(year);
    const raw = localStorage.getItem(`${NS}_${regime}_${y}_CONTRACT`);
    if (raw) { try { return JSON.parse(raw) || {}; } catch (_) {} }
    return this.getContractGlobal(regime);
  },
  /* Année de l'exercice en cours (celui des réglages « globaux ») */
  currentExoYear(regime) {
    const g = this.getContractGlobal(regime) || {}, re = /^\d{4}-\d{2}-\d{2}$/;
    return (re.test(g.dateDebutExercice || '') && re.test(g.dateFinExercice || '')) ? global.M6_exoAnnee(g.dateDebutExercice, g.dateFinExercice) : new Date().getFullYear();
  },
  /* Déplace un exercice (toutes ses clés M6_<régime>_<année>_*) vers une autre année.
     Refusé si l'année cible a déjà des saisies (un autre exercice). */
  moveYear(regime, from, to) {
    from = parseInt(from); to = parseInt(to); if (from === to) return true;
    const pre = `${NS}_${regime}_${from}_`, cible = `${NS}_${regime}_${to}_`;
    const d = this._json(`${cible}DATA`, {}); if (d && Object.keys(d).length) return false;
    const ks = []; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.indexOf(pre) === 0) ks.push(k); }
    ks.forEach(k => { localStorage.setItem(cible + k.slice(pre.length), localStorage.getItem(k)); localStorage.removeItem(k); });
    try { const hk = 'M6_EXERCICES_' + regime, h = this._json(hk, {}); if (h[String(from)]) { h[String(to)] = h[String(from)]; delete h[String(from)]; localStorage.setItem(hk, JSON.stringify(h)); } } catch (_) {}
    try { if (localStorage.getItem('M6_EXO_OUVERT_' + regime) === String(from)) localStorage.setItem('M6_EXO_OUVERT_' + regime, String(to)); } catch (_) {}
    return true;
  },
  setContract(regime, obj, year) {
    let y = (year === undefined || year === null) ? this.getActiveYear(regime) : parseInt(year);
    // 27/09/2026 : nouvelles dates → l'exercice prend le nom de l'année où il a le plus de jours
    try {
      const L = global.M6_exoAnnee && global.M6_exoAnnee(obj && obj.dateDebutExercice, obj && obj.dateFinExercice);
      if (L && L !== y && this.moveYear(regime, y, L)) {
        const cur0 = this.currentExoYear(regime);
        if (cur0 === y) localStorage.setItem(`${NS}_${regime}_CONTRACT`, JSON.stringify(obj));
        y = L; this.setActiveYear(regime, L);
      }
    } catch (_) {}
    const cur = this.currentExoYear(regime);
    localStorage.setItem(`${NS}_${regime}_${y}_CONTRACT`, JSON.stringify(obj));
    // L'exercice en cours met aussi à jour la copie globale ; un exercice passé ou préparé, non
    const aucun = !localStorage.getItem(`${NS}_${regime}_CONTRACT`);
    if (y === cur || aucun) localStorage.setItem(`${NS}_${regime}_CONTRACT`, JSON.stringify(obj));
    // 27/09/2026 : exercices voisins recalés et jours re-rangés selon les nouvelles dates
    try {
      const nv = this.aligner(regime, y, obj && obj.dateDebutExercice, obj && obj.dateFinExercice);
      const nj = this.rangerJours(regime);
      if ((nv || nj) && window.M6_toast) setTimeout(() => M6_toast((nv ? 'Exercices voisins recalés' : '') + (nv && nj ? ' · ' : '') + (nj ? nj + ' jour(s) rangé(s) dans leur exercice' : '')), 700);
    } catch (_) {}
    this._log(regime, y, 'CONTRACT', 'Configuration de l\'exercice ' + y + ' mise à jour');
  },
  /* 27/09/2026 — COHÉRENCE DES EXERCICES.
     aligner : l'exercice suivant commence le lendemain de la fin de celui-ci, le précédent
     finit la veille de son début (sinon deux exercices se chevauchent, ou des jours ne
     sont dans aucun). Seuls les exercices voisins qui ont leurs propres réglages sont touchés.
     rangerJours : chaque jour saisi est rangé dans l'exercice qui le contient (un exercice
     à cheval sur deux années lit ainsi décembre ET janvier). Jamais d'écrasement. */
  aligner(regime, y, D, F) {
    const re = /^\d{4}-\d{2}-\d{2}$/; y = parseInt(y);
    if (!re.test(D || '')) D = y + '-01-01';
    if (!re.test(F || '')) F = y + '-12-31';
    const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    const plus = (s, n) => { const d = new Date(s + 'T12:00:00'); d.setDate(d.getDate() + n); return iso(d); };
    const unAn = (s, n) => { const d = new Date(s + 'T12:00:00'), m = d.getMonth(); d.setFullYear(d.getFullYear() + n); if (d.getMonth() !== m) d.setDate(0); return iso(d); };
    const nom = (a, b) => global.M6_exoAnnee(a, b);
    const cur = this.currentExoYear(regime), hk = 'M6_EXERCICES_' + regime, h = this._json(hk, {}) || {};
    let hBouge = false, n = 0;
    const regler = (a, deb, fin) => {  // a = année voisine ; renvoie les nouvelles dates ou null
      if (!re.test(deb) || !re.test(fin) || fin < deb || nom(deb, fin) !== a) return;
      const k = `${NS}_${regime}_${a}_CONTRACT`, sn = this._json(k, null);
      if (sn && typeof sn === 'object') {
        const civ = deb === a + '-01-01' && fin === a + '-12-31';
        const d0 = sn.dateDebutExercice || (a + '-01-01'), f0 = sn.dateFinExercice || (a + '-12-31');
        if (d0 !== deb || f0 !== fin) {
          sn.dateDebutExercice = civ ? null : deb; sn.dateFinExercice = civ ? null : fin;
          localStorage.setItem(k, JSON.stringify(sn)); n++;
          if (a === cur) localStorage.setItem(`${NS}_${regime}_CONTRACT`, JSON.stringify(sn));
        }
      }
      if (h[String(a)] && (h[String(a)].deb !== deb || h[String(a)].fin !== fin)) { h[String(a)] = { deb, fin }; hBouge = true; }
    };
    const aSes = a => !!localStorage.getItem(`${NS}_${regime}_${a}_CONTRACT`) || !!h[String(a)];
    try {
      if (aSes(y + 1)) {  // suivant : commence le lendemain
        const b = global.M6_Periode.bornes(this.getContract(regime, y + 1), y + 1, regime), nd = plus(F, 1);
        if (b.deb !== nd) regler(y + 1, nd, unAn(F, 1));  // même rythme que cet exercice
      }
      if (aSes(y - 1)) {  // précédent : finit la veille
        const b = global.M6_Periode.bornes(this.getContract(regime, y - 1), y - 1, regime), nf = plus(D, -1);
        if (b.fin !== nf) { let nd = b.deb; if (!(nf > nd) || nom(nd, nf) !== y - 1) nd = unAn(D, -1); regler(y - 1, nd, nf); }
      }
    } catch (_) {}
    if (hBouge) localStorage.setItem(hk, JSON.stringify(h));
    return n;
  },
  rangerJours(regime) {
    const re = /^\d{4}-\d{2}-\d{2}$/, wk = /^(\d{4})-W(\d{2})$/;
    const existe = a => !!localStorage.getItem(`${NS}_${regime}_${a}_DATA`) || !!localStorage.getItem(`${NS}_${regime}_${a}_CONTRACT`) || a === this.currentExoYear(regime);
    let cache = {}; const B = a => cache[a] || (cache[a] = global.M6_Periode.bornes(this.getContract(regime, a), a, regime));
    let n = 0;
    /* Jours qui ne sont dans AUCUN exercice existant (ex. exercice 2025 disparu après un
       renommage) : l'exercice qui les contient est recréé, avec des dates calées sur ses
       voisins, puis les jours y sont rangés. */
    try {
      const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      const plus = (x, k) => { const d = new Date(x + 'T12:00:00'); d.setDate(d.getDate() + k); return iso(d); };
      const creer = new Set();
      for (let i = 0; i < localStorage.length; i++) {
        const m = new RegExp(`^${NS}_${regime}_(\\d{4})_DATA$`).exec(localStorage.key(i) || ''); if (!m) continue;
        const y = +m[1], t = this._json(localStorage.key(i), null); if (!t || typeof t !== 'object' || Array.isArray(t)) continue;
        Object.keys(t).forEach(k => {
          if (!re.test(k) && !wk.test(k)) return;
          const yk = parseInt(k, 10);
          if ([y, yk, yk + 1, yk - 1].some(x => existe(x) && global.M6_Periode.inclut(k, B(x)))) return;
          const a = [yk, yk + 1, yk - 1].find(x => !existe(x) && global.M6_Periode.inclut(k, B(x)));
          if (a !== undefined) creer.add(a);
        });
      }
      Array.from(creer).sort().forEach(a => {
        const b = B(a), c = Object.assign({}, this.getContract(regime, a));
        let d = b.deb, f = b.fin;
        if (existe(a - 1)) d = plus(B(a - 1).fin, 1);
        if (existe(a + 1)) f = plus(B(a + 1).deb, -1);
        if (!(f > d) || global.M6_exoAnnee(d, f) !== a) { d = b.deb; f = b.fin; }
        const civ = d === a + '-01-01' && f === a + '-12-31';
        c.dateDebutExercice = civ ? null : d; c.dateFinExercice = civ ? null : f;
        localStorage.setItem(`${NS}_${regime}_${a}_CONTRACT`, JSON.stringify(c));
        if (!localStorage.getItem(`${NS}_${regime}_${a}_DATA`)) localStorage.setItem(`${NS}_${regime}_${a}_DATA`, '{}');
        this._log(regime, a, 'SYSTEM', `Exercice ${a} recréé (${d} → ${f}) pour ranger des jours saisis`);
        cache = {};
      });
    } catch (_) {}
    ['DATA', 'MOODS', 'DEPLACEMENT'].forEach(suf => {
      const annees = [];
      for (let i = 0; i < localStorage.length; i++) { const m = new RegExp(`^${NS}_${regime}_(\\d{4})_${suf}$`).exec(localStorage.key(i) || ''); if (m) annees.push(+m[1]); }
      const tables = {}, modif = new Set();
      annees.forEach(y => { tables[y] = this._json(`${NS}_${regime}_${y}_${suf}`, null); });
      annees.forEach(y => {
        const t = tables[y]; if (!t || typeof t !== 'object' || Array.isArray(t)) return;
        Object.keys(t).forEach(k => {
          if (!re.test(k) && !wk.test(k)) return;
          if (global.M6_Periode.inclut(k, B(y))) return;               // déjà dans son exercice
          const yk = parseInt(k, 10);
          const a = [yk, yk + 1, yk - 1].find(x => x !== y && existe(x) && global.M6_Periode.inclut(k, B(x)));
          if (a === undefined) return;                                 // dans aucun exercice : on n'y touche pas
          if (!tables[a]) tables[a] = this._json(`${NS}_${regime}_${a}_${suf}`, {}) || {};
          if (Object.prototype.hasOwnProperty.call(tables[a], k)) return;  // doublon : on ne touche à rien
          tables[a][k] = t[k]; delete t[k]; modif.add(a); modif.add(y); n++;
        });
      });
      modif.forEach(y => localStorage.setItem(`${NS}_${regime}_${y}_${suf}`, JSON.stringify(tables[y])));
    });
    return n;
  },

  /* Réglages de l'exercice en cours seulement (passage d'exercice) */
  setContractGlobal(regime, obj) { localStorage.setItem(`${NS}_${regime}_CONTRACT`, JSON.stringify(obj)); },

  // ── Données journalières / hebdomadaires ─────────────────────
  getData(regime, year)   { return this._json(`${NS}_${regime}_${year}_DATA`); },
  setData(regime, year, data) {
    localStorage.setItem(`${NS}_${regime}_${year}_DATA`, JSON.stringify(data));
    localStorage.setItem(`${NS}_${regime}_${year}_AUTO_SAVE`, new Date().toISOString());
  },
  setDay(regime, year, dk, value, prevValue) {
    const data = this.getData(regime, year);
    const old  = data[dk];
    data[dk]   = value;
    this.setData(regime, year, data);
    // Log immuable : chaque modification est tracée
    const change = value === null
      ? `Suppression de ${dk} (était: ${JSON.stringify(old)})`
      : `${dk} → ${JSON.stringify(value)}${old ? ` (était: ${JSON.stringify(old)})` : ''}`;
    this._log(regime, year, 'SAISIE', change);
    return data;
  },
  deleteDay(regime, year, dk) {
    return this.setDay(regime, year, dk, null);
  },

  // ── Données mood tracking ─────────────────────────────────────
  getMoods(regime, year)   { return this._json(`${NS}_${regime}_${year}_MOODS`); },
  setMood(regime, year, dk, niveau) {
    // Garde-fou : certains appelants passent l'OBJET mood entier {niveau:'eleve'} au lieu de la string.
    // Sans ce déballage, on stocke {niveau:{niveau:'eleve'}, ts:...} → "[object Object]" partout.
    if (niveau && typeof niveau === 'object') niveau = niveau.niveau || '';
    if (!niveau) return; // ne rien stocker pour un mood vide
    const moods  = this.getMoods(regime, year);
    moods[dk]    = { niveau, ts: new Date().toISOString() };
    localStorage.setItem(`${NS}_${regime}_${year}_MOODS`, JSON.stringify(moods));
    this._log(regime, year, 'MOOD', `${dk} → charge ${niveau}`);
  },

  // ── Entretien annuel ──────────────────────────────────────────
  getEntretiens(regime, year) {
    // Si une année précise est demandée → lire uniquement cette clé
    if (year) {
      const key = `${NS}_${regime}_${year}_ENTRETIENS`;
      return this._json(key, []);
    }
    // Sans year → agréger TOUTES les années disponibles dans localStorage
    // pour construire l'historique complet (visible dans l'onglet Entretien)
    const all = [];
    try {
      // Clé sans année (anciens entretiens pré-migration)
      const old = this._json(`${NS}_${regime}_ENTRETIENS`, []);
      all.push(...old);
      // Clés par année M6_cadre_dirigeant_2024_ENTRETIENS etc.
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(`${NS}_${regime}_`) && k.endsWith('_ENTRETIENS') && k !== `${NS}_${regime}_ENTRETIENS`) {
          const items = this._json(k, []);
          all.push(...items);
        }
      }
    } catch(_) {}
    // Trier par date croissante (le plus ancien en premier → le dernier du tableau = le plus récent)
    all.sort((a,b) => (a.date||'').localeCompare(b.date||''));
    return all;
  },
  addEntretien(regime, year, e) {
    const key = year ? `${NS}_${regime}_${year}_ENTRETIENS` : `${NS}_${regime}_ENTRETIENS`;
    const list = this._json(key, []);
    list.push({ ...e, savedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list));
    this._log(regime, year, 'ENTRETIEN', 'Entretien enregistre');
  },
  saveEntretien(regime, e) { this.addEntretien(regime, null, e); },

  // ── Validations mensuelles (signature cadre) ─────────────────
  getValidations(regime, year) { return this._json(`${NS}_${regime}_${year}_VALID`); },
  addValidation(regime, year, mois, nom) {
    const v = this.getValidations(regime, year);
    const ts = new Date().toISOString();
    v[mois] = { nom, ts, hash: this._hashSync(`${mois}-${nom}-${ts}`) };
    localStorage.setItem(`${NS}_${regime}_${year}_VALID`, JSON.stringify(v));
    this._log(regime, year, 'VALIDATION', `Mois ${mois} validé par ${nom}`);
    return v[mois];
  },

  // ── Historique déplacements ───────────────────────────────────
  getDeplacements(regime, year) { return this._json(`${NS}_${regime}_${year}_DEPLACEMENT`); },
  addDeplacement(regime, year, obj) {
    const list = this.getDeplacements(regime, year);
    list.push({ ...obj, id: Date.now(), savedAt: new Date().toISOString() });
    localStorage.setItem(`${NS}_${regime}_${year}_DEPLACEMENT`, JSON.stringify(list));
  },

  // ── Log immuable ──────────────────────────────────────────────
  _log(regime, year, action, detail) {
    const key  = `${NS}_LOG_${regime}_${year || 'GLOBAL'}`;
    let   log  = [];
    try { log = JSON.parse(localStorage.getItem(key) || '[]'); } catch (_) {}
    log.push({ ts: new Date().toISOString(), action, detail });
    // Conserver les 500 dernières entrées max
    if (log.length > 500) log = log.slice(-500);
    try { localStorage.setItem(key, JSON.stringify(log)); } catch (_) {}
  },
  getLog(regime, year) {
    const key = `${NS}_LOG_${regime}_${year || 'GLOBAL'}`;
    return this._json(key, []);
  },

  // ── Export RGPD ───────────────────────────────────────────────
  exportAll() {
    const dump = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(NS)) {
        try { dump[k] = JSON.parse(localStorage.getItem(k)); }
        catch (_) { dump[k] = localStorage.getItem(k); }
      }
    }
    return dump;
  },
  deleteAll(regime) {
    const toDelete = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(`${NS}_${regime}`)) toDelete.push(k);
    }
    toDelete.forEach(k => localStorage.removeItem(k));
    this._log(regime, null, 'RGPD', `Suppression complète du régime ${regime}`);
  },

  // ── Dates auto-save ───────────────────────────────────────────
  getAutoSaveDate(regime, year) {
    return localStorage.getItem(`${NS}_${regime}_${year}_AUTO_SAVE`) || null;
  },
  getFileSaveDate(regime, year) {
    return localStorage.getItem(`${NS}_${regime}_${year}_FILE_SAVE`) || null;
  },
  markFileSave(regime, year) {
    localStorage.setItem(`${NS}_${regime}_${year}_FILE_SAVE`, new Date().toISOString());
  },

  // ── Helpers ───────────────────────────────────────────────────
  _json(key, fallback = {}) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch (_) { return fallback; }
  },
  _hashSync(str) {
    // Hash simple côté client (non cryptographique, valeur probante symbolique)
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h) + str.charCodeAt(i);
      h = h & h;
    }
    return (h >>> 0).toString(16).padStart(8, '0').toUpperCase();
  }
};

// ── Alerte changement de phase INRS ─────────────────────────────
// Appeler depuis render() de chaque vue après calcul bio
// Si la phase empire par rapport au mois précédent → toast + badge
const M6_PhaseAlert = {
  _KEY(regime, year) { return 'M6_LAST_PHASE_' + regime + '_' + year; },

  check(regime, year, currentPhaseCode, currentFatigue) {
    const key   = this._KEY(regime, year);
    const last  = (() => { try { return JSON.parse(localStorage.getItem(key)||'null'); } catch { return null; } })();
    const now   = { code: currentPhaseCode, fatigue: currentFatigue, ts: new Date().toISOString() };

    if (!last) { localStorage.setItem(key, JSON.stringify(now)); return null; }

    // Comparer les phases : P1 < P2 < P3 < P4
    const ordre = { P1:1, P2:2, P3:3, P4:4 };
    const prev  = ordre[last.code] || 1;
    const curr  = ordre[currentPhaseCode] || 1;

    // Sauvegarder la phase actuelle
    localStorage.setItem(key, JSON.stringify(now));

    if (curr > prev) {
      // Phase empirée → alerte
      const messages = {
        2: 'Passage en Phase P2 (Fatigue chronique). La recuperation devient necessaire — programmez des RTT. (INRS)',
        3: 'ALERTE Phase P3 (Surmenage). Signalez la situation a votre manager et envisagez un entretien avec le medecin du travail. Art. L4121-1.',
        4: 'CRITIQUE Phase P4 (Burn-out imminent). Consultez immediatement votre medecin du travail. Art. L4121-1.',
      };
      return { niveau: curr >= 3 ? 'danger' : 'warning', message: messages[curr] || 'Phase aggravee.', phase: currentPhaseCode };
    }
    if (curr < prev && curr === 1) {
      return { niveau: 'success', message: 'Retour en Phase P1 — bonne recuperation constatee. Sonnentag 2022 : maintenez ce rythme.', phase: currentPhaseCode };
    }
    return null;
  },

  // Affiche le badge d'alerte dans le DOM si besoin
  showIfNeeded(regime, year, phaseCode, fatigue) {
    const alert = this.check(regime, year, phaseCode, fatigue);
    if (!alert) return;
    const niv = alert.niveau;
    const colors = {
      danger:  { bg:'#9B2C2C', text:'#fff' },
      warning: { bg:'#C4853A', text:'#fff' },
      success: { bg:'#2D6A4F', text:'#fff' },
    };
    const co = colors[niv] || colors.warning;

    let el = document.getElementById('m6-phase-alert');
    if (!el) {
      el = document.createElement('div');
      el.id = 'm6-phase-alert';
      el.style.cssText = `position:fixed;bottom:calc(76px + env(safe-area-inset-bottom,0));left:12px;right:12px;
        border-radius:10px;padding:12px 16px;z-index:500;
        font-size:0.78rem;line-height:1.5;font-family:system-ui,sans-serif;
        display:flex;align-items:flex-start;gap:10px;box-shadow:0 4px 20px rgba(0,0,0,0.2);
        transform:translateY(100px);transition:transform 0.4s cubic-bezier(.4,0,.2,1);opacity:0`;
      document.body.appendChild(el);
    }
    el.style.background = co.bg;
    el.style.color = co.text;
    el.innerHTML = `<span style="font-size:1.1rem;flex-shrink:0">${niv==='danger'?'🔴':niv==='success'?'✅':'🟠'}</span>
      <div><strong>Zenji — Phase ${alert.phase}</strong><br>${alert.message}</div>
      <button onclick="document.getElementById('m6-phase-alert').style.transform='translateY(100px)'"
        style="background:none;border:none;color:${co.text};font-size:1rem;cursor:pointer;padding:0;flex-shrink:0;margin-left:auto">✕</button>`;
    setTimeout(() => { el.style.transform='translateY(0)'; el.style.opacity='1'; }, 100);
    setTimeout(() => { el.style.transform='translateY(100px)'; el.style.opacity='0'; }, 9000);
  }
};

global.M6_Storage    = M6_Storage;
global.M6_PhaseAlert = M6_PhaseAlert;

// ── Android swipe-to-refresh : protection des données ────────────
// Sur Android, le "pull-to-refresh" peut réinitialiser la page sans
// vider localStorage, mais si le service worker recharge les assets
// sans les données, l'état peut sembler perdu. On force la persistance
// via plusieurs mécanismes :
(function() {
  // 1. Backup régime + année courante dans sessionStorage (survit au swipe)
  function _syncSession() {
    try {
      const regime = localStorage.getItem('M6_REGIME');
      const year   = localStorage.getItem('M6_CURRENT_YEAR');
      if (regime) sessionStorage.setItem('M6_REGIME_BACKUP', regime);
      if (year)   sessionStorage.setItem('M6_YEAR_BACKUP', year);
    } catch(_) {}
  }
  // 2. Restauration depuis sessionStorage si localStorage semble vide
  function _restoreFromSession() {
    try {
      if (!localStorage.getItem('M6_REGIME')) {
        const r = sessionStorage.getItem('M6_REGIME_BACKUP');
        if (r) localStorage.setItem('M6_REGIME', r);
      }
      if (!localStorage.getItem('M6_CURRENT_YEAR')) {
        const y = sessionStorage.getItem('M6_YEAR_BACKUP');
        if (y) localStorage.setItem('M6_CURRENT_YEAR', y);
      }
    } catch(_) {}
  }
  _restoreFromSession();
  // Sync toutes les 10s et à chaque événement de stockage
  setInterval(_syncSession, 10000);
  window.addEventListener('focus', _syncSession);
  // 3. Empêcher le pull-to-refresh natif sur Android (overscroll-behavior)
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.style.overscrollBehaviorY = 'contain';
    });
  }
  // 4. Exposer une fonction de vérification de santé des données
  global.M6_CheckDataIntegrity = function() {
    try {
      const regime = localStorage.getItem('M6_REGIME');
      const seen   = localStorage.getItem('M6_ZENJI_SEEN');
      return { ok: true, regime, seen };
    } catch(e) { return { ok: false, error: e.message }; }
  };
  // 5. Migration auto : réparer les moods stockés en double-wrap
  //    {niveau:{niveau:'eleve'}, ts:...} → {niveau:'eleve', ts:...}
  //    Bug introduit par un appelant qui passait l'objet entier au lieu de la string.
  try {
    for (let i=0; i<localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.endsWith('_MOODS')) continue;
      let dirty = false;
      let raw;
      try { raw = JSON.parse(localStorage.getItem(k) || '{}'); } catch(_) { continue; }
      if (!raw || typeof raw !== 'object') continue;
      for (const dk of Object.keys(raw)) {
        const m = raw[dk];
        if (m && typeof m === 'object' && m.niveau && typeof m.niveau === 'object') {
          // Décapsuler récursivement (au cas où il y aurait du triple-wrap)
          let n = m.niveau;
          while (n && typeof n === 'object' && n.niveau) n = n.niveau;
          raw[dk] = { niveau: n || '', ts: m.ts || new Date().toISOString() };
          dirty = true;
        }
      }
      if (dirty) localStorage.setItem(k, JSON.stringify(raw));
    }
  } catch(_) { /* silencieux — la migration est best-effort */ }
})();

/* Migration unique des utilisateurs existants (26/09/2026, M6_MIGR_EXO_V1).
   1. Exercice daté à cheval sur deux années (ex. juin → mai) : l'ancienne version
      rangeait chaque jour sous l'année « active » au moment de la saisie, donc
      janvier-mai pouvait se trouver sous l'année suivante. Les vues filtrent
      désormais par exercice : chaque jour (ou semaine) est déplacé sous l'année de
      l'exercice qui le contient. Jamais d'écrasement : en cas de doublon, le jour
      reste où il est.
   2. Exercice terminé depuis plus d'un mois : pas de bandeau « nouvel exercice »
      tardif. Les dates du contrat sont avancées sans bruit jusqu'à l'exercice en
      cours (les exercices passés gardent leurs vraies dates dans M6_EXERCICES_). */
(function migrerExercices() {
  try {
    if (localStorage.getItem('M6_MIGR_EXO_V1')) return;
    const re = /^\d{4}-\d{2}-\d{2}$/, wk = /^(\d{4})-W(\d{2})$/;
    const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    const unAn = (s, n) => { const d = new Date(s + 'T12:00:00'), m = d.getMonth(); d.setFullYear(d.getFullYear() + n); if (d.getMonth() !== m) d.setDate(0); return iso(d); };
    const lundi = k => { const w = wk.exec(k); const j4 = new Date(+w[1], 0, 4, 12), l = new Date(j4); l.setDate(j4.getDate() - ((j4.getDay() + 6) % 7) + (+w[2] - 1) * 7); return iso(l); };
    const lire = k => { try { const o = JSON.parse(localStorage.getItem(k) || 'null'); return o && typeof o === 'object' && !Array.isArray(o) ? o : null; } catch (_) { return null; } };
    const auj = iso(new Date());
    const regimes = new Set();
    for (let i = 0; i < localStorage.length; i++) { const m = /^M6_(.+)_CONTRACT$/.exec(localStorage.key(i) || ''); if (m && !/_\d{4}$/.test(m[1])) regimes.add(m[1]); }
    regimes.forEach(regime => {
      const c = lire(`M6_${regime}_CONTRACT`) || {};
      const deb = c.dateDebutExercice, fin = c.dateFinExercice;
      const date = re.test(deb || '') && re.test(fin || '') && fin > deb;
      const calendaire = !date || (deb.slice(5) === '01-01' && fin.slice(5) === '12-31');
      // 1. Re-rangement des jours (exercice non calendaire uniquement)
      if (!calendaire) {
        const ecart = parseInt(fin, 10) - parseInt(deb, 10), off = (global.M6_exoAnnee ? global.M6_exoAnnee(deb, fin) : parseInt(deb, 10)) - parseInt(deb, 10);
        const exo = k => { // nom (année) de l'exercice qui contient le jour k
          const j = re.test(k) ? k : lundi(k), y = parseInt(j, 10);
          for (const a of [y - 1, y, y + 1]) { const d = (a - off) + deb.slice(4), f = (a - off + ecart) + fin.slice(4); if (j >= d && j <= f) return a; }
          return null;
        };
        ['DATA', 'MOODS', 'DEPLACEMENT'].forEach(suf => {
          const annees = [];
          for (let i = 0; i < localStorage.length; i++) { const m = new RegExp(`^M6_${regime}_(\\d{4})_${suf}$`).exec(localStorage.key(i) || ''); if (m) annees.push(+m[1]); }
          const tables = {}; annees.forEach(y => { tables[y] = lire(`M6_${regime}_${y}_${suf}`); });
          const modif = new Set();
          annees.forEach(y => {
            const t = tables[y]; if (!t) return;
            Object.keys(t).forEach(k => {
              if (!re.test(k) && !wk.test(k)) return;
              const a = exo(k); if (a === null || a === y) return;
              if (!tables[a]) tables[a] = lire(`M6_${regime}_${a}_${suf}`) || {};
              if (Object.prototype.hasOwnProperty.call(tables[a], k)) return; // doublon : on ne touche à rien
              tables[a][k] = t[k]; delete t[k]; modif.add(a); modif.add(y);
            });
          });
          modif.forEach(y => localStorage.setItem(`M6_${regime}_${y}_${suf}`, JSON.stringify(tables[y])));
        });
      }
      // 2. Exercice terminé depuis plus d'un mois : on se cale sur l'exercice en cours
      const limite = d => { const x = new Date(d + 'T12:00:00'); x.setMonth(x.getMonth() + 1); return iso(x); };
      if (date) {
        if (auj > limite(fin)) {
          const hk = 'M6_EXERCICES_' + regime, h = lire(hk) || {};
          let d = deb, f = fin, n = 0;
          const nom = (a, b) => String(global.M6_exoAnnee ? global.M6_exoAnnee(a, b) : parseInt(a, 10));
          while (f < auj && n < 50) { if (!h[nom(d, f)]) h[nom(d, f)] = { deb: d, fin: f }; n++; d = unAn(deb, n); f = unAn(fin, n); }
          localStorage.setItem(hk, JSON.stringify(h));
          localStorage.setItem(`M6_${regime}_CONTRACT`, JSON.stringify(Object.assign({}, c, { dateDebutExercice: d, dateFinExercice: f })));
          localStorage.setItem('M6_EXO_OUVERT_' + regime, String(parseInt(nom(d, f), 10) - 1));
        }
      } else {
        const prec = new Date().getFullYear() - 1;
        if (auj > limite(prec + '-12-31') && !localStorage.getItem('M6_EXO_OUVERT_' + regime)) localStorage.setItem('M6_EXO_OUVERT_' + regime, String(prec));
      }
    });
    localStorage.setItem('M6_MIGR_EXO_V1', auj);
  } catch (_) { /* best-effort : en cas d'échec, l'appli fonctionne comme avant */ }
})();

/* Migration unique (27/09/2026, M6_EXO_CONTRATS_V1) : chaque exercice déjà saisi reçoit
   sa copie des réglages actuels, avec ses vraies dates (historique M6_EXERCICES_, sinon
   même période décalée d'années). Ensuite, modifier un exercice ne touche plus les autres. */
(function migrerReglagesParExercice() {
  try {
    if (localStorage.getItem('M6_EXO_CONTRATS_V1')) return;
    const re = /^\d{4}-\d{2}-\d{2}$/;
    const lire = k => { try { const o = JSON.parse(localStorage.getItem(k) || 'null'); return o && typeof o === 'object' ? o : null; } catch (_) { return null; } };
    const regimes = new Set();
    for (let i = 0; i < localStorage.length; i++) { const m = /^M6_(.+)_CONTRACT$/.exec(localStorage.key(i) || ''); if (m && !/_\d{4}$/.test(m[1])) regimes.add(m[1]); }
    regimes.forEach(r => {
      const g = lire(`M6_${r}_CONTRACT`); if (!g) return;
      const hist = lire('M6_EXERCICES_' + r) || {};
      const deb = g.dateDebutExercice, fin = g.dateFinExercice, date = re.test(deb || '') && re.test(fin || '');
      const annees = new Set();
      for (let i = 0; i < localStorage.length; i++) { const m = new RegExp(`^M6_${r}_(\\d{4})_DATA$`).exec(localStorage.key(i) || ''); if (m) annees.add(+m[1]); }
      annees.forEach(y => {
        const k = `M6_${r}_${y}_CONTRACT`; if (localStorage.getItem(k)) return;
        const c = Object.assign({}, g);
        if (hist[String(y)] && hist[String(y)].deb) { c.dateDebutExercice = hist[String(y)].deb; c.dateFinExercice = hist[String(y)].fin; }
        else if (date) { const ec = parseInt(fin, 10) - parseInt(deb, 10), off = (global.M6_exoAnnee ? global.M6_exoAnnee(deb, fin) : parseInt(deb, 10)) - parseInt(deb, 10); c.dateDebutExercice = (y - off) + deb.slice(4); c.dateFinExercice = (y - off + ec) + fin.slice(4); }
        localStorage.setItem(k, JSON.stringify(c));
      });
    });
    localStorage.setItem('M6_EXO_CONTRATS_V1', new Date().toISOString().slice(0, 10));
  } catch (_) { /* best-effort */ }
})();

/* Migration unique (27/09/2026, M6_EXO_NOM_V2) : un exercice rangé sous son année de DÉBUT
   passe sous l'année où il a le plus de jours (17/11/2025 → 16/11/2026 : 2025 → 2026).
   Du plus récent au plus ancien, pour ne rien écraser ; un exercice dont l'année cible a déjà
   des saisies reste où il est. */
(function migrerNomsExercices() {
  try {
    if (localStorage.getItem('M6_EXO_NOM_V2') || !global.M6_exoAnnee) return;
    const re = /^\d{4}-\d{2}-\d{2}$/;
    const lire = k => { try { const o = JSON.parse(localStorage.getItem(k) || 'null'); return o && typeof o === 'object' ? o : null; } catch (_) { return null; } };
    const regimes = new Set();
    for (let i = 0; i < localStorage.length; i++) { const m = /^M6_(.+)_CONTRACT$/.exec(localStorage.key(i) || ''); if (m && !/_\d{4}$/.test(m[1])) regimes.add(m[1]); }
    regimes.forEach(r => {
      const g = lire(`M6_${r}_CONTRACT`) || {}, hist = lire('M6_EXERCICES_' + r) || {};
      const ys = new Set();
      for (let i = 0; i < localStorage.length; i++) { const m = new RegExp(`^M6_${r}_(\\d{4})_(DATA|CONTRACT)$`).exec(localStorage.key(i) || ''); if (m) ys.add(+m[1]); }
      let bouge = false;
      Array.from(ys).sort((a, b) => b - a).forEach(y => {
        const sn = lire(`M6_${r}_${y}_CONTRACT`); let d = null, f = null;
        if (sn && re.test(sn.dateDebutExercice || '') && re.test(sn.dateFinExercice || '')) { d = sn.dateDebutExercice; f = sn.dateFinExercice; }
        else if (hist[String(y)] && hist[String(y)].deb) { d = hist[String(y)].deb; f = hist[String(y)].fin; }
        if (!d || parseInt(d, 10) !== y) return;               // déjà sous son nom, ou année civile
        const L = global.M6_exoAnnee(d, f);
        if (L !== y && M6_Storage.moveYear(r, y, L)) bouge = true;
      });
      if (bouge) try { localStorage.removeItem(`M6_${r}_ACTIVE_YEAR`); } catch (_) {}
    });
    localStorage.setItem('M6_EXO_NOM_V2', new Date().toISOString().slice(0, 10));
  } catch (_) { /* best-effort */ }
})();

/* Migration unique (27/09/2026, M6_EXO_ALIGN_V4 ; V3 ne recalait que les voisins directs et
   ne recréait pas un exercice disparu) : tous les exercices recalés de proche en proche à
   partir de l'exercice en cours (plus de chevauchement ni de trou), puis chaque jour rangé
   dans l'exercice qui le contient, en recréant au besoin un exercice passé disparu. */
(function alignerExercices() {
  try {
    if (localStorage.getItem('M6_EXO_ALIGN_V4') || !global.M6_Periode) return;
    const regimes = new Set();
    for (let i = 0; i < localStorage.length; i++) { const m = /^M6_(.+)_CONTRACT$/.exec(localStorage.key(i) || ''); if (m && !/_\d{4}$/.test(m[1])) regimes.add(m[1]); }
    regimes.forEach(r => {
      try {
        const g = M6_Storage.getContractGlobal(r) || {}, C = M6_Storage.currentExoYear(r);
        const sn = M6_Storage.hasYearContract(r, C) ? M6_Storage.getContract(r, C) : g;
        M6_Storage.aligner(r, C, sn.dateDebutExercice, sn.dateFinExercice);
        const ys = []; for (let i = 0; i < localStorage.length; i++) { const m = new RegExp('^M6_' + r + '_(\\d{4})_(CONTRACT|DATA)$').exec(localStorage.key(i) || ''); if (m) ys.push(+m[1]); }
        const haut = Math.max(C, ...ys), bas = Math.min(C, ...ys);
        const al = y => { const b = M6_Periode.bornes(M6_Storage.getContract(r, y), y, r); M6_Storage.aligner(r, y, b.deb, b.fin); };
        for (let y = C + 1; y < haut; y++) al(y);
        for (let y = C - 1; y > bas; y--) al(y);
        M6_Storage.rangerJours(r);
        /* Exercices passés restés VIDES après le rangement (ancien nommage de la prod : un exercice
           « fantôme » avant le premier exercice saisi) : supprimés s'ils ne contiennent vraiment rien. */
        try {
          const vide = v => { if (v === null) return true; try { const o = JSON.parse(v); return o === null || (typeof o === 'object' && Object.keys(o).length === 0); } catch (_) { return false; } };
          const parAn = {};
          for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i), m = new RegExp('^M6_' + r + '_(\\d{4})_(.+)$').exec(k || ''); if (m) (parAn[m[1]] = parAn[m[1]] || []).push([k, m[2]]); }
          const pleins = Object.keys(parAn).filter(y => parAn[y].some(([k, t]) => t === 'DATA' && !vide(localStorage.getItem(k)))).map(Number);
          const premier = pleins.length ? Math.min(...pleins) : null;
          if (premier !== null) Object.keys(parAn).map(Number).filter(y => y < premier && y !== C).forEach(y => {
            const ks = parAn[String(y)];
            if (ks.every(([k, t]) => t === 'CONTRACT' || t === 'AUTO_SAVE' || vide(localStorage.getItem(k)))) {
              ks.forEach(([k]) => localStorage.removeItem(k));
              try { const hk = 'M6_EXERCICES_' + r, h = JSON.parse(localStorage.getItem(hk) || '{}') || {}; if (h[String(y)]) { delete h[String(y)]; localStorage.setItem(hk, JSON.stringify(h)); } } catch (_) {}
            }
          });
        } catch (_) {}
      } catch (_) {}
    });
    localStorage.setItem('M6_EXO_ALIGN_V4', new Date().toISOString().slice(0, 10));
  } catch (_) { /* best-effort */ }
})();

})(window);
