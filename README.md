# Edelweiss Financial Services — website redesign (Kinara)

The **Kinara** design direction: clean, minimal and photo-led, in the manner of a global investment group, with an Indian voice. *Kinara* is the woven border of a sari; here it becomes the fine brass band that separates major sections. Built with Next.js (App Router), React, TypeScript and Tailwind CSS.

> **Status:** redesign proposal. Edelweiss's name, logo and documents belong to Edelweiss Financial Services Limited. Deploy publicly only with the company's authorisation.

**Design system**

| | |
| --- | --- |
| Colour | Warm ink `#1C1915`, sandstone `#F3EFE9`, white; Indian indigo `#2E3B6E` accent; brass `#A8834F` for hairlines only |
| Type | Marcellus (headlines), Manrope (text), Noto Serif Devanagari (Hindi tagline) |
| Imagery | Full-bleed photography with a warm-ink scrim; every inner page has a photo hero (`src/assets/heroes/`, mapped in `src/content/heroes.ts`) |
| Motif | Kinara border (`src/components/Kinara.tsx`) under heroes and above the footer |

Content, investor documents and the market-data service are identical to the other designs; only the presentation differs.

## Quick start

```bash
npm install
cp .env.example .env.local   # market data runs in DEMO mode by default
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

Requires Node.js 20 or later (22 recommended for the vendor WebSocket client).

## What's included

**Homepage** — sticky navigation with mega menus and a full-screen mobile menu, site search, market ticker (NIFTY 50 and SENSEX), hero, company overview, the four businesses (each with its own layout), Why Edelweiss, investor relations dashboard with year and type filters, news, Board of Directors, sustainability, careers and footer.

**Pages**

| Route | Page |
| --- | --- |
| `/about` | About Edelweiss, businesses, 13 guiding principles |
| `/leadership` | Board of Directors |
| `/businesses` | Businesses overview |
| `/businesses/credit` | Credit |
| `/businesses/asset-management` | Asset Management |
| `/businesses/asset-reconstruction` | Asset Reconstruction |
| `/businesses/insurance` | Insurance |
| `/investors` | Investor Relations and document library |
| `/investors/financial-results` | Financial results |
| `/investors/annual-reports` | Annual reports, Chairman's letters, ESG reports, AGM |
| `/investors/governance` | Corporate governance policies |
| `/sustainability` | Sustainability and EdelGive |
| `/media` | Press releases and insights (`/media#insights`) |
| `/careers` | Careers |
| `/contact` | Offices and contacts |

Also: `sitemap.xml`, `robots.txt`, Open Graph metadata, Organization JSON-LD, a 404 page and security headers.

## Project structure

```
src/
  app/                      routes, layout, sitemap, robots
    api/market/route.ts     GET snapshot (rate limited)
    api/market/stream/      Server-Sent Events stream to the browser
  components/
    layout/                 Header (nav, mega menu, mobile menu, search), Footer
    market/MarketTicker.tsx ticker UI
    investors/DocLibrary.tsx filterable document list
    home/ContourField.tsx   hero visual (generated SVG, no image weight)
    ui.tsx, Reveal.tsx, Logo.tsx
  content/site.ts           ALL site content and official links
  lib/market/               market-data service (see below)
  lib/rate-limit.ts
```

## Content

All copy, figures and links live in `src/content/site.ts`. They were taken from official Edelweiss sources (edelweissfin.com and the company boilerplate PDF) on 5 November 2026. Nothing has been invented: where a document archive was not available, pages link to the official archive instead of creating links.

Before launch, have the content owners review `site.ts`, and replace or move it to a headless CMS if the team needs to publish updates without a deploy.

## Market data

```
Browser ──SSE──▶ /api/market/stream ──▶ service.ts ──▶ provider (demo | licensed)
                 /api/market (fallback)                    │
                                                           └─ REST + WebSocket to vendor (server-side only)
```

* `lib/market/types.ts` — the `MarketDataProvider` interface every vendor implements.
* `lib/market/providers/demo.ts` — **sample values only**. The ticker shows a **DEMO DATA** label and a disclaimer whenever this provider is active.
* `lib/market/providers/licensed.ts` — adapter for an authorised NSE/BSE data vendor (REST snapshot + optional WebSocket). Map the vendor's symbols and response shape there.
* `lib/market/calendar.ts` — IST session logic (pre-open 09:00–09:15, market 09:15–15:30, weekdays). Vendor-reported status takes precedence when available.
* `lib/market/holidays.json` — **populate with the official exchange holiday list each year.** It is empty on purpose rather than guessed.
* `lib/market/indices.ts` — add Bank Nifty, Nifty Next 50, Nifty Midcap 100 and others to `DISPLAY_INDICES`; metadata already exists.

Behaviour:

* Changes are computed from the provider's reference value (previous official close).
* Outside market hours the ticker shows the latest close, marked **CLOSE** and "Closing values".
* Every update carries an IST timestamp.
* The **LIVE** indicator appears only when the licensed provider is active, the market is open and data is fresh.
* On vendor failure the last good values are shown marked **Delayed**; if there are none, the ticker says data is unavailable. Values are never fabricated.

To go live: set `MARKET_DATA_PROVIDER=licensed` and the `MARKET_DATA_*` variables (server-only — never prefix them with `NEXT_PUBLIC_`), and add the vendor's required attribution in `MARKET_DATA_ATTRIBUTION`. Do not scrape exchange websites or use unofficial APIs.

## Launch checklist

- [ ] Written approval from Edelweiss for the redesign and its deployment
- [ ] Self-host the official logo files in `public/brand/` and update `Logo.tsx` (currently loaded from the Edelweiss CDN, with a text wordmark fallback)
- [ ] Licensed market-data contract, credentials and attribution text
- [ ] Exchange holiday list in `holidays.json`
- [ ] Official Terms and Conditions content for `/terms` (currently a placeholder)
- [ ] Content review of `src/content/site.ts` by Corporate Communications and Investor Relations
- [ ] Replace business imagery with the brand's approved photography where desired
- [ ] Rate limiting backed by a shared store (e.g. Redis) when running more than one instance
- [ ] Lighthouse and accessibility audit on the deployed environment

## Deploy to GitHub Pages

GitHub Pages only serves static files, so it can't run `npm start`. The included workflow (`.github/workflows/deploy-pages.yml`) builds a static version of the site on every push to `main` and publishes it.

1. Push this project so `package.json` sits at the **root** of the repository.
2. In the repository go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push to `main` (or run the workflow from the **Actions** tab). The site appears at `https://<account>.github.io/<repo>/` after a minute or two.

The Pages build differs from the server build in three ways: the `/api` routes are left out (Pages has no server), the market ticker runs in DEMO mode in the browser, and a banner notes that the site is a redesign concept. For a live market feed, deploy the server build to Vercel or any Node.js host.

## Push to GitHub

```bash
git init
git add .
git commit -m "Edelweiss website redesign"
git branch -M main
git remote add origin https://github.com/<your-account>/<repo>.git
git push -u origin main
```

Deploys directly to Vercel, or to any Node.js host with `npm run build && npm start`.
