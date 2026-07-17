import Link from "next/link";

export default function NotFound() {
  return <section className="narrow-page"><p className="eyebrow">404 · Everyday</p><h1>That skill is not in the library.</h1><p>Try searching for the situation in your own words.</p><Link className="button primary" href="/">Browse all skills</Link></section>;
}
