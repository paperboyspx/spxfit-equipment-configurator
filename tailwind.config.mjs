import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: "430px" }, // Custom screen size for 430px and below
        laptop: { max: "1800px" }, // Custom desktop size for 1920px and below
        macbook: { max: "1600px" }, // Custom desktop size for 1600px and below
      },
      scale: {
        175: "1.75",
        200: "2",
        215: "2.05",
        250: "2.5",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
