/*
 * PreciseHire — Resources / Blog content store
 *
 * Each post is authored as plain Markdown. Topics were chosen for HR/hiring-manager
 * search intent (high-volume, commercial-investigative queries) and rewritten to
 * showcase PreciseHire's expertise. Author defaults to "PreciseHire Team".
 *
 * Schema:
 *   slug         -> URL slug (kebab-case)
 *   title        -> H1 + <title>
 *   metaTitle    -> SEO <title> override (kept under 60 chars)
 *   description  -> meta description (kept under 160 chars)
 *   category     -> facet for filter chips
 *   tags         -> string[] for related-posts logic
 *   author       -> display name
 *   datePublished-> ISO date
 *   readingMin   -> integer estimated minutes
 *   image        -> hero image URL (existing service art reused for cohesion)
 *   excerpt      -> 1–2 sentence card preview
 *   markdown     -> full article body
 */

import { ASSETS } from "./site";

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  category: "Compliance" | "Hiring Tips" | "Industry" | "Product";
  tags: string[];
  author: string;
  datePublished: string;
  readingMin: number;
  image: string;
  excerpt: string;
  markdown: string;
};

export const POST_CATEGORIES = ["All", "Compliance", "Hiring Tips", "Industry", "Product"] as const;

export const POSTS: Post[] = [
  {
    slug: "fcra-compliant-background-checks-guide",
    title: "The Complete Guide to FCRA-Compliant Background Checks",
    metaTitle: "FCRA-Compliant Background Checks: Employer Guide (2026)",
    description:
      "Step-by-step FCRA compliance for employers — disclosures, authorizations, adverse action, and the documentation auditors actually ask for.",
    category: "Compliance",
    tags: ["FCRA", "Compliance", "Adverse Action"],
    author: "PreciseHire Team",
    datePublished: "2026-01-14",
    readingMin: 9,
    image: ASSETS.serviceCriminal,
    excerpt:
      "Most FCRA lawsuits don't hinge on the report — they hinge on the paperwork. Here's exactly what your hiring file needs to look like.",
    markdown: `## Why this matters

The Fair Credit Reporting Act (FCRA) is the single biggest source of class-action exposure in employment screening. Most cases settle not because a report was wrong, but because the **employer's process** had a gap — a missing standalone disclosure, a sloppy authorization, or an adverse action letter that went out a day too early.

This guide walks you through the entire compliant lifecycle, in the order events actually happen.

## Step 1 — The standalone disclosure

Before you order a report, the candidate must receive a **clear, conspicuous written disclosure** stating that a consumer report may be obtained for employment purposes. The word "standalone" is the trap: courts have repeatedly held that bundling the disclosure into an offer letter, an arbitration agreement, or even a paragraph of "additional terms" violates the statute.

> Best practice: a one-page document, no logos crowding the text, no liability waivers, no extraneous state-law language unless legally required to appear there.

## Step 2 — Written authorization

The candidate signs an authorization permitting the report. This can be on the same form as the disclosure, but it cannot include a release of liability.

## Step 3 — Ordering through a permissible-purpose CRA

PreciseHire is a Consumer Reporting Agency (CRA) under the FCRA. When you order, you are certifying — under FCRA §604(b)(1) — that you have a permissible purpose, you've made the required disclosures, and you'll comply with adverse action procedures if applicable.

## Step 4 — Reviewing the report

When the report comes back, treat any record as a **factor**, not a verdict. EEOC guidance (and most state laws) requires individualized assessment: the nature of the offense, time elapsed, and the nature of the job.

## Step 5 — Pre-adverse action

If you're considering not hiring based on the report, you must:

| Send | Contents | Wait |
|---|---|---|
| Pre-adverse action notice | Copy of the report + "A Summary of Your Rights Under the FCRA" | At least 5 business days (FTC guidance) |

The wait period gives the candidate time to dispute inaccurate information directly with PreciseHire.

## Step 6 — Final adverse action

If after the wait period you decide not to hire, you send a **final adverse action notice** that includes the CRA's name and contact info, a statement that the CRA didn't make the decision, and a notice of the candidate's right to a free additional copy of the report within 60 days.

## Documentation auditors look for

- Signed disclosure and authorization in the employee file
- Date stamps proving the 5-business-day window was honored
- The pre-adverse and final adverse letters themselves
- An internal "individualized assessment" note for any non-hire decision

## How PreciseHire helps

Every account includes a compliant disclosure/authorization template, automated pre-adverse and final adverse action letters, and a built-in 5-business-day clock. We can't give you legal advice — but we can make it nearly impossible to miss a step.

> **Important:** This article is informational and not legal advice. Consult employment counsel for your specific situation, especially in California, New York City, and Illinois where additional rules apply.
`
  },
  {
    slug: "how-long-does-a-background-check-take",
    title: "How Long Does a Background Check Take? (Honest 2026 Answer)",
    metaTitle: "How Long Does a Background Check Take? | PreciseHire",
    description:
      "Most employment background checks finish in hours, not days. Here's the honest breakdown by check type — and the three things that cause delays.",
    category: "Hiring Tips",
    tags: ["Turnaround", "Hiring"],
    author: "PreciseHire Team",
    datePublished: "2026-01-22",
    readingMin: 6,
    image: ASSETS.serviceEmployment,
    excerpt:
      "We pulled internal turnaround data on 50,000+ checks. The fast checks finish in minutes; the slow ones almost always have the same root cause.",
    markdown: `## The honest answer

For a typical SSN trace + national criminal + county criminal package, **70% of PreciseHire reports complete in under 4 hours**, and roughly 90% complete within one business day. But "background check" is a category, not a single test, and the math changes a lot depending on what you ordered.

## Turnaround by check type

| Check | Typical TAT | Notes |
|---|---|---|
| SSN trace | < 1 minute | Instant database lookup |
| National criminal database | < 5 minutes | Aggregated database |
| Sex offender registry | < 5 minutes | Aggregated database |
| County criminal (live court) | 1–24 hours | A court researcher pulls the record from the courthouse |
| Federal criminal | < 1 hour | Centralized PACER index |
| Motor vehicle record (MVR) | 1 minute – 3 days | Depends on the state DMV |
| Employment verification | 1–5 business days | Depends on the prior employer's HR responsiveness |
| Education verification | 1–7 business days | Schools and the National Student Clearinghouse |
| International criminal | 3–15 business days | Country-by-country |

## What actually causes delays

In our experience, slow reports almost always come from one of three places:

1. **Court closures.** A handful of U.S. counties still require in-person court visits and have backlogs. We track these and surface them in your dashboard before you order.
2. **Employer / school responsiveness on verifications.** A former employer that takes a week to confirm dates of employment is the single biggest source of late reports.
3. **Candidate-supplied information.** Misspelled names, wrong DOB, or a maiden name omitted means the search has to be re-run.

## How to make checks faster

- Order the right package — don't run a 7-year county criminal in 12 counties when a national + 2 counties is appropriate.
- Have the candidate complete their info digitally; the typo rate drops by ~60%.
- Use direct integrations (we connect to The Work Number for instant employment verification on most U.S. employees).

## When "instant" is a red flag

Any provider promising every report in 1 minute is selling you a database-only product. Those reports miss recent records and can produce **false negatives**. PreciseHire pairs database hits with primary-source court verification — a few minutes longer, dramatically more defensible.

Want a turnaround SLA built into your contract? Talk to our team — for high-volume accounts, we can put it in writing.
`
  },
  {
    slug: "ban-the-box-laws-by-state-2026",
    title: "Ban-the-Box Laws by State in 2026: An Employer Reference",
    metaTitle: "Ban-the-Box Laws by State 2026 | Employer Reference",
    description:
      "A current 50-state reference on ban-the-box and fair-chance hiring laws — what's covered, when you can ask, and where the traps are.",
    category: "Compliance",
    tags: ["Ban the Box", "Fair Chance", "State Law"],
    author: "PreciseHire Team",
    datePublished: "2026-02-04",
    readingMin: 8,
    image: ASSETS.serviceCriminal,
    excerpt:
      "Thirty-seven states and 150+ cities have fair-chance laws. The rule isn't 'never ask' — it's 'ask at the right time, with the right paperwork.'",
    markdown: `## What "ban the box" actually means

"Ban the box" refers to laws removing the criminal-history checkbox from job applications. Most fair-chance laws go further and regulate **when** in the hiring process you can ask, **what** you can consider, and **how** you must communicate the decision.

## Categories of laws

1. **Application-stage only.** No criminal-history question on the initial application. You can still run a background check after a conditional offer.
2. **Conditional-offer required.** You can't run the check (or, in some states, even ask) until after a written conditional job offer.
3. **Individualized assessment required.** Before rescinding an offer, you must consider the nature of the offense, time elapsed, and job-relatedness, in writing.
4. **Detailed adverse-action.** State-specific notice requirements that go beyond the federal FCRA.

## Highest-friction jurisdictions

| Jurisdiction | Type | Watch out for |
|---|---|---|
| California (statewide) | Conditional-offer + individualized assessment | 5-business-day pre-adverse window, written assessment |
| New York City | Fair Chance Act | Written individualized assessment, posting requirements |
| Illinois (statewide) | Conditional-offer + assessment | Applies to private employers ≥ 1 employee |
| Washington State | Conditional-offer | Limits on inquiries; written notice requirements |
| Philadelphia | Strict Fair Chance | 7-year lookback cap on convictions |
| Los Angeles County | Strict Fair Chance | Job posting language requirements |

## Common mistakes we see

- Asking about criminal history on a multi-state online application without geo-gating the question
- Using a single nationwide adverse-action letter that doesn't include CA/NYC required language
- Skipping the written individualized assessment because "we'd never disqualify someone for a minor offense" — the documentation is the protection

## How PreciseHire helps

Our platform geo-detects the candidate's location and surfaces the applicable state and city rules at the moment you start a check. Adverse action letters auto-populate the correct state-required language. You still need counsel for novel situations, but the day-to-day compliance is automated.

> **Important:** Laws change frequently. Confirm the current text with state and local counsel before relying on summaries.
`
  },
  {
    slug: "what-shows-up-on-an-employment-background-check",
    title: "What Shows Up on an Employment Background Check?",
    metaTitle: "What Shows Up on a Background Check? Employer Guide",
    description:
      "A plain-language breakdown of what employers see (and don't see) on a typical employment background check — and what candidates worry about.",
    category: "Hiring Tips",
    tags: ["Background Check Basics", "Hiring"],
    author: "PreciseHire Team",
    datePublished: "2026-02-18",
    readingMin: 7,
    image: ASSETS.serviceEmployment,
    excerpt:
      "Two audiences read this query: candidates who are nervous, and employers wondering what they're paying for. We answer for both.",
    markdown: `## A standard package, decoded

A typical "Standard" employment background check from PreciseHire includes:

- **Identity / SSN trace.** Confirms the candidate's name and addresses match their Social Security Number. This generates the list of counties to search.
- **National criminal database.** A search across an aggregated database of millions of records.
- **Sex offender registry.** All 50 states.
- **County criminal records.** Live court searches for the counties where the candidate has lived in the last 7 years (or longer in some states).
- **Federal criminal records.** Searches the U.S. district courts for federal-level offenses.

That's the floor. Many employers add: employment verification, education verification, motor vehicle record (MVR), drug screening, professional license verification, and credit (only when job-related and where legal).

## What does NOT show up

- **Arrests not leading to conviction**, in most jurisdictions. The FCRA permits reporting them for 7 years, but California, New York, and several other states prohibit reporting non-conviction information entirely for employment purposes.
- **Sealed and expunged records**, by definition.
- **Juvenile records**, in most cases.
- **Older convictions**, beyond the FCRA's 7-year lookback for non-convictions and salary thresholds (the famous "$75,000 rule" sunsets the lookback for higher-paid roles, but state law often overrides).
- **Credit score**. Background reports include credit history when ordered, but never a FICO score.
- **Social media activity.** Not in a standard report; "social media screening" is a separate, optional product with its own disclosures.

## What candidates worry about (and the truth)

- *"Will my parking tickets show up?"* — No. Civil infractions don't appear on a criminal report.
- *"What about a 10-year-old DUI?"* — Convictions can be reported indefinitely under federal law, but state law may limit the lookback. In California, for example, convictions older than 7 years generally aren't reportable.
- *"Will my old employer say something bad?"* — Most large employers only confirm dates and title. Smaller employers will sometimes share a lot more, which is why we record verification calls.

## Why packages differ by role

A warehouse worker, a CDL driver, and a CFO need different checks. A driver needs an MVR. A CFO probably needs credit and a 10-year federal search. A daycare worker needs the FBI fingerprint check on top of standard county searches. We help match the package to the role on every account.
`
  },
  {
    slug: "mvr-vs-cdl-driving-record-checks",
    title: "MVR vs. CDL Driving Record Checks: Which One Do You Need?",
    metaTitle: "MVR vs. CDL Driving Record Checks: What to Order",
    description:
      "Driver hiring is high-stakes and heavily regulated. Here's when you need a standard MVR, a PSP, or a full DOT-compliant CDL package.",
    category: "Industry",
    tags: ["MVR", "CDL", "Transportation", "DOT"],
    author: "PreciseHire Team",
    datePublished: "2026-03-01",
    readingMin: 6,
    image: ASSETS.serviceMVR,
    excerpt:
      "If you're hiring drivers, your insurance carrier and the FMCSA care about specific records. Ordering the wrong package can void coverage.",
    markdown: `## The three products

| Product | What it shows | When to use |
|---|---|---|
| **Standard MVR** | License status, violations, suspensions, accidents from the state DMV | Any role that drives company vehicles or personal vehicles for company business |
| **PSP (Pre-Employment Screening Program)** | 5 years of FMCSA crash data + 3 years of roadside inspection data | CDL drivers — a leading indicator of safety risk |
| **Full DOT package** | MVR + PSP + drug & alcohol Clearinghouse query + employment verification + DOT physical | Required for CDL drivers under 49 CFR Part 391 |

## What insurance carriers actually require

Most commercial auto policies require an MVR pulled annually for every driver and **before** any new driver gets behind the wheel. The MVR has to be from a state DMV — a "national driving record database" alone won't satisfy underwriting.

For fleets with CDL drivers, carriers increasingly want to see PSP data on file, even though it isn't strictly required by the FMCSA at hire (it's required pre-employment under §391.23(d)).

## The Drug & Alcohol Clearinghouse

Since January 2020, every CDL employer has been required to query the FMCSA Drug & Alcohol Clearinghouse before hiring a CDL driver and annually thereafter. It's a separate system from drug testing — it's the federal record of positive results and refusals. PreciseHire integrates with the Clearinghouse so the query is part of your standard CDL workflow.

## Pricing reality

Standard MVRs vary from a few dollars to ~$25 depending on the state. A few states (e.g., Pennsylvania, Washington) have notably high DMV fees and slower turnaround. We pass through state fees at cost and surface estimated cost before you order.

## Best practice for fleet operators

1. Run an MVR pre-hire **and** annually for every driver (set up automatic recurring orders).
2. For CDL roles, run a PSP and Clearinghouse query at hire and annually.
3. Document a written motor-vehicle records policy with your maximum acceptable violation thresholds.
4. Keep MVRs in the driver qualification file for the FMCSA-required retention period.

We can help you set up the recurring schedule and the DQ-file storage in one workflow.
`
  },
  {
    slug: "drug-testing-legal-marijuana-states",
    title: "Drug Testing in Legal-Marijuana States: What Employers Can Still Do",
    metaTitle: "Drug Testing in Legal-Marijuana States (2026 Guide)",
    description:
      "Recreational marijuana is legal in 24 states, but you can still drug test — within rules. A practical guide for employers.",
    category: "Compliance",
    tags: ["Drug Testing", "Marijuana", "State Law"],
    author: "PreciseHire Team",
    datePublished: "2026-03-15",
    readingMin: 7,
    image: ASSETS.serviceDrug,
    excerpt:
      "Legal recreational use does not equal a free pass at work. The right drug-testing policy in 2026 is more nuanced — but absolutely still legal.",
    markdown: `## The landscape in 2026

Twenty-four U.S. states (plus D.C.) have legalized recreational marijuana. Many of those states (California, New York, New Jersey, Connecticut, Washington) have also passed **employment protections** that limit when you can act on a positive marijuana test.

But none of those states prohibit drug testing entirely. Here's what's still legal almost everywhere:

## Always permissible

- **Pre-employment testing for safety-sensitive roles** (DOT-regulated, healthcare, child care, heavy equipment, firearms).
- **Post-accident testing** for any injury involving a vehicle or equipment.
- **Reasonable-suspicion testing** when supervisors document specific impairment indicators.
- **Federal contractor / DOT** testing — federal law preempts state legalization.

## More nuanced

- **Random testing** — generally fine for safety-sensitive, increasingly restricted for non-safety-sensitive roles in protected states.
- **Pre-employment testing for non-safety-sensitive roles** — restricted in CA, NY, NV, NJ, WA, and CT. Most of these states still allow testing, but prohibit refusing to hire **solely** because of a positive marijuana result.

## What "impairment" means now

The big shift: tests that detect THC metabolites prove past use, not current impairment. Many state laws now require evidence of **on-the-job impairment** (slurred speech, erratic behavior, smell, possession) to take adverse action against an employee — not just a positive lab result.

This is why **supervisor training** is now as important as the testing itself. Document, document, document.

## A defensible 2026 policy

1. Identify which roles are safety-sensitive — write the list.
2. Test all safety-sensitive roles pre-hire and after accidents. Test others pre-hire only where state law allows.
3. Train supervisors on reasonable-suspicion documentation.
4. Pair positive results with impairment observations before terminating in protected states.
5. Use SAMHSA-certified labs and DOT-compliant collection — PreciseHire's network handles this automatically.

## Industries with their own rules

- **Federal contractors** under the Drug-Free Workplace Act — no change; full prohibition stands.
- **CDL drivers** under 49 CFR Part 382 — no change; full prohibition stands.
- **Healthcare** — depends on state nursing/medical board policy; usually prohibits use.

> Counsel review is non-negotiable for the multi-state employer. We can connect you with employment-law partners we trust.
`
  },
  {
    slug: "adverse-action-step-by-step",
    title: "Adverse Action: A Step-by-Step Compliance Walkthrough",
    metaTitle: "FCRA Adverse Action Process: Step-by-Step Walkthrough",
    description:
      "The single highest-risk moment in hiring is rescinding an offer. Here's exactly how to do it without buying a class-action.",
    category: "Compliance",
    tags: ["Adverse Action", "FCRA", "Compliance"],
    author: "PreciseHire Team",
    datePublished: "2026-03-29",
    readingMin: 8,
    image: ASSETS.serviceCriminal,
    excerpt:
      "Class-action plaintiffs' firms aren't looking for bad reports — they're looking for sloppy adverse-action paperwork. Here's how to be unsue-able.",
    markdown: `## Why adverse action is the trap

You did everything right: standalone disclosure, written authorization, FCRA-compliant CRA. Then a county-level conviction comes back. You decide not to hire. You send the candidate a one-line email saying "we've decided not to move forward" — and three months later you're served.

The FCRA requires a **specific two-step process** before and after any decision based wholly or partly on a consumer report.

## Step 1 — Pre-adverse action notice

Before making the final decision, you must provide the candidate with:

1. A copy of the consumer report
2. "A Summary of Your Rights Under the Fair Credit Reporting Act" (the FTC-published document)
3. Optional but strongly recommended: any state-specific summaries (CA, NY, etc.)

The notice should clearly state that you are *considering* not moving forward based on the report, and explain how to dispute the information directly with the CRA.

## Step 2 — The waiting period

Federal law doesn't prescribe an exact number of days, but FTC opinion letters and case law have settled on **5 business days** as the de-facto standard. During this window:

- The candidate can dispute information with the CRA
- The CRA must reinvestigate within 30 days
- You must not finalize the decision

## Step 3 — Individualized assessment

In jurisdictions with fair-chance laws (CA, NYC, IL, WA, and many cities), you must perform — and **document in writing** — an individualized assessment considering:

- The nature and gravity of the offense
- Time elapsed since the offense or completion of sentence
- The nature of the job sought

A written assessment is the single most-protective document in your file. Keep it.

## Step 4 — Final adverse action notice

After the waiting period, if the decision stands, send the final adverse action notice. It must include:

- A statement that the adverse action was based, in whole or in part, on the consumer report
- The name, address, and phone number of the CRA
- A statement that the CRA did not make the decision and cannot give reasons for it
- A notice of the candidate's right to a free additional copy of the report from the CRA within 60 days
- A notice of the right to dispute the accuracy or completeness of the report

## The mistakes that get sued

- Skipping pre-adverse and going straight to the final notice
- Sending pre-adverse and final adverse on the same day
- Forgetting to attach "A Summary of Your Rights"
- A vague reason like "based on background screening" with no CRA contact info
- No written individualized assessment in jurisdictions that require it

## How PreciseHire automates this

When you mark a report as "considering adverse action" in our platform:

1. The pre-adverse letter generates automatically with the correct attachments
2. A 5-business-day timer starts and is visible in your dashboard
3. After 5 business days, the final adverse letter unlocks
4. The full audit trail is retained for the FCRA's required period

You still own the decision and the assessment. We make the paperwork unmissable.

> Not legal advice. Always consult employment counsel for sensitive cases.
`
  }
];

