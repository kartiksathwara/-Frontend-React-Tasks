import { useEffect, useState } from "react";

interface UseDataFetchParams<T> {
  initState: T;
  fetchFn: () => Promise<T>;
  disableAutoFetch?: boolean;
}

export default function useDataFetch<T>({
  initState,
  fetchFn,
  disableAutoFetch = false,
}: UseDataFetchParams<T>) {
  const [data, setData] = useState<T>(initState);
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>(null);

  const refetch = async () => {
    try {
      setIsFetching(true);
      const res = await fetchFn();
      setData(res);
      setIsSuccess(true);
      setIsError(false);
    } catch (err: any) {
      setIsError(true);
      setError(err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!disableAutoFetch) refetch();
  }, []);

  return {
    data,
    isFetching,
    isSuccess,
    isError,
    error,
    errorMessage: error?.message,
    refetch,
  };
}
