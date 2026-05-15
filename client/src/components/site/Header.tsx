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
    <Link href="/" aria-label="Precise Hire — Expert Talent Acquisition, home" className="flex items-center gap-2.5 group">
      <img
        src="/brand/precisehire-logo-icon.png"
        alt=""
        aria-hidden="true"
        className="h-10 w-auto select-none transition-transform group-hover:-translate-y-px"
        draggable={false}
      />
      <span className="font-display text-[1.35rem] font-semibold text-[#0B1F3A] tracking-tight leading-none">
        Precise<span className="text-[#B7232A]">Hire</span>
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
        "sticky top-0 z-50 w-full transition-shadow duration-300 bg-[#FAF7F2] border-b",
        scrolled ? "border-[#0B1F3A]/10 shadow-[0_2px_8px_-2px_rgba(11,31,58,0.08)]" : "border-transparent",
      ].join(" ")}
    >
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden xl:flex items-center gap-6">
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

        <div className="hidden xl:flex items-center gap-3">
          <a href={`tel:${COMPANY.phoneRaw}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#0B1F3A]/80 hover:text-[#0B1F3A] transition-colors">
            <Phone className="size-4" /> {COMPANY.phone}
          </a>
          <a
            href="https://dot.precisehire.com/login.php"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-navy rounded-full px-4 py-2 text-sm font-semibold"
          >
            Sign in
          </a>
          <Link href="/get-a-quote" className="btn-coral rounded-full px-5 py-2.5 text-sm font-semibold">
            Get started
          </Link>
        </div>

        <div className="xl:hidden flex items-center gap-2">
          <Link
            href="/get-a-quote"
            className="btn-coral hidden sm:inline-flex items-center justify-center rounded-full px-4 py-2 text-[13px] font-semibold whitespace-nowrap"
          >
            Get a quote
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#0B1F3A]/15 bg-white/70"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-[#0B1F3A]/10 bg-[#FAF7F2]">
          <nav aria-label="Mobile" className="container py-5 grid gap-1">
            {NAV_PRIMARY.map((item) => (
              <Link key={item.href} href={item.href} className="px-2 py-3 text-base font-medium text-[#0B1F3A] border-b border-[#0B1F3A]/10">
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-4">
              <a
                href="https://dot.precisehire.com/login.php"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-navy flex-1 text-center rounded-full px-4 py-2.5 text-sm font-semibold"
              >
                Sign in
              </a>
              <Link href="/get-a-quote" className="btn-coral flex-1 text-center rounded-full px-4 py-2.5 text-sm font-semibold">
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
