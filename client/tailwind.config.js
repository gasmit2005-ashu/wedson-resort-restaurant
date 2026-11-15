/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#07120E',
          900: '#0D1F18',
          800: '#152E24',
          700: '#1D3E31',
          600: '#2A5846',
          100: '#E4ECE8',
          50: '#F2F6F4',
        },
        gold: {
          300: '#E8CF94',
          400: '#D8B878',
          500: '#C8A45D',
          600: '#B08C42',
          700: '#8A6A2B',
        },
        cream: {
          50: '#FDFCF9',
          100: '#F9F6F0',
          200: '#F2ECE0',
          300: '#E8DFCC',
        },
        charcoal: {
          900: '#111614',
          800: '#1B221F',
          700: '#27312C',
          600: '#3D4A44',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 50px -10px rgba(13, 31, 24, 0.15)',
        'gold-glow': '0 0 25px rgba(200, 164, 93, 0.35)',
      }
    },
  },
  plugins: [],
}
