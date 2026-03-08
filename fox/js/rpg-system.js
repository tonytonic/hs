// ===== SYSTÈME RPG COMPLET =====

class RPGSystem {
    constructor() {
        this.badges = this.createBadges();
        this.leagues = this.createLeagues();
        
        console.log('🎮 Système RPG initialisé:', {
            badges: this.badges.length,
            leagues: this.leagues.length
        });
    }

    // ==========================================
    // 🏆 SYSTÈME DES 50 BADGES
    // ==========================================
    
    createBadges() {
        return [
            // === COMMUNS (20) ===
            {id: 'first_scenario', name: 'Premier Pas', rarity: 'common', icon: '📖', 
             condition: () => globalData.scenariosRead.length >= 1, xp: 50,
             desc: 'Lire ton premier scénario'},
            
            {id: 'scenarios_10', name: 'Curieux', rarity: 'common', icon: '🔍', 
             condition: () => globalData.scenariosRead.length >= 10, xp: 100,
             desc: 'Lire 10 scénarios'},
            
            {id: 'scenarios_25', name: 'Étudiant', rarity: 'common', icon: '📚', 
             condition: () => globalData.scenariosRead.length >= 25, xp: 200,
             desc: 'Lire 25 scénarios'},
            
            {id: 'scenarios_50', name: 'Appliqué', rarity: 'common', icon: '✏️', 
             condition: () => globalData.scenariosRead.length >= 50, xp: 300,
             desc: 'Lire 50 scénarios'},
            
            {id: 'scenarios_100', name: 'Assidu', rarity: 'common', icon: '📖', 
             condition: () => globalData.scenariosRead.length >= 100, xp: 500,
             desc: 'Lire 100 scénarios'},
            
            {id: 'level_5', name: 'Niveau 5', rarity: 'common', icon: '⭐', 
             condition: () => globalData.level >= 5, xp: 100,
             desc: 'Atteindre le niveau 5'},
            
            {id: 'level_10', name: 'Niveau 10', rarity: 'common', icon: '⭐⭐', 
             condition: () => globalData.level >= 10, xp: 200,
             desc: 'Atteindre le niveau 10'},
            
            {id: 'wisdom_100', name: 'Sage débutant', rarity: 'common', icon: '🧠', 
             condition: () => globalData.wisdom >= 100, xp: 150,
             desc: 'Accumuler 100 points de sagesse'},
            
            {id: 'standard_master', name: 'Classique', rarity: 'common', icon: '📊', 
             condition: () => this.countCategoryRead('standard') >= 5, xp: 100,
             desc: 'Lire 5 scénarios standard'},
            
            {id: 'intense_reader', name: 'Résistant', rarity: 'common', icon: '🔥', 
             condition: () => this.countCategoryRead('intense') >= 5, xp: 150,
             desc: 'Lire 5 scénarios intenses'},
            
            {id: 'night_worker', name: 'Noctambule', rarity: 'common', icon: '🌙', 
             condition: () => this.countCategoryRead('nuit') >= 3, xp: 150,
             desc: 'Lire 3 scénarios de nuit'},
            
            {id: 'weekend_warrior', name: 'Weekendeur', rarity: 'common', icon: '📅', 
             condition: () => this.countCategoryRead('weekend') >= 3, xp: 150,
             desc: 'Lire 3 scénarios weekend'},
            
            {id: 'wellbeing_fan', name: 'Zen', rarity: 'common', icon: '💚', 
             condition: () => this.countCategoryRead('wellbeing') >= 5, xp: 200,
             desc: 'Lire 5 scénarios bien-être'},
            
            {id: 'module1_user', name: 'Annuel', rarity: 'common', icon: '📅', 
             condition: () => this.hasModule1Data(), xp: 100,
             desc: 'Saisir des heures dans Module 1'},
            
            {id: 'module2_user', name: 'Mensuel', rarity: 'common', icon: '📆', 
             condition: () => this.hasModule2Data(), xp: 100,
             desc: 'Saisir des heures dans Module 2'},
            
            {id: 'first_week', name: 'Première Semaine', rarity: 'common', icon: '📆', 
             condition: () => this.getTotalHours() >= 35, xp: 150,
             desc: 'Accumuler 35h de travail'},
            
            {id: 'hours_100', name: 'Centenaire', rarity: 'common', icon: '⏰', 
             condition: () => this.getTotalHours() >= 100, xp: 200,
             desc: 'Accumuler 100h de travail'},
            
            {id: 'consistent', name: 'Régulier', rarity: 'common', icon: '📈', 
             condition: () => this.checkConsistency(), xp: 250,
             desc: 'Saisir des heures 5 jours d\'affilée'},
            
            {id: 'explorer', name: 'Explorateur', rarity: 'common', icon: '🗺️', 
             condition: () => this.countCategoriesRead() >= 5, xp: 200,
             desc: 'Lire scénarios de 5 catégories différentes'},
            
            {id: 'quick_learner', name: 'Rapide', rarity: 'common', icon: '⚡', 
             condition: () => this.checkQuickLearning(), xp: 150,
             desc: 'Lire 10 scénarios en moins d\'1h'},

            // === UNCOMMON (15) ===
            {id: 'scenarios_150', name: 'Studieux', rarity: 'uncommon', icon: '📚', 
             condition: () => globalData.scenariosRead.length >= 150, xp: 800,
             desc: 'Lire 150 scénarios'},
            
            {id: 'scenarios_200', name: 'Érudit', rarity: 'uncommon', icon: '🎓', 
             condition: () => globalData.scenariosRead.length >= 200, xp: 1000,
             desc: 'Lire 200 scénarios'},
            
            {id: 'level_15', name: 'Niveau 15', rarity: 'uncommon', icon: '⭐⭐⭐', 
             condition: () => globalData.level >= 15, xp: 500,
             desc: 'Atteindre le niveau 15'},
            
            {id: 'level_20', name: 'Niveau 20', rarity: 'uncommon', icon: '💫', 
             condition: () => globalData.level >= 20, xp: 800,
             desc: 'Atteindre le niveau 20'},
            
            {id: 'wisdom_250', name: 'Sage averti', rarity: 'uncommon', icon: '🧠', 
             condition: () => globalData.wisdom >= 250, xp: 400,
             desc: 'Accumuler 250 points de sagesse'},
            
            {id: 'wisdom_500', name: 'Grand Sage', rarity: 'uncommon', icon: '🧙', 
             condition: () => globalData.wisdom >= 500, xp: 800,
             desc: 'Accumuler 500 points de sagesse'},
            
            {id: 'category_master', name: 'Polyvalent', rarity: 'uncommon', icon: '🎯', 
             condition: () => this.countCategoriesRead() >= 10, xp: 500,
             desc: 'Lire scénarios de 10 catégories'},
            
            {id: 'hours_500', name: 'Travailleur', rarity: 'uncommon', icon: '💼', 
             condition: () => this.getTotalHours() >= 500, xp: 600,
             desc: 'Accumuler 500h de travail'},
            
            {id: 'overtime_tracker', name: 'Vigilant Heures Sup', rarity: 'uncommon', icon: '⏱️', 
             condition: () => this.getOvertimeHours() >= 50, xp: 500,
             desc: 'Tracker 50h supplémentaires'},
            
            {id: 'night_expert', name: 'Expert Nuit', rarity: 'uncommon', icon: '🌙', 
             condition: () => this.countCategoryRead('nuit') >= 10, xp: 600,
             desc: 'Lire 10 scénarios de nuit'},
            
            {id: 'prevention_master', name: 'Préventeur', rarity: 'uncommon', icon: '🛡️', 
             condition: () => this.countCategoryRead('prevention') >= 20, xp: 700,
             desc: 'Lire 20 scénarios prévention'},
            
            {id: 'both_modules', name: 'Double Suivi', rarity: 'uncommon', icon: '📊', 
             condition: () => this.hasModule1Data() && this.hasModule2Data(), xp: 600,
             desc: 'Utiliser Modules 1 ET 2'},
            
            {id: 'perfect_week', name: 'Semaine Parfaite', rarity: 'uncommon', icon: '✨', 
             condition: () => this.checkPerfectWeek(), xp: 500,
             desc: 'Semaine 35h exactement'},
            
            {id: 'marathon', name: 'Marathon', rarity: 'uncommon', icon: '🏃', 
             condition: () => this.checkMarathon(), xp: 800,
             desc: 'Lire 50 scénarios en 1 journée'},
            
            {id: 'league_silver', name: 'Argent Atteint', rarity: 'uncommon', icon: '🥈', 
             condition: () => this.getLeague().id >= 3, xp: 600,
             desc: 'Atteindre ligue Argent'},

            // === RARES (10) ===
            {id: 'scenarios_300', name: 'Expert', rarity: 'rare', icon: '🎖️', 
             condition: () => globalData.scenariosRead.length >= 300, xp: 2000,
             desc: 'Lire 300 scénarios'},
            
            {id: 'scenarios_400', name: 'Maître', rarity: 'rare', icon: '👑', 
             condition: () => globalData.scenariosRead.length >= 400, xp: 3000,
             desc: 'Lire 400 scénarios'},
            
            {id: 'level_30', name: 'Niveau 30', rarity: 'rare', icon: '🌟', 
             condition: () => globalData.level >= 30, xp: 2000,
             desc: 'Atteindre le niveau 30'},
            
            {id: 'level_40', name: 'Niveau 40', rarity: 'rare', icon: '💎', 
             condition: () => globalData.level >= 40, xp: 3000,
             desc: 'Atteindre le niveau 40'},
            
            {id: 'wisdom_1000', name: 'Sage Suprême', rarity: 'rare', icon: '🧙‍♂️', 
             condition: () => globalData.wisdom >= 1000, xp: 2000,
             desc: 'Accumuler 1000 points de sagesse'},
            
            {id: 'all_categories', name: 'Omniscient', rarity: 'rare', icon: '🌈', 
             condition: () => this.countCategoriesRead() >= 15, xp: 2500,
             desc: 'Lire toutes les catégories'},
            
            {id: 'hours_1000', name: 'Millénaire', rarity: 'rare', icon: '🏭', 
             condition: () => this.getTotalHours() >= 1000, xp: 2000,
             desc: 'Accumuler 1000h de travail'},
            
            {id: 'legal_expert', name: 'Juriste du Travail', rarity: 'rare', icon: '⚖️', 
             condition: () => this.checkLegalExpertise(), xp: 2500,
             desc: 'Lire tous scénarios légaux'},
            
            {id: 'league_gold', name: 'Or Atteint', rarity: 'rare', icon: '🥇', 
             condition: () => this.getLeague().id >= 6, xp: 2000,
             desc: 'Atteindre ligue Or'},
            
            {id: 'wellbeing_champion', name: 'Champion Bien-être', rarity: 'rare', icon: '💚', 
             condition: () => this.countCategoryRead('wellbeing') >= 50, xp: 2500,
             desc: 'Lire 50 scénarios bien-être'},

            // === LÉGENDAIRES (5) ===
            {id: 'scenarios_500', name: 'Légende', rarity: 'legendary', icon: '🏆', 
             condition: () => globalData.scenariosRead.length >= 500, xp: 5000,
             desc: 'Lire 500 scénarios'},
            
            {id: 'completionist', name: 'Complétionniste', rarity: 'legendary', icon: '💯', 
             condition: () => globalData.scenariosRead.length >= 600, xp: 10000,
             desc: 'Lire TOUS les 600 scénarios'},
            
            {id: 'level_50', name: 'Niveau Maximum', rarity: 'legendary', icon: '👑', 
             condition: () => globalData.level >= 50, xp: 5000,
             desc: 'Atteindre le niveau 50'},
            
            {id: 'wisdom_2000', name: 'Oracle', rarity: 'legendary', icon: '🔮', 
             condition: () => globalData.wisdom >= 2000, xp: 5000,
             desc: 'Accumuler 2000 points de sagesse'},
            
            {id: 'league_legend', name: 'Légende Ultime', rarity: 'legendary', icon: '👑', 
             condition: () => this.getLeague().id >= 9, xp: 10000,
             desc: 'Atteindre ligue Legend'}
        ];
    }

