import React from "react";
import type { PixelBaseProps } from "../types";
import { cn } from "../utils";

export interface PixelCalloutProps
  extends PixelBaseProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Callout type */
  type?: "info" | "success" | "warning" | "danger";
  /** Optional title */
  title?: string;
  /** Optional icon */
  icon?: React.ReactNode;
}

/**
 * PixelCallout - Highlighted content box for tips, warnings, and notes
 * 
 * Essential for drawing attention to important information in documentation.
 * Uses color coding with pixel styling for visual hierarchy.
 * 
 * @example
 * ```tsx
 * <PixelCallout type="warning" title="Important">
 *   Make sure to set your API key before making requests.
 * </PixelCallout>
 * ```
 */
export function PixelCallout({
  children,
  scale = "md",
  type = "info",
  title,
  icon,
  className,
  ...props
}: PixelCalloutProps) {
  const typeStyles = {
    info: {
      bg: "bg-accent/10",
      border: "border-accent/60",
      text: "text-accent",
    },
    success: {
      bg: "bg-success/10",
      border: "border-success/60",
      text: "text-success",
    },
    warning: {
      bg: "bg-warning/10",
      border: "border-warning/60",
      text: "text-warning",
    },
    danger: {
      bg: "bg-danger/10",
      border: "border-danger/60",
      text: "text-danger",
    },
  };

  const styles = typeStyles[type];

  const defaultIcons = {
    info: "ℹ",
    success: "✓",
    warning: "⚠",
    danger: "✕",
  };

  return (
    <div
      className={cn(
        "p-4 border",
        styles.bg,
        styles.border,
        "shadow-panel",
        className
      )}
      {...props}
    >
      <div className="flex gap-3">
        {(icon || defaultIcons[type]) && (
          <div className={cn("text-lg flex-shrink-0", styles.text)}>
            {icon || defaultIcons[type]}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <div className={cn("mb-2 font-mono text-sm font-semibold", styles.text)}>
              {title}
            </div>
          )}
          <div className="pixel-callout-body text-sm leading-relaxed pt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
