/**
 * props: {title: "", color="", onClick: function() {}}
 */
export function Section({ title, color, onKeyUp, onClick }) {
  // App Component가 관리하는 state가 변경되어
  // App Component가 재실행 되고
  // App Component 하위 컴포넌트인 Section Component도 재실행 된다.
  console.log("Run Section");
  console.log("Title", title);
  console.log("Color", color);
  console.log("onKeyUp", onKeyUp);
  console.log("onClick", onClick);

  const sectionStyle = {
    backgroundColor: "#CCC",
    color: color,
  };

  /**
   * Tag 혹은 Component의 Attribute를 작성할 때엔, 아래 규칙을 지켜야 한다.
   * 1. Attribute의 값이 문자열 이라면 ""로 작성한다.
   * 2. Attribute의 값이 문자열이 아니라면 {값} 으로 작성. -> {}로 작성하는 것을 '인터폴레이션' 이라고 함
   * 3. Attribute의 값이 변수/상수/객체/함수 등 이라면 {변수/상수/객체/함수} 로 작성한다.
   */
  return (
    <div>
      <section style={sectionStyle} onClick={onClick}>
        This is {title} Component.
      </section>
    </div>
  );
}
