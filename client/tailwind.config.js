/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf3f3',
          100: '#fbe4e4',
          200: '#f7cdcd',
          300: '#f1a8a8',
          400: '#e57777',
          500: '#d44e4e', // Elegant Royal Crimson/Maroon
          600: '#be3939',
          700: '#9f2d2d',
          800: '#842828',
          900: '#6e2525',
          950: '#3c1010',
        },
        gold: {
          50: '#fbfaf3',
          100: '#f6f3e0',
          200: '#ece5be',
          300: '#ded090',
          400: '#cdb65e', // Elegant Antique Gold
          500: '#ba9a3c',
          600: '#a18030',
          700: '#816226',
          800: '#684e22',
          900: '#56411f',
          950: '#31230e',
        },
        royal: {
          50: '#f0f9fa',
          100: '#d9f0f2',
          200: '#b8e1e5',
          300: '#89ccd3',
          400: '#53adb7', // Peacock Teal
          500: '#39919b',
          600: '#327781',
          700: '#2e626b',
          800: '#2c525a',
          900: '#29464d',
          950: '#172e33',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2.5s infinite linear',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
