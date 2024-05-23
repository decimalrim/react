import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// 1. Slice store 생성.
//    "todo" slice store 생성.
const todoSliceStore = createSlice({
  // slice store의 이름
  name: "todo slice", // actions의 payload에 target: "todo slice"로 전달된다.
  // slice store의 초기 state 값.
  initialState: [],
  // slice store reducers 생성.
  reducers: {
    // 여기 state는 직접 변경가능함
    add(state, action) {
      console.log("todo > add: ", action);
      const payload = action.payload;
      state.push({
        id: state.length,
        isDone: false,
        task: payload.task,
        dueDate: payload.dueDate,
      });
    },
    done(state, action) {
      console.log("todo > done: ", action);

      const payload = action.payload;
      // payload: {id: 2, isDone: true}
      /* state: [
       *    {id: 0, isDone: false, task: "ABC", dueDate: "2024-05-23"}
       *    {id: 1, isDone: false, task: "ABC", dueDate: "2024-05-24"}
       *    {id: 2, isDone: false, task: "ABC", dueDate: "2024-05-25"}
       *    {id: 3, isDone: false, task: "ABC", dueDate: "2024-05-26"}
       * ]
       */

      // state 에서 id가 2인 객체 리터럴의 인덱스 값을 알아야 한다.
      //     const index = state.findIndex(조건함수);
      //     const index = state.findIndex(아이템 => 아이템.id === payload.id);
      // 만약, 인덱스의 값이 2라면,
      // state[2].isDone = payload.isDone;

      const { id, isDone } = payload;
      const index = state.findIndex((item) => item.id === id);
      state[index].isDone = isDone;
    },
  },
});

// 2. Redux Store 생성.
const toolkitStore = configureStore({
  reducer: {
    todo: todoSliceStore.reducer,
  },
});

// 3. Slice store Actions 공유.
export const todoActions = todoSliceStore.actions;

// 4. Provider Component 생성.
export default function ToolkitProvider({ children }) {
  return <Provider store={toolkitStore}>{children}</Provider>;
}
