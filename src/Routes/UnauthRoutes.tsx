import { Navigate } from "react-router-dom";

const UnauthRoutes = ({children, isAuth} : {children: React.ReactNode, isAuth: boolean | null}) => {
  
  if (isAuth === null) return null;
    return isAuth ? <Navigate to="/home" replace/> : <>{children}</>
}

export default UnauthRoutes
