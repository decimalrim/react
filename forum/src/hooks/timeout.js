import { useState } from "react";

/**
 * 함수의 이름이 use로 시작하면 React는 Custom Hook으로 인식한다.
 */
export function useTimeOut() {
  const [data, setData] = useState([]);
  // 데이터가 불러오기 전
  const [isLoading, setIsLoading] = useState(true);

  // 3초 뒤에 함수를 실행해라
  setTimeout(() => {
    setData((prevData) => [...prevData, "new Data"]);
    // 데이터가 다 불러와지면
    setIsLoading(false);
  }, 3000);

  // 객체리터럴로 반환
  return { data, isLoading };
}
