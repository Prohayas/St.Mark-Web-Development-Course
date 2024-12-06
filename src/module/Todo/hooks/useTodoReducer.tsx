import { useEffect, useReducer } from "react";
import { ActionType, InitialStateReducerType } from "../types/types";

const loadInitialState = (): InitialStateReducerType => {
  const savedTodos = localStorage.getItem("todos");
  const todos = savedTodos ? JSON.parse(savedTodos) : [];

  return {
    todos: todos,
    isHide: false,
    filteredTodos: todos,
  };
};

const initialState: InitialStateReducerType = loadInitialState();

const reducer = (state: InitialStateReducerType, action: ActionType) => {
  switch (action.type) {
    case "add_todo": {
      const newTodo = [
        ...state.todos,
        {
          id: action.payload.todoId,
          title: action.payload.todoTitle,
          isEditing: false,
          completed: false,
        },
      ];
      localStorage.setItem("todos", JSON.stringify(newTodo));
      return {
        ...state,
        isHide: false,
        todos: newTodo,
      };
    }

    case "set_todo": {
      return {
        ...state,
        filteredTodos: action.payload.todos
      }
    }

    case "search_todo": {
      const todos = state.todos.filter((todo) =>
        state.isHide
          ? !todo.completed &&
            todo.title
              ?.toLowerCase()
              .includes(action.query?.toLowerCase() as string)
          : todo.title
              ?.toLowerCase()
              .includes(action.query?.toLowerCase() as string)
      );

      localStorage.setItem("todos", JSON.stringify(todos));
      return {
        ...state,
        filteredTodos: todos,
      };
    }

    case "change_completed": {
      const changeCompletedTodos = state.todos.map((todo) =>
        todo.id === action.payload.todoId
          ? { ...todo, completed: action.payload.value }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(changeCompletedTodos));
      return {
        ...state,
        todos: changeCompletedTodos,
      };
    }

    case "toggle_edit_todo": {
      const toggleEditTodos = state.todos.map((todo) =>
        todo.id === action.payload.todoId
          ? { ...todo, isEditing: !todo.isEditing }
          : todo
      );

      localStorage.setItem("todos", JSON.stringify(toggleEditTodos));
      return {
        ...state,
        todos: toggleEditTodos,
      };
    }

    case "update_todo": {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.todoId
          ? { ...todo, title: action.payload.todo }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case "hide_completed_todo": {
      const hiddenTodos = state.todos.filter((todo) =>
        !state.isHide ? !todo.completed : todo
      );
      localStorage.setItem("todos", JSON.stringify(hiddenTodos));
      return {
        ...state,
        isHide: !state.isHide,
        filteredTodos: hiddenTodos,
      };
    }
    case "remove_todo": {
      const newTodos = state.todos.filter((todo) => todo.id !== action.todoId);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return {
        ...state,
        todos: newTodos,
      };
    }

    default:
      throw new Error("Action Type");
  }
};

const useTodoReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    JSON.parse(localStorage.getItem("todos") || "[]");
  }, [state.todos]);

  return { state, dispatch };
};

export default useTodoReducer;
