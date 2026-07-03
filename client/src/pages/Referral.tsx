import { Link } from "wouter";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";

const STEPS = [
  {
    icon: FileText,
    title: "1. Submit Referral",
    body: "Fill out our simple form with the company and contact details. It takes less than 2 minutes.",
  },
  {
    icon: MessageSquareText,
    title: "2. We Connect",
    body: "Our team reaches out professionally to explain how PreciseHire can help with faster, more compliant background checks.",
  },
  {
    icon: Trophy,
    title: "3. Earn $1,000",
    body: "When your referral becomes an active client, you receive your $1,000 bonus as our thank-you.",
  },
];

const QUALIFICATIONS = [
  "Uses employment background checks",
  "Has at least 25 employees or hires regularly",
  "Needs screening for employees, contractors, or volunteers",
  "Located in the United States",
  "Not already a current PreciseHire client",
];

const IDEAL_REFERRALS = [
  "Staffing agencies",
  "Healthcare companies",
  "Transportation firms",
  "Property management groups",
  "Manufacturing and warehouse employers",
  "HR teams unhappy with their current provider",
];

const PROGRAM_DETAILS = [
  "Referral must be submitted before PreciseHire is already in an active sales conversation with the company.",
  "The referred company must become an active client and complete its first paid invoice.",
  "Bonuses are paid after client activation is confirmed by PreciseHire.",
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "PreciseHire Referral Program",
  description:
    "Refer businesses that need background checks and earn a $1,000 bonus when they become PreciseHire clients.",
  url: "https://precisehire.com/referral",
};

