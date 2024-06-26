import { useRef } from "react";
import { modifyBoard } from "../../http/http";

export default function ModifyBoardForm({
  boardItem,
  token,
  setIsModifyMode,
  setNeedReload,
  setNeedReloadDetail,
  selectedBoardId,
}) {
  const subjectRef = useRef();
  const fileRef = useRef();
  const contentRef = useRef();

  const onCancelClickHandler = () => {
    setIsModifyMode(false);
  };

  const onSaveClickHandler = async () => {
    const subject = subjectRef.current.value;
    const content = contentRef.current.value;
    const file = fileRef.current.files[0];

    // http.js 함수 정의
    const json = await modifyBoard(
      token,
      selectedBoardId,
      subject,
      content,
      file
    );

    console.log(json);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setIsModifyMode(false);
      setNeedReload(Math.random());
      setNeedReloadDetail(Math.random());
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="subject">제목</label>
        <input
          type="text"
          id="subject"
          ref={subjectRef}
          defaultValue={boardItem.subject}
        />
      </div>
      <div>
        <label htmlFor="file">첨부파일</label>
        <input type="file" id="file" ref={fileRef} />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          ref={contentRef}
          defaultValue={boardItem.content}
        ></textarea>
      </div>
      <div className="button-area right-align">
        <button onClick={onCancelClickHandler}>취소</button>
        <button onClick={onSaveClickHandler}>수정</button>
      </div>
    </div>
  );
}
