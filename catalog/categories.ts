import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "food-and-home",
    name: "Food & home",
    shortName: "At home",
    description:
      "Meals, maintenance, hosting, and restoring order when real life gets in the way.",
    color: "ochre",
  },
  {
    slug: "life-administration",
    name: "Life administration",
    shortName: "Life admin",
    description:
      "Paperwork, appointments, moves, and the invisible coordination that keeps a week running.",
    color: "blue",
  },
  {
    slug: "money-and-consumer",
    name: "Money & consumer protection",
    shortName: "Money",
    description:
      "Practical systems for bills, purchases, subscriptions, refunds, and suspicious messages.",
    color: "red",
  },
  {
    slug: "relationships-and-care",
    name: "Relationships & shared care",
    shortName: "Together",
    description:
      "Clearer repair, boundaries, household ownership, and non-clinical care coordination.",
    color: "plum",
  },
  {
    slug: "sustainable-health",
    name: "Sustainable health routines",
    shortName: "Routines",
    description:
      "Conservative, non-clinical routines for movement, sleep preparation, and restarting habits.",
    color: "green",
  },
  {
    slug: "decisions-learning-travel",
    name: "Decisions, learning & travel",
    shortName: "Out in the world",
    description:
      "Better decisions, finishable projects, active learning, and resilient travel preparation.",
    color: "ink",
  },
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
