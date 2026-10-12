/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBrown: '#6B4F3A',
        goldAccent: '#363634',
        bgPaper: '#101010',
        textDark: '#333333',
        textLight: '#666666',
      },
    },
  },
  plugins: [],
}