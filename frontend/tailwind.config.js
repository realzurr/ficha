/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'xamas': {
          50:  '#faf6f1',
          100: '#f0e6d6',
          200: '#e0ccac',
          300: '#cba876',
          400: '#b8894e',
          500: '#a07038',
          600: '#8a5c2e',
          700: '#704828',
          800: '#5c3b24',
          900: '#4d3221',
          950: '#2a1910',
        },
        'sage': {
          50:  '#f4f7f4',
          100: '#e3eae2',
          200: '#c8d6c5',
          300: '#a1b89d',
          400: '#7a9674',
          500: '#5a7a53',
          600: '#466141',
          700: '#394e36',
          800: '#2f402e',
          900: '#283527',
          950: '#131d14',
        },
        'sand': {
          50:  '#faf8f5',
          100: '#f3efe8',
          200: '#e6ddd0',
          300: '#d5c6b0',
          400: '#c3aa8d',
          500: '#b59473',
          600: '#a88163',
          700: '#8c6a53',
          800: '#735747',
          900: '#5f483c',
          950: '#32241f',
        },
        'earth': {
          50:  '#f7f5f3',
          100: '#ede8e3',
          200: '#dbd1c7',
          300: '#c4b5a5',
          400: '#ab9582',
          500: '#9a826d',
          600: '#8d7361',
          700: '#765f52',
          800: '#614f46',
          900: '#51423b',
          950: '#2a211e',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 40px -10px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 30px -5px rgba(160, 112, 56, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
