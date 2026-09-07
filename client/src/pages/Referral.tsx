import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Mail,
  MessageSquareText,
  Send,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";

const RATE_TIERS = [
  { label: "Up to $1,000", min: 0, max: 1000, rate: 0.05, display: "5%" },
  { label: "$1,001 - $5,000", min: 1001, max: 5000, rate: 0.07, display: "7%" },
  { label: "$5,001 - $20,000", min: 5001, max: 20000, rate: 0.1, display: "10%" },
  { label: "$20,001 - $50,000", min: 20001, max: 50000, rate: 0.12, display: "12%" },
  { label: "$50,001+", min: 50001, max: Infinity, rate: 0.12, display: "Negotiable" },
];

const EXAMPLES = [
  { label: "Small", billing: 1000, share: "5%", monthly: 50, annual: 600 },
  { label: "Growing", billing: 5000, share: "7%", monthly: 350, annual: 4200 },
  { label: "Large", billing: 20000, share: "10%", monthly: 2000, annual: 24000 },
];

const STEPS = [
  {
    icon: FileText,
    title: "1. Register",
    body: "Complete the referral partner information form and W-9 so we can track and pay your referral share.",
  },
  {
    icon: MessageSquareText,
    title: "2. Share",
    body: "Use your custom referral partner form or link when you introduce a company that needs background checks.",
  },
  {
    icon: Trophy,
    title: "3. Earn Monthly",
    body: "When the client orders services and pays, your monthly revenue share is calculated from eligible billing.",
  },
];

const QUALIFICATIONS = [
  "HR consulting firms",
  "Temporary employment agencies",
  "Investigation companies",
  "Insurance agencies",
  "Drug testing companies",
  "Any business advisor with clients who hire people",
];

const PROGRAM_DETAILS = [
  "Referral percentage excludes pass-through expenses such as county courthouse fees, third-party verification fees, state fees, communications, and related costs.",
  "Referral payments are paid net 15 calendar days after the referred client pays.",
  "Referrals older than 180 days with no signed contract may expire unless extended in writing.",
  "Client acceptance is at the company\'s discretion, and program terms may change with notice.",
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

function getTier(amount: number) {
  return RATE_TIERS.find((tier) => amount >= tier.min && amount <= tier.max) ?? RATE_TIERS[0];
}

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "PreciseHire Referral Partner Program",
  description:
    "Refer businesses that need background checks and earn monthly referral partner revenue share from eligible billing.",
  url: "https://precisehire.com/referral",
};

