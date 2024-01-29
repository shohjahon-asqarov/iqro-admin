/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#FA8B02',
        'green': '#289C8E',
        'blue': '#00A99E',
        'card-bg': '#F5F5F5'
      }
    },
  },
  plugins: [],
}