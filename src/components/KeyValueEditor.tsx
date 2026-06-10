import React from "react";
import { cn } from "../utils";

export interface KeyValuePair {
  key: string;
  value: string;
}

export interface KeyValueEditorProps {
  label?: string;
  helper?: string;
  pairs: KeyValuePair[];
  onChange: (pairs: KeyValuePair[]) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  addLabel?: string;
  /** Render value inputs as password fields (e.g. secret headers). */
  secret?: boolean;
}

const fieldClass =
  "min-w-0 flex-1 border border-line-strong bg-surface px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent";

/**
 * KeyValueEditor - A friendly editor for maps such as environment variables
 * and HTTP headers.
 *
 * Replaces the old "one KEY=value per line" free-text textareas with discrete,
 * validated rows that are easy to add, edit, and remove. Emits a clean array of
 * {key,value} pairs; callers decide how to serialize.
 */
export function KeyValueEditor({
  label,
  helper,
  pairs,
  onChange,
  keyPlaceholder = "KEY",
  valuePlaceholder = "value",
  addLabel = "Add variable",
  secret = false,
}: KeyValueEditorProps) {
  const rows = pairs.length > 0 ? pairs : [{ key: "", value: "" }];

  function update(index: number, patch: Partial<KeyValuePair>) {
    const next = rows.map((pair, i) => (i === index ? { ...pair, ...patch } : pair));
    onChange(next);
  }

  function addRow() {
    onChange([...rows, { key: "", value: "" }]);
  }

  function removeRow(index: number) {
    const next = rows.filter((_, i) => i !== index);
    onChange(next.length > 0 ? next : [{ key: "", value: "" }]);
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm font-medium text-foreground">{label}</span>}
      <div className="flex flex-col gap-2">
        {rows.map((pair, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              aria-label={`${label ?? "Entry"} key ${index + 1}`}
              value={pair.key}
              onChange={(event) => update(index, { key: event.target.value })}
              placeholder={keyPlaceholder}
              className={cn(fieldClass, "max-w-[40%] font-medium")}
              spellCheck={false}
            />
            <span aria-hidden="true" className="text-muted">
              =
            </span>
            <input
              aria-label={`${label ?? "Entry"} value ${index + 1}`}
              value={pair.value}
              onChange={(event) => update(index, { value: event.target.value })}
              placeholder={valuePlaceholder}
              type={secret ? "password" : "text"}
              className={fieldClass}
              spellCheck={false}
            />
            <button
              type="button"
              onClick={() => removeRow(index)}
              aria-label={`Remove ${pair.key || "entry"}`}
              className="shrink-0 border border-line-strong bg-surface px-2.5 py-2 font-mono text-sm text-muted transition-colors hover:border-danger/50 hover:text-danger"
            >
              {"\u00d7"}
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={addRow}
          className="self-start font-mono text-xs text-accent transition-colors hover:text-foreground"
        >
          {"+ "}
          {addLabel}
        </button>
        {helper && <span className="text-xs text-muted">{helper}</span>}
      </div>
    </div>
  );
}

/** Serialize editor pairs into a record, dropping blank keys. */
export function pairsToRecord(pairs: KeyValuePair[]): Record<string, string> {
  const record: Record<string, string> = {};
  for (const { key, value } of pairs) {
    const trimmed = key.trim();
    if (trimmed) record[trimmed] = value;
  }
  return record;
}

/** Hydrate editor pairs from a record. */
export function recordToPairs(record?: Record<string, string> | null): KeyValuePair[] {
  if (!record) return [];
  return Object.entries(record).map(([key, value]) => ({ key, value: String(value ?? "") }));
}
