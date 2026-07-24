#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GENERER-SUIVI-PUBLIC.PY — produit suivi-public.json à partir de ccn-data.json

POURQUOI UN FICHIER SÉPARÉ ?
Le champ « source » de chaque grille dans ccn-data.json mélange deux choses :
la référence juridique (« Accord du 29/01/2025 relatif aux salaires minima »)
et l'historique de travail (« CORRECTION MAJEURE 18/07 : identité réelle =
… PAS matelot/maritime comme précédemment », « source AdvizExperts écartée,
peu fiable »).

Le second est précieux en interne et illisible pour un utilisateur : personne
n'a besoin de voir défiler les corrections passées pour faire confiance à un
montant. Plutôt que de filtrer à l'affichage — où une note oubliée finirait par
passer — on génère un fichier qui ne contient QUE le présentable.

Sur 292 grilles, 213 ont une référence juridique extractible. Les 79 autres
n'affichent que leur statut et leur date : mieux vaut pas de source qu'une note
de travail.

CE QUE CONTIENT LE FICHIER PUBLIC
    statut (libellé lisible), date de la grille, référence juridique si elle
    existe, et des compteurs globaux.

CE QU'IL NE CONTIENT JAMAIS
    l'historique des corrections, les sources écartées, les mentions d'erreur,
    les marqueurs de contrôle interne.

USAGE
    python3 generer-suivi-public.py                  # aperçu
    python3 generer-suivi-public.py --ecrire         # écrit suivi-public.json
"""
import argparse
import json
import os
import re
from collections import Counter
from datetime import datetime

# Marqueurs d'une note de travail. Un segment qui en contient un est écarté,
# quelle que soit sa position.
INTERNE = re.compile(
    r"RÉSOLU|CORRECTION|erreur antérieur|peu fiable|CONTRÔLE COMPLET|À VÉRIFIER"
    r"|identité|CRÉÉ \d\d/|écarté|prétendait|non confirmé|à reconstruire"
    r"|recherches répétées|session|ATTENTION|pattern",
    re.I)

# Référence juridique exploitable, dans l'ordre de préférence : un accord daté
# vaut mieux qu'un simple numéro de brochure.
REFERENCES = [
    re.compile(r"(?:accord|avenant)\s+(?:national\s+)?(?:n°\s*[\w/-]+\s+)?du\s+\d{1,2}[/ ]\w+[/ ]\d{2,4}", re.I),
    re.compile(r"avenant\s*n°\s*[\w/-]+", re.I),
    re.compile(r"arrêté\s+(?:d'extension\s+)?du\s+\d{1,2}[/ ]\w+[/ ]\d{2,4}", re.I),
    re.compile(r"brochure\s*(?:JO\s*)?n?°?\s*\d{4}", re.I),
]

# Statuts publics : des mots que l'utilisateur comprend, pas notre jargon.
LIBELLE_STATUT = {
    "verifiee": "Vérifiée",
    "sourcee": "Sourcée",
    "estimation": "Estimation",
    "encours": "En cours de sourçage",
    "absente": "Non couverte",
}

TRACE_VERIF = re.compile(
    r"RÉSOLU|CONFIRMÉE|CONTRÔLE COMPLET|identité (réelle )?confirm|vérifi", re.I)
TRACE_DOUTE = re.compile(r"À VÉRIFIER|estimation", re.I)


def reference_publique(src):
    """Extrait une référence juridique présentable, ou rien.

    On découpe sur « | », on jette tout segment portant une marque de note de
    travail, puis on cherche une référence dans ce qui reste. En dernier recours
    seulement, on cherche dans la chaîne entière — un numéro de brochure reste
    inoffensif même s'il voisine une note.
    """
    if not src:
        return ""
    segments = [s.strip() for s in str(src).split("|")]
    propres = [s for s in segments if not INTERNE.search(s)]
    for zone in (propres, [str(src)]):
        for motif in REFERENCES:
            for s in zone:
                m = motif.search(s)
                if m:
                    ref = m.group(0).strip(" .,;")
                    # Garde-fou : jamais de note de travail dans la sortie.
                    return "" if INTERNE.search(ref) else ref
    return ""


def statut_public(grille):
    if grille is None:
        return "absente"
    st = grille.get("st") or ""
    src = str(grille.get("s") or "")
    if st == "placeholder":
        return "encours"
    if st == "estimated" or TRACE_DOUTE.search(src):
        return "estimation"
    if TRACE_VERIF.search(src):
        return "verifiee"
    return "sourcee"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--racine", default=".")
    ap.add_argument("--out", default="suivi-public.json")
    ap.add_argument("--ecrire", action="store_true")
    args = ap.parse_args()

    data = json.load(open(os.path.join(args.racine, "ccn-data.json"), encoding="utf-8"))
    grilles = data["grilles"]

    s = open(os.path.join(args.racine, "index.html"), encoding="utf-8", errors="replace").read()
    m = re.search(r"const CCN_ALL=(\[\[.*?\]\]);", s)
    noms = {}
    for c in json.loads(m.group(1)):
        noms.setdefault(str(c[0]), c[1])

    ccn = {}
    for idcc in sorted(noms, key=lambda x: int(x) if x.isdigit() else 0):
        g = grilles.get(idcc)
        st = statut_public(g)
        e = {"s": st}
        if g:
            if g.get("d"):
                e["d"] = str(g["d"])
            ref = reference_publique(g.get("s"))
            if ref:
                e["r"] = ref
        ccn[idcc] = e

    stats = Counter(v["s"] for v in ccn.values())
    sortie = {
        "_genere": datetime.now().strftime("%d/%m/%Y"),
        "_smic": data.get("_smic"),
        "_smic_date": data.get("_smic_date"),
        "_libelles": LIBELLE_STATUT,
        "_stats": {k: stats.get(k, 0) for k in LIBELLE_STATUT},
        "ccn": ccn,
    }

    print(f"{len(ccn)} conventions")
    for k, lib in LIBELLE_STATUT.items():
        print(f"   {stats.get(k, 0):>4}  {lib}")
    avec_ref = sum(1 for v in ccn.values() if v.get("r"))
    print(f"\n   {avec_ref} avec une référence juridique publiable")

    # Contrôle de non-fuite : aucune note de travail ne doit avoir survécu.
    fuites = [i for i, v in ccn.items() if v.get("r") and INTERNE.search(v["r"])]
    print(f"   {len(fuites)} fuite(s) de note interne détectée(s)" +
          (f" : {fuites[:5]}" if fuites else " — aucune"))

    if args.ecrire:
        chemin = os.path.join(args.racine, args.out)
        with open(chemin, "w", encoding="utf-8") as f:
            json.dump(sortie, f, ensure_ascii=False, separators=(",", ":"))
        print(f"\n{chemin} écrit ({os.path.getsize(chemin) // 1024} Ko).")
    else:
        print("\n(aperçu seulement — utilise --ecrire pour générer le fichier)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
