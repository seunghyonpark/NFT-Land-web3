/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    fontFamily: {
      sans: ['"PT Sans"', 'sans-serif']
    },
    
   /*
    fontFamily: {
      sans: [
        '"Segoe UI"',
        'Roboto',
        'sans-serif',
      ],
    },
    */

    extend: {
      colors: {
        'regal-red': 'rgb(234,51,133)',
      },
    },
  },
  plugins: [],
}