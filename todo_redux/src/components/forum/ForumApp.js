import { useCallback, useMemo, useState } from "react";
import BoardApp from "./BoardApp";
import Header from "./Header";
import { useFetch } from "../../hooks/useFetch";
import { loadMyData } from "../../http/http";

export default function ForumApp() {
  const [token, setToken] = useState();

  // 메모리가 바뀌지 않게 해준다.
  const fetchLoadMyData = useCallback(() => {
    if (token) {
      return loadMyData;
    } else {
      return () => {
        return undefined;
      };
    }
  }, [token]);

  const fetchToken = useMemo(() => {
    return { token };
  }, [token]);

  const { data } = useFetch(undefined, fetchLoadMyData(), fetchToken);
  // undefined라면 {}을 주고, undefined가 아니라면 data를 넘겨라
  const { body: myInfo } = data || {};

  return (
    <>
      <Header token={token} setToken={setToken} myInfo={myInfo} />
      <main>
        <BoardApp token={token} myInfo={myInfo} />
      </main>
    </>
  );
}
