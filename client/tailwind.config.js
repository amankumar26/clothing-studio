/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FDFCF6', // Ultra light cream like screenshot
          nude: '#F5F2ED',
          terracotta: '#C8956C',
          burgundy: '#5B1A1E', // Deep maroon like reference
          moss: '#7D8471', // Muted green like screenshot
          dark: '#5B1A1E', // Replaced black with burgundy globally
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'], // Cleaner sans for screenshot look
      },
    },
  },
  plugins: [],
}
