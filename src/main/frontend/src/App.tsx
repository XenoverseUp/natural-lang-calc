import Landing from "@/components/landing";
import Calculator from "@/components/calculator";

import LanguageSwitcher from "@/components/locale-switcher";

function App() {
  return (
    <div className="h-screen w-screen relative flex items-center">
      <LanguageSwitcher className="absolute left-4 top-4" />
      <Landing className="grow hidden lg:block min-w-sm flex-1" />
      <Calculator className="grow flex-1" />
    </div>
  );
}

export default App;
