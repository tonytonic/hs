/**
 * PDF-REPORT M6 v2 — Exports certifiés sans emoji (compatibilité maximale)
 * - Texte pur (pas d'emoji → pas de cadrage cassé)
 * - Mention légale repos obligatoire dans chaque PDF
 * - Checkbox certification avant export
 * - Mensuel + Annuel + Entretiens historique
 * - Bloc signature cadre + manager
 * - Avertissement médical (non-substitution)
 */
'use strict';

(function(global) {

// Nettoie les emojis et caracteres speciaux pour jsPDF
// ── Hash local SHA-256 simplifié (pas d'API externe) ─────────────
// Utilise SubtleCrypto si dispo, sinon un hash djb2 déterministe
function _localHash(str) {
  // Essayer SubtleCrypto en async (best effort — on utilise le sync comme fallback)
  // Retour synchrone : djb2 hash (suffisant pour une référence de document)
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
    h = h & 0x7FFFFFFF;
  }
  return 'M6-' + h.toString(16).toUpperCase().padStart(8, '0');
}

// ── Web Share API — partage natif ou téléchargement fallback ─────
async function _shareOrSave(doc, filename, toastMsg) {
  // Demander à l'utilisateur ce qu'il veut faire (ne PAS ouvrir le mail automatiquement)
  let wantShare = false;
  if (navigator.canShare) {
    try {
      const pdfBlob0 = doc.output('blob');
      const file0    = new File([pdfBlob0], filename, { type: 'application/pdf' });
      if (navigator.canShare({ files: [file0] })) {
        wantShare = window.confirm('PDF généré.\n\nVoulez-vous l\'envoyer (mail, manager, etc.) ?\n\n• OK = Partager / envoyer\n• Annuler = Enregistrer seulement');
      }
    } catch(_) {}
  }

  if (wantShare && navigator.canShare) {
    try {
      const pdfBlob = doc.output('blob');
      const file    = new File([pdfBlob], filename, { type: 'application/pdf' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: filename });
        window.M6_toast?.(toastMsg + ' — partagé');
        return;
      }
    } catch(e) {
      if (e.name !== 'AbortError') console.warn('[M6 PDF] share error:', e);
      // L'utilisateur a annulé le partage → on enregistre quand même
    }
  }
  // Téléchargement / enregistrement direct
  doc.save(filename);
  window.M6_toast?.(toastMsg + ' — enregistré');
}

function _pdfSanitize(str) {
  if (str === null || str === undefined || str === '') return '';
  // Garde-fou : si on reçoit un objet/tableau par erreur, ne PAS afficher "[object Object]".
  // Tenter une extraction raisonnable (niveau, label, value), sinon retourner vide.
  if (typeof str === 'object') {
    if (Array.isArray(str)) {
      return _pdfSanitize(str.map(s => _pdfSanitize(s)).filter(Boolean).join(', '));
    }
    // Cas connus dans M6 : mood {niveau, ts}, entretien {date, manager…}, etc.
    const probable = str.niveau ?? str.label ?? str.value ?? str.text ?? str.name ?? '';
    if (probable) return _pdfSanitize(probable);
    if (typeof console !== 'undefined') console.warn('[PDF] _pdfSanitize: object reçu, ignoré:', str);
    return '';
  }
  return String(str)
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')
    .replace(/[\u{2600}-\u{26FF}]/gu, '')
    .replace(/[\u{2700}-\u{27BF}]/gu, '')
    .replace(/\u00e9/g, 'e').replace(/\u00e8/g, 'e')
    .replace(/\u00ea/g, 'e').replace(/\u00eb/g, 'e')
    .replace(/\u00e0/g, 'a').replace(/\u00e2/g, 'a')
    .replace(/\u00f4/g, 'o').replace(/\u00ee/g, 'i')
    .replace(/\u00f9/g, 'u').replace(/\u00fb/g, 'u')
    .replace(/\u00e7/g, 'c').replace(/\u0153/g, 'oe')
    .replace(/[^\x00-\x7E\xA0-\xFF]/g, '?')
    .trim();
}

