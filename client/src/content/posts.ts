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
  author: string;          // legacy display string — still rendered if no authorSlug
  authorSlug?: string;     // preferred: resolves into AUTHORS in /content/authors.ts
  datePublished: string;
  readingMin: number;
  image: string;
  excerpt: string;
  markdown: string;
};

export const POST_CATEGORIES = ["All", "Compliance", "Hiring Tips", "Industry", "Product"] as const;

// Fine-grained topic facet derived from each post's title + tags.
// Sits alongside the broader category chips so users can filter by service area.
export const POST_TOPICS = [
  "All Topics",
  "Criminal Records",
  "Drug & Alcohol",
  "Driving Records (MVR)",
  "Education",
  "Employment & Identity",
  "International",
  "General Hiring",
] as const;
export type PostTopic = typeof POST_TOPICS[number];

export function deriveTopic(p: { title: string; tags: string[] }): Exclude<PostTopic, "All Topics"> {
  const blob = (p.title + " " + p.tags.join(" ")).toLowerCase();
  // Order matters — most specific first; Criminal is broadest among service buckets so it comes last.
  if (/(drug screen|drug test|drug panel|urine|5-panel|7-panel|4-panel|10-panel|mobile drug|rapid drug|non-dot drug|alcohol|blood test|high throughput)/.test(blob))
    return "Drug & Alcohol";
  if (/(driving record|\bmvr\b|motor vehicle|uber driver|dot driving)/.test(blob))
    return "Driving Records (MVR)";
  if (/(education verification|diploma|school record|transcript|degree verif)/.test(blob))
    return "Education";
  if (/(international|global background|overseas|foreign national)/.test(blob))
    return "International";
  if (/(employment verification|verification of employment|work history|employment eligibility|i-9|form i-9|employment form|employment letter|reference check|reference number|tenant screen|identity verification|kba|fingerprint|social media screen)/.test(blob))
    return "Employment & Identity";
  if (/(criminal background|criminal record|criminal check|criminal history|background check|ban-the-box|fair chance|felony|misdemeanor|conviction|arrest|expung|sex offender|fbi check|ncic)/.test(blob))
    return "Criminal Records";
  return "General Hiring";
}

