import React from "react";
import { cn } from "../utils";

export interface PanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Optional section title rendered in the header bar. */
  title?: React.ReactNode;
  /** Optional supporting text under the title. */
  description?: React.ReactNode;
  /** Trailing actions (buttons, filters) shown in the header bar. */
  actions?: React.ReactNode;
  /** Remove body padding (e.g. for full-bleed tables). */
  flush?: boolean;
  children: React.ReactNode;
}

/**
 * Panel - The primary content container for console surfaces.
 *
 * A raised dark surface with a hairline border, a soft drop shadow, and an
 * optional header bar carrying a legible monospace section label plus actions.
 * Replaces the old 8px pixel-font panel headers.
 */
export function Panel({
  title,
  description,
  actions,
  flush = false,
  className,
  children,
  ...props
}: PanelProps) {
  return (
    <section
      className={cn("border border-line bg-surface shadow-panel", className)}
      {...props}
    >
      {(title || actions) && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="min-w-0">
            {title && (
              <h2 className="text-eyebrow text-foreground/90">{title}</h2>
            )}
            {description && (
              <p className="mt-1 text-xs text-muted">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
          )}
        </header>
      )}
      <div className={cn(!flush && "p-4")}>{children}</div>
    </section>
  );
}
