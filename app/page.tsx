import { JsonLd } from "@/components/JsonLd";
import { TrackedBrowseLink } from "@/components/TrackedBrowseLink";
import { absoluteUrl, site } from "@/lib/site";
import { container, eyebrow, heading } from "@/lib/tailwind";

const rise =
  "animate-rise opacity-0 motion-reduce:animate-none motion-reduce:opacity-100";
const proofDivider =
  "before:mx-2.5 before:h-3 before:w-px before:bg-line-2 before:content-[''] max-[360px]:before:mx-[7px]";
const indexRow =
  "grid min-h-16 grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-3 border-b border-line px-4 py-3 max-[480px]:min-h-[72px] max-[480px]:grid-cols-[22px_minmax(0,1fr)] max-[480px]:gap-x-2.5 max-[480px]:gap-y-2 max-[480px]:p-3";

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": absoluteUrl("/"),
          name: "Everyday — practical workflows for real life",
          description: site.description,
          url: absoluteUrl("/"),
          isPartOf: { "@id": `${site.url}/#website` },
          inLanguage: site.language,
        }}
      />
      <section className="border-b border-line">
        <div
          className={`${container} grid min-h-[calc(100svh-var(--header-h))] grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] items-center gap-[clamp(48px,7vw,104px)] py-[clamp(72px,10vh,120px)] max-[980px]:min-h-0 max-[980px]:grid-cols-1 max-[980px]:gap-14 max-[980px]:py-20 max-[720px]:gap-11 max-[720px]:pb-16 max-[720px]:pt-14 max-[480px]:gap-9 max-[480px]:pb-[52px] max-[480px]:pt-11`}
        >
          <div className="min-w-0">
            <p className={`${eyebrow} ${rise}`}>
              A field guide for everyday life
            </p>
            <h1
              className={`${heading.h1} ${rise} max-w-[8.5ch] text-[clamp(4.5rem,8vw,7rem)] [animation-delay:50ms] max-[980px]:max-w-[9ch] max-[980px]:text-[clamp(4.25rem,10vw,6rem)] max-[720px]:text-[clamp(3.5rem,12vw,4.5rem)] max-[480px]:max-w-[8ch] max-[480px]:text-[clamp(3.1rem,15vw,4rem)] max-[360px]:text-[2.9rem]`}
            >
              Know what to do next.
            </h1>
            <p
              className={`${rise} mt-6 max-w-[35rem] text-pretty text-[clamp(1.05rem,1.6vw,1.25rem)] leading-[1.55] text-ink-2 [animation-delay:110ms] max-[480px]:text-[1.08rem] max-[360px]:text-base`}
            >
              Thirty practical workflows for the moments that drain your time:
              difficult messages, household admin, meals, money, health, and
              getting unstuck.
            </p>
            <div
              className={`${rise} mt-[2.1rem] flex items-center gap-3 [animation-delay:170ms] max-[720px]:flex-wrap max-[480px]:flex-col max-[480px]:items-stretch`}
            >
              <TrackedBrowseLink />
            </div>
            <div
              className={`${rise} mt-[1.15rem] flex flex-wrap items-center gap-y-2 font-ui text-xs font-medium text-ink-2 [animation-delay:170ms] max-[480px]:leading-[1.4]`}
              aria-label="Free to read, no account required, human-readable guidance"
            >
              <span className="inline-flex items-center whitespace-nowrap">
                Free to read
              </span>
              <span
                className={`inline-flex items-center whitespace-nowrap ${proofDivider}`}
              >
                No account
              </span>
              <span
                className={`inline-flex items-center whitespace-nowrap ${proofDivider}`}
              >
                Use it immediately
              </span>
            </div>
          </div>
          <aside
            className={`${rise} min-w-0 border border-line-2 bg-surface font-ui [animation-delay:110ms] max-[980px]:w-full max-[980px]:max-w-[680px]`}
            aria-label="Examples from the workflow library"
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3.5 text-xs text-ink-2 max-[480px]:px-3">
              <span>Start with your situation</span>
              <strong className="text-xs text-ink">30 workflows</strong>
            </div>
            <div className="bg-ink p-[clamp(22px,4vw,36px)] text-bg max-[480px]:px-[18px] max-[480px]:py-[22px]">
              <span className="text-xs font-bold">
                What are you dealing with?
              </span>
              <p className="mt-[2.2rem] max-w-[24ch] font-ui text-[clamp(1.35rem,2.5vw,1.85rem)] font-medium leading-[1.25] tracking-[-0.025em] max-[480px]:mt-[1.6rem] max-[480px]:text-[1.45rem]">
                Search in your own words. Leave with a clear next step.
              </p>
            </div>
            <div>
              <div className={indexRow}>
                <span className="text-[0.7rem] tabular-nums text-ink-3">
                  01
                </span>
                <strong className="min-w-0 wrap-anywhere text-sm font-medium leading-[1.35]">
                  I got a suspicious message
                </strong>
                <span className="border border-line px-2 py-[5px] text-[0.68rem] font-bold text-ink-2 max-[480px]:col-start-2 max-[480px]:justify-self-start">
                  Safety
                </span>
              </div>
              <div className={indexRow}>
                <span className="text-[0.7rem] tabular-nums text-ink-3">
                  02
                </span>
                <strong className="min-w-0 wrap-anywhere text-sm font-medium leading-[1.35]">
                  I need dinner from what I have
                </strong>
                <span className="border border-line px-2 py-[5px] text-[0.68rem] font-bold text-ink-2 max-[480px]:col-start-2 max-[480px]:justify-self-start">
                  Food
                </span>
              </div>
              <div className={indexRow}>
                <span className="text-[0.7rem] tabular-nums text-ink-3">
                  03
                </span>
                <strong className="min-w-0 wrap-anywhere text-sm font-medium leading-[1.35]">
                  I feel overwhelmed and stuck
                </strong>
                <span className="border border-line px-2 py-[5px] text-[0.68rem] font-bold text-ink-2 max-[480px]:col-start-2 max-[480px]:justify-self-start">
                  Thinking
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-3.5 text-[0.7rem] text-ink-3 max-[480px]:px-3 max-[360px]:flex-col max-[360px]:items-start max-[360px]:gap-1">
              <span>Plain-language guidance</span>
              <span>Read before using</span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
