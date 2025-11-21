import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./component/Registerpage";
import Login from "./component/Loginpage";
import HomePage from "./component/Homepage";
import Welcome from "./component/Welcomepage";
import Loading from "./component/Loadingpage";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children, isAuth }: { children: React.ReactNode,isAuth: boolean | null}) => {
  console.log(isAuth);
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  
  const [isAuth,setisAuth] = useState<boolean | null>(null)

  useEffect(()=>{
    const token = localStorage.getItem("token");
    setisAuth(!!token)
  },[])
 if (isAuth === null) return null;
  return (
    <BrowserRouter>
    <Loading setisAuth={setisAuth}/>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route
          path="/home"
          element={
            <PrivateRoute isAuth={isAuth}>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
