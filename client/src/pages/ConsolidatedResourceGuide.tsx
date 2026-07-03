import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  FlaskConical,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import NotFound from "./NotFound";

const GUIDE_DATA: Record<
  string,
  {
    icon: LucideIcon;
    eyebrow: string;
    title: string;
    metaTitle: string;
    description: string;
    datePublished: string;
    readingMin: number;
    intro: string;
    sections: { heading: string; body: string; bullets: string[] }[];
    links: { label: string; href: string; note: string }[];
    faqs: { q: string; a: string }[];
  }
> = {
  "employer-background-check-program-guide": {
    icon: BookOpenCheck,
    eyebrow: "Employer background check program guide",
    title: "How to Build an Employer Background Check Program That Is Fast, Compliant, and Scalable",
    metaTitle: "Employer Background Check Program Guide | Precise Hire",
    description:
      "A practical employer guide to building a compliant background check program: package design, FCRA workflow, turnaround speed, candidate experience, and internal controls.",
    datePublished: "2026-07-03",
    readingMin: 9,
    intro:
      "Most generic background-check articles tell employers to run a check before hiring. That is not a program. A real employer screening program defines which checks belong to which roles, when authorization is collected, how reports are reviewed, how adverse action is documented, and how fast the process can move without cutting legal corners.",
    sections: [
      {
        heading: "Start with role risk, not a one-size-fits-all package",
        body:
          "The biggest mistake employers make is ordering the same background check for every job. A warehouse role, a delivery driver, a nurse, an accounting manager, and a volunteer working with children do not create the same risk. A better program uses package tiers tied to job duties.",
        bullets: [
          "Use a light package for low-risk hourly roles where speed and cost matter most.",
          "Add MVR checks when the candidate drives for work or may operate company vehicles.",
          "Add license, sanctions, or credential verification for healthcare and regulated roles.",
          "Add employment or education verification when credentials materially affect the hiring decision.",
        ],
      },
      {
        heading: "Build the FCRA workflow before the first order",
        body:
          "A compliant program starts before the report is ordered. Employers need a clean disclosure, written authorization, permissible-purpose certification, state notices where required, and a controlled adverse-action process if the report affects the hiring decision.",
        bullets: [
          "Keep the disclosure standalone and free from extra liability language.",
          "Collect written authorization before ordering the report.",
          "Send pre-adverse notice, the report, and the Summary of Rights before a final decision.",
          "Document any individualized assessment where fair-chance rules apply.",
        ],
      },
      {
        heading: "Design for speed without selling an impossible turnaround",
        body:
          "Fast screening comes from parallel processing, clean candidate intake, mobile authorization, source verification, and fast exception handling. It does not come from skipping county searches or reporting unverified database hits.",
        bullets: [
          "Launch parallel searches immediately after authorization instead of sequencing them manually.",
          "Use mobile-friendly candidate intake to reduce delays at the front of the process.",
          "Track exceptions separately from normal reports so missing data does not sit in a queue.",
          "Tell hiring managers which components can return quickly and which cannot be rushed.",
        ],
      },
      {
        heading: "Create operating controls hiring managers can follow",
        body:
          "The best screening program is one managers can execute without guessing. Package selection, candidate communication, escalation, adverse-action timing, and final decision authority should be documented in one simple playbook.",
        bullets: [
          "Limit who can order non-standard packages.",
          "Use consistent decision matrices for role-related criminal records.",
          "Train managers not to finalize adverse decisions before the waiting period ends.",
          "Review package usage quarterly to remove unnecessary cost and add missing controls.",
        ],
      },
    ],
    links: [
      { label: "Background Check Services", href: "/services", note: "Compare criminal, MVR, drug testing, and verification options." },
      { label: "FCRA Compliance Hub", href: "/compliance", note: "Review the compliance workflow behind every employer report." },
      { label: "Get a Quote", href: "/get-a-quote", note: "Ask us to recommend packages by role and hiring volume." },
    ],
    faqs: [
      {
        q: "What should an employer background check include?",
        a: "It depends on the role. Most employer programs start with identity, address history, county criminal, national criminal database with source verification, and sex-offender registry checks. MVR, drug testing, employment verification, education verification, sanctions, and license checks should be added when the role justifies them.",
      },
      {
        q: "Can one package work for every employee?",
        a: "Usually no. A role-based package structure is safer and more cost-effective because it matches the screening depth to the actual job duties and risk profile.",
      },
    ],
  },
  "criminal-background-check-policy-guide": {
    icon: FileSearch,
    eyebrow: "Criminal records policy guide",
    title: "How Employers Should Use Criminal Background Checks Without Creating Compliance Risk",
    metaTitle: "Employer Criminal Background Check Policy Guide",
    description:
      "A practical employer guide to criminal background check policy, source verification, fair-chance review, individualized assessment, and adverse action.",
    datePublished: "2026-07-03",
    readingMin: 8,
    intro:
      "Criminal background checks are useful only when the employer knows what the report means, which records can legally be considered, and how the decision connects to the job. A policy that says 'no criminal history' is both too broad and too risky.",
    sections: [
      {
        heading: "Separate search results from reportable records",
        body:
          "A database hit is not the same thing as a final report. Employers should work with a CRA that verifies possible hits at the court or source level before reporting them for employment use.",
        bullets: [
          "Use county-level verification for potentially reportable criminal records.",
          "Do not treat name-only database matches as final employment decisions.",
          "Confirm identifiers such as date of birth and address history before relying on a record.",
          "Understand which jurisdictions restrict the age or type of reportable records.",
        ],
      },
      {
        heading: "Tie review standards to the actual job",
        body:
          "A defensible criminal-record policy considers the nature of the offense, how much time has passed, and how the conduct relates to the specific job duties. This is the operational core of fair-chance hiring.",
        bullets: [
          "Create role categories before reviewing reports.",
          "Document job-related reasons for any preliminary adverse decision.",
          "Give candidates a chance to dispute inaccurate records or provide context.",
          "Avoid blanket exclusions unless a law or regulation requires them.",
        ],
      },
      {
        heading: "Use adverse action as a controlled workflow",
        body:
          "When criminal history may affect the decision, the employer needs a pre-adverse notice, a copy of the report, the Summary of Rights, a waiting period, and a final notice if the decision stands.",
        bullets: [
          "Do not send a final rejection before the candidate has a meaningful dispute window.",
          "Keep the decision-maker, the CRA, and the hiring manager roles clear.",
          "Retain the assessment and notice history in the hiring file.",
          "Add state and city fair-chance overlays where they apply.",
        ],
      },
    ],
    links: [
      { label: "Criminal Background Checks", href: "/services/criminal-background-checks", note: "See the criminal-record search components employers use most." },
      { label: "Ban the Box Directory", href: "/resources/ban-the-box", note: "Check fair-chance timing rules by jurisdiction." },
      { label: "Compliance Checklist", href: "/compliance/checklist", note: "Audit your disclosure and adverse-action workflow." },
    ],
    faqs: [
      {
        q: "Can employers reject every applicant with a criminal record?",
        a: "That is usually risky. Employers should evaluate whether the specific record is job-related and consistent with business necessity, and they must follow applicable FCRA and fair-chance notice requirements before taking final adverse action.",
      },
      {
        q: "Why does source verification matter?",
        a: "Source verification helps confirm that a potential database match belongs to the candidate and reflects current court information before it is reported for employment use.",
      },
    ],
  },
  "employment-verification-program-guide": {
    icon: Users,
    eyebrow: "Employment verification program guide",
    title: "Employment Verification for Employers: How to Confirm Work History Without Slowing Hiring",
    metaTitle: "Employment Verification Program Guide | Precise Hire",
    description:
      "Employer guide to employment verification: what to verify, how to handle delays, when to use database verification, and how to support staffing and HR teams.",
    datePublished: "2026-07-03",
    readingMin: 7,
    intro:
      "Employment verification is one of the highest-friction parts of a background check because the speed depends on prior employers, payroll databases, HR departments, and candidate documentation. A strong program defines what matters before the verification starts.",
    sections: [
      {
        heading: "Decide what needs to be verified",
        body:
          "Not every role needs every prior employer verified. Employers should define which positions require direct employment verification and which can use a shorter lookback or candidate-supplied documentation when the prior employer does not respond.",
        bullets: [
          "Verify job title, employer name, dates, and sometimes reason for leaving.",
          "Use stricter verification for management, regulated, finance, or credential-sensitive roles.",
          "Define how far back the verification should go by role.",
          "Avoid ordering expensive verifications that do not affect the hiring decision.",
        ],
      },
      {
        heading: "Use database verification and direct contact together",
        body:
          "Payroll database verification can return quickly when the employer participates. Direct contact still matters when database coverage is missing, incomplete, or not suitable for the role.",
        bullets: [
          "Start with automated sources where appropriate.",
          "Escalate to direct employer contact when database coverage is unavailable.",
          "Allow candidate documentation after a defined non-response window.",
          "Track pending verifications separately so hiring managers understand the delay.",
        ],
      },
      {
        heading: "Make verification candidate-friendly",
        body:
          "Candidates can often help close a verification faster if the process is mobile-friendly and gives clear instructions. The best programs ask for documentation only when needed and keep the candidate informed.",
        bullets: [
          "Request W-2s, pay stubs, or offer letters only through a secure candidate portal.",
          "Explain exactly what information can be redacted.",
          "Give candidates a clear deadline for supporting documentation.",
          "Document substitutions so the hiring file explains how the verification was closed.",
        ],
      },
    ],
    links: [
      { label: "Employment Verification Service", href: "/services/employment-verification", note: "See how employment checks fit into background packages." },
      { label: "Staffing Agency Screening", href: "/industries/staffing", note: "High-volume verification workflows for staffing firms." },
      { label: "ATS Integrations", href: "/integrations", note: "Connect verification workflow into your hiring systems." },
    ],
    faqs: [
      {
        q: "How long does employment verification take?",
        a: "Database verification can return quickly when records are available. Direct-contact verification may take one to several business days depending on the prior employer's responsiveness.",
      },
      {
        q: "Can candidate documents replace employer contact?",
        a: "Many programs allow candidate-supplied documentation after a defined non-response window. The CRA should review the documents securely and document how the verification was completed.",
      },
    ],
  },
  "employee-drug-testing-policy-guide": {
    icon: FlaskConical,
    eyebrow: "Drug testing policy guide",
    title: "Employee Drug Testing for Employers: Building a Policy That Works Across Roles and States",
    metaTitle: "Employee Drug Testing Policy Guide | Precise Hire",
    description:
      "Employer guide to drug testing policy, safety-sensitive roles, DOT and non-DOT testing, marijuana rules, candidate timing, and compliance workflow.",
    datePublished: "2026-07-03",
    readingMin: 8,
    intro:
      "Drug testing works best when it is tied to job risk and written policy. Employers need to separate DOT and non-DOT programs, identify safety-sensitive roles, set collection timing, and account for state marijuana rules before the first test is ordered.",
    sections: [
      {
        heading: "Separate DOT and non-DOT testing",
        body:
          "DOT testing follows federal rules. Non-DOT testing is employer-policy driven and heavily affected by state law. Mixing the two creates confusion for candidates, managers, and compliance teams.",
        bullets: [
          "Keep DOT drivers and safety-sensitive transportation roles in a separate workflow.",
          "Use non-DOT panels only where state law and company policy allow them.",
          "Document when post-accident, reasonable-suspicion, random, and return-to-duty tests apply.",
          "Train supervisors before relying on reasonable-suspicion observations.",
        ],
      },
      {
        heading: "Control the collection clock",
        body:
          "Many testing delays happen before the specimen is collected. A clear collection window, candidate reminders, and access to convenient sites can shorten total turnaround without changing lab science.",
        bullets: [
          "Require collection within a defined window after the conditional offer.",
          "Use same-day or walk-in sites where possible.",
          "Track missed collections and expired authorizations.",
          "For high-volume hiring, consider mobile collection options.",
        ],
      },
      {
        heading: "Update marijuana and impairment rules",
        body:
          "Many states now limit how employers can use marijuana test results, especially for non-safety-sensitive jobs. A modern policy should define safety-sensitive roles and explain how impairment observations are documented.",
        bullets: [
          "List safety-sensitive jobs in the policy instead of leaving the term vague.",
          "Do not rely on a one-state policy for multi-state hiring.",
          "Pair test results with documented observations where state rules require it.",
          "Review policy language with counsel before enforcing marijuana-based disqualification.",
        ],
      },
    ],
    links: [
      { label: "Drug Testing Service", href: "/services/drug-testing", note: "Review testing options and employer workflows." },
      { label: "Transportation Screening", href: "/industries/transportation", note: "DOT-ready background checks, MVR, and drug testing." },
      { label: "Get a Quote", href: "/get-a-quote", note: "Ask for a role-based testing package." },
    ],
    faqs: [
      {
        q: "Should every employee be drug tested?",
        a: "Not always. Many employers focus testing on safety-sensitive, driving, regulated, or high-risk roles, while using different rules for lower-risk positions depending on state law and company policy.",
      },
      {
        q: "Can employers still test for marijuana?",
        a: "Often yes, but state laws increasingly limit how results can be used, especially for non-safety-sensitive roles. Employers should review state-specific rules before enforcing marijuana-based decisions.",
      },
    ],
  },
};

