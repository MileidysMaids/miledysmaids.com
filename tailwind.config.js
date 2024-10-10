/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [`./src/pages/**/*.{js,jsx,ts,tsx}`, `./src/components/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {
      // Custom Utilities for Clip-Path
      clipPath: {
        "half-oval": "ellipse(50% 100% at 50% 100%)",
        "bottom-oval": "ellipse(150% 95% at 50% 0%)",
        "bottom-oval-sm": "ellipse(250% 99% at 50% 0%)", // for small screens
        "top-oval": "ellipse(90% 100% at 50% 100%)",
        "top-oval-sm": "ellipse(200% 95% at 50% 100%)", // for small screens
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: {
          DEFAULT: "#17B2EA",
          dark: "#052031",
        },
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
      {
        autumn: {
          primary: "#f58900",
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
  plugins: [
    // Third Party Plugins
    require("daisyui"),
    require("tailwindcss-animate"),

    // Custom Plugins
    require("./plugins/clipPathPlugin"),
    require("./plugins/global.js"),
  ],
};
