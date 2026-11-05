"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company, nav, searchIndex } from "@/content/site";
import { Logo } from "@/components/Logo";
import { Jaali } from "@/components/Jaali";
import { External } from "@/components/ui";
import { MarketTicker } from "@/components/market/MarketTicker";

const quickLinks = [
  { label: "Our Businesses", href: "/businesses" },
  { label: "Investors", href: "/investors" },
  { label: "Insights", href: "/media#insights" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

function MenuLink({ href, external, className, children, onClick }: { href: string; external?: boolean; className?: string; children: React.ReactNode; onClick?: () => void }) {
  if (external || href.startsWith("http"))
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {children} <External className="ml-1 inline opacity-50" />
      </a>
    );
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus(), 20);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const term = q.trim().toLowerCase().slice(0, 80);
  const results = term ? searchIndex.filter((r) => `${r.title} ${r.keywords}`.toLowerCase().includes(term)) : searchIndex.slice(0, 7);
  return (
    <div className="fixed inset-0 z-[70] bg-white" role="dialog" aria-modal="true" aria-label="Search the site">
      <div className="container flex h-[84px] items-center justify-end">
        <button onClick={onClose} className="flex items-center gap-3 text-[15px] font-medium" aria-label="Close search">
          Close
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.4" /></svg>
        </button>
      </div>
      <div className="container max-w-4xl pt-10">
        <label htmlFor="site-search" className="eyebrow">Search Edelweiss</label>
        <input
          id="site-search"
          ref={input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          maxLength={80}
          placeholder="Businesses, reports, careers…"
          className="mt-4 w-full border-b border-ink bg-transparent pb-4 font-display text-[clamp(28px,4vw,44px)] outline-none placeholder:text-silver"
        />
        <ul className="mt-8">
          {results.length === 0 && <li className="py-3 text-ink-soft">No pages match “{q}”. Try a business name or “annual report”.</li>}
          {results.map((r) => (
            <li key={r.href} className="border-b border-silver-300">
              <Link href={r.href} onClick={onClose} className="flex items-center justify-between py-4 text-[17px] hover:text-blue">
                {r.title}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenu(false);
    setSearch(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu || search ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu, search]);

  return (
    <>
      <a href="#main" className="sr-only z-[80] bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_0_#DEDCD7]" : ""}`}>
        <div className="container flex h-[84px] items-center justify-between gap-8">
          <Link href="/" aria-label="Edelweiss home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-9">
              {quickLinks.map((l) => {
                const base = l.href.split("#")[0];
                const active = !l.href.includes("#") && (pathname === base || pathname.startsWith(`${base}/`));
                return (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className={`relative py-2 text-[15px] transition-colors hover:text-blue after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 ${active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setSearch(true)} className="grid h-11 w-11 place-items-center transition-colors hover:text-blue" aria-label="Search">
              <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="6.2" stroke="currentColor" strokeWidth="1.4" />
                <path d="m13.2 13.2 5 5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
            <button onClick={() => setMenu(true)} className="flex h-11 items-center gap-3 pl-2 text-[15px] font-medium" aria-expanded={menu} aria-controls="site-menu">
              <span className="hidden sm:inline">Menu</span>
              <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true"><path d="M0 1h26M8 11h18" stroke="currentColor" strokeWidth="1.4" /></svg>
              <span className="sr-only sm:hidden">Open menu</span>
            </button>
          </div>
        </div>
        <MarketTicker />
      </header>

      {/* Full-screen menu */}
      <div
        id="site-menu"
        className={`fixed inset-0 z-[60] overflow-y-auto bg-white transition-[opacity,visibility] duration-300 ${menu ? "visible opacity-100" : "invisible opacity-0"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <Jaali className="pointer-events-none absolute bottom-0 left-0 hidden h-[34%] w-full lg:block" opacity={0.18} fade="bottom" id="menu-jaali" />
        <div className="container flex h-[84px] items-center justify-between">
          <Logo />
          <button onClick={() => setMenu(false)} className="flex items-center gap-3 text-[15px] font-medium" aria-label="Close menu">
            Close
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
        </div>
        <nav aria-label="Site" className="container relative grid gap-12 pb-20 pt-10 lg:grid-cols-12">
          <ul className="space-y-1 lg:col-span-5">
            {nav.map((g) => (
              <li key={g.label}>
                <MenuLink href={g.href} className="block py-1.5 font-display text-[clamp(30px,3.6vw,46px)] leading-tight transition-colors hover:text-blue" onClick={() => setMenu(false)}>
                  {g.label}
                </MenuLink>
              </li>
            ))}
          </ul>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:grid-cols-3">
            {nav
              .filter((g) => g.columns)
              .flatMap((g) => g.columns!)
              .map((col) => (
                <div key={col.title}>
                  <p className="mb-3 border-b border-silver-300 pb-2 text-[13px] text-ink-faint">{col.title}</p>
                  <ul className="space-y-2">
                    {col.items.map((l) => (
                      <li key={l.label}>
                        <MenuLink href={l.href} external={l.external} className="text-[15px] hover:text-blue" onClick={() => setMenu(false)}>
                          {l.label}
                        </MenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
          <p className="text-[13px] text-ink-faint lg:col-span-12">
            NSE: {company.listings[0].code} · BSE: {company.listings[1].code}
          </p>
        </nav>
      </div>

      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </>
  );
}
