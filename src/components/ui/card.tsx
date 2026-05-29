import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[26px] border border-black/5 bg-white p-4 shadow-[0_18px_45px_-35px_rgba(17,17,17,0.45)]",
        className,
      )}
      {...props}
    />
  );
}
