
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        limbus: {
          50: "#f8f9fe",
          100: "#e8eaf7",
          200: "#d5d9f0",
          300: "#b3b9e6",
          400: "#8c95d9",
          500: "#6670cc",
          600: "#4f55bf",
          700: "#4447ad",
          800: "#3a3c8d",
          900: "#33366d",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        foglia: {
          "0%": { transform: "rotate(0deg) translateX(0)" },
          "25%": { transform: "rotate(5deg) translateX(5px)" },
          "50%": { transform: "rotate(0deg) translateX(0)" },
          "75%": { transform: "rotate(-5deg) translateX(-5px)" },
          "100%": { transform: "rotate(0deg) translateX(0)" },
        },
        goccia: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        nebbia: {
          "0%": { filter: "blur(0px)" },
          "50%": { filter: "blur(1px)" },
          "100%": { filter: "blur(0px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        foglia: "foglia 8s ease-in-out infinite",
        goccia: "goccia 6s ease-in-out infinite",
        nebbia: "nebbia 10s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
