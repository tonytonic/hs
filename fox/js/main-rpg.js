// ===== MAIN RPG CONTROLLER =====
// Orchestration principale du jeu

// État global du jeu
let gameState = {
    player: {
        name: "Héros",
        title: "Apprenti Travailleur",
        level: 1,
        xp: 0,
        energy: 100,
        wisdom: 0,
        chapter: 1
    },
    hours: {
        weekly: 0,
        monthly: 0,
        annual: 0,
        total: 0
    },
    currentScene: 'office',
    unlockedScenes: ['office']
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🦊 Module 3 RPG - Ultimate chargé!');
    initializeGame();
    loadGameState();
    updateAllDisplays();
    setupEventListeners();
    showWelcomeMessage();
});

// Initialiser le jeu
function initializeGame() {
    // Vérifier si c'est la première fois
    const isFirstTime = !localStorage.getItem('rpg_game_state');
    
    if (isFirstTime) {
        showTutorial();
    }
}

// Charger l'état du jeu
function loadGameState() {
    console.log('🔍 loadGameState: START', typeof xpSystem);
    const saved = localStorage.getItem('rpg_game_state');
    if (saved) {
        gameState = JSON.parse(saved);
    }
    
    // Synchroniser avec les systèmes
    if (typeof xpSystem !== 'undefined') {
        xpSystem.currentXP = gameState.player.xp;
        xpSystem.level = gameState.player.level;
    }
}

// Sauvegarder l'état du jeu
function saveGameState() {
    console.log('🔍 saveGameState: START', typeof xpSystem);
    if (typeof xpSystem !== 'undefined') {
        gameState.player.xp = xpSystem.currentXP;
        gameState.player.level = xpSystem.level;
    }
    localStorage.setItem('rpg_game_state', JSON.stringify(gameState));
}

// Mettre à jour tous les affichages
function updateAllDisplays() {
    updatePlayerStats();
    updateLeague();
    updateXPBar();
    updateVitalStats();
    updateQuickStats();
}

// Mettre à jour les stats du joueur
function updatePlayerStats() {
    console.log('🔍 updatePlayerStats: START');
    const levelEl = document.getElementById('hud-level');
    const xpEl = document.getElementById('hud-xp');
    console.log('🔍 Elements:', {levelEl, xpEl, xpSystem: typeof xpSystem});
    if (!levelEl || !xpEl) {
        console.warn('⚠️ Elements manquants:', {levelEl, xpEl});
        return;
    }
    document.getElementById('hud-level').textContent = gameState.player.level;
    document.getElementById('hud-xp').textContent = xpSystem.currentXP;
    document.getElementById('hud-xp-max').textContent = xpSystem.getXPForNextLevel(gameState.player.level);
    
    const progress = xpSystem.getCurrentLevelProgress();
    document.getElementById('hud-xp-fill').style.width = progress.percentage + '%';
}

// Mettre à jour la ligue
function updateLeague() {
    console.log('🔍 updateLeague: START');
    if (typeof xpSystem === 'undefined' || typeof leagueSystem === 'undefined') {
        console.log('⚠️ updateLeague: xpSystem ou leagueSystem undefined');
        return;
    }
    const league = leagueSystem.getCurrentLeague(xpSystem.currentXP);
    const leagueEl = document.getElementById('hud-league');
    console.log('🔍 updateLeague:', {league: league?.name, leagueEl, exists: !!leagueEl});
    if (leagueEl && league) {
        leagueEl.textContent = league.name;
    } else {
        console.warn('⚠️ updateLeague: élément hud-league absent du DOM');
    }
}

// Mettre à jour la barre XP
function updateXPBar() {
    const progress = xpSystem.getCurrentLevelProgress();
    document.getElementById('hud-xp-fill').style.width = progress.percentage + '%';
}

