import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, isAuth }: { children: React.ReactNode, isAuth:boolean | null }) => {
//   const { isAuth } = useAuth();

  if (isAuth === null) return null;

  return isAuth ? <Navigate to="/home" replace /> : <>{children}</>;
};

export default PublicRoute;




// import { Navigate } from "react-router-dom";

// const PublicRoutes = ({ children, isAuth }: { children: React.ReactNode, isAuth: boolean | null }) => {
//   if (isAuth === null) return null;

//   return isAuth ? <Navigate to="/home" replace /> : <>{children}</>;
// };

// export default PublicRoutes;
