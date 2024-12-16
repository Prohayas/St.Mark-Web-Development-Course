import { useEffect, useRef, useState, lazy, Suspense } from "react";
import Button from "../../components/Button";
import Input, { InputRef } from "../../components/Input";
import useTodoContext from "./hooks/useTodoContext";
import useFetch from "../../hooks/useFetch";
import { TodosType } from "../../types/types";
import Loading from "../../components/Loading";
import ErrorPage from "../../components/Error";
import useMutateQuery from "../../hooks/useMutateQuery";

const TodoItem = lazy(() => import("./TodoItem"));

type Todo = Omit<TodosType, "completed" | "isEditing">;

const Todo = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const { dispatch, state } = useTodoContext();
  const todoRef = useRef<InputRef>(null);
  const updateRef = useRef<InputRef>(null);

  const { data, error, refetch } = useFetch<TodosType>("todos");
  const {
    error: mutateError,
    isLoading,
    query,
    response,
  } = useMutateQuery<Todo>();

  useEffect(() => {
    if (!data) return;

    const todos = data.filter((todo) =>
      hideCompleted ? !todo.completed : todo
    );

    dispatch({ type: "set_todo", payload: { todos: todos } });
  }, [data]);

  if (error || mutateError)
    return <ErrorPage error={error ? error : mutateError} />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todoRef.current?.value() === "") return todoRef.current.focus();

    const id = state.todos.slice(-1)[0].id;
    dispatch({
      type: "add_todo",
      payload: { todo: todoRef.current?.value(), id: id + 1 },
    });

    const body = {
      todo: todoRef.current?.value(),
    };

    await query<{ todo: string | undefined }>({
      method: "POST",
      url: "todos",
      bodyData: body,
    });

    refetch();

    todoRef.current?.setValue("");
  };

  const handleCompletedChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    dispatch({
      type: "change_completed",
      payload: { value: e.target.checked, todoId: id },
    });

    const body = {
      completed: e.target.checked,
    };
    await query({ url: `todos/${id}`, method: "PUT", bodyData: body });

    refetch();
  };

  const handleEdit = (id: number) => {
    dispatch({
      type: "toggle_edit_todo",
      payload: { todoId: id },
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredTodos = data.filter((todo) =>
      hideCompleted
        ? !todo.completed &&
          todo.todo?.toLowerCase().includes(e.target.value.toLowerCase())
        : todo.todo?.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch({ type: "set_todo", payload: { todos: filteredTodos } });
  };

  const handleUpdateTodo = async (id: number) => {
    const body = {
      todo: updateRef.current?.value(),
    };

    dispatch({
      type: "update_todo",
      payload: { todo: updateRef.current?.value() as string, id: id },
    });
    await query({ method: "PUT", url: `todos/${id}`, bodyData: body });

    refetch();
  };

  const handleHide = () => {
    setHideCompleted(!hideCompleted);
    if (!hideCompleted) {
      dispatch({
        type: "set_todo",
        payload: { todos: data.filter((todo) => !todo.completed) },
      });
    } else {
      dispatch({ type: "set_todo", payload: { todos: data } });
    }
  };

  const handleDelete = (id: number) => {
    query({ method: "DELETE", url: `todos/${id}` });
    dispatch({ type: "remove_todo", todoId: id });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
      <form onSubmit={handleSubmit} className="p-5">
        <h1 className="text-1xl text-gray-800 font-semibold mb-9">Add Todo</h1>
        <Input
          type="text"
          label="Todo"
          labelStyle="text-gray-800"
          placeholder="Todo here..."
          className="w-full"
          disabled={isLoading}
          ref={todoRef}
        />
        <Button
          title={isLoading ? "Loading..." : "Submit"}
          disabled={isLoading}
          className="w-full disabled:cursor-wait rounded-md font-semibold bg-blue-500 py-1 px-3 text-white outline-none  hover:bg-blue-400"
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
            title={hideCompleted ? "Show" : "Hide"}
            type="button"
            onClick={handleHide}
            className="py-1 px-3 text-sm text-white rounded-md bg-blue-500 hover:bg-blue-400 "
          />
        </div>
        <Suspense fallback={<Loading />}>
          <TodoItem
            todos={state.todos}
            renderItem={(todo) => (
              <ul className="flex flex-col py-1">
                <li className="flex w-full justify-start py-1.5 gap-x-5 items-center bg-gray-200 px-3 rounded-md">
                  <Input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => handleCompletedChange(e, todo.id)}
                  />

                  {todo.isEditing ? (
                    <Input
                      type="text"
                      defaultValue={todo.todo}
                      className="text-sm flex-1"
                      ref={updateRef}
                      onBlur={() => handleUpdateTodo(todo.id)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleUpdateTodo(todo.id)
                      }
                    />
                  ) : (
                    <span
                      className={`text-md font-light flex-1 ${
                        todo.completed ? "line-through" : ""
                      }`}
                    >
                      {todo.todo}
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
        </Suspense>
      </div>
    </div>
  );
};

export default Todo;
