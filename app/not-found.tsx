import Link from "next/link";

export default function NotFound() {
  return <section className="narrow-page"><p className="eyebrow">404</p><h1>That procedure is not in the field guide.</h1><p>Try the library or search for the situation in your own words.</p><Link className="button primary" href="/">Browse all skills</Link></section>;
}
