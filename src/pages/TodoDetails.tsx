import { useParams } from "react-router-dom";
import { useFetchTodoDetails } from "../hooks/useFetchTodoDetails";
const TodoDetails = () => {
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem("token") || "";
  const { data: todo, isFetching } = useFetchTodoDetails(id!, token);

  if (isFetching) return <p>Loading...</p>;

  return (
    <div>
      <h1>Todo Details</h1>
      <p>Title: {todo?.title}</p>
      <p>Description: {todo?.description}</p>
    </div>
  );
};

export default TodoDetails;