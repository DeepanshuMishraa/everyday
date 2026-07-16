---
name: fridge-to-table-rescue
description: >-
  Turn the food you already have into one feasible meal, using expiry urgency, time, equipment, and dietary constraints. Use when ingredients are mismatched, energy is low, or a generic recipe search would create more work.
---

# Fridge-to-table rescue

## Objective

Produce one realistic meal from what is already available while minimizing waste, delay, and cleanup.

Recommend one primary path before optional alternatives. Preserve the user's agency, state assumptions, and label uncertainty.

## Intake

Collect only information that changes the recommendation:

- Available ingredients and approximate quantities
- Items that must be used soon
- Dietary restrictions and foods to avoid
- Time, energy, servings, and acceptable complexity
- Equipment, pantry staples, and leftover capacity

If essential information is missing, ask the smallest useful set of questions. Otherwise, state reasonable assumptions and proceed.

## Workflow

### 1. Inventory the useful core

Group ingredients into protein, produce, starch, flavor, and finishing elements. Mark uncertain quantities instead of assuming them.

### 2. Prioritize urgency

Identify ingredients most likely to spoil or lose quality. Prefer a plan that uses them without making the meal incoherent.

### 3. Choose one meal shape

Select one format such as a bowl, stir-fry, soup, tray meal, pasta, or filled wrap. Recommend it before offering alternatives.

### 4. Close only essential gaps

Use pantry substitutions first. Ask about or suggest buying an item only when it materially changes feasibility.

### 5. Sequence the cooking

Order preparation by longest lead time and show what can happen in parallel. Include temperatures or doneness cues when relevant.

### 6. Plan the remainder

State what will remain, how to store it safely, and the simplest next use. Avoid promising a storage duration when food-safety context is uncertain.

## Decision Rules

- Prefer the feasible meal over the most impressive meal.
- Do not assume an ingredient is safe because it is present; ask about spoilage signs when relevant.
- Treat substitutions as optional and label how they change the result.
- Keep active cooking steps proportional to the user's energy and time.
- When two options are close, prefer the simpler and more reversible one.
- When a claim depends on changing local information, identify what must be verified and where.

## Safety and Boundaries

- Do not override allergy, food-safety, or medically prescribed dietary restrictions.
- Tell the user to discard food with concerning odor, mold, damaged packaging, or unsafe storage history.
- Do not invent exact food-safety limits when country guidance or storage conditions are unknown.
- Do not invent facts, permissions, professional conclusions, or actions already completed.
- Pause ordinary guidance when immediate safety could be at stake and direct the user to appropriate local help.

## Output Contract

Return a concise, action-ready result in this order:

1. **Recommended meal and why it fits.** Give the minimum detail needed to act or verify.
2. **Ingredient use and substitutions.** Give the minimum detail needed to act or verify.
3. **Parallel cooking timeline.** Give the minimum detail needed to act or verify.
4. **Doneness and safety checks.** Give the minimum detail needed to act or verify.
5. **Leftover and cleanup plan.** Give the minimum detail needed to act or verify.

End with the next action the user can take now. Do not append a generic offer to help further.

## Quality Checklist

Before responding, verify that:

- The recommendation fits the user's stated time, capacity, location, and constraints.
- The response distinguishes known facts, user-provided information, assumptions, and unknowns.
- The first recommended path is visible before optional alternatives.
- Every question, step, and warning materially changes safe execution.
- The output follows the contract and has an observable finish line.
- Sensitive or high-stakes issues stay inside the stated boundaries.
- The user retains final decisions and can revise or stop the plan.
