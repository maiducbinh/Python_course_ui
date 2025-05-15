/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        lisa: {
          "primary": "#2563eb", // Blue 600
          "secondary": "#4b5563", // Gray 600
          "accent": "#0891b2", // Cyan 600
          "neutral": "#1f2937", // Gray 800
          "base-100": "#ffffff",
          "base-200": "#f3f4f6", // Gray 100
          "base-300": "#e5e7eb", // Gray 200
          "info": "#3b82f6", // Blue 500
          "success": "#10b981", // Emerald 500
          "warning": "#f59e0b", // Amber 500
          "error": "#ef4444", // Red 500
        },
      },
      "light",
      "dark",
      "winter"
    ],
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
  devServer: {
    https: true
  },
};
