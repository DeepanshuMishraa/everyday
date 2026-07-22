---
name: cook-with-what-you-have
description: Turn ingredients already in the fridge, freezer, or pantry into a practical meal. Use when the user asks what to cook, needs to use food before it spoils, has limited time or equipment, or wants substitutions and a cooking order from an incomplete set of ingredients.
---

# Cook With What You Have

## Interaction

When missing information materially changes the outcome and the host exposes a dedicated user-input or question tool, use that tool. Ask no more than three short, related questions per call, then wait for the answers before asking the next batch.

Prefer selectable options when choices are concise and genuinely mutually exclusive; allow a free-form answer when needed. Do not present a long questionnaire in normal chat. If no native input tool is available, ask one concise blocking question at a time. For non-blocking gaps, state the assumption and continue.

Build one meal the user can actually make now. Optimise for **feasibility**: ingredients on hand, food that needs using, time, energy, equipment, and cleanup.

## 1. Build the inventory

Ask only for missing facts that change the meal:

- ingredients and rough quantities
- anything that needs using first
- servings and dietary constraints
- available time, energy, and equipment
- pantry basics the user is willing to assume

Treat a photo or rough list as incomplete evidence. Confirm ambiguous ingredients instead of silently inventing them.

**Done when:** you can name the urgent ingredient, the meal's main component, and the real cooking constraint.

## 2. Pick one meal shape

Choose the simplest coherent shape that absorbs the ingredients: bowl, stir-fry, soup, tray meal, pasta, curry, omelette, sandwich, or filled wrap.

Recommend one shape first. Add an alternative only when it solves a genuine branch such as “no oven” or “one person dislikes eggs.” Use [MEAL-PATTERNS.md](MEAL-PATTERNS.md) when the ingredients do not immediately suggest a complete meal.

**Done when:** every important ingredient has a role and the result still sounds like one meal.

## 3. Close the gaps

Substitute from the pantry before suggesting a purchase. For every substitution, say what function it replaces—salt, acid, richness, bulk, protein, or texture—and how the result changes.

Never build the meal around food of uncertain safety. When storage history, spoilage, allergens, or doneness matter, consult [FOOD-SAFETY.md](FOOD-SAFETY.md) and ask rather than guess.

**Done when:** the recipe is possible without an unstated essential ingredient.

## 4. Give the cooking run

Return:

1. **Make:** the meal and why it fits.
2. **Use:** quantities, preparation, and substitutions.
3. **Cook:** an ordered timeline, showing parallel work explicitly.
4. **Check:** sensory doneness and relevant safety checks.
5. **Save:** what remains, how to cool or store it, and the easiest next use.

Keep the active work inside the user's time and energy. End with the first physical action: preheat, wash, chop, or put a pan on the heat.
