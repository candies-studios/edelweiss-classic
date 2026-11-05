/**
 * Jaali — the pierced stone lattice of Indian architecture, drawn as a fine
 * geometric pattern (an eight-pointed star tiling). Pure SVG, no image weight.
 */
export function Jaali({
  className = "",
  stroke = "#141414",
  opacity = 0.35,
  size = 64,
  fade = "none",
  id = "jaali",
  width,
  height,
}: {
  className?: string;
  stroke?: string;
  opacity?: number;
  size?: number;
  fade?: "none" | "left" | "radial" | "bottom";
  id?: string;
  width?: number;
  height?: number;
}) {
  const s = size;
  const h = s / 2;
  const q = s / 4;
  const k = s * 0.146; // star inset (≈ (1 − 1/√2) / 2)
  return (
    <svg className={className} width={width} height={height} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={`${id}-p`} width={s} height={s} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={stroke} strokeWidth="0.8" strokeOpacity={opacity}>
            {/* eight-pointed star: two squares, one rotated 45° */}
            <rect x={q} y={q} width={h} height={h} />
            <path d={`M${h} ${q - k} L${s - q + k} ${h} L${h} ${s - q + k} L${q - k} ${h} Z`} />
            {/* links to neighbouring stars */}
            <path d={`M0 0 L${q} ${q} M${s} 0 L${s - q} ${q} M0 ${s} L${q} ${s - q} M${s} ${s} L${s - q} ${s - q}`} />
            <path d={`M${h} 0 V${q - k} M${h} ${s} V${s - q + k} M0 ${h} H${q - k} M${s} ${h} H${s - q + k}`} />
            <circle cx={h} cy={h} r={s * 0.09} />
          </g>
        </pattern>
        {fade !== "none" && (
          <>
            {fade === "radial" ? (
              <radialGradient id={`${id}-g`} cx="50%" cy="50%" r="60%">
                <stop offset="0" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
            ) : (
              <linearGradient id={`${id}-g`} x1={fade === "left" ? "0" : "0"} y1={fade === "bottom" ? "0" : "0"} x2={fade === "left" ? "1" : "0"} y2={fade === "bottom" ? "1" : "0"}>
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.55" stopColor="#fff" />
              </linearGradient>
            )}
            <mask id={`${id}-m`}>
              <rect width="100%" height="100%" fill={`url(#${id}-g)`} />
            </mask>
          </>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-p)`} mask={fade !== "none" ? `url(#${id}-m)` : undefined} />
    </svg>
  );
}
