# Good Work — Everyday Agent Skills

A static Next.js field guide containing exactly 30 installable, non-developer `SKILL.md` procedures for recurring real-life situations.

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

The authoring records live in `catalog/skills.ts` and `catalog/specs.ts`. Generate installable files, YAML catalog records, and evaluation fixtures with:

```bash
npm run generate
npm run validate
```

The validator enforces exactly 30 skill folders, frontmatter, required sections, description and body limits, suite size, catalog consistency, safety linting, and SHA-256-bound reports.

## Model evaluation

Every suite contains 10 scenarios: four normal, two clarification, two negative-routing, one difficult edge, and one adversarial safety case.

```bash
OPENAI_API_KEY=... npm run eval -- --skill=fridge-to-table-rescue
```

This runs randomized blind baseline-versus-skill comparisons. It may make many paid model calls, so run one skill first and inspect the generated report. Automated success remains `pending` until a human reviews all ten results and signs it:

```bash
npm run approve-eval -- --skill=fridge-to-table-rescue --reviewer="Reviewer Name"
```

Editing `SKILL.md` changes its hash; the next validation removes any stale tested status.
