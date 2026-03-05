// ===== ASSETS CONFIG - Gestion des images personnalisées =====
//
// STRUCTURE DES DOSSIERS À CRÉER SUR GITHUB :
//
//  assets/
//  ├── badges/
//  │   ├── badge_first_scenario.png      (ou .jpg / .gif)
//  │   ├── badge_scenarios_10.png
//  │   ├── badge_scenarios_25.png
//  │   ├── ... (1 image par badge_ID)
//  │   └── badge_league_legend.png
//  │
//  ├── leagues/
//  │   ├── league_bronze3.png
//  │   ├── league_bronze2.png
//  │   ├── league_bronze1.png
//  │   ├── league_silver3.png
//  │   ├── league_silver2.png
//  │   ├── league_silver1.png
//  │   ├── league_gold3.png
//  │   ├── league_gold2.png
//  │   ├── league_gold1.png
//  │   └── league_legend.png
//  │
//  ├── characters/
//  │   ├── fox_spring.png    ← Renard Printemps (Mars-Mai)
//  │   ├── fox_summer.png    ← Renard Été (Juin-Août)
//  │   ├── fox_autumn.png    ← Renard Automne (Sep-Nov)
//  │   └── fox_winter.png    ← Renard Hiver (Déc-Fév)
//  │
//  └── backgrounds/
//      ├── bg_spring.jpg     ← Décor Printemps
//      ├── bg_summer.jpg     ← Décor Été
//      ├── bg_autumn.jpg     ← Décor Automne
//      └── bg_winter.jpg     ← Décor Hiver
//
// SI L'IMAGE N'EXISTE PAS → FALLBACK AUTOMATIQUE SUR EMOJI
// Aucun bug si image manquante !
//
// =====================================================

