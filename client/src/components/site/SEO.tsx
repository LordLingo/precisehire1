/*
 * PreciseHire — SEO head manager
 * Lightweight document.head updater (no react-helmet to keep bundle small).
 * Sets title, meta description, canonical, OG tags, and an optional JSON-LD block.
 * Style: this is infrastructure — no visual concerns.
 */
import { useEffect } from "react";

type Props = {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
  keywords?: string[];
};

const DEFAULT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030097116/hnYYKv3TxuisbFtWcEuJez/og-home-eKHpe6YmPeUxLLSrGYWz87.png";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SEO({ title, description, canonical, image, noindex, jsonLd, keywords }: Props) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[name="robots"]', "name", "robots", noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large");
    if (keywords && keywords.length > 0) {
      setMeta('meta[name="keywords"]', "name", "keywords", keywords.join(", "));
    }

    const canon = canonical || (typeof window !== "undefined" ? `https://precisehire.com${window.location.pathname}` : "");
    if (canon) setLink("canonical", canon);

    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:type"]', "property", "og:type", "website");
    setMeta('meta[property="og:url"]', "property", "og:url", canon);
    setMeta('meta[property="og:image"]', "property", "og:image", image || DEFAULT_IMAGE);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", "Precise Hire");
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", image || DEFAULT_IMAGE);

    // JSON-LD
    const existing = document.head.querySelectorAll('script[data-seo="ld"]');
    existing.forEach((n) => n.remove());
    if (jsonLd) {
      const arr = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      arr.forEach((obj) => {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.dataset.seo = "ld";
        s.text = JSON.stringify(obj);
        document.head.appendChild(s);
      });
    }
  }, [title, description, canonical, image, noindex, jsonLd, keywords]);

  return null;
}
