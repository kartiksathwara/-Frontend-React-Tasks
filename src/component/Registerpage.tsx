import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useValidation } from "../hooks/useVerification";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { errors, validate, clearError } = useValidation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    clearError(e.target.name as "email" | "password" | "confirmPassword");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate(formData)) return;

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        alert(result.message || "Registration failed");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition">
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md transition">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Register
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600
                         rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                         focus:border-teal-500 dark:focus:border-teal-400 outline-none transition"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600
                           rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                           focus:border-teal-500 dark:focus:border-teal-400 outline-none transition"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 top-[46px]">{errors.email}</p>
              )}
            </div>

            <div className="relative pb-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600
               rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
               focus:border-teal-500 dark:focus:border-teal-400 outline-none transition"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="absolute right-4 top-[18px] text-gray-600 dark:text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
              </button>

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="relative pb-3">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600
               rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
               focus:border-teal-500 dark:focus:border-teal-400 outline-none transition"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="absolute right-4 top-[18px] text-gray-600 dark:text-gray-400"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <IoEye size={20} /> : <IoEyeOff size={20} />}
              </button>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 absolute left-1 top-[46px]">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 text-xl font-semibold bg-teal-600 hover:bg-teal-500 
                         rounded-xl text-white transition"
            >
              Register
            </button>
          </form>

          <div className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
            Already have an account?
            <span
              className="text-teal-600 dark:text-teal-400 font-semibold cursor-pointer ml-1"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
