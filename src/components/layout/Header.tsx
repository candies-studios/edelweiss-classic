"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, searchIndex } from "@/content/site";
import { Logo } from "@/components/Logo";
import { External } from "@/components/ui";
import { MarketTicker } from "@/components/market/MarketTicker";

function NavLink({ href, external, className, children, onClick }: { href: string; external?: boolean; className?: string; children: React.ReactNode; onClick?: () => void }) {
  if (external || href.startsWith("http"))
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {children} <External className="ml-1 inline opacity-60" />
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
  const results = term ? searchIndex.filter((r) => `${r.title} ${r.keywords}`.toLowerCase().includes(term)) : searchIndex.slice(0, 6);
  return (
    <div className="fixed inset-0 z-[60] bg-navy-900/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Search the site" onClick={onClose}>
      <div className="container pt-24" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto max-w-2xl bg-white shadow-2xl">
          <label htmlFor="site-search" className="sr-only">Search</label>
          <input
            id="site-search"
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            maxLength={80}
            placeholder="Search businesses, investor documents, careers…"
            className="w-full border-b border-silver-300 px-6 py-5 text-[18px] outline-none placeholder:text-ink-faint"
          />
          <ul className="max-h-[50vh] overflow-auto py-2">
            {results.length === 0 && <li className="px-6 py-4 text-ink-soft">No pages match “{q}”. Try a business name or “annual report”.</li>}
            {results.map((r) => (
              <li key={r.href}>
                <Link href={r.href} onClick={onClose} className="block px-6 py-3 text-[15.5px] text-navy hover:bg-mist focus:bg-mist">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpenMenu(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  return (
    <>
      <a href="#main" className="sr-only z-[70] bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-[0_1px_0_#DCE2EA,0_8px_24px_-16px_rgba(10,34,64,.25)]" : "shadow-[0_1px_0_#E9EDF2]"}`}>
        <div className="container flex h-[72px] items-center justify-between gap-6" onMouseLeave={() => setOpenMenu(null)}>
          <Link href="/" aria-label="Edelweiss home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden h-full lg:block">
            <ul className="flex h-full items-center gap-1">
              {nav.map((item) => {
                const base = item.href.split("#")[0];
                const active = !item.href.includes("#") && (pathname === base || pathname.startsWith(`${base}/`));
                return (
                  <li key={item.label} className="h-full" onMouseEnter={() => setOpenMenu(item.columns ? item.label : null)}>
                    {item.columns ? (
                      <button
                        className={`flex h-full items-center gap-1.5 px-3.5 text-[14.5px] font-medium transition-colors hover:text-blue ${active ? "text-blue" : "text-navy"}`}
                        aria-expanded={openMenu === item.label}
                        aria-controls={`menu-${item.label}`}
                        onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                      >
                        {item.label}
                        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={`transition-transform ${openMenu === item.label ? "rotate-180" : ""}`}>
                          <path d="M1.5 3.5 5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                        </svg>
                      </button>
                    ) : (
                      <NavLink href={item.href} className={`flex h-full items-center px-3.5 text-[14.5px] font-medium transition-colors hover:text-blue ${active ? "text-blue" : "text-navy"}`}>
                        {item.label}
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <button onClick={() => setSearch(true)} className="grid h-11 w-11 place-items-center text-navy transition-colors hover:text-blue" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.7" />
                <path d="m13 13 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>
            <button onClick={() => setMobile(true)} className="grid h-11 w-11 place-items-center text-navy lg:hidden" aria-label="Open menu" aria-expanded={mobile}>
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Desktop mega menu */}
          {nav.map(
            (item) =>
              item.columns && (
                <div
                  key={item.label}
                  id={`menu-${item.label}`}
                  className={`absolute inset-x-0 top-[72px] hidden border-t border-silver-200 bg-white shadow-[0_24px_40px_-24px_rgba(10,34,64,.35)] lg:block ${openMenu === item.label ? "visible opacity-100" : "invisible opacity-0"} transition-opacity duration-200`}
                >
                  <div className="container grid grid-cols-12 gap-10 py-10">
                    <div className="col-span-3 border-r border-silver-200 pr-8">
                      <p className="font-display text-[26px] leading-tight text-navy">{item.label}</p>
                      <Link href={item.href} className="link-arrow mt-4 text-[14px]">
                        Overview
                      </Link>
                    </div>
                    <div className={`col-span-9 grid gap-8 ${item.columns.length > 2 ? "grid-cols-4" : "grid-cols-2"}`}>
                      {item.columns.map((col) => (
                        <div key={col.title}>
                          <p className="mb-3 text-[12.5px] font-semibold text-ink-faint">{col.title}</p>
                          <ul className="space-y-2.5">
                            {col.items.map((l) => (
                              <li key={l.label}>
                                <NavLink href={l.href} external={l.external} className="group block text-[15px] font-medium text-navy hover:text-blue">
                                  {l.label}
                                  {l.description && <span className="mt-0.5 block text-[13px] font-normal text-ink-soft">{l.description}</span>}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>
        <MarketTicker />
      </header>

      {/* Mobile full-screen menu */}
      <div className={`fixed inset-0 z-[55] flex flex-col bg-navy text-white transition-opacity duration-300 lg:hidden ${mobile ? "visible opacity-100" : "invisible opacity-0"}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="container flex h-[72px] items-center justify-between">
          <Logo variant="light" />
          <button onClick={() => setMobile(false)} className="grid h-11 w-11 place-items-center" aria-label="Close menu">
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <path d="M5 5l12 12M17 5 5 17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="container flex-1 overflow-y-auto pb-12 pt-4">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {nav.map((item) => (
              <li key={item.label}>
                {item.columns ? (
                  <>
                    <button
                      className="flex w-full items-center justify-between py-5 text-left font-display text-[26px]"
                      aria-expanded={mobileSection === item.label}
                      onClick={() => setMobileSection(mobileSection === item.label ? null : item.label)}
                    >
                      {item.label}
                      <span className="text-[22px] text-glacier" aria-hidden="true">{mobileSection === item.label ? "−" : "+"}</span>
                    </button>
                    {mobileSection === item.label && (
                      <div className="space-y-5 pb-6">
                        {item.columns.map((col) => (
                          <div key={col.title}>
                            <p className="mb-2 text-[12.5px] font-semibold text-glacier">{col.title}</p>
                            <ul className="space-y-2">
                              {col.items.map((l) => (
                                <li key={l.label}>
                                  <NavLink href={l.href} external={l.external} className="text-[16px] text-silver hover:text-white" onClick={() => setMobile(false)}>
                                    {l.label}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink href={item.href} className="block py-5 font-display text-[26px]" onClick={() => setMobile(false)}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </>
  );
}
