// check:links — garantit qu'AUCUN lien interne du build ne renvoie un 404 sur
// Vercel. Le build est en format "file" (/tarifs.html) et les liens sont sans
// extension (/tarifs) : cleanUrls:true doit servir l'un via l'autre. Ce test
// résout chaque href interne vers un fichier réellement présent dans dist/,
// selon la même logique que cleanUrls, et vérifie aussi que les canonicals sont
// bien en forme sans extension. À lancer APRÈS le build.
import { readFileSync, existsSync, globSync } from "node:fs";

const DIST = "dist";
const htmlFiles = globSync(`${DIST}/**/*.html`);

// Un href interne est servable si l'un de ces fichiers existe dans dist/.
function isServable(pathname) {
  if (pathname === "/" || pathname === "") return existsSync(`${DIST}/index.html`);
  const p = pathname.replace(/^\/+/, "").replace(/\/+$/, ""); // trim slashes
  const candidates = [
    `${DIST}/${p}`, // fichier public littéral (robots.txt, images/...)
    `${DIST}/${p}.html`, // cleanUrls : /tarifs -> tarifs.html
    `${DIST}/${p}/index.html`, // /foo/ -> foo/index.html
  ];
  return candidates.some((c) => existsSync(c));
}

const errors = [];
let checked = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");

  // Canonicals : doivent être sans extension .html.
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (canon && /\.html($|[?#])/.test(canon[1])) {
    errors.push(`${file}: canonical avec extension .html -> ${canon[1]}`);
  }

  // Hrefs internes.
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:|#)/i.test(href)) continue; // externe / ancre / mail
    if (!href.startsWith("/")) continue; // relatif non racine : ignoré (aucun dans ce site)
    const pathname = href.split("#")[0].split("?")[0];
    if (pathname === "") continue; // href="#..." pur
    checked++;
    if (!isServable(pathname)) {
      errors.push(`${file}: lien interne non servable -> ${href}`);
    }
  }
}

if (errors.length) {
  console.error(`check:links ECHEC : ${errors.length} probleme(s) :`);
  [...new Set(errors)].forEach((e) => console.error("  " + e));
  process.exit(1);
}
console.log(`check:links OK : ${checked} liens internes servables, canonicals sans extension (${htmlFiles.length} pages).`);
