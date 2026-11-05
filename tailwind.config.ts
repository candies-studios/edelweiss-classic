import type { Config } from "tailwindcss";

/**
 * Edelweiss "Kinara" design tokens.
 * Warm ink and sandstone, Indian indigo as the accent, brass for hairlines only.
 * Token names are shared with the other designs so every page adopts this system.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", sm: "2rem", lg: "3rem" }, screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        // dark surface → warm ink
        navy: { DEFAULT: "#1C1915", 900: "#13110E", 800: "#1C1915", 700: "#2A2621", 600: "#38332C" },
        // accent → Indian indigo (neel)
        blue: { DEFAULT: "#2E3B6E", 700: "#222C55", 500: "#2E3B6E", 300: "#8E98C2", 100: "#E7E8F1" },
        glacier: "#DCD3C6", // light sand, for text on dark/photo
        brass: "#A8834F",
        silver: { DEFAULT: "#C9C1B6", 300: "#E2DCD3", 200: "#ECE7E0" },
        mist: "#F3EFE9", // sandstone
        ink: { DEFAULT: "#1C1915", soft: "#5E574E", faint: "#8C847A" },
        up: "#1F7A4D",
        down: "#B03A2E",
      },
      fontFamily: {
        display: ['"Marcellus"', "Georgia", "serif"],
        sans: ['"Manrope"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        deva: ['"Noto Serif Devanagari"', "serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(2.7rem, 6vw, 5.6rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "display-xl": ["clamp(2.3rem, 4.4vw, 4rem)", { lineHeight: "1.06", letterSpacing: "-0.005em" }],
        "display-lg": ["clamp(1.9rem, 3.1vw, 2.9rem)", { lineHeight: "1.12" }],
        "display-md": ["clamp(1.45rem, 2.1vw, 1.9rem)", { lineHeight: "1.2" }],
      },
      maxWidth: { prose: "64ch" },
      transitionTimingFunction: { refined: "cubic-bezier(.22,.7,.2,1)" },
      keyframes: {
        settle: { "0%": { transform: "scale(1.06)" }, "100%": { transform: "scale(1)" } },
      },
      animation: { settle: "settle 2.4s cubic-bezier(.22,.7,.2,1) both" },
    },
  },
  plugins: [],
};

export default config;
