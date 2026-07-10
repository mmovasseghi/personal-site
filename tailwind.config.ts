import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#06070B",
        deep: "#090B12",
        indigo: "#4338FF",
        cyan: "#00F5FF",
        mint: "#45FFB2",
        purple: "#7C4DFF",
        acid: "#C7FF3D",
        glass: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-vazir)", "var(--font-space)", "system-ui", "sans-serif"],
        body: ["var(--font-vazir)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        latin: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      animation: {
        "rgb-shift": "rgb-shift 4s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.5s ease-out infinite",
        orbit: "orbit 20s linear infinite",
      },
      keyframes: {
        "rgb-shift": {
          "0%, 100%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(120deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.6" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0.6" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
