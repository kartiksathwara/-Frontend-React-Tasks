// import axios from "axios";

// class APIService {
//   private baseURL = "http://localhost:5000/api";

//   private getHeaders() {
//     const token = localStorage.getItem("token");
//     return {
//       Authorization: token ? `Bearer ${token}` : "",
//       "Content-Type": "application/json",
//     };
//   }

//   async get(url: string) {
//     return axios.get(`${this.baseURL}${url}`, { headers: this.getHeaders() });
//   }

//   async post(url: string, body: any) {
//     return axios.post(`${this.baseURL}${url}`, body, {
//       headers: this.getHeaders(),
//     });
//   }

//   async put(url: string, body: any) {
//     return axios.put(`${this.baseURL}${url}`, body, {
//       headers: this.getHeaders(),
//     });
//   }

//   async delete(url: string) {
//     return axios.delete(`${this.baseURL}${url}`, {
//       headers: this.getHeaders(),
//     });
//   }
// }

// export default new APIService();

// apiserverces.ts
class APIService {
    private baseURL: string;

    constructor() {
        this.baseURL = "http://localhost:5000/api";
    }

    private async request(endpoint: string, method: string, body?: any, token?: string) {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();
        return { ok: response.ok, data };
    }

    login(email: string, password: string) {
        return this.request("/login", "POST", { email, password });
    }

    getUser(token: string) {
        return this.request("/user", "GET", undefined, token);
    }

    // Todo APIs
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




// // src/api/APIService.ts
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
// }

// export const api = new APIService();




// // apiserverces.ts
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

//     // Todo APIs
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
