
import { api } from "./APIServices";
export const getTodoList = () =>
  api.get<any[]>("/todos");

export const getTodoDetails = (id: string) =>
  api.get<any>(`/todos/${id}`);

export const saveTodo = (body: any) =>
  api.post("/todos/save", body);

export const deleteTodo = (id: string) =>
  api.delete(`/todos/${id}`);

export const cloneTodo = (id: string) =>
  api.post(`/todos/clone/${id}`);

export const reorderTodo = (from: number, to: number) =>
  api.post("/todos/reorder", { from, to });
