// ===== BADGE SYSTEM =====
// Gère les 65 badges répartis en 4 raretés
// v2 : suppression des récompenses lecture de scénarios → actions réelles

class BadgeSystem {
    constructor() {
        this.badges = this.initializeBadges();
        this.unlockedBadges = this.loadUnlockedBadges();
    }

    initializeBadges() {
        return [
            // ── COMMUN (20 badges) ──────────────────────────────────────────
            { id: 1,  img: '../images/Premier_Pas.PNG',      name: 'Premier Pas',       icon: '👣', rarity: 'common',    description: 'Première heure sup enregistrée',                    condition: (s) => s.totalHours >= 1 },
            { id: 2,  img: '../images/Debutant.PNG',         name: 'Débutant',           icon: '🌱', rarity: 'common',    description: '5 heures sup',                                      condition: (s) => s.totalHours >= 5 },
            { id: 3,  img: '../images/Regulier.PNG',         name: 'Régulier',           icon: '📅', rarity: 'common',    description: '10 heures sup',                                     condition: (s) => s.totalHours >= 10 },
            { id: 4,  img: '../images/Assidu.PNG',           name: 'Assidu',             icon: '⏰', rarity: 'common',    description: '20 heures sup',                                     condition: (s) => s.totalHours >= 20 },
            { id: 5,  img: '../images/Travailleur.PNG',      name: 'Travailleur',        icon: '💼', rarity: 'common',    description: '30 heures sup',                                     condition: (s) => s.totalHours >= 30 },
            // Explorateur : premier week-end travaillé détecté
            { id: 6,  img: '../images/Explorateur.PNG',      name: 'Explorateur',        icon: '🗺️', rarity: 'common',    description: 'Premier week-end travaillé enregistré',             condition: (s) => s.weekendHours >= 1 },
            // Curieux : 5 jours consécutifs de suivi
            { id: 7,  img: '../images/Curieux.PNG',          name: 'Curieux',            icon: '🔍', rarity: 'common',    description: 'Tracker 5 jours consécutifs',                       condition: (s) => s.consecutiveDays >= 5 },
            { id: 8,  img: '../images/Niveau_2.PNG',         name: 'Niveau 2',           icon: '🎯', rarity: 'common',    description: 'Atteindre le niveau 2',                             condition: (s) => s.level >= 2 },
            { id: 9,  img: '../images/Niveau_5.PNG',         name: 'Niveau 5',           icon: '🎯', rarity: 'common',    description: 'Atteindre le niveau 5',                             condition: (s) => s.level >= 5 },
            { id: 10, img: '../images/Matinal.PNG',          name: 'Matinal',            icon: '🌅', rarity: 'common',    description: '5 heures sup avant 8h',                             condition: (s) => s.earlyHours >= 5 },
            { id: 11, img: '../images/Nocturne.PNG',         name: 'Nocturne',           icon: '🌙', rarity: 'common',    description: '5 heures sup après 21h',                            condition: (s) => s.nightHours >= 5 },
            { id: 12, img: '../images/Weekend_Warrior.PNG',  name: 'Weekend Warrior',    icon: '🏖️', rarity: 'common',    description: '5 heures sup le weekend',                           condition: (s) => s.weekendHours >= 5 },
            { id: 13, img: '../images/Mensuel.PNG',          name: 'Mensuel',            icon: '📊', rarity: 'common',    description: 'Premier mois complété',                             condition: (s) => s.monthsTracked >= 1 },
            { id: 14, img: '../images/XP_Hunter.PNG',        name: 'XP Hunter',          icon: '⭐', rarity: 'common',    description: '1000 XP accumulés',                                 condition: (s) => s.totalXP >= 1000 },
            { id: 15, img: '../images/Sage.PNG',             name: 'Sage',               icon: '📚', rarity: 'common',    description: 'Lire toute la section Infos',                       condition: (s) => s.readInfo },
            { id: 16, img: '../images/Organise.PNG',         name: 'Organisé',           icon: '📋', rarity: 'common',    description: 'Exporter ses données',                              condition: (s) => s.exportedData },
            { id: 17, img: '../images/Ami_du_Renard.PNG',    name: 'Ami du Renard',      icon: '🦊', rarity: 'common',    description: 'Interagir 10 fois avec le renard',                  condition: (s) => s.foxInteractions >= 10 },
            { id: 18, img: '../images/Regularite_Bronze.PNG',name: 'Régularité Bronze',  icon: '🥉', rarity: 'common',    description: 'Atteindre la ligue Bronze',                         condition: (s) => s.league >= 1 },
            { id: 19, img: '../images/Marathonien.PNG',      name: 'Marathonien',        icon: '🏃', rarity: 'common',    description: '40 heures sup',                                     condition: (s) => s.totalHours >= 40 },
            { id: 20, img: '../images/Consciencieux.PNG',    name: 'Consciencieux',      icon: '✅', rarity: 'common',    description: 'Tracker 7 jours consécutifs',                       condition: (s) => s.consecutiveDays >= 7 },

            // ── RARE (15 badges) ────────────────────────────────────────────
            { id: 21, img: '../images/Perseverant.PNG',      name: 'Persévérant',        icon: '💪', rarity: 'rare',      description: '50 heures sup',                                     condition: (s) => s.totalHours >= 50 },
            { id: 22, img: '../images/Acharne.PNG',          name: 'Acharné',            icon: '🔥', rarity: 'rare',      description: '75 heures sup',                                     condition: (s) => s.totalHours >= 75 },
            { id: 23, img: '../images/Niveau_10.PNG',        name: 'Niveau 10',          icon: '🎯', rarity: 'rare',      description: 'Atteindre le niveau 10',                            condition: (s) => s.level >= 10 },
            { id: 24, img: '../images/Regularite_Argent.PNG',name: 'Régularité Argent',  icon: '🥈', rarity: 'rare',      description: 'Atteindre la ligue Argent',                         condition: (s) => s.league >= 2 },
            { id: 25, img: '../images/Regularite_Or.PNG',    name: 'Régularité Or',      icon: '🥇', rarity: 'rare',      description: 'Atteindre la ligue Or',                             condition: (s) => s.league >= 3 },
            // Érudit : 14 jours consécutifs de suivi
            { id: 26, img: '../images/Erudit.PNG',           name: 'Érudit',             icon: '🎓', rarity: 'rare',      description: 'Tracker 14 jours consécutifs',                      condition: (s) => s.consecutiveDays >= 14 },
            // Expert : 20 interactions avec Kitsune
            { id: 27, img: '../images/Expert.PNG',           name: 'Expert',             icon: '🧠', rarity: 'rare',      description: 'Dialoguer 20 fois avec Kitsune',                    condition: (s) => s.foxInteractions >= 20 },
            { id: 28, img: '../images/Trimestre.PNG',        name: 'Trimestre',          icon: '📆', rarity: 'rare',      description: '3 mois de suivi',                                   condition: (s) => s.monthsTracked >= 3 },
            { id: 29, img: '../images/XP_Master.PNG',        name: 'XP Master',          icon: '🌟', rarity: 'rare',      description: '5000 XP accumulés',                                 condition: (s) => s.totalXP >= 5000 },
            { id: 30, img: '../images/Centenaire.PNG',       name: 'Centenaire',         icon: '💯', rarity: 'rare',      description: '100 heures sup',                                    condition: (s) => s.totalHours >= 100 },
            { id: 31, img: '../images/Noctambule.PNG',       name: 'Noctambule',         icon: '🦉', rarity: 'rare',      description: '20 heures sup de nuit',                             condition: (s) => s.nightHours >= 20 },
            { id: 32, img: '../images/Leve-tot.PNG',         name: 'Lève-tôt',           icon: '🐓', rarity: 'rare',      description: '20 heures sup matinales',                           condition: (s) => s.earlyHours >= 20 },
            { id: 33, img: '../images/Sans_Weekend.PNG',     name: 'Sans Weekend',       icon: '⚠️', rarity: 'rare',      description: '20 heures sup le weekend',                          condition: (s) => s.weekendHours >= 20 },
            { id: 34, img: '../images/Fidele.PNG',           name: 'Fidèle',             icon: '🎖️', rarity: 'rare',      description: 'Tracker 30 jours consécutifs',                      condition: (s) => s.consecutiveDays >= 30 },
            { id: 35, img: '../images/Collectionneur.PNG',   name: 'Collectionneur',     icon: '🏅', rarity: 'rare',      description: 'Débloquer 10 badges',                               condition: (s) => s.badgesUnlocked >= 10 },

            // ── ÉPIQUE (10 badges) ──────────────────────────────────────────
            { id: 36, img: '../images/Infatigable.PNG',      name: 'Infatigable',        icon: '⚡', rarity: 'epic',      description: '150 heures sup',                                    condition: (s) => s.totalHours >= 150 },
            { id: 37, img: '../images/Niveau_20.PNG',        name: 'Niveau 20',          icon: '🎯', rarity: 'epic',      description: 'Atteindre le niveau 20',                            condition: (s) => s.level >= 20 },
            { id: 38, img: '../images/Regularite_Platine.PNG',name:'Régularité Platine', icon: '💎', rarity: 'epic',      description: 'Atteindre la ligue Platine',                        condition: (s) => s.league >= 4 },
            { id: 39, img: '../images/Regularite_Diamant.PNG',name:'Régularité Diamant', icon: '💠', rarity: 'epic',      description: 'Atteindre la ligue Diamant',                        condition: (s) => s.league >= 5 },
            // Encyclopédie : 3 exports réalisés
            { id: 40, img: '../images/Encyclopedie.PNG',     name: 'Encyclopédie',       icon: '📖', rarity: 'epic',      description: 'Exporter 3 rapports RTF',                           condition: (s) => (s.exportCount || 0) >= 3 },
            { id: 41, img: '../images/Semestre.PNG',         name: 'Semestre',           icon: '📅', rarity: 'epic',      description: '6 mois de suivi',                                   condition: (s) => s.monthsTracked >= 6 },
            { id: 42, img: '../images/XP_Legend.PNG',        name: 'XP Legend',          icon: '✨', rarity: 'epic',      description: '10000 XP accumulés',                                condition: (s) => s.totalXP >= 10000 },
            { id: 43, img: '../images/Bicentenaire.PNG',     name: 'Bicentenaire',       icon: '🔟', rarity: 'epic',      description: '200 heures sup',                                    condition: (s) => s.totalHours >= 200 },
            { id: 44, img: '../images/Devotion.PNG',         name: 'Dévotion',           icon: '🙏', rarity: 'epic',      description: 'Tracker 60 jours consécutifs',                      condition: (s) => s.consecutiveDays >= 60 },
            { id: 45, img: '../images/Grand_Collectionneur.PNG', name: 'Grand Collectionneur', icon: '🏆', rarity: 'epic', description: 'Débloquer 25 badges',                             condition: (s) => s.badgesUnlocked >= 25 },

            // ── COMPÉTENCES (15 badges IDs 51-65) ──────────────────────────
            // Initié : premier message envoyé à Kitsune
            { id: 51, img: '../images/Initie.PNG',           name: 'Initié',             icon: '🦊', rarity: 'common',    description: 'Premier dialogue avec Kitsune',                     condition: (s) => s.foxInteractions >= 1 },
            { id: 52, img: '../images/Surplus_Plus25.PNG',   name: 'Surplus +25%',       icon: '📈', rarity: 'common',    description: 'Premières HS à +25% détectées',                     condition: (s) => s.totalPlus25 > 0 },
            { id: 53, img: '../images/Surplus_Plus50.PNG',   name: 'Surplus +50%',       icon: '📊', rarity: 'common',    description: 'Premières HS à +50% détectées',                     condition: (s) => s.totalPlus50 > 0 },
            { id: 54, img: '../images/Alerte_Jaune.PNG',     name: 'Alerte Jaune',       icon: '💛', rarity: 'common',    description: 'Score burn-out > 20 détecté',                       condition: (s) => s.burnoutPeak > 20 },
            { id: 55, img: '../images/Exporte.PNG',          name: 'Exporté',            icon: '📄', rarity: 'common',    description: 'Premier rapport RTF exporté',                       condition: (s) => s.exportedData },
            // Narrateur : 5 jours avec amplitude > 10h enregistrés
            { id: 56, img: '../images/Narrateur.PNG',        name: 'Narrateur',          icon: '📖', rarity: 'rare',      description: 'Heures sup > 10h en une journée',                   condition: (s) => (s.longDays || 0) >= 1 },
            { id: 57, img: '../images/Juriste_Junior.PNG',   name: 'Juriste Junior',     icon: '⚖️', rarity: 'rare',      description: '10% du contingent annuel consommé (22h/220h)',      condition: (s) => s.contingentPercent >= 10 },
            { id: 58, img: '../images/Alerte_Orange.PNG',    name: 'Alerte Orange',      icon: '🟠', rarity: 'rare',      description: 'Score burn-out > 50 détecté',                       condition: (s) => s.burnoutPeak > 50 },
            { id: 59, img: '../images/Contingent_25.PNG',    name: 'Contingent 25%',     icon: '🕐', rarity: 'rare',      description: '25% du contingent annuel consommé (55h/220h)',      condition: (s) => s.contingentPercent >= 25 },
            // Bien-Être : 3 semaines de suivi avec burn-out sous 30
            { id: 60, img: '../images/Bien_Etre.PNG',        name: 'Bien-Être',          icon: '🌿', rarity: 'rare',      description: 'Maintenir burn-out < 30 pendant 3 semaines suivies', condition: (s) => s.monthsTracked >= 3 && (s.burnoutPeak || 100) < 30 },
            // Grand Narrateur : données sur 2 années différentes
            { id: 61, img: '../images/Grand_Narrateur.PNG',  name: 'Grand Narrateur',    icon: '📚', rarity: 'epic',      description: 'Données enregistrées sur 2 années différentes',     condition: (s) => s.yearsTracked >= 2 },
            { id: 62, img: '../images/Contingent_Mi.PNG',    name: 'Contingent 50%',     icon: '⏰', rarity: 'epic',      description: '50% du contingent annuel consommé (110h/220h)',     condition: (s) => s.contingentPercent >= 50 },
            { id: 63, img: '../images/Alerte_Rouge.PNG',     name: 'Alerte Rouge',       icon: '🔴', rarity: 'epic',      description: 'Score burn-out > 70 — situation critique',          condition: (s) => s.burnoutPeak > 70 },
            { id: 64, img: '../images/Multi_Annee.PNG',      name: 'Multi-Années',       icon: '📅', rarity: 'epic',      description: 'Données sur au moins 2 années différentes',         condition: (s) => s.yearsTracked >= 2 },
            { id: 65, img: '../images/Renard_Omniscient.PNG',name: 'Renard Expert',      icon: '🏆', rarity: 'legendary', description: 'Contingent 220h dépassé — tu connais le prix',      condition: (s) => s.contingentPercent >= 100 },

            // ── LÉGENDAIRE (5 badges) ────────────────────────────────────────
            { id: 46, img: '../images/Titan.PNG',            name: 'Titan',              icon: '⚔️', rarity: 'legendary', description: '300 heures sup',                                    condition: (s) => s.totalHours >= 300 },
            { id: 47, img: '../images/Niveau_50.PNG',        name: 'Niveau 50',          icon: '👑', rarity: 'legendary', description: 'Atteindre le niveau 50',                            condition: (s) => s.level >= 50 },
            { id: 48, img: '../images/Legende_Vivante.PNG',  name: 'Légende Vivante',    icon: '🏆', rarity: 'legendary', description: 'Atteindre la ligue Légende',                        condition: (s) => s.league >= 10 },
            { id: 49, img: '../images/Annee_Complete.PNG',   name: 'Année Complète',     icon: '🎊', rarity: 'legendary', description: '12 mois de suivi',                                  condition: (s) => s.monthsTracked >= 12 },
            { id: 50, img: '../images/Maitre_Absolu.PNG',    name: 'Maître Absolu',      icon: '🌌', rarity: 'legendary', description: 'Débloquer tous les autres badges',                  condition: (s) => s.badgesUnlocked >= 49 },
        ];
    }

