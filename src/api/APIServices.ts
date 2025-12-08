// class APIService {
//     private baseURL: string;

//     constructor() {
//         this.baseURL = "http://localhost:5000/api";
//     }

//     private async request(endpoint: string, method: string, body?: any, token?: string) {
//         const headers: HeadersInit = {
//             "Content-Type": "application/json",
//         };

//         if (token) headers["Authorization"] = `Bearer ${token}`;

//         const response = await fetch(`${this.baseURL}${endpoint}`, {
//             method,
//             headers,
//             body: body ? JSON.stringify(body) : undefined,
//         });

//         const data = await response.json();
//         return { ok: response.ok, data };
//     }

//     login(email: string, password: string) {
//         return this.request("/login", "POST", { email, password });
//     }

//     getUser(token: string) {
//         return this.request("/user", "GET", undefined, token);
//     }

//     getTodos(token: string) {
//         return this.request("/todos", "GET", undefined, token);
//     }

//     getTodoDetails(id: string, token: string) {
//         return this.request(`/todos/${id}`, "GET", undefined, token);
//     }

//     createTodo(todo: any, token: string) {
//         return this.request("/todos", "POST", todo, token);
//     }

//     updateTodo(id: string, todo: any, token: string) {
//         return this.request(`/todos/${id}`, "PUT", todo, token);
//     }

//     deleteTodo(id: string, token: string) {
//         return this.request(`/todos/${id}`, "DELETE", undefined, token);
//     }

//     reorderTodos(order: string[], token: string) {
//         return this.request("/todos/reorder", "POST", { order }, token);
//     }

//     cloneTodo(id: string, token: string) {
//         return this.request(`/todos/clone/${id}`, "POST", undefined, token);
//     }
// }

// export const api = new APIService();


// // src/api/APIServices.ts
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

// // Export a single instance
// export const api = new APIService();



// src/api/APIServices.ts

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

class APIService {
  private baseURL: string;

  constructor() {
    this.baseURL = "http://localhost:5000/api";
  }

  private async request(
    endpoint: string,
    method: RequestMethod,
    body?: any,
    token?: string
  ): Promise<{ ok: boolean; data: any }> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(this.baseURL + endpoint, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    return { ok: response.ok, data };
  }

  // --- API Functions ----
  login(email: string, password: string) {
    return this.request("/login", "POST", { email, password });
  }

  getUser(token: string) {
    return this.request("/user", "GET", undefined, token);
  }

  getTodos(token: string) {
    return this.request("/todos", "GET", undefined, token);
  }

  getTodoDetails(id: string, token: string) {
    return this.request(`/todos/${id}`, "GET", undefined, token);
  }

  createTodo(todo: any, token: string) {
    return this.request("/todos", "POST", todo, token);
  }

  updateTodo(id: string, todo: any, token: string) {
    return this.request(`/todos/${id}`, "PUT", todo, token);
  }

  deleteTodo(id: string, token: string) {
    return this.request(`/todos/${id}`, "DELETE", undefined, token);
  }

  reorderTodos(order: string[], token: string) {
    return this.request("/todos/reorder", "POST", { order }, token);
  }

  cloneTodo(id: string, token: string) {
    return this.request(`/todos/clone/${id}`, "POST", undefined, token);
  }
}

export const api = new APIService();
