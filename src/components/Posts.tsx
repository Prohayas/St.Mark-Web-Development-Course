import { type PostsType } from "../App"
import useFetch from "../hooks/useFetch";
import PostItem from "./PostItem";


const Posts = () => {
    
    const { data: posts, loading } = useFetch<PostsType>('/posts');

    if(loading) return <div>Loading...</div>

  return (
    <>
    {
        posts.map(post => (

            <PostItem key={post.id} body={post.body} title={post.title} />
        ))
    }
    </>


  )
}

export default Posts