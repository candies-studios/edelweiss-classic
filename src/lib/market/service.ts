import "server-only";
import type { IndexId, MarketDataProvider, MarketSnapshot } from "./types";
import { DISPLAY_INDICES } from "./indices";
import { calendarStatus } from "./calendar";
import { demoProvider } from "./providers/demo";
import { licensedProvider } from "./providers/licensed";

export function getProvider(): MarketDataProvider {
  return process.env.MARKET_DATA_PROVIDER === "licensed" ? licensedProvider : demoProvider;
}

const STALE_MS = Number(process.env.MARKET_DATA_STALE_AFTER_SECONDS ?? 30) * 1000;

/** Last good snapshot, so a vendor outage shows the last known values (flagged stale), not fabricated ones. */
let lastGood: MarketSnapshot | null = null;

export async function getSnapshot(ids: IndexId[] = DISPLAY_INDICES): Promise<MarketSnapshot> {
  const provider = getProvider();
  const generatedAt = new Date().toISOString();
  const attribution = provider.mode === "demo" ? undefined : process.env.MARKET_DATA_ATTRIBUTION || undefined;

  try {
    const [quotes, vendorStatus] = await Promise.all([
      provider.getQuotes(ids),
      provider.getStatus ? provider.getStatus() : Promise.resolve("UNKNOWN" as const),
    ]);
    const status = vendorStatus !== "UNKNOWN" ? vendorStatus : calendarStatus();
    const newest = Math.max(...quotes.map((q) => Date.parse(q.asOf)));
    const stale = status === "OPEN" && Date.now() - newest > STALE_MS;
    const snapshot: MarketSnapshot = { quotes, status, mode: provider.mode, generatedAt, stale, attribution };
    lastGood = snapshot;
    return snapshot;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Market data unavailable";
    if (lastGood) return { ...lastGood, generatedAt, stale: true, error: message };
    return { quotes: [], status: calendarStatus(), mode: provider.mode, generatedAt, stale: true, attribution, error: message };
  }
}
