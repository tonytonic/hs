// ===== QUEST SYSTEM =====
// Système de quêtes pour le RPG

class QuestSystem {
    constructor() {
        this.quests = this.initializeQuests();
        this.activeQuests = this.loadActiveQuests();
        this.completedQuests = this.loadCompletedQuests();
        this.maxActiveQuests = 5;
    }

    initializeQuests() {
        return [
            // QUÊTES PRINCIPALES - CHAPITRE 1
            {
                id: "main_001",
                type: "main",
                chapter: 1,
                title: "🌱 Les Premiers Pas",
                description: "Kitsune te demande d'apprendre les bases du droit du travail en découvrant tes premiers scénarios.",
                objectives: [
                    { id: "read_5_scenarios", description: "Lire 5 scénarios", current: 0, target: 5, completed: false },
                    { id: "talk_to_kitsune", description: "Parler à Kitsune", current: 0, target: 1, completed: false },
                    { id: "track_hours", description: "Enregistrer tes premières heures", current: 0, target: 1, completed: false }
                ],
                rewards: {
                    xp: 500,
                    wisdom: 20,
                    items: ["Badge: Apprenti Travailleur"],
                    unlocks: ["Quête: La Route de la Connaissance"]
                },
                difficulty: "beginner",
                estimatedTime: "15 minutes"
            },
            {
                id: "main_002",
                type: "main",
                chapter: 1,
                title: "⚖️ La Route de la Connaissance",
                description: "Approfondis tes connaissances sur les heures supplémentaires et leurs majorations.",
                objectives: [
                    { id: "overtime_scenarios", description: "Lire 10 scénarios sur les heures sup", current: 0, target: 10, completed: false },
                    { id: "track_overtime", description: "Enregistrer des heures supplémentaires", current: 0, target: 3, completed: false },
                    { id: "reach_level_3", description: "Atteindre le niveau 3", current: 0, target: 1, completed: false }
                ],
                rewards: {
                    xp: 1000,
                    wisdom: 30,
                    items: ["Talent: Expert Légal niveau 1", "Objet: Livre du Code du Travail"],
                    unlocks: ["Quête: Le Premier Combat"]
                },
                difficulty: "intermediate",
                estimatedTime: "30 minutes",
                requiredQuests: ["main_001"]
            },

            // QUÊTES SECONDAIRES
            {
                id: "side_001",
                type: "side",
                title: "📚 Le Collectionneur",
                description: "Lis 50 scénarios différents pour élargir ta culture juridique.",
                objectives: [
                    { id: "read_50", description: "Lire 50 scénarios", current: 0, target: 50, completed: false }
                ],
                rewards: {
                    xp: 2000,
                    wisdom: 50,
                    items: ["Badge: Rat de Bibliothèque", "Titre: L'Érudit"]
                },
                difficulty: "intermediate",
                estimatedTime: "2 heures"
            },
            {
                id: "side_002",
                type: "side",
                title: "🤖 L'Apprenti Sorcier",
                description: "Utilise l'IA pour générer 10 scénarios personnalisés.",
                objectives: [
                    { id: "gen_ai_10", description: "Générer 10 scénarios IA", current: 0, target: 10, completed: false },
                    { id: "read_ai_5", description: "Lire 5 scénarios générés", current: 0, target: 5, completed: false }
                ],
                rewards: {
                    xp: 1500,
                    wisdom: 40,
                    items: ["Badge: Maître de l'IA", "Objet: Cristal d'IA"]
                },
                difficulty: "advanced",
                estimatedTime: "1 heure"
            },
            {
                id: "side_003",
                type: "side",
                title: "⚔️ Le Chasseur de Violations",
                description: "Gagne 5 combats contre des violations légales.",
                objectives: [
                    { id: "win_5_battles", description: "Gagner 5 combats", current: 0, target: 5, completed: false }
                ],
                rewards: {
                    xp: 2500,
                    wisdom: 60,
                    items: ["Badge: Guerrier de la Justice", "Arme: Épée de la Loi"]
                },
                difficulty: "advanced",
                estimatedTime: "45 minutes"
            },

            // QUÊTES QUOTIDIENNES
            {
                id: "daily_001",
                type: "daily",
                title: "📖 Lecture Quotidienne",
                description: "Lis 3 scénarios aujourd'hui.",
                objectives: [
                    { id: "read_3_today", description: "Lire 3 scénarios", current: 0, target: 3, completed: false }
                ],
                rewards: {
                    xp: 300,
                    wisdom: 10
                },
                difficulty: "beginner",
                estimatedTime: "10 minutes",
                resetsDaily: true
            },
            {
                id: "daily_002",
                type: "daily",
                title: "💬 Sagesse de Kitsune",
                description: "Pose une question à Kitsune.",
                objectives: [
                    { id: "ask_kitsune", description: "Parler à Kitsune", current: 0, target: 1, completed: false }
                ],
                rewards: {
                    xp: 200,
                    wisdom: 5
                },
                difficulty: "beginner",
                estimatedTime: "5 minutes",
                resetsDaily: true
            },

            // QUÊTES DE DÉFI
            {
                id: "challenge_001",
                type: "challenge",
                title: "🏃 Marathon de Lecture",
                description: "Lis 20 scénarios en une seule session.",
                objectives: [
                    { id: "read_20_session", description: "Lire 20 scénarios", current: 0, target: 20, completed: false }
                ],
                rewards: {
                    xp: 3000,
                    wisdom: 80,
                    items: ["Badge: Marathonien du Savoir", "Titre: Le Dévoré de Livres"]
                },
                difficulty: "expert",
                estimatedTime: "1h30",
                timeLimit: 7200000 // 2 heures en ms
            },
            {
                id: "challenge_002",
                type: "challenge",
                title: "🎯 Maître des Catégories",
                description: "Lis au moins 10 scénarios de chaque catégorie.",
                objectives: [
                    { id: "cat_standard", description: "Semaine standard", current: 0, target: 10, completed: false },
                    { id: "cat_night", description: "Travail de nuit", current: 0, target: 10, completed: false },
                    { id: "cat_weekend", description: "Weekend", current: 0, target: 10, completed: false },
                    { id: "cat_family", description: "Familial", current: 0, target: 10, completed: false },
                    { id: "cat_health", description: "Santé", current: 0, target: 10, completed: false },
                    { id: "cat_wellbeing", description: "Bien-être", current: 0, target: 10, completed: false }
                ],
                rewards: {
                    xp: 5000,
                    wisdom: 100,
                    items: ["Badge: Omniscient", "Titre: Maître de Toutes les Lois"]
                },
                difficulty: "expert",
                estimatedTime: "3 heures"
            }
        ];
    }

