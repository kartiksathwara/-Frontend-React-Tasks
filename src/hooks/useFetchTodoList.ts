// // src/hooks/useFetchTodoList.ts
// import { useDataFetch } from "./useDataFetch";
// import { apiService } from "../api/ApiService";
// import { Todo } from "../redux/todoSlice";
// export const useFetchTodoList = (disableAuto = false) =>
//   useDataFetch<Todo[]>([], () => apiService.get("/todos"), disableAuto);



// useFetchTodoList.ts
import useDataFetch from "./useDataFetch";
import { api } from "../api/APIServices";
export const useFetchTodoList = (token: string, disableAutoFetch = false) => {
  return useDataFetch({
    fetchFn: () => api.getTodos(token),
    disableAutoFetch,
  });
};
