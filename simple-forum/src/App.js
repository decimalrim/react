import { useState } from "react";
import { Input } from "./components/Input";
import { Data } from "./components/Data";

function App() {
  const [textArray, setTextArray] = useState([]);

  return (
    <div>
      <Input setTextArray={setTextArray} />
      <Data textArray={textArray} />
    </div>
  );
}

export default App;
