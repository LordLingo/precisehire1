/*
 * PreciseHire — About
 * Style: Trusted Modernism. Editorial spread feel.
 *
 * Owner-operated, single-proprietor company. No fictional leadership team.
 * The previous "Leadership" grid was replaced with a "How we work" pillars
 * section that explains the operating principles without inventing people.
 */
import { Link } from "wouter";
import {
  ArrowRight,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Scale,
  FileSearch,
} from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import StatCounter from "@/components/site/StatCounter";
import { ASSETS, STATS } from "@/content/site";

const HOW_WE_WORK: { icon: typeof PhoneCall; title: string; body: string }[] = [
  {
    icon: PhoneCall,
    title: "American team, full stop.",
    body: "Every researcher, every compliance reviewer, and every phone line is in the United States. There is no offshore tier and no automated chat bouncing your candidate around. When you call, a person who actually works on the report picks up — typically within ten seconds during business hours.",
  },
  {
    icon: FileSearch,
    title: "Source verification on every flag.",
    body: "Database hits are leads, not findings. Before a record appears on a report, it is verified at the source courthouse, the source employer, or the source licensing board. That is how we keep dispute rates under half a percent and keep employers out of the FCRA accuracy headlines.",
  },
  {
    icon: Scale,
    title: "Compliance is the default, not an upgrade.",
    body: "FCRA pre-adverse and final adverse-action sequences, EEOC individualized-assessment prompts, and state-specific waiting periods are wired into the workflow on every account — not gated behind a higher-priced tier. The cheapest report we run goes out under the same compliance posture as the most expensive one.",
  },
];

const VALUES = [
  {
    title: "Accuracy is non-negotiable",
    body: "Every potential record is verified at the source courthouse before it touches a report. We'd rather take an extra hour than send a hiring manager a bad call.",
  },
  {
    title: "Speed without shortcuts",
    body: "We've automated the parts that should be automated and kept humans in the loop everywhere accuracy matters. The result: a median 4-hour turnaround.",
  },
  {
    title: "Compliance is a feature, not a footnote",
    body: "FCRA disclosures, adverse-action workflows, and state ban-the-box rules are baked into the dashboard, not buried in a PDF.",
  },
  {
    title: "Respect for candidates",
    body: "Every candidate gets a clear, branded invitation and a self-service status page. People deserve to know where their report stands.",
  },
];

const TIMELINE = [
  { year: "2003", title: "Founded in McKinney", body: "PreciseHire opens in McKinney, Texas, supporting four local trucking firms from a single back office." },
  { year: "2004", title: "Courthouse runner network", body: "First operations build-out: the source-courthouse runner network the company still uses today is established." },
  { year: "2009", title: "PBSA membership", body: "PreciseHire is admitted to the Professional Background Screening Association and adopts its accreditation standards." },
  { year: "2014", title: "Healthcare practice opens", body: "First dedicated OIG LEIE + SAM monitoring workflow shipped for a regional hospital system." },
  { year: "2019", title: "ATS integration layer", body: "Native integrations launch with Bullhorn, Avionté, and Workday; SFTP for everyone else." },
  { year: "2022", title: "SOC 2 Type II", body: "First independent SOC 2 Type II attestation completed; re-attested every year since." },
  { year: "2026", title: "12M+ checks delivered", body: "PreciseHire crosses twelve million completed background checks across its 22-year history." },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PreciseHire",
  legalName: "PreciseHire, Inc.",
  url: "https://precisehire.com",
  foundingDate: "2003",
  description:
    "FCRA-compliant employment background checks, drug testing, MVR, and I-9/E-Verify for U.S. employers across healthcare, transportation, staffing, and the trades.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "McKinney",
    addressRegion: "TX",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    areaServed: "US",
    availableLanguage: ["en"],
  },
  memberOf: { "@type": "Organization", name: "Professional Background Screening Association" },
};

