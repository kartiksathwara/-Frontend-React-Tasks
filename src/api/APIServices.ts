// // // src/api/APIServices.ts
// import axios from "axios";
// import type { AxiosInstance } from "axios";

// class APIService {
//   api: AxiosInstance;

//   constructor() {
//     this.api = axios.create({
//       baseURL: "http://localhost:5000/api",
//     });
//   }

//   setAuth(token: string) {
//     this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   }

//   get<T>(url: string): Promise<T> {
//     return this.api.get(url).then(res => res.data);
//   }

//   post<T>(url: string, body?: any): Promise<T> {
//     return this.api.post(url, body).then(res => res.data);
//   }

//   delete<T>(url: string): Promise<T> {
//     return this.api.delete(url).then(res => res.data);
//   }

//   login(email: string, password: string): Promise<{ user: any; token: string }> {
//     return this.post("/login", { email, password });
//   }

//   getTodoList<T>(): Promise<T> {
//     return this.get("/todos/list");
//   }

//   getTodoDetails<T>(id: string): Promise<T> {
//     return this.get(`/todos/details/${id}`);
//   }

//   saveTodo<T>(data: any): Promise<T> {
//     return this.post(`/todos/save`, data);
//   }

//   deleteTodo<T>(id: string): Promise<T> {
//     return this.delete(`/todos/delete/${id}`);
//   }
// }

// export const api = new APIService();




import axios from "axios";

class APIService {
  api = axios.create({ baseURL: "http://localhost:5000/api" });

  setAuth(token: string) {
    this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  get(url: string) {
    return this.api.get(url).then(res => res.data);
  }

  post(url: string, body?: any) {
    return this.api.post(url, body).then(res => res.data);
  }

  delete(url: string) {
    return this.api.delete(url).then(res => res.data);
  }

  login(email: string, password: string) {
    return this.post("/login", { email, password });
  }

  getTodoList() {
    return this.get("/todos/list");
  }

  getTodoDetails(id: string) {
    return this.get(`/todos/details/${id}`);
  }

  saveTodo(data: any) {
    return this.post("/todos/save", data);
  }

  deleteTodo(id: string) {
    return this.delete(`/todos/delete/${id}`);
  }

  cloneTodo(id: string) {
    return this.post(`/todos/clone/${id}`);
  }

  reorderTodo(from: number, to: number) {
    return this.post("/todos/reorder", { from, to });
  }
}

export const api = new APIService();
