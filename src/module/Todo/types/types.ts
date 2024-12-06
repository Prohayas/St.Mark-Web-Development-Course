import { TodosType } from "../../../types/types";

export type ActionType =
  | {
      type: "add_todo";
      payload: { todoTitle: string | undefined; todoId: number };
    }
  | {
      type: "set_todo";
      payload: { todos: TodosType[] };
    }
  | {
      type: "toggle_edit_todo";
      payload: { todoId: number };
    }
  | {
      type: "update_todo";
      payload: { todoId: number; todo: string | undefined };
    }
  | { type: "remove_todo"; todoId: number }
  | { type: "search_todo"; query: string | undefined }
  | { type: "change_completed"; payload: { value: boolean; todoId: number } }
  | { type: "hide_completed_todo" };

export type InitialStateReducerType = {
  todos: TodosType[];
  isHide: boolean;
  filteredTodos: TodosType[];
};
export type TodoContextType = {
  state: InitialStateReducerType;
  dispatch: React.Dispatch<ActionType>;
};
