/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'south-teal': '#0f766e',
        'south-green': '#22c55e',
      }
    },
  },
  plugins: [],
}
