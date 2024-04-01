/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6c60f2",
        secondary: "#f97f63",
        tertiary: "#8892b0",
        quaternary: "#a8b2d1",
        dark: "#272743",
        darkSecondary: "#353453",
        darkTertiary: "white",
        light: "#f9f8f6",
        lightSecondary: "#fffff",
        lightTertiary: "#353453",
        bg: "#111827",
        bgHover: "#1F2937",
      },
    },
  },
  plugins: [],
};
