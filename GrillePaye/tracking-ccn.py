#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TRACKING-CCN.PY — régénère le tableau de suivi depuis l'état réel des fichiers

POURQUOI CE SCRIPT ?
`tracking-ccn.csv` était tenu à la main. Il a fini par retarder sur la réalité :
112 conventions y figuraient encore en « a_verifier_identite » alors que la
vérification avait bien eu lieu — 68 portaient une trace explicite dans leur
note de grille, et les 42 restantes avaient un statut établi dans
verif_dares_complete.csv. Aucune n'était réellement en attente.

C'est le même défaut que celui relevé le 16/07 dans README-livraison.md
(« des données déjà sourcées n'avaient jamais été appliquées au fichier réel »),
mais en sens inverse : ici le travail est fait, c'est le tableau de bord qui
affiche l'ancien état.

La réponse n'est pas de le remettre à jour à la main une fois de plus, mais de
le rendre DÉRIVÉ : un tableau recalculé ne peut pas se désynchroniser, puisqu'il
n'est jamais saisi.

CE QUI EST RECALCULÉ, CE QUI EST PRÉSERVÉ
  Recalculé (déductible des fichiers) :
      statut, niveaux, date_grille, statut_dares, sous_smic, libelle
  Préservé tel quel (recherche manuelle, irremplaçable) :
      freq_guide, source_verifiee, notes

Le script ne perd JAMAIS une note. Si une convention disparaît de CCN_ALL, sa
ligne est conservée avec le statut « absente de CCN_ALL » plutôt que supprimée.

USAGE
    python3 tracking-ccn.py                     # aperçu à l'écran
    python3 tracking-ccn.py --ecrire            # met à jour tracking-ccn.csv
    python3 tracking-ccn.py --guide ../../Guide-main   # recalcule aussi freq_guide
"""
import argparse
import csv
import json
import os
import re
import sys
from collections import Counter

# Marqueurs laissés par les passes de vérification dans le champ « source »
# d'une grille. Leur présence atteste qu'une identité a été tranchée.
TRACE_VERIF = re.compile(
    r"RÉSOLU|CONFIRMÉE|CONTRÔLE COMPLET|identité (réelle )?confirm|CRÉÉ \d\d/\d\d"
    r"|vérifi|recherches répétées|réel\s*=",
    re.I)

# Marqueurs d'un contenu explicitement approximatif.
TRACE_DOUTE = re.compile(r"À VÉRIFIER|estimation|non confirmé", re.I)

# Écart au SMIC légitime et documenté : traitement indiciaire complété par une
# indemnité différentielle (fonction publique). Ce n'est pas une anomalie.
EXPLIQUE_SOUS_SMIC = re.compile(r"indemnité différentielle|indiciaire|indice majoré", re.I)

COLONNES = ["idcc", "libelle", "freq_guide", "statut", "niveaux", "date_grille",
            "statut_dares", "sous_smic", "source_verifiee", "notes"]


def charger_ccn_all(chemin):
    s = open(chemin, encoding="utf-8", errors="replace").read()
    m = re.search(r"const CCN_ALL=(\[\[.*?\]\]);", s)
    if not m:
        raise SystemExit(f"CCN_ALL introuvable dans {chemin}")
    d = {}
    for c in json.loads(m.group(1)):
        d.setdefault(str(c[0]), c[1])       # 1er libellé si plusieurs alias
    return d


def charger_existant(chemin):
    """Colonnes saisies à la main, à ne jamais perdre."""
    if not os.path.exists(chemin):
        return {}
    garde = {}
    with open(chemin, encoding="utf-8-sig", newline="") as f:
        for r in csv.DictReader(f):
            i = (r.get("idcc") or "").strip()
            if not i:
                continue
            garde[i] = {
                "freq_guide": r.get("freq_guide", "") or "",
                "source_verifiee": r.get("source_verifiee", "") or "",
                "notes": r.get("notes", "") or "",
            }
    return garde


def charger_dares_verif(chemin):
    if not os.path.exists(chemin):
        return {}
    with open(chemin, encoding="utf-8-sig", newline="") as f:
        return {(r.get("idcc") or "").strip(): (r.get("statut_dares") or "").strip()
                for r in csv.DictReader(f)}


def compter_guide(dossier):
    """Fréquence d'apparition de chaque IDCC dans les pages du guide.

    Sert à prioriser : une convention citée 136 fois mérite d'être traitée avant
    une citée deux fois.
    """
    if not dossier or not os.path.isdir(dossier):
        return None
    freq = Counter()
    for nom in os.listdir(dossier):
        if not nom.endswith(".html"):
            continue
        s = open(os.path.join(dossier, nom), encoding="utf-8", errors="ignore").read()
        s = re.sub(r"Confusion avec IDCC[^<]{0,120}", "", s)   # mentions pédagogiques
        for c in set(re.findall(r"IDCC[\s\u00a0]?n?°?[\s\u00a0]?(\d{2,5})", s)):
            freq[c] += 1
    return freq


def statut_de(idcc, grille, statut_dares, smic):
    """Statut déduit, du plus bloquant au plus abouti."""
    if grille is None:
        if statut_dares == "HISTORIQUE_PERIME":
            return "périmée — pas de grille", ""
        if statut_dares == "INTROUVABLE_DARES":
            return "hors référentiel — pas de grille", ""
        return "sans grille (estimation % SMIC)", ""

    st = grille.get("st") or ""
    src = str(grille.get("s") or "")

    # Grille sous le SMIC : signalé à part, c'est le défaut le plus grave.
    sous = ""
    montants = [r.get("b") for r in grille.get("g", [])
                if isinstance(r.get("b"), (int, float)) and r.get("t") != "pct"]
    if montants and smic:
        mini = min(montants)
        if 500 <= mini < smic:          # sous 500 € : taux horaire ou cachet, hors comparaison
            sous = "documenté" if EXPLIQUE_SOUS_SMIC.search(src) else f"oui ({mini} €)"

    if st == "placeholder":
        return "placeholder — contenu à sourcer", sous
    if st == "estimated" or TRACE_DOUTE.search(src):
        return "estimation à confirmer", sous
    if TRACE_VERIF.search(src):
        return "vérifiée", sous
    return "sourcée", sous


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--racine", default=".", help="Dossier GrillePaye")
    ap.add_argument("--guide", help="Dossier du guide, pour recalculer freq_guide")
    ap.add_argument("--ecrire", action="store_true", help="Écrire tracking-ccn.csv")
    ap.add_argument("--out", default="tracking-ccn.csv")
    args = ap.parse_args()

    R = args.racine
    data = json.load(open(os.path.join(R, "ccn-data.json"), encoding="utf-8"))
    grilles = data["grilles"]
    smic = data.get("_smic")
    noms = charger_ccn_all(os.path.join(R, "index.html"))
    garde = charger_existant(os.path.join(R, args.out))
    dares = charger_dares_verif(os.path.join(R, "verif_dares_complete.csv"))
    freq = compter_guide(args.guide)

    # Toutes les conventions connues, quelle que soit la source.
    tous = set(noms) | set(garde) | set(grilles) | set(dares)

    lignes = []
    for i in sorted(tous, key=lambda x: int(x) if x.isdigit() else 0):
        g = grilles.get(i)
        sd = dares.get(i, "")
        statut, sous = statut_de(i, g, sd, smic)
        if i not in noms:
            statut = "absente de CCN_ALL — " + statut
        anc = garde.get(i, {})
        f = str(freq.get(i, 0)) if freq is not None else anc.get("freq_guide", "")
        lignes.append({
            "idcc": i,
            "libelle": noms.get(i, ""),
            "freq_guide": f,
            "statut": statut,
            "niveaux": len(g.get("g", [])) if g else 0,
            "date_grille": (g or {}).get("d", ""),
            "statut_dares": sd,
            "sous_smic": sous,
            "source_verifiee": anc.get("source_verifiee", ""),
            "notes": anc.get("notes", ""),
        })

    # Tri par priorité : ce qui est le plus cité par le guide d'abord.
    lignes.sort(key=lambda r: (-int(r["freq_guide"] or 0), int(r["idcc"]) if r["idcc"].isdigit() else 0))

    c = Counter(r["statut"] for r in lignes)
    print(f"{len(lignes)} conventions suivies\n")
    for k, v in c.most_common():
        print(f"   {v:>4}  {k}")
    ss = [r for r in lignes if r["sous_smic"] and r["sous_smic"] != "documenté"]
    if ss:
        print(f"\n   {len(ss)} grille(s) sous le SMIC : " +
              ", ".join(f"IDCC {r['idcc']}" for r in ss))
    perdues = [r for r in lignes if r["notes"] and not r["libelle"]]
    if perdues:
        print(f"\n   {len(perdues)} ligne(s) conservée(s) pour leurs notes bien "
              f"qu'absente(s) de CCN_ALL")

    if args.ecrire:
        chemin = os.path.join(R, args.out)
        with open(chemin, "w", encoding="utf-8-sig", newline="") as f:
            w = csv.DictWriter(f, fieldnames=COLONNES, delimiter=",")
            w.writeheader()
            w.writerows(lignes)
        print(f"\n{chemin} régénéré ({len(lignes)} lignes).")
    else:
        print("\n(aperçu seulement — utilise --ecrire pour mettre à jour le fichier)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
