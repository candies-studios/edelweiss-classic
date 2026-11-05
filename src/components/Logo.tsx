"use client";

import { useEffect, useRef, useState } from "react";
import { company } from "@/content/site";

/**
 * Official Edelweiss logo, served from the company CDN.
 * To self-host, place the official file at /public/brand/edelweiss-logo.png and
 * change `src` below. If the image cannot load, a plain text wordmark is shown
 * instead (never a redrawn logo).
 */
export function Logo({ variant = "default" }: { variant?: "default" | "light" }) {
  const [failed, setFailed] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const src = variant === "light" ? company.logoFooter : company.logo;

  // The image can fail before React hydrates, so check its state on mount too.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <span className={`font-display text-[24px] font-medium tracking-tight ${variant === "light" ? "text-white" : "text-navy"}`}>
        Edelweiss
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={img} src={src} alt="Edelweiss Financial Services" width={150} height={40} className="h-9 w-auto" onError={() => setFailed(true)} />
  );
}
