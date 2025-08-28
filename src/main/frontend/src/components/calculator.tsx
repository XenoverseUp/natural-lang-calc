import CalculatorForm from "./calculator-form";
import Background from "./ui/background";

export default function Calculator() {
  return (
    <div className="h-full bg-blue-500/10  w-full lg:max-w-xl relative flex items-center justify-center overflow-hidden p-8">
      <Background className="absolute inset-0 -z-10" />
      <div className="aspect-[9_/_16] border-8 border-slate-800 max-w-sm w-full rounded-[2.5rem] bg-white shadow-2xl space-y-4">
        <header className="flex items-center justify-center h-12">
          <h2 className="text-sm text-center rounded-full px-4 py-1">Calculator</h2>
        </header>
        <CalculatorForm />
      </div>
    </div>
  );
}
