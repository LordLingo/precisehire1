/*
 * PreciseHire — Free Compliance Audit (lead magnet)
 *
 * Style commitment: Trusted Modernism — editorial, asymmetric, navy + coral with
 * cream cards. Uses display + body type pairing, generous whitespace, and the
 * existing brush-swoosh / grain motifs already used elsewhere on the site.
 *
 * Strategy role: this is the conversion endpoint for the compliance content
 * arc (the three adverse-action posts and the continuous-monitoring post link
 * here, as does the Support page CTA). It promises a free 15-minute audit of
 * the visitor's current adverse-action workflow with no signup wall.
 */
import { Link } from "wouter";
import {
  ShieldCheck,
  Clock,
  ListChecks,
  FileSearch,
  Scale,
  Workflow,
  CheckCircle2,
  ArrowRight,
  Phone,
  Calendar,
} from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { ASSETS, COMPANY } from "@/content/site";
import { AUTHORS } from "@/content/authors";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const REVIEW_AREAS: { icon: typeof ShieldCheck; title: string; body: string }[] = [
  {
    icon: FileSearch,
    title: "Disclosure & authorization",
    body: "We compare your current pre-hire disclosure against the standalone-document rule from Syed v. M-I and Gilberg v. CCC, and against the March 2024 CFPB Summary of Rights update. If your disclosure was last touched before March 2024, it almost certainly needs a refresh.",
  },
  {
    icon: Workflow,
    title: "Pre-adverse action workflow",
    body: "We walk through how a hit is surfaced, how the pre-adverse notice goes out, what's enclosed, who handles the candidate's questions during the waiting window, and whether the clock pauses correctly when a dispute is filed.",
  },
  {
    icon: Clock,
    title: "Waiting-period cushion by jurisdiction",
    body: "Federal floor is five business days. California, Los Angeles, NYC, and Philadelphia each layer specific cushions on top. We confirm your ATS or screening platform is enforcing the right wait time per candidate location.",
  },
  {
    icon: Scale,
    title: "EEOC individualized assessment",
    body: "We review whether your hiring decisions on convictions document the three-factor analysis (nature of the offense, time elapsed, nature of the job) that the EEOC's 2012 enforcement guidance requires \u2014 and whether the documentation pattern would survive a disparate-impact discovery request.",
  },
  {
    icon: ListChecks,
    title: "Dispute handling",
    body: "We test whether your CRA gives candidates a real reinvestigation under FCRA \u00a7611 or simply re-runs the same database. We look at the dispute close rate and the outcome distribution \u2014 the right denominator is under 0.5%.",
  },
  {
    icon: ShieldCheck,
    title: "Continuous monitoring posture",
    body: "If you run continuous monitoring, we confirm the original disclosure contemplated ongoing screening, the authorization is a standalone document, and every alert flows through the full adverse-action sequence rather than getting handled informally.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is this really free, or do I have to switch CRAs?",
    a: "Really free. The audit is fifteen minutes on a Zoom or a phone call with our Director of Compliance. We will tell you what is working and what is not, in writing, and we will do that whether you ever become a customer. We have done it for plenty of employers we never sold to. The honest reason is that the conversation typically uncovers two or three workflow defects that cost less to fix than they cost to leave alone, and a meaningful percentage of those employers eventually do migrate \u2014 but the audit itself is not contingent on it.",
  },
  {
    q: "What do I need to bring to the call?",
    a: "Your current pre-hire disclosure document, your current authorization form, a description of how your ATS or screening platform handles pre-adverse and final adverse action notices, and (if you can pull it) the dispute close-rate metric from your current CRA's last twelve months. None of those are required \u2014 we can still run a useful audit without them \u2014 but having them makes the conversation more concrete.",
  },
  {
    q: "Who actually runs the audit?",
    a: "Mark Cromwell, our Director of Compliance, runs the audit personally. Mark has been working in pre-employment screening since 2011 and reviews FCRA, EEOC, and state-level adverse-action workflows for employers across healthcare, transportation, staffing, and the trades. You will not be handed off to a junior analyst or a sales engineer.",
  },
  {
    q: "What happens after the call?",
    a: "You get a one-page written summary of the workflow defects we identified and the specific statute, regulation, or case law that drives each finding. If a fix is something you can do internally without changing CRAs, we say so. If a fix requires a vendor change, we say that too \u2014 and we tell you which capabilities to demand from any CRA you evaluate, including ones that compete with us.",
  },
];

