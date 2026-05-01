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
    doc.text('🦊 Mizuki — Rapport Heures Complémentaires',M,12);
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
    row('Durée contractuelle',`${contract.hoursBase}h/semaine`);
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

    // ══ SECTION 2 : BILAN ════════════════════════════════════════
    h1('2. Bilan de la période');
    if(mode==='ANNUEL' && analysis && analysis.annuelResult) {
      const ar=analysis.annuelResult;
      row('Exercice',`${ar.debutEx} → ${ar.finEx}`);
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
      [[16,185,129,'Conforme'],[245,158,11,'Heures comp.'],[220,80,80,'≥35h']].forEach(([r,g,b,lbl],i)=>{
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
      doc.setTextColor(0,0,0); y+=4;
      doc.setFontSize(8); doc.setFont('helvetica','normal');
      let alt=false;
      weeks.forEach(w=>{
        if(w.worked===null||w.worked===undefined) return;
        checkPage(6);
        const wh=w.worked||0;
        const diff=Math.max(0,wh-contract.hoursBase);
        const thr=contract.hoursBase*(contract.threshold||0.10);
        const c1=Math.min(diff,thr);
        const c2=Math.max(0,diff-thr);
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
          doc.text(`+${diff.toFixed(1)}h`,cols[2],y);
          doc.text(c1>0?`${c1.toFixed(1)}h`:'--',cols[3],y);
          doc.text(c2>0?`${c2.toFixed(1)}h`:'--',cols[4],y);
          doc.text(montant>0?`${montant.toFixed(2)}€`:'--',cols[5],y);
          doc.setTextColor(wh>=35?180:0,0,0);
          doc.text(wh>=35?'⚠️ 35h':' ',cols[6],y);
          doc.setTextColor(0,0,0);
        } else {
          doc.setTextColor(180,180,180);
          ['--','--','--','--','✓'].forEach((t,i)=>doc.text(t,cols[i+2],y));
          doc.setTextColor(0,0,0);
        }
        y+=5.5;
      });
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
    doc.save(`heures-complementaires-mizuki-${yr}.pdf`);
  }
};

global.M5_PdfReport = M5_PdfReport;
}(typeof window !== 'undefined' ? window : global));
