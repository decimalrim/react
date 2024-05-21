import { useRef } from "react";

export default function ModifyBoardForm({
  token,
  setIsWriteMode,
  setNeedReload,
}) {
  const subjectRef = useRef();
  const fileRef = useRef();
  const contentRef = useRef();

  const onCancelClickHandler = () => {
    setIsWriteMode(false);
  };

  const onSaveClickHandler = async () => {
    const subject = subjectRef.current.value;
    const content = contentRef.current.value;
    // 파일은 선택된 파일들의 배열 중 0번째를 가져와라.
    const file = fileRef.current.files[0];

    // file 업로드를 위해 formData 생성. -> 이곳 작성한게 multipart/form-data로 전달.
    const formData = new FormData(); // Javascript bulit-in 객체.
    formData.append("subject", subject);
    formData.append("content", content);
    formData.append("file", file);

    const response = await fetch("http://localhost:8080/api/v1/boards", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });
    const json = await response.json();
    console.log(json);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setIsWriteMode(false);
      setNeedReload(Math.random());
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="subject">제목</label>
        <input type="text" id="subject" ref={subjectRef} />
      </div>
      <div>
        <label htmlFor="file">첨부파일</label>
        <input type="file" id="file" ref={fileRef} />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea id="content" ref={contentRef}></textarea>
      </div>
      <div className="button-area right-align">
        <button onClick={onCancelClickHandler}>취소</button>
        <button onClick={onSaveClickHandler}>등록</button>
      </div>
    </div>
  );
}
