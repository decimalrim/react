import { useContext } from "react";
import TodoContext from "../contexts/TodoContext";

/**
 * Todo Item을 관리하는 Component
 *
 * props: todo = {id: "", task: "", dueDate: "", isDone: false}
 *        onDone = function()...
 */
export default function Todo({ todo }) {
  const { done: onDone } = useContext(TodoContext);

  const { id, task, dueDate, isDone } = todo;

  const styles = {
    borderBottom: "1px solid #ccc",
    padding: "1rem",
    display: "flex",
    color: isDone ? "#ccc" : "#333",
    textDecoration: isDone ? "line-through" : "none",
  };

  return (
    <li style={styles}>
      <div style={{ marginRight: "1rem" }}>
        <input
          type="checkbox"
          key={id}
          defaultValue={id}
          checked={isDone ? "checked" : ""}
          onChange={onDone}
        />
      </div>
      <div style={{ flexGrow: 1 }}>{task}</div>
      <div>{dueDate}</div>
    </li>
  );
}