export default function Referral() {
  const [monthlyBilling, setMonthlyBilling] = useState(5000);

  const estimate = useMemo(() => {
    const safeBilling = Number.isFinite(monthlyBilling) && monthlyBilling > 0 ? monthlyBilling : 0;
    const tier = getTier(safeBilling);
    const monthly = safeBilling * tier.rate;
    return {
      billing: safeBilling,
      tier,
      monthly,
      annual: monthly * 12,
      isNegotiable: safeBilling >= 50001,
    };
  }, [monthlyBilling]);

  return (
    <>
      <SEO
        title="Referral Partner Program | Earn Monthly | PreciseHire"
        description="Refer businesses that need background checks and earn monthly referral partner revenue share from eligible client billing."
        canonical="https://precisehire.com/referral"
        jsonLd={JSONLD}
      />

      <section className="ph-page-hero relative overflow-hidden bg-[#FAF7F2] border-b border-[#0B1F3A]/8">
        <div className="absolute inset-x-0 top-0 h-1 bg-[#B7232A]" />
        <div className="container py-16 lg:py-24 text-center">
          <Reveal>
            <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#B7232A]/20 bg-white px-4 py-2 text-sm font-semibold text-[#B7232A] shadow-sm">
              <Sparkles className="size-4" />
              Referral Partner Program
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mx-auto mt-7 max-w-5xl text-5xl font-bold tracking-tight text-[#0B1F3A] md:text-6xl lg:text-7xl">
              Refer once.
              <span className="relative mx-3 inline-block text-[#B7232A]">
                Earn monthly.
                <span className="absolute left-0 right-0 -bottom-2 h-[7px] rounded-full bg-[#B7232A]/25" />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#0B1F3A]/72">
              Add new clients through your custom referral partner form. When your
              client orders background checks, you receive a monthly revenue share
              from eligible billing after the client pays.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-full bg-[#B7232A] px-7 py-3.5 text-[15px] font-semibold text-white shadow-sm hover:bg-[#9A1A20]"
              >
                Estimate Your Share
                <Calculator className="size-4" />
              </a>
              <a
                href="#referral-form"
                className="inline-flex items-center gap-2 rounded-full border border-[#0B1F3A]/20 bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0B1F3A] hover:bg-[#FAF7F2]"
              >
                Become a Partner
                <ArrowRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0B1F3A] text-white">
        <div className="container py-10 lg:py-12">
          <div className="grid gap-5 md:grid-cols-3">
            {EXAMPLES.map((item) => (
              <Reveal key={item.label}>
                <div className="rounded-[1.5rem] bg-white p-6 text-center text-[#0B1F3A] shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B7232A]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm text-[#0B1F3A]/65">
                    {formatCurrency(item.billing)} billing &middot; {item.share} share
                  </p>
                  <p className="mt-4 text-3xl font-bold text-[#0B1F3A]">
                    {formatCurrency(item.monthly)}/mo
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#0B1F3A]/65">
                    {formatCurrency(item.annual)}/yr
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="bg-white">
        <div className="container py-14 lg:py-20 grid lg:grid-cols-12 gap-8 items-start">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">
              <Calculator className="size-3.5 text-[#B7232A]" />
              Referral earnings calculator
            </span>
            <h2 className="display-md mt-4 text-[#0B1F3A]">
              See what a referral could pay you.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-[#0B1F3A]/70">
              Enter the referred client\'s estimated eligible monthly billing. The
              calculator applies the program share tier and shows estimated monthly
              and annual revenue share.
            </p>

            <div className="mt-7 overflow-hidden rounded-[1.5rem] border border-[#0B1F3A]/10 bg-[#FAF7F2]">
              <div className="grid grid-cols-2 bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white">
                <span>Monthly billing</span>
                <span className="text-right">Partner share</span>
              </div>
              {RATE_TIERS.map((tier) => (
                <div
                  key={tier.label}
                  className="grid grid-cols-2 border-t border-[#0B1F3A]/8 px-5 py-3 text-sm text-[#0B1F3A]/75"
                >
                  <span>{tier.label}</span>
                  <span className="text-right font-semibold text-[#0B1F3A]">{tier.display}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="rounded-[2rem] border border-[#0B1F3A]/10 bg-[#FAF7F2] p-6 lg:p-8 shadow-sm">
              <label className="block">
                <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.16em] text-[#B7232A]">
                  Eligible monthly client billing
                </span>
                <div className="flex overflow-hidden rounded-2xl border border-[#0B1F3A]/12 bg-white">
                  <span className="grid w-12 place-items-center border-r border-[#0B1F3A]/10 text-[#0B1F3A]/55">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={monthlyBilling}
                    onChange={(event) => setMonthlyBilling(Number(event.target.value))}
                    className="h-14 w-full bg-white px-4 text-lg font-semibold text-[#0B1F3A] outline-none"
                  />
                </div>
              </label>

              <div className="mt-4 flex flex-wrap gap-2">
                {[1000, 5000, 20000, 50000].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setMonthlyBilling(amount)}
                    className="rounded-full border border-[#0B1F3A]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0B1F3A] hover:border-[#B7232A]/50 hover:text-[#B7232A]"
                  >
                    {formatCurrency(amount)}
                  </button>
                ))}
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0B1F3A]/50">
                    Tier
                  </p>
                  <p className="mt-2 text-xl font-bold text-[#0B1F3A]">
                    {estimate.tier.display}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0B1F3A]/50">
                    Monthly Estimate
                  </p>
                  <p className="mt-2 text-2xl font-bold text-[#B7232A]">
                    {formatCurrency(estimate.monthly)}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0B1F3A]/50">
                    Annual Estimate
                  </p>
                  <p className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                    {formatCurrency(estimate.annual)}
                  </p>
                </div>
              </div>

              {estimate.isNegotiable && (
                <div className="mt-5 rounded-2xl border border-[#B7232A]/20 bg-white p-5 text-sm leading-6 text-[#0B1F3A]/75">
                  <strong className="text-[#0B1F3A]">Negotiable tier:</strong> for
                  eligible billing above $50,000, the final partner share is negotiated.
                  The estimate above uses 12% as a baseline until a custom agreement is set.
                </div>
              )}

              <p className="mt-5 text-xs leading-5 text-[#0B1F3A]/55">
                Estimates are based on eligible monthly billing only. Pass-through
                expenses and third-party fees are excluded from the revenue share.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#FAF7F2] border-y border-[#0B1F3A]/8">
        <div className="container py-14 lg:py-20">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="display-md text-[#0B1F3A]">Three steps, then it runs on its own.</h2>
              <p className="mt-4 text-[16px] leading-7 text-[#0B1F3A]/70">
                You make the introduction. Our team handles the client, service,
                billing, support, and account management.
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

      <section className="bg-white">
        <div className="container py-14 lg:py-20 grid lg:grid-cols-12 gap-8 items-start">
          <Reveal className="lg:col-span-5">
            <div className="rounded-[2rem] border border-[#0B1F3A]/10 bg-[#FAF7F2] p-7 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-2xl bg-[#B7232A]/10 text-[#B7232A]">
                  <BadgeDollarSign className="size-7" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B7232A]">
                    No account babysitting
                  </p>
                  <h2 className="text-3xl font-bold text-[#0B1F3A]">We handle the client.</h2>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-[#0B1F3A]/72">
                We manage day-to-day client questions, support, billing workflow,
                and account service. No further intervention is required from the
                referral partner.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="rounded-[2rem] border border-[#0B1F3A]/10 bg-white p-7 shadow-sm">
              <span className="eyebrow">
                <ShieldCheck className="size-3.5 text-[#B7232A]" />
                Who can qualify?
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-[#0B1F3A]">
                Referral partners are people or businesses already connected to companies that hire.
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
                <strong className="text-[#0B1F3A]">Clean handoff:</strong> the client
                contracts directly with us. Partners receive marketing materials and
                may request approval to use logos, service marks, or copyrighted materials.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="referral-form" className="bg-[#FAF7F2] border-y border-[#0B1F3A]/8">
        <div className="container py-14 lg:py-20 grid lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">
              <Send className="size-3.5 text-[#B7232A]" />
              Interested?
            </span>
            <h2 className="display-md mt-4 text-[#0B1F3A]">Tell us about your book of business.</h2>
            <p className="mt-5 text-[16px] leading-7 text-[#0B1F3A]/70">
              Send us your details and we will register you and send your custom
              referral partner form. For now, this page opens a prepared email so it
              works immediately without backend form code.
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
            <div className="rounded-[2rem] border border-[#0B1F3A]/10 bg-white p-6 lg:p-8 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Your name",
                  "Your email",
                  "Company name",
                  "Phone number",
                ].map((label) => (
                  <label key={label} className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#0B1F3A]">{label}</span>
                    <input
                      className="h-12 w-full rounded-xl border border-[#0B1F3A]/12 bg-[#FAF7F2] px-4 text-sm outline-none focus:border-[#B7232A]"
                      placeholder={label}
                    />
                  </label>
                ))}
              </div>
              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-semibold text-[#0B1F3A]">
                  Anything we should know?
                </span>
                <textarea
                  className="min-h-32 w-full rounded-xl border border-[#0B1F3A]/12 bg-[#FAF7F2] px-4 py-3 text-sm outline-none focus:border-[#B7232A]"
                  placeholder="Roughly how many clients do you work with, what industries are they in, and do those clients hire people?"
                />
              </label>
              <a
                href="mailto:mark@precisehire.com?subject=Referral%20Partner%20Program&body=Your%20name:%0AYour%20email:%0ACompany:%0APhone:%0ANotes:"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#B7232A] px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-[#9A1A20] sm:w-auto"
              >
                Request Partner Registration
                <Mail className="size-4" />
              </a>
              <p className="mt-4 text-xs leading-5 text-[#0B1F3A]/55">
                Form fields are visual for now. The button opens an email template;
                we can wire this into your CRM or a real backend form next.
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
                Add a referral once
              </span>
              <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                Your referral can keep paying month after month.
              </h2>
              <p className="mt-5 text-[16px] leading-7 text-white/75">
                The larger the client and the more they order, the more your monthly
                revenue share can add up.
              </p>
              <a
                href="#calculator"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0B1F3A] hover:bg-[#FAF7F2]"
              >
                Try the Calculator
                <ClipboardCheck className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
