import { type UsersType } from "../App"
import useFetch from "../hooks/useFetch";
import UserItem from "./UserItem";


const Users = () => {

  
  const { data: users, loading } = useFetch<UsersType>('/users');

  if(loading) return <div>Loading...</div>

  return (
    <>
    {
      
      users.map(user => (

        <UserItem email={user.email} name={user.name} username={user.username} key={user.id} />
      ))
    }
    </>


  )
}

export default Users