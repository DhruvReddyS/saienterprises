import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  delay = 0,
  colorFrom = "#3B82F6",
  colorTo = "#60A5FA",
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--delay": `-${delay}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--border-width": `${borderWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:var(--border-width)_solid_transparent]",
        "[background:linear-gradient(#0000,#0000),linear-gradient(to_right,var(--color-from),var(--color-to))]",
        "[background-clip:padding-box,border-box] [background-origin:border-box]",
        "[mask:linear-gradient(white,white)_padding-box,_linear-gradient(white,white)]",
        "![mask-composite:xor]",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam",
        "after:[animation-delay:var(--delay)] after:[animation-duration:calc(var(--duration)*1s)]",
        "after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]",
        "after:[offset-anchor:calc(var(--size)*0.5px)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className,
      )}
    />
  );
}
