/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Merriweather", "serif"],
      },
      colors: {
        yellow: {
          600: "#d6a000",
          700: "#b38600",
          800: "#8a6800",
        },
      },
    },
  },
  plugins: [],
}