export default function ConsolidatedResourceGuide() {
  const [location] = useLocation();
  const slug = location.split("/").filter(Boolean).pop() ?? "";
  const guide = GUIDE_DATA[slug];

  if (!guide) return <NotFound />;

  const Icon = guide.icon;
  const canonical = `https://precisehire.com/resources/${slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      datePublished: guide.datePublished,
      dateModified: guide.datePublished,
      author: { "@type": "Organization", name: "Precise Hire" },
      publisher: { "@type": "Organization", name: "Precise Hire" },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://precisehire.com/" },
        { "@type": "ListItem", position: 2, name: "Resources", item: "https://precisehire.com/resources" },
        { "@type": "ListItem", position: 3, name: guide.title, item: canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  return (
    <>
      <SEO
        title={guide.metaTitle}
        description={guide.description}
        canonical={canonical}
        jsonLd={jsonLd}
      />

      <nav aria-label="Breadcrumb" className="container pt-10 pb-2 text-sm text-[#0B1F3A]/55">
        <Link href="/" className="hover:text-[#B7232A]">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/resources" className="hover:text-[#B7232A]">Resources</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0B1F3A]/80">{guide.eyebrow}</span>
      </nav>

      <section className="bg-[#FAF7F2] border-b border-[#0B1F3A]/8">
        <div className="container py-14 lg:py-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="eyebrow">
                <Icon className="size-3.5 text-[#B7232A]" />
                {guide.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-5 text-[#0B1F3A]">{guide.title}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-3xl text-[17px] leading-[1.75] text-[#0B1F3A]/75">{guide.intro}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-[#0B1F3A]/65">
                <span>{new Date(guide.datePublished).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</span>
                <span>•</span>
                <span>{guide.readingMin} min read</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="rounded-[2rem] border border-[#0B1F3A]/10 bg-white p-7 shadow-sm">
              <span className="grid size-14 place-items-center rounded-2xl bg-[#B7232A]/10 text-[#B7232A]">
                <ClipboardCheck className="size-7" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold text-[#0B1F3A]">Best next steps</h2>
              <div className="mt-5 grid gap-3">
                {guide.links.map((link) => (
                  <Link key={link.href} href={link.href} className="group rounded-xl border border-[#0B1F3A]/10 bg-[#FAF7F2] p-4 hover:border-[#B7232A]/40 hover:bg-white">
                    <span className="flex items-center justify-between gap-3 text-sm font-semibold text-[#0B1F3A] group-hover:text-[#B7232A]">
                      {link.label}
                      <ArrowRight className="size-4 shrink-0" />
                    </span>
                    <span className="mt-2 block text-xs leading-5 text-[#0B1F3A]/60">{link.note}</span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <article className="container py-14 lg:py-20">
        <div className="mx-auto max-w-4xl space-y-12">
          {guide.sections.map((section, index) => (
            <Reveal key={section.heading} delay={index * 0.04}>
              <section className="rounded-[1.75rem] border border-[#0B1F3A]/10 bg-white p-7 shadow-sm">
                <h2 className="text-3xl font-semibold tracking-tight text-[#0B1F3A]">{section.heading}</h2>
                <p className="mt-4 text-[16px] leading-8 text-[#0B1F3A]/72">{section.body}</p>
                <div className="mt-6 grid gap-3">
                  {section.bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-3 text-sm leading-6 text-[#0B1F3A]/75">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#B7232A]" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}

          <Reveal>
            <section className="rounded-[1.75rem] border border-[#B7232A]/15 bg-[#FAF7F2] p-7">
              <span className="eyebrow">
                <ShieldCheck className="size-3.5 text-[#B7232A]" />
                Frequently asked questions
              </span>
              <div className="mt-6 grid gap-4">
                {guide.faqs.map((faq) => (
                  <div key={faq.q} className="rounded-2xl bg-white p-5 border border-[#0B1F3A]/8">
                    <h3 className="font-semibold text-[#0B1F3A]">{faq.q}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#0B1F3A]/72">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </article>

      <section className="container pb-20">
        <Reveal>
          <div className="rounded-[2rem] bg-[#0B1F3A] px-8 py-12 text-center text-white lg:px-14">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Want this built around your actual hiring program?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/72">
              Tell us your roles, hiring volume, locations, and current provider. We will recommend a package structure and workflow that balances speed, compliance, and cost.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/get-a-quote" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0B1F3A] hover:bg-[#FAF7F2]">
                Get a quote <ArrowRight className="size-4" />
              </Link>
              <Link href="/talk-to-an-expert" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10">
                Talk to an expert
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
