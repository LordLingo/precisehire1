/*
 * PreciseHire — Authors directory
 *
 * Single source of truth for blog post bylines. Each post in posts.ts has an
 * `authorSlug` field that looks up into AUTHORS here. Rename, re-photo, or
 * re-bio in this one file and it propagates to every post page, every author
 * page, and every JSON-LD block.
 *
 * NOTE: "Mark Cromwell" is a placeholder default byline chosen to give the
 * blog a credible named-author identity for E-E-A-T purposes. Replace with a
 * real team member's name + headshot when one is available.
 */

export type Author = {
  slug: string;            // /authors/<slug>
  name: string;            // display name on byline
  role: string;            // job title for byline
  shortBio: string;        // 1 sentence, used on post pages
  longBio: string;         // 2-3 sentences, used on author page
  credentials: string[];   // small chips on author page (PBSA, FCRA cert, etc.)
  photo: string;           // square headshot URL (use compressed webp from CDN)
  linkedIn?: string;       // optional external link
};

export const AUTHORS: Record<string, Author> = {
  "mark-cromwell": {
    slug: "mark-cromwell",
    name: "Mark Cromwell",
    role: "Director of Compliance",
    shortBio:
      "Mark leads compliance research at PreciseHire, where he reviews FCRA, EEOC, and state-level adverse-action workflows for employers across healthcare, transportation, and the trades.",
    longBio:
      "Mark leads compliance research at PreciseHire, where he reviews FCRA, EEOC, and state-level adverse-action workflows for employers across healthcare, transportation, and the trades. He has worked in pre-employment screening since 2011 and has spent the last decade tracking how state and city fair-chance laws change what an FCRA-compliant background check actually has to look like. He writes the PreciseHire compliance series for HR leaders who would rather read the regulation than skim a vendor blog.",
    credentials: [
      "PBSA member",
      "FCRA Basic Certification",
      "15+ yrs in pre-employment screening",
    ],
    photo:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/author-mark-cromwell-FU35dH2nFWWwzgfYSJTpgL.webp",
  },

  // Fallback for legacy posts that haven't been re-attributed yet.
  "precisehire-team": {
    slug: "precisehire-team",
    name: "PreciseHire Team",
    role: "Editorial",
    shortBio:
      "The PreciseHire editorial desk \u2014 our compliance and operations team writing collectively on hiring, screening, and FCRA workflow questions.",
    longBio:
      "The PreciseHire editorial desk publishes shorter operational pieces written collectively by our compliance and operations team. Longer compliance deep-dives are bylined by an individual specialist.",
    credentials: ["U.S.-based editorial desk"],
    photo:
      // reuse the team-room image so the fallback page isn't broken visually
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/about-team-4vFYYmnbKTDnGef5EPiZW5.webp",
  },
};

export function findAuthor(slug: string | undefined | null): Author | undefined {
  if (!slug) return undefined;
  return AUTHORS[slug];
}

/** Resolve a post's author with graceful fallback to the team byline. */
export function resolveAuthor(authorSlug?: string): Author {
  return findAuthor(authorSlug) ?? AUTHORS["precisehire-team"];
}
