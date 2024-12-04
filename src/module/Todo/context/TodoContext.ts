import { createContext } from "react";
import { TodoContextType } from "../types/types";

export const TodoContext = createContext<TodoContextType | null>(null);

export default TodoContext;
