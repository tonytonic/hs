// ===== COMBAT SYSTEM =====
// Système de combat tour par tour contre les violations légales

class CombatSystem {
    constructor() {
        this.enemies = this.initializeEnemies();
        this.currentBattle = null;
        this.battleHistory = this.loadBattleHistory();
        this.combatLog = [];
    }

    initializeEnemies() {
        return [
            // VIOLATIONS DE NIVEAU 1 (Débutant)
            {
                id: "enemy_001",
                name: "Petit Dépassement",
                avatar: "📊",
                level: 1,
                type: "overtime",
                hp: 50,
                maxHp: 50,
                attack: 8,
                defense: 5,
                description: "Un petit dépassement de 2h cette semaine. Facile à combattre!",
                legalViolation: "Dépassement mineur de la durée légale",
                legalReference: "Article L3121-18 du Code du travail",
                loot: {
                    xp: 100,
                    wisdom: 5,
                    items: ["Fragment de connaissance"]
                },
                weaknesses: ["legal_expert"],
                resistances: []
            },
            {
                id: "enemy_002",
                name: "Oubli de Pause",
                avatar: "☕",
                level: 2,
                type: "rest",
                hp: 60,
                maxHp: 60,
                attack: 10,
                defense: 6,
                description: "Travailler 6h sans pause de 20 minutes.",
                legalViolation: "Non-respect du temps de pause obligatoire",
                legalReference: "Article L3121-16 du Code du travail",
                loot: {
                    xp: 150,
                    wisdom: 8,
                    items: ["Badge: Défenseur des Pauses"]
                },
                weaknesses: ["time_master"],
                resistances: []
            },

            // VIOLATIONS DE NIVEAU 2 (Intermédiaire)
            {
                id: "enemy_003",
                name: "Nuit Non Compensée",
                avatar: "🌙",
                level: 5,
                type: "night",
                hp: 120,
                maxHp: 120,
                attack: 18,
                defense: 12,
                description: "Travail de nuit sans compensation ni majoration.",
                legalViolation: "Absence de compensation pour travail de nuit",
                legalReference: "Article L3122-8 du Code du travail",
                loot: {
                    xp: 300,
                    wisdom: 15,
                    items: ["Bouclier de la Nuit", "Essence lunaire"]
                },
                weaknesses: ["legal_expert", "negotiator"],
                resistances: ["time_master"]
            },
            {
                id: "enemy_004",
                name: "Semaine Infernale",
                avatar: "🔥",
                level: 7,
                type: "overtime",
                hp: 150,
                maxHp: 150,
                attack: 22,
                defense: 15,
                description: "52 heures de travail cette semaine sans repos!",
                legalViolation: "Dépassement de la limite hebdomadaire de 48h",
                legalReference: "Article L3121-20 du Code du travail",
                loot: {
                    xp: 500,
                    wisdom: 25,
                    items: ["Badge: Vainqueur de l'Épuisement", "Potion de repos"]
                },
                weaknesses: ["legal_expert"],
                resistances: ["negotiator"]
            },

            // VIOLATIONS DE NIVEAU 3 (Avancé)
            {
                id: "enemy_005",
                name: "Repos Impossible",
                avatar: "😴",
                level: 10,
                type: "rest",
                hp: 200,
                maxHp: 200,
                attack: 30,
                defense: 20,
                description: "Seulement 8h de repos entre deux journées de travail.",
                legalViolation: "Non-respect du repos quotidien de 11h",
                legalReference: "Article L3131-1 du Code du travail",
                loot: {
                    xp: 800,
                    wisdom: 40,
                    items: ["Badge: Gardien du Repos", "Oreiller magique"]
                },
                weaknesses: ["time_master", "legal_expert"],
                resistances: []
            },
            {
                id: "enemy_006",
                name: "Harcèlement Moral",
                avatar: "👹",
                level: 12,
                type: "harassment",
                hp: 250,
                maxHp: 250,
                attack: 35,
                defense: 25,
                description: "Comportement toxique et dégradant au travail.",
                legalViolation: "Harcèlement moral au travail",
                legalReference: "Article L1152-1 du Code du travail",
                loot: {
                    xp: 1000,
                    wisdom: 50,
                    items: ["Badge: Protecteur de la Dignité", "Armure éthique"]
                },
                weaknesses: ["negotiator"],
                resistances: ["time_master"]
            },

            // BOSS (Expert)
            {
                id: "boss_001",
                name: "Le Grand Exploiteur",
                avatar: "👔",
                level: 20,
                type: "boss",
                hp: 500,
                maxHp: 500,
                attack: 50,
                defense: 40,
                description: "Un employeur qui cumule toutes les violations possibles!",
                legalViolation: "Violations multiples et systématiques du Code du travail",
                legalReference: "Code du travail - Multiples infractions",
                loot: {
                    xp: 5000,
                    wisdom: 200,
                    items: [
                        "Badge Légendaire: Justicier du Travail",
                        "Épée de la Justice Sociale",
                        "Couronne du Droit",
                        "Titre: Protecteur des Travailleurs"
                    ]
                },
                weaknesses: ["legal_expert", "negotiator", "time_master"],
                resistances: [],
                isBoss: true
            }
        ];
    }

