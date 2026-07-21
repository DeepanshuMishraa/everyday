import { formatSkillPackageReadError, hashSkillPackage, readSkillPackageDirectory } from "../lib/skills/package";

const directories = process.argv.slice(2);
if (directories.length !== 1) {
  console.error("Usage: npm run hash-skill -- <skill-directory>");
  process.exitCode = 2;
} else {
  const result = readSkillPackageDirectory(directories[0]);
  if (!result.ok) {
    console.error(formatSkillPackageReadError(result.error));
    process.exitCode = 1;
  } else {
    console.log(hashSkillPackage(result.files));
  }
}
