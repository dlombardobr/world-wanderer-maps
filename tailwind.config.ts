
import { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animatePlugin from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

const shadcnPlugin = plugin(
  ({ addBase }) => {
    addBase({
      ":root": {
        "--background": "0 0% 100%",
        "--foreground": "224 71.4% 4.1%",
        "--card": "0 0% 100%",
        "--card-foreground": "224 71.4% 4.1%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "224 71.4% 4.1%",
        "--primary": "262.1 83.3% 57.8%",
        "--primary-foreground": "210 20% 98%",
        "--secondary": "220 14.3% 95.9%",
        "--secondary-foreground": "220.9 39.3% 11%",
        "--muted": "220 14.3% 95.9%",
        "--muted-foreground": "220 8.9% 46.1%",
        "--accent": "220 14.3% 95.9%",
        "--accent-foreground": "220.9 39.3% 11%",
        "--destructive": "0 84.2% 60.2%",
        "--destructive-foreground": "210 20% 98%",
        "--border": "220 13% 91%",
        "--input": "220 13% 91%",
        "--ring": "262.1 83.3% 57.8%",
        "--radius": "0.5rem",
      },
      ".dark": {
        "--background": "224 71.4% 4.1%",
        "--foreground": "210 20% 98%",
        "--card": "224 71.4% 4.1%",
        "--card-foreground": "210 20% 98%",
        "--popover": "224 71.4% 4.1%",
        "--popover-foreground": "210 20% 98%",
        "--primary": "263.4 70% 50.4%",
        "--primary-foreground": "210 20% 98%",
        "--secondary": "215 27.9% 16.9%",
        "--secondary-foreground": "210 20% 98%",
        "--muted": "215 27.9% 16.9%",
        "--muted-foreground": "217.9 10.6% 64.9%",
        "--accent": "215 27.9% 16.9%",
        "--accent-foreground": "210 20% 98%",
        "--destructive": "0 62.8% 30.6%",
        "--destructive-foreground": "210 20% 98%",
        "--border": "215 27.9% 16.9%",
        "--input": "215 27.9% 16.9%",
        "--ring": "263.4 70% 50.4%",
      },
    });

    addBase({
      "*": {
        "@apply border-border": {},
      },
      body: {
        "@apply bg-background text-foreground": {},
      },
    });
  },
  {
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          marine: "#01172F",
          "route-direct": "#00A0DC",
          "route-indirect": "#FFCC33",
          "route-hub": "#00A0DC",
          // New color palette from the image
          "navy-dark": "#001428",
          "teal-dark": "#00719C",
          "teal-medium": "#00A77F",
          "blue-medium": "#00A0DC",
          "blue-light": "#C5E5F2",
          "yellow": "#FFCC33",
        },
        fontFamily: {
          sans: ["var(--font-sans)", ...fontFamily.sans],
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
          "fade-in": {
            from: { opacity: "0" },
            to: { opacity: "1" },
          },
          "zoom-fade-in": {
            from: { opacity: "0", transform: "scale(0.95)" },
            to: { opacity: "1", transform: "scale(1)" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "fade-in": "fade-in 1s ease-out",
          "zoom-fade-in": "zoom-fade-in 0.5s ease-out",
        },
        boxShadow: {
          "glow-sm": "0 0 8px rgba(255, 255, 255, 0.4)",
          "glow-md": "0 0 12px rgba(255, 255, 255, 0.6)",
          "glow-lg": "0 0 16px rgba(255, 255, 255, 0.8)",
          "glow-xl": "0 0 24px rgba(255, 255, 255, 1)",
        },
      },
    },
  }
);

const config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  plugins: [animatePlugin, shadcnPlugin],
} satisfies Config;

export default config;
