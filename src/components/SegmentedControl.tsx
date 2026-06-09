import React from "react";
import { cn } from "../utils";

export type SegmentedOption = string | { value: string; label: string };

export interface SegmentedControlProps {
  value: string;
  onChange: (value: string) => void;
  options: SegmentedOption[];
  ariaLabel?: string;
  className?: string;
}

/**
 * SegmentedControl - Compact single-select control for filters and views.
 *
 * Legible monospace labels (no more 8px pixel text) with a clear accent fill on
 * the active segment.
 */
export function SegmentedControl({
  value,
  onChange,
  options,
  ariaLabel,
  className,
}: SegmentedControlProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex flex-wrap border border-line-strong bg-surface p-0.5",
        className,
      )}
    >
      {options.map((option) => {
        const optionValue = typeof option === "string" ? option : option.value;
        const optionLabel = typeof option === "string" ? option : option.label;
        const active = value === optionValue;
        return (
          <button
            key={optionValue}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(optionValue)}
            className={cn(
              "px-3 py-1.5 font-mono text-xs capitalize transition-colors",
              active ? "bg-accent text-black" : "text-muted hover:text-foreground",
            )}
          >
            {optionLabel}
          </button>
        );
      })}
    </div>
  );
}
