import type { NextConfig } from "next";

/**
 * Two build modes:
 *  - Server (default): `npm run build && npm start` — full site incl. /api market-data routes.
 *  - Static export (GitHub Pages): STATIC_EXPORT=true — plain HTML/CSS/JS in /out,
 *    no API routes; the ticker runs in DEMO mode in the browser.
 */
const isExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isExport ? { output: "export" as const, trailingSlash: true } : {}),
  basePath,
  images: {
    unoptimized: isExport,
    formats: ["image/avif", "image/webp"],
    // Official Edelweiss asset CDN (logo, leadership portraits, business imagery).
    remotePatterns: [
      { protocol: "https", hostname: "cdn1.edelweissfin.com" },
      { protocol: "https", hostname: "www.edelweissfin.com" },
    ],
  },
  ...(isExport
    ? {}
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
