// // useFetchTodoList.ts
// import useDataFetch from "./useDataFetch";
// import { api } from "../api/APIServices";
// import type { TodoItem } from "../types/todo";

// export const useFetchTodoList = () =>
//   useDataFetch<TodoItem[]>({
//     initState: [],
//     fetchFn: () => api.getTodoList<TodoItem[]>(),
//   });





import { useEffect, useState } from "react";
import { api } from "../api/APIServices";
import type { TodoItem } from "../types/todo";

export const useFetchTodoList = () => {
  const [data, setData] = useState<TodoItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>(null);

  const refetch = async () => {
    try {
      setIsFetching(true);
      const res = await api.getTodoList();
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
    refetch();
  }, []);

  return { data, isFetching, isSuccess, isError, error, errorMessage: error?.message, refetch };
};
