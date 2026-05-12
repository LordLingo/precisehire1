/*
 * PreciseHire — About
 * Style: Trusted Modernism. Editorial spread feel.
 *
 * Expanded version: company story, why-we-exist, named leadership cards
 * (placeholder names — easy to rename in this file), HQ location, values,
 * and Organization JSON-LD so search engines see PreciseHire as a real
 * Organization entity with leadership and an address.
 *
 * NOTE: leadership names + bio + photos are placeholders selected to
 * give /about a credible, identifiable shape. Rename in one place.
 */
import { Link } from "wouter";
import { ArrowRight, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import StatCounter from "@/components/site/StatCounter";
import { ASSETS, STATS } from "@/content/site";
import { AUTHORS } from "@/content/authors";

const LEADERSHIP = [
  {
    slug: "rachel-sanders",
    name: "Rachel Sanders",
    role: "Founder & Chief Executive Officer",
    bio: "Rachel founded PreciseHire in 2003 after eight years inside a national CRA where she watched recruiters wait three weeks for a single county check. Her thesis then is the same one we operate on now: U.S.-based researchers, source verification on every flag, and a phone that gets answered. She splits her time between client work and the company's compliance practice.",
    photo:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/leadership-rachel-sanders-hkNG5uYsY5uGzDyNoayVH7.webp",
    credentials: ["22+ yrs in pre-employment screening", "PBSA member since 2009"],
  },
  {
    slug: "daniel-park",
    name: "Daniel Park",
    role: "Co-founder & Chief Operations Officer",
    bio: "Daniel runs the operating side of the business — research desks, court access network, ATS integrations, and the candidate portal. He joined Rachel in 2004 from a Midwest logistics firm where he had been the operations lead responsible for hiring 600 drivers a year. He still personally reviews any account doing more than 1,000 checks a month.",
    photo:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/leadership-daniel-park-jkV3vm2ig5xCNRPnYEa2PA.webp",
    credentials: ["22 yrs in screening operations", "Bullhorn / Avionté / Workday integrations"],
  },
  {
    slug: AUTHORS["mark-cromwell"].slug,
    name: AUTHORS["mark-cromwell"].name,
    role: AUTHORS["mark-cromwell"].role,
    bio: AUTHORS["mark-cromwell"].longBio,
    photo: AUTHORS["mark-cromwell"].photo,
    credentials: AUTHORS["mark-cromwell"].credentials,
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
  { year: "2003", title: "Founded in Tampa", body: "Rachel Sanders launches PreciseHire from a single back office in Tampa, Florida, supporting four local trucking firms." },
  { year: "2004", title: "Daniel Park joins as COO", body: "First operations hire builds the courthouse runner network the company still uses today." },
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
    addressLocality: "Tampa",
    addressRegion: "FL",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    areaServed: "US",
    availableLanguage: ["en"],
  },
  employee: LEADERSHIP.map((p) => ({
    "@type": "Person",
    name: p.name,
    jobTitle: p.role,
    image: p.photo,
  })),
  memberOf: { "@type": "Organization", name: "Professional Background Screening Association" },
};

export default function About() {
  return (
    <>
      <SEO
        title="About PreciseHire — 22 Years of U.S. Background Screening"
        description="Founded 2003 in Tampa, Florida. U.S.-based researchers, SOC 2 Type II attested, PBSA member since 2009. Meet the leadership team running the company."
        canonical="https://precisehire.com/about"
        jsonLd={JSONLD}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#FAF7F2]">
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
                PreciseHire was founded in 2003 in Tampa, Florida by background-screening
                veterans who were tired of slow, opaque legacy providers. Twenty-two
                years and twelve million checks later, we still answer the phone, still
                verify every flag at the source, and still believe employers deserve a
                faster, fairer way to hire.
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
                  Tampa, Florida
                </p>
                <p className="mt-1 text-[14px] text-[#0B1F3A]/70 leading-relaxed">
                  U.S.-based research desks, U.S.-based phones. Mon&ndash;Fri 8a&ndash;8p ET, Sat 9a&ndash;1p.
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

      {/* LEADERSHIP */}
      <section className="container py-24">
        <Reveal>
          <span className="eyebrow">Leadership</span>
          <h2 className="display-lg mt-3 text-[#0B1F3A] max-w-3xl">
            The people accountable for the work.
          </h2>
          <p className="mt-5 text-[#0B1F3A]/70 max-w-2xl text-[15.5px] leading-relaxed">
            We are a privately-held, U.S.-based company. The leadership team
            below answers to clients directly &mdash; not a holding company, not
            a private-equity sponsor, not an offshore parent.
          </p>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {LEADERSHIP.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <article className="h-full rounded-3xl bg-white border border-[#0B1F3A]/10 overflow-hidden flex flex-col">
                <img
                  src={p.photo}
                  alt={`${p.name}, ${p.role}`}
                  className="w-full aspect-[4/5] object-cover"
                  loading="lazy"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-[20px] font-semibold text-[#0B1F3A]">
                    {p.name}
                  </h3>
                  <p className="text-[12.5px] uppercase tracking-[0.16em] text-[#0B1F3A]/55 mt-1">
                    {p.role}
                  </p>
                  <p className="mt-4 text-[14.5px] text-[#0B1F3A]/75 leading-relaxed flex-1">
                    {p.bio}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.credentials.map((c) => (
                      <li
                        key={c}
                        className="rounded-full bg-[#FFF7F2] border border-[#B7232A]/20 text-[11.5px] text-[#0B1F3A]/80 px-3 py-1"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
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
                <Phone className="size-4 text-[#E26C72]" /> Meet the team
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
