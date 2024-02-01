/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#146EB4",
        secondary: "#1E2640",
        "primaryBG":"#FAFAFA",
        "black/30": "#4D4D4D",
        "black/50": "#808080",
        "black/60": "#999999",
        "black/85": "#D9D9D9",
        "black/95": "#F2F2F2",
      },
    },
  },
  plugins: [],
};
