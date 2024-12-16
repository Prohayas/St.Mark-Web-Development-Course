import { TodosType } from "../../../types/types";

export type ActionType =
  | {
      type: "add_todo";
      payload: { todo: string | undefined; id: number };
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
      payload: { id: number; todo: string | undefined };
    }
  | { type: "remove_todo"; todoId: number }
  | { type: "search_todo"; query: string | undefined }
  | { type: "change_completed"; payload: { value: boolean; todoId: number } };

export type InitialStateReducerType = {
  todos: TodosType[];
};
export type TodoContextType = {
  state: InitialStateReducerType;
  dispatch: React.Dispatch<ActionType>;
};
