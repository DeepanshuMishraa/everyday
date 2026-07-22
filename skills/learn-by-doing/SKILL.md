---
name: learn-by-doing
description: Teach the user a practical skill through a short explanation, worked example, guided attempt, independent attempt, feedback, and later retrieval. Use when the user wants to learn by practice instead of receiving a reading list, and when progress should continue across multiple sessions in the current workspace.
---

# Learn by Doing

## Interaction

When missing information materially changes the outcome and the host exposes a dedicated user-input or question tool, use that tool. Ask no more than three short, related questions per call, then wait for the answers before asking the next batch.

Prefer selectable options when choices are concise and genuinely mutually exclusive; allow a free-form answer when needed. Do not present a long questionnaire in normal chat. If no native input tool is available, ask one concise blocking question at a time. For non-blocking gaps, state the assumption and continue.

Treat the current directory as a **learning workspace**. The learner should leave each session able to do one new observable thing, not merely recognise an explanation.

## Workspace

Create files only when they become useful:

- `LEARNING-GOAL.md` — the real-world performance the learner is working toward. Use [LEARNING-GOAL-FORMAT.md](LEARNING-GOAL-FORMAT.md).
- `RESOURCES.md` — a small set of trusted sources and what each is for. Use [RESOURCES-FORMAT.md](RESOURCES-FORMAT.md).
- `learning-records/NNNN-<lesson>.md` — durable evidence of what the learner can now do. Use [LEARNING-RECORD-FORMAT.md](LEARNING-RECORD-FORMAT.md).
- `practice/` — exercises, attempts, and feedback artifacts worth keeping.
- `NOTES.md` — teaching preferences and temporary observations.

Read existing workspace files before planning the next session. Preserve the learner's edits.

## 1. Define the performance

Translate “understand X” into an action: explain, choose, create, solve, demonstrate, diagnose, or perform. Ask why it matters, what a real success looks like, prior attempts, constraints, and time available now.

Write or update `LEARNING-GOAL.md` only after the learner agrees.

**Done when:** success can be observed without asking whether the learner “feels like they understand.”

## 2. Find the next reachable win

Read prior learning records and attempts. Choose one task just beyond what the learner can already do—the **stretch step**. Gather only the knowledge needed for that attempt from trusted sources; avoid relying on unsupported memory for factual teaching.

**Done when:** the task is challenging, achievable in this session, and tied to the learning goal.

## 3. Run the practice loop

Follow [PRACTICE-LOOP.md](PRACTICE-LOOP.md): minimal explanation, worked example, guided attempt, independent attempt, feedback, and a fresh retry.

Do not reveal the independent answer before the learner attempts it when doing so is safe. Feedback names the specific gap and next correction; praise alone is not feedback.

**Done when:** the learner completes a fresh attempt that demonstrates or clearly fails the target performance.

## 4. Record learning, not attendance

Write a learning record only when the session contains evidence of durable progress, prior knowledge, or a corrected misconception. Save useful attempts under `practice/`. Do not create session logs just because a session occurred.

## 5. Schedule retrieval and transfer

End with one short later retrieval prompt and one transfer task in a different context. Space them realistically around the user's life.

This skill supports learning. It does not certify professional competence, facilitate cheating, or replace supervised instruction for hazardous physical, medical, or regulated practice.
