import { useCallback, useMemo, useState } from "react";
import BoardView from "./BoardView ";
import WriteBoardForm from "./WriteBoardForm";
import { loadBoardList } from "../../http/http";
import { useFetch } from "../../hooks/useFetch";

let pageNo = 0;
// 테이블
export default function BoardApp({ token, myInfo }) {
  // 게시글 노출을 위한 state
  // const [boards, setBoards] = useState([]);

  const [needReload, setNeedReload] = useState();

  const [isWriteMode, setIsWriteMode] = useState(false);

  // 게시글 선택을 위한 state (상세내용)
  const [selectedBoardId, setSelectedBoardId] = useState();

  // 게시글을 선택한 상태인지 확인 (상세내용 위해)
  const isSelect = selectedBoardId !== undefined;

  // 게시글 불러오기
  // 아래 useEffect대신 useFetch를 사용해 간단하게 변경하기.
  const fetchLoadBoardList = useCallback(loadBoardList, []);

  const fetchParam = useMemo(() => {
    return { token, needReload };
  }, [token, needReload]);

  const { data, setData } = useFetch(undefined, fetchLoadBoardList, fetchParam);

  const { count, pages, next } = data || {};

  const { body: boards } = data || {};

  // // useEffect(() => {},[]);
  // useEffect(() => {
  //   const loadBoard = async () => {
  //     if (!token) {
  //       // 로그아웃 하면 게시글 빈 배열로 안보이게 처리
  //       setBoards([]);
  //       return;
  //     }

  //     // http.js 에서 함수 정리해줌
  //     const json = await loadBoardList(token);

  //     console.log(json);
  //     setBoards(json.body);
  //   };
  //   loadBoard();
  // }, [token, needReload]);

  // 테이블 클릭했을 때 상세글
  const onRowClickHandler = (rowId) => {
    setSelectedBoardId(rowId);
  };

  const onLoadMoreClickHandler = async () => {
    const json = await loadBoardList({ token, pageNo: ++pageNo });
    setData((prevData) => {
      return {
        ...prevData,
        next: json.next,
        pages: json.pages,
        errors: json.errors,
        count: json.count,
        body: [...prevData.body, ...json.body],
      };
    });
  };

  const onWriteModeClickHandler = () => {
    setIsWriteMode(true);
  };

  return (
    <>
      {token && !isSelect && !isWriteMode && (
        <>
          <div>총 {count} 개의 게시글이 검색되었습니다.</div>
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
              {boards && (
                <>
                  {boards &&
                    boards.map((boardItem) => (
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
                </>
              )}
            </tbody>
          </table>
        </>
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
          {next && <button onClick={onLoadMoreClickHandler}>더보기</button>}
          <button onClick={onWriteModeClickHandler}>게시글 등록</button>
        </div>
      )}
    </>
  );
}
