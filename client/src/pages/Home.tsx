/*
 * PreciseHire — Home page
 * Design: "Trusted Modernism" — display=Fraunces serif, body=Inter, asymmetric hero,
 * cream background with watercolor swooshes, navy + coral accents, ribbon stats,
 * count-up numerals, subtle Framer Motion fade-ups.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock3, Sparkles, Plug, CheckCircle2, Star, HeartPulse, Truck, Building2, ShoppingBag, Landmark, Wrench, Phone, Headphones } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import StatCounter from "@/components/site/StatCounter";
import { ASSETS, SERVICES, INDUSTRIES, STATS, FAQ_ITEMS, COMPANY } from "@/content/site";
import { TURNAROUND } from "@/content/turnaround";
import { TEAM } from "@/content/team";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { LucideIcon } from "lucide-react";

const HOMEPAGE_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://precisehire.com/#org",
      name: "Precise Hire",
      url: "https://precisehire.com/",
      foundingDate: "2003-01-01",
      slogan: "Background checks employers actually trust.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://precisehire.com/#site",
      url: "https://precisehire.com/",
      name: "Precise Hire",
      publisher: { "@id": "https://precisehire.com/#org" },
    },
    {
      "@type": "Service",
      name: "Employment Background Checks",
      provider: { "@id": "https://precisehire.com/#org" },
      areaServed: "United States",
      serviceType: "Background screening, drug testing, MVR, employment & education verification",
    },
  ],
};

// ---------------------------------------------------------------------------
// Client logo strip — placeholder lockups (icon + Fraunces wordmark) until we
// have permission-cleared real client logos from the PreciseHire team.
// Each entry maps 1:1 to a slot in the 6-column grid below the hero.
// ---------------------------------------------------------------------------
// Anonymized customer mix — the named-logo strip is intentionally NOT used
// until we have written permission from clients to publish their marks.
// Each row represents a live customer category at typical engagement size,
// described in a way that is faithful and verifiable without naming anyone.
const CLIENT_LOGOS: { name: string; sub: string; icon: LucideIcon }[] = [
  { name: "Regional health system", sub: "6 hospitals · 4,200 staff",  icon: HeartPulse },
  { name: "National last-mile fleet", sub: "2,400 CDL drivers",         icon: Truck },
  { name: "Light-industrial staffing", sub: "180 branches",             icon: Building2 },
  { name: "Regional retail group",   sub: "96 store locations",         icon: ShoppingBag },
  { name: "Community bank",          sub: "31 branches · FINRA",       icon: Landmark },
  { name: "Mechanical contractor",   sub: "600 trades, multi-state",    icon: Wrench },
];

function LogoMark({ icon: Icon, name, sub }: { icon: LucideIcon; name: string; sub: string }) {
  return (
    <div
      className="group inline-flex items-center gap-3 text-[#0B1F3A]/65 w-full max-w-[230px]
                 motion-safe:transition-colors motion-safe:duration-300
                 hover:text-[#0B1F3A]"
      aria-label={`${name} — ${sub}`}
    >
      <span
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full
                   border border-[#0B1F3A]/15 bg-white/60
                   motion-safe:transition-colors motion-safe:duration-300
                   group-hover:border-[#B7232A]/40 group-hover:bg-white"
      >
        <Icon className="size-[18px]" strokeWidth={1.6} />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[14.5px] font-semibold tracking-tight text-[#0B1F3A]">
          {name}
        </span>
        <span className="block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#0B1F3A]/50">
          {sub}
        </span>
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SEO
        title="Precise Hire — Background Checks Employers Trust"
        description="FCRA-compliant employment background checks, drug testing, MVR, and verifications — most reports back in under 4 hours. Trusted by employers for 22+ years."
        canonical="https://precisehire.com/"
        jsonLd={HOMEPAGE_JSONLD}
      />

      {/* HERO — asymmetric: copy left, portrait right with swooshes behind */}
      <section className="relative overflow-hidden">
        {/* Decorative swooshes (behind everything else) */}
        <img
          src={ASSETS.swooshSky}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-20 -left-24 w-[520px] opacity-70 rotate-[-15deg]"
        />
        <div className="container relative pt-12 lg:pt-20 pb-16 lg:pb-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#B7232A]" />
                Trusted by employers since 2003
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-5 text-[#0B1F3A]">
                Hire faster.{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Hire</span>
                  <svg viewBox="0 0 200 16" className="absolute left-0 right-0 -bottom-2 w-full h-3 z-0" aria-hidden="true">
                    <path d="M2 10 C 50 2, 150 18, 198 6" stroke="#B7232A" strokeWidth="6" strokeLinecap="round" fill="none" />
                  </svg>
                </span>{" "}
                with <span className="italic text-[#0B1F3A]/95">certainty.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg lg:text-xl text-[#0B1F3A]/75 max-w-xl leading-relaxed">
                Court-verified criminal records, accurate employment & education
                checks, drug testing, and MVRs — most reports back in under four hours.
                Built around FCRA compliance so your offers go out with confidence.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/get-a-quote" className="btn-coral inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold">
                  Get a quote <ArrowRight className="size-4" />
                </Link>
                <Link href="/services" className="btn-ghost-navy inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold">
                  Explore services
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#0B1F3A]/65">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-[#0B1F3A]" /> FCRA-compliant</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-[#0B1F3A]" /> SOC 2 Type II</span>
                <span className="inline-flex items-center gap-2"><Star className="size-4 text-[#0B1F3A]" /> 4.9 / 5 client rating</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative pb-12 lg:pb-6">
            <Reveal delay={0.1} y={32}>
              <div className="relative group">
                <img
                  src={ASSETS.swooshCoral}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -right-12 -top-10 w-[420px] opacity-80 rotate-[12deg] motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-out group-hover:rotate-[14deg] group-hover:translate-x-1"
                />
                {/* Hero portrait card — subtle lift + image zoom on hover */}
                <div
                  className="relative z-10 w-full max-w-[560px] mx-auto rounded-[28px] overflow-hidden shadow-[0_24px_60px_-22px_rgba(11,31,58,0.35)] motion-safe:transition-[transform,box-shadow] motion-safe:duration-500 motion-safe:ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_36px_70px_-20px_rgba(11,31,58,0.45)]"
                >
                  <img
                    src={ASSETS.hero}
                    alt="PreciseHire support specialists on calls in our McKinney, Texas office"
                    className="block w-full h-auto object-cover motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-out group-hover:scale-[1.035]"
                    loading="eager"
                    width={1408}
                    height={1056}
                  />
                  {/* Soft cream overlay that warms on hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0B1F3A]/0 via-transparent to-[#B7232A]/0 motion-safe:transition-colors motion-safe:duration-700 group-hover:from-[#0B1F3A]/10 group-hover:to-[#B7232A]/10"
                  />
                  {/* Red corner accent that fades in */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-4 right-4 h-10 w-10 rounded-full bg-[#B7232A] opacity-0 scale-75 motion-safe:transition-all motion-safe:duration-500 group-hover:opacity-100 group-hover:scale-100"
                  />
                </div>
                {/* Floating proof badge — gentle counter-lift on hover */}
                <div className="absolute z-20 -bottom-10 left-4 lg:-left-8 bg-white rounded-2xl shadow-xl border border-[#0B1F3A]/8 px-5 py-4 flex items-center gap-3 max-w-[280px] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out group-hover:-translate-y-1 group-hover:translate-x-1">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#B7232A] text-white shrink-0">
                    <Clock3 className="size-5" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#0B1F3A]/60 font-semibold">Median turnaround · this week</p>
                    <p className="font-display text-xl font-semibold text-[#0B1F3A] leading-tight">{TURNAROUND.medianThisWeek}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ----------------------------------------------------------------
             LIVE TURNAROUND TICKER
             ----------------------------------------------------------------
             Public proof of the speed claim. Numbers are sourced weekly
             from /client/src/content/turnaround.ts — update that file
             every Monday morning from the production reporting dashboard.
             ---------------------------------------------------------------- */}
        <section className="relative bg-[#0B1F3A] text-white" aria-labelledby="turnaround-heading">
          {/* subtle red brushstroke peeking from the right edge */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 right-0 h-40 w-1/3
                       bg-[radial-gradient(ellipse_at_top_right,rgba(183,35,42,0.35),transparent_70%)]"
          />
          <div className="container relative py-14 md:py-16">
            <Reveal>
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F2C8B0]">
                    <span className="mr-2 inline-flex h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[#F2C8B0] motion-safe:animate-pulse" aria-hidden="true" />
                    Live turnaround
                  </p>
                  <h2
                    id="turnaround-heading"
                    className="mt-2 font-display text-3xl md:text-4xl font-semibold leading-tight"
                  >
                    What our team actually delivered<br className="hidden md:block" /> this week.
                  </h2>
                </div>
                <p className="text-[12px] text-white/55">
                  Updated weekly &middot; {TURNAROUND.updatedLabel}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-2 bg-[#0B1F3A] p-7">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Median report time
                  </dt>
                  <dd className="font-display text-3xl font-semibold leading-none">
                    {TURNAROUND.medianThisWeek}
                  </dd>
                  <p className="text-[12px] text-white/55">end-to-end, this week</p>
                </div>
                <div className="flex flex-col gap-2 bg-[#0B1F3A] p-7">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Same-day completion
                  </dt>
                  <dd className="font-display text-3xl font-semibold leading-none">
                    {TURNAROUND.sameDayPctThisWeek}
                  </dd>
                  <p className="text-[12px] text-white/55">of reports back same business day</p>
                </div>
                <div className="flex flex-col gap-2 bg-[#0B1F3A] p-7">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    30-day median
                  </dt>
                  <dd className="font-display text-3xl font-semibold leading-none">
                    {TURNAROUND.medianTrailing30}
                  </dd>
                  <p className="text-[12px] text-white/55">trailing four weeks</p>
                </div>
                <div className="flex flex-col gap-2 bg-[#0B1F3A] p-7">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Avg. phone pickup
                  </dt>
                  <dd className="font-display text-3xl font-semibold leading-none text-[#F2C8B0]">
                    {TURNAROUND.avgPickupSeconds}
                  </dd>
                  <p className="text-[12px] text-white/55">to a US-based human</p>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-3xl text-sm text-white/65">
                These numbers are pulled directly from our production reporting dashboard each Monday
                morning &mdash; not a marketing aspiration. The big four CRAs do not publish these figures
                because their offshore queues will not survive the comparison.
                {TURNAROUND.reportsThisWeek ? " Based on " + TURNAROUND.reportsThisWeek.toLocaleString() + " reports completed this week." : null}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Logo strip / social proof */}
        {/*
          CLIENT LOGO STRIP
          ----------------------------------------------------------------
          These are stylized industry placeholders (lucide icon + Fraunces
          wordmark) representing the sectors PreciseHire serves. When real
          client logos are available, replace each <LogoMark /> entry with:
              <img src="/brand/clients/<file>.svg" alt="Client name"
                   className="h-7 w-auto opacity-70 grayscale
                              hover:opacity-100 hover:grayscale-0
                              transition" />
          Keep the surrounding <Reveal>, label, and 6-column grid as-is.
        */}
        <div className="container relative pb-12">
          <Reveal>
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0B1F3A]/55">
              A representative cross-section of the customers we serve
            </p>
            <motion.div
              className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6
                         gap-x-6 gap-y-7 items-center justify-items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
              }}
            >
              {CLIENT_LOGOS.map((l) => (
                <motion.div
                  key={l.name}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  <LogoMark icon={l.icon} name={l.name} sub={l.sub} />
                </motion.div>
              ))}
            </motion.div>
            <p className="mt-6 text-center text-[11px] text-[#0B1F3A]/45">
              Customer mix shown as anonymized categories &mdash; we don&apos;t publish logos
              without written client permission. Real references provided on request.
            </p>
          </Reveal>
        </div>
      </section>

      {/* RIBBON STATS */}
      <section className="container">
        <div className="ribbon-stat grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#0B1F3A]/12">
          {STATS.map((s) => (
            <StatCounter key={s.label} value={s.value} prefix={s.prefix} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------
           SUPPORT TEAM PREVIEW
           ----------------------------------------------------------------
           Quick teaser of the American-staffed support desk. Three
           overlapping headshots + a one-line value prop + link to
           /support. Reads from /content/team.ts.
           ---------------------------------------------------------------- */}
      <section className="container py-24" aria-labelledby="support-preview-heading">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <Reveal>
              <div className="relative h-[280px] sm:h-[340px]">
                {TEAM.slice(0, 3).map((m, i) => (
                  <motion.div
                    key={m.slug}
                    className="absolute rounded-2xl overflow-hidden shadow-[0_20px_45px_-25px_rgba(11,31,58,0.55)] ring-1 ring-white"
                    style={{
                      width: "60%",
                      aspectRatio: "1 / 1",
                      left: `${i * 18}%`,
                      top: `${i * 22}px`,
                      zIndex: 10 + i,
                      transform: `rotate(${(i - 1) * 2.5}deg)`,
                    }}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={m.photo}
                      alt={`${m.name}, ${m.role}, ${m.region}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                ))}
                {/* live pickup badge floating above the stack */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute right-0 lg:-right-2 bottom-2 z-30
                             rounded-2xl bg-[#0B1F3A] text-white px-4 py-3
                             shadow-[0_18px_30px_-18px_rgba(11,31,58,0.65)]"
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#F2C8B0] font-semibold">
                    <Headphones className="size-3" /> Live
                  </div>
                  <p className="mt-1 font-display text-2xl font-semibold leading-none">
                    {TURNAROUND.avgPickupSeconds}
                  </p>
                  <p className="mt-1 text-[11px] text-white/65">avg. phone pickup</p>
                </motion.div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#B7232A]" /> American-staffed support
              </span>
              <h2
                id="support-preview-heading"
                className="display-lg mt-4 text-[#0B1F3A]"
              >
                Real people. Direct lines.{" "}
                <span className="text-[#B7232A]">No offshore queue.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 text-[17px] text-[#0B1F3A]/75 leading-relaxed max-w-2xl">
                Four named U.S.-based specialists run our support desk from McKinney, Texas. They know FCRA, they know
                your account, and they answer the phone in {TURNAROUND.avgPickupSeconds}
                {" "}— not eight rings and a script.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/support"
                  className="btn-coral rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
                >
                  Meet the team <ArrowRight className="size-4" />
                </Link>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="btn-ghost-navy rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
                >
                  <Phone className="size-4" /> {COMPANY.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES — alternating offset cards */}
      <section className="container py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">What we screen</span>
              <h2 className="display-lg mt-4 text-[#0B1F3A]">Every check, run with the same rigor.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.05}>
              <p className="text-[17px] text-[#0B1F3A]/70 leading-relaxed">
                Six core services, run on the same modern platform, ready to mix into a
                single package that fits your role, industry, and risk profile.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.slug} delay={i * 0.05}>
              <Link
                href={`/services/${svc.slug}`}
                className="group block h-full bg-white rounded-3xl border border-[#0B1F3A]/8 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_22px_40px_-22px_rgba(11,31,58,0.25)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={svc.hero} alt={svc.title} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B7232A]">{svc.eyebrow}</span>
                  <h3 className="mt-2 font-display text-[1.4rem] font-semibold text-[#0B1F3A] leading-snug">{svc.title}</h3>
                  <p className="mt-3 text-[15px] text-[#0B1F3A]/65 leading-relaxed line-clamp-3">{svc.intro}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1F3A] group-hover:text-[#B7232A] transition-colors">
                    Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY US — split with dashboard mockup */}
      <section className="relative overflow-hidden">
        <div className="container py-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden border border-[#0B1F3A]/10 shadow-[0_30px_60px_-30px_rgba(11,31,58,0.45)] bg-white">
                <img
                  src={ASSETS.dashboard}
                  alt="Precise Hire dashboard showing candidate list and completion times"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <img src={ASSETS.swooshSky} alt="" aria-hidden="true" className="pointer-events-none select-none absolute -bottom-10 -right-10 w-72 opacity-60" />
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <Reveal>
              <span className="eyebrow">Why employers choose us</span>
              <h2 className="display-lg mt-4 text-[#0B1F3A]">A platform built for hiring managers — not just compliance officers.</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="mt-8 grid gap-5">
                {[
                  { icon: Clock3, title: "Speed that matches your pipeline", body: "Most reports clear in under four hours. We notify you the second a status changes — no refreshing dashboards." },
                  { icon: ShieldCheck, title: "Compliance baked into the workflow", body: "FCRA disclosures, adverse-action timers, and state ban-the-box rules are handled automatically." },
                  { icon: Plug, title: "Connects with the tools you already use", body: "Greenhouse, Workday, Lever, iCIMS, Bullhorn, and a documented REST API for everything else." },
                  { icon: Sparkles, title: "Real humans behind every report", body: "A U.S.-based research team verifies every flag at the source courthouse. No black-box scoring." },
                ].map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex gap-4">
                    <span className="shrink-0 inline-flex size-11 items-center justify-center rounded-2xl bg-[#0B1F3A] text-white">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-[#0B1F3A]">{title}</h3>
                      <p className="mt-1 text-[15px] text-[#0B1F3A]/70 leading-relaxed">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="container py-24">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">Built for your industry</span>
              <h2 className="display-lg mt-4 text-[#0B1F3A]">Packages tuned to how you actually hire.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.05}>
              <p className="text-[17px] text-[#0B1F3A]/70 leading-relaxed">
                Different industries face different risks. Our specialists pre-build
                packages that reflect the rules and the realities of yours.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.slug} delay={i * 0.04}>
              <Link
                href={`/industries#${ind.slug}`}
                className="group block h-full p-7 rounded-3xl bg-[#FFFCF7] border border-[#0B1F3A]/10 transition-all hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-22px_rgba(11,31,58,0.25)]"
              >
                <h3 className="font-display text-xl font-semibold text-[#0B1F3A]">{ind.title}</h3>
                <p className="mt-3 text-[15px] text-[#0B1F3A]/70 leading-relaxed">{ind.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1F3A] group-hover:text-[#B7232A] transition-colors">
                  See the package <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="relative">
        <div className="container py-20 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <img src={ASSETS.team} alt="Operations team reviewing a background check workflow" className="absolute inset-0 size-full object-cover" loading="lazy" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <span className="eyebrow">In their words</span>
              <blockquote className="mt-5 font-display text-2xl lg:text-[2rem] leading-snug text-[#0B1F3A]">
                "We moved off a legacy provider that took two days for a basic county
                check. With Precise Hire, our recruiters open the dashboard in the
                morning and most reports are <em className="not-italic underline decoration-[#B7232A] decoration-4 underline-offset-4">already cleared</em>.
                It changed our time-to-hire by a full week."
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-10 rounded-full bg-[#0B1F3A] text-white inline-flex items-center justify-center font-display font-semibold">“”</div>
                <div>
                  <p className="font-semibold text-[#0B1F3A]">VP of People Operations</p>
                  <p className="text-sm text-[#0B1F3A]/60">Light-industrial staffing &middot; 180 branches &middot; <span className="text-[#0B1F3A]/45">named reference on request</span></p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-24">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Frequently asked</span>
              <h2 className="display-lg mt-4 text-[#0B1F3A]">Answers from people who actually run the checks.</h2>
              <p className="mt-5 text-[#0B1F3A]/70">
                Don't see your question? Our specialists are one short conversation away.
              </p>
              <Link href="/talk-to-an-expert" className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3 mt-6 text-sm font-semibold">
                Talk to a specialist <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <Accordion type="single" collapsible className="w-full">
                {FAQ_ITEMS.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#0B1F3A]/12">
                    <AccordionTrigger className="text-left text-lg font-display font-semibold text-[#0B1F3A] hover:no-underline py-5">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[15px] text-[#0B1F3A]/75 leading-relaxed pb-5">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-[#0B1F3A] text-white px-8 lg:px-16 py-14 lg:py-20">
            <img src={ASSETS.handshake} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/95 via-[#0B1F3A]/80 to-[#0B1F3A]/40" />
            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="eyebrow text-[#E26C72]">Ready when you are</span>
                <h2 className="display-lg mt-3">Make your next hire your most confident one.</h2>
                <p className="mt-4 text-white/75 max-w-xl">
                  Most teams are up and running the same day they sign. No setup fees,
                  no minimums, and a real person to walk you through your first check.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link href="/get-a-quote" className="btn-coral text-center rounded-full px-7 py-3.5 text-sm font-semibold">
                  Get a quote
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
