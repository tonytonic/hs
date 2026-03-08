// ===== RTF EXPORT SYSTEM =====
// Système d'export au format Rich Text Format

class RTFExportSystem {
    constructor() {
        this.fontTable = '{\\fonttbl{\\f0\\fswiss Helvetica;}{\\f1\\fmodern Courier;}}';
        this.colorTable = '{\\colortbl;\\red255\\green107\\blue53;\\red78\\green205\\blue196;\\red0\\green0\\blue0;}';
    }

    // Exporter un rapport complet en RTF
    exportFullReport() {
        const report = this.generateFullReport();
        this.downloadRTF(report, `rapport_complet_${this.getDateString()}.rtf`);
        
        return {
            success: true,
            message: 'Rapport RTF généré avec succès'
        };
    }

    // Exporter le Module 1 en RTF
    exportModule1Report() {
        const report = this.generateModule1Report();
        this.downloadRTF(report, `module1_mensuel_${this.getDateString()}.rtf`);
        
        return {
            success: true,
            message: 'Rapport Module 1 exporté'
        };
    }

    // Exporter le Module 2 en RTF
    exportModule2Report() {
        const report = this.generateModule2Report();
        this.downloadRTF(report, `module2_annuel_${this.getDateString()}.rtf`);
        
        return {
            success: true,
            message: 'Rapport Module 2 exporté'
        };
    }

    // Exporter l'historique de progression
    exportProgressReport() {
        const report = this.generateProgressReport();
        this.downloadRTF(report, `progression_rpg_${this.getDateString()}.rtf`);
        
        return {
            success: true,
            message: 'Rapport de progression exporté'
        };
    }

    // Générer le rapport complet
    generateFullReport() {
        const m1 = moduleReader.getModule1Summary();
        const m2 = moduleReader.getModule2Summary();
        const stats = xpSystem.getStats();
        const league = leagueSystem.getCurrentLeague(xpSystem.currentXP);

        let rtf = this.getRTFHeader('RAPPORT COMPLET - MODULE 3 RPG');

        // Section 1: Informations générales
        rtf += this.addSection('INFORMATIONS GÉNÉRALES');
        rtf += this.addParagraph(`Date du rapport: ${new Date().toLocaleDateString('fr-FR')}`);
        rtf += this.addParagraph(`Joueur: ${gameState.player.name}`);
        rtf += this.addParagraph(`Niveau: ${stats.level}`);
        rtf += this.addParagraph(`Ligue: ${league.name} ${league.icon}`);
        rtf += this.addParagraph(`XP Total: ${stats.totalXP.toLocaleString('fr-FR')}`);

        // Section 2: Module 1 - Mensuel
        rtf += this.addSection('MODULE 1 - SUIVI MENSUEL');
        rtf += this.addParagraph(`Mois: ${m1.monthName} ${m1.year}`);
        rtf += this.addParagraph(`Heures totales: ${m1.totalHours.toFixed(1)}h`);
        rtf += this.addParagraph(`Moyenne hebdomadaire: ${m1.weeklyAverage}h`);
        rtf += this.addParagraph(`Heures supplémentaires: ${m1.overtimeHours.toFixed(1)}h`);
        rtf += this.addParagraph(`Conformité: ${m1.isCompliant ? 'OUI' : 'NON'}`);
        
        if (m1.alerts.length > 0) {
            rtf += this.addSubSection('Alertes:');
            m1.alerts.forEach(alert => {
                rtf += this.addBullet(alert.message);
            });
        }

        // Section 3: Module 2 - Annuel
        rtf += this.addSection('MODULE 2 - SUIVI ANNUEL');
        rtf += this.addParagraph(`Année: ${m2.year}`);
        rtf += this.addParagraph(`Heures totales: ${m2.totalHours.toFixed(1)}h`);
        rtf += this.addParagraph(`Contingent utilisé: ${m2.contingent.used.toFixed(1)}h / ${m2.contingent.total}h`);
        rtf += this.addParagraph(`Contingent restant: ${m2.contingent.remaining.toFixed(1)}h`);
        rtf += this.addParagraph(`Taux d'utilisation: ${m2.contingent.percentage.toFixed(1)}%`);
        rtf += this.addParagraph(`Conformité: ${m2.isCompliant ? 'OUI' : 'NON'}`);

        if (m2.alerts.length > 0) {
            rtf += this.addSubSection('Alertes:');
            m2.alerts.forEach(alert => {
                rtf += this.addBullet(alert.message);
            });
        }

        // Section 4: Répartition des heures supplémentaires
        rtf += this.addSection('RÉPARTITION DES HEURES SUPPLÉMENTAIRES');
        rtf += this.addParagraph(`Heures à +25%: ${m2.breakdown.at25}h`);
        rtf += this.addParagraph(`Heures à +50%: ${m2.breakdown.at50}h`);
        rtf += this.addParagraph(`Total heures sup: ${m2.breakdown.totalOvertime}h`);

        // Section 5: Progression RPG
        rtf += this.addSection('PROGRESSION RPG');
        const badgeStats = badgeSystem.getBadgeStats();
        const scenarioStats = scenarioSystemAI.getStats();
        const questStats = questSystem.getStats();

        rtf += this.addParagraph(`Badges débloqués: ${badgeStats.unlocked} / 50`);
        rtf += this.addParagraph(`Scénarios lus: ${scenarioStats.read} / 600`);
        rtf += this.addParagraph(`Quêtes complétées: ${questStats.completed}`);
        rtf += this.addParagraph(`Quêtes actives: ${questStats.active}`);

        // Section 6: Références légales
        rtf += this.addSection('RÉFÉRENCES LÉGALES');
        rtf += this.addParagraph('Code du travail français:');
        rtf += this.addBullet('Durée légale: 35h par semaine');
        rtf += this.addBullet('Durée maximale: 48h par semaine');
        rtf += this.addBullet('Contingent annuel: 220h');
        rtf += this.addBullet('Majorations: +25% (8 premières HS), +50% (au-delà)');

        rtf += this.getRTFFooter();
        return rtf;
    }

