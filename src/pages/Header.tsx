// import { FaMoon, FaSun, FaUser } from "react-icons/fa";
// import { useNavigate, Link } from "react-router-dom";
// import { useTheme } from "../hooks/useTheam";

// const Header = () => {
//   const {theme, toggleTheme} = useTheme ();

//   const navigate = useNavigate();

//   const handleUserClick = () => {
//   const token = localStorage.getItem("token"); 

//   if (token) {
//     navigate("/profile");   
//   } else {
//     navigate("/login");     
//   }
// };
//   return (
//     <header className="bg-white dark:bg-gray-900 text-black dark:text-white w-full py-4 px-8 flex justify-between items-center shadow-lg transition">
//       <Link to="/">
//         <div className="font-bold text-3xl tracking-wide">TODO</div>
//       </Link>

//       <div className="flex items-center gap-5">
//         <button
//           onClick={toggleTheme}
//           className="text-xl hover:opacity-70 transition"
//         >
//           {theme === "light" ? <FaMoon /> : <FaSun />}
//         </button>

//         <button
//           onClick={handleUserClick}
//           className="flex items-center gap-2 text-xl hover:opacity-70 transition"
//         >
//           <FaUser />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;



import { FaMoon, FaSun, FaUser, FaAngleDown, FaBars } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheam";
import { useState } from "react";
import Sidebar from "../component/Sidebar";
const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // ⬅️ Sidebar state

  const token = localStorage.getItem("token"); // check login

  const handleUserClick = () => {
    if (!token) {
      navigate("/login");
    } else {
      setMenuOpen(!menuOpen);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 text-black dark:text-white w-full py-4 px-8 flex justify-between items-center shadow-lg transition">
        <div className="flex items-center gap-4">
          {token && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-2xl hover:opacity-75 transition"
            >
              <FaBars />
            </button>
          )}
          <Link to="/">
            <div className="font-bold text-3xl tracking-wide">TODO</div>
          </Link>

        </div>
        <div className="flex items-center gap-5 relative">
          <button
            onClick={toggleTheme}
            className="text-xl hover:opacity-70 transition"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
          <button
            onClick={handleUserClick}
            className="flex items-center gap-2 text-xl hover:opacity-70 transition"
          >
            <FaUser />
            {token && <FaAngleDown className={`${menuOpen ? "rotate-180" : ""} transition`} />}
          </button>
          {token && menuOpen && (
            <div className="absolute right-0 top-14 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden w-40 border dark:border-gray-700">
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </header>
      {sidebarOpen && token && (
        <div className="flex">
          <Sidebar />
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
};

export default Header;
