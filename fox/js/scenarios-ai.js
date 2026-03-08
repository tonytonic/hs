// ===== SCENARIOS AI SYSTEM (600 Scenarios) =====
// Système de scénarios avec base de données + génération IA

class ScenarioSystemAI {
    constructor() {
        this.scenarios = this.initializeScenarios();
        this.readScenarios = this.loadReadScenarios();
        this.favorites = this.loadFavorites();
        this.aiGenerated = this.loadAIGenerated();
        this.categories = this.getCategories();
    }

    // Initialiser les 600 scénarios de base (exemple de structure)
    initializeScenarios() {
        const scenarios = [];
        let id = 1;

        // CATÉGORIE 1: SEMAINE STANDARD (100 scénarios)
        scenarios.push(...this.generateStandardWeekScenarios(id, 100));
        id += 100;

        // CATÉGORIE 2: TRAVAIL DE NUIT (80 scénarios)
        scenarios.push(...this.generateNightWorkScenarios(id, 80));
        id += 80;

        // CATÉGORIE 3: WEEKEND (60 scénarios)
        scenarios.push(...this.generateWeekendScenarios(id, 60));
        id += 60;

        // CATÉGORIE 4: SITUATIONS FAMILIALES (50 scénarios)
        scenarios.push(...this.generateFamilyScenarios(id, 50));
        id += 50;

        // CATÉGORIE 5: SANTÉ ET HANDICAP (70 scénarios)
        scenarios.push(...this.generateHealthScenarios(id, 70));
        id += 70;

        // CATÉGORIE 6: RUPTURE DE CONTRAT (40 scénarios)
        scenarios.push(...this.generateTerminationScenarios(id, 40));
        id += 40;

        // CATÉGORIE 7: BIEN-ÊTRE ET PRÉVENTION (100 scénarios)
        scenarios.push(...this.generateWellbeingScenarios(id, 100));
        id += 100;

        // CATÉGORIE 8: SITUATIONS AVANCÉES (100 scénarios)
        scenarios.push(...this.generateAdvancedScenarios(id, 100));

        return scenarios;
    }

    // Générateurs de scénarios par catégorie
    generateStandardWeekScenarios(startId, count) {
        const scenarios = [];
        const situations = [
            {
                title: "Première semaine à 40h",
                char: "Emma", prof: "Développeuse web",
                situation: "Emma vient de commencer dans une startup. Sa première semaine, elle a travaillé 40h.",
                advice: "Au-delà de 35h hebdomadaires, les heures sont considérées comme supplémentaires. Les 5h de Emma doivent être majorées à +25%. Si elle travaille régulièrement 40h/semaine, son employeur pourrait envisager un passage à temps plein avec une durée contractuelle de 40h.",
                reference: "Article L3121-28 du Code du travail"
            },
            {
                title: "Semaine chargée à 45h",
                char: "Thomas", prof: "Chef de projet",
                situation: "Thomas a eu une semaine exceptionnelle avec un projet urgent : 45h de travail.",
                advice: "Thomas a effectué 10h supplémentaires : 8h majorées à +25% (200€ si taux horaire 25€) et 2h à +50% (75€). Total : 275€ de majorations. Ces heures peuvent aussi être compensées en repos : 10h de repos (8h×1.25 + 2h×1.5 = 13h de repos).",
                reference: "Article L3121-33 du Code du travail"
            },
            {
                title: "Question sur le contingent",
                char: "Sophie", prof: "Comptable",
                situation: "Sophie a déjà fait 180h supplémentaires cette année. Son employeur lui en demande encore 50h.",
                advice: "Le contingent annuel est généralement de 220h (sauf convention collective). Sophie peut encore faire 40h dans le contingent. Au-delà (les 10h restantes), elle peut refuser ou l'employeur doit obtenir son accord ET lui donner une contrepartie obligatoire en repos (100% des heures en repos).",
                reference: "Article L3121-30 du Code du travail"
            },
            {
                title: "Répartition inégale des heures",
                char: "Marc", prof: "Technicien",
                situation: "Marc travaille 30h certaines semaines et 42h d'autres, avec une moyenne mensuelle de 152h (35h×52÷12).",
                advice: "Cette modulation est possible SI un accord collectif le prévoit. Sans accord, toute heure au-delà de 35h/semaine est une heure supplémentaire, même si la moyenne mensuelle correspond à 35h. Marc doit vérifier s'il existe un accord d'aménagement du temps de travail dans son entreprise.",
                reference: "Articles L3121-44 et suivants du Code du travail"
            },
            {
                title: "Heures non déclarées",
                char: "Julie", prof: "Assistante",
                situation: "Julie fait régulièrement 5h sup par semaine mais elles n'apparaissent jamais sur sa fiche de paie.",
                advice: "Toutes les heures supplémentaires effectuées doivent être rémunérées ou compensées. Julie peut demander la régularisation des 6 derniers mois (délai de prescription réduit) voire 3 ans. Elle doit conserver des preuves : emails, badges, témoignages. En cas de litige, c'est à l'employeur de prouver les heures réellement effectuées.",
                reference: "Article L3171-4 du Code du travail"
            }
        ];

        // Répéter et varier les scénarios pour atteindre le count demandé
        for (let i = 0; i < count; i++) {
            const template = situations[i % situations.length];
            scenarios.push({
                id: startId + i,
                title: `${template.title} ${i > situations.length - 1 ? `(Variante ${Math.floor(i / situations.length)})` : ''}`,
                character: template.char,
                profession: template.prof,
                category: "standard",
                difficulty: i < 30 ? "beginner" : i < 70 ? "intermediate" : "advanced",
                situation: template.situation,
                advice: template.advice,
                legalReference: template.reference,
                xpReward: 100 + (i % 3) * 50,
                wisdomReward: 5 + (i % 3) * 2
            });
        }
        return scenarios;
    }

