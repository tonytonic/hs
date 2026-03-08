// ===== CONFIGURATION =====
// Configuration globale du jeu

const CONFIG = {
    version: '1.0.0',
    name: 'Module 3 RPG - Ultimate',
    
    // XP
    xpPerHour: 100,
    
    // Limites
    maxActiveQuests: 5,
    maxInventorySlots: 20,
    
    // Énergies
    maxEnergy: 100,
    maxWisdom: 100,
    energyRegenRate: 1, // par minute
    
    // Sauvegardes
    autoSaveInterval: 30000, // 30 secondes
    
    // IA
    aiMaxTokens: 1000,
    aiModel: 'claude-sonnet-4-20250514'
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
