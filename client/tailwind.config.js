/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#139dba",
        secondary: "#141824",
        tertiary: "#8892b0",
        quaternary: "#a8b2d1",
        bg: "#0F111A",
        bgHover: "#1F2937",
      },
    },
  },
  plugins: [],
};
