import { DataSection } from "./components/DataSection.js";
import { Section } from "./components/Section.js";
import { useState } from "react";

function App() {
  // title state를 만듦 (초기값은 "Untitle")
  // 이 시점에 title의 값은 "untitle"
  const [title, setTitle] = useState("Untitle");

  const onKeyUpHandler = (event) => {
    const value = event.currentTarget.value;
    // state를 변경시키는 setTitle이 호출되는 순간
    // AppComponent는 재실행 된다.
    // state는 Component가 최초로 실행될 때, 초기값이 할당이 되고
    // state가 변경이 되어 AppComponent가 재실행이 되었을 때
    // title의 값은 마지막에 할당된 값으로 항상 유지.
    setTitle(value);
  };

  console.log("Run App Component");
  console.log("title state", title);

  /**
   * Section의 내용을 클릭했을 때 반응할 함수
   */
  const onClickHandler = () => {
    alert("클릭했습니다!");
  };

  return (
    <main>
      <div>
        <input
          type="text"
          placeholder="컴포넌트 이름을 입력하세요."
          onKeyUp={onKeyUpHandler}
        />
        {/** Props로 데이터를 전달할 때
         * 1. 문자열은 ""로 전송
         * 2. 그 외 모든 데이터는 {}에 작성
         */}
        <Section
          title={title}
          color="#F00"
          onKeyUp={onKeyUpHandler}
          onClick={onClickHandler}
        />
        <DataSection>state를 사용하지 않는 컴포넌트</DataSection>
      </div>
    </main>
  );
}

export default App;
