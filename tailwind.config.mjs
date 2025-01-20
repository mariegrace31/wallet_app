/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wallet_red_100: "#DC2828",
        wallet_red_75:"#4F1313BF",
        wallet_red_50:"#4F131380",
        wallet_red_20: "#DC282833",
        wallet_red_10:"#DC28281A",
        wallet_black:"#220901",
        wallet_white:"#f6e8ea"
      },
    },
  },
  plugins: [],
};
