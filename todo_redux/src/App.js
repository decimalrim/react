import { useState } from "react";
import TodoApp from "./components/TodoApp";
import ReduxProvider from "./stores/redux/store";

function App() {
  console.log("Run App");

  return (
    <ReduxProvider>
      <TodoApp />;
    </ReduxProvider>
  );
}

export default App;
