import { Link, useRoute } from "wouter";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  HeartHandshake,
  Home,
  ShieldCheck,
  Store,
  Users,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import NotFound from "./NotFound";

const INDUSTRY_PAGES: Record<string, {
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  headline: string;
  intro: string;
  icon: LucideIcon;
  checks: string[];
  painPoints: string[];
  packages: string[];
  faqs: { q: string; a: string }[];
}> = {
  "retail-hospitality-background-checks": {
    eyebrow: "Retail & hospitality",
    title: "Background Checks for Retail & Hospitality Employers",
    metaTitle: "Retail & Hospitality Background Checks | Precise Hire",
    description:
      "Fast, affordable retail and hospitality background checks for high-turnover hiring teams that need compliant reports without slowing down offers.",
    headline: "Keep high-volume hiring moving without cutting compliance corners.",
    intro:
      "Retail stores, restaurants, hotels, and hospitality groups need background checks that are fast enough for frontline hiring and accurate enough for employer risk. Precise Hire helps teams screen cash handlers, delivery staff, hotel employees, supervisors, and seasonal workers with packages that can scale by location, role, and risk level.",
    icon: Store,
    checks: [
      "County criminal records with source verification",
      "National criminal database and sex-offender registry",
      "SSN trace and address history",
      "Employment verification for management roles",
      "Drug testing or MVR add-ons when the role requires it",
    ],
    painPoints: [
      "High turnover and seasonal hiring spikes",
      "Multiple store or franchise locations",
      "Candidate drop-off when screening takes too long",
      "Different screening packages for hourly, supervisor, and driver roles",
    ],
    packages: ["Essential criminal background package", "MVR for delivery or driving roles", "Drug testing for safety-sensitive positions"],
    faqs: [
      {
        q: "How fast are retail background checks?",
        a: "Many retail-grade packages return the same day when records are electronically available. County courthouse delays, verifications, and drug testing can add time.",
      },
      {
        q: "Can each store have its own billing or package?",
        a: "Yes. Multi-location employers can separate packages, billing, users, and reporting by store, region, brand, or franchise group.",
      },
    ],
  },
  "nonprofit-volunteer-background-checks": {
    eyebrow: "Nonprofit & volunteer screening",
    title: "Volunteer Background Checks for Nonprofits",
    metaTitle: "Volunteer Background Checks for Nonprofits | Precise Hire",
    description:
      "Volunteer background checks for nonprofits, youth programs, schools, ministries, and community organizations that need safe, affordable screening.",
    headline: "Protect the people you serve with practical volunteer screening.",
    intro:
      "Nonprofits and community organizations often need to screen volunteers, employees, board members, and contractors without enterprise-level complexity. Precise Hire helps organizations create sensible screening packages for youth work, vulnerable populations, fundraising, finance access, transportation, and overnight events.",
    icon: HeartHandshake,
    checks: [
      "Criminal background checks for volunteers and staff",
      "National sex-offender registry searches",
      "County criminal records where the volunteer has lived",
      "MVR checks for volunteers who drive",
      "Employment or education verification for key roles",
    ],
    painPoints: [
      "Limited budgets and seasonal volunteer volume",
      "Youth safety and vulnerable-population risk",
      "Different roles needing different levels of screening",
      "Board and finance roles requiring deeper review",
    ],
    packages: ["Volunteer safety package", "Youth program package", "Driver and transportation add-ons"],
    faqs: [
      {
        q: "Do all volunteers need the same background check?",
        a: "Usually no. A volunteer who works with children, drives participants, handles money, or stays overnight may need a different package than a one-time event volunteer.",
      },
      {
        q: "Can volunteers pay for their own check?",
        a: "Yes. Candidate-pay or volunteer-pay workflows can reduce administrative burden and make screening easier for smaller organizations.",
      },
    ],
  },
  "church-background-checks": {
    eyebrow: "Churches & ministries",
    title: "Church Background Checks for Volunteers and Staff",
    metaTitle: "Church Background Checks for Volunteers | Precise Hire",
    description:
      "Church background checks for volunteers, ministry staff, youth workers, drivers, and leadership teams with simple packages and fast turnaround.",
    headline: "Screen church volunteers and ministry workers with confidence.",
    intro:
      "Churches need background checks that are simple for volunteers, respectful of the ministry environment, and strong enough for child safety, youth programs, counseling, transportation, and leadership roles. Precise Hire helps churches and ministries build practical screening packages without overwhelming staff.",
    icon: Users,
    checks: [
      "County criminal and national criminal database searches",
      "National sex-offender registry searches",
      "Identity and address history review",
      "MVR checks for van, bus, or event drivers",
      "Periodic rescreening for active volunteers",
    ],
    painPoints: [
      "Youth ministry and child-safety concerns",
      "Volunteer onboarding without heavy paperwork",
      "Different screening levels for helpers, teachers, drivers, and staff",
      "Keeping active volunteer records current over time",
    ],
    packages: ["Youth volunteer screening", "Church staff package", "Driver screening add-on"],
    faqs: [
      {
        q: "What should churches screen for?",
        a: "Most churches start with identity, county criminal, national criminal, and sex-offender registry searches, then add MVR checks for anyone driving as part of ministry activities.",
      },
      {
        q: "Can the process be mobile-friendly for volunteers?",
        a: "Yes. Volunteers can complete consent and identity information from their phone, which helps churches reduce paperwork and follow-up.",
      },
    ],
  },
  "property-management-background-checks": {
    eyebrow: "Property management",
    title: "Background Checks for Property Management Companies",
    metaTitle: "Property Management Background Checks | Precise Hire",
    description:
      "Employment background checks for property management firms hiring leasing agents, maintenance staff, onsite managers, and contractors.",
    headline: "Screen the people who access homes, keys, money, and resident data.",
    intro:
      "Property management companies hire people who may enter occupied units, access keys, handle deposits, work around residents, and represent the property on site. Precise Hire helps screen leasing teams, maintenance workers, onsite managers, contractors, and regional staff with role-based packages.",
    icon: Home,
    checks: [
      "County criminal and national criminal searches",
      "Employment verification for managers and office staff",
      "MVR checks for maintenance or field roles",
      "Drug testing for safety-sensitive positions",
      "Federal criminal and civil record add-ons for higher-risk roles",
    ],
    painPoints: [
      "Employees and vendors entering resident homes",
      "Access to keys, lockboxes, and resident information",
      "Multi-property hiring across different states",
      "Contractor and maintenance screening consistency",
    ],
    packages: ["Leasing office package", "Maintenance and field package", "Manager and finance-access package"],
    faqs: [
      {
        q: "Should contractors be screened too?",
        a: "Many property managers screen contractors or vendors who have recurring access to occupied units, keys, or resident areas. The right package depends on role and access level.",
      },
      {
        q: "Can packages vary by property?",
        a: "Yes. Packages can vary by property type, state, client, role, or whether the person has resident access, driving duties, or financial responsibilities.",
      },
    ],
  },
  "construction-background-checks": {
    eyebrow: "Construction & skilled trades",
    title: "Construction Background Checks for Contractors",
    metaTitle: "Construction Background Checks | Precise Hire",
    description:
      "Background checks, MVRs, and drug testing for construction companies, contractors, field crews, skilled trades, and safety-sensitive roles.",
    headline: "Keep job sites moving while screening safety-sensitive crews.",
    intro:
      "Construction and skilled-trade employers need fast screening for field crews, supervisors, drivers, equipment operators, and subcontractors. Precise Hire supports role-based packages that combine criminal records, drug testing, MVRs, and verification add-ons without slowing down urgent project staffing.",
    icon: Wrench,
    checks: [
      "County criminal and national criminal searches",
      "MVR checks for drivers and field service roles",
      "Drug and alcohol testing programs",
      "Employment verification for supervisors and key hires",
      "Federal criminal add-ons for regulated or secure sites",
    ],
    painPoints: [
      "Fast project ramp-up and short hiring windows",
      "Safety-sensitive jobs and jobsite access requirements",
      "Drivers, equipment operators, and field crews",
      "Subcontractor screening across multiple locations",
    ],
    packages: ["Field crew package", "Driver and MVR package", "Drug testing and safety-sensitive package"],
    faqs: [
      {
        q: "Do construction companies need MVR checks?",
        a: "If employees drive company vehicles, move equipment, or operate in field service roles, MVR checks are often a practical risk-control step.",
      },
      {
        q: "Can drug testing be included?",
        a: "Yes. Drug testing can be added for pre-employment, post-incident, reasonable suspicion, random, or safety-sensitive workflows depending on your policy.",
      },
    ],
  },
};

