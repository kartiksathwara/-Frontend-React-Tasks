import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./component/Registerpage";
import Login from "./component/Loginpage";
import HomePage from "./component/Homepage";
import Welcome from "./component/Welcomepage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoutes from "./Routes/PublicRoutes";
import UnauthRoutes from "./Routes/UnauthRoutes";
import { useAuth } from "./hooks/useAuth";
import TodoForm from "./pages/TodoForm";
import Dashboard from "./pages/Dashbord";
import Profile from "./component/ProfilePage";
function App() {
  const { token } = useAuth();
  const isAuth = !!token;

  return (
    <BrowserRouter>
      {/* Public routes */}
      <Routes>
        <Route path="/"
          element={<PublicRoutes isAuth={isAuth}>
            <Welcome />
          </PublicRoutes>
          }
        />
        <Route path="/login"
          element={
            <UnauthRoutes isAuth={isAuth}>
              <Login />
            </UnauthRoutes>
          }
        />
        <Route path="/register"
          element={
            <UnauthRoutes isAuth={isAuth}>
              <Register />
            </UnauthRoutes>
          }
        />

        {/* Protected routes */}
        <Route path="/home"
          element={
            <ProtectedRoute isauth={isAuth}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/profile"
          element={
            <ProtectedRoute isauth={isAuth}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/dashboard"
          element={
            <ProtectedRoute isauth={isAuth}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/create-todo"
          element={
            <ProtectedRoute isauth={isAuth}>
              <TodoForm />
            </ProtectedRoute>
          }
        />
        <Route path="/todo-form/:id"
          element={
            <ProtectedRoute isauth={isAuth}>
              <TodoForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
