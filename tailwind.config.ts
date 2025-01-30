import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     colors:{
        darkBrown: "#262020", //Background and primary dark color
        beige: "#d8cfbc", //Text or light elements
        oliveGreen: "#8a9064", //Accent or hover effect
        deepBrown: "#292313" //secondary backgroud or borders
     }
    },
  },
  plugins: [],
} satisfies Config;
