import { useEffect, useState } from "react";

interface UseDataFetchParams {
  initState: any;
  fetchFn: () => Promise<any>;
  disableAutoFetch?: boolean;
}

export default function useDataFetch({
  initState,
  fetchFn,
  disableAutoFetch = false,
}: UseDataFetchParams) {
  const [data, setData] = useState<any>(initState);
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
