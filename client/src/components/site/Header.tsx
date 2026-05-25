/*
 * PreciseHire — site Header
 * Style: Trusted Modernism. Cream background, navy logotype with coral mark,
 * Inter nav links, coral CTA button. Sticky with subtle border on scroll.
 *
 * Nav supports a single layer of children (rendered as a hover/focus
 * dropdown panel on desktop, expanded inline on mobile).
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { NAV_PRIMARY, COMPANY, type NavItem } from "@/content/site";

function Logo() {
  return (
    <Link href="/" aria-label="Precise Hire — Expert Talent Acquisition, home" className="flex items-center gap-2.5 group">
      <img
        src="/brand/precisehire-logo-icon.png"
        alt="Precise Hire logo"
        className="h-10 w-auto select-none transition-transform group-hover:-translate-y-px"
        draggable={false}
      />
      <span className="font-display text-[1.35rem] font-semibold text-[#0B1F3A] tracking-tight leading-none">
        Precise<span className="text-[#B7232A]">Hire</span>
      </span>
    </Link>
  );
}

function DesktopNavItem({ item }: { item: NavItem }) {
  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className="text-[15px] font-medium text-[#0B1F3A]/80 hover:text-[#0B1F3A] transition-colors link-underline"
      >
        {item.label}
      </Link>
    );
  }
  return (
    <div className="relative group">
      <Link
        href={item.href}
        className="inline-flex items-center gap-1 text-[15px] font-medium text-[#0B1F3A]/80 hover:text-[#0B1F3A] transition-colors link-underline"
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
      </Link>
      <div
        className="absolute left-1/2 -translate-x-1/2 top-full pt-3 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 focus-within:visible focus-within:opacity-100 focus-within:translate-y-0 transition-all duration-150 z-50"
      >
        <div className="min-w-[320px] rounded-2xl border border-[#0B1F3A]/10 bg-white shadow-[0_30px_60px_-25px_rgba(11,31,58,0.35)] p-2">
          {item.children.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="block rounded-xl px-4 py-3 hover:bg-[#FAF7F2] transition-colors"
            >
              <div className="text-[14.5px] font-semibold text-[#0B1F3A]">{c.label}</div>
              {c.description && (
                <div className="mt-0.5 text-[12.5px] leading-snug text-[#0B1F3A]/65">{c.description}</div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
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
            <DesktopNavItem key={item.href} item={item} />
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
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block px-2 py-3 text-base font-medium text-[#0B1F3A] border-b border-[#0B1F3A]/10"
                >
                  {item.label}
                </Link>
                {item.children?.length ? (
                  <div className="pl-4 border-b border-[#0B1F3A]/10">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-2 py-2.5 text-[14.5px] text-[#0B1F3A]/75"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
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
