/*
 * PreciseHire — /industries/transportation
 *
 * Style commitment: Trusted Modernism — editorial, asymmetric, navy + coral on
 * cream. Display = Fraunces, body = Inter. Mirrors the Healthcare deep-dive
 * page rhythm so visitors moving between industries see a consistent shape.
 *
 * Strategy role: second highest-margin segment. Anchored on the actual
 * federal stack motor carriers must run \u2014 FMCSA Drug & Alcohol
 * Clearinghouse pre-employment + annual queries, 49 CFR Part 40 / Part 382
 * DOT drug & alcohol testing, 49 CFR Part 391 driver qualification file,
 * and the annual MVR review under 49 CFR 391.25. Cites the relevant CFR
 * sections inline.
 *
 * General guidance, not legal advice \u2014 disclaimer rendered at page bottom.
 */
import { Link } from "wouter";
import {
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  CalendarClock,
  ListChecks,
  Truck,
  Activity,
  Clipboard,
  Scale,
  Phone,
  FileSearch,
  Gauge,
  Map,
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
  "/images/service-mvr.webp";

/* ---------------------------------------------- regulatory stack */
const STACK = [
  {
    icon: AlertTriangle,
    name: "FMCSA Clearinghouse",
    full: "Drug & Alcohol Clearinghouse \u2014 49 CFR Part 382, Subpart G",
    cite: "49 CFR \u00a7382.701",
    body:
      "Motor carriers must run a full pre-employment query in the FMCSA Clearinghouse before letting a CDL driver operate a commercial motor vehicle, and a limited query at least once per year for every CDL driver they employ. A prohibited driver who has not completed return-to-duty cannot be dispatched \u2014 period. Audit findings here move into the carrier's safety profile.",
  },
  {
    icon: Activity,
    name: "DOT Part 40 / Part 382",
    full: "Pre-employment, random, post-accident, reasonable suspicion, return-to-duty, follow-up",
    cite: "49 CFR Part 40; 49 CFR \u00a7382.301\u2013.311",
    body:
      "FMCSA-regulated employers must run pre-employment drug tests on every CDL driver and maintain DOT random pools at the published minimum rates (50% drug / 10% alcohol for 2026, per ODAPC). Post-accident, reasonable-suspicion, return-to-duty, and follow-up testing all carry their own clocks and chain-of-custody requirements under Part 40.",
  },
  {
    icon: Map,
    name: "MVR + annual review",
    full: "Motor vehicle record + annual driving-record review",
    cite: "49 CFR \u00a7391.25",
    body:
      "Every motor carrier must obtain the MVR from each state in which the driver has held a license in the past 12 months and document an annual review against the carrier's hiring standards. This is the line that surveyors and DOT auditors most often cite when a driver's violations were on record but never adjudicated in the qualification file.",
  },
  {
    icon: Clipboard,
    name: "Driver qualification file",
    full: "DQ file under 49 CFR \u00a7391.51",
    cite: "49 CFR \u00a7391.51",
    body:
      "The DQ file is the surveyor's first stop. It must hold the application, the three-year prior-employer history (Part 391.23), the MVRs, the annual review certifications, the medical examiner's certificate, the road-test certificate, and the Clearinghouse query receipts. Missing any one element on any active driver is a finding.",
  },
];

/* ---------------------------------------------- pre-hire stack */
const PRE_HIRE = [
  {
    icon: FileSearch,
    title: "Identity + SSN trace",
    body: "Establish identity and surface every name and address used in the last seven years so we can pull the right state MVRs and the right county criminal searches.",
  },
  {
    icon: Map,
    title: "Multi-state MVR pull",
    body: "Direct from each state DMV the driver has held a license in during the past 12 months (391.23 / 391.25), with carrier-specific scoring against your hiring matrix.",
  },
  {
    icon: AlertTriangle,
    title: "FMCSA Clearinghouse query",
    body: "Full pre-employment query against the Drug & Alcohol Clearinghouse with the driver's electronic consent captured and stored for the DQ file.",
  },
  {
    icon: Gauge,
    title: "DOT pre-employment drug test",
    body: "10-panel DOT urine collection at a certified Part 40 site, with chain-of-custody, MRO review, and pass/fail returned to your DER in hours, not days.",
  },
  {
    icon: Clipboard,
    title: "PSP + 3-year employer history",
    body: "FMCSA Pre-Employment Screening Program report plus a 391.23-compliant outreach to prior employers covering drug & alcohol history and crash record.",
  },
  {
    icon: ShieldCheck,
    title: "Criminal + sex-offender registry",
    body: "County, federal, and national criminal plus the all-states sex-offender registry. Surfaced exposure that matters for fleet liability, not noise.",
  },
];

/* ---------------------------------------------- monitoring cadence */
const MONITORING = [
  {
    when: "Within 24 hours of hire",
    body: "Driver is added to the DOT random pool, the Clearinghouse annual roster, and the MVR continuous-monitoring feed. DQ file is opened with all pre-hire artifacts attached.",
  },
  {
    when: "Continuous MVR monitoring",
    body: "Every license-status change, citation, suspension, or revocation flows in as an exception alert against your hiring matrix \u2014 most states post within 24\u201372 hours. You see only the drivers who break the rules.",
  },
  {
    when: "Annual, automatic",
    body: "On the driver's annual anniversary we run the Clearinghouse limited query, refresh the MVR, generate the 391.25 annual-review certification, and re-file the DQ packet \u2014 documented, dated, ready for audit.",
  },
  {
    when: "DOT random + event-driven",
    body: "Random selections run at the FMCSA minimums of 50% drug / 10% alcohol with collector dispatch and MRO review. Post-accident, reasonable-suspicion, and return-to-duty all triggered by the DER with documented Part 40 procedure.",
  },
];

/* ---------------------------------------------- FAQs */
const FAQS = [
  {
    q: "Which Clearinghouse queries do you run, and on what cadence?",
    a: "We run a full pre-employment query before the driver is dispatched (49 CFR \u00a7382.701(a)) and a limited query at least once every 365 days for every CDL driver you employ (\u00a7382.701(b)). Driver electronic consent is captured and stored to your DQ file. If a limited query returns information, we surface a consent request and convert it to a full query the same business day.",
  },
  {
    q: "How does continuous MVR monitoring actually work in our state?",
    a: "Most state DMVs publish license-status changes, new citations, suspensions, and revocations to a daily or near-daily feed. We poll the feed for every driver on your roster and route exceptions through your hiring-matrix logic. You get an alert when a driver crosses your threshold, not a daily inbox of clean records.",
  },
  {
    q: "Can you handle our DOT random pool?",
    a: "Yes \u2014 we operate consortium pools at the published FMCSA minimums (50% drug / 10% alcohol for 2026) with quarterly draws, collector dispatch through the SAMHSA-certified lab network, and MRO review under Part 40. We give your DER a single dashboard and a single point of contact, with a quarterly attestation pack for your safety file.",
  },
  {
    q: "What's the relationship between PSP, MVR, and the Clearinghouse?",
    a: "They cover different windows. PSP shows the last five years of FMCSA roadside inspection and crash data on the driver. MVRs show the driver's licensing and citation record from each state DMV. The Clearinghouse shows drug & alcohol violations of Part 382 \u2014 testing history is not on the MVR. The defensible hire decision uses all three.",
  },
  {
    q: "We have a mix of CDL and non-CDL drivers \u2014 how do you handle that?",
    a: "FMCSA Clearinghouse applies only to CDL drivers operating CMVs subject to Part 382. Non-CDL drivers stay on a non-DOT drug-testing protocol and on continuous MVR monitoring, but they are not in the DOT random pool. We segment your roster by regulated / non-regulated and keep the documentation separate so your DOT audit does not get cross-contaminated with non-DOT records.",
  },
  {
    q: "Do you bill per driver, per check, or per month for monitoring?",
    a: "Continuous MVR monitoring and the Clearinghouse annual program are billed per active driver per month. Pre-hire packages are billed per driver onboarded. DOT random testing is billed per draw plus per collection. There are no setup fees and no multi-year lock-ins; the unit-economics breakdown is on the pricing page.",
  },
];

/* ============================================================= */
export default function IndustriesTransportation() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Transportation & DOT employment background screening",
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
        "Motor carriers, trucking fleets, last-mile delivery, school transportation, passenger carriers, and DOT-regulated employers",
    },
    description:
      "FMCSA Drug & Alcohol Clearinghouse queries, DOT Part 40/382 drug testing, continuous MVR monitoring, PSP, and 391.51 driver qualification file maintenance for motor carriers.",
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
        title="Transportation & DOT Background Checks | FMCSA Clearinghouse, MVR, Part 40 | PreciseHire"
        description="FMCSA Clearinghouse queries, DOT drug & alcohol testing, continuous MVR monitoring, PSP, and 391.51 DQ-file maintenance \u2014 built for motor carriers."
        canonical="https://precisehire.com/industries/transportation"
        jsonLd={jsonLd}
      />

      {/* HERO ------------------------------------------------------------ */}
      <section className="ph-page-hero relative overflow-hidden">
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
                Industries &middot; Transportation & DOT
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-5 text-[#0B1F3A]">
                Run the full DOT stack —{" "}
                <span className="italic relative inline-block">
                  Clearinghouse, MVRs, Part 40
                  <span className="absolute left-0 right-0 -bottom-1 h-[6px] bg-[#B7232A]/85 rounded-full" />
                </span>{" "}
                — on one platform.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.7] text-[#0B1F3A]/75 max-w-2xl">
                FMCSA Drug & Alcohol Clearinghouse queries, DOT Part 40 / Part
                382 drug & alcohol testing, continuous MVR monitoring on your
                whole roster, PSP, the 391.23 prior-employer outreach, and a
                surveyor-ready 391.51 driver qualification file — stitched
                together so your DER and safety director see one dashboard,
                not five vendor logins.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/get-a-quote?industry=Transportation"
                  className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Build a fleet package <ArrowRight className="size-4" />
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
                  <ShieldCheck className="size-4 text-[#0B1F3A]" /> FCRA + DOT Part 40
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="size-4 text-[#0B1F3A]" /> Annual queries & 391.25 reviews automated
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="size-4 text-[#0B1F3A]" /> One DER dashboard for the whole fleet
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
                    alt="Class A CDL driver standing by the driver-side door of a white day-cab tractor at golden-hour morning, navy work shirt and safety vest."
                    className="size-full object-cover"
                    loading="eager"
                  />
                </div>
                {/* floating stat */}
                <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white border border-[#0B1F3A]/10 px-5 py-4 shadow-[0_18px_40px_-20px_rgba(11,31,58,0.4)] max-w-[230px]">
                  <span className="eyebrow">2026 DOT minimums</span>
                  <p className="font-display text-[28px] leading-tight font-semibold text-[#0B1F3A] mt-1">
                    50% drug &middot; 10% alcohol
                  </p>
                  <p className="text-[12px] text-[#0B1F3A]/60 mt-1">
                    random-pool rate, ODAPC 2026
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
              An overlooked driver is a parked truck — or worse.
            </h2>
            <p className="mt-5 text-white/75 text-[15.5px] leading-relaxed">
              A Clearinghouse-prohibited driver who is dispatched anyway is an
              immediate out-of-service event. A missed annual MVR review on a
              driver whose license was suspended turns a routine DOT audit
              into a Conditional safety rating. Both are preventable with one
              workflow that runs on a calendar, not on memory.
            </p>
            <p className="mt-4 text-white/55 text-[13px] italic">
              49 CFR §382.501 (prohibitions); 49 CFR §391.25
              (annual review); 49 CFR Part 385 (safety fitness).
            </p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
            {[
              {
                k: "Pre-hire + annual",
                v: "Clearinghouse queries",
                d: "Pre-employment full query and a limited query at least every 365 days for each CDL driver (\u00a7382.701).",
              },
              {
                k: "Every 12 months",
                v: "MVR + 391.25 review",
                d: "MVR from each licensing state plus a documented annual review against your hiring standards.",
              },
              {
                k: "Auditable",
                v: "DQ file packet",
                d: "Application, 391.23 history, MVRs, annual reviews, medical card, road test, Clearinghouse receipts \u2014 on demand.",
              },
            ].map((c) => (
              <div
                key={c.k}
                className="rounded-2xl bg-white/[0.06] border border-white/10 p-6"
              >
                <p className="font-display text-[28px] font-semibold leading-tight">
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
              Four federal obligations, one operating rhythm.
            </h2>
            <p className="mt-5 text-[#0B1F3A]/70 text-[15px] leading-relaxed">
              We run all four against the same active-driver roster on one
              calendar and reconcile mismatches before the DQ file moves. The
              output is exception-only — your DER and safety director
              only see drivers who break a rule or a threshold.
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
                The fleet default stack, role-tunable.
              </h2>
              <p className="mt-5 text-[#0B1F3A]/70 text-[15px] leading-relaxed max-w-2xl">
                Six layers run as one workflow. Last-mile and local delivery
                drop PSP if drivers aren't subject to FMCSA, but keep the MVR
                and the non-DOT drug protocol. Long-haul and passenger
                carriers run the full stack on every hire and route the
                paperwork directly into the 391.51 DQ file.
              </p>
            </div>
            <div className="lg:col-span-5 text-[13px] text-[#0B1F3A]/65 lg:text-right">
              Median fleet-package turnaround:{" "}
              <span className="font-semibold text-[#0B1F3A]">
                under 1 business day
              </span>{" "}
              once the MRO releases the drug result.
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
              The DOT audit failures we see are almost never pre-hire. They
              are the annual review you forgot, the suspension nobody pulled,
              the limited query that lapsed past 365 days. Putting those on
              automatic is the entire point of the platform.
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
                Built for the operators who carry the FMCSA exposure.
              </h2>
              <p className="mt-5 text-[#0B1F3A]/70 text-[15px] leading-relaxed">
                Different fleet types carry different mixes of CDL, non-CDL,
                hazmat, and passenger obligations. We tune the package to
                your operating authority and state mix during the build call.
              </p>
              <Link
                href="/get-a-quote?industry=Transportation"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#B7232A] hover:underline"
              >
                Talk to a fleet specialist <ArrowRight className="size-4" />
              </Link>
            </header>
            <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
              {[
                "Long-haul & regional trucking",
                "Last-mile & local delivery",
                "Construction & ready-mix fleets",
                "Hazmat & tanker carriers",
                "School transportation",
                "Motorcoach & passenger carriers",
              ].map((label) => (
                <li
                  key={label}
                  className="rounded-xl border border-[#0B1F3A]/10 bg-white px-5 py-4 text-[14.5px] text-[#0B1F3A] flex items-center gap-3"
                >
                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#FAF7F2] border border-[#0B1F3A]/10 text-[#B7232A]">
                    <Truck className="size-4" />
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
              The questions safety directors actually ask us.
            </h2>
            <p className="mt-5 text-[#0B1F3A]/70 text-[15px] leading-relaxed">
              These are pulled from real intro calls. If yours isn't here,
              call us — our compliance desk answers the phone.
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
                  Walk us through your fleet, your authority, and your last DOT audit finding.
                </h2>
                <p className="mt-4 text-white/75 max-w-xl text-[15.5px] leading-relaxed">
                  Twenty-minute working call with a fleet specialist on our
                  compliance desk. You leave with a written package proposal,
                  a monitoring quote per active driver per month, and a
                  written answer on whatever the auditor flagged last time.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link
                  href="/get-a-quote?industry=Transportation"
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
            FMCSA, ODAPC, and state DMV requirements evolve; citations and
            random-testing rates are current as of May 2026. Motor carriers
            should consult counsel and their DER for fleet-specific and
            state-specific application.
          </p>
        </div>
      </section>
    </>
  );
}