    // ==========================================
    // ⚔️ SYSTÈME DES 10 LIGUES
    // ==========================================
    
    createLeagues() {
        return [
            {id: 0, name: 'Bronze III', minXP: 0, icon: '🥉', color: '#CD7F32'},
            {id: 1, name: 'Bronze II', minXP: 500, icon: '🥉', color: '#CD7F32'},
            {id: 2, name: 'Bronze I', minXP: 1000, icon: '🥉', color: '#CD7F32'},
            {id: 3, name: 'Silver III', minXP: 2000, icon: '🥈', color: '#C0C0C0'},
            {id: 4, name: 'Silver II', minXP: 3500, icon: '🥈', color: '#C0C0C0'},
            {id: 5, name: 'Silver I', minXP: 5500, icon: '🥈', color: '#C0C0C0'},
            {id: 6, name: 'Gold III', minXP: 8000, icon: '🥇', color: '#FFD700'},
            {id: 7, name: 'Gold II', minXP: 12000, icon: '🥇', color: '#FFD700'},
            {id: 8, name: 'Gold I', minXP: 18000, icon: '🥇', color: '#FFD700'},
            {id: 9, name: 'Legend', minXP: 30000, icon: '👑', color: '#9B59B6'}
        ];
    }

    getLeague() {
        const xp = globalData.xp;
        for (let i = this.leagues.length - 1; i >= 0; i--) {
            if (xp >= this.leagues[i].minXP) {
                return this.leagues[i];
            }
        }
        return this.leagues[0];
    }

