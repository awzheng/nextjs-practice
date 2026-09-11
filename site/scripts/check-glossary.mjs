/**
 * Validates glossary.md against the keywords actually used in app/page.tsx.
 *
 *   npm run check
 *
 * Reports, in order: parse problems (missing separator, duplicates), keywords
 * used on the page with no definition, and definitions that nothing uses.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { normalize, parseGlossary } from "../lib/parseGlossary.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const { glossary, issues } = parseGlossary(readFileSync(join(root, "glossary.md"), "utf8"));

// Collect <K k="term">…</K> and <K>text</K> from the page.
const page = readFileSync(join(root, "app/page.tsx"), "utf8");
const used = new Map(); // normalized term -> display term
let inlineWhy = 0;
for (const m of page.matchAll(/<K(\s[^>]*?)?>([\s\S]*?)<\/K>/g)) {
  const attrs = m[1] ?? "";
  if (/\bwhy=/.test(attrs)) {
    inlineWhy++;
    continue; // has its own explanation, does not need glossary.md
  }
  const explicit = /\bk="([^"]*)"/.exec(attrs)?.[1];
  const text = m[2]
    .replace(/\{[^}]*\}/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  const term = explicit ?? text;
  used.set(normalize(term), term);
}

const undefinedTerms = [...used].filter(([key]) => !glossary[key]);
const unusedTerms = Object.values(glossary).filter((e) => !used.has(normalize(e.term)));

const line = (s) => console.log(s);
line(`glossary.md      ${Object.keys(glossary).length} definitions`);
line(`app/page.tsx     ${used.size} unique keywords (${inlineWhy} inline)`);

if (issues.length) {
  line(`\nparse problems (${issues.length}):`);
  issues.forEach((i) => line(`  ! ${i}`));
}
if (undefinedTerms.length) {
  line(`\nused on the page but not defined (${undefinedTerms.length}):`);
  undefinedTerms.forEach(([, t]) => line(`  x ${t}`));
}
if (unusedTerms.length) {
  line(`\ndefined but never used (${unusedTerms.length}):`);
  unusedTerms.forEach((e) => line(`  - ${e.term}${e.group ? `  [${e.group}]` : ""}`));
}

const broken = issues.length + undefinedTerms.length;
line(broken === 0 ? "\nOK" : `\n${broken} problem(s) to fix`);
process.exit(broken === 0 ? 0 : 1);
