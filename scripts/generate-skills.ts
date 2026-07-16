import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { skills } from "../catalog/skills";
import { specs } from "../catalog/specs";

const root = process.cwd();

function render(slug: string) {
  const skill = skills.find((item) => item.slug === slug);
  const spec = specs[slug];
  if (!skill || !spec) throw new Error(`Missing metadata or specification for ${slug}`);

  const lines = [
    "---",
    `name: ${skill.slug}`,
    "description: >-",
    `  ${skill.description}`,
    "---",
    "",
    `# ${skill.title}`,
    "",
    "## Objective",
    "",
    spec.objective,
    "",
    "Recommend one primary path before optional alternatives. Preserve the user's agency, state assumptions, and label uncertainty.",
    "",
    "## Intake",
    "",
    "Collect only information that changes the recommendation:",
    "",
    ...spec.intake.map((item) => `- ${item}`),
    "",
    "If essential information is missing, ask the smallest useful set of questions. Otherwise, state reasonable assumptions and proceed.",
    "",
    "## Workflow",
    "",
    ...spec.workflow.flatMap((step, index) => [
      `### ${index + 1}. ${step.name}`,
      "",
      step.instruction,
      "",
    ]),
    "## Decision Rules",
    "",
    ...spec.rules.map((item) => `- ${item}`),
    "- When two options are close, prefer the simpler and more reversible one.",
    "- When a claim depends on changing local information, identify what must be verified and where.",
    "",
    "## Safety and Boundaries",
    "",
    ...spec.boundaries.map((item) => `- ${item}`),
    "- Do not invent facts, permissions, professional conclusions, or actions already completed.",
    "- Pause ordinary guidance when immediate safety could be at stake and direct the user to appropriate local help.",
    "",
    "## Output Contract",
    "",
    "Return a concise, action-ready result in this order:",
    "",
    ...spec.output.map((item, index) => `${index + 1}. **${item}.** Give the minimum detail needed to act or verify.`),
    "",
    "End with the next action the user can take now. Do not append a generic offer to help further.",
    "",
    "## Quality Checklist",
    "",
    "Before responding, verify that:",
    "",
    "- The recommendation fits the user's stated time, capacity, location, and constraints.",
    "- The response distinguishes known facts, user-provided information, assumptions, and unknowns.",
    "- The first recommended path is visible before optional alternatives.",
    "- Every question, step, and warning materially changes safe execution.",
    "- The output follows the contract and has an observable finish line.",
    "- Sensitive or high-stakes issues stay inside the stated boundaries.",
    "- The user retains final decisions and can revise or stop the plan.",
    "",
  ];
  return lines.join("\n");
}

for (const skill of skills) {
  const directory = path.join(root, "skills", skill.slug);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "SKILL.md"), render(skill.slug), "utf8");
  fs.writeFileSync(
    path.join(root, "catalog", `${skill.slug}.yaml`),
    yaml.dump(skill, { lineWidth: 100, noRefs: true, sortKeys: false }),
    "utf8",
  );
}

console.log(`Generated ${skills.length} skill files and catalog records.`);
