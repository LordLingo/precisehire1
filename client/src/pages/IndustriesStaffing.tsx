/*
 * PreciseHire — /industries/staffing
 * Style: Trusted Modernism. Cream + navy + coral.
 *
 * Positioning: built for high-volume, multi-state, multi-branch staffing &
 * light-industrial agencies. The screen stack runs per-branch billing, an
 * I-9 + E-Verify overlay, WOTC pre-screening, and a same-day reusable
 * candidate profile so the same applicant can move between client orders
 * without being re-papered three times in a week.
 *
 * Statutes referenced inline: IRCA / 8 U.S.C. §1324a (I-9), the WOTC program
 * (IRC §51), FCRA §1681b(b)(2) standalone disclosure, EEOC's 2012 enforcement
 * guidance on arrest & conviction records, plus the FCRA dispute workflow.
 * General guidance, not legal advice — disclaimer rendered at page bottom.
 */
import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  Clock,
  ShieldCheck,
  IdCard,
  Layers,
  ListChecks,
  FileCheck2,
  Wallet,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Phone,
} from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/industries-staffing-hero-8MFymmyjQZNE5DbusecSC3.webp";

const STAKES = [
  {
    n: "$272 – $2,861",
    label: "Per-violation civil penalty range for I-9 paperwork errors (2024 adjusted)",
    cite: "8 U.S.C. §1324a; 8 C.F.R. §274a.10(b)(2)",
  },
  {
    n: "$2,400 – $9,600",
    label: "Typical WOTC tax credit per qualifying hire — left on the table when pre-screening is missed",
    cite: "IRC §51; IRS Form 8850",
  },
  {
    n: "28 days",
    label: "Window to file Form 8850 with the State Workforce Agency after the hire date",
    cite: "IRS Form 8850 instructions",
  },
];

const STACK = [
  {
    icon: IdCard,
    title: "I-9 + E-Verify, in-flow",
    body:
      "Section 1 captured on the candidate's phone the moment they accept the assignment; Section 2 completed by your branch recruiter in the same workflow, then submitted to E-Verify with the case number stored against the requisition. Re-verification reminders fire automatically before EAD expirations.",
  },
  {
    icon: Sparkles,
    title: "WOTC pre-screen on the application",
    body:
      "IRS Form 8850 questionnaire is rendered as the last step of the candidate application, before the offer is made — which is what the program actually requires. Eligible categories are flagged, and the 28-day SWA submission is filed for you with a downloadable confirmation.",
  },
  {
    icon: ListChecks,
    title: "Background package per client order",
    body:
      "Each client of yours can have its own check matrix — county criminal in driver-facing roles, national + sex-offender + MVR in delivery, drug screen for warehouse — and the right package fires automatically when a candidate is assigned to that client's order.",
  },
  {
    icon: Layers,
    title: "One reusable candidate profile",
    body:
      "A candidate cleared on Monday for a warehouse order doesn't get re-papered on Wednesday for a forklift order at a different client. The reusable profile keeps consent fresh, expires per state rule, and tracks which results have been disclosed to which client.",
  },
  {
    icon: Wallet,
    title: "Per-branch billing & cost centers",
    body:
      "Every check is tagged with branch ID, recruiter, and client. Invoices come out branch-by-branch (or rolled up at the corporate level — your choice) with a CSV that drops straight into Bullhorn, Avionté, TempWorks, or COATS.",
  },
  {
    icon: FileCheck2,
    title: "Adverse action, owned end-to-end",
    body:
      "FCRA §615(a) pre-adverse and §615(a)(2) final-adverse notices are issued from the platform on the recruiter's behalf, with the federal Summary of Rights and the state addenda bundled in. The dispute clock and the §1681i 30-day window are tracked centrally.",
  },
];

const OPERATORS = [
  { label: "Light industrial / warehouse", body: "1099 + W-2 mix, large per-branch volume, drug-screen + criminal + MVR for forklift roles." },
  { label: "Skilled trades", body: "Electricians, HVAC techs, plumbers — county criminal, license verifications, sometimes OSHA-10 confirmation." },
  { label: "Healthcare staffing (allied / per-diem)", body: "OIG LEIE + SAM exclusion checks, state licensing board verification, drug screen. See our healthcare deep-dive for the full stack." },
  { label: "Hospitality & food service", body: "Fast, low-cost county criminal + national + SSN trace + E-Verify; built for branches that hire 20+ a week." },
  { label: "Driver staffing & last-mile", body: "DOT or non-DOT MVR, FMCSA Clearinghouse, drug & alcohol. See our transportation deep-dive." },
  { label: "Office / professional", body: "Federal + national criminal, employment verifications, education verification, optional credit for finance-adjacent roles." },
];

