/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: '#E50914',
          black: '#141414',
          gray: '#2F2F2F',
          lightGray: '#B3B3B3'
        }
      },
      fontFamily: {
        'arabic': ['Cairo', 'Tajawal', 'sans-serif'],
      }
    },
  },
  plugins: [],
}