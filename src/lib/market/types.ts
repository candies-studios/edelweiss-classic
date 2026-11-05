/** Indices the ticker can show. Add new ones here and in `indices.ts`. */
export type IndexId = "NIFTY50" | "SENSEX" | "BANKNIFTY" | "NIFTYNEXT50" | "NIFTYMIDCAP100";

export type Exchange = "NSE" | "BSE";

export type MarketStatus = "OPEN" | "CLOSED" | "PRE_OPEN" | "UNKNOWN";

export interface IndexQuote {
  id: IndexId;
  name: string;
  exchange: Exchange;
  /** Last traded value, or the official close when the market is closed. */
  value: number;
  /** Provider's reference value (previous official close). Changes are computed from this. */
  previousClose: number;
  change: number;
  changePercent: number;
  /** ISO timestamp of this quote from the provider. */
  asOf: string;
  /** True when `value` is an official closing value rather than an intraday print. */
  isClose: boolean;
}

export type DataMode = "demo" | "live" | "delayed";

export interface MarketSnapshot {
  quotes: IndexQuote[];
  status: MarketStatus;
  mode: DataMode;
  /** ISO timestamp when the server assembled this snapshot. */
  generatedAt: string;
  /** True if the newest quote is older than the configured stale threshold during market hours. */
  stale: boolean;
  /** Licence-required attribution text, if any. */
  attribution?: string;
  error?: string;
}

/**
 * Every market-data vendor is wrapped in this interface so the vendor can be
 * swapped without touching UI code.
 */
export interface MarketDataProvider {
  readonly name: string;
  readonly mode: DataMode;
  /** One-off snapshot (REST). */
  getQuotes(ids: IndexId[]): Promise<IndexQuote[]>;
  /** Optional streaming (WebSocket). Returns an unsubscribe function. */
  subscribe?(ids: IndexId[], onQuote: (q: IndexQuote) => void, onError: (e: Error) => void): () => void;
  /** Optional: exchange-reported status. When absent, the IST calendar is used. */
  getStatus?(): Promise<MarketStatus>;
}
