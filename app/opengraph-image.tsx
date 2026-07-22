import { ImageResponse } from "next/og";
import { getAllSkills } from "@/lib/skills";

export const dynamic = "force-static";

export const alt = "Everyday — practical workflows for real life";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const skillCount = getAllSkills().length;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "68px 72px",
        background: "#f7f7f5",
        color: "#171719",
        fontFamily: "Arial, sans-serif",
        border: "16px solid #efefec",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 20,
        }}
      >
        <span style={{ fontSize: 27, fontWeight: 600, letterSpacing: -1.2 }}>
          every/day
        </span>
        <span style={{ color: "#777772" }}>Practical workflow library</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 970,
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.03,
            letterSpacing: -3.4,
          }}
        >
          Remember what works, right when you need it.
        </div>
        <div
          style={{
            fontSize: 25,
            lineHeight: 1.48,
            maxWidth: 860,
            color: "#62625e",
          }}
        >
          {`${skillCount} short, practical workflows for recurring situations in everyday life.`}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 24,
          borderTop: "1px solid #dbdbd6",
          fontSize: 20,
          color: "#777772",
        }}
      >
        <span style={{ display: "flex", gap: 5 }}>
          <span style={{ color: "#171719", fontWeight: 600 }}>
            {skillCount}
          </span>
          <span>practical workflows</span>
        </span>
        <span>Find · start · reuse</span>
      </div>
    </div>,
    size,
  );
}
