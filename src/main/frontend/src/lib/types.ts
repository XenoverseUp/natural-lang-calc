import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

export type WithClassName = {
  className?: ClassValue;
};

export type WithChildren = {
  children: ReactNode;
};

export enum OperationEnum {
  ADD = "ADD",
  SUBTRACT = "SUBTRACT",
  MULTIPLY = "MULTIPLY",
  DIVIDE = "DIVIDE",
  MOD = "MOD",
}
