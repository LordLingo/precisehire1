/*
 * PreciseHire — /trust
 * Style: Trusted Modernism. Cream + navy + coral.
 * Purpose: Make the Compliance trust-strip claims (SOC 2 Type II, PBSA Member,
 * FCRA-aligned) verifiable. Each card explains scope, cadence, and how to
 * request the underlying attestation/letter.
 *
 * Adds:
 *  - Request Full Report modal on the SOC 2 card (Formspree-backed).
 *  - Internal pillar-post links inside the FCRA-aligned card so /trust
 *    doubles as an SEO hub for our compliance content.
 *
 * NOTE: Auditor names, attestation dates, and PBSA member number remain
 * placeholders flagged in source comments — replace in one place when
 * the real values are confirmed.
 */
import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Mail,
  Phone,
  ShieldCheck,
  FileText,
  Loader2,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { Field, SelectField, Honeypot } from "@/components/site/FormPrimitives";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Dedicated Formspree form for SOC 2 Type II report requests. Kept separate
// from the FCRA + ICRAA disclosure-pack inbox (xbdwnljq) so compliance can
// triage NDA requests without sifting through PDF downloads.
const TRUST_REPORT_ENDPOINT = "https://formspree.io/f/mdabqkdb";

const TEAM_ROLES = [
  "Procurement / Vendor risk",
  "Compliance / Legal",
  "Information security",
  "HR / People Ops",
  "Other",
];

// Internal-link cluster for the FCRA-aligned card. Each row points to a
// shipped pillar post so /trust doubles as an SEO and navigation hub.
const FCRA_PILLAR_LINKS = [
  {
    eyebrow: "FCRA §613",
    title: "Public-record procedures: contemporaneous notice vs. strict procedures",
    href: "/resources/fcra-section-613-public-records-employer-guide",
  },
  {
    eyebrow: "FCRA §615(a)",
    title: "Pre-adverse action notice: requirements, timing, and documents",
    href: "/resources/pre-adverse-action-notice-requirements-timing-content-and-documents",
  },
  {
    eyebrow: "Pre-adverse cushion",
    title: "How long must employers wait? State-by-state pre-adverse table",
    href: "/resources/how-long-must-employers-wait-pre-adverse-action-state-by-state",
  },
  {
    eyebrow: "FCRA §1681d",
    title: "Investigative consumer report vs. consumer report — employer guide",
    href: "/resources/investigative-consumer-report-vs-consumer-report-employer-guide",
  },
  {
    eyebrow: "Speed + FCRA",
    title: "Fast background checks: an FCRA-grounded employer pillar",
    href: "/resources/fast-background-check-employer-guide",
  },
  {
    eyebrow: "Lead magnet · PDF",
    title: "FCRA + California ICRAA disclosure pack (drafter-ready)",
    href: "/resources/fcra-icraa-disclosure-pack",
  },
];

const BADGES = [
  {
    key: "soc2",
    title: "SOC 2 Type II",
    sub: "Attested annually by an independent CPA firm",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/badge-soc2-type2-GcRr2QnYWi3Wh78xcatN4d.webp",
    scope:
      "Our SOC 2 Type II report covers the AICPA Trust Services Criteria for Security, Availability, and Confidentiality across the production environment that hosts the candidate portal, the researcher workbench, the adverse-action workflow, and the customer-facing client portal.",
    cadence:
      "The audit covers a rolling 12-month observation window and is re-attested every calendar year. The current report is available under NDA on request.",
    request:
      "Email compliance@precisehire.com from a corporate domain with the words \u201CSOC 2 request\u201D in the subject. We will send back a mutual NDA and the latest report within one business day.",
    // PLACEHOLDER — replace with the real auditor name when available:
    auditor: "Independent CPA firm — name disclosed under NDA",
  },
  {
    key: "pbsa",
    title: "PBSA Member",
    sub: "Professional Background Screening Association — member since 2009",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/badge-pbsa-member-DREztK99METgncgkeMJsoN.webp",
    scope:
      "PBSA is the industry association for U.S. consumer reporting agencies that perform employment background checks. Members agree to abide by the PBSA Background Screening Agency Accreditation Program standards covering data security, legal compliance, client education, researcher and data standards, and verification services.",
    cadence:
      "Membership is renewed annually. The current member directory is published on the PBSA website.",
    request:
      "Verify our listing directly at thepbsa.org. We are happy to confirm our internal member number in writing if a procurement or vendor-risk team needs it.",
    auditor: "Professional Background Screening Association (PBSA)",
  },
  {
    key: "fcra",
    title: "FCRA-aligned",
    sub: "Fair Credit Reporting Act — 15 U.S.C. §1681 workflow",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/badge-fcra-aligned-JNb5yMVjPLcbHdm8X4nobt.webp",
    scope:
      "Every report we issue is produced under a permissible-purpose certification from the employer, paired with a §604(b)(2) standalone disclosure and authorization for the consumer, with §613 public-record procedures, §611/§1681i reinvestigation handling, and a §615(a) pre-adverse / §615(a)(2) final-adverse action workflow stitched into the client portal.",
    cadence:
      "Our FCRA dispute and adverse-action procedures are reviewed each year by outside FCRA counsel; the last review concluded clean. Sample notices, model forms, and our dispute workflow runbook are available on request.",
    request:
      "Email compliance@precisehire.com or call our compliance desk directly at (866) 773-5486. We will send the current model-notice pack and walk you through the dispute flow on the same call.",
    auditor: "Reviewed annually by outside FCRA counsel",
  },
] as const;

