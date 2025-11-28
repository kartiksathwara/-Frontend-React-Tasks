import useDataFetch from "./useDataFetch";
import { api } from "../api/APIServices";
export const useFetchTodoDetails = (id: string, token: string, disableAutoFetch = false) => {
  return useDataFetch({
    fetchFn: () => api.getTodoDetails(id, token),
    disableAutoFetch,
  });
};
