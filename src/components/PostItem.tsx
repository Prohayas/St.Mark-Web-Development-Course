import { type PostsType } from '../App'

type PostItemType = Omit<PostsType, 'id'>

const PostItem = ({ body, title }: PostItemType) => {
  return (
    <> 
        <h2 className='text-1xl font-bold block'>{title}</h2>
        <p>Body: {body}</p>
    </>
  )
}

export default PostItem