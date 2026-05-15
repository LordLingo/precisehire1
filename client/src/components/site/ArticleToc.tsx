/**
 * PreciseHire — ArticleToc
 *
 * Style: Trusted Modernism. Cream/navy/coral. Display + body font pairing.
 *
 * Scope: a sticky right-rail Table of Contents for long-form compliance posts.
 * - Watches a container ref for h2 + h3 elements rendered by Streamdown.
 * - Slugifies the heading text and assigns a stable `id` to each heading so
 *   in-page anchors work and external links (e.g. /resources/...#section) work too.
 * - Uses a scroll position calc to highlight the heading currently in view.
 * - Smooth-scrolls on click with a sensible top offset for the sticky site nav.
 * - Hidden below lg breakpoint to keep the mobile read clean.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { ListOrdered } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const SCROLL_OFFSET = 96; // height of sticky nav + breathing room

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface Props {
  /** Ref to the article body container that holds the rendered markdown. */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Re-scan signal — change this whenever the article body re-renders. */
  reScanKey?: string | number;
}

export default function ArticleToc({ containerRef, reScanKey }: Props) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const itemsRef = useRef<TocItem[]>([]);

  // Scan the article for headings, assign ids, build TOC items.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Multiple short delays to catch async rendering from Streamdown.
    const tries: number[] = [];
    const scan = () => {
      const headings = Array.from(
        root.querySelectorAll<HTMLHeadingElement>("h2, h3"),
      );
      if (headings.length === 0) return false;
      const used = new Set<string>();
      const next: TocItem[] = headings.map((h) => {
        const text = (h.textContent || "").trim();
        let id = h.id || slugify(text);
        if (!id) id = `section-${Math.random().toString(36).slice(2, 7)}`;
        let dedup = id;
        let n = 2;
        while (used.has(dedup)) {
          dedup = `${id}-${n}`;
          n += 1;
        }
        used.add(dedup);
        h.id = dedup;
        // Soft scroll-margin so jumps land below the sticky nav.
        h.style.scrollMarginTop = `${SCROLL_OFFSET}px`;
        return {
          id: dedup,
          text,
          level: h.tagName === "H2" ? 2 : 3,
        };
      });
      itemsRef.current = next;
      setItems(next);
      // If the URL has a hash, scroll to it once on mount.
      if (window.location.hash) {
        const target = root.querySelector<HTMLElement>(window.location.hash);
        if (target) {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: target.offsetTop - SCROLL_OFFSET,
              behavior: "instant" as ScrollBehavior,
            });
          });
        }
      }
      return true;
    };

    if (!scan()) {
      // Retry a few times — Streamdown may render lazily.
      for (const ms of [50, 150, 350, 700, 1200]) {
        const t = window.setTimeout(scan, ms);
        tries.push(t);
      }
    }

    return () => {
      for (const t of tries) window.clearTimeout(t);
    };
  }, [containerRef, reScanKey]);

  // Active-section scroll spy.
  useEffect(() => {
    if (items.length === 0) return;
    const onScroll = () => {
      const root = containerRef.current;
      if (!root) return;
      const trigger = window.scrollY + SCROLL_OFFSET + 8;
      let current: string | null = items[0]?.id ?? null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        if (el.offsetTop <= trigger) {
          current = it.id;
        } else {
          break;
        }
      }
      // If we have scrolled past the article body, do not highlight anything
      // (so the user understands they have left the article context).
      const rootBottom = root.offsetTop + root.offsetHeight - 200;
      if (window.scrollY > rootBottom) current = null;
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items, containerRef]);

  const handleClick = useMemo(
    () => (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({
        top: el.offsetTop - SCROLL_OFFSET,
        behavior: "smooth",
      });
      // Update URL hash without jumping.
      history.replaceState(null, "", `#${id}`);
      setActiveId(id);
    },
    [],
  );

  if (items.length < 3) return null; // Don't bother for very short articles.

  return (
    <aside
      aria-label="On this page"
      className="hidden lg:block sticky top-24 self-start"
    >
      <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#0B1F3A]/55 inline-flex items-center gap-2">
        <ListOrdered className="size-3.5 text-[#B7232A]" />
        On this page
      </div>
      <nav className="mt-4 border-l border-[#0B1F3A]/10 pl-4 space-y-1.5 text-[13.5px] leading-snug">
        {items.map((it) => {
          const isActive = activeId === it.id;
          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              onClick={(e) => handleClick(e, it.id)}
              className={[
                "block py-1 transition-colors relative",
                it.level === 3 ? "pl-4" : "",
                isActive
                  ? "text-[#B7232A] font-semibold"
                  : "text-[#0B1F3A]/65 hover:text-[#0B1F3A]",
              ].join(" ")}
            >
              {isActive && (
                <span
                  aria-hidden
                  className="absolute -left-4 top-0 bottom-0 w-px bg-[#B7232A]"
                />
              )}
              {it.text}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
