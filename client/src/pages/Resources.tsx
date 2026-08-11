/*
 * PreciseHire — Resources (Blog) Index
 * Style: Trusted Modernism. Cream background, navy + crimson red, Fraunces display,
 * Inter body. Asymmetric hero with category, topic, and search filters.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Search } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { ASSETS, COMPANY } from "@/content/site";
import { ALL_POSTS_INDEX, POST_CATEGORIES, POST_TOPICS } from "@/content/posts";
import { WEEKLY_RESOURCE_POST } from "@/content/weekly_resource_post";
import { HEALTHCARE_BACKGROUND_CHECK_POST } from "@/content/healthcare_background_check_post";
import { ATS_INTEGRATION_GUIDE_POST } from "@/content/ats_integration_guide_post";
import { DOT_VS_NON_DOT_DRUG_TESTING_POST } from "@/content/dot_vs_non_dot_drug_testing_post";
import { EMPLOYMENT_VERIFICATION_STAFFING_GUIDE_POST } from "@/content/employment_verification_staffing_guide_post";
import { ADVERSE_ACTION_EMPLOYER_GUIDE_POST } from "@/content/adverse_action_employer_guide_post";

const SEO_ENTRY_POINTS = [
  { label: "Criminal Background Checks", href: "/services/criminal-background-checks", group: "Service" },
  { label: "Employment Verification", href: "/services/employment-verification", group: "Service" },
  { label: "MVR Checks", href: "/services/driving-record-checks-mvr", group: "Service" },
  { label: "Drug Testing", href: "/services/drug-testing", group: "Service" },
  { label: "Staffing Agencies", href: "/industries/staffing", group: "Industry" },
  { label: "Healthcare", href: "/industries/healthcare", group: "Industry" },
  { label: "Retail & Hospitality", href: "/industries/retail-hospitality-background-checks", group: "Industry" },
  { label: "Volunteer Screening", href: "/industries/nonprofit-volunteer-background-checks", group: "Industry" },
];

const RESOURCE_HUB_EXCLUDE_PATTERNS = [
  /tenant/i,
  /eviction/i,
  /direct-express/i,
  /background-check-app/i,
  /people-background-checks/i,
  /fbi-background-checks/i,
  /failed-background-check/i,
  /identity-verification-solutions/i,
  /clear-identity-verification/i,
];

function shouldHideFromResourcesHub(slug: string) {
  return RESOURCE_HUB_EXCLUDE_PATTERNS.some((pattern) => pattern.test(slug));
}

export default function Resources() {
  const [cat, setCat] = useState<typeof POST_CATEGORIES[number]>("All");
  const [topic, setTopic] = useState<typeof POST_TOPICS[number]>("All Topics");
  const [q, setQ] = useState("");

  const visiblePosts = useMemo(
    () => [
      ADVERSE_ACTION_EMPLOYER_GUIDE_POST,
      EMPLOYMENT_VERIFICATION_STAFFING_GUIDE_POST,
      DOT_VS_NON_DOT_DRUG_TESTING_POST,
      ATS_INTEGRATION_GUIDE_POST,
      HEALTHCARE_BACKGROUND_CHECK_POST,
      WEEKLY_RESOURCE_POST,
      ...ALL_POSTS_INDEX,
    ].filter((post) => !shouldHideFromResourcesHub(post.slug)),
    [],
  );

  const topicCounts = useMemo(() => {
    const map: Record<string, number> = { "All Topics": visiblePosts.length };
    for (const post of visiblePosts) map[post.topic] = (map[post.topic] || 0) + 1;
    return map;
  }, [visiblePosts]);

  const filtered = useMemo(() => {
    let pool = visiblePosts;
    if (cat !== "All") pool = pool.filter((post) => post.category === cat);
    if (topic !== "All Topics") pool = pool.filter((post) => post.topic === topic);
    if (!q.trim()) return pool;

    const needle = q.trim().toLowerCase();
    return pool.filter(
      (post) =>
        post.title.toLowerCase().includes(needle) ||
        post.excerpt.toLowerCase().includes(needle) ||
        post.tags.some((tag) => tag.toLowerCase().includes(needle)),
    );
  }, [cat, topic, q, visiblePosts]);

  const isFiltered = cat !== "All" || topic !== "All Topics" || q.trim() !== "";
  const featured = visiblePosts[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "PreciseHire Resources",
    url: "https://precisehire.com/resources",
    publisher: { "@type": "Organization", name: COMPANY.legalName },
    blogPost: visiblePosts.slice(0, 50).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.datePublished,
      author: { "@type": "Organization", name: post.author },
      url: `https://precisehire.com/resources/${post.slug}`,
      image: post.image,
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
              Practical, plainly-written guides for HR leaders, compliance teams, and operators — drawn from 20+ years of real-world background-screening experience.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container pb-12">
        <Reveal>
          <div className="rounded-[1.75rem] border border-[#0B1F3A]/10 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B7232A]">Popular background check topics</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#0B1F3A]">Jump to service and industry guides.</h2>
              </div>
              <Link href="/industries" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:text-[#B7232A]">
                View all industries <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {SEO_ENTRY_POINTS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full border border-[#0B1F3A]/15 bg-[#FAF7F2] px-4 py-2 text-sm font-semibold text-[#0B1F3A] hover:border-[#B7232A]/50 hover:text-[#B7232A]"
                >
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[#0B1F3A]/45">{item.group}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {featured && (
        <section className="container pb-12">
          <Reveal>
            <Link
              href={`/resources/${featured.slug}`}
              className="group grid lg:grid-cols-12 gap-8 items-center rounded-3xl bg-white border border-[#0B1F3A]/10 p-6 lg:p-8 hover:border-[#B7232A]/40 transition-colors"
            >
              <div className="lg:col-span-5">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#FAF7F2]">
                  <img src={featured.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#B7232A] font-semibold">
                  <span>Featured</span><span aria-hidden="true">·</span><span className="text-[#0B1F3A]/60">{featured.category}</span>
                </div>
                <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold text-[#0B1F3A] leading-tight">{featured.title}</h2>
                <p className="mt-3 text-[#0B1F3A]/70 text-[17px]">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-sm text-[#0B1F3A]/60">
                  <span>{new Date(featured.datePublished).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</span>
                  <span>·</span><span>{featured.readingMin} min read</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-[#B7232A] group-hover:gap-3 transition-all">
                  Read article <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      <section className="container pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {POST_CATEGORIES.map((category) => {
              const active = category === cat;
              return (
                <button
                  key={category}
                  onClick={() => setCat(category)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors border",
                    active
                      ? "bg-[#0B1F3A] text-[#FAF7F2] border-[#0B1F3A]"
                      : "bg-white text-[#0B1F3A]/80 border-[#0B1F3A]/15 hover:border-[#0B1F3A]/40",
                  ].join(" ")}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <label className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#0B1F3A]/50" />
            <input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              type="search"
              placeholder="Search articles..."
              className="w-full rounded-full border border-[#0B1F3A]/15 bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-[#0B1F3A]/50 focus:outline-none focus:border-[#B7232A]/60 focus:ring-2 focus:ring-[#B7232A]/15"
            />
          </label>
        </div>

        <div className="mt-5 pt-5 border-t border-[#0B1F3A]/10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs uppercase tracking-[0.18em] font-semibold text-[#0B1F3A]/55">Filter by topic</span>
              <div className="flex flex-wrap gap-2">
                {POST_TOPICS.map((postTopic) => {
                  const active = postTopic === topic;
                  const count = topicCounts[postTopic] ?? 0;
                  if (count === 0 && postTopic !== "All Topics") return null;
                  return (
                    <button
                      key={postTopic}
                      onClick={() => setTopic(postTopic)}
                      className={[
                        "group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors border",
                        active
                          ? "bg-[#B7232A] text-white border-[#B7232A]"
                          : "bg-white text-[#0B1F3A]/80 border-[#0B1F3A]/15 hover:border-[#B7232A]/50 hover:text-[#B7232A]",
                      ].join(" ")}
                    >
                      <span>{postTopic}</span>
                      <span className={[
                        "text-[11px] font-semibold tabular-nums rounded-full px-1.5 py-0.5",
                        active ? "bg-white/20" : "bg-[#0B1F3A]/5 group-hover:bg-[#B7232A]/10",
                      ].join(" ")}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            {isFiltered && (
              <button
                onClick={() => { setCat("All"); setTopic("All Topics"); setQ(""); }}
                className="self-start lg:self-auto text-xs font-semibold text-[#0B1F3A]/60 hover:text-[#B7232A] underline-offset-4 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
          <p className="mt-3 text-xs text-[#0B1F3A]/55">
            Showing <span className="font-semibold text-[#0B1F3A]">{filtered.length}</span> of {visiblePosts.length} employer-focused articles
          </p>
        </div>
      </section>

      <section className="container pb-24">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-[#0B1F3A]/60">No articles match that search yet. Try another keyword.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.04}>
                <Link
                  href={`/resources/${post.slug}`}
                  className="group flex flex-col h-full rounded-2xl bg-white border border-[#0B1F3A]/10 overflow-hidden hover:-translate-y-0.5 hover:border-[#B7232A]/40 transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
                    <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold text-[#B7232A]"><span>{post.category}</span></div>
                    <h3 className="mt-3 font-display text-xl font-semibold text-[#0B1F3A] leading-snug">{post.title}</h3>
                    <p className="mt-2 text-[15px] text-[#0B1F3A]/70 flex-1">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between text-xs text-[#0B1F3A]/55">
                      <span>{new Date(post.datePublished).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</span>
                      <span>{post.readingMin} min</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section className="container pb-24">
        <Reveal>
          <div className="rounded-3xl bg-[#0B1F3A] text-[#FAF7F2] p-10 lg:p-14 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl lg:text-4xl font-semibold leading-tight">Ready to put this into practice?</h2>
              <p className="mt-3 text-white/75 max-w-2xl">Talk to our team about a screening program built for your industry, your volume, and the jurisdictions you actually hire in.</p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end gap-3">
              <Link href="/get-a-quote" className="btn-coral rounded-full px-6 py-3 font-semibold">Get started</Link>
              <Link href="/pricing" className="btn-ghost-cream rounded-full px-6 py-3 font-semibold">See pricing</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
