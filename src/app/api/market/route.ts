import { NextResponse, type NextRequest } from "next/server";
import { getSnapshot } from "@/lib/market/service";
import { INDEX_META } from "@/lib/market/indices";
import type { IndexId } from "@/lib/market/types";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/** GET /api/market?indices=NIFTY50,SENSEX — one snapshot. */
export async function GET(req: NextRequest) {
  const rl = rateLimit(`market:${clientKey(req.headers)}`, 120);
  if (!rl.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const requested = req.nextUrl.searchParams.get("indices");
  let ids: IndexId[] | undefined;
  if (requested) {
    ids = requested.split(",").filter((s): s is IndexId => s in INDEX_META).slice(0, 10);
    if (!ids.length) return NextResponse.json({ error: "Unknown index" }, { status: 400 });
  }

  const snapshot = await getSnapshot(ids);
  return NextResponse.json(snapshot, { headers: { "Cache-Control": "no-store" } });
}