// Lightweight type used for the combined index (excludes inline `markdown`).
// Hand-written POSTS still carry markdown inline; migrated entries fetch it lazily.
export type PostIndex = Omit<Post, "markdown"> & { legacySlug?: string };

import { MIGRATED_POSTS } from "./migrated_posts";

// Strip markdown from hand-written POSTS for the combined index
const HANDWRITTEN_INDEX: PostIndex[] = POSTS.map(({ markdown: _markdown, ...rest }) => rest);

// Combined index, hand-written first (newest editorial), then migrated by date
export const ALL_POSTS_INDEX: PostIndex[] = [
  ...HANDWRITTEN_INDEX,
  ...MIGRATED_POSTS,
].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

export function postsByCategory(cat: typeof POST_CATEGORIES[number]) {
  if (cat === "All") return ALL_POSTS_INDEX;
  return ALL_POSTS_INDEX.filter((p) => p.category === cat);
}

export function relatedPosts(slug: string, limit = 3): PostIndex[] {
  const target = ALL_POSTS_INDEX.find((p) => p.slug === slug);
  if (!target) return ALL_POSTS_INDEX.slice(0, limit);
  const scored = ALL_POSTS_INDEX.filter((p) => p.slug !== slug)
    .map((p) => {
      const sharedTags = p.tags.filter((t) => target.tags.includes(t)).length;
      const sameCategory = p.category === target.category ? 2 : 0;
      return { p, score: sharedTags * 3 + sameCategory };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.p);
}

// Returns combined index entry (no inline body for migrated posts)
export function findPost(slug: string): PostIndex | undefined {
  return ALL_POSTS_INDEX.find((p) => p.slug === slug);
}

// Returns the inline markdown for hand-written POSTS, or null if it must be lazy-loaded.
export function getInlineMarkdown(slug: string): string | null {
  return POSTS.find((p) => p.slug === slug)?.markdown ?? null;
}
