/**
 * PDF-REPORT — Export PDF M5 Mizuki
 * Rapport professionnel heures complémentaires
 * Sections : Contrat · Bilan · Heatmap · Détail semaines · Droits
 * v2.1 — Lettre de refus retirée (éviter tout risque juridique pour la salariée)
 */
(function(global) {
'use strict';

const M5_PdfReport = {

  generate(contract, stats, weeks, analysis) {
    const JClass = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
    if(!JClass) { alert('PDF non disponible. Vérifie ta connexion pour charger jsPDF.'); return; }
    const doc = new JClass({ orientation:'portrait', unit:'mm', format:'a4' });
    const M=15, PW=180, pageH=297;
    let y=20;
    const mode = contract.modeCalcul||'HEBDO';
    const VIOLET=[89,44,165], VIOLET_LIGHT=[230,220,255], AMBER=[245,158,11];

    const checkPage=(needed=10)=>{ if(y+needed>pageH-18){ doc.addPage(); y=20; } };

    const h1=(txt)=>{
      checkPage(14);
      doc.setFillColor(...VIOLET);
      doc.rect(M,y-5,PW,8,'F');
      doc.setTextColor(255,255,255);
      doc.setFontSize(11); doc.setFont('helvetica','bold');
      doc.text(txt,M+3,y);
      doc.setTextColor(0,0,0);
      y+=8;
    };

    const row=(label,val,highlight=false)=>{
      checkPage(6);
      doc.setFontSize(9);
      doc.setFont('helvetica','bold');
      doc.setTextColor(89,44,165);
      doc.text(label+' :',M,y);
      doc.setFont('helvetica','normal');
      if(highlight) doc.setTextColor(...AMBER);
      else doc.setTextColor(0,0,0);
      doc.text(String(val),M+72,y);
      doc.setTextColor(0,0,0);
      y+=6;
    };

    // ══ EN-TÊTE ══════════════════════════════════════════════════
    doc.setFillColor(30,12,74);
    doc.rect(0,0,210,28,'F');
    doc.setFillColor(...VIOLET);
    doc.rect(0,22,210,6,'F');
    doc.setTextColor(255,255,255);
    doc.setFontSize(16); doc.setFont('helvetica','bold');
    doc.text('Mizuki - Rapport Heures Complementaires'+(contract.nomContrat?' · '+contract.nomContrat:''),M,12);
    doc.setFontSize(9); doc.setFont('helvetica','normal');
    doc.text('Simulateur Heures Sup France · Module Temps Partiel',M,19);
    doc.setTextColor(196,168,255);
    doc.setFontSize(8);
    doc.text('Généré le '+new Date().toLocaleDateString('fr-FR',{dateStyle:'long'}),M+PW,26,{align:'right'});
    doc.setTextColor(0,0,0);
    y=36;

    // ══ SECTION 1 : MON CONTRAT ══════════════════════════════════
    h1('1. Mon contrat');
    const modeLabel=mode==='MENSUEL'?'Mensuel (par mois de paie)':mode==='ANNUEL'?'Annuel (compteur glissant)':'Hebdomadaire';
    row('Salarié(e)',contract.userName||'Non renseigné');
    { const _dc=contract.dureeContrat, _uc={M:'mois',A:'an'}[_dc&&_dc.unite];
      row('Durée contractuelle',(_uc&&_dc.valeur>0)?`${String(_dc.valeur).replace('.',',')}h/${_uc} (moyenne ${String(contract.hoursBase).replace('.',',')}h/semaine)`:`${contract.hoursBase}h/semaine`); }
    row('Taux horaire brut',contract.hourlyRate>0?`${(contract.hourlyRate).toFixed(2)} €/h`:'Non renseigné');
    row('Convention collective',contract.ccnNom||'Droit commun');
    const capPct=Math.round((contract.cap||0.10)*100);
    const capH=(contract.hoursBase*(contract.cap||0.10)).toFixed(1);
    row('Plafond heures comp.',`${capPct}% du contrat (max ${capH}h/sem)`);
    row("Majorations",`+${Math.round((contract.rate1||0.10)*100)}% jusqu'à ${(contract.hoursBase*((contract.threshold||0.10))).toFixed(1)}h · +${Math.round((contract.rate2||0.25)*100)}% au-delà`);
    row('Mode de calcul',modeLabel);
    row("Jours fériés", contract.neutraliseFeries!==false ? "Neutralisés (assimilation temps effectif)" : "Inclus dans l'assiette (accord spécifique)");
    row('Début exercice',contract.exerciceStart||String(new Date().getFullYear()));
    y+=4;

    // ══ Périodes de paie personnalisées (configurées dans les réglages) ══
    if(mode==='MENSUEL' && contract.cloturesDates && Object.keys(contract.cloturesDates).length>0){
      h1('Périodes de paie configurées');
      const _MOIS=['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'];
      const _fmtD=(iso)=>{ if(!iso) return '—'; const q=String(iso).split('-'); return q.length===3?(q[2]+'/'+q[1]+'/'+q[0]):String(iso); };
      const _months=Object.keys(contract.cloturesDates).map(Number).sort((a,b)=>a-b);
      _months.forEach(m=>{ row('Clôture '+(_MOIS[m-1]||('mois '+m)), _fmtD(contract.cloturesDates[m])); });
      y+=4;
    }

    // ══ SECTION 2 : BILAN ════════════════════════════════════════
    h1('2. Bilan de la période');
    if(mode==='ANNUEL' && analysis && analysis.annuelResult) {
      const ar=analysis.annuelResult;
      row('Exercice',`${ar.debutEx} au ${ar.finEx}`);
      row('Avancement',`${ar.pctAvancement}% (${ar.joursEcoules} j / ${ar.nbJoursEx} j)`);
      row('Objectif annuel',`${ar.objectifAnnuel}h`);
      row('Théorique cumulé',`${ar.theoriqueCumule}h`);
      row('Heures réalisées',`${ar.reelCumule}h`);
      row('Solde',`${ar.solde>=0?'+':''}${ar.solde}h`,Math.abs(ar.solde)>5);
      row('Semaines saisies',String(ar.semaines));
    } else if(mode==='MENSUEL' && analysis && analysis.mensuelResult) {
      const mr=analysis.mensuelResult;
      row('Seuil mensuel',`${mr.seuilMensuel}h`);
      row('Heures ce mois',`${mr.totalWorked}h`);
      row('Delta vs seuil',`${mr.delta>=0?'+':''}${mr.delta.toFixed(1)}h`,mr.delta>0);
      row('Heures comp. mois',`${mr.totalCompH}h`);
      row(`dont +${Math.round((contract.rate1||0.10)*100)}%`,`${mr.compH1.toFixed(1)}h`);
      row(`dont +${Math.round((contract.rate2||0.25)*100)}%`,`${mr.compH2.toFixed(1)}h`);
      if(contract.hourlyRate>0) row('Montant estimé brut',`${mr.totalCompAmount.toFixed(2)} €`);
      row('Plafond mensuel',`${mr.maxAllowed.toFixed(1)}h`);
    } else if(stats) {
      row('Semaines saisies',String(stats.totalWeeks));
      row('Semaines en dépassement',`${stats.weeksWithComp} (${stats.pctOverContract}%)`);
      row('Total heures comp.',`${stats.totalComp.toFixed(1)}h`,stats.totalComp>0);
      row(`dont +${Math.round((contract.rate1||0.10)*100)}%`,`${(stats.totalComp1||0).toFixed(1)}h`);
      row(`dont +${Math.round((contract.rate2||0.25)*100)}%`,`${(stats.totalComp2||0).toFixed(1)}h`);
      row('Moyenne hebdo',`${stats.avgWorked}h/sem`);
      row('Semaine la plus chargée',`${stats.maxWorked}h`);
    }
    y+=4;

    // ══ PAIEMENT (27/09/2026) : dû / payé / reste, sur les semaines de ce PDF ══
    if(contract.pay && mode!=='ANNUEL'){
      const P=contract.pay, f=(h)=>{h=Math.round((h||0)*60);return Math.floor(h/60)+'h'+(h%60?String(h%60).padStart(2,'0'):'');};
      h1('Paiement des heures complémentaires');
      row(`Dues à +${Math.round((contract.rate1||0.10)*100)}%`,f(P.du10));
      row(`Dues à +${Math.round((contract.rate2||0.25)*100)}%`,f(P.du25));
      row('Payées (cochées dans Mizuki)',f(P.paye10+P.paye25)+(P.paye10+P.paye25>0?` (${f(P.paye10)} + ${f(P.paye25)})`:''));
      row('Reste à payer',f(P.reste10+P.reste25),P.reste10+P.reste25>0.01);
      if(contract.hourlyRate>0) row('Reste estimé (brut)',((P.reste10*(1+(contract.rate1||0.10))+P.reste25*(1+(contract.rate2||0.25)))*contract.hourlyRate).toFixed(2)+' €',P.reste10+P.reste25>0.01);
      if(P.reste10+P.reste25>0.01){ checkPage(10); doc.setFontSize(8); doc.setTextColor(120,70,0);
        const l=doc.splitTextToSize("Heures restant dues : tu as 3 ans pour les réclamer à ton employeur (art. L3245-1 du Code du travail), à compter de la paie où elles auraient dû figurer.",PW); doc.text(l,M,y); y+=l.length*4+2; doc.setTextColor(0,0,0); }
      y+=4;
    }

    // ══ SECTION 3 : HEATMAP VISUELLE ════════════════════════════
    if(weeks && weeks.length>0) {
      checkPage(30);
      h1("3. Vue d'ensemble — intensité hebdomadaire");
      const CELL=6, GAP=1.2;
      const maxW=stats ? stats.maxWorked : Math.max(...weeks.map(w=>w.worked||0));
      let wx=M, wy=y;
      const MOIS=['J','F','M','A','M','J','J','A','S','O','N','D'];
      doc.setFontSize(7);
      weeks.forEach((w,i)=>{
        checkPage(CELL+4);
        if(wx+CELL+GAP>M+PW){ wx=M; wy+=CELL+GAP; }
        const wh=w.worked||0;
        const ratio=maxW>0?wh/maxW:0;
        // Couleur : vert si OK, ambre si HC, rouge si proche 35h
        let r=230,g=230,b=255;
        if(wh>=35){ r=220;g=80;b=80; }
        else if(wh>contract.hoursBase){ r=Math.round(245+ratio*0); g=Math.round(158*(1-ratio*0.3)); b=Math.round(11+ratio*20); }
        else if(wh>0){ r=16;g=185;b=129; }
        doc.setFillColor(r,g,b);
        doc.rect(wx,wy,CELL,CELL,'F');
        doc.setFillColor(255,255,255);
        doc.setTextColor(wh>0&&(r<150||g<150)?255:80,wh>0&&(r<150||g<150)?255:80,wh>0&&(r<150||g<150)?255:80);
        if(wh>0) doc.text(String(wh),wx+CELL/2,wy+CELL-1.5,{align:'center'});
        doc.setTextColor(0,0,0);
        wx+=CELL+GAP;
      });
      y=wy+CELL+6;
      // Légende
      doc.setFontSize(7); doc.setFont('helvetica','normal');
      [[16,185,129,'Conforme'],[245,158,11,'Heures comp.'],[220,80,80,'35h et +']].forEach(([r,g,b,lbl],i)=>{
        const lx=M+i*40;
        doc.setFillColor(r,g,b); doc.rect(lx,y,5,4,'F');
        doc.setTextColor(0,0,0); doc.text(lbl,lx+7,y+3);
      });
      y+=10;
    }

    // ══ SECTION 4 : DÉTAIL PAR SEMAINE ══════════════════════════
    if(weeks && weeks.length>0) {
      checkPage(22);
      h1('4. Détail par semaine');
      const cols=[M+2,M+48,M+80,M+102,M+124,M+148,M+168];
      doc.setFillColor(...VIOLET_LIGHT);
      doc.rect(M,y-4,PW,7,'F');
      doc.setFontSize(8); doc.setFont('helvetica','bold'); doc.setTextColor(...VIOLET);
      ['Semaine','Travaillées','Comp.',`+${Math.round((contract.rate1||0.10)*100)}%`,`+${Math.round((contract.rate2||0.25)*100)}%`,'Montant','OK'].forEach((h,i)=>doc.text(h,cols[i],y));
      doc.setTextColor(0,0,0); y+=7;   // 27/09/2026 : la 1re ligne ne chevauche plus le bandeau d'en-tête
      doc.setFontSize(8); doc.setFont('helvetica','normal');
      let alt=false, auFerie=false;
      weeks.forEach(w=>{
        if(w.worked===null||w.worked===undefined) return;
        checkPage(6);
        const wh=w.worked||0;
        const thr=contract.hoursBase*(contract.threshold||0.10);
        // Chiffres du moteur (fériés neutralisés) quand l'appelant les fournit : identiques au bilan et au paiement
        const _eng=(w.hc10!=null);
        const c1=_eng?w.hc10:Math.min(Math.max(0,wh-contract.hoursBase),thr);
        const c2=_eng?w.hc25:Math.max(0,Math.max(0,wh-contract.hoursBase)-thr);
        const diff=Math.round((c1+c2)*100)/100;
        if(w.hcFerie) auFerie=true;
        const d=new Date(w.monday+'T12:00:00');
        const fn=new Date(w.monday+'T12:00:00'); fn.setDate(fn.getDate()+6);
        const lbl=`${d.getDate()}/${d.getMonth()+1} au ${fn.getDate()}/${fn.getMonth()+1}/${fn.getFullYear()}`;
        if(alt){ doc.setFillColor(248,245,255); doc.rect(M,y-3,PW,5.5,'F'); }
        alt=!alt;
        doc.text(lbl,cols[0],y);
        doc.text(`${wh}h`,cols[1],y);
        if(diff>0){
          const montant=contract.hourlyRate>0?c1*contract.hourlyRate*(1+(contract.rate1||0.10))+c2*contract.hourlyRate*(1+(contract.rate2||0.25)):0;
          doc.setTextColor(...VIOLET);
          doc.text(`+${diff.toFixed(1)}h${w.hcFerie?'*':''}`,cols[2],y);
          doc.text(c1>0?`${c1.toFixed(1)}h`:'--',cols[3],y);
          doc.text(c2>0?`${c2.toFixed(1)}h`:'--',cols[4],y);
          doc.text(montant>0?`${montant.toFixed(2)}€`:'--',cols[5],y);
          doc.setTextColor(wh>=35?180:0,0,0);
          doc.text(wh>=35?'! 35h':' ',cols[6],y);
          doc.setTextColor(0,0,0);
        } else {
          doc.setTextColor(180,180,180);
          ['--','--','--','--','OK'].forEach((t,i)=>doc.text(t,cols[i+2],y));
          doc.setTextColor(0,0,0);
        }
        y+=5.5;
      });
      if(auFerie){ checkPage(8); doc.setFontSize(7.5); doc.setTextColor(110,110,110);
        doc.text('* Semaine avec un jour férié chômé : le seuil des heures complémentaires est abaissé d\'autant (férié assimilé à du travail, art. L3133-3).',M+2,y+1);
        doc.setTextColor(0,0,0); y+=4; }
      y+=6;
    }

    // ══ SECTION 5 : MES DROITS ═══════════════════════════════════
    checkPage(50);
    h1('5. Mes droits — Rappels légaux');
    doc.setFontSize(9); doc.setFont('helvetica','normal');
    const noticeDefaut = contract.noticeDays || 7;
    const droits=[
      ["Art. L3123-28",`Plafond heures complémentaires : ${Math.round((contract.cap||0.10)*100)}% du contrat (selon ta CCN : 1/10 ou 1/3).`],
      ["Art. L3123-29",`Majorations supplétives : +${Math.round((contract.rate1||0.10)*100)}% jusqu'à 1/${Math.round(1/(contract.threshold||0.10))}e du contrat, puis +${Math.round((contract.rate2||0.25)*100)}%.`],
      ["Art. L3123-9","Jamais 35h : les heures complémentaires ne peuvent jamais porter la durée au niveau du temps plein légal (35h) ou conventionnel."],
      ["Art. L3123-31","Délai de prévenance par défaut : 7 jours ouvrés minimum pour toute modification de la répartition."],
      [noticeDefaut===3?"Art. L3123-24":"Application L3123-31",`Ton contrat indique : ${noticeDefaut} jours ouvrés (${noticeDefaut===3?'réduit par accord collectif étendu avec contreparties':'délai légal par défaut, aucun accord dérogatoire'}).`],
      ["Art. L3123-10","Refus sans faute : tu peux refuser des HC si (1) elles dépassent les limites du contrat, (2) le délai de prévenance n'a pas été respecté, ou (3) ton contrat ne mentionne pas la possibilité d'en faire."],
      ["Art. L3123-13","Règle des 12 semaines : si tu dépasses ton contrat de +2h/sem pendant 12 semaines consécutives (ou 12 sur 15), ton contrat doit être modifié à la hausse (sauf opposition de ta part)."],
      ["Art. L3123-22","Avenant complément d'heures : possible uniquement si ta CCN le prévoit. Max 8 avenants / an / salarié."],
      ["Art. L3123-7","Durée minimale : 24h/sem sauf dérogations légales (demande du salarié, accord de branche, étudiant, CDD court…)."],
      ["Art. L3123-3","Priorité d'accès au temps plein : l'employeur doit t'informer des postes à temps plein disponibles."],
      ["Exonération fiscale","Heures comp. exonérées d'impôt sur le revenu jusqu'à 7 500 €/an + réduction cotisations salariales (loi Avenir Pro 2019)."],
    ];
    droits.forEach(([art,txt])=>{
      checkPage(12);
      doc.setFont('helvetica','bold'); doc.setTextColor(...VIOLET);
      doc.text(art+' :',M,y);
      doc.setFont('helvetica','normal'); doc.setTextColor(0,0,0);
      const lines=doc.splitTextToSize(txt,PW-30);
      doc.text(lines,M+35,y);
      y+=lines.length*5+3;
    });
    y+=4;

    // ══ PIED DE PAGE ═════════════════════════════════════════════
    const totalPages=doc.getNumberOfPages();
    for(let p=1;p<=totalPages;p++){
      doc.setPage(p);
      doc.setFillColor(30,12,74);
      doc.rect(0,pageH-12,210,12,'F');
      doc.setFontSize(7); doc.setTextColor(196,168,255);
      doc.text(`Page ${p}/${totalPages}`,M,pageH-5);
      doc.text('Code du travail — Légifrance. Document informatif, non juridique. Mizuki 2026.',105,pageH-5,{align:'center'});
    }

    const yr=new Date().getFullYear();
    const slug=(contract.nomContrat||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    const filename=`heures-complementaires-mizuki-${slug?slug+'-':''}${yr}.pdf`;
    const isAndroid=/Android/i.test((navigator&&navigator.userAgent)||'');
    if(isAndroid){
      // Android (TWA) : le téléchargement est silencieux → snackbar de confirmation + bouton Ouvrir
      try{
        const blob=doc.output('blob');
        doc.save(filename);
        if(window.M5_pdfSnackbar) window.M5_pdfSnackbar(blob, filename);
      }catch(e){ doc.save(filename); }
    } else {
      doc.save(filename); // iOS : le PDF s'ouvre automatiquement
    }
  }
};

/* ══ PDF COMMUN — tous les contrats (27/09/2026) ══════════════════════════════
   d = { periodeLabel, userName, contrats:[{n, nom, c, heures, du10, du25, paye10, paye25}],
         semaines:[{monday, worked, parContrat:{n:h}}] } */
M5_PdfReport.generateCommun = function(d){
  const JClass=(window.jspdf&&window.jspdf.jsPDF)||window.jsPDF;
  if(!JClass){ alert('PDF non disponible. Vérifie ta connexion pour charger jsPDF.'); return; }
  const doc=new JClass({orientation:'portrait',unit:'mm',format:'a4'});
  const M=15,PW=180,pageH=297,VIOLET=[89,44,165],LIGHT=[230,220,255],RED=[200,40,40];
  let y=20;
  const f=(h)=>{h=Math.round((h||0)*60);const s=h<0?'-':'';h=Math.abs(h);return s+Math.floor(h/60)+'h'+(h%60?String(h%60).padStart(2,'0'):'');};
  const checkPage=(n=10)=>{ if(y+n>pageH-18){ doc.addPage(); y=20; } };
  const h1=(t)=>{ checkPage(14); doc.setFillColor(...VIOLET); doc.rect(M,y-5,PW,8,'F'); doc.setTextColor(255,255,255); doc.setFontSize(11); doc.setFont('helvetica','bold'); doc.text(t,M+3,y); doc.setTextColor(0,0,0); y+=8; };
  const para=(t,col)=>{ checkPage(10); doc.setFontSize(8.5); doc.setFont('helvetica','normal'); if(col)doc.setTextColor(...col); const l=doc.splitTextToSize(t,PW); doc.text(l,M,y); y+=l.length*4.2+2; doc.setTextColor(0,0,0); };
  // En-tête
  doc.setFillColor(30,12,74); doc.rect(0,0,210,28,'F'); doc.setFillColor(...VIOLET); doc.rect(0,22,210,6,'F');
  doc.setTextColor(255,255,255); doc.setFontSize(16); doc.setFont('helvetica','bold'); doc.text('Mizuki - Tous mes contrats',M,12);
  doc.setFontSize(9); doc.setFont('helvetica','normal'); doc.text((d.userName?d.userName+' · ':'')+'Période : '+d.periodeLabel,M,19);
  doc.setTextColor(196,168,255); doc.setFontSize(8); doc.text('Généré le '+new Date().toLocaleDateString('fr-FR',{dateStyle:'long'}),M+PW,26,{align:'right'});
  doc.setTextColor(0,0,0); y=36;
  // 1. Contrats
  h1('1. Mes contrats et leurs heures complémentaires');
  const cols=[M+2,M+44,M+70,M+92,M+114,M+136,M+158];
  doc.setFillColor(...LIGHT); doc.rect(M,y-4,PW,7,'F'); doc.setFontSize(8); doc.setFont('helvetica','bold'); doc.setTextColor(...VIOLET);
  ['Contrat','Base','Travaillées','HC dues','Payées','Reste','Plafond'].forEach((h,i)=>doc.text(h,cols[i],y)); doc.setTextColor(0,0,0); y+=5;
  doc.setFont('helvetica','normal');
  let T={base:0,heures:0,du:0,paye:0};
  d.contrats.forEach(k=>{ checkPage(6); const du=k.du10+k.du25,pa=k.paye10+k.paye25,re=Math.max(0,k.du10-k.paye10)+Math.max(0,k.du25-k.paye25);
    T.base+=k.c.hoursBase||0; T.heures+=k.heures; T.du+=du; T.paye+=pa;
    doc.text(String(k.nom).slice(0,24),cols[0],y); doc.text(f(k.c.hoursBase)+'/sem',cols[1],y); doc.text(f(k.heures),cols[2],y); doc.text(f(du),cols[3],y); doc.text(f(pa),cols[4],y);
    if(re>0.01)doc.setTextColor(...RED); doc.text(f(re),cols[5],y); doc.setTextColor(0,0,0); doc.text(Math.round((k.cap||0.1)*100)+' %',cols[6],y); y+=5.5; });
  doc.setFont('helvetica','bold'); const RT=d.contrats.reduce((a,k)=>a+Math.max(0,k.du10-k.paye10)+Math.max(0,k.du25-k.paye25),0);
  doc.text('Total',cols[0],y); doc.text(f(T.base)+'/sem',cols[1],y); doc.text(f(T.heures),cols[2],y); doc.text(f(T.du),cols[3],y); doc.text(f(T.paye),cols[4],y); if(RT>0.01)doc.setTextColor(...RED); doc.text(f(RT),cols[5],y); doc.setTextColor(0,0,0); doc.setFont('helvetica','normal'); y+=8;
  para("Les heures complémentaires se calculent contrat par contrat (chaque employeur, son contrat). Le cumul ci-dessous sert à vérifier les durées maximales, qui s'apprécient tous employeurs confondus.");
  if(RT>0.01) para("Reste à payer : tu as 3 ans pour réclamer ces heures à chaque employeur concerné (art. L3245-1 du Code du travail).",[120,70,0]);
  // 2. Alertes
  const sem=d.semaines, s48=sem.filter(w=>w.worked>48), d12=sem.slice(-12), moy=d12.length?d12.reduce((a,w)=>a+w.worked,0)/d12.length:0;
  h1('2. Durées maximales, tous employeurs');
  para(s48.length?`${s48.length} semaine(s) au-delà de 48 h : ${s48.map(w=>{const x=new Date(w.monday+'T12:00:00');return x.getDate()+'/'+(x.getMonth()+1)+' ('+f(w.worked)+')';}).join(', ')}. Durée maximale : 48 h par semaine (art. L3121-20).`:'Aucune semaine au-delà de 48 h (art. L3121-20).',s48.length?RED:null);
  para(d12.length>=12?(moy>44?`Moyenne des 12 dernières semaines : ${f(moy)} — au-delà de 44 h (art. L3121-22).`:`Moyenne des 12 dernières semaines : ${f(moy)} (maximum 44 h, art. L3121-22).`):`Moyenne sur ${d12.length} semaine(s) : ${f(moy)} (la limite de 44 h s'apprécie sur 12 semaines consécutives, art. L3121-22).`,moy>44&&d12.length>=12?RED:null);
  para("Cumul d'emplois : un salarié ne peut pas travailler au-delà des durées maximales en cumulant plusieurs employeurs (art. L8261-1).");
  // 3. Heatmap commune
  if(sem.length){ h1('3. Heatmap commune — heures par semaine, tous contrats');
    const CELL=7,GAP=1.2; let wx=M,wy=y; doc.setFontSize(6.5);
    sem.forEach(w=>{ if(wx+CELL+GAP>M+PW){wx=M;wy+=CELL+GAP;} if(wy+CELL>pageH-20){doc.addPage();wy=20;wx=M;}
      const h=w.worked; let r=230,g=230,b=255; if(h>48){r=200;g=40;b=40;}else if(h>T.base){r=245;g=158;b=11;}else if(h>0){r=16;g=185;b=129;}
      doc.setFillColor(r,g,b); doc.rect(wx,wy,CELL,CELL,'F'); doc.setTextColor(h>0?255:90,h>0?255:90,h>0?255:90); if(h>0)doc.text(String(Math.round(h)),wx+CELL/2,wy+CELL-2,{align:'center'}); wx+=CELL+GAP; });
    y=wy+CELL+5; doc.setTextColor(0,0,0); doc.setFontSize(7);
    [[16,185,129,'Dans les contrats'],[245,158,11,'Au-delà des contrats'],[200,40,40,'Plus de 48 h']].forEach(([r,g,b,l],i)=>{const lx=M+i*50;doc.setFillColor(r,g,b);doc.rect(lx,y,5,4,'F');doc.text(l,lx+7,y+3);}); y+=10; }
  // 4. Détail par semaine
  if(sem.length){ h1('4. Détail par semaine'); const n=d.contrats.length, cw=Math.min(28,110/n);
    doc.setFillColor(...LIGHT); doc.rect(M,y-4,PW,7,'F'); doc.setFontSize(8); doc.setFont('helvetica','bold'); doc.setTextColor(...VIOLET);
    doc.text('Semaine',M+2,y); d.contrats.forEach((k,i)=>doc.text(String(k.nom).slice(0,12),M+42+i*cw,y)); doc.text('Total',M+150,y); doc.text('48 h',M+170,y); doc.setTextColor(0,0,0); y+=5; doc.setFont('helvetica','normal');
    let alt=false; sem.forEach(w=>{ checkPage(6); if(alt){doc.setFillColor(248,245,255);doc.rect(M,y-3.5,PW,5.2,'F');} alt=!alt;
      const x=new Date(w.monday+'T12:00:00'),e=new Date(x);e.setDate(e.getDate()+6);
      doc.text(`${x.getDate()}/${x.getMonth()+1} au ${e.getDate()}/${e.getMonth()+1}/${e.getFullYear()}`,M+2,y);
      d.contrats.forEach((k,i)=>doc.text(w.parContrat[k.n]?f(w.parContrat[k.n]):'--',M+42+i*cw,y));
      doc.setFont('helvetica','bold'); doc.text(f(w.worked),M+150,y); doc.setFont('helvetica','normal');
      if(w.worked>48){doc.setTextColor(...RED);doc.text('dépassé',M+168,y);doc.setTextColor(0,0,0);} y+=5.2; }); }
  // pied
  const tp=doc.getNumberOfPages(); for(let p=1;p<=tp;p++){ doc.setPage(p); doc.setFillColor(30,12,74); doc.rect(0,pageH-12,210,12,'F'); doc.setFontSize(7); doc.setTextColor(196,168,255);
    doc.text(`Page ${p}/${tp}`,M,pageH-5); doc.text('Code du travail — Légifrance. Document informatif, non juridique. Mizuki 2026.',105,pageH-5,{align:'center'}); }
  const filename=`mizuki-tous-mes-contrats-${new Date().getFullYear()}.pdf`;
  if(/Android/i.test((navigator&&navigator.userAgent)||'')){ try{const blob=doc.output('blob');doc.save(filename);if(window.M5_pdfSnackbar)window.M5_pdfSnackbar(blob,filename);}catch(e){doc.save(filename);} }
  else doc.save(filename);
};

global.M5_PdfReport = M5_PdfReport;
}(typeof window !== 'undefined' ? window : global));
