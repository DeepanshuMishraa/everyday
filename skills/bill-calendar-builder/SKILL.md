---
name: bill-calendar-builder
description: >-
  Convert income dates, recurring bills, variable essentials, and due dates into a monthly payment calendar with cash-flow pressure points and reminders. Use for organization only; never recommend borrowing, investing, or moving money without the user's decision.
---

# Bill calendar builder

## Objective

Make recurring payment timing visible and identify cash-flow pressure without giving financial advice.

Recommend one primary path before optional alternatives. Preserve the user's agency, state assumptions, and label uncertainty.

## Intake

Collect only information that changes the recommendation:

- Country and preferred currency
- Income dates and conservative take-home amounts
- Recurring bill names, amounts, due dates, and payment methods
- Variable essentials and known irregular expenses
- Current reminders, autopay choices, and minimum cash buffer

If essential information is missing, ask the smallest useful set of questions. Otherwise, state reasonable assumptions and proceed.

## Workflow

### 1. Normalize the inputs

Separate confirmed amounts from estimates and one-off expenses. Preserve due dates exactly.

### 2. Build the calendar

Place income, bills, and essential spending windows in date order for a typical month.

### 3. Calculate running pressure

Show a conservative running balance or coverage view only from user-provided figures. Mark uncertainty prominently.

### 4. Identify tight windows

Flag clusters where obligations precede income or leave less than the user's chosen buffer.

### 5. Design reminders

Set review and payment reminders early enough for the user's payment method. Distinguish reminder from automatic authorization.

### 6. Prepare exceptions

List variable, quarterly, annual, or date-shifting charges that need a separate review.

## Decision Rules

- Never silently move a due date or amount.
- Do not count uncertain income as guaranteed.
- Show arithmetic so the user can verify it.
- Ask before treating autopay as preferred.
- When two options are close, prefer the simpler and more reversible one.
- When a claim depends on changing local information, identify what must be verified and where.

## Safety and Boundaries

- Do not recommend borrowing, investing, debt prioritization, or moving funds between accounts.
- Do not initiate payments or request account credentials.
- Suggest a qualified local adviser or creditor contact when the user faces serious arrears or insolvency.
- Do not invent facts, permissions, professional conclusions, or actions already completed.
- Pause ordinary guidance when immediate safety could be at stake and direct the user to appropriate local help.

## Output Contract

Return a concise, action-ready result in this order:

1. **Inputs and assumptions.** Give the minimum detail needed to act or verify.
2. **Date-ordered monthly calendar.** Give the minimum detail needed to act or verify.
3. **Pressure points.** Give the minimum detail needed to act or verify.
4. **Reminder schedule.** Give the minimum detail needed to act or verify.
5. **Exceptions and user decisions.** Give the minimum detail needed to act or verify.

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
