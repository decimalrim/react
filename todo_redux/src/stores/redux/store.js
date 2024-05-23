import { Provider } from "react-redux";
// createStore 가 Deprecated
import { createStore } from "redux";

// 1. React redux reducer 생성.
function reduxReducer(state = [], action) {
  // action: {type, payload}

  //   const type = action.type;
  //   const payload = action.payload;

  // 위처럼 하나하나 가져오는 방법보다 객체리터럴로 작성.
  const { type, payload } = action;

  // 새로운 todo 생성
  if (type === "ADD-TODO") {
    return [
      ...state,
      {
        id: state.length,
        isDone: false,
        task: payload.task,
        dueDate: payload.dueDate,
      },
    ];
  } else if (type === "DONE") {
    return state.map((todo) => {
      if (todo.id === payload.id) {
        todo.isDone = payload.isDone;
      }
      // 객체리터럴을 펼쳐서 새롭게 만들어라.
      return { ...todo };
    });
  }

  return state;
}

// 2. React redux reducer를 이용하는 Redux Store 생성.
function reduxStore() {
  return createStore(reduxReducer);
}

// 3. Redux Store를 제공할 Redux Provider 생성.
export default function ReduxProvider({ children }) {
  // 3-1. Redux Store 객체 생성.
  const reduxStoreObject = reduxStore();

  // 3-2. Provider 생성.
  return <Provider store={reduxStoreObject}>{children}</Provider>;
}
