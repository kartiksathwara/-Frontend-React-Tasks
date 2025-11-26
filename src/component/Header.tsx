import { FaMoon, FaSun, FaUser } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheam";

const Header = () => {
  const {theme, toggleTheme} = useTheme ();

  const navigate = useNavigate();

  const handleUserClick = () => {
  const token = localStorage.getItem("token"); 

  if (token) {
    navigate("/profile");   
  } else {
    navigate("/login");     
  }
};
  return (
    <header className="bg-white dark:bg-gray-900 text-black dark:text-white w-full py-4 px-8 flex justify-between items-center shadow-lg transition">
      <Link to="/">
        <div className="font-bold text-3xl tracking-wide">TODO</div>
      </Link>

      <div className="flex items-center gap-5">
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
        </button>
      </div>
    </header>
  );
};

export default Header;