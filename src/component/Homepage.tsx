// import { useEffect, useState } from "react"
// import { FaAngleDown, FaUser } from "react-icons/fa"
// import { useNavigate } from "react-router-dom"
// const HomePage = () => {
//   const navigate = useNavigate();
//   const [menuopen, setMenuOpen] = useState(false)
//   const [userName, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       navigate("/login");
//     } else {
//       const user = JSON.parse(storedUser);
//       setUserName(user.name)
//     }
//   }, [])
//   return (
//     <div className="min-h-screen flex flex-col from-black via-teal-700 to-white">
//       <header className="w-full flex justify-between items-center px-6 py-4 bg-black/80 shadow-lg">
//         <div className="text-white text-2xl font-bold cursor-pointer">SK</div>
//           <div className="flex items-center text-xl text-white relative">
//             <div className="relative">
//               <button className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
//                 onClick={() => setMenuOpen(!menuopen)}>
//                 <FaUser />
//                 <span className="hidden md:inline">{userName ?? "Guest"}</span>
//                 <FaAngleDown className={`transition-transform ${menuopen ? "rotate-180" : ""}`} />
//               </button>
//               {menuopen && (
//                 <div className="absolute mt-2 w-58 bg-white text-gray-700 rounded-full px-4 shadow-lg overflow-hidden animate-fade-in">
//                   <div className="bg-white">
//                     <button
//                       onClick={() => {
//                         localStorage.removeItem("user");
//                         localStorage.removeItem("token");
//                         window.location.href = "/";
//                       }}
//                       className="w-full text-left px-4 py-2 font-semibold">
//                       LogOut
//                     </button>
//                     <div />
//                   </div>
//                 </div>
//               )}
//             </div>
//         </div>
//       </header>
//       <main className="flex flex-col justify-center items-center flex-1 px-4">
//         <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
//           <h2 className="text-4xl font-bold text-gray-800 mb-4">
//             Welcome, <span className="text-indigo-600">{userName ?? "Guest"}</span>
//           </h2>
//           <p className="text-lg text-gray-500 mb-6">
//             You are Successfully login into website
//           </p>
//         </div>
//       </main>
//     </div>
//   )
// }
// export default HomePage



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import your custom components
import Header from "../pages/Header"; // Assuming the path to your Header component
import Footer from "../pages/Footer"; // We will define a simple Footer next

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    // Auth Check: Redirect to login if token or user data is missing
    if (!storedUser || !token) {
      navigate("/login");
    } else {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Fallback: Clear storage and redirect if data is corrupted
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    // Apply theme classes to the main container
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Your Theme-Aware Header Component */}
      <Header />
      
      {/* Main Content Area */}
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



// import { useEffect, useState } from "react";
// import { FaAngleDown, FaUser, FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useTheme } from "../hooks/useTheam";
// import Footer from "../pages/Footer"; // Assuming Footer component is available

// const HomePage = () => {
//   const navigate = useNavigate();
//   const { theme, toggleTheme } = useTheme(); // 1. Use the theme hook

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [userName, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     // Check if user or token exists. For better auth, check the token's validity too.
//     if (!storedUser || !localStorage.getItem("token")) {
//       navigate("/login");
//     } else {
//       try {
//         const user = JSON.parse(storedUser);
//         setUserName(user.name);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         // Clear invalid storage and redirect
//         handleLogout();
//       }
//     }
//   }, [navigate]);
  
//   // Centralized logout function
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     navigate("/"); // Redirect to the welcome/root page
//   };

//   return (
//     // 2. Apply theme classes to the main container
//     <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      
//       {/* 3. Header component with theme-aware styling */}
//       <header className="w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
//         <div className="text-2xl font-bold cursor-pointer text-green-600 dark:text-green-400">TodoMaster</div>
        
//         <div className="flex items-center gap-4">
            
//           {/* Theme Toggle Button */}
//           <button
//             onClick={toggleTheme}
//             className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//             title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
//           >
//             {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
//           </button>

//           {/* User Menu Button */}
//           <div className="relative">
//             <button 
//               className="flex items-center gap-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition"
//               onClick={() => setMenuOpen(!menuOpen)}
//             >
//               <FaUser />
//               <span className="hidden md:inline">{userName ?? "User"}</span>
//               <FaAngleDown className={`transition-transform ${menuOpen ? "rotate-180" : ""}`} />
//             </button>
            
//             {menuOpen && (
//               // User Dropdown Menu
//               <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-xl shadow-lg z-10 overflow-hidden border border-gray-200 dark:border-gray-600">
//                 <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b dark:border-gray-600 truncate">
//                     Logged in as:
//                 </p>
//                 <p className="px-4 py-1 font-bold text-gray-900 dark:text-white truncate">
//                     {userName ?? "Guest"}
//                 </p>
//                 <div className="h-px bg-gray-200 dark:bg-gray-600 my-1" />
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-600 transition"
//                 >
//                   <FaSignOutAlt />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>
      
//       {/* Main Content Area */}
//       <main className="flex flex-col justify-center items-center flex-1 px-4 py-16">
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 max-w-lg w-full text-center transition-colors duration-300 border border-gray-200 dark:border-gray-700">
//           <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
//             Welcome, <span className="text-green-600 dark:text-green-400">{userName ?? "User"}</span>!
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
//             Start managing your tasks right away. Your productivity hub awaits.
//           </p>
//           <button 
//             onClick={() => {/* Add functionality to go to the main todo list page */}}
//             className="bg-teal-600 hover:bg-teal-500 dark:bg-teal-500 dark:hover:bg-teal-400 
//               text-white text-xl px-8 py-3 rounded-full shadow-md transform hover:scale-105 transition-all font-semibold">
//             View My Todos
//           </button>
//         </div>
//       </main>

//       <Footer /> 
//     </div>
//   );
// };

// export default HomePage;