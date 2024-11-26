import React, { useEffect, useRef, useState } from "react";
import { type TodosType } from "../../types/types";
import Input from "../../components/Input";
import Button from "../../components/Button";
import TodoItem from "./TodoItem";

type TodoType = Omit<TodosType, "id" | "completed">;

const blankTodo = {
  title: "",
};

const Todo = () => {
  const [todo, setTodo] = useState<TodoType>(blankTodo);
  const [todos, setTodos] = useState<TodosType[]>(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );
  const [isHide, setIsHide] = useState(false);
  const newId = useRef(1);

  useEffect(() => {
    if (todos) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTodos([
      ...todos,
      { id: newId.current, completed: false, title: todo.title },
    ]);

    newId.current += 1;

    setTodo(blankTodo);
  };

  const handeUpdateCompleted = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updateCompleted = [...todos];

    updateCompleted[index].completed = e.target.checked;

    setTodos(updateCompleted);
  };

  const handleFilter = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <section className="min-h-screen w-screen">
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid grid-cols-2 py-10 gap-x-10">
          <form onSubmit={handleSubmit}>
            <h1 className="my-5 text-1xl font-bold">Add Todo</h1>
            <Input
              type="text"
              label="Todo Title"
              labelStyle="text-gray-800"
              value={todo?.title}
              onChange={(e) =>
                setTodo((prev) => ({ ...prev, title: e.target.value }))
              }
            />

            <Button
              title="Submit"
              type="submit"
              className="px-3 py-1 bg-blue-500 rounded-md font-bold text-white w-full mt-2"
            />
          </form>

          <div>
            <h1 className="my-5 text-1xl font-bold">Your Todos</h1>
            {todos.length < 1 ? (
              <h2>You have no todos yet...</h2>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-5">
                  <Input
                    type="text"
                    placeholder="Todo..."
                    label="Search Todo"
                    labelStyle="text-gray-800"
                  />

                  <Button
                    title={!isHide ? "Hide" : "Show"}
                    type="button"
                    className=" px-2 w-16 h-10 rounded-md bg-blue-500 text-white text-sm"
                    onClick={() => setIsHide(!isHide)}
                  />
                </div>

                {todos.map((todo, i) => (
                  <React.Fragment key={i}>
                    <div className="flex justify-start items-center gap-x-5">
                      <Input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={(e) => handeUpdateCompleted(e, i)}
                      />
                      <TodoItem
                        filterChange={() => handleFilter(todo.id)}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        key={todo.id}
                        hide={isHide}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Todo;
