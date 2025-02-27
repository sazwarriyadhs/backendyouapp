/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D1D1D',
        secondary: '#162329',
        accent: '#94783E',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B1B1B1',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(180deg, #1F4247 0%, #0D1D23 100%)',
      },
    },
  },
  plugins: [],
}