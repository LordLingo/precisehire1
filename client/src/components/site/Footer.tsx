import { Link } from "wouter";
import { FOOTER_NAV, COMPANY } from "@/content/site";
import { Brand } from "./Header";

const POPULAR_INDUSTRIES = [
  { label: "Healthcare Background Checks", href: "/industries/healthcare" },
  { label: "Staffing Agency Background Checks", href: "/industries/staffing" },
  { label: "Transportation Background Checks", href: "/industries/transportation" },
  { label: "Retail & Hospitality Checks", href: "/industries/retail-hospitality-background-checks" },
  { label: "Volunteer Background Checks", href: "/industries/nonprofit-volunteer-background-checks" },
  { label: "Church Background Checks", href: "/industries/church-background-checks" },
  { label: "Property Management Checks", href: "/industries/property-management-background-checks" },
  { label: "Construction Background Checks", href: "/industries/construction-background-checks" },
];

const RESOURCE_GUIDES = [
  { label: "Employer Background Check Program Guide", href: "/resources/employer-background-check-program-guide" },
  { label: "Criminal Background Check Policy Guide", href: "/resources/criminal-background-check-policy-guide" },
  { label: "Employment Verification Program Guide", href: "/resources/employment-verification-program-guide" },
  { label: "Employee Drug Testing Policy Guide", href: "/resources/employee-drug-testing-policy-guide" },
];

export default function Footer() {
  return <footer className="ph-footer"><div className="container"><div className="ph-footer-top"><div className="ph-footer-brand"><Brand/><p>The confidence behind every great hire.<br/>Serving employers since {COMPANY.established}.</p><a href={`tel:${COMPANY.phoneRaw}`}>{COMPANY.phone}</a><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><a href="https://dot.precisehire.com/login.php" target="_blank" rel="noopener noreferrer">Client login</a></div>{FOOTER_NAV.map(column=><nav key={column.title} className="ph-footer-column" aria-label={column.title}><h2>{column.title}</h2>{column.links.map(link=><Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>)}</div><div className="ph-footer-extra"><div><h2>Popular industries</h2><div>{POPULAR_INDUSTRIES.map(link=><Link key={link.href} href={link.href}>{link.label}</Link>)}</div></div><div><h2>Employer resource guides</h2><div>{RESOURCE_GUIDES.map(link=><Link key={link.href} href={link.href}>{link.label}</Link>)}</div></div></div><div className="ph-footer-bottom"><p>© {new Date().getFullYear()} Precise Hire. All rights reserved.</p><nav aria-label="Legal"><Link href="/legal/privacy">Privacy</Link><Link href="/legal/sms">SMS Terms</Link><Link href="/legal/terms">Terms</Link><Link href="/legal/accessibility">Accessibility</Link><Link href="/compliance">FCRA Compliance</Link><Link href="/referral">Referral Partner Program</Link></nav></div></div></footer>;
}
