import { useEffect, useState } from "react";
import BoardView from "./BoardView ";
import WriteBoardForm from "./WriteBoardForm";

// 테이블
export default function BoardApp({ token, myInfo }) {
  // 게시글 노출을 위한 state
  const [boards, setBoards] = useState([]);

  const [needReload, setNeedReload] = useState();

  const [isWriteMode, setIsWriteMode] = useState(false);

  // 게시글 선택을 위한 state (상세내용)
  const [selectedBoardId, setSelectedBoardId] = useState();

  // 게시글을 선택한 상태인지 확인 (상세내용 위해)
  const isSelect = selectedBoardId !== undefined;

  // 게시글 불러오기
  // useEffect(() => {},[]);
  useEffect(() => {
    const loadBoard = async () => {
      if (!token) {
        // 로그아웃 하면 게시글 빈 배열로 안보이게 처리
        setBoards([]);
        return;
      }

      const response = await fetch("http://localhost:8080/api/v1/boards", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const json = await response.json();
      console.log(json);
      setBoards(json.body);
    };
    loadBoard();
  }, [token, needReload]);

  // 테이블 클릭했을 때 상세글
  const onRowClickHandler = (rowId) => {
    setSelectedBoardId(rowId);
  };

  const onWriteModeClickHandler = () => {
    setIsWriteMode(true);
  };

  return (
    <>
      {token && !isSelect && !isWriteMode && (
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>조회수</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((boardItem) => (
              <tr
                key={boardItem.id}
                onClick={() => onRowClickHandler(boardItem.id)}
              >
                <td>{boardItem.id}</td>
                <td>{boardItem.subject}</td>
                <td>{boardItem.memberVO.name}</td>
                <td>{boardItem.viewCnt}</td>
                <td>{boardItem.crtDt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {token && isSelect && !isWriteMode && (
        <BoardView
          myInfo={myInfo}
          token={token}
          selectedBoardId={selectedBoardId}
          setSelectedBoardId={setSelectedBoardId}
          setNeedReload={setNeedReload}
        />
      )}
      {isWriteMode && (
        <WriteBoardForm
          token={token}
          setIsWriteMode={setIsWriteMode}
          setNeedReload={setNeedReload}
        />
      )}
      {!token && <div>로그인이 필요합니다.</div>}
      {token && (
        <div className="button-area right-align">
          <button onClick={onWriteModeClickHandler}>게시글 등록</button>
        </div>
      )}
    </>
  );
}
