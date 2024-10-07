/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [`./src/pages/**/*.{js,jsx,ts,tsx}`, `./src/components/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        secondary: {
          DEFAULT: "#052031",
          foreground: "#FFFFFF",
        },
      },
      // colors: {
      //   background: "hsl(var(--background))",
      //   foreground: "hsl(var(--foreground))",
      //   card: {
      //     DEFAULT: "hsl(var(--card))",
      //     foreground: "hsl(var(--card-foreground))",
      //   },
      //   popover: {
      //     DEFAULT: "hsl(var(--popover))",
      //     foreground: "hsl(var(--popover-foreground))",
      //   },
      //   primary: {
      //     DEFAULT: "hsl(var(--primary))",
      //     foreground: "hsl(var(--primary-foreground))",
      //   },
      //   secondary: {
      //     DEFAULT: "hsl(var(--secondary))",
      //     foreground: "hsl(var(--secondary-foreground))",
      //   },
      //   muted: {
      //     DEFAULT: "hsl(var(--muted))",
      //     foreground: "hsl(var(--muted-foreground))",
      //   },
      //   accent: {
      //     DEFAULT: "hsl(var(--accent))",
      //     foreground: "hsl(var(--accent-foreground))",
      //   },
      //   destructive: {
      //     DEFAULT: "hsl(var(--destructive))",
      //     foreground: "hsl(var(--destructive-foreground))",
      //   },
      //   border: "hsl(var(--border))",
      //   input: "hsl(var(--input))",
      //   ring: "hsl(var(--ring))",
      //   chart: {
      //     1: "hsl(var(--chart-1))",
      //     2: "hsl(var(--chart-2))",
      //     3: "hsl(var(--chart-3))",
      //     4: "hsl(var(--chart-4))",
      //     5: "hsl(var(--chart-5))",
      //   },
      // },
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
    ],
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
};
