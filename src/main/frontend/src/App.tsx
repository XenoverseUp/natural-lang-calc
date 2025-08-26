import Header from "./components/header";

import Calculator from "./components/calculator";

function App() {
  return (
    <div className="h-screen w-screen relative flex items-center">
      <Header className="grow hidden lg:block" />
      <Calculator />
    </div>
  );
}

export default App;