export default function Trust() {
  const [reportOpen, setReportOpen] = useState(false);
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  async function onRequestReport(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    const company = String(formData.get("company") || "").trim();
    const email = String(formData.get("email") || "").trim();
    formData.append(
      "_subject",
      ["PreciseHire — SOC 2 Type II report request", company, email]
        .filter(Boolean)
        .join(" — "),
    );
    formData.append("_form", "trust-soc2-request");

    if (formData.get("_gotcha")) {
      setReportSubmitted(true);
      return;
    }

    setReportSubmitting(true);
    try {
      const res = await fetch(TRUST_REPORT_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        formEl.reset();
        setReportSubmitted(true);
        toast.success("Request received — compliance will follow up within one business day.");
      } else {
        toast.error(
          "Couldn't send your request. Please email compliance@precisehire.com directly.",
        );
      }
    } catch {
      toast.error("Network error. Please email compliance@precisehire.com directly.");
    } finally {
      setReportSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Trust & Verification | PreciseHire"
        description="Verify our SOC 2 Type II attestation, PBSA membership, and FCRA-aligned workflow. Scope, cadence, and how to request the underlying reports."
        canonical="https://precisehire.com/trust"
        image="https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/og-trust-kxdMApRDXBrfMPoEZLm84t.png"
      />

      {/* HERO */}
      <section className="bg-[#FAF7F2]">
        <div className="container py-16 lg:py-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">
                <ShieldCheck className="size-3.5 text-[#B7232A]" />
                Trust &amp; Verification
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-4 text-[#0B1F3A]">
                The badges on our compliance page are{" "}
                <span className="italic relative inline-block">
                  verifiable
                  <span className="absolute left-0 right-0 -bottom-1 h-[6px] bg-[#B7232A]/85 rounded-full" />
                </span>
                .
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.7] text-[#0B1F3A]/75 max-w-2xl">
                We do not put attestation marks on the website that we cannot
                back up with a real report, a real auditor, or a real
                membership directory. Below is exactly what each mark
                represents, the window it covers, and how a vendor-risk or
                procurement team can confirm it.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5 flex items-center justify-center gap-5 lg:gap-7">
            {BADGES.map((b) => (
              <img
                key={b.key}
                src={b.img}
                alt={`${b.title} \u2014 ${b.sub}`}
                className="size-24 lg:size-28 rounded-full bg-white ring-1 ring-[#0B1F3A]/10 shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>

      {/* THE THREE BADGES */}
      <section className="container py-20 space-y-10">
        {BADGES.map((b, i) => (
          <Reveal key={b.key} delay={i * 0.04}>
            <article
              id={b.key}
              className="rounded-[28px] border border-[#0B1F3A]/10 bg-white px-7 lg:px-12 py-10 grid lg:grid-cols-12 gap-10 items-start scroll-mt-28"
            >
              <div className="lg:col-span-3 flex flex-col items-center text-center">
                <img
                  src={b.img}
                  alt=""
                  className="size-28 rounded-full bg-white ring-1 ring-[#0B1F3A]/10"
                />
                <h2 className="font-display text-[22px] mt-5 text-[#0B1F3A] font-semibold">
                  {b.title}
                </h2>
                <p className="text-[12.5px] uppercase tracking-[0.16em] text-[#0B1F3A]/55 mt-1">
                  {b.sub}
                </p>
              </div>
              <div className="lg:col-span-9 space-y-6 text-[15.5px] leading-relaxed text-[#0B1F3A]/80">
                <div>
                  <div className="eyebrow text-[#B7232A]">Scope</div>
                  <p className="mt-2">{b.scope}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="eyebrow text-[#B7232A]">Cadence</div>
                    <p className="mt-2">{b.cadence}</p>
                  </div>
                  <div>
                    <div className="eyebrow text-[#B7232A]">How to verify</div>
                    <p className="mt-2">{b.request}</p>
                  </div>
                </div>

                {/* SOC 2 — primary CTA opens the modal */}
                {b.key === "soc2" && (
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setReportSubmitted(false);
                        setReportOpen(true);
                      }}
                      className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13.5px] font-semibold"
                    >
                      <FileText className="size-4" />
                      Request Full Report
                      <ArrowRight className="size-4" />
                    </button>
                    <a
                      href="mailto:compliance@precisehire.com?subject=SOC%202%20request"
                      className="inline-flex items-center gap-2 text-[13px] text-[#0B1F3A]/70 hover:text-[#B7232A] underline-offset-4 hover:underline"
                    >
                      <Mail className="size-3.5" />
                      Or email compliance@precisehire.com
                    </a>
                  </div>
                )}

                {/* FCRA-aligned — internal pillar links */}
                {b.key === "fcra" && (
                  <div className="rounded-2xl border border-[#0B1F3A]/10 bg-[#FAF7F2] p-5 lg:p-6">
                    <div className="eyebrow text-[#B7232A]">
                      <FileText className="size-3.5" />
                      Read the workflow in detail
                    </div>
                    <p className="mt-2 text-[14px] text-[#0B1F3A]/70 leading-relaxed">
                      Each section of our FCRA workflow is documented in a long-form
                      employer guide. Links below go to the relevant pillar post.
                    </p>
                    <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                      {FCRA_PILLAR_LINKS.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="group flex items-start gap-2 text-[13.5px] text-[#0B1F3A]/85 hover:text-[#B7232A]"
                          >
                            <ChevronRight className="size-4 mt-0.5 text-[#B7232A] shrink-0 transition-transform group-hover:translate-x-0.5" />
                            <span>
                              <span className="block text-[10.5px] uppercase tracking-[0.18em] font-semibold text-[#B7232A]/85">
                                {l.eyebrow}
                              </span>
                              <span className="block font-semibold leading-snug text-[#0B1F3A] group-hover:text-[#B7232A]">
                                {l.title}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="text-[12.5px] italic text-[#0B1F3A]/55">
                  {b.auditor}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* CONTACT STRIP */}
      <section className="container pb-24">
        <Reveal>
          <div className="rounded-[28px] bg-[#0B1F3A] text-white px-8 lg:px-14 py-12 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="eyebrow text-[#E26C72]">
                <FileText className="size-3.5" />
                Procurement / vendor-risk teams
              </span>
              <h2 className="display-md mt-3">
                One email gets you the full attestation pack.
              </h2>
              <p className="mt-3 text-white/70 max-w-xl">
                SOC 2 Type II report, current PBSA membership letter, our FCRA
                model-notice pack, security questionnaire (CAIQ + SIG Lite
                pre-filled), and a sample data-processing addendum &mdash;
                usually inside the same business day.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href="mailto:compliance@precisehire.com"
                className="inline-flex items-center justify-between rounded-full bg-white text-[#0B1F3A] px-6 py-3 font-semibold hover:bg-[#FFF7F2]"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail className="size-4" />
                  compliance@precisehire.com
                </span>
                <ArrowRight className="size-4" />
              </a>
              <Link
                href="/talk-to-an-expert?topic=Compliance%20review"
                className="inline-flex items-center justify-between rounded-full border border-white/25 px-6 py-3 font-semibold text-white hover:bg-white/5"
              >
                <span className="inline-flex items-center gap-2">
                  <Phone className="size-4 text-[#E26C72]" />
                  Talk to compliance instead
                </span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SOC 2 REQUEST MODAL */}
      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="sm:max-w-[520px] bg-[#FAF7F2] border-[#0B1F3A]/10">
          <DialogHeader>
            <DialogTitle className="font-display text-[22px] text-[#0B1F3A] leading-snug">
              Request the SOC 2 Type II report
            </DialogTitle>
            <DialogDescription className="text-[14px] text-[#0B1F3A]/70 leading-relaxed">
              We send the current report under a mutual NDA, usually within one
              business day. Tell us where to send the NDA and we'll route it to
              your procurement or vendor-risk lead.
            </DialogDescription>
          </DialogHeader>

          {reportSubmitted ? (
            <div className="rounded-2xl bg-white border border-[#0B1F3A]/10 p-5 grid gap-3">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-xl bg-[#0B1F3A] inline-flex items-center justify-center text-white shrink-0">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <p className="font-display text-[18px] font-semibold leading-snug text-[#0B1F3A]">
                    Request received.
                  </p>
                  <p className="text-[13.5px] text-[#0B1F3A]/70 leading-snug mt-1">
                    Our compliance desk will email you the mutual NDA shortly,
                    then send the full SOC 2 Type II report once it's
                    countersigned.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setReportOpen(false)}
                className="btn-coral inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold w-full"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onRequestReport} className="grid gap-4" aria-busy={reportSubmitting}>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field name="firstName" label="First name" required autoComplete="given-name" />
                <Field name="lastName" label="Last name" autoComplete="family-name" />
              </div>
              <Field name="email" label="Work email" type="email" required autoComplete="email" />
              <Field name="company" label="Company" required autoComplete="organization" />
              <SelectField name="role" label="Your role" options={TEAM_ROLES} />
              <Honeypot />

              <button
                type="submit"
                disabled={reportSubmitting}
                className="btn-coral inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[13.5px] font-semibold disabled:opacity-70"
              >
                {reportSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Sending request…</span>
                  </>
                ) : (
                  <>
                    Send my NDA &amp; report request <ArrowRight className="size-4" />
                  </>
                )}
              </button>
              <p className="text-[11.5px] text-[#0B1F3A]/55 leading-snug">
                We'll only use your details to deliver the NDA and the SOC 2 Type II
                report. No marketing list.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
