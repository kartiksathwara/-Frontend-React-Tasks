// import { Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { token } = useAuth(); // get token from context
//   const isAuth = !!token; // true if token exists
//   console.log("ProtectedRoute:", isAuth);

//   if (isAuth === null) return null; // optional, usually unnecessary

//   return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";
import React from "react";

type ProtectedRouteProps = {
  isauth: boolean;
  children: React.ReactElement;
};

const ProtectedRoute = ({ isauth, children }: ProtectedRouteProps) => {
  if (!isauth) {
    return React.createElement(Navigate, { to: "/login", replace: true });
  }
  return children;
};

export default ProtectedRoute;
