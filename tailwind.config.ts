import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue?: string }) => {
    if (opacityValue !== undefined) {
      return `color-mix(in srgb, var(${variableName}) calc(${opacityValue} * 100%), transparent)`;
    }
    return `var(${variableName})`;
  };
}

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "clamp(1rem, 3vw, 2rem)",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: withOpacity("--line"),
        input: withOpacity("--line"),
        ring: withOpacity("--acc"),
        background: withOpacity("--bg"),
        foreground: withOpacity("--ink"),
        primary: {
          DEFAULT: withOpacity("--acc"),
          foreground: withOpacity("--bg"),
        },
        secondary: {
          DEFAULT: withOpacity("--line"),
          foreground: withOpacity("--ink"),
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84.2% 60.2%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 98%))",
        },
        muted: {
          DEFAULT: withOpacity("--line"),
          foreground: withOpacity("--mute"),
        },
        accent: {
          DEFAULT: withOpacity("--acc"),
          foreground: withOpacity("--bg"),
        },
        popover: {
          DEFAULT: withOpacity("--bg"),
          foreground: withOpacity("--ink"),
        },
        card: {
          DEFAULT: withOpacity("--bg"),
          foreground: withOpacity("--ink"),
        },
        // Direct palette tokens (e.g. text-ink, bg-bg, text-acc, border-line, text-mute)
        bg: withOpacity("--bg"),
        ink: withOpacity("--ink"),
        mute: withOpacity("--mute"),
        line: withOpacity("--line"),
        acc: withOpacity("--acc"),
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(4rem, 15vw, 12rem)',
        'section': 'clamp(3rem, 10vw, 8rem)',
        'large': 'clamp(2rem, 5vw, 4rem)',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'tighter': '-0.04em',
      },
      lineHeight: {
        'none': '0.85',
        'tight': '0.9',
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
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
