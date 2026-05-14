import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
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
        magenta: {
          DEFAULT: "hsl(var(--magenta))",
          foreground: "hsl(var(--magenta-foreground))",
        },
        yellow: {
          DEFAULT: "hsl(var(--yellow))",
          foreground: "hsl(var(--yellow-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
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
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scan": {
          "0%": { top: "0px" },
          "25%": { top: "56px" },
          "50%": { top: "0px" },
          "75%": { top: "56px" },
          "100%": { top: "0px" },
        },
        "cut": {
          "0%": { clipPath: "inset(0 0 0 0)" },
          "25%": { clipPath: "inset(100% 0 0 0)" },
          "50%": { clipPath: "inset(0 0 100% 0)" },
          "75%": { clipPath: "inset(0 0 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },
        "footer-marquee": {
          "from": { transform: "translateX(0)" },
          "to": { transform: "translateX(-50%)" },
        },
        "footer-breathe": {
          "0%": { transform: "translate(-50%,-50%) scale(1)", opacity: "0.5" },
          "100%": { transform: "translate(-50%,-50%) scale(1.12)", opacity: "0.9" },
        },
        "heartbeat": {
          "0%,100%": { transform: "scale(1)" },
          "20%,50%": { transform: "scale(1.25)" },
          "35%": { transform: "scale(1)" },
        },
        "testimonial-scroll": {
          "from": { transform: "translateY(0)" },
          "to": { transform: "translateY(-50%)" },
        },
        "marquee-vertical": {
          "from": { transform: "translateY(0)" },
          "to": { transform: "translateY(-100%)" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        "shimmer-slide": {
          "to": { transform: "translate(calc(100cqw - 100%), 0)" },
        },
        "spin-around": {
          "0%": { transform: "translateZ(0) rotate(0)" },
          "15%,35%": { transform: "translateZ(0) rotate(90deg)" },
          "65%,85%": { transform: "translateZ(0) rotate(270deg)" },
          "100%": { transform: "translateZ(0) rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "count-up": "count-up 0.4s ease-out forwards",
        "scan": "scan 2.2s cubic-bezier(0.175,0.885,0.32,1.275) infinite",
        "cut": "cut 2.2s cubic-bezier(0.175,0.885,0.32,1.275) infinite",
        "footer-marquee": "footer-marquee 38s linear infinite",
        "footer-breathe": "footer-breathe 7s ease-in-out infinite alternate",
        "heartbeat": "heartbeat 2s ease-in-out infinite",
        "testimonial-scroll": "testimonial-scroll 20s linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration, 20s) linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "shimmer-slide": "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed)*2) infinite linear",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
