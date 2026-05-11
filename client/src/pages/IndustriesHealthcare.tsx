/*
 * PreciseHire — /industries/healthcare
 *
 * Style commitment: Trusted Modernism — editorial, asymmetric, navy + coral on
 * cream. Display = Fraunces, body = Inter. No center-stacked hero.
 *
 * Strategy role: highest-margin segment landing page. Anchored on the actual
 * federal + state regulatory stack (OIG LEIE, SAM.gov, state Medicaid
 * exclusion lists, state licensing boards) and on PreciseHire's monthly
 * monitoring cadence. Cites OIG, FCRA, CFR, EEOC where appropriate.
 *
 * General guidance, not legal advice — disclaimer rendered at page bottom.
 */
import { Link } from "wouter";
import {
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  CalendarClock,
  ListChecks,
  Stethoscope,
  Activity,
  Clipboard,
  Scale,
  Phone,
  FileSearch,
  Hospital,
  Building2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { ASSETS, COMPANY } from "@/content/site";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/industries-healthcare-hero-b9WPJ5TiqbpbpKxVeffnWc.webp";

/* ---------------------------------------------- regulatory stack */
const STACK = [
  {
    icon: AlertTriangle,
    name: "OIG LEIE",
    full: "HHS-OIG List of Excluded Individuals/Entities",
    cite: "42 U.S.C. \u00a71320a-7; 42 C.F.R. Part 1001",
    body:
      "Hiring an excluded person who provides items or services billable to a federal health-care program exposes the employer to civil monetary penalties (currently up to roughly $23,331 per item or service after CMP inflation adjustments) and treble damages under the False Claims Act. OIG explicitly directs employers to check the LEIE before hire and on a monthly basis thereafter.",
  },
  {
    icon: Scale,
    name: "GSA SAM.gov",
    full: "System for Award Management exclusions",
    cite: "2 C.F.R. \u00a7180; FAR Subpart 9.4",
    body:
      "Federal contractors and subrecipients must verify the SAM.gov exclusions list before award and generally before each task order. The SAM and OIG lists overlap imperfectly, so the defensible practice in healthcare is to check both monthly against the same workforce roster.",
  },
  {
    icon: Activity,
    name: "State Medicaid lists",
    full: "39+ state Medicaid exclusion / sanctions lists",
    cite: "State Medicaid agency rules; OIG 2013 SAB",
    body:
      "Most states publish their own Medicaid exclusion list distinct from the federal LEIE. Several state Medicaid agencies require providers to check the state list in addition to LEIE; OIG treats it as a baseline expectation. Update cadences vary state to state, which is where uneven coverage usually shows up in audits.",
  },
  {
    icon: Stethoscope,
    name: "State licensing boards",
    full: "Nursing, medicine, pharmacy, EMS, dental, social work, etc.",
    cite: "State practice acts; CMS Conditions of Participation",
    body:
      "License verification is required at hire and on the renewal cycle (RN renewal cycles typically run 1\u20133 years). Continuous monitoring catches mid-cycle suspensions, probation orders, voluntary surrenders, and disciplinary actions that the next-renewal check would miss \u2014 the failure mode CMS surveyors most often cite.",
  },
];

/* ---------------------------------------------- pre-hire stack */
const PRE_HIRE = [
  {
    icon: FileSearch,
    title: "Identity + SSN trace",
    body: "Establish identity and surface every name and address used in the last seven years so we know exactly which counties to search.",
  },
  {
    icon: Clipboard,
    title: "County criminal (7 years)",
    body: "Direct, court-source searches in every county tied to the candidate's address history. Direct-care roles in some states require a longer look-back.",
  },
  {
    icon: ShieldCheck,
    title: "Federal criminal + sex-offender registry",
    body: "Federal district court searches plus all-states sex-offender registry sweep. Required by most CMS-participating employers.",
  },
  {
    icon: Hospital,
    title: "FACIS Level 3 sanctions",
    body: "Single search across LEIE, SAM exclusions, all 39+ state Medicaid exclusion lists, and state licensing-board sanctions \u2014 deduplicated and reviewer-confirmed.",
  },
  {
    icon: Stethoscope,
    title: "Primary-source license verification",
    body: "Direct verification with the issuing licensing board (not a third-party aggregator), including discipline status, expiration, and any consent-order language.",
  },
  {
    icon: Activity,
    title: "10-panel drug + clinical add-ons",
    body: "10-panel urine by default; OSHA respirator clearance, TB / Hep B titers, and abuse-registry checks added per role and state.",
  },
];

/* ---------------------------------------------- monitoring cadence */
const MONITORING = [
  {
    when: "Within 24 hours of hire",
    body: "Add the new hire to the monitoring roster. First sweep against LEIE, SAM, state Medicaid lists, and state licensing-board status runs the same business day.",
  },
  {
    when: "Monthly, automatic",
    body: "Full re-sweep of every active employee against LEIE, SAM, the relevant state Medicaid list, and licensing-board status. Output is exception-only \u2014 you only see hits.",
  },
  {
    when: "On every alert",
    body: "Each actionable alert flows through the FCRA pre-adverse + final adverse-action sequence with the EEOC individualized-assessment workflow built in. Documented for the surveyor.",
  },
  {
    when: "At every survey or audit",
    body: "On-demand attestation pack: who was checked, when, against which sources, and what each non-clear hit was adjudicated to. Hands directly to the CMS surveyor or your internal audit team.",
  },
];

/* ---------------------------------------------- FAQs */
const FAQS = [
  {
    q: "Why monthly? Why not quarterly or annually?",
    a: "OIG explicitly directs healthcare employers to check the LEIE on a monthly basis (oig.hhs.gov/exclusions). The Special Advisory Bulletin from May 2013 is the standing reference, and CMS surveyors cite the absence of a documented monthly check during Conditions of Participation reviews. Anything less frequent leaves the employer carrying CMP and False Claims Act exposure for the gap window.",
  },
  {
    q: "We already check LEIE. Why also check SAM and the state Medicaid list?",
    a: "The three lists overlap, but imperfectly. SAM captures program-wide federal contractor debarments that may not be on LEIE; the state Medicaid list captures state-only exclusions and reciprocal actions OIG has not yet ingested. The defensible practice is to run all three against the same roster on the same cadence and reconcile.",
  },
  {
    q: "How is licensing-board monitoring different from license verification?",
    a: "License verification is a point-in-time check at hire and on renewal. Continuous monitoring watches the licensing board's status feed for the entire roster every month and flags suspensions, probation orders, and surrenders the moment the board posts them \u2014 not the next time the license happens to come up for renewal.",
  },
  {
    q: "What happens if a hit comes back during monthly monitoring?",
    a: "Every hit goes through the same FCRA workflow as a pre-hire adverse finding: pre-adverse notice with a copy of the report and the CFPB Summary of Rights, a real waiting period, EEOC individualized assessment, and a final adverse-action notice if the decision stands. We document every step for the surveyor and your counsel.",
  },
  {
    q: "Can you handle our state's specific abuse registry or background-check law?",
    a: "Yes. Direct-care states layer specific registries (for example New York's Justice Center registry, Illinois Health Care Worker Registry, Texas EMR, and California CACI). We map your state and role mix to the right registries, drug-panel rules, and look-back windows during the package build.",
  },
  {
    q: "Do you bill per check, per employee, or per month for monitoring?",
    a: "Monthly monitoring is billed per active employee per month, not per check, so you get the full LEIE / SAM / state-list / license-board sweep without per-line surprises. Pre-hire packages are quoted per role family. Volume tiers and a transparent unit-economics breakdown are on the pricing page.",
  },
];

/* ============================================================= */
export default function IndustriesHealthcare() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Healthcare employment background screening",
    provider: {
      "@type": "Organization",
      name: COMPANY.name,
      telephone: COMPANY.phoneRaw,
      url: "https://precisehire.com",
    },
    areaServed: "United States",
    audience: {
      "@type": "BusinessAudience",
      audienceType:
        "Hospitals, health systems, clinics, home-health, hospice, long-term care, and behavioral-health employers",
    },
    description:
      "Pre-hire and monthly post-hire screening built for healthcare employers \u2014 OIG LEIE, GSA SAM.gov, state Medicaid exclusion lists, and primary-source state licensing-board verification, with a documented FCRA + EEOC workflow.",
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  };

  return (
    <>
      <SEO
        title="Healthcare Background Checks & Monthly Sanctions Monitoring | PreciseHire"
        description="OIG LEIE, GSA SAM, state Medicaid exclusion lists, and primary-source state licensing-board verification \u2014 pre-hire and monthly. Built for hospitals, home-health, and long-term care."
        canonical="https://precisehire.com/industries/healthcare"
        jsonLd={jsonLd}
      />

      {/* HERO ------------------------------------------------------------ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute -top-16 -right-32 size-[520px] opacity-60 pointer-events-none select-none"
          style={{
            backgroundImage: `url(${ASSETS.swooshSky})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden
        />
        <div className="container pt-16 lg:pt-24 pb-16 grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow text-[#B7232A]">
                <span className="inline-block size-2 rounded-full bg-[#B7232A] mr-2 align-middle" />
                Industries &middot; Healthcare
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-5 text-[#0B1F3A]">
                Sanctions monitoring built for{" "}
                <span className="italic relative inline-block">
                  CMS-participating employers
                  <span className="absolute left-0 right-0 -bottom-1 h-[6px] bg-[#B7232A]/85 rounded-full" />
                </span>
                .
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.7] text-[#0B1F3A]/75 max-w-2xl">
                Hospitals, home-health and hospice agencies, long-term care
                operators, and behavioral-health groups carry monthly LEIE,
                SAM, and state-list exposure that no self-serve consumer-grade
                CRA is built to handle. We run the full federal + state
                exclusion stack against your active roster every month, verify
                licenses primary-source, and hand you a survey-ready
                attestation pack.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Build a healthcare package <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/compliance/audit"
                  className="btn-ghost-navy inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  <ShieldCheck className="size-4" /> Free 15-min compliance audit
                </Link>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-[#0B1F3A]/70 hover:text-[#0B1F3A]"
                >
                  <Phone className="size-4" /> {COMPANY.phone}
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#0B1F3A]/65">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-[#0B1F3A]" /> FCRA + HIPAA workflow
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="size-4 text-[#0B1F3A]" /> Monthly cadence by default
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Hospital className="size-4 text-[#0B1F3A]" /> Survey-ready attestation pack
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <figure className="relative">
                <div className="rounded-[28px] overflow-hidden border border-[#0B1F3A]/10 shadow-[0_30px_70px_-30px_rgba(11,31,58,0.45)] aspect-[4/3]">
                  <img
                    src={HERO_IMG}
                    alt="Nurse-leader walking the corridor of a U.S. community hospital, mid-morning daylight, navy scrubs."
                    className="size-full object-cover"
                    loading="eager"
                  />
                </div>
                {/* floating stat */}
                <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white border border-[#0B1F3A]/10 px-5 py-4 shadow-[0_18px_40px_-20px_rgba(11,31,58,0.4)] max-w-[220px]">
                  <span className="eyebrow">Monthly sweep</span>
                  <p className="font-display text-[28px] leading-tight font-semibold text-[#0B1F3A] mt-1">
                    LEIE + SAM + state lists + boards
                  </p>
                  <p className="text-[12px] text-[#0B1F3A]/60 mt-1">
                    one roster, one report
                  </p>
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* THE STAKES ------------------------------------------------------- */}
      <section className="bg-[#0B1F3A] text-white">
        <div className="container py-20 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <span className="eyebrow text-[#E26C72]">The stakes</span>
            <h2 className="display-md mt-3">
              The penalty math is not subtle.
            </h2>
            <p className="mt-5 text-white/75 text-[15.5px] leading-relaxed">
              When an excluded individual touches services billed to Medicare,
              Medicaid, or any federal health-care program, the bill comes due
              per item, per service \u2014 not per employee. A missed monthly
              check on a single nurse can compound into seven figures of
              exposure inside a year.
            </p>
            <p className="mt-4 text-white/55 text-[13px] italic">
              42 U.S.C. \u00a71320a-7a; 45 C.F.R. \u00a7102.3 (CMP inflation
              adjustments); OIG Special Advisory Bulletin (May 8, 2013).
            </p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
            {[
              {
                k: "~$23,331",
                v: "Per item or service",
                d: "Civil monetary penalty per claim involving an excluded person, after CMP inflation adjustments.",
              },
              {
                k: "3\u00d7",
                v: "Treble damages",
                d: "False Claims Act exposure on top of CMPs for any payments tied to the excluded individual.",
              },
              {
                k: "Monthly",
                v: "OIG cadence guidance",
                d: "OIG explicitly directs employers to check the LEIE on a monthly basis.",
              },
            ].map((c) => (
              <div
                key={c.k}
                className="rounded-2xl bg-white/[0.06] border border-white/10 p-6"
              >
                <p className="font-display text-[34px] font-semibold leading-none">
                  {c.k}
                </p>
                <p className="mt-2 text-[13px] uppercase tracking-[0.14em] text-white/70">
                  {c.v}
                </p>
                <p className="mt-3 text-[13.5px] leading-[1.55] text-white/70">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGULATORY STACK ------------------------------------------------- */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <header className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="eyebrow">The regulatory stack</span>
            <h2 className="display-md mt-3 text-[#0B1F3A]">
              Four lists, one roster, one cadence.
            </h2>
            <p className="mt-5 text-[#0B1F3A]/70 text-[15px] leading-relaxed">
              We run all four sources against the same active-employee roster
              every month and reconcile mismatches before the report reaches
              your HRIS. The output is exception-only \u2014 you only see hits.
            </p>
          </header>
          <ul className="lg:col-span-8 grid md:grid-cols-2 gap-5">
            {STACK.map(({ icon: Icon, ...s }) => (
              <li
                key={s.name}
                className="rounded-2xl border border-[#0B1F3A]/10 bg-white p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[#FAF7F2] border border-[#0B1F3A]/10">
                    <Icon className="size-5 text-[#B7232A]" />
                  </span>
                  <div>
                    <p className="font-display text-[18px] font-semibold text-[#0B1F3A] leading-tight">
                      {s.name}
                    </p>
                    <p className="text-[12px] text-[#0B1F3A]/55 leading-tight">
                      {s.full}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-[14px] leading-[1.6] text-[#0B1F3A]/75">
                  {s.body}
                </p>
                <p className="mt-3 text-[12px] italic text-[#0B1F3A]/55">
                  {s.cite}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRE-HIRE PACKAGE ------------------------------------------------- */}
      <section className="bg-[#FAF7F2]">
        <div className="container py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <span className="eyebrow">Pre-hire package</span>
              <h2 className="display-md mt-3 text-[#0B1F3A]">
                The healthcare default stack, role-tunable.
              </h2>
              <p className="mt-5 text-[#0B1F3A]/70 text-[15px] leading-relaxed max-w-2xl">
                Six layers run as one workflow. Direct-care roles add abuse
                registries, OSHA respirator clearance, and TB / Hep B titers.
                Telehealth and revenue-cycle roles drop the clinical add-ons
                but keep the full sanctions stack \u2014 because billing-touch
                is what triggers the federal exposure, not bedside contact.
              </p>
            </div>
            <div className="lg:col-span-5 text-[13px] text-[#0B1F3A]/65 lg:text-right">
              Median turnaround for the full stack: <span className="font-semibold text-[#0B1F3A]">under 1 business day</span> for 78% of orders.
            </div>
          </div>

          <ul className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRE_HIRE.map(({ icon: Icon, ...s }, i) => (
              <li
                key={s.title}
                className="rounded-2xl bg-white border border-[#0B1F3A]/10 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[#FAF7F2] border border-[#0B1F3A]/10">
                    <Icon className="size-5 text-[#0B1F3A]" />
                  </span>
                  <span className="font-display text-[14px] text-[#0B1F3A]/35 font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 font-display text-[18px] font-semibold text-[#0B1F3A] leading-snug">
                  {s.title}
                </p>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#0B1F3A]/70">
                  {s.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MONITORING CADENCE ---------------------------------------------- */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="eyebrow">Monitoring cadence</span>
            <h2 className="display-md mt-3 text-[#0B1F3A]">
              What happens after the hire.
            </h2>
            <p className="mt-5 text-[#0B1F3A]/70 text-[15px] leading-relaxed">
              Most exclusion exposure is created post-hire, not pre-hire. We
              run the full sanctions sweep and licensing-board status check on
              your entire active roster every month, route exceptions through
              the FCRA workflow, and keep the documentation a CMS surveyor
              actually wants to see.
            </p>
          </header>
          <ol className="lg:col-span-8 relative border-l border-[#0B1F3A]/15 pl-8 space-y-8">
            {MONITORING.map((m, i) => (
              <li key={m.when} className="relative">
                <span className="absolute -left-[41px] top-1.5 inline-flex size-5 items-center justify-center rounded-full bg-[#B7232A] text-white text-[10px] font-bold">
                  {i + 1}
                </span>
                <p className="font-display text-[18px] font-semibold text-[#0B1F3A]">
                  {m.when}
                </p>
                <p className="mt-1.5 text-[14.5px] leading-[1.65] text-[#0B1F3A]/70">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHO WE SERVE ----------------------------------------------------- */}
      <section className="bg-[#FAF7F2]">
        <div className="container py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <header className="lg:col-span-5">
              <span className="eyebrow">Who we serve</span>
              <h2 className="display-md mt-3 text-[#0B1F3A]">
                Built for the operators who actually carry the exposure.
              </h2>
              <p className="mt-5 text-[#0B1F3A]/70 text-[15px] leading-relaxed">
                Different healthcare operators carry different mixes of
                sanctions, licensing, and abuse-registry obligations. We tune
                the package to your specific operator type and state mix
                during the build call.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#B7232A] hover:underline"
              >
                Talk to a healthcare specialist <ArrowRight className="size-4" />
              </Link>
            </header>
            <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
              {[
                ["Acute-care hospitals & health systems", "Hospital"],
                ["Home health & hospice", "Activity"],
                ["Skilled nursing & long-term care", "Building2"],
                ["Behavioral & mental-health groups", "Stethoscope"],
                ["Ambulatory surgery & specialty clinics", "Clipboard"],
                ["Telehealth & revenue-cycle vendors", "ListChecks"],
              ].map(([label]) => (
                <li
                  key={label as string}
                  className="rounded-xl border border-[#0B1F3A]/10 bg-white px-5 py-4 text-[14.5px] text-[#0B1F3A] flex items-center gap-3"
                >
                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#FAF7F2] border border-[#0B1F3A]/10 text-[#B7232A]">
                    <Hospital className="size-4" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ -------------------------------------------------------------- */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="eyebrow">FAQ</span>
            <h2 className="display-md mt-3 text-[#0B1F3A]">
              The questions healthcare buyers actually ask us.
            </h2>
            <p className="mt-5 text-[#0B1F3A]/70 text-[15px] leading-relaxed">
              These are pulled from real intro calls. If yours isn't here,
              call us \u2014 our Director of Compliance answers the phone.
            </p>
            <Link
              href="/compliance/checklist"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#B7232A] hover:underline"
            >
              Or self-audit with our free 24-point checklist{" "}
              <ArrowRight className="size-4" />
            </Link>
          </header>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="border-b border-[#0B1F3A]/10"
                >
                  <AccordionTrigger className="text-left font-display text-[16px] font-semibold text-[#0B1F3A] hover:text-[#B7232A] py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[14.5px] leading-[1.7] text-[#0B1F3A]/75 pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA -------------------------------------------------------------- */}
      <section className="container pb-24">
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
                <span className="eyebrow text-[#E26C72]">Get started</span>
                <h2 className="display-md mt-3 max-w-xl">
                  Walk us through your roster, your states, and your last survey finding.
                </h2>
                <p className="mt-4 text-white/75 max-w-xl text-[15.5px] leading-relaxed">
                  Twenty-minute working call with a healthcare-specialist
                  account manager and our Director of Compliance. You leave
                  with a written package proposal, a monitoring quote per
                  active employee per month, and a written answer on whatever
                  the surveyor flagged last time.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="btn-coral inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Book the working call <ArrowRight className="size-4" />
                </Link>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold border border-white/30 text-white hover:bg-white/10"
                >
                  <Phone className="size-4" /> {COMPANY.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* LEGAL ------------------------------------------------------------ */}
      <section className="container pb-24">
        <div className="rounded-2xl border border-[#0B1F3A]/10 bg-[#FAF7F2] p-6 flex items-start gap-4">
          <ShieldCheck className="size-5 mt-0.5 text-[#0B1F3A]/55 shrink-0" />
          <p className="text-[13px] leading-[1.65] text-[#0B1F3A]/70">
            <span className="font-semibold text-[#0B1F3A]">
              General guidance, not legal advice.
            </span>{" "}
            CMP amounts, FCRA, EEOC, CMS Conditions of Participation, and
            state requirements evolve; citations are current as of May 2026.
            Healthcare employers should consult counsel for facility-specific
            and state-specific application.
          </p>
        </div>
      </section>
    </>
  );
}
