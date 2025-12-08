
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




// // todoServices.ts
// import { api } from "./APIServices";

// // Get all todos (requires token)
// export const getTodoList = (token: string) => {
//   return api.getTodos(token);
// };

// // Get details of a specific todo
// export const getTodoDetails = (id: string, token: string) => {
//   return api.getTodoDetails(id, token);
// };

// // Create a new todo
// export const createTodo = (todo: any, token: string) => {
//   return api.createTodo(todo, token);
// };

// // Update an existing todo
// export const updateTodo = (id: string, todo: any, token: string) => {
//   return api.updateTodo(id, todo, token);
// };

// // Delete a todo
// export const deleteTodo = (id: string, token: string) => {
//   return api.deleteTodo(id, token);
// };

// // Clone a todo
// export const cloneTodo = (id: string, token: string) => {
//   return api.cloneTodo(id, token);
// };

// // Reorder todos
// export const reorderTodos = (order: string[], token: string) => {
//   return api.reorderTodos(order, token);
// };
