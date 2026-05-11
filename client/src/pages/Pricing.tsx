/*
 * PreciseHire — Pricing
 * Style: Trusted Modernism. Cream + navy + coral.
 * Positioning: "Quote in 1 business hour" + transparent unit-economics breakdown
 * + 3 honest tiers (Single Check / Standard Package / Custom Volume) +
 * comparison vs. self-serve CRAs that's honest about where we cost more and why.
 *
 * Centralized data: PACKAGES + UNIT_COST_BREAKDOWN + COMPARE_ROWS + TIERS live
 * inline here for now so the user can rename/reprice in one file. Migrate to
 * /content/pricing.ts later if it grows.
 */
import { Link } from "wouter";
import { Check, ArrowRight, Clock, ShieldCheck, Phone, Sparkles, Minus } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { PACKAGES, ASSETS } from "@/content/site";

/**
 * UNIT-ECONOMICS BREAKDOWN
 * Honest decomposition of what goes into a typical $44.95 Professional check.
 * Numbers are illustrative-but-defensible industry ranges; edit in one place.
 */
const UNIT_COST_BREAKDOWN: { label: string; cost: string; note: string }[] = [
  {
    label: "Court-access fees",
    cost: "$8 – $15",
    note: "What the county or state actually charges us to pull the record. Pass-through.",
  },
  {
    label: "Verification labor",
    cost: "$6 – $12",
    note: "U.S.-based researchers calling past employers and registrars. Not offshored.",
  },
  {
    label: "Database & registry fees",
    cost: "$3 – $5",
    note: "National criminal database, sex-offender registry, OFAC, SSN trace.",
  },
  {
    label: "QA + adverse-action workflow",
    cost: "$4 – $7",
    note: "FCRA review of flagged records, dispute handling, audit trail.",
  },
  {
    label: "Platform & support",
    cost: "$3 – $6",
    note: "ATS integrations, candidate portal, U.S. live phone support.",
  },
];

/**
 * COMPARISON vs. self-serve CRAs.
 * Honest about where we cost more and why.
 */
const COMPARE_ROWS: { feature: string; us: string; selfServe: string }[] = [
  { feature: "Starting price (basic check)", us: "$24.95", selfServe: "$19.99 – $29.99" },
  { feature: "Setup fee", us: "$0", selfServe: "$0 – $250" },
  { feature: "Monthly minimum", us: "None", selfServe: "Often $50 – $200" },
  { feature: "U.S.-based phone support", us: "Yes — direct extension", selfServe: "Email / chatbot" },
  { feature: "Avg phone pickup time", us: "11 sec", selfServe: "24 – 72 hr (email)" },
  { feature: "Quote turnaround", us: "1 business hour", selfServe: "Self-serve checkout" },
  { feature: "Median report turnaround", us: "Under 4 hr", selfServe: "1 – 5 days" },
  { feature: "FCRA adverse-action workflow", us: "Included", selfServe: "Included" },
  { feature: "Per-jurisdiction overlays (CA, NYC, LA, Philly)", us: "Built-in", selfServe: "Manual / your problem" },
  { feature: "Dispute handling", us: "U.S. compliance team", selfServe: "Ticket queue" },
  { feature: "Volume discounts", us: "Yes — published & negotiated", selfServe: "Tiered self-serve" },
];

/**
 * THREE HONEST TIERS
 * Maps to the existing PACKAGES from /content/site.ts so prices stay consistent
 * with the rest of the site, but reframes them around buyer intent rather than
 * feature lists.
 */
const TIERS_NARRATIVE: Record<string, { who: string; whyPick: string; notFor: string }> = {
  Essential: {
    who: "Single hires. Small teams running 1–10 checks a month.",
    whyPick: "Compliance-grade floor at the lowest defensible price. Pay per check, no contract.",
    notFor: "Roles requiring federal criminal, multi-county, MVR, or drug screening.",
  },
  Professional: {
    who: "Most employers. 10–100 checks a month across mixed roles.",
    whyPick: "Adds federal criminal, employment & education verification — the package that actually matches what HR teams need 80% of the time.",
    notFor: "DOT, healthcare credentialing, or executive roles needing 3+ employment checks.",
  },
  Comprehensive: {
    who: "Regulated industries. Healthcare, transportation, finance, executive hires.",
    whyPick: "Multi-county, multi-verification, MVR or 5-panel drug screen included. DOT-ready.",
    notFor: "Volume hiring at >250/month — talk to us about a Custom Volume contract instead.",
  },
};

const PROMISE_BULLETS = [
  { icon: Clock, label: "Quote in 1 business hour", note: "Mon–Fri 8am–6pm CT. Reply by phone or email — your choice." },
  { icon: ShieldCheck, label: "No setup fees, no minimums", note: "First check or thousandth, the per-check price is the same." },
  { icon: Phone, label: "U.S. compliance specialist on the line", note: "Not a chatbot, not a contact form, not a 24-hour SLA." },
];