export default function Referral() {
  return (
    <>
      <SEO
        title="Referral Program | Earn $1,000 | PreciseHire"
        description="Refer a business that needs background checks. When they become a PreciseHire client, you earn a $1,000 referral bonus."
        canonical="https://precisehire.com/referral"
        jsonLd={JSONLD}
      />

      <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#0B1F3A]/8">
        <div className="absolute inset-x-0 top-0 h-1 bg-[#B7232A]" />
        <div className="container py-16 lg:py-24 text-center">
          <Reveal>
            <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#B7232A]/20 bg-white px-4 py-2 text-sm font-semibold text-[#B7232A] shadow-sm">
              <Sparkles className="size-4" />
              PreciseHire Referral Program
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mx-auto mt-7 max-w-5xl text-5xl font-bold tracking-tight text-[#0B1F3A] md:text-6xl lg:text-7xl">
              Refer a Business. Earn
              <span className="relative mx-3 inline-block text-[#B7232A]">
                $1,000.
                <span className="absolute left-0 right-0 -bottom-2 h-[7px] rounded-full bg-[#B7232A]/25" />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#0B1F3A]/72">
              Know a company that needs reliable background checks? Send them to
              PreciseHire. If they become a client, we will pay you a $1,000 referral
              bonus. Simple, professional, and worth the introduction.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href="#referral-form"
                className="inline-flex items-center gap-2 rounded-full bg-[#B7232A] px-7 py-3.5 text-[15px] font-semibold text-white shadow-sm hover:bg-[#9A1A20]"
              >
                Submit a Referral
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-[#0B1F3A]/20 bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0B1F3A] hover:bg-[#FAF7F2]"
              >
                How It Works
                <ClipboardCheck className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="how-it-works" className="bg-white">
        <div className="container py-14 lg:py-20">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="display-md text-[#0B1F3A]">How the referral program works</h2>
              <p className="mt-4 text-[16px] leading-7 text-[#0B1F3A]/70">
                No selling required. You introduce the company, and our team handles
                the rest.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={index * 0.05}>
                  <div className="h-full rounded-[1.75rem] border border-[#0B1F3A]/10 bg-white p-7 text-center shadow-sm">
                    <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#B7232A]/10 text-[#B7232A]">
                      <Icon className="size-7" />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold text-[#0B1F3A]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#0B1F3A]/70">{step.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF7F2] border-y border-[#0B1F3A]/8">
        <div className="container py-14 lg:py-20 grid lg:grid-cols-12 gap-8 items-start">
          <Reveal className="lg:col-span-5">
            <div className="rounded-[2rem] border border-[#0B1F3A]/10 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-2xl bg-[#B7232A]/10 text-[#B7232A]">
                  <BadgeDollarSign className="size-7" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B7232A]">
                    Referral Bonus
                  </p>
                  <h2 className="text-4xl font-bold text-[#0B1F3A]">$1,000</h2>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-[#0B1F3A]/72">
                Paid when your referral becomes an active PreciseHire client and
                completes their first paid invoice.
              </p>
              <div className="mt-6 rounded-2xl bg-[#FAF7F2] p-5">
                <p className="font-semibold text-[#0B1F3A]">Good referrals include:</p>
                <div className="mt-4 grid gap-3">
                  {IDEAL_REFERRALS.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-[#0B1F3A]/72">
                      <CheckCircle2 className="size-4 shrink-0 text-[#B7232A]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="rounded-[2rem] border border-[#0B1F3A]/10 bg-white p-7 shadow-sm">
              <span className="eyebrow">
                <ShieldCheck className="size-3.5 text-[#B7232A]" />
                Who qualifies?
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-[#0B1F3A]">
                The best fit is a company that already hires people and needs a better screening partner.
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {QUALIFICATIONS.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-[#0B1F3A]/8 bg-[#FAF7F2] p-4 text-sm leading-6 text-[#0B1F3A]/75">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#B7232A]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-[#B7232A]/15 bg-[#B7232A]/5 p-5 text-sm leading-6 text-[#0B1F3A]/75">
                <strong className="text-[#0B1F3A]">Simple rule:</strong> if they run
                employment background checks, drug tests, MVRs, verifications, or
                compliance screening, they are probably worth referring.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="referral-form" className="bg-white">
        <div className="container py-14 lg:py-20 grid lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">
              <Send className="size-3.5 text-[#B7232A]" />
              Submit your referral
            </span>
            <h2 className="display-md mt-4 text-[#0B1F3A]">Send us the details.</h2>
            <p className="mt-5 text-[16px] leading-7 text-[#0B1F3A]/70">
              For this GitHub build, the form uses a mail link so the page works
              immediately without adding backend code. We can wire this into HubSpot,
              email, CRM, or your existing lead system next.
            </p>
            <div className="mt-7 space-y-3 text-sm text-[#0B1F3A]/72">
              {PROGRAM_DETAILS.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#B7232A]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="rounded-[2rem] border border-[#0B1F3A]/10 bg-[#FAF7F2] p-6 lg:p-8 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Your name",
                  "Your email",
                  "Company you are referring",
                  "Contact person",
                  "Contact email",
                  "Contact phone",
                ].map((label) => (
                  <label key={label} className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#0B1F3A]">{label}</span>
                    <input
                      className="h-12 w-full rounded-xl border border-[#0B1F3A]/12 bg-white px-4 text-sm outline-none focus:border-[#B7232A]"
                      placeholder={label}
                    />
                  </label>
                ))}
              </div>
              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-semibold text-[#0B1F3A]">
                  Notes about their hiring or background check needs
                </span>
                <textarea
                  className="min-h-32 w-full rounded-xl border border-[#0B1F3A]/12 bg-white px-4 py-3 text-sm outline-none focus:border-[#B7232A]"
                  placeholder="Example: staffing agency with 4 branches, unhappy with turnaround, currently using a national provider..."
                />
              </label>
              <a
                href="mailto:mark@precisehire.com?subject=PreciseHire%20Referral&body=Your%20name:%0AYour%20email:%0ACompany%20referred:%0AContact%20person:%0AContact%20email:%0AContact%20phone:%0ANotes:"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#B7232A] px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-[#9A1A20] sm:w-auto"
              >
                Email Referral Details
                <Mail className="size-4" />
              </a>
              <p className="mt-4 text-xs leading-5 text-[#0B1F3A]/55">
                Form fields are visual for now. The button opens an email template so
                the page is usable without a backend form handler.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0B1F3A] text-white">
        <div className="container py-14 lg:py-18 text-center">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                <Users className="size-4 text-[#F2B8B5]" />
                Start with one introduction
              </span>
              <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                Someone you know may be overpaying for background checks.
              </h2>
              <p className="mt-5 text-[16px] leading-7 text-white/75">
                Send the referral today. If they become a client, you earn $1,000.
              </p>
              <a
                href="#referral-form"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0B1F3A] hover:bg-[#FAF7F2]"
              >
                Submit a Referral
                <ArrowRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
