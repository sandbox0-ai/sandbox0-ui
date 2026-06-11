import React from "react";
import type { PixelBaseProps } from "../types";
import { cn } from "../utils";

export interface PixelTextareaProps
  extends Omit<PixelBaseProps, "scale">,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text */
  label?: React.ReactNode;
  /** Error message */
  error?: React.ReactNode;
  /** Helper text */
  helper?: React.ReactNode;
}

/**
 * PixelTextarea - Multi-line text input for dense console forms.
 */
export function PixelTextarea({
  label,
  error,
  helper,
  className,
  id,
  ...props
}: PixelTextareaProps) {
  const generatedId = React.useId();
  const textareaId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          "w-full resize-y border border-line-strong bg-surface px-3 py-2 font-mono text-sm text-foreground",
          "placeholder:text-muted transition-colors focus:border-accent focus:outline-none",
          "focus:shadow-[0_0_0_2px_rgb(var(--color-accent-rgb)/0.35)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          Boolean(error) &&
            "border-danger focus:border-danger focus:shadow-[0_0_0_2px_rgb(var(--color-danger-rgb)/0.35)]",
          className,
        )}
        {...props}
      />
      {(error || helper) && (
        <p className={cn("text-xs", error ? "text-danger" : "text-muted")}>
          {error || helper}
        </p>
      )}
    </div>
  );
}
