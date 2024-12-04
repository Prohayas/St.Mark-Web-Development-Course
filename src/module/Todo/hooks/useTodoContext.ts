import { useContext } from "react";
import TodoContext from "../context/TodoContext";

const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw Error("Context not found");
  }

  return context;
};

export default useTodoContext;
