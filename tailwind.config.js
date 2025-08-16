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
    },
  },
  plugins: [],
}