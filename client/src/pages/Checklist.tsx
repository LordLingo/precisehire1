/*
 * PreciseHire — /compliance/checklist
 *
 * Style commitment: Trusted Modernism — editorial, asymmetric, navy + coral on
 * cream. Display + body type pairing, generous whitespace, brush-swoosh motifs.
 *
 * Strategy role: ungated companion to /compliance/audit. Same six-surface,
 * 24-item review framework, but interactive on-page (with localStorage so a
 * visitor can come back and not lose their work) and downloadable as a PDF.
 * No email gate \u2014 the PDF link is a plain anchor. The audit CTA appears at
 * the bottom for visitors who self-audit and find gaps.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  Download,
  FileText,
  Printer,
  Check,
  ShieldCheck,
  ArrowRight,
  Phone,
  RotateCcw,
} from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { ASSETS } from "@/content/site";
import { toast } from "sonner";

const PDF_HREF = "/manus-storage/PreciseHire-Compliance-Checklist_c78eb023.pdf";

type Item = { id: string; body: string; cite: string };
type Surface = { n: string; title: string; intro: string; items: Item[] };

const SURFACES: Surface[] = [
  {
    n: "01",
    title: "Disclosure & authorization",
    intro:
      "The pre-hire FCRA disclosure is the single most-litigated artifact in employer screening. Standalone-document defects are the easiest plaintiff's exhibit to assemble.",
    items: [
      { id: "s1a", body: "Disclosure is a clear, conspicuous, standalone document.", cite: "FCRA \u00a7604(b)(2)(A); Syed v. M-I LLC (9th Cir. 2017); Gilberg v. CCC (9th Cir. 2019)" },
      { id: "s1b", body: "Disclosure contains no liability waivers, releases, or extraneous info.", cite: "Syed v. M-I LLC; Gilberg v. CCC" },
      { id: "s1c", body: "Authorization is separately signed (not bundled into employment agreement).", cite: "FCRA \u00a7604(b)(2)(A)" },
      { id: "s1d", body: "If running continuous monitoring, disclosure explicitly contemplates ongoing screening.", cite: "FCRA \u00a7604(b)(2)(A) (interpretive)" },
    ],
  },
  {
    n: "02",
    title: "Pre-adverse action workflow",
    intro:
      "When a consumer report contains information that may lead the employer to deny employment, FCRA \u00a7604(b)(3) requires a pre-adverse notice + a copy of the report + the CFPB Summary of Rights before any final decision.",
    items: [
      { id: "s2a", body: "Pre-adverse notice issued before any adverse decision is communicated.", cite: "FCRA \u00a7604(b)(3)(A)" },
      { id: "s2b", body: "Copy of the consumer report enclosed (not just a summary).", cite: "FCRA \u00a7604(b)(3)(A)(i)" },
      { id: "s2c", body: "Current CFPB Summary of Rights enclosed (March 2024 version or later).", cite: "12 C.F.R. \u00a71022 App. K" },
      { id: "s2d", body: "Pre-adverse template includes a clear dispute pathway and CRA contact.", cite: "FCRA \u00a7611; \u00a71681g(c)" },
    ],
  },
  {
    n: "03",
    title: "Waiting-period cushion by jurisdiction",
    intro:
      "Federal floor is a reasonable waiting period \u2014 case law and FTC guidance settle on five business days. California, Los Angeles, NYC, and Philadelphia each layer specific cushions on top.",
    items: [
      { id: "s3a", body: "Default waiting period is at least 5 business days from candidate receipt.", cite: "FTC informal guidance; case law consensus" },
      { id: "s3b", body: "California candidates: full 5 business days + extension if dispute filed.", cite: "Cal. Civ. Code \u00a71786 (ICRAA)" },
      { id: "s3c", body: "New York City candidates: pre-adverse window + Fair Chance Act response window.", cite: "NYC Fair Chance Act; NYC Admin. Code \u00a78-107(11-a)" },
      { id: "s3d", body: "Los Angeles + Philadelphia overlays applied automatically by ATS.", cite: "LA County Fair Chance Ord. (eff. 9/3/2024); Phila. FCRSA" },
    ],
  },
  {
    n: "04",
    title: "EEOC individualized assessment",
    intro:
      "The EEOC's 2012 enforcement guidance requires an individualized assessment when a criminal record is used to deny employment \u2014 nature of the offense, time elapsed, nature of the job.",
    items: [
      { id: "s4a", body: "Decision documentation captures nature of the offense + time elapsed + nature of the job.", cite: "EEOC Enforcement Guidance N-915.002 (Apr. 25, 2012)" },
      { id: "s4b", body: "Candidate is given an opportunity to provide context before final decision.", cite: "EEOC 2012 Guidance \u00a7V.B.9; Green v. Mo. Pac. R.R. (8th Cir. 1975)" },
      { id: "s4c", body: "Disqualifying-offense lists are job-related and consistent with business necessity.", cite: "Title VII \u00a7703(a); Griggs v. Duke Power (1971)" },
      { id: "s4d", body: "Decision documentation is retained for at least 4 years.", cite: "29 C.F.R. \u00a71602.14" },
    ],
  },
  {
    n: "05",
    title: "Dispute handling",
    intro:
      "FCRA \u00a7611 gives candidates 30 days to dispute a record. The CRA must reinvestigate; the employer must pause the adverse-action clock and act on the corrected report.",
    items: [
      { id: "s5a", body: "CRA conducts a real reinvestigation (not just a database re-run) within 30 days.", cite: "FCRA \u00a7611 (15 U.S.C. \u00a71681i)" },
      { id: "s5b", body: "Pre-adverse waiting clock pauses while a dispute is open.", cite: "FCRA \u00a7611(a)(5); FTC informal guidance" },
      { id: "s5c", body: "Updated report is delivered; final adverse-action decision uses corrected version.", cite: "FCRA \u00a7611(a)(5)(A); \u00a7615(a)" },
      { id: "s5d", body: "Dispute close-rate metric is tracked; >0.5% closed-as-frivolous warrants vendor review.", cite: "Internal benchmark" },
    ],
  },
  {
    n: "06",
    title: "Continuous monitoring posture",
    intro:
      "Every continuous-monitoring alert is a new consumer report. The same disclosure, authorization, and adverse-action obligations apply on every alert the employer plans to act on.",
    items: [
      { id: "s6a", body: "Original disclosure explicitly contemplates ongoing post-hire monitoring.", cite: "FCRA \u00a7604(b)(2)(A) (interpretive)" },
      { id: "s6b", body: "Authorization for continuous monitoring is a standalone document.", cite: "Syed v. M-I LLC (9th Cir. 2017)" },
      { id: "s6c", body: "Each actionable alert flows through the full pre-adverse + final adverse-action sequence.", cite: "FCRA \u00a7604(b)(3); \u00a7615(a)" },
      { id: "s6d", body: "Alert handling includes the EEOC individualized-assessment workflow.", cite: "EEOC Enforcement Guidance N-915.002 (2012)" },
    ],
  },
];

const TOTAL = SURFACES.reduce((sum, s) => sum + s.items.length, 0);
const STORAGE_KEY = "ph_compliance_checklist_v1";

export default function Checklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // Load + persist progress to localStorage so a visitor can come back later.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      // ignore corrupt state \u2014 not worth surfacing
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // storage quota / private mode \u2014 silently no-op
    }
  }, [checked]);

  const completed = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked],
  );
  const pct = Math.round((completed / TOTAL) * 100);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }
  function reset() {
    setChecked({});
    toast.success("Checklist reset.");
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "The 24-point employer compliance checklist",
    description:
      "A free, ungated, six-surface employer self-audit checklist for FCRA / EEOC / state-law adverse-action workflows. Includes a downloadable PDF with statute and case-law citations behind every item.",
    totalTime: "PT15M",
    step: SURFACES.map((s) => ({
      "@type": "HowToSection",
      name: `Surface ${s.n}: ${s.title}`,
      itemListElement: s.items.map((i) => ({
        "@type": "HowToStep",
        text: i.body,
      })),
    })),
  };

  return (
    <>
      <SEO
        title="Free Employer Compliance Checklist (PDF) | PreciseHire"
        description="A 24-point, ungated self-audit of your FCRA disclosure, pre-adverse workflow, waiting-period cushion, EEOC individualized assessment, dispute handling, and continuous-monitoring posture. Downloadable PDF, citation on every item."
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute -top-12 -right-32 size-[520px] opacity-65 pointer-events-none select-none"
          style={{ backgroundImage: `url(${ASSETS.swooshSky})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
          aria-hidden
        />
        <div className="container pt-16 lg:pt-24 pb-14 grid lg:grid-cols-12 gap-10 items-end relative">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow text-[#B7232A]">
                <span className="inline-block size-2 rounded-full bg-[#B7232A] mr-2 align-middle" />
                Free download &middot; no email required &middot; v.2026.05
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-5 text-[#0B1F3A]">
                The 24-point{" "}
                <span className="italic relative inline-block">
                  employer compliance
                  <span className="absolute left-0 right-0 -bottom-1 h-[6px] bg-[#B7232A]/85 rounded-full" />
                </span>{" "}
                checklist.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.7] text-[#0B1F3A]/75 max-w-2xl">
                Six surfaces \u2014 disclosure and authorization, pre-adverse
                workflow, waiting-period cushion, EEOC individualized
                assessment, dispute handling, and continuous-monitoring posture
                \u2014 with the statute, regulation, or case-law citation behind
                every line. Use it interactively below, or download the PDF and
                walk through it with your team.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={PDF_HREF}
                  download="PreciseHire-Compliance-Checklist.pdf"
                  className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  <Download className="size-4" /> Download the PDF
                </a>
                <a
                  href={PDF_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost-navy inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  <FileText className="size-4" /> View in browser
                </a>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-[#0B1F3A]/70 hover:text-[#0B1F3A]"
                >
                  <Printer className="size-4" /> Print this page
                </button>
              </div>
            </Reveal>
          </div>

          {/* progress card */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-[28px] border border-[#0B1F3A]/10 bg-white/85 backdrop-blur p-7 shadow-[0_24px_60px_-30px_rgba(11,31,58,0.35)]">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow">Your self-audit progress</span>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1 text-[12px] uppercase tracking-[0.14em] text-[#0B1F3A]/55 hover:text-[#B7232A]"
                  >
                    <RotateCcw className="size-3" /> reset
                  </button>
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-display text-[56px] leading-none text-[#0B1F3A] font-semibold">
                    {completed}
                  </span>
                  <span className="font-display text-[20px] text-[#0B1F3A]/45">/ {TOTAL} checked</span>
                </div>
                <div className="mt-5 h-2 w-full rounded-full bg-[#0B1F3A]/10 overflow-hidden">
                  <div
                    className="h-full bg-[#B7232A] transition-all duration-500 ease-out"
                    style={{ width: `${pct}%` }}
                    aria-hidden
                  />
                </div>
                <p className="mt-5 text-[13.5px] leading-[1.6] text-[#0B1F3A]/65">
                  Most employers we audit can confidently check 16\u201320 of
                  the 24 boxes without further work. The remaining four to
                  eight are typically where the litigation risk lives. Your
                  progress is saved on this device only.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SIX SURFACES */}
      <section className="container pb-20">
        <div className="space-y-12">
          {SURFACES.map((s, idx) => (
            <Reveal key={s.n} delay={0.04 * idx}>
              <div className="grid lg:grid-cols-12 gap-8">
                <header className="lg:col-span-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-[44px] leading-none text-[#B7232A]/80 font-semibold">
                      {s.n}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#0B1F3A]/55">
                      Surface
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-[26px] font-semibold text-[#0B1F3A] leading-tight">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-[1.65] text-[#0B1F3A]/70">
                    {s.intro}
                  </p>
                </header>

                <ul className="lg:col-span-8 divide-y divide-[#0B1F3A]/10 border-y border-[#0B1F3A]/10">
                  {s.items.map((it) => {
                    const isOn = !!checked[it.id];
                    return (
                      <li key={it.id}>
                        <button
                          type="button"
                          onClick={() => toggle(it.id)}
                          aria-pressed={isOn}
                          className="w-full text-left flex items-start gap-4 py-5 group transition-colors"
                        >
                          <span
                            className={[
                              "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md border transition-all",
                              isOn
                                ? "bg-[#B7232A] border-[#B7232A] text-white"
                                : "bg-white border-[#0B1F3A]/30 text-transparent group-hover:border-[#B7232A]",
                            ].join(" ")}
                          >
                            <Check className="size-4" />
                          </span>
                          <span className="flex-1">
                            <span
                              className={[
                                "block font-display text-[16px] font-medium leading-snug transition-colors",
                                isOn ? "text-[#0B1F3A]/55 line-through" : "text-[#0B1F3A]",
                              ].join(" ")}
                            >
                              {it.body}
                            </span>
                            <span className="mt-1 block text-[12.5px] italic text-[#0B1F3A]/55">
                              {it.cite}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* AUDIT CTA */}
      <section className="container pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-[#0B1F3A] text-white px-8 lg:px-14 py-14">
            <img
              src={ASSETS.swooshCoral}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -right-16 w-[420px] opacity-50 rotate-[8deg]"
            />
            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="eyebrow text-[#E26C72]">Done with the self-audit?</span>
                <h2 className="display-md mt-3 max-w-xl">
                  Bring the boxes you couldn't check to a free 15-minute call.
                </h2>
                <p className="mt-4 text-white/75 max-w-xl text-[15.5px] leading-relaxed">
                  Our compliance desk walks through whatever is left on your
                  list against the FCRA federal floor and the four
                  jurisdictions that add the most overlay. You get a written
                  one-page summary in three business days. No sales follow-up
                  unless you ask.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link
                  href="/compliance/audit"
                  className="btn-coral inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Book the free audit <ArrowRight className="size-4" />
                </Link>
                <a
                  href="tel:+18667735486"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold border border-white/30 text-white hover:bg-white/10"
                >
                  <Phone className="size-4" /> Or call (866) 773-5486
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* LEGAL */}
      <section className="container pb-24">
        <div className="rounded-2xl border border-[#0B1F3A]/10 bg-[#FAF7F2] p-6 flex items-start gap-4">
          <ShieldCheck className="size-5 mt-0.5 text-[#0B1F3A]/55 shrink-0" />
          <p className="text-[13px] leading-[1.65] text-[#0B1F3A]/70">
            <span className="font-semibold text-[#0B1F3A]">General guidance, not legal advice.</span>{" "}
            FCRA, EEOC, and state-law obligations evolve; citations are current
            as of May 2026. For jurisdiction-specific application, consult
            counsel. PreciseHire publishes this checklist openly so any U.S.
            employer \u2014 customer or not \u2014 can self-audit.
          </p>
        </div>
      </section>
    </>
  );
}
