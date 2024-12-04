import React from "react";
import useTodoReducer from "../hooks/useTodoReducer";
import TodoContext from "./TodoContext";

const TodoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { dispatch, state } = useTodoReducer();

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
