import React from "react";
import { cn } from "../utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  /** Small accent overline above the title (e.g. product name). */
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  /** Trailing primary/secondary actions. */
  actions?: React.ReactNode;
  className?: string;
}

/**
 * PageHeader - Standard heading block for a dashboard screen.
 *
 * Renders breadcrumbs, an accent eyebrow, a legible pixel-display title, and a
 * muted subtitle, with room for trailing actions. Shared by every console
 * screen so headings stay consistent across products.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5",
        className,
      )}
    >
      <div className="min-w-0">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs text-muted"
          >
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <React.Fragment key={`${item.label}-${index}`}>
                  {item.href && !isLast ? (
                    <a href={item.href} className="transition-colors hover:text-foreground">
                      {item.label}
                    </a>
                  ) : (
                    <span className={isLast ? "text-foreground" : undefined}>{item.label}</span>
                  )}
                  {!isLast && <span className="text-line-strong">/</span>}
                </React.Fragment>
              );
            })}
          </nav>
        )}
        {eyebrow && <div className="text-eyebrow text-accent">{eyebrow}</div>}
        <h1 className="mt-2 break-words font-display text-pixel-md text-foreground md:text-pixel-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
