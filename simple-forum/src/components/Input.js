import { useState } from "react";

export function Input({ setTextArray }) {
  // 텍스트를 관리하는 state
  // 기본값 : undefined
  const [text, setText] = useState();
  // 지금까지 입력한 text를 관리하는 배열 state
  // 기본값 : undefined ==> [] 배열로 바꿔줘야함.
  // useState([]); 배열을 넣어주었으니 textArray 기본값은 현재 배열 []
  //   const [textArray, setTextArray] = useState([]);

  const onKeyUpHandler = (event) => {
    const textValue = event.currentTarget.value;
    setText(textValue);
  };

  const onClickHandler = () => {
    // textArray = []
    // textArray = ["abc"]
    // textArray = ["abc", "def"]
    // setTextArray([...textArray, text]); => 옛날방식
    setTextArray((prevState) => [...prevState, text]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="텍스트를 입력하세요."
        onKeyUp={onKeyUpHandler}
      />
      <button onClick={onClickHandler}>저장</button>
    </div>
  );
}
