import Link from "next/link";
import { button, container, eyebrow, heading } from "@/lib/tailwind";

export default function NotFound() {
  return (
    <section className={`${container} py-[152px] max-[480px]:py-16`}>
      <p className={eyebrow}>404 — Everyday</p>
      <h1 className={`${heading.h1} max-w-[16ch]`}>
        That workflow is not in the library.
      </h1>
      <p className="my-[1.2rem] mb-[1.8rem] text-base text-ink-2">
        Try searching for the situation in your own words.
      </p>
      <Link className={button.primary} href="/skills">
        Browse all workflows
      </Link>
    </section>
  );
}
