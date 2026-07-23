#!/usr/bin/env python3
"""
VERIFIER-GRILLES.PY — contrôle de santé des grilles de salaire de GrillePaye

POURQUOI CE SCRIPT ?
Deux fois de suite, des liens et des grilles se sont révélés inexploitables sans
que rien ne le signale : 16 % des articles liés absents du fonds, puis 46 % des
conventions. À chaque fois la découverte a été manuelle. Ce script fait le
contrôle systématiquement, pour qu'un écart se voie tout de suite.

CE QU'IL VÉRIFIE
  1. Conventions sans grille réelle (l'application retombe sur une estimation
     en % du SMIC, ce qui est correct mais moins précis).
  2. Grilles dont le premier niveau est passé SOUS le SMIC. C'est le contrôle le
     plus important : un minimum conventionnel inférieur au SMIC ne s'applique
     pas, l'employeur doit verser le SMIC. Afficher le montant conventionnel
     induirait le salarié en erreur.
  3. Grilles anciennes (par défaut : dernière mise à jour il y a plus de 18 mois).
  4. Grilles encore marquées "placeholder".
  5. Conventions liées vers MonLegiTexte mais absentes du fonds (liens morts).

PIÈGE TRAITÉ : L'HÉTÉROGÉNÉITÉ DES UNITÉS
Toutes les grilles ne sont pas mensuelles. Certaines branches publient un taux
horaire (une dizaine d'euros) ou un cachet journalier (autour de 90 € dans le
spectacle). Comparer ces montants au SMIC mensuel produirait 5 fausses alertes
sur 7. Le contrôle ne compare donc que les montants plausiblement mensuels,
au-dessus du seuil MONTANT_MENSUEL_MINI.

USAGE
    python3 verifier-grilles.py                      # rapport à l'écran
    python3 verifier-grilles.py --out rapport.md     # rapport dans un fichier
    python3 verifier-grilles.py --idcc-suivis ../droit/idcc_list.txt
    python3 verifier-grilles.py --strict             # code de sortie 1 si anomalie

Le code de sortie 1 en mode --strict permet de brancher le script sur un hook
de pré-déploiement : on ne pousse pas une version dont une grille est sous le
SMIC.
"""
import argparse
import json
import os
import re
import sys
from datetime import datetime

# En dessous de ce montant, on considère que la grille n'est pas mensuelle
# (taux horaire, cachet journalier…) et on ne la compare pas au SMIC.
MONTANT_MENSUEL_MINI = 500.0

# Certaines grilles sont LÉGITIMEMENT sous le SMIC et la note de source
# l'explique. C'est le cas des statuts à traitement indiciaire (fonction
# publique territoriale) : le traitement de base des premiers échelons est
# inférieur au SMIC, et la loi prévoit une indemnité différentielle qui comble
# l'écart. Signaler ces cas comme des anomalies serait une fausse alerte.
EXPLIQUE_SOUS_SMIC = re.compile(r"indemnité différentielle|indiciaire|indice majoré", re.I)

# Au-delà de ce nombre de mois sans mise à jour, une grille est signalée.
ANCIENNETE_MOIS = 18


def lire_date(txt):
    """Accepte '01/06/2026', '2026', ou rien. Renvoie un datetime ou None."""
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


def mois_ecoules(d, ref):
    return (ref.year - d.year) * 12 + (ref.month - d.month)


