import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseGlossary, type Glossary } from "./parseGlossary";

export const GLOSSARY_PATH = join(process.cwd(), "glossary.md");

let cached: Glossary | null = null;

/**
 * Read and parse glossary.md. Server-only — it touches the filesystem.
 *
 * In development the file is re-read on every request so a browser refresh
 * picks up edits (Next does not watch non-imported files). In production it
 * is read once during the static build.
 */
export function loadGlossary(): Glossary {
  if (cached && process.env.NODE_ENV === "production") return cached;

  const { glossary, issues } = parseGlossary(readFileSync(GLOSSARY_PATH, "utf8"));

  for (const issue of issues) {
    console.warn(`[glossary.md] ${issue}`);
  }

  cached = glossary;
  return glossary;
}
