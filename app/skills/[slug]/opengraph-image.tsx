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
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 76px", background: "#0c0c0e", color: "#fafafa", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 21, letterSpacing: 4, textTransform: "uppercase", color: "#71717a" }}>
        <span>Everyday — AI agent skill</span>
        <span style={{ display: "flex", alignItems: "center", gap: 10, color: "#0e9f6e" }}><span style={{ width: 10, height: 10, borderRadius: 10, background: "#0e9f6e" }} />v{skill.version}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 1020 }}>
        <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.02, letterSpacing: -3 }}>{skill.title}</div>
        <div style={{ fontSize: 25, lineHeight: 1.5, maxWidth: 940, color: "#a1a1aa" }}>{skill.outcome}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 21 }}>
        <span style={{ fontFamily: "monospace", color: "#a1a1aa", border: "1px solid #27272a", borderRadius: 10, padding: "12px 20px" }}>$ npx skills add</span>
        <span style={{ color: "#71717a" }}>Open package · inspectable</span>
      </div>
    </div>,
    size,
  );
}