    // Charger les quêtes actives
    loadActiveQuests() {
        const saved = localStorage.getItem('rpg_active_quests');
        return saved ? JSON.parse(saved) : [];
    }

    // Charger les quêtes complétées
    loadCompletedQuests() {
        const saved = localStorage.getItem('rpg_completed_quests');
        return saved ? JSON.parse(saved) : [];
    }

    // Sauvegarder
    saveActiveQuests() {
        localStorage.setItem('rpg_active_quests', JSON.stringify(this.activeQuests));
    }

    saveCompletedQuests() {
        localStorage.setItem('rpg_completed_quests', JSON.stringify(this.completedQuests));
    }

    // Accepter une quête
    acceptQuest(questId) {
        if (this.activeQuests.length >= this.maxActiveQuests) {
            return { success: false, error: 'Vous avez déjà 5 quêtes actives!' };
        }

        if (this.activeQuests.find(q => q.id === questId)) {
            return { success: false, error: 'Cette quête est déjà active!' };
        }

        const quest = this.quests.find(q => q.id === questId);
        if (!quest) {
            return { success: false, error: 'Quête introuvable!' };
        }

        // Vérifier les prérequis
        if (quest.requiredQuests) {
            const missingQuests = quest.requiredQuests.filter(
                reqId => !this.completedQuests.includes(reqId)
            );
            if (missingQuests.length > 0) {
                return { success: false, error: 'Vous devez d\'abord compléter d\'autres quêtes!' };
            }
        }

        this.activeQuests.push({
            ...quest,
            startedAt: Date.now()
        });
        this.saveActiveQuests();

        return { success: true, quest: quest };
    }

