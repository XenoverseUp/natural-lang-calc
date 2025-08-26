import { cn } from "@/lib/utils";
import type { ClassValue } from "clsx";

interface Props {
  className?: ClassValue;
}

export default function Background({ className }: Props) {
  return (
    <div
      className={cn(
        className,
        "-z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]",
      )}
    ></div>
  );
}
