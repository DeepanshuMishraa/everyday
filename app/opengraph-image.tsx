import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Everyday — practical skills for everyday agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 76px", background: "#0c0c0e", color: "#fafafa", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 21, letterSpacing: 4, textTransform: "uppercase", color: "#71717a" }}>
        <span>Everyday — practical agent skills</span>
        <span style={{ display: "flex", alignItems: "center", gap: 10, color: "#0e9f6e" }}><span style={{ width: 10, height: 10, borderRadius: 10, background: "#0e9f6e" }} />30 skills · current</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 1000 }}>
        <div style={{ fontSize: 86, fontWeight: 600, lineHeight: 1.02, letterSpacing: -4 }}>Give your agent skills for real life.</div>
        <div style={{ fontSize: 26, lineHeight: 1.5, maxWidth: 860, color: "#a1a1aa" }}>Thirty open, installable procedures for cooking, workouts, paperwork, shared care, money routines, and travel.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 21 }}>
        <span style={{ fontFamily: "monospace", color: "#a1a1aa", border: "1px solid #27272a", borderRadius: 10, padding: "12px 20px" }}>$ npx skills add</span>
        <span style={{ color: "#71717a" }}>Browse · Inspect · Install</span>
      </div>
    </div>,
    size,
  );
}