def charger_ccn_all(chemin_html):
    with open(chemin_html, encoding="utf-8", errors="replace") as f:
        s = f.read()
    m = re.search(r"const CCN_ALL=(\[\[.*?\]\]);", s)
    if not m:
        raise SystemExit(f"CCN_ALL introuvable dans {chemin_html}")
    ccn = json.loads(m.group(1))
    # Reproduit la règle idccFiable de l'application : ces conventions sont
    # celles qui reçoivent un lien vers le texte officiel.
    nat = re.search(r"IDCC_AGRI_NAT=\[([\d,\s]+)\]", s.replace("\n", ""))
    agri = {int(x) for x in nat.group(1).split(",") if x.strip()} if nat else set()
    liees = {c[0] for c in ccn
             if (c[0] <= 7000 or c[0] in agri)
             and not re.search(r"à vérifier|non confirmée", c[1], re.I)}
    return ccn, liees


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--racine", default=".", help="Racine du dépôt de l'application")
    ap.add_argument("--idcc-suivis", help="idcc_list.txt du dépôt droit, pour détecter les liens morts")
    ap.add_argument("--out", help="Écrire le rapport dans ce fichier (markdown)")
    ap.add_argument("--anciennete", type=int, default=ANCIENNETE_MOIS)
    ap.add_argument("--strict", action="store_true",
                    help="Code de sortie 1 si une anomalie bloquante est trouvée")
    args = ap.parse_args()

    gp = os.path.join(args.racine, "GrillePaye")
    with open(os.path.join(gp, "ccn-data.json"), encoding="utf-8") as f:
        data = json.load(f)
    grilles = data["grilles"]
    smic = data.get("_smic")
    if not smic:
        raise SystemExit("Champ _smic absent de ccn-data.json — contrôle impossible.")

    ccn, liees = charger_ccn_all(os.path.join(gp, "index.html"))
    codes = [c[0] for c in ccn]
    noms = {c[0]: c[1] for c in ccn}
    ref = datetime.now()

    sans_grille = [c for c in codes if str(c) not in grilles]
    sous_smic, anciennes, placeholders, hors_unite = [], [], [], []
    sous_explique, estim_perimee = [], []

    for idcc, v in grilles.items():
        statut = v.get("st")
        src = str(v.get("s") or "")
        if statut == "placeholder":
            placeholders.append(idcc)

        d = lire_date(v.get("d"))
        if d and mois_ecoules(d, ref) > args.anciennete:
            anciennes.append((idcc, v.get("d"), mois_ecoules(d, ref)))

        montants = [r.get("b") for r in v.get("g", [])
                    if isinstance(r.get("b"), (int, float)) and r.get("t") != "pct"]
        if not montants:
            continue
        mini = min(montants)
        if mini < MONTANT_MENSUEL_MINI:
            hors_unite.append((idcc, mini))       # taux horaire / cachet : hors comparaison
        elif mini < smic:
            if EXPLIQUE_SOUS_SMIC.search(src):
                # Écart normal et documenté (traitement indiciaire + indemnité
                # différentielle) : ce n'est pas une anomalie.
                sous_explique.append((idcc, mini))
            elif statut == "real":
                # Grille réelle : la branche n'a pas renégocié depuis la
                # revalorisation. C'est un fait juridique à signaler.
                sous_smic.append((idcc, mini, v.get("d")))
            else:
                # Estimation ou placeholder ancré sur un SMIC devenu obsolète.
                # Celle-là est de NOTRE fait, et se corrige sans attendre personne.
                estim_perimee.append((idcc, mini, statut))

    liens_morts = []
    if args.idcc_suivis and os.path.exists(args.idcc_suivis):
        with open(args.idcc_suivis, encoding="utf-8") as f:
            suivis = {int(l.strip()) for l in f if l.strip().isdigit()}
        liens_morts = sorted(liees - suivis)

    L = []
    L.append(f"# Santé des grilles de salaire — {ref.strftime('%d/%m/%Y')}")
    L.append("")
    L.append(f"SMIC de référence : **{smic} €** ({data.get('_smic_date', 'date inconnue')})")
    L.append("")
    L.append(f"- Conventions proposées : **{len(codes)}**")
    L.append(f"- Grilles réelles disponibles : **{len(grilles)}**")
    L.append(f"- Conventions sans grille (estimation % SMIC) : **{len(sans_grille)}**")
    L.append("")

    bloquant = False

    if sous_smic:
        bloquant = True
        L.append(f"## ⚠️ {len(sous_smic)} grille(s) sous le SMIC — à corriger")
        L.append("")
        L.append("Le minimum conventionnel affiché est inférieur au SMIC : il ne s'applique "
                 "donc pas, l'employeur doit verser le SMIC. La branche n'a probablement pas "
                 "renégocié depuis la dernière revalorisation.")
        L.append("")
        for idcc, mini, d in sorted(sous_smic, key=lambda x: x[1]):
            ecart = round(100 * (smic - mini) / smic, 1)
            L.append(f"- **IDCC {idcc}** — {noms.get(int(idcc), '?')[:44]} : "
                     f"{mini} € ({ecart} % sous le SMIC), mise à jour {d}")
        L.append("")

    if liens_morts:
        bloquant = True
        L.append(f"## ⚠️ {len(liens_morts)} lien(s) vers un texte absent du fonds")
        L.append("")
        L.append("Ces conventions proposent un lien « Voir le texte officiel » alors que "
                 "le fonds ne les contient pas : le lecteur tombera sur une fiche vide.")
        L.append("")
        for i in liens_morts[:40]:
            L.append(f"- IDCC {i} — {noms.get(i, '?')[:50]}")
        L.append("")

    if estim_perimee:
        bloquant = True
        L.append(f"## ⚠️ {len(estim_perimee)} estimation(s) non réancrée(s) après la revalorisation du SMIC")
        L.append("")
        L.append("Ces grilles ne viennent pas d'une branche mais de notre propre estimation, "
                 "calée sur un SMIC devenu obsolète. Contrairement aux grilles réelles, "
                 "celles-ci se corrigent sans attendre personne.")
        L.append("")
        for idcc, mini, st in sorted(estim_perimee, key=lambda x: x[1]):
            L.append(f"- **IDCC {idcc}** — {noms.get(int(idcc), '?')[:44]} : "
                     f"{mini} € (statut « {st} », SMIC actuel {smic} €)")
        L.append("")

    if sous_explique:
        L.append(f"## {len(sous_explique)} grille(s) sous le SMIC — écart documenté, pas une anomalie")
        L.append("")
        L.append("Traitement indiciaire complété par une indemnité différentielle : le montant "
                 "de base est légalement inférieur au SMIC, l'écart est comblé par ailleurs.")
        L.append("")
        for idcc, mini in sorted(sous_explique, key=lambda x: x[1]):
            L.append(f"- IDCC {idcc} — {noms.get(int(idcc), '?')[:44]} : {mini} €")
        L.append("")

    if anciennes:
        L.append(f"## {len(anciennes)} grille(s) non mises à jour depuis plus de {args.anciennete} mois")
        L.append("")
        for idcc, d, m in sorted(anciennes, key=lambda x: -x[2])[:25]:
            L.append(f"- IDCC {idcc} — {noms.get(int(idcc), '?')[:44]} : {d} ({m} mois)")
        L.append("")

    if placeholders:
        L.append(f"## {len(placeholders)} grille(s) encore en placeholder")
        L.append("")
        L.append("- " + ", ".join(f"IDCC {i}" for i in placeholders))
        L.append("")

    if hors_unite:
        L.append(f"## {len(hors_unite)} grille(s) exclue(s) du contrôle SMIC (unité non mensuelle)")
        L.append("")
        L.append("Montants trop faibles pour être des salaires mensuels : taux horaires ou "
                 "cachets journaliers. Signalés pour information, ce ne sont pas des anomalies.")
        L.append("")
        for idcc, mini in sorted(hors_unite, key=lambda x: x[1]):
            L.append(f"- IDCC {idcc} — {noms.get(int(idcc), '?')[:44]} : {mini} €")
        L.append("")

    if not (sous_smic or liens_morts or anciennes or placeholders or estim_perimee):
        L.append("Aucune anomalie détectée.")
        L.append("")

    rapport = "\n".join(L)
    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(rapport)
        print(f"Rapport écrit dans {args.out}")
    else:
        print(rapport)

    if args.strict and bloquant:
        print("\nAnomalie bloquante détectée (--strict).", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
