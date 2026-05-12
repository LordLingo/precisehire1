/*
 * PreciseHire — Compliance
 * Style: Trusted Modernism — editorial document feel, generous whitespace,
 * navy accents on hairline rules, Fraunces section heads.
 */
import { Link } from "wouter";
import {
  ShieldCheck,
  FileCheck2,
  Lock,
  Globe,
  Scale,
  Users,
  ArrowRight,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { ASSETS } from "@/content/site";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/hero-compliance-v2-j5T4FXWWAZk7h4khtiCgZk.webp";

const PILLARS = [
  { icon: ShieldCheck, title: "FCRA", body: "Permissible-purpose enforcement, pre-adverse and adverse-action workflows, and a 30-day dispute response window — built into every report." },
  { icon: Scale, title: "EEOC", body: "Individualized assessments, age-of-record consideration, and configurable matrices that align with the EEOC's 2012 guidance on arrest and conviction records." },
  { icon: FileCheck2, title: "State & local", body: "Ban-the-box, salary-history, and clean-slate laws across 35+ states are tracked and applied automatically — no homework for your team." },
  { icon: Lock, title: "Data security", body: "AES-256 at rest, TLS 1.3 in transit, role-based access, SOC 2 Type II controls, and annual third-party penetration testing." },
  { icon: Globe, title: "International", body: "GDPR-aware consent, in-country research partners, and DPA agreements ready for global hiring programs." },
  { icon: Users, title: "Candidate experience", body: "Branded invitations, mobile consent, real-time status updates, and a candidate portal for downloads and disputes." },
];

export default function Compliance() {
  return (
    <>
      <SEO
        title="FCRA Compliance & Data Security | Precise Hire"
        description="Every Precise Hire report is built around FCRA, EEOC, and state ban-the-box compliance. SOC 2 Type II security, GDPR-aware international workflows."
        canonical="https://precisehire.com/compliance"
      />
      {/* HERO — editorial split */}
      <section className="relative overflow-hidden bg-[#FAF7F2]">
        <img
          src={ASSETS.swooshSky}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-24 w-[480px] opacity-55 rotate-[-12deg]"
        />
        <img
          src={ASSETS.swooshCoral}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-16 w-[420px] opacity-40 rotate-[10deg]"
        />
        <div className="container pt-16 lg:pt-24 pb-20 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center relative">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="eyebrow">
                <ShieldCheck className="size-3.5 text-[#B7232A]" />
                Compliance hub
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-5 text-[#0B1F3A]">
                Compliance{" "}
                <span className="italic relative inline-block">
                  baked
                  <span className="absolute left-0 right-0 -bottom-1 h-[6px] bg-[#B7232A]/85 rounded-full" />
                </span>{" "}
                into the workflow — not bolted on.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.7] text-[#0B1F3A]/75 max-w-2xl">
                The fastest way to slow down hiring is to get compliance wrong.
                We have engineered our workflow so the right disclosures, the
                right timers, and the right state rules apply automatically —
                so your team is not memorizing a 50-state matrix at 4:30pm on a
                Friday.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/compliance/audit"
                  className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  <Calendar className="size-4" /> Book a free 15-min audit
                </Link>
                <Link
                  href="/compliance/checklist"
                  className="btn-ghost-navy inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Get the 24-point checklist
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#0B1F3A]/70">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-[#B7232A]" />
                  FCRA §§604, 611, 613, 615 workflow
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-[#B7232A]" />
                  EEOC 2012 individualized assessment
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-[#B7232A]" />
                  35+ state &amp; city overlays tracked
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 relative">
            <Reveal delay={0.1}>
              <div className="relative rounded-[28px] overflow-hidden border border-[#0B1F3A]/10 shadow-[0_30px_70px_-30px_rgba(11,31,58,0.4)] aspect-[4/3]">
                <img
                  src={HERO_IMG}
                  alt="PreciseHire compliance attorney annotating a printed FCRA disclosure document at a walnut desk"
                  className="size-full object-cover"
                />
              </div>
            </Reveal>
            {/* Floating stat — dispute close rate */}
            <Reveal delay={0.18}>
              <div className="absolute -bottom-6 -left-4 sm:left-6 lg:-left-8 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-[0_20px_50px_-25px_rgba(11,31,58,0.35)] px-5 py-4 max-w-[280px]">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[#0B1F3A]/55">
                    Trailing 12 months
                  </span>
                </div>
                <div className="mt-1 font-display text-[19px] font-semibold text-[#0B1F3A] leading-tight">
                  Dispute rate under 0.4%
                </div>
                <div className="mt-1 text-[11.5px] text-[#0B1F3A]/60">
                  FCRA §611 reinvestigations resolved on time
                </div>
              </div>
            </Reveal>
            {/* Floating stat — audit cycle */}
            <Reveal delay={0.22}>
              <div className="absolute -top-5 right-2 sm:right-6 lg:-right-4 rounded-2xl bg-[#0B1F3A] text-white shadow-[0_20px_50px_-25px_rgba(11,31,58,0.45)] px-5 py-4 max-w-[230px]">
                <div className="text-[11px] uppercase tracking-[0.14em] text-white/55">
                  SOC 2 Type II
                </div>
                <div className="font-display text-[20px] font-semibold leading-tight">
                  Re-attested every 12 months
                </div>
                <div className="mt-1 text-[11px] text-white/60">
                  Report available under NDA
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.04}>
              <div className="p-7 rounded-3xl bg-white border border-[#0B1F3A]/10 h-full">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[#0B1F3A] text-white"><Icon className="size-5" /></span>
                <h3 className="mt-5 font-display text-xl font-semibold text-[#0B1F3A]">{title}</h3>
                <p className="mt-3 text-[15px] text-[#0B1F3A]/70 leading-relaxed">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED RESOURCES — internal-link equity into top compliance posts */}
      <section className="container pb-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <span className="eyebrow"><span className="size-1.5 rounded-full bg-[#B7232A] inline-block" /> From the compliance desk</span>
              <h2 className="display-md mt-2 text-[#0B1F3A]">Read these before your next renewal</h2>
            </div>
            <Link
              href="/resources?cat=Compliance"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B7232A] hover:underline"
            >
              All compliance posts <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                href: "/resources/fcra-section-613-public-records-employer-guide",
                eyebrow: "FCRA §613",
                title: "The notice-or-strict-procedures rule most CRAs get partially wrong",
                body: "§613 is the quietest section of the FCRA and one of the easiest to break. The exact question to ask your CRA before the next renewal cycle.",
                read: "11 min read",
              },
              {
                href: "/resources/pre-adverse-action-notice-requirements-timing-content-and-documents",
                eyebrow: "FCRA §615",
                title: "Pre-adverse action: timing, content, and the documents inside the envelope",
                body: "What §615(a) actually requires, what counts as a reasonable waiting period, and the four documents that must travel with the notice.",
                read: "10 min read",
              },
              {
                href: "/resources/how-long-must-employers-wait-pre-adverse-action-state-by-state",
                eyebrow: "State overlays",
                title: "How long must employers wait? The state-by-state cushion table",
                body: "The federal floor is 'reasonable' — several states are explicit. Here is the per-state cushion plus the safe national default.",
                read: "9 min read",
              },
            ].map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group relative rounded-2xl border border-[#0B1F3A]/10 bg-white p-7 hover:border-[#B7232A]/40 transition-colors flex flex-col"
              >
                <span className="text-[11.5px] uppercase tracking-[0.16em] text-[#B7232A] font-semibold">
                  {p.eyebrow}
                </span>
                <h3 className="mt-3 font-display text-[19px] font-semibold leading-snug text-[#0B1F3A] group-hover:text-[#B7232A]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-[#0B1F3A]/70 flex-1">
                  {p.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[12.5px] text-[#0B1F3A]/55">
                  {p.read}
                  <span className="text-[#B7232A] font-semibold inline-flex items-center gap-1 ml-auto">
                    Read <ArrowRight className="size-3.5" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container pb-24">
        <Reveal>
          <div className="rounded-3xl bg-white border border-[#0B1F3A]/10 p-8 lg:p-12">
            <h2 className="display-md text-[#0B1F3A]">Documents available on request</h2>
            <ul className="mt-6 grid md:grid-cols-2 gap-y-3 gap-x-8 text-[15px] text-[#0B1F3A]/85">
              {[
                "SOC 2 Type II report",
                "Information security overview",
                "Data Processing Agreement (GDPR)",
                "Sub-processor list",
                "Penetration test summary",
                "FCRA Summary of Rights",
                "Adverse-action workflow walkthrough",
                "Candidate consent samples",
              ].map((doc) => (
                <li key={doc} className="flex gap-2.5">
                  <span className="mt-2 size-1.5 rounded-full bg-[#B7232A] shrink-0" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact?intent=Documents+request"
                className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                Request these documents <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/trust"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#B7232A] hover:underline"
              >
                Or verify our attestations on the trust page <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
