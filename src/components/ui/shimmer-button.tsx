import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  background?: string;
  children: ReactNode;
  className?: string;
}

export function ShimmerButton({
  shimmerColor = "#60A5FA",
  shimmerSize = "0.08em",
  shimmerDuration = "2.4s",
  borderRadius = "999px",
  background = "#060A10",
  children,
  className,
  ...rest
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as React.CSSProperties
      }
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap",
        "px-7 py-[14px]",
        "text-[10px] font-[800] tracking-[0.20em] uppercase text-white",
        "[border-radius:var(--radius)] [background:var(--bg)]",
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-[2px] hover:shadow-[0_18px_42px_rgba(37,99,235,0.28)]",
        "before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,var(--shimmer-color),transparent)]",
        "before:opacity-0 before:transition-opacity before:duration-700",
        "hover:before:opacity-100",
        "after:absolute after:inset-[var(--cut)] after:rounded-[inherit] after:[background:var(--bg)] after:z-[-1]",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
