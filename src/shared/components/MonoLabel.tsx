import { cn } from "@/shared/lib/utils";
import { HTMLAttributes } from "react";

interface MonoLabelProps extends HTMLAttributes<HTMLSpanElement> {
  color?: "cyan" | "violet" | "phosphor" | "muted" | "danger";
}

const COLORS: Record<NonNullable<MonoLabelProps["color"]>, string> = {
  cyan: "text-cyan",
  violet: "text-violet",
  phosphor: "text-phosphor",
  muted: "text-foreground/40",
  danger: "text-danger",
};

export function MonoLabel({ color = "muted", className, children, ...rest }: MonoLabelProps) {
  return (
    <span
      className={cn("font-mono text-[11px] uppercase tracking-[0.15em]", COLORS[color], className)}
      {...rest}
    >
      {children}
    </span>
  );
}
