"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import type { PixelBaseProps } from "../types";
import { cn, getPixelShadowClass } from "../utils";

export interface PixelDropdownRenderContext {
  open: boolean;
  close: () => void;
}

export interface PixelDropdownProps extends Omit<PixelBaseProps, "accent"> {
  trigger: React.ReactNode;
  children:
    | React.ReactNode
    | ((context: PixelDropdownRenderContext) => React.ReactNode);
  ariaLabel: string;
  ariaHasPopup?: "menu" | "listbox";
  menuRole?: "menu" | "listbox";
  menuSide?: "top" | "bottom";
  align?: "start" | "center" | "end" | "stretch";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  showChevron?: boolean;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  triggerDisabled?: boolean;
}

export function PixelDropdownChevron({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 8 5"
      className={cn("h-[5px] w-2 shrink-0", className)}
      shapeRendering="crispEdges"
      fill="currentColor"
    >
      <rect x="0" y="0" width="1" height="1" />
      <rect x="1" y="1" width="1" height="1" />
      <rect x="2" y="2" width="1" height="1" />
      <rect x="5" y="2" width="1" height="1" />
      <rect x="6" y="1" width="1" height="1" />
      <rect x="7" y="0" width="1" height="1" />
      <rect x="3" y="3" width="1" height="1" />
      <rect x="4" y="3" width="1" height="1" />
    </svg>
  );
}

/**
 * PixelDropdown - Shared pixel-style dropdown shell.
 *
 * Handles trigger state, outside-click dismissal, Escape dismissal, menu
 * positioning, and the shared pixel chevron. Callers own the menu content so
 * this can back both navigation menus and form-like controls.
 */
export function PixelDropdown({
  trigger,
  children,
  ariaLabel,
  ariaHasPopup = "menu",
  menuRole = "menu",
  menuSide = "top",
  align = "stretch",
  scale = "sm",
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  showChevron = true,
  className,
  triggerClassName,
  menuClassName,
  triggerDisabled,
}: PixelDropdownProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const uid = useId();
  const menuId = `pixel-dropdown-${uid.replace(/:/g, "")}`;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  function setOpen(nextOpen: boolean) {
    if (controlledOpen === undefined) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  }

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [controlledOpen, onOpenChange, open]);

  const alignClass = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
    stretch: "left-0 right-0",
  };

  const content =
    typeof children === "function"
      ? children({ open, close: () => setOpen(false) })
      : children;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup={ariaHasPopup}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={ariaLabel}
        disabled={triggerDisabled}
        onClick={() => setOpen(!open)}
        className={cn(
          "group flex w-full items-center justify-between gap-3",
          "bg-transparent text-muted transition-colors",
          "hover:text-foreground focus:outline-none focus:text-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          open && "text-foreground",
          triggerClassName
        )}
      >
        {trigger}
        {showChevron ? (
          <PixelDropdownChevron
            className={cn(
              "text-muted/70 transition-transform transition-colors duration-150",
              "group-hover:text-foreground",
              open && "rotate-180 text-accent"
            )}
          />
        ) : null}
      </button>

      {open ? (
        <div
          id={menuId}
          role={menuRole}
          aria-label={ariaLabel}
          className={cn(
            "absolute z-20 overflow-hidden",
            menuSide === "top" ? "bottom-full mb-2" : "top-full mt-2",
            alignClass[align],
            "border border-line-strong bg-elevated shadow-popover",
            getPixelShadowClass(scale, false),
            menuClassName
          )}
        >
          {content}
        </div>
      ) : null}
    </div>
  );
}
