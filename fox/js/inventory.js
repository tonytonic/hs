// ===== INVENTORY SYSTEM =====
class InventorySystem {
    constructor() {
        this.items = this.loadItems();
        this.maxSlots = 20;
    }

    loadItems() {
        const saved = localStorage.getItem('rpg_inventory');
        return saved ? JSON.parse(saved) : [];
    }

    saveItems() {
        localStorage.setItem('rpg_inventory', JSON.stringify(this.items));
    }

    addItem(item) {
        if (this.items.length >= this.maxSlots) {
            return { success: false, error: 'Inventaire plein' };
        }
        this.items.push(item);
        this.saveItems();
        return { success: true };
    }

    reset() {
        this.items = [];
        this.saveItems();
    }
}

const inventorySystem = new InventorySystem();

// ===== MILESTONES SYSTEM =====
class MilestonesSystem {
    constructor() {
        this.milestones = this.initializeMilestones();
        this.unlocked = this.loadUnlocked();
    }

    initializeMilestones() {
        const milestones = [];
        for (let i = 1; i <= 40; i++) {
            milestones.push({
                id: i,
                name: `Jalon ${i}`,
                requirement: i * 1000, // XP requis
                reward: { xp: i * 100, wisdom: i * 5 }
            });
        }
        return milestones;
    }

    loadUnlocked() {
        const saved = localStorage.getItem('rpg_milestones');
        return saved ? JSON.parse(saved) : [];
    }

    saveUnlocked() {
        localStorage.setItem('rpg_milestones', JSON.stringify(this.unlocked));
    }

    checkMilestones(totalXP) {
        const newUnlocked = [];
        this.milestones.forEach(milestone => {
            if (totalXP >= milestone.requirement && !this.unlocked.includes(milestone.id)) {
                this.unlocked.push(milestone.id);
                newUnlocked.push(milestone);
            }
        });
        if (newUnlocked.length > 0) {
            this.saveUnlocked();
        }
        return newUnlocked;
    }

    reset() {
        this.unlocked = [];
        this.saveUnlocked();
    }
}

const milestonesSystem = new MilestonesSystem();

// ===== LEGAL ENGINE =====
class LegalEngine {
    analyzeHours(weekly, monthly, annual) {
        const alerts = [];
        const isCompliant = weekly <= 48;

        if (weekly > 48) {
            alerts.push('⚠️ Limite hebdomadaire de 48h dépassée');
        }
        if (weekly > 60) {
            alerts.push('🚨 Dépassement critique (60h+)');
        }

        const overtimeWeekly = Math.max(0, weekly - 35);
        return {
            isCompliant,
            alerts,
            overtimeBreakdown: {
                at25: Math.min(overtimeWeekly, 8),
                at50: Math.max(0, overtimeWeekly - 8)
            }
        };
    }
}

const legalEngine = new LegalEngine();
