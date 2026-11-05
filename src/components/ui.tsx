import Link from "next/link";
import type { ReactNode } from "react";
import { Jaali } from "@/components/Jaali";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true" className={className}>
      <path d="M0 6h16.5M11.5 1 16.5 6l-5 5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function External({ className = "" }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M4 1.5h6.5V8M10.5 1.5 1.5 10.5" stroke="currentColor" strokeWidth="1.3" />
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
      {eyebrow && <p className={`eyebrow mb-5 ${tone === "dark" ? "!text-silver" : ""}`}>{eyebrow}</p>}
      <h2 className={`font-display text-display-lg font-normal ${tone === "dark" ? "text-white" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`mt-6 max-w-prose text-[18px] ${tone === "dark" ? "text-silver" : "text-ink-soft"}`}>{intro}</p>}
    </header>
  );
}

/** Inner-page hero: white, typographic, with a quiet jaali panel at the right edge. */
export function PageHero({ eyebrow, title, intro, crumbs }: { eyebrow?: string; title: string; intro?: string; crumbs?: { label: string; href: string }[] }) {
  return (
    <section className="relative overflow-hidden border-b border-silver-300 bg-white">
      <Jaali className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[34%] md:block" opacity={0.28} fade="left" id="ph-jaali" />
      <div className="container relative pb-16 pt-12 md:pb-24 md:pt-16">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-14 text-[13px] text-ink-faint">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="hover:text-ink">Home</Link></li>
              {crumbs.map((c) => (
                <li key={c.href} className="flex gap-2">
                  <span aria-hidden="true">/</span>
                  <Link href={c.href} className="hover:text-ink">{c.label}</Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
        <h1 className="max-w-4xl font-display text-display-xl font-normal text-ink">{title}</h1>
        {intro && <p className="mt-8 max-w-2xl text-[19px] leading-relaxed text-ink-soft">{intro}</p>}
      </div>
    </section>
  );
}

export function Section({ children, className = "", id, tone = "white" }: { children: ReactNode; className?: string; id?: string; tone?: "white" | "mist" | "navy" }) {
  const bg = tone === "mist" ? "bg-mist" : tone === "navy" ? "bg-navy text-white" : "bg-white";
  return (
    <section id={id} className={`${bg} py-20 md:py-32 ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SourceNote({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[12.5px] text-ink-faint">{children}</p>;
}
