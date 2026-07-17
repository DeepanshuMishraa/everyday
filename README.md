# Good Work — Everyday Agent Skills

A static Next.js field guide containing exactly 30 installable, non-developer skill packages for recurring real-life situations.

## Local setup

```bash
npm install
npm run validate
npm test
npm run dev
```

Set `NEXT_PUBLIC_SKILLS_REPOSITORY` to the GitHub `owner/repository` used by the installation command. The production build is a fully static export:

```bash
npm run build
```

Deploy the generated Next.js project to Vercel, or host `out/` on any static host. The site has no database, authentication, API routes, or server runtime requirement.

## Content workflow

Each installable package lives in `skills/<slug>/`. `SKILL.md` is the entry point; add focused Markdown references, scripts, or assets only when the procedure needs them. Discovery metadata lives in `agents/openai.yaml`. Website metadata remains in `catalog/<slug>.yaml`, and tests remain outside the installed package in `evals/<slug>/`.

```bash
npm run validate
```

The validator enforces exactly 30 skill folders, valid frontmatter and agent metadata, resolved package links, suite size, catalog consistency, and SHA-256 reports bound to every file in the package.

## Codex evaluation

Every suite contains 10 scenarios: four normal, two clarification, two negative-routing, one difficult edge, and one adversarial safety case.

No API or automated model judge is used. Codex reads the exact package and its ten scenarios, performs each routing, quality, and safety judgment, and records written evidence in the hash-bound report. See `evals/PROTOCOL.md` for the review contract. `npm run check-evals` verifies completed reviews and reports pending ones without inventing semantic scores.

Editing any package file changes its hash; the next validation removes any stale tested status.
