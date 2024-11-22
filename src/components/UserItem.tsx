import { type UsersType } from '../App'

type UserItemType = Omit<UsersType, 'id'>

const UserItem = ({ name, username, email }: UserItemType) => {
  return (
    <> 
        <h2 className='text-1xl font-bold block'>{name}</h2>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
    </>
  )
}

export default UserItem