const ASSETS_CONFIG = {

    // ==========================================
    // CHEMIN RACINE
    // ==========================================
    basePath: './assets',

    // ==========================================
    // EXTENSIONS ACCEPTÉES (ordre de priorité)
    // ==========================================
    extensions: ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'],

    // ==========================================
    // 🦊 PERSONNAGE RENARD - 4 SAISONS
    // ==========================================
    characters: {
        spring: {
            path: './assets/characters/fox_spring.png',
            fallbackEmoji: '🦊',
            alt: 'Kitsune Printemps',
            season: 'spring'
        },
        summer: {
            path: './assets/characters/fox_summer.png',
            fallbackEmoji: '🦊',
            alt: 'Kitsune Été',
            season: 'summer'
        },
        autumn: {
            path: './assets/characters/fox_autumn.png',
            fallbackEmoji: '🦊',
            alt: 'Kitsune Automne',
            season: 'autumn'
        },
        winter: {
            path: './assets/characters/fox_winter.png',
            fallbackEmoji: '🦊',
            alt: 'Kitsune Hiver',
            season: 'winter'
        }
    },

    // ==========================================
    // 🌿 DÉCORS SAISONNIERS - 4 BACKGROUNDS
    // ==========================================
    backgrounds: {
        spring: {
            path: './assets/backgrounds/bg_spring.jpg',
            fallbackColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            season: 'spring'
        },
        summer: {
            path: './assets/backgrounds/bg_summer.jpg',
            fallbackColor: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
            season: 'summer'
        },
        autumn: {
            path: './assets/backgrounds/bg_autumn.jpg',
            fallbackColor: 'linear-gradient(135deg, #d4a843 0%, #8b4513 100%)',
            season: 'autumn'
        },
        winter: {
            path: './assets/backgrounds/bg_winter.jpg',
            fallbackColor: 'linear-gradient(135deg, #accbee 0%, #e7f0fd 100%)',
            season: 'winter'
        }
    },

    // ==========================================
    // ⚔️ LIGUES - 10 IMAGES
    // ==========================================
    leagues: {
        0: { path: './assets/leagues/league_bronze3.png',  fallbackEmoji: '🥉', name: 'Bronze III' },
        1: { path: './assets/leagues/league_bronze2.png',  fallbackEmoji: '🥉', name: 'Bronze II' },
        2: { path: './assets/leagues/league_bronze1.png',  fallbackEmoji: '🥉', name: 'Bronze I' },
        3: { path: './assets/leagues/league_silver3.png',  fallbackEmoji: '🥈', name: 'Silver III' },
        4: { path: './assets/leagues/league_silver2.png',  fallbackEmoji: '🥈', name: 'Silver II' },
        5: { path: './assets/leagues/league_silver1.png',  fallbackEmoji: '🥈', name: 'Silver I' },
        6: { path: './assets/leagues/league_gold3.png',    fallbackEmoji: '🥇', name: 'Gold III' },
        7: { path: './assets/leagues/league_gold2.png',    fallbackEmoji: '🥇', name: 'Gold II' },
        8: { path: './assets/leagues/league_gold1.png',    fallbackEmoji: '🥇', name: 'Gold I' },
        9: { path: './assets/leagues/league_legend.png',   fallbackEmoji: '👑', name: 'Legend' }
    },

    // ==========================================
    // 🏆 BADGES - 50 IMAGES
    // Nom du fichier = badge_[ID].png
    // ==========================================
    badges: {
        // COMMUNS (20)
        first_scenario:   { path: './assets/badges/badge_first_scenario.png',   fallbackEmoji: '📖' },
        scenarios_10:     { path: './assets/badges/badge_scenarios_10.png',      fallbackEmoji: '🔍' },
        scenarios_25:     { path: './assets/badges/badge_scenarios_25.png',      fallbackEmoji: '📚' },
        scenarios_50:     { path: './assets/badges/badge_scenarios_50.png',      fallbackEmoji: '✏️' },
        scenarios_100:    { path: './assets/badges/badge_scenarios_100.png',     fallbackEmoji: '📖' },
        level_5:          { path: './assets/badges/badge_level_5.png',           fallbackEmoji: '⭐' },
        level_10:         { path: './assets/badges/badge_level_10.png',          fallbackEmoji: '⭐' },
        wisdom_100:       { path: './assets/badges/badge_wisdom_100.png',        fallbackEmoji: '🧠' },
        standard_master:  { path: './assets/badges/badge_standard_master.png',   fallbackEmoji: '📊' },
        intense_reader:   { path: './assets/badges/badge_intense_reader.png',    fallbackEmoji: '🔥' },
        night_worker:     { path: './assets/badges/badge_night_worker.png',      fallbackEmoji: '🌙' },
        weekend_warrior:  { path: './assets/badges/badge_weekend_warrior.png',   fallbackEmoji: '📅' },
        wellbeing_fan:    { path: './assets/badges/badge_wellbeing_fan.png',     fallbackEmoji: '💚' },
        module1_user:     { path: './assets/badges/badge_module1_user.png',      fallbackEmoji: '📅' },
        module2_user:     { path: './assets/badges/badge_module2_user.png',      fallbackEmoji: '📆' },
        first_week:       { path: './assets/badges/badge_first_week.png',        fallbackEmoji: '📆' },
        hours_100:        { path: './assets/badges/badge_hours_100.png',         fallbackEmoji: '⏰' },
        consistent:       { path: './assets/badges/badge_consistent.png',        fallbackEmoji: '📈' },
        explorer:         { path: './assets/badges/badge_explorer.png',          fallbackEmoji: '🗺️' },
        quick_learner:    { path: './assets/badges/badge_quick_learner.png',     fallbackEmoji: '⚡' },
        // RARES (15)
        scenarios_150:    { path: './assets/badges/badge_scenarios_150.png',     fallbackEmoji: '📚' },
        scenarios_200:    { path: './assets/badges/badge_scenarios_200.png',     fallbackEmoji: '🎓' },
        level_15:         { path: './assets/badges/badge_level_15.png',          fallbackEmoji: '⭐' },
        level_20:         { path: './assets/badges/badge_level_20.png',          fallbackEmoji: '💫' },
        wisdom_250:       { path: './assets/badges/badge_wisdom_250.png',        fallbackEmoji: '🧠' },
        wisdom_500:       { path: './assets/badges/badge_wisdom_500.png',        fallbackEmoji: '🧙' },
        category_master:  { path: './assets/badges/badge_category_master.png',   fallbackEmoji: '🎯' },
        hours_500:        { path: './assets/badges/badge_hours_500.png',         fallbackEmoji: '💼' },
        overtime_tracker: { path: './assets/badges/badge_overtime_tracker.png',  fallbackEmoji: '⏱️' },
        night_expert:     { path: './assets/badges/badge_night_expert.png',      fallbackEmoji: '🌙' },
        prevention_master:{ path: './assets/badges/badge_prevention_master.png', fallbackEmoji: '🛡️' },
        both_modules:     { path: './assets/badges/badge_both_modules.png',      fallbackEmoji: '📊' },
        perfect_week:     { path: './assets/badges/badge_perfect_week.png',      fallbackEmoji: '✨' },
        marathon:         { path: './assets/badges/badge_marathon.png',          fallbackEmoji: '🏃' },
        league_silver:    { path: './assets/badges/badge_league_silver.png',     fallbackEmoji: '🥈' },
        // ÉPIQUES (10)
        scenarios_300:    { path: './assets/badges/badge_scenarios_300.png',     fallbackEmoji: '🎖️' },
        scenarios_400:    { path: './assets/badges/badge_scenarios_400.png',     fallbackEmoji: '👑' },
        level_30:         { path: './assets/badges/badge_level_30.png',          fallbackEmoji: '🌟' },
        level_40:         { path: './assets/badges/badge_level_40.png',          fallbackEmoji: '💎' },
        wisdom_1000:      { path: './assets/badges/badge_wisdom_1000.png',       fallbackEmoji: '🧙‍♂️' },
        all_categories:   { path: './assets/badges/badge_all_categories.png',    fallbackEmoji: '🌈' },
        hours_1000:       { path: './assets/badges/badge_hours_1000.png',        fallbackEmoji: '🏭' },
        legal_expert:     { path: './assets/badges/badge_legal_expert.png',      fallbackEmoji: '⚖️' },
        league_gold:      { path: './assets/badges/badge_league_gold.png',       fallbackEmoji: '🥇' },
        wellbeing_champion:{ path: './assets/badges/badge_wellbeing_champion.png',fallbackEmoji: '💚' },
        // LÉGENDAIRES (5)
        scenarios_500:    { path: './assets/badges/badge_scenarios_500.png',     fallbackEmoji: '🏆' },
        completionist:    { path: './assets/badges/badge_completionist.png',     fallbackEmoji: '💯' },
        level_50:         { path: './assets/badges/badge_level_50.png',          fallbackEmoji: '👑' },
        wisdom_2000:      { path: './assets/badges/badge_wisdom_2000.png',       fallbackEmoji: '🔮' },
        league_legend:    { path: './assets/badges/badge_league_legend.png',     fallbackEmoji: '👑' }
    }
};