export default function About() {
  return (
    <>
      <SEO
        title="About PreciseHire — 22 Years of U.S. Background Screening"
        description="Founded 2003 in McKinney, Texas. U.S.-based researchers, SOC 2 Type II attested, PBSA member since 2009. Owner-operated, accountable, and answerable."
        canonical="https://precisehire.com/about"
        jsonLd={JSONLD}
      />

      {/* HERO */}
      <section className="ph-page-hero relative overflow-hidden bg-[#FAF7F2]">
        <img
          src={ASSETS.swooshCoral}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 w-[460px] opacity-50 rotate-[20deg]"
        />
        <div className="container pt-20 lg:pt-28 pb-14 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="eyebrow">
                <Sparkles className="size-3.5 text-[#B7232A]" />
                About PreciseHire
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-4 text-[#0B1F3A]">
                Twenty-two years of helping employers hire with{" "}
                <span className="italic relative inline-block">
                  certainty
                  <span className="absolute left-0 right-0 -bottom-1 h-[6px] bg-[#B7232A]/85 rounded-full" />
                </span>
                .
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.7] text-[#0B1F3A]/75 max-w-2xl">
                PreciseHire was founded in 2003 in McKinney, Texas as an independent
                alternative to slow, opaque legacy providers. Twenty-two years and
                twelve million checks later, we are still privately held, still
                owner-operated, and still working under the same operating principle:
                answer the phone, verify every flag at the source, and treat candidates
                like people, not records.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-white border border-[#0B1F3A]/10 p-6">
                <div className="eyebrow text-[#B7232A]">
                  <MapPin className="size-3.5" /> Headquarters
                </div>
                <p className="mt-3 font-display text-[18px] font-semibold text-[#0B1F3A]">
                  McKinney, Texas
                </p>
                <p className="mt-1 text-[14px] text-[#0B1F3A]/70 leading-relaxed">
                  U.S.-based research desks, U.S.-based phones. Mon&ndash;Fri 8a&ndash;8p CT, Sat 9a&ndash;1p.
                </p>
                <div className="mt-5 border-t border-[#0B1F3A]/10 pt-4">
                  <div className="eyebrow text-[#B7232A]">
                    <ShieldCheck className="size-3.5" /> Verifiable
                  </div>
                  <p className="mt-2 text-[13.5px] text-[#0B1F3A]/70">
                    SOC 2 Type II, PBSA member since 2009, FCRA-aligned workflow.{" "}
                    <Link
                      href="/trust"
                      className="font-semibold text-[#B7232A] underline-offset-2 hover:underline"
                    >
                      Verify on the trust page
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY WE EXIST — narrative + photo */}
      <section className="container py-20 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="rounded-3xl overflow-hidden border border-[#0B1F3A]/10">
              <img
                src={ASSETS.team}
                alt="The PreciseHire operations team collaborating in a meeting"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.05}>
            <span className="eyebrow">Why we exist</span>
            <h2 className="display-md mt-3 text-[#0B1F3A]">
              Because hiring decisions deserve the report behind them.
            </h2>
            <div className="mt-5 space-y-4 text-[#0B1F3A]/80 leading-relaxed">
              <p>
                The background-check industry rewards speed over accuracy more than
                almost any adjacent service. The biggest CRAs run on database-first
                workflows that surface stale, sealed, or mis-matched records, and the
                consequence of that &mdash; class-action exposure for the employer,
                and an unfair rejection for the candidate &mdash; lands on people who
                had nothing to do with the report.
              </p>
              <p>
                We built PreciseHire to be the alternative. Every flagged record is
                phone-verified at the source courthouse before it appears on a report,
                every adverse-action sequence is supervised by a U.S. compliance
                specialist, and every candidate has a named, reachable contact during
                their screen.
              </p>
              <p>
                Twenty-two years in, the bar is still the same: deliver the most
                accurate, fastest, most respectful screening experience in the
                industry &mdash; in that order.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="container">
        <div className="ribbon-stat grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#0B1F3A]/12">
          {STATS.map((s) => (
            <StatCounter
              key={s.label}
              value={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              label={s.label}
            />
          ))}
        </div>
      </section>

      {/* HOW WE WORK — replaces former Leadership grid */}
      <section className="container py-24">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">How we work</span>
              <h2 className="display-lg mt-3 text-[#0B1F3A]">
                Three principles we run every account against.
              </h2>
              <p className="mt-5 text-[#0B1F3A]/70 text-[15.5px] leading-relaxed">
                PreciseHire is a privately-held, owner-operated, U.S.-based
                company. We are not a portfolio asset of a private-equity sponsor
                and we do not answer to an offshore parent. Every decision about
                how we run a report, escalate a flag, or handle a dispute is made
                by the same small group of people who started the company.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-1 gap-5">
            {HOW_WE_WORK.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 0.05}>
                  <article className="rounded-3xl bg-white border border-[#0B1F3A]/10 p-7 flex gap-5 items-start">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#FFF7F2] text-[#B7232A]">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-[20px] font-semibold text-[#0B1F3A]">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-[15px] text-[#0B1F3A]/75 leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-[#FAF7F2] border-y border-[#0B1F3A]/8">
        <div className="container py-20">
          <Reveal>
            <span className="eyebrow">Twenty-two years on the page</span>
            <h2 className="display-md mt-3 text-[#0B1F3A] max-w-3xl">
              Milestones that shaped the company we are now.
            </h2>
          </Reveal>
          <ol className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.03}>
                <li className="relative rounded-2xl border border-[#0B1F3A]/10 bg-white p-6 h-full">
                  <div className="font-display text-[28px] font-semibold text-[#B7232A] leading-none">
                    {t.year}
                  </div>
                  <h3 className="mt-4 font-display text-[17px] font-semibold text-[#0B1F3A]">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-[#0B1F3A]/70 leading-relaxed">
                    {t.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* VALUES */}
      <section className="container py-24">
        <Reveal>
          <span className="eyebrow">What we believe</span>
          <h2 className="display-lg mt-3 text-[#0B1F3A] max-w-2xl">
            Four convictions we don't compromise on.
          </h2>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="p-7 rounded-3xl bg-white border border-[#0B1F3A]/10 h-full">
                <h3 className="font-display text-xl font-semibold text-[#0B1F3A]">
                  {v.title}
                </h3>
                <p className="mt-3 text-[15px] text-[#0B1F3A]/70 leading-relaxed">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <Reveal>
          <div className="rounded-[28px] bg-[#0B1F3A] text-white px-8 lg:px-14 py-14 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div>
              <h2 className="display-md">
                Want to work with people who care about the work?
              </h2>
              <p className="mt-3 text-white/70 max-w-2xl">
                We'd love to hear from you &mdash; whether you're hiring next
                week or next quarter.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/talk-to-an-expert"
                className="btn-coral rounded-full px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2"
              >
                Talk to us <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/support"
                className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/5 inline-flex items-center gap-2"
              >
                <Phone className="size-4 text-[#E26C72]" /> See our support hours
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
