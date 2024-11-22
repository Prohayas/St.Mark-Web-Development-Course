import { useState } from "react"; 
import Todos from "./components/Todos";
import Users from "./components/Users";
import Posts from "./components/Posts";

export type TodosType = {
  id: number;
  completed: boolean;
  title: string;
}

export type UsersType = {
  id: number;
  name: string;
  username: string;
  email:string;
}

export type PostsType = {
  id: number;
  body: string;
  title: string;
}


function App () {
 
  const [state, setState] = useState('');

  function getComponent() {
    return {
      'todos': <Todos />,
      'posts': <Posts />,
      'users': <Users />
    }[state]
  }

  return (
  <>
  <div className="flex justify-center items-center space-x-5 pt-52 py-20">
     <button className="p-2 rounded-md bg-sky-500 text-white text-sm font-bold" onClick={() => setState('todos')}>Todos</button>
     <button className="p-2 rounded-md bg-red-500 text-white text-sm font-bold" onClick={() => setState('posts')}>Posts</button>
     <button className="p-2 rounded-md bg-green-500 text-white text-sm font-bold" onClick={() => setState('users')}>Users</button>
  </div>
     <div className="flex flex-col h-1/2 items-start justify-center">

      {getComponent()}

     </div>


      
  </> 
  )   
}

export default App;