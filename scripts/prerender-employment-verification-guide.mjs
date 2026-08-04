import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist", "public");
const templatePath = path.join(dist, "index.html");

const route = {
  path: "/resources/employment-verification-services-staffing-guide",
  title: "Employment Verification Services: Staffing Guide",
  description:
    "Compare employment verification vendors on turnaround, source methods, ATS integration, discrepancies, pricing, and support before you choose a provider.",
};

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

const canonical = `https://precisehire.com${route.path}`;
let html = fs.readFileSync(templatePath, "utf-8");

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

const outputPath = path.join(dist, route.path.replace(/^\//, ""), "index.html");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, html, "utf-8");
console.log(`SEO prerendered ${route.path}.`);
