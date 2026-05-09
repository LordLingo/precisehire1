/*
 * PreciseHire — Resource (Blog Post) detail
 * Style: Trusted Modernism. Editorial layout with a wide hero image, generous prose,
 * a "related" rail at the bottom, and BlogPosting JSON-LD.
 *
 * Note: We render Markdown via the Streamdown package that ships with the template.
 */
import { Link, useParams, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { Streamdown } from "streamdown";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { COMPANY } from "@/content/site";
import { findPost, relatedPosts } from "@/content/posts";
import NotFound from "./NotFound";

export default function ResourcePost() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const post = findPost(slug);
  const [, navigate] = useLocation();

  if (!post) return <NotFound />;

  const related = relatedPosts(post.slug, 3);
  const url = `https://precisehire.com/resources/${post.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: post.image,
      datePublished: post.datePublished,
      dateModified: post.datePublished,
      author: { "@type": "Organization", name: post.author },
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
            <span>By {post.author}</span>
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
            <Streamdown>{post.markdown}</Streamdown>
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
              <Link href="/contact" className="btn-coral rounded-full px-6 py-3 font-semibold">
                Talk to sales
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
