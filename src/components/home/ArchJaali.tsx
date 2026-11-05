import { Jaali } from "@/components/Jaali";

/**
 * A jaali screen set inside a cusped arch — the window of an Indian monument —
 * rendered with hairline strokes. The page's one decorative moment.
 */
export function ArchJaali({ className = "" }: { className?: string }) {
  // Arch: straight jambs rising into a pointed crown.
  const arch = "M20 600 V250 C20 130 120 50 200 20 C280 50 380 130 380 250 V600 Z";
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 620" className="h-full w-full">
        <defs>
          <clipPath id="arch-clip">
            <path d={arch} />
          </clipPath>
        </defs>
        <g clipPath="url(#arch-clip)">
          <Jaali width={400} height={620} opacity={0.55} size={50} id="arch-jaali" />
        </g>
        <path d={arch} fill="none" stroke="#141414" strokeWidth="1.2" />
        <path d="M44 600 V256 C44 150 132 78 200 50 C268 78 356 150 356 256 V600" fill="none" stroke="#141414" strokeWidth="0.6" strokeOpacity="0.6" />
        <line x1="0" y1="600" x2="400" y2="600" stroke="#141414" strokeWidth="1.2" />
        <line x1="0" y1="612" x2="400" y2="612" stroke="#141414" strokeWidth="0.6" strokeOpacity="0.6" />
      </svg>
    </div>
  );
}