    getNextLeague() {
        const current = this.getLeague();
        const nextIndex = current.id + 1;
        return nextIndex < this.leagues.length ? this.leagues[nextIndex] : null;
    }

    // ==========================================
    // 📊 CALCULS XP
    // ==========================================
    
    getXPForNextLevel() {
        return Math.floor(100 * Math.pow(1.5, globalData.level - 1));
    }

    getXPProgress() {
        const needed = this.getXPForNextLevel();
        return Math.min(100, (globalData.xp / needed) * 100);
    }

    // ==========================================
    // 🎯 CONDITIONS BADGES
    // ==========================================
    
    countCategoryRead(category) {
        if (!window.scenarioSystemFox) return 0;
        return globalData.scenariosRead.filter(id => {
            const scenario = scenarioSystemFox.getScenario(id);
            return scenario && scenario.category === category;
        }).length;
    }

    countCategoriesRead() {
        if (!window.scenarioSystemFox) return 0;
        const categories = new Set();
        globalData.scenariosRead.forEach(id => {
            const scenario = scenarioSystemFox.getScenario(id);
            if (scenario) categories.add(scenario.category);
        });
        return categories.size;
    }

    hasModule1Data() {
        if (!window.dataBridge) return false;
        const data = dataBridge.readModule1Data();
        return data && data.stats && data.stats.totalHours > 0;
    }

