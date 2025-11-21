import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface LoadingProps {
  setisAuth: (isAuth: boolean) => void;
}

const Loading: React.FC<LoadingProps> = ({ setisAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isPublicRoute = ["/", "/login", "/register"].includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setisAuth(true);
      if (isPublicRoute) {
        navigate("/home", { replace: true });
      }
    } else {
      setisAuth(false);
    }
  }, [location.pathname, navigate, setisAuth]);

  return null;
};

export default Loading;
