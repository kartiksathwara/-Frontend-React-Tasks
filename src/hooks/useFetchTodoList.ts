import useDataFetch from "./useDataFetch";
import { api } from "../api/APIServices";
export const useFetchTodoList = (token: string, disableAutoFetch = false) => {
  return useDataFetch({
    fetchFn: () => api.getTodos(token),
    disableAutoFetch,
  });
};
