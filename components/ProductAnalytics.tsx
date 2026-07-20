"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

type AnalyticsStorageResult = { ok: true } | { ok: false };

function recordReturnVisit(): AnalyticsStorageResult {
  try {
    const local = window.localStorage;
    const session = window.sessionStorage;
    if (session.getItem("everyday-return-recorded") === "true") return { ok: true };
    const now = Date.now();
    const previous = Number(local.getItem("everyday-last-visit"));
    local.setItem("everyday-last-visit", String(now));
    session.setItem("everyday-return-recorded", "true");
    if (Number.isFinite(previous) && previous > 0 && now > previous) {
      track("return_visit", { window: returnWindow(now - previous) });
    }
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

function returnWindow(elapsed: number) {
  const day = 24 * 60 * 60 * 1000;
  if (elapsed < day) return "same_day";
  if (elapsed < 7 * day) return "2_to_7_days";
  if (elapsed < 30 * day) return "8_to_30_days";
  return "over_30_days";
}

export function ProductAnalytics() {
  useEffect(() => {
    recordReturnVisit();
  }, []);

  return null;
}
