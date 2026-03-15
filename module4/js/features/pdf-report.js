/**
 * PDF Report — Export rapport légal complet
 */
(function(global){
'use strict';

class PDFReport {
  async generate(state, risks, advice, futurState){
    if(!window.jspdf&&!window.jsPDF){
      alert('jsPDF non chargé. Vérifiez la connexion internet.');
      return;
    }
    const {jsPDF}=window.jspdf||window;
    const doc=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
    const W=210, M=18;
    let y=M;

    const pdfStr=s=>(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'');
    const ln=(text,size=10,bold=false,color=[220,238,255])=>{
      doc.setFontSize(size);
      doc.setFont('helvetica',bold?'bold':'normal');
      doc.setTextColor(...color);
      doc.text(pdfStr(text),M,y);
      y+=size*.45+2;
    };
    const sep=()=>{ doc.setDrawColor(0,80,100); doc.setLineWidth(.3); doc.line(M,y,W-M,y); y+=4; };
    const box=(x,bY,w,h,r,g,b,a=1)=>{
      doc.setFillColor(r,g,b);
      doc.setDrawColor(r,g,b);
      doc.roundedRect(x,bY,w,h,2,2,'F');
    };

    // Header
    doc.setFillColor(9,14,26);
    doc.rect(0,0,W,30,'F');
    doc.setFontSize(18); doc.setFont('helvetica','bold'); doc.setTextColor(0,215,240);
    doc.text('DIGITAL TWIN ENGINE',M,13);
    doc.setFontSize(10); doc.setFont('helvetica','normal'); doc.setTextColor(110,155,185);
    doc.text(pdfStr('Rapport d\'analyse — Module 4'),M,21);
    const now=new Date().toLocaleString('fr-FR');
    doc.text(pdfStr('Généré le : '+now),W-M,21,{align:'right'});
    y=38;

    // Score global
    const s=state&&state.scores?state.scores:{};
    const sg=Math.max(0,Math.min(100,s.performance||50-Math.floor((s.fatigue||50)*.3)));
    const sgColor=sg>=70?[0,232,122]:sg>=50?[0,215,240]:sg>=30?[245,166,35]:[245,53,93];

    box(M,y,W-2*M,22,...sgColor,.8);
    doc.setFontSize(13); doc.setFont('helvetica','bold'); doc.setTextColor(5,8,16);
    doc.text(pdfStr('SCORE GLOBAL : '+sg+'/100'),M+4,y+8);
    const niveau=sg>=80?'EXCELLENT':sg>=60?'BON':sg>=40?'MOYEN':sg>=20?'FAIBLE':'CRITIQUE';
    doc.text(pdfStr('Niveau : '+niveau),M+4,y+15);
    y+=28;

    // Scores biométriques
    ln('SCORES BIOMETRIQUES',12,true,[0,215,240]);
    sep();
    const scoreNames={fatigue:'Fatigue',stress:'Stress',performance:'Performance',recovery:'Recuperation',errorRisk:'Risque erreur',overloadRisk:'Surcharge'};
    const rows=Object.entries(scoreNames);
    const colW=(W-2*M)/3;
    rows.forEach(([k,label],i)=>{
      const v=s[k]||0;
      const col=i%3, row=Math.floor(i/3);
      const x=M+col*colW, ry=y+row*14;
      doc.setFillColor(18,30,51); doc.roundedRect(x,ry,colW-3,12,1.5,1.5,'F');
      doc.setFontSize(9); doc.setFont('helvetica','normal'); doc.setTextColor(110,155,185);
      doc.text(pdfStr(label.toUpperCase()),x+3,ry+5);
      const c=v>=75?[245,53,93]:v>=50?[245,166,35]:[0,232,122];
      doc.setFontSize(14); doc.setFont('helvetica','bold'); doc.setTextColor(...c);
      doc.text(String(v),x+3,ry+11);
    });
    y+=32;

    // Risques
    ln(pdfStr('RISQUES DÉTECTÉS')+' ('+risks.length+')',12,true,[0,215,240]);
    sep();
    if(!risks.length){
      ln(pdfStr('✅ Aucun risque détecté'),10,false,[0,232,122]); y+=2;
    }
    risks.forEach(r=>{
      const rc=r.level==='CRITIQUE'?[245,53,93]:r.level==='DANGER'?[255,124,0]:[245,166,35];
      doc.setFillColor(18,30,51); doc.roundedRect(M,y,W-2*M,20,2,2,'F');
      doc.setDrawColor(...rc); doc.setLineWidth(.8); doc.line(M,y,M,y+20);
      doc.setFontSize(10); doc.setFont('helvetica','bold'); doc.setTextColor(...rc);
      doc.text(pdfStr(r.niveau||r.level+' — '+r.titre),M+4,y+6);
      doc.setFontSize(8); doc.setFont('helvetica','normal'); doc.setTextColor(110,155,185);
      doc.text(pdfStr(r.message.substring(0,90)),M+4,y+11);
      doc.setTextColor(80,110,140);
      doc.text(pdfStr(r.article),M+4,y+17);
      y+=24;
      if(y>250){ doc.addPage(); y=M; }
    });

    // Conseils
    if(y<240){
      y+=4;
      ln(pdfStr('RECOMMANDATIONS'),12,true,[0,215,240]);
      sep();
      advice.slice(0,5).forEach(a=>{
        doc.setFillColor(13,21,37); doc.roundedRect(M,y,W-2*M,14,1.5,1.5,'F');
        doc.setFontSize(9); doc.setFont('helvetica','bold'); doc.setTextColor(220,238,255);
        doc.text(pdfStr((a.emoji||'')+'  '+a.titre),M+3,y+6);
        doc.setFontSize(8); doc.setFont('helvetica','normal'); doc.setTextColor(110,155,185);
        const msg=pdfStr(a.message||'').substring(0,95);
        doc.text(msg,M+3,y+11);
        y+=17;
        if(y>260){ doc.addPage(); y=M; }
      });
    }

    // Futur state
    if(futurState&&y<240){
      y+=4;
      ln(pdfStr('ÉTAT PRÉDIT ('+futurState.days+' JOURS)'),12,true,[0,215,240]);
      sep();
      const items=[
        ['Fatigue prédite',futurState.fatigue,'%'],
        ['Stress prédit',futurState.stress,'%'],
        ['Performance',futurState.performance,'%'],
        ['Jours en alerte',futurState.alertDays?futurState.alertDays.length:0,''],
      ];
      items.forEach(([l,v,u])=>{
        doc.setFontSize(9); doc.setFont('helvetica','normal'); doc.setTextColor(110,155,185);
        doc.text(pdfStr(l+' :'),M,y);
        const c=typeof v==='number'&&v>=75?[245,53,93]:[0,215,240];
        doc.setTextColor(...c); doc.setFont('helvetica','bold');
        doc.text(String(v)+u,M+55,y);
        y+=6;
      });
    }

    // Footer
    doc.setFillColor(9,14,26); doc.rect(0,285,W,12,'F');
    doc.setFontSize(7); doc.setFont('helvetica','normal'); doc.setTextColor(45,74,97);
    doc.text(pdfStr('Digital Twin Engine — Module 4 | Ce rapport est un outil d\'aide à la décision. Il ne remplace pas un avis médical ou juridique.'),M,292);

    doc.save('digital-twin-rapport-'+new Date().toISOString().slice(0,10)+'.pdf');
    window.DTE&&window.DTE.notifications&&window.DTE.notifications.show('PDF exporté','ok','📄','Rapport enregistré');
  }
}

global.PDFReport=PDFReport;
}(typeof window!=='undefined'?window:global));