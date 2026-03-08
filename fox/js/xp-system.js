// ===== XP SYSTEM =====
// Gère le système d'expérience et de progression

class XPSystem {
    constructor() {
        this.currentXP = 0;
        this.level = 1;
        this.xpPerHour = 100; // 1 heure sup = 100 XP
        this.loadFromStorage();
    }

    // Calculer XP nécessaire pour le prochain niveau
    // Courbe progressive douce : débutant facile, vétéran exigeant
    // Objectifs : lv21 à ~220h (1 an contingent max) · lv50 à ~640h (3 ans)
    // Formule : 950 + 14 * level → lv2=964 XP, lv21=1230 XP, lv50=1650 XP
    getXPForNextLevel(level) {
        return Math.floor(950 + 14 * level);
    }

    // Calculer le niveau actuel basé sur l'XP total
    calculateLevel() {
        let level = 1;
        let totalXPRequired = 0;
        
        while (totalXPRequired + this.getXPForNextLevel(level) <= this.currentXP) {
            totalXPRequired += this.getXPForNextLevel(level);
            level++;
        }
        
        return level;  // Pas de cap — Légende = progression infinie
    }

    // Ajouter de l'XP (basé sur les heures supplémentaires)
    addXP(hours) {
        const xpGained = Math.floor(hours * this.xpPerHour);
        const oldLevel = this.level;
        
        this.currentXP += xpGained;
        this.level = this.calculateLevel();
        
        this.saveToStorage();
        
        // Retourner les informations de progression
        return {
            xpGained: xpGained,
            leveledUp: this.level > oldLevel,
            oldLevel: oldLevel,
            newLevel: this.level,
            totalXP: this.currentXP
        };
    }

    // Obtenir l'XP actuel pour la barre de progression
    getCurrentLevelProgress() {
        let totalXPForCurrentLevel = 0;
        
        for (let i = 1; i < this.level; i++) {
            totalXPForCurrentLevel += this.getXPForNextLevel(i);
        }
        
        const xpInCurrentLevel = this.currentXP - totalXPForCurrentLevel;
        const xpNeededForNextLevel = this.getXPForNextLevel(this.level);
        
        return {
            current: xpInCurrentLevel,
            needed: xpNeededForNextLevel,
            percentage: (xpInCurrentLevel / xpNeededForNextLevel) * 100
        };
    }

    // Sauvegarder dans localStorage
    saveToStorage() {
        localStorage.setItem('rpg_xp', this.currentXP.toString());
        localStorage.setItem('rpg_level', this.level.toString());
    }

    // Charger depuis localStorage
    loadFromStorage() {
        const savedXP = localStorage.getItem('rpg_xp');
        const savedLevel = localStorage.getItem('rpg_level');
        
        if (savedXP) {
            this.currentXP = parseInt(savedXP);
        }
        if (savedLevel) {
            this.level = parseInt(savedLevel);
        }
    }

    // Réinitialiser les données
    reset() {
        this.currentXP = 0;
        this.level = 1;
        this.saveToStorage();
    }

    // Obtenir des statistiques complètes
    getStats() {
        const progress = this.getCurrentLevelProgress();
        
        return {
            level: this.level,
            totalXP: this.currentXP,
            currentLevelXP: progress.current,
            nextLevelXP: progress.needed,
            progressPercentage: progress.percentage,
            totalHoursEquivalent: this.currentXP / this.xpPerHour
        };
    }
}

// Fonction utilitaire pour formater les grands nombres
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Export pour utilisation globale
if (typeof module !== 'undefined' && module.exports) {
    module.exports = XPSystem;
}
