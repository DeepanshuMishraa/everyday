"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";

export function TrackedBrowseLink() {
  return <Link className="button primary hero-browse" href="/skills" onClick={() => track("browse_library", { source: "home_hero" })}>Browse the field guide</Link>;
}
