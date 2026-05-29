import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "ghost" | "accent";
}

export function Button({ className, variant = "solid", ...props }: ButtonProps) {
  const styles = {
    solid: "bg-white/10 text-white hover:bg-white/15",
    ghost: "bg-transparent text-slate-200 hover:bg-white/5",
    accent: "bg-[#0293FC] text-black hover:bg-[#0db0ff]",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition-colors duration-200",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
