import type { CatalogSkill } from "@/lib/types";

const millisecondsPerDay = 24 * 60 * 60 * 1000;

function startOfUtcDay(value: Date) {
  return Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate());
}

export function wasAddedWithinDays(
  added: string,
  days: number,
  now: Date = new Date(),
) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(added) || days <= 0) return false;
  const addedAt = new Date(`${added}T00:00:00.000Z`);
  if (Number.isNaN(addedAt.getTime())) return false;
  const ageInDays =
    (startOfUtcDay(now) - startOfUtcDay(addedAt)) / millisecondsPerDay;
  return ageInDays >= 0 && ageInDays < days;
}

export function getNewSkills(
  skills: CatalogSkill[],
  days = 4,
  now: Date = new Date(),
) {
  return skills
    .filter((skill) => wasAddedWithinDays(skill.added, days, now))
    .sort(
      (left, right) =>
        right.added.localeCompare(left.added) ||
        left.title.localeCompare(right.title),
    );
}
