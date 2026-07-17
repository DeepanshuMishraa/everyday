import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Everyday — practical skills for everyday agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 72px", background: "#f7f7f5", color: "#171719", fontFamily: "Arial, sans-serif", border: "16px solid #efefec" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 20 }}>
        <span style={{ fontSize: 27, fontWeight: 600, letterSpacing: -1.2 }}>every/day</span>
        <span style={{ color: "#777772" }}>Open agent skill library</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 970 }}>
        <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.03, letterSpacing: -3.4 }}>Practical skills for everyday life.</div>
        <div style={{ fontSize: 25, lineHeight: 1.48, maxWidth: 860, color: "#62625e" }}>Thirty open, installable procedures for cooking, workouts, paperwork, shared care, money routines, and travel.</div>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid #dbdbd6", fontSize: 20, color: "#777772" }}>
        <span style={{ display: "flex", gap: 5 }}><span style={{ color: "#171719", fontWeight: 600 }}>30</span><span>reviewed skills</span></span>
        <span>Browse · inspect · install</span>
      </div>
    </div>,
    size,
  );
}
