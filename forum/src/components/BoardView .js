import { useCallback, useEffect, useMemo, useState } from "react";
import ModifyBoardForm from "./ModifyBoardForm";
import { deleteBoard, loadOndBoard, viewListClick } from "../http/http";
import { useFetch } from "../hooks/useFetch";

export default function BoardView({
  selectedBoardId,
  setSelectedBoardId,
  token,
  setNeedReload,
  myInfo,
}) {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [needReloadDetail, setNeedReloadDetail] = useState();

  const onModifyClickHandler = () => {
    setIsModifyMode(true);
  };

  const onDeleteClickHandler = async () => {
    // http.js
    const json = await deleteBoard(token, selectedBoardId);

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

  // 아래 useEffect대신 useFetch를 사용해 간단하게 변경하기.
  const fetchLoadOneBoard = useCallback(loadOndBoard, []);

  const fetchParam = useMemo(() => {
    return { selectedBoardId, token };
  }, [selectedBoardId, token]);

  const { data, isLoading } = useFetch(
    undefined,
    fetchLoadOneBoard,
    fetchParam
  );

  const { body: boardItem } = data || {};

  // useEffect(() => {
  //   const loadBoard = async () => {
  //     const json = await loadOndBoard(token, selectedBoardId);

  //     setBoardItem(json.body);
  //   };
  //   loadBoard();
  //   // []에는 재실행 되기 위한 것들을 모두 적어줌
  // }, [token, selectedBoardId, needReloadDetail]);

  return (
    <>
      <div>
        {isLoading && <div>데이터를 불러오는 중입니다.</div>}
        {boardItem && !isModifyMode && (
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
            boardItem={boardItem}
            setIsModifyMode={setIsModifyMode}
            setNeedReload={setNeedReload}
            setNeedReloadDetail={setNeedReloadDetail}
            selectedBoardId={selectedBoardId}
          />
        )}
        <div className="button-area right-align">
          {myInfo &&
            boardItem &&
            !isModifyMode &&
            ((myInfo && myInfo.email === boardItem.email) ||
              myInfo.adminYn === "Y") && (
              <>
                <button onClick={onModifyClickHandler}>수정</button>
                <button onClick={onDeleteClickHandler}>삭제</button>
              </>
            )}
          {!isModifyMode && (
            <button onClick={onViewListClickHandler}>목록보기</button>
          )}
        </div>
      </div>
    </>
  );
}
