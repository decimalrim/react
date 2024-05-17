import TodoApp from "./components/TodoApp";
import { TodoContextProvider } from "./contexts/TodoContext";

function App() {
  return (
    <TodoContextProvider>
      <TodoApp />
    </TodoContextProvider>
  );
}

export default App;
