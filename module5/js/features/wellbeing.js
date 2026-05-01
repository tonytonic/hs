/**
 * WELLBEING ENGINE — Module Bien-être M5 Mizuki
 * Modèle biologique temps partiel
 *
 * Sources scientifiques :
 * - Higgins et al. 2010 : imprévisibilité horaire → pic cortisol
 * - Karasek 1979 (Job Demand-Control) : ratio demande/contrôle → stress chronique
 * - Sonnentag 2003 : récupération psychologique hors travail
 * - Voydanoff 2005 : temps partiel choisi vs subi
 */
(function(global) {
'use strict';

// ── CONSTANTES SCIENTIFIQUES ──────────────────────────────────────
const HIGGINS_VARIANCE_SEUIL  = 4.0;  // h — écart-type > 4h = imprévisibilité critique
const KARASEK_RATIO_OPTIMAL   = 0.10; // < 10% HC = zone verte
const KARASEK_RATIO_TENSION   = 0.25; // > 25% HC = tension chronique
const SONNENTAG_RECOVERY_MIN  = 0.30; // au moins 30% de semaines < contrat = récupération réelle
const JANSSEN_DELAI_SEUIL     = 0.30; // > 30% semaines avec variation soudaine = risque stress aigu
const BAMBRA_SUBI_SEUIL       = 0.60; // > 60% semaines proches plafond = temps partiel subi (risque dépression ×1.5)

const M5_Wellbeing = {

  /**
   * Calcul complet du score bien-être
   * @param {Array}  weeks    — [{monday, worked}] semaines de l'exercice
   * @param {number} contractH — heures contractuelles
   * @param {object} contract  — contrat complet (pour rate1/rate2/cap)
   * @returns {object} scores et interprétations
   */
  compute(weeks, contractH, contract) {
    if (!weeks || weeks.length < 2) {
      return { available: false, reason: 'Saisis au moins 2 semaines pour voir ton analyse bien-être.' };
    }

    const worked = weeks.map(w => w.worked || 0);
    const n = worked.length;

    // ── 1. SCORE STABILITÉ (Higgins 2010) ────────────────────────
    // Mesure la variance des heures d'une semaine à l'autre
    const mean = worked.reduce((s,h) => s+h, 0) / n;
    const variance = worked.reduce((s,h) => s + Math.pow(h - mean, 2), 0) / n;
    const ecartType = Math.sqrt(variance);

    // Score stabilité : 100 si ecartType=0, 0 si ecartType >= seuil critique
    const scoreStabilite = Math.max(0, Math.round(
      100 * (1 - Math.min(ecartType / HIGGINS_VARIANCE_SEUIL, 1))
    ));

    // ── 2. SCORE INTENSITÉ (Karasek 1979) ────────────────────────
    // Ratio moyen des heures complémentaires par rapport au contrat
    const totalComp = worked.reduce((s,h) => s + Math.max(0, h - contractH), 0);
    const ratioMoyen = totalComp / (n * contractH);

    let scoreIntensite;
    if (ratioMoyen <= KARASEK_RATIO_OPTIMAL) {
      scoreIntensite = 100;
    } else if (ratioMoyen >= KARASEK_RATIO_TENSION) {
      scoreIntensite = 0;
    } else {
      scoreIntensite = Math.round(
        100 * (1 - (ratioMoyen - KARASEK_RATIO_OPTIMAL) /
          (KARASEK_RATIO_TENSION - KARASEK_RATIO_OPTIMAL))
      );
    }

    // ── 3. SCORE RÉCUPÉRATION (Sonnentag 2003) ───────────────────
    // Proportion de semaines réellement sous le contrat (vraies semaines légères)
    const semainesLegeres = worked.filter(h => h < contractH).length;
    const ratioRecup = semainesLegeres / n;
    // Minimum 4 semaines pour que la récupération soit mesurable
    const scoreRecup = n < 4 ? 50 : Math.min(100, Math.round(
      (ratioRecup / SONNENTAG_RECOVERY_MIN) * 100
    ));

    // ── 4. SCORE CHOIX (Voydanoff 2005) ──────────────────────────
    // Temps partiel choisi si heures réelles << plafond légal
    // Seuil 95% du plafond = vraiment "proche" (pas juste légèrement au-dessus du contrat)
    // Cap réel : priorité à la CCN sélectionnée (évite les bugs si contrat mal sauvegardé)
    let cap = contract.cap || 0.10;
    if(contract.idcc > 0 && typeof CCN_PARTIEL_API !== 'undefined') {
      const ccnRules = CCN_PARTIEL_API.getRules(contract.idcc);
      if(ccnRules && ccnRules.cap) cap = ccnRules.cap;
    }
    const plafondH = contractH * (1 + cap);
    const semainesProchePlafond = worked.filter(h => h >= plafondH * 0.95).length;
    const ratioSubi = semainesProchePlafond / n;
    // Minimum 4 semaines pour que l'indicateur soit représentatif
    const scoreChoix = n < 4 ? 50 : Math.round(100 * (1 - Math.min(ratioSubi * 2, 1)));

    // ── 5. SCORE PRÉVISIBILITÉ (Janssen & Nachreiner 2004) ───────
    // Mesure les variations soudaines semaine à semaine (delta > 4h = choc)
    let nbVariationsSoudaines = 0;
    for(let i=1; i<worked.length; i++) {
      if(Math.abs(worked[i] - worked[i-1]) >= 4) nbVariationsSoudaines++;
    }
    const ratioVariations = n > 1 ? nbVariationsSoudaines / (n-1) : 0;
    // Minimum 3 semaines pour Janssen (il faut au moins 2 transitions)
    const scorePrevisibilite = n < 3 ? 50 : Math.max(0, Math.round(
      100 * (1 - Math.min(ratioVariations / JANSSEN_DELAI_SEUIL, 1))
    ));

    // ── 5b. PENCAVEL 2014 — Courbe de productivité décroissante ──
    // Au-delà d'un certain ratio d'HC/contrat, la productivité effective diminue
    // Pencavel (Stanford 2014) : output/heure chute significativement au-delà de 49h totales/sem
    // Pour le temps partiel : on adapte avec le ratio HC moyen > 30% du contrat = zone de rendement décroissant
    const PENCAVEL_SEUIL = 0.30; // > 30% HC = zone rouge Pencavel (adapté au temps partiel)
    const pencavelZone = ratioMoyen >= PENCAVEL_SEUIL;
    // Ce signal enrichit le message Karasek sans créer de score séparé

    // ── 6. SCORE PROTECTION SANTÉ MENTALE (Bambra et al. 2008) ──
    // Gradient temps partiel choisi (protecteur) vs subi (risque dépression ×1.5)
    // Nuance par rapport à Voydanoff : on mesure l'intensité du subi, pas juste sa présence
    const ratioSubiBambra = semainesProchePlafond / n;
    // Minimum 4 semaines pour Bambra (indicateur long terme)
    let scoreProtection;
    const bambra_seuil = typeof BAMBRA_SEUIL_SECTEUR !== 'undefined' ? BAMBRA_SEUIL_SECTEUR : BAMBRA_SUBI_SEUIL;
    if(n < 4) {
      scoreProtection = 50;
    } else if(ratioSubiBambra < 0.20) {
      scoreProtection = 100;
    } else if(ratioSubiBambra >= bambra_seuil) {
      scoreProtection = 0;
    } else {
      scoreProtection = Math.round(
        100 * (1 - (ratioSubiBambra - 0.20) / (bambra_seuil - 0.20))
      );
    }

    // ── 7. SCORE GLOBAL ───────────────────────────────────────────
    // Pondération révisée sur 6 études :
    // Stabilité 25%      (Higgins — cortisol immédiat)
    // Intensité 25%      (Karasek — tension chronique)
    // Récupération 15%   (Sonnentag — restauration)
    // Choix 10%          (Voydanoff — sens/autonomie)
    // Prévisibilité 15%  (Janssen — stress aigu imprévisibilité)
    // Protection 10%     (Bambra — santé mentale long terme)
    const scoreGlobal = Math.round(
      scoreStabilite    * 0.25 +
      scoreIntensite    * 0.25 +
      scoreRecup        * 0.15 +
      scoreChoix        * 0.10 +
      scorePrevisibilite* 0.15 +
      scoreProtection   * 0.10
    );

    // ── INTERPRÉTATIONS ──────────────────────────────────────────
    const niveau = scoreGlobal >= 75 ? 'bon'
                 : scoreGlobal >= 50 ? 'moyen'
                 : 'tendu'; // On évite "critique" — trop alarmiste pour un outil d'information

    const emoji = { bon:'🟢', moyen:'🟡', tendu:'🟠' };

    // Identifier le facteur le plus dégradé
    const scores = [
      { nom:'Stabilité',     val:scoreStabilite,     ref:'Higgins 2010',    limited:false },
      { nom:'Intensité',     val:scoreIntensite,     ref:'Karasek 1979',    limited:false },
      { nom:'Récupération',  val:scoreRecup,         ref:'Sonnentag 2003',  limited:n<4 },
      { nom:'Choix',         val:scoreChoix,         ref:'Voydanoff 2005',  limited:n<4 },
      { nom:'Prévisibilité', val:scorePrevisibilite, ref:'Janssen 2004',    limited:n<3 },
      { nom:'Santé mentale', val:scoreProtection,    ref:'Bambra 2008',     limited:n<4 },
    ];
    const plusFaible = [...scores].sort((a,b)=>a.val-b.val)[0];

    // Messages contextuels
    const messages = this._buildMessages(
      scoreGlobal, niveau, ecartType, ratioMoyen,
      ratioRecup, ratioSubi, contractH, mean,
      worked, semainesProchePlafond
    );

    // Score global fiable = calculé uniquement sur les scores non-neutralisés
    // (Stabilité + Intensité toujours fiables, les autres neutralisés à 50 si n<4)
    const nbFiables = scores.filter(s=>!s.limited).length;
    const scoreGlobalFiable = nbFiables > 0
      ? Math.round(scores.filter(s=>!s.limited).reduce((sum,s)=>sum+s.val,0)/nbFiables)
      : scoreGlobal;

    return {
      available: true,
      donneesLimitees: n < 4,
      nbSemaines: n,
      noteMin: n < 4 ? `Analyse basée sur ${n} semaine${n>1?'s':''} — les scores en italique seront plus précis avec 4+ semaines.` : null,
      scoreGlobal,
      scoreGlobalFiable,
      niveau,
      emoji: emoji[niveau],
      scores,
      plusFaible,
      messages,
      stats: {
        n,
        mean: Math.round(mean * 10) / 10,
        ecartType: Math.round(ecartType * 10) / 10,
        ratioMoyen: Math.round(ratioMoyen * 100),
        semainesLegeres,
        semainesProchePlafond,
        nbVariationsSoudaines,
        ratioVariations: Math.round(ratioVariations * 100),
        ratioSubiBambra: Math.round(ratioSubiBambra * 100),
      }
    };
  },

  _buildMessages(global, niveau, ecartType, ratioMoyen, ratioRecup, ratioSubi, contractH, mean, worked=[], semainesProchePlafond=0) {
    const msgs = [];

    // Message principal
    if (niveau === 'bon') {
      msgs.push({ type:'ok', text:`Ton rythme de travail est équilibré. Tes heures sont stables et tu bénéficies de vraies périodes de récupération.` });
    } else if (niveau === 'moyen') {
      msgs.push({ type:'warn', text:`Ton rythme de travail montre quelques signaux à surveiller. Rien d'urgent, mais quelques ajustements amélioreraient ton équilibre.` });
    } else if (niveau === 'tendu') {
      msgs.push({ type:'alerte', text:`Ton rythme de travail est sous tension. Les études montrent que ce type de schéma maintenu plusieurs mois affecte la qualité de récupération.` });
    } else {
      msgs.push({ type:'alerte', text:`Ton rythme actuel combine une forte variabilité et une intensité élevée. Ce type de schéma prolongé mérite attention — l'objectif est de t'informer, pas de t'alarmer.` });
    }

    // Messages spécifiques par composante
    if (ecartType >= HIGGINS_VARIANCE_SEUIL) {
      msgs.push({ type:'warn', ref:'Higgins 2010',
        text:`Tes heures varient de ${ecartType.toFixed(1)}h d'une semaine à l'autre. Au-delà de 4h d'écart-type, la recherche montre un pic de cortisol comparable à un temps plein surchargé.` });
    } else if (ecartType >= 2) {
      msgs.push({ type:'info', ref:'Higgins 2010',
        text:`Une légère variabilité horaire (${ecartType.toFixed(1)}h). Dans les limites raisonnables, mais à surveiller si ça augmente.` });
    } else {
      msgs.push({ type:'ok', ref:'Higgins 2010',
        text:`Tes heures sont très stables (écart-type ${ecartType.toFixed(1)}h). Cette prévisibilité est protectrice selon Higgins et al.` });
    }

    if (ratioMoyen >= KARASEK_RATIO_TENSION) {
      msgs.push({ type:'alerte', ref:'Karasek 1979',
        text:`En moyenne ${Math.round(ratioMoyen*100)}% d'heures complémentaires par semaine. Ce niveau est associé à une tension chronique selon le modèle Demande-Contrôle de Karasek.` });
    } else if (ratioMoyen >= KARASEK_RATIO_OPTIMAL) {
      msgs.push({ type:'warn', ref:'Karasek 1979',
        text:`${Math.round(ratioMoyen*100)}% d'HC en moyenne. Tu travailles souvent au-delà du contrat — surveille que ça reste ponctuel.` });
    }
    // Pencavel 2014 : signal si ratio HC > 30% (recalcul local — pencavelZone est hors portée ici)
    const _pencavelZone = ratioMoyen >= (typeof PENCAVEL_SEUIL !== 'undefined' ? PENCAVEL_SEUIL : 0.30);
    if (_pencavelZone) {
      msgs.push({ type:'warn', ref:'Pencavel 2014',
        text:`Avec ${Math.round(ratioMoyen*100)}% d'HC en moyenne, tu approches la zone où la recherche Pencavel (Stanford) observe une baisse d'efficacité : chaque heure supplémentaire produit moins que la précédente. C'est un signal de surcharge à surveiller.` });
    }

    if (ratioRecup < SONNENTAG_RECOVERY_MIN) {
      const _recupTxt = ratioRecup === 0
        ? `Aucune semaine n'est sous ton contrat. Si ces heures te sont imposées, Sonnentag 2003 montre que l'absence totale de semaines légères empêche la récupération psychologique. Essaie d'avoir au moins quelques semaines proches de ton contrat.`
        : `Seulement ${Math.round(ratioRecup*100)}% de semaines sous ton contrat. Sonnentag montre qu'en dessous de 30% de semaines légères, la récupération psychologique est insuffisante.`;
      msgs.push({ type:'warn', ref:'Sonnentag 2003', text:_recupTxt });
    } else {
      msgs.push({ type:'ok', ref:'Sonnentag 2003',
        text:`${Math.round(ratioRecup*100)}% de tes semaines sont sous ton contrat. Ces périodes légères permettent une vraie récupération psychologique.` });
    }

    if (ratioSubi >= 0.5) {
      // Recalcul local de secteurContraint (variable hors portée de compute())
      const _contraintKeywords = ['domicile','nettoyage','propreté','hcr','hôtel','restaurant','cafés',
        'sécurité','gardiennage','animation','aide','accompagnement','soins','commerce de détail',
        'grande distribution','restauration','blanchisserie'];
      const _secteurContraint = (() => {
        const nom = (contract.ccnNom||'').toLowerCase();
        return _contraintKeywords.some(k => nom.includes(k));
      })();
      const txtSecteur = _secteurContraint
        ? `Ton secteur (${contract.ccnNom?.split(' ').slice(0,3).join(' ')||'secteur contraint'}) est reconnu comme à temps partiel structurellement imposé — la recherche Voydanoff 2005 montre que l'absence de choix amplifie l'impact sur la santé.`
        : `Voydanoff distingue le temps partiel choisi du temps partiel contraint — si ces heures te sont imposées, c'est utile à noter pour toi.`;
      msgs.push({ type:'warn', ref:'Voydanoff 2005', text:`Plusieurs semaines approchent le plafond légal. ${txtSecteur}` });
    }

    // Janssen & Nachreiner 2004 — variations soudaines
    const nbVar = worked.length > 1
      ? worked.slice(1).filter((h,i) => Math.abs(h-worked[i]) >= 4).length : 0;
    const ratioVar = worked.length > 1 ? nbVar/(worked.length-1) : 0;
    if (ratioVar >= JANSSEN_DELAI_SEUIL) {
      msgs.push({ type:'alerte', ref:'Janssen & Nachreiner 2004',
        text:`${Math.round(ratioVar*100)}% de tes semaines présentent une variation soudaine de 4h ou plus. Janssen montre que ces chocs horaires déclenchent un stress aigu comparable à une urgence, même sur un temps partiel.` });
    } else if (ratioVar > 0.10) {
      msgs.push({ type:'warn', ref:'Janssen & Nachreiner 2004',
        text:`Quelques variations horaires soudaines détectées (${nbVar} semaine${nbVar>1?'s':''}). À surveiller si ça devient régulier.` });
    } else {
      msgs.push({ type:'ok', ref:'Janssen & Nachreiner 2004',
        text:`Tes heures évoluent progressivement d'une semaine à l'autre — prévisibilité protectrice selon Janssen et al.` });
    }

    // Bambra et al. 2008 — santé mentale
    const ratioSubiB = semainesProchePlafond / Math.max(1, worked.length);
    if (ratioSubiB >= BAMBRA_SUBI_SEUIL) {
      msgs.push({ type:'warn', ref:'Bambra et al. 2008',
        text:`Beaucoup de tes semaines approchent le plafond légal. La recherche Bambra associe ce schéma à plus de fatigue sur la durée. C'est un signal à surveiller — pas une certitude.` });
    } else if (ratioSubiB >= 0.30) {
      msgs.push({ type:'warn', ref:'Bambra et al. 2008',
        text:`Tendance vers un temps partiel subi (${Math.round(ratioSubiB*100)}% de semaines proches du plafond). Bambra identifie cette zone comme facteur de risque pour la santé mentale.` });
    } else {
      msgs.push({ type:'ok', ref:'Bambra et al. 2008',
        text:`Ton temps partiel présente les caractéristiques d'un temps partiel choisi — configuration protectrice pour la santé mentale selon Bambra et al.` });
    }

    return msgs;
  },

  /**
   * Texte court pour Mizuki (bulle accueil)
   */
  getMizukiText(result, name) {
    const n = name ? name + ' ! ' : '';
    if (!result.available) return null;
    const { niveau, plusFaible, stats } = result;
    if (niveau === 'bon') return `🦊 ${n}Bien-être au travail : bon. Rythme stable, récupération suffisante — continue comme ça !`;
    if (niveau === 'moyen') {
      if(plusFaible.ref==='Janssen 2004') return `🦊 ${n}Tes horaires changent beaucoup d'une semaine à l'autre. Ces variations soudaines créent un stress aigu même à temps partiel (Janssen 2004).`;
      if(plusFaible.ref==='Bambra 2008') return `🦊 ${n}Ton temps partiel tend vers le subi. Bambra 2008 montre que ça peut impacter ta santé mentale sur le long terme.`;
      return `🦊 ${n}Bien-être moyen — point à surveiller : ${plusFaible.nom.toLowerCase()} (${plusFaible.ref}).`;
    }
    if (niveau === 'tendu') return `🦊 ${n}Rythme sous tension : ${stats.ecartType}h d'écart-type et ${stats.ratioVariations}% de semaines avec variation soudaine. Higgins 2010 et Janssen 2004 identifient ce profil comme à risque.`;
    return `🦊 ${n}Signal critique bien-être. Ton temps partiel ressemble à un temps plein non déclaré — risque dépression ×1.5 selon Bambra 2008. Garde cet historique.`;
  }
};

global.M5_Wellbeing = M5_Wellbeing;
}(typeof window !== 'undefined' ? window : global));
