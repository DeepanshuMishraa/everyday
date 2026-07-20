import Link from "next/link";

export default function NotFound() {
  return <section className="wrap narrow-page"><p className="eyebrow">404 — Everyday</p><h1>That workflow is not in the library.</h1><p>Try searching for the situation in your own words.</p><Link className="button primary" href="/skills">Browse all workflows</Link></section>;
}
