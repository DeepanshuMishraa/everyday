# Weeknight meals flagship pilot playbook

Use this playbook only for the `plan-weeknight-meals` two-cycle cohort. It specializes rather than replaces `research/USER_INTERVIEW_PROTOCOL.md`.

## Study gate

Run one cohort of eight eligible participants plus up to two backups. Each participant completes a first observed session and two follow-ups anchored to their normal meal-planning cycle, normally over 14–21 days. Close the cohort 35 days after the first observed session at the latest.

The expansion gate requires all of the following:

1. Eight eligible participants use preflight-verified runtimes with capturable skill-load evidence.
2. Six install and complete the first session without the researcher operating their agent.
3. Four of the original eight independently repeat during their next normal cycle, with captured load evidence for both uses.
4. The same four take one concrete action from the second plan and explain how it reduced reconstruction or improved fit.
5. No severe dietary-safety failure occurs.
6. The public report separates observed behavior, participant reports, analytics, and stated preference.

If fewer than six complete both follow-ups, mark the cohort inconclusive. If fewer than four independently repeat, do not expand the catalog.

## Recruitment and eligibility

Send 20 targeted invitations through the originating X audience, direct outreach, and relevant agent communities. Aim for eight participants plus two backups by day 7. If needed, send a second tranche of 20 invitations in at least two new communities; day 14 is the hard deadline. Do not weaken eligibility.

Include someone only when they:

- already use a skill-capable agent for non-work tasks;
- personally plan weeknight meals often enough to exercise the workflow twice;
- use a runtime whose tagged install and load indicator passed preflight;
- agree to one observation and two cycle-based follow-ups; and
- can review dietary constraints before the first request.

A backup may replace someone only before the original participant completes the first session. A withdrawal after first use remains in the denominator and counts as not repeated.

## Consent script

Before installation, explain in plain language:

- what Everyday is testing and why two uses matter;
- what the researcher will observe and record;
- that website analytics cannot observe agent execution;
- that transcript storage is optional and researcher notes may be used instead;
- how cropped skill-load evidence will be minimized and redacted;
- what aggregate findings may be published;
- retention and deletion periods; and
- that participation may stop at any time.

Record separate yes/no consent for observation, follow-up contact, transcript storage, cropped load-evidence storage, aggregate publication, and quotation. Declining transcript storage does not make a participant ineligible. Never publish a quotation without separate quotation consent.

## Private records

Store research data outside the repository under `~/.local/share/everyday-pilot/weeknight-meals/`. The root and every subdirectory must be readable only by the owner.

```text
weeknight-meals/
├── identity/     contact details and participant-ID mapping
├── consent/      consent decisions and dates
├── records/      pseudonymous session and follow-up records
├── evidence/     cropped, reviewed, redacted load evidence
└── deletion-log/ completed deletion requests without deleted content
```

Use IDs such as `WM01`; never copy names or contact details into records, evidence filenames, analytics, or the repository. Keep identity data separate from pseudonymous records.

For every retained load indicator:

1. Capture the smallest crop that proves the tagged skill loaded.
2. Let the participant review the crop before storage.
3. Remove names, usernames, paths, secrets, tokens, environment values, project content, and unrelated conversation.
4. Record runtime, runtime version, tag, package version, package fingerprint, request number, and capture date separately.
5. Never retain a full runtime trace solely to prove recognition.

Delete contact details after the final follow-up. Delete consent records, raw notes, transcripts, and cropped evidence 90 days after report publication. Complete participant deletion requests within seven days and record only participant ID, completion date, and deleted categories. Anonymized aggregates may remain when they cannot reasonably identify the participant.

## Runtime preflight

Before publishing compatibility or recruiting on a runtime:

1. Install the direct tagged tree using the public cohort command.
2. Hash the tagged source and installed directory with `npm run hash-skill -- <directory>`; fingerprints must match the published value.
3. Submit a natural meal-planning request without naming the skill.
4. Capture the runtime trace, log, or UI indicator showing the tagged package loaded.
5. Record `preflight verified`, `preflight failed`, or `untested` with date and runtime version.

The cohort uses the unversioned `npx skills` installer by product decision. Treat installer drift as cohort variability. Never merge preflight labels with later `observed success`, `observed failure`, or `indeterminate` cohort evidence.

## First observed session

The participant operates their own agent and writes their own request. The researcher may answer factual installation questions only after the participant reaches a blocked state. Do not choose or copy the command, select an example, name the skill, or tell the participant how to trigger it.

Before a meal plan is produced, have the participant confirm allergies, medically required diets, dietary constraints, and cross-contamination concerns. Stop if this information is uncertain and ingredient choices would be unsafe.

Record:

- runtime and version;
- install outcome, tag, package version, and matching fingerprint;
- request wording and whether an example was copied;
- time to first relevant output;
- cropped skill-load evidence or `indeterminate`;
- whether the output contains capacity labels, ingredient reuse, and a fallback;
- confusion, current workaround, and concrete changes made to the output; and
- whether the participant acted on any part of the first plan.

## Follow-ups

Schedule follow-ups around the participant's normal planning cycle, approximately one and two weeks after first use. Do not remind them at the moment of need or mention using Everyday, the skill, or an activation prompt.

Ask what happened naturally, what triggered any return, what they changed or ignored, and whether they took a concrete action from the second plan. Record action evidence as exactly one of:

- `directly_observed` — the researcher witnessed the action; or
- `participant_reported` — the participant described the completed action and its effect.

Never describe participant-reported actions as directly observed in the public report.

## Classification

- `Installed`: runtime reports the package at the pinned tag/version and matching fingerprint.
- `Activated`: the request produces capacity labels, ingredient reuse, and a fallback meal.
- `Recognized`: minimized runtime evidence shows the tagged package loaded; resemblance alone is insufficient.
- `Independently repeated`: participant initiates the next-cycle request without a research reminder naming the product, skill, or prompt.
- `Prompted-only repeat`: reuse occurs only after such a reminder.
- `Usable second-week plan`: independently repeated, followed by a concrete action with its evidence source and a stated reduction in reconstruction or improvement in fit.
- `Not repeated`: no qualifying second use before cohort close, including withdrawal after first use.

Assign one primary failure code—the earliest blocker—and any contributing codes: `recruitment`, `installation`, `recognition`, `output-quality`, `safety`, `no-return-trigger`, or `research-attrition`.

## Dietary incident response

A severe failure contradicts a confirmed allergy or medical restriction, presents unsafe preparation/storage guidance as safe, or skips a required confirmation in a way that could plausibly cause harm.

Stop the session, tell the participant not to use the recommendation, preserve only consented and minimized evidence, record the incident, and pause further sessions. Do not diagnose or provide treatment advice. Patch the skill, create a new immutable-by-policy tag and fingerprint, record a protocol deviation, and analyze patched participants separately.

## Public report template

Publish `research/pilots/weeknight-meals-flagship-report.md` within seven days of cohort close.

1. Question tested and why meal planning was selected.
2. Cohort dates, eligibility, denominator, withdrawals, and method.
3. Preflight compatibility, separated from cohort evidence.
4. Installed, activated, recognized, independently repeated, and usable-plan counts.
5. Concrete actions split into directly observed and participant reported.
6. Primary and contributing failure themes.
7. Dietary incidents and protocol deviations.
8. What changed in the skill because of observed behavior.
9. Limitations, including the small directional sample.
10. Gate result and next step.

Suppress public subgroup cells smaller than three. Merge or omit identifying runtime, failure, quotation, household, or demographic combinations. Publish only consented, de-identified quotations. Never claim product-market fit from this cohort.
