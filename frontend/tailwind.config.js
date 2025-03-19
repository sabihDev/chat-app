/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure paths are correct
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["valentine", "cupcake", "dark", "aqua"], // Ensure themes are listed
  },
};
