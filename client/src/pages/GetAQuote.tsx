/*
 * PreciseHire — Get a Quote
 * Purpose: highest-intent conversion. Pricing-focused, volume + role mix + ATS,
 * "Quote in 1 business hour" promise. Style: Trusted Modernism — cream surface,
 * navy body, coral submit, single editorial column on the left and the form on
 * the right.
 */
import { useState, type FormEvent } from "react";
import { useSearch } from "wouter";
import { ArrowRight, Loader2, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
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

const SERVICES = [
  "County criminal",
  "Statewide / national criminal",
  "MVR (motor vehicle)",
  "Employment verification",
  "Education verification",
  "Professional license verification",
  "DOT drug & alcohol",
  "Non-DOT drug screen",
  "OIG / SAM exclusion monitoring",
  "I-9 / E-Verify",
];

const VOLUMES = [
  "1–25 checks / month",
  "26–100 checks / month",
  "101–500 checks / month",
  "501–1,500 checks / month",
  "1,500+ checks / month",
];

const URGENCY = [
  "Hiring this week",
  "Hiring this month",
  "Switching providers in the next 60–90 days",
  "Research / planning",
];

const ATS = [
  "Bullhorn",
  "Avionté",
  "Workday",
  "Greenhouse",
  "iCIMS",
  "ApplicantStack",
  "JazzHR",
  "Other / not sure",
  "No ATS — direct portal use",
];

export default function GetAQuote() {
  const [submitting, setSubmitting] = useState(false);
  const search = useSearch();
  const params = new URLSearchParams(search);
  const industryParam = params.get("industry") || "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    const firstName = String(formData.get("firstName") || "").trim();
    const company = String(formData.get("company") || "").trim();
    formData.append(
      "_subject",
      ["PreciseHire — Quote request", company, firstName].filter(Boolean).join(" — "),
    );
    formData.append("_form", "get-a-quote");

    if (formData.get("_gotcha")) {
      toast.success("Thanks — a specialist will email a quote within one business hour.");
      formEl.reset();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/xnjworvg", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        formEl.reset();
        toast.success("Got it — a specialist will email a custom quote within one business hour.");
      } else {
        toast.error(
          "Something went wrong sending your request. Please call (866) 773-5486 or email Info@precisehire.com.",
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
        title="Get a Custom Background Check Quote — PreciseHire"
        description="Share your monthly volume, role mix, and ATS. A U.S.-based specialist will email a transparent, line-itemized quote within one business hour."
        canonical="https://precisehire.com/get-a-quote"
      />

      <section className="relative overflow-hidden">
        <img
          src={ASSETS.swooshCoral}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-[460px] opacity-50 rotate-[18deg]"
        />
        <div className="container pt-20 lg:pt-28 pb-16 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow text-[#B7232A]">Get a quote</span>
              <h1 className="display-xl mt-4 text-[#0B1F3A]">
                A real quote.
                <br />
                In one business hour.
              </h1>
              <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed">
                No "talk to sales" runaround. Tell us your volume, role mix, and ATS — a
                U.S.-based specialist will email back a transparent, line-itemized quote
                within one business hour during business hours.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-8 space-y-3 text-[15px] text-[#0B1F3A]/85">
                {[
                  "Quote in writing — no verbal-only pricing",
                  "Itemized by check type so you can see exactly what each report costs",
                  "Volume discounts shown up front (kick in at 50 checks / month)",
                  "Setup fee: $0. Minimums: none.",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <CheckCircle2 className="size-4 mt-1 text-[#B7232A] shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10 p-5 rounded-2xl bg-[#FFFCF7] border border-[#0B1F3A]/10 text-sm text-[#0B1F3A]/75">
                <div className="flex items-center gap-2 text-[#0B1F3A] font-semibold">
                  <Clock className="size-4 text-[#B7232A]" /> Response time
                </div>
                <p className="mt-2">
                  Under <strong className="text-[#0B1F3A]">60 minutes</strong> during
                  business hours (Mon–Fri, 8a–8p ET). After hours requests are
                  answered the next business morning.
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

            <Reveal delay={0.2}>
              <p className="mt-8 text-[12px] uppercase tracking-[0.16em] text-[#0B1F3A]/55 inline-flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#B7232A]" /> SOC 2 Type II · PBSA · FCRA-aligned
              </p>
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
                  <Field name="title" label="Your role / title" autoComplete="organization-title" />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <SelectField
                    name="industry"
                    label="Industry"
                    required
                    defaultValue={industryParam}
                    options={[
                      "Healthcare",
                      "Transportation & Logistics",
                      "Staffing & Light Industrial",
                      "Manufacturing & Skilled Trades",
                      "Finance & Insurance",
                      "Retail & Hospitality",
                      "Nonprofit / Public Sector",
                      "Other",
                    ]}
                  />
                  <SelectField name="volume" label="Monthly hiring volume" options={VOLUMES} required />
                </div>

                <CheckboxGroup name="services" label="Which checks do you need? (select all that apply)" options={SERVICES} />

                <div className="grid sm:grid-cols-2 gap-5">
                  <SelectField name="ats" label="ATS / system of record" options={ATS} />
                  <SelectField name="urgency" label="Timeline" options={URGENCY} />
                </div>

                <TextareaField
                  name="notes"
                  label="Anything else? (states you hire in, specific role types, current provider)"
                  rows={4}
                  placeholder="Optional — but the more you share, the more accurate the quote."
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
                      Get my quote <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
                <p className="text-xs text-[#0B1F3A]/55">
                  By submitting, you agree to our privacy policy. We will never share your
                  details with anyone. No sales auto-sequences — one real specialist
                  emails you back.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
