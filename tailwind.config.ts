import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#081225",
        steel: "#1f3b5f",
        gold: "#f5b642"
      }
    }
  },
  plugins: []
};

export default config;
