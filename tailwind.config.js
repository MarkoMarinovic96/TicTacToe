/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'game-background': 'url(./assets/Pozadina.webp)',
        'trophy-background':'url(./assets/Logo.webp)'
      }
    }
  },
  plugins: []
};
