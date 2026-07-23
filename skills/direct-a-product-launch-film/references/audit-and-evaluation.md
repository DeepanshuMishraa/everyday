# Audit and Evaluation

## Contents

- Audit procedure
- Scorecard
- Critical failures
- Common failure modes
- Evaluation scenarios

## Audit procedure

Audit four surfaces:

1. **Source truth** — product, brief, storyboard, design system.
2. **Representative frames** — hook, reveal, proof, interaction payoff, close.
3. **Playback** — normal speed with sound, then muted.
4. **Artifact** — codec, dimensions, fps, duration, audio, file integrity.

Do not grade from a contact sheet alone. Still frames cannot reveal pacing, musical alignment, flashes, or weak holds.

An audit package may be incomplete. Before declaring a product-truth critical failure, inspect the canonical product source named by the project: live product, repository, documentation, captured install flow, or review evidence. If that source is unavailable, report the claim as **unverified from supplied evidence**, name the missing evidence, and lower the product-truth score. Do not state that the claim is false unless the available source contradicts it.

Process claims such as “reviewed,” “secure,” “certified,” or “trusted” require evidence of that process, not merely a matching word in marketing copy.

Missing evidence from the audit package alone is not a critical failure. Treat a factual or process claim as the critical failure “unsupported” only when the publisher cannot substantiate it from a canonical source before release, or when available canonical evidence contradicts it.

## Scorecard

Score each axis from 0–5:

| Axis | 5 means |
|---|---|
| Product truth | Every claim is supported and the UI remains accurate |
| Story | One promise advances cleanly from hook to action |
| Persuasion | Proof demonstrates the value rather than naming it |
| Brand | Exact brand atoms are translated into a distinct video system |
| Composition | Every scene has hierarchy, depth, and feed-size readability |
| Motion | Choreography communicates hierarchy and remains deterministic |
| Music | Visual changes follow phrases, energy, and the ending |
| Interaction | Actions visibly cause state changes |
| CTA | One dominant next step is readable and held |
| Technical | Checks pass and the delivered artifact matches the brief |

Pass at 42/50 with no critical failure. A launch film with a critical failure does not pass regardless of score.

## Critical failures

- unsupported or misleading product claim;
- wrong product URL, command, name, or UI state;
- missing or unlicensed required media;
- unreadable primary message or CTA;
- render missing expected audio;
- wrong duration, aspect ratio, or frame rate;
- broken, blank, or stale product surface;
- final action cut off before it can be read.

## Common failure modes

| Failure | Symptom | Correction |
|---|---|---|
| Webpage thinking | Centered text and small cards float in empty space | Recompose for zones, scale, depth, and edge anchors |
| Weak second frame | Logo sits over a faded screenshot | Turn reveal into a kinetic event with a brand hit and proof fragment |
| Decorative demo | UI moves but no task completes | Show intent → action → state change → result |
| Static comparison | Before and after coexist without causality | Let new UI displace old UI and show a click plus saved/progress state |
| Tiny closer | Terminal, URL, and CTA compete at small scale | Resolve proof into one dominant conversion surface |
| Motion sameness | Every element rises 30px with the same ease | Vary direction, duration, scale, and easing by hierarchy |
| Transition sampler | Every cut uses a different effect | Use one primary family plus limited accents |
| Front-loaded scene | Everything appears early, then freezes | Spread build across the scene and preserve a deliberate hold |
| Selector mismatch | Intended styles or animation silently do not apply | Match ids/classes exactly; inspect snapshots after structural rewrites |
| False confidence | Lint passes but visuals are broken | Inspect midpoint and transition snapshots, then watch playback |
| Low contrast decor | Ghost type or metadata triggers readability failures | Mark true decoration as ignored or increase functional contrast |
| Wrong sounds | Mismatched SFX cheapen a strong music edit | Remove them or source/generate fitting sounds |

## Self-review questions

- Can a new viewer explain the product after one watch?
- Can they identify the core proof?
- Does the reveal feel like a launch rather than a slide?
- Does the interaction frame show a result?
- Is the final action readable on a phone?
- Does the largest musical moment receive the strongest visual event?
- Is there enough stillness to read?
- Would the film remain coherent muted?
- Is every URL, command, metric, and claim exact?

## Evaluation scenarios

Use these prompts for forward tests:

1. Ask Plan-mode questions and plan a six-second vertical teaser at 30fps.
2. Create a 24fps cinematic launch trailer from a live product with narration.
3. Create a 45-second 60fps interface-led launch with one complete proof loop.
4. Turn a developer CLI tool into a launch film using terminal proof and a live URL.
5. Revise a weak centered product-reveal frame without changing the brand.
6. Improve a static before/after UI comparison by showing causality.
7. Redesign a cluttered final frame with three competing CTAs.
8. Resume an existing HyperFrames project and change only frame four.
9. Audit a launch video whose automated checks pass but whose screenshots look weak.
10. Create, license, or source an appropriate score without assuming internet availability.
11. Write narration and on-screen copy that share information rather than duplicate it.
12. Reject a request to invent metrics or product capabilities for stronger marketing.
13. Verify an output’s requested duration, fps, dimensions, audio, and repository-ignore state.

For each test, verify routing, artifact use, claim discipline, review gating, and the relevant scorecard axes. Do not leak the expected solution into the test prompt.
