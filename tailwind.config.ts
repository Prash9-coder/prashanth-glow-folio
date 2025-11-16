import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
    "./client/src/components/**/*.{js,ts,jsx,tsx}",
    "./client/src/pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
