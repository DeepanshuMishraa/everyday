import { CopyButton } from "@/components/SkillActions";
import type { PilotEvidenceState, PilotRuntime, SkillPilot } from "@/lib/pilot";

function evidenceLabel(evidence: PilotEvidenceState) {
  switch (evidence.kind) {
    case "preparing": return "Preparing the verified pilot";
    case "recruiting": return `Recruiting ${evidence.enrolled} of ${evidence.target} participants`;
    case "in-progress": return `In progress with ${evidence.active} of ${evidence.cohortSize} participants`;
    case "gate-met": return `Gate met: ${evidence.independentRepeats} of ${evidence.cohortSize} independently repeated`;
    case "gate-not-met": return `Gate not met: ${evidence.independentRepeats} of ${evidence.cohortSize} independently repeated`;
  }
}

function preflightLabel(runtime: PilotRuntime) {
  switch (runtime.preflight.kind) {
    case "untested": return "Preflight pending";
    case "verified": return `Preflight verified ${runtime.preflight.checkedOn}`;
    case "failed": return `Preflight failed ${runtime.preflight.checkedOn}`;
  }
}

function cohortLabel(runtime: PilotRuntime) {
  switch (runtime.cohort.kind) {
    case "not-started": return "Cohort evidence not started";
    case "observed-success": return `Observed success · ${runtime.cohort.participants} participants`;
    case "observed-failure": return `Observed failure · ${runtime.cohort.participants} participants`;
    case "indeterminate": return `Indeterminate · ${runtime.cohort.participants} participants`;
  }
}

export function PilotPanel({ pilot }: { pilot: SkillPilot }) {
  return <section className="pilot-panel" aria-labelledby="pilot-title">
    <div className="pilot-heading">
      <div><p className="eyebrow">Flagship pilot</p><h2 id="pilot-title">Install one meal-planning method your agent can recall next week.</h2></div>
      <span className={`pilot-state state-${pilot.evidence.kind}`}>{evidenceLabel(pilot.evidence)}</span>
    </div>
    <ol className="pilot-steps">
      <li><span>1</span><div><strong>Install the pinned workflow</strong><p>Use the cohort tag so every participant starts with the same instructions.</p></div></li>
      <li><span>2</span><div><strong>Ask naturally</strong><p>Describe your real week without naming the skill.</p></div></li>
      <li><span>3</span><div><strong>Use it again next week</strong><p>The study measures whether the method returns when it is useful.</p></div></li>
    </ol>
    <div className="pilot-install">
      <div><span className="pilot-label">Cohort install command</span><code>{pilot.installCommand}</code></div>
      <CopyButton value={pilot.installCommand} label="Copy tagged command" event="install_command_copy" skill={pilot.slug} />
    </div>
    <p className="pilot-fingerprint"><span>Package fingerprint</span><code>{pilot.packageFingerprint}</code></p>
    <div className="pilot-runtime-grid">
      {pilot.runtimes.map((runtime) => <article key={runtime.name}>
        <h3>{runtime.name}</h3><p>{preflightLabel(runtime)}</p><p>{cohortLabel(runtime)}</p>
      </article>)}
    </div>
    <p className="pilot-disclosure">Compatibility is published only after a tagged-install smoke test. Repeat use is learned through consented observation and follow-up, not website analytics. No runtime is verified yet.</p>
  </section>;
}
