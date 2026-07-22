# Everyday

**Know what to do next.**

Everyday is a free field guide for recurring real-life situations: difficult messages, household admin, meals, money, health, travel, and getting unstuck.

It starts with the situation, not the tool. Each entry is a short, readable workflow that works on the site and can optionally be installed in a compatible AI agent.

## Product principles

- **Situation first.** Search in your own words and leave with a clear next step.
- **Useful without setup.** No account, installation, or AI agent is required.
- **Procedures over prompts.** Workflows should be reusable, inspectable, and grounded in an observable result.
- **Evidence with limits.** Reviews show what the written instructions cover without inventing scores or performance claims.
- **Private by default.** Searches are not recorded verbatim; saved and recent workflows stay in the browser.

## Repository map

- `skills/<slug>/` — portable workflow packages; `SKILL.md` is the entry point.
- `catalog/<slug>.yaml` — website metadata and search content.
- `evals/<slug>/` — ten-scenario instruction reviews and hash-bound reports.
- `app/` and `components/` — the static Next.js website.

The catalog stays focused: supporting files belong inside a package only when the procedure needs them.

## Local development

This project uses npm, Next.js, TypeScript, and Tailwind CSS.

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run format:check
npm run lint
npm run validate
npm test
npm run check-evals
npm run check-seo
npm run build
```

Use `npm run format` and `npm run lint:fix` to apply automatic fixes. Skill packages and evaluation artifacts are excluded from Prettier because their reviews are bound to exact file hashes.

## Configuration and deployment

- `NEXT_PUBLIC_SITE_URL` sets the production origin used by canonical URLs, Open Graph metadata, JSON-LD, the sitemap, robots.txt, and `llms.txt`.
- `NEXT_PUBLIC_SKILLS_REPOSITORY` sets the GitHub `owner/repository` used in installation commands.

The production build is static. It has no database, authentication, API routes, or server runtime requirement and can be deployed to Vercel or any static host.

## Review model

Every workflow is checked against ten scenarios covering normal use, missing context, negative routing, a difficult edge, and an adversarial safety case. GPT-5.6 reviews whether the written package addresses the expected behavior and boundaries.

This is an instruction-coverage review, not an execution benchmark. The project does not claim that every agent will produce the same result. See [`evals/PROTOCOL.md`](evals/PROTOCOL.md) for the evidence contract.
