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
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="pointer-events-none absolute left-3 h-4 w-4 text-muted"
        fill="none"
      >
        <path
          d="M7 12a5 5 0 1 1 3.54-1.46L14 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border border-line-strong bg-background py-2 pl-9 pr-3 font-mono text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent"
        {...props}
      />
    </div>
  );
}
