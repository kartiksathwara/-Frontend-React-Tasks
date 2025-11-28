// // src/components/Sidebar.tsx
// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar: React.FC = () => (
//   <aside className="w-64 bg-white dark:bg-gray-800 p-4 border-r">
//     <nav className="flex flex-col gap-2">
//       <Link to="/home" className="block p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Home</Link>
//       <Link to="/todo/new" className="block p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Create Todo</Link>
//       <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Dashboard</Link>
//     </nav>
//   </aside>
// );

// export default Sidebar;

// src/components/Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => (
  <aside className="w-64 h-screen bg-white dark:bg-gray-800 p-4 border-r fixed left-0 top-0 z-50">
    <nav className="flex flex-col gap-2">
      <Link to="/home" className="block p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Home</Link>
      <Link to="/todo/new" className="block p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Create Todo</Link>
      <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Dashboard</Link>
    </nav>
  </aside>
);

export default Sidebar;
