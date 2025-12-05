// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { isValidIndianPhone, ensurePlus91 } from "../hooks/PhoneNumber";
// import Header from "./Header";

// type ListChild = {
//   name: string;
//   email: string;
//   phone: string;
// };

// type Errors = {
//   title?: string;
//   description?: string;
//   list?: string;
//   children?: { [index: number]: { name?: string; email?: string; phone?: string } };
// };

// const initialChild = (): ListChild => ({ name: "", email: "", phone: "" });

// const MAX_LIST = 4;

// const TodoForm: React.FC = () => {
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [list, setList] = useState<ListChild[]>([initialChild()]);
//   const [errors, setErrors] = useState<Errors>({ children: {} });

//   // Validation function
//   const validate = (): boolean => {
//     const newErrors: Errors = { children: {} };
//     let valid = true;

//     if (!title.trim()) {
//       newErrors.title = "Title should not be empty";
//       valid = false;
//     }

//     if (!description.trim()) {
//       newErrors.description = "Description should not be empty";
//       valid = false;
//     }

//     if (!list || list.length === 0) {
//       newErrors.list = "List should not be empty";
//       valid = false;
//     }

//     if (list.length > MAX_LIST) {
//       newErrors.list = `List cannot have more than ${MAX_LIST} items`;
//       valid = false;
//     }

//     list.forEach((child, idx) => {
//       const childErr: { name?: string; email?: string; phone?: string } = {};

//       if (!child.name.trim()) {
//         childErr.name = "Name should not be empty";
//         valid = false;
//       }

//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!child.email || !emailRegex.test(child.email)) {
//         childErr.email = "Enter a valid email";
//         valid = false;
//       }

//       if (!child.phone || !isValidIndianPhone(child.phone)) {
//         childErr.phone = "Enter valid Indian phone with +91 and 10 digits";
//         valid = false;
//       }

//       if (Object.keys(childErr).length > 0) {
//         (newErrors.children as any)[idx] = childErr;
//       }
//     });

//     setErrors(newErrors);
//     return valid;
//   };

//   // Handle adding/removing children
//   const handleAddChild = () => {
//     if (list.length >= MAX_LIST) return;
//     setList(prev => [...prev, initialChild()]);
//   };

//   const handleRemoveChild = (index: number) => {
//     setList(prev => prev.filter((_, i) => i !== index));
//     setErrors(prev => {
//       const newChildren = { ...(prev.children || {}) };
//       const newChildrenShifted: any = {};
//       Object.keys(newChildren).forEach(key => {
//         const k = Number(key);
//         if (k < index) newChildrenShifted[k] = newChildren[k];
//         if (k > index) newChildrenShifted[k - 1] = newChildren[k];
//       });
//       return { ...prev, children: newChildrenShifted };
//     });
//   };

//   const handleChildChange = (index: number, field: keyof ListChild, value: string) => {
//     setList(prev => {
//       const copy = [...prev];
//       copy[index] = { ...copy[index], [field]: value };
//       return copy;
//     });

//     setErrors(prev => {
//       const children = { ...(prev.children || {}) };
//       if (children[index]) {
//         const newChildErr = { ...children[index], [field]: undefined };
//         children[index] = newChildErr;
//       }
//       return { ...prev, children };
//     });
//   };

//   // Submit function - send to backend
//   const handleSubmit = async (e?: React.FormEvent) => {
//     e?.preventDefault();

//     const normalizedList = list.map(child => ({
//       ...child,
//       phone: ensurePlus91(child.phone),
//     }));

//     setList(normalizedList);

//     if (!validate()) return;

//     const todoData = {
//       title: title.trim(),
//       description: description.trim(),
//       usersAttached: normalizedList,
//     };

//     try {
//       const token = localStorage.getItem("token"); // JWT from login

//       const res = await fetch("http://localhost:5000/api/todos/save", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(todoData),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         console.error("Save error:", data.message);
//         return;
//       }

//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Error saving todo:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
//       <Header />
//       <main className="ml-64 p-6">
//         <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border dark:border-gray-700">
//           <h1 className="text-2xl font-bold mb-4">Create Todo</h1>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block mb-1">Title</label>
//               <input
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full p-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-900"
//                 placeholder="Todo title"
//               />
//               {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
//             </div>

//             <div>
//               <label className="block mb-1">Description</label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full p-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-900"
//                 placeholder="Todo description"
//               />
//               {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
//             </div>

//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <h2 className="text-lg font-semibold">List (max {MAX_LIST})</h2>
//                 <button
//                   type="button"
//                   onClick={handleAddChild}
//                   disabled={list.length >= MAX_LIST}
//                   className="px-3 py-1 rounded bg-green-600 text-white disabled:opacity-60"
//                 >
//                   + Add
//                 </button>
//               </div>
//               {errors.list && <p className="text-red-500 text-sm mb-2">{errors.list}</p>}

