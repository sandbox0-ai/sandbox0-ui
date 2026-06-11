"use client";

import React, { useMemo } from "react";
import type { PixelBaseProps } from "../types";
import { cn } from "../utils";
import { PixelDropdown } from "./PixelDropdown";

export interface PixelSelectOption {
  value: string;
  label: string;
}

export interface PixelSelectProps extends Omit<PixelBaseProps, "accent"> {
  value: string;
  options: PixelSelectOption[];
  onValueChange: (value: string) => void;
  ariaLabel?: string;
  /** Label text */
  label?: React.ReactNode;
  /** Helper text */
  helper?: React.ReactNode;
  /** Error message */
  error?: React.ReactNode;
  menuSide?: "top" | "bottom";
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
}

/**
 * PixelSelect - Lightweight pixel-style select menu built from primitives.
 *
 * Uses a button + menu instead of the browser native select so the control
 * stays visually consistent across browsers and apps.
 */
export function PixelSelect({
  value,
  options,
  onValueChange,
  ariaLabel,
  label,
  helper,
  error,
  menuSide = "top",
  scale = "sm",
  disabled = false,
  className,
  triggerClassName,
  menuClassName,
}: PixelSelectProps) {
  const currentOption = useMemo(() => {
    return options.find((option) => option.value === value) ?? options[0];
  }, [options, value]);

  const triggerPadding = {
    sm: "px-3 py-2 text-xs",
    md: "px-3.5 py-2.5 text-sm",
    lg: "px-4 py-3 text-sm",
  };

  const itemPadding = {
    sm: "px-3 py-2 text-xs",
    md: "px-3.5 py-2.5 text-sm",
    lg: "px-4 py-3 text-sm",
  };

  const resolvedAriaLabel = ariaLabel ?? (typeof label === "string" ? label : "Select option");

  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-sm font-medium text-foreground">{label}</span>}
      <PixelDropdown
        trigger={
          <span className="truncate font-mono">
            {currentOption?.label ?? value}
          </span>
        }
        ariaLabel={resolvedAriaLabel}
        ariaHasPopup="listbox"
        menuRole="listbox"
        menuSide={menuSide}
        scale={scale}
        triggerDisabled={disabled}
        className={className}
        triggerClassName={cn(
          "border border-line-strong bg-surface-2 text-foreground",
          "hover:border-foreground/35 hover:bg-elevated focus:border-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          Boolean(error) && "border-danger focus:border-danger",
          triggerPadding[scale],
          triggerClassName
        )}
        menuClassName={cn(
          "min-w-full border border-line-strong bg-elevated shadow-popover",
          menuClassName
        )}
      >
        {({ close }) => (
          <>
            {options.map((option) => {
              const active = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    close();
                    if (option.value !== value) {
                      onValueChange(option.value);
                    }
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 text-left",
                    "font-mono transition-colors",
                    active
                      ? "bg-accent/15 text-accent"
                      : "text-muted hover:bg-surface-2 hover:text-foreground",
                    itemPadding[scale]
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {active ? <span className="h-[4px] w-[4px] bg-accent" /> : null}
                </button>
              );
            })}
          </>
        )}
      </PixelDropdown>
      {(error || helper) && (
        <p className={cn("text-xs", error ? "text-danger" : "text-muted")}>
          {error || helper}
        </p>
      )}
    </div>
  );
}
