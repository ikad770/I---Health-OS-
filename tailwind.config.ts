import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: {
          dark: "#06080f",
          light: "#f4f7ff",
          neon: "#00b4ff"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 180, 255, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
