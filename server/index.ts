import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REDIRECTS: Record<string, string> = {
  "/blog": "/resources",
  "/category/background-checks/fast-background-check": "/resources/fast-background-check-employer-guide",
  "/how-to-conduct-a-fast-background-check": "/resources/fast-background-check-employer-guide",
  "/fast-background-check": "/resources/fast-background-check-employer-guide",
  "/resources/how-to-conduct-a-fast-background-check": "/resources/fast-background-check-employer-guide",
  "/criminal-background-checks": "/services/criminal-background-checks",
  "/employment-verification": "/services/employment-verification",
  "/driving-record-checks-mvr": "/services/driving-record-checks-mvr",
  "/drug-testing": "/services/drug-testing",
  "/education-verification": "/services/education-verification",
  "/international-background-checks": "/services/international-background-checks",
  "/services/employment": "/services/employment-verification",
};

const APP_ROUTES = new Set([
  "/",
  "/services",
  "/industries",
  "/pricing",
  "/trust",
  "/compliance",
  "/compliance/audit",
  "/compliance/checklist",
  "/integrations",
  "/about",
  "/faq",
  "/contact",
  "/get-a-quote",
  "/talk-to-an-expert",
  "/support",
  "/referral",
  "/resources",
  "/thanks",
  "/404",
]);

const APP_PREFIXES = [
  "/services/",
  "/industries/",
  "/legal/",
  "/resources/",
  "/authors/",
];

function isAppRoute(urlPath: string) {
  return APP_ROUTES.has(urlPath) || APP_PREFIXES.some((prefix) => urlPath.startsWith(prefix));
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use((req, res, next) => {
    const urlPath = req.path.replace(/\/$/, "") || "/";

    if (REDIRECTS[urlPath]) {
      return res.redirect(301, REDIRECTS[urlPath]);
    }

    if (urlPath.startsWith("/category/background-checks/fast-background-check/")) {
      return res.redirect(301, "/resources/fast-background-check-employer-guide");
    }

    if (urlPath.startsWith("/category/")) {
      return res.redirect(301, "/resources");
    }

    return next();
  });

  app.use(express.static(staticPath));

  // Handle client-side routing for known app routes. Totally unknown paths return
  // the static noindex 404 page so crawlers do not treat random URLs as soft 404s.
  app.get("*", (req, res) => {
    const urlPath = req.path.replace(/\/$/, "") || "/";
    if (isAppRoute(urlPath)) {
      return res.sendFile(path.join(staticPath, "index.html"));
    }

    return res.status(404).sendFile(path.join(staticPath, "404.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
