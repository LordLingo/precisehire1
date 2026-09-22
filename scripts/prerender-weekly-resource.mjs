import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist", "public");
const templatePath = path.join(dist, "index.html");

const routes = [
  {
    path: "/resources/continuous-background-check-monitoring-employer-guide",
    title: "Continuous Background Checks: Employer Buying Guide",
    headline: "Continuous Background Checks: What Employers Should Monitor After Hire",
    description:
      "Compare continuous background check monitoring on criminal records, MVRs, healthcare exclusions, alerts, FCRA workflow, pricing, and integrations.",
    datePublished: "2026-09-22",
  },
  {
    path: "/resources/mvr-background-checks-employer-guide",
    title: "MVR Background Checks for Employers: 2026 Guide",
    headline: "MVR Background Checks: What Employers Should Check Before Hiring Drivers",
    description:
      "Compare MVR background check providers on state coverage, CDL records, PSP, Clearinghouse queries, monitoring, turnaround, pricing, and ATS workflow.",
    datePublished: "2026-09-15",
  },
  {
    path: "/resources/international-background-checks-employer-buying-guide",
    title: "International Background Checks: Employer Buying Guide",
    headline: "International Background Checks: What Employers Should Ask Before Buying",
    description:
      "Compare international background check vendors on country coverage, criminal records, employment and education verification, privacy, pricing, and turnaround.",
    datePublished: "2026-09-08",
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

if (!fs.existsSync(templatePath)) {
  throw new Error(`Missing Vite output: ${templatePath}`);
}

const template = fs.readFileSync(templatePath, "utf-8");

for (const route of routes) {
  const canonical = `https://precisehire.com${route.path}`;
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
  html = setTag(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${escapeHtml(route.title)}" />`);
  html = setTag(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${escapeHtml(route.description)}" />`);
  html = setTag(html, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${canonical}" />`);
  html = setTag(html, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/i, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`);
  html = setTag(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/i, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: route.headline,
    description: route.description,
    datePublished: route.datePublished,
    dateModified: route.datePublished,
    author: { "@type": "Organization", name: "Precise Hire" },
    publisher: { "@type": "Organization", name: "Precise Hire" },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  html = html.replace(
    "</head>",
    `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n</head>`,
  );

  const outputPath = path.join(dist, route.path.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html, "utf-8");
}

console.log(`SEO prerendered ${routes.length} weekly resource shells.`);