export const POSTS: Post[] = [
  {
    slug: "investigative-consumer-report-vs-consumer-report-employer-guide",
    title: "Investigative Consumer Reports vs. Consumer Reports: When Each One Applies and Why It Matters",
    metaTitle: "Investigative Consumer Report vs. Consumer Report",
    description:
      "When does a routine background check become an investigative consumer report under the FCRA? The exact trigger, the extra disclosures, and how California ICRAA goes further.",
    category: "Compliance",
    tags: ["FCRA", "ICRAA", "investigative consumer report", "compliance", "California"],
    author: "PreciseHire Editorial",
    datePublished: "2026-05-13",
    readingMin: 8,
    image: ASSETS.serviceCriminal,
    excerpt:
      "When does a routine background check cross into investigative-consumer-report territory under the FCRA? The exact trigger, the three extra federal obligations, and how California's ICRAA goes further.",
    markdown: `Most HR teams treat every background check the same: send a stand-alone disclosure, capture written authorization, certify compliance to the vendor, run the report, and follow the adverse-action workflow if anything disqualifying turns up. That covers the wide majority of pre-employment screening, because the wide majority of background checks are "consumer reports" under the federal Fair Credit Reporting Act.

There is a second category sitting inside the same statute that many employers do not realize they have crossed into until a class-action complaint arrives. It is called an **investigative consumer report**, it is governed by a different section of the FCRA, and it brings additional disclosures, additional timing, and an additional certification on top of the routine workflow. This guide explains what triggers the change, what extra obligations attach, and how California's Investigative Consumer Reporting Agencies Act goes further for any candidate who lives or works in the state.

## The statutory line: data type does not matter, sourcing does

The FCRA defines a "consumer report" broadly enough to capture almost any third-party employment background check. Section 603(d) of the Act (codified at [15 U.S.C. § 1681a(d)](https://www.law.cornell.edu/uscode/text/15/1681a)) covers any communication from a consumer reporting agency that bears on a consumer's credit, character, general reputation, personal characteristics, or mode of living and is used or expected to be used for an employment decision.

An "investigative consumer report" is a narrower subset, defined at 15 U.S.C. § 1681a(e) as a consumer report in which the information on character, general reputation, personal characteristics, or mode of living is **obtained through personal interviews with neighbors, friends, or associates of the consumer reported on or with others with whom he is acquainted or who may have knowledge concerning any such items of information**.

The trigger is not the data type. Criminal records, prior employment, education, motor vehicle records, and credit reports can all be assembled without personal interviews and stay in routine consumer-report territory. The trigger is the sourcing. The moment your vendor calls a former neighbor, a former supervisor, or a personal reference and asks open-ended questions about the candidate's reliability, judgment, temperament, or lifestyle, the resulting written summary is an investigative consumer report. The Federal Trade Commission states the rule plainly in its [employer guidance on consumer reports](https://www.ftc.gov/business-guidance/resources/using-consumer-reports-what-employers-need-know): investigative reports are "reports based on personal interviews concerning a person's character, general reputation, personal characteristics, and lifestyle," and employers who use them "have additional obligations under the FCRA."

## What attaches when you cross the line

Three additional federal obligations stack on top of the routine FCRA workflow. They are codified at [15 U.S.C. § 1681d](https://www.law.cornell.edu/uscode/text/15/1681d) and they are not optional.

The first is a second, ICR-specific written disclosure. The employer must disclose to the candidate that an investigative consumer report — including information on character, general reputation, personal characteristics, and mode of living — may be obtained, in writing, mailed or otherwise delivered "not later than three days after the date on which the report was first requested." The disclosure must inform the candidate of the right to request more information about the investigation and must include the FCRA summary of rights prepared under § 1681g(c). This is in addition to the stand-alone § 1681b(b)(2) disclosure every employer already provides for a routine consumer report.

The second is a "nature and scope" follow-up. If the candidate asks for more detail, the employer must provide "a complete and accurate disclosure of the nature and scope of the investigation requested" within five days of receiving the request, or within five days of the report being first requested, whichever is later. In practice that means describing what the investigator was asked to look into, how the interviews were conducted, and what categories of personal contacts were approached.

The third is a second certification to the vendor. Under § 1681d(d)(1), the consumer reporting agency may not prepare or furnish an investigative consumer report until it has received a certification from the employer that the § 1681d(a) disclosures have been made and that the employer will comply with § 1681d(b). That certification is in addition to the § 1681b(b)(1) certification that supports a standard consumer report.

Two more substantive guardrails apply to the vendor. Under § 1681d(d)(3), the vendor may not include arrest, indictment, conviction, civil-judgment, tax-lien, or other public-record information unless the agency has verified its accuracy within the 30-day window ending on the day the report is furnished. Under § 1681d(d)(4), if any adverse information was obtained from a personal interview, the agency must either confirm the information with an additional independent source or document that the interviewee was the best possible source. Both are vendor obligations, but an employer that procures an investigative consumer report without confirming its vendor's procedures inherits the exposure when those procedures fail.

## The two report types side by side

| Element | Consumer report (§ 1681b) | Investigative consumer report (§ 1681d) |
| --- | --- | --- |
| What triggers it | Any third-party report on the candidate used for employment | Information obtained through personal interviews |
| Pre-pull disclosure | Stand-alone written disclosure | Same — plus a second, ICR-specific disclosure within 3 days |
| Authorization | Written authorization from the candidate | Same |
| Certification | Compliance certification under § 1681b(b)(1) | Additional certification under § 1681d(a)(2) and § 1681d(d)(1) |
| Candidate's right to ask for more | None at this stage | Right to demand a "nature and scope" disclosure within 5 days |
| Public-record currency | § 1681k strict-procedures option | § 1681d(d)(3) — vendor must verify within 30 days |

## Where employers actually trip over this

Three patterns generate almost every investigative-consumer-report compliance failure we see in audits.

The most common is the **vendor-performed reference check**. If the employer asks the vendor — not its own internal recruiter — to call three references and ask open-ended questions about the candidate's reliability, judgment, or temperament, the resulting written summary is an investigative consumer report. Vendors typically expose this option as an unobtrusive checkbox on the order screen, which the requestor clicks past in seconds. The same employer that signed a § 1681b(b) disclosure now needs the § 1681d(a) disclosure too, and most do not have one drafted. PreciseHire treats reference-check orders as triggering the ICR workflow by default; the [PreciseHire employment verifications service page](/services/employment) lays out how the reference flow is scoped.

The second pattern is **executive-level due diligence**. For senior or director-level hires, employers often commission deeper investigations that include media searches, interviews with former colleagues, and lifestyle inquiries. Those are textbook investigative consumer reports.

The third pattern is **internal-investigation handoffs**. When an employer hires an outside investigator to look into alleged misconduct by a current employee, the FCRA carves out a narrow exception under § 1681a(x) — but the carve-out is narrower than most HR teams assume, and the moment the investigation expands beyond the specific allegation into general character or fitness, the report can fall back into ICR territory.

## California's ICRAA goes further

For any candidate who lives or works in California, federal compliance is the floor, not the ceiling. The state's Investigative Consumer Reporting Agencies Act, codified at Cal. Civ. Code § 1786 et seq., applies a stricter regime to virtually every employment background check. California courts have consistently read the statute to cover the same package of criminal and reputational information that is routine in pre-employment screening, not just the narrower federal definition. The text of [California Civil Code § 1786.16](https://codes.findlaw.com/ca/civil-code/civ-sect-1786-16/) sets out the operational requirements.

Three ICRAA obligations are worth flagging for HR teams. The pre-pull disclosure must be a stand-alone written document that identifies (1) the fact that an investigative consumer report may be obtained, (2) the permissible purpose, (3) the categories of information that may be reviewed, (4) the name, address, and telephone number of the screening vendor, (5) a summary of the consumer's rights under § 1786.22, and (6) the website (or telephone number) where the candidate can review the vendor's privacy practices, including whether information will be sent outside the United States. The disclosure must also offer a box-check option that lets the candidate request a free copy of the report; if the candidate checks the box, the employer must arrange for the copy to be delivered within three business days of receiving the report. The single most common ICRAA defect we see in employer template packets is the missing box-check, followed closely by the missing privacy-practices website line, which has been mandatory since January 1, 2012.

## What this means for employers

Four operational steps to take this week. First, pull the disclosure packet your vendor gave you and read it cover to cover. Confirm it includes a stand-alone investigative-consumer-report disclosure that meets § 1681d(a), the § 1681g(c) summary of rights, and — for any candidate in California — the § 1786.22 summary, the vendor's full identity and website, and the box-check option. If any of those is missing, the fix is a one-page addendum, not a system overhaul.

Second, ask your vendor in writing whether the package you order today qualifies as an investigative consumer report. The answer is binary, and you want it in your compliance file.

Third, decide once, at the program level, whether vendor-performed reference checks are part of your standard package. If yes, build the § 1681d(a) disclosure into the pre-employment packet for every candidate, not just the executives. Mixed disclosure handling is where defects compound.

Fourth, train recruiters to recognize when an internal investigation has drifted into general-character territory and looped a third-party investigator back into ICR territory. One slide of training prevents the most expensive failure in this area. The [PreciseHire compliance hub](/compliance) has a full operational checklist for the FCRA and ICRAA workflows above.

If you want a sample stand-alone FCRA / ICRAA disclosure pack to compare against your own forms, [download the free PreciseHire FCRA + California ICRAA disclosure pack](/resources/fcra-icraa-disclosure-pack) — three annotated sample documents and a fourteen-point pre-pull checklist. Or [reach out to the PreciseHire compliance desk](/contact) and we will send the current version we use for employer clients.

### tl;dr

- A "consumer report" becomes an "investigative consumer report" under the FCRA the moment your screening vendor obtains information about character, reputation, personal characteristics, or mode of living through personal interviews with neighbors, friends, associates, or other personal contacts.
- Crossing that line triggers three federal additions: a second, ICR-specific written disclosure within three days, a "nature and scope" follow-up obligation within five days of any candidate request, and a second certification to the screening vendor under 15 U.S.C. § 1681d.
- For California candidates, the ICRAA layers stricter rules, including a mandatory box-check option that lets the candidate request a free copy of the report and a privacy-practices website disclosure mandatory since January 1, 2012.
`,
  },
  {
    slug: "fast-background-check-employer-guide",
    title: "Fast Background Checks: What's Realistic, What's FCRA-Compliant, and How to Actually Shorten Turnaround",
    metaTitle: "Fast Background Check: The Honest Employer Guide (2026) | PreciseHire",
    description:
      "What a fast background check actually delivers \u2014 tier-one results in 12\u201324 hours, full FCRA-compliant report in 2\u20134 business days, plus why \u2018instant\u2019 consumer lookups are not legal for hiring. Built for HR and compliance leaders.",
    category: "Compliance",
    tags: ["Fast Background Check", "FCRA", "Turnaround Time", "Hiring", "Criminal Records"],
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
    datePublished: "2026-05-12",
    readingMin: 18,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/hero-fast-background-check-2VP29nMjtxT5LteTxnJBgN.webp",
    excerpt:
      "Most 'fast background check' promises break in the same place. Here's what's realistically returnable inside 24, 48, and 72 hours \u2014 and why the 'instant' consumer lookups that flood the search results are not legal for hiring decisions.",
    markdown: `Most "fast background check" promises break in the same place: a vendor quotes a one-hour turnaround on the sales call, the report sits at "in progress" for three days, the hiring manager loses the candidate to a competitor, and nobody can explain where the time went. The honest answer is that speed in background screening is not a single number \u2014 it is a portfolio of search types, each with its own data source, each with its own physics. Some of those sources return in seconds. Some require a clerk to walk to a filing cabinet in a county courthouse. A reputable consumer reporting agency (CRA) cannot make the courthouse run faster, but it can sequence the work, automate everything that can be automated, and tell you honestly which parts of the report will be ready in twelve hours and which parts will take three days.

This article is the long version of that conversation. We cover what a fast background check actually means, what is realistically returnable inside twenty-four, forty-eight, and seventy-two hours, why the "instant" online consumer-grade checks that flood the search results are not Fair Credit Reporting Act (FCRA) compliant and should never be used for an employment or tenancy decision, and what employers can do on their side to legitimately shorten turnaround without breaking the statute or inviting a class action. We finish with a frequently-asked-questions section that mirrors the five questions Google has been showing in the People Also Ask box for this query for the last two years, plus additional questions that come up on every onboarding call we run with new clients.

If you would rather skip to the practical answer: for a clean candidate file in the median U.S. county, PreciseHire returns a national criminal database search plus a Social Security number trace plus a motor vehicle record plus identity verification inside twelve to twenty-four hours, and adds the courthouse-verified county criminal results plus employment and education verifications inside another twenty-four to forty-eight hours. The slow files are the ones that ride on counties without electronic court access, on past employers that respond only by fax, and on overseas education verifications that depend on a registrar's calendar in another country. We will be specific about every one of those.

## What "fast background check" actually means

A background check is not a single search; it is a bundle. The phrase covers anywhere from three to a dozen separate data pulls, including a Social Security number trace, a national criminal database search, county criminal searches in every county where the candidate has lived or worked in the last seven years, a federal criminal search, a sex-offender registry search, employment and education verifications, a motor vehicle record check for driving roles, a drug screen, and increasingly, a continuous-monitoring enrollment for the post-hire period. Each of those data pulls has a different median return time, and the "background check turnaround" you experience is the maximum of all of them, not the average.

When a vendor promises a "fast" or "instant" background check, the question to ask is which of those data pulls they are actually quoting on. A national criminal database search returns in seconds because it is a query against a single aggregated database \u2014 that is genuinely fast, and we will explain in a moment why it is also genuinely incomplete. A motor vehicle record returns in seconds to minutes from most state Departments of Motor Vehicles. A Social Security number trace returns in seconds from the credit-header data feed. Those are the truly instantaneous components of a modern background check, and a good CRA will fire them all in parallel the moment the candidate submits their authorization.

The slow components are the human-verification ones. A county criminal search in a county without electronic court access requires a researcher to be physically present at the courthouse during business hours, pull the docket index, and read each matching entry. An employment verification requires the past employer's HR department to respond \u2014 sometimes through a service like The Work Number, which is instant, more often through a fax or a phone call that goes to voicemail. An education verification requires the registrar to respond, which in the United States is usually one to three days and overseas is sometimes one to three weeks. A drug screen requires the candidate to physically visit a collection site, the specimen to be shipped to a laboratory, and the laboratory to release the result \u2014 which is usually twenty-four to forty-eight hours for a negative urine result and an additional two to three days for a non-negative that requires medical-review-officer (MRO) confirmation.

So "fast background check" is shorthand for one of three different things, and a thoughtful hiring manager separates them on the first call with the CRA. It can mean a fast turnaround on the database-and-identity portion of the report, which is genuinely returnable in minutes. It can mean a compressed turnaround on the full FCRA-compliant report, which is realistically a one-to-three-business-day commitment for a clean file and longer when the file touches manual-courthouse counties or unresponsive verifiers. Or it can mean an "instant" consumer-grade check, which is a different product entirely and is not legally usable for employment or tenancy decisions in the United States. The next three sections walk through each in turn.

## What is realistically returnable in twenty-four, forty-eight, and seventy-two hours

The honest turnaround table below reflects what PreciseHire and other reputable CRAs return on a typical U.S. candidate file, ordered by the speed at which the component data source responds. Every line assumes the candidate has signed the FCRA disclosure and authorization and the CRA has the correct identifiers (full legal name, date of birth, Social Security number, address history). Missing identifiers extend every line by the time it takes to chase the candidate for the correction.

| Component | Typical turnaround | Why |
| --- | --- | --- |
| Social Security number trace + address history | Seconds | Live credit-header query |
| National criminal database search | Seconds to minutes | Aggregated multi-state database |
| Sex-offender registry search | Seconds to minutes | Aggregated national registry |
| Identity verification (KBA / SSN match) | Seconds to minutes | Live data feeds |
| Motor vehicle record (most states) | Seconds to a few hours | Direct DMV web service |
| Federal criminal search | One to three hours | PACER docket query |
| Global watchlist screen (OFAC, denied parties) | Seconds | Aggregated database |
| County criminal \u2014 electronic-access counties | A few hours to one business day | Direct court docket query |
| County criminal \u2014 manual-courthouse counties | One to three business days | Researcher physically at the courthouse |
| Employment verification \u2014 Work Number employer | Seconds | Aggregated employer database |
| Employment verification \u2014 direct contact employer | One to three business days | HR responsiveness |
| Education verification \u2014 U.S. registrar | One to three business days | Registrar responsiveness |
| Education verification \u2014 international institution | Three business days to three weeks | Country-specific |
| Professional license verification | Hours to one business day | Direct state licensing-board query |
| Drug screen \u2014 negative urine 5-panel | Twenty-four to forty-eight hours | Lab cycle |
| Drug screen \u2014 non-negative urine 5-panel | Three to five business days | MRO confirmation required |
| Credit report (where permissible) | Seconds to minutes | Direct bureau query |
| Continuous monitoring enrollment | Seconds | API enrollment |

The practical implication is that a hiring manager who wants the fastest legitimate answer should structure the report in tiers. Tier one is everything in the "seconds to a few hours" rows \u2014 the database, identity, watchlist, MVR, federal criminal, and Work Number employment verifications. Those land inside the first twelve hours and produce a "no concerning hits" or "needs further review" signal that gives the hiring manager a defensible early read on the candidate. Tier two is the courthouse-verified county criminal results, the direct-contact employment and education verifications, and the negative drug screen, which land between twenty-four and seventy-two hours. Tier three is the slow tail \u2014 non-negative drug screens, international verifications, and the occasional county that runs three days behind on its docket \u2014 which lands inside one to two weeks. A CRA that has staged the work this way will give you the tier-one read on day one, the tier-two read on day two or three, and the closeout on tier three when it is ready, rather than withholding the whole report until the slowest line finishes.

For a clean candidate file in a major metropolitan area with electronic court access in every county touched, a national criminal database search plus a county criminal in two electronic-access counties plus an MVR plus an identity and Social Security trace plus a Work Number employment verification can legitimately close out inside twelve to twenty-four hours. That is the realistic ceiling for "fast background check" in the FCRA-compliant world, and it is faster than most hiring managers think \u2014 but it is faster because of the file, not because of the vendor.

## Why "instant" consumer-grade background checks are not FCRA-compliant

The single most important thing to understand about the "fast background check" market is that there are two completely separate product categories, and they are easy to confuse. The first category is a regulated consumer report under the FCRA, produced by a registered consumer reporting agency, used for an employment, tenancy, insurance, or credit decision. The second category is an unregulated public-records lookup, sold directly to consumers through online "people search" sites, used for personal curiosity. The two categories share search results \u2014 both will return the same database hits if the same record exists \u2014 but they are governed by completely different legal frameworks, and only the first one is usable for an employment or tenancy decision.

The reason is FCRA accuracy. [Section 1681e(b)](https://www.law.cornell.edu/uscode/text/15/1681e) of the FCRA requires any consumer reporting agency that produces a consumer report to "follow reasonable procedures to assure maximum possible accuracy of the information concerning the individual about whom the report relates." [Section 1681k](https://www.law.cornell.edu/uscode/text/15/1681k) adds an additional requirement specific to public-record information that may have an adverse effect on the consumer's ability to obtain employment: the CRA must either notify the consumer at the time the public record is reported, or maintain strict procedures to ensure the public-record information is current as of the date of the report. We covered the \u00a7613 mechanics in depth in the [\u00a7613 employer guide](/resources/fcra-section-613-public-records-employer-guide); the short version is that the FCRA imposes accuracy and currency obligations that a database-only lookup cannot satisfy on its own.

A criminal-records database aggregator is a copy of a copy. The aggregator buys court-record data from state and county sources on a periodic refresh \u2014 monthly, quarterly, sometimes annually \u2014 and serves it back through an instant-lookup interface. The aggregator's data is therefore always stale by some interval, and it is missing every record from every jurisdiction it does not have a data-sharing arrangement with, which is a long list of counties and a handful of entire states. The Eleventh Circuit's decision in [*Erickson v. First Advantage Background Services Corp.*](https://law.justia.com/cases/federal/appellate-courts/ca11/19-13196/19-13196-2020-09-23.html) held that a CRA reporting outdated criminal-record information \u2014 specifically, charges that had been dismissed but were reported as still pending \u2014 had failed to maintain the strict procedures FCRA \u00a7613 requires, and that the affected candidate's class action could proceed. The statutory damages framework under [\u00a7616](https://www.law.cornell.edu/uscode/text/15/1681n) allows between one hundred and one thousand dollars per violation, plus punitive damages, plus attorney's fees \u2014 a class of even a few thousand candidates produces a settlement number that gets a chief executive's attention.

The fix that distinguishes a reputable CRA from a database-only lookup is verification at the source. When a national criminal database returns a hit, a compliant CRA does not report the hit to the employer until a researcher has verified the current status of the record by querying the originating court directly. The verification step is the difference between the database returning a search result in seconds and the report closing out in twenty-four to seventy-two hours, and it is the single largest reason the "instant background check" advertised by a consumer site is not the same product as the "fast background check" delivered by a CRA. The instant version skips the verification step. The compliant version does not.

There is a second, less-visible reason the instant consumer products are not FCRA-compliant: the FCRA imposes obligations on the user of the report (the employer) that depend on the report being a regulated consumer report. The employer must give the candidate a standalone written disclosure and obtain a written authorization before procuring the report ([\u00a71681b(b)(2)](https://www.law.cornell.edu/uscode/text/15/1681b)), must send a pre-adverse action notice with a copy of the report and a summary of FCRA rights before taking adverse action based on it (\u00a71681b(b)(3)), and must wait a reasonable period \u2014 generally five business days, more in some states, which we walked through in the [state-by-state cushion table](/resources/how-long-must-employers-wait-pre-adverse-action-state-by-state) \u2014 before issuing the final adverse-action notice. None of those obligations are triggered by an instant consumer lookup, because an instant consumer lookup is not a consumer report. But all of those obligations apply to the employer who used the lookup to make the decision anyway. The Federal Trade Commission's [2013 guidance on background screening reports](https://www.ftc.gov/business-guidance/blog/2013/01/background-screening-reports-fcra-just-saying-youre-not-consumer-reporting-agency-isnt-enough) was explicit: a business that uses consumer reports for employment purposes has to comply with the FCRA, and a lookup vendor's disclaimer that it is "not a consumer reporting agency" does not transfer that obligation back to the lookup. The employer is on the hook either way.

## The factors that actually move the clock

If a hiring manager wants to genuinely shorten turnaround, the place to invest attention is not the CRA's sales pitch but the candidate file and the operational workflow on the employer side. The seven factors below account for the overwhelming majority of the delay we see in real screening programs.

The first factor is identifier completeness. A candidate who supplies a full legal name, a verified Social Security number, a complete date of birth, and a seven-year address history can be screened start-to-finish inside the tier-one window. A candidate who supplies a nickname, a partial SSN, and a city without a county routes into a chase loop where the CRA's intake team has to contact the candidate, request corrections, wait, and re-route. The intake chase loop is the single largest source of one-to-three-day delays we see, and it is almost entirely caused by ATS intake forms that do not validate identifier fields in real time.

The second factor is county coverage. A candidate who has lived in five counties in the last seven years generates five county criminal searches, each with its own access path and its own turnaround. If three of those counties have electronic court access and two require a researcher at the courthouse, the report closes out at the speed of the slowest courthouse. The fix is not to skip the slow counties \u2014 that creates an FCRA accuracy problem \u2014 but to fire all five searches in parallel the moment the report is opened, so the slow counties run their clock simultaneously with the fast ones rather than sequentially after the fast ones finish.

The third factor is verification-source choice. Employment verifications through The Work Number (operated by Equifax) return in seconds because they are a database lookup against employer-supplied payroll feeds, but only about forty percent of U.S. employers participate. For the other sixty percent, the CRA falls back to a direct-contact verification \u2014 a phone call, an email, or a fax to the former employer's HR department \u2014 which depends entirely on the former employer's responsiveness. The fix on the employer side is to allow the CRA to substitute alternative documentation, such as W-2s or pay stubs supplied by the candidate, when a direct-contact verification has not been returned within a defined service-level window. The candidate produces the alternative documentation directly to the CRA, the CRA verifies its authenticity, and the verification closes out without waiting for an unresponsive past employer.

The fourth factor is drug-screen logistics. A urine 5-panel returns a negative result inside twenty-four to forty-eight hours, but the clock does not start until the candidate physically arrives at the collection site, and the most common delay we see is a candidate who schedules the collection three days after the offer because they are busy. The fix is to require the collection to be completed inside a defined window \u2014 typically forty-eight hours from offer \u2014 and to have the CRA's collection-site partner offer same-day appointments and walk-in availability. Mobile collection, where the collector comes to the candidate, is faster still for high-volume programs.

The fifth factor is the candidate-experience workflow. Modern CRAs operate a candidate portal that lets the candidate sign the disclosure and authorization, supply identifiers, upload supporting documentation, and respond to follow-up questions inside a single mobile-friendly interface. A program that still uses emailed PDFs and paper forms loses one to two business days at the front of every report to candidate-side delays that a portal eliminates. The choice of portal vendor is one of the largest single levers a hiring program has over end-to-end turnaround.

The sixth factor is exception handling. Every screening program produces a steady stream of reports that hit an exception \u2014 an unreadable date of birth, a name-only match that needs a date-of-birth confirmation, a record with an ambiguous disposition. A well-run CRA's exception desk closes those out inside a few hours; a less-well-run CRA's queue is a multi-day backlog. The lever on the employer side is to ask the CRA in advance how the exception queue is staffed, what the median exception resolution time is, and how the candidate is contacted when an exception requires candidate input.

The seventh factor is the pre-adverse cushion. The FCRA requires the employer to wait a reasonable period between the pre-adverse notice and the final adverse-action notice \u2014 generally five business days at the federal floor, more in some states. That cushion is part of the candidate's regulated experience, not part of the CRA's turnaround, but hiring managers frequently confuse the two and ask the CRA to compress the cushion. The cushion cannot be compressed without violating the statute. The clock here is regulatory, not operational, and the only way to handle it is to set the candidate's expectation honestly at the time of the conditional offer.

## What you can legitimately commit to as a twenty-four-hour turnaround

For clean files in twelve states with strong electronic-court coverage \u2014 California, Texas, Florida, New York, Illinois, Pennsylvania, Ohio, North Carolina, Georgia, Massachusetts, Washington, and Virginia \u2014 a tier-one package consisting of identity and SSN trace, a national criminal database search with source verification on hits, a federal criminal search, a sex-offender registry search, a multi-state watchlist screen, a motor vehicle record, and a Work Number employment verification can legitimately close out inside twenty-four hours. That is the realistic shape of a "twenty-four-hour background check" promise. It is not the full FCRA-compliant report \u2014 there is no compliant way to verify a county criminal record from a manual-courthouse county inside twenty-four hours, and there is no compliant way to verify a direct-contact employment record from an unresponsive former employer inside twenty-four hours \u2014 but it is a defensible early read for a hiring manager who needs to make a conditional decision before the tier-two and tier-three lines finish.

The way to write the offer letter, in that case, is to make the conditional offer contingent on the satisfactory completion of the full background check, give the candidate the federal Summary of Rights and any required state-specific notices at the time of the offer, and document the tier-one results in the candidate file as the basis for the conditional decision. The conditional decision converts to a final decision when the tier-two and tier-three results land. This is the workflow that lets a hiring program run on a twenty-four-hour conditional decision without exposing itself to an FCRA accuracy claim, and it is what we recommend to clients in industries \u2014 gig, retail, on-demand staffing \u2014 where the speed of the conditional decision is competitive table stakes.

## Risks of "fast at any cost"

The two failure modes that produce class-action exposure in the fast-background-check market are also worth naming directly. The first is reporting database results without source verification, which is the \u00a7613 problem covered above. The second is compressing the pre-adverse cushion in pursuit of a faster final decision. We covered the cushion mechanics in the [state-by-state cushion table](/resources/how-long-must-employers-wait-pre-adverse-action-state-by-state) and the timing-and-content requirements in the [pre-adverse notice walkthrough](/resources/pre-adverse-action-notice-requirements-timing-content-and-documents); the short version is that the FCRA gives the candidate a meaningful opportunity to dispute the report before the final adverse-action decision, and that opportunity has a minimum duration that cannot be shortened by the urgency of the hire.

A third, less-visible risk is disparate impact under the Equal Employment Opportunity Commission's 2012 enforcement guidance on the [consideration of arrest and conviction records](https://www.eeoc.gov/laws/guidance/enforcement-guidance-consideration-arrest-and-conviction-records-employment-decisions). The guidance asks employers to perform an individualized assessment of any criminal-record information before using it as the basis for a hiring decision \u2014 looking at the nature of the offense, the time elapsed since the conviction, and the nature of the job \u2014 and to document the assessment. An individualized assessment cannot be completed in five minutes by an algorithm. A program that prides itself on the speed of its automated decisions but skips the individualized assessment is a program that has built itself a Title VII problem.

## A practical checklist for shortening turnaround without breaking the statute

If you want to leave this article with one operational artifact, here is the checklist we walk through with every new client. Validate identifier fields in your ATS intake form in real time, so candidates cannot submit a partial Social Security number or an incomplete address history. Fire every parallel-able search at the moment of authorization, not in sequence. Use a CRA whose candidate portal lets the candidate respond to exceptions on a phone, in a single tap, twenty-four hours a day. Pre-negotiate the substitution rule for unresponsive direct-contact employment verifications \u2014 what alternative documentation you will accept, who validates it, and what the service-level window is. Require the drug-screen collection inside forty-eight hours of offer and use a collector with same-day and mobile capacity. Ask the CRA in advance how its exception queue is staffed and what the median resolution time is. Stage the report into tier-one, tier-two, and tier-three lines, and write the conditional offer letter so the hiring manager can act on the tier-one read while the tier-two and tier-three lines finish. Honor the pre-adverse cushion. Document the individualized assessment when criminal-record information is involved. None of those steps slow the report down; each of them removes a category of delay that we see in real-world programs every week.

If you would like a free fifteen-minute audit of your current screening workflow \u2014 disclosure, authorization, intake validation, exception handling, pre-adverse cushion, individualized assessment, and continuous-monitoring posture \u2014 our compliance desk runs one on request. The conversation is free, you do not need to be a PreciseHire customer, and you walk away with a written summary, statute citations, and a list of the specific changes we would recommend. [Book the audit here](/compliance/audit).

## Frequently asked questions

**How accurate are fast background checks?** The accuracy of a fast background check depends entirely on whether the CRA verifies database hits at the source before reporting them. A database-only search that reports hits without verification is fast but inaccurate \u2014 outdated dispositions, sealed records that have been re-revealed, name-only matches that belong to a different person. A CRA that source-verifies every hit before reporting it is slower by a few hours to a few days, but the results are accurate at the moment the report is delivered. Reputable employment screening always uses the second model. The first model is what consumer-grade "instant" lookups do, and it is what the *Erickson v. First Advantage* class action was about.

**Can I request a fast background check for an employee or tenant?** Yes, but the report must be ordered through a registered consumer reporting agency that complies with the FCRA, and the candidate must sign the FCRA disclosure and authorization before the report is ordered. The "instant" online lookups that sit at the top of the search results are not consumer reports under the FCRA, and using one of those to make an employment or tenancy decision exposes the user to FCRA liability regardless of the lookup vendor's disclaimers. The FTC has been explicit on this point. Use a CRA.

**How long does a fast background check typically take?** For a clean candidate file in a U.S. county with electronic court access, the tier-one components \u2014 identity, Social Security trace, national criminal with source verification, federal criminal, sex-offender, motor vehicle record, watchlist, Work Number employment verification \u2014 return inside twelve to twenty-four hours. The tier-two components \u2014 county criminal in manual-courthouse counties, direct-contact employment and education verifications, U.S. drug screen with a negative result \u2014 return inside another twenty-four to forty-eight hours. The tier-three components \u2014 non-negative drug screens that require medical-review-officer confirmation, international education verifications, and counties that are temporarily backlogged \u2014 extend into the following week. The full FCRA-compliant report on a typical candidate file closes out in two to four business days; the conditional read on tier-one closes out inside twenty-four.

**Are fast background checks available for all types of screenings?** No. The components of a background check have different physics, and some of them cannot be sped up below the speed of their underlying data source. A drug-screen non-negative requires laboratory confirmation and medical-review-officer review \u2014 a process governed by the Substance Abuse and Mental Health Services Administration's mandatory guidelines and by the laboratory's own forensic workflow \u2014 and cannot be returned in twenty-four hours even with unlimited budget. An international education verification depends on a registrar's office in another country, with that country's holidays and operating hours, and cannot be returned in twenty-four hours either. A fast background check is therefore always a fast version of the components that *can* be fast, and a CRA that promises a uniform fast turnaround on every component is either limiting the report's scope or skipping verifications it should not skip.

**What is the risk of relying solely on fast background checks?** The risk falls in three buckets. The first is FCRA accuracy exposure under \u00a71681e(b) and the \u00a7613 currency rule, which is what *Erickson v. First Advantage* and similar cases addressed. The second is FCRA process exposure under \u00a71681b(b) \u2014 the disclosure, authorization, pre-adverse, and final adverse-action sequence \u2014 which is independent of the speed of the report and is violated when the employer's process is compressed past the statutory floor. The third is Title VII disparate-impact exposure under the EEOC's 2012 guidance, which asks for an individualized assessment of any criminal-record information before it is used in a hiring decision, and which cannot be completed in five minutes by an algorithm. Programs that rely solely on a fast database lookup, skip the source verification, compress the pre-adverse cushion, and bypass the individualized assessment are programs that have built themselves a class-action target. Programs that use a fast CRA with disciplined source verification, honor the FCRA's process timeline, and document the individualized assessment are programs that move quickly without taking on that exposure.

**What is the difference between a fast background check and an instant background check?** A fast background check is a regulated consumer report produced by a CRA, delivered on a compressed timeline that prioritizes parallelism, electronic court access, and automated verifications. An instant background check is a consumer-grade public-records lookup with no source verification, sold for personal curiosity, and not legally usable for an employment or tenancy decision in the United States. The two products share search results \u2014 both will return the same hit if the same record exists \u2014 but they are different legal categories. Use the first for hiring; do not use the second for hiring under any circumstance.

**Can I make a conditional offer based on a fast background check before the full report is complete?** Yes. The standard workflow is to issue a conditional offer based on the tier-one results and convert it to a final offer when the full report closes out. The conditional offer letter should state in writing that the offer is contingent on the satisfactory completion of the background check, the candidate should receive the federal Summary of Rights and any required state-specific notices at the time of the offer, and the full report should be reviewed and documented before the conditional offer is converted to a final one. If the full report surfaces a record that warrants adverse action, the employer follows the standard pre-adverse and final adverse-action sequence \u2014 the conditional-offer workflow does not shortcut that obligation.

**How fast can PreciseHire turn around a background check?** For a clean candidate file in a U.S. metropolitan area with electronic court coverage, our median tier-one turnaround is twelve hours and our median full-report turnaround is between thirty-six and forty-eight hours. Files that touch manual-courthouse counties, international verifications, or non-negative drug screens extend into the following week on the slow tail. We tell every prospective client these numbers on the first call and we publish our actual monthly turnaround statistics in the customer portal, which we believe is the only honest way to sell a screening program.

## The bottom line

Speed in background screening is real and it is achievable, but it is not a single number and it is not a promise a CRA can make without inspecting the file. A "fast background check" worth ordering is a regulated FCRA consumer report, produced by a CRA that source-verifies every database hit, staged into tiers so the hiring manager can act on the early read while the slow lines finish, ordered through a candidate portal that does not lose time at the front of the funnel, and supported by an employer-side workflow that respects the FCRA process timeline and documents the EEOC individualized assessment. A "fast background check" that promises uniform instant turnaround on every component, skips source verification, or is sold as a non-CRA consumer lookup is a product to walk away from \u2014 it is fast in the wrong way, and the speed is paid for in class-action exposure.

If you want help building a screening program that moves at the speed your business needs without crossing any of those lines, the [free fifteen-minute compliance audit](/compliance/audit) is the fastest way to start. If you would rather see what our standard packages cost first, [pricing is here](/pricing). If you want to talk to a human, [a specialist is one click away](/talk-to-an-expert).
`,
  },
  {
    slug: "fcra-section-613-public-records-employer-guide",
    title: "FCRA §613 and Public-Record Background Checks — What Employers Need to Know About the Notice-or-Strict-Procedures Rule",
    metaTitle: "FCRA §613 Public-Record Notice Rule: Employer Guide",
    description:
      "FCRA §613 forces every CRA reporting public-record information to either notify the candidate at the same time or maintain strict procedures for currency. Here's what each path actually means — and which one your CRA is using.",
    category: "Compliance",
    tags: ["FCRA", "Public Records", "Notice Rule", "Compliance"],
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
    datePublished: "2026-04-22",
    readingMin: 11,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/og-fcra-613-dysn5xUv8mAdsAFaGEF3Gp.webp",
    excerpt:
      "§613 is the quietest section of the FCRA and one of the easiest to break. It governs how a CRA reports public-record information that may have an adverse effect on a candidate — and most employers have never asked their CRA which path it picked.",
    markdown: `Most employers know FCRA §604 (permissible purpose), §611 (the dispute and reinvestigation rules we covered in [the dispute workflow article](/resources/background-check-disputes-what-employers-must-do)), and §615 (the pre-adverse and final adverse-action sequence we covered in [the pre-adverse notice walkthrough](/resources/pre-adverse-action-notice-requirements-timing-content-and-documents) and [the state-by-state cushion table](/resources/how-long-must-employers-wait-pre-adverse-action-state-by-state)). Almost no employer has ever asked their consumer reporting agency a single question about §613.

§613 is the quietest section of the FCRA and one of the easiest to break. It governs the moment a CRA pulls a public criminal record — a court docket, an arrest blotter, a sex-offender registry hit, a civil judgment — and decides what to do with it. The statute gives the CRA two paths, and which path your CRA picked determines whether your screening program is exposed to a category of class-action litigation that has been growing steadily since the Eleventh Circuit's [Erickson v. First Advantage Background Services Corp.](https://law.justia.com/cases/federal/appellate-courts/ca11/19-13196/19-13196-2020-09-23.html) decision and the related wave of public-record-notice cases.

This article walks through what §613 actually says, the two compliance paths it offers, the case law that has shaped each one, and the specific question every employer should ask their CRA before the next renewal cycle.

## What §613 actually says

The statutory text is short. [15 U.S.C. §1681k(a)](https://www.law.cornell.edu/uscode/text/15/1681k) provides that a consumer reporting agency that furnishes a consumer report **for employment purposes** and that includes in the report **public record information** that is **likely to have an adverse effect on the consumer's ability to obtain employment** must do one of two things.

The first option, under §613(a)(1), is to notify the consumer at the time the public-record information is reported to the user, with the name and address of the user receiving the information. This is the "contemporaneous notice" path. The CRA pulls the public record, sends the report to the employer, and at the same time sends the candidate a notice that says "a public record was reported to [employer name] on [date]."

The second option, under §613(a)(2), is to maintain strict procedures designed to ensure that the public-record information is complete and up to date. The statute specifies that records of arrests, indictments, convictions, suits, tax liens, and outstanding judgments must reflect the current public-record status as of the date of the report. This is the "strict procedures" path. The CRA does not have to notify the candidate at the time of the report, but in exchange it must guarantee the public-record data it furnishes is current as of the moment the report goes out.

The two paths are mutually exclusive in practice. A CRA picks one and lives with the operational obligations that path imposes.

## Why the choice matters — the litigation landscape

The practical reason §613 matters is that both paths have been the subject of major federal litigation, and a CRA that thinks it is on the strict-procedures path but is actually relying on stale aggregator data is a CRA whose employer-clients are co-defendants when the class action lands.

The leading case on the strict-procedures path is the Eleventh Circuit's 2020 decision in *Erickson v. First Advantage*, which held that a CRA reporting outdated criminal-record information — specifically, charges that had been dismissed but were reported as still pending — had failed to maintain the strict procedures the statute requires, and that the affected candidate's class action could proceed. The damages framework under [§616 (willful noncompliance)](https://www.law.cornell.edu/uscode/text/15/1681n) allows statutory damages between $100 and $1,000 per violation, plus punitive damages, plus attorney's fees — a class of even a few thousand candidates produces a settlement number that gets a CEO's attention.

The leading line of cases on the contemporaneous-notice path is more procedural but no less important. Courts have consistently held that the §613(a)(1) notice must be sent **at the time** the public-record information is reported to the user, not days later, not bundled into the candidate's eventual pre-adverse action packet, not contingent on the employer making a decision. The notice is an independent statutory obligation that triggers the moment the report leaves the CRA's hands.

## The two paths in operational terms

**The contemporaneous-notice path (§613(a)(1)).** A CRA on this path runs a court records search, pulls a public-record hit, and at the moment of furnishing the report to the employer, simultaneously sends the candidate a written notice. The notice does not have to disclose what the public record says — the FCRA already gives the candidate a right to a free copy of the file under [§609](https://www.law.cornell.edu/uscode/text/15/1681g) — but it does have to identify the user (the employer) and the date of the report. The operational burden falls on the CRA's notice-generation system: every public-record hit triggers an automated candidate notice, and the CRA carries the proof of mailing or electronic delivery as part of its compliance file.

**The strict-procedures path (§613(a)(2)).** A CRA on this path does not send a contemporaneous notice. Instead, it guarantees that every public-record item it reports is current as of the date of the report. In practice, this means the CRA cannot rely solely on a third-party criminal records aggregator that refreshes its data monthly or quarterly. The CRA must verify the current status of the public record at the source — a direct query to the relevant court's docket system, a fresh pull from the state criminal-history repository, a real-time check against the sex-offender registry. The operational burden falls on the CRA's research workflow: every public-record hit must be verified at the source before it is reported.

The two paths produce different candidate experiences. Under the contemporaneous-notice path, the candidate often learns that an employer ran a background check and found a record before the employer has even decided what to do with it — which can be useful for early dispute resolution but also generates candidate confusion that the employer's recruiter has to manage. Under the strict-procedures path, the candidate's first notice is the pre-adverse action packet, which arrives later in the process but contains a more complete and current picture.

## Which path your CRA picked — the question to ask

Most employers have no idea which §613 path their current CRA is on. The question is rarely volunteered in sales conversations, and the answer is rarely documented in the master services agreement.

The specific question to ask is this: **"Does your platform comply with FCRA §613 by sending contemporaneous candidate notices on every public-record report under §613(a)(1), or by maintaining direct-source verification under §613(a)(2)? Please describe the operational workflow that backs your answer."**

A CRA on the contemporaneous-notice path should be able to describe its candidate-notice generation system in concrete operational terms — when the notice is generated, how it is delivered (mail, email, candidate portal), what proof of delivery is retained, and how the notice handles candidates whose contact information is incomplete. A CRA on the strict-procedures path should be able to describe its court-source verification workflow — which courts are queried directly, which courts require courthouse research, what the maximum age of any reported record is from the source-verification date, and how the CRA handles courts whose direct-access systems are temporarily unavailable.

A CRA that cannot answer this question concretely — or that answers vaguely with phrases like "we comply with all applicable FCRA requirements" — is a CRA that has not done the operational work to actually be on either path. That is the CRA whose employer-clients become co-defendants.

## The intersection with state law

A handful of states have layered additional public-record reporting rules on top of §613, and the interaction matters.

**California.** California's [Investigative Consumer Reporting Agencies Act (ICRAA)](https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?division=3.&chapter=2.5.&part=4.&lawCode=CIV&title=1.6A) requires CRAs that furnish investigative consumer reports for employment purposes in California to provide the consumer with a copy of any public-record information at the time the report is provided to the user, regardless of whether the CRA has chosen the strict-procedures path under federal §613. The California rule effectively forces a contemporaneous-notice operating model for any candidate whose application is in California.

**New York.** New York's [Article 23-A of the Correction Law](https://www.nysenate.gov/legislation/laws/COR/A23-A) requires employers (not CRAs) to provide candidates with a written copy of the public-record information being considered before any adverse employment decision. The state-law obligation is layered on top of the federal §615(a) pre-adverse process and effectively requires the public-record copy to be in the candidate's hands earlier and more affirmatively than the federal floor requires.

**Maryland and Washington.** Both states have their own consumer reporting statutes that mirror §613 with variations on the timing and content of the notice. A CRA operating nationally has to satisfy the most demanding state rule, which in practice means most national CRAs default to the contemporaneous-notice path because it is easier to operate uniformly than to maintain different state-specific workflows.

## The internal question employers should ask themselves

Even with a clean §613-compliant CRA, employers carry a related obligation that frequently slips through the cracks: the public-record information that lands in the candidate's pre-adverse action packet must be the same information the employer actually relied on. If your CRA is on the strict-procedures path and pulls a fresh court record on the date of the report, but your hiring manager makes the adverse decision two weeks later based on the stale version of the report stored in the ATS, the candidate's pre-adverse packet must contain the version of the report that was actually considered — not a fresher version pulled later, and not an older version that has since been superseded.

The operational fix is to lock the version of the consumer report at the moment the employer makes the conditional decision to move toward adverse action, and to use that locked version as the document delivered with the pre-adverse notice. We covered the pre-adverse mechanics in detail in the [pre-adverse notice walkthrough](/resources/pre-adverse-action-notice-requirements-timing-content-and-documents); the §613 layer adds the requirement that the report version delivered to the candidate is the same version the employer actually considered.

## The continuous-monitoring wrinkle

For employers running continuous monitoring (which we covered in the [continuous monitoring vs. periodic re-screens article](/resources/continuous-monitoring-vs-periodic-rescreens)), §613 applies to every public-record alert the program generates, not just to the original pre-hire report. Each alert that includes new public-record information that may have an adverse effect on the employee's continued employment is a new §613 trigger.

This is the operational reason most well-built continuous-monitoring programs default to the contemporaneous-notice path. The strict-procedures path requires source verification on every alert, every time, which is operationally expensive at scale. The contemporaneous-notice path lets the alert flow through, with the candidate receiving notice each time, and the employer making its individualized-assessment decision under the EEOC framework downstream.

## The audit checklist

If you want to audit your CRA's §613 posture in fifteen minutes, here is the framework. First, request in writing which §613 path the CRA operates under, and ask for the operational description of how that path is implemented. Second, request a sample of the contemporaneous notice (if (a)(1)) or a description of the source-verification workflow (if (a)(2)). Third, ask how the CRA handles California, New York, Maryland, and Washington candidates specifically. Fourth, ask whether the CRA is currently a defendant in any §613 litigation — a CRA on a clean (a)(2) path with a robust source-verification workflow has nothing to hide; a CRA whose answer is evasive is a flag.

If the answer to any of the four questions is unsatisfying, a [free 15-minute compliance audit](/compliance/audit) with our compliance desk will walk through the specific exposure your current arrangement creates and what the remediation looks like — whether that means a process change inside your CRA, a contractual addendum, or (in the worst case) a CRA migration. The conversation is free and you do not need to be a customer.

## TL;DR

FCRA §613 governs how a CRA reports public-record information for employment purposes. The CRA picks one of two paths: contemporaneous notice to the candidate (§613(a)(1)) or strict procedures to ensure the data is current as of the report date (§613(a)(2)). Which path your CRA picked determines a meaningful slice of your class-action exposure.

Most employers have never asked. The question to ask is concrete: "Which §613 path do you operate under, and please describe the workflow that backs your answer." A CRA that cannot answer concretely has not done the operational work to actually be on either path — and its employer-clients become co-defendants when the class action lands.

State overlays in California, New York, Maryland, and Washington force most national CRAs onto the contemporaneous-notice path by default. Employers running continuous monitoring inherit §613 obligations on every public-record alert, not just the pre-hire report. And the version of the report the candidate receives in the pre-adverse packet must be the same version the employer actually relied on — not a fresher one, not a stale one.
`,
  },
  {
    slug: "continuous-monitoring-vs-periodic-rescreens",
    title: "Continuous Criminal Monitoring vs. Periodic Re-Screens \u2014 When Each Makes Sense",
    metaTitle: "Continuous Monitoring vs. Annual Re-Screens: Employer Guide",
    description:
      "Continuous monitoring sounds modern, but it carries FCRA, EEOC, and state-law obligations a one-time re-screen does not. Here's when each model is the right call.",
    category: "Compliance",
    tags: ["Continuous Monitoring", "Re-Screening", "FCRA", "Post-Hire"],
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
    datePublished: "2026-04-30",
    readingMin: 10,
    image: ASSETS.serviceCriminal,
    excerpt:
      "Continuous monitoring sounds like a modern upgrade to the annual re-screen, but the two have meaningfully different cost, compliance, and culture profiles. Here's how to choose.",
    markdown: `Most employers ask about continuous criminal monitoring after they read a news story \u2014 a delivery driver arrested for a serious offense, a healthcare worker revealed to have a prior conviction, an executive whose new charge surfaces only after the press calls for comment. The instinct to move from a one-time pre-hire check to ongoing post-hire monitoring is a reasonable one. The execution is where it gets complicated.

This article walks through the operational and legal differences between continuous criminal monitoring and periodic re-screens, the industries where each is the right answer, and the FCRA, EEOC, and state-law obligations that apply to both. It is the natural follow-on to our three-part adverse-action series \u2014 the [pre-adverse notice walkthrough](/resources/pre-adverse-action-notice-requirements-timing-content-and-documents), the [state-by-state cushion table](/resources/how-long-must-employers-wait-pre-adverse-action-state-by-state), and the [dispute workflow](/resources/background-check-disputes-what-employers-must-do) \u2014 because every continuous-monitoring program eventually fires an alert that triggers exactly that adverse-action sequence.

## What "continuous monitoring" actually is

Continuous criminal monitoring is the ongoing checking of public criminal records and certain regulatory databases against an existing employee's identity, with near-real-time alerts to the employer when a new record surfaces. The technology behind it is a combination of court-records data feeds, arrest-blotter aggregators, and (in regulated industries) direct database integrations like the FMCSA Drug & Alcohol Clearinghouse, the OIG List of Excluded Individuals/Entities, the GSA SAM.gov debarment list, and state nursing or medical licensing boards.

The usual marketing language describes continuous monitoring as a "set and forget" upgrade to the annual re-screen. That language is misleading. A continuous-monitoring program is functionally an open-ended consumer reporting relationship with each enrolled employee, which means every alert that surfaces is a new consumer report under the Fair Credit Reporting Act, with the same disclosure, authorization, and adverse-action obligations as a pre-hire check.

## Periodic re-screens \u2014 the older model

A periodic re-screen is a discrete background check conducted at a fixed interval (commonly annually or every two years) or at a specific trigger event (promotion to a position of trust, transfer into a regulated role, renewal of a security clearance, contract renewal). Each re-screen is a single new consumer report with the same workflow as the original pre-hire check: a fresh FCRA disclosure, a fresh standalone written authorization under [\u00a7604(b)(2)(A)](https://www.law.cornell.edu/uscode/text/15/1681b), a fresh report, and a fresh adverse-action sequence if the employer plans to act on what the report contains.

Periodic re-screens are the operationally simpler model and the easier model to defend in litigation. The disclosure-and-authorization moment is well-defined, the consumer report is a discrete artifact, and the employee knows exactly when the screening occurred. The downside is latency: anything that happens between re-screens is invisible until the next cycle.

## Continuous monitoring \u2014 the newer model

Continuous monitoring closes the latency gap by running the same kinds of checks on a rolling basis \u2014 typically daily court-feed sweeps for new dispositions, monthly arrest-record refreshes, and event-triggered pulls from regulatory databases. When a new record matches an enrolled employee, the CRA generates an alert and the employer receives a new consumer report on that employee.

The FCRA implications are the part most employers underestimate. Each alert is a new consumer report, which means three things. First, the original pre-hire authorization the employee signed must explicitly contemplate ongoing monitoring \u2014 a one-time "for employment purposes" authorization is not generally sufficient if the employer never disclosed that screening would continue throughout employment. Second, every alert that the employer plans to act on triggers the full pre-adverse, waiting-period, and final adverse-action sequence we covered in the prior three articles. Third, the EEOC's [2012 enforcement guidance on the use of arrest and conviction records](https://www.eeoc.gov/laws/guidance/enforcement-guidance-consideration-arrest-and-conviction-records-employment-decisions-under) applies the same individualized-assessment framework to a continuous-monitoring alert that it applies to a pre-hire conviction \u2014 nature of the offense, time elapsed, nature of the job.

## Where continuous monitoring is the right call

Three categories of employer should be running continuous monitoring rather than periodic re-screens.

**Regulated transportation.** Commercial driver's license holders fall under the FMCSA's [Drug & Alcohol Clearinghouse](https://www.fmcsa.dot.gov/regulations/commercial-drivers-license-drug-and-alcohol-clearinghouse), which requires real-time queries when a driver is hired and at minimum annual queries thereafter. Continuous monitoring at the MVR level is also strongly indicated for any employer whose drivers represent a meaningful liability surface \u2014 last-mile delivery, transportation network companies, school transportation. The marginal cost of a missed mid-year DUI is materially higher than the marginal cost of running ongoing monitoring.

**Healthcare and direct patient care.** OIG and SAM.gov exclusion-list monitoring is functionally mandatory for any provider that bills federal healthcare programs; the False Claims Act exposure for employing an excluded individual is severe. State nursing and medical licensing-board monitoring is the second layer; license suspension or revocation needs to be discovered immediately, not at the next annual cycle.

**Financial services and trust roles.** Anyone with discretionary access to client funds, customer PII at scale, or regulated systems benefits from continuous monitoring of criminal records and (where applicable) FINRA registration status. The case law on negligent retention is unambiguous: an employer who knew or should have known of a disqualifying event and continued the employee in a sensitive role carries the resulting liability.

## Where periodic re-screens are the better answer

For most other roles, periodic re-screens at one- or two-year intervals are the right answer. The reason is not cost \u2014 the per-employee delta between continuous and periodic is small at scale \u2014 it is operational and cultural.

Continuous monitoring generates a steady stream of alerts that hiring managers must triage, most of which will not actually warrant adverse action under an EEOC-compliant individualized assessment. A six-year-old DUI on a non-driving employee is almost never grounds for termination under EEOC principles, but it is an alert that someone has to read, document, and dismiss. Multiply that by a workforce of several thousand and the burden becomes meaningful.

Worse, continuous monitoring without a disciplined individualized-assessment process produces precisely the kind of pattern that disparate-impact litigation is built on: a steady stream of arrest-record alerts, disproportionately affecting the same protected classes that the original 2012 EEOC guidance was designed to protect, with terminations that look automatic from the outside even when the internal process was deliberate. Employers running continuous monitoring without a documented individualized-assessment workflow are inheriting that risk profile without realizing it.

Periodic re-screens, by contrast, force the conversation into a structured, scheduled, batch process where every record is evaluated against the same individualized-assessment framework with the same documentation discipline. The latency cost is real, but for non-regulated, non-safety-sensitive roles it is the more defensible model.

## What "FCRA-compliant continuous monitoring" actually requires

Three things, all of which most off-the-shelf programs get partially wrong.

First, **the original disclosure must explicitly contemplate ongoing monitoring**. The FCRA disclosure at the pre-hire stage must clearly state that consumer reports will be obtained throughout the employment relationship, not just at hire. Many employers' pre-hire disclosures are silent on this point because they were drafted before continuous monitoring existed as a product, and a subsequent enrollment in continuous monitoring without a re-disclosure and re-authorization is, in our reading, a defect.

Second, **the authorization must be standalone, ongoing, and revocable in writing only**. The Ninth Circuit's decision in [Syed v. M-I, LLC](https://cdn.ca9.uscourts.gov/datastore/opinions/2017/01/20/14-17186.pdf) on the standalone-document requirement applies just as squarely to ongoing-monitoring authorizations as it does to pre-hire ones. Bundling the ongoing-monitoring language into a general employment agreement or an electronic signature flow with arbitration clauses is a known litigation trigger.

Third, **every alert must be processed through the full adverse-action workflow**. There is no "continuous monitoring exception" to FCRA \u00a7604(b)(3) \u2014 the pre-adverse notice, the copy of the report, the Summary of Rights, the reasonable waiting period, the dispute right, and the final adverse-action notice all apply. Programs that handle continuous-monitoring alerts as internal HR matters without the formal adverse-action sequence are creating the documentation pattern that plaintiffs' firms specifically look for.

## How to choose

The practical decision rule is this. If your employees fall into a regulated category (DOT-regulated drivers, healthcare workers billing federal programs, financial services roles with discretionary fund access, federal contractors subject to ongoing fitness determinations), continuous monitoring is appropriate and arguably required. For everyone else, periodic re-screens at a one- or two-year cadence \u2014 paired with event-triggered re-screens at promotion, transfer, or contract renewal \u2014 is the more defensible default.

If you do run continuous monitoring, the program is only as good as the adverse-action workflow attached to it. Audit your pre-hire disclosure language to confirm it contemplates ongoing monitoring; audit your authorization to confirm it is a standalone document that an employee actively re-signs (rather than passively accepts) when continuous monitoring is enrolled; and audit your alert-handling workflow to confirm every actionable alert flows through the full pre-adverse and final adverse-action sequence with documented individualized assessment.

If you would like a second pair of eyes on either model, [reach out](/contact) and we will walk through your current screening cadence, the role categories that justify continuous monitoring, and the documentation pattern that holds up if a regulator or a plaintiff's firm comes asking. The conversation is free and you do not need to be a customer.

## TL;DR

- Continuous monitoring is the right model for DOT-regulated drivers, healthcare workers, financial-services trust roles, and federal contractors. For everyone else, periodic re-screens at a one- or two-year cadence are the more defensible default.
- Every continuous-monitoring alert is a new consumer report under FCRA. The pre-adverse, waiting-period, and final adverse-action sequence applies to every alert the employer plans to act on.
- The original FCRA disclosure must explicitly contemplate ongoing monitoring; the authorization must be a standalone document; and the alert-handling workflow must include EEOC-style individualized assessment.
- The cost difference between continuous and periodic re-screens is smaller than most employers think. The operational and cultural difference is larger.
`,
  },
  {
    slug: "background-check-disputes-what-employers-must-do",
    title: "What Happens When a Candidate Disputes a Background Check \u2014 and What Employers Must Do",
    metaTitle: "Background Check Disputes: Employer Guide (FCRA \u00a7611)",
    description:
      "FCRA \u00a7611 gives candidates 30 days to dispute a background check. Here's what the CRA must do, what the employer must do, and the workflow that keeps you out of court.",
    category: "Compliance",
    tags: ["FCRA", "Disputes", "Adverse Action", "Hiring Compliance"],
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
    datePublished: "2026-05-08",
    readingMin: 9,
    image: ASSETS.serviceCriminal,
    excerpt:
      "The fastest way to convert a routine background check into a class action is to send the final adverse action notice while a dispute is open. Here's the FCRA \u00a7611 dispute workflow \u2014 from both sides.",
    markdown: `The single fastest way to convert a routine background check into a class-action lawsuit is to send the final adverse action notice while the candidate's dispute is still open. The Fair Credit Reporting Act gives candidates a specific, statutory right to challenge information in their own consumer report, gives the consumer reporting agency a specific timeline to investigate, and gives the employer no explicit instruction at all about what to do in the meantime. The result, predictably, is that employers do whatever feels efficient \u2014 and a meaningful percentage of those efficient decisions land in court.

This article walks through what actually happens when a candidate files a dispute, what the consumer reporting agency is legally required to do, and what the employer is operationally required to do during the window. It is the third installment in our adverse-action series, following our [walkthrough of the pre-adverse action notice](/resources/pre-adverse-action-notice-requirements-timing-content-and-documents) and our [state-by-state cushion table on waiting periods](/resources/how-long-must-employers-wait-pre-adverse-action-state-by-state).

## The candidate's right to dispute

[Section 611 of the FCRA](https://www.law.cornell.edu/uscode/text/15/1681i), codified at 15 U.S.C. \u00a71681i, gives any consumer the right to dispute "the completeness or accuracy of any item of information contained in a consumer's file" with the consumer reporting agency that produced the report. There is no fee, no required form, and no requirement that the dispute be in any particular format \u2014 a phone call counts, an email counts, a letter counts, and most modern CRAs offer an online dispute portal as well.

A candidate triggers a dispute by notifying the CRA, not the employer. In practice, employers find out a dispute has been filed because either the candidate tells them directly during the pre-adverse waiting window, or because the CRA contacts the employer to flag that the report is now under reinvestigation. Either way, the moment an employer becomes aware of a pending dispute, the operational rules change immediately.

## The CRA's 30-day clock

Once the CRA receives a dispute notice from the consumer, [\u00a71681i(a)(1)(A)](https://www.law.cornell.edu/uscode/text/15/1681i) requires it to complete a reinvestigation **free of charge** and within **30 days**. The clock is not optional, and it is not extendable except in one specific circumstance: under [\u00a71681i(a)(1)(B)](https://www.law.cornell.edu/uscode/text/15/1681i), if the consumer provides additional relevant information during the original 30-day window, the CRA may extend the reinvestigation by up to **15 additional days**, capping the maximum reinvestigation period at **45 days**.

Within five business days of receiving the dispute, [\u00a71681i(a)(2)](https://www.law.cornell.edu/uscode/text/15/1681i) requires the CRA to notify every furnisher of the disputed information \u2014 the county clerk, the prior employer, the registrar, the database vendor \u2014 and forward all relevant information the consumer submitted. The furnisher then has its own statutory obligation under [\u00a71681s-2(b)](https://www.law.cornell.edu/uscode/text/15/1681s-2) to investigate, review the information the CRA forwarded, and report results back. Most disputes turn on this furnisher loop: if the original record source confirms the entry was wrong or cannot be verified, the CRA is required under [\u00a71681i(a)(5)(A)](https://www.law.cornell.edu/uscode/text/15/1681i) to **promptly delete or modify** the item.

When the reinvestigation is complete, [\u00a71681i(d)](https://www.law.cornell.edu/uscode/text/15/1681i) gives the CRA five business days to send the consumer written notice of the results, including a revised report if anything was changed. If the disputed item was deleted or corrected, the corrected report becomes the operative document for the employer's hiring decision.

## The "frivolous or irrelevant" escape hatch \u2014 and how it gets misused

[Section \u00a71681i(a)(3)](https://www.law.cornell.edu/uscode/text/15/1681i) lets the CRA terminate a reinvestigation if it "reasonably determines" the dispute is "frivolous or irrelevant," including disputes where the consumer has failed to provide enough information for the CRA to investigate. The statute requires the CRA to notify the consumer in writing within five business days of that determination, explain the reason, and tell the consumer how to resubmit with additional information.

The "frivolous or irrelevant" escape hatch exists for a legitimate reason \u2014 without it, CRAs would be obligated to spend 30 days investigating disputes that say nothing more than "this is wrong." But it is also one of the most heavily litigated provisions of the FCRA, because some CRAs use it to close legitimate disputes that simply require effort to investigate. Closing a county criminal record dispute as "frivolous" because it would require a manual courthouse pull is, in our reading, exactly what the statute does not contemplate. Employers relying on a CRA that aggressively closes disputes as frivolous are inheriting that CRA's litigation risk.

## What the employer must do during the dispute

The FCRA does not contain explicit language that says "pause the adverse action clock when a dispute is filed." What it says, in [\u00a7604(b)(3)(A)](https://www.law.cornell.edu/uscode/text/15/1681b), is that the employer must wait a "reasonable" period after the pre-adverse notice before taking final adverse action. The FTC's longstanding interpretive position \u2014 repeated across decades of staff opinion letters and the agency's [plain-language employer guidance](https://www.ftc.gov/business-guidance/resources/using-consumer-reports-what-employers-need-know) \u2014 is that proceeding to final adverse action while a timely dispute is open defeats the candidate's statutory right to dispute, and is therefore not "reasonable" under \u00a7604(b)(3)(A). Plaintiffs' firms have spent the last decade winning settlements on that exact theory.

Operationally, this means three things every time an employer is notified that a candidate has filed a dispute.

First, **the adverse action clock pauses**. The five (or ten, in Philadelphia) business-day waiting period that started when the candidate received the pre-adverse notice stops running, and does not resume until the CRA confirms the reinvestigation is complete and notifies the employer of the result.

Second, **the position must be held open**. In jurisdictions with explicit fair-chance overlays \u2014 Los Angeles, New York City, Philadelphia, and California most prominently \u2014 this is a statutory requirement. In the rest of the country it is a defensible-conduct requirement: filling the position while the candidate's dispute is pending is the strongest possible evidence that the employer never intended to honor the dispute right at all.

Third, **the corrected report becomes the operative report**. If the CRA deletes or modifies the disputed item, the employer must base any final adverse action on the corrected report \u2014 not the original. This sometimes means the original adverse-action rationale evaporates entirely, and the candidate's offer should be honored. We have seen employers continue to adverse-action candidates on the basis of a record that the CRA had already deleted, simply because the hiring team never updated their decision against the corrected report. That is an indefensible class of error.

California's regulations make this explicit in a way the federal floor does not. Under [2 CCR \u00a711017.1](https://calcivilrights.ca.gov/wp-content/uploads/sites/32/2022/11/Fair-Chance-Act-FAQ_ENG.pdf), if the candidate notifies the employer in writing that they are disputing the accuracy of the conviction history report, the employer must give an additional five business days beyond the initial five-business-day waiting period \u2014 extending the maximum California waiting window to ten business days when a dispute is filed. California is the only state that has codified the dispute-pause this explicitly, but the operational logic applies everywhere.

## The five most common dispute scenarios

Most background check disputes fall into one of five categories. Knowing the typology helps employers triage incoming disputes faster and helps hiring managers understand which disputes are most likely to result in record changes.

The first is **mistaken identity** \u2014 the most common type of legitimate dispute. County criminal indices in many jurisdictions key on name plus date of birth, and common-name candidates regularly surface records belonging to a different person. A well-run CRA catches most of these at the QA step before the report ever reaches the employer; weaker CRAs do not, and the dispute is the first time the candidate gets to see what was reported about them.

The second is **sealed or expunged records that were reported anyway**. Once a record is sealed or expunged, [\u00a71681c](https://www.law.cornell.edu/uscode/text/15/1681c) generally prohibits its inclusion in a consumer report. Errors in this category are usually the result of stale court-records databases that did not pick up the seal, and disputes almost always result in deletion.

The third is **misclassified dispositions** \u2014 dismissed cases reported as convictions, deferred adjudications reported as guilty pleas, pending charges reported as resolved. These are technical errors at the courthouse-data layer and almost always require a manual courthouse pull to resolve.

The fourth is **wrong jurisdiction** \u2014 a record from a county the candidate has never lived in or worked in, surfacing through a national database that pulled in stale or mislabeled data. These almost always resolve as deletions, and they are a strong indicator that the original report relied too heavily on database screening rather than direct courthouse verification.

The fifth is **stale records beyond the 7-year reporting limit**. [Section 605](https://www.law.cornell.edu/uscode/text/15/1681c) prohibits the inclusion of most non-conviction records older than seven years in a consumer report (with a salary-threshold carve-out for positions paying more than \\$75,000 annually). Disputes in this category are usually airtight and resolve quickly.

## What a defensible dispute workflow looks like

There is a meaningful difference between a CRA whose dispute workflow is designed to make disputes easy to file and resolve, and a CRA whose dispute workflow is designed to make disputes easy to close as frivolous. Hiring managers rarely see this distinction until they are sitting across from outside counsel during a class-action discovery process.

A defensible workflow has three properties. First, **a human reviews every dispute** \u2014 not a portal-only triage step that closes anything missing a specific document. Second, **the original record source is contacted** \u2014 courthouse, prior employer, registrar \u2014 rather than a database refresh that simply re-pulls the same data that produced the disputed item. Third, **the employer is notified the moment a dispute is filed**, not at the end of the reinvestigation, so the adverse-action clock can be paused contemporaneously and documented.

The Professional Background Screening Association's industry data suggests the typical accurate-dispute rate at a well-run CRA \u2014 disputes that result in some change to the report \u2014 is under 0.5% of reports. That is the right denominator for a healthy operation. CRAs whose disputed-but-unchanged rate is materially higher than that are typically running more name-based database screens, which produce more false positives, which produce more disputes that turn out to be legitimate.

## How PreciseHire handles disputes

Our dispute workflow is built around the three properties above. Every incoming dispute \u2014 phone, email, portal, or letter \u2014 goes to a U.S.-based compliance specialist within one business hour. The original record source is contacted directly; we do not refresh the database and call it a reinvestigation. The employer is notified the moment the dispute is logged, the adverse-action clock pauses automatically in the ATS integration, and the position-held-open status is documented in the audit trail.

If the disputed item is found inaccurate, incomplete, or unverifiable, we delete or correct it under \u00a71681i(a)(5)(A) and reissue the report \u2014 typically within seven business days of the dispute, well inside the 30-day federal limit. If the dispute is found to be without merit after a real investigation, we document the basis in writing and notify the candidate with a clear explanation and instructions for providing additional information if they have it. We do not close disputes as "frivolous or irrelevant" except in the narrow circumstances the statute actually contemplates.

If you want a second pair of eyes on your current dispute workflow \u2014 particularly the question of whether the adverse-action clock pauses automatically when a dispute is filed, and whether the corrected report becomes the operative report for downstream hiring decisions \u2014 [reach out](/contact) and we will walk through your current process before a candidate's attorney does.

## TL;DR

- Under FCRA \u00a7611 (15 U.S.C. \u00a71681i), a candidate can dispute any item in a background check with the consumer reporting agency. The CRA has 30 days (or 45 if the candidate provides more information) to complete a free reinvestigation.
- The moment an employer learns a dispute has been filed, the adverse-action clock pauses, the position must be held open, and any final decision must be based on the corrected report \u2014 not the original.
- The "frivolous or irrelevant" escape hatch in \u00a71681i(a)(3) is real but heavily abused; CRAs that aggressively close disputes as frivolous are passing litigation risk through to their employer clients.
- A defensible dispute workflow has a human reviewing every dispute, contacts the original record source, and notifies the employer immediately so the clock can be paused contemporaneously.
`,
  },
  {
    slug: "how-long-must-employers-wait-pre-adverse-action-state-by-state",
    title: "How Long Must Employers Wait Between Pre-Adverse and Final Adverse Action \u2014 A State-by-State Cushion Table",
    metaTitle: "Pre-Adverse Action Waiting Periods by State (2026)",
    description:
      "The federal FCRA floor is five business days, but Philadelphia, Los Angeles, NYC, and California impose more. A 2026 state-by-state cushion table for employers running background checks.",
    category: "Compliance",
    tags: ["FCRA", "Adverse Action", "Pre-Adverse Notice", "State Compliance", "Hiring"],
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
    datePublished: "2026-05-13",
    readingMin: 8,
    image: ASSETS.serviceCriminal,
    excerpt:
      "The federal FCRA waiting period is \"reasonable\" \u2014 operationally five business days. But four jurisdictions extend it, and one of them doubles it. A 2026 state-by-state cushion table for employers.",
    markdown: `The single most expensive timing question in pre-employment screening is also one of the simplest: how many days do you have to wait between the pre-adverse action notice and the final adverse action? The Fair Credit Reporting Act answers it with the word "reasonable" and nothing more, which is part of why this is the step plaintiffs' firms most often turn into class actions. The honest answer is that the federal floor is five business days for almost every employer in the country, but four jurisdictions impose more \u2014 and one of them doubles it.

This is the practical follow-on to our [walkthrough of the FCRA pre-adverse action notice itself](/resources/pre-adverse-action-notice-requirements-timing-content-and-documents). It assumes you have a compliant notice packet (cover letter, full report, current CFPB Summary of Rights) and only addresses the question of how long the waiting clock has to run before final adverse action.

## The federal floor: five business days

[Section 604(b)(3)(A) of the FCRA](https://www.law.cornell.edu/uscode/text/15/1681b) requires a "reasonable" period between the pre-adverse notice and the final decision so the candidate can review the report and dispute information they believe is inaccurate. The FTC has never issued a regulation pinning that to a specific number, but its [plain-language guidance for employers using consumer reports](https://www.ftc.gov/business-guidance/resources/using-consumer-reports-what-employers-need-know) and decades of informal staff guidance converge on the same operational floor: **five business days**, measured from candidate receipt rather than employer send date.

Five business days is a floor, not a target. If the candidate disputes the report during the waiting window, the clock pauses while the consumer reporting agency investigates, and sending the final adverse action while a dispute is open is the fastest way to convert a routine hiring decision into a lawsuit. Many regulated employers adopt seven calendar days or ten calendar days as an internal cushion for exactly this reason. But for the simple case \u2014 no dispute filed, candidate received the package, employer is in a state with no fair-chance overlay \u2014 five business days is the durable industry minimum.

## The four jurisdictions that impose more

Four jurisdictions in the United States impose explicit statutory waiting periods that go beyond the federal floor when the adverse action is based on criminal history. Three of them require five business days plus an individualized written assessment; one of them requires ten business days flat. Together they cover the bulk of the United States population center.

| Jurisdiction | Required wait | Triggered by | Authority |
|---|---|---|---|
| **Federal floor** | 5 business days (operational) | Any pre-adverse action | FCRA \u00a7604(b)(3)(A); FTC employer guidance |
| **California** | 5 business days; +5 more if candidate disputes accuracy | Any decision rescinding offer based on conviction history | [2 CCR \u00a711017.1](https://calcivilrights.ca.gov/wp-content/uploads/sites/32/2022/11/Fair-Chance-Act-FAQ_ENG.pdf) (Fair Chance Act regs, Oct 2023) |
| **Los Angeles (City)** | 5 business days, with written individualized assessment, position held open | Rescinding conditional offer based on criminal history | [LA Fair Chance Initiative for Hiring Ordinance](https://bca.lacity.gov/sites/default/files/Uploads/fciho/FCIHO%20Notice%20to%20Applicants%20for%20Private%20Employers%20-%20English%20ADA%20Final.pdf) |
| **New York City** | 5 business days, with written Article 23-A analysis shared, position held open | Rescinding conditional offer based on criminal history | [NYC Fair Chance Act enforcement guidance](https://www.nyc.gov/site/cchr/law/fair-chance-act.page) |
| **Philadelphia** | **10 business days** | Adverse action based on criminal records | [Bill 250373-A](https://files.amlegal.com/pdffiles/Philadelphia/250373-A.pdf) (Oct 2025 amendments to FCRSS) |

Philadelphia is the outlier. The city's [Fair Criminal Record Screening Standards](https://www.phila.gov/services/crime-law-justice/report-a-crime-or-concern/discrimination-and-unfair-practices/file-a-complaint-about-criminal-record-discrimination-in-employment/) were amended in October 2025 to require employers to give candidates **a full ten business days** \u2014 twice the federal floor \u2014 to submit evidence of inaccuracy or evidence of rehabilitation and mitigating factors before final adverse action. That is not an industry rule of thumb; it is a city ordinance, enforced by the Philadelphia Commission on Human Relations, with damages exposure for noncompliance.

California's regulations work differently. The Fair Chance Act regs at [2 CCR \u00a711017.1](https://calcivilrights.ca.gov/wp-content/uploads/sites/32/2022/11/Fair-Chance-Act-FAQ_ENG.pdf), modified in October 2023 and now in full effect, require five business days after the preliminary decision notice. But if the candidate notifies the employer in writing that they are disputing the accuracy of the conviction history report, the employer must give an additional five business days \u2014 extending the maximum waiting window in California to ten business days. California also requires a written preliminary decision notice that identifies the specific disqualifying conviction(s), which is more than the federal pre-adverse package requires.

Los Angeles and New York City impose an additional procedural layer rather than a longer clock. Both require employers to perform a written individualized assessment of the criminal history against the duties of the specific job before adverse action can be finalized \u2014 Los Angeles under its [Fair Chance Initiative for Hiring Ordinance](https://bca.lacity.gov/sites/default/files/Uploads/fciho/FCIHO-factsheet-ADA-%20English%2004.14.26.pdf), and New York City under the [Fair Chance Act](https://www.nyc.gov/site/cchr/law/fair-chance-act.page) and the Article 23-A analysis it incorporates from the New York Correction Law. Both then require employers to share that assessment with the candidate, hold the position open, and give the candidate at least five business days to respond. The clock is the same as the federal floor, but the documentation is materially heavier, and skipping the assessment is treated as evidence of disparate impact in litigation.

Los Angeles County added its own [Fair Chance Ordinance for Employers](https://www.seyfarth.com/news-insights/employers-face-onerous-compliance-obligations-under-the-new-los-angeles-county-fair-chance-ordinance.html) in 2024, layering further documentation requirements on top of the city ordinance for employers operating in the county. Employers physically located in the city of Los Angeles need to comply with both.

## The states without an overlay

The remaining forty-six states do not impose a statutory waiting period beyond the federal FCRA floor for adverse actions based on background reports. That includes Alabama, Alaska, Arizona, Arkansas, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, and Wyoming. Several of these states \u2014 notably Illinois, Massachusetts, New Jersey, and Washington \u2014 have ban-the-box laws that govern *when* the criminal history can be considered, but they do not extend the waiting period itself once the pre-adverse notice has been sent.

A handful of other cities \u2014 including Seattle, San Francisco, and Austin \u2014 have fair-chance ordinances with their own procedural requirements, but none currently extend the waiting clock beyond five business days. Multi-state employers should verify city-level overlays for any jurisdiction in which they have a meaningful headcount, but the four jurisdictions above are the only ones where a non-Philadelphia, non-California, non-LA, non-NYC waiting policy will produce a documented violation purely on the timing question.

## What this means operationally

The cleanest policy for a multi-state employer is to **default to ten business days everywhere**. It matches the strictest jurisdiction (Philadelphia), eliminates per-state branching in the ATS, and removes any "did we count business days correctly in this jurisdiction" exposure. The cost is a slightly longer time-to-fill, but for most non-hourly roles the marginal day or two is operationally invisible compared to the litigation exposure of getting the timing wrong.

If ten business days is operationally too slow \u2014 in high-velocity hourly hiring, for example \u2014 the next best policy is to split: ten business days for Philadelphia hires, five business days everywhere else, with the clock measured from documented candidate receipt rather than employer send date, and an automatic pause built into the ATS the moment a dispute is filed. The split policy works, but it requires the ATS to know the candidate's work location and the disposition of any dispute, which is more engineering than most employers expect.

A third pattern, common in regulated industries, is to default to seven calendar days everywhere and add California-specific and LA-specific and NYC-specific written-assessment templates that fire automatically when the candidate's location matches. Seven calendar days falls below the Philadelphia minimum, so this pattern only works for employers without a Philadelphia footprint.

Whatever the policy, three things have to be true to defend the timing in court. First, the start of the clock has to be candidate receipt, not employer send date \u2014 which means certified mail with delivery confirmation, or an email-tracking step, or the candidate-portal acknowledgment workflow most modern background-check vendors provide. Second, the clock has to pause the moment a dispute is filed, and the final adverse action has to wait for the dispute to resolve. Third, the policy has to be written down somewhere the plaintiff's bar can be shown, because in a class action the absence of a documented policy is itself treated as evidence of recklessness.

## How PreciseHire handles this

Our [adverse action workflow](/services/criminal-background-checks) is built around the ten-business-day default with automatic per-jurisdiction overlays for California, Los Angeles, New York City, and Philadelphia. The Philadelphia overlay enforces the ten-business-day minimum even if a hiring manager tries to override it; the California overlay automatically extends the clock by five business days the moment a candidate flags a dispute; the LA and NYC overlays prompt the hiring manager to complete the written individualized assessment before the system will let the final notice go out. The clock starts on candidate-portal acknowledgment, not on employer send. We document every step in an audit trail you can hand to outside counsel.

If you want a second pair of eyes on your current adverse-action timing \u2014 particularly if you have a Philadelphia or California footprint \u2014 [reach out](/contact) and we will review your current waiting-period policy, your dispute-pause logic, and your jurisdictional overlays before a plaintiff's attorney does.

## TL;DR

- The federal FCRA waiting period is "reasonable" \u2014 operationally five business days, measured from candidate receipt rather than employer send date.
- Four jurisdictions extend it: California (5 business days, +5 more if disputed), Los Angeles, New York City (both 5 business days plus a written individualized assessment), and Philadelphia (a flat 10 business days).
- The cleanest multi-state policy is to default to 10 business days everywhere, matching Philadelphia, and to pause the clock automatically when a candidate files a dispute.
`,
  },
  {
    slug: "pre-adverse-action-notice-requirements-timing-content-and-documents",
    title: "Pre-Adverse Action Notice Requirements: Timing, Content, and the Documents You Must Include",
    metaTitle: "Pre-Adverse Action Notice Requirements (FCRA, 2026)",
    description:
      "What the FCRA requires in a pre-adverse action notice — the three documents, the wait time, the March 2024 CFPB form change, and the four mistakes that produce the most lawsuits.",
    category: "Compliance",
    tags: ["FCRA", "Adverse Action", "Pre-Adverse Notice", "Hiring Compliance"],
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
    datePublished: "2026-05-11",
    readingMin: 7,
    image: ASSETS.serviceCriminal,
    excerpt:
      "The pre-adverse action notice is the single most-litigated step in the background-check lifecycle. Three documents, one waiting period, and a 2024 form change most employers still haven't applied.",
    markdown: `The pre-adverse action notice is the single most litigated step in the entire background-check lifecycle. It is also the step employers most often rush, skip, or fill in with the wrong form. Every year, plaintiffs' firms file class actions against well-meaning employers whose only mistake was sending the final adverse decision before the law allowed — or sending the right notice with the wrong attachment.

This article walks through exactly what the Fair Credit Reporting Act requires in a pre-adverse action notice — the three things that must go in the envelope, how long you have to wait before acting, what the March 2024 CFPB form change means, and where the most expensive mistakes happen. It is the tactical complement to our broader [step-by-step walkthrough of the FCRA adverse action procedure](/resources/adverse-action-fcra-step-by-step-walkthrough-for-hiring-managers).

## What the FCRA actually says

The pre-adverse action requirement lives in [section 604(b)(3)(A) of the FCRA](https://www.law.cornell.edu/uscode/text/15/1681b), codified at 15 U.S.C. § 1681b(b)(3)(A). The statutory language is short, and worth reading in the original because most employer mistakes come from paraphrasing it badly:

> "in using a consumer report for employment purposes, before taking any adverse action based in whole or in part on the report, the person intending to take such adverse action shall provide to the consumer to whom the report relates — (i) a copy of the report; and (ii) a description in writing of the rights of the consumer under this title, as prescribed by the Bureau under section 609(c)(3)."

Two things to notice. First, the trigger is "based in whole or in part" — even if the report is one of several reasons you are leaning toward not hiring, the procedure applies. Second, the obligation runs *before* the adverse action, not after. There is no "send the rejection and then mail the report" version that complies with the statute.

## The three documents you must include

The pre-adverse package has three pieces. Skip any one of them and the package is non-compliant.

**1. A pre-adverse action notice (the cover letter).** A short letter telling the candidate you are considering adverse action based in whole or in part on the consumer report and that you are providing the report and a summary of their rights so they can review the information. The notice itself does not have prescribed statutory language, but it has to make clear what is happening so the candidate understands why they are receiving the package and what their next step is.

**2. A copy of the consumer report.** The full report you received from your background-check provider — not a summary, not a redacted version, not a "the only thing that hit was X" abstract. The candidate has a right to see exactly what the employer saw.

**3. The CFPB's "Summary of Your Rights Under the Fair Credit Reporting Act."** This is the prescribed form referenced in the statute. The Consumer Financial Protection Bureau publishes it as Appendix K to 12 C.F.R. Part 1022 and provides current model versions in English and Spanish on its [model forms and disclosures page](https://www.consumerfinance.gov/compliance/compliance-resources/other-applicable-requirements/fair-credit-reporting-act/model-forms-and-disclosures/). This is also the document most often wrong in 2026 — see below.

## The March 2024 CFPB form update — and why it still trips employers

On March 20, 2024, a revised version of the Summary of Your Rights took effect. The old form, which had been used for years, was deemed non-compliant after that date. The substantive changes were small — primarily updates reflecting later CFPB rulemaking and clearer language about how consumers can dispute information — but the compliance impact is binary. If your packet still uses the pre-March-2024 form in 2026, every notice you have sent since the deadline is technically defective.

We see this in audits more than any other single error. Background-check vendors automatically updated their templates, but employers who built their own notice packets in HRIS or ATS workflows often kept the older PDF embedded in the email or letter template and never refreshed it. The fix is mechanical — pull the current version directly from the CFPB and replace whatever you are sending today — but the legal exposure is not, because every defective notice is its own potential cause of action under the FCRA's statutory damages framework.

## How long you must wait before final adverse action

The FCRA does not specify a number of days between the pre-adverse notice and the final adverse action. It only requires a "reasonable" period, which has two components: enough time for the candidate to receive the package, and enough time to dispute information they believe is inaccurate or incomplete with the consumer reporting agency that produced the report.

The durable industry minimum, anchored in informal FTC staff guidance and consistently echoed by the [FTC's plain-language guidance for employers](https://www.ftc.gov/business-guidance/resources/using-consumer-reports-what-employers-need-know), is **five business days**. Some employers wait longer — seven business days, or ten calendar days — particularly in regulated industries where a longer cushion provides additional defensibility. But five business days is the floor we recommend for any employer that wants to settle a dispute on the merits rather than on the timing question.

A few important nuances. The clock starts when the candidate would reasonably have received the package, not when you put it in the mail. If you send by certified mail, you need delivery confirmation. If you send by email, you need to know it actually reached the candidate's inbox and not their spam folder. And if the candidate disputes the report during the waiting period, the clock pauses while the dispute is investigated — sending the final adverse action while a dispute is open is one of the fastest ways to trigger a class-action complaint.

## What goes in the final adverse action notice

If the waiting period passes and you still intend to take adverse action, the final notice must include the items required by [section 615(a) of the FCRA](https://www.law.cornell.edu/uscode/text/15/1681m), 15 U.S.C. § 1681m(a). Specifically: notice that adverse action has been taken; the name, address, and toll-free telephone number of the consumer reporting agency that provided the report; a clear statement that the consumer reporting agency did not make the decision and cannot explain the specific reasons for it; notice of the consumer's right to obtain a free copy of the file from the CRA within 60 days; and notice of the right to dispute the accuracy or completeness of any information in the report.

State law often adds to this. California's [Investigative Consumer Reporting Agencies Act](https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?division=3.&chapter=&part=4.&lawCode=CIV&title=1.6A) (Cal. Civ. Code § 1786 et seq.) imposes additional disclosure requirements, and several jurisdictions — including New York City under its Fair Chance Act and Los Angeles under its Fair Chance Initiative for Hiring Ordinance — require employers to provide an individualized assessment before taking adverse action based on criminal history. These overlay requirements do not replace the federal procedure; they sit on top of it.

## The four mistakes that produce the most lawsuits

In our work auditing client adverse-action workflows, the same mistakes appear over and over.

The first is sending the final adverse action notice too soon — within one or two days of the pre-adverse notice — usually because the hiring manager has already moved on to a different candidate and the HR team feels pressure to close the loop. The plaintiff's bar treats this as a strict-liability fact pattern.

The second is using an outdated CFPB Summary of Rights, almost always because the form was hard-coded into a template years ago and never refreshed. The fix takes ten minutes and prevents an entire class of claims.

The third is sending the pre-adverse notice without the actual report. This usually happens when the report is large, the cover letter says "see attached," and the attachment never makes it onto the email. The notice without the report is a deficient notice.

The fourth is failing to send the pre-adverse notice at all when the employer relies on a third-party assessment — for example, a behavioral score, an AI-generated risk rating, or an algorithmic background dossier. The CFPB's [October 2024 advisory circular on background dossiers and algorithmic scores](https://www.consumerfinance.gov/about-us/newsroom/cfpb-issues-guidance-to-protect-consumers-from-illegal-background-dossier-checks/) made explicit that the FCRA's adverse action procedure applies to these third-party assessments just as it applies to traditional background reports. If a vendor's score influences the decision, the procedure applies.

## What this means for employers

A defensible pre-adverse process is mostly mechanical. Four operational steps protect you against the bulk of the litigation risk.

First, **standardize one packet** — cover letter, full report, current CFPB Summary of Rights — and deliver it through a single, auditable channel (your background-check provider's adverse-action workflow, or a documented HRIS step). Stop sending pre-adverse notices from individual hiring-manager email accounts.

Second, **set the wait at five business days minimum**, with a documented start clock based on candidate receipt rather than send date. Build the waiting period into your ATS so the final adverse action cannot be issued early.

Third, **refresh your CFPB Summary of Rights at least annually** and any time CFPB issues a new model. Audit your live templates today against the current version on the CFPB's model forms page.

Fourth, **train hiring managers that "I am still thinking about it" is adverse action.** Quietly removing a candidate from consideration based on the report — without sending the notice — is the same legal event as a formal rejection.

If you would like a second pair of eyes on your adverse-action workflow, our [criminal records service team](/services/criminal-background-checks) can review your current notice templates, your timing protocols, and the way your CFPB Summary of Rights is delivered, and flag the most expensive gaps before a plaintiff's attorney does. You can reach us through our [contact page](/contact).

## TL;DR

- The FCRA pre-adverse action notice must include three documents: a cover letter, the full consumer report, and the current CFPB Summary of Your Rights — the version effective March 20, 2024.
- The waiting period before final adverse action is statutorily "reasonable" but operationally five business days minimum, measured from candidate receipt rather than employer send date.
- The same procedure applies to AI scores and algorithmic background dossiers under the CFPB's October 2024 circular — if a third-party assessment influences the decision, the two-notice procedure applies.
`
  },
  {
    slug: "fcra-disclosure-and-authorization-form-what-most-employers-get-wrong",
    title: "The FCRA Disclosure and Authorization Form: What Most Employers Get Wrong",
    metaTitle: "FCRA Disclosure and Authorization Form: Common Employer Mistakes",
    description:
      "The single most-litigated document in U.S. hiring. A 2026 walkthrough of the FCRA disclosure and authorization form — every mistake that costs employers, and how to fix it.",
    category: "Compliance",
    tags: ["FCRA", "Disclosure", "Authorization", "Hiring Compliance"],
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
    datePublished: "2026-05-10",
    readingMin: 8,
    image: ASSETS.serviceCriminal,
    excerpt:
      "Costco paid $2.5M. Petco $1.2M. Frito-Lay $2.4M. None of those cases turned on a bad background report — they turned on a single sheet of paper.",
    markdown: `Costco paid $2.5 million. Petco paid $1.2 million. Frito-Lay paid $2.4 million. Omnicare paid $1.3 million. In September 2025, [PeopleFacts settled a similar case for $2.4 million](https://www.classaction.org/news/2.4m-peoplefacts-settlement-ends-lawsuit-over-alleged-employment-background-check-violations), and in May 2025 Robert Half settled its own background-check class action for $2.2 million. None of those cases turned on a bad background report. They turned on a single sheet of paper: the **FCRA disclosure and authorization form** that every employer hands a candidate before running a check.

Of all the documents in a U.S. hiring process, this is the one with the highest ratio of class-action exposure to actual employer attention. Most teams treat it as a formality and copy-paste a template that has been quietly out of compliance for years. This walkthrough lays out exactly what the form has to do under federal law, the patterns courts have rejected, and the specific edits most employers need to make right now.

## What the law actually says

The operative provision is [FCRA section 604(b)(2)(A), 15 U.S.C. § 1681b(b)(2)(A)](https://www.ftc.gov/legal-library/browse/statutes/fair-credit-reporting-act). Before an employer can lawfully order a consumer report for employment purposes, two things must happen.

First, the employer must provide a **clear and conspicuous disclosure** to the candidate, **in writing**, **in a document that consists solely of the disclosure**, telling the candidate that a consumer report may be obtained for employment purposes. Second, the candidate must **authorize the report in writing**. The authorization may appear on the same physical document as the disclosure, but the disclosure portion itself must stand alone.

Those two words — *solely* and *clear and conspicuous* — are where almost every lawsuit lives.

## What the FTC says employers can and cannot include

The Federal Trade Commission, which enforces this section of the FCRA, has been unusually specific in its employer guidance. The agency's ["Using Consumer Reports: What Employers Need to Know"](https://www.ftc.gov/business-guidance/resources/using-consumer-reports-what-employers-need-know) bulletin says the disclosure must be in a stand-alone format, that it **cannot be included in an employment application**, and that an employer may include "some minor additional information in the notice, like a brief description of the nature of consumer reports — but only if it does not confuse or detract from the notice."

That is a narrow lane, and the case law has narrowed it further. In [*Syed v. M-I, LLC*](https://cdn.ca9.uscourts.gov/datastore/opinions/2017/01/20/14-17186.pdf) (9th Cir. 2017), the court held that a liability waiver bundled into the disclosure form was a **willful** FCRA violation — willful because the statute is unambiguous and the employer had no reasonable basis for its reading. In *Gilberg v. California Check Cashing Stores* (9th Cir. 2019), the same court held that including **state-law disclosures** in the same document also violates the standalone rule. The court took the word *solely* literally and refused to imply an exception for state disclosures, even though the state disclosures arguably helped the candidate.

*Gilberg* also flunked the form on the second prong — clear and conspicuous — because it described the consent as "all-encompassing," used an incomplete sentence missing a subject, and mixed federal and state language in a way that would confuse a reasonable reader. *Walker v. Fred Meyer* (9th Cir. 2020) softened the geography a bit by holding that the disclosure can be delivered *alongside* other onboarding documents, but the document itself still must contain only the disclosure (and, if combined, the authorization).

## The ten mistakes we see most often

When we audit a new employer's hiring stack, ten patterns account for roughly 90 percent of the FCRA-disclosure violations we find. Most of them are template artifacts — employers inherited a form from a prior vendor or from generic HR software and never re-read it.

**1. The disclosure is buried inside the employment application.** This is the most common and the most clearly unlawful. The FTC says explicitly that the notice cannot be in an employment application. If your applicant tracking system surfaces the disclosure as one paragraph among many on a multi-section application form, you are out of compliance.

**2. The form includes a liability release.** A line like "I release the employer and any consumer reporting agency from any and all claims arising from the report" is the *Syed* pattern. It converts a technical violation into a **willful** one, which under the FCRA opens the door to statutory damages of $100 to $1,000 per violation plus attorneys' fees.

**3. The form is padded with state-specific disclosures.** Employers operating in California, New York, Washington, or Massachusetts often try to be thorough by stacking every state's required language on the same page. *Gilberg* rejected exactly this in the Ninth Circuit, and the same reasoning has been adopted by district courts elsewhere. The defensible pattern is a single federal disclosure plus separate state notices delivered as separate documents.

**4. The "explanatory" language crosses into confusion.** The FTC allows a brief plain-English description of what a consumer report is. It does not allow a one-page recitation of every kind of record the report might cover, written in legalese. If your form contains a paragraph that begins with "This notice and authorization is all-encompassing," delete it.

**5. The authorization isn't actually separate.** The disclosure and authorization may sit on the same document, but they must be two distinct elements. An e-signature that lives on a generic application page and isn't tied to a specific "I authorize a consumer report" sentence is vulnerable to challenge.

**6. The form uses the outdated CFPB *Summary of Your Rights* version.** The CFPB updated the mandatory *Summary of Your Rights* form, and as of [March 20, 2024 every employer and CRA is required to use the new version](https://www.clearstar.net/employers-using-background-checks-must-use-updated-fcra-rights-form-by-march-20-2024/). Using the prior version is itself a violation. Check the revision date on the form your provider delivers with every report — it should be the 2023 version.

**7. The "throughout employment" language is buried.** Many employers want a single authorization that covers periodic re-checks throughout employment. The statute permits this, but only if the authorization says so **clearly and conspicuously**. A six-point footnote at the bottom of the form is not clear and conspicuous and will not support a re-check three years later.

**8. Investigative consumer reports skip the extra notice.** If the report includes personal interviews about character, reputation, or lifestyle — the FCRA calls these *investigative consumer reports* under section 606 — the candidate is entitled to **an additional, separate notice** describing the scope and nature of the investigation. Most employers and most ATS templates miss this entirely.

**9. The disclosure is delivered only by hyperlink.** A candidate clicking through an onboarding flow who sees a link labeled "Background check disclosure" but never opens it has not received the disclosure in any meaningful sense. The form must actually appear on the candidate's screen as part of the flow, not as a link to a PDF the candidate could ignore.

**10. Algorithmic and AI-driven dossiers are run without any disclosure at all.** Per the CFPB's [October 2024 advisory circular](https://www.consumerfinance.gov/compliance/circulars/consumer-financial-protection-circular-2024-06-background-dossiers-and-algorithmic-scores-for-hiring-promotion-and-other-employment-decisions/), background dossiers and AI-generated scores from third-party vendors are **consumer reports** under the FCRA. The same disclosure-and-authorization procedure applies. If your hiring stack pulls a third-party risk score, retention prediction, or social-media analysis, you owe the candidate a disclosure for it.

## What a clean form looks like

A defensible FCRA disclosure and authorization form, in our experience, fits on a single page, contains the elements below, and contains nothing else.

| Section | Contents |
|---|---|
| Title | "Disclosure Regarding Background Investigation" |
| Disclosure paragraph | One short paragraph in plain English, stating that the employer may obtain a consumer report and, if applicable, an investigative consumer report, for employment purposes |
| Optional brief description | One or two sentences describing the categories of information the report may include — only if it does not confuse the notice |
| Throughout-employment language | If applicable, a clearly and conspicuously labeled sentence stating that the authorization covers reports during the term of employment |
| Authorization paragraph | One short paragraph explicitly authorizing the report, with a signature line and date |

State-specific notices, the CFPB *Summary of Your Rights*, and any other onboarding paperwork should be delivered as separate documents, with separate signature lines if required.

For practical context on how this form connects to the rest of the hiring process, see our [criminal records service overview](/services/criminal-records) and our [step-by-step walkthrough of the FCRA adverse action procedure](/resources/adverse-action-fcra-step-by-step-walkthrough-for-hiring-managers).

## What this means for employers

The disclosure and authorization form is not a place for thoroughness or legal hedging. It is a place for radical simplicity, because the statute and the courts treat anything beyond the bare disclosure as a liability accelerator. Three practical moves protect most employers.

Audit the form your ATS is actually presenting to candidates today. Not the form your vendor handed you at onboarding, and not the form sitting on your shared drive — the one a candidate sees in production right now. Print it. Read it. If it contains a liability release, state-law disclosures, an outdated *Summary of Rights*, or language buried in the employment application, replace it before your next hire.

Separate the disclosure from everything else in your onboarding flow. The candidate should see the disclosure on its own screen, sign the authorization on the same document, and proceed. State notices, drug-test consents, and direct-deposit forms each get their own screen.

Document every change with a dated revision history. When a plaintiff's attorney issues a discovery request three years from now, the difference between a $5,000 problem and a $500,000 problem is being able to show exactly when the form was updated and what was in each prior version.

If you would like a second pair of eyes on the form your candidates are actually seeing, [our compliance team can review your current disclosure and authorization workflow](/contact) and flag the highest-risk language before anyone else does.

## TL;DR

- The FCRA disclosure and authorization form must consist solely of the disclosure, be clear and conspicuous, and be paired with a separate written authorization that may sit on the same document.
- Liability waivers, state-specific disclosures, outdated *Summary of Your Rights* forms, and burial inside the employment application are the four mistakes that drive the largest class-action settlements.
- As of the CFPB's October 2024 circular, algorithmic and AI-driven background dossiers are consumer reports too — the same disclosure-and-authorization rules apply to them.
`
  },
  {
    slug: "adverse-action-fcra-step-by-step-walkthrough-for-hiring-managers",
    title: "Adverse Action Under the FCRA: A Step-by-Step Walkthrough for Hiring Managers",
    metaTitle: "FCRA Adverse Action: Step-by-Step Guide for Employers",
    description:
      "A 2026 walkthrough of the FCRA adverse action process for hiring managers — what to send, when to send it, and how to avoid the lawsuits that catch employers off guard.",
    category: "Compliance",
    tags: ["FCRA", "Adverse Action", "Hiring Compliance"],
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
    datePublished: "2026-05-10",
    readingMin: 8,
    image: ASSETS.serviceCriminal,
    excerpt:
      "The most expensive mistake on a background check isn't running the wrong report — it's rejecting a candidate without following the FCRA's two-notice procedure.",
    markdown: `The most expensive mistake an employer can make on a background check is not running the wrong report. It is rejecting a candidate based on the report without following the Fair Credit Reporting Act's two-notice procedure. Class-action settlements in this area routinely run into the millions of dollars, and J.B. Hunt's $5 million 2025 resolution is only the latest reminder that hiring managers, not just compliance teams, need to know exactly what the law requires before clicking "do not hire."

This walkthrough lays out the FCRA adverse action process the way a hiring manager actually encounters it: a candidate's background report comes back with something disqualifying, and you have to decide what happens next. We pull directly from [the FTC's employer guidance](https://www.ftc.gov/business-guidance/resources/using-consumer-reports-what-employers-need-know) and [the CFPB's October 2024 advisory circular on background dossiers and algorithmic scores](https://www.consumerfinance.gov/about-us/newsroom/cfpb-takes-action-to-curb-unchecked-worker-surveillance/), which together set the federal floor that every U.S. employer must meet as of 2026.

## What "adverse action" actually means

Under the Fair Credit Reporting Act (FCRA), an adverse action is any employment decision that hurts the candidate or employee and that is influenced — even partially — by information in a consumer report. That covers the obvious cases like rescinding an offer or terminating an employee, and it also covers the less obvious ones: pulling a promotion, reassigning someone to a lower-paying role, or moving a final-stage candidate back into the maybe pile because something showed up on the report.

The trigger is the influence of the report, not the severity of the decision. If a hiring manager looks at the report and the report meaningfully shapes the outcome, the adverse action procedure applies. This is the part that catches employers by surprise: a manager who quietly removes a candidate from consideration without ever sending a formal rejection has still taken an adverse action under the FCRA, and the same notice obligations attach. For background on what these reports typically include, see our [criminal records service overview](/services/criminal-records).

## Step 1 — Send the pre-adverse action notice

Before you take the adverse action, the FCRA requires you to give the candidate three things. This is the **pre-adverse action notice**, and it is the step employers most often skip or rush.

The first item is the notice itself, in writing, telling the candidate that you are considering taking adverse action based on information in their consumer report. Plain language is fine; legalese is not required. The second item is a complete copy of the consumer report you relied on. Not a summary, not the parts you found relevant — the full report exactly as you received it from the consumer reporting agency (CRA). The third item is a copy of the document titled *A Summary of Your Rights Under the Fair Credit Reporting Act*, which the CRA is required to supply to you and which you must pass through to the candidate.

The purpose of this step, as the FTC puts it in its plain-language guide for employers, is to give the person "an opportunity to review the report and explain any negative information." That is not a courtesy. It is the candidate's statutory right, and it is the moment at which a clean compliance posture begins to diverge from a class-action exposure.

## Step 2 — Wait a reasonable time before the final decision

The FCRA does not put a number on how long you have to wait between the pre-adverse notice and the final adverse action notice. The statute says only that the wait must be "reasonable." In practice, FTC informal guidance and a long line of court decisions have settled on **five business days** as the durable industry minimum, and that is the figure most reputable background-screening providers, including PreciseHire, recommend.

The five-business-day floor exists for a substantive reason. It gives the candidate enough time to actually look at the report, identify any errors, contact the CRA, and either dispute the record or submit a written explanation to you. If your hiring system automatically triggers the final adverse action notice 24 or 48 hours after the pre-adverse, you have effectively turned the FCRA's two-notice procedure into a one-step procedure with extra paperwork — and that is exactly the fact pattern plaintiffs' attorneys file class actions on.

If a candidate disputes the report during the waiting period, pause the clock. Wait for the CRA to complete its reinvestigation under FCRA section 611 and issue an updated report. Only then should you decide whether to proceed with the adverse action based on the corrected record.

## Step 3 — Send the final adverse action notice

If, after the waiting period and any disputes, you decide to proceed with the adverse decision, the FCRA requires a second notice. This **final adverse action notice** can be delivered orally, in writing, or electronically, but most employers send it in writing for the same documentation reason they send everything else in writing.

The notice must include four pieces of information. First, a statement that the adverse action was based at least in part on information in a consumer report. Second, the name, address, and toll-free phone number of the CRA that supplied the report. Third, a statement that the CRA did not make the adverse decision and cannot supply the specific reasons for it — this is required by [FCRA section 615(a)](https://www.ftc.gov/legal-library/browse/statutes/fair-credit-reporting-act) and is one of the most-litigated content requirements. Fourth, a notice of the candidate's right to dispute the accuracy or completeness of the report with the CRA and to request a free additional copy of the report from that CRA within 60 days.

For a deeper template walkthrough of both notices, see our existing piece on [creating a pre-adverse action notice](/resources/guidelines-for-creating-a-pre-adverse-action-notice).

## The 2024 CFPB modernization: AI and algorithmic background dossiers

Until recently, employers could reasonably assume the FCRA's adverse action procedure applied only to traditional background checks: criminal records, employment verifications, education, motor vehicle records, drug tests. That assumption is no longer safe.

In October 2024, the Consumer Financial Protection Bureau issued an advisory circular making clear that the FCRA's full set of obligations — disclosure, consent, adverse action notices, dispute rights — also apply to **algorithmic background dossiers and "black box" AI scores** that third parties sell to employers to predict worker behavior, flag retention risk, evaluate social media activity, or trigger automated discipline. As CFPB Director Rohit Chopra put it in the agency's announcement, "The kind of scoring and profiling we've long seen in credit markets is now creeping into employment."

For hiring managers, the practical takeaway is simple: if you are buying any third-party assessment of a candidate or employee — not just a background check, but an AI-generated risk score, a social-media analysis, a productivity prediction — and you use it to make an adverse employment decision, the same two-notice procedure applies. The fact that the underlying technology is opaque does not relax the FCRA. If anything, it raises the bar, because the candidate's right to dispute inaccurate information is harder to satisfy when the report itself is a number rather than a record.

## The Title VII overlay

The FCRA is the federal floor, not the ceiling. When the report contains criminal-history information, [the EEOC's 2012 enforcement guidance on the consideration of arrest and conviction records](https://www.eeoc.gov/laws/guidance/enforcement-guidance-consideration-arrest-and-conviction-records-employment-decisions) requires employers to make an individualized assessment that is job-related and consistent with business necessity. The pre-adverse action waiting period is the natural — and practically the only — moment in your hiring process where you can do that assessment. If you have to defend the decision later, you want a written record showing that you considered the nature of the offense, the time elapsed since the offense, and the nature of the job before you sent the final notice.

## What this means for employers

Translating the federal framework into operational practice, four steps will keep most employers on the right side of the law as of 2026.

**Build the two-notice procedure into your applicant-tracking system, not your hiring manager's discretion.** Adverse action is the single most-litigated FCRA requirement, and the most common pattern in class-action complaints is a hiring manager who sent the final rejection without ever sending the pre-adverse notice. Treat the pre-adverse notice as a system-enforced step that cannot be skipped. The system, not the manager, should be the gatekeeper.

**Set a five-business-day default waiting period and document any deviation.** The statute says "reasonable." The defensible operational answer is five business days, and the burden to justify a shorter window will fall on you in litigation. If you have a genuine business reason to extend the window — for example, the candidate disputed the report and the CRA is mid-reinvestigation — pause the timer and document the reason in the file.

**Use the same procedure for AI scores and algorithmic dossiers.** As of the CFPB's 2024 circular, the FCRA's adverse action procedure applies to any third-party-supplied assessment that influences an adverse decision, not just to traditional background reports. If your vendor stack includes AI-driven candidate scoring or social-media analysis, route those inputs through the same two-notice workflow.

**Train hiring managers on what counts as adverse action.** Quietly removing a candidate from a shortlist counts. So does pulling a promotion or reassigning to a lower-paying role. Anyone in your organization who makes a candidate-facing decision based on a consumer report needs a working definition of adverse action and a clear escalation path back to the compliance procedure.

If you would like a second pair of eyes on your adverse action workflow, [our compliance team can walk through your current process](/contact) and flag the highest-risk gaps before a plaintiff's attorney does.

## TL;DR

- Adverse action under the FCRA is a two-notice procedure: a pre-adverse notice with a copy of the report and the FCRA summary of rights, followed by a final adverse action notice after a reasonable waiting period.
- "Reasonable" is not defined by statute, but five business days is the durable industry minimum and the figure most defensible in litigation.
- The CFPB's October 2024 circular extends the same adverse action procedure to AI scores and algorithmic background dossiers — if a third-party assessment influences the decision, the two-notice procedure applies.
`
  },
  {
    slug: "fcra-compliant-background-checks-guide",
    title: "The Complete Guide to FCRA-Compliant Background Checks",
    metaTitle: "FCRA-Compliant Background Checks: Employer Guide (2026)",
    description:
      "Step-by-step FCRA compliance for employers — disclosures, authorizations, adverse action, and the documentation auditors actually ask for.",
    category: "Compliance",
    tags: ["FCRA", "Compliance", "Adverse Action"],
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
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
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
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
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
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
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
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
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
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
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
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
    author: "PreciseHire Editorial Team",
    authorSlug: "precisehire-team",
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
export type PostIndex = Omit<Post, "markdown"> & { legacySlug?: string; topic: Exclude<PostTopic, "All Topics"> };

import { MIGRATED_POSTS } from "./migrated_posts";

// Strip markdown from hand-written POSTS for the combined index, then attach derived topic.
const HANDWRITTEN_INDEX: PostIndex[] = POSTS.map(({ markdown: _markdown, ...rest }) => ({
  ...rest,
  topic: deriveTopic(rest),
}));

// Migrated posts: attach derived topic at index build time so filtering is fast.
const MIGRATED_INDEX: PostIndex[] = MIGRATED_POSTS.map((p) => ({
  ...p,
  topic: deriveTopic(p),
}));

// Combined index, hand-written first (newest editorial), then migrated by date
export const ALL_POSTS_INDEX: PostIndex[] = [
  ...HANDWRITTEN_INDEX,
  ...MIGRATED_INDEX,
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
