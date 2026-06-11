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
  rowClassName?: (row: T, index: number) => string | undefined;
  /** Message shown when there are no rows. */
  emptyLabel?: string;
  /** Supporting text shown in the empty state. */
  emptyDescription?: React.ReactNode;
  /** Minimum table width before horizontal scroll kicks in. */
  minWidthClassName?: string;
  density?: "default" | "compact";
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
  rowClassName,
  emptyLabel = "No data",
  emptyDescription,
  minWidthClassName = "min-w-[720px]",
  density = "default",
  className,
}: DataTableProps<T>) {
  if (rows.length === 0) return <EmptyState label={emptyLabel} description={emptyDescription} />;

  const cellPadding = density === "compact" ? "px-3 py-2" : "px-4 py-3";
  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>, row: T) => {
    if (!onRowClick) return;
    const target = event.target instanceof HTMLElement ? event.target : null;
    if (target?.closest("a,button,input,select,textarea")) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    onRowClick(row);
  };

  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full text-left text-sm", minWidthClassName, className)}>
        <thead>
          <tr className="border-b border-line">
            {columns.map((column, index) => (
              <th
                key={index}
                className={cn(
                  "text-eyebrow font-medium text-muted",
                  cellPadding,
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
              onClick={onRowClick ? (event) => handleRowClick(event, row) : undefined}
              onKeyDown={
                onRowClick
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onRowClick(row);
                      }
                    }
                  : undefined
              }
              role={onRowClick ? "button" : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              className={cn(
                "border-b border-line/60 transition-colors last:border-0",
                onRowClick && "cursor-pointer hover:bg-surface-2 focus:bg-surface-2 focus:outline-none",
                rowClassName?.(row, rowIndex),
              )}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={cn(
                    "align-middle",
                    cellPadding,
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
