import type { EvaluationReport, EvaluationScenario } from "@/lib/types";
import { eyebrow, heading } from "@/lib/tailwind";

const typeLabels: Record<EvaluationScenario["type"], string> = {
  normal: "Normal use",
  clarification: "Missing context",
  "negative-routing": "Route away",
  "difficult-edge": "Difficult edge",
  "adversarial-safety": "Safety challenge",
};

export function EvaluationReportView({
  report,
  scenarios,
  current,
}: {
  report: EvaluationReport | null;
  scenarios: EvaluationScenario[];
  current: boolean;
}) {
  const reviewed =
    current &&
    report?.status === "instruction-review-pass" &&
    report.reviews?.length === scenarios.length;
  if (!reviewed || !report?.reviews)
    return (
      <section className="grid grid-cols-[minmax(0,1fr)_300px] gap-14 border-t border-line py-16 max-[980px]:grid-cols-1 max-[980px]:gap-8 max-[480px]:pt-12">
        <div>
          <p className={eyebrow}>Instruction review</p>
          <h2 className={`${heading.h2} text-[1.7rem]`}>
            Fresh review pending
          </h2>
          <p className="text-[0.92rem] text-ink-2">
            {current
              ? "GPT-5.6 has not finished reviewing this skill against its ten everyday scenarios."
              : "This skill changed after its last review, so it needs to be reviewed again."}
          </p>
        </div>
        <dl className="m-0 [&>div]:flex [&>div]:justify-between [&>div]:gap-4 [&>div]:border-b [&>div]:border-line [&>div]:py-[11px] [&_dt]:text-[0.84rem] [&_dt]:text-ink-2 [&_dd]:m-0 [&_dd]:text-xs [&_dd]:font-medium">
          <div>
            <dt>File structure</dt>
            <dd>{report?.structural.passed ? "Ready" : "Checking"}</dd>
          </div>
          <div>
            <dt>Scenario review</dt>
            <dd>Pending</dd>
          </div>
          <div>
            <dt>Safety review</dt>
            <dd>Pending</dd>
          </div>
        </dl>
      </section>
    );

  const reviews = report.reviews;
  const covered = reviews.filter(
    (review) => review.assessment === "covered",
  ).length;
  const routesCovered = reviews.filter((review) => review.routePassed).length;
  const safetyCases = scenarios.filter(
    (item) => item.type === "adversarial-safety",
  );
  const safetyCovered = reviews.filter(
    (review) =>
      safetyCases.some((scenario) => scenario.id === review.scenario) &&
      review.safetyPassed,
  ).length;
  const reviewDate = report.reviewedAt
    ? new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeZone: "UTC",
      }).format(new Date(report.reviewedAt))
    : "Not recorded";

  return (
    <section
      className="border-t border-line py-16 pb-24 max-[480px]:pt-12"
      aria-labelledby="grading-heading"
    >
      <header className="mb-10 grid grid-cols-[minmax(0,1fr)_300px] items-end gap-14 max-[980px]:grid-cols-1 max-[980px]:gap-8">
        <div>
          <p className={eyebrow}>Instruction coverage · Reviewed</p>
          <h2 className={`${heading.h2} max-w-[19ch]`} id="grading-heading">
            What the package explicitly covers
          </h2>
          <p className="max-w-[34rem] text-[0.92rem] text-ink-2">
            GPT-5.6 inspected the written instructions against ten scenarios.
            Expand a row to see the requirement and the instruction evidence.
          </p>
        </div>
        <div className="rounded-lg border border-line bg-surface px-5 py-[18px] [&>span]:block [&>span]:text-xs [&>span]:font-bold [&>span]:text-ink-2 [&>strong]:my-1.5 [&>strong]:block [&>strong]:text-[1.02rem] [&>strong]:font-bold [&>strong]:tracking-[-0.02em] [&>small]:block [&>small]:text-xs [&>small]:font-bold [&>small]:text-ink-2">
          <span>Reviewed by</span>
          <strong>{report.reviewerModel ?? "Model not recorded"}</strong>
          <small>{reviewDate} · Instruction coverage review</small>
        </div>
      </header>
      <div
        className="grid grid-cols-3 overflow-hidden rounded-lg border border-line bg-surface max-[720px]:grid-cols-1 [&>div]:flex [&>div]:flex-col [&>div]:p-5 [&>div+div]:border-l [&>div+div]:border-line max-[720px]:[&>div+div]:border-l-0 max-[720px]:[&>div+div]:border-t [&_span]:text-xs [&_span]:font-bold [&_span]:text-ink-3 [&_strong]:mt-3 [&_strong]:text-2xl [&_strong]:font-bold [&_strong]:leading-none [&_strong]:tracking-[-0.03em] [&_small]:mt-2 [&_small]:text-xs [&_small]:font-bold [&_small]:text-ink-3"
        aria-label="Review summary"
      >
        <div>
          <span>Scenario coverage</span>
          <strong>
            {covered}/{scenarios.length}
          </strong>
          <small>Requirements addressed</small>
        </div>
        <div>
          <span>Routing coverage</span>
          <strong>
            {routesCovered}/{scenarios.length}
          </strong>
          <small>Written route aligns</small>
        </div>
        <div>
          <span>Safety coverage</span>
          <strong>
            {safetyCovered}/{safetyCases.length}
          </strong>
          <small>Boundary addressed</small>
        </div>
      </div>
      <p className="border-b border-line px-0.5 py-[18px] text-[0.84rem] text-ink-2 [&_strong]:text-ink">
        <strong>What this means:</strong>{" "}
        {report.reviewerModel ?? "The recorded GPT-5.6 model"} checked whether
        the written instructions include the expected steps, routing, and safety
        boundaries for the scenarios below. It is a review of the instructions,
        not a promise of real-world results.
      </p>
      <div className="pb-8">
        {scenarios.map((scenario, index) => {
          const review = reviews.find((item) => item.scenario === scenario.id);
          if (!review) return null;
          return (
            <details
              key={scenario.id}
              className="group/scenario border-b border-line"
            >
              <summary className="grid cursor-pointer list-none grid-cols-[36px_minmax(0,1fr)_auto_20px] items-center gap-4 px-1 py-[17px] transition-colors duration-[140ms] marker:hidden hover:bg-surface max-[720px]:grid-cols-[26px_minmax(0,1fr)_16px] max-[720px]:gap-2.5">
                <span className="text-xs tabular-nums text-ink-3">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid min-w-0 gap-[3px] max-[720px]:col-start-2">
                  <small className="text-xs font-bold text-ink-3">
                    {typeLabels[scenario.type]}
                  </small>
                  <strong className="text-[0.88rem] font-medium">
                    {scenario.prompt}
                  </strong>
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold before:size-1.5 before:rounded-full before:bg-current before:content-[''] max-[720px]:col-start-2 max-[720px]:row-start-2 max-[720px]:mb-2.5 max-[720px]:mt-[-4px] ${review.assessment === "covered" ? "text-green" : "text-red"}`}
                >
                  {review.assessment === "covered" ? "Covered" : "Gap"}
                </span>
                <span
                  className="font-mono text-[0.95rem] text-ink-3 transition-transform duration-200 ease-spring group-open/scenario:rotate-45 max-[720px]:col-start-3 max-[720px]:row-start-1"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-12 pb-[30px] pl-[52px] pt-1.5 max-[720px]:grid-cols-1 max-[720px]:gap-2 max-[720px]:px-0 max-[720px]:pb-[26px] max-[720px]:pt-1 [&_h3]:mb-2 [&_h3]:mt-[1.2rem] [&_h3]:font-ui [&_h3]:text-xs [&_h3]:font-bold [&_h3]:tracking-[0.02em] [&_h3]:text-ink-2 [&_h3:first-child]:mt-0 [&_p]:text-[0.86rem] [&_p]:leading-[1.65] [&_p]:text-ink-body [&_li]:text-[0.86rem] [&_li]:leading-[1.65] [&_li]:text-ink-body [&_ul]:my-1.5 [&_ul]:pl-[1.1rem]">
                <section>
                  <h3>Coverage evidence</h3>
                  <p>{review.evidence}</p>
                </section>
                <section>
                  <h3>Required behavior addressed</h3>
                  <ul>
                    {review.requiredPassed.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3>Prohibited behavior guarded against</h3>
                  <ul>
                    {review.prohibitedAvoided.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
