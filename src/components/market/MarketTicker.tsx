"use client";

import { useEffect, useRef, useState } from "react";
import type { IndexQuote, MarketSnapshot } from "@/lib/market/types";
import { calendarStatus, formatIST } from "@/lib/market/calendar";
import { demoProvider } from "@/lib/market/providers/demo";
import { DISPLAY_INDICES } from "@/lib/market/indices";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

const nf = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Quote({ q, flash }: { q: IndexQuote; flash: "up" | "down" | null }) {
  const up = q.change >= 0;
  return (
    <div className="flex items-baseline gap-3 whitespace-nowrap" aria-label={`${q.name} on ${q.exchange}`}>
      <span className="text-[11px] font-medium text-ink-faint">{q.exchange}</span>
      <span className="text-[13px] font-medium text-ink">{q.name}</span>
      <span
        className={`tabular-nums text-[13px] font-semibold text-ink transition-colors duration-700 ${
          flash === "up" ? "!text-up" : flash === "down" ? "!text-down" : ""
        }`}
      >
        {nf.format(q.value)}
      </span>
      <span className={`flex items-center gap-1 tabular-nums text-[13px] font-medium ${up ? "text-up" : "text-down"}`}>
        <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true" className={up ? "" : "rotate-180"}>
          <path d="M5 1 9.5 8.5H.5z" fill="currentColor" />
        </svg>
        <span className="sr-only">{up ? "Up" : "Down"}</span>
        {up ? "+" : "−"}
        {nf.format(Math.abs(q.change))} ({up ? "+" : "−"}
        {Math.abs(q.changePercent).toFixed(2)}%)
      </span>
      {q.isClose && <span className="border border-silver px-1.5 py-px text-[10px] font-medium text-ink-soft">Close</span>}
    </div>
  );
}

export function MarketTicker() {
  const [snap, setSnap] = useState<MarketSnapshot | null>(null);
  const [failed, setFailed] = useState(false);
  const prev = useRef<Record<string, number>>({});
  const [flash, setFlash] = useState<Record<string, "up" | "down" | null>>({});

  useEffect(() => {
    let es: EventSource | null = null;
    let poll: ReturnType<typeof setInterval> | undefined;

    const apply = (s: MarketSnapshot) => {
      const f: Record<string, "up" | "down" | null> = {};
      for (const q of s.quotes) {
        const p = prev.current[q.id];
        f[q.id] = p === undefined || p === q.value ? null : q.value > p ? "up" : "down";
        prev.current[q.id] = q.value;
      }
      setFlash(f);
      setSnap(s);
      setFailed(false);
      setTimeout(() => setFlash({}), 900);
    };

    // Static hosting (GitHub Pages) has no server: generate DEMO snapshots in the browser.
    if (STATIC) {
      const tick = async () => {
        const quotes = await demoProvider.getQuotes(DISPLAY_INDICES);
        apply({ quotes, status: calendarStatus(), mode: "demo", generatedAt: new Date().toISOString(), stale: false });
      };
      tick();
      poll = setInterval(tick, 3000);
      return () => clearInterval(poll);
    }

    const startPolling = () => {
      const load = () =>
        fetch(`${BASE}/api/market`, { cache: "no-store" })
          .then((r) => (r.ok ? r.json() : Promise.reject()))
          .then(apply)
          .catch(() => setFailed(true));
      load();
      poll = setInterval(load, 15_000);
    };

    if ("EventSource" in window) {
      es = new EventSource(`${BASE}/api/market/stream`);
      es.onmessage = (e) => apply(JSON.parse(e.data));
      es.onerror = () => {
        // Browser retries automatically; fall back to polling if the stream keeps failing.
        if (es?.readyState === EventSource.CLOSED) {
          es = null;
          startPolling();
        }
      };
    } else startPolling();

    return () => {
      es?.close();
      if (poll) clearInterval(poll);
    };
  }, []);

  const isDemo = snap?.mode === "demo";
  const isLive = snap?.mode === "live" && snap.status === "OPEN" && !snap.stale && !snap.error;
  const statusLabel =
    snap?.status === "OPEN" ? "Market open" : snap?.status === "PRE_OPEN" ? "Pre-open" : snap?.status === "CLOSED" ? "Market closed" : "Status unavailable";

  return (
    <div className="border-b border-silver-300 bg-mist text-ink" role="region" aria-label="Indian market indices">
      <div className="container flex min-h-[38px] flex-wrap items-center gap-x-7 gap-y-1 py-1.5 text-[12px]">
        <div className="flex items-center gap-2">
          {isLive ? (
            <span className="flex items-center gap-1.5 font-semibold text-up">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-up opacity-50 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-up" />
              </span>
              LIVE
            </span>
          ) : null}
          {isDemo && (
            <span className="bg-ink px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white" title="Sample values for development. Not market data.">
              DEMO DATA
            </span>
          )}
          <span className="text-ink-soft">{snap ? statusLabel : "Loading indices…"}</span>
        </div>

        <div className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-0.5" aria-live="polite">
          {snap?.quotes.map((q) => <Quote key={q.id} q={q} flash={flash[q.id] ?? null} />)}
          {(failed || (snap && !snap.quotes.length)) && <span className="text-ink-soft">Market data is temporarily unavailable.</span>}
        </div>

        {snap && (
          <div className="flex items-center gap-2 text-[11px] text-ink-faint sm:ml-auto">
            {snap.stale && snap.quotes.length > 0 && <span className="text-down">Delayed</span>}
            <time dateTime={snap.quotes[0]?.asOf ?? snap.generatedAt}>
              {snap.quotes.some((q) => q.isClose) ? "Closing values · " : "Updated "}
              {formatIST(snap.quotes[0]?.asOf ?? snap.generatedAt)} IST
            </time>
          </div>
        )}
      </div>
      {(isDemo || snap?.attribution) && (
        <p className="container hidden pb-1.5 text-[10.5px] leading-tight text-ink-faint sm:block">
          {isDemo
            ? "Sample values for demonstration only. Not live or historical market data. Connect a licensed NSE/BSE data provider to go live."
            : `${snap?.attribution} Index values are for information only and are not investment advice.`}
        </p>
      )}
    </div>
  );
}
