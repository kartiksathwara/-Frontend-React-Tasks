// import { createContext, useContext, useState, useEffect } from "react";

// interface AuthType {
//   isAuth: boolean | null;
//   login: (token: string, user: any) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthType | null>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isAuth, setIsAuth] = useState<boolean | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) setIsAuth(true);
//     else setIsAuth(false);
//   }, []);

//   const login = (token: string, user: any) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     setIsAuth(true);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setIsAuth(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthStore = () => useContext(AuthContext)!;



import { createContext, useState} from "react";
import type { ReactNode } from "react";



export type User = {
    id: string;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
};
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("user") || "null")
    );

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const login = (userData: User, token: string) => {
        setUser(userData);
        setToken(token);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
