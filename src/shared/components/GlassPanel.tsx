import { cn } from "@/shared/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, hover = false, children, ...rest }, ref) => (
    <div ref={ref} className={cn("glass rounded-lg", hover && "glass-hover", className)} {...rest}>
      {children}
    </div>
  ),
);
GlassPanel.displayName = "GlassPanel";
