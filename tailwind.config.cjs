/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      primary: '#2524d1',
      secondary: '#d7dfdc',
      font: '#999999',
      hover: '#edefef',
      gray: {
        100: '#f4f4f4',
        200: '#dadada',
      },
      trasparent: 'transparent',
    },
    extend: {
      keyframes: {
        highlight: {
          '10%': {
            background: '#2524d1',
            color: '#FFFFFF',
          },
          '40%': {
            background: '#2524d1',
            color: '#FFFFFF',
          },
        },
      }
    },
  },
  variants: {
    extend: {
      lineClamp: ['hover', 'focus'],
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
  ],
};
