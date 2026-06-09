"use client";

import React from "react";
import { cn } from "../utils";

export interface CodeBlockProps {
  /** Raw text/code to display. */
  value: string;
  /** Optional label shown in the header bar (e.g. "system prompt"). */
  title?: React.ReactNode;
  /** Language/format hint shown on the right of the header. */
  language?: string;
  /** Enable the copy-to-clipboard control. */
  copyable?: boolean;
  /** Wrap long lines instead of scrolling horizontally. */
  wrap?: boolean;
  /** Max body height before scrolling. */
  maxHeightClassName?: string;
  className?: string;
}

/**
 * CodeBlock - A readable, copyable container for raw text and code.
 *
 * Used for system prompts and, behind an explicit "view raw" affordance, for
 * advanced payloads — so we never dump an unstyled `<pre>` of JSON on users by
 * default.
 */
export function CodeBlock({
  value,
  title,
  language,
  copyable = true,
  wrap = false,
  maxHeightClassName = "max-h-[420px]",
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be unavailable (insecure context); fail silently.
    }
  }

  return (
    <div className={cn("border border-line bg-surface", className)}>
      {(title || language || copyable) && (
        <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2">
          <span className="text-eyebrow text-muted">{title}</span>
          <div className="flex items-center gap-3">
            {language && <span className="font-mono text-xs text-muted">{language}</span>}
            {copyable && (
              <button
                type="button"
                onClick={copy}
                className="font-mono text-xs text-accent transition-colors hover:text-foreground"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
        </div>
      )}
      <pre
        className={cn(
          "overflow-auto p-4 font-mono text-xs leading-relaxed text-foreground/85",
          maxHeightClassName,
          wrap && "whitespace-pre-wrap break-words",
        )}
      >
        {value || "\u2014"}
      </pre>
    </div>
  );
}
