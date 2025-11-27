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





// src/api/APIService.ts
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
}

export const api = new APIService();
