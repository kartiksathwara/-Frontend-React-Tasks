import Header from "../pages/Header";

const ProfilePage = () => {
  const name = localStorage.getItem("userName") || "No Name";
  const email = localStorage.getItem("userEmail") || "No Email";

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    window.location.href = "/";

  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <div className="flex justify-center items-center p-6 mt-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md transition">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Profile
          </h1>
          <div className="space-y-4 text-lg">
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Name:</strong> {name}
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Email:</strong> {email}
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;