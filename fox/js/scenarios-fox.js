// ===== SCENARIOS.JS - Système des 600 scénarios RÉELS FOX ENGINE =====

// Charger les données FOX (fichier séparé pour performance)
// Les scénarios sont dans scenarios-fox-data.js

class ScenarioSystemFox {
    constructor() {
        this.scenarios = [];
        this.filteredScenarios = [];
        this.categories = {};
        
        // Charger depuis FOX_SCENARIOS (chargé depuis scenarios-fox-data.js)
        if (typeof FOX_SCENARIOS !== 'undefined') {
            this.scenarios = this.convertFoxScenarios(FOX_SCENARIOS);
            console.log(`📖 ${this.scenarios.length} scénarios FOX chargés`);
        } else {
            console.warn('⚠️ FOX_SCENARIOS non chargé, scénarios manquants');
        }
        
        this.filteredScenarios = [...this.scenarios];
        this.buildCategoriesIndex();
    }

    // ==========================================
    // CONVERSION FORMAT FOX → FORMAT SYSTÈME
    // ==========================================
    
    convertFoxScenarios(foxScenarios) {
        return foxScenarios.map(fox => {
            // Calculer difficulté basée sur risk
            let difficulty = 'beginner';
            if (fox.risk === 'moyen') difficulty = 'intermediate';
            else if (fox.risk === 'élevé') difficulty = 'advanced';
            else if (fox.risk === 'critique') difficulty = 'expert';
            
            // Calculer total heures de la semaine
            const totalHours = fox.days.reduce((sum, day) => sum + (day.h || 0), 0);
            
            // XP basé sur difficulté et complexité
            let xpReward = 100;
            if (difficulty === 'intermediate') xpReward = 150;
            else if (difficulty === 'advanced') xpReward = 250;
            else if (difficulty === 'expert') xpReward = 400;
            
            // Sagesse basée sur conseil
            const wisdomReward = fox.conseil && fox.conseil.actions ? 
                5 + (fox.conseil.actions.length * 2) : 5;
            
            return {
                id: fox.id,
                title: fox.name,
                category: fox.category,
                difficulty: difficulty,
                tags: fox.tags || [],
                
                // Détails scénario
                weekPattern: fox.days,
                totalHours: totalHours,
                description: fox.desc,
                legalStatus: fox.legal,
                riskLevel: fox.risk,
                
                // Conseil complet
                advice: {
                    title: fox.conseil?.titre || 'Conseil',
                    message: fox.conseil?.message || '',
                    actions: fox.conseil?.actions || [],
                    alert: fox.conseil?.alerte || null
                },
                
                // Progression
                xpReward: xpReward,
                wisdomReward: wisdomReward,
                
                // Référence légale (extraite du conseil)
                legalReference: this.extractLegalReference(fox.conseil)
            };
        });
    }
    
    extractLegalReference(conseil) {
        if (!conseil || !conseil.actions) return 'Code du travail';
        
        // Chercher articles dans les actions
        const withArticle = conseil.actions.find(a => 
            a.includes('Article') || a.includes('L') || a.includes('R')
        );
        
        return withArticle || 'Code du travail';
    }

    // ==========================================
    // INDEX CATÉGORIES
    // ==========================================
    
    buildCategoriesIndex() {
        this.categories = {
            all: { name: 'Toutes catégories', count: this.scenarios.length, icon: '📚' }
        };
        
        this.scenarios.forEach(s => {
            const cat = s.category;
            if (!this.categories[cat]) {
                this.categories[cat] = {
                    name: this.getCategoryName(cat),
                    count: 0,
                    icon: this.getCategoryIcon(cat)
                };
            }
            this.categories[cat].count++;
        });
        
        console.log('📊 Catégories:', Object.keys(this.categories).length);
    }
    
