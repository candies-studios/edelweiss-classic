import type { Config } from "tailwindcss";

/**
 * Edelweiss "Classic" design tokens.
 * Ink, white and stone; Edelweiss blue as the single accent.
 * Token names are shared with the original design so every page adopts this system.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", sm: "2rem", lg: "3rem" }, screens: { "2xl": "1360px" } },
    extend: {
      colors: {
        // "navy" is the dark surface → ink
        navy: { DEFAULT: "#141414", 900: "#0B0B0B", 800: "#141414", 700: "#1F1F1F", 600: "#2A2A2A" },
        blue: { DEFAULT: "#1D4C9C", 700: "#163B7A", 500: "#1D4C9C", 300: "#7C9CCF", 100: "#E8EEF7" },
        glacier: "#AFC4E6",
        silver: { DEFAULT: "#BDBDB8", 300: "#DEDCD7", 200: "#EAE8E4" },
        mist: "#F1F0EE",
        ink: { DEFAULT: "#141414", soft: "#55534F", faint: "#86847F" },
        up: "#1E7A4C",
        down: "#B3382E",
      },
      fontFamily: {
        display: ['"Bodoni Moda"', "Didot", "Georgia", "serif"],
        sans: ['"Hanken Grotesk"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        deva: ['"Tiro Devanagari Hindi"', "serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(2.9rem, 6.4vw, 6rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-xl": ["clamp(2.4rem, 4.4vw, 4.2rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.9rem, 3.2vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.5rem, 2.2vw, 2rem)", { lineHeight: "1.18", letterSpacing: "-0.01em" }],
      },
      maxWidth: { prose: "64ch" },
      transitionTimingFunction: { refined: "cubic-bezier(.22,.7,.2,1)" },
      keyframes: {
        drift: { "0%": { transform: "translate(0,0)" }, "100%": { transform: "translate(0,0)" } },
      },
    },
  },
  plugins: [],
};

export default config;
