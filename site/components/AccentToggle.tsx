"use client";

import { useAccent, type Accent } from "./Tooltip";

const SWATCH: Record<Accent, string> = {
  yellow: "rgba(250, 204, 21, 0.55)",
  blue: "rgba(96, 165, 250, 0.5)",
};

export function AccentToggle() {
  const { accent, setAccent } = useAccent();

  return (
    <div className="accent-toggle" role="group" aria-label="Highlight colour">
      {(Object.keys(SWATCH) as Accent[]).map((a) => (
        <button
          key={a}
          type="button"
          aria-label={`${a} highlights`}
          aria-pressed={accent === a}
          onClick={() => setAccent(a)}
          style={{ ["--swatch" as string]: SWATCH[a] }}
        />
      ))}
    </div>
  );
}
