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
