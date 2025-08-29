import * as React from "react";
import { cn } from "./utils";
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export function Progress({ value, className, ...props }: ProgressProps) {
  return (
    <div
      className={cn(
        "w-full h-4 bg-muted rounded-full overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-blue-500 transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
