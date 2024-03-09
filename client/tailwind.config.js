/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#139dba",
        secondary: "#f97f63",
        tertiary: "#8892b0",
        quaternary: "#a8b2d1",
        bg: "#111827",
        bgHover:"#1F2937"
      },
    },
  },
  plugins: [],
};
