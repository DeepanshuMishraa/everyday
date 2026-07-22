---
name: plan-weeknight-meals
description: Plan several weeknight dinners around the user's real calendar, dietary needs, budget, cooking capacity, leftovers, and grocery access. Use when the user wants a weekly meal plan, coordinated prep, ingredient reuse, or one consolidated shopping list rather than a single recipe.
---

# Plan Weeknight Meals

## Interaction

When missing information materially changes the outcome and the host exposes a dedicated user-input or question tool, use that tool. Ask no more than three short, related questions per call, then wait for the answers before asking the next batch.

Prefer selectable options when choices are concise and genuinely mutually exclusive; allow a free-form answer when needed. Do not present a long questionnaire in normal chat. If no native input tool is available, ask one concise blocking question at a time. For non-blocking gaps, state the assumption and continue.

Design a **meal system**, not seven isolated recipes. The system succeeds when the hardest evening has the easiest credible dinner and ingredients are reused without making every meal taste the same.

## Map the week

Collect the people eating, nights to cover, dietary constraints, calendar pressure, cooking equipment, budget, food already available, and tolerance for leftovers.

Before naming ingredients or meals, explicitly confirm whether anyone eating has an allergy, a medically required diet, or a cross-contamination concern when the user has not already said. Treat confirmed restrictions as hard constraints. Never infer that a missing answer means there are no restrictions; if confirmation is unavailable, provide only the planning structure and label ingredient choices as pending.

Label each night:

- **Cook** — enough time and energy for active cooking
- **Assemble** — components can be combined with little work
- **Reheat** — a planned leftover fits
- **Fallback** — uncertainty makes a durable backup wiser

**Done when:** every night has an honest capacity label.

## Choose anchor meals

Pick two or three meals that create reusable components—roasted vegetables, cooked grains, sauce, beans, seasoned protein—then vary their form and finish. Do not buy an ingredient for one decorative use.

Place the highest-effort meal before the components it supplies. Put the easiest meal on the most constrained night.

**Done when:** each dinner fits its night and reused ingredients have a named second use.

## Schedule the work

Move thawing, washing, chopping, marinating, and batch cooking to the earliest sensible window. Keep prep bounded; a plan that consumes the user's only free afternoon has failed.

Use [WEEK-PLAN-FORMAT.md](WEEK-PLAN-FORMAT.md) for the final schedule. Use [GROCERY-LIST-FORMAT.md](GROCERY-LIST-FORMAT.md) when consolidating quantities.

## Add resilience

Include one fallback meal that is affordable, shelf-stable or frozen, and acceptable to the household. Name which planned meal can slide to another night without waste.

Return the week plan first, then prep, groceries, and the fallback. Flag any food-safety or dietary assumption that needs confirmation.

Do not diagnose reactions or provide medical treatment advice. If the user describes a possible serious reaction, stop meal planning and direct them to urgent local medical help.