    loadUnlockedBadges() {
        const saved = localStorage.getItem('rpg_unlocked_badges');
        return saved ? JSON.parse(saved) : [];
    }

    saveUnlockedBadges() {
        localStorage.setItem('rpg_unlocked_badges', JSON.stringify(this.unlockedBadges));
    }

    checkAndUnlockBadges(stats) {
        const newlyUnlocked = [];
        for (let badge of this.badges) {
            if (!this.unlockedBadges.includes(badge.id) && badge.condition(stats)) {
                this.unlockedBadges.push(badge.id);
                newlyUnlocked.push(badge);
            }
        }
        if (newlyUnlocked.length > 0) this.saveUnlockedBadges();
        return newlyUnlocked;
    }

    getBadgesByRarity(rarity) {
        if (rarity === 'all') return this.badges;
        return this.badges.filter(b => b.rarity === rarity);
    }

    getUnlockedCount() { return this.unlockedBadges.length; }

    isBadgeUnlocked(badgeId) { return this.unlockedBadges.includes(badgeId); }

    getBadgeStats() {
        const byRarity = { common: {total:0,unlocked:0}, rare: {total:0,unlocked:0}, epic: {total:0,unlocked:0}, legendary: {total:0,unlocked:0} };
        for (let badge of this.badges) {
            byRarity[badge.rarity].total++;
            if (this.isBadgeUnlocked(badge.id)) byRarity[badge.rarity].unlocked++;
        }
        return { total: this.badges.length, unlocked: this.unlockedBadges.length, byRarity, completionPercentage: (this.unlockedBadges.length / this.badges.length) * 100 };
    }

    reset() { this.unlockedBadges = []; this.saveUnlockedBadges(); }
}

if (typeof module !== 'undefined' && module.exports) module.exports = BadgeSystem;

const badgeSystem = new BadgeSystem();
console.log('✅ badgeSystem initialisé');
