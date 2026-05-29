/*
 * PreciseHire — Ban the Box (/resources/ban-the-box)
 * Style: Trusted Modernism. Cream background, navy + crimson red, Fraunces display,
 * Inter body. Editorial split hero + interactive jurisdiction directory.
 *
 * Inspiration: accurate.com/ban-the-box (state-and-local map + table). This page
 * adapts the jurisdiction list and reframes it in PreciseHire's voice with our
 * own employer playbook, FAQs, and links to the FCRA pillars on /resources.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ShieldCheck,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Search,
  Phone,
  Scale,
  ListChecks,
  Building2,
  ChevronRight,
} from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { ASSETS, COMPANY } from "@/content/site";

/* ──────────────────────────────────────────────────────────────────────
   Jurisdictions
   "stage" buckets when private employers may ask about criminal history.
   ────────────────────────────────────────────────────────────────────── */

type Stage =
  | "Conditional offer"
  | "After interview"
  | "Deemed qualified"
  | "After application";

interface Jurisdiction {
  name: string;
  state: string; // 2-letter
  scope: "state" | "city" | "county" | "territory" | "federal";
  stage: Stage;
  effective: string;
  /** Optional internal link to a detailed compliance guide */
  link?: string;
}

const JURISDICTIONS: Jurisdiction[] = [
  { name: "Federal contractors (Fair Chance Act)", state: "US", scope: "federal", stage: "Conditional offer", effective: "Dec 20, 2021", link: "/resources/federal-contractors-fair-chance-act-employer-compliance-guide-2026" },
  { name: "California", state: "CA", scope: "state", stage: "Conditional offer", effective: "Jan 1, 2018", link: "/resources/california-fair-chance-act-employer-compliance-guide-2026" },
  { name: "Los Angeles, CA", state: "CA", scope: "city", stage: "Conditional offer", effective: "Jan 22, 2017" },
  { name: "San Francisco, CA", state: "CA", scope: "city", stage: "Conditional offer", effective: "Oct 1, 2018" },
  { name: "Colorado", state: "CO", scope: "state", stage: "After application", effective: "Jun 24, 2019" },
  { name: "Connecticut", state: "CT", scope: "state", stage: "After application", effective: "Jan 1, 2017" },
  { name: "District of Columbia", state: "DC", scope: "state", stage: "Conditional offer", effective: "Dec 17, 2014" },
  { name: "Gainesville, FL", state: "FL", scope: "city", stage: "Conditional offer", effective: "Jan 2023" },
  { name: "Hawaii", state: "HI", scope: "state", stage: "Conditional offer", effective: "Jul 15, 1998", link: "/resources/hawaii-ban-the-box-employer-compliance-guide-2026" },
  { name: "Illinois", state: "IL", scope: "state", stage: "Deemed qualified", effective: "Sep 15, 2020", link: "/resources/illinois-joqaa-employer-compliance-checklist-2026" },
  { name: "Chicago, IL", state: "IL", scope: "city", stage: "Conditional offer", effective: "Apr 24, 2023" },
  { name: "Waterloo, IA", state: "IA", scope: "city", stage: "Conditional offer", effective: "Jul 1, 2020" },
  { name: "Maine", state: "ME", scope: "state", stage: "Deemed qualified", effective: "Oct 18, 2021" },
  { name: "Maryland", state: "MD", scope: "state", stage: "After interview", effective: "Feb 29, 2020" },
  { name: "Baltimore, MD", state: "MD", scope: "city", stage: "Conditional offer", effective: "Aug 13, 2014" },
  { name: "Montgomery County, MD", state: "MD", scope: "county", stage: "Conditional offer", effective: "Jan 1, 2015" },
  { name: "Prince George's County, MD", state: "MD", scope: "county", stage: "After interview", effective: "Jan 3, 2015" },
  { name: "Massachusetts", state: "MA", scope: "state", stage: "After interview", effective: "Oct 13, 2018", link: "/resources/massachusetts-cori-employer-compliance-guide-2026" },
  { name: "Minnesota", state: "MN", scope: "state", stage: "Conditional offer", effective: "Jan 1, 2014" },
  { name: "Columbia, MO", state: "MO", scope: "city", stage: "Conditional offer", effective: "Jan 1, 2014" },
  { name: "Kansas City, MO", state: "MO", scope: "city", stage: "After interview", effective: "Jun 9, 2018" },
  { name: "St. Louis, MO", state: "MO", scope: "city", stage: "After interview", effective: "Jan 1, 2021" },
  { name: "New Jersey", state: "NJ", scope: "state", stage: "After interview", effective: "Mar 1, 2015" },
  { name: "New Mexico", state: "NM", scope: "state", stage: "After application", effective: "Jul 1, 2019" },
  { name: "New York City, NY", state: "NY", scope: "city", stage: "Conditional offer", effective: "Jul 29, 2021", link: "/resources/nyc-fair-chance-act-employer-compliance-guide-2026" },
  { name: "Buffalo, NY", state: "NY", scope: "city", stage: "After interview", effective: "Jun 10, 2013" },
  { name: "Rochester, NY", state: "NY", scope: "city", stage: "After interview", effective: "Nov 18, 2014" },
  { name: "Suffolk County, NY", state: "NY", scope: "county", stage: "After interview", effective: "Aug 25, 2020" },
  { name: "Westchester County, NY", state: "NY", scope: "county", stage: "After application", effective: "Mar 3, 2019" },
  { name: "Oregon", state: "OR", scope: "state", stage: "After interview", effective: "Jan 1, 2016" },
  { name: "Portland, OR", state: "OR", scope: "city", stage: "Conditional offer", effective: "Jul 1, 2016" },
  { name: "Chester County, PA", state: "PA", scope: "county", stage: "After interview", effective: "Dec 23, 2025" },
  { name: "Philadelphia, PA", state: "PA", scope: "city", stage: "Conditional offer", effective: "Mar 14, 2016" },
  { name: "Rhode Island", state: "RI", scope: "state", stage: "After interview", effective: "Jan 1, 2014" },
  { name: "Austin, TX", state: "TX", scope: "city", stage: "Conditional offer", effective: "Mar 24, 2016" },
  { name: "Vermont", state: "VT", scope: "state", stage: "Deemed qualified", effective: "Jul 1, 2017" },
  { name: "U.S. Virgin Islands", state: "VI", scope: "territory", stage: "Conditional offer", effective: "Nov 10, 2018" },
  { name: "Washington", state: "WA", scope: "state", stage: "Deemed qualified", effective: "Jun 6, 2018" },
  { name: "Seattle, WA", state: "WA", scope: "city", stage: "After application", effective: "Nov 13, 2013" },
  { name: "Spokane, WA", state: "WA", scope: "city", stage: "After interview", effective: "Jun 14, 2018" },
  { name: "Louisiana (state agencies)", state: "LA", scope: "state", stage: "Conditional offer", effective: "Aug 1, 2021" },
];

