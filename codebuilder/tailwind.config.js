/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Keep this (even if only dark)
  theme: {
    extend: {
      colors: {
        primary: '#00d4ff',
        dark: '#0a0a0a',
        card: '#111111',
      },
    },
  },
  plugins: [],
}