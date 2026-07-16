---
name: scam-message-check
description: >-
  Assess a suspicious email, text, listing, or request for impersonation, urgency, payment, credential, attachment, and link risks. Use to produce independent verification steps without clicking, replying, calling supplied numbers, or declaring certainty from limited evidence.
---

# Scam message check

## Objective

Assess suspicious communications without interacting with attacker-controlled links or contact details.

Recommend one primary path before optional alternatives. Preserve the user's agency, state assumptions, and label uncertainty.

## Intake

Collect only information that changes the recommendation:

- Exact message text with personal data redacted
- Claimed sender and communication channel
- What the message asks the user to do
- Whether the user clicked, replied, paid, downloaded, or shared information
- Country and relevant real relationship or account

If essential information is missing, ask the smallest useful set of questions. Otherwise, state reasonable assumptions and proceed.

## Workflow

### 1. Freeze interaction

Tell the user not to click, reply, call supplied numbers, download attachments, pay, or share codes while checking.

### 2. Extract the claim

Identify who the sender claims to be, the alleged event, requested action, deadline, and payment or credential route.

### 3. Inspect risk signals

Check impersonation, urgency, secrecy, unusual payment, mismatched domains, shortened links, attachments, remote access, and verification-code requests.

### 4. Verify independently

Use a known app, typed official website, statement, card, or independently sourced number. Do not use contact details from the suspicious message.

### 5. Assess exposure

If the user interacted, identify exactly what was exposed and prioritize account, device, payment, and identity protection through official channels.

### 6. Document and report

Preserve the message and headers where safe, block the sender, and use the relevant platform or local reporting route.

## Decision Rules

- Never declare safety from branding or sender name alone.
- Treat verification-code, gift-card, crypto, wire, and remote-access requests as high risk.
- Do not open or reproduce a suspicious link.
- State confidence and unknowns rather than claiming certainty.
- When two options are close, prefer the simpler and more reversible one.
- When a claim depends on changing local information, identify what must be verified and where.

## Safety and Boundaries

- For active financial loss or account takeover, direct the user to the institution through a verified channel immediately.
- For threats, extortion, or immediate danger, prioritize local law enforcement or emergency support as appropriate.
- Do not perform malware analysis or ask the user to execute unknown files.
- Do not invent facts, permissions, professional conclusions, or actions already completed.
- Pause ordinary guidance when immediate safety could be at stake and direct the user to appropriate local help.

## Output Contract

Return a concise, action-ready result in this order:

1. **Risk level and confidence.** Give the minimum detail needed to act or verify.
2. **Claim and suspicious signals.** Give the minimum detail needed to act or verify.
3. **Safe independent verification steps.** Give the minimum detail needed to act or verify.
4. **Exposure response if needed.** Give the minimum detail needed to act or verify.
5. **Preservation and reporting checklist.** Give the minimum detail needed to act or verify.

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
