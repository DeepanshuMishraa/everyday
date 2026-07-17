import type { EvaluationReport, EvaluationScenario } from "@/lib/types";

const typeLabels: Record<EvaluationScenario["type"], string> = {
  normal: "Normal use",
  clarification: "Missing context",
  "negative-routing": "Route away",
  "difficult-edge": "Difficult edge",
  "adversarial-safety": "Safety challenge",
};

export function EvaluationReportView({ report, scenarios, current }: { report: EvaluationReport | null; scenarios: EvaluationScenario[]; current: boolean }) {
  const reviewed = current && report?.status === "instruction-review-pass" && report.reviews?.length === scenarios.length;
  if (!reviewed || !report?.reviews) return <section className="eval-panel"><div><p className="eyebrow">Instruction coverage</p><h2>Codex review pending</h2><p>The written package has not completed a current coverage review against this exact package and test-suite hash.</p></div><dl><div><dt>Structure</dt><dd>{report?.structural.passed ? "Pass" : "Pending"}</dd></div><div><dt>Package + suite hashes</dt><dd>{current ? "Match" : "Stale"}</dd></div><div><dt>Instruction review</dt><dd>Pending</dd></div></dl></section>;

  const covered = report.reviews.filter((review) => review.assessment === "covered").length;
  const routesCovered = report.reviews.filter((review) => review.routePassed).length;
  const safetyCases = scenarios.filter((item) => item.type === "adversarial-safety");
  const safetyCovered = report.reviews.filter((review) => safetyCases.some((scenario) => scenario.id === review.scenario) && review.safetyPassed).length;
  const reviewDate = report.reviewedAt ? new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(report.reviewedAt)) : "Not recorded";

  return <section className="grading-ledger" aria-labelledby="grading-heading">
    <header className="grading-header">
      <div><p className="eyebrow">Instruction coverage · Reviewed</p><h2 id="grading-heading">What the package explicitly covers</h2><p>GPT-5 (Codex) inspected the written instructions against ten scenarios. Expand a row to see the requirement and the instruction evidence.</p></div>
      <div className="reviewer-stamp"><span>Reviewed by</span><strong>{report.reviewerModel ?? "Model not recorded"}</strong><small>{reviewDate} · Instruction coverage review</small></div>
    </header>
    <div className="grade-strip" aria-label="Review summary">
      <div><span>Scenario coverage</span><strong>{covered}/{scenarios.length}</strong><small>Requirements addressed</small></div>
      <div><span>Routing coverage</span><strong>{routesCovered}/{scenarios.length}</strong><small>Written route aligns</small></div>
      <div><span>Safety coverage</span><strong>{safetyCovered}/{safetyCases.length}</strong><small>Boundary addressed</small></div>
      <div><span>Execution comparison</span><strong>Not run</strong><small>No output artifacts yet</small></div>
    </div>
    <p className="eval-disclosure"><strong>Evidence level:</strong> {report.reviewerModel ?? "The recorded Codex model"} compared the written package with the scenario requirements. It did not generate and preserve baseline and skill-enabled outputs. This is an internal instruction review—not independent validation, a quality score, or evidence of real-world performance.</p>
    <div className="scenario-ledger">
      {scenarios.map((scenario, index) => {
        const review = report.reviews!.find((item) => item.scenario === scenario.id)!;
        return <details key={scenario.id} className="scenario-grade">
          <summary><span className="scenario-index">{String(index + 1).padStart(2, "0")}</span><span className="scenario-title"><small>{typeLabels[scenario.type]}</small><strong>{scenario.prompt}</strong></span><span className={`coverage-status ${review.assessment}`}>{review.assessment === "covered" ? "Covered" : "Gap"}</span><span className="scenario-chevron" aria-hidden="true">+</span></summary>
          <div className="scenario-body">
            <section><h3>Coverage evidence</h3><p>{review.evidence}</p></section>
            <section><h3>Required behavior addressed</h3><ul>{review.requiredPassed.map((item) => <li key={item}>{item}</li>)}</ul><h3>Prohibited behavior guarded against</h3><ul>{review.prohibitedAvoided.map((item) => <li key={item}>{item}</li>)}</ul></section>
          </div>
        </details>;
      })}
    </div>
    <footer className="grading-footer"><span>Package SHA-256</span><code>{report.skillHash}</code><span>Suite SHA-256</span><code>{report.suiteHash}</code></footer>
  </section>;
}
