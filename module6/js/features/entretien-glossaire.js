/**
 * ENTRETIEN ANNUEL + GLOSSAIRE UI — M6 Cadres
 */
'use strict';

(function(global) {

const M6_Entretien = {

  renderForm(container, regime, year, contract, analysis, onSave) {
    const entretiens = M6_Storage.getEntretiens(regime);
    // Tri du plus récent au plus ancien
    const sorted = [...entretiens].sort((a,b) => (b.date||'').localeCompare(a.date||''));

    container.innerHTML = `
    <div class="m6-ornement">
      <div class="m6-ornement-line"></div>
      <div class="m6-ornement-text">Entretien annuel — Art. L3121-65</div>
      <div class="m6-ornement-line"></div>
    </div>

    <div class="m6-alert info" style="margin-bottom:16px">
      <span class="m6-alert-icon">⚖️</span>
      <div>L'entretien annuel est <strong>obligatoire</strong> pour valider le forfait jours. Son absence peut entraîner la nullité de la convention (Cass. Soc. 29 juin 2011).</div>
    </div>

    ${sorted.length > 0 ? `
    <div class="m6-card" style="margin-bottom:18px">
      <div class="m6-card-body">
        <div class="m6-card-label" style="margin-bottom:12px">
          📋 Historique (${sorted.length} entretien${sorted.length>1?'s':''})
          <span style="font-size:0.67rem;color:var(--pierre);margin-left:4px">— cliquez 📄 pour imprimer</span>
        </div>
        ${sorted.map((e) => {
          const realIdx = entretiens.indexOf(e);
          const dateStr = e.date
            ? new Date(e.date+'T12:00:00').toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})
            : '—';
          const isLatest = e === sorted[0];
          // Identifiant stable : date + savedAt (unique même si même date)
          const btnKey = encodeURIComponent(e.date || '') + '|' + encodeURIComponent(e.savedAt || realIdx);
          return `
          <div style="border:1px solid ${isLatest?'var(--champagne)':'var(--ivoire-3)'};border-radius:10px;padding:12px 14px;margin-bottom:8px;background:${isLatest?'rgba(196,163,90,0.06)':'var(--ivoire)'}">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
              <div style="flex:1;min-width:0">
                <div style="font-size:0.88rem;font-weight:600;color:var(--charbon);display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                  ${dateStr}
                  ${isLatest?'<span style="font-size:0.6rem;background:var(--champagne-3);color:var(--champagne-2);border-radius:99px;padding:1px 7px;font-weight:500">dernier</span>':''}
                </div>
                <div style="font-size:0.72rem;color:var(--pierre);margin-top:2px">
                  ${e.charge?'Charge '+e.charge+'/5':''}${e.manager?' · '+e.manager:''}${e.ajustement==='oui'?' · ⚠️ Ajustement demandé':''}
                </div>
              </div>
              <button data-pdf-entretien="${btnKey}" class="m6-btn m6-btn-ghost" style="font-size:0.72rem;padding:6px 11px;flex-shrink:0">📄 PDF</button>
            </div>
            ${(e.organisation||e.equilibre||e.chargeRessentie||e.deconnexion||e.remuneration||e.actions) ? `
            <details style="margin-top:8px">
              <summary style="font-size:0.72rem;color:var(--champagne-2);cursor:pointer;font-weight:500">Voir le compte-rendu ›</summary>
              <div style="margin-top:8px;font-size:0.76rem;color:var(--charbon-3);display:flex;flex-direction:column;gap:6px;border-top:1px solid var(--ivoire-3);padding-top:8px">
                ${e.charge?`<div><strong style="color:var(--charbon)">Charge de travail :</strong> ${e.charge}/5</div>`:''}
                ${e.organisation?`<div><strong style="color:var(--charbon)">Organisation du temps :</strong> ${e.organisation}</div>`:''}
                ${e.equilibre?`<div><strong style="color:var(--charbon)">Équilibre vie pro/perso :</strong> ${e.equilibre}</div>`:''}
                ${e.chargeRessentie?`<div><strong style="color:var(--charbon)">Charge ressentie :</strong> ${e.chargeRessentie}</div>`:''}
                ${e.deconnexion?`<div><strong style="color:var(--charbon)">Droit à la déconnexion :</strong> ${e.deconnexion}</div>`:''}
                ${e.remuneration?`<div><strong style="color:var(--charbon)">Rémunération :</strong> ${e.remuneration}</div>`:''}
                ${e.actions?`<div><strong style="color:var(--charbon)">Points d'action :</strong> ${e.actions}</div>`:''}
                ${e.ajustement?`<div><strong style="color:var(--charbon)">Ajustement demandé :</strong> ${e.ajustement==='oui'?'⚠️ Oui':'✅ Non'}</div>`:''}
              </div>
            </details>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>` : `
    <div class="m6-alert warning" style="margin-bottom:16px">
      <span>📭</span>
      <div>Aucun entretien enregistré pour ce régime. Remplissez le formulaire ci-dessous pour enregistrer le premier.</div>
    </div>`}

    <div class="m6-ornement" style="margin-top:8px">
      <div class="m6-ornement-line"></div>
      <div class="m6-ornement-text">Enregistrer un nouvel entretien</div>
      <div class="m6-ornement-line"></div>
    </div>
    <div class="m6-card">
      <div class="m6-card-body">

        <div class="m6-field">
          <label>Date de l'entretien *</label>
          <input type="date" id="ent-date" value="${new Date().toISOString().slice(0,10)}" style="font-size:14px">
        </div>

        <div class="m6-field">
          <label>Manager / RH présent</label>
          <input type="text" id="ent-manager" value="${contract.nomManager||''}" placeholder="Prénom Nom" style="font-size:14px">
        </div>

        <div class="m6-field">
          <label>1. Évaluation de la charge de travail (1=très difficile / 5=excellente)</label>
          <select id="ent-charge" style="font-size:14px">
            <option value="">— Sélectionner —</option>
            <option value="1">1 — Charge excessive, insoutenable</option>
            <option value="2">2 — Charge lourde, difficile à tenir</option>
            <option value="3">3 — Charge correcte, gérable</option>
            <option value="4">4 — Charge bien maîtrisée</option>
            <option value="5">5 — Charge excellente, très bien équilibrée</option>
          </select>
        </div>

        <div class="m6-field">
          <label>2. Organisation du temps de travail</label>
          <textarea id="ent-organisation" rows="2" placeholder="Périodes chargées, organisation personnelle…" style="font-size:14px"></textarea>
        </div>

        <div class="m6-field">
          <label>3. Équilibre vie professionnelle / vie personnelle</label>
          <select id="ent-equilibre" style="font-size:14px">
            <option value="">— Sélectionner —</option>
            <option value="Satisfaisant">Satisfaisant</option>
            <option value="À améliorer">À améliorer</option>
            <option value="Insuffisant — action requise">Insuffisant — action requise</option>
          </select>
        </div>

        <div class="m6-field">
          <label>4. Charge de travail ressentie (en mots)</label>
          <textarea id="ent-charge-ressentie" rows="2" placeholder="Description qualitative de la charge…" style="font-size:14px"></textarea>
        </div>

        <div class="m6-field">
          <label>5. Demande d'ajustement de charge ou de forfait</label>
          <div style="display:flex;gap:8px;margin-top:4px">
            <button id="ent-ajust-non" data-selected="non"
              style="flex:1;padding:12px 10px;border-radius:10px;border:2px solid var(--succes);background:rgba(45,106,79,0.12);color:var(--succes);font-size:0.85rem;cursor:pointer;font-weight:600;transition:all 0.2s"
              onclick="this.dataset.selected='non';this.style.background='rgba(45,106,79,0.12)';this.style.borderColor='var(--succes)';this.style.color='var(--succes)';document.getElementById('ent-ajust-oui').style.background='var(--ivoire-2)';document.getElementById('ent-ajust-oui').style.borderColor='var(--ivoire-3)';document.getElementById('ent-ajust-oui').style.color='var(--pierre)'">
              ✅ Non
            </button>
            <button id="ent-ajust-oui" data-selected=""
              style="flex:1;padding:12px 10px;border-radius:10px;border:2px solid var(--ivoire-3);background:var(--ivoire-2);color:var(--pierre);font-size:0.85rem;cursor:pointer;font-weight:400;transition:all 0.2s"
              onclick="this.dataset.selected='oui';this.style.background='rgba(196,83,58,0.12)';this.style.borderColor='var(--alerte)';this.style.color='var(--alerte)';document.getElementById('ent-ajust-non').style.background='var(--ivoire-2)';document.getElementById('ent-ajust-non').style.borderColor='var(--ivoire-3)';document.getElementById('ent-ajust-non').style.color='var(--pierre)'">
              ⚠️ Oui, ajustement
            </button>
          </div>
        </div>

        <div class="m6-field">
          <label>6. Droit à la déconnexion</label>
          <select id="ent-deconnexion" style="font-size:14px">
            <option value="">— Sélectionner —</option>
            <option value="Respecté">Respecté</option>
            <option value="Partiellement respecté">Partiellement respecté</option>
            <option value="Non respecté — à améliorer">Non respecté — à améliorer</option>
          </select>
        </div>

        <div class="m6-field">
          <label>7. Rémunération (adéquation avec le forfait)</label>
          <textarea id="ent-remuneration" rows="1" placeholder="Ex : Rémunération conforme au forfait, révision à prévoir…" style="font-size:14px"></textarea>
        </div>

        <div class="m6-field">
          <label>8. Points d'action / Décisions prises</label>
          <textarea id="ent-actions" rows="3" placeholder="Actions convenues, suivi prévu…" style="font-size:14px"></textarea>
        </div>

        <div style="background:var(--ivoire);border-radius:8px;padding:12px;margin-bottom:14px;font-size:0.78rem;color:var(--pierre)">
          <div style="font-weight:600;color:var(--charbon);margin-bottom:6px">📊 Données M6 au ${new Date().toLocaleDateString('fr-FR')}</div>
          ${analysis && (analysis.joursEffectifs!==undefined||analysis.totalHS!==undefined) ? `
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">
            ${analysis.joursEffectifs!==undefined?`<div>Jours travaillés : <strong>${analysis.joursEffectifs||0}/${analysis.plafond||218}</strong></div>`:''}
            ${analysis.rttSolde!==undefined?`<div>RTT solde : <strong>${analysis.rttSolde>=0?'+':''}${analysis.rttSolde||0}j</strong></div>`:''}
            ${analysis.totalHS!==undefined?`<div>Total HS : <strong>${analysis.totalHS||0}h</strong></div>`:''}
            ${analysis.alertes?`<div>Alertes : <strong>${analysis.alertes?.length||0}</strong></div>`:''}
            <div>Avancement : <strong>${analysis.tauxRemplissage||0}%</strong></div>
          </div>` : '<div style="color:var(--pierre);font-style:italic">Données non disponibles.</div>'}
        </div>

        <button class="m6-btn m6-btn-gold" id="ent-save">💾 Enregistrer cet entretien</button>
      </div>
    </div>
    `;

    container.querySelector('#ent-save')?.addEventListener('click', () => {
      const date = container.querySelector('#ent-date')?.value;
      if (!date) { M6_toast('Saisissez la date de l\'entretien'); return; }
      const e = {
        date,
        manager:         container.querySelector('#ent-manager')?.value.trim(),
        charge:          container.querySelector('#ent-charge')?.value,
        equilibre:       container.querySelector('#ent-equilibre')?.value,
        organisation:    container.querySelector('#ent-organisation')?.value.trim(),
        chargeRessentie: container.querySelector('#ent-charge-ressentie')?.value.trim(),
        deconnexion:     container.querySelector('#ent-deconnexion')?.value,
        remuneration:    container.querySelector('#ent-remuneration')?.value.trim(),
        actions:         container.querySelector('#ent-actions')?.value.trim(),
        ajustement:      (container.querySelector('#ent-ajust-oui')?.dataset?.selected === 'oui') ? 'oui' : 'non',
        year,
        snapshotAnalysis: {
          joursEffectifs: analysis?.joursEffectifs,
          rttSolde:       analysis?.rttSolde,
          totalHS:        analysis?.totalHS,
          alertes:        analysis?.alertes?.length,
          tauxRemplissage:analysis?.tauxRemplissage,
        }
      };
      M6_Storage.addEntretien(regime, year || new Date().getFullYear(), e);
      const ctr = M6_Storage.getContract(regime);
      ctr.entretienDate = date;
      M6_Storage.setContract(regime, ctr);
      M6_toast('✅ Entretien enregistré');
      if (onSave) onSave(e);
    });

    // Boutons PDF — un par entretien historique
    container.querySelectorAll('[data-pdf-entretien]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.pdfEntretien || '';
        const [dateEnc, savedAtEnc] = key.split('|');
        const targetDate   = decodeURIComponent(dateEnc);
        const targetSavedAt = decodeURIComponent(savedAtEnc);
        // Retrouver l'entretien par date + savedAt (identifiant stable indépendant de l'ordre)
        const allE = M6_Storage.getEntretiens(regime);
        const targetE = allE.find(e =>
          e.date === targetDate && (e.savedAt === targetSavedAt || !e.savedAt)
        ) || allE.find(e => e.date === targetDate); // fallback : même date suffit
        if (!targetE) { M6_toast?.('Entretien introuvable'); return; }
        if (!window.M6_PDF?.exportEntretien) { M6_toast?.('Module PDF non chargé'); return; }
        const eYear = targetE.date ? parseInt(targetE.date.slice(0,4)) : year;
        M6_PDF.exportEntretien({
          regime, year: eYear, contract,
          analysis: targetE.snapshotAnalysis
            ? { ...analysis, ...targetE.snapshotAnalysis }
            : analysis,
          entretien: targetE
        });
      });
    });
  }
};

