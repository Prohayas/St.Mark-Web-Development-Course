import React, { ReactNode, memo } from "react";
import { TodosType } from "../../types/types";

type TodoItemType = {
  todos: TodosType[];
  renderItem: (todo: TodosType) => ReactNode;
};

const TodoItem = ({ todos, renderItem }: TodoItemType) => {
  return todos.map((todo) => (
    <React.Fragment key={todo.id}>{renderItem(todo)}</React.Fragment>
  ));
};

export default memo(TodoItem);
