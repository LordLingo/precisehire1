/*
 * PreciseHire — site Header
 * Style: Trusted Modernism. Cream background, navy logotype with coral mark,
 * Inter nav links, coral CTA button. Sticky with subtle border on scroll.
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { NAV_PRIMARY, COMPANY } from "@/content/site";

function Logo() {
  return (
    <Link href="/" aria-label="Precise Hire — home" className="flex items-center gap-2.5 group">
      <span className="relative inline-flex size-8 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-[#FF5A4E]/15 group-hover:bg-[#FF5A4E]/25 transition-colors" />
        <svg viewBox="0 0 32 32" className="relative size-7" aria-hidden="true">
          <path d="M6 17.5 L13 24 L26 9" stroke="#0B1F3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="16" cy="16" r="14" stroke="#FF5A4E" strokeWidth="2" fill="none" />
        </svg>
      </span>
      <span className="font-display text-[1.35rem] font-semibold text-[#0B1F3A] tracking-tight">
        Precise<span className="text-[#FF5A4E]">Hire</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled ? "bg-[#FAF7F2]/85 backdrop-blur-md border-b border-[#0B1F3A]/10" : "bg-transparent",
      ].join(" ")}
    >
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
          {NAV_PRIMARY.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-[#0B1F3A]/80 hover:text-[#0B1F3A] transition-colors link-underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:${COMPANY.phoneRaw}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#0B1F3A]/80 hover:text-[#0B1F3A] transition-colors">
            <Phone className="size-4" /> {COMPANY.phone}
          </a>
          <Link href="/contact" className="btn-ghost-navy rounded-full px-4 py-2 text-sm font-semibold">
            Sign in
          </Link>
          <Link href="/contact" className="btn-coral rounded-full px-5 py-2.5 text-sm font-semibold">
            Get started
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex size-10 items-center justify-center rounded-full border border-[#0B1F3A]/15 bg-white/70"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#0B1F3A]/10 bg-[#FAF7F2]">
          <nav aria-label="Mobile" className="container py-5 grid gap-1">
            {NAV_PRIMARY.map((item) => (
              <Link key={item.href} href={item.href} className="px-2 py-3 text-base font-medium text-[#0B1F3A] border-b border-[#0B1F3A]/10">
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-4">
              <Link href="/contact" className="btn-ghost-navy flex-1 text-center rounded-full px-4 py-2.5 text-sm font-semibold">
                Sign in
              </Link>
              <Link href="/contact" className="btn-coral flex-1 text-center rounded-full px-4 py-2.5 text-sm font-semibold">
                Get started
              </Link>
            </div>
            <a href={`tel:${COMPANY.phoneRaw}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#0B1F3A]/80">
              <Phone className="size-4" /> {COMPANY.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
