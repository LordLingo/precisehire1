/*
 * PreciseHire — Industries
 * Style: Trusted Modernism. Editorial intro + anchored deep links per industry.
 */
import { Link } from "wouter";
import { ArrowRight, Layers, Building2 } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { INDUSTRIES, SERVICES, ASSETS } from "@/content/site";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/hero-industries-v2-ENewh8oWaLQGxWGutpznDF.webp";

const FEATURED_INDUSTRY_LINKS = [
  { label: "Healthcare", href: "/industries/healthcare", description: "License, sanctions, drug testing, and clinical role screening." },
  { label: "Transportation", href: "/industries/transportation", description: "DOT-ready MVR, CDLIS, drug testing, and fleet screening." },
  { label: "Staffing agencies", href: "/industries/staffing", description: "High-volume screening packages for branch-based staffing firms." },
  { label: "Retail & hospitality", href: "/industries/retail-hospitality-background-checks", description: "Fast packages for hourly, seasonal, franchise, and guest-facing roles." },
  { label: "Nonprofit volunteers", href: "/industries/nonprofit-volunteer-background-checks", description: "Volunteer, youth-program, driver, and vulnerable-population screening." },
  { label: "Churches & ministries", href: "/industries/church-background-checks", description: "Volunteer, child-safety, youth ministry, and church staff checks." },
  { label: "Property management", href: "/industries/property-management-background-checks", description: "Screen leasing, maintenance, onsite staff, contractors, and key-access roles." },
  { label: "Construction", href: "/industries/construction-background-checks", description: "Criminal checks, MVRs, and drug testing for jobsite and field crews." },
];

const INDUSTRY_DEEP_DIVES: Record<string, { href: string; label: string }> = {
  healthcare: { href: "/industries/healthcare", label: "healthcare" },
  transportation: { href: "/industries/transportation", label: "DOT & fleet" },
  staffing: { href: "/industries/staffing", label: "staffing & light industrial" },
  retail: { href: "/industries/retail-hospitality-background-checks", label: "retail & hospitality" },
  nonprofit: { href: "/industries/nonprofit-volunteer-background-checks", label: "nonprofit & volunteer" },
};

