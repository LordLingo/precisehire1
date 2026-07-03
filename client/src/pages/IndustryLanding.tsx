import { Link, useRoute } from "wouter";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  HardHat,
  HeartHandshake,
  Home,
  ShieldCheck,
  Store,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import NotFound from "./NotFound";

const LANDINGS: Record<
  string,
  {
    icon: LucideIcon;
    eyebrow: string;
    title: string;
    metaTitle: string;
    description: string;
    hero: string;
    intro: string;
    bullets: string[];
    packages: string[];
    proof: string[];
  }
> = {
  "retail-hospitality-background-checks": {
    icon: Store,
    eyebrow: "Retail & Hospitality",
    title: "Fast background checks for high-turnover hiring teams.",
    metaTitle: "Retail & Hospitality Background Checks | Precise Hire",
    description:
      "Fast retail and hospitality background checks for restaurants, hotels, stores, franchises, seasonal hiring, and high-turnover teams.",
    hero: "Retail stores, restaurants, hotels, franchises, and seasonal hiring teams need screening that is quick, affordable, and easy for managers to order without slowing down offers.",
    intro:
      "Precise Hire gives retail and hospitality employers a simple screening stack for cash-handling, guest-facing, delivery, warehouse, and management roles. Packages can be kept lean for hourly hiring or expanded for supervisors, drivers, and finance-adjacent positions.",
    bullets: [
      "County criminal, national criminal, and sex-offender registry checks",
      "MVR for delivery, valet, shuttle, and field roles",
      "Drug testing options for safety-sensitive locations",
      "Per-location reporting for franchises and multi-unit operators",
      "Mobile-first candidate consent and status updates",
    ],
    packages: ["Hourly retail", "Restaurant teams", "Hotel staff", "Delivery drivers", "Store managers"],
    proof: ["Same-day eligible packages", "Multi-location billing", "Candidate-friendly flow"],
  },
  "nonprofit-volunteer-background-checks": {
    icon: HeartHandshake,
    eyebrow: "Nonprofit & Volunteer Screening",
    title: "Volunteer background checks for organizations people trust.",
    metaTitle: "Volunteer Background Checks for Nonprofits | Precise Hire",
    description:
      "Volunteer background checks for nonprofits, youth programs, schools, ministries, and community organizations that need safer screening.",
    hero: "Nonprofits need a screening process that protects vulnerable populations without creating a heavy administrative burden for staff and volunteers.",
    intro:
      "Precise Hire helps nonprofits screen volunteers, employees, drivers, mentors, coaches, and program leaders with packages tailored around role risk, budget, and compliance needs.",
    bullets: [
      "Volunteer criminal background check packages",
      "Sex-offender registry and national criminal database searches",
      "MVR checks for volunteer drivers and transportation programs",
      "Identity and address history checks",
      "Simple ordering for recurring volunteer intake",
    ],
    packages: ["Youth programs", "Community nonprofits", "Schools", "Mentoring programs", "Volunteer drivers"],
    proof: ["Volunteer-friendly packages", "Role-based screening", "Simple re-screening"],
  },
  "church-background-checks": {
    icon: ShieldCheck,
    eyebrow: "Church & Ministry Screening",
    title: "Church background checks for volunteers, staff, and ministry leaders.",
    metaTitle: "Church Background Checks for Volunteers | Precise Hire",
    description:
      "Church background checks for volunteers, ministry staff, youth workers, drivers, and leadership teams with simple screening packages.",
    hero: "Churches and ministries need a screening process that is simple enough for volunteers and strong enough for youth, transportation, and leadership roles.",
    intro:
      "Precise Hire supports churches, ministries, faith-based schools, camps, and outreach programs with background checks for volunteers, paid staff, child-facing roles, drivers, and leadership positions.",
    bullets: [
      "Criminal background checks for ministry volunteers",
      "Sex-offender registry screening for child-facing programs",
      "MVR for church vans, buses, and volunteer drivers",
      "Re-screening workflows for recurring volunteers",
      "Easy packages for churches without a large HR department",
    ],
    packages: ["Youth ministry", "Children's workers", "Church staff", "Volunteer drivers", "Camp teams"],
    proof: ["Child-safety focused", "Volunteer-friendly", "Easy annual re-checks"],
  },
  "property-management-background-checks": {
    icon: Home,
    eyebrow: "Property Management",
    title: "Background checks for property management hiring.",
    metaTitle: "Property Management Background Checks | Precise Hire",
    description:
      "Employment background checks for property management firms hiring leasing agents, maintenance staff, onsite managers, and contractors.",
    hero: "Property managers hire people who enter homes, handle keys, work around residents, drive between properties, and represent the ownership group onsite.",
    intro:
      "Precise Hire helps property management firms screen leasing agents, maintenance technicians, regional managers, contractors, onsite staff, and vendor-facing positions with practical role-based packages.",
    bullets: [
      "Criminal searches for resident-facing and key-access roles",
      "MVR checks for field, maintenance, and regional positions",
      "Employment verification for management and accounting roles",
      "Drug testing options for maintenance and safety-sensitive teams",
      "Location and property-level billing visibility",
    ],
    packages: ["Leasing agents", "Maintenance techs", "Regional managers", "Contractors", "Onsite staff"],
    proof: ["Key-access roles", "Field-team screening", "Multi-property reporting"],
  },
  "construction-background-checks": {
    icon: HardHat,
    eyebrow: "Construction & Contractors",
    title: "Background checks, MVRs, and drug testing for construction teams.",
    metaTitle: "Construction Background Checks | Precise Hire",
    description:
      "Background checks, MVRs, and drug testing for construction companies, contractors, field crews, and safety-sensitive roles.",
    hero: "Construction employers need screening that supports jobsite safety, vehicle use, client-site access, and fast onboarding for project-based crews.",
    intro:
      "Precise Hire gives contractors and construction companies flexible packages for field crews, drivers, foremen, equipment operators, subcontractors, and office roles.",
    bullets: [
      "County and national criminal searches for jobsite access",
      "MVR checks for drivers and employees operating company vehicles",
      "Drug testing options for safety-sensitive environments",
      "Employment verification for supervisors and management roles",
      "Project, branch, or cost-center reporting",
    ],
    packages: ["Field crews", "Equipment operators", "Foremen", "Drivers", "Subcontractors"],
    proof: ["Safety-sensitive packages", "Fast onboarding", "Branch-level reporting"],
  },
};

