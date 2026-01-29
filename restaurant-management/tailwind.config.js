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
        'spice-saffron': '#f59e0b',
        'spice-clay': '#b45309',
        'spice-forest': '#064e3b',
        'spice-cream': '#fffbeb',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'spice': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