    generateNightWorkScenarios(startId, count) {
        const scenarios = [];
        const templates = [
            {
                title: "Première nuit",
                char: "Ahmed", prof: "Agent de sécurité",
                situation: "Ahmed vient d'être embauché pour des gardes de nuit (22h-6h). Il se demande quelles sont ses compensations.",
                advice: "Le travail de nuit (entre 21h et 6h selon définition légale, ou 21h-7h selon accord) donne droit à des contreparties : repos compensateur et/ou prime (selon accord collectif). Ahmed doit aussi bénéficier d'une surveillance médicale renforcée. La durée quotidienne maximale est de 8h (sauf dérogations portant à 12h).",
                reference: "Articles L3122-1 et suivants du Code du travail"
            },
            {
                title: "Cumul nuit + weekend",
                char: "Léa", prof: "Infirmière",
                situation: "Léa a travaillé samedi soir de 21h à 7h dimanche matin. Quelles majorations ?",
                advice: "Les majorations peuvent se cumuler : travail de nuit (majoration selon accord collectif, souvent +25% à +50%), travail du samedi (si prévu), passage sur le dimanche. Léa doit vérifier sa convention collective qui détaille ces cumuls. Elle a aussi droit à un repos compensateur.",
                reference: "Articles L3122-5 et L3132-12 du Code du travail"
            }
        ];

        for (let i = 0; i < count; i++) {
            const template = templates[i % templates.length];
            scenarios.push({
                id: startId + i,
                title: template.title + (i >= templates.length ? ` (V${Math.floor(i / templates.length)})` : ''),
                character: template.char,
                profession: template.prof,
                category: "night",
                difficulty: i < 20 ? "beginner" : i < 50 ? "intermediate" : "advanced",
                situation: template.situation,
                advice: template.advice,
                legalReference: template.reference,
                xpReward: 150,
                wisdomReward: 8
            });
        }
        return scenarios;
    }

