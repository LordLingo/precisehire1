/*
 * PreciseHire — Compliance
 * Style: Trusted Modernism — editorial document feel, generous whitespace,
 * navy accents on hairline rules, Fraunces section heads.
 */
import { Link } from "wouter";
import { ShieldCheck, FileCheck2, Lock, Globe, Scale, Users } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { ASSETS } from "@/content/site";

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
      <section className="relative overflow-hidden">
        <img src={ASSETS.swooshSky} alt="" aria-hidden="true" className="pointer-events-none absolute -top-20 -left-24 w-[460px] opacity-50 rotate-[-12deg]" />
        <div className="container pt-20 lg:pt-28 pb-12 max-w-3xl">
          <Reveal>
            <span className="eyebrow">Compliance</span>
            <h1 className="display-xl mt-4 text-[#0B1F3A]">Compliance baked into the workflow — not bolted on.</h1>
            <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed">
              The fastest way to slow down hiring is to get compliance wrong. We've
              engineered our platform so the right disclosures, the right timers,
              and the right state rules apply automatically — without your team
              having to memorize a 50-state matrix.
            </p>
          </Reveal>
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
                  <span className="mt-2 size-1.5 rounded-full bg-[#FF5A4E] shrink-0" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3 mt-8 text-sm font-semibold">Request documents</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
