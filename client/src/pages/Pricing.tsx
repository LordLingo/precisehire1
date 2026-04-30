/*
 * PreciseHire — Pricing
 * Style: Trusted Modernism. Three packages on a cream surface, the middle "Pro"
 * package elevated with navy fill + coral CTA. Comparison table below.
 */
import { Link } from "wouter";
import { Check, ArrowRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { PACKAGES, ASSETS } from "@/content/site";

const COMPARE_ROWS: { feature: string; cells: [string, string, string] }[] = [
  { feature: "SSN trace & address history", cells: ["Yes", "Yes", "Yes"] },
  { feature: "National criminal + sex-offender registry", cells: ["Yes", "Yes", "Yes"] },
  { feature: "Global watchlist (OFAC)", cells: ["Yes", "Yes", "Yes"] },
  { feature: "County criminal searches", cells: ["1", "1", "Up to 3"] },
  { feature: "Federal criminal search", cells: ["—", "Yes", "Yes"] },
  { feature: "Civil records", cells: ["—", "—", "Yes"] },
  { feature: "Employment verifications", cells: ["—", "1", "Up to 3"] },
  { feature: "Education verification", cells: ["—", "1", "Yes"] },
  { feature: "MVR or 5-panel drug screen", cells: ["Add-on", "Add-on", "Included"] },
  { feature: "ATS integrations", cells: ["Yes", "Yes", "Yes"] },
  { feature: "Adverse action workflow", cells: ["Yes", "Yes", "Yes"] },
  { feature: "Volume pricing available", cells: ["Yes", "Yes", "Yes"] },
];

export default function Pricing() {
  return (
    <>
      <SEO
        title="Background Check Pricing for Employers | Precise Hire"
        description="Transparent per-check pricing starting at $24.95. Mix and match services, get same-day setup, and save more as you scale. No setup fees or minimums."
        canonical="https://precisehire.com/pricing"
      />

      <section className="relative overflow-hidden">
        <img src={ASSETS.swooshSky} alt="" aria-hidden="true" className="pointer-events-none absolute -top-20 -right-24 w-[460px] opacity-50 rotate-[12deg]" />
        <div className="container pt-20 lg:pt-28 pb-12 max-w-3xl">
          <Reveal>
            <span className="eyebrow">Pricing</span>
            <h1 className="display-xl mt-4 text-[#0B1F3A]">Simple, transparent, per-check pricing.</h1>
            <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed">
              No setup fees. No monthly minimums. No hidden line items. Pay only for
              the checks you run, and unlock volume pricing as you grow.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Plans */}
      <section className="container pb-12">
        <div className="grid md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => {
            const featured = !!pkg.highlight;
            return (
              <Reveal key={pkg.name} delay={i * 0.05}>
                <div
                  className={[
                    "relative h-full rounded-[28px] p-8 flex flex-col border",
                    featured
                      ? "bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-[0_28px_60px_-28px_rgba(11,31,58,0.55)] lg:scale-[1.03]"
                      : "bg-white text-[#0B1F3A] border-[#0B1F3A]/10",
                  ].join(" ")}
                >
                  {featured && (
                    <span className="absolute -top-3 left-8 inline-flex items-center px-3 py-1 rounded-full bg-[#FF5A4E] text-white text-xs font-semibold uppercase tracking-[0.14em]">
                      Most popular
                    </span>
                  )}
                  <h2 className="font-display text-2xl font-semibold">{pkg.name}</h2>
                  <p className={`mt-3 text-[15px] leading-relaxed ${featured ? "text-white/75" : "text-[#0B1F3A]/65"}`}>{pkg.description}</p>
                  <div className="mt-6">
                    <span className="font-display text-4xl font-semibold">{pkg.price}</span>
                    <span className={`ml-2 text-sm ${featured ? "text-white/65" : "text-[#0B1F3A]/55"}`}>{pkg.cadence}</span>
                  </div>
                  <ul className="mt-7 space-y-3 text-sm">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Check className={`size-4 mt-0.5 shrink-0 ${featured ? "text-[#FF8077]" : "text-[#FF5A4E]"}`} />
                        <span className={featured ? "text-white/90" : "text-[#0B1F3A]/85"}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-8 mt-auto">
                    <Link
                      href="/contact"
                      className={[
                        "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold",
                        featured ? "btn-coral" : "btn-ghost-navy",
                      ].join(" ")}
                    >
                      Choose {pkg.name} <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Compare */}
      <section className="container pb-24">
        <Reveal>
          <h2 className="display-md text-[#0B1F3A]">Compare what's in each package</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-8 overflow-hidden rounded-3xl border border-[#0B1F3A]/10 bg-white">
            <div className="grid grid-cols-4 text-sm">
              <div className="p-5 border-b border-r border-[#0B1F3A]/10 bg-[#FFFCF7] font-semibold text-[#0B1F3A]">Feature</div>
              {PACKAGES.map((p) => (
                <div key={p.name} className="p-5 border-b border-[#0B1F3A]/10 bg-[#FFFCF7] text-center font-semibold text-[#0B1F3A] last:border-r-0 border-r">
                  {p.name}
                </div>
              ))}
              {COMPARE_ROWS.map((row) => (
                <div key={row.feature} className="contents">
                  <div className="p-4 border-b border-r border-[#0B1F3A]/8 text-[#0B1F3A]/85">{row.feature}</div>
                  {row.cells.map((c, idx) => (
                    <div key={idx} className="p-4 text-center border-b border-r last:border-r-0 border-[#0B1F3A]/8 text-[#0B1F3A]/80">
                      {c === "Yes" ? <Check className="inline size-4 text-[#0B1F3A]" /> : c}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Volume CTA */}
      <section className="container pb-24">
        <Reveal>
          <div className="rounded-[28px] bg-[#0B1F3A] text-white px-8 lg:px-14 py-14 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="eyebrow text-[#FF8077]">Running 100+ checks a month?</span>
              <h2 className="display-md mt-3">Custom volume pricing for staffing & enterprise.</h2>
              <p className="mt-3 text-white/70 max-w-xl">
                A specialist will price your typical mix of checks and put together a
                custom package — usually within one business day.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link href="/contact" className="btn-coral text-center rounded-full px-6 py-3.5 text-sm font-semibold">Talk to sales</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
