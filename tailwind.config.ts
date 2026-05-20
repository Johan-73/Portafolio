import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // Phosphor palette
        ink: "#0A0A0F",
        violet: { DEFAULT: "#A78BFA", 700: "#7C3AED" },
        cyan: "#06D6FF",
        phosphor: "#10F0A6",
        danger: "#FF6B6B",
        // shadcn semantic tokens mapped to Phosphor
        border: "rgba(255,255,255,0.08)",
        input: "rgba(255,255,255,0.04)",
        ring: "#A78BFA",
        background: "#0A0A0F",
        foreground: "#E5E7EB",
        primary: { DEFAULT: "#A78BFA", foreground: "#0A0A0F" },
        secondary: { DEFAULT: "#06D6FF", foreground: "#0A0A0F" },
        destructive: { DEFAULT: "#FF6B6B", foreground: "#0A0A0F" },
        muted: { DEFAULT: "rgba(255,255,255,0.06)", foreground: "rgba(229,231,235,0.6)" },
        accent: { DEFAULT: "#A78BFA", foreground: "#0A0A0F" },
        popover: { DEFAULT: "#0A0A0F", foreground: "#E5E7EB" },
        card: { DEFAULT: "rgba(255,255,255,0.04)", foreground: "#E5E7EB" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "monospace"],
      },
      borderRadius: { lg: "0.5rem", md: "0.375rem", sm: "0.25rem" },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "blink-caret": { "0%, 50%": { opacity: "1" }, "51%, 100%": { opacity: "0" } },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "blink-caret": "blink-caret 0.8s steps(1, end) infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
