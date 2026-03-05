// ===== MODULE 3 - SYSTÈME RPG AVEC IMAGES =====

function loadModule3() {
    updateRPGDisplay();
    displayLeagues();
    displayBadges('all');
    
    // Check badges au chargement
    if (window.rpgSystem) {
        try { rpgSystem.checkBadges(); } catch(e) { console.error(e); }
    }
    
    // Event listeners filtres badges
    document.querySelectorAll('.badge-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.badge-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayBadges(btn.dataset.rarity);
        });
    });
}

// ==========================================
// AFFICHAGE XP & PROGRESSION
// ==========================================

function updateRPGDisplay() {
    if (!window.rpgSystem) return;
    
    try {
        const stats = rpgSystem.getStats();
        
        // Niveau
        const rpgLevel = document.getElementById('rpg-level');
        if (rpgLevel) rpgLevel.textContent = stats.level;
        
        // XP & Sagesse
        const rpgXP = document.getElementById('rpg-xp-value');
        const rpgWisdom = document.getElementById('rpg-wisdom-value');
        if (rpgXP) rpgXP.textContent = stats.xp.toLocaleString();
        if (rpgWisdom) rpgWisdom.textContent = stats.wisdom;
        
        // Ligue avec IMAGE
        const leagueDisplay = document.getElementById('rpg-league');
        if (leagueDisplay && stats.league) {
            // Utilise l'image si disponible, sinon emoji
            const leagueImg = typeof getLeagueAsset === 'function'
                ? getLeagueAsset(stats.league.id, '28px')
                : `<span style="font-size:1.5em">${stats.league.icon}</span>`;
            
            leagueDisplay.innerHTML = `
                <span class="league-asset">${leagueImg}</span>
                <span class="league-name" style="color:${stats.league.color}">${stats.league.name}</span>
            `;
        }
        
        // Barre XP
        const currentLevel = document.getElementById('rpg-current-level');
        const nextLevel = document.getElementById('rpg-next-level');
        const xpText = document.getElementById('rpg-xp-text');
        
        if (currentLevel) currentLevel.textContent = stats.level;
        if (nextLevel) nextLevel.textContent = stats.level + 1;
        if (xpText) xpText.textContent = `${stats.xp.toLocaleString()} / ${stats.xpNeeded.toLocaleString()} XP`;
        
        const xpBar = document.getElementById('rpg-xp-bar');
        const xpGlow = document.getElementById('rpg-xp-glow');
        if (xpBar) xpBar.style.width = stats.xpProgress + '%';
        if (xpGlow) xpGlow.style.width = stats.xpProgress + '%';
        
        // Compteur badges
        const badgesCount = document.getElementById('badges-count');
        if (badgesCount) badgesCount.textContent = `${stats.badges}/${stats.badgesTotal}`;

    } catch(error) {
        console.error('❌ Erreur updateRPGDisplay:', error);
    }
}

// ==========================================
// AFFICHAGE LIGUES AVEC IMAGES
// ==========================================

function displayLeagues() {
    if (!window.rpgSystem) return;
    
    const container = document.getElementById('leagues-grid');
    if (!container) return;
    
    try {
        const currentLeague = rpgSystem.getLeague();
        const currentXP = globalData.xp;
        
        container.innerHTML = rpgSystem.leagues.map(league => {
            const isCurrent = league.id === currentLeague.id;
            const isUnlocked = currentXP >= league.minXP;
            const isLocked = !isUnlocked;
            
            let classes = 'league-card';
            if (isCurrent) classes += ' current';
            else if (isUnlocked) classes += ' unlocked';
            else classes += ' locked';
            
            // IMAGE ligue avec fallback emoji
            const leagueVisual = typeof getLeagueAsset === 'function'
                ? getLeagueAsset(league.id, '60px')
                : `<span style="font-size:2.5em">${league.icon}</span>`;
            
            return `
                <div class="${classes}">
                    <div class="league-card-icon">${leagueVisual}</div>
                    <div class="league-card-name" style="color:${league.color}">${league.name}</div>
                    <div class="league-card-xp">${league.minXP.toLocaleString()} XP</div>
                    ${isCurrent ? '<div class="league-status current-status">● Actuel</div>' : ''}
                    ${isUnlocked && !isCurrent ? '<div class="league-status unlocked-status">✓</div>' : ''}
                    ${isLocked ? '<div class="league-status locked-status">🔒</div>' : ''}
                </div>
            `;
        }).join('');

    } catch(error) {
        console.error('❌ Erreur displayLeagues:', error);
    }
}

