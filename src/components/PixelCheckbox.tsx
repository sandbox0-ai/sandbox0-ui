import React from "react";
import type { PixelBaseProps } from "../types";
import { cn } from "../utils";

export interface PixelCheckboxProps
  extends Omit<PixelBaseProps, "scale">,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Label text */
  label: React.ReactNode;
  /** Helper text */
  helper?: React.ReactNode;
  /** Error message */
  error?: React.ReactNode;
}

/**
 * PixelCheckbox - Checkbox field with the dashboard form label treatment.
 */
export function PixelCheckbox({
  label,
  helper,
  error,
  className,
  id,
  disabled,
  ...props
}: PixelCheckboxProps) {
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        "flex items-start gap-3 border border-line bg-surface p-3 transition-colors",
        "hover:border-line-strong",
        disabled && "cursor-not-allowed opacity-50",
        Boolean(error) && "border-danger/60",
        className,
      )}
    >
      <input
        id={checkboxId}
        type="checkbox"
        disabled={disabled}
        className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]"
        {...props}
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-foreground">{label}</span>
        {(error || helper) && (
          <span className={cn("mt-1 block text-xs", error ? "text-danger" : "text-muted")}>
            {error || helper}
          </span>
        )}
      </span>
    </label>
  );
}