const FAQ_ITEMS = [
  {
    q: "How do you handle the FCRA standalone disclosure when the candidate is applying through a job board?",
    a: "Our consent form is rendered on its own page, free of any other content other than the candidate's authorization — that is the §1681b(b)(2)(A)(i) standalone-disclosure requirement. We don't bundle it with arbitration, with the offer letter, or with the application. The candidate's signed timestamp is stored against the record and downloadable on demand. Class-action plaintiffs' bar has spent fifteen years on this question; we treat it as a hard line.",
  },
  {
    q: "Do you support our applicant tracking system?",
    a: "Yes — Bullhorn, Avionté, TempWorks, COATS, JobDiva, and CEIPAL through native integrations; everything else through SFTP or our REST API. The order is launched from the requisition, the result writes back as a status on the candidate record, and the billing line is tagged to the branch and the client.",
  },
  {
    q: "Can we set a different background package for each of our clients?",
    a: "That is the default. Every client of yours has its own package matrix — for example, a warehouse client gets county criminal + national + sex-offender + MVR, a healthcare client gets the LEIE/SAM stack with state board verification, a finance-adjacent office client gets county + national + credit. The recruiter picks the client at order entry; the right package fires.",
  },
  {
    q: "How fast is the typical turnaround on a warehouse-grade check?",
    a: "Median turnaround on a county criminal + national + sex-offender + SSN trace + I-9/E-Verify bundle is roughly 4 hours during business hours; about 60% are returned in under 90 minutes. The remainder usually wait on a county courthouse with manual filing — those we phone-pull the same day from a courthouse runner network. We do not auto-close a check as “completed” just because the API timed out.",
  },
  {
    q: "We have branches in California, New York, and Illinois. Do you handle the state addenda?",
    a: "Yes — California's ICRAA standalone notice (Civ. Code §1786.16), the New York Article 23-A statement, Illinois' notice of intent to obtain a consumer report, and the city-level Fair Chance overlays (NYC, Los Angeles, Chicago, San Francisco) are all bundled into the disclosure pack and triggered by the candidate's worksite ZIP, not by your billing address.",
  },
  {
    q: "Do you actually file the WOTC paperwork or just collect the questionnaire?",
    a: "We file. Form 8850 is rendered to the candidate, certified by the recruiter at hire, and submitted to the State Workforce Agency inside the 28-day IRS window for every qualifying hire. You get a quarterly tax-credit pack showing realized and pending credits, by branch.",
  },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Background Checks for Staffing & Light Industrial Agencies",
      provider: {
        "@type": "Organization",
        name: "PreciseHire",
        url: "https://precisehire.com",
      },
      areaServed: "United States",
      description:
        "High-volume employment background checks, I-9 + E-Verify, WOTC pre-screening, drug testing, and MVR — built for multi-branch staffing and light-industrial agencies.",
      url: "https://precisehire.com/industries/staffing",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function IndustriesStaffing() {
  return (
    <>
      <SEO
        title="Background Checks for Staffing & Light Industrial Agencies | PreciseHire"
        description="High-volume screening for multi-branch staffing firms — I-9 + E-Verify in flow, WOTC pre-screening, per-client package matrices, per-branch billing, ATS-native."
        canonical="https://precisehire.com/industries/staffing"
        jsonLd={JSONLD}
      />

      {/* HERO */}
      <section className="bg-[#FAF7F2] border-b border-[#0B1F3A]/8">
        <div className="container py-16 lg:py-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">
                <Building2 className="size-3.5 text-[#B7232A]" />
                Industries &middot; Staffing &amp; Light Industrial
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-5 text-[#0B1F3A]">
                Built for branches that hire{" "}
                <span className="italic relative inline-block">
                  twenty a day
                  <span className="absolute left-0 right-0 -bottom-1 h-[6px] bg-[#B7232A]/85 rounded-full" />
                </span>
                , not five a week.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.7] text-[#0B1F3A]/75 max-w-2xl">
                One reusable candidate profile across all your client orders.
                I-9 and E-Verify completed in the same flow as the application.
                WOTC pre-screened and filed inside the 28-day IRS window. A
                separate background-check matrix for every client you serve.
                Per-branch billing that drops straight into Bullhorn, Avionté,
                TempWorks, or COATS.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/get-a-quote?industry=Staffing"
                  className="inline-flex items-center gap-2 rounded-full bg-[#B7232A] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#9A1A20]"
                >
                  Quote a branch in 1 business hour
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/compliance/checklist"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0B1F3A]/20 px-6 py-3 text-[15px] font-semibold text-[#0B1F3A] hover:bg-white"
                >
                  Free 24-point compliance checklist
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-[28px] ring-1 ring-[#0B1F3A]/10 shadow-sm">
                <img
                  src={HERO_IMG}
                  alt="A staffing-firm branch manager during morning applicant intake"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STAKES */}
      <section className="bg-[#0B1F3A] text-white">
        <div className="container py-20 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <span className="eyebrow text-[#E26C72]">
              <AlertTriangle className="size-3.5" />
              The stakes
            </span>
            <h2 className="display-md mt-3">
              I-9 fines compound per branch — and unclaimed WOTC compounds with them.
            </h2>
            <p className="mt-5 text-white/75 text-[15.5px] leading-relaxed">
              Two of the most expensive line items in the staffing P&amp;L sit
              on the same intake form. ICE paperwork audits price each
              technical error individually, and missed Form 8850 windows are
              gone the day they expire. Both are preventable by moving them
              into the candidate intake flow on day one — not a quarterly
              cleanup project.
            </p>
            <p className="mt-4 text-white/55 text-[13px] italic">
              8 U.S.C. §1324a; 8 C.F.R. §274a.10(b)(2); IRC §51; IRS Form 8850 instructions.
            </p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
            {STAKES.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5"
              >
                <div className="font-display text-[28px] leading-none text-white">
                  {s.n}
                </div>
                <p className="mt-3 text-[13.5px] text-white/75 leading-snug">
                  {s.label}
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-white/40">
                  {s.cite}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE STACK */}
      <section className="container py-24">
        <div className="grid lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="eyebrow">The stack</span>
            <h2 className="display-md mt-3">
              Six surfaces that need to act like one product.
            </h2>
            <p className="mt-5 text-[#0B1F3A]/70 text-[15px] leading-relaxed">
              The branches that move fastest don't have six tools for intake —
              they have one. We built the candidate side of that one, so the
              recruiter can stay in the requisition and the result still lands
              in your ATS as a status, not a PDF email.
            </p>
          </header>
          <ul className="lg:col-span-8 grid md:grid-cols-2 gap-5">
            {STACK.map(({ icon: Icon, ...s }) => (
              <li
                key={s.title}
                className="rounded-2xl border border-[#0B1F3A]/10 bg-white p-6 hover:shadow-sm transition"
              >
                <div className="inline-flex size-10 items-center justify-center rounded-full bg-[#FFF7F2] text-[#B7232A]">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-[18px] font-semibold text-[#0B1F3A]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14.5px] text-[#0B1F3A]/70 leading-relaxed">
                  {s.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OPERATORS WE SERVE */}
      <section className="bg-[#FAF7F2] border-y border-[#0B1F3A]/8">
        <div className="container py-20 grid lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="eyebrow">Who this is for</span>
            <h2 className="display-md mt-3">
              We work with branch operators, not portfolios.
            </h2>
            <p className="mt-5 text-[#0B1F3A]/70 text-[15px] leading-relaxed">
              A few of the operator types we screen for every day. If your
              branches sit across two or more of these, the per-client package
              matrix is the thing that pays for itself first.
            </p>
          </header>
          <ul className="lg:col-span-8 grid md:grid-cols-2 gap-4">
            {OPERATORS.map((o) => (
              <li
                key={o.label}
                className="rounded-2xl bg-white border border-[#0B1F3A]/10 p-5 flex items-start gap-3"
              >
                <CheckCircle2 className="size-5 mt-0.5 text-[#B7232A] shrink-0" />
                <div>
                  <div className="font-semibold text-[#0B1F3A]">{o.label}</div>
                  <p className="mt-1 text-[14px] text-[#0B1F3A]/70 leading-relaxed">
                    {o.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQS */}
      <section className="container py-24">
        <div className="grid lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="eyebrow">FAQ</span>
            <h2 className="display-md mt-3">
              The questions staffing operators actually ask us.
            </h2>
            <p className="mt-5 text-[#0B1F3A]/70 text-[15px] leading-relaxed">
              Pulled from real intro calls. If yours isn't here, our Director
              of Compliance picks up the phone.
            </p>
            <Link
              href="/compliance/checklist"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#B7232A] hover:underline"
            >
              Read the full 24-point compliance self-audit
              <ArrowRight className="size-4" />
            </Link>
          </header>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#0B1F3A]/10">
                  <AccordionTrigger className="text-left text-[#0B1F3A] font-semibold text-[15.5px]">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#0B1F3A]/75 text-[14.5px] leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <Reveal>
          <div className="rounded-[28px] bg-[#0B1F3A] text-white px-8 lg:px-14 py-14 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="eyebrow text-[#E26C72]">
                <Clock className="size-3.5" />
                Ready when you are
              </span>
              <h2 className="display-md mt-3">
                Walk one branch through the stack on a 30-minute call.
              </h2>
              <p className="mt-3 text-white/70 max-w-xl">
                Share your typical weekly volume, your top three clients' check
                matrices, and your ATS. We'll come back inside one business day
                with a per-check rate, an I-9/E-Verify deployment plan, and a
                WOTC projection on your last twelve months of hires.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/get-a-quote?industry=Staffing"
                className="inline-flex items-center justify-between rounded-full bg-white text-[#0B1F3A] px-6 py-3 font-semibold hover:bg-[#FFF7F2]"
              >
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="size-4 text-[#B7232A]" />
                  Get a staffing quote
                </span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center justify-between rounded-full border border-white/25 px-6 py-3 font-semibold text-white hover:bg-white/5"
              >
                <span className="inline-flex items-center gap-2">
                  <Phone className="size-4 text-[#E26C72]" />
                  Talk to the team first
                </span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
        <p className="mt-6 text-[12.5px] italic text-[#0B1F3A]/55 text-center max-w-3xl mx-auto">
          General guidance for U.S. staffing &amp; light-industrial operators.
          Not legal advice. State and city rules (California ICRAA, NYC and Los
          Angeles Fair Chance, Illinois IECRA) layer on top of FCRA and are
          handled by worksite ZIP. Confirm specifics with your employment
          counsel.
        </p>
      </section>
    </>
  );
}
