/*
 * PreciseHire — Resource (Blog Post) detail
 * Style: Trusted Modernism. Editorial layout with a wide hero image, generous prose,
 * a "related" rail at the bottom, and BlogPosting JSON-LD.
 *
 * Note: We render Markdown via the Streamdown package that ships with the template.
 */
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Calendar, Clock, Loader2 } from "lucide-react";
import { Streamdown } from "streamdown";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { COMPANY } from "@/content/site";
import { findPost, relatedPosts, getInlineMarkdown } from "@/content/posts";
import { resolveAuthor } from "@/content/authors";
import NotFound from "./NotFound";

export default function ResourcePost() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const post = findPost(slug);
  const [, navigate] = useLocation();

  // Hand-written posts ship inline; migrated posts are fetched from /posts/<slug>.md
  const inline = post ? getInlineMarkdown(post.slug) : null;
  const [body, setBody] = useState<string | null>(inline);
  const [bodyError, setBodyError] = useState(false);

  useEffect(() => {
    if (!post) return;
    if (inline !== null) {
      setBody(inline);
      setBodyError(false);
      return;
    }
    let cancelled = false;
    setBody(null);
    setBodyError(false);
    fetch(`/posts/${post.slug}.md`)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((text) => { if (!cancelled) setBody(text); })
      .catch(() => { if (!cancelled) setBodyError(true); });
    return () => { cancelled = true; };
  }, [post, inline]);

  // scroll to top on slug change so the new article doesn't open mid-page
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [slug]);

  if (!post) return <NotFound />;

  const related = relatedPosts(post.slug, 3);
  const url = `https://precisehire.com/resources/${post.slug}`;
  const author = resolveAuthor(post.authorSlug);

  // FAQPage schema is only injected for posts where we hand-curate the FAQ.
  // For the fast-background-check pillar, this captures the seven questions in the
  // article's FAQ section so Google can surface them as rich results.
  const FAQ_BY_SLUG: Record<string, Array<{ q: string; a: string }>> = {
    "fast-background-check-employer-guide": [
      {
        q: "How accurate are fast background checks?",
        a: "Accuracy depends on whether the consumer reporting agency verifies database hits at the source before reporting them. A database-only search that reports hits without verification is fast but inaccurate. A reputable CRA source-verifies every hit before reporting it, which adds a few hours to a few days but produces results that are accurate at the moment the report is delivered.",
      },
      {
        q: "Can I request a fast background check for an employee or tenant?",
        a: "Yes, but the report must be ordered through a registered consumer reporting agency that complies with the FCRA, and the candidate must sign the FCRA disclosure and authorization before the report is ordered. The 'instant' online lookups that appear at the top of search results are not FCRA consumer reports and cannot legally be used for an employment or tenancy decision.",
      },
      {
        q: "How long does a fast background check typically take?",
        a: "For a clean candidate file in a U.S. county with electronic court access, tier-one components (identity, SSN trace, national criminal with source verification, federal criminal, sex-offender, motor vehicle record, watchlist, Work Number employment verification) return inside 12 to 24 hours. Tier-two components (county criminal in manual-courthouse counties, direct-contact verifications, negative drug screens) add another 24 to 48 hours. The full FCRA-compliant report on a typical file closes out in 2 to 4 business days.",
      },
      {
        q: "Are fast background checks available for all types of screenings?",
        a: "No. Some components cannot be sped up below the speed of their underlying data source. A non-negative drug screen requires laboratory confirmation and medical-review-officer review. An international education verification depends on a registrar's office in another country. A fast background check is always a fast version of the components that can be fast.",
      },
      {
        q: "What is the risk of relying solely on fast background checks?",
        a: "Three risk buckets: FCRA accuracy exposure under \u00a71681e(b) and the \u00a7613 currency rule, FCRA process exposure under \u00a71681b(b) (disclosure, authorization, pre-adverse and final adverse-action sequence), and Title VII disparate-impact exposure under the EEOC's 2012 enforcement guidance on the consideration of arrest and conviction records.",
      },
      {
        q: "What is the difference between a fast background check and an instant background check?",
        a: "A fast background check is a regulated FCRA consumer report produced by a CRA, with source verification on database hits, delivered on a compressed timeline. An instant background check is a consumer-grade public-records lookup with no source verification, sold for personal curiosity, and not legally usable for employment or tenancy decisions in the United States.",
      },
      {
        q: "How fast can PreciseHire turn around a background check?",
        a: "For a clean candidate file in a U.S. metropolitan area with electronic court coverage, our median tier-one turnaround is 12 hours and our median full-report turnaround is 36 to 48 hours. Files that touch manual-courthouse counties, international verifications, or non-negative drug screens extend into the following week on the slow tail.",
      },
    ],
  };

  const jsonLd: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: post.image,
      datePublished: post.datePublished,
      dateModified: post.datePublished,
      author: {
        "@type": "Person",
        name: author.name,
        jobTitle: author.role,
        worksFor: { "@type": "Organization", name: COMPANY.legalName },
        url: `https://precisehire.com/authors/${author.slug}`,
      },
      publisher: {
        "@type": "Organization",
        name: COMPANY.legalName,
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: post.tags.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://precisehire.com/" },
        { "@type": "ListItem", position: 2, name: "Resources", item: "https://precisehire.com/resources" },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  const faq = FAQ_BY_SLUG[post.slug];
  if (faq && faq.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    });
  }

  return (
    <>
      <SEO
        title={post.metaTitle}
        description={post.description}
        canonical={url}
        image={post.image}
        jsonLd={jsonLd}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="container pt-10 pb-2 text-sm text-[#0B1F3A]/55">
        <Link href="/" className="hover:text-[#B7232A]">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/resources" className="hover:text-[#B7232A]">Resources</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0B1F3A]/80 truncate">{post.title}</span>
      </nav>

      {/* Header */}
      <header className="container pt-6 pb-10 max-w-3xl">
        <Reveal>
          <p className="eyebrow">
            <span className="inline-block size-1.5 rounded-full bg-[#B7232A]" /> {post.category}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-display text-[2.4rem] sm:text-5xl font-semibold tracking-tight text-[#0B1F3A] leading-[1.1]">
            {post.title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#0B1F3A]/65">
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4" />
              {new Date(post.datePublished).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4" /> {post.readingMin} min read
            </span>
            <span>By <span className="text-[#0B1F3A]">{author.name}</span></span>
          </div>
        </Reveal>
      </header>

      {/* Hero image */}
      <div className="container pb-12">
        <Reveal>
          <div className="aspect-[16/8] overflow-hidden rounded-3xl bg-[#FAF7F2] border border-[#0B1F3A]/10">
            <img src={post.image} alt="" className="h-full w-full object-cover" />
          </div>
        </Reveal>
      </div>

      {/* Body */}
      <article className="container pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg prose-precisehire max-w-none">
            {body !== null ? (
              <Streamdown>{body}</Streamdown>
            ) : bodyError ? (
              <p className="text-[#0B1F3A]/70">
                We couldn't load this article. Try refreshing, or <Link href="/resources" className="text-[#B7232A] underline">browse all resources</Link>.
              </p>
            ) : (
              <div className="flex items-center gap-3 text-[#0B1F3A]/55">
                <Loader2 className="size-5 animate-spin" /> Loading article…
              </div>
            )}
          </div>

          {/* Compliance category audit CTA */}
          {post.category === "Compliance" && (
            <div className="mt-12 rounded-2xl bg-[#0B1F3A] text-white p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:items-center">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#E26C72]">
                  Want a second pair of eyes?
                </p>
                <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold leading-snug">
                  We will audit your adverse-action workflow in 15 minutes — free.
                </h3>
                <p className="mt-2 text-[14.5px] text-white/70 leading-relaxed">
                  Our compliance desk walks through your disclosure,
                  authorization, pre-adverse template, dispute handling, and
                  continuous-monitoring posture. Written summary, statute
                  citations, no sales follow-up unless you ask.
                </p>
              </div>
              <Link
                href="/compliance/audit"
                className="btn-coral shrink-0 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[13.5px] font-semibold whitespace-nowrap"
              >
                Book the audit
              </Link>
            </div>
          )}

          {/* Editorial-team note */}
          <div className="mt-12 rounded-2xl border border-[#0B1F3A]/10 bg-[#FFFCF7] p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-[#B7232A]">About this article</p>
            <p className="mt-3 text-[14.5px] text-[#0B1F3A]/80 leading-relaxed">
              Researched and written by the {author.name}. We cite primary sources — statutes, regulations, agency guidance, and case law — on every claim. PreciseHire is owner-operated and U.S.-based; we have screened candidates for U.S. employers since 2003. If anything in this article is wrong, please <Link href="/contact" className="text-[#B7232A] underline">tell us</Link> and we will correct it.
            </p>
            {author.credentials.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {author.credentials.map((c) => (
                  <span key={c} className="rounded-full bg-white border border-[#0B1F3A]/12 px-3 py-1 text-[11.5px] font-medium text-[#0B1F3A]/70">
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Tags + back link */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#0B1F3A]/10 pt-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-[#FAF7F2] border border-[#0B1F3A]/10 px-3 py-1 text-xs font-medium text-[#0B1F3A]/70">
                  {t}
                </span>
              ))}
            </div>
            <button
              onClick={() => navigate("/resources")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B7232A] hover:gap-3 transition-all"
            >
              <ArrowLeft className="size-4" /> Back to all resources
            </button>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="container pb-24">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-[#0B1F3A]">Keep reading</h2>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-3 gap-6 lg:gap-8">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  href={`/resources/${p.slug}`}
                  className="group flex flex-col h-full rounded-2xl bg-white border border-[#0B1F3A]/10 overflow-hidden hover:border-[#B7232A]/40 transition-colors"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
                    <img src={p.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-xs uppercase tracking-[0.15em] font-semibold text-[#B7232A]">{p.category}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-[#0B1F3A] leading-snug">{p.title}</h3>
                    <p className="mt-2 text-sm text-[#0B1F3A]/65 flex-1">{p.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#B7232A]">
                      Read article <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container pb-24">
        <Reveal>
          <div className="rounded-3xl bg-[#0B1F3A] text-[#FAF7F2] p-10 lg:p-14 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl lg:text-4xl font-semibold leading-tight">
                Want screening built around how you actually hire?
              </h2>
              <p className="mt-3 text-white/75 max-w-2xl">
                We'll design a package that fits your industry, your volume, and the jurisdictions you operate in — without locking you into a long contract.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end gap-3">
              <Link href="/talk-to-an-expert" className="btn-coral rounded-full px-6 py-3 font-semibold">
                Talk to a specialist
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