const STATE_COVERED: Record<string, true> = {
  CA: true, CO: true, CT: true, DC: true, FL: true, HI: true, IL: true, IA: true,
  ME: true, MD: true, MA: true, MN: true, MO: true, NJ: true, NM: true, NY: true,
  OR: true, PA: true, RI: true, TX: true, VT: true, WA: true, LA: true,
};

const STAGE_BADGE: Record<Stage, string> = {
  "Conditional offer": "bg-[#B7232A]/10 text-[#B7232A] border-[#B7232A]/25",
  "After interview": "bg-[#0B1F3A]/10 text-[#0B1F3A] border-[#0B1F3A]/20",
  "Deemed qualified": "bg-amber-500/15 text-amber-700 border-amber-500/30",
  "After application": "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
};

const PLAYBOOK = [
  {
    icon: ListChecks,
    title: "1. Audit your application — every channel",
    body: "ATS templates, third-party job boards, paper applications, even franchisee handbooks. The criminal-history checkbox has to be removed everywhere a candidate enters the funnel — not just on the careers page.",
  },
  {
    icon: Calendar,
    title: "2. Move the inquiry to the right stage",
    body: "Most jurisdictions allow the question only after a conditional offer; a meaningful subset allow it after an initial interview or once the candidate is deemed qualified. Configure your ATS so the inquiry is gated by stage, not by date.",
  },
  {
    icon: Scale,
    title: "3. Run an individualized assessment",
    body: "Even where you may consider a conviction, EEOC 2012 guidance and many state laws require a documented job-relatedness analysis covering nature/gravity of the offense, time elapsed, and nature of the job.",
  },
  {
    icon: ShieldCheck,
    title: "4. Layer state-specific notices on top of FCRA",
    body: "California, New York City, LA County, and several others require a copy of the report, an articulable reasoning notice, and a longer cure window before any final adverse action — beyond what FCRA §615 requires.",
  },
  {
    icon: AlertTriangle,
    title: "5. Train hiring managers — not just HR",
    body: "Most ban-the-box claims start with an off-script question on the phone screen. Document a manager script, role-play it, and audit recordings or notes quarterly so the policy lives where the conversation actually happens.",
  },
  {
    icon: Building2,
    title: "6. Refresh policy every January and July",
    body: "Ban-the-box and fair-chance laws are amended on a rolling basis — Chicago in 2023, Chester County PA in 2025, NYC's Fair Chance amendments. A semi-annual review keeps the policy ahead of the next legislative cycle.",
  },
];

