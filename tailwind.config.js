/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pearl: '#F8F4EE',
        sand: '#E8D9C8',
        mocha: '#B58D70',
        cocoa: '#674A3A',
        espresso: '#27231F',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        arabic: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
