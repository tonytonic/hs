// ===== SKILLS SYSTEM =====
// Système de compétences et talents

class SkillsSystem {
    constructor() {
        this.skills = this.initializeSkills();
        this.playerSkills = this.loadPlayerSkills();
    }

    initializeSkills() {
        return {
            legal_expert: {
                id: 'legal_expert',
                name: 'Expert Légal',
                icon: '⚖️',
                description: 'Augmente vos dégâts contre les violations légales',
                maxLevel: 5,
                benefits: [
                    '+10% dégâts en combat',
                    '+20% dégâts en combat',
                    '+30% dégâts en combat',
                    '+40% dégâts en combat',
                    '+50% dégâts en combat'
                ]
            },
            time_master: {
                id: 'time_master',
                name: 'Maître du Temps',
                icon: '⏰',
                description: 'Améliore la gestion des heures et l\'XP gagné',
                maxLevel: 5,
                benefits: [
                    '+5% XP sur heures',
                    '+10% XP sur heures',
                    '+15% XP sur heures',
                    '+20% XP sur heures',
                    '+25% XP sur heures'
                ]
            },
            negotiator: {
                id: 'negotiator',
                name: 'Négociateur',
                icon: '🤝',
                description: 'Améliore les dialogues et résolutions pacifiques',
                maxLevel: 5,
                benefits: [
                    'Réponses IA améliorées',
                    'Résolution pacifique niveau 1',
                    'Résolution pacifique niveau 2',
                    'Résolution pacifique niveau 3',
                    'Maître négociateur'
                ]
            }
        };
    }

    loadPlayerSkills() {
        const saved = localStorage.getItem('rpg_player_skills');
        return saved ? JSON.parse(saved) : {
            legal_expert: 0,
            time_master: 0,
            negotiator: 0
        };
    }

    savePlayerSkills() {
        localStorage.setItem('rpg_player_skills', JSON.stringify(this.playerSkills));
    }

    upgradeSkill(skillId) {
        const skill = this.skills[skillId];
        if (!skill) return { success: false, error: 'Compétence introuvable' };

        const currentLevel = this.playerSkills[skillId];
        if (currentLevel >= skill.maxLevel) {
            return { success: false, error: 'Niveau maximum atteint' };
        }

        this.playerSkills[skillId]++;
        this.savePlayerSkills();

        return {
            success: true,
            skill: skill,
            newLevel: this.playerSkills[skillId]
        };
    }

    getSkillLevel(skillId) {
        return this.playerSkills[skillId] || 0;
    }

    reset() {
        this.playerSkills = {
            legal_expert: 0,
            time_master: 0,
            negotiator: 0
        };
        this.savePlayerSkills();
    }
}

const skillsSystem = new SkillsSystem();
