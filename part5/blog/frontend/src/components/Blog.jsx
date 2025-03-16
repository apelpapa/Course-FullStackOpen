import blogService from '../services/blogs'

const Blog = (props) => {
  const likeHandler = async (event) => {
    event.preventDefault()
    const blogPostUpdate = {
      title: props.blog.title,
      author: props.blog.author,
      likes: props.blog.likes + 1, // Increment by 1
      url: props.blog.url
    }

    try {
      const updatedBlog = await blogService.updateBlog(
        props.blog.id,
        blogPostUpdate,
        props.user.token
      )

      props.setBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog.id !== updatedBlog.id ? blog : updatedBlog
        )
      )
    } catch (error) {
      console.error('Error Updating The Blog:', error)
    }
  }

  const deleteHandler = async (event) => {
    event.preventDefault()
    if(!window.confirm(`Are You Sure You Want To Delete ${props.blog.title}`)){
      return
    }
    try {
      const deletedBlog = await blogService.deleteBlog(props.blog.id, props.user.token)
      props.setBlogs(prevBlogs => {
        return prevBlogs.filter(blog => blog.id !== deletedBlog.id)
      })
    } catch (error) {
      console.error('Error Deleting The Blog:', error)
    }
  }

  return(
    <div>
      <ul>
        <li><strong>Title: </strong>{props.blog.title}</li>
        <li><strong>Author: </strong>{props.blog.author}</li>
        <li><strong>Likes: </strong>{props.blog.likes} <button onClick={likeHandler}>Like</button></li>
        <li><strong>URL: </strong>{props.blog.url}</li>
        <li><strong>User: </strong>{props.blog.user.name}</li>
      </ul>
      <button className="deleteButton" onClick={deleteHandler}>Delete</button>
    </div>
  )
}

export default Blog