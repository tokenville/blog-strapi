import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#007bff', // Adding a custom blue color
        'custom-red': '#dc3545',  // Adding a custom red color
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'], // Adding Roboto font to the sans-serif font family
      },
      spacing: {
        '80': '20rem',  // Adding a custom spacing utility
        '120': '30rem', // Adding another custom spacing utility
      },
      backgroundColor: {  // Define global background colors
        'primary': '#c0c0c0',  // Example primary background color
        'secondary': '#c0c0c0',  // Example secondary background color
      },
    },
  },
  plugins: [
    // You can add Tailwind CSS plugins here if needed
  ],
};

export default config;