    hasModule2Data() {
        if (!window.dataBridge) return false;
        const data = dataBridge.readModule2Data();
        return data && data.stats && data.stats.totalHours > 0;
    }

    getTotalHours() {
        if (!window.dataBridge) return 0;
        const data = dataBridge.getCombinedData();
        return data && data.combined ? (data.combined.totalHours || 0) : 0;
    }

    getOvertimeHours() {
        if (!window.dataBridge) return 0;
        const data = dataBridge.readModule1Data();
        return data && data.stats ? (data.stats.totalOvertime || 0) : 0;
    }

    checkConsistency() {
        // Simulé - pourrait vérifier vraies dates
        return this.hasModule1Data() || this.hasModule2Data();
    }

    checkQuickLearning() {
        // Simulé
        return globalData.scenariosRead.length >= 10;
    }

    checkPerfectWeek() {
        const hours = this.getTotalHours();
        return hours >= 35 && hours <= 35.5;
    }

    checkMarathon() {
        // Simulé
        return globalData.scenariosRead.length >= 50;
    }

    checkLegalExpertise() {
        return this.countCategoryRead('limite') >= 5;
    }

    // ==========================================
    // 🏆 VÉRIFICATION & DÉBLOCAGE
    // ==========================================
    
    checkBadges() {
        const newBadges = [];
        
        this.badges.forEach(badge => {
            if (!globalData.unlockedBadges.includes(badge.id)) {
                if (badge.condition()) {
                    globalData.unlockedBadges.push(badge.id);
                    globalData.xp += badge.xp;
                    newBadges.push(badge);
                }
            }
        });

        if (newBadges.length > 0) {
            saveGlobalData();
            newBadges.forEach(b => {
                showNotification(`🏆 Badge débloqué : ${b.name} (+${b.xp} XP)`, 'success');
            });
            this.checkLevelUp();
        }

        return newBadges;
    }

    checkLevelUp() {
        let leveled = false;
        let xpNeeded = this.getXPForNextLevel();
        
        while (globalData.xp >= xpNeeded) {
            globalData.level++;
            leveled = true;
            xpNeeded = this.getXPForNextLevel();
        }

        if (leveled) {
            saveGlobalData();
            showNotification(`🎉 NIVEAU ${globalData.level} !`, 'success');
            updateGlobalStats();
            updateDashboard();
        }
    }

    // ==========================================
    // 📊 STATS
    // ==========================================
    
    getStats() {
        const badgesByRarity = {
            common: this.badges.filter(b => b.rarity === 'common' && globalData.unlockedBadges.includes(b.id)).length,
            uncommon: this.badges.filter(b => b.rarity === 'uncommon' && globalData.unlockedBadges.includes(b.id)).length,
            rare: this.badges.filter(b => b.rarity === 'rare' && globalData.unlockedBadges.includes(b.id)).length,
            legendary: this.badges.filter(b => b.rarity === 'legendary' && globalData.unlockedBadges.includes(b.id)).length
        };

        return {
            level: globalData.level,
            xp: globalData.xp,
            xpNeeded: this.getXPForNextLevel(),
            xpProgress: this.getXPProgress(),
            wisdom: globalData.wisdom,
            badges: globalData.unlockedBadges.length,
            badgesTotal: this.badges.length,
            badgesByRarity: badgesByRarity,
            league: this.getLeague(),
            nextLeague: this.getNextLeague()
        };
    }
}

// Instance globale
const rpgSystem = new RPGSystem();
window.rpgSystem = rpgSystem;

console.log('🎮 Système RPG prêt');
