import { useState } from "react";
import { api } from "../api/APIServices";
import { useFetchTodoList } from "../hooks/useFetchTodoList";
const Dashboard = () => {
  const token = localStorage.getItem("token") || "";
  const { data: todos, isFetching, refetch } = useFetchTodoList(token);
  const [newTodo, setNewTodo] = useState("");

  const handleCreate = async () => {
    await api.createTodo({ title: newTodo }, token);
    setNewTodo("");
    refetch();
  };

  const handleDelete = async (id: string) => {
    await api.deleteTodo(id, token);
    refetch();
  };

  const handleClone = async (id: string) => {
    await api.cloneTodo(id, token);
    refetch();
  };

  const handleUpdate = async (id: string) => {
    const title = prompt("Enter new title");
    if (title) {
      await api.updateTodo(id, { title }, token);
      refetch();
    }
  };

  if (isFetching) return <p>Loading Todos...</p>;

  return (
    <div>
      <h1>Todo Dashboard</h1>
      <input value={newTodo} onChange={e => setNewTodo(e.target.value)} placeholder="New Todo" />
      <button onClick={handleCreate}>Add Todo</button>

      <ul>
        {todos?.map((todo: any) => (
          <li key={todo._id}>
            {todo.title}
            <button onClick={() => handleUpdate(todo._id)}>Edit</button>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
            <button onClick={() => handleClone(todo._id)}>Clone</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
