import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import grammar from "@/lib/localization/grammar.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getClientLocale() {
  return (navigator.language || navigator.languages[0] || "en-US").split("-").at(0)!;
}

export function isValidNumberWord(val: string, language: "en" | "tr"): boolean {
  const words = grammar[language] || grammar.en;
  const pattern = `^(${words.join("|")})(\\s+(${words.join("|")}))*$`;
  const regex = new RegExp(pattern, "i"); // case insensitive

  return regex.test(val);
}
