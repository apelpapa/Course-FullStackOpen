import Toggleable from "./Toggleable";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import { Button } from "@mui/material";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const deleteHandler = async (event) => {
    event.preventDefault();
    if (!window.confirm(`Are You Sure You Want To Delete ${blog.title}`)) {
      return;
    }
    dispatch(deleteBlog(blog, user.token));
  };

  return (
    <div>
      <strong>Title: <Link to={`/blogs/${blog.id}`}>{blog.title} </Link> </strong> <strong> By </strong>{" "}
      {`${blog.author} `}
      <Toggleable buttonLabel={"View Details"} closeLabel={"Hide Details"}>
        <ul>
          <li>
            <strong>Title: </strong>
            {blog.title}
          </li>
          <li>
            <strong>Author: </strong>
            {blog.author}
          </li>
          <li>
            <strong>Likes: </strong>
            {blog.likes} <Button size='small' variant="contained" onClick={() => dispatch(likeBlog(blog, user.token))}>Like</Button>
          </li>
          <li>
            <strong>URL: </strong>
            {blog.url}
          </li>
          <li>
            <strong>User: </strong>
            {blog.user.name}
          </li>
        </ul>
        {blog.user.username === user.username ? (
          <Button variant="outlined" color='error' size='small' className="deleteButton" onClick={deleteHandler}>
            Delete
          </Button>
        ) : null}
      </Toggleable>
    </div>
  );
};

export default Blog;