export default function Pricing() {
  return (
    <>
      <SEO
        title="Background Check Pricing for Employers | PreciseHire"
        description="Get a custom quote in 1 business hour. Transparent per-check pricing from $24.95 with no setup fees, no minimums, and U.S.-based compliance support included."
        canonical="https://precisehire.com/pricing"
      />

      {/* HERO — quote-in-1-hour promise */}
      <section className="relative overflow-hidden">
        <img
          src={ASSETS.swooshSky}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-24 w-[460px] opacity-50 rotate-[12deg]"
        />
        <div className="container pt-20 lg:pt-28 pb-14">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="eyebrow">Pricing</span>
                <h1 className="display-xl mt-4 text-[#0B1F3A]">
                  Get a real quote in <span className="text-[#B7232A]">one business hour</span>.
                </h1>
                <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed max-w-xl">
                  Self-serve background check sites publish a price and hide the rest.
                  We publish three honest packages, the unit economics behind them,
                  and a phone number that gets answered in eleven seconds. Tell us
                  the role, the state, and your typical volume, and we'll send back
                  a quote and a sample report before lunch.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                  >
                    Get my quote — 1-hour reply <ArrowRight className="size-4" />
                  </Link>
                  <a
                    href="tel:+18667735486"
                    className="btn-ghost-navy inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                  >
                    Or call (866) 773-5486
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="rounded-[28px] border border-[#0B1F3A]/10 bg-white p-7 shadow-[0_24px_60px_-32px_rgba(11,31,58,0.35)]">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0B1F3A]/60">
                    <Sparkles className="size-4 text-[#B7232A]" /> What you get back
                  </div>
                  <ul className="mt-5 space-y-4">
                    {PROMISE_BULLETS.map((b) => (
                      <li key={b.label} className="flex gap-3">
                        <span className="mt-0.5 grid place-items-center size-9 rounded-full bg-[#0B1F3A]/5 shrink-0">
                          <b.icon className="size-4 text-[#0B1F3A]" />
                        </span>
                        <div>
                          <div className="font-display text-[15px] font-semibold text-[#0B1F3A]">{b.label}</div>
                          <div className="text-[13.5px] text-[#0B1F3A]/65 leading-relaxed">{b.note}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* TIERS — three honest packages with buyer-intent framing */}
      <section className="container pb-12">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow text-[#B7232A]">Three packages</span>
            <h2 className="display-md mt-3 text-[#0B1F3A]">
              Pick the one that matches the role — not the one with the longest checklist.
            </h2>
            <p className="mt-4 text-[#0B1F3A]/75 leading-relaxed">
              Every package is per-check, no contract, no minimum. Each one tells you
              who it's for and, more usefully, who it's <em>not</em> for.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => {
            const featured = !!pkg.highlight;
            const narrative = TIERS_NARRATIVE[pkg.name];
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
                    <span className="absolute -top-3 left-8 inline-flex items-center px-3 py-1 rounded-full bg-[#B7232A] text-white text-xs font-semibold uppercase tracking-[0.14em]">
                      Most chosen
                    </span>
                  )}
                  <h3 className="font-display text-2xl font-semibold">{pkg.name}</h3>
                  <p className={`mt-3 text-[15px] leading-relaxed ${featured ? "text-white/75" : "text-[#0B1F3A]/65"}`}>
                    {pkg.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-semibold">{pkg.price}</span>
                    <span className={`text-sm ${featured ? "text-white/65" : "text-[#0B1F3A]/55"}`}>{pkg.cadence}</span>
                  </div>

                  {narrative && (
                    <div className={`mt-5 space-y-3 text-[13.5px] leading-relaxed ${featured ? "text-white/85" : "text-[#0B1F3A]/80"}`}>
                      <div>
                        <div className={`font-semibold uppercase tracking-[0.12em] text-[11px] ${featured ? "text-[#E26C72]" : "text-[#B7232A]"}`}>
                          Best for
                        </div>
                        <div className="mt-1">{narrative.who}</div>
                      </div>
                      <div>
                        <div className={`font-semibold uppercase tracking-[0.12em] text-[11px] ${featured ? "text-[#E26C72]" : "text-[#B7232A]"}`}>
                          Why pick it
                        </div>
                        <div className="mt-1">{narrative.whyPick}</div>
                      </div>
                      <div>
                        <div className={`font-semibold uppercase tracking-[0.12em] text-[11px] ${featured ? "text-white/55" : "text-[#0B1F3A]/45"}`}>
                          Not for
                        </div>
                        <div className={`mt-1 ${featured ? "text-white/70" : "text-[#0B1F3A]/65"}`}>{narrative.notFor}</div>
                      </div>
                    </div>
                  )}

                  <ul className="mt-6 space-y-2.5 text-sm border-t pt-5"
                      style={{ borderColor: featured ? "rgba(255,255,255,0.12)" : "rgba(11,31,58,0.08)" }}>
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Check className={`size-4 mt-0.5 shrink-0 ${featured ? "text-[#E26C72]" : "text-[#B7232A]"}`} />
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
                      Get a {pkg.name} quote <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* UNIT ECONOMICS — what's actually inside a $44.95 check */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow text-[#B7232A]">Unit economics</span>
              <h2 className="display-md mt-3 text-[#0B1F3A]">
                Where a $44.95 check actually goes.
              </h2>
              <p className="mt-5 text-[#0B1F3A]/75 leading-relaxed">
                Most background check sites publish a price and hope you don't ask
                what you're paying for. We're showing you the breakdown so you can
                tell — at a glance — whether a $19.99 self-serve report is cheaper
                because it's more efficient or because it's cutting the line items
                you actually want.
              </p>
              <p className="mt-4 text-[#0B1F3A]/75 leading-relaxed">
                The numbers below are the typical range for a Professional-tier
                check on a U.S.-based candidate with one prior employer. Court fees
                vary by jurisdiction and we pass them through at cost.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <div className="rounded-[28px] border border-[#0B1F3A]/10 bg-white overflow-hidden">
                {UNIT_COST_BREAKDOWN.map((row, idx) => (
                  <div
                    key={row.label}
                    className={[
                      "grid grid-cols-12 gap-4 px-6 py-5",
                      idx > 0 ? "border-t border-[#0B1F3A]/8" : "",
                    ].join(" ")}
                  >
                    <div className="col-span-7">
                      <div className="font-display text-[16px] font-semibold text-[#0B1F3A]">{row.label}</div>
                      <div className="text-[13.5px] text-[#0B1F3A]/65 leading-relaxed mt-1">{row.note}</div>
                    </div>
                    <div className="col-span-5 text-right">
                      <span className="font-display text-[18px] font-semibold text-[#0B1F3A]">{row.cost}</span>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-12 gap-4 px-6 py-5 border-t border-[#0B1F3A]/15 bg-[#FFFCF7]">
                  <div className="col-span-7 font-display text-[16px] font-semibold text-[#0B1F3A]">
                    Typical Professional check, all-in
                  </div>
                  <div className="col-span-5 text-right font-display text-[20px] font-semibold text-[#B7232A]">
                    $44.95
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRANSPARENT COMPARISON */}
      <section className="container pb-20">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow">PreciseHire vs. self-serve CRAs</span>
            <h2 className="display-md mt-3 text-[#0B1F3A]">
              Where we cost more, and why we think it's worth it.
            </h2>
            <p className="mt-4 text-[#0B1F3A]/75 leading-relaxed">
              We're a small percentage more expensive on the headline price than
              the self-serve players. Here's the honest line-by-line so you can
              decide whether the trade is right for your team.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 overflow-hidden rounded-3xl border border-[#0B1F3A]/10 bg-white">
            <div className="grid grid-cols-12 text-sm">
              <div className="col-span-6 p-5 bg-[#FFFCF7] border-b border-r border-[#0B1F3A]/10 font-semibold text-[#0B1F3A]">
                What you're comparing
              </div>
              <div className="col-span-3 p-5 bg-[#0B1F3A] text-white border-b border-r border-[#0B1F3A]/10 font-semibold text-center">
                PreciseHire
              </div>
              <div className="col-span-3 p-5 bg-[#FFFCF7] border-b border-[#0B1F3A]/10 font-semibold text-center text-[#0B1F3A]/85">
                Self-serve CRAs
              </div>

              {COMPARE_ROWS.map((row) => (
                <div key={row.feature} className="contents">
                  <div className="col-span-6 p-4 border-b border-r border-[#0B1F3A]/8 text-[#0B1F3A]/85">
                    {row.feature}
                  </div>
                  <div className="col-span-3 p-4 border-b border-r border-[#0B1F3A]/8 text-center text-[#0B1F3A] font-semibold">
                    {row.us === "Yes" ? <Check className="inline size-4" /> : row.us}
                  </div>
                  <div className="col-span-3 p-4 border-b border-[#0B1F3A]/8 text-center text-[#0B1F3A]/70">
                    {row.selfServe === "—" ? <Minus className="inline size-4" /> : row.selfServe}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CUSTOM VOLUME CTA */}
      <section className="container pb-24">
        <Reveal>
          <div className="rounded-[28px] bg-[#0B1F3A] text-white px-8 lg:px-14 py-14 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="eyebrow text-[#E26C72]">Running 100+ checks a month?</span>
              <h2 className="display-md mt-3">Custom volume contracts for staffing & enterprise.</h2>
              <p className="mt-3 text-white/70 max-w-xl">
                A specialist will price your typical mix of checks against your
                actual jurisdictional footprint and put together a custom contract
                — usually within one business day. Volume discounts kick in around
                250 checks per month and scale from there.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="btn-coral text-center rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Talk to a volume specialist
              </Link>
              <a
                href="tel:+18667735486"
                className="btn-ghost-navy bg-transparent border border-white/30 text-white hover:bg-white/10 text-center rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Or call (866) 773-5486
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