export default function Industries() {
  return (
    <>
      <SEO
        title="Background Checks by Industry | Precise Hire"
        description="Pre-built screening packages for healthcare, transportation, staffing, finance, retail, and nonprofit hiring — built around each industry's actual risk profile."
        canonical="https://precisehire.com/industries"
      />

      {/* HERO — editorial split */}
      <section className="relative overflow-hidden bg-[#FAF7F2]">
        <img
          src={ASSETS.swooshSky}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-28 w-[520px] opacity-60"
        />
        <img
          src={ASSETS.swooshCoral}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-20 w-[460px] opacity-50 rotate-[14deg]"
        />
        <div className="container pt-16 lg:pt-24 pb-20 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center relative">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="eyebrow">
                <Layers className="size-3.5 text-[#B7232A]" />
                Industries
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-5 text-[#0B1F3A]">
                Packages tuned to how your{" "}
                <span className="italic relative inline-block">
                  industry
                  <span className="absolute left-0 right-0 -bottom-1 h-[6px] bg-[#B7232A]/85 rounded-full" />
                </span>{" "}
                actually hires.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.7] text-[#0B1F3A]/75 max-w-2xl">
                Different sectors face different risks, different regulators, and
                different timelines. Our specialists pre-build screening
                packages that reflect each one — so you are not paying for what
                you do not need, and not missing what you should.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/get-a-quote"
                  className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Get a quote <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#industry-guides"
                  className="btn-ghost-navy inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  View industry guides
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#0B1F3A]/70">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#B7232A]" />
                  FCRA-compliant by default
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#B7232A]" />
                  SOC 2 Type II
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#B7232A]" />
                  PBSA-aligned researchers
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 relative">
            <Reveal delay={0.1}>
              <div className="relative rounded-[28px] overflow-hidden border border-[#0B1F3A]/10 shadow-[0_30px_70px_-30px_rgba(11,31,58,0.4)] aspect-[4/3]">
                <img
                  src={HERO_IMG}
                  alt="PreciseHire operations team reviewing screening packages across multiple industries"
                  className="size-full object-cover"
                />
              </div>
            </Reveal>
            {/* Floating stat — sectors served */}
            <Reveal delay={0.18}>
              <div className="absolute -bottom-6 -left-4 sm:left-6 lg:-left-8 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-[0_20px_50px_-25px_rgba(11,31,58,0.35)] px-5 py-4 flex items-center gap-3 max-w-[280px]">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#0B1F3A] text-white shrink-0">
                  <Building2 className="size-4" />
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-[#0B1F3A]/55">
                    Sectors served
                  </div>
                  <div className="font-display text-[19px] font-semibold text-[#0B1F3A] leading-tight">
                    8+ industry guides, one specialist team
                  </div>
                </div>
              </div>
            </Reveal>
            {/* Floating stat — turnaround */}
            <Reveal delay={0.22}>
              <div className="absolute -top-5 right-2 sm:right-6 lg:-right-4 rounded-2xl bg-[#0B1F3A] text-white shadow-[0_20px_50px_-25px_rgba(11,31,58,0.45)] px-5 py-4 max-w-[230px]">
                <div className="text-[11px] uppercase tracking-[0.14em] text-white/55">
                  Median TAT
                </div>
                <div className="font-display text-[20px] font-semibold leading-tight">
                  87% cleared in under 4 hours
                </div>
                <div className="mt-1 text-[11px] text-white/60">
                  Across all sectors, last 30 days
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="industry-guides" className="bg-white border-y border-[#0B1F3A]/8">
        <div className="container py-14 lg:py-18">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow justify-center">
                <Building2 className="size-3.5 text-[#B7232A]" />
                Industry SEO guides
              </span>
              <h2 className="display-md mt-4 text-[#0B1F3A]">Choose the screening guide closest to your business.</h2>
              <p className="mt-4 text-[16px] leading-7 text-[#0B1F3A]/70">
                These deep-dive pages help search engines and buyers understand the
                packages we recommend for each hiring environment.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {FEATURED_INDUSTRY_LINKS.map((item, index) => (
              <Reveal key={item.href} delay={index * 0.03}>
                <Link
                  href={item.href}
                  className="group block h-full rounded-[1.5rem] border border-[#0B1F3A]/10 bg-[#FAF7F2] p-5 transition-all hover:-translate-y-0.5 hover:border-[#B7232A]/40 hover:bg-white hover:shadow-[0_18px_34px_-24px_rgba(11,31,58,0.28)]"
                >
                  <h3 className="text-lg font-semibold text-[#0B1F3A] group-hover:text-[#B7232A]">{item.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#0B1F3A]/68">{item.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1F3A] group-hover:text-[#B7232A]">
                    Read guide <ArrowRight className="size-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20 lg:py-24 space-y-16">
        {INDUSTRIES.map((ind, i) => {
          const services = ind.recommended.map((slug) => SERVICES.find((s) => s.slug === slug)).filter(Boolean) as typeof SERVICES;
          const reverse = i % 2 === 1;
          return (
            <Reveal key={ind.slug}>
              <article id={ind.slug} className={`grid lg:grid-cols-12 gap-10 items-center scroll-mt-24 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="lg:col-span-5">
                  <div className="rounded-3xl overflow-hidden border border-[#0B1F3A]/10 aspect-[4/3]">
                    <img src={services[0]?.hero || ASSETS.team} alt={ind.title} className="size-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <span className="eyebrow">{ind.title}</span>
                  <h2 className="display-md mt-3 text-[#0B1F3A]">{ind.title}</h2>
                  <p className="mt-4 text-[#0B1F3A]/75 leading-relaxed">{ind.blurb}</p>
                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0B1F3A]/55">Recommended checks</p>
                    <ul className="mt-3 flex flex-wrap gap-2.5">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFFCF7] border border-[#0B1F3A]/15 text-sm font-medium text-[#0B1F3A] hover:border-[#B7232A]/60 hover:text-[#B7232A] transition-colors">
                            {s.title} <ArrowRight className="size-3.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {(() => {
                    const dd = INDUSTRY_DEEP_DIVES[ind.slug];
                    if (dd) {
                      return (
                        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
                          <Link href={dd.href} className="inline-flex items-center gap-2 text-sm font-semibold text-[#B7232A] hover:underline">Read the {dd.label} deep-dive <ArrowRight className="size-4" /></Link>
                          <Link href={`/get-a-quote?industry=${encodeURIComponent(ind.title)}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A]/65 hover:text-[#0B1F3A]">Or get a quote directly <ArrowRight className="size-4" /></Link>
                        </div>
                      );
                    }
                    return (
                      <Link href={`/get-a-quote?industry=${encodeURIComponent(ind.title)}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:text-[#B7232A]">Build a {ind.title.toLowerCase()} package <ArrowRight className="size-4" /></Link>
                    );
                  })()}
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>
    </>
  );
}
