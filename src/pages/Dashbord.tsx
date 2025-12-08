// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";

// type ListChild = { name: string; email: string; phone: string };
// type Todo = {
//   _id: string;
//   title: string;
//   description: string;
//   usersAttached: ListChild[];
//   createdAt: string;
// };

// const Dashboard: React.FC = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const fetchTodos = async () => {
//     if (!token) return;
//     try {
//       const res = await fetch("http://localhost:5000/api/todos", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setTodos(data);
//     } catch (err) {
//       console.error("Fetch todos error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const handleDelete = async (id: string) => {
//     try {
//       await fetch(`http://localhost:5000/api/todos/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTodos(prev => prev.filter(t => t._id !== id));
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   const handleClone = async (id: string) => {
//     try {
//       await fetch(`http://localhost:5000/api/todos/clone/${id}`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchTodos();
//     } catch (err) {
//       console.error("Clone error:", err);
//     }
//   };

//   const handleReorder = async (fromIndex: number, toIndex: number) => {
//     if (toIndex < 0 || toIndex >= todos.length) return; // bounds check
//     const newTodos = [...todos];
//     const [moved] = newTodos.splice(fromIndex, 1);
//     newTodos.splice(toIndex, 0, moved);
//     setTodos(newTodos);

//     try {
//       await fetch("http://localhost:5000/api/todos/reorder", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ from: fromIndex, to: toIndex }),
//       });
//     } catch (err) {
//       console.error("Reorder error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
//       <Header />
//       <main className="ml-64 p-6">
//         <div className="max-w-5xl mx-auto">
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-2xl font-bold">My Todos</h1>
//             <button
//               onClick={() => navigate("/create-todo")}
//               className="px-4 py-2 rounded bg-blue-600 text-white"
//             >
//               + New Todo
//             </button>
//           </div>

//           {todos.length === 0 ? (
//             <div className="bg-white dark:bg-gray-800 rounded p-6 shadow border dark:border-gray-700">
//               <p>No todos yet. Create one!</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {todos.map((todo, index) => (
//                 <div
//                   key={todo._id}
//                   className="bg-white dark:bg-gray-800 rounded p-4 shadow border dark:border-gray-700"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h2 className="text-xl font-semibold">{todo.title}</h2>
//                       <p className="text-sm text-gray-600 dark:text-gray-300">
//                         {todo.description}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Created: {new Date(todo.createdAt).toLocaleString()}
//                       </p>

//                       <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
//                         {todo.usersAttached.map((child, i) => (
//                           <div
//                             key={i}
//                             className="p-3 border rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
//                           >
//                             <p className="font-medium">{child.name}</p>
//                             <p className="text-sm">{child.email}</p>
//                             <p className="text-sm">{child.phone}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex flex-col gap-2 ml-4">
//                       <button
//                         onClick={() =>
//                           navigator.clipboard?.writeText(JSON.stringify(todo))
//                         }
//                         className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
//                       >
//                         Copy
//                       </button>
//                       {/* <button
//                         onClick={() => navigate(`/todo-details/${todo._id}`)}
//                         className="px-3 py-1 rounded bg-yellow-500 text-white"
//                       >
//                         Edit
//                       </button> */}

//                       <button
//   onClick={() => navigate(`/todo-form/${todo._id}`)}
//   className="px-3 py-1 rounded bg-yellow-500 text-white"
// >
//   Edit
// </button>

//                       <button
//                         onClick={() => handleClone(todo._id)}
//                         className="px-3 py-1 rounded bg-green-600 text-white"
//                       >
//                         Clone
//                       </button>
//                       <button
//                         onClick={() => handleDelete(todo._id)}
//                         className="px-3 py-1 rounded bg-red-500 text-white"
//                       >
//                         Delete
//                       </button>

//                       {/* Reorder buttons */}
//                       <div className="flex gap-1 mt-2">
//                         <button
//                           onClick={() => handleReorder(index, index - 1)}
//                           className="px-2 py-1 rounded bg-gray-300 dark:bg-gray-700"
//                           disabled={index === 0}
//                         >
//                           ↑
//                         </button>
//                         <button
//                           onClick={() => handleReorder(index, index + 1)}
//                           className="px-2 py-1 rounded bg-gray-300 dark:bg-gray-700"
//                           disabled={index === todos.length - 1}
//                         >
//                           ↓
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

type ListChild = { name: string; email: string; phone: string };
type Todo = {
  _id: string;
  title: string;
  description: string;
  usersAttached: ListChild[];
  createdAt: string;
};

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Fetch todos error:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleClone = async (id: string) => {
    // Navigate to TodoForm with cloneId
    navigate(`/create-todo?cloneId=${id}`);
  };

  //   const handleClone = async (id: string) => {
  //   try {
  //     await fetch(`http://localhost:5000/api/todos/clone/${id}`, {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     fetchTodos();
  //   } catch (err) {
  //     console.error("Clone error:", err);
  //   }
  // };
  const handleReorder = async (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= todos.length) return;
    const newTodos = [...todos];
    const [moved] = newTodos.splice(fromIndex, 1);
    newTodos.splice(toIndex, 0, moved);
    setTodos(newTodos);

    try {
      await fetch("http://localhost:5000/api/todos/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ from: fromIndex, to: toIndex }),
      });
    } catch (err) {
      console.error("Reorder error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="ml-10 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">My Todos</h1>
            <button
              onClick={() => navigate("/create-todo")}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              + New Todo
            </button>
          </div>

          {todos.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded p-6 shadow border dark:border-gray-700">
              <p>No todos yet. Create one!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todos.map((todo, index) => (
                <div
                  key={todo._id}
                  className="bg-white dark:bg-gray-800 rounded p-4 shadow border dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold">{todo.title}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {todo.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Created: {new Date(todo.createdAt).toLocaleString()}
                      </p>

                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                        {todo.usersAttached.map((child, i) => (
                          <div
                            key={i}
                            className="p-3 border rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                          >
                            <p className="font-medium">{child.name}</p>
                            <p className="text-sm">{child.email}</p>
                            <p className="text-sm">{child.phone}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() =>
                          navigator.clipboard?.writeText(JSON.stringify(todo))
                        }
                        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
                      >
                        Copy
                      </button>

                      <button
                        onClick={() => navigate(`/todo-form/${todo._id}`)}
                        className="px-3 py-1 rounded bg-yellow-500 text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleClone(todo._id)}
                        className="px-3 py-1 rounded bg-green-600 text-white"
                      >
                        Clone
                      </button>

                      <button
                        onClick={() => handleDelete(todo._id)}
                        className="px-3 py-1 rounded bg-red-500 text-white"
                      >
                        Delete
                      </button>

                      <div className="flex gap-1 mt-2">
                        <button
                          onClick={() => handleReorder(index, index - 1)}
                          className="px-2 py-1 rounded bg-gray-300 dark:bg-gray-700"
                          disabled={index === 0}
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => handleReorder(index, index + 1)}
                          className="px-2 py-1 rounded bg-gray-300 dark:bg-gray-700"
                          disabled={index === todos.length - 1}
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
