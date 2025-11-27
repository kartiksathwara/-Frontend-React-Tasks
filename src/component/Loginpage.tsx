// import { useState } from "react";
// import { IoEye, IoEyeOff } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {
//             const response = await fetch("http://localhost:5000/api/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email, password }),
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 localStorage.setItem("user", JSON.stringify(result.user));
//                 localStorage.setItem("token", result.token);

//                 navigate("/home");
//             } else {
//                 alert(result.message || "Login Failed");
//             }
//         } catch (err) {
//             console.log(err);
//             alert("Something went wrong!");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition">

//             <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
//                 <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md transition">
//                     <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
//                         Login
//                     </h1>

//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         <input
//                             type="email"
//                             placeholder="Enter Email"
//                             className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-teal-500 dark:focus:border-teal-400 outline-none transition"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />

//                         <div className="relative">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 placeholder="Enter Password"
//                                 className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-teal-500 dark:focus:border-teal-400 outline-none transition"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />

//                             <button
//                                 type="button"
//                                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400"
//                                 onClick={() => setShowPassword(!showPassword)}
//                             >
//                                 {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
//                             </button>
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-full py-3 text-xl font-semibold bg-teal-600 hover:bg-teal-500 rounded-xl text-white transition"
//                         >
//                             Login
//                         </button>
//                     </form>

//                     <div className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
//                         Don’t have an account?
//                         <span
//                             className="text-teal-600 dark:text-teal-400 font-semibold cursor-pointer ml-1"
//                             onClick={() => navigate("/register")}
//                         >
//                             Register
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;




// src/pages/Login.tsx
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { api } from "../api/APIServices";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { ok, data } = await api.login(email, password);

        if (ok) {
            login(data.user, data.token);
            navigate("/home");
        } else {
            alert(data.message || "Login Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition">
            <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md transition">
                    
                    <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
                        Login
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full px-4 py-3 border-2 rounded-xl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                className="w-full px-4 py-3 border-2 rounded-xl"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 text-xl font-semibold bg-teal-600 text-white rounded-xl"
                        >
                            Login
                        </button>
                    </form>

                    <div className="text-center text-sm mt-4">
                        Don’t have an account?
                        <span
                            className="text-teal-600 font-semibold cursor-pointer ml-1"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
