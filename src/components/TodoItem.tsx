

type TodoItemType = {
    title: string;
    completed: boolean;
}
const TodoItem = ({ title, completed }: TodoItemType) => {

  return (
    <>
    <div className="flex space-x-2">
    <input type="checkbox" defaultChecked={completed} / >
    <p className={`${completed ? 'line-through' : ''}`}>{title}</p>
    </div>
    </>
  )
}

export default TodoItem;