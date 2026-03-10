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
        forest: {
          50: "#f0f7f4",
          100: "#dceee5",
          200: "#b9dccc",
          300: "#8ec3a8",
          400: "#5fa482",
          500: "#3d8763",
          600: "#2d6b4f",
          700: "#255540",
          800: "#1e4433",
          900: "#19392b",
          950: "#0d2019",
        },
        gold: {
          50: "#fdf8ec",
          100: "#f9edd0",
          200: "#f2d89d",
          300: "#ebbe62",
          400: "#e5a535",
          500: "#d4891c",
          600: "#bc6a14",
          700: "#9a4d14",
          800: "#7e3d17",
          900: "#6b3418",
          950: "#3d1a09",
        },
        ivory: {
          50: "#fdfaf3",
          100: "#f9f3e3",
          200: "#f2e5c5",
          300: "#e8d09e",
          400: "#dab873",
          500: "#cfa04f",
          600: "#c08840",
          700: "#9f6d35",
          800: "#82582f",
          900: "#6b4828",
          950: "#3a2413",
        },
        rose: {
          dusty: "#c4788a",
          deep: "#8b3a52",
          light: "#f0d0d8",
        },
        cream: "#f9f5ee",
      },
      fontFamily: {
        hindi: ["Tiro Devanagari Hindi", "serif"],
        serif: ["EB Garamond", "Georgia", "serif"],
        display: ["Playfair Display", "serif"],
      },
      animation: {
        "float-up": "floatUp 1.2s ease-out forwards",
        "petal-fall": "petalFall 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "heart-burst": "heartBurst 0.6s ease-out forwards",
        "lotus-bloom": "lotusBloom 1s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-120px) scale(2)", opacity: "0" },
        },
        petalFall: {
          "0%": { transform: "translateY(-20px) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.7" },
          "90%": { opacity: "0.3" },
          "100%": { transform: "translateY(110vh) rotate(360deg)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        heartBurst: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "50%": { transform: "scale(1.4)", opacity: "1" },
          "100%": { transform: "scale(1.1)", opacity: "0" },
        },
        lotusBloom: {
          "0%": { transform: "scale(0) rotate(-180deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { filter: "drop-shadow(0 0 8px rgba(212,137,28,0.4))" },
          "50%": { filter: "drop-shadow(0 0 18px rgba(212,137,28,0.8))" },
        },
      },
      backgroundImage: {
        "forest-gradient": "linear-gradient(135deg, #0d2019 0%, #19392b 50%, #1e4433 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent 0%, rgba(212,137,28,0.3) 50%, transparent 100%)",
        "card-gradient": "linear-gradient(145deg, rgba(30,68,51,0.9) 0%, rgba(13,32,25,0.95) 100%)",
        "pichwai-border": "linear-gradient(90deg, #d4891c, #e5a535, #f2d89d, #e5a535, #d4891c)",
      },
    },
  },
  plugins: [],
};

export default config;
