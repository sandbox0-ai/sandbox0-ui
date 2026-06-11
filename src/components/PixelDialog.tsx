"use client";

import React, { useEffect, useId, useRef } from "react";
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

/** PixelDialog - Accessible modal shell for dense console workflows. */
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
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const previousActiveElement = document.activeElement;
    document.body.style.overflow = open ? "hidden" : "";
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
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
      aria-labelledby={title !== undefined ? titleId : undefined}
      className={cn(
        "fixed inset-0 z-[200]",
        "flex items-center justify-center px-4",
        "bg-black/70 backdrop-blur-sm",
        overlayClassName
      )}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "relative w-full border border-line-strong bg-surface shadow-popover outline-none",
          maxWidth,
          className
        )}
      >
        {(title !== undefined) && (
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="w-[3px] h-[14px] bg-accent shrink-0" aria-hidden="true" />
              <span id={titleId} className="truncate text-eyebrow text-foreground">
                {title}
              </span>
            </div>
            <PixelIconClose onClick={onClose} className="shrink-0 ml-2" />
          </div>
        )}

        {title === undefined && (
          <PixelIconClose
            onClick={onClose}
            className="absolute top-2 right-2 z-10"
          />
        )}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
