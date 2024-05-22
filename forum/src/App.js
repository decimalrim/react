import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header";
import BoardApp from "./components/BoardApp";
import { loadMyData } from "./http/http";
import { useFetch } from "./hooks/useFetch";

export default function App() {
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
    <div className="main-container">
      <Header token={token} setToken={setToken} myInfo={myInfo} />
      <main>
        <BoardApp token={token} myInfo={myInfo} />
      </main>
    </div>
  );
}

// function App() {
//   // 서버가 발행해준 토큰을 기억하기 위한 state 생성.
//   const [token, setToken] = useState();

//   // React 에서 Spring Server로 데이터를 요청.
//   // API 로만 통신. 요청 JSON ---> JSON 응답.
//   // AJAX --> iframe + Form Request
//   // AJAX: form 요청 --> JSON / HTML 응답.

//   // API --> Browser --> Server
//   // API: JSON 요청 --> JSON

//   // Javascript의 내장 함수 (API 요청)
//   // 비동기 통신
//   // await가 동작하기 위해서는 상위 함수가 async 함수여야 한다.
//   // const response = await fetch("URL", Header ==> {})

//   // Spring Server에 접근하기 위한 JWT 발급.
//   useEffect(() => {
//     const loadToken = async () => {
//       const response = await fetch("http://localhost:8080/auth/token", {
//         body: JSON.stringify({
//           email: "hi@hi.com",
//           password: "ABCDefg1234",
//         }),
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       console.log(response);

//       // response 에서 body의 값을 알고 싶을 때, response.json() 을 호출.
//       // response.json() 함수 또한 비동기 함수.
//       // await response.json();
//       const body = await response.json();
//       console.log(body);
//       setToken(body.token + Math.random());
//     };

//     loadToken();
//   }, []);

//   // 이 컴포넌트가 실행될 때, 아이디와 패스워드를 통해
//   // 서버에게 로그인을 시도한다.
//   // 로그인 결과인 token을 가져와서 브라우저가 기억하도록 한다.

//   return <>{token}</>;
// }

// export default App;
