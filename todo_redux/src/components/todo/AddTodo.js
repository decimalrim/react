import { useRef, memo } from "react";
import { useDispatch } from "react-redux";
import { addSubTodo, addTodo } from "../../stores/toolkit/store";
// import { todoActions } from "../stores/toolkit/store";

/**
 * TODO 아이템을 등록하는 Component
 */
export default memo(function AddTodo({ style, sub, parentTodoId }) {
  console.log("Run AddTodo");

  const labelStyles = { flexShrink: 1, margin: "0.5rem 1rem" };
  const inputStyles = { flexGrow: 1 };
  const buttonStyles = { flexShrink: 1, margin: "0 0 0 1rem" };

  const taskRef = useRef();
  const dueDateRef = useRef();

  const todoDispatch = useDispatch();

  /**
   * 등록 버튼을 클릭했을 때의 핸들러.
   * setTodo를 이용해서 TODO 아이템을 등록해야 한다.
   */
  const onClickHandler = () => {
    // onAdd(taskRef.current.value, dueDateRef.current.value);

    // Thunk dispatch 코드
    const payload = {
      id: parseInt(Math.random() * 100_000_000),
      isDone: false,
      task: taskRef.current.value,
      dueDate: dueDateRef.current.value,
    };

    if (sub) {
      // 서브 todo 등록
      payload.parentTodoId = parentTodoId;
    }

    const thunk = sub ? addSubTodo(payload) : addTodo(payload);

    todoDispatch(thunk);

    // toolkit dispatch 코드
    // todoDispatch(
    //   // todoActions.add({
    //   //   task: taskRef.current.value,
    //   //   dueDate: dueDateRef.current.value,
    //   // })
    // );
    // redux dispatch 코드
    // todoDispatch({
    //   type: "ADD-TODO",
    //   payload: {
    //     task: taskRef.current.value,
    //     dueDate: dueDateRef.current.value,
    //   },
    // });
  };

  return (
    <div style={style}>
      <label htmlFor="task" style={labelStyles}>
        TASK
      </label>
      <input
        type="text"
        id="task"
        placeholder="Input Task"
        style={inputStyles}
        ref={taskRef}
      />

      <label htmlFor="due-date" style={labelStyles}>
        Due date
      </label>
      <input type="date" id="due-date" style={inputStyles} ref={dueDateRef} />

      <button style={buttonStyles} onClick={onClickHandler}>
        등록
      </button>
    </div>
  );
});
