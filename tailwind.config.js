/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gut: {
          bg: "#F7FCFB",
          surface: "#E3F7F2",
          mint: "#1FBFA8",
          ocean: "#3BB8F0",
          peach: "#FF8A5B",
          sun: "#FFD166",
          coral: "#FF6F91",
          danger: "#EF4B5F",
          dark: "#12343B",
          muted: "#5B7B80"
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', '"Nunito"', 'sans-serif'],
        heading: ['"Be Vietnam Pro"', 'sans-serif']
      },
      borderRadius: {
        'card': '28px'
      },
      boxShadow: {
        'mint-glow': '0 20px 60px rgba(31, 191, 168, 0.18)',
        'ocean-glow': '0 20px 60px rgba(59, 184, 240, 0.18)',
        'warm-glow': '0 20px 60px rgba(255, 138, 91, 0.18)'
      }
    },
  },
  plugins: [],
}
