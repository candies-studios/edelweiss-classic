import type { NextRequest } from "next/server";
import { getSnapshot } from "@/lib/market/service";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/**
 * GET /api/market/stream — Server-Sent Events to the browser.
 *
 * The server holds the vendor connection (REST polling or vendor WebSocket);
 * the browser only ever talks to this route, so no credentials are exposed.
 * Cadence: 3 s while the market is open, 60 s otherwise.
 */
export async function GET(req: NextRequest) {
  const rl = rateLimit(`stream:${clientKey(req.headers)}`, 20);
  if (!rl.ok) return new Response("Too many requests", { status: 429 });

  const encoder = new TextEncoder();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      const push = async () => {
        if (closed) return;
        const snap = await getSnapshot();
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(snap)}\n\n`));
        } catch {
          closed = true;
          return;
        }
        timer = setTimeout(push, snap.status === "OPEN" ? 3000 : 60_000);
      };
      controller.enqueue(encoder.encode("retry: 5000\n\n"));
      await push();
    },
    cancel() {
      closed = true;
      if (timer) clearTimeout(timer);
    },
  });

  req.signal.addEventListener("abort", () => {
    closed = true;
    if (timer) clearTimeout(timer);
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
