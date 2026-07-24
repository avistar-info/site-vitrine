# AUDIT-VIT.md : Audit de l'existant (site-vitrine)

> Lot VIT-0, produit le 24/07/2026. Repo `avistar-info/site-vitrine`, branche `lot-vit-0`.
> Objet : état des lieux du site statique actuel (ex-Avistars) avant refonte totale.
> Ce document ne modifie AUCUNE page de production : il constate. Les actions
> correctrices sont ordonnancées dans `PRD-VIT.md`.

## 0. Résumé exécutif

Le repo n'est pas vide : c'est un site statique HTML pur (aucun framework, aucun
build) de **29 URLs**, hérité de la marque **Avistars** et déployé sur
**GitHub Pages** via le domaine `avistars.fr` (fichier `CNAME`).

Trois constats majeurs conditionnent la refonte :

1. 🔴 **Non-conformité Google massive et structurelle.** Le discours central du
   site est du review gating explicite : « Filtrage intelligent », interception
   des clients « insatisfaits » avant Google, formulaire privé réservé aux
   mécontents. C'est exactement la pratique que Stela interdit. Présent sur les
   11 pages principales (accueil + 9 villes + 1 article), dans le contenu visible
   ET les métadonnées (title, og, JSON-LD).
2. 🔴 **Marque et infrastructure périmées.** Tout est en « Avistars » /
   `avistars.fr`, avec 4 liens de paiement Stripe Avistars, un tracking mort
   (Google Analytics `G-WK8JTW04WF`, webhooks n8n résiliés) et un email
   `contact@avistars.fr` répété 73 fois.
3. 🟠 **Claims irréalistes et invérifiables.** « +300 % d'avis 5★ en 30 jours »,
   « Garantie 30 jours », « 170+ restaurants clients » : à supprimer (règle 5 du
   lot, chiffres réels et sourcés uniquement).

La valeur SEO récupérable est réelle (slugs indexés, schema riche, images WebP,
sitemap propre) mais **le fond éditorial est à réécrire de zéro** pour cause de
conformité. La refonte est donc une reconstruction, pas un lifting.

---

## 1. Inventaire des URLs (29) et valeur SEO

Domaine actuel : `https://avistars.fr` (déclaré dans `CNAME`, `robots.txt`,
`sitemap.xml`, `manifest.json`, et les canonical de chaque page).

| # | URL (chemin) | Fichier | Intention / mot-clé | Valeur SEO | Sort proposé |
|---|---|---|---|---|---|
| 1 | `/` | `index.html` (193 Ko) | national « avis Google restaurant » | Forte (home) | Réécrire, garder l'URL |
| 2 | `/qui-sommes-nous` | `qui-sommes-nous.html` | marque / confiance | Moyenne | Réécrire |
| 3 | `/cgv` | `cgv/index.html` | légal | Faible | Refondre (Stela) |
| 4 | `/mentions-legales` | `mentions-legales/index.html` | légal | Faible | Refondre (Stela) |
| 5 | `/politique-confidentialite` | `politique-confidentialite/index.html` | légal / RGPD | Faible | Refondre (Stela) |
| 6-14 | `/restaurants-{ville}` | `restaurants-*.html` (~112 Ko ch.) | « avis Google restaurant {ville} » x9 (paris, nice, lyon, marseille, bordeaux, nantes, brest, rouen, nancy) | Forte (local) | Réécrire, garder les URL |
| 15 | `/blog/` | `blog/index.html` | hub blog | Moyenne | Refondre |
| 16-24 | `/blog/avis-google-restaurant-{ville}.html` | 9 articles ville | longue traîne locale x9 | Moyenne | Réécrire + décider `.html` vs slug propre |
| 25 | `/blog/comment-avoir-plus-avis-google-restaurant.html` | article | « comment avoir plus d'avis Google » | Forte (informationnel) | Réécrire (purger gating) |
| 26 | `/blog/repondre-avis-negatif-google-restaurant.html` | article | « répondre à un avis négatif » | Forte | Réécrire |
| 27 | `/blog/supprimer-mauvais-avis-google-restaurant.html` | article | « supprimer un mauvais avis » | Forte | Réécrire (🔴 contient « intercepter ») |
| 28 | `/blog/e-reputation-restaurant-guide-complet.html` | article pilier | « e-réputation restaurant » | Forte | Réécrire |
| 29 | `/blog/qr-code-avis-google-restaurant.html` | article | « QR code avis Google » | Forte | Réécrire |

Note d'URL : les articles de blog portent le suffixe `.html` (les autres pages
non). Incohérence à trancher au VIT-1 (uniformiser en slugs propres sans `.html`,
avec 301 des anciens `.html` → nouveaux slugs).

---

## 2. 🔴 CONFORMITÉ : discours V1 interdit à purger intégralement