    // Générer le rapport Module 1
    generateModule1Report() {
        const m1 = moduleReader.getModule1Summary();
        
        let rtf = this.getRTFHeader('RAPPORT MENSUEL - MODULE 1');
        
        rtf += this.addSection(`RAPPORT DU MOIS: ${m1.monthName.toUpperCase()} ${m1.year}`);
        rtf += this.addParagraph(`Date du rapport: ${new Date().toLocaleDateString('fr-FR')}`);
        
        rtf += this.addSubSection('Synthèse:');
        rtf += this.addParagraph(`Heures travaillées: ${m1.totalHours.toFixed(1)}h`);
        rtf += this.addParagraph(`Moyenne hebdomadaire: ${m1.weeklyAverage}h`);
        rtf += this.addParagraph(`Heures supplémentaires: ${m1.overtimeHours.toFixed(1)}h`);
        
        rtf += this.addSubSection('Conformité:');
        rtf += this.addParagraph(m1.isCompliant ? 
            'Ce mois respecte les limites légales.' : 
            'ATTENTION: Ce mois dépasse les limites légales!');
        
        if (m1.alerts.length > 0) {
            rtf += this.addSubSection('Alertes:');
            m1.alerts.forEach(alert => {
                rtf += this.addBullet(`[${alert.level.toUpperCase()}] ${alert.message}`);
            });
        }
        
        rtf += this.getRTFFooter();
        return rtf;
    }

    // Générer le rapport Module 2
    generateModule2Report() {
        const m2 = moduleReader.getModule2Summary();
        
        let rtf = this.getRTFHeader('RAPPORT ANNUEL - MODULE 2');
        
        rtf += this.addSection(`RAPPORT DE L'ANNÉE: ${m2.year}`);
        rtf += this.addParagraph(`Date du rapport: ${new Date().toLocaleDateString('fr-FR')}`);
        
        rtf += this.addSubSection('Synthèse annuelle:');
        rtf += this.addParagraph(`Heures totales: ${m2.totalHours.toFixed(1)}h`);
        rtf += this.addParagraph(`Moyenne mensuelle: ${m2.monthlyAverage}h`);
        
        rtf += this.addSubSection('Contingent:');
        rtf += this.addParagraph(`Utilisé: ${m2.contingent.used.toFixed(1)}h`);
        rtf += this.addParagraph(`Restant: ${m2.contingent.remaining.toFixed(1)}h`);
        rtf += this.addParagraph(`Taux: ${m2.contingent.percentage.toFixed(1)}%`);
        
        rtf += this.addSubSection('Projection:');
        rtf += this.addParagraph(`Projection annuelle: ${m2.projectedAnnual.value}h`);
        rtf += this.addParagraph(`Mensuel nécessaire: ${m2.projectedAnnual.monthlyNeeded}h/mois`);
        
        rtf += this.addSubSection('Répartition des HS:');
        rtf += this.addParagraph(`+25%: ${m2.breakdown.at25}h`);
        rtf += this.addParagraph(`+50%: ${m2.breakdown.at50}h`);
        
        rtf += this.getRTFFooter();
        return rtf;
    }

