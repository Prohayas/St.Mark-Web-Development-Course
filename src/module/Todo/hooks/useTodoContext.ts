import { useContext } from "react";
import TodoContext from "../context/TodoContext";

const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) return;

  return context;
};

export default useTodoContext;
