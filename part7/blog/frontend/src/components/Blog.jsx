import blogService from "../services/blogs";
import Toggleable from "./Toggleable";
import { useDispatch } from "react-redux";
import { showMessage, clearMessage } from "../reducers/notificationReducer";
import { likeBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  const dispatch = useDispatch();
  const likeHandler = async (blog) => {

    try {
      const updatedBlog = await blogService.likeBlog(
        props.blog.id,
        props.user.token,
      );
      dispatch(likeBlog(blog))
      props.setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id !== updatedBlog.id ? blog : updatedBlog,
        ),
      );
      dispatch(
        showMessage(
          `You liked "${updatedBlog.title}" by ${updatedBlog.author}`,
        ),
      );
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    } catch (error) {
      console.error("Error liking the blog:", error);

        dispatch(showMessage(`Error: Failed to like the post`));
        setTimeout(() => {
          dispatch(clearMessage());
        }, 3000);
      
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
            {props.blog.likes} <button onClick={() => likeHandler(props.blog)}>Like</button>
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

export default Blog;
