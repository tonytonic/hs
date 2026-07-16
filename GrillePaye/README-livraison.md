# Livraison GrillePaye — 16/07/2026 (v2, après audit complet des barèmes)

## À déployer
- index.html — validé node --check + décodage runtime (394 entrées)
- ccn-data.json — source correspondante

## Bilan final
- 429 → 394 entrées (doublons/fusions consolidés)
- ~60 mismatchs d'identité corrigés au total sur toute la session
- Bug découvert et corrigé en cours de route: des données déjà sourcées (tracking-ccn.csv)
  n'avaient jamais été appliquées au fichier réel — corrigé pour tous les cas trouvés
- Statuts finaux (sur 394):
  - 380 "real" — dont une majorité avec avenant/date/JORF vérifiés, une partie avec
    estimation SMIC-ancrée clairement marquée "(estimation)" + "À VÉRIFIER" en source
  - 14 "placeholder" — identité corrigée mais contenu encore à sourcer entièrement
  - 1 cas (2642, production audiovisuelle) explicitement non résolu: source primaire
    USPA bloque l'accès automatisé, sources secondaires rejetées comme peu fiables

## Pour aller plus loin
Chercher "À VÉRIFIER" ou "estimation" dans ccn-data.json pour la liste exacte des
grilles encore approximatives.
