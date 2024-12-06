import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Input, { InputRef } from "../../components/Input";
import useTodoContext from "./hooks/useTodoContext";
import TodoItem from "./TodoItem";

const Todo = () => {
  const { dispatch, state } = useTodoContext();
  const todoRef = useRef<InputRef>(null);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");

    dispatch({ type: "set_todo", payload: { todos: todos } });
  }, [state.todos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todoRef.current?.value() === "") {
      return todoRef.current.focus();
    }

    dispatch({
      type: "add_todo",
      payload: {
        todoTitle: todoRef.current?.value(),
        todoId: Date.now(),
      },
    });

    todoRef.current?.setValue("");
  };

  const handleCompletedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    dispatch({
      type: "change_completed",
      payload: { value: e.target.checked, todoId: id },
    });
  };

  const handleEdit = (id: number) => {
    dispatch({
      type: "toggle_edit_todo",
      payload: { todoId: id },
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "search_todo", query: e.target.value });
  };

  const handleUpdateTodo = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    dispatch({
      type: "update_todo",
      payload: { todo: e.target.value, todoId: id },
    });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "remove_todo", todoId: id });
  };
  return (
    <div className="grid grid-cols-2 gap-x-10">
      <form onSubmit={handleSubmit} className="p-5">
        <h1 className="text-1xl text-gray-800 font-semibold mb-9">Add Todo</h1>
        <Input
          type="text"
          label="Todo"
          labelStyle="text-gray-800"
          placeholder="Todo here..."
          className="w-full"
          ref={todoRef}
        />
        <Button
          title="Submit"
          className="w-full rounded-md font-semibold bg-blue-500 py-1 px-3 text-white outline-none  hover:bg-blue-400"
          type="submit"
        />
      </form>
      <div className="p-5">
        <h1 className="text-1xl text-gray-800 font-semibold mb-9">
          Your Todos
        </h1>

        <div className="flex items-center gap-x-5 justify-between">
          <Input
            type="text"
            label="Search Todo"
            placeholder="Your todo..."
            onChange={handleSearch}
          />
          <Button
            title={state.isHide ? "Show" : "Hide"}
            type="button"
            onClick={() => {
              dispatch({ type: "hide_completed_todo" });
            }}
            className="py-1 px-3 text-sm text-white rounded-md bg-blue-500 hover:bg-blue-400 "
          />
        </div>
        <TodoItem
          todos={state.filteredTodos}
          renderItem={(todo) => (
            <ul className="flex flex-col justify-start items-start">
              <li className="flex w-full justify-start gap-x-5 items-center">
                <Input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => handleCompletedChange(e, todo.id)}
                />
                {todo.isEditing ? (
                  <Input
                    type="text"
                    defaultValue={todo.title}
                    className="text-sm flex-1"
                    onChange={(e) => handleUpdateTodo(e, todo.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch({
                          type: "toggle_edit_todo",
                          payload: { todoId: todo.id },
                        });
                      }
                    }}
                  />
                ) : (
                  <span
                    className={`text-md font-light flex-1 ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                )}
                <div className="flex space-x-2 justify-end ">
                  <Button
                    type="button"
                    title={todo.isEditing ? "Save" : "Edit"}
                    onClick={() => handleEdit(todo.id)}
                    className="text-green-500 font-thin text-sm hover:underline"
                  />

                  <Button
                    type="button"
                    title="Delete"
                    onClick={() => handleDelete(todo.id)}
                    className="text-red-500 font-thin text-sm hover:underline"
                  />
                </div>
              </li>
            </ul>
          )}
        />
      </div>
    </div>
  );
};

export default Todo;
