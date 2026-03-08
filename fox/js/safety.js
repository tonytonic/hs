// ===== SYSTÈME DE SÉCURITÉS ANTI-BUG =====

// ==========================================
// WRAPPER SÉCURISÉ
// ==========================================

function safeExecute(fn, context = null, ...args) {
    try {
        return fn.apply(context, args);
    } catch (error) {
        console.error('❌ Erreur interceptée:', error);
        console.error('Fonction:', fn.name || 'anonyme');
        console.error('Arguments:', args);
        
        // Notifier l'utilisateur en mode dev
        if (currentMode === 'dev' && typeof showNotification === 'function') {
            showNotification(`Erreur: ${error.message}`, 'error');
        }
        
        return null;
    }
}

// ==========================================
// VÉRIFICATION DÉPENDANCES
// ==========================================

function checkDependencies() {
    const required = {
        'storage': typeof storage !== 'undefined',
        'globalData': typeof globalData !== 'undefined',
        'scenarioSystemFox': typeof scenarioSystemFox !== 'undefined',
        'rpgSystem': typeof rpgSystem !== 'undefined',
        'dataBridge': typeof window.dataBridge !== 'undefined'
    };
    
    const missing = Object.entries(required)
        .filter(([key, exists]) => !exists)
        .map(([key]) => key);
    
    if (missing.length > 0) {
        console.warn('⚠️ Dépendances manquantes:', missing);
    }
    
    return missing.length === 0;
}

// ==========================================
// SAFE WRAPPERS POUR FONCTIONS CRITIQUES
// ==========================================

// Wrapper pour localStorage
const safeLocalStorage = {
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.error('❌ Erreur localStorage.setItem:', error);
            return false;
        }
    },
    
    getItem: (key) => {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error('❌ Erreur localStorage.getItem:', error);
            return null;
        }
    },
    
    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('❌ Erreur localStorage.removeItem:', error);
            return false;
        }
    }
};

// ==========================================
// GESTION ERREURS GLOBALE
// ==========================================

window.addEventListener('error', (event) => {
    console.error('❌ Erreur globale:', event.error);
    console.error('Fichier:', event.filename);
    console.error('Ligne:', event.lineno);
    
    // En mode dev, afficher notification
    if (currentMode === 'dev' && typeof showNotification === 'function') {
        showNotification(`Erreur globale: ${event.error?.message || 'Inconnue'}`, 'error');
    }
    
    // Ne pas propager l'erreur (évite crash complet)
    event.preventDefault();
});

// Erreurs de promesses non gérées
window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Promise rejetée:', event.reason);
    
    if (currentMode === 'dev' && typeof showNotification === 'function') {
        showNotification(`Promise rejetée: ${event.reason}`, 'error');
    }
    
    event.preventDefault();
});

// ==========================================
// VALIDATION DONNÉES
// ==========================================

function validateGlobalData(data) {
    if (!data || typeof data !== 'object') {
        console.error('❌ globalData invalide');
        return false;
    }
    
    const required = ['level', 'xp', 'wisdom', 'scenariosRead', 'unlockedBadges'];
    const missing = required.filter(field => !(field in data));
    
    if (missing.length > 0) {
        console.error('❌ Champs manquants dans globalData:', missing);
        return false;
    }
    
    // Validation des types
    if (typeof data.level !== 'number' || data.level < 1) {
        console.error('❌ level invalide');
        return false;
    }
    
    if (typeof data.xp !== 'number' || data.xp < 0) {
        console.error('❌ xp invalide');
        return false;
    }
    
    if (!Array.isArray(data.scenariosRead)) {
        console.error('❌ scenariosRead pas un tableau');
        return false;
    }
    
    if (!Array.isArray(data.unlockedBadges)) {
        console.error('❌ unlockedBadges pas un tableau');
        return false;
    }
    
    return true;
}

// ==========================================
// RÉPARATION AUTO DONNÉES
// ==========================================

function repairGlobalData(data) {
    console.warn('🔧 Tentative réparation globalData...');
    
    const repaired = {
        level: 1,
        xp: 0,
        wisdom: 0,
        scenariosRead: [],
        unlockedBadges: [],
        lastPlayed: Date.now()
    };
    
    // Copier valeurs valides
    if (data && typeof data === 'object') {
        if (typeof data.level === 'number' && data.level > 0) {
            repaired.level = data.level;
        }
        if (typeof data.xp === 'number' && data.xp >= 0) {
            repaired.xp = data.xp;
        }
        if (typeof data.wisdom === 'number' && data.wisdom >= 0) {
            repaired.wisdom = data.wisdom;
        }
        if (Array.isArray(data.scenariosRead)) {
            repaired.scenariosRead = data.scenariosRead.filter(id => typeof id === 'number');
        }
        if (Array.isArray(data.unlockedBadges)) {
            repaired.unlockedBadges = data.unlockedBadges.filter(id => typeof id === 'string');
        }
        if (data.lastPlayed) {
            repaired.lastPlayed = data.lastPlayed;
        }
    }
    
    console.log('✅ Données réparées:', repaired);
    return repaired;
}

// ==========================================
// SAFE LOAD/SAVE
// ==========================================

function safeLoadGlobalData() {
    try {
        if (typeof storage === 'undefined') {
            console.warn('⚠️ storage non disponible');
            return;
        }
        
        const saved = storage.load('globalData');
        
        if (saved) {
            if (validateGlobalData(saved)) {
                globalData = {...globalData, ...saved};
                console.log('✅ Données chargées et validées');
            } else {
                console.warn('⚠️ Données invalides, tentative réparation...');
                globalData = repairGlobalData(saved);
                safeSaveGlobalData(); // Sauvegarder version réparée
            }
        }
    } catch (error) {
        console.error('❌ Erreur chargement données:', error);
        globalData = repairGlobalData(null);
    }
}

function safeSaveGlobalData() {
    try {
        if (typeof storage === 'undefined') {
            console.warn('⚠️ storage non disponible');
            return false;
        }
        
        if (!validateGlobalData(globalData)) {
            console.error('❌ Tentative sauvegarde données invalides');
            return false;
        }
        
        return storage.save('globalData', globalData);
    } catch (error) {
        console.error('❌ Erreur sauvegarde données:', error);
        return false;
    }
}

// Remplacer fonctions globales par versions sécurisées
window.loadGlobalData = safeLoadGlobalData;
window.saveGlobalData = safeSaveGlobalData;

// ==========================================
// HEALTHCHECK
// ==========================================

function healthCheck() {
    const status = {
        dependencies: checkDependencies(),
        localStorage: (() => {
            try {
                localStorage.setItem('test', 'test');
                localStorage.removeItem('test');
                return true;
            } catch {
                return false;
            }
        })(),
        globalData: validateGlobalData(globalData),
        timestamp: new Date().toISOString()
    };
    
    console.log('🏥 Health Check:', status);
    return status;
}

// Exposer en mode dev
if (typeof window !== 'undefined') {
    window.healthCheck = healthCheck;
    window.validateGlobalData = validateGlobalData;
    window.repairGlobalData = repairGlobalData;
}

console.log('🛡️ Système de sécurités chargé');
