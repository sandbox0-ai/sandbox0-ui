import React from "react";
import { cn } from "../utils";

export interface EmptyStateProps {
  /** Short headline describing the empty result. */
  label: React.ReactNode;
  /** Optional supporting sentence. */
  description?: React.ReactNode;
  /** Optional call to action (e.g. a button). */
  action?: React.ReactNode;
  className?: string;
}

/** EmptyState - Friendly placeholder for empty lists and tables. */
export function EmptyState({ label, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 border border-dashed border-line-strong bg-surface px-6 py-12 text-center",
        className,
      )}
    >
      <div className="font-mono text-sm text-foreground">{label}</div>
      {description && <p className="max-w-md text-sm text-muted">{description}</p>}
      {action}
    </div>
  );
}

export type NoticeTone = "error" | "success" | "warning" | "info";

export interface NoticeProps {
  tone?: NoticeTone;
  /** Convenience: render an error notice from a message string. */
  error?: string | null;
  /** Convenience: render a success notice from a message string. */
  success?: string | null;
  children?: React.ReactNode;
  className?: string;
}

const toneClasses: Record<NoticeTone, string> = {
  error: "border-danger/40 bg-danger/10 text-danger",
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-warning",
  info: "border-info/40 bg-info/10 text-info",
};

/**
 * Notice - Inline status message for form/action feedback.
 *
 * Accepts either explicit children + tone, or the `error`/`success` shortcuts
 * used throughout the dashboards. Renders nothing when there is no message.
 */
export function Notice({ tone, error, success, children, className }: NoticeProps) {
  const resolvedTone: NoticeTone = tone ?? (error ? "error" : success ? "success" : "info");
  const content = children ?? error ?? success;
  if (!content) return null;
  return (
    <div
      role="status"
      className={cn(
        "border px-4 py-3 font-mono text-sm",
        toneClasses[resolvedTone],
        className,
      )}
    >
      {content}
    </div>
  );
}
