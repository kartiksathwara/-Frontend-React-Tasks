import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuth();
  console.log("ProtectedRoute:", isAuth);

  if (isAuth === null) return null;

  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
