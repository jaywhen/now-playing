/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'playing': 'playing 0s ease 0s infinite'
      },
      keyframes: {
        'playing': {
          '0%, 100%': { height: '3px' },
          '50%': { height: '12px' },
        }
      },
    },
  },
  plugins: [],
}
