/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        silkRed: '#C41E3A',
        silkRedDark: '#A01828',
        charcoal: '#2B2B2B',
        pureWhite: '#FFFFFF',
        offWhite: '#F5F5F7',
        lightGray: '#E5E5E7',
        deepBlack: '#1D1D1F',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};