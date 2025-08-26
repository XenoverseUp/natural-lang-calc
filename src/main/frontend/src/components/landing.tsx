import { cn } from "@/lib/utils";
import type { ClassValue } from "clsx";
import { CalculatorIcon } from "lucide-react";

import OrderedList from "./ui/ordered-list";

interface Props {
  className?: ClassValue;
}

export default function Landing({ className }: Props) {
  return (
    <header className={cn(className, "px-8 xl:px-16")}>
      <div className="p-2 rounded-lg bg-indigo-100 w-fit mx-auto grid place-items-center mb-4">
        <CalculatorIcon className="text-indigo-600" />
      </div>
      <h1 className="bg-opacity-50 bg-gradient-to-b text-center from-slate-900 to-slate-700 bg-clip-text text-4xl font-bold text-transparent md:text-5xl whitespace-nowrap">
        Natural Language <br /> Calculator
      </h1>
      <p className="mt-10 text-balance text-muted-foreground text-center max-w-2xl mx-auto">
        No need to think in symbols anymore — just type your calculation the way you would say it out loud. The Natural Language
        Calculator understands everyday language, so you can add, subtract, multiply, or divide without worrying about numbers.
      </p>

      <OrderedList.Root className="mt-8 mx-auto">
        <OrderedList.Step>Pick your native language.</OrderedList.Step>
        <OrderedList.Step>Enter two numbers as you pronounce it.</OrderedList.Step>
        <OrderedList.Step>Select your operation and calculate.</OrderedList.Step>
      </OrderedList.Root>

      <p className="absolute left-8 bottom-6 text-xs text-muted-foreground">&copy; Can Durmus {new Date().getFullYear()}</p>
    </header>
  );
}
