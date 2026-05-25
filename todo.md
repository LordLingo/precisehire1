# Fix Google Search Console "Page with redirect"

- [ ] Extract every URL from sitemap.xml
- [ ] curl -I each URL on precisehire.com to find 3xx responses
- [ ] Group by redirect type (trailing slash, http→https, old slug, missing route, www→apex)
- [ ] Decide fix strategy per group
- [ ] Update sitemap.xml to canonical URLs OR fix the redirect at app level
- [ ] Re-probe to confirm 200 everywhere
- [ ] Checkpoint + instructions for user to resubmit in GSC