// Mettre à jour les stats vitales
function updateVitalStats() {
    document.getElementById('energy-current').textContent = gameState.player.energy;
    document.getElementById('energy-bar').style.width = gameState.player.energy + '%';
    
    document.getElementById('wisdom-current').textContent = gameState.player.wisdom;
    document.getElementById('wisdom-bar').style.width = (gameState.player.wisdom / 100) * 100 + '%';
}

// Mettre à jour les stats rapides
function updateQuickStats() {
    document.getElementById('total-hours').textContent = gameState.hours.total.toFixed(1) + 'h';
    
    const scenariosStats = scenarioSystemAI.getStats();
    document.getElementById('scenarios-count').textContent = `${scenariosStats.read}/600`;
    document.getElementById('scenarios-read-count').textContent = scenariosStats.read;
    document.getElementById('scenarios-favorites').textContent = scenariosStats.favorites;
    
    const badgesStats = badgeSystem.getBadgeStats();
    document.getElementById('badges-count').textContent = `${badgesStats.unlocked}/50`;
    
    const questsStats = questSystem.getStats();
    document.getElementById('quests-active').textContent = questsStats.active;
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Onglets de contenu
    document.querySelectorAll('.content-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchContentPanel(this.dataset.content);
        });
    });

    // Bouton de génération de scénario
    document.getElementById('generate-scenario-btn').addEventListener('click', generateScenarioWithAI);

    // Bouton parler à Kitsune
    document.getElementById('talk-to-fox').addEventListener('click', openKitsuneDialogue);

    // Bouton d'ajout d'heures
    document.getElementById('add-hours-btn').addEventListener('click', addHoursAndAnalyze);

    // Fermeture du modal
    document.querySelector('.close').addEventListener('click', closeModal);

    // Input IA
    document.getElementById('send-ai-message').addEventListener('click', sendMessageToKitsune);
    document.getElementById('ai-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessageToKitsune();
    });
}

// Changer de panneau de contenu
function switchContentPanel(panelName) {
    // Désactiver tous les panneaux
    document.querySelectorAll('.content-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.querySelectorAll('.content-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Activer le panneau sélectionné
    document.getElementById(`${panelName}-panel`).classList.add('active');
    document.querySelector(`[data-content="${panelName}"]`).classList.add('active');

    // Actions spécifiques par panneau
    if (panelName === 'scenarios') {
        loadScenarios();
    } else if (panelName === 'quests') {
        loadQuests();
    }
}

// Générer un scénario avec l'IA
async function generateScenarioWithAI() {
    const type = document.getElementById('scenario-type').value;
    const difficulty = document.getElementById('scenario-difficulty').value;
    const context = document.getElementById('scenario-context').value;

    showNotification('🤖 Kitsune génère votre scénario...', 'info');

    const result = await aiIntegration.generateScenario(type, difficulty, context);

    if (result.error) {
        showNotification('❌ ' + result.error, 'error');
        if (result.fallback) {
            displayGeneratedScenario(result.fallback);
        }
        return;
    }

    displayGeneratedScenario(result);
    showNotification('✨ Scénario généré avec succès!', 'success');

    // Ajouter XP et sagesse pour avoir généré un scénario
    addXP(50);
    addWisdom(5);

    // Mettre à jour la progression de quête
    questSystem.updateQuestProgress('side_002', 'gen_ai_10', 1);

    saveGameState();
}

// Afficher le scénario généré
function displayGeneratedScenario(scenario) {
    const container = document.getElementById('generated-scenario');
    
    document.getElementById('generated-title').textContent = scenario.title;
    document.getElementById('generated-difficulty').textContent = scenario.difficulty;
    document.getElementById('generated-difficulty').className = `difficulty-badge ${scenario.difficulty}`;
    
    document.getElementById('generated-content').innerHTML = `
        <p><strong>Personnage :</strong> ${scenario.character} - ${scenario.profession}</p>
        <p><strong>Situation :</strong> ${scenario.situation}</p>
    `;
    
    document.getElementById('generated-advice').innerHTML = `
        <h4>💡 Conseil Juridique</h4>
        <p>${scenario.advice}</p>
        <p style="margin-top: 15px;"><em>Référence : ${scenario.legalReference}</em></p>
    `;
    
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });

    // Sauvegarder le scénario IA
    scenarioSystemAI.addAIScenario(scenario);
}

