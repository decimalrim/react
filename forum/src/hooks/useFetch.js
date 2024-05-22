import { useEffect, useState } from "react";

export function useFetch(initialValue, fnFetch, param) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // 어떨때에 한번만 동작되게 해라로 useEffect 씀
  useEffect(() => {
    const fetchingData = async () => {
      const json = await fnFetch({ ...param });
      setData(json);
      setIsLoading(false);
    };
    fetchingData();
  }, [fnFetch, param]);

  return { data, isLoading, setData };
}
