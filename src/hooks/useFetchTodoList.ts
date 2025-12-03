// import useDataFetch from "./useDataFetch";
// import { api } from "../api/APIServices";
// export const useFetchTodoList = (token: string, disableAutoFetch = false) => {
//   return useDataFetch({
//     fetchFn: () => api.getTodos(token),
//     disableAutoFetch,
//   });
// };




import useDataFetch from "./useDataFetch";
import { getTodoList } from "../api/todoServices";
export default function useFetchTodoList() {
  return useDataFetch({
    initState: [],
    fetchFn: async () => await getTodoList(),
  });
}
