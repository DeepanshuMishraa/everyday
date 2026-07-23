import MiniSearch from "minisearch";
import type { CatalogSkill } from "@/lib/types";

type SearchRecord = CatalogSkill & { id: string; aliases: string };

const stopWords = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "can",
  "do",
  "don",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "know",
  "me",
  "my",
  "of",
  "on",
  "please",
  "the",
  "this",
  "to",
  "want",
  "what",
  "when",
  "with",
]);

const aliases: Record<string, string> = {
  "audit-subscriptions":
    "netflix spotify streaming membership recurring charge unused app stop paying cancel service",
  "direct-a-product-launch-film":
    "product launch video motion design promo trailer teaser saas app demo hyperframes music storyboard animation",
  "build-a-bedtime-routine":
    "can't sleep sleep schedule late night evening routine phone at night wind down",
  "check-a-suspicious-message":
    "is this fake spam strange email suspicious link fraud scam text impersonation",
  "clean-your-home-fast":
    "messy house quick tidy room cleanup guests coming overwhelmed by mess",
  "compare-a-big-purchase":
    "should I buy expensive product appliance car laptop value for money shopping comparison",
  "cook-with-what-you-have":
    "fridge ingredients pantry leftovers dinner lunch recipe hungry food tonight",
  "cool-down-an-angry-message":
    "fight argument partner spouse conflict furious rage should I send this text",
  "coordinate-family-care":
    "elderly parent child care pet sitter caregiver family schedule handoff recovery support",
  "get-a-return-or-refund":
    "refund denied return rejected seller complaint money back damaged order wrong item",
  "get-unstuck":
    "too much to do frozen overwhelmed brain dump unclear where to start next action first step",
  "handle-a-home-repair":
    "leak broken appliance landlord plumber electrician damage house problem emergency",
  "learn-by-doing":
    "study exam understand topic practice new subject teach me tutorial remember",
  "make-a-hard-decision":
    "can't decide options pros cons uncertain choice choose between two things",
  "move-more-at-your-desk":
    "sitting all day office stretch screen break eye strain sedentary workday",
  "organize-monthly-bills":
    "rent utilities due dates paycheck cash flow pay bills monthly expenses",
  "pack-for-a-trip":
    "holiday vacation suitcase luggage what should I bring travel checklist",
  "plan-a-gathering":
    "party dinner guests birthday host people coming over event menu",
  "plan-a-home-move":
    "moving house apartment relocate boxes utilities address movers shift home",
  "plan-weeknight-meals":
    "weekly menu grocery list family dinner meal prep food shopping",
  "plan-your-week":
    "sunday reset weekly planning calendar organize next week life admin",
  "prepare-for-an-appointment":
    "doctor dentist meeting consultation school appointment questions documents medical visit",
  "prepare-for-travel-delays":
    "flight cancelled missed connection airport delay lost luggage travel emergency",
  "restart-a-habit":
    "fell off routine broke streak start again consistency stopped habit",
  "restart-a-personal-project":
    "unfinished side project abandoned hobby stalled finish something scope",
  "restart-working-out":
    "back to gym missed workouts exercise after break fitness restart training lapse",
  "set-a-boundary":
    "say no pushy person pressure family partner limit refuse request stand up for myself",
  "shorten-a-workout":
    "quick gym session no time exercise short workout limited equipment tired training",
  "split-household-chores":
    "partner chores unfair housework roommate cleaning mental load who does what",
  "understand-paperwork":
    "confusing form official letter notice application deadline documents explain letter",
  "write-an-apology":
    "say sorry hurt someone made mistake repair relationship take responsibility forgiveness",
};

function processTerm(term: string) {
  const normalized = term.toLocaleLowerCase().replace(/^['’]+|['’]+$/g, "");
  return normalized.length > 1 && !stopWords.has(normalized)
    ? normalized
    : null;
}

export function createSkillSearch(skills: CatalogSkill[]) {
  const index = new MiniSearch<SearchRecord>({
    fields: ["title", "description", "outcome", "examples", "tags", "aliases"],
    storeFields: ["slug"],
    processTerm,
    searchOptions: {
      boost: { title: 4, aliases: 3, tags: 2.5, examples: 1.5 },
      fuzzy: 0.2,
      prefix: true,
    },
  });
  index.addAll(
    skills.map((skill) => ({
      ...skill,
      id: skill.slug,
      aliases: aliases[skill.slug] ?? "",
    })),
  );
  return index;
}

export function searchSkills(
  index: ReturnType<typeof createSkillSearch>,
  skills: CatalogSkill[],
  query: string,
) {
  if (!query.trim()) return skills;
  const bySlug = new Map(skills.map((skill) => [skill.slug, skill]));
  return index
    .search(query)
    .map((result) => bySlug.get(result.slug))
    .filter((skill): skill is CatalogSkill => Boolean(skill));
}
