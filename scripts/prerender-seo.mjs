import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist", "public");
const templatePath = path.join(dist, "index.html");

const SITE_URL = "https://rapidhiresolutions.com";
const ORG_NAME = "Rapid Hire Solutions";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: ORG_NAME,
  url: `${SITE_URL}/`,
  description:
    "Rapid Hire Solutions provides FCRA-certified employment background checks, pre-employment screening, criminal background checks, verifications, MVR checks, drug screening, continuous monitoring, and ATS-connected workflows for U.S. employers.",
  areaServed: "US",
};

const routes = [
  {
    path: "/",
    title: "Rapid Hire Solutions — Fast Background Checks",
    description:
      "FCRA-certified employment background checks, drug screening, MVR checks, verifications, and ATS-connected workflows for high-volume hiring.",
    jsonLd: [orgJsonLd, { "@context": "https://schema.org", "@type": "WebSite", name: ORG_NAME, url: `${SITE_URL}/` }],
  },
  {
    path: "/services",
    title: "Background Check Services | Rapid Hire Solutions",
    description:
      "Employment background check services including criminal records, verifications, MVR checks, drug screening, continuous monitoring, and ATS workflows.",
  },
  {
    path: "/services/criminal-background-checks",
    title: "Criminal Background Checks | Rapid Hire Solutions",
    description:
      "Fast, FCRA-certified criminal background checks across county, state, federal, and national sources for employers and hiring teams.",
  },
  {
    path: "/services/employment-verification",
    title: "Employment Verification | Rapid Hire Solutions",
    description:
      "Verify past employers, job titles, dates, and employment history directly from the source before making a final hiring decision.",
  },
  {
    path: "/services/driving-record-checks-mvr",
    title: "MVR Checks for Employers | Rapid Hire Solutions",
    description:
      "Motor vehicle record checks help employers review license status, violations, restrictions, and driving history before putting workers on the road.",
  },
  {
    path: "/services/drug-testing",
    title: "Drug Screening for Employers | Rapid Hire Solutions",
    description:
      "Pre-employment, random, and post-incident drug screening workflows for employers, staffing teams, transportation, healthcare, and safety-sensitive roles.",
  },
  {
    path: "/services/education-verification",
    title: "Education Verification | Rapid Hire Solutions",
    description:
      "Confirm degrees, attendance dates, credentials, and education history with schools, colleges, trade institutions, and international sources.",
  },
  {
    path: "/services/international-background-checks",
    title: "International Background Checks | Rapid Hire Solutions",
    description:
      "Cross-border employment, education, criminal, and credential verifications for employers hiring candidates with international history.",
  },
  {
    path: "/industries",
    title: "Background Checks by Industry | Rapid Hire Solutions",
    description:
      "Role-based background check workflows for staffing, healthcare, transportation, retail, nonprofits, construction, small business, and more.",
  },
  {
    path: "/industries/healthcare",
    title: "Healthcare Background Checks | Rapid Hire Solutions",
    description:
      "Healthcare screening workflows for hospitals, clinics, home health, allied staffing, sanctions checks, license verification, and drug screening.",
  },
  {
    path: "/industries/transportation",
    title: "Transportation Background Checks | Rapid Hire Solutions",
    description:
      "Transportation screening workflows for MVR checks, driver background checks, drug screening, CDL-related screening, and fleet hiring.",
  },
  {
    path: "/industries/staffing",
    title: "Staffing Background Checks | Rapid Hire Solutions",
    description:
      "High-volume background screening for staffing firms with candidate workflows, client-ready packages, ATS integrations, and fast turnaround.",
  },
  {
    path: "/industries/retail-hospitality-background-checks",
    title: "Retail Background Checks | Rapid Hire Solutions",
    description:
      "Fast retail and hospitality background checks for high-turnover hiring teams that need compliant reports without slowing down offers.",
  },
  {
    path: "/industries/nonprofit-volunteer-background-checks",
    title: "Volunteer Background Checks | Rapid Hire Solutions",
    description:
      "Volunteer background checks for nonprofits, youth programs, schools, ministries, and community organizations that need safer screening.",
  },
  {
    path: "/industries/church-background-checks",
    title: "Church Background Checks | Rapid Hire Solutions",
    description:
      "Church background checks for volunteers, ministry staff, youth workers, drivers, and leadership teams with simple screening workflows.",
  },
  {
    path: "/industries/property-management-background-checks",
    title: "Property Management Checks | Rapid Hire Solutions",
    description:
      "Employment background checks for property management firms hiring leasing agents, maintenance staff, onsite managers, and contractors.",
  },
  {
    path: "/industries/construction-background-checks",
    title: "Construction Background Checks | Rapid Hire Solutions",
    description:
      "Background checks, MVR checks, and drug screening for construction companies, contractors, field crews, and safety-sensitive roles.",
  },
  {
    path: "/pricing",
    title: "Background Check Pricing | Rapid Hire Solutions",
    description:
      "Employment background check pricing for criminal records, verifications, MVR checks, drug screening, continuous monitoring, and custom packages.",
  },
  {
    path: "/compliance",
    title: "FCRA Background Check Compliance | Rapid Hire Solutions",
    description:
      "FCRA compliance resources, adverse action workflows, disclosure support, and screening guidance for employment background checks.",
  },
  {
    path: "/integrations",
    title: "Background Check ATS Integrations | Rapid Hire Solutions",
    description:
      "Connect Rapid Hire Solutions background checks with applicant tracking systems, HR platforms, APIs, and high-volume hiring workflows.",
  },
  {
    path: "/about",
    title: "About Rapid Hire Solutions | Background Checks",
    description:
      "Learn about Rapid Hire Solutions, a U.S.-based background check provider serving employers, staffing firms, and HR teams.",
  },
  {
    path: "/resources",
    title: "Background Check Resources | Rapid Hire Solutions",
    description:
      "Employer guides for FCRA compliance, criminal background checks, adverse action, ban-the-box rules, MVR checks, drug screening, and hiring.",
  },
  {
    path: "/resources/employer-background-check-program-guide",
    title: "Employer Background Check Program Guide",
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
    title: "Employment Verification Program Guide",
    description:
      "Employer guide to employment verification: what to verify, how to handle delays, when to use database verification, and how to support staffing and HR teams.",
  },
  {
    path: "/resources/employee-drug-testing-policy-guide",
    title: "Employee Drug Testing Policy Guide",
    description:
      "Employer guide to drug testing policy, safety-sensitive roles, DOT and non-DOT testing, marijuana rules, candidate timing, and compliance workflow.",
  },
  {
    path: "/referral",
    title: "Referral Partner Program | Rapid Hire Solutions",
    description:
      "Refer businesses that need background checks and earn monthly referral partner revenue share from eligible client billing.",
  },
  {
    path: "/get-a-quote",
    title: "Get a Background Check Quote | Rapid Hire Solutions",
    description:
      "Request background check pricing and package recommendations for your company, staffing firm, nonprofit, or hiring team.",
  },
  {
    path: "/contact",
    title: "Contact Rapid Hire Solutions | Background Checks",
    description:
      "Contact Rapid Hire Solutions for employment background checks, support, compliance questions, integrations, and pricing.",
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
  const canonical = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
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