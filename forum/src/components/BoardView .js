import { useEffect, useState } from "react";
import WriteBoardForm from "./WriteBoardForm";
import ModifyBoardForm from "./ModifyBoardForm";

export default function BoardView({
  selectedBoardId,
  setSelectedBoardId,
  token,
  setNeedReload,
  myInfo,
}) {
  const [boardItem, setBoardItem] = useState();
  const [isModifyMode, setIsModifyMode] = useState(false);

  const onModifyClickHandler = () => {
    setIsModifyMode(true);
  };

  const onDeleteClickHandler = async () => {
    const response = await fetch(
      `http://localhost:8080/api/v1/boards/${boardItem.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    const json = await response.json();
    if (json.body) {
      // 삭제 성공!
      // 목록 컴포넌트를 노출
      setSelectedBoardId(undefined);
      setNeedReload(Math.random());
    } else {
      // 삭제 실패!
      // 실패한 사유를 알려줘야 한다
      console.log(json);
      alert(json.errors);
    }
  };

  // 목록보기 버튼 눌렀을때 목록으로 돌아가기
  const onViewListClickHandler = () => {
    setSelectedBoardId(undefined);
  };

  useEffect(() => {
    const loadBoard = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/boards/${selectedBoardId}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      const json = await response.json();
      setBoardItem(json.body);
    };
    loadBoard();
    // []에는 재실행 되기 위한 것들을 모두 적어줌
  }, [token, selectedBoardId]);

  return (
    <>
      <div>
        {!boardItem && <div>데이터를 불러오는 중입니다.</div>}
        {boardItem && (
          <div>
            <h3>{boardItem.subject}</h3>
            <div>
              작성자: {boardItem.memberVO.name} ({boardItem.email})
            </div>
            <div>조회수: {boardItem.viewCnt}</div>
            <div>작성일: {boardItem.crtDt}</div>
            {boardItem.mdfyDt && <div>수정일: {boardItem.mdfyDt}</div>}
            {boardItem.originFileName && (
              <div>첨부파일: {boardItem.originFileName}</div>
            )}
            <div>
              <pre>{boardItem.content}</pre>
            </div>
          </div>
        )}
        {isModifyMode && (
          <ModifyBoardForm
            token={token}
            setIsWriteMode={setIsModifyMode}
            setNeedReload={setNeedReload}
          />
        )}
        <div className="button-area right-align">
          {myInfo &&
            boardItem &&
            ((myInfo && myInfo.email === boardItem.email) ||
              myInfo.adminYn === "Y") && (
              <>
                <button onClick={onModifyClickHandler}>수정</button>
                <button onClick={onDeleteClickHandler}>삭제</button>
              </>
            )}
          <button onClick={onViewListClickHandler}>목록보기</button>
        </div>
      </div>
    </>
  );
}
