/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'indian-red': '#B22222',
        'indian-gold': '#FFD700',
        'saffron': '#FF9933',
        'deep-orange': '#FF6600',
        'royal-blue': '#4169E1',
        'maharaja-red': '#8B0000',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
      },
      fontSize: {
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'bounce-in': 'bounceIn 1s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      backdropBlur: {
        '20': '20px',
      }
    },
  },
  plugins: [],
}