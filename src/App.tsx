import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./component/Registerpage";
import Login from "./component/Loginpage";
import HomePage from "./component/Homepage";
import Welcome from "./component/Welcomepage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import PublicRoutes from "./Routes/PublicRoutes";
import UnauthRoutes from "./Routes/UnauthRoutes";


function App() {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
  path="/"
  element={
    <PublicRoutes isAuth={isAuth}>
      <Welcome />
    </PublicRoutes>
  }
/>

<Route
  path="/login"
  element={
    <UnauthRoutes isAuth={isAuth}>
      <Login />
    </UnauthRoutes>
  }
/>

<Route
  path="/register"
  element={
    <UnauthRoutes isAuth={isAuth}>
      <Register />
    </UnauthRoutes>
  }
/>

<Route
  path="/home"
  element={
    <ProtectedRoute isAuth={isAuth}>
      <HomePage />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
