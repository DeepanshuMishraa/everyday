import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/catalog/categories";
import { CopyButton, DownloadButton } from "@/components/SkillActions";
import { SkillDocumentView } from "@/components/SkillDocumentView";
import { SkillUseActions } from "@/components/SkillUseActions";
import { EvaluationReportView } from "@/components/EvaluationReportView";
import { JsonLd } from "@/components/JsonLd";
import { PilotPanel } from "@/components/PilotPanel";
import { getPilotForSkill } from "@/lib/pilot";
import { getAllSkills, getSkill } from "@/lib/skills";
import {
  absoluteUrl,
  breadcrumbSchema,
  metaDescription,
  site,
} from "@/lib/site";
import {
  accentClass,
  breadcrumb,
  container,
  eyebrow,
  heading,
  tag,
  textLink,
} from "@/lib/tailwind";

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllSkills().map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return {};
  const title = `${skill.title} Practical Workflow`;
  const description = metaDescription(
    `${skill.outcome} Free, step-by-step guidance you can read now or reuse with an AI agent.`,
  );
  const path = `/skills/${skill.slug}/`;
  return {
    title,
    description,
    keywords: [...skill.tags, skill.title, "AI agent skill", "SKILL.md"],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: `${title} | Everyday`,
      description,
      modifiedTime: skill.updated,
      images: [
        {
          url: `${path}opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${skill.title} — an Everyday practical workflow`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Everyday`,
      description,
      images: [`${path}opengraph-image`],
    },
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();
  const category = categories.find((item) => item.slug === skill.category);
  if (!category) notFound();
  const install = `npx skills add ${site.repository}@${skill.slug}`;
  const pilot = getPilotForSkill(skill.slug, skill.hash);
  const installationCommand = pilot?.installCommand ?? install;
  const installationTarget = installationCommand.replace("npx skills add ", "");
  const reportMatches =
    skill.evaluation?.skillHash === skill.hash &&
    skill.evaluation?.suiteHash === skill.suiteHash;
  const reviewed =
    reportMatches && skill.evaluation?.status === "instruction-review-pass";
  const path = `/skills/${skill.slug}/`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "DigitalDocument",
              "@id": `${absoluteUrl(path)}#workflow`,
              name: skill.title,
              description: skill.description,
              url: absoluteUrl(path),
              inLanguage: site.language,
              encodingFormat: "text/markdown",
              isAccessibleForFree: true,
              dateModified: skill.updated,
              isPartOf: { "@id": `${site.url}/#website` },
              about: skill.tags,
              mainEntityOfPage: absoluteUrl(path),
            },
            breadcrumbSchema([
              { name: "Everyday", path: "/" },
              { name: "Workflows", path: "/skills/" },
              { name: category.name, path: `/categories/${category.slug}/` },
              { name: skill.title, path },
            ]),
          ],
        }}
      />
      <div className={container}>
        <nav className={breadcrumb} aria-label="Breadcrumb">
          <Link href="/skills">Workflows</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/categories/${category.slug}`}>{category.name}</Link>
          <span aria-hidden="true">/</span>
          <span>{skill.title}</span>
        </nav>
      </div>
      <header
        className={`border-b border-line py-[76px] pb-20 max-[720px]:pb-[60px] max-[720px]:pt-[52px] ${accentClass[category.color]}`}
      >
        <div
          className={`${container} grid grid-cols-[minmax(0,1fr)_300px] items-end gap-[clamp(64px,7vw,96px)] max-[980px]:grid-cols-1 max-[980px]:gap-8`}
        >
          <div>
            <p className={eyebrow}>{category.name}</p>
            <h1
              className={`${heading.h1} max-w-[16ch] text-[clamp(2.8rem,4.8vw,4.25rem)]`}
            >
              {skill.title}
            </h1>
            <p className="mt-8 max-w-[46ch] text-pretty text-lg leading-[1.78] text-ink-2">
              {skill.description}
            </p>
            <div
              className="mt-6 flex flex-wrap items-center gap-1.5 font-ui"
              aria-label="Workflow topics"
            >
              {skill.tags.slice(0, 4).map((itemTag) => (
                <span className={tag} key={itemTag}>
                  {itemTag}
                </span>
              ))}
            </div>
            <SkillUseActions slug={skill.slug} />
          </div>
          <div className="grid gap-4">
            <section className="rounded-lg border border-line bg-surface p-4 [&_button]:w-full">
              <h2 className="mb-3 text-balance font-ui text-[0.7rem] font-bold text-ink-2">
                {pilot ? "Install the pilot" : "Install this workflow"}
              </h2>
              <code className="grid gap-1 rounded-md bg-dark px-3.5 py-3 font-mono text-[0.68rem] leading-[1.55] selection:bg-zinc-700">
                <span className="text-zinc-400">npx skills add</span>
                <span className="break-all text-zinc-100">
                  {installationTarget}
                </span>
              </code>
              <div className="mt-2.5">
                <CopyButton
                  value={installationCommand}
                  label={pilot ? "Copy tagged command" : "Copy install command"}
                  event="install_command_copy"
                  skill={skill.slug}
                  variant="compact"
                />
              </div>
            </section>
            <aside className="rounded-lg border border-line bg-surface p-5 max-[480px]:p-[18px]">
              <span className="mb-2.5 block font-ui text-xs font-bold text-ink-2">
                What you will leave with
              </span>
              <p className="m-0 text-base font-medium leading-[1.5]">
                {skill.outcome}
              </p>
            </aside>
          </div>
        </div>
      </header>
      {pilot ? (
        <div className={container}>
          <PilotPanel pilot={pilot} />
        </div>
      ) : null}
      <div
        className={`${container} grid grid-cols-[minmax(0,1fr)_minmax(270px,310px)] items-start gap-[clamp(40px,5vw,64px)] pt-14 max-[980px]:grid-cols-1 max-[980px]:gap-0 max-[720px]:pt-9`}
      >
        <div className="min-w-0">
          <SkillDocumentView body={skill.body} files={skill.files} />
          <EvaluationReportView
            report={skill.evaluation}
            scenarios={skill.evaluationScenarios}
            current={reportMatches}
          />
        </div>
        <aside className="sticky top-[calc(var(--header-h)+24px)] border-l border-line pb-6 pl-7 max-[980px]:static max-[980px]:border-l-0 max-[980px]:border-t max-[980px]:pl-0 max-[980px]:pt-9 [&>section]:pb-8 [&>section+section]:border-t [&>section+section]:border-line [&>section+section]:pt-8 [&>section:last-child]:pb-0 [&_h2]:mb-[18px] [&_h2]:font-ui [&_h2]:text-xs [&_h2]:font-bold [&_h2]:leading-[1.4] [&_h2]:tracking-[0.02em] [&_h2]:text-ink-2 [&_ul]:m-0 [&_ul]:list-none [&_ul]:p-0 [&_li]:py-[13px] [&_li]:text-base [&_li]:leading-[1.55] [&_li]:text-ink-body [&_li+li]:border-t [&_li+li]:border-dashed [&_li+li]:border-line [&_button]:mt-2 [&_button]:min-h-11 [&_button]:w-full [&_button]:text-[0.8rem]">
          <section>
            <h2>Try asking your agent</h2>
            <ul>
              {skill.examples.map((example) => (
                <li key={example}>“{example}”</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>{pilot ? "Pilot package" : "Package options"}</h2>
            <p className="-mt-1 mb-[18px] text-[0.95rem] leading-[1.6] text-ink-2">
              {pilot
                ? "Inspect the pinned source used by the pilot."
                : "Download the complete folder or inspect its source before installing."}
            </p>
            {!pilot ? (
              <DownloadButton files={skill.files} slug={skill.slug} />
            ) : null}
            <CopyButton
              value={skill.markdown}
              label={pilot ? "Copy source to inspect" : "Copy source file"}
              event="skill_copy"
              skill={skill.slug}
            />
          </section>
          <section>
            <h2>About this workflow</h2>
            <dl className="m-0 font-ui [&>div]:grid [&>div]:grid-cols-[minmax(0,1fr)_auto] [&>div]:items-baseline [&>div]:gap-4 [&>div]:py-2.5 [&_dt]:text-[0.76rem] [&_dt]:text-ink-2 [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.72rem] [&_dd]:font-medium [&_dd]:text-ink">
              <div>
                <dt>Review</dt>
                <dd>
                  <span
                    className={`inline-flex items-center gap-[7px] text-[0.76rem] font-bold before:size-1.5 before:rounded-full before:bg-current before:content-[''] ${reviewed ? "text-green" : "text-amber"}`}
                  >
                    {reviewed ? "Guidance reviewed" : "Review pending"}
                  </span>
                </dd>
              </div>
              <div>
                <dt>Version</dt>
                <dd>{skill.version}</dd>
              </div>
              <div>
                <dt>References</dt>
                <dd>{skill.fileCount}</dd>
              </div>
              <div>
                <dt>Updated</dt>
                <dd>{skill.updated}</dd>
              </div>
            </dl>
            <Link
              className={`${textLink} mt-[18px] inline-block font-ui text-[0.76rem]`}
              href="/methodology"
            >
              How reviews work →
            </Link>
          </section>
        </aside>
      </div>
    </>
  );
}
