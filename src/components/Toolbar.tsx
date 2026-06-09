import React from "react";
import { cn } from "../utils";

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** Toolbar - A bordered row that groups filters, search, and actions. */
export function Toolbar({ className, children, ...props }: ToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 border border-line bg-surface p-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: string;
  onValueChange: (value: string) => void;
}

/**
 * SearchInput - A search field with a leading magnifier glyph, sized to grow
 * inside a {@link Toolbar}.
 */
export function SearchInput({
  value,
  onValueChange,
  placeholder = "Search",
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className={cn("relative flex min-w-[220px] flex-1 items-center", className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 font-mono text-sm text-muted"
      >
        {"\u2315"}
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border border-line-strong bg-background py-2 pl-8 pr-3 font-mono text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent"
        {...props}
      />
    </div>
  );
}
