import { useState } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

export default function TodoApp() {
  const [todo, setTodo] = useState([]);
  const styles = {
    backgroundColor: "#FFF",
    margin: "0 auto",
    marginTop: "1rem",
    width: "50rem",
  };

  const onDoneHandler = (event) => {
    const checkbox = event.currentTarget;
    const id = parseInt(checkbox.value);

    // 데이터만 바꾸는게 아니라 메모리주소를 바꾸는 것.
    setTodo((prevTodo) =>
      prevTodo.map((todo) => {
        if (todo.id === id) {
          todo.isDone = checkbox.checked;
        }
        // 객체리터럴을 펼쳐서 새롭게 만들어라.
        return { ...todo };
      })
    );
  };

  return (
    <div style={styles}>
      <h4 style={{ padding: "1rem" }}>
        완료: {todo.filter((item) => item.isDone).length} / 미완료:{" "}
        {todo.filter((item) => !item.isDone).length}
      </h4>
      <ul>
        {todo.map((todo) => (
          <Todo key={todo.id} todo={todo}>
            <input
              type="checkbox"
              key={todo.id}
              defaultValue={todo.id}
              checked={todo.isDone ? "checked" : ""}
              onChange={onDoneHandler}
            />
          </Todo>
        ))}
      </ul>
      <AddTodo setTodo={setTodo} />
    </div>
  );
}
