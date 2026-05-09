/*
 * PreciseHire — site content (migrated and rewritten from precisehire.com)
 * Style commitment: Trusted Modernism — display=Fraunces serif, body=Inter,
 * navy/coral/sky/cream palette, asymmetric layouts, subtle motion.
 *
 * All copy here is rewritten for SEO (unique titles ≤60 chars, meta descriptions
 * 140-158 chars, intent-aligned H1s) per the audit recommendations.
 */

export const ASSETS = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/hero-professional-KrXwCbeBT5hTvsMwqegzDw.webp",
  team: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/about-team-4vFYYmnbKTDnGef5EPiZW5.webp",
  handshake: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/cta-handshake-GwWopeADZ8kzKCsYCydWCb.webp",
  swooshCoral: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/swoosh-red-T8JxWZgdAP94rTzeUjKULQ.webp",
  swooshSky: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/swoosh-gray-LrNEWs7iuUZsWG6AS3H5Xs.webp",
  dashboard: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/dashboard-mockup-K5y8zhKUo4bNHg8aAeUWnV.webp",
  serviceCriminal: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/service-criminal-RrCKBHUw4xaavBpRG9Hb5Q.webp",
  serviceMVR: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/service-mvr-ZrMAmy8u8r6NrpCq3bedLi.webp",
  serviceDrug: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/service-drug-urine-nFW4D4ZQjMtm8CDKWkrkQ8.webp",
  serviceEducation: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/service-education-mqKcqVhLm8eeMBTQ6kdZML.webp",
  serviceEmployment: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/service-employment-J3EG3dWFr9Zq9kp2DFnjhw.webp",
  serviceInternational: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/service-international-XpB2FPcKkD4B5AN8CwMHNS.webp",
};

export const COMPANY = {
  name: "Precise Hire",
  legalName: "Precise Hire",
  tagline: "Background checks employers actually trust.",
  established: 2003,
  yearsInBusiness: new Date().getFullYear() - 2003,
  phone: "(866) 773-5486",
  phoneRaw: "+18667735486",
  email: "Info@precisehire.com",
  address: {
    street: "—",
    city: "—",
    region: "—",
    country: "USA",
  },
};

export const STATS = [
  { value: 22, suffix: "+", label: "Years serving employers" },
  { value: 12, suffix: "M", label: "Background checks delivered" },
  { value: 99.6, suffix: "%", label: "FCRA-compliant accuracy" },
  { value: 4, prefix: "<", suffix: " hr", label: "Median turnaround" },
];

