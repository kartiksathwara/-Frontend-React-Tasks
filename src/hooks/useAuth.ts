export const useAuth = () => {
    const token = localStorage.getItem("token");

    const login = (token: string, user: any) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return {
        isAuth: !!token,
        login,
        logout
    };
};



// import { useAuthStore } from "../store/AuthContext";

// export const useAuth = () => {
//   return useAuthStore();
// };
