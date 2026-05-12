/*
 * PreciseHire — Contact (Help Desk)
 * Style: Trusted Modernism.
 * Purpose: this is NOT the sales / quote page. New buyers should go to
 * /get-a-quote or /talk-to-an-expert. This page handles existing-client support,
 * billing, candidate disputes, press / media, partnerships, and general
 * questions. The form schema is narrower and the page surfaces direct routes to
 * the right destination first.
 */
import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import {
  Mail,
  Phone,
  ArrowRight,
  Loader2,
  MessageSquare,
  Receipt,
  ShieldAlert,
  Megaphone,
  Handshake,
  CalendarClock,
} from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { COMPANY, ASSETS } from "@/content/site";
import {
  Field,
  TextareaField,
  SelectField,
  Honeypot,
} from "@/components/site/FormPrimitives";

const TOPICS = [
  "Existing client support",
  "Billing or invoice question",
  "Candidate dispute / FCRA §611",
  "Press / media inquiry",
  "Partnership or vendor inquiry",
  "Other",
];

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    const firstName = String(formData.get("firstName") || "").trim();
    const topic = String(formData.get("topic") || "").trim();
    formData.append(
      "_subject",
      ["PreciseHire — Help desk", topic, firstName].filter(Boolean).join(" — "),
    );
    formData.append("_form", "contact-help-desk");

    if (formData.get("_gotcha")) {
      toast.success("Message received — our help desk will respond within one business day.");
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
        toast.success("Message received — our help desk will respond within one business day.");
      } else {
        toast.error("Something went wrong. Please call (866) 773-5486 or email Info@precisehire.com.");
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
        title="Contact PreciseHire — Help Desk, Billing, Disputes, Press"
        description="Reach the PreciseHire help desk for existing-client support, billing, FCRA candidate disputes, press inquiries, and partnerships. For new quotes, go to /get-a-quote."
        canonical="https://precisehire.com/contact"
      />

      <section className="relative overflow-hidden">
        <img
          src={ASSETS.swooshCoral}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-[460px] opacity-50 rotate-[18deg]"
        />
        <div className="container pt-20 lg:pt-28 pb-10">
          <Reveal>
            <span className="eyebrow text-[#B7232A]">Help desk</span>
            <h1 className="display-xl mt-4 text-[#0B1F3A] max-w-3xl">
              How can we help?
            </h1>
            <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed max-w-2xl">
              This page is our help desk — existing clients, candidates, billing,
              compliance disputes, press, and partnerships. If you're hiring and
              looking for pricing or a conversation about your program, the routes
              below get you to the right person faster.
            </p>
          </Reveal>
        </div>

        <div className="container pb-6 grid md:grid-cols-3 gap-4">
          <RouteCard
            icon={<Receipt className="size-5" />}
            title="Need a quote?"
            body="Volume, role mix, ATS — a specialist emails back in one business hour."
            cta="Get a quote"
            href="/get-a-quote"
          />
          <RouteCard
            icon={<CalendarClock className="size-5" />}
            title="Want to talk first?"
            body="Book a 30-minute working session with a U.S.-based specialist."
            cta="Talk to an expert"
            href="/talk-to-an-expert"
          />
          <RouteCard
            icon={<ShieldAlert className="size-5" />}
            title="Compliance audit"
            body="Free 15-minute review of your adverse-action workflow."
            cta="Book the audit"
            href="/compliance/audit"
          />
        </div>
      </section>

      <section className="container pt-10 pb-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="font-display text-[28px] font-semibold text-[#0B1F3A] leading-tight">
              Or send us a message
            </h2>
            <p className="mt-4 text-[15px] text-[#0B1F3A]/75 leading-relaxed">
              For everything else — billing, candidate disputes, press, or general
              questions. We answer within one business day.
            </p>

            <div className="mt-8 grid gap-3 text-[#0B1F3A]/85">
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center gap-3 hover:text-[#B7232A]"
              >
                <Phone className="size-4 text-[#B7232A]" /> {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center gap-3 hover:text-[#B7232A]"
              >
                <Mail className="size-4 text-[#B7232A]" /> {COMPANY.email}
              </a>
            </div>

            <div className="mt-8 grid gap-4">
              <SmallRow
                icon={<MessageSquare className="size-4 text-[#B7232A]" />}
                title="Existing-client support"
                body="If you have an account, the fastest path is the support line on your dashboard or our named specialists on the Support page."
                link={{ href: "/support", label: "Meet the team" }}
              />
              <SmallRow
                icon={<ShieldAlert className="size-4 text-[#B7232A]" />}
                title="Candidate disputes"
                body="If a record on your report appears incorrect, file a dispute under FCRA §611 — we investigate within 30 days."
                link={{ href: "/resources/background-check-disputes-what-employers-must-do", label: "Read the dispute guide" }}
              />
              <SmallRow
                icon={<Megaphone className="size-4 text-[#B7232A]" />}
                title="Press / media"
                body="Editorial requests, expert comment on FCRA / state law, or interview requests."
              />
              <SmallRow
                icon={<Handshake className="size-4 text-[#B7232A]" />}
                title="Partnerships"
                body="ATS, HRIS, vertical SaaS, or association partners."
              />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl bg-white border border-[#0B1F3A]/10 p-6 lg:p-8 grid gap-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field name="firstName" label="First name" required autoComplete="given-name" />
                <Field name="lastName" label="Last name" required autoComplete="family-name" />
              </div>
              <Field name="email" label="Email" type="email" required autoComplete="email" />
              <Field name="company" label="Company (optional)" autoComplete="organization" />
              <SelectField
                name="topic"
                label="What is this about?"
                options={TOPICS}
                required
              />
              <TextareaField name="message" label="Message" required rows={5} />
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
                    Send message <ArrowRight className="size-4" />
                  </>
                )}
              </button>
              <p className="text-xs text-[#0B1F3A]/55">
                By submitting, you agree to our privacy policy. We never share your
                details with anyone.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function RouteCard({
  icon,
  title,
  body,
  cta,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  cta: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-[#0B1F3A]/10 bg-white p-6 hover:border-[#B7232A]/40 hover:shadow-[0_20px_45px_-25px_rgba(11,31,58,0.35)] transition-all"
    >
      <div className="size-10 rounded-xl bg-[#FFE8D6] border border-[#B7232A]/15 grid place-items-center text-[#B7232A]">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-[18px] font-semibold text-[#0B1F3A]">
        {title}
      </h3>
      <p className="mt-2 text-[14px] text-[#0B1F3A]/75 leading-relaxed">{body}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-[#B7232A]">
        {cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function SmallRow({
  icon,
  title,
  body,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex gap-3">
      <div className="shrink-0 mt-1">{icon}</div>
      <div>
        <div className="font-display text-[15px] font-semibold text-[#0B1F3A]">
          {title}
        </div>
        <p className="text-[13.5px] text-[#0B1F3A]/70 leading-relaxed mt-0.5">
          {body}
        </p>
        {link ? (
          <Link
            href={link.href}
            className="mt-1 inline-flex items-center gap-1 text-[13px] font-semibold text-[#B7232A] hover:underline"
          >
            {link.label} <ArrowRight className="size-3.5" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
