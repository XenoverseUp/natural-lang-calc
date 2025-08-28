import type { CSSProperties } from "react";
import type { WithClassName } from "@/lib/types";

import { cn } from "@/lib/utils";

type Props = {
  opacity?: number;
  invert?: boolean;
} & WithClassName;

export default function Background({ className, opacity = 0.1, invert = false }: Props) {
  return (
    <div
      style={
        {
          "--grid-color": invert ? `rgba(255 255 255 / ${opacity})` : `rgba(0 0 0 / ${opacity})`,
        } as CSSProperties
      }
      className={cn(
        className,
        "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
        "[background-image:linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)]",
      )}
    />
  );
}
