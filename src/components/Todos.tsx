import { type TodosType } from '../App'
import useFetch from '../hooks/useFetch';
import TodoItem from './TodoItem';


const Todos = () => {
  
  const { data: todos, loading } = useFetch<TodosType>('/todos');

  if(loading) return <div>loading...</div>
  return (
    <>
      {todos.map(todo => (
    
        <TodoItem key={todo.id} completed={todo.completed} title={todo.title} />

      ))}  
    </>
  )
}

export default Todos