import React from "react";
import { cn } from "../utils";
import { EmptyState } from "./Feedback";

export interface DataTableColumn<T> {
  /** Column header label. */
  header: React.ReactNode;
  /** Cell renderer for a row. */
  cell: (row: T) => React.ReactNode;
  /** Optional extra classes applied to both header and cells. */
  className?: string;
  align?: "left" | "right" | "center";
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T, index: number) => string;
  /** Navigate / select on row click. */
  onRowClick?: (row: T) => void;
  /** Message shown when there are no rows. */
  emptyLabel?: string;
  /** Minimum table width before horizontal scroll kicks in. */
  minWidthClassName?: string;
  className?: string;
}

const alignClasses = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
} as const;

/**
 * DataTable - A consistent, legible table for console list views.
 *
 * Monospace headers (no pixel-font micro-text), hairline row separators, and
 * an optional clickable-row affordance. Renders an {@link EmptyState} when the
 * dataset is empty.
 */
export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  onRowClick,
  emptyLabel = "No data",
  minWidthClassName = "min-w-[720px]",
  className,
}: DataTableProps<T>) {
  if (rows.length === 0) return <EmptyState label={emptyLabel} />;

  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full text-left text-sm", minWidthClassName, className)}>
        <thead>
          <tr className="border-b border-line">
            {columns.map((column, index) => (
              <th
                key={index}
                className={cn(
                  "px-4 py-3 text-eyebrow font-medium text-muted",
                  column.align && alignClasses[column.align],
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={getRowKey(row, rowIndex)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                "border-b border-line/60 transition-colors last:border-0",
                onRowClick && "cursor-pointer hover:bg-surface-2",
              )}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={cn(
                    "px-4 py-3 align-middle",
                    column.align && alignClasses[column.align],
                    column.className,
                  )}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
