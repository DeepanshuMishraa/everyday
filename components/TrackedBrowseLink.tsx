"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { button } from "@/lib/tailwind";

export function TrackedBrowseLink() {
  return (
    <Link
      className={`${button.primary} min-h-[52px] px-6 max-[480px]:min-h-[50px] max-[480px]:w-full`}
      href="/skills"
      onClick={() => track("browse_library", { source: "home_hero" })}
    >
      Browse the field guide
    </Link>
  );
}
