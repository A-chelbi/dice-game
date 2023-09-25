import { Suspense, lazy } from "react";
import "./App.css";
import Loader from "./Loader/Loader";

const DiceGame = lazy(() => import("./DiceGame/DiceGame"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <DiceGame />
      </Suspense>
    </div>
  );
}

export default App;
