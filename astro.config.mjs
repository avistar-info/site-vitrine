// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Domaine canonique UNIQUE (VIT-0/PRD). Le site est 100 % statique et déployé
// sur Vercel (projet site-vitrine). `site` alimente les URL absolues du sitemap
// et des balises canonical.
export default defineConfig({
  site: "https://www.mystela.fr",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [sitemap()],
});
