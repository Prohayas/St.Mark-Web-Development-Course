import { createContext } from "react";
import { TodoContextType } from "../types/types";

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export default TodoContext;