    // Mettre à jour la progression d'une quête
    updateQuestProgress(questId, objectiveId, amount = 1) {
        const questIndex = this.activeQuests.findIndex(q => q.id === questId);
        if (questIndex === -1) return { success: false };

        const quest = this.activeQuests[questIndex];
        const objectiveIndex = quest.objectives.findIndex(o => o.id === objectiveId);
        if (objectiveIndex === -1) return { success: false };

        const objective = quest.objectives[objectiveIndex];
        objective.current = Math.min(objective.current + amount, objective.target);
        
        if (objective.current >= objective.target) {
            objective.completed = true;
        }

        // Vérifier si toute la quête est complétée
        const allCompleted = quest.objectives.every(o => o.completed);
        if (allCompleted) {
            return this.completeQuest(questId);
        }

        this.saveActiveQuests();
        return { success: true, completed: false, quest: quest };
    }

    // Compléter une quête
    completeQuest(questId) {
        const questIndex = this.activeQuests.findIndex(q => q.id === questId);
        if (questIndex === -1) return { success: false };

        const quest = this.activeQuests[questIndex];
        
        // Ajouter aux complétées
        this.completedQuests.push(questId);
        
        // Retirer des actives
        this.activeQuests.splice(questIndex, 1);
        
        // Sauvegarder
        this.saveActiveQuests();
        this.saveCompletedQuests();

        return {
            success: true,
            completed: true,
            quest: quest,
            rewards: quest.rewards
        };
    }

    // Abandonner une quête
    abandonQuest(questId) {
        const questIndex = this.activeQuests.findIndex(q => q.id === questId);
        if (questIndex === -1) return { success: false };

        this.activeQuests.splice(questIndex, 1);
        this.saveActiveQuests();

        return { success: true };
    }

    // Obtenir les quêtes disponibles
    getAvailableQuests() {
        return this.quests.filter(q => 
            !this.activeQuests.find(aq => aq.id === q.id) &&
            !this.completedQuests.includes(q.id) &&
            (!q.requiredQuests || q.requiredQuests.every(reqId => this.completedQuests.includes(reqId)))
        );
    }

    // Obtenir les quêtes actives
    getActiveQuests() {
        return this.activeQuests;
    }

    // Obtenir les quêtes complétées
    getCompletedQuests() {
        return this.quests.filter(q => this.completedQuests.includes(q.id));
    }

    // Obtenir les quêtes par type
    getQuestsByType(type) {
        return this.quests.filter(q => q.type === type);
    }

    // Réinitialiser les quêtes quotidiennes
    resetDailyQuests() {
        const dailyQuests = this.activeQuests.filter(q => q.type === 'daily');
        dailyQuests.forEach(quest => {
            quest.objectives.forEach(obj => {
                obj.current = 0;
                obj.completed = false;
            });
        });
        this.saveActiveQuests();
    }

    // Statistiques
    getStats() {
        return {
            active: this.activeQuests.length,
            completed: this.completedQuests.length,
            available: this.getAvailableQuests().length,
            total: this.quests.length,
            byType: {
                main: this.quests.filter(q => q.type === 'main').length,
                side: this.quests.filter(q => q.type === 'side').length,
                daily: this.quests.filter(q => q.type === 'daily').length,
                challenge: this.quests.filter(q => q.type === 'challenge').length
            }
        };
    }

    // Réinitialiser tout
    reset() {
        this.activeQuests = [];
        this.completedQuests = [];
        this.saveActiveQuests();
        this.saveCompletedQuests();
    }
}

// Export global
const questSystem = new QuestSystem();
