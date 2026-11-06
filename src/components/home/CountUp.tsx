"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated statistic: counts from 0 to the number inside `value`, keeping any
 * prefix/suffix exactly as written ("$10 bn+" → "$" + 10 + " bn+").
 *
 * - Starts when the figure scrolls into view, runs once per page visit.
 * - Ease-out over `duration` ms, offset by `delay` ms for a stagger.
 * - Reduced-motion users (and no-JS visitors, via <noscript> in the parent) get the final value.
 * - An invisible copy of the final value reserves the width, so nothing shifts while counting.
 * - Screen readers hear only the final value.
 */
export function CountUp({
  value,
  duration = 1700,
  delay = 0,
  suffixClassName = "",
}: {
  value: string;
  duration?: number;
  delay?: number;
  /** Optional styling for the unit after the number (e.g. " bn+"), so it can be set smaller. */
  suffixClassName?: string;
}) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? Number(match[2].replace(/,/g, "")) : 0;
  const decimals = match?.[2].includes(".") ? match[2].split(".")[1].length : 0;
  const suffix = match?.[3] ?? "";

  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(target);
      return;
    }

    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const run = () => {
      let start: number | null = null;
      const tick = (now: number) => {
        if (start === null) start = now;
        const t = Math.min((now - start) / duration, 1);
        setCurrent(target * easeOutQuart(t));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          timer = setTimeout(run, delay);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
    // value/duration/delay are static per statistic
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finalNumber = match ? match[2] : value;
  const shownNumber = match ? current.toFixed(decimals) : value;
  const render = (num: string) => (
    <>
      {prefix}
      {num}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </>
  );

  return (
    <span ref={ref} className="countup">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-grid tabular-nums">
        <span className="invisible col-start-1 row-start-1">{render(finalNumber)}</span>
        <span className="countup-anim col-start-1 row-start-1">{render(shownNumber)}</span>
        <span className="countup-final col-start-1 row-start-1 hidden">{render(finalNumber)}</span>
      </span>
    </span>
  );
}
