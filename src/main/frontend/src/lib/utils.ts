import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getClientLocale() {
  return (navigator.language || navigator.languages[0] || "en-US").split("-").at(0)!;
}
