import { useState } from "react";
import TodoApp from "./components/TodoApp";

function App() {
  console.log("Run App");

  const [todo, setTodo] = useState([]);

  return <TodoApp todo={todo} setTodo={setTodo} />;
}

export default App;
