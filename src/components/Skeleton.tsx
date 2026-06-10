import React from "react";
import { cn } from "../utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Skeleton - A single shimmering placeholder block.
 *
 * Subtle pulse on the surface tone; compose several for loading states.
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse bg-surface-2", className)}
      aria-hidden="true"
      {...props}
    />
  );
}
