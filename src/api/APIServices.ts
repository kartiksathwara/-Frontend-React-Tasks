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
