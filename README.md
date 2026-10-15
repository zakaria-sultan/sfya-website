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
- The supplied organizational profile is retained as a source asset; its download links are removed from the public interface.

The Contact page includes a form that sends plain-text messages to `info@sharedyouth.com` through SMTP. The sender uses the authenticated SFYA mailbox; the visitor’s email is set as Reply-To. WhatsApp links open `https://wa.me/252615021204`.

Copy `.env.example` to `.env.local` for local development and set `SMTP_HOST`, `SMTP_PORT` (465 or 587), `SMTP_USER` and `SMTP_PASSWORD` using the SFYA mailbox provider’s settings. Configure the same variables in the dedicated SFYA Vercel project and redeploy. Never commit passwords or use `NEXT_PUBLIC_` variables for SMTP. No live email delivery is possible until these are configured.

The endpoint checks origin, input types and lengths, header control characters, body size and a honeypot. Messages are sent as plain text and not saved in the application. It includes a best-effort in-memory limit of five attempts per 15 minutes per instance; for a public high-traffic deployment, configure a shared rate limit or Vercel Firewall rule for `/api/contact`. The mail provider handles delivery and retention. Errors never expose credentials and the form reports success only after SMTP accepts the recipient.

## Deployment

Deploy this repository to a separate SFYA Vercel project using the standard Next.js preset (`npm run build`). SMTP environment variables are required for contact-form delivery. This repository must remain isolated from all KeydTech projects, accounts and credentials.

Configure `sharedyouth.com` and `www.sharedyouth.com` only in the dedicated SFYA project. Preserve existing email MX records. Canonical URLs, sitemap and social metadata use `https://sharedyouth.com`.

Security headers are in `next.config.ts`. The CSP permits inline Next.js hydration scripts and inline styles used by Next Image and Framer Motion; it blocks framing, plugins and external asset origins. A nonce-based CSP would require dynamic rendering and should be implemented alongside deployment-specific caching requirements if needed.

Before release, check navigation and content at phone, tablet and desktop widths, keyboard navigation, reduced motion, contact links, contact-form delivery, 404, social sharing metadata and production response headers.

## SMTP setup

1. Open the **SFYA mailbox provider’s** outgoing mail settings and copy the SMTP hostname, TLS port and mailbox username. Do not use another project’s account or credentials.
2. Fill `.env.local` using `.env.example`: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER=info@sharedyouth.com`, and `SMTP_PASSWORD`. Use the mailbox password or an app password if the provider requires one. Quote passwords with double quotes; escape literal `$` as `\$` because Next.js expands environment variables. Keep this file local and ignored by Git.
3. Run `npm run smtp:check`. This checks the secure SMTP connection and authentication without sending a message or printing credentials. Successful authentication does not guarantee final inbox delivery.
4. Restart `npm run dev`, submit an enquiry at `/contact`, and confirm it arrives at `info@sharedyouth.com`. Check spam if necessary. Replying should address the visitor’s email.
5. For hosting, add the same four values in the **dedicated SFYA Vercel project’s** environment settings, then redeploy. Paste the raw password in Vercel without `.env` quoting or escaping. Local `.env.local` settings are not uploaded automatically.

If the check reports missing values, fill them locally; never paste the password into chat or commit it. If authentication fails, verify the full mailbox username and provider password requirements. Keep TLS certificate verification enabled. Use the mail provider’s existing SPF/DKIM configuration for deliverability; this setup does not change DNS or email routing.
