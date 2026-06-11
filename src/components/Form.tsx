import React from "react";
import { cn } from "../utils";

export interface FormSectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Section label shown above a group of related controls. */
  title: React.ReactNode;
  /** Optional supporting copy for the group. */
  description?: React.ReactNode;
  /** Optional trailing controls such as reset or helper actions. */
  actions?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * FormSection - Groups related dashboard form controls into scannable blocks.
 */
export function FormSection({
  title,
  description,
  actions,
  children,
  className,
  ...props
}: FormSectionProps) {
  return (
    <section
      className={cn("space-y-3 border-t border-line pt-4 first:border-t-0 first:pt-0", className)}
      {...props}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-eyebrow text-muted">{title}</h3>
          {description && <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  );
}

export interface FieldGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns at the widest breakpoint. */
  columns?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
}

const fieldGridColumns: Record<NonNullable<FieldGridProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 xl:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
};

/**
 * FieldGrid - Responsive grid for dense console form fields.
 */
export function FieldGrid({
  columns = 2,
  className,
  children,
  ...props
}: FieldGridProps) {
  return (
    <div className={cn("grid gap-4", fieldGridColumns[columns], className)} {...props}>
      {children}
    </div>
  );
}

export interface DangerZoneProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * DangerZone - Dedicated container for destructive dashboard workflows.
 */
export function DangerZone({
  title = "Danger Zone",
  description,
  actions,
  children,
  className,
  ...props
}: DangerZoneProps) {
  return (
    <section
      className={cn("border border-danger/40 bg-danger/10 shadow-panel", className)}
      {...props}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-danger/30 px-4 py-3">
        <div className="min-w-0">
          <h2 className="text-eyebrow text-danger">{title}</h2>
          {description && <p className="mt-2 max-w-2xl text-sm text-danger/80">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </header>
      {children && <div className="p-4">{children}</div>}
    </section>
  );
}
