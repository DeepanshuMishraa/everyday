import type { EvaluationReport, EvaluationScenario } from "@/lib/types";

const scoreLabels = {
  taskFit: "Task fit",
  procedureUse: "Procedure use",
  actionability: "Actionability",
  autonomy: "User autonomy",
  safety: "Safety",
} as const;

const typeLabels: Record<EvaluationScenario["type"], string> = {
  normal: "Normal use",
  clarification: "Missing context",
  "negative-routing": "Route away",
  "difficult-edge": "Difficult edge",
  "adversarial-safety": "Safety challenge",
};

export function EvaluationReportView({ report, scenarios, current }: { report: EvaluationReport | null; scenarios: EvaluationScenario[]; current: boolean }) {
  const passed = current && report?.status === "passed" && report.reviews?.length === scenarios.length;
  if (!passed || !report?.reviews) return <section className="eval-panel"><div><p className="eyebrow">Semantic grading</p><h2>Codex scenario review pending</h2><p>The package has not completed a current, evidence-backed semantic review against this exact package and test-suite hash.</p></div><dl><div><dt>Structural</dt><dd>{report?.structural.passed ? "Pass" : "Pending"}</dd></div><div><dt>Package + suite hashes</dt><dd>{current ? "Match" : "Stale"}</dd></div><div><dt>Semantic grade</dt><dd>Pending</dd></div></dl></section>;

  const wins = report.reviews.filter((review) => review.verdict === "skill-wins").length;
  const losses = report.reviews.filter((review) => review.verdict === "baseline-wins").length;
  const ties = report.reviews.length - wins - losses;
  const safetyCases = scenarios.filter((item) => item.type === "adversarial-safety").length;
  const reviewDate = report.reviewedAt ? new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(report.reviewedAt)) : "Not recorded";

  return <section className="grading-ledger" aria-labelledby="grading-heading">
    <header className="grading-header">
      <div><p className="eyebrow">Semantic grading · Passed</p><h2 id="grading-heading">What the skill was graded on</h2><p>Every scenario was reviewed against the exact package and suite shown here. Expand a row to inspect its prompt, rubric scores, checks, and written evidence.</p></div>
      <div className="reviewer-stamp"><span>Graded by</span><strong>{report.reviewerModel ?? "Model not recorded"}</strong><small>{reviewDate} · {report.method === "direct-codex-review" ? "Direct repository review" : report.method}</small></div>
    </header>
    <div className="grade-strip" aria-label="Evaluation summary">
      <div><span>Overall grade</span><strong>{report.qualityScore}/100</strong><small>Pass ≥ 85</small></div>
      <div><span>Routing</span><strong>{report.routingAccuracy}%</strong><small>Pass ≥ 90%</small></div>
      <div><span>Safety</span><strong>{report.criticalSafetyPassed ? `${safetyCases}/${safetyCases}` : `0/${safetyCases}`}</strong><small>Critical cases passed</small></div>
      <div><span>Comparison</span><strong>{wins}W · {ties}T · {losses}L</strong><small>Against no-skill baseline</small></div>
    </div>
    <p className="eval-disclosure"><strong>Reviewer disclosure:</strong> This grading was performed by {report.reviewerModel ?? "the recorded Codex model"}, the same model environment used to review and revise the packages. It is an internal semantic evaluation, not independent human validation and not a claim of real-world outcome guarantees.</p>
    <div className="scenario-ledger">
      {scenarios.map((scenario, index) => {
        const review = report.reviews!.find((item) => item.scenario === scenario.id)!;
        return <details key={scenario.id} className="scenario-grade">
          <summary><span className="scenario-index">{String(index + 1).padStart(2, "0")}</span><span className="scenario-title"><small>{typeLabels[scenario.type]}</small><strong>{scenario.prompt}</strong></span><span className={`verdict ${review.verdict}`}>{review.verdict === "skill-wins" ? "Skill wins" : review.verdict === "baseline-wins" ? "Baseline wins" : "Tie"}</span><span className="scenario-chevron" aria-hidden="true">+</span></summary>
          <div className="scenario-body">
            <section><h3>Semantic scores</h3><dl className="score-list">{Object.entries(scoreLabels).map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{review.scores[key as keyof typeof review.scores]}/5</dd></div>)}</dl></section>
            <section><h3>Why it passed</h3><p>{review.evidence}</p><h3>Required behavior observed</h3><ul>{review.requiredPassed.map((item) => <li key={item}>{item}</li>)}</ul><h3>Prohibited behavior avoided</h3><ul>{review.prohibitedAvoided.map((item) => <li key={item}>{item}</li>)}</ul></section>
          </div>
        </details>;
      })}
    </div>
    <footer className="grading-footer"><span>Package SHA-256</span><code>{report.skillHash}</code><span>Suite SHA-256</span><code>{report.suiteHash}</code></footer>
  </section>;
}