const FAQS = [
  {
    q: "Are ban-the-box laws the same as fair-chance hiring laws?",
    a: "They overlap, but fair-chance laws usually go further. Ban-the-box rules govern the timing of the criminal-history question on an application. Fair-chance laws also dictate the individualized-assessment process, the documents you have to share with the candidate, the cure window before final adverse action, and sometimes posting requirements. New York City, Los Angeles County, and California's FCA are good examples of fair-chance laws that include but extend beyond ban-the-box.",
  },
  {
    q: "Does federal law require ban-the-box for private employers?",
    a: "No federal statute imposes ban-the-box on private employers. The federal Fair Chance Act (effective December 2021) only covers federal agencies and federal contractors — and only for positions tied to a federal contract. Private employers are governed by the patchwork of state, county, and city laws on this page, plus the EEOC's 2012 guidance and Title VII disparate-impact framework.",
  },
  {
    q: "Can I still run a background check if my state has a ban-the-box law?",
    a: "Yes. Ban-the-box regulates when you may ask, not whether you may screen. Once a candidate is past the gating stage (most often a conditional offer), a fully FCRA-compliant background check is permitted, subject to the state's individualized-assessment and adverse-action requirements.",
  },
  {
    q: "What is the most common ban-the-box mistake?",
    a: "Two things tied for first place: leaving the criminal-history checkbox on a third-party application portal that HR forgot existed, and asking the question verbally during a recruiter phone screen. Both are strict-liability violations in most jurisdictions, regardless of whether the candidate was eventually hired.",
  },
  {
    q: "Do remote-work positions follow the candidate's state or the employer's state?",
    a: "The conservative read — and the one most employment counsel recommend — is that the candidate's work location governs. If a Manhattan-based candidate applies for a remote role with a company headquartered in a non-covered state, NYC Fair Chance still applies. We configure the report and notices on the candidate's primary work location.",
  },
  {
    q: "How does PreciseHire keep up with changes?",
    a: "Our compliance team tracks the 50-state matrix continuously. When a jurisdiction changes — new effective date, expanded scope, new notice requirement — the workflow update ships to every client account before the rule takes effect, with a short release note in the dashboard. No homework on your team.",
  },
];

const RELATED = [
  {
    href: "/resources/ban-the-box-laws-by-state-2026",
    title: "Ban-the-Box laws by state — 2026 deep dive",
    eyebrow: "Pillar guide",
  },
  {
    href: "/resources/fcra-section-613-public-records-employer-guide",
    title: "FCRA §613: the public-record notice rule",
    eyebrow: "FCRA",
  },
  {
    href: "/resources/pre-adverse-action-notice-requirements-timing-content-and-documents",
    title: "Pre-adverse action notice — timing, content, documents",
    eyebrow: "FCRA §615",
  },
  {
    href: "/resources/how-long-must-employers-wait-pre-adverse-action-state-by-state",
    title: "Pre-adverse waiting period — state-by-state cushion",
    eyebrow: "State law",
  },
  {
    href: "/resources/investigative-consumer-report-vs-consumer-report-employer-guide",
    title: "Investigative consumer report vs. consumer report",
    eyebrow: "FCRA",
  },
  {
    href: "/resources/adverse-action-fcra-step-by-step-walkthrough-for-hiring-managers",
    title: "Adverse action — step-by-step walkthrough",
    eyebrow: "Hiring managers",
  },
];

