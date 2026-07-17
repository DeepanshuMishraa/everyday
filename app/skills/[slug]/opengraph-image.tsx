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
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 76px", background: "#f4f0e7", color: "#1d1c19", border: "18px solid #1d1c19", fontFamily: "Georgia, serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Arial, sans-serif", fontSize: 23, letterSpacing: 3, textTransform: "uppercase" }}><span>Everyday</span><span style={{ color: "#d94a2f" }}>AI agent skill</span></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 1010 }}>
        <div style={{ fontSize: 78, lineHeight: 1, letterSpacing: -3 }}>{skill.title}</div>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 26, lineHeight: 1.4, maxWidth: 940 }}>{skill.outcome}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Arial, sans-serif", fontSize: 20 }}><span>Open package · v{skill.version}</span><span>everyday agent skills</span></div>
    </div>,
    size,
  );
}
