// ============================================
// 🔗 BRIDGE DE LECTURE SEULE
// Modules 1 & 2 → Module 3
// ============================================
// 
// RÈGLES:
// - Module 3 peut LIRE les données des Modules 1 & 2
// - Module 3 ne peut JAMAIS ÉCRIRE dans Modules 1 & 2
// - Synchronisation automatique temps réel
// - Les Modules 1 & 2 restent les sources de vérité
//
// ============================================

class DataBridge {
    constructor() {
        this.watchers = [];
        this.lastSync = null;
        this.syncInterval = null;
        
        // Clés localStorage des modules sources
        this.MODULE1_KEYS = {
            data: 'REPORT_', // + year suffix
            closures: 'CLOSURES_REPORT_',
            reports: 'REPORTS_REPORT_',
            periodMeta: 'PERIOD_META_REPORT_',
            annualRate: 'ANNUAL_RATE_',
            activeSuffix: 'ACTIVE_YEAR_SUFFIX'
        };
        
        this.MODULE2_KEYS = {
            snapshots: 'CA_HS_SNAPSHOTS',
            settings: 'CA_HS_SETTINGS',
            index: 'CA_HS_INDEX_',
            dataVersion: 'CA_DATA_VERSION'
        };
        
        console.log('🔗 Bridge de lecture initialisé');
    }

    // ==========================================
    // LECTURE MODULE 1 (Suivi Annuel)
    // ==========================================
    
    readModule1Data() {
        try {
            const currentYear = localStorage.getItem(this.MODULE1_KEYS.activeSuffix) 
                || new Date().getFullYear().toString();
            
            const data = {
                year: currentYear,
                dailyData: this.safeGetJSON(this.MODULE1_KEYS.data + currentYear, {}),
                closures: this.safeGetJSON(this.MODULE1_KEYS.closures + currentYear, []),
                reports: this.safeGetJSON(this.MODULE1_KEYS.reports + currentYear, {}),
                periodMeta: this.safeGetJSON(this.MODULE1_KEYS.periodMeta + currentYear, {}),
                annualRate: Number(localStorage.getItem(this.MODULE1_KEYS.annualRate + currentYear)) || 10,
                stats: this.calculateModule1Stats(currentYear)
            };
            
            return data;
        } catch (error) {
            console.error('❌ Erreur lecture Module 1:', error);
            return null;
        }
    }
    
    calculateModule1Stats(year) {
        const data = this.safeGetJSON(this.MODULE1_KEYS.data + year, {});
        
        let totalNormal = 0;
        let totalOvertime = 0;
        let totalNight = 0;
        let totalSunday = 0;
        let totalHours = 0;
        let daysWorked = 0;
        
        Object.values(data).forEach(day => {
            if (day && typeof day === 'object') {
                const normal = parseFloat(day.normal || 0);
                const sup25 = parseFloat(day.sup25 || 0);
                const sup50 = parseFloat(day.sup50 || 0);
                const night = parseFloat(day.night || 0);
                const sunday = parseFloat(day.sunday || 0);
                
                totalNormal += normal;
                totalOvertime += (sup25 + sup50);
                totalNight += night;
                totalSunday += sunday;
                totalHours += (normal + sup25 + sup50);
                
                if (normal > 0 || sup25 > 0 || sup50 > 0) {
                    daysWorked++;
                }
            }
        });
        
        return {
            totalNormal,
            totalOvertime,
            totalNight,
            totalSunday,
            totalHours,
            daysWorked,
            averagePerDay: daysWorked > 0 ? (totalHours / daysWorked).toFixed(2) : 0
        };
    }

    // ==========================================
    // LECTURE MODULE 2 (Suivi Mensuel)
    // ==========================================
    
    readModule2Data() {
        try {
            const snapshots = this.safeGetJSON(this.MODULE2_KEYS.snapshots, []);
            const settings = this.safeGetJSON(this.MODULE2_KEYS.settings, {});
            
            // Récupérer tous les index mensuels
            const monthlyData = this.getAllMonthlyData();
            
            const data = {
                snapshots: snapshots,
                settings: settings,
                monthlyData: monthlyData,
                stats: this.calculateModule2Stats(snapshots, monthlyData)
            };
            
            return data;
        } catch (error) {
            console.error('❌ Erreur lecture Module 2:', error);
            return null;
        }
    }
    
