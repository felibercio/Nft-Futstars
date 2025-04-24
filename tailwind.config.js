/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#1F2937",
      },
      keyframes: {
        'progress-25': {
          '0%': { width: '0%' },
          '100%': { width: '25%' }
        },
        'progress-45': {
          '0%': { width: '0%' },
          '100%': { width: '45%' }
        },
        'progress-75': {
          '0%': { width: '0%' },
          '100%': { width: '75%' }
        }
      },
      animation: {
        'progress-25': 'progress-25 1.5s ease-out forwards',
        'progress-45': 'progress-45 1.5s ease-out forwards',
        'progress-75': 'progress-75 1.5s ease-out forwards'
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    function({ addUtilities }) {
      addUtilities({
        '.perspective-1000': {
          perspective: '1000px'
        },
        '.preserve-3d': {
          transformStyle: 'preserve-3d'
        },
        '.transform-gpu': {
          transform: 'translate3d(0, 0, 0)'
        }
      });
    }
  ],
} 