// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";
// const Welcome: React.FC = () => {
//     const navigate = useNavigate();
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             navigate("/home");
//         }
//     }, [navigate]);
//     return (<>
//                 <Header />       
//         <div className="flex justify-center items-center h-screen from-black via-teal-700 to-white">
//             <form className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">

//                  <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Welcome</h1>
//                 <button
//                     onClick={() => navigate("/login")}
//                     className="bg-green-500 w-full px-4 py-3 mb-4 text-xl font-semibold rounded-xl hover:bg-green-400 transition duration-300">
//                     Login
//                 </button>
//                 <button
//                     onClick={() => navigate("/register")}
//                     className="bg-blue-500 w-full px-4 py-3 mb-4 text-xl font-semibold rounded-xl hover:bg-blue-400 transition duration-300">
//                     Register
//                 </button>
//             </form>
//         </div>
//     </>

//     );
// };

// export default Welcome;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  }, [navigate]);

  return (
    <>
      <Header />

      <div className="h-screen flex justify-center items-center  from-gray-900 via-teal-800 to-white px-4">
        <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-8">
            Welcome
          </h1>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-green-600 text-white text-xl py-3 rounded-xl mb-5 shadow-lg hover:bg-green-500 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full bg-blue-600 text-white text-xl py-3 rounded-xl shadow-lg hover:bg-blue-500 transition"
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
