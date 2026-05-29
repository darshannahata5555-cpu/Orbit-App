import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variantClasses: Record<string, string> = {
  default: "bg-neutral-100 text-neutral-700",
  positive: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  warning: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
  critical: "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
  blue: "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variantClasses;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
