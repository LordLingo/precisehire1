/*
 * PreciseHire — /thanks
 * Style commitment: Trusted Modernism. Cream + navy + coral, generous
 * whitespace, display+body font pairing.
 *
 * Purpose: branded confirmation page that all four Formspree forms redirect
 * to via the hidden _next field on submit. The page reads ?form=... from the
 * URL to tailor the headline, the next-step copy, and the suggested links so
 * a quote-requester gets different follow-on content than a help-desk
 * submitter or an audit booker.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  FileText,
  ShieldCheck,
} from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { ASSETS } from "@/content/site";

type Intent = "quote" | "talk" | "help" | "audit" | "default";

const COPY: Record<
  Intent,
  {
    eyebrow: string;
    headline: string;
    body: string;
    nextSteps: { title: string; body: string }[];
    primaryCta: { href: string; label: string };
    secondaryCta: { href: string; label: string };
  }
> = {
  quote: {
    eyebrow: "Quote request received",
    headline: "Your quote is being put together right now.",
    body:
      "A specialist on our pricing desk will reply personally with a written quote inside one business hour during U.S. business hours, or first thing the next business morning if you submitted overnight or on a weekend. The reply comes from a real person at a precisehire.com address — not a no-reply system inbox.",
    nextSteps: [
      {
        title: "What you'll get back",
        body:
          "A line-item written quote with per-check pricing, monitoring add-ons (if relevant to your sector), turnaround commitments, and the migration path from your current CRA if you have one.",
      },
      {
        title: "What you can do next",
        body:
          "Read the unit-economics breakdown on the pricing page so you know exactly what is — and is not — included before the call.",
      },
    ],
    primaryCta: { href: "/pricing", label: "Re-read the pricing page" },
    secondaryCta: { href: "/resources", label: "Browse the compliance resources" },
  },
  talk: {
    eyebrow: "Discovery call request received",
    headline: "We have your discovery call request.",
    body:
      "Our team will email you within one business day with two or three proposed times. The discovery call is twenty minutes on Zoom or phone with a U.S.-based specialist who actually knows the regulatory stack for your sector. No deck, no sales engineer hand-off.",
    nextSteps: [
      {
        title: "What we'll cover on the call",
        body:
          "Your current screening workflow, the regulators you answer to (FCRA, EEOC, sector-specific rules like FMCSA or OIG), the surfaces you want pressure-tested, and a written package proposal sent within two business days of the call.",
      },
      {
        title: "Want to prepare?",
        body:
          "Skim the 24-point compliance checklist before the call. Most teams find at least two workflow gaps just by reading it.",
      },
    ],
    primaryCta: { href: "/compliance/checklist", label: "Open the 24-point checklist" },
    secondaryCta: { href: "/about", label: "Read how we actually work" },
  },
  help: {
    eyebrow: "Help-desk request received",
    headline: "Your message is in our help-desk queue.",
    body:
      "A specialist will reply personally within one business day during U.S. business hours. If the issue is time-sensitive — a hire on the line, a dispute clock running — please also call (866) 773-5486 and reference the message you just sent. We will pull the thread and respond live.",
    nextSteps: [
      {
        title: "If you need an answer right now",
        body:
          "Call (866) 773-5486 during U.S. business hours and ask for the help desk. The line is staffed by the same people who read the support inbox — there is no phone-tree handoff.",
      },
      {
        title: "Common quick answers",
        body:
          "If you are a candidate looking up a report status, please contact the employer that ordered the report. We are not permitted under FCRA to release report contents directly to the consumer without going through the dispute or file-disclosure process.",
      },
    ],
    primaryCta: { href: "/support", label: "See the support team" },
    secondaryCta: { href: "/faq", label: "Browse the FAQ" },
  },
  audit: {
    eyebrow: "Compliance audit booking received",
    headline: "Your free compliance audit is booked into the queue.",
    body:
      "Our compliance desk will email you within one business day with a few proposed 15-minute windows. The audit covers your pre-hire disclosure, your authorization, your pre-adverse and final adverse-action workflow, your dispute handling, and your continuous-monitoring posture (if you run it). You receive a written one-page summary within three business days of the call.",
    nextSteps: [
      {
        title: "Bring these if you can",
        body:
          "Your current pre-hire disclosure document, your current authorization form, and a one-paragraph description of how your ATS or screening platform handles pre-adverse notices. None of these are required — we can run a useful audit without them — but they make the conversation more concrete.",
      },
      {
        title: "Want to start without us?",
        body:
          "Walk through the same 24-point checklist on your own. It is the same framework our compliance desk uses on the audit call, and it is free to download as a PDF with no email gate.",
      },
    ],
    primaryCta: { href: "/compliance/checklist", label: "Open the 24-point checklist" },
    secondaryCta: { href: "/resources?cat=Compliance", label: "Read the compliance posts" },
  },
  default: {
    eyebrow: "Message received",
    headline: "Thanks — we have your message.",
    body:
      "A specialist will reply personally within one business day during U.S. business hours. If your request is time-sensitive, you can also call (866) 773-5486.",
    nextSteps: [
      {
        title: "While you wait",
        body:
          "Browse the compliance resources, the 24-point checklist, or the unit-economics breakdown on the pricing page.",
      },
      {
        title: "Direct line",
        body:
          "Phone (866) 773-5486 · Email Info@precisehire.com — both are read by the same U.S.-based team.",
      },
    ],
    primaryCta: { href: "/", label: "Back to the homepage" },
    secondaryCta: { href: "/resources", label: "Browse the resources" },
  },
};

function readIntent(): Intent {
  if (typeof window === "undefined") return "default";
  const params = new URLSearchParams(window.location.search);
  const raw = (params.get("form") || "").toLowerCase();
  if (raw === "quote" || raw === "get-a-quote") return "quote";
  if (raw === "talk" || raw === "talk-to-an-expert") return "talk";
  if (raw === "help" || raw === "contact" || raw === "help-desk") return "help";
  if (raw === "audit" || raw === "compliance-audit-booking") return "audit";
  return "default";
}

export default function Thanks() {
  const [intent, setIntent] = useState<Intent>("default");
  useEffect(() => {
    setIntent(readIntent());
  }, []);
  const copy = useMemo(() => COPY[intent], [intent]);

  return (
    <>
      <SEO
        title="Thanks — your message is in the queue | PreciseHire"
        description="Your message has been received by PreciseHire. A U.S.-based specialist will reply personally within one business day."
        canonical="https://precisehire.com/thanks"
        noindex
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#FAF7F2]">
        <img
          src={ASSETS.swooshSky}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -top-20 -left-24 w-[460px] opacity-55 rotate-[-8deg]"
        />
        <img
          src={ASSETS.swooshCoral}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-16 w-[400px] opacity-45 rotate-[10deg]"
        />
        <div className="container pt-20 lg:pt-28 pb-16 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center relative">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow text-[#B7232A]">
                <CheckCircle2 className="size-3.5" />
                {copy.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-5 text-[#0B1F3A]">{copy.headline}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.7] text-[#0B1F3A]/80 max-w-2xl">
                {copy.body}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={copy.primaryCta.href}
                  className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  {copy.primaryCta.label} <ArrowRight className="size-4" />
                </Link>
                <Link
                  href={copy.secondaryCta.href}
                  className="btn-ghost-navy inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  {copy.secondaryCta.label}
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#0B1F3A]/65">
                <a
                  href="tel:+18667735486"
                  className="inline-flex items-center gap-1.5 hover:text-[#B7232A]"
                >
                  <Phone className="size-4 text-[#B7232A]" />
                  (866) 773-5486
                </a>
                <a
                  href="mailto:Info@precisehire.com"
                  className="inline-flex items-center gap-1.5 hover:text-[#B7232A]"
                >
                  <Mail className="size-4 text-[#B7232A]" />
                  Info@precisehire.com
                </a>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-[#B7232A]" />
                  Replied to by a real U.S.-based specialist
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-[28px] border border-[#0B1F3A]/10 bg-white px-7 py-8 shadow-[0_24px_60px_-30px_rgba(11,31,58,0.35)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#0B1F3A] text-white">
                    <Calendar className="size-5" />
                  </span>
                  <div>
                    <div className="font-display text-[16px] font-semibold text-[#0B1F3A]">
                      What happens next
                    </div>
                    <div className="text-[12px] uppercase tracking-[0.14em] text-[#0B1F3A]/55">
                      Owner-operated · U.S.-based
                    </div>
                  </div>
                </div>
                <ol className="mt-6 space-y-5">
                  {copy.nextSteps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="font-display text-[22px] leading-none text-[#B7232A]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="font-display text-[15.5px] font-semibold text-[#0B1F3A]">
                          {s.title}
                        </div>
                        <p className="mt-1.5 text-[14px] leading-[1.65] text-[#0B1F3A]/75">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SUGGESTED CONTENT STRIP */}
      <section className="container pb-24">
        <Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: FileText,
                eyebrow: "Read",
                title: "The 24-point compliance checklist",
                body:
                  "The framework our compliance desk uses on every audit call. Free PDF, no email gate.",
                href: "/compliance/checklist",
              },
              {
                icon: MessageSquare,
                eyebrow: "Read",
                title: "How we actually work",
                body:
                  "Owner-operated, U.S.-based, headquartered in McKinney, Texas. The pillars our team is built around.",
                href: "/about",
              },
              {
                icon: ShieldCheck,
                eyebrow: "Verify",
                title: "Trust &amp; attestations",
                body:
                  "SOC 2 Type II scope, PBSA membership, FCRA-aligned workflow — and how to verify each one.",
                href: "/trust",
              },
            ].map(({ icon: Icon, eyebrow, title, body, href }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-2xl border border-[#0B1F3A]/10 bg-white p-6 hover:border-[#B7232A]/40 transition-colors"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#FFF7F2] text-[#B7232A]">
                  <Icon className="size-4" />
                </span>
                <div className="mt-4 text-[11.5px] uppercase tracking-[0.16em] text-[#0B1F3A]/55">
                  {eyebrow}
                </div>
                <div
                  className="mt-1 font-display text-[17px] font-semibold text-[#0B1F3A] group-hover:text-[#B7232A]"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <p className="mt-2 text-[14px] leading-[1.65] text-[#0B1F3A]/70">
                  {body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#B7232A]">
                  Open <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
