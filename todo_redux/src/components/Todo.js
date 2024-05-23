import { useRef } from "react";
import { useDispatch } from "react-redux";
import { doneTodo, todoActions } from "../stores/toolkit/store";

// todo 한가지에 대한 관리

/**
 * Todo Item을 관리하는 Component
 *
 * props: todo = {id: "", task: "", dueDate: "", isDone: false}
 */
export default function Todo({ todo, style }) {
  console.log("Run Todo");

  const { id, task, dueDate, isDone } = todo;

  const styles = {
    ...style,
    borderBottom: "1px solid #ccc",
    padding: "1rem",
    display: "flex",
    color: isDone ? "#ccc" : "#333",
    textDecoration: isDone ? "line-through" : "none",
  };

  const checkboxRef = useRef();
  const todoDispatch = useDispatch();

  const onDoneHandler = () => {
    const checkbox = checkboxRef.current;
    const checked = checkbox.checked;

    // Thunk dispatch 코드
    todoDispatch(doneTodo({ id, task, dueDate, isDone: checked }));

    // toolkit dispatch 코드
    // todoDispatch(todoActions.done({ id, isDone: checked }));

    // react-redux dispatch 코드
    // const payload = { id, isDone: checked };
    // todoDispatch({ type: "DONE", payload });
  };

  return (
    <li style={styles}>
      <div style={{ marginRight: "1rem" }}>
        <input
          type="checkbox"
          key={id}
          defaultValue={id}
          checked={isDone ? "checked" : ""}
          onChange={onDoneHandler}
          ref={checkboxRef}
        />
      </div>
      <div style={{ flexGrow: 1 }}>{task}</div>
      <div>{dueDate}</div>
    </li>
  );
}