    // Démarrer un combat
    startBattle(enemyId) {
        const enemy = this.enemies.find(e => e.id === enemyId);
        if (!enemy) return { error: 'Ennemi introuvable' };

        // Créer une copie de l'ennemi pour ne pas modifier l'original
        this.currentBattle = {
            enemy: { ...enemy },
            playerHp: 100,
            playerMaxHp: 100,
            playerAttack: 20,
            playerDefense: 10,
            turn: 0,
            playerTurn: true,
            status: 'active',
            startedAt: Date.now()
        };

        this.combatLog = [];
        this.addToCombatLog(`⚔️ Combat contre ${enemy.name} commence!`, 'system');
        this.addToCombatLog(`🔍 Violation: ${enemy.legalViolation}`, 'info');

        return { success: true, battle: this.currentBattle };
    }

    // Action du joueur
    playerAction(actionType, ...params) {
        if (!this.currentBattle || this.currentBattle.status !== 'active') {
            return { error: 'Aucun combat en cours' };
        }

        if (!this.currentBattle.playerTurn) {
            return { error: 'Ce n\'est pas votre tour!' };
        }

        let result;
        switch (actionType) {
            case 'attack':
                result = this.playerAttack();
                break;
            case 'legal_strike':
                result = this.legalStrike();
                break;
            case 'defend':
                result = this.playerDefend();
                break;
            case 'use_item':
                result = this.useItem(params[0]);
                break;
            default:
                return { error: 'Action inconnue' };
        }

        // Tour de l'ennemi
        if (this.currentBattle.status === 'active') {
            setTimeout(() => this.enemyTurn(), 1000);
        }

        return result;
    }

    // Attaque normale du joueur
    playerAttack() {
        const damage = this.calculateDamage(
            this.currentBattle.playerAttack,
            this.currentBattle.enemy.defense,
            1.0
        );

        this.currentBattle.enemy.hp = Math.max(0, this.currentBattle.enemy.hp - damage);
        this.addToCombatLog(`⚔️ Vous attaquez pour ${damage} dégâts!`, 'player');

        this.currentBattle.playerTurn = false;
        return this.checkBattleEnd();
    }

    // Frappe légale (attaque spéciale)
    legalStrike() {
        const multiplier = 1.5;
        const damage = this.calculateDamage(
            this.currentBattle.playerAttack,
            this.currentBattle.enemy.defense,
            multiplier
        );

        this.currentBattle.enemy.hp = Math.max(0, this.currentBattle.enemy.hp - damage);
        this.addToCombatLog(`⚖️ FRAPPE LÉGALE! Vous invoquez ${this.currentBattle.enemy.legalReference} pour ${damage} dégâts critiques!`, 'player');

        this.currentBattle.playerTurn = false;
        return this.checkBattleEnd();
    }

    // Défense du joueur
    playerDefend() {
        this.currentBattle.playerDefense = Math.floor(this.currentBattle.playerDefense * 1.5);
        this.addToCombatLog(`🛡️ Vous vous mettez en défense! Défense augmentée temporairement.`, 'player');
        
        this.currentBattle.playerTurn = false;
        return { success: true };
    }

