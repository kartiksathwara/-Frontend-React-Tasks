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
