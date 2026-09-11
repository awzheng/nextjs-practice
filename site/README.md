# Resume site

Minimal resume with hover-to-explain keywords, for interview prep and resume walkthroughs.

```
npm run dev     # http://localhost:3000
npm run check   # validate glossary.md
npm run build
```

## Editing explanations

Everything you'll normally touch is in **`glossary.md`**:

```md
## Miovision · Device search

- Avro — Compact binary with schema evolution; JSON wastes Kafka bandwidth
- Kafka — Replayable log lets the index rebuild from scratch
```

Save the file, refresh the browser in `npm run dev`, and the popup updates. No restart.

Only `-` lines under a `##` heading are definitions. Everything above the first `##` is
notes, and non-list lines inside a section are ignored, so you can annotate freely.
Sections are only grouping — rename and reorder them.

`npm run check` reports duplicate terms, keywords on the page with no definition, and
definitions nothing uses.

## Adding a new keyword

1. Define it in `glossary.md` under any `##` section.
2. Wrap the text in `app/page.tsx`:

   ```tsx
   <K>Firecracker-microVM</K>                    {/* visible text is the term */}
   <K k="Terraform">Terraform-provisioned</K>     {/* term differs from text */}
   <K why="one-off note">something</K>            {/* skips glossary.md */}
   ```

A `<K>` whose term isn't in `glossary.md` renders as plain text and logs a warning in
dev, so a typo degrades instead of leaving a dead highlight.

## Files

| File | Purpose |
| --- | --- |
| `glossary.md` | The explanations. This is the one you edit. |
| `app/page.tsx` | Resume content and which words are wrapped in `<K>`. |
| `app/globals.css` | Typography and the highlight/popup colour tokens. |
| `lib/parseGlossary.ts` | Markdown → glossary, plus validation. |
| `lib/glossary.ts` | Reads `glossary.md` at build time (server-only). |
| `components/Tooltip.tsx` | The popup and the `<K>` component. |

## Notes

- Keywords are only applied to Miovision, Allocate, Albedo, and CrawlStars. Everything
  else is deliberately plain text.
- The popup is written to the DOM imperatively in `components/Tooltip.tsx`, not through
  React state. A `setState` in a pointer handler only paints after React's scheduler
  flushes; direct style writes land in the same event dispatch, so there is no
  perceptible lag and hovering never re-renders the resume.
- Highlight colour toggles yellow/blue via the swatches in the top right. Yellow is the
  default; the tokens live at the top of `app/globals.css`.
- `Escape`, scrolling, and resizing dismiss the popup, since the anchor rect goes stale.
- Keywords are focusable, so the whole glossary is reachable by keyboard.
- `@media print` drops the highlights and the popup, so the page still prints as a resume.
