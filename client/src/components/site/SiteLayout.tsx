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
    // If the URL has a hash, defer to the anchored element (scroll-mt-* on the
    // target supplies the visual offset). Otherwise scroll to the top so each
    // new route opens cleanly.
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      // Two animation frames: one for React to commit, one for layout to settle.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const target = document.getElementById(hash.slice(1));
          if (target) {
            target.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
          } else {
            window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
          }
        });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);

  return (
    <div className="ph-site min-h-screen flex flex-col">
      <a className="ph-skip" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content" className="ph-main flex-1" data-page-kind={location === "/" ? "home" : "interior"}>{children}</main>
      <Footer />
    </div>
  );
}
