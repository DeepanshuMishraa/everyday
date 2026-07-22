import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Everyday — Practical Workflows",
    short_name: "Everyday",
    description: "A free library of short, practical workflows for daily life.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#131316",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