// ══════════════════════════════════════════════════════════════════
//  GLOSSAIRE UI
// ══════════════════════════════════════════════════════════════════

const M6_GlossaireUI = {

  render(container, regime) {
    this._regime = regime || null;
    const regimeTitle = regime === 'cadre_dirigeant' ? ' — Cadre Dirigeant'
                      : regime === 'forfait_heures'  ? ' — Forfait Heures'
                      : regime === 'forfait_jours'   ? ' — Forfait Jours'
                      : '';
    container.innerHTML = `
    <div class="m6-ornement">
      <div class="m6-ornement-line"></div>
      <div class="m6-ornement-text">Glossaire Cadres${regimeTitle}</div>
      <div class="m6-ornement-line"></div>
    </div>

    <div class="m6-field" style="margin-bottom:10px">
      <input type="text" id="gloss-search" placeholder="🔍 Rechercher un terme, article, mot-clé…" style="font-size:16px">
    </div>

    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px" id="gloss-tags">
      ${this._buildTags(regime)}
    </div>

    <div id="gloss-results"></div>
    `;

    container.querySelector('#gloss-search')?.addEventListener('input', e => {
      this._search(container, e.target.value, null);
    });
    container.querySelectorAll('.gloss-tag').forEach(t => {
      t.addEventListener('click', () => {
        container.querySelectorAll('.gloss-tag').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        const tag = t.dataset.tag;
        this._search(container, '', tag === '_all' ? null : tag);
      });
    });

    this._search(container, '', null);
  },

  _buildTags(regime) {
    let tags;
    if (regime === 'cadre_dirigeant') {
      tags = ['dirigeant', 'L3111-2', 'autonomie', 'rémunération', 'requalification', 'mandat', 'rupture', 'CCN'];
    } else if (regime === 'forfait_heures') {
      tags = ['forfait heures', 'HS', 'TEPA', 'contingent', 'majoration', 'CCN', 'repos quotidien'];
    } else {
      tags = ['forfait', 'RTT', 'congés', 'santé', 'L3121-65', 'CCN', 'télétravail', 'rachat'];
    }
    return `<button class="gloss-tag active" data-tag="_all" style="font-size:0.7rem;border:1px solid var(--champagne);border-radius:99px;padding:3px 10px;background:var(--champagne-3);color:var(--champagne-2);cursor:pointer">Tous</button>` +
      tags.map(t =>
        `<button class="gloss-tag" data-tag="${t}" style="font-size:0.7rem;border:1px solid var(--ivoire-3);border-radius:99px;padding:3px 10px;background:var(--ivoire);color:var(--pierre);cursor:pointer">${t}</button>`
      ).join('');
  },

  _search(container, query, tag) {
    const res = container.querySelector('#gloss-results');
    if (!res || !window.M6_GlossaireAPI) return;
    const items = query ? M6_GlossaireAPI.search(query) : (tag ? M6_GlossaireAPI.getByTag(tag) : M6_GLOSSAIRE);
    if (!items || items.length === 0) {
      res.innerHTML = '<div style="padding:24px;text-align:center;color:var(--pierre)">Aucun résultat</div>';
      return;
    }
    res.innerHTML = items.map(e => `
      <div class="m6-card" style="margin-bottom:10px">
        <div class="m6-card-body">
          <div style="font-weight:600;font-size:0.92rem;color:var(--charbon);margin-bottom:2px">${e.terme}</div>
          <div style="font-size:0.68rem;color:var(--champagne-2);margin-bottom:8px">${e.art}</div>
          <div style="font-size:0.8rem;color:var(--charbon-3);line-height:1.5;margin-bottom:8px">${e.def}</div>
          ${e.exemple ? `<div style="font-size:0.75rem;color:var(--pierre);font-style:italic;border-left:2px solid var(--champagne);padding-left:8px">Exemple : ${e.exemple}</div>` : ''}
          <div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:8px">
            ${(e.tags||[]).map(t=>`<span style="font-size:0.62rem;padding:1px 7px;border-radius:99px;background:var(--ivoire);color:var(--pierre);border:1px solid var(--ivoire-3)">${t}</span>`).join('')}
          </div>
        </div>
      </div>`).join('');
  }
};

global.M6_Entretien   = M6_Entretien;
global.M6_GlossaireUI = M6_GlossaireUI;

})(window);
