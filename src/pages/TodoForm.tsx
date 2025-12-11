import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isValidIndianPhone, Plus91 } from "../hooks/PhoneNumber";
import Header from "./Header";
import { FaPlus, FaTrash } from "react-icons/fa";

type ListChild = { name: string; email: string; phone: string };

type Errors = {
  title?: string;
  description?: string;
  list?: string;
  children?: { [index: number]: { name?: string; email?: string; phone?: string } };
};

const initialChild = (): ListChild => ({ name: "", email: "", phone: "" });
const Maxlist = 4;

const TodoForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [list, setList] = useState<ListChild[]>([initialChild()]);
  const [errors, setErrors] = useState<Errors>({ children: {} });

  const query = new URLSearchParams(window.location.search);
  const cloneId = query.get("cloneId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const changePhone = (phone: ListChild[]) => 
      phone.length ? phone.map(p => ({ ...p, phone: p.phone.replace(/^\+91/,"")})):[initialChild()];
    if (id) {
      const fetchTodo = async () => {
        const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setList(changePhone(data.usersAttached))
      };
      fetchTodo();
    } else if (cloneId) {
      const fetchClone = async () => {
        const res = await fetch(`http://localhost:5000/api/todos/${cloneId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setList(changePhone(data.usersAttached));
      };
      fetchClone();
    }
  }, [id, cloneId, token]);

  const validate = (): boolean => {
    const newErrors: Errors = { children: {} };
    let valid = true;

    if (!title.trim()) {
      newErrors.title = "Title should not be empty";
      valid = false;
    }
    if (!description.trim()) {
      newErrors.description = "Description should not be empty";
      valid = false;
    }
    if (!list || list.length === 0) {
      newErrors.list = "List should not be empty";
      valid = false;
    }
    if (list.length > Maxlist) {
      newErrors.list = `List cannot have more than ${Maxlist} items`;
      valid = false;
    }

    list.forEach((child, id) => {
      const childErr: { name?: string; email?: string; phone?: string } = {};
      if (!child.name || !child.name.trim()) {
        childErr.name = "Name should not be empty";
        valid = false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!child.email || !emailRegex.test(child.email)) {
        childErr.email = "Enter a valid email";
        valid = false;
      }
      if (!child.phone || !isValidIndianPhone(child.phone)) {
        childErr.phone = "Enter valid Indian phone with 10 digits";
        valid = false;
      }
      if (Object.keys(childErr).length > 0) {
        (newErrors.children as any)[id] = childErr;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const normalizedList = list.map(child => ({
      ...child,
      phone: Plus91(child.phone)
    }));
    // setList(normalizedList);

    if (!validate()) return;

    const todoData =
      id && !cloneId
        ? { title: title.trim(), description: description.trim(), usersAttached: normalizedList, id }
        : { title: title.trim(), description: description.trim(), usersAttached: normalizedList };

    try {
      const res = await fetch("http://localhost:5000/api/todos/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(todoData),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("Save error:", data.message);
        return;
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Error saving todo:", err);
    }
  };
  const handleAddChild = () => {
    if (list.length < Maxlist) setList([...list, initialChild()]);
  };
  const handleRemoveChild = (index: number) => setList(list.filter((_, i) => i !== index));
  const handleChildChange = (index: number, field: keyof ListChild, value: string) => {
    const newList = [...list];
    newList[index][field] = value;
    setList(newList);
  };

  return (
    <div className="min-h-screen scrollbar-hide bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col transition-colors duration-300">
      <Header />
      <main className="flex justify-center items-center p-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center pb-4 tracking-wide">{id ? "Edit Todo" : "Create Todo"}</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium focus:ring-blue-500">Title</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-4 rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-4 rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">List (max {Maxlist})</h2>
                <button
                  type="button"
                  onClick={handleAddChild}
                  disabled={list.length >= Maxlist}
                  className="px-3 py-2 flex items-center font-bold rounded bg-green-600 text-white disabled:opacity-60"
                >
                  <FaPlus />
                  <span className="ml-1">Add</span>
                </button>
              </div>

              {errors.list && <p className="text-red-500 text-sm mb-2">{errors.list}</p>}
              <div className="space-y-3">
                {list.map((child, id) => (
                  <div
                    key={id}
                    className="p-3 border rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Item {id + 1}</h3>
                      <button
                        type="button"
                        onClick={() => handleRemoveChild(id)}
                        disabled={list.length === 1}
                        className="px-2 py-1 text-black dark:text-white hover:text-red-800 dark:hover:text-red-300 disabled:opacity-60"
                      >
                        <FaTrash />
                      </button>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">

                      <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input
                          placeholder="Name"
                          value={child.name}
                          onChange={e => handleChildChange(id, "name", e.target.value)}
                          className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.children?.[id]?.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.children[id].name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                          placeholder="Email"
                          value={child.email}
                          onChange={e => handleChildChange(id, "email", e.target.value)}
                          className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.children?.[id]?.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.children[id].email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm mb-1">Phone Number</label>

                        <div className="flex items-center w-full gap-0 overflow-hidden rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                          <span className="px-3 py-2 bg-gray-200 dark:bg-gray-800 border-r dark:border-gray-700 text-gray-700 dark:text-gray-300">
                            +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            placeholder="Phone number"
                            value={child.phone}
                            onChange={e => {
                              const onlyNums = e.target.value.replace(/\D/g, "");
                              handleChildChange(id, "phone", onlyNums);
                            }}
                            className="w-full p-2 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {errors.children?.[id]?.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.children[id].phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                {id ? "Update Todo" : "Save Todo"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TodoForm;