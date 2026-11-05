import "server-only";
import type { IndexId, IndexQuote, MarketDataProvider, MarketStatus } from "../types";
import { INDEX_META, computeChange } from "../indices";

/**
 * Adapter for an authorised NSE/BSE market-data vendor.
 *
 * Runs on the server only: credentials come from environment variables and
 * never reach the browser bundle. Do not scrape exchange websites or use
 * unofficial APIs.
 *
 * To connect a vendor:
 *  1. Set MARKET_DATA_PROVIDER=licensed and the MARKET_DATA_* variables.
 *  2. Map the vendor's symbols in VENDOR_SYMBOLS.
 *  3. Adjust `toQuote` to the vendor's response shape. Use the vendor's own
 *     reference value (previous official close) for change calculations.
 *  4. If the vendor offers WebSocket streaming, implement `subscribe` (skeleton below).
 */

const VENDOR_SYMBOLS: Record<IndexId, string> = {
  NIFTY50: "NIFTY 50",
  SENSEX: "SENSEX",
  BANKNIFTY: "NIFTY BANK",
  NIFTYNEXT50: "NIFTY NEXT 50",
  NIFTYMIDCAP100: "NIFTY MIDCAP 100",
};

type VendorQuote = {
  symbol: string;
  last: number;
  prevClose: number;
  timestamp: string;
  isClose?: boolean;
};

function config() {
  const restUrl = process.env.MARKET_DATA_REST_URL;
  const apiKey = process.env.MARKET_DATA_API_KEY;
  if (!restUrl || !apiKey) throw new Error("Licensed market-data provider is not configured.");
  return { restUrl, apiKey, apiSecret: process.env.MARKET_DATA_API_SECRET, wsUrl: process.env.MARKET_DATA_WS_URL };
}

function toQuote(id: IndexId, v: VendorQuote): IndexQuote {
  return {
    id,
    ...INDEX_META[id],
    value: v.last,
    previousClose: v.prevClose,
    ...computeChange(v.last, v.prevClose),
    asOf: new Date(v.timestamp).toISOString(),
    isClose: Boolean(v.isClose),
  };
}

export const licensedProvider: MarketDataProvider = {
  name: "Licensed vendor",
  mode: "live",

  async getQuotes(ids) {
    const { restUrl, apiKey, apiSecret } = config();
    const url = new URL(restUrl);
    url.searchParams.set("symbols", ids.map((i) => VENDOR_SYMBOLS[i]).join(","));
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}`, ...(apiSecret ? { "X-Api-Secret": apiSecret } : {}) },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`Market-data vendor responded ${res.status}`);
    const data = (await res.json()) as { quotes: VendorQuote[] };
    return ids.map((id) => {
      const q = data.quotes.find((x) => x.symbol === VENDOR_SYMBOLS[id]);
      if (!q) throw new Error(`No quote for ${id}`);
      return toQuote(id, q);
    });
  },

  async getStatus(): Promise<MarketStatus> {
    // Most vendors expose an exchange session/status endpoint. Return UNKNOWN to
    // fall back to the IST calendar until it is wired up.
    return "UNKNOWN";
  },

  subscribe(ids, onQuote, onError) {
    const { wsUrl, apiKey } = config();
    if (!wsUrl) {
      onError(new Error("MARKET_DATA_WS_URL is not set; using polling."));
      return () => {};
    }
    // Node 22+ provides a global WebSocket client.
    const ws = new WebSocket(wsUrl);
    ws.addEventListener("open", () => {
      ws.send(JSON.stringify({ action: "auth", key: apiKey }));
      ws.send(JSON.stringify({ action: "subscribe", symbols: ids.map((i) => VENDOR_SYMBOLS[i]) }));
    });
    ws.addEventListener("message", (ev) => {
      try {
        const v = JSON.parse(String(ev.data)) as VendorQuote;
        const id = (Object.keys(VENDOR_SYMBOLS) as IndexId[]).find((k) => VENDOR_SYMBOLS[k] === v.symbol);
        if (id) onQuote(toQuote(id, v));
      } catch (e) {
        onError(e as Error);
      }
    });
    ws.addEventListener("error", () => onError(new Error("Vendor WebSocket error")));
    return () => ws.close();
  },
};
