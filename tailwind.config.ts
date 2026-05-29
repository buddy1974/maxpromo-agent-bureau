import type { Config } from "tailwindcss";

/**
 * Hybrid design system — anchored to the maxpromo.digital visual language.
 * Dark premium base, single orange accent, monospace for system/`//` labels.
 * Tokens are intentionally few so the brand stays consistent and reviewable.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark premium surfaces (near-black, layered)
        ink: {
          950: "#08080a",
          900: "#0d0d10",
          850: "#121216",
          800: "#17171c",
          700: "#1f1f26",
          600: "#2a2a33",
        },
        // Single accent: Maxpromo orange
        accent: {
          DEFAULT: "#ff6a1a",
          hover: "#ff7d36",
          soft: "#ff6a1a14", // ~8% alpha for glows/fills
        },
        line: "#26262e", // hairline borders
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "1120px",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        ticker: "ticker 40s linear infinite",
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
