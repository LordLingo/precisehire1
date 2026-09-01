import { Link } from "wouter";
import { Calendar, Clock } from "lucide-react";
import { Streamdown } from "streamdown";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";
import {
  BACKGROUND_CHECK_TURNAROUND_TIME_MARKDOWN,
  BACKGROUND_CHECK_TURNAROUND_TIME_POST as post,
} from "@/content/background_check_turnaround_time_post";
import { resolveAuthor } from "@/content/authors";

export default function BackgroundCheckTurnaroundTimeGuide() {
  const author = resolveAuthor(post.authorSlug);
  const url = `https://precisehire.com/resources/${post.slug}`;

  return (
    <>
      <SEO
        title={post.metaTitle}
        description={post.description}
        canonical={url}
        image={post.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: post.image,
          datePublished: post.datePublished,
          dateModified: post.datePublished,
          author: { "@type": "Organization", name: author.name },
          publisher: { "@type": "Organization", name: "Precise Hire" },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          keywords: post.tags.join(", "),
        }}
      />

      <nav aria-label="Breadcrumb" className="container pt-10 pb-2 text-sm text-[#0B1F3A]/55">
        <Link href="/" className="hover:text-[#B7232A]">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/resources" className="hover:text-[#B7232A]">Resources</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0B1F3A]/80 truncate">{post.title}</span>
      </nav>

      <header className="container pt-6 pb-10 max-w-4xl">
        <Reveal>
          <p className="eyebrow"><span className="inline-block size-1.5 rounded-full bg-[#B7232A]" /> {post.category}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-display text-[2.4rem] sm:text-5xl font-semibold tracking-tight text-[#0B1F3A] leading-[1.1]">{post.title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#0B1F3A]/65">
            <span className="inline-flex items-center gap-2"><Calendar className="size-4" />{new Date(post.datePublished).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</span>
            <span className="inline-flex items-center gap-2"><Clock className="size-4" /> {post.readingMin} min read</span>
            <span>By <span className="text-[#0B1F3A]">{author.name}</span></span>
          </div>
        </Reveal>
      </header>

      <div className="container pb-12">
        <Reveal>
          <div className="aspect-[16/8] overflow-hidden rounded-3xl bg-[#FAF7F2] border border-[#0B1F3A]/10">
            <img src={post.image} alt="" className="h-full w-full object-cover" />
          </div>
        </Reveal>
      </div>

      <article className="container pb-20">
        <div className="mx-auto max-w-4xl prose prose-lg prose-precisehire max-w-none">
          <Streamdown>{BACKGROUND_CHECK_TURNAROUND_TIME_MARKDOWN}</Streamdown>
        </div>
        <div className="mx-auto max-w-4xl mt-12 rounded-2xl bg-[#0B1F3A] text-white p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:items-center">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#E26C72]">Background check turnaround review</p>
            <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold leading-snug">Are screening delays pushing back your start dates?</h3>
            <p className="mt-2 text-[14.5px] text-white/70 leading-relaxed">Send us your current package and a few delayed-order examples. We can map the bottlenecks and compare a faster workflow.</p>
          </div>
          <Link href="/talk-to-an-expert" className="btn-coral shrink-0 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[13.5px] font-semibold whitespace-nowrap">Review turnaround</Link>
        </div>
      </article>
    </>
  );
}
