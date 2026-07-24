#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VERIFIER-FRAICHEUR.PY — quelles grilles sont dépassées par le fonds ?

L'IDÉE
Le fonds récupère les clauses « salaires » de chaque convention et connaît leur
date (« Avenant salaires du 12 janvier 2026 »). GrillePaye connaît la date de la
grille affichée. Si le fonds a plus récent, la grille est à revoir.

C'est la veille qui manquait : au lieu de parcourir 292 grilles à la main pour
chercher ce qui a bougé, on obtient la liste de ce qui a changé depuis le
dernier relevé — et rien d'autre.

CE QUE LE SCRIPT NE FAIT PAS
Il ne touche à aucun montant. Passer du texte d'un avenant à un barème structuré
demande une interprétation : chaque branche a sa logique (valeur de point,
paliers horaires, indice majoré, RAM annuelle). Une erreur d'interprétation
produirait un faux salaire minimum, ce qui est pire qu'une grille datée.
Le script signale, tu décides.

USAGE
    python3 verifier-fraicheur.py --fonds ../droit/output/ccn
    python3 verifier-fraicheur.py --fonds ../droit/output/ccn --out veille.md
    python3 verifier-fraicheur.py --fonds ../droit/output/ccn --marge 60

--marge : nombre de jours d'écart en deçà duquel on ne signale rien. Un avenant
signé quelques jours après le relevé de la grille est souvent déjà pris en
compte ; 30 jours par défaut évite ce bruit.
"""
import argparse
import glob
import json
import os
import re
import sys
from datetime import datetime

MOIS = {
    "janvier": 1, "février": 2, "fevrier": 2, "mars": 3, "avril": 4, "mai": 5,
    "juin": 6, "juillet": 7, "août": 8, "aout": 8, "septembre": 9,
    "octobre": 10, "novembre": 11, "décembre": 12, "decembre": 12,
}

# Une clause n'est retenue que si son titre parle bien de rémunération : le
# fonds contient aussi des avenants sur le temps de travail, la prévoyance…
# qui n'ont aucune incidence sur une grille de salaire.
SUJET_SALAIRE = re.compile(r"salaire|rémunération|remuneration|minima|barème|bareme|grille", re.I)


def date_du_titre(titre):
    """« Avenant salaires du 12 janvier 2026 » -> datetime(2026, 1, 12)."""
    t = (titre or "").lower()
    m = re.search(r"(\d{1,2})\s+(" + "|".join(MOIS) + r")\s+(\d{4})", t)
    if m:
        try:
            return datetime(int(m.group(3)), MOIS[m.group(2)], int(m.group(1)))
        except ValueError:
            return None
    m = re.search(r"(\d{1,2})/(\d{1,2})/(\d{4})", t)
    if m:
        try:
            return datetime(int(m.group(3)), int(m.group(2)), int(m.group(1)))
        except ValueError:
            return None
    return None


def date_de_grille(txt):
    """Accepte « 01/06/2026 », « 2026 », ou rien. Une année seule est ramenée
    au 1er janvier : c'est la lecture la plus prudente, elle ne peut que
    signaler un avenant de trop, jamais en masquer un."""
    if not txt:
        return None
    t = str(txt).strip()
    for fmt in ("%d/%m/%Y", "%m/%Y", "%Y"):
        try:
            return datetime.strptime(t, fmt)
        except ValueError:
            pass
    m = re.search(r"(20\d\d)", t)
    return datetime(int(m.group(1)), 1, 1) if m else None


def clauses_salaire(noeud, acc=None):
    """Parcourt l'arbre d'une convention et relève les clauses de rémunération
    dont le texte a été récupéré."""
    if acc is None:
        acc = []
    if not isinstance(noeud, dict):
        return acc
    titre = noeud.get("title") or noeud.get("titre") or ""
    if titre and SUJET_SALAIRE.search(titre):
        d = date_du_titre(titre)
        if d:
            acc.append((d, titre.strip()))
    for s in (noeud.get("sections") or []):
        clauses_salaire(s, acc)
    return acc


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--racine", default=".", help="Racine du dépôt de l'application")
    ap.add_argument("--fonds", required=True, help="Dossier output/ccn du dépôt droit")
    ap.add_argument("--marge", type=int, default=30,
                    help="Écart minimal en jours pour signaler (défaut 30)")
    ap.add_argument("--out", help="Écrire le rapport en markdown")
    args = ap.parse_args()

    if not os.path.isdir(args.fonds):
        print(f"{args.fonds} introuvable — le dépôt du fonds est-il bien récupéré ?",
              file=sys.stderr)
        return 1

    gp = os.path.join(args.racine, "GrillePaye")
    data = json.load(open(os.path.join(gp, "ccn-data.json"), encoding="utf-8"))
    grilles = data["grilles"]

    s = open(os.path.join(gp, "index.html"), encoding="utf-8", errors="replace").read()
    m = re.search(r"const CCN_ALL=(\[\[.*?\]\]);", s)
    noms = {}
    for c in json.loads(m.group(1)):
        noms.setdefault(str(c[0]), c[1])

    a_revoir, sans_date, non_couvertes = [], [], []

    for chemin in sorted(glob.glob(os.path.join(args.fonds, "*.json"))):
        idcc = os.path.splitext(os.path.basename(chemin))[0]
        if idcc.startswith("_"):
            continue
        try:
            fonds = json.load(open(chemin, encoding="utf-8"))
        except Exception:
            continue
        if not isinstance(fonds, dict) or "_error" in fonds:
            continue

        clauses = clauses_salaire(fonds)
        if not clauses:
            continue
        clauses.sort(reverse=True)
        d_fonds, titre = clauses[0]

        g = grilles.get(idcc)
        if not g:
            # Le fonds a une clause salaire alors qu'on n'affiche aucune grille :
            # c'est une grille à créer, pas seulement à rafraîchir.
            non_couvertes.append((idcc, d_fonds, titre))
            continue

        d_grille = date_de_grille(g.get("d"))
        if not d_grille:
            sans_date.append((idcc, d_fonds, titre))
            continue

        ecart = (d_fonds - d_grille).days
        if ecart > args.marge:
            a_revoir.append((idcc, d_grille, d_fonds, ecart, titre, g.get("st")))

    a_revoir.sort(key=lambda x: -x[3])
    non_couvertes.sort(key=lambda x: x[1], reverse=True)

    L = ["# Veille des grilles — " + datetime.now().strftime("%d/%m/%Y"), ""]
    L.append(f"Comparaison entre la date des grilles affichées et celle des clauses de "
             f"rémunération récupérées par le fonds. Marge appliquée : {args.marge} jours.")
    L.append("")

    if a_revoir:
        L.append(f"## {len(a_revoir)} grille(s) dépassée(s) par le fonds")
        L.append("")
        L.append("Le fonds a une clause de rémunération plus récente que la grille affichée.")
        L.append("")
        L.append("| IDCC | Convention | Grille | Fonds | Écart | Clause repérée |")
        L.append("|---|---|---|---|---|---|")
        for idcc, dg, df, ec, titre, st in a_revoir:
            L.append(f"| {idcc} | {noms.get(idcc, '?')[:34]} | {dg.strftime('%d/%m/%Y')} | "
                     f"{df.strftime('%d/%m/%Y')} | {ec} j | {titre[:46]} |")
        L.append("")
    else:
        L.append("Aucune grille dépassée : toutes sont au moins aussi récentes que le fonds.")
        L.append("")

    if non_couvertes:
        L.append(f"## {len(non_couvertes)} convention(s) sans grille mais avec une clause au fonds")
        L.append("")
        L.append("Une grille pourrait être créée à partir de ces textes.")
        L.append("")
        for idcc, df, titre in non_couvertes[:30]:
            L.append(f"- **IDCC {idcc}** — {noms.get(idcc, '?')[:38]} : "
                     f"{titre[:52]} ({df.strftime('%d/%m/%Y')})")
        if len(non_couvertes) > 30:
            L.append(f"- … et {len(non_couvertes) - 30} autre(s)")
        L.append("")

    if sans_date:
        L.append(f"## {len(sans_date)} grille(s) sans date exploitable")
        L.append("")
        L.append("Impossible de les comparer. Renseigner leur champ `d` les ferait entrer "
                 "dans la veille.")
        L.append("")
        L.append("- " + ", ".join(f"IDCC {i}" for i, _, _ in sans_date[:40]))
        L.append("")

    rapport = "\n".join(L)
    if args.out:
        open(args.out, "w", encoding="utf-8").write(rapport)
        print(f"Rapport écrit dans {args.out}")
    else:
        print(rapport)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
