import Button from "../../components/Button";
import Input from "../../components/Input";
import useTodoContext from "./hooks/useTodoContext";

const Todo = () => {
  const { state, setTodo, todo, dispatch } = useTodoContext();

  return (
    <div className="grid grid-cols-2 gap-x-10">
      <div className="p-5">
        <h1 className="text-1xl text-gray-800 font-semibold mb-9">Add Todo</h1>
        <Input
          type="text"
          label="Todo"
          labelStyle="text-gray-800"
          placeholder="Todo here..."
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button
          title="Submit"
          className="w-full rounded-md font-semibold bg-blue-200 py-2 px-3 text-gray-800 outline-none hover:text-black hover:bg-blue-300"
          type="button"
          onClick={() => dispatch({ type: "add_todo", todoTitle: todo })}
        />
      </div>
      <div className="p-5">
        <h1 className="text-1xl text-gray-800 font-semibold mb-9">
          Your Todos
        </h1>
        <Input type="text" label="Search Todo" placeholder="Your todo..." />
        {state.map((todo) => {
          todo.title;
        })}
      </div>
    </div>
  );
};

export default Todo;
