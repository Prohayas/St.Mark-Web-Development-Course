import { TodosType } from "../../../types/types";

export type ActionType =
  | { type: "add_todo"; todoTitle: string }
  | { type: "remove_todo"; index: number }
  | { type: "search_todo"; query: string }
  | { type: "hide_completed_todo" };



  export type TodoContextType = {
    state: TodosType[];
    dispatch: React.Dispatch<ActionType>;
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
  }