export const site = {
  name: "Everyday",
  legalName: "Everyday Agent Skills",
  description: "A free library of practical AI agent skills for cooking, workouts, home, money, relationships, travel, learning, and everyday life.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://everyday-agent-skills.vercel.app").replace(/\/$/, ""),
  repository: process.env.NEXT_PUBLIC_SKILLS_REPOSITORY ?? "DeepanshuMishraa/everyday-agent-skills",
  repositoryUrl: "https://github.com/DeepanshuMishraa/everyday-agent-skills",
  locale: "en_US",
  language: "en",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${site.url}/`).toString();
}

export function metaDescription(value: string, max = 158) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