    getAllMonthlyData() {
        const monthlyData = [];
        
        // Scanner les clés localStorage pour trouver tous les index mensuels
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('CA_HS_INDEX_')) {
                const monthId = key.replace('CA_HS_INDEX_', '');
                const data = this.safeGetJSON(key, []);
                
                if (data.length > 0) {
                    monthlyData.push({
                        monthId: monthId,
                        entries: data
                    });
                }
            }
        }
        
        return monthlyData;
    }
    
    calculateModule2Stats(snapshots, monthlyData) {
        let totalHours = 0;
        let totalEntries = 0;
        let totalMonths = monthlyData.length;
        
        monthlyData.forEach(month => {
            month.entries.forEach(entry => {
                if (entry.hours) {
                    totalHours += parseFloat(entry.hours || 0);
                    totalEntries++;
                }
            });
        });
        
        return {
            totalSnapshots: snapshots.length,
            totalMonths: totalMonths,
            totalEntries: totalEntries,
            totalHours: totalHours,
            averagePerMonth: totalMonths > 0 ? (totalHours / totalMonths).toFixed(2) : 0
        };
    }

    // ==========================================
    // DONNÉES COMBINÉES (Module 1 + Module 2)
    // ==========================================
    
    getCombinedData() {
        const module1 = this.readModule1Data();
        const module2 = this.readModule2Data();
        
        return {
            module1: module1,
            module2: module2,
            combined: this.mergeData(module1, module2),
            timestamp: Date.now(),
            source: 'bridge-readonly'
        };
    }
    
    mergeData(mod1, mod2) {
        if (!mod1 || !mod2) return null;
        
        return {
            totalHours: (mod1.stats.totalHours || 0) + (mod2.stats.totalHours || 0),
            totalOvertime: mod1.stats.totalOvertime || 0,
            totalNight: mod1.stats.totalNight || 0,
            totalSunday: mod1.stats.totalSunday || 0,
            daysWorked: mod1.stats.daysWorked || 0,
            monthsTracked: mod2.stats.totalMonths || 0,
            snapshotsCount: mod2.stats.totalSnapshots || 0
        };
    }

    // ==========================================
    // SYNCHRONISATION AUTOMATIQUE
    // ==========================================
    
    startAutoSync(interval = 5000) {
        // Sync toutes les 5 secondes par défaut
        this.syncInterval = setInterval(() => {
            const data = this.getCombinedData();
            this.notifyWatchers(data);
            this.lastSync = Date.now();
        }, interval);
        
        // Sync immédiat au démarrage
        const data = this.getCombinedData();
        this.notifyWatchers(data);
        
        console.log(`🔄 Auto-sync activé (${interval}ms)`);
    }
    
    stopAutoSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
            console.log('⏸️ Auto-sync désactivé');
        }
    }
    
    // ==========================================
    // SYSTÈME DE WATCHERS (Observateurs)
    // ==========================================
    
    addWatcher(callback) {
        this.watchers.push(callback);
        
        // Envoyer immédiatement les données actuelles au nouveau watcher
        const data = this.getCombinedData();
        callback(data);
        
        return () => this.removeWatcher(callback);
    }
    
    removeWatcher(callback) {
        this.watchers = this.watchers.filter(w => w !== callback);
    }
    
    notifyWatchers(data) {
        this.watchers.forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error('❌ Erreur watcher:', error);
            }
        });
    }

    // ==========================================
    // PROTECTION ÉCRITURE (READ-ONLY)
    // ==========================================
    
    preventWrite() {
        // Surveiller les tentatives d'écriture dans les modules sources
        const originalSetItem = localStorage.setItem;
        const bridge = this;
        
        localStorage.setItem = function(key, value) {
            // Bloquer écriture si clé appartient aux modules sources
            if (bridge.isProtectedKey(key)) {
                console.warn('🚫 ÉCRITURE BLOQUÉE:', key, '(Module source en lecture seule)');
                return;
            }
            
            // Autoriser autres écritures
            originalSetItem.call(localStorage, key, value);
        };
        
        console.log('🔒 Protection écriture activée');
    }
    
    isProtectedKey(key) {
        // Vérifier si la clé appartient aux modules sources
        const protectedPrefixes = [
            'REPORT_',
            'CLOSURES_REPORT_',
            'REPORTS_REPORT_',
            'PERIOD_META_REPORT_',
            'ANNUAL_RATE_',
            'ACTIVE_YEAR_SUFFIX',
            'CA_HS_'
        ];
        
        return protectedPrefixes.some(prefix => key.startsWith(prefix));
    }

    // ==========================================
    // UTILITAIRES
    // ==========================================
    
    safeGetJSON(key, defaultValue) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`❌ Erreur parsing ${key}:`, error);
            return defaultValue;
        }
    }
    
    getStatus() {
        return {
            autoSyncActive: this.syncInterval !== null,
            lastSync: this.lastSync ? new Date(this.lastSync).toLocaleString('fr-FR') : 'Jamais',
            watchersCount: this.watchers.length,
            module1Available: this.readModule1Data() !== null,
            module2Available: this.readModule2Data() !== null
        };
    }
    
    // ==========================================
    // EXPORT DONNÉES (pour debug)
    // ==========================================
    
    exportData() {
        const data = this.getCombinedData();
        return JSON.stringify(data, null, 2);
    }
}

// ==========================================
// INSTANCE GLOBALE
// ==========================================

const dataBridge = new DataBridge();

// Activer protection écriture par défaut
dataBridge.preventWrite();

// Exposer globalement
window.dataBridge = dataBridge;

console.log('✅ Data Bridge chargé et prêt');

// ==========================================
// EXEMPLE D'UTILISATION
// ==========================================

/*
// Dans Module 3, pour recevoir les données :

dataBridge.addWatcher((data) => {
    console.log('📊 Nouvelles données reçues:', data);
    
    if (data.module1) {
        console.log('Module 1 - Total heures:', data.module1.stats.totalHours);
        console.log('Module 1 - Heures sup:', data.module1.stats.totalOvertime);
    }
    
    if (data.module2) {
        console.log('Module 2 - Snapshots:', data.module2.stats.totalSnapshots);
        console.log('Module 2 - Mois trackés:', data.module2.stats.totalMonths);
    }
    
    if (data.combined) {
        console.log('Combiné - Total général:', data.combined.totalHours);
    }
});

// Démarrer la synchronisation automatique
dataBridge.startAutoSync(5000); // Toutes les 5 secondes

// Vérifier le statut
console.log(dataBridge.getStatus());

// Stopper la sync (si besoin)
// dataBridge.stopAutoSync();
*/
