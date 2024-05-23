import TodoApp from "./components/TodoApp";
// import ReduxProvider from "./stores/redux/store";
import ToolkitProvider from "./stores/toolkit/store";

function App() {
  console.log("Run App");

  // return (
  //   <ReduxProvider>
  //     <TodoApp />;
  //   </ReduxProvider>
  // );
  return (
    <ToolkitProvider>
      <TodoApp />
    </ToolkitProvider>
  );
}

export default App;
