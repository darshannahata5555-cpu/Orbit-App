import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  initials: string;
  accent?: string;
}

export function Avatar({ initials, accent = "#0293FC", className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-semibold text-white",
        className,
      )}
      style={{ background: accent }}
      {...props}
    >
      {initials}
    </div>
  );
}