// ==========================================
// AFFICHAGE BADGES AVEC IMAGES
// ==========================================

function displayBadges(rarity) {
    if (!window.rpgSystem) return;
    
    const container = document.getElementById('badges-grid');
    if (!container) return;
    
    try {
        let badges = rpgSystem.badges;
        if (rarity !== 'all') {
            badges = badges.filter(b => b.rarity === rarity);
        }
        
        container.innerHTML = badges.map(badge => {
            const isUnlocked = globalData.unlockedBadges.includes(badge.id);
            const classes = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            // IMAGE badge avec fallback emoji
            const badgeVisual = typeof getBadgeAsset === 'function'
                ? getBadgeAsset(badge.id, '48px')
                : `<span style="font-size:2.5em">${badge.icon}</span>`;
            
            return `
                <div class="${classes}" onclick="showBadgeDetail('${badge.id}')">
                    <div class="badge-card-icon">${badgeVisual}</div>
                    <div class="badge-card-name">${badge.name}</div>
                    <div class="badge-card-rarity rarity-${badge.rarity}">${getRarityName(badge.rarity)}</div>
                    ${isUnlocked ? `<div class="badge-xp-reward">+${badge.xp} XP</div>` : ''}
                </div>
            `;
        }).join('');

    } catch(error) {
        console.error('❌ Erreur displayBadges:', error);
    }
}

function getRarityName(rarity) {
    const names = { common: 'Commun', uncommon: 'Rare', rare: 'Épique', legendary: 'Légendaire' };
    return names[rarity] || rarity;
}

// ==========================================
// MODAL BADGE AVEC IMAGE
// ==========================================

function showBadgeDetail(badgeId) {
    if (!window.rpgSystem) return;
    
    const badge = rpgSystem.badges.find(b => b.id === badgeId);
    if (!badge) return;
    
    const isUnlocked = globalData.unlockedBadges.includes(badge.id);
    
    const rarityColors = {
        common: '#ccc', uncommon: '#1e90ff', rare: '#8a2be2', legendary: '#ffd700'
    };
    
    // IMAGE grande taille pour modal
    const bigVisual = typeof getBadgeAsset === 'function'
        ? getBadgeAsset(badge.id, '80px')
        : `<span style="font-size:5em">${badge.icon}</span>`;
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="badge-modal-icon ${isUnlocked ? '' : 'badge-modal-locked'}">${bigVisual}</div>
            <h2 style="color:${rarityColors[badge.rarity]};margin:15px 0 10px;">${badge.name}</h2>
            <span class="badge-card-rarity rarity-${badge.rarity}">${getRarityName(badge.rarity)}</span>
            <p style="color:var(--text-muted);margin:15px 0;">${badge.desc}</p>
            
            <div class="badge-modal-status ${isUnlocked ? 'status-unlocked' : 'status-locked'}">
                ${isUnlocked
                    ? `<div>✅ Badge débloqué !</div><div>+${badge.xp} XP obtenus</div>`
                    : `<div>🔒 Objectif non atteint</div><div>Récompense : +${badge.xp} XP</div>`
                }
            </div>
            
            <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="width:100%;margin-top:20px;">
                Fermer
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// ==========================================
// AUTO-UPDATE
// ==========================================

setInterval(() => {
    try {
        if (window.rpgSystem) {
            rpgSystem.checkBadges();
            const activeModule = document.querySelector('#module-module3.module-content.active');
            if (activeModule) {
                updateRPGDisplay();
                displayLeagues();
            }
        }
    } catch(e) { /* silencieux */ }
}, 10000);

console.log('🎮 Module 3 RPG avec images chargé');
