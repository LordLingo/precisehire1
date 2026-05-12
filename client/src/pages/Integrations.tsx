/*
 * PreciseHire — Integrations
 * Style: Trusted Modernism. Editorial intro, then a card grid of partner names
 * (no fake logos — Fraunces wordmarks for credibility).
 */
import { Link } from "wouter";
import { ArrowRight, Code2 } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { ASSETS } from "@/content/site";

const PARTNERS = [
  { name: "Greenhouse", category: "ATS" },
  { name: "Workday", category: "HRIS" },
  { name: "Lever", category: "ATS" },
  { name: "iCIMS", category: "ATS" },
  { name: "Bullhorn", category: "Staffing" },
  { name: "JazzHR", category: "ATS" },
  { name: "BambooHR", category: "HRIS" },
  { name: "ADP Workforce Now", category: "Payroll/HRIS" },
  { name: "UKG Pro", category: "HRIS" },
  { name: "Paylocity", category: "Payroll/HRIS" },
  { name: "Avionté", category: "Staffing" },
  { name: "Salesforce", category: "CRM" },
];

export default function Integrations() {
  return (
    <>
      <SEO
        title="ATS & HRIS Integrations | Precise Hire"
        description="Run background checks directly inside Greenhouse, Workday, Lever, iCIMS, Bullhorn, BambooHR, and more. Plus a documented REST API for custom flows."
        canonical="https://precisehire.com/integrations"
      />

      <section className="relative overflow-hidden">
        <img src={ASSETS.swooshSky} alt="" aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 w-[420px] opacity-50 rotate-[15deg]" />
        <div className="container pt-20 lg:pt-28 pb-12 max-w-3xl">
          <Reveal>
            <span className="eyebrow">Integrations</span>
            <h1 className="display-xl mt-4 text-[#0B1F3A]">Connect to the tools your team already lives in.</h1>
            <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed">
              Order checks, monitor status, and complete adverse action — all without
              leaving your ATS or HRIS. Setup typically takes under an hour.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.025}>
              <div className="h-full p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 text-center">
                <p className="font-display text-xl font-semibold text-[#0B1F3A]">{p.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#0B1F3A]/55 font-semibold">{p.category}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container pb-24">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-8 items-center rounded-[28px] bg-[#0B1F3A] text-white px-8 lg:px-14 py-14">
            <div className="lg:col-span-8">
              <span className="eyebrow text-[#E26C72]">Need something custom?</span>
              <h2 className="display-md mt-3">A documented REST API and webhooks.</h2>
              <p className="mt-3 text-white/70 max-w-xl">
                Build your own flow on top of our platform. Order checks, listen for
                status changes, and pull completed reports — all via a single, well-
                documented API.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link href="/get-a-quote" className="btn-coral text-center rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2"><Code2 className="size-4" /> Get API access</Link>
              <Link href="/talk-to-an-expert?topic=ATS%20or%20API%20integration" className="text-center rounded-full px-6 py-3.5 text-sm font-semibold border border-white/30 hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2">Talk to an integrations engineer <ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