    // Générer le rapport de progression
    generateProgressReport() {
        const stats = xpSystem.getStats();
        const league = leagueSystem.getCurrentLeague(xpSystem.currentXP);
        const badgeStats = badgeSystem.getBadgeStats();
        const scenarioStats = scenarioSystemAI.getStats();
        
        let rtf = this.getRTFHeader('RAPPORT DE PROGRESSION RPG');
        
        rtf += this.addSection('STATISTIQUES GÉNÉRALES');
        rtf += this.addParagraph(`Joueur: ${gameState.player.name}`);
        rtf += this.addParagraph(`Titre: ${gameState.player.title}`);
        rtf += this.addParagraph(`Niveau: ${stats.level}`);
        rtf += this.addParagraph(`Ligue: ${league.name}`);
        rtf += this.addParagraph(`XP Total: ${stats.totalXP.toLocaleString('fr-FR')}`);
        
        rtf += this.addSection('BADGES');
        rtf += this.addParagraph(`Total débloqués: ${badgeStats.unlocked} / 50`);
        rtf += this.addParagraph(`Communs: ${badgeStats.byRarity.common.unlocked} / ${badgeStats.byRarity.common.total}`);
        rtf += this.addParagraph(`Rares: ${badgeStats.byRarity.rare.unlocked} / ${badgeStats.byRarity.rare.total}`);
        rtf += this.addParagraph(`Épiques: ${badgeStats.byRarity.epic.unlocked} / ${badgeStats.byRarity.epic.total}`);
        rtf += this.addParagraph(`Légendaires: ${badgeStats.byRarity.legendary.unlocked} / ${badgeStats.byRarity.legendary.total}`);
        
        rtf += this.addSection('SCÉNARIOS');
        rtf += this.addParagraph(`Lus: ${scenarioStats.read} / 600`);
        rtf += this.addParagraph(`Favoris: ${scenarioStats.favorites}`);
        rtf += this.addParagraph(`Générés par IA: ${scenarioStats.aiGenerated}`);
        
        rtf += this.getRTFFooter();
        return rtf;
    }

    // ===== FONCTIONS RTF =====

    getRTFHeader(title) {
        return `{\\rtf1\\ansi\\deff0 ${this.fontTable}${this.colorTable}\n` +
               `{\\info{\\title ${title}}}\n` +
               `{\\header\\pard\\qc\\fs16 ${title}\\par}\n` +
               `\\pard\\qc\\fs32\\b ${title}\\b0\\fs24\\par\\par\n`;
    }

    getRTFFooter() {
        return `\\par\\pard\\qc\\fs16\\i Généré par Module 3 RPG - ${new Date().toLocaleDateString('fr-FR')}\\i0\\par\n}`;
    }

    addSection(title) {
        return `\\par\\pard\\fs28\\b\\cf1 ${title}\\b0\\cf0\\fs24\\par\n`;
    }

    addSubSection(title) {
        return `\\par\\pard\\fs24\\b ${title}\\b0\\par\n`;
    }

    addParagraph(text) {
        return `\\par\\pard ${text}\\par\n`;
    }

    addBullet(text) {
        return `\\par\\pard\\li720 \\bullet  ${text}\\par\n`;
    }

    // Télécharger le fichier RTF
    downloadRTF(content, filename) {
        const blob = new Blob([content], { type: 'application/rtf' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    // Obtenir la date formatée
    getDateString() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    }
}

// Export global
const rtfExport = new RTFExportSystem();