    generateWeekendScenarios(startId, count) {
        const scenarios = [];
        const base = {
            title: "Travail dominical",
            char: "Lucas", prof: "Vendeur",
            situation: "Lucas travaille dans un commerce. On lui demande de travailler tous les dimanches.",
            advice: "Le repos hebdomadaire doit être de 24h consécutives, en principe le dimanche. Dans certains secteurs (commerce en zone touristique, restauration...), le travail dominical est autorisé MAIS doit donner lieu à compensation : majoration de salaire, repos compensateur, et organisation d'un roulement pour que chacun ait des dimanches libres.",
            reference: "Articles L3132-3 et L3132-12 du Code du travail"
        };

        for (let i = 0; i < count; i++) {
            scenarios.push({
                id: startId + i,
                ...base,
                title: `${base.title} (Situation ${i + 1})`,
                category: "weekend",
                difficulty: i < 20 ? "beginner" : "intermediate",
                xpReward: 120,
                wisdomReward: 6
            });
        }
        return scenarios;
    }

    generateFamilyScenarios(startId, count) {
        const scenarios = [];
        for (let i = 0; i < count; i++) {
            scenarios.push({
                id: startId + i,
                title: `Situation familiale ${i + 1}`,
                character: "Parent",
                profession: "Divers",
                category: "family",
                difficulty: "intermediate",
                situation: "Situation impliquant la conciliation vie familiale et professionnelle.",
                advice: "Le Code du travail prévoit des protections spécifiques pour les parents : congé parental, congé pour enfant malade, aménagements d'horaires, etc.",
                legalReference: "Articles L1225-47 et suivants du Code du travail",
                xpReward: 130,
                wisdomReward: 7
            });
        }
        return scenarios;
    }

    generateHealthScenarios(startId, count) {
        const scenarios = [];
        for (let i = 0; i < count; i++) {
            scenarios.push({
                id: startId + i,
                title: `Santé au travail ${i + 1}`,
                character: "Employé",
                profession: "Divers",
                category: "health",
                difficulty: i < 25 ? "beginner" : "advanced",
                situation: "Situation liée à la santé, sécurité ou handicap au travail.",
                advice: "L'employeur a une obligation de sécurité. Les salariés ont droit à des aménagements en cas de problème de santé.",
                legalReference: "Articles L4121-1 et suivants du Code du travail",
                xpReward: 140,
                wisdomReward: 9
            });
        }
        return scenarios;
    }

    generateTerminationScenarios(startId, count) {
        const scenarios = [];
        for (let i = 0; i < count; i++) {
            scenarios.push({
                id: startId + i,
                title: `Rupture de contrat ${i + 1}`,
                character: "Salarié",
                profession: "Divers",
                category: "termination",
                difficulty: "advanced",
                situation: "Situation de licenciement, démission ou rupture conventionnelle.",
                advice: "Chaque type de rupture a ses propres règles et protections. Il est essentiel de bien connaître ses droits.",
                legalReference: "Articles L1231-1 et suivants du Code du travail",
                xpReward: 200,
                wisdomReward: 12
            });
        }
        return scenarios;
    }

    generateWellbeingScenarios(startId, count) {
        const scenarios = [];
        const wellbeingTopics = [
            "Prévention du burn-out",
            "Équilibre vie pro/perso",
            "Droit à la déconnexion",
            "Gestion du stress",
            "Ergonomie du poste",
            "Pause et récupération",
            "Charge de travail",
            "Harcèlement moral",
            "Ambiance de travail",
            "Formation continue"
        ];

        for (let i = 0; i < count; i++) {
            const topic = wellbeingTopics[i % wellbeingTopics.length];
            scenarios.push({
                id: startId + i,
                title: `${topic} - Cas ${Math.floor(i / wellbeingTopics.length) + 1}`,
                character: "Professionnel",
                profession: "Divers",
                category: "wellbeing",
                difficulty: i % 3 === 0 ? "beginner" : i % 3 === 1 ? "intermediate" : "advanced",
                situation: `Situation concernant ${topic.toLowerCase()} au travail.`,
                advice: "Le bien-être au travail est un droit. L'employeur doit prévenir les risques psychosociaux et garantir un environnement sain.",
                legalReference: "Articles L4121-1 et L1152-1 du Code du travail",
                xpReward: 110,
                wisdomReward: 8
            });
        }
        return scenarios;
    }