// Ouvrir le dialogue avec Kitsune
function openKitsuneDialogue() {
    const modal = document.getElementById('ai-modal');
    modal.classList.add('show');
    
    // Message d'accueil
    if (aiIntegration.conversationHistory.length === 0) {
        addToConversation('Bonjour! Je suis Kitsune, ton guide dans ce monde du droit du travail. Pose-moi tes questions! 🦊', 'assistant');
    }
}

// Fermer le modal
function closeModal() {
    document.getElementById('ai-modal').classList.remove('show');
}

// Envoyer un message à Kitsune
async function sendMessageToKitsune() {
    const input = document.getElementById('ai-input');
    const message = input.value.trim();
    
    if (!message) return;

    // Afficher le message de l'utilisateur
    addToConversation(message, 'user');
    input.value = '';

    // Afficher le chargement
    showAILoading(true);

    // Envoyer à l'IA
    const response = await aiIntegration.chatWithKitsune(message);

    showAILoading(false);

    if (response.error) {
        addToConversation(response.message, 'assistant');
    } else {
        addToConversation(response.message, 'assistant');
        
        // Récompenser l'interaction
        gameState.player.energy = Math.max(0, gameState.player.energy - 2);
        addWisdom(3);
        
        // Mettre à jour quête
        questSystem.updateQuestProgress('main_001', 'talk_to_kitsune', 1);
        questSystem.updateQuestProgress('daily_002', 'ask_kitsune', 1);
    }

    saveGameState();
    updateAllDisplays();
}

// Ajouter à la conversation
function addToConversation(message, role) {
    const container = document.getElementById('ai-conversation');
    const messageEl = document.createElement('div');
    messageEl.className = `message ${role}`;
    messageEl.innerHTML = `
        <div class="message-avatar">${role === 'user' ? '👤' : '🦊'}</div>
        <div class="message-bubble">${message}</div>
    `;
    container.appendChild(messageEl);
    container.scrollTop = container.scrollHeight;
}

// Ajouter des heures et analyser
async function addHoursAndAnalyze() {
    const hours = parseFloat(document.getElementById('hours-worked').value);
    const type = document.getElementById('hours-type').value;
    const period = document.getElementById('tracking-period').value;

    if (!hours || hours <= 0) {
        showNotification('⚠️ Veuillez entrer un nombre d\'heures valide', 'warning');
        return;
    }

    // Ajouter aux totaux
    switch (period) {
        case 'weekly':
            gameState.hours.weekly += hours;
            break;
        case 'monthly':
            gameState.hours.monthly += hours;
            break;
        case 'annual':
            gameState.hours.annual += hours;
            break;
    }
    gameState.hours.total += hours;

    // Ajouter XP (100 XP par heure)
    const xpGained = Math.floor(hours * 100);
    const result = addXP(xpGained);

    // Analyser avec l'IA
    const analysis = await aiIntegration.analyzeLegalCompliance(hours, gameState.hours.weekly, { type });
    displayLegalAnalysis(analysis);

    // Notification
    showNotification(`✅ ${hours}h ajoutées! +${xpGained} XP`, 'success');

    if (result.leveledUp) {
        setTimeout(() => {
            showNotification(`🎉 NIVEAU ${result.newLevel}!`, 'success');
            playLevelUpAnimation();
        }, 500);
    }

    // Mettre à jour quêtes
    questSystem.updateQuestProgress('main_001', 'track_hours', 1);
    if (hours > 35) {
        questSystem.updateQuestProgress('main_002', 'track_overtime', 1);
    }

    // Réinitialiser
    document.getElementById('hours-worked').value = '';
    
    saveGameState();
    updateAllDisplays();
}

