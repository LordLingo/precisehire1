/*
 * PreciseHire — SiteLayout
 * Style: Trusted Modernism. Wraps every page with Header + Footer and the cream
 * background. Also handles scroll-to-top on route change.
 */
import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#0B1F3A]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