export type Service = {
  slug: string;
  title: string;        // ≤60 chars, unique
  metaTitle: string;    // ≤60 chars
  metaDescription: string; // 140–158 chars
  hero: string;         // image
  eyebrow: string;
  headline: string;
  intro: string;
  bullets: string[];
  specs: { label: string; value: string }[];
  whoFor: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "criminal-background-checks",
    title: "Criminal Background Checks",
    metaTitle: "Criminal Background Checks for Employers | Precise Hire",
    metaDescription:
      "Fast, FCRA-compliant criminal background checks across county, state, federal, and national databases. Most reports returned in under 4 hours.",
    hero: ASSETS.serviceCriminal,
    eyebrow: "Criminal records",
    headline: "Court-verified criminal records, returned in hours — not days.",
    intro:
      "We search county, state, federal, and national criminal databases, then verify every potential hit at the source courthouse. The result is an accurate, defensible report that helps you make confident hiring decisions while staying squarely inside FCRA, EEOC, and state ban-the-box rules.",
    bullets: [
      "County criminal records (live courthouse research)",
      "Statewide criminal repository searches",
      "Federal district criminal records",
      "National criminal database with sex-offender registry",
      "Continuous post-hire monitoring (optional)",
    ],
    specs: [
      { label: "Median turnaround", value: "Under 4 hours" },
      { label: "Coverage", value: "All 3,200+ U.S. counties" },
      { label: "Compliance", value: "FCRA, EEOC, state-level" },
    ],
    whoFor: ["Healthcare", "Logistics & transportation", "Staffing agencies", "Retail & hospitality"],
  },
  {
    slug: "employment-verification",
    title: "Employment Verification",
    metaTitle: "Employment Verification Services | Precise Hire",
    metaDescription:
      "Verify past employers, job titles, dates, and reasons for leaving directly from the source. Catch resume embellishment before it becomes a hiring mistake.",
    hero: ASSETS.serviceEmployment,
    eyebrow: "Past employment",
    headline: "Confirm every job, title, and date — before the offer goes out.",
    intro:
      "We contact each prior employer directly to verify dates of employment, position held, and (where permitted) reason for separation. Our team handles the follow-ups so your recruiters don't have to chase HR departments across time zones.",
    bullets: [
      "Up to 7 years of past employment verified",
      "Position, dates, and reason for leaving",
      "Direct outreach by trained verification specialists",
      "Self-employment and gig-work verifications",
      "International employer outreach available",
    ],
    specs: [
      { label: "Median turnaround", value: "1–3 business days" },
      { label: "Lookback", value: "Up to 7 years" },
      { label: "Coverage", value: "U.S. + 200 countries" },
    ],
    whoFor: ["Professional services", "Finance", "Technology", "Healthcare"],
  },
  {
    slug: "driving-record-checks-mvr",
    title: "Driving Record Checks (MVR)",
    metaTitle: "Driving Record Checks (MVR) for Employers | Precise Hire",
    metaDescription:
      "DOT-compliant Motor Vehicle Records pulled from all 50 states. Identify violations, license status, and CDL history before you put a driver on the road.",
    hero: ASSETS.serviceMVR,
    eyebrow: "Motor vehicle records",
    headline: "Know who's behind the wheel — every state, every license class.",
    intro:
      "Our 50-state MVR program returns license status, class, restrictions, and a full violation history pulled directly from each state's DMV. We also offer continuous license monitoring so you're alerted the moment a driver's status changes.",
    bullets: [
      "All 50 states + D.C. coverage",
      "CDL & non-CDL records",
      "DOT-compliant for FMCSA-regulated drivers",
      "CDLIS clearinghouse reports",
      "Continuous license monitoring (optional)",
    ],
    specs: [
      { label: "Median turnaround", value: "Same day (most states)" },
      { label: "Coverage", value: "50 states + D.C." },
      { label: "Compliance", value: "DOT / FMCSA / FCRA" },
    ],
    whoFor: ["Trucking & logistics", "Delivery & last-mile", "Field services", "Rideshare partners"],
  },
  {
    slug: "drug-testing",
    title: "Drug & Alcohol Testing",
    metaTitle: "Drug & Alcohol Testing for Employers | Precise Hire",
    metaDescription:
      "Pre-employment, random, and post-incident drug screening at 20,000+ collection sites nationwide. SAMHSA-certified labs and DOT-compliant programs.",
    hero: ASSETS.serviceDrug,
    eyebrow: "Drug & alcohol",
    headline: "A nationwide collection network — managed end-to-end.",
    intro:
      "From the moment you order a test, we coordinate the collection, lab analysis, and Medical Review Officer (MRO) review. Results land in your dashboard in under 48 hours for most negative tests, with full chain-of-custody documentation.",
    bullets: [
      "5-, 9-, and 10-panel urine, hair, and oral-fluid testing",
      "20,000+ SAMHSA-certified collection sites",
      "DOT and non-DOT random consortium programs",
      "MRO review on every non-negative",
      "Post-incident and reasonable-suspicion testing",
    ],
    specs: [
      { label: "Median turnaround", value: "24–48 hours (negative)" },
      { label: "Coverage", value: "20,000+ U.S. sites" },
      { label: "Compliance", value: "DOT 49 CFR Part 40" },
    ],
    whoFor: ["Construction", "Manufacturing", "Healthcare", "Transportation"],
  },
  {
    slug: "education-verification",
    title: "Education Verification",
    metaTitle: "Education Verification Services | Precise Hire",
    metaDescription:
      "Confirm degrees, attendance dates, and credentials directly with high schools, colleges, and trade institutions worldwide. Catch credential fraud early.",
    hero: ASSETS.serviceEducation,
    eyebrow: "Schools & credentials",
    headline: "Confirm the diploma — and the institution that issued it.",
    intro:
      "Resume credential fraud is one of the most common (and most defensible) reasons employers reject a candidate. We verify high school diplomas, GEDs, undergraduate and graduate degrees, and trade certifications directly with the issuing institution or via the National Student Clearinghouse.",
    bullets: [
      "High school, college, and graduate verifications",
      "International credential verification",
      "Trade & professional certifications",
      "GED and equivalency confirmations",
      "Diploma-mill flagging",
    ],
    specs: [
      { label: "Median turnaround", value: "1–3 business days" },
      { label: "Coverage", value: "U.S. + 200 countries" },
      { label: "Source", value: "Registrar / NSC / direct" },
    ],
    whoFor: ["Healthcare", "Finance", "Education", "Technology"],
  },
  {
    slug: "international-background-checks",
    title: "International Background Checks",
    metaTitle: "International Background Checks | Precise Hire",
    metaDescription:
      "Cross-border employment, education, criminal, and credential verifications in 200+ countries. GDPR-aware processes and in-country specialists.",
    hero: ASSETS.serviceInternational,
    eyebrow: "Global hires",
    headline: "Hiring across borders? We've already done the paperwork.",
    intro:
      "From São Paulo to Singapore, our in-country research partners deliver criminal records, employment, education, and credential verifications that meet local data-protection laws. We handle translations, consent forms, and apostille requirements so you don't have to.",
    bullets: [
      "Criminal records in 200+ countries",
      "International employment & education verification",
      "Watchlist & sanctions screening (OFAC, UN, EU, HMT)",
      "GDPR / CCPA / LGPD-aware consent flows",
      "Local-language consent and translations",
    ],
    specs: [
      { label: "Median turnaround", value: "3–10 business days" },
      { label: "Coverage", value: "200+ countries" },
      { label: "Compliance", value: "GDPR, CCPA, LGPD, FCRA" },
    ],
    whoFor: ["Global enterprises", "Tech & SaaS", "Manufacturing", "Professional services"],
  },
];

