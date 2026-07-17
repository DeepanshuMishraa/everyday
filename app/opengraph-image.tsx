import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Everyday — practical skills for everyday agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 76px", background: "#f4f0e7", color: "#1d1c19", border: "18px solid #1d1c19", fontFamily: "Georgia, serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Arial, sans-serif", fontSize: 24, letterSpacing: 3, textTransform: "uppercase" }}>
        <span>Everyday</span><span style={{ color: "#d94a2f" }}>30 open skills · edition 01</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 980 }}>
        <div style={{ fontSize: 92, lineHeight: 0.98, letterSpacing: -4 }}>Practical skills for everyday agents.</div>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 27, lineHeight: 1.4, maxWidth: 860 }}>Cooking, workouts, home, money, relationships, learning, travel, and the life administration in between.</div>
      </div>
      <div style={{ display: "flex", gap: 16, fontFamily: "Arial, sans-serif", fontSize: 20 }}><span>Browse.</span><span>Inspect.</span><span>Install.</span></div>
    </div>,
    size,
  );
}
