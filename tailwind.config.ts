import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "brand-100": "#f6ebff",
        "brand-200": "#dabeff",
        "brand-300": "#bfb2ff",
        "brand-400": "#a39fff",
        "brand-500": "#6f3aff",
        "brand-600": "#5935e3",
        "brand-700": "#452fad",
        "brand-800": "#2f1e7a",
        "brand-900": "#1d1150",
      },
    },
  },
  plugins: [],
};
export default config;
