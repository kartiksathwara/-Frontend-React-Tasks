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
