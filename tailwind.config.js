export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gray: {
          950: '#0a0a0f',
          900: '#121218',
          800: '#1f1f2c',
          700: '#2e2e3d',
          600: '#494957',
          500: '#6b6b7b',
          400: '#9c9cad',
          300: '#cfcfdd',
          200: '#e5e5ef',
          100: '#f2f2f7',
          50: '#f9f9fb',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}