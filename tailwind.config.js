/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        slideIn: "slideIn 0.7s ease-in-out forwards",
      },
      fontSize: {
        "5lg": "56px",
      },
      width: {
        102: "25rem",
      },
      colors: {
        "da-blue": {
          20: "#F8FAFC",
          100: "#3787FF",
          200: "#024C95",
          500: "#002A54",
          600: "#000929",
        },
      },
      fontFamily: {
        Outfit: ["Outfit", "sans-serif"],
        Inter: ["Inter", "sans-serif"],

      },
    },
  },
  plugins: [],
};
