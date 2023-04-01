/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora"],
        abel: ["Abel", "sans-serif"],
      },
    },
    animationDuration: {
      "2s": "4s",
    },
  },
  plugins: [
    // ...
  ],
};
