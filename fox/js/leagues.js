// ===== LEAGUE SYSTEM =====
// Gère les 10 ligues de progression

class LeagueSystem {
    constructor() {
        this.leagues = [
            { id: 1, img: '../images/Bronze.PNG', name: 'Bronze', icon: '\uD83E\uDD49', minXP: 0, minLevel: 1, maxLevel: 5, color: '#CD7F32' },
            { id: 2, img: '../images/Argent.PNG', name: 'Argent', icon: '\uD83E\uDD48', minXP: 5000, minLevel: 6, maxLevel: 10, color: '#C0C0C0' },
            { id: 3, img: '../images/Or.PNG', name: 'Or', icon: '\uD83E\uDD47', minXP: 15000, minLevel: 11, maxLevel: 15, color: '#FFD700' },
            { id: 4, img: '../images/Platine.PNG', name: 'Platine', icon: '\uD83D\uDC8E', minXP: 30000, minLevel: 16, maxLevel: 20, color: '#E5E4E2' },
            { id: 5, img: '../images/Diamant.PNG', name: 'Diamant', icon: '\uD83D\uDCA0', minXP: 50000, minLevel: 21, maxLevel: 25, color: '#B9F2FF' },
            { id: 6, img: '../images/Maitre.PNG', name: 'Maître', icon: '\uD83C\uDF1F', minXP: 70000, minLevel: 26, maxLevel: 30, color: '#FF6B9D' },
            { id: 7, img: '../images/Grand_Maitre.PNG', name: 'Grand Maître', icon: '\uD83D\uDC51', minXP: 85000, minLevel: 31, maxLevel: 35, color: '#FFD700' },
            { id: 8, img: '../images/Champion.PNG', name: 'Champion', icon: '\uD83D\uDD25', minXP: 95000, minLevel: 36, maxLevel: 40, color: '#FF4500' },
            { id: 9, img: '../images/Heros.PNG', name: 'Héros', icon: '\u26A1', minXP: 105000, minLevel: 41, maxLevel: 45, color: '#00BFFF' },
            { id: 10, img: '../images/Legende.PNG', name: 'Légende', icon: '\uD83C\uDFC6', minXP: 110000, minLevel: 46, maxLevel: Infinity, color: '#FF00FF' }
        ];
    }

    // Obtenir la ligue actuelle basée sur l'XP
    getCurrentLeague(totalXP) {
        // Priorité au niveau (toutes les 5 lvl) — fallback XP si xpSystem absent
        const level = (typeof xpSystem !== 'undefined' && xpSystem.level) ? xpSystem.level : null;
        let currentLeague = this.leagues[0];
        
        for (let league of this.leagues) {
            if (level !== null) {
                // Basé sur le niveau : Bronze 1-5, Argent 6-10, Or 11-15…
                if (level >= league.minLevel) currentLeague = league;
                else break;
            } else {
                // Fallback XP si pas de xpSystem
                if (totalXP >= league.minXP) currentLeague = league;
                else break;
            }
        }
        
        return currentLeague;
    }

    // Obtenir la prochaine ligue
    getNextLeague(totalXP) {
        const current = this.getCurrentLeague(totalXP);
        const currentIndex = this.leagues.findIndex(l => l.id === current.id);
        
        if (currentIndex < this.leagues.length - 1) {
            return this.leagues[currentIndex + 1];
        }
        
        return null; // Déjà à la ligue maximale
    }

    // Calculer la progression vers la prochaine ligue
    getLeagueProgress(totalXP) {
        const current = this.getCurrentLeague(totalXP);
        const next = this.getNextLeague(totalXP);
        
        if (!next) {
            // Légende : progression continue dans la ligue (pas de plafond)
            const level = (typeof xpSystem !== 'undefined' && xpSystem.level) ? xpSystem.level : 1;
            const levelsInLegend = 5; // tranche affichée de 5 en 5
            const levelInSlice = ((level - current.minLevel) % levelsInLegend);
            const pct = Math.round((levelInSlice / levelsInLegend) * 100);
            return {
                current: current,
                next: null,
                xpInCurrentLeague: totalXP - current.minXP,
                xpNeededForNext: 0,
                percentage: pct,
                isMaxLeague: true,
                legendLevel: level - current.minLevel + 1
            };
        }
        
        // Progression basée sur le niveau dans la tranche de 5 niveaux
        const level = (typeof xpSystem !== 'undefined' && xpSystem.level) ? xpSystem.level : 1;
        const levelsInLeague = (current.maxLevel - current.minLevel + 1) || 5;
        const levelInLeague = Math.max(0, level - current.minLevel);
        const percentage = Math.min(100, (levelInLeague / levelsInLeague) * 100);
        const levelsRemaining = Math.max(0, next.minLevel - level);
        
        return {
            current: current,
            next: next,
            xpInCurrentLeague: totalXP - current.minXP,
            xpNeededForNext: next.minXP - current.minXP,
            xpRemainingForNext: next.minXP - totalXP,
            levelsRemaining: levelsRemaining,
            percentage: percentage,
            isMaxLeague: false
        };
    }

    // Obtenir toutes les ligues
    getAllLeagues() {
        return this.leagues;
    }

    // Formater l'affichage de la ligue
    formatLeagueDisplay(league) {
        return `${league.icon} ${league.name}`;
    }

    // Obtenir un message motivant basé sur la ligue
    getLeagueMessage(league) {
        const messages = {
            'Bronze': 'Bienvenue ! Chaque grande aventure commence ici ! 🌱',
            'Argent': 'Tu progresses bien ! Continue comme ça ! 🌟',
            'Or': 'Excellent travail ! Tu brilles de mille feux ! ✨',
            'Platine': 'Impressionnant ! Tu es un vrai professionnel ! 💪',
            'Diamant': 'Exceptionnel ! Peu de gens atteignent ce niveau ! 💎',
            'Maître': 'Tu maîtrises ton art ! Incroyable parcours ! 🎯',
            'Grand Maître': 'Un statut d\'élite ! Tu es remarquable ! 🌟',
            'Champion': 'Champion parmi les champions ! 🏆',
            'Héros': 'Une légende vivante ! Respect absolu ! ⚡',
            'Légende': 'Le sommet de la gloire ! Tu es une LÉGENDE ! 👑'
        };
        
        return messages[league.name] || 'Continue ton excellent travail !';
    }

    // Calculer les récompenses par ligue
    getLeagueRewards(league) {
        const rewards = {
            'Bronze': { badges: 5, scenarios: 10 },
            'Argent': { badges: 8, scenarios: 15 },
            'Or': { badges: 12, scenarios: 20 },
            'Platine': { badges: 18, scenarios: 30 },
            'Diamant': { badges: 25, scenarios: 40 },
            'Maître': { badges: 32, scenarios: 50 },
            'Grand Maître': { badges: 38, scenarios: 60 },
            'Champion': { badges: 43, scenarios: 70 },
            'Héros': { badges: 47, scenarios: 80 },
            'Légende': { badges: 50, scenarios: 100 }
        };
        
        return rewards[league.name] || { badges: 0, scenarios: 0 };
    }
}

// Export pour utilisation globale
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LeagueSystem;
}
