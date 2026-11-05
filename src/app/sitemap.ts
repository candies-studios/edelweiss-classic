import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { businesses } from "@/content/site";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.edelweissfin.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/leadership",
    "/businesses",
    ...businesses.map((b) => `/businesses/${b.slug}`),
    "/investors",
    "/investors/financial-results",
    "/investors/annual-reports",
    "/investors/governance",
    "/sustainability",
    "/media",
    "/careers",
    "/contact",
  ];
  return paths.map((p) => ({ url: `${base}${p}`, changeFrequency: p.startsWith("/investors") || p === "/media" ? "weekly" : "monthly", priority: p === "" ? 1 : 0.7 }));
}
