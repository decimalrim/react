import { createContext, useState } from "react";

/**
 * Context Store 생성.
 * TodoContext를 이용할 때, 자동완성(Context Assist)을 이용하기 위해서
 * Store의 원형을 작성.
 */
const TodoContext = createContext({
  todo: [],
  done: (event) => {},
  add: (task, dueDate) => {},
});
export default TodoContext;

/**
 * Context Store의 내용을 제공하기 위해서
 * TodoContextProvider Component를 생성.
 */
export function TodoContextProvider({ children }) {
  const [todo, setTodo] = useState([]);

  // Provider가 관리할 State와 함수들을 작성.
  const contextValue = {
    todo,
    done: (event) => {
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
    },
    add: (task, dueDate) => {
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
  };
  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
}
