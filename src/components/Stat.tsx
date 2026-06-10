import React from "react";
import { cn } from "../utils";

export interface StatCardProps {
  label: React.ReactNode;
  value: React.ReactNode;
  hint?: React.ReactNode;
  /** Optional accent tone applied to the value (e.g. for error counts). */
  tone?: "default" | "accent" | "success" | "warning" | "danger";
  className?: string;
}

const toneClasses: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "text-foreground",
  accent: "text-accent",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

/**
 * StatCard - A single headline metric.
 *
 * Legible monospace value with tabular figures, an eyebrow label, and a muted
 * hint line. Pair with `StatGrid` for KPI rows.
 */
export function StatCard({ label, value, hint, tone = "default", className }: StatCardProps) {
  return (
    <div
      className={cn(
        "min-w-0 border border-line bg-surface p-4 shadow-panel",
        className,
      )}
    >
      <div className="text-eyebrow text-muted">{label}</div>
      <div
        className={cn(
          "mt-3 break-words font-mono text-2xl font-semibold tabular-nums",
          toneClasses[tone],
        )}
      >
        {value}
      </div>
      {hint !== undefined && (
        <div className="mt-1 break-words font-mono text-xs text-muted">{hint}</div>
      )}
    </div>
  );
}

export interface StatGridProps {
  columns?: 2 | 3 | 4 | 5;
  className?: string;
  children: React.ReactNode;
}

const columnClasses: Record<NonNullable<StatGridProps["columns"]>, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
};

/** StatGrid - Responsive grid wrapper for `StatCard`s. */
export function StatGrid({ columns = 4, className, children }: StatGridProps) {
  return (
    <div className={cn("grid gap-3", columnClasses[columns], className)}>{children}</div>
  );
}