export type Industry = {
  slug: string;
  title: string;
  blurb: string;
  recommended: string[]; // service slugs
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "healthcare",
    title: "Healthcare",
    blurb:
      "Sanctions monitoring, license verification, and 7-panel drug testing for hospitals, clinics, and home-health agencies.",
    recommended: ["criminal-background-checks", "drug-testing", "education-verification"],
  },
  {
    slug: "transportation",
    title: "Transportation & Logistics",
    blurb:
      "DOT-compliant MVRs, CDLIS, drug-and-alcohol consortium, and continuous license monitoring for fleets of any size.",
    recommended: ["driving-record-checks-mvr", "drug-testing", "criminal-background-checks"],
  },
  {
    slug: "staffing",
    title: "Staffing Agencies",
    blurb:
      "High-volume packages, candidate self-checkout, and ATS integrations built for agencies that place hundreds per week.",
    recommended: ["criminal-background-checks", "employment-verification", "drug-testing"],
  },
  {
    slug: "finance",
    title: "Finance & Professional Services",
    blurb:
      "Credit, education, and global sanctions screening for FINRA-regulated and fiduciary roles.",
    recommended: ["employment-verification", "education-verification", "international-background-checks"],
  },
  {
    slug: "retail",
    title: "Retail & Hospitality",
    blurb:
      "Fast, low-cost packages built for high-turnover environments — most reports back the same day.",
    recommended: ["criminal-background-checks", "employment-verification"],
  },
  {
    slug: "nonprofit",
    title: "Nonprofit & Faith-based",
    blurb:
      "Volunteer-friendly pricing, sex-offender screening, and child-safety packages used by churches, schools, and youth orgs.",
    recommended: ["criminal-background-checks", "education-verification"],
  },
];

export type Pkg = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  includes: string[];
  highlight?: boolean;
};

export const PACKAGES: Pkg[] = [
  {
    name: "Essential",
    price: "$24.95",
    cadence: "per check",
    description:
      "The compliance-grade starting point. SSN trace, sex-offender registry, and a national + county criminal search.",
    includes: [
      "SSN trace & address history",
      "National criminal database + SOR",
      "1 county criminal search",
      "Global watchlist (OFAC)",
    ],
  },
  {
    name: "Professional",
    price: "$44.95",
    cadence: "per check",
    description:
      "The package most employers actually need. Adds employment & education verification on top of Essential.",
    includes: [
      "Everything in Essential",
      "1 employment verification",
      "1 education verification",
      "7-year address history search",
      "Federal criminal search",
    ],
    highlight: true,
  },
  {
    name: "Comprehensive",
    price: "$74.95",
    cadence: "per check",
    description:
      "For regulated and high-trust roles. Multi-county, multi-verification, and DOT-ready add-ons.",
    includes: [
      "Everything in Professional",
      "Up to 3 county criminal searches",
      "Up to 3 employment verifications",
      "MVR or 5-panel drug screen",
      "Civil records search",
    ],
  },
];

export type Faq = { q: string; a: string };

export const FAQ_ITEMS: Faq[] = [
  {
    q: "How long does a typical background check take?",
    a: "Most Precise Hire reports are returned in under 4 hours. Verifications that involve calling past employers or schools can take 1–3 business days, and international searches typically take 3–10 business days depending on the country.",
  },
  {
    q: "Are Precise Hire reports FCRA-compliant?",
    a: "Yes. Every report is delivered with FCRA-compliant disclosure language, adverse-action workflow tools, and dispute handling. Our QA team reviews flagged records before they ever reach your dashboard.",
  },
  {
    q: "Do you integrate with our ATS?",
    a: "We integrate with most major applicant-tracking systems including Greenhouse, Workday, Lever, iCIMS, and Bullhorn. We also offer a documented REST API for custom workflows.",
  },
  {
    q: "Can candidates pay for and start the check themselves?",
    a: "Yes. We support candidate-pay flows with branded invitations, mobile-first consent, and self-service status pages so candidates always know where their report stands.",
  },
  {
    q: "What does a check cost?",
    a: "Packages start at $24.95 and most employers run on the Professional package at $44.95. We also offer custom volume pricing for high-volume staffing and enterprise customers.",
  },
  {
    q: "How do you keep candidate data secure?",
    a: "Reports and PII are encrypted in transit (TLS 1.3) and at rest (AES-256). Access is role-based and SOC 2 Type II audited. We retain data only as long as legally required.",
  },
];

export const NAV_PRIMARY = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Compliance", href: "/compliance" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export const FOOTER_NAV = [
  {
    title: "Services",
    links: SERVICES.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  },
  {
    title: "Industries",
    links: INDUSTRIES.map((i) => ({ label: i.title, href: `/industries#${i.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Compliance", href: "/compliance" },
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];
