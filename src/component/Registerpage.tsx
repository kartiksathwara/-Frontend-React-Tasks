import React, { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Registerpage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {

      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        navigate("/login");
      } else {
        alert(result.message || "Registration failed");
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="flex justify-center items-center h-screen  from-black via-teal-700 to-white">
      <form className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Register</h2>
        <input type="text" name="name" placeholder="Enter Name" className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-teal-500 transition" value={formData.name} onChange={handleChange} required />
        <input type="text" name="email" placeholder="Enter EmailId" className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-teal-500 transition" value={formData.email} onChange={handleChange} required />
        <div className='relative'>
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter Password" className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-teal-500 transition" value={formData.password} onChange={handleChange} required />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
          </button>
        </div>
        <div className='relative'>
          <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Enter ConfirmPassword" className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-teal-500 transition" value={formData.confirmPassword} onChange={handleChange} required />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Toggle password visibility"
          >
            {showConfirmPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
          </button>
        </div>


        <button type="submit" className="w-full bg-blue-500 text-xl text-white py-3 rounded-xl hover:bg-blue-400 transition duration-300">Register</button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  )
}

export default Registerpage



