/**
 * IMPORT-EXPORT M6 — JSON multi-années + RGPD export
 * Format : { version:'M6-1', regime, years:{ YYYY: {contract,data,moods,validations} }, log }
 */
'use strict';

(function(global) {

const M6_ImportExport = {

  // ── Export ────────────────────────────────────────────────────
  export(regime) {
    const years = M6_Storage.getAllYears(regime);
    const dump = {
      version:    'M6-1',
      regime,
      exportedAt: new Date().toISOString(),
      contract:   M6_Storage.getContract(regime),
      years: {}
    };
    for (const y of years) {
      dump.years[y] = {
        data:        M6_Storage.getData(regime, y),
        moods:       M6_Storage.getMoods(regime, y),
        validations: M6_Storage.getValidations(regime, y),
        deplacements:M6_Storage.getDeplacements(regime, y),
        log:         M6_Storage.getLog(regime, y)
      };
    }
    dump.entretiens = M6_Storage.getEntretiens(regime);

    const blob = new Blob([JSON.stringify(dump, null, 2)], {type:'application/json'});
    const fn   = `M6_${regime}_${new Date().toISOString().slice(0,10)}.json`;

    // Partage natif (mobile) ou téléchargement
    if (navigator.canShare && navigator.canShare({files:[new File([blob], fn)]})) {
      navigator.share({ files:[new File([blob],fn)], title:'Sauvegarde M6 Cadres' })
        .catch(() => this._download(blob, fn));
    } else {
      this._download(blob, fn);
    }

    // Marquer la date de sauvegarde fichier
    const year = M6_Storage.getActiveYear();
    M6_Storage.markFileSave(regime, year);
    M6_toast('💾 Sauvegarde exportée');
  },

  // ── Import ────────────────────────────────────────────────────
  import(regime, onSuccess) {
    const input = document.createElement('input');
    input.type  = 'file';
    input.accept = '.json,application/json';
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const obj = JSON.parse(ev.target.result);
          this._loadDump(regime, obj, onSuccess);
        } catch(_) {
          M6_toast('❌ Fichier JSON invalide', 'error');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  },

  _loadDump(regime, obj, onSuccess) {
    if (obj.version !== 'M6-1') {
      if (!confirm(`Format inconnu (${obj.version||'?'}). Tenter quand même l'import ?`)) return;
    }
    if (obj.regime && obj.regime !== regime) {
      if (!confirm(`Ce fichier est pour le régime "${obj.regime}". Importer quand même dans "${regime}" ?`)) return;
    }

    // Contrat
    if (obj.contract) M6_Storage.setContract(regime, obj.contract);

    // Années
    let imported = 0;
    for (const [y, yData] of Object.entries(obj.years || {})) {
      if (yData.data)        localStorage.setItem(`M6_${regime}_${y}_DATA`,        JSON.stringify(yData.data));
      if (yData.moods)       localStorage.setItem(`M6_${regime}_${y}_MOODS`,       JSON.stringify(yData.moods));
      if (yData.validations) localStorage.setItem(`M6_${regime}_${y}_VALID`,       JSON.stringify(yData.validations));
      if (yData.deplacements)localStorage.setItem(`M6_${regime}_${y}_DEPLACEMENT`, JSON.stringify(yData.deplacements));
      imported++;
    }
    if (obj.entretiens) localStorage.setItem(`M6_${regime}_ENTRETIENS`, JSON.stringify(obj.entretiens));

    M6_toast(`✅ Import réussi — ${imported} exercice(s) chargé(s)`);
    if (onSuccess) onSuccess();
  },

  // ── Export RGPD complet ───────────────────────────────────────
  exportRGPD() {
    const dump = M6_Storage.exportAll();
    const blob = new Blob([JSON.stringify(dump, null, 2)], {type:'application/json'});
    this._download(blob, `M6_export_RGPD_${new Date().toISOString().slice(0,10)}.json`);
    M6_toast('📋 Export RGPD généré');
  },

  _download(blob, fn) {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href    = url; a.download = fn;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // ── Export CSV SIRH (compatible Sage, Cegid, ADP) ─────────────
  exportCSV(regime, year) {
    const data     = M6_Storage.getData(regime, year);
    const contract = M6_Storage.getContract(regime) || {};
    const feries   = M6_Feries?.getSet(year) || new Set();

    const typeLabel = {
      travail:'TRAVAIL', rtt:'RTT', cp:'CONGE', ferie:'FERIE',
      repos:'REPOS', rachat:'RACHAT', demi:'DEMI', maladie:'MALADIE',
      maternite:'MATERNITE', css:'CSS', formation:'FORMATION',
      cet:'CET', astreinte:'ASTREINTE', teletravail:'TELETRAVAIL'
    };

    const header = ['Date','Jour','Type','Amplitude_debut','Amplitude_fin','Deplacement','Note','Valeur_jours'];
    const rows = Object.entries(data)
      .filter(([k]) => k.startsWith(String(year)))
      .sort(([a],[b]) => a.localeCompare(b))
      .map(([dk, v]) => {
        const d = new Date(dk + 'T12:00:00');
        const jours = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][d.getDay()];
        const t = v.type || 'travail';
        const val = t==='demi' ? 0.5 : (t==='travail'||t==='rachat'||t==='teletravail') ? 1 : 0;
        return [
          dk, jours,
          typeLabel[t] || t.toUpperCase(),
          v.debut || '',
          v.fin   || '',
          v.deplacement ? 'OUI' : 'NON',
          (v.note || '').replace(/[^\w\s\-\.]/g, ' ').substring(0, 100),
          val
        ];
      });

    const csvLines = [
      `# M6 Cadres - Export SIRH - ${(contract.nomCadre||contract.nom||'N/A')} - ${year}`,
      `# CCN: ${contract.ccnLabel||'N/A'} - Forfait: ${contract.plafond||218}j`,
      `# Genere le: ${new Date().toLocaleString('fr-FR')}`,
      '',
      header.join(';'),
      ...rows.map(r => r.join(';'))
    ];

    const blob = new Blob([csvLines.join('\n')], { type:'text/csv;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `SIRH_${regime}_${year}_${(contract.nomCadre||'cadre').replace(/\s+/g,'_').toLowerCase()}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    M6_toast?.('Export CSV SIRH genere');
  }
};


global.M6_ImportExport = M6_ImportExport;

})(window);
