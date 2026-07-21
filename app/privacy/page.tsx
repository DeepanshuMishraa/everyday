import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Everyday uses product analytics and stores saved and recently viewed workflows in your browser.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return <><JsonLd data={{ "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": absoluteUrl("/privacy/"), name: "Everyday privacy", description: "How Everyday uses analytics and browser storage.", url: absoluteUrl("/privacy/"), isPartOf: { "@id": `${site.url}/#website` }, inLanguage: site.language },
    breadcrumbSchema([{ name: "Everyday", path: "/" }, { name: "Privacy", path: "/privacy/" }]),
  ] }} /><article className="wrap policy-page"><p className="eyebrow">Privacy — plain language</p><h1>Your situations are personal.</h1><p>Everyday uses Vercel Analytics to understand page visits and a small set of product actions, such as opening, starting, saving, or installing a workflow.</p><h2>Searches</h2><p>Our custom analytics events record whether a search was used, its length, and result count. They do not include the words you typed.</p><h2>Saved and recent workflows</h2><p>Saved and recently viewed workflows stay in your browser&apos;s local storage. Everyday has no account system and does not receive that list.</p><h2>Your control</h2><p>You can remove saved and recent data by clearing this site&apos;s browser storage. If storage is unavailable, every workflow remains readable.</p></article></>;
}
