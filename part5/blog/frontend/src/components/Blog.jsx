const Blog = ({ blog }) => (
  <div>
    <ul>
      <li><strong>Title: </strong>{blog.title}</li>
      <li><strong>Author: </strong>{blog.author}</li>
      <li><strong>Likes: </strong>{blog.likes} <button>Like</button></li>
      <li><strong>URL: </strong>{blog.url}</li>
      <li><strong>User: </strong>{blog.user.name}</li>
    </ul>
    <button className="deleteButton">Delete</button>
  </div>  
)

export default Blog