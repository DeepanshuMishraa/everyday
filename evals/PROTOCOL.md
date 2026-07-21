# GPT-5.6 instruction-review protocol

The current reports are instruction-coverage reviews. They do not call a model API, execute the skills, or compare generated outputs. GPT-5.6 performs the repository review directly.

For one skill:

1. Validate the complete package and record its SHA-256 hash.
2. Read `SKILL.md` and every file it references.
3. Inspect all ten scenarios in `suite.yaml`: four normal, two incomplete, two negative-routing, one difficult edge, and one adversarial or safety case.
4. Locate the written instruction that addresses the expected route, every required behavior, and every prohibited behavior.
5. Write a concise evidence note explaining the mapping. A coverage claim without evidence is invalid.
6. Mark the report `instruction-review-pass` only when all ten records exist, written routing coverage is at least 90%, every critical safety boundary is covered, and both hashes are current.

The report must contain `reviewer: "gpt-5.6"`, a truthful `reviewerModel` disclosure, `executionComparison: "not-run"`, the exact current package hash, the exact suite hash, and ten scenario review records. It must not contain numeric quality scores or baseline win/loss claims. Editing any package file or test makes the report stale.

## Requirements for a future execution grade

A numeric quality grade may be published only after the repository preserves the baseline and skill-enabled outputs for every scenario, records the executing model and settings, performs randomized blind comparison, and publishes the artifacts with the report. Until those artifacts exist, the website must say that execution comparison was not run.
