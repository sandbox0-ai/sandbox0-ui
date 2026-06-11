"use client";

import React, { useId, useState } from "react";
import type { PixelBaseProps } from "../types";
import { cn } from "../utils";

// ─── Pixel-art chevron icon ──────────────────────────────────────────────────
// Same glyph as PixelSelect's chevron for visual consistency across the library.
// Rotates 180° via CSS when the panel is open.
function PixelChevron({ className }: { className?: string }) {
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

// ─── PixelCollapsible ────────────────────────────────────────────────────────

export interface PixelCollapsibleProps extends PixelBaseProps {
  /** The trigger label — rendered inside the header button */
  trigger: React.ReactNode;
  /** Content revealed when expanded */
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Called when the open state should change */
  onOpenChange?: (open: boolean) => void;
  /** Initial open state for uncontrolled usage */
  defaultOpen?: boolean;
  /** Extra classes applied to the trigger button */
  triggerClassName?: string;
  /** Extra classes applied to the content panel */
  contentClassName?: string;
}

/** PixelCollapsible - Disclosure primitive for forms, docs, and dense panels. */
export function PixelCollapsible({
  trigger,
  children,
  scale = "md",
  accent = false,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  className,
  triggerClassName,
  contentClassName,
}: PixelCollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const uid = useId();
  const panelId = `pixel-collapsible-${uid.replace(/:/g, "")}`;

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleToggle = () => {
    const next = !isOpen;
    if (controlledOpen === undefined) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleToggle}
        className={cn(
          "group flex w-full items-center justify-between gap-4",
          "border border-line-strong bg-surface-2 px-4 py-3",
          "font-mono text-sm transition-colors",
          isOpen ? "text-foreground" : "text-muted hover:text-foreground",
          (isOpen || accent) && "border-accent/50 bg-accent/10",
          triggerClassName
        )}
      >
        <span>{trigger}</span>

        <PixelChevron
          className={cn(
            "transition-transform duration-150",
            isOpen
              ? "rotate-180 text-accent"
              : "text-muted/70 group-hover:text-foreground"
          )}
        />
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="region"
          className={cn(
            "border border-t-0 border-line-strong bg-surface",
            contentClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─── PixelCollapsiblePanel ───────────────────────────────────────────────────

export interface PixelCollapsiblePanelProps {
  /**
   * Whether the panel is visible. When false the panel is unmounted entirely
   * so it does not take up space or affect tab order.
   */
  open: boolean;
  children: React.ReactNode;
  /** Extra classes for the panel wrapper */
  className?: string;
}

/**
 * PixelCollapsiblePanel — The content panel half of a "split" collapsible.
 *
 * Use this when the trigger lives in a different part of the layout than the
 * panel (e.g. a sticky header bar whose dropdown must render outside the flex
 * container). The caller owns the `open` state and wires the toggle separately.
 *
 * Visual contract:
 * - `bg-surface` background (elevated above page background)
 * - 2px accent top border (consistent with PixelCollapsible's panel)
 * - No padding — callers add their own to control the content area
 *
 * @example
 * ```tsx
 * // In a header layout:
 * <nav>
 *   <div className="header-bar flex items-center justify-between">
 *     <Logo />
 *     <button onClick={() => setOpen(v => !v)} aria-expanded={open}>
 *       <PixelMenuIcon open={open} />
 *     </button>
 *   </div>
 *
 *   <PixelCollapsiblePanel open={open} className="lg:hidden">
 *     <div className="px-4 py-4">
 *       nav links…
 *     </div>
 *   </PixelCollapsiblePanel>
 * </nav>
 * ```
 */
export function PixelCollapsiblePanel({
  open,
  children,
  className,
}: PixelCollapsiblePanelProps) {
  if (!open) return null;

  return (
    <div
      className={cn(
        "bg-surface",
        "border-t-2 border-accent/40",
        className
      )}
    >
      {children}
    </div>
  );
}
