/*
 * PreciseHire — Legal pages (privacy / terms / accessibility)
 * Style: Trusted Modernism. Editorial reading layout, narrow column for
 * readability, navy display heads.
 */
import { useRoute } from "wouter";
import SEO from "@/components/site/SEO";
import Reveal from "@/components/site/Reveal";

const PAGES: Record<string, { title: string; metaTitle: string; metaDescription: string; intro: string; sections: { heading: string; body: string[] }[] }> = {
  privacy: {
    title: "Privacy Policy",
    metaTitle: "Privacy Policy | Precise Hire",
    metaDescription: "How Precise Hire collects, uses, secures, and shares personal information when delivering background screening services to U.S. employers.",
    intro:
      "This Privacy Policy explains how Precise Hire collects, uses, and protects personal information in connection with our background screening services. We are committed to handling personal data in compliance with the Fair Credit Reporting Act (FCRA), state privacy laws, and applicable international frameworks.",
    sections: [
      {
        heading: "Information we collect",
        body: [
          "We collect information necessary to perform requested background checks, including identifying information (name, date of birth, addresses), employment and education history, and government-issued identifiers where lawfully permitted.",
          "We collect information from candidates with their written authorization, from employers who order checks, and from courts, schools, employers, government agencies, and verified data providers.",
        ],
      },
      {
        heading: "How we use information",
        body: [
          "Personal data is used solely to prepare and deliver the screening report ordered by the requesting employer (the 'end user'), to comply with legal obligations, and to maintain the security and integrity of our services.",
          "We do not sell personal information.",
        ],
      },
      {
        heading: "How we share information",
        body: [
          "We share completed reports only with the employer that ordered the check and with the candidate upon valid request. We may share data with sub-processors (such as research and verification partners) under written confidentiality and security obligations.",
        ],
      },
      {
        heading: "Data retention & security",
        body: [
          "We retain consumer reports and source data for the period required by the FCRA and applicable state law, then securely dispose of records. All data is encrypted in transit (TLS 1.3) and at rest (AES-256).",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "Under the FCRA, you have the right to know what is in your file, dispute inaccurate information, and request a free copy of your report once every 12 months. Residents of California, Colorado, Virginia, and other states may have additional rights under applicable state privacy laws.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "For privacy questions or to exercise your rights, contact privacy@precisehire.com.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    metaTitle: "Terms of Service | Precise Hire",
    metaDescription: "The terms governing access to and use of the Precise Hire background screening platform by employers and authorized end users.",
    intro:
      "These Terms of Service govern access to and use of the Precise Hire platform and screening services by employers and their authorized users.",
    sections: [
      { heading: "Permissible purpose", body: ["End users certify that each consumer report is requested for a permissible purpose under the FCRA, including evaluating a consumer for employment, retention, or promotion."] },
      { heading: "Adverse action obligations", body: ["End users agree to follow the FCRA-required pre-adverse and adverse-action process when relying in whole or in part on a Precise Hire report to take adverse action."] },
      { heading: "Service availability & liability", body: ["Services are provided on an as-available basis. To the maximum extent permitted by law, our liability is limited to the fees paid for the affected service in the prior 12 months."] },
      { heading: "Termination", body: ["Either party may terminate for material breach upon 30 days' notice. Upon termination, end users remain bound by confidentiality and data-handling obligations for any retained reports."] },
    ],
  },
  accessibility: {
    title: "Accessibility Statement",
    metaTitle: "Accessibility Statement | Precise Hire",
    metaDescription: "Precise Hire's commitment to digital accessibility and ongoing efforts to meet WCAG 2.2 AA standards across our platform and marketing site.",
    intro:
      "Precise Hire is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.",
    sections: [
      { heading: "Conformance status", body: ["We aim to conform to WCAG 2.2 Level AA. Our team conducts ongoing accessibility audits and incorporates feedback from candidates and end users."] },
      { heading: "Feedback", body: ["If you experience an accessibility barrier on our site or platform, please contact accessibility@precisehire.com so we can address it promptly."] },
    ],
  },
};

export default function Legal() {
  const [, params] = useRoute("/legal/:slug");
  const slug = params?.slug ?? "privacy";
  const page = PAGES[slug] ?? PAGES.privacy;

  return (
    <>
      <SEO title={page.metaTitle} description={page.metaDescription} canonical={`https://precisehire.com/legal/${slug}`} />
      <section className="container pt-20 lg:pt-28 pb-24 max-w-3xl">
        <Reveal>
          <span className="eyebrow">Legal</span>
          <h1 className="display-xl mt-4 text-[#0B1F3A]">{page.title}</h1>
          <p className="mt-6 text-lg text-[#0B1F3A]/75 leading-relaxed">{page.intro}</p>
        </Reveal>
        <div className="mt-10 space-y-10">
          {page.sections.map((section, i) => (
            <Reveal key={section.heading} delay={i * 0.04}>
              <section>
                <h2 className="display-md text-[#0B1F3A]">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-[#0B1F3A]/80 leading-relaxed">
                  {section.body.map((p, j) => <p key={j}>{p}</p>)}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
