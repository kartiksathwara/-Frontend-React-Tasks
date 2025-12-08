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
