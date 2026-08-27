/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF5722',
          orangeLight: '#FFF0EC',
          orangeBorder: '#FFD5C8',
          dark: '#111827',
          grayBg: '#F8FAFC',
          sidebarBg: '#FFFFFF',
          cardBg: '#F3F4F6',
          highlightGreen: '#22C55E',
          highlightGreenBg: 'rgba(34, 197, 94, 0.12)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
