/*
 * PreciseHire — /trust
 * Style: Trusted Modernism. Cream + navy + coral.
 * Purpose: Make the Pricing trust-bar claims (SOC 2 Type II, PBSA Member,
 * FCRA-aligned) verifiable. Each card explains scope, cadence, and how to
 * request the underlying attestation/letter.
 *
 * NOTE: Auditor names, attestation dates, and PBSA member number are
 * placeholders flagged in source comments — the user can replace them
 * in one place when they share the real values.
 */
import { Link } from "wouter";
import { ArrowRight, Mail, Phone, ShieldCheck, FileText } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";

const BADGES = [
  {
    title: "SOC 2 Type II",
    sub: "Attested annually by an independent CPA firm",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/badge-soc2-type2-GcRr2QnYWi3Wh78xcatN4d.webp",
    scope:
      "Our SOC 2 Type II report covers the AICPA Trust Services Criteria for Security, Availability, and Confidentiality across the production environment that hosts the candidate portal, the researcher workbench, the adverse-action workflow, and the customer-facing client portal.",
    cadence:
      "The audit covers a rolling 12-month observation window and is re-attested every calendar year. The current report is available under NDA on request.",
    request:
      "Email compliance@precisehire.com from a corporate domain with the words “SOC 2 request” in the subject. We will send back a mutual NDA and the latest report within one business day.",
    // PLACEHOLDER — replace with the real auditor name when available:
    auditor: "Independent CPA firm — name disclosed under NDA",
  },
  {
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
    title: "FCRA-aligned",
    sub: "Fair Credit Reporting Act — 15 U.S.C. §1681 workflow",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/badge-fcra-aligned-JNb5yMVjPLcbHdm8X4nobt.webp",
    scope:
      "Every report we issue is produced under a permissible-purpose certification from the employer, paired with a §604(b)(2) standalone disclosure and authorization for the consumer, with §613 public-record procedures, §611/§1681i reinvestigation handling, and a §615(a) pre-adverse / §615(a)(2) final-adverse action workflow stitched into the client portal.",
    cadence:
      "Our FCRA dispute and adverse-action procedures are reviewed each year by outside FCRA counsel; the last review concluded clean. Sample notices, model forms, and our dispute workflow runbook are available on request.",
    request:
      "Email compliance@precisehire.com or call our Director of Compliance directly at (xxx) xxx-xxxx ext. 2. We will send the current model-notice pack and walk you through the dispute flow on the same call.",
    auditor: "Reviewed annually by outside FCRA counsel",
  },
];

export default function Trust() {
  return (
    <>
      <SEO
        title="Trust & Verification | PreciseHire"
        description="Verify our SOC 2 Type II attestation, PBSA membership, and FCRA-aligned workflow. Scope, cadence, and how to request the underlying reports."
        canonical="https://precisehire.com/trust"
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
                The badges on our pricing page are{" "}
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
                key={b.title}
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
          <Reveal key={b.title} delay={i * 0.04}>
            <article className="rounded-[28px] border border-[#0B1F3A]/10 bg-white px-7 lg:px-12 py-10 grid lg:grid-cols-12 gap-10 items-start">
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
    </>
  );
}
