// // src/hooks/useFetchTodoDetails.ts
// import { useDataFetch } from "./useDataFetch";
// import apiService from "../api";
// import { Todo } from "../redux/todoSlice";

// export const useFetchTodoDetails = (id: string | null, disableAuto = false) =>
//   useDataFetch<Todo | null>(null as any, () => apiService.get(`/todos/${id}`), disableAuto);
