export function Data({ textArray }) {
  // textArray의 값 형태가
  // ["abc", "def", "a", "b"]로 하고싶으면
  // 변환이 필요.
  // const divTags = [<div key="1">abc</div>, <div key="2">def</div>, <div key="3">a</div>, <div key="4">b</div>]

  return (
    <div>
      {
        // map -> 형태를 변환시킴. 위 "abc"를 <div>abc</div>게 바꾸는 것처럼.
        textArray.map((text, index) => (
          <div key={index}>{text}</div>
        ))
      }
    </div>
  );
}
