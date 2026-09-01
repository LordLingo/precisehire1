import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist", "public");
const templatePath = path.join(dist, "index.html");

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://precisehire.com/#org",
  name: "Precise Hire",
  url: "https://precisehire.com/",
  foundingDate: "2003-01-01",
  telephone: "+18667735486",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+18667735486",
      contactType: "sales",
      areaServed: "US",
      availableLanguage: "English",
    },
  ],
};

const routes = [
  {
    path: "/",
    title: "Precise Hire — Background Checks Employers Trust",
    description:
      "FCRA-compliant employment background checks, drug testing, MVR, and verifications — most reports back in under 4 hours.",
    jsonLd: [orgJsonLd, { "@context": "https://schema.org", "@type": "WebSite", name: "Precise Hire", url: "https://precisehire.com/" }],
  },
  {
    path: "/services",
    title: "Background Check Services for Employers | Precise Hire",
    description:
      "Employment background check services including criminal records, verifications, MVR, drug testing, and international screening.",
  },
  {
    path: "/services/criminal-background-checks",
    title: "Criminal Background Checks for Employers | Precise Hire",
    description:
      "Fast, FCRA-compliant criminal background checks across county, state, federal, and national databases. Most reports returned in under 4 hours.",
  },
  {
    path: "/services/employment-verification",
    title: "Employment Verification Services | Precise Hire",
    description:
      "Verify past employers, job titles, dates, and reasons for leaving directly from the source before making a final hiring decision.",
  },
  {
    path: "/services/driving-record-checks-mvr",
    title: "Driving Record Checks (MVR) for Employers | Precise Hire",
    description:
      "DOT-compliant Motor Vehicle Records pulled from all 50 states to identify violations, license status, restrictions, and CDL history.",
  },
  {
    path: "/services/drug-testing",
    title: "Drug & Alcohol Testing for Employers | Precise Hire",
    description:
      "Pre-employment, random, and post-incident drug screening with nationwide collection sites, MRO review, and DOT-compliant programs.",
  },
  {
    path: "/services/education-verification",
    title: "Education Verification Services | Precise Hire",
    description:
      "Confirm degrees, attendance dates, and credentials directly with schools, colleges, trade institutions, and international sources.",
  },
  {
    path: "/services/international-background-checks",
    title: "International Background Checks | Precise Hire",
    description:
      "Cross-border employment, education, criminal, and credential verifications in 200+ countries with privacy-aware processes.",
  },
  {
    path: "/industries",
    title: "Background Checks by Industry | Precise Hire",
    description:
      "Role-based background check packages for healthcare, staffing, transportation, retail, nonprofits, construction, and more.",
  },
  {
    path: "/industries/healthcare",
    title: "Healthcare Background Checks | Precise Hire",
    description:
      "Healthcare screening for hospitals, clinics, home health, allied staffing, sanctions checks, license verification, and drug testing.",
  },
  {
    path: "/industries/transportation",
    title: "Transportation Background Checks | Precise Hire",
    description:
      "DOT-ready background checks, MVRs, CDLIS, drug testing, and continuous license monitoring for transportation employers.",
  },
  {
    path: "/industries/staffing",
    title: "Background Checks for Staffing Agencies | Precise Hire",
    description:
      "High-volume screening for staffing firms with per-client packages, branch billing, ATS workflows, I-9, E-Verify, and WOTC support.",
  },
  {
    path: "/industries/retail-hospitality-background-checks",
    title: "Retail & Hospitality Background Checks | Precise Hire",
    description:
      "Fast, affordable retail and hospitality background checks for high-turnover hiring teams that need compliant reports without slowing offers.",
  },
  {
    path: "/industries/nonprofit-volunteer-background-checks",
    title: "Volunteer Background Checks for Nonprofits | Precise Hire",
    description:
      "Volunteer background checks for nonprofits, youth programs, schools, ministries, and community organizations that need safe screening.",
  },
  {
    path: "/industries/church-background-checks",
    title: "Church Background Checks for Volunteers | Precise Hire",
    description:
      "Church background checks for volunteers, ministry staff, youth workers, drivers, and leadership teams with simple packages.",
  },
  {
    path: "/industries/property-management-background-checks",
    title: "Property Management Background Checks | Precise Hire",
    description:
      "Employment background checks for property management firms hiring leasing agents, maintenance staff, onsite managers, and contractors.",
  },
  {
    path: "/industries/construction-background-checks",
    title: "Construction Background Checks | Precise Hire",
    description:
      "Background checks, MVRs, and drug testing for construction companies, contractors, field crews, and safety-sensitive roles.",
  },
  {
    path: "/pricing",
    title: "Background Check Pricing | Precise Hire",
    description:
      "Transparent employment background check pricing for criminal records, verifications, MVR, drug testing, and custom packages.",
  },
  {
    path: "/compliance",
    title: "FCRA Background Check Compliance | Precise Hire",
    description:
      "FCRA compliance resources, adverse action workflows, disclosure support, and screening guidance for employment background checks.",
  },
  {
    path: "/integrations",
    title: "Background Check ATS Integrations | Precise Hire",
    description:
      "Connect Precise Hire background checks with applicant tracking systems, HR platforms, APIs, and hiring workflows.",
  },
  {
    path: "/about",
    title: "About Precise Hire | Employment Background Checks",
    description:
      "Learn about Precise Hire, a background check provider serving employers, staffing firms, and HR teams across the United States.",
  },
  {
    path: "/resources",
    title: "Background Check Resources for Employers | Precise Hire",
    description:
      "Employer guides for FCRA compliance, criminal background checks, adverse action, ban-the-box rules, MVRs, drug testing, and hiring.",
  },
  {
    path: "/resources/background-check-turnaround-time-employer-guide",
    title: "Background Check Turnaround Time: Employer Guide",
    description:
      "See what controls background check turnaround time, why reports get delayed, and how employers can reduce hiring delays without sacrificing accuracy.",
  },
  {
    path: "/resources/how-to-choose-background-check-company-employer-guide",
    title: "How to Choose a Background Check Company: 15 Questions",
    description:
      "Compare employment background check companies on accuracy, turnaround, pricing, compliance support, ATS integration, drug testing, and service.",
  },
  {
    path: "/resources/county-vs-national-criminal-background-checks",
    title: "County vs. National Criminal Background Checks",
    description:
      "Compare county court searches and national criminal databases on coverage, accuracy, turnaround, pricing, and hiring risk before choosing a screening package.",
  },
  {
    path: "/resources/background-check-adverse-action-employer-guide",
    title: "Background Check Adverse Action Guide (2026)",
    description:
      "Build a defensible FCRA adverse-action workflow with pre-adverse notices, dispute handling, final notices, ATS controls, and vendor questions.",
  },
  {
    path: "/resources/employment-verification-services-staffing-guide",
    title: "Employment Verification Services: Staffing Guide",
    description:
      "Compare employment verification vendors on turnaround, source methods, ATS integration, discrepancies, pricing, and support before you choose a provider.",
  },
  {
    path: "/resources/dot-vs-non-dot-drug-testing-employer-guide",
    title: "DOT vs. Non-DOT Drug Testing Guide | PreciseHire",
    description:
      "Compare DOT and non-DOT drug testing panels, forms, collections, MRO review, Clearinghouse duties, and vendor questions before choosing a program.",
  },
  {
    path: "/resources/background-check-ats-integration-guide",
    title: "Background Check ATS Integration Guide | PreciseHire",
    description:
      "A buyer's guide to background check ATS integrations covering workflow, security, candidate experience, adverse action, billing, support, and implementation.",
  },
  {
    path: "/resources/healthcare-background-check-checklist",
    title: "Healthcare Background Check Checklist | PreciseHire",
    description:
      "A practical healthcare screening checklist covering criminal records, license verification, OIG exclusions, NPDB, employment, education, and drug testing.",
  },
  {
    path: "/resources/background-check-pricing-for-staffing-agencies",
    title: "Background Check Pricing for Staffing Agencies",
    description:
      "A practical pricing guide for staffing firms comparing background check vendors: package design, pass-through fees, ATS costs, drug testing, and compliance support.",
  },
  {
    path: "/resources/employer-background-check-program-guide",
    title: "Employer Background Check Program Guide | Precise Hire",
    description:
      "A practical employer guide to building a compliant background check program: package design, FCRA workflow, turnaround speed, candidate experience, and internal controls.",
  },
  {
    path: "/resources/criminal-background-check-policy-guide",
    title: "Employer Criminal Background Check Policy Guide",
    description:
      "A practical employer guide to criminal background check policy, source verification, fair-chance review, individualized assessment, and adverse action.",
  },
  {
    path: "/resources/employment-verification-program-guide",
    title: "Employment Verification Program Guide | Precise Hire",
    description:
      "Employer guide to employment verification: what to verify, how to handle delays, when to use database verification, and how to support staffing and HR teams.",
  },
  {
    path: "/resources/employee-drug-testing-policy-guide",
    title: "Employee Drug Testing Policy Guide | Precise Hire",
    description:
      "Employer guide to drug testing policy, safety-sensitive roles, DOT and non-DOT testing, marijuana rules, candidate timing, and compliance workflow.",
  },
  {
    path: "/referral",
    title: "Referral Partner Program | Earn Monthly | Precise Hire",
    description:
      "Refer businesses that need background checks and earn monthly referral partner revenue share from eligible client billing.",
  },
  {
    path: "/get-a-quote",
    title: "Get a Background Check Quote | Precise Hire",
    description:
      "Request background check pricing and package recommendations for your company, staffing firm, nonprofit, or hiring team.",
  },
  {
    path: "/contact",
    title: "Contact Precise Hire | Background Check Services",
    description:
      "Contact Precise Hire for employment background check services, support, compliance questions, integrations, and pricing.",
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function setTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace("</head>", `${replacement}\n</head>`);
}

function injectMeta(template, route) {
  const canonical = `https://precisehire.com${route.path === "/" ? "/" : route.path}`;
  let html = template;

  html = setTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  html = setTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/i,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
  );
  html = setTag(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i,
    `<link rel="canonical" href="${canonical}" />`,
  );
  html = setTag(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
  );
  html = setTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
  );
  html = setTag(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = setTag(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
  );
  html = setTag(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
  );

  if (!/meta\s+name="robots"/i.test(html)) {
    html = html.replace("</head>", `  <meta name="robots" content="index,follow,max-image-preview:large" />\n</head>`);
  }

  if (route.jsonLd) {
    html = html.replace(
      "</head>",
      `  <script type="application/ld+json">${JSON.stringify(route.jsonLd)}</script>\n</head>`,
    );
  }

  return html;
}

function outputPathFor(routePath) {
  if (routePath === "/") return path.join(dist, "index.html");
  return path.join(dist, routePath.replace(/^\//, ""), "index.html");
}

if (!fs.existsSync(templatePath)) {
  throw new Error(`Missing Vite output: ${templatePath}`);
}

const template = fs.readFileSync(templatePath, "utf-8");

for (const route of routes) {
  const outputPath = outputPathFor(route.path);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, injectMeta(template, route), "utf-8");
}

console.log(`SEO prerendered ${routes.length} route shells.`);