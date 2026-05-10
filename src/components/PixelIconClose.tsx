import React from "react";
import { cn } from "../utils";

export interface PixelIconCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Additional class names for the button wrapper */
  className?: string;
  /** Icon size in pixels (applied to the SVG). Defaults to 10. */
  size?: number;
}

/**
 * PixelIconClose — A pixel-art × close button.
 *
 * The icon is built exclusively from SVG <rect> elements so it stays
 * perfectly crisp at any DPI and consistent with the broader pixel aesthetic.
 * The button wrapper has no background by default so it can be placed on any
 * surface; hover/focus states use the foreground color.
 *
 * @example
 * ```tsx
 * <PixelIconClose onClick={onClose} aria-label="Close dialog" />
 * ```
 */
export function PixelIconClose({ className, size = 10, ...props }: PixelIconCloseProps) {
  return (
    <button
      type="button"
      aria-label={props["aria-label"] ?? "Close"}
      className={cn(
        "inline-flex items-center justify-center p-1.5",
        "text-muted hover:text-foreground",
        "transition-colors duration-75",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      {...props}
    >
      {/* 10×10 pixel-art × glyph */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 10 10"
        shapeRendering="crispEdges"
        fill="currentColor"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="2" height="2" />
        <rect x="8" y="0" width="2" height="2" />
        <rect x="2" y="2" width="2" height="2" />
        <rect x="6" y="2" width="2" height="2" />
        <rect x="4" y="4" width="2" height="2" />
        <rect x="2" y="6" width="2" height="2" />
        <rect x="6" y="6" width="2" height="2" />
        <rect x="0" y="8" width="2" height="2" />
        <rect x="8" y="8" width="2" height="2" />
      </svg>
    </button>
  );
}
