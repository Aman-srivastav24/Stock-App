/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 0px 20px 0px rgba(134, 122, 210, 1)',
      }
    },
  },
  plugins: [],
}