// Afficher l'analyse légale
function displayLegalAnalysis(analysis) {
    const statusEl = document.getElementById('legal-status');
    const calcEl = document.getElementById('overtime-calc');
    
    if (analysis.isCompliant) {
        statusEl.innerHTML = `<div style="color: var(--success);">✅ Conforme au droit du travail</div>`;
    } else {
        statusEl.innerHTML = `<div style="color: var(--danger);">⚠️ Alertes détectées:</div>
            <ul>${analysis.alerts.map(a => `<li>${a}</li>`).join('')}</ul>`;
    }

    calcEl.innerHTML = `
        <p>8 premières heures (+25%): ${analysis.overtimeBreakdown.at25}h</p>
        <p>Au-delà (+50%): ${analysis.overtimeBreakdown.at50}h</p>
    `;
}

// Ajouter de l'XP
function addXP(amount) {
    const oldLevel = xpSystem.level;
    const result = xpSystem.addXP(amount / 100); // Convertir en heures
    
    gameState.player.xp = xpSystem.currentXP;
    gameState.player.level = xpSystem.level;
    
    return result;
}

// Ajouter de la sagesse
function addWisdom(amount) {
    gameState.player.wisdom = Math.min(100, gameState.player.wisdom + amount);
    updateVitalStats();
}

// Charger les scénarios
function loadScenarios() {
    const container = document.getElementById('scenarios-list');
    const scenarios = scenarioSystemAI.getAllScenarios().slice(0, 20); // Charger les 20 premiers
    
    container.innerHTML = '';
    
    scenarios.forEach(scenario => {
        const card = createScenarioCard(scenario);
        container.appendChild(card);
    });
}

// Créer une carte de scénario
function createScenarioCard(scenario) {
    const card = document.createElement('div');
    card.className = 'scenario-card';
    card.innerHTML = `
        <h4>${scenario.title}</h4>
        <p class="category">${scenario.category}</p>
        <p>${scenario.situation}</p>
        <button onclick="readScenario(${scenario.id})" class="btn-primary">Lire</button>
    `;
    return card;
}

// Lire un scénario
function readScenario(scenarioId) {
    const scenario = scenarioSystemAI.getScenarioById(scenarioId);
    if (!scenario) return;

    // Marquer comme lu
    const wasNew = scenarioSystemAI.markAsRead(scenarioId);
    
    if (wasNew) {
        // Récompenser
        addXP(scenario.xpReward || 100);
        addWisdom(scenario.wisdomReward || 5);
        
        // Mettre à jour quêtes
        questSystem.updateQuestProgress('main_001', 'read_5_scenarios', 1);
        questSystem.updateQuestProgress('side_001', 'read_50', 1);
        questSystem.updateQuestProgress('daily_001', 'read_3_today', 1);
        
        showNotification(`📚 Scénario lu! +${scenario.xpReward || 100} XP`, 'success');
    }

    saveGameState();
    updateAllDisplays();
}

// Charger les quêtes
function loadQuests() {
    loadActiveQuests();
    loadAvailableQuests();
    loadCompletedQuests();
}

function loadActiveQuests() {
    const container = document.getElementById('active-quests');
    const quests = questSystem.getActiveQuests();
    
    container.innerHTML = '';
    quests.forEach(quest => {
        const card = createQuestCard(quest, 'active');
        container.appendChild(card);
    });
}

function loadAvailableQuests() {
    const container = document.getElementById('available-quests');
    const quests = questSystem.getAvailableQuests();
    
    container.innerHTML = '';
    quests.forEach(quest => {
        const card = createQuestCard(quest, 'available');
        container.appendChild(card);
    });
}

function loadCompletedQuests() {
    const container = document.getElementById('completed-quests');
    const quests = questSystem.getCompletedQuests();
    
    container.innerHTML = '';
    quests.forEach(quest => {
        const card = createQuestCard(quest, 'completed');
        container.appendChild(card);
    });
}