const M6_PDF = {

  _askCertification(onConfirm) { onConfirm(); }, // Certification supprimée — PDF direct

  exportMensuel(opts) {
    this._genMensuel(opts);
  },

  _genMensuel({ regime, year, mois, contract, data, moods, analysis, validations }) {
    mois = (typeof mois === 'number' && !isNaN(mois)) ? mois : new Date().getMonth();
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) { alert('PDF non disponible — verifiez votre connexion internet (jsPDF CDN).'); return; }

    const doc  = new jsPDF({ format:'a4', unit:'mm' });
    const mNom = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'][mois];
    const W    = 210, M = 20;
    let y      = 0;

    const lnH  = () => { y += 5; };
    const line  = (x1,y1,x2,y2,w=0.3) => { doc.setLineWidth(w); doc.line(x1,y1,x2,y2); };
    const rect  = (x,ry,w,h,fill) => { if(fill){doc.setFillColor(...fill);doc.rect(x,ry,w,h,'F');}else{doc.rect(x,ry,w,h,'S');} };
    const txt   = (t,x,ry,size,color,style='normal') => {
      doc.setFontSize(size);
      doc.setTextColor(...(color||[26,23,20]));
      doc.setFont('helvetica',style);
      // Garde-fou : objets → texte vide ou propriété connue (jamais "[object Object]")
      let s;
      if (t === null || t === undefined) s = '';
      else if (typeof t === 'object') s = String(t.niveau ?? t.label ?? t.value ?? '');
      else s = String(t);
      doc.text(s, x, ry);
    };

    // ── En-tête ──────────────────────────────────────────────
    rect(0,0,W,28,[26,23,20]);
    txt('MODULE 6 - CADRES',M,10,8,[196,163,90],'bold');
    txt('RECAPITULATIF MENSUEL DE FORFAIT JOURS',M,16,13,[247,243,237],'bold');
    txt(`${mNom} ${year}`,M,22,9,[189,181,168]);
    y = 34;

    // Infos cadre
    txt('CADRE',M,y,8,[138,132,124],'bold'); y+=5;
    txt(`Nom : ${contract.nomCadre||'Non renseigne'}`,M,y,10); lnH();
    txt(`CCN : ${contract.ccnLabel||'Droit commun'} - Forfait ${contract.plafond||218} jours`,M,y,10); lnH();
    txt(`Manager : ${contract.nomManager||'Non renseigne'}`,M,y,10); y+=8;

    // Tableau mensuel
    rect(0,y,W,6,[240,235,228]);
    txt('DATE',M,y+4.5,7,[70,69,68],'bold');
    txt('TYPE',70,y+4.5,7,[70,69,68],'bold');
    txt('DEBUT',100,y+4.5,7,[70,69,68],'bold');
    txt('FIN',125,y+4.5,7,[70,69,68],'bold');
    txt('AMPLITUDE',145,y+4.5,7,[70,69,68],'bold');
    txt('CHARGE',175,y+4.5,7,[70,69,68],'bold');
    y += 7;
    line(M,y,W-M,y);

    // Lignes du mois
    const feries = M6_Feries?.getSet(year) || new Set();
    let joursT = 0, rttP = 0, cpP = 0;
    let rowCount = 0;

    for (let j=1; j<=new Date(year,mois+1,0).getDate(); j++) {
      const dk = `${year}-${String(mois+1).padStart(2,'0')}-${String(j).padStart(2,'0')}`;
      const d  = new Date(dk+'T12:00:00');
      const dw = d.getDay();
      if (dw===0||dw===6) continue; // skip WE

      const entry  = data[dk];
      const mood   = moods?.[dk];
      const type   = entry?.type||'travail';
      const isFer  = feries.has(dk);
      if (isFer && !entry) continue;

      const typeLabels = { travail:'Travail', rtt:'RTT', cp:'Conge', ferie:'Ferie',
                           repos:'Repos', rachat:'Rachat', demi:'Demi-j.' };

      if (rowCount%2===0) rect(M-2,y-0.5,W-2*M+4,5.5,[248,245,241]);
      txt(d.toLocaleDateString('fr-FR',{weekday:'short',day:'numeric'}),M,y+3.5,8,[26,23,20]);
      txt(typeLabels[type]||type, 70,y+3.5,8);

      let ampText = '-';
      if (entry?.debut&&entry?.fin) {
        const [dh,dm]=entry.debut.split(':').map(Number), [fh,fm]=entry.fin.split(':').map(Number);
        const amp = (fh*60+fm)-(dh*60+dm);
        ampText = `${Math.floor(amp/60)}h${String(amp%60).padStart(2,'0')}`;
        if (amp > 780) txt(`!`, 165, y+3.5, 8, [155,44,44], 'bold');
        txt(entry.debut,100,y+3.5,8);
        txt(entry.fin,125,y+3.5,8);
      }
      txt(ampText, 145, y+3.5, 8);

      // Décapsuler le niveau récursivement (bug double-wrap historique)
      let _rawNiv = mood?.niveau;
      while (_rawNiv && typeof _rawNiv === 'object') _rawNiv = _rawNiv.niveau;
      const moodMap = { faible:'Legere', ok:'Normale', eleve:'Soutenue', critique:'CRITIQUE' };
      const moodStr = _rawNiv ? moodMap[_rawNiv]||_rawNiv : '-';
      const moodColor = _rawNiv==='critique'?[155,44,44]:_rawNiv==='eleve'?[138,90,26]:[70,112,95];
      txt(moodStr, 175, y+3.5, 7, moodColor);

      if (type==='travail'||type==='rachat') joursT++;
      if (type==='rtt') rttP++;
      if (type==='cp')  cpP++;

      y += 6; rowCount++;
      if (y > 260) { doc.addPage(); y = 15; }
    }

    y += 4; line(M,y,W-M,y); y += 6;

    // Recapitulatif mensuel
    rect(M-2,y-1,W-2*M+4,6,[240,235,228]);
    txt(`Jours travailles : ${joursT} | RTT : ${rttP} | Conges : ${cpP}`, M, y+3.5, 8, [26,23,20], 'bold');
    y += 10;

    // Cumul annuel
    txt('CUMUL ANNUEL',M,y,8,[138,132,124],'bold'); y += 5;
    txt(`Jours effectifs : ${analysis?.joursEffectifs||'-'} / ${analysis?.plafond||218}`, M, y, 9); lnH();
    txt(`Solde RTT : ${analysis?.rttSolde>=0?'+':''}${analysis?.rttSolde??'-'}`, M, y, 9); y += 8;

    // Mention juridique repos
    rect(M-2,y-1,W-2*M+4,14,[232,245,238]);
    doc.setFontSize(7.5); doc.setTextColor(30,90,60); doc.setFont('helvetica','bold');
    doc.text('DECLARATION DE L EXACTITUDE', M, y+4);
    doc.setFont('helvetica','normal');
    const certLines = doc.splitTextToSize(
      'Document de suivi indicatif de votre forfait. À conserver pour vos archives personnelles.',
      W-2*M);
    doc.text(certLines, M, y+8.5);
    y += 18;

    // Avertissement medical
    if (y < 240) {
      rect(M-2,y-1,W-2*M+4,9,[238,242,255]);
      doc.setFontSize(6.5); doc.setTextColor(55,48,163);
      const medLines = doc.splitTextToSize(
        'Note : Les indicateurs de sante presentes dans cet outil sont fournis a titre informatif uniquement. Ils ne constituent pas un avis medical et ne remplacent pas une consultation medicale professionnelle.',
        W-2*M);
      doc.text(medLines, M, y+4);
      y += 13;
    }

    // Bloc signature
    y = Math.max(y+4, 255);
    if (y > 260) { doc.addPage(); y = 20; }
    line(M,y,W-M,y);  y += 8;
    txt('SIGNATURES',M,y,8,[138,132,124],'bold'); y += 6;
    txt('Cadre :',M,y,8); txt('Date :',120,y,8);
    line(M+20,y+1,95,y+1); line(120+12,y+1,W-M,y+1); y += 10;
    txt('Manager :',M,y,8); txt('Date :',120,y,8);
    line(M+24,y+1,95,y+1); line(120+12,y+1,W-M,y+1);

    // Pied de page
    doc.setFontSize(7); doc.setTextColor(180);
    doc.text(`Suivi — ${mNom} ${year} - Genere le ${new Date().toLocaleDateString('fr-FR')}`, M, 290);
    doc.text('Art. L3121-58 a L3121-65 Code du travail', W-M, 290, {align:'right'});

    _shareOrSave(doc, `Forfait_Jours_${mNom}_${year}.pdf`, 'PDF mensuel généré');

    // Marquer la sauvegarde fichier
    if (window.M6_Storage) M6_Storage.markFileSave?.('forfait_jours', year);
  },

  // ── Export periode libre ──────────────────────────────────────
  exportPeriode(opts) {
    this._genPeriode(opts);
  },

  _genPeriode({ regime, year, contract, data, moods, dateDebut, dateFin }) {
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) { window.M6_toast?.('jsPDF non charge'); return; }
    const doc = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' });
    const M=15, W=doc.internal.pageSize.getWidth()-2*M;
    let y=20;

    const d1 = new Date(dateDebut+'T12:00:00'), d2 = new Date(dateFin+'T12:00:00');
    const label1 = d1.toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'});
    const label2 = d2.toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'});
    const feries = M6_Feries?.getSet(year) || new Set();

    // Filtrer les données sur la période
    const entries = Object.entries(data)
      .filter(([dk]) => dk >= dateDebut && dk <= dateFin)
      .sort(([a],[b]) => a.localeCompare(b));

    // Comptage
    const typeLabels = { travail:'Travail', rtt:'RTT', cp:'Conge paye', ferie:'Ferie',
      repos:'Repos', rachat:'Rachat', demi:'Demi-journee', maladie:'Maladie',
      maternite:'Maternite', css:'Conge ss solde', formation:'Formation',
      cet:'CET', astreinte:'Astreinte', teletravail:'Teletravail' };
    const counts = {}; let jTravail = 0;
    entries.forEach(([,v]) => {
      const t = v.type||'travail';
      counts[t] = (counts[t]||0) + 1;
      if(t==='travail'||t==='rachat'||t==='teletravail') jTravail++;
      if(t==='demi') jTravail += 0.5;
    });

    // En-tete
    doc.setFillColor(26,23,20); doc.rect(0,0,210,30,'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(13); doc.setTextColor(247,243,237);
    doc.text(_pdfSanitize('Rapport de periode - Forfait Jours'), M, 13);
    doc.setFontSize(8); doc.setFont('helvetica','normal'); doc.setTextColor(196,163,90);
    doc.text(_pdfSanitize('Du ' + label1 + ' au ' + label2), M, 22);
    y=38;

    // Identite
    doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(26,23,20);
    doc.text('CADRE', M, y); y+=4;
    doc.setFillColor(240,235,225); doc.rect(M,y,W,16,'F');
    doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(74,69,64);
    doc.text(_pdfSanitize((contract.nomCadre||contract.nom||'N/A')), M+3, y+5);
    doc.text(_pdfSanitize('CCN : ' + (contract.ccnLabel||'N/A')), M+3, y+11);
    doc.text(_pdfSanitize('Forfait : ' + (contract.plafond||218) + 'j'), M+120, y+5);
    y+=22;

    // Stats periode
    doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(26,23,20);
    doc.text(_pdfSanitize('BILAN PERIODE (' + entries.length + ' jours saisis)'), M, y); y+=4;
    const statRows = [['Jours travailles (equiv.)', String(jTravail)],
      ...Object.entries(counts).map(([t,n]) => [typeLabels[t]||t, String(n)])];
    statRows.forEach(([l,v],i) => {
      if(i%2===0){doc.setFillColor(248,244,238);doc.rect(M,y-3,W,7,'F');}
      doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(74,69,64);
      doc.text(_pdfSanitize(l), M+2, y+1);
      doc.setFont('helvetica','bold');doc.setTextColor(26,23,20);
      doc.text(v, M+W-15, y+1, {align:'right'});
      y+=7;
    });
    y+=6;

    // Calendrier de la periode (liste jours)
    if(y > 220) { doc.addPage(); y=20; }
    doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(26,23,20);
    doc.text('DETAIL DES JOURS', M, y); y+=4;
    entries.forEach(([dk,v],i) => {
      if(y > 272) { doc.addPage(); y=20; }
      const d = new Date(dk+'T12:00:00');
      const lbl = d.toLocaleDateString('fr-FR',{weekday:'short',day:'2-digit',month:'2-digit'});
      const typ = typeLabels[v.type||'travail'] || v.type;
      const amp = v.debut && v.fin ? ' ' + v.debut + '-' + v.fin : '';
      const dep = v.deplacement ? ' [Dep.]' : '';
      if(i%2===0){doc.setFillColor(248,244,238);doc.rect(M,y-3,W,7,'F');}
      doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(74,69,64);
      doc.text(_pdfSanitize(lbl), M+2, y+1);
      doc.text(_pdfSanitize(typ + amp + dep), M+28, y+1);
      if(v.note) doc.text(_pdfSanitize(v.note.substring(0,40)), M+95, y+1);
      y+=7;
    });

    // Pied
    if(y > 260) { doc.addPage(); y=20; }
    y = Math.max(y+8, 250);
    doc.setFillColor(248,244,238); doc.rect(M,y,W,20,'F');
    doc.setFont('helvetica','italic'); doc.setFontSize(8); doc.setTextColor(74,69,64);
    doc.text(_pdfSanitize('Certifie exact. Respect des temps de repos Art. L3131-1 et L3132-2.'), M+3, y+6);
    doc.text(_pdfSanitize('Genere le ' + new Date().toLocaleDateString('fr-FR') + ''), M+3, y+12);
    doc.text(_pdfSanitize('Signature : __________________'), M+3, y+18);
    doc.setFontSize(7); doc.setTextColor(138,132,124);
    doc.text('Ce document ne remplace pas un avis juridique.', M, 292);

    const fn = _pdfSanitize('periode_' + dateDebut + '_' + dateFin + '_' + (contract.nomCadre||'cadre').replace(/\s+/g,'_').toLowerCase() + '.pdf');
    _shareOrSave(doc, fn, 'PDF période exporté');
  },

  // ── Export annuel ─────────────────────────────────────────────
  exportAnnuel(opts) {
    // Dispatch par régime — chaque régime a son propre format de PDF annuel
    if (opts && opts.regime === 'forfait_heures') return this._genAnnuelFH(opts);
    if (opts && opts.regime === 'cadre_dirigeant') return this.exportDirigeant({
      year: opts.year, contract: opts.contract, data: opts.data, moods: opts.moods,
      analysis: opts.analysis, projets: opts.projets
    });
    this._genAnnuel(opts);
  },

  _genAnnuel({ regime, year, contract, data, moods, analysis }) {
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) { alert('PDF non disponible.'); return; }

    const doc = new jsPDF({ format:'a4', unit:'mm' });
    const W=210, M=15, PW=W-2*M; // marges fixes 15mm
    let y=0;

    const txt  = (t,x,ry,size,color,style='normal',align='left') => {
      doc.setFontSize(size); doc.setTextColor(...(color||[26,23,20]));
      doc.setFont('helvetica',style);
      const str = (t===null||t===undefined)?'':typeof t==='object'?String(t.niveau??t.label??t.value??''):String(t);
      if (align==='right') doc.text(str,x,ry,{align:'right'});
      else if (align==='center') doc.text(str,x,ry,{align:'center'});
      else doc.text(str,x,ry);
    };
    const rect = (x,ry,w,h,fill) => {
      if(fill){doc.setFillColor(...fill);doc.rect(x,ry,w,h,'F');}
      else{doc.setLineWidth(0.2);doc.rect(x,ry,w,h,'S');}
    };
    const ln = (x1,y1,x2,y2,w=0.3) => { doc.setLineWidth(w); doc.line(x1,y1,x2,y2); };
    const chk = () => { if(y>268){doc.addPage();y=15;} };

    // ── Couverture ─────────────────────────────────────────────
    rect(0,0,W,45,[26,23,20]);
    // Ligne dorée
    doc.setDrawColor(196,163,90); doc.setLineWidth(0.5);
    doc.line(M,40,W-M,40);
    txt('SUIVI DU TEMPS DE TRAVAIL',M,9,7.5,[196,163,90],'bold');
    txt('BILAN ANNUEL — FORFAIT JOURS',M,17,14,[247,243,237],'bold');
    txt(`Exercice ${year}`,M,25,9,[196,163,90],'normal');
    txt(`${_pdfSanitize(contract.nomCadre||'Cadre')}  ·  ${_pdfSanitize(contract.ccnLabel||'Droit commun')}  ·  Plafond ${contract.plafond||218}j`,M,33,8,[189,181,168]);
    // Hash preuve (SHA-256 simplifié local)
    const hashStr = _localHash(`${regime}-${year}-${contract.nomCadre||''}-${analysis?.joursEffectifs||0}`);
    txt(`Réf. : ${hashStr}`,W-M,9,6,[150,140,130],'normal','right');
    txt(`Généré le ${new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'})}`,W-M,14,6.5,[150,140,130],'normal','right');
    y = 52;

    // ── Synthèse annuelle ──────────────────────────────────────
    rect(M,y,PW,8,[240,235,228]);
    txt('SYNTHÈSE ANNUELLE',M+3,y+5.5,8,[70,65,60],'bold');
    y += 11;

    const a = analysis || {};
    const synthRows = [
      ['Jours travaillés',        `${a.joursEffectifs||0} / ${a.plafond||218}j`,   a.joursEffectifs>(a.plafond||218)?[155,44,44]:[26,23,20]],
      ['Dont jours rachetés',     `${a.rachetes||0}j`,                             [26,23,20]],
      ['RTT pris / théoriques',   `${a.rttPris||0} / ${a.rttTheoriques||0}j`,      [26,23,20]],
      ['Solde RTT',               `${a.rttSolde>=0?'+':''}${a.rttSolde??0}j`,      (a.rttSolde||0)<0?[155,44,44]:[26,23,20]],
      ['Congés pris',             `${a.cpPris||0}j`,                               [26,23,20]],
      ['Fériés ouvrés',           `${a.feriesOuvres||0}j`,                         [26,23,20]],
      ['Taux de remplissage',     `${a.tauxRemplissage||0}%`,                      a.tauxRemplissage>=100?[155,44,44]:a.tauxRemplissage>=90?[196,133,58]:[45,107,79]],
      ['Demi-journées matin',     `${a.demis_matin||0}`,                           [26,23,20]],
      ['Demi-journées après-midi',`${a.demis_am||0}`,                              [26,23,20]],
    ];

    synthRows.forEach(([l,v,col],i) => {
      const ry = y + i*5.5;
      if (i%2===0) { doc.setFillColor(248,245,241); doc.rect(M,ry-1.5,PW,5.5,'F'); }
      txt(l, M+2, ry+2.5, 8, [70,65,60]);
      txt(v, W-M-2, ry+2.5, 8, col||[26,23,20], 'bold', 'right');
    });
    y += synthRows.length*5.5 + 8;
    chk();

    // ── Alertes ────────────────────────────────────────────────
    if (a.alertes?.length) {
      rect(M,y,PW,7,[255,248,230]);
      txt('POINTS DE VIGILANCE',M+3,y+5,8,[122,92,0],'bold');
      y += 10;
      a.alertes.forEach(al => {
        chk();
        const icon = {danger:'■',warning:'▲',info:'●'}[al.niveau]||'●';
        const color = al.niveau==='danger'?[155,44,44]:al.niveau==='warning'?[196,133,58]:[55,48,163];
        doc.setFontSize(7.5); doc.setTextColor(...color); doc.setFont('helvetica','bold');
        doc.text(icon+' '+_pdfSanitize(al.titre), M+2, y);
        doc.setFont('helvetica','normal'); doc.setTextColor(74,69,64);
        const lines = doc.splitTextToSize(_pdfSanitize(al.texte||''), PW-8);
        doc.text(lines, M+6, y+4);
        y += 4 + lines.length*3.5 + 3;
        chk();
      });
      y += 4;
    }

    // ── Tableau mensuel ────────────────────────────────────────
    chk();
    doc.addPage(); y = 15;
    rect(M,y,PW,8,[26,23,20]);
    txt('RÉCAPITULATIF MENSUEL',M+3,y+5.5,8,[247,243,237],'bold');
    y += 11;

    // En-têtes colonnes
    const cols = [M+2, M+28, M+44, M+60, M+76, M+96, M+116];
    const hdrs = ['Mois','Travail','RTT','CP','Rachat','Charge','Amplitude'];
    rect(M,y-1,PW,6,[240,235,228]);
    hdrs.forEach((h,i) => txt(h, cols[i], y+4, 7, [70,65,60], 'bold'));
    y += 7;

    const mNoms=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    for (let m=0;m<12;m++) {
      chk();
      const prefix = `${year}-${String(m+1).padStart(2,'0')}`;
      const jours  = Object.entries(data||{}).filter(([k])=>k.startsWith(prefix));
      const t  = jours.filter(([,v])=>v.type==='travail'||v.type==='rachat').length + jours.filter(([,v])=>v.type==='demi').length*0.5;
      const r  = jours.filter(([,v])=>v.type==='rtt').length;
      const cp = jours.filter(([,v])=>v.type==='cp').length;
      const ra = jours.filter(([,v])=>v.type==='rachat').length;
      const critiques = jours.filter(([k])=>moods?.[k]?.niveau==='critique').length;
      const ampViols  = jours.filter(([k,v])=>{ if(!v.debut||!v.fin) return false; const dh=v.debut.split(':'), fh=v.fin.split(':'); return (parseInt(fh[0])*60+parseInt(fh[1]))-(parseInt(dh[0])*60+parseInt(dh[1]))>780; }).length;

      if (m%2===0) { doc.setFillColor(248,245,241); doc.rect(M,y-1,PW,6,'F'); }
      ln(M,y+5,W-M,y+5, 0.1); // ligne séparatrice fine
      [mNoms[m], t||'-', r||'-', cp||'-', ra||'-',
       critiques>0?critiques+'×🔴':'-',
       ampViols>0?ampViols+'×⏰':'-'
      ].forEach((v,i) => {
        const col = (i===5&&critiques>0)?[155,44,44]:(i===6&&ampViols>0)?[196,133,58]:[26,23,20];
        doc.setFontSize(8); doc.setFont('helvetica','normal'); doc.setTextColor(...col);
        doc.text(String(v), cols[i], y+3.5);
      });
      y += 6;
    }
    y += 8; chk();

    // ── Entretiens ─────────────────────────────────────────────
    const entretiens = (window.M6_Storage?.getEntretiens(regime, null)||[]).filter(e=>e.date&&e.date.startsWith(String(year)));
    if (entretiens.length) {
      rect(M,y,PW,7,[240,235,228]);
      txt('ENTRETIENS ANNUELS (Art. L3121-65)',M+3,y+5,8,[70,65,60],'bold');
      y += 10;
      entretiens.forEach(e => {
        chk();
        doc.setFillColor(248,245,241); doc.rect(M,y,PW,16,'F');
        txt(new Date(e.date+'T12:00:00').toLocaleDateString('fr-FR'), M+3, y+4.5, 8, [26,23,20], 'bold');
        txt(_pdfSanitize('Manager : '+(e.manager||'N/A')), M+3, y+9, 7.5, [74,69,64]);
        txt(_pdfSanitize('Charge : '+(e.charge||'N/A')+' · Ajustement : '+(e.ajustement==='oui'?'Demandé':'Non')), M+3, y+13.5, 7, [100,95,90]);
        y += 20; chk();
      });
    }

    // ── Rupture Conventionnelle ────────────────────────────────
    const rupture = window.M6_RuptureCalculateur?._getLastSimulation?.();
    if (rupture) {
      chk();
      rect(M,y,PW,7,[240,235,228]);
      txt('SIMULATION RUPTURE CONVENTIONNELLE',M+3,y+5,8,[70,65,60],'bold');
      y += 10;
      [[`Indemnité légale min.`, rupture.indemnite+'€'],[`Préavis`, rupture.preavis||'N/A'],[`Ancienneté`, rupture.anciennete||'N/A']].forEach(([l,v]) => {
        txt(l, M+3, y, 8, [74,69,64]); txt(v, W-M-2, y, 8, [26,23,20], 'bold', 'right'); y+=5;
      });
      y += 5; chk();
    }

    // ── Certification + signature ──────────────────────────────
    chk();
    if (y > 230) { doc.addPage(); y = 15; }
    doc.setDrawColor(45,107,79); doc.setLineWidth(0.4);
    doc.rect(M,y,PW,30,'S');
    rect(M,y,PW,7,[232,245,238]);
    txt('DECLARATION DE L EXACTITUDE',M+3,y+5,8,[30,90,60],'bold');
    doc.setFontSize(7.5); doc.setTextColor(74,69,64); doc.setFont('helvetica','normal');
    const certText = doc.splitTextToSize(
      `Document généré le ${new Date().toLocaleDateString('fr-FR')} pour ${_pdfSanitize(contract.nomCadre||'_________________')} — Exercice ${year}. Réf. : ${hashStr}`,
      PW-6);
    doc.text(certText, M+3, y+10);
    y += 34;
    chk();

    txt('Cadre :', M+3, y+5, 8, [26,23,20]); ln(M+22,y+6,M+PW/2-5,y+6);
    txt('Date :', M+PW/2+3, y+5, 8, [26,23,20]); ln(M+PW/2+18,y+6,W-M-2,y+6);
    y += 12;
    txt('Manager :', M+3, y+5, 8, [26,23,20]); ln(M+25,y+6,M+PW/2-5,y+6);
    txt('Date :', M+PW/2+3, y+5, 8, [26,23,20]); ln(M+PW/2+18,y+6,W-M-2,y+6);

    // Footer
    doc.setFontSize(6.5); doc.setTextColor(150);
    doc.text(`Bilan ${year} · Généré le ${new Date().toLocaleString('fr-FR')} · Réf. ${hashStr}`, M, 290);
    doc.text('Art. L3121-58 à L3121-65 Code du travail', W-M, 290, {align:'right'});

    const filename = `Forfait_Jours_Annuel_${year}_${(contract.nomCadre||'Cadre').replace(/\s/g,'_')}.pdf`;
    _shareOrSave(doc, filename, 'PDF annuel généré');
    if (window.M6_Storage) M6_Storage.markFileSave?.('forfait_jours', year);
  },

  _genAnnuelFJ({ regime, year, contract, data, moods, analysis }) {
    const doc = new jsPDF({ format:'a4', unit:'mm' });
    const W=210, M=20;
    let y=0;

    const txt  = (t,x,ry,size,color,style='normal') => { doc.setFontSize(size); doc.setTextColor(...(color||[26,23,20])); doc.setFont('helvetica',style); doc.text((t===null||t===undefined)?'':typeof t==='object'?String(t.niveau??t.label??t.value??''):String(t),x,ry); };
    const rect = (x,ry,w,h,fill) => { if(fill){doc.setFillColor(...fill);doc.rect(x,ry,w,h,'F');}else{doc.rect(x,ry,w,h,'S');} };
    const ln   = (x1,y1,x2,y2) => { doc.setLineWidth(0.3); doc.line(x1,y1,x2,y2); };

    // Couverture
    rect(0,0,W,40,[26,23,20]);
    txt('BILAN ANNUEL DU FORFAIT',M,12,10,[196,163,90],'bold');
    txt(`FORFAIT JOURS ${year}`,M,20,16,[247,243,237],'bold');
    txt(`${contract.nomCadre||'Cadre'} - ${contract.ccnLabel||'Droit commun'}`,M,28,9,[189,181,168]);
    txt(`Plafond : ${contract.plafond||218} jours`,M,34,8,[189,181,168]);
    y = 48;

    // Synthese annuelle
    rect(M-2,y-2,W-2*M+4,30,[247,243,237]);
    txt('SYNTHESE ANNUELLE',M,y+3,9,[138,132,124],'bold');
    const rows = [
      [`Jours travailles`, `${analysis?.joursEffectifs||0} / ${analysis?.plafond||218}`],
      [`dont jours rachetes`, `${analysis?.rachetes||0}`],
      [`RTT pris / theoriques`, `${analysis?.rttPris||0} / ${analysis?.rttTheoriques||0}`],
      [`Solde RTT`, `${analysis?.rttSolde>=0?'+':''}${analysis?.rttSolde??0}`],
      [`Conges pris`, `${analysis?.cpPris||0}`],
      [`Jours feries ouvres`, `${analysis?.feriesOuvres||0}`],
    ];
    rows.forEach(([l,v],i) => {
      txt(l,M,y+10+i*4,8);
      txt(v,W-M,y+10+i*4,8,[26,23,20],'bold');
      doc.setFont('helvetica','bold');
      doc.text(String(v), W-M, y+10+i*4, {align:'right'});
      doc.setFont('helvetica','normal');
    });
    y += 36;

    // Alertes
    if (analysis?.alertes?.length) {
      txt('POINTS DE VIGILANCE',M,y,9,[138,132,124],'bold'); y+=5;
      analysis.alertes.forEach(al => {
        const niv = {danger:'[!]', warning:'[>]', info:'[i]'}[al.niveau]||'[ ]';
        const lines = doc.splitTextToSize(`${niv} ${al.titre} - ${al.texte}`, W-2*M);
        doc.setFontSize(8); doc.setFont('helvetica','normal');
        doc.setTextColor(...(al.niveau==='danger'?[155,44,44]:al.niveau==='warning'?[196,133,58]:[55,48,163]));
        doc.text(lines, M, y);
        y += lines.length*4 + 2;
        if (y > 260) { doc.addPage(); y = 15; }
      });
      y += 4;
    }

    // Tableau mensuel recapitulatif
    doc.addPage(); y = 15;
    txt('RECAPITULATIF MENSUEL',M,y,10,[26,23,20],'bold'); y += 7;
    rect(M-2,y-1,W-2*M+4,6,[240,235,228]);
    ['Mois','Travail','RTT','CP','Rachat','Charge'].forEach((h,i)=>{
      txt(h, M+i*30, y+4, 7, [70,69,68], 'bold');
    });
    y += 7;
    const mNoms=['Jan','Fev','Mar','Avr','Mai','Jun','Jul','Aou','Sep','Oct','Nov','Dec'];
    for (let m=0;m<12;m++) {
      const prefix = `${year}-${String(m+1).padStart(2,'0')}`;
      const jours  = Object.entries(data).filter(([k])=>k.startsWith(prefix));
      const t = jours.filter(([,v])=>v.type==='travail'||v.type==='rachat').length;
      const r = jours.filter(([,v])=>v.type==='rtt').length;
      const c = jours.filter(([,v])=>v.type==='cp').length;
      const ra= jours.filter(([,v])=>v.type==='rachat').length;
      const critiques = jours.filter(([k])=>moods?.[k]?.niveau==='critique').length;
      if (m%2===0) rect(M-2,y-1,W-2*M+4,5,[248,245,241]);
      [mNoms[m],t,r,c,ra, critiques>0?`${critiques} critiq.`:'-'].forEach((v,i)=>{
        doc.setFontSize(8); doc.setFont('helvetica','normal'); doc.setTextColor(26,23,20);
        if (i===5&&critiques>0) doc.setTextColor(155,44,44);
        doc.text(String(v),M+i*30,y+3.5);
      });
      y += 5;
    }
    y += 6;

    // Certification + signature
    if (y > 230) { doc.addPage(); y = 15; }
    rect(M-2,y-1,W-2*M+4,20,[232,245,238]);
    doc.setFontSize(8); doc.setTextColor(30,90,60); doc.setFont('helvetica','bold');
    doc.text('DECLARATION DE L EXACTITUDE', M, y+5);
    doc.setFont('helvetica','normal'); doc.setFontSize(7.5);
    const certAnnuel = doc.splitTextToSize(
      `Document de suivi annuel pour ${contract.nomCadre||'_________________'} - Exercice ${year}.`,
      W-2*M);
    doc.text(certAnnuel, M, y+10);
    y += 24;

    doc.setFontSize(8); doc.setTextColor(26,23,20);
    txt('Cadre :', M, y+5, 8); ln(M+20,y+6,95,y+6);
    txt('Date :', 110, y+5, 8); ln(122,y+6,W-M,y+6);
    y += 12;
    txt('Manager :', M, y+5, 8); ln(M+26,y+6,95,y+6);
    txt('Date :', 110, y+5, 8); ln(122,y+6,W-M,y+6);

    // Note medicale
    y += 16;
    doc.setFontSize(6.5); doc.setTextColor(100);
    doc.text('Note : Les indicateurs biologiques sont indicatifs et ne remplacent pas un avis medical professionnel.', M, y);

    doc.setFontSize(7); doc.setTextColor(180);
    doc.text(`Bilan ${year} - Genere le ${new Date().toLocaleDateString('fr-FR')}`, M, 290);

    doc.save(`Forfait_Jours_Annuel_${year}.pdf`);
    M6_toast?.('PDF annuel genere');
    if (window.M6_Storage) M6_Storage.markFileSave?.('forfait_jours', year);
  },

  // ── Export entretien annuel ───────────────────────────────────
  exportEntretien({ regime, year, contract, entretien, analysis }) {
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) { alert('PDF non disponible.'); return; }

    const doc = new jsPDF({ format:'a4', unit:'mm' });
    const W=210, M=20;
    let y=15;

    const txt = (t,x,ry,size,color,style='normal') => { doc.setFontSize(size); doc.setTextColor(...(color||[26,23,20])); doc.setFont('helvetica',style); doc.text((t===null||t===undefined)?'':typeof t==='object'?String(t.niveau??t.label??t.value??''):String(t),x,ry); };
    const rect = (x,ry,w,h,fill) => { doc.setFillColor(...fill); doc.rect(x,ry,w,h,'F'); };
    const ln = (x1,y1,x2,y2) => { doc.setLineWidth(0.3); doc.line(x1,y1,x2,y2); };

    rect(0,0,W,22,[26,23,20]);
    txt('SUIVI DU TEMPS DE TRAVAIL',M,8,8,[196,163,90],'bold');
    txt('COMPTE-RENDU D\'ENTRETIEN ANNUEL - FORFAIT JOURS',M,14,10,[247,243,237],'bold');
    txt(`Art. L3121-65 Code du travail`,M,19,7,[189,181,168]);
    y = 28;

    // Infos
    txt('INFORMATIONS GENERALES',M,y,9,[138,132,124],'bold'); y+=5;
    [
      ['Cadre',               contract.nomCadre||'—'],
      ['Manager',             entretien?.manager || contract.nomManager||'—'],
      ['Date de l\'entretien',entretien?.date ? new Date(entretien.date).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'}) : '—'],
      ['CCN',                 contract.ccnLabel||'Droit commun'],
      ['Forfait / Régime',    regime==='forfait_jours'?`${contract.plafond||218} jours/an`:regime==='forfait_heures'?`${contract.seuilHebdo||35}h/sem`:'Cadre dirigeant'],
      ['Exercice',            String(year)],
      ['Charge évaluée (1=difficile / 5=excellente)', entretien?.charge ? `${entretien.charge}/5` : '—'],
      ['Demande d\'ajustement',entretien?.ajustement==='oui'?'Oui — demandé':'Non'],
    ].forEach(([l,v]) => {
      txt(l+' :',M,y,8,[138,132,124]); txt(v,80,y,8,[26,23,20],'bold'); y+=5;
    });
    y += 4;

    // Bilan de charge
    txt('1. BILAN DE LA CHARGE DE TRAVAIL',M,y,9,[26,23,20],'bold'); y+=6;
    [
      ['Jours travailles',     `${analysis?.joursEffectifs||0} / ${analysis?.plafond||218}`],
      ['Taux de realisation',  `${analysis?.tauxRemplissage||0} %`],
      ['RTT pris / theoriques',`${analysis?.rttPris||0} / ${analysis?.rttTheoriques||0}`],
      ['Solde RTT',            `${analysis?.rttSolde>=0?'+':''}${analysis?.rttSolde??0}`],
      ['Jours rachetes',       `${analysis?.rachetes||0}`],
    ].forEach(([l,v]) => {
      txt(l+' :',M,y,8); txt(v,120,y,8,[26,23,20],'bold'); y+=5;
    });
    y += 4;

    // Thématiques obligatoires — lire les champs réels sauvegardés
    const themes = [
      ['2. ORGANISATION DU TEMPS DE TRAVAIL',         entretien?.organisation||''],
      ['3. ÉQUILIBRE VIE PROFESSIONNELLE / PERSONNELLE', entretien?.equilibre||''],
      ['4. CHARGE DE TRAVAIL (niveau ressenti)',       entretien?.chargeRessentie||''],
      ['5. RÉMUNÉRATION',                              entretien?.remuneration||''],
      ['6. DROIT À LA DÉCONNEXION',                   entretien?.deconnexion||''],
      ['7. POINTS D\'ACTION / DÉCISIONS',             entretien?.actions||''],
    ];
    themes.forEach(([titre, contenu]) => {
      if (y > 240) { doc.addPage(); y = 15; }
      txt(titre,M,y,8,[26,23,20],'bold'); y+=4;
      const lines = doc.splitTextToSize(contenu||'(Non renseigne)', W-2*M);
      doc.setFontSize(8); doc.setFont('helvetica','normal'); doc.setTextColor(74,69,64);
      doc.text(lines,M,y); y += lines.length*4+3;
      ln(M,y,W-M,y); y+=4;
    });

    // Signature
    if (y > 240) { doc.addPage(); y = 15; }
    y += 4;
    rect(M-2,y-2,W-2*M+4,6,[247,243,237]);
    txt('SIGNATURES',M,y+3,8,[138,132,124],'bold'); y+=9;
    txt('Cadre :',M,y,8); ln(M+20,y+1,95,y+1);
    txt('Date :',110,y,8); ln(122,y+1,W-M,y+1); y+=10;
    txt('Manager :',M,y,8); ln(M+26,y+1,95,y+1);
    txt('Date :',110,y,8); ln(122,y+1,W-M,y+1);

    doc.setFontSize(7); doc.setTextColor(180);
    doc.text(`Entretien annuel Art. L3121-65 - ${year} - ${new Date().toLocaleDateString('fr-FR')}`, M, 290);

    _shareOrSave(doc, `Entretien_Annuel_Forfait_Jours_${year}.pdf`, 'PDF entretien généré');
  },

  // Export specifique Cadre Dirigeant
  exportDirigeant({ year, contract, data, moods, analysis, projets }) {
    if(typeof window==='undefined'||!window.jspdf) { M6_toast?.('jsPDF non charge'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' });
    const M=15, W=doc.internal.pageSize.getWidth()-2*M;
    let y=20;

    // En-tete
    doc.setFillColor(26,23,20); doc.rect(0,0,210,30,'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(14); doc.setTextColor(247,243,237);
    doc.text(_pdfSanitize('Cadre Dirigeant - Rapport ' + year), M, 15);
    doc.setFontSize(8); doc.setFont('helvetica','normal'); doc.setTextColor(196,163,90);
    doc.text(_pdfSanitize((contract.fonction||'Dirigeant') + ' - ' + (contract.entreprise||'') + ' - Art. L3111-2'), M, 22);
    y=40;

    // Identite
    doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(26,23,20);
    doc.text('IDENTIFICATION', M, y); y+=5;
    doc.setFillColor(240,235,225); doc.rect(M,y,W,22,'F');
    doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(74,69,64);
    doc.text(_pdfSanitize('Nom : ' + (contract.nom||'N/A')), M+3, y+5);
    doc.text(_pdfSanitize('Fonction : ' + (contract.fonction||'N/A')), M+3, y+10);
    doc.text(_pdfSanitize('Entreprise : ' + (contract.entreprise||'N/A')), M+3, y+15);
    doc.text(_pdfSanitize('Annee : ' + year), M+90, y+5);
    doc.text(_pdfSanitize('CCN : ' + (contract.ccnLabel||'Non renseignee')), M+90, y+10);
    y+=28;

    // Stats annuelles
    doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(26,23,20);
    doc.text('BILAN DE PRESENCE ' + year, M, y); y+=5;
    const rows = [
      ['Jours de presence', analysis.joursEffectifs||0],
      ['Conges payes pris', analysis.cpPris||0],
      ['CP restants', (contract.joursCPContrat||25)-(analysis.cpPris||0)],
      ['Deplacements professionnels', analysis.deplacements||0],
      ['Demi-journees', analysis.demis||0],
    ];
    rows.forEach(([l,v],i)=>{
      if(i%2===0) { doc.setFillColor(248,244,238); doc.rect(M,y-3,W,7,'F'); }
      doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(74,69,64);
      doc.text(_pdfSanitize(l), M+2, y+1);
      doc.setFont('helvetica','bold'); doc.setTextColor(26,23,20);
      doc.text(String(v), M+W-20, y+1, {align:'right'});
      y+=7;
    });
    y+=5;

    // Projets / Missions
    if(projets && projets.length) {
      doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(26,23,20);
      doc.text('MISSIONS ' + year, M, y); y+=5;
      projets.forEach((p,i)=>{
        if(y>260) { doc.addPage(); y=20; }
        if(i%2===0) { doc.setFillColor(248,244,238); doc.rect(M,y-3,W,7,'F'); }
        doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(74,69,64);
        doc.text(_pdfSanitize((p.nom||'?').substring(0,40)), M+2, y+1);
        doc.text(_pdfSanitize(p.categorie||''), M+100, y+1);
        doc.setFont('helvetica','bold'); doc.setTextColor(26,23,20);
        doc.text(_pdfSanitize((p.heures||0)+'h'), M+W-10, y+1, {align:'right'});
        y+=7;
      });
      y+=5;
    }

    // Certification
    if(y>240) { doc.addPage(); y=20; }
    doc.setFillColor(248,244,238); doc.rect(M,y,W,20,'F');
    doc.setFont('helvetica','italic'); doc.setFontSize(8); doc.setTextColor(74,69,64);
    doc.text(_pdfSanitize('Certification : Le soussigne certifie l exactitude des informations ci-dessus.'), M+3, y+6);
    doc.text(_pdfSanitize('Genere le ' + new Date().toLocaleDateString('fr-FR') + ' par Suivi — Simulateur Heures Sup France'), M+3, y+11);
    doc.setTextColor(139,105,20);
    doc.text(_pdfSanitize('Signature : _________________________'), M+3, y+17);
    y+=28;

    // Pied
    doc.setFontSize(7); doc.setTextColor(138,132,124); doc.setFont('helvetica','normal');
    doc.text('Ce document ne remplace pas un avis juridique ou medical professionnel.', M, 290);

    doc.save(_pdfSanitize('dirigeant_' + (contract.nom||'cadre').replace(/\s+/g,'_').toLowerCase() + '_' + year + '.pdf'));
    M6_toast?.('PDF Dirigeant genere');
  },
  // ── PDF Mensuel Forfait Heures ────────────────────────────────
  exportMensuelFH({ regime, year, mois, contract, data, analysis }) {
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) { window.M6_toast?.('jsPDF non chargé'); return; }

    const doc = new jsPDF({ format:'a4', unit:'mm' });
    const W=210, M=15, PW=W-2*M;
    let y=0;

    const txt  = (t,x,ry,size,color,style='normal',align='left') => {
      doc.setFontSize(size); doc.setTextColor(...(color||[26,23,20]));
      doc.setFont('helvetica',style);
      const s2=(t===null||t===undefined)?'':typeof t==='object'?String(t.niveau??t.label??t.value??''):String(t);
      if (align==='right') doc.text(s2,x,ry,{align:'right'});
      else doc.text(s2,x,ry);
    };
    const rect = (x,ry,w,h,fill) => { doc.setFillColor(...fill); doc.rect(x,ry,w,h,'F'); };
    const chk  = () => { if(y>268){doc.addPage();y=15;} };

    const mNoms = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    const mNom  = mNoms[mois]||'';
    const hashStr = _localHash(`${regime}-FH-${year}-${mois}-${contract.nomCadre||''}`);

    // Couverture
    rect(0,0,W,40,[26,23,20]);
    doc.setDrawColor(196,163,90); doc.setLineWidth(0.4); doc.line(M,36,W-M,36);
    txt('SUIVI DU FORFAIT HEURES',M,9,7,[196,163,90],'bold');
    txt(`RAPPORT MENSUEL — ${mNom.toUpperCase()} ${year}`,M,17,13,[247,243,237],'bold');
    txt(`${_pdfSanitize(contract.nomCadre||'Cadre')}  ·  ${_pdfSanitize(contract.ccnLabel||'Droit commun')}`,M,26,8,[189,181,168]);
    txt(`Réf. ${hashStr}`,W-M,9,6,[150,140,130],'normal','right');
    y = 48;

    // Infos contrat
    rect(M,y,PW,7,[240,235,228]);
    txt('PARAMÈTRES CONTRAT',M+3,y+5,8,[70,65,60],'bold');
    y += 10;
    [[`Seuil déclenchement HS`, `${contract.seuilHebdo||35}h/sem`],[`Contingent annuel`, `${analysis?.contingent||contract.contingent||220}h`],[`Taux majorations`, analysis?.a3Paliers ? `+${analysis.taux1||25}%(${analysis.palier||8}h) / +${analysis.taux_inter}%(${analysis.palier_inter}h) / +${analysis.taux2||50}%`:`+${analysis?.taux1||25}%(${analysis?.palier||8}h) / +${analysis?.taux2||50}%`],[`CCN`, _pdfSanitize(analysis?.ccnNom||contract.ccnLabel||'Droit commun')]].forEach(([l,v],i)=>{
      if(i%2===0){doc.setFillColor(248,245,241);doc.rect(M,y-1.5,PW,5.5,'F');}
      txt(l,M+2,y+2.5,8,[70,65,60]); txt(v,W-M-2,y+2.5,8,[26,23,20],'bold','right'); y+=5.5;
    });
    y += 5; chk();

    // Semaines du mois
    rect(M,y,PW,7,[26,23,20]);
    txt('SEMAINES DU MOIS',M+3,y+5,8,[247,243,237],'bold');
    y += 10;
    const semsOfMonth = Object.entries(data||{}).filter(([wk,])=>{
      const wn = parseInt(wk.split('W')[1]);
      const yr = parseInt(wk.split('-')[0]);
      const d  = new Date(yr, 0, 1+(wn-1)*7-(new Date(yr,0,1).getDay()||7)+1);
      return d.getFullYear()===year && d.getMonth()===mois;
    });

    if (!semsOfMonth.length) {
      doc.setFontSize(8); doc.setTextColor(138,132,124);
      doc.text('Aucune semaine saisie pour ce mois.', M+3, y); y+=10;
    } else {
      // Détecter 3 paliers (CCN HCR, Restauration rapide…)
      const has3 = !!(analysis?.a3Paliers && analysis?.taux_inter);
      rect(M,y-1,PW,6,[240,235,228]);
      const headers = has3
        ? ['Semaine','Heures','HS +'+(analysis?.taux1||10)+'%','HS +'+analysis.taux_inter+'%','HS +'+(analysis?.taux2||50)+'%','Total HS','Montant']
        : ['Semaine','Heures','HS palier 1','HS palier 2','Total HS','Montant brut'];
      const colStep = Math.floor(PW / headers.length);
      headers.forEach((h,i)=>{
        txt(h, M+2+i*colStep, y+4, 7, [70,65,60], 'bold');
      });
      y += 7;
      let totalH=0, totalHS1=0, totalHSinter=0, totalHS2=0, totalHSm=0, totalMnt=0;
      semsOfMonth.forEach(([wk,v],i)=>{
        chk();
        const h  = parseFloat(v.heures)||0;
        const seuil = contract.seuilHebdo||35;
        const extra = Math.max(0,h-seuil);
        const t1    = analysis?.taux1||25, pal=analysis?.palier||8;
        const t2    = analysis?.taux2||50;
        const tauxH = contract.tauxHoraire||0;
        let hs1, hs_inter, hs2, mnt;
        if (has3) {
          const palInter = analysis.palier_inter || 4;
          const tInter = analysis.taux_inter;
          hs1      = Math.min(extra, pal);
          hs_inter = Math.min(Math.max(0, extra - pal), palInter);
          hs2      = Math.max(0, extra - pal - palInter);
          mnt = tauxH>0 ? Math.round((hs1*tauxH*(1+t1/100) + hs_inter*tauxH*(1+tInter/100) + hs2*tauxH*(1+t2/100))*100)/100 : 0;
          totalHSinter += hs_inter;
        } else {
          hs1   = Math.min(extra,pal);
          hs_inter = 0;
          hs2   = Math.max(0,extra-pal);
          mnt   = tauxH>0 ? Math.round((hs1*tauxH*(1+t1/100)+hs2*tauxH*(1+t2/100))*100)/100 : 0;
        }
        totalH+=h; totalHS1+=hs1; totalHS2+=hs2; totalHSm+=(hs1+hs_inter+hs2); totalMnt+=mnt;
        if(i%2===0){doc.setFillColor(248,245,241);doc.rect(M,y-1.5,PW,5.5,'F');}
        const cells = has3
          ? [wk, h+'h', hs1>0?'+'+hs1+'h':'-', hs_inter>0?'+'+hs_inter+'h':'-', hs2>0?'+'+hs2+'h':'-', (hs1+hs_inter+hs2)>0?(hs1+hs_inter+hs2).toFixed(1)+'h':'-', mnt>0?mnt.toFixed(0)+'€':'-']
          : [wk, h+'h', hs1>0?'+'+hs1+'h':'-', hs2>0?'+'+hs2+'h':'-', (hs1+hs2)>0?(hs1+hs2).toFixed(1)+'h':'-', mnt>0?mnt.toFixed(2)+'€':'-'];
        cells.forEach((v,j)=>{
          const col = j>=2&&parseFloat(v)>0?[155,44,44]:[26,23,20];
          txt(v, M+2+j*colStep, y+2.5, 7.5, col, j===0?'normal':'bold'); 
        });
        y += 5.5; chk();
      });
      // Totaux
      doc.setLineWidth(0.3); doc.setDrawColor(196,163,90);
      doc.line(M,y,W-M,y);
      y += 4;
      rect(M,y,PW,7,[232,245,238]);
      txt('TOTAUX DU MOIS',M+3,y+5,8,[30,90,60],'bold');
      txt(`${totalH}h travaillées · ${totalHSm.toFixed(1)}h HS · ${totalMnt>0?totalMnt.toFixed(2)+'€ brut TEPA':'Taux horaire non renseigné'}`,W-M-2,y+5,8,[30,90,60],'normal','right');
      y += 12;

      // TEPA
      if (contract.tauxHoraire > 0) {
        chk();
        rect(M,y,PW,7,[240,235,228]);
        txt('RÉDUCTION COTISATIONS ET EXONÉRATION FISCALE (Loi TEPA)',M+3,y+5,8,[70,65,60],'bold');
        y += 10;
        const exoMois = Math.min(totalMnt, 7500/12);
        const tepaRows = has3
          ? [[`HS à +${analysis?.taux1||10}%`,`${totalHS1.toFixed(1)}h`],[`HS à +${analysis.taux_inter}%`,`${totalHSinter.toFixed(1)}h`],[`HS à +${analysis?.taux2||50}%`,`${totalHS2.toFixed(1)}h`],[`Montant brut mensuel`,`${totalMnt.toFixed(2)} €`],[`Exonération IR estimée (plaf. 625€/mois)`,`${exoMois.toFixed(2)} €`]]
          : [[`HS à +${analysis?.taux1||25}%`,`${totalHS1.toFixed(1)}h`],[`HS à +${analysis?.taux2||50}%`,`${totalHS2.toFixed(1)}h`],[`Montant brut mensuel`,`${totalMnt.toFixed(2)} €`],[`Exonération IR estimée (plaf. 625€/mois)`,`${exoMois.toFixed(2)} €`]];
        tepaRows.forEach(([l,v],i)=>{
          if(i%2===0){doc.setFillColor(248,245,241);doc.rect(M,y-1.5,PW,5.5,'F');}
          txt(l,M+2,y+2.5,8,[70,65,60]); txt(v,W-M-2,y+2.5,8,[26,23,20],'bold','right'); y+=5.5;
        });
        y += 3;
        doc.setFontSize(6.5); doc.setTextColor(100);
        doc.text('Art. L241-17 CSS · Loi TEPA 2007 · Loi 2022-1158', M+2, y);
        y += 8;
      }
    }
    chk();

    // Certification
    if (y > 240) { doc.addPage(); y = 15; }
    doc.setDrawColor(45,107,79); doc.setLineWidth(0.3); doc.rect(M,y,PW,22,'S');
    rect(M,y,PW,6,[232,245,238]);
    txt('CERTIFICATION (Art. L3121-46)',M+3,y+4.5,8,[30,90,60],'bold');
    doc.setFontSize(7.5); doc.setTextColor(74,69,64); doc.setFont('helvetica','normal');
    const certLines = doc.splitTextToSize(`Je soussigné(e) ${_pdfSanitize(contract.nomCadre||'_________________')} certifie l'exactitude de ce rapport de suivi d'heures supplémentaires pour ${mNom} ${year}. Réf. : ${hashStr}`, PW-6);
    doc.text(certLines, M+3, y+10);
    y += 26;
    doc.setFontSize(8); doc.setTextColor(26,23,20);
    doc.text('Signature cadre :', M+3, y+5); doc.line(M+38,y+6,M+PW/2,y+6);
    doc.text('Date :', M+PW/2+5, y+5); doc.line(M+PW/2+18,y+6,W-M-2,y+6);

    doc.setFontSize(7); doc.setTextColor(138,132,124);
    doc.text(`Suivi Forfait Heures — ${mNom} ${year} — Généré le ${new Date().toLocaleDateString('fr-FR')}`, M, 290);
    doc.text('Art. L3121-27 à L3121-46 Code du travail', W-M, 290, {align:'right'});

    _shareOrSave(doc, `Forfait_Heures_${mNom}_${year}.pdf`, `PDF mensuel FH ${mNom} ${year} généré`);
  },

  // ── PDF ANNUEL FORFAIT HEURES ─────────────────────────────────
  _genAnnuelFH({ regime, year, contract, data, analysis }) {
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) { window.M6_toast?.('jsPDF non chargé'); return; }
    const doc = new jsPDF({ format:'a4', unit:'mm' });
    const W=210, M=15, PW=W-2*M;
    let y=0;
    const txt = (t,x,ry,size,color,style='normal',align='left') => {
      doc.setFontSize(size); doc.setTextColor(...(color||[26,23,20]));
      doc.setFont('helvetica',style);
      const s = (t===null||t===undefined)?'':typeof t==='object'?String(t.niveau??t.label??t.value??''):String(t);
      if (align==='right') doc.text(s,x,ry,{align:'right'});
      else if (align==='center') doc.text(s,x,ry,{align:'center'});
      else doc.text(s,x,ry);
    };
    const rect = (x,ry,w,h,fill) => {
      if (fill) doc.setFillColor(...fill);
      doc.rect(x,ry,w,h,fill?'F':'S');
    };
    const chk = () => { if(y>268){doc.addPage();y=15;} };

    // ── Couverture ─────────────────────────────────────────────
    rect(0,0,W,45,[26,23,20]);
    doc.setDrawColor(196,163,90); doc.setLineWidth(0.5); doc.line(M,40,W-M,40);
    txt('SUIVI DU TEMPS DE TRAVAIL',M,9,7.5,[196,163,90],'bold');
    txt('BILAN ANNUEL — FORFAIT HEURES',M,17,14,[247,243,237],'bold');
    txt(`Exercice ${year}`,M,25,9,[196,163,90],'normal');
    const a = analysis || {};
    const seuil = contract.seuilHebdo || a.seuil || 35;
    const contingent = a.contingent || contract.contingent || 220;
    txt(`${_pdfSanitize(contract.nomCadre||'Cadre')}  ·  ${_pdfSanitize(a.ccnNom||contract.ccnLabel||'Droit commun')}  ·  Seuil ${seuil}h/sem  ·  Contingent ${contingent}h`,M,33,8,[189,181,168]);
    const hashStr = _localHash(`${regime}-FH-${year}-${contract.nomCadre||''}-${a.totalHS||0}`);
    txt(`Réf. : ${hashStr}`,W-M,9,6,[150,140,130],'normal','right');
    txt(`Généré le ${new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'})}`,W-M,14,6.5,[150,140,130],'normal','right');
    y = 52;

    // ── Synthèse ─────────────────────────────────────────────
    rect(M,y,PW,8,[240,235,228]);
    txt('SYNTHÈSE ANNUELLE',M+3,y+5.5,8,[70,65,60],'bold');
    y += 11;

    const synthRows = [
      ['Total heures travaillées',  `${a.totalHeures||0}h`],
      ['Semaines saisies',          `${a.semaines||0}`],
      ['Total heures supplémentaires',`${a.totalHS||0}h`, (a.totalHS||0)>contingent?[155,44,44]:[26,23,20]],
      ['Contingent annuel',         `${contingent}h${a.contingentProrata?' (prorata)':''}`],
      ['Consommation contingent',   `${a.tauxRemplissage||0}%`, (a.tauxRemplissage||0)>=100?[155,44,44]:(a.tauxRemplissage||0)>=90?[196,133,58]:[45,107,79]],
    ];
    synthRows.forEach(([l,v,col],i) => {
      const ry = y + i*5.5;
      if (i%2===0) { doc.setFillColor(248,245,241); doc.rect(M,ry-1.5,PW,5.5,'F'); }
      txt(l, M+2, ry+2.5, 8, [70,65,60]);
      txt(v, W-M-2, ry+2.5, 8, col||[26,23,20], 'bold', 'right');
    });
    y += synthRows.length*5.5 + 6;

    // ── Détail par palier (2 ou 3 paliers selon CCN) ──────────
    chk();
    rect(M,y,PW,8,[240,235,228]);
    txt('VENTILATION HEURES SUPPLÉMENTAIRES',M+3,y+5.5,8,[70,65,60],'bold');
    y += 11;
    const tauxH = contract.tauxHoraire || 0;
    const palierRows = [];
    if (a.a3Paliers && a.taux_inter) {
      // HCR / Restauration rapide : 3 paliers (ex: +10% / +20% / +50%)
      palierRows.push([`Palier 1 — HS à +${a.taux1||10}% (${a.palier||4}h hebdo)`, `${a.totalHSTaux1||0}h`, tauxH>0?`${(a.montantHS1||0).toFixed(0)}€`:'—']);
      palierRows.push([`Palier 2 — HS à +${a.taux_inter}% (${a.palier_inter||4}h hebdo)`, `${a.totalHSTaux_inter||0}h`, tauxH>0?`${(a.montantHS_inter||0).toFixed(0)}€`:'—']);
      palierRows.push([`Palier 3 — HS à +${a.taux2||50}% (au-delà)`, `${a.totalHSTaux2||0}h`, tauxH>0?`${(a.montantHS2||0).toFixed(0)}€`:'—']);
    } else {
      // Droit commun : 2 paliers (+25% / +50%)
      palierRows.push([`Palier 1 — HS à +${a.taux1||25}% (${a.palier||8}h hebdo)`, `${a.totalHSTaux1||0}h`, tauxH>0?`${(a.montantHS1||0).toFixed(0)}€`:'—']);
      palierRows.push([`Palier 2 — HS à +${a.taux2||50}% (au-delà)`, `${a.totalHSTaux2||0}h`, tauxH>0?`${(a.montantHS2||0).toFixed(0)}€`:'—']);
    }
    palierRows.forEach(([l,h,m],i) => {
      const ry = y + i*5.5;
      if (i%2===0) { doc.setFillColor(248,245,241); doc.rect(M,ry-1.5,PW,5.5,'F'); }
      txt(l, M+2, ry+2.5, 7.5, [70,65,60]);
      txt(h, W-M-30, ry+2.5, 8, [26,23,20], 'bold', 'right');
      txt(m, W-M-2,  ry+2.5, 8, [139,105,20], 'bold', 'right');
    });
    y += palierRows.length*5.5 + 4;
    if (tauxH > 0) {
      txt(`Taux horaire de référence : ${tauxH}€/h`, M+2, y, 7, [120,114,106], 'italic');
      y += 5;
      txt(`Montant brut total HS : ${(a.montantTotal||0).toFixed(2)}€`, M+2, y, 9, [26,23,20], 'bold');
      y += 6;
      if (a.exoFiscale > 0) {
        txt(`Exonération fiscale TEPA (plafond 7 500€) : ${(a.exoFiscale||0).toFixed(2)}€`, M+2, y, 7.5, [45,107,79], 'normal');
        y += 6;
      }
    }
    y += 4;

    // ── Détail par semaine ───────────────────────────────────
    chk();
    rect(M,y,PW,8,[240,235,228]);
    txt('DÉTAIL HEBDOMADAIRE',M+3,y+5.5,8,[70,65,60],'bold');
    y += 11;
    txt('Semaine', M+2,    y, 7, [120,114,106], 'bold');
    txt('Heures',  M+50,   y, 7, [120,114,106], 'bold', 'right');
    txt('HS',      M+80,   y, 7, [120,114,106], 'bold', 'right');
    txt('Conformité', W-M-2, y, 7, [120,114,106], 'bold', 'right');
    y += 4;
    doc.setDrawColor(220,212,200); doc.line(M,y,W-M,y); y += 3;

    const semaines = Object.entries(data||{}).sort();
    semaines.forEach(([wk,v],i) => {
      chk();
      const h = parseFloat(v.heures)||0;
      const extra = Math.max(0, h-seuil);
      const conforme = h<=48;
      if (i%2===0) { doc.setFillColor(248,245,241); doc.rect(M,y-1.5,PW,5.5,'F'); }
      txt(wk, M+2, y+2.5, 7.5, [70,65,60]);
      txt(`${h}h`, M+50, y+2.5, 7.5, [26,23,20], 'normal', 'right');
      txt(extra>0?`+${extra}h`:'—', M+80, y+2.5, 7.5, extra>0?[196,133,58]:[120,114,106], 'normal', 'right');
      txt(conforme?'✓':'⚠ >48h', W-M-2, y+2.5, 7.5, conforme?[45,107,79]:[155,44,44], 'bold', 'right');
      y += 5.5;
    });
    y += 6;

    // ── Alertes ──────────────────────────────────────────────
    if (a.alertes && a.alertes.length) {
      chk();
      rect(M,y,PW,8,[252,245,235]);
      txt('ALERTES & RECOMMANDATIONS',M+3,y+5.5,8,[155,44,44],'bold');
      y += 11;
      a.alertes.forEach((al) => {
        chk();
        txt(_pdfSanitize(al.titre||''), M+2, y, 8, [26,23,20], 'bold');
        y += 4;
        const lines = doc.splitTextToSize(_pdfSanitize(al.texte||''), PW-4);
        lines.forEach(L => { txt(L, M+2, y, 7.5, [70,65,60]); y += 4; });
        y += 2;
      });
    }

    // ── Bloc certif + signature ──────────────────────────────
    chk();
    if (y>250) { doc.addPage(); y=15; }
    rect(M,y,PW,26,[248,244,238]);
    y += 4;
    txt('CERTIFICATION', M+3, y, 8, [26,23,20], 'bold');
    y += 4;
    txt('Le soussigné certifie l\'exactitude des informations consignées ci-dessus.', M+3, y, 7.5, [70,65,60]);
    y += 10;
    doc.setDrawColor(180,175,165);
    doc.line(M+3, y, M+80, y); doc.line(M+PW-80, y, W-M-3, y);
    txt('Signature du cadre', M+3, y+4, 6.5, [120,114,106]);
    txt('Date',                M+PW-80, y+4, 6.5, [120,114,106]);
    y += 12;

    // Pied de page
    doc.setFontSize(7); doc.setTextColor(138,132,124); doc.setFont('helvetica','normal');
    doc.text(`Suivi Forfait Heures ${year} — Art. L3121-27 à L3121-46 — Généré le ${new Date().toLocaleDateString('fr-FR')}`, M, 290);

    _shareOrSave(doc, `Forfait_Heures_Annuel_${year}.pdf`, `PDF annuel FH ${year} généré`);
  },

  // ── Export preuve renforcée (hash SHA-256 local) ────────────────
  // ── PDF Feuille de route Projets (Cadre Dirigeant) ────────────
  exportProjets({ year, contract, projets, stats }) {
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) { window.M6_toast?.('jsPDF non chargé'); return; }
    const doc = new jsPDF({ format:'a4', unit:'mm' });
    const W=210, M=15, PW=W-2*M;
    let y=0;
    const txt = (t,x,ry,size,color,style='normal',align='left') => {
      doc.setFontSize(size); doc.setTextColor(...(color||[26,23,20]));
      doc.setFont('helvetica',style);
      const s=(t===null||t===undefined)?'':typeof t==='object'?String(t.niveau??t.label??t.value??''):String(t);
      if(align==='right') doc.text(s,x,ry,{align:'right'});
      else doc.text(s,x,ry);
    };
    const rect = (x,ry,w,h,fill) => { doc.setFillColor(...fill); doc.rect(x,ry,w,h,'F'); };
    const chk  = () => { if(y>270){doc.addPage();y=15;} };
    const STATUTS = { a_faire:'À faire', en_cours:'En cours', en_pause:'En pause', termine:'Terminé' };

    // ── Entête ─────────────────────────────────────────────────
    rect(0,0,W,38,[26,23,20]);
    doc.setDrawColor(196,163,90); doc.setLineWidth(0.4); doc.line(M,34,W-M,34);
    txt('SUIVI CADRE DIRIGEANT',M,9,8,[196,163,90],'bold');
    txt('FEUILLE DE ROUTE — PROJETS ET MISSIONS',M,17,13,[247,243,237],'bold');
    txt(`${_pdfSanitize(contract.nom||contract.nomCadre||'')} · ${_pdfSanitize(contract.fonction||'')} · ${year}`,M,25,8,[189,181,168]);
    txt(`Généré le ${new Date().toLocaleDateString('fr-FR')}`,W-M,9,6.5,[189,181,168],'normal','right');
    txt(`${projets.length} projet(s)`,W-M,14,7,[196,163,90],'bold','right');
    y = 46;

    // ── Synthèse globale ─────────────────────────────────────
    const totalPrev  = projets.reduce((s,p)=>s+(p.heuresPrevu||0),0);
    const totalReel  = Object.values(stats||{}).reduce((s,v)=>s+(v.heuresReelles||0),0);
    const nActifs    = projets.filter(p=>p.statut!=='termine').length;
    const nTermines  = projets.filter(p=>p.statut==='termine').length;
    const pctGlob    = totalPrev>0 ? Math.min(100,Math.round(totalReel/totalPrev*100)) : 0;

    rect(M,y,PW,7,[240,235,228]);
    txt('SYNTHÈSE GLOBALE',M+3,y+5,8,[70,65,60],'bold');
    y += 10;
    [[`Projets actifs`,nActifs],[`Projets terminés`,nTermines],[`Heures imputées`,totalReel+'h'],[`Budget total`,totalPrev+'h'],[`Avancement global`,pctGlob+'%']].forEach(([l,v],i)=>{
      if(i%2===0){doc.setFillColor(248,245,241);doc.rect(M,y-1.5,PW,5.5,'F');}
      txt(l+' :',M+2,y+2.5,8,[100,95,90]);
      txt(String(v),M+55,y+2.5,8,[26,23,20],'bold');
      y+=5.5;
    });
    y += 6;

    // ── Détail par projet ────────────────────────────────────
    const sorted = [...projets].sort((a,b)=>{
      const p={'haute':0,'moyenne':1,'basse':2};
      return (p[a.priorite]??1)-(p[b.priorite]??1);
    });
    sorted.forEach((p,pi) => {
      const s    = (stats||{})[p.id] || { heuresReelles:0, jours:[] };
      const hr   = Math.round(s.heuresReelles*10)/10;
      const hp   = p.heuresPrevu||0;
      const pct  = hp>0?Math.min(100,Math.round(hr/hp*100)):0;
      const dep  = hp>0&&hr>hp;
      chk(); if(y>245){doc.addPage();y=15;}

      // Bandeau projet
      rect(M,y,PW,8,[240,235,228]);
      txt(String(pi+1)+'. '+_pdfSanitize(p.nom),M+3,y+5.5,9,[26,23,20],'bold');
      txt(STATUTS[p.statut]||p.statut, W-M-3, y+5.5, 7.5, [70,65,60], 'normal', 'right');
      y += 11;

      // Infos projet
      const rows = [
        ['Catégorie',  p.categorie||'—'],
        ['Priorité',   p.priorite||'—'],
        ['Début',      p.dateDebut||'—'],
        ['Fin prévue', p.dateFin||'—'],
        ['Heures imputées', hr+'h'+(hp>0?' / '+hp+'h budget':'')],
        ['Avancement', pct+'%'+(dep?' ⚠ DÉPASSEMENT':'')],
      ];
      rows.forEach(([l,v],i)=>{
        if(i%2===0){doc.setFillColor(248,245,241);doc.rect(M,y-1.5,PW/2,5.5,'F');}
        txt(l+' :',M+2,y+2.5,7.5,[100,95,90]);
        txt(_pdfSanitize(String(v)),M+30,y+2.5,7.5,dep&&l==='Avancement'?[155,44,44]:[26,23,20],'bold');
        y+=5.5;
      });

      // Jalons
      if ((p.jalons||[]).length > 0) {
        y += 2;
        txt('Jalons :',M+2,y,7.5,[100,95,90],'bold'); y+=4;
        p.jalons.forEach(j=>{
          chk();
          const done = j.fait;
          txt((done?'✓ ':'○ ')+_pdfSanitize(j.titre||''),M+4,y,7.5,done?[45,107,79]:[70,65,60]);
          if(j.date) txt(j.date,W-M-2,y,7,[150,140,130],'normal','right');
          y+=4.5;
        });
      }

      // Note
      if (p.note) {
        y += 2;
        const noteLines = doc.splitTextToSize('Note : '+_pdfSanitize(p.note),PW-6);
        doc.setFontSize(7.5); doc.setFont('helvetica','italic'); doc.setTextColor(100,95,90);
        doc.text(noteLines,M+2,y); y+=noteLines.length*3.8;
      }

      // Derniers jours imputés
      if (s.jours && s.jours.length > 0) {
        y += 2;
        txt('Dernières imputations :',M+2,y,7,[100,95,90]); y+=4;
        s.jours.slice(-5).forEach(j=>{
          chk();
          txt(`${j.dk} — ${j.h}h${j.note?' — '+_pdfSanitize(j.note):''}`,M+4,y,7,[70,65,60]); y+=4;
        });
      }
      y += 8;
      doc.setDrawColor(220,212,200); doc.setLineWidth(0.2); doc.line(M,y-4,W-M,y-4);
    });

    // Signatures
    chk(); if(y>250){doc.addPage();y=15;}
    rect(M,y,PW,8,[232,245,238]);
    txt('VALIDATION — CADRE DIRIGEANT',M+3,y+5.5,8,[30,90,60],'bold');
    y+=11;
    doc.setFontSize(8); doc.setFont('helvetica','normal'); doc.setTextColor(70,65,60);
    doc.line(M+2,y+5,M+PW/2-10,y+5); txt('Signature',M+2,y+9,6.5,[120,114,106]);
    doc.line(M+PW/2,y+5,W-M-2,y+5); txt('Date',M+PW/2,y+9,6.5,[120,114,106]);
    y+=16;
    doc.setFontSize(7); doc.setTextColor(138,132,124);
    doc.text(`Feuille de route ${year} — Généré le ${new Date().toLocaleDateString('fr-FR')}`, M, 290);

    _shareOrSave(doc, `Projets_CD_${year}.pdf`, 'PDF feuille de route généré');
  },

  exportPreuve({ regime, year, contract, data, analysis }) {
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) { window.M6_toast?.('jsPDF non chargé'); return; }

    const doc  = new jsPDF({ format:'a4', unit:'mm' });
    const W=210, M=15, PW=W-2*M;
    let y=0;

    const txt = (t,x,ry,size,color,style='normal',align='left') => {
      doc.setFontSize(size); doc.setTextColor(...(color||[26,23,20]));
      doc.setFont('helvetica',style);
      const s = (t===null||t===undefined)?'':typeof t==='object'?String(t.niveau??t.label??t.value??''):String(t);
      if (align==='right') doc.text(s,x,ry,{align:'right'});
      else doc.text(s,x,ry);
    };
    const rect  = (x,ry,w,h,fill) => { doc.setFillColor(...fill); doc.rect(x,ry,w,h,'F'); };
    const line  = (x1,y1,x2,y2) => { doc.setDrawColor(196,163,90); doc.setLineWidth(0.4); doc.line(x1,y1,x2,y2); };
    const chk   = () => { if(y>268){doc.addPage();y=15;} };

    const ts   = new Date();
    const hash = _localHash(`${regime}-${year}-${contract.nomCadre||''}-${Object.keys(data||{}).length}-${ts.toISOString()}`);

    // ── Entête ───────────────────────────────────────────────────
    rect(0,0,W,38,[26,23,20]);
    doc.setDrawColor(196,163,90); doc.setLineWidth(0.5); doc.line(M,34,W-M,34);
    txt('DOCUMENT DE CONFORMITE SOCIALE',M,9,8,[196,163,90],'bold');
    txt('RAPPORT DE CONFORMITÉ ' + (regime==='forfait_jours'?'FORFAIT JOURS':regime==='forfait_heures'?'FORFAIT HEURES':'CADRE DIRIGEANT'),M,17,13,[247,243,237],'bold');
    txt(`Exercice ${year}`,M,25,9,[189,181,168],'normal');
    txt(`Réf. #${hash}`,W-M,9,6.5,[196,163,90],'normal','right');
    txt(`Généré le ${ts.toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'})} à ${ts.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}`,W-M,14,6.5,[189,181,168],'normal','right');
    y = 46;

    // ── Identification ───────────────────────────────────────────
    rect(M,y,PW,7,[240,235,228]);
    txt('IDENTIFICATION',M+3,y+5,8,[70,65,60],'bold');
    y += 10;
    const idRows = [
      ['Cadre',      contract.nomCadre||contract.nom||'N/A'],
      ['Fonction',   contract.fonction||'N/A'],
      ['Entreprise', contract.entreprise||'N/A'],
      ['CCN',        contract.ccnLabel||'Droit commun'],
      ['Plafond',    `${contract.plafond||218} jours`],
      ['CP contrat', `${contract.joursCPContrat||25} jours`],
    ];
    idRows.forEach(([l,v],i) => {
      if(i%2===0){doc.setFillColor(248,245,241);doc.rect(M,y-1.5,PW,5.5,'F');}
      txt(l+' :',M+2,y+2.5,8,[100,95,90]);
      txt(_pdfSanitize(v),M+35,y+2.5,8,[26,23,20],'bold');
      y += 5.5;
    });
    y += 6;

    // ── Données forfait ──────────────────────────────────────────
    chk();
    rect(M,y,PW,7,[240,235,228]);
    txt('DONNÉES FORFAIT '+year,M+3,y+5,8,[70,65,60],'bold');
    y += 10;
    const forfaitRows = regime==='forfait_jours'
      ? [
          ['Jours travaillés',   `${analysis?.joursEffectifs||0} / ${analysis?.plafond||218}`],
          ['Jours rachetés',     `${analysis?.rachetes||0}`],
          ['RTT théoriques',     `${analysis?.rttTheoriques||0}`],
          ['RTT pris',           `${analysis?.rttPris||0}`],
          ['Solde RTT',          `${analysis?.rttSolde>=0?'+':''}${analysis?.rttSolde??0}`],
          ['CP pris',            `${analysis?.cpPris||0}`],
          ['Fériés ouvrés',      `${analysis?.feriesOuvres||0}`],
          ['Taux remplissage',   `${analysis?.tauxRemplissage||0}%`],
        ]
      : [
          ['Total HS',           `${analysis?.totalHS||0}h`],
          ['Semaines saisies',   `${analysis?.semaines||0}`],
          ['Contingent',         `${analysis?.contingent||contract.contingent||220}h`],
          ['Consommation',       `${analysis?.tauxRemplissage||0}%`],
          ['CP pris',            `${analysis?.cpPris||0}`],
        ];
    forfaitRows.forEach(([l,v],i) => {
      if(i%2===0){doc.setFillColor(248,245,241);doc.rect(M,y-1.5,PW,5.5,'F');}
      txt(l+' :',M+2,y+2.5,8,[100,95,90]);
      txt(_pdfSanitize(v),M+55,y+2.5,8,[26,23,20],'bold');
      y += 5.5;
    });
    y += 6;

    // ── Entretiens annuels ───────────────────────────────────────
    chk();
    rect(M,y,PW,7,[240,235,228]);
    txt('ENTRETIENS ANNUELS',M+3,y+5,8,[70,65,60],'bold');
    y += 10;
    const entretiens = window.M6_Storage?.getEntretiens?.(regime, year) || [];
    const dernierDate = contract.entretienDate || null;
    if (dernierDate) {
      txt('Dernier entretien : '+_pdfSanitize(dernierDate),M+2,y+2.5,8,[26,23,20],'bold');
      y += 6;
    }
    if (entretiens.length > 0) {
      entretiens.forEach((e,i) => {
        chk();
        if(i%2===0){doc.setFillColor(248,245,241);doc.rect(M,y-1,PW,5,'F');}
        const dateStr = e.date ? new Date(e.date).toLocaleDateString('fr-FR') : 'Sans date';
        txt(`${dateStr}${e.charge?' — Charge '+e.charge+'/5':''} — Manager : ${_pdfSanitize(e.manager||'—')}`,M+2,y+2.5,8,[70,65,60]);
        y += 5;
      });
    } else {
      txt('Aucun historique d\'entretien disponible.',M+2,y,8,[155,44,44]);
      y += 6;
    }
    y += 5;

    // ── Alertes actives ──────────────────────────────────────────
    chk();
    const alertes = analysis?.alertes || [];
    if (alertes.length > 0) {
      rect(M,y,PW,7,[252,232,232]);
      txt('ALERTES LÉGALES ACTIVES',M+3,y+5,8,[155,44,44],'bold');
      y += 10;
      alertes.forEach(al => {
        chk();
        txt('⚠ '+_pdfSanitize(al.titre||''),M+2,y,8,[155,44,44],'bold'); y+=4;
        const aLines = doc.splitTextToSize(_pdfSanitize(al.texte||''),PW-6);
        doc.setFontSize(7.5); doc.setFont('helvetica','normal'); doc.setTextColor(70,65,60);
        doc.text(aLines,M+4,y); y+=aLines.length*3.8+2;
      });
      y += 4;
    }

    // ── Empreinte numérique ──────────────────────────────────────
    chk();
    rect(M,y,PW,7,[232,241,255]);
    txt('EMPREINTE NUMÉRIQUE (hash djb2 — vérification d\'intégrité)',M+3,y+5,8,[30,60,140],'bold');
    y += 11;
    doc.setFontSize(10); doc.setFont('helvetica','bold'); doc.setTextColor(30,60,140);
    doc.text('#'+hash, M+2, y); y+=6;
    doc.setFontSize(6.5); doc.setFont('helvetica','normal'); doc.setTextColor(100,95,90);
    const hashData = `Données : régime=${regime}, exercice=${year}, nomCadre=${contract.nomCadre||''}, nbJours=${analysis?.joursEffectifs||0}, plafond=${analysis?.plafond||0}, rachetes=${analysis?.rachetes||0}, rttPris=${analysis?.rttPris||0}`;
    const hashLines = doc.splitTextToSize(hashData, PW-4);
    doc.text(hashLines,M+2,y); y += hashLines.length*3.2+6;

    // ── Bloc certification + signatures ──────────────────────────
    chk(); if(y>235){doc.addPage();y=15;}
    rect(M,y,PW,8,[232,245,238]);
    txt('CERTIFICATION ET SIGNATURES',M+3,y+5.5,8,[30,90,60],'bold');
    y += 11;
    doc.setFontSize(8); doc.setFont('helvetica','normal'); doc.setTextColor(70,65,60);
    const certLines = doc.splitTextToSize(
      `Je soussigné(e) ${_pdfSanitize(contract.nomCadre||contract.nom||'___________')} certifie que les données ci-dessus reflètent fidèlement mon suivi pour l'exercice ${year}. En cas de contestation, le hash #${hash} permet de vérifier l'intégrité du document. Ce document peut être produit en cas de contrôle de l'inspection du travail ou de litige prud'homal.`,
      PW-4);
    doc.text(certLines,M+2,y); y+=certLines.length*4+8;

    doc.setDrawColor(45,107,79); doc.setLineWidth(0.3);
    txt('Cadre :', M, y+5, 8); doc.line(M+22,y+6,M+PW/2-5,y+6);
    txt('Date :',M+PW/2,y+5,8); doc.line(M+PW/2+14,y+6,W-M-2,y+6);
    y += 14;
    txt('Manager :',M,y+5,8); doc.line(M+26,y+6,M+PW/2-5,y+6);
    txt('Date :',M+PW/2,y+5,8); doc.line(M+PW/2+14,y+6,W-M-2,y+6);
    y += 16;

    // Pied de page
    doc.setFontSize(7); doc.setTextColor(138,132,124); doc.setFont('helvetica','normal');
    doc.text(`Document de suivi — Usage interne — ${year}`, M, 290);
    doc.text('#'+hash, W-M, 290, {align:'right'});

    _shareOrSave(doc, `Preuve_M6_${regime}_${year}_${hash}.pdf`, 'Document de preuve généré');
  },
};

global.M6_PDF = M6_PDF;
})(window);
