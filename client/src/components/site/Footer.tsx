/*
 * PreciseHire — site Footer
 * Style: deep navy block with cream type, coral accent rule, Fraunces wordmark.
 */
import { Link } from "wouter";
import { FOOTER_NAV, COMPANY } from "@/content/site";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0B1F3A] text-[#FAF7F2] mt-24">
      <div className="container py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-white/95 p-1">
                <img
                  src="/brand/precisehire-logo-icon.png"
                  alt="Precise Hire logo"
                  className="h-full w-auto"
                  draggable={false}
                />
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight leading-none">
                Precise<span className="text-[#B7232A]">Hire</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">
              Background checks employers actually trust. Serving HR teams, staffing
              agencies, and operators across the U.S. since {COMPANY.established}.
            </p>
            <div className="mt-6 grid gap-2 text-sm text-white/75">
              <a href={`tel:${COMPANY.phoneRaw}`} className="inline-flex items-center gap-2 hover:text-white">
                <Phone className="size-4 text-[#B7232A]" /> {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-2 hover:text-white">
                <Mail className="size-4 text-[#B7232A]" /> {COMPANY.email}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-[#B7232A]" /> United States
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-10">
            {FOOTER_NAV.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B7232A]">{col.title}</h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[15px] text-white/75 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-white/55">
          <p>© {year} Precise Hire. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/legal/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-white">Terms</Link>
            <Link href="/legal/accessibility" className="hover:text-white">Accessibility</Link>
            <Link href="/compliance" className="hover:text-white">FCRA Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
