/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#060709',
          900: '#0d0f14',
          800: '#161922',
          700: '#212634',
        },
        crimson: {
          500: '#ff334b',
          600: '#e61e38',
          700: '#b80d25',
          800: '#850516',
        },
        gold: {
          300: '#f7d794',
          400: '#f3c669',
          500: '#e5b869',
          600: '#c29647',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-crimson': '0 0 25px rgba(230, 30, 56, 0.35)',
        'glow-gold': '0 0 25px rgba(229, 184, 105, 0.3)',
        '3d-depth': '0 20px 40px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.1)',
      }
    },
  },
  plugins: [],
}
