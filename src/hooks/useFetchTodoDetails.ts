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

import useDataFetch from "./useDataFetch";
import { getTodoDetails } from "../api/todoServices";

export default function useFetchTodoDetails(id: string | null) {
  return useDataFetch({
    initState: null,
    fetchFn: async () => await getTodoDetails(id!),
    disableAutoFetch: !id,
  });
}
