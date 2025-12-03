// // // src/hooks/useDataFetch.ts
// // import { useEffect, useRef, useState } from "react";

// // export function useDataFetch<T>(initState: T, fetchFn: () => Promise<T>, disableAutoFetch = false) {
// //   const [data, setData] = useState<T>(initState);
// //   const [isFetching, setIsFetching] = useState(false);
// //   const [isSuccess, setIsSuccess] = useState(false);
// //   const [isError, setIsError] = useState(false);
// //   const [error, setError] = useState<any | null>(null);
// //   const [errorMessage, setErrorMessage] = useState("");

// //   const mounted = useRef(true);
// //   useEffect(() => () => (mounted.current = false), []);

// //   const fetchData = async () => {
// //     setIsFetching(true);
// //     setIsError(false);
// //     setError(null);
// //     setErrorMessage("");
// //     try {
// //       const res = await fetchFn();
// //       if (!mounted.current) return;
// //       setData(res);
// //       setIsSuccess(true);
// //     } catch (err: any) {
// //       if (!mounted.current) return;
// //       setIsError(true);
// //       setError(err);
// //       setErrorMessage(err?.message || "Error");
// //     } finally {
// //       if (!mounted.current) return;
// //       setIsFetching(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (!disableAutoFetch) fetchData();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   return { data, isError, isFetching, error, errorMessage, isSuccess, refetch: fetchData } as const;
// // }


// import { useState, useEffect, useCallback } from "react";

// interface UseDataFetchProps<T> {
//   initState?: T;
//   fetchFn: () => Promise<{ ok: boolean; data: T }>;
//   disableAutoFetch?: boolean;
// }

// interface UseDataFetchReturn<T> {
//   data: T | null;
//   isFetching: boolean;
//   isError: boolean;
//   isSuccess: boolean;
//   error: unknown;
//   errorMessage: string | null;
//   refetch: () => void;
// }

// function useDataFetch<T>({
//   initState = null,
//   fetchFn,
//   disableAutoFetch = false,
// }: UseDataFetchProps<T>): UseDataFetchReturn<T> {
//   const [data, setData] = useState<T | null>(initState);
//   const [isFetching, setIsFetching] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState<unknown>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const fetchData = useCallback(async () => {
//     setIsFetching(true);
//     setIsError(false);
//     setIsSuccess(false);
//     setError(null);
//     setErrorMessage(null);

//     try {
//       const result = await fetchFn();
//       if (result.ok) {
//         setData(result.data);
//         setIsSuccess(true);
//       } else {
//         setIsError(true);
//         setErrorMessage("API returned error");
//       }
//     } catch (err: any) {
//       setIsError(true);
//       setError(err);
//       setErrorMessage(err?.message || "Something went wrong");
//     } finally {
//       setIsFetching(false);
//     }
//   }, [fetchFn]);

//   useEffect(() => {
//     if (!disableAutoFetch) {
//       fetchData();
//     }
//   }, [disableAutoFetch, fetchData]);

//   return { data, isFetching, isError, isSuccess, error, errorMessage, refetch: fetchData };
// }

// export default useDataFetch;




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
