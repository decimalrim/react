import { useContext } from "react";
import TodoContext from "../contexts/TodoContext";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

export default function TodoApp() {
  const { todo } = useContext(TodoContext);

  const styles = {
    backgroundColor: "#FFF",
    margin: "0 auto",
    marginTop: "1rem",
    width: "50rem",
  };

  return (
    <div style={styles}>
      <h4 style={{ padding: "1rem" }}>
        완료: {todo.filter((item) => item.isDone).length} / 미완료:{" "}
        {todo.filter((item) => !item.isDone).length}
      </h4>
      <ul>
        {todo.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
      <AddTodo />
    </div>
  );
}
