"use client";

import { useMemo, useState } from "react";
import type { DocCategory, InvestorDoc } from "@/content/site";

export function DocLibrary({ docs, categories, compact = false }: { docs: InvestorDoc[]; categories?: DocCategory[]; compact?: boolean }) {
  const pool = categories ? docs.filter((d) => categories.includes(d.category)) : docs;
  const years = useMemo(() => Array.from(new Set(pool.map((d) => d.fy))).sort().reverse(), [pool]);
  const cats = useMemo(() => Array.from(new Set(pool.map((d) => d.category))), [pool]);
  const [fy, setFy] = useState<string>("All");
  const [cat, setCat] = useState<string>("All");

  const list = pool.filter((d) => (fy === "All" || d.fy === fy) && (cat === "All" || d.category === cat));
  const shown = compact ? list.slice(0, 6) : list;

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4 border-b border-silver-300 pb-5">
        <fieldset>
          <legend className="mb-2 text-[12.5px] font-semibold text-ink-faint">Financial year</legend>
          <div className="flex flex-wrap gap-1.5" role="group">
            {["All", ...years].map((y) => (
              <button
                key={y}
                onClick={() => setFy(y)}
                aria-pressed={fy === y}
                className={`rounded-[3px] px-3 py-1.5 text-[13.5px] font-medium transition-colors ${fy === y ? "bg-navy text-white" : "bg-mist text-navy hover:bg-silver-200"}`}
              >
                {y}
              </button>
            ))}
          </div>
        </fieldset>
        {cats.length > 1 && (
          <label className="ml-auto block">
            <span className="mb-2 block text-[12.5px] font-semibold text-ink-faint">Document type</span>
            <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-[3px] border border-silver bg-white px-3 py-1.5 text-[14px] text-navy">
              <option>All</option>
              {cats.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        )}
      </div>

      <ul className="divide-y divide-silver-200">
        {shown.length === 0 && <li className="py-6 text-ink-soft">No documents match these filters. Choose another year or type.</li>}
        {shown.map((d) => (
          <li key={d.href}>
            <a href={d.href} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[1fr_auto] items-center gap-4 py-4">
              <span>
                <span className="block text-[15.5px] font-medium text-navy group-hover:text-blue">{d.title}</span>
                <span className="mt-0.5 block text-[13px] text-ink-faint">
                  {d.category} · {d.fy}
                </span>
              </span>
              <span className="flex items-center gap-2 text-[12.5px] font-semibold text-blue">
                {d.format}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 2v9m-4-4 4 4 4-4M3 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="sr-only">Download {d.title} (opens in a new tab)</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
