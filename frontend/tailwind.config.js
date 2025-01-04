/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx, html}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'full': '0 0 10px 1px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}

