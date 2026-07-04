import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      colors: {
        accent: "#c8893a",
        bg: {
          DEFAULT: "#0a0a0f",
          panel: "#0d0d12",
          card: "#181818",
        },
      },
    },
  },
  plugins: [],
};

export default config;
