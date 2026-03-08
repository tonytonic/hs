// ===== SNAPSHOT & RECOVERY SYSTEM =====
// Système de sauvegarde et restauration de points dans le temps

class SnapshotSystem {
    constructor() {
        this.snapshots = this.loadSnapshots();
        this.maxSnapshots = 20; // Limite de snapshots conservés
        this.autoSnapshotInterval = null;
    }

    // Charger les snapshots sauvegardés
    loadSnapshots() {
        const saved = localStorage.getItem('rpg_snapshots');
        return saved ? JSON.parse(saved) : [];
    }

    // Sauvegarder les snapshots
    saveSnapshots() {
        localStorage.setItem('rpg_snapshots', JSON.stringify(this.snapshots));
    }

    // Créer un snapshot de l'état actuel
    createSnapshot(name = null, automatic = false) {
        const snapshot = {
            id: `snap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: name || `Snapshot ${new Date().toLocaleString('fr-FR')}`,
            timestamp: Date.now(),
            date: new Date().toISOString(),
            automatic: automatic,
            data: {
                // État du jeu
                gameState: { ...gameState },
                
                // Systèmes
                xp: {
                    currentXP: xpSystem.currentXP,
                    level: xpSystem.level
                },
                badges: badgeSystem.unlockedBadges,
                scenarios: {
                    read: scenarioSystemAI.readScenarios,
                    favorites: scenarioSystemAI.favorites,
                    aiGenerated: scenarioSystemAI.aiGenerated
                },
                quests: {
                    active: questSystem.activeQuests,
                    completed: questSystem.completedQuests
                },
                combat: {
                    history: combatSystem.battleHistory
                },
                skills: skillsSystem.playerSkills,
                inventory: inventorySystem.items,
                milestones: milestonesSystem.unlocked,
                
                // Modules 1 & 2
                module1: this.getModule1Data(),
                module2: this.getModule2Data()
            }
        };

        // Ajouter le snapshot
        this.snapshots.unshift(snapshot);

        // Limiter le nombre de snapshots
        if (this.snapshots.length > this.maxSnapshots) {
            this.snapshots = this.snapshots.slice(0, this.maxSnapshots);
        }

        this.saveSnapshots();

        return {
            success: true,
            snapshot: snapshot,
            message: `Snapshot "${snapshot.name}" créé avec succès`
        };
    }

    // Restaurer un snapshot
    restoreSnapshot(snapshotId) {
        const snapshot = this.snapshots.find(s => s.id === snapshotId);
        if (!snapshot) {
            return { success: false, error: 'Snapshot introuvable' };
        }

        try {
            // Restaurer l'état du jeu
            gameState = { ...snapshot.data.gameState };

            // Restaurer les systèmes
            xpSystem.currentXP = snapshot.data.xp.currentXP;
            xpSystem.level = snapshot.data.xp.level;
            xpSystem.saveToStorage();

            badgeSystem.unlockedBadges = snapshot.data.badges;
            badgeSystem.saveUnlockedBadges();

            scenarioSystemAI.readScenarios = snapshot.data.scenarios.read;
            scenarioSystemAI.favorites = snapshot.data.scenarios.favorites;
            scenarioSystemAI.aiGenerated = snapshot.data.scenarios.aiGenerated;
            scenarioSystemAI.saveReadScenarios();
            scenarioSystemAI.saveFavorites();
            scenarioSystemAI.saveAIGenerated();

            questSystem.activeQuests = snapshot.data.quests.active;
            questSystem.completedQuests = snapshot.data.quests.completed;
            questSystem.saveActiveQuests();
            questSystem.saveCompletedQuests();

            combatSystem.battleHistory = snapshot.data.combat.history;
            combatSystem.saveBattleHistory();

            skillsSystem.playerSkills = snapshot.data.skills;
            skillsSystem.savePlayerSkills();

            inventorySystem.items = snapshot.data.inventory;
            inventorySystem.saveItems();

            milestonesSystem.unlocked = snapshot.data.milestones;
            milestonesSystem.saveUnlocked();

            // Restaurer Modules 1 & 2
            this.restoreModule1Data(snapshot.data.module1);
            this.restoreModule2Data(snapshot.data.module2);

            saveGameState();

            return {
                success: true,
                snapshot: snapshot,
                message: `Snapshot "${snapshot.name}" restauré avec succès`
            };

        } catch (error) {
            console.error('Erreur restauration snapshot:', error);
            return {
                success: false,
                error: 'Erreur lors de la restauration'
            };
        }
    }

    // Supprimer un snapshot
    deleteSnapshot(snapshotId) {
        const index = this.snapshots.findIndex(s => s.id === snapshotId);
        if (index === -1) {
            return { success: false, error: 'Snapshot introuvable' };
        }

        const deleted = this.snapshots.splice(index, 1)[0];
        this.saveSnapshots();

        return {
            success: true,
            snapshot: deleted,
            message: `Snapshot "${deleted.name}" supprimé`
        };
    }

    // Obtenir tous les snapshots
    getAllSnapshots() {
        return this.snapshots;
    }

    // Obtenir un snapshot par ID
    getSnapshot(snapshotId) {
        return this.snapshots.find(s => s.id === snapshotId);
    }

    // Renommer un snapshot
    renameSnapshot(snapshotId, newName) {
        const snapshot = this.snapshots.find(s => s.id === snapshotId);
        if (!snapshot) {
            return { success: false, error: 'Snapshot introuvable' };
        }

        snapshot.name = newName;
        this.saveSnapshots();

        return {
            success: true,
            snapshot: snapshot,
            message: 'Snapshot renommé'
        };
    }

    // Activer les snapshots automatiques
    enableAutoSnapshots(intervalMinutes = 30) {
        this.disableAutoSnapshots(); // Désactiver l'ancien si existe

        this.autoSnapshotInterval = setInterval(() => {
            this.createSnapshot('Auto-save', true);
            console.log('📸 Snapshot automatique créé');
        }, intervalMinutes * 60 * 1000);

        return { success: true, message: `Auto-snapshots activés (${intervalMinutes} min)` };
    }

    // Désactiver les snapshots automatiques
    disableAutoSnapshots() {
        if (this.autoSnapshotInterval) {
            clearInterval(this.autoSnapshotInterval);
            this.autoSnapshotInterval = null;
            return { success: true, message: 'Auto-snapshots désactivés' };
        }
        return { success: false, message: 'Aucun auto-snapshot actif' };
    }

    // Nettoyer les vieux snapshots automatiques
    cleanupAutoSnapshots(keepCount = 5) {
        const autoSnapshots = this.snapshots.filter(s => s.automatic);
        if (autoSnapshots.length <= keepCount) {
            return { success: true, message: 'Aucun nettoyage nécessaire' };
        }

        // Garder les N plus récents
        const toKeep = autoSnapshots.slice(0, keepCount).map(s => s.id);
        const oldCount = this.snapshots.length;
        
        this.snapshots = this.snapshots.filter(s => 
            !s.automatic || toKeep.includes(s.id)
        );

        this.saveSnapshots();

        return {
            success: true,
            deleted: oldCount - this.snapshots.length,
            message: `${oldCount - this.snapshots.length} snapshots automatiques supprimés`
        };
    }

    // Exporter un snapshot en fichier
    exportSnapshot(snapshotId) {
        const snapshot = this.snapshots.find(s => s.id === snapshotId);
        if (!snapshot) {
            return { success: false, error: 'Snapshot introuvable' };
        }

        const dataStr = JSON.stringify(snapshot, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `snapshot_${snapshot.name.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        return {
            success: true,
            message: 'Snapshot exporté'
        };
    }

    // Importer un snapshot depuis un fichier
    async importSnapshot(file) {
        try {
            const text = await file.text();
            const snapshot = JSON.parse(text);

            // Valider la structure
            if (!snapshot.data || !snapshot.timestamp) {
                return { success: false, error: 'Format de snapshot invalide' };
            }

            // Ajouter un nouvel ID pour éviter les conflits
            snapshot.id = `snap_${Date.now()}_imported`;
            snapshot.imported = true;

            this.snapshots.unshift(snapshot);
            this.saveSnapshots();

            return {
                success: true,
                snapshot: snapshot,
                message: 'Snapshot importé avec succès'
            };

        } catch (error) {
            return {
                success: false,
                error: 'Erreur lors de l\'import'
            };
        }
    }

    // Obtenir les données du Module 1
    getModule1Data() {
        return {
            monthlyHours: gameState.hours.monthly,
            monthlyHistory: this.getMonthlyHistory(),
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear()
        };
    }

    // Obtenir les données du Module 2
    getModule2Data() {
        return {
            annualHours: gameState.hours.annual,
            contingentUsed: Math.min(gameState.hours.annual, 220),
            contingentRemaining: Math.max(0, 220 - gameState.hours.annual),
            annualHistory: this.getAnnualHistory(),
            currentYear: new Date().getFullYear()
        };
    }

    // Restaurer les données du Module 1
    restoreModule1Data(data) {
        if (data) {
            gameState.hours.monthly = data.monthlyHours || 0;
        }
    }

    // Restaurer les données du Module 2
    restoreModule2Data(data) {
        if (data) {
            gameState.hours.annual = data.annualHours || 0;
        }
    }

    // Obtenir l'historique mensuel
    getMonthlyHistory() {
        const saved = localStorage.getItem('rpg_monthly_history');
        return saved ? JSON.parse(saved) : [];
    }

    // Obtenir l'historique annuel
    getAnnualHistory() {
        const saved = localStorage.getItem('rpg_annual_history');
        return saved ? JSON.parse(saved) : [];
    }

    // Statistiques des snapshots
    getStats() {
        return {
            total: this.snapshots.length,
            automatic: this.snapshots.filter(s => s.automatic).length,
            manual: this.snapshots.filter(s => !s.automatic).length,
            oldest: this.snapshots.length > 0 ? this.snapshots[this.snapshots.length - 1].date : null,
            newest: this.snapshots.length > 0 ? this.snapshots[0].date : null
        };
    }

    // Réinitialiser tous les snapshots
    reset() {
        this.snapshots = [];
        this.saveSnapshots();
        this.disableAutoSnapshots();
    }
}

// Export global
const snapshotSystem = new SnapshotSystem();

// Activer les snapshots automatiques par défaut (toutes les 30 minutes)
snapshotSystem.enableAutoSnapshots(30);
