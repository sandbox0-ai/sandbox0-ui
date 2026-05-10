"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "../utils";
import { PixelIconClose } from "./PixelIconClose";

export interface PixelDialogProps {
  /** Controls visibility */
  open: boolean;
  /** Called when the dialog should close (backdrop click, Escape key, or close button) */
  onClose: () => void;
  /**
   * Title rendered in the dialog title bar.
   * Accepts a string or arbitrary JSX.
   */
  title?: React.ReactNode;
  children: React.ReactNode;
  /**
   * Tailwind max-width class applied to the dialog panel.
   * Defaults to "max-w-md".
   */
  maxWidth?: string;
  /** Extra classes for the dialog panel */
  className?: string;
  /** Extra classes for the backdrop overlay */
  overlayClassName?: string;
}

/**
 * PixelDialog — A general-purpose pixel-art modal dialog.
 *
 * Design details:
 * - Backdrop: semi-transparent black with a subtle blur.
 * - Panel border: `pixel-border-md` — a symmetric 2px pixel border on all four
 *   sides (equal box-shadow). This is the "window frame" style and is
 *   intentionally distinct from the button-style shadow (which has an offset
 *   bottom-right highlight to simulate depth/press).
 * - Title bar: 2px accent bottom border separates title from content, a
 *   horizontal accent strip on the left echoes the active-sidebar treatment
 *   used throughout the UI.
 * - Close button: `PixelIconClose` from the shared library.
 *
 * Behaviour:
 * - Pressing Escape calls `onClose`.
 * - Clicking the backdrop calls `onClose`.
 * - Body scroll is locked while the dialog is open.
 *
 * @example
 * ```tsx
 * <PixelDialog open={open} onClose={() => setOpen(false)} title="Settings">
 *   <p>Dialog content here.</p>
 * </PixelDialog>
 * ```
 */
export function PixelDialog({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
  className,
  overlayClassName,
}: PixelDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // ESC key handler
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      className={cn(
        "fixed inset-0 z-[200]",
        "flex items-center justify-center px-4",
        "bg-black/60 backdrop-blur-sm",
        overlayClassName
      )}
    >
      {/*
       * Panel border strategy:
       * pixel-border-md uses a symmetric box-shadow (2px on every side) that
       * renders as a crisp pixel window frame — no offset, no depth illusion.
       * This is the appropriate "dialog window" treatment, not the button style.
       */}
      <div
        className={cn(
          "relative w-full bg-background pixel-border-md",
          maxWidth,
          className
        )}
      >
        {/* Title bar */}
        {(title !== undefined) && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/10">
            {/* Accent left indicator + label */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-[3px] h-[14px] bg-accent shrink-0" aria-hidden="true" />
              <span className="font-pixel text-[9px] uppercase tracking-[0.18em] text-foreground truncate">
                {title}
              </span>
            </div>
            <PixelIconClose onClick={onClose} className="shrink-0 ml-2" />
          </div>
        )}

        {/* When there is no title, render a floating close button in the top-right corner */}
        {title === undefined && (
          <PixelIconClose
            onClick={onClose}
            className="absolute top-2 right-2 z-10"
          />
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
