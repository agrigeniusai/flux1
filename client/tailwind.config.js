/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        flux: {
          low: '#00e400',
          mid: '#ffff00',
          high: '#ff0000'
        },
        brand: {
          50: '#f0fdf4',
          900: '#14532d'
        }
      }
    }
  },
  plugins: []
}; 