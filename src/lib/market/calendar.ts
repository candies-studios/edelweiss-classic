import type { MarketStatus } from "./types";
import holidays from "./holidays.json";

/**
 * Indian equity session times (IST).
 * Pre-open 09:00–09:15, normal market 09:15–15:30, Monday–Friday,
 * excluding exchange trading holidays.
 *
 * Holidays: load the official NSE/BSE trading-holiday list for each year into
 * `holidays.json` (YYYY-MM-DD). When the licensed provider reports market status,
 * that takes precedence over this calendar.
 */
const TZ = "Asia/Kolkata";

export function istParts(date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  });
  const p = Object.fromEntries(fmt.formatToParts(date).map((x) => [x.type, x.value]));
  return {
    ymd: `${p.year}-${p.month}-${p.day}`,
    minutes: Number(p.hour) * 60 + Number(p.minute),
    weekday: p.weekday as string,
  };
}

export function isTradingDay(date = new Date()) {
  const { ymd, weekday } = istParts(date);
  if (weekday === "Sat" || weekday === "Sun") return false;
  return !(holidays as { dates: string[] }).dates.includes(ymd);
}

export function calendarStatus(date = new Date()): MarketStatus {
  if (!isTradingDay(date)) return "CLOSED";
  const { minutes } = istParts(date);
  if (minutes >= 9 * 60 && minutes < 9 * 60 + 15) return "PRE_OPEN";
  if (minutes >= 9 * 60 + 15 && minutes < 15 * 60 + 30) return "OPEN";
  return "CLOSED";
}

export function formatIST(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: TZ,
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}
