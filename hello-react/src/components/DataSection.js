/**
 * props: {color="", children, onClick: function() {}}
 */
export function DataSection({ color, children, onClick }) {
  console.log("Run DataSection");

  const sectionStyle = {
    backgroundColor: "#CCC",
    color: color,
  };

  return (
    <section style={sectionStyle} onClick={onClick}>
      {/** 여는 컴포넌트와 닫는 컴포넌트 사이에 작성된 내용이 children props로 전달된다. */}
      {children}
    </section>
  );
}
