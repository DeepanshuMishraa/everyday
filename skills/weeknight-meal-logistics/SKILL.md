---
name: weeknight-meal-logistics
description: >-
  Build a realistic weekly meal system around the calendar, dietary needs, preparation time, and ingredient reuse. Use when the difficulty is coordinating several dinners and one grocery trip—not inventing a single recipe.
---

# Weeknight meal logistics

## Objective

Create a weeknight meal system that fits the actual calendar, reuses ingredients, and lowers daily decision load.

Recommend one primary path before optional alternatives. Preserve the user's agency, state assumptions, and label uncertainty.

## Intake

Collect only information that changes the recommendation:

- People, servings, dietary constraints, and strong dislikes
- Nights to cover and the schedule on each night
- Cooking capacity, energy, equipment, and budget
- Ingredients already available or needing use
- Shopping access, leftovers preference, and prep window

If essential information is missing, ask the smallest useful set of questions. Otherwise, state reasonable assumptions and proceed.

## Workflow

### 1. Map the week

Label each night by available time and energy. Place the easiest or prepped meal on the hardest night.

### 2. Choose anchor meals

Select a small number of distinct meals that share flexible components. Avoid superficial variety that requires many single-use ingredients.

### 3. Assign intentional leftovers

Decide where a cooked component becomes a later lunch or dinner. Check safe storage and reheating requirements.

### 4. Schedule preparation

Move washing, chopping, thawing, marinating, or batch cooking to the earliest sensible window. Do not create an exhausting prep day.

### 5. Consolidate shopping

Combine duplicates, subtract known pantry stock, and group the list by store section. Mark quantities that require confirmation.

### 6. Add a failure meal

Include one shelf-stable, frozen, or minimal-effort fallback that respects dietary needs and budget.

## Decision Rules

- Plan to the busiest night, not the ideal week.
- Reuse ingredients while varying texture or format.
- Do not assign leftovers unless the user accepts them.
- Keep at least one meal flexible when the calendar is uncertain.
- When two options are close, prefer the simpler and more reversible one.
- When a claim depends on changing local information, identify what must be verified and where.

## Safety and Boundaries

- Do not design around allergens or medical diets without explicit user constraints.
- Do not present nutrition estimates as medical advice.
- Flag safe cooling, storage, and reheating considerations without inventing local guidance.
- Do not invent facts, permissions, professional conclusions, or actions already completed.
- Pause ordinary guidance when immediate safety could be at stake and direct the user to appropriate local help.

## Output Contract

Return a concise, action-ready result in this order:

1. **Night-by-night plan.** Give the minimum detail needed to act or verify.
2. **Preparation schedule.** Give the minimum detail needed to act or verify.
3. **Ingredient reuse map.** Give the minimum detail needed to act or verify.
4. **Consolidated grocery list.** Give the minimum detail needed to act or verify.
5. **Fallback and leftover plan.** Give the minimum detail needed to act or verify.

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
