import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

import { 
  FaCheckCircle, 
  FaListOl, 
  FaEdit, 
  FaCopy 
} from "react-icons/fa";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  }, [navigate]);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">

        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center animate-fade-in">
          <h1 className="text-5xl font-extrabold mb-5">
            Welcome To{" "}
            <span className="text-green-600 dark:text-green-400">Todo</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            The fastest and smartest way to manage your tasks, reorder todos,
            attach users, and stay productive with beautiful dark/light themes.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400 
              text-white text-xl px-10 py-4 rounded-xl shadow-md transform hover:scale-105 transition-all"
          >
            Start Your Journey →
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
            shadow hover:shadow-xl transition">
            <FaCheckCircle className="text-blue-600 dark:text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Create & Manage</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Add todos with full details & attach multiple users.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
            shadow hover:shadow-xl transition">
            <FaListOl className="text-purple-600 dark:text-purple-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Reorder Easily</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Drag & drop to prioritize tasks instantly.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
            shadow hover:shadow-xl transition">
            <FaEdit className="text-green-600 dark:text-green-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Edit Anytime</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Update task details with ease.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
            shadow hover:shadow-xl transition">
            <FaCopy className="text-orange-600 dark:text-orange-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Clone Tasks</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Duplicate tasks in one click.
            </p>
          </div>
        </div>
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            How TodoMaster Works
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="text-center">
              <div className=" from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 
                w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-green-600 dark:text-green-300">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Sign Up & Login</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create your account and start your productivity journey.
              </p>
            </div>

            <div className="text-center">
              <div className=" from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 
                w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-300">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Create Todo</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Add title, description, date & up to 4 users.
              </p>
            </div>

            <div className="text-center">
              <div className=" from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 
                w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-300">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Manage & Organize</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Reorder, edit, clone, or delete tasks.
              </p>
            </div>

          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 py-8 text-center text-gray-600 dark:text-gray-400">
          Built with React • Vite • Tailwind • Protected Routes • Dark/Light Theme
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.9s ease-out;
        }
      `}</style>
    </>
  );
};

export default Welcome;