    getCategoryName(cat) {
        const names = {
            standard: 'Semaine standard',
            intense: 'Charge intense',
            limite: 'Limites légales',
            partiel: 'Temps partiel',
            nuit: 'Travail de nuit',
            mixte: 'Situations mixtes',
            astreinte: 'Astreintes',
            weekend: 'Weekend',
            ferie: 'Jours fériés',
            extreme: 'Situations extrêmes',
            atypique: 'Situations atypiques',
            poste: 'Travail posté',
            forfait: 'Forfait jours',
            teletravail: 'Télétravail',
            repos: 'Repos',
            pause: 'Pauses',
            amplitude: 'Amplitude',
            deplacement: 'Déplacements',
            formation: 'Formation',
            reunion: 'Réunions',
            garde: 'Gardes',
            wellbeing: 'Bien-être',
            prevention: 'Prévention'
        };
        return names[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
    }
    
    getCategoryIcon(cat) {
        const icons = {
            standard: '📊',
            intense: '🔥',
            limite: '🚨',
            partiel: '⏰',
            nuit: '🌙',
            mixte: '🔄',
            astreinte: '📱',
            weekend: '📅',
            ferie: '🎊',
            extreme: '⚠️',
            atypique: '🔀',
            poste: '🔄',
            forfait: '📋',
            teletravail: '🏠',
            repos: '😴',
            pause: '☕',
            amplitude: '⏱️',
            deplacement: '🚗',
            formation: '📚',
            reunion: '👥',
            garde: '🏥',
            wellbeing: '💚',
            prevention: '🛡️'
        };
        return icons[cat] || '📌';
    }

    // ==========================================
    // RECHERCHE & FILTRAGE
    // ==========================================
    
    getScenario(id) {
        return this.scenarios.find(s => s.id === id);
    }

    filter(category, difficulty, searchText) {
        this.filteredScenarios = this.scenarios.filter(s => {
            const matchCategory = category === 'all' || s.category === category;
            const matchDifficulty = difficulty === 'all' || s.difficulty === difficulty;
            const matchSearch = !searchText || 
                s.title.toLowerCase().includes(searchText.toLowerCase()) ||
                s.description.toLowerCase().includes(searchText.toLowerCase()) ||
                s.tags.some(t => t.toLowerCase().includes(searchText.toLowerCase()));
            
            return matchCategory && matchDifficulty && matchSearch;
        });

        return this.filteredScenarios;
    }

    // ==========================================
    // STATS
    // ==========================================
    
    getStats() {
        return {
            total: this.scenarios.length,
            read: globalData.scenariosRead.length,
            percentage: Math.round((globalData.scenariosRead.length / this.scenarios.length) * 100),
            categories: Object.keys(this.categories).length - 1 // -1 pour 'all'
        };
    }
}

// Instance globale
const scenarioSystemFox = new ScenarioSystemFox();

// ===== FONCTIONS D'AFFICHAGE =====

function loadScenarios() {
    // Construire sélecteurs de catégories
    buildCategorySelector();
    filterScenarios();
}

function buildCategorySelector() {
    const select = document.getElementById('scenarioCategory');
    if (!select) return;
    
    select.innerHTML = '';
    
    Object.keys(scenarioSystemFox.categories).forEach(catKey => {
        const cat = scenarioSystemFox.categories[catKey];
        const option = document.createElement('option');
        option.value = catKey;
        option.textContent = `${cat.icon} ${cat.name} (${cat.count})`;
        select.appendChild(option);
    });
}

function filterScenarios() {
    const category = document.getElementById('scenarioCategory')?.value || 'all';
    const difficulty = document.getElementById('scenarioDifficulty')?.value || 'all';
    const search = document.getElementById('scenarioSearch')?.value || '';

    const filtered = scenarioSystemFox.filter(category, difficulty, search);
    displayScenarios(filtered.slice(0, 50)); // Limiter à 50 pour performance
}

function displayScenarios(scenarios) {
    const container = document.getElementById('scenariosList');
    if (!container) return;
    
    if (scenarios.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Aucun scénario trouvé</p>';
        return;
    }

    container.innerHTML = scenarios.map(s => {
        const isRead = globalData.scenariosRead.includes(s.id);
        const categoryInfo = scenarioSystemFox.categories[s.category] || {};
        
        return `
            <div class="scenario-card-mini" onclick="showScenarioDetail(${s.id})">
                <h4>${categoryInfo.icon || '📌'} #${s.id} - ${s.title} ${isRead ? '✅' : ''}</h4>
                <p><strong>${s.legalStatus}</strong> - Risque: ${s.riskLevel}</p>
                <p>${s.description.substring(0, 100)}...</p>
                <div style="margin-top:10px;">
                    <span class="badge badge-${s.difficulty}">${s.difficulty}</span>
                    <span class="badge">${categoryInfo.name || s.category}</span>
                    ${s.tags.slice(0, 2).map(tag => `<span class="badge badge-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
    }).join('') + (scenarios.length === 50 ? 
        `<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);">Affichage des 50 premiers résultats</p>` : '');
}

function showScenarioDetail(id) {
    const s = scenarioSystemFox.getScenario(id);
    if (!s) return;

    const isRead = globalData.scenariosRead.includes(s.id);
    const categoryInfo = scenarioSystemFox.categories[s.category] || {};

    const modal = document.createElement('div');
    modal.style.cssText = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        background:rgba(0,0,0,0.8);z-index:9999;
        display:flex;align-items:center;justify-content:center;
        padding:20px;overflow-y:auto;
    `;
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

    modal.innerHTML = `
        <div style="background:var(--card-bg);border-radius:15px;padding:30px;max-width:700px;max-height:90vh;overflow-y:auto;">
            <h2 style="color:var(--primary);margin-bottom:15px;">${categoryInfo.icon || '📌'} #${s.id} - ${s.title}</h2>
            
            <div style="margin-bottom:20px;">
                <span class="badge badge-${s.difficulty}">${s.difficulty}</span>
                <span class="badge">${categoryInfo.name || s.category}</span>
                ${s.tags.map(tag => `<span class="badge badge-tag">${tag}</span>`).join('')}
            </div>

            <div style="background:rgba(13,17,35,0.6);padding:15px;border-radius:8px;margin-bottom:15px;">
                <strong>📋 Situation :</strong><br>${s.description}
                <div style="margin-top:10px;">
                    <strong>Statut légal :</strong> ${s.legalStatus}<br>
                    <strong>Niveau risque :</strong> <span style="color:${getRiskColor(s.riskLevel)}">${s.riskLevel}</span>
                </div>
            </div>

            ${s.weekPattern && s.weekPattern.length > 0 ? `
                <div style="background:rgba(13,17,35,0.6);padding:15px;border-radius:8px;margin-bottom:15px;">
                    <strong>📅 Semaine type :</strong><br>
                    ${displayWeekPattern(s.weekPattern)}
                    <div style="margin-top:10px;">
                        <strong>Total :</strong> ${s.totalHours}h/semaine
                    </div>
                </div>
            ` : ''}

            <div style="background:rgba(0,255,136,0.1);padding:15px;border-radius:8px;border-left:3px solid var(--success);margin-bottom:15px;">
                <strong>${s.advice.title}</strong><br>
                <p style="margin:10px 0;">${s.advice.message}</p>
                ${s.advice.actions && s.advice.actions.length > 0 ? `
                    <ul style="margin:10px 0 0 20px;">
                        ${s.advice.actions.map(action => `<li style="margin:5px 0;">${action}</li>`).join('')}
                    </ul>
                ` : ''}
                ${s.advice.alert ? `
                    <div style="margin-top:10px;padding:10px;border-radius:5px;background:${getAlertColor(s.advice.alert.niveau)};">
                        ${s.advice.alert.texte}
                    </div>
                ` : ''}
            </div>

            <div style="font-size:0.9em;color:var(--text-muted);margin-bottom:20px;">
                📚 ${s.legalReference}
            </div>

            <div style="display:flex;gap:10px;padding-top:15px;border-top:1px solid var(--border);">
                <span style="color:#ffd700;">⭐ +${s.xpReward} XP</span>
                <span style="color:#4facfe;">🧠 +${s.wisdomReward} Sagesse</span>
            </div>

            ${!isRead ? `
                <button class="btn-primary" onclick="markScenarioRead(${s.id});this.closest('div[style*=fixed]').remove();" style="width:100%;margin-top:20px;">
                    ✅ Marquer comme lu
                </button>
            ` : `
                <div style="text-align:center;margin-top:20px;color:var(--success);font-weight:bold;">
                    ✅ Scénario déjà lu
                </div>
            `}

            <button class="btn-secondary" onclick="this.closest('div[style*=fixed]').remove();" style="width:100%;margin-top:10px;">
                Fermer
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}

function displayWeekPattern(days) {
    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    return days.map((day, i) => {
        const name = dayNames[i] || `J${i+1}`;
        const typeIcon = getTypeIcon(day.type);
        return `<span style="display:inline-block;margin:5px;padding:5px 10px;border-radius:5px;background:rgba(79,172,254,0.2);">
            ${name}: ${day.h}h ${typeIcon}
        </span>`;
    }).join('');
}

function getTypeIcon(type) {
    const icons = {
        normal: '',
        nuit: '🌙',
        saturday: '📅',
        sunday: '📅',
        holiday: '🎊'
    };
    return icons[type] || '';
}

function getRiskColor(risk) {
    const colors = {
        'aucun': '#00ff88',
        'faible': '#4facfe',
        'moyen': '#ffa500',
        'élevé': '#ff4444',
        'critique': '#ff0000'
    };
    return colors[risk] || '#8e94b0';
}

function getAlertColor(niveau) {
    const colors = {
        'info': 'rgba(79, 172, 254, 0.2)',
        'warning': 'rgba(255, 165, 0, 0.2)',
        'danger': 'rgba(255, 68, 68, 0.2)'
    };
    return colors[niveau] || 'rgba(79, 172, 254, 0.2)';
}

function markScenarioRead(id) {
    if (!globalData.scenariosRead.includes(id)) {
        globalData.scenariosRead.push(id);
        const scenario = scenarioSystemFox.getScenario(id);
        globalData.xp += scenario.xpReward;
        globalData.wisdom += scenario.wisdomReward;
        
        // Check level up
        const xpNeeded = 100 * Math.pow(1.5, globalData.level - 1);
        while (globalData.xp >= xpNeeded) {
            globalData.level++;
            showNotification(`🎉 NIVEAU ${globalData.level} ATTEINT !`, 'success');
        }
        
        saveGlobalData();
        updateGlobalStats();
        updateDashboard();
        filterScenarios(); // Refresh display
        
        showNotification(`+${scenario.xpReward} XP, +${scenario.wisdomReward} Sagesse`, 'success');
    }
}

// Ajouter styles pour badges tags
const style = document.createElement('style');
style.textContent = `
    .badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 0.8em;
        font-weight: 600;
        margin-right: 5px;
        margin-bottom: 5px;
        background: var(--border);
        color: var(--text);
    }
    .badge-beginner { background: #4facfe; color: white; }
    .badge-intermediate { background: #ffa500; color: white; }
    .badge-advanced { background: #ff4444; color: white; }
    .badge-expert { background: #9b59b6; color: white; }
    .badge-tag { background: rgba(79, 172, 254, 0.3); font-size: 0.75em; }
`;
document.head.appendChild(style);

console.log('📖 Système de scénarios FOX initialisé');
