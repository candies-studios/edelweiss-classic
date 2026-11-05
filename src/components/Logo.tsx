"use client";

import { useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
/**
 * Official logo: add the approved file to /public/brand/ (e.g. edelweiss-logo.svg)
 * and set NEXT_PUBLIC_LOGO_SRC=/brand/edelweiss-logo.svg (and NEXT_PUBLIC_LOGO_LIGHT_SRC
 * for the white version used on dark backgrounds).
 * Until then — or if the file fails to load — a plain text wordmark is shown, never a redrawn logo.
 * (The logo on edelweissfin.com cannot be loaded from other sites, so it is not hotlinked.)
 */
const LOGO = process.env.NEXT_PUBLIC_LOGO_SRC;
const LOGO_LIGHT = process.env.NEXT_PUBLIC_LOGO_LIGHT_SRC || LOGO;

export function Logo({ variant = "default" }: { variant?: "default" | "light" }) {
  const [failed, setFailed] = useState(false);
  const src = variant === "light" ? LOGO_LIGHT : LOGO;

  if (!src || failed) {
    return (
      <span className={`font-display text-[26px] tracking-[0.01em] ${variant === "light" ? "text-white" : "text-ink"}`}>
        Edelweiss
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${BASE}${src}`} alt="Edelweiss Financial Services" height={40} className="h-9 w-auto" onError={() => setFailed(true)} />
  );
}
