import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/APIServices";
import type { UserAttached } from "../types/todo";
import type { TodoItem } from "../types/todo";
import { useFetchTodoDetails } from "../hooks/useFetchTodoDetails";
const initialUser: UserAttached = { name: "", email: "", phone: "", date: "" };

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: todoData } = useFetchTodoDetails(id || "", !!id);

  const [todo, setTodo] = useState<TodoItem>({
    title: "",
    description: "",
    usersAttached: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (id && todoData) {
      setTodo(todoData);
    }
  }, [id, todoData]);

  // ------- VALIDATION -------
  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};
    if (!todo.title.trim()) errs.title = "Title is required";
    if (!todo.description.trim()) errs.description = "Description is required";

    if (!todo.usersAttached.length) errs.usersAttached = "Add at least one user";
    if (todo.usersAttached.length > 4) errs.usersAttached = "Maximum 4 users allowed";

    todo.usersAttached.forEach((u, idx) => {
      if (!u.name.trim()) errs[`user_name_${idx}`] = "Name is required";
      if (!/^\S+@\S+\.\S+$/.test(u.email)) errs[`user_email_${idx}`] = "Invalid email";
      if (!/^[6-9]\d{9}$/.test(u.phone)) errs[`user_phone_${idx}`] = "Invalid Indian phone";
    });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ------- HANDLE SAVE -------
  const handleSave = async () => {
    if (!validate()) return;
    try {
      await api.saveTodo(todo);
      alert("Saved successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error saving todo");
    }
  };

  // ------- HANDLE CLONE -------
  const handleClone = () => {
    const clone = {
      ...todo,
      title: todo.title + " (Copy)",
    };
    setTodo(clone);
  };

  // ------- ADD USER -------
  const addUser = () => {
    if (todo.usersAttached.length >= 4) return;
    setTodo({ ...todo, usersAttached: [...todo.usersAttached, initialUser] });
  };

  // ------- UPDATE USER -------
  const updateUser = (idx: number, field: keyof UserAttached, value: string) => {
    const users = [...todo.usersAttached];
    users[idx][field] = value;
    setTodo({ ...todo, usersAttached: users });
  };

  // ------- REMOVE USER -------
  const removeUser = (idx: number) => {
    const users = [...todo.usersAttached];
    users.splice(idx, 1);
    setTodo({ ...todo, usersAttached: users });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Edit Todo" : "Add Todo"}</h2>
      <div>
        <input
          placeholder="Title"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
      </div>

      <div>
        <textarea
          placeholder="Description"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
      </div>

      <h3>Users Attached</h3>
      {errors.usersAttached && <span style={{ color: "red" }}>{errors.usersAttached}</span>}

      {todo.usersAttached.map((user, idx) => (
        <div key={idx} style={{ marginBottom: "10px", border: "1px solid gray", padding: "5px" }}>
          <input
            placeholder="Name"
            value={user.name}
            onChange={(e) => updateUser(idx, "name", e.target.value)}
          />
          {errors[`user_name_${idx}`] && <span style={{ color: "red" }}>{errors[`user_name_${idx}`]}</span>}
          <input
            placeholder="Email"
            value={user.email}
            onChange={(e) => updateUser(idx, "email", e.target.value)}
          />
          {errors[`user_email_${idx}`] && <span style={{ color: "red" }}>{errors[`user_email_${idx}`]}</span>}
          <input
            placeholder="Phone"
            value={user.phone}
            onChange={(e) => updateUser(idx, "phone", e.target.value)}
          />
          {errors[`user_phone_${idx}`] && <span style={{ color: "red" }}>{errors[`user_phone_${idx}`]}</span>}
          <input
            type="date"
            value={user.date}
            onChange={(e) => updateUser(idx, "date", e.target.value)}
          />
          <button onClick={() => removeUser(idx)}>Remove</button>
        </div>
      ))}

      <button onClick={addUser}>Add User</button>
      <br />
      <button onClick={handleSave}>Save</button>
      {id && <button onClick={handleClone}>Clone</button>}
    </div>
  );
};

export default TodoDetails;
