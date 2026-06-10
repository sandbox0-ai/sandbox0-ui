import React from "react";
import type { PixelScale, PixelBaseProps } from "../types";
import { cn, getPixelShadowClass } from "../utils";

export interface PixelButtonProps
  extends PixelBaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Visual emphasis of the button. */
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

/**
 * PixelButton - Interactive button with a tactile retro press effect.
 *
 * The primary variant keeps the arcade "press down" feel (an offset shadow
 * that collapses on :active). `secondary` is a quiet bordered action, `ghost`
 * is borderless inline, and `danger` is reserved for destructive operations.
 */
export function PixelButton({
  children,
  scale = "md",
  accent = true,
  variant = "primary",
  className,
  disabled,
  ...props
}: PixelButtonProps) {
  const variantClasses: Record<NonNullable<PixelButtonProps["variant"]>, string> = {
    primary: "bg-accent text-black font-semibold hover:bg-white hover:text-black",
    secondary:
      "bg-surface-2 text-foreground border border-line-strong hover:border-foreground/40 hover:bg-elevated",
    ghost: "bg-transparent text-muted hover:text-foreground hover:bg-surface-2",
    danger: "bg-danger/15 text-danger border border-danger/40 hover:bg-danger hover:text-black",
  };

  // Tactile press, only for the lifted primary block.
  const pressEffect: Record<PixelScale, string> = {
    sm: "active:translate-x-[1px] active:translate-y-[1px] active:shadow-none",
    md: "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    lg: "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
  };

  const paddingClasses: Record<PixelScale, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono tracking-wide",
        "transition-all duration-75",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0",
        variantClasses[variant],
        variant === "primary" && getPixelShadowClass(scale, accent),
        variant === "primary" && pressEffect[scale],
        paddingClasses[scale],
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