Le cœur du problème. Le site vend explicitement du **review gating** (tri des
avis selon la satisfaction présumée), formellement contraire aux règles Google
et au principe fondateur de Stela (« JAMAIS de review gating », CLAUDE.md).

Occurrences relevées (grep sur `*.html`) :

| Motif interdit | Fichiers concernés | Occurrences (approx.) |
|---|---|---|
| `intercept*` (intercepte les insatisfaits) | index + 9 villes + `blog/supprimer-*` | ~24 (index), ~21 par page ville |
| `Filtrage intelligent` / `filtrage automatique` | index, articles | ~7 (index) |
| `insatisfait*` (canal privé réservé aux mécontents) | index + articles | ~12 (index) |
| `+300 %` d'avis 5★ | index + 9 villes | ~12 (index), ~8 par ville |
| `Garantie 30 jours` / « garantie remboursement » | index | ~9 |
| `170+ restaurants clients` (preuve sociale invérifiée) | toutes pages | omniprésent |

Extraits littéraux (preuves) :

- `og:description` : « Un QR code **intercepte vos clients insatisfaits** avant
  Google, guide... »
- Corps accueil : « **Filtrage intelligent** : clients satisfaits guidés vers
  Google et **intercepte les insatisfaits en privé**. Résultat : **+300 % d'avis
  5★** dès le 1er mois. »
- Section « éthique » (contradictoire) : « on n'efface rien. Le client
  insatisfait vous parle EN PRIVÉ. 100% éthique et RGPD ». Le site se
  revendique éthique tout en décrivant du gating : argumentaire à supprimer, pas
  à nuancer.

**Décision refonte** : suppression totale, remplacée par le positionnement Stela
(« collecte conforme : tous les clients sont invités à laisser un avis public,
aucun filtre sur la note ; la récupération se fait EN PLUS, jamais À LA PLACE »).
Aucune reprise, même reformulée, de la mécanique d'interception.

---

## 3. 🔴 OBSOLÈTE : Avistars, Stripe, tracking mort

