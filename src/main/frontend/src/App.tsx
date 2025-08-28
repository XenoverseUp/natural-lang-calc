import Landing from "./components/landing";

import Calculator from "./components/calculator";
import LanguageSwitcher from "./components/locale-switcher";

function App() {
  return (
    <div className="h-screen w-screen relative flex items-center">
      <LanguageSwitcher className="absolute left-4 top-4" />
      <Landing className="grow hidden lg:block" />
      <Calculator />
    </div>
  );
}

export default App;
