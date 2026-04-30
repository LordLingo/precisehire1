/*
 * PreciseHire — FAQ
 * Style: Trusted Modernism. Editorial layout, accordion items, FAQPage JSON-LD
 * for SERP rich results.
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { FAQ_ITEMS, ASSETS } from "@/content/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FAQ() {
  return (
    <>
      <SEO
        title="Frequently Asked Questions | Precise Hire"
        description="Answers about turnaround times, FCRA compliance, ATS integrations, candidate-pay flows, pricing, and data security from the Precise Hire team."
        canonical="https://precisehire.com/faq"
        jsonLd={FAQ_JSONLD}
      />

      <section className="relative overflow-hidden">
        <img src={ASSETS.swooshSky} alt="" aria-hidden="true" className="pointer-events-none absolute -top-20 -right-24 w-[420px] opacity-50 rotate-[12deg]" />
        <div className="container pt-20 lg:pt-28 pb-12 max-w-3xl">
          <Reveal>
            <span className="eyebrow">Questions</span>
            <h1 className="display-xl mt-4 text-[#0B1F3A]">Everything you wanted to ask about background checks.</h1>
            <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed">
              Real answers from the people who actually run the reports. Don't see
              your question? Reach out and a specialist will get back the same day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container pb-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <Reveal>
            <div className="p-7 rounded-3xl bg-white border border-[#0B1F3A]/10">
              <h2 className="font-display text-xl font-semibold text-[#0B1F3A]">Need a faster answer?</h2>
              <p className="mt-3 text-[15px] text-[#0B1F3A]/70 leading-relaxed">A real specialist (not a chatbot) responds in under an hour during business hours.</p>
              <Link href="/contact" className="btn-coral mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">Contact us <ArrowRight className="size-4" /></Link>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal delay={0.05}>
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#0B1F3A]/12">
                  <AccordionTrigger className="text-left text-lg font-display font-semibold text-[#0B1F3A] hover:no-underline py-5">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-[15px] text-[#0B1F3A]/75 leading-relaxed pb-5">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </>
  );
}
