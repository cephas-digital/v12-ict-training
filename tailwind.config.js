/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "5lg": "56px",
      },
      colors: {
        "da-blue": {
          20: "#F8FAFC",
          100: "#3787FF",
          200: "#024C95",
          500: "#002A54",
        },
      },
    },
  },
  plugins: [],
};
