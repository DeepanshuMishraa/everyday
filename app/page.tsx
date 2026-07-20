import { JsonLd } from "@/components/JsonLd";
import { TrackedBrowseLink } from "@/components/TrackedBrowseLink";
import { absoluteUrl, site } from "@/lib/site";

export default function Home() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", "@id": absoluteUrl("/"), name: "Everyday — practical workflows for real life", description: site.description, url: absoluteUrl("/"), isPartOf: { "@id": `${site.url}/#website` }, inLanguage: site.language }} />
    <section className="home-hero">
      <div className="wrap home-hero-grid">
        <div className="home-hero-copy">
          <p className="eyebrow rise">A field guide for everyday life</p>
          <h1 className="rise rise-1">Know what to do next.</h1>
          <p className="hero-deck rise rise-2">Thirty practical workflows for the moments that drain your time: difficult messages, household admin, meals, money, health, and getting unstuck.</p>
          <div className="hero-actions rise rise-3">
            <TrackedBrowseLink />
          </div>
          <div className="hero-proof rise rise-3" aria-label="Free to read, no account required, human-readable guidance">
            <span>Free to read</span><span>No account</span><span>Use it immediately</span>
          </div>
        </div>
        <aside className="hero-index rise rise-2" aria-label="Examples from the workflow library">
          <div className="hero-index-head">
            <span>Start with your situation</span>
            <strong>30 workflows</strong>
          </div>
          <div className="hero-index-intro">
            <span>What are you dealing with?</span>
            <p>Search in your own words. Leave with a clear next step.</p>
          </div>
          <div className="hero-index-list">
            <div><span className="hero-index-number">01</span><strong>I got a suspicious message</strong><span className="hero-index-tag">Safety</span></div>
            <div><span className="hero-index-number">02</span><strong>I need dinner from what I have</strong><span className="hero-index-tag">Food</span></div>
            <div><span className="hero-index-number">03</span><strong>I feel overwhelmed and stuck</strong><span className="hero-index-tag">Thinking</span></div>
          </div>
          <div className="hero-index-foot"><span>Plain-language guidance</span><span>Read before using</span></div>
        </aside>
      </div>
    </section>
  </>;
}
