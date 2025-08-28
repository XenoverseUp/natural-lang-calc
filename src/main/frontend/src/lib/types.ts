import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

export type WithClassName = {
  className?: ClassValue;
};

export type WithChildren = {
  children: ReactNode;
};
