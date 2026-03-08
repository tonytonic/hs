// ==========================================
// MODULE LOADER - Intégration Modules 1 & 2
// ==========================================

class ModuleLoader {
    constructor() {
        this.modules = {
            module1: {
                name: 'Module 1 - Suivi Annuel',
                path: 'modules/module1-annuel.html',
                iframe: null,
                loaded: false
            },
            module2: {
                name: 'Module 2 - Suivi Mensuel',
                path: 'modules/module2-mensuel.html',
                iframe: null,
                loaded: false
            }
        };
        
        console.log('📦 Module Loader initialisé');
    }

    // ==========================================
    // CHARGEMENT MODULE 1
    // ==========================================
    
    loadModule1() {
        const container = document.getElementById('module1-content');
        
        if (!container) {
            console.error('❌ Container Module 1 introuvable');
            return;
        }
        
        // Créer iframe
        const iframe = document.createElement('iframe');
        iframe.src = this.modules.module1.path;
        iframe.style.cssText = 'width:100%;height:80vh;border:none;border-radius:10px;background:white;';
        iframe.onload = () => {
            console.log('✅ Module 1 chargé');
            this.modules.module1.loaded = true;
            this.modules.module1.iframe = iframe;
        };
        
        container.innerHTML = `
            <div style="margin-bottom:15px;">
                <h3>📅 Module 1 - Suivi Annuel</h3>
                <p style="color:var(--text-muted);">Source de données pour heures annuelles</p>
                <div class="info-box" style="background:rgba(79,172,254,0.1);padding:15px;border-radius:8px;margin:10px 0;">
                    <strong>ℹ️ Mode Lecture Seule</strong><br>
                    Ce module affiche vos données de saisie.<br>
                    Les modifications sont automatiquement synchronisées vers le Module 3.
                </div>
            </div>
        `;
        container.appendChild(iframe);
        
        // Démarrer synchronisation si pas déjà active
        if (window.dataBridge && !dataBridge.syncInterval) {
            dataBridge.startAutoSync(5000);
        }
    }

    // ==========================================
    // CHARGEMENT MODULE 2
    // ==========================================
    
    loadModule2() {
        const container = document.getElementById('module2-content');
        
        if (!container) {
            console.error('❌ Container Module 2 introuvable');
            return;
        }
        
        // Créer iframe
        const iframe = document.createElement('iframe');
        iframe.src = this.modules.module2.path;
        iframe.style.cssText = 'width:100%;height:80vh;border:none;border-radius:10px;background:white;';
        iframe.onload = () => {
            console.log('✅ Module 2 chargé');
            this.modules.module2.loaded = true;
            this.modules.module2.iframe = iframe;
        };
        
        container.innerHTML = `
            <div style="margin-bottom:15px;">
                <h3>📆 Module 2 - Suivi Mensuel</h3>
                <p style="color:var(--text-muted);">Source de données pour heures mensuelles</p>
                <div class="info-box" style="background:rgba(79,172,254,0.1);padding:15px;border-radius:8px;margin:10px 0;">
                    <strong>ℹ️ Mode Lecture Seule</strong><br>
                    Ce module affiche vos données de saisie.<br>
                    Les modifications sont automatiquement synchronisées vers le Module 3.
                </div>
            </div>
        `;
        container.appendChild(iframe);
        
        // Démarrer synchronisation si pas déjà active
        if (window.dataBridge && !dataBridge.syncInterval) {
            dataBridge.startAutoSync(5000);
        }
    }

    // ==========================================
    // DONNÉES EN TEMPS RÉEL
    // ==========================================
    
    getLiveData() {
        if (!window.dataBridge) {
            console.error('❌ Data Bridge non disponible');
            return null;
        }
        
        return dataBridge.getCombinedData();
    }
    
    getModule1Data() {
        if (!window.dataBridge) return null;
        return dataBridge.readModule1Data();
    }
    
    getModule2Data() {
        if (!window.dataBridge) return null;
        return dataBridge.readModule2Data();
    }

    // ==========================================
    // STATUT
    // ==========================================
    
    getStatus() {
        return {
            module1Loaded: this.modules.module1.loaded,
            module2Loaded: this.modules.module2.loaded,
            bridgeAvailable: typeof window.dataBridge !== 'undefined',
            bridgeStatus: window.dataBridge ? window.dataBridge.getStatus() : null
        };
    }
}

// Instance globale
const moduleLoader = new ModuleLoader();
window.moduleLoader = moduleLoader;

console.log('✅ Module Loader prêt');
