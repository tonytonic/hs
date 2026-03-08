// ===== SYSTÈME DE MODES =====

const MODES = {
    DEMO: 'demo',
    PRODUCTION: 'normal', // Correspond au HTML existant
    DEV: 'dev'
};

let currentMode = null;

// ==========================================
// DONNÉES DÉMO
// ==========================================

const DEMO_DATA = {
    level: 12,
    xp: 3200,
    wisdom: 280,
    scenariosRead: [1,2,3,4,5,6,7,8,9,10,11,12,15,20,21,25,30,35,40,42,50,55,60,65,70,75,80,85,90,95,100],
    unlockedBadges: [
        'first_scenario',
        'scenarios_10',
        'scenarios_25',
        'level_5',
        'level_10',
        'wisdom_100',
        'standard_master',
        'night_worker',
        'explorer',
        'scenarios_50'
    ],
    lastPlayed: Date.now()
};

// ==========================================
// SÉLECTION MODE (utilise HTML existant)
// ==========================================

function selectMode(mode) {
    currentMode = mode;
    
    // Sauvegarder choix
    localStorage.setItem('heures_sup_mode', mode);
    
    // Charger données selon mode
    try {
        switch(mode) {
            case MODES.DEMO:
            case 'demo':
                loadDemoData();
                break;
            case MODES.PRODUCTION:
            case 'normal':
                loadGlobalData();
                break;
            case MODES.DEV:
            case 'dev':
                loadGlobalData();
                setTimeout(() => initDevMode(), 500);
                break;
        }
    } catch (error) {
        console.error('❌ Erreur chargement mode:', error);
        showNotification('Erreur chargement mode', 'error');
    }
    
    // Cacher sélecteur, afficher app
    try {
        const selector = document.getElementById('modeSelector');
        const mainApp = document.getElementById('mainApp');
        
        if (selector) {
            selector.style.opacity = '0';
            setTimeout(() => {
                selector.style.display = 'none';
            }, 500);
        }
        
        if (mainApp) {
            mainApp.style.display = 'block';
            setTimeout(() => {
                mainApp.style.opacity = '1';
            }, 100);
        }
    } catch (error) {
        console.error('❌ Erreur affichage app:', error);
    }
    
    // Initialiser app
    setTimeout(() => {
        try {
            if (typeof initApp === 'function') {
                initApp();
            }
        } catch (error) {
            console.error('❌ Erreur initialisation:', error);
            showNotification('Erreur initialisation', 'error');
        }
    }, 200);
    
    console.log(`✅ Mode ${mode} activé`);
}

// ==========================================
// CHARGEMENT DONNÉES DÉMO
// ==========================================

function loadDemoData() {
    try {
        globalData = {...DEMO_DATA};
        saveGlobalData();
        showNotification('🎯 Mode Démo activé !', 'info');
    } catch (error) {
        console.error('❌ Erreur chargement démo:', error);
    }
}

// ==========================================
// MODE DEV
// ==========================================

function initDevMode() {
    try {
        // Créer panneau dev
        const devPanel = document.createElement('div');
        devPanel.id = 'dev-panel';
        devPanel.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(155, 89, 182, 0.95);
            padding: 15px;
            border-radius: 10px;
            z-index: 9000;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            max-width: 400px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.5);
        `;

        devPanel.innerHTML = `
            <button onclick="devAddXP(1000)" class="dev-btn">+1000 XP</button>
            <button onclick="devAddLevel()" class="dev-btn">+1 Niveau</button>
            <button onclick="devUnlockAllBadges()" class="dev-btn">🏆 All Badges</button>
            <button onclick="devReadAllScenarios()" class="dev-btn">📖 All Scenarios</button>
            <button onclick="devResetData()" class="dev-btn">🔄 Reset</button>
            <button onclick="toggleDevPanel()" class="dev-btn">✕</button>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .dev-btn {
                padding: 8px 12px;
                border-radius: 5px;
                border: none;
                background: rgba(255, 255, 255, 0.2);
                color: white;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.2s;
                font-size: 0.85em;
            }
            .dev-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.05);
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(devPanel);
        
        // Exposer globalData
        window.globalData = globalData;
        
        showNotification('⚙️ Mode Dev activé', 'info');
        console.log('⚙️ Mode Dev activé - globalData exposé dans console');
    } catch (error) {
        console.error('❌ Erreur init mode dev:', error);
    }
}

function toggleDevPanel() {
    const panel = document.getElementById('dev-panel');
    if (panel) {
        panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
    }
}

// Fonctions dev avec préfixe pour éviter conflits
function devAddXP(amount) {
    try {
        globalData.xp += amount;
        saveGlobalData();
        if (window.rpgSystem) rpgSystem.checkLevelUp();
        if (typeof updateGlobalStats === 'function') updateGlobalStats();
        if (typeof updateDashboard === 'function') updateDashboard();
        if (typeof updateRPGDisplay === 'function') updateRPGDisplay();
        showNotification(`+${amount} XP`, 'success');
    } catch (error) {
        console.error('❌ Erreur ajout XP:', error);
    }
}

function devAddLevel() {
    try {
        globalData.level++;
        saveGlobalData();
        if (typeof updateGlobalStats === 'function') updateGlobalStats();
        if (typeof updateDashboard === 'function') updateDashboard();
        if (typeof updateRPGDisplay === 'function') updateRPGDisplay();
        showNotification(`Niveau ${globalData.level} !`, 'success');
    } catch (error) {
        console.error('❌ Erreur ajout niveau:', error);
    }
}

function devUnlockAllBadges() {
    try {
        if (window.rpgSystem) {
            globalData.unlockedBadges = rpgSystem.badges.map(b => b.id);
            saveGlobalData();
            if (typeof displayBadges === 'function') displayBadges('all');
            showNotification('🏆 Tous les badges débloqués !', 'success');
        }
    } catch (error) {
        console.error('❌ Erreur déblocage badges:', error);
    }
}

function devReadAllScenarios() {
    try {
        if (window.scenarioSystemFox) {
            globalData.scenariosRead = scenarioSystemFox.scenarios.map(s => s.id);
            saveGlobalData();
            if (typeof filterScenarios === 'function') filterScenarios();
            showNotification('📖 Tous les scénarios lus !', 'success');
        }
    } catch (error) {
        console.error('❌ Erreur lecture scénarios:', error);
    }
}

function devResetData() {
    if (confirm('Vraiment réinitialiser toutes les données ?')) {
        try {
            globalData = {
                level: 1,
                xp: 0,
                wisdom: 0,
                scenariosRead: [],
                unlockedBadges: [],
                lastPlayed: Date.now()
            };
            saveGlobalData();
            location.reload();
        } catch (error) {
            console.error('❌ Erreur reset:', error);
        }
    }
}

// ==========================================
// AUTO-LOAD MODE
// ==========================================

function checkAndLoadMode() {
    try {
        const savedMode = localStorage.getItem('heures_sup_mode');
        
        if (savedMode && savedMode !== 'null') {
            // Mode déjà choisi, charger directement
            console.log('📌 Mode sauvegardé trouvé:', savedMode);
            selectMode(savedMode);
        } else {
            // Afficher sélecteur (déjà dans HTML)
            console.log('🎯 Affichage sélecteur de mode');
        }
    } catch (error) {
        console.error('❌ Erreur chargement mode:', error);
    }
}

console.log('🎯 Système de modes chargé');

