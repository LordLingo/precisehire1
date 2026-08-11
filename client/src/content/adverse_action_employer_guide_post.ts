import { ASSETS } from "./site";

export const ADVERSE_ACTION_EMPLOYER_GUIDE_POST = {
  slug: "background-check-adverse-action-employer-guide",
  title: "Background Check Adverse Action: A 2026 Employer Workflow Guide",
  metaTitle: "Background Check Adverse Action Guide (2026)",
  description:
    "Build a defensible FCRA adverse-action workflow with pre-adverse notices, dispute handling, final notices, ATS controls, and vendor questions.",
  category: "Compliance" as const,
  tags: [
    "FCRA",
    "Adverse Action",
    "Background Checks",
    "Staffing Agencies",
    "ATS Integration",
    "Candidate Disputes",
    "Compliance",
  ],
  author: "PreciseHire Editorial Team",
  authorSlug: "precisehire-team",
  datePublished: "2026-08-11",
  readingMin: 14,
  image: ASSETS.serviceCriminal,
  excerpt:
    "A practical employer workflow for pre-adverse notices, candidate disputes, final adverse action, ATS controls, staffing-client ownership, and vendor selection.",
  topic: "Criminal Records" as const,
};

export const ADVERSE_ACTION_EMPLOYER_GUIDE_MARKDOWN = `Adverse action is where a background-check program stops being a search product and becomes a hiring workflow.

A criminal record, employment discrepancy, driving-history issue, or other report finding may create a reason for review. But the screening company does not make the hiring decision, and an employer should not treat a report flag as an automatic rejection. When a third-party consumer report influences a negative employment decision, the Fair Credit Reporting Act (FCRA) generally creates a before-and-after notice process designed to give the applicant or employee a chance to see the report and challenge inaccurate information.

This guide is operational information for employers and staffing firms, not legal advice. Federal, state, and local requirements can overlap, and employers should have qualified counsel review their decision criteria, forms, timing rules, and jurisdiction-specific workflow.

## The 2026 federal baseline

The Federal Trade Commission's legal library currently posts a [Fair Credit Reporting Act compilation revised March 2026](https://www.ftc.gov/legal-library/browse/statutes/fair-credit-reporting-act). For employers using third-party background reports, the practical federal sequence is still straightforward:

1. Before obtaining the report, provide the required disclosure and obtain authorization.
2. If information in the report may lead to an adverse employment decision, provide the applicant or employee a copy of the report and the required FCRA Summary of Rights before the decision is final.
3. Give the person a meaningful opportunity to review the information and raise a dispute or explanation.
4. If the employer then takes adverse action based on the report, send the final adverse-action notice with the required consumer-reporting-company information and dispute rights.

The FTC's current [Using Consumer Reports: What Employers Need to Know](https://www.ftc.gov/business-guidance/resources/using-consumer-reports-what-employers-need-know) describes the same pre-adverse and final adverse-action steps. The Consumer Financial Protection Bureau also continues to describe employment background reports as consumer reports that can trigger FCRA permission, notice, dispute, and adverse-action obligations. See the CFPB's [employment background screening guidance](https://www.consumerfinance.gov/archive/blog/applying-job-its-important-know-what-goes-your-background-screening-reports/) and its [FCRA compliance resources](https://www.consumerfinance.gov/compliance/compliance-resources/other-applicable-requirements/fair-credit-reporting-act/).

For a broader program review, see the [PreciseHire compliance hub](/compliance) and [background-check compliance checklist](/compliance/checklist).

## What counts as adverse action in employment?

For employment purposes, adverse action is broader than simply declining a new applicant. The FTC gives examples that include:

- Rejecting a job application
- Denying a promotion
- Reassigning an employee
- Terminating an employee
- Taking another unfavorable employment action because of information in a consumer report

The key operational question is not whether your ATS status says "denied." It is whether information from a third-party consumer report was a factor in an unfavorable employment decision.

That means the workflow should be able to pause before a recruiter, hiring manager, branch manager, or client converts a report result into a final employment outcome.

## Step 1: Separate the report from the decision

A screening provider should report verified information and explain the source. The employer should own the employment decision.

This distinction matters because the final adverse-action notice must tell the applicant or employee that the consumer reporting company did not make the decision and cannot explain the employer's specific reason for taking the action.

A strong screening platform therefore avoids labels that look like automated hiring decisions unless the employer has deliberately configured a lawful adjudication workflow. Instead of "fail," useful statuses are more descriptive:

- Review required
- Record requires employer assessment
- Candidate information needed
- Dispute opened
- Updated report received
- Employer decision pending

For staffing agencies, this is especially important. The staffing firm may order the report while an end client influences the placement decision. The parties should define in advance who makes the decision, who sends notices, who receives candidate responses, and who can release or rescind an assignment. Do not leave that ownership to the recruiter handling the placement that day.

See [background checks for staffing agencies](/industries/staffing) for a client-by-client screening model.

## Step 2: Review relevance before starting adverse action

A report can be accurate and still require an employer judgment about relevance.

The EEOC's joint employer guidance with the FTC says background information must be used consistently and without unlawful discrimination. For criminal records, the EEOC advises employers to consider whether an exclusion is job related and consistent with business necessity and to give applicants an opportunity to explain criminal-history information in appropriate circumstances. Review the current [EEOC background-check guidance](https://www.eeoc.gov/laws/guidance/background-checks-what-employers-need-know) and [EEOC criminal-record guidance for small businesses](https://www.eeoc.gov/employers/small-business/criminal-records).

Before launching pre-adverse action, an employer's decision owner should be able to answer:

- What report item is being considered?
- Is the item actually tied to this applicant?
- Is the record complete and current?
- What job duty or client requirement makes the information relevant?
- Is the same standard applied consistently to comparable candidates?
- Does a state, city, licensing rule, or fair-chance law change when or how the information may be considered?
- Does the candidate need an opportunity to provide context beyond the FCRA report-dispute process?

A screening vendor can provide workflow and documentation. It should not substitute its own hiring judgment for the employer's policy.

## Step 3: Send a complete pre-adverse-action package

Before an employer takes adverse action based on information in a consumer report, the FTC says the person must receive:

- A notice that includes a copy of the consumer report relied on
- A copy of "A Summary of Your Rights Under the Fair Credit Reporting Act"

The purpose of giving the information in advance is to let the person review the report and tell the employer if something is wrong.

Your platform should make this a controlled workflow rather than a recruiter attaching documents manually. Ask whether it can:

- Use the current Summary of Rights supplied for the employer's workflow
- Attach the exact report version that triggered review
- Record the date and time the pre-adverse package was sent
- Preserve delivery status
- Route undeliverable email or SMS exceptions to a human
- Prevent the final adverse decision while the case is in review
- Store the notice and report version in the order audit history

The document version matters. If a report is updated after a dispute, the audit trail should show which version was originally reviewed and which version replaced it.

## Step 4: Build a real review window, not a same-minute rejection

The FCRA requires the report and Summary of Rights to be provided before adverse action so the person has an opportunity to review the information. The FTC's employer guidance does not publish one universal federal waiting period that fits every situation.

That makes workflow design important. Employers should work with counsel to establish a review period that is reasonable for their process and that accounts for any state or local rules that impose additional timing, notice, or individualized-assessment requirements.

Operationally, the system should not allow this sequence:

10:01 a.m. — pre-adverse notice sent  
10:02 a.m. — offer automatically rescinded

Even if the documents exist in the audit log, a workflow that immediately finalizes the decision undermines the purpose of the pre-adverse step.

A better system creates a hold state with:

- A configurable review deadline
- Candidate response tracking
- Dispute status
- Recruiter reminders
- Escalation before a candidate start date
- A hard block on final adverse action until the configured review step is completed

## Step 5: Treat disputes as a case-management workflow

The CFPB continues to emphasize that workers have the right to dispute incomplete or inaccurate information in consumer reports and that consumer reporting agencies must investigate disputes and correct or delete information that is inaccurate, incomplete, or cannot be verified. Its [Circular 2024-06 on employment reports](https://www.consumerfinance.gov/compliance/circulars/consumer-financial-protection-circular-2024-06-background-dossiers-and-algorithmic-scores-for-hiring-promotion-and-other-employment-decisions/) discusses those rights in the context of hiring, promotion, reassignment, and retention decisions.

For the employer, the practical goal is to keep the hiring case synchronized with the dispute.

Useful statuses include:

- Candidate disputes report
- CRA dispute opened
- Employer review paused
- Additional identifiers requested
- Court or source reverification pending
- Corrected report issued
- No change after reinvestigation
- Employer review resumed

A recruiter should not have to monitor a separate inbox and remember to reopen the ATS record later.

For high-volume staffing, this is one of the clearest differences between a low-price report vendor and an operating partner: exception handling consumes recruiter time.

## Step 6: Review the corrected report before final action

If the screening company updates the report, the employer should route the corrected version back to the same decision owner.

Do not assume the original disposition should remain unchanged. The employer should compare:

- What changed
- Whether the item being considered was corrected or removed
- Whether the candidate supplied additional context
- Whether the original job-related rationale still applies
- Whether another jurisdiction-specific step is required

The decision record should show that the updated information was reviewed before final action.

## Step 7: Send the final adverse-action notice with the required information

If the employer ultimately takes adverse action based on information in the consumer report, the FTC says the final notice must communicate:

- The name, address, and phone number of the consumer reporting company that supplied the report
- That the consumer reporting company did not make the employment decision and cannot provide the specific reason for it
- The person's right to dispute the accuracy or completeness of information furnished by the reporting company
- The person's right to obtain an additional free report from the reporting company if requested within 60 days

The FTC says the notice may be oral, written, or electronic under the federal rule. In practice, many employers use a written or electronic workflow because it creates a consistent audit trail and makes it easier to prove what information was sent.

The final notice should come from the employer's configured workflow, not from a generic vendor mailbox that makes it look as if the CRA rejected the candidate.

## Step 8: Make ATS integration protect the workflow

An ATS integration should do more than order the background check.

For adverse action, it should support a state machine that keeps the employment decision and screening case aligned. A strong integration can return statuses such as:

1. Report complete
2. Employer review required
3. Pre-adverse notice sent
4. Candidate review period open
5. Dispute pending
6. Updated report received
7. Employer review resumed
8. Final adverse action sent
9. Case closed

The ATS should also preserve who initiated each action and when.

Ask the vendor to demonstrate the actual sequence inside your ATS. A slide that says "adverse action supported" is not enough. Review the [PreciseHire ATS integration guide](/resources/background-check-ats-integration-guide) and [PreciseHire integrations](/integrations) for the broader workflow questions to test.

## Step 9: Verify the screening company's accuracy and dispute controls

The employer owns the hiring decision, but the screening company has its own FCRA responsibilities.

The FTC's current [guidance for employment background screening companies](https://www.ftc.gov/business-guidance/resources/what-employment-background-screening-companies-need-know-about-fair-credit-reporting-act) says consumer reporting agencies must follow reasonable procedures to assure maximum possible accuracy. The FTC identifies warning signs such as mismatched identifiers, duplicate criminal entries, expunged or sealed records, and stale public-record information.

When comparing vendors, ask:

- How are identity matches confirmed before a record is reported?
- What identifiers are required for criminal-record matching?
- How are duplicate cases prevented?
- How are dispositions and current court status updated?
- What happens when a record may be sealed or expunged?
- How are public-record searches kept complete and current?
- How can a candidate open a dispute?
- Can the candidate reach a human?
- How are corrected reports delivered to the employer?
- What is the escalation path when a start date is at risk?

Accuracy and dispute handling are not separate from turnaround time. A fast report that creates a preventable dispute can take longer to hire from than a report that was verified correctly the first time.

Learn more about [PreciseHire criminal background checks](/services/criminal-background-checks).

## Step 10: Control templates by jurisdiction and client

A national employer should not assume one adverse-action template and one timing rule are sufficient everywhere.

State and local fair-chance, credit-history, criminal-record, and notice rules can add requirements beyond the federal FCRA baseline. Some jurisdictions regulate when criminal history may be considered. Others require additional notices, individualized assessments, specific reasons, or local forms.

Your platform should therefore support:

- State- and locality-aware templates
- Client-specific package rules
- Version-controlled notices
- Effective dates for form changes
- Required attachments
- Configurable review periods
- Decision-reason documentation
- Counsel-approved workflow configuration

The technology should make the employer's approved policy repeatable. It should not pretend to replace legal review.

## Staffing agencies need one more control: client decision ownership

Adverse action becomes messy when three parties are involved:

- The staffing firm
- The background screening provider
- The staffing client's hiring manager

Before orders begin, define:

| Question | Owner to define |
| --- | --- |
| Who orders the consumer report? | Staffing firm or client |
| Who receives the completed report? | Authorized employer user |
| Who decides whether the finding is job relevant? | Employer decision owner |
| Who sends pre-adverse action? | Named employer party |
| Who receives candidate explanations? | Named employer party |
| Who monitors disputes? | Named case owner |
| Who sends final adverse action? | Named employer party |
| Who documents the final disposition? | Named employer party |

If nobody can answer these questions before a disputed case occurs, the workflow is not ready for scale.

## Background-check adverse-action vendor scorecard

Use this scorecard when comparing screening providers.

| Buying question | Strong answer |
| --- | --- |
| Does the platform separate report results from hiring decisions? | Yes — employer-owned review with no automatic rejection |
| Is pre-adverse action built in? | Report copy, current rights notice, timestamp, delivery status, and hold state |
| Can the review window be configured? | Yes, by employer policy and jurisdiction |
| Are disputes synchronized with the ATS? | Yes, with case statuses and recruiter alerts |
| Are corrected reports versioned? | Yes, with an audit trail showing the report used for each decision |
| Is final adverse action documented? | Yes, with required CRA information and rights |
| Can forms vary by state/locality? | Yes, with effective dates and version control |
| Does the vendor document accuracy procedures? | Yes, including identity matching, disposition updates, and public-record controls |
| Can staffing clients have different workflows? | Yes, by client, branch, job, requisition, and work location |
| Is there human exception support? | Yes, with named escalation for disputes and start-date risk |
| Is every action auditable? | Yes, including user, timestamp, template version, report version, and delivery status |
| Can the vendor demonstrate your actual ATS flow? | Yes, from order through final disposition |

## Metrics worth tracking

A mature adverse-action workflow should produce operating data, not just notices.

Track:

- Percentage of reports entering employer review
- Percentage entering pre-adverse action
- Candidate response rate
- Dispute rate
- Percentage of disputed reports changed after reinvestigation
- Average time from pre-adverse notice to final disposition
- Cases that miss a projected start date
- Undeliverable notice rate
- Percentage of adverse-action cases requiring manual vendor support
- Volume by client, branch, recruiter, and jurisdiction

If one branch has twice the adverse-action rate of the rest of the company, investigate whether the difference comes from job mix, client criteria, recruiter behavior, or inconsistent policy execution.

## A practical implementation plan

Employers and staffing firms can tighten the process in this order:

1. Identify every system and person who can turn a background result into a negative employment decision.
2. Document who owns the decision for each hiring model.
3. Review federal, state, and local requirements with counsel.
4. Standardize pre-adverse and final adverse-action templates.
5. Define the candidate review and dispute workflow.
6. Configure ATS and screening-system hold statuses.
7. Block automatic final dispositions while review is open.
8. Test a dispute that results in a corrected report.
9. Test an undeliverable notice.
10. Test a staffing-client scenario in which the client asks to reject the worker.
11. Verify that the final audit trail contains the report version, notice version, timestamps, and decision owner.
12. Review exception and dispute metrics monthly.

## The buying decision is about workflow, not letter generation

Almost every screening platform can generate a letter.

The harder questions are whether the system pauses the hiring decision at the right moment, sends the correct report and rights information, keeps candidate disputes synchronized with recruiters, routes corrected information back to the decision maker, handles jurisdiction-specific variations, and documents the complete sequence.

That is what employers should compare when they evaluate background-check providers.

[Talk to a PreciseHire specialist](/talk-to-an-expert) about your current adverse-action process, ATS, client requirements, dispute volume, and compliance workflow. We can review where manual handoffs create risk and show how a screening workflow can keep recruiters, candidates, and decision owners aligned.

### tl;dr

- A third-party background report should inform the employer's decision; the screening company should not make the hiring decision.
- Before adverse action based on a consumer report, the federal FCRA process generally requires a copy of the report and the Summary of Rights so the person can review the information.
- The FTC's federal guidance does not set one universal waiting period, so employers should configure a reasonable review window with counsel and account for state and local requirements.
- If adverse action is taken, the final notice must include the consumer reporting company's contact information and the person's dispute and free-report rights.
- The best screening platforms connect pre-adverse notices, candidate responses, disputes, corrected reports, final notices, and ATS statuses in one auditable workflow.
`;
