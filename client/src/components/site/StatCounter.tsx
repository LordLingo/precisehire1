/*
 * PreciseHire — StatCounter: counts a number up from 0 when scrolled into view.
 * Style: Trusted Modernism — Fraunces serif numerals, hairline rule beneath.
 */
import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
};

export default function StatCounter({ value, prefix = "", suffix = "", label, decimals }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(0);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (!ref.current || played) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !played) {
            setPlayed(true);
            const start = performance.now();
            const dur = 1400;
            const step = (now: number) => {
              const t = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(value * eased);
              if (t < 1) requestAnimationFrame(step);
              else setDisplay(value);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, played]);

  const dec = decimals ?? (Number.isInteger(value) ? 0 : 1);
  const formatted = display.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return (
    <div ref={ref} className="py-7 lg:py-9 first:pl-0 lg:px-8 first:lg:pl-0 last:lg:pr-0">
      <div className="font-display text-4xl md:text-5xl font-semibold text-[#0B1F3A] tabular-nums">
        {prefix}
        {formatted}
        {suffix}
      </div>
      <p className="mt-2 text-sm font-medium text-[#0B1F3A]/65 tracking-wide">{label}</p>
    </div>
  );
}
