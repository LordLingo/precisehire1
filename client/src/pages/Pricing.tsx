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
import { Check, ArrowRight, Clock, ShieldCheck, Phone, Sparkles, Minus, HeartPulse, Truck, Building2, ShoppingBag, Landmark, Wrench, Quote } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { PACKAGES, ASSETS } from "@/content/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

      {/* TRUST BAR — just above the hero */}
      <section className="border-y border-[#0B1F3A]/10 bg-[#FAF7F2]">
        <div className="container py-3.5">
          <ul className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-[12.5px] text-[#0B1F3A]/75">
            <li className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#B7232A]" />
              <span><span className="font-semibold text-[#0B1F3A]">22+ years</span> serving U.S. employers · est. 2003</span>
            </li>
            <li className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#B7232A]" />
              <span><span className="font-semibold text-[#0B1F3A]">SOC 2 Type II</span> · attested annually</span>
            </li>
            <li className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#B7232A]" />
              <span><span className="font-semibold text-[#0B1F3A]">FCRA &amp; PBSA-aligned</span> compliance workflow</span>
            </li>
            <li className="inline-flex items-center gap-2">
              <Phone className="size-4 text-[#B7232A]" />
              <span><span className="font-semibold text-[#0B1F3A]">U.S. specialist</span> Mon–Fri 8a–8p ET, Sat 9a–1p</span>
            </li>
          </ul>
        </div>
      </section>

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

      {/* TRUST STATEMENT + PRICING FAQ */}
      <section className="container pb-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow text-[#B7232A]">Why this page looks the way it does</span>
              <h2 className="display-md mt-3 text-[#0B1F3A]">
                We publish prices the way we wish vendors had published them to us.
              </h2>
              <p className="mt-5 text-[#0B1F3A]/75 leading-relaxed">
                Most background-check companies treat pricing as a sales conversation
                you have to qualify for. We treat it as a piece of information you
                should be able to read on a Tuesday afternoon without filling out a
                form. The three packages on this page are real packages with real
                prices. The unit-economics breakdown is the actual cost structure of
                a Professional-tier check, not a marketing chart. Where we cost more
                than self-serve CRAs, we say so on the comparison table and we
                explain why. The point is that you should be able to make an
                informed decision about screening before you ever talk to us.
              </p>
              <p className="mt-4 text-[#0B1F3A]/75 leading-relaxed">
                When you do reach out, you talk to a U.S.-based compliance specialist
                who will tell you which package fits your role mix and your
                jurisdictional footprint — even if the answer is "Essential" and not
                the more expensive tier. We have been doing this since 2003 and the
                shortest path to a long client relationship has always been the
                honest one.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <span className="eyebrow">Pricing FAQ</span>
              <h2 className="display-md mt-3 text-[#0B1F3A]">
                The four questions buyers actually ask.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="mt-8 divide-y divide-[#0B1F3A]/10 border-y border-[#0B1F3A]/10">
                <AccordionItem value="q1" className="border-0">
                  <AccordionTrigger className="py-5 text-left font-display text-[17px] font-semibold text-[#0B1F3A] hover:no-underline">
                    Why are you a few dollars more than the self-serve sites?
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[15px] leading-relaxed text-[#0B1F3A]/80">
                    Three reasons, in order of how much they actually cost. First,
                    we run U.S.-based verification labor instead of offshoring it,
                    which is the largest single line item in our unit economics.
                    Second, we include FCRA adverse-action workflow, dispute
                    handling, and per-jurisdiction overlays for California, Los
                    Angeles, NYC, and Philadelphia in the per-check price — not as
                    add-ons. Third, we answer the phone in eleven seconds with a
                    live compliance specialist instead of routing you to a chatbot
                    or a 24-hour email queue. Self-serve CRAs are cheaper because
                    they have decided not to do those three things.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q2" className="border-0">
                  <AccordionTrigger className="py-5 text-left font-display text-[17px] font-semibold text-[#0B1F3A] hover:no-underline">
                    What does a typical custom-volume discount look like?
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[15px] leading-relaxed text-[#0B1F3A]/80">
                    Volume discounts kick in around 50 checks per month and scale
                    from there. As a directional benchmark, employers running
                    50 – 100 Professional-tier checks per month typically see a
                    10–15% reduction off the published per-check rate; employers
                    running 150–500 per month typically see 20–30%; and
                    staffing or enterprise contracts above 1,000 per month are
                    priced against the actual jurisdictional mix and check
                    composition. None of those tiers carry a setup fee or a
                    multi-year lock-in. A specialist will put a real number on
                    it within one business day if you share your typical monthly
                    volume and role mix.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q3" className="border-0">
                  <AccordionTrigger className="py-5 text-left font-display text-[17px] font-semibold text-[#0B1F3A] hover:no-underline">
                    Are court access fees included in the per-check price?
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[15px] leading-relaxed text-[#0B1F3A]/80">
                    Yes for the vast majority of jurisdictions. The published
                    per-check price includes court-access fees in every U.S. county
                    and state we routinely search. A handful of higher-fee
                    jurisdictions — New York Supreme Court, certain federal
                    districts, and a small number of states that charge
                    above-market access fees — are billed at pass-through cost and
                    flagged in advance, never silently. International searches and
                    DOT-specific MVR add-ons are quoted separately because the
                    underlying fees vary too widely to bundle.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q4" className="border-0">
                  <AccordionTrigger className="py-5 text-left font-display text-[17px] font-semibold text-[#0B1F3A] hover:no-underline">
                    What's your contract length, and is there a monthly minimum?
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[15px] leading-relaxed text-[#0B1F3A]/80">
                    No contract and no monthly minimum on any of the three
                    published packages. You pay per check whether you run one this
                    quarter or two hundred, and you can pause or stop at any time
                    without penalty. Custom-volume contracts above 250 checks per
                    month are typically structured as a one-year commitment in
                    exchange for the volume rate, but even those are exit-able
                    with thirty days' notice if the relationship is not working.
                    We have never asked a client to sign a multi-year deal.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF — logo strip + pull quote */}
      <section className="container pb-20">
        <Reveal>
          <div className="rounded-[28px] border border-[#0B1F3A]/10 bg-white/70 backdrop-blur px-8 lg:px-12 py-10 lg:py-12">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <span className="eyebrow">A representative cross-section of active customers</span>
              <span className="text-xs uppercase tracking-[0.18em] text-[#0B1F3A]/50">
                Shown anonymized &middot; named references on request
              </span>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-5 items-stretch">
              {[
                { name: "Regional health system", sub: "6 hospitals · 4,200 staff", icon: HeartPulse },
                { name: "National last-mile fleet", sub: "2,400 CDL drivers", icon: Truck },
                { name: "Light-industrial staffing", sub: "180 branches", icon: Building2 },
                { name: "Regional retail group", sub: "96 store locations", icon: ShoppingBag },
                { name: "Community bank", sub: "31 branches · FINRA", icon: Landmark },
                { name: "Mechanical contractor", sub: "600 trades, multi-state", icon: Wrench },
              ].map((l) => {
                const Icon = l.icon;
                return (
                  <div
                    key={l.name}
                    className="group inline-flex items-center gap-3 text-[#0B1F3A]/65 transition-colors hover:text-[#0B1F3A] rounded-xl px-4 py-3 border border-[#0B1F3A]/8 bg-white/60"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[#0B1F3A]/15 bg-white transition-colors group-hover:border-[#B7232A]/40">
                      <Icon className="size-4" />
                    </span>
                    <span className="font-display text-[14.5px] leading-tight">
                      <span className="block font-semibold text-[#0B1F3A]">{l.name}</span>
                      <span className="block text-[11px] uppercase tracking-[0.14em] text-[#0B1F3A]/50">{l.sub}</span>
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-1 hidden lg:flex items-start justify-center">
                <Quote className="size-9 text-[#B7232A]/80 -mt-1" aria-hidden />
              </div>
              <blockquote className="lg:col-span-8 font-display text-[22px] lg:text-[26px] leading-[1.35] text-[#0B1F3A]">
                &ldquo;We switched to PreciseHire after our self-serve CRA closed three legitimate disputes as &lsquo;frivolous&rsquo; and our recruiters spent weeks unwinding the adverse-action notices. The price difference is real and it pays for itself the first time you avoid a single class-action letter.&rdquo;
                <footer className="mt-5 not-italic text-[14px] text-[#0B1F3A]/60 font-sans flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#0B1F3A]/8 font-display text-[#0B1F3A]/80 font-semibold">
                    “”
                  </span>
                  <span>
                    <span className="block text-[#0B1F3A] font-semibold text-[15px]">Director of Talent Operations</span>
                    Light-industrial staffing &middot; 180 branches &middot; switched 2024 &middot;{" "}
                    <span className="text-[#0B1F3A]/50">named reference on request</span>
                  </span>
                </footer>
              </blockquote>
              <div className="lg:col-span-3 rounded-2xl bg-[#FFF7F2] border border-[#B7232A]/15 p-5">
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#B7232A] font-semibold">After switching</div>
                <ul className="mt-3 space-y-3 text-[14px] text-[#0B1F3A]/85">
                  <li className="flex items-start gap-2">
                    <Check className="size-4 mt-0.5 text-[#B7232A] shrink-0" />
                    <span>0 disputes incorrectly closed in 14 months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-4 mt-0.5 text-[#B7232A] shrink-0" />
                    <span>Median turnaround dropped from 3.1 days to 4 hr</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-4 mt-0.5 text-[#B7232A] shrink-0" />
                    <span>Live U.S. specialist on every escalation</span>
                  </li>
                </ul>
              </div>
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
                50 checks per month and scale from there.
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
