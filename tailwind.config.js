/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      brightness: {},
      colors: {
        logo: "#152544",
        nav: "#E3F2FD",
        primary: "#080808",
      },
    },
  },
  plugins: [],
};