    // Tour de l'ennemi
    enemyTurn() {
        if (!this.currentBattle || this.currentBattle.status !== 'active') return;

        const damage = this.calculateDamage(
            this.currentBattle.enemy.attack,
            this.currentBattle.playerDefense,
            1.0
        );

        this.currentBattle.playerHp = Math.max(0, this.currentBattle.playerHp - damage);
        this.addToCombatLog(`💢 ${this.currentBattle.enemy.name} vous attaque pour ${damage} dégâts!`, 'enemy');

        // Réinitialiser la défense si elle était boostée
        if (this.currentBattle.playerDefense > 10) {
            this.currentBattle.playerDefense = 10;
        }

        this.currentBattle.turn++;
        this.currentBattle.playerTurn = true;

        return this.checkBattleEnd();
    }

    // Calculer les dégâts
    calculateDamage(attack, defense, multiplier) {
        const baseDamage = attack - (defense / 2);
        const variance = 0.8 + Math.random() * 0.4; // 80% - 120%
        return Math.max(1, Math.floor(baseDamage * multiplier * variance));
    }

    // Vérifier la fin du combat
    checkBattleEnd() {
        if (this.currentBattle.enemy.hp <= 0) {
            this.currentBattle.status = 'victory';
            this.addToCombatLog(`🎉 VICTOIRE! Vous avez vaincu ${this.currentBattle.enemy.name}!`, 'victory');
            this.addToCombatLog(`📚 ${this.currentBattle.enemy.legalReference} a été respecté!`, 'info');
            
            // Enregistrer dans l'historique
            this.battleHistory.push({
                enemyId: this.currentBattle.enemy.id,
                result: 'victory',
                turns: this.currentBattle.turn,
                timestamp: Date.now()
            });
            this.saveBattleHistory();

            return {
                success: true,
                status: 'victory',
                rewards: this.currentBattle.enemy.loot
            };
        }

        if (this.currentBattle.playerHp <= 0) {
            this.currentBattle.status = 'defeat';
            this.addToCombatLog(`💀 DÉFAITE! La violation légale vous a terrassé...`, 'defeat');
            this.addToCombatLog(`💡 Conseil: Améliorez vos compétences et réessayez!`, 'info');
            
            // Enregistrer dans l'historique
            this.battleHistory.push({
                enemyId: this.currentBattle.enemy.id,
                result: 'defeat',
                turns: this.currentBattle.turn,
                timestamp: Date.now()
            });
            this.saveBattleHistory();

            return {
                success: true,
                status: 'defeat'
            };
        }

        return { success: true, status: 'continue' };
    }

    // Ajouter au log de combat
    addToCombatLog(message, type) {
        this.combatLog.push({
            message: message,
            type: type,
            timestamp: Date.now()
        });
    }

    // Obtenir le log de combat
    getCombatLog() {
        return this.combatLog;
    }

    // Obtenir la bataille en cours
    getCurrentBattle() {
        return this.currentBattle;
    }

    // Obtenir les ennemis disponibles
    getAvailableEnemies(playerLevel) {
        return this.enemies.filter(e => 
            e.level <= playerLevel + 3 && // Peut affronter jusqu'à +3 niveaux
            !e.isBoss // Les boss doivent être débloqués spécialement
        );
    }

    // Obtenir un ennemi aléatoire
    getRandomEnemy(playerLevel) {
        const available = this.getAvailableEnemies(playerLevel);
        if (available.length === 0) return null;
        
        return available[Math.floor(Math.random() * available.length)];
    }

    // Charger l'historique
    loadBattleHistory() {
        const saved = localStorage.getItem('rpg_battle_history');
        return saved ? JSON.parse(saved) : [];
    }

    // Sauvegarder l'historique
    saveBattleHistory() {
        localStorage.setItem('rpg_battle_history', JSON.stringify(this.battleHistory));
    }

    // Statistiques
    getStats() {
        const victories = this.battleHistory.filter(b => b.result === 'victory').length;
        const defeats = this.battleHistory.filter(b => b.result === 'defeat').length;
        
        return {
            totalBattles: this.battleHistory.length,
            victories: victories,
            defeats: defeats,
            winRate: this.battleHistory.length > 0 ? (victories / this.battleHistory.length) * 100 : 0
        };
    }

    // Réinitialiser
    reset() {
        this.currentBattle = null;
        this.battleHistory = [];
        this.combatLog = [];
        this.saveBattleHistory();
    }
}

// Export global
const combatSystem = new CombatSystem();
