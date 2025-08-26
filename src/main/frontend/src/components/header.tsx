import { cn } from "@/lib/utils";
import type { ClassValue } from "clsx";

interface Props {
  className?: ClassValue;
}

export default function Header({ className }: Props) {
  return (
    <header className={cn(className)}>
      <h1>Natural Language Calculator</h1>
    </header>
  );
}