// ==========================================
// FONCTIONS HELPERS
// ==========================================

/**
 * Renvoie un élément <img> avec fallback automatique sur emoji
 * Usage: getAssetImg('badges', 'first_scenario', 'badge-icon')
 */
function getAssetImg(type, id, cssClass = '', size = '48px') {
    const config = ASSETS_CONFIG[type]?.[id];
    if (!config) return `<span style="font-size:${size}">${'❓'}</span>`;

    return `<img 
        src="${config.path}" 
        alt="${config.alt || id}"
        class="${cssClass}"
        style="width:${size};height:${size};object-fit:contain;"
        onerror="this.style.display='none';this.nextElementSibling.style.display='block';"
    /><span class="${cssClass}-fallback" style="font-size:${size};display:none;">${config.fallbackEmoji}</span>`;
}

/**
 * Renvoie l'image ou l'emoji d'une ligue
 */
function getLeagueAsset(leagueId, size = '40px') {
    return getAssetImg('leagues', leagueId, 'league-img', size);
}

/**
 * Renvoie l'image ou l'emoji d'un badge
 */
function getBadgeAsset(badgeId, size = '48px') {
    return getAssetImg('badges', badgeId, 'badge-img', size);
}

/**
 * Renvoie le renard saisonnier
 */
function getFoxAsset(season, size = '80px') {
    const config = ASSETS_CONFIG.characters[season];
    if (!config) return `<span style="font-size:${size}">🦊</span>`;
    
    return `<img 
        src="${config.path}" 
        alt="${config.alt}"
        class="fox-character-img"
        style="width:${size};height:auto;"
        onerror="this.style.display='none';this.nextElementSibling.style.display='block';"
    /><span class="fox-fallback" style="font-size:${size};display:none;">🦊</span>`;
}

/**
 * Applique le background saisonnier
 */
function applySeasonBackground(season) {
    const config = ASSETS_CONFIG.backgrounds[season];
    if (!config) return;

    const bgElements = document.querySelectorAll('.background-layer');
    bgElements.forEach(el => {
        el.style.opacity = '0';
        el.style.backgroundImage = '';
    });

    const targetEl = document.getElementById(`bg-${season}`);
    if (targetEl) {
        const img = new Image();
        img.onload = () => {
            targetEl.style.backgroundImage = `url('${config.path}')`;
            targetEl.style.opacity = '0.15';
        };
        img.onerror = () => {
            // Fallback sur gradient CSS
            targetEl.style.background = config.fallbackColor;
            targetEl.style.opacity = '0.3';
        };
        img.src = config.path;
    }
}

/**
 * Détecte la saison actuelle
 */
function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5)  return 'spring';
    if (month >= 6 && month <= 8)  return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
}

console.log('🎨 Assets Config chargé - Images + Fallback Emoji activés');
