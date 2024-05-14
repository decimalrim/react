import { useState } from "react";

export function Input({ setTextArray }) {
  const [name, setName] = useState();
  const onKeyUpNameHandler = (event) => {
    const nameValue = event.currentTarget.value;
    setName(nameValue);
  };

  const [age, setAge] = useState();
  const onKeyUpAgeHandler = (event) => {
    const ageValue = event.currentTarget.value;
    setAge(ageValue);
  };

  const onClickHandler = () => {
    setTextArray((preState) => [...preState, { name: name, age: age }]);
  };

  return (
    <div>
      Name:
      <input
        type="text"
        // value="name"
        placeholder="이름을 입력하세요."
        onKeyUp={onKeyUpNameHandler}
      />
      <div></div>
      Age:
      <input
        type="text"
        // value="age"
        placeholder="나이를 입력하세요."
        onKeyUp={onKeyUpAgeHandler}
      />
      <button onClick={onClickHandler}>저장</button>
    </div>
  );
}
