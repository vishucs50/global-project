/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        space: {
          950: "#030712",
          900: "#0b0f19",
          850: "#111827",
          800: "#161f36",
          700: "#1e293b",
          600: "#334155",
        },
        nasa: {
          blue: "#0b3d91",
          red: "#fc3d21",
          cyan: "#38bdf8",
          neonGreen: "#10b981",
          amber: "#f59e0b",
          purple: "#a855f7",
        },
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "monospace"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