    generateAdvancedScenarios(startId, count) {
        const scenarios = [];
        for (let i = 0; i < count; i++) {
            scenarios.push({
                id: startId + i,
                title: `Situation complexe ${i + 1}`,
                character: "Expert",
                profession: "Cadre",
                category: "advanced",
                difficulty: "expert",
                situation: "Situation juridique complexe impliquant plusieurs aspects du droit du travail.",
                advice: "Ces situations nécessitent souvent l'analyse d'un avocat spécialisé en droit du travail.",
                legalReference: "Code du travail - Multiples articles",
                xpReward: 250,
                wisdomReward: 15
            });
        }
        return scenarios;
    }

    // Méthodes de gestion
    loadReadScenarios() {
        const saved = localStorage.getItem('rpg_read_scenarios');
        return saved ? JSON.parse(saved) : [];
    }

    loadFavorites() {
        const saved = localStorage.getItem('rpg_favorite_scenarios');
        return saved ? JSON.parse(saved) : [];
    }

    loadAIGenerated() {
        const saved = localStorage.getItem('rpg_ai_scenarios');
        return saved ? JSON.parse(saved) : [];
    }

    saveReadScenarios() {
        localStorage.setItem('rpg_read_scenarios', JSON.stringify(this.readScenarios));
    }

    saveFavorites() {
        localStorage.setItem('rpg_favorite_scenarios', JSON.stringify(this.favorites));
    }

    saveAIGenerated() {
        localStorage.setItem('rpg_ai_scenarios', JSON.stringify(this.aiGenerated));
    }

    markAsRead(scenarioId) {
        if (!this.readScenarios.includes(scenarioId)) {
            this.readScenarios.push(scenarioId);
            this.saveReadScenarios();
            return true;
        }
        return false;
    }

    toggleFavorite(scenarioId) {
        const index = this.favorites.indexOf(scenarioId);
        if (index === -1) {
            this.favorites.push(scenarioId);
        } else {
            this.favorites.splice(index, 1);
        }
        this.saveFavorites();
    }

    addAIScenario(scenario) {
        this.aiGenerated.push(scenario);
        this.saveAIGenerated();
    }

    getAllScenarios() {
        return [...this.scenarios, ...this.aiGenerated];
    }

    getScenarioById(id) {
        return this.getAllScenarios().find(s => s.id === id);
    }

    getScenariosByCategory(category) {
        if (category === 'all') return this.getAllScenarios();
        return this.getAllScenarios().filter(s => s.category === category);
    }

    searchScenarios(query) {
        const lowerQuery = query.toLowerCase();
        return this.getAllScenarios().filter(s =>
            s.title.toLowerCase().includes(lowerQuery) ||
            s.situation.toLowerCase().includes(lowerQuery) ||
            s.character.toLowerCase().includes(lowerQuery)
        );
    }

    getCategories() {
        return [
            { id: 'all', name: 'Toutes catégories', count: 600 },
            { id: 'standard', name: 'Semaine standard', count: 100 },
            { id: 'night', name: 'Travail de nuit', count: 80 },
            { id: 'weekend', name: 'Weekend', count: 60 },
            { id: 'family', name: 'Situations familiales', count: 50 },
            { id: 'health', name: 'Santé & handicap', count: 70 },
            { id: 'termination', name: 'Rupture de contrat', count: 40 },
            { id: 'wellbeing', name: 'Bien-être & prévention', count: 100 },
            { id: 'advanced', name: 'Situations avancées', count: 100 }
        ];
    }

    getStats() {
        return {
            total: this.getAllScenarios().length,
            read: this.readScenarios.length,
            favorites: this.favorites.length,
            aiGenerated: this.aiGenerated.length,
            percentage: (this.readScenarios.length / this.getAllScenarios().length) * 100
        };
    }

    reset() {
        this.readScenarios = [];
        this.favorites = [];
        this.aiGenerated = [];
        this.saveReadScenarios();
        this.saveFavorites();
        this.saveAIGenerated();
    }
}

// Export global
const scenarioSystemAI = new ScenarioSystemAI();