| Élément | Détail constaté | Action refonte |
|---|---|---|
| Marque « Avistars » | `avistars` : 58 occ. dans `index.html`, 49 par page ville, présent dans les 29 pages | Rebrand total « Stela » |
| Domaine `avistars.fr` | `CNAME`, `robots.txt`, `sitemap.xml`, `manifest.json`, canonical, JSON-LD `url` | Canonique unique `https://www.mystela.fr` |
| Liens Stripe Avistars | 4 `https://buy.stripe.com/...9Zm0i / 9Zm0g / 9Zm0f / 9Zm0h` (Payment Links Avistars) | Supprimer (voir §6 : le paiement Stela se fait dans l'app, pas en Payment Link) |
| Google Analytics | `G-WK8JTW04WF` : ~50 occ. + `googletagmanager` (~25) + `gtag(` (~75) | Tracking mort à retirer, remplacer (voir PRD, proposition PostHog) |
| Webhooks n8n | `n8n` / `webhook` : ~14-15 occ. (formulaires branchés sur n8n résilié) | Retirer, reformulaires vers l'app / un endpoint vivant |
| Email `contact@avistars.fr` | 73 occ. | `contact@mystela.fr` |
| `manifest.json` | `name: "AviStars"`, `description: "...+300% d'avis 5★ en 30 jours"`, icônes `avistars.fr/images/logo-*` | Réécrire Stela |
| `README.md` | « site-vitrine » (vide) | Documenter (build, deploy, charte) |

---

## 4. À PRÉSERVER (ne pas casser)

| Actif | Pourquoi | Consigne |
|---|---|---|
| `google038f47dee570e8dc.html` | Vérification Google Search Console | **NE JAMAIS SUPPRIMER.** Reporter le fichier tel quel dans le nouveau build (ou re-vérifier la propriété `www.mystela.fr` avant migration). |
| Slugs indexés (villes, articles) | Capital SEO acquis | Conserver les chemins OU 301 systématique vers le nouveau chemin. Zéro URL orpheline. |
| Schema.org existant | Chaque page a déjà du JSON-LD riche (Organization, FAQ, Article) | Réutiliser la structure, corriger le fond (dé-gater, re-brander, prix réels). |
| Images WebP | `images/` (35 fichiers), déjà optimisées | Réutiliser celles encore valables, purger les logos Avistars. |
| `sitemap.xml` propre | Structure hreflang + priorités correcte | Régénérer sur `www.mystela.fr` (voir §7 : hreflang `en` bidon à retirer). |
| Pages légales | Base CGV / mentions / confidentialité | Réutiliser la trame, remplacer entité juridique + marque + email. |

---

## 5. 🟠 Dette technique et SEO à corriger

- **hreflang bidon** : `sitemap.xml` déclare `hreflang="en"` pointant vers l'URL
  française identique. Faux signal international, à retirer (site FR only).
- **Poids des pages** : `index.html` = 193 Ko, pages villes ~112 Ko chacune, tout
  en HTML inline (CSS + JSON-LD + contenu). Beaucoup de duplication inter-villes
  (les 9 pages sont quasi identiques). La refonte par templates (framework)
  supprime cette dette.
- **Aucun build / aucun lint** : pas de garde-fou (ni conformité, ni marque, ni
  cadratin). La refonte doit introduire un `lint:copy` (0 cadratin) et un grep de
  contrôle « Stella »/« Avistars »/`avistars.fr` = 0 en surface (cf. PRD gates).
- **Duplication de contenu ville** : risque de cannibalisation / thin content si
  les 9 pages restent des clones. À différencier réellement (données locales) ou
  à consolider.

---

## 6. Source de vérité PRIX et PAIEMENT (vérifiée dans stella-app)

Vérifié dans le repo `stella-app` (règle : le site reprend les prix et le
parcours de paiement RÉELS de l'app, jamais les anciens liens Avistars) :

- **Offres** (CLAUDE.md stella-app) : **Étoile 49 €/mois**, **Constellation
  89 €/mois**. Annuel = 2 mois offerts (≈ 490 € / 890 € par an).
- **Mécanique de paiement** (`lib/stripe/plans.ts`) : l'app utilise des **Price
  IDs Stripe** (`STRIPE_PRICE_ETOILE_MONTHLY`, `..._YEARLY`,
  `..._CONSTELLATION_*`, en variables d'env) via **Stripe Checkout**, déclenché
  APRÈS inscription dans l'app. **Il n'existe pas de Payment Link statique** à
  coller sur la vitrine.
- **Conséquence pour la vitrine** : les 4 liens `buy.stripe.com` actuels sont des
  vestiges Avistars morts. Le CTA unique doit être **« Essayer gratuitement »
  → inscription sur `app.mystela.fr`** (self-serve : l'utilisateur crée son
  compte, choisit son offre et paie dans l'app). Les prix sont AFFICHÉS en
  transparence sur la vitrine (différenciateur vs Dokaa), mais l'acte d'achat
  vit dans l'app.

🚦 **Point à confirmer avant VIT-2** (le lot exige STOP-and-ask sur tout doute de
prix/lien) :
1. URL exacte du CTA d'inscription (proposé : `https://app.mystela.fr`).
2. Confirmer qu'aucun Payment Link direct n'est souhaité sur la vitrine (parcours
   100 % via l'app). Voir aussi les supports physiques (chevalet/flyers, grille
   `lib/support/pricing.ts`) : les afficher sur la vitrine ou pas ?

---

## 7. Charte de marque (source : stella-app `docs/design/stela/`)

Cohérence vitrine ↔ app obligatoire.

- **Logo** : encre `#15233F` + étoile **laiton `#B08A3E`** (valeur du glyphe
  canonique `glyphe-laiton.svg` et `logo-horizontal.svg`). Jamais de version
  monochrome.
- **Couleurs charte (lot)** : bleu encre `#15233F`, or mat `#C8992E`, crème
  `#F7F4EF`. 🟠 Léger écart à trancher : l'étoile des SVG est `#B08A3E`, l'« or
  mat » charte est `#C8992E`. Proposer de figer `#B08A3E` = étoile/logo, `#C8992E`
  = accent or secondaire, et documenter dans la charte.
- **Typo** : Plus Jakarta Sans (identique à l'app).
- **Assets disponibles** : `glyphe.svg`, `glyphe-laiton.svg`, `logo-horizontal.svg`,
  `logo-monogramme.svg`, previews PNG (favicons, app-icons, logos, icônes
  d'intégration Google/Square/TheFork/Tripadvisor). Réutilisables tels quels.

---

## 8. `avistars.fr` (GitHub Pages) vit encore

Le `CNAME` du repo = `avistars.fr`, servi par GitHub Pages. La refonte migre le
contenu vers `www.mystela.fr` ; `avistars.fr` doit alors **301 → www.mystela.fr**
(redirection permanente, page à page si possible) + **Change of Address** dans
Search Console. GitHub Pages ne fait pas de 301 natif : prévoir une redirection
au niveau DNS/registrar ou proxy (Cloudflare), détaillée au PRD (VIT-4).

---

## 9. Ce dont dépend la refonte (entrées à valider)

1. Confirmer l'hébergement cible et le domaine canonique `www.mystela.fr` (le lot
   l'affirme ; l'existant est encore techniquement sur `avistars.fr`).
2. Confirmer le CTA d'inscription (`app.mystela.fr`) et l'absence de Payment Link.
3. Trancher : afficher ou non les supports physiques + l'offre annuelle.
4. Choix de tracking (proposition PostHog, cf. PRD VIT-1).
5. Valider le framework recommandé (Astro, cf. PRD VIT-1).
