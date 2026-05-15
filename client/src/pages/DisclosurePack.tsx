/**
 * PreciseHire — FCRA + California ICRAA Disclosure Pack (lead magnet)
 *
 * Style: Trusted Modernism — cream surface, navy body, coral submit, editorial
 * left column (what's inside) + right-column gated form. On submit, redirects
 * to /thanks?form=disclosure-pack&dl=1 which auto-fires the PDF download.
 *
 * NOTE: the Formspree endpoint below is a PLACEHOLDER. Replace
 * `xnewlead00` with the real Formspree form ID for the lead-magnet inbox.
 */
import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2, FileText, ShieldCheck, CheckCircle2, Download } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { Field, SelectField, Honeypot } from "@/components/site/FormPrimitives";

// Public URL for the hosted PDF — replace if the asset is re-uploaded.
export const DISCLOSURE_PACK_PDF_URL =
  "/manus-storage/PreciseHire-FCRA-ICRAA-Disclosure-Pack_4d4da2f5.pdf";

const STATES_OF_HIRE = [
  "Mostly California",
  "Mostly New York / NYC",
  "Mostly Illinois",
  "Multi-state (5+ states)",
  "Single state, not listed",
  "Not sure yet",
];

const ROLE = [
  "HR / People Ops",
  "Talent Acquisition",
  "Compliance / Legal",
  "Operations / Founder",
  "Other",
];

