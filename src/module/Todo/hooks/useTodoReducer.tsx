import { useReducer } from "react";
import { ActionType, InitialStateReducerType } from "../types/types";

const initialState: InitialStateReducerType = {
  todos: [],
};

const reducer = (state: InitialStateReducerType, action: ActionType) => {
  switch (action.type) {
    case "add_todo": {
      return {
        todos: [
          ...state.todos,
          { ...action.payload, completed: false, isEditing: false },
        ],
      };
    }

    case "set_todo": {
      return {
        todos: action.payload.todos.map((todo) => ({
          ...todo,
          isEditing: false,
        })),
      };
    }

    case "change_completed": {
      const changeCompletedTodos = state.todos.map((todo) =>
        todo.id === action.payload.todoId
          ? { ...todo, completed: action.payload.value }
          : todo
      );
      return {
        todos: changeCompletedTodos,
      };
    }

    case "toggle_edit_todo": {
      const toggleEditTodos = state.todos.map((todo) =>
        todo.id === action.payload.todoId
          ? { ...todo, isEditing: !todo.isEditing }
          : todo
      );
      return {
        todos: toggleEditTodos,
      };
    }

    case "update_todo": {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.todo }
          : todo
      );
      return {
        todos: updatedTodos,
      };
    }

    case "remove_todo": {
      return {
        todos: state.todos.filter((todo) => todo.id !== action.todoId),
      };
    }
    default:
      throw new Error("Action Type");
  }
};

const useTodoReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

export default useTodoReducer;