export default function AdditionalIndustryPage() {
  const [, params] = useRoute("/industries/:slug");
  const slug = params?.slug ?? "";
  const page = INDUSTRY_PAGES[slug];

  if (!page) return <NotFound />;

  const url = `https://precisehire.com/industries/${slug}`;
  const Icon = page.icon;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      description: page.description,
      provider: {
        "@type": "Organization",
        name: "Precise Hire",
        url: "https://precisehire.com/",
      },
      areaServed: "United States",
      serviceType: page.title,
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  return (
    <>
      <SEO
        title={page.metaTitle}
        description={page.description}
        canonical={url}
        jsonLd={jsonLd}
      />

      <section className="ph-page-hero bg-[#FAF7F2] border-b border-[#0B1F3A]/8">
        <div className="container py-16 lg:py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">
                <Icon className="size-3.5 text-[#B7232A]" />
                Industries &middot; {page.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-5 text-[#0B1F3A]">{page.headline}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.7] text-[#0B1F3A]/75 max-w-2xl">
                {page.intro}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/get-a-quote"
                  className="inline-flex items-center gap-2 rounded-full bg-[#B7232A] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#9A1A20]"
                >
                  Get a quote
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/compliance/checklist"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0B1F3A]/20 px-6 py-3 text-[15px] font-semibold text-[#0B1F3A] hover:bg-white"
                >
                  Compliance checklist
                  <ClipboardCheck className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="rounded-[2rem] border border-[#0B1F3A]/10 bg-white p-7 shadow-sm">
              <span className="grid size-16 place-items-center rounded-2xl bg-[#B7232A]/10 text-[#B7232A]">
                <ShieldCheck className="size-8" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold text-[#0B1F3A]">Recommended screening stack</h2>
              <div className="mt-5 grid gap-3">
                {page.checks.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-[#0B1F3A]/75">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#B7232A]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="container py-14 lg:py-20 grid lg:grid-cols-12 gap-8 items-start">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">
              <Building2 className="size-3.5 text-[#B7232A]" />
              Operational risks
            </span>
            <h2 className="display-md mt-4 text-[#0B1F3A]">Built around the way this industry actually hires.</h2>
            <p className="mt-5 text-[16px] leading-7 text-[#0B1F3A]/70">
              Each industry has different screening pressure. We help match the check
              package to the risk level, location, role, and speed requirement.
            </p>
          </Reveal>

          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            {page.painPoints.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <div className="h-full rounded-2xl border border-[#0B1F3A]/10 bg-[#FAF7F2] p-5">
                  <p className="text-sm font-semibold leading-6 text-[#0B1F3A]">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF7F2] border-y border-[#0B1F3A]/8">
        <div className="container py-14 lg:py-20">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow justify-center">
                <Users className="size-3.5 text-[#B7232A]" />
                Common packages
              </span>
              <h2 className="display-md mt-4 text-[#0B1F3A]">Start with the package that fits the role.</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {page.packages.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <div className="h-full rounded-[1.75rem] border border-[#0B1F3A]/10 bg-white p-7 text-center shadow-sm">
                  <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#B7232A]/10 text-[#B7232A]">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-[#0B1F3A]">{item}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#0B1F3A]/70">
                    Package details can be customized by role, location, client, or hiring workflow.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container py-14 lg:py-20 max-w-4xl">
          <Reveal>
            <h2 className="display-md text-[#0B1F3A]">Frequently asked questions</h2>
          </Reveal>
          <div className="mt-8 grid gap-5">
            {page.faqs.map((faq) => (
              <Reveal key={faq.q}>
                <div className="rounded-2xl border border-[#0B1F3A]/10 bg-[#FAF7F2] p-6">
                  <h3 className="text-lg font-semibold text-[#0B1F3A]">{faq.q}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#0B1F3A]/72">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container pb-20">
        <div className="rounded-[2rem] bg-[#0B1F3A] px-8 py-12 text-center text-white lg:px-14">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Need a package for {page.eyebrow.toLowerCase()}?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/72">
            Tell us the roles, locations, and volume. We will recommend a screening package that balances speed, compliance, and cost.
          </p>
          <Link
            href="/get-a-quote"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0B1F3A] hover:bg-[#FAF7F2]"
          >
            Build my package
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
