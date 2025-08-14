// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#001324',
        primary: {
          blue: '#2D2DF1',
          green: '#17CAC6',
        },
      },
    },
  },
  plugins: [],
};