//               <div className="space-y-4">
//                 {list.map((child, idx) => (
//                   <div key={idx} className="p-3 border rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
//                     <div className="flex justify-between items-center mb-2">
//                       <h3 className="font-medium">Item {idx + 1}</h3>
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveChild(idx)}
//                         disabled={list.length === 1}
//                         className="px-2 py-1 rounded bg-red-500 text-white disabled:opacity-60"
//                       >
//                         Remove
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                       <div>
//                         <label className="block text-sm mb-1">Name</label>
//                         <input
//                           value={child.name}
//                           onChange={(e) => handleChildChange(idx, "name", e.target.value)}
//                           className="w-full p-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-900"
//                           placeholder="Name"
//                         />
//                         {errors.children && errors.children[idx]?.name && (
//                           <p className="text-red-500 text-sm mt-1">{errors.children[idx].name}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm mb-1">Email</label>
//                         <input
//                           value={child.email}
//                           onChange={(e) => handleChildChange(idx, "email", e.target.value)}
//                           className="w-full p-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-900"
//                           placeholder="Email"
//                         />
//                         {errors.children && errors.children[idx]?.email && (
//                           <p className="text-red-500 text-sm mt-1">{errors.children[idx].email}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm mb-1">Phone (+91XXXXXXXXXX)</label>
//                         <input
//                           value={child.phone}
//                           onChange={(e) => handleChildChange(idx, "phone", e.target.value)}
//                           className="w-full p-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-900"
//                           placeholder="+911234567890"
//                         />
//                         {errors.children && errors.children[idx]?.phone && (
//                           <p className="text-red-500 text-sm mt-1">{errors.children[idx].phone}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex gap-3 justify-end">
//               <button
//                 type="button"
//                 onClick={() => navigate("/dashboard")}
//                 className="px-4 py-2 rounded border"
//               >
//                 Cancel
//               </button>

//               <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white">
//                 Save Todo
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TodoForm;



import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isValidIndianPhone, ensurePlus91 } from "../hooks/PhoneNumber";
import Header from "./Header";

type ListChild = { name: string; email: string; phone: string };

type Errors = {
  title?: string;
  description?: string;
  list?: string;
  children?: { [index: number]: { name?: string; email?: string; phone?: string } };
};

const initialChild = (): ListChild => ({ name: "", email: "", phone: "" });
const MAX_LIST = 4;

const TodoForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [list, setList] = useState<ListChild[]>([initialChild()]);
  const [errors, setErrors] = useState<Errors>({ children: {} });

  // Fetch todo if editing
  useEffect(() => {
    if (!id) return;
    const fetchTodo = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTitle(data.title);
      setDescription(data.description);
      setList(data.usersAttached.length ? data.usersAttached : [initialChild()]);
    };
    fetchTodo();
  }, [id]);

  // Validation
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
    if (list.length > MAX_LIST) {
      newErrors.list = `List cannot have more than ${MAX_LIST} items`;
      valid = false;
    }

    list.forEach((child, idx) => {
      const childErr: { name?: string; email?: string; phone?: string } = {};
      if (!child.name.trim()) {
        childErr.name = "Name should not be empty";
        valid = false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(child.email)) {
        childErr.email = "Enter a valid email";
        valid = false;
      }
      if (!isValidIndianPhone(child.phone)) {
        childErr.phone = "Enter valid Indian phone with +91 and 10 digits";
        valid = false;
      }
      if (Object.keys(childErr).length > 0) {
        (newErrors.children as any)[idx] = childErr;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  // Save or Update
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const normalizedList = list.map(child => ({ ...child, phone: ensurePlus91(child.phone) }));
    setList(normalizedList);

    if (!validate()) return;

    const todoData = { title: title.trim(), description: description.trim(), usersAttached: normalizedList, id };

    try {
      const token = localStorage.getItem("token");
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

  // Add / Remove child
  const handleAddChild = () => { if (list.length < MAX_LIST) setList([...list, initialChild()]); };
  const handleRemoveChild = (index: number) => setList(list.filter((_, i) => i !== index));
  const handleChildChange = (index: number, field: keyof ListChild, value: string) => {
    const newList = [...list]; newList[index][field] = value; setList(newList);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="ml-64 p-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-4">{id ? "Edit Todo" : "Create Todo"}</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)}
                className="w-full p-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-900" />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)}
                className="w-full p-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-900" />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">List (max {MAX_LIST})</h2>
                <button type="button" onClick={handleAddChild} disabled={list.length >= MAX_LIST}
                  className="px-3 py-1 rounded bg-green-600 text-white disabled:opacity-60">+ Add</button>
              </div>

              {errors.list && <p className="text-red-500 text-sm mb-2">{errors.list}</p>}
              <div className="space-y-4">
                {list.map((child, idx) => (
                  <div key={idx} className="p-3 border rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Item {idx + 1}</h3>
                      <button type="button" onClick={() => handleRemoveChild(idx)}
                        disabled={list.length === 1} className="px-2 py-1 rounded bg-red-500 text-white disabled:opacity-60">Remove</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input placeholder="Name" value={child.name} onChange={e => handleChildChange(idx, "name", e.target.value)} />
                      <input placeholder="Email" value={child.email} onChange={e => handleChildChange(idx, "email", e.target.value)} />
                      <input placeholder="Phone (+91XXXXXXXXXX)" value={child.phone} onChange={e => handleChildChange(idx, "phone", e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => navigate("/dashboard")} className="px-4 py-2 rounded border">Cancel</button>
              <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white">{id ? "Update Todo" : "Save Todo"}</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TodoForm;
