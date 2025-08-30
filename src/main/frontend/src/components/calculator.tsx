import type { WithClassName } from "@/lib/types";
import CalculatorForm from "./calculator-form";
import Background from "./ui/background";
import { cn } from "@/lib/utils";

type Props = WithClassName;

export default function Calculator({ className }: Props) {
  return (
    <section className={cn(className, "h-full bg-blue-500/10 relative flex items-center justify-center overflow-auto p-8")}>
      <Background className="absolute inset-0 -z-10" />

      <div className="size-full flex items-center justify-center flex-col gap-10">
        <h1 className="font-medium text-lg text-center text-slate-700 block lg:hidden">Natural Language Calculator</h1>

        <div className="flex flex-col border-8 border-slate-800 overflow-hidden max-w-md w-full rounded-[2.5rem] bg-white shadow-2xl">
          <header className="flex items-center justify-center h-10 bg-accent/50 border-b">
            <h2 className="text-sm text-center rounded-full px-4 py-1">Calculator</h2>
          </header>
          <CalculatorForm className="grow" />
        </div>
      </div>
    </section>
  );
}
