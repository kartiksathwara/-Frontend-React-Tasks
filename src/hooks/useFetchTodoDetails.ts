// import useDataFetch from "./useDataFetch";
// import { api } from "../api/APIServices";
// export const useFetchTodoDetails = (id: string, token: string, disableAutoFetch = false) => {
//   return useDataFetch({
//     fetchFn: () => api.getTodoDetails(id, token),
//     disableAutoFetch,
//   });
// };



// import useDataFetch from "./useDataFetch";
// import { getTodoDetails } from "../api/todoServices";

// export default function useFetchTodoDetails(id) {
//   return useDataFetch({
//     initState: null,
//     fetchFn: async () => await getTodoDetails(id),
//     disableAutoFetch: !id,
//   });
// }
// useFetchTodoDetails.ts
import useDataFetch from "./useDataFetch";
import { api } from "../api/APIServices";
import type { TodoItem } from "../types/todo";

export const useFetchTodoDetails = (id: string, disableAutoFetch = false) =>
  useDataFetch<TodoItem>({
    initState: {
      id: "",
      title: "",
      description: "",
      usersAttached: [],
    },
    fetchFn: () => api.getTodoDetails<TodoItem>(id),
    disableAutoFetch,
  });
