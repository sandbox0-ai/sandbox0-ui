import React from "react";
import { cn } from "../utils";

export interface PixelBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  /** Render a leading status dot in the variant color. */
  dot?: boolean;
}

/**
 * PixelBadge - Compact label for status, tags, and metadata.
 *
 * Uses a tinted background + colored text + hairline border so badges read as
 * quiet, professional status chips instead of loud solid blocks.
 *
 * @example
 * ```tsx
 * <PixelBadge variant="success" dot>running</PixelBadge>
 * <PixelBadge variant="accent">GET</PixelBadge>
 * ```
 */
export function PixelBadge({
  children,
  variant = "default",
  size = "sm",
  dot = false,
  className,
  ...props
}: PixelBadgeProps) {
  const variantClasses: Record<NonNullable<PixelBadgeProps["variant"]>, string> = {
    default: "bg-surface-2 text-muted border-line-strong",
    accent: "bg-accent/15 text-accent border-accent/35",
    success: "bg-success/15 text-success border-success/35",
    warning: "bg-warning/15 text-warning border-warning/35",
    danger: "bg-danger/15 text-danger border-danger/35",
    info: "bg-info/15 text-info border-info/35",
  };

  const dotClasses: Record<NonNullable<PixelBadgeProps["variant"]>, string> = {
    default: "bg-muted",
    accent: "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    info: "bg-info",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1.5",
    md: "px-3 py-1 text-sm gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-mono font-medium border align-middle",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn("h-1.5 w-1.5 shrink-0", dotClasses[variant])}
        />
      )}
      {children}
    </span>
  );
}
