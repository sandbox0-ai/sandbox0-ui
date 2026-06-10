import React from "react";
import { PixelBadge, type PixelBadgeProps } from "./PixelBadge";

export type StatusTone = NonNullable<PixelBadgeProps["variant"]>;

/**
 * Map an arbitrary status string to a semantic badge tone. Centralizing this
 * keeps "running", "failed", "paused" etc. colored consistently everywhere.
 */
export function statusTone(status?: string | boolean | null): StatusTone {
  const value = String(status ?? "unknown").toLowerCase();
  if (/(fail|error|crash|denied|unhealthy)/.test(value)) return "danger";
  if (/(run|ready|active|success|succeed|healthy|online|idle)/.test(value)) return "success";
  if (/(start|resum|paus|pend|provision|reschedul|warn|degrad)/.test(value)) return "warning";
  if (/(terminat|stopped|archiv|expired|deleted)/.test(value)) return "default";
  return "default";
}

export interface StatusPillProps {
  status?: string | boolean | null;
  /** Override the label text (defaults to the status value). */
  label?: string;
  size?: PixelBadgeProps["size"];
  className?: string;
}

/**
 * StatusPill - A status badge with a colored dot, derived from a raw status
 * string via {@link statusTone}.
 */
export function StatusPill({ status, label, size = "sm", className }: StatusPillProps) {
  const tone = statusTone(status);
  const text = label ?? String(status ?? "unknown");
  return (
    <PixelBadge variant={tone} size={size} dot className={className}>
      {text}
    </PixelBadge>
  );
}
