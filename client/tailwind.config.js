/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#69AA63",
        primaryHover: "#3D6F3A",
        secondary: "#666866",
        stroke: "#8a8888",
        background: "#051104",
      },
      fontFamily: {
        sans: ["Poppins", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [require("flowbite/plugin")],
};
