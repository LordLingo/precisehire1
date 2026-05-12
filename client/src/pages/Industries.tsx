/*
 * PreciseHire — Industries
 * Style: Trusted Modernism. Editorial intro + anchored deep links per industry.
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { INDUSTRIES, SERVICES, ASSETS } from "@/content/site";

export default function Industries() {
  return (
    <>
      <SEO
        title="Background Checks by Industry | Precise Hire"
        description="Pre-built screening packages for healthcare, transportation, staffing, finance, retail, and nonprofit hiring — built around each industry's actual risk profile."
        canonical="https://precisehire.com/industries"
      />

      <section className="relative overflow-hidden">
        <img src={ASSETS.swooshCoral} alt="" aria-hidden="true" className="pointer-events-none absolute -top-20 -right-24 w-[460px] opacity-50 rotate-[20deg]" />
        <div className="container pt-20 lg:pt-28 pb-12 max-w-3xl">
          <Reveal>
            <span className="eyebrow">Industries</span>
            <h1 className="display-xl mt-4 text-[#0B1F3A]">Packages tuned to how your industry actually hires.</h1>
            <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed">
              Different sectors face different risks, regulations, and timelines. Our
              specialists pre-build screening packages that reflect each one — so
              you're not paying for what you don't need or missing what you should.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container pb-24 space-y-16">
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
                    const deepDive: Record<string, string> = {
                      healthcare: "/industries/healthcare",
                      transportation: "/industries/transportation",
                    };
                    const dd = deepDive[ind.slug];
                    if (dd) {
                      const label = ind.slug === "healthcare" ? "healthcare" : "DOT & fleet";
                      return (
                        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
                          <Link href={dd} className="inline-flex items-center gap-2 text-sm font-semibold text-[#B7232A] hover:underline">Read the {label} deep-dive <ArrowRight className="size-4" /></Link>
                          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A]/65 hover:text-[#0B1F3A]">Or build a package directly <ArrowRight className="size-4" /></Link>
                        </div>
                      );
                    }
                    return (
                      <Link href="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:text-[#B7232A]">Build a {ind.title.toLowerCase()} package <ArrowRight className="size-4" /></Link>
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
