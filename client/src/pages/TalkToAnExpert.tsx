/*
 * PreciseHire — Talk to an Expert
 * Purpose: discovery / advisory conversations. For buyers who don't want a quote
 * yet — they want to talk through compliance, package design, or a switch from
 * a current provider. Promises a 30-minute call within 2 business days.
 * Style: Trusted Modernism — navy editorial copy, cream surface, coral submit.
 */
import { useState, type FormEvent } from "react";
import { useSearch } from "wouter";
import {
  ArrowRight,
  Loader2,
  CalendarClock,
  Headphones,
  MapPin,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { COMPANY, ASSETS } from "@/content/site";
import {
  Field,
  TextareaField,
  SelectField,
  CheckboxGroup,
  Honeypot,
} from "@/components/site/FormPrimitives";

const COMPANY_SIZE = [
  "1–10 employees",
  "11–50",
  "51–250",
  "251–1,000",
  "1,000+",
];

const TOPICS = [
  "FCRA / adverse action workflow review",
  "Switching from our current provider",
  "Designing a package for a new role / division",
  "Healthcare exclusion-list monitoring (OIG / SAM)",
  "DOT / FMCSA Clearinghouse program",
  "Staffing — multi-state, per-branch billing",
  "ATS or API integration",
  "Compliance audit / second opinion",
];

const PREFERRED_TIME = [
  "Mornings (8–11a ET)",
  "Midday (11a–1p ET)",
  "Afternoons (1–4p ET)",
  "Late day (4–7p ET)",
  "Flexible — propose a time",
];

const ROLE_AT_COMPANY = [
  "HR / People Ops",
  "Talent Acquisition / Recruiting",
  "Compliance / Legal",
  "Operations",
  "Finance / Procurement",
  "Founder / Executive",
  "Other",
];

export default function TalkToAnExpert() {
  const [submitting, setSubmitting] = useState(false);
  const search = useSearch();
  const params = new URLSearchParams(search);
  const topicParam = params.get("topic") || "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    const firstName = String(formData.get("firstName") || "").trim();
    const company = String(formData.get("company") || "").trim();
    formData.append(
      "_subject",
      ["PreciseHire — Talk to expert request", company, firstName]
        .filter(Boolean)
        .join(" — "),
    );
    formData.append("_form", "talk-to-an-expert");

    if (formData.get("_gotcha")) {
      toast.success("Thanks — a specialist will reach out to book a time.");
      formEl.reset();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/mkoyyplq", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        formEl.reset();
        toast.success(
          "Got it — a specialist will reach out within 2 business days to book a 30-minute call.",
        );
      } else {
        toast.error(
          "Something went wrong. Please call (866) 773-5486 or email Info@precisehire.com.",
        );
      }
    } catch {
      toast.error("Network error. Please call (866) 773-5486 or email Info@precisehire.com.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Talk to a Background Screening Expert — PreciseHire"
        description="Book a 30-minute call with a U.S.-based PreciseHire specialist to talk through compliance, package design, or switching providers. No sales pitch."
        canonical="https://precisehire.com/talk-to-an-expert"
      />

      <section className="relative overflow-hidden">
        <img
          src={ASSETS.swooshSky}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-24 w-[500px] opacity-60 rotate-[-12deg]"
        />
        <div className="container pt-20 lg:pt-28 pb-16 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow text-[#B7232A]">Talk to an expert</span>
              <h1 className="display-xl mt-4 text-[#0B1F3A]">
                Thirty minutes.
                <br />
                One named specialist.
              </h1>
              <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed">
                Not a sales pitch. A 30-minute working session with a U.S.-based
                screening specialist — Florida or Texas, never offshore — to talk
                through FCRA compliance, package design, or a clean exit from your
                current provider.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 grid gap-5">
                <Highlight
                  icon={<Headphones className="size-5 text-[#B7232A]" />}
                  title="A real specialist, not an SDR"
                  body="The person you talk to runs accounts day-to-day and can answer compliance questions on the call."
                />
                <Highlight
                  icon={<CalendarClock className="size-5 text-[#B7232A]" />}
                  title="Booked within 2 business days"
                  body="We email back the same business day with three time options that fit your timezone."
                />
                <Highlight
                  icon={<Sparkles className="size-5 text-[#B7232A]" />}
                  title="You leave with something useful"
                  body="Even if you don't sign with us, you'll leave with a written FCRA workflow recommendation."
                />
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10 p-5 rounded-2xl bg-[#FFFCF7] border border-[#0B1F3A]/10 text-sm text-[#0B1F3A]/75">
                <div className="flex items-center gap-2 text-[#0B1F3A] font-semibold">
                  <MapPin className="size-4 text-[#B7232A]" /> Specialists you may speak with
                </div>
                <p className="mt-2">
                  Jenna, Marcus, Priya, and Tyler — all U.S.-based, all
                  named on our{" "}
                  <a href="/support" className="underline decoration-[#B7232A]/40 underline-offset-2 hover:text-[#0B1F3A]">
                    Support page
                  </a>
                  .
                </p>
                <div className="mt-4 grid gap-2">
                  <a
                    href={`tel:${COMPANY.phoneRaw}`}
                    className="inline-flex items-center gap-2 text-[#0B1F3A] hover:text-[#B7232A]"
                  >
                    <Phone className="size-4 text-[#B7232A]" /> {COMPANY.phone}
                  </a>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="inline-flex items-center gap-2 text-[#0B1F3A] hover:text-[#B7232A]"
                  >
                    <Mail className="size-4 text-[#B7232A]" /> {COMPANY.email}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <form
                onSubmit={onSubmit}
                className="rounded-3xl bg-white border border-[#0B1F3A]/10 p-6 lg:p-8 grid gap-5 shadow-[0_24px_60px_-30px_rgba(11,31,58,0.25)]"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field name="firstName" label="First name" required autoComplete="given-name" />
                  <Field name="lastName" label="Last name" required autoComplete="family-name" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field name="email" label="Work email" type="email" required autoComplete="email" />
                  <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field name="company" label="Company" required autoComplete="organization" />
                  <SelectField name="role" label="Your role" options={ROLE_AT_COMPANY} />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <SelectField name="companySize" label="Company size" options={COMPANY_SIZE} required />
                  <SelectField name="preferredTime" label="Preferred call window" options={PREFERRED_TIME} required />
                </div>

                <SelectField
                  name="primaryTopic"
                  label="What's the main thing you'd like to talk about?"
                  required
                  defaultValue={topicParam}
                  options={TOPICS}
                />

                <CheckboxGroup
                  name="secondaryTopics"
                  label="Anything else? (optional)"
                  options={TOPICS}
                />

                <TextareaField
                  name="context"
                  label="Background / context"
                  rows={4}
                  placeholder="Optional — current provider, recent compliance concern, role types, anything that would help the specialist prep."
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
                      Book a 30-minute call <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
                <p className="text-xs text-[#0B1F3A]/55">
                  By submitting, you agree to our privacy policy. No auto-sequences,
                  no marketing list — one specialist emails you back within the next
                  two business days with proposed times.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Highlight({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 size-10 rounded-xl bg-[#FFE8D6] border border-[#B7232A]/15 grid place-items-center">
        {icon}
      </div>
      <div>
        <div className="font-display text-[16px] font-semibold text-[#0B1F3A]">{title}</div>
        <p className="text-[14px] text-[#0B1F3A]/75 leading-relaxed mt-1">{body}</p>
      </div>
    </div>
  );
}