export default function DisclosurePack() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    const firstName = String(formData.get("firstName") || "").trim();
    const company = String(formData.get("company") || "").trim();
    formData.append(
      "_subject",
      ["PreciseHire — FCRA/ICRAA disclosure pack download", company, firstName]
        .filter(Boolean)
        .join(" — "),
    );
    formData.append("_form", "disclosure-pack");

    if (formData.get("_gotcha")) {
      window.location.assign("/thanks?form=disclosure-pack&dl=1");
      return;
    }

    setSubmitting(true);
    try {
      // PLACEHOLDER endpoint — replace `xnewlead00` with the real form ID.
      const res = await fetch("https://formspree.io/f/xnewlead00", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      // Even if Formspree returns a 404 (placeholder ID), still deliver the
      // download — the user explicitly opted in. Production: tighten this.
      if (res.ok || res.status === 404) {
        formEl.reset();
        toast.success("Sending your copy now — the download will start on the next page.");
        window.location.assign("/thanks?form=disclosure-pack&dl=1");
        return;
      } else {
        toast.error(
          "Something went wrong sending your request. Please email Info@precisehire.com and we will send the pack directly.",
        );
      }
    } catch {
      toast.error("Network error. Please email Info@precisehire.com for the pack.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Free FCRA + California ICRAA Disclosure Pack | PreciseHire"
        description="Three ready-to-edit sample disclosures (federal stand-alone, FCRA §1681d investigative, California ICRAA) plus a 14-point pre-pull checklist. Free to download."
        canonical="https://precisehire.com/resources/fcra-icraa-disclosure-pack"
      />

      <section className="relative overflow-hidden">
        <div className="container pt-20 lg:pt-28 pb-16 grid lg:grid-cols-12 gap-12">
          {/* LEFT — what's inside */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow text-[#B7232A]">
                <span className="size-1.5 rounded-full bg-[#B7232A] inline-block" /> Free download · Lead magnet
              </span>
              <h1 className="display-xl mt-4 text-[#0B1F3A] leading-[1.05]">
                The FCRA + California ICRAA disclosure pack
                <span className="italic text-[#0B1F3A]/85"> — </span>
                annotated, drafter-ready.
              </h1>
              <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed">
                Three sample disclosures and a fourteen-point pre-pull checklist, drawn from the FCRA, the California ICRAA, and the EEOC's 2012 enforcement guidance. Everything is annotated with the statute that backs each clause so your counsel can sign off in one read.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    eyebrow: "FCRA § 1681b(b)(2)",
                    title: "Federal stand-alone disclosure",
                    body: "The clean, single-purpose document the Ninth Circuit demands — every extraneous sentence stripped out.",
                  },
                  {
                    eyebrow: "FCRA § 1681d(a)",
                    title: "Investigative consumer report disclosure",
                    body: "The second disclosure that triggers the moment your vendor calls a single reference. Three-day delivery clock built in.",
                  },
                  {
                    eyebrow: "Cal. Civ. Code § 1786.16",
                    title: "California ICRAA disclosure",
                    body: "Includes the box-check most templates miss and the privacy-practices website line mandatory since 2012.",
                  },
                  {
                    eyebrow: "Pre-pull",
                    title: "14-point compliance checklist",
                    body: "The list you run before clicking submit — covers federal, ICRAA, state credit-history bans, salary-history bans, and adverse-action prep.",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-[#0B1F3A]/10 bg-white p-6"
                  >
                    <span className="text-[11px] uppercase tracking-[0.16em] text-[#B7232A] font-semibold">
                      {card.eyebrow}
                    </span>
                    <h3 className="mt-2.5 font-display text-[17px] font-semibold leading-snug text-[#0B1F3A]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.6] text-[#0B1F3A]/70">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <ul className="mt-10 space-y-3 text-[15px] text-[#0B1F3A]/85">
                {[
                  "Each clause footnoted with the exact statute or case it answers to",
                  "Plain-English drafter notes — the small things that trigger class actions",
                  "Three-page case-law sidebar (Gilberg, Walker) on the stand-alone rule",
                  "Editable in Word or Google Docs after download",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <CheckCircle2 className="size-4 mt-1 text-[#B7232A] shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 text-[12px] uppercase tracking-[0.16em] text-[#0B1F3A]/55 inline-flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#B7232A]" />
                Educational reference · Not legal advice · Have counsel review before use
              </p>
            </Reveal>
          </div>

          {/* RIGHT — gated form */}
          <div className="lg:col-span-5">
            <Reveal delay={0.05}>
              <div className="sticky top-24">
                <form
                  onSubmit={onSubmit}
                  className="rounded-3xl bg-white border border-[#0B1F3A]/10 p-6 lg:p-8 grid gap-5 shadow-[0_24px_60px_-30px_rgba(11,31,58,0.25)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-xl bg-[#FFF5F2] inline-flex items-center justify-center text-[#B7232A] shrink-0">
                      <FileText className="size-5" />
                    </div>
                    <div>
                      <p className="font-display text-[19px] font-semibold leading-snug text-[#0B1F3A]">
                        Get the pack
                      </p>
                      <p className="text-[13.5px] text-[#0B1F3A]/70 leading-snug mt-1">
                        Free PDF — delivered to your inbox and downloaded immediately on the next page.
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field name="firstName" label="First name" required autoComplete="given-name" />
                    <Field name="lastName" label="Last name" autoComplete="family-name" />
                  </div>
                  <Field name="email" label="Work email" type="email" required autoComplete="email" />
                  <Field name="company" label="Company" required autoComplete="organization" />
                  <SelectField name="role" label="Your role" options={ROLE} />
                  <SelectField
                    name="states"
                    label="Where do you hire?"
                    options={STATES_OF_HIRE}
                  />

                  <Honeypot />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-coral inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Sending
                      </>
                    ) : (
                      <>
                        Send me the pack <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[12px] text-[#0B1F3A]/55 leading-snug">
                    By requesting the pack you agree to receive an email with the download link plus an occasional compliance update. Unsubscribe in one click.
                  </p>
                </form>

                <a
                  href={DISCLOSURE_PACK_PDF_URL}
                  className="mt-4 inline-flex items-center gap-2 text-[12.5px] text-[#0B1F3A]/55 hover:text-[#B7232A]"
                  download
                >
                  <Download className="size-3.5" /> Already on our list? Download directly.
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
