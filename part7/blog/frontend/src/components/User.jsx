import { useSelector } from "react-redux"
import { useMatch } from "react-router-dom"
import { Link } from "react-router-dom"

const User = () => {
    const users = useSelector(state=>state.allUsers)
    const match = useMatch('/users/:id')
    const user = users.find(user=>user.id===match.params.id)
    if (!user) return null;
    return(
        <div>
            <h2>{`${user.name}'s Blog Posts`}</h2>
            <ul>
                {user.blogPosts.map(blog=>{
                    return(
                        <li key={blog.id}>
                           <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> 
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default User