/* ──────────────────────────────────────────────────────────────────────
   Lightweight U.S. map — coordinates roughly mapped to a 1000×600 SVG.
   Each covered state gets a coral pill; uncovered states render a
   pale dot. Hovering or focusing a pill scrolls/highlights the row in
   the directory below.
   ────────────────────────────────────────────────────────────────────── */

const STATE_DOTS: { code: string; x: number; y: number }[] = [
  { code: "WA", x: 130, y: 70 }, { code: "OR", x: 110, y: 130 }, { code: "CA", x: 90, y: 260 },
  { code: "NV", x: 150, y: 220 }, { code: "ID", x: 200, y: 130 }, { code: "MT", x: 280, y: 90 },
  { code: "WY", x: 290, y: 170 }, { code: "UT", x: 220, y: 240 }, { code: "AZ", x: 200, y: 320 },
  { code: "CO", x: 320, y: 240 }, { code: "NM", x: 290, y: 320 }, { code: "ND", x: 380, y: 90 },
  { code: "SD", x: 380, y: 150 }, { code: "NE", x: 400, y: 215 }, { code: "KS", x: 420, y: 270 },
  { code: "OK", x: 430, y: 330 }, { code: "TX", x: 430, y: 400 }, { code: "MN", x: 470, y: 110 },
  { code: "IA", x: 490, y: 195 }, { code: "MO", x: 510, y: 265 }, { code: "AR", x: 510, y: 335 },
  { code: "LA", x: 510, y: 410 }, { code: "WI", x: 540, y: 145 }, { code: "IL", x: 560, y: 230 },
  { code: "MS", x: 555, y: 380 }, { code: "AL", x: 595, y: 370 }, { code: "TN", x: 600, y: 305 },
  { code: "KY", x: 615, y: 270 }, { code: "IN", x: 595, y: 230 }, { code: "MI", x: 600, y: 165 },
  { code: "OH", x: 640, y: 220 }, { code: "WV", x: 670, y: 245 }, { code: "GA", x: 645, y: 380 },
  { code: "FL", x: 680, y: 460 }, { code: "SC", x: 690, y: 350 }, { code: "NC", x: 705, y: 305 },
  { code: "VA", x: 720, y: 265 }, { code: "PA", x: 720, y: 195 }, { code: "NY", x: 745, y: 145 },
  { code: "VT", x: 790, y: 110 }, { code: "NH", x: 810, y: 120 }, { code: "ME", x: 830, y: 90 },
  { code: "MA", x: 815, y: 145 }, { code: "RI", x: 820, y: 165 }, { code: "CT", x: 800, y: 165 },
  { code: "NJ", x: 770, y: 200 }, { code: "DE", x: 760, y: 220 }, { code: "MD", x: 745, y: 235 },
  { code: "DC", x: 740, y: 245 }, { code: "AK", x: 130, y: 480 }, { code: "HI", x: 230, y: 510 },
];

