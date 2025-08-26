import Landing from "./components/landing";

import Calculator from "./components/calculator";

function App() {
  return (
    <div className="h-screen w-screen relative flex items-center">
      <Landing className="grow hidden lg:block" />
      <Calculator />
    </div>
  );
}

export default App;
