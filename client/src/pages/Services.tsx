/*
 * PreciseHire — Services index
 * Style: Trusted Modernism — alternating asymmetric rows pairing photography
 * with copy + spec list. Cream background, navy text, coral accents.
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { SERVICES, ASSETS } from "@/content/site";

export default function Services() {
  return (
    <>
      <SEO
        title="Background Check Services for Employers | Precise Hire"
        description="Criminal records, employment & education verification, MVR, drug testing, and international screening — all run on one fast, FCRA-compliant platform."
        canonical="https://precisehire.com/services"
      />

      {/* Header */}
      <section className="relative overflow-hidden">
        <img src={ASSETS.swooshSky} alt="" aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 w-[420px] opacity-50 rotate-[18deg]" />
        <div className="container pt-20 lg:pt-28 pb-12 max-w-3xl">
          <Reveal>
            <span className="eyebrow">Services</span>
            <h1 className="display-xl mt-4 text-[#0B1F3A]">Six checks. One platform. Zero compromises on compliance.</h1>
            <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed">
              Every Precise Hire screening category is built on the same foundation:
              live source-record research, FCRA-grade QA, and a dashboard that tells
              your recruiters exactly what's pending, cleared, or needs action.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Service rows */}
      <section className="container pb-24">
        <div className="space-y-20">
          {SERVICES.map((svc, i) => {
            const reverse = i % 2 === 1;
            return (
              <Reveal key={svc.slug}>
                <article className={`grid lg:grid-cols-12 gap-10 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="lg:col-span-6 relative">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#0B1F3A]/10">
                      <img src={svc.hero} alt={svc.title} className="absolute inset-0 size-full object-cover" loading="lazy" />
                    </div>
                  </div>
                  <div className="lg:col-span-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF5A4E]">{svc.eyebrow}</span>
                    <h2 className="display-md mt-3 text-[#0B1F3A]">{svc.title}</h2>
                    <p className="mt-4 text-[#0B1F3A]/75 text-[17px] leading-relaxed">{svc.intro}</p>
                    <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {svc.bullets.slice(0, 4).map((b) => (
                        <li key={b} className="flex gap-2.5 text-[15px] text-[#0B1F3A]/80">
                          <span className="mt-2 inline-block size-1.5 rounded-full bg-[#FF5A4E] shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/services/${svc.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:text-[#FF5A4E] transition-colors">
                      See how it works <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
