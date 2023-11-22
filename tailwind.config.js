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
        'playing': 'an-playing 0s ease 0s infinite',
        'move-txt': 'an-move-txt 3.5s infinite alternate linear',
      },
      keyframes: {
        'an-playing': {
          '0%, 100%': { height: '3px' },
          '50%': { height: '12px' },
        },
        'an-move-txt': {
          '0%': { marginLeft: '0',  transform: 'translate(0, 0)' },
          '100%': { marginLeft: '100%',  transform: 'translate(-100%, 0)' },
        },
      },
    },
  },
  plugins: [],
}
