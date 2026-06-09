import React from "react";
import type { PixelBaseProps } from "../types";
import { cn } from "../utils";

export interface PixelCardProps
  extends PixelBaseProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Card header content */
  header?: React.ReactNode;
  /** Card footer content */
  footer?: React.ReactNode;
  /** Whether the card is interactive (hoverable) */
  interactive?: boolean;
}

/**
 * PixelCard - A container component for grouping related content
 * 
 * Commonly used for dashboard widgets, feature showcases, and content cards.
 * Supports optional header and footer sections.
 * 
 * @example
 * ```tsx
 * <PixelCard 
 *   header={<h3>Sandbox Status</h3>}
 *   footer={<PixelButton>View Details</PixelButton>}
 *   interactive
 * >
 *   Your sandbox is running...
 * </PixelCard>
 * ```
 */
export function PixelCard({
  children,
  scale = "md",
  accent = false,
  header,
  footer,
  interactive = false,
  className,
  ...props
}: PixelCardProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-line flex flex-col shadow-panel",
        interactive && "cursor-pointer transition-all duration-150",
        interactive && "hover:border-line-strong hover:shadow-panel-hover",
        accent && "border-accent/40",
        className
      )}
      {...props}
    >
      {header && (
        <div className="px-4 py-3 border-b border-line text-eyebrow text-muted">
          {header}
        </div>
      )}
      <div className="p-4 flex-1">{children}</div>
      {footer && (
        <div className="px-4 py-3 border-t border-line">
          {footer}
        </div>
      )}
    </div>
  );
}
