import type { PilotEvidenceState, PilotRuntime, SkillPilot } from "@/lib/pilot";
import { eyebrow, heading } from "@/lib/tailwind";

function evidenceLabel(evidence: PilotEvidenceState) {
  switch (evidence.kind) {
    case "preparing":
      return "Preparing the verified pilot";
    case "recruiting":
      return `Recruiting ${evidence.enrolled} of ${evidence.target} participants`;
    case "in-progress":
      return `In progress with ${evidence.active} of ${evidence.cohortSize} participants`;
    case "gate-met":
      return `Gate met: ${evidence.independentRepeats} of ${evidence.cohortSize} independently repeated`;
    case "gate-not-met":
      return `Gate not met: ${evidence.independentRepeats} of ${evidence.cohortSize} independently repeated`;
  }
}

function preflightLabel(runtime: PilotRuntime) {
  switch (runtime.preflight.kind) {
    case "untested":
      return "Preflight pending";
    case "verified":
      return `Preflight verified ${runtime.preflight.checkedOn}`;
    case "failed":
      return `Preflight failed ${runtime.preflight.checkedOn}`;
  }
}

function cohortLabel(runtime: PilotRuntime) {
  switch (runtime.cohort.kind) {
    case "not-started":
      return "Cohort evidence not started";
    case "observed-success":
      return `Observed success · ${runtime.cohort.participants} participants`;
    case "observed-failure":
      return `Observed failure · ${runtime.cohort.participants} participants`;
    case "indeterminate":
      return `Indeterminate · ${runtime.cohort.participants} participants`;
  }
}

export function PilotPanel({ pilot }: { pilot: SkillPilot }) {
  const evidenceColor =
    pilot.evidence.kind === "gate-met"
      ? "text-green"
      : pilot.evidence.kind === "gate-not-met"
        ? "text-red"
        : "text-ink-2";
  return (
    <section
      className="mt-12 rounded-lg border border-line bg-surface p-7 max-[720px]:mt-8 max-[720px]:p-[22px]"
      aria-labelledby="pilot-title"
    >
      <div className="flex items-start justify-between gap-8 max-[980px]:flex-col max-[980px]:gap-4">
        <div>
          <p className={eyebrow}>Flagship pilot</p>
          <h2
            className={`${heading.h2} max-w-[26ch] text-[clamp(1.55rem,3vw,2.25rem)]`}
            id="pilot-title"
          >
            Install one meal-planning method your agent can recall next week.
          </h2>
        </div>
        <span
          className={`shrink-0 rounded-sm border border-line-2 px-2.5 py-[7px] text-xs font-bold ${evidenceColor}`}
        >
          {evidenceLabel(pilot.evidence)}
        </span>
      </div>
      <ol className="mt-7 grid list-none grid-cols-3 gap-0 border-l border-t border-line p-0 max-[720px]:grid-cols-1 [&_li]:grid [&_li]:min-h-[142px] [&_li]:grid-cols-[24px_minmax(0,1fr)] [&_li]:gap-3 [&_li]:border-b [&_li]:border-r [&_li]:border-line [&_li]:p-5 max-[720px]:[&_li]:min-h-0 [&_li>span]:font-mono [&_li>span]:text-xs [&_li>span]:text-ink-3 [&_strong]:text-[0.9rem] [&_p]:mt-2 [&_p]:text-[0.82rem] [&_p]:leading-[1.55] [&_p]:text-ink-2">
        <li>
          <span>1</span>
          <div>
            <strong>Install the pinned workflow</strong>
            <p>
              Use the cohort tag so every participant starts with the same
              instructions.
            </p>
          </div>
        </li>
        <li>
          <span>2</span>
          <div>
            <strong>Ask naturally</strong>
            <p>Describe your real week without naming the skill.</p>
          </div>
        </li>
        <li>
          <span>3</span>
          <div>
            <strong>Use it again next week</strong>
            <p>
              The study measures whether the method returns when it is useful.
            </p>
          </div>
        </li>
      </ol>
      <p className="mt-[18px]">
        <span className="mb-[7px] block text-xs font-bold text-ink-2">
          Package fingerprint
        </span>
        <code className="wrap-anywhere font-mono text-[0.7rem] text-ink-body">
          {pilot.packageFingerprint}
        </code>
      </p>
      <div className="mt-6 grid grid-cols-2 border-l border-t border-line max-[720px]:grid-cols-1 [&_article]:border-b [&_article]:border-r [&_article]:border-line [&_article]:px-[18px] [&_article]:py-4 [&_p]:my-[3px] [&_p]:text-xs [&_p]:text-ink-2">
        {pilot.runtimes.map((runtime) => (
          <article key={runtime.name}>
            <h3 className={`${heading.h3} mb-2 text-[0.88rem]`}>
              {runtime.name}
            </h3>
            <p>{preflightLabel(runtime)}</p>
            <p>{cohortLabel(runtime)}</p>
          </article>
        ))}
      </div>
      <p className="mt-[18px] max-w-[68rem] text-[0.8rem] leading-[1.6] text-ink-2">
        Compatibility is published only after a tagged-install smoke test.
        Repeat use is learned through consented observation and follow-up, not
        website analytics. No runtime is verified yet.
      </p>
    </section>
  );
}
