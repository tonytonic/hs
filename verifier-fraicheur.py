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


def texte_du_noeud(noeud):
    """Concatène le texte des articles d'une clause."""
    bouts = []
    for a in (noeud.get("articles") or []):
        if isinstance(a, dict):
            t = a.get("content") or a.get("texte") or ""
            if t:
                bouts.append(re.sub(r"<[^>]+>", " ", str(t)))
    return re.sub(r"\s+", " ", " ".join(bouts)).strip()


# Un montant en euros, avec ou sans décimales, tel qu'on l'écrit dans un avenant.
MONTANT = re.compile(r"\b\d{1,2}[  ]?\d{3}(?:[.,]\d{1,2})?\s*(?:€|euros?)", re.I)


def extrait_montants(txt, maxi=6):
    """Phrases du texte qui portent un montant en euros.

    C'est ce qui manque pour agir : savoir qu'un avenant existe ne suffit pas,
    il faut les chiffres. On ne retient que les phrases qui en contiennent, pour
    éviter de recopier des pages de considérants.
    """
    if not txt:
        return []
    trouves = []
    for phrase in re.split(r"(?<=[.;])\s+", txt):
        if MONTANT.search(phrase):
            p = phrase.strip()
            if len(p) > 240:
                p = p[:240] + "…"
            trouves.append(p)
            if len(trouves) >= maxi:
                break
    return trouves


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
            acc.append((d, titre.strip(), texte_du_noeud(noeud)))
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

    # Une CCN fusionnée redirigée vers une autre qui a déjà une vraie grille
    # n'est PAS "à créer" -- elle est déjà couverte, via la fusion. Sans ce
    # contrôle, chaque nouvelle fusion ajoutée à CCN_FUSIONS redéclencherait
    # une fausse alerte "grille à créer" pour une convention dont personne ne
    # consulte plus jamais la grille de référence directement.
    mf = re.search(r"const CCN_FUSIONS=(\{.*?\});", s, re.S)
    fusions = json.loads(mf.group(1)) if mf else {}

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
        clauses.sort(key=lambda c: c[0], reverse=True)
        d_fonds, titre, texte = clauses[0]

        # Une CCN fusionnée ne sera plus jamais mise à jour individuellement --
        # sa propre entrée peut être vide, cassée, ou périmée, ça n'a plus
        # d'importance : c'est la CIBLE de la fusion qui compte, pas elle.
        # Ce contrôle doit passer AVANT de regarder si une grille existe, sinon
        # une fusion dont la grille est cassée (date vide, format non standard)
        # continue d'être signalée comme "sans date" ou "périmée" -- seul le
        # cas "aucune grille du tout" était couvert avant.
        if idcc in fusions:
            continue

        g = grilles.get(idcc)
        if not g:
            # Le fonds a une clause salaire alors qu'on n'affiche aucune grille :
            # c'est une grille à créer, pas seulement à rafraîchir.
            non_couvertes.append((idcc, d_fonds, titre, texte))
            continue

        d_grille = date_de_grille(g.get("d"))
        if not d_grille:
            sans_date.append((idcc, d_fonds, titre, texte))
            continue

        # Une convention à barèmes régionaux (voir mécanisme d'onglets région)
        # peut avoir une région à jour même quand sa grille de RÉFÉRENCE ne
        # l'est pas — la référence n'a pas à changer à chaque avenant régional
        # pour rester utile comme repère rapide. On retient la date la plus
        # récente parmi la référence et toutes les régions : si UNE SEULE
        # d'entre elles couvre déjà la clause la plus récente du fonds, cette
        # convention est à jour dans l'app, même si ce n'est pas via la
        # référence. Sans ce garde-fou, toute convention régionale enrichie
        # resterait signalée indéfiniment, peu importe le travail fait.
        d_plus_recente = d_grille
        for region in (g.get("regions") or {}).values():
            d_region = date_de_grille(region.get("d"))
            if d_region and d_region > d_plus_recente:
                d_plus_recente = d_region

        ecart = (d_fonds - d_plus_recente).days
        if ecart > args.marge:
            a_revoir.append((idcc, d_grille, d_fonds, ecart, titre, g.get("st"), texte))

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
        for idcc, dg, df, ec, titre, st, texte in a_revoir:
            L.append(f"### IDCC {idcc} — {noms.get(idcc, '?')[:44]}")
            L.append("")
            L.append(f"Grille affichée : **{dg.strftime('%d/%m/%Y')}** · "
                     f"Clause au fonds : **{df.strftime('%d/%m/%Y')}** · écart **{ec} jours**")
            L.append("")
            L.append(f"> {titre}")
            L.append("")
            montants = extrait_montants(texte)
            if montants:
                # Les montants sont recopiés tels quels depuis le texte officiel.
                # C'est ce qui permet de mettre la grille à jour sans rouvrir
                # l'avenant : l'alerte devient un outil de saisie, pas un pense-bête.
                L.append("Montants relevés dans la clause :")
                L.append("")
                for m in montants:
                    L.append(f"- {m}")
            else:
                L.append("_Aucun montant repérable dans le texte : ouvrir la clause pour vérifier._")
            L.append("")
    else:
        L.append("Aucune grille dépassée : toutes sont au moins aussi récentes que le fonds.")
        L.append("")

    if non_couvertes:
        L.append(f"## {len(non_couvertes)} convention(s) sans grille mais avec une clause au fonds")
        L.append("")
        L.append("Une grille pourrait être créée à partir de ces textes.")
        L.append("")
        for idcc, df, titre, _ in non_couvertes[:30]:
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
        L.append("- " + ", ".join(f"IDCC {i}" for i, _, _, _ in sans_date[:40]))
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
