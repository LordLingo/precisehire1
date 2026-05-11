/*
 * PreciseHire — Author profile page
 * Style: Trusted Modernism. Cream surface, navy serif display, coral accents.
 *
 * Renders an author's full bio, credentials, and a card list of every post
 * they've published. JSON-LD includes a Person + ItemList for the post index.
 */
import { Link, useParams } from "wouter";
import { ArrowRight, Mail, Phone } from "lucide-react";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import { findAuthor } from "@/content/authors";
import { POSTS } from "@/content/posts";
import { COMPANY } from "@/content/site";
import NotFound from "./NotFound";

export default function AuthorPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const author = findAuthor(slug);
  if (!author) return <NotFound />;

  const authoredPosts = POSTS.filter((p) => p.authorSlug === author.slug)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));

  const url = `https://precisehire.com/authors/${author.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      description: author.longBio,
      image: author.photo,
      url,
      worksFor: { "@type": "Organization", name: COMPANY.legalName },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: authoredPosts.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://precisehire.com/resources/${p.slug}`,
        name: p.title,
      })),
    },
  ];

  return (
    <>
      <SEO
        title={`${author.name}, ${author.role} — PreciseHire`}
        description={author.shortBio}
        canonical={url}
        image={author.photo}
        jsonLd={jsonLd}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="container pt-10 pb-2 text-sm text-[#0B1F3A]/55">
        <Link href="/" className="hover:text-[#B7232A]">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/resources" className="hover:text-[#B7232A]">Resources</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0B1F3A]/80">{author.name}</span>
      </nav>

      {/* Profile header */}
      <header className="container pt-6 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="relative">
                <img
                  src={author.photo}
                  alt={author.name}
                  className="w-full max-w-[360px] rounded-[28px] border border-[#0B1F3A]/10 object-cover aspect-square"
                />
                <span className="absolute -bottom-3 left-6 inline-flex items-center px-3 py-1 rounded-full bg-[#B7232A] text-white text-[11px] font-semibold uppercase tracking-[0.14em]">
                  PreciseHire byline
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <p className="eyebrow"><span className="inline-block size-1.5 rounded-full bg-[#B7232A]" /> Author</p>
              <h1 className="display-xl mt-4 text-[#0B1F3A]">{author.name}</h1>
              <p className="mt-3 font-display text-xl text-[#0B1F3A]/70">{author.role}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-[#0B1F3A]/80 leading-relaxed max-w-2xl">
                {author.longBio}
              </p>
            </Reveal>
            {author.credentials.length > 0 && (
              <Reveal delay={0.15}>
                <div className="mt-6 flex flex-wrap gap-2">
                  {author.credentials.map((c) => (
                    <span key={c} className="rounded-full bg-white border border-[#0B1F3A]/12 px-3 py-1 text-[12px] font-medium text-[#0B1F3A]/75">
                      {c}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-coral inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
                  <Mail className="size-4" /> Reach the compliance desk
                </Link>
                <a href={`tel:${COMPANY.phoneRaw}`} className="btn-ghost-navy inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
                  <Phone className="size-4" /> {COMPANY.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* Posts by this author */}
      <section className="container pb-24">
        <Reveal>
          <h2 className="display-md text-[#0B1F3A]">
            {authoredPosts.length > 0
              ? `Articles by ${author.name.split(" ")[0]}`
              : `${author.name.split(" ")[0]} hasn't published yet`}
          </h2>
        </Reveal>

        {authoredPosts.length === 0 ? (
          <Reveal delay={0.05}>
            <p className="mt-4 text-[#0B1F3A]/70 max-w-xl">
              Their first piece is in the editorial queue. In the meantime, browse{" "}
              <Link href="/resources" className="text-[#B7232A] underline">all PreciseHire resources</Link>.
            </p>
          </Reveal>
        ) : (
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {authoredPosts.map((p, i) => (
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
                    <div className="mt-4 flex items-center justify-between text-[12px] text-[#0B1F3A]/55">
                      <span>{new Date(p.datePublished).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span>{p.readingMin} min read</span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#B7232A]">
                      Read article <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
