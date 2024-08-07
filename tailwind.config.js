/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./src/pages/**/*.{js,jsx,ts,tsx}`, `./src/components/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        cake: {
          primary: "#17B2EA",
          "primary-content": "#FFFFFF",
          secondary: "#052031",
          "secondary-content": "#ffffff",
          accent: "#f58900",
          "accent-content": "#ffffff",
          neutral: "#C4E9DE",
          "neutral-content": "#052031",
          "base-100": "#F9FcFc",
          "base-200": "#e6e9e9",
          "base-300": "#d4d7d7",
          "base-content": "#052031",
          info: "#85C1E9",
          "info-content": "#052031",
          success: "#A3E4D7",
          "success-content": "#052031",
          warning: "#F9E79F",
          "warning-content": "#052031",
          error: "#F1948A",
          "error-content": "#052031",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
