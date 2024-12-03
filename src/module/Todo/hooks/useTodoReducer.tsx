import { useReducer, useState } from "react";
import { TodosType } from "../../../types/types";
import { ActionType } from "../types/types";


const initialState: TodosType[] = [{ id: 1, title: "", completed: false }];

const reducer = (state: TodosType[], action: ActionType) => {
  let incrementId = 1;

  switch (action.type) {
    case "add_todo": {
      return [
        ...state,
        {
          id: (incrementId += 1),
          title: action.todoTitle,
          completed: false,
        },
      ];
    }

    case "remove_todo": {
      return [...state.slice(0, action.index + 1)];
    }

    default:
      throw new Error("Action Type");
  }
};

const useTodoReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [todo, setTodo] = useState("");

  return { state, dispatch, todo, setTodo };
};

export default useTodoReducer;
