import fs from "node:fs";
import path from "node:path";
import { categories } from "../catalog/categories";
import { getAllSkills } from "../lib/skills";
import { absoluteUrl } from "../lib/site";

const root = process.cwd();
const output = path.join(root, "out");
const skills = getAllSkills();
const pages = [
  { route: "/", file: "index.html" },
  { route: "/skills/", file: "skills/index.html" },
  { route: "/install/", file: "install/index.html" },
  { route: "/methodology/", file: "methodology/index.html" },
  { route: "/privacy/", file: "privacy/index.html" },
  ...categories.map(({ slug }) => ({ route: `/categories/${slug}/`, file: `categories/${slug}/index.html` })),
  ...skills.map(({ slug }) => ({ route: `/skills/${slug}/`, file: `skills/${slug}/index.html` })),
];

if (!fs.existsSync(output)) throw new Error("Run npm run build before npm run check-seo.");

const errors: string[] = [];
const titles = new Set<string>();
const canonicals = new Set<string>();

function match(html: string, pattern: RegExp) {
  return html.match(pattern)?.[1]?.trim()
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

for (const page of pages) {
  const file = path.join(output, page.file);
  if (!fs.existsSync(file)) { errors.push(`${page.route}: missing exported HTML`); continue; }
  const html = fs.readFileSync(file, "utf8");
  const title = match(html, /<title>([^<]+)<\/title>/);
  const description = match(html, /<meta name="description" content="([^"]+)"/);
  const canonical = match(html, /<link rel="canonical" href="([^"]+)"/);
  const ogTitle = match(html, /<meta property="og:title" content="([^"]+)"/);
  const ogDescription = match(html, /<meta property="og:description" content="([^"]+)"/);
  const ogImage = match(html, /<meta property="og:image" content="([^"]+)"/);
  if (!title || title.length > 70) errors.push(`${page.route}: missing or overlong title`);
  if (!description || description.length < 70 || description.length > 160) errors.push(`${page.route}: description must be 70–160 characters`);
  if (canonical !== absoluteUrl(page.route)) errors.push(`${page.route}: incorrect canonical ${canonical ?? "missing"}`);
  if (!ogTitle || !ogDescription || !ogImage) errors.push(`${page.route}: incomplete Open Graph metadata`);
  if (title && titles.has(title)) errors.push(`${page.route}: duplicate title`);
  if (canonical && canonicals.has(canonical)) errors.push(`${page.route}: duplicate canonical`);
  if (title) titles.add(title);
  if (canonical) canonicals.add(canonical);
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)];
  if (!jsonLd.length) errors.push(`${page.route}: missing JSON-LD`);
  for (const block of jsonLd) {
    try { JSON.parse(block[1]); } catch { errors.push(`${page.route}: invalid JSON-LD`); }
  }
  if (/Good Work|G\/W/.test(html)) errors.push(`${page.route}: stale brand copy`);
  if (/SHA-?256|hash-bound|execution comparison|output (?:artifacts|artefacts)/i.test(html)) errors.push(`${page.route}: exposes internal review mechanics`);
}

const sitemap = fs.readFileSync(path.join(output, "sitemap.xml"), "utf8");
for (const page of pages) if (!sitemap.includes(`<loc>${absoluteUrl(page.route)}</loc>`)) errors.push(`${page.route}: missing from sitemap`);
if ((sitemap.match(/<loc>/g) ?? []).length !== pages.length) errors.push(`sitemap must contain exactly ${pages.length} page URLs`);

const robots = fs.readFileSync(path.join(output, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${absoluteUrl("/sitemap.xml")}`)) errors.push("robots.txt has the wrong sitemap URL");

const llms = fs.readFileSync(path.join(output, "llms.txt"), "utf8");
for (const skill of skills) if (!llms.includes(`[${skill.title}](${absoluteUrl(`/skills/${skill.slug}/`)})`)) errors.push(`${skill.slug}: missing from llms.txt`);

if (errors.length) {
  for (const error of errors) console.error(`✗ ${error}`);
  process.exit(1);
}

console.log(`✓ ${pages.length} canonical pages have unique metadata, valid JSON-LD, Open Graph data, and sitemap coverage.`);
console.log(`✓ robots.txt and llms.txt expose all ${skills.length} Everyday skills.`);
