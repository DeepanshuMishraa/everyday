import { ImageResponse } from "next/og";
import { getAllSkills, getSkill } from "@/lib/skills";

export const alt = "An Everyday AI agent skill";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() { return getAllSkills().map(({ slug }) => ({ slug })); }

export default async function SkillOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug)!;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 72px", background: "#f7f7f5", color: "#171719", fontFamily: "Arial, sans-serif", border: "16px solid #efefec" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 20 }}>
        <span style={{ fontSize: 27, fontWeight: 600, letterSpacing: -1.2 }}>every/day</span>
        <span style={{ color: "#777772" }}>AI agent skill · v{skill.version}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1010 }}>
        <div style={{ fontSize: skill.title.length > 32 ? 66 : 74, fontWeight: 600, lineHeight: 1.03, letterSpacing: -3 }}>{skill.title}</div>
        <div style={{ fontSize: 24, lineHeight: 1.48, maxWidth: 920, color: "#62625e" }}>{skill.outcome}</div>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid #dbdbd6", fontSize: 20, color: "#777772" }}>
        <span>Open package</span>
        <span>Inspect before installing</span>
      </div>
    </div>,
    size,
  );
}
