import React from "react";
import useTodoReducer from "../hooks/useTodoReducer";
import TodoContext from "./TodoContext";

const TodoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { dispatch, setTodo, state, todo } = useTodoReducer();

  return (
    <TodoContext.Provider value={{ state, dispatch, todo, setTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
