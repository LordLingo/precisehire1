import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const scanDirs = [
  path.join(root, "client", "src"),
  path.join(root, "client", "public", "posts"),
].filter((dir) => fs.existsSync(dir));

const allowedExact = new Set([
  "/",
  "/404",
  "/about",
  "/blog",
  "/compliance",
  "/compliance/audit",
  "/compliance/checklist",
  "/contact",
  "/faq",
  "/get-a-quote",
  "/industries",
  "/industries/healthcare",
  "/industries/staffing",
  "/industries/transportation",
  "/industries/retail-hospitality-background-checks",
  "/industries/nonprofit-volunteer-background-checks",
  "/industries/church-background-checks",
  "/industries/property-management-background-checks",
  "/industries/construction-background-checks",
  "/integrations",
  "/pricing",
  "/referral",
  "/resources",
  "/resources/ban-the-box",
  "/resources/fcra-icraa-disclosure-pack",
  "/support",
  "/talk-to-an-expert",
  "/thanks",
  "/trust",
]);

const allowedPrefixes = [
  "/authors/",
  "/brand/",
  "/favicon",
  "/legal/",
  "/posts/",
  "/resources/",
  "/services/",
];

const knownBad = new Map([
  ["/services/employment", "/services/employment-verification"],
  ["/employment", "/services/employment-verification"],
  ["/criminal-background-checks", "/services/criminal-background-checks"],
  ["/drug-testing", "/services/drug-testing"],
  ["/education-verification", "/services/education-verification"],
  ["/international-background-checks", "/services/international-background-checks"],
]);

const ignoredPrefixes = [
  "//",
  "/api/",
  "/manus-storage/",
  "/__manus__/",
];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".git", "dist", "build"].includes(entry.name)) continue;
      files.push(...walk(full));
    } else if (/\.(tsx?|jsx?|md|html)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function normalizeUrl(url) {
  return url.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
}

function isAllowed(url) {
  if (!url.startsWith("/")) return true;
  if (ignoredPrefixes.some((prefix) => url.startsWith(prefix))) return true;
  const normalized = normalizeUrl(url);
  if (allowedExact.has(normalized)) return true;
  return allowedPrefixes.some((prefix) => normalized.startsWith(prefix));
}

function lineNumberFor(text, index) {
  return text.slice(0, index).split("\n").length;
}

const urlRegexes = [
  /href=[{]?['"]([^'"]+)['"]/g,
  /to=[{]?['"]([^'"]+)['"]/g,
  /\]\((\/[^)\s]+)\)/g,
];

const findings = [];

for (const dir of scanDirs) {
  for (const file of walk(dir)) {
    const text = fs.readFileSync(file, "utf-8");
    for (const regex of urlRegexes) {
      let match;
      while ((match = regex.exec(text))) {
        const raw = match[1];
        if (!raw || !raw.startsWith("/")) continue;
        const normalized = normalizeUrl(raw);
        const suggestion = knownBad.get(normalized);
        if (suggestion) {
          findings.push({
            type: "known-bad",
            file,
            line: lineNumberFor(text, match.index),
            url: raw,
            suggestion,
          });
          continue;
        }
        if (!isAllowed(raw)) {
          findings.push({
            type: "unknown-internal",
            file,
            line: lineNumberFor(text, match.index),
            url: raw,
          });
        }
      }
    }
  }
}

if (findings.length) {
  console.error("Internal link audit found potential SEO issues:\n");
  for (const finding of findings) {
    const relative = path.relative(root, finding.file);
    const suggestion = finding.suggestion ? ` -> use ${finding.suggestion}` : "";
    console.error(`${relative}:${finding.line} ${finding.url}${suggestion}`);
  }
  process.exitCode = 1;
} else {
  console.log("Internal link audit passed.");
}