export default function Audit() {
  const author = AUTHORS["mark-cromwell"];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Background-check compliance audit",
    name: "Free 15-minute compliance audit",
    provider: {
      "@type": "Organization",
      name: COMPANY.name,
      url: "https://precisehire.com",
    },
    areaServed: { "@type": "Country", name: "United States" },
    description:
      "A free 15-minute audit of your adverse-action workflow, FCRA disclosure and authorization, EEOC individualized assessment process, and continuous-monitoring posture. Run by PreciseHire's Director of Compliance.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
        title="Free Compliance Audit | PreciseHire"
        description="Fifteen minutes with our Director of Compliance. We review your pre-hire disclosure, your adverse-action workflow, your dispute handling, and your continuous-monitoring posture. Free, written summary, no sales pressure."
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute -top-12 -left-24 size-[520px] opacity-70 pointer-events-none select-none"
          style={{ backgroundImage: `url(${ASSETS.swooshSky})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
          aria-hidden
        />
        <div
          className="absolute -top-8 right-0 size-[420px] opacity-60 pointer-events-none select-none"
          style={{ backgroundImage: `url(${ASSETS.swooshCoral})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
          aria-hidden
        />
        <div className="container pt-16 lg:pt-24 pb-16 grid lg:grid-cols-12 gap-10 items-end relative">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow text-[#B7232A]">
                <span className="inline-block size-2 rounded-full bg-[#B7232A] mr-2 align-middle" />
                Free for any U.S. employer &middot; no signup wall
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-5 text-[#0B1F3A]">
                A 15-minute compliance audit of your{" "}
                <span className="italic relative inline-block">
                  adverse-action
                  <span className="absolute left-0 right-0 -bottom-1 h-[6px] bg-[#B7232A]/85 rounded-full" />
                </span>{" "}
                workflow.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.7] text-[#0B1F3A]/75 max-w-2xl">
                Our Director of Compliance will walk through your pre-hire
                disclosure, your pre-adverse and final adverse-action workflow,
                your dispute handling, and your continuous-monitoring posture
                against the federal FCRA floor and the four jurisdictions that
                add the most overlay (California, Los Angeles, NYC,
                Philadelphia). You get a written one-page summary of what is
                working and what is not. We do this whether you ever become a
                customer.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact?topic=compliance-audit"
                  className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  <Calendar className="size-4" /> Book the 15-minute audit
                </Link>
                <a
                  href="tel:+18667735486"
                  className="btn-ghost-navy inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  <Phone className="size-4" /> Or call (866) 773-5486
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 text-[14px] text-[#0B1F3A]/70">
                Not ready to talk yet? <Link href="/compliance/checklist" className="font-semibold text-[#B7232A] underline underline-offset-4 hover:no-underline">Get the same 24-point checklist as a free PDF</Link>{" "}
                and walk through it on your own — no email required.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#0B1F3A]/65">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-[#0B1F3A]" /> No PII required
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-[#0B1F3A]" /> Written summary delivered same week
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-[#0B1F3A]" /> No sales follow-up unless you ask for one
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-[28px] border border-[#0B1F3A]/10 bg-white/85 backdrop-blur p-7 shadow-[0_24px_60px_-30px_rgba(11,31,58,0.35)]">
                <div className="flex items-center gap-3">
                  <img
                    src={author?.photo}
                    alt={author?.name ?? "Director of Compliance"}
                    className="size-12 rounded-full object-cover ring-1 ring-[#0B1F3A]/10"
                  />
                  <div>
                    <div className="text-[15px] font-display font-semibold text-[#0B1F3A]">
                      {author?.name}
                    </div>
                    <div className="text-[12px] uppercase tracking-[0.14em] text-[#0B1F3A]/55">
                      {author?.role}
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-[14.5px] leading-[1.65] text-[#0B1F3A]/80">
                  &ldquo;Most of the workflow defects I find on these audits are
                  small \u2014 a disclosure that quietly bundles the authorization,
                  a pre-adverse template that omits the Summary of Rights, an
                  ATS that does not pause the clock when a dispute is filed.
                  They are also the same defects that turn into class-action
                  exhibits when something goes wrong.&rdquo;
                </p>
                <ul className="mt-6 space-y-2.5 text-[14px] text-[#0B1F3A]/85">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 mt-0.5 text-[#B7232A] shrink-0" />
                    <span>15 minutes on Zoom or phone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 mt-0.5 text-[#B7232A] shrink-0" />
                    <span>Written one-page summary in 3 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 mt-0.5 text-[#B7232A] shrink-0" />
                    <span>Statute / regulation / case-law citations on every finding</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT WE REVIEW */}
      <section className="container py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">What the audit covers</span>
              <h2 className="display-md mt-3 text-[#0B1F3A]">
                Six surfaces, every one of them litigated.
              </h2>
              <p className="mt-5 text-[#0B1F3A]/75 leading-relaxed">
                We do not audit everything. We audit the six surfaces that
                actually generate FCRA, EEOC, and state-law class actions
                against employers \u2014 the pre-hire disclosure, the
                authorization, the pre-adverse workflow, the waiting-period
                math, the individualized assessment documentation, and the
                dispute pipeline. If your CRA gets all six right, you are very
                hard to sue.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {REVIEW_AREAS.map((a, i) => {
              const Icon = a.icon;
              return (
                <Reveal key={a.title} delay={0.04 * i}>
                  <div className="h-full rounded-2xl border border-[#0B1F3A]/10 bg-white/70 p-6 hover:border-[#B7232A]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#FFF7F2] text-[#B7232A]">
                        <Icon className="size-4" />
                      </span>
                      <h3 className="font-display text-[17px] font-semibold text-[#0B1F3A]">
                        {a.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-[14px] leading-[1.65] text-[#0B1F3A]/75">
                      {a.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — 3 steps */}
      <section className="container pb-16">
        <Reveal>
          <div className="rounded-[28px] bg-[#0B1F3A] text-white px-8 lg:px-12 py-12">
            <span className="eyebrow text-[#E26C72]">How the 15 minutes goes</span>
            <h2 className="display-md mt-3 max-w-2xl">
              Three steps. No signup wall. No sales pitch.
            </h2>
            <div className="mt-10 grid md:grid-cols-3 gap-8">
              {[
                {
                  n: "01",
                  t: "Book a slot",
                  b: "Pick a 15-minute window on Mark's calendar. Tell us which industries you hire into and roughly how many checks you run a month \u2014 nothing else.",
                },
                {
                  n: "02",
                  t: "Walk through the six surfaces",
                  b: "We talk through your current disclosure, authorization, pre-adverse and final adverse-action workflow, dispute handling, and continuous-monitoring posture.",
                },
                {
                  n: "03",
                  t: "Get the written summary",
                  b: "Within three business days you receive a one-page written summary of what is working and what is not, with the statute or case-law citation behind every finding.",
                },
              ].map((s) => (
                <div key={s.n} className="relative">
                  <div className="font-display text-[44px] leading-none text-[#E26C72]/85">
                    {s.n}
                  </div>
                  <h3 className="mt-3 font-display text-[19px] font-semibold">{s.t}</h3>
                  <p className="mt-2 text-[14.5px] leading-[1.65] text-white/75">{s.b}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="container pb-20">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">Frequently asked</span>
              <h2 className="display-md mt-3 text-[#0B1F3A]">
                The questions employers actually ask before booking.
              </h2>
              <p className="mt-4 text-[#0B1F3A]/70 leading-relaxed">
                If yours is not here, just ask on the call \u2014 it is fifteen
                minutes and you set the agenda.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <Accordion
                type="single"
                collapsible
                className="divide-y divide-[#0B1F3A]/10 border-y border-[#0B1F3A]/10"
              >
                {FAQS.map((f, i) => (
                  <AccordionItem key={f.q} value={`q${i}`} className="border-0">
                    <AccordionTrigger className="py-5 text-left font-display text-[17px] font-semibold text-[#0B1F3A] hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-[15px] leading-relaxed text-[#0B1F3A]/80">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="container pb-24">
        <Reveal>
          <div className="rounded-[28px] border border-[#0B1F3A]/10 bg-[#FFF7F2] px-8 lg:px-14 py-14 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="eyebrow text-[#B7232A]">Free, written, no follow-up unless you want one</span>
              <h2 className="display-md mt-3 text-[#0B1F3A]">
                Fifteen minutes is usually all it takes to find the two or three things to fix.
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact?topic=compliance-audit"
                className="btn-coral inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Book the audit <ArrowRight className="size-4" />
              </Link>
              <a
                href="tel:+18667735486"
                className="btn-ghost-navy inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Or call (866) 773-5486
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
