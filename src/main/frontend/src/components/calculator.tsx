import CalculatorForm from "./calculator-form";
import Background from "./ui/background";

export default function Calculator() {
  return (
    <div className="h-full bg-blue-500/10  w-full lg:max-w-xl relative flex items-center justify-center overflow-hidden p-8">
      <Background className="absolute inset-0 -z-10" />
      <div className="flex flex-col border-8 border-slate-800 overflow-hidden max-w-md w-full rounded-[2.5rem] bg-white shadow-2xl">
        <header className="flex items-center justify-center h-10 bg-accent border-b">
          <h2 className="text-sm text-center rounded-full px-4 py-1">Calculator</h2>
        </header>
        <CalculatorForm className="grow" />
      </div>
    </div>
  );
}
