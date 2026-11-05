import type { Exchange, IndexId } from "./types";

export const INDEX_META: Record<IndexId, { name: string; exchange: Exchange }> = {
  NIFTY50: { name: "NIFTY 50", exchange: "NSE" },
  SENSEX: { name: "SENSEX", exchange: "BSE" },
  BANKNIFTY: { name: "NIFTY BANK", exchange: "NSE" },
  NIFTYNEXT50: { name: "NIFTY NEXT 50", exchange: "NSE" },
  NIFTYMIDCAP100: { name: "NIFTY MIDCAP 100", exchange: "NSE" },
};

/** Indices shown on the site today. Extend this list to add Bank Nifty, Next 50, Midcap, etc. */
export const DISPLAY_INDICES: IndexId[] = ["NIFTY50", "SENSEX"];

export function computeChange(value: number, previousClose: number) {
  const change = value - previousClose;
  const changePercent = previousClose ? (change / previousClose) * 100 : 0;
  return { change, changePercent };
}
