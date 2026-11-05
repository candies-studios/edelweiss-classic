import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Kinara } from "@/components/Kinara";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M2 8h11m-4-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function External({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M4.5 2H10v5.5M10 2 2.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** Internal links use next/link; external ones open in a new tab with rel=noopener. */
export function SmartLink({ href, className, children, ...rest }: { href: string; className?: string; children: ReactNode; "aria-label"?: string }) {
  const external = /^https?:|^mailto:|^tel:/.test(href);
  if (external) {
    const isWeb = href.startsWith("http");
    return (
      <a href={href} className={className} {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
        {isWeb && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <SmartLink href={href} className="link-arrow">
      {children}
      {external ? <External /> : <Arrow />}
    </SmartLink>
  );
}

export function SectionHeader({ eyebrow, title, intro, align = "left", tone = "light" }: { eyebrow?: string; title: string; intro?: string; align?: "left" | "center"; tone?: "light" | "dark" }) {
  return (
    <header className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${tone === "dark" ? "!text-glacier" : ""}`}>{eyebrow}</p>}
      <h2 className={`font-display text-display-lg ${tone === "dark" ? "text-white" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`mt-5 max-w-prose text-[17.5px] ${tone === "dark" ? "text-silver" : "text-ink-soft"}`}>{intro}</p>}
    </header>
  );
}

export function PageHero({ eyebrow, title, intro, crumbs, image }: { eyebrow?: string; title: string; intro?: string; crumbs?: { label: string; href: string }[]; image?: StaticImageData }) {
  const dark = Boolean(image);
  return (
    <section className={`relative overflow-hidden ${dark ? "bg-navy text-white" : "bg-mist text-ink"}`}>
      {image && (
        <>
          <Image src={image} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover object-center motion-safe:animate-settle" />
          {/* Warm-ink scrim: deepest at the bottom-left where the text sits */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/45 to-navy/10" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-navy/15 to-transparent" aria-hidden="true" />
        </>
      )}
      <div className={`container relative flex flex-col justify-end pb-14 pt-10 md:pb-20 ${dark ? "min-h-[440px] md:min-h-[560px]" : "md:pt-14"}`}>
        {crumbs && (
          <nav aria-label="Breadcrumb" className={`mb-auto pb-16 text-[13px] ${dark ? "text-glacier" : "text-ink-faint"}`}>
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className={dark ? "hover:text-white" : "hover:text-ink"}>Home</Link></li>
              {crumbs.map((c) => (
                <li key={c.href} className="flex gap-2">
                  <span aria-hidden="true">/</span>
                  <Link href={c.href} className={dark ? "hover:text-white" : "hover:text-ink"}>{c.label}</Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className={`mb-5 text-[13.5px] font-semibold ${dark ? "text-glacier" : "text-blue"}`}>{eyebrow}</p>}
        <h1 className="max-w-4xl font-display text-display-xl">{title}</h1>
        {intro && <p className={`mt-6 max-w-2xl text-[18px] leading-relaxed ${dark ? "text-glacier" : "text-ink-soft"}`}>{intro}</p>}
      </div>
      <Kinara tone={dark ? "light" : "brass"} className="relative opacity-80" id="hero-kinara" />
    </section>
  );
}

export function Section({ children, className = "", id, tone = "white" }: { children: ReactNode; className?: string; id?: string; tone?: "white" | "mist" | "navy" }) {
  const bg = tone === "mist" ? "bg-mist" : tone === "navy" ? "bg-navy text-white" : "bg-white";
  return (
    <section id={id} className={`${bg} py-20 md:py-28 ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SourceNote({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[12.5px] text-ink-faint">{children}</p>;
}
