# Shared Futures Youth Alliance

SFYA’s public website, built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion and Lucide icons. Content follows the supplied 2026 organizational profile; contact details follow SFYA’s project brief.

## Development

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run typecheck
npm start
```

Node.js 20.9 or later is required. Pages render on the server; primary text is visible before JavaScript loads. Motion respects reduced-motion preferences. Fonts and images are served locally.

## Content and assets

- `lib/content.ts`: contact details, programme pillars and organizational content.
- `app/`: seven public pages, a custom 404, metadata, sitemap, robots and app manifest.
- `components/`: shared navigation, footer and section components.
- `app/globals.css`: responsive brand design system.
- `public/sfya-logo.png` and `public/sfya-icon.png`: cropped from the supplied enhanced logo card. Keep `sfya-logo-card.png` as the source.
- `public/SFYA-Organizational-Profile-2026.pdf`: downloadable source profile. Its final page contains legacy contact placeholders; the website uses the updated contact details supplied in the brief.

Contact uses email and phone links. No web form, tracking, database or credentials are required. No submissions are collected or stored by the website. Add server validation, abuse protection and a configured delivery service before introducing a contact form.

## Deployment

Deploy this repository to a separate SFYA Vercel project using the standard Next.js preset (`npm run build`). No environment variables are required. This repository must remain isolated from all KeydTech projects, accounts and credentials.

Configure `sharedyouth.com` and `www.sharedyouth.com` only in the dedicated SFYA project. Preserve existing email MX records. Canonical URLs, sitemap and social metadata use `https://sharedyouth.com`.

Security headers are in `next.config.ts`. The CSP permits inline Next.js hydration scripts and inline styles used by Next Image and Framer Motion; it blocks framing, plugins and external asset origins. A nonce-based CSP would require dynamic rendering and should be implemented alongside deployment-specific caching requirements if needed.

Before release, check navigation and content at phone, tablet and desktop widths, keyboard navigation, reduced motion, contact links, profile download, 404, social sharing metadata and production response headers.
