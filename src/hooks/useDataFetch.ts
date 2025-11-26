// // src/hooks/useDataFetch.ts
// import { useEffect, useRef, useState } from "react";

// export function useDataFetch<T>(initState: T, fetchFn: () => Promise<T>, disableAutoFetch = false) {
//   const [data, setData] = useState<T>(initState);
//   const [isFetching, setIsFetching] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState<any | null>(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   const mounted = useRef(true);
//   useEffect(() => () => (mounted.current = false), []);

//   const fetchData = async () => {
//     setIsFetching(true);
//     setIsError(false);
//     setError(null);
//     setErrorMessage("");
//     try {
//       const res = await fetchFn();
//       if (!mounted.current) return;
//       setData(res);
//       setIsSuccess(true);
//     } catch (err: any) {
//       if (!mounted.current) return;
//       setIsError(true);
//       setError(err);
//       setErrorMessage(err?.message || "Error");
//     } finally {
//       if (!mounted.current) return;
//       setIsFetching(false);
//     }
//   };

//   useEffect(() => {
//     if (!disableAutoFetch) fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return { data, isError, isFetching, error, errorMessage, isSuccess, refetch: fetchData } as const;
// }


