import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Github, Sparkles } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";

const TEST_POINTS = [
  "Created a new React page inside the existing Vite app structure.",
  "Used the same SiteLayout wrapper already applied globally in App.tsx.",
  "Added a route so the page is available at /chatgpt-test-page.",
];

export default function ChatGptTestPage() {
  return (
    <>
      <SEO
        title="ChatGPT GitHub Test Page | PreciseHire"
        description="A small test page created through the connected GitHub integration to confirm ChatGPT can add pages and prepare code changes."
        canonical="https://precisehire.com/chatgpt-test-page"
      />

      <section className="bg-[#FAF7F2] border-b border-[#0B1F3A]/8">
        <div className="container py-16 lg:py-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="eyebrow">
                <Github className="size-3.5 text-[#B7232A]" />
                GitHub integration test
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-xl mt-5 text-[#0B1F3A]">
                This page was added through your connected GitHub repo.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.7] text-[#0B1F3A]/75 max-w-2xl">
                This is a safe test page for PreciseHire. It confirms that ChatGPT can inspect the existing codebase, follow the current styling pattern, create a new page, and push the change to GitHub for review.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/get-a-quote"
                  className="inline-flex items-center gap-2 rounded-full bg-[#B7232A] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#9A1A20]"
                >
                  Back to get a quote
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0B1F3A]/20 px-6 py-3 text-[15px] font-semibold text-[#0B1F3A] hover:bg-white"
                >
                  Return home
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-4">
            <div className="rounded-[2rem] border border-[#0B1F3A]/10 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 text-[#0B1F3A]">
                <span className="grid size-12 place-items-center rounded-2xl bg-[#B7232A]/10 text-[#B7232A]">
                  <Sparkles className="size-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B7232A]">
                    Test status
                  </p>
                  <h2 className="text-2xl font-semibold">Page created</h2>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {TEST_POINTS.map((point) => (
                  <div key={point} className="flex gap-3 text-sm leading-6 text-[#0B1F3A]/75">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#B7232A]" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
