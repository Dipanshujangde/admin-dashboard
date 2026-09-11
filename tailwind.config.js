/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0F1720',
          900: '#151F2B',
          800: '#1E2A38',
          700: '#2A3947',
          600: '#3B4E5F',
        },
        brass: {
          400: '#D8A857',
          500: '#C79544',
          600: '#AD7E36',
        },
        sage: {
          400: '#6FA98A',
          500: '#4F8E6E',
          600: '#3D7259',
        },
        rust: {
          400: '#C9694F',
          500: '#B4543C',
          600: '#98432F',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
