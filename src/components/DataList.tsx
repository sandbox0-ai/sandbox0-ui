import React from "react";
import { cn } from "../utils";

export interface DataListItem {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Span the full row width (useful for long values). */
  wide?: boolean;
}

export interface DataListProps {
  items: DataListItem[];
  /** Number of columns at the widest breakpoint. */
  columns?: 1 | 2 | 3;
  className?: string;
}

const columnClasses: Record<NonNullable<DataListProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

/**
 * DataList - A structured key/value description list.
 *
 * The friendly, human-readable replacement for dumping raw JSON at users:
 * each field gets a labelled cell with a monospace value. Empty values fall
 * back to an em dash so the layout stays even.
 */
export function DataList({ items, columns = 2, className }: DataListProps) {
  return (
    <dl className={cn("grid gap-px bg-line", columnClasses[columns], className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn("min-w-0 bg-surface p-3", item.wide && "sm:col-span-full")}
        >
          <dt className="text-eyebrow text-muted">{item.label}</dt>
          <dd className="mt-2 break-words font-mono text-sm text-foreground">
            {item.value === null || item.value === undefined || item.value === ""
              ? "\u2014"
              : item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
