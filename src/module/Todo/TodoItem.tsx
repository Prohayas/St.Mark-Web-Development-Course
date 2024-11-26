import { TodosType } from "../../types/types";
import Button from "../../components/Button";

type TodoItemType = TodosType & { hide: boolean; filterChange: () => void };

const TodoItem = ({ title, id, completed, filterChange }: TodoItemType) => {
  return (
    <>
      <ul className="flex w-1/2 justify-between items-center gap-x-10">
        <div className="flex gap-x-5 items-center">
          <li>{id}</li>

          <li className={`${completed ? "line-through" : ""}`}>{title}</li>
        </div>
        <li className="justify-self-end">
          <Button
            title="X"
            onClick={filterChange}
            type="button"
            className="text-red-500"
          />
        </li>
      </ul>
    </>
  );
};

export default TodoItem;
