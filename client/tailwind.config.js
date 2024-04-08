/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e1e35",
        secondary: "#141824",
        tertiary: "#8892b0",
        quaternary: "#a8b2d1",
        darkPrimary: "#272743",
        darkSecondary: "#efebff",
        darkThird: "#353453",
        darkText: "#ffffff",
        lightPrimary: "#f9f8f6",
        lightSecondary: "#9086f7",
        lightThird: "#8a8aa6",
        light: "#f9f8f6",
        lightTertiary: "#353453",
        bg: "#111827",
        bgHover: "#1F2937",
      },
    },
  },
  plugins: [],
};
