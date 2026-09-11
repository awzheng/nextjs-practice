/**
 * Parser for glossary.md.
 *
 * Pure and filesystem-free so it can run in a build, a script, or a test.
 * The format is deliberately forgiving:
 *
 *   - Definitions are `-` list items underneath a `##` section heading.
 *   - Everything before the first `##` is treated as notes and ignored, so the
 *     file can carry its own instructions.
 *   - Fenced code blocks are skipped.
 *   - Non-list lines inside a section are ignored, so prose is safe to add.
 */

export type GlossaryEntry = {
  /** Display form, as written in the markdown. */
  term: string;
  /** The one-line reason. */
  why: string;
  /** Nearest preceding heading. */
  group: string;
};

/** Keyed by normalized term. */
export type Glossary = Record<string, GlossaryEntry>;

export type ParseResult = {
  glossary: Glossary;
  /** Human-readable problems, each prefixed with the source line number. */
  issues: string[];
};

/** Case-insensitive, whitespace-collapsed lookup key. */
export function normalize(term: string): string {
  return term.trim().replace(/\s+/g, " ").toLowerCase();
}

const HEADING = /^(#{1,6})\s+(.*)$/;
const FENCE = /^(?:```|~~~)/;
const LIST_ITEM = /^[-*+]\s+(.*)$/;
const BOLD_TERM = /^\*\*(.+?)\*\*\s*(.*)$/;
/** First ` — `, ` – `, ` - ` or ` : ` on the line separates term from reason. */
const SEPARATOR = /\s+[—–:-]\s+/;

export function parseGlossary(source: string): ParseResult {
  const glossary: Glossary = {};
  const issues: string[] = [];
  let group = "";
  let inSection = false;
  let fenced = false;

  source.split(/\r?\n/).forEach((raw, i) => {
    const line = raw.trim();
    const at = i + 1;

    if (FENCE.test(line)) {
      fenced = !fenced;
      return;
    }
    if (fenced) return;

    const heading = HEADING.exec(line);
    if (heading) {
      const depth = heading[1].length;
      group = heading[2].replace(/\s*#+\s*$/, "").trim();
      // Definitions start at the first `##`; anything above it is notes.
      if (depth >= 2) inSection = true;
      return;
    }

    if (!inSection) return;

    const item = LIST_ITEM.exec(line);
    if (!item) return; // prose, notes, blank lines
    const body = item[1].trim();
    if (!body) return;

    // `**term** — why` or `term — why`
    let term: string;
    let why: string;
    const bold = BOLD_TERM.exec(body);
    if (bold) {
      term = bold[1];
      why = bold[2].replace(/^\s*[—–:-]\s*/, "");
    } else {
      const sep = SEPARATOR.exec(body);
      if (!sep) {
        issues.push(`line ${at}: no separator, skipped — "${body}"`);
        return;
      }
      term = body.slice(0, sep.index);
      why = body.slice(sep.index + sep[0].length);
    }

    term = term.replace(/^[`*_]+|[`*_]+$/g, "").trim();
    why = why.trim().replace(/\s+/g, " ");

    if (!term) {
      issues.push(`line ${at}: empty term, skipped`);
      return;
    }
    if (!why) {
      issues.push(`line ${at}: "${term}" has no explanation, skipped`);
      return;
    }

    const key = normalize(term);
    if (glossary[key]) {
      issues.push(`line ${at}: "${term}" is defined twice; the later one wins`);
    }

    glossary[key] = { term, why, group };
  });

  return { glossary, issues };
}

export function lookup(glossary: Glossary, term: string): GlossaryEntry | undefined {
  return glossary[normalize(term)];
}
