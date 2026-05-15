# Move trust/verify strip from Pricing to Compliance

- [ ] Locate trust strip block in Pricing.tsx (SOC 2 Type II / PBSA Member / FCRA-aligned / 22+ years / U.S. specialist hours)
- [ ] Identify insertion point in Compliance.tsx
- [ ] Remove block from Pricing.tsx
- [ ] Paste block into Compliance.tsx, preserving all `Verify` link hrefs
- [ ] TypeScript check (pnpm exec tsc --noEmit)
- [ ] Save checkpoint and report
