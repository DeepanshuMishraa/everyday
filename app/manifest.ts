import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Everyday — Practical AI Agent Skills",
    short_name: "Everyday",
    description: "A free library of practical, installable AI agent skills for daily life.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0e7",
    theme_color: "#d94a2f",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