function createQuestCard(quest, status) {
    const card = document.createElement('div');
    card.className = `quest-card ${quest.type} ${status}`;
    
    let buttonHTML = '';
    if (status === 'available') {
        buttonHTML = `<button onclick="acceptQuest('${quest.id}')" class="btn-primary">Accepter</button>`;
    }
    
    card.innerHTML = `
        <h4>${quest.title}</h4>
        <p class="quest-type">${quest.type.toUpperCase()}</p>
        <p>${quest.description}</p>
        ${buttonHTML}
    `;
    
    return card;
}

function acceptQuest(questId) {
    const result = questSystem.acceptQuest(questId);
    if (result.success) {
        showNotification(`📜 Quête acceptée: ${result.quest.title}`, 'success');
        loadQuests();
    } else {
        showNotification(`❌ ${result.error}`, 'error');
    }
}

// Démarrer une nouvelle quête (action du monde)
function startNewQuest() {
    switchContentPanel('quests');
    showNotification('📜 Consultez vos quêtes disponibles!', 'info');
}

// Explorer le monde
function exploreWorld() {
    showNotification('🗺️ Fonctionnalité à venir: Exploration du monde!', 'info');
}

// Parler à Kitsune (raccourci)
function talkToKitsune() {
    openKitsuneDialogue();
}

// Ouvrir le générateur de scénarios
function openScenarioGenerator() {
    switchContentPanel('scenarios');
    document.querySelector('.scenario-generator').scrollIntoView({ behavior: 'smooth' });
}

// Démarrer un combat
function startBattle() {
    const enemy = combatSystem.getRandomEnemy(gameState.player.level);
    if (!enemy) {
        showNotification('Aucun ennemi disponible à votre niveau!', 'warning');
        return;
    }

    const result = combatSystem.startBattle(enemy.id);
    if (result.success) {
        displayBattle(result.battle);
    }
}

function displayBattle(battle) {
    // Mettre à jour l'affichage du combat
    document.getElementById('enemy-avatar').textContent = battle.enemy.avatar;
    document.getElementById('enemy-name').textContent = battle.enemy.name;
    document.getElementById('enemy-hp').textContent = battle.enemy.hp;
    
    updateBattleDisplay(battle);
    
    // Afficher les actions
    const actionsEl = document.getElementById('combat-actions');
    actionsEl.innerHTML = `
        <button class="combat-btn" onclick="playerAttack()">⚔️ Attaquer</button>
        <button class="combat-btn" onclick="legalStrike()">⚖️ Frappe Légale</button>
        <button class="combat-btn" onclick="defendAction()">🛡️ Défendre</button>
    `;
}

function updateBattleDisplay(battle) {
    // Mise à jour des barres de vie
    const playerHpPercent = (battle.playerHp / battle.playerMaxHp) * 100;
    const enemyHpPercent = (battle.enemy.hp / battle.enemy.maxHp) * 100;
    
    document.getElementById('player-health').style.width = playerHpPercent + '%';
    document.getElementById('enemy-health').style.width = enemyHpPercent + '%';
    
    document.getElementById('player-hp').textContent = battle.playerHp;
    document.getElementById('enemy-hp').textContent = battle.enemy.hp;
    
    // Mise à jour du log
    const log = combatSystem.getCombatLog();
    const logEl = document.getElementById('combat-log');
    logEl.innerHTML = log.map(entry => `<p class="${entry.type}">${entry.message}</p>`).join('');
    logEl.scrollTop = logEl.scrollHeight;
}

function playerAttack() {
    const result = combatSystem.playerAction('attack');
    handleBattleResult(result);
}

function legalStrike() {
    const result = combatSystem.playerAction('legal_strike');
    handleBattleResult(result);
}

function defendAction() {
    const result = combatSystem.playerAction('defend');
    handleBattleResult(result);
}