export default function BanTheBox() {
  const [stage, setStage] = useState<"All" | Stage>("All");
  const [scope, setScope] = useState<"All" | "state" | "city" | "county" | "territory" | "federal">("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return JURISDICTIONS.filter((j) => {
      if (stage !== "All" && j.stage !== stage) return false;
      if (scope !== "All" && j.scope !== scope) return false;
      if (q.trim()) {
        const needle = q.trim().toLowerCase();
        if (!j.name.toLowerCase().includes(needle) && !j.state.toLowerCase().includes(needle)) return false;
      }
      return true;
    });
  }, [stage, scope, q]);

  const stats = useMemo(() => {
    const states = new Set<string>();
    const locals = new Set<string>();
    for (const j of JURISDICTIONS) {
      if (j.scope === "state" || j.scope === "territory") states.add(j.state);
      else locals.add(j.name);
    }
    return { states: states.size, locals: locals.size, total: JURISDICTIONS.length };
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <SEO
        title="Ban the Box Laws by State & Jurisdiction | PreciseHire"
        description="An employer's guide to ban-the-box and fair-chance hiring laws across 16 states, DC, the U.S. Virgin Islands, and 20+ cities and counties. Includes a directory, employer playbook, and FAQs."
        canonical="https://precisehire.com/resources/ban-the-box"
        image="https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/og-banthebox-SDr8NMsoTeW3JpGURzypRr.png"
        keywords={[
          "ban the box laws by state",
          "fair chance hiring",
          "ban the box employer compliance",
          "fair chance act 2026",
        ]}
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#FAF7F2]">
        <img
          src={ASSETS.swooshSky}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -left-24 w-[480px] opacity-60 rotate-[-12deg]"
        />
        <img
          src={ASSETS.swooshCoral}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-16 w-[420px] opacity-35 rotate-[8deg]"
        />
        <div className="container pt-14 lg:pt-20 pb-12 relative">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-[13px] text-[#0B1F3A]/60 flex items-center gap-1.5">
              <Link href="/" className="hover:text-[#B7232A]">Home</Link>
              <ChevronRight className="size-3.5" />
              <Link href="/resources" className="hover:text-[#B7232A]">Resources</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-[#0B1F3A]">Ban the Box</span>
            </nav>
          </Reveal>

          <div className="mt-6 grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <Reveal delay={0.05}>
                <span className="eyebrow">
                  <ShieldCheck className="size-3.5 text-[#B7232A]" />
                  Compliance reference · Updated May 2026
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="display-xl mt-5 text-[#0B1F3A]">
                  Ban the Box laws,{" "}
                  <span className="italic relative inline-block">
                    decoded
                    <span className="absolute left-0 right-0 -bottom-1 h-[6px] bg-[#B7232A]/85 rounded-full" />
                  </span>{" "}
                  by jurisdiction.
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 text-[17px] leading-[1.7] text-[#0B1F3A]/75 max-w-2xl">
                  Sixteen states, the District of Columbia, the U.S. Virgin Islands,
                  and more than twenty cities and counties now restrict when a
                  private employer can ask a candidate about prior criminal history.
                  This page is the single source of truth for our clients —
                  what each jurisdiction actually requires, when it kicks in, and how
                  PreciseHire applies it to your hiring workflow automatically.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/get-a-quote"
                    className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                  >
                    Get a fair-chance ready quote <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/resources/multi-state-employers-ban-the-box-one-compliant-process-2026"
                    className="btn-ghost-navy inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                  >
                    Multi-state: build one compliant process
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* HERO STATS */}
            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="rounded-3xl border border-[#0B1F3A]/10 bg-white shadow-[0_30px_60px_-30px_rgba(11,31,58,0.35)] p-6 lg:p-8">
                  <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-[#0B1F3A]/55">
                    <MapPin className="size-3.5 text-[#B7232A]" /> National picture
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-4">
                    <div>
                      <div className="font-display text-[34px] leading-none text-[#0B1F3A] font-semibold">{stats.states}</div>
                      <div className="mt-1 text-[12px] text-[#0B1F3A]/65 leading-snug">states &amp; territories</div>
                    </div>
                    <div>
                      <div className="font-display text-[34px] leading-none text-[#0B1F3A] font-semibold">{stats.locals}</div>
                      <div className="mt-1 text-[12px] text-[#0B1F3A]/65 leading-snug">cities &amp; counties</div>
                    </div>
                    <div>
                      <div className="font-display text-[34px] leading-none text-[#B7232A] font-semibold">{stats.total}</div>
                      <div className="mt-1 text-[12px] text-[#0B1F3A]/65 leading-snug">total jurisdictions</div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[#0B1F3A]/10 text-[13px] text-[#0B1F3A]/70 leading-relaxed">
                    Coverage figures count private-employer rules only. State-only public-sector laws (e.g., Florida, Georgia, Indiana, Kentucky, Michigan, Nebraska, Ohio, Oklahoma, Tennessee, Utah, Wisconsin) are not on this page; we still apply them in our workflow when relevant.
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT + WHY — editorial pull */}
      <section className="bg-white border-y border-[#0B1F3A]/10">
        <div className="container py-16 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow"><span className="size-1.5 rounded-full bg-[#B7232A] inline-block" /> Why this matters</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[32px] lg:text-[40px] leading-[1.1] text-[#0B1F3A] mt-4">
                The check-box is gone. The compliance burden moved to <em className="not-italic underline decoration-[#B7232A]/70 decoration-[3px] underline-offset-[6px]">timing</em>.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 text-[16px] leading-[1.75] text-[#0B1F3A]/80 space-y-5">
            <p>
              "Ban the Box" started in Hawaii in 1998 as a single sentence: do not ask about criminal history on the application. Twenty-eight years later it is the most heavily-litigated stage of pre-employment screening, because the simple rule has grown a complicated body of timing requirements, individualized-assessment requirements, document-sharing requirements, and notice requirements that vary by jurisdiction.
            </p>
            <p>
              The federal Fair Credit Reporting Act still governs how the report is delivered and how adverse action is communicated. State and local fair-chance laws sit on top of FCRA — they decide <em>when</em> the question may be asked, <em>what</em> the employer must consider before disqualifying, <em>which documents</em> have to be shared with the candidate, and <em>how long</em> the candidate has to respond. Get any of those wrong and the FCRA-perfect adverse action letter at the end becomes Exhibit A.
            </p>
            <p className="text-[#0B1F3A]/70 italic border-l-2 border-[#B7232A]/60 pl-4">
              The information below is for reference only and is not legal advice. Local rules amend frequently; always pair this page with counsel review before changing your application or interview script.
            </p>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-[#FAF7F2]">
        <div className="container py-16">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow"><MapPin className="size-3.5 text-[#B7232A]" /> Coverage map</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[30px] lg:text-[38px] leading-[1.1] text-[#0B1F3A] mt-3">
                Where private-employer rules apply.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-[15px] leading-relaxed text-[#0B1F3A]/70">
                Filled markers indicate a state, district, or territory with an active private-employer ban-the-box law. Cities and counties with their own additional rules are listed in the directory below.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-3xl bg-white border border-[#0B1F3A]/10 shadow-[0_30px_60px_-30px_rgba(11,31,58,0.25)] p-6 lg:p-10 overflow-hidden">
              <svg
                viewBox="0 0 900 540"
                role="img"
                aria-label="United States map showing states with private-employer ban-the-box laws"
                className="w-full h-auto"
              >
                <rect x="0" y="0" width="900" height="540" fill="#F4EFE6" rx="20" />
                {STATE_DOTS.map((d) => {
                  const active = STATE_COVERED[d.code];
                  return (
                    <g key={d.code}>
                      <circle
                        cx={d.x}
                        cy={d.y}
                        r={active ? 14 : 6}
                        fill={active ? "#B7232A" : "#0B1F3A"}
                        opacity={active ? 0.92 : 0.16}
                      />
                      {active && (
                        <text
                          x={d.x}
                          y={d.y + 4}
                          textAnchor="middle"
                          fontFamily="Inter, system-ui, sans-serif"
                          fontSize="9"
                          fontWeight={700}
                          fill="#FFFFFF"
                        >
                          {d.code}
                        </text>
                      )}
                      {!active && (
                        <text
                          x={d.x}
                          y={d.y + 18}
                          textAnchor="middle"
                          fontFamily="Inter, system-ui, sans-serif"
                          fontSize="9"
                          fontWeight={500}
                          fill="#0B1F3A"
                          opacity={0.45}
                        >
                          {d.code}
                        </text>
                      )}
                    </g>
                  );
                })}
                {/* Legend */}
                <g transform="translate(640, 470)">
                  <circle cx="10" cy="10" r="9" fill="#B7232A" opacity="0.92" />
                  <text x="28" y="14" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fill="#0B1F3A">Active state law</text>
                  <circle cx="10" cy="36" r="5" fill="#0B1F3A" opacity="0.16" />
                  <text x="28" y="40" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fill="#0B1F3A">No state-level rule</text>
                </g>
              </svg>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIRECTORY */}
      <section id="directory" className="bg-white border-y border-[#0B1F3A]/10">
        <div className="container py-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <Reveal>
                <p className="eyebrow"><ListChecks className="size-3.5 text-[#B7232A]" /> Jurisdiction directory</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-display text-[30px] lg:text-[38px] leading-[1.1] text-[#0B1F3A] mt-3">
                  The 40-row matrix our compliance team operates from.
                </h2>
              </Reveal>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[13px]">
              <span className="text-[#0B1F3A]/55">Stage:</span>
              {(["All", "Conditional offer", "After interview", "Deemed qualified", "After application"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStage(s)}
                  className={[
                    "px-3 py-1.5 rounded-full border transition-colors",
                    stage === s
                      ? "bg-[#0B1F3A] text-white border-[#0B1F3A]"
                      : "bg-white text-[#0B1F3A]/75 border-[#0B1F3A]/15 hover:border-[#0B1F3A]/40",
                  ].join(" ")}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <label className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#0B1F3A]/45" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search a state, city, or county"
                className="w-full pl-10 pr-4 py-3 rounded-full border border-[#0B1F3A]/15 bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#B7232A]/40 text-[14px]"
              />
            </label>
            <div className="flex items-center gap-2 text-[13px]">
              <span className="text-[#0B1F3A]/55">Scope:</span>
              {(["All", "federal", "state", "city", "county", "territory"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setScope(s)}
                  className={[
                    "px-3 py-1.5 rounded-full border capitalize transition-colors",
                    scope === s
                      ? "bg-[#B7232A] text-white border-[#B7232A]"
                      : "bg-white text-[#0B1F3A]/75 border-[#0B1F3A]/15 hover:border-[#0B1F3A]/40",
                  ].join(" ")}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#0B1F3A]/10">
            <table className="w-full text-[14.5px]">
              <thead className="bg-[#0B1F3A] text-white text-[12.5px] uppercase tracking-[0.1em]">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Jurisdiction</th>
                  <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Scope</th>
                  <th className="text-left px-5 py-3 font-semibold">When you may ask</th>
                  <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Effective</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((j, i) => (
                  <tr
                    key={`${j.name}-${i}`}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#FAF7F2]"}
                  >
                    <td className="px-5 py-3.5 text-[#0B1F3A] font-medium">{j.link ? <Link href={j.link} className="underline decoration-[#C8102E]/40 hover:decoration-[#C8102E] transition-colors">{j.name}</Link> : j.name}</td>
                    <td className="px-5 py-3.5 text-[#0B1F3A]/65 capitalize hidden md:table-cell">{j.scope}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={[
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[12.5px] font-medium",
                          STAGE_BADGE[j.stage],
                        ].join(" ")}
                      >
                        <CheckCircle2 className="size-3.5" />
                        {j.stage}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[#0B1F3A]/70 hidden md:table-cell">{j.effective}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center text-[#0B1F3A]/55 text-[14px]">
                      No jurisdictions match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-[12.5px] text-[#0B1F3A]/55 leading-relaxed">
            Stage labels normalize the language each statute uses (e.g., "after a conditional offer of employment", "after the applicant has been deemed otherwise qualified"). Several jurisdictions add notice, document-share, or assessment requirements on top of the timing rule — those are linked from each row in our client dashboard. Effective dates reflect the most recent material amendment we are aware of.
          </p>
        </div>
      </section>

      {/* PLAYBOOK */}
      <section className="bg-[#FAF7F2]">
        <div className="container py-16 lg:py-20">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow"><CheckCircle2 className="size-3.5 text-[#B7232A]" /> Employer playbook</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[32px] lg:text-[42px] leading-[1.05] text-[#0B1F3A] mt-3">
                Six moves that keep your hiring funnel out of court.
              </h2>
            </Reveal>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {PLAYBOOK.map((p) => (
              <Reveal key={p.title} delay={0.05}>
                <div className="rounded-2xl bg-white border border-[#0B1F3A]/10 p-7 h-full hover:shadow-[0_20px_45px_-25px_rgba(11,31,58,0.28)] transition-shadow">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[#B7232A]/10 text-[#B7232A]">
                      <p.icon className="size-5" />
                    </span>
                    <h3 className="font-display text-[19px] text-[#0B1F3A] leading-tight">{p.title}</h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-[1.65] text-[#0B1F3A]/75">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW PRECISEHIRE HELPS */}
      <section className="bg-[#0B1F3A] text-white relative overflow-hidden">
        <img
          src={ASSETS.swooshCoral}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-12 w-[420px] opacity-25 rotate-[12deg]"
        />
        <div className="container py-16 lg:py-20 grid lg:grid-cols-12 gap-10 items-start relative">
          <div className="lg:col-span-5">
            <p className="eyebrow text-[#FAF7F2]/70"><ShieldCheck className="size-3.5 text-[#FAF7F2]" /> How PreciseHire helps</p>
            <h2 className="font-display text-[32px] lg:text-[40px] leading-[1.05] mt-3">
              We do the 50-state homework — your team just hires.
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-white/75 max-w-md">
              Every PreciseHire account ships with the full ban-the-box and fair-chance overlay applied automatically — by the candidate's work location, not yours. No matrices on a wiki, no quarterly emergency from counsel.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/get-a-quote"
                className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Get started <ArrowRight className="size-4" />
              </Link>
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold border border-white/30 text-white hover:bg-white/10"
              >
                <Phone className="size-4" /> {COMPANY.phone}
              </a>
            </div>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {[
              { t: "Stage-gated inquiry", b: "Criminal-history fields stay locked in the candidate portal until the candidate's location and your role's stage permit the question." },
              { t: "Individualized assessment", b: "Decision matrix prompts your hiring manager through nature/gravity, time elapsed, and job-relatedness — and saves the analysis to the file." },
              { t: "State-specific notices", b: "California 2-day cure window, NYC Article 23-A analysis, LA County conviction-history notice — all drafted, served, and tracked." },
              { t: "Continuous monitoring overlay", b: "If you continuously monitor post-hire, the same fair-chance logic applies on every refresh — not just the initial check." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl bg-white/[0.06] border border-white/10 p-6">
                <div className="font-display text-[18px] leading-tight">{c.t}</div>
                <p className="mt-2 text-[14px] text-white/70 leading-relaxed">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="container py-16 lg:py-20 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow"><Scale className="size-3.5 text-[#B7232A]" /> Frequently asked</p>
            <h2 className="font-display text-[32px] lg:text-[40px] leading-[1.05] text-[#0B1F3A] mt-3">
              The questions counsel asks first.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-[#0B1F3A]/70">
              If you do not see your scenario, our compliance team replies to scoped questions within one business day.
            </p>
            <Link
              href="/talk-to-an-expert"
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-[#B7232A] hover:text-[#0B1F3A]"
            >
              Talk to a compliance specialist <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="lg:col-span-8 divide-y divide-[#0B1F3A]/10">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-[#0B1F3A]">
                  <span className="font-display text-[18px] leading-snug">{f.q}</span>
                  <span className="mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-[#0B1F3A]/20 group-open:bg-[#B7232A] group-open:text-white group-open:border-[#B7232A] transition-colors">
                    <ChevronRight className="size-4 group-open:rotate-90 transition-transform" />
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-[1.7] text-[#0B1F3A]/75 pr-10">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="bg-[#FAF7F2] border-t border-[#0B1F3A]/10">
        <div className="container py-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow"><ListChecks className="size-3.5 text-[#B7232A]" /> Keep going</p>
              <h2 className="font-display text-[28px] lg:text-[34px] leading-[1.05] text-[#0B1F3A] mt-3">
                Companion compliance posts.
              </h2>
            </div>
            <Link href="/resources" className="hidden md:inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#B7232A] hover:text-[#0B1F3A]">
              All resources <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RELATED.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group rounded-2xl bg-white border border-[#0B1F3A]/10 p-6 hover:shadow-[0_20px_45px_-25px_rgba(11,31,58,0.28)] hover:border-[#B7232A]/40 transition-all"
              >
                <div className="text-[11.5px] uppercase tracking-[0.16em] text-[#B7232A] font-semibold">{r.eyebrow}</div>
                <div className="mt-2 font-display text-[18px] leading-snug text-[#0B1F3A] group-hover:text-[#B7232A] transition-colors">{r.title}</div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0B1F3A]/70 group-hover:text-[#B7232A]">
                  Read article <ArrowRight className="size-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
