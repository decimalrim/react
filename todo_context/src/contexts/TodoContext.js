import { createContext, useReducer, useState } from "react";
import { todoReducers } from "../reducers/todoReducers";
import { type } from "@testing-library/user-event/dist/type";

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
  const [todoState, todoDispatcher] = useReducer(todoReducers, []);

  // Provider가 관리할 State와 함수들을 작성.
  // useReducer로 변경
  // State 변경 함수(add, done)들을 Reducer로 분리
  // Context가 비교적 가벼워지고 State를 관리하기에 조금더 편리해진다.
  const contextValue = {
    todo: todoState,
    done: (event) => {
      const checkbox = event.currentTarget;
      const id = parseInt(checkbox.value);
      todoDispatcher({
        type: "DONE",
        payload: { id, isDone: checkbox.checked },
      });
    },
    add: (task, dueDate) => {
      todoDispatcher({ type: "ADD", payload: { task, dueDate } });
    },
  };
  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
}
