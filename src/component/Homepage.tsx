import { useEffect, useState } from "react"
import { FaAngleDown, FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
const HomePage = () => {
  const navigate = useNavigate();
  const [menuopen, setMenuOpen] = useState(false)
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      const user = JSON.parse(storedUser);
      setUserName(user.name)
    }
  }, [])
  return (
    <div className="min-h-screen flex flex-col from-black via-teal-700 to-white">
      <header className="w-full flex justify-between items-center px-6 py-4 bg-black/80 shadow-lg">
        <div className="text-white text-2xl font-bold cursor-pointer">SK</div>
          <div className="flex items-center text-xl text-white relative">
            <div className="relative">
              <button className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
                onClick={() => setMenuOpen(!menuopen)}>
                <FaUser />
                <span className="hidden md:inline">{userName ?? "Guest"}</span>
                <FaAngleDown className={`transition-transform ${menuopen ? "rotate-180" : ""}`} />
              </button>
              {menuopen && (
                <div className="absolute mt-2 w-58 bg-white text-gray-700 rounded-full px-4 shadow-lg overflow-hidden animate-fade-in">
                  <div className="bg-white">
                    <button
                      onClick={() => {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        window.location.href = "/";
                      }}
                      className="w-full text-left px-4 py-2 font-semibold">
                      LogOut
                    </button>
                    <div />
                  </div>
                </div>
              )}
            </div>
        </div>
      </header>
      <main className="flex flex-col justify-center items-center flex-1 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome, <span className="text-indigo-600">{userName ?? "Guest"}</span>
          </h2>
          <p className="text-lg text-gray-500 mb-6">
            You are Successfully login into website
          </p>
        </div>
      </main>
    </div>
  )
}
export default HomePage