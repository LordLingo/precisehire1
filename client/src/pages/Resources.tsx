/*
 * PreciseHire — Resources (Blog) Index
 * Style: Trusted Modernism. Cream background, navy + crimson red, Fraunces display,
 * Inter body. Asymmetric hero w/ swoosh accent. Category chips + search input filter.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Search } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { ASSETS, COMPANY } from "@/content/site";
import { ALL_POSTS_INDEX, POST_CATEGORIES, POST_TOPICS } from "@/content/posts";

export default function Resources() {
  const [cat, setCat] = useState<typeof POST_CATEGORIES[number]>("All");
  const [topic, setTopic] = useState<typeof POST_TOPICS[number]>("All Topics");
  const [q, setQ] = useState("");

  // Pre-compute counts per topic so chip labels can show "Drug & Alcohol · 34"
  const topicCounts = useMemo(() => {
    const map: Record<string, number> = { "All Topics": ALL_POSTS_INDEX.length };
    for (const p of ALL_POSTS_INDEX) map[p.topic] = (map[p.topic] || 0) + 1;
    return map;
  }, []);

  const filtered = useMemo(() => {
    let pool = ALL_POSTS_INDEX;
    if (cat !== "All") pool = pool.filter((p) => p.category === cat);
    if (topic !== "All Topics") pool = pool.filter((p) => p.topic === topic);
    if (!q.trim()) return pool;
    const needle = q.trim().toLowerCase();
    return pool.filter(
      (p) =>
        p.title.toLowerCase().includes(needle) ||
        p.excerpt.toLowerCase().includes(needle) ||
        p.tags.some((t) => t.toLowerCase().includes(needle))
    );
  }, [cat, topic, q]);

  const isFiltered = cat !== "All" || topic !== "All Topics" || q.trim() !== "";

  const featured = ALL_POSTS_INDEX[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "PreciseHire Resources",
    url: "https://precisehire.com/resources",
    publisher: { "@type": "Organization", name: COMPANY.legalName },
    blogPost: ALL_POSTS_INDEX.slice(0, 50).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      datePublished: p.datePublished,
      author: { "@type": "Organization", name: p.author },
      url: `https://precisehire.com/resources/${p.slug}`,
      image: p.image,
    })),
  };

  return (
    <>
      <SEO
        title="Resources & Insights | PreciseHire"
        description="Field-tested guidance on FCRA compliance, fair-chance hiring, drug testing, and the operational details that make background checks defensible."
        canonical="https://precisehire.com/resources"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={ASSETS.swooshSky}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -right-24 w-[42rem] opacity-70 select-none"
        />
        <div className="container pt-16 lg:pt-24 pb-10 relative">
          <Reveal>
            <p className="eyebrow">
              <span className="inline-block size-1.5 rounded-full bg-[#B7232A]" /> The PreciseHire blog
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 font-display text-[2.6rem] sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0B1F3A] max-w-4xl">
              Hiring intelligence, not <em className="italic">hiring opinions</em>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg text-[#0B1F3A]/70">
              Practical, plainly-written guides for HR leaders, compliance teams, and operators —
              drawn from 20+ years of real-world background-screening experience.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured post */}
      <section className="container pb-12">
        <Reveal>
          <Link
            href={`/resources/${featured.slug}`}
            className="group grid lg:grid-cols-12 gap-8 items-center rounded-3xl bg-white border border-[#0B1F3A]/10 p-6 lg:p-8 hover:border-[#B7232A]/40 transition-colors"
          >
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#FAF7F2]">
                <img
                  src={featured.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#B7232A] font-semibold">
                <span>Featured</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#0B1F3A]/60">{featured.category}</span>
              </div>
              <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold text-[#0B1F3A] leading-tight">
                {featured.title}
              </h2>
              <p className="mt-3 text-[#0B1F3A]/70 text-[17px]">{featured.excerpt}</p>
              <div className="mt-5 flex items-center gap-4 text-sm text-[#0B1F3A]/60">
                <span>{new Date(featured.datePublished).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</span>
                <span>·</span>
                <span>{featured.readingMin} min read</span>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-[#B7232A] group-hover:gap-3 transition-all">
                Read article <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Filters */}
      <section className="container pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {POST_CATEGORIES.map((c) => {
              const active = c === cat;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors border",
                    active
                      ? "bg-[#0B1F3A] text-[#FAF7F2] border-[#0B1F3A]"
                      : "bg-white text-[#0B1F3A]/80 border-[#0B1F3A]/15 hover:border-[#0B1F3A]/40",
                  ].join(" ")}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <label className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#0B1F3A]/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="search"
              placeholder="Search articles..."
              className="w-full rounded-full border border-[#0B1F3A]/15 bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-[#0B1F3A]/50 focus:outline-none focus:border-[#B7232A]/60 focus:ring-2 focus:ring-[#B7232A]/15"
            />
          </label>
        </div>

        {/* Topic row — fine-grained service-area filter */}
        <div className="mt-5 pt-5 border-t border-[#0B1F3A]/10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs uppercase tracking-[0.18em] font-semibold text-[#0B1F3A]/55">
                Filter by topic
              </span>
              <div className="flex flex-wrap gap-2">
                {POST_TOPICS.map((t) => {
                  const active = t === topic;
                  const count = topicCounts[t] ?? 0;
                  if (count === 0 && t !== "All Topics") return null;
                  return (
                    <button
                      key={t}
                      onClick={() => setTopic(t)}
                      className={[
                        "group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors border",
                        active
                          ? "bg-[#B7232A] text-white border-[#B7232A]"
                          : "bg-white text-[#0B1F3A]/80 border-[#0B1F3A]/15 hover:border-[#B7232A]/50 hover:text-[#B7232A]",
                      ].join(" ")}
                    >
                      <span>{t}</span>
                      <span
                        className={[
                          "text-[11px] font-semibold tabular-nums rounded-full px-1.5 py-0.5",
                          active ? "bg-white/20" : "bg-[#0B1F3A]/5 group-hover:bg-[#B7232A]/10",
                        ].join(" ")}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            {isFiltered && (
              <button
                onClick={() => {
                  setCat("All");
                  setTopic("All Topics");
                  setQ("");
                }}
                className="self-start lg:self-auto text-xs font-semibold text-[#0B1F3A]/60 hover:text-[#B7232A] underline-offset-4 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
          <p className="mt-3 text-xs text-[#0B1F3A]/55">
            Showing <span className="font-semibold text-[#0B1F3A]">{filtered.length}</span> of {ALL_POSTS_INDEX.length} articles
          </p>
        </div>
      </section>

      {/* Article grid */}
      <section className="container pb-24">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-[#0B1F3A]/60">No articles match that search yet. Try another keyword.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.04}>
                <Link
                  href={`/resources/${p.slug}`}
                  className="group flex flex-col h-full rounded-2xl bg-white border border-[#0B1F3A]/10 overflow-hidden hover:-translate-y-0.5 hover:border-[#B7232A]/40 transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
                    <img
                      src={p.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold text-[#B7232A]">
                      <span>{p.category}</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-semibold text-[#0B1F3A] leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[15px] text-[#0B1F3A]/70 flex-1">{p.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between text-xs text-[#0B1F3A]/55">
                      <span>{new Date(p.datePublished).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</span>
                      <span>{p.readingMin} min</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <Reveal>
          <div className="rounded-3xl bg-[#0B1F3A] text-[#FAF7F2] p-10 lg:p-14 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl lg:text-4xl font-semibold leading-tight">
                Ready to put this into practice?
              </h2>
              <p className="mt-3 text-white/75 max-w-2xl">
                Talk to our team about a screening program built for your industry, your volume, and the
                jurisdictions you actually hire in.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end gap-3">
              <Link href="/get-a-quote" className="btn-coral rounded-full px-6 py-3 font-semibold">
                Get started
              </Link>
              <Link href="/pricing" className="btn-ghost-cream rounded-full px-6 py-3 font-semibold">
                See pricing
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
