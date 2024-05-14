import { useState } from "react";
import { Input } from "./components/Input";
import { Table } from "./components/Table";

function App() {
  const [textArray, setTextArray] = useState([]);

  return (
    <div>
      <Input setTextArray={setTextArray} />
      <Table textArray={textArray} />
    </div>
  );
}

export default App;
