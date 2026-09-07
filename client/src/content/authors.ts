/*
 * PreciseHire — Authors directory
 *
 * Single source of truth for blog post bylines. The site is owner-operated
 * and we do not publish fictional individual bylines. All posts are
 * attributed to the PreciseHire Editorial Team.
 *
 * The "mark-cromwell" key is retained ONLY so that legacy posts in posts.ts
 * which still reference authorSlug: "mark-cromwell" resolve cleanly to the
 * editorial-team byline without requiring a migration of every post.
 */

export type Author = {
  slug: string;
  name: string;
  role: string;
  shortBio: string;
  longBio: string;
  credentials: string[];
  photo: string;
  linkedIn?: string;
};

const EDITORIAL_TEAM: Author = {
  slug: "precisehire-team",
  name: "PreciseHire Editorial Team",
  role: "Compliance & Operations",
  shortBio:
    "The PreciseHire Editorial Team is the U.S.-based compliance and operations desk that runs the company day to day. We write the things we wish vendors would have written for us when we were on the buying side.",
  longBio:
    "The PreciseHire Editorial Team is the in-house compliance and operations desk that runs the company day to day. Owner-operated and U.S.-based, we publish under a single team byline because the work — FCRA workflow design, adverse-action sequencing, source-of-record verification, ATS integration, and state ban-the-box tracking — is the work of the whole desk, not the work of any one specialist. We write the kind of operational, regulation-grounded posts we wished vendors had written for us when we were on the buying side of pre-employment screening.",
  credentials: [
    "U.S.-based editorial desk",
    "PBSA member organization",
    "Owner-operated since 2003",
  ],
  photo:
    "/images/operations-team.webp",
};

export const AUTHORS: Record<string, Author> = {
  "precisehire-team": EDITORIAL_TEAM,
  // Legacy alias — keeps existing post.authorSlug values resolving without a
  // bulk rewrite. New posts should use "precisehire-team".
  "mark-cromwell": EDITORIAL_TEAM,
};

export function findAuthor(slug: string | undefined | null): Author | undefined {
  if (!slug) return undefined;
  return AUTHORS[slug];
}

/** Resolve a post's author with graceful fallback to the team byline. */
export function resolveAuthor(authorSlug?: string): Author {
  return findAuthor(authorSlug) ?? EDITORIAL_TEAM;
}
