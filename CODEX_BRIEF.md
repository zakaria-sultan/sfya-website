# Codex implementation brief — SFYA website

Continue this repository into a polished production website without changing the organization facts or inventing unsupported impact statistics.

## Non-negotiable account isolation
- Repository: `zakaria-sultan/sfya-website`
- Vercel account: the account associated with `zakaria.ali.hassan.ali@gmail.com`
- Domain: `sharedyouth.com`
- Never alter, link, reuse, migrate, or deploy into any KeydTech repository, Vercel project, environment, credential, Git remote, or account.

## Visual direction
Create an international-NGO-quality site inspired by bold youth-led editorial design rather than a generic charity template. Preserve SFYA brand DNA from the profile: navy, teal, cyan, gold and white/cream. Use oversized editorial typography, generous spacing, strong photography slots, asymmetric brand geometry, rounded cards, subtle patterns, and high-end restrained motion.

## Motion
- Refined scroll reveals using Framer Motion.
- Slow floating/rotating abstract brand shapes in hero sections.
- Subtle image scale/parallax where imagery is later added.
- Refined hover micro-interactions on cards and links.
- Respect `prefers-reduced-motion`.
- Avoid excessive animation.

## Content source
Use only the supplied SFYA 2026 Organizational Profile and approved contact details. Core facts are already encoded in `lib/content.ts`.

## Further improvements to implement
- Add official SFYA logo asset cleanly (transparent/high-resolution if available).
- Add real, rights-cleared SFYA/project photography when supplied; do not use fake impact imagery presented as SFYA work.
- Add a future-ready News/Updates route with empty-state design, but do not fabricate articles.
- Add structured data (Organization), sitemap, robots.txt and complete Open Graph metadata.
- Add 404 page.
- Add high-quality mobile navigation and active states.
- Improve performance/Lighthouse accessibility and SEO.
- Add a privacy-friendly contact form only when a form endpoint/service is intentionally selected.

## Deployment
Deploy as a brand-new Vercel project from this repository. Afterwards connect `sharedyouth.com` and `www.sharedyouth.com`. Keep Hostinger MX/email records intact.
