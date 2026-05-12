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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={ASSETS.swooshSky}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 w-[460px] opacity-50 rotate-[12deg]"
        />
        <img
          src={ASSETS.swooshCoral}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-24 -right-32 w-[520px] opacity-40 rotate-[18deg]"
        />

        <div className="container pt-20 lg:pt-28 pb-16 grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="eyebrow">Services</span>
              <h1 className="display-xl mt-4 text-[#0B1F3A]">
                Six checks.{" "}
                <span className="relative inline-block">
                  One platform.
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 220 14"
                    className="absolute left-0 -bottom-2 w-full text-[#B7232A]"
                    fill="none"
                  >
                    <path
                      d="M2 9 C 60 2, 140 14, 218 6"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                <span className="italic font-display">Zero compromises on compliance.</span>
              </h1>
              <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed max-w-xl">
                Every Precise Hire screening category runs on the same
                foundation: live source-record research, FCRA-grade QA, and a
                dashboard that tells your recruiters exactly what's pending,
                cleared, or needs action.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/get-a-quote"
                  className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Get a quote <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold border border-[#0B1F3A]/20 text-[#0B1F3A] hover:border-[#0B1F3A]/40 transition-colors"
                >
                  See the six checks
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#0B1F3A]/70">
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#B7232A]" />
                  FCRA-compliant by design
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#B7232A]" />
                  SOC 2 Type II
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#B7232A]" />
                  PBSA-accredited researchers
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right: hero image + floating live-status card */}
          <div className="lg:col-span-6">
            <Reveal delay={0.05}>
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#0B1F3A]/10 shadow-[0_30px_60px_-30px_rgba(11,31,58,0.45)]">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/services-hero-REU7sQh98qrYa3kpnchVnE.webp"
                    alt="A Precise Hire research specialist reviewing live candidate reports with a colleague in our McKinney, Texas operations office"
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>

                {/* Floating live-status card */}
                <div className="hidden md:block absolute -bottom-6 -left-6 rounded-2xl bg-white/95 backdrop-blur border border-[#0B1F3A]/10 shadow-[0_24px_45px_-20px_rgba(11,31,58,0.35)] p-4 w-[260px]">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#0B1F3A]/60">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                    </span>
                    Live this week
                  </div>
                  <div className="mt-2 font-display text-[22px] font-semibold text-[#0B1F3A] leading-tight">
                    87% of reports
                    <span className="block text-[#0B1F3A]/70 text-[15px] font-normal mt-0.5">
                      cleared in under 4 hours
                    </span>
                  </div>
                </div>

                {/* Floating service-count card */}
                <div className="hidden md:block absolute -top-5 -right-5 rounded-2xl bg-[#0B1F3A] text-white shadow-[0_24px_45px_-20px_rgba(11,31,58,0.55)] p-4">
                  <div className="text-[11px] uppercase tracking-[0.14em] text-white/70">
                    On this page
                  </div>
                  <div className="mt-1 font-display text-[22px] font-semibold leading-none">
                    {SERVICES.length} services
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Service rows */}
      <section id="services" className="container pb-24 scroll-mt-24">
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
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B7232A]">{svc.eyebrow}</span>
                    <h2 className="display-md mt-3 text-[#0B1F3A]">{svc.title}</h2>
                    <p className="mt-4 text-[#0B1F3A]/75 text-[17px] leading-relaxed">{svc.intro}</p>
                    <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {svc.bullets.slice(0, 4).map((b) => (
                        <li key={b} className="flex gap-2.5 text-[15px] text-[#0B1F3A]/80">
                          <span className="mt-2 inline-block size-1.5 rounded-full bg-[#B7232A] shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/services/${svc.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:text-[#B7232A] transition-colors">
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
