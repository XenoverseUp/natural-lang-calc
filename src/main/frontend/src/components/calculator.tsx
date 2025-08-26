import Background from "./background";

export default function Calculator() {
  return (
    <div className="h-full bg-blue-500/10  w-full lg:max-w-xl relative flex items-center justify-center overflow-hidden p-8">
      <Background className="absolute inset-0" />
      <div className="aspect-[9_/_16] border-8 border-slate-900 max-w-sm w-full rounded-[2.5rem] bg-white shadow-2xl"></div>
    </div>
  );
}