function handleBattleResult(result) {
    const battle = combatSystem.getCurrentBattle();
    if (battle) {
        updateBattleDisplay(battle);
    }

    if (result.status === 'victory') {
        showNotification('🎉 VICTOIRE!', 'success');
        addXP(result.rewards.xp);
        addWisdom(result.rewards.wisdom);
        
        questSystem.updateQuestProgress('side_003', 'win_5_battles', 1);
        
        setTimeout(() => {
            document.getElementById('combat-actions').innerHTML = `
                <button class="combat-btn" onclick="startBattle()">🎮 Nouveau Combat</button>
            `;
        }, 2000);
    } else if (result.status === 'defeat') {
        showNotification('💀 Défaite...', 'error');
        setTimeout(() => {
            document.getElementById('combat-actions').innerHTML = `
                <button class="combat-btn" onclick="startBattle()">🔄 Réessayer</button>
            `;
        }, 2000);
    }

    saveGameState();
    updateAllDisplays();
}

// Animations
function playLevelUpAnimation() {
    // TODO: Ajouter une animation de niveau supérieur
}

// Afficher le message de bienvenue
function showWelcomeMessage() {
    setTimeout(() => {
        showNotification('🦊 Bienvenue dans Module 3 RPG!', 'info');
    }, 1000);
}

// Afficher le tutoriel
function showTutorial() {
    // TODO: Implémenter le tutoriel interactif
}

// Système de notifications
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Ouvrir les menus
function openMenu(menuType) {
    switch (menuType) {
        case 'inventory':
            showNotification('🎒 Inventaire - Fonctionnalité à venir!', 'info');
            break;
        case 'achievements':
            showNotification('🏆 Succès - Fonctionnalité à venir!', 'info');
            break;
        case 'collection':
            switchContentPanel('scenarios');
            break;
        case 'settings':
            showNotification('⚙️ Options - Fonctionnalité à venir!', 'info');
            break;
    }
}

// ===== FONCTIONS MODULES 1 & 2 =====

function refreshModule1() {
    moduleReader.syncWithGameState();
    displayModule1();
    showNotification('📅 Module 1 actualisé', 'success');
}

function refreshModule2() {
    moduleReader.syncWithGameState();
    displayModule2();
    showNotification('📊 Module 2 actualisé', 'success');
}

