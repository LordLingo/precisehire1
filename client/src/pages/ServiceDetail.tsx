/*
 * PreciseHire — Service detail page (one per service)
 * Style: Trusted Modernism. Asymmetric hero + spec ribbon + bullets + use-case
 * pills + final CTA. Per-service JSON-LD Service schema.
 */
import { Link, useRoute } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import NotFound from "@/pages/NotFound";
import { SERVICES, ASSETS } from "@/content/site";

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:slug");
  const svc = SERVICES.find((s) => s.slug === params?.slug);
  if (!svc) return <NotFound />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.title,
    description: svc.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Precise Hire",
      url: "https://precisehire.com/",
    },
    areaServed: "United States",
    serviceType: svc.title,
  };

  // Find related services (next two in the array, looping)
  const idx = SERVICES.findIndex((s) => s.slug === svc.slug);
  const related = [SERVICES[(idx + 1) % SERVICES.length], SERVICES[(idx + 2) % SERVICES.length]];

  return (
    <>
      <SEO
        title={svc.metaTitle}
        description={svc.metaDescription}
        image={svc.hero}
        canonical={`https://precisehire.com/services/${svc.slug}`}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={ASSETS.swooshSky} alt="" aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 w-[460px] opacity-50 rotate-[-12deg]" />
        <div className="container pt-16 lg:pt-24 pb-16 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <nav aria-label="Breadcrumb" className="text-sm text-[#0B1F3A]/55">
                <Link href="/" className="hover:text-[#0B1F3A]">Home</Link>
                <span className="px-2">/</span>
                <Link href="/services" className="hover:text-[#0B1F3A]">Services</Link>
                <span className="px-2">/</span>
                <span className="text-[#0B1F3A]/80">{svc.title}</span>
              </nav>
              <span className="eyebrow mt-6 block">{svc.eyebrow}</span>
              <h1 className="display-xl mt-3 text-[#0B1F3A]">{svc.headline}</h1>
              <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed max-w-2xl">{svc.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold">
                  Get this check <ArrowRight className="size-4" />
                </Link>
                <Link href="/pricing" className="btn-ghost-navy inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold">
                  See package pricing
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.05}>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#0B1F3A]/10 shadow-[0_24px_60px_-24px_rgba(11,31,58,0.35)]">
                <img src={svc.hero} alt={svc.title} className="absolute inset-0 size-full object-cover" loading="eager" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Specs ribbon */}
      <section className="container">
        <div className="ribbon-stat grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0B1F3A]/12">
          {svc.specs.map((spec) => (
            <div key={spec.label} className="py-7 md:py-9 md:px-8 first:md:pl-0 last:md:pr-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0B1F3A]/55">{spec.label}</p>
              <p className="mt-2 font-display text-2xl md:text-[1.75rem] font-semibold text-[#0B1F3A]">{spec.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">What's included</span>
              <h2 className="display-lg mt-3 text-[#0B1F3A]">Everything covered, nothing buried in the fine print.</h2>
              <p className="mt-4 text-[#0B1F3A]/70 max-w-md">
                Each report rolls up the sources below into a single, easy-to-read
                summary your hiring managers can scan in under a minute.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <ul className="grid sm:grid-cols-2 gap-4">
                {svc.bullets.map((b) => (
                  <li key={b} className="flex gap-3 p-5 rounded-2xl bg-white border border-[#0B1F3A]/10">
                    <span className="shrink-0 inline-flex size-7 items-center justify-center rounded-full bg-[#0B1F3A] text-white">
                      <Check className="size-4" />
                    </span>
                    <span className="text-[15px] text-[#0B1F3A]/85 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="container pb-20">
        <Reveal>
          <span className="eyebrow">Who it's for</span>
          <h2 className="display-md mt-3 text-[#0B1F3A]">Industries that lean on this check the most</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {svc.whoFor.map((w) => (
              <span key={w} className="inline-flex items-center px-4 py-2 rounded-full bg-[#FFFCF7] border border-[#0B1F3A]/15 text-sm font-medium text-[#0B1F3A]">
                {w}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Related */}
      <section className="container pb-24">
        <Reveal>
          <h2 className="display-md text-[#0B1F3A]">Often paired with</h2>
        </Reveal>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {related.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.05}>
              <Link href={`/services/${r.slug}`} className="group block rounded-3xl overflow-hidden bg-white border border-[#0B1F3A]/10 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-22px_rgba(11,31,58,0.25)]">
                <div className="grid grid-cols-5">
                  <div className="col-span-2 relative aspect-square">
                    <img src={r.hero} alt={r.title} className="absolute inset-0 size-full object-cover" loading="lazy" />
                  </div>
                  <div className="col-span-3 p-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF5A4E]">{r.eyebrow}</span>
                    <h3 className="mt-2 font-display text-xl font-semibold text-[#0B1F3A]">{r.title}</h3>
                    <p className="mt-2 text-sm text-[#0B1F3A]/65 line-clamp-3">{r.intro}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1F3A] group-hover:text-[#FF5A4E] transition-colors">
                      Learn more <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <Reveal>
          <div className="rounded-[28px] bg-[#0B1F3A] text-white px-8 lg:px-14 py-14 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="display-md">Add {svc.title.toLowerCase()} to your next package.</h2>
              <p className="mt-3 text-white/70 max-w-2xl">Mix and match to match your role and risk profile. Most accounts go live the same day.</p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link href="/contact" className="btn-coral text-center rounded-full px-6 py-3.5 text-sm font-semibold">Get started</Link>
              <Link href="/pricing" className="text-center rounded-full px-6 py-3.5 text-sm font-semibold border border-white/30 hover:bg-white/10 transition-colors">See pricing</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
