import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#F4F6F3",
          100: "#E5EBE3",
          200: "#CDD7CA",
          300: "#B5C4B1",
          400: "#9AB098",
          500: "#7F9C7F",
          600: "#667D66",
        },
        gold: {
          50: "#FBF7ED",
          100: "#F5ECD5",
          200: "#E8D5A8",
          300: "#D4BB7B",
          400: "#C4A455",
          500: "#B08A3A",
          600: "#8C6B2B",
        },
        rose: {
          50: "#F9F4F4",
          100: "#F0E4E4",
          200: "#E3CECE",
          300: "#D4B5B5",
          400: "#C49C9C",
          500: "#B08383",
          600: "#8C6666",
        },
        cream: {
          50: "#FEFDFB",
          100: "#FCFAF6",
          200: "#FAF7F2",
          300: "#F5F0E8",
          400: "#EDE6D9",
          500: "#E0D5C0",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans SC"',
          "sans-serif",
        ],
      },
      animation: {
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "phase-in": "phaseIn 0.3s ease-out",
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(196, 164, 85, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(196, 164, 85, 0)" },
        },
        phaseIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 4px rgba(196, 164, 85, 0.2)" },
          "50%": { boxShadow: "0 0 16px rgba(196, 164, 85, 0.5)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
