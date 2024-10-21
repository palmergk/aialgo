/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange": "#E96E28",
        "semi-white": "#e0dfdf",
        "ground": "#94A3B8",
        "light": "#7665D5",
        "admin": "#0E0B1C",
        "admin-btn": "#312b57",
        "admin-auth": "#36225e",
        "admin-page": "#462c7c"
      },
      boxShadow: {
        "sign": "0px 1px 10px rgb(223, 222, 222)",
        "log": "0px 1px 10px #090611",
        "log2": "0px 3px 10px #1a0d53",
        "log3": "0px 2px 10px #1e1335",
      },
    },
  },
  plugins: [],
}
