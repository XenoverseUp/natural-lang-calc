import { cn } from "@/lib/utils";
import type { ClassValue } from "clsx";
import { CalculatorIcon } from "lucide-react";
import { IconButton } from "./ui/button";
import OrderedList from "./ui/ordered-list";

interface Props {
  className?: ClassValue;
}

export default function Header({ className }: Props) {
  return (
    <header className={cn(className, "px-8 xl:px-16")}>
      <div className="p-2 rounded-lg bg-indigo-100 w-fit grid place-items-center border-indigo-500 border-2 border-b-4 mb-4">
        <CalculatorIcon className="text-indigo-600" />
      </div>
      <h1 className="bg-opacity-50 bg-gradient-to-b from-slate-950 to-slate-700 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
        Natural Language <br /> Calculator
      </h1>
      <p className="mt-6 text-balance text-muted-foreground">
        No need to think in symbols anymore — just type your calculation the way you would say it out loud. The Natural Language
        Calculator understands everyday language, so you can add, subtract, multiply, or divide without worrying about syntax or
        special formatting.
      </p>

      <OrderedList.Root className="mt-8 ml-6">
        <OrderedList.Step>Pick your native language.</OrderedList.Step>
        <OrderedList.Step>Enter two numbers as you pronounce it.</OrderedList.Step>
        <OrderedList.Step>Select your operation and calculate.</OrderedList.Step>
      </OrderedList.Root>
    </header>
  );
}
