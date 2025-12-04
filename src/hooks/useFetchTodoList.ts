// useFetchTodoList.ts
import useDataFetch from "./useDataFetch";
import { api } from "../api/APIServices";
import type { TodoItem } from "../types/todo";

export const useFetchTodoList = () =>
  useDataFetch<TodoItem[]>({
    initState: [],
    fetchFn: () => api.getTodoList<TodoItem[]>(),
  });
