/**
 * Kinara — the woven border of an Indian sari, abstracted into a single
 * hairline band: twin rules with a repeating lozenge-and-dot weave between them.
 * Used as the divider between major sections.
 */
export function Kinara({ className = "", tone = "brass", id = "kinara" }: { className?: string; tone?: "brass" | "light"; id?: string }) {
  const c = tone === "light" ? "#DCD3C6" : "#A8834F";
  return (
    <svg className={`block h-[18px] w-full ${className}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={`${id}-p`} width="28" height="18" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={c} strokeWidth="0.9">
            <path d="M14 3.5 L20 9 L14 14.5 L8 9 Z" />
            <path d="M0 9 H5 M23 9 H28" strokeOpacity="0.7" />
          </g>
          <circle cx="14" cy="9" r="1.3" fill={c} />
          <circle cx="0" cy="9" r="0.9" fill={c} />
          <circle cx="28" cy="9" r="0.9" fill={c} />
        </pattern>
      </defs>
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke={c} strokeWidth="1" />
      <rect y="0" width="100%" height="18" fill={`url(#${id}-p)`} />
      <line x1="0" y1="17.5" x2="100%" y2="17.5" stroke={c} strokeWidth="1" />
    </svg>
  );
}
