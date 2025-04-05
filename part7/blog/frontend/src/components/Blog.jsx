import blogService from "../services/blogs";
import PropTypes from "prop-types";
import Toggleable from "./Toggleable";

const Blog = (props) => {
  const likeHandler = async (event) => {
    event.preventDefault();
    
    try {
      const updatedBlog = await blogService.likeBlog(
        props.blog.id,
        props.user.token,
      );

      props.setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id !== updatedBlog.id ? blog : updatedBlog,
        ),
      );
      
      if (props.setMessage) {
        props.setMessage(`You liked "${updatedBlog.title}" by ${updatedBlog.author}`);
        setTimeout(() => {
          props.setMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error liking the blog:", error);
      if (props.setMessage) {
        props.setMessage(`Error: Failed to like the post`);
        setTimeout(() => {
          props.setMessage(null);
        }, 3000);
      }
    }
  };

  const deleteHandler = async (event) => {
    event.preventDefault();
    if (
      !window.confirm(`Are You Sure You Want To Delete ${props.blog.title}`)
    ) {
      return;
    }
    try {
      const deletedBlog = await blogService.deleteBlog(
        props.blog.id,
        props.user.token,
      );
      props.setBlogs((prevBlogs) => {
        return prevBlogs.filter((blog) => blog.id !== deletedBlog.id);
      });
    } catch (error) {
      console.error("Error Deleting The Blog:", error);
    }
  };

  return (
    <div>
      <strong>Title: </strong> {props.blog.title} <strong>By </strong>{" "}
      {`${props.blog.author} `}
      <Toggleable buttonLabel={"View Details"} closeLabel={"Hide Details"}>
        <ul>
          <li>
            <strong>Title: </strong>
            {props.blog.title}
          </li>
          <li>
            <strong>Author: </strong>
            {props.blog.author}
          </li>
          <li>
            <strong>Likes: </strong>
            {props.blog.likes} <button onClick={likeHandler}>Like</button>
          </li>
          <li>
            <strong>URL: </strong>
            {props.blog.url}
          </li>
          <li>
            <strong>User: </strong>
            {props.blog.user.name}
          </li>
        </ul>
        {props.blog.user.username === props.user.username ? (
          <button className="deleteButton" onClick={deleteHandler}>
            Delete
          </button>
        ) : null}
      </Toggleable>
    </div>
  );
};
Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
      }),
    ]).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func, // Added optional prop for feedback messages
};

export default Blog;
