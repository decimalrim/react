import { useCallback, useMemo } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

export default function TodoApp({ todo, setTodo }) {
  console.log("Run TodoApp");

  // const obj = useMemo(() => {
  //   return { A: 1, B: 2 };
  // }, []);
  const flexStyles = useMemo(() => {
    return { display: "flex", padding: "0.5rem", marginTop: "1rem" };
  }, []);

  const styles = {
    backgroundColor: "#FFF",
    margin: "0 auto",
    marginTop: "1rem",
    width: "50rem",
  };

  // [] <== Component가 처음 실행될 때에만 동작 (의존 배열)
  // const fn = useCallback(() => {}, []);
  // [todo] <== todo가 변경되었다면, 함수를 재생성하는 의존 배열
  //            todo가 변경되었을 때 동작.
  // const fn = useCallback(() => {}, [todo]);

  const onTodoHandler = useCallback(
    (task, dueDate) => {
      setTodo((prevTodos) => [
        ...prevTodos,
        {
          id: prevTodos.length,
          isDone: false,
          task,
          dueDate,
        },
      ]);
    },
    [setTodo]
  );

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
          <Todo
            key={todo.id}
            todo={todo}
            onDone={onDoneHandler}
            style={flexStyles}
          />
        ))}
      </ul>
      <AddTodo onAdd={onTodoHandler} style={flexStyles} />
    </div>
  );
}
