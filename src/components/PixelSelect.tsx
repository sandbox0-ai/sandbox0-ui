"use client";

import React, { useMemo } from "react";
import type { PixelBaseProps } from "../types";
import { cn, getPixelShadowClass } from "../utils";
import { PixelDropdown } from "./PixelDropdown";

export interface PixelSelectOption {
  value: string;
  label: string;
}

export interface PixelSelectProps extends Omit<PixelBaseProps, "accent"> {
  value: string;
  options: PixelSelectOption[];
  onValueChange: (value: string) => void;
  ariaLabel: string;
  menuSide?: "top" | "bottom";
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
  menuSide = "top",
  scale = "sm",
  className,
  triggerClassName,
  menuClassName,
}: PixelSelectProps) {
  const currentOption = useMemo(() => {
    return options.find((option) => option.value === value) ?? options[0];
  }, [options, value]);

  const triggerPadding = {
    sm: "px-2.5 py-2 text-[10px]",
    md: "px-3 py-2.5 text-[11px]",
    lg: "px-3.5 py-3 text-xs",
  };

  const itemPadding = {
    sm: "px-2.5 py-2 text-[10px]",
    md: "px-3 py-2.5 text-[11px]",
    lg: "px-3.5 py-3 text-xs",
  };

  return (
    <PixelDropdown
      trigger={
        <span className="truncate font-pixel uppercase tracking-[0.06em]">
          {currentOption?.label ?? value}
        </span>
      }
      ariaLabel={ariaLabel}
      ariaHasPopup="listbox"
      menuRole="listbox"
      menuSide={menuSide}
      scale={scale}
      className={className}
      triggerClassName={cn(
        getPixelShadowClass(scale, false),
        triggerPadding[scale],
        triggerClassName
      )}
      menuClassName={menuClassName}
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
                  "flex w-full items-center justify-between text-left",
                  "font-pixel uppercase tracking-[0.06em] transition-colors",
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-foreground/[0.03] hover:text-foreground",
                  itemPadding[scale]
                )}
              >
                <span>{option.label}</span>
                {active ? <span className="h-[4px] w-[4px] bg-accent" /> : null}
              </button>
            );
          })}
        </>
      )}
    </PixelDropdown>
  );
}
