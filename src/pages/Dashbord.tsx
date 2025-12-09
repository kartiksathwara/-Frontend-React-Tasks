import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { FaArrowDown, FaArrowUp, FaClone, FaEdit, FaPlus, FaTrash } from "react-icons/fa";

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
      // setTodos(Array.isArray(data) ? data : []);

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
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Todos</h1>

            <button
              onClick={() => navigate("/create-todo")}
              className="px-4 py-2 flex items-center rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 transition"
            >
              <FaPlus />
              <span className="ml-2"> New Todo </span>
            </button>
          </div>

          {todos.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border dark:border-gray-700 text-center">
              <p className="text-lg">No todos yet. Create one!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {todos.map((todo, index) => (
                <div
                  key={todo._id}
                  className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border dark:border-gray-700 hover:shadow-2xl transition-all duration-200"
                >
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => navigate(`/todo-form/${todo._id}`)}
                      className="p-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 shadow"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleClone(todo._id)}
                      className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow"
                      title="Clone"
                    >
                      <FaClone />
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="flex flex-col gap-32 mt-2">
                      <button
                        onClick={() => handleReorder(index, index - 1)}
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 shadow"
                        disabled={index === 0}
                        title="Move Up"
                      >
                        <FaArrowUp />
                      </button>

                      <button
                        onClick={() => handleReorder(index, index + 1)}
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 shadow"
                        disabled={index === todos.length - 1}
                        title="Move Down"
                      >
                        <FaArrowDown />
                      </button>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                        {todo.title}
                      </h2>

                      <p className="text-gray-700 dark:text-gray-300 mb-3 text-lg leading-relaxed">
                        {todo.description}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        Created: {new Date(todo.createdAt).toLocaleString()}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {todo.usersAttached.map((child, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shadow-sm"
                          >
                            <p className="font-semibold text-lg">{child.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {child.email}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {child.phone}
                            </p>
                          </div>
                        ))}
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
