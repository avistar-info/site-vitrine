# CHARTE.md : charte de marque Stela (site vitrine)

> Source de référence : `stella-app/docs/design/stela/`. Cohérence vitrine ↔ app
> obligatoire. Tokens implémentés dans `src/config/site.ts` (COLORS) et
> `src/styles/global.css` (variables CSS).

## Marque
- Nom public : **Stela** (UN SEUL L), partout. Le nom à deux L est un codename
  interne, interdit en surface (contrôlé par `scripts/check-brand.mjs`).
- Baseline : « Vos avis, vos étoiles. »
- Positionnement : « Le moteur de croissance Google clé-en-main et 100 % conforme
  des commerces locaux. »

## Couleurs (décision VIT-0 n°7, figée)
| Rôle | Hex | Usage |
|---|---|---|
| Bleu encre | `#15233F` | Texte principal, logo, fonds sombres |
| Bleu encre profond | `#1D3158` | Variante |
| **Laiton (étoile / logo)** | **`#B08A3E`** | **Étoile du logo. INTOUCHABLE.** |
| Or (accent secondaire) | `#C8992E` | Accents décoratifs, focus, liserés |
| Crème | `#F7F4EF` | Fond de page |
| Surface | `#FFFFFF` | Cartes |
| Bordure | `#ECE6DC` | Séparateurs |

Règle : l'étoile du logo utilise **toujours** `#B08A3E` (valeur des SVG
canoniques `glyphe-laiton.svg` et `logo-horizontal.svg`). `#C8992E` est un accent
or secondaire, jamais utilisé pour l'étoile. **Aucune version monochrome du
logo.**

## Typographie
- Plus Jakarta Sans (self-hosted via `@fontsource`, aucune requête externe).
- Titres : 700-800, `letter-spacing: -.02em`. Corps : 400, `line-height: 1.6`.

## Assets
- `public/images/glyphe-laiton.svg` : glyphe étoile laiton.
- `public/images/logo-stela.svg` : logo horizontal (étoile + mot-marque).
- `public/images/logo-monogramme-512.png` : icône (manifest, réseaux).
- `public/favicon.ico`.
- Composant `src/components/Logo.astro` : rend le glyphe + mot-marque.

## Ton rédactionnel
- Phrases complètes en français correct, jamais de style télégraphique.
- **Jamais de tiret cadratin** (contrôlé par `scripts/check-copy.mjs`). Utiliser
  deux-points, virgule, parenthèses ou barre verticale dans les titres.
- Chiffres réels et sourcés uniquement. Aucun claim de volume irréaliste.
- Conformité assumée comme différenciant, jamais comme excuse.