function displayModule1() {
    const m1 = moduleReader.getModule1Summary();
    const container = document.getElementById('module1-display');
    if (!container) return;
    
    container.innerHTML = `
        <div class="module-summary">
            <h4>${m1.monthName} ${m1.year}</h4>
            <div class="stat-row">
                <span>Heures totales:</span>
                <strong>${m1.totalHours.toFixed(1)}h</strong>
            </div>
            <div class="stat-row">
                <span>Moyenne hebdomadaire:</span>
                <strong>${m1.weeklyAverage}h</strong>
            </div>
            <div class="stat-row">
                <span>Heures supplémentaires:</span>
                <strong>${m1.overtimeHours.toFixed(1)}h</strong>
            </div>
            <div class="compliance-badge ${m1.isCompliant ? 'compliant' : 'non-compliant'}">
                ${m1.isCompliant ? '✅ Conforme' : '⚠️ Non conforme'}
            </div>
            ${m1.alerts.length > 0 ? `
                <div class="alerts-section">
                    ${m1.alerts.map(a => `<div class="alert ${a.level}">${a.message}</div>`).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

function displayModule2() {
    console.log('🔍 displayModule2: START');
    const m2 = moduleReader.getModule2Summary();
    console.log('🔍 displayModule2 m2:', m2);
    const container = document.getElementById('module2-display');
    
    container.innerHTML = `
        <div class="module-summary">
            <h4>Année ${m2.year}</h4>
            <div class="stat-row">
                <span>Heures totales:</span>
                <strong>${(m2?.totalHours || 0).toFixed(1)}h</strong>
            </div>
            <div class="contingent-bar">
                <div class="contingent-label">Contingent: ${(m2?.contingent?.used || 0).toFixed(1)}h / ${m2?.contingent?.total || 220}h</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${m2?.contingent?.percentage || 0}%; background: ${(m2?.contingent?.percentage || 0) > 100 ? 'var(--danger)' : 'var(--primary)'}"></div>
                </div>
                <div class="contingent-remaining">${(m2.contingent?.remaining || 0).toFixed(1)}h restantes</div>
            </div>
            <div class="stat-row">
                <span>Moyenne mensuelle:</span>
                <strong>${m2.monthlyAverage}h</strong>
            </div>
            <div class="stat-row">
                <span>Projection annuelle:</span>
                <strong>${m2.projectedAnnual.value}h</strong>
            </div>
            <div class="breakdown-section">
                <h5>Répartition des HS:</h5>
                <div>+25%: ${m2.breakdown.at25}h</div>
                <div>+50%: ${m2.breakdown.at50}h</div>
            </div>
            ${m2.alerts.length > 0 ? `
                <div class="alerts-section">
                    ${m2.alerts.map(a => `<div class="alert ${a.level}">${a.message}</div>`).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

function exportModule1() {
    moduleReader.exportModuleData(1);
    showNotification('📥 Module 1 exporté en JSON', 'success');
}

function exportModule2() {
    moduleReader.exportModuleData(2);
    showNotification('📥 Module 2 exporté en JSON', 'success');
}

// ===== FONCTIONS SNAPSHOTS =====

function createSnapshot() {
    const nameInput = document.getElementById('snapshot-name');
    const name = nameInput.value.trim();
    
    const result = snapshotSystem.createSnapshot(name || null, false);
    
    if (result.success) {
        showNotification(`📸 ${result.message}`, 'success');
        nameInput.value = '';
        loadSnapshotsList();
    } else {
        showNotification(`❌ ${result.error}`, 'error');
    }
}

function loadSnapshotsList() {
    const snapshots = snapshotSystem.getAllSnapshots();
    const container = document.getElementById('snapshots-list');
    const stats = snapshotSystem.getStats();
    
    // Mettre à jour les stats
    document.getElementById('snapshot-total').textContent = stats.total;
    document.getElementById('snapshot-manual').textContent = stats.manual;
    document.getElementById('snapshot-auto').textContent = stats.automatic;
    
    if (snapshots.length === 0) {
        container.innerHTML = '<p class="placeholder">Aucun snapshot créé</p>';
        return;
    }
    
    container.innerHTML = snapshots.map(snap => `
        <div class="snapshot-card ${snap.automatic ? 'auto' : 'manual'}">
            <div class="snapshot-header">
                <h4>${snap.name}</h4>
                <span class="snapshot-badge">${snap.automatic ? '⏰ Auto' : '👤 Manuel'}</span>
            </div>
            <div class="snapshot-info">
                <div>📅 ${new Date(snap.timestamp).toLocaleString('fr-FR')}</div>
                <div>⭐ Niveau ${snap.data.xp.level} | 💎 ${snap.data.xp.currentXP} XP</div>
            </div>
            <div class="snapshot-actions">
                <button onclick="restoreSnapshot('${snap.id}')" class="btn-primary small">🔄 Restaurer</button>
                <button onclick="exportSnapshotFile('${snap.id}')" class="btn-secondary small">📥 Export</button>
                <button onclick="deleteSnapshot('${snap.id}')" class="btn-danger small">🗑️ Supprimer</button>
            </div>
        </div>
    `).join('');
}

function restoreSnapshot(snapshotId) {
    if (!confirm('⚠️ Restaurer ce snapshot ? L\'état actuel sera remplacé.')) return;
    
    const result = snapshotSystem.restoreSnapshot(snapshotId);
    
    if (result.success) {
        showNotification(`🔄 ${result.message}`, 'success');
        updateAllDisplays();
        location.reload(); // Recharger pour appliquer tous les changements
    } else {
        showNotification(`❌ ${result.error}`, 'error');
    }
}

function deleteSnapshot(snapshotId) {
    if (!confirm('Supprimer ce snapshot ?')) return;
    
    const result = snapshotSystem.deleteSnapshot(snapshotId);
    
    if (result.success) {
        showNotification(`🗑️ ${result.message}`, 'success');
        loadSnapshotsList();
    } else {
        showNotification(`❌ ${result.error}`, 'error');
    }
}

function exportSnapshotFile(snapshotId) {
    const result = snapshotSystem.exportSnapshot(snapshotId);
    if (result.success) {
        showNotification('📥 Snapshot exporté', 'success');
    }
}

function toggleAutoSnapshots() {
    const btn = document.getElementById('auto-snapshot-btn');
    const isActive = snapshotSystem.autoSnapshotInterval !== null;
    
    if (isActive) {
        snapshotSystem.disableAutoSnapshots();
        btn.textContent = '⏰ Auto: OFF';
        showNotification('Auto-snapshots désactivés', 'info');
    } else {
        snapshotSystem.enableAutoSnapshots(30);
        btn.textContent = '⏰ Auto: ON (30 min)';
        showNotification('Auto-snapshots activés (30 min)', 'success');
    }
}

function cleanupSnapshots() {
    const result = snapshotSystem.cleanupAutoSnapshots(5);
    showNotification(`🧹 ${result.message}`, 'success');
    loadSnapshotsList();
}

// ===== FONCTIONS EXPORT =====

function exportRTFFull() {
    const result = rtfExport.exportFullReport();
    if (result.success) {
        showNotification('📝 Rapport RTF complet généré', 'success');
    }
}

function exportRTFModule1() {
    const result = rtfExport.exportModule1Report();
    if (result.success) {
        showNotification('📝 Rapport Module 1 RTF généré', 'success');
    }
}

function exportRTFModule2() {
    const result = rtfExport.exportModule2Report();
    if (result.success) {
        showNotification('📝 Rapport Module 2 RTF généré', 'success');
    }
}

function exportRTFProgress() {
    const result = rtfExport.exportProgressReport();
    if (result.success) {
        showNotification('📝 Rapport de progression RTF généré', 'success');
    }
}

function exportJSONFull() {
    const fullData = {
        gameState: gameState,
        xp: { currentXP: xpSystem.currentXP, level: xpSystem.level },
        badges: badgeSystem.unlockedBadges,
        scenarios: scenarioSystemAI.getStats(),
        quests: questSystem.getStats(),
        module1: moduleReader.module1Data,
        module2: moduleReader.module2Data,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(fullData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `module3_rpg_complet_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('📦 Export JSON complet réussi', 'success');
}

function triggerImport() {
    document.getElementById('import-file').click();
}

function importSnapshot() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const result = await snapshotSystem.importSnapshot(file);
        
        if (result.success) {
            showNotification('💾 Snapshot importé avec succès', 'success');
            loadSnapshotsList();
        } else {
            showNotification(`❌ ${result.error}`, 'error');
        }
    };
    input.click();
}

// Initialiser les affichages au chargement des panneaux
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser Module 1 & 2
    displayModule1();
    displayModule2();
    
    // Initialiser Snapshots
    loadSnapshotsList();
    
    // Event listener pour créer un snapshot
    document.getElementById('create-snapshot-btn').addEventListener('click', createSnapshot);
    
    // Event listener pour l'import de fichier
    document.getElementById('import-file').addEventListener('change', async function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            // Restaurer les données
            if (data.gameState) gameState = data.gameState;
            if (data.xp) {
                xpSystem.currentXP = data.xp.currentXP;
                xpSystem.level = data.xp.level;
            }
            
            showNotification('📂 Données importées avec succès', 'success');
            updateAllDisplays();
            location.reload();
            
        } catch (error) {
            showNotification('❌ Erreur lors de l\'import', 'error');
        }
    });
});

// Sauvegarder automatiquement toutes les 30 secondes
setInterval(() => {
    saveGameState();
    moduleReader.syncWithGameState();
}, 30000);

// Sauvegarder avant de quitter
window.addEventListener('beforeunload', () => {
    saveGameState();
});
