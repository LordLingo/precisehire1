/*
 * PreciseHire — Support page (/support)
 * Style commitment: Trusted Modernism. This page is the headline proof for the
 * "American-staffed support" positioning. Treat it as editorial: portrait grid,
 * generous white space, navy + coral accents, NO offshore-sounding boilerplate.
 *
 * Layout reads top-to-bottom as: positioning → live pickup proof → team grid →
 * coverage hours → comparison strip vs. the big offshore CRAs → CTA.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  MapPin,
  Headphones,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { ASSETS, COMPANY } from "@/content/site";
import { TEAM, SUPPORT_HOURS } from "@/content/team";
import { TURNAROUND } from "@/content/turnaround";

const SUPPORT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: "https://precisehire.com/support",
  name: "Talk to a real person — PreciseHire support",
  mainEntity: {
    "@type": "Organization",
    name: COMPANY.name,
    telephone: COMPANY.phoneRaw,
    email: COMPANY.email,
    contactPoint: TEAM.map((m) => ({
      "@type": "ContactPoint",
      contactType: m.role,
      name: m.name,
      areaServed: "US",
      availableLanguage: "English",
      telephone: COMPANY.phoneRaw,
    })),
  },
};

const COMPARISON: { row: string; us: string; them: string }[] = [
  {
    row: "Who picks up the phone?",
    us: "A named US-based specialist on our team",
    them: "An offshore call center reading from a script",
  },
  {
    row: "Average time to a human",
    us: TURNAROUND.avgPickupSeconds,
    them: "8–14 minutes (industry survey, 2024)",
  },
  {
    row: "Same person handles your account?",
    us: "Yes — direct extensions, no rotating queue",
    them: "No — a different agent every call",
  },
  {
    row: "Knows FCRA & adverse action workflow?",
    us: "Yes — compliance lead is on the team",
    them: "Routes you to a tier-2 ticket, 24–72 hr SLA",
  },
  {
    row: "Hours covered live",
    us: "7am–7pm Central, M–F + Sat on-call",
    them: "Often 9–5 in a single time zone you do not share",
  },
];

export default function Support() {
  return (
    <>
      <SEO
        title="Talk to a Real Person — US-Based Support | Precise Hire"
        description="When you call PreciseHire, a US-based specialist picks up — usually in under 12 seconds. Meet the team, see hours, and get a direct extension."
        canonical="https://precisehire.com/support"
        jsonLd={SUPPORT_JSONLD}
      />

      {/* ----------------------------------------------------------------
           HERO — positioning + live pickup-time proof
           ----------------------------------------------------------------
           Asymmetric: 7-col headline + 5-col proof card. Cream background,
           red accent under the eyebrow, navy display headline.
           ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden">
        <img
          src={ASSETS.swooshCoral}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 w-[520px] opacity-45 rotate-[14deg]"
        />
        <img
          src={ASSETS.swooshSky}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-44 -left-40 w-[420px] opacity-35"
        />
        <div className="container relative pt-20 lg:pt-28 pb-16 lg:pb-20">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="eyebrow inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#B7232A]" /> Support
                </span>
                <h1 className="display-xl mt-4 text-[#0B1F3A]">
                  You'll talk to a real person.{" "}
                  <span className="text-[#B7232A]">Every time.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed max-w-2xl">
                  No phone tree. No offshore call center. No "your ticket is
                  important to us" loop. When you call PreciseHire, one of four
                  named U.S.-based specialists in McKinney, Texas picks up — usually
                  in under {TURNAROUND.avgPickupSeconds}. They know your account, they
                  know FCRA, and they have the authority to actually fix things.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${COMPANY.phoneRaw}`}
                    className="btn-coral rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <Phone className="size-4" /> Call {COMPANY.phone}
                  </a>
                  <Link
                    href="/contact"
                    className="btn-ghost-navy rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <MessageSquare className="size-4" /> Send us a message
                  </Link>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-sm font-medium text-[#0B1F3A]/70 hover:text-[#0B1F3A] link-underline inline-flex items-center gap-2"
                  >
                    <Mail className="size-4" /> {COMPANY.email}
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Live pickup-time proof card */}
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="relative rounded-3xl bg-[#0B1F3A] text-white p-8 lg:p-10 shadow-[0_30px_60px_-30px_rgba(11,31,58,0.55)]">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    <Headphones className="size-3.5" /> Live · this week
                  </div>
                  <p className="mt-5 font-display text-[5.5rem] leading-none font-semibold text-[#F2C8B0]">
                    {TURNAROUND.avgPickupSeconds}
                  </p>
                  <p className="mt-2 text-base text-white/80">
                    average time to a US-based human on the phone
                  </p>
                  <div className="mt-7 grid grid-cols-2 gap-5 border-t border-white/10 pt-6">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/55 font-semibold">
                        Coverage
                      </p>
                      <p className="mt-1 text-sm text-white/90 leading-snug">
                        7am–7pm Central
                        <br />
                        Mon–Fri
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/55 font-semibold">
                        Where we are
                      </p>
                      <p className="mt-1 text-sm text-white/90 leading-snug">
                        McKinney, TX
                        <br />
                        Zero offshore
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-[12px] text-white/55">
                    Updated weekly · {TURNAROUND.updatedLabel}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
           TEAM GRID — 4 cards with headshot, name, role, region, ext
           ----------------------------------------------------------------
           Cream background, asymmetric card with subtle hover lift. Each
           card carries a click-to-call link with the extension appended.
           ---------------------------------------------------------------- */}
      <section className="container py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">The desk</span>
              <h2 className="display-lg mt-4 text-[#0B1F3A]">
                Four people. Four direct lines. No queue.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.05}>
              <p className="text-[17px] text-[#0B1F3A]/70 leading-relaxed">
                When something needs to move, you don't want to start over with a
                stranger. Pick the specialist closest to your question, dial their
                extension, and skip the queue.
              </p>
            </Reveal>
          </div>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
          }}
        >
          {TEAM.map((m) => (
            <motion.article
              key={m.slug}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="group rounded-3xl bg-white border border-[#0B1F3A]/10
                         p-5 pb-6 shadow-[0_10px_30px_-20px_rgba(11,31,58,0.35)]
                         transition-all duration-300
                         hover:-translate-y-1 hover:shadow-[0_25px_45px_-25px_rgba(11,31,58,0.45)]
                         hover:border-[#0B1F3A]/20"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-square bg-[#F4ECE2]">
                <img
                  src={m.photo}
                  alt={`${m.name}, ${m.role} based in ${m.region}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <span
                  className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur
                             px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]
                             text-[#0B1F3A] inline-flex items-center gap-1.5"
                >
                  <MapPin className="size-3 text-[#B7232A]" /> {m.region}
                </span>
              </div>

              <div className="mt-5">
                <h3 className="font-display text-xl font-semibold text-[#0B1F3A] leading-tight">
                  {m.name}
                </h3>
                <p className="mt-1 text-[13px] font-medium text-[#B7232A] uppercase tracking-[0.08em]">
                  {m.role}
                </p>
                <p className="mt-3 text-[14px] text-[#0B1F3A]/70 leading-relaxed">
                  {m.bio}
                </p>
              </div>

              <div className="mt-5 pt-5 border-t border-[#0B1F3A]/10 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#0B1F3A]/55 font-semibold">
                  Background screening
                </span>
                <span className="text-[11px] text-[#0B1F3A]/55 inline-flex items-center gap-1.5">
                  <span className="inline-block size-1.5 rounded-full bg-[#B7232A]/70" aria-hidden="true" />
                  {m.yearsExperience}+ years
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-sm text-[#0B1F3A]/60 max-w-2xl mx-auto">
            Photos and names shown are placeholders for the public site preview
            and will be replaced with the live team roster on launch. The roles,
            coverage, and main line are real.
          </p>
        </Reveal>
      </section>

      {/* ----------------------------------------------------------------
           HOURS COVERAGE — three-column schedule strip
           ----------------------------------------------------------------
           Dark navy band so it visually separates from the team grid above.
           Reads as: weekday → Saturday → Sunday → emergency line.
           ---------------------------------------------------------------- */}
      <section className="container">
        <div className="rounded-3xl bg-[#0B1F3A] text-white px-6 sm:px-10 lg:px-14 py-12 lg:py-14
                        shadow-[0_30px_60px_-30px_rgba(11,31,58,0.55)]">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/55 font-semibold">
                <Clock className="size-3.5" /> Coverage
              </span>
              <h2 className="font-display mt-4 text-3xl lg:text-4xl font-semibold leading-tight">
                When the team is on the desk.
              </h2>
              <p className="mt-4 text-white/70 text-[15px] leading-relaxed">
                One Central-time desk, no offshore handoff after hours. If you
                leave a voicemail, you'll hear back from a real person — not a
                ticket robot.
              </p>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-3 gap-5">
              {[SUPPORT_HOURS.weekdays, SUPPORT_HOURS.saturday, SUPPORT_HOURS.sunday].map(
                (h) => (
                  <div
                    key={h.label}
                    className="rounded-2xl bg-white/5 border border-white/10 p-5"
                  >
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/55 font-semibold">
                      {h.label}
                    </p>
                    <p className="mt-2 font-display text-lg font-semibold leading-snug">
                      {h.display}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
           COMPARISON STRIP — us vs. offshore-staffed CRAs
           ----------------------------------------------------------------
           Honest, factual, no logo-bashing. Two-column table, navy headers.
           ---------------------------------------------------------------- */}
      <section className="container py-24">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">Why this matters</span>
            <h2 className="display-lg mt-4 text-[#0B1F3A]">
              The big four CRAs took support offshore. We didn't.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 text-[17px] text-[#0B1F3A]/70 leading-relaxed">
              Most national background-screening providers offshored their
              customer service desks between 2014 and 2020 to cut headcount cost.
              The trade is real: cheaper for them, slower and lower-context for
              you. Here is what the difference looks like in practice.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-[#0B1F3A]/12 bg-white">
            <div className="grid grid-cols-12 bg-[#FAF7F2] border-b border-[#0B1F3A]/10">
              <div className="col-span-12 sm:col-span-4 p-5 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#0B1F3A]/55">
                The question
              </div>
              <div className="hidden sm:block sm:col-span-4 p-5 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#0B1F3A]">
                PreciseHire
              </div>
              <div className="hidden sm:block sm:col-span-4 p-5 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#0B1F3A]/55">
                Big-four CRAs (typical)
              </div>
            </div>
            {COMPARISON.map((r, i) => (
              <div
                key={r.row}
                className={[
                  "grid grid-cols-12 items-start",
                  i % 2 === 0 ? "bg-white" : "bg-[#FBF8F3]",
                ].join(" ")}
              >
                <div className="col-span-12 sm:col-span-4 p-5 font-display text-[17px] font-semibold text-[#0B1F3A]">
                  {r.row}
                </div>
                <div className="col-span-12 sm:col-span-4 p-5 text-[15px] text-[#0B1F3A]/85 flex gap-2">
                  <CheckCircle2 className="size-4 text-[#1F7A4D] shrink-0 mt-1" />
                  <span>
                    <span className="sm:hidden block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#0B1F3A] mb-1">
                      PreciseHire
                    </span>
                    {r.us}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-4 p-5 text-[15px] text-[#0B1F3A]/60 flex gap-2 border-t sm:border-t-0 border-[#0B1F3A]/8">
                  <XCircle className="size-4 text-[#0B1F3A]/40 shrink-0 mt-1" />
                  <span>
                    <span className="sm:hidden block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#0B1F3A]/55 mb-1">
                      Big-four CRAs
                    </span>
                    {r.them}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ----------------------------------------------------------------
           CTA — single primary action
           ---------------------------------------------------------------- */}
      <section className="container pb-28">
        <div className="relative overflow-hidden rounded-3xl bg-[#FAF1EA] border border-[#B7232A]/15 px-6 sm:px-12 py-14 lg:py-16">
          <img
            src={ASSETS.swooshCoral}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-20 w-[460px] opacity-50 rotate-[8deg]"
          />
          <div className="relative max-w-2xl">
            <Reveal>
              <h2 className="display-lg text-[#0B1F3A]">
                Try it. Call us right now.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 text-[17px] text-[#0B1F3A]/75 leading-relaxed">
                The fastest way to see the difference is to pick up the phone.
                We'll answer in seconds, in English, and you can ask us anything
                about a screening package, FCRA workflow, or current turnaround.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="btn-coral rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
                >
                  <Phone className="size-4" /> {COMPANY.phone}
                </a>
                <Link
                  href="/talk-to-an-expert"
                  className="btn-ghost-navy rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
                >
                  Get started — Let's Talk <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 text-[14px] text-[#0B1F3A]/65">
                Not ready for a sales conversation? Book our{" "}
                <Link href="/compliance/audit" className="font-semibold text-[#B7232A] underline underline-offset-4 hover:no-underline">
                  free 15-minute compliance audit
                </Link>{" "}
                instead — written summary, no follow-up unless you ask.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
