import type { Config } from "tailwindcss";

/**
 * Sandbox0 UI Tailwind preset.
 *
 * Design language: a crafted, legible "retro console" look. We keep the
 * square-cornered, terminal-flavored identity (pixel display font, monospace
 * data, hairline borders on a near-black canvas) but layer in a real type and
 * elevation scale so dense product surfaces stay readable and professional.
 *
 * All colors resolve through CSS variables declared in `globals.css`, so the
 * accent and surfaces can be themed at runtime without rebuilding.
 */
const sandbox0UIPreset = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background-rgb) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground-rgb) / <alpha-value>)",
        accent: "rgb(var(--color-accent-rgb) / <alpha-value>)",
        primary: "rgb(var(--color-accent-rgb) / <alpha-value>)",
        // Layered dark surfaces (base canvas -> raised panel -> popover).
        surface: "rgb(var(--color-surface-rgb) / <alpha-value>)",
        "surface-2": "rgb(var(--color-surface-2-rgb) / <alpha-value>)",
        elevated: "rgb(var(--color-elevated-rgb) / <alpha-value>)",
        // Text + lines.
        muted: "rgb(var(--color-muted-rgb) / <alpha-value>)",
        line: "rgb(var(--color-line-rgb) / <alpha-value>)",
        "line-strong": "rgb(var(--color-line-strong-rgb) / <alpha-value>)",
        // Semantic status colors (shared by badges, pills, charts, notices).
        success: "rgb(var(--color-success-rgb) / <alpha-value>)",
        warning: "rgb(var(--color-warning-rgb) / <alpha-value>)",
        danger: "rgb(var(--color-danger-rgb) / <alpha-value>)",
        info: "rgb(var(--color-info-rgb) / <alpha-value>)",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      fontSize: {
        // Legible floor for the pixel display font. Below ~12px "Press Start 2P"
        // becomes noise, so product labels use mono/Inter instead.
        "pixel-sm": ["0.75rem", { lineHeight: "1.6", letterSpacing: "0.02em" }],
        "pixel-md": ["0.9375rem", { lineHeight: "1.6", letterSpacing: "0.01em" }],
        "pixel-lg": ["1.25rem", { lineHeight: "1.5" }],
        // Eyebrow / overline label used across the console.
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.14em" }],
      },
      boxShadow: {
        // Crafted "lifted block" shadows: a hairline highlight on top edges and
        // a soft drop below. Reads as a tactile panel without the harsh
        // 3px offset blocks the old design used everywhere.
        panel: "0 1px 0 0 rgb(255 255 255 / 0.05) inset, 0 2px 8px 0 rgb(0 0 0 / 0.45)",
        "panel-hover":
          "0 1px 0 0 rgb(255 255 255 / 0.08) inset, 0 6px 18px 0 rgb(0 0 0 / 0.55)",
        popover: "0 8px 28px 0 rgb(0 0 0 / 0.6)",
        // Retro offset blocks, kept for buttons / accents where the tactile
        // arcade press still belongs.
        "pixel-sm": "1px 1px 0 0 rgba(0,0,0,0.65)",
        "pixel-sm-accent": "1px 1px 0 0 rgb(var(--color-accent-rgb) / 0.85)",
        "pixel-md": [
          "-1px 0 0 0 rgba(255,255,255,0.28)",
          "1px 0 0 0 rgba(255,255,255,0.28)",
          "0 -1px 0 0 rgba(255,255,255,0.28)",
          "0 1px 0 0 rgba(255,255,255,0.28)",
          "3px 3px 0 0 rgba(0,0,0,0.65)",
        ].join(", "),
        "pixel-md-accent": [
          "-1px 0 0 0 rgba(255,255,255,0.28)",
          "1px 0 0 0 rgba(255,255,255,0.28)",
          "0 -1px 0 0 rgba(255,255,255,0.28)",
          "0 1px 0 0 rgba(255,255,255,0.28)",
          "3px 3px 0 0 rgb(var(--color-accent-rgb) / 0.85)",
        ].join(", "),
        "pixel-md-inset": [
          "inset -1px 0 0 0 rgba(255,255,255,0.22)",
          "inset 1px 0 0 0 rgba(255,255,255,0.22)",
          "inset 0 -1px 0 0 rgba(255,255,255,0.22)",
          "inset 0 1px 0 0 rgba(255,255,255,0.22)",
        ].join(", "),
        "pixel-lg": [
          "-2px 0 0 0 rgba(255,255,255,0.28)",
          "2px 0 0 0 rgba(255,255,255,0.28)",
          "0 -2px 0 0 rgba(255,255,255,0.28)",
          "0 2px 0 0 rgba(255,255,255,0.28)",
          "4px 4px 0 0 rgba(0,0,0,0.65)",
        ].join(", "),
        "pixel-lg-accent": [
          "-2px 0 0 0 rgba(255,255,255,0.28)",
          "2px 0 0 0 rgba(255,255,255,0.28)",
          "0 -2px 0 0 rgba(255,255,255,0.28)",
          "0 2px 0 0 rgba(255,255,255,0.28)",
          "4px 4px 0 0 rgb(var(--color-accent-rgb) / 0.85)",
        ].join(", "),
      },
      borderRadius: {
        none: "0",
      },
      animation: {
        "pixel-pulse": "pixel-pulse 1s steps(2) infinite",
        "pixel-blink": "pixel-blink 0.5s steps(1) infinite",
        "fade-in": "fade-in 0.2s ease-out",
      },
      keyframes: {
        "pixel-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "pixel-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Partial<Config>;

export default sandbox0UIPreset;
