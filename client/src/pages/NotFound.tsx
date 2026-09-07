/*
 * PreciseHire — NotFound
 * Style: Trusted Modernism, on-brand 404 with cream surface, navy display,
 * coral accent and a useful set of links instead of a dead end.
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import { ASSETS } from "@/content/site";

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found | Precise Hire" description="That page doesn't exist anymore — but here are some places that might help." noindex />
      <section className="ph-page-hero relative overflow-hidden">
        <img src={ASSETS.swooshSky} alt="" aria-hidden="true" className="pointer-events-none absolute -top-20 -left-20 w-[420px] opacity-50 rotate-[-15deg]" />
        <div className="container py-24 lg:py-32 max-w-3xl text-center">
          <span className="eyebrow">404</span>
          <h1 className="display-xl mt-4 text-[#0B1F3A]">We couldn't find that page.</h1>
          <p className="mt-5 text-lg text-[#0B1F3A]/75">
            The link may have moved or expired. Here are some popular places to start instead.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link href="/" className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">Go home <ArrowRight className="size-4" /></Link>
            <Link href="/services" className="btn-ghost-navy inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">Explore services</Link>
            <Link href="/get-a-quote" className="btn-ghost-navy inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">Get a quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
