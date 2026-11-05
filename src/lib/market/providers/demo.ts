import type { IndexId, IndexQuote, MarketDataProvider } from "../types";
import { INDEX_META, computeChange } from "../indices";
import { calendarStatus } from "../calendar";

/**
 * DEMO provider.
 * Produces SAMPLE values for UI development only. These numbers are not market
 * data and the UI always shows a "DEMO DATA" label when this provider is active.
 */
const SAMPLE_BASE: Record<IndexId, number> = {
  NIFTY50: 25000,
  SENSEX: 82000,
  BANKNIFTY: 55000,
  NIFTYNEXT50: 68000,
  NIFTYMIDCAP100: 57000,
};

const state = new Map<IndexId, number>();

function sampleWalk(id: IndexId) {
  const base = SAMPLE_BASE[id];
  const prev = state.get(id) ?? base * (1 + (Math.random() - 0.5) * 0.01);
  const next = prev * (1 + (Math.random() - 0.5) * 0.0006);
  state.set(id, next);
  return next;
}

export const demoProvider: MarketDataProvider = {
  name: "Demo (sample data)",
  mode: "demo",
  async getQuotes(ids) {
    const open = calendarStatus() === "OPEN";
    const now = new Date().toISOString();
    return ids.map((id): IndexQuote => {
      const previousClose = SAMPLE_BASE[id];
      const value = open ? sampleWalk(id) : state.get(id) ?? previousClose * 1.004;
      return {
        id,
        ...INDEX_META[id],
        value,
        previousClose,
        ...computeChange(value, previousClose),
        asOf: now,
        isClose: !open,
      };
    });
  },
};
