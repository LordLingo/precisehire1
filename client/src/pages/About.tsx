/*
 * PreciseHire — About
 * Style: Trusted Modernism. Editorial spread feel: large display heading,
 * narrative body copy in readable Inter, photo of the team, ribbon stats.
 */
import { Link } from "wouter";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import StatCounter from "@/components/site/StatCounter";
import { ASSETS, STATS } from "@/content/site";

const VALUES = [
  {
    title: "Accuracy is non-negotiable",
    body: "Every potential record is verified at the source courthouse before it touches a report. We'd rather take an extra hour than send a hiring manager a bad call.",
  },
  {
    title: "Speed without shortcuts",
    body: "We've automated the parts that should be automated and kept humans in the loop everywhere accuracy matters. The result: a median 4-hour turnaround.",
  },
  {
    title: "Compliance is a feature, not a footnote",
    body: "FCRA disclosures, adverse-action workflows, and state ban-the-box rules are baked into the dashboard, not buried in a PDF.",
  },
  {
    title: "Respect for candidates",
    body: "Every candidate gets a clear, branded invitation and a self-service status page. People deserve to know where their report stands.",
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Precise Hire — 22 Years of Background Screening"
        description="Founded in 2003, Precise Hire has delivered millions of FCRA-compliant background checks to U.S. employers across healthcare, logistics, staffing, and more."
        canonical="https://precisehire.com/about"
      />

      <section className="relative overflow-hidden">
        <img src={ASSETS.swooshCoral} alt="" aria-hidden="true" className="pointer-events-none absolute -top-24 -right-20 w-[460px] opacity-50 rotate-[20deg]" />
        <div className="container pt-20 lg:pt-28 pb-12 max-w-3xl">
          <Reveal>
            <span className="eyebrow">About</span>
            <h1 className="display-xl mt-4 text-[#0B1F3A]">Twenty-two years of helping employers hire with certainty.</h1>
            <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed">
              Precise Hire was founded in 2003 by background-screening veterans who
              were tired of slow, opaque legacy providers. Two decades later, we
              still answer the phone, still verify every flag at the source, and
              still believe employers deserve a faster, fairer way to hire.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Editorial photo + body */}
      <section className="container pb-16 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="rounded-3xl overflow-hidden border border-[#0B1F3A]/10">
              <img src={ASSETS.team} alt="The Precise Hire operations team collaborating in a meeting" className="w-full h-auto" loading="lazy" />
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.05}>
            <span className="eyebrow">Our story</span>
            <h2 className="display-md mt-3 text-[#0B1F3A]">From a back office to a national platform.</h2>
            <div className="mt-5 space-y-4 text-[#0B1F3A]/80 leading-relaxed">
              <p>
                What started as a two-person operation supporting local trucking
                companies has grown into a multi-state team supporting hospitals,
                staffing agencies, retailers, and Fortune-listed enterprises.
              </p>
              <p>
                The technology has changed; our discipline hasn't. Every report we
                deliver is reviewed by a U.S.-based research specialist before it
                reaches your dashboard. We don't outsource judgment.
              </p>
              <p>
                Today, more than twelve million completed checks later, the bar is
                still the same: deliver the most accurate, fastest, most respectful
                screening experience in the industry.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="container">
        <div className="ribbon-stat grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#0B1F3A]/12">
          {STATS.map((s) => (
            <StatCounter key={s.label} value={s.value} prefix={s.prefix} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container py-24">
        <Reveal>
          <span className="eyebrow">What we believe</span>
          <h2 className="display-lg mt-3 text-[#0B1F3A] max-w-2xl">Four convictions we don't compromise on.</h2>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="p-7 rounded-3xl bg-white border border-[#0B1F3A]/10 h-full">
                <h3 className="font-display text-xl font-semibold text-[#0B1F3A]">{v.title}</h3>
                <p className="mt-3 text-[15px] text-[#0B1F3A]/70 leading-relaxed">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container pb-24">
        <Reveal>
          <div className="rounded-[28px] bg-[#0B1F3A] text-white px-8 lg:px-14 py-14 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div>
              <h2 className="display-md">Want to work with people who care about the work?</h2>
              <p className="mt-3 text-white/70 max-w-2xl">We'd love to hear from you — whether you're hiring next week or next quarter.</p>
            </div>
            <Link href="/contact" className="btn-coral rounded-full px-7 py-3.5 text-sm font-semibold">Talk to us</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
