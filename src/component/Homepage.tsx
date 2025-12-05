import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../pages/Header"; 
import Footer from "../pages/Footer"; 

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!storedUser || !token) {
      navigate("/login");
    } else {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <main className="flex flex-col justify-center items-center flex-1 px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 max-w-lg w-full text-center transition-colors duration-300 border border-gray-200 dark:border-gray-700">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Welcome, <span className="text-green-600 dark:text-green-400">{userName ?? "User"}</span>!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            This is your private homepage. Start managing your tasks right away!
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/create-todo")}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 
                text-white text-xl px-6 py-3 rounded-xl shadow-md transform hover:scale-105 transition-all font-semibold">
              Create Todo
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                text-white text-xl px-6 py-3 rounded-xl shadow-md transform hover:scale-105 transition-all font-semibold">
              Go to My Todos
            </button>
          </div>
        </div>
      </main>
      <Footer /> 
    </div>
  );
};

export default HomePage;