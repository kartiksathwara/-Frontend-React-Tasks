// import useDataFetch from "./useDataFetch";
// import { api } from "../api/APIServices";
// import type { TodoItem } from "../types/todo";

// export const useFetchTodoDetails = (id: string, disableAutoFetch = false) =>
//   useDataFetch<TodoItem>({
//     initState: {
//       id: "",
//       title: "",
//       description: "",
//       usersAttached: [],
//     },
//     fetchFn: () => api.getTodoDetails<TodoItem>(id),
//     disableAutoFetch,
//   });



import { useEffect, useState } from "react";
import { api } from "../api/APIServices";
import type { TodoItem } from "../types/todo";

export const useFetchTodoDetails = (id: string, disableAutoFetch = false) => {
  const [data, setData] = useState<TodoItem>({
    id: "",
    title: "",
    description: "",
    usersAttached: [],
  });
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>(null);

  const refetch = async () => {
    try {
      setIsFetching(true);
      const res = await api.getTodoDetails(id);
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

  return { data, isFetching, isSuccess, isError, error, errorMessage: error?.message, refetch };
};