export default function IndustryLanding() {
  const [, params] = useRoute("/industries/:slug");
  const slug = params?.slug ?? "";
  const page = LANDINGS[slug];

  if (!page) return <NotFound />;

  const Icon = page.icon;
  const canonical = `https://precisehire.com/industries/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.metaTitle.replace(" | Precise Hire", ""),
    provider: {
      "@type": "Organization",
      name: "Precise Hire",
      url: "https://precisehire.com/",
    },
    areaServed: "United States",
    serviceType: page.eyebrow,
    description: page.description,
    url: canonical,
  };

  return (
    <>
      <SEO
        title={page.metaTitle}
        description={page.description}
        canonical={canonical}
        jsonLd={jsonLd}
      />

      <section className="bg-[#FAF7F2] border-b border-[#0B1F3A]/8">
        <div className="container py-16 lg:py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">
                <Icon className="size-3.5 text-[#B7232A]" />
                {page.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-5 text-[#0B1F3A]">{page.title}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-8 text-[#0B1F3A]/75 max-w-2xl">
                {page.hero}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/get-a-quote" className="btn-coral inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold">
                  Build a package <ArrowRight className="size-4" />
                </Link>
                <Link href="/services" className="btn-ghost-navy inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold">
                  Explore services
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-[2rem] border border-[#0B1F3A]/10 bg-white p-7 shadow-sm">
              <span className="grid size-14 place-items-center rounded-2xl bg-[#B7232A]/10 text-[#B7232A]">
                <ClipboardCheck className="size-7" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold text-[#0B1F3A]">Common packages</h2>
              <div className="mt-5 grid gap-3">
                {page.packages.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[#0B1F3A]/75">
                    <CheckCircle2 className="size-4 shrink-0 text-[#B7232A]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="container py-14 lg:py-20 grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">
              <Building2 className="size-3.5 text-[#B7232A]" />
              Role-based screening
            </span>
            <h2 className="display-md mt-4 text-[#0B1F3A]">A package matched to the role, not a one-size-fits-all check.</h2>
            <p className="mt-5 text-[16px] leading-7 text-[#0B1F3A]/70">{page.intro}</p>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {page.bullets.map((item) => (
                <div key={item} className="rounded-2xl border border-[#0B1F3A]/10 bg-[#FAF7F2] p-5 text-sm leading-6 text-[#0B1F3A]/75">
                  <CheckCircle2 className="mb-3 size-5 text-[#B7232A]" />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0B1F3A] text-white">
        <div className="container py-12 lg:py-16">
          <div className="grid gap-5 md:grid-cols-3">
            {page.proof.map((item) => (
              <Reveal key={item}>
                <div className="rounded-[1.5rem] bg-white/8 p-6 text-center ring-1 ring-white/10">
                  <ShieldCheck className="mx-auto size-7 text-[#F2B8B5]" />
                  <p className="mt-4 font-semibold">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 lg:py-20 text-center">
        <Reveal>
          <h2 className="display-md text-[#0B1F3A]">Need a background check package for this industry?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#0B1F3A]/70">
            We can recommend the right mix of criminal records, verifications, MVR, drug testing, and compliance workflow based on your roles and hiring volume.
          </p>
          <Link href="/get-a-quote" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#B7232A] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#9A1A20]">
            Get a quote <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
