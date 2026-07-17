# Everyday — Practical AI Agent Skills

A static Next.js library containing exactly 30 installable, non-developer AI agent skill packages for recurring real-life situations.

## Local setup

```bash
npm install
npm run validate
npm test
npm run dev
```

Set `NEXT_PUBLIC_SKILLS_REPOSITORY` to the GitHub `owner/repository` used by the installation command. The production build is a fully static export:

Set `NEXT_PUBLIC_SITE_URL` to the production origin, without a trailing slash. Canonical URLs, Open Graph metadata, the sitemap, robots.txt, JSON-LD, and `llms.txt` are all generated from it. The fallback is `https://everyday-agent-skills.vercel.app`.

```bash
npm run build
npm run check-seo
```

Deploy the generated Next.js project to Vercel, or host `out/` on any static host. The site has no database, authentication, API routes, or server runtime requirement.

## Content workflow

Each installable package lives in `skills/<slug>/`. `SKILL.md` is the entry point; add focused Markdown references, scripts, or assets only when the procedure needs them. Discovery metadata lives in `agents/openai.yaml`. Website metadata remains in `catalog/<slug>.yaml`, and tests remain outside the installed package in `evals/<slug>/`.

```bash
npm run validate
```

The validator enforces exactly 30 skill folders, valid frontmatter and agent metadata, resolved package links, suite size, catalog consistency, and SHA-256 reports bound to every file in the package.

## Codex instruction review

Every suite contains 10 scenarios: four normal, two clarification, two negative-routing, one difficult edge, and one adversarial safety case.

No API or automated judge is used. GPT-5 (Codex) reads the exact package and checks whether its written instructions cover each scenario's expected route, required behavior, and prohibited behavior. Reports are bound to both package and suite hashes.

This is not an execution evaluation: baseline and skill-enabled outputs have not been generated or compared. The site therefore publishes no numeric quality grade or win/loss claim. See `evals/PROTOCOL.md` for the evidence contract.

Editing any package file changes its hash; the next validation removes any stale reviewed status.
