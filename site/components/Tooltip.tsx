"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { lookup, type Glossary } from "@/lib/parseGlossary";

/* ------------------------------------------------------------------ *
 * Context
 *
 * The popup is written to the DOM imperatively rather than through
 * React state. A pointerenter handler that calls setState only paints
 * after React's scheduler flushes, which can miss the current frame.
 * Writing style/text directly makes the popup appear in the same task
 * as the event — no scheduler hop, no transition, no re-render of the
 * resume on every hover.
 * ------------------------------------------------------------------ */

export type Accent = "yellow" | "blue";

type TooltipApi = {
  show: (term: string, why: string, el: HTMLElement) => void;
  hide: () => void;
  glossary: Glossary;
  accent: Accent;
  setAccent: (a: Accent) => void;
};

const TooltipCtx = createContext<TooltipApi | null>(null);

function useTooltip(): TooltipApi {
  const ctx = useContext(TooltipCtx);
  if (!ctx) throw new Error("useTooltip must be used inside <TooltipProvider>");
  return ctx;
}

export function useAccent() {
  const { accent, setAccent } = useTooltip();
  return { accent, setAccent };
}

/* ------------------------------------------------------------------ *
 * Provider + the single floating popup
 * ------------------------------------------------------------------ */

const GAP = 8; // px between keyword and popup
const EDGE = 10; // px minimum distance from viewport edge

export function TooltipProvider({
  glossary,
  children,
}: {
  /** Parsed from glossary.md by the server component that renders this. */
  glossary: Glossary;
  children: ReactNode;
}) {
  const [accent, setAccent] = useState<Accent>("yellow");

  const popRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<HTMLSpanElement | null>(null);
  const whyRef = useRef<HTMLSpanElement | null>(null);
  const openRef = useRef(false);

  // Stable across renders, so hovering never invalidates the context.
  const api = useMemo<TooltipApi>(() => {
    const hide = () => {
      const pop = popRef.current;
      if (!pop || !openRef.current) return;
      openRef.current = false;
      pop.style.visibility = "hidden";
      pop.style.opacity = "0";
      pop.setAttribute("aria-hidden", "true");
    };

    const show = (term: string, why: string, el: HTMLElement) => {
      const pop = popRef.current;
      if (!pop || !termRef.current || !whyRef.current) return;

      termRef.current.textContent = term;
      whyRef.current.textContent = why;

      // Lay out invisibly so the box can be measured before it is shown.
      pop.style.visibility = "hidden";
      pop.style.opacity = "0";
      const { width, height } = pop.getBoundingClientRect();
      const a = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Horizontal: centred on the keyword, clamped inside the viewport.
      const left = Math.max(
        EDGE,
        Math.min(a.left + a.width / 2 - width / 2, vw - width - EDGE),
      );

      // Vertical: prefer above, flip below when there is no room.
      let top = a.top - height - GAP;
      if (top < EDGE) {
        top = Math.min(a.bottom + GAP, vh - height - EDGE);
        pop.dataset.side = "below";
      } else {
        pop.dataset.side = "above";
      }

      // Arrow keeps pointing at the keyword even when the body is clamped.
      const arrowX = Math.max(10, Math.min(a.left + a.width / 2 - left, width - 10));
      pop.style.setProperty("--arrow-x", `${arrowX}px`);

      pop.style.transform = `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`;
      pop.style.visibility = "visible";
      pop.style.opacity = "1";
      pop.setAttribute("aria-hidden", "false");
      openRef.current = true;
    };

    return { show, hide, glossary, accent, setAccent };
  }, [glossary, accent]);

  // The anchor rect goes stale on scroll and resize, so dismiss instead.
  useEffect(() => {
    const { hide } = api;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    window.addEventListener("scroll", hide, { passive: true, capture: true });
    window.addEventListener("resize", hide);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", hide, { capture: true });
      window.removeEventListener("resize", hide);
      window.removeEventListener("keydown", onKey);
    };
  }, [api]);

  return (
    <TooltipCtx.Provider value={api}>
      <div data-accent={accent}>{children}</div>

      <div ref={popRef} className="pop" role="tooltip" data-accent={accent} aria-hidden="true">
        <span ref={termRef} className="pop-term" />
        <span ref={whyRef} className="pop-why" />
      </div>
    </TooltipCtx.Provider>
  );
}

/* ------------------------------------------------------------------ *
 * <K> — a hoverable keyword
 * ------------------------------------------------------------------ */

type KProps = {
  children: ReactNode;
  /** Glossary term, when it differs from the visible text. */
  k?: string;
  /** One-off explanation that bypasses glossary.md. */
  why?: string;
};

export function K({ children, k, why }: KProps) {
  const { show, hide, glossary } = useTooltip();

  const term = k ?? (typeof children === "string" ? children : "");
  const entry = why ?? lookup(glossary, term)?.why;

  // Term missing from glossary.md: render plain text, not a dead highlight.
  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[glossary.md] no entry for "${term}"`);
    }
    return <>{children}</>;
  }

  const open = (e: { currentTarget: HTMLElement }) => show(term, entry, e.currentTarget);

  return (
    <span
      className="kw"
      tabIndex={0}
      onPointerEnter={open}
      onPointerLeave={hide}
      onFocus={open}
      onBlur={hide}
    >
      {children}
    </span>
  );
}
