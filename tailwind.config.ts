import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: "var(--color-surface)",
        panel: "var(--color-panel)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        ok: "#1f9d5a",
        warn: "#d8a100",
        risk: "#d14040"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(22, 63, 76, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
