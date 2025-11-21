import type React from "react"
import { useState } from "react"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const result = await response.json();
            console.log(result);

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(result.user));
                localStorage.setItem("token", result.token);
                navigate("/home");
            } else {
                alert(result.message || "Login Failed");
            }

        } catch (err) {
            console.log("Login error: ", err);
        }
    };
    return (
        <div className="flex justify-center items-center h-screen from-black via-teal-700 to-white">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-center mb-4">Login</h1>
                <input type="email" name="email" placeholder="Enter EmailId" className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-teal-500 transition" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} name="Password" placeholder="Enter Password" className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-teal-500 transition" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-6 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
                    </button>
                </div>

                <button className="bg-green-500 w-full px-4 py-3 text-xl font-semibold rounded-xl hover:bg-green-400 transition duration-300" >Login</button>
                <div className="text-center text-sm">
                    Don’t have an account?{" "}
                    <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </div>
            </form>
        </div>
    )
}

export default Login
